import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from "../../services/data.service";
import { CommentsSectionComponent } from '../comments-section/comments-section';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { RatingComponent } from '../rating/rating.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [RouterLink, CommentsSectionComponent, LikeButtonComponent, RatingComponent, CommonModule],
  providers: [DataService],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.scss'
})
export class BlogItemDetailsComponent implements OnInit {
  public image: string = '';
  public text: string = '';
  public title: string = '';
  public postId: string = '';
  public views: number = 0;

  constructor(private service: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;

      this.postId = id;
      this.service.getById(id).subscribe((res: any) => {
        this.image = res.image;
        this.text = res.text;
        this.title = res.title;
        this.views = res.views || 0;
      });

      // Increment view count when post details are loaded
      this.service.incrementViews(id).subscribe({
        error: (err) => console.error('Błąd inkrementacji views:', err)
      });
    });
  }
}

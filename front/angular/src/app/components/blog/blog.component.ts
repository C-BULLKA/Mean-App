import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../services/data.service";
import { BlogItemComponent } from "../blog-item/blog-item.component";
import { CommonModule } from "@angular/common";
import { AddPostComponent } from "../add-post/add-post";
import { FilterTextPipe } from "../../pipes/filter-text.pipe";
import { PaginatePipe } from "../../pipes/paginate.pipe";
import { PaginationComponent } from "../pagination/pagination.component";
// Nowe importy potrzebne do pełnej funkcjonalności
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    BlogItemComponent,
    CommonModule,
    AddPostComponent,
    FilterTextPipe,
    PaginatePipe,
    PaginationComponent
  ],
  providers: [DataService],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class BlogComponent implements OnInit {

  @Input() filterText: string = '';

  public items$: any[] = [];
  public allItems: any[] = []; // Przechowywamy wszystkie dane dla filtrowania

  // --- ZMIENNE DO PAGINACJI ---
  public currentPage: number = 1;
  public itemsPerPage: number = 5;
  public totalPages: number = 1;
  public totalItems: number = 0;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    public router: Router,
    private favoritesService: FavoritesService,
    private ratingService: RatingService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.currentPage = Number(params['page']);
      }
      this.getAll();
    });
  }

  getAll() {
    this.service.getAllPaginated(this.currentPage, this.itemsPerPage).subscribe((response: any) => {
      let data = response.posts || response;
      this.totalItems = response.total || data.length;
      this.totalPages = response.pages || Math.ceil(this.totalItems / this.itemsPerPage);

      // Obsługa ścieżki /favorites
      if (this.router.url.includes('favorites')) {
        const favIds = this.favoritesService.getFavorites();
        data = data.filter((item: any) => favIds.includes(item._id));
      }

      this.items$ = data;
      this.allItems = data;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sortItemsByRating() {
    this.items$ = [...this.items$].sort((a: any, b: any) => {
      const ratingA = this.ratingService.getAverageRating(a._id);
      const ratingB = this.ratingService.getAverageRating(b._id);

      return ratingB - ratingA;
    });

    this.onPageChange(1);
  }
}

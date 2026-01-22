import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogItemImageComponent } from "../blog-item-image/blog-item-image.component";
import { BlogItemTextComponent } from "../blog-item-text/blog-item-text.component";
import { CommentsSectionComponent } from "../comments-section/comments-section";
import { LikeButtonComponent } from "../like-button/like-button.component";

@Component({
  selector: 'blog-item',
  standalone: true,
  imports: [
    CommonModule,
    BlogItemImageComponent,
    BlogItemTextComponent,
    CommentsSectionComponent,
    LikeButtonComponent
  ],
  templateUrl: './blog-item.html',
  styleUrl: './blog-item.scss'
})
export class BlogItemComponent {
  @Input() image?: string;
  @Input() text?: string;
  @Input() title?: string;
  @Input() id?: string;

  constructor() {}
}

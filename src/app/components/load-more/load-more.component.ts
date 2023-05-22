import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-load-more",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./load-more.component.html",
})
export class LoadMoreComponent {
  @Input() buttonContent = '';

  @Output() loadMore = new EventEmitter();

  loadMoreHandler() {
    this.loadMore.emit();
  }
}

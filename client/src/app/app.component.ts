import { Component, OnInit } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { CarouselModule } from "primeng/carousel";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss", "styles/main.scss"],
  standalone: true,
  imports: [MatProgressBarModule, CarouselModule],
})
export class AppComponent implements OnInit {
  constructor() {}
  imagesSource = [
    "assets/images/banner0.png",
    "assets/images/banner1.png",
    "assets/images/banner2.png",
    "assets/images/banner3.png",
    "assets/images/banner4.png",
  ];

  ngOnInit() {}
}

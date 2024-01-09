import { Component } from '@angular/core';
/**
 * *Footer component
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
/**
 * The footer component is placed at the bottom of the
 * main component and is aivaibled for every other components
 */
export class FooterComponent {
/**
 * We are just using that property to show user infomation in the footer component
 */
user={
  email:"kouame.ndri1998@gmail.com",
  linkedIn:"https://linkedin.com/in/kouamé-david-n-dri-1615a5186"
}


}

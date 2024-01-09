import { Component, Input} from '@angular/core';
import { environment } from 'src/environments/environment.prod';
/**
 ** Header component
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
/**
 * Header component
 * is placed in the main component and work
 * for every sub component or sub module compenent
 */
export class HeaderComponent {
/**
 * take the title of the website as input
 */
@Input('title') title="AQ54"
/**
 * property that contains the url to documentation website
 */
docUrl=environment.docsURL
}

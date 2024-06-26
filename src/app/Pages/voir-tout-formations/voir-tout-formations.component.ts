import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Universite } from 'src/app/Models/universite';
import { OffreFormationService } from 'src/app/services/offre-formation.service';

@Component({
  selector: 'app-voir-tout-formations',
  templateUrl: './voir-tout-formations.component.html',
  styleUrls: ['./voir-tout-formations.component.scss']
})
export class VoirToutFormationsComponent {

  constructor(
    private service: OffreFormationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;
  // formation!: Formations[];
  formations!: Universite[];
  // formations: any;
  showSideBar = false;

  public getScreenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getScreenWidth = window.innerWidth;
    console.log(this.getScreenWidth);
    // this.getScreenWidth <= 480? this.mobile = true : this.mobile = false;
    // 768px portrait

    // console.log(this.mobile);
  }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    // this.getScreenWidth <= 480? this.mobile = true : this.mobile = false;

    this.service.getUniversites().subscribe((data: any) => {
      console.log(data);
      this.formations = data;
      // console.log(this.formations);
    });
    // this.formations = this.service.getFormation();
  }

  navigateToDetails(itemId: number) {
    this.router.navigate(['/universites', itemId]); // Navigate to details route with item ID
  }

  toggleMenu() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
    this.isMenuIconClosed = !this.isMenuIconClosed;
  }
}

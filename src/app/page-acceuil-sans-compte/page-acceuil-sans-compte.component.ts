import { Component,OnInit } from '@angular/core';
import { Temoignage } from '../Models/temoignage';
import { TemoignageService } from '../services/temoignage.service';
import { UserServiceService } from '../services/user-service.service';
import { UserInfo } from '../Models/userInfo';
import { User } from '../Models/user';

@Component({
  selector: 'app-page-acceuil-sans-compte',
  templateUrl: './page-acceuil-sans-compte.component.html',
  styleUrls: ['./page-acceuil-sans-compte.component.scss']
})

export class PageAcceuilSansCompteComponent {

  temoignages!: Array<Temoignage>;
  temoignages2!:Array<any>;
  isMenuIconClicked = false;
  isMenuIconClosed = true;
  showSearchBar = false;

  isLoggedIn:boolean=false;

  currentTemoignageNumber:number=0;

  constructor(private TemoignageService:TemoignageService,private userService:UserServiceService){
    this.temoignages = this.TemoignageService.list_temoignages;
    console.log(this.temoignages)
  }

  ngOnInit(): void {
    this.TemoignageService.getTemoignages().subscribe(data => {
      console.log(data);
      this.temoignages2 = data;
    });

    this.verifyLogin();
  }

  verifyLogin(){
    this.userService.getUserInfo().subscribe(
      (data) => {
        console.log(data);
        let v:UserInfo = data as UserInfo;
        this.isLoggedIn=true;
        this.userService.username= v.username;
        
      },
      (error) => {
        this.isLoggedIn=false;
        console.error("An error occurred:", error);      
      }
    );
  }

 

  description_Metier:string = "Découvre l'univers des métiers  avec  LABOUSSOLE ! Explorez une multitude de professions passionnantes et trouvez le métier qui correspond à ton profil."
  description_Bourses:string = "LABOUSSOLE te donne accès à un large éventail de bourses d'études pour t’aider à financer tes études et réaliser tes rêves"
  description_Voyages_Etudes:string = "Tu as envie de poursuivre tes études à l’extérieur ?  Nous mettons à ta disposition les informations dont tu auras besoins pour réussir à l’étranger."
  description_Formation:string = "LABOUSSOLE te donne les informations sur toutes les offres de formations au Cameroun et au Congo afin que tu puisses choisir aisément ta Filière d’étude."
  


  toggleMenu() {
    this.isMenuIconClicked = !this.isMenuIconClicked;
    this.isMenuIconClosed = !this.isMenuIconClosed;
  }
  formVar(temp: HTMLAnchorElement){
    console.log(temp);
  }
  nextTemoignage(){
    this.currentTemoignageNumber = (this.currentTemoignageNumber+1)%this.temoignages.length
  }

  prevTemoignage(){
    this.currentTemoignageNumber = this.currentTemoignageNumber==0? this.temoignages.length:this.currentTemoignageNumber-1
    this.currentTemoignageNumber = this.currentTemoignageNumber%4
  }
}

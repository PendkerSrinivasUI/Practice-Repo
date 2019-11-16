import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FalconFind';
  authToken:String;
  vehcles = [];
  planets = [];
  constructor(public apiService:ApiService){

  }
  ngOnInit(){
    this.getAuthToken();
    this.getAllVehcles();
    this.getAllPlanets()
  }
  getAuthToken(){
    this.apiService.post_service(ApiService.apiList.getToken,{}).subscribe(
      response =>{
          localStorage.setItem('authToken',response.token)
      },error =>{
        alert(error)
      }
    )
  }

  getAllVehcles(){
    this.apiService.get_service(ApiService.apiList.vehcles).subscribe(
      response =>{
          this.vehcles = response;
      },error =>{
        alert(error)
      }
    )
  }

  getAllPlanets(){
    this.apiService.get_service(ApiService.apiList.planets).subscribe(
      response =>{
          this.planets = response;
      },error =>{
        alert(error)
      }
    )
  }


}

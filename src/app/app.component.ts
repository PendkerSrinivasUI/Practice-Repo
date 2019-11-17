import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FalconFind';
  authToken: string;
  vehicles = [];
  selectedVehicles = [];
  planets = [];
  vehgdfgdfgdficle: ""
  destination1: any;
  destination2: any;
  destination3: any;
  destination4: any;
  selectedPlanets = [];
  temPPlanet: string;
  destinationObj = {
    0:"",
    1:"",
    2:"",
    3:""
  };

  individualDestinationObj = {};
  timeTakenToReach: number;
  destinationList = [
    { name: "Destination1", planets: [], selectedPlanet: "", vehicles:[], selectedVehicle: "" },
    { name: "Destination2", planets: [], selectedPlanet: "", vehicles:[], selectedVehicle: "" },
    { name: "Destination3", planets: [], selectedPlanet: "", vehicles:[], selectedVehicle: "" },
    { name: "Destination4", planets: [], selectedPlanet: "", vehicles:[], selectedVehicle: "" }
  ];
  constructor(public apiService: ApiService) {

  }
  ngOnInit() {
    this.getAuthToken();
    this.getAllvehicles();
    this.getAllPlanets()
  }
  getAuthToken() {
    this.apiService.post_service(ApiService.apiList.getToken, {}).subscribe(
      response => {
        localStorage.setItem('authToken', response.token);
        this.authToken = localStorage.getItem('authToken');
      }, error => {
        alert(error)
      }
    )
  }

  getAllvehicles() {
    this.apiService.get_service(ApiService.apiList.vehcles).subscribe(
      response => {
        this.vehicles = response;
        this.destinationList.forEach(element=>{
          Object.assign(element.vehicles,this.vehicles)
        })
      }, error => {
        alert(error)
      }
    )
  }
  getAllPlanets() {
    this.apiService.get_service(ApiService.apiList.planets).subscribe(
      response => {
        this.planets = response;
        this.destinationList.forEach(element => {
          Object.assign(element.planets,this.planets)
        });
      }, error => {
        alert(error)
      }
    )
  }

  getSelectedPlanet(planet, planetIndex) {
    console.log(planet);
    if(planetIndex){
      let tempVehcles = this.individualDestinationObj[planetIndex-1];
      var duplicateTempVehicles = [];
      for (let i = 0; i < tempVehcles.length; i++) {
        var vehcletotemptest = {
          "name":tempVehcles[i].name,
          "total_no":tempVehcles[i].total_no,
          "max_distance":tempVehcles[i].max_distance,
          "speed":tempVehcles[i].speed,
        }
        duplicateTempVehicles.push(vehcletotemptest)
      }
      this.individualDestinationObj[planetIndex] = duplicateTempVehicles;
    }else{
       var duplicateVehicles = [];
      for (let i = 0; i < this.vehicles.length; i++) {
        var vehcletotest = {
          "name":this.vehicles[i].name,
          "total_no":this.vehicles[i].total_no,
          "max_distance":this.vehicles[i].max_distance,
          "speed":this.vehicles[i].speed,
        }

         duplicateVehicles.push(vehcletotest)
      }
      this.individualDestinationObj[planetIndex]=duplicateVehicles;
    }
    this.destinationList[planetIndex].selectedVehicle = "";
    if (this.temPPlanet) {
      for (let i = 0; i < this.destinationList.length; i++) {
        if (i != planetIndex) {
          this.destinationList[i].planets.push(this.temPPlanet);
        }
      }
    }
    for (let i = 0; i < this.destinationList.length; i++) {
      if ((i || planetIndex) && (i != planetIndex)) {
        let idx = this.destinationList[i].planets.findIndex(item => item.name == planet);
        console.log(idx);
        if(idx > -1){
          this.destinationList[i].planets.splice(idx, 1);
        }
      }
    }
    this.selectedPlanets.push(planet)
  }

  getSelectedVehicle(vehcle,planet,destIndex) {
    console.log(vehcle);
    if (vehcle) {
      let idx = this.planets.findIndex(item => item.name == planet)
      if(idx > -1){
          this.planets[idx].distance
            if(vehcle.max_distance < this.planets[idx].distance){
                  alert('the vehicle max_distance is less than destination distance')
              }else{
                if(this.destinationObj[destIndex] != "")
                  {
                    let vehcleObj = this.individualDestinationObj[destIndex].find(item =>item.name == this.destinationObj[destIndex])
                    vehcleObj.total_no +=1; 
                  }
                    vehcle.total_no -=1;
                    this.destinationObj[destIndex] = vehcle.name;
                    this.destinationList[destIndex].selectedVehicle = vehcle.name;
                    this.timeTakenToReach = (this.planets[idx].distance)/vehcle.speed;
                }
            }
          }
      }
  
  findFolcon(){
    console.log(new Set(this.selectedPlanets));
    let requestObj = {
      token:this.authToken,
      planet_names:this.selectedPlanets,
      vehicle_names:this.selectedVehicles
    }
    this.apiService.post_service(ApiService.apiList.findVehcle,requestObj).subscribe(
      response => {
      alert(response)
      }, error => {
        alert(error)
      }
    )
  }

  onFocus(planet,destIndex) {
    if (planet) {
      this.temPPlanet = this.planets.find(item => item.name == planet);
      console.log(planet);

    }
  }


}
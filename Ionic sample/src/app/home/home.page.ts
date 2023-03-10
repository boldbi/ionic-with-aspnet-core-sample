import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
declare var BoldBI: any;

export class Item {
  Name: string;
  Description: string;
  Id: string;
  Version: string;
  IsPublic: boolean;
  ItemLocation: string;
  CategoryName: string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public dashboardsList: Item[];
  result: any;
  dashboard: any;
  
  constructor(private homeService: HomeService) {}
  
  
  ngOnInit(): void {
  
    if (this.homeService.environment == "enterprise") {
      this.homeService.baseUrl = this.homeService.rootUrl + "/" + this.homeService.siteIdentifier;
      this.homeService.dashboardServerApiUrl = this.homeService.rootUrl + "/api/" + this.homeService.siteIdentifier;
    }
    else {
      this.homeService.baseUrl = this.homeService.rootUrl;
      this.homeService.dashboardServerApiUrl = this.homeService.rootUrl + "/api";
  
    }
    this.renderDashboard();
  }
  

  renderDashboard(dashboard?: Item) {
  
    this.dashboard= BoldBI.create({
        serverUrl: this.homeService.baseUrl,
        dashboardId: "9b82d4e6-1b7d-4247-8b63-3df036029cf5",
        embedContainerId: "dashboard",
        embedType: BoldBI.EmbedType.Component,
        environment: this.homeService.environment=="enterprise"? BoldBI.Environment.Enterprise:BoldBI.Environment.Cloud,
        width:"100%",
        height:"100%",
        expirationTime:100000,
        authorizationServer: {
            url:this.homeService.apiHost + this.homeService.authorizationUrl
        },
        autoRefreshSettings: {
            enabled: true,
            hourlySchedule: {
                hours: 0,
                minutes: 1,
                seconds: 0
            }

        },
        actionBegin:"emdbedDashboardActionBegin",
        actionComplete:"emdbedDashboardActionComplete"
    });

    console.log(this.dashboard);
    this.dashboard.loadDashboard();        
  } 
}

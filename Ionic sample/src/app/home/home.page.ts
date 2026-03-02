import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';
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

  constructor(private homeService: HomeService, private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch embed configuration from backend GetData action
    this.http.get<any>(this.homeService.apiHost + this.homeService.getEmbedConfigUrl).subscribe(data => {
      const transformedEmbedConfigData = {
        DashboardId: data.DashboardId || data.dashboardId,
        EmbedType: data.EmbedType || data.embedType,
        Environment: data.Environment || data.environment,
        ServerUrl: data.ServerUrl || data.serverUrl,
        SiteIdentifier: data.SiteIdentifier || data.siteIdentifier
      };

      // store in HomeService for reuse
      this.homeService.embedConfig = transformedEmbedConfigData;

      if (transformedEmbedConfigData.Environment == "enterprise" || transformedEmbedConfigData.Environment == "onpremise") {
        this.homeService.baseUrl = transformedEmbedConfigData.ServerUrl + "/" + transformedEmbedConfigData.SiteIdentifier;
        this.homeService.dashboardServerApiUrl = transformedEmbedConfigData.ServerUrl + "/api/" + transformedEmbedConfigData.SiteIdentifier;
      } else {
        this.homeService.baseUrl = transformedEmbedConfigData.ServerUrl;
        this.homeService.dashboardServerApiUrl = transformedEmbedConfigData.ServerUrl + "/api";
      }

      // now render using fetched config
      this.renderDashboard();
    }, error => {
      console.error('Failed to load embed config', error);
      // fallback to existing behavior
      if (this.homeService.environment == "enterprise") {
        this.homeService.baseUrl = this.homeService.rootUrl + "/" + this.homeService.siteIdentifier;
        this.homeService.dashboardServerApiUrl = this.homeService.rootUrl + "/api/" + this.homeService.siteIdentifier;
      } else {
        this.homeService.baseUrl = this.homeService.rootUrl;
        this.homeService.dashboardServerApiUrl = this.homeService.rootUrl + "/api";
      }
      this.renderDashboard();
    });
  }

  renderDashboard() {
    this.dashboard = BoldBI.create({
      serverUrl: this.homeService.baseUrl,
      dashboardId: this.homeService.embedConfig.DashboardId,
      embedContainerId: "dashboard",
      authorizationServer: {
        url: this.homeService.apiHost + this.homeService.authorizationUrl
      }
    });
    this.dashboard.loadDashboard();
  }
}
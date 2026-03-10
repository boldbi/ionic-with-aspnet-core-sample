import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { DashboardService } from '../dashboard.service';
import { appService } from '../app.service';
import { environment } from 'src/environments/environment';
declare var BoldBI: any;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public result: any;
  dashboard: any;
  
  constructor(private _app: appService, private homeService: HomeService, private dashboardService: DashboardService) {}
  
  
  ngOnInit(): void {
        this._app.GetEmbedConfig(this.homeService.apiHost + this.homeService.getEmbedConfigUrl).subscribe(data => {
            this.homeService.embedConfig = <any>data;
            // Transform camelCase keys to PascalCase
            const transformedEmbedConfigData = {
                DashboardId: this.homeService.embedConfig.dashboardId,
                EmbedType: this.homeService.embedConfig.embedType,
                Environment: this.homeService.embedConfig.environment,
                ServerUrl: this.homeService.embedConfig.serverUrl,
                SiteIdentifier: this.homeService.embedConfig.siteIdentifier
            };
            this.dashboardService.setEmbedConfig(transformedEmbedConfigData);
            if (this.dashboardService.embedConfig.Environment == "enterprise" || this.dashboardService.embedConfig.Environment == "onpremise") {
                this.homeService.baseUrl = this.dashboardService.embedConfig.ServerUrl + "/" + this.dashboardService.embedConfig.SiteIdentifier;
            } else {
                this.homeService.baseUrl = this.dashboardService.embedConfig.ServerUrl;
            }
        })
        this.renderDashboard();
    }

    getEmbedToken() {
        return fetch(this.homeService.apiHost + this.homeService.tokenGenerationUrl, { // Backend application URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
            .then(response => {
                if (!response.ok) throw new Error("Token fetch failed");
                return response.text();
            });
    }

    renderDashboard() {
        this.getEmbedToken()
            .then(accessToken => {
                const dashboard = BoldBI.create({
                    serverUrl: this.homeService.baseUrl,
                    dashboardId: this.dashboardService.embedConfig.DashboardId,
                    embedContainerId: "dashboard",
                    environment:this.dashboardService.embedConfig.Environment,
                    embedToken: accessToken
                });

                dashboard.loadDashboard();
            })
            .catch(err => {
                console.error("Error rendering dashboard:", err);
            });
    };
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //Asp.Net core application would be run on http://localhost:61377/, which needs to be set as `apiHost`
  public apiHost = "https://localhost:5001";

  //Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`)
  public environment = "enterprise";

  //Dashboard Server BI URL (ex: http://localhost:5000/bi, http://demo.boldbi.com/bi)
  public rootUrl = "http://localhost:60515/bi";

  //For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be empty string.
  public siteIdentifier = "site/site1";

  //Url of the GetDetails action in BoldBIEmbedController of the ASP.NET Core application
  public authorizationUrl = "/api/boldbiembed/getdetails";

  // Url to fetch embed configuration (GetData action in BoldBIEmbedController)
  public getEmbedConfigUrl = "/api/boldbiembed/getdata";

  // Will be populated at runtime with the embed configuration fetched from backend
  public embedConfig: any;

  public dashboards: any;

  public baseUrl: any;

  public dashboardServerApiUrl: string;

  constructor() { }
}
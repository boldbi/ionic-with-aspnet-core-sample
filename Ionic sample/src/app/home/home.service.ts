import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

//Asp.Net core application would be run on http://localhost:5000/, which needs to be set as `apiHost`

public apiHost="httpS://localhost:5001/";
  
//Url of the TokenGeneration action in BoldBIEmbedController of the ASP.NET Core application
public tokenGenerationUrl = "api/boldbiembed/tokengeneration";

public getEmbedConfigUrl = "api/boldbiembed/getdata";


public embedConfig: any;

public dashboards: any;

public baseUrl: any;

constructor() { }





}

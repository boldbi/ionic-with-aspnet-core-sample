# BoldBI Embedding Ionic Sample

This Bold BI Ionic sample repository contains the Dashboard embedding sample. This sample demonstrates how to embed the dashboard which is available in your Bold BI server.

This section guides you in using the Bold BI dashboard in your Ionic sample application.

* [Requirements to run the demo](#requirements-to-run-the-demo)
* [Using the Ionic sample](#using-the-ionic-sample)
* [Online Demos](#online-demos)
* [Documentation](#documentation)

## Requirements to run the demo

The samples require the following requirements to run.

* [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/)
* [.NET Core 6.0 or later](https://dotnet.microsoft.com/en-us/download/dotnet-core)
* [Node.js](https://nodejs.org/en/)
* [Visual Studio Code](https://code.visualstudio.com/download)

## Using the Ionic sample

* Open the ASP.NET Core sample's solution file `Syncfusion.Server.EmbedBoldBI.sln` in Visual studio.

* Open the EmbedProperties.cs file in the following location, /Models/EmbedProperties.cs.

* Please change the following properties in the `EmbedProperties.cs` file as per your Bold BI Server.

| **Parameter**       | **Description**                                                                                                      |
|---------------------|----------------------------------------------------------------------------------------------------------------------|
| **RootUrl**         | Dashboard Server URL (e.g., `http://localhost:5000/bi`, `http://demo.boldbi.com/bi`).                                                                               |
| **EmbedSecret**     | Get your EmbedSecret key from the Embed tab by enabling the `Enable embed authentication` on the [Administration page](https://help.boldbi.com/embedded-bi/site-administration/embed-settings/?utm_source=github&utm_medium=backlinks). |
| **SiteIdentifier**   | For the Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be an empty string.                                                |
| **Environment**     | Your Bold BI application environment. (If Cloud, you should use `cloud`; if Enterprise, you should use `enterprise`.)                                               |
| **UserEmail**       | UserEmail of the Admin in your Bold BI, which would be used to get the dashboard list.                                                                                |

* Now run the back-end ASP.NET Core sample.

* Open the Ionic sample in Visual studio code or any respective IDE.

* Open the home.service.ts file in the following location, /src/app/home/home.service.ts.

* Please change the following properties in the `home.service.ts` file as per your Bold BI Server. And provide the dashboard id in the `home.page.ts`.

| **Parameter**       | **Description** |
|---------------------|-----------------|
| **apiHost**         | Asp.Net Core application would be run on `http://localhost:61377/`, which needs to be set as `apiHost`. |
| **environment**     | Your Bold BI application environment. (If Cloud, you should use `cloud`, if Enterprise, you should use `enterprise`). |
| **RootUrl**         | Dashboard Server BI URL (e.g., `http://localhost:5000/bi`, `http://dashboard.syncfusion.com/bi`). |
| **SiteIdentifier**  | For Bold BI Enterprise edition, it should be like `site/site1`. For Bold BI Cloud, it should be an empty string. |
| **DashboardId**     | Provide the dashboard id of the dashboard that you want to embed here. |
| **authorizeUrl**    | API in back-end application, to get the particular dashboard details. |
| **getDashboardsUrl**| API in back-end application, to get the list of dashboards from Bold BI server. |

To run the sample, use the below command in terminal

```bash
ng serve
```

Please refer to the [help documentation](https://help.boldbi.com/embedded-bi/javascript-based/samples/v3.3.40-or-later/other-platform-samples/#ionic-sample-to-embed-dashboard?utm_source=github&utm_medium=backlinks) to know how to run the sample.

## Online Demos

Look at the Bold BI Embedding sample to live demo [here](https://samples.boldbi.com/embed?utm_source=github&utm_medium=backlinks).

## Documentation

A complete Bold BI Embedding documentation can be found on [Bold BI Embedding Help](https://help.boldbi.com/embedded-bi/javascript-based/?utm_source=github&utm_medium=backlinks).

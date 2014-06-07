// ==UserScript==

// @name           Roblox - Currency Exchange Quick Link

// @namespace      http://userscripts.org/users/73069

// @description    Adds a currency Exchange Link near your Currency

// @include        http://www.roblox.com/*
// @version       0.4
// ==/UserScript==
(function () {	
document.getElementById("ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_RobuxAlertCaptionHyperLink").href = "http://www.roblox.com/Marketplace/TradeCurrency.aspx";
document.getElementById("ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_TicketsAlertCaptionHyperLink").href = "http://www.roblox.com/Marketplace/TradeCurrency.aspx";
})();
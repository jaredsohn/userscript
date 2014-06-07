// ==UserScript==
// @name           premiumAdvisors
// @namespace      premiumAdvisors
// @description    Cambia los advisors de normal a premium
// @include        http://*ikariam.*/index.php*
// ==/UserScript==

var gameServer = top.location.host;
var URL= "http://"+gameServer+"/skin/layout/advisors/";
GM_addStyle("#advisors #advCities a.normal                                     {background-image:url("+URL+"mayor_premium.gif);}");
GM_addStyle("#advisors #advCities a.normalactive                               {background-image:url("+URL+"mayor_premium_active.gif);}");
GM_addStyle("#advisors #advMilitary a.normal                                   {background-image:url("+URL+"general_premium.gif);}");
GM_addStyle("#advisors #advMilitary a.normalactive                             {background-image:url("+URL+"general_premium_active.gif);}");
GM_addStyle("#advisors #advMilitary a.normalalert                              {background-image:url("+URL+"general_premium_alert);}");
GM_addStyle("#advisors #advResearch a.normal                                   {background-image:url("+URL+"scientist_premium.gif);}");
GM_addStyle("#advisors #advResearch a.normalactive                             {background-image:url("+URL+"scientist_premium_active.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normal                                  {background-image:url("+URL+"diplomat_premium.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive                            {background-image:url("+URL+"diplomat_premium_active.gif);}");

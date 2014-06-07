// ==UserScript==
// @name           BYBS Ikariam Normal Advisor
// @namespace      http://electropolls.webs.com/
// @description    Ikariam: Changes the Normal Advisor Icons to B Y B S
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==


var URL= "http://s255.photobucket.com/albums/hh129/JeStorM/";

GM_addStyle("#advisors #advCities a.normal                                     {background-image:url("+URL+"B1.gif);}");
GM_addStyle("#advisors #advCities a.normalactive                               {background-image:url("+URL+"anib1.gif);}");
GM_addStyle("#advisors #advMilitary a.normal                                   {background-image:url("+URL+"y.gif);}");
GM_addStyle("#advisors #advMilitary a.normalactive                             {background-image:url("+URL+"aniy.gif);}");
GM_addStyle("#advisors #advMilitary a.normalalert                              {background-image:url("+URL+"under.gif);}");
GM_addStyle("#advisors #advResearch a.normal                                   {background-image:url("+URL+"b2.gif);}");
GM_addStyle("#advisors #advResearch a.normalactive                             {background-image:url("+URL+"anib2.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normal                                  {background-image:url("+URL+"s-3.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive                            {background-image:url("+URL+"anis.gif);}");
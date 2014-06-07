// ==UserScript==
// @name           Ikariam: dragon Theme
// @namespace      
// @version        2.0
// @author         yoshivb (based on gold icons)
// @description    UPDATE: Alot of new things go check it out by urself
// @include        http://s*.ikariam.*/*
// @include        http://*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

// ---- Version 2.2.0 ---- 
var URL= "http://www.extra.x.gg/";
GM_addStyle("#worldmap_iso #container #mapControls .scrolling                                     {background: url("+URL+"btns_mapnav.gif) no-repeat scroll -200px 0 transparent;");
GM_addStyle("#island #mainview #cities .buildplace .claim                                     {background-image: url("+URL+"flag_yellow_a.gif);");
GM_addStyle("#city #container #mainview #locations .wall .flag                                     {background-image: url("+URL+"flag_yellow_a.gif);");
GM_addStyle("#city #container #mainview #locations .shore .flag                                     {background-image: url("+URL+"flag_blue_a.gif);");
GM_addStyle("#city #container #mainview #locations .land .flag                                     {background-image: url("+URL+"flag_red_a.gif);");
GM_addStyle("#sky #birds                                     {background: url("+URL+"pt-birds.png) repeat-x scroll 0 0 transparent;");
GM_addStyle("#header #logo a                                     {background: url("+URL+"logo.png) no-repeat scroll 0 0 transparent;");
GM_addStyle("#breadcrumbs                                     {background: url("+URL+"bg_breadcrumbs.gif) no-repeat scroll 0 0 transparent;");
GM_addStyle("#globalResources .transporters a                                     {background: url("+URL+"btn_ship2.jpg) no-repeat scroll 0 0 transparent;");
GM_addStyle("#globalResources .gold a                                     {background: url("+URL+"btn_gold.jpg) no-repeat scroll 0 0 transparent;");
GM_addStyle("#cityNav .viewWorldmap a                                     {background-image: url("+URL+"btn_world.gif);");
GM_addStyle("#cityNav .viewIsland a                                     {background-image: url("+URL+"btn_island.gif);");
GM_addStyle("#cityNav .viewCity a                                     {background-image: url("+URL+"btn_city.jpg);");
GM_addStyle("#advisors #advCities a.normal                                     {background-image:url("+URL+"m_gold.gif);}");
GM_addStyle("#advisors #advCities a.normalactive                               {background-image:url("+URL+"m_gold_a.gif);}");
GM_addStyle("#advisors #advMilitary a.normal                                   {background-image:url("+URL+"g_gold.gif);}");
GM_addStyle("#advisors #advMilitary a.normalactive                             {background-image:url("+URL+"g_gold_a.gif);}");
GM_addStyle("#advisors #advMilitary a.normalalert                              {background-image:url("+URL+"g_gold_alert);}");
GM_addStyle("#advisors #advResearch a.normal                                   {background-image:url("+URL+"s_gold.gif);}");
GM_addStyle("#advisors #advResearch a.normalactive                             {background-image:url("+URL+"s_gold_a.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normal                                  {background-image:url("+URL+"d_gold.gif);}");
GM_addStyle("#advisors #advDiplomacy a.normalactive                            {background-image:url("+URL+"d_gold_a.gif);}");
GM_addStyle("#sidebar #major                            {background: url("+URL+"major.png) no-repeat scroll 0 0 transparent;");

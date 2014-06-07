// ==UserScript==
// @name           Ikariam Visual Fixes
// @namespace      http://tester.pl/
// @description    Ikariam Visual Fixes
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/ad*
// @exclude        http://s*.ikariam.*/index.php*(\?|&)view=militaryAdvisorDetailedReportView*
// @copyright      Mellonedain
// @version        1.0.2
// ==/UserScript==

//Example: GM_addStyle("ul#chLi a { display: inline; color: #F00; font-size: 8pt;}");
//To copy: GM_addStyle("");

//Strona doradcy wojskowego
GM_addStyle("#container .dynamic { clear: left; }");
GM_addStyle("#militaryAdvisorMilitaryMovements #combatsInProgress .eventbar .status { float: none; }");
GM_addStyle("#militaryAdvisorMilitaryMovements #combatsInProgress .eventbar .nextEventETA { float: none; position: absolute; right: 0px; }");

//Mur:
GM_addStyle("#wall .bgWall { position: relative; }");
GM_addStyle("#wall #wallInfoBox { width: 262px; float: none; }");

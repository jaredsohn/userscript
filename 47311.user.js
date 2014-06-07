// ==UserScript==
// @name           Sportsline Auto Focus
// @namespace      SAF
// @description    AutoFocus Sportsline
// @include        http://*cbssports.com/*/gamecenter/*
// @include        http://*cbssports.com/*/gametracker/*
// @version        1.1
// @run-at         document-idle
// @delay		   3000
// ==/UserScript==

//Version History
//.10 - (04-21-2009) - Initial release
//.20 - (05-31-2009) - Fixed a problem when loading an NHL page
//.25 - (06-01-2009) - Fixed more probelms with NBA, NCAA, and NCAAW games not working correctly
//.30 - (06-02-2009) - Fixed NHL page not loading all content
//.40 - (09-05-2009) - Fixed problem with college football
//.50 - (09-06-2009) - Fixed problem with NFL
//.55 - (09-10-2009) - Fixed another problem with NFL not loading correctly
//1.0 - (03-09-2010) - Updated to fit new sportsline layout as well as condensing the code
//1.01 - (04-04-2010) - Fixed problem with MLB pages
//1.1 - (04-11-2013) - Fixed problems globally?

///////////////////OLD CODE
// var str=(location.href)

// if (str.match("nhl") || str.match("nfl")) {
// location.replace(location.href.replace(location.hash,"")+"#live");
// setTimeout("window.stop()", 600);
// }
// else if (str.match("nba") || str.match("collegebasketball") || str.match("ncaawbasketball") || str.match("collegefootball") || str.match("mlb")) {
// location.replace(location.href.replace(location.hash,"")+"#live");
// }
/////////////////////////

location.href = "#";
location.href = "#live";
window.stop();
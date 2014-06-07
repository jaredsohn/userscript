// ==UserScript==
// @name           BiteFight: Script for Top25 and Profile
// @namespace      Script for Top25 and Profile
// @description    Script for Top25 and Profile
// @include        http://*.bitefight.ru/*
// ==/UserScript==

( function () {
var content = document.getElementById("menuHead");
var alink = document.createElement("li");
alink.innerHTML = '<a href="http://bf.logserver.net/top25/"  target="_blank" class="" >Top25</a>';
alink.className='btn';

var alink2 = document.createElement("li");
alink2.innerHTML = '<a href="http://bf.logserver.net/top25/profile.php"  target="_blank" class="" >Profile</a>';
alink2.className='btn';

content.appendChild(alink);
content.appendChild(alink2);

var theHref = document.location.href;
if (theHref.indexOf ("/profile/player") > -1){

var div = document.createElement("div");
div.innerHTML = '<iframe src="http://bf.logserver.net/top25/pf.php?url='+theHref+'" width="730" height="970" frameborder="0" align="center" scrolling="no">';

var playerStatistic = document.getElementById("playerStatistic");
playerStatistic.appendChild(div);

}
}) ();
// ==UserScript==
// @name           MyGamerCard.net Profile Dark Theme
// @namespace      http://userscripts.org
// @description    Alters MyGamerCard.net profile pages to be blue and black instead of green.
// @include        http://profile.mygamercard.net/*
// ==/UserScript==

document.getElementsByTagName("head")[0].innerHTML +=
"<style type='text/css'>\
	body {background: none #596065 !important}\
	#headerpre {height: 5px}\
	#header, .miniboxalt2, .userProfileCLeft img, #sidebar {display:none}\
	#main {width: 100%; margin-top: -12px}\
	.parentbackground {margin: 0 auto}\
	.rightcontent {position:relative}\
	.green, td.green {color: #5555FF}\
	a, h2 a:link, h2 a:visited {color: #0000BB}\
	#sidebar .minibox .content, .content td, .bottomrightborder h3 {color: #000077}\
	.bottomrightborder h3 {font-size:100%; margin-top: -3px; margin-bottom: 3px}\
	.userProfileTitle, .userProfileMotto {color: #000055}\
	.pbar {background: url(http://static.mgcstatic.net/images/site/profiles/tile2.gif);}\
	.userProfileContents {border-top: 3px double #AAAAAA;}\
	.userPicture {width:100px}\
	.userPicture, .userProfileAchTable {border-left: 3px double #AAAAAA}\
	.navigation7D:link, .navigation7D:visited {color: #FFF !important}\
	//.navigationLinks a:hover, .navigationLinks a:visited:hover {color: #7050FF}\
</style>";

document.getElementById("headerpre").innerHTML = "";

var userProfile = document.getElementsByClassName("userProfileBg")[0];
userProfile.className = "parentbackground";
userProfile.style.width = "100%";
userProfile.innerHTML = "<div class='leftborder'><div class='rightborder'><div class='topborder'><div class='bottomborder'><div class='topleftborder'><div class='toprightborder'>"
		+ userProfile.innerHTML.replace("userProfileBottom","bottomleftborder").replace("userProfileTop", "bottomrightborder\" style=\"padding:5px") + "</div></div></div></div></div></div>";

var bar = document.createElement("div");
bar.className = "parentbackground";
bar.innerHTML = "<div class='leftborder'><div class='rightborder'><div class='topborder'><div class='bottomborder'><div class='topleftborder'><div class='toprightborder'><div class='bottomleftborder'><div class='bottomrightborder'><table style='width:100%' cellspacing='15'><tr>";
bar.innerHTML += "</tr></table></div></div></div></div></div></div></div></div>";
var barInner = bar.getElementsByTagName("tr")[0];
var cell = document.createElement("td");
cell.style.width = "36%";

temp = document.createElement("h3");
temp.innerHTML = "Organize Game List";
cell.appendChild(temp);
temp = document.getElementById("o1");
temp.parentNode.removeChild(temp);
cell.appendChild(temp);
barInner.appendChild(cell);
cell = document.createElement("td");
cell.style.width = "30%";

var stats = document.getElementById("sidebar").getElementsByTagName("table");
var temp = stats[3];
temp.parentNode.removeChild(temp);
cell.appendChild(temp);
barInner.appendChild(cell);
cell = document.createElement("td");
cell.style.width = "30%";
temp = stats[2];
temp.parentNode.removeChild(temp);
cell.appendChild(temp);
barInner.appendChild(cell);
cell = document.createElement("td");

document.getElementById("main").insertBefore(bar, document.getElementsByClassName("parentbackground")[1]);

var ads = document.getElementsByTagName("td");
ads[0].style.cursor = "default";
ads[0].removeAttribute("onclick");
ads[ads.length-1].style.cursor = "default";
ads[ads.length-1].removeAttribute("onclick");
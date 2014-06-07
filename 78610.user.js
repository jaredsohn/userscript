// ==UserScript==
// @name           	Pimp your TinyPic
// @namespace      	afzalnaj.deviantart.com
// @description	   	Adds direct links and a convertible link list to the gallery pages
// @author         	eViLrAcEr (AfzalNaj)
// @include        	http://tinypic.com*
// @include        	http://www.tinypic.com*
// @version 		1.0.5
// @history 		1.0.5 Thumbnail to full size bbcode over all thumbnails (edit file in notepad to disable, follow the comments)
// @history 		1.0.4 Added a "thumbnail linked to full size image" list.
// @history 		1.0.3 Added a manual update check button near the log out button at the top
// @history 		1.0.2 Doesn't select all when clicking inside the box with the list anymore
// @history 		1.0.1 Added a randomizer to generate links from all 6 Tinypic servers
// @require 		http://userscripts.org/scripts/source/57756.user.js
// ==/UserScript==

//Uncomment the following to redirect to yourhome page from the tinypic index page
/*
if (window.location=="http://tinypic.com/") {
location.replace("http://tinypic.com/yourhome.php")
}
*/

//Adds css to some elements
	GM_addStyle(
				".linkurl {opacity: .50;border:1px solid #9EB1A2;-moz-border-radius:5px;display:block;text-align:center;background-color:#D6F0FF; width:99%} \
				.in-album {top:auto!important;bottom:0;}  \
				.linkLabel {color:#FFFFFF !important;font-weight:normal;} \
				#imgLinksId,#listLinksId {display: none;} \
				#allLinksId {margin-bottom: 15px;} \
				#ScriptUpdater78610Body h1 { font-size:13px; font-weight:bold; padding:.5em; background:url('../i/body-header-bg.gif') repeat-x scroll 0 0 #42679C; border-bottom:1px solid #333; margin-bottom:.75em; } "
	);

var thumburl, m, n, filename, newurl, noOfitems, copylink, allLinks, listLinks, imgLinks, listurls, imgurls, noOfImgs, sno, thurl, showIMGtag;

//change this value to false to disable the IMG tag thing on top of each thumbnail
showIMGtag=true;

thurl = new Array();
newurl = new Array();
n=0;
noOfitems = document.getElementsByClassName("browsestuff")[0].childNodes[1].childNodes.length;

//checks for Album-info existence, if it exists, starts the loop from 3 instead of 1
if (document.getElementsByClassName("album-info")[0]){
	m=3;
} else {
	m=1;
}

sno = new Array();  
sno[0] = "i45";  
sno[1] = "i46";  
sno[2] = "i47";  
sno[3] = "i48";  
sno[4] = "i49";  
sno[5] = "i50";

//checks for page location, extracts thumbnail links accordingly, converts them to image links, adds them to an array and to the top of each thumbnail
for (var i=m; i<noOfitems;i=i+2){
	listitem = document.getElementsByClassName("browsestuff")[0].childNodes[1].childNodes[i];
	if (window.location.href.match("http://.+/yourhome.php")) {
		thumburl = listitem.childNodes[0].childNodes[0].src;
	} else if (window.location.href.match("http://.+/yourstuff.php")) {
		thumburl = listitem.childNodes[1].childNodes[1].src;
	} else if (window.location.href.match("http://.+/useralbum.php.+")) {
		thumburl = listitem.childNodes[1].childNodes[0].childNodes[1].src;
	} else if (window.location.href.match("http://.+/yourfavs.php")) {
		thumburl = listitem.childNodes[1].childNodes[1].src;
	}
	regex = "http://.+.tinypic.com/(.+)_th.jpg";
	thumbfile = thumburl.match(regex)[0];
	filename = thumburl.match(regex)[1];
	randno = Math.floor ( Math.random() * sno.length ); 
	newurl[n] = "http://"+sno[randno]+".tinypic.com/"+filename+".jpg";
	thurl[n] = "[url="+newurl[n]+"][img]"+thumbfile+"[/img][/url]";
	
	copylink = document.createElement("span");
	copylink.innerHTML = "<input class='linkurl' type='text' value="+newurl[n]+" readonly='readonly' onclick='this.select()' />";
	
	copythlink = document.createElement("span");
	copythlink.innerHTML = "<input class='linkurl' type='text' value="+thurl[n]+" readonly='readonly' onclick='this.select()' />";

	listA = listitem.firstChild;
	
	listA.parentNode.insertBefore(copylink, listA);
	if (showIMGtag==true) {
	listA.parentNode.insertBefore(copythlink, copylink.nextSibling);
	}
	n=n+1;

}

//joins the array of links into a return-separated list
noOfImgs = newurl.length;
listurls = newurl.join("\r\n");
imgurls = newurl.join("[/img]\r\n[img]");
thumburls = thurl.join("\r\n");

//creates the main div containing the list of links shown to user
allLinks = document.createElement("div");
allLinks.id = "allLinksId";

//creates the div containing the list of direct links not shown to user
listLinks = document.createElement("div");
listLinks.id = "listLinksId";
listLinks.innerHTML = '<label id="selectAll" class="linkLabel">'+noOfImgs+' image(s) [<a href="#" onclick=\'document.getElementById("urlbox").select(); return false;\'>Select All</a>] [<a href="#" onClick=\'document.getElementById("allLinksId").innerHTML = document.getElementById("imgLinksId").innerHTML; return false;\'>Convert to IMG</a>]</label><div class="flashcode"><textarea id="urlbox" style="width:92%; height:'+(15*(noOfImgs))+'px;">'+listurls+'</textarea></div>';

//creates the div containing the list of IMG tag links not shown to user
imgLinks = document.createElement("div");
imgLinks.id = "imgLinksId";
imgLinks.innerHTML = '<label id="selectAll" class="linkLabel">'+noOfImgs+' image(s) [<a href="#" onclick=\'document.getElementById("urlbox").select(); return false;\'>Select All</a>] [<a href="#" onClick=\'document.getElementById("allLinksId").innerHTML = document.getElementById("listLinksId").innerHTML; return false;\'>Convert to Direct Links</a>]</label><div class="flashcode"><textarea id="urlbox" style="width:92%; height:'+(15*(noOfImgs))+'px;">[img]'+imgurls+'[/img]</textarea></div>';

//creates the div containing the list of thumbnail+fullsize tag links shown to user
thumbLinks = document.createElement("div");
thumbLinks.id = "thumbLinksId";
thumbLinks.innerHTML = '<label id="selectAll" class="linkLabel">Thumbnail to Full Size Image [<a href="#" onclick=\'document.getElementById("thurlbox").select(); return false;\'>Select All</a>]<div class="flashcode"><textarea id="thurlbox" wrap="off" style="width:92%; height:'+(15*(noOfImgs)+20)+'px;">'+thumburls+'</textarea></div>';

allLinks.innerHTML = listLinks.innerHTML;

//adds all four divs to the page
document.getElementsByClassName("media-toolbox")[0].appendChild(allLinks);
document.getElementsByClassName("media-toolbox")[0].appendChild(listLinks);
document.getElementsByClassName("media-toolbox")[0].appendChild(imgLinks);
document.getElementsByClassName("media-toolbox")[0].appendChild(thumbLinks);


//manual update checker
updateButton = document.createElement('li');
updateButton.value = "Check for Updates";
updateButton.innerHTML = '<a href="#">Check for Script Updates</a>'
updateButton.addEventListener('click', function() { ScriptUpdater.forceNotice(78610, "1.0.5"); }, true); 
settingLink = document.getElementById("account-settings");
settingLink.parentNode.insertBefore(updateButton, settingLink); 

//auto update checker (every 6 hours)
ScriptUpdater.check(78610, "1.0.5");
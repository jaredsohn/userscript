// ==UserScript==
// @name        Steam Torrents
// @namespace   TyrannoSatan
// @description Makes downloading games on steam easier.
// @include     *steampowered.com/app*
// @version     0.1
// @icon        http://i.imgur.com/n5vCijF.png
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @grant       GM_log
// @downloadURL https://userscripts.org/scripts/source/169892.user.js 
// ==/UserScript==

//Choose whether to hide the share bar (facebook, twitter, etc.)
var hideShareBar = true;

var title = document.title;

//Clean Up Title
title = title.replace(" on Steam","");
//Discounts
title = title.replace(/Save.+on /,"");
//Pre-Purchase for the dummies (I have no idea if this will be good - here's 60 dollars, call me <3)
title = title.replace(/Pre.+hase/,"");

//Build Torrent Sites Search Query
title = title.replace(" ","+");
var iptorrents = "http://www.iptorrents.com/torrents/?l77=&l6=&l48=&l54=&l62=&l38=&l68=&l7=&l8=&l78=&l66=&l65=&l5=&l4=&l2=&l43=&l45=&l40=&l50=&l3=&l37=&l60=&l1=&l64=&l35=&l36=&l55=&q=" + title;
var torrentleech = "http://www.torrentleech.org/torrents/browse/index/query/" + title + "/categories/17";
var piratebay = "http://thepiratebay.sx/search/" + title + "/0/99/400";

//Generate Favicon HTML
var iptorrentsIcon = "&nbsp; <a href='" + iptorrents + "' target='_blank\' title='Search for " + title + " on Iptorrents'><img src='http://www.iptorrents.com/favicon.ico'></a>";
var torrentleechIcon = "&nbsp; <a href='" + torrentleech + "' target='_blank\' title='Search for " + title + " on Torrentleech'><img src='http://www.torrentleech.org/favicon.ico'></a>";
var piratebayIcon = "&nbsp; <a href='" + piratebay + "' target='_blank\' title='Search for " + title + " on ThePirateBay'><img src='http://thepiratebay.sx/favicon.ico'></a>";
var allIcons = iptorrentsIcon + torrentleechIcon + piratebayIcon;

//Remove Share Bar (or not)
var shareButtonSource = $(".share").html();
if (hideShareBar == false) {
	shareButtonSource = "Torrent:" + allIcons + "<br></br>" + shareButtonSource;
	}
else if (hideShareBar == true){
	shareButtonSource = "Torrent:" + allIcons;
}

//Put it on the page
$(".share").html(shareButtonSource);

// ==UserScript==
// @name        Archievo Favoriten
// @namespace   hiszilla
// @description zeigt Button zu Favoriten auf Startseite an
// @include     https://achievo.his.de/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @resource	favorit   http://9tw.de/ext_images/star.png
// @version     1.1
// @grant GM_getResourceURL
// ==/UserScript==

var iconLink = GM_getResourceURL("favorit");
var favoriteLink = '<a class="iconlink" target="main"'
                 + ' href="dispatch.php?atknodetype=timeregistration.timeregistration&atkaction=timeregistration&subaction=favourite_show">'
                 + '<img width="50px" height="50px" alt="icon" src="'+iconLink+'"></img>'
                 + '<br/><span>Favoriten</span></a>';
                 
$('#bannerIcons').prepend(favoriteLink);
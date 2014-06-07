// ==UserScript==
// @name           Photobucket Clean-Up
// @description    Removes all ads and minimizes page size.
// @include        http://*.photobucket.com/*
// @include        http://photobucket.com/*
// ==/UserScript==
// Version 1

if (window.location == 'http://photobucket.com/') {
addy=document.getElementById('containerPbRectPromo').innerHTML;
addy1=addy.split('<img src=');
addy2=addy1[0].split('?action');
document.getElementById('panelFeatures').style.display='none';
document.getElementById('containerPbRectPromo').innerHTML=' ';
buttonsrc=document.getElementById('bigRedButton').innerHTML;
document.getElementById('containerPbRectPromo').style.border='none';
document.getElementById('containerPbRectPromo').innerHTML='<br><br><br><br><br><br><br>'+addy2[0]+buttonsrc;
document.getElementById('bigRedButton').style.display='none';
document.title='Photobucket';
}
if (window.location != 'http://photobucket.com/') {
document.getElementById('containerAlbumPromo').style.display='none';
document.getElementById('panelHeaderAd').style.display='none';
document.getElementById('advPanelContainer').style.innerHTML='&nbsp;'
document.getElementById('advPanelContainer').style.width=400;
document.getElementById('containerAlbumButtons').innerHTML='<a href="?action=remix">&nbsp;Create Remix </a><a href="?action=viewwidgets">&nbsp;View Slideshows </a><a target="_blank" href="?action=printIt">&nbsp;Order Prints </a><a href="?action=share">&nbsp;Share Album </a><a href="/bucketsites.php">&nbsp;Bucket Sites </a><a href="/meez">&nbsp;Avatars </a><style>#containerAlbumButtons a {border: thin solid blue;}#containerAlbumButtons a:hover {border: thin solid white; background-color:blue; text-decoration:none; color:white}</style>';
currenttitle=document.title;
title1=currenttitle.split(' - Video and');
document.title=title1[0];
}
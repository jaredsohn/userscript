// HTN Modifikation user script
// version 0.2 BETA!
// 23.07.2007
// Copyright (c) 2007, dunst
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "htn_mod", and click Uninstall.
//
// --------------------------------------------------------------------
//
//
// ==UserScript==
// @name          htn_mod
// @namespace     http://dunst.homeip.net
// @description   Verändert die Obfläche von HTN
// @include       http://hackthenet.org/*
// @exclude       http://hackthenet.org/_htn.php/wiki/show/*
// @exclude       http://hackthenet.org/_htn.php/pub/*
// ==/UserScript==


var topbar = document.getElementsByTagName('div')[0];
if (topbar) {
    topbar.parentNode.removeChild(topbar);
}

var topIMG = document.getElementsByTagName('h1')[0];
if (topIMG) {
    topIMG.parentNode.removeChild(topIMG);
}

var space = document.createElement('div');
if (space) {
  space.style.height = '30px';
  document.body.insertBefore(space, document.body.firstChild);
}


var navi_start = document.getElementById('navi').childNodes[1];
if (navi_start) {
  document.getElementById('navi').style.top = '110px;';
  document.getElementById('navi').removeChild(navi_start);
}


var shortBAR = document.createElement('div');
if (shortBAR) {
  shortBAR.style.position = 'fixed';
  shortBAR.style.zIndex = '3';
  shortBAR.style.width = '100%';
  shortBAR.style.background = '#000';
  shortBAR.style.color = '#0CF';
  shortBAR.style.padding = '8px';
  shortBAR.style.margin = '0';
  shortBAR.innerHTML = '<b>ShortBar: </b>' +
                       '<div style="position:absolute; top:8px; left:400px;">' +
                       '<a href="/_htn.php/msgs/sendmail" style="border:1px solid; padding:3px 4px; background-color:#ccc;"><b>Neue Mail</b></a> ' +
                       '<a href="/_htn.php/cboard/show" style="border:1px solid; padding:3px 4px; background-color:#ccc;"><b>Clusterboard</b></a> ' +
                       '<a href="/_htn.php/user/notes" style="border:1px solid; padding:3px 4px; background-color:#ccc;"><b>Notizblock</b></a> ' +
                       '<a href="/_htn.php/user/config#user-config-freeze" style="border:1px solid; padding:3px 4px; background-color:#ccc;"><b>Edit Profil</b></a> ' +
                       '</div>';
  document.body.insertBefore(shortBAR, document.body.firstChild);
}


var credits = document.getElementById('credits');   // .cloneNode(true) bugt leider :(
if (credits) {
  credits.style.position = 'fixed';
  credits.style.zIndex = '3';
  credits.style.top = '4px';
  credits.style.left = '230px';
  credits.style.color = '#FFF';
  credits.style.width = '100px';
  credits.style.padding = '4px';
  shortBAR.parentNode.insertBefore(credits, shortBAR.nextSibling);
}


var pcpanel = document.getElementById('pcpanel');
if (pcpanel) {
  pcpanel.style.position = 'fixed';
  pcpanel.style.zIndex = '3';
  pcpanel.style.top = '5px';
}


var clock = document.getElementById('clock');
if (clock) {
  clock.style.position = 'fixed';
  clock.style.zIndex = '3';
  clock.style.top = '5px';
  clock.style.left = '100px';
  clock.style.color = '#FFF';
  clock.style.width = '100px';
  clock.style.padding = '4px';
}

///////# DEBUG #/////////
//alert('Script works!');
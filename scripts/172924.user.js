// ==UserScript==
// @name         Vinaleech Remove Ad Pop Up
// @namespace    http://userscripts.org/scripts/show/172924
// @description  Removes the ads which pops-up in vinaleech.com
// @include      http://*vinaleech*
// @include      http://*vinaget*
// @grant        none
// @updateURL    http://userscripts.org/scripts/source/172924.meta.js
// @downloadURL  https://userscripts.org/scripts/source/172924.user.js
// @require		 http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @version      1.0.1
// @icon         http://us.vinaleech.com/favicon.ico
// ==/UserScript==

if(document.location.href.indexOf("check")>=0)
(elem=document.getElementsByTagName('div')[13]).parentNode.removeChild(elem);
else{
(elem=document.getElementsByTagName('div')[73]).parentNode.removeChild(elem);
var f=$("#maincol");
targetOffset=f.offset().top
$('html,body').animate({scrollTop: targetOffset}, 'slow');
//$('#cboxform').contents().find('#pst').focus();

}


// ==UserScript==
// @name        TIBCO Support Central - Wide Screen
// @namespace   http://userscriptes.org/users/AntAreS24
// @include     https://support.tibco.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     3
// @grant       none
// ==/UserScript==

//console.log("in");
// change the mtable class to 95% instead of fixed width.
$(".mtable").css("width","95%");

// change the mainwrapper class to 100% instead of 85%.
$(".mainwrapper").css("width","100%");

// change the table rows and header class.
$(".SITableHeaderBG round").css("width","100%");
$(".SITableCellBorder").css("width","100%");

//${"#_related_unify_messaging").css("width","100%");

//console.log("out");


///////////////////////////////////////
// Enable top menu collapse
//////////////////////////////////////
// WIP
// Get element by class name mainmenu_div
// Add id "main_menu" to it.
// Insert as child 
// <a onclick="return hide('main_menu');" name="1" href="#1">Hide</a>
// Insert after element 
// <a onclick="return show('main_menu');" name="2" href="#1">show</a>
// Need to hide the link when showed/hidden

function show(id) { 
  if(document.getElementById(id).style.display=='none') { 
    document.getElementById(id).style.display='block'; 
  } 
  return false;
} 
function hide(id) { 
  if(document.getElementById(id).style.display=='block') { 
    document.getElementById(id).style.display='none'; 
  } 
  return false;
}

window.addEventListener("load", show, false);
window.addEventListener("load", hide, false);

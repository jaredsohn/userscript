// ==UserScript==
// @name           imdb
// @description    hides votes - unless you voted already, duh
// @include        http*://www.imdb.com/*
// ==/UserScript==

function hideimdbratings(){

if ($("tn15rating")) {

reenabled = $("tn15rating").innerHTML;

if ($("voteuser").innerHTML == "") {

// document.getElementById("tn15rating").innerHTML = '<a onclick="reenable()" style="color:#FF0000;text-decoration:underline;">Rate</a>';
$("tn15rating").innerHTML = '<div id="showvote" style="width:20px;height:20px;background: url(\'http://i.media-imdb.com/images/SFfaca2a5028ed91753ebf40667ffe4551/tn15/stars.png\') 0px -20px no-repeat transparent" onmouseover="$(\'showvote\').style.opacity=\'0.5\'" onmouseout="$(\'showvote\').style.opacity=\'1.0\'" onclick="reenable()"></div>';

}


} else {
hideimdbratings();
}


}


function reenable(){
$("tn15rating").innerHTML = reenabled;
}

function $(id) {
  return document.getElementById(id);
}

   window.addEventListener('DOMContentLoaded', hideimdbratings, false);
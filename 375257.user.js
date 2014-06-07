// ==UserScript==
// @name        okcupid_no_smokers
// @namespace   gleske.net
// @description Highlights smokers so I don't waste my time.
// @include     http://www.okcupid.com/profile/*
// @version     1.0
// ==/UserScript==

//flag smokers on details card
if ($("ajax_smoking").innerHTML=="Yes"){
  $("ajax_smoking").style.backgroundColor="#ff9b9b";//light red
}
else if(/Sometimes|When drinking|Trying to quit/i.test($("ajax_smoking").innerHTML)){
  $("ajax_smoking").style.backgroundColor="#fff88d";//light yellow
}
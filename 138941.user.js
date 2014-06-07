// ==UserScript==
// @name           AvaxHome Key 
// @description    AvaxHome Keystrokes for next and prev pages
// @version        0.1
// @license        Public Domain
// @include        http://avaxhome.ws/*
// @include        http://avaxhome.cc/*
// @include        http://avaxhome.bz/*
// @include        http://avaxsearch.com/*
// @include        http://www.avaxhome.ws/*
// @include        http://www.avaxhome.bz/*
// ==/UserScript==

var next_page = document.getElementsByClassName('next_page')[0].href;
var previous_page = document.getElementsByClassName('previous_page')[0].href;
var news = document.getElementsByClassName('news');
var items = document.getElementsByClassName('item');
if (news.length == 0){
   news = []
   for (var i=0;i<items.length;i++){
       items[i].id = 'item'+i;
       news.push( items[i] );
   }
}

var index = 0;

document.onkeyup = KeyCheck;       
function KeyCheck(evt){
   var KeyID = evt.keyCode;
   switch(KeyID){
      case 16:
      // document.Form1.KeyName.value = "Shift";
      break; 
      case 17:
      // document.Form1.KeyName.value = "Ctrl";
      break;
      case 18:
      // document.Form1.KeyName.value = "Alt";
      break;
      case 19:
      // document.Form1.KeyName.value = "Pause";
      break;
      case 37:
      // document.Form1.KeyName.value = "Arrow Left";
      if (previous_page != undefined)
	  document.location = previous_page;
      break;
      case 38:
      // document.Form1.KeyName.value = "p";
	  if (index >0)
		index--;
	  document.location.hash = news[index].id;
      break;
      case 39:
      // document.Form1.KeyName.value = "Arrow Right";
      if (next_page != undefined)
	  document.location = next_page;
      break;
      case 40:
	  if (index < news.length)
		index++;

	  document.location.hash = news[index].id;
      // document.Form1.KeyName.value = "n";
      break;
   }
}
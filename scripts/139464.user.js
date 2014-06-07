// ==UserScript==
// @name           ilpost.it Image Key scroll
// @description    ilpost.it keystrokes for next and prev images in gallery
// @version        0.2
// @license        Public Domain
// @include        http://www.ilpost.it/*
// ==/UserScript==

var next_page = undefined;
try{
    next_page =  document.getElementsByClassName('nav-next-top')[0].childNodes[0].nextSibling.href;
}catch(e){}

if (next_page == undefined)
    try{
        next_page = document.getElementsByClassName('next_post')[0].childNodes[0].href;
    } catch(e){}

var previous_page = undefined;
try{
    previous_page = document.getElementsByClassName('nav-prev-top')[0].childNodes[0].nextSibling.href;
}catch(e){}
if (previous_page == undefined)
    try{
        previous_page = document.getElementsByClassName('prev_post')[0].childNodes[0].href || document.getElementsByClassName('prev_post')[0].childNodes[1].href;
    } catch(e){}


/*
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
*/
document.onkeyup = KeyCheck;       
function KeyCheck(){
   var KeyID = event.keyCode;
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
//	  if (index >0)
//		index--;
//	  document.location.hash = news[index].id;
      break;
      case 39:
      // document.Form1.KeyName.value = "Arrow Right";
      if (next_page != undefined)
	  document.location = next_page;
      break;
      case 40:
//	  if (index < news.length)
//		index++;

//	  document.location.hash = news[index].id;
      // document.Form1.KeyName.value = "n";
      break;
   }
}
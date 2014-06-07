// ==UserScript==

// @name          just first try bump thread

// @namespace     nothing

// @description   A basic example of Greasemonkey that causes auto bump on dota2lounge
                  and you must include an add-ons to reload every 30minutes

// @include       http://dota2lounge.com/mytrades

// ==/UserScript==


   var a = document.getElementsByClassName('buttonright');
   var newoffer = document.getElementsByClassName('notification');
   var audio = new Audio();
   var i = 0;
   var linkaudioogg = 'http://irpi.jr1.ru/ku-ku.ogg';
   
   for (i = 0; i < a.length; i++) {
         a[i].click();
		 //alert('udah jalan scriptnya broo !!');
   }
   if(newoffer.length == 0) playsound(linkaudioogg);
   function playsound(audios){
		audio.src = audios;
		audio.autoplay = enabledsound;
	}

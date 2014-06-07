// ==UserScript==

// @name          autobump thread

// @namespace     nothing

// @description   auto bump on dota2lounge

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
   if(newoffer.length != 0) 
   {
		alert('New Offer bro !!');
   }

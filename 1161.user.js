// ==UserScript==
// @name          Practical Common Lisp Footnotes
// @namespace     http://birdman.acceleration.net/userscripts
// @description	  Greets the world
// @include       http://www.gigamonkeys.com/book/*
// ==/UserScript==

(function () {
  var body = document.body.innerHTML;
  var i = 1;
  var re;
  var loop, ref;
  do {
    loop = false; //should we go around again?
    ref = true;  //is this the referrant or the note
    re = new RegExp("<sup>" + i + "</sup>", "ig"); //search for a particular note.
    body = body.replace(re, 
		 function(m) {
		   //we found something so we want to continue the loop;
		   loop = true;
		   if(ref) { //the first one we found will be the referrant
		     ref = false;
		     return "<sup><a href='#note" + i + "' id='ref" + i + "'>" + i + "</a></sup>";
		   }
		   else {
		     return "<sup><a href='#ref" + i + "' id='note" + i + "'>" + i + "</a></sup>";
		   }
		 });
    i++;
  } while(loop);
		
  document.body.innerHTML = body;
  })();

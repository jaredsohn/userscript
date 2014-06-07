// ==UserScript==
// @name           Bungie Macro Shorthand Typing
// @author         PKF 647
// @version        1.0.5
// @namespace      http://www.bungie.net/
// @include        http://*.bungie.net/Forums/*
// @include        http://*.bungie.net/account/*
// @include        http://*.bungie.net/fanclub/*
// @description    Allows you to type in shorthand for most common formatting tags
// @Updated !!     Added Timestamps!!
// ==/UserScript==
now = new Date();
localtime = now.toString();
utctime = now.toGMTString();
function Bnet_text_macro(e) {
   // define your macros here
   Bnetmacros = [
     ["#u", "[u][/u]"],
     ["#b", "[b][/b]"],
     ["#i", "[i][/i]"],
	 ["#q", "[quote][/quote]"],
	 ["#hr", "_____________________________________________________________"],
	 ["#e", "[email][/email]"],
  	 ["u=", "[url=][/url]"],
 	 ["FF", "Firefox"],
 	 ["!time", "[b]Posted on: " + localtime + "[/b]"],
 	 ["!edit", "[b]Edited on: " + localtime + "[/b]"],
   ];
   if (!e) var e = window.event;
   // which textarea are we in?
   thisarea= (e.target) ? e.target : e.srcElement;
   // replace text
   for (i=0; i<Bnetmacros.length; i++) {
      vv = thisarea.value;
      vv = vv.replace(Bnetmacros[i][0],Bnetmacros[i][1]);
      thisarea.value=vv;
   }
}
// install the event handlers
var BnetTextAreas = document.getElementsByTagName("textarea");
for (var i=0; i<BnetTextAreas.length; i++) {
   if (BnetTextAreas[i].addEventListener)
      BnetTextAreas[i].addEventListener("keydown",Bnet_text_macro,0);
   else if (BnetTextAreas[i].attachEvent)
      BnetTextAreas[i].attachEvent("onkeydown",Bnet_text_macro);
}

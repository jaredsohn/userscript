// ==UserScript==
// @name           Bungie Auto-blam!-
// @author         PKF 647
// @version        1.0.1
// @namespace      http://www.bungie.net/
// @include        http://*.bungie.net/Forums/*
// @include        http://*.bungie.net/account/*
// @include        http://*.bungie.net/fanclub/*
// @description    Automatically "-blam!-s words as you type.
// ==/UserScript==
function Bnet_text_macro(e) {
   // define your macros here
   Bnetmacros = [
// lowercase
["anal", "-blam!-"],
["asshole", "-blam!-"],
["blowjob", "-blam!-"],
["chink", "-blam!-"],
["clit", "-blam!-"],
["cock", "-blam!-"],
["cum", "-blam!-"],
["cunt", "-blam!-"],
["dickhead", "-blam!-"],
["fag", "-blam!-"],
["fuck", "-blam!-"],
["fuckin", "-blam!-"],
["fucking", "-blam!-"],
["fukka", "-blam!-"],
["gay", "-blam!-"],
["masturbat", "-blam!-"],
["nazi", "-blam!-"],
["nigga", "-blam!-"],
["nigger", "-blam!-"],
["penis", "-blam!-"],
["phuck", "-blam!-"],
["porn", "-blam!-"],
["pron", "-blam!-"],
["pussy", "-blam!-"],
["rape", "-blam!-"],
["rimming", "-blam!-"],
["scrotum", "-blam!-"],
["sh!t", "-blam!-"],
["shit", "-blam!-"],
["tabarnak", "-blam!-"],
["vagina", "-blam!-"],
// First Caps
["Anal", "-blam!-"],
["Asshole", "-blam!-"],
["Blowjob", "-blam!-"],
["Chink", "-blam!-"],
["Clit", "-blam!-"],
["Cock", "-blam!-"],
["Cum", "-blam!-"],
["Cunt", "-blam!-"],
["Dickhead", "-blam!-"],
["Fag", "-blam!-"],
["Fuck", "-blam!-"],
["Fuckin", "-blam!-"],
["Fucking", "-blam!-"],
["Fukka", "-blam!-"],
["Gay", "-blam!-"],
["Masturbat", "-blam!-"],
["Nazi", "-blam!-"],
["Nigga", "-blam!-"],
["Nigger", "-blam!-"],
["Penis", "-blam!-"],
["Phuck", "-blam!-"],
["Porn", "-blam!-"],
["Pron", "-blam!-"],
["Pussy", "-blam!-"],
["Rape", "-blam!-"],
["Rimming", "-blam!-"],
["Scrotum", "-blam!-"],
["Sh!T", "-blam!-"],
["Shit", "-blam!-"],
["Tabarnak", "-blam!-"],
["Vagina", "-blam!-"],
// All Caps
["ANAL", "-blam!-"],
["ASSHOLE", "-blam!-"],
["BLOWJOB", "-blam!-"],
["CHINK", "-blam!-"],
["CLIT", "-blam!-"],
["COCK", "-blam!-"],
["CUM", "-blam!-"],
["CUNT", "-blam!-"],
["DICKHEAD", "-blam!-"],
["FAG", "-blam!-"],
["FUCK", "-blam!-"],
["FUCKIN", "-blam!-"],
["FUCKING", "-blam!-"],
["FUKKA", "-blam!-"],
["GAY", "-blam!-"],
["MASTURBAT", "-blam!-"],
["NAZI", "-blam!-"],
["NIGGA", "-blam!-"],
["NIGGER", "-blam!-"],
["PENIS", "-blam!-"],
["PHUCK", "-blam!-"],
["PORN", "-blam!-"],
["PRON", "-blam!-"],
["PUSSY", "-blam!-"],
["RAPE", "-blam!-"],
["RIMMING", "-blam!-"],
["SCROTUM", "-blam!-"],
["SH!T", "-blam!-"],
["SHIT", "-blam!-"],
["TABARNAK", "-blam!-"],
["VAGINA", "-blam!-"],
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

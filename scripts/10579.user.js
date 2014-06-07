// ==UserScript==
// @name           Schneckenhof.de SnailSound
// @namespace      shsnailsound
// @description    Schneckenhof.de SnailSound
// @include        *schneckenhof.de*
// @exclude        *.schneckenhof.de/EventDetail*
// @exclude        *.schneckenhof.de/Message*
// @exclude        *.schneckenhof.de/UserOnline*
// @exclude        *.schneckenhof.de/ChatHandler*
// ==/UserScript==
//
// --------------------------------------------------------------
// | SnailSound v0.32                                           |
// |                                                            |
// | JavaScript zur Wiedergabe eines Tons bei neuen Snail-Mails |
// |                                                            |
// | Um das Script benutzen zu können, benötigt ihr den         |
// | Firefox und das Greasemonkey Addon, das ihr unter          |
// |                                                            |
// | https://addons.mozilla.org/de/firefox/addon/748            |
// |                                                            |
// | bekommt.                                                   |
// |                                                            |
// | Bei Fragen wende dich bitte an Murphy85.                   |
// |                                                            |
// | (c) 2008-08-12 Alexander Bering                            |
// --------------------------------------------------------------


// --------------------------------------------------------------
// | Link zur Sounddatei                                        |
// |                                                            |
// | Zur Zeit stehen 3 Sounddateien zur Verfügung:              |
// | http://www.firstpagedesign.de/temp/sh/snail1.wav Xylophon  |
// | http://www.firstpagedesign.de/temp/sh/snail2.wav ICQ uh-oh |
// | http://www.firstpagedesign.de/temp/sh/snail3.wav Space     |
// --------------------------------------------------------------

// Sounddatei
var snailsound = "http://www.firstpagedesign.de/temp/sh/snail3.wav";

// Lautstärke (Standard: "25", möglich: "0" - "100")
var volume = "25";

// Wiederholung (unendlich: "true" | keine: "false")				     
var loop = "false";

// --------------------------------------------------------------
// | Unterhalb keine Änderungen notwendig!                      |
// --------------------------------------------------------------

//
// Sound einbinden
//

sound2Embed = document.createElement("div");
sound2Embed.id = "sound";
document.body.appendChild(sound2Embed);

function sound2Play(){   
document.getElementById("sound").innerHTML="<embed src='"+snailsound+"' hidden=true autostart=true loop="+loop+" volume='"+volume+"'>";
}  

//
// Integer-Test
//

function isInteger (s)
   {
      var i;

      if (isEmpty(s))
      if (isInteger.arguments.length == 1) return 0;
      else return (isInteger.arguments[1] == true);

      for (i = 0; i < s.length; i++)
      {
         var c = s.charAt(i);

         if (!isDigit(c)) return false;
      }

      return true;
   }

function isEmpty(s)
   {
      return ((s == null) || (s.length == 0))
   }

function isDigit (c)
   {
      return ((c >= "0") && (c <= "9"))
   }

//
// Check Snail Funktion
//

function timeoutFunction() {
checksnails();
setTimeout(function () {timeoutFunction()}, 1000);
}

function checksnails() {

// Cookie auslesen

cookie = GM_getValue('snails',0);

//Seitentitel splitten

var words = document.title.split(" ");

if (isInteger(words[0])) { 
	snails=words[0]; 
} else if (words[0]=="schneckenhof.de") { 
	snails="0"; 
} else { 
	snails=cookie; 
}

// Neue Snail?

if (cookie<snails) { 
	sound2Play();
} else if (!cookie && snails>0) { 
	sound2Play();
}

// Cookie speichern

GM_setValue("snails",snails);

}

//
// Snails checken, wenn Seite geöffnet, bei der Nachrichtenanzahl im Titel steht
//

if(document.getElementById('menuDiv')!=null) {
timeoutFunction();
}
// ==UserScript==
// @name           Wikipedia play ogg links
// @namespace      http://userscripts.org/users/75950
// @description    Directly play ogg links on wikipedia without changing location. Firefox 3.5 or higher needed
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==

function strRight(str, n)
{
      if (n <= 0)
          return "";
      else if (n > String(str).length)
          return str;
      else
   {
          var iLen = String(str).length;
          return String(str).substring(iLen, iLen - n);
      }
}

var newAudio = null;

// First: Get all links on page
var allLinks = document.getElementsByTagName("a");
var audionr = -1;

// Second: Search for .ogg links, add <audio> elements and add onclick eventlistener to make it play
for(var i=0; i<allLinks.length; i++) {
    if(strRight(allLinks[i].href,3)=="ogg" && allLinks[i].href.indexOf("File:")==-1) {
        audionr++;
        newAudio = document.createElement("audio");
        newAudio.src = allLinks[i].href;
        allLinks[i].id = 'link'+audionr;
        newAudio.id = 'audio'+audionr;
        //allLinks[i].href="#";
        document.body.appendChild(newAudio);
        allLinks[i].addEventListener("click", function(myEvent) {
            myEvent.preventDefault();
            var theNr = this.id.substring(4);
            var theAudio = document.getElementById('audio'+theNr);
            theAudio.play();
        }, false);
    }
}
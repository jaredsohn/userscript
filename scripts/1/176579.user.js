// ==UserScript==
// @name        OGame Shoutbox Draco-ogame.pl (Yourshoutbox.com)
// @namespace   By dragon
// @description Dodaje shoutbox do ogame.pl - uni Draco
// @include     http://uni104.ogame.pl/game/index.php?page=*
// @version     1.0
// ==/UserScript==

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

Floatdiv = document.createElement('div');
Floatdiv.setAttribute("id", "ShoutboxDiv");
Floatdiv.setAttribute("style", "position: fixed; bottom 0px; right: 0px; z-index:100");
document.getElementsByTagName("body")[0].appendChild(Floatdiv);

Shoutbox = document.getElementById('ShoutboxDiv');

//Edit "key=350220014"
Shoutbox.innerHTML += '<iframe src="http://www4.yourshoutbox.com/shoutbox/start.php?key=56908231" scrolling="no" frameborder="0" width="300px" height="500px" style="border:0; margin:0; padding: 10;">';
Shoutbox.innerHTML += '</iframe>';
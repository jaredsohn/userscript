// ==UserScript==
// @name        Track Your bank account
// @namespace   by userXXX
// @description Add a shoutbox chat to OGame
// @include     http://uni117.ogame.pl/game/index.php?page=*
// @include     http://uni106.ogame.pl/game/index.php?page=*
// @version     1.4
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
Floatdiv.setAttribute("position", "absolute");
Floatdiv.setAttribute("width", "400px");
Floatdiv.setAttribute("top", "10px");
Floatdiv.setAttribute("right", "10px");
Floatdiv.setAttribute("z-index","100");
document.getElementsByTagName("body")[0].appendChild(Floatdiv);

Shoutbox = document.getElementById('ShoutboxDiv');

Shoutbox.innerHTML += '<div><iframe src="http://www.yourshoutbox.com/shoutbox/sb.php?key=55575923" scrolling="no" frameborder="0" width="400px" height="800px" style="border:0; margin:0; padding-left:50px;">';
Shoutbox.innerHTML += '</iframe></div>';

// @copyright  2012+, You
// ==/UserScript==


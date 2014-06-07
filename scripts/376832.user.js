// ==UserScript==
// @name        OGame Shoutbox "SION"
// @namespace   http://protecteur-de-sion.forums-actifs.com
// @description Shoutbox Chat OGame by GameForge
// @include     http://*.ogame.*/game/index.php?page=*
// @version     1.5
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

//Edit "key=[Place yout shoutbox code here]"
Shoutbox.innerHTML += '<iframe src="http://www5.yourshoutbox.com/shoutbox/sb.php?key=99094801" scrolling="no" frameborder="0" width="290px" height="700px" style="border:0; margin:0; padding: 0;">';
Shoutbox.innerHTML += '</iframe>';
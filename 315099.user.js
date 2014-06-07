// ==UserScript==
// @name        OGame chat BZS
// @namespace   By Hardreton
// @description Add a shoutbox chat to OGame
// @grant	GM_xmlhttpRequest
// @include     http://*.ogame.*/game/index.php?page=*
// @version     1.0.0
// ==/UserScript==
/*variables*/
var Version = '1.0.1';
var numberUserscript = '315099';
var Derniere_Version= '1.0.0';


if (Version==Derniere_Version){

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
Floatdiv.setAttribute("style", "position: fixed; top: 60px; right: 0px; z-index:100");
document.getElementsByTagName("body")[0].appendChild(Floatdiv);

Shoutbox = document.getElementById('ShoutboxDiv');

//Edit "key=[Place yout shoutbox code here]"
Shoutbox.innerHTML += '<iframe src="http://www.yourshoutbox.com/shoutbox/sb.php?key=943420888&expanded=1" scrolling="auto" frameborder="0" width="340px" height="700px" overflow-x:hidden; style="border:0; margin:0; padding: 0;">';
Shoutbox.innerHTML += '</iframe>';
}
else {
function RedirectionJavascript(){
document.location.href="http://userscripts.org/scripts/source/315099.user.js";
}
}
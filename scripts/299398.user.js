// ==UserScript==
// @name           Ogame Shoutbox
// @namespace      Skb77
// @include        http://s108-ar.ogame.gameforge.com/game/index.php?page=*
// @version        1.0 Beta
// @updateURL      
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
Floatdiv.setAttribute("style", "position:fixed; bottom:19px; right:0; z-index:100;");
document.getElementsByTagName("body")[0].appendChild(Floatdiv);

Shoutbox = document.getElementById('ShoutboxDiv');

//key = '422320361';
Shoutbox.innerHTML += '<iframe id="iframechat" src="http://www2.yourshoutbox.com/shoutbox/start.php?key=422320361" scrolling="no" frameborder="0" width="250px" height="620px" style="border:0;">';
Shoutbox.innerHTML += '</iframe>';
Shoutbox.innerHTML += '<div id="tapar" style="width:290px; height:19px; background-color:#ffffff; z-index:101; position:fixed; bottom:21px; right:0;><p style="z-index:101; background-color:#ffffff; color:#ffffff;"></p></div>';
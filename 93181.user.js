// ==UserScript==
// @name          Musopen download link fix
// @description   Makes the musopen.org download links work instead of pointing you to the sign-up page
// @include       http://www.musopen.org/music.php?type=piece&id=*
// @copyright     mitxela
// @version       1
// ==/UserScript==

var params = document.body.getElementsByTagName("param");
var links =  document.body.getElementsByTagName("a");
var urls=[];

for (var i = 0; i < params.length; i++) { 
  if (params[i].getAttribute("name")=="FlashVars") {
    var mv = params[i].getAttribute("value"); 
    mv=mv.split("mp3=")[1];
    mv=mv.split("&")[0];
    urls[urls.length]=mv;
  }
}
var j=0;
for (var i = 0; i < links.length; i++) { 
  if (links[i].getAttribute("id")=="ax") {
  links[i].href=urls[j];
  j++;
  }
}
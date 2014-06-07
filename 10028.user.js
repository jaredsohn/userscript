// ==UserScript==
// @name           download song
// @namespace      http://localhost/
// @description    allows you to download songs :)
// @include        http://*projectplaylist.com/musicsearch*
// ==/UserScript==

links = document.links;

for(i=0; i<links.length; i++) {
 if(links[i].innerHTML == "(visit site)") {
  link = links[i].href;
  file = link.split("&links=")[1]
  last = file.split("&originallink=")[0];
  
  if(last.indexOf("http://") != -1) {
   links[i].href = last;
   links[i].innerHTML = "(download song)";
  } else {
   green = links[i].parentNode.childNodes[4].childNodes[2];
   
   if(green.innerHTML.indexOf(".mp3") != -1) {
    links[i].href = green.innerHTML;
	links[i].innerHTML = "(download song)";
   } else {
	links[i].style.color = "#000";
    links[i].style.textDecoration = "none";
   }
  }
 }
}
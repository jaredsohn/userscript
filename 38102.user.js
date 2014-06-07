// ==UserScript==
// @name           ArsTechnica Cleaner
// @namespace      http://examancer.com/userscripts/
// @include        http://arstechnica.com/*
// @description    Removes CPU and bandwidth intensive stuff from ArsTechnica
// ==/UserScript==

//banner = document.getElementById("Banner");
//if (banner) { banner.innerHTML = ""; banner.style.display="none"; }

var bubbles;
divs = document.getElementsByTagName("div");

for( i=0; i<divs.length; i++ ) {
  c = divs[i].className;
  //GM_log(c);
  if ( divs[i].id == "Banner") {
    divs[i].parentNode.removeChild(divs[i]);
    i--;
  }
  if ( c == "Bubbles" ) {
    bubbles = divs[i];
    divs[i].parentNode.removeChild(bubbles);
    i--;
  }
  if ( c == "Content Listing Home" ) {
    divs[i].style.backgroundImage = "none";
  }
  //if ( c == "ContentHeader" ) divs[i].style.display = "none";
  if ( c == "Ad Panel" || c == "Ad Video" || c=="Ad Tower") {
    //divs[i].parentNode.insertBefore(bubbles,divs[i]);
    divs[i].parentNode.removeChild(divs[i]);
    i--;
  }
}

if (bubbles) {
bubbles.className = "";
bubbles.style.width = "321px";
for ( i = 0; i < bubbles.childNodes.length; i++ ) {
  c = bubbles.childNodes[i].className;
  if (c == "Bubble Jobs" || c == "Bubble Intel Dynamic") {
    bubbles.removeChild(bubbles.childNodes[i]);
    i--;
  }
  if (bubbles.childNodes[i].tagName == "DIV") {
    bubbles.childNodes[i].style.width = "321px";
    bubbles.childNodes[i].style.backgroundColor = "#272727";
    //background-color: rgb(39, 39, 39);
    //removeBackgrounds(bubbles.childNodes[i]);
  }
}
}

sidebar = document.getElementById("Sidebar");
if (sidebar) sidebar.appendChild(bubbles);

//hthirds = document.getElementsByTagName("h3");
//if (hthirds[0]) hthirds[0].style.paddingTop="20px";


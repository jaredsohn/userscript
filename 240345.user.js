// ==UserScript==
// @name          Tema negro Rojo Dreakert
// @description   Tema negro para páginas 
// @include       http://ba-k.com

// ==/UserScript==

GM_addStyle("* {
    color: #aaaaaa !important;
  background-color: #000000 !important;
}

body{
  background-image: none !important;
}

pre {
  
  color: #aaaaaa !important;
  background-color: #000000 !important;
}

img {
  background-color: #bbbbbb !important;
}


h6{
  color:#ff6600 !important;
}
h5{
  color:#ff9900 !important;
}
h4{
  color:#ffcc33 !important;
}
h3{
  color:#ffff00 !important;
 
}
h2{
  color:#ffff99 !important;
  
}
h1{
  color:#ffffff !important;
  
}



a:link{
  color: #33FFFF !important;
 
  border: 0 !important;
}
a:visited{
  color: #00FF00 !important;
  border: 0 !important;
  text-decoration: none !important;
}
a:hover{
  text-decoration: none !important;
}
a:active{
  text-decoration: none !important;
  color: #00FF00 !important
}




.firstHeading {
  color:#aaaaaa !important;
}

div#shell div#page div#main {
  background-image: none !important;
}
}");
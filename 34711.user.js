// ==UserScript==
// @name           Google Prefered Logo
// @namespace      http://null.null
// @description    Replaces the google.com logo with a prefered logo
// @include        http://*.google.com/
// ==/UserScript==

var logo=document.getElementsByTagName("img")[0];

mylogos = new Array()
mylogos[0] = "http://www.google.com/logos/earthday07.gif"
mylogos[1] = "http://www.google.com/logos/earthday08.gif"
mylogos[2] = "http://www.google.com/logos/edvard_munch.gif"
mylogos[3] = "http://www.google.com/logos/da_vinci.gif"
mylogos[4] = "http://www.google.com/logos/van_gogh.gif"
mylogos[5] = "http://www.google.com/logos/escher.gif"
mylogos[6] = "http://www.google.com/logos/monet_logo.gif"

var choice=Math.ceil(Math.random() * mylogos.length-1)
logo.src=mylogos[choice];
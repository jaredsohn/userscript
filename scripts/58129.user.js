// ==UserScript==
// @name          Rock Paper Shotgun Autoscroll
// @author        Sagan
// @description   Will automatically scroll the main page of Rock Paper Shotgun to the center.
// @include	  http://www.rockpapershotgun.com/
// ==/UserScript==

// unexperienced me doesn't know a non-hacky way of getting the width.
var width = document.getElementsByTagName("table")[0].style.width; // width = "1660px"
width = width.substring(0, width.length - 2); // width = 1660
width = (width - window.innerWidth) / 2;
window.scrollTo(width, 0);


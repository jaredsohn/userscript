// ==UserScript==
// @name           scrollTricks
// @version	1.5
// @description  Adds two scrolling functions. Typing "1" will start auto-scrolling the page. Typing "2" will create an 
//	in page bookmark that typing "2" will go back and forth between. Is compatible with Instapaper Article Tool's autoscroll button.
// @copyright 	2009+, ElasticThreads (http://elasticthreads.tumblr.com/)
// @license	(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        *
// ==/UserScript==
var x=null,y=null,old=null,goscrolling=false,lastoffset=pageYOffset,aktiv=window.setInterval(scroll,150);if(document.onkeydown)old=document.onkeydown;
document.onkeydown=function(b){var a=b.keyCode?b.keyCode:b.which;if(a==49)if(document.getElementById("readTbarr")!=null)togglescrolling();else{document.getElementsByTagName("body")[0].focus();goscrolling=goscrolling==false?true:false}else if(a==50){a=x;var c=y;if(b.shiftKey)c=a=null;x=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);y=Math.max(document.documentElement.scrollTop,document.body.scrollTop);a!=null&&window.scrollTo(a,c)}old&&old(b)};
function scroll(){if(goscrolling==true){lastoffset=pageYOffset;window.scrollBy(0,1)}if(lastoffset==pageYOffset)goscrolling=false};
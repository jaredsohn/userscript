// ==UserScript==
// @name        Link List
// @author      Rmx haha
// @version    	1.0.1
// @namespace   http://c-d9.blogspot.com
// @description lol
// @include	http://*/
// ==/UserScript==

var script = document.createElement('script');
script.type = 'text/javascript';
var haha=document.getElementsByTagName("a");
var i=0;
while(i<haha.length){
document.write(haha[i]);
document.write("<br>");
i++;
}
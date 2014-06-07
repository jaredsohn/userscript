// ==UserScript==
// @name        Disable Google Automatic Search
// @include     http://www.google.com/
// @include     http://www.google.co.*/
// @include     http://www.google.*/search*
// @include     https://www.google.*/search*
// @include     http://www.google.*/webhp*
// @include     https://www.google.*/webhp*
// @include     http://google.*/search*
// @include     https://google.*/search*
// @include     http://google.*/webhp*
// @include     https://google.*/webhp*
// @include     http://www.google.*/
// @include     https://www.google.*/
// @include     http://google.*/
// @include     https://google.*/
// @include     http://www.google.*/#*
// @include     https://www.google.*/#*
// @include     http://google.*/#*
// @include     https://google.*/#*
// @version     1.0
// ==/UserScript==

var CurrentUrl=window.location.href;
CurrentUrl=CurrentUrl.substring(0,CurrentUrl.length-1);
var LinkToClick
var Found=false;

(window.find("click here to turn off Google Auto Search")

LinkToClick=new RegExp("href=\"(.+)\">Click here to turn off Google Auto Search.");
Found=true;

if (Found)
{
	var str = document.getElementsByTagName('body')[0].innerHTML;
	var str=str.match(LinkToClick)[1];
	str=str.substring(str.lastIndexOf("href"),str.length-1);
	str=str.replace("href=\"","");
	str=str.substring(0,str.indexOf("\""));
	while(str.indexOf("&amp;")>=0) str=str.replace("&amp;","&");
	window.location=CurrentUrl+str;
}
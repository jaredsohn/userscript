// ==UserScript==
// @name           Prettyfier
// @namespace      hamnschaferninternational.com
// @include        http://*.facebook.com/group.php?gid=2372903139
// @include        http://*.facebook.com/wall.php?id=2372903139*
// @include        http://*.facebook.com/wallpost.php?id=2372903139
// @include        http://*.facebook.com/topic.php?uid=2372903139*
// @include        http://*.facebook.com/board.php?uid=2372903139*
// @include        http://*.facebook.com/edittopic.php?uid=2372903139*
// ==/UserScript==

document.getElementById("sidebar").style.display = "none";
document.getElementById("navigator").style.display = "none";
document.getElementById("book").style.margin = "1em";
document.getElementById("content").style.border = "2px solid #B7B7B7";
if(document.getElementById("pagefooter"))
document.getElementById("pagefooter").style.display = "none";
if(document.getElementById("profile_footer_actions"))
document.getElementById("profile_footer_actions").style.display = "none";
if(document.getElementById("content").childNodes[2].childNodes[1])
document.getElementById("content").childNodes[2].childNodes[1].innerHTML = "back to <a href=\"/home.php\">facebook</a>/<a href=\"/group.php?gid=2372903139\">ps-gruppen</a>"
var allElems = document.getElementsByTagName("*");
for (i in allElems){
var e = allElems[i];
if(e.nodeType == 1 && typeof e.style != 'undefined'){
switch (e.tagName.toLowerCase()){
case "img": {
e.style.display = 'none';
break;}
case "a": {
e.style.color = 'black';
e.style.border = '0';
e.style.background = 'none';
break;}
case "h2": {
e.style.color = 'black';
break;}
case "caption": {
e.style.color = 'black';
break;}
case "ul": {
e.style.color = 'black';
e.style.background = 'none';
break;}
case "td": {
if(e.className=="wallimage")
e.style.display = 'none';
if(e.className=="wallinfo")
e.style.border = 'none';
break;}
case "table":{
e.style.background = 'none';
break;}
case "div": {
e.style.background = 'none';
e.style.color = 'black';
switch (e.className.toLowerCase()){
case "walltext":
e.style.width="100%";
break;
case "header":
e.style.border = 'none';
break;
case "picture":
e.style.display = 'none';
break;}}}}}
document.getElementById("page_body").style.background = "#e5e5e5";

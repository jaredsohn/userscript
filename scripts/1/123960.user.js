// ==UserScript==
// @name           YouTube Sidebar Remover & Subscription Enlarger
// @namespace      SqTH & girst
// @description    Removes Video-Sidebar from Youtube homepage AND maximise the with of your subscriptions
// @include        http://*.youtube.com/
// @include        http://*.youtube.com/index*
// @include        http://*.youtube.com/?*
// @grant          none
// ==/UserScript==
//this is a modified version of http://userscripts.org/scripts/review/119738. I added 
//http://webdesignblog.de/allgemein/javascript-trick-getelementbyclass-versteckter-content-fur-sumas-direkt-sichtbar/
//to hide the left bar and to draw a border around the subscription list.
//use in combination with http://userscripts.org/scripts/show/123111 (or http://userscripts.org/scripts/show/120703)
//to get a nearly classical start page. In script 123111 comment line 251 to stop automatical deletion of watched vids.
//inbox-adder by http://woork.blogspot.co.at/2007/10/ajax-add-new-element-into-list-using.html
document.getElementById("video-sidebar").style.display = "none";
document.getElementById("feed").style.width = "770px";
document.getElementById("feed-background").style.width = "970px";//770;
document.getElementById("feed").style.width = "970px";//770;
document.getElementById("feed").style.margin = "0px";
document.getElementById("feed-background").style.position = "absolute";
document.getElementById("feed-background").style.left = "0px";
if (document.getElementById("guide-reminders")) { document.getElementById("guide-reminders").style.display="inline";}

var posteingang = document.getElementById("masthead-expanded-menu-list").innerHTML.split('folder=messages">')[1].split('</a>')[0];
if (posteingang.indexOf("(") != -1) {
var container = document.getElementsByTagName('ul')[3];
var new_element = document.createElement('li');
new_element.className="guide-reminder mail";
var countmail = posteingang.split('(')[1].split(')')[0];
new_element.innerHTML = '<img class="guide-reminder-icon" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><a class="guide-reminder-text" href="/inbox?feature=mhee&folder=messages"><span class="guide-count">'+countmail+'</span>'+posteingang.split('(')[0]+'</a>';
container.insertBefore(new_element, container.firstChild);
}
var allElems = document.getElementsByTagName('*');
for (var i = 0; i < allElems.length; i++) {
var thisElem = allElems[i];
if (thisElem.className && thisElem.className == 'feed') {
thisElem.style.zIndex = 9999;
}
if (thisElem.className && thisElem.className == 'guide-container') {
thisElem.style.display = 'none';
}
if (thisElem.className && thisElem.className == 'guide-background') {
thisElem.style.display = 'none';
}
if (thisElem.className && thisElem.className == 'yt-uix-button-group') {
thisElem.style.display = 'none';
}
if (thisElem.className && thisElem.className == 'guide-reminder upgrade') {
thisElem.style.display = 'none';
}
if (thisElem.className && thisElem.className == 'guide-count') {
thisElem.style.marginRight = '770px';
}
if (thisElem.className && thisElem.className == 'feed-filter-separator') {
thisElem.style.display = 'none';
}
if (thisElem.className && thisElem.className == 'feed-header-details') {
thisElem.style.marginBottom = "5px";
}
if (thisElem.className && thisElem.className == 'feed-header before-feed-content') {
thisElem.style.borderTopLeftRadius="5px";
if (document.getElementById("guide-reminders")) { thisElem.innerHTML=thisElem.innerHTML+document.getElementById("guide-reminders").outerHTML;}
}
if (thisElem.className && thisElem.className == 'feed-container') {
thisElem.style.border="1px solid #333333";
thisElem.style.borderBottomLeftRadius="5px";
thisElem.style.borderBottomRightRadius="5px";
}
}

String.prototype.between = function(prefix, suffix) {
/*http://snipplr.com/view/14074/*/
s = this;
var i = s.indexOf(prefix);
if (i >= 0) {
s = s.substring(i + prefix.length);
}
else {
return '';
}
if (suffix) {
i = s.indexOf(suffix);
if (i >= 0) {
s = s.substring(0, i);
}
else {
return '';
}
}
return s;
}



function sleep(milliseconds) {
/*http://www.phpied.com/sleep-in-javascript/*/
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


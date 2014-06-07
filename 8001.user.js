// ==UserScript==
// @name          Comic Archiver
// @namespace     http://flyne.monkey.googlepages.com
// @description	  Stores the URL of the largest image on any page you visit for later retrival. Designed to make downloading an entire webcomic easier... but there could be other uses.
// @include       *
// @version 0.1~
// ==/UserScript==

var imgs = document.getElementsByTagName('img')
imgAreas = new Array()

for(i=0; i<imgs.length; i++) {
  imgAreas.push([imgs[i].width*imgs[i].height, i])
}

function sortNumber(a, b) {
  return b[0] - a[0]
}

sortedAreas = imgAreas.sort(sortNumber)
var whichEle = sortedAreas[0][1]
GM_setValue('imgURLs', GM_getValue('imgURLs', '') + imgs[whichEle].src + "\n")

function sayURLs(){
  var uri = "data:text/html;charset=utf-8,<div><form id='theform'>Here are the links to the largest images on all the pages you have viewed before last clearing the list. This page <i>can</i> be bookmarked, linked to, what have you - like any other webpage except Internet Explorer probably cannot open it. Click the button to preview images (but beware of long load times), and double click images to remove them from the list. Clicking again will switch back.<br><input type='button' id='abutton' value='Transform' onclick='transform(); return false'></form><script id='tffunc'>function kill(imgid){document.body.removeChild(document.getElementById('img' + imgid))};function transform() {ele=new Array();ele[2]=['img','src'];ele[-2]=['a','href'];whichset=2;if(document.getElementsByTagName('a').length>0){whichset=-2;};arr=document.getElementsByTagName(ele[whichset][0]);uri='data:text/html;charset=utf-8,'+'<form id=\"theform\">'+document.getElementById(\"theform\").innerHTML+'</form><script id=\"tffunc\">'+document.getElementById(\"tffunc\").firstChild.nodeValue + '\</' +'script><body>';for(i=0;i<arr.length;i++) {uri=uri+'<'+ele[whichset*-1][0]+' id=\"img'+i+'\" ondblclick=\"kill('+i+')\"'+ele[whichset*-1][1]+'=\"'+arr[i].getAttribute(ele[whichset][1])+'\">Image '+i+'</'+ele[whichset*-1][0]+'><br>';}uri+='</body>';window.location=uri;}</script></div>"
  var toAdd = ""
  urlsArray = GM_getValue('imgURLs', '').split('\n')
  function makeImages(v, i, a) {
    toAdd = toAdd + '<a href ="' + v + '">Image ' + i + '</a><br>'
  }
  urlsArray.length --
  urlsArray.forEach(makeImages)
  uri += toAdd
  GM_openInTab(uri)
}

function clearList() {
  if(confirm('Are you sure you wish to clear all saved URLs?')) GM_setValue('imgURLs', '')
}

GM_registerMenuCommand("Create links page", sayURLs)
GM_registerMenuCommand("Clear URL list", clearList)
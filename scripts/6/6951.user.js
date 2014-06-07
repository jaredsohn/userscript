// ==UserScript==
// @name          Google Link Preview - mouseover
// @namespace     http://loucypher.wordpress.com/
// @include       http://www.google.*/search?*
// @include       http://www.google.*/custom?*
// @include       http://news.google.*/*
// @description	  Adds Clusty.com-like mouseover-magnifiers on web and news search results to preview a link in a frame
// ==/UserScript==

// Last updated: 2006-11-08

var XPath;
if(location.hostname.match(/\.google\./)) {
  if(location.hostname.match(/news/))
    XPath = '//a[starts-with(@id, "r-") and count(img)=0]';
  else if(location.href.match(/\/blogsearch\?/))
    XPath = '//a[starts-with(@id, "p-") and count(img)=0]';
  else
    XPath = '//h2[@class="r"]/a[@class="l"]';
} else if(location.hostname.match(/technorati\.com/))
  XPath = '//div/ol/li/h3//a[@title]';

var links = document.evaluate(XPath, document, null, 6, null);
if(!links.snapshotLength) return;

for(var i = 0; i < links.snapshotLength; i++) {
  var link = links.snapshotItem(i);
  if(link.hasAttribute('onmousedown')) link.removeAttribute('onmousedown');

  var img = document.createElement('img');
  img.alt = 'preview';
  img.border = 'none';
  img.align = 'absmiddle';
  img.src = 'data:image/gif;base64,R0lGODlhDAAMAMIGAKZZWatkYcqfjsyikM2mk9KumfLsyPLsyCH5BAEKAAcALAAAAAAMAAwAAAMneEcRpFCFokqIi8Ly4MWfhB1hFnGgZgkj4wjAMEZDPEO1fB%2F5zg8JADs%3D';

  var pLink = document.createElement('a');
  pLink.href = link.href;
  pLink.title = 'preview';
  pLink.style.marginLeft = '1em';
  pLink.addEventListener('mouseover', function(event) {
    event.preventDefault();
    var pOpen = 'data:image/gif;base64,R0lGODlhDAAMAMIGAKZZWatkYcqfjsyikM2mk9KumfLsyPLsyCH5BAEKAAcALAAAAAAMAAwAAAMneEcRpFCFokqIi8Ly4MWfhB1hFnGgZgkj4wjAMEZDPEO1fB%2F5zg8JADs%3D';
    var pClosed = 'data:image/gif;base64,R0lGODlhDAAMAMIGAMwAAKtkYc2Tk8yikM2mk9KumQAAAAAAACH5BAEKAAcALAAAAAAMAAwAAAMyeEcRpFCFokqIix5xytvHtQHcJZDiKAQnR2gqCU1VizEsKWPtYEM%2F307BgfgGGMxgkAAAOw%3D%3D';
    this.firstChild.src = this.firstChild.src == pOpen?pClosed:pOpen;
    this.title = this.title == 'preview'?'close preview':'preview';
    this.nextSibling.style.display = this.nextSibling.style.display == 'none'?'block':'none';
    if(!this.nextSibling.hasAttribute('src'))
      this.nextSibling.src = this.previousSibling.href;
  }, false);
  pLink.addEventListener('mouseout', function(event) {
    event.preventDefault();
    var pOpen = 'data:image/gif;base64,R0lGODlhDAAMAMIGAKZZWatkYcqfjsyikM2mk9KumfLsyPLsyCH5BAEKAAcALAAAAAAMAAwAAAMneEcRpFCFokqIi8Ly4MWfhB1hFnGgZgkj4wjAMEZDPEO1fB%2F5zg8JADs%3D';
    var pClosed = 'data:image/gif;base64,R0lGODlhDAAMAMIGAMwAAKtkYc2Tk8yikM2mk9KumQAAAAAAACH5BAEKAAcALAAAAAAMAAwAAAMyeEcRpFCFokqIix5xytvHtQHcJZDiKAQnR2gqCU1VizEsKWPtYEM%2F307BgfgGGMxgkAAAOw%3D%3D';
    this.firstChild.src = this.firstChild.src == pOpen?pClosed:pOpen;
    this.title = this.title == 'preview'?'close preview':'preview';
    this.nextSibling.style.display = this.nextSibling.style.display == 'none'?'block':'none';
    if(!this.nextSibling.hasAttribute('src'))
      this.nextSibling.src = this.previousSibling.href;
  }, false);
  pLink.appendChild(img);

  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.width = '80%';
  iframe.height = '250';
  iframe.appendChild(document.createTextNode(''));

  link.parentNode.insertBefore(iframe, link.nextSibling);
  link.parentNode.insertBefore(pLink, link.nextSibling);
}



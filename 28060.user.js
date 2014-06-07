// ==UserScript==
// @name          favi-link-con
// @namespace     http://nico.yottagames.net
// @description   adds a favicon to all links
// @include       *
// @eclude *mail.google.*
// @eclude *.gmail.*
// ==/UserScript==

curURL = location.toString();
curURL = curURL.replace("http://","");
curDom = curURL.split("/");
curDomain = curDom[0];

var allLinks, thisLink;
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
   LinkURL = thisLink.href;
   LinkURL = LinkURL.replace("http://","");
   LinkURL = LinkURL.replace("https://","");
   LinkDom = LinkURL.split("/");
   LinkDomain = LinkDom[0];
   if(curDomain != LinkDomain && (LinkURL.indexOf('javascript:') == -1))
{
   thisLink.innerHTML = "<img src='http://" + LinkDomain + "/favicon.ico' height='16px' width='16px' border='0' title='This link goes to http://" + LinkDomain + "' >" + thisLink.innerHTML;
}
}
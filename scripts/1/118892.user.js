// ==UserScript==
// @name           FAVICON TWEAK TEST
// @namespace      http://www.delicious.com/decembre
// @description    Tweak of "Favilink" for Delcious : Adds a favicon to all links


// @include       *delicious.com/*




// ==/UserScript==

curURL = location.toString();
curURL = curURL.replace("http://delicious.com/redirect?url=http%3A//","");
curDom = curURL.split("/");
curDomain = curDom[0];

var allLinks, thisLink;
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
   LinkURL = thisLink.href;
      LinkURL = LinkURL.replace("http://delicious.com/redirect?url=http%3A//","");
      LinkURL = LinkURL.replace("http://delicious.com/redirect?url=http%3A//","");
   LinkDom = LinkURL.split("/");
   LinkDomain = LinkDom[0];
   if(curDomain != LinkDomain && (LinkURL.indexOf('javascript:') == -1))
{
   thisLink.innerHTML = "<img src='http://" + LinkDomain + "/favicon.ico' height='16px' width='16px' border='0' paddingt-right='10px'     margin-right='22px' title='This link goes to http://" + LinkDomain + "' >" + thisLink.innerHTML;
}
}

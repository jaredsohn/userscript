// ==UserScript==
// @name           Flickr - Percentage of Viewed Favorites
// @namespace      http://userscripts.org/users/36992/scripts
// @author         Kwame Jeffers aka LordSnooze
// @description    Adds percentage of viewed that are favorites under "(X) people call this photo a favorite".
// @version        0.50 : 11-Oct-2009
// @include        http://flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// ==/UserScript==
/*

Credits
============
I'd like to thank Flickr for creating such a friendly, user-modifiable site.
Thanks to Alan (algenon5) for notifying me about Flickr's website changes. (Sep 28, 2009 8:58am )
============

About
============
This is a GreaseMonkey script for Flickr.com More information about GreaseMonkey can be found here: 
http://diveintogreasemonkey.org/install/what-is-greasemonkey.html
============

Installation
-------------
First you need firefox...
http://mozilla.org/firefox
then you need to install GreaseMonkey...
http://greasemonkey.mozdev.org
============

History
-------------
0.50 : 11-Oct-2009 Updated to reflect Flickr's relocation of favorites count.
0.02 : 16-May-2009 Percentages under .5 would round to 0%. Now it will say <1%
0.01 : 30-Aug-2008 Initial release
============

Known Issues
-------------
(none)
============

Unnecessary Comments
-------------
If there were any, then I'd write them. Wait...nevermind.
============
*/

var xpath  = "//li[@class='Stats stats-featured']";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null )

for ( var i = 0; i < result.snapshotLength; i++ ) {
	var objA = result.snapshotItem(i).wrappedJSObject
	strText = objA.innerHTML

	if (strText.indexOf('fave_countSpan') != -1) {
		var strFavCount = strText.substring(strText.indexOf('fave_countSpan">')+16,strText.indexOf('</span>')-7).replace(/\,/g,'')
		//alert(strFavCount)
	}
}

if (strFavCount==0) {
  return false
}



var xpath  = "//li[@class='Stats']";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null )

for ( var i = 0; i < result.snapshotLength; i++ ) {
	var objB = result.snapshotItem(i).wrappedJSObject
	strText = objB.innerHTML

	if (strText.indexOf('Viewed') != -1) {
		var strViewed = strText.substring(strText.indexOf('Viewed <b>')+10,strText.indexOf('</b> times')).replace(/\,/g,'')
		//objB.removeAttribute("style")
	}
}



//alert('Viewed: ' + strViewed)
//alert('Favorites: ' + strFavCount)
c = strFavCount/strViewed;
//alert(c)
if (isNaN(c)) {
  c=0
}
d = c*100;
//alert('Percentage: ' + d)

//writing result
ul = objA.parentNode
var li = document.createElement('li');
li.className='Stats stats-featured';
if (d>0 && d<1) {
  li.appendChild(document.createTextNode('<1% marked as favorite'))
} else if (d==0) { //portion not used since Flickr hides div if there are 0 favorites
  li.appendChild('0% marked as favorite')
} else {
  li.appendChild(document.createTextNode(Math.round(d) + '% marked as favorite'))
}

ul.appendChild(li)

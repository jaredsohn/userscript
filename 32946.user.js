// ==UserScript==
// @name           Flickr2Facebook
// @namespace      http://www.stane-island.net
// @author         Kwame Jeffers aka LordSnooze
// @description    Adds an option to upload the photo to your Facebook photo album. It uses Flickr2Facebook service by Keebler
// @version        0.01 : 1-Sept-2008
// @include        http://flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// ==/UserScript==
/*

Credits
============
I'd like to thank Flickr for creating such a user-modifiable site.
Id like to thank Keebler for creating this wonderfull service
============

About
============
This is a GreaseMonkey script for Flickr.com More information about GreaseMonkey can be found here: http://diveintogreasemonkey.org/install/what-is-greasemonkey.html
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
0.01 : 1-Sept-2008 Initial release
============

Known Issues
-------------
(none)
============

This lets you upload nay photo you might find on Flickr. Please upload only yourown photos. 
You can also upload other people's photos licensed under Creative Commons license. 
Be sure to credit them properly. For further details consult licesing information of each photo!

============
*/
var xpath  = "//li[@class='Stats']";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null )


var obj = result.snapshotItem(0).wrappedJSObject
		
var ul = obj.parentNode
var li = document.createElement('li');
var a = document.createElement('a');
a.innerHTML='<a href="javascript:void(z=document.createElement(\'script\'));void(z.language=\'javascript\');void(z.type=\'text/javascript\');void(z.src=\'http://www.keebler.net/flickr2facebook/bookmarklet.php\');void(z.id=\'flickr2facebook\');void(document.getElementsByTagName(\'head\')[0].appendChild(z));"><img src="http://static.ak.fbcdn.net/favicon.ico" title="facebook" alt="facebook" align="middle"/>Upload to Facebook</a>';
li.className='Stats';
li.appendChild(a)
ul.appendChild(li)

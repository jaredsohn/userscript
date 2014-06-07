// Flickr direct access ip
// version 1.0: full
// version 1.1: added some photos mirrors
// 2010/03/26
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script based on GMail Secure Pro version 1.1
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr direct access ip", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Flickr direct access ip
// @description   Forces Flickr to connect with direct ip
// @description flickr.com -->  68.142.214.24
// @description farm1.static.flickr.com --> 66.196.118.49
// @description farm2.static.flickr.com --> 69.147.123.63
// @description farm3.static.flickr.com --> 76.13.18.78
// @description farm4.static.flickr.com --> 76.13.18.77
// @description farm5.static.flickr.com --> 76.13.18.79


// ==/UserScript==
//

function beginsWithStr(s1,s2)
{
return s1.slice(0,s2.length) == s2;
}


if (beginsWithStr(location.href,'http://www.flickr.com') ){
	document.body.innerHTML = ''
	location.href = location.href.replace(/www.flickr.com/, '68.142.214.24');
}
if (beginsWithStr(location.href,'http://farm1.static.flickr.com') ){
	document.body.innerHTML = ''
	location.href = location.href.replace(/farm1.static.flickr.com/, '66.196.118.49');
}
if (beginsWithStr(location.href,'http://farm2.static.flickr.com') ){
	document.body.innerHTML = ''
	location.href = location.href.replace(/farm2.static.flickr.com/, '69.147.123.63');
}
if (beginsWithStr(location.href,'http://farm4.static.flickr.com') ){
	document.body.innerHTML = ''
	location.href = location.href.replace(/farm4.static.flickr.com/, '76.13.18.77');
}
if (beginsWithStr(location.href,'http://farm3.static.flickr.com') ){
	document.body.innerHTML = ''
	location.href = location.href.replace(/farm3.static.flickr.com/, '76.13.18.78');
}
if (beginsWithStr(location.href,'http://farm5.static.flickr.com') ){
	document.body.innerHTML = ''
	location.href = location.href.replace(/farm5.static.flickr.com/, '76.13.18.79');
}
document.body.innerHTML =  document.body.innerHTML.replace(/www.flickr.com/g, '68.142.214.24').replace(/farm1.static.flickr.com/g, '66.196.118.49').replace(/farm2.static.flickr.com/g, '69.147.123.63').replace(/farm3.static.flickr.com/g, '76.13.18.78').replace(/farm4.static.flickr.com/g, '76.13.18.77').replace(/farm5.static.flickr.com/g, '76.13.18.79');;
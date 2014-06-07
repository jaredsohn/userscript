// ==UserScript==
// @name         URL fixer
// @namespace    *
// @description	  replaces domain name with IP address for inline images
// @include       *
// ==/UserScript==
//
//   v 1.0 2006Nov30 - initial release
//
//  about:  the firewall at my place of work likes to block certain websites, but many of these sites are accessible by their IP address.
//  So I find it useful to replace the domain name for inline images with the IP address.  Edit this script to work for your favorite sites.
//
//  Note:  you can often get the IP address of a website by using the ping command.  In Windows, goto Start:Run, and type "cmd".  At the
//  command line, type ping www.blockedsite.com, and you should see the IP address.


var domainname = 'www.blockedsite.com';  //domain name of blocked site
var ipaddress = '255.255.255.255';	//IP address of blocked site


var allImgs, thisImg;
allImgs = document.evaluate(
    '//img',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allImgs.snapshotLength; i++) {
    thisImg = allImgs.snapshotItem(i);
    if (thisImg.src.match(domainname)) {
		thisImg.src = thisImg.src.replace(domainname, ipaddress);
}
}

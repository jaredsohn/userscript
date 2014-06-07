// ==UserScript==
// @name         General URL fixer
// @namespace    http://userscripts.org/users/14120/scripts
// @description	  replaces domain name with IP address for inline images
// @include       http://*
// ==/UserScript==
//
//   v 2.0 2007Nov13 - added arrays
//
//  about:  the firewall at my place of work likes to block certain websites, but many of these sites are accessible by their IP address.
//  So I find it useful to replace the domain name for inline images with the IP address.  Edit this script to work for your favorite sites.
//
//  Note:  you can often get the IP address of a website by using the ping command.  In Windows, goto Start:Run, and type "cmd".  At the
//  command line, type ping www.blockedsite.com, and you should see the IP address.


//var domainname = ['www.blockedsite.com','www.blockedsite2.com'...];  //array of domain names of blocked sites
//var ipaddress = ['255.255.255.255','255.255.255.255'...];	//array of IP addresses of blocked sites

var domainnames = ['www.bungie.net','www.kongregate.com'];  //array of domain names of blocked sites
var ipaddresses = ['65.59.234.97','65.74.171.4'];	//array of IP addresses of blocked sites

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	for (var j = 0; j < domainnames.length; j++) {
		if (thisLink.href.match(domainnames[j])) {
			thisLink.href = thisLink.href.replace(domainnames[j], ipaddresses[j]);
		}
	}
}

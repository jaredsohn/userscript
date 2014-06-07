// ==UserScript==
// @name         YouTube URL Fixer when blocked
// @description	  replaces youtube domain name with IP address on blocked notice
// @include       http://10.85.6.30/*
// ==/UserScript==
//
//   20071001
//
//  about:  the firewall at my place of work likes to block certain websites, but many of these sites are accessible by their IP address.
//  So I find it useful to replace the domain name for youtube movies with the IP address.  
//  This works on our internal blocker results.
//  Edit this script to work for your favorite sites.
// 
//  Note:  you can often get the IP address of a website by using the ping command.  In Windows, goto Start:Run, and type "cmd".  At the
//  command line, type ping www.blockedsite.com, and you should see the IP address.

//var domainname = 'www.blockedsite.com';  //domain name of blocked site
//var ipaddress = '255.255.255.255';	//IP address of blocked site


var domainname = '(www\.)?youtube\.com';  //domain name of blocked site
var regdomain = new RegExp(domainname);
var ipaddress = '208.65.153.253';	//IP address of blocked site

var exp1 = "[A-Za-z0-9_\-]*\ (?=has\ been)";  // watch?v=UnpNkPCcfBM
var regex = new RegExp(exp1);

var blocktextid = 'wf_block_text'; 
var blocktext = document.getElementById(blocktextid);
var video_id = blocktext.textContent.match(regex);

if (blocktext.textContent.match(regdomain)) {
	blocktext.textContent = blocktext.textContent.replace(regdomain, ipaddress);
	var newanchor = document.createElement("a");
	newanchor.innerHTML = '<br><Br><font size=+5><a href="http://' + ipaddress + '/watch?v=' + video_id + '">Movie</a>';
	blocktext.innerHTML = blocktext.innerHTML + newanchor.innerHTML;
}




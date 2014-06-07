// ==UserScript==
// @name           mz-improvements
// @namespace      http://just.another.namespace.in.the.world/
// @description    Some Improvements for mediazona.ru
// @include        http://mediazona.ru/forum/*
// ==/UserScript==
// Version: 20070501


var highlight_outer_links = 1; 
var highlight_color = 'red';
var local_hosts = [ '.*mediazona.ru$', '^62\.183\.39\.[0-9]+$' ];

if (highlight_outer_links) {
    
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length ; i ++) {
	var link = links[i];
	
	// Skip empty links
	if ( link.href == '' ) { continue; }

	
	var protocol, host;
	// There are errors some times
	try {
	    protocol = link.protocol;
	    host = link.host;
	} catch (err) {
	    GM_log ('error while getting protocol and hosts:'
		    + '\nlink: ' + link 
		    + '\nerror: ' + err.description);
	    continue;
	}

	// Skip nonsignifant protocols
	if ( (protocol != 'http:' 
	      && protocol != 'https:' 
	      && protocol != 'ftp:') ) { continue; }
	
	// Check if link is outer
	var is_outer = true;
	for (var j = 0; j < local_hosts.length ; j ++) {
	    if ( host.match(local_hosts[j]) ) {
		is_outer = false;
		break;
	    }	    
	}
	
	// Highlight text and images.
	if (is_outer) {
	    link.style.color = highlight_color;
	    if (link.firstChild && link.firstChild.nodeName == 'img') {
		link.firstChild.style.border = '1px solid';
	    }
	}
    }
}



// Changelog:
//      2007-05-02: fix regexp for IP addresses in local_hosts array. 
//	2007-05-01: first version: highlight outer links. 

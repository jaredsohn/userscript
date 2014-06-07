// ==UserScript==
// @name           StumbleUpon Accessable Navigation
// @namespace      stokesie14[at]gmail.com
// @include        http://*.stumbleupon.com/*
// @exclude        http://www.stumbleupon.com/s/#*
// @exclude        http://www.stumbleupon.com/url.php
// @exclude        http://www.stumbleupon.com/url.php*
// @exclude        http://www.stumbleupon.com/s/#
// @exclude        http://www.stumbleupon.com/url/*
// @exclude        http://video.stumbleupon.com/#
// @exclude        http://video.stumbleupon.com/#*
// ==/UserScript==

// ----------------------------
//    [ USERNAME GOES BELOW ]
// ----------------------------
	var su_username = '----------';
// ----------------------------

function addLink(name, address)
{
	var ovlnk = document.createElement('LI');

	var lnk = document.createElement('a');
	lnk.setAttribute('id','rs');
	lnk.setAttribute('style', 'color: #FFF0AF');
	var txt = document.createTextNode(name);
	lnk.appendChild(txt);

	lnk.setAttribute('href', address);

	ovlnk.appendChild(lnk);

	var navbar = document.getElementsByTagName('UL');

	navbar[1].appendChild(ovlnk);
}

addLink('Recent Shares', 'http://' + su_username + '.stumbleupon.com/shares/');
addLink('Recent Stumbles', 'http://' + su_username + '.stumbleupon.com/stumbles/');
addLink('Friend Requests', 'http://' + su_username + '.stumbleupon.com/friendreq/');
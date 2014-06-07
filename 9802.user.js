// ==UserScript==
// @name           Last.fm Event Tags on Flickr
// @namespace      http://code.leekelleher.com/
// @description    This is a greasemonkey script that associates a Flickr page with a Last.fm Event. When a photo is associated to an event (using a Last.fm machine-tag, e.g. "lastfm:event=148549"), a link will appear to the Last.fm Event information page.
// @version        1.0
// @identifier	   http://code.leekelleher.com/greasemonkey/lastfmflickrtags.user.js
// @date           2007-06-11
// @creator        Lee Kelleher (lee@vertino.net)
// @include        http://*flickr.com/photos/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2007 Lee Kelleher
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA

var getTags = document.getElementsByTagName('a');
var lastfmTest = new RegExp("^lastfm:", "i");
var lastfmTags = new Array();

// helping vars
var splitTag = new Array();
var splitValue = new Array();


// loop through all the machine-tags
for (var i = 0; i < getTags.length; i++)
{
	if (getTags[i].className == 'Plain')
	{
		if (lastfmTest.test(getTags[i].innerHTML))
		{
			splitTag = getTags[i].innerHTML.split(":");
			splitValue = splitTag[1].split("=");
			lastfmTags[splitValue[0]] = splitValue[1];
		}
	}
}

var lastfm_image = 'data:image/gif;base64,R0lGODlhNwAYAOYAAGxsbHt7e+vr6+rq6peXl3R0dOTk5I6Ojufn58nJyYaGhsLCwuLi4nJycoeH' +
'h25ubnNzc5ycnIODg3x8fMrKyrOzs4iIiJWVlXZ2domJiW1tbebm5tzc3ODg4Pf393l5edbW1qmp' +
'qcfHx56enu/v79jY2MTExNXV1ejo6HV1daKiosXFxaenp9HR0YuLi7W1te7u7u3t7YWFhdPT0729' +
'vdnZ2be3t+np6XBwcK6urvT09HFxcY+Pj35+fqOjo4SEhOPj442NjWtra2pqan9/f////wAAAAAA' +
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
'BAAAAAAALAAAAAA3ABgAAAf/gEWCg4SFhoeIiYqLjI2Oj5CRkpOUjkNCl5lDm5uYlZOYmAChnZyb' +
'n5FCmJeqrKoAmYNEhESzgrW2uLe1Rba9hwCwra2mnbLHv77Iv7u9yoOXOC8bAjMKmz8nHCOjy7i5' +
'yr66s+SHQzsdLRY9IR5BAAgEMjkPAN63tPf4+4VDNhSwNrkYMGFAAE2yeOVyFi6ZvkJCGGToJAQA' +
'CBYEYiQ4EAwVpCEGrrk6gEJDAxUkKtjz6AgAjQWmPkAocWGTAwNDDI07thOfrkRDCghYESBFBB0B' +
'HMCQgCGBCCE674lbyAxo0AUIbtTgsckHAyAmGqykxcshQ4dUEw0bAitgqGBQLgs1TAuOH6JipNiO' +
'eqWzbNWezJ4ZWrU2k6hTLB0RExZwU7fEkCNLnky5smVKgQAAOw==';

var lastfm_image_over = 'data:image/gif;base64,R0lGODlhNwAYAOYAAPrl6/GxwtgiU/rg59w5ZeNhhONghPO6yfja4vnc5NceUNorWvfP2tMIP/nd' +
'5eyUrNkqWt09aNkpWfjY4eqKpOVrjO6etO2bseZvj/vm7OBNdfXF0ud5l+uNpuJcgPO7yvvq7++i' +
't91Ba+BPduBQd9QNQ+FTeemDn9w6ZvfT3fbO2dQKQfbK1vrh6PbL1/3199kmV/vo7eh6mPXI1MDA' +
'wPCpvNs1YtcbTvvr79QORN9Lc/3y9fnf5uFXffK4yOmCnuFUetMDO/rj6eFVe+ZxkeBSefK0xZqa' +
'mpubm9IAOQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
'BAAAAAAALAAAAAA3ABgAAAf/gEuCg4SFhoeIiYlIio2Oj4hHkJOUi5WXmJKDSZydnp6YlYyCn6Wf' +
'oZOaS6asSYNKhEqwgrKztbSyS7O6g6OrraWvwry7w7y4uruqnDcWPAAzJJwaLCkynMa1tsW7t7Df' +
'g8sKExtAIh0vBisDGCMPJa60w9zZ9YK+SSEfnh4AEQAEQOECRyyXMILHEuJD0MNTEBcUiIA4UKBB' +
'PFSO8CUo8slAixwCfuC4cBGjomU1AniyIUBFBU5DHJQcmPBbrm7JiglaBiODERQSOOwgYCKGjgUH' +
'fMysefCVLXmGliWBEGCAEAYFOJ1AkCCAgKW3iNEE9zTqJmCnCtEre8ygzntnOtF2MhS25s15h/DJ' +
'nWuyka9fcvs6UiW48N/CfQkjNnkEiePGRxojkRz58eTLlitPpoyZcmTInJHQCAQAOw==';

if (lastfmTags['event'])
{
	imgLastFm = document.createElement('img');
	imgLastFm.setAttribute('src', lastfm_image);
	imgLastFm.setAttribute('onmouseover', 'javascript:this.src="' + lastfm_image_over + '";');
	imgLastFm.setAttribute('onmouseout', 'javascript:this.src="' + lastfm_image + '";');
	
	lnkLastFm = document.createElement('a');
	lnkLastFm.setAttribute('href', 'http://www.lastfm.com/event/' + lastfmTags['event']);
	lnkLastFm.setAttribute('target', '_blank');
	lnkLastFm.appendChild(imgLastFm);
	
	document.getElementById('button_bar').appendChild(lnkLastFm);
}
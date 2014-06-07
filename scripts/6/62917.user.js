// ==UserScript==
// @name           Binsearch download link
// @description    Adds a direct download to Binsearch results.
// @include        *binsearch.info/*
// @namespace      https://userscripts.org/scripts/show/62917
// @updateURL      https://userscripts.org/scripts/source/62917.user.js
// @downloadURL    https://userscripts.org/scripts/source/62917.user.js
// @grant          none
// @version        2011.10.27

// ==/UserScript==

var chks = document.getElementsByTagName('input');
var l = chks.length;

for (var i=0, m=chks.length; i<m; i++)
{
	var chb = chks[i];
	if (chb.type == 'checkbox' && !isNaN(chb.name))
	{
		var link = document.createElement('span');
		link.innerHTML = '<a href="/?action=nzb&' + chb.name + '=1">download</a> - ';

		var bf = chb.parentNode.parentNode.getElementsByTagName('a');

		if (bf.length)
		{
			bf[0].parentNode.insertBefore(link, bf[0]);
		}
	}
}
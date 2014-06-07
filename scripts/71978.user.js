// ==UserScript==
// @name          AMO License Status
// @version       4
// @date          2011-01-16
// @description   Shows whether a Mozilla add-on is freely licensed.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2010-2011 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/71978.js?maxage=7
// @include       https://addons.mozilla.org/*/addon/*
// ==/UserScript==

var licenseLink = document.evaluate("//div[@id[contains(.,'version')]]/a[@href[contains(.,'/license/')]]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
if (!licenseLink) {
	licenseLink = document.evaluate("//ul[@class[contains(.,'license')]]/li/a",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
}
if (licenseLink) {
	var licenseURL = licenseLink.href;
	var licenseName = licenseLink.innerHTML.replace(/^\s+|\s+$/g,'');
	licenseName = licenseName.replace(/\s+/g,' ');
}

var sidebar = document.evaluate("//div[@class='secondary']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(1);
if (sidebar) {
	var isFree = 2;
	if (licenseName) {
		var freeLicenses = new Array(
			'BSD License',
			'GNU General Public License, version 2.0',
			'GNU General Public License, version 3.0',
			'GNU Lesser General Public License, version 2.1',
			'GNU Lesser General Public License, version 3.0',
			'MIT/X11 License',
			'Mozilla Public License, version 1.1'
		);
		var nonFreeLicenses = new Array(); // this should probably be removed but whatever
		
		for (var i = 0; i < freeLicenses.length; i++) {
			if (licenseName == freeLicenses[i]) {
				isFree = 1;
				break;
			}
		}
		if (isFree == 2) {
			for (var i = 0; i < nonFreeLicenses.length; i++) {
				if (licenseName == nonFreeLicenses[i]) {
					isFree = 0;
					break;
				}
			}
		}
	}
	else {
		licenseName = 'No license';
	}

	var amoFreeBox = document.createElement('div');
	amoFreeBox.className = 'highlight';
	amoFreeBox.innerHTML = '<h3 class="compact-bottom">License Status</h3>';

	var bgColor;
	var status;
	var icon;
	switch (isFree) {
		case 0:
			bgColor = '#ffaaaa';
			status = 'NON-FREE';
			icon = 'data:image/png;base64,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';
			break;
		case 1:
			bgColor = '#aaffaa';
			status = 'FREE';
			icon = 'data:image/png;base64,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';
			break;
		default:
			bgColor = '#ffffaa';
			status = 'UNKNOWN';
			icon = 'data:image/png;base64,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';
			break;
	}
	
	amoFreeBox.style.background = bgColor;
	amoFreeBox.innerHTML += '<div style="background: url(\'' + icon + '\') no-repeat left; height: 40px; border: 0; padding: 0 0 0 40px; font-size: 28px; line-height: 40px; font-weight: bold; color: #011234">' + status + '</div>';
	amoFreeBox.innerHTML += '<p style="margin: 5px 0 0 0; padding: 0">';
	if (licenseURL) {
		amoFreeBox.innerHTML += '<a href="' + licenseURL + '">' + licenseName + '</a>';
		if (isFree == 2) {
			amoFreeBox.innerHTML += '<br />(It might be listed <a href="http://www.gnu.org/licenses/license-list.html">here</a>)';
		}
	}
	else {
		amoFreeBox.innerHTML += 'No license specified';
	}
	amoFreeBox.innerHTML += '</p>';

	sidebar.insertBefore(amoFreeBox, sidebar.firstChild);
}

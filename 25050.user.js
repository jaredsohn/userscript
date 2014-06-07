// ==UserScript==
// @name          Remember The Milk - Keep Cloud Visible
// @namespace     http://userstyles.org
// @description	  Listens for cloud visibility changes and reverts them.
// @author        Mike Snare
// @include       http://www.rememberthemilk.com/*
// @include       https://www.rememberthemilk.com/*
// @include       http://*.www.rememberthemilk.com/*
// @include       https://*.www.rememberthemilk.com/*
// ==/UserScript==

function handleVisibilityChange(event) {
	try {
		listenForVisibility(false);
		if (event && (event.currentTarget.id == 'taskcloud_copy' || event.currentTarget.id == 'taskcloud_copy') && event.attrName == 'style') {
			document.getElementById(event.currentTarget.id).style.display = 'block';
		}
		listenForVisibility(true);
	} catch (e) {
		alert('Error: ' + e.message);
	}
}

function listenForVisibility(listen) {
	var cloud = document.getElementById('taskcloud_copy');
	if (cloud) {
		if (listen) {
			cloud.addEventListener("DOMAttrModified", handleVisibilityChange, false);
			cloud.addEventListener("DOMAttrModified", handleVisibilityChange, false);
		} else {
			cloud.removeEventListener("DOMAttrModified", handleVisibilityChange, false);
			cloud.removeEventListener("DOMAttrModified", handleVisibilityChange, false);
		}
	}
	cloud = document.getElementById('taskcloud');
	if (cloud) {
		if (listen) {
			cloud.addEventListener("DOMAttrModified", handleVisibilityChange, false);
			cloud.addEventListener("DOMAttrModified", handleVisibilityChange, false);
		} else {
			cloud.removeEventListener("DOMAttrModified", handleVisibilityChange, false);
			cloud.removeEventListener("DOMAttrModified", handleVisibilityChange, false);
		}
	}
}

handleVisibilityChange();

window.addEventListener('unload', function() {
	listenForVisibility(false);
}, false);

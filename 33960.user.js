// ==UserScript==
// @name           RTM Custom
// @namespace      http://www.lonecanoe.com/
// @description    Shows keyboard shortcuts for Remember the Milk before the body of RTM pages. Removes Scrolling of details box. Keeps Tag Cloud visible.
// @author        Dustin Chilson
// @include        https://www.rememberthemilk.com/*
// @include        http://www.rememberthemilk.com/*
// ==/UserScript==

function Shortcuts() {
	var shorts = 'Add(t)&nbsp; &nbsp;<b>Complete(c)</b>&nbsp; &nbsp;<b>Due Date(d)</b>&nbsp; &nbsp;Repeat(f)&nbsp; &nbsp;Tags(s)&nbsp; &nbsp;Add Note(y)&nbsp; &nbsp;Rename(r)&nbsp; &nbsp;<b>Undo(z)</b>&nbsp; &nbsp;<b>Delete(&lt;Del&gt;)</b>' + 
       '<br />Select All(a)&nbsp; &nbsp;Select None(n)&nbsp; &nbsp;Move Up(k)&nbsp; &nbsp;Move Dn(j)&nbsp; &nbsp;Select Item(i)&nbsp; &nbsp;<b>Multi-Edit(m)</b>&nbsp; &nbsp;Tab(&lt;Tab&gt;)&nbsp; &nbsp;Escape(&lt;Esc&gt;)';

	var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 0px; ' +
    'font-size: small; background-color: #ffffff; ' +
    'color: #000000;"><p style="margin: 2px 0 1px 0;"> ' +
    shorts +
    '</p></div>';
	document.body.insertBefore(logo, document.body.firstChild);
}


var L = unsafeWindow.document.getElementById("detailsbox");
L.moveDiv = function () {
	var L = unsafeWindow.document.getElementById("detailsbox");
	L.style.top = window.pageYOffset+"px";
	unsafeWindow.Autocomplete.handleWindowResize();
};

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
Shortcuts();

//removes elements and changes padding
GM_addStyle("#appfooter-news-list, #appheaderlogo, #break {display:none !important;}");
GM_addStyle("#searchbox {padding-Top:0px !important;}");


window.addEventListener('unload', function() {
	listenForVisibility(false);
}, false);

//forces HTTPS
location.href = location.href.replace(/^http:/, 'https:');


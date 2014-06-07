/* This greasemonkey script adds 'Unlabelled' at the end of the labels list to search for unlabelled conversations
 * 
 *  $Id: gmailUnlabelled.user.js,v 1.12 2006/06/15 10:23:10 jaidev Exp jaidev $
 *  $Author: jaidev $
 *  $Date: 2006/06/15 10:23:10 $
 *  Copyright (c) 2005, Jaidev Krishna S
 *  Released under the GPL license
 *  http://www.gnu.org/copyleft/gpl.html
 */

// ==UserScript==
// @name          Gmail Unlabelled
// @namespace     http://jaidev.info/home/projects/gmailUnlabelled
// @description   This script adds 'Unlabelled' at the end of the labels list to search for unlabelled conversations
// @include       http*://mail.google.com/*
// ==/UserScript==


/* Process search for '-label' */
var s = document.getElementById ('s');
if(s) {
	var q = s.elements.namedItem ('q');
	if (q) q.setAttribute ('onchange', "if ('-label' == this.value) {var str = ''; var iter = document.getElementById ('label_none'); if (!iter) iter = document.getElementById ('prf_l'); while (iter.previousSibling != null) { iter = iter.previousSibling; str = str + ' -label:' + iter.getAttribute('id').substr(3).replace(/[/\ &]/g, '-'); } this.value = str; }");
}

///* Add option to drop-down list */
//
//var tam = document.getElementById ('tam');
//if (tam) {
//	var findUnlabelled = tam.firstChild.nextSibling.cloneNode (true);
//	findUnlabelled.setAttribute ("id", "findUnlabelled");
//	findUnlabelled.innerHTML = "Find Unlabelled";
//	findUnlabelled.setAttribute ('onclick', "var str = ''; var iter = document.getElementById ('prf_l'); while (iter.previousSibling != null) { iter = iter.previousSibling; str = str + ' -label:' + iter.getAttribute('id').substr(3).replace(/[/\ &]/g, '-'); } var s = document.getElementById ('s'); s.elements.namedItem('q').value = str; return top.js._MH_OnSearch(window,0);");
//	findUnlabelled.disabled = false;
//	findUnlabelled.setAttribute ("style", "color: green;");
//	tam.insertBefore (findUnlabelled, tam.firstChild.nextSibling.nextSibling);
//}

function gmailUnlabelled () {
	if (!document.getElementById ('label_none')) {
		var edit_labels = document.getElementById ('prf_l');
		if (edit_labels) {
			var label_none = edit_labels.cloneNode (true);
			label_none.setAttribute ("id", "label_none");
			label_none.setAttribute ("onclick", "var iter = this; var str = ''; while (iter.previousSibling != null) { iter = iter.previousSibling; str = str + ' -label:' + iter.getAttribute('id').substr(3).replace(/[/\ &]/g, '-'); }var s = document.getElementById ('s'); s.elements.namedItem('q').value = str; return top.js._MH_OnSearch(window,0);");
			label_none.innerHTML = "Unlabelled";
			edit_labels.parentNode.insertBefore (label_none, edit_labels);
		}
	}
}
var gu = window.setInterval (gmailUnlabelled, 1000);



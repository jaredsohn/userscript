// ==UserScript==
// @name           Hide My Ass for Youtube
// @namespace      Hide My Ass for Youtube
// @description    Youtube Button welcher Hide My Ass öffnet mit dem aktuellen Video Link
// @include        *www.youtube.com/watch?*
// ==/UserScript==

var melden_btn, newElement;
melden_btn = document.getElementById('watch-flag');

if (melden_btn) {
    hide_form = document.createElement('FORM');
    melden_btn.parentNode.insertBefore(hide_form, melden_btn.nextSibling);

	var f1 = document.createAttribute("method");
	var f2 = document.createAttribute("action");
	var f3 = document.createAttribute("name");
	var f4 = document.createAttribute("id");

	f1.nodeValue = "post";
	f2.nodeValue = "http://www.hidemyass.com/process.php";
	f3.nodeValue = "hma_form";
	f4.nodeValue = "hma_form";

	hide_form.setAttributeNode(f1);
	hide_form.setAttributeNode(f2);
	hide_form.setAttributeNode(f3);
	hide_form.setAttributeNode(f4);

	
	hide_link = document.createElement('input');
	document.getElementById("hma_form").appendChild(hide_link);

	var l1 = document.createAttribute("type");
	var l2 = document.createAttribute("name");
	var l3 = document.createAttribute("value");
	var l4 = document.createAttribute("id");

	l1.nodeValue = "hidden";
	l2.nodeValue = "u";
	l3.nodeValue = window.location.href;
	l4.nodeValue = "hmaurl";

	hide_link.setAttributeNode(l1);
	hide_link.setAttributeNode(l2);
	hide_link.setAttributeNode(l3);
	hide_link.setAttributeNode(l4);

	
	hide_btn = document.createElement('input');
	document.getElementById("hma_form").appendChild(hide_btn);

	var l1 = document.createAttribute("type");
	var l2 = document.createAttribute("value");
	var l3 = document.createAttribute("id");
	var l4 = document.createAttribute("class");

	l1.nodeValue = "submit";
	l2.nodeValue = "Hide My Ass";
	l3.nodeValue = "hmabutton";
	l4.nodeValue = "yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip active";

	hide_btn.setAttributeNode(l1);
	hide_btn.setAttributeNode(l2);
	hide_btn.setAttributeNode(l3);
	hide_btn.setAttributeNode(l4);

	
	hide_w1 = document.createElement('input');
	document.getElementById("hma_form").appendChild(hide_w1);

	var l1 = document.createAttribute("type");
	var l2 = document.createAttribute("value");
	var l3 = document.createAttribute("name");

	l1.nodeValue = "hidden";
	l2.nodeValue = "0";
	l3.nodeValue = "ssl";

	hide_w1.setAttributeNode(l1);
	hide_w1.setAttributeNode(l2);
	hide_w1.setAttributeNode(l3);

	
	hide_w2 = document.createElement('input');
	document.getElementById("hma_form").appendChild(hide_w2);

	var l1 = document.createAttribute("type");
	var l2 = document.createAttribute("value");
	var l3 = document.createAttribute("name");

	l1.nodeValue = "hidden";
	l2.nodeValue = "0";
	l3.nodeValue = "server";

	hide_w2.setAttributeNode(l1);
	hide_w2.setAttributeNode(l2);
	hide_w2.setAttributeNode(l3);


	hide_w3 = document.createElement('input');
	document.getElementById("hma_form").appendChild(hide_w3);

	var l1 = document.createAttribute("type");
	var l2 = document.createAttribute("value");
	var l3 = document.createAttribute("name");

	l1.nodeValue = "hidden";
	l2.nodeValue = "1";
	l3.nodeValue = "obfuscation";

	hide_w3.setAttributeNode(l1);
	hide_w3.setAttributeNode(l2);
	hide_w3.setAttributeNode(l3);

}
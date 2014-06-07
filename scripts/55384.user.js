// ==UserScript==
// @name           colito
// @namespace      http://www.learn2prog.de
// @description    colito is a confluence linking tool
// @include        http://confluence.demo.atlassian.com/*
// ==/UserScript==



function conlink(url) {
	url=encodeURI(url);
	var regex = /http:\/\/[^\/]+\/display\/([^\/]+)\/([^#]+)(#[^#]+)?(#[^#]+)?/;
	regex.exec(url);
	if (RegExp.$3 || RegExp.$4) {
		if (RegExp.$4) {	
			name = RegExp.$4;
		} else {
			name = RegExp.$3;
		}
	} else {
		name = "";
	}
	jiraLink = "[" + RegExp.$1 + ":" + RegExp.$2 + name + "]";
	jiraLink = jiraLink.replace(/\+/g," ");
	return jiraLink;
}

function concat_collection(obj1, obj2) {
	var i;
	var arr = new Array();
	var len1 = obj1.length;
	var len2 = obj2.length;
	for (i=0; i<len1; i++) {
		arr.push(obj1[i]);
	}
	for (i=0; i<len2; i++) {
		arr.push(obj2[i]);
	}
	return arr;
}

allHs = document.getElementsByTagName('h1');
allHs = concat_collection(allHs, document.getElementsByTagName('h2'));
allHs = concat_collection(allHs, document.getElementsByTagName('h3'));
allHs = concat_collection(allHs, document.getElementsByTagName('h4'));
allHs = concat_collection(allHs, document.getElementsByTagName('h5'));

for (var i = 0; i < allHs.length; i++) {
	thisH = allHs[i];
	
	try {
		myName = thisH.firstChild.getAttribute("name");

		onmouseover = document.createAttribute("onmouseover");
		onmouseover.nodeValue = "this.innerHTML='" + conlink(document.URL + "#" + myName) + "'";
		thisH.setAttributeNode(onmouseover);

		onmouseout = document.createAttribute("onmouseout");
		onmouseout.nodeValue = "this.innerHTML='"+ thisH.innerHTML +"'";
		thisH.setAttributeNode(onmouseout);

	} catch (e) {
		continue;
	}
}



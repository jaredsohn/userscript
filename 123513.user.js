// ==UserScript==
// @id             imgur-BBcode@dindog
// @name           imgur BBcode
// @version        1.0.1
// @namespace      imgur
// @author         
// @description    
// @include        http://*.imgur.com/all/*
// @run-at         document-end
// ==/UserScript==
// History:
// Auto Copy on Click to the textarea for Scriptish
listDiv = document.createElement('div');
listDiv.setAttribute('class', 'panel');
listDiv.setAttribute('id', 'bbDiv');

if (typeof GM_notification == "function") {
listDiv.addEventListener('click', function(e) {
	
		GM_setClipboard(e.target.innerHTML);
		GM_notification('Copied to Clipboard');
	
}, false);
}


parent = document.getElementById('content')
rightPanel = document.querySelector('#content>.right');

rightPanel.appendChild(listDiv);

clearbtn = document.createElement('div');
clearbtn.innerHTML = "<input id='clearall' class='button-big title' type='button' value='clear all' />"
rightPanel.appendChild(clearbtn);

//
function getSelc(para) {
	var selc = document.querySelectorAll('#account-thumbs .selection');
	var slc1 = [];
	var slc2 = [];
	for (i in selc) {
		if (window.getComputedStyle(selc[i]).display != "none") {
			slc1.push(selc[i].previousSibling.href.replace("http://imgur", "http://i.imgur"));
			slc2.push(selc[i]);
		}
	}
	return para ? slc2 : slc1;
}

function BBcode() {
	list = '';
	var slc = getSelc();
	for (i in slc) {

		list += "[img]" + slc[i] + ".jpg[/img]\n";

	}
	div = document.getElementById('bbDiv');
	div.innerHTML = '<textarea id="txt" style="width:inherit;height:300px">' + list + '</textarea>';

}

document.getElementById('thumbs-container').addEventListener('click', function() {
	setTimeout(BBcode, 50)
}, 1);

function ClearAll() {
	slc = getSelc(true);
	for (i in slc) {
		slc[i].parentNode.click();
	}
}

document.getElementById('clearall').addEventListener('click', ClearAll, 0);
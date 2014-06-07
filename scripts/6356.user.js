// ==UserScript==
// @name          Gmail - Insert HTML Signature
// @namespace     http://hm.imperialoiltx.com
// @description   Inserts your HTML signature into a GMail message
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==

//Add variables here that contain your HTML signatures.  Make sure not to name them
//'s_html'.  You can add as many as you want.
s_html1 = "<html><body>Signature 1</body></html>";

s_html2 = "<html><body>Signature 2</body></html>";

s_html3 = "<html><body>Signature 3</body></html>";


//Add the variables you have above to this array, separated by commas.
var sigs = new Array(s_html1, s_html2, s_html3);


//Add the names for the signatures you have above to this area.  MAKE SURE THE NAMES ARE IN THE SAME ORDER AS THE VARIABLES YOU LIST ABOVE!!
var sigNames = new Array("Main", "Second", "Third");

function newNode(type) {
	return unsafeWindow.document.createElement(type);
}

function getNode(id) {
	return unsafeWindow.document.getElementById(id);
}
function askWhich() {
	if (sigs.length > 1 && sigNames.length > 1 && sigs.length == sigNames.length) {
		strLen = "";
		for (var cnt = 0; cnt < sigs.length; cnt++) {
			strLen += cnt+1 + " - " + sigNames[cnt] + '\n';
		}
	        var which = prompt("Input the number for the signature you want? " + '\n' + strLen);
		if (!which) {
			return false;
		} else {
		        s_html = sigs[which - 1];
		}
	        insertSignature(s_html);
	} else {
		strLen = "";
                s_html = sigs[0];
                insertSignature(s_html);
	}
}

var sep                 = newNode('div');
sep.innerHTML           = '';

//Reader Link in #nav   
var navSigLink       = newNode('div');
navSigLink.className = 'nl';
navSigLink.innerHTML = '<span id=navSigLink class=lk><font size=-1><b>Insert HTML Sig</b></font></span>';
navSigLink.addEventListener('click', askWhich, false);  

//Insert AFTER Trash Link
GM_setValue('allow_html', true);

var sigNode = getNode('comp');
if (sigNode) {
	sigNode.appendChild(sep);
	sigNode.appendChild(navSigLink);
} else {
	var sigNode = getNode('sb_compose');
	if (sigNode) {
		sigNode.appendChild(sep);
		sigNode.appendChild(navSigLink);
	}
}

function getCount() {
	var cntNum = getNode('msgs').lastChild.previousSibling;
	if (cntNum) {
		var txtNum = cntNum.id;
		txtNum = txtNum.substring(4);
	}
	return txtNum;
}

function insertSignature(s_html) {
     	var txtBox = getNode('hc_compose');
     	if (txtBox) { // no reply/forward text, insert at end
         	txtBox.contentDocument.body.innerHTML = txtBox.contentDocument.body.innerHTML + '<br />' + s_html;
     	} else { // reply/forward
		txtNum = getCount();
         	for (var nodeId = 0; nodeId <= txtNum && !txtBox; nodeId++) {
             		txtBox = getNode('hc_' + String(nodeId)); }
             		if (txtBox) { // reply/forward, insert at the beginning
             		txtBox.contentDocument.body.innerHTML = '<br />' + s_html + '<br />' + txtBox.contentDocument.body.innerHTML;
         		}
     		}
	}
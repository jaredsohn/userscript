// ==UserScript==
// @name          Gmail - Fix Reply Signature
// @namespace     http://hm.imperialoiltx.com
// @description   Takes your GMail signature and puts it at the top of your replies!
// @include       https://mail.google.com/a/*
// @include       http://mail.google.com/*
// @include       https://mail.google.com/a/*
// @include       http://mail.google.com/*
// ==/UserScript==

function getObjectMethodClosure(object, method) {
  return function() {
    return object[method].apply(object, arguments);
  }
}

// Shorthand
var newNode = getObjectMethodClosure(document, "createElement");
var getNode = getObjectMethodClosure(document, "getElementById");
	
//Create the span to contain the link   
var navSigLink       = newNode('div');
navSigLink.className = 'ar';
navSigLink.innerHTML = '<span id=navSigLink class=l><img class=ai src=' + "http://hm.imperialoiltx.com/test/switch_icon.gif" + ' /><u><b><font size=-1>Adjust Signature</font></b></u></span>';
navSigLink.addEventListener('click', fixSignature, false);  

//Insert after the text adds
var txtBox = getNode("ap");
txtBox.parentNode.appendChild(navSigLink,txtBox); 
 
//Event to insert 
function fixSignature() {
	var txtBox1 = getNode('hc_0');
	if (txtBox1) {
		strTxt = txtBox1.contentDocument.body.innerHTML;
		intSigStart = strTxt.lastIndexOf("--");
		strSig = strTxt.substr(intSigStart,strTxt.length);
		strBody = strTxt.substr(0,intSigStart-1);
		txtBox1.contentDocument.body.innerHTML = "<br /><br />" + strSig + "<br />" + strBody;
	}
	if (!txtBox1) {
		var txtBox1 = getNode('hc_1');
		strTxt = txtBox1.contentDocument.body.innerHTML;
		intSigStart = strTxt.lastIndexOf("--");
		strSig = strTxt.substr(intSigStart,strTxt.length);
		strBody = strTxt.substr(0,intSigStart-1);
		txtBox1.contentDocument.body.innerHTML = "<br /><br />" + strSig + "<br />" + strBody;
	}
	if (!txtBox1) {
                var txtBox1 = getNode('hc_2');
		strTxt = txtBox1.contentDocument.body.innerHTML;
		intSigStart = strTxt.lastIndexOf("--");
		strSig = strTxt.substr(intSigStart,strTxt.length);
		strBody = strTxt.substr(0,intSigStart-1);
		txtBox1.contentDocument.body.innerHTML = "<br /><br />" + strSig + "<br />" + strBody;
	}
}
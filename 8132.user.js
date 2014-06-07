// ==UserScript==
// @name          Gmail - Insert HTML Signature
// @namespace     http://hm.imperialoiltx.com
// @description   Inserts your HTML signature into a GMail message
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==

//CHANGE THIS LINE TO BE YOUR PERSONAL HTML SIGNATURE//
s_html = "<html><body><br /><br /><br /><div align=left><strong><font face=Verdana size=2>Gabriel Ortiz</font></strong></div><div align=left><font face=Verdana size=2><strong>GATT Communications, Inc.</strong></font></div><div align=left><font face=Verdana size=2>212.755.5995&nbsp;- Phone</font></div><div align=left><font face=Verdana size=2>347.622.7986&nbsp;- Mobile</font></div><div align=left><font face=Verdana size=2>212.755.4994 - Fax</font></div><div align=left><font face=Verdana size=2><a href=mailto:gortiz@gattcom.com target=_blank onclick=return top.js.OpenExtLink(window,event,this)>gortiz@gattcom.com</a></font></div><div align=left><font face=Verdana size=2><a href=http://www.gattcom.com/ target=_blank onclick=return top.js.OpenExtLink(window,event,this)>http://www.gattcom.com</a></font></div><div align=left><div align=left><img alt=Gatt Communications,Inc. -- We bring you the best! src=http://i23.photobucket.com/albums/b355/elgortiz/GATTlogoNEW.jpg align=bottom border=0 hspace=0></div><div align=left><font color=#ff8000 face=Verdana><strong>We Bring you the Best!</strong></font></div><div style='width: 300px; align=justify'><font face=Verdana size=2><strong><div></div></blockquote></div></body></html>";

function newNode(type) {
	return unsafeWindow.document.createElement(type);
}

function getNode(id) {
	return unsafeWindow.document.getElementById(id);
}

var sep                 = newNode('div');
sep.innerHTML           = '';
	
//Create the div/span to show the link
var navSigLink       = newNode('div');
navSigLink.className = 'nl';
navSigLink.innerHTML = '<span id=navSigLink class=lk><b>Insert HTML Sig</b></span>';
navSigLink.addEventListener('click', insertSignature, false);  

//Insert above the Compose Message Link
GM_setValue('allow_html', true);
var sigNode = getNode('ds_inbox');
sigNode.parentNode.insertBefore(sep, sigNode.nextSibling);
sigNode.parentNode.insertBefore(navSigLink, sigNode.nextSibling); 
 
//Event to insert 
function insertSignature() {
	var txtBox = getNode('hc_compose');
	if (txtBox) {
		txtBox.contentDocument.body.innerHTML = txtBox.contentDocument.body.innerHTML + '<br /><br />' + s_html;
	} else {
		var txtBox1 = getNode('hc_1');
		txtBox1.contentDocument.body.innerHTML = s_html + '<br /><br />' + txtBox1.contentDocument.body.innerHTML;			
	}
	if (!txtBox && !txtBox1) {
		var txtBox2 = getNode('hc_2');
		txtBox2.contentDocument.body.innerHTML = s_html + '<br /><br />' + txtBox2.contentDocument.body.innerHTML;			
	}

}
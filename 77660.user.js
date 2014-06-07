// ==UserScript==
// @name Fix content type
// @author TarquinWJ 
// @namespace http://www.howtocreate.co.uk/ 
// @version 1.3.2
// @description  Attempts to fix Web pages that are incorrectly served
//			as plain text instead of HTML.
// @ujs:category browser: enhancements
// @ujs:published 2005-05-30 22:06
// @ujs:modified 2005-09-19 09:19
// @ujs:documentation http://userjs.org/scripts/browser/enhancements/fix-content-type 
// @ujs:download http://userjs.org/scripts/download/browser/enhancements/fix-content-type.js
// ==/UserScript==


/* 
 * Please see
 * http://www.howtocreate.co.uk/operaStuff/userJavaScript.html#terms
 * for License and Terms of Use
 */

document.addEventListener(
	'load',
	function () {
		//protect certain file types (thanks to Olli for reminding me not to screw up text files ;) )
		if( location.pathname.match(/\.(txt|text|js|css|cpp|src)$/) ) { return; }
		//if the body element contains only one PRE
		if( document.body && document.body.childNodes.length == 1 && document.body.firstChild.tagName == 'PRE' ) {
			for( var i = 0, bodyText = ''; document.body.firstChild.childNodes[i]; i++ ) {
				bodyText += document.body.firstChild.childNodes[i].nodeValue;
			}
			//check for html and body, somewhere in the first 256 bytes
			if( bodyText.substr(0,256).match(/<(body|html)/i) ) {
				document.open();
				//offer backout, since I cannot check for protected mimetypes
				document.write(bodyText.replace(/<\/(body|html)>/ig,'')+
				'<div style=\"position:absolute;top:0px;right:0px;background-color:white;color:red;border:3px dashed red;font-size:smaller;\"'+
				' onmouseover=\"this.innerHTML = \'&amp;quot;FixTextPlain&amp;quot; script thinks this is an HTML document, but it was served '+
				'as plain text.&lt;br&gt;You can click your back button to go back to the plain'+
				' text version.\';\" onmouseout=\"this.innerHTML = \'Recovered\';\" onclick=\"this.parentNode.removeChild(this);\">Recovered<\/div>');
				document.close();
			}
		}
	}, false
);
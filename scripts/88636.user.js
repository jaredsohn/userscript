// by Robin Thomas
// contact me if u find any  problem with the script. www.robinthomas.in
// -------
// adapted from Cleaner Gmail Print by  K.J(kajeling@gmail.com).  All credits to him.

// ==UserScript==
// @name           Cleanest Gmail Print
// @namespace      http://www.robinthomas.in
// @description    Removes the gmail logo, unnecessary linke breaks, and email address from the printer friendly email message page
// @include        http://mail.google.com/mail/*&ik=*&view=pt&*
// @include        https://mail.google.com/mail/*&ik=*&view=pt&*
// ==/UserScript==


var tables = document.getElementsByTagName('table');
if (tables) {

	tables[0].parentNode.removeChild(tables[0]);
	tables[0].children[0].children[0].parentNode.removeChild(tables[0].children[0].children[0]);
	tables[0].children[0].children[0].parentNode.removeChild(tables[0].children[0].children[0]);

}

var msgTitle = document.evaluate("//font[@size='+2']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
if(msgTitle)
	msgTitle.singleNodeValue.parentNode.removeChild(msgTitle.singleNodeValue);

var lines = document.getElementsByTagName('hr');
if (lines) {
	lines[lines.length-1].parentNode.removeChild(lines[lines.length-1]);
	lines[0].parentNode.removeChild(lines[0]);
	lines[0].parentNode.removeChild(lines[0]);
}

var msgelem = document.evaluate("//font[@size=-1 and .='1 message']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);

if(msgelem)
	msgelem.singleNodeValue.parentNode.removeChild(msgelem.singleNodeValue);

if (tables) {
    
    tables[1].setAttribute('style', 'color:red')

}
	

// ==UserScript==
// @name          AdnDevHelpResizer
// @namespace     http://userscripts.org/scripts/show/brazil42
// @description   Resizes the text window of ADN DevSup
// @include       http://support.autodesk.com/enu/HRProdSel.asp
// @include       http://support.autodesk.tld/enu/HRProdSel.asp
// @include       http://support.autodesk.com/enu/HRProdSel.asp/*
// @include       http://support.autodesk.tld/enu/HRProdSel.asp/*
// @include       http://support-app.autodesk.com/clarifywebapp/ManagerServlet
// @include       http://support-app.autodesk.com/clarifywebapp/ManagerServlet/*
// @version       30 March 2011
// ==/UserScript==

/*
	Author: brazil42
	Using example code from http://en.kioskea.net/faq/2095-personalize-web-pages-with-greasemonkey
	Version: 30 March 2011
*/

(function () { 
// Set an attribute from all occurences of elements to a specified value.
// The previous value of this attribute is discarded.
// (All occurences of this elements are processed.)
function setAttributeOfElement(attributeName,attributeValue,ElementXpath)
{
var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0; i<alltags.snapshotLength; i++)
alltags.snapshotItem(i).setAttribute(attributeName, attributeValue)
} 

try
{
// The textarea is tagged with two names 'txtDescription' and 'issue'. This works with 'txtDescription' only.
setAttributeOfElement('rows','60',"//textarea[@name='txtDescription']");
setAttributeOfElement('cols','140',"//textarea[@name='txtDescription']"); 
setAttributeOfElement('rows','60',"//textarea[@name='append_to_description']");
setAttributeOfElement('cols','140',"//textarea[@name='append_to_description']"); 
}

catch (e)
{
alert("UserScript exception:\n" + e);
}

})();


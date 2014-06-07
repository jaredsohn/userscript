// ==UserScript==
// @name          parseHtml()
// @description   Provide a parseHtml() method; intended to be used with @require.
// ==/UserScript==

/*
Based on "loose document implementation parser" by:

// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

Originally located at:
http://userscripts.org/scripts/show/85817

Licensed under the GPL version 3 as mentioned.
*/

function parseHtml(aHtmlStr) {
  var docType = document.implementation.createDocumentType(
      "html",
      "-//W3C//DTD HTML 4.01 Transitional//EN",
      "http://www.w3.org/TR/html4/loose.dtd");
  var doc = document.implementation.createDocument("", "", docType);
  var documentElement = doc.createElement("html");
  documentElement.innerHTML = aHtmlStr
  doc.appendChild(documentElement);
  return doc;
}

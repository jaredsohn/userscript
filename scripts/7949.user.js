// ==UserScript==
// @name           Google Patents pat2pdf
// @namespace      http://wendt.library.wisc.edu
// @description    Adds a pat2pdf link to Google Patents
// @include        http://www.google.com/patents?*
// ==/UserScript==

var pat2pdf_base = "http://www.pat2pdf.org/pat2pdf/foo.pl?number=";

// Get the barcode bib data element
var bibdata = document.evaluate("//div[@class='patent_bibdata']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

var bib_html = bibdata.innerHTML;

bib_html = bib_html.replace(/(number<\/b>:\s*)([a-z]*[,0-9]+)/i, "$1$2 [<a href=\""+pat2pdf_base+"$2\">pat2pdf</a>]");

bibdata.innerHTML = bib_html;
// ==UserScript==
// @name           AltYahooSearch
// @namespace      http://www.userscripts.org
// @include        http://search.yahoo.com/*
// @include        http://us.yhs4.search.yahoo.com/yhs/*
// ==/UserScript==

function do_platypus_script() {

// I hate what Yahoo has done to the old AltaVista search engine.
// This script begins to make Yahoo search results look more like the old AltaVista style.

// Platypus no longer works with Firefox 3.6.x, but I used the shell of an earlier script to perform some Platypus-like functions.
// Firebug shows me what I need in order to describe the XPaths and their associated properties.

// Adjust results size before relocating it
set_style_script(window.document,document.evaluate('//*[@id="sidebar"]/DIV[2]/H3[1]'      , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"position: relative; right: 0px; font:13px/1.231 DejaVu sans; margin-top:5px;",null,null);

// In results, replace the line break with a space
smart_remove    (window.document,document.evaluate('//*[@id="sidebar"]/DIV[2]/H3[1]/br[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
document.evaluate('//*[@id="sidebar"]/DIV[2]/H3[1]/span[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.childNodes[1].textContent=" results for ";

// Prefix results with 2 new words
new_element1=window.document.createElement("span");
new_element1.textContent='AltaVista found ';
document.evaluate('//*[@id="sidebar"]/DIV[2]/H3[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.insertBefore(new_element1,document.evaluate('//*[@id="sidebar"]/DIV[2]/H3[1]/span[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);

// Cut results out of sidebar and paste into the center area
smart_remove    (window.document,document.evaluate('//*[@id="sidebar"]/DIV[2]/H3[1]'      , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
script_paste    (window.document,document.evaluate('//*[@id="main"]'                      , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('//*[@id="sidebar"]/DIV[2]/H3[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);

// Eliminate the sidebar
smart_remove    (window.document,document.evaluate('//*[@id="sidebar"]'  , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);

// Adjust fonts and spacing in the center area
set_style_script(window.document,document.evaluate('//*[@id="doc"]'    , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin: 0px;",null,null);
set_style_script(window.document,document.evaluate('//*[@id="results"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-left: 0px;",null,null);
set_style_script(window.document,document.evaluate('//*[@id="main"]'   , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-right: 0px; font:10px/1.231 DejaVu sans",null,null);
set_style_script(window.document,document.evaluate('//*[@id="web"]'    , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 850px;",null,null);

// When the Search button is pushed, add a parameter that requests 100 results per page.  (This will add a redundant new line of HTML every time the button is pushed, but it seems to cause no harm.)
new_element2=window.document.createElement("input");
new_element2.type="hidden";
new_element2.value=100;
new_element2.name="n";
document.evaluate('//*[@id="sbx"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.insertBefore(new_element2,document.evaluate('//*[@id="sbx"]/input[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);

// Eliminate Image Results.  It doesn't always appear, so do this near the end so that it won't break the rest of the script.
try{smart_remove(window.document,document.evaluate('//*[@id="super"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);}
catch(err){}

// Reduce font size for "Also try:".  This one may not exist, either.
try{set_style_script(window.document,document.evaluate('//*[@id="atat"]'                , document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"font-size:110%;",null,null);}
catch(err){}

// Fix tab title
document.evaluate('//html/head/title', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.textContent="AltaVista Search Results";

// Force AltaVista Favicon
new_element1=window.document.createElement("link");
new_element1.type = "image/x-icon";
new_element1.rel="shortcut icon";
new_element1.href="data:image/png;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAMAqQAjHb0ADwqnADEwsQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECFEREREREQAACQRRERERAJEEkAUREREAUREIgJEREQSRERBIiREREA0REQkIURERARERCJAFEREQkREQEEEREREJERARCJERERCREIUQBREFEQUQiRCBERCNERCJEMEREQCRBAkRAFEREEAABREIEREREEhRCAAREREREREQSIP////BP///zJ///88P///Ph///59P///fJ///76f///ez///7mf//3Zn//+eZ///zHP//+Bz///4w////+P//";
document.evaluate('//html/head', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.insertBefore(new_element1,document.evaluate('//html/head/script', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);

}; // Ends do_platypus_script
//===========================================================================
  window.addEventListener("load", function() { do_platypus_script() }, false);
//===========================================================================
//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing code to implement Platypus actions.
//
//  ABRIDGED -- rl 2/27/2010
//  ========
// 
function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};
function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};
function script_paste(doc, where, what) {
    var new_node = what.cloneNode(true);
    new_node.style.display = "";
    where.parentNode.insertBefore(new_node, where);
};
function set_style_script(doc, element, new_style) {
    element.setAttribute('style', new_style);
};
//.user.js
// ==UserScript==
// @name           Altyahoosearch2
// @namespace      http://www.userscripts.org
// @include        http://us.yhs4.search.yahoo.com/yhs/*
// ==/UserScript==
function do_platypus_script() {

// Yahoo has changed the layout of searches originating with AltaVista.  Thanks for that.  Here are a few remaining tweaks.

// I hated what Yahoo had done to the old AltaVista search engine.
// The altyahoosearch script began to make Yahoo search results look more like the old AltaVista style.

// Change width
set_style_script(window.document,document.evaluate('//*[@id="doc"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 1200px;",null,null);
set_style_script(window.document,document.evaluate('//*[@id="web"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 1100px;",null,null);

// Adjust results size
set_style_script(window.document,document.evaluate('//*[@id="topbar"]/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"margin-right: 0px; font: 10px/1.23 DejaVu sans; margin-top: 5px; width: 600px;",null,null);
set_style_script(window.document,document.evaluate('//*[@id="topbar"]/span/h3', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 500px;",null,null);

// In results, replace the line break with a space
smart_remove    (window.document,document.evaluate('//*[@id="topbar"]/span/h3/br', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
document.evaluate('//*[@id="topbar"]/span/h3/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.childNodes[1].textContent=" results for...";

// Prefix results with 2 new words
new_element1=window.document.createElement("span");
new_element1.textContent='AltaVista found...';
document.evaluate('//*[@id="topbar"]/span/h3', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.insertBefore(new_element1,document.evaluate('//*[@id="topbar"]/span/h3/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);

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
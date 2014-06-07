// ==UserScript==
// @name            Travian Delete All
// @namespace  Travian
// @author	ww_start_t
// @version 	3.1.1
// @description	 Add filter messages and reports
// @copyright	© Travian
// @license 	Creativ Share 
// @include         http://*.travian.*/nachrichten.php*
// @include         http://*.travian.*/berichte.php*
// ==/UserScript==
function script() {
do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/DIV[2]/FORM[1]/TABLE[1]/TFOOT[1]/TR[1]/TH[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/&nbsp;/,'<input class="check" id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">',null);
}; // Ends script
window.addEventListener("load", function() { script() }, false);
;

//
 
function center_it(doc, node) {
  var center_node = doc.createElement ("CENTER");
  return center_node;
};
 function isolate(doc, node) {
  if (!node.parentNode) return;
  node.parentNode.removeChild(node);
  while (doc.body.childNodes.length > 0) {
    doc.body.removeChild(doc.body.childNodes[0]);
  };
  var replacement_div = doc.createElement ("DIV");
  replacement_div.setAttribute('style',
       "margin: 0 2%; text-align: left");
  replacement_div.appendChild(node);
  doc.body.appendChild(replacement_div);
};
 function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
node.href = node.href.replace(match_re, replace_string);
    };
};
function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};
function do_modify_html_it(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    };
};
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
  Dump("Max elem = "+max_elem.tagName);
  return max_elem;
};


//.user.js

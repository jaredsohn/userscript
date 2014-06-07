// CNN Fortune Cookie user script
// version 0.1 BETA
// 01-23-2007
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// NOTE: I know next to nothing about writing scripts like these, so
// I created this with the help of a useful tool called Platypus,
// at http://platypus.mozdev.org/
//
// I have a feeling that something this simple could have been done with
// just a couple lines of script, probably much better, quicker, simpler,
// and funnier, but I don't know how. If you can help write an improved
// version, contact me and we can make some changes.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          The CNN Fortune Cookie script
// @namespace     http://www.ironicsans.com
// @description   Your lucky numbers are 12, 3, 42, 7, and 3.14159
// @include       http://www.cnn.com/
// @include	  http://cnn.com/
// ==/UserScript==


function do_platypus_script() {
html_insert_it(window.document,document.evaluate('//h2/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,' in bed',false,false);


}; // Ends do_platypus_script


window.addEventListener("load", function() { do_platypus_script() }, false);



function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
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
};


function platypus_do(win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning("Platypus couldn't find a page element when executing the command "+
func_name+".  This usually happens when running a script -- maybe the"+
" web page the script is running on has changed.");
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};
//.user.js
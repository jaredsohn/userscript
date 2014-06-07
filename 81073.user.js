// ==UserScript==
// @name            Platypus-fr.killbase.net/transfer
// @namespace       Platypus
// @include         http://fr.killbase.net/transfer/research
// ==/UserScript==
function do_platypus_script() {
remove_it(window.document,document.getElementById('age'),null,null,null);
remove_it(window.document,document.getElementById('dodge'),null,null,null);
remove_it(window.document,document.getElementById('resistance'),null,null,null);
remove_it(window.document,document.getElementById('interception'),null,null,null);
remove_it(window.document,document.getElementById('strength'),null,null,null);

html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[2]/DIV[2]/FORM[1]/P[2]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<input id="age" name="age" size=6 value="1-200">',false,false);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[2]/DIV[2]/FORM[1]/P[3]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<input id="dodge" name="dodge" size=6 value="1-200">',false,false);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[2]/DIV[2]/FORM[1]/P[4]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<input id="resistance" name="resistance" size=6 value="1-200">',false,false);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[2]/DIV[2]/FORM[1]/P[5]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<input id="interception" name="interception" size=6 value="1-200">',false,false);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[2]/DIV[2]/FORM[1]/P[6]/LABEL[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<input id="strength" name="strength" size=6 value="1-200">',false,false);


}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");

//
//  Mon Dec 19 15:59:37 2005 -- Scott R. Turner
//  Short, uncommented file containing all the code to implement Platypus
//  actions.  Can be "included" into the Platypus script.
//
// 
// 

function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
	node.parentNode.removeChild(node);
};

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


//.user.js
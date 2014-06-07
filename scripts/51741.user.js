// ==UserScript==
// @name            Billy Mission Mover
// @namespace       Supa Epic - using Platypus
// @include         http://www.animecubed.com/billy/bvs/missions/mission*
// ==/UserScript==
function do_platypus_script() {
var getMissionTables = document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/CENTER[1]/TABLE',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var properTable = getMissionTables.snapshotLength;
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/CENTER[1]/TABLE["properTable"]/TBODY[1]/TR[1]/TD[1]/FORM[1]/A[1]/IMG[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
script_paste(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/CENTER[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/CENTER[1]/TABLE["properTable"]/TBODY[1]/TR[1]/TD[1]/FORM[1]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/CENTER[1]/TABLE["properTable"]/TBODY[1]/TR[1]/TD[1]/FORM[2]/A[1]/IMG[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
script_paste(window.document,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/CENTER[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/CENTER[1]/TABLE["properTable"]/TBODY[1]/TR[1]/TD[2]/FORM[1]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null);
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
function walk_down(node, func) {
  if (node.nodeType == 1) {
    if (node.tagName != "IMG") func(node);
    if (node.childNodes.length != 0)
      for (var i=0; i<node.childNodes.length; i++)
walk_down(node.childNodes.item(i),func);
  }
}
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
function platypus_do(win, func_name, o, other, other2, other3) {
    var func = eval(func_name);
    var doc = null;
    if (func == null) return;
    if (!o) {
Warning(platypusplatypuscouldntfi1+
func_name+platypusthisusuallyhappens);
    };
    doc = win.document;
    func(doc, o, other, other2, other3);
};

//.user.js
// ==UserScript==
// @name            Platypus-fr.killbase.net/index/la
// @namespace       Platypus
// @include         http://fr.killbase.net/*
// ==/UserScript==
function do_platypus_script() {
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/UL[1]/LI[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/UL[1]/LI[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<li>        <ul style="display: block;" class="subMenu">          <li><a href="http://fr.killbase.net/club/display">bureau</a></li>          <li><a href="http://fr.killbase.net/club/kaz-manpower">effectif</a></li>                    <li><a href="http://fr.killbase.net/club/group-ranking">groupe</a></li>          <li><a href="http://fr.killbase.net/club/calendar">calendrier</a></li>                    <li><a href="http://fr.killbase.net/transfer/display">transferts</a></li>          <li>            <a href="http://fr.killbase.net/message/read">            messagerie                        </a>          </li>                    <li><a href="http://fr.killbase.net/club/patronage">parrainage</a></li>                              <li><a href="http://fr.killbase.net/club/financial-history">finances</a></li></ul></li>',true,false);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/UL[1]/LI[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/UL[1]/LI[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'      <li >        <ul class="subMenu">          <li><a href="http://fr.killbase.net/armory/protection">dépôt</a></li>          <li><a href="http://fr.killbase.net/armory/equip-kaz">vestiaire</a></li>          <li><a href="http://fr.killbase.net/armory/ufk-protection">magasin UFK</a></li>        </ul>      </li>',true,false);

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
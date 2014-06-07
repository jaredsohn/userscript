 // ==UserScript==
// @name           World Hop  (en/ZZ)
// @namespace      www.grepolis.com
// @description    World Hop  (en)
// @include        http://*.grepolis.*/game/*
// @version        0.0.9
// @require        http://userscripts.org/scripts/source/73042.user.js
// ==/UserScript==.
//----------------------------------------------------------------|
//for en4 1st go on 0 then try en4 and it will load  tell me if it works
function do_platypus_script() {
html_insert_it(window.document,document.getElementById('header'),'<td><a href="http://en.grepolis.com/start?action=select_new_world" target="_blank">|0|</a></td>      </tr><td><a href="http://ro1.grepolis.com/game/index?login=1" target="_blank">|Alpha|</a></td>      </tr><td><a href="http://ro2.grepolis.com/game/index" target="_blank">|Beta|</a></td>      </tr><td><a href="http://ro3.grepolis.com/game/index" target="_blank">|Gamma|</a></td>      </tr><td><a href="http://en.grepolis.com/start/index?world_id=en4&action=login_on_new_world" target="_blank">|Delta|</a></td>      </tr><td><a href="http://ro5.grepolis.com/game/index" target="_blank">|Epsilon|</a></td>      </tr><td><a href="http://ro6.grepolis.com/game/index" target="_blank">|Zeta|</a></td>      </tr><td><a href="http://ro7.grepolis.com/game/index" target="_blank">|Eta|</a></td>      </tr><td><a href="http://en8.grepolis.com/game/index" 
href="http://ro.grepolis.com/start/index?world_id=en12&action=login_on_new_world" target="_blank">|mu|</a></td>     
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/SPAN[1]/TABLE[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 90%;",null,null);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");


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
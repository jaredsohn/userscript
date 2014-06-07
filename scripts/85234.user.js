// ==UserScript==
// @name           World Hop  (en/ZZ)
// @namespace      www.grepolis.com
// @description    World Hop  (en)
// @include        http://*.grepolis.*/game/*
// @version        0.1.0
// @require        http://userscripts.org/scripts/source/73042.user.js
// ==/UserScript==.
//----------------------------------------------------------------|
//add new worlds for en
//add scroll code to bar
function do_platypus_script() {
html_insert_it(window.document,document.getElementById('header'),'<div 

style="width:820px;height:45px;overflow-x:scroll;background-image: 

url(http://1.2.3.11/bmi/www.marver.gr/pict/granitis/zimbabwe%20black.JPG);"><p style="width:110%;"><a 

href="http://en.grepolis.com/start?action=select_new_world" target="_blank">|0|</a> <a 

href="http://en1.grepolis.com/game/index" target="_blank">|Alpha|</a> <a href="http://en2.grepolis.com/game/index" 

target="_blank">|Beta|</a> <a href="http://en3.grepolis.com/game/index" target="_blank">|Gamma|</a> <a 

href="http://en.grepolis.com/start/index?world_id=en4&action=login_on_new_world" target="_blank">|Delta|</a> <a 

href="http://en5.grepolis.com/game/index" target="_blank">|Epsilon|</a> <a href="http://en6.grepolis.com/game/index" 

target="_blank">|Zeta|</a> <a href="http://en7.grepolis.com/game/index" target="_blank">|Eta|</a> <a 

href="http://en8.grepolis.com/game/index" target="_blank">|Theta|</a> <a href="http://en9.grepolis.com/game/index" 

target="_blank">|Lota|</a> <a href="http://en10.grepolis.com/game/index" target="_blank">|Kappa|</a> <a 

href="http://en.grepolis.com/start/index?world_id=en11&action=login_on_new_world" target="_blank">|Lambda|</a> <a 

href="http://en.grepolis.com/start/index?world_id=en12&action=login_on_new_world" target="_blank">|mu|</a> <a 

href="http://en.grepolis.com/start/index?world_id=en13&action=login_on_new_world" target="_blank">|Nu|</a> <a 

href="http://zz1.grepolis.com/game/index?town_id=1471" target="_blank">|zz1|</a> <a 

href="http://zz2.grepolis.com/game/index?town_id=1471" target="_blank">|zz2|</a></p></div></div>       

</tbody></table>',false,false);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/SPAN[1]/TABLE[1]', document, null, 

XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"width: 90%;",null,null);
}; // Ends do_platypus_script
window.addEventListener("load", function() { do_platypus_script() }, false);
var gplatypusBundle = 

Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
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
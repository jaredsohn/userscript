// ==UserScript==
// @name          Google IG with 4 Columns
// @namespace     http://myjavaserver.com/~ksenji
// @description	  Google IG with 4 cols	
// @include       http://*google.com/ig*
// ==/UserScript==

/**
 * Adds one more column (making it four columns) to the Google IG personalized homepage. 
 * 
 * This user script creates a fourth column, and remembers the modules put in to the fourth column using GreaseMonkey's GM_setValue.
 * Since this script can only keep track of client side id's of the modules (which change if any module is deleted or news modules 
 * added), if any module is deleted, there is potential that the fourth column modules that are supposed to be in the fourth column
 * might not be rendered in the fourth column but will be rendered in any other column. 
 */

/** from http://diveintogreasemonkey.org/ */
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

(function() {
  window.addEventListener("load", function() {
    var td3 = document.getElementById("c_3");
    var td4 = document.createElement("td");
    td4.id = "c_4";
  
    var div4 = document.createElement("div");
    div4.setAttribute("class", "dm");
  
    var tddummy = document.createElement("td");
    tddummy.innerHTML = "&nbsp;&nbsp;";
  
  
    td3.parentNode.insertBefore(td4, td3.nextSibling);
    td3.parentNode.insertBefore(tddummy, td3.nextSibling);
  
    addGlobalStyle("#c_1,#c_2,#c_3,#c_4{width:25%;vertical-align:top;}");
    var _gel = unsafeWindow._gel;
    unsafeWindow._cols = [_gel("c_1"),_gel("c_2"),_gel("c_3"),_gel("c_4")];
    unsafeWindow.az = false;
    unsafeWindow.ax = false;
    unsafeWindow._upc();
    var modules = GM_getValue("c_4:modules", '');
    if(modules != '') {
      var modulesArray = modules.split(":");
      for(var i=0; i<modulesArray.length; i++) {
        var div = document.getElementById(modulesArray[i]);
        if(div) {
          div.parentNode.removeChild(div);
          td4.appendChild(div);
        }
      }
    }
    td4.appendChild(div4);
  }, false);
  window.addEventListener("unload", function() {
    var td4 = document.getElementById("c_4");
    var modules = "";
    var childNodes = td4.childNodes;
    for(var i=0; i<childNodes.length-1; i++) {
      modules += childNodes[i].id;
      if(i < childNodes.length-2) {
        modules += ":";
      }
    }
    GM_setValue("c_4:modules", modules);
  }, false);
})();
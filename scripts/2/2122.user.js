// ==UserScript==
// @name           Save/View Snapshot
// @namespace      http://www.websandbox.net/
// @description    Save a snapshot of a webpage, including form data
// @include        *
// ==/UserScript==
(function() { 
if(!window.document.body) return false;
GM_registerMenuCommand("Save Snapshot", function() { gm_save_snapshot("application/octet-stream"); } );
GM_registerMenuCommand("View Snapshot", function() { gm_save_snapshot("text/plain"); } );
})();

function gm_save_snapshot(mime) { 
  if(!window.document.body) return false;
  if(window.parent != window) return false;
  /* set the base URL for the doc */
  var i;
  if(document.getElementsByTagName("base").length == 0) {
    var base = document.createElement("base");
    base.setAttribute("href","http://" + document.domain + "/");
    if(document.getElementsByTagName("head").length == 0) document.documentElement.insertBefore(document.createElement("head"), document.documentElement.firstChild);
    document.getElementsByTagName("head")[0].insertBefore(base, document.getElementsByTagName("head")[0].firstChild);
  }

  var textboxes = getNodesFromXpath("//input[not(@type) or @type='text' or @type='password' or @type='hidden' or @type='submit' or @type='reset' or @type='button']");
  for(i=0;i<textboxes.length;i++) {
     textboxes[i].setAttribute("value",textboxes[i].value);
  }

  var textareas = getNodesFromXpath("//textarea");
  for(i=0;i<textareas.length;i++) {
     textareas[i].innerHTML = textareas[i].value;
  }

  var options = getNodesFromXpath("//option");
  for(i=0;i<options.length;i++) {
    if(options[i].selected) options[i].setAttribute("selected","selected");
  }

  var checkboxes = getNodesFromXpath("//input[@type='checkbox' or @type='radio']");
  for(i=0;i<checkboxes.length;i++) {
     if(checkboxes[i].checked) checkboxes[i].setAttribute("checked","checked");
  }
  
  var buttons = getNodesFromXpath("//button");
  for(i=0;i<buttons.length;i++) {
     buttons[i].setAttribute("value",buttons[i].value);
  }
  
  var allCode = "";
  if(document.doctype && document.doctype != null) {
    allCode += "<!DOCTYPE " + document.doctype.name + " \"" + document.doctype.publicId + '" "' + document.doctype.systemId + "\">\n";
  }
  allCode += "<html";
  for(var i = 0; i < document.documentElement.attributes.length; i++) {
    allCode += " " + document.documentElement.attributes[i].name + '="' + document.documentElement.attributes[i].value + '"';
  }
  allCode += ">";
  allCode += document.documentElement.innerHTML;
  allCode += "</html>";

  window.location = ("data:" + mime + "," + escape(allCode));

  function getNodesFromXpath(xpath) {
    if(!document.evaluate) return [];
    var rs = document.evaluate(xpath,document,null,5,null);
    var nodes = [];
    var currentNode = rs.iterateNext();
    while(currentNode) {
      nodes.push(currentNode);
      currentNode = rs.iterateNext();
    }
    return nodes;
  }
}









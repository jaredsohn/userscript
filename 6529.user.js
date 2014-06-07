// ==UserScript==
// @name          Show Form Action
// @namespace     http://loucypher.wordpress.com/
// @include       *
// @description	  Show form action
// ==/UserScript==

var passw = document.evaluate('//input[@type="password"]',
            document, null, 6, null);
if (!passw.snapshotLength) return;

var domains = [];
getDomainList(document.domain, domains);
var sld = domains[domains.length - 1]; // second-level domain

var form, action, text;
for (var i = 0; i < passw.snapshotLength; i++) {
  form = passw.snapshotItem(i).form;
  action = form.action == "" ? form.ownerDocument.URL : form.action;
  text = form.insertBefore(document.createElement("input"),
                           form.firstChild);
  text.id = "show-form-action-" + i;
  text.type = "text";
  text.value = action;
  text.setAttribute("title", action);
  text.setAttribute("readonly", "");
  text.style.width = "100%";
  text.style.cursor = "help";
  if (action.indexOf(sld) == -1) {
    text.style.backgroundColor = "red";
    text.style.color = "yellow";
    text.style.fontWeight = "bold";
  } else {
    text.style.backgroundColor = "infobackground";
    text.style.color = "infotext";
  }
  if (text.nextSibling.nodeType != 3 &&
      text.nextSibling.hasAttribute("id") &&
      text.nextSibling.id.indexOf("show-form-action") > -1) {
    form.removeChild(text); // prevent duplicate
  }
}


function getDomainList(aHostname, aArray) { // ripped from Stylish extension
  aArray[aArray.length] = aHostname;
  var firstDot = aHostname.indexOf(".");
  var lastDot = aHostname.lastIndexOf(".");
  if (firstDot != lastDot) {
    if (!isNaN(parseInt(aHostname.substring(lastDot + 1, aHostname.length)))) {
      return;
    }
    getDomainList(aHostname.substring(firstDot + 1, aHostname.length), aArray);
  }
}


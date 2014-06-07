// ==UserScript==
// @name           Better Outlook Web Access (OWA)
// @namespace      com.connorgarvey.bowa
// @description    Improves the OWA interface
// @include        http://mail.nana10.co.il/*
// ==/UserScript==

GM_log("Starting Better OWA");

var body = document.getElementsByTagName("body")[0];

function getElementsByClassName(classname, node) {
  if (!node) {
    node = body;
  }
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i = 0,j = els.length; i < j; ++i) {
    if (re.test(els[i].className)) {
      a.push(els[i]);
    }
  }
  return a;
}

function findCaptionTable(className, captionText) {
  var tables = body.getElementsByTagName("table");
  for (var i = 0; i < tables.length; ++i) {
    var table = tables[i];
    if (table.className == className) {
      var caption = table.getElementsByTagName("caption")[0];
      if ((caption != null) && new RegExp("^\\s*" + captionText + "\\s*$").test(caption.textContent)) {
        return table;
      }
    }
  }
}

function findFirstChild(topElement, count) {
  var element = topElement;
  for (var i = 0; (i < count) && (element != null); ++i) {
    var anElement = element.firstChild;
    if (anElement.tagName == "CAPTION") {
      anElement = element.childNodes[1];
    }
    element = anElement;
  }
  return element;
}

function findLoginForm() {
  var forms = body.getElementsByTagName("form");
  for (var i = 0; i < forms.length; ++i) {
    var form = forms[i];
    if (form.getAttribute("action") == "owaauth.dll") {
      return form;
    }
  }
}

//*******
// Login
//*******
var loginForm = findLoginForm();
if (loginForm != null) {
  loginForm.removeAttribute("autocomplete");
  GM_log("Allowed autocomplete for login");
}

//******
// List
//******
var toolbar = findCaptionTable("tbhd", "Toolbar");
if (toolbar != null) {
  GM_log("1");
  var href = findFirstChild(toolbar, 4);
  GM_log(href);
  if ((href != null) && (href.getAttribute("title") == "New Message")) {
    GM_log("2");
    var list = findCaptionTable("lvw", "Content Area");
    if (list != null) {
      list.style.width = 0;
      var main = document.createElement("div");
      list.parentNode.replaceChild(main, list);
      var mainHeight = main.parentNode.clientHeight;
      main.style.overflow = "hidden";
      main.style.widthPercent = 100;
      main.style.height = 0;
      main.style.height = main.parentNode.clientHeight;
      var listBox = document.createElement("div");
      main.appendChild(listBox); 
      //listBox.style.borderBottom="3px solid black";
      listBox.style.overflow = "auto";
      listBox.style.widthPercent = 100;
      listBox.style.height = mainHeight;
      listBox.appendChild(list.cloneNode("true"));
      GM_log("Resized list");
    }
  }
}

//******
// Read
//******
var table = findCaptionTable("w100", "Content Area");
if (table != null) {
  table.style.width = 700;
  GM_log("Resized content area");
}
// ==UserScript==
// @name         Google open all
// @namespace    http://browservulsel.blogspot.com/
// @description  v0.6.2 - Opens all results on current page in new tabs
// @include      http://www.google.*/search?*
// ==/UserScript==

/*

  Author: Jasper de Vries, jepsar@gmail.com
  Date:   2008-12-23

*/

var searchLangs = "nl|en|de"; // Change this for other locales

function renderUi(afterItem) {
  var main = document.createElement("div");
  main.setAttribute("id", "oaMain");

  var button = document.createElement("button");
  button.textContent = "Open all";
  button.addEventListener("click", function(){
    openAll(GM_getValue("oaMaxOpen", 10), GM_getValue("oaSkipIndent", true), GM_getValue("oaReversed", true), GM_getValue("oaHtmlVersion", true));
  }, false);
  main.appendChild(button);

  button = document.createElement("button");
  button.textContent = "Settings";
  button.addEventListener("click", function(){ toggleVisibility(form)  }, false);
  main.appendChild(button);

  var form = document.createElement("form");
  form.setAttribute("id", "oaSettings");
  main.appendChild(form);

  var label = document.createElement("label");
  label.appendChild(document.createTextNode("Open first"));
  var input = document.createElement("input");
  input.size = 1;
  input.value = GM_getValue("oaMaxOpen", 10);
  input.addEventListener("change", function(e){ GM_setValue("oaMaxOpen", parseInt(e.originalTarget.value, 10)) }, false);
  label.appendChild(input);
  label.appendChild(document.createTextNode("results only"));
  form.appendChild(label);

  form.appendChild(renderCheckbox("oaSkipIndent", "Don't open indented results"));
  //form.appendChild(renderCheckbox("oaHtmlVersion", "Open HTML version for PDF, DOC etc."));
  form.appendChild(renderCheckbox("oaReversed", "Open first result last (bottom up)"));

  var a = document.createElement("a");
  a.href = "http://browservulsel.blogspot.com/2005/06/google-open-all-user-script.html";
  a.textContent = "About";
  form.appendChild(a);

  afterItem.parentNode.insertBefore(main, afterItem.nextSibling);

  // Quick language switcher
  var searchPrefs = document.getElementById("sff").getElementsByTagName("table")[0].getElementsByTagName("td")[1];
  GM_xmlhttpRequest({
    method : "GET",
    url : document.location.protocol + document.location.host +"/preferences",
    onload : function(s) {
      var sig = /name="sig" value="([^"]+)"/m.exec(s.responseText)[1];
      searchPrefs.appendChild(document.createTextNode(" [ "));
      var params = document.location.search;
      if (params && params.length > 1) params = params.substring(1).split("&");
      var q = "q=";
      for (var i = 0, param; param = params[i]; i++) {
        if (param.indexOf("q=") == 0) {
          q = param;
          break;
        }
      }
      searchLangs = searchLangs.split("|");
      for (var i = 0, lang; lang = searchLangs[i]; i++) {
        a = document.createElement("a");
        a.setAttribute("href", "/setprefs?"+ q +"&hl="+ lang +"&sig="+ sig +"&prev="+ encodeURIComponent(window.location));
        a.appendChild(document.createTextNode(lang));
        searchPrefs.appendChild(a);
        if (searchLangs[i+1]) searchPrefs.appendChild(document.createTextNode(" | "));
      }
      searchPrefs.appendChild(document.createTextNode(" ]"));
    }
  });
}

function renderCheckbox(property, label) {
  var checkbox = document.createElement("label");
  var input = document.createElement("input");
  input.type = "checkbox";
  input.checked = GM_getValue(property, true);
  input.addEventListener("click", function(e){ GM_setValue(property, e.originalTarget.checked) }, false);
  checkbox.appendChild(input);
  checkbox.appendChild(document.createTextNode(label));
  return checkbox;
}

function openAll(max, mainOnly, reversed, htmlVersion) {
  var as = [];
  xpathExec("//h3[@class='r']/a", function(item){
    if (as.length >= max) return;
    if (mainOnly && item.parentNode.parentNode.hasAttribute("style")) return;
    //if (htmlVersion && xpathExec("../..//span[@class='f']/..//a[0]", function(i){ as.push(i); return true }, item)) return;
    as.push(item);
  });
  if (reversed) as.reverse();
  as.forEach(function(a){ GM_openInTab(a.href) });
}

function toggleVisibility(item) { item.style.visibility = (item.style.visibility == "visible") ? "hidden" : "visible"; }

function xpathExec(xpath, func, item) {
  if (arguments.length < 3) item = document;
  var result = document.evaluate(xpath, item, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < result.snapshotLength; i++) {
    if (result.snapshotLength == 1) return func(result.snapshotItem(i));
    else func(result.snapshotItem(i));
  }
}

xpathExec("//div[@id='ssb']", renderUi);

GM_addStyle(
  "#oaMain { margin: 16px 0; font-size: 11px; line-height: 18px; }"+
  "#oaMain button { margin: 0 5px 0 0; }"+
  "#oaMain input { margin: 0 5px; cursor: pointer; }"+
  "#oaMain label { display: block; }"+
  "#oaSettings { position: absolute; visibility: hidden; margin: 0 0 0 50px; padding: 8px; background: #E5ECF9; border: 1px solid #36C; }"
);

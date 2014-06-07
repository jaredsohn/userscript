// ==UserScript==
// @name           form_debug_view
// @namespace      http://jugyo.org/
// @description    form debug viewer
// @include        http://*
// ==/UserScript==

(function() {
  
  if (self.location.href != top.location.href) {
    return;
  }
  
  element_id = "form_debug_view";
  
  function create(html, style_options) {
    var wrap = document.createElement("div");
    wrap.addEventListener("mouseover", show, false);
    wrap.addEventListener("mouseout", hide, false);
    wrap.addEventListener("click", reload, false);
    for (var key in style_options) {
      wrap.style[key] = style_options[key];
    }
    document.body.appendChild(wrap);
    
    var content = document.createElement("div");
    content.id = element_id;
    with (content.style) {
      display = "none";
    }
    wrap.appendChild(content);
    reload();
  }
  
  function reload() {
    e(element_id).innerHTML = create_html();
  }
  
  function show() {
    e(element_id).style.display = "block";
  }
  
  function hide() {
    e(element_id).style.display = "none";
  }
  
  function e(id) {
    return document.getElementById(id)
  }
  
  function xpath(node, query) {
      var results = document.evaluate(query, node, null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var nodes = new Array();
      for(var i=0; i<results.snapshotLength; i++){
          nodes.push(results.snapshotItem(i));
      }
      return nodes;
  }
  
  function create_html() {
    var text = "";
    text += '<div style="text-align: right;">click to reload</div>';
    var forms = document.forms;
    for (var i = 0; i < forms.length; i++) {
      text += format_form(forms[i]);
    }
    return text;
  }
  
  function format_form(form) {
    var text = "";
    text += "<strong>" + form.method.toUpperCase() + " " + form.action + "</strong>";
    text += "<table cellpadding='0' cellspacing='0'>";
    text += "<tr><th>name</th><th>value</th><th>type</th></tr>";
    var nodes = xpath(form, "descendant::*[@name]");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      text += "<tr><td>" 
            + node.name 
            + "</td><td>" 
            + (node.value ? node.value : node.innerHTML)
            + "</td><td>" 
            + node.type
            + "</td></tr>";
    }
    text += "</table>";
    return text;
  }
  
  function main() {
    GM_addStyle([
      "#" + element_id + " table {margin-bottom: 6px; border: solid 1px gray;}",
      "#" + element_id + " td {border-bottom: dotted 1px gray; border-right: solid 1px gray; padding: 1px 4px;}",
      "#" + element_id + " td:last-child {border-right: none;}",
      "#" + element_id + " tr:last-child td {border-bottom: none;}",
      "#" + element_id + " th {border-bottom: solid 1px gray; border-right: solid 1px gray; padding: 1px 4px; font-wight: bold;}",
      "#" + element_id + " th:last-child {border-right: none;}",
    ].join(''));
    
    style_options = {
      fontFamily: "verdana, sans-serif",
      fontSize: "12px",
      textAlign: "left",
      margin: 0,
      padding: "10px",
      lineHeight: "15px",
      color: "black",
      backgroundColor: "orange",
      MozOpacity: 0.86,
      border: "none",
      position: "fixed",
      overflow: "auto",
      bottom: "20px",
      left: "0px",
      maxHeight: "400px",
      zIndex: 300,
    }
    html = create_html();
    create(html, style_options);
  }
  
  main();
  
})();

// ==UserScript==
// @name        Trello estimate
// @namespace   http://www.aaubry.net
// @include     https://trello.com/b/*
// @version     2
// @grant       unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.$;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('span.estimate { float: right; font-weight: bold; margin-right: 2px; }');
addGlobalStyle('.list-card-title span.estimate { position: absolute; right: 3px; bottom: 6px; }');

var hoursPerDay = 7.0;

function parseTime(value) {
  var parser = /([\d,\.]+)([dh]?)/;
      
  var match = parser.exec(value);
  if(match != null) {
    var value = parseFloat(match[1].replace(",", "."));
    var scale = match[2];
    
    switch(scale) {
      case "d":
        return { value: value, text: Math.ceil(value) + "d" };

      case "h":
      default:
        return { value: value / hoursPerDay, text: Math.ceil(value) + "h" };
    }
  } else {
    return { value: 0.0, text: "" };
  }
}

var timer = null;
timer = setInterval(function() {
  
  
  $(".list")
    .each(function() {
      var total = 0.0;
      
      var cards = $(this).find("a.list-card-title");      

      cards.each(function() {
        var textNode = this.firstChild;
        while(textNode != null && textNode.nodeType != Node.ELEMENT_NODE) {
          textNode = textNode.nextSibling;
        }
        while(textNode != null && textNode.nodeType != Node.TEXT_NODE) {
          textNode = textNode.nextSibling;
        }
      
        if(textNode == null) {
          return;
        }

        var parser = /(.*)\(\s*([\d,\.]+[dh]?)\s*\)/;
      
        var valueField = null;
        var time = null;
      
        var match = parser.exec(textNode.nodeValue);
        if(match != null) {
        
          textNode.nodeValue = match[1];
          
          time = parseTime(match[2]);
          
          var estimate = document.createElement("span");
          estimate.className = "estimate";
          textNode.parentNode.appendChild(estimate);
          valueField = $(estimate);
        } else {
          valueField = $(this).find(".estimate");
          if(valueField.length != 0) {
            time = parseTime(valueField.text());
          }
        }
        
        if(time != null) {
          total += time.value;
          valueField.text(time.text);
        }
      });
      
      var title = $(this).find(".open-card-composer");
      var totalField = title.find(".estimate");
      if(totalField.length == 0) {
        totalField = $("<span class='estimate'></span>");
        title.append(totalField);
      }
      totalField.text(Math.ceil(total) + "d");
    });

}, 500);

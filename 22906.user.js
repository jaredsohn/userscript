// Tourette! example user script
// version 0.1 BETA!
// 2007-04-04
// Copyright (c) 2006, Nick Woolley
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tourette", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Tourette
// @namespace     http://noodlefactory.co.uk/
// @description   Turns the web blue
// @include       *
// ==/UserScript==

expletives = ['FUCK', 'ARSE', 'COCK'];

function rand(n)
{
    return Math.round(Math.random() * n);
}



////////////////////////////////////////////////////////
// The Subverter class
function Subverter(doc_url, script_url) {
    var base_url = doc_url.replace(/[^\/]*$/, "")
    this.baseUrl = base_url
    this.scriptUrl = script_url
}

Subverter.prototype.subvertText = function(text_node) {
    var text = text_node.nodeValue;
    if (text.match(/[a-z]/i)) // only swear if there are words already
    {
        var words = text.split(/\s+/);
        var expletive = expletives[rand(expletives.length - 1)];
        if (words.length > 1)
            words.splice(rand(words.length - 1), 0, expletive);

        text_node.nodeValue = words.join(" ");
    }
}

Subverter.prototype.absolveUrl = function(url) {
    var abs_url = url.match(/^\s*[a-z]+:\/\/?.*$/);
    if (abs_url) return abs_url;
    abs_url = url.match(/^\//);
    if (!abs_url) return this.baseUrl + url;
    var hostname = this.baseUrl.match(/^\s*[a-z]+:\/\/?[^\/]+/);
    return hostname + url;
}

Subverter.prototype.pervertAttr = function(node, attr) {
    if (!node.hasAttribute(attr)) return;
    var url = node.getAttribute(attr);
    var abs_url = this.absolveUrl(url);
    node.setAttribute(attr, this.scriptUrl + "?" + abs_url);
}

Subverter.prototype.absolveAttr = function(node, attr) {
    if (!node.hasAttribute(attr)) return;
    var url = node.getAttribute(attr);
    var abs_url = this.absolveUrl(url);
    node.setAttribute(attr, abs_url);
}


Subverter.prototype.subvert = function(node)
{
    if (node.nodeType == node.TEXT_NODE)
    {
        this.subvertText(node);
        return;
    }

    if (node.nodeType != node.ELEMENT_NODE) return;

    // we've got an element

    // rewite any src or link or href attributes
    // commented for the greasemonkey version, as the URLs don't need rewriting 
//    this.pervertAttr(node, "href");
//    this.absolveAttr(node, "src");

    for(var ix = 0; ix < node.childNodes.length; ++ix)
    {
        subvert(node.childNodes[ix]);
    }
}

function subvert(node) {
    var subverter = new Subverter(node.ownerDocument.URL, "script")
    subverter.subvert(node)
}


function dump(x)
{
    var s;
    for(var k in x) { s += k + "=>" +x[k] + "\n"; }
    alert(s);
}


function addLoadEvent(func) {
  if (!window.onload || typeof window.onload != 'function') {
    window.onload = func;
  } else {
    var oldonload = window.onload
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

//addLoadEvent(function() { subvert(document.body); } );
//addLoadEvent(function() { alert("hi"); } );
//subvert(document.body)
window.addEventListener('load', function(e) { subvert(document.body); }, true)
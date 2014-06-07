// ==UserScript==
// @name          Craigslist previewer
// @namespace     http://jeffpalm.com/craigpreview
// @description   Shows previews of postings in craigslist
// @include       http://*.craigslist.org/*
// ==/UserScript==

/*
 * Copyright 2008 Jeffrey Palm.
 */

function newFunction(_a) {
  var a = _a;
  a.title = "Loading...";
  return function(e) {
    GM_xmlhttpRequest({
      method:"GET",
          url: a.href,
          headers:{
          "User-Agent": "monkeyagent",
            "Accept":"text/html,text/monkey,text/xml,text/plain",
            },
          onload: newFunctionAfterLoad(a)
          });
  };
}

function newFunctionAfterLoad(_a) {
  var a = _a;
  return function(details) {
    var txt = details.responseText;
    if (txt) {
      var lines = txt.split("\n");
      var inside = false;
      var str = "";
      for (var i=0; i<lines.length; i++) {
        var line = lines[i];
        if (inside) {
          if (line.match(/<table summary/)) {
            inside = false;
            break;
          } else {
            line = line.replace(/<br>/,"");
            line = line.replace(/^\s*$/,"\n");
            str += line;
          }
        }
        if (line.match(/<div id="userbody">/)) {
          inside = true;
        }
      }
      a.title = str;
    }
  };
}

function createLink(code,id,domain,color,t,name) {
  var el = document.createElement("a");
  el.href = "http://" + domain + "/flag/?flagCode=" + code + "&postingID=" + id;
  el.innerHTML = name;
  el.style.color = color;
  t.appendChild(document.createTextNode(" "));
  t.appendChild(el);
}

function main() {
  var as = document.getElementsByTagName("a");
  for (var i=0; i<as.length; i++) {
    var a = as[i];
    if (a.href && a.href.match(/.*\d+\.html$/)) {
      a.addEventListener('mouseover',newFunction(a),true);
    }
  }
}

main();

// ==UserScript==
// @name          Craigslist sorter
// @namespace     http://jeffpalm.com/craigsort
// @description   Sorts craigslist articles inline
// @include       http://*craigslist.org/*
// ==/UserScript==

/*
 * Copyright 2007 Jeffrey Palm.
 */

var VERSION = 0.1;

// --------------------------------------------------
// misc
// --------------------------------------------------

function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

function insertBefore(newNode,target) {
  // http://lists.xml.org/archives/xml-dev/200201/msg00873.html
  var parent   = target.parentNode;
  var refChild = target; //target.nextSibling;  
  if(refChild) parent.insertBefore(newNode, refChild);
  else parent.appendChild(newNode);  
}

/* This script and many more are available free online at
The JavaScript Source :: http://javascript.internet.com
Created by: Public Domain */

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

// --------------------------------------------------
// main
// --------------------------------------------------

function main() {
  addLinkAtTop();
}

function addLinkAtTop() {
  //
  // make sure we want to add it
  //
  bodies = document.getElementsByTagName("body");
  if (!bodies || bodies.length == 0) return;
  body = bodies[0];
  if (body.className != "toc") return;
  function space(s) {
    s.appendChild($t(" "));
  }
  //
  // Create the new node
  //
  var span = $n("span");
  span.appendChild($t("[ "));
  a = $n("a",span);
  a.href = "#";
  a.addEventListener('click',doSorting,true);
  b = $n("b",a);
  b.innerHTML = "sort";
  space(span);
  $t(" reverse? ",span);
  rev = $n("input",span);
  rev.type = "checkbox";
  rev.id = "reverse";
  rev.style.verticalAlign = "middle";
  span.appendChild($t(" ]"));
  span.style.verticalAlign = "middle";  
  insertBefore(span,body.firstChild);
}

function doSorting() {
  ps = document.getElementsByTagName("p");
  prices2ps = new Array(); // this holds pairs of p and a score
  
  for (i=0; i<ps.length; i++) {
    p = ps[i];
    if (p.firstChild.nodeName.toLowerCase() == "a") {
      if (res = p.firstChild.innerHTML.match(/\$([\d\.]+)/)) {
        price = res[1];
      } else {
        price = -1;
      }
      //
      // add a little to make these kind of random
      // so we have a one-to-one mapping of prices to ps
      //
      price += Math.random();
      prices2ps[price] = p;
    }
  }
  //
  // remove all the listings
  //
  parent = 0;
  for (i in prices2ps) {
    p = prices2ps[i];
    if (!parent) parent = p.parentNode;
    p.parentNode.removeChild(p);
  }
  //
  // sort everything
  //
  prices = new Array();
  for (i in prices2ps) prices.push(i);
  rev = document.getElementById("reverse").checked;
  prices.sort(rev ? function (a,b) {return b-a;} : function (a,b) {return a-b;});
  //
  // add them back to the parent
  //
  trav = document.getElementsByTagName("h4")[0];
  for (i=0; i<prices.length; i++) {
    p = prices2ps[prices[i]];
    insertAfter(parent,p,trav);
    trav = p;
  }
}

// --------------------------------------------------
// Main
// --------------------------------------------------
main();


// ==UserScript==
// @name          Craigslist mailer
// @namespace     http://jeffpalm.com/craigmails
// @description   Shows quick mail links on craigslist 
// @include       http://*.craigslist.org/*
// ==/UserScript==

/*
 * Copyright 2008 Jeffrey Palm.
 */

function createLink(code,id,color,t,name) {
  var el = document.createElement("a");
  el.href = "http://" + document.domain 
    + "/flag/?flagCode=" + code + "&postingID=" + id;
  el.innerHTML = name;
  el.style.color = color;
  t.appendChild(document.createTextNode(" "));
  t.appendChild(el);
}

function main() {

  var as = document.getElementsByTagName("a");
  for (var i=0; i<as.length; i++) {
    var a = as[i];
    if (!a.href) continue;
    if (res = a.href.match(/.*\/(\d+)\.html$/)) {
      var id = res[1];
      
      var t = document.createElement("span");
      t.style.fontSize = "0.8em";
      a.parentNode.appendChild(t);
      
      // mail link
      var el = document.createElement("a");
      el.href = "mailto:sale-" + id + "@craigslist.org";
      el.innerHTML = "mail";
      el.style.color = "#770000";
      t.appendChild(document.createTextNode(" "));
      t.appendChild(el);

      // flag links, etc
      createLink(16,id,"#777700",t,"miscategorized");
      createLink( 2,id,"#770077",t,"prohibited");
      createLink(15,id,"#000077",t,"spam/overpost");
      createLink( 9,id,"#ff77ff",t,"best of craigslist");
    }
  }
}

main();

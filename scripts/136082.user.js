// ==UserScript==
// @name           Avengers Cast Easy IMDB
// @namespace      userscripts-dugeen
// @description    Like Avengers Easy IMDB, but for cast pages
// @include        http://dissolute.com.au/avweb/*cast.html
// @include        http://www.dissolute.com.au/avweb/*cast.html
// ==/UserScript==

/*
20120600 Working version
20120620 Change to work with series 6 cast pages
*/

function leading_prebr_text(n) {
// PURPOSE Given a node n, and starting with its first child, return all the text until a br node is encountered
var r="", pt = n.firstChild;
while (pt) {
  if (pt.nodeType == 3) {
    // text node - add its text
    r = r + pt.nodeValue; 
  } else {
    if (pt.tagName == "I") {
      // add its content (it's a formatting node and so probably part of the name)
      r = r + pt.textContent;     
    } else {  
      // stop, assuming it's a br or a link 
      break;    
    }  
  }
  pt = pt.nextSibling;
}
return r;
}

// get the td with Starring in it, as that will show us which table we want
var std = document.evaluate(
"//td[starts-with(., 'starring') or starts-with(., 'Starring')]"
, document
, null
, XPathResult.FIRST_ORDERED_NODE_TYPE
, null);


if (!!std) {  
  var re = /^\s*([A-Z]\w+\s+[A-Z].*)\s*$/;  //actor name-spotting regex

  // the nodes we're looking for are the next siblings of the parent row of the 'Starring' node
  var i,tds,ms;
  var n = std.singleNodeValue.parentNode;
  GM_log("parent of std is a " + n.tagName);
  while (1) {
    while (1) {
      n = n.nextSibling;
      if (!n || n.nodeType != 3) break;
    }
    if (!n) break;
    //GM_log(n.tagName + " with text " + n.textContent);
    // now we want the first td child of this node (which shd be a tr)
    tds = n.getElementsByTagName("td");
    var td, t;
//    for (i = 0; i <= tds.length; tds++) {
    if (tds.length > 0) {
      td = tds[0];
      t = leading_prebr_text(td);
      GM_log("Leading text '" + t + "'");
      if (ms = re.exec(t)) {
        GM_log(t + " => " + ms[1]);
        // found something that looks like an actor name - show a link to it
        var a = document.createElement('a');
        a.appendChild( document.createTextNode(ms[1]) );
        a.setAttribute('href', 'https://www.google.co.uk/search?q=' + encodeURIComponent(ms[1] + ' imdb') + '&tbs=li:1');
        // put it in the item
        td.appendChild(a);        
        a.style.background = 'gold';
      } else {
        GM_log("No match found");
      }
    }
  }
}

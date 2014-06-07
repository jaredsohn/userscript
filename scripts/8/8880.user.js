// ==UserScript==
// @name           5 random scripts
// @namespace      znerp
// @description    Adds 5 random scripts to the us.o front page
// @include        http://userscripts.org/scripts
// @include        http://userscripts.org/scripts?page=*
// ==/UserScript==

var number = 5;
var allScripts = document.evaluate(
  '//a[contains(@href, "/scripts/show")]',
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var latestScript = 0;
var css = "@namespace url(http://www.w3.org/1999/xhtml);"+
          ".random h1 { "+
          "  font-size:0.80em; "+
          "  margin-bottom: 0px; }"+
          ".random p { "+
          "  margin-top: 0px; }";

function add_randoms() {
  link = "http://userscripts.org/scripts/show/"+Math.floor(Math.random()*(latestScript + 1));
  GM_xmlhttpRequest({
    method: 'get',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Content-type': 'application/x-www-form-urlencoded'
    },
    url: link,
    onload: function(result) {
      res = result.responseText;
      h1 = res.slice(res.indexOf('<h1>', res.indexOf('<div id="content">')),res.indexOf("</h1>",res.indexOf('<div id="content">'))+5);
      if (h1.match("Uh-oh! The page could not be found!") != null) {
        add_randoms();
      } else{
        div = document.createElement("div");
        div.setAttribute("class", "random");
        a = parseInt(res.slice(res.indexOf('/scripts/source/')+16,res.indexOf(".user.js")));
        div.innerHTML = "<a href = 'scripts/show/"+a+"'>"+h1+"</a>";
        div.innerHTML += res.slice(res.indexOf('</h1>',res.indexOf('<div id="content">'))+5,res.indexOf("</p>",res.indexOf('</h1>',res.indexOf('<div id="content">')))+4);
        sibling.parentNode.insertBefore(div, sibling.nextSibling.nextSibling.nextSibling.nextSibling);
      }
    }
  });
}

GM_addStyle(css);
for (i = allScripts.snapshotLength - 1; i >= 0; i--) {
  var src = allScripts.snapshotItem(i).href;
  var n = parseInt(src.substring((src.lastIndexOf('/')+1), src.length));
  if (latestScript < n) latestScript = n;
}
rightDiv = document.getElementById("right");
sibling = rightDiv.getElementsByTagName("h5")[0];
heading = document.createElement("h5");
heading.appendChild(document.createTextNode(number + " Random Scripts"));
sibling.parentNode.insertBefore(heading, sibling.nextSibling.nextSibling.nextSibling);
for (i = 0; i <= number; i++) add_randoms();
// ==UserScript==
// @name          Audible Download Subscriptions
// @namespace     http://jeffpalm.com
// @description   Automatically downloads all your subscriptions to Audible for today.
// @include       http://www.audible.com/adbl/site/mylibrary/library.jsp*
// ==/UserScript==

function pad(v) {
  return v < 10 ? "0" + v : String(v);
}

function formatDate(d) {
  var year = String(d.getFullYear()).substring(2,4);
  var month = pad(d.getMonth()+1);
  var date = pad(d.getDate());
  return year + month + date;
}

function downloadAll() {
  var as = document.getElementsByTagName("A");
  var js = "javascript:";
  var dateStr = formatDate(new Date());
  var dateRE = new RegExp(dateStr);
  for (var i in as) {
    var a = as[i];
    var href = a.href;
    if (href.match(/^javascript:/)) {
      var s = href.replace("javascript:","");
      if (!s.match(/^downloadThis/)) continue;
      if (!s.match(dateRE)) continue;
      js += s + ";";
    }
  }
  document.location = js;
}

function main() {

  // Expand all the nodes
  var as = document.getElementsByTagName("A");
  var js = "javascript:";
  for (var i in as) {
    var a = as[i];
    if (a.innerHTML == "See Latest Episodes") {
      var href = a.href;
      if (href.match(/^javascript:/)) {
	var hrefNoJs = href.replace("javascript:","");
	js += hrefNoJs + ";";
      }
    }
  }
  document.location = js;

  // Download them all, after about a second
  setTimeout(downloadAll,1000);
}

main();
// ==UserScript==
// @name           Bizarro Navigation Links
// @namespace      real.billy
// @description    adds next and previous links to comics
// @include        http://seattlepi.nwsource.com/fun/*.asp*
// ==/UserScript==

var url = window.location.toString();
var baseURL = url.substring(0, url.lastIndexOf(".asp") + ".asp".length) + "?date=";

var select = document.getElementsByName("date")[0];
var cur = select.selectedIndex;
if (cur < select.options.length - 1) {
  var nextLink = document.createElement("a");
  nextLink.href = baseURL + select.options[cur + 1].value;
  nextLink.innerHTML = "Earlier";
  select.parentNode.insertBefore(nextLink, select);
  
  var spacer = document.createElement("span");
  spacer.innerHTML = "&nbsp;&nbsp;&nbsp;"
  select.parentNode.insertBefore(spacer, select);
}

if (cur > 0) { 
  var backLink = document.createElement("a");
  backLink.href = baseURL + select.options[cur - 1].value;
  backLink.innerHTML = "Later";
  select.parentNode.insertBefore(backLink, select);
}

var br = document.createElement("br");
select.parentNode.insertBefore(br, select);
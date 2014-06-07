// ==UserScript==
// @name           OkCupid sort common tests on top
// @namespace      http://code.google.com/p/ecmanaut/
// @description    On OkCupid profiles' tests pages, assume you are more interested in results to tests you have taken too, and thus show them on top.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @include        http://www.okcupid.com/profile/*/tests*
// ==/UserScript==

var tbody = $X('id("result_table")/tbody');
$x('tr[td[3]/a[.="Take it!"]]', tbody).forEach(function last(tr) {
  tbody.appendChild(tr);
});

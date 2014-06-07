// ==UserScript==
// @name          Yahoo Fantasy - Matchup Navigator
// @namespace     http://userscripts.org/users/mechler
// @description   Provides links to navigate through the matchup scores for various weeks.
// @include       http://baseball.fantasysports.yahoo.com/*/*/matchup*
// @author        Kyle Mechler (kylemech@gmail.com)
// ==/UserScript==

var query_string = function() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
  return query_string;
} ();

var header_div = document.evaluate("//*[@id='matchup-h1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
header_div.snapshotItem(0).style.overflow = 'hidden';

var header = document.evaluate("//*[@id='matchup-h1']/h1", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
header.snapshotItem(0).style.cssFloat = 'left';

prev_link = document.createElement('a');
prev_week = parseInt(query_string.week) - 1;
prev_link.href = 'matchup?week=' + prev_week;
prev_link.style.cssFloat = 'right';
prev_link.style.padding = '0 10px 0 10px';
prev_link.style.lineHeight = '25px';
prev_link.title = '&laquo; previous week';
prev_link.innerHTML = prev_link.title;

next_link = document.createElement('a');
next_week = parseInt(query_string.week) + 1;
next_link.href = 'matchup?week=' + next_week;
next_link.style.cssFloat = 'right';
next_link.style.padding = '0 10px 0 10px';
next_link.style.lineHeight = '25px';
next_link.title = 'next week &raquo;';
next_link.innerHTML = next_link.title;

header_div.snapshotItem(0).appendChild(next_link);
header_div.snapshotItem(0).appendChild(prev_link);
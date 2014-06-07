
// MovieLens --> Torrent Typhoon
// version 0.4
// 2005-07-27
// Copyright (c) 2005, bollwyvl
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MovieLens --> Torrent Typhoon", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MovieLens --> Torrent Typhoon
// @namespace     http://greasemonkeyed.com/scripts/show/1466
// @description   add a button to display a list of available torrents to movielens search results
// @include       http://movielens.umn.edu/*
// @include       http://www.torrenttyphoon.com/default.aspx*
// ==/UserScript==

switch(window.location.host){
case 'movielens.org':
case 'www.movielens.org':
case 'movielens.umn.edu':
 window.addEventListener(
    'load', 
    function() {
      window.torrentpane = function(row, searchtext, caller){
        var tttr = document.createElement("tr");
        tttr.setAttribute("class",row.className);
        var tttd = tttr.appendChild(document.createElement("td"));
        tttd.setAttribute("colspan","4");
        var ttiframe = tttd.appendChild(document.createElement('iframe'));
        ttiframe.setAttribute('src', "http://www.torrenttyphoon.com/default.aspx?cat=movies&q=" + searchtext);
        ttiframe.setAttribute('width', "100%");
        ttiframe.setAttribute('frameborder', "0");
        
        row.parentNode.insertBefore(tttr, row.nextSibling);
        this.onclick = "";
      }
      
      var allSpans, thisSpan, movieName;
      allSpans = document.evaluate(
      "//span[@class='movieTitle']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
      
      	
      for (var i = 0; i < allSpans.snapshotLength; i++) {
        thisSpan = allSpans.snapshotItem(i);
      	
        // do something with thisDiv
      	movieName = thisSpan.innerHTML;
      	var movieName2 = movieName.split("(");
      	movieName = movieName2[0].replace(/^\s*|\s*$/g,"");
        	
      	var tt = document.createElement('img');
      	tt.setAttribute("onclick", "window.torrentpane(this.parentNode.parentNode, '" + 
                                 movieName +
                                 "', this); this.onclick = '';");
        tt.src = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0E%00%00%00%0E%04%03%00%00%00%EDf0%E2%00%00%000PLTE%FF%00%FF%AB%AB%AB2w%B1%E5%E5%E5%00*M%01K%8A%5D%94%C1%1Cg%A6%00%3Ftx%A6%CC%FF%FF%FFJ%87%BA%86%86%86%C3%C3%C3%0FZ%98%003fK%0C%0C6%00%00%00%01tRNS%00%40%E6%D8f%00%00%00tIDAT%08%D7c%60H%CB%DE%A4%A4%CE%C0%C06sZ%F6%26%F5%07%0C%993%D3v%2B%D5%852d%ADZ%B5J%FDi(%C3%CE%B4%D5%9B%EAB%3B%18%B6%A5%AD%5E%B5%D8V%82a%F7%EEEz%C1%1D%3F%18%B47-%7F%1A%0B%A4%95%94%D6%856%FE%FF%CF%A0Tn%1A%01%A6%EBL%3B%FE%B8%F83%94%3F%ED%E8%07%D1%7C%11%1D%FF%FF%B8%7C%60%60%88%E8%E8%00J%03%00KN1%82%DD%E2%83%80%00%00%00%00IEND%AEB%60%82';
        tt.style.border = '0';
        tt.style.vertical_align = 'middle';
        thisSpan.parentNode.insertBefore(tt, thisSpan.nextSibling.nextSibling);
      }
    },
    true
  );
break;
case 'torrenttyphoon.com':
case 'www.torrenttyphoon.com':
  window.addEventListener(
    'load', 
    function() { 
      var resultsearch = document.evaluate(
      "//table[@id='cSearch_dtgResults']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
      document.body.style.margin = "0";
      document.body.style.padding = "0";
      document.body.innerHTML = resultsearch.snapshotItem(0).parentNode.innerHTML; 
      
      var nowrap = document.evaluate(
      "//td[@nowrap='nowrap']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
      for (var i = 0; i < nowrap.snapshotLength; i++) {
        nowrap.snapshotItem(i).setAttribute("nowrap", "");
      }
    },
    true
  );
break;
}

/* IMDB Trailer

   Created 01/10/2005
   Copyright (c) 2005, Released under the GPL http://www.gnu.org/copyleft/gpl.html
   Created by Tomer Cohen tomco10@gmail.com

*/

// ==UserScript==
// @name          IMDB_Trailer
// @namespace     http://www.ee.bgu.ac.il/~tomco
// @description   Adds trailer to IMDB.
// @include       http://www.imdb.com/*
// ==/UserScript==

/* #########################################################*/

var reMoviePage = /http:\/\/.+\.imdb\.com\/title\/tt\d{7,}\/$/;
if (reMoviePage.test(window.location.href)){
GM_xmlhttpRequest({
    method: 'GET',
    url: document.location + 'trailers',
    onload: function(responseDetails) {
      var doc = responseDetails.responseText;
      var txt = "";
      r = /screenplay-(.*?)-/;
      //r=/USA<\/a>[^=]*(.*)><a[^>]*(.*)<\/a>[^>]*(.*)<\/a>/gm;
      tmp = r.exec(doc);
      txt = "http://www.totaleclips.com/player/player.aspx?custid=102&clipid="+tmp[1]+"&bitrateid=10&playerid=33&formatid=2";
      tmp=document.getElementsByTagName("table");
      tmp[16].innerHTML = "<IFRAME src='" +txt+ "' frameBorder=0 width=350 scrolling=no height=325 leftmargin='0' topmargin='0' bgcolor='#FFFFFF'></IFRAME>";
    }
});
}

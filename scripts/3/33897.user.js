// ==UserScript==
// @name           imdb ratings adder V.
// @description    adds ratings to titles on imdb company and name pages.
// @namespace      Fladvad built on znerps script, and fixed by Szaki
// @include        *port.hu/pls/fi/films*
// @include        *.imdb.com/*
// ==/UserScript==
// @include        *.imdb.com/company/*
// @include        *.imdb.com/name/*
var links = document.links;
for (i = 0; i < links.length; i++) {
  var ok = false;
  var thelink = links[i].href;
  //if (thelink.indexOf("/title/") != -1) {
  if (thelink.search(/\/title\/tt[0-9]*\/?$/) != -1) {//Don't found menus
	//Normal IMDB link
	//http://www.imdb.com/title/tt0102070/
	ok = true;
  } else if (thelink.indexOf("?i_page_id=152&") != -1) {
    //IMDB link at PORT.HU
    //http://www.port.hu/pls/w/logging.page_log?i_page_id=152&i_param=0102070
    thelink = "http://www.imdb.com/title/tt" + thelink.substr(-7);
    ok = true;
  }  
  if ( ok ) {
    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: thelink,
      onload: manageImdbLink( links[i] ) // Here comes the new text
    })
  }
}

function manageImdbLink(destnode) {
	return function(result) {
		res=result.responseText;
		//Old:
		//rating = res.match(/<b>User Rating:<\/b>\s*<b>([^<]*)\/10<\/b>/);
		/*
		<div class="meta">
		<b>8.5/10</b> 

		&nbsp;&nbsp;<a href="ratings" class="tn15more">184,408 votes</a>
		</div>
		*/
		rating = res.match(/<div class="meta">\s*<b>([^<]*)\/10<\/b>/);
		var newnode = destnode.parentNode.insertBefore( document.createElement("font"), destnode);
		if (rating) newnode.innerHTML = " ("+rating[1]+")&nbsp;&nbsp;";
		else        newnode.innerHTML = " (?.?)&nbsp;&nbsp;";
	  }
}

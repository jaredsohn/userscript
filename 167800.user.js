// ==UserScript==
// @name           IMDb ratings
// @author         gonzoid
// @description    Adds ratings on IMDb search results and name pages using third party OMDb API.
// @include        http://www.imdb.tld/find?q=*
// @include        http://imdb.tld/find?q=*
// @include        http://www.imdb.tld/find?s=*&q=*
// @include        http://imdb.tld/find?s=*&q=*
// @include        http://www.imdb.tld/name/nm*
// @include        http://imdb.tld/name/nm*
// @version        2013-05-18
// @namespace      http://userscripts.org/scripts/show/167800
// @grant          GM_xmlhttpRequest
// @downloadURL    http://userscripts.org/scripts/source/167800.user.js
// @updateURL      http://userscripts.org/scripts/source/167800.user.js
// ==/UserScript==
var IMDBpluginlinks = document.links;
var IMDBcontinueelement = document.createElement("button");
IMDBcontinueelement.innerHTML = "Get rating";

function processIMDBLinks(s){
	IMDBcontinueelement.style.display = 'none';
	var r=0;
	for (IMDBi = s; IMDBi < IMDBpluginlinks.length; IMDBi++) {
		if (IMDBpluginlinks[IMDBi].href.indexOf("/title/") != -1 && IMDBpluginlinks[IMDBi].href.indexOf("imdb.") != -1){
			if(r>300){
				IMDBcontinueelement.onclick=function(){ processIMDBLinks(IMDBi); };
				IMDBcontinueelement.style.display='inline';
				IMDBpluginlinks[IMDBi].parentNode.insertBefore(IMDBcontinueelement, IMDBpluginlinks[IMDBi]);
				break;
			}
			r++;
			GM_xmlhttpRequest({
				method: 'get',
				headers: {},
				url: "http://www.omdbapi.com/?i=" + IMDBpluginlinks[IMDBi].href.match(/tt\d+/),
				onload: function (IMDBi) {return function (result) {
					var rating = JSON.parse(result.responseText).imdbRating;
					var votes = JSON.parse(result.responseText).imdbVotes;
					IMDBpluginlinks[IMDBi].parentNode.insertBefore(document.createElement("span"), IMDBpluginlinks[IMDBi]).innerHTML = ((rating !== "N/A")  ? "<b>[" + rating + "/" + votes + "]</b> " : "<b style='color: red'>[N/A]</b> ");
				}}(IMDBi)
			});
		}
	}
}
processIMDBLinks(0);
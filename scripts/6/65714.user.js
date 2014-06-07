// ==UserScript==
// @name		Jetpack Gallery Top Contributor Count
// @author		Erik Vergobbi Vold
// @datecreated	2010-01-04
// @lastupdated	2010-01-04
// @namespace	jpgTopContributorCounts
// @include		http://jetpackgallery.mozillalabs.com/
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will add a jetpack count beside user names in the Top Contributor list.
// ==/UserScript==

(function(){
	var tC=document.evaluate("//ol[@id='top-contributors']/li/a",document,null,7,null);
	if(!tC.snapshotLength) return;

	var usernames=[], j = 0;
	for(; j < tC.snapshotLength; j++){
		usernames[j]=tC.snapshotItem(j).innerHTML.toString();
	}

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://query.yahooapis.com/v1/public/yql?q=use%20'http%3A%2F%2Fgithub.com%2Ferikvold%2Ferikvold-yql-tables%2Fraw%2Fmaster%2Fmozillalabs%2Fjetpackgallery%2Fmozillalabs.jetpackgallery.user.info.xml'%20as%20mozillalabs.jetpackgallery.user.info%3B%0Aselect%20*%20from%20mozillalabs.jetpackgallery.user.info%20where%20username%20in%20('"+usernames.join("'%2C'")+"')&format=json&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
		onload: function(response) {
			var data=JSON.parse(response.responseText).query.results;
			for(var i = 0; i < j; i++){
				if(tC.snapshotItem(i).parentNode) tC.snapshotItem(i).parentNode.innerHTML+=" ("+data.user[i].jetpacks.count+")";
			}
		}
	});
})();
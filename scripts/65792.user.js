// ==UserScript==
// @name		Jetpack Gallery Jetpack Tag Counts
// @author		Erik Vergobbi Vold
// @datecreated	2010-01-05
// @lastupdated	2010-01-05
// @namespace	jpgJetpackTagCounts
// @include		http://jetpackgallery.mozillalabs.com/jetpacks/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will add a jetpack tag counts beside tag names on the Jetpack Gallery jetpack pages.
// ==/UserScript==

(function(){
	var tE=document.evaluate("//section[@id='metadata']/p[contains(text(),'Tags')]/a",document,null,7,null);
	if(!tE.snapshotLength) return;

	var tags=[],i=0;
	for(; i < tE.snapshotLength; i++){
		tags[i]=tE.snapshotItem(i).innerHTML.toString();
	}

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://query.yahooapis.com/v1/public/yql?q=use%20'http%3A%2F%2Ferikvold.com%2Fyql%2Fdatatables%2Fmozillalabs.jetpackgallery.tag.info.xml'%20as%20mozillalabs.jetpackgallery.tag.info%3B%20select%20*%20from%20mozillalabs.jetpackgallery.tag.info%20where%20tag%20in%20('"+tags.join("'%2C'")+"')&format=json&diagnostics=false&callback=",
		onload: function(response) {
			var data=JSON.parse(response.responseText).query.results;
			for(var j = 0; j < i; j++){
				tE.snapshotItem(j).innerHTML+=" <span style=\"font-size:9px;\">("+data.tag[j].jetpacks.count+")</span>";
			}
		}
	});
})();
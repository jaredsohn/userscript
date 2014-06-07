// ==UserScript==
// @name		Jetpack Gallery Popular Tag Counts
// @author		Erik Vergobbi Vold
// @datecreated	2010-01-05
// @lastupdated	2010-01-05
// @namespace	jpgPopTagCounts
// @include		http://jetpackgallery.mozillalabs.com/
// @include		http://jetpackgallery.mozillalabs.com/jetpacks
// @include		http://jetpackgallery.mozillalabs.com/jetpacks?*
// @include		http://jetpackgallery.mozillalabs.com/tags/*/jetpacks
// @include		http://jetpackgallery.mozillalabs.com/tags/*/jetpacks?*
// @include		http://jetpackgallery.mozillalabs.com/contributors/*/jetpacks
// @include		http://jetpackgallery.mozillalabs.com/contributors/*/jetpacks?*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will add a jetpack tag counts beside the 'popular' tags on the Jetpack Gallery home page and jetpack list pages.
// ==/UserScript==

(function(){
	var tE=document.evaluate("//section[@id='tags']/ul/li/a",document,null,7,null);
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
				tE.snapshotItem(j).innerHTML+=" ("+data.tag[j].jetpacks.count+")";
			}
		}
	});
})();
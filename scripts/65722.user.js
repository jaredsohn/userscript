// ==UserScript==
// @name		Jetpack Gallery User Jetpack Count
// @author		Erik Vergobbi Vold
// @datecreated	2010-01-04
// @lastupdated	2010-01-04
// @namespace	jpgTopContributorCounts
// @include		http://jetpackgallery.mozillalabs.com/contributors/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript will add a user's jetpack count to their Jetpack Gallery profile page.
// ==/UserScript==

(function(){
	var uN=document.evaluate("//section[@id='metadata']/h3",document,null,9,null).singleNodeValue,
		output=document.evaluate("//section[@id='my-jetpacks']/h4/a",document,null,9,null).singleNodeValue;
	if(!uN || !output) return;
	uN=uN.innerHTML.toString();

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://query.yahooapis.com/v1/public/yql?q=use%20'http%3A%2F%2Fgithub.com%2Ferikvold%2Ferikvold-yql-tables%2Fraw%2Fmaster%2Fmozillalabs%2Fjetpackgallery%2Fmozillalabs.jetpackgallery.user.info.xml'%20as%20mozillalabs.jetpackgallery.user.info%3B%20select%20*%20from%20mozillalabs.jetpackgallery.user.info%20where%20username%20%3D%20'"+uN+"'&format=json&diagnostics=false",
		onload: function(response) {
			var data=JSON.parse(response.responseText).query.results;
			output.innerHTML+=" ("+data.user.jetpacks.count+")";
		}
	});
})();
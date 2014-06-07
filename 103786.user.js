// ==UserScript==
// @name           GoldenAgeComics for Webcomic Reader
// @author         ameboide
// @version        2011.05.25
// @namespace      http://userscripts.org/scripts/show/103786
// @description    Alternative to the currently unusable online viewer to be used with Webcomic Reader (http://userscripts.org/scripts/show/59842). Must be executed before Webcomic Reader to work
// @include        http://www.goldenagecomics.co.uk/*?dlid=*
// @include        http://goldenagecomics.co.uk/*?dlid=*
// @include        http://goldenagecomics.co.uk/comicreader/getComic.php?did=*
// ==/UserScript==

if(document.location.href.indexOf("dlid=") > 0){
	var linkOrig = document.querySelector('a[href^="comicreader"]');

	linkOrig.parentNode.innerHTML =
		'<a href="http://goldenagecomics.co.uk/comicreader/getComic.php?did=' +
		linkOrig.href.match(/did=(\d+)/)[1] +
		'">View with Webcomic Reader</a> ' +
		linkOrig.parentNode.innerHTML;
}
else{
	var imgs = document.body.innerHTML.match(/http:.+\.jpg/g);

	if(!imgs) html = "There's nothing here :(";
	else{
		var html = '<div id="cont"></div><div style="display:none">';
		for(var i=0; i<imgs.length; i++)
			html += '<a id="img_'+i+'" href="'+imgs[i]+'" >'+i+'</a> ';
		html += '</div>';
	}
	document.body.innerHTML = html;
}
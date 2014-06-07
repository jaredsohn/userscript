// ==UserScript==
// @name         Delicious Gist Tag
// @namespace    deliciousGistTag
// @include      http://delicious.com/save?*
// @include      https://delicious.com/save?*
// @match        http://delicious.com/save?*
// @match        https://delicious.com/save?*
// @datecreated  2010-08-05
// @lastupdated  2010-08-05
// @version      0.1.1
// @author       Erik Vergobbi Vold
// @license      MIT
// @description  This userscript will add a 'gist' tag and 'gist-#' tag to delicious bookmarks for gist.github.com, when you save them.
// ==/UserScript==

(function(d){
	var urlInput = d.getElementById('url');
	if(!urlInput) return;

	var tagsInput = d.getElementById('tags');
	if(!tagsInput) return;

	if(!/https?:\/\/gist\.github\.com\/(\d+)\/?$/.test(urlInput.value)) return;

  function addTag(newTag) {
	if( tagsInput.value.match( "(^|\s)" + newTag + "(\s|$)" )  ) {
		return;
	}
	else if ( tagsInput.value.length == 0 || tagsInput.value.match( / $/ ) ) {
		tagsInput.value += newTag+" ";
	}
	else {
		tagsInput.value += " "+newTag+" ";
	}
  }

  addTag("gist-"+RegExp.$1);
  addTag("gist");
})(document);

// ==UserScript==
// @name           hatebu_tag_filter
// @namespace      http://example.com
// @description    Normalizes filtering tag on Hatena Bookmark, when you display related tag to 'block'.
// @include        http://b.hatena.ne.jp/
// ==/UserScript==
(function(){
	var d = document;
	var tagsParent = d.getElementById('related-tags');
	if(! tagsParent){
		return;
	} 
	
	var tags = tagsParent.getElementsByTagName('li');
	if((! tags) || ! tags.length ){
		return;
	}
	
	var form = d.getElementById('tag-search-related-form');
	var input = form.getElementsByTagName('input')[0];
	input.addEventListener('keyup', function(e){
		for(var i = 0, n = tags.length; i < n; i++){
			tags[i].setAttribute('style', 'display:none !important');
		}
	}, true);
})();

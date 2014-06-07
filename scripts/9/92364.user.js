// ==UserScript==
// @name          NEWikipedia Linky
// @namespace     http://whym.org
// @description	  add a link navigating users from Wikipedia to NEWikipedia, a variant of the English Wikipedia annotated with gloss in Japanese.
// @include       http://*.wikipedia.org/w*
// ==/UserScript==

(function(){
	 var extract_lang_title = function(url){
		 var m = /http:\/\/([a-z]+).wikipedia.org\/wiki\/(.+)/.exec(url);
		 if ( m == null ) {
			 m = /http:\/\/([a-z]+).wikipedia.org\/w\/.*title=([^\&]+)/.exec(url);
		 }
		 return { 'lang' : m==null? null: m[1],
				  'title': m==null? null: m[2] };
	 };
	 var insertplace = document.getElementById('contentSub');
	 if (!insertplace) {
		 return;
	 }
	 var m = extract_lang_title(document.location.href);
	 if ( m.lang != null  &&  m.lang != 'en' ) {
		 var enlink = document.getElementsByClassName('interwiki-en')[0];
		 if ( enlink ) {
			 m = extract_lang_title(enlink.childNodes[0].getAttribute('href'));
		 } else {
			 return;
		 }
	 }
	 if ( m.title == null ) {
		 return;
	 }
     var links = [
         ['この項目を辞書つき英語版で読む (NEWikipedia)',     'http://en.newikipedia.org/wiki/' + m.title]
     ];
     var linkstr = '';
     links.forEach(function(node, i, array) {
		 linkstr += '<p style="text-align: right;"><a href="'+node[1]+'">'+node[0]+'</a></p>';
	 });
     insertplace.innerHTML += linkstr;
})();

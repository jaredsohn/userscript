// ==UserScript==
// @name           sorame twitter
// @namespace      http://d.hatena.ne.jp/nyubachi/
// @include        *
// @exclude        http://twitter.com/*
// @exclude        http://reader.livedoor.com/reader/*
// ==/UserScript==
(function(){
	document.body.innerHTML = document.body.innerHTML.replace(/twitter/g , "ヒウィッヒヒー")
	.replace(/Twitter/g , "ヒウィッヒヒー");
})();

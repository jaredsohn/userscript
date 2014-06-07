// ==UserScript==
// @name           post ctrl click
// @namespace      d.hatena.ne.jp/arikui
// @include        *
// @require        http://gist.github.com/29681.txt
// ==/UserScript==

$X("//input[@type='text' or not(@type)]").forEach(function(element){
	if(element.form) element.addEventListener("click", function(e){
		if(e.ctrlKey)
			element.form.submit();
	}, false);
});

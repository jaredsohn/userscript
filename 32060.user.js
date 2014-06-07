// ==UserScript==
// @name         Blogger Showdown support
// @namespace    http://0slice.blogspot.com/
// @description  v0.1 - Initial version (fork of Blogger Markdown)
// @include	 http://*blogger.com/post-*
// @require      http://coder.md.docs.googlepages.com/showdown.js
// ==/UserScript==

/*

	Author: Alexandr "LMZ" F., alexandr@debianmd.org
	Date:   2008-08-18

	Big thanks goes to http://themblsha.ya.ru/

*/

GM_addStyle(
	'span#htmlbar_Markdown, span#htmlbar_Syntax { '+
	'	font-size: 95% !important; '+
	'	margin-right: 3px; '+
	'	padding: .1em .2em 0 .1em; '+
	'	border-bottom: 1px solid #00c; '+
	'	color: #00c; '+
	'}'
);

function restoreOldMarkdownText(some_value) {
		var regexp = new RegExp('\<\!--\\[markdown\\]\n((?:.*\n)*)--\>', 'i');
		var result = some_value.match(regexp);
		if (result) {
			return result[1];
		}
		else {
			// TODO: convert from HTML to Markdown?
			return some_value;
		}
	};

unsafeWindow.addEventListener('load', function(){
	var ta = document.getElementById('textarea');
        var rich_edit_div = document.getElementById('RichEdit');
	var htmlbar = document.getElementById('htmlbar');
	var previewAction = document.getElementById('htmlbar_PreviewAction');

	if (ta && htmlbar && previewAction && rich_edit_div) {
		var mdBtn = document.createElement('span');
		mdBtn.setAttribute('id', 'htmlbar_Markdown');
		mdBtn.setAttribute('onmouseover', 'ButtonHoverOn(this)');
		mdBtn.setAttribute('onmouseout', 'ButtonHoverOff(this)');
		mdBtn.innerHTML = 'Markdown';
		mdBtn.addEventListener('click', function(){
			var converter = new Showdown.converter();
			ta.value = converter.makeHtml(ta.value);//Markdown(ta.value);
		}, false);
		htmlbar.insertBefore(mdBtn, previewAction);

		var syntaxBtn = document.createElement('span');
		syntaxBtn.setAttribute('id', 'htmlbar_Syntax');
		syntaxBtn.setAttribute('onmouseover', 'ButtonHoverOn(this)');
		syntaxBtn.setAttribute('onmouseout', 'ButtonHoverOff(this)');
		syntaxBtn.innerHTML = 'Syntax';
		syntaxBtn.addEventListener('click', function(){
			GM_openInTab('http://daringfireball.net/projects/markdown/syntax');
		}, false);
		htmlbar.insertBefore(syntaxBtn, previewAction);

		previewAction.addEventListener('mousedown', function(){
			setTimeout(function(){
				var converter = new Showdown.converter();
				unsafeWindow.document.getElementById("previewbody").innerHTML = converter.makeHtml(ta.value);//Markdown(ta.value);
			}, 100);
		}, false);

                var md_textarea = document.createElement('textarea');
                md_textarea.value = restoreOldMarkdownText(ta.value);
                ta.parentNode.insertBefore(md_textarea, ta);
                md_textarea.addEventListener('keyup', function()
                {
                    var converter = new Showdown.converter();
                    ta.value = converter.makeHtml(md_textarea.value)+'\n\n<!--[markdown]\n' + md_textarea.value + '\n-->';
                }, false);
	}
}, false);
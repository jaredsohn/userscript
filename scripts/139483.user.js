// ==UserScript==
// @name        douban read editor enhanced
// @namespace   j
// @include     http://read.douban.com/article/create_by_steps?aid=*step=3
// @include     http://*.intra.douban.com:*/article/create_by_steps?aid=*step=3
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     2
// ==/UserScript==
$(function(){
	var tmpl = $("#tmpl-editor");
	tmpl.text(tmpl.text().replace(
		"<a href=\"#\" class=\"icon-emphasize-dark\">插入着重</a>", 
		"<a href=\"#\" class=\"icon-emphasize-dark\">插入着重</a>" +
		"<a href=\"#\" class=\"j-remove-blank\">除白</a>" +
		"<a href=\"#\" class=\"j-punc-chn2eng\">中标-&gt;英标</a>"
		));
	$("body").delegate("a.j-remove-blank", "click", function(){
		var editor_area = $(".part-editor .part-area")
		editor_area.val(editor_area.val().replace(/ /g, ""));
	});
	$("body").delegate("a.j-punc-chn2eng", "click", function(){
		var editor_area = $(".part-editor .part-area")
		var s = editor_area.val();
		s = s.replace(/[“”]/g, "\"");
		s = s.replace(/[‘’]/g, "'");
		s = s.replace(/，/g, ",");
		s = s.replace(/ +,/g, ",");
		s = s.replace(/([,|.])([^ "'])/g, "$1 $2");
		editor_area.val(s);
	});
})

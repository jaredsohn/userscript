// ==UserScript==
// @name		jNP Ace editor
// @require		http://ajaxorg.github.com/ace-builds/src-min/ace.js
// @author		Milan K.
// @include		http://edit.beta.annonce.cz/edit/*
// @version		1.1
// ==/UserScript==

(function(){
	var editor;

	$('#assetTemplateEditor .minimus').append('<div id="editor">EDITOR</div>');
	
	editor = ace.edit("editor");
    editor.setTheme("ace/theme/lazy_fingers");
    editor.getSession().setMode("ace/mode/html");
})();	


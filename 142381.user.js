// ==UserScript==
// @name		jNP Blackhole Theme
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// @require		file:///C:/grease_monkey/ace/ace.js
// @resource	css_file file:///C:/grease_monkey/jnp_blackhole_theme.css
// @author		Milan K.
// @include		http://edit.beta.annonce.cz/edit/*
// @version		1.0
// ==/UserScript==

$(document).ready(function(){
	var css = GM_getResourceText(css_file), editor;
	$('head').append('<style type="text/css">' + css_file + '</style>');
	
	// Ace editor
	$('#assetTemplateEditor .minimus').append('<div id="editor">EDITOR</div>');
	alert('ok');
	
	editor = ace.edit("editor");
    editor.setTheme("ace/theme/lazy_fingers");
    editor.getSession().setMode("ace/mode/html");
});
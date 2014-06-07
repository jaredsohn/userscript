// ==UserScript==
// @name        ACE Stylesheet editor
// @namespace   http://nitrolinken.net
// @description Replaces reddit's stylesheet textarea with ACE editor. http://ace.ajax.org/
// @include     http*://*.reddit.com/r/*/about/stylesheet
// @version     1.2.1
// @grant		none
// ==/UserScript==

//--- Sweet mama of little helpful things when working with Chrome.
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js", function(){
	// first, set some styles, add the editor div and make sure we take the text too.
	$('#stylesheet_contents').css('visibility','hidden').css('min-height', '800px');
	$('#subreddit_stylesheet .sheets .col:first-child').css("position", "relative");
	$('<div/>', {
		id: 'editorACE',
		style: 'display:block;height:100%;width:100%;background-color:#fff;',
		text: ($('#stylesheet_contents').val())
	}).prependTo('#subreddit_stylesheet .sheets .col:first-child');
	
	// initiate the editor, oh so elegantly (ah fuck, I really shouldn't take a hiatus from programming)
	ACEEditor = ace.edit("editorACE");
	ACEEditor.getSession().setMode("ace/mode/css");
	
	// want to change the theme? https://github.com/ajaxorg/ace/tree/master/lib/ace/theme
    ACEEditor.setTheme("ace/theme/chrome");
	
	// this is what we do when a user submits. surely the user would like to actually use the editor window, no?
	$('#subreddit_stylesheet button').click(function () {
		$("#stylesheet_contents").val(ACEEditor.getValue());
	});

});

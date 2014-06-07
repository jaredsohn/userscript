// ==UserScript==
// @name	   Autobrowse Manga
// @namespace      http://jess-mann.com
// @description    Autobrowse manga.animea.com
// @include	   http://manga.animea.net/*
// @require	   https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require	   https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js
// 
// ==/UserScript==

$(document).ready(function() {
	var duplicate = /tobemoved\/do/.test(location.href);

	if (!duplicate) {
		var time = GM_getValue('time',20);
		var added = false;
		var dialogOpen = false;

		function addStyles() {
			if (!added) {
				$('head').append('<link rel="stylesheet" href="http://jqueryui.com/css/base.css" type="text/css" media="all" /> <link rel="stylesheet" href="http://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" type="text/css" media="all" /> <link rel="stylesheet" href="http://static.jquery.com/ui/css/demo-docs-theme/ui.theme.css" type="text/css" media="all" />');
			}
			added = true;
		}
	
		function settings() {
			dialogOpen = true;
			addStyles();
			$('<form><h1 style="font-size:13px">Seconds before cycling to next page</h1><input id="GMtime" type="text" value="'+time+'" /><br /><button id="GMsave" value="Save" >Save</button></form>').dialog();
			$('#GMsave').click(function(e) {
				e.preventDefault();
				time = $('#GMtime').attr('value');
				GM_setValue('time',time);
				window.setTimeout(cycle,time * 1000);
				dialogOpen = false;
				alert('Saved');
			});
		}

		GM_registerMenuCommand( "Autobrowse Settings", settings, "m", "control", "s" );

		function cycle() {
			$('input.backnext[value=Next]').first().click();
		}
	
		window.setTimeout(cycle,time * 1000);
	}
});
// ==UserScript==
// @name           Wiki rename filter
// @namespace      sl
// @include        https://prj.slweb.ru/projects/*/wiki/*/rename
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.js
// ==/UserScript==

var jqP			= $('div.box').children('p');
var jqSelectOr	= jqP.eq(2).children('select');

jqP.eq(1).after('<p><label for="wiki_page_rename_filter">Фильтр</label><input type="text" id="wiki_page_rename_filter" size="50">&nbsp;<a href="#" id="clearFilter" style="border-bottom: 1px dashed #333; color: #333;">очистить</a></p>');

$("#wiki_page_rename_filter").keyup(function(e){
	var jqSelect	= jqSelectOr.clone();
	var sVal	= $(this).val();
	
	if ( sVal != '' ) {
		jqSelect.children('option').each(function(){
			var sTxt	= $(this).text();
			if ( sTxt.indexOf( sVal, 0 ) == -1 ) {
				$(this).remove();
			}
		});
	}
	jqP.eq(2).children('select').remove();
	jqP.eq(2).append( jqSelect );
});

$("#clearFilter").click(function(){
	$("#wiki_page_rename_filter").val("");
	jqP.eq(2).children('select').remove();
	jqP.eq(2).append( jqSelectOr );
	return false;
});
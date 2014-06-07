// ==UserScript==
// @name           SnagFilms
// @namespace      obsidience
// @description    Adds a "maximize video" button to the page.
// @include        http://*.snagfilms.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js
// ==/UserScript==

$.fn.outerHTML = function()
{
	var doc = this[0] ? this[0].ownerDocument : document;
	return $('<div>', doc).append(this.eq(0).clone()).html();
};

maximizeVideo = function()
{


	$('body').append("<div id='videoDialog' title='" + $('#video_title').text() + "' class='ui-dialog-content ui-widget-content' style='text-align: center;'>" + $('#myExperience').outerHTML().replace('myExperience', 'maximizedExperience').replace(/383/g, ($(window).height() - 70)).replace(/600/g, ($(window).width() - 70)) + "</div>");
	$('#myExperience').remove();
	$('#videoDialog').dialog({ draggable: true, modal: true, position: ['top','center'], width: ($(window).width()-30), height: ($(window).height()-20) });
	$('#videoDialog').moveToTop();
}

$('head').append("<link href='http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/base/jquery-ui.css' rel='stylesheet'>");
$('#bm').width('100%');
$('#bm').prepend("<tr><td colspan='3' align='right'><input id='btnMaximizeVideo' type='button' value='Maximize Video' style='background-color: #466FAA; color: #FFF; padding: 4px; font-size: 1em; font-weight: bold; border-left: 1px solid #E0E6EF; border-top: 1px solid #E0E6EF; border-right: 1px solid #062D70; border-bottom: 1px solid #062D70; margin-bottom: 8px;' /></td></tr>");
$('#btnMaximizeVideo').click(function() { maximizeVideo(); });

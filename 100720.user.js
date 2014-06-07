// ==UserScript==
// @name           pr0nsite-dlhelper
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      klondike42
// @description    Displays a link panel for clip download from "other" sources
// @include        http://www.brazzers.com/*
// ==/UserScript==

var div = $('<div>');
var link = $('<a>');

div.attr('id', 'ochpanel');
div.css({position: 'fixed', left: '10px', top: '50px', backgroundColor: '#ffffff', padding: '5px'});
div.append(link);

var $divparent = $('.site_wrapper').prepend(div);

var $displayname = new Array('Filestube');
var $queries = new Array('http://www.filestube.com/search.html?q={q}&select=mp4');				

var $cliptitle = $('#title').val();
var $actress = $('.featuring').eq(0).text();

var $querycontent = escape('"' + $actress.replace(' ', '+') + '"+' + '"' + $cliptitle.replace(' ', '+') + '"'); 

link.text('Filestube');
link.attr('href', $queries[0].replace('{q}', $querycontent));
link.attr('target', '_blank');
link.css({color: '#000000', fontSize: '9px', fontWeight: 'bold'});
div.append(link);
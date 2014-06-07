/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  Multiply - Delete Multiple items
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Delete multiple items on your Multiply Site
// @version	  0.1
// @include	  http://*.multiply.com/journal
// @include	  http://*.multiply.com/journal?*
// @include	  http://*.multiply.com/music
// @include	  http://*.multiply.com/music?*
// @include	  http://*.multiply.com/links
// @include	  http://*.multiply.com/links?*
// @include	  http://*.multiply.com/reviews
// @include	  http://*.multiply.com/reviews?*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

const DEBUG = true;
var debug = DEBUG ? function(str) {GM_log(str);} : function(s) {};

if (!document.getElementById('maincontent')) {
    debug('not on content page.');
    return;
}

/*
 * Integrate jQuery first
 * (snippet from http://joanpiedra.com/jquery/greasemonkey/)
 */

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    var items = $('.litemactions .mine:odd')
	.map(function(){
		 var item_head = $(this.parentNode.parentNode.previousSibling.previousSibling);
		 var subject = item_head.find('.cattitle a[rel="bookmark"]').text();
		 var posted = item_head.find('.itemsubsub nobr').text().replace(/ \d?\d:\d\d [AP]M/, '');
		 var delete_link = this.href.match(/"(\/.*?delete-item.*)"/)[1];
		 return [subject, posted, delete_link];
	     });
    if (!items || items.length == 0) {
	debug('nothing to delete');
	return;
    }

    debug(items.length + ' items with delete links found on this page');

    add_multi_delete_link(items);
    debug('Multi-Delete link added.');
}

function add_multi_delete_link(items) {
    $('#maincontent').append('<div id="multi-delete-link"><a class="select">Select items on this page to delete</a></div>');
    $('#multi-delete-link').css({padding: '5px 2px', cursor: 'pointer'}).click(function() {show_delete_all(items)});
}

function show_delete_all(items) {
    if ($('#multi-delete-menu').size() > 0) {
	debug('menu already created');
	$('#multi-delete-menu').show();
	return;
    }

    $(document.body).css('position', 'relative').append('<div id="multi-delete-menu"><div id="multi-delete-buttons"></div><table id="multi-delete-items"></table></div>');

    $('#multi-delete-buttons').append('<button id="multi-delete-btn">Delete selected items</button> <button id="multi-delete-cancel-btn">Cancel</button>');
    $('#multi-delete-btn').click(delete_selected_items);
    $('#multi-delete-cancel-btn').click(function() {$('#multi-delete-menu').hide()});

    var menu = $('#multi-delete-menu');

    var css = {
	'z-index': 99999,
	position: 'fixed',
	border: '2px solid #8b8',
	'-moz-border-radius': '5px',
	padding: '10px',
	'background-color': '#ffe'
    };
    menu.css(css);
    $.each(items, function(i, item) {
	       var cb_id = 'multi-delete-item-' + i;
	       var checkbox = '<td><input type="checkbox" id="' + cb_id + '"></input></td>';
	       var subject = '<td>' + item[0] + '</td>';
	       var posted = '<td>(' + item[1] + ')</td>';
	       $('#multi-delete-items').append('<tr>' + checkbox + subject + posted + '</tr>');

	       $('#' + cb_id).attr('delete_link', item[2]);
	       $('#' + cb_id).click(function() {
				     if (this.checked)
					 $(this).parent().parent().addClass('selected');
				     else
					 $(this).parent().parent().removeClass('selected');
				 }
				 );
	   }
	   );

    $('#multi-delete-items').find('tr').find('td:first').width(60).css('text-align', 'center');
    $('#multi-delete-items').find('tr').find('td').css('white-space', 'nowrap');

    var width = Math.min(menu.width(), 500);
    var height = Math.min(menu.height(), 500);
    debug('width |' + width + '|, height |' + height + '|, w.width |' + window.innerWidth + '|, w.height |' + window.innerHeight + '|, left |' + ((window.innerWidth - width) / 2) + '|, top |' + ((window.innerHeight - height) / 2) + '|');
    menu.css({
	overflow: 'auto',
        width: width,
	height: height,
        'min-width': '300px',
	'min-height': '150px',
	left: ((window.innerWidth - width) / 2 - 50) + 'px',
	top: ((window.innerHeight - height) / 2  - 100) + 'px'
	});

    GM_addStyle('#multi-delete-items .selected { background-color: #558eca; color: #edebd5; font-weight: bold; }');
    GM_addStyle('#multi-delete-buttons { text-align: center; margin: 5px 5px 10px 5px; }');
}

function delete_selected_items(item) {
    if (!$('#multi-delete-menu input:checkbox').is(':checked')) {
	alert('Select items you want to delete');
	return;
    }

    $('#multi-delete-menu input:checkbox').filter(':checked').each(function(i) {delete_item(this);});

    $('#multi-delete-btn').unbind("click", delete_selected_items);
    $('#multi-delete-btn').text("Close");
    $('#multi-delete-btn').bind("click", function() {document.location.href = ''});

    $('#multi-delete-cancel-btn').hide();
}

function delete_item(item) {
    var delete_link = $(item).attr('delete_link');
    debug('delete_item: ' + item.id + '|' + delete_link);
    if (delete_link) {
	var id = item.id;
	$(item).replaceWith('<div id="' + id + '">Deleting...</div>');
	var params = {
	    type: "GET",
	    url: delete_link,
	    success: function() { $('#' + id).text('Deleted').css('color', 'yellow'); },
	    error: function() { $('#' + id).text('Error').css('color', 'red'); },
	}
	$.ajax(params);
    }
}

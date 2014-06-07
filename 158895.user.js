// ==UserScript==
// @name           LandGrab compact board view
// @namespace      landgrab_board_compact
// @include        http://landgrab.net/landgrab/ViewBoard*
// @include        http://www.landgrab.net/landgrab/ViewBoard*
// @include        http://landgrab.net/landgrab/RealtimeBoard*
// @include        http://www.landgrab.net/landgrab/RealtimeBoard*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
/**
 * A script to reposition player info table
 * @author Zilverdistel <info@zilverdistel.be>
 * @license Use it if you like it
 */
// Elements we are manipulating:
var image = $('img#visible_map_image');
var image_container = $('div#imgdiv');
var stats = $('.data_tables_table');

// Get the dimensions of the board image.
var image_width = parseInt($(image).attr('width'));

// Get the container dimensions.
var image_container_width = parseInt($(image_container).width());
var image_container_height = parseInt($(image_container).outerHeight());

// Calculate the width and the position to the left of the right sidebar.
var sidebar_right_width = image_container_width - image_width - 20;
var sidebar_right_position_left = image_width + 10;

// Calculate the position to the top of the right sidebar.
var elements_height = 0;
var elements = $(image_container).nextUntil(stats).not('script');
$(elements).each(function(i){
    elements_height += parseInt($(this).outerHeight());
});
var sidebar_right_position_top = - image_container_height - elements_height;

// Set the styles.
// Put the game stats in the right sidebar.
$(stats).css({
	'position': 'relative',
	'top': sidebar_right_position_top + 'px',
	'left': sidebar_right_position_left + 'px',
	'width': sidebar_right_width + 'px',
});
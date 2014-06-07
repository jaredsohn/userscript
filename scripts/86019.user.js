// ==UserScript==
// @name           Megavideo Full Screen
// @namespace      info@vermont-web-design.com
// @description    Wordpress Plugin to open Megavideo Full Screen in a New Window.
// @include        http://megavideopop.com

// DELETE EVERYTHING ABOVE PHP BEFORE INSTALL
// ==/UserScript==


<?php
/*
Plugin Name: Megavideo Full Screen
Version: 1.0
Plugin URI: http://megavideopop.com/?page_id=2196
Author: vermontwebdesign
Author URI: http://megavideopop.com
Description: Open Megavideo Full Screen in a New Window. Just use [mega]paste Megavideo url here[/mega] and it will create a link to open the Megavideo video full screen in a new window, in the Megavideo player.
*/

/*  Copyright 2010  MegaVideoPop  (email : info@vermont-web-design.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

function mvfs1_function ($mvfs1) {
 $mvfs1 = str_replace('[mega]','<a href="', $mvfs1);
 return $mvfs1;
}

add_filter('the_content', 'mvfs1_function');

function mvfs2_function ($mvfs2) {
 $mvfs2 = str_replace('http://www.megavideo.com/?v=','http://wwwstatic.megavideo.com/mv_player.swf?v=', $mvfs2);
 return $mvfs2;
}

add_filter('the_content', 'mvfs2_function');

function mvfs3_function ($mvfs3) {
 $mvfs3 = str_replace('[/mega]','" target="_blank">Watch Now</a>', $mvfs3);
 return $mvfs3;
}

add_filter('the_content', 'mvfs3_function');

?>
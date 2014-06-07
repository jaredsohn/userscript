// ==UserScript==
// @name  Add 'Home' to menu across top of site??
// @description eRepublik hrvatski prijevod
// @include http://www.erepublik.com/*
// ==/UserScript==

// Filter wp_nav_menu() to add additional links and other output
function new_nav_menu_items($items) {
	$homelink = '<li class="home"><a href="' . home_url( '/' ) . '">' . __('Home') . '</a></li>';
	$items = $homelink . $items;
	return $items;
}
add_filter( 'wp_nav_menu_items', 'new_nav_menu_items' );
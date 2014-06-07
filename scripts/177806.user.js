// ==UserScript==
// @name        Random Kitty
// @namespace   http://thenathang.com
// @description Random cats for the Bukkit forums!
// @include     http://forums.bukkit.org/*
// @include     http://bukkit.org/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

$(".visitorPanel").after('<div class="section"><div class="secondaryContent"><h3>Random Kitty</h3><img src="http://thecatapi.com/api/images/get?format=src&amp;type=gif&amp;size=small"></div></div>');

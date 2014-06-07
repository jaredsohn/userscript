// ==UserScript==
// @name           Virgo for Wikidi.com
// @description    Adds guidance texts into search box on Wikidi.com.
// @namespace      https://github.com/spaceboy
// @include        http://wikidi.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://raw.github.com/spaceboy/jqVirgo/master/jqVirgo.js
// ==/UserScript==

GM_addStyle('input.virgo {color: #ccc !important; font-style: italic; }');

$('#inp_phrase').inputVirgo({
  'textLabel': 'Global search...'
});
$('#searchInCategoryForm input[name=phrase]').inputVirgo({
  'textLabel': 'Search in category...'
});
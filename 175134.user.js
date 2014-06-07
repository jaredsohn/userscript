// ==UserScript==
// @name        BukkitOP
// @namespace   http://hawkfalcon.com
// @description Add OP to original poster name
// @include     http://forums.bukkit.org/*
// @version     1
// ==/UserScript==
var $name = $('#pageDescription .username').text();
$('.author:contains(' + $name + ')').prepend('<strong style="color:red">[op] </strong>');
$('.userText::contains(' + $name + ')').append('<span class="userrankplugindev">Original Poster</span>');

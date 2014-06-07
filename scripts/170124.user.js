// ==UserScript==
// @name        GosuGamersFixer
// @namespace   GosuSucks
// @include     http://www.gosugamers.net/dota/replays
// @version     1
// ==/UserScript==
$("#replays tr").each(function(){var self = $(this);self.find

("td").each(function(){$(this).html("<a href='" + self.attr('data-

href')+"'>"+$(this).html()+"</a>");});});
// ==UserScript==
// @name           Bazaar.tf BBcode
// @namespace      http://www.tf2calculator.com
// @version        1.6
// @description    whoa
// @include        http://bazaar.tf/thread/*
// @include        http://bazaar.tf/board/*
// @include        http://bazaar.tf/trade/*
// @include        http://bazaar.tf/profiles/*
// @include        http://bazaar.tf/id/*
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @run-at         document-end
// ==/UserScript==
$(document).ready(function() {
    $('head').append('<script type="text/javascript">function youTube() { var link = prompt("Please enter your youtube url", "http://www.youtube.com/watch?v=bP-1f7HhMzc"); var myarr = link.split("="); var newLink = myarr[1]; if (typeof newLink === "undefined"){ var newLink = link; } format("#message", "[youtube]" + newLink, "[/youtube]"); }</script>');
    $('.bbcode').append('<a href="javascript:void(0);" style="margin-right:3px;" class="btn btn-inverse hans btn-small" onclick="youTube();return false;" tabindex="9999" data-original-title="Youtube"><i class="icon-film"></i></a>');
    $('.bbcode').append('<a href="javascript:void(0);" style="margin-right:3px;" class="btn btn-inverse hans btn-small" onclick="format(\'#message\',\'[code]\',\'[/code]\'); return false;" tabindex="9999" data-original-title="Code"><i class="icon-code"></i></a>');
    $('.bbcode').append('<a href="javascript:void(0);" style="margin-right:3px;" class="btn btn-inverse hans btn-small" onclick="format(\'#message\',\'[quote=]\',\'[/quote]\');" tabindex="9999" data-original-title="Quote"><i class="icon-quote-right"></i></a>');
    $('.bbcode').append('<a href="javascript:void(0);" style="margin-right:3px;" class="btn btn-inverse hans btn-small" onclick="format(\'#message\',\'[greentext]\',\'[/greentext]\'); return false;" tabindex="9999" data-original-title="Greentext"><i class="icon-chevron-right" style="color:green"></i></a>');
    $('.hans').tooltip();
});
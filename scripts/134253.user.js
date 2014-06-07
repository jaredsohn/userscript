// ==UserScript==
// @name           Script 1
// @namespace      Script
// @description    ah re loco
// @include        http://www.taringa.net/*
// ==/UserScript==
var $ = unsafeWindow.$, jQuery = $;
if (window.location.href.split('/')[4] == 'mi' && window.location.href.split('/')[5].length == 4){
	$('#comment-button-text').after('<button tabindex="2" class="btn g" onclick="$(\'#body_comm\').html(\'La concha de tu madre.\');add_reply_shout(this);" data-sizelimit="body_comm">La concha de tu madre</button>')
}
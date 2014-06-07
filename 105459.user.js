// ==UserScript==
// @name           FFXIAH Character Box
// @description    Adds a box to select an alternate character, taking you to that character's page.
// @namespace      blerg
// @include        http://www.ffxiah.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery;
User = unsafeWindow.User;
newhtml = '<select id="gscript-char-sel" class="combo" name="char-select" style="width:120px;font-size:12px;margin-top:3px;">'+"\n";
newhtml += "<option>Go to Character...</option>\n";
$.each(User.chars, function(idx, chr) {
	newloc = 'http://www.ffxiah.com/player/'+chr.server_name+'/'+chr.char_name;
	newhtml += '<option onClick="window.location=\''+newloc+'\';">'+chr.server_name+'.'+chr.char_name+'</option>'+"\n";
});
newhtml += '</select>'+"\n";
$('#server-select').append(newhtml);



// ==UserScript==
// @name           GaiaOnline Cell Phone Nagging Remover
// @namespace      http://userscripts.org/users/4699
// @description    Removes the cell phone nagging box from PMs.
// @include        http://*gaiaonline.com/profile/privmsg*
// ==/UserScript==
if(document.getElementById('friend_box'))
{
	document.getElementById('friend_box').style.display='none';
}
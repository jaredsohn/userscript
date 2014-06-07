// ==UserScript==
// @name           See larger avatars
// @author         amareus
// @namespace      http://what.cd
// @description    See larger avatars by clicking
// @include        http://*what.cd/forums.php?*
// @include        https://*what.cd/forums.php?*
// ==/UserScript==

var avatars = document.getElementsByClassName('avatar');
for (var i = 0; i < avatars.length; i++) {
	avatar = avatars[i].getElementsByTagName('img')[0];
	avatar.title = avatar.src;
	avatar.addEventListener('click', function() { this.setAttribute('width', this); }, true);
	avatar.addEventListener('mouseout', function() { this.setAttribute('width', '150'); }, true);
}
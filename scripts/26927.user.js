// ==UserScript==
// @name          Use OpenID for Blogger Comments
// @namespace     http://aaronhockley.com
// @description   Selects the OpenID identity option by default when leaving a comment on a Blogger blog
// @include       http://www.blogger.com/comment.g*
// @include		  https://www.blogger.com/comment.g*
// ==/UserScript==
function elid(iden)
{
	return document.getElementById(iden);
}

elid('google').style.display = 'none';
elid('openid').style.display = '';
elid('nickname').style.display = 'none';
elid('iden-openid').checked = true;
elid('openIdDropDown').value = 'openid';
// ==UserScript==
// @name           FrEe-hAcK THX button mover
// @namespace      big earl
// @description    Jabber:	bigearl@jabber.ccc.de
// @description    ICQ:		226722385
// @description    MSN:		bigearl@live.de
// @include        http://free-hack.com/*
// ==/UserScript==

function moveButton()
{
	var obj = document.getElementsByTagName('td');
	for ( var i = 0; i < obj.length; i++ )
	{
		if ( obj[i].id.substr(0, 8) == 'td_post_' )
		{
			var postId = obj[i].id.substr(8);
			var postTop = obj[i].getElementsByTagName('div')[0].appendChild(document.createElement('div')); postTop.setAttribute('align', 'right');
			var oldButton = document.getElementById('post_thanks_button_' + postId);
			oldButton.parentNode.removeChild(oldButton);
			var newButton = postTop.appendChild(document.createElement('a'));
			newButton.id = oldButton.id; newButton.setAttribute('rel', oldButton.getAttribute('rel')); newButton.setAttribute('onclick', oldButton.getAttribute('onclick')); newButton.href = oldButton.href; newButton.innerHTML = oldButton.innerHTML;
		}
	}
}

moveButton();
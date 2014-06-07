// ==UserScript==
// @name        MPNotif
// @description Change le titre quand vous recevez un MP sur JVC
// @include     http://www.jeuxvideo.com/*
// @version     1.0.0
// ==/UserScript==

function checkMP()
{
	// Detecte un message privé
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var messages = xmlhttp.responseText.split(':')[1][0];
			if(messages > 0)
			{
				// Action lorsque messages privés > 0
				// Change le titre
				document.title = "[MP] " + messages;
			}
		}
	}
	xmlhttp.open('GET', 'http://www.jeuxvideo.com/messages-prives/get_message_nonlu.php', true);
	xmlhttp.send();
}

// Check les MP toutes les 60 secondes
checkMP();
window.setInterval(checkMP(), 60000);
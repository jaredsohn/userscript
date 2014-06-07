// ==UserScript==
// @name           ViadeoUserProfil
// @namespace      viadeo
// @include        http://www.viadeo.com/monreseau/consultation/*
// ==/UserScript==
var card = document.getElementsByClassName('user-card');
for(i=0;i<card.length;i++)
{
	var avatar = card[i].getElementsByClassName('avatar-frame');
	if(typeof(avatar[0])!='undefined')	{
		var lien = avatar[0].getElementsByTagName('a');

		if(typeof(lien[0])!='undefined')	{
			var img = lien[0].getElementsByTagName('img');

			if(typeof(img[0])!='undefined')
	{
				var url = img[0].src.split('?');
				var param = url[1].split('&');
				var membre = param[0].split('=');
				lien[0].href = "/profile/"+membre[1]; 
			}


		}

	}
}
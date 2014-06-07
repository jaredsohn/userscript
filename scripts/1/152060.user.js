// ==UserScript==
// @name          	laola1.at - Block comments of "nordtribüne"
// @namespace     	http://www.laola1.at
// @description   	Für alle die Nordtribüne's comments auf laola1.at einfach nicht mehr lesen können/wollen, blendet dieses Script diese einfach aus.
// @include       	http://www.laola1.at/*
// @grant       	none
// ==/UserScript==

window.setInterval(function()
{
	var comments_container = document.getElementById('comments')
	if( comments_container )
	{
		var comments = comments_container.childNodes;
		for (var i = 0; i < comments.length; i++) 
		{
			if (comments[i].firstChild.className == "user" && comments[i].firstChild.innerHTML == "Nordtribüne") 
			{
				comments[i].style.display = 'none'
			}
		}
	}
}, 3000);
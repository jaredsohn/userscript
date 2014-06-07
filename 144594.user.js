// ==UserScript==
// @name        TeamSnap Picture Keyboard Shortcut
// @description Navigate pictures on TeamSnap with keyboard shortcuts left/right arrow
// @include     http://go.teamsnap.com/*/files/view/*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener('keydown', TeamSnapPicNav, true);

function TeamSnapPicNav(key)
{
	// Right
	if(key.keyCode == 39 && (document.activeElement.nodeName != 'TEXTAREA' && document.activeElement.nodeName != 'INPUT'))
	{
		var navlinks = document.getElementsByTagName("a");
                for(var i = 0; i < navlinks.length; i++)
		{
			var childnodes = navlinks[i].childNodes;
			for(var j = 0; j < childnodes.length; j++)
			{
				if(childnodes[j].nodeName.toLowerCase() === 'img')
				{
					if(childnodes[j].alt == 'Btn-next')
					{
						location.href = navlinks[i];
					}
				}
			}
		}
	}

	// Left
	else if(key.keyCode == 37 && (document.activeElement.nodeName != 'TEXTAREA' && document.activeElement.nodeName != 'INPUT'))
	{
		var navlinks = document.getElementsByTagName("a");
                for(var i = 0; i < navlinks.length; i++)
		{
			var childnodes = navlinks[i].childNodes;
			for(var j = 0; j < childnodes.length; j++)
			{
				if(childnodes[j].nodeName.toLowerCase() === 'img')
				{
					if(childnodes[j].alt == 'Btn-prev')
					{
						location.href = navlinks[i];
					}
				}
			}
		}
	}
}

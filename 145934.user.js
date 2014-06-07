// ==UserScript==
// @name        Ogame change coord link on spio message 
// @namespace   benneb
// @description    change coord link on spio message in order to use middle click 
// @include     http://*.ogame.*/game/index.php?*page=messages*
// @version     1
// @updateURL      http://userscripts.org/scripts/source/145934.meta.js
// @downloadURL    https://userscripts.org/scripts/source/145934.user.js

// ==/UserScript==

function messages()
{
	if( ! document.getElementById("mailz") ) return ;

	var areas = document.getElementsByClassName("area");
	
	if( areas.length > 0 )
	{
		for( var a = 0 ; a < areas.length ; a++ )
		{

			if( areas[a].getElementsByTagName("a").length > 0 )
			{
				var linka = areas[a].getElementsByTagName("a")[0];
				
				/(\d*):(\d*):(\d*)/.exec(linka.textContent);
 				var galaxy = RegExp.$1;
 				var system = RegExp.$2;

				linka.href ="index.php?page=galaxy&galaxy="+galaxy+"&system="+system; 
			}

		}
		return;
	}
}
setInterval(messages, 1500)

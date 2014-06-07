// ==UserScript==
// @name           Scroll Over Flash Contents
// @namespace      http://userscripts.org/topics/3090#posts-11620
// @description    Sets embed's and object's wmode parameter to transparent, so the mouse can scroll over flash contents
// @include        *
// ==/UserScript==

(function ()
{
	nodeInserted();
})();

document.addEventListener("DOMNodeInserted", nodeInserted, false);

function nodeInserted()
{
	for (var objs = document.getElementsByTagName("object"), i = 0, obj; obj = objs[i]; i++)
	{
		if (obj.type == 'application/x-shockwave-flash')
		{
			var skip = false;
			for (var params = obj.getElementsByTagName("param"), j = 0, param; param = params[j]; j++)
			{
				if (param.getAttribute("name") == "wmode")
				{
					skip = true;
					break;
				}
			}
			if(skip) continue;
			var param = document.createElement("param");
			param.setAttribute("name", "wmode");
			param.setAttribute("value", "transparent");
			obj.appendChild(param);
		}
	}
	
	if (typeof document.embeds != 'undefined')
	{
		for (var ems = document.embeds, i = 0, em; em = ems[i]; i++)
		{
			if ((em.getAttribute('wmode') && em.getAttribute('wmode') == 'transparent')) continue;
			em.setAttribute('wmode', 'transparent');
			var nx = em.nextSibling, pn = em.parentNode;
			pn.removeChild(em);
			document.removeEventListener('DOMNodeInserted', nodeInserted, false);
			pn.insertBefore(em, nx);
			document.addEventListener("DOMNodeInserted", nodeInserted, false);
		}
	}
}

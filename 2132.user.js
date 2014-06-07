// ==UserScript==
// @name            WoW Forum Tweaks
// @namespace       tag:tardmrr@gmail.com,11-07-2005:WoWForumPreFix
// @description	A number of tweaks for the WoW Forums.
// @include         *forums.worldofwarcraft*
// ==/UserScript==

(function()
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = "pre br {display: none;}";
    head.appendChild(style);
    
    var tds = document.getElementsByTagName('td');

    for(i = 0; i < tds.length; i++)
    {
    		if(tds[i].getAttribute("background") == "/images-new/portraits/bliz.gif")
		{
               if(tds[i].parentNode.parentNode.parentNode.parentNode.getElementsByTagName('a')[0].innerHTML == "slouken")
               {
				tds[i].setAttribute("background", "http://img373.imageshack.us/img373/3332/slouken0gx.gif");
			}
		}

    }
})();

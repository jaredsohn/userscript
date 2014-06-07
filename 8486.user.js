// ==UserScript==
// @name           Gmail Lite
// @namespace      http://tepper.pl/gmail-lite
// @description    Gmail Lite - no adds, no footer, no starred items, no chats (revision 6)
// @include        http://*mail.google.com/*
// @include        https://*mail.google.com/*
// ==/UserScript==

function setCss(css)
{
	if (typeof GM_addStyle != 'undefined')
	{
		GM_addStyle(css);
	}
	else if (typeof addStyle != 'undefined')
	{
		addStyle(css);
	}
	else
	{
		var heads = document.getElementsByTagName('head');
		if (heads.length > 0)
		{
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = css;
			heads[0].appendChild(style);
		}
	}
}

function glStatic()
{
	setCss(
		'#fi {height: 1ex;} ' +
		'#rh {width: 100px !important; float: right !important; height: 200px !important;} ' +
		'div[class^=rh] {display: none !important;} ' + 
		'#ds_starred, #ds_chats {display: none;} ' +
		'#ft div, .msr {display: none !important;} ' +
		'#ft .fq {display: block !important; position: absolute; width: 170px; top: 49px; left: 160px; font-size: 80%;} ' +
		'.tlc col[class="cc"] + col, .sc {width: 0px !important;}'
	);
	
	/* Top of the message list */
	var selectAll = document.getElementById('sl_s');
	if (selectAll)
	{
		var selects = selectAll.parentNode.innerHTML.split(',');
		/* Remove starred/unstarred */
		selects.pop();
		selects.pop();
		
		selectAll.parentNode.innerHTML = selects.join(',');	
	}
	
	/* Bottom of the message list */
	var selectAll = document.getElementById('sl_s');
	if (selectAll)
	{
		selectAll.parentNode.innerHTML = '';
	}
	
	window.addEventListener('mousedown', function(e)
	{
		if (e.target.id == 'tam' || e.target.id == 'bam' || e.target.id == 'ctam' || e.target.id == 'cbam')
		{
			actions = e.target;
			actionsLength = actions.length;
			for (var i = actionsLength - 1; i >= 0; i--)
			{
				if (actions.options[i].value == 'st' || actions.options[i].value == 'xst')
				{
					actions.options[i] = null;
				}
			}
		}
	}, true);
}

function glDynamic()
{
	var windowWidth = window.innerWidth;
	setCss(
		'#fic {width: ' + (windowWidth - 444) + 'px !important;} ' +
		'#msgs {width: ' + (windowWidth - 304) + 'px !important;}'
	);
}

function glShortcut(event)
{
	if (event.target.id.substring(0, 3) == 'ta_' && event.ctrlKey == true && event.keyCode == 13)
	{
		var sendEvent = document.createEvent('MouseEvents');
		sendEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.getElementById('snd').dispatchEvent(sendEvent);
	}
}

glStatic();
glDynamic();
window.addEventListener('resize', glDynamic, false);
window.addEventListener('keypress', glShortcut, false);
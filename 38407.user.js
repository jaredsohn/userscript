// ==UserScript==
// @name           Filmtipset ForumPost Highlight
// @namespace      DScripts
// @include        http://www.filmtipset.se/forum.cgi*
// ==/UserScript==

function getUsername()
{
	var f = document.forms[0];
	var it = f.nextSibling;
	while(it)
	{
		if(it.nodeType == 1 && it.tagName == "DIV" && it.style.marginTop == '125px' && it.innerHTML.toLowerCase().indexOf('inloggad som') >= 0)
		{
			break;
		}
		it = it.nextSibling;
	}

	return it.getElementsByTagName('div')[0].getElementsByTagName('div')[0].innerHTML;
}

function start(first)
{
	/*
	Cookies funkade sådär =)
	var id = document.cookie.substring(document.cookie.indexOf('filmtipset=')+11, document.cookie.indexOf(',', document.cookie.indexOf('filmtipset=')));
	*/

	var username = getUsername();

	highlight(document.getElementsByClassName('headold'), username, first);
	highlight(document.getElementsByClassName('headnew'), username, first);
}
	
function highlight(arr, username, bind)
{
	var hC = getcolor('highlightColor');
	var tC = getcolor('textColor');
	var nC = getcolor('nameColor');

	for(i = 0; i < arr.length; i++)
	{
		var link = arr[i].getElementsByClassName('member')[0];
		if(link.innerHTML.toLowerCase() == username.toLowerCase())
		{
			arr[i].style.backgroundColor = hC;
			arr[i].style.color = tC;

			var links = arr[i].getElementsByTagName('a');
			for(x = 0; x < links.length; x++)
			{
				links[x].style.color = tC;
			}

			link.style.color = nC;

			if(bind)
			{
				var spans = arr[i].getElementsByTagName('span');
				var span = spans[spans.length-1];
				span.addEventListener('click', promptColor, false);
				span.style.cursor = 'pointer';
			}
		}
	}
}

function promptColor()
{
	var color = prompt('Vilken bakgrundsfärg vill du använda?', getcolor('highlightColor'));
	if(color)
	{
		setcolor('highlightColor', color);

		color = prompt('Vilken länkfärg (användarnamn) vill du använda?', getcolor('nameColor'));
		if(color)
		{
			setcolor('nameColor', color);

			color = prompt('Vilken textfärg (datum, svara, m.m.) vill du använda?', getcolor('textColor'));
			{
				setcolor('textColor', color);
			}
		}
	}

	start(false);
}

function getcolor(name)
{
	var color = (name == 'highlightColor') ? '#CFA8CF' : ((name == 'nameColor') ? '#1155EE' : '#000000');

	var val = GM_getValue(name);
	if(val)
		return '#'+ val;

	return color;
}

function setcolor(name, color)
{
	if(color[0] == "#")
		color = color.substring(1);

	if(color.length > 6)
		color = color.substring(0, 6);

	GM_setValue(name, color);
}


window.addEventListener('load', function() { start(true) }, false);
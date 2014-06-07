// ==UserScript==
// @name           deviantART Camera Data
// @author		   Onofrei Iulian http://revolt666.deviantart.com
// @namespace      http://userscripts.org/users/revolt
// @description    Moves the "Camera Data" section to the top of the sidebar
// @version        1
// @require        http://sizzlemctwizzle.com/updater.php?id=100134&days=1
// @include        http://*.deviantart.com/art/*
// @exclude        http://revolt666.deviantart.com/art/*
// ==/UserScript==

var i,div,title,brk=0;
var details = document.getElementsByTagName('div');

remove();

function move()
{
	for(i=0;i<=details.length-1;i++)
	{
		if(details[i].className == "ch-boxtop"&&details[i].lastChild.textContent.search("Camera Data") != -1)
		{
			var title = details[i].lastChild;
			var titleclone = title.cloneNode(true);
			var div = details[i].nextSibling;

			while(div.textContent.search(/Make:|Model:|Shutter Speed:|Aperture:|Focal Length:|ISO Speed:|Date Taken:/) == -1)
			{
				div = div.nextSibling;
			}

			var divclone = div.cloneNode(true);

			for(j=0;j<=details.length-1;j++)
			{
				if(brk == 1)
				{
					break;
				}
				else if(details[j].className == "stream")
				{
					details[j].parentNode.previousSibling.previousSibling.previousSibling.appendChild(titleclone).appendChild(divclone);
					brk = 1;
				}
			}
		}
	}

	title.parentNode.parentNode.removeChild(title.parentNode);
	div.parentNode.removeChild(div);

	var spans = document.getElementsByTagName('span');

	for(i=0;i<=spans.length-1;i++)
	{
		if(spans[i].textContent == "Shop For This Camera")
		{
			spans[i].parentNode.parentNode.parentNode.removeChild(spans[i].parentNode.parentNode);
		}
	}
}

function remove()
{
	var frames = document.getElementsByTagName('iframe');

	for(i=0;i<=frames.length-1;i++)
	{
		frames[i].parentNode.setAttribute('style',"visibility:hidden !important;");
		frames[i].parentNode.parentNode.removeChild(frames[i].parentNode);
	}
	for(i=0;i<=frames.length-1;i++)
	{
		frames[i].parentNode.setAttribute('style',"visibility:hidden !important;");
		frames[i].parentNode.parentNode.removeChild(frames[i].parentNode);
	}

	move();
}
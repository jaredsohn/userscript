// ==UserScript==
// @name           Owt Regym's normalcool remover
// @namespace      Normalcool remover
// @description    Gets rid of posts/topics with normalcool buzzwords
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// @include        http://boards.endoftheinter.net/topics*
// @include        https://boards.endoftheinter.net/topics*
// @include        http://endoftheinter.net/main.php
// @include        https://endoftheinter.net/main.php
// @exclude        http://boards.endoftheinter.net/topics/*?q=*
// @exclude        https://boards.endoftheinter.net/topics/*?q=*
// ==/UserScript==

// comma separated list of buzzwords. for example:
//var buzzwords = 'b confident :)), b urself :))';
//add below this line
var buzzwords = 'my gf,my girlfriend';

var d = 0;
var ignores = buzzwords.toLowerCase().split(',');
//for(var r = 0; r < ignores.length; r++)
//{
//	d = 0;
//	while(ignores[r].substring(d, d + 1) == ' ')
//	{
//		d++;
//	}
//	ignores[r] = ignores[r].substring(d,ignores[r].length);
//}
rmby(ignores);

if(window.location.href.indexOf("topics") == -1)
{
	document.addEventListener('DOMNodeInserted',
							function(e)
							{
								rm_livelinks(ignores, e);
							},
							false);
}

function rmby(ignores)
{
	var w = "" + window.location.href;
	if(w.indexOf("topics") || w.indexOf("main.php") != -1)
	{
		var g = document.getElementsByTagName('tr');
		var title;
		for(var i = 1; g[i]; i++)
		{
			if(g[i].getElementsByTagName('td')[0])
			{
				title = g[i].getElementsByTagName('td')[0];
				for(var f = 0; f < ignores.length; f++)
				{
						if(title.getElementsByTagName('a').item(0) && (title.getElementsByTagName('a').item(0).innerHTML.toLowerCase().indexOf(ignores[f])!=-1))
						{
							title.parentNode.style.display = 'none';
						}
				}
			}
		}
	}
	if(w.indexOf("showmessages") != -1)
	{
		var s;
		for(var j = 0; document.getElementsByClassName('message-body').item(j); j++)
		{
			s = document.getElementsByClassName('message-body').item(j);
			for(var f = 0; ignores[f]; f++)
			{
				if(s.getElementsByClassName('message').item(0).innerHTML.toLowerCase().indexOf(ignores[f])!=-1)
				{
					s.parentNode.style.display = 'none';
				}
			}
		}
	}
}

function rm_livelinks(ignores, el)
{
	try
	{
		var m = el.target.getElementsByClassName('message-body')[0];
		for(var f = 0; ignores[f]; f++)
		{
			if(m.getElementsByClassName('message')[0].innerHTML.toLowerCase().indexOf(ignores[f])!=-1)
			{
				m.parentNode.style.display = 'none';
			}
		}
	}
	catch(e){
	}
}
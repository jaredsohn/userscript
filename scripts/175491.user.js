// ==UserScript==
// @name		Tokyo Toshokan augment 2
// @namespace		gor
// @version		0.3a
// @include		http://www.tokyotosho.info/*
// @include		http://www.tokyo-tosho.net/*
// @include		http://www.tokyotosho.se/*
// @include		http://tokyotosho.info/*
// @include		http://tokyo-tosho.net/*
// @include		http://tokyotosho.se/*
// ==/UserScript==
// borrowed idea and part of the script from Xooo
// original script from Cthulhu
// adds [Torrent] button to all links to Nyaatorrent, which allows download torrent file directly, without visiting Nyaatorrent page


function add_links()
{
	var ids = document.getElementsByTagName('a');
	for(var i = 0; i < ids.length; i++)

with (ids[i])
if (href&&(href.search('nyaatorrents.org')!=-1||href.search('nyaa.se')!=-1||href.search('nyaa.eu')!=-1)&&(text.search('Website')<0))
		{
			var newLink = document.createElement('a');
			newLink.type = 'application/x-bittorrent';
			newLink.href ='javascript:void(0)';
			newLink.setAttribute('onclick', 'javascript:go('+'\''+ids[i].href.replace('torrentinfo', 'download')+'\')');
			newLink.innerHTML = '<b> [Torrent]</b>';
			ids[i].parentNode.appendChild(newLink);
		}
	return true;
}

function add_Script()
{
	var embedded_Script;
	var nav = navigator.userAgent.search('Firefox/');
	if (nav>=0){
	if (navigator.userAgent.charAt(nav+8)=='3')
		//Firefox 3.6.*		
		embedded_Script = 'function go(alink){var text1=\'<HTML><HEAD><meta http-equiv="Refresh" content="0;URL=\'+alink+\'"></Head><body onFocus="window.close();"></body></HTML>\';var newWin=window.open("", "hide_referer", "height=10, width=10, menubar=no,location=no,resizable=no,scrollbars=no,status=no");newWin.blur();newWin.document.open();newWin.document.write(text1);newWin.document.close();return true;}';
	else
		//Firefox 4 and Aurora
		embedded_Script = 'function go(alink){var text1=\'<HTML><HEAD><meta http-equiv="Refresh" content="0;URL=\'+alink+\'"></Head><body onFocus="autoclose()"><script type=\"text/javascript\">a=0;function autoclose(){a++;if (a>=2){window.close();}return true;}</script></body></HTML>\';var newWin=window.open("", "hide_referer", "height=10, width=200, menubar=no,location=no,resizable=no,scrollbars=no,status=no");newWin.document.open();newWin.document.write(text1);newWin.document.close();return true;}';
	}
	
	var scrp = document.createElement('script');
	scrp.type = 'text/javascript';
	scrp.innerHTML = embedded_Script;
	document.body.appendChild(scrp);
	return true;
}

add_Script();
add_links();
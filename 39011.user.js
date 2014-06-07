// ==UserScript==
// @name           Userscript.org - Statistics of scripts on users pages.
// @description    Count the number of fans, install and comments.
// @namespace      http://pas-bien.net/
// @include        http://userscripts.org/users/*
// ==/UserScript==

subtitles = document.getElementsByClassName('subtitle');
if(subtitles.length > 0)
{
	p = subtitles[0];
	scripts = p.innerHTML;
	installs = 0;
	comments = 0;
	fans = 0;
	
	invlp = document.getElementsByClassName('inv lp');
	if(invlp.length > 0)
	{
		for(i = 0 ; i < invlp.length ; i+= 4)
		{
			comments += parseInt(invlp[i+0].innerHTML,10);
			fans += parseInt(invlp[i+1].innerHTML,10);
			installs += parseInt(invlp[i+2].innerHTML,10);
		}
		
		p.innerHTML = scripts + ', ' + fans + ' fans , ' + comments + ' comments and ' + installs + ' installs.';
	}
}

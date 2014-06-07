// ==UserScript==
// @name           Icons v2
// @namespace      http://userscripts.org/users/58056
// @include        http://www*.cs-manager.com/csm/*
// ==/UserScript==

function addStatus(sType, iNum){
	var thisIcon;
	if(iNum!=0)
	{
		switch(sType)
		{
			case 'mail':
				thisIcon = document.getElementById('status_mail');
				thisIcon.src= 'http://i296.photobucket.com/albums/mm187/csmpresentations/misc/mail_gb_new.gif';
				thisIcon.setAttribute('title', iNum + ' new');
				break;
			case 'pcw':
				thisIcon = document.getElementById('status_pcw');
				thisIcon.src= 'http://i296.photobucket.com/albums/mm187/csmpresentations/misc/status_pcw_new.gif';
				thisIcon.setAttribute('title', iNum + ' new');
				break;
			case 'guestbook':
				thisIcon = document.getElementById('status_gb');
				thisIcon.src= 'http://i296.photobucket.com/albums/mm187/csmpresentations/misc/status_gb_new.gif';
				thisIcon.setAttribute('title', iNum + ' new');
				break;
			case 'news':
				var oObj = document.getElementById('clan_news');
				if (oObj != null) oObj.innerHTML += ' (' + iNum + ')';
		}
	}
	else if(iNum == 0)
	{
		switch(sType)
		{
			case 'guestbook':
				thisIcon = document.getElementById('status').getElementsByTagName('img')[0];
				thisIcon.setAttribute('src', 

'http://i296.photobucket.com/albums/mm187/csmpresentations/misc/status_gb-1.gif');
				break;
			case 'mail':
				thisIcon = document.getElementById('status').getElementsByTagName('img')[1];
				thisIcon.setAttribute('src', 'http://i296.photobucket.com/albums/mm187/csmpresentations/misc/mail_gb.gif');
				break;
			case 'pcw':
				thisIcon = document.getElementById('status').getElementsByTagName('img')[2];
				thisIcon.setAttribute('src', 

'http://i296.photobucket.com/albums/mm187/csmpresentations/misc/status_pcw.gif');
				break;
		}
		var l = document.getElementById("status").getElementsByTagName("img")[3];
		l.setAttribute("src","http://i296.photobucket.com/albums/mm187/csmpresentations/misc/live.gif");
		
		var n = document.getElementById("status").getElementsByTagName("img")[4];
		n.setAttribute("src","http://i296.photobucket.com/albums/mm187/csmpresentations/misc/note.gif");
	}
} 


function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

embedFunction(addStatus);

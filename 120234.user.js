// ==UserScript==
// @name           SteamID64 Retriever
// @namespace      SiPlus
// @description    Shows permanent SteamID64 of a Steam Community user or group with a custom URL
// @include        http://steamcommunity.com/id/*
// @include        https://steamcommunity.com/id/*
// @include        http://steamcommunity.com/groups/*
// @include        https://steamcommunity.com/groups/*
// ==/UserScript==
if ((document.location.pathname.search('/id/')==0)&&(!document.location.pathname.match(/id\/.+\/.+/)))
{
	document.getElementById('rightActionBlock').innerHTML += '<hr /><div class="actionItem">' +
		'<div class="actionItemIcon"><a href="javascript:" onclick="this.parentNode.parentNode.lastElementChild.onclick();">' +
		'<img border="0" width="16" height="16" src="http://cdn.steamcommunity.com/public/images/skin_1/iconView.gif"></a>' +
		'</div><a class="linkActionMinor" href="javascript:" onclick="' +
			'var elem=this;var elem2=elem.parentNode.getElementsByClassName(\'linkActionSubtle\')[0];elem2.innerHTML=\'(...)\';' +
			'elem.removeAttribute(\'href\');elem.removeAttribute(\'onclick\');' +
			'elem.parentNode.firstElementChild.firstElementChild.removeAttribute(\'href\');' +
			'elem.parentNode.firstElementChild.firstElementChild.removeAttribute(\'onclick\');' +
			'var xhr=new XMLHttpRequest();xhr.open(\'GET\',\'?xml=1\',true);xhr.send(null);xhr.onreadystatechange=function(){' +
				'if ((xhr.readyState==4)&&(xhr.status==200)) {var steamID64=xhr.responseXML.getElementsByTagName(\'profile\')[0].getElementsByTagName(\'steamID64\')[0].firstChild.nodeValue;' +
				'xhr.abort();elem2.innerHTML=\'(\'+steamID64+\')\';elem.setAttribute(\'href\',\'/profiles/\'+steamID64);' +
				'elem.parentNode.firstElementChild.firstElementChild.setAttribute(\'href\',\'/profiles/\'+steamID64);}}">SteamID64</a> <span class="linkActionSubtle"></span></div>';
}
else if ((document.location.pathname.search('/groups/')==0)&&(!document.location.pathname.match(/groups\/.+\/.+/)))
{
	var steamID64 = document.getElementsByClassName('membersOnline')[0].lastElementChild.firstElementChild.href.split('/')[4];
	document.getElementsByClassName('groupMemberRow')[0].innerHTML += '<span class="infoBreak">&nbsp;&nbsp;|&nbsp;&nbsp;</span>' +
		'<a class="linkStandard" href="/gid/'+steamID64+'">#'+steamID64+'</a>';
}
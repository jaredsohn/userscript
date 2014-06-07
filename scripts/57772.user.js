// ==UserScript==
// @name		Mail.Ru Music Download
// @version	1.0.4
// @description	Mail.Ru Music Download
// @include	http://my.mail.ru/*
// ==/UserScript==

function addLinksMusicDownload() {
	for (var i=0; i<31; i++) {
		var parent = document.getElementsByClassName("audioSong")[i];
		if (parent) {
			var mp3_url = parent.getAttribute("url");
			var mp3_title = parent.getAttribute("title") + '.mp3';		
			document.getElementsByClassName("audioTime")[i].innerHTML ='<a href="'+mp3_url+'" title="'+mp3_title+'"><img src="http://st.list.mail.ru/ico_music.gif" alt="\u0441\u043A\u0430\u0447\u0430\u0442\u044C" border="0" style="height:15px;width:15px;"></a>' + document.getElementsByClassName("audioTime")[i].innerHTML;	
		}
	}
}

addLinksMusicDownload();

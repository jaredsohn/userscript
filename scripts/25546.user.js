// ==UserScript==
// @name		Mail.Ru Music Download
// @version	1.0.3
// @description	Mail.Ru Music Download
// @include	http://my.mail.ru/*
// ==/UserScript==

function addLinksMusicDownload() {
	for (var i=1; i<51; i++) {
		var parent = document.getElementById("muslink"+i);
		if (parent) {
			var str = parent.getAttribute("onclick");
			var re = /change\([0-9]+[\'\,]+([0-9A-Za-z:\/.]+)/;
			var link = document.createElement("a");
			link.setAttribute("href",re.exec(str)[1]);
			link.innerHTML='\u0441\u043A\u0430\u0447\u0430\u0442\u044C';
			var list = parent.parentNode.parentNode.childNodes;
			list[5].innerHTML+=' | ';
			list[5].appendChild(link);			
		}
	}
}

addLinksMusicDownload();

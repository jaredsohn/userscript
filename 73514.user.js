// ==UserScript==
// @name           mailsopener
// @namespace      http://win.mail.ru/cgi-bin/*
// @include        http://win.mail.ru/cgi-bin/*
// ==/UserScript==

if (/^.*start$/.test(window.location.href)){
	urla = document.getElementsByTagName("a");
	for (i=0;i<urla.length;i++){
		if (urla[i].title == "Входящие"){
			window.location.href = urla[i].href;
		}
	}
}
mailrows = document.getElementsByClassName("noread");
for (i=0;i<mailrows.length;i++){
	letter = mailrows[i].getElementsByTagName("td")[4].getElementsByTagName("a")[0];
	if (i==mailrows.length-1)
		window.open(letter.href,"_self");
	else
		window.open(letter.href);
}
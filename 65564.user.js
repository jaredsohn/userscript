// ==UserScript==
// @name           1100AD link
// @namespace      google.com
// @author         ixi
// @version        3.0
// @description    Creates 1100AD link in draugiem.lv
// @include        http://www.draugiem.lv/*
// ==/UserScript==

function MakeButton() {
	var Els = document.getElementsByTagName("ul");
	var ElsLen = Els.length;
	var Pattern = new RegExp("\\b"+"mnu"+"\\b");
	for (i = 0, j = 0; i < ElsLen; i++) {
 		if ( Pattern.test(Els[i].className) ) {
 			var Parent = Els[i];
			var NewEL = document.createElement("li");
			var NewELContent = "<a href='http://www.draugiem.lv/1100ad/' style='background-image:url(http://i3.ifrype.com/apps/3/1523/2009100113090415620.gif); padding:5px 5px 5px 20px; background-repeat: no-repeat; background-position: 0 40%; margin-top:2px; margin-left:2px;'>1100AD</a>";
 			NewEL.innerHTML = NewELContent;
			Parent.appendChild(NewEL);
		}
	}
}

MakeButton();
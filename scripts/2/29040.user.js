// ==UserScript==

// @name           Orkutex
// @namespace      SabiNEX http://www.orkut.com/Profile.aspx?uid=3371135270015674775
// @description    Variedades para o seu Orkut
// @include        http://www.orkut.com/*
// @exclude        *.js

/*************************************************BY X.FREE***********************************************/
var Orkutex_replacer = document.body.innerHTML;


/*Begin of Preview & captchaImage bug fixer ||by Jacques||*/
if(Orkutex_replacer.indexOf("textarea") > -1){
	var backup = new Array();
	backup = document.getElementsByTagName("textarea");
	var y=0;
	storage_textarea = new Array();
	while(backup[y] != null){
		storage_textarea[y]=escape(document.getElementsByTagName("textarea").item(y).value);
		y++;
	}
}
if(Orkutex_replacer.indexOf("input") > -1){
	var backup_input = new Array();
	backup_input = document.getElementsByTagName("input");
	y=0;
	storage_input = new Array();
	while(backup_input[y] != null){
		storage_input[y] = escape(document.getElementsByTagName("input").item(y).value);
		y++;
	}
}
/*End of Preview & captchaImage bug fixer*/



document.body.innerHTML = Orkutex_replacer
/********************************************************************************************************/


/***********BY SabiNEX***********/

/* ->Fonts
*******************************************************/
.replace(/\[gauta\]/gi, "<font face='Gautami'>")
.replace(/\[\/gauta\]/gi, "</font>")
.replace(/\[mang\]/gi, "<font face='Mangal'>")
.replace(/\[\/mang\]/gi, "</font>")
.replace(/\[wing\]/gi, "<font face='Wingdings'>")
.replace(/\[\/wing\]/gi, "</font>")
.replace(/\[mexer\]/gi, "<marquee>")
.replace(/\[\/mexer\]/gi, "</marquee>")
.replace(/\[font=(.*?)\]/gi, "<font size='$1'>")
.replace(/\[\/font\]/gi, "</font>")
.replace(/\[web\]/gi, "<font face='Webdings'>")
.replace(/\[\/web\]/gi, "</font>")
.replace(/\[alinha=(.*?)\]/gi, "<div align='$1'>")
.replace(/\[\/alinha\]/gi, "</div")

.replace(/\[$S\]|\$S\;/gi,"<marquee>")
.replace(/\[\/$S\]/gi,"</marquee>")
// ==UserScript==
// @name          The Daily WTF
// @description	  Resizes code samples on thedailywtf.com
// @include       http://thedailywtf.com/
// @include       http://thedailywtf.com
// @include       http://www.thedailywtf.com/
// @include       http://www.thedailywtf.com
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)
var size = GM_getValue("foo", 12);

function textInc() {
size = size + 2
GM_setValue("foo", size);
zulu();
}

function textNorm() {
size = 12
GM_setValue("foo", size);
zulu();
}


function textDec() {
size = size - 2
GM_setValue("foo", size);
zulu();
}

function zulu() {
for (i=0;i<=9;i=i+1) {
	if (document.getElementsByTagName("blockquote")[i]) {
		document.getElementsByTagName("blockquote")[i].style.fontSize=size + "pt";
	}
	if (document.getElementsByTagName("pre")[i]) {
		document.getElementsByTagName("pre")[i].style.fontSize=size + "pt";
	}
}
}

GM_registerMenuCommand( "Increase Text Size ", textInc, "+", "alt", "i" );
GM_registerMenuCommand( "Normal Text Size ", textNorm, "0", "alt", "n" );
GM_registerMenuCommand( "Decrease Text Size ", textDec, "-", "alt", "d" );

zulu();
// ==UserScript==
// @name unescape for alphatown
// @author irachex
// @description unescape for alphatown
// @include http://alphatown.com/*
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery; 
}

function ubb2html(str){
	str = str.replace(/</ig, '&lt;');
	str = str.replace(/>/ig, '&gt;');

	str = str.replace(/\[\/(size|color|font|backcolor)\]/ig, '</font>');
	str = str.replace(/\[(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '<$1>');
	str = str.replace(/\[\/(sub|sup|u|i|strike|b|blockquote|li)\]/ig, '</$1>');
	str = str.replace(/\[\/move\]/ig, '</marquee>');
	str = str.replace(/\[(\/)?h([1-6])\]/ig, '<$1h$2>');

   	str = str.replace(/\[move=(left|center|right|justify)\]/ig, '<marquee direction="$1">');
   	str = str.replace(/\[move\]/ig, '<marquee>');
	str = str.replace(/\[size=(\d+?)\]/ig, '<font size="$1">');
	str = str.replace(/\[color=([^\[\<]+?)\]/ig, '<font color="$1">');
	str = str.replace(/\[backcolor=([^\[\<]+?)\]/ig, '<font style="background-color:$1">');
	str = str.replace(/\[font=([^\[\<]+?)\]/ig, '<font face="$1">');

	str = str.replace(/\[img\](.+jpg$)\[\/img\]/ig, '<img src="$1" border="0" />');
	str = str.replace(/\[img\](.+png$)\[\/img\]/ig, '<img src="$1" border="0" />');
	str = str.replace(/\[img\](.+bmp$)\[\/img\]/ig, '<img src="$1" border="0" />');
	str = str.replace(/\[img\](.+gif$)\[\/img\]/ig, '<img src="$1" border="0" />');
	
	return str;
}

function main() {
    var html = $('html').html();
    $('html').html(ubb2html(content));
}

$(window).load(function(){
    main();
});
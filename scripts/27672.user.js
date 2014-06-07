// ==UserScript==
// @name           NicoRedirect
// @namespace      nicovideo
// @description    Redirect URLs of Nicovideo to YouTube movie whose source is YouTube movie
// @include        http://www.nicovideo.jp/watch?v=ut*
// @include        http://www.nicovideo.jp/watch/ut*
// ==/UserScript==

var pattern1 = "http://www.nicovideo.jp/watch?v=ut"
var pattern2 = "http://www.nicovideo.jp/watch/ut"
if(location.href.indexOf(pattern1) == 0){
	location.href = "http://www.youtube.com/watch?v=" + location.href.substr(pattern1.length);
}else if(location.href.indexOf(pattern2) == 0){
	location.href = "http://www.youtube.com/watch?v=" + location.href.substr(pattern2.length);
}

// ==UserScript==
// @name           JVcom japanese language
// @namespace      http://www.jeuxvideo.com/
// @description    afficher les caracteres japonais sur le forum Japon
// @include        http://www.jeuxvideo.com/forums/0-1000034*
// @include        http://www.jeuxvideo.com/forums/1-1000034*
// @include        http://www.jeuxvideo.com/forums/3-1000034*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include        http://www.jeuxvideo.com/messages-prives/*
// @include        http://m.jeuxvideo.com/forums/0-1000034*
// @include        http://m.jeuxvideo.com/forums/1-1000034*
// @include        http://m.jeuxvideo.com/forums/3-1000034*
// @include        http://m.jeuxvideo.com/forums/27-1000034*
// ==/UserScript==

(function(){
var allPosts, thisPost;
allPosts = document.evaluate(
    "//li[@class='post']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allPosts.snapshotLength; i++) {
    thisPost = allPosts.snapshotItem(i);
    thisPost.innerHTML = thisPost.innerHTML.replace(new RegExp("&amp;#([^;.]+);", "g"),function(m){return unescapeFromNumRef(m);
	});
}
}());



//var unescaped = unescapeFromNumRef(str, 10);

function unescapeFromNumRef(str) {
str = str.replace("&amp;","&");
str = str.replace(" <br>","");
var unicode_codes = convertNumRefToUnicodeCodePoints(str, 10);
return convertUnicodeCodePointsToString(unicode_codes);
} 

function convertNumRefToUnicodeCodePoints(str, base) {
var num_refs = str.split(";");
num_refs.pop(); // Trim the last element.
var unicode_codes = [];
for (var i = 0; i < num_refs.length; ++i) {
var decimal_str = num_refs[i].replace(/^&#x?/, "");
var unicode_code = parseInt(decimal_str, base);
unicode_codes.push(unicode_code);
}
return unicode_codes;
} 

function convertUnicodeCodePointsToString(unicode_codes) {
var utf16_codes = convertUnicodeCodePointsToUtf16Codes(unicode_codes);
return convertUtf16CodesToString(utf16_codes);
} 

function convertUnicodeCodePointsToUtf16Codes(unicode_codes) {
var utf16_codes = [];
for (var i = 0; i < unicode_codes.length; ++i) {
var unicode_code = unicode_codes[i];
if (unicode_code < (1 << 16)) {
utf16_codes.push(unicode_code);
} else {
var first = ((unicode_code - (1 << 16)) / (1 << 10)) + 0xD800;
var second = (unicode_code % (1 << 10)) + 0xDC00;
utf16_codes.push(first)
utf16_codes.push(second)
}
}
return utf16_codes;
} 

function convertUtf16CodesToString(utf16_codes) {
var unescaped = '';
for (var i = 0; i < utf16_codes.length; ++i) {
unescaped += String.fromCharCode(utf16_codes[i]);
}
return unescaped;
} 


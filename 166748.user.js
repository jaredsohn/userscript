// ==UserScript==
// @name        VOZ Rainbow
// @namespace	http://userscripts.org/users/516325
// @include		http://*/showthread.php*
// @include		http://*/newreply.php*
// @include		http://*/editpost.php*
// @include		http://*/newthread.php*
// @include		http://*/private.php*
// @version		5.0
// @grant 		none
// @description Made by Skyfall.
// ==/UserScript==
/*tùy chọn*/
//size = 2 là kích thước chữ mặc định
//color = black là mặc định. 
//Màu có thể ở dạng hex, ví dụ #0088FA, nhưng PHẢI ở trong ngoặc kép
var SIZE = 2;
var COLOR = "black";
var ur = document.URL;
// giá trị 1 là bật, 0 là tắt.
var changeSize = 1;
var changeColor = 1;
var inDam = 0;
var inNghieng = 0;
var gachChan = 0;
/* hết tùy chọn */
var type = 0;
var sizeDefault = false;
var colorDefault = false;
if (SIZE == 2)
	sizeDefault = true;
if (COLOR.toUpperCase() == "BLACK" || COLOR == "#000000")
	colorDefault = true;
function siteType() {
	if (document.URL.indexOf("vozforums") >= 0)
		return 1;
	return 0;
}
// xóa hết ký tự trắng ở đầu và cuối
function clearWhite(s) {
	while (/^(\s|<br>|&nbsp;)+/i.test(s))
		s = s.replace(/^(\s|<br>|&nbsp;)+/i, "");
	while (/(\s|<br>|&nbsp;)+$/i.test(s))
		s = s.replace(/(\s|<br>|&nbsp;)+$/i, "");
	return s;
}
function appendCode(s, editorType) {
	var bString = "";
	var eString = "";
	if (inDam == 1) {
		bString = "[b]" + bString;
		eString = eString + "[/B]";
	}
	if (inNghieng == 1) {
		bString = "[i]" + bString;
		eString = eString + "[/I]";
	}
	if (gachChan == 1) {
		bString = "[u]" + bString;
		eString = eString + "[/U]";
	}
	if (changeColor == 1 && !colorDefault) {
		bString = "[coloR=" + COLOR + "]" + bString;
		eString = eString + "[/coloR]";
	}
	if (changeSize == 1 && !sizeDefault) {
		bString = "[sizE=" + SIZE + "]" + bString;
		eString = eString + "[/sizE]";
	}
	s = clearWhite(s);
	re = /^(\[quote(.*?;\d*'?)?\][\s\S]*?\[\/quote\](\s|<br>|&nbsp;)*)+/i;
	var s1 = s.match(re);
	if (s1 != null) {
		s = s.replace(re, "");
		s1[0] = clearWhite(s1[0]);
	}
	re = /(\[quote(.*?;\d*'?)?\][\s\S]*?\[\/quote\](\s|<br>|&nbsp;)*)+$/i;
	var s2 = s.match(re);
	if (s2 != null) {
		s = s.replace(re, "");
		s2[0] = clearWhite(s2[0]);
	}
	s = clearWhite(s);
	re = new RegExp(eString.replace(/[\/\[\]]/g, "\\$&"), "g");
	s = s.replace(re, "");
	re = new RegExp(bString.replace(/[\/\[\]]/g, "\\$&"), "g");
	s = s.replace(re, "");
	s = bString + s + eString;
	var myNewline = "";
	if (editorType == "standard")
		myNewline = "\n";
	else myNewline = "<br>";
	if (s1 != null)
		s = s1[0] + myNewline + myNewline + s;
	if (s2 != null)
		s = s + myNewline + s2[0];
	return s;
}
function form_submit() {
	/*var arText = document.getElementsByTagName('textarea');
	if (inDam == 1 || inNghieng == 1 || gachChan == 1 || (!sizeDefault && changeSize == 1) || (!colorDefault && changeColor == 1)) {
		arText[arText.length - 1].value = appendCode(arText[arText.length - 1].value, "standard");
	}
	form._submit();*/
	var editorType = "standard";
	if (document.getElementsByTagName("iframe").length != 0) 
	{
		editorType = "full";
		var iframe = document.getElementsByTagName("iframe")[0];
		var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
		var s = innerDoc.body.innerHTML;
	}
	else
	{
		var arText = document.getElementsByTagName('textarea');
		var s = arText[arText.length-1].value;
	}
	if (inDam == 1 || inNghieng == 1 || gachChan == 1 || (!sizeDefault && changeSize == 1) || (!colorDefault && changeColor == 1))
	{
		s = appendCode(s,editorType);
	}
	
	if (editorType == "standard") 
	{
		arText[arText.length-1].value = s;
	}
	else
	{	
		innerDoc.body.innerHTML = s;
	}
	form._submit();
}
type = siteType();
if (type == 1)
	window.addEventListener('submit', form_submit, true);
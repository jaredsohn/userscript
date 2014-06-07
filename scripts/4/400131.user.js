// ==UserScript==
// @name		CHDSupport-已解答
// @author		Anonymous
// @description         
// @version		0.1
// @include 	http://chdbits.org/forums.php?action=editpost&postid=*
// @include 	https://chdbits.org/forums.php?action=editpost&postid=*
// ==/UserScript==

para = document.URL.split(/[&=]/);
if(para[1] == "editpost"){
	var beingReplaced = document.compose.innerHTML;
	var func = "document.getElementsByName('subject')[0].value =  '【已解答】' + document.getElementsByName('subject')[0].value; document.getElementById('compose').submit();";
	document.compose.innerHTML = beingReplaced.replace('<table width="100%"','<a href="#" onclick="' + func + '"><b>已解答</b></a><table width="100%"');
}

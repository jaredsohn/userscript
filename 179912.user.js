// ==UserScript==
// @name        AutoNotice
// @namespace   AutoNotice
// @description  AutoNotice for kafan
// @include     *.kafan.cn/thread*
// @include    *.kafan.cn/forum*

// @version     1.0
// @icon http://a.ikafan.com/5/000/53/99/15_avatar_small.jpg
// @author 		loms126
// ==/UserScript==
var inset_my_node=document.createElement('iframe');
inset_my_node.id="notice_iframe";
inset_my_node.src="http://bbs.kafan.cn/home.php?mod=follow&do=view";
document.getElementById('hd').appendChild(inset_my_node);
inset_my_node.width = 0;
inset_my_node.height = 0;
setInterval('document.getElementById("notice_iframe").contentWindow.location.reload()',30*1000);
setInterval('document.getElementById("myprompt").className=document.getElementById("notice_iframe").contentDocument.getElementById("myprompt").className;document.getElementById("myprompt").innerText=document.getElementById("notice_iframe").contentDocument.getElementById("myprompt").innerText+"";if (document.getElementById("notice_iframe").contentDocument.getElementById("myprompt").className){noticeTitle();window.open ("http://u.kafan.cn/home.php?mod=space&do=notice");}else{clearInterval(setTimeout("noticeTitleFlash();", 500););document.title = NOTICETITLE["oldTitle"];};',35*1000);

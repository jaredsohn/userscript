// ==UserScript==
// @name        gamefy sign up
// @namespace   游戏风云
// @include     http://bbs.gamefy.cn/plugin.php?id=dsu_paulsign:sign
// @version     1
// ==/UserScript==

var a=document.getElementsByTagName('a')
var q=document.getElementsByTagName('input');
for (var i = 0,length = q.length;i < length;i++)
{
	if (q[i].value=="yl")
	{
		q[i].checked=true;
	}
	if (q[i].name=='qdmode'&&q[i].value=='3')
	{
		q[i].checked=true;
	}
}
a[33].click();
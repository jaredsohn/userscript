// ==UserScript==
// @name	Markit!00
// @namespace	http://mutoo.im/
// @description	厦门大学嘉庚学院评教专用脚本
// @include	http://jw.xujc.cn/student/index.php?c=Pj&a=add&pj_id=*
// @include	http://jw.xujc.com/student/index.php?c=Pj&a=add&pj_id=*
// ==/UserScript==

function markit(){
	var list = document.getElementsByTagName("input");for(var i=0;i<list.length;i++)
		if(list[i].type=='radio')
			if(list[i].value=='10')
				list[i].checked=true;
	document.getElementsByTagName("form")[0].submit.click();
}
if(confirm("自动评教？")) markit();

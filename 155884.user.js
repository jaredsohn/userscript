// ==UserScript==
// @name UCAS选课助手
// @description 只显示未满的公选课
// @author revassez
// @version 1.0
// @include http://jwjz.ucas.ac.cn/Student/Public/coursePublic.aspx
// @run-at document-end
// ==/UserScript==

var gxOnly=true;

var trs=document.getElementById('DataGrid1').getElementsByTagName('tr');
for(var i=1;i<trs.length;i++){
	var tr=trs[i];
	if(gxOnly){
		var id=tr.children[1].textContent.trim();
		if(id.indexOf('GX')<0){
			tr.style.display='none';
			continue;
		}
	}

	if(tr.children[5].textContent.trim()==tr.children[6].textContent.trim()){
		tr.style.display='none';
	}
	else{
		var limit=parseInt(tr.children[5].textContent.trim());
		var selected=parseInt(tr.children[6].textContent.trim());
		if(limit-selected<=10){
			tr.style.background='#FF0000';
			tr.style.color='#FFF';
			tr.children[1].children[0].style.color='#FFF';
			tr.children[2].children[0].style.color='#FFF';
		}
	}
}


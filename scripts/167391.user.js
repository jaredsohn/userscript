// 获取doit.im网站的当日完成事项，输出供打印列表
// version 0.1 BETA!
// 2013-05-08
// Copyright (c) 2013, wgjtyu
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// 必须填写描述和项目
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Print_what_you_done
// @namespace     http://atsuas.info
// @description   在doit已完成页面输出已完成事项
// @include       https://i.doit.im/home/#/time/completed
// ==/UserScript==

window.printf=function(){
	var tasks=document.getElementById('groupby_monthly');
	var group=tasks.firstChild;
	var group_title=group.firstChild.firstChild.innerHTML;
	var result='###'+group_title+'\n';
	//get task name
	todaytasks=group.childNodes[1].childNodes;
	for(i=0;i<todaytasks.length;i++){
		if(todaytasks[i].childNodes[4].childNodes.length!=1){
			taskname=todaytasks[i].childNodes[4].childNodes[0].innerHTML;
			taskbox=todaytasks[i].childNodes[4].childNodes[1].innerHTML;
			if(taskbox=="#work"){//根据项目来过滤出要输出的任务
				taskdescription=todaytasks[i].childNodes[3].childNodes[0].getAttribute("title");
				result+='* '+taskname+'\n\n'+'\t'+taskdescription+'\n\n';
			}
		}
	}
//拷贝至markdown编辑器，生成html以供打印
	alert(result);
}
var task_group=document.getElementById('switchbar');
button=document.createElement('input');
button.type="button";
button.value = '输出markdown格式';
button.onclick = window.printf;
task_group.parentNode.insertBefore(button,task_group);

// ==UserScript==
// @name           mantis helper
// @namespace      http://misc.intra.leju.com
// @description    hpn
// @include        http://misc.intra.leju.com/mantis/view_all_bug_page.php*
// ==/UserScript==
var forms = document.forms;
var trs;
for(var i in forms){
    if(forms[i].name === 'bug_action'){
        trs = forms[i].getElementsByTagName('table')[1].getElementsByTagName('tr');
    }
}
var tasks = [];
var output = [];
var html = '一周内的任务:\n已完成和已关闭：\n';
var html2 = '进行中（确认和暂停）:\n';
var html3 = '未完成:\n';
var final = '';
var signs = {
	'#ffffb0':'confrimed',
	'#c8c8ff':'assign',
	'#f47920':'pause',
	'#cceedd':'resolve',
	'#e8e8e8':'closed'
}
var d = new Date();
var date = {
	year:d.getFullYear(),
	month:(d.getMonth() + 1),
	day:d.getUTCDate()
}
var current = new Date(date.year +'/'+date.month+'/'+date.day).getTime();
for(var i =0;i<trs.length;i++){
	if(i>1){
		var entry = {};
		var status;
		var color = trs[i].bgColor;
		if(color === '#ffffb0'){
			status = 'confrimed';
		}else if(color==='#c8c8ff'){
			status = 'assign';
		}
		else if(color === '#f47920'){
			status = 'pause';
		}else if(color === '#cceedd'){
			status = 'resolve';
		}else {
			status = 'closed';
		}
		var id = trs[i].getElementsByTagName('td')[3].getElementsByTagName('a')[0].innerHTML;
		var name = trs[i].getElementsByTagName('td')[12].innerHTML;
		var date2 = trs[i].getElementsByTagName('td')[11].innerHTML;
		date2 = date2.replace(/-/g,'/');
		var past = new Date(date2).getTime();
		var dday = (current-past)/(60*60*1000*24);
		entry.id = id;
		entry.status = status;
		entry.name = name;
		entry.date = date;
		entry.gap = dday;
		tasks.push(entry);
	}
}
var j =1,k=1,z=1;
for(var i=0; i<tasks.length; i++){
	if((tasks[i].status === 'resolve' || tasks[i].status === 'closed') && tasks[i].gap < 8){
		html+= j+'、'+tasks[i].name + '--'+tasks[i].id+'\n';
		j++;
	}else if(tasks[i].status === 'pause' || tasks[i].status === 'confrimed'){
		html2+= k+'、'+tasks[i].name + '--'+tasks[i].id+'（进行中）\n';
		k++;
	}else if(tasks[i].status === 'assign'){
		html3+= z+'、'+tasks[i].name + '--'+tasks[i].id+'\n';
		z++;
	}
}
final = html+html2+html3;
var holder = document.createElement('span');
var alink = document.createElement('input');
alink.type = 'button';
alink.id = 'outputreport';
alink.value = '导出本周周报数据';
alink.style.fontWeight = 'bold';
holder.appendChild(alink);
var main = document.getElementsByClassName('small')[3];
main.appendChild(holder);
alink.addEventListener("click", function(){alert(final)}, false);
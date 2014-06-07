// ==UserScript==
// @name           Basecamp To-Dos Time Totals
// @namespace      none.com
// @description    Basecamp To-Dos Time Totals
// @include        https://*.basecamphq.com/projects/*/todo_lists*
// @include        http://*.basecamphq.com/projects/*/todo_lists*
// ==/UserScript==

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}

var Ajax=function(url,fn)
{
	GM_xmlhttpRequest({
		method:'GET',
		url:url,
		onload:fn
	});
	return;
};

GM_setValue("time","");

var url_base = window.location.href.split(".basecamphq")[0];

var all_list = document.getElementById("normal_list_controls").parentNode.parentNode;

var new_div = document.createElement("div");
new_div.id = "list_time_all";
new_div.innerHTML = '<p class="listdesc">No hours logged.</p>';
all_list.appendChild(new_div);

var list_titles = getElementsByClassName(document,'div','list_title');

for(i in list_titles)
{
	var new_div = document.createElement("div");
	list_id = list_titles[i].id.replace("list_","").replace("_title","");
	new_div.id = "list_time_" + list_id;
	new_div.innerHTML = '<p class="listdesc">No hours logged.</p>';
	list_desc_id = "list_desc_" + list_id;
	if(list_titles[i].nextSibling.nextSibling.id==list_desc_id) list_titles[i].nextSibling.nextSibling.appendChild(new_div);
	else list_titles[i].appendChild(new_div);
	GetListTotalTime(window.location.href + "/" + list_id);
}

var completed_lists = getElementsByClassName(document,'div','completed_lists');
completed_lists = completed_lists[0].getElementsByTagName('li');
// add for loop
for (j in completed_lists)
{
	var list_link = completed_lists[j].firstChild.href;
	var new_div = document.createElement("div");
	list_id = list_link.split('/todo_lists/')[1];
	new_div.id = "list_time_" + list_id;
	new_div.innerHTML = '<p class="listdesc">No hours logged.</p>';
	list_id = "list_desc_" + list_id;
	completed_lists[j].appendChild(new_div);

	GetListTotalTime(list_link)
}

function updateTimes(){
	times = GM_getValue("time","").split(';');
	var list_time = new Array();
	for(var j=0;j<(times.length-1);j++)
	{
		time = times[j].split(',');
		if(list_time[time[1]]) list_time[time[1]] += time[0]/1;
		else list_time[time[1]] = time[0]/1;
	}
	total_time = 0;
	for(j in list_time)
	{
		name = 'list_time_' + j;
		total_time += list_time[j];
		p = list_time[j]/100;
		p =  '<p class="listdesc">' + p + ' hours total</p>';
		try 
		{
			document.getElementById(name).innerHTML=p;
		}
		catch(err)
		{
			
		}
	}
	p = total_time/100;
	p = '<p class="listdesc">' + p + ' hours total</p>';
	document.getElementById("list_time_all").innerHTML=p;
}

function GetListTotalTime(list_link){
Ajax(list_link,function(xhr)
{
	html = xhr.responseText;
	list = xhr.finalUrl.split('/todo_lists/')[1];
	time_re = new RegExp('widget list_widget item_wrapper commentable" id="item_(.*?)">','g');
	ids = "";
	var result = html.match(time_re);
	url_base = xhr.finalUrl.split('.basecamphq.com')[0];
	for (i in result)
	{
		ids = result[i].replace('widget list_widget item_wrapper commentable" id="item_','').replace('">','');
		Ajax(url_base+'.basecamphq.com/todo_items/'+ids+'/time_entries?list='+list,function(xhr)
		{
			html = xhr.responseText;

			time_re = new RegExp('<hours type="float">(.*?)</hours>');
			time = 0;
			html2 = html.split('<hours type="float">');
			for(k=1;k<html2.length;k++) time = time + html2[k].split('</hours>')[0]*100;
			total_time = GM_getValue("time","");
			total_time += time + ',' + xhr.finalUrl.split('?list=')[1] + ';';
			GM_setValue("time",total_time);
			updateTimes();
			return;
		});
	}
});
}
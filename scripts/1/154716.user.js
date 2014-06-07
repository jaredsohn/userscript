// ==UserScript==
// @name           add some url at Community
// @namespace      add some url at Community
// @author         Lother
// @description    玩家交流增加連結
// @version        0.0.5
// @match          http://*.erepublik.com/*
// @include        http://*.erepublik.com/*
// ==/UserScript==


var urlList = new Array();
function add(name,url,target)
{
	var item = {0:name,1:url,2:target};
	urlList.push(item);
}
function update()
{
	var ul = document.getElementById('menu5').getElementsByTagName('ul')[0];	
	for(var i=0;i<urlList.length;i++)
	{
		var li = document.createElement('li');
		var link = document.createElement('a');
		link.setAttribute('href', urlList[i][1]);
		link.setAttribute('target', ((urlList[i][2]==true)?'_blank':'_self'));
		var name = document.createTextNode(urlList[i][0]); 
		link.appendChild(name);
		li.appendChild(link);
		ul.appendChild(li);
	}
}


add("台灣IRC頻道","http://mibbit.com/?channel=%23PTT_Formosa&server=rizon.mibbit.org",true);
add("新聞傳媒","http://www.erepublik.com/en/news/latest/all",false);
update();

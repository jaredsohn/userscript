// ==UserScript==
// @name           Kaztorka upload list
// @namespace      -
// @description    insert upload list bbcode into new releases
// @include        *kaztorka.org/torrent/add
// ==/UserScript==



// вставлять ли значки золотых/серебряных раздач (true/false)

var enablebling=true;



//  здесь можно вставить свою подпись. Если в подписи несколько строк, копировать и вставлять по одной друг за другом, а вместо перевода строки использовать последовательность "\n" (без кавычек)
//  если в подписи есть одинарные кавычки, то перед каждой из них нужно подставить слэш (\), иначе магия не сработает!
var myrel = '';
var currentTime = new Date()

var derp = '\n\n\n[spoiler=Мои раздачи на '+currentTime.getDate()+'.'+(currentTime.getMonth() + 1)+'.'+currentTime.getFullYear()+':]';

myrel = myrel + derp;



var xp = document.evaluate("/html/body/div[@id='main']/ul[@id='fast_menu']/li[@id='fastmenu_item_0']/a/span",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var myname = xp.snapshotItem(0).innerHTML;

window.addEventListener("load", function(e) {
  addButton();
}, false);


function addButton(){
 var bt;
 bt = "Добавить мои раздачи";
 if (myrel != derp) bt = bt+" и подпись";
 var buttonElem = document.getElementById('previewButton');
 var nb = document.createElement("input");
 nb.setAttribute("type","button");
 nb.setAttribute("style","align:center;");
 nb.setAttribute("class","btn");
 nb.setAttribute("id","appendButton");
 nb.setAttribute("value",bt);
 nb.addEventListener('click',doMonkey,true);
 buttonElem.parentNode.insertBefore( nb, buttonElem.nextSibling);
 
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}






function doMonkey(huita,pagenum)
{
var http = new XMLHttpRequest();
var url = "http://kaztorka.org/ajax/getUserInfo.php";
var params = "username="+myname;
    params = params+"&param=upload_info";

if (huita=='bydlocode')
{
    params = params+"&page="+pagenum;
}	

http.open("POST", url, true);
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.setRequestHeader("Content-length", params.length);
http.setRequestHeader("Connection", "close");
http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		var jsonObject = eval('('+http.responseText+')');

		var dom = document.createElement("div");
		dom.innerHTML = jsonObject.container;

		var dom1 = document.createElement("div");
		dom1.innerHTML = jsonObject.pager;

	        var entries = dom.getElementsByTagName('a');
		var entries1 = getElementsByClass('pager',dom1);

        	for (var i = 0; i < entries.length; i++)
	        {
	                if
			(
			(entries[i].href.indexOf('info?torrentID=')>=0)
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//удалить из публикуемой версии или привести к менее хуёвому виду
//да и вообще, очень хуёвый скрипт. Переделать.
			&&(entries[i].href.indexOf('0d5a64a439c7f45a0969a4c407261c53a270bca3')<0)
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			)

			{
				myrel = myrel + '[b]‣[/b] ';
	
				if(enablebling)
				{
					var modimgs = entries[i].parentNode.getElementsByTagName('img');
					for (var j = 0; j < modimgs.length; j++)
					{
						myrel = myrel + '[img]'+modimgs[j].src.replace('\'','')+'[/img]';
					}
				}
				myrel = myrel + '  [url="'+entries[i].href+'"]'+entries[i].text.replace('\'','')+'[/url]\n\n';
			}
	        }

		if (huita!='bydlocode')
		{
		for (var i = 0; i < entries1.length; i++)
	        {
			doMonkey('bydlocode',i+2);
		}
		

		}		


		if ((pagenum == (entries1.length+1))||(entries1.length==0))
		{
		bbe = document.getElementById('xbb_editor');
		bbt = bbe.contentDocument.getElementById('xbb_textarea');

		bbt.value = bbt.value + myrel;
		//bbt.value = bbt.value + http.responseText;
		bbt.value = bbt.value + '\n[size=1]скрипт для создания списка раздач [url=http://forum.kaztorka.org/index.php?showtopic=14699&st=50&p=385527&#entry385527]на форуме[/url][/size][/spoiler]\n';
		}
		
		

	}
}
http.send(params);
}


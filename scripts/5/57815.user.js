// ==UserScript==
// @name           comixo getlink
// @namespace      http://scripts.namdx1987.org/
// @description    Reveal the comixo link
// @include        http://www.comixo.com/eng/index.php?option=com_content&view=article&id=*&Itemid=*
// ==/UserScript==

var insertPlace=document.getElementById('comments');
insertPlace.textContent="";


var anchors=document.getElementsByTagName('a');
var re=/Main\.php/;
var lre=/pages\/\d+\.(jpg|jpeg|png|swf)/g;
function callback()
{
	if (this.readyState == 4) 
	{
		var div = document.createElement('div');
		div.style.margin = "4px";
		div.style.border = "1px solid darkorange";
		div.style.backgroundColor = "lightyellow";
		div.style.padding="2px";
		var m=this.responseText.match(lre);
		var a;
		for(var i=0;i<m.length;i++)
		{
			a=document.createElement('a');
			a.href="http://www.comixo.com/chi/viewer/"+m[i];
			a.textContent=m[i];
			a.style.display='block';
			div.appendChild(a);
		}
		insertPlace.appendChild(div);
	}
		
}

function requestPages(lnk)
{
	var req=new XMLHttpRequest();
	req.open('get', lnk, true);
	req.onreadystatechange=callback;
	req.send(null);
}

for(var i=0;i<anchors.length;i++)
	if(anchors[i].href.match(re))
		requestPages(anchors[i].href.replace(re, "xml/Pages.php"));

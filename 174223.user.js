// ==UserScript==
// @name           DiscuzX论坛个人资料一键填写
// @namespace   http://weibo.com/zheung
// @version         0.1
// @description   如题
// @match          http://*/home.php?mod=spacecp&ac=profile*
// @match          http://*/home.php?mod=spacecp*&ac=profile*
// @copyright     DanoR
// ==/UserScript==

var f1 = document.getElementsByTagName('ul');
for (i=0;i<f1.length;i++)
	if(f1[i].getAttribute('class')=='tb cl')
	{
		f1[i].innerHTML=f1[i].innerHTML+'<li><button>填写表单</button>';
		var f2 = f1[i].getElementsByTagName('li');
		var f3 = f2[5].getElementsByTagName('button');
		f3[0].onclick = function(){tx1();};
	}

function tx1()
{
	var allsel = document.getElementsByTagName('select');
	for (i=0;i<allsel.length;i++)
	{
		if(allsel[i].getElementsByTagName('option')[0].innerHTML=='公开')
			allsel[i].value=3;
		else if(allsel[i].getElementsByTagName('option')[0].innerHTML=='保密')
			allsel[i].value=1;
		else if(allsel[i].getElementsByTagName('option')[0].innerHTML=='年')
			allsel[i].value=1993;
		else if(allsel[i].getElementsByTagName('option')[0].innerHTML=='月')
			allsel[i].value=8;
		else if(allsel[i].getElementsByTagName('option')[0].innerHTML=='日')
			allsel[i].value=10;
		else if(allsel[i].getElementsByTagName('option')[0].innerHTML=='A')
			allsel[i].value='O';
		else if(allsel[i].getElementsByTagName('option')[0].innerHTML=='-省份-')
		{
			allsel[i].value='广东省';
			allsel[i].onchange();
		}
	}

	var allip = document.getElementsByTagName('input');
	for (i=0;i<allip.length;i++)
	{
		if(allip[i].id=='affectivestatus')
			allip[i].value='单身';
		else if(allip[i].id=='lookingfor')
			allip[i].value='寂寞';
	}
	
	setTimeout(function()
	{
		for (i=0;i<allsel.length;i++)
		{
			if(allsel[i].getElementsByTagName('option')[0].innerHTML=='-城市-')
				allsel[i].value='广州市';
		}
	},2014); 
}
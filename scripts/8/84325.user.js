// ==UserScript==
// @name           戰國IXA
// @namespace      戰國IXA
// @description    戰國IXA
// @version        0.3
// @include        http://*sengokuixa.jp/*
// ==/UserScript==


Main();

function Main()
{
	if (window.location.href.indexOf('map.php') != -1 && !window.opener)
	{
		var newHTML = '';
		document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" type="text/css" media="screen, print" href="http://cache.sengokuixa.jp/world/20101015-01/css/b_village.css" />';
		document.getElementsByClassName("gnavi01 iepngfix")[0].getElementsByTagName('a')[0].href = 'javascript:window.open("village.php","_blank");alert("^.^");';
		newHTML += '<div id="actionLog" style=display:none>ccc</div>';		
		newHTML += "<iframe id='village' src='village.php' width=0 height=0></iframe><br />";
		newHTML += "<iframe id='dungeon' src='/facility/dungeon.php' width=0 height=0></iframe><br />";
		newHTML += "<iframe id='mlist' src='/report/list.php' width=0 height=0></iframe><br />";
		newHTML += "<div id='que'></div><br />";
		newHTML += "<div id='searchque'></div>";
		newHTML += "<div id='mail'></div>";

		document.getElementById('box').innerHTML += newHTML;
		setInterval(function(){document.getElementById("village").src = "village.php";},120000);
		setInterval(function(){document.getElementById("dungeon").src = "/facility/dungeon.php";},130000);
		setInterval(function(){document.getElementById("dungeon").src = "/card/deck.php";},60000);
		setInterval(function(){document.getElementById("mlist").src = "/report/list.php";},200000);
		setTimeout(CheckBuild,1000);
	}
	else if(window.location.href.indexOf('village.php') != -1 && parent.window.location.href.indexOf('map.php') != -1 && !window.opener)
	{
		var obj = document.getElementsByClassName('sideBoxInner basename')[0].getElementsByTagName('li');
		for(var i=0;i<obj.length;i++)
		{
			if (obj[i].getElementsByTagName('a').length && parent.document.getElementById('lordSiteArea').textContent.indexOf(obj[i].textContent) != -1)
			{
				location.href = obj[i].getElementsByTagName('a')[0].href;
				return;
			}
		}
			
		UpdateBuild();
	}
	else if(window.location.href.indexOf('/village.php') != -1 && window.opener)
	{
		if (document.getElementById('actionLog') && document.getElementById('actionLog').getElementsByTagName('li').length < 2)
		{
			var HTM = '';
			var obj = window.opener.document.getElementById('que').getElementsByTagName('div');
			for(var i=0;i<obj.length;i++)
			{
				var STR = obj[i].innerHTML.split(",");
				HTM += STR[3]+'('+STR[0]+','+STR[1]+') ';
			}
			
			if (obj.length)
				document.getElementById('actionLog').getElementsByTagName('ul')[0].innerHTML += '<li><span class="buildStatus">建設準備中  '+HTM+'</li>';
		}
	}
	else if(window.location.href.indexOf('facility/select_facility.php') != -1 && window.opener)
	{
		var Test = /x=([\d]*).*y=([\d]*)/.exec(window.location.href);
		var x=Test[1];
		var y=Test[2];

		var obj = document.getElementsByClassName("ig_tilesection_btnarea_left");
		for(i=0;i<obj.length;i++)
		{
			var name = obj[i].parentNode.getElementsByTagName('img')[0].alt;
			var vid = /vid=([\d]*)/.exec(obj[i].getElementsByTagName('a')[1].href);
			var id = /id=([\d]*)/.exec(obj[i].getElementsByTagName('a')[1].href);;
			var str = "<div onclick='this.parentNode.removeChild(this);'>"+x+","+y+","+vid[1]+","+name+",0,0,0,0,"+id[0]+"</div>";
			obj[i].getElementsByTagName('a')[1].href = '/village.php';
			obj[i].getElementsByTagName('a')[1].setAttribute("onclick","window.opener.document.getElementById('que').innerHTML += \""+str+"\"")
		}
	}
	else if((window.location.href.indexOf('facility/facility.php') != -1 || window.location.href.indexOf('/facility/castle.php') != -1) && window.opener)
	{
		var obj = document.getElementsByClassName("ig_tilesection_btnarea_left");

		if (obj && obj.length)
		{
			if(obj[0].getElementsByTagName('a')[0].getAttribute("onclick"))
			{
				var HTM = "<a href=/village.php id=adq><img src='http://cache.sengokuixa.jp/world/20100824-01/img/tile/btn_lvup2.png'/></a>";
				obj[0].innerHTML = obj[0].innerHTML.replace(obj[0].innerHTML.substr(0,20),HTM);
				document.getElementById('adq').addEventListener('click',AddQue, false);
			}
			else
			{
				obj[0].getElementsByTagName('a')[0].href = '/village.php';
				obj[0].addEventListener('click',AddQue, false);
			}
		}
	}
	else if(window.location.href.indexOf('facility/dungeon.php') != -1 && window.opener)
	{
		if (window.opener.document.getElementById('searchque').innerHTML) return;
		var obj=document.getElementsByClassName('dungeon_list_box');
		for(var i=0;i<obj.length;i++)
		{
			var cmd = 'window.opener.document.getElementById("searchque").innerHTML += "<div onclick=this.parentNode.removeChild(this);>"+this.parentNode.getElementsByTagName("span")[0].innerHTML+"</div>";window.location.reload();';
			obj[i].innerHTML += "<br><input type=button onclick='"+cmd+"' value='QUE'/>";
		}
	}
	else if(window.location.href.indexOf('facility/dungeon.php') != -1 && parent.window.location.href.indexOf('map.php') != -1 && !window.opener)
	{
		GOSearch();
	}
	else if(window.location.href.indexOf('card/deck.php') != -1 && parent.window.location.href.indexOf('map.php') != -1 && !window.opener)
	{
		DeckCheck();
	}
	else if(window.location.href.indexOf('login_sessionout.php') != -1)
	{
		window.location.href='http://sengokuixa.jp/';
	}
	else if(window.location.href == 'http://sengokuixa.jp/' || window.location.href.indexOf('event=OAuth') != -1)
	{
		if (document.getElementById('btnGame'))
			window.location.href = document.getElementById('btnGame').getElementsByTagName('a')[0].href;
		else
			window.location.href = document.getElementById('btnObtEntry').getElementsByTagName('a')[0].href;
	}
	else if(window.location.href.indexOf('world/select_world.php') != -1)
	{
		var obj = document.getElementsByTagName('a');
		for(var i=0;i<obj.length;i++)
		{
			if (obj[i].href.indexOf('wd=w005') != -1)
			{
				window.location.href = obj[i].href;
				return;
			}
		}
	}
	else if(window.location.href.indexOf('report/list.php') != -1 && parent.window.location.href.indexOf('map.php') != -1 && !window.opener)
	{
		CheckMail();
	}
	else if(window.location.href.indexOf('report/detail.php') != -1 && parent.window.location.href.indexOf('map.php') != -1 && !window.opener)
	{
		DelMail();
	}
	else if(window.location.href.indexOf('/land.php') != -1 && window.opener)
	{
		//LAND();
	}
	else if(window.location.href.indexOf('/facility/send_troop.php') != -1 && parent.window.location.href.indexOf('map.php') != -1 && !window.opener)
	{
		//GoFight();
	}
	else
	{
		//alert(window.location.href);
	}
	
}

function UpdateBuild()
{
	if (!parent.document.getElementById('actionLog')) return;
	if (!parent.document.getElementById('que')) return;

	if (!document.getElementById('actionLog'))
	{
		parent.document.getElementById('actionLog').innerHTML = '';
		parent.document.getElementById('actionLog').style.display = 'none';
		return;
	}
	
	parent.document.getElementById('actionLog').innerHTML = document.getElementById('actionLog').innerHTML;
	
	if (document.getElementById('actionLog').getElementsByTagName('li').length < 2)
	{
		var HTM = '';
		var obj = parent.document.getElementById('que').getElementsByTagName('div');
		for(var i=0;i<obj.length;i++)
		{
			var STR = obj[i].innerHTML.split(",");
			HTM += STR[3]+'('+STR[0]+','+STR[1]+') ';
		}
		if (obj.length)
			parent.document.getElementById('actionLog').getElementsByTagName('ul')[0].innerHTML += '<li><span class="buildStatus">建設準備中  '+HTM+'</li>';
	}
	
	var obj = parent.document.getElementById('actionLog').getElementsByTagName('a');
	for(i=0;i<obj.length;i++)
	{
		obj[i].href="#";
	}
	parent.document.getElementById('actionLog').style.left = '180px';
	parent.document.getElementById('actionLog').style.top = '545px';
	parent.document.getElementById('actionLog').style.display = '';
	
	parent.document.getElementById('wood').innerHTML = document.getElementById('wood').innerHTML;
	parent.document.getElementById('stone').innerHTML = document.getElementById('stone').innerHTML;
	parent.document.getElementById('iron').innerHTML = document.getElementById('iron').innerHTML;
	parent.document.getElementById('rice').innerHTML = document.getElementById('rice').innerHTML;
	setTimeout(UpdateBuild,1000);
}

function AddQue()
{
	var Test = /x=([\d]*).*y=([\d]*)/.exec(window.location.href);
	if (!Test)
	{
		var x=1;
		var y=1;
	}
	else
	{
		var x=Test[1];
		var y=Test[2];
	}
	Test = /vid=([\d]*)/.exec(document.body.innerHTML);
	if (!Test)
	{
		alert("Error occur");
		return;
	}
	var vid=Test[1];
	var name = document.getElementsByTagName('h3')[0].getElementsByTagName('a')[0].innerHTML;
	
	var lastnum = document.getElementsByClassName('icon_wood').length - 1;
	var wood = /([\d]+)/.exec(document.getElementsByClassName('icon_wood')[lastnum].innerHTML);
	lastnum = document.getElementsByClassName('icon_cotton').length - 1;
	var cotton = /([\d]+)/.exec(document.getElementsByClassName('icon_cotton')[lastnum].innerHTML);
	lastnum = document.getElementsByClassName('icon_iron').length - 1;
	var iron = /([\d]+)/.exec(document.getElementsByClassName('icon_iron')[lastnum].innerHTML);
	lastnum = document.getElementsByClassName('icon_food').length - 1;
	var food = /([\d]+)/.exec(document.getElementsByClassName('icon_food')[lastnum].innerHTML);
	
	var str = x+","+y+","+vid+","+name+","+wood[0]+","+cotton[0]+","+iron[0]+","+food[0]+",";
	window.opener.document.getElementById('que').innerHTML += "<div onclick='this.parentNode.removeChild(this);'>"+str+"</div>";
}

function CheckBuild()
{
	setTimeout(CheckBuild,1000);
	if (document.getElementById('actionLog').style.display == '') return;
	if (document.getElementById('que').innerHTML == '') return;
	
	var obj = document.getElementById('que').getElementsByTagName('div');
	var STR = obj[0].innerHTML.split(",");

	var wood = document.getElementById('wood').innerHTML;
	var stone = document.getElementById('stone').innerHTML;
	var iron = document.getElementById('iron').innerHTML;
	var rice = document.getElementById('rice').innerHTML;
	
	if (wood > Number(STR[4]) && stone > Number(STR[5]) && iron > Number(STR[6]) && rice > Number(STR[7]))
	{
		obj[0].parentNode.removeChild(obj[0]);
		document.getElementById('actionLog').style.display = '';
		document.getElementById("village").src = "/facility/build.php?"+"x="+STR[0]+"&y="+STR[1]+"&vid="+STR[2]+"&"+STR[8];
	}
	else
	{
		var obj = document.getElementById('que').getElementsByTagName('div');
		var STR = obj[0].innerHTML.split(",");
		
		document.getElementById('actionLog').innerHTML = '等候資源中 '+STR[3];
		document.getElementById('actionLog').style.display = '';
	}
}

function GOSearch()
{
	setTimeout(GOSearch,1000);
	if (!parent.document.getElementById('searchque') || !parent.document.getElementById('searchque').innerHTML) return;
	
	var obj = document.getElementsByName('unit_select');
	if (!obj || !obj.length) return;
	obj[0].click();
	
	var span = obj[0].parentNode.parentNode.parentNode.getElementsByTagName('span');
	
	for(var i=0;i<span.length;i++)
	{
		var HP = /[\d]+/.exec(span[i].innerHTML);
		if (HP && HP[0] && Number(HP[0] < 100) && i < 4)
			return;
	}
	
	var obj = parent.document.getElementById('searchque').getElementsByTagName('div')[0];
	var STR = obj.innerHTML;
	//obj.parentNode.removeChild(obj);
		
	obj = document.getElementsByName('dungeon_select');
	for (var i=0;i<obj.length;i++)
	{
		if (obj[i].parentNode.getElementsByTagName('span')[0].innerHTML == STR)
		{
			obj[i].click();
			var hid=document.createElement("input");
			hid.type="hidden";
			hid.name='btn_send';
			hid.value=true;
			document.getElementById('dungeon_input_form').appendChild(hid);
			document.getElementById('dungeon_input_form').submit();
			return;
		}
	}
}
function DeckCheck()
{
	if (!parent.document.getElementById('searchque') || !parent.document.getElementById('searchque').innerHTML) return;

	var SN = unsafeWindow.$('select_assign_no').value;
	var Quota = /([\d]*)\/([\d]*)/.exec(unsafeWindow.$('ig_deckcost').textContent);

	for(var num=1;num<5;num++)
	{
		if (!unsafeWindow.$('id_deck_card'+num)) break;
		var obj = unsafeWindow.$('id_deck_card'+num).getElementsByClassName('ig_card_status_hp');
		for(var i=0;i<obj.length;i++)
		{
			var HP = /([\d]*)\/([\d]*)/.exec(obj[i].textContent);
			if(HP[1]!=HP[2])
			{
				var ID = /confirmUnregist\('([\d]*)', '([\d]*)', 1\)/.exec(document.body.innerHTML);
				if (ID && ID.length)
				{
					unsafeWindow.$("unit_assign_id").value=ID[1];
					unsafeWindow.$("unset_unit_squad_id").value=ID[2];
					unsafeWindow.$("assign_form").submit();
					//alert(HP[1]);
					return;
				}
			}
		}
	}

	//新部隊
	if(document.body.textContent.indexOf('秘境探索中') == -1 && (!unsafeWindow.$("id_deck_card4") || !unsafeWindow.$("id_deck_card4").textContent.replace(/[\t\n]/g, "")))
	{
		if (unsafeWindow.$("select_village"))
		{
			var obj = document.getElementsByClassName('sideBoxInner basename')[0].getElementsByTagName('li');
			var i=0;
			for(i=0;i<obj.length;i++)
			{
				if (!obj[i].getElementsByTagName('a')[0])
				{
					break;
				}
			}
			if (i != obj.length)
				unsafeWindow.$("select_village").value = unsafeWindow.$("select_village").options[i+1].value;
		}
		var obj = document.getElementsByTagName('a');
		for(var i=0;i<obj.length;i++)
		{
			var ID = /confirmRegist\('([\d]*)', '([\d]*)', ([\d]*), ([\d]*)\)/.exec(obj[i].getAttribute("onclick"));
			if (ID)
			{
				var cost = /コスト([\d]*)/.exec(obj[i].parentNode.parentNode.textContent);
				if (cost)
				{
					if (Number(cost[1]) + Number(Quota[1]) <= Number(Quota[2]))
					{
						unsafeWindow.confirmRegist(ID[1],ID[2],ID[3],ID[4]);
						return;
					}
				}
			}
		}
		for(var i=0;i<obj.length;i++)
		{
			if (obj[i].textContent.indexOf('＞') != -1)
			{
				window.location.href = obj[i].href;
				return;
			}
		}
		
	}

	if(SN < 4)
	{
		unsafeWindow.selectAssignNo(Number(SN)+1);
	}
	else
	{
		GM_log("編隊結束");
	}
}

function CheckMail()
{
	if (!parent.document.getElementById('mail')) return;

	var obj = document.getElementsByTagName('a');
	for(var i=0;i<obj.length;i++)
	{
		if (obj[i].innerHTML.indexOf('の探索') != -1)
		{
			location.href = obj[i].href;
			return;
		}
	}
}

function DelMail()
{
	if (!parent.document.getElementById('mail')) return;
	
	var Text='',obj;
	obj = document.getElementsByClassName('log3');
	if (obj && obj.length)
	{
		Text += obj[0].textContent.replace(/[\t\n]/g, "");
	}
	
	obj = document.getElementsByClassName('gettreger');
	if (obj && obj.length)
	{
		Text += obj[0].textContent.replace(/[\t\n]/g, "");
	}
	
	if (Text)
	{
		GM_log(Text);
		parent.document.getElementById('mail').innerHTML += Text +'<br />';
	}
	
	document.getElementsByName('remove')[0].submit();
}

function LAND()
{
	//document.getElementsByClassName('ig_mappanel_function map_jin')[0].innerHTML += '<div id=fight><input type=button value=劍></div>';
	//document.getElementById('fight').addEventListener('click',AddFight, false);	
}

function AddFight()
{
	var star = /[★]+/.exec(document.getElementsByClassName('ig_mappanel_dataarea')[0].innerHTML);
	if (!document.getElementById('fightframe'))
		document.body.innerHTML += '<iframe id=fightframe width=800 height=600></iframe><br />';
		
	document.getElementById("fightframe").src = document.getElementsByClassName('ig_mappanel_function_mid')[0].getElementsByTagName('a')[0].href;
}

function GoFight()
{
	if (document.getElementsByClassName('gofight_detail').length)
	{
		var AP = document.getElementsByClassName('gofight_detail')[0].getElementsByTagName('span')[0].textContent;
		var star = /[★]+/.exec(parent.document.getElementsByClassName('ig_mappanel_dataarea')[0].innerHTML);
		if (star[0].length == 1 && AP > 500)
			unsafeWindow.imageButtonSubmit('btn_send', 'input_troop', '');
		if (star[0].length == 2 && AP > 900)
			unsafeWindow.imageButtonSubmit('btn_send', 'input_troop', '');
		if (star[0].length == 3 && AP > 2500)
			unsafeWindow.imageButtonSubmit('btn_send', 'input_troop', '');
		if (star[0].length == 4 && AP > 5000)
			unsafeWindow.imageButtonSubmit('btn_send', 'input_troop', '');

		return;
	}
	var obj = document.getElementsByClassName('ig_card_cardStatusBack visible');
	for(var i=0;i<obj.length;i++)
	{
		if (obj[i].getElementsByClassName('jobtype_2').length)
		{
			cardid = obj[i].parentNode.parentNode.parentNode.id;
		}
	}
	
	if (!cardid)
		return;
		
	obj = document.getElementsByTagName('a');
	for(var i=0;i<obj.length;i++)
	{
		if (obj[i].href.indexOf(cardid) != -1 && obj[i].parentNode.parentNode.parentNode.parentNode.getElementsByTagName('input').length)
		{
			obj[i].parentNode.parentNode.parentNode.parentNode.getElementsByTagName('input')[0].click();
			unsafeWindow.go_confirm();
			return;
		}
	}
}

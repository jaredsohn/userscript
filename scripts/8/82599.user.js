// ==UserScript==
// @name           ドラゴンクルセイド2
// @namespace      dragon2.bg-time.jp/
// @description    ドラゴンクルセイド2
// @version        0.3
// @include        *.dragon2.bg-time.jp*
// ==/UserScript==

//V0.3 加入自動任務
//V0.2 加入排程完整版

var Version = 0.3;
var MapCenter = 0;
var StartFlag = 0;
var MapTick = 0;
var MapIpt = "";

UserMain();

function UserMain()
{
	if (!opener && window.location.href.indexOf("map/index.ql") != -1)
	{
		var obj = document.getElementsByClassName('act_vip')[0];
		obj.innerHTML = "<a href='#none'>啟動</a>";
		obj.setAttribute("onclick",'');
		obj.addEventListener('click',StartSearch, false);
		
		obj = document.getElementsByClassName('top_buy')[0];
		obj.innerHTML +="<iframe src='/building12.ql' id=heroStat width=0 height=0></iframe><div id='herostattxt' style='display:none'></div>";
		setInterval(function(){document.getElementById("heroStat").src = "/building12.ql";},600000);

		obj.innerHTML +="<iframe src='/city/index.ql' id=cityfrm width=0 height=0></iframe><div id='cityque' style='display:none'></div>";
		setInterval(function(){document.getElementById("cityfrm").src = "/city/index.ql";},120000);

		obj.innerHTML +="<iframe src='about:blank' id=taskfrm width=0 height=0></iframe>";
		document.getElementById("mapExt").innerHTML = "<b style='cursor:Pointer' id=autotaskstart>自動執行任務</b><br /><div id='tasklist'></div>";
		document.getElementById("autotaskstart").addEventListener('click',StartAutoTask, false);
		
		obj = document.getElementsByTagName("a");
		if (obj && obj.length && obj[0].href.indexOf("/city/index.ql") != -1)
		{
			obj[0].href = "#none";
			obj[0].setAttribute("onclick",'window.open("/city/index.ql","CityWin");');
		}
	}
	if (window.location.href.indexOf("/outarms.ql") != -1)
	{
		GoVisit();
	}
	if (window.location.href.indexOf("/building12.ql") != -1 && top.window.location.href.indexOf("map/index.ql") != -1)
	{
		UpdateHeroStat();
	}
	if (window.location.href.indexOf("city/index.ql") != -1  && top.window.location.href.indexOf("map/index.ql") != -1)
	{
		UpdaeCityQue();
		setInterval(UpdaeCityQue,1000);
	}
	if (window.location.href.indexOf("/task/taskdaily.ql") != -1 && top.window.location.href.indexOf("map/index.ql") != -1)
	{
		AutoTask();
	}
	if (window.location.href.indexOf("/task/taskdailyitem.ql") != -1  && top.window.location.href.indexOf("map/index.ql") != -1)
	{
		window.location.href = "/task/taskdaily.ql";
	}
	if (window.location.href.indexOf("/task/taskdailyaward.ql?dailyItemId=") != -1)
	{
		var Test = /\?dailyItemId=([\d]*)/.exec(window.location.href);
		if (Test && Test.length)
			unsafeWindow.awardTask(Test[1]);
	}
	if (window.location.href.indexOf("/building") != -1 && window.location.href.indexOf("bid=") != -1)
	{
		if (opener && opener.document.location.href && opener.document.location.href.indexOf("map/index.ql") != -1)
		{
			var obj = document.getElementsByClassName('note')[0];
			obj.innerHTML = '<input type="button" class="btns" id="addcode" value="排程">' + obj.innerHTML;
			document.getElementById('addcode').addEventListener('click',AddCodeToQ, false);
		}
		
		if (top.window.location.href.indexOf("map/index.ql") != -1)
		{
			var id = document.getElementsByName('bid')[0].value;
			if (top.document.getElementById('cityque').innerHTML.indexOf(id) != -1 && document.body.innerHTML.indexOf('value="建設"') != -1)
			{
				var Tag = top.document.getElementById('cityque').getElementsByTagName('div')[0];
				top.document.getElementById('cityque').removeChild(Tag);
				document.getElementsByName('updateBuildForm')[0].submit();
			}
		}
	}
}

function StartSearch()
{
	if (StartFlag == 0)
	{
		document.getElementById("cityfrm").src = "/city/index.ql";
		document.getElementsByClassName('act_vip')[0].innerHTML = "<a href='#none'>停止</a>";
		setTimeout(SearchMap, 1000);
		MapCenter = 24;
	}
	else
	{
		document.getElementsByClassName('act_vip')[0].innerHTML = "<a href='#none'>啟動</a>";
		MapIpt = '';
	}

	StartFlag = !StartFlag;
}

function GoVisit()
{
	if (window.location.href.indexOf("from=map&m=2") != -1)
	{
		if (!top.document.getElementsByClassName('act_vip').length)
			return;
		if (top.document.getElementsByClassName('act_vip')[0].innerHTML.indexOf("啟動") != -1)
			return;
			
		if (document.getElementsByName("heroId").length)
		{
			var obj = document.getElementsByName("heroId")[0];
			obj.click();
			document.getElementById('myMapId').value = 0;
			document.getElementsByName("submit")[0].click();
		}
		else
		{
			unsafeWindow.parent.gSimWin.close();
		}
	}
	else
	{
		if (!top.document.getElementsByClassName('act_vip').length)
			return;
		if (top.document.getElementsByClassName('act_vip')[0].innerHTML.indexOf("啟動") != -1)
			return;

		if (document.getElementsByName("submit").length)
			document.getElementsByName("submit")[0].click();
			
		top.document.getElementById("heroStat").src = "/building12.ql";
	}

}
function SearchMap()
{
	if (StartFlag == 0)
	{
		unsafeWindow.SimWin.alert("停止地圖搜尋");
		return;
	}
	if (document.getElementById('herostattxt').innerHTML == '-1')
	{
		setTimeout(SearchMap, 1000);
		return;
	}
	
	if (window.location.href.indexOf("map/index.ql") != -1)
	{
		var loading = document.getElementById('mapLoading');
		var checking = document.getElementById('simWinPop');
		
		if ( (loading && loading.style.visibility == 'visible') || (checking && checking.style.display == 'block') )
		{
			MapTick++;
			if (MapTick == 10)
			{
				MapCenter = 0;
				unsafeWindow.map.areas = {};
				unsafeWindow.moveMap(0,0);
			}
			setTimeout(SearchMap, 1000);
			return;
		}

		
		for (var k in unsafeWindow.map.areas)
		{
			if (unsafeWindow.map.areas[k].type == 71 || unsafeWindow.map.areas[k].type == 72 || unsafeWindow.map.areas[k].type == 17)
			{
				if ((unsafeWindow.map.areas[k].type == 71 || unsafeWindow.map.areas[k].type == 72) && unsafeWindow.getSpace(unsafeWindow.map.areas[k].x, unsafeWindow.map.areas[k].y) > 30)
					unsafeWindow.map.areas[k].status = 2;
				if (unsafeWindow.map.areas[k].type == 17 && unsafeWindow.getSpace(unsafeWindow.map.areas[k].x, unsafeWindow.map.areas[k].y) > 8)
					unsafeWindow.map.areas[k].status = 2;
				if (document.getElementById('herostattxt').innerHTML.indexOf(k) != -1)
					unsafeWindow.map.areas[k].status = 2;
				
				if (unsafeWindow.map.areas[k].status == 0)
				{
					unsafeWindow.SimWin.ifrOpen("/outarms.ql?from=map&m=2&mapId="+k, 'click');
					MapCenter = 0;
					
					document.getElementById('herostattxt').innerHTML += k;
					document.getElementById('herostattxt').innerHTML += ",";
					setTimeout(function(){top.document.getElementById("heroStat").src = "/building12.ql";},10000);
				}
			}
		}
		
		MapCenter = (MapCenter +1) % 25;
		GoNextStep();

	}
	MapTick = 0;
	setTimeout(SearchMap, 1000);
}

function GoNextStep()
{
	unsafeWindow.map.areas = {};
	if (MapCenter == 0)
		unsafeWindow.moveMap(0,0);
	if (MapCenter == 1)
		unsafeWindow.moveMap(1,0);
	if (MapCenter == 2)
		unsafeWindow.moveMap(0,1);
	if (MapCenter == 3)
		unsafeWindow.moveMap(-1,0);
	if (MapCenter == 4)
		unsafeWindow.moveMap(-1,0);
	if (MapCenter == 5)
		unsafeWindow.moveMap(0,-1);
	if (MapCenter == 6)
		unsafeWindow.moveMap(0,-1);
	if (MapCenter == 7)
		unsafeWindow.moveMap(1,0);
	if (MapCenter == 8)
		unsafeWindow.moveMap(1,0);
	if (MapCenter == 9)
		unsafeWindow.moveMap(1,0);
	if (MapCenter == 10)
		unsafeWindow.moveMap(0,1);
	if (MapCenter == 11)
		unsafeWindow.moveMap(0,1);
	if (MapCenter == 12)
		unsafeWindow.moveMap(0,1);
	if (MapCenter == 13)
		unsafeWindow.moveMap(-1,0);
	if (MapCenter == 14)
		unsafeWindow.moveMap(-1,0);
	if (MapCenter == 15)
		unsafeWindow.moveMap(-1,0);
	if (MapCenter == 16)
		unsafeWindow.moveMap(-1,0);
	if (MapCenter == 17)
		unsafeWindow.moveMap(0,-1);
	if (MapCenter == 18)
		unsafeWindow.moveMap(0,-1);
	if (MapCenter == 19)
		unsafeWindow.moveMap(0,-1);
	if (MapCenter == 20)
		unsafeWindow.moveMap(0,-1);
	if (MapCenter == 21)
		unsafeWindow.moveMap(1,0);
	if (MapCenter == 22)
		unsafeWindow.moveMap(1,0);
	if (MapCenter == 23)
		unsafeWindow.moveMap(1,0);
	if (MapCenter == 24)
		unsafeWindow.moveMap(1,0);
}

function UpdateHeroStat()
{
	if (!document.getElementsByClassName('army_my').length) return;

	if (document.getElementsByClassName('army_my')[0].getElementsByTagName('h3').length == document.getElementsByClassName('army_my')[0].getElementsByTagName('script').length)
	{		
		if (top.document.getElementById('herostattxt'))
			top.document.getElementById('herostattxt').innerHTML = '-1';

		return;
	}
	
	top.document.getElementById('herostattxt').innerHTML ='';
	var obj = document.getElementsByClassName('army_l');
	if (!obj.length)
		return;

	for (var i=0;i<obj.length;i++)
	{
		var Test = /mapId=([\d]*)/.exec(obj[i].innerHTML);
		if (!Test || !Test.length) return;
		var text = Test[1];
		top.document.getElementById('herostattxt').innerHTML += Test[1];
		top.document.getElementById('herostattxt').innerHTML += ",";
	}

}

function UpdaeCityQue()
{
	if (!MapIpt)
		MapIpt = top.document.getElementById('mapIpt').innerHTML;

	/*
	if(top.document.getElementsByClassName('act_vip')[0].innerHTML.indexOf("啟動") != -1)
	{
		top.document.getElementById('mapIpt').innerHTML = MapIpt;
		return;
	}
	*/
	top.document.getElementById('mapIpt').innerHTML = '';

	top.document.getElementById('mapIpt').innerHTML = '建設中';

	var build = document.getElementsByClassName('build');
	
	for(var i=0;i<build.length;i++)
	{
		var Test = /<\/a>(.*?)<span/.exec(build[i].innerHTML);
		if (Test && Test.length)
		{
			var tid = build[i].getElementsByTagName('span')[1].id;
			top.document.getElementById('mapIpt').innerHTML += '<div> ' + Test[1] + build[i].getElementsByClassName('lv')[0].innerHTML + '<br />('+document.getElementById(tid).innerHTML+')</div>';
		}
	}

	if (top.document.getElementById('cityque').innerHTML)
	{
		var Tags = top.document.getElementById('cityque').getElementsByTagName('div');
		for(var i=0;i<Tags.length;i++)
		{
			var item = Tags[i].innerHTML.split(",");
			if (top.document.getElementById('mapIpt').innerHTML.indexOf(">"+item[2]) != -1)
			{
				var obj = top.document.getElementById('mapIpt').getElementsByTagName("div");
				if (obj && obj.length)
				{
					for(var j=0;j<obj.length;j++)
					{
						if (obj[j].innerHTML.indexOf(item[2]) == 0)
						{
							var Test = /\(([\d]*)\)/.exec(obj[j].innerHTML);
							if (Test && Test.length)
							{
								obj[j].innerHTML = item[2] +'('+ (Number(Test[1])+1) + ')';
							}
							else
							{
								obj[j].innerHTML = item[2] +'(2)';
							}
							
							obj[j].setAttribute("onclick",'this.parentNode.removeChild(this);top.document.getElementById("cityque").removeChild(top.document.getElementById("cityque").getElementsByTagName("div")['+i+']);');
						}
					}
				}
			}
			else
			{
				top.document.getElementById('mapIpt').innerHTML += '<div class="red" style="cursor:not-allowed" onclick=this.parentNode.removeChild(this);top.document.getElementById("cityque").removeChild(top.document.getElementById("cityque").getElementsByTagName("div")['+i+']);>' + item[2] +'</div>';
			}
		}
	}
	
	var obj = document.getElementsByClassName('bd_info');
	if (obj && obj.length)
	{
		var Test = /\( ([\d]*) \/ ([\d]*) \)/.exec(obj[0].innerHTML);
		if (Test && Test.length && Test[1] == Test[2]) return;
	}

	if (top.document.getElementById('cityque').innerHTML)
	{
		var id = top.document.getElementById('cityque').getElementsByTagName('div')[0];
		var item = id.innerHTML.split(",");
		top.document.getElementById("cityfrm").src = "/building"+item[0]+".ql?bid="+item[1];
	}
}

function AddCodeToQ(e)
{
	var Test = /building(.*?)\.ql\?bid=([\d]*)/.exec(window.document.location.href);
	if (!Test || !Test.length)
	{
		unsafeWindow.SimWin.alert("錯誤，請從城鎮地圖進入");return;
	}
	var code = Test[1]+","+Test[2]+",";
	var d = document.getElementsByTagName('h1')[0];
	var idx = d.innerHTML.indexOf('<');
	code += d.innerHTML.substring(0,idx);	
	
	opener.document.getElementById('cityque').innerHTML += "<div>"+code + "</div>";
	unsafeWindow.SimWin.alert("完成加入排程");
	//window.close();
}

function AutoTask()
{
	if (document.body.innerHTML.indexOf("taskdailyaward.ql?dailyItemId=") != -1)
	{
		var Test = /taskdailyaward.ql\?dailyItemId=([\d]*)/.exec(document.body.innerHTML);
		if (Test && Test.length)
		{
			top.document.getElementById("taskfrm").src = "/task/taskdailyaward.ql?dailyItemId="+Test[1]+"&from=taskdaily";
			return;
		}
	}

	if (document.body.innerHTML.indexOf("完了中") != -1)
	{
		if (!top.document.getElementById('tasklist')) return;
		top.document.getElementById('tasklist').innerHTML = '';
		for(var i=1;i<5;i++)
		{
			if (document.getElementById("bt"+i))
			{
				var obj = document.getElementById("bt"+i).parentNode.parentNode;
				
				top.document.getElementById('tasklist').innerHTML += obj.getElementsByTagName('a')[0].innerHTML+" "+document.getElementById("bt"+i).innerHTML+"<br />";
			}
		}
		setTimeout(AutoTask, 1000);
		return;
	}

	var Test = /autoTask\(([\d]*)\)/.exec(document.body.innerHTML);
	if (!Test || !Test.length) return;

	document.getElementsByName("operate")[0].value="auto";	
	document.getElementsByName("dailyItemId")[0].value = Test[1]; 
	document.getElementsByName("taskDailyForm")[0].action="/task/taskdailyitem.ql"; 
	document.getElementsByName("taskDailyForm")[0].submit();
}

function StartAutoTask()
{
	document.getElementById("taskfrm").src = "/task/taskdaily.ql";
	setTimeout(StartAutoTask, 600000);
}

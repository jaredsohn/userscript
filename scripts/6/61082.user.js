// ==UserScript==
// @name           我愛錢
// @namespace      http://s1.gb.52money.tw/tw/main.jsp
// @include        http://s1.gb.52money.tw/*
// @include        http://gb.52money.tw/*
// ==/UserScript==

var ItemLeft = 0;
var Nologout = 0;
var Counter = 0;
var AutoUPCounter = 0;
var TimeHTML = "";
var AutoNewHand = 0;
var GoodsPrice = 0;
var GoodsID = 'pNum302';
var FindFor = '';
var FindRate = 3;
var DoAutoSell = 0;
var RememberCount = 0;


Main();

function Main()
{
	if (location.href.indexOf('/loginservlet') != -1)
	{
		location.href = 'http://gb.52money.tw/login?serverID=1';
		return;
	}
	if (unsafeWindow.windowClose) unsafeWindow.windowClose = null;

	if(location.href.indexOf('user_active_dialog.jsp') != -1)
	{
		setTimeout(AutoNewUsr, 3000);
		return;
	}

	if (document.body.innerHTML.indexOf('一顆鑽石兌換 3 個小喇叭。') != -1)
	{
		document.getElementById('stone').value = 1;
	}
	
	setTimeout(Main, 1000);

	AutoOk();
	NoLogout();
	AutoMission();
	Task();
	CheckBuy();
	//AutoSendSalary();
	ReplaceQ();
	NewHand();
	AutoLVup();
	CountDistance();
	//BuyBack();
	//AutoSellItem();
	if (document.getElementsByClassName('hdMenuR right').length)
	{
		document.getElementsByClassName('hdMenuR right')[0].getElementsByTagName('dd')[1].innerHTML = 10-AutoUPCounter;
	}

	AutoUPCounter = (AutoUPCounter < 10)?AutoUPCounter+1:0;
}

function test(e)
{
	if (confirm('自動小號？'))
	{
		AutoNewHand = 6;
		alert("小號啟動："+AutoNewHand);
	}
	else
		setTimeout(log, 3000);
}

function AnalizeAutoSellItem(req)
{
	var Test = /stos=(.*);/.exec(String(req.responseText));
	if (!Test || !Test.length) return;
	var text = Test[1];
	var Item = /'外交官拉杆箱',0,(\d+),/.exec(text);
	if (!Item || !Item.length)
		Item = /'Nikko旅行包',0,(\d+),/.exec(text);
	if (!Item || !Item.length)
	{
		DoAutoSell = 0;
		if (AutoNewHand)
			AutoNewHand++;
		return;
	}

	if (Item[0].indexOf('外交官拉杆箱') != -1)
	{
		var Price = (AutoNewHand)?1978:197414;
		unsafeWindow.forward("/market?act=marketoperate&box=GameTradeItemForm&type=2&marketPrice="+Price+"&itemId="+Item[1]);
	}
	else
	{
		var Price = (AutoNewHand)?1978:99978;
		unsafeWindow.forward("/market?act=marketoperate&box=GameTradeItemForm&type=2&marketPrice="+Price+"&itemId="+Item[1]);
	}
	GM_log("Auto Sell " + Item[0]);
}
function AutoSellItem()
{
	if (!DoAutoSell) return;
	if (AutoUPCounter != 1) return;

	GM_xmlhttpRequest({
		method          : "GET",
		url             : "http://s1.gb.52money.tw/market?act=wantsale",
		headers:{'User-agent': 'Mozilla/4.0 (compatible) ','Content-type':'application/x-www-form-urlencoded'},
		onload          : function (req){AnalizeAutoSellItem(req)}
		});
}

function AnalizeSell(req)
{
	var text = String(req.responseText);
	//GM_log(text);
	if (text.indexOf('<td>'+FindFor+'</td>') != -1)
	{
		var Item = text.split('<td>'+FindFor+'</td>');
		var ItemID = /buyMarketItem\((\d+)\)/.exec(Item[1]);
		if (ItemID.length)
		{
			unsafeWindow.forward("/market?act=marketoperate&type=1&buy=buy&itemId="+ItemID[1]);
			//GM_log("Auto Buy Item");
			unsafeWindow.jq("#username").val("Auto Buy Item");
			if (FindFor == '1978')
			{
				DoAutoSell = 1;
				FindRate = 0;
			}
			if (AutoNewHand)
				AutoNewHand++;
		}
		
		FindFor = 0;
		document.getElementById("mysell").innerHTML = '';
	}
	else
	{
		var Cost = /<td>(\d+)<\/td>/.exec(text);
		if (Cost && Cost.length)
		{
			if (parseInt(Cost[1]) > parseInt(FindFor))
			{
				document.getElementById("mysell").innerHTML = '';
				FindFor = 0;
				//GM_log("Money exceed");
				unsafeWindow.jq("#username").val("Money exceed");
				FindRate = 3;
				return;
			}
			//GM_log(parseInt(Cost[1]) +">"+ parseInt(FindFor));
		}
		
		var Page = /page=(\d+)\'\);return false;">&gt;/.exec(text);
		if (!Page || !Page.length)
		{
			document.getElementById("mysell").innerHTML = '';
			//GM_log("Last Page End");
			unsafeWindow.jq("#username").val("Last Page End");
		}
		else
		{
			document.getElementById("mysell").innerHTML = Page[1];
		}
	}
}

function FindMySell(what)
{
	if (!document.getElementById("mysell")) return false;
	if (!unsafeWindow.jq) return false;
	if (FindFor != what)
	{
		FindFor = what;
		document.getElementById("mysell").innerHTML = '';
	}

	if (!document.getElementById("mysell").innerHTML)
	{
		GM_xmlhttpRequest({
            method          : "GET",
            url             : "http://s1.gb.52money.tw/market",
   			headers:{'User-agent': 'Mozilla/4.0 (compatible) ','Content-type':'application/x-www-form-urlencoded'},
            onload          : function (req){AnalizeSell(req)}
		});
		//GM_log("Start Search " + FindFor);
		unsafeWindow.jq("#username").val("Start Search " + FindFor);
	}
	else
	{
		GM_xmlhttpRequest({
            method          : "GET",
            url             : "http://s1.gb.52money.tw/market?asc=0&page="+document.getElementById("mysell").innerHTML,
   			headers:{'User-agent': 'Mozilla/4.0 (compatible) ','Content-type':'application/x-www-form-urlencoded'},
            onload          : function (req){AnalizeSell(req)}
		});
		//GM_log("Go to Page " + document.getElementById("mysell").innerHTML);
		unsafeWindow.jq("#username").val("Go to Page " + document.getElementById("mysell").innerHTML);
	}
	return false;
}

function NewHand()
{
	if (AutoUPCounter != 5) return;
	if (!document.getElementById('balance')) return;
	if (document.getElementById('balance').innerHTML == '500,000')
	{
		if (!document.getElementById('transfer_type'))
		{
			unsafeWindow.changePage('bank');
			return;
		}
		
		if (!document.getElementById('remittance').value)
		{
			unsafeWindow.refreshResource('all');
			document.getElementById('transfer_type').value = 12;
			unsafeWindow.select();
			document.getElementById('remittance').value = 5000;
			unsafeWindow.transfer();
			AutoNewHand = 1;
			return;
		}
	}
	
	if (!AutoNewHand) return false;
	if(AutoNewHand == 1)
	{
		unsafeWindow.changePage('company');
		AutoNewHand = 2;
		return;
	}
	if(AutoNewHand == 2)
	{
		if (!document.getElementById('loaner'))
		{
			unsafeWindow.forward('/bank?act=0');
			return;
		}
		if (document.getElementById('amount').value == 10000)
		{
			document.getElementById('amount').value = 100000;
			unsafeWindow.loan();
			AutoNewHand = 3;
			return;
		}
	}
	else if(AutoNewHand == 3)
	{
		document.getElementById('Queue').innerHTML = '<dl><dt>人力資源</dt><dd>等候中</dd></dl><dl><dt>產品倉庫</dt><dd>等候中</dd></dl><dl><dt>市場部</dt><dd>等候中</dd></dl><dl><dt>市場部</dt><dd>等候中</dd></dl><dl><dt>市場部</dt><dd>等候中</dd></dl><dl><dt>市場部</dt><dd>等候中</dd></dl>';
		AutoNewHand = 4;
		return;
	}
	else if(AutoNewHand == 4 && document.getElementById('Queue').innerHTML == '')
	{
		var obj = document.getElementsByClassName("clear overflow center");
		if (!obj || !obj.length)
		{
			unsafeWindow.forward('/hrdept');
			return;
		}
		else
		{
			var EMP = /employ\((\d+),/.exec(obj[0].innerHTML);
			if (EMP)
			{
				unsafeWindow.employ(EMP[1],0);
				AutoNewHand = 5;
				return;
			}
		}
	}
	else if(AutoNewHand == 5)
	{
		if (!document.getElementById('pName302'))
		{
			unsafeWindow.forward('/areainfo?mapId='+((38+501)*10000+(-33+501))+'');
		}
		else
		{
			var Money1 = parseInt(document.getElementById('pName302').parentNode.getElementsByTagName("span")[1].innerHTML);
			var Money2 = parseInt(document.getElementById('pName402').parentNode.getElementsByTagName("span")[1].innerHTML);
			var Money3 = parseInt(document.getElementById('pName102').parentNode.getElementsByTagName("span")[1].innerHTML);
			var Money4 = parseInt(document.getElementById('pName202').parentNode.getElementsByTagName("span")[1].innerHTML);

			if (Money1 < 1801)
			{
				document.getElementById('pNum302').value = 10;
				GoodsPrice = document.getElementById('pPrice302').value;
				GoodsID = 'pPrice302';
				unsafeWindow.warePurchase(302);
			}
			else if(Money2 < 1501)
			{
				document.getElementById('pNum402').value = 10;
				GoodsPrice = document.getElementById('pPrice402').value;
				GoodsID = 'pPrice402';
				unsafeWindow.warePurchase(402);
			}
			else if(Money3 < 1253)
			{
				document.getElementById('pNum102').value = 15;
				GoodsPrice = document.getElementById('pPrice102').value;
				GoodsID = 'pPrice102';
				unsafeWindow.warePurchase(102);
			}
			else if(Money4 < 1253)
			{
				document.getElementById('pNum202').value = 15;
				GoodsPrice = document.getElementById('pPrice202').value;
				GoodsID = 'pPrice202';
				unsafeWindow.warePurchase(202);
			}
			AutoNewHand = 6;
		}
		return;
	}
	else if(AutoNewHand == 6)
	{
		var obj = document.getElementsByClassName('postoffice_items sys_table');
		if (!obj || !obj.length)
		{
			if (document.getElementById(GoodsID) && GoodsPrice != document.getElementById(GoodsID).value)
			{
				alert(GoodsPrice +'!='+document.getElementById(GoodsID).value)
				AutoNewHand = 0;
				return;
			}
			unsafeWindow.forward('/postOffice?act=2');
		}
		else
		{
			var ITEM = /itemID=(\w+)/.exec(obj[0].innerHTML);
			if (!ITEM || !ITEM[0])
			{
				unsafeWindow.forward('/postOffice?act=4');
				AutoNewHand = 7;
			}
			else
			{
				unsafeWindow.forward('/postOffice?act=3&itemID='+ITEM[1]+'&temp=receiveItem');
			}
		}
		return;
	}
	else if(AutoNewHand == 7)
	{
		var obj = document.getElementsByClassName('postoffice_items sys_table');
		if (!obj || !obj.length)
		{
			unsafeWindow.forward('/postOffice?act=4');
		}
		else
		{
			var ITEM = /receiveWareforward\((\d+)/.exec(obj[0].innerHTML);
			if (!ITEM || !ITEM[0])
			{
				unsafeWindow.changePage('employee');
				AutoNewHand = 8;
			}
			else
			{
				unsafeWindow.receiveWareforward(ITEM[1]);
			}
		}
	}
	else if(AutoNewHand == 8)
	{
		if (!document.getElementById('inners'))
			unsafeWindow.changePage('employee');
		else
		{
			var HTML = document.getElementById('inners').innerHTML;
			if (HTML.indexOf('電動車') != -1)
			{
				var ITEM = /'電動車',0,(\d+),/.exec(HTML);
				unsafeWindow.item_handle('',0,ITEM[1],'',0,0,4,8);
			}
			else if (HTML.indexOf('小型貨櫃') != -1)
			{
				var ITEM = /'小型貨櫃',0,(\d+),/.exec(HTML);
				unsafeWindow.item_handle('',0,ITEM[1],'',0,0,4,8);
			}
			else if (HTML.indexOf('雙倍經驗卡') != -1)
			{
				var ITEM = /'雙倍經驗卡',0,(\d+),/.exec(HTML);
				unsafeWindow.forward("/employee?act=8&emplID=0&itemID="+ITEM[1]+"&type=1");
			}
			else
			{
				unsafeWindow.changePage('map');
				AutoNewHand = 9;
			}
		}
	}
	else if (AutoNewHand == 9)
	{
		if (!document.getElementById('res_list'))
			unsafeWindow.changePage('map');
		else if (!document.getElementById('res_list').getElementsByTagName('a') || !document.getElementById('res_list').getElementsByTagName('a')[0])
		{
			unsafeWindow.switchSearchType(document.getElementsByClassName('purple')[0],5,0);
		}
		else
		{
			var obj = document.getElementById('res_list').getElementsByTagName('a');
			var min = 999;
			var tag = 0;
			for(i=0;i<obj.length;i++)
			{
				var Dist = /(\d+)/.exec(obj[i].innerHTML);
				if (parseInt(Dist[1]) < min)
				{
					min = parseInt(Dist[1]);
					tag = i;
				}
			}
			var CLICK = /mapId=(\d+)/.exec(obj[tag].getAttribute("onclick"));
			unsafeWindow.forward('/dispatchemp?type=2&mapId='+CLICK[1]);
			AutoNewHand = 10;
		}
	}
	else if (AutoNewHand == 10)
	{
		VAL = document.getElementsByName('proNums');
		if (!VAL || !VAL.length)
		{
			AutoNewHand = 9;
			return;
		}
		else
		{
			var F = document.getElementsByName('jobform')[0].getElementsByTagName('input')[0];
			F.checked = true;
			unsafeWindow.checkEmp(F.id,100)
			VAL[0].value = (GoodsID=='pPrice302' || GoodsID=='pPrice402')?10:15;
			unsafeWindow.checkProNum(VAL[0],VAL[0].value);
			unsafeWindow.formsubmit();
			document.getElementById('Queue').innerHTML = '<dl><dt>市場部</dt><dd>等候中</dd></dl>';
			AutoNewHand = 11;
		}
	}
	else if (AutoNewHand == 11)
	{
		if (!unsafeWindow.exspeaker)
			unsafeWindow.forward('/store');
		else
		{
			unsafeWindow.exspeaker();
			AutoNewHand = 12;
		}
	}
	else if (AutoNewHand == 12)
	{
		if (!document.getElementById('Queue').innerHTML)
		{
			unsafeWindow.refreshResource('all');
			unsafeWindow.fastup()
			AutoNewHand = 13;
		}
	}
	else if (AutoNewHand == 13 || AutoNewHand == 14)
	{
		unsafeWindow.refreshResource('all');
		FindMySell('197414');
	}
	else if (AutoNewHand == 15)
	{
		unsafeWindow.refreshResource('all');
		FindMySell('99978');
	}
	else if (AutoNewHand == 16)
	{
		DoAutoSell = 1;
	}
	else if (AutoNewHand == 17)
	{
		AutoNewHand = 0;
	}

}
function AutoNewUsr()
{
	if (!document.getElementById('user_name'))
	{
		return;
	}
	var RndValue = "gb" + Math.floor(Math.random()*32768);

	document.getElementById('user_name').value = RndValue;
	document.getElementById('bloc_name').value = RndValue;
	document.getElementById('bloc_describe').value = RndValue;
	document.getElementById('radio_1').click();
	
	document.getElementsByName('frmActivation')[0].submit();
}
function AutoSendSalary()
{
	if (!document.getElementById('bodyemplhead')) return;
	if (!document.getElementById('bodyemplhead').getElementsByClassName("btn49 bold")[0]) return;
	if (document.getElementById('bodyemplhead').getElementsByClassName("btn49 bold")[0].innerHTML != "已發放")
	{
		document.getElementById('bodyemplhead').getElementsByClassName("btn49 bold")[0].innerHTML = "已發放";
		unsafeWindow.batchSendSalary();
	}
}

function CheckBuy()
{
	if (document.getElementById('bigMar_table'))
	{
		if (!document.getElementById('bigMar_table').getElementsByTagName("tr"))
			return;
		for(i=1;i<=12;i++)
		{
			if (!document.getElementById('bigMar_table').getElementsByTagName("tr")[i]) return;
			
			var mytags = document.getElementById('bigMar_table').getElementsByTagName("tr")[i].getElementsByTagName("td");
			var id = mytags[1].id;
			id = id.replace('pName','pPrice');
			if (document.getElementById(id) && !document.getElementById(id).value)
				document.getElementById(id).value = mytags[3].getElementsByTagName("span")[0].innerHTML;
		}
		return;
	}

	var TotalWeight = 0;
	var MinPower = 9999;
	var obj = document.getElementById("shadeRight");
	if (!obj) return;
	
	if (obj.getElementsByClassName('clear left')[0])
	{
		var Items = /;(\d+)/.exec(obj.getElementsByClassName('clear left')[0].innerHTML);
		if (Items && Items[1])
		{
			ItemLeft = Items[1];
			if (obj.getElementsByClassName('btn38').length && obj.getElementsByClassName('btn38')[0].href == "javascript:purchaseCheck();")
				unsafeWindow.purchaseCheck();
		}
		return;
	}
	if (obj.getElementsByClassName('dept_hr_emp'))
	{
		var mytags = obj.getElementsByClassName('dept_hr_emp')
		for (var i=0;i<mytags.length;i++)
		{
			var valuetag = mytags[i].getElementsByClassName("info")[1].getElementsByClassName("value");
			if (!valuetag) return;
			if (mytags[i].getElementsByTagName("input")[0].checked == true)
			{
				var Weight = valuetag[valuetag.length-1].innerHTML;
				TotalWeight += parseInt(Weight);
				var Power = valuetag[valuetag.length-2].innerHTML;
				if (parseInt(Power) < MinPower)
					MinPower = parseInt(Power);
			}
		}
		if (!TotalWeight) return;
		if (document.getElementsByName("money")[0])
			document.getElementsByName("money")[0].value = TotalWeight*10;

		if (document.getElementById('planRun'))
		{
			var Count = (ItemLeft/TotalWeight > MinPower/2)?Math.floor(MinPower/2):Math.floor(ItemLeft/TotalWeight+0.99);
			if (Count == RememberCount) return;
			document.getElementById('planRun').value = Count;
			RememberCount = Count;
		}
	}
	else
		RememberCount = 0;

}


function Task()
{
	var obj = document.getElementById("task");
	if (!obj) return;
	var mytags = obj.getElementsByTagName("dl");
	for (var i=0;i<mytags.length;i++)
	{
		if(mytags[i].title)
		{
			if (mytags[i].innerHTML.indexOf(mytags[i].title) == -1)
				mytags[i].getElementsByTagName("a")[0].innerHTML = mytags[i].title + mytags[i].getElementsByTagName("a")[0].innerHTML;
		}
		
		if(AutoUPCounter == 2 && mytags[i].innerHTML.indexOf('showMission') != -1)
		{
			var click = mytags[i].getElementsByTagName('a')[0].getAttribute("onclick");
			var MI = /\('(.*)', '(.*)'\)/.exec(click);
			if (MI)
			{
				mytags[i].parentNode.removeChild(mytags[i]);
				unsafeWindow.showMission(MI[1],MI[2]);
				break;
			}
		}
	}
	
	if (!document.getElementById('TaskQueue'))
	{
		var newdiv = document.createElement('div');
		newdiv.setAttribute('id','TaskQueue');
		document.getElementById("task").appendChild(newdiv);
		document.getElementById("TaskQueue").addEventListener('click', DelQue, false);
	}
	
	if (document.getElementById("TaskQueue").innerHTML != document.getElementById('Queue').innerHTML)
	{
		document.getElementById("TaskQueue").innerHTML = document.getElementById('Queue').innerHTML;
	}
	
	var Prod = document.getElementsByClassName('dept_bottom clear overflow');
	if (!Prod || !Prod.length) return;
	var Input = Prod[0].getElementsByTagName('input');
	if (!Input || !Input.length) return;
	for(i=0;i<Input.length;i++)
	{
		var ID = /(\d+)/.exec(Input[i].id);
		if (!ID || !ID.length) continue;
		var Time = /00:(\d+):00/.exec(document.getElementById('produceTime'+ID[1]).innerHTML);
		if (!Time || !Time.length) continue;
		var TotalTime = parseInt(Time[1])*Input[i].value;
		document.getElementById('produceTime'+ID[1]).innerHTML = "<span style=display:none>00:"+Time[1]+":00</span>"+parseInt(TotalTime/60)+":"+TotalTime%60+":00";
	}
}

function AutoMission()
{
	var mytags = document.getElementsByTagName("a");
	for (var i=0;i<mytags.length;i++)
	{
		if (mytags[i].innerHTML.indexOf("領取獎勵") != -1)
		{
			location.href = mytags[i].href;
			break;
		}
	}
}

function AutoOk()
{
	var mytags = document.getElementsByTagName("input");
	var obj;
	for (var i=0;i<mytags.length;i++)
	{
		if (mytags[i].value == "確定" && mytags[i].getAttribute("onclick") == "cancel()")
		{
			mytags[i].click();
			break;
		}
		if (mytags[i].value == "確認" && mytags[i].getAttribute("onclick") == "btnOk();")
		{
			mytags[i].click();
			break;
		}
		else if (mytags[i].value == "確定")
		{
			obj = mytags[i];
			if (Counter > 3)
				mytags[i].click();

			if (Counter == 0)
				document.addEventListener("keydown",function (e) { if(e.which == 32) obj.click();return false;},false);
			
			Counter++;
			if (document.getElementById("txt"))
				document.getElementById("txt").innerHTML = Counter;
		}
	}


}
function NoLogout()
{
	if (Nologout) return;
	var mytags = document.getElementsByTagName("input");
	for (var i=0;i<mytags.length;i++)
	{
		if (mytags[i].getAttribute("onclick") && mytags[i].getAttribute("onclick").indexOf("logout") != -1)
		{
			mytags[i].setAttribute("onclick",'');
			mytags[i].addEventListener('click',test, false);
			Nologout = 1;
			break;
		}
	}
	if (document.getElementById("hdSpeaker"))
	{
		document.getElementById("hdSpeaker").innerHTML += '<div id=test style=display:none></div><div id=Queue style=display:none></div><div id=mysell style=display:none></div>';
	}

	if (document.getElementsByClassName('hdMenuR right').length)
	{
		document.getElementsByClassName('hdMenuR right')[0].getElementsByTagName('dt')[0].innerHTML = '快捷：';
		document.getElementsByClassName('hdMenuR right')[0].getElementsByTagName('dd')[0].innerHTML = "<span onclick=forward('/areainfo?mapId='+((38+501)*10000+(-33+501))+'');>大宗交易</span>";
		document.getElementsByClassName('hdMenuR right')[0].getElementsByTagName('dt')[1].innerHTML = '倒數：';
	}

}

function log()
{
	GM_log(document.body.innerHTML);
}

function GetURL(url)
{
	if (!document.getElementById("test")) return;
	if (!unsafeWindow.jq) return;
	unsafeWindow.jq("#test").load(url, function(){});
}

function FindTask(what)
{
	if (!document.getElementById(what)) return false;
	if (document.getElementById(what).innerHTML == TimeHTML)
	{
		unsafeWindow.refreshTask();
		return true;
	}
	TimeHTML = document.getElementById(what).innerHTML;
	return true;
}

function AutoLVup()
{
	if (AutoUPCounter != 9) return;
	if (!document.getElementById('TaskQueue')) return;
	var UpItem = GetFirstQue(0);
	if (UpItem == 0) return;
	if(FindTask('depttimeinfo')) return;

	var URL = "";
	if (UpItem == 1)
		URL = "/clubdept";
	else if (UpItem == 2)
		URL = "/dependdept";
	else if (UpItem == 3)
		URL = "/researchdept";
	else if (UpItem == 4)
		URL = "/producedept";
	else if (UpItem == 5)
		URL = "/hrdept";
	else if (UpItem == 6)
		URL = "/traindept";
	else if (UpItem == 7)
		URL = "/marketdept";
	else if (UpItem == 8)
		URL = "/productstoragedept";
	else if (UpItem == 9)
		URL = "/resourcestoragedept";

	if (document.getElementsByClassName('dept_level_right right').length)
	{
		unsafeWindow.deptup(URL+'?act=up');
		GetFirstQue(1);
	}
	else
	{
		unsafeWindow.forward(URL);
		unsafeWindow.refreshTask();
	}
	return;
}

function ReplaceQ()
{
	var obj = document.getElementsByClassName('dept_logo left');
	if (!obj.length) return;
	obj[0].addEventListener('click',EnQue, false);
}

function EnQue(e)
{
	var obj = document.getElementsByClassName('pic_market_caituan');

	document.getElementById('Queue').innerHTML += '<dl><dt>'+obj[0].alt+'</dt><dd>等候中</dd></dl>';
	document.getElementById("TaskQueue").innerHTML = document.getElementById('Queue').innerHTML;
}

function DelQue(e)
{
	var el = e.target.parentNode;
	el.parentNode.removeChild(el);
	
	document.getElementById('Queue').innerHTML = document.getElementById("TaskQueue").innerHTML;
}


function GetFirstQue(del)
{
	if (!document.getElementById('Queue').innerHTML) return 0;
	
	var obj = document.getElementById('Queue').getElementsByTagName('dt');
	if (!obj || !obj.length) return 0;

	if (del)
	{
		var el = obj[0].parentNode;
		el.parentNode.removeChild(el);
	}
	if(obj[0].innerHTML == "人力資源")
		return 5;
	if(obj[0].innerHTML == "研發部")
		return 3;
	if(obj[0].innerHTML == "生產車間")
		return 4;
	if(obj[0].innerHTML == "休閑會所")
		return 1;
	if(obj[0].innerHTML == "培訓中心")
		return 6;
	if(obj[0].innerHTML == "市場部")
		return 7;
	if(obj[0].innerHTML == "原料倉庫")
		return 9;
	if(obj[0].innerHTML == "產品倉庫")
		return 8;
	if(obj[0].innerHTML == "保安部")
		return 2;
	
	return 0;
}

function CountDistance()
{
	if (!document.getElementById('res_list')) return;
	if (!document.getElementById('res_list').innerHTML) return;
	
	if (!document.getElementById('mapNeedle')) return;
	if (!document.getElementById('mapNeedle').innerHTML) return;
	
	
	var obj = document.getElementById('res_list').getElementsByTagName('a');
	if (!obj || obj.length == 0) return;

	var Center = /new Coordinate\(([-\d]+),([-\d]+)\)/.exec(document.getElementById('mapNeedle').innerHTML);

	for(i=0;i<obj.length;i++)
	{
		var XY = /\(([-\d]+),([-\d]+)\)/.exec(obj[i].innerHTML);
		if (XY)
		{
			var Dist = Math.pow(Center[1]-XY[1],2)+Math.pow(Center[2]-XY[2],2);
			var MapID = (parseInt(XY[1])+501)*10000 + parseInt(XY[2])+501;
			if (obj[i].innerHTML.indexOf('blue') != -1)
				obj[i].innerHTML = '<span style=color:blue>距離'+Dist+'</span>';
			else
				obj[i].innerHTML = '距離'+Dist;
			obj[i].setAttribute("onclick","forward('/areainfo?mapId="+MapID+"')");
		}
	}
}

function BuyBack()
{
	if (AutoUPCounter != 6) return;

	if (!document.getElementById('experience')) return;
	if (document.getElementById('experience').innerHTML.indexOf('小唧') == -1) return;
	
	Counter++;
	if (Counter > FindRate)
	{
		Counter = 0;
		FindMySell('1978');
	}
}

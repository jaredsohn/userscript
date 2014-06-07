// ==UserScript==
// @name           領地排程自動化
// @namespace      http://ld1.hugashaga.com.tw/
// @description    領地排程自動化
// @version        1.2
// @include        http://ld*.ya7.com.tw/*
// ==/UserScript==

var Version = 1.2;
var UserACT = "";
var UserCount = 0;

UserMain();

function UserMain()
{
	//---------------------------login page--------------------------------------------------//
	if ((window.location.href == "http://ld1.hugashaga.com.tw/" ||window.location.href ==  "http://ld1.ya7.com.tw") && document.cookie.indexOf("92682") == -1)
	{
		window.location.href = "http://ld1.ya7.com.tw/index.jsp?ref=92682";
		return;
	}
	if ((window.location.href == "http://ld2.hugashaga.com.tw/"||window.location.href ==  "http://ld1.ya7.com.tw") && document.cookie.indexOf("95202") == -1)
	{
		window.location.href = "http://ld2.ya7.com.tw/index.jsp?ref=95202";
		return;
	}

	if ((window.location.href.indexOf(".jsp") == -1 && window.location.href.indexOf(".htm") == -1) || window.location.href.indexOf("default.jsp") != -1)
	{
		var mytags = document.getElementsByTagName("a");
		for (var i=0;i<mytags.length;i++)
		{
			if (mytags[i].href == "http://ld.ya7.com.tw/register.html")
				mytags[i].href = "reg.jsp";
			if (mytags[i].href.indexOf("#1") != -1)
			{
				mytags[i].setAttribute("onclick",'document.cookie = "Monkey_user="+escape(document.form1.UserName.value)+"; expires=01/01/2099 00:00:00";document.cookie = "Monkey_pass="+document.form1.Password.value+"; expires=01/01/2099 00:00:00";document.form1.submit();');
			}
		}
		var Monkey_User = unescape(unsafeWindow.readcookie(document.cookie,"Monkey_user"));
		var Monkey_Pass = unescape(unsafeWindow.readcookie(document.cookie,"Monkey_pass"));
		if (Monkey_User) document.getElementById("UserName").value = Monkey_User;
		if (Monkey_Pass) document.getElementById("Password").value = Monkey_Pass;
		return;
	}
	//---------------------------主頁--------------------------------------------------//
	if (window.location.href.indexOf("main.jsp") != -1)
	{
		if (!document.getElementById("userque"))
		{
			document.getElementById("main_content").innerHTML ='<iframe src=hEvent.jsp id=heroEv width=0 height=0></iframe>'+
			'<iframe src=heroList.jsp id=heroStat width=0 height=0></iframe>'+
			'<div id=userque><b>排程區</b><br></div>' + document.getElementById("main_content").innerHTML;
			document.getElementById("userque").addEventListener('click', UserDelQue, false);
			document.getElementById("win").src = "city.jsp";
			document.getElementById("win").removeAttribute("scrolling");
			document.getElementById("heroEv").addEventListener("load", UserCheckHeroEV,false);
			document.getElementById("heroStat").addEventListener("load", UserCheckHeroStat,false);
			setInterval(function(){document.getElementById("heroEv").src = "hEvent.jsp";},600000);
			setInterval(UserBuildTmr,10000);
			setInterval(CheckVer,36000000);
		}
		CheckVer();
		return;
	}
	//---------------------------建設--------------------------------------------------//
	if (window.location.href.indexOf("build") != -1 && top.document.getElementById("userque"))
	{
		if (!top.document) return;
		if (top.document.getElementById("c_event").innerHTML.indexOf("建設中") == -1)
		{
			setTimeout(UserMain, 500);
			return;
		}
		var mytags = document.getElementById("submain").getElementsByTagName("th");
		for (var i=0;i<mytags.length;i++)
		{
			var IDx = mytags[i].innerHTML.indexOf("toBuild(");
			var IsTemple = (mytags[i].innerHTML.indexOf("shrines.jsp") == -1)?false:true;
			if (IDx != -1 && !IsTemple)
			{
				var ID = mytags[i].innerHTML.substr(IDx+8,2);
				if ( ID.indexOf(")") != -1)
				{
					ID = ID.substr(0,1);
				}

				mytags[i].innerHTML = "<a href='#"+ID+"'>排程</a>";
				mytags[i].addEventListener('click', UserEnque, false);
			}
		}
		mytags = document.getElementById("submain").getElementsByTagName("td");
		for (var i=0;i<mytags.length;i++)
		{
			var IDx = mytags[i].innerHTML.indexOf("toBuild(");
			if (IDx != -1)
			{
				var ID = mytags[i].innerHTML.substr(IDx+8,2);
				if ( ID.indexOf(")") != -1)
				{
					ID = ID.substr(0,1);
				}
				mytags[i].innerHTML = "<a href='#"+ID+"'>排程</a>";
				mytags[i].addEventListener('click', UserEnque, false);
			}
		}
		return;
	}
	//---------------------------研發--------------------------------------------------//
	if (window.location.href.indexOf("technical") != -1 && top.document.getElementById("userque"))
	{
		if (!top.document) return;
		if (top.document.getElementById("c_event").innerHTML.indexOf("研究中") == -1)
		{
			setTimeout(UserMain, 500);
			return;
		}

		var mytags = document.getElementById("submain").getElementsByTagName("th");
		for (var i=0;i<mytags.length;i++)
		{
			var IDx = mytags[i].innerHTML.indexOf("toResearch(");
			if (IDx != -1)
			{
				var ID = mytags[i].innerHTML.substr(IDx+11,2);
				if ( ID.indexOf(")") != -1)
				{
					ID = ID.substr(0,1);
				}
				mytags[i].innerHTML = "<a href='#"+ID+"'>排程</a>";
				mytags[i].addEventListener('click', UserEnque, false);
			}
		}
		mytags = document.getElementById("submain").getElementsByTagName("td");
		for (var i=0;i<mytags.length;i++)
		{
			var IDx = mytags[i].innerHTML.indexOf("toResearch(");
			if (IDx != -1)
			{
				var ID = mytags[i].innerHTML.substr(IDx+11,2);
				if ( ID.indexOf(")") != -1)
				{
					ID = ID.substr(0,1);
				}
				mytags[i].innerHTML = "<a href='#"+ID+"'>排程</a>";
				mytags[i].addEventListener('click', UserEnque, false);
			}
		}
		return;
	}
	//---------------------------鍛造--------------------------------------------------//
	if (window.location.href.indexOf("smith") != -1 && top.document.getElementById("userque"))
	{
		if (!top.document) return;
		if (top.document.getElementById("c_event").innerHTML.indexOf("鍛造中") == -1)
		{
			setTimeout(UserMain, 500);
			return;
		}
		var mytags = document.getElementById("submain").getElementsByTagName("th");
		mytags[1].innerHTML = mytags[1].innerHTML + "&nbsp;&nbsp;<a href=#1 id=addq>加入排程</a>";
		document.getElementById("addq").addEventListener('click', UserEnque, false);
		return;
	}
	//---------------------------陣形--------------------------------------------------//
	if (window.location.href.indexOf("deploy.html") != -1 && top.document.getElementById("userque"))
	{
		var str = GM_getValue("HugashagaList");
		if (str)
		{
			var List = str.split("\n");
		    for(var i=0;i<9999;i++)
		    {
				if (!List[i]) break;
				var IDCode = List[i].split(",");
				document.getElementById("submain").innerHTML += "<a href=#1 onclick=\"document.getElementById('txf').value='"+IDCode[1]+"';document.getElementById('codeid').value='"+IDCode[0]+"';document.getElementById('code').value=document.getElementById('txf').value\">["+IDCode[0]+"]</a> ";
			}
		}

		document.getElementById("submain").innerHTML += "<hr /><b> 自訂陣形 </b> <input id=codeid size=8 value='錐形陣'> <input id=code size=40> <input type=button value='新增' id=addnew> <input type=button value='刪除' id=delit>";
		document.getElementById("addnew").addEventListener('click', UserAddCode, false);
		document.getElementById("delit").addEventListener('click', UserDelCode, false);
		return;
	}
	//---------------------------地圖--------------------------------------------------//
	if (window.location.href.indexOf("map.html") != -1 && top.document.getElementById("userque"))
	{
		var Stars = new Array("白羊座",97,96,"金牛座",19,19,"獅子座",125,60,"天蠍座",81,195,"巨蟹座",163,178,"摩羯座",28,47,"雙子座",31,105,"水瓶座",22,124,"雙魚座",188,199,"射手座",163,165,"天秤座",169,55,"處女座",161,48,
				"暗之白羊座",333,333,"暗之金牛座",355,355,"暗之獅子座",175,175);
		var str="<hr />";
		for(var i=0;i<15;i++)
		{
			str+='<a href=javascript:document.getElementById("xxx").value='+Stars[i*3+1]+';document.getElementById("yyy").value='+Stars[i*3+2]+';go2(); style="color:blue">['+Stars[i*3]+']</a>&nbsp;&nbsp;';
		}
		document.getElementById("submain").innerHTML += str;
		return;
	}
	//---------------------------伐木--------------------------------------------------//
	if (window.location.href.indexOf("rw2.jsp") != -1 && top.document.getElementById("userque"))
	{
		document.getElementById("submain").innerHTML =document.getElementById("submain").innerHTML
		 + '<table border="0" cellspacing="0" cellpadding="0" class="table_style3"><tr><td align=center><a id=usrwoodcut style="cursor:pointer">伐木10分鐘 加入排程</a> <input size=2 id=time name=time value=1>次</td></tr></table>';
		
		document.getElementById("usrwoodcut").addEventListener('click', UserEnque, false);
		return;
	}
	//---------------------------修煉--------------------------------------------------//
	if (window.location.href.indexOf("rw1.jsp") != -1 && top.document.getElementById("userque"))
	{
		document.getElementById("submain").innerHTML =document.getElementById("submain").innerHTML
		 + '<table border="0" cellspacing="0" cellpadding="0" class="table_style3"><tr><td align=center><a id=usrwoodcut style="cursor:pointer">修煉1小時 加入排程</a> <input size=2 id=time name=time value=1>次</td></tr></table>';
		
		document.getElementById("usrwoodcut").addEventListener('click', UserEnque, false);
		return;
	}
	//---------------------------搜尋--------------------------------------------------//
	if (window.location.href.indexOf("selHero.jsp?et=3") != -1 && top.document.getElementById("userque"))
	{
		mytags = document.getElementById("submain").getElementsByTagName("tr");
		for (var i=0;i<mytags.length;i++)
		{
			if (mytags[i].getAttribute("onclick"))
			{
				var IDx1 = mytags[i].getAttribute("onclick").indexOf("('");
				var IDx2 = mytags[i].getAttribute("onclick").indexOf("',");
				var ID = mytags[i].getAttribute("onclick").substr(IDx1+2,IDx2-IDx1-2);
				var PIDx3 = mytags[i].getAttribute("onclick").indexOf(")");
				var PID = mytags[i].getAttribute("onclick").substr(IDx2+2,PIDx3-IDx2-2);

				mytags[i].setAttribute("onclick",'var tt=prompt("請輸入次數",1);if (tt == null) return;if (tt > 0) {var str="<a id=#searchit'+PID+'-'+ID+'>'+ID+'搜索("+tt+")</a>&nbsp;&nbsp;";top.document.getElementById("userque").innerHTML += str;top.document.getElementById("heroStat").src = "heroList.jsp";}');
			}
		}
		return;
	}
	//---------------------------冒險--------------------------------------------------//
	if (document.getElementById("h6") && !top.document.getElementById("userque"))
	{
		var UserRND = Math.floor(Math.random() * 10);
		UserACT = unsafeWindow.act1;
		if (UserRND >= 9)
			unsafeWindow.attack(2);
		else
			unsafeWindow.attack(1);

		UserCount = 0;
		setTimeout(UserFightTick, 300);
	}
}

function UserFightTick()
{
	if (unsafeWindow.timer6)
	{
		clearTimeout(unsafeWindow.timer6);
		unsafeWindow.fp();
	}
	else if (unsafeWindow.timer7)
	{
		clearTimeout(unsafeWindow.timer7);
		unsafeWindow.fp();
	}
	else if (UserACT != unsafeWindow.act1)
	{
		UserACT = 'undefined';
		unsafeWindow.act1 = 'undefined'
		document.getElementById("h6").innerHTML = unsafeWindow.hp1;
		document.getElementById("h1").innerHTML = unsafeWindow.hp2;
		for(var i=1;i<=4;i++)
		{
			document.getElementById("b"+i).disabled=false;
		}

		UserMain();
	}
	else if (UserCount > 67)
	{
		unsafeWindow.fp();
	}
	else
	{
		setTimeout(UserFightTick, 300);
		UserCount++;
	}
}

function UserDelQue(e)
{
	if (e.target.id.indexOf("#") == -1) return;
	var str = "<b>排程區</b><br>";
	var DelOne = 0;
	var mytags = document.getElementById("userque").getElementsByTagName("a");
	for (var i=0;i<mytags.length;i++)
	{
		if (DelOne != 1 && e.target.id == mytags[i].id && e.target.innerHTML == mytags[i].innerHTML)
		{
			DelOne = 1;
		}
		else
		{
			str += "<a id="+mytags[i].id+">"+mytags[i].innerHTML+"</a>&nbsp;&nbsp;";
		}
	}
	document.getElementById("userque").innerHTML = str;
}
function UserEnque(e)
{
	if (e.target.href.indexOf("build") != -1)
	{
		var IDx = e.target.href.indexOf("#");
		if (top.document.getElementById("userque"))
		{
			var ID = e.target.href.substr(IDx+1);
			top.document.getElementById("userque").innerHTML = top.document.getElementById("userque").innerHTML + "<a id=#build"+ID+">"+UserGetTechName(ID)+"</a>&nbsp;&nbsp;";
		}
		return;
	}
	if (e.target.href.indexOf("technical") != -1)
	{
		var IDx = e.target.href.indexOf("#");
		if (top.document.getElementById("userque"))
		{
			var ID = e.target.href.substr(IDx+1);
			top.document.getElementById("userque").innerHTML = top.document.getElementById("userque").innerHTML + "<a id=#technical"+ID+">"+UserGetTechName(ID)+"</a>&nbsp;&nbsp;";
		}
		return;
	}
	if (e.target.href.indexOf("smith") != -1)
	{
		if (top.document.getElementById("userque") && document.getElementById("num").value)
		{
			var ID = document.getElementById("type").value;
			var NUM = document.getElementById("num").value;
			var NAME = unsafeWindow.name[ID];
			top.document.getElementById("userque").innerHTML = top.document.getElementById("userque").innerHTML + "<a id=#smith"+ID+"-"+NUM+">"+NAME+"("+NUM+")</a>&nbsp;&nbsp;";
		}
		return;
	}
	if (window.location.href.indexOf("rw2") != -1)
	{
		var IDx = window.location.href.indexOf("hid=");
		var ID = window.location.href.substr(IDx+4);
		var Namex = document.body.innerHTML.indexOf("你確定要派 ");
		var Namex2 = document.body.innerHTML.indexOf(" 去伐木");
		var Name = document.body.innerHTML.substr(Namex+6,Namex2-Namex-6);
		if (top.document.getElementById("userque"))
		{
			var Time = document.getElementById("time").value;
			if (Number(Time) > 0)
			{
				top.document.getElementById("userque").innerHTML += "<a id=#woodcuts"+ID+"-"+Name+">"+Name+"伐木("+Time+")</a>&nbsp;&nbsp;";
				top.document.getElementById("heroEv").src = "hEvent.jsp";
				window.location.href = "selHero.jsp?et=2";
			}
		}
		return;
	}
	if (window.location.href.indexOf("rw1") != -1)
	{
		var IDx = window.location.href.indexOf("hid=");
		var ID = window.location.href.substr(IDx+4);
		var Namex = document.body.innerHTML.indexOf("你確定要派 ");
		var Namex2 = document.body.innerHTML.indexOf(" 去修煉");
		var Name = document.body.innerHTML.substr(Namex+6,Namex2-Namex-6);
		if (top.document.getElementById("userque"))
		{
			var Time = document.getElementById("time").value;
			if (Number(Time) > 0)
			{
				top.document.getElementById("userque").innerHTML += "<a id=#expupups"+ID+"-"+Name+">"+Name+"修煉("+Time+")</a>&nbsp;&nbsp;";
				top.document.getElementById("heroEv").src = "hEvent.jsp";
				window.location.href = "selHero.jsp?et=1";
			}
		}
		
		return;
	}

	alert("不應該出現這個");
}

function UserGetTechName(ID)
{
	var mytags = document.getElementById("submain").getElementsByTagName("tr");
	for (var i=0;i<mytags.length;i++)
	{
		var IDx = mytags[i].innerHTML.indexOf("#"+ID);
		if (IDx != -1)
		{
			IDx = mytags[i].innerHTML.indexOf("<br>");
			var IDs = mytags[i].innerHTML.indexOf("<td>");
			if (IDs == -1)
				IDs = mytags[i].innerHTML.indexOf("<th>");
			
			var ID = mytags[i].innerHTML.substr(IDs+4,IDx-IDs-4);
			return ID;
		}
	}
	return undefined;
}

function UserBuildTmr()
{
	var str = "<b>排程區</b><br>";
	if (!document.getElementById("userque")) return;
	if (document.getElementById("userque").innerHTML == str) return;
	if (document.getElementById("userque").innerHTML.indexOf("build") != -1 && document.getElementById("c_event").innerHTML.indexOf("建設中") == -1)
	{
		var ID = "";
		ID = UserDelFirstQue("build");
		if (ID != "")
		{
			var IDx = ID.indexOf("build");
			var ID = Number(ID.substr(IDx+5));
			document.getElementById("c_event").innerHTML += "建設中";
			unsafeWindow.callServer("toBuild("+ID+")","refresh_p");
			return;
		}
	}

	if (document.getElementById("userque").innerHTML.indexOf("technical") != -1 && document.getElementById("c_event").innerHTML.indexOf("研究中") == -1)
	{
		var ID = "";
		ID = UserDelFirstQue("technical");
		if (ID != "")
		{
			var IDx = ID.indexOf("technical");
			var ID = Number(ID.substr(IDx+9));
			document.getElementById("c_event").innerHTML += "研究中";
			unsafeWindow.callServer("toResearch("+ID+")","refresh_p");
			return;
		}
	}

	if (document.getElementById("userque").innerHTML.indexOf("smith") != -1 && document.getElementById("c_event").innerHTML.indexOf("鍛造中") == -1)
	{
		var ID = "";
		ID = UserDelFirstQue("smith");
		if (ID != "")
		{
			var IDx = ID.indexOf("smith");
			var IDx2 = ID.indexOf("-");
			var type = Number(ID.substr(IDx+5,IDx2-IDx-5));
			var num = Number(ID.substr(IDx2+1));
			document.getElementById("c_event").innerHTML += "鍛造中";
			unsafeWindow.callServer("smith("+num+","+type+")","refresh_p");
			return;
		}
	}

	//document.getElementById("gem").innerHTML = (Number(document.getElementById("gem").innerHTML) + 1) % 3600;
}

function UserDelFirstQue(type)
{
	var str = "<b>排程區</b><br>";
	var DelOne = 0;
	var ID = "";
	var mytags = document.getElementById("userque").getElementsByTagName("a");
	for (var i=0;i<mytags.length;i++)
	{
		if (mytags[i].id.indexOf(type) == -1 || DelOne == 1)
		{
			str += "<a id="+mytags[i].id+">"+mytags[i].innerHTML+"</a>&nbsp;&nbsp;";
		}
		else
		{
			ID = mytags[i].id;
			DelOne = 1;
		}
	}
	document.getElementById("userque").innerHTML = str;
	return ID;
}

function UserCheckHeroEV()
{
	if (!document.getElementById("userque")) return;
	document.getElementById("heroStat").src = "heroList.jsp";
}

function UserCheckHeroStat()
{
	var str = "<b>排程區</b><br>";
	var DelOne = 0;
	var ID = "";
	var mytags = document.getElementById("userque").getElementsByTagName("a");
	for (var i=0;i<mytags.length;i++)
	{
		if (DelOne != 1 && (mytags[i].id.indexOf("woodcuts") != -1 || mytags[i].id.indexOf("searchit") != -1 || mytags[i].id.indexOf("expupups") != -1))
		{
			var IDx = mytags[i].id.indexOf("-");
			var Name = mytags[i].id.substr(IDx+1);
			var IDx2 = mytags[i].id.indexOf("-");
			var UID = mytags[i].id.substr(9,IDx2-9);
			mytags2 = document.getElementById("heroStat").contentDocument.getElementsByTagName("tr");
			for (var j=0;j<mytags2.length;j++)
			{
				if (!mytags2[j].getAttribute("onclick")) continue;
				if (mytags2[j].getAttribute("onclick").indexOf(UID) == -1) continue;
				if (mytags2[j].innerHTML.indexOf(Name) == -1) continue;
				if (mytags2[j].innerHTML.indexOf("空閑") == -1)
				{
					str += "<a id="+mytags[i].id+">"+mytags[i].innerHTML+"</a>&nbsp;&nbsp;";
					break;
				}
				var TimeX1 = mytags[i].innerHTML.indexOf("(");
				var TimeX2 = mytags[i].innerHTML.indexOf(")");
				var Time = Number(mytags[i].innerHTML.substr(TimeX1+1,TimeX2-TimeX1-1));
				var Title = mytags[i].innerHTML.substr(0,TimeX1);
				Time--;
				ID = mytags[i].id;
				DelOne = 1;
				if (Time > 0)
				{
					str += "<a id="+mytags[i].id+">"+Title+"("+Time+")</a>&nbsp;&nbsp;";
				}
				break;
			}
		}
		else
		{
			str += "<a id="+mytags[i].id+">"+mytags[i].innerHTML+"</a>&nbsp;&nbsp;";
		}
	}
	if (DelOne == 0) return;
	document.getElementById("userque").innerHTML = str;

	var IDx2 = ID.indexOf("-");
	var UID = ID.substr(9,IDx2-9);
	if (ID.indexOf("woodcuts") != -1)
	{
		unsafeWindow.callServer("goLumber("+UID+",1)","refresh_p");
	}
	if (ID.indexOf("searchit") != -1)
	{
		unsafeWindow.callServer("goFind("+UID+",1)","refresh_p");
	}
	if (ID.indexOf("expupups") != -1)
	{
		unsafeWindow.callServer("goTraining("+UID+",1)","refresh_p");
	}

	setTimeout(function(){document.getElementById("heroEv").src = "hEvent.jsp";},2000);
}

function UserAddCode()
{
	if (!document.getElementById("codeid").value || !document.getElementById("code").value) return;
	if (document.getElementById("codeid").value.indexOf(",") != -1 || document.getElementById("code").value.indexOf(",") != -1)
	{
		alert("不可以用逗號");
		return;
	}
	var str = GM_getValue("HugashagaList");
	if (!str) str = "";
	str += document.getElementById("codeid").value+","+document.getElementById("code").value+"\n";
	GM_setValue("HugashagaList",str);
	window.location.href = "deploy.html";
}

function UserDelCode()
{
	if (!document.getElementById("codeid").value || !document.getElementById("code").value) return;
	if (document.getElementById("codeid").value.indexOf(",") != -1 || document.getElementById("code").value.indexOf(",") != -1)
	{
		alert("不可以用逗號");
		return;
	}
	var str = GM_getValue("HugashagaList");
	var NewStr = "";
	if (str)
	{
		var List = str.split("\n");
	    for(var i=0;i<9999;i++)
	    {
			if (!List[i]) break;
			var IDCode = List[i].split(",");
			if (IDCode[0] == document.getElementById("codeid").value && IDCode[1] == document.getElementById("code").value)
				continue;
			
			NewStr = NewStr + List[i] + "\n";
		}
	}
	GM_setValue("HugashagaList",NewStr);
	window.location.href = "deploy.html";
}

function CheckVer()
{
	GM_xmlhttpRequest({
            method          : "GET",
            url             : "http://userscripts.org/scripts/show/50140",
   			headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Content-type':'application/x-www-form-urlencoded'},
            onload          : function (req)
						{
							var text = String(req.responseText);
							if (text.indexOf("V"+Version) == -1)
							{
								if (confirm("排程程式有新版本，是否前往更新？"))
								{
									top.location.href = "http://userscripts.org/scripts/show/50140";
								}
								else
								{
									var el = document.getElementById("userque");
									el.parentNode.removeChild(el);
									alert("不更新無法使用排程，請務必前往更新程式");
								}
							}
            			}
		});
}

// ==UserScript==
// @name           NOB正方教务系统改造器
// @include        http://jxgl.hdu.edu.cn/*
// @description   为教务系统增加更多功能
// @version        2.0
// @author         Twwy
// ==/UserScript==
var formationMax = 10;
function transformSign(state){
	if(state == '') state = 0;
	switch (state){
		case 0:
			signBox = document.createElement("div");
			signBox.setAttribute("id", "signBox");
			signBox.innerHTML = '<span style="color:red;display:none;" id="formationWarn">选课队列已开启</span>&nbsp;NOB正方教务系统改造器(普通模式)';
			break;
			
		case 1:
			signBox = document.createElement("li");
			signBox.setAttribute("id", "signBox");
			signBox.innerHTML = '<span style="color:red;display:none;" id="formationWarn">选课队列已开启</span>&nbsp;NOB正方教务系统改造器(普通模式) <a id="openSetting">选项</a> ';
			break;
			
		case 2:
			signBox = document.createElement("li");
			signBox.setAttribute("id", "signBox");
			signBox.innerHTML = '<span style="color:red;display:none;" id="formationWarn">选课队列已开启</span>&nbsp;NOB正方教务系统改造器(普通模式) 上次登录:'+readOptions("xm")+' <a id="quickLogin">快速登录</a> ';
			break;
		
		case 3:	
			signBox = document.createElement("li");
			signBox.setAttribute("id", "signBox");
			signBox.innerHTML = '<span style="color:red;display:none;" id="formationWarn">选课队列已开启</span>';
			break;
			
		default:
			
		
	}
	
	return signBox;
}
function funcListen(func){
	setInterval(func,2000);
}
function xSaveAsxls( xResult , xFileName ){ 
	var ow=window.open(); 
	with(ow){ 
	  document.write(xResult); 
	  document.execCommand('Saveas', true, xFileName); 
	  close(); 
	}
}
function saveOptions(name,value){
	nowOptions = GM_getValue("options",false);
	if (nowOptions == false){
		options = new Object;
	}else{
		options = JSON.parse(nowOptions);
	}
	options[name] = value;
	GM_setValue("options",JSON.stringify(options));
}
function readOptions(name,result){
	if (typeof(result) == 'undefined') result = false;
	nowOptions = GM_getValue("options",false);
	if (nowOptions == false){
		options = new Object;
	}else{
		options = JSON.parse(nowOptions);
	}
	if (typeof(options[name]) == 'undefined'){
		saveOptions([name],result);
		return result;
	}
	else return JSON.parse(nowOptions)[name];	
}
function readFormation(){
	var formation = GM_getValue("courseFormation",false);
	if (formation == false){
		nowFormation = formation = new Array;
		GM_setValue("courseFormation",JSON.stringify(formation));
	}else{
		nowFormation = JSON.parse(formation);
	}
	return 	nowFormation;
}
function saveFormation(value){
	var formation = GM_getValue("courseFormation",false);
	var haveInsert = false;
	if (formation == false){
		nowFormation = formation = new Array;
		GM_setValue("courseFormation",JSON.stringify(formation));
	}else{
		nowFormation = JSON.parse(formation);
	}
	for(var i=0;i<formationMax;i++){
		if (typeof(nowFormation[i]) == 'undefined'){
			nowFormation[i] = value;
			GM_setValue("courseFormation",JSON.stringify(nowFormation));
			alert(nowFormation[i][2]+'['+nowFormation[i][3]+']-'+nowFormation[i][4]+'-'+nowFormation[i][5]+'   加入队列成功');
			haveInsert = true;
			break;
		}else{
			if (nowFormation[i][2] == value[2]){
				if (confirm('队列中已有 '+nowFormation[i][2]+'['+nowFormation[i][3]+']-'+nowFormation[i][4]+'-'+nowFormation[i][5]+'\n是否要用 '+value[2]+'['+value[3]+']-'+value[4]+'-'+value[5]+' 替换？') == true){
					nowFormation[i] = value;
					GM_setValue("courseFormation",JSON.stringify(nowFormation));
					alert('替换成功');
				}
				haveInsert = true;
				break;
			}
		}
	}
	if (haveInsert == false) alert('队列已满，加入失败');
	//GM_setValue("courseFormation",JSON.stringify(formation));
}
function delFormation(value){
	var formation = GM_getValue("courseFormation",false);
	var haveInsert = false;
	if (formation == false){
		nowFormation = formation = new Array;
		GM_setValue("courseFormation",JSON.stringify(formation));
	}else{
		nowFormation = JSON.parse(formation);
	}
	nowFormation.splice(value,1);
	GM_setValue("courseFormation",JSON.stringify(nowFormation));
	alert('删除成功');
}
function clearFormation(){
	if (confirm('清空整个选课队列?') == true){
		formation  = new Array;
		GM_setValue("courseFormation",JSON.stringify(formation));
	}
}
function getLocation(){
	var nowUrl = document.location.href.split("/");
	nowLocation = nowUrl[3].split("?")[0];
	return nowLocation;
}
function keepOnline(func){
	var param = "TextBox1="+readOptions("xh");
		param += "&TextBox2="+readOptions("pass");
		param += "&__VIEWSTATE="+encodeURIComponent(readOptions('__VIEWSTATE'));
		param += "&Button1=&RadioButtonList1=%D1%A7%C9%FA";	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'default2.aspx',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: param,
		onload: func
	});
}
function haveLogin(func){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'xs_main.aspx?xh='+readOptions("xh"),
		onload: func
	});
}
function navBoost(type){
	if (readOptions('navBoost') == true && type == 'add'){
		navBoostContent = document.createElement("li");
		navBoostContent.setAttribute("class", "top");
		navBoostContent.setAttribute("id", "topLinkBoost");
		navBoostContent.innerHTML = '<a class="top_link" href="#"><span class="down">菜单增强</span><ul class="sub" ></ul></a>';
		document.getElementsByTagName("ul")[1].appendChild(navBoostContent);
		var navBoostInit = new Array;
		navBoostInit[0] = {'link':'xscj_gc.aspx?xh={xh}&xm={xm}','name':'个人成绩统计(GPA)'};
		navBoostInit[1] = {'link':'xscj.aspx?xh={xh}&xm={xm}','name':'个人成绩(含卷面)'};
		navBoostInit[2] = {'link':'xsksmd.aspx?xh={xh}&xm={xm}','name':'上课班级名单'};
		navBoostInit[3] = {'link':'xsxxcx.aspx?xh={xh}&xm={xm}','name':'任意班级名单'};
		navBoostInit[4] = {'link':'xsxx.aspx?xh={xh}&xm={xm}','name':'任意学生个人信息'};
		navBoostInit[5] = {'link':'js_cxxs.aspx?zgh={xh}','name':'任意学生选课信息'};
		navBoostInit[6] = {'link':'cjcx.aspx?xh={xh}&xm={xm}','name':'任意学生成绩'};
		navBoostInit[7] = {'link':'xscjcx_wlxy.aspx?xh={xh}&xm={xm}','name':'班级整体成绩'};
		navBoostInit[8] = {'link':'xh_xskbcx.aspx?xh={xh}&xm={xm}','name':'任意学生本学期课表'};
		for(var item in navBoostInit){
			navBoostInit[item]['link'] = navBoostInit[item]['link'].replace(/{xh}/g,readOptions("xh"));
			navBoostInit[item]['link'] = navBoostInit[item]['link'].replace(/{xm}/g,readOptions("xm"));
			navBoostInitUnit = document.createElement("li");
			navBoostInitUnit.innerHTML = '<a target="zhuti" href="'+navBoostInit[item]['link']+'&gnmkdm=N121101">'+navBoostInit[item]['name']+'</a>';
			navBoostContent.getElementsByTagName("ul")[0].appendChild(navBoostInitUnit);
		}
		if(document.getElementsByTagName("ul")[1].getElementsByTagName("li")[1].getElementsByTagName("span")[0].innerHTML != ' 网上选课'){
			fixNavUnit = document.createElement("li");
			fixNavUnit.setAttribute("class", "top");
			fixNavUnit.setAttribute("id", "fixNavUnit");
			fixNavUnit.innerHTML = '<a class="top_link" href="#"><span class="down">网上选课(强行显示)</span><ul class="sub" ></ul></a>';
			document.getElementsByTagName("ul")[1].insertBefore(fixNavUnit,document.getElementsByTagName("ul")[1].getElementsByTagName("li")[1]);
			var navBoostInit = new Array;
			navBoostInit[0] = {'link':'xsxk.aspx?xh={xh}&xm={xm}','name':'选普通理论课'};
			navBoostInit[1] = {'link':'xstyk.aspx?xh={xh}&xm={xm}','name':'选体育课'};
			navBoostInit[2] = {'link':'xsxk_syxm.aspx?xh={xh}&xm={xm}','name':'选实验课'};
			navBoostInit[3] = {'link':'xsxk_sjxk.aspx?xh={xh}&xm={xm}','name':'选实践课'};
			navBoostInit[4] = {'link':'xf_xsqxxxk.aspx?xh={xh}&xm={xm}','name':'全校性公选课'};
			navBoostInit[5] = {'link':'xsxkqk.aspx?zgh={xh}','name':'学生选课情况查询'};
			for(var item in navBoostInit){
				navBoostInit[item]['link'] = navBoostInit[item]['link'].replace(/{xh}/g,readOptions("xh"));
				navBoostInit[item]['link'] = navBoostInit[item]['link'].replace(/{xm}/g,readOptions("xm"));
				navBoostInitUnit = document.createElement("li");
				navBoostInitUnit.innerHTML = '<a target="zhuti" href="'+navBoostInit[item]['link']+'&gnmkdm=N121101">'+navBoostInit[item]['name']+'</a>';
				fixNavUnit.getElementsByTagName("ul")[0].appendChild(navBoostInitUnit);
			}
		}		
		
	}
	if (readOptions('navBoost') == false && type == 'remove'){
		document.getElementById("topLinkBoost").parentNode.removeChild(document.getElementById("topLinkBoost"));
	}
}
//-改造器css-----------------------
GM_addStyle('.addFormation,#savePage,#reSavePage,#stressMode,#clearList,.delFormation,#refreshList,#other,#addFormation,#openSetting,#navBoost,#refreshState,#antiOffline,#courseFormation,#quickLogin,#version{cursor:pointer;} #transformWindow{width:480px;height:324px;border:5px solid #DDD;position:absolute;z-index:200000;display:none;background:#FFF;text-align:center;} #closeWindow{float:right;background-color:#CCC;position:absolute;z-index:999999;padding:0px 3px 0px 3px;cursor:pointer;} #leftWindow{float:left;background-color:#fff;width:144px;border-right:1px #DDD solid;height:100%;} #mainWindow{float:left;background-color:#fff;width:335px;overflow:auto;height:307px;} #stuState{float:left;background-color:#EEE;width:335px;}');
//--官方css改造---------------------
GM_addStyle('.info{width:auto;} .nav *:hover ul.sub {width: auto;} .nav *:hover ul.sub li {width: 100%;padding:0px 24px 0px 0px;}');
//-页面判断---------------------

if (document.title == 'Object moved' && readOptions("antiOffline") == true){
	antiOfflineText = document.createElement("span");
	antiOfflineText.innerHTML = '自动重新登录中...';
	document.getElementsByTagName("h2")[0].appendChild(antiOfflineText);
	keepOnline(function(){
		setTimeout(function(){  
			window.location.reload();
		},500);
	});
	return;
}
stressModeText = document.createElement("div");
stressModeText.style.top = '0px';
stressModeText.style.position = 'absolute';
stressModeText.style.zIndex = '9999';
stressModeText.style.display = 'none';
stressModeText.id = 'stressModeText';
stressModeText.innerHTML = '<span style="color:red;background:#fff;padding:2px;" id="savePage">保存页面</span><span style="color:red;background:#fff;padding:2px;display:none;" id="reSavePage">重新保存</span>';
document.getElementsByTagName("body")[0].appendChild(stressModeText);
//--课程监听以及压力模式是否开启监听---------------------------------
funcListen(function(){
	if (readOptions('courseFormation') == true){
		document.getElementById("formationWarn").style.display = 'inline';
	}else{
		document.getElementById("formationWarn").style.display = 'none';
	}
	if (readOptions('stressMode') == true){
		document.getElementById("stressModeText").style.display = 'block';
	}else{
		document.getElementById("stressModeText").style.display = 'none';
	}
});


var windowOpen = false;
switch(getLocation()){
	case '': case "default2.aspx": case "default.aspx":
		document.getElementById("TextBox1").style.width = '100px';
		document.getElementById("TextBox2").style.width = '100px';
		document.getElementById("TextBox2").parentNode.style.backgroundImage = 'none';
		document.getElementById("TextBox2").parentNode.style.textIndent = '0px';
		if (readOptions('antiOffline') == false){
			document.getElementsByTagName("form")[0].appendChild(transformSign(0));
		}else{
			document.getElementsByTagName("form")[0].appendChild(transformSign(2));
			document.getElementById("quickLogin").addEventListener('click', function(){
				keepOnline(function(responseDetails){
					if (responseDetails.responseText.match(/class=\"main_html\"/g) == null) return alert('登录失败');
					else  window.location.href = 'xs_main.aspx?xh='+readOptions("xh");
				});
			}, false);
		}
		saveOptions('__VIEWSTATE',document.getElementsByName("__VIEWSTATE")[0].value);
		break;

	case 'xs_main.aspx':
		document.getElementsByTagName("ul")[0].insertBefore(transformSign(1),document.getElementsByTagName("ul")[0].firstChild);
		document.getElementById("openSetting").addEventListener('click', function(){
			if(windowOpen == false){
				document.getElementById("transformWindow").style.display = 'block';
				transformWindow.style.left = (window.innerWidth - 480) / 2 +'px';
				transformWindow.style.top = (window.innerHeight - 324) / 3 +'px';
				windowOpen = true;
				document.getElementById("closeWindow").addEventListener('click', function(event){
					document.getElementById("transformWindow").style.display = 'none';
					windowOpen = false;			
				}, false);
			}else{
				document.getElementById("transformWindow").style.display = 'none';
				windowOpen = false;
			}
			document.getElementById("nowState").innerHTML = 'Loading...';
			document.getElementById("nowState").innerHTML = readOptions('xh')+' '+readOptions('xm');
			document.getElementById("haveLogin").innerHTML = 'Loading...';
			haveLogin(function(responseDetails){
				if (responseDetails.status == 200) document.getElementById("haveLogin").innerHTML = '已登录';
				else document.getElementById("haveLogin").innerHTML = '未登录';
			});
			document.getElementById("refreshState").addEventListener('click', function(){
				document.getElementById("haveLogin").innerHTML = 'Loading...';
				haveLogin(function(responseDetails){
					if (responseDetails.status == 200) document.getElementById("haveLogin").innerHTML = '已登录';
					else document.getElementById("haveLogin").innerHTML = '未登录';
				});
			}, false);
		}, false);
		document.addEventListener('keydown', function(event){
				if(event.keyCode != 27) return;
				document.getElementById("transformWindow").style.display = 'none';
				windowOpen = false;			
		}, false);
		
		//-获取学号和姓名----
		var xhxm = document.getElementById("xhxm").innerHTML.replace(/同学/,"").split(" ");
		saveOptions('xm',xhxm[2]);
		saveOptions('xh',xhxm[0]);
		
		//-菜单增强------------
		navBoost('add');

		break;
		
	case 'xsxjs.aspx':
		for(var item in document.getElementsByName("xkkh")){
			addFormation = document.createElement("input");
			addFormation.setAttribute("name", "addFormation");
			addFormation.setAttribute("class", "button");
			addFormation.setAttribute("type", "button");
			addFormation.setAttribute("value", "加入队列");			
			document.getElementsByName("xkkh")[item].parentNode.appendChild(addFormation);
		}
	
	
		for(var item in document.getElementsByName("addFormation")){
			document.getElementsByName("addFormation")[item].addEventListener('click', function(){
				var formationInfo = new Array;
				//formationInfo[0] = document.location.search;             //标识 理论课
				formationInfo[0] = document.location.href;             //标识 理论课
				formationInfo[1] = this.previousElementSibling.value;    //value
				formationInfo[2] = document.getElementById("Label1").innerHTML.split("&nbsp;")[0].split("：")[1];  //course name
				formationInfo[3] = this.parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;    //teacher
				formationInfo[4] = this.parentNode.parentNode.getElementsByTagName("td")[5].innerHTML;    //course time
				formationInfo[5] = this.parentNode.parentNode.getElementsByTagName("td")[6].innerHTML;    //course room
				formationInfo[6] = document.getElementsByName("__VIEWSTATE")[0].value;	//万恶的viewstate
				formationInfo[7] = false;											//是否选上
				saveFormation(formationInfo);
			}, false);
		}
		document.getElementsByTagName("body")[0].appendChild(transformSign(3));
		break;
	
	case "xstyk.aspx":
		//-框大小改造------------------------
		document.getElementById("ListBox1").setAttribute("size", "24");
		document.getElementById("ListBox2").setAttribute("size", "22");
		document.getElementById("ListBox2").style.width = '100%';
		//--加入队列选项-----------------------
		addFormation = document.createElement("div");
		addFormation.style.margin = '0px 0px 5px 0px';
		addFormation.setAttribute("id", "addFormationText");
		addFormation.innerHTML = '<input type="button" class="button" value="加入队列" />&nbsp;未选择课程';
		document.getElementById("RadioButtonList1").parentNode.insertBefore(addFormation,document.getElementById("RadioButtonList1").parentNode.firstChild);
		document.getElementById("ListBox2").addEventListener('change', function(){
			for(var item in document.getElementById("ListBox2").getElementsByTagName("option")){
				if (document.getElementById("ListBox2").getElementsByTagName("option")[item].selected == true){
					document.getElementById("addFormationText").innerHTML = '<input type="hidden" value="'+document.getElementById("ListBox2").getElementsByTagName("option")[item].value+'" id="formationValue" /><input type="button" class="button" value="加入队列" id="addFormation" />&nbsp;<span id="courseContent">'+document.getElementById("ListBox2").getElementsByTagName("option")[item].innerHTML+'</span>';
					document.getElementById("addFormation").addEventListener('click', function(){
						var formationInfo = new Array;
						formationInfo[0] = document.location.search;             //标识 理论课
						formationInfo[1] = this.previousElementSibling.value;    //value
						formationInfo[2] = document.getElementById("courseContent").innerHTML.split("‖")[0].split("-")[1];  //course name
						formationInfo[3] = document.getElementById("courseContent").innerHTML.split("‖")[2];    //teacher
						formationInfo[4] = document.getElementById("courseContent").innerHTML.split("‖")[4];    //course time
						formationInfo[5] = document.getElementById("courseContent").innerHTML.split("‖")[5];    //course room
						formationInfo[6] = document.getElementsByName("__VIEWSTATE")[0].value;	//万恶的viewstate
						formationInfo[7] = false;										//是否选上
						saveFormation(formationInfo);
					}, false);					
				}
			}
		}, false);
		document.getElementsByTagName("body")[0].appendChild(transformSign(3));
		break;
		
	case "xsxk_syxm.aspx":
		document.getElementById("ListBox1").setAttribute("size", "24");
		document.getElementById("ListBox2").setAttribute("size", "24");
		document.getElementById("ListBox2").style.height = '100%';
		document.getElementById("ListBox2").parentNode.style.width = '100%';
		addFormation = document.createElement("div");
		addFormation.style.margin = '3px 0px 5px 0px';
		addFormation.setAttribute("id", "addFormationText");
		addFormation.innerHTML = '<input type="button" class="button" value="加入队列" />&nbsp;未选择课程';
		document.getElementById("ListBox2").parentNode.insertBefore(addFormation,document.getElementById("ListBox2").parentNode.firstChild);
		document.getElementById("ListBox2").addEventListener('change', function(){
			for(var item in document.getElementById("ListBox2").getElementsByTagName("option")){
				if (document.getElementById("ListBox2").getElementsByTagName("option")[item].selected == true){
					document.getElementById("addFormationText").innerHTML = '<input type="hidden" value="'+document.getElementById("ListBox2").getElementsByTagName("option")[item].value+'" id="formationValue" /><input type="button" class="button" value="加入队列" id="addFormation" />&nbsp;<span id="courseContent">'+document.getElementById("ListBox2").getElementsByTagName("option")[item].innerHTML+'</span>';
					document.getElementById("addFormation").addEventListener('click', function(){
						//alert(this.previousSibling.value);
						var formationInfo = new Array;
						formationInfo[0] = document.location.search;             //标识 理论课
						formationInfo[1] = this.previousElementSibling.value;    //value
						formationInfo[2] = document.getElementById("courseContent").innerHTML.split("|  |")[0].split("|")[1].replace(/项目:/,'').replace(/\s/g,'');  //course name
						formationInfo[3] = document.getElementById("courseContent").innerHTML.split("|  |")[1].split("|")[0].replace(/\s/g,'');    //teacher
						formationInfo[4] = document.getElementById("courseContent").innerHTML.split("|  |")[1].split("|")[1].replace(/\s/g,'');    //course time
						formationInfo[5] = document.getElementById("courseContent").innerHTML.split("|  |")[1].split("|")[2].replace(/\s/g,'');    //course room
						formationInfo[6] = document.getElementsByName("__VIEWSTATE")[0].value;	//万恶的viewstate
						formationInfo[7] = false;										//是否选上
						saveFormation(formationInfo);						
					}, false);					
				}
			}
		}, false);
		document.getElementsByTagName("body")[0].appendChild(transformSign(3));		
		break;
	
	case 'xh_xskbcx.aspx':
		document.getElementById("Label5").innerHTML = '注:非本学期的课表会显示异常';
		document.getElementsByTagName("body")[0].appendChild(transformSign(3));
		break;
	
	case 'xsksmd.aspx':
		document.getElementById("main").previousElementSibling.style.display = 'none';
		document.getElementById("main").style.display = 'none';
		document.getElementById("bottom").style.display = 'none';
		document.getElementsByTagName("body")[0].appendChild(transformSign(3));
		break;
	
	case 'xscjcx_wlxy.aspx':
		document.getElementById("bottom").style.display = 'none';
		document.getElementsByTagName("iframe")[0].style.display = 'none';
		document.getElementsByTagName("body")[0].appendChild(transformSign(3));
		break;
		
	case 'xskbcx.aspx':
		saveXls = document.createElement("input");
		saveXls.setAttribute("class", "button");
		saveXls.setAttribute("type", "button");
		saveXls.setAttribute("value", "生成XLS文件");
		saveXls.setAttribute("id", "saveXls");
		document.getElementById("btnPrint").parentNode.appendChild(saveXls);
		/*document.getElementById("saveXls").addEventListener('click', function(){
			 //xSaveAsxls('hh', 'yyy.xls');
			//.execCommand('Saveas', true, 'heih.xls'); 
			//alert('uuu');
		}, false);*/
		//document.getElementById("saveXls").setAttribute("onclick", "document.all.WebBrowser.ExecWB(4,1)");
		document.getElementsByTagName("body")[0].appendChild(transformSign(3));
		break;
	case 'kebiao.xls':
		document.documentElement.innerHTML = 'hhha';
		document.all.WebBrowser.ExecWB(1,1);
		//document.execCommand('Saveas', true, 'hah.xls'); 
	
	default:
		document.getElementsByTagName("body")[0].appendChild(transformSign(3));
}
transformWindow = document.createElement("div");
transformWindow.id = 'transformWindow';
transformWindow.style.left = (window.innerWidth - 480) / 2 +'px';
transformWindow.style.top = (window.innerHeight - 324) / 3 +'px';
transformWindow.innerHTML = '<div id="leftWindow"><div style="height:20px;width:100%;"></div><ul><li id="navBoost"><a>菜单增强</a></li><li id="courseFormation"><a>选课队列</a></li><li id="antiOffline"><a>防掉线</a></li><li id="stressMode"><a>压力模式</a></li><li id="other"><a>辅助功能</a></li><li id="version"><a>版本信息</a></li></ul></div><div id="closeWindow">关闭</div><div id="stuState">&nbsp;&nbsp;当前状态:<span id="nowState"></span>&nbsp;<span id="haveLogin"></span>&nbsp;<a id="refreshState">刷新</a></div><div id="mainWindow">NOB正方教务系统改造器<br>作者:Twwy</div>';
document.getElementsByTagName("body")[0].appendChild(transformWindow);

document.getElementById("navBoost").addEventListener('click', function(){
	if (readOptions('navBoost') == false){
		navBoostSwitch = '';
	}else{
		navBoostSwitch = 'checked';
	}
	document.getElementById("mainWindow").innerHTML = '<input type="checkbox" id="navBoostSwitch" '+navBoostSwitch+'/>&nbsp;菜单增强开启<br />包含功能("菜单增强"选项显示,"网上选课"选项强行显示)';
	document.getElementById("navBoostSwitch").addEventListener('change', function(event){
		if(this.checked == true){
			saveOptions('navBoost',true);
			navBoost('add');
		}else{
			saveOptions('navBoost',false);
			navBoost('remove');
		}
	}, false);
	for(var item in this.parentNode.getElementsByTagName("li")){
		this.parentNode.getElementsByTagName("li")[item].style.background = '#fff';
	}
	this.style.background = '#DDD';
}, false);

document.getElementById("antiOffline").addEventListener('click', function(){
	if (readOptions('antiOffline') == false){
		antiOfflineSwitch = '';
		password = readOptions('pass',''); 
	}else{
		antiOfflineSwitch = 'checked';
		password = readOptions('pass');
	}
	document.getElementById("mainWindow").innerHTML = '<input type="checkbox" id="antiOfflineSwitch" '+antiOfflineSwitch+'/>&nbsp;防掉线开启/登录页面下侧显示"快速登录"<br />姓名:'+readOptions("xm")+'&nbsp;学号:'+readOptions("xh")+'<br />'+'密码:<input type="password" id="pass" value="'+password+'"/>&nbsp;<input type="button" value="保存" id="antiOfflineSave"><br />';
	if (readOptions('antiOffline') == false){
		document.getElementById("pass").setAttribute("disabled","disabled");
		document.getElementById("antiOfflineSave").setAttribute("disabled","disabled");
	}
	document.getElementById("antiOfflineSwitch").addEventListener('change', function(){
		if(this.checked == true){
			saveOptions('antiOffline',true);
			document.getElementById("pass").removeAttribute("disabled");
			document.getElementById("antiOfflineSave").removeAttribute("disabled");
		}else{
			saveOptions('antiOffline',false);
			document.getElementById("pass").setAttribute("disabled","disabled");
			document.getElementById("antiOfflineSave").setAttribute("disabled","disabled");
		}
	}, false);
	document.getElementById("antiOfflineSave").addEventListener('click', function(){
		saveOptions('pass',document.getElementById("pass").value);
		keepOnline(function(responseDetails){
			if (responseDetails.responseText.match(/class=\"main_html\"/g) == null) return alert('已保存,但验证登录失败,请核对密码');
			else  alert('已保存,验证登录成功');
		});			
	}, false);
	/*document.getElementById("antiOffline").addEventListener('click', function(){
		
	}, false);*/
	
	
	/*document.getElementById("navBoostSwitch").addEventListener('change', function(event){
		if(this.checked == true) saveOptions('navBoost',true);
		else saveOptions('navBoost',false);
	}, false);*/
	for(var item in this.parentNode.getElementsByTagName("li")){
		this.parentNode.getElementsByTagName("li")[item].style.background = '#fff';
	}
	this.style.background = '#DDD';	
}, false);

document.getElementById("courseFormation").addEventListener('click', function initList(){
	if (readOptions('courseFormation') == false){
		courseFormationSwitch = '';		
	}else{
		courseFormationSwitch = 'checked';
	}
	//document.getElementById("mainWindow").innerHTML = readFormation();
	formationList = readFormation();
	document.getElementById("mainWindow").innerHTML = '<div id="nowFormation" style="float:left;width:100%;text-align:left;" ><input type="checkbox" id="formationSwitch" '+courseFormationSwitch+'>开启&nbsp;当前选课队列(上限:'+formationMax+'门)&nbsp;<a id="refreshList">刷新</a>&nbsp;<a id="clearList">清空</a></div>';
	document.getElementById("refreshList").addEventListener('click', function(){
		initList();
	}, false);
	document.getElementById("clearList").addEventListener('click', function(){
		clearFormation();
		initList();
	}, false);
	document.getElementById("formationSwitch").addEventListener('click', function(){
		if(this.checked == true){
			saveOptions('courseFormation',true);
		}else{
			saveOptions('courseFormation',false);
		}
	}, false);
	for(var i=0;i<formationMax;i++){
		formationUnit = document.createElement("div");
		//saveXls.setAttribute("class", "button");
		formationUnit.style.cssFloat = 'left';
		formationUnit.style.width = '100%';
		formationUnit.style.textAlign = 'left';
		if (typeof(formationList[i]) != 'undefined'){
			formationType = formationList[i][0].split("/")[3].split("?")[0];
			switch (formationType){
				case 'xsxjs.aspx':
					formationType = '理论';
					break;
				default:
					formationType = '未知';
			}
			formationUnit.title = formationList[i][2]+'-'+formationList[i][3]+'-'+formationList[i][4];
			formationUnit.innerHTML = i+1+'.'+'['+formationType+']'+formationList[i][2]+'-'+formationList[i][3]+'&nbsp;<a class="delFormation">删除</a><input type="hidden" value="'+i+'">';
			formationUnit.getElementsByTagName("a")[0].addEventListener('click', function(){
				delFormation(this.nextElementSibling.value);
				initList();
			}, false);
		}else{
			formationUnit.innerHTML = i+1+'.空';
		}
		document.getElementById("mainWindow").appendChild(formationUnit);
		//formationLogs = document.createElement("div");
		//document.getElementById("mainWindow").
	}
	for(var item in this.parentNode.getElementsByTagName("li")){
		this.parentNode.getElementsByTagName("li")[item].style.background = '#fff';
	}
	this.style.background = '#DDD';	
}, false);

document.getElementById("stressMode").addEventListener('click', function(){
	if (readOptions('stressMode') == false){
		stressModeSwitch = '';		
	}else{
		stressModeSwitch = 'checked';
	}
	document.getElementById("mainWindow").innerHTML = '<input type="checkbox" id="stressModeSwitch" '+stressModeSwitch+' >开启压力模式';
	document.getElementById("stressModeSwitch").addEventListener('click', function(){
		if(this.checked == true){
			saveOptions('stressMode',true);
		}else{
			saveOptions('stressMode',false);
		}
	}, false);
	for(var item in this.parentNode.getElementsByTagName("li")){
		this.parentNode.getElementsByTagName("li")[item].style.background = '#fff';
	}
	this.style.background = '#DDD';	
}, false);

document.getElementById("other").addEventListener('click', function(){
	document.getElementById("mainWindow").innerHTML = '1.修正登录框<br />2.添加课表导出XLS文件功能';
	for(var item in this.parentNode.getElementsByTagName("li")){
		this.parentNode.getElementsByTagName("li")[item].style.background = '#fff';
	}
	this.style.background = '#DDD';	
}, false);

document.getElementById("version").addEventListener('click', function(){
	document.getElementById("mainWindow").innerHTML = 'NOB正方教务系统改造器v1.1';
	for(var item in this.parentNode.getElementsByTagName("li")){
		this.parentNode.getElementsByTagName("li")[item].style.background = '#fff';
	}
	this.style.background = '#DDD';	
}, false);

//alert(getLocation());
//document.getElementsByTagName("form")[0].appendChild(transformSign(0));
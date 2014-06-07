// ==UserScript==
// @name NGACN 艾泽拉斯国家地理论坛 论坛增强插件
// @namespace ngacn
// @author Linoa Feathermoon @ NGACN (莉诺雅羽月)
// @description 一个扩展NGACN论坛功能和优化显示的用户脚本，包含一些实用小功能
// @version 2.31
// @match http://bbs.ngacn.cc/*
// @include http://bbs.ngacn.cc/*
// ==/UserScript==

// 修改：lintx
// 测试：Chrome,Firefox,IE8,Opera,搜狗,傲游+178用户脚本功能测试成功

//-----------  !!! 设置项目全部从个人菜单中设置并保存于cookie中，脚本请勿修改-------
//-----------  !!! 从这里开始往下的部分请勿修改 !!!  ------



var fontchange = ngaui_getCookie("fontchange")//改变页面字体
var fontinstall = document.getElementById("fontinstalldiv"); //在脚本末尾创建一个div以判断脚本是否已经加载过  以防止在点击个人菜单时会导致的重复加载插件

//初始化设置项时的复选框是否选中状态
function getchecks(vars){
	if (vars) return "checked"; else return "";
}

//Webkit不支持input和button之外的其他元素的直接click，所以需要使用这个过程来兼容各个浏览器的click
function clickobj(obj) {
    try {
        var evt = document.createEvent("Event");
        evt.initEvent("click", true, true);
        obj.dispatchEvent(evt)
    } catch (d) {
        obj.click();
    }
}


//在个人菜单中添加插件设置
if (!fontinstall){
	while (!document.getElementById("mainmenuavatar"))
	{
		includeteme = getTime();
	}
	clickobj(document.getElementById("mainmenuavatar").parentNode);
	clickobj(document.getElementById("mainmenuavatar").parentNode);
		var menutab = document.getElementById("startmenu").getElementsByTagName("tbody")[0];
		
		var trEl = document.createElement("tr");
		menutab.appendChild(trEl);
		
		var tdElb = document.createElement("td");
		var tdEl5 = document.createElement("td");
		tdEl5.className = "last";
		tdEl5.id = "changefont";
		tdEl5.style.display = "none";
		
		var divhtml = '<div>';
		divhtml += '<div class="item"><a href="javascript:void(0);" onclick="Setsettingdiv2(\'changefont\',this);">更换字体>></a></div>';
		divhtml += '</div>';
		tdElb.innerHTML = divhtml;
		trEl.appendChild(tdElb);
		
        divhtml = '<div>';
		divhtml += '<select id="nga_fontchange" onchange="onChangefont(this)">';
          divhtml += '<option value="yahei">微软雅黑</option>';
          divhtml += '<option value="yayuan">浪漫雅圆</option>';
          divhtml += '<option value="songti">宋体</option>';
        divhtml += '</select>';
        divhtml += '<button onclick="ngaui_setCookie(\'fontchange\',this.checked);" ' + getchecks(fontchange) + ' title="改变页面字体">改变</button>';
		divhtml += '</div>';
		tdEl5.innerHTML = divhtml;
		trEl.appendChild(tdEl5);
		
}


function ngaui_setCookie(c_name,value){ //写入cookie
	var expiredays = 10000;
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}


function ngaui_getCookie(c_name){ //获取cookie
	var cookies = document.cookie.split( ';' );
	var cookie = '';
	for(var i=0; i<cookies.length; i++) {
		cookie = cookies[i].split('=');
		if(cookie[0].replace(/^\s+|\s+$/g, '') == c_name) {
			return (cookie.length <= 1) ? "" : unescape(cookie[1].replace(/^\s+|\s+$/g, ''));
		}
	}
	return "";
}

function ngaui_delCookie(c_name){ //删除cookie
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=ngaui_getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

//变更设置项table
function Setsettingdiv2(tdid,div){
	document.getElementById('changefont').style.display = 'none';
	document.getElementById(tdid).style.display = 'block';
	var settingdivs =  div.parentNode.parentNode.getElementsByTagName("div");
	for (i=0;i<settingdivs.length;i++){
		settingdivs[i].className = "item";
	}
	div.parentNode.className = "item select";
}

//建立一个div以标记插件加载完毕
if (!fontinstall){
	var fontinstallel = document.createElement("div");
	fontinstallel.style.position = "none";
	fontinstallel.id = "fontinstalldiv";
	document.getElementsByTagName("body")[0].appendChild(fontinstallel);
}

//判断选中的字体

function onChangefont(selectfont){
    var selectfont = document.getElementById("nga_fontchange"); 
    var selectedValue = selectfont.options[selectfont.selectedIndex].value;
    alert(selectedValue);
}




if (selectedValue == 'yayuan')
    {
        document.getElementById("mmc").style.fontFamily = "浪漫雅圆";//浪漫雅圆
    }
else if (selectedValue == 'yahei')
    {
        document.getElementById("mmc").style.fontFamily = "微软雅黑";//微软雅黑
    }
else if (selectedValue == 'songti')
    {
        document.getElementById("mmc").style.fontFamily = "宋体";//宋体
    }

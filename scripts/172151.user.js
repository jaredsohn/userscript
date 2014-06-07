 // ==UserScript==
// @name NGACN 艾泽拉斯国家地理论坛 论坛改变字体插件
// @namespace ngacn
// @author magicrolan @ NGACN.CC
// @description 一个改变、美化NGACN论坛字体的插件
// @version 1.1
// @match http://bbs.ngacn.cc/*
// @include http://bbs.ngacn.cc/*
// ==/UserScript==


//-----------  !!! 设置项目全部从个人菜单中设置并保存于cookie中，脚本请勿修改-------
//-----------  !!! 从这里开始往下的部分请勿修改 !!!  ------


    /*********** 定义变量 ************/
    // 在脚本末尾创建一个div以判断脚本是否已经加载过  以防止在点击个人菜单时会导致的重复加载插件
    var fontinstall = document.getElementById("fontinstalldiv");
    var includeteme;

    /********** 初始化方法 ************/
    window.onload = function () {
        // 如果没有加载过，就进行加载 select 控件，判断是否加载完毕
        if (!fontinstall) {
            CheckLoad();
            LoadSelect();
        }
        // 为 selecte 控件赋值，改变页面字体 ，读取 cookie 中的 font
        var font = getCookie("font") == undefined ? "" : getCookie("font");
        // 获得整个控件
        var optionList = document.getElementById("nga_fontchange").getElementsByTagName("option");
        var optionLength = optionList.length;
        for (var i = 0; i < optionLength; i++) {
            // 匹配 value，如果相同 value 则 selected 选中
            if (optionList[i].value == font) {
                optionList[i].selected = "selected";
            }
        }
        // 这里加载赋值后，要顺便设置字体，以免初始化的时候 mmc 里面的字体不会初始化，因此，ChangeFont会在多个地方被调用，独立写一个方法 ChangeFont
        ChangeFont(font);
    }

    // 标记插件加载完毕
    function CheckLoad() {
        var fontinstallel = document.createElement("div");
        fontinstallel.style.position = "none";
        fontinstallel.id = "fontinstalldiv";
        document.getElementsByTagName("body")[0].appendChild(fontinstallel);
    }
    // 加载 select 控件
    function LoadSelect() {
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
        divhtml += '<select id="nga_fontchange" onchange="onChangefont()">';
        divhtml += '<option value="yahei">微软雅黑</option>';
        divhtml += '<option value="yayuan">浪漫雅圆</option>';
        divhtml += '<option value="songti">宋体</option>';
        divhtml += '</select>';
        divhtml += '</div>';
        tdEl5.innerHTML = divhtml;
        trEl.appendChild(tdEl5);
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
    //变更设置项table
    function Setsettingdiv2(tdid, div) {
        document.getElementById('changefont').style.display = 'none';
        document.getElementById(tdid).style.display = 'block';
        var settingdivs = div.parentNode.parentNode.getElementsByTagName("div");
        for (i = 0; i < settingdivs.length; i++) {
            settingdivs[i].className = "item";
        }
        div.parentNode.className = "item select";
    }

    //判断选中的字体 
    function onChangefont() {
        // 获得当前字体，调用ChangeFont
        var selectfont = document.getElementById("nga_fontchange");
        var font = selectfont.options[selectfont.selectedIndex].value;
        ChangeFont(font);
        // 保存数据
        setCookie("font", font, 1);
        var z = getCookie("font");
    }
    // 改变字体
    function ChangeFont(font) {
        if (font == 'yayuan') {
            document.getElementById("mmc").style.fontFamily = "浪漫雅圆"; //浪漫雅圆
        } else if (font == 'yahei') {
            document.getElementById("mmc").style.fontFamily = "微软雅黑"; //微软雅黑
        } else if (font == 'songti') {
            document.getElementById("mmc").style.fontFamily = "宋体"; //宋体
        }
    }

    function setCookie(c_name, value, expiredays) { //写入cookie
        var expiredays = 10000;
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    } 
    function getCookie(c_name) { //获取cookie
        var cookies = document.cookie.split(';');
        var cookie = '';
        for (var i = 0; i < cookies.length; i++) {
            cookie = cookies[i].split('=');
            if (cookie[0].replace(/^\s+|\s+$/g, '') == c_name) {
                return (cookie.length <= 1) ? "" : unescape(cookie[1].replace(/^\s+|\s+$/g, ''));
            }
        }
        return "";
    }
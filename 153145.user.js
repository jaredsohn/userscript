// ==UserScript==
// @name        Tencent Web Game Simplify
// @description Simplify Front End For Tencent Web Game
// @namespace   code by http://blog.jtwo.me/
// @version     2013.12.13
// @include     http://rc.qzone.qq.com/myhome/*
// @include     http://apps.pengyou.com/*
// ==/UserScript==

// =============================================================================
// 初始主要变量
var pageFrame = "" //游戏将被附加到这个元素
var dispelById_Table = new Array() //根据ID来隐藏元素
var dispelByClassName_Table = new Array() //根据CLASS来隐藏元素
var dispelByClassIndexOf_Table = new Array() //保证CLASS含有某内容，确定唯一性

// =============================================================================
// 根据平台对变量赋值
initialVariable = function () {
	rc_qzone_flag = (document.location.href.indexOf("http://rc.qzone.qq.com/myhome/") != -1)
	qzone_app_flag = ( (document.location.href.indexOf("http://user.qzone.qq.com/") != -1) && (document.location.href.indexOf("#!app=") != -1) )
	pengyou_flag = (document.location.href.indexOf("http://apps.pengyou.com/") != -1)

	if ( rc_qzone_flag || qzone_app_flag ){
		//pageFrame = document.getElementById("QZ_Toolbar_Container")
		pageFrame = document.getElementsByClassName("bg-body")[0]

		dispelById_Table[0] = "layBackground"

		dispelByClassName_Table[0] = "layout-head"
		dispelByClassIndexOf_Table[0] = 'id="headContainer"'
		dispelByClassName_Table[1] = "layout-nav"
		dispelByClassIndexOf_Table[1] = 'class="layout-nav-inner"'
		dispelByClassName_Table[2] = "layout-copyright"
		dispelByClassIndexOf_Table[2] = 'Copyright'
	}
	else if ( pengyou_flag ) {
		pageFrame = document.getElementsByClassName("py-head")[0]

		dispelById_Table[0] = ""

		dispelByClassName_Table[0] = "py-foot"
		dispelByClassIndexOf_Table[0] = 'class="foot-inner"'
		dispelByClassName_Table[1] = "py-body"
		dispelByClassIndexOf_Table[1] = 'id="py_main"'
	};
}

// =============================================================================
// 根据CLASS隐藏节点
dispelNodeByClass_Func = function () {
	for (var N in dispelByClassName_Table) {
		var dispelByClass = document.getElementsByClassName(dispelByClassName_Table[N])
		for (var l = dispelByClass.length-1; l > -1; l--) {
			if (dispelByClass[l].innerHTML.indexOf(dispelByClassIndexOf_Table[N]) != -1) {
				//dispelByClass[l].parentNode.removeChild(dispelByClass[l])
				dispelByClass[l].style.display = "NONE"
			};
		};
	}
}

// =============================================================================
// 根据ID隐藏节点
dispelNodeById_Func = function () {
	for (i in dispelById_Table) {
		var dispelById = document.getElementById(dispelById_Table[i])
		if (dispelById) {
			//dispelById.parentNode.removeChild(dispelById)
			dispelById.style.display = "NONE"
		};
	}
}

// =============================================================================
// 主要定时函数
redirect2url = function () {
	var gameFrame = document.getElementById("appCanvasIfm")

	if (gameFrame && gameFrame.getElementsByClassName("app_canvas_frame")[0]) {
		initialVariable()

		pageFrame.appendChild(gameFrame)

		dispelNodeByClass_Func()
		dispelNodeById_Func()

		return true; //退出当前脚本程序
	}
	else {
		setTimeout(redirect2url,1000)
	};
}

// =============================================================================
// 初始化定时
setTimeout(redirect2url,1000)

// ==UserScript==
// @name          Tencent Game Forum Simplify
// @description   Simplify Front End For Tencent Game Forum
// @namespace     code by http://blog.jtwo.me/
// @version       2014.02.20
// @include       http://bbs.open.qq.com/forum*
// @include       http://bbs.open.qq.com/thread*
// ==/UserScript==

// =============================================================================
// 移动"登录"功能
(function () {
	var groupnav = document.getElementsByClassName("groupnav")[0];
	if (groupnav) {
		var yesLogin = document.getElementById("um");
		if (yesLogin) {groupnav.appendChild(yesLogin)};

		var noLogin = document.getElementsByClassName("ptlogin_simple")[0];
		if (noLogin) {groupnav.appendChild(noLogin)};
	};
}());

// =============================================================================
// 移动"宽版切换"功能
// (function () {
// 	ttpPosition = document.getElementById("ttp_all")
// 	if (ttpPosition) {
// 		switchStyle = document.getElementById("sslct")
// 		if (switchStyle) { ttpPosition.appendChild(switchStyle) };
// 		switehPanel = document.getElementById("toptb").getElementsByClassName("y")[0].getElementsByTagName("a")[0]
// 		if (switehPanel) { ttpPosition.appendChild(switehPanel) };
// 	};
// }());

// =============================================================================
// 根据CLASS屏蔽节点
(function () {
	var shield_class = new Array();

	shield_class.push( {clsname:'pil', keyword:'<dt>钻石</dt>'} ); //人物信息
	shield_class.push( {clsname:'ttp', keyword:'id="ttp_all"'} ); //主题类型横栏
	shield_class.push( {clsname:'vm', keyword:'_usergroup_icon.gif'} ); //人物等级图片
	shield_class.push( {clsname:'bm_h', keyword:'<h2>快速发帖</h2>'} ); //主页面的快速发帖横栏
	shield_class.push( {clsname:'wp', keyword:'<strong>应用礼包</strong>', exclus:'id="threadlist"'} ); //应用礼包
	shield_class.push( {clsname:'avt', keyword:'http://shp.qlogo.cn/txdiscuz/0/avatar_'} ); //登录QQ的头像
	//shield_class.push( {clsname:'', keyword:''} ); //

	for (var n = shield_class.length-1; n > -1; n--) {
		var shield_class_array = document.getElementsByClassName(shield_class[n]['clsname']); //取CLASS数组
		for (var pos = shield_class_array.length-1; pos >= 0; pos--) {
			if (shield_class_array[pos].innerHTML.indexOf(shield_class[n]['exclus']) == -1 && //不包含排除字
				shield_class_array[pos].outerHTML.indexOf(shield_class[n]['keyword']) != -1 ) { //包含关键字
				shield_class_array[pos].style.display = 'NONE'
				//shield_class_name.parentNode.removeChild(shield_class_name)
			};
		};
	};
}());

// =============================================================================
// 根据ID屏蔽节点
(function () {
	var shield_node = new Array()

	shield_node.push("toptb"); //页头横栏
	shield_node.push("hd"); //页头
	shield_node.push("ft"); //页脚版权
	shield_node.push("an"); //帖子内部广告
	shield_node.push("pgt"); //帖子上方的发帖回复栏
	shield_node.push("sitefocus"); //右下「活动推荐」

	for (i in shield_node) {
		inode = document.getElementById(shield_node[i])
		if (inode) { inode.style.display = 'NONE' };
		//if (inode) { inode.parentNode.removeChild(inode) };
	}
}());

// =============================================================================
//屏蔽其他节点
(function () { // 主页面的快速发帖
	var shield_node = document.getElementById('f_pst');
	if (shield_node && (document.location.href.indexOf("thread") == -1)) {
		shield_node.style.display = 'NONE'
		//shield_node.parentNode.removeChild(shield_node)
	};
}());

// =============================================================================
//改变帖子超链接颜色
(function () {
	href_have = document.location.href.indexOf('forum.php?')
	href_null = document.location.href.indexOf('thread')
	if ( (href_have != -1) && (href_null == -1) ) {
		var threadCss = document.createElement("style")
		threadCss.type = "text/css"
		threadCss.innerHTML = "a.xst:link {color:mediumblue;}"
		document.getElementById("moderate").appendChild(threadCss)
	};
}());

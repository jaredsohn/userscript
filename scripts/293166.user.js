// ==UserScript==
// @name          Guessing Game Forum Simplify
// @namespace     code by http://blog.jtwo.me/
// @description   Simplify Front End For Guessing Game Forum
// @version       2014.02.20
// @include       http://bbs.caicai.qq.com/forum*
// @include       http://bbs.caicai.qq.com/thread*
// ==/UserScript==

// =============================================================================
// 移动"登录"功能
(function () {
	var forumleftside = document.getElementById("forumleftside"); 
	if (forumleftside == undefined) {return false}; //不移动登录框

	var yesLogin = document.getElementById("um");
	if (yesLogin) { //登录后的显示
		//forumleftside.appendChild(yesLogin.getElementsByClassName("vwmy")[0]);
		var yl_childs = yesLogin.childNodes;
		for (var i = yl_childs.length-1; i >= 0; i--) {
			if (yl_childs[i].innerHTML && yl_childs[i].innerHTML.indexOf('<strong class="vwmy">')==-1) {
				yl_childs[i].style.display = 'NONE' //隐藏掉没用的节点
			};
			forumleftside.appendChild(yl_childs[i]);
		};
	};

	var noLogin = document.getElementsByClassName("fastlg_l")[1]
	if (noLogin) { //未登录时的显示
		noLogin.setAttribute("onclick","showWindow('login', 'member.php?mod=logging&action=login&infloat=yes')");
		forumleftside.appendChild(noLogin);
	};
}());

// =============================================================================
// 根据CLASS屏蔽节点
(function () {
	var shield_class = new Array();

	shield_class.push( {clsname:'a_h', keyword:'/html/game/iqbb/iqbb.html'} ); //最上方的图片
	shield_class.push( {clsname:'pbn', keyword:'id="a_favorite"'} ); //主页上方摘要
	//shield_class.push( {clsname:'wp', keyword:'<strong>应用礼包</strong>', exclus:'id="threadlist"'} ); //应用礼包
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
	shield_node.push("ft"); //页脚
	shield_node.push("pt"); //导航横栏
	shield_node.push("pgt"); //上方的页数横栏
	shield_node.push("lf_36"); //版块导航边栏
	shield_node.push("thread_types"); //主题类型

	for (i in shield_node) {
		inode = document.getElementById(shield_node[i])
		if (inode) { inode.style.display = 'NONE' };
		//if (inode) { inode.parentNode.removeChild(inode) };
	}
}());

// =============================================================================
// 屏蔽其他节点
(function () { // 主页面的快速发帖
	var shield_node = document.getElementById('f_pst');
	if (shield_node && (document.location.href.indexOf("thread") == -1)) {
		shield_node.style.display = 'NONE'
		//shield_node.parentNode.removeChild(shield_node)
	};
}());

// =============================================================================
// 改变帖子超链接颜色
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

// =============================================================================
// 删除主题类型标签
(function () {
	var em_tag = document.getElementsByTagName("em")
	for (var i = em_tag.length-1; i >= 0; i--) {
		if (em_tag[i].outerHTML && em_tag[i].outerHTML.indexOf("</a>]</em>")!=-1) {
			em_tag[i].style.display = 'NONE'
		};
	};
}());

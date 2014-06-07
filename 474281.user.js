// ==UserScript==
// @name        tieba to pan (ver.myon)
// @author      陌百百<feng_zilong@163.com>
// @Modified	myon<myon.cn@gmail.com>
// @desc		兼容我的旧版名片还原脚本
// @include     http://tieba.baidu.com/i/data/panel?un=*
// @version     0.0.1
// ==/UserScript==

var un = document.getElementById("username").innerHTML;

//创建节点
//
//href		-	节点链接
//innerHTML	-	节点文字
var addNode = function(href,innerHTML)
{
	var a = document.createElement("a");
	a.href = href;
	a.target="_blank";
	a.style="text-decoration:none;margin-right:2px;";
	a.innerHTML=innerHTML;
	document.getElementById("icon_right").appendChild(a);
}

//跨域请求获取用户uk
//回调函数利用uk添加节点
GM_xmlhttpRequest({
	method:"GET",
	url:"http://pan.baidu.com/inbox/friend/queryuser?query_uname={\"" + un + "\":0}",
	onload:function(res)
	{
		var userInfo, uk;
		userInfo = JSON.parse(res.responseText);
		uk = userInfo.user_list[0].uk;
		isPanUser = userInfo.user_list[0].wangpan_user;
		if (isPanUser === 1) {

			//添加节点
			var href = "http://yun.baidu.com/share/home?uk=" + uk;
			addNode(href,"(盘)");

			var href = "http://xiangce.baidu.com/u/" + uk;
			addNode(href,"(册)");

			var href = "http://www.tieba.com/f/search/ures?ie=utf-8&kw=&qw=&rn=100&un=" + un + "&sm=0";
			addNode(href,"(黑)");
		}
	}
})
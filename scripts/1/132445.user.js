// ==UserScript==
// @name           Blacklist for bbs.crsky.com
// @namespace      http://bbs.crsky.com/read.php?tid=2355295
// @include        http://bbs.crsky.com/*
// @description    为霏凡论坛(bbs.crsky.com)提供黑名单功能，移除黑名单内人的发帖，回复，短信。<br />可以删除贴间签名，移除首页的广告链接
// @version        0.0.0.493
// @miniver        493
// @author         agiha
// @run-at         document-end
// @updateURL		https://userscripts.org/scripts/source/132445.meta.js
// @downloadURL		https://userscripts.org/scripts/source/132445.user.js
// ==/UserScript==
//
// Copyright (C) 2012 agiha
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
///
// update history
// 0.0.0.493    2012/10/31  修正bug
// 0.0.0.492    2012/10/16  修正bug
// 0.0.0.491    2012/10/15  修正bug
// 0.0.0.490    2012/08/10  屏蔽版主推荐屏蔽板块公告
// 0.0.0.489    2012/08/09  修正bug
// 0.0.0.488    2012/07/21  可屏蔽某特定贴
// 0.0.0.487    2012/07/18  删除页脚友情链接
// 0.0.0.486    2012/06/20  可屏蔽指定大区
// 0.0.0.485    2012/06/20  替换算法，对连续贴可以有效清除
// 0.0.0.484    2012/05/20  屏蔽首页上广告
// 0.0.0.483    2012/05/08  屏蔽签名
// 0.0.0.482    2012/05/04  增加主题关键字过滤
// 0.0.0.481    2012/04/28  更改部分算法，执行更快（？）
// 0.0.0.480    2012/04/23  修正小bug，回复页面删除的更干净
// 0.0.0.479    2012/04/21  增加多用户功能，（不建议增加过多用户）
//                          对短信和主题的黑名单分别进行管理
// 0.0.0.478    2012/04/21  增加自动屏蔽短信。（进入后判断并选择短信删除）
// 0.0.0.477    2012/04/20  增加屏蔽回复功能
// 0.0.0.476    2012/04/20  初始版本
(function() {
	//屏蔽贴间签名，不想屏蔽就改成false
	var signflag = true;

	//屏蔽大区
	var catelist = [
		  "88"
		, "229"
		, "228"
		, "222"
		, "230"
	];
	/*
	黑名单写法
	黑名单采用数组形式，默认其中只有一个元素，如果有多个元素请以半角英文逗号分隔，例如
	var blacklists = [
		"139380",  //小小鱼缸
		"161707"   //左蚊子，测试用，谁让你在内部区的帖子多呢
		];
	*/
	//主题贴关键字黑名单
	var topicblacklists = [
			"小小鱼缸"
		   ,"腾讯电脑管家"
	];

	//主题贴黑名单
	var blacklists = [
		  "139380" //小小鱼缸
		, "161707" //左文字
		, "187333" //carlosji
		, "185210" //紫色枫扬
		, "163212"
	];

	//短信黑名单
	var messageblacklists = [
		"139380" //小小鱼缸
	];

	//获得地址栏  
	var str = window.location.toString();
	if(str == "http://bbs.crsky.com/index.php" || str == "http://bbs.crsky.com/"){
		//删除页脚友情链接
		var cate_info = document.getElementById('cate_info').parentNode.parentNode;
		cate_info.parentNode.removeChild(cate_info);
	}

	//获得a元素
	var _el = document.getElementsByTagName('a');
	//对主题列表进行过滤
	if (str.indexOf('thread.php') != -1) {
		var array = new Array();
		var arrIdx = 0;
		//根据发帖人过滤
		for (var index = 0; index < blacklists.length; index++) {
			var block = "http://bbs.crsky.com/u.php?action=show&uid=" + blacklists[index];
			for (var i = 0; i < _el.length; i++) {
				if (_el[i].href == block) {
					array[arrIdx++] = _el[i].parentNode.parentNode;
				}
			}
		}

		//移除操作
		if (array.length != 0) {
			for (var index = 0; index < array.length; index++) {
				if(array[index].parentNode.innerHTML.indexOf('images/wind/group') == -1) {
					array[index].parentNode.removeChild(array[index]);
				}
			}
		}
		//对内部区特定贴屏蔽
		if(str.indexOf("http://bbs.crsky.com/thread.php?fid=19") != -1){
			var tid = document.getElementById('td_1639516').parentNode;
			tid.parentNode.removeChild(tid);
		} 
		array = new Array();
		arrIdx = 0;
		//根据主题关键字过滤
		for (var index = 0; index < topicblacklists.length; index++) {
			var block = topicblacklists[index];
			for (var i = 0; i < _el.length; i++) {
				if (_el[i].innerHTML.indexOf(block) != -1) {
				//alert(_el[i].parentNode.parentNode.innerHTML);
					if( _el[i].innerHTML.indexOf("论坛公告") != -1 ){
					 	continue;
					}	
					//alert(_el[i].parentNode.parentNode.innerHTML);
					array[arrIdx++] = _el[i].parentNode.parentNode.parentNode;
				}
			}
		}
		//移除操作
		if (array.length != 0) {
			for (var index = 0; index < array.length; index++) {
				if(array[index].parentNode.innerHTML.indexOf('images/wind/group') == -1) {
					array[index].parentNode.removeChild(array[index]);
				}
			}
		}
		//对短信列表进行过滤
	} else if (str.indexOf('message.php') != -1 && str.indexOf('action=read') == -1) {
		var flag = false;
		for (var index = 0; index < messageblacklists.length; index++) {
			var block = "http://bbs.crsky.com/u.php?action=show&uid=" + messageblacklists[index];
			for (var i = 0; i < _el.length; i++) {
				if (_el[i].href == block) {
					var ele = _el[i].parentNode.parentNode.getElementsByTagName('input');
					//自动选择黑名单内人所发短信
					for (var j = 0; j < ele.length; j++) {
						if (ele[j].type == "checkbox") {
							ele[j].checked = true;
							flag = true;
						}
					}
				}
			}
		}
		//自动提交删除所选短信
		if (flag) {
			var elem = document.getElementsByTagName('input');
			for (var x = 0; x < elem.length; x++) {
				if (elem[x].className == 'btn' && elem[x].type == "submit") {
					elem[x].click();
				}
			}
		}
		//对帖子详细内容过滤回帖人
	} else if (str.indexOf('read.php') != -1) {
		for (var index = 0; index < blacklists.length; index++) {
			var block = "http://bbs.crsky.com/u.php?action=show&uid=" + blacklists[index];
			for (var i = 0; i < _el.length; i++) {
				if (_el[i].href == block) {
					var tbody = _el[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
					tbody.removeChild(_el[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
				}
			}
		}
		//屏蔽贴间签名
		if (signflag) {
			var signatures = document.getElementsByTagName('div');
			for (var index = 0; index < signatures.length; index++) {
				if (signatures[index].className == 'signature') {
					signatures[index].parentNode.removeChild(signatures[index]);
				}
			}
		}
	} else {
		//删除首页大区
		for (var index = 0; index < catelist.length; index++) {
			var cate = document.getElementById("t_" + catelist[index]);
			cate.parentNode.removeChild(cate);
		}
	}
	
	//屏蔽板块广告
	for (var i = 0; i < _el.length; i++) {
		if (_el[i].href == "http://bbs.crsky.com/read.php?tid=2290668") {
			_el[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display =  "none";
			break;
		}
	}
	//屏蔽版主推荐
	var tab_t1 = null;
	if (tab_t1 = document.getElementById('tab_t1')) {
		tab_t1.parentNode.style.display = "none";
	}
	//屏蔽板块公告
	var cate_thread = null;
	if (cate_thread = document.getElementById('cate_thread')) {
		cate_thread.style.display = "none";
	}
	return;
})();
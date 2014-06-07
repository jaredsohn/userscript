// ==UserScript==
// @name            预览链接中的内容
// @namespace       http://userscripts.org/123
// @description     在分类中查看链接全部的内容
// @include    https://*
// @include    http://*
// @updateURL       http://userscripts.org/scripts/source/157922.user.js
// @require         http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.0.min.js
// @version         1.8
// @author          qingshan
// @copyright      2012+, qingshan.dev@gmail.com
// @run-at         document-end
// ==/UserScript==
// 2013-04-05
//	--增加对内容进行隐藏或功能
//  -使用:点击内容链接即可
// 2013-04-08
//  --链接置顶并定位
// 2013-04-09
//  --增加提示信息
// 2013-10-06
//  --副加链接tabindex(1..)
// 	--优化代码
(function() {
	window.alert = function(str) {
		// 什么事也不做，等于屏蔽了它, 但实际上没有用
		conole.log("location-href:" + location.href + "  msg:" + str);
		return;
	};
    
	var $goal = jQuery;
	$goal(document).ready( function() {
        // 聚焦
        function focusLink(goal) {
            console.info("focus this: %s", goal.html());
            goal.focus();
            var top = goal.offset().top;
            var isTop = ((top - 10) < 0);
            if (isTop) {
                $goal(document).scrollTop(top);
            } else {
                $goal(document).scrollTop(top - 10);
            }
        }
		// 容器临时储存内容
		var div = document.createElement('div');
		div.id = "temp_content";
		div.innerHTML = "temp";
		div.style.display = "none";
		document.getElementsByTagName('body')[0].appendChild(div);
		// 指向内容的链接
		var goal = $goal("a[rel=bookmark]");
		// 将被替换的简述内容
		var content = $goal(".excerpt");
		// 内容页中的详细内容
		var goalContent = " .post>.content";
		console.log("当前地址样中的地址 > " + location.href);
		// 配置URLS 
		var includeUrls = [ {
			"url" : "http://www.nowamagic.net/",
			"content" : ".post_content",
			"goalContent" : ".post_content.readmood",
			"goal":"h1 > a[rel=bookmark]",
			"site" : "Veda 原型"
		},{
			"url" : "http://www.williamlong.info",
			"content" : ".post-body",
			"goalContent" : "#artibody",
			"site" : "月光"
		}, {
			"url" : "http://coolshell.cn",
			"content" : ".post div.content",
			"goalContent" : ".post div.content",
			"goal":".title"
		}, {
			"url" : "http://www.cnmiss.cn",
			"content" : ".entry-content",
			"goalContent" : ".entry-content"
		}, {
			"url" : "http://www.ideagrace.com/blog",
			"content" : "#content .entry",
			"goalContent" : ".post table",
			"goal":".entry a"
		}, {
			"url" : "http://c7sky.com",
			"content" : ".entry-content.clearfix",
			"goalContent" : ".entry-content"
		}];
		
		// 是否继续后续操作
		var isGoon = false;
		//读取配置并执行操作
		for ( var index in includeUrls) {
			var url_site = includeUrls[index];
			console.info("dealing site: ", url_site);
			var url = url_site.url;
			//找到就赋值, ok
			if (url && location.href.indexOf(url) != -1) {
				var _goal = url_site.goal;
				if(_goal){
					goal = $goal(_goal+"");
				}
				var _content = url_site.content;
				if(_content){
					content = $goal(_content+"");
				}
				var _goalContent = url_site.goalContent;
				if(_goalContent){
					goalContent = " "+_goalContent;
				}
				isGoon = true;
				console.info("configs has this url site:%s[%s] -content:%s -content:%s", url, $goal.trim(url_site.site), content, goalContent);
				break ;
			}
		}
		if(!isGoon){
			return ;
		}
		
		// 感觉加载的内容太多了,翻页/阅读都有不太好, 所有采用第一篇显示其他的是都不显示
		if (content.length > 4) {
			content.toggle();
		} else {
			// 这一定是单面:详细设内容页咯
			$goal("#hitns").slideUp(1000);
			return;
		}
		
		// 提示
		var div = document.createElement("div");
		div.id = 'hitns';
		div.innerHTML = '正在加载!';
		document.getElementsByTagName("body")[0].appendChild(div);
		
		// 增加css
		var css = "#hitns{background-color:#351717 !important;z-index:1000!important;line-height:2 !important;position:fixed !important;top:2px !important;text-align:center !important;";
		css += "color:#FFF !important;opacity:0.3;width:100% !important;";
		GM_addStyle(css);

		// 点击链接显示/隐藏
		goal.click(function(e) {
				var selectDivs = "div[trigger='" + this.href+"']";
				console.info("toggler element is " + selectDivs + "-"+this.text);
				$goal(selectDivs).toggle();
				focusLink($goal(this));
				e.preventDefault();
			});

		var count = 0;
		var temp = goal[count];
		
		// 以下步骤实现jquery.load同步
		function loadHtml() {
			temp = goal[count];
			// 没有了
			if (!temp) {
				console.log("请求完毕...");
                $goal("#hitns").html("加载完成!").slideUp(1000, function(){
                	focusLink($goal(goal[0]));
                });
				return;
			}
			console.log(temp);
			// 第一篇显示
			if (count == 0) {
				content[count].style.display = "block";
			}
			// console.dir(temp);
			$goal("#temp_content").load( temp.href + goalContent, function() {
				// content[count].innerHTML=$goal("#temp_content").text();
				// 保留排版/样式
				content[count].innerHTML = $goal( "#temp_content").html();
				// div加一属性trigger,值为相应链接href值
				$goal(content.get(count)).attr( "trigger", temp.href);
				$goal("#hitns").text( "正在加载>:  " + count + " -> " + temp.href);
				console.log(count + " -> " + temp.href);
				// 清空临时容器中的内容
				$goal("#temp_content").empty();
				count++;
				// 增加tabindex
				$goal(temp).attr("tabindex", count);
				loadHtml();
			});
		}
		console.log("请求开始...");
		loadHtml();
	});
})();

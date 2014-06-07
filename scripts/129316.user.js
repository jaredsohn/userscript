// ==UserScript==
// @author         lne
// @version        0.5
// @name           weibo deleter
// @namespace      weibo.com
// @include        http://weibo.com/*/follow*
// @include        http://weibo.com/*/profile*
// ==/UserScript==


if(document.getElementById('pl_relation_follow') && document.getElementById('pl_leftNav_relation')){
	// 清除当页所有好友

	var clean_follow = document.createElement("DT");
	clean_follow.onclick = function (){
		
		// 本页 关注ID
		var list = document.getElementById('pl_relation_follow').getElementsByTagName("UL")[1].children;
		var friend_count = list.length;
		var success_count = 0 ;

		// 删除数量提示
		var clean_success = document.createElement("DT");
		clean_success.innerHTML = "需要删除的关注数：" + friend_count + "完成数：<span id='clean_success_count'>" + success_count + "</span>";
		document.getElementById("pl_leftNav_relation").getElementsByTagName("DL")[0].appendChild(clean_success);

		// 操作确认
		if(! confirm("本页关注数：" + friend_count + "，确认要全部“取消关注”吗？")){
			document.getElementById("pl_leftNav_relation").getElementsByTagName("DL")[0].removeChild(clean_success);
			return false;
		}

		for(var i=0;i<friend_count;i++){
			// 获取数据
			var match = list[i].outerHTML.match(/.+uid=(.+)\&amp;fnick=(.+)"/);

			var uid = match[1];
			var fnick = match[2];

			// 构造数据并请求
			var request = new XMLHttpRequest();
			request.open('POST', 'http://weibo.com/aj/f/unfollow', false);
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			request.onreadystatechange = function(){
				if(request.readyState == 4 && request.status == 200){
					// 根据个数来判断是否已经完成
					success_count++;
					document.getElementById("clean_success_count").innerHTML = success_count;
					if(success_count == friend_count){
						alert("全部取消关注完成");
						window.location.reload();
					}
				};
			}

			var formData = 'f=0&fnick='+fnick+'&location=myfollow&oid=2646313254&uid='+uid;
			request.send(formData);
		}
	}
	// 在左侧内容中增加 链接
	clean_follow.innerHTML = '<a class="title" href="javascript:void(0);">取消本页所有关注</a>';
	document.getElementById("pl_leftNav_relation").getElementsByTagName("DL")[0].appendChild(clean_follow);

} else if (document.getElementById("pl_content_myPersonalInfo")){
	//  清除 当页所有微博
	
	var clean_weibo = document.createElement("LI");
	clean_weibo.innerHTML = "<a href='javascript:void(0);'>清除所有微博</a>";
	clean_weibo.onclick = function (){
		// 微博列表
		var wlist = document.getElementById("pl_content_myFeed").children[1].children;
		var total_count = wlist.length;
		var success_count = 0;
		
		// 删除数量提示
		var clean_success = document.createElement("LI");
		clean_success.innerHTML = "需要删除的微博数：<span id='total_count_span'>" + total_count + "</span>，完成数：<span id='clean_success_count'>" + success_count + "</span>";
		var append_div = document.getElementById("pl_content_myFeed").children[0].children[0].children[0];
		append_div.appendChild(clean_success);
		
		// 操作确认
		if(! confirm("本页微博数：" + total_count + "，确认要全部删除吗？")){
			append_div.removeChild(clean_success);
			return false;
		}

		for(var i=0;i<total_count;i++){
			if(wlist[i].tagName != "DL"){
				// 避免最后一个div出错
				total_count = total_count - 1;
				document.getElementById("total_count_span").innerHTML = total_count;
				continue ;
			}

			var mid = wlist[i].outerHTML.match(/.+mid=\"([\d]+)"/)[1];
			var request = new XMLHttpRequest();
			var timestamp = new Date().getTime();
			request.open('POST', 'http://weibo.com/aj/mblog/del?__rnd=' + timestamp, false);
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			request.onreadystatechange = function(){
				if(request.readyState == 4 && request.status == 200){
					// 根据个数来判断是否已经完成
					success_count++;
					document.getElementById("clean_success_count").innerHTML = success_count;
					if(success_count >= total_count ){
						alert("全部删除");
						window.location.reload();
					}
				};
			}

			var formData = 'mid='+mid+'&_t=0';
			request.send(formData);
		}

	}

	var append_div = document.getElementById("pl_content_myFeed").children[0].children[0].children[0];
	//append_div.parentNode.insertBefore(clean_weibo, append_div);
	append_div.appendChild(clean_weibo);
}

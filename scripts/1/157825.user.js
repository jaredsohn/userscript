// ==UserScript==
// @name           NetEase News Comments
// @description    修改自网易热门评论右侧显示 2.4.1（减小了标题字号） + 去除网易的新闻分享条（更新时间：2013年1月29日）
// @include        http://*.163.com/*
// @updateURL      https://userscripts.org/scripts/source/157825.meta.js
// @downloadURL    https://userscripts.org/scripts/source/157825.user.js
// @author         yjxjn & 凸逼喃啵万
// @icon           http://news.163.com/favicon.ico
// @version        1.0.0 Release
// ==/UserScript==

document.getElementById('js-epContent').removeChild(document.getElementById('js-epFixedBar'));

var usw = unsafeWindow;

if(window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    usw = div.onclick();
};


(function(win) {
	var commentLink = document.getElementsByClassName('js-tielink')[0];
     
	if (commentLink) {
		/* 生成评论数据的链接 */
		var s = commentLink.href;
		s = s.split("/");
		s.splice(3,0,"data");
		s.splice(5,0,"df");
		var len = s.length - 1;
		s[len] = s[len].replace(/\./,"_1.");
		s = s.join("/");

		/* 加载评论数据后的回调 */
		var onScriptLoad = function() {

            var posts = win.replyData.hotPosts;

			/* 生成评论的主体 */
			var htm = '<ul class="gm-hot-posts">';
			var len = posts.length - 1;
			var drawBody = function(entry, quote) {
				var ret = "";
				ret += "<div><span class='gm-hp-f'>" + entry.f + "<strong>" + (entry.v || "") + "</strong></span>";
				ret += '<div class="gm-ph-b">' + (quote || "") + entry.b + '</div>';
				ret += "</div>";
				return ret;
			};

			posts.forEach(function(n, i) {
				var idx = 1;
				var entryHtm = "";
				/* 生成嵌套评论 */
				do {	
					var entry = n[idx.toString()];
					entryHtm = drawBody(entry, entryHtm);
					idx++;
				} while (n[idx.toString()]);

				entryHtm += ((i != len) ? "<span class='dotline'></span>" : "") 
				htm += "<li>" + entryHtm + "</li>";
			})
			htm += "</ul>";
			var wrapper = document.createElement("div");
			wrapper.className = "content";
			wrapper.innerHTML = htm;


			/* 生成评论头 */
			var title = document.createElement("div");
			title.className = "titleBar1 ui_sr";
 
			//此处用到了闭包
			title.innerHTML = '<h2><b><font face="微软雅黑" size="4" color="#dd0000"><a href="' + commentLink.href + '">网易热门评论</a></font></b></h2><span class="more"></span>';
			
			/* 插到DOM中 */
			try {
			    var rightCol = document.querySelector(".ep-content-side") || document.querySelector(".col2:not(#latestMatch)");
			}
            catch(e) {console.log(e);}

			rightCol.insertBefore(wrapper, rightCol.firstChild);
			rightCol.insertBefore(title, rightCol.firstChild);
			
		};

		/* 给script标签绑定事件 */
        var scriptEl = document.createElement('script');
        scriptEl.setAttribute('src', s);
        scriptEl.setAttribute('charset', 'utf-8');
        scriptEl.addEventListener('load', function() {
            onScriptLoad();            
            scriptEl = undefined;
        }, false);

        document.body.appendChild(scriptEl);

	}
})(usw);

GM_addStyle = GM_addStyle || function() {};
GM_addStyle("	.gm-hot-posts li{margin: 12px 5px}\
				.gm-hot-posts .gm-hp-f{color:#1E50A2;display:block}\
				.gm-hot-posts .gm-ph-b{line-height:1.5;padding:5px 0}\
				.gm-hot-posts .gm-ph-b>div{margin:3px;padding:3px;border:1px solid #CDD6D3;background:#FFE}");



// ==UserScript==
// @name           Async Comments for 163 News
// @namespace      async_163_comments
// @include        http://*.163.com/*
// ==/UserScript==

var usw = unsafeWindow;

if(window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    usw = div.onclick();
};


(function(win) {
	var commentLink = document.getElementById("endpageUrl1");

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
			title.innerHTML = '<h2><a href="' + commentLink.href + '">热门评论</a></h2><span class="more"></span>';
			
			/* 插到DOM中 */
			try {
			    var rightCol = document.querySelector(".rightContent") || document.querySelector(".col2:not(#latestMatch)");
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
GM_addStyle("	.gm-hot-posts li{margin: 10px 5px}\
				.gm-hot-posts .gm-hp-f{color:#1E50A2;display:block}\
				.gm-hot-posts .gm-ph-b{line-height:1.5;padding:5px 0}\
				.gm-hot-posts .gm-ph-b>div{margin:3px;padding:3px;border:1px solid #CDD6D3;background:#FFE}");



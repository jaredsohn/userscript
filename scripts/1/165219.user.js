// ==UserScript==
// @id             bilibili_player_fixer
// @name           bilibili播放器修正
// @version        1.5.0
// @namespace      jiayiming
// @author         jiayiming
// @description    还原成bilibili原弹幕播放器
// @include        http://www.bilibili.tv/video/av*
// @updateURL      https://userscripts.org/scripts/source/165219.meta.js
// @downloadURL    https://userscripts.org/scripts/source/165219.user.js
// @run-at         document-end
// ==/UserScript==

//1.5.0  添加搜狐
//1.4.0  B站貌似变成新式覆盖弹幕了……
//1.3.0  自适应2种外联iqiyi形式
//1.2.1  解决不替换播放器的页面error

var player = document.querySelector("#bofqi");

if (player && /iqiyi|sohu/.test(player.innerHTML)) {
	var location = /http:\/\/www\.bilibili\.tv\/video\/av([0-9]+)(?:index_([0-9]+)\.html)?/.exec(document.URL);
	if (location[2] == undefined) {
		location[2] = null;
	};

	//GM_log("id:" + location[1] + "|page=:" + location[2] + "/url:" + "http://api.bilibili.tv/view?type=json&id=" + location[1] + "&page=" + location[2]);

	var cid;

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://api.bilibili.tv/view?type=json&id=" + location[1] + "&page=" + location[2],
		headers: {
			"User-Agent": "Mozilla/5.0",
			"Cache-Control": "max-age=0",
			"Origin": "http://www.bilibili.tv",
			"Referer": location,
			"Cookie": document.cookies
		},
		onload: function(response) {
			cid = /cid":(\d+),"/g.exec(response.responseText)[1];
			//GM_log(response.responseText);
			replacePlayer(location[1],cid);
			//player.src = "https://secure.bilibili.tv/secure,cid=" + cid;
		}
	});
};


function replacePlayer(aid, cid) {
	bplayer = document.createElement("embed");
	bplayer.type = "application/x-shockwave-flash";
	bplayer.width = 950;
	bplayer.height = 482;
	bplayer.src = "https://static-s.bilibili.tv/play.swf";
	bplayer.setAttribute("flashvars", "aid=" + aid + "&cid=" + cid);
	bplayer.setAttribute("quality", "high");
	bplayer.setAttribute("allowfullscreen", "true");
	bplayer.setAttribute("allowscriptaccess", "always");
	bplayer.setAttribute("rel", "noreferrer");
	player.innerHTML = bplayer.outerHTML;
	//GM_log("flashvars", "aid=" + aid + "&cid=" + cid);
}
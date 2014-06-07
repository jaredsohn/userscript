// ==UserScript==
// @name jx
// @author Outku
// @description
// @create
// @lastmodified
// @namespace http://userscripts.org/users/Rabbit
// @updateURL
// @version
// @include
// ==/UserScript==
function genericOnClick(info, tab){
	var custom_url = encodeURIComponent(info.pageUrl);
	var action_url = custom_url.replace("%s", encodeURIComponent(action_url));action_url='http://www.flvcd.com/parse.php?kw='+custom_url;console.log('Custom url: ' + action_url);sogouExplorer.tabs.create({index: tab.index + 1,url: action_url,selected: true});
}
	var title = "解析页面音频地址(&J)";
	var id = sogouExplorer.contextMenus.create({"title": title,"onclick": genericOnClick});
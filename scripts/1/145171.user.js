// ==UserScript==
// @name          fanqiang
// @description	  fanqiang
// ==/UserScript==

function genericOnClick(info, tab) {
    var custom_url = encodeURIComponent(info.pageUrl);
    var action_url = custom_url.replace("%s", encodeURIComponent(action_url));
    action_url='https://5luan.info/browse.php?u='+custom_url;
	sogouExplorer.tabs.create({
		index: tab.index + 1,
		url: action_url,
		selected: true
	});
}
  var id = sogouExplorer.contextMenus.create({title:"使用代理浏览(&D)",icon: {path:"default1.ico"},onclick: genericOnClick});
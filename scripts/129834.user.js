// ==UserScript==
// @name 清水河畔——登录不等待
// @description 自动跳过登录时七秒等待的界面。
// @match http://uc.stuhome.net/admin.php*
// @run-at document-end
// ==/UserScript==

for(var i = 0; i < document.links.length; ++i)
	if(document.links[i].href.match(/^http:\/\/.+?\/login.php.*/))
		location.replace(document.links[i].href);


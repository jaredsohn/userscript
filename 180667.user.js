// ==UserScript==
// @name       百度云
// @namespace  http://com.find1x.baiduyun/
// @version    0.2
// @description  添加百度云快捷键
// @match      http://www.baidu.com/
// @copyright  2013+, FindiX Stuido
// ==/UserScript==

var navbar;
var yun = document.createElement("div");
yun.innerHTML = '<p style="margin: 2px 0 1px 0;"> ' + 'FindiX 工作室 ' + 　'<a href="http://yun.baidu.com/disk/home"> 百度云 </a>' + '</p>';
navbar = document.getElementById('lk');
if (navbar) {
	navbar.parentNode.insertBefore(yun, navbar.nextSibling);
	//navbar.parentNode.removeChild(navbar);
}

var u;
u = document.getElementById('u');
if (u) {
	u.parentNode.removeChild(u);
}
alert('我说了我这么烂你就不要用我了嘛，怎么不听话呢！');
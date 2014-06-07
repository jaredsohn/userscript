// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==
//添加按钮
var newSpan = document.createElement("span");
newSpan.innerHTML = "全签到";
newSpan.id = "allsign";
//newSpan.addEventListener('click', jjuds, true);
var newinput = document.createElement("input");
newinput.type = "checkbox";
newinput.id = "autoSign";
newinput.title = "选中此项，启动自动签到，否则，关闭自动签到";
newinput.checked = GM_getValue('autoSignbox', true);
//newinput.addEventListener('click', function () {
//	GM_setValue('autoSignbox', document.getElementById("autoSign").checked)
//}, true);
if (window.location.href.indexOf("http://www.baidu.com/") != -1) {
    //if (document.getElementById("s_modules")){
     //   document.getElementById("s_modules").style.display="block";
   // }
    if (document.getElementById("bottom_container")){
        var layer = document.getElementById("bottom_container");
        layer.parentNode.removeChild(layer);
    }
	//百度首页添加按钮
	if (document.getElementById("s_mod_nav_titleBar") && document.getElementById("s_username_top")) {
		document.getElementById("s_mod_nav_titleBar").appendChild(newSpan);
		//document.getElementById("s_mod_nav_titleBar").appendChild(newinput);
	}
	var userSignName = document.getElementById("s_username_top").innerHTML;
    newSpan.innerHTML = "欢迎你！" + userSignName + "！";
}

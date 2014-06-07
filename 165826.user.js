// ==UserScript==
// @name        快传批量
// @namespace   http://www.ualberta.ca/~xiaohui6
// @version     0.9.21
// @description 快速批量复制迅雷快传下载地址，直接复制到离线下载即可。
// @match       http://kuai.xunlei.com/d/*
// @copyright   2013+, Grey
// ==/UserScript==

function getUrls() {
	var urls = "";
	var files = document.getElementsByClassName("file_name");
	for(k in files)	{
		if (files[k].href != null)
			urls += files[k].href + "\n";
	}
    return urls;
}

function showText() {
    if (textarea.style.display == "none") {
        textarea.style.display = "block";
        btn.innerHTML = "隐藏下载地址";
    } else {
        textarea.style.display = "none";
        btn.innerHTML = "显示下载地址";
    }
}

// 修改广告为按钮
var btn = document.getElementsByClassName("r_ico")[0];
btn.innerHTML = "显示下载地址";
btn.addEventListener("click", showText, false);

// 创建文本框，显示URL
var textarea = document.createElement("textarea");
textarea.innerHTML = getUrls();
textarea.style.width = "683px";
textarea.style.height = "150px";
textarea.style.display = "none";
document.getElementsByClassName("download_w_new")[0].appendChild(textarea);
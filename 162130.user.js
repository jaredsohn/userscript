// ==UserScript==
// @name        Add google search for baidu
// @namespace   http://userscripts.org/users/508758
// @description Add google search for baidu 
// @include     http://www.baidu.com*
// @version     1.0
// @date        Mar 16, 2013 By I'mNotYangBuhui
// ==/UserScript==


// ------------------------------ READ ME ------------------------------ //
// 用于在百度主页进行谷歌搜索
// firefox only
// ------------------------------ notice ------------------------------ //
// 如果在""中加了''里面还要加"" 就要用转义字符\
// window.location.href 可以在新的页面打开一个url 



var obj = document.getElementById("s_ps_form");
var newDiv = document.createElement("div");
newDiv.innerHTML = '\
	<div>\
		<input id = "wBtn" class = "btn"  value = "     谷歌搜索"  style = "float : right; margin-right : 68px;" onmouseout="this.className=\'btn\'" onmousedown="this.className=\'btn btn_h\'">\
	</div>'

obj.appendChild(newDiv);
//////////////////////////////////////////////////////////////


var the_wBtn = document.getElementById("wBtn");
the_wBtn.addEventListener("click", fun);

function fun() {
	var keywords = document.getElementById("kw");
        window.location.href = "http://www.google.com.hk/search?q=" + keywords.value;
	}


	
	
	

// ==UserScript==
// @name        Only want to see you for dz
// @namespace   http://userscripts.org/users/508758
// @description 实现dz论坛只看某人功能
// @include     *read*tid*
// @include     *forum*fid*
// @include	*thread*
// @include	*forum*viewthread*
// @version     1.0 
// ==/UserScript==



// ------------------------------ Read Me ------------------------------ //
// 用于在dz论坛上实现只看某人的楼层的功能
// 有关于脚本的任何BUG或者问题请在下面留言或者@我，谢谢
// 如果您需要的论坛脚本不起作用，麻烦将地址告诉我
// firefox only

// ------------------------------ To Learn ------------------------------ //
// 用getElementsByClassName(a)，如果b中有字串a，那么b也会被计算进去？？ how to solve it？？？

// ------------------------------ Update Log ------------------------------ //
// first created on Mar 17, 2013 
// 用重新载入修正了只能查询一次的BUG && 用innerHTML代替innerText修正了无法使用GM_getValue()的BUG，暂不知原因	Mar 18, 2013
// 将个别的@include修正成通用版本	Mar 20, 2013



function Id(a) {
	return document.getElementById(a);
	}
//////////////////////////////////////////////////////////////


var subBtn = document.getElementById("pgt");
var newDiv = document.createElement("div");
newDiv.innerHTML = '\
	<input id = "nameText" type = "text" style = "width: 100px; height: 20px">\
	<button id="wBtn" class="pn pnc vm">\
		<strong> 开始查找 </strong>\
	</button>'
subBtn.appendChild(newDiv);
var the_wBtn = Id("wBtn");
the_wBtn.addEventListener("click", fun);
//////////////////////////////////////////////////////////////


if(GM_getValue("sign")) {	//已按下"开始查找"键
	var obj = document.getElementsByClassName("xw1");
	for(var i = 0; i < obj.length; i++) {
		if(obj[i].className != "xw1") continue;
		if(obj[i].parentNode.className != "authi") continue;
		if(obj[i].innerHTML == GM_getValue("name")) continue;		//这里是innerText + GM_setValue()就跪了
		obj[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
		}
	GM_deleteValue("sign");
	GM_deleteValue("name");
	}


function fun() {
	GM_setValue("name", Id("nameText").value);
	GM_setValue("sign", true);
	window.location.reload();
	}
//////////////////////////////////////////////////////////////	



	
	
	
	
	
	
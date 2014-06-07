// ==UserScript==
// @name 起点阅读时全屏
// @description 不区分会员，在阅读章节时，直接全屏,点击取消后能恢复
// @version 2.5
// @include http://*.qidian.com/BookReader/*
// @updateURL https://userscripts.org/scripts/source/382467.meta.js
// @downloadURL https://userscripts.org/scripts/source/382467.user.js
// ==/UserScript==

(function(){
    //获取用户权限
	var authority = window.document.getElementById("sykzAdTestReadTop_ReadWeb").innerHTML;
	if(authority == 0) {
		//将会员权限改为高V
		window.document.getElementById("sykzAdTestReadTop_ReadWeb").innerHTML = "1";
		//调用起点原有方法实现
		setFullScreenReaderStyle(this);
	} else {
                //高V用户直接调用起点方法
		var readStyle = GetCookie("rds");
		if (readStyle == null || readStyle != 2) setFullScreenReaderStyleProcess('full');
	}
})();
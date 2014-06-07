// ==UserScript==
// @id modifyRenRen
// @name modifyRenRenWebsite
// @version 1.2
// @namespace www.zhangweifang.com
// @grant none
// @author @zhangweifang
// @description 干掉人人网上传头像的提示和升级时间轴提示
// @include http://www.renren.com/*/profile
// @run-at document-end
// ==/UserScript==

function removeRenRenAvatarInfoTips(){
	var nostarCloseLink = document.getElementById("nostar").getElementsByTagName("a")[0];

	if(document.all) {
		nostarCloseLink.click();
	} else {
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, true);
		nostarCloseLink.dispatchEvent(evt);
	}

}

function removeRenRenTimelineUpgradeTips(){

	var test = document.getElementsByClassName("gt-timeline-btn");
	test[0].setAttribute("style","display:none;");

}


removeRenRenAvatarInfoTips();
removeRenRenTimelineUpgradeTips();
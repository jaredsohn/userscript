// ==UserScript==
// @name             招商银行手机版登录
// @namespace        http://lilydjwg.is-programmer.com/
// @description      让招商银行手机版认可桌面浏览器
// @include          https://mobile.cmbchina.com/MobileHtml/Login/LoginA.aspx
// ==/UserScript==

with(unsafeWindow){
    unsafeWindow.DoLogin = function(){
	if (BSGetElement("AccountNoA").value == "") {
	    alert("卡号不能为空,请重新输入!"); return;
	}
	if (BSGetElement("PwdA").value == "") {
	    alert("查询密码不能为空,请重新输入!"); return;
	}
	if (BSGetElement("ExtraPwdA").value == "") {
	    alert("附加码不能为空,请重新输入!"); return;
	}
	if (BSGetElement("AccountNoA").value.length == 8) {
	    alert("请输入8位卡号前面的4位地区码，地区码请参看您的一卡通卡片!"); return;

	}
	submitControl.clearFields();
	submitControl.setCommand("CMD_DOLOGIN");
	if (typeof (navigator.userAgent) != "undefined") {
	    submitControl.addFieldByNameValue("UserAgent", 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1');
	}
	if (typeof (screen.width) != "undefined") {
	    submitControl.addFieldByNameValue("screenW", '320');
	}
	if (typeof (screen.height) != "undefined") {
	    submitControl.addFieldByNameValue("screenH", '470');
	}
	if (typeof (navigator.platform) != "undefined") {
	    submitControl.addFieldByNameValue("OS", 'Android');
	}
	submitControl.addFieldByNameValue("AccountNoA", BSGetElementValue("AccountNoA"));
	submitControl.addFieldByNameValue("RememberFlag", BSGetElementValue("cbRemember"));
	submitControl.addFieldByElementId("PwdA", "ExtraPwdA");
	submitControl.submit();
    }
}

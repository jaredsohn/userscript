// ==UserScript==
// @name           模版
// @namespace      http://userscripts.org/scripts/show/173508
// @description    测试模版
// @version        0.0.0
// @author         lsz860708
// @include        http://www.lexif000000one.com/zh/signup
// @updateURL      https://userscripts.org/scripts/source/173508.user.js
// @downloadURL    https://userscripts.org/scripts/source/173508.user.js
// ==/UserScript==

setTimeout(aaaa,100);
function aaaa()
{
	//document.write("成功!");
		var html1 = document.body.innerHTML
		if (html1.indexOf("UNITED STATES") >= 0)
		{
			//alert("成功!");
			suijiphine=parseInt(Math.random()*(9999999999-2000000000+1)+2000000000)
			document.getElementById("code").value="1";
			document.getElementById("phone").value=suijiphine
			document.getElementById("email").value=suijiphine+"@qmcall.com";
			document.getElementById("password").value="lhx890112";
			document.getElementById("termofuse").checked = true;
			document.getElementById("submit").disabled = false;
			document.getElementById("submit").click()
			//registration.submit()
			//submit
		}
		else
		{
		//alert("失败!");
		setTimeout(aaaa,100);
		}
}
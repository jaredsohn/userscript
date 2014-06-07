// ==UserScript==
// @name           DepositFiles Cracker (revised) ==> Bypass Time wait / AutoStart Download
// @namespace      #avg
// @description    Bypass the countdown, autostarts the download
// @version        0.3.2
// @include        http://*depositfiles.com/*/files/*
// ==/UserScript==
var only=document.evaluate("//div[@class='info']", document, null, 8, null).singleNodeValue;
document.body.innerHTML="";
document.body.appendChild(only);
function tryIt() {
	GM_xmlhttpRequest({
		url : location.href,
		method : "POST",
		data : "gateway_result=1",
		onload : function (A) {
			if (A.responseText.match(/limit_interval">(\d+)/)) {
				document.body.innerHTML+="You reached the limit. Will auto-start in " +  RegExp.$1 + " seconds.";
				setTimeout(tryIt, Number(RegExp.$1 + "000"));
			} else {
				location.href=A.responseText.match(/action="(http:\/\/file[^"]+)/)[1];
			}
		},
		headers : {
			"Content-Type" : "application/x-www-form-urlencoded"
		}
	});
}
tryIt();
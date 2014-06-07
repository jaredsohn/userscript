// ==UserScript==
// @id             Cha_Shui_Biao@scriptish
// @name           Cha_Shui_Biao
// @version        0.3
// @namespace      Cha_Shui_Biao@scriptish
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?*
// @run-at         document-end
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @updateURL      http://userscripts.org/scripts/source/185365.user.js
// @downloadURL    http://userscripts.org/scripts/source/185365.user.js
// @author         zklhp
// ==/UserScript==

// var id = window.prompt("Input ID", "zklhp");
var $ = unsafeWindow.$;


$('.l_post').each (function () {
	var newSpan = document.createElement("span");
	newSpan.innerHTML = "Dong Dong Dong";
	newSpan.addEventListener('click', getShuiBiao, true);
	$(this).find('.d_author').append(newSpan);
});

function getShuiBiao()
{
	var tmp = $(this);
	var id = $(this).parent().parent().data('field').author.name;
	var url = 'http://tieba.baidu.com/home/get/panel?ie=utf-8&un=' + id;
	GM_xmlhttpRequest({
		method: 'GET',
		synchronous: false,
		url: url,
		onload: function (response) {
			var content = response.responseText;
			// var reIP = /^[\s\S]*lastip\"\:\"([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})\"\,[\s\S]*$/g;
			var reMobile = /^[\s\S]*securemobil\"\:\"([0-9\*]*)\"\,\"sex[\s\S]*$/g;
			var reEmail = /^[\s\S]*secureemail\"\:\"([\s\S]*)\"\,\"securemobil[\s\S]*$/g;
			// var ip = reIP.exec(content)[1];
			try
			{
				var mobile = reMobile.exec(content)[1];
			} catch (e) {var mobile = "";}
			try
			{
				var email = reEmail.exec(content)[1];
			} catch (e) {var email = "";}
			tmp.context.innerHTML = mobile + '<br>' + email;
			// var searchIPUrl = 'http://www.cz88.net/ip/index.aspx?ip=' + ip;
			// GM_xmlhttpRequest({
			// 	method: 'GET',
			// 	synchronous: false,
			// 	url: searchIPUrl,
			// 	onload: function (response) {
			// 		var searchContent = response.responseText;
			// 		searchContent = searchContent.substring(searchContent.indexOf("InputIPAddrMessage") + 20);
			// 		var address = searchContent.substring(0, searchContent.indexOf("<"));
			// 	}
			// });
		}
	});
}
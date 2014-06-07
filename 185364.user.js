// ==UserScript==
// @id             Cha_Shui_Biao@scriptish
// @name           Cha_Shui_Biao
// @version        0.1
// @namespace      Cha_Shui_Biao@scriptish
// @include        http://tieba.baidu.com/f?kw=*
// @include        http://tieba.baidu.com/p/*
// @run-at         document-end
// @author         zklhp
// ==/UserScript==

var $ = unsafeWindow.$;
// var id = window.prompt("Input ID", "zklhp");
var names = [];
var objs = [];

$('.l_post').each (function () {
	var a = $(this).data('field').author;
	names.push(a.name);
	objs.push($(this).find('.l_badge'));
});


for (var i = 0; i < names.length; i++)
{
	getShuiBiao(names[i], i);
}

function getShuiBiao(id, j)
{
	var url = 'http://tieba.baidu.com/home/get/panel?ie=utf-8&un=' + id;
	GM_xmlhttpRequest({
		method: 'GET',
		synchronous: false,
		url: url,
		onload: function (response) {
			var content = response.responseText;
			var re = /^[\s\S]*lastip\"\:\"([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})\"\,[\s\S]*$/g;
			var ip = re.exec(content)[1];
			var searchIPUrl = 'http://www.cz88.net/ip/index.aspx?ip=' + ip;
			GM_xmlhttpRequest({
				method: 'GET',
				synchronous: false,
				url: searchIPUrl,
				onload: function (response) {
					var searchContent = response.responseText;
					searchContent = searchContent.substring(searchContent.indexOf("InputIPAddrMessage") + 20);
					var address = searchContent.substring(0, searchContent.indexOf("<"));
					objs[j].append('<ul>' + ip + ' ' + address + '</ul>');
				}
			});
		}
	});
}

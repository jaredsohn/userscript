// ==UserScript==
// @name        Parrots.ru photo links
// @description Преобразование ссылок Яндекс.фото в сообщении в картинки с ссылками 
// @namespace   http://parrots.ru
// @include     http://parrots.ru/viewtopic.php?*
// @include     http://parrots.ru/posting.php?*
// @include     http://parrots.ru/ucp.php?*
// @include     http://parrots.ru/*.html
// @include     http://parrots.ru/*.html#*
// @include     http://www.parrots.ru/viewtopic.php?*
// @include     http://www.parrots.ru/posting.php?*
// @include     http://www.parrots.ru/ucp.php?*
// @include     http://www.parrots.ru/*.html
// @include     http://www.parrots.ru/*.html#*
// @version     1.8
// @run-at	document-end
// @updateURL	https://userscripts.org/scripts/source/163832.meta.js
// @downloadURL	https://userscripts.org/scripts/source/163832.user.js
// ==/UserScript==

/*
[url=http://img-fotki.yandex.ru/get/5206/20547375.9c/0_d184c_ca61cfa3_XXL.jpg][img]http://img-fotki.yandex.ru/get/5206/20547375.9c/0_d184c_ca61cfa3_XXL.jpg[/img][/url]
<a href="http://fotki.yandex.ru/calendar/users/mostheatre/view/858188"><img src="http://img-fotki.yandex.ru/get/5206/20547375.9c/0_d184c_ca61cfa3_L.jpg" width="391" height="500" border="0" title="Наши небоскрёбы" alt="Наши небоскрёбы"/></a>
http://fotki.yandex.ru/next/calendar/users/mostheatre/album/168865/view/858188?page=0
*/

// var log = unsafeWindow.console.log;
$ = jQuery = (typeof(unsafeWindow) == 'undefined' ? window : unsafeWindow).jQuery;

String.prototype.matchAll = function(regexp) {
	var matches = [];
	this.replace(regexp, function() {
		var arr = ([]).slice.call(arguments, 0);
		var extras = arr.splice(-2);
		arr.index = extras[0];
		arr.input = extras[1];
		matches.push(arr);
	});
	return matches;
};

$('<img>').attr({
	src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqklEQVR42oxTXUhTYRh+ztnZ5janA6XcjIyCtDBaVBeGULEbkUC8CISILiJSoYsussJupShvosAoCrrQLkLoF6KLZKUuFuESIlMTleH+nPNsZzs7v1/fznQmGHXgOd/3vrzP873f+70vQwgBH9gTBlCLf38DlU2/uv90MLHxunCV01LL2hsBjQfk8F/ZaVGBpOjXtzXN3yoJzI97yE5GBdgyMA2DID86AKJsKUCjECEcCOCqdh7hHY0vwWZBg4VVKh+l6xyYuv6ivQZ9JQU1sgItkQJHbasigHJ610VZATIEaAbE6BBQ0wG14W7Jp3sfwdyuQNnXi5S8Gxzvgs56rnzP+JsLAhzrOAh9+0nI6a+Q+M9wy1GYd3Qim1+EtDoGp+ccRt634YRvEKq1GjIfQFkuhDhRuih/lHk15iC+A37YnYeRCN8Hy9pQ5TlvpCcKIdjKvcZ+9lsbfs69hqeymHrMbILEMhfZtJpDcMKHZPIdbK7jiK76S0VbJy8tPcZEeATETpBEEVBVCJraxeYUgrjK48PkKYOcN5Vvqnwk+RY5mBBT8siZgRUUkaIaBS4nSNSyFEI1jExdQqW9Hod0mV7FgkQ6iIyUQDi1CKZMAa9vCNOWgEYwwGbz9AWVDbir2sEwJsTTIUT4ECSNw6epfuTJRkyqwBExdLmVPOSEHFVii6q+/TfRvPcaFpb9GJt+AEllMLnwDE4HbQlp7WgqlKccOgEDxjNmRfqzlePsseeod7cgMPsETz92wmJWYKVX4yzFdEvdKBm4c+8CGTUERCrgrW6B2+XFcPAqXgRvo6IC0OlJorS5lQmtgZQxsuhb93FiHtHAzHDNdOwLlvk4rDYGsrr1MEkZAk3CjcEewpeGqTDOp/vYCN3X/M8495x50310V2vJ8VuAAQBHBEgsJSNN0AAAAABJRU5ErkJggg==",
	class: "btnbbcode3 editor_Button",
	alt: "Преобразовать ссылки Яндекс.фото в картинки с ссылками", 
	title: "Преобразовать ссылки Яндекс.фото в картинки с ссылками",
	onmouseout: "helpline2();",
	onmouseover: "helpline2('Преобразовать ссылки Яндекс.фото в картинки с ссылками');"
})
.click({message: $('form[name="postform"] textarea[name="message"]'), suffix: "L"}, parseMessage) 
.appendTo("#abbc3posttable .cat:last");

$('<img>').attr({
	src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+0lEQVR42oSTbWhTZxTHf/clr0arTgtxKipoaaFDxjoWnSD4ghalClMQ8cM+DPzgF5m4jcGQjSEbYwh+EUVBUAS1MNGgdcPiS622k2qt2nW2NE5ba5qmae5N7s1N8uzpjUkVBA8cOPw5z//8z8ujjN1Z9F0wUP1jITdUQPUIFF3RVDy2JXpFsXiOt62zKtIffRNQEq2I2eEdoE+H2FFQJepAwQup0Pyzs/zBJ+XkiayD7RT/qo4M3ipjapKAZfefgfkHyahhMtpH2DUtaMomkhn/dtLjlD2YN7Fw1sbaP/SbPU0lAnPBLuFb0YZh9RJYPYQ3cpv0rFoe+2wc8ZLbdnxjfniMQjyJbozjcwxMnFUVBV39x3gyfoWE2YMiAV2fRuy/Q9wa/JOBvEFMiE89Wx2c2u9J5pagp2ZSVOetfJS+vtAlGMkpnL77E32JFpcxlemhe/QG5gwYKIIvuL6j9WoT/sVf46nfA4tX4VfyGMJpmMzXXySKaqSukXX157ncfYCuwVOMmv1MnwbWuCL2rG25PJn49EET/wxcZF5VSXrOo9VfaPMO6pqY7dv88Ul+ia6hfaCVOXIZfh+8jMPGuh+aJ5OHho7T9byVQFCQKDeflyo0pUE3jLG/v/x97ieGBSH/5KrkwDWYG1ga2xI58Gg4ESWDxohjUR1AxiUrCBk7Ar12CdGQl8pxVAVr+OKzblTVS3yig7Qd53nyGYrfIVWcOqCs45J0qqasPOFMefiDrSiKxquJ+wyn7mMXdG72/oYlpnKSlqv04d5GcU83pKaCWmJdU3eQz5d9S2z0Om19R7DzCt2xM+5ADft1aUlkyTdCVne3YMqe9UCIXSvOURPeQPvTE5y8sRuvx8Enz1n3luRWZme73nb4K/HMJchKguVzNhCeuZzmjm/4o+NXZsgbKMpKWfvtnyTkDOy0q+JmGdOzFkb7v82hvpFORlOv8AUUcnneaXZaULC5dnq/sCq/Uchmtv2s7pNxiPdb5/6dl6INixorwP8CDAC/JVtTvnb2ywAAAABJRU5ErkJggg==",
	class: "btnbbcode3 editor_Button",
	onmouseout: "helpline2();",
	onmouseover: "helpline2('Преобразовать ссылки Яндекс.фото в миниатюры с ссылками');",
	alt: "Преобразовать ссылки Яндекс.фото в миниатюры с ссылками", 
	title: "Преобразовать ссылки Яндекс.фото в миниатюры с ссылками",
})
.click({message: $('form[name="postform"] textarea[name="message"]'), suffix: "M"}, parseMessage) 
.appendTo("#abbc3posttable .cat:last");

function parseMessage(e) {

	if (e.data.message && e.data.message.val && e.data.suffix) {
		var message = e.data.message;
		var suffix = e.data.suffix;

		// (?:(?:\[url[^\]]*\]\s*|)\[img[^\]]*\]\s*|)(?:https?://|)(img-fotki\.yandex\.ru/get/\d+/[^/]+/[/0-9a-f._-]+[_-])(?:X*L|X\dL|M|X*S|SQ\d+|orig)(?:\.jpe?g|)\.jpg(?![\]"])(?:\s*\[/img\](?:\s*\[/url\]|)|)
		// (?:<a[^>]*>\s*|)<img[^>]+src="https?://(img-fotki\.yandex\.ru/get/\d+/[^/]+/[/0-9a-f._-]+[_-])(?:X*L|X\dL|M|X*S|SQ\d+|orig)(?:\.jpe?g|)\.jpg(?!])"[^>]*>(?:\s*</a>|)
		// (?:(?:\[url[^\]]*\]\s*|)\[img[^\]]*\]\s*|(?:<a[^>]*>\s*|)<img[^>]+src="|)(?:https?://|)(img-fotki\.yandex\.ru/get/\d+/[^/]+/[/0-9a-f._-]+[_-])(?:X*L|X\dL|M|X*S|SQ\d+|orig)(?:\.jpe?g|)\.jpg(?:\s*\[/img\](?:\s*\[/url\]|)|"[^>]*>(?:\s*</a>|)|)
		message.val(message.val().replace(
			/(?:(?:\[url[^\]]*\]\s*|)\[img[^\]]*\]\s*|(?:<a[^>]*>\s*|)<img[^>]+src="|)(?:https?:\/\/|)(img-fotki\.yandex\.ru\/get\/\d+\/[^\/]+\/[\/0-9a-f._-]+[_-])(?:X*L|X\dL|M|X*S|SQ\d+|orig)(?:\.jpe?g|)\.jpg(?:\s*\[\/img\](?:\s*\[\/url\]|)|"[^>]*>(?:\s*<\/a>|)|)/ig,
			"[url=http://$1orig.jpg][img]http://$1" + suffix + ".jpg[/img][/url]"
		));

		// (?:https?://|)fotki\.yandex\.ru/(?:\S+/|)users/([^/]+)/(?:album/\d+/|)view/(\d+)/?(?:\?\S*|)
		var links = message.val().matchAll(/(?!=")(?:https?:\/\/|)fotki\.yandex\.ru\/(?:\S+\/|)users\/([^\/]+)\/(?:album\/\d+\/|)view\/(\d+)\/?(?:\?\S*|)/ig);
		for (var i = 0; i < links.length; i++) {
			parseLink(links[i], message, suffix);
		}
	}
}

function parseLink(linkArray, message, suffix) {
//	console.log(linkArray);
	var link = linkArray[0];
	var user = linkArray[1];
	var photoId = linkArray[2];

	$.ajax({
		dataType: "jsonp",
		url: "http://api-fotki.yandex.ru/api/users/" + user + "/photo/" + photoId + "/",
		type: "GET",
		data: {
			format: "json"
		},
		success: function (data) {
			if (data.img && data.img.orig) {
				var photoLink = data.img.orig.href.toString().match(/(.+?_)orig(?:\.jpe?g|\.jpg|)/i);
				if (photoLink) {
					photoLink = photoLink[1];
					message.val(message.val().replace(link, "[url=" + photoLink + "orig.jpg][img]" + photoLink + suffix + ".jpg[/img][/url]"));
				}
			}
		} /* ,

		error: function (data, textStatus, errorThrown) {
			console.log("error");
			console.log(textStatus);
			console.log(data);
		} */
	});
}
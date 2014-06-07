// ==UserScript==
// @name dd-ignore
// @description Хуй, пизда, ликование!
// @include http://www.darkdiary.ru/
// @include http://darkdiary.ru/
// @include darkdiary.ru/
// @include http://www.darkdiary.ru/?page=*
// @include http://darkdiary.ru/?page=*
// @include darkdiary.ru/?page=*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

var antimagic = function(event){
	var nick = $(this).siblings("a[href $= '/profile']").attr("href").replace("/users/","").replace("/profile","");
	GM_setValue("dd_ignore", GM_getValue("dd_ignore", " ").replace(" " + nick+" ", " "));
	$("div[data-user = '" + nick + "']").parent().siblings().attr("style","padding-bottom: 3px");
	$("div[data-user = '" + nick + "']").parent().remove();
	$('a[title="Профиль"][href="/users/' + nick + '/profile"] + a + a').attr("title", "Игнорировать этого нехорошего человека.").unbind("click").bind("click", magic)
	.next().remove();
	event.preventDefault();
}

var toggle = function(event){
	$(this).parents("tr[id ^= 'entry'] > td").attr("style","display:none").siblings().attr("style","padding-bottom: 3px");
	event.preventDefault();
}

var hide = function(ignoreList){
	ignoreList.forEach(function(value, index, array){
		$('a[title="Профиль"][href="/users/' + value + '/profile"] + a + a').attr("title", "Скрыть обратно О_о").unbind("click").bind("click", toggle)
		.after(" <a title='Амнистировать' class = 'forgive' href = '#'><img width='13' height='13' border='0' src='/gfx/auth.gif'></img></a>")
		.parent().parent().parent().parent().parent().parent().attr("style","display:none")
		.after("<td class='notice' style='" + noticeStyle + "'><div class='textBg' data-user='" + value + "' cellspacing='0' cellpadding='5' style='border:solid 1px #ddddcc; padding-left: 120px'>Пользователь <b>" +
		value + "</b> написал какую-то глупость. <a class='show' href='#'>Показать?</a></div></td>");
	})
	$(".show").bind("click", toggle);
	$("a.forgive").bind("click", antimagic);
}

var magic = function(event){
	var nick = $(this).siblings("a[href $= '/profile']").attr("href").replace("/users/","").replace("/profile","");
	GM_setValue("dd_ignore", GM_getValue("dd_ignore", " ").replace(" " + nick + " ", " ") + nick + " ");
	event.preventDefault();
	hide([nick]);
}

var showIgnore = function(event){
	alert("Игнор-лист: \r\n" + GM_getValue("dd_ignore", " ").split(" ").join("\r\n"));
	event.preventDefault();
}

var toggleNotices = function(event){
	if( $(this).text() == "Скрыть оповещения"){
		noticeStyle = "display:none";
		$(this).text("Показать оповещения");
		$(".notice").attr("style", noticeStyle);
	}else{
		noticeStyle = "padding-bottom:3px";
		$(this).text("Скрыть оповещения");
		$("td[style='display:none'] + .notice").attr("style", noticeStyle);
	}
	GM_setValue("noticeStyle", noticeStyle);
	event.preventDefault();
}

var noticeStyle = GM_getValue("noticeStyle", "padding-bottom:3px");

$("a[href $= '/profile'] + a").after(" <a title='В игнор пидораса!' class = 'ignore' href = '#'><img width='13' height='13' border='0' src='/gfx/delete.gif'></img></a>");
$(".ignore").bind("click", magic);
$("td.textBlock:contains('Мой дневник')").parent().parent().parent().parent().parent().after("<tr><td style='padding-bottom:3px'>"+
"<table cellspacing='0' cellpadding='0' class='tblCommon'><tbody><tr><td class='textBlock'><div style='padding-bottom:4px'><strong>Игнор</strong></div> <div>"+
"<a id='showIgnoreList' href='#'>Игнор-лист</a><br><a id='toggleNotices' href='#'>" + 
(noticeStyle == "display:none" ? "Показать оповещения" : "Скрыть оповещения")+"</a></div></td></tr></tbody></table></td></tr>");
$("#showIgnoreList").bind("click", showIgnore);
$("#toggleNotices").bind("click", toggleNotices);
hide(GM_getValue("dd_ignore", " ").split(" "));
$("a:contains('_Sirion')").text("Сирион");
$("a:contains('Ioshk')").text("Картман");
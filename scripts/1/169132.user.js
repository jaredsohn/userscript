// ==UserScript==
// @name dd-ignore-chrome
// @description Хуй, пизда, ликование!
// @include http://www.darkdiary.ru/
// @include http://darkdiary.ru/
// @include darkdiary.ru/
// @match http://www.darkdiary.ru/?page=*
// @match http://darkdiary.ru/?page=*
// @match darkdiary.ru/?page=*
// @match http://www.darkdiary.ru/users/*
// @match http://darkdiary.ru/users/*
// @match darkdiary.ru/users/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_log
// ==/UserScript==

var antimagic = function(event){
	var nick = $(this).siblings("a[href $= '/profile']").attr("href").replace("/users/","").replace("/profile","");
	GM_setValue("dd_ignore", GM_getValue("dd_ignore", " ").replace(" " + nick+" ", " "));
	$("div[data-user = '" + nick + "']").parent().siblings().attr("style","padding-bottom: 3px");
	$("div[data-user = '" + nick + "']").parent().remove();
	$('a[title="Профиль"][href="/users/' + nick + '/profile"] + a + a').attr("title", "В игнор пидораса!").unbind("click").bind("click", magic).next().remove();
    fillList(GM_getValue("dd_ignore", " ").split(" "));
	event.preventDefault();
};

var toggle = function(event){
	$(this).parents("tr[id *= '_'] > td").attr("style","display:none").siblings().attr("style","padding-bottom: 3px");
	event.preventDefault();
};

var hide = function(ignoreList){
	ignoreList.forEach(function(value, index, array){
		$('a[title="Профиль"][href="/users/' + value + '/profile"] + a + a').attr("title", "Скрыть обратно О_о").unbind("click").bind("click", toggle)
		.after(" <a title='Амнистировать' class = 'forgive' href = '#'><img width='13' height='13' border='0' src='/gfx/auth.gif'></img></a>")
        .closest("tr[id *='_']").find("table[class='tblCommon']").parent().attr("style","display:none")
		.after("<td class='notice' style='" + noticeStyle + "'><div class='textBg' data-user='" + value +
               "' cellspacing='0' cellpadding='5' style='border:solid 1px #ddddcc; padding-left: 120px'>Пользователь <b>" +
			   value + "</b> написал какую-то глупость. <a class='show' href='#'>Показать?</a></div></td>");
	});
	$("a.show").unbind("click").bind("click", toggle);
	$("a.forgive").unbind("click").bind("click", antimagic);
};

var magic = function(event){
	var nick = $(this).siblings("a[href $= '/profile']").attr("href").replace("/users/","").replace("/profile","");
	GM_setValue("dd_ignore", GM_getValue("dd_ignore", " ").replace(" " + nick + " ", " ") + nick + " ");
    fillList(GM_getValue("dd_ignore", " ").split(" "));
	event.preventDefault();
	hide([nick]);
};

var antimagicByName = function(event){
    var nick= $(this).prev().attr("href").replace("/users/","").replace("/profile","").replace("/","");
    //GM_log(nick);
	GM_setValue("dd_ignore", GM_getValue("dd_ignore", " ").replace(" " + nick+" ", " "));
    fillList(GM_getValue("dd_ignore", " ").split(" "));
	$("div[data-user = '" + nick + "']").parent().siblings().attr("style","padding-bottom: 3px");
	$("div[data-user = '" + nick + "']").parent().remove();
	$('a[title="Профиль"][href="/users/' + nick + '/profile"] + a + a').attr("title", "В игнор пидораса!").unbind("click").bind("click", magic).next().remove();
	event.preventDefault();
};

var fillList = function(ignoreList){
    ignoreListContainer.html("<strong>Список неудачников</strong>").attr("style","padding-bottom:3px");
    ignoreListContainer.next().remove();//siblings().remove();
    var tmpList="<div><p>";
    ignoreList.forEach(function(value, index, array){
        if(value!="")tmpList+='<span><a href="/users/'+value+'/">'+value+'</a>'+
            '<a title="Амнистировать" class = "forgiveFromList" href = "#"> <img width="13" height="13" border="0" src="/gfx/auth.gif"></img></a><span></br>';	   
    });
    tmpList+="</p></div>";
    ignoreListContainer.after(tmpList);
    $("a.forgiveFromList").unbind("click").bind("click", antimagicByName);
};

var showIgnore = function(event){
    ignoreListStyle=(ignoreListStyle=="display:none"?"padding-bottom:3px":"display:none");
    ignoreListContainer.closest("table").parent().attr("style", ignoreListStyle);
    $(this).text(ignoreListStyle=="display:none"?"Показать список":"Скрыть список");
    GM_setValue("ignoreListStyle", ignoreListStyle);
    fillList(GM_getValue("dd_ignore", " ").split(" "));
	event.preventDefault();
};

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
};

var noticeStyle = GM_getValue("noticeStyle", "padding-bottom:3px");
var ignoreListStyle = GM_getValue("ignoreListStyle", "display:none");
var ignoreListContainerType=0;
var ignoreListContainer=$("td.textBlock:contains('Наши интересы')").parent().parent().parent().parent().parent().parent().find("div").first();
if(ignoreListContainer.prop("baseURI")==undefined){
    ignoreListContainerType=1;
    var ignoreListContainerHolder=$("td.textBlock:contains('Мои теги')").parent().parent().parent().parent().parent().parent();
    if(ignoreListContainerHolder.prop("baseURI")==undefined){
    	ignoreListContainerHolder=$("td.textBlock:contains(' друзья')").parent().parent().parent().parent().parent().parent();
        if(ignoreListContainerHolder.prop("baseURI")==undefined){
            ignoreListContainerType=-1;
        }
    }
    if(ignoreListContainerType>=0){
    	var sHTMLTemplate='<tr><td><table cellpadding="0" cellspacing="0" class="tblCommon">'+
		'<tbody><tr><td class="textBlock"><div></div></td></tr></tbody></table></td></tr>';
        ignoreListContainerHolder.children().last().after(sHTMLTemplate);
        ignoreListContainer=ignoreListContainerHolder.find("div").last();
    }
}
$("div.textBlock:contains('чтение/комментарии записи')").closest("tr").next().attr("style", "display:none").html("");
ignoreListContainer.closest("table").parent().attr("style", ignoreListStyle);
//GM_log(ignoreListContainer.prop("baseURI"));
fillList(GM_getValue("dd_ignore", " ").split(" "));
$("a[href $= '/profile'] + a").after(" <a title='В игнор пидораса!' class = 'ignore' href = '#'><img width='13' height='13' border='0' src='/gfx/delete.gif'></img></a>");
$(".ignore").bind("click", magic);
$("td.textBlock:contains('Мой дневник')").parent().parent().parent().parent().parent().after("<tr><td style='padding-bottom:3px'>"+
"<table cellspacing='0' cellpadding='0' class='tblCommon'><tbody><tr><td class='textBlock'><div style='padding-bottom:4px'><strong>Игнор</strong></div> <div>"+
"<a id='showIgnoreList' href='#'>" + 
(ignoreListStyle == "display:none" ? "Показать список" : "Скрыть список")+"</a><br><a id='toggleNotices' href='#'>" + 
(noticeStyle == "display:none" ? "Показать оповещения" : "Скрыть оповещения")+"</a></div></td></tr></tbody></table></td></tr>");
$("#showIgnoreList").bind("click", showIgnore);
$("#toggleNotices").bind("click", toggleNotices);
hide(GM_getValue("dd_ignore", " ").split(" "));
$("a:contains('_Sirion')").text("Сирион");
$("a:contains('Ioshk')").text("Картман");
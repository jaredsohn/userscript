// ==UserScript==
// @name           NYA.SH селектор шапок (nyash)
// @namespace      changing nya.sh top image
// @description    Позволяет выбирать картинку в шапке на сайте nya.sh и запоминает выбор в куках. ищите превьюшки на странице http://nya.sh/top/ (nyash)
// @version        0.3
// @license        none
// @include        http://nya.sh/*
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @require        https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// ==/UserScript==
//проверяем урл, скрипт исполняется только на сайте "nya.sh"
var url = window.location.pathname;
//далее большой кусок, который исполняется только на странице "nya.sh/top"
if (url.substring(url.length - 5, url.length) == '/top/' ||
url.substring(url.length - 4, url.length) == '/top') {
//добавляем макет шапки (копипаста шапки с главной страницы)
//и два скрипта для JQuery и JQuery.Cookies с общедоступных ссылок
var a =
'<div style="position:fixed; border: 1px #c0c0c0 solid; width:760px; height:170px; background-color:#F0F0F0; top:0; left:600px" id="hdr">' +
'    <table width="100%" cellspacing="0" cellpadding="0" border="0">' +
'    <tbody><tr>' +
'        <td valign="middle" align="center" style="height:170px">' +
'            <div class="toplink"><a href="/" style="font-family:verdana,arial,helvetica,sans-serif;font-size:36px;font-weight:700;color:#5A3F99,text-decoration:none,text-align:-moz-center"><sup>^</sup>&#1053;&#1071;.&#1064;<sup>^</sup></a></div>' +
'        </td>' +
'        <td width="1%"><a href="/top/"><div style="width:320px;height=170px"><img id="preview" width="320" height="170" alt="top-image"></div></a></td>' +
'    </tr>' +
'    </tbody></table>' +
'</div>' +
'<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js" />'+
'<script type="text/javascript" src="https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js" />';
$("body").append(a);
//для каждой строчки с файлом
$("img[alt='[IMG]']").each(function(index, element) {
    var element2 = $(element).next();
    //берем имя файла
    var src = '/top/' + element2.text();
    //если в имени есть "-src" то просто добавляем 5 пробелов
    if (/^.*\-src.*$/.test(src)) {
      $(element).after('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    }
    //иначе, добавляем кнопку с превьюшкой
    else {
        $(element).after(' <a style="cursor:pointer" onclick="$.cookie(\'top-index\', \'' + src + '\', {expires: 365,path:\'/\'});alert(\'Image ' + src + ' selected!\')" onmouseover="$(\'#preview\')[0].src=\'' + src + '\';">' +
                         '<img src="'+src+'" style="width:32px;height:17px"/></a>');
    }
});
}
//а эти 2 строчки как раз и меняют шапку на всех остальных страницах няша, если находят сохраненную шапку в куках
if ($.cookie("top-index")) {
$("img[alt='top']")[0].src = $.cookie("top-index");
}
// ==UserScript==
// @name           hide post
// @namespace      vladislav
// @description    Скрытие постов с главной (для модеров)
// @include        http://football.hiblogger.net/authors/*/*.html
// @include        http://*.hiblogger.net/*.html
// @include        http://football.hiblogger.net/authors/*/*.html/thread/*
// @include        http://football.hiblogger.net/authors/*/*.html#cmnt*
// @include        http://*.hiblogger.net/*.html/thread/*
// @include        http://*.hiblogger.net/*.html#cmnt*
// @exclude        http://*hiblogger.net/messages/write.html?*
// ==/UserScript==

// post() function
// Syntax: post('https://www.google.com/accounts/ServiceLoginAuth?service=youtube', 'Email=thetenfold&Passwd=catsdogs', handleResponse);
function post(url, data, cb) {
GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    headers: {
		'Content-type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html'
    },
	data: encodeURI(data),
    onload: function(r) {cb(r);}
});
}



function ban_post(nick_blogger, id_post, url_ban) {
var handleResponse;

url_ban=url_ban+'/ban-post/';

post(url_ban, 'ajax=1&type=ban&reason=&post_id='+id_post, handleResponse);
alert('Готово!');
}



function ban_post_request() {



var reg=/(?:authors|community)\/(\w+)\/(\d+).html/;
var arr=reg.exec(document.location.href);
if (arr) {
 reg=/(http:\/\/football.hiblogger.net\/(?:authors|community)\/(?:\w+))/;
 var url=reg.exec(document.location.href);
 banurl=url[1];
}



if (!arr) {
 reg=/community.hiblogger.net\/([0-9a-z_]+)\/(\d+).html/; 
 arr=reg.exec(document.location.href);
 if (arr) {
  reg=/(http:\/\/community.hiblogger.net\/(?:\w+))/;
  var url=reg.exec(document.location.href);
  banurl=url[1];
 }
}



if (!arr) {
 reg=/([0-9a-z]+).hiblogger.net\/(\d+).html/; 
 arr=reg.exec(document.location.href);
 if (arr) {
  reg=/(http:\/\/(?:[0-9a-z]+).hiblogger.net)/;
  var url=reg.exec(document.location.href);
  banurl=url[1];
 }
}



if(arr[1] && arr[2] && banurl) if (confirm('Убрать запись блоггера/сообщества '+arr[1]+' под номером '+arr[2]+'?')) ban_post(arr[1],arr[2],banurl);
}

GM_registerMenuCommand("Убрать пост", ban_post_request);
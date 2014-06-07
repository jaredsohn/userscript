// ==UserScript==
// @name           ban blogger
// @description    Скрипт для бана блоггера на один день
// @namespace      vladislav
// @include        http://*hiblogger.net/messages/write.html?journal=*
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



function ban_blogger(nick_blogger, id_blog, url_ban) {
var handleResponse;

url_ban=url_ban+'/ban/';

post(url_ban, 'ajax=1&period=1&type=ban&reason=&blogid='+id_blog, handleResponse);
alert('Готово!');
}



function ban_request() {

var nick, id;

var reg=/write.html\?journal=(\w+)/;
var arr=reg.exec(document.location.href);

if (arr) {
nick=arr[1];


reg=/football.hiblogger.net/;
arr=reg.exec(document.location.href);

if (arr) banurl="http://football.hiblogger.net/authors/"+nick;
else  banurl="http://"+nick+".hiblogger.net";

}

if (document.getElementById("id_to")) var id=document.getElementById("id_to").value;

if(nick && id) if (confirm('Забанить блоггера '+nick+'?')) ban_blogger(nick,id,banurl);
}

GM_registerMenuCommand("Забанить блоггера", ban_request);


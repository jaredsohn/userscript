// ==UserScript==
// @name		   Autopage for hhcomic_Mod
// @version		   20140422
// @namespace	   
// @author		   
// @description	   
// @include		   http://www.hhcomic.com/*
// @include		   http://www.hhmanhua.com/*
// @run-at		   document-end
// @grant		   none
// @require		   http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js
// ==/UserScript==
var uw = unsafeWindow;
var currpage = parseInt(uw.page);
var totalpage = parseInt(uw.datas);
var server = uw.server;
var arrPicListUrl = uw.PicListUrl.split('|');
var datas = uw.arrPicListUrl.length;
var ServerList = uw.ServerList;

var body = '';

for (i = currpage - 1; i < arrPicListUrl.length; i++) {
    var a = ServerList[server - 1] + arrPicListUrl[i];
    body += '<p>Page:' + (i + 1) + '/' + arrPicListUrl.length + '</p><img class="center fit" src="' + a + '"/>';
}

var newBody = '<head><style type="text/css">* {padding: 0;margin: 0;}.fit {max-width: 100%;max-height: 100%;}.center {display: block;margin: auto;} body {background-color:rgb(20,20,20); }</style></head><body>' + body + '</body>';

document.body.innerHTML = newBody;

function set_body_weight() {
    var ww = $(window) .weight();
    $('body') .weight(ww);
    // body height = window height
    $(document) .ready(function () {
        set_body_weight();
        $(window) .bind('resize', function () {
            set_body_weight();
        });
    });
}

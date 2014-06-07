// ==UserScript==
// @name       Taobao Search Highlighter
// @namespace  http://veretenenko.ru/
// @version    1.0
// @description  This script highlight Taobao items on the search page which has payments or comments
// @match      http://s.taobao.com/*
// @copyright  2013+, anton@veretenenko.ru
// @license    CC-BY-SA-NC
// ==/UserScript==

function addJavascript(jsname) {
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
    s.addEventListener('load', tbh_start, false);
	th.appendChild(s);
}

if (location.hostname.indexOf("s.taobao.com") >= 0) {
	addJavascript('//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
}

function tbh_log(msg)
{
    var tag = 'Taobao Highlighter: ';
    console.log(tag + msg);
}

function tbh_start()
{
    if (typeof jQuery != 'undefined') {
        tbh_log('jQuery found, doing highlighting');
        tbh_highlight();
    }
}

function tbh_highlight()
{
    $("div.item.col").each(tbh_items_iterator);
}

function tbh_items_iterator(index)
{
    var nid = $(this).attr('nid');
    var parent = $(this);
    $("div[nid='"+nid+"'] div.col.dealing").each(function (index) {
        var pay_count = parseInt($(this).text().trim());
        if (pay_count > 0) {
            parent.css('background-color', 'rgba(255, 255, 10, 0.2)');
        }
    });
    $("div[nid='"+nid+"'] div.col.end.count").each(function (index) {
        parent.css('background-color', 'rgba(0, 185, 10, 0.2)');
    });
}
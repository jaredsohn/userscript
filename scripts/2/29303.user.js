// ==UserScript==
// @name           NicoLinkCord
// @namespace      http://yamadamemo.blog121.fc2.com/
// @description    ニコニコ動画にFC2用の外部プレイヤーを貼り付けるコードを作成
// @include        http://www.nicovideo.jp/watch/*
// @version        0.1.1
// ==/UserScript==

var width = '320';
var height = '252';
var title = document.title;
title = title.substring(0, title.lastIndexOf('\u2010', title.length));
var url = document.URL;
var videoID = url.substring(url.lastIndexOf('/', url.length)+1, url.length);

var format = '<p><a target=&quot;_blank&quot; href=&quot;' + url + '&quot;>\u3010\u30cb\u30b3\u30cb\u30b3\u52d5\u753b\u3011' + title + '</a><br><script type=&quot;text/javascript&quot; src=&quot;http://ext.nicovideo.jp/thumb_watch/' + videoID + '?w=' + width + '&h=' + height + '&quot;></script></p>';

var elm = document.createElement('tr');
var td1 = document.createElement('td');
with(td1.style) {
	nowrap = 'nowrap';
	align = 'right';
}
td1.className = 'TXT12';
td1.innerHTML = '<strong>\u5916\u90e8\u30d7\u30ec\u30a4\u30e4\u30fc\uff1a</strong>';
var td2 = document.createElement('td');
td2.innerHTML = '<form name="form_script"><input class="paste" type="text" value="' + format + '" onClick="javascript:document.form_script.input_script.focus(); document.form_script.input_script.select();" name="input_script" readonly="true" /></form>';
elm.appendChild(td1);
elm.appendChild(td2);
var tbody = document.evaluate('id("WATCHHEADER")/child::table/descendant::table/child::tbody', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);;
tbody.insertBefore(elm, tbody.childNodes.item(5));

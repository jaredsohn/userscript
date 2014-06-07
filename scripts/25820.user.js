// ==UserScript==
// @name           nicovideo Add chart links
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    Add nicochart links at nicovideo's watch page.
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

var video_id = unsafeWindow.Video.id;

var chart_link = document.createElement('a');
chart_link.appendChild(document.createTextNode('nicochart'));
chart_link.href = 'http://www.nicochart.jp/watch/' + video_id;

var reserve_link = document.createElement('a');
reserve_link.innerHTML = '<img src="data:image/gif;base64,R0lGODlhDAAMAIMAAG1tbcvLy6WlpYCAgP7+/ra2tnZ2dubm5q6uroqKigAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIVwATABgIgAABBAUMGhQ40KABAAMOGBxA0GAAigMIFIAoUCEBigUEBiCQwGMAAAw9eiRYUKXBgSI9CiBwMsHGjAoBCAD5EeJIAgRxHqBo4CVMjwUQGIUZEAA7" alt="(更新申請)" style="vertical-align: middle;">';
reserve_link.href = 'http://www.nicochart.jp/reserve/' + video_id;

var p = document.evaluate('//h1/preceding-sibling::p[1]' ,
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
p.appendChild(document.createTextNode(' '));
var span = document.createElement('span');
span.appendChild(document.createTextNode('['));
span.appendChild(chart_link);
span.appendChild(document.createTextNode(' '));
span.appendChild(reserve_link);
span.appendChild(document.createTextNode(']'));
p.appendChild(span);

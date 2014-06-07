// ==UserScript==
// @name           exhentai.org downloader keating VER
// @namespace      exhentai
// @description    exhentai downloader 批量下载地址解析
// @include        http://exhentai.org/s/*
// ==/UserScript==

function parse_html(html)
{
var m;
var out = {};
//Page 1 / 223
var re_page = />([0-9]+)+<\/span> \/ <span.*>([0-9]+)<\/span>/   
m = re_page.exec(html);
if (m)
{
out.current = parseInt(m[1]);
out.total = parseInt(m[2]);
//alert(m[1]);
//alert(m[2]);
}
//var retemp=out.current+1;
//var re_next = new RegExp('<a +href="([^"]*)"[^>]*>[ \t]*<img[^>]+alt="'+retemp);
//var m2 = re_imgname.exec(html);
//alert(m2[1]);
//alert(m2[2]);
/*if (m)
{
out.next_url = m[1];
//alert(m[1]);
}*/

var re_img = /<\/div><a +href="([^"]*)"[^>]*>[ \t]*<img[^>]+src="([^"]*)" +style/;
//var re_img = new RegExp('<a +href="([^"]*)"[^>]*>[ \\t]*<img[^>]+src="([^"]*'+m2[1]+'\\.'+m2[2]+')');
//alert(re_img);
m = re_img.exec(html);
if (m)
{
out.next_url = m[1];
out.img_url = m[2];

//alert(m[1]);
//alert(m[2]);
}

return out;
}

function build_ui()
{

var mainimg=getimg();
var main = mainimg.parentNode;
var main2 = document.createElement('div');
main2.innerHTML='<div id="__status__"></div><div id="__output__"></div>';
main.parentNode.replaceChild(main2,main);
}
function append_output(html)
{
document.getElementById('__output__').innerHTML += html;
}
function set_status(html)
{
document.getElementById('__status__').innerHTML = html;
}
function do_current()
{
var current_out = unsafeWindow.__currentout__;
//Thanks neozone for the code
if ('img_url' in current_out)
{
if(current_out.current<10)
append_output('<a href="'+current_out.img_url+'">00'+current_out.current+'</a> ');
else if(current_out.current<100)
append_output('<a href="'+current_out.img_url+'">0'+current_out.current+'</a> ');
else
append_output('<a href="'+current_out.img_url+'">'+current_out.current+'</a> ');
}
//ajax next
setTimeout(do_next,5000);

}
function do_next()
{
var current_out = unsafeWindow.__currentout__;

if (current_out.current < current_out.total &&
'next_url' in current_out)
{
var url = current_out.next_url;
var fetch_current=current_out.current+1;
set_status('current:'+fetch_current+'/'+current_out.total+'<br/>fetch:'+url);
function onload(resp)
{
if (resp.status!=200){do_error('download error:'+resp.statusText);return;}
var out = parse_html(resp.responseText);
//todo::handle parse error
var items = [];
for (x in out){items.push(x);}
if (items.length<4)
{
//GM_log('error url:'+resp.finalUrl);
//GM_log('error html:'+resp.responseText);
do_error('Parse error:'+resp.responseText);
return;
}
if (out.img_url.indexOf("509.gif") > 0){do_error('Parse error:'+resp.responseText);}
oldurl=unsafeWindow.__currentout__.next_url;
unsafeWindow.__currentout__ = out;
do_current();
}
GM_xmlhttpRequest({
method:'GET',
url:url,
headers:{
'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.0.4) Gecko/2008102920 Firefox/3.5.1',
'Referer':oldurl,
'Cookie':document.cookie
},
onload:onload,
onerror:do_error
});



}
}
function do_error(reason)
{
//GM_log('do_error='+reason);
var html = '<button id="__continue__">Continue</button><br/>';
var txt = document.createTextNode(reason);
var div = document.createElement('div');
div.appendChild(txt);
set_status(html+div.innerHTML);
document.getElementById('__continue__').addEventListener('click',function(e){
set_status('');
do_next();
},false)
}
function btn_download_click(e)
{
document.getElementById('__btn_download__').disabled = true;
oldurl=document.location.href;
unsafeWindow.__currentout__ = parse_html(document.documentElement.innerHTML);
build_ui();
do_current();
}
var tmp = document.getElementsByTagName('H1')[0];
if (tmp)
{
var div = document.createElement('div');
div.innerHTML = '<button id="__btn_download__">Download</button>';
tmp.parentNode.insertBefore(div,tmp.nextSibling.nextSibling.nextSibling);
var btn = document.getElementById('__btn_download__');
btn.addEventListener('click',btn_download_click,false);

}
function getimg()
{
var allLinks, thisLink;
allLinks = document.evaluate(
'//img',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
for (var i = 0; i < allLinks.snapshotLength; i++)
{
thisLink = allLinks.snapshotItem(i);
// do something with thisLink
//var re_img = /http:\/\/.*\.php.*/;
//var re_img2 =/http:\/\/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}.*/;
//var re_img3 = /http:\/\/[^:]*keystamp.*/;
//var m = re_img.exec(thisLink.src);
//var m2 = re_img2.exec(thisLink.src);
//var m3 = re_img3.exec(thisLink.src);
//alert(thisLink.src+'@@'+unsafeWindow.__currentout__.img_url);
//m||m2
if (i == 4){
//alert(thisLink.src);
return thisLink;}
}
}
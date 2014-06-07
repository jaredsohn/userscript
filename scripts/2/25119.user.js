// ==UserScript==
// @name           tianya lz only
// @namespace      http://pto2k.blogspot.com
// @description    show only lz etc
// @include        http://cache.tianya.cn/publicforum/content/*
// ==/UserScript==

/*
Changelog
April 14, 2008 4:06 PM
解决取不到楼主名字

2008-04-14 01:46:45
初步实现只显示楼主的功能
切换操作2种：
1）双击页面
2）按V键

建议配合页面样式修改使用：
http://userstyles.org/styles/6320 

*/
/* 用xpath查对象 返回一个*/
var xpath = function(query) {
	queryResult = document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return queryResult.snapshotItem(0);
}
/* 用xpath查对象 返回全部*/
var xpathAll = function(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
/* 隐藏对象 */
var hideMe = function(item){
	//alert(item)
	if (item) {
		with (item.style){
			display="none";
		}
	}
}
/* 显示对象 */
var showMe = function(item){
	//alert(item)
	if (item) {
		with (item.style){
			display="table";
		}
	}
}
/* 保存参数时转换代码 code from http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html */
function encode_utf8( s )
{
  return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s )
{
  return decodeURIComponent( escape( s ) );
} 

fixit = function(){
	/* 去除多余BR */
	document.body.innerHTML=document.body.innerHTML.replace(/(<br>　　)+/g,"<br/>");
	/* 为每个帖子添加DIV */
	text = document.body.innerHTML
	text=text.replace(/<\/center><\/td><td align="right" valign="bottom" width="100">&nbsp;<\/td><\/tr><\/tbody><\/table>/g,"</center></td><td align='right' valign='bottom' width='100'>&nbsp;</td></tr></tbody></table><div class='msgContent'>");
	text=text.replace(/<table bgcolor="#f5f9fa" border="0" cellspacing="0" width="100%"><tbody><tr><td align="right" valign="bottom" width="100"><\/td><td><font color="green" size="-1">/g,"</div><table bgcolor='#f5f9fa' border='0' cellspacing='0' width='100%'><tbody><tr><td align='right' valign='bottom' width='100'></td><td><font color='green' size='-1'>");
	text=text.replace(/<\/div><table bgcolor="#f5f9fa" border="0" cellspacing="0" width="100%"><tbody><tr><td align="right" valign="bottom" width="100"><\/td><td><font color="green" size="-1">/,"<table bgcolor='#f5f9fa' border='0' cellspacing='0' width='100%'><tbody><tr><td align='right' valign='bottom' width='100'></td><td><font color='green' size='-1'>");
	text=text.replace(/<\/div><\/div><center><script type="text\/javascript">/,"</div></div></div><center><script type='text/javascript'>");
	document.body.innerHTML = text
}

setTimeout(fixit, 500);

/* 初始设置 */
var showLzOnly = false;
var Auth;
firstPageLink = xpath("//a[starts-with(text(),'首页')]");
/* 如果是首页设置楼主，如果不是主页读取楼主 */
/* 必须先看一下第一页的楼主是谁.... */
if (!firstPageLink){
	Auth = xpath("//a[contains(@href,'Listwriter.asp?vwriter')]");
	Auth = Auth.textContent
	if(Auth){
		GM_setValue('Auth', encode_utf8(Auth));
	}
} else {
	Auth = decode_utf8(GM_getValue('Auth'));
}

lzOnly = function(){
	notAuthQuery1 = "//div[preceding-sibling::table[1]/descendant::a[not(contains(text(),'"+Auth+"'))]]"
	notAuthQuery2 = "//table[following-sibling::div[1][@class='msgContent']][descendant::a[not(contains(text(),'"+Auth+"'))]]"
	allNotLZ1 = xpathAll(notAuthQuery1)
	for(var i=0;i<allNotLZ1.snapshotLength;i++){
		thisNotLZ1 = allNotLZ1.snapshotItem(i);
		switchLzOnly(thisNotLZ1);
	}
	allNotLZ2 = xpathAll(notAuthQuery2)
	for(var i=0;i<allNotLZ2.snapshotLength;i++){
		thisNotLZ2 = allNotLZ2.snapshotItem(i);
		switchLzOnly(thisNotLZ2);
	}
	if (showLzOnly == false){
		showLzOnly = true
	}else{
		showLzOnly = false
	}	
}
var lzOnlyKey = function(event){
	var k = event.which;
	if (k == "118"){//v
		lzOnly();
	}
}
var switchLzOnly = function(item){
	if (showLzOnly == false){
		hideMe(item);
	} else {
		showMe(item);
	}
}


document.addEventListener('dblclick', function(event){lzOnly()}, true);
document.addEventListener('keypress', lzOnlyKey, true);

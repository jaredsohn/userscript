// ==UserScript==
// @name           bmc
// @namespace      bmc
// @version        0.0.5.1
// @description    将百度贴吧中的acfun,bili,nico号转为相应链接
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct=*
// @grant          none
// ==/UserScript==
function bigsmall(num1,num2){
	if(num1==num2) return num1;
	if(num1==-1) return num2;
	if(num2==-1) return num1;
	if(num1<num2) return num1;
	if(num1>num2) return num2;
	}
function replace1(oldword){
	var table=[
		["([sn]m[0-9]+)","http://www.nicovideo.jp/watch/$1","$1"],
		["(av[0-9]+)","http://bilibili.tv/video/$1","$1"],
		["(ac[0-9]+)","http://acfun.tv/v/$1","$1"],
		["(mylist/?)([0-9]+)","http://www.nicovideo.jp/mylist/$2","$1$2"],
		["(/?html/[a-z]{2,5}/[0-9]{8}/)([0-9]+)(.html)|(/?html/[a-z]{2,5}/[0-9]{8}/)([0-9]+)(_[0-9]+)\\b","http://acfun.tv/api/jump.php?type=acfun&id=$2.html","$1$2$3"]
	];
	for(var i=0;i<table.length;i++) {
		oldword=oldword.replace(new RegExp(table[i][0],"ig"),"<a href=\"" +table[i][1]+ "\">"+table[i][2]+"</a>");
	}
	return oldword;
}
function MainChange(PostRoot){
for(var number = 0;number<PostRoot.snapshotLength;number++){
	var intro = PostRoot.snapshotItem(number);
	var PostItem = intro.innerHTML;
	var start=0;
	var end=0;
	var itemarray = new Array();
	var itemno=0;
	var NewPostItem;
	var img;
	var a;
	while(start!=-1)
	{
		img=PostItem.indexOf("<img",end);
		a=PostItem.indexOf("<a",end);
		start=bigsmall(img,a);
		if(start!=-1){
		if(start!=end || start!=end++){
			itemarray[itemno] = PostItem.slice(end,start);
			itemno++;
		}
			if(start == a) end=PostItem.indexOf("</a>",start)+4;
			if(start == img) end=PostItem.indexOf(">",start)+1;
			itemarray[itemno] = PostItem.slice(start,end);
			itemno++;
		}
	}
			if(end!=PostItem.length-1);
			{
			itemarray[itemno] = PostItem.substring(end);
			itemno++;
			}
	var newthing = "";
	for(var i = 0;i<itemarray.length;i++){
		if(itemarray[i].indexOf("<img",0) == -1 && itemarray[i].indexOf("<a",0) == -1)   itemarray[i] = replace1(itemarray[i]);
		newthing +=itemarray[i];
		}
		intro.innerHTML = newthing;
 }
}
var PostRoot1 =  document.evaluate(
    '//div[@class="p_content"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var ReplyRoot =  document.evaluate(
    '//span[@class="lzl_content_main"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var TitleRoot =  document.evaluate(
    '//h1[@class="core_title_txt"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
MainChange(PostRoot1);
MainChange(ReplyRoot);
MainChange(TitleRoot);


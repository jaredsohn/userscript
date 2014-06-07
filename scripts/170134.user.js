// ==UserScript==
// @name        贴吧首页限制相同作者
// @namespace   yuxingyc
// @description 限制贴吧首页相同作者的帖子数量
// @include     http://tieba.baidu.com/f*
// @exclude     http://tieba.baidu.com/f?ct=*
// @exclude     http://tieba.baidu.com/f/*
// @downloadURL	https://userscripts.org/scripts/source/170134.user.js
// @updateURL	https://userscripts.org/scripts/source/170134.meta.js
// @version     1.1
// ==/UserScript==

var num=4;//首页显示相同作者的帖子的数量
var showContent=1;//相同作者帖子下方预览数量


var spans=$("span.tb_icon_author ");
var newtb=$("div.card_head").length;
var name=[],p=[],k=0;
num=num-1;
showContent=showContent-1;
for(var i=0;i<spans.length;i++)
{
	var thisSpan=spans[i];
	name[k]=thisSpan.innerHTML.split(/<a .*?>(.*?)</)[1];
	if(newtb==0)p[k]=thisSpan.parentNode.parentNode.parentNode.parentNode;
	else p[k]=thisSpan.parentNode.parentNode.parentNode.parentNode.parentNode;
	if($(p[k]).find("div.threadlist_title").find("img").length>0)name[k]="<a>"+k;
	var count=0;
	if(k>0)
	for(var j=0;j<k;j++)
	{	
			
		if(name[k]==name[j])
		{
			if(count<num)p[j].parentNode.insertBefore(p[k],p[j].nextSibling);
			else $(p[k]).remove();
			if(count>=showContent&&count<num)
			{
				$(p[k]).find("div.threadlist_detail").hide();
			}
			count++;
		}		
	}
	k++;
}
var li=$("li.j_thread_list");
var flag=1;
if(newtb==0)
for(var i=0;i<li.length;i++)
{
a=li[i];
if(flag==1){ a.style.background="rgb(245, 245, 245)";flag=0}
else if(flag==0){a.style.background="white";flag=1;}
}
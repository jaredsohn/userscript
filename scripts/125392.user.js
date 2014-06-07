// ==UserScript==
// @name           Google Reader Helper 谷歌阅读器助手
// @namespace      http://www.duzengqiang.com
// @description   在Google Reader里面添加分享到"新浪微博","腾讯微博","QZone","人人网"功能
// @features		在Google Reader里面添加分享到"新浪微博","腾讯微博","QZone","人人网"功能
// @version			0.3
// @created			2012.02.10
// @modified		2012.03.04
// @author			杜增强
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://www.google.es/reader/*
// @include        https://www.google.es/reader/*
// ==/UserScript==

var entries = document.getElementById("entries");
if(entries)
	entries.addEventListener('DOMNodeInserted', nodeInserted,true);

var entry, linkbar, link, title, source;

function nodeInserted(event){	
	//console.log("nodeInserted: " + event.target);
	if (event.target.tagName == "DIV"){
		if (event.target.className === "entry-actions"){
			// List mode
			linkbar = event.target;
			parent = event.target.parentNode;
		} else if (event.target.firstChild.className === "card card-common"
		    ||  event.target.firstChild.className === "ccard-container card-common"){ 
			// Expanded mode
			linkbar = event.target.getElementsByClassName("entry-actions")[0];
			parent = event.target;
		} else
			return;
				
		entry = parent.getElementsByClassName("entry-title-link")[0];	
		//文章链接
		link = entry.getAttribute('href');
		// 文章标题
		title = entry.firstChild.nodeValue;		
		// 文章来源
		source = "杜增强.COM";

		// 分享到新浪微博
		//addSinaWeibo();
		addSina();
		// 分享到腾讯微博
		addTencent();
		//
		//addTwitter();
		// 分享到QQ空间
		addQZone();
		// 分享到人人网
		addRenren();
	}
}

// 分享到新浪微博
function addSina()
{
	var url = 'http://v.t.sina.com.cn/share/share.php?url=' + link + '&title=' + title;
	var params = getParamsOfShareWindow(607, 523);
	//window.open(url, windowName, params);

	var t2 = ' &nbsp;<a href=\"javascript:(function(){window.open(\''+url+'\',\'_blank\',\''+params+'\');})()\" title=\"分享到新浪微博\"><img src=\"http://dzq.googlecode.com/files/sina.png\"/>新浪微博</a>';		
    var btn2 = document.createElement("span");
	btn2.innerHTML = t2;
	 //append button
    linkbar.appendChild(btn2);
}
// 分享到腾讯微博
function addTencent()
{
	var url = 'http://v.t.qq.com/share/share.php?title=' + title + '&source=' + source + '&url=' + link;
	var params = getParamsOfShareWindow(642, 468);
	//window.open(url, windowName, params);

	var t2 = ' &nbsp;<a href=\"javascript:(function(){window.open(\''+url+'\',\'_blank\',\''+params+'\');})()\" title=\"分享到腾讯微博\"><img src=\"http://dzq.googlecode.com/files/tencent.png\"/>腾讯微博</a>';		
    var btn2 = document.createElement("span");
	btn2.innerHTML = t2;
	 //append button
    linkbar.appendChild(btn2);
}
// 分享到QQ空间
function addQZone()
{
	var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + title + '&url=' + link + '&site=杜增强.COM';
	var params = getParamsOfShareWindow(634, 668);
	
	var t2 = ' &nbsp;<a href=\"javascript:(function(){window.open(\''+url+'\',\'_blank\',\''+params+'\');})()\" title=\"分享到QQ空间\"><img src=\"http://dzq.googlecode.com/files/qzone.png\"/>QQ空间</a>';		
    var btn2 = document.createElement("span");
	btn2.innerHTML = t2;
    linkbar.appendChild(btn2);
}
// 分享到人人网
function addRenren()
{
	var url = 'http://share.renren.com/share/buttonshare?link=' + link + '&title=' + title;
	var params = getParamsOfShareWindow(626, 456);
	
	var t2 = ' &nbsp;<a href=\"javascript:(function(){window.open(\''+url+'\',\'_blank\',\''+params+'\');})()\" title=\"分享到人人\"><img src=\"http://dzq.googlecode.com/files/renren.png\"/>人人网</a>';		
    var btn2 = document.createElement("span");
	btn2.innerHTML = t2;
    linkbar.appendChild(btn2);
}
// 
function addTwitter()
{
	var t2 = ' &nbsp;<a href=\"javascript:(function(){window.open(\'http://twitter.com/home?text='+encodeURIComponent(title)+'&url='+encodeURIComponent(link)+'\',\'_blank\',\'width=610,height=350\');})()\" title=\"分享到Twitter\">分享到Twitter</a>';		
    var btn2 = document.createElement("span");
	btn2.innerHTML = t2;
	 //append button
    linkbar.appendChild(btn2);
}


function getParamsOfShareWindow(width, height) {
	//分享条
	return ['toolbar=0,status=0,resizable=1,width=' + width + ',height=' + height + ',left=', (screen.width - width) / 2, ',top=', (screen.height - height) / 2].join('');
}
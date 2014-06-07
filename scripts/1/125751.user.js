// ==UserScript==
// @name          天涯百宝箱（Tianya PandoraBox)
// @namespace     http://userscripts.org/scripts/show/125751
// @description	  替换天涯百宝箱。自动只看楼主+高亮楼主，同时提供只看某人回复、高亮楼主、分页导航等功能。
// @homepage	  原作者 http://blog.sina.com.cn/zhangliminqd
// @author        orchidflower
// @version       1.3.2
// @include       http://www.tianya.cn/publicforum/content/*
// @include       http://www.tianya.cn/pub/c/*
// @include       http://www.tianya.cn/new/Publicforum/*
// @include       http://bbs.city.tianya.cn/tianyacity/Content/*
// @include       http://www.tianya.cn/techforum/content/*
// ==/UserScript==
// Licence: GPL
// 2012.11.26 1.3.2 修改style的定义方式。解决在Firefox17中脚本错误的问题。
// 2012.06.08 1.3.1 修改阴影效果，以支持最新的Firefox13.
// 2012.04.12 1.3.0 增加配置选项：只看楼主（选中则默认只看楼主，否则显示全部）。代码重构。
// 2012.03.12 1.2.1 天涯更新了图片延迟加载的参数，所以导致第一屏幕的图片又显示不出来了，更新解决这个问题。
// 2012.02.20 1.2.0 解决了帖子里面图片延迟加载的问题（先前版本会导致当前帖子第一屏幕中的图片显示不了）。
// 2012.02.17 1.1.1 增加对chrType类型是city的天涯帖子的支持（譬如各个城市自己的板块）。调整页面列表窗口的位置。
// 2012.02.16 1.1.0 增加对chrType类型是tech的天涯帖子的支持（譬如板块莲蓬鬼话）。原来支持的是chrType是public的（譬如板块国际观察）
// 2012.02.13 1.0.0 First release

chrAuthorName	= unsafeWindow.chrAuthorName;
chrType			= unsafeWindow.chrType;
firstAuthor		= unsafeWindow.firstAuthor;

if ( !__ty_vip ) { var __ty_vip = V = {}; }			// 定义对象__ty_vip
if ( !idWriter || !Key ) { var idWriter, Key; }		// 定义idWriter, Key

/* 
功能: __ty_vip类
*/	
__ty_vip = V = {
	uid: 0,
	params : null,	// idWriter=*&Key=*
	writer : null,	// 记录每次最后查看的作者
	author : chrAuthorName, // 需要全局变量chrAuthorName
	helper : null,
	timeKey : null,
	contenter : null,
	contentLog : null,
	pageContentLog : null,
	isShowAllWriter : false,
	isShowAllFriends : false,
	isShowTimes : false,
	objAttentArticle: null,
	FIRST_AUTHOR_DIV : 'firstAuthor',
	CONTENT_DIV : 'pContentDiv',
	WRITERS_DIV : '__ty_vip_writers',
	FRIENDS_DIV : '__ty_vip_friends',
	/* 
	功能: 得到id="elem"的句柄
	*/
	$ : function ( elem ) {
		return (typeof elem == 'string') ? document.getElementById(elem) : elem;
	},
	/* 
	功能: 得到name="elem"的句柄
	*/
	$$ : function ( elem ) {
		return (typeof elem == 'string') ? document.getElementsByName(elem) : elem;
	},
	/* 
	功能: 根据position={'x':,'y':}显示层id="el"
	*/
	show : function ( el, position ) {
		var element = V.$(el);
		element.style.display = 'block';
		return V.$(element);
	},
	/* 
	功能: id="el"层隐藏
	*/
	hide : function ( el ) {
		V.$(el).style.display = 'none';
		return V.$(el);
	},
	/* 
	功能: 得到总内容日志
	*/
	getContentLog : function () {
		if ( !V.contenter ) {
			if ( V.$( V.CONTENT_DIV ) == null ) {
				V.timeKey = window.setTimeout("V.getContenterLog()", 500);
			} else {
				V.contenter = V.$( V.CONTENT_DIV );
				V.contentLog = V.contenter.innerHTML;
				if (!!V.timeKey) {
					clearTimeout(V.timeKey);
					V.timeKey = null;
				}
			}
		}
		return V.contentLog;
	},

	/* 
	功能: 只看楼主功能
	*/
	lookByAuthor : function ( author ) {
		var name = V.writer = author || V.author || '';
		var log  = V.contentLog || V.getContentLog();
		var contenter = V.contenter;
		var newContent = '';
		var item = '';
		
		// 前提条件: *.tianya.cn 或者 bbs.city.tianya.cn
		if ((/^([a-zA-z0-9\.]+)\.tianya\.cn$/).test(window.location.hostname)) {
			if ((/pub/i).test(window.location.pathname)) { // 主版
				var publicer;
				publicer = contenter;
				//var tagNameA = document.all ? '</A>' : '</a>';
				var arr = publicer.innerHTML.split(/<TABLE /ig); // .replace(/[\n\r]/g,'')

				// 1. 主版第一个回复内容处理
				item = arr[0];
				if (!!firstAuthor && firstAuthor == name) {
					newContent = item;
				} else {
					newContent = '';
				}
				// 2. 其他回复处理
				for (var i = 1; i < arr.length; i ++) {
					item = arr[i];
					if (item.indexOf('作者：') != -1 && item.indexOf('回复日期：') != -1) {
						if (name != '' && item.indexOf('>' + name + '</') != -1) {
							newContent += '<TABLE ' + item;
						}
					}
				}
				// 3. 主版第一个回复作者处理
				if (!(name != '' && V.$( V.FIRST_AUTHOR_DIV ).innerHTML.indexOf('>' + name + '</') != -1)) {
					V.$( V.FIRST_AUTHOR_DIV ).style.display = 'none';
				}


				publicer.innerHTML = newContent;
				/************* 分页 修改 添加自动只看**标示 #ty_vip_look[**] ***************/
				name = encodeURIComponent(name);
				topPage = V.$('pageDivTop');
				bottomPage = V.$('pageDivBottom');
				if ( !!topPage && !!bottomPage ) {
					if (!V.pageContentLog) V.pageContentLog = topPage.innerHTML;
				}
				if ( !!topPage && !!bottomPage ) {
					var pageContent = V.pageContentLog.replace(/href="[^"]+"/gi, function (sMatch) {
						return sMatch.substring(0, sMatch.length-1) + '#ty_vip_look['+name+']"';
					});
					topPage.innerHTML = pageContent;
					bottomPage.innerHTML = pageContent;
				}
			} else { // 副版,城市
				log = log.replace(/[\n\r]/g,''); // 删除掉所有换行符
				//log = log.replace('<div id="tianyaBrandSpan1"></div>',''); // 删除掉所有换行符
				var arr;
				if ( !!document.all )
				{
					arr = log.split(/<div class=item>/ig);
				}
				else
				{
					arr = log.split(/<div class="item">/ig);
				}
				for (var i = 0; i < arr.length; i ++) {
					item = arr[i];

					if (item.indexOf('作者：<') != -1 && item.indexOf('日期：') != -1) { //item.indexOf('>作者：<') != -1
						if (name != '' && item.indexOf('>' + name + '</') != -1)
							newContent += '<div class="item">' + item;
					}
				}
				contenter.innerHTML = newContent;
				/************* 分页 修改 添加自动只看**标示 #ty_vip_look[**] ***************/
				name = encodeURIComponent(name);
				if (!!V.$('pageForm')) { // 副版
					if (!V.pageContentLog) V.pageContentLog = V.$('pageForm').action;
				} else {
					if (!V.pageContentLog) V.pageContentLog = V.$('form_select').action;
				}
				if (!!V.$('cttPageDiv') && !!V.$('cttPageDiv1')) { // 副版
					V.$('pageForm').action = V.pageContentLog + '#ty_vip_look['+name+']';
					V.$('pageForm1').action = V.pageContentLog + '#ty_vip_look['+name+']';
				} else{	//城市 if (!!V.$('form_select')) 
					try {
						V.$('FirstPageForm').action = V.pageContentLog + '#ty_vip_look['+name+']';
						V.$('NextPageForm').action = V.pageContentLog + '#ty_vip_look['+name+']';						
						V.$('PreviousPageForm').action = V.pageContentLog + '#ty_vip_look['+name+']';
						V.$('LastPageForm').action = V.pageContentLog + '#ty_vip_look['+name+']';
					} catch (e){}
					try {
						V.$('form_select').action = V.pageContentLog + '#ty_vip_look['+name+']';
						V.$('form_select_ArticleTop').action = V.pageContentLog + '#ty_vip_look['+name+']';
						V.$('form_select_ResponseTop').action = V.pageContentLog + '#ty_vip_look['+name+']';
					} catch (e){}
				}
			}
		}
	},
	/* 
	功能: 只看楼主[返回]功能
	*/
	lookByAuthorBack : function ( author ) {
		var name = author || V.author || '';
		var log  = V.contentLog || V.getContentLog();
		
		if ( !!log ) {
			if (name != '' && log.indexOf(name) != -1) {
				if ( log.indexOf(' style="color: red; font-weight: bold;">' + name+'<') == -1 ) { // 没有添加才加亮
					log = log.replace(/[\n\r]/g,''); // 删除掉所有换行符
					//log = log.replace(eval('/>'+name+'</g'), ' style="color: red; font-weight: bold;">'+name+'<');
				}
			}
			V.contenter.innerHTML = log;
			if ( !!V.$( V.FIRST_AUTHOR_DIV ) ) // 主版第一个作者处理
				V.$( V.FIRST_AUTHOR_DIV ).style.display = 'block';
			
			if (!!V.$('pageDivTop') && !!V.$('pageDivBottom')){
				V.$('pageDivTop').innerHTML = V.pageContentLog;
				V.$('pageDivBottom').innerHTML = V.pageContentLog;
			} else if (!!V.$('cttPageDiv') && !!V.$('cttPageDiv1')) {
				V.$('pageForm').action = V.pageContentLog;
				V.$('pageForm1').action = V.pageContentLog;
			} else { // if (!!V.$('form_select')) 		
				try {
					V.$('FirstPageForm').action = V.pageContentLog;
					V.$('NextPageForm').action = V.pageContentLog;						
					V.$('PreviousPageForm').action = V.pageContentLog;
					V.$('LastPageForm').action = V.pageContentLog;
				} catch (e){}
				try {
					V.$('form_select').action = V.pageContentLog;
					V.$('form_select_ArticleTop').action = V.pageContentLog;
					V.$('form_select_ResponseTop').action = V.pageContentLog;
				} catch (e){}
			}
		}
	},
	/* 
	功能: 高亮楼主[返回]功能
	*/
	redByAuthor : function ( author ) {
		var name = author || V.author || '';
		var log  = V.contentLog || V.getContentLog();
		var contenter = V.contenter;

		if (!!log) {
			if (name != '' && log.indexOf(name) != -1) {
				if ( log.indexOf(' style="color: red; font-weight: bold;">' + name+'<') == -1 ) { // 没有添加才加亮
					log = log.replace(/[\n\r]/g,''); // 删除掉所有换行符
					log = log.replace(eval('/>'+name+'</g'), ' style="color: red; font-weight: bold;">'+name+'<');
				}
				contenter.innerHTML = log;
			}
		}
		if ( !!V.$( V.FIRST_AUTHOR_DIV ) ) { // 主版第一个作者处理
			var first = V.$( V.FIRST_AUTHOR_DIV );
			if (document.all) { // IE兼容
				first = V.$( V.FIRST_AUTHOR_DIV ).firstChild.firstChild.firstChild;
			}
			first.innerHTML = first.innerHTML.replace(eval('/>'+name+'</g'), ' style="color: red; font-weight: bold;">'+name+'<');
		}
	},
	/* 
	功能: 显示所有回复者
	*/
	showAllWriters : function ( helper ) {
		var objViewAll = document.getElementById("lnkViewAll");
		if (objViewAll.innerHTML=="只看某人")
		{
			var options = V.getAllWriters();
			var numbers = options.numbers;
			var writers = options.writers;
			var div = V.$( V.WRITERS_DIV );
			if ( !V.isShowAllWriter ) {
				var li, em;
				var length = numbers.length;
				var newDoc = document.createDocumentFragment();
				for (var i = length - 1; i >= 0; i--) {
					li = document.createElement("li");
					li.innerHTML = '<em>'+writers[i]+'</em>'+numbers[i]+'';
					new Elem(li).addEventListener('click', function(event) {				
						var el = event.target || event.srcElement; //new zEvent(event).target;
						var reg = document.all ? '<EM>' : '<em>';
						if (el.innerHTML.indexOf(reg) > -1)
						{
							return;
						}
						V.writer = el.innerHTML;
						V.hide( "userlist" );
						objViewAll.innerHTML="查看全部";
						V.lookByAuthor( V.writer );
						clearImgsOpenFlag();
					});
					newDoc.appendChild(li);
				}
				div.appendChild(newDoc);
				newDoc = null;
				V.isShowAllWriter = true;
			}
			V.show( "userlist" );
		}
		else {
			this.lookByAuthorBack();
			clearImgsOpenFlag();
			objViewAll.innerHTML="只看某人";
		}
	},
	/* 
	功能: 得到帖子所有回复者功能
	*/
	getAllWriters : function () {
		var log = V.contentLog || V.getContentLog();
		var writers = [], numbers = [], writer, isFind;
		var arr = log.match(/作者：<a.*?>.*?<\/a>/gi);
		// 一楼首先添加上
		writers.push(firstAuthor);
		numbers.push(1);
		if (arr == null) return { 'writers' : [], 'numbers' : [] };
		for (var i = arr.length - 1; i >= 0; i--) {
			writer = arr[i].replace(/作者：<a.*?>/gi,'').replace(/<\/a>/gi,'');
			isFind = false;
			for ( var j = writers.length - 1; j >= 0; j --) {
				if (writer == writers[j]) {
					isFind = true;
					numbers[j] = ++numbers[j];
					break;
				}
			}
			if (!isFind) {
				writers.push(writer);
				numbers.push(1);
			}
		}
		return V.sorts({ 'writers' : writers, 'numbers' : numbers });
	},
	/* 
	功能: 冒泡排序两个等价数组
	*/
	sorts : function ( options ) {
		var numbers = options.numbers;
		var writers = options.writers;
		// 冒泡排序法
		var temp;
		for (var n = 0; n < numbers.length; n++)
		{
			for (var k = 0; k < numbers.length - n; k++) {
				if (numbers[k] > numbers[k+1]) {
					temp = numbers[k];
					numbers[k] = numbers[k+1];
					numbers[k+1] = temp;
					temp = writers[k];
					writers[k] = writers[k+1];
					writers[k+1] = temp;
				}
			}
		}
		return {
			writers: writers,
			numbers: numbers
		};
	},
};



/* 
功能: Elem类,添加事件的浏览器兼容
作者: fangxu [2008-9-12]
*/
var Elem = function (element) {
	this.el = V.$(element);
	return this;
}
Elem.prototype.addEventListener = function ( type, fn ) {
	if (this.el.addEventListener) this.el.addEventListener(type, fn, false);
	else this.el.attachEvent('on' + type, fn);
	return this;
}
Elem.prototype.removeEventListener = function(type, fn){
	if (this.el.removeEventListener) this.el.removeEventListener(type, fn, false);
	else this.el.detachEvent('on' + type, fn);
	return this;
}




/****************************************************************************
 去除所有图片的open属性。该属性由jQuery插件lazyload设置和使用。设置了该属性的图片
 表示已经加载过，lazyload不再处理。但是实际上调用lookByAuthr等函数之后，会导致lazyload
 已经运行的功能失效（因为直接使用了innerHTML属性对页面代码进行了处理）。
 该函数应该在lookByAuthor, lookByAuthorBack函数调用后调用。
 ****************************************************************************/
function clearImgsOpenFlag()
{
	// 清除所有图片的open属性。允许lazyload重新加载图片（这样可能导致页面多次运行lazyload，但是目前没有其他合适的办法）
	imgs = document.getElementById("pContentDiv").getElementsByTagName("img");
	for (i=0; i<imgs.length; i++) {
		imgs[i].removeAttribute("open");
		imgs[i].removeAttribute("loaded");
	}
	// 主动触发scroll事件。加载图片。
	var evt = document.createEvent('HTMLEvents');
	evt.initEvent('scroll',true,true);
	window.dispatchEvent( evt );
}

/****************************************************************************
 创建配置对话框
 ****************************************************************************/
function createConfigPanel()
{
	var divContent ="<div class='head' id='configHeaderPanel'>配置<a href='javascript:void(0);' class='closebox'>X</a></div>"+"\n"+
					"	<div id='configPanel' class='list'></div>"+"\n"+
					"</div>";
	div = document.createElement('div');
	div.innerHTML = divContent;
	div.className = "myconfig";
	div.id = "configdiv";
	document.body.appendChild(div);
	configHTML = "<INPUT type='checkbox' id='chkOnlyAuthor'>只看楼主";
	document.getElementById("configPanel").innerHTML = configHTML;
	document.getElementById("configHeaderPanel").addEventListener('click', showHideConfig, false);
	document.getElementById("chkOnlyAuthor").addEventListener('click', chkOnlyAuthorOnClick, false);
}



/****************************************************************************
 创建左上角菜单。
 ****************************************************************************/
function createMenu()
{
	var divContent = "<DIV style='float:center;'>"+"\n"+
		"<TABLE>"+"\n"+
		"<TR>"+"\n"+
		"	<TD><A id='lnkViewAll' href='javascript:void(0);'>查看全部</A></TD>"+"\n"+
		"	<TD><A id='lnkViewAuthor' href='javascript:void(0);'>只看楼主</A></TD>"+"\n"+
		"	<TD id='tdPreviousPage'>上一页</TD>"+"\n"+
		"	<TD id='tdPages'>分页</TD>"+"\n"+
		"	<TD id='tdNextPage'>下一页</TD>"+"\n"+
		"	<TD><A id='lnkConfig' href='javascript:void(0);'>配置</A></TD>"+"\n"+
		"</TR>"+"\n"+
		"</TABLE>"+"\n"+
		"</div>";
	div = document.createElement('div');
	div.className = "mymenu";
	div.innerHTML=divContent;
	document.body.appendChild(div);

	pageNav = "<a href='javascript:void(0)' id='lnkPages'>第"+document.CURRPAGE+"/"+document.PAGECOUNT+"页</a>";
	document.getElementById("tdPages").innerHTML = pageNav;
	if (document.CURRPAGE>1)
		document.getElementById("tdPreviousPage").innerHTML = "<a href='"+getPageLocation(document.CURRPAGE-1-1)+"'>上一页</a>";
	if (document.CURRPAGE<document.PAGECOUNT)
		document.getElementById("tdNextPage").innerHTML = "<a href='"+getPageLocation(document.CURRPAGE-1+1)+"'>下一页</a>";
	document.getElementById("lnkPages").addEventListener('click', showHidePageList, false);
	document.getElementById("lnkViewAll").addEventListener('click', lnkViewAllOnClick, false);
	document.getElementById("lnkViewAuthor").addEventListener('click', lnkViewAuthorOnClick, false);
	document.getElementById("lnkConfig").addEventListener('click', showHideConfig, false);
}

/****************************************************************************
 创建右上角导航条。
 ****************************************************************************/
function createNavPanel()
{
	div = document.createElement('div');
	div.className = "mynav";
	div.id = "navigatorList";
	div.innerHTML="";
	document.body.appendChild(div);	

	obj = document.getElementById("navigatorList");
	obj.innerHTML = "导航：&nbsp;";
	navlinks = document.getElementById("adsp_content_guide").children;
	for (i=0; i<3; i++)
	{
		navlinks[0].className = "";
		obj.appendChild(navlinks[0]);
		sepObj = document.createElement("span");
		sepObj.innerHTML="&gt;";
		obj.appendChild(sepObj);
	}
}


/****************************************************************************
 导出CSS到页面中。
 ****************************************************************************/
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}



/****************************************************************************
 处理有关帖子页数相关内容的函数。功能如下：
 1. 计算总页数
 2. 计算当前页码
 3. 获得所有分页的URL地址
 ****************************************************************************/
function calcAllPages()
{
	if (chrType=="public")
	{
		obj = document.getElementsByName("idArticleslist")[0];
		if (obj==null)
		{
			document.CURRPAGE = 1;
			document.PAGELISTS = [""];
			document.PAGECOUNT = 1;
		}
		else
		{
			pagelist = obj.value;
			if (pagelist.lastIndexOf(",")==pagelist.length-1)
				pagelist = pagelist.substring(0, pagelist.length-1);
			document.PAGELISTS = pagelist.split(",");
			document.PAGECOUNT = document.PAGELISTS.length;
			intArticleId = document.getElementsByName("idArticle")[0].value;
			for (i=0; i<document.PAGECOUNT; i++)
			{
				if (intArticleId==document.PAGELISTS[i])
					document.CURRPAGE  = i+1;
			}
		}
	}
	else if (chrType=="tech" || chrType=="city")
	{
		obj = document.getElementsByName("apn")[0];
		if (obj==null)
		{
			document.CURRPAGE = 1;
			document.PAGELISTS = [""];
			document.PAGECOUNT = 1;
		}
		else
		{
			pagelist = obj.value;
			if (pagelist.lastIndexOf(",")==pagelist.length-1)
				pagelist = pagelist.substring(0, pagelist.length-1);
			document.PAGELISTS = pagelist.split(",");
			document.PAGECOUNT = document.PAGELISTS.length;
			url = document.location.href;
			a = url.lastIndexOf("/");
			b = url.lastIndexOf("/", a-1);
			document.CURRPAGE  = parseInt(url.substring(a,b+1));
			intArticleId = document.getElementsByName("idArticle")[0].value;
			for (i=0; i<document.PAGECOUNT; i++)
			{
				if (intArticleId==document.PAGELISTS[i])
					document.CURRPAGE  = i+1;
			}
		}
	}
}

/****************************************************************************
 根据页码换算URL
 ****************************************************************************/
function getPageLocation(i)
{
	if (chrType=="public")
		return document.PAGELISTS[i]+".shtml";
	else if (chrType=="tech" || chrType=="city")
	{
		url = document.location.href;
		a = url.lastIndexOf("/");
		b = url.lastIndexOf("/", a-1);
		return url.substring(0, b+1) + (i+1) + url.substring(a);
	}
}

/****************************************************************************
 创建页面列表弹出窗口。
 ****************************************************************************/
function createPageList()
{
	var divContent ="<div class='head' id='pagelistPanel'><span>分页<span><a class='closebox' href='javascript:void(0);'>X</a></div>"+"\n"+
					"	<div id='pagelist' class='list'></div>"+"\n"+
					"</div>";
	div = document.createElement('div');
	div.innerHTML = divContent;
	div.className = "mypagelist";
	div.id = "pagelistdiv";
	document.body.appendChild(div);
	pageListHTML = "";
	for (i=0; i<document.PAGECOUNT; i++)
	{
		if (i==document.CURRPAGE-1)
			pageListHTML += "<span class='subpage'>"+(i+1)+"</span>"
		else
			pageListHTML += "<a class='subpage' href='"+getPageLocation(i)+"'>"+(i+1)+"</a>"
	}
	document.getElementById("pagelist").innerHTML = pageListHTML;
	document.getElementById("pagelistPanel").addEventListener('click', showHidePageList, false);
}

/****************************************************************************
 页面预处理。
 1. 设置每个帖子的head区的class（区分楼主和非楼主两种帖子）
 ****************************************************************************/
function setPostClass(author)
{
	if (chrType=="public")
	{
		var obj = document.getElementById("pContentDiv");
		var tables = obj.getElementsByTagName("TABLE");
		for (i=0; i<tables.length; i++)
		{
			if (tables[i].innerHTML.indexOf(">"+author+"</a>")!=-1)
			{
				tables[i].className="postAuthor";
				tables[i].nextSibling.nextSibling.setAttribute("hl", "on");
			}
			else
				tables[i].className="postReply";
		}
		// 处理第一楼
		var obj = document.getElementById(V.FIRST_AUTHOR_DIV);
		if (obj==null)
			return;
		if (obj.innerHTML.indexOf(">"+author+"</a>")!=-1)
		{
			obj.className="postAuthor";
			document.getElementById("pContentDiv").getElementsByTagName("DIV")[0].setAttribute("hl", "on");
			//obj.nextSibling.nextSibling.setAttribute("hl", "on");
		}
		else
			obj.className ="postReply";
	}
	else if (chrType=="tech" || chrType=="city")
	{
		var obj = document.getElementById("pContentDiv");
		var divs = obj.getElementsByTagName("div");
		for (i=0; i<divs.length; i++)
		{
			if (divs[i].className!="item")
				continue;
			var highlight = false;
			for (j=0; j<divs[i].children.length; j++)
			{
				var child = divs[i].children[j];
				if (child.className=="vcard")
				{
					highlight = (child.innerHTML.indexOf(">"+author+"</a>")!=-1);
					if (highlight)
						child.className="postAuthor";
					else
						child.className="postReply";
				}
				else if (child.className=="post")
				{
					if (highlight)
						child.setAttribute("hl", "on");
				}
			}
		}
	}
}

/****************************************************************************
 事件响应函数
 ****************************************************************************/
function lnkViewAllOnClick() 
{
	V.showAllWriters(this);
}

function lnkViewAuthorOnClick()
{
	V.lookByAuthor(V.author); 
	clearImgsOpenFlag(); 
	document.getElementById("lnkViewAll").innerHTML="查看全部";
}

function chkOnlyAuthorOnClick()
{
	var obj = document.getElementById("chkOnlyAuthor");
	GM_setValue("isOnlyAuthor", obj.checked);
	if (obj.checked)
		V.lookByAuthor(V.author);
	else
		V.lookByAuthorBack();
}

function showHideConfig()
{
	obj = document.getElementById("configdiv");
	if (obj.style.display=="none" || obj.style.display=="")
		obj.style.display="block";
	else
		obj.style.display="none";

	if (GM_getValue("isOnlyAuthor", false)==true)
		document.getElementById("chkOnlyAuthor").checked=true;
	else
		document.getElementById("chkOnlyAuthor").checked=false;
}

/****************************************************************************
 显示隐藏页面列表弹出窗口。用于menu中的分页导航。
 ****************************************************************************/
function showHidePageList()
{
	obj = document.getElementById("pagelistdiv");
	if (obj.style.display=="none" || obj.style.display=="")
		obj.style.display="block";
	else
		obj.style.display="none";
}


// 特殊处理“地缘看世界”的第一页内容错误
if (document.location.href=="http://www.tianya.cn/publicforum/content/worldlook/1/223829.shtml")
{
	var tt = "<div class=\"box \"><div class=top_l><img onerror=\"this.style.display='none';\" onload=\"javascript:ResetImageSize(this,900);\" src=\"http://static.tianyaui.com/img/static/2011/imgloading.gif\" height=\"120\"  onload=\"javascript:ResetImageSize(this,900);\" original=\"http://report.tytech.tianya.cn/images/tianyalogo.gif\" /><img onerror=\"this.style.display='none';\" onload=\"javascript:ResetImageSize(this,900);\" src=\"http://static.tianyaui.com/img/static/2011/imgloading.gif\" height=\"120\"  onload=\"javascript:ResetImageSize(this,900);\" original=\"http://report.tytech.tianya.cn/images/tianyalogo2.gif\" /></div><br>\n<div class=top_r><!--a href=\"http://id.tianya.cn/user/register/default.asp?sourceURL=http://login.tianya.cn\" target=\"_blank\">????????????</a--></div><br>\n</div><br>\n<div class=\"box tianya_menu\"><br>\n<ul><br>\n</ul><br>\n</div><br>";
	var obj = document.getElementsByTagName("body")[0];
	var t = obj.innerHTML;
	obj.innerHTML = t.replace(tt, "").replace("<!-- <br>", "");
}

/****************************************************************************
 要设置或者修改CSS可以添加在这里。
 在这里的选项会在后面用addGlobalStyle函数输出到页面中，在页面中起作用。
 ****************************************************************************/
var styleContent = "	/* 覆盖字体设置；覆盖背景设置 */" +
"	body {" +
"	  background: none repeat scroll 0% 0% rgb(216, 216, 216) !important;" +
"	  font-family: 微软雅黑 !important;" +
"	}" +
"" +
	"/* 页面主标题 */" +
"	h1#hTitle {" +
"		height: 100px !important;" +
"		margin-top: 20px !important;" +
"	}" +
"" +
	"h1#hTitle span#adsp_content_title_left {" +
"		display: none;" +
"	}" +
"" +
	"h1#hTitle span {" +
"		padding-top: 30px !important;" +
"		padding-bottom: 30px !important;" +
"		box-shadow: 1px 1px 10px #000;" +
"	}" +
"" +
	"/* “查看某人”功能中显示的用户列表通过#userlist进行控制 */" +
"	.list-user {" +
"		left: auto !important;" +
"		right: 220px !important;" +
"	}" +
"" +
	"#userlist {" +
"		position: fixed !important;" +
"		top: 50px !important;" +
"		width: 300px !important;" +
"		box-shadow: 1px 1px 10px #000;" +
"	}" +
"" +
	"#userlist li {" +
"		width: 95% !important;" +
"		text-align: right !important;" +
"	}" +
"" +
	"#userlist em {" +
"		width: 90% !important;" +
"		text-align: left !important;" +
"	}" +
"" +
	".fn-fixed {" +
"		width: 95% !important;" +
"	}" +
"" +
	"/* 定义帖子内容宽度为页面的95% */" +
"	.pagewrap {" +
"	  width: 95% !important;" +
"	}" +
"" +
	"/* pContentDiv包含在.pagewrap中。所以使用100%代表整个页面宽度的95% */" +
"	#pContentDiv {" +
"	  width: 100% !important;" +
"	}" +
"" +
	"/* 修改第一楼的表格。表格内容是作者、时间等 */" +
"	table#firstAuthor {" +
"	  width: 100% !important;" +
"	}" +
"" +
	"#firstAuthor td, tbody {" +
"		width: 100% !important;" +
"	}" +
"" +
	"/* 覆盖page4.css中的设置 */" +
"	#pContentDiv table {" +
"	  width: 100% !important;" +
"	}" +
"" +
	"#pContentDiv table,tr,td {" +
"	  background: transparent !important;" +
"	}" +
"" +
	"/* 定义每个帖子内容的CSS */" +
"	#pContentDiv .post {" +
"		padding: 1ex !important;" +
"		background: #e8e8e8 !important;" +
"		border: 1px solid #ccf !important;" +
"		border-top: none !important;" +
"		color: #222 !important;" +
"	}" +
"" +
	"/* 右上角导航条的样式设置 */" +
"	.mynav {" +
"	position: fixed;" +
"	top: 5px;" +
"	left: 20px;" +
"	float: left;" +
"	z-index: 1001;" +
"	background: #d0d0d0;" +
"	box-shadow: 1px 1px 10px #000;" +
"	}" +
"" +
	"/* 左上角的menu设置 */" +
"	.mymenu {" +
"	position: fixed;" +
"	top: 5px;" +
"	right: 20px;" +
"	z-index: 1001;" +
"	background: #fdffff;" +
"	box-shadow: 1px 1px 10px #000;" +
"	}" +
"" +
	".mymenu table {" +
"	width: 500px !important;" +
"	}" +
"" +
	".mymenu #navigatorList {" +
"		vertical-align: middle !important;" +
"		box-shadow:inset 1px 1px 10px #888;" +
"		height: 30px !important;" +
"	}" +
"" +
	".mymenu #navigatorList a{" +
"		padding-top: 5px;" +
"	}" +
"" +
	".mymenu td{" +
"		width: 100px !important;" +
"		box-shadow:inset 1px 1px 10px #999;" +
"		height: 30px !important;" +
"		color: gray;" +
"		text-align: center !important;" +
"	}" +
"" +
	".mymenu td:hover {" +
"		background: #FFFFFF;" +
"	}" +
"" +
	".mymenu a {" +
"		text-decoration: none;" +
"		font-size: 14px;" +
"		cursor: hand;" +
"	}" +
"" +
	".mymenu a:hover {" +
"		text-decoration: none;" +
"		font-size: 14px;" +
"		cursor: hand;" +
"	}" +
"" +
	"/* 第一楼如果是楼主以及每个是楼主的帖子的head区样式设置。head区的内容是作者、时间等*/" +
"	#firstAuthor.postAuthor, #pContentDiv .postAuthor {" +
"		background: -moz-linear-gradient(top," +
"		rgba(200,255,255,0.2)," +
"		rgba(200,255,255,0) 40%," +
"		rgba(80, 70, 30, 0.1) 50%," +
"		rgba(80, 70, 30, 0))," +
"		-moz-linear-gradient(left, #ffa 30%, rgba(255,255,176,0.3) 70%, #ffa 90%)," +
"		-moz-repeating-linear-gradient(-30deg, orange 0px, white 3px, orange 6px) !important;" +
"		color: #444 !important;" +
"		border: 1px solid #ccf !important;" +
"		height: 30px !important;" +
"		text-align: center !important;" +
"		vertical-align: middle !important;" +
"	}" +
"" +
	"/* 第一楼如果不是楼主以及每个不是楼主的帖子的head区样式设置。head区的内容是作者、时间等*/" +
"	#firstAuthor.postReply, #pContentDiv .postReply {" +
"	background: -moz-linear-gradient(center top , " +
"		rgba(200, 255, 255, 0), " +
"		rgba(200, 255, 255, 0.1) 45%, " +
"		rgba(80, 120, 120, 0.03) 55%, " +
"		rgba(80, 120, 120, 0)) " +
"		repeat scroll 0% 0% rgb(224, 224, 255) !important;" +
"		color: #444 !important;" +
"		border: 1px solid #ccf !important;" +
"		height: 30px !important;" +
"		text-align: center !important;" +
"		vertical-align: middle !important;" +
"	}" +
"" +
	"/* chrType是tech类型的帖子head区样式：调整“回复”、“楼号”的位置为靠右 */" +
"	.postAuthor span.floor, .postReply span.floor {" +
"		float: right !important;" +
"	}" +
"" +
	".postAuthor span.quick-post, .postReply span.quick-post {" +
"		float: right !important;" +
"	}" +
"" +
	"/*隐藏每个帖子的标题区中多余的回车*/" +
"	#pContentDiv table br{" +
"		display: none !important;" +
"	}" +
"" +
	"/* 高亮帖子的设置。（高亮用于楼主的帖子。） */" +
"	#pContentDiv .post[hl] {" +
"		background: #FFFFFF !important;" +
"	}" +
"" +
	"/* 分页列表弹出窗口设置 */" +
"	.mypagelist {" +
"		position: fixed;" +
"		top: 50px;" +
"		right: 50px;" +
"		width: 740px;" +
"		height: 500px;" +
"		display: none;" +
"		z-index: 100;" +
"		box-shadow: 2px 2px 4px black;" +
"		font-size: 10pt;" +
"	}" +
"" +
	".mypagelist .head {" +
"		background-color: rgb(221, 238, 221);" +
"		width: 100%;" +
"		font-size: 12pt;" +
"		border: 1px solid rgb(204, 204, 255);" +
"		color: rgb(68, 68, 68);" +
"	}" +
"" +
	".mypagelist .closebox {" +
"		float:right; " +
"		cursor:hand; " +
"		padding-left: 680px; " +
"		padding-right:5px;" +
"	}" +
"" +
	".mypagelist .list {" +
"		background-color:rgb(238, 238, 238) !important;" +
"		border: 1px solid rgb(204, 204, 255) !important;" +
"		width: 100%;" +
"		height: 95%;" +
"		overflow-y: auto;" +
"	}" +
"" +
	".mypagelist .subpage {" +
"		display: inline-block;" +
"		width: 1.6em;" +
"		padding: 0 .5em;" +
"		text-align: right;" +
"		cursor: pointer;" +
"		border: 1px solid transparent;" +
"	}" +
"" +
	"/* 配置对话框 */" +
"	.myconfig {" +
"		position: fixed;" +
"		top: 50px;" +
"		right: 50px;" +
"		width: 300px;" +
"		height: 200px;" +
"		display: none;" +
"		z-index: 100;" +
"		box-shadow: 2px 2px 4px black;" +
"		font-size: 10pt;" +
"	}" +
"" +
	".myconfig .head {" +
"		background-color: rgb(221, 238, 221);" +
"		width: 100%;" +
"		font-size: 12pt;" +
"		border: 1px solid rgb(204, 204, 255);" +
"		color: rgb(68, 68, 68);" +
"	}" +
"" +
	".myconfig .list {" +
"		background-color:rgb(238, 238, 238) !important;" +
"		border: 1px solid rgb(204, 204, 255) !important;" +
"		width: 260px;" +
"		height: 135px;" +
"		overflow-y: auto;" +
"		padding: 20px 20px 20px 20px;" +
"	}" +
"" +
	".myconfig #configHeaderPanel {" +
"		 cursor:hand;" +
"	}" +
"" +
	".myconfig .closebox {" +
"		 float:right; " +
"		 padding-right:5px;" +
"		 padding-left: 200px;" +
"	}" +
"" +
	"/* 隐藏部分广告 */" +
"	div .box-bbx {" +
"	  display: none !important;" +
"	}" +
"" +
	"div#tianyatopguide_nav, div.topnav {" +
"	  display:none !important;" +
"	}" +
"" +
	"div.function {" +
"		display: none !important;" +
"	}" ;

// 导出CSS
addGlobalStyle(styleContent);
calcAllPages();
createMenu();
createNavPanel();
createConfigPanel();
createPageList();
setPostClass(V.author);

V.contenter = V.$( V.CONTENT_DIV );
V.contentLog = V.contenter.innerHTML;

if (GM_getValue("isOnlyAuthor", false)==true)
{
	V.lookByAuthor(V.author);
	clearImgsOpenFlag();
	document.getElementById("lnkViewAll").innerHTML = "查看全部";
}
else
	document.getElementById("lnkViewAll").innerHTML = "只看某人";

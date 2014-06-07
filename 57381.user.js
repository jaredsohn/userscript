// ==UserScript==
// @name           校内人人网改造器 Xiaonei Reformer
// @namespace      Xiaonei_reformer
// @include        http://xiaonei.com/*
// @include        http://*.xiaonei.com/*
// @include        https://xiaonei.com/*
// @include        https://*.xiaonei.com/*
// @include        http://renren.com/*
// @include        http://*.renren.com/*
// @include        https://renren.com/*
// @include        https://*.renren.com/*
// @exclude        http://wpi.renren.com/*
// @exclude        http://*.renren.com/ajaxProxy.html*
// @description    为人人网（renren.com，原校内网xiaonei.com）清理广告、新鲜事、各种烦人的通告，删除页面模板，恢复旧的深蓝色主题，增加更多功能。。。
// @version        1.5.4.20090908
// @author         xz
// ==/UserScript==

//脚本版本，供自动更新用
var version="1.5.4.20090908";

//选项列表
var options=[
	{op:"bxn_removeAD",dv:true},
	{op:"bxn_removeStarNotification",dv:true},
	{op:"bxn_removeProgress",dv:true},
	{op:"bxn_removeAppRequest",dv:false},
	{op:"bxn_removeEventRequest",dv:false},
	{op:"bxn_removeNotificationRequest",dv:false},
	{op:"bxn_removePollRequest",dv:false},
	{op:"bxn_removeMusicPlayer",dv:false},
	{op:"bxn_removeTemplate",dv:true},
	{op:"bxn_removeSelected",dv:true},
	{op:"bxn_removePoll",dv:true},
	{op:"bxn_removeXNT",dv:false},
	{op:"bxn_removeBaidu",dv:true},
	{op:"bxn_removeNotice",dv:false},
	{op:"bxn_removeFeedBlog",dv:false},
	{op:"bxn_removeFeedApp",dv:false},
	{op:"bxn_removeFeedPoll",dv:false},
	{op:"bxn_removeFeedAct",dv:false},
	{op:"bxn_removeFeedStatus",dv:false},
	{op:"bxn_removeFeedGift",dv:false},
	{op:"bxn_removeFeedFriend",dv:false},
	{op:"bxn_removeFeedImage",dv:false},
	{op:"bxn_removeFeedImageTag",dv:false},
	{op:"bxn_removeFeedProfile",dv:false},
	{op:"bxn_removeFeedComment",dv:false},
	{op:"bxn_removeFeedClass",dv:false},
	{op:"bxn_removeFeedShare",dv:false},
	{op:"bxn_removeFeedVip",dv:false},
	{op:"bxn_removeFeedFilm",dv:false},
	{op:"bxn_classicColor",dv:true},
	{op:"bxn_addNavExtraItem",dv:false},
	{op:"bxn_addFloorCounter",dv:true},
	{op:"bxn_fixNavWidth",dv:true},
	{op:"bxn_removeFriendGuide",dv:false},
	{op:"bxn_hideFeedContent",dv:false},
	{op:"bxn_hideStatusComment",dv:true},
	{op:"bxn_moreStatusEmotions",dv:true},
	{op:"bxn_removeFeedAsRead",dv:false},
	{op:"bxn_removeNewStar",dv:false},
	{op:"bxn_widerMessage",dv:false},
	{op:"bxn_widerNavBar",dv:false},
	{op:"bxn_largeImageViewer",dv:false},
	{op:"bxn_uncheckFeedComment",dv:true},
	{op:"bxn_checkWhisper",dv:false},
	{op:"bxn_showImagesInOnePage",dv:false},
	{op:"bxn_showMatualFriends",dv:false},
	{op:"bxn_showMatualFriendsImage",dv:false},
	{op:"bxn_fixShareLink",dv:true},
	{op:"bxn_checkUpdate",dv:true},
	{op:"bxn_allowModifySpecialFriend",dv:true},
	{op:"bxn_removeCommonPage",dv:false},
	{op:"bxn_autoRefreshFeeds",dv:false},
	{op:"bxn_removeGameRequest",dv:false},
	{op:"bxn_noFontFamily",dv:false},
];

//选项值列表
var ov=[];

//大图地址列表
var imgCache=[];

//状态表情列表
var emlist=[
	{e:":)",		t:"开心",		s:"/imgpro/icons/statusface/1.gif"},
//	{e:"@_@",		t:"色咪咪",		s:"/imgpro/icons/statusface/2.gif"},
	{e:"(k)",		t:"嘴唇",		s:"/imgpro/icons/statusface/2.gif"},
	{e:":'(",		t:"哭",			s:"/imgpro/icons/statusface/3.gif"},
	{e:":-O",		t:"惊讶",		s:"/imgpro/icons/statusface/4.gif"},
	{e:":@",		t:"生气",		s:"/imgpro/icons/statusface/5.gif"},
	{e:":(",		t:"难过",		s:"/imgpro/icons/statusface/6.gif"},
//	{e:":-p",		t:"吐舌头",		s:"/imgpro/icons/statusface/7.gif"},
	{e:":a",		t:"爱",			s:"/imgpro/icons/statusface/8.gif"},
	{e:"(v)",		t:"花儿",		s:"/imgpro/icons/statusface/9.gif"},
	{e:"(38)",		t:"校内女人",	s:"/imgpro/icons/statusface/10.gif"},
	{e:"8-|",		t:"书呆子",		s:"/imgpro/icons/statusface/13.gif"},
	{e:"|-)",		t:"困",			s:"/imgpro/icons/statusface/14.gif"},
	{e:"(害羞)",	t:"害羞",		s:"/imgpro/icons/statusface/15.gif"},
	{e:":d",		t:"大笑",		s:"/imgpro/icons/statusface/16.gif"},
	{e:"(奸笑)",	t:"奸笑",		s:"/imgpro/emotions/tie/2.gif"},
	{e:"(吃饭)",	t:"吃饭",		s:"/imgpro/emotions/tie/3.gif"},
	{e:":-p",		t:"吐舌头",		s:"/imgpro/emotions/tie/4.gif"},
	{e:"(尴尬)",	t:"尴尬",		s:"/imgpro/emotions/tie/5.gif"},
	{e:"(汗)",		t:"汗",			s:"/imgpro/emotions/tie/6.gif"},
	{e:"(惊恐)",	t:"惊恐",		s:"/imgpro/emotions/tie/7.gif"},
	{e:"(囧)",		t:"囧-窘迫",	s:"/imgpro/emotions/tie/8.gif"},
	{e:"(可爱)",	t:"可爱",		s:"/imgpro/emotions/tie/9.gif"},
	{e:"(酷)",		t:"酷",			s:"/imgpro/emotions/tie/10.gif"},
	{e:"(流口水)",	t:"流口水",		s:"/imgpro/emotions/tie/11.gif"},
	{e:"(猫猫笑)",	t:"猫猫笑",		s:"/imgpro/emotions/tie/12.gif"},
	{e:"(色)",		t:"色迷迷",		s:"/imgpro/emotions/tie/13.gif"},
	{e:"(病)",		t:"生病",		s:"/imgpro/emotions/tie/14.gif"},
	{e:"(吐)",		t:"呕吐",		s:"/imgpro/emotions/tie/19.gif"},
	{e:"(晕)",		t:"晕",			s:"/imgpro/emotions/tie/21.gif"},
	{e:"(s)",		t:"大兵",		s:"/imgpro/icons/statusface/soldier.gif"},
	{e:"(NBA)",		t:"篮球",		s:"/imgpro/icons/statusface/basketball4.gif"},
	{e:"(bee)",		t:"小蜜蜂",		s:"/imgpro/icons/statusface/bee.gif"},
	{e:"(fl)",		t:"花仙子",		s:"/imgpro/icons/statusface/hanago.gif"},
	{e:"(zz)",		t:"粽子",		s:"/imgpro/icons/statusface/zongzi.gif"},
	{e:"(cap)",		t:"学位帽",		s:"/imgpro/icons/statusface/mortarboard.gif"},
	{e:"(dad)",		t:"父亲节",		s:"/imgpro/icons/statusface/love-father.gif"},
	{e:"(ice)",		t:"冰棍儿",		s:"/imgpro/icons/statusface/ice-cream.gif"},
	{e:"(mj)",		t:"迈克尔.杰克逊",		s:"/imgpro/icons/statusface/mj.gif"},
	{e:"(mj2)",		t:"迈克尔.杰克逊",		s:"/imgpro/icons/statusface/mj2.gif"},
	{e:"(mj3)",		t:"迈克尔.杰克逊",		s:"/imgpro/icons/statusface/mj3.gif"},
	{e:"(eclipse)",	t:"日全食",		s:"/imgpro/icons/statusface/eclipse.gif"},
	{e:"(ta)",		t:"博派",		s:"/imgpro/icons/statusface/Transformers-Autobot.gif"},
	{e:"(td)",		t:"狂派",		s:"/imgpro/icons/statusface/Transformers-Decepticon.gif"},
	{e:"(qx)",		t:"七夕",		s:"/imgpro/icons/statusface/qixi.gif"},
	{e:"(qx2)",		t:"七夕",		s:"/imgpro/icons/statusface/qixi2.gif"},
	{e:"(^)",		t:"蛋糕",		s:"/imgpro/icons/3years.gif"},
	{e:"(h)",		t:"小草",		s:"/imgpro/icons/philips.jpg"},
	{e:"(r)",		t:"火箭",		s:"/imgpro/icons/ico_rocket.gif"},
	{e:"(w)",		t:"宇航员",		s:"/imgpro/icons/ico_spacewalker.gif"},
	{e:"(earth)",	t:"地球",		s:"/imgpro/icons/statusface/earth.gif"},
	{e:"(i)",		t:"电灯泡",		s:"/img/ems/bulb.gif"},
	{e:"(zg)",		t:"烛光",		s:"/img/ems/candle.gif"},
	{e:"(gsilk)",	t:"绿丝带",		s:"/img/ems/gsilk.gif"},
	{e:"(yeah)",	t:"哦耶",		s:"/img/ems/yeah.gif"},
	{e:"(good)",	t:"牛",			s:"/img/ems/good.gif"},
	{e:"(f)",		t:"拳头",		s:"/img/ems/fist.gif"},
//	{e:"(l)",		t:"爱",			s:"/img/ems/love.gif"}, 与:a相同
	{e:"(t)",		t:"火炬",		s:"/img/ems/torch.gif"},
];

//日志/照片回复表情列表，直接与序号/URL对应
emlist1=["不","谄笑","吃饭","调皮","尴尬","汗","惊恐","囧-窘迫","可爱","酷","流口水","猫猫笑","色","生病","叹气","淘气","舔","偷笑","吐","吻","晕","猪猪头","住嘴","大笑","害羞","惊呆","口罩","哭","困","难过","生气","书呆子","微笑"];

//一些常用函数&简写
function $X(xpath,root) {
	if(root && /^\./.test(xpath)) {
		xpath="."+xpath;
	}
	return document.evaluate(xpath,(root?root:document),null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}
function $X1(xpath,root) {
	if(root && /^\./.test(xpath)) {
		xpath="."+xpath;
	}
	return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
}
//获取特定ID的元素
function $(id,root) { return root ? root.getElementById(id) : document.getElementById(id); }
//获取特定标签的元素集
function $tag(tag,root) { return root ? root.getElementsByTagName(tag) : document.getElementsByTagName(tag); }
//点击元素
function click(e) {
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent("click",true,false,window,0,0,0,0,0,false,false,false,false,0,null);
	e.dispatchEvent(evt);
}
//隐藏具有特定class的div
function hideDivByClass(divclass) {
	var items=$X("//div[normalize-space(@class)='"+divclass+"']");
	for(var i=0;i<items.snapshotLength;i++) {
		hideElement(items.snapshotItem(i));
	}
	return true;
}
//删除具有特定class的div
function removeDivByClass(divclass) {
	var items=$X("//div[normalize-space(@class)='"+divclass+"']");
	for(var i=0;i<items.snapshotLength;i++) {
		removeElement(items.snapshotItem(i));
	}
	return true;
}
//删除有指定ID的元素
function removeElementById(id) {
	removeElement($(id));
	return true;
}
//删除指定元素
function removeElement(e) {
	e && e.parentNode && e.parentNode.removeChild(e);
	return true;
}
//隐藏指定元素
function hideElement(e) {
	if(e && e.style) {
		e.style.display="none";
	}
	return true;
}
//读取指定名称的cookie
function readCookie(name) {
	try {
		var cookies=document.cookie.split(';');
		name=escape(name);
		for(var i=0;i<cookies.length;i++) {
			var c=cookies[i].replace(/^ +/g,"");
			if(c.indexOf(name+"=")==0) {
				return unescape(c.substring(name.length+1,c.length));
			}
		}
	} catch (e) {
		printErrorLog("readCookie",e);
	}
	return "";
}
//写入cookie
function writeCookie(name,value) {
	try {
		var cookieString=escape(name)+"="+escape(value)+";domain=.renren.com";
		document.cookie=cookieString;
	} catch (e) {
		printErrorLog("writeCookie",e);
	}
}
//输出错误信息
function printErrorLog(func,err) {
	if(func && err && err.name && err.message) {
		GM_log("在 "+func+"() 中发生了一个错误。\n错误名称："+err.name+"\n错误信息："+err.message);
	}
}
//常用函数完

init();
reform();

//初始化
function init() {
	try {
		//填充ov变量
		for each (var e in options) {
			ov[e.op]=GM_getValue(e.op,e.dv);
		}
		addFeedEventMonitor();
		createConfigMenu();
		GM_registerMenuCommand("校内人人网改造选项",showConfigMenu);
		createImageViewer();
		createDropDownMenu();

		//设置大图缓存
		var cookie=readCookie("xn_imageCache");
		var cookies=cookie.split('|');
		for(var i=0;i<cookies.length;i+=2) {
			imgCache[cookies[i]]=cookies[i+1];
		}
	} catch (e) {
		printErrorLog("init",e);
	}

}

//改造
function reform() {
	try {
		ov["bxn_removeAD"] && removeAD();
		ov["bxn_removeStarNotification"] && removeStarNotification();
		ov["bxn_removeProgress"] && removeDivByClass("info-integrity") && removeElement($("completeProfile"));
		ov["bxn_removeAppRequest"] && removeElement($X1("//li[@class='l-app']"));
		ov["bxn_removeEventRequest"] && removeElement($X1("//li[@class='l-event']"));
		ov["bxn_removeNotificationRequest"] && removeElement($X1("//li[@class='l-request']"));
		ov["bxn_removePollRequest"] && removeElement($X1("//li[@class='l-poll']"));
		ov["bxn_removeGameRequest"] && removeElement($X1("//li[@class='l-game']"));
		removeEmptyRequestArea();
		ov["bxn_removeMusicPlayer"] && removeMusicPlayer();
		ov["bxn_removeTemplate"] && removeTemplate();
		ov["bxn_noFontFamily"] && noFontFamily();
		ov["bxn_classicColor"] && classicColor();
		ov["bxn_removeBaidu"] && removeElementById("baiduframe");
		$("feedHome") && cleanFeeds();
		ov["bxn_removeSelected"] && removeDivByClass("side-item selected");
		ov["bxn_removePoll"] && removeDivByClass("side-item sales-poll");
		ov["bxn_removeCommonPage"] && removeDivByClass("side-item commend-page");
		ov["bxn_removeNewStar"] && removeDivByClass("star-new");
		ov["bxn_removeFriendGuide"] && removeDivByClass("side-item contact-fri") && removeDivByClass("guide-find-friend");
		ov["bxn_removeNotice"] && removeDivByClass("notice-holder");
		lessHead(GM_getValue("bxn_headAmount",12));
		ov["bxn_removeXNT"] && removeElementById("wpiroot") && removeElementById("imengine");
		ov["bxn_widerNavBar"] && widerNavBar();
		ov["bxn_addNavExtraItem"] && addNavMenu();
		ov["bxn_addFloorCounter"] && addFloorCounter();
		ov["bxn_fixNavWidth"] && fixNavWidth();
		ov["bxn_hideFeedContent"] && hideFeedContent();
		ov["bxn_hideStatusComment"] && hideStatusComment();
		ov["bxn_moreStatusEmotions"] && moreStatusEmotions();
		ov["bxn_widerMessage"] && widerMessage();
		ov["bxn_largeImageViewer"] && largeImageViewer();
		ov["bxn_fixShareLink"] && fixShareLink();
		ov["bxn_uncheckFeedComment"] && uncheckFeedComment();
		ov["bxn_checkWhisper"] && checkWhisper();
		ov["bxn_showImagesInOnePage"] && showImagesInOnePage();
		ov["bxn_showMatualFriends"] && getMatualFriends();
		ov["bxn_allowModifySpecialFriend"] && allowModifySpecialFriend();
		ov["bxn_checkUpdate"] && checkUpdate();
		ov["bxn_autoRefreshFeeds"] && autoRefreshFeeds();
	} catch (e) {
		printErrorLog("reform",e);
	}
}

//隐藏新鲜事或标记为已读
function removeFeed(feedClass,feedTag) {
	try {
		var exp="//ul[@id='feedHome']//li//div[@class='details']//div[@class='legend']//img[@class='"+feedClass+"'";
		if(feedTag) {
			exp+=" and @alt='"+feedTag+"'";
		}
		exp+="]";
		var items=$X(exp);
		for(i=0;i<items.snapshotLength;i++) {
			var item=items.snapshotItem(i);
			item=item.parentNode.parentNode.parentNode;
			if(ov["bxn_removeFeedAsRead"]) {
				//如果javascript被禁用，则只隐藏
				try {
					var onclick=item.lastElementChild.getAttribute("onclick");
					if(onclick.indexOf("javascript:")!=0) {
						onclick="javascript:"+onclick+";";
					}
					window.location.href=onclick;
					//click(item.lastChild);
				} catch(e) {
					hideElement(item);
				}
			} else {
				removeElement(item);
			}
		}
	} catch (e) {
		printErrorLog("removeFeed",e);
	}
	return true;
}

//清理新鲜事，隐藏不想要的
function cleanFeeds() {
	try {
		ov["bxn_removeFeedBlog"] && removeFeed("iBlog");
		ov["bxn_removeFeedApp"] && removeFeed("iApp") && removeFeed("iSanguo") && removeFeed("iMyj");
		ov["bxn_removeFeedAct"] && removeFeed("iActs");
		ov["bxn_removeFeedPoll"] && removeFeed("iPoll");
		ov["bxn_removeFeedStatus"] && removeFeed("iStatus");
		ov["bxn_removeFeedGift"] && removeFeed("iGift");
		ov["bxn_removeFeedFriend"] && removeFeed("iFriend");
		ov["bxn_removeFeedClass"] && removeFeed("iClass");
		ov["bxn_removeFeedProfile"] && removeFeed("iProfile");	//头像
		ov["bxn_removeFeedImage"] && removeFeed("iPhoto","相册");
		ov["bxn_removeFeedImageTag"] && removeFeed("iPhoto","圈人");
		ov["bxn_removeFeedComment"] && removeFeed("iPost");
		ov["bxn_removeFeedShare"] && removeFeed("iShare");
		ov["bxn_removeFeedVip"] && removeFeed("iVip");
		ov["bxn_removeFeedFilm"] && removeFeed("iFilm");
	} catch (e) {
		printErrorLog("cleanFeeds",e);
	}
}

//为新鲜事列表增加监听函数，在点击"更多新鲜事"时可以处理新增的项目
function addFeedEventMonitor() {
	try {
		if(!$("feedHome")) {
			return;
		}
		var flag=$X1("//div[@class='filter-loading']");
		if(flag) {
			flag.addEventListener('DOMAttrModified', feedNotifier, false);
		}
	} catch (e) {
		printErrorLog("readCookie",e);
	}

	function feedNotifier(evt) {
		try {
			if(evt.attrName!="style" || evt.newValue.indexOf("display: none")==-1) {
				return;
			}
		 	cleanFeeds(evt);
			ov["bxn_hideStatusComment"] && hideStatusComment(evt);
		} catch (e) {
			printErrorLog("feedNotifier",e);
		}
	}
}

//移除广告
function removeAD() {
	try {
		var items,item;
		var i;
		removeDivByClass("ad-bar");
		removeDivByClass("banner clearfix");
		removeDivByClass("adimgr");
		removeDivByClass("blank-holder");
		removeElementById("sd_ad");
		removeElementById("showAD");
		removeElementById("huge-ad");
		removeDivByClass("feed feed-flyer text-story expand bold-feed");
		removeDivByClass("feed feed-flyer text-story expand media-story share-video bold-feed");
		removeDivByClass("side-item template");
		items=$X("//ul[@id='feedHome']//li//h3//a[@class='dark']");
		for(i=0;i<items.snapshotLength;i++) {
			item=items.snapshotItem(i);
			if(item.href && item.href.indexOf("http://post.renren.com/click.do?")==0) {
				item=item.parentNode.parentNode;
				try {
					var onclick=item.lastElementChild.getAttribute("onclick");
					if(onclick.indexOf("javascript:")!=0) {
						onclick="javascript:"+onclick;
					}
					window.location.href=onclick+";";
				} catch(e) {
					removeElement(item);
				}
			}
		}
		items=$X("//iframe");
		for(i=0;i<items.snapshotLength;i++) {
			item=items.snapshotItem(i);
			if(item.src.indexOf("gg.renren.com")!=-1 && item.parentNode.className!="blockcont text") {
				removeElement(item);
			}
		}
	} catch(e) {
		printErrorLog("removeAD",e);
	}
}

//删除空的请求提示框
function removeEmptyRequestArea() {
	try {
		var o=$X1("//div[@class='side-item requests']//div[@class='side-item-body clearfix']//ul[@class='icon-list']");
		if(o && o.childElementCount==0) {
			removeElement(o.parentNode.parentNode);
		}
	} catch (e) {
		printErrorLog("removeStarNotification",e);
	}
}

//删除成为星级用户提示
function removeStarNotification() {
	try {
		removeElementById("tobestar");
		removeElementById("realheadbulletin");
		removeElementById("noStarNotice");
	} catch (e) {
		printErrorLog("removeStarNotification",e);
	}
}

//删除音乐播放器，包括紫豆音乐播放器和帖子里的附加音乐
function removeMusicPlayer() {
	try {
		var items;
		var i;
		removeElementById("zidou_music");
		removeElementById("ZDMusicPlayer");
		removeDivByClass("mplayer");
		items=$tag("embed");
		for(i=0;i<items.length;i++) {
			if(items[i].src && items[i].src.search(/[Pp]layer\.swf/)!=-1) {
				removeElement(items[i]);
			}
		}

	} catch (e) {
		printErrorLog("removeStarNotification",e);
	}
}

//检测有没有模板存在
function hasTemplates()	{
	try {
		var items;
		var i;
		items=$tag("style");
		for(i=0;i<items.length;i++) {
			if(items[i].parentNode.tagName=="HEAD" && (items[i].innerHTML.indexOf("url(http://i.static.renren.com")!=-1) || items[i].innerHTML.indexOf("/page-profile-styles/")!=-1) {
				return true;
			}
		}
		items=$tag("link");
		for(i=0;i<items.length;i++) {
			if(items[i].parentNode.tagName=="HEAD" && items[i].rel && items[i].rel=="stylesheet" && (items[i].href.indexOf("zidou_nav.css")!=-1 || items[i].href.indexOf("page-profile-styles")!=-1)) {
				return true;
			}
		}
		if(window.location.host=="group.renren.com") {
			items=$X("//div[@class='boxcont']");
	    	for (i=0;i<items.snapshotLength;i++) {
				e=items.snapshotItem(i);
				if(e.parentNode.id=="groupSecondary") {
					return true;
				}
			}
		}
	} catch (e) {
		printErrorLog("hasTemplates",e);
	}
	return false;
}

//删除紫豆模板
function removeZidouTemplate() {
	try {
		var hasTemplate=false;
		var templates=$tag("style");
		var template,items;
		var i,m;
		if(templates!=null) {
			for(i=0;i<templates.length;i++) {
				if(templates[i].parentNode.tagName=="HEAD" && templates[i].innerHTML.indexOf("url(http://i.static.renren.com")!=-1) {
					template=templates[i];
					hasTemplate=true;
					break;
				}
			}

			if(hasTemplate=true && typeof(template)!="undefined") {
				removeElement(template);	//删除紫豆模板效果

				items=$X("//link[@rel='stylesheet']");
	    		for (i=0;i<items.snapshotLength;i++) {
					m=items.snapshotItem(i);
					if(m.getAttribute("href").search("zidou_nav.css")!=-1) {
						removeElement(m);	//删除紫豆导航栏
						break;
					}
		    	}
				removeElement($X1("//span[@class='zidou_domain']"));	//删除紫豆个人主页栏
			}
		}
	} catch (e) {
		printErrorLog("removeZidouTemplate",e);
	}
}

//删除公共主页模板
function removePublicHomepageTemplate() {
	try {
		var items=$X("//head//link[@rel='stylesheet']");
		var item;
		for(i=0;i<items.snapshotLength;i++) {
			item=items.snapshotItem(i);
			if(item.href.indexOf("zidou_nav.css")!=-1 || item.href.indexOf("/page-profile-styles/")!=-1) {
				removeElement(item);
			}
		}
		items=$X("//head//style");
		for(i=0;i<items.snapshotLength;i++) {
			item=items.snapshotItem(i);
			if(item.innerHTML.indexOf("/page-profile-styles/")!=-1) {
				removeElement(item);
			}
		}
	} catch (e) {
		printErrorLog("removePublicHomepageTemplate",e);
	}
}

//删除群组模板
function removeGroupTemplate() {
	try {
		var items,e;
		var i;
		if(window.location.host=="group.renren.com") {
			items=$X("//div[@class='boxcont']");
	    	for (i=0;i<items.snapshotLength;i++) {
				e=items.snapshotItem(i);
				if(e.parentNode.id=="groupSecondary") {
					removeElement(e);
				}
			}
			//删除群组页面里的iframe
			items=$X("//iframe");
	    	for (i=0;i<items.snapshotLength;i++) {
				removeElement(items.snapshotItem(i));
			}
			//删除部分群组内的赞助商广告（例如汉莎航空置顶地图）
			items=$tag("div");
			for(i=0;i<items.length;i++) {
				e=items[i];
				if(e.className && e.className.indexOf("jqmWindow")==0) {
					removeElement(e);
				}
			}
			//删除群组内的特有CSS。（例如苹果学院）
			items=$X("//link[@rel='stylesheet']");
	    	for (i=0;i<items.snapshotLength;i++) {
				e=items.snapshotItem(i);
				if(e.href && e.href.indexOf("qun-iframe")!=-1) {
					removeElement(e);
				}
			}
			//删除群组内的广告
			items=$tag("a");
			for(i=0;i<items.length;i++) {
				e=items[i];
				if(e.href && e.href.indexOf("adclick")!=-1) {
					removeElement(e);
				}
			}
			//删除群组的浮动的导航栏
			items=$X("//div[@class='nav']");
	    	for (i=0;i<items.snapshotLength;i++) {
				e=items.snapshotItem(i);
				if(e.childNodes.length==0) {
					removeElement(e);
				}
			}
		}
	} catch (e) {
		printErrorLog("removeGroupTemplate",e);
	}
}

//删除模板
function removeTemplate() {
	if(hasTemplates()) {
		removeZidouTemplate();
		removePublicHomepageTemplate();
		removeGroupTemplate();
	}
}

//恢复原来的颜色
function classicColor() {
	try {
		if(!ov["bxn_removeTemplate"] && hasTemplates()) {
			return;
		}
		var FCOLOR="#3B5998";	//Facebook的深蓝色
		var XCOLOR="#3B5888";	//校内原来的深蓝色
		var BCOLOR="#5C75AA";	//原来的菜单背景色

		//改变链接的颜色
		GM_addStyle("a:link,a:visited { color: "+XCOLOR+" } "+
					"a:hover { color: "+XCOLOR+" } "+
					"a { color: "+XCOLOR+" } "+
					".tpl_cancel { color: "+FCOLOR+" !important } "+
					".profile .profile-summary a.action:hover { color: "+FCOLOR+" } "+
					".pagerpro li.current a, .pagerpro li.current a:hover { color: "+FCOLOR+" ; border-bottom-color: "+FCOLOR+" ; border-color: "+FCOLOR+" } "+
					".pager-bottom .pagerpro li.current a, .pager-bottom .pagerpro li.current a:hover { border-top-color: "+FCOLOR+" } "+
					".pager-bottom .pagerpro li a.chn:hover { border-top-color: "+FCOLOR+" } "+
					".app-featured-pro .innerborder strong a { color: "+FCOLOR+" } "+
					".app_content_13462 #app13462_sub-nav-public a { color: "+FCOLOR+" } "+
					".app_content_13462 .index_list h3 a { color: "+FCOLOR+" } "+
					".app_content_13462 .helptext a { color: "+FCOLOR+" } "+
					".app-spread-info a { color: "+FCOLOR+" !important } "+
					"#xyxPage #opi a { color: "+FCOLOR+" } "+
					".xyx_share { color: "+FCOLOR+" } "+
					"#pet_status .ulv1 { color: "+FCOLOR+" } "+
					".app_content_17940 .left_box a { color: "+FCOLOR+" !important } "+
					".app_content_17940 .check_text span { color: "+FCOLOR+" !important } "+
					".app_content_17940 .search_list p span { color: "+FCOLOR+" !important } "+
					".tab-menu li a { color: "+FCOLOR+" !important } "+
					".rank_tab li { color: "+FCOLOR+" } "+
					"td.pop_content .dialog_body a, td.pop_content .dialog_body a:visited { color: "+FCOLOR+" } "+
					".m-chat-window.notifications .chat-conv .notifyitem .notifybody a { color: "+FCOLOR+" !important }");

		//改变链接的背景色
		GM_addStyle("a.action:hover{ background-color: "+BCOLOR+" } "+
					"a.share:hover{ background-color: "+FCOLOR+" } "+
					"a.mini-share:hover{ background-color: "+FCOLOR+" ; border-color: "+FCOLOR+" } "+
					"ul.actions a:hover { background: "+BCOLOR+" } "+
					".pagerpro li a:hover { background: "+BCOLOR+" } "+
					".pager-top a:hover { background-color: "+BCOLOR+" } "+
					".page a:hover { background-color: "+BCOLOR+"; color: #FFFFFF; } "+
					".navigation .nav-other .menu .charge a:hover { background-color: "+BCOLOR+" } "+
					".friendsgroup-sidebar .friendsgroup-list li.select a, .friendsgroup-sidebar .friendsgroup-list li.select a:hover { border-color: "+FCOLOR+"; background-color: "+BCOLOR+" } "+
					".messages .previous_message:hover { background-color: "+FCOLOR+"} ");

		/* 改变导航栏的背景色 */
		var e=$X1("//div[@class='navigation clearfix']");
		if(e) {
			var bc=document.defaultView.getComputedStyle(e,null).backgroundColor;
			if(bc=="rgb(0, 94, 172)" || bc=="transparent") {
				GM_addStyle(".navigation { background: "+FCOLOR+"}");
			}
		}
		GM_addStyle("#clubheader #navigation { background-color: "+BCOLOR+" } "+
					".navigation .menu-title a:hover { background-color: "+BCOLOR+" ; color: #FFFFFF ; background: "+BCOLOR+" } "+
					"#zidou_homepage #navigation a:hover { background-color: "+BCOLOR+" } "+
					"#zidou_header #navigation { background-color: "+FCOLOR+" } "+
					"#utility { background-color: "+FCOLOR+" } "+
					"#dev-site-navigator { background: "+FCOLOR+" ; height: 52px } "+
					"#header #tagline { background: "+FCOLOR+" } "+
					"#clubheader #navigation { background: "+FCOLOR+" } ");


		/* 改变下拉菜单的颜色 */
		GM_addStyle(".menu-dropdown-border { border:1px solid "+BCOLOR+" } "+
					".menu-dropdown .menu-item li a:hover { background-color: "+BCOLOR+" } "+
					".menu-dropdown .search-menu li a:hover { background-color: "+BCOLOR+" !important } "+
					".menu-dropdown .optionmenu a:hover { background-color: "+BCOLOR+" !important } "+
					".menu-dropdown .menu-item li.show-more a:hover { background-color: "+BCOLOR+" !important } "+
					".super-menu .menu-item { border-color: "+BCOLOR+" } "+
					".super-menu li a:hover { background: "+BCOLOR+" } "+
					"#navBar .beta-bar a, #appMenu .app-actions a, .menu-dropdown .menu-item li a { color: "+BCOLOR+" } ");

		//改变主页应用栏背景色
		GM_addStyle(".home #sidebar { background-color:#EBF3F7 }");

		//改变搜索栏边框颜色
		GM_addStyle("#navSearch #search-submit a, #navSearch #search-input #navSearchInput { border-color:#315091 }");

		//改变子导航栏的边框颜色
		GM_addStyle("#sub-nav .selected a { border-color: #5973A9 }");
		GM_addStyle(".toggle_tabs li a.selected { border-color: "+FCOLOR+" }");

		//改变弹出式窗口边框颜色
		GM_addStyle("td.pop_content h2 { border-color: "+FCOLOR+" }");

		//改变按钮的背景色
		GM_addStyle(".input-button,.input-submit { background-color: "+FCOLOR+" } "+
					"td.pop_content .dialog_buttons input { background-color: "+FCOLOR+" !important } "+
					"#tpl_preview .subbutton { background-color: #EBE6E0 } "+
					".inputbutton, .inputsubmit, .subbutton, .canbutton, .button-group button { background:"+FCOLOR+" } "+
					"#savebutton { background-color:"+FCOLOR+" }"+
					"ul.figureslist.requests button.accept, ul.figureslist.requests button.ignore { background-color:"+FCOLOR+" } "+
					".m-chat-window.notifications .chat-conv .notifyitem.hover .close:hover { background-color:"+FCOLOR+" !important } ");

		//上传照片栏Tab颜色
		GM_addStyle("#self-nav .selected a { background-color: "+FCOLOR+" }");
		GM_addStyle("#self-nav .selected a:hover { background-color: "+BCOLOR+" }");
		GM_addStyle("#self-nav li a { color: "+FCOLOR+" }");

		//个人资料Tab的字体颜色
		GM_addStyle(".profile .profile-tabs-circle a{ color:"+FCOLOR+" }");

		//群组帖子分类Tab
		GM_addStyle("#tabs .activetab a:hover,#tabs .activetab a { background-color: "+FCOLOR+" }");
		GM_addStyle("#tabs .inactivetab a:hover { color:"+FCOLOR+" }");
		GM_addStyle("#navigation a:hover { background-color:"+FCOLOR+" }");

		//送礼页面Tab
		GM_addStyle(".sub_tab li a { color:"+FCOLOR+" }");
		GM_addStyle(".sub_nav .selected a { background-color:"+BCOLOR+" }");

		//投票页面Tab
		GM_addStyle(".toupiao_tab li.current { background-color:"+BCOLOR+" }");

		//群组菜单颜色
		GM_addStyle("#mymenu a:hover,#mymore a.ppm:hover { background:"+FCOLOR+" }");

		//校内通栏的在线用户名
		GM_addStyle(".m-chat-window.buddy-list .chat-conv .buddy-list-item .buddy-list-item-name { color: "+FCOLOR+" }");

		//改变其他的文字颜色
		GM_addStyle(".gbcontainer h3 { color: "+FCOLOR+" } "+
					".gbcontainer div.gbbook h3 { color: "+FCOLOR+" } "+
					"#records h4 { color: "+FCOLOR+" } "+
					".form-privacy legend { color: "+FCOLOR+" } "+
					"form .notes h4 { color: "+FCOLOR+" } "+
					"form .required h4, form .optional h4 { color: "+FCOLOR+" } "+
					".msn h4 { color: "+FCOLOR+" } "+
					".box h3 .blue { color: "+FCOLOR+" } "+
					".box h3 { color: "+FCOLOR+" } "+
					".blue14zi { color: "+FCOLOR+" } "+
					"#pollPage .poll_main h3 { color: "+FCOLOR+" } "+
					"#helpMenu h3, #reg h3, #other h3, #features h3, #spec h3,#oak h3 { color: "+FCOLOR+" } "+
					"#header #logo { background-color: "+XCOLOR+" } "+
					".page_bar span em { color: "+FCOLOR+" } ");

		//删除背景图片
		GM_addStyle(".navigation .nav-body { background: transparent } "+
					"#home.home .menu-bar { background: #FFFFFF } "+
					".profile .menu-bar { background-color: #FFFFFF } "+
					".profile .profile-panel { background: #FFFFFF } ");

		//将logo背景置为透明
		GM_addStyle("#header #logo { background-color: transparent }");

		//改变设置了内嵌style的元素的字体颜色
		setInterval("var items=document.getElementsByTagName('a'); for (var i=0;i<items.length;i++) { if(items[i].style.color=='rgb(0, 94, 172)') items[i].style.color='"+FCOLOR+"';};",2000);	//因为是有些（校内通栏）是异步载入，所以要重复执行

		//删除装扮主页图片，用一般文字链接代替
		var imgs = $X("//img[@src='http://xnimg.cn/imgpro/icons/paint-profile.gif']");
		if(imgs.snapshotLength==0) {
			imgs = $X("//img[@src='http://s.xnimg.cn/imgpro/icons/paint-profile.gif']");
		}
		if(imgs.snapshotLength>0) {
			var p=imgs.snapshotItem(0).parentNode;
			p.removeChild(imgs.snapshotItem(0));
			p.innerHTML="<B>装扮主页</B>"
		}
		imgs = $X("//img[@src='http://xnimg.cn/imgpro/icons/paint-profile2.gif']");
		if(imgs.snapshotLength==0) {
			imgs = $X("//img[@src='http://s.xnimg.cn/imgpro/icons/paint-profile2.gif']");
		}
		if(imgs.snapshotLength>0) {
			p=imgs.snapshotItem(0).parentNode;
			p.removeChild(imgs.snapshotItem(0));
			p.innerHTML="<B>查看装扮</B>"
		}

		// 改造发布图片按钮
		var img=$("publisher_submit");
		if(img) {
			img.style.backgroundColor=BCOLOR;
			img.style.backgroundImage="none";
			img.style.textIndent=0;
			img.style.MozBorderRadius="5px";
			img.style.color="#FFFFFF";
			img.style.border="1px solid #666666"
			img.style.fontSize="14px";
			img.style.fontWeight="bold";
		}
	} catch (e) {
		printErrorLog("classicColor",e);
	}
}

//限制头像列表中的头像数量
function lessHead(n) {
	try {
		if(n==0) {
			return;
		}
		var items=$X("//ul[@class='people-list' or @class='users']");
		for(var i=0;i<items.snapshotLength;i++) {
			list=items.snapshotItem(i);
			for(var j=list.childNodes.length-1;j>n*2;j--) {
				list.removeChild(list.childNodes[j]);
			}
		}
	} catch (e) {
		printErrorLog("lessHead",e);
	}
}

//在导航栏上增加项目
function addNavMenu() {
	try {
		var item=$X1("//div[@class='nav-main']");
		if(!item) {
			return;
		}
		var arr=GM_getValue("bxn_navExtraContent","群组\nhttp://group.renren.com/tribenav.do\n论坛\nhttp://club.renren.com/").split("\n");
		for(i=0;i<arr.length-1;i+=2) {
			var c=document.createElement("div");
			var name=arr[i];
			var link=arr[i+1];
			c.setAttribute("class","menu");
			c.innerHTML='<div class="menu-title"><a id="global_inbox_link" href="'+link+'">'+name+'</a></div>';
			item.appendChild(c);
		}
	} catch (e) {
		printErrorLog("addNavMenu",e);
	}
}

//在日志、相册中增加楼层计数
function addFloorCounter() {
	try {
		if(location.host!="blog.renren.com" && (location.host!="photo.renren.com" || location.pathname!="/getphoto.do")) {
			return;
		}

		addFloor();
		var e=$("show-all-id");
		if(!e) {
			return;
		}
		e.parentNode.parentNode.addEventListener("DOMNodeInserted", addFloor, false);
	} catch(e) {
		printErrorLog("addFloorCounter",e);
	}

	function addFloor(evt) {
		try {
			if(evt && (!evt.target.className || (location.host=="blog.renren.com" && evt.target.className!="replies with-arrow") || (location.host=="photo.renren.com" && evt.target.className!="replies"))) {
				return;
			}
			var allReply,dds;
			if(location.host=="blog.renren.com") {
				allReply=$X1("//p[@class='stat-article']");
				if(!allReply) {
					return;
				}
				allReply=/评论\((\d+)\)/.exec(allReply.innerHTML);
				if(!allReply || allReply.length<2) {
					return;
				}
				allReply=parseInt(allReply[1]);
				dds=$X("//div[@class='replies']//dl[@class='replies']//dd");
				allReply-=dds.snapshotLength;
				dds=$X("//div[@class='replies']//dl[@class='replies with-arrow']//dd");
			} else {
				allReply=parseInt($("commentCount").innerHTML);
				dds=$X("//div[@class='replies']//dl[@class='replies']//dd");
			}
			if(dds.snapshotLength==0) {
				//没有回复
				return;
			}
			allReply-=dds.snapshotLength;
			if(allReply<0) {
				return;
			}
			allReply++;
			for(var i=0;i<dds.snapshotLength;i++) {
				var dd=dds.snapshotItem(i);
				for each (var e in dd.childNodes) {
					if(e.tagName && e.className && e.tagName=="DIV" && e.className=="info") {
						if(e.lastChild && e.lastChild.className && e.lastChild.className=="fc") {
							//添加过了，跳出外层循环
							i=dds.snapshotLength;
							break;
						}
						var span=document.createElement("span");
						span.className="fc";
						span.style.cssFloat="right";
						span.style.color="gray";
						span.innerHTML="第"+allReply+"楼";
						e.appendChild(span);
						break;
					}
				}
				allReply++;
			}
			//隐藏“显示较早之前的评论”,防止重复点击
			e=$("showMoreComments");
			if(e) {
				e.addEventListener("click", function(evt){ hideElement($("showMoreComments")); }, false);
			}
		} catch(e) {
			printErrorLog("addFloorCounter",e);
		}
	}
}

//修正日志页导航栏宽度
function fixNavWidth() {
	try {
		GM_addStyle("head ~ body #sub-nav ul li a { width: auto }");
	} catch (e) {
		printErrorLog("fixNavWidth",e);
	}
}

//显示/隐藏新鲜事内容
function hideFeedContent() {
	try {
		GM_addStyle("ul.richlist.feeds li div.content { display:none;}");
	} catch (e) {
		printErrorLog("hideFeedContent",e);
	}
}

//收起状态回复
function hideStatusComment() {
	try {
		var items,e;
		var i;
		items=$X("//ul[@id='feedHome']//li//div[@class='details']//div[@class='legend']//a");
		for (i = 0; i < items.snapshotLength; i++) {
			e = items.snapshotItem(i);
			if(e.innerHTML.indexOf("收起")!=-1) {
				click(e);
			}
		}
	} catch (e) {
		printErrorLog("hideStatusComment",e);
	}
}

//增加更多状态表情
function moreStatusEmotions() {
	try {
		if(window.location.hostname=="reg.renren.com" || window.location.hostname=="login.renren.com") {
			return;
		}

		//修正样式
		GM_addStyle("div.publisher ul.emotion, div.newsfeed-reply-emotions ul.emotion { letter-spacing:-6px }");

		var curlist=[];
		var list=$("status_emotions");
		if(list) {
			var items=$X("//ul[@id='status_emotions']//li//a//img");
			for(var i=0;i<items.snapshotLength;i++) {
				curlist[items.snapshotItem(i).getAttribute("emotion")]="1";
			}
			for each (var el in emlist) {
				if(!curlist[el.e]) {
					var e=document.createElement("li");
					e.innerHTML='<a onfocus="this.blur();" href="#nogo"><img src="http://xnimg.cn'+el.s+'" title="'+el.t+'" alt="'+el.t+'" emotion="'+el.e+'"/></a>';
					list.appendChild(e);
				}
			}
		}

		list=$("publisher_emotion");
		curlist=[];
		if(list && list.firstElementChild) {
			list=list.firstElementChild;
			var items=$X("//ul[@class='emotion']//li//a//img");
			for(var i=0;i<items.snapshotLength;i++) {
				curlist[items.snapshotItem(i).getAttribute("emotion")]="1";
			}
			for each (var el in emlist) {
				if(!curlist[el.e]) {
					var e=document.createElement("li");
					e.innerHTML='<a onfocus="this.blur();" href="#nogo"><img src="http://xnimg.cn'+el.s+'" title="'+el.t+'" alt="'+el.t+'" emotion="'+el.e+'"/></a>';
					list.appendChild(e);
				}
			}
		}
		//处理回复表情
		var flag=$("dropmenuHolder");
		if(flag) {
			flag.addEventListener('DOMAttrModified', emotionNotifier, false);
		}
	} catch (e) {
		printErrorLog("hideStatusComment",e);
	}

	function emotionNotifier(evt) {
		try {
			if(evt.newValue=="newsfeed-reply-emotions") {
				var list=evt.target.firstElementChild;
				var items=$X('.//li//a//img',list);
				var curlist=[];
				var e,el,em,i;
				for(i=0;i<items.snapshotLength;i++) {
					curlist[items.snapshotItem(i).getAttribute("emotion")]="1";
				}
				if(list.innerHTML.indexOf("/icons/statusface/")==-1) {
					// 日志/照片回复列表
					for(i=1;i<=emlist1.length;i++) {
						em="[tie";
						if(i<10) {
							em+="0";
						}
						em+=i+"]";
						if(!curlist[em]) {
							e=document.createElement("li");
							e.innerHTML='<a onfocus="this.blur();" href="#nogo"><img src="http://xnimg.cn/imgpro/emotions/tie/'+i+'.gif" title="'+emlist1[i-1]+'" alt="'+emlist1[i-1]+'" emotion="'+em+'"/></a>';
							list.appendChild(e);
						}
					}
				} else {
					// 状态回复列表
					for each (el in emlist) {
						if(!curlist[el.e]) {
							e=document.createElement("li");
							e.innerHTML='<a onfocus="this.blur();" href="#nogo"><img src="http://xnimg.cn'+el.s+'" title="'+el.t+'" alt="'+el.t+'" emotion="'+el.e+'"/></a>';
							list.appendChild(e);
						}
					}
				}
			}
		} catch (e) {
			printErrorLog("emotionNotifier",e);
		}
	}
}

//加宽导航栏显示
function widerNavBar() {
	try {
		GM_addStyle(".navigation-wrapper { width: auto } .navigation { width: auto }");
		//将菜单向左移
		var submenu=$("optiondropdownMenu");
		if(submenu) {
			submenu.addEventListener("DOMAttrModified",function moveMenu(evt){
				try {
					if(evt.attrName!="style" || evt.newValue.indexOf("-9999px")!=-1) {
						return;
					}
					this.removeEventListener("DOMAttrModified",moveMenu,false);
					this.style.left=(parseInt(this.style.left)-parseInt(document.defaultView.getComputedStyle(this,null).width)+parseInt(document.defaultView.getComputedStyle($("optionMenuActive").parentNode,null).width))+"px";
					this.addEventListener("DOMAttrModified",moveMenu,false);
				} catch (e) {
					printErrorLog("createDropDownMenu_moveMenu",e);
				}
			},false);
		}
	} catch (e) {
		printErrorLog("widerNavBar",e);
	}
}

//加宽站内信显示＆回复框
function widerMessage() {
	try {
		GM_addStyle("#pageMessage #oak .composer_fields textarea { width: 600px } ");
	} catch (e) {
		printErrorLog("widerMessage",e);
	}
}

//在鼠标移过时显示照片大图
function largeImageViewer() {
	try {
		if(window.location.hostname=="reg.renren.com" || window.location.hostname=="login.renren.com") {
			return;
		}
		$('largeImageViewer') && window.addEventListener('mouseover', function(e) {
			try {
				if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
					var t = e.target;
					var imgId,cache,pageURL;
					var str,imgSrc="",imgDate=null;
					if (t.tagName == 'IMG') {
						//将地址放到style中的图片
						if(t.src.indexOf("xnimg.cn/a.gif")!=-1 && t.style.backgroundImage.indexOf("url(")!=-1) {
							imgSrc=t.style.backgroundImage.replace(/^url\("|"\);?$/g,"");
						} else {
							imgSrc=t.src;
						}
					} else if (t.tagName == 'SPAN') {
						if(t.style.backgroundImage.indexOf("url(")!=-1) {
							imgSrc=t.style.backgroundImage.replace(/^url\("?|"?\);?$/g,"");
						}
					} else if (t.tagName == 'CANVAS') {
						var tempId="id"+Math.round(Math.random()*100000);
						t.setAttribute("id",tempId);
						imgSrc=unsafeWindow.document.getElementById(tempId).source;
						t.setAttribute("id","");
					} else if (t.tagName == "A") {
						if(t.style && t.style.backgroundImage.indexOf("url(")!=-1) {
							imgSrc=t.style.backgroundImage.replace(/^url\("?|"?\);?$/g,"");
							pageURL=t.href;
						}
					}
					if(imgSrc!="") {
						imgId=imgSrc.substring(imgSrc.lastIndexOf("_"));
						$('largeImage').setAttribute("orig",imgId);
						if (((imgSrc.indexOf('head_')!=-1 || imgSrc.indexOf('main_')!=-1 || ((imgSrc.search(/head\d+\./)!=-1 || imgSrc.search(/\/H[^\/]*\.jpg/)!=-1 || imgSrc.indexOf("head.xiaonei.com/photos/")!=-1) && imgSrc.indexOf('_')==-1)) && t.parentNode.tagName=="A") || imgSrc.indexOf('tiny_')!=-1) {
							if(!pageURL && t.parentNode.tagName=="A") {
								pageURL=t.parentNode.href;
							} else if (t.className=="avatar" && t.parentNode.className=="user-avatar") {
								pageURL="http://photo.renren.com/getalbumprofile.do?owner="+readCookie("hostid");
							}

							//一种非常古老的图片（http://fm071.img.renren.com/pic001/20070523/2025/H[0-9]+[A-Z]+.jpg），改imgId
							if(imgSrc.search(/http:\/\/.*?\.img\.renren\.com\/pic\d+\/\d{8}\/\d+\/H.*?\.jpg/)!=-1) {
								imgId=imgSrc.substring(imgSrc.lastIndexOf("/H")+2);
							}

							cache=getImageCache(imgId);
							if(cache) {	//已经在缓存里了
								showLargeImageViewer(e.pageX);
								if(cache!="error") {
									$('largeImage').src=cache;
								} else {
									$('largeImage').alt="加载图片失败";
								}
								return;
							}

							if(!pageURL) {
								return;
							}

							//没有附加码，也不属于头像，也不是非常古老的头像（http://head.xiaonei.com/photos/20070409/1835/head[0-9]+.jpg），直接改URL
							if(imgSrc.indexOf("_",imgSrc.indexOf("head_")+5)==-1 && imgSrc.indexOf("http://hd")==-1 && imgSrc.indexOf('_')!=-1) {
								cache=imgSrc.replace("head_","large_");
								setImageCache(imgId,cache);
								showLargeImageViewer(e.pageX);
								$('largeImage').src=cache;
								return;
							}

							//小头像，包括一种非常古老的（"http://head.xiaonei.com/photos/20070409/1835/tiny[0-9]+.jpg"）
							if((imgSrc.indexOf("tiny_")!=-1 || (imgSrc.indexOf("tiny")!=-1 && imgSrc.indexOf("_")==-1)) && pageURL.indexOf("getalbumprofile.do")==-1) {
								if(imgSrc.indexOf("_")!=-1) {
									imgDate=/hdn?\d+\/(.*?)\/tiny_/.exec(imgSrc)[1];
								} else {
									imgDate=/photos\/(.*?)\/tiny/.exec(imgSrc)[1];
								}
								pageURL="http://photo.renren.com/getalbumprofile.do?owner="+/id=(\d+)/.exec(pageURL)[1];
							}

							//相册封面图片或头像图片
							if(pageURL.indexOf("getalbum.do")!=-1 || pageURL.indexOf("getalbumprofile.do")!=-1 || pageURL.indexOf("/photo/album?")!=-1 || imgSrc.indexOf("head.xiaonei.com/photos/")!=-1)	{
								showLargeImageViewer(e.pageX);
								showLargeImageInAlbum(pageURL,0,imgId,imgDate);
								return;
							}

							//一般图片或被圈相片或公共主页上的图片
							if(pageURL.indexOf("getphoto.do")!=-1 || pageURL.indexOf("gettagphoto.do")!=-1 || pageURL.indexOf("page.renren.com/photo/photo?")!=-1) {
								showLargeImageViewer(e.pageX);
								showLargeImage(pageURL,imgId);
							}
						}
					}
				}
			} catch (e) {
				printErrorLog("onmouseover",e);
			}
		}, false);

		$('largeImageViewer') && document.addEventListener('mouseout', function(e) {
			try {
				if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
					if (e.target.id != 'largeImage') {
						$('largeImageViewer').style.display='none';
					}
				}
			} catch (e) {
				printErrorLog("onmouseout",e);
			}
		}, false);
	} catch (e) {
		printErrorLog("largeImageViewer",e);
	}

	function showLargeImageViewer(mouseX) {
		try {
			var viewer=$('largeImageViewer');
			if(!viewer) {
				return;
			}
			if(mouseX>document.body.clientWidth/2) {
				viewer.style.left="2px";
				viewer.style.right="";
			} else {
				viewer.style.right="2px";
				viewer.style.left="";
			}

			var imgBox=$('largeImage');
			imgBox.alt="加载图片中...";
			imgBox.src="";
			viewer.style.display="block";
		} catch (e) {
			printErrorLog("showLargeImageViewer",e);
		}
	}

	//获取一般图片的大图并显示出来
	function showLargeImage(pageURL,imgId) {
		try {
			GM_xmlhttpRequest({	method: 'GET', url: pageURL, onload: function (responseDetails) {
				try {
					var src;
					var i,j;
					if(responseDetails.status!=200) {
						return;
					}
					if(responseDetails.responseText.search("<body id=\"errorPage\">")!=-1) {
						setImageCache(imgId,"error");
						$('largeImage').alt="加载图片失败";
						return;
					}
					i=responseDetails.responseText.search(/<img .*?id="photo"/);
					if(i>0) {
						j=responseDetails.responseText.indexOf(">",i);
						src=responseDetails.responseText.substring(i,j);
						i=src.indexOf("src=\"")+5;
						j=src.indexOf("\"",i);
						src=src.substring(i,j);
						setImageCache(imgId,src);
						if($('largeImage').getAttribute("orig")==imgId) {
							$('largeImage').src=src;
						}
					}
				} catch (e) {
					printErrorLog("showLargeImage_onload",e);
				}
			}});
		} catch (e) {
			printErrorLog("showLargeImage",e);
		}
	}

	//获取相册中某一张图片的大图并显示出来
	function showLargeImageInAlbum(album,pageN,imgId,imgDate) {
		try {
			GM_xmlhttpRequest({	method: 'GET', url: album+"&curpage="+pageN, onload: function (responseDetails) {
				try {
					var i,j;
					var res=responseDetails.responseText;
					if(responseDetails.status!=200) {
						return;
					}
					if(res.search("<body id=\"errorPage\">")!=-1) {
						setImageCache(imgId,"error");
						$('largeImage').alt="加载图片失败";
						return;
					}
					// 搜索ID匹配的图片
					i=res.search(RegExp("src=\"http://.*?"+imgId));
					while(i!=-1 && (res.substring(i-60,i).indexOf("type=\"hidden\"")!=-1 || res.substring(i-30,i).indexOf("class=\"avatar\"")!=-1)) {
						res=res.substring(i+10);
						i=res.search(RegExp("src=\"http://.*?"+imgId));
					}
					// 当ID不匹配且为搜索小头像时，搜索时间匹配的图片
					if(i==-1 && imgDate) {
						res=responseDetails.responseText;
						i=res.search(RegExp("src=\"http://.*?/"+imgDate+"/.*?\\.jpg\""));
						while(i!=-1 && (res.substring(i-60,i).indexOf("type=\"hidden\"")!=-1 || res.substring(i-30,i).indexOf("class=\"avatar\"")!=-1)) {
							res=res.substring(i+10);
							i=res.search(RegExp("src=\"http://.*?/"+imgDate+"/.*?\\.jpg\""));
						}
					}
					if(i!=-1) {
						i=res.lastIndexOf(" href=\"",i)+7;
						j=res.indexOf("\"",i);
						res=res.substring(i,j);
						if(res.search(/^[a-zA-Z]+:\/\//)==-1) {
							if(res.charAt(0)!='/') {
								res="/"+res;
							}
							res=album.substring(0,album.lastIndexOf("/"))+res;
						}
						showLargeImage(res,imgId);
					} else {
						i=res.search(/共[0-9]*张/);
						if(i>0) {
							j=res.indexOf("张",i);
							if(res.indexOf("-"+res.substring(i+1,j+1))==-1) {
								showLargeImageInAlbum(album,pageN+1,imgId,imgDate);
							}
						} else {
							setImageCache(imgId,"error");
							$('largeImage').alt="加载图片失败";
							return;
						}
					}
				} catch (e) {
					printErrorLog("showLargeImageInAlbum_onload",e);
				}
			}});
		} catch (e) {
			printErrorLog("showLargeImageInAlbum",e);
		}
	}

	//设置图片缓存
	function setImageCache(imgId,src) {
		try {
			if(src!="error") {
				var cookie=readCookie("xn_imageCache");
				writeCookie("xn_imageCache",cookie+imgId+"|"+src+"|");
			}
			imgCache[imgId]=src;
		} catch (e) {
			printErrorLog("setImageCache",e);
		}
	}
	//读取图片缓存
	function getImageCache(imgId) {
		try {
			if(imgCache[imgId]) {
				return imgCache[imgId];
			} else {
				var cookie=readCookie("xn_imageCache");
				var cookies=cookie.split('|');
				for(var i=0;i<cookies.length;i+=2) {
					if(cookies[i]==imgId) {
						return cookies[i+1];
					}
				}
			}
			return "";
		} catch (e) {
			printErrorLog("getImageCache",e);
		}
	}
}

//建立大图显示DIV
function createImageViewer() {
	try {
		if(window.location.hostname=="reg.renren.com" || window.location.hostname=="login.renren.com") {
			return;
		}
		if(!document.body || document.body.id=="tinymce"  || document.body.parentNode.baseURI.indexOf("http://club.renren.com/zEditor/")!=-1) {
			return;
		}
		var imageViewerContent='<div><img id="largeImage" alt="加载图片中..." src=""/></div>';
		var viewer=document.createElement("div");
		viewer.id="largeImageViewer";
		viewer.style.display="none";
		viewer.style.position="fixed";
		viewer.style.backgroundColor="#F6F6F6";
		viewer.style.borderColor="#666666";
		viewer.style.borderStyle="double";
		viewer.style.borderWidth="3px";
		viewer.style.top="2px";
		viewer.style.zIndex=19999;
		viewer.innerHTML=imageViewerContent;
		document.body.appendChild(viewer);
	} catch (e) {
		printErrorLog("createImageViewer",e);
	}
}

//将相册内的所有相片在一页中全部显示
function showImagesInOnePage() {
	try {
		if(window.location.host!="photo.renren.com" || (window.location.pathname!="/getalbum.do" && window.location.pathname!="/getalbumprofile.do")) {
			return;
		}
		var baseURL="http://photo.renren.com"+window.location.pathname;
		var album=$("single-column");
		if(!album) {
			return;
		}
		var items=$X1("//div[@class='pager-top']//span");
		if(!items) {
			return;
		}
		var allPhoto=parseInt(/共([0-9]+)张/.exec(items.textContent)[1]);
		var maxPage=((allPhoto-1)/15);
		for(i=0;i<items.childNodes.length;i++) {
			if(items.childNodes[i].textContent.search(/共 *[0-9]+ *张/)!=-1) {
				items.childNodes[i].textContent="共"+allPhoto+"张 ";
				break;
			}
		}
		var id=/[\?&]id=([0-9]+)/i.exec(window.location.href);
		if(id==null) {
			id="";
			items=$X1("//li[@class='current']//a");
			if(items) {
				id=/[\?&]id=([0-9]+)/i.exec(items.href)[1];
			}
		} else {
			id=id[1];
		}
		var owner=/[\?&]owner=([0-9]+)/i.exec(window.location.href)[1];
		var curPage=/[\?&]curpage=([0-9]+)/i.exec(window.location.href);
		if(curPage==null || curPage[1]==null) {
			curPage=0;
		} else {
			curPage=parseInt(curPage[1]);
		}
		for(var i=0;i<=maxPage;i++) {
			if(i==curPage) {
				continue;
			}
			GM_xmlhttpRequest({
		        method: 'GET',
	    	    url: baseURL+"?id="+id+"&owner="+owner+"&curpage="+i,
				onload: function (res) {
					try {
						var photoList=res.responseText.substring(res.responseText.indexOf("<table class=\"photoList\">"));
						photoList=photoList.substring(0,photoList.indexOf("</table>"));
						album.innerHTML+=photoList;
					} catch (e) {
						printErrorLog("showImagesInOnePage_onload",e);
					}
				}
			});
		}
		items=$X("//ol[@class='pagerpro']");
		for(i=0;i<items.snapshotLength;i++) {
			removeElement(items.snapshotItem(i));
		}
	} catch (e) {
		printErrorLog("showImagesInOnePage",e);
	}
}

//显示共同好友
function getMatualFriends() {
	var myfriends=[];
	try {
		if((window.location.pathname!="/profile.do" && window.location.pathname!="/") || window.location.href.search(/[\?&]id=[0-9]+/i)==-1) {
			return;
		}
		var fid=/[\?&]id=([0-9]+)/i.exec(window.location.href)[1];
		var mid=readCookie("hostid");
		if(fid==mid) {	//是自己页面
			return;
		}

		var items=$X1("//div[@class='extra-column']//div[@class='box-holder']");
		if(!items) {
			return;
		}
		var mfdiv=document.createElement('div');
		mfdiv.id="mutualFriendsBox";
		mfdiv.className = "profile-friends box";
		mfdiv.innerHTML='<h4 class="box-header"><span id="mutualFriendsSpan">共同好友 (载入中...)</span>&nbsp;<a class="count" id="mutualFriendsCount">(0)</a></h4><div class="box-body" style="max-height:210px; overflow-y:auto; padding-left:0pt;"><div class="clearfix"><ul class="people-list" id="mutualFriendsList"></ul></div></div>';
	    items.appendChild(mfdiv);
		var mflist=$("mutualFriendsList");
		var mfcounter=$("mutualFriendsCount");

		var mfcount=0;
		//载入自己的好友列表
		GM_xmlhttpRequest({
	        method: 'GET',
	        url: 'http://photo.renren.com/gettagfriends.do',
			onload: function(res) {
				try {
					eval("friends="+ res.responseText);
					var friends=friends.friends_ajax;
					for(var i=0;i<friends.length;i++) {
						myfriends["X"+friends[i].id]=1;
					}
					loadFriends(0);
				} catch (e) {
					printErrorLog("mutualFriendsList_onload",e);
				}
			}
		});
	} catch (e) {
		printErrorLog("getMatualFriends",e);
	}

	//获取fid的好友
	function loadFriends(page) {
		try {
			GM_xmlhttpRequest({
		        method: 'GET',
		        url: "http://friend.renren.com/GetFriendList.do?curpage="+page+"&id="+fid,
				onload: function(res) {
					try {
						var rs=[];
						var mm;
						var i;
						while(mm=/doPoke\(event,\'(\d+)\',\'(.+?)\'\)/ig.exec(res.responseText)) {
							rs.push({id:mm[1],name:mm[2],e:null});
						}
						if(rs.length>0) {
							for(i=0;i<rs.length; i++) {
								if(myfriends["X"+rs[i].id]!=null) {
									myfriends["X"+rs[i].id]=null;
									mfcount++;
									mfcounter.innerHTML="("+mfcount+")"
									rs[i].e=document.createElement("li");
									if(ov["bxn_showMatualFriendsImage"]) {
										loadFriendTinyImage(rs[i].id,rs[i].name,rs[i].e);
									}
									rs[i].e.innerHTML+="<span><a href=\"http://renren.com/profile.do?id="+rs[i].id+"\">"+rs[i].name+"</a></span>";
									mflist.appendChild(rs[i].e);
								}
							}
							loadFriends(page+1);
						} else {
							$("mutualFriendsSpan").innerHTML="共同好友";
						}
					} catch (e) {
						printErrorLog("loadFriends_onload",e);
					}
				}
			});
		} catch (e) {
			printErrorLog("loadFriends",e);
		}
	}


	//加入头像图标
	function loadFriendTinyImage(uid,uname,e) {
		try {
			GM_xmlhttpRequest({
				method: 'GET',
				url: "http://photo.renren.com/getalbumprofile.do?owner="+uid,
				onload: function(res) {
					try {
						var img=/url\("?(http:\/\/h[ea]*d.+\/photos\/.+\/tiny_?[^)^"]+)"?\)/i.exec(res.responseText);
						if(img==null) {
							img=/url\("?(http:\/\/h[ea]*d.+\/photos\/.+\/.*_tiny?[^)^"]+)"?\)/i.exec(res.responseText);
						}
						if(img!=null) {
							img=img[1];
							e.innerHTML="<a title=\"查看"+uname+"的个人主页\" href=\"http://renren.com/profile.do?id="+uid+"\" style=\"background-image: url("+img+");\"></a>"+e.innerHTML;
						} else {
							e.innerHTML="<a title=\"查看"+uname+"的个人主页\" href=\"http://renren.com/profile.do?id="+uid+"\" style=\"background-image: url(http://head.renren.com/photos/0/0/men_tiny.gif);\"></a>"+e.innerHTML;
						}
					} catch (e) {
						printErrorLog("loadFriendTinyImage_onload",e);
					}
				}
			});
		} catch (e) {
			printErrorLog("loadFriendTinyImage",e);
		}
	}
}


//修正分享功能，支持https，使用真实外部链接
function fixShareLink() {
	try {
		var items,item;
		var i,s;

		//换成真实链接
		items=$X("//a");
		for(i=0;i<items.snapshotLength;i++) {
			item=items.snapshotItem(i);
			if(item.href && item.href.indexOf("http://share.renren.com/share_redirect.do?url=")!=-1) {
				item.href=decodeURIComponent(item.href.substring(46));
				item.href=item.href.replace(/&ref=newsfeed$/,"");
			}
		}

		//支持https
		if(window.location.host=="share.renren.com") {
			item=$X1("//input[@name='link']");
			if(item) {
				if(item.value.indexOf("http://https://")==0) {
					s=item.value.substring(7);
					item.value=s;
					item=$X1("//p[@class='link-summary']");
					if(item) {
						if(s.length>40) {
							s=s.substring(0,40)+"...";
						}
						item.innerHTML=s;
					}

				}
			}
		}
	} catch (e) {
		printErrorLog("fixShareLink",e);
	}
}

//检查更新
function checkUpdate(manually) {
	try {
		if(!document.body || document.body.id=="tinymce" || document.body.parentNode.baseURI.indexOf("http://club.renren.com/zEditor/")!=-1) {
			return;
		}

		var today=new Date();
		//GM_setValue("bxn_lastUpdate","1/1/2000");
		if(GM_getValue("bxn_lastUpdate","")=="") {
			GM_setValue("bxn_lastUpdate",today.toString());
		}
		var last=new Date(GM_getValue("bxn_lastUpdate",today.toString()));
		//一天检查一次
		if(manually || (today-last)/3600000/24>1) {
			var pageLink=GM_getValue("bxn_pageLink","http://userscripts.org/scripts/show/45836");
			var scriptLink=GM_getValue("bxn_scriptLink","http://userscripts.org/scripts/source/45836.user.js");
			if(manually) {
				setUpdateButtonState(false);
			}
			GM_xmlhttpRequest({
		        method: 'GET',
	    	    url: pageLink,
				onload: function(res) {
					try {
						var nv,cv,i;
						var udiv;
						if(res.status!=200) {
							setUpdateButtonState(true);
							return;
						}
						if(nv=/<b>Version:<\/b>.*\n *([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/.exec(res.responseText)) {
							cv=version.split(".");
							for(i=0;i<4;i++) {
								if(nv[i+1]>cv[i]) {
									udiv=document.createElement("div");
									udiv.id="bxn_updateNotify";
									udiv.style.bottom="0px";
									udiv.style.position="fixed";
									udiv.style.zIndex=100000;
									udiv.style.backgroundColor="rgb(246, 246, 246)";
									udiv.innerHTML='<div><font color=crimson>校内网改造器已有新版本：'+nv[1]+'.'+nv[2]+'.'+nv[3]+'.'+nv[4]+'</font> <a id="bxn_updateInstall" target="_blank" href="'+scriptLink+'">安装</a> <a id="bxn_updateGotoPage" target="_blank" href="'+pageLink+'">去看看</a> <a id="bxn_updateLater">以后再说</a></div>';
									document.body.appendChild(udiv);
									$("bxn_updateLater").addEventListener("click",hideUpdateNotify,false);
									$("bxn_updateGotoPage").addEventListener("click",hideUpdateNotify,false);
									$("bxn_updateInstall").addEventListener("click",hideUpdateNotify,false);
									setUpdateButtonState(true);
									return;
								} else if(nv[i+1]<cv[i]) {
									if(manually==true) {
										alert("没有找到更新版本");
									}
									setUpdateButtonState(true);
									return;
								}
							}
						}
						GM_setValue("bxn_lastUpdate",today.toString());
						if(manually==true) {
							alert("没有找到更新版本");
						}
						setUpdateButtonState(true);
					} catch (e) {
						printErrorLog("checkUpdate_onload",e);
					}
				}
			});
		}
	} catch (e) {
		printErrorLog("checkUpdate",e);
	}

	function hideUpdateNotify() {
		try {
			removeElement($("bxn_updateNotify"));
			GM_setValue("bxn_lastUpdate",today.toString());
		} catch (e) {
			printErrorLog("checkUpdate_onclick",e);
		}
	}

	function setUpdateButtonState(allow) {
		try {
			var e=$("bxn_updateNow");
			e.disabled=!allow;
			e.value=allow?"立即检查":"检查中...";
		} catch (e) {
			printErrorLog("setUpdateButtonState",e);
		}
	}
}

//取消选中“发布到新鲜事”选框
function uncheckFeedComment() {
	try {
		var e=$("feedComment");
		if(e) {
			e.checked=false;
		}
	} catch (e) {
		printErrorLog("uncheckFeedComment",e);
	}
}


//选中“悄悄话”选框
function checkWhisper() {
	try {
		var e=$('whisper');
		if(e && e.checked==false) {
			click(e);
		}
	} catch (e) {
		printErrorLog("checkWhisper",e);
	}
}

//去除只有星级用户才能添加/修改特别好友的限制
function allowModifySpecialFriend() {
	try {
		if(window.location.host!="friend.renren.com") {
			return;
		}
		setInterval(function(){
			try {
				var e=$X1("//span[@class='i-special']");
				if(!e || e.parentNode.parentNode.className!="select") {
					return;
				}
				e=$("dropmenuHolder");
				if(!e || !e.lastChild || e.lastChild.className!="" || e.lastChild.style.width!='400px') {
					return;
				}
				var f=$X1("//table[@class='pop_dialog_table']//tbody//tr//td[@class='pop_content']//div[@class='dialog_body']//a");
				if(!f || f.innerHTML!="申请星级用户") {
					return;
				}
				removeElement(e.lastChild);
				e=$X1("//iframe[@width='100%' and @height='100%' and @frameborder='0']");
				if(e) {
					removeElement(e.parentNode);
				}
			} catch (e) {
				printErrorLog("allowModifySpecialFriend_setInterval",e);
			}
		},1000);
	} catch (e) {
		printErrorLog("allowModifySpecialFriend",e);
	}
}

//自动检查新鲜事更新
function autoRefreshFeeds() {
	try {
		if(window.location.hostname=="reg.renren.com" || window.location.hostname=="login.renren.com") {
			return;
		}

		if(window.location.hostname=="home.renren.com") {
			var s=document.createElement("script");
			s.innerHTML="if(window.feedEditor && window.feedEditor.getNewFeeds) setInterval(window.feedEditor.getNewFeeds,"+GM_getValue("bxn_checkFeedInterval",60)*1000+");";
			document.body.appendChild(s);
			s=$X1(".//li",$("feedHome"));
			writeCookie("newestFeed",s.id);
		} else {
			setInterval(checkNewFeeds,GM_getValue("bxn_checkFeedInterval",60)*1000);
		}
	} catch (e) {
		printErrorLog("autoRefreshFeeds",e);
	}

	function checkNewFeeds() {
		try {
			GM_xmlhttpRequest({	method: "GET", url: "http://renren.com/retrieveNews.do", onload: function (response) {
				try {
					var r=response.responseText.split("##@L#");
					if(!/^\d+/.test(r[0])) {
						removeElement($("newFeedsNotify"));
						return;
					}
					var newFeedsCount=parseInt(r[0]);
					if(newFeedsCount<=0) {
						return;
					}

					//修正真正的新新鲜事数
					var newFeeds=document.createElement("ul");
					newFeeds.innerHTML=r[1];
					var newestFeedId=readCookie("newestFeed");
					var i;
					if(newestFeedId!="") {
						var n=newFeedsCount;
						newFeedsCount=0;
						for(i=0;i<n;i++) {
							if(newestFeedId!=newFeeds.children[i].id) {
								newFeedsCount++;
							} else {
								break;
							}
						}
					}
					newestFeedId=newFeeds.children[0].id;
					writeCookie("newestFeed",newestFeedId);
					if(newFeedsCount<=0) {
						return;
					}

					var node=null,nodeBody=null;
					var wpibar=$("wpiroot");
					if(wpibar) {
						//有校内通栏的情况
						var item=$X1(".//div[@class='m-chat']//div[@class='m-chat-tabbar']//div[@class='m-chat-presence']//div[@class='m-chat-button-notifications m-chat-button-active' or @class='m-chat-button-notifications']",wpibar);
						if(item) {
							//提醒内容
							var tips=$X1(".//div[@class='m-chat-window notifications hide' or @class='m-chat-window notifications']//div[@class='chat-conv']",item);
							if(tips) {
								//添加提醒
								node=tips.firstElementChild;
								if(node.innerHTML.indexOf('无新提醒')!=-1) {
									node.className="notifyitem hide";
								}
		
								for(i=newFeedsCount-1;i>=0;i--) {
									node=document.createElement("div");
									node.className="notifyitem";
									//图标
									nodeBody=document.createElement("div");
									nodeBody.className="notifyico";
									nodeBody.innerHTML="<img src='"+newFeeds.children[i].children[0].children[0].children[0].src+"' style='height:16px;width:16px;' />"
									node.appendChild(nodeBody);
									//关闭按钮
									nodeBody=document.createElement("div");
									nodeBody.className="close";
									nodeBody.addEventListener("click",closeFeed,false);
									node.appendChild(nodeBody);
									//内容
									nodeBody=document.createElement("div");
									nodeBody.className="notifybody";
									nodeBody.innerHTML="新鲜事："+newFeeds.children[i].children[1].innerHTML;
									node.appendChild(nodeBody);
									node.setAttribute("onmouseover","this.className=\"notifyitem hover\";");
									node.setAttribute("onmouseout","this.className=\"notifyitem\";");
									tips.insertBefore(node,tips.firstChild);
								}
								//增加提醒计数
								var count=$X1(".//div[@class='m-chat-msgcount hide' or @class='m-chat-msgcount']",item);
								if(count) {
									count.innerHTML=(parseInt(count.innerHTML)+newFeedsCount).toString();
									count.className="m-chat-msgcount";
								}
								return;
							}
						}
					}
					//无校内通栏，或结构有变
					var feedList=$("newFeedsList");
					if(!feedList) {
						bar=document.createElement("div");
						bar.style.position="fixed";
						bar.style.bottom="10px";
						bar.style.right="20px";
						bar.style.width="200px";
						bar.style.padding="5px";
						bar.style.backgroundColor="#E5E5E5";
						bar.style.opacity="0.85";
						bar.style.border="#000000 double 3px";
						bar.style.MozBorderRadius="5px";
						bar.id="newFeedsNotify";
						node=document.createElement("div");
						node.innerHTML="<span style='color:red;'>您有新的新鲜事</span><a style='float:right;' onclick='document.body.removeChild(document.getElementById(\"newFeedsNotify\"));'>关闭</a>";
						bar.appendChild(node);
						node=document.createElement("div");
						node.style.maxHeight="100px";
						node.style.width="100%";
						node.style.overflowY="auto";
						feedList=document.createElement("ul");
						feedList.id="newFeedsList";
						node.appendChild(feedList);
						bar.appendChild(node);
						document.body.appendChild(bar);
					}
					if(feedList.lastElementChild) {
						feedList.lastElementChild.style.borderBottom="1px solid";
					}
					for(i=0;i<newFeedsCount;i++) {
						node=document.createElement("li");
						node.innerHTML=newFeeds.children[i].children[1].innerHTML.trim();
						node.style.paddingTop="5px";
						node.style.paddingBottom="5px";
						node.style.borderBottom="1px solid";
						feedList.appendChild(node);
					}
					feedList.lastElementChild.style.borderBottom="";
				} catch (e) {
					printErrorLog("checkNewFeeds_onload",e);
				}
			}});
		} catch (e) {
			printErrorLog("checkNewFeeds",e);
		}
	}

	function closeFeed(evt) {
		try {
			var o=evt.target;
			var p=o.parentNode.parentNode;
			p.removeChild(o.parentNode);
			if(p.children.length==1) {
				p.children[0].className="notifyitem";
			}
		} catch (e) {
			printErrorLog("closeFeed",e);
		}
	}
}

//去除页面字体限制
function noFontFamily() {
	GM_addStyle("* {font-family:none !important}");
}

//在导航栏的设置菜单中增加设置项
function createDropDownMenu() {
	try {
		var list=$X1("//div[@class='optionmenu']//ul");
		if(!list) {
			return;
		}
		var m=document.createElement("li");
		m.innerHTML="<a class=\"optionapplication\">改造选项</a>";
		m.addEventListener("click",showConfigMenu,false);
		list.appendChild(m);
	} catch (e) {
		printErrorLog("createDropDownMenu",e);
	}
}

//创建设置菜单
function createConfigMenu() {
	try {
		if(!document.body || document.body.id=="tinymce" || document.body.parentNode.baseURI.indexOf("http://club.renren.com/zEditor/")!=-1) {
			return;
		}

		var menu,e,o;
		var configMenuContent='\
		<style type="text/css">\
			.bxn_ul2,.bxn_ul5,.bxn_ul1{list-style:none;clear:both;}\
			.bxn_ul1 li input{min-height:20px;}\
	    	.bxn_ul5 li{width:20%;float:left;} .bxn_ul5 li input{min-height:20px;}\
		    .bxn_ul2 li{width:50%;float:left;} .bxn_ul2 li input{min-height:20px;}\
			.bxn_h{clear:both;padding-top:5px;padding-bottom:2px;min-height:20px;}\
		</style>\
		<table class="pop_dialog_table" style="width: 100%; height: 100%;">\
			<tbody>\
				<tr>\
					<td class="pop_topleft"/>\
					<td class="pop_border"/>\
					<td class="pop_topright"/>\
				</tr>\
				<tr>\
					<td class="pop_border"/>\
					<td class="pop_content"><h2><span style="float:right">'+version+'</span><span>校内网改造选项</span></h2>\
						<div class="dialog_content" id="bxn_innerBox" style="width: 100%; overflow: auto;">\
							<div class="dialog_body">\
								<h4 class="bxn_h">清理页面：</h4>\
								<ul class="bxn_ul2">\
									<li><input type="checkbox" id="bxn_removeAD" />清除广告</li>\
									<li><input type="checkbox" id="bxn_removeSelected" />去除边栏：校内推荐</li>\
									<li><input type="checkbox" id="bxn_removeTemplate" />去除页面模板</li>\
									<li><input type="checkbox" id="bxn_removePoll" />去除边栏：校内调查</li>\
									<li><input type="checkbox" id="bxn_removeStarNotification" />去除升级为星级用户提示</li>\
									<li><input type="checkbox" id="bxn_removeFriendGuide" />去除边栏：寻找/邀请朋友</li>\
									<li><input type="checkbox" id="bxn_removeProgress" />去除资料完整度提示</li>\
									<li><input type="checkbox" id="bxn_removeCommonPage" />去除边栏：公共主页</li>\
									<li><input type="checkbox" id="bxn_removeNotice" />去除校内通知/活动信息</li>\
									<li><input type="checkbox" id="bxn_removeAppRequest" />去除应用请求提示</li>\
									<li><input type="checkbox" id="bxn_removeNewStar" />去除人气之星/新人栏</li>\
									<li><input type="checkbox" id="bxn_removeEventRequest" />去除活动邀请提示</li>\
									<li><input type="checkbox" id="bxn_removeMusicPlayer" />去除音乐播放器</li>\
									<li><input type="checkbox" id="bxn_removeNotificationRequest" />去除通知请求提示</li>\
									<li><input type="checkbox" id="bxn_removeBaidu" />去除百度搜索框</li>\
									<li><input type="checkbox" id="bxn_removePollRequest" />去除投票邀请提示</li>\
									<li><input type="checkbox" id="bxn_removeXNT" />去除校内通栏</li>\
									<li><input type="checkbox" id="bxn_removeGameRequest" />去除游戏邀请提示</li>\
								</ul>\
								<div class="bxn_h">\
								<h4 style="float:left">隐藏新鲜事：</h4><input style="clear:right" type="checkbox" id="bxn_removeFeedAsRead" />设为已读\
								</div>\
								<ul class="bxn_ul5">\
									<li><input type="checkbox" id="bxn_removeFeedBlog" />日志</li>\
									<li><input type="checkbox" id="bxn_removeFeedPoll" />投票</li>\
									<li><input type="checkbox" id="bxn_removeFeedApp" />应用</li>\
									<li><input type="checkbox" id="bxn_removeFeedAct" />活动</li>\
									<li><input type="checkbox" id="bxn_removeFeedStatus" />状态</li>\
									<li><input type="checkbox" id="bxn_removeFeedGift" />礼物</li>\
									<li><input type="checkbox" id="bxn_removeFeedFriend" />交友</li>\
									<li><input type="checkbox" id="bxn_removeFeedImage" />照片</li>\
									<li><input type="checkbox" id="bxn_removeFeedImageTag" />照片圈人</li>\
									<li><input type="checkbox" id="bxn_removeFeedComment" />评论</li>\
									<li><input type="checkbox" id="bxn_removeFeedClass" />班级</li>\
									<li><input type="checkbox" id="bxn_removeFeedShare" />分享</li>\
									<li><input type="checkbox" id="bxn_removeFeedVip" />VIP</li>\
									<li><input type="checkbox" id="bxn_removeFeedProfile" />头像</li>\
									<li><input type="checkbox" id="bxn_removeFeedFilm" />影评</li>\
								</ul>\
								<h4 class="bxn_h">功能增强：</h4>\
								<div style="width:35%;min-height:20px"><input type="checkbox" id="bxn_addNavExtraItem" />增加导航栏项目 <a id="bxn_navExtraShow" style="cursor:pointer;">显示</a></div>\
								<div id="bxn_navExtraBox" style="clear:both;display:none;height:120px">\
									<div style="float:right;height:120px;width:65%">\
										<textarea id="bxn_navExtraContent" style="height:90%;width:95%;overflow:scroll;" wrap="off"></textarea>\
									</div>\
									<label style="height:100px;width:35%">说明：<br/>每两行描述一项，其中第一行为说明文字，第二行为页面地址。请注意不要有空行。</label>\
								</div>\
								<ul class="bxn_ul2">\
									<li><input type="checkbox" id="bxn_widerNavBar" />加宽导航栏</li>\
									<li><input type="checkbox" id="bxn_widerMessage" />加宽站内信输入框</li>\
									<li><input type="checkbox" id="bxn_hideFeedContent" />隐藏新鲜事具体内容</li>\
									<li><input type="checkbox" id="bxn_hideStatusComment" />收起新鲜事中的状态回复</li>\
									<li><input type="checkbox" id="bxn_moreStatusEmotions" />增加更多的表情</li>\
									<li><input type="checkbox" id="bxn_largeImageViewer" />当鼠标经过时显示照片大图</li>\
									<li><input type="checkbox" id="bxn_addFloorCounter" />为评论增加楼层计数</li>\
									<li><input type="checkbox" id="bxn_showMatualFriends" />显示共同好友</li>\
									<li><input type="checkbox" id="bxn_showImagesInOnePage" />相册内全部相片在一页中显示</li>\
									<li><input type="checkbox" id="bxn_allowModifySpecialFriend" />去除特别好友修改限制</li>\
									<li><input type="checkbox" id="bxn_uncheckFeedComment" />默认不将评论发布到新鲜事</li>\
									<li><input type="checkbox" id="bxn_checkWhisper" />默认使用悄悄话</li>\
									<li><input type="checkbox" id="bxn_autoRefreshFeeds" />自动检查新鲜事更新</li>\
								</ul>\
								<h4 class="bxn_h">其他：</h4>\
								<ul class="bxn_ul1">\
									<li><input type="checkbox" id="bxn_classicColor" />恢复深蓝色主题（未启用"去除页面模板"时，在有模板的页面不恢复）</li>\
									<li><input type="checkbox" id="bxn_noFontFamily" />去除页面的字体限制</li>\
									<li><input type="checkbox" id="bxn_fixNavWidth" />修正错误的标签页宽度</li>\
									<li><input type="checkbox" id="bxn_showMatualFriendsImage" />显示共同好友的头像</li>\
									<li><input type="checkbox" id="bxn_fixShareLink" />修正分享功能，支持https，使用真实外部链接</li>\
									<li>头像列表中头像最大数量，0为不限（不影响共同好友列表） <input id="bxn_headAmount" style="width:30px ;" /></li>\
									<li>新鲜事检查间隔时间：<input id="bxn_checkFeedInterval" style="width:30px ;" />秒</li>\
								</ul>\
								<h4 class="bxn_h">脚本设置：</h4>\
								<ul class="bxn_ul1">\
									<li><input type="checkbox" id="bxn_checkUpdate" />自动检查脚本更新。<input id="bxn_updateNow" type="button" value="立即检查"/>\
										<div style="min-height:25px;margin-left:16px">页面地址：<input id="bxn_pageLink" style="width:290px ;" /></div>\
										<div style="min-height:25px;margin-left:16px">脚本地址：<input id="bxn_scriptLink" style="width:290px ;" /></div>\
									</li>\
								</ul>\
							</div>\
						</div>\
						<div class="dialog_buttons">\
							<input type="button" id="bxn_ok" class=" input-submit" value="确定" dialog="1"/>\
							<input type="button" id="bxn_cancel" class=" input-submit gray" value="取消" dialog="1"/>\
						</div>\
					</td>\
					<td class="pop_border"/>\
				</tr>\
				<tr>\
					<td class="pop_bottomleft"/>\
					<td class="pop_border"/>\
					<td class="pop_bottomright"/>\
				</tr>\
			</tbody>\
		</table>\
		'

		menu=$("bxn_configMenu");
		if(menu!=null) {
			return;
		}
		menu=document.createElement("div");
		menu.id="bxn_configMenu";
		menu.style.width="450px";
		menu.style.left="50%";
		menu.style.marginLeft="-225px";
		menu.style.display="none";
		menu.style.position="fixed";
		menu.style.zIndex=20000;
		menu.innerHTML=configMenuContent;
		document.body.appendChild(menu);
		for each (o in options) {
			e=$(o.op);
			if(e) {
				e.checked=ov[o.op];
			}
		}
		e=$("bxn_headAmount");e.value=GM_getValue("bxn_headAmount",12).toString();
		e=$("bxn_checkFeedInterval");e.value=GM_getValue("bxn_checkFeedInterval",60).toString();
		e=$("bxn_pageLink");e.value=GM_getValue("bxn_pageLink","http://userscripts.org/scripts/show/45836");
		e=$("bxn_scriptLink");e.value=GM_getValue("bxn_scriptLink","http://userscripts.org/scripts/source/45836.user.js");
		e=$("bxn_navExtraContent");e.value=GM_getValue("bxn_navExtraContent","群组\nhttp://group.renren.com/tribenav.do\n论坛\nhttp://club.renren.com/");

		$("bxn_ok").addEventListener("click",menuOK,false);
		$("bxn_cancel").addEventListener("click",menuCancel,false);
		$("bxn_navExtraShow").addEventListener("click",navExtraShow,false);
		$("bxn_updateNow").addEventListener("click",checkUpdateNow,false);
	} catch (e) {
		printErrorLog("createConfigMenu",e);
	}

	function menuOK(evt) {
		try {
			var e,o;
			e=$("bxn_headAmount");
			if(!/^[0-9]+$/.test(e.value) || parseInt(e.value)<0) {
				alert("请在头像最大数量处输入一个非负整数！");
				e.focus();
				e.selectionStart=0;
				e.selectionEnd=e.value.length;
				return;
			}
			e=$("bxn_checkFeedInterval");
			if(!/^[0-9]+$/.test(e.value) || parseInt(e.value)<=0) {
				alert("请在更新新鲜事间隔时间处输入一个正整数！");
				e.focus();
				e.selectionStart=0;
				e.selectionEnd=e.value.length;
				return;
			}

			e=$("bxn_headAmount");
			GM_setValue("bxn_headAmount",parseInt(e.value));
			e=$("bxn_checkFeedInterval");
			GM_setValue("bxn_checkFeedInterval",parseInt(e.value));
			e=$("bxn_scriptLink");
			GM_setValue("bxn_scriptLink",e.value);
			e=$("bxn_pageLink");
			GM_setValue("bxn_pageLink",e.value);
			e=$("bxn_navExtraContent");
			GM_setValue("bxn_navExtraContent",e.value);

			for each (o in options) {
				e=$(o.op);
				e && GM_setValue(o.op,e.checked);
			}
			menuCancel(evt);
			window.location.reload();
		} catch (e) {
			printErrorLog("menuOK",e);
		}
	}

	function menuCancel(evt) {
		try {
			var e=$("bxn_configMenu");
			e && hideElement(e);
		} catch (e) {
			printErrorLog("menuCancel",e);
		}
	}

	function navExtraShow(evt) {
		try {
			var e=$("bxn_navExtraBox");
			var hide=(e.style.display=="none");
			e.style.display=hide?"block":"none";
			$("bxn_navExtraShow").innerHTML=hide?"隐藏":"显示";
		} catch (e) {
			printErrorLog("navExtraShow",e);
		}
	}

	function checkUpdateNow(evt) {
		try {
			checkUpdate(true);
		} catch (e) {
			printErrorLog("checkUpdateNow",e);
		}
	}
}

function showConfigMenu() {
	try {
		var e=$("bxn_configMenu");
		var ei=$("bxn_innerBox");
		if(e && ei) {
			ei.style.height="";
			e.style.display="block";
			if(window.innerHeight<e.offsetHeight) {
				ei.style.height=(window.innerHeight<200)?"100px":(window.innerHeight-100)+"px";
			}
			e.style.top=(window.innerHeight<e.offsetHeight)?0:(window.innerHeight-e.offsetHeight)/2+"px";
		}
	} catch (e) {
		printErrorLog("showConfigMenu",e);
	}
}

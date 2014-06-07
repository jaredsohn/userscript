// ==UserScript==
// @name          鲜果 Plus | Xianguo Plus
// @namespace     http://userstyles.org
// @description	  对鲜果RSS阅读器进行了增强和优化
// @version       0.41
// @author        CIH
// @homepage      http://blog.recih.cn/xianguo-plus
// @include       http://www.xianguo.com/reader/
// ==/UserScript==
const DEBUG = false;

var console =
{ 
	log : function (text) { if( DEBUG ) unsafeWindow.console.log( text ); },
	info : function (text) { if( DEBUG ) unsafeWindow.console.info( text ); },
	warn : function (text) { if( DEBUG ) unsafeWindow.console.warn( text ); },
	error : function (text) { if( DEBUG ) unsafeWindow.console.error( text ); }
}

var SITE_INFO =
[
	{
		feedId: 43,
		template: "<xsl:template match=\"/\">\n<div>\n\t<xsl:copy-of select=\"id('news_content')/div[@class='digbox']/preceding-sibling::*\" />\n</div>\n<hr />\n<h3>热门评论</h3>\n<xsl:for-each select=\"id('g_content')/dl\">\n\t<div class=\"xianguo-plus-comment\">\n\t\t<div class=\"title\"><xsl:value-of select=\"dt[@class='re_author']\" /></div>\n\t\t<xsl:copy-of select=\"dd[@class='re_detail']/node()\" />\n\t\t<div><xsl:copy-of select=\"dd[@class='re_mark']/node()\" /></div>\n\t</div>\n</xsl:for-each>\n</xsl:template>",
		charset: "gb2312"
	}
];

var css = 
<style><![CDATA[
@namespace url(http://www.w3.org/1999/xhtml); 
#context_itemList .item {
	margin-left: 5px !important;
	margin-right: 5px !important;
	opacity: 0.5;
	border: 2px solid #e0e0e8 !important;
	-moz-border-radius: 10px;
}

#context_itemList .item_selected {
	opacity: 1;
	border: 2px solid #83AFF0 !important;
	-moz-border-radius: 10px;
}

.item_bottom {
	background-color: #EEEEEE;
	-moz-border-radius-bottomleft: 8px;
	-moz-border-radius-bottomright: 8px;
} 

.item_header .header_left {width: 68% !important;} 
.itemPannel_hr {background-color: white !important; height: 5px !important;}

#xianguoPlusFullFeedPanelDiv {
	position:fixed;
	height:432px;
	width:350px;
	background-color:#C1D8F9;
	border:1px solid #919B9c;
	font-size:12px;
	padding:8px;
	display:none;
}

.item_descr {position: relative;}
.xianguo-plus-loading {
	position: absolute;
	right: 15px;
	top: 0;
	height: 18px;
	padding: 2px;
	background-color: #EA0000;
	color: white;
}

.xianguo-plus-comment {margin-bottom: 8px; border: 1px solid #D3D3D3; padding: 8px; -moz-border-radius: 5px;}
.xianguo-plus-comment .title {display: block; color: #4A7BB5; background-color: #CDEBFE; padding: 8px;}
]]>
</style>
css = css.text();
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}

function $(id) {
  return unsafeWindow.document.getElementById(id);
}

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

function $$(xpath,root) { 
  xpath=xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3').
             replace(/\.([\w-]+)(?!([^\]]*]))/g,'[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]').
              replace(/#([\w-]+)/g,'[@id="$1"]').
              replace(/\/\[/g,'/*[');
  str='(@\\w+|"[^"]*"|\'[^\']*\')'
  xpath=xpath.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'),'contains($1,$2)').
              replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'),'starts-with($1,$2)').
              replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'),'substring($1,string-length($1)-string-length($2)+1)=$2');
  var got=document.evaluate(xpath,root||document,null,null,null), result=[];
  while(next=got.iterateNext()) result.push(next);
  return result;
}

function extend(destination,source)
{
	for(property in source)
	{
		destination[property]=source[property];
	}
	return destination;
};

String.prototype.trim = function()
{
	return this.replace(/(^\s+|\s+$)/g,'');
}

function $import()
{
	var script = [];
	for(var i=0; i<arguments.length; i++)
	{
		var varName = arguments[i];
		script.push("var " + varName + " = unsafeWindow." + varName + ";");
	}
	return script.join("");
}
eval($import(
	"ItemList",
	"Actor",
	"PageMgr",
	"PanelMgr",
	"TabMgr",
	"JSON",
	"WaitControl",
	"AsyncCall",
	"interfaceUrl",
	"htmlToFragment",
	"ChannelList",
	"UBB",
	"setTimeout"
));

var _feedInitMenu = ChannelList.Feed.initMenu;
ChannelList.Feed.initMenu = function()
{
	_feedInitMenu.call(ChannelList.Feed);
	var menu = ChannelList.Feed.menu;
	menu.addGroupItem('menuitem_line');
	menu.addItem('Feed全文设置...',function(){Panel.FullFeed.show(ChannelList.Feed.FeedID);});
}

var Panel=
{
	extend: function(obj)
	{
		obj.getValue = Panel.getValue;
		obj.setValue = Panel.setValue;
		obj.getElement = Panel.getElement;
		return obj;
	},
	
	onLoad: function(event)
	{
		for(var prop in Panel)
		{
			if(typeof Panel[prop] == "function")
			{
				continue;
			}
			var panel = Panel[prop];
			if(typeof panel.onLoad == "function")
			{
				panel.onLoad(event);
			}
		}
	},
	
	getElement: function(name)
	{
		return $x("id('" + this.id + "')//*[@name='" + name + "']")[0];
	},
	
	getValue: function(name)
	{
		if(name)
		{
			var el = this.getElement(name);
			return el ? el.value : undefined;
		}
		else
		{
			var els = $x("id('" + this.id + "')//*[@name]");
			var result = {};
			for(var i=0; i<els.length; i++)
			{
				var item = els[i];
				var name = item.name;
				if(name && item.value)
				{
					result[name] = item.value;
				}
			}
			return result;
		}
	},
	
	setValue: function(name, value)
	{
		var el = this.getElement(name);
		if(el)el.value = value ? value : "";
	}
}

Panel.FullFeed = Panel.extend(
{
	id: "xianguoPlusFullFeedPanelDiv",
	html:
<div id="xianguoPlusFullFeedPanelDiv">
	<span onclick="PanelMgr.hide()" class="close">&#x00A0;</span>
	<div id="xianguoPlus.FullFeed.title" style="font-size: 12px; font-weight: bold;">测试</div>
	<div style="border: 1px solid #919b9c; background-color: #ddecff; padding: 8px;">
		启用：<input type="checkbox" name="disabled" /><br />
		Feed ID：<input name="feedId" type="text" disabled="disabled" /><br />
		Feed全文模板：（支持XSLT。或者可通过$x&#123;...&#125;使用XPath查找页面元素）<br />
		<textarea name="template" style="height: 135px; width: 320px; font-size: 12px; scroll: auto;">&#x00A0;</textarea><br />
		网页编码：<input name="charset" type="text" value="utf-8"/><br />
		自动读取：<input type="checkbox" name="auto" /><br />
		自动读取应用于包含以下关键词的文章：（正则表达式）<br />
		<font color="red">如果为空的话将自动读取所有文章</font><br />
		<textarea name="keyword" style="height: 50px; width: 320px; font-size: 12px;">&#x00A0;</textarea><br />
		<br />
		<span style="float: left;">
			<button id="xianguoPlus.ok">确定</button>
			<button onclick="PanelMgr.hide()">取消</button>
		</span>
		<span style="float: right;">
			<button id="xianguoPlus.remove">删除</button>
		</span>
		<div class="clear"/>
	</div>
</div>,

	show: function(feedId)
	{
		var panel = $(this.id);
		if(!panel) return;
		var feedId = feedId || ChannelList.currentSelectedId;
		var feed = ChannelList.FindChannel(feedId);
		var title = feed ? feed.title : "没有标题";
		
		var info = SiteInfo.get(feedId) || {disabled: true, charset: "utf-8"};
		this.getElement("disabled").checked = info.disabled != true;
		this.setValue("feedId", feedId);
		this.setValue("template", info.template);
		this.setValue("charset", info.charset);
		this.getElement("auto").checked = info.auto == true;
		this.setValue("keyword", info.keyword);
		
		$("xianguoPlus.FullFeed.title").innerHTML = title + " - Feed全文设置 ";
		PanelMgr.show($(this.id), {});
	},
	
	save: function()
	{
		var info = this.getValue();
		info.disabled = !this.getElement("disabled").checked;
		if(!info.disabled) delete info.disabled;
		info.auto = this.getElement("auto").checked;
		if(!info.auto) delete info.auto;
		
		if(info.template && info.template.trim().length > 0)
		{
			SiteInfo.put(info.feedId, info);
		}
		else
		{
			SiteInfo.remove(info.feedId);
		}
		SiteInfo.save();
	},
	
	remove: function()
	{
		var feedId = this.getValue("feedId");
		SiteInfo.remove(feedId);
		SiteInfo.save();
	},
	
	onLoad: function(event)
	{
		var div = document.createElement("DIV");
		div.innerHTML = Panel.FullFeed.html.toXMLString();
		document.body.appendChild(div.firstChild);
		$("xianguoPlus.ok").addEventListener("click", function(event)
		{
			Panel.FullFeed.save();
			PanelMgr.hide();
		}, false);
		$("xianguoPlus.remove").addEventListener("click", function(event)
		{
			Panel.FullFeed.remove();
			PanelMgr.hide();
		}, false);
	}
});
window.addEventListener("load", Panel.onLoad, false);

var SiteInfo =
{
	_info: {},
	put: function(feedId, info)
	{
		this._info[feedId] = info;
	},
	
	get: function(feedId)
	{
		var info = this._info[feedId];
		return info ? extend({}, info) : undefined;
	},
	
	remove: function(feedId)
	{
		delete this._info[feedId];
	},
	
	save: function()
	{
		var json = JSON.stringify(SiteInfo._info);
		GM_setValue("siteInfo", json);
	},
	
	init: function()
	{
		SITE_INFO.forEach(function(site)
		{
			SiteInfo.put(site.feedId, site);
		});
		var json = GM_getValue("siteInfo");
		if(json)
		{
			var info = JSON.parse(json) || {};
			for(var feedId in info)
			{
				var site = SiteInfo._info[feedId];
				if(site)
				{
					extend(site, info[feedId]);				
				}
				else
				{
					SiteInfo._info[feedId] = info[feedId];
				}
			}
		}
	}
}
SiteInfo.init();

var ContentCache =
{
	MAX_SIZE: 50,
	_content: {},
	_index: [],
	put: function(id, content)
	{
		this._index.push(id);
		this._content[id] = content;
		if(this.size() > this.MAX_SIZE)
		{
			var first = this._index.shift();
			delete this._content[first];
		}
	},
	
	get: function(id)
	{
		return this._content[id];
	},
	
	clear: function()
	{
		this._content = {};
		this._index = [];
	},
	
	size: function()
	{
		return this._index.length;
	}
}

var _init = ItemList.Init;
ItemList.Init = function()
{
	ItemList.isAppending = false;
	return _init();
}

ItemList.scrollToItem=function(index)
{
	if(index<0||index>=ItemList.cShowCount||!ItemList.scrollEnable)return;
	var firstTop = $("item_" + ItemList.cList[0].feedItemId).offsetTop;
	var scroll = $("item_" + ItemList.cList[index].feedItemId).offsetTop - firstTop;
	if(!Actor.UserConfig.full_scroll)
	{
		$('context_itemList').scrollTop=scroll;
	}
	else
	{
		$('content_pannel').scrollTop=scroll+$('header_pannel').offsetHeight+$('itemList_header').offsetHeight;
	}
}

ItemList.openCurrentItem=function()
{
	if(!PageMgr.inItemList()||ItemList.cSelectedItemIndex===null)return;
	var item=ItemList.cList[ItemList.cSelectedItemIndex];
	var siteInfo = SiteInfo.get(item.feedId);
	if(siteInfo && !siteInfo.disabled)
	{
		var container = $("descr_" + item.feedItemId);
		var loading = $x("div[@class='xianguo-plus-loading']", container)[0];
		var xianguoPlus = $x("div[@class='xianguo-plus-content']", container)[0];
		if(!loading && !xianguoPlus)
		{
			setTimeout(function(){
				Fetcher.request(item, container, siteInfo);
			},1);
			return;
		}
	}
	var url = 'http://www.xianguo.com/go.php?fi=' + item.feedItemId;
	GM_openInTab(url);
}

var _selectItem = ItemList.selectItem;
ItemList.selectItem=function(index,onlyFocus)
{
	var result = _selectItem(index, onlyFocus);
	if(ItemList.cList.length - index <= 7)
	{
		if(!ItemList.isAppending)
		{
			ItemList.isAppending = true;
			ItemList.appendNextPage();
		}
	}
	return result;
}

ItemList.appendNextPage=function()
{
	var page = ItemList.cPage + 1;
	if(!page)return;
	if(page<0||page>this.cTotalPage)return;
	if(!$('itemList_footer_filp'))return;
	ItemList.isRefreshing=true;
	var loader=$('itemList_footer_filp').loader;
	if(loader){
		eval("unsafeWindow."+loader+"("+page+")");
	}
	else
	{
		ItemList.load(page);
	}
}

ItemList.load=function(page,onComplete,onError){
	if(page){
		ItemList.params.page=page-1;
		ItemList.cPage=page;
	}
	var params='method='+ItemList.method+'&params='+JSON.serialize(ItemList.params);
	
	if(!ItemList.isAppending)
	{
		WaitControl.PannelWait();
	}
	AsyncCall(interfaceUrl,params,function(res){
		var ret=eval('('+res.responseText+')');
		if(ret.status==0){
			if(onError)onError(ret);
			return;
		}
		try{
			var title=ItemList.getTitle()||'';
			if(!ItemList.isAppending)
			{
				ItemList.GoPageHead();
				if(ItemList.isRefreshing||ItemList.cPage>1){
					$('context_itemList').innerHTML='';
				}else{
					ItemList.LoadRange();
					
					ItemList.SwitchUnreadModeHtml();
					ItemList.SwitchListModeHtml();
					ItemList.showOptionLabel(true);
					ItemList.showChannelSetting(ItemList.isSingleFeed()&&ItemList.status!='preview');
					ItemList.setTitle(title);
				}
				$('context_itemList').focus();
			}
			ItemList.isRefreshing=false;
			
			if(!ItemList.isAppending)
			{
				ItemList.cShowCount=0;
				ItemList.cSelectedItemId=null;
				ItemList.cSelectedItemIndex=null;
			}
			if(ret.data.feeds)
				ItemList.cFeedsMap=ret.data.feeds;
			if(onComplete&&onComplete(ret)===false)return;
			
			var list = ret.data.list;
			if(!ItemList.isAppending)
			{
				if(UBB){
					for(var i=0;i<list.length;i++){
						list[i].description=UBB.toHtml(list[i].description);
					}
				}
				ItemList.cList=list;
			}
			else
			{
				for(var i=0;i<list.length;i++){
					var item = list[i];
					if(UBB){
						item.description=UBB.toHtml(item.description);
					}
					ItemList.cList.push(item);
				}
			}
			
			ItemList.cListTotal=ret.data.total;
			ItemList.cTotalPage=ret.data.totalPage;
			//ItemList.showOptionNextPage(ItemList.cPage<ItemList.cTotalPage);
			ItemList.showOptionNextPage(false);
			ItemList.showPager();
			ItemList.ShowList();
		
		}catch(ex){
			console.log(ex);
		}
	},onError);
	if(!Actor.isAnonymous() && !ItemList.isAppending){
		ItemList.initAnalyzer();
	}
}

ItemList.unreadLoad=function(ret){
	ItemList.cTotalPage=parseInt(ItemList.cListTotal/Actor.UserConfig.page_size)+(ItemList.cListTotal%Actor.UserConfig.page_size>0?1:0);
	var list=ret.data.firstPage||ret.data.list;
	if(!ItemList.isAppending)
	{
		if(UBB){
			for(var i=0;i<list.length;i++){
				list[i].description=UBB.toHtml(list[i].description);
			}
		}
		ItemList.cList=list;
	}
	else
	{
		for(var i=0;i<list.length;i++){
			var item = list[i];
			if(UBB){
				item.description=UBB.toHtml(item.description);
			}
			ItemList.cList.push(item);
		}
	}
	//ItemList.showOptionNextPage(ItemList.cPage<ItemList.cTotalPage);
	ItemList.showOptionNextPage(false);
	
	if(ItemList.item_list.length>=ItemList.cPage){
		ItemList.item_list[ItemList.cPage-1][2]=ItemList.cList;
	}
	//ItemList.cShowCount=0;
	
	ItemList.showPager('ItemList.loadUnreadItemsPager');
	ItemList.ShowList();
	return false;
}

ItemList.ShowList=function(showSubFolder){
	if(!$('context_itemList'))return;
	if(!ItemList.isAppending)
	{
		$('context_itemList').innerHTML='';
	}
	if(this.onShowList&&this.onShowList()===false)return;
	ItemList.loading=true;
	WaitControl.PannelEndWait();

	if(ItemList.cList==null){
		$('context_itemList').innerHTML+=ItemList.CreateNullItem();
		return;
	}

	if(!ItemList.isAppending)
	{
		ItemList.enableScrollRead(true);
	}

	if(ItemList.cList.length==0){
		$('context_itemList').innerHTML+=ItemList.CreateNullItem();
	}else{
	
		ItemList.fixUnread();
		ItemList.setAnalyzerRange(ItemList.cList);
		ItemList.CreateShowListItem();
	}
	var channelInfo=ChannelList.FindChannel(ItemList.cFeedID);
	if(channelInfo!=null)
	ItemList.setSubscriberNum(channelInfo.subscribeNum);
	setTimeout("PageMgr.adjustMainSize()",100);
	if(!Actor.UserConfig.item_list_mode&&ItemList.cList&&ItemList.cList.length>0){
		if(ItemList.cSelectedItemId==null)
		{
			ItemList.selectItem(0);
		}
	}
}

ItemList.CreateShowListItem=function(){
	if(ItemList.loading==false)return;
	
	var count=ItemList.cShowCount||0;
	var itemList=ItemList.cList;
	if(itemList.length<=count){
		if(itemList.length >= ItemList.cListTotal)
		{
			var div=document.createElement('div');
			div.className='item_place_holder';
			if($('context_itemList'))$('context_itemList').appendChild(div);
			setTimeout(function(){
				var lastItemHeight = $("item_" + ItemList.cList[ItemList.cList.length - 1].feedItemId).offsetHeight;
				if($('context_itemList').offsetHeight - lastItemHeight > 355)
				{
					div.style.height=($('context_itemList').offsetHeight-lastItemHeight-5) + "px";
				}
			}, 300);
		}
		ItemList.isAppending=false;
		ItemList.loading=false;
		ItemList.cShowCount=itemList.length;
		return;
	}
	try{
		if(Actor.UserConfig.item_list_mode){
			var html=[];
			
			for(var i=count;i<itemList.length;i++){
				if(!itemList[i])continue;
				itemList[i]._expandDescr=false;
				html.push(ItemList.createItemHtml(i));
				html.push('<div class="itemPannel_hr"></div>');
			}
			ItemList.cShowCount=itemList.length;
			ItemList.loading=false;
			var panel=$('context_itemList');
			if(panel){
				if(panel.innerHTML=='')
				panel.innerHTML=html.join('');
				else panel.appendChild(htmlToFragment(html.join('')));
			}
			
		}else{
			var html=[];
			var fetchItems = [];
			var cachedItems = [];
						
			for(var i=count;i<itemList.length&&ItemList.cShowCount-count<5;i++){
				if(itemList[i]){
					var item=itemList[i];
					
					var cache = ContentCache.get(item.feedItemId);
					if(cache)
					{
						cachedItems.push(item);
					}
					else
					{
						var siteInfo = SiteInfo.get(item.feedId);
						if(siteInfo && !siteInfo.disabled && siteInfo.auto)
						{
							var regexp = new RegExp(siteInfo.keyword, "i");
							if(item.title.search(regexp) != -1 ||
								item.description.search(regexp) != -1)
							{
								fetchItems.push(item);
							}
						}
					}
					
					item._expandDescr=true;
					html.push(ItemList.createItemHtml(i));
					html.push('<div class="itemPannel_hr"></div>');
				}
				ItemList.cShowCount++;
			}
			var panel=$('context_itemList');
			if(!panel)return;
			panel.appendChild(htmlToFragment(html.join('')));

			for(var i=0;i<cachedItems.length;i++)
			{
				var item = cachedItems[i];
				var container = $("descr_" + item.feedItemId);
				var cache = ContentCache.get(item.feedItemId);
				if(cache)
				{
					while (container.firstChild) {
						container.removeChild(container.firstChild);
					}
					container.innerHTML = cache;
				}
			}
			
			if(fetchItems.length > 0)
			{
				setTimeout(function()
				{
					Fetcher.batchRequest(fetchItems);
				}, 1);
			}
		
			setTimeout(ItemList.CreateShowListItem,10);
		}
	}catch(ex){
		console.log(ex);
	}
	if(ItemList.cShowCount>=itemList.length){
		if(Actor.UserConfig.mark_page_read&&ItemList.status=='feed'){
			for(var i=0;i<itemList.length;i++){
				var item=ItemList.cList[i];
				if(!ItemList.isItemReaded(item)){
					ItemList.markItemReaded(i,true);
				}
			}
		}
	}
}

var _showPager = ItemList.showPager;
ItemList.showPager=function(functioName)
{
	if(Actor.UserConfig.item_list_mode)
	{
		return _showPager(functioName);
	}
	else
	{
		var functioName=functioName||'ItemList.load';
		var flipHtml='';
		if(ItemList.cListTotal>0){
			flipHtml+='<span>前'+ItemList.cList.length+'篇 共'+ItemList.cListTotal+'篇</span> ';
		}
		$('itemList_footer_filp').innerHTML=flipHtml;
	
		$('itemList_footer_filp').loader=functioName;
		if(this.status=="feed"){
			ChannelList.setGoItemsView();
		}
	}
}

var UBB = {
	ubbTags:
	{
		b: [/\[b\](.+?)\[\/b\]/ig, "<b>$1</b>"],
		i: [/\[i\](.+?)\[\/i\]/ig, "<i>$1</i>"],
		u: [/\[u\](.+?)\[\/u\]/ig, "<u>$1</u>"],
		color: [/\[color=['"]?(.+?)['"]?\](.+?)\[\/color\]/ig, "<font color=\"$1\">$2</font>"],
		size: [/\[size=['"]?(.+?)['"]?\](.+?)\[\/size\]/ig, "<font size=\"$1\">$2</font>"],
		simpleUrl: [/\[url\](.+?)\[\/url\]/ig, "<a href=\"$1\">$1</a>"],
		url: [/\[url=['"]?(.+?)['"]?\](.+?)\[\/url\]/ig, "<a href=\"$1\">$2</a>"],
		img: [/\[img\](.+?)\[\/img\]/ig, "<img src=\"$1\" />"]
	},
	
	toHtml: function(text)
	{
		for(var tagName in UBB.ubbTags)
		{
			var tag = UBB.ubbTags[tagName];
			text = text.replace(tag[0], tag[1]);
		}
		return text;
	}
};
unsafeWindow.UBB = UBB;

var Fetcher=
{
	MAX_ACTIVE_REQUEST: 5,
	_active: 0,
	_queue: [],
	batchRequest: function(items)
	{
		for(var i=0;i<items.length;i++)
		{
			var item = items[i];
			var container = $("descr_" + item.feedItemId);
			/*var cache = ContentCache.get(item.feedItemId);
			if(cache)
			{
				while (container.firstChild) {
					container.removeChild(container.firstChild);
				}
				container.innerHTML = cache;
				continue;
			}*/

			var siteInfo = SiteInfo.get(item.feedId);
			if(siteInfo && !siteInfo.disabled)
			{
				if(this._active >= this.MAX_ACTIVE_REQUEST)
				{
					this._queue.push([item, container, siteInfo]);
					continue;
				}
				Fetcher.request(item, container, siteInfo);
			}
		}
	},
	
	request: function(item, container, options, redirectURL)
	{
		if(!container)return;
		GM_log([this._active, this._queue.length]);
		options = extend({}, options);
		var cache = ContentCache.get(item.feedItemId);
		if(cache)
		{
			while (container.firstChild) {
				container.removeChild(container.firstChild);
			}
			container.innerHTML = cache;
			return;
		}

		this._active++;
		var url = redirectURL || item.url;

		var loading = $x("div[@class='xianguo-plus-loading']", container)[0];
		if(!loading)
		{
			loading = document.createElement("DIV");
			loading.className = "xianguo-plus-loading";
			loading.innerHTML = "正在载入...";
			container.appendChild(loading);
		}
		GM_log(url);
		var options = options || {charset: "utf-8"};
		console.log(options);
		var mime = 'text/html; charset=';
		mime += options.charset;
		console.log(mime);
		GM_xmlhttpRequest({
			method: "GET", 
			headers: {"User-Agent":	navigator.userAgent},
			url: url,
			overrideMimeType: mime,
			onload: function(r)
			{
				GM_log(r.status);
				if(r.status == 200)
				{
					var text = r.responseText;
					text = text.replace(/(<[^>]*?)on(?:(?:un)?load|(?:db)?click|mouse(?:down|up|over|out|move)|key(?:press|down|up)|abort|blur|change|error|focus|re(?:size|set)|select|submit)\s*?=\s*?["'][^"']*?["']/ig, "$1");
					text = text.replace(/<\s*?script[^>]*?>[\s\S]*?<\s*?\/script\s*?>/ig, "");
					var newUrl = Fetcher.metaRefresh(text);
					if(newUrl)
					{
						if(newUrl.indexOf("://") == -1)
						{
							newUrl = Fetcher.getURLPrefix(url) + newUrl;
						}
						Fetcher._requestFinish();
						Fetcher.request(item, container, options, newUrl);
						return;
					}
					var html = text.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '');
					var div = document.createElement("DIV"); 
					div.innerHTML = html;
					var contents = document.createElement("DIV");
					contents.className = "xianguo-plus-content";
					if(!options.template)
					{
						options.template = "$x{" + options.xpath + "}";
					}
					if(options.template.indexOf("<xsl:") != -1)
					{
						contents.appendChild(Fetcher.xsltTransform(options.template, div));
					}
					else
					{
						contents.innerHTML = Fetcher.evalTemplate(options.template, div);
					}
					contents = Fetcher.changeURL(contents, url);
					ContentCache.put(item.feedItemId, contents.innerHTML);
					loading = null;
					if(container)
					{
						while (container.firstChild) {
							container.removeChild(container.firstChild);
						}
						container.appendChild(contents);
					}
				}
				else if(r.status == 301)
				{
					var headers = r.responseHeaders;
					var groups = /Location:\s*(.+?)\r?\n/.exec(headers);
					if(groups && groups[1])
					{
						var location = groups[1];
						Fetcher._requestFinish();
						Fetcher.request(item, container, options, location);
						return;
					}
				}
				else
				{
					loading.innerHTML = "载入时发生错误";
					GM_log(r.responseHeaders);
				}
				Fetcher._requestFinish();
  		},
  		onerror: function(r)
  		{
  			console.error(r);
  			loading.innerHTML = "载入时发生错误";
  			Fetcher._requestFinish();
  		}
    });
	},
	
	_requestFinish: function()
	{
		this._active--;
		if(this._active < 0) this._active = 0;
		if(this._active < this.MAX_ACTIVE_REQUEST && this._queue.length > 0)
		{
			var args = this._queue.shift();
			this.request(args[0], args[1], args[2], args[3]);
		}
	},
	
	evalTemplate: function(template, node)
	{
		var div = document.createElement("DIV"); 
		var result = template.replace(/\$x\{(.+?)\}/g, function(str, group1)
		{
			while(div.firstChild)
			{
				div.removeChild(div.firstChild);
			}
			$x(group1, node).forEach(function(item)
			{
				div.appendChild(item);
			});
			return div.innerHTML;
		});

		return result;
	},
	
	xsltTransform: function(template, node)
	{
		var parser = new DOMParser();
		var processor = new XSLTProcessor();
		template = '<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">' +
			template + '</xsl:transform>';
		var xslt = parser.parseFromString(template, "text/xml");
		processor.importStylesheet(xslt);
		return processor.transformToFragment(node, document);
	},
	
	metaRefresh: function(html)
	{
		var groups = /<meta\s+http\-equiv=['"]?refresh['"]?\s+content=['"]?\d+;\s*url=([^>]+?)['"]?\s*>/i.exec(html);
		if(groups && groups[1])
		{
			return groups[1];
		}
	},
	
	getURLPrefix: function (url)
	{
		var groups = url.match(/((http|https):\/\/)?([^\/]+)/i);
		if(groups && groups[1] && groups[3])
		{
			return groups[1] + groups[3] + "/";
		}
		return null;
	},
	
	changeURL: function(node, pageUrl)
	{
		var urlPrefix = this.getURLPrefix(pageUrl);
		var aTags = $x('//a', node);
		if (aTags)
		{
			for(var i = 0; i < aTags.length; i++)
			{
				aTags[i].setAttribute('target', '_blank');
				var href = aTags[i].getAttribute('href');
				if(href)
				{
					if(href.indexOf('javascript:') == 0)
					{
						aTags[i].setAttribute('href', 'javascript:;');
					}
					else if(href.indexOf('mailto:') == 0)
					{
						
					}
					else if(href.indexOf('://') == -1)
					{
						aTags[i].setAttribute('href', urlPrefix + href);
					}
				}
			}
		}
		
		var imgTags = $x('//img', node);
		if (imgTags)
		{
			for(var i = 0; i < imgTags.length; i++)
			{
				var src = imgTags[i].getAttribute('src');
				if(src && src.indexOf('://') == -1)
				{
					imgTags[i].setAttribute('src', urlPrefix + src);
				}
			}
		}
		
		return node;
	}
}
// ==UserScript==
// @name			安娜（新浪微博）
// @namespace		http://weibo.com/caols
// @description		在新浪微博（weibo.com）添加过滤，自动切换，无限制浏览等功能。
// @features		首页显示时从“全部”标签切换到其他标签，如相互关注；去除10页的浏览限制（即无限制浏览功能）。
// @version			0.2
// @created			2012.02.10
// @modified		        2012.02.13
// @author			Gnauk
// @include			http://weibo.com/*
// @include			http://www.weibo.com/*
// @inherit             @富平侯, http://weibo.com/salviati    
// ==/UserScript==

var $version = 0.2;
var $uid;
var $blocks;
var $tabValues;
var $noLimitScanFlag;

// Chrome提供的GM_getValue()等有问题（早期版本则不支持），需要使用localStorage重新定义
// Firefox 2+, Internet Explorer 8+, Safari 4+和Chrome均支持DOM Storage (HTML5)
if (window.localStorage) {
	var keyRoot = 'weiboPlus.';
	
	GM_deleteValue = function (name) {
		localStorage.removeItem(keyRoot+name);
	}

	GM_getValue = function (name, defval) {
		var value = localStorage.getItem(keyRoot+name);
		if (value == null)
			return defval;
		return value;
	}

	GM_setValue = function (name, value) {
		localStorage.setItem(keyRoot+name, value);
	}
}

if (!window.chrome)
{
	// 非Chrome浏览器，优先使用unsafeWindow获取全局变量
	// 由于varname中可能包括'.'，因此使用eval()获取变量值
	getGlobalVar = function (varname) { 
		return eval('unsafeWindow.'+varname);
	}
} 
else
{
	// Chrome原生不支持unsafeWindow，脚本运行在沙箱中，因此不能访问全局变量。
	// 但用户脚本与页面共享DOM，所以可以设法将脚本注入host页
	// 详见http://voodooattack.blogspot.com/2010/01/writing-google-chrome-extension-how-to.html
	getGlobalVar = function (varname)
	{
		var elem = document.createElement("script");
		var ret, id = "";
		// 生成脚本元素的随机索引
		while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ?
			0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9 )));
		// 生成脚本
		elem.id = id;
		elem.type = "text/javascript";
		elem.innerHTML = "(function(){document.getElementById('"+id+"').innerText="+varname+";})();";
		// 将元素插入DOM（马上执行脚本）
		document.head.appendChild(elem);
		// 获取返回值
		ret = elem.innerText;
		// 移除元素
		document.head.removeChild(elem);
		delete (elem);
		return ret;
	}

        setGlobalVar = function(innerHtml)
	{
	    
		var elem = document.createElement("script");
		var ret, id = "";
		// 生成脚本元素的随机索引
		while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ?
			0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9 )));
		// 生成脚本
		elem.id = id;
		elem.type = "text/javascript";
		elem.innerHTML = innerHtml;
		// 将元素插入DOM（马上执行脚本）
		document.head.appendChild(elem);
		// 获取返回值
		//ret = elem.innerText;
		// 移除元素
		document.head.removeChild(elem);
		delete (elem);
		//return ret;
	    
	} 
}
String.prototype.trim = function() {
return this.replace(/(^\s*)|(\s*$)/g, "");
}

function hideFeed(node)
{
	if (node.firstChild.tagName == 'A') // 已被屏蔽过
		node.removeChild(node.firstChild);
	var content = node.childNodes[3];
	if (content.tagName!='DD' || !content.classList.contains('content'))
		return false;
	// 在微博内容中搜索屏蔽关键词
	if (searchWhiteKeyword(content.textContent))
	{
		node.style.display = '';
		node.childNodes[1].style.display = '';
		node.childNodes[3].style.display = '';
		node.childNodes[1].style.opacity = 1;
		node.childNodes[3].style.opacity = 1;
		return false;
	}
	if (searchHideKeyword(content.textContent))
	{
		node.style.display = 'none'; // 直接隐藏，不显示屏蔽信息
		return true;
	}
	else 
		node.style.display = '';
	var keyword = searchCensoredKeyword(content.textContent);
	if (keyword == '')
	{
		node.childNodes[1].style.display = '';
		node.childNodes[3].style.display = '';
		node.childNodes[1].style.opacity = 1;
		node.childNodes[3].style.opacity = 1;
		return false;
	}
	// 2011年11月15日起，新浪微博提供了屏蔽功能，由于屏蔽按钮的存在，微博发布者链接的位置发生了变化
	var author = content.childNodes[3].childNodes[1];
	if (author.tagName != 'A') return false; // 不要屏蔽自己的微博
	// 找到了待隐藏的微博
	node.childNodes[1].style.display = 'none';
	node.childNodes[3].style.display = 'none';
	var tipBackColor = GM_getValue($uid+'.tipBackColor', '#FFD0D0');
	var tipTextColor = GM_getValue($uid+'.tipTextColor', '#FF8080');
	// 添加隐藏提示链接
	authorClone = author.cloneNode(false);
	// 默认的用户链接中多了一个换行符和两个tab
	authorClone.innerHTML = '@'+author.innerHTML.slice(3);
	var showFeed = document.createElement('a');
	showFeed.href = 'javascript:void(0)';
	showFeed.className = 'notes';
	showFeed.style.cssText = 'background-color: '+tipBackColor+'; border-color: '+tipTextColor+'; color: '+tipTextColor+'; margin-bottom: 0px';
	var keywordLink = document.createElement('a');
	keywordLink.href = 'javascript:void(0)';
	keywordLink.innerHTML = keyword;
	keywordLink.addEventListener('click', function (event) {
		showSettingsWindow(event);
		event.stopPropagation(); // 防止事件冒泡触发屏蔽提示的onclick事件
	}, false);
	showFeed.appendChild(document.createTextNode('本条来自'));
	showFeed.appendChild(authorClone);
	showFeed.appendChild(document.createTextNode('的微博因包含关键词“'));
	showFeed.appendChild(keywordLink);
	showFeed.appendChild(document.createTextNode('”而被隐藏，点击显示'));
	showFeed.addEventListener('click', function () 
	{
		this.parentNode.childNodes[2].style.opacity = 1;
		this.parentNode.childNodes[4].style.opacity = 1;
		this.parentNode.removeChild(this);
	}, false);
	showFeed.addEventListener('mouseover', function () 
	{
		this.parentNode.childNodes[2].style.display = '';
		this.parentNode.childNodes[4].style.display = '';
		this.parentNode.childNodes[2].style.opacity = 0.5;
		this.parentNode.childNodes[4].style.opacity = 0.5;
		this.style.cssText = 'background-color: #D0FFD0; border-color: #40D040; color: #40D040;';
	}, false);
	showFeed.addEventListener('mouseout', function () 
	{
		if (this.parentNode == null) return;
		this.parentNode.childNodes[2].style.display = 'none';
		this.parentNode.childNodes[4].style.display = 'none';
		this.parentNode.style.cssText = '';
		this.style.cssText = 'background-color: '+tipBackColor+'; border-color: '+tipTextColor+'; color: '+tipTextColor+'; margin-bottom: 0px';;
	}, false);
	node.insertBefore(showFeed, node.childNodes[0]);
	return true;
}

function searchCensoredKeyword(str)
{
	var keywords = GM_getValue($uid+'.censoredKeywords', '').split(';');
	if (keywords.length == 0)
		return '';
	for (var i in keywords)
	{
		if (keywords[i]!='' && str.indexOf(keywords[i]) > -1)
			return keywords[i];
	}
	return '';
}

function searchHideKeyword(str)
{
	var keywords = GM_getValue($uid+'.hideKeywords', '').split(';');
	if (keywords.length == 0)
		return false;
	for (var i in keywords)
	{
		if (keywords[i]!='' && str.indexOf(keywords[i]) > -1)
			return true;
	}
	return false;
}

function searchWhiteKeyword(str)
{
	var keywords = GM_getValue($uid+'.whiteKeywords', '').split(';');
	if (keywords.length == 0)
		return false;
	for (var i in keywords)
	{
		if (keywords[i]!='' && str.indexOf(keywords[i]) > -1)
			return true;
	}
	return false;
}
//添加无限制浏览按钮
function GotoNextPage()
{
     var listPage=document.getElementsByClassName('W_pages')[0];
    if (listPage===undefined) return;
    var firstFeed=document.getElementsByClassName('feed_list')[0];
     if (firstFeed===undefined) return;
    var href=listPage.children.length==2?listPage.children[1].getAttribute('href').split('&')[0]:listPage.children[2].getAttribute('href').split('&')[0];
    href=href+'&end_id='+firstFeed.getAttribute('mid')+'&pre_page=1&page=2';
    
    listPage.style.display='none';
    var newdiv=document.createElement('div');
    newdiv.className='W_pages'; 
    newdiv.innerHTML='<a id="nextPage" href="'+href+'" class="W_btn_a"><span>下一页</span></a>';
    listPage.parentNode.appendChild(newdiv);
    return false;
}
//去除无限制浏览按钮
function unGotoNextPage()
{
  var listPage=document.getElementsByClassName('W_pages')[0];
  if (listPage===undefined) return;
  listPage.style.display='';
  var nextpage=document.getElementById('nextPage');
  if (nextpage===undefined) return;
  nextpage.style.display=   "none";   //隐藏而不删除   
  nextpage.parentNode.removeChild(nextpage);   //删除 
}

function onDOMNodeInsertion(event)
{
	if (!isHomePage()) return false;
	var node = event.target;
	if (node.tagName=='DL' && node.classList.contains('feed_list'))
	{
		// 处理动态载入的微博
		return hideFeed(node);
	}
	if (node.tagName=='DIV' && node.getAttribute('node-type')=='feed_nav')
	{
		// 由于新浪微博使用了BigPipe技术，从"@我的微博"等页面进入时只载入部分页面
		// 需要重新载入设置页面、按钮及刷新微博列表
		if (document.getElementById('wbpSettings') == null)
			loadSettingsWindow();
		showSettingsBtn();
	}
	else if (node.tagName=='DIV' && node.classList.contains('feed_lists'))
	{
		// 微博列表作为pagelet被一次性载入
		applySettings();
	}else if(node.tagName=='DIV' && node.getAttribute('node-type')=='feed_list_page' &&   $noLimitScanFlag == true)
	{
	    GotoNextPage();
	}
	return false;
}

function checkUpdate()
{
    GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/125373.user.js?source',
		onload: function(result) {
			if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
			ver = RegExp.$1;
			if (parseFloat(ver) <= $version) // 已经是最新版
			{
				alert('脚本已经是最新版。');
				return;
			}
			var features = '';
			if (result.responseText.match(/@features\s+(.*)/)) 
				features = '- '+RegExp.$1.split('；').join('\n- ')+'\n\n';
			// 显示更新提示
			if (confirm('“安娜”新版本v'+ver+'可用。\n\n'+features+'如果您希望更新，请点击“确认”打开脚本页面。'))
				window.open("http://userscripts.org/scripts/show/125373")
		}
    });
}

function showSettingsWindow(event)
{
	document.getElementById('wbpSettingsBack').style.cssText = 'background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: black; opacity: 0.3; position: fixed; top: 0px; left: 0px; z-index: 10001; width: '+window.innerWidth+'px; height: '+window.innerHeight+'px;';
	var block = document.getElementById('wbpSettings');
	// Chrome与Firefox的scrollLeft, scrollTop储存于不同位置
	var left = document.body.scrollLeft==0?document.documentElement.scrollLeft:document.body.scrollLeft;
	var top = document.body.scrollTop==0?document.documentElement.scrollTop:document.body.scrollTop;
	block.style.left = (left+event.clientX)+'px';
	block.style.top = (top+event.clientY+10)+'px';
	block.style.display = '';
}

function showSettingsBtn()
{
	// 设置标签已经置入页面
	if (document.getElementById('wbpShowSettings') != null) return;
	var groups = document.getElementsByClassName('nfTagB_group')[0];
	// Firefox的div#pl_content_homeFeed载入时是空的，此时无法置入页面，稍后由onDOMNodeInsertion()处理
	if (groups===undefined) return;
	var showSettingsTab = document.createElement('li');
	showSettingsTab.innerHTML = '<span><em><a id="wbpShowSettings" href="javascript:void(0)">安娜</a></em></span>';
	groups.children[0].appendChild(showSettingsTab);
	document.getElementById('wbpShowSettings').addEventListener('click', showSettingsWindow, false);
}

function initFirstTab()
{
    var main=document.getElementById('pl_content_homeFeed');
    $tabValues=new Array();

    var ul=main.children[0].children[1].children[0].children[0];
    for(var i=0;i<ul.children.length-1;i++){
         if(ul.children[i].children.length>0){
                var link=ul.children[i].children[0];
                if(link.localName == 'a'|| link.localName == 'span'){
                    $tabValues.push(link.innerText);
                }
          }
     }
     ul=main.children[0].children[1].children[2].children[0];
     for(var i=0;i<ul.children.length-4;i++){
         if(ul.children[i].children.length>0){
                var link=ul.children[i].children[0];
                if(link.localName == 'a'|| link.localName == 'span'){
                    $tabValues.push(link.innerText);
                }
          }
     }
}

function createFirstTab()
{
  
     var tab=document.getElementById('wbpTab4');
     var tbody=tab.children[1].children[0];
     tbody.deleteRow(0);
     
     for(var i=0;i<$tabValues.length;i+=2){
         var newtr= document.createElement('tr');	
         var line='<td><input style="vertical-align: middle; margin-right: 5px;" type="radio" name="TabRadio" id="wbpTabRadio';
         line+=i;
         line+='"><label for="wbpTabRadio';
         line+=i;
         line+='">';
         line+=$tabValues[i];
         line+='</label></td>';
         if(i+1<$tabValues.length)
         {
             var j=i+1;
             line+='<td><input style="vertical-align: middle; margin-right: 5px;" type="radio" name="TabRadio" id="wbpTabRadio';
             line+=j;
             line+='"><label for="wbpTabRadio';
             line+=j;
             line+='">';
             line+=$tabValues[j];
             line+='</label></td>';
         }
         newtr.innerHTML =line;
         tbody.appendChild(newtr);
     }
     
     
    
}




function switchToFirstTab()
{
	var firstTab = GM_getValue($uid+'.firstTab', '');
        if(firstTab == '')
            return false;
	var main=document.getElementById('pl_content_homeFeed');

        var ul=main.children[0].children[1].children[0].children[0];
        for(var i=0;i<ul.children.length;i++)
        {
            if(ul.children[i].children.length>0)
            {
                var link=ul.children[i].children[0];
                if(link.localName == 'a'&& link.innerText.trim() == firstTab)
                {
                    var evObj = document.createEvent('MouseEvents');
                    evObj.initEvent( 'click', true, false );
                    link.dispatchEvent(evObj);
                    return true;
                }
              
            }
            
        }
        //搜索扩展分组层
        ul=main.children[0].children[1].children[2].children[0];
         for(var i=0;i<ul.children.length;i++)
        {
            if(ul.children[i].children.length>0)
            {
                var link=ul.children[i].children[0];
                if(link.localName == 'a'&& link.innerText.trim() == firstTab)
                {
                    var evObj = document.createEvent('MouseEvents');
                    evObj.initEvent( 'click', true, false );
                    link.dispatchEvent(evObj);
                    return true;
                }
              
            }
        }
        return false;

}

// 根据当前设置屏蔽/显示所有内容
function applySettings()
{
	// 处理非动态载入内容
	var feeds = document.getElementsByClassName('feed_list');
	for (var i=0; i<feeds.length; ++i) hideFeed(feeds[i]);


	// 屏蔽版面内容
	for (var i in $blocks)
	{
		var isBlocked = (GM_getValue($uid+'.block'+$blocks[i][0], 'false') == 'true');
		if ($blocks[i].length == 2)
		{
			if (typeof $blocks[i][1] == "string")
			{
				var block = document.getElementById($blocks[i][1]);
				if (block != null) block.style.display = isBlocked?'none':'';
			} else { // 数组
				for (var j in $blocks[i][1]) 
				{
					var block = document.getElementById($blocks[i][1][j]);
					if (block != null) block.style.display = isBlocked?'none':'';
				}
			}
			continue;
		}
		// 单独处理广告
		if ($blocks[i][0] == 'Ads')
		{
			var sideBar = document.getElementsByClassName('W_main_r')[0];
			for (var j in sideBar.children)
			{
				var elem = sideBar.children[j];
				if (elem.tagName=='DIV' && (elem.id.indexOf('ads_')==0 || elem.hasAttribute('ad-data')))
					elem.style.display = isBlocked?'none':'';
			}
		}
		// 单独处理推荐话题
		else if ($blocks[i][0] == 'RecommendedTopic')
		{
			var recommendedTopic = document.getElementsByClassName('key')[0];
			if (recommendedTopic!=null && recommendedTopic.parentNode.classList.contains('send_weibo'))
			{
				recommendedTopic.style.display = isBlocked?'none':'';
			}
		}
		// 单独处理勋章
		else if ($blocks[i][0] == 'Medal')
		{
			// 传统版
			var medalList = document.getElementById('pl_content_medal');
			if (medalList != null)
				medalList.style.display = isBlocked?'none':'';
			else // 体验版
			{
				var medalList = document.getElementsByClassName('declist')[0];
				if (medalList != null) medalList.style.display = isBlocked?'none':'';
			}
		}
	}
        if($noLimitScanFlag==true)
        {
            GotoNextPage();
         }else
        {
            unGotoNextPage();
        }
        
}

function reloadSettings()
{
	document.getElementById('wbpWhiteKeywords').value = GM_getValue($uid+'.whiteKeywords', '');
	document.getElementById('wbpHideKeywords').value = GM_getValue($uid+'.hideKeywords', '');
	document.getElementById('wbpCensoredKeywords').value = GM_getValue($uid+'.censoredKeywords', '');
	//document.getElementById('wbpFirstTab').value=GM_getValue($uid+'.firstTab','');
	var tipBackColor = GM_getValue($uid+'.tipBackColor', '#FFD0D0');
	var tipTextColor = GM_getValue($uid+'.tipTextColor', '#FF8080');
	document.getElementById('wbpTipBackColor').value = tipBackColor;
	document.getElementById('wbpTipTextColor').value = tipTextColor;
	var tipSample = document.getElementById('wbpTipSample');
	tipSample.style.backgroundColor = tipBackColor;
	tipSample.style.borderColor = tipTextColor;
	tipSample.style.color = tipTextColor;
	for (var i in $blocks)
	{
		if (GM_getValue($uid+'.block'+$blocks[i][0], 'false') == 'true')
			document.getElementById('wbpBlock'+$blocks[i][0]).checked = true;
	}
        var firstTab=GM_getValue($uid+'.firstTab','');
	if(firstTab == '')
	{
	    return;
	}
	for(var i=0;i<$tabValues.length;i++)
	{
	    if(document.getElementById('wbpTabRadio'+i).parentNode.innerText.trim() == firstTab)
	    {
	        document.getElementById('wbpTabRadio'+i).checked = true;
	        break;
	    }
	}
        if (GM_getValue($uid+'.noLimitScan', 'false') == 'true')
        {
                $noLimitScanFlag=true;
		document.getElementById('wbpNolimitScan').checked = true;
        }else
        {
                $noLimitScanFlag=false;
        }


}

function loadSettingsWindow()
{
	$uid = getGlobalVar('$CONFIG.uid');
	
	// 加入选项设置
	var keywordBack = document.createElement('div');
	keywordBack.id = 'wbpSettingsBack';
	keywordBack.style.display = 'none';
	var keywordBlock = document.createElement('div');
	keywordBlock.className = 'W_layer';
	keywordBlock.id = 'wbpSettings';
	keywordBlock.style.cssText = 'width: 500px; margin-left: -250px; z-index: 10001; position: absolute; display: none;';
	keywordBlock.innerHTML = '<div class="bg"> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tbody> <tr> <td> <div class="content"> <div class="title" node-type="title"> <span id="wbpSettingsTitle" node-type="title_content">“安娜”(v0.1)设置</span> </div> <a href="javascript:void(0);" class="W_close" title="关闭" id="wbpCloseBtn"></a> <div node-type="inner" class="detail layer_forward" style="width: auto; padding-bottom: 20px;"> <div class="clearfix" style="margin-top: 15px;"> <div style="float: left;"> 新浪微博<span style="color: red;">非官方</span>功能增强脚本。 </div> <div style="float: right; display: inline; position: relative;"> <a id="wbpCheckUpdate" href="javascript:void(0);" title="检查脚本是否有新版本">检查更新</a> <em class="W_vline" style="margin: 0 8px">|</em> <a id="wbpUpdate" href="http://userscripts.org/scripts/show/114087" title="脚本新版本在此页面发布" target="_blank">脚本帮助</a> <em class="W_vline" style="margin: 0 8px">|</em> <a href="/salviati" title="欢迎私信、评论或@作者提出脚本建议">联系作者</a> </div> </div> <div node-type="forward_tab" class="tab tab_bottom tab_forward W_texta"><a id="wbpTabHeader1" href="javascript:void(0);" class="current W_texta" order="1">屏蔽关键词</a> <em class="W_vline">|</em> <a id="wbpTabHeader2" href="javascript:void(0);" order="2" class="">屏蔽用户</a> <em class="W_vline">|</em> <a id="wbpTabHeader3" href="javascript:void(0);" order="3" class="">屏蔽版面内容</a> <em class="W_vline">|</em> <a id="wbpTabHeader4" href="javascript:void(0);" order="4" class="">首选tab</a><em class="W_vline">|</em><a id="wbpTabHeader5" href="javascript:void(0);" order="5" class="">浏览选项</a> </div> <div style="margin-top: 15px;"> <div id="wbpTab1" style=""> <p>多个关键词用半角分号（“;”）隔开；不要使用多余的空格；大小写敏感。</p> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height: 30px; margin-top: 15px;"> <tbody> <tr> <td style="width: 75px;">白名单：</td> <td> <div style="border: 1px solid #D2D5D8; padding: 0 2px;"> <input style="width: 100%; height: 22px; border: 0; padding: 0; margin: 0; display: block;" type="text" id="wbpWhiteKeywords" class="input" placeholder="包含这些关键词的微博不会被隐藏或屏蔽"> </div> </td> </tr> <tr> <td style="width: 75px;">隐藏关键词：</td> <td> <div style="border: 1px solid #D2D5D8; padding: 0 2px;"> <input style="width: 100%; height: 22px; border: 0; padding: 0; margin: 0; display: block;" type="text" id="wbpHideKeywords" class="input" placeholder="包含这些关键词的微博将被隐藏（无提示）"></div></td></tr><tr><td style="width: 75px;">屏蔽关键词： </td> <td> <div style="border: 1px solid #D2D5D8; padding: 0 2px;"> <input style="width: 100%; height: 22px; border: 0; padding: 0; margin: 0; display: block;" type="text" id="wbpCensoredKeywords" class="input" placeholder="包含这些关键词的微博将被屏蔽（有提示）"> </div> </td> </tr> </tbody> </table> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height: 30px; margin-top: 5px;"> <tbody> <tr> <td style="width: 110px;">屏蔽提示背景颜色：</td> <td> <div style="border: 1px solid #D2D5D8; padding: 0 2px;"> <input style="width: 100%; height: 22px; border: 0; padding: 0; margin: 0; display: block;" type="text" id="wbpTipBackColor" class="input"> </div> </td> <td style="width: 15px;"></td> <td style="width: 110px;">屏蔽提示文字颜色：</td> <td> <div style="border: 1px solid #D2D5D8; padding: 0 2px;"> <input style="width: 100%; height: 22px; border: 0; padding: 0; margin: 0; display: block;" type="text" id="wbpTipTextColor" class="input"> </div> </td> </tr> </tbody> </table> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height: 30px; margin-top: 5px;"> <tbody> <tr> <td style="width: 40px;">示例：</td> <td><div id="wbpTipSample" style="border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; height: 23px; line-height: 23px; text-align: center; background-color: rgb(255, 208, 208); border-top-color: rgb(255, 128, 128); border-right-color: rgb(255, 128, 128); border-bottom-color: rgb(255, 128, 128); border-left-color: rgb(255, 128, 128); color: rgb(255, 128, 128); ">本条来自<a href="javascript:void(0);">@某人</a>的微博因包含关键词“<a href="javascript:void(0);">XXXX</a>”而被隐藏，点击显示</div> </td> </tr> </tbody> </table> </div> </div> <div id="wbpTab2" style="display: none; "> <p>新浪微博官方已提供针对指定用户的屏蔽功能，而且在移动客户端上有效。</p> <p style="margin-top: 20px;">请点击<a href="/settings/myfeed">此处</a>进行设置。</p> </div> <div id="wbpTab3" style="display: none; "> <p>请选择要屏蔽的内容。</p> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height: 24px; margin-top: 15px;"> <tbody> <tr> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockAds"><label for="wbpBlockAds">右边栏广告</label></td> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockBottomAds"><label for="wbpBlockBottomAds">底栏广告</label></td> </tr> <tr> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockPullyList"><label for="wbpBlockPullyList">微博看点（顶栏广告）</label></td> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockRecommendedTopic"><label for="wbpBlockRecommendedTopic">推荐微话题</label></td> </tr> <tr> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockTasks"><label for="wbpBlockTasks">微博任务（微博宝典）</label></td> </tr> <tr> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockMood"><label for="wbpBlockMood">心情</label></td> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockMedal"><label for="wbpBlockMedal">勋章</label></td> </tr> <tr> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockFun"><label for="wbpBlockFun">玩转微博</label></td> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockTopic"><label for="wbpBlockTopic">热门话题</label></td> </tr> <tr> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockInterestUser"><label for="wbpBlockInterestUser">可能感兴趣的人</label></td> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockPopularUser"><label for="wbpBlockPopularUser">人气用户推荐</label></td> </tr> <tr> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockInterestGroup"><label for="wbpBlockInterestGroup">可能感兴趣的微群</label></td> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockInterestApp"><label for="wbpBlockInterestApp">可能感兴趣的应用/活动</label></td> </tr> <tr> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockNotice"><label for="wbpBlockNotice">公告栏</label></td> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockHelpFeedback"><label for="wbpBlockHelpFeedback">帮助/意见反馈</label></td> </tr> <tr> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockGame"><label for="wbpBlockGame">游戏（体验版左边栏）</label></td> <td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpBlockApp"><label for="wbpBlockApp">应用（体验版左边栏）</label></td> </tr> </tbody> </table> </div> <div id="wbpTab4" style="display: none; "> <p>请选择要设置首选项的tab（注意：此设置的作用范围是在刚进入微博首页时迅速切换，其余时间不起作用。设置后下一次进入微博首页可以见到效果）</p> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height: 30px; margin-top: 15px;"> <tbody> <tr> <td style="width: 75px;">首选tab：</td> <td> <div style="border: 1px solid #D2D5D8; padding: 0 2px;"> <input style="width: 100%; height: 22px; border: 0; padding: 0; margin: 0; display: block;" type="text" id="wbpFirstTab" class="input" placeholder="将从全部标签切换到首选tab"> </div> </td> </tr> </tbody> </table> </div><div id="wbpTab5" style="display:none;"><p>设置将去除微博的10页浏览限制(对于关键字查询无效)</p> <table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height: 30px; margin-top: 15px;"><tbody><tr><td><input style="vertical-align: middle; margin-right: 5px;" type="checkbox" id="wbpNolimitScan"><label for="wbpNolimitScan">无限制浏览</label></td></tr></tbody></table></div> <p class="btn"> <a href="javascript:void(0);" class="W_btn_b" id="wbpOKBtn"><span>确定</span></a> <a href="javascript:void(0);" class="W_btn_a" id="wbpCancelBtn"><span>取消</span></a> </p> </div> </div> </td> </tr> </tbody> </table> </div> ';
	document.body.appendChild(keywordBack);
	document.body.appendChild(keywordBlock);
	document.getElementById('wbpSettingsTitle').innerHTML = '“安娜”(v'+$version+')设置';
	document.getElementById('wbpTipBackColor').addEventListener('blur', function () 
	{
		document.getElementById('wbpTipSample').style.backgroundColor = this.value;
	}, false);
	document.getElementById('wbpTipTextColor').addEventListener('blur', function () 
	{
		document.getElementById('wbpTipSample').style.borderColor = this.value;
		document.getElementById('wbpTipSample').style.color = this.value;
	}, false);
	for (var i=1; i<=5; i++)
	{
		document.getElementById('wbpTabHeader'+i).setAttribute('order', i);
		document.getElementById('wbpTabHeader'+i).addEventListener('click', function () {
			i = this.getAttribute('order');
			for (var j=1; j<=5; j++)
			{
				if (i == j)
				{
					document.getElementById('wbpTabHeader'+j).className = 'current W_texta';
					document.getElementById('wbpTab'+j).style.display = '';
				} else {
					document.getElementById('wbpTabHeader'+j).className = '';
					document.getElementById('wbpTab'+j).style.display = 'none';
				}
			}
		}, false);
	}
	$blocks = Array(
		Array('Fun', 'pl_common_fun'),
		Array('Topic', 'pl_content_promotetopic'),
		Array('InterestUser', 'pl_content_homeInterest'),
		Array('PopularUser', 'pl_relation_recommendPopularUsers'),
		Array('InterestGroup', 'pl_content_interestgroup'),
		Array('InterestApp', 'pl_content_allInOne'),
		Array('Notice', 'pl_common_noticeboard'),
		Array('HelpFeedback', Array('pl_common_help', 'pl_common_feedback')),
		Array('Ads'),
		Array('BottomAds', 'ads_bottom_1'),
		Array('PullyList', 'pl_content_pullylist'),
		Array('RecommendedTopic'),
		Array('Mood', 'pl_content_mood'),
		Array('Medal'),
		Array('Game', 'pl_leftNav_game'),
		Array('App', 'pl_leftNav_app'),
		Array('Tasks', 'pl_content_tasks')
		);
	document.getElementById('wbpOKBtn').addEventListener('click', function () 
	{
               
		GM_setValue($uid+'.whiteKeywords', document.getElementById('wbpWhiteKeywords').value);
		GM_setValue($uid+'.censoredKeywords', document.getElementById('wbpCensoredKeywords').value);
		GM_setValue($uid+'.hideKeywords', document.getElementById('wbpHideKeywords').value);
		GM_setValue($uid+'.tipBackColor', document.getElementById('wbpTipBackColor').value);
		GM_setValue($uid+'.tipTextColor', document.getElementById('wbpTipTextColor').value);
                GM_setValue($uid+'.noLimitScan', document.getElementById('wbpNolimitScan').checked);
                $noLimitScanFlag= document.getElementById('wbpNolimitScan').checked;
		//GM_setValue($uid+'.firstTab',document.getElementById('wbpFirstTab').value);
		for (var i in $blocks)
		{
			GM_setValue($uid+'.block'+$blocks[i][0], document.getElementById('wbpBlock'+$blocks[i][0]).checked);
		}
                for(var i=0;i<$tabValues.length;i++)
                {
                        if(document.getElementById('wbpTabRadio'+i).checked){
                              GM_setValue($uid+'.firstTab',document.getElementById('wbpTabRadio'+i).parentNode.innerText.trim());
                        }
                }
		document.getElementById('wbpSettingsBack').style.display = 'none';
		document.getElementById('wbpSettings').style.display = 'none';
		applySettings();
	}, false);
	document.getElementById('wbpCancelBtn').addEventListener('click', function ()
	{
		reloadSettings();
		document.getElementById('wbpSettingsBack').style.display = 'none';
		document.getElementById('wbpSettings').style.display = 'none';		
	}, false);
	document.getElementById('wbpCloseBtn').addEventListener('click', function ()
	{
		reloadSettings();
		document.getElementById('wbpSettingsBack').style.display = 'none';
		document.getElementById('wbpSettings').style.display = 'none';		
	}, false);

	
	document.getElementById('wbpCheckUpdate').addEventListener('click', checkUpdate, false);
}

function isHomePage()
{
	if (document.title.indexOf('我的首页 ')==0 || document.title.indexOf('我的首頁 ')==0)
		return true;
	// 仅在个人首页有微博发布栏，可作为附加判据
	return (document.getElementById('pl_content_publisherTop') != null);
}

if (isHomePage())
{
        $noLimitScanFlag=false;
        //初始化firstTab可选项
        initFirstTab();
	loadSettingsWindow();
        //构建待选项
        createFirstTab();
        reloadSettings();
	showSettingsBtn();
        //处理切换从全部切换到首选tab
	switchToFirstTab(); 
	applySettings();
}

// 处理动态载入内容
document.addEventListener('DOMNodeInserted', onDOMNodeInsertion, false);
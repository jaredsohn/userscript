
// ==UserScript==
// @name 			weiboFilter（新浪微博过滤插件）
// @namespace		http://userscripts.org/users/432850
// @description		weiboFilter
// @match			http://weibo.com/*
// @match			http://www.weibo.com/*
// @version 		0.6
// @updateURL     https://userscripts.org/scripts/source/124330.user.js
// ==/UserScript==

/*
@author yaohuah http://www.weibo.com/yaohuah
You can distribute and modify this script at your free will.

感谢前人的界面：@富平侯，http://weibo.com/salviati 

CHANGELOG
0.1 initial version
0.2 
   * use hide() instead of remove() to speed up removing 加速
   * filter forwarded weibo as well 可以过滤转发的微博
0.3
   * change the name and namespace of this script 更改了该脚本的namespace和名称（注意，需要删除以前版本再装该版本，否则不会覆盖）
   * Enable filter to newly generated weibo 对新增微博的过滤
   * 把“有n条新微博”改成“有n条新的微博”，以示插件正常工作
0.4
   * 增加了UI，提供过滤关键字的设定界面
   * 增加了定时过滤的功能
0.5
   * 小bug紧急修复
0.6 
   * 增加对微博分组的过滤（如相互关注，悄悄关注，特别关注等） - 2012/1/31

@TODO 下拉新微博的过滤；分页微博的过滤，

*/

$prefix = "yaohuah_weibofilter";


// from mozilla's recommendation
if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", new (function () {
    var aKeys = [], oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function (sKey) { return sKey ? this[sKey] : null; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function (nKeyId) { return aKeys[nKeyId]; },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function (sKey, sValue) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function () { return aKeys.length; },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function (sKey) {
        if(!sKey) { return; }
        var sExpDate = new Date();
        sExpDate.setDate(sExpDate.getDate() - 1);
        document.cookie = escape(sKey) + "=; expires=" + sExpDate.toGMTString() + "; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get =function() {
      var iThisIndx;
      for (var sKey in oStorage) {
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
        else { aKeys.splice(iThisIndx, 1); }
        delete oStorage[sKey];
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
      for (var iCouple, iKey, iCouplId = 0, aCouples = document.cookie.split(/\s*;\s*/); iCouplId < aCouples.length; iCouplId++) {
        iCouple = aCouples[iCouplId].split(/\s*=\s*/);
        if (iCouple.length > 1) {
          oStorage[iKey = unescape(iCouple[0])] = unescape(iCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  })());
}

//-----------------执行环境兼容----------------------

function injectFunc(f)
{
	var cb = document.createElement("script");
	cb.type = "text/javascript";
	cb.textContent="" + f+";";
	document.head.appendChild(cb);	
}

function withJQuery(callback) {
	var cb = document.createElement("script");
	cb.type = "text/javascript";
	cb.textContent = buildCallbackWithJQuery(callback);

	document.head.appendChild(cb);	
	
}

function buildCallbackWithJQuery(callback) {
	var content = "window.__cb=" + callback + ";\r\n\
	if(typeof(jQuery)!='undefined')window.__cb();\r\n\
	else{\
		var script=document.createElement('script');\r\nscript.src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';\r\n\
		script.type='text/javascript';\r\n\
		script.addEventListener('load', window.__cb);\r\n\
		document.head.appendChild(script);\r\n\
	}";
	
	
	return content;
}



function entryPoint() {

	var location = window.location;
	var path = location.pathname;

  
	if( true )
	{
	  injectFunc(FilterConfig);
	  injectFunc(filterWeibo);
	  injectFunc(lazyFilter);
	  
		withJQuery(filterWeibo);
	}
	else
	{
//		alert("path is " +path);
	}
	
}


	function lazyFilter()
	{
	  setTimeout(filterWeibo,2000);
	};
	
	
	function filterWeibo()
	{
		function getStoredValue(a,b)
		{
			 var v = localStorage.getItem(a);
			 if(v)
			 {
			 	return v;
			 }
			return b;
		}

    $("ul[node-type=feedGroup] li[action-type]").each(
       function(index)
       {
       	 $(this).bind('click', lazyFilter, false);
       }
    );

    $("li[node-type=feed_group_tab]").each(
       function(index)
       {
       	 $(this).bind('click', lazyFilter, false);
       }    
    )
	  var d = STK.common.feed.feedList.feedTemps;
	  var b = STK.kit.extra.language;
	  
	  d.newFeedTipHTML = b('<a action-type="feed_list_newBar" onclick="lazyFilter()" class="notes" href="">#L{有} [n] #L{条新的微博}，#L{点击查看}</a>');
		
		$prefix = "yaohuah_weibofilter";
		var filterList = getStoredValue($prefix+'.vFilterKeywords', '').split(",");
		var vStartTime = getStoredValue($prefix+'.vStartTime', '00:00:01');
		var vEndTime = getStoredValue($prefix+'.vEndTime', '23:59:58');
		
		
		var needFilter = true;
		var curDate=new Date();

    
		var startArray = vStartTime.split(":");
		
		if(startArray.length ==3 && !(isNaN(startArray[0]) || isNaN(startArray[1]) || isNaN(startArray[2])))
		{
			var diff = (curDate.getHours() - startArray[0] ) *60*60 + (curDate.getMinutes() - startArray[1] )*60 +(curDate.getSeconds() - startArray[2] );
			if(diff>0)
			{
				needFilter = true;
			}
			else
			{
				needFilter = false;
			}
			//alert("begin diff =" + diff);
		}
		
		var endArray = vEndTime.split(":");
		
		if(endArray.length ==3 && needFilter && !(isNaN(endArray[0]) || isNaN(endArray[1]) || isNaN(endArray[2]) ))
		{
			var diff = (curDate.getHours() - endArray[0] ) *60*60 + (curDate.getMinutes() - endArray[1] )*60 +(curDate.getSeconds() - endArray[2] );
			if(diff<0)
			{
				needFilter = true;
			}
			else
			{
				needFilter = false;
			}
			//alert("end diff =" + diff);
		}
		
		if(!needFilter)
		{
			$("#wbpShowConfig").html("【过滤设置v0.6】 - 目前不在过滤设定时间范围内");
			return false;
		}

		var filterCnt=0;
		$(".feed_list").each(
		  function(index)
		  {
		  	var w = $(this).find(".content");
		  	var c = $(this).find(".comment");
	
		  	for(var i=0;i<filterList.length;i++)
		  	{
		  		if($.trim(filterList[i])=="")
		  		{
		  			continue;
		  		}
			  	if( w.html().indexOf(filterList[i])!=-1 
			  	    ||(c.html() && c.html().indexOf(filterList[i])!=-1 )
			  	)
			  	{
			  		$(this).hide();
			  		filterCnt++;
			  		break;
			  	}
		  	}
		  }
		);
		$("#wbpShowConfig").html("【过滤设置v0.6】 - 本次过滤了 <em>"+filterCnt +"</em> 条微博 ");
	}
	
	
	
function FilterConfig()
{

	function showConfigBtn()
	{
		var showConfigTab = document.createElement('li');
		showConfigTab.innerHTML = '<a id="wbpShowConfig" href="javascript:void(0)"> 【过滤设置v0.6】</a>';
	
		var pos = document.getElementsByClassName('nfTagB_group')[0].parentNode;
		if(pos.firstChild)
		{
			pos.insertBefore(showConfigTab,pos.firstChild);
		}
		else
		{
		  pos.appendChild(showConfigTab);
	  }
		
		document.getElementById('wbpShowConfig').addEventListener('click', showConfig, false);
	}
	
		
	function getStoredValue(a,b)
	{
		 var v = localStorage.getItem(a);
		 if(v)
		 {
		 	return v;
		 }
		return b;
	}
	
	
	function setStoredValue(k,v)
	{
		localStorage.setItem(k,v);
	}
	
	function reloadConfig()
	{
		
		// 加入选项设置
		var configBackground = document.createElement('div');
		configBackground.id = 'wFilterConfigBack';
		configBackground.style.display = 'none';
		var configDiv = document.createElement('div');
		configDiv.className = 'W_layer';
		configDiv.id = 'wFilterConfig';
		configDiv.style.cssText = 'width: 500px; margin-left: 10px; z-index: 10001; position: absolute; display: none;';
		configDiv.innerHTML = '<div class="bg"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td><div class="content"><div class="title" node-type="title"><span id="wFilterConfigTitle" node-type="title_content">WeiboFilter微博过滤器(v0.6)</span></div><a href="javascript:void(0);" class="W_close" title="关闭" id="wbpSaveConfig"></a><div node-type="inner" class="detail layer_forward" style="width: auto; padding-bottom: 20px;"><div class="clearfix" style="margin-top: 15px;"><div style="float: left;"> 新浪微博关键字过滤小工具。</div><div style="float: right; display: inline; position: relative;"><a id="wbpUpdate" href="http://userscripts.org/scripts/show/124330" title="脚本永久地址" target="_blank">脚本永久地址</a><em class="W_vline" style="margin: 0 8px">|</em><a href="/yaohuah" title="欢迎提出建议">联系作者</a></div></div><div style="margin-top: 15px;"><p>您要屏蔽的关键词,多个关键词请使用半角逗号（“,”）隔开</p><table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height: 30px; margin-top: 15px;"><tbody><tr><td style="width: 75px;">关键词列表：</td><td><div style="border: 1px solid #D2D5D8; padding: 0 2px;"><input style="width: 100%; height: 22px; border: 0; padding: 0; margin: 0; display: block;" type="text" id="wfFilterKeywords" class="input" placeholder="包含这些关键词的微博将被过滤掉"></div></td></tr></tbody></table><table width="100%" border="0" cellspacing="0" cellpadding="0" style="line-height: 30px; margin-top: 15px;"><tbody><tr><td  colspan="4"> 屏蔽时间（格式为时:分:秒 HH:MM:SS ），在指定时间内才屏蔽微博，指定时间外则不屏蔽。一般用于暂时过滤一些名人访谈的刷屏现象</td></tr><tr><td style="width: 110px;">开始时间</td><td><div style="border: 1px solid #D2D5D8; padding: 0 2px;"><input style="width: 100%; height: 22px; border: 0; padding: 0; margin: 0; display: block;" type="text" id="wfStartTime" class="input" placeholder="00:00:00"></div></td><td style="width: 15px;"></td><td style="width: 110px;">截止时间</td><td><div style="border: 1px solid #D2D5D8; padding: 0 2px;"><input style="width: 100%; height: 22px; border: 0; padding: 0; margin: 0; display: block;" type="text" id="wfEndTime" class="input" placeholder="23:59:59"></div></td></tr></tbody></table></div></div></div></td></tr></tbody></table></div>';
		document.body.appendChild(configBackground);
		document.body.appendChild(configDiv);
		document.getElementById('wFilterConfigTitle').innerHTML = '微博过滤设置(v0.6)';
		
		var vStartTime = getStoredValue($prefix+'.vStartTime', '00:00:01');
		var vEndTime = getStoredValue($prefix+'.vEndTime', '23:59:58');
		var vFilterKeywords = getStoredValue($prefix+'.vFilterKeywords', '方舟子,韩寒');
		
		document.getElementById('wfStartTime').value = vStartTime;
		document.getElementById('wfEndTime').value = vEndTime;
		document.getElementById('wfFilterKeywords').value = vFilterKeywords;
	
		document.getElementById('wbpSaveConfig').addEventListener('click', function () 
		{
			setStoredValue($prefix+'.vStartTime', document.getElementById('wfStartTime').value);
			setStoredValue($prefix+'.vEndTime', document.getElementById('wfEndTime').value);
			setStoredValue($prefix+'.vFilterKeywords', document.getElementById('wfFilterKeywords').value);
			
			document.getElementById('wFilterConfigBack').style.display = 'none';
			document.getElementById('wFilterConfig').style.display = 'none';
			withJQuery(filterWeibo);
		}, false);
	
	}


	function showConfig(event)
	{
		document.getElementById('wFilterConfigBack').style.cssText = 'background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: black; opacity: 0.3; position: fixed; top: 0px; left: 0px; z-index: 10001; width: '+window.innerWidth+'px; height: '+window.innerHeight+'px;';
		var block = document.getElementById('wFilterConfig');
		var left = document.body.scrollLeft==0?document.documentElement.scrollLeft:document.body.scrollLeft;
		var top = document.body.scrollTop==0?document.documentElement.scrollTop:document.body.scrollTop;
		block.style.left = (left+event.clientX)+'px';
		block.style.top = (top+event.clientY+10)+'px';
		block.style.display = '';
	}
	
	reloadConfig();
	showConfigBtn();
}

FilterConfig();

entryPoint();

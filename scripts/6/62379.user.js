// ==UserScript==
// @name           siteToolsV1
// @namespace  http://www.junstyle.com.cn
// @include        http://*
// @exclude        http://*.google.*/*
// @exclude        http://localhost*/*
// @exclude        http://*.baidu.com/*
// @exclude        http://*.sogou.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// Author：		junstyle
// Blog：		http://www.junstyle.com.cn


//防止与当前网站用的库的$重复
window._$=jQuery;

var se_shoulu_link_config={
	"1day":["http://www.baidu.com/s?q2=&q3=&q4=&rn=100&lm=1&ct=0&ft=&q5=&q6=&tn=baiduadv&q1=site%3A", "百度一下，找到相关网页", "篇", "抱歉，没有找到", null, "http://www.baidu.com/s?q2=&q3=&q4=&rn=100&lm=7&ct=0&ft=&q5=&q6=&tn=baiduadv&q1=site%3A", "百度一下，找到相关网页", "篇", "抱歉，没有找到", null],
	"百度":["http://www.baidu.com/s?wd=site%3A", "百度一下，找到相关网页", "篇", "抱歉，没有找到", null, "http://www.baidu.com/s?wd=domain%3A", "百度一下，找到相关网页", "篇", "抱歉，没有找到", null],
	"谷歌":["http://www.google.cn/search?hl=zh-CN&q=site%3A", "</b> 获得约 <b>", "</b>", "找不到和您的查询", null, "http://www.google.cn/search?hl=zh-CN&q=link%3A", "获得约 <b>", "</b>", "找不到和您的查询", null],
	"雅虎":["http://sitemap.cn.yahoo.com/search?bwm=p&p=", "被收录的网页： 共 <strong>", "</strong>", "对不起， 你的请求不能正确处理", null, "http://sitemap.cn.yahoo.com/search?bwm=i&p=", "链向该地址的网页： 共 <strong>", "</strong>", "对不起， 你的请求不能正确处理", null],
	"搜狗":["http://www.sogou.com/web?query=site%3A", "<span>找到", " <!--resultbarnum", "<div class=\"no-result\">没有找到", function(ret){return _$.trim(ret);}, "http://www.sogou.com/web?query=link%3A", "<span>找到", " <!--resultbarnum", "<div class=\"no-result\">没有找到", null],
	"搜搜":["http://www.soso.com/q?w=site%3A", "<div class=\"n_r\">", "</div>", "<font color=#DA3145>", function(ret){return _$.trim(ret.replace(/[^\d\.]/ig, "")).split("0.")[0];}, "http://www.soso.com/q?w=link%3A", "<div class=\"n_r\">", "</div>", "<font color=#DA3145>", function(ret){return _$.trim(ret.replace(/[^\d\.]/ig, "")).split("0.")[0];}],
	"有道":["http://www.youdao.com/search?q=site%3A", " -->\r\n<B>", "</B>", "抱歉，没有找到与", function(ret){if(ret.indexOf("万")>0){var tmp=ret.split('万'); return tmp[0]*10000+(tmp[1].length>0?parseInt(tmp[1]):0);} return ret;}, "http://www.youdao.com/search?q=link%3A", " -->\r\n<B>", "</B>", "抱歉，没有找到与", function(ret){if(ret.indexOf("万")>0){var tmp=ret.split('万'); return tmp[0]*10000+(tmp[1].length>0?parseInt(tmp[1]):0);} return ret;}],
	"必应":["http://cn.bing.com/search?q=site%3A", " 条结果，共 ", " 条</span>", "no_results\"><h1>找不到包含 <strong>site:", null, "http://cn.bing.com/search?q=link%3A", " 条结果，共 ", " 条</span>", "no_results\"><h1>找不到包含 <strong>site:", null]
};

window.get_part=function(url, start, end, notExistStr, obj, dealFun, cb){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			html = responseDetails.responseText;
			if( url.indexOf("http://www.sogou.com/web?query=link%3A")>-1 && html.indexOf('<form name="authform" method="POST" action="thank.php">')>-1 ){
				obj.html("<a href=\""+url+"\" target=\"_blank\">点击输入验证码</a>");
			}else{
				var part = getMiddleStr( html, start, end ).trim().replace(/\,/ig, "").replace("约", "");
				if( dealFun ) part = dealFun(part);
				if( part == null || part.length == 0 || html.indexOf( notExistStr ) > -1 ) part = "<font color='#aaaaaa'>无</font>";
				if( obj != null )
					obj.html("<a href=\""+url+"\" target=\"_blank\">"+part+"</a>");	
				if( cb ) cb( part );
			}
		}
	});
};

window.getMiddleStr=function(sourceStr, startStr, endStr){
	var middleStr = sourceStr;
	if( middleStr.indexOf( startStr ) > -1 )
	{
		middleStr = middleStr.substring( middleStr.indexOf( startStr ) + startStr.length );
		if( middleStr.indexOf( endStr ) > -1 )
			middleStr = middleStr.substring( 0, middleStr.indexOf( endStr ) );
	}
	if( middleStr == sourceStr )
		return "";
	else
		return middleStr;
};

if(window.top==window){
	_$("head").append("<style>#sl_wrapper{-moz-border-radius:7px; color:#FFFF00; position:absolute; top:10px; right:10px; font-size:12px; margin:0px; background:#333; line-height:22px; overflow:hidden;font-size:12px; font-family:verdana; text-align:left !important; z-index:100; width:auto;} #sl_wrapper_inner{margin:5px 6px 5px 8px;} #sl_wrapper a{color:#fff; font-style:normal; margin:auto 3px; text-decoration:none; background:#333;} #sl_wrapper *{color:#FFFF00; padding:0px; border:0px; background:#333;} #sl_wrapper.off{*filter:alpha(opacity=50) !important; -moz-opacity:0.5; opacity:0.5;} #sl_wrapper.on{filter:alpha(opacity=100); -moz-opacity:1; opacity:1; color:#FFFF00;} #sl_info{position:absolute; right:3px; top:0px;} a#sl_info{color:red; font-weight:bold;} .block_div a{text-decoration:none;}</style>");

	var se_html="<div id='sl_wrapper' class='off'><a href='javascript:void(0);' id='sl_info' title='检查更新'>?</a><div id='sl_wrapper_inner'>";
	for(key in se_shoulu_link_config){
		se_html+=key+" <i id='domain_"+key+"'>..</i>/<i id='link_"+key+"'>..</i><br />";
	}
	se_html+="ＰＲ <i id='site_pr'>..</i> Alexa <i id='site_alexa'>..</i></div></div>";
	_$("body").append(se_html);

	for(key in se_shoulu_link_config){
		var arr=se_shoulu_link_config[key];
		get_part( arr[0]+window.location.host,arr[1], arr[2], arr[3], _$("#domain_"+key), arr[4]);
		get_part( arr[5]+window.location.host,arr[6], arr[7], arr[8], _$("#link_"+key), arr[9]);
	}
	get_part( "http://www.linkhelper.cn/getpr.asp?queryurl="+window.location.host, "<img src='http://www.linkhelper.cn/pagerank", ".", 'alert("'+window.location.host, $("#site_pr"), function(ret){ret=ret.replace('_yes', ''); if(ret.indexOf('no')>-1){ret="<span style='color:red;' title='假PR'>"+ret.replace("_no","")+"</span>";}else{ret=ret.replace("_no","");} return ret;});
	get_part("http://www.alexa.com/siteinfo/"+window.location.host, "style=\"margin-bottom:-2px;\"/> ", "</a></div>", window.location.host+"该网址错误", $("#site_alexa"), function(ret){return ret.replace("up\">", "").replace("down\">", "").replace('steady">', "");});

	_$("#sl_wrapper").hover(function(){this.className="on";},function(){this.className="off";}).dblclick(function(){
		_$(this).slideUp();
	});

	var sl_info_html='<div class="block_div" style="background:#888; opacity:0.5; position:absolute; left:0px; top:0px; width:'+_$("body")[0].offsetWidth+'px; height:'+Math.max(_$("body")[0].offsetHeight, _$("html")[0].offsetHeight)+'px; z-index:1111110"></div><div class="block_div" style="-moz-border-radius:7px; opacity:0.5; position:absolute; left:'+(_$("html")[0].clientWidth-400)/2+'px; top:'+(_$("html")[0].clientHeight-180)/2+'px; width:370px; height:150px; background:#000; padding:10px; z-index:1111111;"></div><div style="background:#fff; opacity:1; z-index:1111111; position:absolute; left:'+(_$("html")[0].clientWidth-380)/2+'px; top:'+(_$("html")[0].clientHeight-160)/2+'px; width:350px; height:130px; padding:10px;" class="block_div"><div style="font-size:16px;" id="sl_check_version">检查更新中....</div><div style="padding-top:15px; color:#888; font-size:12px;">安装新版本会删除GM里此脚本的过滤设置，特别提示！<br />脚本作者：junstyle <a href="http://www.junstyle.com.cn/post/gmscript-se-shoulu-link.html">给我留言</a><br />脚本地址：<a href="http://userscripts.org/scripts/show/56095" target="_blank">http://userscripts.org/scripts/show/56095</a><br />个人博客：<a href="http://www.junstyle.com.cn" target="_blank">http://www.junstyle.com.cn</a></div><a href="javascript:void(0);" id="sl_info_close" style="position:absolute; right:10px; top:5px; font-size:12px;">关闭</a></div></div>';

	_$("#sl_info").click(function(){
		_$("object").toggle();
		_$("body").append(sl_info_html);
		_$("#sl_info_close").click(function(){_$('.block_div').remove(); _$("object").toggle();});
		window.get_part(
			"http://userscripts.org/scripts/versions/56095?"+Math.random(), 
			"<ul style='list-style: none'>", 
			"[", 
			"无此字符", 
			_$("#sl_check_version"), 
			function(ret){return ret.replace('<li>', '');}, 
			function(){
				var s=_$.trim(_$("#sl_check_version").text());
				if( GM_getValue('last_version')!=undefined && new Date(GM_getValue('last_version'))<new Date(s) ){
					_$("#sl_check_version").html("<span style='color:red'>有新版本</span>，<a href='http://userscripts.org/scripts/source/56095.user.js' id='install_it'>点击此处安装</a>");
					_$("#install_it").click(function(){ GM_setValue('last_version', s); });
				}else{
					_$("#sl_check_version").html("您的已经是最新版本！");
				}
			}
		);
	});

	if( GM_getValue('last_version') == undefined ){
		_$("object").toggle();
		_$("body").append(sl_info_html);
		_$("#sl_info_close").click(function(){_$('.block_div').remove(); _$("object").toggle();});
		_$("#sl_check_version").html("成功安装脚本：<span style='color:red'>显示网站收录数和反向链接数</span><br />点击浮动层右上角的 <span style='color:red'>?</span> 可以查看更新脚本" );
		window.get_part(
			"http://userscripts.org/scripts/versions/56095?"+Math.random(), 
			"<ul style='list-style: none'>", 
			"[", 
			"无此字符", 
			null, 
			function(ret){return ret.replace('<li>', '');}, 
			function(ret){GM_setValue('last_version', _$.trim(ret));}
		);
	}
}
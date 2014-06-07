// ==UserScript==
// @name		   显示网站收录数和反向链接数
// @namespace  http://www.junstyle.com.cn
// @include		http://*
// @exclude		http://*.google.*/*
// @exclude		http://localhost*/*
// @exclude		http://*.baidu.com/*
// @exclude		http://*.sogou.com/*
// @exclude		http://*.youdao.com/*
// @exclude		http://192.168*
// @exclude		http://127.0*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version		1.0
// ==/UserScript==
// Author：		junstyle
// Blog：		http://www.junstyle.com.cn

var se_show_config=null;
var SE={
	run_auto : true,
	run_key : "F9",
	domain : "",
	se_config : {
		"百度":{
			"show":1,
			"收录":{"show":1, cfg:["http://www.baidu.com/s?wd=site%3A#d", ">找到相关结果数", "个", "抱歉，没有找到"]},
			"1天内":{"show":0, cfg:["http://www.baidu.com/s?q1=site%3A#d&q2=&q3=&q4=&rn=10&lm=1&ct=0&ft=&q5=&q6=&tn=baiduadv", ">找到相关结果数", "个", "抱歉，没有找到"]},
			"7天内":{"show":0, cfg:["http://www.baidu.com/s?q1=site%3A#d&q2=&q3=&q4=&rn=10&lm=7&ct=0&ft=&q5=&q6=&tn=baiduadv", ">找到相关结果数", "个", "抱歉，没有找到"]},
			"1月内":{"show":0, cfg:["http://www.baidu.com/s?q1=site%3A#d&q2=&q3=&q4=&rn=10&lm=30&ct=0&ft=&q5=&q6=&tn=baiduadv", ">找到相关结果数", "个", "抱歉，没有找到"]},
			"外链":{"show":1, cfg:["http://www.baidu.com/s?wd=domain%3A#d", ">找到相关结果", "个", "抱歉，没有找到"]},
			"快照日期":{"show":0, cfg:["http://www.baidu.com/s?wd=#d", "<br><span class=\"g\">", "</span>", "抱歉，没有找到", function(ret){return ret.split('/ ')[1];}]},
			"首页位置":{"show":1, cfg:["http://www.baidu.com/s?wd=site%3A#d", "target=\"_blank\">百度站长平台</a>。", "<br clear=all>", "抱歉，没有找到", function(ret){var i=0, k=0; var ss=''; while((ss=SE_Tool.get_middleStr(ret, "<br><span class=\"g\">", "</span>"))!=""){ret=ret.replace("<br><span class=\"g\">"+ss+"</span>", "");i=i+1; if(ss.split(' ')[0].toLowerCase()==SE.domain.toLowerCase()+"/"){k=1;break;}} return (k==1?i:0).toString();}]}
			},
		"谷歌":{
			"show":1,
			"收录":{"show":1, cfg:["http://www.google.com.hk/search?hl=zh-CN&q=site%3A#d", "id=resultStats>", " 条结果<nobr>", "找不到和您的查询", function(ret){return ret.replace("约 ","").replace("找到", "").replace("获得", "");}]}, 
			"外链":{"show":1, cfg:["http://www.google.com.hk/search?hl=zh-CN&q=link%3A#d", "id=resultStats>", " 条结果<nobr>", "找不到和您的查询", function(ret){return ret.replace("约 ","").replace("找到", "").replace("获得", "");}]},
			"ＰＲ":{"show":1, cfg:["http://pr.linkhelper.cn/querypr.asp?url=#d", "</a>的PR：<img src='http://www.linkhelper.cn/pagerank", ".gif' border=0>", this.domain+"该网址错误！", null, null, "gb2312"]}
			},
		"雅虎":{
			"show":1,
			"收录":{"show":1, cfg:["http://sitemap.cn.yahoo.com/search?bwm=p&p=#d", "被收录的网页： 共 <strong>", "</strong>", "对不起， 你的请求不能正确处理"]},
			"外链":{"show":1, cfg:["http://sitemap.cn.yahoo.com/search?bwm=i&p=#d&bwm=i&bwmo=d", "链向该地址的网页： 共 <strong>", "</strong>", "对不起， 你的请求不能正确处理"]}
			},
		"搜狗":{
			"show":1,
			"收录":{"show":1, cfg:["http://www.sogou.com/web?query=site%3A#d", "<div class=\"resultstats\" >找到约 <span id=\"scd_num\">", "</span>", "<div class=\"no-result\" id=\"noresult_part1_container\">没有找到"]},
			"外链":{"show":1, cfg:["http://www.sogou.com/web?query=link%3A#d", "<div class=\"resultstats\" >找到约 <span id=\"scd_num\">", "</span>", "<div class=\"no-result\" id=\"noresult_part1_container\">没有找到"]},
			"评级":{"show":0, cfg:["http://rank.ie.sogou.com/sogourank.php?ur=http%3A%2F%2F#d%2F", "sogourank=", "", "all"]}
			},
		"搜搜":{
			"show":1,
			"收录":{"show":1, cfg:["http://www.soso.com/q?w=site%3A#d", "搜索到约", "项结果", "<font color=#DA3145>", null, null, "gb2312"]},
			"外链":{"show":1, cfg:["http://www.soso.com/q?w=link%3A#d", "搜索到约", "项结果", "<font color=#DA3145>", null, null, "gb2312"]}
			},
		"有道":{
			"show":1,
			"收录":{"show":1, cfg:["http://www.youdao.com/search?q=site%3A#d", "<span class=\"fr\">共", "条结果</span>", "抱歉，没有找到与", function(ret){ret=ret.replace("约","");if(ret.indexOf("万")>0){var tmp=ret.split('万'); return tmp[0]*10000+(tmp[1].length>0?parseInt(tmp[1]):0);} return ret;}]},
			"外链":{"show":1, cfg:["http://www.youdao.com/search?q=link%3A#d", "<span class=\"fr\">共", "条结果</span>", "抱歉，没有找到与", function(ret){ret=ret.replace("约","");if(ret.indexOf("万")>0){var tmp=ret.split('万'); return tmp[0]*10000+(tmp[1].length>0?parseInt(tmp[1]):0);} return ret;}]}
			},
		"必应":{
			"show":1,
			"收录":{"show":1, cfg:["http://cn.bing.com/search?q=site%3A#d", "条结果(共 ", " 条)</span>", "<div id=\"no_results\"><h1>未找到 <strong>site:"]},
			"外链":{"show":1, cfg:["http://cn.bing.com/search?q=link%3A#d", "条结果(共 ", " 条)</span>", "<div id=\"no_results\"><h1>未找到 <strong>site:"]}
			},
		"alex":{
			"show":1,
			"昨日排名":{"show":1, cfg:["http://cn.alexa.com/siteinfo/#d", "<th>昨日</th><td>", "</td>", this.domain+"该网址错误"]},
			"七天平均":{"show":1, cfg:["http://cn.alexa.com/siteinfo/#d", "<th>最近七天平均</th><td>", "</td>", this.domain+"该网址错误"]},
			"三月平均":{"show":1, cfg:["http://cn.alexa.com/siteinfo/#d", "<th>最近三月平均</th><td>", "</td>", this.domain+"该网址错误"]}
			},
		"域名":{
			"show":0,
			"注册时间":{"show":1, cfg:["http://whois.linkhelper.cn/whois.asp?domain=#nd", "域名注册日期：", "</font>", "o match", null, null, "gb2312"]}
			}
	},

	isShow : function(key, subKey){
		if( se_show_config==null ){
			var se_show_configStr='';
			if( GM_getValue("SeShowConfig") == undefined ){
				var arr=[];
				for(var pkey in this.se_config){
					var arr1=[];
					for(var skey in this.se_config[pkey]){
						if(skey!="show")
							arr1.push("\""+skey+"\":"+this.se_config[pkey][skey]["show"]);
						else
							arr1.push("\"show\":"+this.se_config[pkey][skey]);
					}
					arr.push("\""+pkey+"\":{"+arr1.join(',')+"}");
				}
				se_show_configStr="se_show_config={"+arr.join(',')+"};";
			}else
				se_show_configStr=GM_getValue("SeShowConfig");
			eval(se_show_configStr);
		}
		if(subKey=='' || subKey==null){
			if( se_show_config[key] != null )
				return se_show_config[key]["show"]==1;
			else
				return this.se_config[key]["show"];
		}else{
			if( se_show_config[key] != null && se_show_config[key][subKey] != null ){
				return se_show_config[key][subKey]==1;
			}else{
				return this.se_config[key][subKey]["show"]==1;
			}
		}
	},

	show : function(d){
		this.domain=d||document.domain;
		se_show_config=null;

		if($("#se_style").length==0){//set flash to be transparent
			$("embed").attr("wmode", "transparent");
			$("object").each(function(){
				var wmode=$("param[name='wmode']", this);
				if(wmode.length==0) $(this).prepend('<param name="wmode" value="transparent">');
				else wmode.attr("value", "transparent");
			});
		}
		$("#se_style, .block_div, #se_wrapper").remove();
		$("head").append("<style id='se_style'>#se_wrapper{opacity:0.5;border-radius:6px; color:#FFFF00; position:absolute; top:10px; right:10px; font-size:12px; margin:0px; background:#333; line-height:22px; overflow:hidden;font-size:12px; font-family:verdana; text-align:left !important; z-index:1111109; width:auto;} #se_wrapper_inner{margin:5px 8px 5px 8px;} #se_wrapper a{color:#fff; font-style:normal; margin:auto 3px; text-decoration:none; background:#333;} #se_wrapper *{color:#FFFF00; padding:0px; border:0px; background:#333; line-height:22px;} #se_wrapper:hover{opacity:1; color:#FFFF00;} #se_config_link{position:absolute; right:1px; top:0px;} a#se_config_link{color:red; font-weight:bold;} .block_div a{text-decoration:none;} .block_div *{line-height:19px; font-family:宋体;} .block_div fieldset{text-align:left; padding:3px 6px; border:solid 1px #aaa; margin:0px; margin-bottom:1px; font-size:12px;} .block_div legend{font-weight:bold; padding:0px; background:#fff; margin:0px; color:#000;} .block_div input{vertical-align:middle; padding:0px; margin:4px; border:none;} .block_div #run_key{border:solid 1px #ddd;}</style>");
		var se_html=["<div id='se_wrapper'><a href='javascript:void(0);' id='se_config_link' title='检查更新' target='_self'>?</a><div id='se_wrapper_inner'>"];
		for(var pkey in this.se_config){
			if(this.isShow(pkey, '')){
				var tmp=[''];
				var h=0;
				for(var skey in this.se_config[pkey]){
					if(skey!="show" && this.isShow(pkey, skey))
						tmp.push((h++==0?"":"/")+"<em id='se_"+pkey+"_"+skey+"' title='"+pkey+skey+"'>..</em>");
				}
				if(h>0) se_html.push(pkey+" "+tmp.join('')+"<br />");
			}
		}
		se_html.push("</div></div>");
		$("body").append(se_html.join(''));

		$("#se_wrapper_inner em").each(function(){
			var idArr=$(this).attr('id').split('_');
			var cfg=SE.se_config[idArr[1]][idArr[2]]['cfg'];
			SE_Tool.get_part( cfg[0].replace('#nd', SE.domain.replace('www.','')).replace("#d", SE.domain), cfg[1], cfg[2], cfg[3], $(this), cfg[4], cfg[5]||null, cfg[6]||null );
		});

		$("#se_wrapper").dblclick(function(){
			$(this).slideUp();
		});

		$("#se_config_link").click(function(){
			SE.showConfig();
			//check for update
			SE_Tool.get_part(
				"http://userscripts.org/scripts/source/56095.meta.js",
				"// @uso:timestamp",
				"// @uso:installs",
				"无此字符", 
				$("#se_check_version"),
				function(ret){return $.trim(ret);},
				function(){
					var s=$("#se_check_version").text();
					if( GM_getValue('last_version')!=undefined && new Date(GM_getValue('last_version'))<new Date(s) ){
						$("#se_check_version").html("<span style='color:red'>有新版本</span>，<a href='http://userscripts.org/scripts/source/56095.user.js' id='install_it'>点击此处安装</a>");
						$("#install_it").click(function(){ GM_setValue('last_version', s); });
					}else{
						$("#se_check_version").html("您的已经是最新版本！");
					}
				}
			);
		});
	},

	showConfig : function(){
		configChanged=false;
		var _html=$("html")[0], _body=$("body")[0];
		var se_config_html='<div class="block_div" style="background:#888; opacity:0.5; position:absolute; left:0px; top:0px; width:'+_html.scrollWidth+'px; height:'+_html.scrollHeight+'px; z-index:1111110"></div><div class="block_div" style="border-radius:6px; opacity:0.5; position:absolute; left:'+(_html.scrollWidth-600)/2+'px; top:'+(innerHeight-450)/2+'px; width:570px; height:420px; background:#000; padding:10px; z-index:1111111;"></div><div style="background:#fff; opacity:1; z-index:1111111; position:absolute; left:'+(_html.scrollWidth-580)/2+'px; top:'+(innerHeight-430)/2+'px; width:550px; height:393px; padding:15px 10px 10px;" class="block_div"><fieldset><legend>检查更新</legend><div id="se_check_version" style="font-size: 16px; color:blue;">检查更新中....</div><span style="color:#888">安装新版本会删除GM里此脚本的过滤设置，特别提示！</span></fieldset><fieldset><legend>启动选项</legend><input type="checkbox" id="run_auto"'+(this.run_auto?' checked="checked"':'')+' /><label for="run_auto">自动启动</label> - 启动快捷键：<input type="text" size="12" id="run_key" value="'+this.run_key+'" /></fieldset><fieldset id="se_config_wrapper"><legend>查询选项</legend><div style="height:166px; overflow-y:scroll">';
		for(var pkey in this.se_config){
			var s=this.isShow(pkey);
			se_config_html+='<div><input type="checkbox" id="cfg_'+pkey+'"'+(s?' checked="checked"':"no")+' /><label for="cfg_'+pkey+'" style=" font-weight:bold;">'+pkey+'</label>：';
			for(var skey in this.se_config[pkey]){
				if(skey!='show'){
					if(s)
						se_config_html+='<input type="checkbox" id="cfg_'+pkey+'_'+skey+'"'+(this.isShow(pkey, skey)?' checked="checked"':"")+' /><label for="cfg_'+pkey+'_'+skey+'">'+skey+'</label> ';
					else
						se_config_html+='<input type="checkbox" id="cfg_'+pkey+'_'+skey+'" disabled="disabled" />'+skey+' ';
				}
			}
			se_config_html+="</div>";
		}
		se_config_html+='</div></fieldset><fieldset><legend>关于脚本</legend>脚本作者：junstyle <a target="_blank" href="http://www.junstyle.com.cn/post/gmscript-se-shoulu-link.html">给我留言</a><br/>脚本地址：<a target="_blank" href="http://userscripts.org/scripts/show/56095">http://userscripts.org/scripts/show/56095</a><br/>个人博客：<a target="_blank" href="http://www.junstyle.com.cn">http://www.junstyle.com.cn</a></fieldset><a style="position: absolute; right: 10px; top: 3px;" id="se_config_close" href="javascript:void(0);" target="_self">关闭</a></div>';

		$("body").append(se_config_html);
		$("#run_auto").click(function(){GM_setValue("run_auto", this.checked?"1":"0"); SE.run_auto=this.checked;});
		$("#run_key").keyup(function(e){
			if(e.keyCode!=16 && e.keyCode!=17 && e.keyCode!=18){
				this.value=SE_Tool.get_keyName(e);
				GM_setValue('run_key', this.value);
				SE.run_key=this.value;
			}
		});
		$("#se_config_close").click(function(){$('.block_div').remove(); if(configChanged){SE.show();}});
		$("#se_config_wrapper :checkbox").filter(":first-child").click(function(){
			$(this).nextAll(":checkbox").attr("disabled", !this.checked);
		}).end().click(function(){
			var se_show_configStr='';
			var arr=[];
			for(var pkey in SE.se_config){
				var pck=$("#cfg_"+pkey)[0].checked;
				var arr1=[];
				for(var skey in SE.se_config[pkey]){
					if(skey!="show")
						arr1.push("\""+skey+"\":"+((pck && $("#cfg_"+pkey+"_"+skey)[0].checked)?1:0));
					else
						arr1.push("\"show\":"+(pck?1:0));
				}
				arr.push("\""+pkey+"\":{"+arr1.join(',')+"}");
			}
			se_show_configStr="se_show_config={"+arr.join(',')+"};";
			configChanged=true;
			GM_setValue("SeShowConfig", se_show_configStr);
		});
	},

	init : function(){
		if(top!=window) return;
		this.run_auto=(GM_getValue('run_auto') || "1") == "1";
		if(this.run_auto)
			this.show();

		this.run_key=GM_getValue('run_key')||this.run_key;
		$(document).keyup(function(e){
			if($(".block_div").length==0 && SE_Tool.get_keyName(e)==SE.run_key){
				if($("#se_wrapper").length>0)
					$("#se_wrapper").toggle();
				else
					SE.show();
			}
		});

		if( GM_getValue('last_version') == undefined ){
			GM_setValue('run_auto', this.run_auto);
			GM_setValue('run_key', this.run_key);
			this.showConfig();
			$("#se_check_version").html("成功安装脚本：<span style='color:red'>显示网站收录数和反向链接数</span><br />点击浮动层右上角的 <span style='color:red'>?</span> 可以查看更新脚本" ).next().hide();
			SE_Tool.get_part(
				"http://userscripts.org/scripts/source/56095.meta.js",
				"// @uso:timestamp",
				"// @uso:installs",
				"无此字符", 
				null, 
				function(ret){return $.trim(ret);}, 
				function(ret){GM_setValue('last_version', ret);}
			);
		}
	}
};

var SE_Tool={
	get_part : function(url, start, end, notExistStr, obj, dealFun, cb, charset){
		GM_xmlhttpRequest({
			method: 'GET',
			overrideMimeType : charset?'text/plain;charset='+charset:null,
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				var html = responseDetails.responseText;
				if( url.indexOf("http://www.sogou.com/web?query=link%3A")>-1 && html.indexOf('<form name="authform" method="POST" action="thank.php">')>-1 ){
					obj.html("<a href=\""+url+"\" target=\"_blank\">点击输入验证码</a>");
				}else{
					var part = $.trim(SE_Tool.get_middleStr( html, start, end )).replace(/\,/ig, "").replace("约", "");
					if( dealFun ) part = dealFun(part);
					if( part == null || part.length == 0 || html.indexOf( notExistStr ) > -1 ) part = "<font color='#aaaaaa'>无</font>";
					if( obj != null )
						obj.html("<a href=\""+url+"\" target=\"_blank\">"+$.trim(part)+"</a>");	
					if( cb ) cb( part );
				}
			}
		});
	},

	get_middleStr : function(sourceStr, startStr, endStr){
		var middleStr = sourceStr;
		if( middleStr.indexOf( startStr ) > -1 )
		{
			middleStr = middleStr.substring( middleStr.indexOf( startStr ) + startStr.length );
			if( endStr && middleStr.indexOf( endStr ) > -1 )
				middleStr = middleStr.substring( 0, middleStr.indexOf( endStr ) );
		}
		if( middleStr == sourceStr )
			return "";
		else
			return middleStr;
	},

	get_keyName : function(e){var keyName;switch(e.keyCode){case 8:keyName="退格";break;case 9:keyName="Tab";break;case 13:keyName="Enter";break;case 16:keyName="Shift";break;case 17:keyName="Ctrl";break;case 18:keyName="Alt";break;case 19:keyName="PauseBreak";break;case 20:keyName="Caps Lock";break;case 27:keyName="Esc";break;case 32:keyName="空格";break;case 33:keyName="PageUp";break;case 34:keyName="PageDown";break;case 35:keyName="End";break;case 36:keyName="Home";break;case 37:keyName="方向键左";break;case 38:keyName="方向键上";break;case 39:keyName="方向键右";break;case 40:keyName="方向键下";break;case 45:keyName="Insert";break;case 46:keyName="Delete";break;case 91:keyName="左Win";break;case 92:keyName="右Win";break;case 93:keyName="快捷菜单键";break;case 95:keyName="Sleep";break;case 96:keyName="小键盘区0";break;case 97:keyName="小键盘区1";break;case 98:keyName="小键盘区2";break;case 99:keyName="小键盘区3";break;case 100:keyName="小键盘区4";break;case 101:keyName="小键盘区5";break;case 102:keyName="小键盘区6";break;case 103:keyName="小键盘区7";break;case 104:keyName="小键盘区8";break;case 105:keyName="小键盘区9";break;case 106:keyName="*";break;case 107:keyName="+";break;case 109:keyName="-";break;case 110:keyName=".";break;case 111:keyName="/";break;case 112:keyName="F1";break;case 113:keyName="F2";break;case 114:keyName="F3";break;case 115:keyName="F4";break;case 116:keyName="F5";break;case 117:keyName="F6";break;case 118:keyName="F7";break;case 119:keyName="F8";break;case 120:keyName="F9";break;case 121:keyName="F10";break;case 122:keyName="F11";break;case 123:keyName="F12";break;case 144:keyName="NumLock";break;case 145:keyName="ScrollLock";break;case 186:keyName=";";break;case 187:keyName="=";break;case 188:keyName=",";break;case 189:keyName="-";break;case 190:keyName=".";break;case 191:keyName="/";break;case 192:keyName="`";break;case 219:keyName="[";break;case 220:keyName="\\";break;case 221:keyName="]";break;case 222:keyName="'";break;case 255:keyName="Wake";break;default:keyName=""+String.fromCharCode(e.keyCode)+"";break;};if((e.shiftKey)&&(e.keyCode!=16)) {keyName="Shift + "+keyName;};if((e.altKey)&&(e.keyCode!=18)) {keyName="Alt + "+keyName;};if((e.ctrlKey)&&(e.keyCode!=17)) {keyName="Ctrl + "+keyName;};return keyName;}
};

//run se
SE.init();

//yahoo_link_list_fix
if(document.domain.toLowerCase().indexOf('sitemap.cn.yahoo.com')>-1)
	$("div.sma_co5 li").css('height','auto').find("a").attr("target", "_blank");
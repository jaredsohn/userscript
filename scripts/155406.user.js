// ==UserScript==
// @name           DBank Linker
// @namespace      924a0340-eb53-4539-a285-d19214f30361
// @description    Showing direct links & removing ads on DBank download pages. DBank网盘下载页未注册用户需注册下载链接，该脚本能把链接还原，让任何用户都可直接下载，并去除广告。理论上兼容所有浏览器，可用于Greasemonkey（支持还原普通和迅雷链接）、原生的Google Chrome和Opera等（目前仅还原普通链接）。
// @include        http://dl.dbank.com/*
// @author         tomchen1989
// @version        1.1.0.2
// @updateURL     https://j.mozest.com/userscript/script/52.meta.js
// ==/UserScript==
function addGlobalStyle(css) {
	if (GM_addStyle) {
		GM_addStyle(css);
	} else {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}
function addEventSimple(obj, evt, fn){
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + evt, fn);
	}
}
addGlobalStyle("#ShowDIV,.left_adv{display:none;}");
if (unsafeWindow.$) {
	if (typeof($)==="undefined") {
		$ = unsafeWindow.$;
	}
//from http://st3.dbank.com/download/edit.js?v=1.26.18 ===BEGIN===
	var ruletype = $('#downloadRuleInfo').attr('ruletype');
	var isInstallThunder = function(){
		if(document.all) {
			try{
			  thunder = (new ActiveXObject("ThunderAgent.Agent") || new ActiveXObject("ThunderAgent.Agent.1"));
		   }catch(e){
			   showMask(true, "mask");
				var boxheight=$(document).scrollTop()+300;
				$("#xltips").attr("style","top:"+boxheight+"px");
			   $('#xltips').show();
			   return false;
		   }
		}else{
			return confirm('已安装迅雷，请点击确定；未安装迅雷请先下载安装');
		}
		return true;
	};
	function xunleidown() {
		var b = '';
		var c = 0;
		$('#down_filelist').find("input[type=checkbox][checked]").each(function(index,o){
			if($(this).attr("checked")) {
				var h = $(this).attr('xunleiurl');
				b += "BatchTasker.AddTask('" + h + "');\n";
				c++;
			}
		})
		var s = '';
		s += 'BatchTasker.BeginBatch(' + c + ',03821);';
		s += b;
		s += 'BatchTasker.EndBatch(03821);';
		eval(s);
	}
	function noWinToDown(link) {
		var iframe_obj;
		try {
		if ($('#down_iframe').length > 0) {
			$('#down_iframe').remove();
		}
			iframe_obj = document.createElement("iframe");
			document.body.appendChild(iframe_obj);
			iframe_obj.id = 'down_iframe';
			iframe_obj.height = "0";
			iframe_obj.width = "0";
			iframe_obj.display = "none";
		if (document.all) {
			var fra = '<frameset><frame src="'+link+'" /></frameset>';
				window.frames['down_iframe'].document.write(fra);
			} else {
				iframe_obj.src = link;
			}
		} catch (e) {
			iframe_obj.src = link;
		}
	}
}
//===END===
addEventSimple(window, "load", function() {
	var as = document.getElementById("down_filelist").getElementsByTagName("A");
	for (var i=0, len=as.length; i<len; i++) {
		var me = as[i]
		if ((/(^|\s)ico(\s|$)/.test(me.className) === true || /(^|\s)btn-xz(\s|$)/.test(me.className) === true) && (me.href.substr(-1,1) === "#")) {
			me.href = me.getAttribute("downloadurl");
		}
	}
	if (unsafeWindow.$) {
		$('#xunleidown').unbind('click');
		$('#xunleidown').bind('click',function(){
	//from http://st3.dbank.com/download/edit.js?v=1.26.18 ===BEGIN===
			if($('#down_filelist').find("input[type=checkbox][checked]").length == 0){
				alert('请至少选择一个资源');
				return false;
			}
			if(ruletype == 1){
							if(isInstallThunder()){
								if(!!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1)){
									xunleidown();
								}else {
									$('#down_filelist').find("input[type=checkbox][checked]").each(function(index,o){
										var url=$(this).attr('xunleiurl');
										noWinToDown(url);
										index++;
										window.setTimeout("down_filelist("+index+");", 6000);
										return false;
									});
								}
							}
			}
			if(ruletype == 3){
				if(isInstallThunder()){
				if(!!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1)){
								xunleidown();
							}else {
						$('#down_filelist').find("input[type=checkbox][checked]").each(function(index,o){						
							var url=$(this).attr('xunleiurl');
							noWinToDown(url);
							index++;
							window.setTimeout("down_filelist("+index+");", 2000);
							return false;
						});
					}
				}
			}
	//===END===
		}).show();
	}
});
// ==UserScript==
// @id             google_fxxking_filter
// @name           Google+ Fxxking Filter
// @version        1.0.1
// @namespace      http://userscripts.org/scripts/show/111206
// @author         SkyArrow
// @description    Filter the specific words you don't want to see in Google+.
// @include        https://plus.google.com/*
// ==/UserScript==

function filter(){
	// Color Animation
	(function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.curCSS(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);
		
	// Load Settings
	var options = {
		'ff_words': localStorage['ff_words'] || '',
		'ff_language': localStorage['ff_language'] || navigator.language
	};
	
	// Localization
	var	locale_filter_1 = 'This post is filtered.',
		locale_filter_2 = 'Show',
		locale_filter_3 = 'Hide',
		locale_menu_1 = 'Show / Hide All',
		locale_lang_01 = 'English',
		locale_lang_02 = '正體中文',
		locale_lang_03 = '简体中文',
		locale_set_title = 'Filter Setting',
		locale_set_save = 'Save & Reload',
		locale_set_reset = 'Reset',
		locale_set_reset_confirm = 'Are you sure to reset all options?',
		locale_set_close = 'Close',
		locale_set_01_1 = 'Filter:',
		locale_set_01_2 = '(Separated by commas)',
		locale_set_02 = 'Langauge:';
	
	switch (options['ff_language'])
	{
		case 'zh-TW':
		case 'zh-HK':
			locale_filter_1 = '此文章已被過濾。',
			locale_filter_2 = '顯示',
			locale_filter_3 = '隱藏',
			locale_menu_1 = '顯示 / 隱藏全部',
			locale_menu_2 = '停用字詞過濾',
			locale_menu_3 = '啟用字詞過濾',
			locale_set_title = '字詞過濾設定',
			locale_set_save = '儲存並重載頁面',
			locale_set_reset = '重設',
			locale_set_reset_confirm = '您確定要重設所有設定值嗎？',
			locale_set_close = '關閉',
			locale_set_01_1 = '過濾字詞：',
			locale_set_01_2 = '(以逗號分隔)',
			locale_set_02 = '語言：';
			break;
		case 'zh-CN':
			locale_filter_1 = '此文章已被过滤。',
			locale_filter_2 = '显示',
			locale_filter_3 = '隐藏',
			locale_menu_1 = '显示 / 隐藏全部',
			locale_menu_2 = '停用字词过滤',
			locale_menu_3 = '启用字词过滤',
			locale_set_title = '字词过滤设定',
			locale_set_save = '储存并重载页面',
			locale_set_reset = '重设',
			locale_set_reset_confirm = '您确定要重设所有设定值吗？',
			locale_set_close = '关闭',
			locale_set_01_1 = '过滤字词：',
			locale_set_01_2 = '(以逗号分隔)',
			locale_set_02 = '语言：';
			break;
	}
	
	var words = new RegExp(options['ff_words'].split(',').join('|')),
		version = '1.0',
		$content = $('#content');
	
	// Init
	var init = {
		'normal': function(){
			$('#gbd5 ol.gbmcc').append('<li class="gbmtc"><div class="gbmt gbmh"></div></li><li class="gbkp gbmtc"><a id="ff_disable" class="gbmt" href="javascript:void(0)">'+locale_menu_2+'</a></li><li class="gbkp gbmtc"><a id="ff_setting_open" class="gbmt" href="javascript:void(0)">'+locale_set_title+'</a></li><li class="gbkp gbmtc"><a id="ff_ctrlall" class="gbmt" href="javascript:void(0)">'+locale_menu_1+'</a></li>');
			
			$content.append('<div id="ff_set_back"></div><div id="ff_set_page" class="ff_settings"><h3>'+locale_set_title+'</h3><small>Ver. '+version+' by <a href="https://plus.google.com/105931860008509594725/posts" target="_blank">SkyArrow</a></small><div id="ff_set_close" class="closeButton" title="'+locale_set_close+'"></div></div>');
			
			$('#ff_set_page').append(
			'<p><label for="ff_language">'+locale_set_02+'</label><select id="ff_language"></select><br />'+
			'<label for="ff_words">'+locale_set_01_1+' <small>'+locale_set_01_2+'</small></label><textarea id="ff_words"></textarea>'+
			'</p><div id="ff_set_save" class="button_style greenButton" title="'+locale_set_save+'">'+locale_set_save+'</div><div title="'+locale_set_reset+'" class="button_style whiteButton" id="ff_set_clear">'+locale_set_reset+'</div>'
			);
			
			$('#ff_language').append(
			'<option value="en">'+locale_lang_01+'</option>'+
			'<option value="zh-TW">'+locale_lang_02+'</option>'+
			'<option value="zh-CN">'+locale_lang_03+'</option>'
			);
			
			setPage();
		}
	};
	init.normal();
	
	function main(){
		var timer;
		clearInterval(timer);
		timer = setInterval(function(){
			$('.Us').each(function(){
				if ( !$(this).hasClass('filtered') ) {
					if ( words.exec($(this).text()) ) {
						$(this).parent().parent().hide();
						$(this).parent().parent().parent().append('<div class="filtertext">'+locale_filter_1+' <a href="javascript:void(0)">'+locale_filter_2+'</a></div>').animate({'backgroundColor':'#fcc'}, 500);
						$(this).parent().parent().parent().find('.mo').append(' - <span class="a-j hideFilterPost" role="button" tabindex="0">'+locale_filter_3+'</span>');
					}
					$(this).addClass('filtered');
				}
			});
			
			$('.zj').each(function(){
				if ( !$(this).hasClass('filtered') ) {
					if ( words.exec($(this).text()) ) {
						$(this).parent().parent().hide();
						$(this).parent().parent().parent().append('<div class="filtertext filtertextComm">'+locale_filter_1+' <a href="javascript:void(0)">'+locale_filter_2+'</a></div>').animate({'backgroundColor':'#fcc'}, 500);
						$(this).parent().parent().parent().find('.Lm').append(' - <span class="a-j hideFilterComm" role="button" tabindex="0">'+locale_filter_3+'</span>');
					}
					$(this).addClass('filtered');
				}
			});
		}, 2500);
		
		$('#ff_disable').toggle(function(){
			clearInterval(timer);
			showAll();
			$(this).text(locale_menu_3);
		}, function(){
			main();
			hideAll();
			$(this).text(locale_menu_2);
		});
	}
	
	if ( options['ff_words'] != '' )
		main();
	
	$('.filtertext a').live('click', function(){
		$(this).parent().parent().children('div:hidden').eq(0).slideDown(500);
		$(this).parent().parent().animate({'backgroundColor':'#fff'}, 500);
		$(this).parent().slideUp(500);
		
		return false;
	});
	
	$('.hideFilterPost').live('click', function(){
		$(this).parent().parent().parent().parent().slideUp(500);
		$(this).parent().parent().parent().parent().parent().animate({'backgroundColor':'#fcc'}, 500);
		$(this).parent().parent().parent().parent().parent().children('.filtertext').slideDown(500);
	});
	
	$('.hideFilterComm').live('click', function(){
		$(this).parent().parent().parent().slideUp(500);
		$(this).parent().parent().parent().parent().animate({'backgroundColor':'#fcc'}, 500);
		$(this).parent().parent().parent().parent().children('.filtertext').slideDown(500);
	});
	
	$('#ff_ctrlall').toggle(showAll, hideAll);
	
	function showAll(){
		$content.find('.filtertext').each(function(){
			$(this).parent().children('.Ve, .Qd').eq(0).show();
			$(this).parent().animate({'backgroundColor':'#fff'}, 500);
			$(this).hide();
		});
	}
	
	function hideAll(){
		$content.find('.hideFilterPost').each(function(){
			$(this).parent().parent().parent().parent().slideUp(500);
			$(this).parent().parent().parent().parent().parent().animate({'backgroundColor':'#fcc'}, 500);
			$(this).parent().parent().parent().parent().parent().children('.filtertext').slideDown(500);
		});
		$content.find('.hideFilterComm').each(function(){
			$(this).parent().parent().parent().slideUp(500);
			$(this).parent().parent().parent().parent().animate({'backgroundColor':'#fcc'}, 500);
			$(this).parent().parent().parent().parent().children('.filtertext').slideDown(500);
		});
	}
	
	function setPage(){
		var xScroll;
		
		$('#ff_setting_open').click(function(){
			xScroll = $(document).scrollTop();
			
			$('#ff_set_back, #ff_set_page').fadeIn(300);
			
			$('.ff_settings').find(':text, textarea').each(function(){
				$(this).val(options[$(this).attr('id')]);
			});
			
			$('.ff_settings').find('select').each(function(){
				$(this).children('option[value="'+options[$(this).attr('id')]+'"]').prop('selected', true);
			});
			
			$('.ff_settings').find(':checkbox').each(function(){
				if ( options[$(this).attr('id')] === 'true' )
					$(this).prop('checked', true);
			});
		});
		
		$('#ff_set_save').click(function(){
			$('#ff_set_page').find(':text, textarea').each(function(){
				localStorage[$(this).attr('id')] = $(this).val();
			});
			
			$('#ff_set_page').find('select').each(function(){
				localStorage[$(this).attr('id')] = $(this).find(':selected').val();
			});
			
			$('#ff_set_page').find(':checkbox').each(function(){
				localStorage[$(this).attr('id')] = $(this).prop('checked').toString();
			});
			location.reload();
		});
		
		$('#ff_set_clear').click(function(){
			var sure = confirm(locale_set_reset_confirm);
			
			if ( sure ) {
				localStorage.clear();
				location.reload();
			} else {
				return false;
			}
		});
		
		$('#ff_set_back, #ff_set_close').click(function(){
			$('#ff_set_back, #ff_set_page').fadeOut(300);
			$(document).scrollTop(xScroll);
		});
	}
}

// CSS
GM_addStyle('.filtertext{text-align:center}.filtertextComm{padding:16px 21px}#ff_set_back{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.75);z-index:10000;box-shadow:0 0 150px #999 inset;display:none}.ff_settings{position:fixed;width:550px;height:auto;top:50%;left:50%;margin-left:-285px;margin-top:-250px;background:#fff;border:1px solid #acacac;border-bottom:1px solid #999;box-shadow:0 4px 16px rgba(0,0,0,0.2);z-index:10001;padding:10px;display:none;border-radius:2px;padding:20px;overflow:hidden}.ff_settings h3{font-size:20px;font-weight:normal;margin:0}.ff_settings small{color:#666}.ff_settings ul.ff_menu{background:#f5f5f5;border-bottom:1px solid #ebebeb;border-top:1px solid #ebebeb;list-style:none;margin:15px -20px;padding:0 5px 0 10px}.ff_settings ul.ff_menu li{padding:7px 12px;color:#666;display:inline-block;cursor:pointer}.ff_settings ul.ff_menu li.current{font-weight:bold;color:#dd4839}.ff_settings ul.ff_menu li:hover{color:#dd4839}.ff_settings p{line-height:2}.ff_settings input[type="checkbox"]{margin:0 5px 0 0}.ff_settings textarea{border:1px solid #ccc;font-family:Consolas,Monaco,"Courier New",Courier,monospace !important;font-size:13px;height:150px;width:540px;padding:10px 0 0 10px;margin-top:10px}#ff_set_save,#ff_set_clear,#ff_update_install,#ff_update_cancel{float:right;margin:0 0 0 16px}.button_style{display:inline-block;position:relative;border-radius:2px;cursor:pointer;font-size:11px;font-weight:bold;height:27px;line-height:27px;margin-right:16px;min-width:54px;outline:none;padding:0 8px;text-align:center;float:left;text-decoration:none !important}.greenButton{background-color:#3D9400;background-image:-webkit-gradient(linear,left top,left bottom,from(#3D9400),to(#398A00));background-image:-webkit-linear-gradient(top,#3D9400,#398A00);background-image:-moz-linear-gradient(top,#3D9400,#398A00);background-image:linear-gradient(top,#3D9400,#398A00);border:1px solid #29691D;color:#fff;text-shadow:0 1px rgba(0,0,0,0.1)}.greenButton:hover{background-color:#368200;background-image:-webkit-gradient(linear,left top,left bottom,from(#3D9400),to(#368200));background-image:-webkit-linear-gradient(top,#3D9400,#368200);background-image:-moz-linear-gradient(top,#3D9400,#368200);background-image:linear-gradient(top,#3D9400,#368200);border:1px solid #2D6200;text-shadow:0 1px rgba(0,0,0,0.3)}.greenButton:focus,.greenButton:active{box-shadow:0 0 0 1px #fff inset;outline:none}.blueButton{background-color:#4D90FE;background-image:-webkit-gradient(linear,left top,left bottom,from(#4D90FE),to(#4787ED));background-image:-webkit-linear-gradient(top,#4D90FE,#4787ED);background-image:-moz-linear-gradient(top,#4D90FE,#4787ED);background-image:linear-gradient(top,#4D90FE,#4787ED);border:1px solid #3079ed;color:#fff}.blueButton:hover{background-color:#357AE8;background-image:-webkit-gradient(linear,left top,left bottom,from(#4D90FE),to(#357AE8));background-image:-webkit-linear-gradient(top,#4D90FE,#357AE8);background-image:-moz-linear-gradient(top,#4D90FE,#357AE8);background-image:linear-gradient(top,#4D90FE,#357AE8);border:1px solid #2F5BB7}.blueButton:focus,.blueButton:active{box-shadow:0 0 0 1px #fff inset;outline:none}.whiteButton{background-color:#F5F5F5;background-image:-webkit-gradient(linear,left top,left bottom,from(#F5F5F5),to(#F1F1F1));background-image:-webkit-linear-gradient(top,#F5F5F5,#F1F1F1);background-image:-moz-linear-gradient(top,#F5F5F5,#F1F1F1);background-image:linear-gradient(top,#F5F5F5,#F1F1F1);border:1px solid rgba(0,0,0,0.1);color:#444}.whiteButton:hover{background-color:#F8F8F8;background-image:-webkit-gradient(linear,left top,left bottom,from(#F8F8F8),to(#F1F1F1));background-image:-webkit-linear-gradient(top,#F8F8F8,#F1F1F1);background-image:-moz-linear-gradient(top,#F8F8F8,#F1F1F1);background-image:linear-gradient(top,#F8F8F8,#F1F1F1);border:1px solid #c6c6c6;color:#333}.whiteButton:focus,.whiteButton:active{box-shadow:0 1px 2px rgba(0,0,0,0.1) inset}.orangeButton{background-color:#D14836;background-image:-webkit-gradient(linear,left top,left bottom,from(#DD4B39),to(#D14836));background-image:-webkit-linear-gradient(top,#DD4B39,#D14836);background-image:-moz-linear-gradient(top,#DD4B39,#D14836);background-image:linear-gradient(top,#DD4B39,#D14836);border:1px solid transparent;color:#fff;text-shadow:0 1px rgba(0,0,0,0.1)}.orangeButton:hover{background-color:#C53727;background-image:-webkit-gradient(linear,left top,left bottom,from(#DD4B39),to(#C53727));background-image:-webkit-linear-gradient(top,#DD4B39,#C53727);background-image:-moz-linear-gradient(top,#DD4B39,#C53727);background-image:linear-gradient(top,#DD4B39,#C53727);border:1px solid #B0281A;box-shadow:0 1px 1px rgba(0,0,0,0.2)}.orangeButton:focus,.orangeButton:active{box-shadow:0 0 0 1px #fff inset;outline:none}.closeButton{background:url(https://ssl.gstatic.com/s2/tt/images/sharebox/sprite2.png) no-repeat 0 -162px;cursor:pointer;height:9px;width:9px;margin:1px;position:absolute;right:11px;top:11px}');

function ff_init(callback){
	var script = document.createElement('script');
	script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js';
	script.addEventListener('load', function(){
		var script = document.createElement('script');
		script.textContent = '(' + callback.toString() + ')();';
		document.getElementsByTagName('head')[0].appendChild(script);
	}, false);
	document.getElementsByTagName('head')[0].appendChild(script);
}

ff_init(filter);
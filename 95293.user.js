// ==UserScript==
// @name           BGM home
// @description    Bangumi首页优化
// @author         McFog wxyuan90#gmail.com
// @include        http://bangumi.tv/
// @include        http://bgm.tv/
// @include        http://chii.in/
// @version        0.1.0130
// ==/UserScript==

(function(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
})(function() {	
	var style = {//settings?!
		fold_handler:{'text-align':'center',background:'#EEE',width:32,height:32,'line-height':'32px'}
	}
	var $home = $('#columnHomeA');
	if($home.size()==0) return;//不是首页T_T
	
	//utils
	
	var sto = function(fn) {
		return function() {
			setTimeout(fn);
		}
	};
	$('#cluetip').css('z-index', 98);//fix
	//遍历每个番组
	$home.find('.prgBrowser>li').width(165).css({float:'left'})
	.filter('.odd:odd').css({clear:'none'}).end()
	.each(function() {
		var $prg 	= $(this);
		//隐藏格子
		$prg.css({position:'relative'}).find('.prg_ep_block').hide().css({
			position:'absolute',left:54,top:7,background:'white','min-height':40,
			'z-index':50, border:'1px solid silver', padding:'3px 0 3px 4px'
		});
		
		//图片icon点击
		$prg.find('a.grid').click(function(ev) {
			ev.preventDefault();
			var $list = $prg.find('.prg_ep_block');
			var visible = $list.is(':visible');
			$home.find('.prg_ep_block').hide('fast');
			$('#cluetip').hide();
			if(!visible) {
				$list.show().find('.sepBtnAir:first').hover().end().hide().show('fast');
			}
		});
		//名字过长修正
		$prg.find('.prg_info>a').height(20).css({overflow:'hidden',display:'block'})
		.after($('<b></b>').attr('title', '未看集数'));
		//间隔修正
		$prg.find('.prg_info').css({margin:0,border:'none'});
	});
	
	//更新数据
	var fn_refresh = function() {
		$home.find('.prgBrowser>li').each(function() {
			var int = function(n) {
				n = parseInt(n);
				return isNaN(n) ? 0 : n;
			}
			var $prg 	= $(this);
			var $unread	= $prg.find('.sepBtnAir');
			var $na	= $prg.find('.sepBtnNA');
			var $all	= $prg.find('.load-epinfo');
			var now = int($all.size())-int($na.size());
			$prg.find('b').text("("+$unread.size()+")");
			$prg.find('#prgsPercentNum').text("["+now.toString()+"/"+$all.size().toString()+"]");
		});
	};
	
	//右侧TL单个消息高度限制
	$('.timeline_img li').css('max-height', 80).click(function() {//点击还原
		$(this).css('max-height', null)
	});
	
	//减少Sumomo Board条数
	$('.SidePanel:last').css('margin-top', -25).click(function() {//点击还原
		$(this).find('li').show('fast');
	}).find('li:gt(1)').hide();
	
	//右侧栏可折叠
	var $rside = $('#columnHomeB').css('overflow', 'hidden');
	$rside.fn_hide = function(fn) {
		$home.animate({width:'100%'}, 'normal');
		$rside.hide('normal', function() {
			$('#header .fold_handler').text('<|');
			if(typeof fn =='function') fn();
		});
	}
	$rside.fn_show = function(fn) {
		$home.animate({width:679}, 'normal');
		$rside.show('normal', function() {
			$('#header .fold_handler').text('|>');
			if(typeof fn =='function') fn();
		});
	}
	$('#header').append($('<a href="javascript:;" class="fold_handler">|></a>').css($.extend({}, style.fold_handler, {
			'font-size':28,
			position:'absolute',
			top:20,right:35
		})).click(function() {
			var $handle = $(this);
			if($rside.is(':visible')) {
				$rside.fn_hide();
			} else {
				$rside.fn_show();
			}
		}).attr('title', 'TL')
	);
	
	//收视进度可折叠
	var $progress = $home.find('.prg_section #my_bgm_prg');
	$progress.fn_hide = function(fn) {
		$progress.slideUp('slow', function(){$(this).parent().find('.fold_handler').text('-');if(typeof fn =='function') fn();});
	}
	$progress.fn_show = function(fn) {
		$progress.slideDown('normal', function(){$(this).parent().find('.fold_handler').text('+');if(typeof fn =='function') fn();});
	}
	$home.find('.prg_section').css({position:'relative'}).prepend($('<a href="javascript:;" class="fold_handler">+</a>').css($.extend({}, style.fold_handler, {
			'font-size':28,
			position:'absolute',
			left:-38,top:-10
		})).click(function() {
			var $handle = $(this);
			if($progress.is(':visible')) {
				$progress.fn_hide();
			} else {
				$progress.fn_show();
			}
		}).attr('title', '收视进度')
	);
	

	//改造中左链接
	$home.find('.home_left a.avatar').attr({'href': function(){return $(this).attr('href').replace('/group/topic/', '/rakuen/topic/group/')}, target:'right'});

	//中右讨论聚合
	var $hr = $('.home_right');
	var $handle = $('<button>【原地展开】</button>');
	$hr.find('.tip').hide();
	$hr.find('h2.subtitle').append($handle);

	$hr.find('a').attr({'href': function(){return $(this).attr('href').replace('/subject/topic/', '/rakuen/topic/subject/')}, target:'right'});

	$handle.click(function() {
		$hr.find('ul').wrap('<div class="container"></div>').remove();
		var $ctn = $hr.find('.container');
		$ctn.text('努力载入中>_<');
		var $tmp = $('<div></div>');
		$tmp.load('/rakuen/topiclist', {}, function() {
			$handle.text('【再展开】').nextAll().remove();

			$tmp.find('#rakuen_infobox').remove();
			$tmp.find('.rr').remove();
			var $items = $tmp.find('#eden_tpc_list li');
			$items.filter(':gt(39)').remove();
			$items = $tmp.find('#eden_tpc_list li');
			//翻页
			//$items.max_page = Math.ceil($items.size()/8);
			$items.max_page = 5;
			$items.cur_page = 1;
			$items.goto = function(n) {
				n = parseInt(n);
				if(isNaN(n))return;
				if(n>$items.max_page) n = $items.max_page;
				if(n<1) n = 1;
				var start = (n - 1)*8;
				$items.hide();
				$items.slice(start, start+8).show();
				$items.cur_page = n;
				$handle.nextAll('span').text(n+'/'+$items.max_page);
			}
			$items.goto(1);
			setTimeout(function() {
				$items.find('.avatar img').width(24).height(24);
			});
			$handle.after($('<a href="javascript:;">=></a>').click(function() {
					$items.goto($items.cur_page+1);
				})
			).after('<span>1/'+$items.max_page+'</span>').after($('<a href="javascript:;"><=</a>').click(function() {
					$items.goto($items.cur_page-1);
				})
			);
			$ctn.html($tmp);
		});//.load
	});//超展开.click
	
	var fn_tenkai = function(url) {
		$progress.fn_hide($rside.fn_hide);//展开！		
		$('#robot').hide();//隐藏春菜
		$('#showrobot').text('显示春菜 ▲');
				
		var $frm = $('iframe[name=right]');
		if($frm.size()==0) {
			$frm = $('<iframe name="right"></iframe>').insertAfter($home.find('.section:last'));
			//$frm.before($('<div class="section_line clear"></div>'));
			$frm.css({border: 'none'}).width('100%').height(600);
			$frm.fn_height = function() {
				$frm.height($frm.contents().find('body>*').outerHeight()+60);
			};
			$frm.bind('load', function() {
				var u = $frm.contents()[0].location.pathname;
				$frm.contents().mouseup(sto($frm.fn_height));
				if(u.length>1 && u != 'blank'/*about:blank*/) location.hash = "#_"+u;
				
				if($frm.contents().find('#columnA').size()>0) {
					var $col = $frm.contents().find('#columnA');
					$frm.contents().find('body').empty().css('background', 'none').append($col.width('98%'));
					$('title:first').text($frm.contents().find('title').text());
				}
				$frm.fn_height();
			});
			

			$frm[0].fn_hide = function() {
				$frm.slideUp('fast', function(){$frm.parent().find('.fold_handler').text('o')});
				location.hash = "";
			}
			$frm[0].fn_show = function() {
				$frm.slideDown('fast', function(){$frm.parent().find('.fold_handler').text('x')});
			}
			var o = $frm.offset();
			$frm.wrap('<div class="prg_section" style="position: relative; "></div>').before($('<a href="javascript:;" class="fold_handler">x</a>').css($.extend({}, style.fold_handler, {
					'font-size':28,
					position:'fixed',
					left:o.left-38,top:200
				})).click(function() {
					var $handle = $(this);
					if($frm.is(':visible')) {
						$frm[0].fn_hide();
					} else {
						$frm[0].fn_show();
					}
				}).attr('title', '凶部')
			);
		}
		var doc = $frm.height(70).contents()[0];
		doc.write('<big>【你看到了华丽的载入动画】</big>');
		doc.close();
		$frm[0].fn_show();
	};//fn_tenkai
	
	if(location.hash.substr(0,2) == '#_') {
		var u = location.hash.substr(2);
		fn_tenkai(u);
		$('iframe[name=right]').attr('src', u);
	}
	
	$home.ajaxComplete(function() {
		setTimeout(fn_refresh);
		//展开！
		$home.find('a[target=right]').click(function() {
			fn_tenkai($(this).attr('href'));
		});
	});//ajaxComplete
	$home.ajaxComplete();
	
});
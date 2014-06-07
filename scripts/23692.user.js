// ==UserScript==
// @name           起点小说阅读器 qidian book reader
// @namespace      q3boy <q3boy1@gmail.com>
// @include        http://www.qidian.com/BookReader*,*.aspx*
// @exclude        http://www.qidian.com/BookReader/vip,*,*.aspx*
// @exclude        http://www.qidian.com/BookReader/Vol,*,*.aspx*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://cdn.jquerytools.org/1.1.2/jquery.tools.min.js
// @require        http://qidian-reader-for-gm.googlecode.com/svn/trunk/picker.js
// @resource       html http://qidian-reader-for-gm.googlecode.com/svn/trunk/float.html
// @resource       css http://qidian-reader-for-gm.googlecode.com/svn/trunk/main.css
// ==/UserScript==

$(document).ready(function() {
	//console.log('init');
	GM_addStyle(GM_getResourceText("css"));
	
	function options() {
		var opts =  {
			mark: false,
			bound: 1000,
			delay: 30,
			bg: '#000',
			txt: '#fff',
			size: 20,
			height: 140,
			margin: 150,
			getVal:function(name) {
				var val = GM_getValue('q3_' + name);
				if (val) {
					this[name] = val;
					return val;
				} else {
					return this[name];
				}
			},
			setVal:function(name, val) {
				this[name] = val;
				GM_setValue('q3_' + name, val);
				//console.log('set: ' + name, val, GM_getValue('q3_'+name));
			},
			init:function() {
				this.getVal('mark');
				this.getVal('bound');
				this.getVal('delay');
				this.getVal('bg');
				this.getVal('txt');
				this.getVal('size');
				this.getVal('height');
				this.getVal('margin');
			}
		}
		opts.init();
		return opts;
	}
	var opts = new options();
		//console.log('opt');

	var scroller = {
		timer:null,
		delay:30,
		isScrolling:false,
		isKeydown:false,
		isFocus:false,
		keydown:function(){
			scroller.isKeydown = true;
		},
		keyup:function(){
			scroller.isKeydown = false;
		},
		focus:function(){
			scroller.isFocus = true;
		},
		blur:function(){
			scroller.isFocus = false;
		},
		wheel:function(event){
			if (scroller.isScrolling){
				top.scroll(0, window.pageYOffset + event.detail * 20);
			}
		},
		start:function(){
			this.isScrolling = true;
			this.timeout();
		},
		stop:function() {
			this.isScrolling = false;
			clearTimeout(this.timer);
		},
		timeout:function() {
			scroller.scroll();
			scroller.timer = window.setTimeout(scroller.timeout, scroller.delay);
		},
		scroll:function(){
			if (this.isFocus && !this.isKeydown && window.scrollMaxY != window.pageYOffset){
				window.scroll(0,window.pageYOffset + 1, this.delay);
			}
		},
		init : function(){
			window.addEventListener('keydown', this.keydown, false);
			window.addEventListener('keyup', this.keyup, false);
			window.addEventListener('DOMMouseScroll', this.wheel, false);
			window.addEventListener('blur', this.blur, false);
			window.addEventListener('focus', this.focus, false);
			dly = opts.delay;
			if (dly > 0) {
				this.delay = dly;
			}
		},
		
		setDelay:function(scrollDelay) {
		//console.log(scrollDelay);
			this.delay = scrollDelay;
			opts.setVal('delay', scrollDelay);
		},
		speedUp : function() {
			if (scroller.delay < 20) {
				return;
			} 
			scroller.setDelay(scroller.delay - 10);
		},
		
		speedDown: function() {
			if (scroller.delay > 100) {
				return;
			} 
			scroller.setDelay(scroller.delay + 10);
		},
		click:function(){
			//console.log(scroller);
			if(scroller.isScrolling) {
				scroller.stop();
			} else {
				scroller.start();
			}
		}
	}
	scroller.init();
		//console.log('scroller');

	var pool = {
		pool: new Array(),
		add : function(itm) {
			this.pool[itm.chapid] = itm;
		},
		key : function (itm) {
			var key = null;
			if (typeof(itm) == 'object') {
				key = itm.chapid;
			} else if (typeof(itm) == 'number') {
				key = itm;
			} else {
				var chap = helper.parseUrl(itm);
				if (chap.ok != false) {
					key = chap.chapid;
				} else {
					key = parseInt(itm);
				}
			}
			return key;
		},
		get : function(itm) {
			var key = this.key(itm);
			if (this.pool[key]) {
				return this.pool[key];
			} else {
				return null;
			}
		},
		del : function(itm) {
			var key = this.key(itm);
			this.pool[key] = null;
		}
	}
	
		//console.log('pool');
	
	var float = function (){
		var float =  {
			div : null,
			time : function () {
				try{
					var dat = new Date();
					var h = dat.getHours();
					var m = dat.getMinutes();
					if(h < 10){
						h = '0' + h;
					}
					if(m < 10){
						m = '0' + m;
					}
					var tm = h + ':' + m;
					$('#q3_float .time').html(tm);
				}catch(e){
		
				}
				var self = arguments.callee;
				window.setTimeout(self, 5000);
			}
		}
		var str = GM_getResourceText('html').replace('##main.list##',main.list).replace('##main.book##', main.book);
		$('body').append(str);
		
		$('#q3_options_menu')
			.css('top', $(window).height() / 2 - 50)
			.css('left', $(window).width() / 2 - 150);
		
		$(window).resize(function(){
			$('#q3_options_menu')
				.css('top', $(window).height() / 2 - 50)
				.css('left', $(window).width() / 2 - 150);
		});
		
		$(function() { 
			$("ul.tabs").tabs("div.panes > div"); 
		});
		$('#q3_opt_show').click(function(){
			$('#q3_options_menu').fadeIn('fast');
		});
		$('#q3_options_menu input.q3_opt_close').click(function(){
			$('#q3_options_menu').fadeOut('fast');
		})
		
		jQuery( function() {
			iColorPicker();
		})
		
		$('#q3_txt_color').val(opts.txt).css('background-color', opts.txt);
		$('#q3_bg_color').val(opts.bg).css('background-color', opts.bg);
		GM_addStyle('.q3_cont p { color:' + opts.txt + ';}');
		GM_addStyle('body, #all_chap { background-color:' + opts.bg + ';}');
		
		
		$('#q3_color_apply').click(function(){
			var txt = $('#q3_txt_color').val();
			var bg = $('#q3_bg_color').val();
			opts.setVal('txt', txt);
			opts.setVal('bg', bg);
			GM_addStyle('.q3_cont p { color:' + txt + ';}');
			GM_addStyle('body, #all_chap { background-color:' + bg + ';}');
			
		});
		
		$('#q3_font_size').val(opts.size);
		$('#q3_line_height').val(opts.height);
		$('#q3_margin_width').val(opts.margin);
		GM_addStyle('.q3_cont p { font-size:' + opts.size + 'pt; line-height:' + opts.height + 'px; margin: 10px ' + opts.margin + 'px;}');
		
		$('#q3_font_apply').click(function(){
		//console.log(123);
			var size = $('#q3_font_size').val();
			var height = $('#q3_line_height').val();
			var margin = $('#q3_margin_width').val();
			opts.setVal('size', size);
			opts.setVal('height', height);
			opts.setVal('margin', margin);
			GM_addStyle('.q3_cont p { font-size:' + opts.size + 'pt; line-height:' + opts.height + 'px; margin: 10px ' + opts.margin + 'px;}');
			
		});
		
		$('#q3_float1').hide();
		
		$('#q3_recom').live('click', helper.recomLink);
		$('#q3_scroll_click').click(scroller.click);
		$('#q3_scroll_speed_up').click(scroller.speedUp);
		$('#q3_scroll_speed_down').click(scroller.speedDown);
		$('#q3_loadall').click(helper.loadAll);
		
		$('#q3_float').mouseenter(function(){
			$('#q3_float').fadeTo("normal", 1);
			$('#q3_float1').show();
			$('#q3_float2').hide();
		});
		$('#q3_float').mouseleave(function(){
			$('#q3_float1').hide();
			$('#q3_float2').show();
			$('#q3_float').fadeTo("normal", 0.2);
		});
		$('#q3_zoomout').click(function() {
			var title = helper.findStyle('.q3_title');
			var cont = helper.findStyle('.q3_cont p');
			var tn = parseInt(title.fontSize) - 2;
			var cn = parseInt(cont.fontSize) - 2;
			if (tn < 10) {
				tn = 10;
			}
			if (cn < 10) {
				cn = 10;
			}
			title.fontSize = tn+'pt';
			cont.fontSize = cn+'pt';
		})
		$('#q3_zoomin').click(function() {
			var title = helper.findStyle('.q3_title');
			var cont = helper.findStyle('.q3_cont p');
			title.fontSize = (parseInt(title.fontSize) + 2)+'pt';
			cont.fontSize = (parseInt(cont.fontSize) + 2)+'pt';
			
		})
		$('#q3_invert').toggle(function() {
			var style = helper.findStyle('#all_chap');
			style.backgroundColor = '#C1BEBA';
			style.color = 'black';
		},function() {
			var style = helper.findStyle('#all_chap');
			style.color = '#C1BEBA';
			style.backgroundColor = 'black';
		})
		$('#q3_markcheck').change(function() {
			GM_setValue('q3_mark', this.checked);
		})
		if (GM_getValue('q3_mark') != false) {
			$('#q3_markcheck').attr('checked', true);
		} else {
			$('#q3_markcheck').attr('checked', false);
		}
		$('#q3_float').css('background-color', 'rgb(32,181,69)');
		float.time();
	}

		//console.log('float');
		
	var helper = {
		tm:null,
		nowchap:null,
		findStyle : function(name) {
			for (var i=0;i<document.styleSheets.length;i++) {
				var rules = document.styleSheets[i].cssRules;
				for (var j=0;j<rules.length;j++) {
					if (rules[j].selectorText == name) {
						return rules[j].style;
					}
				}
			}
			return null;
		},
		timer: function() {
			var sc = window.pageYOffset;
			var wh = window.innerHeight ? 
				window.innerHeight :
				document.body.clientHeight;
			var total = (document.body.scrollHeight - wh);
			var remain = total - sc;
			if(remain < 1000 && helper.nowchap.nextchap) {
				helper.nowchap.nextchap.draw();
			}
			helper.tm = window.setTimeout(helper.timer, 300);
		},
		loadAll: function() {
			if (helper.tm) {
				clearTimeout(helper.tm);
				helper.tm = null;
			}
			if (helper.nowchap.nextchap && helper.nowchap !=helper.nowchap.nextchap && !helper.nowchap.nextchap.draw()) {
				window.setTimeout(helper.loadAll, 1000);
			} else {
				window.setTimeout(helper.loadAll, 100);
			}
		},
		clean : function () {
			var blank = function(){};
			
			unsafeWindow.document.onkeyup=blank;
			unsafeWindow.document.onkeydown=blank;
			unsafeWindow.document.onkeypress=blank;
			unsafeWindow.document.onmouseup=blank;
			unsafeWindow.document.onmousemove=blank;
			unsafeWindow.document.onmousedown=blank;
			unsafeWindow.document.onclick=blank;
			unsafeWindow.document.body.onclick=blank;
			unsafeWindow.document.oncontextmenu=blank;
			$('body').click(blank).html('<div id="all_chap"></div>');
			$('.q3_mark').live('click', this.markLink);
			
			unsafeWindow.onkeydown = function(evt){
				//console.log(evt.keyCode);
				switch (evt.keyCode){
					case 37:
						location.href = helper.nowchap.prev;
						break;
					case 39:
						location.href = helper.nowchap.next;
						break;
					case 13:
						location.href = helper.nowchap.list;
						break;
				}
			};
		},
		bookmark : function (bookid, chapid) {
			dat = 'bookId=' + bookid + '&chapterId=' + chapid;
			xml = new XMLHttpRequest();
			
			xml.open("POST","http://www.qidian.com/ajax.aspx?opName=AddBookMark",true);
			xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
			
			xml.setRequestHeader("CMFUAJAX-Ver","ver1.0");
			xml.send(dat);
		},
		recommend : function (bookid) {
			dat = 'bookId=' + helper.nowchap.bookid;
			xml = new XMLHttpRequest();
			xml.open("POST","http://www.qidian.com/ajax.aspx?opName=RecomBook",true);
			xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
			
			xml.setRequestHeader("CMFUAJAX-Ver","ver1.0");
			xml.send(dat);
		},
		markLink : function () {
			var chap = $(this).parents('.q3_chap');
			helper.bookmark(chap.attr('bookid'), chap.attr('chapid')) 
		},
		recomLink : function () {
			helper.recommend($(this).parents('.q3_chap').attr('bookid'));
		},
		parseUrl : function (url) {
			var chap = {};
			reg = url.match(/^.+BookReader\/(\d+),(\d+)\..*$/im);
			if (reg){
				chap.bookid = parseInt(reg[1]);
				chap.chapid = parseInt(reg[2]);
				chap.dir = url.replace(/[^\/]+?$/ig, '');
			} else if (url.match(/BookReader\/LastPage\.aspx/im)) {
				chap.last = true;
				chap.ok = true;
			} else {
				chap.ok = false;
			}
			chap.url = url;
			return chap;
		},
		parseFromPage : function (chap) {
			var info = this.parseUrl(location.href.toString());
			for (k in info) {
				chap[k] = info[k];
			}
			content = $('#content').html().replace(/<(div|span|script|center).*?>.*?<\/\s*\1>/ig,'');
			content = content.replace(/<\/?(a|clk|nobr|hr)[^>]*?>/ig, '');
			content = content.replace(/<\/?p[^>]*>/ig, "\n");
			content = content.replace(/()/ig, '');
			content = content.replace(/&nbsp;/ig, ' ');
			content = jQuery.trim(content);
			content = content.replace(/[\s\r|　]*\n[\s\r|　]*/ig, '</p>\n<p>');
			content = "<p>" + content + "</p>";
			chap.cont = content;
			chap.title = $('#lbChapterName').text();
			chap.prev = chap.dir + unsafeWindow.prevpage;
			chap.next = chap.dir + unsafeWindow.nextpage;
			chap.list = chap.dir + unsafeWindow.bookpage.replace(/^.*\/([^\/]+)$/ig, '$1');
			chap.book = chap.url.replace(/^(http:\/\/.+?)\/.*$/ig, '$1') + unsafeWindow.bookpage;
			if (chap.next.match(/BookReader\/LastPage\.aspx/im)) {
				chap.next = 'javascript:void(0);';
			}
			chap.success();
			pool.add(chap);
		},
		parseFromUrl : function(url, chap) {
			var info = this.parseUrl(url);
			for (k in info) {
				chap[k] = info[k];
			}
			if (info.ok != false && !info.last) {
				chap.load();
				pool.add(chap);
				$.get(url, null, this.pageOnLoad);
			}
			return chap;
		},
		pageOnLoad : function (data) {
			var chap = pool.get(this.url);
			txtreg = data.match(/<span\s+.*?id="lbChapterName"\s*.*?>(.+?)<\/span>/im);
			if (txtreg) {
				chap.title = txtreg[1];
			} else {
				if (data.match(/以上就是本作品的最新更新内容/im)) {
					chap.end();
				} else {
					chap.failed();
				}
				return;
			}
			txtreg = data.match(/<div\s+.*?id="content"\s*.*?>[.\s]*<script\s+.*?src='(.+?)'/im);
			if (txtreg) {
				chap.script = txtreg[1];
			} else {
				chap.failed();
				return;
			}

			txtreg = data.match(/<script.*?>\s*prevpage='(.+?)'.*\s*nextpage='(.+?)'.*\s*bookpage='(.+?)'.*\s*<\/script>/im);
			if (txtreg) {
				chap.prev = chap.dir + txtreg[1];
				chap.next = chap.dir + txtreg[2];
				chap.list = chap.dir + txtreg[3].replace(/^.*\/([^\/]+)$/ig, '$1');;
				chap.book = chap.dir.replace(/^(http:\/\/.+?)\/.*$/ig, '$1') + txtreg[3];
				
				if (chap.next.match(/BookReader\/LastPage\.aspx/im)) {
					chap.next = 'javascript:void(0);';
				}
			} else {
				chap.failed();
				return;
			}
			GM_xmlhttpRequest({
				url:chap.script,
				method:"GET",
				overrideMimeType:'text/plain;charset=gb2312',
				onload:helper.txtOnLoad
			});
		},
		txtOnLoad : function(res) {
			var chapid = parseInt(res.finalUrl.replace(/^.*\/(\d+)\.txt$/im, '$1'));
			var chap = pool.get(chapid);
			if (res.status == 200) {
				var cont = res.responseText.replace(/^.+?\('/im, '').replace(/'\).*?$/im, '').replace(/<(div|span|a|script).*?>.*?<\/\s*(div|span|a|script)>/ig, '').replace(/^(?:[\s　]+)?(.*?)(?:[\s　]+)?$/ig, '$1').replace(/<p>[\s　]*/ig, '</p><p>').replace(/<center>.*<\/center>/ig, '').replace(/^(?:<\/p>)?(.*?)(?:<p>)?$/ig, '$1').replace(/<p><hr><\/p>/ig, '');
				if (cont.substr(0, 3) != '<p>'){
					cont = '<p>' + cont;
				}
				chap.cont = cont;
				chap.success();
			} else {
				chap.failed();
				return;
			}
		}
	}
	
		//console.log('helper');
	function chapter (url) {
		var chap = {
			'url':'',
			'dir':'',
			'prev':'',
			'next':'',
			'list':'',
			'book':'',
			'script':'',
			'bookid':0,
			'chapid':0,
			'ok':null,
			'last':false,
			'loading':false,
			'title':'',
			'cont':'',
			'div':null,
			'nextchap':null,
			cleanUp : function () {
				for (k in this) {
					this[k] = null;
				}
			},
			load : function () {
				this.loading = true;
				this.ok = false;
				this.last = false;
				$('#q3_float').css('background-color', '#CC4809');
			},
			end : function () {
				this.loading = false;
				this.ok = true;
				this.last = true;
				$('#q3_float').css('background-color', '#00681C');
			},
			success : function () {
				this.loading = false;
				this.ok = true;
				this.last = false;
				$('#q3_float').css('background-color', '#0075be');
			},
			failed : function () {
				this.loading = false;
				this.ok = false;
				this.last = fasle;
				$('#q3_float').css('background-color', '#790619');
			},
			draw : function () {

				if (this.ok && !this.loading) {
					var str = '';
					if (this.last) {
						str = '<div class="q3_title">公共章节到此结束</div>';
					} else {
						str = '<div class="q3_title">' + this.title + '</div>';
						str += '<div class="q3_cont">' + this.cont + '</div>';
							str += '<div class="q3_nav"><a href="' + this.prev+ '">上页</a> | <a href="' + this.list + '">目</a> | <a href="' + this.book + '">页</a> | <a href="' + this.next + '">下页</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="q3_mark">加入书签</a></div>'
						str += '<hr />';
					}
					this.div.append(str);
					if ($('#q3_markcheck').attr('checked')) {
						helper.bookmark(this.bookid, this.chapid);
					}
					helper.nowchap = this;
					this.loadNext();
					pool.del(this);
					return true;
				}
				return false;
			},
			loadNext : function () {
				if (this.ok && !this.last && !this.loading){
					this.nextchap = new chapter(this.next);
				}
			}
		}
		if (url) {
			helper.parseFromUrl(url, chap);
		} else {
			helper.parseFromPage(chap);
			helper.clean();
		}
		$('#all_chap').append('<div class="q3_chap" bookid="'+chap.bookid+'" chapid="'+chap.chapid+'" id="q3_chap_' + chap.chapid + '"></div>');
		chap.div = $('#q3_chap_' + chap.chapid)
		return chap;
	}
	
	//console.log('chap');
	var main = new chapter();
	
	//console.log('load chap',  main);
	var flt = new float();
	//console.log('load float',  flt);
	main.draw();
	//console.log('draw');
	helper.timer();
	//console.log('init timer');
	
});
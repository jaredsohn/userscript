// ==UserScript==
// @name           起点vip小说阅读器 qidian vip book reader
// @namespace      q3boy <q3boy1@gmail.com>
// @include        http://www.qidian.com/BookReader/vip,*,*.aspx*
// @include        http://vipreader.qidian.com/BookReader/vip,*,*.aspx*
// @include        http://qidian.com/BookReader/vip,*,*.aspx*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

	
$(document).ready(function() {

	GM_addStyle("body { background-color:black; margin:0px; padding:0px;}");
	GM_addStyle(".q3_chap { text-align:center;}");
	GM_addStyle(".q3_chap img {opacity: 0.8; -moz-user-select:none; padding:0px; margin:0px;}");
	GM_addStyle(".q3_title {color:#990000; font-family:'微软雅黑', '宋体', Arial; font-size:30px; margin:15px; }");
	GM_addStyle(".q3_nav {padding:10px;opacity: 0.8; background-color:white; width:680px;}");
	GM_addStyle("a {color: #376F9A ;}a:visited {color: #781C45 ;}a:active {color: #6799C4 ;}");
	GM_addStyle("div#q3_float {margin:0; padding:0.2em; border:1px solid gray; right:2px; bottom:2px; zIndex:999; line-height:1.2em; weight:bold; font-size:12px; color:white; position:fixed;text-align:center;}")
	GM_addStyle("div#q3_float a {font-size:12px; color:white;}");
	GM_addStyle("div#q3_float label,div#q3_float div {font-size:12px;}");
	
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
			dly = GM_getValue('q3scr_delay');
			if (dly > 0) {
				this.delay = dly;
			}
		},
		
		setDelay:function(scrollDelay) {
		console.log(scrollDelay);
			this.delay = scrollDelay;
			GM_setValue('q3scr_delay', scrollDelay);
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
			console.log(scroller);
			if(scroller.isScrolling) {
				scroller.stop();
			} else {
				scroller.start();
			}
		}
	}
	scroller.init();
	
	
	var pool = {
		'pool': new Array(),
		add : function(itm) {
			this.pool[this.key(itm)] = itm;
		},
		key : function (itm) {
			var key = null;
			if (typeof(itm) == 'object') {
				key = itm.chapid * 100 + itm.pageid;
			} else if (typeof(itm) == 'number') {
				key = itm;
			} else {
				var chap = helper.parseUrl(itm);
				if (chap.ok != false) {
					key = chap.chapid * 100 + chap.pageid;
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
	
	var float = function (){
		var float =  {
			'div':null,
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
		var str = '<div id="q3_float"><div id="q3_float1">' +
		'<div><label><input type="checkbox" id="q3_markcheck">自动书签</label></div>' + 
		'<div><a href="javascript:void(0);" id="q3_scroll_click">滚屏</a> <a href="javascript:void(0);" id="q3_scroll_speed_up">快</a> <a href="javascript:void(0);" id="q3_scroll_speed_down">慢</a></div>' +
		'<div><a href="'+main.list+'">书目</a> <a href="'+main.book+'">书页</a></div>' +
		'<div><a href="javascript:void(0);" id="q3_recom">推荐</a> <a href="javascript:void(0);" id="q3_vote">月票</a></div>' +
		'<div><a href="javascript:void(0);" id="q3_loadall">全部预读</a></div>' +
		'</div>' + 
		'<div id="q3_float2"><div class="time"></div></div></div>';

		$('body').append(str);
		$('#q3_float1').hide();
		
		$('#q3_mark').click(helper.markLink);
		$('#q3_recom').click(helper.recomLink);
		$('#q3_scroll_click').click(scroller.click);
		$('#q3_scroll_speed_up').click(scroller.speedUp);
		$('#q3_scroll_speed_down').click(scroller.speedDown);
		$('#q3_loadall').click(helper.loadAll);
		
		
		$('#q3_float').mouseover(function(){
			$('#q3_float1').show();
			$('#q3_float2').hide();
		});
	
		$('#q3_float').mouseout(function(){
			$('#q3_float1').hide();
			$('#q3_float2').show();
		});

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

	var helper = {
		tm:null,
		nowchap:null,
		imgtmp:null,
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
			var sc = document.body.scrollTop;
			var wh = window.innerHeight ? 
				window.innerHeight :
				document.body.clientHeight;
			var total = (document.body.scrollHeight - wh);
			var remain = total - sc;
			if(remain < 1000 && helper.nowchap && helper.nowchap.nextchap) {
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
			$('#q3_vote').live('click', this.voteLink);
			unsafeWindow.onkeydown = function(evt){
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
			xml.open("POST","http://vipreader.qidian.com/ajax.aspx?opName=AddBookMark",true);
			xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
			
			xml.setRequestHeader("CMFUAJAX-Ver","ver1.0");
			xml.send(dat);
			
		
		},
		recommend : function (bookid) {
			dat = 'bookId=' + helper.nowchap.bookid;
			xml = new XMLHttpRequest();
			xml.open("POST","http://vipreader.qidian.com/ajax.aspx?opName=RecomBook",true);
			xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
			
			xml.setRequestHeader("CMFUAJAX-Ver","ver1.0");
			xml.send(dat);
		},
			
		vote : function (bookid) {
			dat = 'bookId=' + helper.nowchap.bookid;
			xml = new XMLHttpRequest();
			xml.open("POST","http://vipreader.qidian.com/ajax.aspx?opName=MonthlyVote",true);
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
		voteLink : function () {
			helper.vote($(this).parents('.q3_chap').attr('bookid'));
		},
		parseUrl : function (url) {
			var chap = {};
			reg = url.match(/^.+BookReader\/vip,(\d+),(\d+)(,(\d+))?\..*$/im);
			if (reg){
				chap.bookid = parseInt(reg[1]);
				chap.chapid = parseInt(reg[2]);
				if (reg[4]) {
					chap.pageid = parseInt(reg[4])
				} else {
					chap.pageid = 0;
				}
				chap.dir = url.replace(/[^\/]+?$/ig, '');
			}else if (url.match(/BookReader\/LastPage\.aspx/im)) {
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
			chap.title = $('#lbChapterName').text();
			chap.img = $('#Image1').attr('src');
			chap.prev = chap.dir + unsafeWindow.prevpage;
			chap.next = chap.dir + unsafeWindow.nextpage;
			chap.list = 'http://www.qidian.com/BookReader/' + unsafeWindow.bookpage.replace(/^.*\/([^\/]+)$/ig, '$1');
			chap.book = unsafeWindow.bookpage;
			if (chap.next.match(/BookReader\/LastPage\.aspx/im)) {
				chap.next = 'javascript:void(0);';
			}
			chap.success();
			pool.add(chap);
			/*GM_xmlhttpRequest({
				url:chap.img,
				method:"GET",
				onload:helper.imgok
			});*/
		},
		/*imgok : function (res) {
			var chap = pool.get(location.href.toString());

			if (res.status == 200) {
				chap.success();
				chap.draw();
			} else {
				chap.failed();
			}
		},*/
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
			txtreg = data.match(/<img\s+.*?id="Image1"\s*.*src="(.+?)"/im);
			if (txtreg) {
				chap.img = txtreg[1];
			} else {
				chap.failed();
				return;
			}
			txtreg = data.match(/<script.*?>\s*prevpage='(.+?)'.*\s*nextpage='(.+?)'.*\s*bookpage='(.+?)'.*\s*<\/script>/im);
			if (txtreg)
			{
				chap.prev = chap.dir + txtreg[1];
				chap.next = chap.dir + txtreg[2];
				chap.list ='http://www.qidian.com/BookReader/' + txtreg[3].replace(/^.*\/([^\/]+)$/ig, '$1');;
				chap.book = txtreg[3];
				
				if (chap.next.match(/BookReader\/LastPage\.aspx/im)) {
					chap.next = 'javascript:void(0);';
				}
			} else {
				chap.failed();
				return;
			}
			GM_xmlhttpRequest({
				url:chap.img,
				method:"GET",
				onload:helper.imgOnLoad
			});
		},
		imgOnLoad : function(res) {
			var reg = res.finalUrl.match(/^.+BookReader\/ChapterImage\.aspx\?bookId=(\d+)&amp;chapterId=(\d+)&amp;page=(\d+).*$/im);

			var chap = pool.get(parseInt(reg[2]) * 100 + parseInt(reg[3]));
			if (res.status == 200) {
				chap.success();
			} else {
				chap.failed();
			}
		}
	}
	
	function chapter (url) {
		var chap = {
			'url':'',
			'dir':'',
			'prev':'',
			'next':'',
			'list':'',
			'book':'',
			'img':'',
			'bookid':0,
			'chapid':0,
			'pageid':0,
			'ok':null,
			'last':false,
			'loading':false,
			'title':'',
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
						if (this.pageid <= 0){
							str = '<div class="q3_title">' + this.title + '</div>';
						}
						
						str += '<img class="q3_cont" src="' + this.img + '" />';
						str += '<div align="center"><div class="q3_nav"><a href="' + this.prev+ '">上页</a> | <a href="' + this.list + '">目</a> | <a href="' + this.book + '">页</a> | <a href="' + this.next + '">下页</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" class="q3_mark">加入书签</a></div></div>'
					}
					this.div.append(str);
					if ($('#q3_markcheck').attr('checked')) {
						helper.bookmark(this.bookid, this.chapid);
					}
					helper.nowchap = this;
					this.loadNext();
					pool.del(this);
				}
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
		$('#all_chap').append('<div class="q3_chap" bookid="'+chap.bookid+'" chapid="'+chap.chapid+'" pageid="'+chap.pageid+'" id="q3_chap_' + chap.chapid + '"></div>');
		chap.div = $('#q3_chap_' + chap.chapid)
		return chap;
	}
	var main = new chapter();
	new float();
	main.draw();
	helper.timer()
	
});
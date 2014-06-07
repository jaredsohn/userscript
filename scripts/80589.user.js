// ==UserScript==
// @name           Pixiv Custom Viewer
// @version        2.4.2
// @namespace      http://run.rdy.jp/memo/
// @description    Improve viewing of Pixiv
// @include        http://www.pixiv.net/*
// @exclude        http://www.pixiv.net/event_detail.php*
// @exclude        http://www.pixiv.net/bookmark_detail.php*
// @exclude        http://www.pixiv.net/bookmark_add.php*
// @exclude        http://www.pixiv.net/stacc/*
// @exclude        http://www.pixiv.net/novel/*
// ==/UserScript==

/*----------------------------------------------------------------------------------------
//iframe内なら処理しない
*---------------------------------------------------------------------------------------*/
try { if(top !== self) throw 0 }catch([]){ return }

/*----------------------------------------------------------------------------------------
* Use jQuery on Greasemonkey for Chrome
* http://www.otchy.net/20110607/use-jquery-on-greasemonkey-for-chrome/
*---------------------------------------------------------------------------------------*/
(function (d, func) {
	var h = d.getElementsByTagName('head')[0];
	var s1 = d.createElement("script");
	s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
	s1.addEventListener('load', function() {
		var s2 = d.createElement("script");
		s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
		h.appendChild(s2);
	}, false);
	h.appendChild(s1);
})(document, function($) {
// Start -------------------------------------------------------------------------------//
	
	/*--------------------------------------------------------------------------------------
	* ModalWindow
	*-------------------------------------------------------------------------------------*/
	var ModalWindow = function(options) {
		//-------------------------------------------
		// ModalWindow.settings
		// name      : ModalWindowの名前
		// data      : 表示するコンテンツ
		// showFunc  : 表示開始時に実行する処理
		// closeFunc : 表示終了時に実行する処理
		// lock      : 終了処理を禁止するか
		//-------------------------------------------
		this.settings = {
			name      : 'mWin',
			data      : $('<div/>'),
			showFunc  : function() {},
			closeFunc : function() {},
			lock      : false,
		};
		$.extend(this.settings, options);
		//glayLayer
		this.glayLayer = $('<div/>').addClass('ModalWindowGlayLayer');
		//WindowScroll
		this.scrollX   = 0;
		this.scrollY   = 0;
		//init()
		this.init();
	};
	ModalWindow.prototype = {
		//-------------------------------------------
		// ModalWindow.init()
		//-------------------------------------------
		init: function() {
			var self = this;
			//glayLayerに右クリックイベントを追加
			this.glayLayer.bind('mouseup', function(e){
				if(PcvApi.getStorage('pcvViewerClose') != 'pcvVCR'){ if(!self.settings.lock && e.which == 1 && $(e.target).hasClass('ModalWindowGlayLayer')){ self.close(); } }
				else                                               { if(!self.settings.lock && e.which == 3){ self.close(); } }
			}).bind('contextmenu', function(e){ return false; }).append(self.settings.data);
		},
		//-------------------------------------------
		// ModalWindow.open()
		//-------------------------------------------
		open: function(mode) {
			//スクロールバー非表示
			this.scrollX = $('html').scrollLeft();
			this.scrollY = $('html').scrollTop();
			$('html').css('overflow','hidden').scrollLeft(this.scrollX).scrollTop(this.scrollY);
			//Bodyに追加して表示
			this.glayLayer.attr('id', this.settings.name).appendTo($('body'));
			if(mode=='slide') { this.glayLayer.addClass('mwSlide').slideDown(800, this.settings.showFunc); }
			else              { this.glayLayer.addClass('mwFade').fadeIn(500, this.settings.showFunc); }
		},
		//-------------------------------------------
		// ModalWindow.close()
		//-------------------------------------------
		close: function(mode) {
			this.settings.closeFunc();
			if($(this.glayLayer).hasClass('mwSlide')) { $(this.glayLayer).slideUp(300, function(){ $(this).remove(); }); }
			else                                      { $(this.glayLayer).fadeOut(300, function(){ $(this).remove(); }); }
			//スクロールバー表示
			if(mode!=false){
				this.scrollX = $('html').scrollLeft();
				this.scrollY = $('html').scrollTop();
				$('html').css('overflow','auto').scrollLeft(this.scrollX).scrollTop(this.scrollY);
			}
		}
	};

	/*--------------------------------------------------------------------------------------
	* FloatingWindow
	*-------------------------------------------------------------------------------------*/
	var FloatingWindow = function(options) {
		//-------------------------------------------
		// FloatingWindow.settings
		//-------------------------------------------
		this.settings = {
			id     : '',
			title  : '',
			data   : '',
			target : document.body,
			left   : '0px',
			top    : '0px',
			width  : 'auto',
			height : 'auto',
			zindex : 10,
			flg    : false,
		};
		$.extend(this.settings, options);
		//FloatingWindow
		this.fWin     = $('<dl/>').addClass('FloatingWindowTemplate').attr('id', this.settings.id);
		//Position
		this.position = null;
		//Loading Message
		this.loading  = $('<p/>').addClass('FloatingWindowLoading').text('No Data');
		//init()
		this.init();
	};
	FloatingWindow.prototype = {
		//-------------------------------------------
		// FloatingWindow.init()
		//-------------------------------------------
		init: function() {
			//dt dd 追加
			var dt = $('<dt/>'); dt.bind('mousedown', this, this.drag);
			var dd = $('<dd/>'); dd.bind('mouseup',   this, this.resize).bind('dblclick', this, this.resetSize);
			this.fWin.append(dt).append(dd);
			//Position設定
			this.position = PcvApi.getStorage('pcv'+this.settings.id+'Position')
			if(this.position==null){
				var p = new Object();
				var s = this.settings;
				p.id     = s.id;
				p.left   = s.left;
				p.top    = s.top;
				p.width  = s.width;
				p.height = s.height;
				p.zindex = s.zindex;
				p.flg    = s.flg;
				this.position = p;
				PcvApi.setStorage('pcv'+p.id+'Position', p);
			}
			//console.log(PcvApi.getStorage('pcv'+this.settings.id+'Position'))
		},
		//-------------------------------------------
		// FloatingWindow.changeTitle()
		//-------------------------------------------
		changeTitle: function(title) {
			$('dt', this.fWin).empty().append(title);
		},
		//-------------------------------------------
		// FloatingWindow.changeContents()
		//-------------------------------------------
		changeContents: function(data) {
			$(data).bind('mouseup', function(e){ e.stopPropagation(); });
			$('dd', this.fWin).empty().append(data);
		},
		//-------------------------------------------
		// FloatingWindow.open()
		//-------------------------------------------
		open: function() {
			var s = this.settings;
			var p = this.position;
			//追加
			this.fWin.appendTo( $(s.target) );
			if(s.title != ''){ this.changeTitle(s.title);   } else { this.changeTitle('No Title'); }
			if(s.data  != ''){ this.changeContents(s.data); } else { this.changeContents(this.loading); }
			//表示位置
			this.fWin.css({ left:p.left, top:p.top, zIndex:p.zindex });
			$('dd',this.fWin).css({ width:p.width, height:p.height });
			//表示
			if(p.flg){ this.fWin.css('display','block'); }
		},
		//-------------------------------------------
		// FloatingWindow.toggle()
		//-------------------------------------------
		toggle: function(mode) {
			var p = this.position;
			//強制表示
			if(mode==1)     { this.fWin.fadeIn(300);  p.flg = true; }
			else if(mode==0){ this.fWin.fadeOut(300); p.flg = false; }
			else {
				//表示切替
				var d = this.fWin.css('display');
				if(d=='none'){ this.fWin.fadeIn(300);  p.flg = true; }
				else         { this.fWin.fadeOut(300); p.flg = false; }
			}
			PcvApi.setStorage('pcv'+p.id+'Position', p);
		},
		//-------------------------------------------
		// FloatingWindow.drag()
		//-------------------------------------------
		drag: function(e) {
			e.preventDefault();
			//参照
			var fWin = e.data.fWin;
			var dt   = $(this);
			var p    = e.data.position;
			//前面へ
			e.data.fore(p.id);
			//マウス情報の記憶
			dt.data('onDrag', false)
			  .data('clickPointX', e.pageX - dt.offset().left)
			  .data('clickPointY', e.pageY - dt.offset().top);
			//dt領域から外れても動作するように、documentに定義
			$(document)
			.bind('mousemove', function(e){ //mousemoveでDrag
				dt.data('onDrag', true);
				fWin.css({
					left:e.pageX - dt.data('clickPointX') - $(document).scrollLeft() + 'px',
					top :e.pageY - dt.data('clickPointY') - $(document).scrollTop()  + 'px'
				});
				dt.css('cursor', 'move');
			})
			.bind('mouseup', function(e){
				if( dt.data('onDrag') ){//ドラッグした場合は位置情報保存
					p.left = fWin.css('left');
					p.top  = fWin.css('top');
					PcvApi.setStorage('pcv'+p.id+'Position', p);
				}
				$(document).unbind('mousemove').unbind('mouseup');
				dt.css('cursor', 'pointer');
			});
		},
		//-------------------------------------------
		// FloatingWindow.resize()
		//-------------------------------------------
		resize: function(e) {
			//参照
			var dd   = $(this);
			var p    = e.data.position;
			//サイズ記憶
			p.width  = dd.width() +'px';
			p.height = dd.height()+'px';
			PcvApi.setStorage('pcv'+p.id+'Position', p);
		},
		//-------------------------------------------
		// FloatingWindow.resetSize()
		//-------------------------------------------
		resetSize: function(e) {
			//参照
			var dd   = $(this);
			var p    = e.data.position;
			//reset
			dd.css({ width:'auto', height:'auto' })
			//サイズ記憶
			p.width  = 'auto';
			p.height = 'auto';
			PcvApi.setStorage('pcv'+p.id+'Position', p);
		},
		//-------------------------------------------
		// FloatingWindow.fore()
		//-------------------------------------------
		fore: function(id) {
			var zIndexList = new Array();
			var windowList = $('.FloatingWindowTemplate');
			windowList.each(function(index){
				if( $(this).attr('id') != id ){ zIndexList.push({id:$(this).attr('id'), zIndex:$(this).css('zIndex')}) }
			});
			zIndexList.sort(function (a, b){return a.zIndex - b.zIndex;});
			//console.log(zIndexList)
			//深度の振り直し
			for(var num=0; num<zIndexList.length; num++){
				var w = $('#'+zIndexList[num].id);
				w.css('zIndex', num+10);
				var key = 'pcv'+zIndexList[num].id+'Position';
				var p   = PcvApi.getStorage(key);
				p.zindex = w.css('zIndex');
				PcvApi.setStorage(key, p);
			}
			this.fWin.css('zIndex', windowList.length-1+10);
			this.position.zindex = windowList.length-1+10;
			PcvApi.setStorage('pcv'+id+'Position', this.position);
		},
		//-------------------------------------------
		// FloatingWindow.close()
		//-------------------------------------------
		close: function() {
		},
		
	};

	/*--------------------------------------------------------------------------------------
	* LoadingImage
	*-------------------------------------------------------------------------------------*/
	var LoadingImage = function(arg)
	{
		//引数デフォルト値
		arg = $.extend({text:''}, arg);
		//Box
		var box = $('<div/>').attr('class','pcvLoadingImage');
		var txt = $('<p/>').html(arg.text);
		var img = $('<img/>').attr('src', 'http://source.pixiv.net/source/images/loading-horizontal.gif');
		//格納
		if(arg.text != ''){ box.append(txt); }
		box.append(img);
		//クリック無視
		box.bind('click', function(e){ e.stopPropagation(); });
		//位置調整用
		img.bind('load', function(e){ box.css({ marginTop:'-'+(box.height()/2+13)+'px', marginLeft:'-'+(box.width()/2+10)+'px' }).show(); });
		return box;
	};

	/*--------------------------------------------------------------------------------------
	* ThumbnailSearch
	*-------------------------------------------------------------------------------------*/
	var ThumbnailSearch = function(arg)
	{
		//引数デフォルト値
		arg = $.extend({target:document.body}, arg);
		//サーチ結果を返す
		return $('img', arg.target).filter(function(index){
			var regex = /i(mg)*\d*\.pixiv\.net\/(img\d*\/)*img\/.*\/.*(_s\.|_100\.)(jpg|png|gif)/;
			return ( regex.test($(this).attr('src')) || regex.test($(this).attr('data-src')) );
		});
	};

	/*--------------------------------------------------------------------------------------
	* ThumbnailInfo
	*-------------------------------------------------------------------------------------*/
	var ThumbnailInfo = function(thum)
	{
		var info = new Object();
		//Image Path
		var imgUrl;
		var mImgUrl;
		if( $(thum).attr('data-src') != undefined ) {
			imgUrl  = $(thum).attr('data-src').replace(/_s\.|_100\./, '\.');
			mImgUrl = $(thum).attr('data-src').replace(/_s\.|_100\./, '_m\.');
		} else {
			imgUrl  = $(thum).attr('src').replace(/_s\.|_100\./, '\.');
			mImgUrl = $(thum).attr('src').replace(/_s\.|_100\./, '_m\.');
		}
		//Page URL
		var anchor;
		if( $(thum).parent()[0].nodeName == 'A' ){ anchor = $(thum).parent(); }
		else if( $(thum).parent().parent()[0].nodeName == 'A' ){ anchor = $(thum).parent().parent(); }
		var pageUrl     = 'http://www.pixiv.net/' + anchor.attr('href').replace(/http\:\/\/www\.pixiv\.net\//, '').replace(/^\//, '');// + '&c_open=1';
		var pageUrlm    = 'http://p.tl/i/' + anchor.attr('href').match(/\d*$/)[0];
		var mangaUrl    = pageUrl.replace(/medium/, 'manga');
		var bookmarkUrl = pageUrl.replace(/member_illust\.php\?mode\=medium\&/, 'bookmark_add\.php\?type\=illust\&');
		var detailUrl   = pageUrl.replace(/member_illust\.php\?mode\=medium\&/, 'bookmark_detail\.php\?');
		//Title
		var title  = $('h1', anchor).text();
		if( title  == '' ) { title  = $('h2', anchor).text(); }
		if( title  == '' ) { title  = $('h2 > a', anchor.parent()).text(); }
		if( title  == '' ) { title  = anchor.text(); }
		title = title.replace(/^\s*/, '').replace(/\s*$/, '');
		//Author
		var author = $('.user > a', anchor.parent()).text();
		if( author == '' ) { author = $('div.artist > a', anchor.parent()).text(); }
		if( author == '' ) { author = $('span.f10 > a', anchor.parent()).text(); }
		if( author == '' ) { author = $(thum).attr('title'); if(author){ author = author.replace(title+'/', ''); }}
		if( author == '' ) { author = $('.profile_area .f18b > a').text(); }
		if( author == undefined ) { author = 'unknown'; }
		//Illust ID
		var id     = $(thum).attr('pcv_illust_id');
		//top left
		var top    = $(thum).offset().top;
		var left   = $(thum).offset().left;
		//test
		//console.log('タイトル　: ' + title + '\n作者　　　: ' + author + '\n画像パス　: ' + imgUrl + '\n中画像パス: ' + mImgUrl + '\n個別ページ: ' + pageUrl + '\n漫画ページ: ' + mangaUrl + '\nブクマ登録: ' + bookmarkUrl + '\nブクマ詳細: ' + detailUrl);
		//return
		info.imgUrl      = imgUrl;
		info.mImgUrl     = mImgUrl;
		info.pageUrl     = pageUrl;
		info.pageUrlm    = pageUrlm;
		info.mangaUrl    = mangaUrl;
		info.bookmarkUrl = bookmarkUrl;
		info.detailUrl   = detailUrl;
		info.title       = title;
		info.author      = author;
		info.id          = id;
		info.top         = top;
		info.left        = left;
		return info;
	};

	/*--------------------------------------------------------------------------------------
	* ThumbnailMenu
	*-------------------------------------------------------------------------------------*/
	var ThumbnailMenu = function(options) {
		//-------------------------------------------
		// ThumbnailMenu.settings
		// name : ThumbnailMenuの名前
		// thum : メニューを表示させるサムネイル
		//-------------------------------------------
		this.settings = {
			name : 'pcvThumbnailMenu',
			thum : undefined,
		};
		$.extend(this.settings, options);
		//init
		if(this.settings.thum === undefined){ alert('error:ThumbnailMenu()\nサムネイルが指定されていません。') }
		else { this.init(); }
	};
	ThumbnailMenu.prototype = {
		//-------------------------------------------
		// ThumbnailMenu.init()
		//-------------------------------------------
		init: function() {
			var self   = this;
			var thum   = this.settings.thum;
			var timerID;
			//MouseEvent
			$(thum).parent().bind('mouseover', function(e){
				if(PcvApi.getStorage('pcvThumMenuUse') != 'pcvTMUNo'){
					var reception = PcvApi.getStorage('pcvThumMenuReception'); if(reception == null){ reception = 500; } else { reception = reception.replace('pcvTMR',''); }
					//console.log(reception);
					timerID = setTimeout(function(){ self.setMenu(thum); }, reception);
				}
			})
			.bind('mouseout',    function(e){ clearTimeout(timerID); })
			.bind('click',       function(e){ if(PcvApi.getStorage('pcvThumMenuUse') == 'pcvTMUNo'){ e.preventDefault(); } })
			.bind('contextmenu', function(e){ if(PcvApi.getStorage('pcvThumMenuUse') == 'pcvTMUNo'){ return false; } })
			.bind('mouseup',     function(e){
				if(PcvApi.getStorage('pcvThumMenuUse') == 'pcvTMUNo' && e.which == 1){ self.setViewer(thum); }
				if(PcvApi.getStorage('pcvThumMenuUse') == 'pcvTMUNo' && e.which == 3){ self.setAnchor(thum); }
			})
		},
		//-------------------------------------------
		// ThumbnailMenu.setMenu()
		//-------------------------------------------
		setMenu: function(thum) {
			//Remove
			$('div.'+this.settings.name).remove();
			//Info
			var info = ThumbnailInfo(thum);
			//Menu
			var menu = $('<div/>').addClass(this.settings.name).appendTo($('body'));
			var img  = $(thum).clone().appendTo(menu);             this.windowOpen(menu, img, info.pageUrl);
			var btn1 = this.createButton('画像').appendTo(menu);   this.imageOpen(menu, btn1, info);
			var btn2 = this.createButton('評価').appendTo(menu);   this.submitTenPt(btn2, info);
			var btn3 = this.createButton('B!登録').appendTo(menu); this.windowOpen(menu, btn3, info.bookmarkUrl);
			var btn4 = this.createButton('B!詳細').appendTo(menu); this.windowOpen(menu, btn4, info.detailUrl);
			//adress
			var adress = $('<textarea/>').attr({ value:info.title + ' | ' + info.author + ' ' + info.pageUrlm });
			var btn5 = this.createButton(adress).appendTo(menu);
			adress.select();
			//サイズ取得
			var maxSize = PcvApi.getStorage('pcvThumMenuSize'); if(maxSize == null){ maxSize = 400; } else { maxSize = maxSize.replace('pcvTMS',''); }
			var cutSize = 22; if(maxSize == 200){ cutSize = 12; } else if(maxSize == 300){ cutSize = 18; } else if(maxSize == 600){ cutSize = 40; }
			//画像表示サイズの設定
			var ibw = $(thum).width()  * (maxSize/150);  img.css('width', ibw);
			var ibh = $(thum).height() * (maxSize/150); img.css('height', ibh);
			//拡大画像サイズ調整
			if(ibw < ibh) { img.css({width:'auto', height:maxSize+'px'}); } else { img.css({width:maxSize+'px', height:'auto'}); }
			//メニュー表示サイズの記憶
			var mbw = ibw - cutSize; var mbh = ibh - cutSize; if(mbw < 120) { mbw = 120; }; if(mbh < 120) { mbh = 120; };
			//console.log(menu.width()+'/'+menu.height());
			//中央座標を取得
			var cx = $(thum).offset().left + ($(thum).width()  / 2);
			var cy = $(thum).offset().top  + ($(thum).height() / 2);
			//最終座標を取得
			var ex = cx - (mbw / 2); var ey = cy - (mbh / 2);
			if(ex < 0){ ex = 0 + $('html').scrollLeft(); }
			if(ey < 0){ ey = 0; }
			if( window.innerWidth < ex+mbw){ ex = window.innerWidth - mbw - 15 + $('html').scrollLeft(); }
			//最小化
			menu.css({left:cx, top:cy, width:'0px', height:'0px'});
			img.css({width:'0px', height:'0px'});
			//アニメーション
			menu.animate({left:ex, top:ey, width:mbw, height:mbh}, 200, function(){
				var x1 = $(this).offset().left;
				var y1 = $(this).offset().top;
				var x2 = $(this).offset().left + $(this).outerWidth();
				var y2 = $(this).offset().top  + $(this).outerHeight();
				$(this).bind('mouseout', function(e){ if(e.pageX<x1 || x2<e.pageX || e.pageY<y1 || y2<e.pageY){ $(this).animate({left:cx, top:cy, width:0, height:0}, 100, function(){ $(this).remove(); }) } });
			});
			img.animate({width:ibw, height:ibh}, 1, function(){ $(this).attr('src', info.mImgUrl); });
			//中央配置
			img.css({position:'absolute', top:'50%', left:'50%', marginTop:'-'+(ibh/2)+'px', marginLeft:'-'+(ibw/2)+'px'});
			btn1.css('lineHeight', mbh*0.4+'px');
			btn2.css('lineHeight', mbh*0.4+'px');
			btn3.css('lineHeight', mbh*0.4+'px');
			btn4.css('lineHeight', mbh*0.4+'px');
		},
		//-------------------------------------------
		// ThumbnailMenu.setViewer()
		//-------------------------------------------
		setViewer: function(thum) {
			$('div.'+this.settings.name).remove();
			var info = ThumbnailInfo(thum);
			PcvApi.viewerOpen(info);
		},
		//-------------------------------------------
		// ThumbnailMenu.setAnchor()
		//-------------------------------------------
		setAnchor: function(thum) {
			var info = ThumbnailInfo(thum);
			window.location.href = info.pageUrl;
		},
		//-------------------------------------------
		// ThumbnailMenu.createButton()
		//-------------------------------------------
		createButton: function(str) {
			return btn = $('<p/>').html(str);
		},
		//-------------------------------------------
		// ThumbnailMenu.windowOpen()
		//-------------------------------------------
		windowOpen: function(menu, btn, url) {
			$(btn).bind('click', function(){ $(menu).remove(); PcvApi.windowOpen(url); });
		},
		//-------------------------------------------
		// ThumbnailMenu.imageOpen()
		//-------------------------------------------
		imageOpen: function(menu, btn, info) {
			$(btn).bind('click', function(){ $(menu).remove(); PcvApi.viewerOpen(info); });
		},
		//-------------------------------------------
		// ThumbnailMenu.submitTenPt()
		//-------------------------------------------
		submitTenPt: function(btn, info) {
			$(btn).bind('click', function(){ PcvApi.submitPoint(info, 10) });
		},
	};

	/*--------------------------------------------------------------------------------------
	* ImageViewer
	*-------------------------------------------------------------------------------------*/
	var ImageViewer = function(options) {
		//-------------------------------------------
		// ImageViewer.settings
		// name      : ModalWindowの名前
		//-------------------------------------------
		this.settings = {
			name : PcvApi.viewerName,
			url  : '',
		};
		$.extend(this.settings, options);
		//init()
		this.init();
	};
	ImageViewer.prototype = {
		//-------------------------------------------
		// ImageViewer.init()
		//-------------------------------------------
		init: function() {
			
		},
		//-------------------------------------------
		// ImageViewer.open()
		//-------------------------------------------
		open: function() {
			//ModalWindow ID
			var id   = this.settings.name;
			var url  = this.settings.url;
			//Image Load
			var siFunc  = this.showImage;
			var img     = new Image();
			img.onload  = function(){ siFunc(img, id); }
			img.onerror = function(){
				img.onerror = function(){ alert('画像読み込み失敗'); $('#'+id).fadeOut(300, function(){ $(this).remove() }); }
				img.src     = url.replace(/_big/, '');
			}
			img.src     = url
			$(img).addClass('pcvImageViewerIMG')
		},
		//-------------------------------------------
		// ImageViewer.showImage()
		//-------------------------------------------
		showImage: function(img, id) {
			//Loading画像消去
			$('.pcvLoadingImage').remove();
			//表示サイズ調整
			var baseW = 1;
			var baseH = 1;
			var imgW  = img.width;
			var imgH  = img.height;
			var winW; if(window.innerWidth) { winW = window.innerWidth;  } else { winW = document.body.clientWidth; }  winW -= 40;
			var winH; if(window.innerHeight){ winH = window.innerHeight; } else { winH = document.body.clientHeight; } winH -= 40;
			//Toolbar&漫画&Selecter対策
			var mvHeight = 0;
			var tbHeight = 0;
			if(PcvApi.getStorage('pcvToolBarShow') == 'pcvTBSYes'){ tbHeight = $('#pcvToolbar').height(); }
			if($('#pcvMangaViewer').height() != null){ mvHeight = $('#pcvMangaViewer').height(); }
			$('.pcvSelecter').css({ height:$('#'+id).height()*0.95-mvHeight-tbHeight+'px', top:tbHeight+$('#'+id).height()*0.025+'px' });
			//
			winH = winH - mvHeight - tbHeight;
			//縮小比率計算
			if(winW <= imgW)  { baseW = winW / imgW; } //横
			if(winH <= imgH)  { baseH = winH / imgH; } //縦
			//縮小率の高い方に合わせる
			if(baseW < baseH) { $(img).css({ width:(imgW * baseW) + 'px', height:(imgH * baseW) + 'px' }); }
			else              { $(img).css({ width:(imgW * baseH) + 'px', height:(imgH * baseH) + 'px' }); }
			//調整
			$(img).css({ marginTop:'-'+($(img).height()/2+10+(mvHeight/2)-(tbHeight/2))+'px', marginLeft:'-'+($(img).width()/2+10)+'px'});
			//追加
			$('#'+id).append(img);
			//フルサイズ対応 -----------------------
			//if( baseW!=1 || baseH!=1 ){
				$(img).bind('click', function(e){
					e.stopPropagation();
					//BOX
					var box  = $('<div/>').addClass('pcvImageViewerFull').appendTo($(img).parent());
					var fImg = $(img).clone().appendTo(box);
					fImg.bind('load', function(){
						//実サイズ表示
						fImg.css({ left:'0px', top:'0px', position:'relative', width:'auto', height:'auto', margin:'0', borderRadius:'0' });
						var winW; if(window.innerWidth) { winW = window.innerWidth;  } else { winW = document.body.clientWidth; }
						var winH; if(window.innerHeight){ winH = window.innerHeight; } else { winH = document.body.clientHeight; }
						if(fImg.width()  < winW) { fImg.css({left:'50%', marginLeft:'-'+(fImg.width() /2+10)+'px'}); }
						if(fImg.height() < winH) { fImg.css({top :'50%', marginTop :'-'+(fImg.height()/2+10)+'px'}); }
					});
					if(PcvApi.getStorage('pcvViewerClose') != 'pcvVCR'){ fImg.bind('contextmenu', function(e){ e.stopPropagation(); }); }
					//クリックで消去
					box.bind('click', function(e){ e.stopPropagation(); box.remove(); });
					//表示
					box.css({ opacity:'1' });
					if(PcvApi.getStorage('pcvViewerClose') != 'pcvVCR'){ box.bind('mouseup', function(e){ e.stopPropagation(); }); }
				}).css('cursor','ne-resize');
			//}
			//表示
			if(PcvApi.getStorage('pcvViewerClose') != 'pcvVCR'){ 
				$(img).bind('mouseup', function(e){ e.stopPropagation(); }).bind('contextmenu', function(e){ e.stopPropagation(); });
			}
			$(img).show();
			//カバー削除
			PcvApi.removeCover();
		},
		//-------------------------------------------
		// ImageViewer.changImg()
		//-------------------------------------------
		changeImg: function(url) {
			$('.pcvImageViewerIMG').fadeOut(300, function(){ $(this).remove(); });
			$('.pcvImageViewerFull').remove();
			//ModalWindow ID
			var id   = this.settings.name;
			//loading
			$('#'+id).append( LoadingImage() );
			//Image Load
			var siFunc  = this.showImage;
			var img     = new Image();
			img.onload  = function(){ siFunc(img, id); }
			img.onerror = function(){
				img.onerror = function(){ alert('画像読み込み失敗'); $('#'+id).fadeOut(300, function(){ $(this).remove() }); }
				img.src     = url.replace(/_big/, '');
			}
			img.src     = url;
			$(img).addClass('pcvImageViewerIMG');
		},
		//-------------------------------------------
		// ImageViewer.add()
		//-------------------------------------------
		add: function(contents) {
			$('#'+this.settings.name).append(contents);
		},
	};

	/*--------------------------------------------------------------------------------------
	* MangaViewer
	*-------------------------------------------------------------------------------------*/
	var MangaViewer = function(options) {
		//-------------------------------------------
		// MangaViewer.settings
		// name      : ModalWindowの名前
		//-------------------------------------------
		this.settings = {
			target  : PcvApi.viewerName,
			name    : 'pcvMangaViewer',
			url     : '',
			current : 0,
		};
		$.extend(this.settings, options);
		//init()
		this.init();
	};
	MangaViewer.prototype = {
		//-------------------------------------------
		// MangaViewer.init()
		//-------------------------------------------
		init: function() {
		},
		//-------------------------------------------
		// MangaViewer.open()
		//-------------------------------------------
		open: function() {
			//ModalWindow ID
			var iv;
			var iId    = this.settings.target;
			var mId    = this.settings.name;
			var self   = this;
			//イラストページの読み込み
			var iframe = $('<iframe/>').css({widht:'0px', height:'0px', position:'absolute'}).appendTo($('#'+iId));
			iframe.bind('load', function(){
				//設定値取得
				var page      = this.contentWindow.document;
				var pageTotal = $('#page-number span.total', page).text().match(/\d*P/)[0].match(/\d*/)[0];
				var imageBase = $('div.image-container:eq(0) > img', page).attr('src');
				var imagePath = imageBase.replace(/_p/, '_big_p');
				//test
				//console.log( 'ページ数　：'+pageTotal+'\nベースPath：'+imageBase+'\n一枚目　　：'+imagePath )
				//ImageViewer起動
				iv = new ImageViewer({name:iId, url:imagePath});
				//ページリストを表示
				iv.add(self.pageList(mId, pageTotal, imageBase, iv));
				iv.open();
				//ページセレクタ
				self.pageSelecter($('#'+mId));
			});
			iframe.attr('src', this.settings.url);
		},
		//-------------------------------------------
		// MangaViewer.pageList()
		//-------------------------------------------
		pageList: function(id, total, base, imageViewer) {
			var self = this;
			var box = $('<div/>').attr('id', id);
			var ul  = $('<ul/>');
			//サムネイル作成
			for(var i=0; i<total; i++){
				var li       = $('<li/>');
				var fileName = base.match(/\/\d*_.*$/)[0].replace(/_p0/, '_128x128_p'+i).replace(/(\.png|\.gif)/, '.jpg');
				var thumUrl  = base.replace(/\/\d*_.*$/, '/mobile') + fileName;
				var nextUrl  = base.replace(/_p0/, '_big_p'+i);
				var img      = $('<img/>').attr('src', thumUrl).data('nextUrl', nextUrl).data('next', i).appendTo(li);
				//初回アクティブ表示
				if(i==0){ img.css({ border:'solid 10px rgba(128,255,128,0.75)' }); }
				//ページ指定
				img.bind('click', function(e){
					e.stopPropagation();
					//アクティブ表示
					$('#'+id+' li img').css({ border:'solid 10px rgba(0,0,0,0)' });
					$(this).css({ border:'solid 10px rgba(128,255,128,0.75)' });
					//次の画像へ
					imageViewer.changeImg( $(this).data('nextUrl') );
					self.settings.current = $(this).data('next');
					//console.log(self.settings.current)
				}).bind('mouseup', function(e){ e.stopPropagation(); });
				//追加
				ul.append(li);
				//先読み
				box.append( $('<img/>').attr('src', nextUrl).css({width:'0px', height:'0px', position:'absolute'}) );
			}
			return box.append(ul);
		},
		//-------------------------------------------
		// MangaViewer.pageSelecter()
		//-------------------------------------------
		pageSelecter: function(pl) {
			var self = this;
			var max  = $('li', pl).length;
			var next = 1;
			//イベント処理
			$(pl).bind('click', function(e){ e.stopPropagation(); });
			$(pl).bind('mouseup', function(e){
				e.stopPropagation();
				//ボタン無効化
				PcvApi.addCover(self.settings.target);
				//遷移先
				if(e.which == 1){
					next = Number(self.settings.current) + 1;
					if(max <= next){ next = 0; }
				}
				else if(e.which == 3){
					next = Number(self.settings.current) - 1;
					if(next < 0){ next = max-1; }
				}
				else { next = Number(self.settings.current) }
				//console.log(next);
				self.settings.current = next;
				//ページ切替
				$('li:eq('+next+') img', pl).click();
			});
		},
	};

	/*--------------------------------------------------------------------------------------
	* MediumImageAttachViewer
	*-------------------------------------------------------------------------------------*/
	var MediumImageAttachViewer = function(arg)
	{
		//引数デフォルト値
		arg = $.extend({target:document.body}, arg);
		//中画像
		var mImg = $('img', arg.target).filter(function(index){ return ( /i(mg)*\d*\.pixiv\.net\/img\d*\/.*\/.*_m\.(jpg|png|gif)/.test($(this).attr('src')) ); });
		if( mImg.length == 1 ){
			var anchor = mImg.parent();
			anchor.bind('click', function(e){
				e.preventDefault();
				//URL取得
				var info      = new Object();
				info.imgUrl   = mImg.attr('src').replace('_m','');
				info.mangaUrl = anchor.attr('href');
				//Viewer起動
				PcvApi.viewerOpen(info, 2);
			});
		}
	};

	/*--------------------------------------------------------------------------------------
	* AddIllustID
	*-------------------------------------------------------------------------------------*/
	var AddIllustID = function(thums)
	{
		//対象外を除去
		thums.each(function(index){
			var info = ThumbnailInfo(this);
			if(info.author != 'unknown'){ $(this).attr('pcv_illust_id', AddIllustID.id++); }
			else                        { $(this).addClass('pcvNotThum'); }
		});
		thums = thums.not('.pcvNotThum');
		return thums;
	};
	AddIllustID.id = 0;

	/*--------------------------------------------------------------------------------------
	* Selecter
	*-------------------------------------------------------------------------------------*/
	var Selecter = function(options) {
		//-------------------------------------------
		// Selecter.settings
		//-------------------------------------------
		this.settings = {
			name    : 'pcvSelecter',
			target  : PcvApi.viewerName,
			current : 0,
			max     : 0,
		};
		$.extend(this.settings, options);
		//init()
		this.init();
	};
	Selecter.prototype = {
		//-------------------------------------------
		// Selecter.init()
		//-------------------------------------------
		init: function() {
			this.settings.max = this.getIllustMax();
			//console.log('current:'+this.settings.current)
		},
		//-------------------------------------------
		// Selecter.getIllustMax()
		//-------------------------------------------
		getIllustMax: function() {
			return $('img').filter(function(index){ return ($(this).attr('pcv_illust_id') != undefined) }).length;
		},
		//-------------------------------------------
		// Selecter.attach()
		//-------------------------------------------
		attach: function() {
			var pBtn = this.createButton('Prev', 'prev');
			var nBtn = this.createButton('Next', 'next');
			var size = PcvApi.getStorage('pcvSelecterSize'); if(size == null){ size = 10; } else { size = size.replace('pcvSS',''); }
			pBtn.css('width', size+'%'); nBtn.css('width', size+'%');
			if(size==0) { pBtn.hide(); nBtn.hide(); } else { pBtn.show(); nBtn.show(); }
			$('#'+this.settings.target).append(pBtn).append(nBtn);
		},
		//-------------------------------------------
		// Selecter.createButton()
		//-------------------------------------------
		createButton: function(str, direction) {
			var text = $('<p/>').text(str);
			var btn  = $('<div/>').addClass(this.settings.name).append(text);
			//位置調整
			if(direction == 'next'){ btn.css('right', '10px'); } else { btn.css('left', '10px'); }
			//イベント処理
			var self = this;
			btn.bind('click', function(e){
				e.stopPropagation();
				//ボタン無効化
				PcvApi.addCover(self.settings.target);
				//max更新
				self.settings.max = self.getIllustMax();
				//current更新
				var nextID = 0;
				if(direction == 'next'){
					nextID = Number(self.settings.current) + 1;
					if(self.settings.max <= nextID){ nextID = 0; }
				}
				else{
					nextID = Number(self.settings.current) - 1;
					if(nextID < 0){ nextID = self.settings.max-1; }
				}
				self.settings.current = nextID;
				//次サムネイルの情報取得
				var nextThum = $('img').filter(function(index){ return ($(this).attr('pcv_illust_id') == nextID) });
				var info     = ThumbnailInfo(nextThum);
				//スクロール位置調整
				var winH; if(window.innerHeight){ winH = window.innerHeight; } else { winH = document.body.clientHeight; }
				$('html, body').animate({ scrollTop:(info.top-(winH/2)+75) }, 1000, 'swing');
				//console.log('top;'+info.top)
				//表示のリセット
				$('.pcvImageViewerIMG').fadeOut(300, function(){ $(this).remove(); });
				$('.pcvImageViewerFull').remove();
				$('#pcvMangaViewer').remove();
				$('iframe', $('#'+self.settings.target)).remove();
				//Viewer起動
				PcvApi.viewerOpen(info, 1);
				//ツールバー情報変更
				PcvApi.Toolbar.setData(info);
				//test
				//console.log(self.settings.current+'/'+self.settings.max)
			}).bind('mouseup', function(e){ if(e.which == 1){ e.stopPropagation(); } });
			//
			return btn;
		},
	};

	/*--------------------------------------------------------------------------------------
	* Toolbar
	*-------------------------------------------------------------------------------------*/
	var Toolbar = function(options) {
		//-------------------------------------------
		// Toolbar.settings
		//-------------------------------------------
		this.settings = {
			name    : 'pcvToolbar',
			target  : PcvApi.viewerName,
			info    : undefined,
		};
		$.extend(this.settings, options);
		//bar
		var bar;
		//init()
		this.init();
	};
	Toolbar.prototype = {
		//-------------------------------------------
		// Toolbar.init()
		//-------------------------------------------
		init: function() {
			this.bar = $('<div/>').attr('id', this.settings.name).bind('mouseup', function(e){ if(e.which == 1){ e.stopPropagation(); } });
			this.bar.data('info', this.settings.info);
			//ツールバーの表示設定
			if(PcvApi.getStorage('pcvToolBarShow') == 'pcvTBSYes'){ this.bar.addClass('pcvToolbar2'); }
			else                                                  { this.bar.removeClass('pcvToolbar2'); }
			//タイトル
			var title          = this.title(this.settings.info);
			//ボタン生成
			var menu           = $('<ul/>');
			var windowOpen     = this.windowOpenBtn();
			var point          = this.submitPointBtn();
			var bookmarkAdd    = this.BookMarkAddBtn();
			var bookmarkdetail = this.BookMarkDetailBtn();
			//Windwow制御
			var fwins          = $('<ul/>');
			var profile        = this.ProfileBtn();
			var caption        = this.CaptionBtn();
			var tag            = this.TagBtn();
			var rating         = this.RatingBtn();
			var comment        = this.CommentBtn();
			var data           = this.DataBtn();
			var allShow        = this.allShowBtn();
			var allHide        = this.allHideBtn();
			//追加
			menu.append(windowOpen).append(point).append(bookmarkAdd).append(bookmarkdetail);
			fwins.append(profile).append(caption).append(tag).append(rating).append(comment).append(data).append(allShow).append(allHide);
			this.bar.append(fwins).append(menu);
		},
		//-------------------------------------------
		// Toolbar.open()
		//-------------------------------------------
		open: function() {
			$('#'+this.settings.target).append(this.bar);
		},
		//-------------------------------------------
		// Toolbar.setData()
		//-------------------------------------------
		setData: function(info) {
			this.bar.data('info', info);
			$('p', this.bar).text(info.title + ' | ' + info.author);
		},
		//-------------------------------------------
		// Toolbar.title()
		//-------------------------------------------
		title: function(info) {
			var title = info.title + ' | ' + info.author;
			return $('<p/>').text(title);
		},
		//-------------------------------------------
		// Toolbar.windowOpenBtn()
		//-------------------------------------------
		windowOpenBtn: function() {
			var self = this;
			var btn  = $('<li/>').text('別窓で開く').bind('click', function(){
				var info = $('#'+self.settings.name).data('info');
				PcvApi.windowOpen(info.pageUrl);
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.BookMarkAddBtn()
		//-------------------------------------------
		BookMarkAddBtn: function() {
			var self = this;
			var btn  = $('<li/>').text('B!登録').bind('click', function(){
				var info = $('#'+self.settings.name).data('info');
				PcvApi.windowOpen(info.bookmarkUrl)
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.BookMarkDetailBtn()
		//-------------------------------------------
		BookMarkDetailBtn: function() {
			var self = this;
			var btn  = $('<li/>').text('B!詳細').bind('click', function(){
				var info = $('#'+self.settings.name).data('info');
				PcvApi.windowOpen(info.detailUrl)
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.submitPointBtn()
		//-------------------------------------------
		submitPointBtn: function(str, info) {
			var self = this;
			var btn  = $('<li/>').text('10点送信').bind('click', function(){
				var info = $('#'+self.settings.name).data('info');
				PcvApi.submitPoint(info, 10, false);
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.ProfileBtn()
		//-------------------------------------------
		ProfileBtn: function() {
			var btn  = $('<li/>').addClass('fwin').text('Profile').bind('click', function(){
				PcvApi.Windows.profile.toggle();
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.CaptionBtn()
		//-------------------------------------------
		CaptionBtn: function() {
			var btn  = $('<li/>').addClass('fwin').text('Caption').bind('click', function(){
				PcvApi.Windows.caption.toggle();
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.TagBtn()
		//-------------------------------------------
		TagBtn: function() {
			var btn  = $('<li/>').addClass('fwin').text('Tag').bind('click', function(){
				PcvApi.Windows.tag.toggle();
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.RatingBtn()
		//-------------------------------------------
		RatingBtn: function() {
			var btn  = $('<li/>').addClass('fwin').text('Rating').bind('click', function(){
				PcvApi.Windows.rating.toggle();
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.CommentBtn()
		//-------------------------------------------
		CommentBtn: function() {
			var btn  = $('<li/>').addClass('fwin').text('Comment').bind('click', function(){
				PcvApi.Windows.comment.toggle();
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.DataBtn()
		//-------------------------------------------
		DataBtn: function() {
			var btn  = $('<li/>').addClass('fwin').text('Data').bind('click', function(){
				PcvApi.Windows.data.toggle();
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.allShowBtn()
		//-------------------------------------------
		allShowBtn: function() {
			var btn  = $('<li/>').addClass('fwin').text('All Show').bind('click', function(){
				PcvApi.Windows.profile.toggle(1);
				PcvApi.Windows.caption.toggle(1);
				PcvApi.Windows.tag.toggle(1);
				PcvApi.Windows.rating.toggle(1);
				PcvApi.Windows.comment.toggle(1);
				PcvApi.Windows.data.toggle(1);
			});
			return btn;
		},
		//-------------------------------------------
		// Toolbar.allHideBtn()
		//-------------------------------------------
		allHideBtn: function() {
			var btn  = $('<li/>').addClass('fwin').text('All Hide').bind('click', function(){
				PcvApi.Windows.profile.toggle(0);
				PcvApi.Windows.caption.toggle(0);
				PcvApi.Windows.tag.toggle(0);
				PcvApi.Windows.rating.toggle(0);
				PcvApi.Windows.comment.toggle(0);
				PcvApi.Windows.data.toggle(0);
			});
			return btn;
		},
	};

	/*--------------------------------------------------------------------------------------
	* SettingMenu
	*-------------------------------------------------------------------------------------*/
	var SettingMenu = function(options) {
		//-------------------------------------------
		// SettingMenu.settings
		//-------------------------------------------
		this.settings = {
			name    : 'pcvSettingMenu',
			target  : document.body,
		};
		$.extend(this.settings, options);
		//menuBox
		var menuBox;
		//init()
		this.init();
	};
	SettingMenu.prototype = {
		//-------------------------------------------
		// SettingMenu.init()
		//-------------------------------------------
		init: function() {
			var self = this;
			this.menuBox = $('<li/>').attr('id', this.settings.name).text('PCV設定');
			this.menuBox.bind('click', function(e){ self.showMenu(); });
		},
		//-------------------------------------------
		// SettingMenu.attach()
		//-------------------------------------------
		attach: function() {
			var li = $('.site-menu li.setting', this.settings.target);
			li.after(this.menuBox);
		},
		//-------------------------------------------
		// SettingMenu.showMenu()
		//-------------------------------------------
		showMenu: function(reset) {
			var self = this;
			var menu = $('<div/>').attr('id', this.settings.name+'Box').bind('mouseup', function(e){ e.stopPropagation(); });
			
			var q1 = this.createTitle('ビューワー終了条件');
			q1.append( this.createRadioBtn({ id:'pcvVCL', name:'pcvViewerClose', text:'左クリック' }) );
			q1.append( this.createRadioBtn({ id:'pcvVCR', name:'pcvViewerClose', text:'右クリック' }) );
			this.checked(q1, 'pcvViewerClose', 'pcvVCL');
			$('input', q1).bind('change', function(){ var ic = $('input:checked', q1); PcvApi.setStorage(ic.attr('name'), ic.attr('id')); });
			
			var q6 = this.createTitle('左右セレクターのサイズ');
			q6.append( this.createRadioBtn({ id:'pcvSS40', name:'pcvSelecterSize', text:'40' }) );
			q6.append( this.createRadioBtn({ id:'pcvSS30', name:'pcvSelecterSize', text:'30' }) );
			q6.append( this.createRadioBtn({ id:'pcvSS20', name:'pcvSelecterSize', text:'20' }) );
			q6.append( this.createRadioBtn({ id:'pcvSS10', name:'pcvSelecterSize', text:'10' }) );
			q6.append( this.createRadioBtn({ id:'pcvSS0', name:'pcvSelecterSize', text:'0' }) );
			this.checked(q6, 'pcvSelecterSize', 'pcvSS10');
			$('input', q6).bind('change', function(){ var ic = $('input:checked', q6); PcvApi.setStorage(ic.attr('name'), ic.attr('id')); });
			
			var q5 = this.createTitle('ツールバーの表示');
			q5.append( this.createRadioBtn({ id:'pcvTBSYes', name:'pcvToolBarShow', text:'常に表示' }) );
			q5.append( this.createRadioBtn({ id:'pcvTBSNo',  name:'pcvToolBarShow', text:'自動で非表示' }) );
			this.checked(q5, 'pcvToolBarShow', 'pcvTBSNo');
			$('input', q5).bind('change', function(){ var ic = $('input:checked', q5); PcvApi.setStorage(ic.attr('name'), ic.attr('id')); });
			
			var q2 = this.createTitle('サムネイルメニューのサイズ');
			q2.append( this.createRadioBtn({ id:'pcvTMS600', name:'pcvThumMenuSize', text:'特大' }) );
			q2.append( this.createRadioBtn({ id:'pcvTMS400', name:'pcvThumMenuSize', text:'大' }) );
			q2.append( this.createRadioBtn({ id:'pcvTMS300', name:'pcvThumMenuSize', text:'中' }) );
			q2.append( this.createRadioBtn({ id:'pcvTMS200', name:'pcvThumMenuSize', text:'小' }) );
			this.checked(q2, 'pcvThumMenuSize', 'pcvTMS400');
			$('input', q2).bind('change', function(){ var ic = $('input:checked', q2); PcvApi.setStorage(ic.attr('name'), ic.attr('id')); });
			
			var q3 = this.createTitle('サムネイルメニューの反応速度');
			q3.append( this.createRadioBtn({ id:'pcvTMR2000', name:'pcvThumMenuReception', text:'2000' }) );
			q3.append( this.createRadioBtn({ id:'pcvTMR1000', name:'pcvThumMenuReception', text:'1000' }) );
			q3.append( this.createRadioBtn({ id:'pcvTMR500',  name:'pcvThumMenuReception', text:'500' }) );
			q3.append( this.createRadioBtn({ id:'pcvTMR250',  name:'pcvThumMenuReception', text:'250' }) );
			q3.append( this.createRadioBtn({ id:'pcvTMR1',    name:'pcvThumMenuReception', text:'0' }) );
			this.checked(q3, 'pcvThumMenuReception', 'pcvTMR500');
			$('input', q3).bind('change', function(){ var ic = $('input:checked', q3); PcvApi.setStorage(ic.attr('name'), ic.attr('id')); });
			
			var q4 = this.createTitle('サムネイルメニュー');
			q4.append( this.createRadioBtn({ id:'pcvTMUYes', name:'pcvThumMenuUse', text:'使用する' }) );
			q4.append( this.createRadioBtn({ id:'pcvTMUNo',  name:'pcvThumMenuUse', text:'使用しない' }) );
			this.checked(q4, 'pcvThumMenuUse', 'pcvTMUYes');
			$('input', q4).bind('change', function(){ var ic = $('input:checked', q4); PcvApi.setStorage(ic.attr('name'), ic.attr('id')); });
			//Reload
			//var reloadBtn = this.createBtn({ id:'', text:'設定を今すぐ反映', func:function(){ window.location.reload(); } });
			//Reset
			//
			var resetBtn  = this.createBtn({ id:'', text:'　　設定を初期化　　', func:function(){ PcvApi.clearStorage(); $('#pcvSettingMenuBox').remove(); self.showMenu(true); } });
			//
			menu.append(q1).append(q6).append(q5).append(q4).append(q2).append(q3).append(resetBtn);//.append(reloadBtn)
			//
			if(reset){
				$('#'+this.settings.name+'Window').append(menu);
				menu.css({ marginTop:'-'+(menu.height()/2+13)+'px', marginLeft:'-'+(menu.width()/2+10)+'px' }).show();
			}
			else
			{
				var showFunc = function(){ menu.css({ marginTop:'-'+(menu.height()/2+13)+'px', marginLeft:'-'+(menu.width()/2+10)+'px' }).show(); }
				var win = new ModalWindow({name:this.settings.name+'Window', data:menu, showFunc:showFunc});
				win.open('fade');
			}
		},
		//-------------------------------------------
		// SettingMenu.createTitle()
		//-------------------------------------------
		createTitle: function(title) {
			var li = $('<li/>').addClass('settingTitle').text(title);
			var ul = $('<ul/>').append(li);
			return ul;
		},
		//-------------------------------------------
		// SettingMenu.createRadioBtn()
		//-------------------------------------------
		createRadioBtn: function(item) {
			var input = $('<input/>').attr({ id:item.id, type:'radio', name:item.name });
			var label = $('<label/>').attr({ for:item.id }).text(item.text);
			var li = $('<li/>').addClass('settingValue').append(input).append(label);
			return li;
		},
		//-------------------------------------------
		// SettingMenu.createBtn()
		//-------------------------------------------
		createBtn: function(item) {
			var input = $('<input/>').attr({ id:item.id, type:'submit', value:item.text });
			input.bind('click', item.func);
			var p = $('<p/>').addClass('settingBtn').append(input);
			return p;
		},
		//-------------------------------------------
		// SettingMenu.checked()
		//-------------------------------------------
		checked: function(obj, name, initial) {
			var value = PcvApi.getStorage(name);
			if(value == null){ value = initial; }
			$('input#'+value, obj).attr('checked','checked');
		},
	};

	/*-------------------------------------------------------------------------------------------------------------------
	* PcvApi
	*------------------------------------------------------------------------------------------------------------------*/
	var PcvApi = {
		//-------------------------------------------
		// property
		//-------------------------------------------
		viewerName: 'pcvImageViewer',
		Toolbar   : undefined,
		Selecter  : undefined,
		Windows   : undefined,
		//-------------------------------------------
		// PcvApi.getPageData()
		//-------------------------------------------
		getPageData: function(info, windows) {
			//Loading表示
			var loadingText = $('<p/>').addClass('FloatingWindowLoading').text('Loading...');
			windows.profile.changeContents(loadingText.clone());
			windows.caption.changeContents(loadingText.clone());
			windows.rating.changeContents(loadingText.clone());
			windows.comment.changeContents(loadingText.clone());
			windows.tag.changeContents(loadingText.clone());
			windows.data.changeContents(loadingText.clone());
			//イラストページをTextで読み込み
			$.ajax({
				type    : 'GET',
				url     : info.pageUrl+'&c_open=1',
				dataType: 'text',
				success : function(page){
					//Profile Window用---------------------
					var profile = $('.profile_area', page).css({ margin:'auto', background:'none', border:'none' }).bind('mouseup', function(e){e.stopPropagation();});
					$('a', profile).attr('target','_blank');
					$('form', profile).attr('target','_blank');
					$('hr', profile).css({ display:'none' });
					$('.avatar_m', profile).css({ color:'rgba(255,255,255,0.75)' });
					$('.person_menu', profile).css({ paddingTop:'0', marginLeft:'44px', textAlign:'left' });
					$('a#favorite-button', profile).css({ background:'none', height:'auto', textIndent:'inherit', width:'auto', display:'inline' }).bind('click', function(e){
						e.preventDefault();
						$('#favorite-preference', profile).css({ display:'block', color:'#333', width:'140px' });
						$('p.recommend', profile).css({ display:'none' });
						$('input.button', profile).bind('click', function(){ $('#favorite-preference', profile).css({ display:'none'}) });
						$('input.remove', profile).css({ display:'none' });
						$('#favorite-preference .close', profile).bind('click', function(){ $('#favorite-preference', profile).css({ display:'none'}) });
					});
					$('a#mypixiv-button', profile).css({  background:'none', height:'auto', textIndent:'inherit', width:'auto', display:'inline' });
					$('.icon_mail', profile).css({ background:'none', marginLeft:'0' });
					$('.person_menu li', profile).css({ margin:'0', color:'#eee', listStyleType:'disc' });
					$('.list_fav', profile).parent().css({ listStyleType:'none' });
					$('.list_fav', profile).css({ display:'none' });
					windows.profile.changeContents(profile);
					//Caption Window用---------------------
					var caption = $('<div/>').css({ padding:'0 10px' });
					var title   = $('h1.title', page).css({ fontSize:'16px', paddingBottom:'5px' });
					var text    = $('p.caption', page).css({ maxWidth:'742px', padding:'0' });
					$('a', text).attr('target','_blank');
					caption.append(title).append(text);
					windows.caption.changeContents(caption);
					//Tag Window用---------------------
					var tag  = $('span#tags', page).css({ display:'block', padding:'10px', maxWidth:'742px' });
					$('a', tag).attr('target','_blank');
					windows.tag.changeContents(tag);
					//Comment Window用---------------------
					var comment  = $('.worksOption', page).css({width:'auto', maxWidth:'900px', minWidth:'400px', padding:'5px 10px 10px 10px'});
					var comframe = $('<iframe/>').css({display:'none'}).attr({name:'comframe'}).appendTo(comment);
					$('strong', comment).css({display:'none'});
					$('.worksImageresponse', comment).css({display:'none'});
					$('#one_comment_view2', comment).css({display:'none'});
					$('#one_comment_area', comment).css({border:'none', margin:'5px 0 0 0	'});
					$('.worksComment', comment).css({border:'none', lineHeight:'1.3em'});
					$('a', comment).attr('target','_blank');
					$('form', comment).attr('target','comframe');
					$('input:eq(3)', comment).css({width:'70%', backgroundColor:'rgba(255,255,255,0.3)', color:'#FFF'});
					$('input.btn_type04', comment).bind('click', function(){ setTimeout(function(){ PcvApi.getPageData(info, windows) }, 1000); });
					$('img', comment).filter(function(index){ return /icon\_trash\.gif/.test($(this).attr('src')) }).css({display:'none'});
					windows.comment.changeContents(comment);
					//Data Window用---------------------
					var data    = $('<div/>').css({ padding:'0 10px 10px 10px' });
					var meta    = $('ul.meta', page);
					var share   = info.title + ' | ' + info.author;
					var share2  = share + ' ' + info.pageUrlm;
					$('#twitter-wjs').remove();
					var twitter = $('<p><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+info.pageUrl+'" data-text="'+share+'" data-lang="ja" data-hashtags="pixiv">ツイート</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script></p>');
					twitter.css({paddingTop:'10px'});
					var select  = $('<textarea/>').attr('value', share2).bind('click', function(){ $(this).select(); }).css({ width:'90%', height:'14px', backgroundColor:'rgba(255,255,255,0.3)', color:'#fff' });
					data.append(meta).append(twitter).append(select);
					windows.data.changeContents(data);
				},
				error: function(){ alert('データ取得失敗<br>リトライしてください'); }
			});
			//Rating対応
			var rating    = $('<div/>').append(loadingText);
			var tempFrame = $('<iframe/>').attr({id:'pcvTempFrame'}).css({opacity:'0', overflow:'auto', width:'315px', height:'92px'}).appendTo($('#pcvImageViewer'));
			tempFrame.bind('load', function(){
				$('.FloatingWindowLoading', rating).remove();
				//内容解析
				var page = this.contentWindow.document;
				var rating = $('div.user-reaction', page).css({ padding:'5px 10px 10px 10px', width:'298px', color:'#eee' });
				$('html', page).css({overflow:'auto'});
				$('#global-header', page).css({display:'none'});
				$('#wrapper', page).css({display:'none'});
				$('#fb-root', page).css({display:'none'});
				$('body', page).css({padding:'0', margin:'0', background:'none'}).append(rating);
				$('.questionnaire h1', page).css({margin:'0'});
				$('.questionnaire li', page).css({marginTop:'2px'});
				if($('.questionnaire', page).length){ tempFrame.css({height:'110px'}) } else {  tempFrame.css({height:'92px'}) }
				$(this).css({opacity:'1'});
			});
			tempFrame.attr('src', info.pageUrl);
			rating.append(tempFrame);
			windows.rating.changeContents(rating);
		},
		//-------------------------------------------
		// PcvApi.submitPoint()
		//-------------------------------------------
		submitPoint: function(info, score, mode) {
			//loading画面の表示
			var box = LoadingImage({text:score+'点送信！'});
			var win = new ModalWindow({name:'pcvSubmitTenPt', data:box, lock:true});
			win.open('fade');
			//イラストページの読み込み
			$.ajax({
				type    : 'GET',
				url     : info.pageUrl,
				dataType: 'text',
				success : function(page){
					//評価済みか確認
					if( $('#unit li.current-rating' ,page).length ){ $('p', box).text('既に評価済みです'); box.delay(2000).fadeOut(300, function(){ win.close(mode); }); }
					else {
						//ユーザ情報取得
						var p_i_id = $('#rpc_i_id' ,page).html();
						var p_u_id = $('#rpc_e_id' ,page).html();
						var p_qr   = $('#rpc_qr'   ,page).html();
						//評価
						$.ajax({
							type    : 'POST',
							url     : 'http://www.pixiv.net/rpc_rating.php',
							data    : { mode:'save', i_id:p_i_id, u_id:p_u_id, qr:p_qr, score:score },
							dataType: 'json',
							success : function(){ box.delay(1500).fadeOut(300, function(){ win.close(mode); }); },
							error   : function(){ $('p', box).html('送信失敗<br>リトライしてください'); box.delay(2000).fadeOut(300, function(){ win.close(mode); }); }
						});
					}
				},
				error: function(){ $('p', box).html('送信失敗<br>リトライしてください'); $('#pcvSubmitTenPt').delay(2000).fadeOut(300, function(){ $(this).remove() }); }
			});
		},
		//-------------------------------------------
		// PcvApi.viewerOpen()
		// mode - 0:サムネイル
		//      - 1:セレクタ
		//      - 2:中画像
		//-------------------------------------------
		viewerOpen: function(info, mode) {
			name = PcvApi.viewerName;
			//ModalWindow表示
			if(mode==0 || mode==2 || mode==undefined){
				var box  = LoadingImage();
				var win  = new ModalWindow({name:name, data:box});
				win.open('fade');
				PcvApi.addCover(name);
			}
			else if(mode==1){ $('#'+name).append( LoadingImage() ); }
			//イラストor漫画判定後、各ビューワ起動
			var img = new Image();
			img.onload  = function(){ var iv = new ImageViewer({name  :name, url:info.imgUrl});   iv.open(); }
			img.onerror = function(){ var mv = new MangaViewer({target:name, url:info.mangaUrl}); mv.open(); }
			img.src     = info.imgUrl;
			//セレクタ追加
			if(mode==0 || mode==undefined){ PcvApi.Selecter = new Selecter({target:name, current:info.id}); PcvApi.Selecter.attach(); }
			//Toolbar追加
			if(mode==0 || mode==undefined){ PcvApi.Toolbar  = new Toolbar({target:name, info:info}); PcvApi.Toolbar.open(); }
			//FloatingWindow追加
			if(mode==0 || mode==undefined){
				PcvApi.Windows = new Object();
				//
				PcvApi.Windows.profile = new FloatingWindow({id:'ProfileWindow', title:'Profile', left:'4px',   top:'69px', target:$('#'+PcvApi.viewerName)});
				PcvApi.Windows.caption = new FloatingWindow({id:'CaptionWindow', title:'Caption', left:'194px', top:'69px', width:'490px', height:'120px', target:$('#'+PcvApi.viewerName)});
				PcvApi.Windows.tag     = new FloatingWindow({id:'TagWindow',     title:'Tag',     left:'4px',   top:'484px', target:$('#'+PcvApi.viewerName)});
				PcvApi.Windows.rating  = new FloatingWindow({id:'RatingWindow',  title:'Rating',  left:'700px', top:'69px', target:$('#'+PcvApi.viewerName)});
				PcvApi.Windows.comment = new FloatingWindow({id:'CommentWindow', title:'Comment', left:'4px',   top:'580px', width:'920px', height:'140px', target:$('#'+PcvApi.viewerName)});
				PcvApi.Windows.data    = new FloatingWindow({id:'DataWindow',    title:'Data',    left:'820px', top:'218px', target:$('#'+PcvApi.viewerName)});
				//
				PcvApi.Windows.profile.open();
				PcvApi.Windows.caption.open();
				PcvApi.Windows.tag.open();
				PcvApi.Windows.rating.open();
				PcvApi.Windows.comment.open();
				PcvApi.Windows.data.open();
			}
			//PageData取得
			if(mode==0 || mode==1 || mode==undefined){
				PcvApi.getPageData(info, PcvApi.Windows);
			}
		},
		//-------------------------------------------
		// PcvApi.windowOpen()
		//-------------------------------------------
		windowOpen: function(url) {
			window.open(url);
		},
		//-------------------------------------------
		// PcvApi.addCover()
		//-------------------------------------------
		addCover: function(id) {
			var cover = $('<div/>').addClass('pcvCover').bind('click', function(e){ e.stopPropagation(); }).bind('mouseup', function(e){ e.stopPropagation(); });
			$('#'+id).append(cover);
		},
		//-------------------------------------------
		// PcvApi.removeCover()
		//-------------------------------------------
		removeCover: function() {
			$('div.pcvCover').remove();
		},
		//--------------------------------------------------------------------------
		// PcvApi.storageKey
		//--------------------------------------------------------------------------
		storageKey: new Array(
			//PCV2で使用するLocalStorage用Keyはここに列挙する
			'pcvViewerClose',
			'pcvSelecterSize',
			'pcvToolBarShow',
			'pcvThumMenuUse',
			'pcvThumMenuSize',
			'pcvThumMenuReception',
			'pcvProfileWindowPosition',
			'pcvCaptionWindowPosition',
			'pcvTagWindowPosition',
			'pcvCommentWindowPosition',
			'pcvRatingWindowPosition',
			'pcvDataWindowPosition'
		),
		//-------------------------------------------
		// PcvApi.setStorage
		//-------------------------------------------
		setStorage: function(key, obj) {
			var flg = false;
			for (var i=0; i<PcvApi.storageKey.length; i++) {
				var defKey = PcvApi.storageKey[i];
				if(key == defKey){ flg = true; break; }
			}
			if(flg){ localStorage.setItem( key, JSON.stringify(obj) ); }
			else   { alert('未定義Key:「'+key+'」でlocalStorageにアクセスしようとしています。'); }
		},
		//-------------------------------------------
		// PcvApi.getStorage
		//-------------------------------------------
		getStorage: function(key) {
			return JSON.parse( localStorage.getItem(key) );
		},
		//-------------------------------------------
		// PcvApi.removeStorage
		//-------------------------------------------
		removeStorage: function(key) {
			localStorage.removeItem(key);
		},
		//-------------------------------------------
		// PcvApi.clearStorage
		//-------------------------------------------
		clearStorage: function() {
			for (var i=0; i<PcvApi.storageKey.length; i++) {
				var key = PcvApi.storageKey[i];
				localStorage.removeItem(key);
			}
		},
		//-------------------------------------------
		// PcvApi.showStorage *Debug用
		//-------------------------------------------
		showStorage: function() {
			//console.log('PcvApi.showStorage() -----------');
			for (var i=0; i<PcvApi.storageKey.length; i++) {
				var key = PcvApi.storageKey[i];
				//console.log( 'key:'+key+'\nvalue:'+'\n' );
				//console.log( PcvApi.getStorage(key)     );
			}
			//console.log('--------------------------------');
		},
	};

	/*--------------------------------------------------------------------------------------
	* Main
	*-------------------------------------------------------------------------------------*/
	var Main = function(arg)
	{
		//引数デフォルト値
		arg = $.extend({target:document.body}, arg);
		
		//サムネイル取得
		var thums = ThumbnailSearch(arg);
		thums = AddIllustID(thums);
		
		//サムネイルメニュー機能追加
		thums.each(function(index){
			var thumMenu = new ThumbnailMenu({thum:this});
		});
		
		//初回のみ実行分
		if( arg.target == document.body ){
			//中画像にビューワー機能付加
			MediumImageAttachViewer(arg);
			//設定画面を付加
			var menu = new SettingMenu(arg);
			menu.attach();
		}
	};

	//---------------------------------------------------------------------------
	//AutoPagerize対応
	document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){ Main({target:evt.target}); },false);
	//初回実行
	Main();
	//test
	//PcvApi.clearStorage();
	PcvApi.showStorage();
// End ---------------------------------------------------------------------------------//
});


/*----------------------------------------------------------------------------------------
* Add Style
*---------------------------------------------------------------------------------------*/
(function(){
	// ModalWindow --------------------------------
	GM_addStyle([
		'.ModalWindowGlayLayer { display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.5); z-index:1002; user-select:none; -moz-user-select:none; -webkit-user-select:none; }',
	].join(''));
	// FloatingWindowTemplate ----------------------
	GM_addStyle([
		'.FloatingWindowTemplate { display:none; position:fixed; z-index:10; }',
		'.FloatingWindowTemplate > dt { min-width:100px; text-align:center; color:rgba(255,255,255,0.75); background-color:rgba(0,0,0,0.8); border:solid 2px #333; border-bottom-width:0; border-radius:10px 10px 0 0; cursor:pointer; padding:2px 0; }',
		'.FloatingWindowTemplate > dt:hover { background-color:rgba(66,66,66,0.8); }',
		'.FloatingWindowTemplate > dd { min-width:100px; min-height:18px; overflow:auto; color:#eee; background-color:rgba(0, 0, 0, 0.8); border:solid 2px #333; border-top-width:0; border-radius:0 0 10px 10px; resize:both; }',
		'.FloatingWindowLoading { position:absolute; left:50%; top:50%; margin-left:-25px; }',
	].join(''));
	// LoadingImage -------------------------------
	GM_addStyle([
		'.pcvLoadingImage { display:none; position:fixed; top:50%; left:50%; min-width:160px; background-color:#fff; padding:10px 10px 10px 10px; border-radius:12px; user-select:none; -moz-user-select:none; -webkit-user-select:none; }',
		'.pcvLoadingImage p { text-align:center; padding-top:5px; margin-bottom:5px; font-size:12px; color:#666;}',
	].join(''));
	// ThumbnailMenu ------------------------------
	GM_addStyle([
		'.pcvThumbnailMenu { position:absolute; top:0; left:0; overflow:hidden; text-align:center; background-color:rgba(0,0,0,0.9); border-radius:20px; z-index:1001; -webkit-box-shadow:0 15px 10px -10px rgba(0, 0, 0, 0.6), 0 1px 4px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.2) inset; -moz-box-shadow:0 15px 10px -10px rgba(0, 0, 0, 0.6), 0 1px 4px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.2) inset; box-shadow:0 15px 10px -10px rgba(0, 0, 0, 0.6), 0 1px 4px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.2) inset; }',
		'.pcvThumbnailMenu p { width:40%; height:40%; text-align:center; font-size:14px; font-weight:bold; background-color:rgba(255,255,255,0); color:rgba(0,0,0,0); cursor:pointer; -moz-transition-property:color,background-color; -moz-transition-duration:0.3s; -webkit-transition-property:color, background-color; -webkit-transition-duration:0.3s; transition-property:color,background-color; transition-duration:0.3s; user-select:none; -moz-user-select:none; -webkit-user-select:none;}',
		'.pcvThumbnailMenu p:hover { background-color:rgba(37,143,184,0.5); color:rgba(255,255,255,0.8);}',
		'.pcvThumbnailMenu p:nth-of-type(1) { position:absolute; top:0; left:0; z-index:1; }',
		'.pcvThumbnailMenu p:nth-of-type(2) { position:absolute; top:0; left:61%; z-index:1; }',
		'.pcvThumbnailMenu p:nth-of-type(3) { position:absolute; top:61%; left:0; z-index:1; }',
		'.pcvThumbnailMenu p:nth-of-type(4) { position:absolute; top:61%; left:61%; z-index:1; }',
		'.pcvThumbnailMenu p:nth-of-type(5) { position:absolute; top:50%; left:50%; width:1px; height:1px; overflow:hidden; z-index:-1;}',
		'.pcvThumbnailMenu img { background-color:#fff; cursor:pointer; }',
	].join(''));
	// pcvImageViewer -----------------------------
	GM_addStyle([
		'.pcvImageViewerIMG { display:none; position:fixed; top:50%; left:50%; background-color:#fff; padding:0px; border:solid 10px rgba(0,0,0,0.9);  border-radius:10px; user-select:none; -moz-user-select:none; -webkit-user-select:none; }',
		'.pcvImageViewerFull { position:absolute; opacity:0; left:0px; top:0px; width:100%; height:100%; margin:0px; padding:0px; overflow:auto; background-color:rgba(0,0,0,0.6); z-index:40; user-select:none; -moz-user-select:none; -webkit-user-select:none; }',
	].join(''));
	// pcvMangaViewer -----------------------------
	GM_addStyle([
		'#pcvMangaViewer { position:fixed; bottom:0; left:0; width:100%; max-height:316px; overflow:auto; background-color:rgba(0,0,0,0.5); z-index:2; user-select:none; -moz-user-select:none; -webkit-user-select:none;}',
		'#pcvMangaViewer ul { padding:10px 40px; }',
		'#pcvMangaViewer li { cursor:pointer; display:inline-block;}',
		'#pcvMangaViewer li img { width:128px; height:128px; border:solid 10px rgba(0,0,0,0); border-radius:12px;}',
	].join(''));
	// pcvSelecter --------------------------------
	GM_addStyle([
		'.pcvSelecter { cursor:pointer; position:fixed; width:10%; min-width:100px; height:90%; top:2.5%; border-radius:20%; text-align:center; color:rgba(255,255,255,0); background-color:rgba(0,0,0,0); z-index:1; -moz-transition-property:color,background-color; -moz-transition-duration:0.3s; -webkit-transition-property:color, background-color; -webkit-transition-duration:0.3s; transition-property:color,background-color; transition-duration:0.3s; user-select:none; -moz-user-select:none; -webkit-user-select:none;}',
		'.pcvSelecter:hover { color:rgba(255,255,255,0.9); background-color:rgba(0,0,0,0.5); }',
		'.pcvSelecter p { position:relative; top:48%; }',
	].join(''));
	// pcvCover -----------------------------------
	GM_addStyle([
		'.pcvCover { position:fixed; width:100%; height:100%; background-color:rgba(0,0,0,0.01); z-index:100;}',
	].join(''));
	// pcvToolbar ---------------------------------
	GM_addStyle([
		'#pcvToolbar { opacity:0; position:fixed; width:100%; top:0; color:rgba(255,255,255,0.75); background-color:rgba(0,0,0,0.9); text-align:center; z-index:3; user-select:none; -moz-user-select:none; -webkit-user-select:none; -moz-transition-property:opacity; -moz-transition-duration:0.3s; -webkit-transition-property:opacity; -webkit-transition-duration:0.3s; transition-property:opacity; transition-duration:0.3s; }',
		'#pcvToolbar:hover { opacity:1; }',
		'.pcvToolbar2 { opacity: 1 !important; }',
		'#pcvToolbar p { margin-top: 5px; font-size:14px; cursor:default; color:rgba(255,255,255,0.75); }',
		'#pcvToolbar li { cursor:pointer; border:1px solid rgba(255,255,255,0.4); color:rgba(255,255,255,0.75); border-radius:10px; display:inline-block; font-size:12px; margin:0 5px 5px 5px; min-width:80px; padding:2px 10px; }',
		'#pcvToolbar li.fwinS { background-color:rgba(255,255,255,0.1); min-width:50px; border-radius:0px; margin:5px 0 5px 20px; border-width:0; }',
		'#pcvToolbar li.fwin  { background-color:rgba(255,255,255,0.1); min-width:50px; border-radius:0px; margin:5px 0 5px 1px; border-width:0; }',
		'#pcvToolbar li:hover { color:rgba(255,255,255,0.9); background-color:rgba(0,255,0,0.5); }',
	].join(''));
	// pcvSettingMenu -----------------------------
	GM_addStyle([
		'#pcvSettingMenu { color:#258FB8; text-decoration:none; cursor:pointer; }',
		'#pcvSettingMenu:hover { text-decoration:underline; }',
		'#pcvSettingMenuBox { display:none; position:fixed; top:50%; left:50%; color:#333; background-color:rgba(255,255,255,0.9); padding:0px 20px 20px 20px; border-radius:12px; max-width:100%; max-height:100%; overflow-y:scroll; }',
		'#pcvSettingMenuBox input { margin:0 10px; }',
		'#pcvSettingMenuBox ul { width:100%; }',
		'#pcvSettingMenuBox li { float:left; margin:5px;}',
		'#pcvSettingMenuBox li.settingTitle { border-bottom: 1px solid #888; clear:both; float:none; font-weight:bold; padding-top:20px; }',
		'#pcvSettingMenuBox .settingBtn { clear: both; padding:20px 0 10px; text-align: center; }',
	].join(''));
}());

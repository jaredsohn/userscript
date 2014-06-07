// ==UserScript==
// @name        6park addictor
// @namespace   caoglish
// @include     http://*.6park.com/*
// @include     http://www.parkmv.com/*
// @exclude     http://www.6park.com/
// @exclude     http://www.6park.com/au.html
// @require     http://code.jquery.com/jquery-1.8.2.min.js
// @require     http://caoglish.github.com/HelperBar-Framework/lib/0.5.0/HelperBar.min.js
// @version     0.2.4
// @updateURL   http://userscripts.org/scripts/show/152154
// @downloadURL http://userscripts.org/scripts/show/152154
// @grant none
// ==/UserScript==
var plugin={
	name: "6park阅读者",
	version: '0.2.4'
};
//(start)$.fn.gallery
(function(t,i,s,e){var n="gallery",o={};function r(i,s,e){this.$el=t(i);this.options=t.extend({},o,e);this._defaults=o;this._data=s;this._name=n;this.init()}r.prototype={init:function(){var s=this;this.$el.append(t("<div/>",{id:"imgList"}).css({"z-index":"9999",position:"absolute",top:t(i).scrollTop(),right:"50"}));for(var e in this._data){var n=t("<img>",{src:this._data[e]}).appendTo(this.$el.find("div")).css({display:"block","border-radius":"5px",border:"10px solid #eee"});this.makeCenter(n)}var o={position:"fixed",display:"block",background:"black",color:"white",width:"45px","text-align":"center","text-decoration":"none","border-radius":"5px",margin:"35px","z-index":"99999",border:"5px solid gray"};this.makeBtn("<<<",function(){s.previous()}).css({bottom:"150",left:"0"}).css(o);this.makeBtn(">>>",function(){s.next()}).css({bottom:"100",left:"0"}).css(o);this.makeBtn("--X--",function(){s.destory()}).css({bottom:"50",left:"0"}).css(o);this._currentPosition=this.$el.find("img").hide().first().show()},makeBtn:function(i,s){return t("<a/>",{id:"btn-"+i,href:"#"}).text(i).on("click",function(i){i.preventDefault();if(t.isFunction(s))s.call()}).appendTo(this.$el)},destory:function(){this.$el.html("");this.$el.remove()},next:function(){this.$el.find("img").hide();var t=this._currentPosition.next("img");if(t.size()>0)this._currentPosition=t.show();else this._currentPosition.show()},previous:function(){this.$el.find("img").hide().eq(this._position).show();var t=this._currentPosition.prev("img");if(t.size()>0)this._currentPosition=t.show();else this._currentPosition.show()},makeCenter:function(s){var e=s;t(i).load(function(){e.css("position","fixed");e.css("top",(i.outerHeight-e.height())/100+t(i).scrollTop()+"px");e.css("left",(i.outerWidth-e.width())/2+t(i).scrollLeft()+"px");e.css("width",Math.min(800,e.width())*.86+"px");e.css("height",Math.min(600,e.height())*.86+"px")});return e}};t.fn[n]=function(i,s){return this.each(function(){if(!t.data(this,"plugin_"+n)){t.data(this,"plugin_"+n,new r(this,i,s))}})}})(jQuery,window,document);
//(end)$.fn.gallery
//---SimpleModal.js 1.4.4---
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){var j=[],n=b(document),k=navigator.userAgent.toLowerCase(),l=b(window),g=[],o=null,p=/msie/.test(k)&&!/opera/.test(k),q=/opera/.test(k),m,r;m=p&&/msie 6./.test(k)&&"object"!==typeof window.XMLHttpRequest;r=p&&/msie 7.0/.test(k);b.modal=function(a,h){return b.modal.impl.init(a,h)};b.modal.close=function(){b.modal.impl.close()};b.modal.focus=function(a){b.modal.impl.focus(a)};b.modal.setContainerDimensions=
function(){b.modal.impl.setContainerDimensions()};b.modal.setPosition=function(){b.modal.impl.setPosition()};b.modal.update=function(a,h){b.modal.impl.update(a,h)};b.fn.modal=function(a){return b.modal.impl.init(this,a)};b.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1E3,
close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null};b.modal.impl={d:{},init:function(a,h){if(this.d.data)return!1;o=p&&!b.support.boxModel;this.o=b.extend({},b.modal.defaults,h);this.zIndex=this.o.zIndex;this.occb=!1;if("object"===typeof a){if(a=a instanceof b?a:b(a),this.d.placeholder=!1,0<a.parent().parent().size()&&(a.before(b("<span></span>").attr("id",
"simplemodal-placeholder").css({display:"none"})),this.d.placeholder=!0,this.display=a.css("display"),!this.o.persist))this.d.orig=a.clone(!0)}else if("string"===typeof a||"number"===typeof a)a=b("<div></div>").html(a);else return alert("SimpleModal Error: Unsupported data type: "+typeof a),this;this.create(a);this.open();b.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]);return this},create:function(a){this.getDimensions();if(this.o.modal&&m)this.d.iframe=b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
{display:"none",opacity:0,position:"fixed",height:g[0],width:g[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo);this.d.overlay=b("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?j[0]:0,width:this.o.modal?j[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo);this.d.container=b("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed?
"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?b(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo);this.d.wrap=b("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container);this.d.data=a.attr("id",a.attr("id")||this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss,{display:"none"})).appendTo("body");this.setContainerDimensions();
this.d.data.appendTo(this.d.wrap);(m||o)&&this.fixIE()},bindEvents:function(){var a=this;b("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});n.bind("keydown.simplemodal",function(b){a.o.modal&&9===b.keyCode?a.watchTab(b):a.o.close&&a.o.escClose&&27===b.keyCode&&(b.preventDefault(),a.close())});l.bind("resize.simplemodal orientationchange.simplemodal",
function(){a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();m||o?a.fixIE():a.o.modal&&(a.d.iframe&&a.d.iframe.css({height:g[0],width:g[1]}),a.d.overlay.css({height:j[0],width:j[1]}))})},unbindEvents:function(){b("."+this.o.closeClass).unbind("click.simplemodal");n.unbind("keydown.simplemodal");l.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this.o.position;b.each([this.d.iframe||null,!this.o.modal?null:this.d.overlay,
"fixed"===this.d.container.css("position")?this.d.container:null],function(b,e){if(e){var f=e[0].style;f.position="absolute";if(2>b)f.removeExpression("height"),f.removeExpression("width"),f.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),f.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var c,d;a&&a.constructor===
Array?(c=a[0]?"number"===typeof a[0]?a[0].toString():a[0].replace(/px/,""):e.css("top").replace(/px/,""),c=-1===c.indexOf("%")?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a[1]&&(d="number"===typeof a[1]?
a[1].toString():a[1].replace(/px/,""),d=-1===d.indexOf("%")?d+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(d.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(c='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
d='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');f.removeExpression("top");f.removeExpression("left");f.setExpression("top",c);f.setExpression("left",d)}}})},focus:function(a){var h=this,a=a&&-1!==b.inArray(a,["first","last"])?a:"first",e=b(":input:enabled:visible:"+a,h.d.wrap);setTimeout(function(){0<e.length?e.focus():h.d.wrap.focus()},
10)},getDimensions:function(){var a="undefined"===typeof window.innerHeight?l.height():window.innerHeight;j=[n.height(),n.width()];g=[a,l.width()]},getVal:function(a,b){return a?"number"===typeof a?a:"auto"===a?0:0<a.indexOf("%")?parseInt(a.replace(/%/,""))/100*("h"===b?g[0]:g[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){if(!this.d.data)return!1;this.d.origHeight=this.getVal(a,"h");this.d.origWidth=this.getVal(b,"w");this.d.data.hide();a&&this.d.container.css("height",a);b&&this.d.container.css("width",
b);this.setContainerDimensions();this.d.data.show();this.o.focus&&this.focus();this.unbindEvents();this.bindEvents()},setContainerDimensions:function(){var a=m||r,b=this.d.origHeight?this.d.origHeight:q?this.d.container.height():this.getVal(a?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),a=this.d.origWidth?this.d.origWidth:q?this.d.container.width():this.getVal(a?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),e=this.d.data.outerHeight(!0),f=
this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||b;this.d.origWidth=this.d.origWidth||a;var c=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,d=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,c=c&&c<g[0]?c:g[0],d=d&&d<g[1]?d:g[1],i=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",b=b?this.o.autoResize&&b>c?c:b<i?i:b:e?e>c?c:this.o.minHeight&&"auto"!==i&&e<i?i:e:i,c=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",a=a?this.o.autoResize&&a>d?d:a<c?c:a:f?
f>d?d:this.o.minWidth&&"auto"!==c&&f<c?c:f:c;this.d.container.css({height:b,width:a});this.d.wrap.css({overflow:e>b||f>a?"auto":"visible"});this.o.autoPosition&&this.setPosition()},setPosition:function(){var a,b;a=g[0]/2-this.d.container.outerHeight(!0)/2;b=g[1]/2-this.d.container.outerWidth(!0)/2;var e="fixed"!==this.d.container.css("position")?l.scrollTop():0;this.o.position&&"[object Array]"===Object.prototype.toString.call(this.o.position)?(a=e+(this.o.position[0]||a),b=this.o.position[1]||b):
a=e+a;this.d.container.css({left:b,top:a})},watchTab:function(a){if(0<b(a.target).parents(".simplemodal-container").length){if(this.inputs=b(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),!a.shiftKey&&a.target===this.inputs[this.inputs.length-1]||a.shiftKey&&a.target===this.inputs[0]||0===this.inputs.length)a.preventDefault(),this.focus(a.shiftKey?"last":"first")}else a.preventDefault(),this.focus()},open:function(){this.d.iframe&&this.d.iframe.show();b.isFunction(this.o.onOpen)?
this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show());this.o.focus&&this.focus();this.bindEvents()},close:function(){if(!this.d.data)return!1;this.unbindEvents();if(b.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var a=b("#simplemodal-placeholder");this.o.persist?a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(this.d.data.hide().remove(),a.replaceWith(this.d.orig))}else this.d.data.hide().remove();
this.d.container.hide().remove();this.d.overlay.hide();this.d.iframe&&this.d.iframe.hide().remove();this.d.overlay.remove();this.d={}}}}});
//---SimpleModal.js 1.4.4---
//plugin tools and config
(function(plugin){
	plugin.message={
			TXT_ABOUT_INFO:plugin.name+'[version:'+plugin.version +']' 
				+'<br/>Helperbar[version:'+HelperBar.version()+']'
				+'<br/>Jquery[version:'+$().jquery+']'
				+'<br/>Designer: <span style="color:skyblue"><b>Caoglish</b></span>',
			NOT_SUPPORT_ADD_BUTTONS:"本论坛现在不支持按钮阅读模式",
			NOT_SUPPORT_PRE_LOAD_FIVE_PAGES:"本页面现在不支持预载后5页面",
			NOT_SUPPORT_LOAD_TOP_ARTICLE:"本页面现在不支持置顶/精华帖子的阅读模式",
			NOT_FIRST_PAGE_NO_PRELOAD_FIVE_PAGES:"本页面不在论坛第一页,不预载后5个页面",
			CLICK_BLACK_BACKGROUND_TO_CLOSE_ARTICLE:"[点击黑色蒙板关闭文章窗口]"
	}
	plugin.pageScrollToTop=0;//store the place in current which page will scroll to
	
	//standard of new id cross the plugin:
	//lengcy standard:.comment-area
	//new standard in plugin.std.
	plugin.std={
			refreshable_area:[	
				{selector:'#parknews',name:"新闻"},
			],//plugin.std.refreshable_area
			gallery_load_area:'.gallery-load-area',
			article_width:850
		};
	
	plugin.DEFAULT_FONT_SIZE='24';
	plugin.pageIn =function(urlPart){
		if(typeof urlPart==="string"){
			return document.URL.search(urlPart)>-1;
		}else if($.isArray(urlPart)){
			for(var i=0;i<urlPart.length;i++){
				if(document.URL.search(urlPart[i])>-1) return true
			}
			return false;
		}else{
			return false;
		}
	};
	
	plugin.cropFirstSymbol=function (str) {
			var patt = /^#|^\./;
			return str.replace(patt, '');
		}
	
	plugin.syncDomain=function(url){
		var url_with_current_domain=url;
		var pattern=/http:\/\/(.*?)\//;
		
		if(pattern.test(url)) {
			var url_domain=url.match(pattern)[1];
		}else{
			var url_domain=location.host;
		}
		if (location.host !== url_domain) url_with_current_domain=url.replace(url_domain,location.host);
		return url_with_current_domain;
	}
	
	//--(start)plugin config  initial
	var Config=function(key,type){
		this.key = key;
		this.initSet=function(defaultValue){
			if (!this.isExist()) this.set(defaultValue);
		};
		this.set=function(value){
			HelperBar.data(this.key,value);
		};
		this.get=function(){
			return HelperBar.data(this.key);;
		 };
		 this.isExist=function(){
			if (this.get() === null ) return false;
			else return true;
		};
		if (type === "boolean"){
			this.switch=function(){
				this.set(this.isTrue()?false:true);
			};
			this.isTrue=function(){
				return this.get()===true;
			};
		}
	}
	config={};
	config.fontSize=new Config("FontSize");
	config.reverseComment=new Config("ReverseComment","boolean");
	config.bbsLoadFivePage=new Config("bbsLoadFivePage","boolean");
	config.focusMode=new Config("focusMode","boolean");
	config.rightClickHideBar=new Config("rightClickHideBar","boolean");
	plugin.init_config=function(){
		config.fontSize.initSet(plugin.DEFAULT_FONT_SIZE);
		config.reverseComment.initSet(true);
		config.bbsLoadFivePage.initSet(true);
		config.focusMode.initSet(true);
		config.rightClickHideBar.initSet(false);
	};
	plugin.config=config;
	//--(end)pulgin config initial
	plugin.style={background:'#E6E6DD'};
	
	plugin.getImageList=function(selector){
		var imagelist=[];
		$(selector).find('img, input[type=image]')
			.filter(function(){
				return !($(this).is('img[title*="微博"]')
					||$(this).is('img[src*="../"]')
					)
			})
			.each(function(){
				imagelist.push($(this).attr('src'));
			});
		
		return imagelist;
	};
})(plugin);

//utilities
(function($,plugin){
	var config=plugin.config;
	$.tag = HelperBar.tag;
	
	$.jumpTo =function(place){
		$('html, body').animate({ scrollTop: place }, 'slow');
	};
	
	$.fn.cleanAttr=function(){
		return this.each(function(){
			$(this).removeAttr('width').removeAttr('height');
		});
	};
	//element is 'table' and li on news page
	$.fn.reverseComment=function(){
		var $parent=$(this).parent();
		return this.each(function(){
			$parent.prepend($(this));
		});
	};

	//element is 'li' on BBS page
	$.fn.reverseWholeCommentList=function(){
		for(var i=0;i<this.size();i++ ){
			 var $current_level=this.eq(i);
			 var $next_level=$current_level.children('ul').children('li');
			 if($next_level.size() > 0){
				for(var j=0;j<$next_level.size();j++){
					$next_level.reverseWholeCommentList();
				}
			 }
			$current_level.reverseComment();
		 }
	};
	
	$.fn.fontSize=function(action){
		if(action==='+') action_string='+=2';
		else if (action==='-') action_string='-=2';
		else if (typeof action === 'string' && /^\d+(px)*$/.test(action) ) action_string=action;
		else if(config.fontSize.get())	action_string=config.fontSize.get();
		else action_string=plugin.DEFAULT_FONT_SIZE;
		return this.each(function(){
					$(this).css('font-size',action_string);
					config.fontSize.set($(this).css('font-size'));
				});
	};
	
	$.fn.addReadButton = function(){
		var bbs_article_ctrl=plugin.bbs_article_ctrl;
		$(this).not(":contains('(无内容)')").each(function(){
			var $btn_article=$.tag('button',{class:'btn-article'}).text('内容');
			$(this).after($btn_article);
			$btn_article.click(function(){
				$(this).css({"border":"2px solid gray",'color':"gray"});
				var link=$(this).siblings('a').attr('href');
				link=plugin.syncDomain(link);
				var $that=$(this);
				//ajax to load the content of post.
				bbs_article_ctrl.hide();
				bar.msg('加载内容.......','yellow');
				bbs_article_ctrl.$.load(link+" table tbody tr[bgcolor=#E6E6DD]", function(){
					var $this=$(this).fontSize();
					$this.find('tr').eq(4).remove()
						.end().eq(3).remove()
						.end().eq(2).remove()
						.end().eq(0).remove();
					$that.after($this);
					$this.removeHideText();
					plugin.fix_site_6park_issue($this);
					bbs_article_ctrl.show('slow',function(){
						$.jumpTo($this.offset().top);
						bar.cls();					
					});
				});
			});
		});
	};
	
	$.fn.removeHideText=function(){
		this.find('font[color]:contains(www.6park.com)').remove();
	};
	
	$.fn.focusing=function(){
		var $mask=plugin.$mask;
							
		var defaultcss={};
		this.on('mouseenter',function(event){
			event.stopPropagation();
			var $this=$(this);
			defaultcss['z-index']=$this.css('z-index');
			defaultcss['background']=$this.css('background');
			defaultcss['position']='static';
			defaultcss['border']=$this.css('border');
			defaultcss['box-shadow']=$this.css('box-shadow');
			$this.css({
					'z-index':'99',
					background:'#FFFFEE',
					position:'absolute',
					'border-radius':'2px',
					border: '1px solid #CCCCCC',
					'box-shadow': '0 10px 16px rgba(0, 0, 0, 0.2)'
				});
			$mask.css('width',$(document).width())
				.css('height',$(document).height())
				.fadeIn('slow');
		}).on('mouseleave',function(event){
			event.stopPropagation();
			var $this=	$(this);
			$mask.fadeOut('fast',function(){
				$this.css(defaultcss);
			});
		});
	}
	
	$.fn.ribbon=function(text){
		$(this).addClass('ribbon').text(text)
			.css({"font":"bold 15px Sans-Serif",
				"text-align":"center",
				"text-shadow":"rgba(186,186,186,0.8) 1px 1px 0px",
				"-webkit-transform":"rotate(45deg)",
				"-moz-transform":"   rotate(45deg)",
				"position":"fixed",
				"padding":"10px 0px",
				"padding-left":"15px",
				"top":"15px",
				"right":"-100px",
				"width":"290px",
				"background-color":"#202B1A",
				"background-image":"-webkit-gradient(linear, left top, left bottom, from(#202B1A), to(#424b3c))", 
				"background-image":"-webkit-linear-gradient(top, #202B1A, #eec91e)", 
				"background-image":"   -moz-linear-gradient(top, #202B1A, #424b3c)", 
				"color":"#ffffff",
				"z-index":"99999",
				"box-shadow":" 0px 0px 3px rgba(0,0,0,0.3)",
				"border":"1px dashed white"});
	}
})(jQuery,plugin);

//setup UI control.
(function($,plugin){
	function CTRL($object){
		this.$=$object;
		this.find=function(selector){
			return this.$.find(selector);
		};
		this.show=function(speed,func){
			return this.$.slideDown(speed,func);
		};
		this.hide=function(speed,func){
			return this.$.hide(speed,func);
		};
		this.isExist=function(){
			if(this.$ instanceof $
				&& this.$.size() > 0){
				return true;
			}else{
				return false;
			}
		}
	};
	var news_ctrl=new CTRL($('#parknews'));
	//bbs article control
	var $bbs_article = $.tag('div',{id:'bbs-article'})
		.addClass(plugin.cropFirstSymbol(plugin.std.gallery_load_area))
		.css({
			border:"1px solid gray",
			'border-radius':'6px'
		});
	var bbs_article_ctrl=new CTRL($bbs_article);
	$.extend(bbs_article_ctrl,{
		fontSize:function(action){
			this.$.fontSize(action);
			this.find('p').fontSize(action);
		}
	});
		
	//modal box control
	var modal_box_ctrl={
		modal_dialog:null,
		set:function(modal_dialog){
			this.modal_dialog=modal_dialog;
		},
		removeHideMsg:function(){
			this.modal_dialog.data.removeHideText();
			
		},
		fontSize:function(action){
			var $text_area=this.modal_dialog.data.find('.td3 , table td');
			$text_area.fontSize(action);
			this.modal_dialog.data.fontSize(action);
		},
		goTop:function(){
			if(this.isExist()) $.jumpTo(this.modal_dialog.container.offset().top);
		},
		goComment:function(){
			if(this.isExist()) $.jumpTo(this.modal_dialog.data.find('.comment-area').offset().top);
		},
		isExist:function(){
			if(this.modal_dialog ===null || this.modal_dialog === undefined || this.modal_dialog.data.size()===0){
				return false;
			}else{
				return true;
			}
		}
	}
	plugin.CTRL=CTRL;
	plugin.news_ctrl=news_ctrl;
	plugin.modal_box_ctrl=modal_box_ctrl;
	plugin.bbs_article_ctrl=bbs_article_ctrl;
})(jQuery,plugin);

(function($,plugin){
	plugin.fix_site_6park_issue=function($obj,width){
		/*(start)fix site.6park issue*/
		width=width||plugin.std.article_width;
		$obj.find('pre')
			.css({'width':width,
				'text-align':'left',
				'word-break':'break-word',
				'white-space':'pre-wrap',//fix word wrap issue.
				//'overflow':'auto'
				})
		/*(end)fix site.6park issue*/
	}

	plugin.ajax_setup=function(){
		$.ajaxSetup({
		   beforeSend: function( xhr ) {
				xhr.overrideMimeType( 'text/plain; charset=gb2312' );
			}
		});
	}
	
	plugin.ribbon=function(){
		$.tag('div').prependTo('body').ribbon(plugin.name);
	
	};
	
	plugin.$mask=$.tag('div')
			.hide()
			.css({	'width':"100%",			
					'height':"100%",
					'background':'black',
					'opacity':'0.5',
					'position':'fixed',
					'top':'0px',
					'left':'0px',
					'z-index':'95'
					})
			.appendTo('body');
	
	plugin.showArticle =function(html,width){
		width =  width || plugin.std.article_width;
		var $article = $('6park-article-contect');
		if($article.size()>0)
		{
			$article.html(html).modal();
		}else{
		$article=$.tag('div',{id:'6park-article-contect'})
			.css({width:'100%'})
			.html(html);
		$article.modal({
					onClose: function (dialog) {
						bar.clsTitle();
						//$.jumpTo(plugin.homepage.$lastlink.offset().top-10);
						$.jumpTo(plugin.pageScrollToTop-10);
						$.modal.close();
					},
					onShow:function(dialog){
						plugin.modal_box_ctrl.set(dialog);
						plugin.modal_box_ctrl.goTop();
						plugin.modal_box_ctrl.fontSize();
						plugin.modal_box_ctrl.removeHideMsg();
						dialog.wrap
							.css({overflow:'visible'});
						plugin.fix_site_6park_issue(dialog.data,width);
						
						dialog.data.find('td,tr,center').css({
							'border-radius':'14px'
						});
						
						dialog.data.addClass(plugin.cropFirstSymbol(plugin.std.gallery_load_area));
						
						message=$.tag('span').css('color','yellow').text(plugin.message.CLICK_BLACK_BACKGROUND_TO_CLOSE_ARTICLE);
						bar.title(message);
					},
					opacity:80,
					maxWidth:width,
					containerCss : {position:'absolute',
						'border-radius':'14px',
						border: '1px solid #CCCCCC',
						'word-wrap':'break-word',
						'box-shadow': '0 4px 16px rgba(0, 0, 0, 0.2)'
					},
					overlayCss: {backgroundColor:"#666",opacity:'0.8'},
					overlayClose:true,
					autoResize :true
				});
		}
	};
})(jQuery,plugin);

//helper bar setup
(function($,plugin){
	"use strict";
	var config = plugin.config;
	var opts1={
				bar_title:plugin.name,
				foot_mode:'show',
				foot_size:'8px',
				safe_mode: 'safe',
				hide_mode: config.rightClickHideBar.isTrue()?'rightClick':'notOnMenu',
				hide_effect: 'slide',
				border_radius: '86px',
				warn_size:'16px',
				warn_color:'yellow',
				warn_mode:'log',
				bar_bg_color: 'black',
				bar_opacity: '0.8',
				bar_font_color: 'white',
				menu_width:'auto',
				menu_bg_color: '#111111',
				menu_hover_bg_color: '#333333',
				menu_font_color: '#EAFFED',
				menu_separator_color: 'black',
				msg_click:function(){bar.cls().clsTitle();}
		};
		
	//==(start)make switch event Handler==
	var make_swtichHandler=function(configName,trueMsg,falseMsg){
		return function(){
			config[configName].switch();
			var message=config[configName].isTrue()?trueMsg:falseMsg;
			bar.msg(message,'skyblue');
		}
	}
	
	var  switch_reverse_comment_list=make_swtichHandler('reverseComment',"评论逆序","评论原序");
	var switch_load_bbs_five_page=make_swtichHandler('bbsLoadFivePage',"开启预先载入5页","关闭加载5页功能");
	var switch_focusing_mode=make_swtichHandler('focusMode',"开启焦距模式","关闭焦距模式");
	var switch_hide_mode=make_swtichHandler('rightClickHideBar',"右键消失","双击消失");
	//==(end)make switch event Handler==
	
	var mi_page_top = {'title':'页面顶端','click':page_top};
	var mi_page_bottom= {'title':'页面底端','click':page_bottom};
	var mi_page_comment= {'title':'文章评论','click':page_comment};
	var mi_modal_box_top= {'title':'文章顶端',click:modal_box_top};
	var mi_modal_box_comment= {'title':'文章评论',click:modal_box_comment};
	var mi_font_size_default ={'title':'A(默认)','click':font_size_default};
	var mi_font_size_increase ={'title':'A+','click':font_size_increase};
	var mi_font_size_decrease ={'title':'A-','click':font_size_decrease};
	var mi_modal_box_font_size={root:mi_font_size_increase,
						list:[mi_font_size_default,mi_font_size_decrease]};
						
	var mi_reverse_comment={'title':'切换评论排序','click':switch_reverse_comment_list};
	var mi_hide_mode={'title':'切换消失模式','click':switch_hide_mode};
	var mi_bbs_load_five_page={'title':'切换预载5页帖子','click':switch_load_bbs_five_page};
	var mi_bbs_focusing_mode={'title':'切换焦距模式','click':switch_focusing_mode};
	var mi_config_status={'title':'设置状态','click':config_status};
	var menuTreeAbout={'root':{'title':'关于|设置','click':about},'list':[mi_reverse_comment,mi_bbs_load_five_page,mi_bbs_focusing_mode,mi_hide_mode,mi_config_status]	};
	var mi_refresh_area={'title':'刷新',click:refresh_area};
	var mi_open_gallery={'title':'浏览图片',click:open_gallery};
	
	var menuTreeGallery={'root':mi_open_gallery};
	
	//home page
	var homepage={};
	homepage.a={root:mi_modal_box_top,
					list:[mi_page_top,mi_page_bottom]
					};
	homepage.b={root:mi_modal_box_comment,list:[]};
	homepage.c={root:mi_refresh_area};
	homepage.menuTree=[homepage.a, homepage.b,homepage.c,mi_modal_box_font_size ,menuTreeGallery,menuTreeAbout];
	//news page
	var newsPage={};
	newsPage.a={root:mi_page_top,list:[]};
	newsPage.b={root:mi_page_comment,list:[]};
	newsPage.menuTree=[newsPage.a,newsPage.b,menuTreeGallery,menuTreeAbout]
	
	//bbs page
	
	
	var bbspage={};
	bbspage.a=$.extend(true,{},homepage.a,{})
	bbspage.a.root.title='置顶/精华'+bbspage.a.root.title;
	
	bbspage.b=$.extend(true,{},homepage.b,{});
	bbspage.b.root.title='置顶/精华'+bbspage.b.root.title;
	bbspage.menuTree=[bbspage.a,bbspage.b,mi_modal_box_font_size,menuTreeGallery ,menuTreeAbout];
	//other page
	var otherPage={};
	otherPage.a={root:mi_page_top,list:[mi_page_bottom]};
	otherPage.menuTree=[otherPage.a,menuTreeAbout]
	//event handler
	var modal_box_ctrl=plugin.modal_box_ctrl;
	var bbs_article_ctrl=plugin.bbs_article_ctrl;
	function page_top(){
		$.jumpTo(0);
	}
	function page_bottom(){
		$.jumpTo($(document).height());
	}
		
	function page_comment(){
		$.jumpTo($('.comment-area').offset().top);
	}
		
	function modal_box_top(){
		if(modal_box_ctrl.isExist())	{modal_box_ctrl.goTop();}
		else {page_top();}
	}
	function modal_box_comment(){
		if(modal_box_ctrl.isExist()) modal_box_ctrl.goComment();
	}
	
	function font_size_default(){
		if(modal_box_ctrl.isExist()) modal_box_ctrl.fontSize(plugin.DEFAULT_FONT_SIZE);
		if(bbs_article_ctrl.isExist()) bbs_article_ctrl.fontSize(plugin.DEFAULT_FONT_SIZE);
	}
	function font_size_increase(){
		if(modal_box_ctrl.isExist()) modal_box_ctrl.fontSize('+');
		if(bbs_article_ctrl.isExist()) bbs_article_ctrl.fontSize('+');
	}
	function font_size_decrease(){
		if(modal_box_ctrl.isExist()) modal_box_ctrl.fontSize('-');
		if(bbs_article_ctrl.isExist()) bbs_article_ctrl.fontSize('-');
	}
	
	function refresh_area(){
		var refreshable_list=plugin.std.refreshable_area;
		$.each(refreshable_list,function(index,item){
			var selector=item.selector;
			var name=item.name;
			if(!($(selector).size()>0)) return;
			bar.msg(name+'刷新中...','yellow');
			$.get(window.location.href).done(function(html){
				var $refreshed_area=$(html).find(selector);
				if($refreshed_area.size()<=0) $refreshed_area=$(html).filter(function(){
					return $(this).is(selector);
				});
				$(selector).slideUp('quick').html("").html($refreshed_area).slideDown('slow');
			}).always(function(){bar.cls()});
		});
	}
	
	function open_gallery(){
		bar.cls();
		var imagelist=plugin.getImageList('body '+plugin.std.gallery_load_area);
		if(!(!!imagelist&&imagelist.length>0)){
			bar.warn('图片未发现');
			return;
		}
		
		if(!plugin.$ga||$('#6park-gallery').size()<=0){
			plugin.$ga =$('<div/>',{id:'6park-gallery'})
				.appendTo('body')
				.gallery(imagelist);
		}else{
			plugin.$ga.remove();
			plugin.$ga=undefined;
		}
	}
	
	//about 
	function about(){
		var bar=plugin.bar; 
		bar.clsTitle().cls().title('[关于]');
		
		bar.msg(plugin.message.TXT_ABOUT_INFO);
	}
	
	function config_status(){
		var message ="";
		var make_line_msg=function(){
			var msg_array=Array.slice(arguments);
			var msg="";
			for(var i in msg_array){
				if(typeof msg_array[i] ==='string') msg+=msg_array[i];
			}
			message += msg+'<br/>';
		};
		make_line_msg('【设置】');
		make_line_msg('回复字体大小:',config.fontSize.get());
		make_line_msg('排序顺序:',config.reverseComment.isTrue()?"评论逆序":"评论原序");
		make_line_msg('bbs预加载5页:',config.bbsLoadFivePage.isTrue()?"开启":"关闭");
		make_line_msg('阅读焦聚模式:',config.focusMode.get()?"开启":"关闭");
		make_line_msg('栏消失模式:',config.rightClickHideBar.get()?"右键消失":"双击消失");
		
		bar.clsTitle().cls().title('[设置]');
		bar.msg(message,'yellow');
	}
	
	plugin.helperbar={options:opts1};
	plugin.homepage={menu:homepage.menuTree};
	plugin.newsPage={menu:newsPage.menuTree};
	plugin.otherPage={menu:otherPage.menuTree};
	plugin.bbs={menu:bbspage.menuTree};
	
	
})(jQuery,plugin);

//create 6park new functions [Home Page]
(function($,plugin){
	var news_ctrl = plugin.news_ctrl;
	
	plugin.homepage.newsFocusingArea= function(){
		$('td.td5,td.td1,div.zw,td.td3,td.td8').focusing();
	}
	
	plugin.homepage.newsReader =function(){
		news_ctrl.$.on('click','a',function(event){
			event.preventDefault();
			var bar =plugin.bar;
			var $that=plugin.homepage.$lastlink=$(this);
			plugin.pageScrollToTop=plugin.homepage.$lastlink.offset().top;
			var link=$that.attr('href');//get news link
			var comment_link=link
						.replace('messages','newscom')
						.replace('html','shtml');//get news comment link
			
			bar.msg('加载新闻内容.......','yellow');
			 //load news
			 $.when($.get(link),$.get(comment_link)).then(function(html,comment_html){
				var $html=$(html[0]).find('.td3').cleanAttr();
				var $comment_html=$(comment_html[0]).find("form").cleanAttr().addClass('comment-area');
				$comment_html.find('span:last').remove();//remove useless area
				$comment_html.find('table:last').remove();//remove useless area
				$comment_html.find('a:contains(返回顶部)').click(function(event){
					event.preventDefault();
					plugin.modal_box_ctrl.goTop();
				});
				
				$comment_html.find("table.dc_bar").remove();//remove useless area
				//reverse the comments
				if(plugin.config.reverseComment.isTrue()) $comment_html.find("table[cellpadding='5']").reverseComment();
					
				//remove useless area
				$html.find('.td1').remove();
				$html.removeHideText();
				$html.find('a[href*="e2bo.com"]').remove();//remove useless area
				$html.append($comment_html);
				plugin.showArticle($html);
			 }).always(function(){bar.cls()});
		});
	};
})(jQuery,plugin);

//[news Page]
(function($,plugin){
	plugin.newsPage.addGalleryLoadArea =function(){
		$('table .td3').addClass(plugin.cropFirstSymbol(plugin.std.gallery_load_area));
	
	}
	plugin.newsPage.commentLoader=function(){
		var url=location.href;
		bar.msg('加载评论.........','yellow');
		var comment_link=url.replace('messages','newscom')
						.replace('html','shtml');//get news comment link
		$.get(comment_link).done(function(comment_html){
				var $comment_html=$(comment_html).find("form").cleanAttr().addClass('comment-area');
				$comment_html.find('span:last').remove();//remove useless area
				$comment_html.find('table:last').remove();//remove useless area
				$comment_html.find('a:contains(返回顶部)').remove();//remove useless area
				$comment_html.find("table.dc_bar").remove();//remove useless area
				//reverse the comments
				if(plugin.config.reverseComment.isTrue()) $comment_html.find("table[cellpadding='5']").reverseComment();
				$('#weibozkinfo').before($comment_html);
		}).always(function(){bar.cls()});
	};
})(jQuery,plugin);

//[bbs]
(function($,plugin){
	var $bbs_list;
	var top_post_ctrl;
	var bbs_list_ctrl;
	plugin.bbs.init=function(){
		//top post area definition
		
		if(plugin.pageIn('pagerank')){
			$pagerank_post=$(".dc_bar2");
			$modal_box_post=$pagerank_post;
		}else{
			var $top_post1=$(".dc_bar").first().find("table:eq(2)");//general bbs
			var $top_post2=$(".dc_bar2").prev().find("table:eq(2)");//special bbs like law club
			var $top_post3=$('#d_gold_list').find('table');
			var $gold_post=$('table[bordercolor="#CCFFCC"][bgcolor="#FFFFFF"][align="center"]').last();
			
			var $modal_box_post=$top_post1.add($top_post2).add($gold_post).add($top_post3);
		}
		
		top_post_ctrl=new plugin.CTRL($modal_box_post);
		
		//bbs and comment list area definition
		if($("#d_list").size()>0){
			$bbs_list=$("#d_list").data("selector","#d_list")
		}else if($(".dc_bar2").size()>0){
			$bbs_list=$(".dc_bar2").data("selector",".dc_bar2");
		}else if($(".dc_bar").size()>1){
			$bbs_list=$(".dc_bar:last").data("selector",".dc_bar:last");
		}else{
			$bbs_list=$().data("selector","");
		}
		bbs_list_ctrl=new plugin.CTRL($bbs_list.children('ul').children('li'));
	}
	
	plugin.bbs.listAddButtons=function(){
		if($bbs_list.size()>0){
			$bbs_list.find('li a').addReadButton();
		}else{
			bar.warn(plugin.message.NOT_SUPPORT_ADD_BUTTONS);
		}
	};
	
	plugin.bbs.reverseBBScommentList=function(){
		if(plugin.config.reverseComment.isTrue()) bbs_list_ctrl.$.children('ul').children('li').reverseWholeCommentList();
	};
	
	plugin.bbs.loadFivePage=function(callback){
		var current_location=window.location.href;
		var pattern=/(.*\/)$/
		var url_shared_part=current_location.match(pattern)?current_location.match(pattern)[1]:null;
		
		if (!url_shared_part) {
			bar.warn(plugin.message.NOT_SUPPORT_PRE_LOAD_FIVE_PAGES,'yellow');
			callback.apply();
			return;
		};
		
		var fivePageLinks=[];
		for(var i=1;i<6;i++){
			fivePageLinks[i]=url_shared_part+'index.php?app=forum&act=cachepage&cp=tree'+(i+1);
		};
		
		//if not first page, don't load five page.
		if(!current_location.match(pattern) ) {
			bar.msg(plugin.message.NOT_FIRST_PAGE_NO_PRELOAD_FIVE_PAGES,'yellow');
			callback.apply();
			return;
		}
		bar.msg('加载第2,3,4,5,6页...','yellow');
		  $.when($.get(fivePageLinks[1]),
				 $.get(fivePageLinks[2]),
				 $.get(fivePageLinks[3]),
				 $.get(fivePageLinks[4]),
				 $.get(fivePageLinks[5])
		 
		 ).then(function(link1,link2,link3,link4,link5){
			
			for(var i in arguments){
				var $pageDocument=$(arguments[i][0]);
				var $article_list_area=$pageDocument.find($bbs_list.data("selector")).add($pageDocument.filter($bbs_list.data("selector")));
				var $article_list=$article_list_area.children('ul').children('li');
				bbs_list_ctrl.$.parent().append($article_list);
			}
		 }).always(function(){
			bar.cls();
			callback.apply();
		 });
	}
		
	plugin.bbs.topPostReader=function(){
		//binding click to top post
		clickHandler=function(e){
			e.preventDefault();
			var bar=plugin.bar;
			bar.msg('加载帖子....','yellow');
			var link=$(this).attr('href');
			link=plugin.syncDomain(link);
			//$.tag('div').load(link+' body',function(html){
			$.get(link).done(function(html){
				bar.cls();
				var $html=$(html).find('tr');
				$html.first().hide()
					.end().eq(2).hide()
					.end().eq(3).hide()
					.end().eq(4).hide();//hide element.
				var $article=$html.eq(1);
				var $comment=$html.eq(5);
				$comment.cleanAttr().addClass('comment-area');
				$comment.css({'background':plugin.style.background});
				$comment.find('form').remove();
				$comment.find('li').each(function(){
					var comment_li_pattern_match=$(this).text().match(/\(\d+ bytes\)/);
					if(comment_li_pattern_match&&comment_li_pattern_match[0].match(/\(0 bytes\)/))
					{
						$(this).children('a').text($(this).children('a').text()+'(无内容)');
					}
				})//if comment is 0 bytes, add (无内容), so avoiding add read button.
				$comment.find('li a').addReadButton();
				if(plugin.config.reverseComment.isTrue()) $comment.find('td > ul > li').reverseWholeCommentList();
				plugin.showArticle($html,1050);
			});
		};
		if(top_post_ctrl.isExist()){
			top_post_ctrl.find('li a').click(clickHandler);
			top_post_ctrl.find('tr td a').click(clickHandler);
		}else{
			bar.warn(plugin.message.NOT_SUPPORT_LOAD_TOP_ARTICLE);
		}
	};
	
	plugin.bbs.bbsFocusingArea= function(){
		
		$('div[id="main_right"],div[id].body_center table').parent()
					.css('position','relative')
					.end()
					.focusing();
	}
	
	plugin.bbs.top_post_ctrl=top_post_ctrl;
})(jQuery,plugin);

//[Other Page]
(function($,plugin){
	
})(jQuery,plugin);
//construct and apply 6park new function into site.,6park club/section controller
(function($,plugin){
	var pageIn=plugin.pageIn;
	var config=plugin.config;
	
	$(run);
	function run(){
		plugin.ajax_setup();
		plugin.init_config();
		plugin.ribbon();
		if(pageIn('au.shtml')){//[home page]
			bar = HelperBar.getbar(plugin.homepage.menu,plugin.helperbar.options);	 
			plugin.homepage.newsReader();
			if(config.focusMode.isTrue())plugin.homepage.newsFocusingArea();
		}else if(pageIn('news/messages')){//[news Page]	
			bar = HelperBar.getbar(plugin.newsPage.menu,plugin.helperbar.options);	
			plugin.newsPage.commentLoader();
			plugin.newsPage.addGalleryLoadArea();
		}else if(pageIn(['pop','club','web','bbs','www','forum','parkmv','area','site'])){//[bbs]
			bar = HelperBar.getbar(plugin.bbs.menu,plugin.helperbar.options);		
			plugin.bbs.init();
			plugin.bbs.topPostReader();
			if(config.focusMode.isTrue()) plugin.bbs.bbsFocusingArea();
			if(config.bbsLoadFivePage.isTrue()){
				plugin.bbs.loadFivePage(function(){
					plugin.bbs.listAddButtons();
					plugin.bbs.reverseBBScommentList();
				});
			}else{
				plugin.bbs.listAddButtons();
				plugin.bbs.reverseBBScommentList();
			}
		}else{
			bar = HelperBar.getbar(plugin.otherPage.menu,plugin.helperbar.options);	
		}
		plugin.bar=bar;
	}
})(jQuery,plugin);
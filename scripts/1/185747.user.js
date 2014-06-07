// ==UserScript==
// @name        GSPB - Bilderscript
// @description Zeigt Bilder in Beiträgen an, innerhalb des GameStar.de- und des GamePro.de-PinBoards.
// @namespace   konakona@gspb
// @grant       none
// @run-at      document-end
// @updateURL   https://userscripts.org/scripts/source/185747.meta.js
// @downloadURL https://userscripts.org/scripts/source/185747.user.js
// @include     http://www.gamestar.de/community/gspinboard/showthread.php?*
// @include     http://www.gamestar.de/community/gspinboard/showpost.php?*
// @include     http://www.gamepro.de/community/gppinboard/showthread.php?*
// @icon        http://www.gamestar.de/favicon.ico
// @version     3.7.2
// ==/UserScript==
function gspbPopupLoader($){
window.gspbPopup = {
	$ : {},
	array : [],
	index : 0,
	post : [],
	hide : false,
	state : false,
	is_style : false,
	load : function(img){
		var elm = $(img);
		
		this.state = true;
		this.post = elm.closest("div[id^='post_message_']");
		this.array = $(".gspbPreview",this.post);
		this.index = $.inArray(img,this.array);
		this.show(false);
		this.scroll();
		
		this.$.gspbIMG.attr("src",elm.attr("src"));
		this.$.gspbPopup.add(this.$.gspbBG).show();
	},
	scroll : function(){
		if (this.array.length === 1){
			return;
		}
		if (this.index === 0){
			$(window).scrollTop(this.post.offset().top);
		}else{
			var elm = this.array.eq(this.index-1);
			$(window).scrollTop(elm.offset().top + elm.outerHeight());
		}
	},
	close : function(){
		this.state = false;
		this.$.gspbPopup.add(this.$.gspbBG).hide();
		this.$.gspbIMG.attr("src","");
	},
	center : function(){
		if (this.state){
			this.$.gspbIMG.css({
				"max-width" : ($(window).width() - 50) + "px",
				"max-height" : ($(window).height() - 50) + "px"
			});
			
			var width = this.$.gspbPopup.outerWidth(),
				height = this.$.gspbPopup.outerHeight();
			
			this.$.gspbPopup.css({
				"margin-left" : "-" + (width / 2) + "px",
				"margin-top" : "-" + (height / 2) + "px"
			});
			
			this.$.gspbTitle.css({
				"max-width" : (width - 38) + "px",
				"max-height" : (height - 38) + "px"
			});
		}
	},
	jump : function(direction){
		if ((((direction === "previous")||(direction === "first"))&&(this.index === 0))||
			(((direction === "next")||(direction === "last"))&&(this.index === this.array.length-1))){
			return;
		}
		switch (direction){
			case "first":
				this.index = 0;
				break;
			case "previous":
				this.index -= 1;
				break;
			case "next":
				this.index += 1;
				break;
			case "last":
				this.index = this.array.length - 1;
				break;
		}
		this.$.gspbIMG.attr("src",this.array.eq(this.index).attr("src"));
		this.show(false);
		this.scroll();
	},
	show : function(key){
		var title = this.array.eq(this.index).attr("alt"),
			hasTitle = title.length !== 0;
		
		this.$.gspbTitle.html(title).toggle(hasTitle?(key?this.hide:!this.hide):false);
		
		if (key){
			this.hide = !this.hide;
			return;
		}
		
		this.$.gspbPrev.toggle(this.index !== 0);
		this.$.gspbNext.toggle(this.index !== this.array.length - 1);
	},
	init : function(){
		if (location.pathname.indexOf("showpost.php") === -1){
			this.is_style = true;
		}
		
		var that = this,
			regex = /\.(?:jpe?g|png|gif|bmp)(?:[?|#].*)?$|^http:\/\/cloud(?:-[0-9])?\.steampowered\.com\/ugc\/[0-9A-F]+\//i;
		
		$("head").append('<style type="text/css">' +
		'#gspbPopup{background:#f7f7f7;border:1px solid #1c1c1c;display:none;left:50%;padding:10px;position:fixed;top:50%;z-index:10000;}' +
		'#gspbBG{background:#000;display:none;height:100%;left:0;opacity:0.7;position:fixed;top:0;width:100%;z-index:9999;}' +
		'#gspbIMG{-moz-user-select:none;-webkit-user-select:none;}' +
		'#gspbPrev,#gspbNext{cursor:pointer;height:100%;position:absolute;top:0;width:40%;}' +
		'#gspbPrev{left:10px;}#gspbNext{right:10px;}' +
		'#gspbPrev:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAgCAMAAABuFHtpAAAACXBIWXMAAAsSAAALEgHS3X78AAAAM1BMVEX///9KSkp/f3+RkZGfn5+pqamzs7O8vLzDw8PLy8vS0tLY2Nje3t7j4+Pp6ent7e339/ejzDEEAAAAAXRSTlMAQObYZgAAAMBJREFUOMvt1d2KwyAURWGXmpi2aVzv/7RzkZ8K4xAmF4VCvdoc8uExh8Tgv1cIIQS9BL3m3sn8sj8ZAPm2p3QkEJKqGboMbkeaXmyERa0w/mbqRNzSHbakzjCttbnLfD3cMiNJzVuvnd3ymmqh7E2qEyzWdc/e2eJzT4MNqzB5h9plsSzHm1xsmjSTzAz2m9xTHYlLW3vADI8TponU1oRI9JQ9YT7mphagnDMHhpbNrCP/fm8fzd76V750dYQQwg8em16xb9GYYQAAAABJRU5ErkJggg==) no-repeat scroll left 50% transparent;}' +
		'#gspbNext:hover{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAgBAMAAACr5JZoAAAACXBIWXMAAAsSAAALEgHS3X78AAAAMFBMVEX///9KSkp/f3+RkZGfn5+zs7O8vLzDw8PLy8vS0tLY2Nje3t7j4+Pp6ent7e339/fBkF9oAAAAAXRSTlMAQObYZgAAAKVJREFUKM9jYGD4jwvgkfrPwE+m3P+hI/dRFIjl/wsKCsobyvz/LAxkCMLlBOfD5A4K/2+UQZWTBcsBmd8F1yvGgzhwORFhmNx/QzOh/yhycorxEDP//98oJIUqJ79RAib3WdAeTe674EGomRsFJdHk/jsawuwLE3qPJvdIEObOe4LxaHK/BaH+E/ufKI0m978QGi56/z8JI8sN+XgnN13jyyt4JAFJnvD3TQFdLAAAAABJRU5ErkJggg==) no-repeat scroll right 50% transparent;}' +
		'#gspbTitle{-webkit-border-radius:8px;-moz-border-radius:8px;background-color:#000;-moz-user-select:none;-webkit-user-select:none;background:rgba(0,0,0,0.6);border-radius:8px;color:#fff;cursor:default;font-size:12px;left:14px;line-height:12px;padding:4px;position:absolute;top:14px;}' +
		'.gspbPreview{border:0 none;cursor:pointer;display:block;}' +
		'.gspbBody{overflow-y:scroll;}' +
		'</style>');
		
		$("body").append('<div id="gspbPopup"><span id="gspbTitle" onclick="gspbPopup.close();"></span>' +
			'<a id="gspbPrev" onclick="gspbPopup.jump(\'previous\');"></a><a id="gspbNext" onclick="gspbPopup.jump(\'next\');"></a>' +
			'<img id="gspbIMG" src="" alt="" onclick="gspbPopup.close();" onload="gspbPopup.center();">' +
			'</div><div id="gspbBG" onclick="gspbPopup.close();"></div>');
		
		this.$ = {
			gspbPopup : $("#gspbPopup"),
			gspbTitle : $("#gspbTitle"),
			gspbPrev : $("#gspbPrev"),
			gspbNext : $("#gspbNext"),
			gspbIMG : $("#gspbIMG"),
			gspbBG : $("#gspbBG")
		};
		
		
		$("div[id^='post_message_'] a[target='_blank'][class!='spoiler'][rel!='nofollow']:not([href$='#.no'],[href$='.js'])").each(function(){
			var elm = $(this),
				href = elm.attr("href"),
				title = elm.html(),
				width = 0,
				parentsLength;
			
			if ((!elm.closest("div[id^='post_message_'],blockquote:not(.postcontent),table").is("div"))||(!regex.test(href))){
				return;
			}
			
			if (!that.is_style){
				$("body").addClass("gspbBody");
				that.is_style = true;
			}
			
			width = elm.closest("div[id^='post_message_']").width();
			parentsLength = elm.parentsUntil("div[id^='post_message_']","div").length;
			if (parentsLength > 2){
				width -= parentsLength * 5.3333;
			}
			
			$("<img>",{
				on : {
					error : function(){
						$(this).remove();
					}
				},
				"class" : "gspbPreview",
				style : "max-width:" + width + "px;",
				alt : (((title.indexOf("http") === 0)||("http://"+title === href))?"":title),
				onclick : "gspbPopup.load(this);",
				src : href + ((href.indexOf("https://www.dropbox.com/s/") !== -1)?"?dl=1":"")
			}).insertAfter(this);
		});
		
		$(document).on("keydown",function(e){
			if (that.state){
				switch (e.keyCode){
					case 27:
						e.preventDefault();
						that.close();
						break;
					case 35:
					case 40:
						e.preventDefault();
						that.jump("last");
						break;
					case 36:
					case 38:
						e.preventDefault();
						that.jump("first");
						break;
					case 37:
					case 80:
						e.preventDefault();
						that.jump("previous");
						break;
					case 39:
					case 78:
						e.preventDefault();
						that.jump("next");
						break;
					case 72:
					case 83:
						e.preventDefault();
						that.show(true);
						break;
				}
			}
		});
		
		$(window).resize($.proxy(this.center,this));
	}
};
window.gspbPopup.init();
}

if (typeof jQuery !== "function"){
	//jQuery loader: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
	var script = document.createElement("script");
	script.setAttribute("src","http://code.jquery.com/jquery-2.0.3.min.js");
	script.addEventListener("load",function(){
		var script = document.createElement("script");
		script.textContent = "(" + gspbPopupLoader.toString() + ")(jQuery);";
		document.body.appendChild(script);
	},false);
	document.body.appendChild(script);
}else{
	gspbPopupLoader(jQuery);
}
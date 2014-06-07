// ==UserScript==
// @name          Big images for newegg.com
// @namespace     http://bigegg.lehelk.com/
// @description   Lets you realy enjoy the high resolution images on newegg.com. Use keys (+, -, left, right, top, down) and mouse for dragging the image around. For further info please visit http://bigegg.lehelk.com
// @include       http://www.newegg.com/Product/ImageGallery.aspx*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require       https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// ==/UserScript==

// website: http://bigegg.lehelk.com/

(function($) {
var version = "1.0.0";

var globals = {zindex:1000, lastViewer:null, zoom:2, hidden360:true};

function Interface () {
	function init() {
		switch360();
		restyleInterface();
		hideDefaultInterface();
		showLogo();
	}

	function switch360() {
		//$('#threesixty').attr('href','javascript:void()');
		$('#threesixty').click(function() {
			if (globals.hidden360) {
				globals.hidden360 = false;
				showDefaultInterface();
			} else {
				globals.hidden360 = true;
				hideDefaultInterface();
			}
		});
	}
	function restyleInterface() {
		$(document.body).children().css({position:'relative', 'z-index':500000});
		$(document.body).css('padding',0);
		$('#segProductTitle').css('padding-top', 0).css('padding-bottom', '0');
		$('#GalleryContainer').css('float','none').css('width','auto');
		$('#segImageList').css({ 'width':'62px', margin:0, padding:0});
		$('#GalleryContainer #segImageList li').css('margin', '0');
		$('#GalleryContainer #threesixty').css( { 'background-position': '-26px 0', 'overflow': 'hidden', 'width':'60px' } );
		$('#GalleryContainer #segClose').css('top', '-5px');
	}
	function showDefaultInterface() {
		getDefaultInterface().show();
	}
	function hideDefaultInterface() {
		getDefaultInterface().hide();
	}
	function getDefaultInterface() {
		return $('#widViewer, #segGoBack, #segCopyright');
	}
	function showLogo() {
		var $logo = $('<a id="bigegglink" target="_blank" href="http://bigegg.lehelk.com/" style="background-image:url(http://bigegg.lehelk.com/images/background.gif); position:fixed; z-index:500000; bottom: 2px; left: 2px; padding:2px 5px; opacity: 0.6;">Bigegg</a>');
		$logo.appendTo(document.body);
	}
	init();
}
var inte = new Interface();


function ImageViewerController() {
	
	var imageviewers = [];
	
	function init() {
		hookKeyboard();
		createImageViewers();
	}
	

	function hookKeyboard () {
		$('html').keydown(function(event) {
			var delta = 100;
			if(event.altKey || event.ctrlKey || event.shiftKey){return;}
			switch(event.keyCode) {
			case 37:
				if(globals.lastViewer){ globals.lastViewer.move(delta, 0) };
				break;
			case 39:
				if(globals.lastViewer){ globals.lastViewer.move(-delta, 0) };
				break;
			case 38:
				if(globals.lastViewer){ globals.lastViewer.move(0, delta) };
				break;
			case 40:
				if(globals.lastViewer){ globals.lastViewer.move(0, -delta) };
				break;
			case 107:
				zoomIn();
				break;
			case 109:
				zoomOut();
				break;
			}
		});
	}
	
	function createImageViewers() {
		var c = 0;
		while ( $('#segImageList a[href*="shiftImage"]').length && c < 50 ) {
			imageviewers.push( new ImageViewer() );
			c++;
		}
		
		if(globals.currentViewer) {
			globals.currentViewer.click();
		}
			
		//imageviewers[imageviewers.length-1].click();
	}
	
	function zoomIn() {
		if(!globals.lastViewer)return;
		globals.zoom += 1;
		if(globals.zoom > 3) globals.zoom = 3;
		globals.lastViewer.click();
	}

	function zoomOut() {
		if(!globals.lastViewer)return;
		globals.zoom -= 1;
		if(globals.zoom < 1) globals.zoom = 1;
		globals.lastViewer.click();
	}

	
	init();
}

function ImageViewer() {
	var interf = null;
	var initImageInfo;
	var initImageInfo2;
	var scale;
	this.index;
	var container;
	
	var myself = this;
	
	function init() {
		createContainer();
		hookButtonClick();
	}
		
	function onClick() {
		globals.lastViewer = myself;
		interf.css('z-index', globals.zindex++);
		if (globals.zoom == 1) {
			showShiftImg();
		}else if (globals.zoom == 2){
			scale = 2;
			showShiftImg2nd();
		}else if (globals.zoom == 3){
			scale = 1;
			showShiftImg2nd();
		}
	}
	
	function hookButtonClick() {
		$($('#segImageList a[href*="shiftImage"]')[0]).each(function(){
			var $this = $(this);
			$this.attr('href').match(/javascript:Biz\.Product\.ImageGallery\.shiftImage\((.*)\)/);
			var $1 = RegExp.$1 - 1;
			$this.attr('href','javascript:void()');
			myself.index = $1;
			$this.click(function() {
				$('#segImageList').find('li').removeClass('current');
				$(this).parents('li').addClass('current');
				onClick();
			});
			//if(document.location.href.indexOf('CurImage='+unsafeWindow.bpi.Images[myself.index]) > -1) {
			//	globals.currentViewer = myself;
			//}
			if($this.parents('li.current').length > 0) {
				globals.currentViewer = myself;
			}
		})
	}
	
	function createContainer() {
		interf = $('<div></div>');
		interf.appendTo(document.body);
		interf.css({position:'fixed', left:0, top:0, right:0, bottom:0, 'background-color':'#cfc', 'z-index':globals.zindex++, opacity:1, overflow:'hidden'});
	}

	function showShiftImg() {
		interf.empty();
		getImgInfo(processImgInfo);
	}
	function getImgInfo(callBack) {
		var index = myself.index;
		var bpi = unsafeWindow.bpi;
		var url = bpi.BaseUrl + bpi.ImageFolder + bpi.Images[index] + '?req=fvctx,xml,UTF-8,4&scl=1&fmt=swf&labelKey=label';
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(xhrr) {
			},
			onreadystatechange: function(xhrr) {
				if (xhrr.readyState == 4) {
					var xml = $(xhrr.responseText);
					var fset = xml.find('fset');
					var imageInfo = {};
					imageInfo.id     = fset.attr('iv');
					imageInfo.width  = fset.attr('dx');
					imageInfo.height = fset.attr('dy');
					imageInfo.path   = xml.find('i').attr('n');
					initImageInfo = imageInfo;
					callBack(imageInfo);
				}
			}
		});
	}
	function processImgInfo() {
		var imageInfo = initImageInfo;
		var bpi = unsafeWindow.bpi;
		var url = bpi.BaseUrl + imageInfo.path + '?scl=' + (imageInfo.width / 640) + '&id=' + imageInfo.id + '&fmt=png';
		$img = $('<img />');
		$img.attr('src', url);

		$img.css({
			left: (interf.width()  - 640) / 2 + 'px',
			top : (interf.height() - 480) / 2 + 'px',
			position: 'absolute'
		});
		interf.append($img);

	}	
	function showShiftImg2nd() {
		interf.empty();
		getImgInfo2nd(processImgInfo2nd);
	}
	function getImgInfo2nd(callBack) {
		if(!initImageInfo) {
			getImgInfo(showShiftImg2nd);
			return;
		}
		var index = myself.index;
		var bpi = unsafeWindow.bpi;
		var url = bpi.BaseUrl + bpi.ImageFolder + bpi.Images[index] + '?req=ctx,xml&fmt=swf';
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onreadystatechange: function(xhrr) {
				if (xhrr.readyState == 4) {
					var xml = $(xhrr.responseText);
					var ctx = xml.find('ctx').andSelf().filter('ctx');
					var imageInfo = {};
					imageInfo.id     = ctx.attr('iv');
					imageInfo.width  = ctx.attr('dx');
					imageInfo.height = ctx.attr('dy');
					imageInfo.path   = initImageInfo.path;
					initImageInfo2 = imageInfo;
					callBack();
				}
			}
		});
	}
	function move(dx, dy) {
		var x = container.css('left').replace('px', '') * 1;
		var y = container.css('top' ).replace('px', '')* 1;
		container.css('left', x + dx + 'px');
		container.css('top' , y + dy + 'px');
	}
	function processImgInfo2nd() {
		var imageInfo = initImageInfo2;
		var bpi = unsafeWindow.bpi;
		var w = imageInfo.width  / scale;
		var h = imageInfo.height / scale;
		var x0 = (interf.width()  - w) / 2;
		var y0 = (interf.height() - h) / 2;
		var x, y, url, $div, $img, w0, h0;
		var imgs = [];
		$div = $('<div style="background-color:#ded"></div>');
		container = $div;
		$div.appendTo(interf);
		
		var square = 512;
		
		for(x = 0; x < w; x+=square) {
			for(y = 0; y < h; y+=square) {
				$img=$('<img/>');
				w0 = w - x > square ? square : w - x;
				h0 = h - y > square ? square : h - y;
				//$img.attr('src', bpi.BaseUrl + imageInfo.path + '?req=tile&id=' + imageInfo.id + '&rect='+x+','+y+','+w0+','+h0+'&scl=' + scale + '&fmt=png');
				$img.src = bpi.BaseUrl + imageInfo.path + '?req=tile&id=' + imageInfo.id + '&rect='+x+','+y+','+w0+','+h0+'&scl=' + scale + '&fmt=png';
				$img.cx = x + square / 2;
				$img.cy = y + square / 2;
				$img.css({
					left: x0 + x + 'px',
					top : y0 + y + 'px',
					position: 'absolute'
				});
				imgs.push($img);
			}
		}
		
		imgs.sort(function (a,b){ return (Math.pow(w/2-a.cx, 2) + Math.pow(h/2-a.cy, 2)) - (Math.pow(w/2-b.cx, 2) + Math.pow(h/2-b.cy, 2)) } )
		
		for(var i=0; i<imgs.length; i++) {
			imgs[i].appendTo($div);
			imgs[i].attr('src', imgs[i].src);
		}
		
		$div.draggable();

	}

	init();
	
	this.click = function() {
		onClick();
	}
	this.move = function(dx, dy) {
		move(dx, dy);
	}
}

function versionChecker() {
	unsafeWindow.checkBigeggVersion = function(newversion) {
		if(version != newversion) {
			$('#bigegglink')
				//.css({'color':'red'})
				.attr('href', 'http://bigegg.lehelk.com/update.php?v='+version)
				.html('Bigegg <span style="font-style:italic;color:red;"> (new version available)</span><span id="bigeggplaceholder0"></span>')
				.hover(
					function(){
						$('#bigeggplaceholder0').html('. -> Update from v.<b>' + version + '</b> to v.<b>' + newversion+'</b>');
					},
					function(){
						$('#bigeggplaceholder0').html('');
					}
				)
		}
	}

    var head = document.getElementsByTagName('head')[0];
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', 'http://bigegg.lehelk.com/checkversion.php?t='+new Date().getTime());
    head.appendChild(js);
}

function log(e) {
	unsafeWindow.console.log(e);
};

unsafeWindow.jQuery = $;
if(unsafeWindow.bpi.cType == 'STATIC') return;

var controller = new ImageViewerController();
versionChecker();

})(jQuery);

/*saved under gm_scripts*/
// ==UserScript==
// @name           FlickrZoom2
// @namespace      http://erlend.oftedal.no
// @include        http://*flickr.com/*
// @version        0.0.25
// @author	   Erlend Oftedal
// @description    Get preview of thumbnailed images on flickr
// ==/UserScript== 


var fz_localVersion = "0.0.25";

var fz_sc;
var jQuery = null;
var fz_versionPanel;
var fz_endings = /_[stm].jpg$/;
var fz_zoomBox = document.createElement("div");
var fz_loader = document.createElement("img");
var fz_loaderBigNext = document.createElement("img");
var fz_loaderBigPrev = document.createElement("img");
var fz_grayPanel = document.createElement("div");
var documentJQ;
var fz_zoomSpeed = 300;
var fz_hover;
var fz_fadeSpeed = 200;
var fz_activeThumb;
var fz_spacing = 50;
var fz_spacingBig = 80;
var fz_medSize = 200;
var fz_colorBar = document.createElement("div");
var fz_buttonBar = document.createElement("div");
var fz_versionPanel;
var fz_serverVersion;
var fz_videoPanel;
var fz_titleBar = document.createElement("div");
var fz_descriptionBar = document.createElement("div");
var fz_favButton = document.createElement("a");
var fz_openButton = document.createElement("a");
var fz_closeButton = document.createElement("a");
var fz_commentsButton = document.createElement("a");
var fz_linkButtonStyle = {color: "#aaa",  fontSize: "75%", marginLeft: "5px", marginTop: "3px", height: "17px", "width": "54px", float: "left"};
var fz_box = document.createElement("div");
var fz_comments = document.createElement("div");
var fz_linksStyle = {color:"#9999ff"};
var fz_faver = /.*?( - faved by .*)/;
var fz_icons = "#000 url('http://erlend.oftedal.no/photo/faves2.png') no-repeat left";
var fz_favStyle =               { normal: {"background" : fz_icons + " -50px" },  hover : {"background" : fz_icons + " -27px" }};
var fz_favedStyle =             { normal: {"background" : fz_icons + " -5px"  },  hover : {"background" : fz_icons + " -5px"  }};
fz_closeButton.buttonStyle    = { normal: {"background" : fz_icons + " -178px" }, hover : {"background" : fz_icons + " -158px" }};
fz_commentsButton.buttonStyle = { normal: {"background" : fz_icons + " -139px" }, hover : {"background" : fz_icons + " -118px" }};
fz_openButton.buttonStyle     = { normal: {"background" : fz_icons + " -97px" },  hover : {"background" : fz_icons + " -78px" }};
fz_favButton.buttonStyle = fz_favStyle;



function init() {
	jQuery = unsafeWindow.jQuery;
	if (jQuery == null) {
		if (fz_sc == null) {
			fz_sc = document.createElement("script");
			fz_sc.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js";
			document.getElementsByTagName("head")[0].appendChild(fz_sc);
		}
		setTimeout(init, 500);
	} else {
		eval("jQuery.noConflict()");
		documentJQ = jQuery(document);
		goNext();
	}
}

init();

function goNext(){
        checkForNewVersion();
	inject();
	fz_zoomBox.innerHTML = "<img src=\"" + getEmbeddedZoomIcon() + "\" />";	
	jQuery(fz_zoomBox).css({zIndex:100, position:"absolute", cursor:"pointer"}).appendTo(jQuery("body")).hide();
	fz_loader = jQuery(fz_loader);
	fz_loaderBigNext = jQuery(fz_loaderBigNext);
	fz_loaderBigPrev = jQuery(fz_loaderBigPrev);
	setLoader(fz_loader, getEmbeddedLoaderIcon());
	setLoader(fz_loaderBigNext, getEmbeddedLargeLoaderIcon());
	setLoader(fz_loaderBigPrev, getEmbeddedLargeLoaderIcon());
	fz_zoomBox.addEventListener('mouseover', function() { jQuery(fz_zoomBox).show(); }, true);
	fz_zoomBox.addEventListener('mouseout', function() { jQuery(fz_zoomBox).hide(); }, true);
	fz_zoomBox.addEventListener('click', function() { zoomMe(); }, true);
	jQuery(fz_grayPanel).css({top: 0, left:0, position:"absolute", background:"#000000", opacity:0, zIndex: 5000}).appendTo(jQuery("body")).hide();
	jQuery(eval("document")).bind('keypress', function(e) { handleKeyPress(e); });
	fz_colorBar.init();
	fz_buttonBar.init();
	fz_comments.init();
	jQuery(fz_box).css({top: 0, left:0, position:"absolute", zIndex: 5001, overflow: "hidden"})
		.width(documentJQ.width()).height(documentJQ.height()).appendTo(jQuery("body")).hide();
	fz_box.hide = function() { jQuery(fz_box).hide().children("img").hide(); }
}

function setLoader(loader, dataUrl) {
	loader.get(0).src = dataUrl;
	loader.css({position: "absolute", zIndex:50000}).appendTo(jQuery("body")).hide();
}

fz_grayPanel.isshowing = false;
fz_grayPanel.reset = function() {
	jQuery(fz_grayPanel).stop().show().css({opacity:0}); 
}
fz_grayPanel.show = function() { 
	fz_colorBar.show(); jQuery(fz_grayPanel).width(documentJQ.width()).height(documentJQ.height()).show().stop().animate({opacity: 0.75}, fz_fadeSpeed);
	fz_grayPanel.isshowing = true; 
}
fz_grayPanel.fix = function() {
	if (!fz_grayPanel.isshowing) fz_grayPanel.show();
	jQuery(fz_grayPanel).width(documentJQ.width()).height(documentJQ.height()); 
}
fz_grayPanel.hide = function() {
	fz_grayPanel.isshowing = false; jQuery(fz_grayPanel).stop().animate({opacity: 0}, fz_fadeSpeed, null, function() { jQuery(fz_grayPanel).hide(); }); 
}

fz_colorBar.init = function() {
	jQuery(fz_colorBar).css({position:"absolute"}).appendTo(jQuery(fz_box)).width(512).height(15);
	var i = 0;
	for (i = 0; i < 255; i++) {
		var dd = document.createElement("div");
		var cc = i.toString(16).toUpperCase();
		if (i < 16) cc = "0" + cc;
		cc = "#" + cc + cc + cc;
		jQuery(dd).height(15).width(2).css({background: cc, float: "left"}).appendTo(jQuery(fz_colorBar));
		jQuery(dd).bind('mouseover', setBgLayer);
	}
}
fz_colorBar.show = function() {
	var cb = jQuery(fz_colorBar);
	cb.css({top: getScrollTop(), left: calculateCenterX(512)});
}

function setBgLayer() {
	jQuery(fz_grayPanel).css({opacity: 1, background: this.style.backgroundColor});
}


function inject() {
	jQuery("img").each(
		function(i) {
			var tmb = unWrap(this);
			if (!tmb.fz_evaluated) {
				tmb.fz_evaluated = true;
				if (isPreview(tmb)) {
					tmb.fImage = new FlickrImage(tmb);
					tmb.canZoom = true;
				}
			}
		});
	setTimeout(inject, 1000);
}

function zoomMe() {
	fz_hover.showLarge();
}

function isPreview(img) {
	var url = img.src;
	return url.search(fz_endings) != -1 && !contains(img.parentNode.href, "/collections/") && !contains(img.parentNode.href, "/sets/");
}
function contains(haystack, needle) {
	return haystack.indexOf(needle) != -1;
}

function handleKeyPress(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (fz_activeThumb != null) {
		if (code == 39 || code == 37) {
			var img = fz_activeThumb.fImage;
			var next = img.getNext(code == 37 ? -1 : +1);
			if (next != null) next.showLarge();
			return;
		}
		if (code == 27) {
			fz_activeThumb.fImage.zoomOut();
		}
		if (code == 102 || code == 70) {
			fz_activeThumb.fImage.toggleFave();
		}
	}
}

var FlickrImage = function(thumb) {
	var _status = 0;
	var _tmb = thumb;
	var _tmbJQ = jQuery(_tmb);
	var _img_id = _tmb.src.replace(/^.*\/([^\/]+)_..jpg$/, "$1");
	var _urlLarge = null;
	var _fullImg;
	var _fullImgJQ;
	var _fullWidth;
	var _fullHeight;
	var _info;
	var _onLoaded = null;
	var _isVideo;
	var _videoPanel;
	var _comments;
	var _favedBy = "";
	var _bigLoader;
	if (fz_faver.test(_tmb.parentNode.title)) {
		_favedBy = fz_faver.exec(_tmb.parentNode.title)[1];
	}

	if (_tmb.parentNode.parentNode.innerHTML.indexOf("video_play") > -1) {
		_isVideo = true;
	}

	_tmb.addEventListener('mouseover', showZoom, true);
	_tmb.addEventListener('mouseout', hideZoom, true);
	var _targetStatus = 3;
	var _PUBLIC_API = {
		"showLarge"      : showLarge,
		"showMedium"	 : showMedium,
		"setLarge"       : setLarge,
		"zoomOut"	 : zoomOut,
		"hide"		 : hide,
		"setInfo"	 : function(info){ _info = info; },
		"showComments"   : showComments,
		"setComments"	 : setComments,
		"toggleFave"	 : toggleFave,
		"getIndex"	 : getIndex,
		"getNext"	 : getNext,
		"loadInfo"	 : function(callback) { if (_status == 0) loadInfo(callback); }
	}
	var _me = _PUBLIC_API;
	return _PUBLIC_API;


	function hide() {
		log(".hide()");
		if (_fullImgJQ != null) { 
			_fullImgJQ.stop().hide();
			if (_status > 3) _status = 3;
		}
		_targetStatus = 3;
		_onLoaded = null;
		hideBigLoader();
		hideVideoPanel();
	}

	function setLarge(photo, callback) {
		_urlLarge = photo.source; 
		_fullWidth = parseInt(photo.width, 10);
		_fullHeight = parseInt(photo.height, 10); 
		_status = 2; 
		_fullImg = document.createElement("img");
		_fullImgJQ = jQuery(_fullImg).hide().css("border", "1px solid #000").css({display:"none", position:"absolute", zIndex:10000, cursor: "pointer"});
		jQuery(fz_box).append(_fullImg);
		_fullImg.addEventListener('load', function() { _status = 3; if (callback != null) callback(); _loadingDone(); } , true);
		_fullImg.src = _urlLarge;
	}
	function _loadingDone() {
		if (_onLoaded != null) _onLoaded();
	}


	function showLarge() {
		log(".showLarge()");
		_targetStatus = 4;
		fz_activeThumb = _tmb;
		_showLarge();
	}
	function _showLarge() {
		if (_status < 3) {
			_onLoaded = _showLarge;
			if (_status == 0) {
				showLoader();
				_status = 1;
				loadInfo(hideLoader);
			}
			return;
		}
		log("._showLarge()");
		var zoomDone = function() { checkStatus(); fz_buttonBar.setInfo(_me, _info, _fullImgJQ, _favedBy); fz_grayPanel.fix(); drawVideoPanel(); }
		if (_status == 3) { 
			_fullImgJQ.width(_tmbJQ.width()).height(_tmbJQ.height()).css("top", _tmbJQ.offset().top).css("left", _tmbJQ.offset().left).css("opacity", 0).show();
		}
		_fullImgJQ.show().css({zIndex:10001});
		animateTo(calculateCenterY(_fullHeight), calculateCenterX(_fullWidth), _fullHeight, _fullWidth, 1, zoomDone);
		loadMediums(calculateCenterX(_fullWidth), _fullWidth);
		_status = 4;
		resetClick();
		_fullImg.addEventListener('click', zoomOut, true);
		jQuery(fz_box).width(documentJQ.width()).height(documentJQ.height()).show();
	}

	function showMedium(refleft, refwidth, side) {
		fz_comments.hide()
		hideVideoPanel();
		log(".showMedium()");
		_targetStatus = 5;
		var next = getNext(side); if (next != null) next.hide();
		_showMedium(refleft, refwidth, side);
	}

	function _showMedium(refleft, refwidth, side) {
		if (_status < 3) {
			showBigLoader(refleft, refwidth, side);
			_onLoaded = function() { _showMedium(refleft, refwidth, side); };
			if (_status == 0) {
				_status = 1;
				loadInfo(null);
			} 
			return;
		}
		hideBigLoader();
		log("._showMedium()");
		var medHeight = _fullHeight * fz_medSize / _fullWidth;
		var medWidth = fz_medSize;
		if (medHeight > fz_medSize) {
			medHeight = fz_medSize;
			medWidth = _fullWidth * fz_medSize / _fullHeight;
		}
		var x = refleft - fz_spacing - medWidth;
		if (side == 1) {
			x = refleft + refwidth + fz_spacing;
		}
		var y = calculateCenterY(medHeight);
		if (_status == 3) {
			_fullImgJQ.css({ top: y,  left: x, width: medWidth, height: medHeight, opacity: 0});
		}
		_status = 5;
		_fullImgJQ.show().css({zIndex:10000});
		animateTo(y, x, medHeight, medWidth, .7, checkStatus);
		resetClick();
		_fullImg.addEventListener('click', showLarge, true);
	}

	function checkStatus() {
		var distance = Math.abs(fz_activeThumb.fImage.getIndex() - getIndex());
		if (_targetStatus == 3 || distance > 1) {
			hide();
		}
	}

	function resetClick() {
		_fullImg.removeEventListener('click', showLarge, true);
		_fullImg.removeEventListener('click', zoomOut, true);
	}

	function loadMediums(refleft, refwidth) {
		showMediumIfAvailable(refleft, refwidth, -1);
		showMediumIfAvailable(refleft, refwidth, +1);
		loadInfoIfAvailable(-2);
		loadInfoIfAvailable(+2);
		loadInfoIfAvailable(+3);
	}
	function showMediumIfAvailable(refleft, refwidth, step) {
		var next = getNext(step); 
		if (next != _me && next != null) next.showMedium(refleft, refwidth, step);
	}
	function loadInfoIfAvailable(step) {
		var next = getNext(step); 
		if (next != _me && next != null) setTimeout(function() { next.loadInfo(null) }, 10);
	}

	function getNext(step) {
		var imgs = jQuery("img").filter(function(index) { return unWrap(this).canZoom; });
		var ix = imgs.index(_tmb) + step;	
		if (ix < 0 || ix >= imgs.length) return null;
		ix = (ix + imgs.length) % imgs.length;
		return imgs.get(ix).fImage;
	}
	function getIndex() {
		var imgs = jQuery("img").filter(function(index) { return unWrap(this).canZoom; });
		return imgs.index(_tmb);
	}

	function animateTo(y, x, height, width, opacity, callback) {
		_fullImgJQ.stop().animate({ top: y, left: x, width: width, height: height, opacity: opacity}, fz_zoomSpeed, null, callback);
	}
	function zoomOut() {
		fz_comments.hide()
		log(".zoomOut()");
		hideVideoPanel();
		_onLoaded = null;
		_targetStatus = 3;
		fz_grayPanel.hide();
		animateTo(_tmbJQ.offset().top, _tmbJQ.offset().left, _tmbJQ.height(), _tmbJQ.width(), 0, function() { hide(); fz_box.hide(); });
		hideIfAvailable(-1);
		hideIfAvailable(+1);
		fz_buttonBar.hide();
	}
	function hideIfAvailable(step) {
		var next = getNext(step); 
		if (next != null) next.hide();
	}	

	function loadInfo(callback) {
		var versionListener = {
			flickr_photos_getSizes_onLoad: function(success, responseXML, responseText, params){ eval("this." + responseText); },
			jsonFlickrApi: function(data) {
				var bigger; var medium;
				for(var size in data.sizes.size) {
					if (data.sizes.size[size].label == "Medium") {
						medium = data.sizes.size[size];
					} else if (data.sizes.size[size].label == "Large" && (data.sizes.size[size].height < jQuery(window).height()) && (data.sizes.size[size].width < jQuery(window).width())) {
						bigger = data.sizes.size[size];
					} else if (data.sizes.size[size].label == "Original" && (data.sizes.size[size].height < jQuery(window).height()) && (data.sizes.size[size].width < jQuery(window).width())) {
						bigger = data.sizes.size[size];
					}
				}
				this.fImage.setLarge((bigger != null ? bigger : medium), callback);
			},
			fImage: _me
		}
		var infoListener = {
			flickr_photos_getInfo_onLoad: function(success, responseXML, responseText, params){ eval("this." + responseText); },
			jsonFlickrApi: function(data) { 
				this.fImage.setInfo(data.photo); 
			},
			fImage: _me
		}		
		versionListener.callback = callback;
		unsafeWindow.F.API.callMethod('flickr.photos.getSizes', {"format": "json", "photo_id": _img_id}, versionListener);
		unsafeWindow.F.API.callMethod('flickr.photos.getInfo', {"format": "json", "photo_id": _img_id}, infoListener);		
	}
	function showZoom() {
		jQuery(fz_zoomBox).css("top", _tmbJQ.offset().top + 1).css("left", _tmbJQ.offset().left + _tmbJQ.width() - 33).css("z-index", 20000).show();
		fz_hover = _tmb.fImage;
	}
	function hideZoom() {
		jQuery(fz_zoomBox).hide();
	}
	function showLoader() {
		fz_loader.css("top", _tmbJQ.offset().top + (_tmbJQ.height() - fz_loader.height()) /2).css("left", _tmbJQ.offset().left + (_tmbJQ.width() - fz_loader.width()) /2).show();	
	}
	function hideLoader() {
		fz_loader.hide();
	}
	function showBigLoader(refleft, refwidth, side) {
		var x = refleft - fz_spacingBig - 100;
		if (side == 1) {
			x = refleft + refwidth + fz_spacingBig;
		}
		var y = calculateCenterY(100);
		_bigLoader = (side == 1 ? fz_loaderBigNext : fz_loaderBigPrev).css({left: x, top: y, opacity: 0, zIndex: 9999})
			.show().animate({opacity: 0.6}, fz_fadeSpeed);
	}
	function hideBigLoader() {
		if (_bigLoader != null) _bigLoader.hide();
	}
	function toggleFave() {
		setFaveIcon(_info.isfavorite != "1");
		_info.isfavorite = (_info.isfavorite == "1") ? "0" : "1";
		unsafeWindow.F.API.callMethod(((_info.isfavorite == "1") ? "flickr.favorites.add" : "flickr.favorites.remove"), {photo_id:_img_id}, fz_favButton); 
		return false;
	}
	function log(msg) {
		//var imgs = jQuery("img").filter(function(index) { return unWrap(this).canZoom; });
		//var ix = imgs.index(_tmb);
		//GM_log(_status + ":" + _targetStatus + ":[" + _img_id + "] " + ix + msg);
	}

	function drawVideoPanel() {
		if (!_isVideo) return;
		var ar = /.*\/([^_]+)_([^_]+)_.\.jpg$/.exec(_tmb.src);
		_videoPanel = document.createElement("div");
		jQuery(_videoPanel).width(_fullImgJQ.width()).height(_fullImgJQ.height()).css({top: _fullImgJQ.offset().top, left: _fullImgJQ.offset().left, zIndex:10000})
			.appendTo(jQuery("body"));
		_videoPanel.id = "stewart_swf" + ar[1] + "_divx";
		_videoPanel.className = "photo_gne_video_wrapper_div";
		var F = unsafeWindow.F;
		var _ge = unsafeWindow._ge;
		F.decorate(_ge('stewart_swf' + ar[1] + '_divx'), F._stewart_swf_div).stewart_go_go_go(_fullImgJQ.width(), _fullImgJQ.height(), {
			onsite: 'true',	flickr_noAutoPlay: 'false', in_photo_gne: 'true',
			photo_secret: ar[2], photo_id: ar[1]
		});
		jQuery(_videoPanel).css({position:"absolute"}).show();
	}
	function hideVideoPanel() {
		if (_videoPanel == null) return;
		_videoPanel.parentNode.removeChild(_videoPanel);
		_videoPanel.id = ""; 
		_videoPanel = null;
	}
	function loadComments() {
		var commentsListener = {
			flickr_photos_comments_getList_onLoad: function(success, responseXML, responseText, params){ eval("this." + responseText); },
			jsonFlickrApi: function(data) { 
				this.fImage.setComments(data.comments);
			},
			fImage: _me
		}		

		unsafeWindow.F.API.callMethod('flickr.photos.comments.getList', {"format": "json", "photo_id": _img_id}, commentsListener);	
	}
	function setComments(comments) {
		_comments = comments;
		showComments();
	}
	function showComments() {
		if (_comments == null) {
			loadComments();
			return;
		}
		fz_comments.show(_comments.comment);
	}
}

fz_comments.init = function() {
	jQuery(fz_comments).css({left:"0px", overflow:"auto", backgroundColor:"#000", color:"#fff", padding: "5px 10px 15px 15px",
		borderRight:"1px solid #444", borderTop:"1px solid #444", position:"absolute", zIndex:10001, textAlign: "left" }).appendTo(jQuery("body")).hide();
}

fz_comments.show = function(comments) {
	jQuery(fz_comments).width(jQuery(window).width()*0.33).html("").css({height:"auto"});

	var cButton = jQuery("<a>").get(0);
	cButton.buttonStyle = fz_closeButton.buttonStyle;
	linkFormat(cButton, "", jQuery(fz_comments));
	jQuery(cButton).bind('click', fz_comments.hide).css({float:"right", marginRight:"5px", width:"40px"});

	jQuery("<h2>").html("Comments").appendTo(jQuery(fz_comments));
	if (comments != null) {	
		for (var i in comments) {
			var box = jQuery("<div>").css({padding:"5px 0px 10px 0px"}).appendTo(jQuery(fz_comments));
			jQuery("<div>").html("<b><a href='/photos/" + comments[i].author + "/'>" + comments[i].authorname + "</a></b> said on " + new Date(1000 * parseInt(comments[i].datecreate))).css({fontSize:"12px"}).appendTo(jQuery(box));
			jQuery("<div>").html(comments[i]._content).appendTo(jQuery(box)).css({fontSize:"14px"});
		}
		jQuery(fz_comments).find("div a").css(fz_linksStyle);
	} else {
		jQuery("<i>").html("No comments").appendTo(jQuery(fz_comments));
	}
	if (jQuery(fz_comments).height() > jQuery(window).height()) jQuery(fz_comments).height(jQuery(window).height() - 20);
	var bottom = getScrollTop() + jQuery(window).height();
	jQuery(fz_comments).css({top: bottom}).show().animate({top:bottom - jQuery(fz_comments).height()}, 200);	
}

fz_comments.hide = function() {
	var bottom = getScrollTop() + jQuery(window).height();
	jQuery(fz_comments).animate({top: bottom}, 200, null, function() { jQuery(fz_comments).hide(); });
}


fz_buttonBar.init = function() {
	jQuery(fz_buttonBar).css({position:"absolute", zIndex: 9999, background:"#000", padding: "3px 0px 5px 0px", textAlign: "left"})
		.appendTo(jQuery("body")).hide();
	linkFormat(fz_closeButton, "", jQuery(fz_buttonBar));
	linkFormat(fz_favButton,   "", jQuery(fz_buttonBar));
	linkFormat(fz_openButton,  "", jQuery(fz_buttonBar));
	linkFormat(fz_commentsButton, "", jQuery(fz_buttonBar));
	jQuery(fz_closeButton).css({float:"right", marginRight:"5px", width:"40px"});
	jQuery(fz_titleBar).css({textAlign:"left", fontWeight:"bold", color:"#aaa", fontSize: "95%", padding: "7px 5px 5px 5px", clear: "both"}).appendTo(jQuery(fz_buttonBar));
	jQuery(fz_descriptionBar).css({textAlign:"left", color:"#aaa", fontSize: "75%", padding: "0px 5px 3px 5px"}).appendTo(jQuery(fz_buttonBar));
}



fz_buttonBar.setInfo = function(img, info, fullImg, favedBy) {
	var desc = info.description._content;
	fz_descriptionBar.innerHTML = (desc != null ? desc : "");
	fz_titleBar.innerHTML = info.title._content + " by " + info.owner.username;
	if (favedBy != "") {
		jQuery("<span>").html(favedBy).css({fontSize: "80%", fontWeight:"normal"}).appendTo(jQuery(fz_titleBar));
	}
	setFaveIcon(info.isfavorite == "1");
	jQuery(fz_favButton).unbind("click").bind("click", function() { return img.toggleFave() });
	jQuery(fz_commentsButton).unbind("click").bind("click", img.showComments);
	jQuery(fz_closeButton).unbind("click").one("click", img.zoomOut);
	fz_openButton.href = "/photos/" + info.owner.nsid + "/" + info.id + "/";
	var buttons = jQuery(fz_buttonBar).show();
	buttons.width(fullImg.width()).css("left", fullImg.offset().left);
	var y = jQuery(window).height() - buttons.height() - 20 + getScrollTop();
	if (y < (fullImg.offset().top + fullImg.height())) y = fullImg.offset().top + fullImg.height();
	buttons.css({top:y, opacity:0}).stop().animate({opacity:1}, 200);
	jQuery(fz_descriptionBar).find("a").css(fz_linksStyle);
}


function setFaveIcon(isFave) {
	fz_currentFavStyle = isFave ? fz_favedStyle  : fz_favStyle;
	fz_favButton.buttonStyle = fz_currentFavStyle;
	jQuery(fz_favButton).css(fz_favButton.buttonStyle.normal);
}


fz_buttonBar.hide = function(img, info, fullImg) {
	jQuery(fz_buttonBar).show().stop().animate({opacity:0}, 100, function() { jQuery(fz_buttonBar).hide(); });
}

function linkFormat(link, title, parent) {
	jQuery(link).html(title).appendTo(parent).css(fz_linkButtonStyle).css(link.buttonStyle.normal);
	link.href = "javascript:"
	fz_setupButtonStyles(link);
}

function fz_setupButtonStyles(button) {
	jQuery(button).bind('mouseout',  function() { jQuery(button).css(button.buttonStyle.normal) })
		      .bind('mouseover', function() { jQuery(button).css(button.buttonStyle.hover) });	
}

function calculateCenterX(width) {
	return (jQuery(window).width() - width) / 2;
}

function calculateCenterY(height) {
	var y = (jQuery(window).height() - height) / 2 + getScrollTop();
	var maxY = jQuery(document).height() - 40 - height;
	if (y > maxY) y = maxY;
	if (y < 5) y = 5;
	return y;
}



function getScrollTop() {
	return jQuery(document).scrollTop();
}




function closeVersionBar() {
	GM_setValue("ignored_version", fz_serverVersion);
	fz_versionPanel.hide();
}

function checkForNewVersion() {
	var iupd = GM_getValue("ignored_version", "");
	var d = new Date();
	var ss = ("" + d.getFullYear()) + toTwoLetter(d.getMonth() + 1) + toTwoLetter(d.getDate());
	var ys = parseFloat(ss);

	var upd = GM_getValue("checked_for_new_version", 0);
	if(ys > upd){
	  GM_setValue("checked_for_new_version", ys);	
	  GM_xmlhttpRequest({
		method: "GET",
		url: 'http://userscripts.org/scripts/review/58192',
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:'',
		onload:function(result) {
			var res = result.responseText;
			var re = /@version[ ]+([0-9.]+)/gm;
			var ar = re.exec(res);			
			fz_serverVersion = ar[1] + "";
			if (fz_serverVersion > fz_localVersion && fz_serverVersion > iupd){
				fz_versionPanel = jQuery("<div />").css({backgroundColor: "#1057AE", color: "#fff", fontWeight: "bold", "padding": "5px 5px 5px 5px"}).html("A new version of FlickrZoom2beta is available: ");
				fz_versionPanel.prependTo("body");				
				jQuery('<a href="http://userscripts.org/scripts/show/58192" target="_blank">Download</a>').css({color: "#fff"}).appendTo(fz_versionPanel);
				var ignLink = document.createElement("a");
				jQuery(ignLink).css({color: "#fff", marginLeft:"5px"}).appendTo(fz_versionPanel).text("Ignore").attr("href", "javascript:");
				ignLink.addEventListener('click', closeVersionBar, true);
				
			}
		}
	  });
	}
}
function toTwoLetter(number) {
	return ("" + (number + 100)).substring(1,3);
}

function unWrap(elm) {
	return elm.wrappedJSObject || elm;
}

function getEmbeddedZoomIcon() {
	return "data:image/png;base64,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";
}

function getEmbeddedLoaderIcon() {
	return "data:image/gif;base64,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";
}
function getEmbeddedLargeLoaderIcon() {
	return "data:image/gif;base64,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";
}
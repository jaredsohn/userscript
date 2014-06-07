// ==UserScript==
// @name           FlickrZoom
// @namespace      http://erlend.oftedal.no
// @include        http://*flickr.com/*
// @include        http://*.photosight.*/*
// @include        http://*photosig.com/*
// @include        http://*onexposure.net/*
// @include        http://1x.com/*
// @include        http://www.facebook.com/*
// @include        http://lab.bernatcasero.com/flickr/onexplorenow/*
// @include        http://images.google.*
// @include        http://www.google.*/images?*
// @version        0.0.49
// @author	   Erlend Oftedal
// @description    Get preview of thumbnailed images on flickr, photosight, photosig and onexposure
// ==/UserScript== 


var fz_localVersion = "0.0.49";

var fz_zoomSpeed = 300;
var fz_fadeSpeed = 200;

var fz_sc;
var jQuery = null;
var fz_zoomBox;
var fz_activeThumb;
var fz_hoverThumb;
var fz_grayPanel;
var fz_loader;
var fz_endings = /_[stm].jpg$/;
var fz_buttonBar;
var fz_openButton;
var fz_closeButton;
var fz_linkButtonStyle = {color: "#aaa",  fontSize: "75%", marginLeft: "5px"};
var fz_favButton;
var fz_OESelect;
var fz_OEOptions;
var fz_OESelectButton;
var fz_titleBar;
var fz_descriptionBar;
var fz_isPS = false;
var fz_isOE = false;
var fz_isPsig = false;
var fz_isFlickr = false;
var fz_isFacebook = false;
var fz_isBernat = false;
var fz_isGoogle = false;
var fz_colorBar;
var fz_versionPanel;
var fz_serverVersion;
var fz_videoPanel;


function fzinit() {
	jQuery = unsafeWindow.jQuery;
	if (jQuery == null) {
		if (fz_sc == null) {
			fz_sc = document.createElement("script");
			fz_sc.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js";
			document.getElementsByTagName("head")[0].appendChild(fz_sc);
		}
		setTimeout(fzinit, 500);
	} else {
		eval("jQuery.noConflict()");
		goNext();
	}
}
if (contains(document.location.href, "facebook.com")) {
	setTimeout(fzinit, 500);
} else {
	fzinit();
}

function goNext() {
	checkForNewVersion();
	fz_isPS = contains(document.location.href, "photosight.");
	fz_isOE = contains(document.location.href, "onexposure.net") || contains(document.location.href, "/1x.com");
	fz_isPsig = contains(document.location.href, "photosig.com");
	fz_isFacebook = contains(document.location.href, "facebook.com");
	fz_isBernat = contains(document.location.href, "lab.bernatcasero.com");
	fz_isGoogle = contains(document.location.href, "images.google.") || /www.google.[^/]+\/images/.test(document.location.href);
	fz_isFlickr = !(fz_isPS || fz_isOE || fz_isPsig || fz_isFacebook || fz_isBernat || fz_isGoogle);
	inject();
	fz_zoomBox = document.createElement("div");
	fz_zoomBox.innerHTML = "<img src=\"" + getEmbeddedZoomIcon() + "\" />";	
	jQuery(fz_zoomBox).css({zIndex:100, position:"absolute", cursor:"pointer"}).appendTo(jQuery("body")).hide();
	fz_loader = document.createElement("img");
	fz_loader.src = getEmbeddedLoaderIcon();
	jQuery(fz_loader).css({position: "absolute", zIndex:50000}).appendTo(jQuery("body")).hide();
	fz_zoomBox.addEventListener('mouseover', function() { jQuery(fz_zoomBox).show(); }, true);
	fz_zoomBox.addEventListener('mouseout', function() { jQuery(fz_zoomBox).hide(); }, true);
	fz_zoomBox.addEventListener('click', function() { zoomMe(fz_hoverThumb) }, true);
	fz_grayPanel = document.createElement("div");
	jQuery(fz_grayPanel).css({top: 0, left:0, position:"absolute", background:"#000000", opacity:0})
		.appendTo(jQuery("body")).hide();
	fz_buttonBar = document.createElement("div");
	jQuery(fz_buttonBar).css(
		{position:"absolute", zIndex: 9999, background:"#000", padding: "3px 0px 5px 0px", textAlign: "left"}
		).appendTo(jQuery("body")).hide();

	fz_closeButton = document.createElement("a");
	jQuery(fz_closeButton).html("Close").css(fz_linkButtonStyle).css({float:"right", marginRight:"5px"}).appendTo(jQuery(fz_buttonBar));
	fz_openButton = document.createElement("a");
	jQuery(fz_openButton).html("Open image page").css(fz_linkButtonStyle).appendTo(jQuery(fz_buttonBar));
	fz_favButton = document.createElement("a");
	fz_OESelect = document.createElement("span");
	if (fz_isOE) {
		fz_OESelectButton = document.createElement("a");
		jQuery(fz_OESelect).appendTo(jQuery(fz_buttonBar)).css("margin-left", 10);
		jQuery(fz_OESelectButton).bind('click', function() { OEAddToAlbum(); return false; })
			.appendTo(jQuery(fz_buttonBar)).html("Add to album").css(fz_linkButtonStyle);
		jQuery(fz_favButton).css("padding-left", "20px");
		fz_OESelectButton.href = "javascript:";
	}
	jQuery(fz_favButton).html("Add to faves").css(fz_linkButtonStyle).appendTo(jQuery(fz_buttonBar));
	fz_closeButton.href = "javascript:";
	fz_favButton.href = "javascript:";
	fz_colorBar = document.createElement("div");
	jQuery(fz_colorBar).css({position:"absolute"}).appendTo(jQuery(fz_grayPanel)).width(15).height(512);
	var i = 0;
	for (i = 0; i < 255; i++) {
		var dd = document.createElement("div");
		var cc = i.toString(16).toUpperCase();
		if (i < 16) cc = "0" + cc;
		cc = "#" + cc + cc + cc;
		jQuery(dd).height(2).width(15).css({background: cc}).appendTo(jQuery(fz_colorBar));
		jQuery(dd).bind('mouseover', setBgLayer);
	}
	jQuery(eval("document")).bind('keypress', function(e) { handleKeyPress(e); });
	fz_titleBar = document.createElement("div");
	jQuery(fz_titleBar).css({textAlign:"left", fontWeight:"bold", color:"#aaa", fontSize: "95%", padding: "7px 5px 5px 5px"}).appendTo(jQuery(fz_buttonBar));

	fz_descriptionBar = document.createElement("div");
	jQuery(fz_descriptionBar).css({textAlign:"left", color:"#aaa", fontSize: "75%", padding: "0px 5px 3px 5px"}).appendTo(jQuery(fz_buttonBar));

}


function handleKeyPress(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (fz_activeThumb != null) {
		if  (code == 39 || code == 37) {
			var imgs = jQuery("img").filter(function(index) { return unWrap(this).canZoom; });
			var ix = imgs.index(fz_activeThumb);
			zoomMeOut(fz_activeThumb);
			ix = ix + (code == 37 ? -1 : +1);
			ix = (ix +  imgs.length) % imgs.length;
			zoomMe(imgs.get(ix));
		} else if (code == 27) {
			zoomMeOut(fz_activeThumb);
			
		} 
	}
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
					tmb.addEventListener('mouseover', showZoom, true);
					tmb.addEventListener('mouseout', hideZoom, true);
					tmb.canZoom = true;
				}
			}
		});
	setTimeout(inject, 1000);
}

function isPreview(img) {
	var url = img.src;
	if (fz_isPS) {
		return contains(url, "pv_") || contains(url, "fp_") || contains(url, "_icon");
	} else if (fz_isOE) {
		return contains(url, "-thumb") || contains(url, "/tiny/") || contains(url, "-square");
	} else if (fz_isPsig) {
		return contains(url, "-thumb") ||  contains(url, "-blur");
	} else if (fz_isFacebook) {
		return url.match(/http:\/\/[^\/]+(.ak.fbcdn.net|facebook.com)\/.*\/((s|q|t)[0-9_]+|[0-9_]+(s|q|t)).jpg/);
	} else if (fz_isBernat) {
		return url.search(fz_endings) != -1;
	} else if (fz_isGoogle) {
		return url.match(/http:\/\/t[0-9]+.gstatic.com\/.*/);

	} else {
		return url.search(fz_endings) != -1 && !contains(img.parentNode.href, "/collections/") &&
			!contains(img.parentNode.href, "/sets/");
	}
}
function contains(haystack, needle) {
	return haystack.indexOf(needle) != -1;
}

function showZoom() {
	var thumb = jQuery(this);
	jQuery(fz_zoomBox).css("top", thumb.offset().top + 1).css("left", thumb.offset().left + thumb.width() - 33)
		.css("z-index", 20000).show();
	fz_hoverThumb = unWrap(this);
}
function hideZoom() {
	jQuery(fz_zoomBox).hide();
}

function zoomMe(tmb) {
	fz_activeThumb = tmb;
	fz_descriptionBar.innerHTML = (tmb.description != null ? tmb.description : "");
	var imgs = jQuery("img").filter(function(index) { return unWrap(this).canZoom; });
	var ix = imgs.index(fz_activeThumb);
	ix = (ix + 1 + imgs.length) % imgs.length;
	var img = new Image();
	img.src = getUrl(imgs.get(ix));
	if (fz_isFlickr) {
		var imgl = new Image();
		imgl.src = getUrl(imgs.get(ix)).replace(".jpg", "_b.jpg");
	}
	try {
	  if (tmb.fullImg == null) {
		var thumb = jQuery(tmb);
		showLoader(thumb);
		if (fz_isPsig) {
			jQuery.get(tmb.parentNode.href, null, function (data) { extractData(tmb, data); });
		} else {
			buildFull(tmb);
		}
  	  } else {
		zoomMeBegin(tmb);
	  }
	}catch(e) {
		alert(e);
	}
	return false;
}
function showLoader(jqElm) {
	var loader = jQuery(fz_loader);
	loader.css("top", jqElm.offset().top + (jqElm.height() - loader.height()) /2)
	      .css("left", jqElm.offset().left + (jqElm.width() - loader.width()) /2)
	      .show();
}
function hideLoader() {
	jQuery(fz_loader).hide();
}

function extractData(tmb, data) {
	var re = /<img src=.([^ ]+). .*? class=.outlined./;
	var ar = re.exec(data);
	tmb.psig_url = ar[1];
	buildFull(tmb);
}

function buildFull(tmb) {
	tmb.fullImg = document.createElement("img");
	tmb.fullImg.thumb = this;
	var img = tmb;
	tmb.fullImg.addEventListener('load', function () { jQuery(fz_loader).hide();zoomMeBegin(img); }, true);
	var url = getUrl(tmb);
	jQuery(tmb.fullImg).css({display:"none", position:"absolute", zIndex:10000});
	jQuery("body").append(tmb.fullImg);
	tmb.fullImg.addEventListener('click', function() { zoomMeOut(img); } , true);
	if (fz_isFlickr) {
		var img_id = tmb.src.replace(/^.*\/([^\/]+)_..jpg$/, "$1");
		tmb.versionlistener = {
			flickr_photos_getSizes_onLoad: function(success, responseXML, responseText, params){
				eval("this." + responseText);
			},
			jsonFlickrApi: function(data) {
				var medium;
				var bigger;
				for(var size in data.sizes.size) {
					if (data.sizes.size[size].label == "Medium") {
						medium = data.sizes.size[size].source;
					} else if (data.sizes.size[size].label == "Large") {
						if ((data.sizes.size[size].height < jQuery(window).height()) 
							&& (data.sizes.size[size].width < jQuery(window).width())) {
							bigger = data.sizes.size[size].source;
						}
					} else if (data.sizes.size[size].label == "Original") {
						if ((data.sizes.size[size].height < jQuery(window).height()) 
							&& (data.sizes.size[size].width < jQuery(window).width())) {
							bigger = data.sizes.size[size].source;
						}
					}
				}
				this.tmb.fullImg.src = (bigger != null ? bigger : medium);
			},
			tmb: tmb
		}
		unsafeWindow.F.API.callMethod('flickr.photos.getSizes', {"format": "json", "photo_id": img_id}, tmb.versionlistener);
		tmb.listener = {
			flickr_photos_getInfo_onLoad: function(success, responseXML, responseText, params){
				eval("this." + responseText);
			},
			jsonFlickrApi: function(data) {
				this.tmb.description = data.photo.description._content;
				fz_descriptionBar.innerHTML = this.tmb.description;
			},
			tmb: tmb
		}
		unsafeWindow.F.API.callMethod('flickr.photos.getInfo', {"format": "json", "photo_id": img_id}, tmb.listener);


	} else {
		tmb.fullImg.src = url;
	}
}



function getUrl(tmb) {
	var url;
	if (fz_isPS) {
		if (document.location.href.indexOf("photosight.us") != -1) {
			var re = /.*\/([0-9]+)\/([0-9]+)\/([0-9]+)\/(pv_|fp_)([0-9]+).jpg/;
			var ar = re.exec(tmb.src);
			url = "http://photosight.us/showimg.php?y=" + ar[1] + "&m=" + ar[2] + "&d=" + ar[3] + "&image=" + ar[5] + ".jpg";
		} else {
			url = tmb.src.replace("pv_", "").replace("fp_", "").replace("/tup/", "/up/").replace("prv-", "img-")
				.replace("_icon", "_large");
		}
	} else if(fz_isPsig) {
		url = tmb.psig_url;
	} else if(fz_isOE) {
		if (tmb.src.indexOf("/tiny/") != -1) {
			url = tmb.src.replace("/tiny/" , "/").replace(".jpg", "-fullsize.jpg");
		} else {
			url = tmb.src.replace("pictures", "OEfullSize").replace("-thumb", "-fullsize").replace("-square", "-fullsize");
		}
	} else if(fz_isFacebook) {
		url = tmb.src.replace(/(.*)(s|q|t)([0-9_]+.jpg)$/, "$1n$3").replace(/(.*)([0-9_]+)(s|q|t).jpg$/, "$1$2n.jpg");
	} else if(fz_isGoogle) {
		url = tmb.parentNode.href.replace(/.*?imgres\?imgurl=(.*?)&imgrefurl.*/, "$1");

	} else {		
		url = tmb.src.replace(fz_endings, ".jpg");
	}
	return url;
}

function zoomMeBegin(tmb) {
	jQuery(fz_buttonBar).hide();
	if (fz_activeThumb != tmb) return;
	var thumb = jQuery(tmb);
	var full = jQuery(tmb.fullImg);
	if (tmb.fullImg.originalHeight == null) {
		tmb.fullImg.originalHeight = tmb.fullImg.height;
		tmb.fullImg.originalWidth = tmb.fullImg.width;
	}
	full.width(thumb.width()).height(thumb.height())
		.css("top",thumb.offset().top).css("left", thumb.offset().left)
		.show();
	jQuery(fz_grayPanel).stop().width(jQuery(document).width()).height(jQuery(document).height()).show().css("opacity", 0);
	var cby = (jQuery(window).height() - jQuery(fz_colorBar).height()) / 2 + getScrollTop();
	if (cby < 0) cby = 0;
	fz_colorBar.style.top = cby;
	var x = (jQuery(window).width() - tmb.fullImg.originalWidth) / 2;
	var y = (jQuery(window).height() - tmb.fullImg.originalHeight) / 2 + getScrollTop();
	var maxY = jQuery(document).height() - 40 - tmb.fullImg.originalHeight;
	if (fz_isOE) {
		maxY = jQuery("div#full").height() - 40 - tmb.fullImg.originalHeight;
	}
	if (y > maxY) y = maxY;
	if (y < 5) y = 5;
	full.css("opacity", 0).css("border", "1px solid #000");
	full.stop().animate({
			top: y, left: x, opacity: 1, 
			width: tmb.fullImg.originalWidth, height: tmb.fullImg.originalHeight
		}, fz_zoomSpeed, null, function() { zoomDone(tmb); });
}
function getScrollTop() {
	return jQuery(document).scrollTop();
}


function zoomDone(tmb) {
	if (fz_activeThumb != tmb) { zoomMeOut(tmb); return; }
	fz_openButton.href = tmb.parentNode.href;
	var buttons = jQuery(fz_buttonBar);
	var isVideo = false;
	if (fz_isPS) {
		if (!contains(tmb.src, "photosight.ru")) {
			var re = /.*(pv_|fp_)([0-9]+).jpg$/;
			var ar = re.exec(tmb.src);
			fz_favButton.p_id = ar[2];
			jQuery(fz_favButton).unbind("click").bind("click", 
				function() { jQuery.get("add_my.php?photoid=" + fz_favButton.p_id, null, function(data) { hideLoader(); }); return false; });
		} else {
			jQuery(fz_favButton).hide();
		}
	} else if(fz_isOE) {
		var re = /.*\/([0-9]+)(-[^\/]*)?.jpg$/;
		var ar = re.exec(tmb.src);
		fz_favButton.p_id = ar[1];
		jQuery(fz_favButton).unbind("click").bind("click", 
			function() { jQuery.post("/oeincludes/inc_favstate.php?id=" + fz_favButton.p_id, {"change": true}, function(data) { hideLoader(); }); return false; });
		jQuery(fz_OESelect).hide();
		jQuery(fz_OESelectButton).hide();
		jQuery.get(fz_openButton.href, null, function(data) { OEExtract(tmb, data); });
			buttons.css("border", "1px solid #111").css("border-top", "none");
	} else if(fz_isPsig || fz_isFacebook || fz_isBernat || fz_isGoogle){
			jQuery(fz_favButton).hide();
	} else {
		if (tmb.parentNode.parentNode.innerHTML.indexOf("video_play") > -1) {
			drawVideoPanel(tmb);
			isVideo = true;
		} 
		fz_titleBar.innerHTML = tmb.parentNode.title;
		var re = /.*\/([0-9]+)\/.*/;
		var ar = re.exec(tmb.parentNode.href);
		fz_favButton.p_id = ar[1];
		jQuery(fz_favButton).unbind("click").bind("click", 
			function() { unsafeWindow.F.API.callMethod("flickr.favorites.add", {photo_id:fz_favButton.p_id}, fz_favButton); return false; });
	}
	jQuery(fz_closeButton).one("click", function() { zoomMeOut(tmb); return false; });
	jQuery(fz_grayPanel).css({zIndex: 5000, opacity:0})
		.stop().animate({opacity: 0.5}, fz_fadeSpeed);
	var full = jQuery(tmb.fullImg);
	buttons.width(full.width()).css("top", full.offset().top + full.height() -40).css("left", full.offset().left);
	if (!isVideo) {
		full.one("mouseover", function() {
			buttons.show();
			buttons.stop().animate({top: full.offset().top + full.height()}, 200);
		});
	} else {
		buttons.show();
		buttons.stop().animate({top: full.offset().top + full.height()}, 200);
	}
}

function drawVideoPanel(tmb) {
	var ar = /.*\/([^_]+)_([^_]+)_.\.jpg$/.exec(tmb.src);
	fz_videoPanel = document.createElement("div");
	var full = jQuery(tmb.fullImg);
	jQuery(fz_videoPanel).width(full.width()).height(full.height())
		.css({top: full.offset().top, left: full.offset().left, zIndex:10000})
		.appendTo(jQuery("body"));
	fz_videoPanel.id = "stewart_swf" + ar[1] + "_divx";
	fz_videoPanel.className = "photo_gne_video_wrapper_div";
	var F = unsafeWindow.F;
	var _ge = unsafeWindow._ge;
	F.decorate(_ge('stewart_swf' + ar[1] + '_divx'), F._stewart_swf_div).stewart_go_go_go(full.width(), full.height(), {
		onsite: 'true',		flickr_noAutoPlay: 'false',		in_photo_gne: 'true',
		photo_secret: ar[2],
		photo_id: ar[1]
	});
	jQuery(fz_videoPanel).css({position:"absolute"});
}

function OEExtract(tmb, data) {
	if (fz_activeThumb != tmb) return;
	var form = data.substring(data.indexOf('<form id="album"'));
	form = form.substring(0, data.indexOf("</form>") + 7);
	var d = document.createElement("div");
	d.innerHTML = form;
	var select = jQuery(d).find("select").css("font-size", "75%").get(0);
	fz_OEOptions = new Array();
	jQuery(d).find("input").each( function() { fz_OEOptions[this.name] = this.value; });
	jQuery(fz_OESelect).html(select).show();
	jQuery(fz_OESelectButton).show().html("Add to album");
}
function OEAddToAlbum() {
	showLoader(jQuery(fz_activeThumb.fullImg));
	var select = jQuery(fz_OESelect).children().get(0);
	if (select.value != "") {
		fz_OEOptions["add_to_album"] = select.value;
		jQuery.post("http://www.onexposure.net/?photos=latest-additions&photo=" + fz_OEOptions["id"], fz_OEOptions, 
			function(data) { hideLoader(); }
		);
	}
}

function zoomMeOut(tmb) {
	fz_activeThumb = null; 
	if (fz_videoPanel != null) {
		jQuery(fz_videoPanel).hide().html("");
		fz_videoPanel.id = "";
	}
	jQuery(fz_buttonBar).hide();
	jQuery(fz_grayPanel).stop().animate({opacity: 0}, fz_fadeSpeed, null, function() { jQuery(fz_grayPanel).css("z-index", 15000).hide(); });
	var thumb = jQuery(tmb);
	if (tmb.fullImg != null) {
		var full = jQuery(tmb.fullImg);
		full.stop().animate({
			top: thumb.offset().top, left: thumb.offset().left, opacity: 0, 
			width: thumb.width(), height: thumb.height()
			}, fz_zoomSpeed, null, function () { full.hide(); jQuery(fz_buttonBar).hide(); });
	}
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
		url: 'http://userscripts.org/scripts/review/29151',
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:'',
		onload:function(result) {
			var res = result.responseText;
			var re = /@version[ ]+([0-9.]+)/gm;
			var ar = re.exec(res);			
			fz_serverVersion = ar[1] + "";
			if (fz_serverVersion > fz_localVersion && fz_serverVersion > iupd){
				fz_versionPanel = jQuery("<div />").css({backgroundColor: "#1057AE", color: "#fff", fontWeight: "bold", "padding": "5px 5px 5px 5px"}).html("A new version of FlickrZoom is available: ");
				fz_versionPanel.prependTo("body");				
				jQuery('<a href="http://userscripts.org/scripts/show/29151" target="_blank">Download</a>').css({color: "#fff"}).appendTo(fz_versionPanel);
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
	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAACURJREFUeNrEl2tsXMUVx/8z987dvbt37bV31287dkxedt7FbZPYKRFpIAaaRuUh2ggVqUKqSqn6oU8hIFLVCqlVC1IfompVUFqVEhQgJUCCIJCEpokhDyd24nfW3rUdr+31eh9379yZ6Yeso8QkhrYfGGl0nzPnN3P+c2YOUUrhsyw6AOzevXvBn5RS0HUdHo8HhBBIKUEpheM4Fud8ZTgc3ub1eldpmlaslMpkMpmeurq6t2zbPtPX1zeplAJjDEopSCk/DvDfFqUUHMdpjUQijzY0NLQ3NjYESoqLwXQdUklksjaGR0YeGxq6dFTX9WdyudxBxphz0xn4tIUQAtd1fbrOftHa2vrI2tXNXqkoLo1O4sOPhjExY8PLNNRFLCyvX+RdtbJpaywW/9I77763b2xs7DHDMMb/LwDXdQOWZb24ffud2+tqqvHeRwN45V9RZzDBx0Illh30e5RSrnawM6nl831Fm1eUhL62eQn7+oMP3P/a/teb+/v779E0bfB/AhBCUJ/P92x7+/btleVl+MMrHThweibaUBfp39VepS+usIqKfczUKZDNS7t7ODnzzw8G4qef71jyvR1N3q/uuLv5pb37/jw0NHQ3Yywz1y/9tACU0vs3bNjwzdrqKjz/xlm8eS7dvXH94s5vbLkluK4hWGsZJJzN5YPCFSU1IbO6/daq+sd33eotq6g688uXz2ej8Sls+/LW2wKBwA91XQdjDIyxKwBKqQWrEMKora390drVzTjeOYS3OpNDi+sqOlcvKg4HvLqVy7v8g3OjVnd0pvS9s/Gi/lhSSalU2GKhh7beUhwIhc++8HavtPwmVjY3P8w5X3KdC8rKyhYcfTabvX3p0qVruCtx4GTMLgoGexij3HakDYIclCI2F6QoyHSeyauM7ThCKZ7lkgb9rOT29XWT/zjUeelk11jD8qWNtWc7O+8QQvQSQj4ZgBCCRCJxT2VlBYldTqJ71E4sbghPKyWd2FRmpKHcpxFAF1JxXIlpyuEyZ+eFbTuuTkBoQ7m/yPRb8TMDkw0rGxoRDofbY7HYbxljSgeAaDR6UwApJSkuLl5h+X3ovnAZOmNJxrTZ2bRNBkam6vy6qqYUGhfKBxAYTCdD4ykr4whPngvqM7TcoqpSUhnyi8GJhM0FvJbl/zwhxE8ISesFhS+k/qDX6w1CKUynHWialiVANp/nVk3It9YlZkBKhWDQh+m0A49hEN3rKU05AgQEU4nMeE1F0NZ16szawnG46zUMw6eUKhJCXAEghCykfi6E4Nx1YegESkoAJE81og1fTucvp4SfQAqvR9eJxohOpVKCK40S6JTQUkvP5xyZTme569GJrmkUUICmaULXdXziDEgp0+l0elJKiZqwD44z7ldKuZZpTOfA/6Lg5F0hM5mp7H0V5ZF1tm27yyu8HXWVxZmM7ZoG02R0IjM5k81bDcWG6fMasPP2jK7rs4ZhXAHgnF8X5+fH/ampqZPTyZk7a8pCCPlIJJnKBYqKPLGArg8rQqZcVyRz2dQWVwEOV+5MXn6QcUki55LSkWnbM57K03Q6+4UVTSFCIZFMzhzhnGeVUlcApqamrrqBEAJK6XVu4Zzv6+6+8OOv3HUnu21lqOyljmRjIFAeVUp5lIKppHS4y3XpOhCuI3tG8tPjsyoulZBUo4F0lleUGqKpdVU14mOXkUwm32CMXbEFAO+//z76+vrQ1dWFVCoFzjkSiQSmp6cxPT2N2dnZU6dOnfpbdCSO9g2LcUuJ2jIcTy7TKFWEKKbrmmlZ3pcnk7NPOq78uWWZCU1DkcE0KoXyJMYmtuz4YpU/XGLhzNnOC1LKN+cGSOc0MBf1KKWYmJjA4OAgotEootEoxsfHMTY2ljr+7xPwmV58Z0ezN4D0gxeHxltcoUxd14xwqHiisqyku6I8OGh6mUsI2FQqFx4cGNl5z+dKG9s3Lsfps+cRjUZ/TykdFUJACPHxzWgOQtM0aJoGznnQ5/M919LScl91dTUSU0nUVYax+6EW3x8PdO76sC+6xvAFThRZ3gmqkzSRysxzUZpKpZcEDbHxkW2LrLtal6OndwBHjx59KZfLPUsp/XS7oeM4tZFI5K+tra1tSil0dXXBNE2k02mEQ6V48uE2erJrZM2HF8fXXLqcSU9n3LSHaZ7FIVa0bE2l1ra2DuGgH6fOnMOxY8det23724QQMMag6zquinB+6C3s/evr6+v3bNy4cQXnHIZhwO/3I5vN4uLFizwWi41s3bq1YfXKJrQ01SCdsS3HFZZGCUyPAV2niA7HcPidt2eHh4d/J6V8yufz2V6vFz09PUgkEtA07XoAQgiEEHBd946lS5f+qaWlpdpxHPh8Pni9XpimiVgshiNHjrwihPju+Pj4A8cbGx9uampqjkQizGea4K6L1MwMhkdGhjnnr9XU1DzX2dl5NhgM4tChQ+jv78fo6ChSqdQVm0oprFu3DrW1teCcgzH2rRUrVvxm2bJl/nw+j0AgAMYYTNNEPB7HgQMHXjh8+PCjmUxmVkqJqqoqffPmzcsppasopSEAtuu6PZzzjvLy8mwgEMDTTz8NwzDguu7HDqVEKYX169ejsrKSOI7z0w0bNvysvr4e+XweRUVF0HUdpmlicHAQ+/fv//WJEyd+Mjs7ywEwAKpQBQB5o0g+p+1CvfGhVAgBj8fz1M6dO58oKSnBxMQEgsEgCCEwDAPnzp1z9u7d+8T58+efcRxHFdq5AFQwGCSbNm2ilFKto6MDo6OjKMCoeSC08E5eC6sXBFfb1tb2/XvvvRfxeByUUti2DY/Hg+PHjyf37dv3g97e3r8X/s/MHw1jDJRSXLu85mu70FYrgM9BKFoQX0lZWZlHCAG/34+6ujpomoaDBw8O7tmzZ1dvb++LAAIAnPnG54ftm6USBYOkAKEV7gkFgIGBgQuHDx8+NjY2BtM0kcvlsH///o9effXV++Px+LsA/DfzYzKZRCKRgJQStm0vNAP0mj6uVqKUgqZp2LRpU1V5efnjkUhkdVdX1/Gurq5fTUxMXAZgFRoTAPmCC64rmqZdXcI3yDXnjOvzBKuurgJN09DW1gbTNME5J6dPn1aTk5PkmqmaAyCFDsS8kdzI6LXXq8eLBTMjSikYY6rgU1UQzPwOSeEbmedj3OR5wfSbfNbp+X8GAM5cs7fcZGetAAAAAElFTkSuQmCC";
}

function getEmbeddedLoaderIcon() {
	return "data:image/gif;base64,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";
}

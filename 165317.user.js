// ==UserScript==
// @name        LovePlanet Photo Searcher
// @namespace   svdsearcher
// @include     http://loveplanet.ru/*
// @include     http://love.dewochki.net/*
// @include     http://beboo.ru/*
// @include     http://lesbi.posad.org/*
// @version     1.7.3
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

if (window.top != window.self) return;		//don't run on frames or iframes
if(!$) {
    if (!unsafeWindow && !unsafeWindow.jQuery) {
        this.$ = this.jQuery = unsafeWindow.jQuery.noConflict(true);		//Init jQuery safe
    } else if (!jQuery) {
        this.$ = this.jQuery = jQuery.noConflict(true);		//Init jQuery safe
    } else {
        return;
    }
}
if(unsafeWindow) unsafeWindow.jq191 = $;

var background = $('<div style="display:none; background: #666666; opacity: 0.4; z-index:9000; position:fixed; width:100%; height:100%; left:0; top:0;"></div>');
var dialog = $('<div id="svd_dialogform" style="display:none; border-radius:4px; background:#EEEEEE; border:1px solid #DDDDDD; z-index:9999; position:fixed; width:80%; height:90%; left:10%; top:5%;">'
	+ '  <div style="padding:1px 2px; margin:0 0 5px; background: #F6A828; border: 1px solid #E78F08; border-radius: 4px; height:19px;">'
	+ '    <div class="svd_statistics" style="border:0 none; margin:0; display:inline-block; color:yellow; font-size:15px; font-weight:600; font-family:arial;"></div>'
	+ '    <span title="Close" class="svd_close" style="border-radius: 6px; background-color: blue; float:right; color:red; font-size:15px; font-weight:900; font-family:arial; width:18px; height:18px; line-height:18px; vertical-align:middle; text-align:center; cursor:pointer;">X</span>'
	+ '    <div style="float:right; border:0 none; margin:0 10px 0 0; padding:3px 0 1px; display:inline-block; color:yellow; font-size:12px; font-weight:600; font-family:arial; font-style: italic;">'
	+ '      <span title="Choose the depth of search" style="text-decoration:underline;">Search:</span>'
	+ '      <span title="Quick search for slow internet (skips photos and albums sometimes)" class="svd_searchdepth" style="background:#E78F08; border:1px solid transparent; border-radius:6px; padding:1px 3px; cursor:pointer">Quick</span>'
	+ '      <span title="Normal search (rarely skips photos and albums)" class="svd_searchdepth" style="background:#E78F08; border:1px solid transparent; border-radius:6px; padding:1px 3px; cursor:pointer">Normal</span>'
	+ '      <span title="In-depth search for fast internet (hardly ever skips photos and albums)" class="svd_searchdepth" style="background:#E78F08; border:1px solid transparent; border-radius:6px; padding:1px 3px; cursor:pointer">In-depth</span>'
	+ '    </div>'
	+ '  </div>'
	+ '  <div class="svd_preview" style="width:100%; height:200px; overflow:auto; margin:0; padding:0;"></div>'
	+ '  <div class="svd_huge" style="text-align:center; margin:10px 0; padding:0; overflow:auto;">'
	+ '    <img class="svd_photo" src style="text-align: center; border: 1px solid; margin: 0;" />'
	+ '    <div class="svd_caption" style="display: none; margin: 0.5em 1em 1em 1em; text-align: center;"></div>'
	+ '  </div>'
	+ '</div>');

$("body").append(dialog);
$("body").append(background);

var startdepth = GM_getValue("searchdepth", "Normal");
dialog.find(".svd_searchdepth").each(function() {
	if ($(this).text() == startdepth)
		$(this).addClass('svd_selected').css('border-color', 'blue');
});

dialog.find(".svd_close").bind('click', function() {
	dialog.stop();
	dialog.hide();
	background.hide();
});
dialog.find(".svd_searchdepth").bind('click', function() {
	dialog.find(".svd_searchdepth").removeClass('svd_selected').css('border-color', 'transparent');
	$(this).addClass('svd_selected').css('border-color', 'blue');
	GM_setValue("searchdepth", $(this).text());
	dialog.research();
});

$(document).bind("DOMNodeInserted", function(e) {
	var t = $(e.target);
	if(t.is("div.biglist,div.gallery_list,div#likes_cont,div.gmap_userinfo")) {
		setTimeout(function() {
			t.find("img").each(function(x) { wrapPhoto($(this)); });
		}, 100);
	} else if (t.is("div") && t.find("div.gmap_userinfo").length > 0) {
		setTimeout(function() {
			t.find("a").each(function(x) { wrapPhoto($(this)); });
		}, 200);
	}
});
$("div#albumcmmajax,div#journalajax,div#topajax,div#inner").bind("DOMNodeInserted", function(e) {
	var t = $(e.target);
	if(t.is("table,div.bigphoto,div.borderbox2,div.top_list")) {
		setTimeout(function() {
			t.find("img").each(function(x) { wrapPhoto($(this)); });
		}, 100);
	}
});
$("div#searchajax,div#map_canvas").bind("DOMSubtreeModified", function(e) {
	var t = $(e.target);
	if(t.is("div#searchajax,div.gm-style-iw")) {
		setTimeout(function() {
			t.find("img").each(function(x) { wrapPhoto($(this)); });
		}, 100);
	}
});
$(window).on('resize', function(e) {
	dialog.find(".svd_huge").css('height', (dialog.height() - 250) + 'px');
});

var testurl = RegExp("^(https?://)?([0-9.a-z]+)/[0-9a-z]+/foto/[0-9a-z]+/[0-9a-z]+/[0-9a-z]+/(a[0-9]+/)?(t|c[0-9]+|m|s|b)_img[0-9]+.jpg.*$", "i");
var testcssurl = RegExp('^url\\("?((https?://)?([0-9.a-z]+)/[0-9a-z]+/foto/[0-9a-z]+/[0-9a-z]+/[0-9a-z]+/(a[0-9]+/)?(t|c[0-9]+|m|s|b)_img[0-9]+.jpg.*"?)\\)$', "i");

$("img").each(function(x) { wrapPhoto($(this)); });

// Functions
function showDialog(path) {
	dialog.stop = null;
	dialog.research = null;
	
	var albomsDepth, photosDepth;
	var depth = dialog.find(".svd_searchdepth.svd_selected").text();
	if(depth == 'In-depth') {
		albomsDepth = 10;
		photosDepth = 160;
	} else if (depth == 'Quick') {
		albomsDepth = 3;
		photosDepth = 20;
	} else {
		albomsDepth = 6;
		photosDepth = 60;
	}

	dialog.find(".svd_preview").html('<table><tbody class="svd_previewlines"></tbody></table>');
	dialog.find(".svd_statistics").html("");
	dialog.find(".svd_huge").css('height', (dialog.height() - 250) + 'px');

	background.show();
	dialog.show();
	
	var s = new Searcher(path, albomsDepth, photosDepth);
	s.onAlbomScanningFinished = updateStatistics;
	s.onScanningFinished = completed;
	s.onNewAlbom = addAlbom;
	s.onPhotoFound = addPhoto;
	s.scan();
	updateStatistics(s);
	
	dialog.stop = function() { s.stop(); };
	dialog.research = function() { s.stop(); showDialog(path); };
}
function wrapPhoto(t) {
	if (t.parents('.svd_photowrapper, #svd_dialogform').length != 0) return;
	var url;
	var r;
	if (t.is('a')) {
		var val = t.css('background-image');
		if (val) {
			r = testcssurl.exec(val);
			if (r) url = r[1];
			else return;
		} else return;
	} else if (t.is('img')) {
		url = t.attr('src');
		r = testurl.exec(url);
	} else return;
	
	if (r) {
		var link = $('<span style="cursor:pointer; left:5px; top:5px; border:0 none; padding:0; margin:0; color:green; width:10px; height:10px; line-height:10px; font-size:10px; font-weight: 900; font-family:arial; vertical-align:middle; text-align:center; background:red; opacity:0.8; display:block; position:absolute; box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 1px rgba(0, 0, 0, 0.8);" title="See all photos...">i</span>');
		link.bind('click', function(e) {
			e.preventDefault();
			showDialog(url);
			return false;
		});

		t.wrap('<div class="svd_photowrapper" style="display:block; position:relative; padding:0; border:0 none;"></div>');
		var parent = t.parent();
		parent.css('margin', t.css('margin') || '0');
		t.css('margin', '0');
		parent.append(link);
		function center() {
			var dx = parent.width() - t.outerWidth();
			var dy = parent.height() - t.outerHeight();
			if (dx >= 0) dx = dx - (dx % 2);
			else dx = 0;
			if (dy >= 0) dy = dy - (dy % 2);
			else dy = 0;
			var align = parent.css('text-align');
			if (align == 'right') {
				link.css('left', (dx + 5) + 'px');
			} else if (align == 'center') {
				link.css('left', (dx / 2 + 5) + 'px');
			} else {
				link.css('left', '5px');
			}
			link.css('top', (dy / 2 + 5) + 'px');
			t.css('position', 'relative');
			t.css('top', (dy / 2) + 'px');
		}
		if (t.is('img')) t.bind('load', function() { center();});
		center();
	}
}
function addAlbom(scanner, albom) {
	var cont = $("#svd_dialogform .svd_previewlines");
	var row = $('<tr><td><table><tbody><tr class="svd_previewline_' + albom.albomindex + '"></tr></tbody></table></td></tr>');
	cont.append(row);
}
function addPhoto(scanner, albom) {
	var pindex = albom.currentPhoto;
	var cont = $("#svd_dialogform .svd_previewline_" + albom.albomindex);
	var td = $("<td></td>");
	var img = $("<img/>");
	img.bind('click', function() {
		setPhoto(albom.getHugePhoto(pindex));
	});
	img.attr('src', albom.getSmallPhoto(pindex));
	td.append(img);
	cont.append(td);
}
function updateStatistics(scanner) {
	$("#svd_dialogform .svd_statistics").html("Searching...");
}
function completed(scanner) {
	$("#svd_dialogform .svd_statistics").html("Search completed: " + scanner.succeded + " alboms have found.");
}
function setPhoto(link) {
	$("#svd_dialogform .svd_photo").attr('src', link);
	$("#svd_dialogform .svd_caption").html(link);
}

//------------------------------------------------------------------------------
//                           class AlbomScanner
//------------------------------------------------------------------------------
function closePath(path) {
	if (path.charAt(path.length - 1) == '/') return path;
	else return path + "/";
}

var AlbomScanner = function (rootpath, albomindex, maxphotos) {
	this.onPhotoFound = function (sender) { };
	this.onScanningFinished = function (sender) { };
	this.albomindex = albomindex;
	if (this.albomindex > 0) this.rootpath = closePath(rootpath + "a" + this.albomindex);
	else this.rootpath = closePath(rootpath);
	this.image = new Image();
	this.currentPhoto = 0;
	this.lastSucceded = 0;
	this.succeded = 0;
	this.maxphotos = maxphotos;
	this.stopped = false;
	
	var self = this;
	this.image.onload = function () {
		self.lastSucceded = self.currentPhoto;
		self.succeded = self.succeded + 1;
		self.onPhotoFound(self);
		self.currentPhoto = self.currentPhoto + 1;
		self.scan();
	};
	this.image.onerror = function () {
		self.currentPhoto = self.currentPhoto + 1;
		self.scan();
	};
	this.finished = true;
}
AlbomScanner.prototype.getSmallPhoto = function (index) {
	return this.rootpath + "c100_img" + index + ".jpg";
}
AlbomScanner.prototype.getHugePhoto = function (index) {
	return this.rootpath + "b_img" + index + ".jpg";
}
AlbomScanner.prototype.scan = function () {
	this.finished = false;
	if (!this.stopped && (this.currentPhoto - this.lastSucceded <= this.maxphotos)) {
		this.image.src = this.getSmallPhoto(this.currentPhoto);
	} else {
		this.finished = true;
		this.onScanningFinished(this);
	}
}
AlbomScanner.prototype.stop = function () {
	this.stopped = true;
}

//------------------------------------------------------------------------------
//                             class Searcher
//------------------------------------------------------------------------------

var Searcher = function (samplelink, maxalboms, maxphotos) {
	this.onPhotoFound = function (sender, albom) { };
	this.onNewAlbom = function (sender, albom) { };
	this.onAlbomScanningFinished = function (sender, albom) { };
	this.onScanningFinished = function (sender) { };

	var endpath = samplelink.lastIndexOf("/");
	var endpathp = samplelink.lastIndexOf("/", endpath - 1);
	var folder = samplelink.substr(endpathp + 1, endpath - endpathp - 1);
	var regex = /^a[0-9]{1,3}$/;
	if (folder.match(regex) != null) {
		this.rootpath = samplelink.substr(0, endpathp + 1);
	} else {
		this.rootpath = samplelink.substr(0, endpath + 1);
	}
	this.maxalboms = maxalboms;
	this.succeded = 0;
	this.scanners = new Array();
	this.maxphotos = maxphotos;
	this.stopped = false;
}
Searcher.prototype.scan = function () {
	if(!this.stopped) {
	var lastc = this.scanners.length;
	var lastn = this.maxalboms + this.getLastSucceded() + 1;
	if (lastc < lastn) {
		for (var i = lastc; i < lastn; i++) {
			this.initscanner(i).scan();
		}
	}
}
}
Searcher.prototype.initscanner = function (index) {
	if (this.scanners[index] != null) return this.scanners[index];

	var self = this;
	this.scanners[index] = new AlbomScanner(this.rootpath, index, this.maxphotos);

	this.scanners[index].onPhotoFound = function (sender) {
		if (sender.succeded == 1) {
			self.onNewAlbom(self, sender);
			self.succeded = self.succeded + 1;
			self.scan();
		}
		self.onPhotoFound(self, sender);
	};
	this.scanners[index].onScanningFinished = function (sender) {
		self.onAlbomScanningFinished(self, sender);
		self.scan();
		if (!self.hasActiveScanner()) self.onScanningFinished(self);
	};
	return this.scanners[index];
}
Searcher.prototype.hasActiveScanner = function () {
	if (this.scanners.length > 0) {
		for (var i = 0; i < this.scanners.length; i++) {
			if (this.scanners[i].finished == false) return true;
		}
	}
	return false;
}
Searcher.prototype.getLastSucceded = function () {
	if (this.scanners.length > 0) {
		for (var i = this.scanners.length - 1; i >= 0; i--) {
			if (this.scanners[i].succeded > 0) return i;
		}
	}
	return -1;
}
Searcher.prototype.stop = function () {
	this.stopped = true;
	if (this.scanners.length > 0) {
		for (var i = 0; i < this.scanners.length; i++) {
			if (this.scanners[i].finished == false) this.scanners[i].stop();
		}
	}
}

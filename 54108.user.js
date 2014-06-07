// ==UserScript==
// @name           Show Just Image
// @description    Removes garbage from some image hosting sites and displays the image only.
// @version        1.0.0
// @license        GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://4769.com/viewer.php?id=*
// @include        http://*.4769.com/viewer.php?id=*
// @include        http://99phost.com/browse.php?*
// @include        http://*.99phost.com/browse.php?*
// @include        http://abload.de/image.php?*
// @include        http://*.abload.de/image.php?*
// @include        http://www.adult-images.net/show.php/*.html
// @include        http://allkarupsha.com/*/*/*/*.html
// @include        http://*.allkarupsha.com/*/*/*/*.html
// @include        http://ambrybox.com/gallery/*.html
// @include        http://*.ambrybox.com/gallery/*.html
// @include        http://galleries.badgirlsblog.com/albums/*/*/*.html
// @include        http://*.galleries.badgirlsblog.com/albums/*/*/*.html
// @include        http://bayimg.com/*
// @include        http://bigpichost.com/viewer-*.html
// @include        http://*.bigpichost.com/viewer-*.html
// @include        http://bildr.no/view/*
// @include        http://*.bildr.no/view/*
// @include        http://*.blogimagehost.com/view/*/*.html
// @include        http://*.blogimagehost.com/view.php/*.html
// @include        http://*.bp.blogspot.com/*/*/*/*/*-h/*
// @include        http://celebz.to/*/*
// @include        http://chickupload.com/showpicture/*/*/*
// @include        http://*.chickupload.com/showpicture/*/*/*
// @include        http://cocoimage.com/img.php?*
// @include        http://*.cocoimage.com/img.php?*
// @include        http://download.su/photo/*
// @include        http://*.download.su/photo/*
// @include        http://downlr.com/view/*
// @include        http://downlr.com/public/view/*
// @include        http://dump.com/*/*/*/*/
// @include        http://*.dump.com/*/*/*/*/
// @include        http://dumppix.com/viewer.php?*
// @include        http://*.dumppix.com/viewer.php?*
// @include        http://g.e-hentai.org/s/*
// @include        http://fapomatic.com/show.php?*
// @include        http://www.flickr.com/photos/*/*/
// @include        http://www.flickr.com/photos/*/*/sizes/*/
// @include        http://fotosik.pl/pokaz_obrazek/*
// @include        http://*.fotosik.pl/pokaz_obrazek/*
// @include        http://fotosik.pl/showFullSize.php?*
// @include        http://*.fotosik.pl/showFullSize.php?*
// @include        http://1.fotoupload.ru/viewer.php?file=*
// @include        http://*.freebunker.com/file/*/*
// @include        http://*.freebunker.com/img/*/*
// @include        http://freepicload.com/view.php?*
// @include        http://*.freepicload.com/view.php?*
// @include        http://freepicninja.com/view.php?*
// @include        http://*.freepicninja.com/view.php?*
// @include        http://freepicninja.com/ads-cookie.php?redirected=1&return=*
// @include        http://*.freepicninja.com/ads-cookie.php?redirected=1&return=*
// @include        http://freeporndumpster.com/show.php?*
// @include        http://*.freeporndumpster.com/show.php?*
// @include        http://freeuploadimages.org/viewer.php?file=*
// @include        http://*.freeuploadimages.org/viewer.php?file=*
// @include        http://picshare.geenza.com/*
// @include        http://*.glowfoto.com/viewimage.php?*
// @include        http://picasaweb.google.com/lh/photo/*
// @include        http://picasaweb.google.com/*/*#*
// @include        http://hdimage.org/viewer.php?*
// @include        http://*.hdimage.org/viewer.php?*
// @include        http://honeyindex.com/*/*/*.php
// @include        http://*.honeyindex.com/*/*/*.php
// @include        http://hostapic.us/show.php/*.html
// @include        http://*.hostapic.us/show.php/*.html
// @include        http://hostingfailov.com/photo/*
// @include        http://*.hostingfailov.com/photo/*
// @include        http://*.hotlinkimage.com/img.php?*
// @include        http://iconaccess.com/celebphotos/show.php?*
// @include        http://*.iconaccess.com/celebphotos/show.php?*
// @include        http://img-vidiklub.com/viewer.php?*
// @include        http://*.img-vidiklub.com/viewer.php?*
// @include        http://*.imagebam.com/image/*
// @include        http://*.imagebone.net/viewer.php?file=*
// @include        http://imagearn.com/image.php?id=*
// @include        http://*.imagearn.com/image.php?id=*
// @include        http://imageboss.net/view/*
// @include        http://*.imageboss.net/view/*
// @include        http://imagefap.com/image.php?*
// @include        http://*.imagefap.com/image.php?*
// @include        http://*.imagehaven.net/img.php?*
// @include        http://*.imagehost.org/view/*
// @include        http://imagehost.ro/viewer.php?*
// @include        http://*.imagehost.ro/viewer.php?*
// @include        http://imageload.net/view/*/
// @include        http://*.imageload.net/view/*/
// @include        http://imagehosting.gr/show.php/*
// @include        http://*.imagehosting.gr/show.php/*
// @include        http://imagepix.org/image/*
// @include        http://*.imagepix.org/image/*
// @include        http://imageporter.com/*/*
// @include        http://*.imageporter.com/*/*
// @include        http://*.imagerise.com/show.php/*
// @include        http://*.imagerise.com/view.php/*
// @include        http://*.imagesforme.com/show.php/*
// @include        http://*.imageshack.us/i/*
// @include        http://*.imageshack.us/my.php?*
// @include        http://imageshost.ru/links/*
// @include        http://*.imageshost.ru/links/*
// @include        http://imagesocket.com/view/*
// @include        http://*.imagesocket.com/view/*
// @include        http://imagetwist.com/*/*.html
// @include        http://*.imagetwist.com/*/*.html
// @include        http://imageup.ru/*
// @include        http://*.imageup.ru/*
// @include        http://imageupper.com/gi/*
// @include        http://*.imageupper.com/gi/*
// @include        http://imageupper.com/i/*
// @include        http://*.imageupper.com/i/*
// @include        http://imagevader.com/show.php?*
// @include        http://*.imagevader.com/show.php?*
// @include        http://*.imagevenue.com/img.php?*
// @include        http://*.imagewaste.com/pictures/*/*
// @include        http://imaxenes.com/imagen/*
// @include        http://*.imaxenes.com/imagen/*
// @include        http://immage.de/image-*.html
// @include        http://imgur.com/*
// @include        http://ipicture.ru/Gallery/Viewfull/*
// @include        http://*.ipicture.ru/Gallery/Viewfull/*
// @include        http://jpghosting.com/showpic.php?*
// @include        http://*.jpghosting.com/showpic.php?*
// @include        http://kemipic.com/share-*.html
// @include        http://*.kemipic.com/share-*.html
// @include        http://lastnightsparty.com/*/slides/*.html
// @include        http://*.lastnightsparty.com/*/slides/*.html
// @include        http://my-image-host.com/show.php/*.html
// @include        http://*.my-image-host.com/show.php/*.html
// @include        http://my-image-host.com/viewer.php?*
// @include        http://*.my-image-host.com/viewer.php?*
// @include        http://mrjh.org/gallery.php?entry=images/*
// @include        http://*.mrjh.org/gallery.php?entry=images/*
// @include        http://nudiehost.com/content.php?*
// @include        http://omget.com/view/*
// @include        http://*.omget.com/view/*
// @include        http://*.photobucket.com/image/*
// @include        http://*.photobucket.com/albumview/albums/*/*
// @include        http://img.phyrefile.com/*
// @include        http://*.pic-upload.de/view-*/*
// @include        http://*.picfoco.com/img.php?*
// @include        http://pics-hosting.com/viewer.php?file=*
// @include        http://*.pics-hosting.com/viewer.php?file=*
// @include        http://*.picscrazy.com/view/*
// @include        http://*.pict.com/view/*
// @include        http://picturedumper.com/picture/*/*/*
// @include        http://*.picturedumper.com/picture/*/*/*
// @include        http://pimpandhost.com/*
// @include        http://*.pimpandhost.com/*
// @include        http://pixelup.net/image.html?*
// @include        http://*.pixelup.net/image.html?*
// @include        http://*.pixhost.org/show/*
// @include        http://pixxtra.com/image/*
// @include        http://pohrani.com/?*/*/*/*.*
// @include        http://*.pohrani.com/?*/*/*/*.*
// @include        http://pornimghost.com/viewer.php?*
// @include        http://*.pornimghost.com/viewer.php?*
// @include        http://pornpicuploader.com/viewer.php?*
// @include        http://*.pornpicuploader.com/viewer.php?*
// @include        http://postimage.org/image.php?*
// @include        http://*.postimage.org/image.php?*
// @include        http://postimg.com/image/*
// @include        http://*.postimg.com/image/*
// @include        http://radikal.ru/F/*
// @include        http://*.radikal.ru/F/*
// @include        http://screenlist.ru/details.php?image_id=*
// @include        http://shareaimage.com/imagehost/?v=*
// @include        http://*.shareaimage.com/imagehost/?v=*
// @include        http://shareimage.ro/viewer.php?*
// @include        http://*.shareimage.ro/viewer.php?*
// @include        http://sharenxs.com/view/?id=*
// @include        http://*.sharenxs.com/view/?id=*
// @include        http://*.skins.be/*
// @include        http://*.stooorage.com/show/*
// @include        http://subirimagenes.com/*.html
// @include        http://*.subirimagenes.com/*.html
// @include        http://tinypic.com/view.php?*
// @include        http://*.tinypic.com/view.php?*
// @include        http://pix.toile-libre.org/?img=*
// @include        http://*.turboimagehost.com/p/*/*
// @include        http://uploadimage.ro/show.php/*.html
// @include        http://*.uploadimage.ro/show.php/*.html
// @include        http://uploadhouse.com/viewfile.php?*
// @include        http://*.uploadhouse.com/viewfile.php?*
// @include        http://xup.in/dl,*/*
// @include        http://*.xup.in/dl,*/*
// @include        http://yfrog.com/*
// @include        http://*.yfrog.com/*
// @include        http://yourimage.name/*/
// @include        http://*.yourimage.name/*/
// ==/UserScript==

var needImgTag = false;
var img, imgURL;
var ibv;

var domain = location.hostname.match('[^\.]+\.(be|com|de|gr|in|name|net|no|org|pl|ro|ru|su|to|us)$');
if (domain) {
	switch (domain[0]) {
		case '4769.com':
			img = document.evaluate('//body/center/table/tbody/tr/td/center/a', document, null, 9, null).singleNodeValue;
			break;
		case '99phost.com':
			img = document.evaluate('//div[@class="theimage"]/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'abload.de':
			img = document.getElementById('image');
			break;
		case 'adult-images.net':
			img = document.getElementById('img_obj');
			break;
		case 'allkarupsha.com':
			img = document.evaluate('//body/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'ambrybox.com':
			img = document.evaluate('//div[@id="main"]/div/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'badgirlsblog.com':
			img = document.evaluate('//body/center/table/tbody/tr/td/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'blogimagehost.com':
			img = document.getElementById('img_obj');
			break;
		case 'bayimg.com':
			img = document.getElementById('mainImage');
			break;
		case 'bigpichost.com':
			img = document.evaluate('//div[@class="viewer_image"]/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'bildr.no':
			img = document.evaluate('//div[@id="view"]/img[@class="bilde"]', document, null, 9, null).singleNodeValue;
			break;
		case 'blogspot.com':
			img = document.evaluate('//body/img', document, null, 9, null).singleNodeValue;
			break;
		case 'celebz.to':
			img = document.evaluate('//div[@id="main"]/div[contains(@id, "post-")]/div/img', document, null, 9, null).singleNodeValue;
			break;
		case 'chickupload.com':
			img = document.getElementById('full');
			break;
		case 'cocoimage.com':
			img = document.getElementById('img');
			if (!img) {
				var script = document.evaluate('//head/script', document, null, 9, null).singleNodeValue;
				if (script) {
					var matches = script.innerHTML.match(/window\.location="(.+)";/);
					if (matches && matches.length == 2) {
						location.href = matches[1];
					}
				}
			}
			break;
		case 'download.su':
			img = document.getElementById('thepic');
			break;
		case 'downlr.com':
			if (location.href.match(/\/view\/full\//)) {
				img = document.getElementById('thepic');
				if (!img) img = document.evaluate('//p[@id="image_container"]/img', document, null, 9, null).singleNodeValue;
			}
			else if (location.href.match(/\/view\//)) {
				location.href = location.href.replace(/\/view\//, '/view/full/');
			}
			break;
		case 'dump.com':
			img = document.evaluate('//a[@class="zoom"]/img', document, null, 9, null).singleNodeValue;
			if (!img) img = document.evaluate('//img[contains(@class, "size-full")]', document, null, 9, null).singleNodeValue;
			break;
		case 'dumppix.com':
			img = document.getElementById('dispImg');
			break;
		case 'e-hentai.org':
			img = document.evaluate('//div[contains(@class, "ssb")]/a/img', document, null, 9, null).singleNodeValue;
			if (img) {
				imgURL = img.src.replace('amp;', '');
			}
			break;
		case 'fapomatic.com':
			img = document.getElementById('subject');
			break;
		case 'flickr.com':
			if (location.href.match(/\/sizes\//)) {
				var original = document.evaluate('//a[contains(@href, "/sizes/o/")]', document, null, 9, null).singleNodeValue;
				if (original) {
					location.href = original.href;
				}
				else {
					img = document.evaluate('//div[@class="DownloadThis"]/p/img', document, null, 9, null).singleNodeValue;
				}
			}
			else {
				var zoom = document.getElementById('photo_gne_button_zoom');
				if (zoom && zoom.href.match(/\/sizes\//)) {
					location.href = zoom.href;
				}
				else {
					img = document.evaluate('//div[contains(@id, "photoImgDiv")]/img[@class="reflect"]', document, null, 9, null).singleNodeValue;
				}
			}
			break;
		case 'fotosik.pl':
			if (location.href.match(/\/showFullSize\.php\?|\/pelny\//)) {
				img = document.evaluate('//div[@id="contentfullphoto"]/a/img', document, null, 9, null).singleNodeValue;
			}
			else if (location.href.match(/\/pokaz_obrazek\//)) {
				location.href = location.href.replace(/\/pokaz_obrazek\//, '/pokaz_obrazek/pelny/');
			}
			break;
		case 'fotoupload.ru':
			img = document.evaluate('//div[@id="page_body"]/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'freebunker.com':
			img = document.evaluate('//span[@class="link"]/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'freepicload.com':
			img = document.evaluate('//body/table/tbody/tr/th/img', document, null, 9, null).singleNodeValue;
			break;
		case 'freepicninja.com':
			if (location.href.match(/\/view\.php\?/)) {
				img = document.getElementById('imgdisp');
			}
			else if (location.href.match(/\/ads-cookie\.php\?redirected=1&return=/)) {
				location.href = location.href.replace(/\/ads-cookie\.php\?redirected=1&return=/, '/view.php?picture=');
			}
			break;
		case 'freeporndumpster.com':
			img = document.getElementById('thepic');
			break;
		case 'freeuploadimages.org':
			img = document.evaluate('//div[@id="page_body"]/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'geenza.com':
			img = document.getElementById('the_image');
			if (!img) {
				var adlt_frm = document.getElementById('adlt_frm');
				if (adlt_frm) {
					adlt_frm.submit();
				}
			}
			break;
		case 'glowfoto.com':
			img = document.evaluate('//div[contains(@id, "round_titled_cell")]/center/table/tbody/tr/td/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'google.com':
			img = document.evaluate('//head/link[@rel="image_src"]', document, null, 9, null).singleNodeValue;
			if (img) {
				imgURL = img.href.replace(/\/s.+\//, '/');
			}
			break;
		case 'hdimage.org':
			img = document.evaluate('//div[@id="page_body"]/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'honeyindex.com':
			img = document.evaluate('//div[@id="full-pic"]/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'hostapic.us':
			img = document.getElementById('img_obj');
			break;
		case 'hostingfailov.com':
			img = document.getElementById('thepic');
			break;
		case 'hotlinkimage.com':
			img = document.getElementById('img');
			if (!img) {
				var script = document.evaluate('//body/script', document, null, 9, null).singleNodeValue;
				if (script) {
					var matches = script.innerHTML.match(/window\.location="(.+)";/);
					if (matches && matches.length == 2) {
						location.href = matches[1];
					}
				}
			}
			break;
		case 'iconaccess.com':
			img = document.getElementById('thepic');
			break;
		case 'img-vidiklub.com':
			img = img = document.evaluate('//div[@class="text_align_center"]/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'imagebam.com':
			needImgTag = true;
			img = document.getElementById('the_image');
			break;
		case 'imagebone.net':
			img = document.evaluate('//div[@id="page_body"]/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'imagearn.com':
			img = document.getElementById('img');
			break;
		case 'imageboss.net':
			img = document.getElementById('thepic');
			break;
		case 'imagefap.com':
			img = document.getElementById('mainPhoto');
			break;
		case 'imagehaven.net':
			img = document.getElementById('image');
			break;
		case 'imagehost.org':
			img = document.getElementById('image');
			break;
		case 'imagehost.ro':
			img = document.evaluate('//div[@class="picture"]/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'imagehosting.gr':
			img = document.getElementById('img_obj');
			break;
		case 'imageload.net':
			img = document.getElementById('zoom_top');
			break;
		case 'imagepix.org':
			img = document.evaluate('//div[@class="panel"]/img', document, null, 9, null).singleNodeValue;
			break;
		case 'imageporter.com':
			img = document.evaluate('//img[@class="pic"]', document, null, 9, null).singleNodeValue;
			break;
		case 'imagerise.com':
			img = document.getElementById('img_obj');
			break;
		case 'imagesforme.com':
			img = document.getElementById('img_obj');
			break;
		case 'imageshack.us':
			img = document.getElementById('main_image');
			break;
		case 'imageshost.ru':
			img = document.getElementById('image');
			break;
		case 'imagesocket.com':
			img = document.getElementById('thumb');
			break;
		case 'imagetwist.com':
			img = document.evaluate('//div[@id="left"]/p/img[@class="pic"]', document, null, 9, null).singleNodeValue;
			break;
		case 'imageup.ru':
			needImgTag = true;
			img = document.getElementById('image');
			break;
		case 'imageupper.com':
			img = document.getElementById('img');
			break;
		case 'imagevader.com':
			img = document.getElementById('img_obj');
			break;
		case 'imagevenue.com':
			img = document.getElementById('thepic');
			break;
		case 'imagewaste.com':
			img = document.evaluate('//div[@class="imagebox"]/table/tbody/tr/td/img', document, null, 9, null).singleNodeValue;
			break;
		case 'imaxenes.com':
			needImgTag = true;
			img = document.getElementById('laimagen');
			break;
		case 'immage.de':
			img = document.evaluate('//td[@id="img_cont"]/table/tbody/tr/td/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'imgur.com':
			img = document.getElementById('large-image');
			break;
		case 'ipicture.ru':
			img = document.getElementById('newImg');
			break;
		case 'jpghosting.com':
			img = document.evaluate('//td[@class="table_decoration"]/center/center/table/tbody/tr/td/center/img', document, null, 9, null).singleNodeValue;
			break;
		case 'kemipic.com':
			img = document.getElementById('iimg');
			if (!img) {
				var script = document.evaluate('//table[@class="table_main"]/tbody/tr/td/script', document, null, 9, null).singleNodeValue;
				if (script) {
					var matches = script.innerHTML.match(/img src='(.+)' id='iimg'/);
					if (matches && matches.length == 2) {
						imgURL = matches[1];
					}
				}
			}
			break;
		case 'lastnightsparty.com':
			img = document.evaluate('//div[@id="frame"]/img[@usemap="#ee_multiarea"]', document, null, 9, null).singleNodeValue;
			break;
		case 'my-image-host.com':
			img = document.getElementById('img_obj');
			if (!img) img = document.evaluate('//div[@class="imgs"]/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'mrjh.org':
			img = document.evaluate('//table[@bordercolor="#999999"]/tbody/tr/td/img', document, null, 9, null).singleNodeValue;
			break;
		case 'nudiehost.com':
			needImgTag = true;
			img = document.getElementById('thepic');
			break;
		case 'omget.com':
			img = document.evaluate('//center/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'photobucket.com':
			img = document.getElementById('fullImage');
			if (!img) img = document.getElementById('fullSizedImage');
			if (!img) {
				img = document.evaluate('//div[@id="searchDetail"]/div/img', document, null, 9, null).singleNodeValue;
				if (!img) img = document.evaluate('//div[@id="fullViewContainer"]/div/img', document, null, 9, null).singleNodeValue;
				if (img.src.match(/http:\/\/mob(\d+)\./)) {
					img.src = img.src.replace(/http:\/\/mob(\d+)\./, 'http://i$1.');
				}
			}
			break;
		case 'phyrefile.com':
			img = document.evaluate('//div[@id="preamble"]/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'pic-upload.de':
			img = document.getElementById('thepic');
			break;
		case 'picfoco.com':
			img = document.getElementById('img');
			if (!img) {
				var script = document.evaluate('//body/script', document, null, 9, null).singleNodeValue;
				if (script) {
					var matches = script.innerHTML.match(/window\.location="(.+)";/);
					if (matches && matches.length == 2) {
						location.href = matches[1];
					}
				}
			}
			break;
		case 'pics-hosting.com':
			img = document.evaluate('//div[@id="page_body"]/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'picscrazy.com':
			img = document.evaluate('//td[@align="center"]/img', document, null, 9, null).singleNodeValue;
			break;
		case 'pict.com':
			img = document.getElementById('original-link');
			break;
		case 'picturedumper.com':
			img = document.getElementById('image');
			break;
		case 'pimpandhost.com':
			if (location.href.match(/-original\.html$/)) {
				img = document.getElementById('image');
			}
			else if (location.href.match(/-.(\.html)$|(\.html)$/)) {
				location.href = location.href.replace(/-.(\.html)$|(\.html)$/, '-original$1$2');
			}
			else if (location.href.match(/\/show\/id(\/\d+)$/)) {
				location.href = location.href.replace(/\/show\/id(\/\d+)$/, '$1-original.html');
			}
			break;
		case 'pixelup.net':
			img = document.evaluate('//td[@id="center"]/div/center/img', document, null, 9, null).singleNodeValue;
			break;
		case 'pixhost.org':
			img = document.getElementById('show_image');
			if (!img) img = document.evaluate('//div[@id="text"]/div/table/tbody/tr/td/img', document, null, 9, null).singleNodeValue;
			break;
		case 'pixxtra.com':
			img = document.evaluate('//div/div/img', document, null, 9, null).singleNodeValue;
			if (!img) {
				img = document.evaluate('//div/h2/a', document, null, 9, null).singleNodeValue;
				if (img && img.href.match(/^http:\/\/pixxtra\.com\/image\/.+$/)) location.href = img.href;
			}
			break;
		case 'pohrani.com':
			img = document.evaluate('//body/div/img[@onload="resize(this,false);"]', document, null, 9, null).singleNodeValue;
			break;
		case 'pornimghost.com':
			img = document.evaluate('//div[@class="ad-image"]/a/img', document, null, 9, null).singleNodeValue;
			if (!img) img = document.evaluate('//ul[@class="ad-thumb-list"]/li/a', document, null, 9, null).singleNodeValue;
			break;
		case 'pornpicuploader.com':
			img = document.evaluate('//div[@id="page_body"]/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'postimage.org':
			img = document.evaluate('//body/center/a', document, null, 9, null).singleNodeValue;
			break;
		case 'postimg.com':
			img = document.getElementById('image');
			break;
		case 'radikal.ru':
			img = document.evaluate('//div[@class="topp"]/table/tbody/tr/td/div/div/img', document, null, 9, null).singleNodeValue;
			break;
		case 'screenlist.ru':
			img = document.getElementById('picture');
			break;
		case 'shareaimage.com':
			img = document.evaluate('//div[@id="imagen"]/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'shareimage.ro':
			img = document.evaluate('//div[@id="page_body"]/div/a/img', document, null, 9, null).singleNodeValue;
			break;
		case 'sharenxs.com':
			if (location.href.match(/.+&pjk=l/)) {
				img = document.evaluate('//td[@align="center"]/a/img', document, null, 9, null).singleNodeValue;
			}
			else {
				location.href = location.href + '&pjk=l';
			}
			break;
		case 'skins.be':
			img = document.getElementById('wallpaper_image');
			break;
		case 'stooorage.com':
			img = document.evaluate('//table[@id="web"]/tbody/tr/td/div/div/img', document, null, 9, null).singleNodeValue;
			break;
		case 'subirimagenes.com':
			img = document.getElementById('ImagenVisualizada');
			if (!img) {
				var frm = document.getElementById('form1');
				if (frm) {
					frm.submit();
				}
			}
			break;
		case 'tinypic.com':
			img = document.getElementById('imgElement');
			break;
		case 'toile-libre.org':
			img = document.evaluate('//div[@class="image"]/span/a', document, null, 9, null).singleNodeValue;
			break;
		case 'turboimagehost.com':
			img = document.getElementById('imageid');
			break;
		case 'uploadimage.ro':
			img = document.getElementById('img_obj');
			break;
		case 'uploadhouse.com':
			img = document.getElementById('dispImg');
			break;
		case 'xup.in':
			img = document.evaluate('//div[@id="picture"]/a/img', document, null, 9, null).singleNodeValue;
			if (!img) img = document.evaluate('//div[@id="picture"]/img', document, null, 9, null).singleNodeValue;
			break;
		case 'yfrog.com':
			img = document.evaluate('//a[@class="last"]', document, null, 9, null).singleNodeValue;
			break;
		case 'yourimage.name':
			if (location.href.match(/\/full\//)) {
				img = document.getElementById('thephoto');
			}
			else {
				location.href = (location.href + '/full/').replace(/\/+/g, '/');
			}
			break;
	}
}


if (img || imgURL) {
	if (img && !imgURL) imgURL = (img.src ? img.src : img.href);
	if (imgURL) {
		if (needImgTag) {
			var scripts = document.getElementsByTagName('script');
			while (scripts && scripts.length) {
				scripts[0].parentNode.removeChild(scripts[0]);
			}
			document.getElementsByTagName('html')[0].innerHTML = '<html><head><title>' + document.location.href.replace(/^.+\/(.+)$/, '$1') + '</title></head><body><img id="idImage" alt="" src="' + imgURL + '"></body></html>';
			document.getElementById('idImage').addEventListener('load', function () { ibv = new EmbededView(); }, false);
			document.getElementById('idImage').addEventListener('click', function (event) { if (ibv) ibv.onClick(event); }, false);
		}
		else {
			location.replace(imgURL);
		}
	}
}


function EmbededView () {
	this.image  = document.getElementById('idImage');
	this.scaled = true;
	this.margin = 8;

	this.originalWidth  = this.image.width;
	this.originalHeight = this.image.height;

	this.image.setAttribute('style', 'float: left; margin: ' + this.margin + 'px;');
	this.scaled = !this.scaled;
	this.onClick(null);
}

EmbededView.prototype.onClick = function (event) {
	if (this.scaled) {
		var scrollX, scrollY;

		if (event) {
			scrollX = Math.max(0, Math.round ((event.pageX - this.image.offsetLeft) * (this.originalWidth  / this.image.width)  - window.innerWidth  / 2 + this.margin));
			scrollY = Math.max(0, Math.round ((event.pageY - this.image.offsetTop)  * (this.originalHeight / this.image.height) - window.innerHeight / 2 + this.margin));
		}

		this.image.width  = this.originalWidth;
		this.image.height = this.originalHeight;

		if (event) {
			window.scroll(scrollX, scrollY);
		}

		this.scaled = false;
	}
	else {
		var windowWidth  = window.innerWidth  - this.margin * 2;
		var windowHeight = window.innerHeight - this.margin * 2;

		if ((this.originalWidth > windowWidth) || (this.originalHeight > windowHeight)) {
			if (this.originalWidth / this.originalHeight < windowWidth / windowHeight) {
				this.image.height = windowHeight;
				this.image.width  = windowHeight * this.originalWidth / this.originalHeight;
			}
			else {
				this.image.width  = windowWidth;
				this.image.height = windowWidth * this.originalHeight / this.originalWidth;
			}
			this.scaled = true;
		}
		else {
			this.image.width  = this.originalWidth;
			this.image.height = this.originalHeight;
		}
	}

	this.image.style.cursor = ((this.originalWidth <= windowWidth) && (this.originalHeight <= windowHeight)) ? 'default' : ((this.scaled) ? '-moz-zoom-in' : '-moz-zoom-out');
}

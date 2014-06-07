// ==UserScript==
// @name		Show Just Image 3
// @description	Removes garbage from some image hosting sites and displays the image only. Updated version of timendums script.
// @version		3.1.1
// @author		untamed0, timendum, n5zhkyln
// @contributors	a1270A, Awemonster, Bgmin0t, Blinkiz, Dither, Farbio, henry99a, hpo14, kasper93, kekal, krad, LazieAlex, Loserfreak, lsdgribs, Maija, Marti, No Nay Never, Rulac, Stealthx, Sum Guy, treas0n, zumlin
// @require		http://usocheckup.dune.net/109890.js?id=usoCheckup&maxage=7&topicid=84474
// @require		http://userscripts.org/scripts/source/82206.user.js
// @license		GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @icon		http://i56.tinypic.com/2wqtk00.png
// @grant		GM_getValue
// @grant		GM_setValue
// @include		http://www.10pix.ru/view/*/*
// @include		http://www.4freeimagehost.com/show.php?i=*
// @include		http://4walled.org/show-*
// @include		http://99phost.com/browse.php?*
// @include		http://*.99phost.com/browse.php?*p
// @include		http://abload.de/image.php?*
// @include		http://*.abload.de/image.php?*
// @include		http://www.adult-images.net/show.php/*.html
// @include		http://www.adultimagehost.info/show.php/*.html
// @include		http://ambrybox.com/gallery/*.html
// @include		http://*.ambrybox.com/gallery/*.html
// @include		http://badimg.com/view.php?filename=*
// @include		http://bayimg.com/*
// @include		http://bigpichost.com/viewer-*.html
// @include		http://*.bigpichost.com/viewer-*.html
// @include		http://www.bild.me/bild.php?file=*
// @include		http://www.bilder-hochladen.net/files/*
// @include		http://www.bilder-upload.eu/show.php?file=*
// @include		http://bildr.no/view/*
// @include		http://*.bildr.no/view/*
// @include		http://bildupload.sro.at/*/*
// @include		http://*.blogimagehost.com/view/*/*.html
// @include		http://*.blogimagehost.com/view.php/*.html
// @include		http://*.bp.blogspot.com/*/*/*/*/*-h/*
// @include		http://www.boobsjournal.com/*/*
// @include		http://bodyspace.bodybuilding.com/photos/view-user-photo/*
// @include		http://nik.bot.nu/view.fu?ii=*
// @include		http://bustynudebabes.com/galleries/*/*/*/*.html
// @include		http://www.buttsjournal.com/*/*
// @include		http://brosome.com/*/*
// @include		http://bzazzerspix.com/viewer.php?file=*
// @include		http://casimages.com/img.php?i=*
// @include		http://www.casimages.com/img.php?i=*
// @include		http://www.castawayimage.com/viewer.php?file=*
// @include		http://celebslam.celebuzz.com/*/*/*
// @include		http://celebimg.com/view.php?filename=*
// @include		http://upload.centerzone.it/viewer.php?file=*
// @include		http://chickupload.com/showpicture/*/*/*
// @include		http://*.chickupload.com/showpicture/*/*/*
// @include		http://cocoimage.com/img.php?*
// @include		http://*.cocoimage.com/img.php?*
// @include		http://galleries.coolios.net/*/?p=*
// @include		http://crocogirls.com/*/*.html
// @include		http://*.crocogirls.com/*/*.html
// @include		http://crocostars.com/*/*.html
// @include		http://*.crocostars.com/*/*.html
// @include		http://crazypix.ru/viewer.php?file=*
// @include		http://www.demotivation.ru/*.html
// @include		http://demotivators.ru/posters/*/*.htm*
// @include		http://depic.me/*
// @include		http://www.desiupload.com/show.php/*.html
// @include		http://diabloo.net/show-image.php?id=*
// @include		http://dippic.com/*
// @include		http://*.directupload.net/file/*.htm
// @include		http://dlportal.eu/show.php/*.html
// @include		http://download.su/photo/*
// @include		http://*.download.su/photo/*
// @include		http://downlr.com/view/*
// @include		http://downlr.com/public/view/*
// @include		http://dump.com/*/*/*/*/
// @include		http://*.dump.com/*/*/*/*/
// @include		http://dumppix.com/viewer.php?*
// @include		http://*.dumppix.com/viewer.php?*
// @include		http://www.dumpt.com/img/viewer.php?file=*
// @include		http://www.duniaupload.com/files/*
// @include		http://g.e-hentai.org/s/*
// @include		http://exhentai.org/s/*
// @include		http://fantasti.cc/user/*/images/image/*
// @include		http://fapomatic.com/show/*/*
// @include		http://fapomatic.com/show.php?*
// @include		http://fastpic.ru/view/*.html
// @include		http://filefap.com/*view/*
// @include		http://www.flickr.com/photos/*/*/
// @include		http://www.flickr.com/photos/*/*/in/*
// @include		http://www.flickr.com/photos/*/*/sizes/*/
// @include		https://secure.flickr.com/photos/*/*/
// @include		https://secure.flickr.com/photos/*/*/in/*
// @include		https://secure.flickr.com/photos/*/*/sizes/*/
// @include		http://forscreen.com/image.php?id=*
// @include		http://foto-boom.org/viewer.php?file=
// @include		http://www.fotohosting.net/*.html
// @include		http://fotosik.pl/pokaz_obrazek/*
// @include		http://*.fotosik.pl/pokaz_obrazek/*
// @include		http://fotosik.pl/showFullSize.php?*
// @include		http://*.fotosik.pl/showFullSize.php?*
// @include		http://*.fotoupload.ru/viewer.php?file=*
// @include		http://*.fotoupload.ru/share-*
// @include		http://www.freakyimagehost.com/show.php/*.html
// @include		http://*.freebunker.com/img/*
// @include		http://*.freeimage.us/share.php?id=*
// @include		http://freeimagehosting.net/image.php?*
// @include		http://www.freeimagehosting.net/image.php?*
// @include		http://freepicninja.com/view.php?*
// @include		http://*.freepicninja.com/view.php?*
// @include		http://freepicninja.com/ads-cookie.php?redirected=1&return=*
// @include		http://*.freepicninja.com/ads-cookie.php?redirected=1&return=*
// @include		http://freeporndumpster.com/show.php?*
// @include		http://*.freeporndumpster.com/show.php?*
// @include		http://freeuploadimages.org/viewer.php?file=*
// @include		http://*.freeuploadimages.org/viewer.php?file=*
// @include		http://funkyimg.com/viewer.php?img=*
// @include		http://picshare.geenza.com/*
// @include		http://ghost-file.com/?v=*
// @include		http://*.glowfoto.com/viewimage.php?*
// @include		http://gptupload.com/viewer.php?file=*
// @include		http://www.gratisimage.dk/share-*.html
// @include		http://www.hbrowse.com/*/*
// @include		http://gallery.hentaifromhell.net/hfh/*/showimg.php?*
// @include		http://gallery.hentaifromhell.net/hfhgallery/*/showimg.php?*
// @include		http://gallery.hentaifromhell.net/*?level=picture&id=*
// @include		http://www.hollywoodtuna.com/photo.php?id=*
// @include		http://honeyindex.com/*/*/*.php
// @include		http://*.honeyindex.com/*/*/*.php
// @include		http://hostingfailov.com/photo/*
// @include		http://*.hostingfailov.com/photo/*
// @include		http://www.hostmyjpg.com/i/*
// @include		http://hostmypixxx.com/viewer.php?file=*
// @include		http://www.hostmypixxx.com/viewer.php?file=*
// @include		http://www.hotchyx.com/*.php?id=*
// @include		http://hotchyx.com/*.php?id=*
// @include		http://www.hotimg.com/image/*
// @include		http://*.hotlinkimage.com//img.php?*
// @include		http://*.hotlinkimage.com/img.php?*
// @include		http://hqimg.com/index.php/*/*/*
// @include		http://ibunker.us/*
// @include		http://ifotka.ru/viewer.php?file=*
// @include		http://www.image-share.com/*.html
// @include		http://image18.org/show.php?id=*
// @include		http://imagearn.com/image.php?id=*
// @include		http://*.imagearn.com/image.php?id=*
// @include		http://*.imagebam.com/image/*
// @include		http://imageban.net/show/*
// @include		http://imageban.ru/show/*
// @include		http://www.imagebanana.com/view/*/*
// @include		http://imagebb.org/view.php?filename=*
// @include		http://imagebin.ca/view/*.html
// @include		http://imagebin.org/*
// @include		http://imageboss.net/view/*
// @include		http://*.imageboss.net/view/*
// @include		http://imagebunk.com/image/*
// @include		http://imagebunk.com/imagewaste/*
// @include		http://www.imagecross.com/*/*
// @include		http://imagedoza.com/i.cc/*
// @include		http://imagedunk.com/*/*.html
// @include		http://*.imagedunk.com/*/*.html
// @include		http://www.imagefap.com/photo/*/*
// @include		http://imagefra.me/*
// @include		http://www.imagefruit.com/show/*
// @include		http://www.imagefruit.com/view/*
// @include		http://www.imagefruit.com/img/*
// @include		http://imagegecko.de/index.php?*
// @include		http://*.imagehaven.net/img.php?*
// @include		http://*.imagehyper.com/img.php?id=*
// @include		http://*.imagehost.org/view/*
// @include		http://imagehost.ro/viewer.php?*
// @include		http://*.imagehost.ro/viewer.php?*
// @include		http://imagehosting.gr/show.php/*
// @include		http://*.imagehosting.gr/show.php/*
// @include		http://www.imagenetz.de/*/*.html
// @include		http://www.imagepark.org/view/*/*
// @include		http://imagepix.org/image/*
// @include		http://*.imagepix.org/image/*
// @include		http://imageporter.com/*/*
// @include		http://*.imageporter.com/*/*
// @include		http://imagepremium.com/viewer.php?file=*
// @include		http://www.imagereverb.com/*/showimage.php*
// @include		http://*.imagerise.com/show.php/*
// @include		http://*.imagerise.com/view.php/*
// @include		http://*.imagesforme.com/show.php/*
// @include		http://*.imageshack.us/i/*
// @include		http://*.imageshack.us/my.php?*
// @include		http://imageshack.us/photo/*
// @include		http://www.imagesnake.com/view/*
// @include		http://www.imagesnake.com/img/*
// @include		http://imageshost.ru/links/*
// @include		http://*.imageshost.ru/links/*
// @include		http://imageshost.ru/photo/*/*.html
// @include		http://*.imageshost.ru/photo/*/*.html
// @include		http://*.imagesocket.com/warning/*
// @include		http://imagesocket.com/warning/*
// @include		http://imagesocket.com/view/*
// @include		http://*.imagesocket.com/view/*
// @include		http://www.imagestime.com/show.php/*.html
// @include		http://www.imagestrike.com/viewer.php?file=*
// @include		http://*.imagetitan.com/img.php?image=*
// @include		http://imagetwist.com/*/*.html
// @include		http://*.imagetwist.com/*/*.html
// @include		http://imageup.ru/*
// @include		http://*.imageup.ru/*
// @include		http://imageupper.com/gi/*
// @include		http://*.imageupper.com/gi/*
// @include		http://imageupper.com/i/*
// @include		http://*.imageupper.com/i/*
// @include		http://imagevader.com/show.php?*
// @include		http://*.imagevader.com/show.php?*
// @include		http://*.imagevenue.com/img.php?*
// @include		http://*.imagewaste.com/pictures/*/*
// @include		http://imagezilla.net/show/*
// @include		http://imaxenes.com/imagen/*
// @include		http://*.imaxenes.com/imagen/*
// @include		http://img.if.ua/*
// @include		http://www.img-teufel.de/img_*.html
// @include		http://img-vidiklub.com/viewer.php?*
// @include		http://*.img-vidiklub.com/viewer.php?*
// @exclude		http://imgbox.com/g/*
// @include		http://imgbox.com/*
// @include		http://www.imgbox.de/show/img/*
// @include		http://imgchili.com/viewer.php?*
// @include		http://imgchili.com/show/*
// @include		http://imgdepot.org/show/*
// @include		http://user-*.imgfiles.ru/*.html
// @include		http://imgfuck.com/viewer.php?file=*
// @include		http://*.imgiga.com/img.php?id=*
// @include		http://www.imgimg.de/*.html
// @include		http://www.imgload.biz/uploads/*/*.html
// @include		http://www.imgplace.com/viewimg*/*/*
// @include		http://imgsun.com/show.php/*.html
// @include		http://imgsin.com/viewer.php?file=*
// @include		http://imgtheif.com/show-image.php?id=*
// @include		http://imgur.com/*
// @exclude		http://imgur.com/
// @exclude		http://imgur.com/a/*
// @exclude		http://imgur.com/account/*
// @exclude		http://imgur.com/blog/
// @exclude		http://imgur.com/gallery
// @exclude		http://imgur.com/gallery/
// @include		http://immage.de/image-*.html
// @include		http://www.instaimg.net/?v=*
// @include		http://ipicture.ru/Gallery/Viewfull/*
// @include		http://*.ipicture.ru/Gallery/Viewfull/*
// @include		http://itmages.ru/image/view/*/*
// @include		http://iv.pl/viewer.php?file=*
// @include		http://*.iv.pl/viewer.php?file=*
// @include		http://www.jerkmate.com/images/full/*
// @include		http://jpghosting.com/showpic.php?*
// @include		http://*.jpghosting.com/showpic.php?*
// @include		http://jpgmag.com/photos/*
// @include		http://app.kapanlagi.com/galeri/*
// @include		http://kartinki.ws/*v=*
// @include		http://kartinok.ru/show.php/*.html
// @include		http://kemipic.com/share-*.html
// @include		http://*.kemipic.com/share-*.html
// @include		http://keptarolo.hu/*/*
// @include		http://www.kindgirls.com/photo/*
// @include		http://www.koimg.com/?img=*
// @include		http://lastnightsparty.com/*/slides/*.html
// @include		http://*.lastnightsparty.com/*/slides/*.html
// @include		http://*.linkgalleries.net
// @include		http://*.linkgalleries.net/
// @include		http://lostpic.net/?photo*
// @include		http://min.us/*
// @include		http://miragepics.com/viewer.php*
// @include		http://monkeypics.net/viewer.php?file=*
// @include		http://motherless.com/*
// @include		http://www.moyophoto.com/share.php?id=*
// @include		http://mrjh.org/gallery.php?entry=images/*
// @include		http://*.mrjh.org/gallery.php?entry=images/*
// @include		http://www.my-photo.ru/photo.php?*
// @include		http://my-image-host.com/show.php/*.html
// @include		http://*.my-image-host.com/show.php/*.html
// @include		http://my-image-host.com/view.php*
// @include		http://*.my-image-host.com/view.php*
// @include		http://my-image-host.com/viewer.php*
// @include		http://*.my-image-host.com/viewer.php*
// @include		http://myadultimage.com/viewer.php?file=*
// @include		http://www.myimghost.com/viewer.php?file=*
// @include		http://www.myphoto.to/View/*
// @include		http://myphoto.to/View/*
// @include		http://www.newimagehosting.com/view.php?image=*
// @include		http://npicture.net/share-*
// @include		http://nudiehost.com/content.php?*
// @include		http://omget.com/view/*
// @include		http://*.omget.com/view/*
// @include		http://www.otofotki.pl/*/*.html
// @include		http://photo-chicken.com/viewer.php?file=*
// @include		http://*.photobucket.com/image/*
// @include		http://*.photobucket.com/albumview/albums/*/*
// @include		http://*.photobucket.com/albums/*/*
// @include		http://photosex.biz/v.php?id=*
// @include		http://img.phyrefile.com/*
// @include		http://www.phyrefile.com/image/view/*
// @include		http://pic.ms/v2/*
// @include		http://*.pic-upload.de/view-*/*
// @include		http://pic2profit.com/*/*/
// @include		http://pic4you.ru/*
// @include		http://pic5you.ru/*/*
// @include		http://www.picamatic.com/view/*
// @include		http://www.picearns.com/show-image.php?id=*
// @include		http://*.picfoco.com/img.php?*
// @include		http://pici.se/*
// @include		http://picleet.com/*
// @include		http://www.picleet.com/*
// @include		http://picley.net/view.php?filename=*
// @include		http://picload.org/view/*/*
// @include		http://picnity.net/share.php?id=*
// @include		http://picp2.com/*/*
// @include		http://pics-hosting.com/viewer.php?file=*
// @include		http://*.pics-hosting.com/viewer.php?file=*
// @include		http://pics.roomsapp.mobi/*
// @include		http://www.picsarus.com/*
// @include		http://*.picscrazy.com/view/*
// @include		http://picsee.net/*/*.html
// @include		http://www.picturez.biz/?img=*
// @include		http://picturedip.com/*/*
// @include		http://*.picturedip.com/*/*
// @include		http://picturedumper.com/picture/*/*/*
// @include		http://*.picturedumper.com/picture/*/*/*
// @include		http://picturefunk.com/view/*/*
// @include		http://www.picturefunk.com/view/*/*
// @include		http://pictureshoster.com/viewer.php?file=*
// @include		http://*.pictureshoster.com/viewer.php?file=*
// @include		http://www.picturetogo.com/p/image/*
// @include		http://pikucha.ru/*
// @include		http://pimpandhost.com/*
// @include		http://*.pimpandhost.com/*
// @include		http://pixelup.net/image.html?*
// @include		http://*.pixelup.net/image.html?*
// @include		http://*.pixhost.org/show/*
// @include		http://pixhub.eu/images/show/*
// @include		http://pixmaster.net/viewer.php?file=*
// @include		http://pixmix.me/show.php/*.html
// @include		http://pixoplenty.com/show.php/*
// @include		http://www.pixroute.com/*/*.html
// @include		http://www.pixshock.net/*.html
// @include		http://www.pixsor.com/share-*.html
// @include		http://pohrani.com/?*/*/*/*.*
// @include		http://*.pohrani.com/?*/*/*/*.*
// @include		http://www.popoholic.com/photo.php?id=*
// @include		http://pic.pornoplace.me/pictures/view.php?*
// @include		http://pic.pornoplace.me/*.html
// @include		http://pornpicuploader.com/viewer.php?*
// @include		http://*.pornpicuploader.com/viewer.php?*
// @include		http://postimage.org/image/*
// @include		http://*.postimage.org/image/*
// @include		http://postimage.org/image.php?*
// @include		http://*.postimage.org/image.php?*
// @include		http://postimg.com/image/*
// @include		http://*.postimg.com/image/*
// @include		http://prntscr.com/*
// @include		http://r70.info/viewer.php?file=*
// @include		http://radikal.ru/F/*
// @include		http://*.radikal.ru/F/*
// @include		http://rghost.net/*
// @include		http://www.servimg.com/image_preview.php?*
// @include		http://www.screencity.pl/go,*
// @include		http://screenlist.ru/details.php?image_id=*
// @include		http://www.seedimage.com/show.php/*.html
// @include		http://selfshot.in/blog/*/*/*/*
// @include		http://sexyshare.net/image/*.html 
// @include		http://shabswp.ru/?v=*
// @include		http://www.share-image.com/*/*/*
// @include		http://www.shareimages.com/image.php*
// @include		http://shareimage.ro/viewer.php?*
// @include		http://*.shareimage.ro/viewer.php?*
// @include		http://sharenxs.com/view/?id=*
// @include		http://*.sharenxs.com/view/?id=*
// @include		http://www.shorpy.com/node/*
// @include		http://*.skins.be/*
// @include		http://skitch.com/*/*
// @include		http://*.stooorage.com/show/*
// @include		http://subefotos.com/ver/*
// @include		http://subimg.net/jpg?id=*
// @include		http://subirimagenes.com/*.html
// @include		http://*.subirimagenes.com/*.html
// @include		http://image.thaiguy.net/*page=view*
// @include		http://image.thaiguy.net/show_comp.php?*
// @include		http://thebestpichost.com/picture/*
// @include		http://x.thebestpichost.com/picture/*
// @include		http://thegrumpiest.com/picture.php?MyImage=*
// @include		http://tinypic.com/view.php?*
// @include		http://*.tinypic.com/view.php?*
// @include		http://twitgoo.com/*
// @include		http://twitpic.com/*/full
// @include		http://pix.toile-libre.org/?img=*
// @include		http://*.turboimagehost.com/p/*/*
// @include		http://uaimage.com/i/*
// @include		http://uaimage.com/image/*
// @include		http://uaimage.com/?page=i&u=*
// @include		http://uphotpic.com/show.php/*
// @include		http://upix.me/files/*
// @include		http://uploadgeek.com/share-*.html
// @include		http://www.uploadgeek.com/share-*.html
// @include		http://uploadhouse.com/viewfile.php?*
// @include		http://*.uploadhouse.com/viewfile.php?*
// @include		http://uploadimage.ro/show.php/*.html
// @include		http://*.uploadimage.ro/show.php/*.html
// @include		http://www.uploadstube.de/image.php?image=*
// @include		http://uploadz.eu/viewer.php?*
// @include		http://uppix.com/*.htm*
// @include		http://www.uppix.info/Pics/*/*
// @include		http://uppix.net/*/*.html
// @include		http://urpicspay.com/viewer.php?*
// @include		http://*.urpicspay.com/viewer.php?*
// @include		http://usemycomputer.com/show.html?*
// @include		http://vvcap.net/db/*
// @include		http://wallbase.cc/wallpaper/*
// @include		https://secure.wikimedia.org/wikipedia/*/wiki/File:*
// @include		http://*.wikipedia.org/wiki/File:*
// @include		http://wstaw.org/w/*
// @include		http://xmages.net/show.php/*.html
// @include		http://www.xtremeshack.com/*/*.html
// @include		http://xup.in/dl,*/*
// @include		http://*.xup.in/dl,*/*
// @include		http://ymages.org/show-image.php?id=*
// @include		http://www.ymages.org/show-image.php?id=*
// @include		http://yfrog.com/*
// @include		http://*.yfrog.com/*
// @include		http://youpics.ru/viewer.php?file*
// @include		http://www.yourfreeporn.us/showimage.asp?im=*
// @include		http://yourimage.name/*/
// @include		http://*.yourimage.name/*/
// @include		http://x05.org/show.php/*
// @include		http://xxxrolik2.net/?v=*
// @include		http://zaslike.com/viewer.php?file=*
// @include		http://www.zaslike.com/viewer.php?file=*
// @include		http://www.zimagez.com/zimage/*
// @include		http://userscripts.org/scripts/show/109890
// @include		http://userscripts.org/scripts/show/109890/
// ==/UserScript==

// Show Just Image CORE

if (typeof usoCheckup != "undefined") {
	//ok
} else {
	usoCheckup = {enabled: false};
}

var needImgTag = false;
var centerImg = false;
var dontFitImg = false;
var showUrl = false;
var bgColour = false;
var titleEmbededView;

var img, imgURL;
var ibv, EmbededView, viewImageSHI;

// helper
var hId = function(id){ return document.getElementById(id); };
var hXP = function(pat) { return document.evaluate(pat, document, null, 9, null).singleNodeValue; };
var hXPV = function(pat) { return hXP(pat).value; };
var hSel = function (selector) { return document.querySelector(selector); };
// getter
var byId = function(id){ img = document.getElementById(id) || img; return img; };
var byXP = function(pat) { img = hXP(pat) || img; return img; };
var byXPV = function(pat) { imgURL = hXPV(pat) || imgURL; return imgURL; };
var bySel = function (selector) { img = hSel(selector) || img; return img; };

var timedSearchImage = function(searchImageF) {
	var timeFunction = function() {
		searchImageF();
		if (!img && !imgURL) {
			setTimeout(timeFunction, 200);
		} else {
			viewImageSHI();
		}
	};
	setTimeout(timeFunction, 200);
};


var preferences = "0|0|0|0|#222222";
if (typeof GM_getValue != 'undefined') {
	var preferences = GM_getValue('pref', preferences) || preferences;
	var prefArray = preferences.split('|'); 

	bgColour = prefArray[4];
	showUrl = prefArray[3] === "1";
	dontFitImg = prefArray[2] === "1";
	centerImg = prefArray[1] === "1";
	needImgTag = prefArray[0] === "1" || centerImg || dontFitImg;
}

function printPreferencesControls() {
	var descBody = hId('full_description');
	var beforeElem = hXP('//div[@id="full_description"]/h3[1]');
	if (typeof GM_setValue === 'undefined' || descBody === null || beforeElem === null) {
		return;
	}
	
	var needE = function() {
		var ids = ['sjicenter', 'sjifit'],
		isNeeded = false,
		i = 0;
		for (; i < ids.length ; i++) {
			var elem = hId(ids[i]);
			if (elem && elem.checked) {
				isNeeded = true;
				break;
			}
		}
		
		var sjiembed = hId('sjiembed');
		
		if (isNeeded) {
			if (!sjiembed.disabled) {
				sjiembed.setAttribute('orig', sjiembed.checked);
			}
			sjiembed.disabled = true;
			sjiembed.checked = true;
		} else {
			sjiembed.disabled = false;
			sjiembed.checked = (sjiembed.getAttribute('orig') === "true");
		}
	},
	createCheckbox = function(id, checked, listener, textLabel) {
		var divRow = document.createElement('div');
		var input = document.createElement('input');
		input.setAttribute('id', id);
		input.setAttribute('type','checkbox');
		input.checked = checked;
		input.setAttribute('orig', checked);
		input.addEventListener('change', listener, false);
		divRow.appendChild(input);
		var label = document.createElement('label');
		label.setAttribute('for', id);
		label.appendChild(document.createTextNode(' ' + textLabel));
		divRow.appendChild(label);
		return divRow;
	},
	createTextinput = function(id, value, listener, textLabel) {
		var divRow = document.createElement('div');
		var input = document.createElement('input');
		input.setAttribute('id', id);
		input.setAttribute('type','text');
		input.setAttribute('style','width:60px;border:1px ' + encodeURI(bgColour) + ' solid;background-color:#EEEEEE;padding:3px;');
		input.value = value;
		input.addEventListener('change', listener, false);
		divRow.appendChild(input);
		var label = document.createElement('label');
		label.setAttribute('for', id);
		label.appendChild(document.createTextNode(' ' + textLabel));
		divRow.appendChild(label);
		return divRow;
	};
	
	var title = document.createElement('h3');
	title.appendChild(document.createTextNode("Preferences"));
	descBody.insertBefore(title,beforeElem);
	
	var toggleE = function() {
		prefArray[0] = (hId('sjiembed').checked ? "1" : "0");
		GM_setValue('pref', prefArray.join('|'));
	};
	descBody.insertBefore(
		createCheckbox(
			'sjiembed',
			needImgTag,
			toggleE,
			'Always embed images'
		),
		beforeElem
	);
	var toggleC = function() {
		needE();
		prefArray[1] = (hId('sjicenter').checked ? "1" : "0");
		GM_setValue('pref', prefArray.join('|'));
	};
	descBody.insertBefore(
		createCheckbox(
			'sjicenter',
			centerImg,
			toggleC,
			'Always center images'
		),
		beforeElem
	);
	var toggleF = function() {
		needE();
		prefArray[2] = (hId('sjifit').checked ? "1" : "0");
		GM_setValue('pref', prefArray.join('|'));
	};
	descBody.insertBefore(
		createCheckbox(
			'sjifit',
			dontFitImg,
			toggleF,
			'Don\'t fit images by default'
		),
		beforeElem
	);
	var toggleU = function() {
		usoCheckup.enabled = hId('usoEnab').checked;
	};
	descBody.insertBefore(
		createCheckbox(
			'usoEnab',
			usoCheckup.enabled,
			toggleU,
			'Enable auto-update'
		),
		beforeElem
	);
	var toggleS = function() {
		prefArray[3] = (hId('showUrl').checked ? "1" : "0");
		GM_setValue('pref', prefArray.join('|'));
	};
	descBody.insertBefore(
		createCheckbox(
			'showUrl',
			showUrl,
			toggleS,
			'Show url for embedded images'
		),
		beforeElem
	);
	var toggleS = function() {
		value = hId('bgColour').value;
		hId('bgColour').style.borderColor = value;
		prefArray[4] = value;
		GM_setValue('pref', prefArray.join('|'));
	};
	descBody.insertBefore(
		createTextinput(
			'bgColour',
			bgColour,
			toggleS,
			'Background Colour'
		),
		beforeElem
	);
	
	descBody.insertBefore(document.createElement('p'),beforeElem);
	needE();
}

function viewImageSHI() {
	if (img || imgURL) {
		if (img && !imgURL) {
			imgURL = (img.src || img.href);
		}
		if (imgURL) {
			if (needImgTag) {
				var scripts = document.getElementsByTagName('script');
				while (scripts && scripts.length) {
					scripts[0].parentNode.removeChild(scripts[0]);
				}
				titleEmbededView = titleEmbededView || document.location.href.replace(/^.+\/(.+) $/, '$1');
				var docElem = document.documentElement;
				// clean html
				while (docElem.attributes.item(0)) {
					docElem.attributes.removeNamedItem(docElem.attributes.item(0).name);
				}
				while (docElem.children[0]) {
					docElem.removeChild(document.documentElement.children[0]);
				}
				// create
				var head = document.createElement('head');
				var title = document.createElement('title');
				title.appendChild(document.createTextNode(titleEmbededView));
				head.appendChild(title);
				docElem.appendChild(head);
				var body = document.createElement('body');
				body.setAttribute('style', 'background-color:' + encodeURI(bgColour) + ';');
				docElem.appendChild(body);
				if (showUrl) {
					var par = document.createElement('p');
					var anch = document.createElement('a');
					anch.href = imgURL;
					anch.appendChild(document.createTextNode(imgURL));
					par.appendChild(anch);
					body.appendChild(par);
				}
				var image;
				if (imgURL.substr(imgURL.length-4) == '.svg') {
					image = document.createElement('object');
					image.data = imgURL;
					image.type= "image/svg+xml";
				} else {
					image = document.createElement('img');
					image.src = imgURL;
				}
				image.id = "idImage";
				body.appendChild(image);
				
				hId('idImage').addEventListener('load', function () { ibv = new EmbededView(); }, true);
				hId('idImage').addEventListener('click', function (event) { if (ibv) ibv.onClick(event); }, true);
				
				var favicon = hXP('//link[@rel="shortcut icon"]');
				if (favicon) {
					favicon.parentNode.removeChild(favicon);
				}
				favicon = document.createElement("link");
				favicon.type = "image/x-icon";
				favicon.rel = "shortcut icon";
				favicon.href = imgURL;
				document.head.appendChild(favicon);
			} else {
				location.replace(imgURL);
			}
		}
	}

	function EmbededView () {
		this.image = hId('idImage');
		this.scaled = !dontFitImg;
		this.margin = 8;

		this.originalWidth = this.image.naturalWidth || this.image.width;
		this.originalHeight = this.image.naturalHeight || this.image.height;

		if (centerImg) {
			this.image.setAttribute('style', 'text-align: center; position: absolute; margin: auto; top: 0; right: 0; bottom: 0; left: 0;');
			if (hId('urlImage')) {
				hId('urlImage').setAttribute('style','text-align: center;');
			}
		} else {
			this.image.setAttribute('style', 'float: left; margin: ' + this.margin + 'px;');
		}
		this.scaled = !this.scaled;
		this.onClick(null);
		this.chrom = (navigator.userAgent.toLowerCase().indexOf('chrom') > 0);
	}

	EmbededView.prototype.onClick = function (event) {
		var windowWidth  = window.innerWidth  - this.margin * 2;
		var windowHeight = window.innerHeight - this.margin * 2;
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
		} else {
			if ((this.originalWidth > windowWidth) || (this.originalHeight > windowHeight)) {
				if (this.originalWidth / this.originalHeight < windowWidth / windowHeight) {
					this.image.height = windowHeight;
					this.image.width  = windowHeight * this.originalWidth / this.originalHeight;
				} else {
					this.image.width  = windowWidth;
					this.image.height = windowWidth * this.originalHeight / this.originalWidth;
				}
				this.scaled = true;
			} else {
				this.image.width  = this.originalWidth;
				this.image.height = this.originalHeight;
			}
		}
		this.image.style.cursor = ((this.originalWidth <= windowWidth) && (this.originalHeight <= windowHeight)) ? 'default' : ((this.scaled) ? (this.chrom ? '-webkit-zoom-in' : '-moz-zoom-in') : (this.chrom ? '-webkit-zoom-out' : '-moz-zoom-out'));
	};
}

// MAIN SCRIPT STARTS HERE
var domain = location.hostname.match('([^\.]+)\.(at|be|biz|ca|cc|com|de|dk|eu|gr|hu|in|info|it|me|mobi|ms|name|net|no|nu|org|pl|ro|ru|se|su|to|ua|us|ws)$');

if (domain) {
	switch (domain[0]) {
		case '10pix.ru':
			byId('image');
			try { titleEmbededView = img.alt; } catch(e) {;}
			break;
		case '4freeimagehost.com':
			imgURL = hXP('//noscript').textContent.replace(/.+src=./i,"").replace(/.>/,"");
			break;
		case '4walled.org':
			byXP('//div[@id="mainImage"]/a/img');
			break;
		case '99phost.com':
			byXP('//div[@class="theimage"]/a/img');
			break;
		case 'abload.de':
			byId('image');
			break;
		case 'ambrybox.com':
			byXP('//div[@id="main"]/div/div/a/img');
			break;
		case 'badgirlsblog.com':
			byXP('//body/center/table/tbody/tr/td/a/img');
			break;
		case 'badimg.com':
		case 'celebimg.com':
		case 'imagebb.org':
		case 'picley.net':
			byId('photo');
			break;
		case 'bayimg.com':
			byId('mainImage');
			try { titleEmbededView = img.src.split('/')[img.src.split('/').length-1]; } catch(e) {;}
			break;
		case 'bigpichost.com':
			byXP('//div[@class="viewer_image"]/div/a/img');
			break;
		case 'bild.me':
			byId('Bild');
			break;
		case 'bilder-hochladen.net':
			byId('bhimage');
			break;
		case 'bilder-upload.eu':
			byXP('//input[@type="image"]');
			break;
		case 'bildr.no':
			byXP('//div[@id="view"]/a/img[@class="bilde"]');
			break;
		case 'sro.at':
			byXP('id("Content")/img');
			break;
		case 'blogspot.com':
			byXP('//body/img');
			break;
		case 'boobsjournal.com':
		case 'buttsjournal.com':
			byXPV('//div[@class="p-con"]//a[contains(@href, "/uploads/")]/@href');
			break;
		case 'bodybuilding.com':
			byXPV('//div[@class="photo-container"]/a[img]/@href');
			break;
		case 'bot.nu':
			byXPV('//span/a[img]/@href');
			break;
		case 'bustynudebabes.com':
			byXP('//div[@id="image"]/a[@title][2]/img[@alt]');
			break;
		case 'brosome.com':
			byXP('//center/div/img[@title][@height][@width]');
			if (img && img.src.match(/^.+?(-\d+x\d+).+/)) {
				imgURL = img.src.replace(/^(.+?)-\d+x\d+(.+)/,'$1$2');
				img = null;
			}
			break;
		case 'casimages.com':
			byXP('//td[@id="spoonyalamontagne"]/a/img');
			break;
		case 'celebuzz.com':
			byXP('//div[@id="bfmgalleryenlargedimage"]/a/img | //div[@id="bfmgalleryenlargedimage"]/img');
			break;
		case 'centerzone.it':
			byXP('//a/img[@alt]');
			break;
		case 'chickupload.com':
			byId('full');
			break;
		case 'cocoimage.com':
			byId('img');
			if (!img) {
				var script = hXP('//head/script');
				if (script) {
					var matches = script.innerHTML.match(/window\.location="(.+)";/);
					if (matches && matches.length == 2) {
						location.href = matches[1];
					}
				}
			}
			break;
		case 'coolios.net':
			byId('detailpic');
			break;
		case 'crocogirls.com':
			byXP('//div[@class="modelbox-thumbs"]/a/img');
			break;
		case 'crocostars.com':
			byXP('//div[@class="big2"]/a/img');
			break;
		case 'demotivation.ru':
			img = document.getElementsByName('DEMOTIVATOR')[0];
			break;
		case 'demotivators.ru':
			byId('poster');
			break;
		case 'depic.me':
			byXP('//img[@class="pic"]');
			break;
		case 'diabloo.net':
			byXP('//center/b/a/img');
			break;
		case 'dippic.com':
			byXP('id("gallery")/a');
			break;
		case 'directupload.net':
			byXP('//div[@class="wraptocenter_big"]//*[self::img or self::input[@type="image"]]');
			break;
		case 'download.su':
			byId('thepic');
			break;
		case 'downlr.com':
			if (location.href.match(/\/view\/full\//)) {
				img = hId('thepic') || hXP('//p[@id="image_container"]/img');
			}
			else if (location.href.match(/\/view\//)) {
				location.href = location.href.replace(/\/view\//, '/view/full/');
			}
			break;
		case 'dump.com':
			img = hXP('//a[@class="zoom"]/img') || hXP('//img[contains(@class, "size-full")]');
			break;
		case 'dumppix.com':
			needImgTag = true;
			byXP('//td[@width]/img[@class]');
			try { titleEmbededView = img.alt; } catch(e) {;}
			break;
		case 'dumpt.com':
			needImgTag = true;
			byXP('//div[@class="imgbox"]/a/img');
			break;
		case 'duniaupload.com':
			byId('duimg');
			break;
		case 'exhentai.org':
		case 'e-hentai.org':
			byXP('//div[@class="sni"]/a/img');
			if (img) {
				imgURL = img.src.replace('amp;', '');
			}
			break;
		case 'fantasti.cc':
			byXP('//a[@title="View Next image "]/img');
			break;
		case 'fapomatic.com':
			byId('subject');
			try {
				var matches = location.search.match(/f=([^&]+\.([^&]+))/i);
				if (!matches) {
					matches = location.pathname.match(/\/([^\/]+\.([^\/]+))$/);
				}
				if (matches[2]) {
					if (matches[2].toLowerCase() == "bmp") {
						needImgTag = true;
					}
					titleEmbededView = matches[1];
				}
			} catch(e) {;}
			break;
		case 'fastpic.ru':
			needImgTag = true;
			byId('image');
			break;
		case 'filefap.com':
			byId('thepic');
			break;
		case 'flickr.com':
			if (location.href.match(/\/sizes\//)) {
				var original = hXP('//a[contains(@href, "/sizes/k/")]');
				if (original) {
					location.replace(original.href);
				} else {
					byXP('//div[@id="allsizes-photo"]/img');
				}
			}
			else {
				var zoom = hXP('//a[contains(@class,"option-all-sizes")]');
				if (zoom && zoom.href.match(/\/sizes\//)) {
					location.replace(zoom.href);
				} else {
					byXP('//div[@class="photo-div"]/img');
				}
			}
			break;
		case 'forscreen.com':
			byXP('//td/center/img[@onclick]');
			try { titleEmbededView = location.href.match(/id=(.+)$/i)[1]; } catch(e) {;}
			break;
		case 'fotosik.pl':
			if (location.href.match(/\/showFullSize\.php\?|\/pelny\//)) {
				byXP('//div[@id="contentfullphoto"]/a/img');
			}
			else if (location.href.match(/\/pokaz_obrazek\//)) {
				location.href = location.href.replace(/\/pokaz_obrazek\//, '/pokaz_obrazek/pelny/');
			}
			break;
		case 'fotohosting.net':
			byXP('//a[@id="fancybox"]/img');
			break;
		case 'freeimage.us':
			byXP('id("share_image")/img');
			break;
		case 'freeimagehosting.net':
			byXP('//body/center/table//tr[2]/td/table//img');
			break;
		case 'freepicninja.com':
			if (location.href.match(/\/view\.php\?/)) {
				byId('imgdisp');
			}
			else if (location.href.match(/\/ads-cookie\.php\?redirected=1&return=/)) {
				location.href = location.href.replace(/\/ads-cookie\.php\?redirected=1&return=/, '/view.php?picture=');
			}
			break;
		case 'freeporndumpster.com':
			byId('thepic');
			break;
		case 'funkyimg.com':
			byId('image');
			break;
		case 'geenza.com':
			byId('picShare_image_container');
			if (!img) {
				var adlt_frm = hId('adlt_frm');
				if (adlt_frm) {
					adlt_frm.submit();
				}
			}
			break;
		case 'ghost-file.com':
		case 'instaimg.net':
		case 'shabswp.ru':
			byXP('//div[@id="imagen"]/a/img');
			try { titleEmbededView = location.href.match(/v=(.+)$/i)[1]; } catch(e) {;}
			break;
		case 'glowfoto.com':
			byXP('//div[contains(@id, "round_titled_cell")]/center/table/tbody/tr/td/a/img');
			break;
		case 'gptupload.com':
			byXP('//div[contains(@class, "text_align_center")]/a/img');
			break;
		case 'hbrowse.com':
			byXP('//tr/td[@class="pageImage"]/a/img');
			break;
		case 'hentaifromhell.net':
			img = hId('the_image') || hXP('//div[@id="picture-holder"]/a/img');
			break;
		case 'hollywoodtuna.com':
			byXP('//p/a/img');
			break;
		case 'honeyindex.com':
			byXP('//div[@id="full-pic"]/a/img');
			break;
		case 'hostingfailov.com':
			needImgTag = true;
			byXP('//img[@id="thepic"][@border="0"][@style]');
			break;
		case 'hostmyjpg.com':
			byXP('//img[@class="abTempImg"]');
			break;
		case 'hotchyx.com':
			byId('thepic');
			try { titleEmbededView = location.search.substring(4); } catch(e) {;}
			break;
		case 'hotlinkimage.com':
			byId('img');
			if (!img) {
				var script = hXP('//body/script');
				if (script) {
					var matches = script.innerHTML.match(/window\.location="(.+)";/);
					if (matches && matches.length == 2) {
						location.replace(matches[1]);
					}
				}
			}
			break;
		case 'hotimg.com':
			byXP('//a[@class="subButton"]');
			break;
		case 'hqimg.com':
			if (location.href.match(/size=resize/i)) {
			  location.replace(location.href.replace(/size=resize/i,'size=original'));
			} else if (location.href.match(/\.jpg\?action\=big\&size\=original/)) {
			  byXP('//img[@class="img_bigimage"]');
			}
			break;
		case 'ibunker.us':
			needImgTag = true;
			byId('picture');
			break;
		case 'image-share.com':
			byId('image');
			break;
		case 'image18.org':
			byXP('//div[@class="file"]/img');
			break;
		case 'imagearn.com':
			byId('img');
			break;
		case 'imagebam.com':
			needImgTag = true;
			byXP('//img[@id][@style]');
			break;
		case 'imagebanana.com':
			byId('image');
			break;
		case 'imagebin.ca':
			byId('theimg');
			break;
		case 'imagebin.org':
			byXP('//body/div/div/p/img');
			break;
		case 'imageboss.net':
			byId('thepic');
			break;
		case 'imagebunk.com':
			needImgTag = true;
			byId('img_obj');
			break;
		case 'imagecross.com':
			byId('thepic');
			break;
		case 'imagedoza.com':
			needImgTag = true;
			byId('im');
			break;
		case 'imagefap.com':
			needImgTag = true;
			var ifns = hXP('//noscript[contains(.,"mainPhoto")]'), ifnsTxt = ifns.textContent || ifns.innerHTML;
			if (ifnsTxt){
				imgURL = ifnsTxt.match(/src="([^"]+)"/)[1];
			}
			break;
		case 'imagefra.me':
			byXP('//table//td/img[@style]');
			break;
		case 'imagegecko.de':
			byXP('//div[@id="content"]/p/a/img');
			break;
		case 'imagehaven.net':
			byId('image');
			break;
		case 'imagehyper.com':
			byId('mainimg');
			break;
		case 'imagehost.org':
			byId('image');
			break;
		case 'imagehost.ro':
			byXP('//div[@class="picture"]/a/img');
			break;
		case 'imgchili.com':
			byId('show_image');
			break;
		case 'imagenetz.de':
			byId('picture');
			break;
		case 'imagepark.org':
			byXP('//a[@target]/img[@alt]');
			break;
		case 'imagepix.org':
			byXP('//div[@class="panel"]/img');
			break;
		case 'imageporter.com':
		case 'imagedunk.com':
		case 'picleet.com':
		case 'picturedip.com':
			//see pixroute
			needImgTag = true;
			//byId('looz1oo');
			byXP('//center/div/a/img[@id]');
			location.href = "javascript:void(clearInterval(splashpage.moveuptimer));";
			break;
		case 'imagereverb.com':
			byId('picture');
			break;
		case 'imageshack.us':
//			byId('main_image');
			byXP('//link[@rel="image_src"]');
			break;
		case 'imageshost.ru':
			// .ru/links/
			// .ru/photo/
			img = hId('image') || hXP('//div[@id="bphoto"]/a');
			break;
		case 'imagesnake.com':
			needImgTag = true;
			byId('img_obj');
			break;
		case 'imagesocket.com':
			img = hId('thumb') || hXP('//img[@class="cboxElement"]');
			if (!img) {
				var year = document.getElementsByName('year');
				if (year[0]) {
					year[0].value = '1980';
					document.getElementsByName('verifyAge')[0].click();
				}
			}
			break;
		case 'imagestrike.com':
			byId('dispImg');
			break;
		case 'imagetitan.com':
			byId('image');
			break;
		case 'imagetwist.com':
			byXP('//div[@id="left"]/p/img[@class="pic"]');
			break;
		case 'imageup.ru':
			needImgTag = true;
			byId('image');
			break;
		case 'imageupper.com':
			byId('img');
			break;
		case 'imagevenue.com':
			byId('thepic');
			break;
		case 'imagewaste.com':
			needImgTag = true;
			byXP('//div[@class="imagebox"]/table/tbody/tr/td/img');
			break;
		case 'imagezilla.net':
			needImgTag = true;
			byId('photo');
			break;
		case 'imaxenes.com':
			needImgTag = true;
			byId('laimagen');
			break;
		case 'if.ua':
			byId('img');
			break;
		case 'img-teufel.de':
			byXP('//div/img[@alt]');
			try { titleEmbededView = img.alt; } catch(e) {;}
			break;
		case 'img-vidiklub.com':
			byXP('//div[@class="text_align_center"]/a/img');
			break;
		case 'imgbox.com':
			byId('img');
			break;
		case 'imgbox.de':
			byXP('//td/center/img[@alt]');
			try { titleEmbededView = img.alt; } catch(e) {;}
			break;
		case 'imgdepot.org':
			byXP('//div/div/img');
			break;
		case 'imgfiles.ru':
			byId('pic');
			break;
		case 'imgiga.com':
			timedSearchImage(function() {
				byId('scaled_image');
			});
			break;
		case 'imgimg.de':
			img = document.getElementsByName('bild')[0];
			break;
		case 'imgload.biz':
			byXP('//a[@target]/img[@alt]');
			break;
		case 'imgplace.com':
			byXP('//center/a[2]/img');
			break;
		case 'imgsin.com':
			byXP('//div/img[@alt]');
			try { titleEmbededView = img.alt; } catch(e) {;}
			break;
		case 'imgtheif.com':
			byXP('//div[@class="content-container"]//a[@target]/img');
			try { titleEmbededView = location.href.match(/id=(.+)/i)[1]; } catch(e) {;}
			break;
		case 'imgur.com':
			byXP('//div[@id="content"]//div//img');
			break;
		case 'immage.de':
			byXP('//td[@id="img_cont"]/table/tbody/tr/td/a/img');
			break;
		case 'ipicture.ru':
			byId('newImg');
			break;
		case 'itmages.ru':
			byId('image');
			break;
		case 'jerkmate.com':
			byXP('//a[@target]/img[@alt]');
			break;
		case 'jpghosting.com':
			byXP('//td[@class="table_decoration"]/center/center/table/tbody/tr/td/center/img');
			break;
		case 'jpgmag.com':
			byXP('//img[@class="mainimage"]');
			break;
		case 'kapanlagi.com':
			imgURL = location.href.substring(location.href.indexOf('http',1));
			break;
		case 'kartinki.ws':
			byXP('//div[@id="imagen"]/a/img');
			break;
		case 'kemipic.com':
			byId('iimg');
			if (!img) {
				var script = hXP('//table[@class="table_main"]/tbody/tr/td/script');
				if (script) {
					var matches = script.innerHTML.match(/img src='(.+)' id='iimg'/);
					if (matches && matches.length == 2) {
						imgURL = matches[1];
					}
				}
			}
			break;
		case 'keptarolo.hu':
			byXP('//div/p/a/img[@alt]');
			break;
		case 'kindgirls.com':
			byXP('//a/img[@alt]');
			break;
		case 'koimg.com':
			byXP('//center/img[@alt]');
			break;
		case 'lastnightsparty.com':
			byXP('//div[@id="frame"]/img[@usemap="#ee_multiarea"]');
			break;
		case 'linkgalleries.net':
			location.replace(byId('content').src);
			break;
		case 'lostpic.net':
			byXP('//img[@class="notinline circle"]')
			break;
		case 'min.us':
			timedSearchImage(function() {
				byXPV('//button[@class="view_button"]/@href');
			});
			break;
		case 'miragepics.com':
			byXP('//a/img[@alt]');
			try { titleEmbededView = img.alt; } catch(e) {;}
			break;
		case 'monkeypics.net':
			byXP('//div[@class="text_align_center"]/a/img');
			break;
		case 'motherless.com':
			byId('thepic');
			if (!img) {
				byXPV('//a[contains(@href,"?full")][img]/@href');
			}
			break;
		case 'moyophoto.com':
			byId('iimg');
			break;
		case 'mrjh.org':
			byXP('//table[@bordercolor="#999999"]/tbody/tr/td/img');
			break;
		case 'my-photo.ru':
			byXP('//body/center/img');
			break;
		case 'my-image-host.com':
			img = hId('img_obj') || hXP('//div[@class="imgs"]/a/img');
			break;
		case 'myimghost.com':
			byXP('//td/a/img[@alt]');
			try { titleEmbededView = img.title; } catch(e) {;}
			break;
		case 'myphoto.to':
			byId('Img_View');
			break;
		case 'newimagehosting.com':
			byId('myimage');
			try { titleEmbededView = img.src.split('-')[img.src.split('-').length - 1]; } catch(e) {;}
			break;
		case 'nudiehost.com':
			needImgTag = true;
			byId('thepic');
			break;
		case 'omget.com':
			byXP('//center/a/img');
			break;
		case 'otofotki.pl':
			byXP('//div[@class="inner_main"]/a/img');
			break;
		case 'photobucket.com':
			byId('fullImage') || byId('fullSizedImage');
			if (!img) {
				byXP('//div[@id="searchDetail"]/div/img');
				if (!img) byXP('//div[@id="fullViewContainer"]/div/img');
				if (img.src.match(/http:\/\/mob(\d+)\./)) {
					img.src = img.src.replace(/http:\/\/mob(\d+)\./, 'http://i$1.');
				}
			}
			break;
		case 'photosex.biz':
			byXP('//body/center/img');
			try { titleEmbededView = location.href.match(/id=(.+)$/i)[1]; } catch(e) {;}
			break;
		case 'phyrefile.com':
			byXP('(//div[@id="preamble"] | //div[@class="filePreview"])/a/img');
			break;
		case 'pic.ms':
			byXP('//div/a/img[@alt]');
			break;
		case 'pic-upload.de':
			byXP('//img[@class="preview_picture_2b"]');
			break;
		case 'pic2profit.com':
			byXPV('//form//input[@name="bigimg"]');
			break;
		case 'pic4you.ru':
		case 'pic5you.ru':
			byXP('//img[@onclick]');
			if (img != null) {
				location.replace(location.href+'1/');
				img = null;
			} else {
				byXP('//div[@align]//td/img');
			}
			break;
		case 'picamatic.com':
			byId('pic');
			break;
		case 'picearns.com':
			byXP('//td/a[@target]/img');
			break;
		case 'picfoco.com':
			byId('img');
			if (!img) {
				var script =hXP('//body/script');
				if (script) {
					var matches = script.innerHTML.match(/window\.location="(.+)";/);
					if (matches && matches.length == 2) {
						location.href = matches[1];
					}
				}
			}
			break;
		case 'pici.se':
			byId('image');
			break;
		case 'picload.org':
			byId('myImage');
			break;
		case 'picp2.com':
			var submit = hXP('//form/input[@type="submit"]')
			if (!submit) {
				byXP('//div[@id="d1"]/img');
				try { titleEmbededView = img.alt; } catch(e) {;}
			} else {
				submit.form.submit();
			}
			break;
		case 'picsarus.com':
			byXP('//div[contains(@class,"main-content")]/div/a/img');
			break;
		case 'picscrazy.com':
			byXP('//td[@align="center"]/img');
			break;
		case 'picsee.net':
			imgURL = location.protocol + '//' + location.hostname + hXPV('//td/a[@target][img/@alt]/@href');
			break;
		case 'picturez.biz':
			byXP('//center/img[@alt]');
			break;
		case 'picturedumper.com':
			byId('image');
			break;
		case 'picturefunk.com':
			needImgTag = true;
			byXP('//body/center/img');
			break;
		case 'picturetogo.com':
			byXP('//td/img[@id][@alt]');
			try { titleEmbededView = img.alt; } catch(e) {;}
			break;
		case 'pikucha.ru':
			byId('image');
			break;
		case 'pimpandhost.com':
			if (location.href.match(/-original\.html$/)) {
				byId('image');
			} else {
				location.replace(hXP('//a[contains(@href,"original")]').href);
			}
			break;
		case 'pixelup.net':
			byXP('//td[@id="center"]/div/center/img');
			break;
		case 'pixhost.org':
			needImgTag = true;
			img = hId('show_image') || hXP('//div[@id="text"]/div/table/tbody/tr/td/img');
			break;
		case 'pixhub.eu':
			byXP('//div[@class="image-show resize"]/img');
			break;
		case 'pixroute.com':
			// see imageporter.com
			needImgTag = true;
			byXP('//center/div/a/img[@id]');
			location.href = "javascript:void(clearInterval(splashpage.moveuptimer));";
			break;
		case 'pixshock.net':
			byId('mi');
			break;
		case 'pohrani.com':
			byXP('//body/div/img[@onload="resize(this,false);"]');
			break;
		case 'popoholic.com':
			byXP('//div[@id="main_photo"]/a/img');
			break;
		case 'pornoplace.me':
			img = hId('photo') || hXP('//div[@class="img_box"]/a[@title]/img');
			break;
		case 'postimage.org':
			byXP('//center/a/img');
			break;
		case 'postimg.com':
			byId('image');
			break;
		case 'prntscr.com':
			byXP('//img[@class="shot"]');
			break;
		case 'radikal.ru':
			byXP('//div[@class="topp"]/table/tbody/tr/td/div/div/img');
			break;
		case 'rghost.net':
			byXP('//body/div/div/div/center/a/img');
			break;
		case 'roomsapp.mobi':
			byXP('//a[@id="roomsPicLink"]');
			break;
		case 'servimg.com':
			byXP('//*[@id="picture"]/img');
			break;
		case 'screencity.pl':
			byXP('//div[@id="details_page"]//div[@id="middle_middle"]//img');
			try { titleEmbededView = document.title.split(' - ')[0]; } catch(e) {;}
			break;
		case 'screenlist.ru':
			byId('picture');
			try { titleEmbededView = location.href.match(/_id=(.+)$/i)[1]; } catch(e) {;}
			break;
		case 'selfshot.in':
			byXP('//div[@class="single-post"]/p/a/img');
			break;
		case 'sexyshare.net':
			imgURL = atob(location.pathname.substring(location.pathname.lastIndexOf('/')+1,location.pathname.lastIndexOf('.')));
			break;
		case 'share-image.com':
			byXP('//a[@target]/img[@width][@height]');
			break;
		case 'shareimages.com':
			byXP('//td/img[@alt][@border]');
			break;
		case 'sharenxs.com':
			if (location.href.match(/.+&pjk=l/)) {
				byXP('//td[@align="center"]/a/img');
			} else {
				location.replace(location.href + '&pjk=l');
			}
			break;
		case 'shorpy.com':
			byXP('//div[@class="content"]/img[@alt]');
			if (!img) {
				var original = hXPV('//div[@class="content"]/a[img/@alt]/@href');
				if (original) { location.replace(original); }
			} else {
				try { titleEmbededView = img.alt; } catch(e) {;}
			}
			break;
		case 'skins.be':
			byId('wallpaper_image');
			break;
		case 'skitch.com':
			byId('skitch-image');
			break;
		case 'stooorage.com':
			needImgTag = true;
			byXP('//div[@id="page_body"]/div/div/img');
			break;
		case 'subefotos.com':
			timedSearchImage(function() {
				byId('imagen_original');
			});
			break;
		case 'subimg.net':
			byXP('//img[contains(@id,"Image ")]');
			break;
		case 'subirimagenes.com':
			byId('ImagenVisualizada');
			if (!img) {
				var frm = hId('form1');
				if (frm) {
					frm.submit();
				}
			}
			break;
		case 'thaiguy.net':
			//location.replace(location.href.replace(/\/show_comp\.php\?/i,'/index.php?page=view&'));
			needImgTag = true;
			byXP('//div[@align="center"]/img');
			try { titleEmbededView = location.href.match(/name=([^&]+)$/i)[1]; } catch(e) {;}
			break;
		case 'thebestpichost.com':
			byId('imgdisp');
			break;
		case 'thegrumpiest.com':
			byXP('//td/img');
			break;
		case 'tinypic.com':
			byId('imgElement');
			break;
		case 'twitgoo.com':
			byId('fullsize');
			break;
		case 'twitpic.com':
			needImgTag = true;
			byXP('/html/body/img');
			try { titleEmbededView = document.location.href.match(/twitpic.com\/(.+?)(\/.+)?$/)[1]; } catch(e) {;}
			break;
		case 'toile-libre.org':
			byXP('//div[@class="image"]/span/a');
			break;
		case 'turboimagehost.com':
			byId('imageid');
			break;
		case 'uaimage.com':
			needImgTag = true;
			byId('im');
			break;
		case 'upix.me':
			byXP('//a[@class="thumb"]');
			break;
		case 'uploadhouse.com':
			byId('dispImg');
			break;
		case 'uploadstube.de':
			byXP('//a[contains(@href, "_orig")]');
			break;
		case 'uppix.com':
			byXP('//div/img[@alt]');
			break;
		case 'uppix.info':
			byId('dpic');
			break;
		case 'uppix.net':
			byXP('//body/div/img');
			break;
		case 'urpicspay.com':
			byXP('//div[@id="page_body"]/center/a/img');
			try { titleEmbededView = location.href.match(/file=(.+)$/i)[1]; } catch(e) {;}
			break;
		case 'usemycomputer.com':
			byXP('//div[@id="usemyimage"]/img');
			break;
		case 'vvcap.net':
			byXP('//body/div/img');
			break;
		case 'wallbase.cc':
			byXP('//div[@id="bigwall"]/img');
			break;
		case 'wikimedia.org':
		case 'wikipedia.org':
			byXP('//div[@class="fullMedia"]/a[@class="internal"]');
			break;
		case 'wstaw.org':
			byXP('//img[@class="fotkabig"]') == null ? byXP('//img[@class="fotkasmall"]') : byXP('//img[@class="fotkabig"]');
			try {
				imgURL = img.src.replace(/_\d+x\d+_q\d+.\jpg/,'').replace(/_(....?)$/,'.$1');
			} catch (e) {;}
			break;
		case 'x05.org':
			byId('img_obj');
			break;
		case 'xtremeshack.com':
			byXP('//div[@id="picture"]/a/img') || byId('img_obj');
			break;
		case 'xup.in':
			byXP('//div[@id="picture"]/a/img') || byXP('//div[@id="picture"]/img');
			break;
		case 'xxxrolik2.net':
			byXP('//div[@id="imagen"]/a/img');
			break;
		case 'ymages.org':
			byXP('//center/a[@target]/img[@height]');
			if (!img) {
				byXP('//input[@type="submit"][@onclick]').form.submit()
			}
			break;
		case 'yfrog.com':
			byXPV('//a[img/@alt="Direct"]/@href');
			break;
		case 'youpics.ru':
			byXP('//div[@class="text_align_center"]/a/img');
			break;
		case 'yourfreeporn.us':
			byXP('//div[@class="bcontent"]/center/img');
			break;
		case 'yourimage.name':
			if (location.href.match(/\/full\//)) {
				byId('thephoto');
			}
			else {
				location.href = (location.href + '/full/').replace(/\/+/g, '/');
			}
			break;
		case 'zaslike.com':
			byXP('//div[@id="page_body"]/div/a/img[@alt]');
			break;
		case 'zimagez.com':
			byId('userPic');
			break;
		// iimg
		case 'gratisimage.dk':
		case 'npicture.net':
		case 'picnity.net':
		case 'pixsor.com':
		case 'uploadgeek.com':
			byId('iimg');
			break;
		// img_obj
		case 'adult-images.net':
		case 'adultimagehost.info':
		case 'blogimagehost.com':
		case 'desiupload.com':
		case 'dlportal.eu':
		case 'freakyimagehost.com':
		case 'imageban.net':
		case 'imageban.ru':
		case 'imagehosting.gr':
		case 'imagerise.com':
		case 'imagesforme.com':
		case 'imagesnake.com':
		case 'imagestime.com':
		case 'imagevader.com':
		case 'imgsun.com':
		case 'kartinok.ru':
		case 'pixmix.me':
		case 'pixoplenty.com':
		case 'seedimage.com':
		case 'uphotpic.com':
		case 'uploadimage.ro':
		case 'xmages.net':
			byId('img_obj');
			break;
		case 'imagefruit.com':
		case 'freebunker.com':
			needImgTag = true;
			byId('img_obj');
			break;
		// MultiHoster
		case 'bzazzerspix.com':
		case 'castawayimage.com':
		case 'crazypix.ru':
		case 'ifotka.ru':
		case 'foto-boom.org':
		case 'fotoupload.ru':
		case 'freeuploadimages.org':
		case 'hostmypixxx.com':
		case 'imagepremium.com':
		case 'imgfuck.com':
		case 'iv.pl':
		case 'myadultimage.com':
		case 'photo-chicken.com':
		case 'pics-hosting.com':
		case 'pictureshoster.com':
		case 'pixmaster.net':
		case 'pornpicuploader.com':
		case 'r70.info':
		case 'shareimage.ro':
		case 'uploadz.eu':
			byXP('//div[@id="page_body"]/div/a/img');
			try { titleEmbededView = location.href.match(/file=(.+)$/i)[1]; } catch(e) {;}
			break;
		case 'userscripts.org':
			printPreferencesControls();
			break;
	}
}
viewImageSHI();

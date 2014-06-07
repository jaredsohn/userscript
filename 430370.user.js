// ==UserScript==
// @name          Just Image
// @namespace     erosman
// @description   Shows Just the Image on Image Hosts
// @updateURL     https://userscripts.org/scripts/source/430370.meta.js
// @downloadURL   https://userscripts.org/scripts/source/430370.user.js
// @grant         none
// @author        erosman
// @version       1.3

/* ----- Image Hosts ----- */
// @include       /http://(www.)?pixhub\.eu/images/show/.+/
// @include       http://*.fotoupload.ru/viewer.php?file=*
// @include       http://*.imagevenue.com/img.php?*
// @include       http://*.photobucket.com/user/*.html
// @include       http://08lkk.com/Image/img-*
// @include       http://123poze.3x.ro/viewer.php?file=*
// @include       http://1pics.ru/view-*
// @include       http://22.io/*
// @include       http://244pix.com/viewer.php?file=*
// @include       http://2tu.me/view.php?filename=*
// @include       http://4owl.info/viewer.php?id=*
// @include       http://4put.ru/view-max-picture.php?id=*
// @include       http://4ufrom.me/download.php?file=*
// @include       http://4ufrom.me/viewer.php?file=*
// @include       http://9foto.ru/photo/*
// @include       http://abload.de/image.php?img=*
// @include       http://add-screen.com/viewer.php?file=*
// @include       http://addpix.net/viewer.php?file=*
// @include       http://addyourpics.com/image/*
// @include       http://adultur.com/img-*
// @include       http://anonpic.com/?v=*
// @include       http://api.picx.me/?v=*
// @include       http://aveimage.com/view.php?filename=*
// @include       http://avenuexxx.com/*
// @include       http://b4he.com/?v=*
// @include       http://bayimg.com/*
// @include       http://bilder.nixhelp.de/display-*
// @include       http://bildjunkies.de/viewer.php?file=*
// @include       http://bildr.no/view/*
// @include       http://blackcatpix.com/v.php?id=*
// @include       http://brightpic.tk/image/*
// @include       http://chickupload.com/showpicture/*
// @include       http://cloudimg.net/img-*
// @include       http://croftimage.com/img-*
// @include       http://cubeupload.com/im/*
// @include       http://damimage.com/img-*
// @include       http://depic.me/*
// @include       http://dtpics.biz/img-*
// @include       http://easyimghost.com/ImageHosting/*
// @include       http://fastimages.ru/*
// @include       http://fastpic.ru/view/*
// @include       http://fotozavr.ru/image/*
// @include       http://freeimgup.com/*
// @include       http://funnypicpost.com/pics/*
// @include       http://goimagehost.com/xxx/*
// @include       http://hostingkartinok.com/show-image.php?id=*
// @include       http://hosturimage.com/img-*
// @include       http://iceimg.com/*
// @include       http://im9.eu/picture/*
// @include       http://image-upload.de/file/*
// @include       http://imagearn.com//image.php?id=*
// @include       http://imagearn.com/image.php?id=*
// @include       http://imagebunk.com/image/*
// @include       http://imagecorn.com/img-*
// @include       http://imagedecode.com/img-*
// @include       http://imageheli.com/img-*
// @include       http://imagelook.org/img-*
// @include       http://imageno.com/*.html
// @include       http://imageontime.com/img-*
// @include       http://imagepicsa.com/img-*
// @include       http://imagepix.org/image/*
// @include       http://imagepong.info/viewer.php?file=*
// @include       http://imagepool.in/share*
// @include       http://imageporn.eu/?v=*
// @include       http://imagescream.com/img/*
// @include       http://imageshost.ru/photo/*
// @include       http://imageteam.org/img-*
// @include       http://imagetwist.com/*
// @include       http://imageupper.com/i/*
// @include       http://imagezilla.net/show/*
// @include       http://img-zone.com/img-*
// @include       http://img.ly/*
// @include       http://img.spicyzilla.com/img-*
// @include       http://img.tomzone.ru/*
// @include       http://imgbin.me/view/*
// @include       http://imgbox.com/*
// @include       http://imgboxxx.com/viewer.php?file=*
// @include       http://imgcandy.net/img-*
// @include       http://imgchili.net/show/*
// @include       http://imgcorn.com/img-*
// @include       http://imgdino.com/viewer.php?file=*
// @include       http://imgdone.com/viewer.php?file=*
// @include       http://imgdope.com/viewer.php?file=*
// @include       http://imgdoze.com/share.php?id=*
// @include       http://imgearn.net/*
// @include       http://imgfap.net/img-*
// @include       http://imgfun.biz/img-*
// @include       http://imghoney.com/viewer.php?file=*
// @include       http://imgmaster.net/img-*
// @include       http://imgpaying.com/*.html
// @include       http://imgplus.info/viewer.php?file=*
// @include       http://imgproof.net/img-*
// @include       http://imgrex.com/viewer.php?file=*
// @include       http://imgrill.com/img-*
// @include       http://imgserve.net/img-*
// @include       http://imgshow.me/*
// @include       http://imgstudio.org/img-*
// @include       http://imgswift.com/*.html
// @include       http://imgtiger.com/viewer.php?file=*
// @include       http://imgtube.net/img-*
// @include       http://imgur.com/gallery/*
// @include       http://istoreimg.com/i/*
// @include       http://jpegshare.net/*.html
// @include       http://niceimage.pl/*.html
// @include       http://nudeimagehost.com/viewer.php?file=*
// @include       http://photo.nnov.org/?picid=*
// @include       http://photosex.biz/v.php?id=*
// @include       http://php-studia.ru/?v=*
// @include       http://pic-mir.ru/*
// @include       http://picbank.pl/*.html
// @include       http://piccash.net/*
// @include       http://picload.org/view/*
// @include       http://pics-money.ru/v.php?id=*
// @include       http://picszone.net/viewer.php?file=*
// @include       http://picturescream.com/?v=*
// @include       http://pictureturn.com/*.html
// @include       http://pictureupl.info/?v=*
// @include       http://pimpandhost.com/image/*
// @include       http://pixelup.net/image.html?*
// @include       http://pixelup.net/viewer.php?id=*
// @include       http://pixpal.net/*.html
// @include       http://pixup.us/img-*
// @include       http://postimg.org/image/*
// @include       http://pzy.be/v*
// @include       http://sexyimage.imagepool.in/share*
// @include       http://sharenxs.com/gallery/*
// @include       http://sharenxs.com/view/?id=*
// @include       http://sharepic.biz/show-image.php?id=*
// @include       http://sharimages.com/*
// @include       http://smages.com/?v=*
// @include       http://storeimgs.net/img-*
// @include       http://sxpics.nl/img-*
// @include       http://thro.bz/*
// @include       http://tinypic.com/view.php?pic=*
// @include       http://trikyimg.com/img-*
// @include       http://tryimg.com/?v=*
// @include       http://up-image.ru/*
// @include       http://upix.me/files*
// @include       http://uploads.ru/*
// @include       http://vfl.ru/fotos/*.html
// @include       http://www.1y9y.com/view.php?filename=*
// @include       http://www.2i.sk/*
// @include       http://www.2imgs.com/*
// @include       http://www.3intro.com/image/*
// @include       http://www.4freeimagehost.com/show.php?i=*
// @include       http://www.amateri.cz/g*/*
// @include       http://www.asan-gsm.com/picture/?v=*
// @include       http://www.bien-vue.com/view.php?filename=*
// @include       http://www.bild.me/bild.php?file=*
// @include       http://www.bilder-hochladen.net/files/*
// @include       http://www.bilder-space.de/bild-*
// @include       http://www.bilder-upload.eu/show.php?file=*
// @include       http://www.bilderhoster.net/*.html
// @include       http://www.cyberpics.net/*.html
// @include       http://www.directupload.net/file/*
// @include       http://www.dumparump.com/view.php?id=*
// @include       http://www.flickr.com/photos/*/set-*
// @include       http://www.hostimage.ru/photo/*
// @include       http://www.image-load.net/show/img/*
// @include       http://www.imagebam.com/image/*
// @include       http://www.imagefap.com/photo/*
// @include       http://www.imagefolks.com/img-*
// @include       http://www.imagefruit.com/img/*
// @include       http://www.imagehustler.com/image.php?id=*
// @include       http://www.imagesious.com/?v=*
// @include       http://www.imagesly.net/?v=*
// @include       http://www.imagesplace.net/gallery.php?entry=images/*
// @include       http://www.imgbabes.com/*.html
// @include       http://www.imgearner.com/img-*
// @include       http://www.imgflare.com/*
// @include       http://www.imghere.net/viewer.php?file=*
// @include       http://www.loaditup.de/*.html
// @include       http://www.loadpix.de/Bild_*
// @include       http://www.muratozkent.com/pictures/*
// @include       http://www.pic-upload.de/view-*
// @include       http://www.picbank.org/image/*
// @include       http://www.picshot.pl/public/view/*
// @include       http://www.pictureshack.ru/view_*
// @include       http://www.pixentral.com/show.php?picture=*
// @include       http://www.pixhost.org/show/*
// @include       http://www.pixroute.com/*.html
// @include       http://www.pixtreat.com/show.php/*
// @include       http://www.pornhome.com/*.html
// @include       http://www.public-pic.de/image/show/*
// @include       http://www.share-image.com/gallery/*
// @include       http://www.shareimages.com/image-r.php?*
// @include       http://www.stooorage.com/show/*
// @include       http://www.turboimagehost.com/p/*
// @include       http://www.uploadhouse.com/viewfile.php?id=*
// @include       http://www.urpichost.com/?v=*
// @include       http://www.use.com/*
// @include       http://www.xup.in/dl,*
// @include       http://www.zaslike.com/viewer.php?file=*
// @include       http://www.zimage.fr/photo.php?id=*
// @include       http://www.zimage.fr/taillereel.php?id=*
// @include       http://www.zimagez.com/zimage/*
// @include       http://www.zupmage.eu/image/*
// @include       http://x.thebestpichost.com/picture/*
// @include       http://xximg.net/img-*
// @include       http://xxx.image-server.ru/view.php?*
// @include       http://xxxces.com/viewer.php?file=*
// @include       http://xxxhost.me/viewer.php?file=*
// @include       http://xxxscreens.com/img-*
// @include       http://yadeller.biz/resimyolla/?pt=*
// @include       http://yankoimages.net/*
// @include       http://yehpic.com/image/*
// @include       http://youpic.ru/view.php?id=*
// @include       http://zagruzitfoto.com/*
// @include       http://zapisz.net/view.php?filename=*
// @include       http://zapodaj.net/*
// @include       http://zuly.de/image/*
// @include       https://beeimg.com/view/*
// @include       https://imageshack.com/i/*
// @include       https://www.flickr.com/photos/*/set-*
// ==/UserScript==


/* --------- Note ---------
  This script shows Just the Image on Image Hosts
  It is designed to work with JavaScript disabled.

  The image will be shown by browser using the default browser style for
  showing images and there isn't any style configuration.

  I have added most of the popular Image Hosts.
  Any request for additions (Image Hosts only, not sites) should include
  a sample link (and NSFW if applicable) and posted to the Discussions section.

  Please report dead Image Hosts (no point in running the script for them).


  --------- History ---------

  1.3 Added more Image Hosts
  1.2 Added more Image Hosts
  1.1 Code Improvement + Added more Image Hosts
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (frameElement) { return; } // end execution if in a frame/object/embedding points

var q;
var img;
var dom = location.hostname.match(/[^.]+\.[^.]+$/);
dom = dom ? dom[0] : 0;
if (!dom) { return; }  // end execution if not found


switch (dom) {

  /* ----- by id ----- */
  case '22.io':
  case '3intro.com':
  case 'addyourpics.com':
  case 'aveimage.com':
  case 'bayimg.com':
  case 'beeimg.com':
  case 'bild.me':
  case 'bilder-hochladen.net':
  case 'brightpic.tk':
  case 'chickupload.com':
  case 'depic.me':
  case 'easyimghost.com':
  case 'freeimgup.com':
  case 'goimagehost.com':
  case 'imagearn.com':
  case 'imagesious.com':
  case 'imagesly.net':
  case 'imageupper.com':
  case 'imagevenue.com':
  case 'img.ly':
  case 'imgbox.com':
  case 'imgboxxx.com':
  case 'imgchili.net':        // imgchili.com forwards to imgchili.net
  case 'imgdino.com':
  case 'imgflare.com':
  case 'istoreimg.com':
  case 'loaditup.de':
  case 'picload.org':
  case 'pictureshack.ru':
  case 'pictureturn.com':
  case 'pimpandhost.com':
  case 'pixhost.org':
  case 'pixroute.com':
  case 'pixtreat.com':
  case 'thebestpichost.com':
  case 'turboimagehost.com':
  case 'up-image.ru':
  case 'uploadhouse.com':
  case 'uploads.ru':
  case 'vfl.ru':
  case 'yankoimages.net':
  case 'yehpic.com':
  case 'zuly.de':
    q = 'img[id]';
    break;



  /* ----- mix ----- */
  case '08lkk.com':
  case 'adultur.com':
  case 'croftimage.com':
  case 'damimage.com':
  case 'imagedecode.com':
  case 'imagelook.org':
  case 'imageontime.com':
  case 'imageteam.org':
  case 'imgearner.com':
  case 'imgfap.net':
  case 'imgfun.biz':
  case 'imgproof.net':
  case 'imgserve.net':
  case 'imgstudio.org':
  case 'spicyzilla.com':
  case 'storeimgs.net':
    q = '.centred, .centred_resized';
    break;

  case 'imagetwist.com':
  case 'imgbabes.com':
  case 'imgearn.net':
  case 'imgpaying.com':
  case 'imgswift.com':
  case 'pixpal.net':
    q = '.pic';
    break;

  case 'imagescream.com':
  case 'imgshow.me':
  case 'sharimages.com':
  case 'thro.bz':
  case 'zagruzitfoto.com':    // 2 urls: http://zagruzitfoto.com/image/Pr6 & http://zagruzitfoto.com/Pr6
    if (document.URL.indexOf('zagruzitfoto.com/image/') !== -1) {
      q = 'img[id]';
      break;
    }
    q = '#shortURL-content img';
    break;

  case '4put.ru':
  case 'imagepix.org':
  case 'zimage.fr':          // 2 urls: http://www.zimage.fr/photo.php?id=186604 => http://www.zimage.fr/taillereel.php?id=186604
    if (document.URL.indexOf('zimage.fr/photo.php') !== -1) {
      img = document.URL.replace('photo.php', 'taillereel.php');
      break;
    }
    q = 'div[align="center"] img';
    break;

  case 'imageshack.com':      // imageshack.us forwards to imageshack.com
  case 'hostingkartinok.com':
    q = '.image img';
    break;

  case 'niceimage.pl':
  case 'picbank.pl':
    q = '#middle_middle img';
    break;

  case '2i.sk':
  case '2imgs.com':           // 2i.cz forwards to 2imgs.com
    q = '#wrap3 img';
    break;

  case '9foto.ru':
  case 'blackcatpix.com':
  case 'image-load.net':
  case 'photosex.biz':
  case 'pics-money.ru':
    q = 'center img';
    break;

  case 'tryimg.com':
  case 'urpichost.com':
    q = '#imagen img';
    break;

  case 'use.com':
    img = document.querySelector('#showcase');
    img = img ? img.src.replace('/s_2/', '/s_3/') : 0;
    break;

  case 'piccash.net':
    img = document.querySelector('.container img');
    img = img ? img.src.replace('/img_thumb/', '/img_full/').replace('-thumb', '') : 0;
    break;

  case 'picshot.pl':
    img = document.querySelector('#content img');
    img = img ? img.src.replace('pthumbs/large/', 'pfiles/') : 0;
    break;

  case '4freeimagehost.com': q = 'noscript img'; break;
  case 'avenuexxx.com': q = '.size-full'; break;
  case 'bilder-space.de': q = '.picture'; break;
  case 'bildr.no': q = '.bilde'; break;
  case 'cubeupload.com': q = '.galleryBigImg'; break;
  case 'dumparump.com': q = 'a[href*="random.php"] img'; break;
  case 'fotozavr.ru': q = '.avatar img'; break;
  case 'funnypicpost.com': q = 'td[align="center"] img'; break;
  case 'iceimg.com': q = '#fullimage img'; break;
  case 'im9.eu': q = '#iw img'; break;
  case 'image-server.ru': q = 'table.center img'; break;
  case 'imagefap.com': q = '#mainPhoto'; break;
  case 'imagehustler.com': q = '.boxborder img'; break;
  case 'imageno.com': q = '#image_div img'; break;
  case 'imageshost.ru': q = '#bphoto img'; break;
  case 'imgbin.me': q = '#image-container img'; break;
  case 'imgtiger.com': q = '#cursor_lupa'; break;
  case 'imgur.com': q = '#image img'; break;
  case 'jpegshare.net': q = '.view img'; break;
  case 'nixhelp.de': q = '#imageslink img'; break;
  case 'pic-upload.de': q = '.preview_picture_2b'; break;
  case 'picbank.org': q = '#img_open_window img'; break;
  case 'pixelup.net': q = '#center center img'; break;
  case 'pixentral.com': q = 'td:only-child > img'; break;
  case 'pixhub.eu': q = '.image-show img'; break; // pxhb.eu forwards to pixhub.eu
  case 'pornhome.com': q = 'td[align="center"] > a > img'; break;
  case 'postimg.org': q = 'img'; break;
  case 'public-pic.de': q = '#content_frame img'; break;
  case 'pzy.be': q = '#content img'; break;       // Adult Content Warning!
  case 'share-image.com': q = 'td[align="center"] img'; break;
  case 'shareimages.com': q = '#imageShowcase img'; break;
  case 'sharenxs.com': q = '.view_photo'; break;
  case 'sharepic.biz': q = 'a[title*="fullsize"] img'; break;
  case 'stooorage.com': q = '#page_body img'; break;
  case 'xup.in': q = '.resizeImage'; break;
  case 'youpic.ru': q = '.imgbord'; break;
  case 'zapodaj.net': q = '#foto img'; break;
  case 'zimagez.com': q = '#userPic'; break;


  /* ----- by a.href ----- */
  case 'nnov.org':            // photo.nnov.ru forwards to foto.nnov.org
    img = document.querySelector('a img.fl');
    img = img ? img.parentNode.href : 0;
    break;

  case 'cyberpics.net':
  case 'fastimages.ru':
    q = 'a.lightbox';
    break;

  case 'loadpix.de':
    q = 'a[name*="Vollbild"]';
    break;

  case 'muratozkent.com': q = '#image a'; break;
  case 'pic-mir.ru': q = 'a.full_link'; break;
  case 'tomzone.ru': q = '.img a'; break;


  /* ----- by URL ----- */
  case '1pics.ru':
  case '1y9y.com':
  case '244pix.com':
  case '4owl.info':
  case 'add-screen.com':
  case 'addpix.net':
  case 'anonpic.com':
  case 'asan-gsm.com':
  case 'b4he.com':
  case 'bien-vue.com':
  case 'bildjunkies.de':
  case 'fotoupload.ru':
  case 'imagepong.info':
  case 'imgdone.com':
  case 'imgdope.com':
  case 'imghere.net':
  case 'imghoney.com':
  case 'imgrex.com':
  case 'nudeimagehost.com':
  case 'picszone.net':
  case 'picturescream.com':
  case 'pictureupl.info':
  case 'picx.me':
  case 'smages.com':
  case 'zapisz.net':
    var str = '?v=|view-|view.php?filename=|viewer.php?file=|viewer.php?id=';
    var pat = new RegExp(escape(str), 'i');
    img = document.URL.replace(pat, 'images/');
    break;

  case '3x.ro':
  case '4ufrom.me':
  case 'xxxces.com':
  case 'xxxhost.me':
  case 'zaslike.com':
    var str = 'viewer.php?file=|download.php?file=';
    var pat = new RegExp(escape(str), 'i');
    img = document.URL.replace(pat, 'files/');
    break;

  case 'imagepool.in':
  case 'imgdoze.com':
    var str = 'share-|share.php?id=';
    var pat = new RegExp(escape(str), 'i');
    img = document.URL.replace(pat, 'image.php?id=').replace('.html', '');
    break;

  case '2tu.me': img = document.URL.replace('2tu.me/view.php?filename=', 'i.2tu.me/'); break;
  case 'abload.de': img = document.URL.replace('image.php?img=', 'img/'); break;
  case 'bilder-upload.eu': img = document.URL.replace('show.php?file=', 'upload/'); break;
  case 'hostimage.ru': img = document.URL.replace('/photo/', '/orig/'); break;
  case 'image-upload.de': img = document.URL.replace('/file/', '/image/'); break;
  case 'imagesplace.net': img = document.URL.replace('gallery.php?entry=', ''); break;
  case 'imgplus.info': img = document.URL.replace('viewer.php?file=', 'fullsize/'); break;
  case 'php-studia.ru': img = document.URL.replace('/?v=', '/?s='); break;
  case 'upix.me': img = document.URL.replace('#', ''); break;
  case 'yadeller.biz': img = document.URL.replace('?pt=', '?di='); break;


  /* ----- by script ----- */
  case 'amateri.cz':
    img = getScript(/orig_url="http:\/\/www\.amateri\.cz\/orig.php\?&img=([^"]+)"/);
    img = img ? 'http://img2.amateri.cz/users/' + img[1] : 0;
    break;


  /* ----- by meta ----- */
  case 'bilderhoster.net':
  case 'directupload.net':
  case 'flickr.com':
  case 'photobucket.com':
  case 'zupmage.eu':
    img = document.querySelector('meta[property="og:image"], meta[name="og:image"]');
    img = img ? img.getAttribute('content') : 0;console.log(img);
    break;


  /* ----- click ----- */
  case 'hosturimage.com':
  case 'imagecorn.com':
  case 'imagefolks.com':
  case 'imagepicsa.com':
  case 'img-zone.com':
  case 'imgcandy.net':
  case 'imgcorn.com':
  case 'imgrill.com':
  case 'pixup.us':
  case 'sxpics.nl':
  case 'trikyimg.com':
  case 'xximg.net':
  case 'xxxscreens.com':
  case 'dtpics.biz':
    var input = document.querySelector('.button');
    if (input) { input.click(); }
    q = '.centred, .centred_resized';
    break;

  case 'imgmaster.net':       // "http://s2.imgmaster.net/upload/big/2013/11/17/528905a5cf99c.jpg"
    var input = document.querySelector('.cti-submit');
    if (input) { input.click(); }
    q = 'img[src*="/upload/"]';
    break;


  /* ----- Click + timer ----- */
  case 'imageheli.com':
  case 'imgtube.net':
    var input = document.querySelector('#cont');
    if (input) { input.click(); }
    q = 'img[id]';
    break;


  /* ----- by cookie ----- */
  case 'imageporn.eu':        // Age Verification, only once, sets a cookie forever
    var input = document.querySelector('input[value="YES"]');
    if (input) {
      document.cookie = "AgeVerification=1; expires=Fri, 31 Dec 9999 23:59:59 GMT;";
      location.reload();
      break;
    }
    q = 'img[onclick]';
    break;


  /* ----- display in a page  ----- */
  case 'fastpic.ru':          // forwards to the HTML page
  case 'imagebam.com':        // Content-Type: "text/plain"
  case 'imagezilla.net':      // forwards to the HTML page
    makeHTML('img[id]');
    break;

  case 'imagebunk.com':       // Content-Disposition: "attachment; filename=1 (75).jpg"
    makeHTML('#img_obj_hold img');
    break;

  case 'tinypic.com':
    makeHTML('img[id]');
    break;

    case 'imagefruit.com':    // Anti-hotlinking
    makeHTML('img[id]');
    break;

}

// output
if (q) {
  var img = document.querySelector(q);
  img = img ? img.src || img.href : 0;
}
if (img) { location.replace(img); }


function escape(r) {
 return (r.replace(/[.?]/g,'\\$&'));
}


function makeHTML(q) {

  var img = document.querySelector(q);
  if (!img) { return; }  // end execution if not found

  document.documentElement.innerHTML =
  '<head>' +
  '<meta name="viewport" content="width=device-width; height=device-height;" />' +
  '<title>' + dom + '</title>' +
  '<style>body { color: #fff; margin: 0; background-color: #222; } '+
  'img { text-align: center; margin: auto; image-orientation: from-image; '+
  'position: absolute; top: 0; right: 0; bottom: 0; left: 0; max-width: 100%; max-height: 100%; }</style>' +
  '</head>' +
  '<body><img src="' + img.src + '" alt="' + img.src + '"></img></body>';
}


function getScript(pat) {

  var elem = document.scripts;
  if (!elem[0]) { return; }  // end execution if not found

  for (var i = 0, len = elem.length; i < len ; i++) {

    var m = elem[i].textContent.match(pat);
    if(m) { return m; }
  }
}


})(); // end of anonymous function
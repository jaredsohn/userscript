// ==UserScript==
// @name           Mental's Host Checker for fritchy.com
// @version        34.55
// @namespace      mental
// @description    Marks allowed & banned image & file hosts on fritchy.com
// @license	   GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://fritchy.com/*
// @include        http://*.fritchy.com/*
// @grant          none
// @icon  http://sharenxs.com/photos/2013/10/10/525637063011d/nxs-frl.jpg
// @downloadURL https://userscripts.org/scripts/source/171444.user.js
// @updateURL https://userscripts.org/scripts/source/171444.user.js
// ==/UserScript==

// allowed image hosts
var imgHosts = [
	'depic.me',
	'fapomatic.com',
	'fastpic.ru',
	'imaaage.com',
	'imagebam.com',
	'imagetwist.com',
	'imagevenue.com',
	'imagezilla.net',
	'imgbox.com',
	'nudiehost.com',
	'picszone.net',
	'pimpandhost.com',
	'pixhost.org',
	'pixroute.com',
	'postimg.org',
	'postimage.org',
	'sharenxs.com',
	'stooorage.com',
	'turboimagehost.com',
	'uploadhouse.com',
	'upmyphoto.com',
    
];

// banned image hosts
var banned_imgHosts = [

    'adultsimage.com',
    'avseesee.com',
    'http://blogspot.com',
    'buspic.com',
    'casimages.com',
    'cloudimg.net',
    'dimtus.com',
    'directupload.net',
    'dumparump.com',
    'dumppix.com',
    'ericsony.com',
    'famouscelebritiespictures.com',
    'fapoff.com',
    'filefap.com',
    'fileshared.net',
    'fotoupload.ru',
    'free-image-hosting.com',
    'gasica77pornpp.com',
    'gfycat.com',
    'gokoimage.com',
    'hostimage.ru',
    'hostingfailov.com',
    'hostingpics.net',
    'hostmypixxx.org',
    'hosturimage.com',
    'hotimg.com',
    'hqpictures.org',
    'image2share.net',
    'image2you.ru',
    'image18.org',
    'image-hoster.de',
    'imageban.ru',
    'imagebing',
    'imagebax.com',
    'image-boom.com',
    'imagebunk.com',
    'imagecarry.com',
    'imagecherry.com',
    'imagecorn.com',
    'imagedax.net',
    'imageeer.com',
    'imagefast.org',
    'imagefolks.com',
    'imagehaven.net',
    'imageheli.com',
    'imagelink.cz',
    'imagelook.org',
    'imagen69.com',
    'imagenimage.com',
    'imagenpic.com',
    'imagepicsa.com',
    'imagepix.org',
    'imageporter.com',
    'imagesadda.com',
    'imagescream.com',
    'imageshost.ru',
    'imageshack.com',
    'imageshimage.com',
    'imagesion.com',
    'imagesious.com',
    'imagesist.com',
    'imagesplace.net',
    'imagespot.org',
    'imageteam.org',
    'imageupper.com',
    'imagewaste.com',
    'imgadult.com',
    'imgah.com',
    'imgbabes.com',
    'imgbar.net',
    'imgbd.net',
    'imgcandy.net',
    'imgchili.com',
    'imgchili.net',
    'imgcloud.co',
    'imgdino.com',
    'imgdollar.com',
    'imgearn.net',
    'imgearner.com',
    'imgelite.com',
    'imgempire.com',
    'imgfap.net',
    'imgfest.com',
    'imgflare.com',
    'imggoo.com',
    'imghaven.com',
    'imgheat.com',
    'imgim.com',
    'imgimg.de',
    'imgmad.com',
    'imgmaster.net',     
    'imgnext.com',
    'imgpaying.com', 
    'imgphun.com',
    'imgpony.com',
    'imgmoney.com',
    'imgpo.st',
    'imgrex.com',
    'imgrill.com',
    'imgserve.net',
    'imgshow.com',
    'imgspice.com',
    'imgsure.com',
    'imgtab.net',
    'imgtiger.com',
    'imgur.com',
    'keezmovies',
    'kiwi.com',
    'linkbucks.com',
    'lostpic.net',
    'miragepics.com',
    'nudeshare.com',
    'paidimg.com',
    'passpix.com',
    'photobucket.com',
    'photoearn.com',
    'photosex.biz',
    'phototo.org',
    'pic2profit.com',
    'pic4you.ru',
    'pic5you.ru',
    'picbucks.com',
    'piccash.net',
    'piclambo.net',
    'picload.org',
    'piclead.com',
    'picp2.com',
    'pics-sharing.net',
    'picsee.net',
    'picstate.com',
    'picturescream.com',
    'pic-upload.de',
    'pixhost.biz',
    'pixhub.eu',
    'picsious.com',
    'pixtreat.com',
    'pixup.us',
    'pornhome.com',
    'premiumpics.net',
    'pzy.be',
    'radikal.ru',
    'sexyimg.com',
    'shotimg.net',
    'shotpix.com',
    'someimage.com',
    'spetson.com',
    'storeimgs.net',
    'subirporno.com',
    'swagirl.com',
    'sxpics.nl',
    'teenvideomegathread.com',
    'threepicture.com',
    'thumbhost.eu',
    'tnabucks.com',
    'tuspic.net',
    'ultraimg.com',
    'up4.upppic.com',
    'uploadbox.com',
    'uploadedimg.com',
    'uploadyourimages.org',
    'upix.me',
    'uppix.net',
    'vavvi.com',
    'viewcube.org',
    'wewpic.com',
    'winimg.com',
    'xlocker.net',
    'xxxupload.org',
    'yapeee.com',
    'zooomimg.com',
    
 ];
 
 // redirect image hosts
var redirect_hosts = [
    'adultsimage.com',
    'avseesee.com',
    'http://blogspot.com',
    'buspic.com',
    'casimages.com',
    'cloudimg.net',
    'dimtus.com',
    'directupload.net',
    'dumparump.com',
    'dumppix.com',
    'ericsony.com',
    'famouscelebritiespictures.com',
    'fapoff.com',
    'filefap.com',
    'fileshared.net',
    'fotoupload.ru',
    'free-image-hosting.com',
    'gasica77pornpp.com',
    'gfycat.com',
    'gokoimage.com',
    'hostimage.ru',
    'hostingfailov.com',
    'hostingpics.net',
    'hostmypixxx.org',
    'hosturimage.com',
    'hotimg.com',
    'hqpictures.org',
    'image2share.net',
    'image2you.ru',
    'image18.org',
    'image-hoster.de',
    'imageban.ru',
    'imagebing',
    'imagebax.com',
    'image-boom.com',
    'imagebunk.com',
    'imagecarry.com',
    'imagecherry.com',
    'imagecorn.com',
    'imagedax.net',
    'imageeer.com',
    'imagefast.org',
    'imagefolks.com',
    'imagehaven.net',
    'imagelink.cz',
    'imagelook.org',
    'imagen69.com',
    'imagenimage.com',
    'imagenpic.com',
    'imagepicsa.com',
    'imagepix.org',
    'imageporter.com',
    'imagesadda.com',
    'imageshost.ru',
    'imageshack.com',
    'imageshimage.com',
    'imagesion.com',
    'imagesious.com',
    'imagesist.com',
    'imagesplace.net',
    'imagespot.org',
    'imageteam.org',
    'imageupper.com',
    'imagewaste.com',
    'imgadult.com',
    'imgah.com',
    'imgbabes.com',
    'imgbar.net',
    'imgbd.net',
    'imgcandy.net',
    'imgchili.com',
    'imgchili.net',
    'imgcloud.co',
    'imgdino.com',
    'imgdollar.com',
    'imgearn.net',
    'imgelite.com',
    'imgempire.com',
    'imgfap.net',
    'imgfest.com',
    'imghaven.com',
    'imgheat.com',
    'imgim.com',
    'imgimg.de',
    'imgmad.com',
    'imgmaster.net',     
    'imgnext.com',
    'imgpaying.com',
    'imgphun.com',
    'imgpony.com',
    'imgmoney.com',
    'imgpo.st',
    'imgrex.com',
    'imgrill.com',
    'imgserve.net',
    'imgshow.com',
    'imgspice.com',
    'imgsure.com',
    'imgtab.net',
    'imgtiger.com',
    'imgur.com',
    'keezmovies',
    'kiwi.com',
    'linkbucks.com',
    'lostpic.net',
    'miragepics.com',
    'nudeshare.com',
    'paidimg.com',
    'passpix.com',
    'photobucket.com',
    'photoearn.com',
    'photosex.biz',
    'phototo.org',
    'pic2profit.com',
    'pic4you.ru',
    'pic5you.ru',
    'picbucks.com',
    'piccash.net',
    'piclambo.net',
    'picload.org',
    'piclead.com',
    'picp2.com',
    'pics-sharing.net',
    'picsee.net',
    'picstate.com',
    'picturescream.com',
    'pic-upload.de',
    'pixhost.biz',
    'pixhub.eu',
    'picsious.com',
    'pixtreat.com',
    'pixup.us',
    'pornhome.com',
    'premiumpics.net',
    'pzy.be',
    'radikal.ru',
    'sexyimg.com',
    'shotimg.net',
    'shotpix.com',
    'someimage.com',
    'spetson.com',
    'storeimgs.net',
    'subirporno.com',
    'swagirl.com',
    'sxpics.nl',
    'teenvideomegathread.com',
    'threepicture.com',
    'tnabucks.com',
    'tuspic.net',
    'up4.upppic.com',
    'uploadbox.com',
    'uploadedimg.com',
    'uploadyourimages.org',
    'upix.me',
    'uppix.net',
    'vavvi.com',
    'viewcube.org',
    'wewpic.com',
    'winimg.com',
    'xlocker.net',
    'xxxupload.org',
    'yapeee.com',
    'zooomimg.com',
];

// allowed file hosts
var fileHosts = [ 
'180upload.com',
'2downloadz.com',
'anafile.com',
'asfile.com',
'billionuploads.com',
'bitshare.com',
'catshare.net',
'clipshouse.com',
'cloudzer.net',
'clz.to',
'datafile.com',
'depfile.com',
'depositfiles.com',
'depositfiles.org',
'dfiles.eu',
'dfiles.ru',
'dollarupload.com',
'dropbox.com',
'egofiles.com',
'embedupload.com',
'exoshare.com',
'extabit.com',
'fastsonic.net',
'fboom.me',
'fiberupload.net',
'fiberupload.org',
'filedais.com',
'filedrive.com',
'filefactory.com',
'filemonkey.in',
'filepost.com',
'fileom.com',
'fileparadox.in',
'filesflash.net',
'filesflash.com',
'filesfrog.net',
'filevice.com',
'fp.io',
'fileparadox.in',
'fileswap.com',
'firedrive.com',
'freakshare.com',
'gamefront.com',
'ge.tt',
'gigapeta.com',
'goo.gl',
'henchfile.com',
'hotfile.com',
'hugefiles.net',
'jheberg.net',
'junocloud.me',
'k2s.cc',
'katzfiles.com',
'keep2s.cc',
'keep2share.cc',
'kingfiles.net',
'luckyshare.net',
'lumfile.com',
'lumfile.eu',
'lumfile.se',
'mediafire.com',
'mega.co.nz',
'megairon.net',
'megaload.it',
'megashares.com',
'mightyupload.com',
'mirrorcreator.com',
'netload.in',
'oboom.com',
'packupload.com',
'putlocker.com',
'rapidgator.net',
'rapidshare.com',
'redload.net',
'rg.to',
'rocketfile.net',
'ryushare.com',
'sanshare.com',
'secureupload.eu',
'sendmyway.com',
'share-online.biz',
'shared.com',
'sinhro.net',
'solidfiles.com',
'spaceforfiles.com',
'speedy.sh',
'storagon.com',
'terafile.co',
'ufox.com',
'ul.to',
'uloz.to',
'ultramegabit.com',
'unlimitzone.com',
'upload.ee',
'uploadable.ch',
'uploaded.net',
'uploaded.to',
'uploadhero.co',
'uploading.com',
'uploadsat.com',
'uploking.com',
'upsto.re',
'upstore.net',
'usefile.com',
'venusfile.com',
'wizzupload.com',
'yunfile.com',
'zippyshare.com',

];

// banned file hosts
var banned_fileHosts = [
    'anysend.com',
    'bit.cur.lv',
    'cashmoneyuploads',
    'downloadsafe.org',
    'dy.cx',
    'egofiles.com',
    'eufile.eu',
    'fileace',
    'filebounty',
    'filehost.ws',
    'filemad',
    'fileme',
    'filemates.com',
    'fileml.com',
    'filerack.net',
    'fileserve',
    'filesmonster.com',
    'filesmy.com',
    'filesonic',
    'getmyfile.org',
    'gigabase.com',
    'gotlinks.co',
    'hitfile.net',
    'letitbit',
    'linkbabes.com',
    'megaupload.com',
    'oron.com',
    'q.gs',
    'qube cash',
    'queenshare.com',
    'share-links.biz',
    'shareflare.net',
    'sharingmatrix.com',
    'shareloading.net',
    'speedyfiles.net',
    'st0rage.to',
    'storebit.net',
    'surefile.org',
    'turbobit.net',
    'unibytes.com',
    'upfolder.net',
    'vip-file',
    'wupload.com',
];

// mirror file hosts
var mirHosts = [
'rapidgator.net',
'rg.to',
'ul.to',
'uploaded.net',
'uploaded.to',
];

var imgAllowed = new RegExp (imgHosts.join('|').replace(/[*.]/g,'\\$&'), 'i');
var imgBanned = new RegExp (banned_imgHosts.join('|').replace(/[*.]/g,'\\$&'), 'i');

var hostAllowed = new RegExp (fileHosts.join('|').replace(/[*.]/g,'\\$&'), 'i');
var hostBanned = new RegExp (banned_fileHosts.join('|').replace(/[*.]/g,'\\$&'), 'i');
var hostredirect = new RegExp (redirect_hosts.join('|').replace(/[*.]/g,'\\$&'), 'i');
var hostmirror = new RegExp (mirHosts.join('|').replace(/[*.]/g,'\\$&'), 'i');

// set image border size type color here
var allowedImgStyle = 'border: 5px solid #008000;';
var bannedImgStyle = 'border: 4px solid #FF0000;';

// set file border-background size type color here
var allowedUrlStyle = 'border: 3px solid #008000;';
var bannedUrlStyle = 'border: 3px solid #FF0000;';
var redirectStyle = 'background-color: #FF0000; border: 2px solid #FF0000;';
var mirrorStyle = 'background-color: #DEB887; border: 3px solid #008000;';

//check images
var img = document.querySelectorAll('[id^="post_message"] img');

for (var i = 0, len = img.length; i < len; i++) {
  
  img[i].setAttribute('title', img[i].src);
  
  if (imgBanned.test(img[i].src)) {
    img[i].setAttribute('style', bannedImgStyle);
  }
  
  else if (imgAllowed.test(img[i].src)) {
    img[i].setAttribute('style', allowedImgStyle);
  } 
}

//check for redirected images
var urls = document.querySelectorAll('[id^="post_message"] a');

for (var i = 0, len = urls.length; i < len; i++) {
  
  if (hostredirect.test(urls[i].href)) {
    urls[i].setAttribute('style', redirectStyle);

  } 
}

// check file links
var urls = document.querySelectorAll('[id^="post_message"] a');

for (var i = 0, len = urls.length; i < len; i++) {
    
  // set a style for allowed/unallowed/redirect File hosts
  if (hostBanned.test(urls[i].href)) {
    urls[i].setAttribute('style', bannedUrlStyle);
  }
  if (hostmirror.test(urls[i].href)) {
    urls[i].setAttribute('style', mirrorStyle);
  }
  
  else if (hostAllowed.test(urls[i].href)) {
    urls[i].setAttribute('style', allowedUrlStyle);
  } 
}


// check file links in code
var pre = document.getElementsByTagName('pre');

if (pre[0]) {

  for (var i = 0, len = pre.length; i < len; i++) {
    
    pre[i].innerHTML = pre[i].innerHTML.replace(/https?:\/\/\S+/gi, function(m) { 
        if (hostBanned.test(m)) {
          return '<span style="' + bannedUrlStyle + '">' + m + '</span>';
        }
        if (hostmirror.test(m)) {
          return '<span style="' + mirrorStyle + '">' + m + '</span>';
        }
        else if (hostAllowed.test(m)) {
          return '<span style="' + allowedUrlStyle + '">' + m + '</span>';
        }
        return m;
      });
  }
}

/* 
// all images inside post_message_* (doesn't include signatures)
var img = document.querySelectorAll('[id^="post_message"] img');

// all images inside td class="al1" (includes signatures)
var img = document.querySelectorAll('td.alt1 img');

// all links inside post_message_* (doesn't include signatures)
var urls = document.querySelectorAll('[id^="post_message"] a');

// all links inside td class="al1" (includes signatures)
var urls = document.querySelectorAll('td.alt1 a');
 */


// ==UserScript==
// @name          Host Checker
// @namespace     erosman
// @description   Marks Allowed & Banned Image & File Hosts
// @updateURL     https://userscripts.org/scripts/source/425528.meta.js
// @downloadURL   https://userscripts.org/scripts/source/425528.user.js
// @include       http://planetsuzy.org/t*
// @include       http://*.planetsuzy.org/t*
// @include       http://planetsuzy.org/showpost.php?*
// @include       http://*.planetsuzy.org/showpost.php?*
// @include       http://planetsuzy.org/showthread.php?*
// @include       http://*.planetsuzy.org/showthread.php?*
// @grant         none
// @author        erosman
// @version       1.4
// ==/UserScript==


/* --------- Note ---------
  This script marks Allowed & Banned Image & File Hosts

  Per request:
  http://userscripts.org/topics/207263

  The script can be made to work on other sites too.

  Entries (lowercase) can be placed on 1 line or many lines
  Example:
  'domain 1',
  'domain 2',
  'domain 3',

  Or:
  'domain 1', 'domain 2', 'domain 3',
  
  Or:
  'domain 1', 'domain 2', 'domain 3', 'domain 4', 'domain 5', 'domain 6',
  'domain 7', 'domain 8', 'domain 9', 'domain 10', 'domain 11', 'domain 12',
  'domain 13', 'domain 14',
  
  Personally, I prefer single quotes but you can also use double quotes
  "domain 1", "domain 2", "domain 3",


  --------- History ---------


  1.4 Code Improvement
  1.3 Code Improvement
  1.2 Added parsing of HTML links (not text) in CODE tags
  1.1 Added Image & File Hosts Summary
  1.0 Initial release

*/



(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (frameElement) { return; } // end execution if in a frame, object or other embedding points


// allowed Image Hosts
var imgAllowed = [
  'depic.me',
  'dodaj.rs',
  'easyimghost.com',
  'fapomatic.com',
  'gfycat.com',
  'imagebam.com',
  'imagetwist.com',
  'imageupper.com',
  'imagevenue.com',
  'imagezilla.net',
  'imgbox.com',
  'pics-hosting.com',
  'pics-sharing.net',
  'picszone.net',
  'pimpandhost.com',
  'pixelup.net',
  'pixhost.org',
  'pixroute.com',
  'photosex.biz',
  'postimage.org',
  'postimg.org',
  'postxxximage.org',
  'sharenxs.com',
  'stooorage.com',
  'turboimagehost.com',
  'uploadhouse.com',
  'winimg.com',

];

// banned Image Hosts
var imgBanned = [
  'adultsimage.com',
  'binimage.org',
  'blogspot.com',
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
  'fastpic.ru',
  'filefap.com',
  'fileshared.net',
  'fotoupload.ru',
  'free-image-hosting.com',
  'galleries.bz',
  'girlscanner.com',
  'gokoimage.com',
  'hostimage.ru',
  'hostingpics.net',
  'hostmypixxx.org',
  'hosturimage.com',
  'hotimg.com',
  'hqpictures.org',
  'image2share.net',
  'image2you.ru',
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
  'imagehousing.com',
  'imagejumbo.com',
  'imagelink.cz',
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
  'imagik.fr',
  'imgadult.com',
  'imgah.com',
  'imgbabes.com',
  'imgbar.net',
  'imgbd.net',
  'imgcandy.net',
  'imgchili.com',
  'imgchili.net',
  'imgcloud.co',
  'imgcorn.com',
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
  'imgheat.com',
  'imgim.com',
  'imgimg.de',
  'imgphun.com',
  'imgmad.com',
  'imgmaster.net',
  'imgmoney.com',
  'imgnext.com',
  'imgpaying.com',
  'imgpo.st',
  'imgpony.com',
  'imgrex.com',
  'imgrill.com',
  'imgserve.net',
  'imgshow.com',
  'imgspice.com',
  'imgsure.com',
  'imgtab.net',
  'imgtiger.com',
  'imgtrick.com',
  'imgur.com',
  'kiwi.com',
  'linkbucks.com',
  'lostpic.net',
  'miragepics.com',
  'nudeshare.com',
  'paidimg.com',
  'passpix.com',
  'photobucket.com',
  'photoearn.com',
  'phototo.org',
  'pic2profit.com',
  'pic4you.ru',
  'pic5you.ru',
  'picage.ru',
  'picbucks.com',
  'piccash.net',
  'piclambo.net',
  'piclead.com',
  'picload.org',
  'picp2.com',
  'picsee.net',
  'picstate.com',
  'picturesion.com',
  'picturescream.com',
  'pic-upload.de',
  'pixhost.biz',
  'pixhub.eu',
  'picsious.com',
  'pixtreat.com',
  'pixup.us',
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
  'upix.me',
  'uploadyourimages.org',
  'uppix.net',
  'vavvi.com',
  'viewcube.org',
  'winimg.com',
  'xlocker.net',
  'xxxupload.org',
  'zooomimg.com',

];

// allowed File Hosts
var hostAllowed = [
  '1fichier.com',
  'anonfiles.com',
  'asfile.com',
  'billionuploads.com',
  'bitshare.com',
  'datafile.com',
  'depositfiles.com',
  'depositfiles.org',
  'dfiles.eu',
  'dfiles.ru',
  'extabit.com',
  'filedrive.com',
  'filefactory.com',
  'filepost.com',
  'fp.io',
  'fileswap.com',
  'firedrive.com',
  'hugefiles.net',
  'k2s.cc',
  'keep2s.cc',
  'keep2share.cc',
  'luckyshare.net',
  'lumfile.com',
  'lumfile.eu',
  'lumfile.se',
  'mediafire.com',
  'mega.co',
  'packupload.com',
  'putlocker.com',
  'rapidgator.net',
  'rg.to',
  'terafile.co',
  'ul.to',
  'ultramegabit.com',
  'uploaded.net',
  'uploaded.to',
  'uploading.com',
  'zippyshare.com',

];

// banned File Hosts
var hostBanned = [
  '****.com',
  '180upload.com',
  '4shared.com',
  'adf.ly',
  'adfoc.us',
  'airupload.com',
  'anafile.com',
  'any.gs',
  'anysend.com',
  'astrocash.org',
  'Cash4Visits.com',
  'cashmoneyuploads',
  'cloudnes.com',
  'cloudzer.net',
  'clz.to',
  'cosyupload.com',
  'crisshare.com',
  'crocko.com',
  'cxx.be',
  'depfile.com',
  'dimanachtin.com',
  'direct-download.com',
  'divshare.com',
  'dizzcloud.com',
  'dollarupload.com',
  'downloadsafe.org',
  'dropbox.com',
  'dyo.gs',
  'easy-share.com',
  'egofiles.com',
  'eufile.eu',
  'exclusivefaile.com',
  'exoshare.com',
  'expressleech.com',
  'fastsonic.net',
  'fileace',
  'filebandit.net',
  'filebounty',
  'filecloud.io',
  'filedais.com',
  'filedefend.com',
  'filehost.ws',
  'filemad',
  'filemates.com',
  'fileme',
  'fileml.com',
  'filemoney.com',
  'filemonkey.in',
  'filemonster.com',
  'fileom.com',
  'filerack.net',
  'filesflash.com',
  'filesflash.net',
  'filesmonster.com',
  'filesmy.com',
  'fileparadox.in',
  'filesega.com',
  'fileserve',
  'filesflash.com',
  'filesonic',
  'filespeedy.net',
  'filestay.com',
  'file-wire.net',
  'freakshare.com',
  'gamefront.com',
  'ge.tt',
  'getmyfile.org',
  'gigabase.com',
  'gigapeta.com',
  'go4up.com',
  'goo.gl',
  'gotlinks.co',
  'hellshare.pl',
  'henchfile.com',
  'hipfile.com',
  'hitfile.net',
  'hotfile.com',
  'katzfiles.com',
  'kingfiles.net',
  'kisaurl.com',
  'jheberg.net',
  'junocloud.me',
  'letitbit',
  'linkcrypt.ws',
  'linkads.us',
  'linkbabes.com',
  'megabitshare.com',
  'megafiles.se',
  'megairon.net',
  'megashares.com',
  'megaupload.com',
  'mightyupload.com',
  'mirrorcreator.com',
  'multiupload.nl',
  'netload.in',
  'noidol.com',
  'novafile.com',
  'okayfiles.com',
  'okfiles.net',
  'oron.com',
  'orrro.com',
  'oteupload.com',
  'posteram.ru',
  'protected.socadvnet.com',
  'q.gs',
  'qube cash',
  'queenshare.com',
  'rapidshare.com',
  'rapidstation.com',
  'redload.net',
  'rocketfile.net',
  'rodfile.com',
  'rusfolder.com',
  'ryushare.com',
  'sanshare.com',
  'secureupload.eu',
  'sendmyway.com',
  'sendspace.com',
  'sexpalace.gs',
  'share-links.biz',
  'sharecash.org',
  'shared.com',
  'shareflare.net',
  'shareloading.net',
  'share-online.biz',
  'sharingmatrix.com',
  'sinhro.net',
  'solidfiles.com',
  'spaceforfiles.com',
  'speedshare.eu',
  'speedy.sh',
  'speedyfiles.net',
  'spicyfile.com',
  'fbcdn.net',
  'st0rage.to',
  'storagon.com',
  'storebit.net',
  'superupl.com',
  'surefile.org',
  'teenvideomegathread.com',
  'tinyfileshost.com',
  'trbb.in',
  'triplextube',
  'turbobit.net',
  'turo-bit.net',
  'tusfiles.net',
  'ufox.com',
  'uloz.to',
  'uncapped-downloads.com',
  'unibytes.com',
  'unlimitzone.com',
  'upfolder.net',
  'upload.ee',
  'uploadable.ch',
  'uploadboy.com',
  'uploadhero.co',
  'uploadinc.com',
  'uploadsat.com',
  'uploadstation.com',
  'uploking.com',
  'upsto.re',
  'upstore.net',
  'uptobox.com',
  'usefile.com',
  'vidred.com',
  'vip-file',
  'vod.dz9.net',
  'wupload.com',
  'wizzupload.com',
  'xlget.com',
  'yapeee.com',
  'yunfile.com',
  'zefile.com',
  
];

/* ----- setting all styles here ----- */
// style for the images
var imgAllowedStyle = 'border: 2px solid #7fff00;';
var imgBannedStyle = 'border: 2px solid #ff8c00;';

// separte style for the links
var hostAllowedStyle = 'background-color: #7fff00;';
var hostBannedlStyle = 'background-color: #ff8c00;';


var imgArray = [];
var hostArray = [];
var pat = /[^./]+\.[^./]+(?=\/)/;
var local = location.hostname.match(/[^.]+\.[^.]+$/);
local = local ? local[0] : 'localhost';

var elem =
document.querySelectorAll('[id^="post_message"] pre, [id^="post_message"] a, [id^="post_message"] img');

for (var i = 0, len = elem .length; i < len; i++) {

  switch (elem[i].nodeName) {

    case 'PRE':
      // replace HTML links with text links in pre tags
      var a = elem[i].getElementsByTagName('a');
      if (a[0]) {
        for (var n = 0, len = a.length; n < len; n++) {
          a[n].parentNode.replaceChild(document.createTextNode(a[n].href), a[n]);
        }
      }
      // highlight text links
      elem[i].innerHTML = elem[i].innerHTML.replace(/https?:\/\/\S+/gi, function(m) {
        var dom = m.match(pat);
        dom = dom ? dom[0].toLowerCase() : 0;
        if (!dom || dom === local) { return m; }  // disregards links/Images from local domain
        hostArray[dom] = 1;                       // cache for notice display

        if (hostBanned.indexOf(dom) !== -1) {
          return '<span style="' + hostBannedlStyle + '">' + m + '</span>';
        }
        else if (hostAllowed.indexOf(dom) !== -1) {
          return '<span style="' + hostAllowedStyle + '">' + m + '</span>';
        }
        return m;
      });
      break;

    case 'A':
      var dom = elem[i].href.match(pat);
      dom = dom ? dom[0].toLowerCase() : 0;
      if (!dom || dom === local) { break; }       // disregards links/Images from local domain
      hostArray[dom] = 1;                         // cache for notice display

      if (hostBanned.indexOf(dom) !== -1) {
        elem[i].setAttribute('style', hostBannedlStyle);
      }
      else if (hostAllowed.indexOf(dom) !== -1) {
        elem[i].setAttribute('style', hostAllowedStyle);
      }
      break;

    case 'IMG':
      var dom = elem[i].src.match(pat);
      dom = dom ? dom[0].toLowerCase() : 0;
      if (!dom || dom === local) { break; }       // disregards links/Images from local domain
      imgArray[dom] = 1;                          // cache for notice display
      elem[i].title = elem[i].src;                // set the src to title for mouse-over display

      // set a style for allowed/unallowed Image hosts
      if (imgBanned.indexOf(dom) !== -1) {
        elem[i].setAttribute('style', imgBannedStyle);
      }
      else if (imgAllowed.indexOf(dom) !== -1) {
        elem[i].setAttribute('style', imgAllowedStyle);
      }
      break;
  }
}


var td = document.querySelector('td.alt1:only-child[width="100%"]');
if (!td) { return; }  // end execution if not found


var span = document.createElement('span');
span.setAttribute('style', 'color: #008;');
span.innerHTML = '<br />' +
  '<b>Image Hosts:</b> ' + (Object.keys(imgArray).join(' | ') || 'n/a') + '<br />' +
  '<b>Links:</b> ' + (Object.keys(hostArray).join(' | ') || 'n/a');
td.appendChild(span);


})(); // end of anonymous function

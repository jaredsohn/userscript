// ==UserScript==
// @name           Mental's Host Checker for planetsuzy.org
// @version        70.48
// @namespace      mental
// @description    Marks allowed & banned image & file hosts on planetsuzy.org
// @license	   GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include        http://planetsuzy.org/*
// @include        http://*.planetsuzy.org/*
// @grant          none
// @icon           http://sharenxs.com/photos/2013/10/10/52563781d358c/nxs-psl.jpg
// @downloadURL    https://userscripts.org/scripts/source/163111.user.js
// @updateURL      https://userscripts.org/scripts/source/163111.meta.js
// ==/UserScript==

(function() { 
'use strict';

if (window.self !== window.top) { return; } // end execution if in a frame

// List Of Allowed Image Hosts & Links
var imgHosts = [
  'depic.me',
  'dodaj.rs',
  'easyimghost.com',
  'egafd.com',
  'fapomatic.com',
  'gfycat.com',
  'iafd.com',
  'imagebam.com',
  'imageho.me',
  'imagetwist.com',
  'imageupper.com',
  'imagevenue.com',
  'imagezilla.net',
  'imdb.com',
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

// List Of Allowed File Hosts
var fileHosts = [  
  '1fichier.com',
  'anonfiles.com',
  'anonym.to',
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
  'fileswap.com',
  'firedrive.com',
  'fp.io',
  'hugefiles.net',
  'k2s.cc',
  'keep2s.cc',
  'keep2share.cc',
  'luckyshare.net',
  'mediafire.com',
  'mega.co',
  'packupload.com',
  'planetsuzy.org',
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

// List Of Mirror File Hosts
var mirHosts = [
'rapidgator.net',
'rg.to',
'ul.to',
'uploaded.net',
'uploaded.to',
];

var Allowed = new RegExp (imgHosts.join('|').replace(/[*.]/g,'\\$&'), 'i');
var AllowedFile = new RegExp (fileHosts.join('|').replace(/[*.]/g,'\\$&'), 'i');
var hostmirror = new RegExp (mirHosts.join('|').replace(/[*.]/g,'\\$&'), 'i');

// set image border size, type, & color here
var allowedImgStyle = 'border: 5px solid #008000;';
var bannedImgStyle = 'border: 4px solid #FF0000;';

// set file border border, background, size, type & color here
var allowedUrlStyle = 'border: 3px solid #008000;';
var bannedUrlStyle = 'border: 3px solid #FF0000;';
var redirectStyle = 'background-color: #FF0000; border: 3px solid #FF0000;';
var mirrorStyle = 'background-color: #DEB887; border: 3px solid #008000;';

var imgArray =[];
var hostArray = [];
var pat = /[^./]+\.[^./]+(?=\/)/;
var local = location.hostname;

// check all the images in the Post (not including the signature)
var img = document.querySelectorAll('[id^="post_message"] img');

for (var i = 0, len = img.length; i < len; i++) {
  
  var dom = img[i].src.match(pat)[0];
  if (local.indexOf(dom) !== -1) { continue; } // disregards links/Images from local domain
  
  imgArray[dom] = 1; // cache for notice display
  
  img[i].setAttribute('title', img[i].src); // set the src to title for mouse-over display

  // set a style for allowed/unallowed Image hosts
  if (Allowed.test(img[i].src)<=0) {
    img[i].setAttribute('style', bannedImgStyle); //images not on the allowed list will get a red border
  }
  else if (Allowed.test(img[i].src)) {
    img[i].setAttribute('style', allowedImgStyle); //images on the allowed list will get a green border
  } 
}

//Mark url links and check for redirected image hosts
var urls = document.querySelectorAll('[id^="post_message"] a');

for (var i = 0, len = urls.length; i < len; i++) {

  var dom = urls[i].href.match(pat)[0];
  if (local.indexOf(dom) !== -1) { continue; } // disregards links/Images from local domain
  
  hostArray[dom] = 1; // cache for notice display
  
  if (Allowed.test(urls[i].href)<=0) {
    urls[i].setAttribute('style', redirectStyle); // puts red underline under images redirecting to a banned image host
    }
  if (AllowedFile.test(urls[i].href)<=0) {
    urls[i].setAttribute('style', bannedUrlStyle); // puts a red box around links on banned hosts
    }
  if (AllowedFile.test(urls[i].href)) {
    urls[i].setAttribute('style', allowedUrlStyle);  // puts a green box around links on allowed hosts
    }
  if (Allowed.test(urls[i].href)) {
    urls[i].setAttribute('style', allowedUrlStyle);  // puts a green underline on pics on allowed hosts
    }
  if (hostmirror.test(urls[i].href)) {
    urls[i].setAttribute('style', mirrorStyle);  // puts a shaded background on hosts that require mirror links
    
  } 
}

// mark URLs inside CODE tags
var pre = document.getElementsByTagName('pre');

if (pre[0]) {

  for (var i = 0, len = pre.length; i < len; i++) {
  
  hostArray[dom] = 1; // cache for notice display

    // replace HTML links with text links in pre tags
    var a = pre[i].getElementsByTagName('a');
    if (a[0]) { 
      
      for (var n = 0, len = a.length; n < len; n++) {
    
        console.log(a[0].href);
        a[n].parentNode.replaceChild(document.createTextNode(a[n].href), a[n]);
      }
    }
    
    // mark text links in pre tags
    pre[i].innerHTML = pre[i].innerHTML.replace(/https?:\/\/\S+/gi, function(m) { 
      if (AllowedFile.test(m)<=0) {
        return '<span style="' + bannedUrlStyle + '">' + m + '</span>'; //puts a red box around links on banned hosts that are posted inside code tags
      }
      if (hostmirror.test(m)) {
          return '<span style="' + mirrorStyle + '">' + m + '</span>';  // puts a shaded background on hosts that require mirror links that are posted inside code tags
        }
      else if (AllowedFile.test(m)) {
        return '<span style="' + allowedUrlStyle + '">' + m + '</span>';  //puts a green box around links on allowed hosts that are posted inside code tags
      }
      return m;
    });
  }
}

var td = document.querySelector('td.alt1:only-child[width="100%"]');
if (!td) { return; }

// adds a list of all image and file hosts used on the page at the top of the page
var span = document.createElement('span');
span.setAttribute('style', 'color: #008;');
span.innerHTML = '<br />' +
  '<b>Image & File Host Links Used On This Page:</b> ' + (Object.keys(hostArray).join(' | ') || 'n/a');
td.appendChild(span);

})();

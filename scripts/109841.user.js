// ==UserScript==
// @name          Facebook Image Download Helper
// @description   Allows you to use a download manager such as DownThemAll! on Facebook image gallery pages.
// @include       https://*.facebook.com/*
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
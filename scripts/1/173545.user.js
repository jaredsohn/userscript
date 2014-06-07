// ==UserScript==
// @name        Flickr short link
// @namespace   http://d.hatena.ne.jp/MillyC/
// @description Add short url link to photostream and photo page.
// @include     http://www.flickr.com/photos/*
// @version     1.1
// @grant       GM_addStyle
// @grant       GM_setClipboard
// ==/UserScript==

GM_addStyle('

.inline-icons a.short-url-link {
  margin-left: 1em;
}

');

// photostream
var view_holder = document.getElementById('view-holder');
if (view_holder) {
  view_holder.addEventListener('mouseenter', function(event) {
    if (event.target.className == 'photo-display-item') {
      var photo = event.target,
          photo_id = (photo.dataset || {}).photoId,
          photo_icons = photo.getElementsByClassName('inline-icons')[0],
          short_link = photo.getElementsByClassName('short-url-link')[0];
      if (photo_id && photo_icons && !short_link) {
        photo_icons.appendChild( createShortLinkById(photo_id) );
      }
    }
  }, true);
} else {
  // edit photos
  var photos = document.getElementsByClassName('photo-display-item');
  for (var i = 0; i < photos.length; ++i) {
    var photo = photos[i],
        photo_id = (photo.dataset || {}).photoId,
        photo_do = photo.getElementsByClassName('Do')[0];
    if (photo_id && photo_do) {
      photo_do.appendChild( document.createTextNode(' | ') );
      photo_do.appendChild( createShortLinkById(photo_id, 'URL') );
    }
  }
}

// photo page
var stats_ul = document.getElementById('stats_ul');
if (stats_ul) {
  var last_item = stats_ul.getElementsByClassName('last')[0],
      new_item = document.createElement('li'),
      divider = stats_ul.getElementsByClassName('divider')[0].cloneNode(),
      short_url = document.getElementById('shorturl').href;
  new_item.className = 'stat-item';
  new_item.appendChild( createShortLink(short_url) );
  stats_ul.insertBefore(divider, stats_ul.firstChild);
  stats_ul.insertBefore(new_item, stats_ul.firstChild);
}

function createShortLink(url, name) {
  var short_link = document.createElement('a');
  short_link.href = url;
  short_link.textContent = name || 'ShortURL';
  short_link.title = 'Copy short URL';
  short_link.rel = 'no-lightbox';
  short_link.className = 'short-url-link';
  short_link.addEventListener('click', copyLinkCallback, false);
  return short_link;
}

function createShortLinkById(photo_id, name) {
    var short_url = 'http://flic.kr/p/' + shortenPhotoId(photo_id);
    return createShortLink(short_url, name);
}

function shortenPhotoId(photo_id) {
  var baseChars = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
      baseLen = baseChars.length,
      shorten = [];
  for (var num = photo_id; 0 < num; num = Math.floor(num / baseLen))
    shorten.push(baseChars.charAt(num % baseLen));
  return shorten.reverse().join('');
}

function copyLinkCallback(event) {
  event.preventDefault();
  event.stopPropagation();
  GM_setClipboard(event.target.href);
}
// ==UserScript==
// @name            XE (Xing Enhancements)
// @namespace       http://www.enlightened.de/xing
// @description    
// @author          Nicolai Ehemann (en@enlightened.de)
// @include         http://*.xing.com/*
// @include         https://*.xing.com/*
// @version         0.2.3
// @date            2012-03-20
// ==/UserScript==

// history
// 2011-12-21 v0.1    initial release (profile hover images)
// 2012-01-09 v0.2    remove hockey stick ads
//                    add hover also to dynamically added images
//                    add fixes for firefox
// 2012-01-10 v0.2.1  beautify image hover with white background
// 2012-03-20 v0.2.2  fix hover (new photo url added)
// 2012-03-20 v0.2.3  removed debug messages

(function() {
  var currentSrc;
  
  // react to profile hover, add big image with url from currentSrc
  document.getElementById('hovercard').addEventListener('DOMNodeInserted', function(ev) {
    if ('UL' == ev.target.nodeName) {
      var li;
      li = document.createElement('li');
      li.setAttribute('class', 'actions');
      li.style.borderBottom = '1px solid rgb(201, 201, 201)';
      li.style.marginBottom = '7px';
      li.style.paddingBottom = '7px';
      ev.target.insertBefore(li, ev.target.firstChild.nextSibling);
      li = document.createElement('li');
      img = document.createElement('img');
      img.id = 'hovercard_image';
      img.width = 140;
      img.height = 185;
      img.src = currentSrc;
      li.setAttribute('class', 'actions');
      li.style.textAlign = 'center';
      li.appendChild(img);
      ev.target.insertBefore(li, ev.target.firstChild.nextSibling);
      li = document.createElement('li');
      li.setAttribute('class', 'separator actions');
      ev.target.insertBefore(li, ev.target.firstChild.nextSibling);
    }
  });

	var strBeginsWith = function(str, begin) {
	  return begin == str.substr(0, begin.length);
	};

  // add hover event to image to copy url to currentSrc if profile photo
  var add_image_hover = function (images) {
    for (var i in images) {
      if (images[i].src &&
            (strBeginsWith(images[i].src, 'https://www.xing.com/img/users/') ||
             strBeginsWith(images[i].src, 'https://www.xing.com/pubimg/users/') ||
             strBeginsWith(images[i].src, 'https://www.xing.com/img/n/nobody'))) {
        images[i].addEventListener('mouseover', function(ev) {
          currentSrc = ev.target.src.replace(/[.][0-9]+x[0-9]+[.]/,'.').replace(/_s[0-9](,[0-9])?[.]/,'.');
        });
      }
    }
  };

  // add hover to dynamically added images
  document.addEventListener('DOMNodeInserted', function(ev) {
    if ('IMG' == ev.target.nodeName) {
      add_image_hover([ev.target]);
    } else if ('LI' == ev.target.nodeName || 'UL' == ev.target.nodeName) {
      add_image_hover(ev.target.getElementsByTagName('img'));
    }
  });
  
  // apply hover to all initial images
  add_image_hover(document.getElementsByTagName('img'));

  // remove hockey stick ads
  var ad = document.getElementById('hockey-stick');
  if (ad) {
    ad.parentNode.removeChild(ad);
  }
})();

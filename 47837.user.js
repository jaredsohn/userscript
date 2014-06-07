// ==UserScript==
// @name           Appledaily Large Photo Viewer
// @namespace      http://ellab.org/
// @version        3
// @author         angusdev
// @description    蘋果日報及壹傳媒改版後用 Flash 來顯示放大圖片，不利大家儲存和轉載。這個 script 會在版面增加一個圖示指向真正的大圖片。
// @include        http://*.nextmedia.com/template/*
// @include        http://*.nextmedia.com/realtime/*
// ==/UserScript==

/*
Author: Angus http://angusdev.mysinablog.com/
              http://angusdev.blogspot.com/
Date:   2011-04-06

Version  3  06-Apr-2011    Supports Apple Action News as well
                           Issue #5 Image link broken if large photo's file name is diff from small photo
                           Issue #26 Not working in Chrome 12
                           Issue #27 Solve the conflict of AdBlockPlus for Chrome
Version  2  06-Oct-2009    Fix as atnext changed html
Version  1  30-Apr-2009    First release
*/

(function() {

var ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAdZMTYrAfZLEfcbwccbkucbg1j4kvg5IuhJMthpQtiJ0zlI8vhKIWlJFilJJjk5x3q7JwlctoipyLkJ6IlZWVn6mMnq2an9G1pdCWvtrSttzmu9vo0deh2NjY//jJ////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADpL2qgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAABgSURBVBhXXc/XDoAgDAVQ3LgH1m3l/38SgSYI3vTlQGkDU+hFMcTHBZEZAQAdWYKUkmyoZeqjbvYZ3P7e2smdEPPQ0yKdZTuve3Ws8+nYR8coSbO41aTuoqw4b5CFX3gBZCMYX6+YEv0AAAAASUVORK5CYII=';

function makeButton(imglink) {
  var newspan = document.createElement('span');
  newspan.className = 'photoEnlarge';
  newspan.innerHTML = '<a href="' + imglink + '" target="_blank" style="margin:5px 5px 0px 0px; background-image:url(' + ICON  + ');">放大圖片</a>';

  return newspan;
}

var articleIntroPhotoBox = document.getElementById('articleIntroPhotoBox');
if (articleIntroPhotoBox) {
  var articleIntroPhoto = document.getElementById('articleIntroPhoto');
  if (articleIntroPhoto) {
    var imgSrc = articleIntroPhoto.getElementsByTagName('noscript');
    if (imgSrc) {
      imgSrc = imgSrc[0].textContent.match(/href="([^\"]*)"/);
      if (imgSrc) {
        imgSrc = imgSrc[1];
        var origButtonSpan = articleIntroPhotoBox.getElementsByTagName('SPAN')[0];
        origButtonSpan.parentNode.insertBefore(makeButton(imgSrc), origButtonSpan);
      }
    }
  }
}

var res = document.evaluate("//span[@class='photoEnlarge']/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0;i<res.snapshotLength;i++) {
  var ele = res.snapshotItem(i);
  if (ele.href.match(/javascript:photoviewer/) && ele.href.match(/\/large\//)) {
    var imglink = ele.href.match(/javascript:photoviewer\(\'([^\']+)\'/);
    if (imglink) {
      imglink = imglink[1];
      var span = ele.parentNode;
      span.parentNode.insertBefore(makeButton(imglink), span);
    }
  }
}

// fix the disappear image problem with Chrome + AdBlockPlus
var res = document.evaluate("//div[@class='articlePhotoBoxPhoto']//img[contains(@style, 'height: 0px; width: 0px;')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<res.snapshotLength; i++) {
  var ele = res.snapshotItem(i);
  ele.style.width = '';
  ele.style.height = '';
}

})();
// ==UserScript==
// @name           twilog favs
// @revision       1
// @author         KID the Euforia a.k.a. blueberrystream
// @description    twilogにふぁぼボタンを付けます
// @namespace      http://kid0725.usamimi.info
// @include        http://twilog.org/*
// @include        http*://twitter.com/intent/favorite?tweet_id=*&from=twilogfavs
// ==/UserScript==

void(function() {

if (-1 < location.href.indexOf('twitter.com/intent/favorite')) {
  byTag('form')[1].submit();
}

if (-1 < location.href.indexOf('twilog.org')) {
  /* 定数定義 */
  var TWEETS = "tl-tweet";
  var POSTED = "tl-posted";
  var INTERVAL = 1000;
  var FAV_IMAGE = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp'+
    'bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6'+
    'eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz'+
    'NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo'+
    'dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw'+
    'dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEu'+
    'MC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVz'+
    'b3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1N'+
    'Ok9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExQTQxQUNFN0NCOEMy'+
    'NEMzNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRDlEQzM2RTQ5QzkxMUUwQTJGN0YyQzFD'+
    'MzFCQjZCMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBN0E4QjY3QzQ5QzkxMUUwQTJGN0Yy'+
    'QzFDMzFCQjZCMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9z'+
    'aCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0'+
    'MDcyMDY4MTFBNDFBQ0U3Q0I4QzI0QzM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAx'+
    'MTc0MDcyMDY4MTFBNDFBQ0U3Q0I4QzI0QzM2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpS'+
    'REY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+J4Yw8gAAAUtJREFUeNqkU7Fqg2AQ'+
    'voaAIm5Cuih00jWPkAx2MvQZMkmfon0Dx9BNV99B20knIavQoUOWFtxU4qK9TxTEWtPQg/P8v7vv'+
    '/vv/u/+maRr6jyzxsW17LmbD+vabc3FhgzvW185en0AUxZehvTbB5nw+31uWRbDdUf6eQJZlR9d1'+
    '2u12BIv1XII16zMHhYIgfPJ/k+f5GmQILNbA4Ucc4sFbDhI81XVNpmmSYRikqipJktQ6UYHjOHQ6'+
    'nShN01UYhiuGt6wffQUu674sy5YEQk/uZYgjDvHgDe+gTeL7PkVRNHkvwOHvyVOX6PIZD3EcTyYA'+
    'Dn9PnuxCVVVfc7Mx9i8m2vegaRplWUae57VjDos1cPh/vIWxHI9HCoIA5WK3Q5Ikj3z+laIolwcJ'+
    '/S6K4h0XxeXeot+d3QPv5mG2gi2P7tTrcxl3xyP9LcAAsMeJjEdHuTAAAAAASUVORK5CYII=';
    var FAVED_IMAGE = 'data:image/png;base64,'+
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
      'bWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp'+
      'bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6'+
      'eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEz'+
      'NDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo'+
      'dHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw'+
      'dGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEu'+
      'MC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVz'+
      'b3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1N'+
      'Ok9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExQTQxQUNFN0NCOEMy'+
      'NEMzNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBN0E4QjY3OTQ5QzkxMUUwQTJGN0YyQzFD'+
      'MzFCQjZCMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBN0E4QjY3ODQ5QzkxMUUwQTJGN0Yy'+
      'QzFDMzFCQjZCMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9z'+
      'aCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0'+
      'MDcyMDY4MTFBNDFBQ0U3Q0I4QzI0QzM2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAx'+
      'MTc0MDcyMDY4MTFBNDFBQ0U3Q0I4QzI0QzM2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpS'+
      'REY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+H3LNnwAAAW1JREFUeNpi/P//PwNF'+
      'gJAB73YrOeCTZyKgWQFI7YfSpBvAyMQ4k1e/D0zDXAvDBA0AOZ1VxM6NhUeSAUTj8gpOAxiZGfs5'+
      'pZ0YGP68ZgDRID5WdSDnvN+jbABkBwAV2TFzSJsysnLzsAmqM7AJ68MV/np7keHX+5sM/39//fL3'+
      'x9PT///+PwQU3gAzIAHImc+nEcLAzCFMMOb+/njL8OnGGhAzEWwAIyMjyM8JjMys8/lVHBgYWXlx'+
      'R/vvzwwf7xxg+P/3d6KQ670FcAOgAZfAxMoxn1/ZCBQIWHT/Zfh49xzDv98/wJrhYQAzAATe71We'+
      'xiUqmsnGJ4Sh/9endwzfXr+eLuB0JwumhwXDkn//XzEyfgeHPkaIM/4Cy+ONRmBM+DMzfQKG1Cug'+
      'f18z/Hj3GkyD+CBxkDzBdMDI+I3h27t/DB+fMr/6/pGpEUSD+CBxgpkJGJD/geFwGxSgaOIJUPH/'+
      'hAxwICV3AgQYAHUJt8AaKIOWAAAAAElFTkSuQmCC';

  /* 共用変数定義 */
  var tweets = null;
  var posted = null;
  var current = 0;

  var ADD_FAV_BUTTON = function() {
    tweets = byClass(TWEETS);
    if (!tweets) {
      return;
    }

    for (; current < tweets.length; current++) {
      /* status idを取得する */
      posted = byClass(POSTED, tweets[current]);
      if (posted && posted.length == 1) {
        posted = posted[0];
      }
      posted = byTag('a', posted);
      if (posted && posted.length == 1) {
        posted = posted[0];
      }
      posted = posted.getAttribute('href');
      posted = posted.split('/')[5];

      /* ふぁぼリンク追加 */
      tweets[current].innerHTML += '<p style="text-align: right;"><a href="javascript:window.open(\'http://twitter.com/intent/favorite?tweet_id=' + posted + '&from=twilogfavs\', \'intent\', \'width=550,height=300,scrollbars=yes,resizable=yes,toolbar=no,location=yes\');document.getElementById(\'favs' + posted + '\').style.display=\'none\';document.getElementById(\'faved' + posted + '\').style.display=\'inline\';"><img id="favs' + posted + '"><img id="faved' + posted + '" style="display: none;"></a></p>';

      byId('favs' + posted).src = FAV_IMAGE;
      byId('faved' + posted).src = FAVED_IMAGE;
    }
  };
  setInterval(ADD_FAV_BUTTON, INTERVAL);
}

function byId(id, parent) {
  var e = parent ? parent : document;
  return e.getElementById(id);
}
function byClass(className, parent) {
  var e = parent ? parent : document;
  return e.getElementsByClassName(className);
}
function byTag(tagName, parent) {
  var e = parent ? parent : document;
  return e.getElementsByTagName(tagName);
}
function byName(name, parent) {
  var e = parent ? parent : document;
  return e.getElementsByName(name);
}

})();
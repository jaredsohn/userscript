// ==UserScript==
// @name           Legal Sounds Download Helper
// @namespace      http://d.hatena.ne.jp/bannyan/
// @description    When you face regional matter, it helps you download easily.
// @include        http://www.legalsounds.com/InspectDownloadUrlsAlbum?__key*
// ==/UserScript==

var getFiles = function() {

  const RANGE = 3;

  var isProperUrl = function(string) {
    return /^http:\/\/[^ ]*\.mp3$/.test(string);
  }

  var divs = document.evaluate(
    './/div[not (@id)]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  var cursor = 0;
  var isDone = false;

  return function() {
    if (isDone) return;
    for (var i = cursor; i < divs.snapshotLength; i++) {
      var url = divs.snapshotItem(i).textContent;
      if (isProperUrl(url)) {
        window.open(encodeURI(url), '_blank');
      }
      if (i === divs.snapshotLength - 1) {
        alert("You've successfully downloaded!!");
        isDone = true;
        break;
      } else if (i === cursor + RANGE - 1) {
        break;
      }
    }
    cursor = cursor + 3;
  }
}

var get_files = getFiles();
document.body
  .appendChild(
    update(document.createElement('input'), {
      'type'  : 'button',
      'value' : 'download files 3 by 3'
    })
  ).addEventListener('click', function() {
    get_files();
  }, false);

// update copied from LDR - Signal  (c) id:brazil
function update(obj, params) {
  if(obj.setAttribute){
    for(var key in params)
      obj.setAttribute(key, params[key]);
  } else {
    for(var key in params)
      obj[key] = params[key];
  }
  return obj;
}
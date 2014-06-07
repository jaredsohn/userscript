// ==UserScript== 
// @name           Pixiv Lazier
// @namespace      pixivlazier
// @description    Adds direct links to full-size image (arrow link beside image name), plus a list of all images on the current page in the format "numerical id/name/artist".
// @include        http://www.pixiv.net/*
// ==/UserScript==

function processImgs(event){
  var reImgHref = /\?mode\=(?:medium|big)\&illust_id/i,
    reImgUnknown = /source.pixiv.net/i,
    reImgSize = /_(?:s|m|100)\./i,
    reImgId = /(\d+)_(?:s|m|100)\./i;

  var console = document.createElement('div'),
    consoleClose = document.createElement('div');
    consoleHeader = document.createElement('div');
  console.id = 'pixiv-lazy-console';
  console.setAttribute('style','position: fixed; z-index: 1000; left: 10px; bottom: 10px; width: 180px; height: 100px; padding: 10px; background: #fff; border: 1px solid #afafaf; box-shadow: 0 0 20px #888; overflow: scroll;');

  consoleClose.setAttribute('style', 'float: right; margin: -10px -10px 0 0; cursor: pointer;');
  consoleClose.appendChild(document.createTextNode(String.fromCharCode(215)));
  consoleClose.addEventListener('click', closeConsole);
  console.appendChild(consoleClose);

  consoleHeader.setAttribute('style', 'font-weight: bold;');
  consoleHeader.appendChild(document.createTextNode('Illustrations on this page'));
  console.appendChild(consoleHeader);

  try {
    var imgs = document.getElementsByTagName('img');
    for (var i = 0, img, imgLink, imgSrc, imgContainer, linkOriginal, consoleMsg; i < imgs.length; i++) {
      img = imgs[i];

      imgLink = img;
      while (imgLink.tagName.toUpperCase() != 'A' && imgLink.parentElement) {
        imgLink = imgLink.parentElement;
      }

      if (imgLink.tagName.toUpperCase() == 'A' && !reImgUnknown.test(img.src) && reImgHref.test(imgLink.href)) {
        imgSrc = img.src.replace(reImgSize, '.');
        imgContainer = imgLink.parentNode;
        imgContainer.insertBefore(document.createTextNode(' '), imgLink.nextElementSibling);

        linkOriginal = document.createElement('a');
        linkOriginal.href = imgSrc;
        linkOriginal.target = '_blank';
        linkOriginal.appendChild(document.createTextNode('\u27bb'));
        imgContainer.insertBefore(linkOriginal, imgLink.nextElementSibling);

        consoleMsg = document.createElement('div');
        consoleMsg.appendChild(document.createTextNode(img.src.match(reImgId)[1] + '/' + img.alt));
        console.appendChild(consoleMsg);
      }
    }
  } catch (err) {
    var errorMsg = document.createElement('div');
    errorMsg.setAttribute('style', 'color: #f00; font-weight: bold;');
    errorMsg.appendChild(document.createTextNode('Pixiv Lazy encountered an error.'));
    console.insertBefore(errorMsg, console.firstElementChild.nextSibling);
  }

  document.body.appendChild(console);
}

function closeConsole() {
  document.body.removeChild(document.getElementById('pixiv-lazy-console'));
}

processImgs();
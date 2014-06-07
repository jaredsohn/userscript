// ==UserScript==
// @name           ifriends
// @namespace      ifriends
// @include        http://*.ifriends.net/*
// ==/UserScript==
allImageElements = document.getElementsByTagName('img');
allLinks = document.getElementsByTagName('a');
allDivs = document.getElementsByTagName('div');

unsafeWindow.printFrameSet= function (nothing) {};

for (i = 0; i < allLinks.length; i++){
  thisLink = allLinks[i];
  if (thisLink.className == 'anchArchiveImageHyperlink') {
    thisLink.parentNode.removeChild(thisLink);  
  }
}


for (i = 0; i < allDivs.length; i++){
  thisDiv = allDivs[i];
  if (thisDiv.className == 'io-imgArchiveInner io-textOverlay') {
    thisDiv.parentNode.removeChild(thisDiv);  
  }
}


for (i = 0; i < allImageElements.length; i++) {

    thisImageElement = allImageElements[i];
    imageLoc = thisImageElement.src;

    
    // hide the transparent cover from images
    if (thisImageElement.id == "imgArchiveImageOverlay") {
      thisImageElement.style.display = "none";
    }

    //                   proto      server   path    file   last digit
    if (imageLoc.match(/(http:\/\/)([^\/]*)\/(.*)\/([^\/]*)(\d)_12.jpg$/)) {
        down = false;
        down2 = false;
        stream = false;  // we'll use this for the home link too
        view = false;

        downloadLink = document.createElement("a");
        downloadLink.innerHTML = addStyle('flv', 0);

        down2Link = document.createElement("a");
        down2Link.innerHTML = addStyle('asf', 12);

        streamLink = document.createElement("a");
        streamLink.innerHTML = addStyle('strm', 22);

        homeLink = document.createElement("a");
        homeLink.innerHTML = addStyle('home', 78);

        viewLink = document.createElement("a");
        viewLink.innerHTML = addStyle('view', 0);
        viewLink.href = RegExp.$1 + RegExp.$2 + '/' + RegExp.$3 + '/' +
              RegExp.$4 + RegExp.$5  + '.jpg';
        viewLink.target = "_new";


        if (imageLoc.indexOf('hdlocal') != -1 ) {
          down = true;
          stream = true;
          downloadLink.href = RegExp.$1 + RegExp.$2 + '/' + RegExp.$3 + '/fcm.' + RegExp.$4 + 'pure.wmv';
          
          streamLink.href = RegExp.$1 + 'hd.ifriends.net:8080' + '/' + RegExp.$3 + '/fcm.'
                       + RegExp.$4 + '720p.wmv?MSWMExt=.asf';
          streamLink.target = '_blank';

          var chatName = RegExp.$3.substring(8);

          homeLink.href = RegExp.$1 + 'fanclubs.ifriends.net/membrg/tFCArchiveViewer.wsa?club=' +
          chatName
            +'&mode=H';
          homeLink.target = '_blank';

          // crappy hack to swap the download link to say dload instead of flv
          downloadLink.innerHTML = addStyle('dload', 0);

        }

        else if (imageLoc.indexOf('avidarchives') != -1 ) { 
          down = true;
          down2 = true
          downloadLink.href = RegExp.$1 + RegExp.$2 + '/' + RegExp.$3 + '/' + RegExp.$4 + '.flv';
          down2Link.href = RegExp.$1 + RegExp.$2 + '/' + RegExp.$3 + '/' + RegExp.$4 + '.asf';
        }

        else if (imageLoc.indexOf('aarchives') != -1 ) { 
          view = true;
        }



        // archives and replays (asf and flv links) and hd download
        if (down) {
          thisImageElement.parentNode.insertBefore(downloadLink, thisImageElement.nextSibling);
        }
        if (down2) thisImageElement.parentNode.insertBefore(down2Link, thisImageElement.nextSibling);

        // view large version of thumbnailed pics
        if (view)  thisImageElement.parentNode.insertBefore(viewLink, thisImageElement.nextSibling);

        // home link to take you to fanclub and stream links
        if (stream) thisImageElement.parentNode.insertBefore(homeLink, thisImageElement.nextSibling);
        if (stream) thisImageElement.parentNode.insertBefore(streamLink, thisImageElement.nextSibling);


        // make thumbnail rise to the top so you can right click it
        if (thisImageElement.className == 'io-imgArchiveThumbnail' ) {
          thisImageElement.style.position = 'absolute';
          thisImageElement.style.zIndex = 99;
          
        }



    }
}

function addStyle(text, offset) {
  if (offset == null) offset = 0;
  return '<div class="gs-textGraySmall" style="position: absolute; left: ' + offset + 'pt; top: -8pt;">' + text + ' </div>';
}


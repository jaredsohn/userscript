// ==UserScript==
// @id             ober
// @name           ober
// @version        0.1.1
// @namespace      
// @author         dbsr
// @description    Unrestricts and plays video files hosted on sites supported by real-debrid
// @updateURL 
// @downloadURL 
// @description
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @run-at         document-end
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==

var  REAL_DEBRID_REGEX = '1fichier.com|1st-files.com|2shared.com|4shared.com|aetv.com' +
      '|bayfiles.com|bitshare.com|canalplus.fr|cbs.com|cloudzer.net|crocko.com' +
      '|cwtv.com|dailymotion.com|dengee.net|depfile.com|dizzcloud.com|dl.free.fr' +
      '|extmatrix.com|filebox.com|filecloud.io|filefactory.com|fileflyer.com' +
      '|fileover.net|filepost.com|filerio.com|filesabc.com|filesend.net|filesflash.co' +
      '|filesmonster.com|freakshare.net|gigasize.com|hipfile.com|hotfile.co' +
      '|hugefiles.net|hulkshare.com|hulu.com|jumbofiles.com|justin.tv|keep2share.c' +
      '|letitbit.net|load.to|mediafire.com|mega.co.nz|megashares.com|mixturevideo.co' +
      '|netload.in|nowdownload.eu|nowvideo.eu|purevid.com|putlocker.com|rapidgator.ne' +
      '|rapidshare.com|redtube.com|rutube.ru|scribd.com|sendspace.com|share-online.bi' +
      '|sharefiles.co|shareflare.net|slingfile.com|sockshare.com|soundcloud.co' +
      '|speedyshare.com|turbobit.net|ultramegabit.com|unibytes.co' +
      '|uploaded.to|uploaded.net|ul.to|uploadhero.co|uploading.com|uptobox.co' +
      '|userporn.com|veevr.com|vimeo.com|vip-file.com|wat.tv|youporn.com|youtube.com';
    STYLESHEET  =
      '.ober-icon { display: inline-block; width: 1em; height: 1em;}' +
      '.icon-unresolved { background-color: grey; }' +
      '.icon-resolving { background-color: orange; }' +
      '.icon-failed { background-color: red; }' +
      '.icon-ok { background-color: green; }' +
      '#ober-video-modal {' +
        'position: absolute; left: 25%; top: 5%; width: 840px; height: 720px;' +
        'text-align: center; z-index: 1000; background-color: white;' +
        'text-align: center; padding: 10%;' +
      '}';
    HOSTER_FILTER_IDS = '23,99,15,24,13,22,27,25,8,28,2,40,11,46,47,51,55,59,60,64,65,67,68,70,71,81,92,97,102';


$(function() {
  GM_addStyle(STYLESHEET);
  if(window.location.host === 'www.filestube.com' && window.location.href.match(/query/)) {
    doFilesTube();
  } else {
    addIcons();
  }
});

function addIcons() {
  var rgx = new RegExp(REAL_DEBRID_REGEX);
  $.each($('a'), function(id_idx, a) {
   if(rgx.test(a.href)) {
     addIcon(a, function(icon) {
       a = icon.previousSibling;
       resolve(a.href, icon);
     });
   }
  });
}

function addIcon(a, onclick) {
  icon = document.createElement('a');
  icon.className = 'ober-icon';
  icon.title = 'watch on ober';
  styleIcon(icon, 'unresolved');
  $(icon).click(function(event) {
      event.preventDefault();
      icon = event.target;
      $(icon).unbind('click');
      onclick(icon);
  });
  $(icon).insertAfter(a);
}

function styleIcon(icon, rstatus) {
  icon.setAttribute('class', 'ober-icon icon-' + rstatus);
}

function resolve(link, icon) {
  styleIcon(icon, 'resolving');
  unrestrict(link, function(resp) {
    if(resp.error === 0) {
      $(icon).click(function(event) {
        event.preventDefault();
        launchPlayer(resp.main_link);
      });
      styleIcon(icon, 'ok');
    } else {
      styleIcon(icon, 'failed');
    }
  });
}

function unrestrict(host_link, cb) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://real-debrid.com/ajax/unrestrict.php?link=' + host_link,
    headers: {'Referer': 'http://real-debrid.com/download'},
    onload: function(data) {
      if(data.statusText === 'OK') {
        json_resp = JSON.parse(data.responseText);
        cb(json_resp);
      } else {
        console.error('error xmlrequest %o', data);
      }
    }
  });
}

function launchPlayer(video_link) {
  ext = video_link.split('.').pop();
  link = document.createElement('link');
  link.setAttribute('href', 'http://vjs.zencdn.net/c/video-js.css');
  link.setAttribute('rel', 'stylesheet');
  video_modal = document.createElement('div');
  video_modal.setAttribute('id', 'ober-video-modal');
  video = document.createElement('video');
  video.setAttribute('id', 'video');
  video.setAttribute('class', 'video-js vjs-default-skin');
  video.setAttribute('width', '800');
  video.setAttribute('height', '600');
  video.setAttribute('controls', 'auto');
  close = document.createElement('a');
  $(close).html('X');
  $(close).click(function(event) {
    event.preventDefault();
    $('#ober-video-modal').remove();
  });
  video_modal.appendChild(close);
  video_modal.appendChild(link);
  video_modal.appendChild(video);
  document.body.appendChild(video_modal);
  $.getScript('http://vjs.zencdn.net/c/video.js', function() {
      _V_('video').ready(function() {
        player = this;
        player.src(video_link);
        player.play();
      });
  });
}

function doFilesTube() {
  url = location.href;
  if(!url.match(/z=_/)) {
    if(url.match(/hosting=/)) {
      new_url = url.replace("hosting=", "hosting=" + HOSTER_FILTER_IDS);
    } else {
      new_url = url + "&hosting=" + HOSTER_FILTER_IDS;
    }
    window.location.href = new_url + "&z=_";
  }
  modLinks();
}

function modLinks() {
  rgx = /http.*(?!http)/g;
  $.each($('div#newresult'), function(i, result) {
    resultLink = $('a.resultsLink', result);
    addIcon(resultLink, function(icon) {
      a = icon.previousSibling;
      $.get(a.href, function(data) {
        pre = $('pre', data);
        links = pre.text().match(rgx);
        link = links[0];
        resolve(link, icon);
      });
    });
  });
}

// ==UserScript==
// @name           nicovideo Show Uploader Name
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    Show Uploader Names at nicovideo's pages.
// @include        http://www.nicovideo.jp/*
// @require        http://mfp.xrea.jp/misc/greasemonkey/lib/nicovideoInfoInserter/nvii_20090510.js
// ==/UserScript==

const WAITING_TIME = 500;
const LINK_TO_NICOCHART = true;



String.decodeEntityReference = new function() {
  var span = document.createElement('span');
  return function(s) {
    span.innerHTML = s;
    return span.textContent;
  };
};
String.prototype.decodeEntityReference = function() {
  return String.decodeEntityReference(this);
};



Array.prototype.applyAll = function() {
  var self = this, arg = arguments;
  this.forEach(function(f) { f.apply(self, arg); });
};



var userNames = {};
var handlers = {};
var waiting_count = 0;
function getUserName(video_id, onstart, onload) {
  // 取得済み
  if(video_id in userNames) {
    onload(userNames[video_id]);
    return;
  }
  // 取得中 (waiting or loading)
  if(video_id in handlers) {
    handlers[video_id].onstart.push(onstart);
    handlers[video_id].onload.push(onload);
    return;
  }

  handlers[video_id] = {
    onstart: [onstart],
    onload: [onload],
    ontimeout: function() {
      waiting_count--;
      handlers[video_id].onstart.applyAll();
      GM_xmlhttpRequest(
        {
          method: 'GET',
          headers: {
            'User-Agent':
            'Mozilla/5.0 Greasemonkey; nicovideo Show Uploader Name'
          },
          url: 'http://www.smilevideo.jp/view/' +
            video_id.replace(/^[a-z]{2}/, ''),
          onload: function(response) {
            if(!/<strong>([^<]+?)<\/strong> が投稿した動画を/
               .test(response.responseText)) {
              handlers[video_id].onload.applyAll(undefined);
              return;
            }
            var name = RegExp.$1.decodeEntityReference();
            userNames[video_id] = name;
            handlers[video_id].onload.applyAll(name);
            delete handlers[video_id];
          },
          onerror: function() {
            handlers[video_id].onload.applyAll(undefined);
          }
        });
    }
  };

  // 将来的に拡張するかも
  // 選択した動画の投稿者名を優先的に読み込むとか，画面内の動画を優先的に読み込むとか
  handlers[video_id].timer = setTimeout(
    handlers[video_id].ontimeout,
    waiting_count * WAITING_TIME
  );
  waiting_count++;
}


function createLink(url) {
  if(url === undefined || !url.match(/watch\/(\w\w\d+)/))
    return null;

  var video_id = RegExp.$1;

  var loading = document.createElement('span');
  loading.textContent = 'waiting...';

  var span = document.createElement('span');
  span.textContent = 'up: ';
  span.appendChild(loading);

  getUserName(
    video_id,
    function() {
      loading.textContent = 'loading...';
    },
    function(username) {
      if(username === undefined) {
        loading.textContent = 'Not Found.';
        return;
      }
      var strong = document.createElement('strong');
      strong.textContent = username;

      if(LINK_TO_NICOCHART) {
        var link = document.createElement('a');
        link.href = 'http://www.nicochart.jp/name/' + encodeURI(username);
        link.appendChild(strong.firstChild);
        strong.appendChild(link);
      }
      span.replaceChild(strong, loading);
    }
  );

  return span;
}



with(NicovideoInfoInserter) {
  addInsertHandler(
    createLink,
    PageType.ANY_PAGE,
    PointType.AROUND_MOVIE ^ PointType.AROUND_THUMB
      | PointType.THUMB_2COL_TOP | PointType.THUMB_4COL_BEFORE_LINK
  );
}
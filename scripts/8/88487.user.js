// ==UserScript==
// @name           NicoAds Tab
// @namespace      http://mfp.xrea.jp/
// @description    ニコニコ動画の watch ページに広告履歴のタブを表示する
// @include        http://www.nicovideo.jp/watch/*
// @require        https://gist.github.com/raw/636265/8ed87ee31fe99a9bf06ac89692234280e0ffd9c0/nicovideo_createPanel.js
// ==/UserScript==

function getCounter(div) {
  let range = document.createRange();
  range.setStartBefore(
    div.querySelector('#video-info-cnt > .video-ads-info'));
  let sponsor = div.querySelector('#sponsor');
  if (sponsor === null) {
    let img = div.querySelector('img[alt^="Lv"]');
    if (img === null) throw 'exit';
    range.setEndAfter(img);
  } else {
    range.setEndAfter(sponsor);
  }

  let div = document.createElement('div');
  div.id = 'gm-nicoads-tab-counter';
  div.appendChild(range.cloneContents());
  return div;
}


function addStyle() {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'http://uad.nicovideo.jp/assets/css/ads.css';
  document.querySelector('head').appendChild(link);

  GM_addStyle(<><![CDATA[
    #itab_nicoads { font-size: 12px; padding: 4px; }
    #gm-nicoads-tab-counter > br { display: none; }
      .video-ads-info{ margin-right: 5px; }
    #sponsor { display: inline; margin: 0 5px; }
    #sponsor img { margin-right:5px; vertical-align: -3px; }
    #ads-history { margin-top:4px; }
    #itab_nicoads table { border-collapse: collapse; }
    #ads-history-cnt { overflow: auto; }
  ]]></>.toString());
}


(function main() {
  let video_id = unsafeWindow.Video.id;
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://uad.nicovideo.jp/ads/?vid=' + video_id,
    headers: {
      'User-Agent': 'Mozilla/5.0 Greasemonkey; NicoAds Tab'
    },
    onload: function(data) {
      if (data.status !== 200) return;

      let match = data.responseText.match(/<body>([\s\S]+)<\/body>/);
      let div = document.createElement('div');
      div.innerHTML = match[0];

      Array.forEach(
        div.querySelectorAll('*[src]'),
        function(e) e.src = 'http://uad.nicovideo.jp/' + e.getAttribute('src'));

      let count = div.querySelector('#ads-history-cnt td.no');
      if (count == null) return;
      let { panel } = nicovideo_createPanel(
        'nicoads', 'ニコニ広告 (' + count.textContent + ')');

      function append(elem) {
        if (elem !== null) panel.appendChild(elem);
      }

      append(getCounter(div));
      append(div.querySelector('#ads-history'));
      append(div.querySelector('#ads-tag'));
      append(div.querySelector('#ads-nicotop'));
      addStyle();
    }
  });
})();

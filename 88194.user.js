// ==UserScript==
// @name           Nicopedia Tab
// @namespace      http://mfp.xrea.jp/
// @description    ニコニコ動画の watch ページに大百科のタブを表示する
// @include        http://www.nicovideo.jp/watch/*
// @require        https://gist.github.com/raw/636215/a73e4ea2061f54454b80b671ec12ba3b1beaee3d/toDOM.js
// @require        https://gist.github.com/raw/636265/8ed87ee31fe99a9bf06ac89692234280e0ffd9c0/nicovideo_createPanel.js
// ==/UserScript==

(function main() {
  let video_id = unsafeWindow.Video.id;
  unsafeWindow.Nicopedia.Article.get(video_id, 'v').loadSummary(
    function(data) {
      if (!data.written) return;
      let { panel } = nicovideo_createPanel('nicopedia', 'ニコニコ大百科');

      let p = <p class="font12" style="padding: 4px;">
        {data.summary}...&#xa0;
        <a href={data.getURL()} target="_blank">&gt;&gt;続きを読む</a>
      </p>.toDOM();
      panel.appendChild(p);
    });
})();

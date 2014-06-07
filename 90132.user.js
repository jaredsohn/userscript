// ==UserScript==
// @name           NicoFilter Tab
// @namespace      http://mfp.xrea.jp/
// @description    ニコニコ動画の watch ページに投稿者フィルターを表示する
// @include        http://www.nicovideo.jp/watch/*
// @require        https://gist.github.com/raw/636265/8ed87ee31fe99a9bf06ac89692234280e0ffd9c0/nicovideo_createPanel.js
// @require        https://gist.github.com/raw/670311/35a170dc3deaf3a863dfb0cd23e8b51509266c77/nicovideo_getFlv.js
// ==/UserScript==

const STYLE = <><![CDATA[
  #GM_NicoFilterTab_Table {
    font-size: 12px;
    border-collapse: collapse;
    margin: auto auto;
    border: 1px solid black;
  }
  #GM_NicoFilterTab_Table td, #GM_NicoFilterTab_Table th {
    border: 1px solid black;
    padding: 3px;
  }
  #GM_NicoFilterTab_Table th {
    text-align: center;
    background-color: #7db1e0;
  }
  #GM_NicoFilterTab_Table > tbody > tr:nth-child(even) {
    background-color: #ececec;
  }
  #GM_NicoFilterTab_Table > tbody > tr:hover {
    background-color: #ccc;
  }
]]></>.toString();

(function main() {
  const videoID = unsafeWindow.Video.id;

  nicovideo_getFlv(videoID, function(obj) {
    if (obj.ng_up === undefined || obj.ng_up.length === 0)
      return;

    let filter = obj.ng_up;
    let { panel } = nicovideo_createPanel(
      'filter', 'フィルタ(' + filter.length + ')');

    GM_addStyle(STYLE);
    let table = document.createElement('table');
    table.innerHTML = '<thead><tr><th>変換前</th><th>変換後</th><th>全置換</th></tr></thead>';
    let tbody = document.createElement('tbody');
    filter.forEach(function([before, after, replaceAll]) {
      let tr = document.createElement('tr');
      let td1 = document.createElement('td');
      td1.textContent = before;
      let td2 = document.createElement('td');
      td2.textContent = after;
      let td3 = document.createElement('td');
      td3.textContent = replaceAll ? '*' : '';
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    table.id = 'GM_NicoFilterTab_Table';
    panel.appendChild(table);
  });
})();
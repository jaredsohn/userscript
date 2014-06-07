// ==UserScript==
// @name           Add Mylist Link
// @author         favril
// @namespace      http://script41self.seesaa.net/
// @description    ニコニコ動画のメニューバーに、mylistへのリンクを追加するスクリプト
// @version        0.1.5
// @include        http://www.nicovideo.jp/*
// ==/UserScript==

(function(){
  // mylistをげっとする
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.nicovideo.jp/mylist_add/video/sm9', // 無くならないであろう動画
    headers: { 'User-Agent': 'Mozilla/5.0 Greasemonkey (Add Mylist Linker)' },
    onload: function(res){
      var html = res.responseText.replace(/[\r\n]/g, '');
      if (!html.match(/<optgroup.+?>(.+?)<\/optgroup>/)) return;

      var optgroup = RegExp.$1;
      if(optgroup.indexOf('option') == -1) return; // mylist無し
      
      // create
      var slct = document.createElement('select');
      slct.style.fontSize = '12px';
      slct.style.width = '80px';
      slct.addEventListener('change', function(){
        var idx = this.selectedIndex;
        if (idx) {
          location.href = '/my/mylist#/' + this.options[idx].value;
        }
      }, false);
      var opt = document.createElement('option');
      opt.value = '';
      opt.innerHTML = '--mylist--';
      slct.appendChild(opt);
      
      var list = optgroup.match(/<option.+?<\/option>/g);
      for(var i=0; i<list.length; i++){
        list[i].match(/value="(.+?)">(.+?)</);
        
        opt = document.createElement('option');
        opt.value     = RegExp.$1;
        opt.innerHTML = RegExp.$2;
        slct.appendChild(opt);
      }
      
      
      // 挿入位置探し
//      var inpos = document.evaluate('id("PAGEHEADMENU")//table[@class="headmenu"]', document, null, 7, null);
//          inpos = inpos.snapshotItem(1).getElementsByTagName('td')[2].getElementsByTagName('a')[0];
      var inpos = document.getElementById('menu-ranking');
      
      
      // 挿入
//      inpos.parentNode.insertBefore(slct, inpos);
//      inpos.parentNode.insertBefore(document.createTextNode(" | "), inpos);
      inpos.parentNode.insertBefore(slct, inpos.nextSibling);
      inpos.parentNode.insertBefore(document.createTextNode(" | "), inpos.nextSibling);
    },
    onerror: function(res){ GM_log(res.status + ":" + res.statusText); }
  });
})();
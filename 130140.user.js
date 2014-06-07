// ==UserScript==
// @name            txtrdr
// @namespace       http://www5.pf-x.net/~wannabees/cgi-bin/upload/upload.html
// @description     txtファイルを縦書きで読めるようにします
// @include         http://www5.pf-x.net/~wannabees/cgi-bin/upload/src/*.txt*
// @grant           GM_addStyle
// @require         http://nehan.googlecode.com/hg/nehan2-min.js
// @version         0.5.0
// ==/UserScript==

GM_addStyle([
  '* { margin: 0; padding: 0; }',
  'body { background-color: #fdf6e3; font-family: "IPA明朝", "IPAMincho", serif; }',
  'img:-moz-loading { visibility: hidden; }',
  '#container { width: 100%; height: 100%; overflow: hidden; }',
  '#right { display: inline-table; float: right; width: 50%; height: 100%; }',
  '#left { display: inline-table; float: left; width: 50%; height: 100%; }',
  '.page { display: table-cell; vertical-align: middle; }',
  '#right .page { border-left: 1px solid #eee8d5; }',
  '.nehan-page { cursor: default; -moz-user-select: none; }',
  '#right .nehan-page { float: left !important; }',
  '.pagenum { position: absolute; bottom: 10px; font-style: italic; }',
  '#right .pagenum { right: 15px; }',
  '#left .pagenum { left: 15px; }',
  '.nehan-vertical-text-line:hover { background-color: #eee8d5; }'
].join(''));

var txtrdr = {
  // config
  cols: 42,
  lines: 17,
  lineoffset: 1.75, // >= 1.0
  rubyWord: '\\w+|[０-９Ａ-Ｚａ-ｚ]+|[ぁ-ん]+|[ァ-ン]+|[々〇ヶ㐀-龠豈-頻]+',

  init: function() { //{{{1
    this.writing = false;

    if (window.history.state) {
      this.pageNo = window.history.state;
    } else if (document.location.hash) {
      this.pageNo = parseInt(document.location.hash.replace(/\D/g, '')) - 1;
      if (this.pageNo <= 0) this.pageNo = -1;
    } else {
      this.pageNo = -1;
    }

    // txtデータをロード
    var pre = document.getElementsByTagName('pre')[0];
    this.text = pre.innerHTML;
    pre.parentNode.removeChild(pre);

    this.title = decodeURIComponent(location.pathname.replace(/^.*\//, ''));

    this.text = this.text
        .replace(/^\n+/, '')
        .replace(/&lt;/g, '＜')
        .replace(/&gt;/g, '＞');

    // “”を〝〟に変換する (見やすさ対策)
    this.text = this.text
        .replace(/[“”]([^\n]+?)”/g, '〝$1〟')
        .replace(/"([^\n]+?)"/g, '〝$1〟');

    // 字下げ補正
    //this.text = this.text.replace(/(^|\n)(?![\n 　｢「『（〝―]|$)/g, '$1　');

    if (/《[ぁ-ん]+|[ァ-ン]+》/.test(this.text)) {
      // 《》で囲まれた文字をルビに変換 (青空文庫形式)
      var re = new RegExp('(｜.+?|' + this.rubyWord + ')《(.+?)》' , 'g');
      this.text = this.text.replace(re, function(m, rb, rt) {
        rb = rb.replace(/^｜/, '');
        rt = rt.replace(/ー/g, '｜');
        return '<ruby><rb>' + rb + '</rb><rt>' + rt + '</rt></ruby>';
      });
    } else {
      // 傍点
      this.text = this.text.replace(
          /([^\n]+?)[(（]([、﹅﹆・]+)[)）]/g, function(m, rb, rt) {
            return rb.slice(0, - rt.length) + '<ruby><rb>' +
                   rb.slice(- rt.length) + '</rb><rt>' +
                   rt.replace(/[、﹅]/g, '﹅　') + '</rt></ruby>';
          });

      // （）で囲まれた仮名をルビに変換
      var re = new RegExp('(' + this.rubyWord +
                          ')[(（](?:ルビ:)?([\s　・ぁ-んァ-ヶー]+)[)）]', 'g');
      this.text = this.text.replace(re, function(m, rb, rt) {
        rt = rt.replace(/ー/g, '｜');
        return '<ruby><rb>' + rb + '</rb><rt>' + rt + '</rt></ruby>';
      });
    }

    // 改ページの判別
    this.text = this.text.replace(/(?:[\s　]*\n){4,}/g, '\n<end-page>\n');

    // !!, !?, ...を縦中横にする
    this.text = this.text
        .replace(/！！/g, '<pack>!!</pack>')
        .replace(/！？/g, '<pack>!?</pack>')
        .replace(/？！|\?!/g, '<pack>?!</pack>');

    // 行頭の「, 『, （, ...を不可視文字で半角1文字分字下げする
    this.text = this.text
        .replace(/(^|\n)(?=[＜「『（])/g, '$1<font color="#ffffff">[</font>');

    // ページ要素の生成
    this.container = document.createElement('div');
    this.container.id = 'container';

    var rContainer = document.createElement('div');
    rContainer.id = 'right';
    rContainer.addEventListener('click', function() { txtrdr.prev(); });
    var lContainer = document.createElement('div');
    lContainer.id = 'left';
    lContainer.addEventListener('click', function() { txtrdr.next(); });

    this.pageR = document.createElement('div');
    this.pageR.className = 'page';
    //this.pageR.addEventListener('click', function() { txtrdr.prev(); });
    this.pagenumR = document.createElement('div');
    this.pagenumR.className = 'pagenum';
    this.pageL = document.createElement('div');
    this.pageL.className = 'page';
    //this.pageL.addEventListener('click', function() { txtrdr.next(); });
    this.pagenumL = document.createElement('div');
    this.pagenumL.className = 'pagenum';

    rContainer.appendChild(this.pageR);
    rContainer.appendChild(this.pagenumR);
    lContainer.appendChild(this.pagenumL);
    lContainer.appendChild(this.pageL);
    this.container.appendChild(rContainer);
    this.container.appendChild(lContainer);

    this.redraw();
    document.body.appendChild(this.container);

    window.addEventListener('resize', function() { txtrdr.redraw(); });
    window.addEventListener('keydown', function(e) {
      txtrdr.keydown(e);
    }, false);
    //window.addEventListener('DOMMouseScroll', function(e){
    //  txtrdr.wheel(e);
    //}, false);
  },

  jump: function(pageNo) { //{{{1
    if (1 > pageNo && pageNo > 0) {
      var spos = Math.floor(
          this.pp.lexer.getStream().getText().length * pageNo);
      pageNo = this.pp.getPageNoFromSeekPos(spos);
      while (spos > this.pp.getPageHeadPos(pageNo).spos) {
        this.pp.outputPage(pageNo++);
      }
    } else {
      for (var i = this.pp.cache.length; i < pageNo; i++) {
        if (this.pp.isEnablePage(i)) {
          this.pp.outputPage(i);
        } else {
          pageNo = i - 1;
          break;
        }
      }
    }

    if (pageNo % 2 == 0) pageNo--;

    if (!this.writing) {
      this.pageNo = pageNo
      this.write(this.pageNo);
    }
  },

  next: function() { //{{{1
    if (!this.writing && this.pp.isEnablePage(this.pageNo + 2)) {
      this.write(this.pageNo += 2);
    }
  },

  prev: function() { //{{{1
    if (!this.writing && this.pageNo > 0) {
      this.write(this.pageNo -= 2);
    }
  },

  keydown: function(e) { //{{{1
    if (e.shiftKey || e.altKey || e.metaKey) return;
    var keyCode = e.which;

    switch (keyCode) {
      case 32:    // Space
      case 37:    // ←
      case 78:    // n
        this.next();
        break;
      case 39:    // →
      case 80:    // p
        this.prev();
        break;
      case 74:    // j
        var pageNo = parseInt(window.prompt(
            'ジャンプするページ番号を指定 [1～]', this.pageNo + 1));
        if (0 < pageNo) {
          this.jump(pageNo - 1);
        }
        break;
      case 48:    // 0
        this.jump(0);
        break;
      case 49:    // 1
        this.jump(0.11);
        break;
      case 50:    // 2
        this.jump(0.22);
        break;
      case 51:    // 3
        this.jump(0.33);
        break;
      case 52:    // 4
        this.jump(0.44);
        break;
      case 53:    // 5
        this.jump(0.55);
        break;
      case 54:    // 6
        this.jump(0.66);
        break;
      case 55:    // 7
        this.jump(0.77);
        break;
      case 56:    // 8
        this.jump(0.88);
        break;
      case 57:    // 9
        this.jump(0.99);
        break;
    }
  },

  wheel: function(e) { //{{{1
    if (e.detail > 0) {
      this.next();
    } else {
      this.prev();
    }
    event.returnValue = false;
  },

  redraw: function() { //{{{1
    var fontSize = Math.floor(Math.min(
        (document.body.clientHeight - 25) / this.cols,
        (document.body.clientWidth - 80) / (this.lines * this.lineoffset * 2)));

    var pageHeight = fontSize * this.cols;
    var pageWidth = Math.floor(fontSize * this.lines * this.lineoffset);

    this.pageR.style.height = pageHeight + 'px';
    this.pageR.style.width = pageWidth + 'px';
    this.pageR.style.paddingLeft = fontSize * (this.lineoffset - 0.5) + 'px';
    this.pagenumR.style.fontSize = fontSize - 4 + 'px';

    this.pageL.style.height = pageHeight + 'px';
    this.pageL.style.width = pageWidth + 'px';
    this.pageL.style.paddingRight = fontSize / 2 + 'px';
    this.pageL.style.paddingLeft = fontSize * (this.lineoffset - 1.5) + 'px';
    this.pagenumL.style.fontSize = fontSize - 4 + 'px';

    if (this.pp) {
      var spos = (this.pageNo > 0) ?
                 this.pp.getPageHeadPos(this.pageNo).spos :
                 0;
      this.pp.reset({
        height: pageHeight,
        width: pageWidth,
        fontSize: fontSize,
        nextLineOffsetRate: this.lineoffset
      });
      var pageNo = this.pp.getPageNoFromSeekPos(spos);
      while (spos > this.pp.getPageHeadPos(pageNo).spos) {
        this.pp.outputPage(pageNo++);
      }
      this.jump(pageNo);
    }
    else {
      this.pp = new Nehan.PageProvider({
        height: pageHeight,
        width: pageWidth,
        fontSize: fontSize,
        nextLineOffsetRate: this.lineoffset
      }, this.text);
      this.jump(this.pageNo);
    }
  },

  write: function(pageNo) { //{{{1
    this.writing = true;

    if (pageNo < 0) {
      this.pagenumR.innerHTML = '';
      this.pageR.innerHTML = this.title;
    }
    else {
      this.pagenumR.innerHTML = pageNo + 1;
      var page = this.pp.outputPage(pageNo);
      this.pageR.innerHTML = page.html;
    }

    this.pagenumL.innerHTML = pageNo + 2;
    var page = this.pp.outputPage(pageNo + 1);
    this.pageL.innerHTML = page.html;

    document.title = this.title + ' - ' + (pageNo + 1) + 'P [' +
                     page.percent + '%]';
    window.history.replaceState(pageNo + 1, null);

    this.writing = false;
  }
  //}}}1
};
txtrdr.init();


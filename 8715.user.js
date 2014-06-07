// ==UserScript==
// @name          Page Concater
// @namespace     http://zeromemory.sblo.jp/article/1644396.html
// @description   page concate. CNet japan / ITpro / MYCOM Journal / exsite WebAD / All About / nikkei BP, SAFTY JAPAN, ARENA / DailyPortalZ / ITmedia +D
// @include       http://*
//                  http://japan.cnet.com/*/story/*
//                  http://itpro.nikkeibp.co.jp/article/COLUMN/*/*/*
//                  http://journal.mycom.co.jp/articles/*
//                  http://www.excite.co.jp/webad/special/*
//                  http://allabout.co.jp/*/*/closeup/*/*
//                  http://www.nikkeibp.co.jp/style/*/*/*/*/*
//                  http://www.nikkeibp.co.jp/netmarketing/*/*/*/*
//                  http://www.nikkeibp.co.jp/sj/*/*
//                  http://plusd.itmedia.co.jp/*
//                  http://ascii.jp/elem/000/000/*/*/*
// @exclude       *.js
// @version       0.10.1
// Copyright (c) 2006 suVene All rights reserved.
// ==/UserScript==

(function() {

  var concater;

  /* user options start */
  var isStepPaging = true;
  var use_timer = true; /* true: setTimeout false: EventListener */
  var GET_NEXT_PAGE_LINE_HEIGHT = 700;
  /* user options end   */

  var SCRIPT_FRAGMENT = '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)';
  var messageArea = null;
  var isLoading = false;
  var nextpage = 2;
  var MSG_COMPLATE = 'concatenation complete.';

  // logic {
  if (location.href.match(/^http:\/\/japan\.cnet\.com\/.*\/story\//)) {
    // CNET Japan
    if (location.href.match(/ST=print/)) { return; }
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=Shift_JIS';
    concater.REG_TOP = 'http://japan\.cnet\.com/.*story/0,[0-9]+,[0-9]+,00.htm$';
    concater.REG_REPLACE_URL_TOP = ['(http:\/\/japan\.cnet\.com\/.*story\/0,[0-9]+,[0-9]+)(-?\[0-9]*)(,00.htm).*', '$1$3'];
    concater.REG_NAVIGATER = '//div[@class="navi_paging_alt"]';
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/http:\/\/japan\.cnet\.com\/.*story\/0,\d+,[0-9]+-(\d+),00.htm/);
      return new Number(RegExp.$1);
    };
    concater.REG_BODY = [
      '<!--AD_ART_S END-->(.*?)<!--CNET',
      '<!--AD_ART_S END-->(.*?)<!--h3>\u30C8\u30E9\u30C3\u30AF\u30D0\u30C3\u30AF\u4E00\u89A7</h3-->',
      '<!--AD_ART_S END-->(.*?)<div style="float:right;margin-bottom:10px;">',
      '<div class="leaf_body">(.*?)<div style="float:right;margin-bottom:10px;">'
    ];
    concater.getHTML = function(curpage, maxpage, text) {
      return '<h3>page ' + curpage + ' / ' + maxpage + '</h3>' +
        '<div class="leaf_body">' + text + '</div>';
    }

  } else if (location.href.match(/^http:\/\/itpro\.nikkeibp\.co\.jp\/article\/.*\/\d+/)) {
    // ITpro
    if (location.href.match(/ST=print/)) { return; }
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=EUC-JP';
    concater.REG_TOP = 'http://itpro\.nikkeibp\.co\.jp/article/.*/[0-9]+/[0-9]+/$';
    concater.REG_REPLACE_URL_TOP = ['(http://itpro\.nikkeibp\.co\.jp/article/.*/[0-9]+/[0-9]+/).*', '$1'];
    concater.REG_NAVIGATER = '//div[@align="right"][2]/table';
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/P=(\w+$)/);
      return new Number(RegExp.$1);
    };
    concater.REG_BODY = '<!-- start \u672C\u6587 -->(.*?)<!-- end \u672C\u6587 -->';

  } else if ((location.href.match(/^http:\/\/journal\.mycom\.co\.jp\/articles\//)) ||
            (location.href.match(/^http:\/\/journal\.mycom\.co\.jp\/special\//))) {
    // MYCOM Journal
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=Shift_JIS';
    if (location.href.match(/articles/)) {
      concater.REG_TOP = 'http://journal\.mycom\.co\.jp/articles/[0-9]+/[0-9]+/[0-9]+/.*/$';
      concater.REG_REPLACE_URL_TOP = ['(http://journal\.mycom\.co\.jp/articles/[0-9]+/[0-9]+/[0-9]+/.*/).*', '$1'];
    } else if (location.href.match(/special/)) {
      // http://journal.mycom.co.jp/special/2006/trac/
      concater.REG_TOP = 'http://journal\.mycom\.co\.jp/special/[0-9]+/.+/$';
      concater.REG_REPLACE_URL_TOP = ['(http://journal\.mycom\.co\.jp/special/.+/).*', '$1'];
    }
    concater.REG_NAVIGATER = [
      '//*[@class="pageNavigation02"]',
      '//*[@class="pageNavigation03"]',
      '//*[@class="pageNavigation01"]',
      '//div[@class="pagenaviContainer"]'
    ];
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/http:\/\/journal\.mycom\.co\.jp\/.*\/(\d+)\.html$/);
      return new Number(RegExp.$1) + 1;
    };
    concater.setInjectionPoint = function(injectionPoint, parent, pager) {
      pager.parentNode.insertBefore(injectionPoint, pager);
      // pager.parentNode.removeChild(pager);
    }
    concater.REG_BODY = [
      '="articleContent">(.*?)<!-- /articleContent --></div>',
      '<div class="letterPart" >(.*?)<!-- #BeginEditable "RelativeArticle" -->'
    ];
    concater.getHTML = function(curpage, maxpage, text) {
      return '<div class="articleContainer"><div class="letterPart" >' +
        '<h3>page ' + curpage + ' / ' + maxpage + '</h3>' +
        text + '</div>';
    }

  } else if (location.href.match(/^http:\/\/www\.excite\.co\.jp\/webad\/special\//)) {
    // excite WebAD Times
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=Shift_JIS';
    concater.REG_TOP = 'http://www\.excite\.co\.jp/webad/special/.*/$';
    concater.REG_REPLACE_URL_TOP = ['(http://www\.excite\.co\.jp/webad/special/.*/).*', '$1'];
    concater.REG_NAVIGATER = '//div[@class="next"]';
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/http:\/\/www\.excite\.co\.jp\/webad\/special\/.*\/pid_(\d+)\.html/);
      return new Number(RegExp.$1);
    };
    concater.setInjectionPoint = function(injectionPoint, parent, pager) {
      pager.parentNode.insertBefore(injectionPoint, pager);
      //pager.parentNode.removeChild(pager);
    }
    concater.REG_BODY = '<span id=story>(.*?<br clear=left>)';
    concater.adjustBody = function(text) {
      var self = this;
      var matchAll = new RegExp(SCRIPT_FRAGMENT, 'img');
      // var matchAll = new RegExp('(var po = new PeeVeeObject.*po.write\\(\\);)', 'img');
      var scripts = text.match(matchAll);
      if (scripts) {
        scripts.forEach(function(script) {
          self.scripts.push(script);
        });
        text = text.replace(matchAll, '<span style="color: red;">script can\'t be set up.</span>');
      }
      return text;
    }

  } else if (location.href.match(/^http:\/\/allabout\.co\.jp\/.+\/.+\/closeup\/CU.+\//)) {
    // AllAbout
    if (location.href.match(/index_print.htm/)) { return; }
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=Shift_JIS';
    concater.REG_TOP = 'http://allabout\.co\.jp/.+/.+/closeup/CU.+/$';
    concater.REG_REPLACE_URL_TOP = ['(http://allabout\.co\.jp/.+/.+/closeup/CU.+/).*', '$1'];
    concater.REG_NAVIGATER = '//table[@id="pageChange"]';
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/http:\/\/allabout\.co\.jp\/.+\/.+\/closeup\/CU.+\/index(\d+)\.htm/);
      return new Number(RegExp.$1);
    };
    concater.setInjectionPoint = function(injectionPoint, parent, pager) {
      pager.parentNode.insertBefore(injectionPoint, pager);
      //pager.parentNode.removeChild(pager);
    }
    concater.REG_BODY = '<div class="vari35" id="article">(.*<!---\u25B2--->)';
    concater.getHTML = function(curpage, maxpage, text) {
      return '<div class="vari35" id="article">' +
        '<h3>page ' + curpage + ' / ' + maxpage + '</h3>' +
        text;
    }

  } else if (location.href.match(/^http:\/\/www\.nikkeibp\.co\.jp\/(style|netmarketing)\/.+\//)) {
    // nikkei BP(sougou)
    if (location.href.match(/secondstage/)) { return; }
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=utf-8';
    concater.REG_TOP = 'http://www\.nikkeibp\.co\.jp/(style|netmarketing)/.+/$';
    concater.REG_REPLACE_URL_TOP = ['(http://www\.nikkeibp\.co\.jp/)(style|netmarketing)(/.+/).*', '$1$2$3'];
    if (location.href.match(/style/)) {
      concater.REG_NAVIGATER = '//div[@id="pages"]';
    } else {
      concater.REG_NAVIGATER = '//div[@class="pages"][2]';
    }
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/index(\d+)\.html/);
      return new Number(RegExp.$1) + 1;
    };
    concater.setInjectionPoint = function(injectionPoint, parent, pager) {
      pager.parentNode.insertBefore(injectionPoint, pager);
      //pager.parentNode.removeChild(pager);
    }
    if (location.href.match(/style/)) {
      concater.REG_BODY = '<!-- google_ad_section_start\\(name=gbody\\) -->(.*?)<!-- end: pages -->';
    } else {
      concater.REG_BODY = '(<h2>.*?)<!-- begin:pagenavi -->';
    }

  } else if (location.href.match(/^http:\/\/business\.nikkeibp\.co\.jp\/article\/.+\//)) {
    // nikkei Business 0.8.3
    if (location.href.match(/ST=nboprint/)) { return; }
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=EUC-JP';
    concater.REG_TOP = 'http://business\.nikkeibp\.co\.jp/article/.*/[0-9]+/[0-9]+/$';
    concater.REG_REPLACE_URL_TOP = ['(http://business\.nikkeibp\.co\.jp/article/.*/[0-9]+/[0-9]+/).*', '$1'];
    concater.REG_NAVIGATER = [
      '//div[@align="center"]',
      '//div[@align="center"][2]'
    ];
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/P=(\w+)(&.+)?$/);
      return new Number(RegExp.$1);
    };
    concater.setInjectionPoint = function(injectionPoint, parent, pager) {
      pager.parentNode.insertBefore(injectionPoint, pager);
      //pager.parentNode.removeChild(pager);
    }
    concater.REG_BODY = [
      '="articlecontent">(.*?)(<!-- /articlecontent -->|<div align="center">)',
      '<div class="articlecontent">(.*?)<!-- /articlecontent -->'
    ];
    concater.getHTML = function(curpage, maxpage, text) {
      return '<h1 class="articleheader">page ' + curpage + ' / ' + maxpage + '</h1>' + text;
    }

  } else if (location.href.match(/^http:\/\/www\.nikkeibp\.co\.jp\/(sj)\/.+\//)) {
    // nikkei SAFTY JAPAN
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=iso-2022-jp';
    concater.REG_TOP = 'http://www\.nikkeibp\.co\.jp/sj/.+/$';
    concater.REG_REPLACE_URL_TOP = ['(http://www\.nikkeibp\.co\.jp/sj/.+/).*', '$1'];
    concater.getPageList = function(list) {
      var self = this;
      var top = document.evaluate('//a[@href="#TOPPAGE"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
      // var uri = top.childNodes[0].nodeValue;
      var parent = top.parentNode.parentNode.parentNode;
      $X('.//a', parent).forEach(function(a, idx) {
        var page = self.getPageFromURL(a, idx);
        if (list.length == (page - 2)) {
          list.push(a);
        }
      });
      return parent;
    }
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/\/([0-9]+)\.html$/);
      return new Number(RegExp.$1);
    };
    concater.setInjectionPoint = function(injectionPoint, parent, pager) {
      pager.parentNode.insertBefore(injectionPoint, pager);
      //pager.parentNode.removeChild(pager);
    }
    // concater.REG_BODY = '<!-- \u30B3\u30F3\u30C6\u30F3\u30C4 -->(.*?)<img src="../../../common/line_dot490.gif"';
    concater.REG_BODY = '(<h2.*leaf_kmidashi.*?>.*?)</span>.*?<!-- Google';

//  } else if (location.href.match(/^http:\/\/plusd\.itmedia\.co\.jp\/.+\/articles/)) {
    // TODO: nikkei BP ARENA
    // http://arena.nikkeibp.co.jp/tokushu/gen/20061023/119381/

//  } else if (location.href.match(/^http:\/\/portal\.nifty\.com\/.*\/\d+\/\d+\/.+\//)) {
  } else if (location.href.match(/^http:\/\/portal\.nifty\.com\/.*\/\d+\/\d+/)) {
    // DailyPortalZ
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=Shift_JIS';
    concater.REG_TOP = 'http://portal\.nifty.com/.*/$';
    concater.REG_REPLACE_URL_TOP = [
      '(http://portal\.nifty.com/[0-9]+/[0-9]+/[0-9]+/.+/).*', '$1',
      '(http://portal\.nifty.com/.+/[0-9]+/[0-9]+/).*', '$1'
    ];
    concater.REG_NAVIGATER = '//div[2][@align="center"]';
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/(\d+).htm$/);
      var n = new Number(RegExp.$1);
      if (n) {
        for (var i = 0; i < 9; i++) {
          var el = document.createElement('a');
          el.href = (i + 2) + '.htm';
          this.pages.push(el);
        }
      }
      return 0;
    };
    concater.setInjectionPoint = function(injectionPoint, parent, pager) {
      // pager.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(injectionPoint);
      $X("//a[contains(@href, 'privacy.htm')]/../../../../../table").forEach(function(el, idx) {
        el.parentNode.appendChild(injectionPoint)
      });
      //pager.parentNode.removeChild(pager);
    }
    concater.REG_BODY = '<!--HEADER-->.*?<!--HEADER-->(.*?)<!--\u30A2\u30C9\u30BB\u30F3\u30B9\u3053\u3053\u304B\u3089-->';
    concater.adjustBody = function(text) {
      var self = this;
      var matchAll = new RegExp(SCRIPT_FRAGMENT, 'img');
      var scripts = text.match(matchAll);
      if (scripts) {
        scripts.forEach(function(script, idx) {
          self.scripts.push(script);
        });
        // text = text.replace(matchAll, '<iframe width="500" height="500" frameborder="1" src="index.htm" id="aaa"></iframe>');
        // text = text.replace(matchAll, '<div>movie$1 $2</div>');
        text = text.replace(matchAll, '<span style="color: red;">script can\'t be set up.</span>');
      }
      return text;
    }
    concater.postInsert = function() {
      if (document.getElementById('aaa')) { document.getElementById('aaa').src="001.js"; }
    }
    concater.getHTML = function(curpage, maxpage, text) {
      return '<div align="center"><h3>page ' + curpage + '</h3>' + text + '</div>';
    }

  } else if ((location.href.match(/^http:\/\/plusd\.itmedia\.co\.jp\/.+\/articles/)) ||
             (location.href.match(/^http:\/\/www\.itmedia\.co\.jp\/.+\/articles/))) {
    // ITmedia
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=Shift_JIS';
    concater.REG_TOP = 'http://.*\.itmedia\.co\.jp/.+/articles/[0-9]+/[0-9]+/news[0-9]+\.html$';
    concater.REG_REPLACE_URL_TOP = ['(http://.*\.itmedia\.co\.jp/.+/articles/[0-9]+/[0-9]+/news[0-9]+)(.*)(\.html)', '$1$3'];
    concater.REG_NAVIGATER = '//span[@id="numb"]';
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/news\d+_(\d+)\.html$/);
      return new Number(RegExp.$1);
    };
    //  '<div class="ctrl".*?>.*?</div>(<h[34]>.*?)<div class="ctrl"',
    //  '<div class="ctrl".*?>.*?</div>(<p>.*?)<div class="ctrl"',
    concater.REG_BODY = [
      '<div class="ctrl".*?>.*?</div>(<.*?>.*?)<div class="ctrl"'
    ];

  } else if (location.href.match(/^http:\/\/codezine\.jp\/a\/article/)) {
    // CodeZine
    // http://codezine.jp/a/article/aid/714.aspx
    // http://codezine.jp/a/article.aspx?aid=261
    // http://codezine.jp/a/article/aid/907.aspx
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=Shift_JIS';
    concater.REG_TOP = 'http://codezine\.jp/a/article/aid/[0-9]+\.aspx$';
    concater.REG_REPLACE_URL_TOP = [
      'http://codezine\.jp/a/article\.aspx\\?aid=([0-9]+).*', 'http://codezine.jp/a/article/aid/$1.aspx',
      'http://codezine\.jp/a/article/aid/([0-9]+)\.aspx.*', 'http://codezine.jp/a/article/$1.aspx',
    ];
    concater.REG_NAVIGATER = [
      '//div[@class="pg_bar_top"]',
      '//div[@align="right"][2]/table'
    ];
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/p=(\w+$)/);
      return new Number(RegExp.$1);
    };
    concater.REG_BODY = [
      '<!-- article body -->(.*?)<!-- /article body -->',
      '<!-- start \u672C\u6587 -->(.*?)<!-- end \u672C\u6587 -->'
    ];
    concater.setInjectionPoint = function(injectionPoint, parent, pager) {
      var el = $X('//table[@class="pg_bar"]')[0];
      try {
        el.parentNode.parentNode.parentNode.insertBefore(injectionPoint, el.parentNode.parentNode);
      } catch(e) {
        el.parentNode.appendChild(injectionPoint);
      }
      //pager.parentNode.removeChild(pager);
    }

  } else if (location.href.match(/^http:\/\/booklog\.jp\/search.php\?keyword=(.*)/)) {
    // booklog
//    concater = clone(new Concater);
//    concater.MIME_TYPE = 'text/plain; charset=EUC-JP';
//    concater.REG_TOP = 'http://booklog\.jp/search\.php\\?keyword=(.*)&mode=[a-zA-Z]+$';
//    concater.REG_REPLACE_URL_TOP = ['(http://booklog\.jp/search\.php\\?keyword=.*?&mode=.*?)&page=[0-9]+', '$1'];
//    concater.REG_NAVIGATER = '//div[@align="right"][2]/table';
//    concater.getPageFromURL = function(el, idx) {
//      el.href.match(/P=(\w+$)/);
//      return new Number(RegExp.$1);
//    };
//    concater.REG_BODY = '<!-- start \u672C\u6587 -->(.*?)<!-- end \u672C\u6587 -->';

  } else if (location.href.match(/^http:\/\/ascii\.jp\/elem\/000\/000\/\d+\/\d+\//)) {
    // ascii 0.10.0
    concater = clone(new Concater);
    concater.MIME_TYPE = 'text/plain; charset=utf-8';
    concater.REG_TOP = 'http://ascii\.jp/elem/000/000/[0-9]+/[0-9]+/$';
    concater.REG_REPLACE_URL_TOP = ['(http://ascii\.jp/elem/000/000/[0-9]+/[0-9]+/).*', '$1'];
    concater.REG_NAVIGATER = '//div[@class="pager"]';
    concater.getPageFromURL = function(el, idx) {
      el.href.match(/index-(\w+)\.html$/);
      return new Number(RegExp.$1);
    };
    //    concater.REG_BODY = '<p class="newauthor">.*?</p>(.*?)<!-- google';
    concater.REG_BODY = [
      '(<[hH]3>.*)<!--  google_ad_section_end',
      '(<[hH]2>.*)<!--  google_ad_section_end'
    ];
    concater.setInjectionPoint = function(injectionPoint, parent, pager) {
      pager.parentNode.insertBefore(injectionPoint, pager);
      //pager.parentNode.removeChild(pager);
    }
  } else {
    //message('not match.', 3000);
  }

  if (!concater) { return; }
  var firefox = false; var w = window;
  if (typeof unsafeWindow != 'undefined') { firefox = true; w = unsafeWindow; }
  createMessageArea();

  if (!concater.isTop()) {
    message('<span style="cursor:pointer; color: white;" onclick="javascript:location.href = \'' + concater.getTop() + '\';">goto top page.</span>', 5000);
    return;
  }
  // concater.gotoTop();
  concater.iterate();
  if (isStepPaging) {
    if (use_timer) {
      watch_scroll();
    } else {
      document.addEventListener('scroll', watch_scroll, false);
    }
  } else {
    concater.concate();
  }
  // logic }

  // framework {
  var Remain = {
    valueOf : function() {
       if (window.opera) {
         var sc = document.body.scrollTop;
         var total = document.body.scrollHeight - document.body.clientHeight;
       } else {
         var sc = document.documentElement.scrollTop || document.body.scrollTop || w.pageYOffset;
         var total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
       }
       // return total - sc;
       return (concater.injectionPoint.offsetTop + concater.injectionPoint.offsetHeight) - sc;
    }
  };
  function watch_scroll() {
    var self = arguments.callee;
    // message('' + Remain + ':' + w.pageYOffset + ':' + concater.injectionPoint.offsetTop + ':' + document.documentElement.scrollTop + ':' + document.body.scrollHeight + ':' + document.body.clientHeight);
    // message('' + concater.injectionPoint.offsetTop, 1000);
    if (!isLoading && Remain < GET_NEXT_PAGE_LINE_HEIGHT) {
      if ((concater.pages.length > 0) && (nextpage - 2 < concater.pages.length)) {
        message('Loading...');
        concater.getPage(concater.pages, nextpage);
        nextpage++;
        //alert('' + Remain);
      }
    }
    if (use_timer) {
      setTimeout(self,100);
    }
  };
  function Concater() {
    this.MIME_TYPE = 'text/plain; charset=Shift_JIS';
    this.REG_TOP = '';
    this.REG_REPLACE_URL_TOP = '';
    this.REG_NAVIGATER = '';
    this.REG_BODY = '';

    this.injectionPoint = null;
    this.pages = [];
    this.scripts = [];
    Concater.prototype.isTop = function() {
      if (!this.REG_TOP) { return true; }
      if (location.href.match(new RegExp(this.REG_TOP, 'img'))) {
        return true;
      } else {
        return false;
      }
    }
    Concater.prototype.getTop = function() {
      for (var i = 0; i < this.REG_REPLACE_URL_TOP.length; i = i+2) {
        var matchOne = new RegExp(this.REG_REPLACE_URL_TOP[i], 'img');
        if (location.href.match(matchOne)) {
          return location.href.replace(matchOne, this.REG_REPLACE_URL_TOP[i+1]);
        }
      }
    }
    Concater.prototype.gotoTop = function() {
      if (!this.isTop()) {
        location.href = this.getTop();
      }
    }
    Concater.prototype.iterate = function() {
      var self = this;
      var pager = null;
      var parent = null;
      if (this.REG_NAVIGATER) {
        var naviary = [].concat(this.REG_NAVIGATER);
        for (var i = 0; i < naviary.length; i++) {
          var navi = naviary[i];
          pager = $X(navi);
          if (!pager) { continue; }
          for (var j = pager.length - 1; j >= 0; j--) {
            var pagertmp = pager[j];
            //pagertmp.style.background = '#f00';
            parent = pagertmp.parentNode;
            $X('.//a', pagertmp).forEach(function(el, idx) {
              var page = self.getPageFromURL(el, idx);
              if (self.pages.length == (page - 2)) {
                self.pages.push(el);
              }
            });
            if (self.pages.length != 0) { pager = pagertmp; break; }
          }
          if (self.pages.length != 0) { pager = pagertmp; break; }
        }
      } else {
        pager = this.getPageList(self.pages);
      }
      self.injectionPoint = document.createElement('div');
      // alert(self.pages.length);
      // pager.setAttribute('style', 'border: 10px solid #0f0;');
      self.setInjectionPoint(self.injectionPoint, parent, pager);
    }
    Concater.prototype.getPageList = function() {
      return [];
    }
    Concater.prototype.getPageFromURL = function() {
      return 0;
    }
    Concater.prototype.setInjectionPoint = function(injectionPoint, parent, pager) {
      parent.parentNode.insertBefore(injectionPoint, parent);
      //parent.removeChild(pager);
    }
    Concater.prototype.concate = function() {
      if (this.pages.length > 0) {
        this.getPage(this.pages, 2);
      }
    }
    Concater.prototype.getPage = function(pages, page) {
      isLoading = true;
      var self = this;
      var loadingmsg = (page) + ' / ' + (pages.length + 1) + ' pages';
      message(loadingmsg);
      var url = pages[page - 2].href;
      unsafe_xmlhttpRequest({
        method: 'get',
        overrideMimeType: self.MIME_TYPE,
        url: url,
        onload: function(response) {
          isLoading = false;
          var r = response.responseText.replace(/(\r\n|\r|\n)/g, '<!--TEMPBR-->');
          var regExpBody = [].concat(self.REG_BODY);
          for (var i = 0; i < regExpBody.length; i++) {
            //  alert(regExpBody[i]);
            if (r.match(new RegExp(regExpBody[i], 'mg'))) {
              break;
            }
            if (i + 1 == regExpBody.length) {
              message('nomatch', 3000);
              return;
            }
          }
          var text = RegExp.$1;
if (false) { self.injectionPoint.appendChild(document.createTextNode(r)); alert(text); return; }
          if (!text) { return; }
          text = self.adjustBody(text.replace(/<!--TEMPBR-->/g, '\n'));
          var el = document.createElement('div');
          el.innerHTML = self.getHTML(page, self.pages.length + 1, text);
          self.injectionPoint.appendChild(el);
          self.postInsert();
          var next = page + 1;
          if ((next - 2) < self.pages.length) {
            if (isStepPaging) {
              message(loadingmsg, 2000);
            } else {
              self.getPage(self.pages, next);
            }
          } else {
            message(MSG_COMPLATE, 5000);
          }
        },
        onerror: function(response) {
          message(MSG_COMPLATE, 5000);
        }
      });
    }
    Concater.prototype.getHTML = function(curpage, maxpage, text) {
      return '<h3>page ' + curpage + ' / ' + maxpage + '</h3>' + text;
    }
    Concater.prototype.adjustBody = function(text) {
      var self = this;
      var matchAll = new RegExp('(?:<script.*?>)(var po = new PeeVeeObject.*?;)(.*po.write\\(\\));(?:<\/script>)', 'img');
      // var matchAll = new RegExp('(var po = new PeeVeeObject.*?;)(.*po.write\\(\\);)', 'img');
      var scripts = text.match(matchAll);
      var cnt = 0;
      if (scripts) {
        scripts.forEach(function(script) {
          self.scripts.push(script);
        });
        //text = text.replace(matchAll, '<script>$1 po.write2 = (function() { return po.write.toString().replace(/{/, "{ var a=[]; ").replace(/document\.write/mg, "a.push").replace(/}/, " return a.join(\'\'); } ") })(); </script>alert(eval(po.write2));');
      }
      return text;
    }
    Concater.prototype.postInsert = function() {
    }
  }
  // framework }

  // common utility {
  function createMessageArea() {
    messageArea = document.createElement('div');
    messageArea.id = 'pageconcater_message';
    messageArea.setAttribute('style',
      'opacity:0.80; height:20px; border:1px solid #666666; padding: 3px 5px 3px 5px;' +
      'background-color:#3B7DE1; color: #FFFFFF; font-family: \'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif; font-size: 12px; font-weight: bold;' +
      'position:fixed; left:0px; bottom:0px; text-align:left; z-index:100; display: none;'
    );
    document.body.appendChild(messageArea);
  }

  function message(message, timer) {
    messageArea.innerHTML = message;
    messageArea.style.display = 'block';
    if (timer) {
      if (use_timer) {
        setTimeout(function() {
          messageArea.style.display = 'none';
        }, timer);
      } else {
        var s = new Date().getTime();
        for (var e = new Date().getTime(); (e - s) < 1000; e = new Date().getTime());
        messageArea.style.display = 'none';
      }
    }
  }

  function extends(destination, source) {
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
  }

  function unsafe_xmlhttpRequest(options) {
    var opt = extends({
      method: 'post',
      asynchronous: true,
      contentType: 'application/x-www-form-urlencoded',
      parameters: ''
    }, options || {});
    var transport = new w.XMLHttpRequest();

    transport.onreadystatechange = onStateChange;
    transport.open(opt.method, opt.url, opt.asynchronous);
    setRequestHeaders(transport, opt);
    var body = opt.postBody ? opt.postBody : options.parameters;
    transport.send(opt.method == 'post' ? body : null);

    function setRequestHeaders(transeport, options) {
      var requestHeaders =
        ['X-Requested-With', 'XMLHttpRequest',
         'Accept', 'text/javascript, text/html, application/xml, text/xml, */*'];
      if (options.method == 'post') {
        requestHeaders.push('Content-type', options.contentType);

        if (transport.overrideMimeType) {
          requestHeaders.push('Connection', 'close');
        }
      }
      if (transport.overrideMimeType && options.overrideMimeType) {
        transport.overrideMimeType(options.overrideMimeType);
      }
      if (options.requestHeaders)
        requestHeaders.push.apply(requestHeaders, options.requestHeaders);

      for (var i = 0; i < requestHeaders.length; i += 2)
        transport.setRequestHeader(requestHeaders[i], requestHeaders[i+1]);
    }

    function onStateChange() {
      if (transport.readyState == 4) {
        if (transport.status == 200 || transport.status == 304) {
          opt.onload(transport);
        } else {
          if (opt.onerror) {
            opt.onerror(transport);
          }
        }
      }
    }
  }

  // XPath http://lowreal.net/logs/2006/03/16/1
  function $X(exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);

    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for (var i = 0, len = result.snapshotLength; i < len ; i++) {
          ret.push(result.snapshotItem(i));
        }
        return ret;
      }
    }
    return null;
  }

  // object clone http://d.hatena.ne.jp/amachang/20061019/1161201903
  function clone(p) {
      p = (function(){return this}).apply(p); // objectify if atomic
      switch (typeof p) {
      case 'function':  return function() { return p.apply(this, arguments) };
      case 'undefined': return p;
      case 'object':
          if (p == null) return p;
          else {
              var f = function() {};
              f.prototype = p;
              var o = new f;
              switch (p.constructor) {
              case String: case Number: case Boolean:
                  if (o.toSource) o.toSource = function() { return "clone(" + p.toSource.apply(p, arguments) + ")/*require clone function*/" };
                  o.toString = function() { return p.toString.apply(p, arguments) };
                  o.valueOf = function() { return p.valueOf.apply(p, arguments) };
              }
              return o;
          }
      }
  };
  // common utility }

})();

// ==UserScript==
// @name        AntennaSiteSkip
// @namespace   https://twitter.com/akameco
// @description いいぜアンテナサイトに飛ぶってならまずはそのふざけた幻想をぶち殺す
// @include     http://2ch-c.net/*
// @include     http://newser.cc/*
// @include     http://get2ch.net/*
// @include     http://the-3rd.net/*
// @include     http://matomeantena.com/*
// @include     http://moudamepo.com/*
// @include     http://newmofu.doorblog.jp/*
// @include     http://blog-news.doorblog.jp/*
// @include     http://nullpoantenna.com/*
// @include     http://newpuru.doorblog.jp/*
// @include     http://besttrendnews.net/*
// @include     http://suomi-neito.com/*
// @include     http://2ch.logpo.jp/*
// @include     http://anaguro.yanen.org/*
// @include     http://a.anipo.jp/*
// @include     http://katuru.com/*
// @include     http://news-choice.net/*
// @include     http://img.favsite.jp/*
// @version     1
// @grant       none
// ==/UserScript==

// 対応サイト
// しぃアンテナ(*ﾟーﾟ)
// News人
// 2GET
// The 3rd
// ワロタあんてな
// だめぽアンテナ
// にゅーもふ
// ぶろにゅー
// ヌルポあんてな
// にゅーぷる
// Best Trend News
// スオミネイト
// Logpo!2ch
// アナグロあんてな
// アンテナ速報
// 勝つるあんてな！
// newschoice
// ２次元と３次元の画像ブログまとめ

(function (){

  function doOpen() {
    let host = location.host;
    matchHost[host]();
  }

  window.onload = function () {
    setTimeout(function() {
      doOpen(); 
    }, 100);
    setTimeout(function() { 
      doOpen(); 
    }, 500);
    setTimeout(function() {
      doOpen(); 
    }, 1000);
  }

  // targetを取得 
  function getTarget(path) {
    return document.querySelectorAll(path)[0];
  }

  // targetsを取得 
  function getTargets(path) {
    return document.querySelectorAll(path);
  }

  // window.openは_self固定 
  function wopen(target) {
    window.open(target,'_self').focus();
  }

  // リンクがclassで指定されているサイト
  function skipClass(select) {
    let target = getTarget(select).getAttribute('href');
    wopen(target);
  }

  var matchHost = {
    // しぃアンテナ(*ﾟーﾟ)
    // http://2ch-c.net/*
    "2ch-c.net": function () {
      let target = document.getElementById('pickup').getAttribute('href');
      wopen(target);
    },

    // 2GET
    //http://get2ch.net/*
    "get2ch.net": function() {
      skipClass('.pickup a');
    },

    // News人
    // http://newser.cc/*
    "newser.cc": function() {
      let targets = getTargets('td.news-link a');
      for (let i=0; i < targets.length; i++) {
        if(targets[i].getAttribute('style') != null){
          wopen(targets[i]);
        }
      }
    },

    // The 3rd
    // http://the-3rd.net/*
    "the-3rd.net": function() {
      let targets = getTargets('div#content.wrap div#l_col a');
      for (let i=0; i < targets.length; i++) {
        if(targets[i].childNodes[1].childNodes[3].getAttribute('style') != null) {
          wopen(targets[i]);
        }
      }
    },

    // ワロタあんてな
    // http://matomeantena.com/*
    "matomeantena.com": function () {
      skipClass('.rss_link > a');
    },

    // にゅーもふ
    // http://newmofu.doorblog.jp/*
    "newmofu.doorblog.jp": function () {
      skipClass('.title_link a');
    },

    // だめぽアンテナ
    // http://moudamepo.com/*
    "moudamepo.com": function () {
      skipClass('.headline_pkup a');
    },

    // ぶろにゅー
    // http://blog-news.doorblog.jp/
    "blog-news.doorblog.jp": function () {
      skipClass('.title_link');
    },

    // ぬるぽあんてな
    // http://nullpoantenna.com/*
    "nullpoantenna.com": function () {
      let target = getTarget('.rss_link').firstChild.getAttribute('href');
      wopen(target);
    },

    // にゅーぷる
    // http://newpuru.doorblog.jp/*
    "newpuru.doorblog.jp": function () {
      skipClass('.titleLink');
    },

    // best trend news
    // http://besttrendnews.net/*
    "besttrendnews.net": function () {
      let target = getTarget('.select').firstChild.getAttribute('href');
      wopen(target);
    },

    // スオミネイト
    // http://suomi-neito.com/*
    "suomi-neito.com": function () {
      let target = getTarget('.pickup').firstChild.innerHTML;
      wopen(target);
    },

    // LogPo!2ch
    // http://2ch.logpo.jp/*
    "2ch.logpo.jp": function () {
      skipClass('.caption a');
    },

    // アナグロあんてな
    // http://anaguro.yanen.org/*
    "anaguro.yanen.org": function () {
      skipClass('.title a');
    },

    // アンテナ速報
    // http://a.anipo.jp/*
    "a.anipo.jp": function () {
      let targets = getTargets('#tbody tr');
      for (let i=0; i < targets.length; i++) {
        if(targets[i].getAttribute('style') != null){
          let target = targets[i].querySelectorAll('a')[0].getAttribute('href');
          wopen(target);
        }
      }
    },

    // 勝つるあんてな
    // http://katuru.com/*
    "katuru.com": function () {
      skipClass('.rss_center_div a');
    },

    //newschoice
    //http://news-choice.net/*
    "news-choice.net": function () {
      skipClass('.pickuptitle a');
    },

    // ２次元と３次元の画像ブログまとめ
    // http://img.favsite.jp/*
    "img.favsite.jp": function () {
      skipClass('.stp');
    }

  };
})();

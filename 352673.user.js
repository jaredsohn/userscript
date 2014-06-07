// ==UserScript==
// @name    InoReader Filter
// @description    Highlight or remove articles in InoReader. / InoReaderの記事を消去もしくは強調表示します。
// @id    InoReaderFilter
// @namespace    https://userscripts.org/scripts/show/352673
// @homepage    https://userscripts.org/scripts/show/352673
// @updateURL    https://userscripts.org/scripts/source/352673.meta.js
// @include    http://inoreader.com/*
// @include    https://inoreader.com/*
// @include    http://www.inoreader.com/*
// @include    https://www.inoreader.com/*
// @include    http://beta.inoreader.com/*
// @include    https://beta.inoreader.com/*
// @include    http://us.inoreader.com/*
// @include    https://us.inoreader.com/*
// @exclude    *inoreader.com/stream/*
// @exclude    *inoreader.com/m/*
// @exclude    *inoreader.com/old/stream*
// @exclude    *inoreader.com/old/m/*
// @grant    GM_addStyle
// @grant    GM_log
// @version    1.11
// ==/UserScript==

(function() {
'use strict';

var aNgTextarea = [],
  aNg = [],
  aNgId = [],
  aHiTextarea = [],
  aHi = [],
  aHiId = [],
  aAd = [],
  aAdId = [],
  aAdTemp,
  bExclude = false,
  nArticles = 0,
  nExcludes = 0,
  st = {},
  reAd = /^\s*(?:ad|pr|広告)\s*[:：]|^\s*[\[［【](?:ad|pr|広告)[\]］】]|[\[［【](?:ad|pr|広告)[\]］】]\s*$/im,
  $id = function(id) {
    return document.getElementById(id);
  },
  notType = function(t, a) {
    return (Object.prototype.toString.call(a).slice(8, 11) !== t) ? true : false;
  },
  target = $id('subscriptions_articles') || $id('reader_pane'),
  config = {
    childList: true,
    subtree: true
  },
  iInit, LOC;

var convertRules = function() {
  aNg = [];
  aHi = [];
  aNgTextarea = (st.ngdata) ? st.ngdata.split(/\r\n|\n|\r/) : [];
  aHiTextarea = (st.hidata) ? st.hidata.split(/\r\n|\n|\r/) : [];
  var wildcardToRegexp = function(s) {
    return s.replace(/~\*/g, '<InoReaderFilterAM>')
      .replace(/~\?/g, '<InoReaderFilterQM>')
      .replace(/[.+\^=!:${}()|\[\]\/\\]/g, '\\$&')
      .replace(/\*/g, '.*')
      .replace(/\?/g, '.')
      .replace(/<InoReaderFilterAM>/g, '\\*')
      .replace(/<InoReaderFilterQM>/g, '\\?');
  },
    a = [aNg, aNgTextarea, aHi, aHiTextarea];
  for (var n = 0, m = a.length; n < m; n = n + 2) {
    for (var i = 0, j = a[n + 1].length; i < j; i++) {
      var str = a[n + 1][i],
        sFeed = '',
        sTitle = '',
        sText = '';
      a[n][i] = {};
      a[n][i].feedPattern = '';
      a[n][i].feedFlag = '';
      a[n][i].titlePattern = '';
      a[n][i].titleFlag = '';
      a[n][i].textPattern = '';
      a[n][i].textFlag = '';
      a[n][i].task = '';
      if (str.indexOf(st.delimiter) !== -1) {
        var arr = str.split(st.delimiter);
        sFeed = arr[0];
        if (arr.length === 2) sText = arr[1];
        else if (arr.length > 2) {
          sTitle = arr[1];
          sText = str.slice(arr[0].length + arr[1].length + (st.delimiter.length * 2));
          if (!arr[1]) a[n][i].task = 'text';
        }
      } else sText = str;
      if (sFeed) {
        if (/^\/.+\/g?i?y?$/.test(sFeed)) {
          a[n][i].feedPattern = sFeed.slice(sFeed.indexOf('/') + 1, sFeed.lastIndexOf('/'));
          a[n][i].feedFlag = sFeed.slice(sFeed.lastIndexOf('/') + 1);
        } else a[n][i].feedPattern = wildcardToRegexp(sFeed);
      }
      if (sTitle) {
        if (/^\/.+\/g?i?y?$/.test(sTitle)) {
          a[n][i].titlePattern = sTitle.slice(sTitle.indexOf('/') + 1, sTitle.lastIndexOf('/'));
          a[n][i].titleFlag = sTitle.slice(sTitle.lastIndexOf('/') + 1);
        } else a[n][i].titlePattern = wildcardToRegexp(sTitle);
      }
      if (sText) {
        if (/^\/.+\/g?i?y?$/.test(sText)) {
          a[n][i].textPattern = sText.slice(sText.indexOf('/') + 1, sText.lastIndexOf('/'));
          a[n][i].textFlag = sText.slice(sText.lastIndexOf('/') + 1);
        } else a[n][i].textPattern = wildcardToRegexp(sText);
      }
    }
  }
};

var checkArticle = function(a, ft, at, du, tdu) {
  var feed = a.feedPattern,
    title = a.titlePattern,
    text = a.textPattern,
    task = a.task;
  if ((!title && !text) || /^\s+$/.test(title + text)) return false;
  var bFeed = new RegExp(feed, a.feedFlag + 'm').test(ft),
    bTitle = new RegExp(title, a.titleFlag).test(at),
    bDU = new RegExp(text, a.textFlag + 'm').test(du),
    bTDU = new RegExp(text, a.textFlag + 'm').test(tdu);
  if (!feed) {
    if (!title && bDU && task === 'text') return 'DU: ' + text;
    if (!title && bTDU && !task) return 'TDU: ' + text;
    if (bTitle && !text) return 'T: ' + title;
    if (bTitle && bDU) return 'T: ' + title + ' DU: ' + text;
  }
  if (bFeed) {
    if (!title && bDU && task === 'text') return 'F: ' + feed + ' DU: ' + text;
    if (!title && bTDU && !task) return 'F: ' + feed + ' TDU: ' + text;
    if (bTitle && !text) return 'F: ' + feed + ' T: ' + title;
    if (bTitle && bDU) return 'F: ' + feed + ' T: ' + title + ' DU: ' + text;
  }
  return '';
};

var currentArticle = function() {
  var eSa = $id('subscriptions_articles') || $id('reader_pane');
  if (eSa) return eSa.getElementsByClassName('article_current');
  return [];
};

var currentExpandedArticle = function() {
  var eSa = $id('subscriptions_articles') || $id('reader_pane');
  if (eSa) return eSa.getElementsByClassName('article_current article_expanded');
  return [];
};

var currentTreeName = function() {
  var tlf = document.getElementById('tree').getElementsByClassName('selected');
  if (tlf.length && tlf[0] && tlf[0].textContent) return tlf[0].textContent;
  return '';
};

var articleData = function(e) {
  var o = {};
  o.sId = '';
  o.sFeed = '';
  o.sTitle = '';
  o.sDesc = '';
  o.sUrl = '';
  o.sDate = '';
  o.sId = (e && e.id) ? e.id.slice(e.id.lastIndexOf('_') + 1) : '';
  if (!o.sId) return o;
  var eArticleFeed = $id('article_feed_info_link_' + o.sId) || e.getElementsByClassName('article_feed_title')[0] || document.evaluate('//div[@class="article_tile_footer_feed_title"]/a', e.cloneNode(true), null, 9, null).singleNodeValue,
    eArticleTitle = $id('at_' + o.sId) || $id('article_title_link_' + o.sId) || e.getElementsByClassName('article_title_link')[0],
    eArticleDesc = e.getElementsByClassName('article_short_contents')[0] || e.getElementsByClassName('article_tile_content')[0],
    eArticleUrl = $id('aurl_' + o.sId),
    eArticleDate = $id('header_date_' + o.sId);
  o.sFeed = (eArticleFeed) ? eArticleFeed.textContent : currentTreeName();
  o.sTitle = (eArticleTitle) ? eArticleTitle.textContent : '';
  o.sDesc = (eArticleDesc) ? eArticleDesc.textContent : '';
  o.sUrl = (eArticleUrl && eArticleUrl.hasAttribute('href')) ? eArticleUrl.getAttribute('href') : '';
  o.sDate = (eArticleDate && eArticleDate.hasAttribute('title')) ? eArticleDate.getAttribute('title') : '';
  if (/^\s+$/.test(o.sFeed)) o.sFeed = '';
  if (/^\s+$/.test(o.sTitle)) o.sTitle = '';
  if (/^\s+$/.test(o.sDesc)) o.sDesc = '';
  if (/^\s+$/.test(o.sUrl)) o.sUrl = '';
  if (/^\s+$/.test(o.sDate)) o.sDate = '';
  if (o.sDesc) o.sDesc = o.sDesc.replace(/^\s+-\s+(.+)/, '$1').replace(/(.+)\s+$/, '$1');
  if (o.sDate) o.sDate = o.sDate.slice(o.sDate.lastIndexOf(': ') + 2);
  return o;
};

var mutation = function() {
  var eSa = $id('subscriptions_articles') || $id('reader_pane');
  if (!eSa) return;
  var articles = eSa.getElementsByClassName('ar'),
    bFoundCurrentArticle = false,
    eExpandedCurrentArticle,
    treeTitle = currentTreeName(),
    eAc = currentExpandedArticle();
  if (!articles.length || (nArticles > articles.length + nExcludes + 3)) {
    aHiId = [];
    aNgId = [];
    aAdId = [];
    bExclude = false;
    nArticles = 0;
    nExcludes = 0;
    return;
  }
  nArticles = articles.length + nExcludes;
  if (eAc.length) eExpandedCurrentArticle = eAc[0];
  loop1: for (var n1 = 0, l1 = articles.length; n1 < l1; n1++) {
    if (n1 === 0 && !st.hi && !st.ng) break;
    var eArticle = articles[n1],
      oA = articleData(eArticle);
    if (!oA.sId) continue;
    if (eArticle === eExpandedCurrentArticle) bFoundCurrentArticle = true;
    if (st.hi) {
      for (var n2 = 0, l2 = aHiId.length; n2 < l2; n2++) {
        if (oA.sId === aHiId[n2]) continue loop1;
      }
    }
    if (st.ng) {
      for (var n3 = 0, l3 = aNgId.length; n3 < l3; n3++) {
        if (oA.sId === aNgId[n3]) {
          nExcludes++;
          continue loop1;
        }
      }
    }
    if (st.ad) {
      for (var n4 = 0, l4 = aAdId.length; n4 < l4; n4++) {
        if (oA.sId === aAdId[n4]) {
          nExcludes++;
          continue loop1;
        }
      }
    }
    if (treeTitle) oA.sFeed += '\n' + treeTitle;
    var sArticleDU = oA.sDesc + '\n' + oA.sUrl,
      sArticleTDU = oA.sTitle + '\n' + oA.sDesc + '\n' + oA.sUrl,
      sCa = '';
    if (st.hi) {
      for (var i1 = 0, j1 = aHi.length; i1 < j1; i1++) {
        sCa = checkArticle(aHi[i1], oA.sFeed, oA.sTitle, sArticleDU, sArticleTDU);
        if (sCa) {
          if (st.log) GM_log('highlight: ' + oA.sTitle + ' / matching rule ' + sCa);
          $id('article_' + oA.sId).classList.add('inoreader_filter_highlight');
          aHiId.push(oA.sId);
          continue loop1;
        }
      }
    }
    if (bExclude) break;
    if (st.ad) {
      var sT = oA.sTitle.replace(/^\s*(?:ad|pr|広告)\s?[:：]\s*(.+)$/i, '$1')
        .replace(/^\s*[\[［【](?:ad|pr|広告)[\]］】]\s*(.+)$/i, '$1')
        .replace(/^(.+)\s*[\[［【](?:ad|pr|広告)[\]］】]\s*$/i, '$1');
      for (var i2 = 0, j2 = aAd.length, a; i2 < j2; i2++) {
        if (!aAd[i2] || notType('Str', aAd[i2]) || aAd[i2].indexOf('<>') === -1) continue;
        else if (aAd[i2].slice(0, aAd[i2].lastIndexOf('<>')).indexOf(sT) !== -1) {
          a = aAd[i2].slice(aAd[i2].lastIndexOf('<>') + 2).split('@');
          if ((!eAc.length || bFoundCurrentArticle) && a.length === 2 && Number(a[1]) && $id('article_' + oA.sId) !== eExpandedCurrentArticle) {
            if (st.log) GM_log('remove ad: ' + oA.sTitle);
            target.removeChild($id('article_' + oA.sId));
            aAdId.push(oA.sId);
            nExcludes++;
            continue loop1;
          }
        }
      }
    }
    if (st.ng) {
      if (st.ad && reAd.test(oA.sTitle + '\n' + oA.sDesc) && oA.sDate && (oA.sDate.length <= 5 || (oA.sDate.length > 5 && new Date(oA.sDate).getTime() + 86400000 * 60 > Date.now()))) continue;
      for (var i3 = 0, j3 = aNg.length; i3 < j3; i3++) {
        sCa = checkArticle(aNg[i3], oA.sFeed, oA.sTitle, sArticleDU, sArticleTDU);
        if (sCa) {
          if (st.log) GM_log('remove: ' + oA.sTitle + ' / matching rule ' + sCa);
          target.removeChild($id('article_' + oA.sId));
          aNgId.push(oA.sId);
          nExcludes++;
          continue loop1;
        }
      }
    }
  }
  if ($id('unread_cnt_top')) $id('unread_cnt_top').setAttribute('data-ngcount', ' (' + (aNgId.length + aAdId.length) + ')');
  if (nArticles >= 50 && nExcludes / nArticles >= 0.8) {
    if (!bExclude) window.alert(LOC.t30);
    bExclude = true;
  }
};
var observer = new MutationObserver(mutation);

var createAdtable = function(type, flag) {
  var html = '',
    at = (aAdTemp || flag) ? aAdTemp.concat() : aAd.concat();
  switch (Number(type)) {
    case 0:
      at.sort(function(a, b) {
        var tA = a.slice(0, a.lastIndexOf('<>')),
          tB = b.slice(0, b.lastIndexOf('<>'));
        if (tA > tB) return 1;
        if (tA < tB) return -1;
        return 0;
      });
      break;
    case 1:
      at.sort(function(a, b) {
        var tA = a.slice(0, a.lastIndexOf('<>')),
          tB = b.slice(0, b.lastIndexOf('<>'));
        if (tA < tB) return 1;
        if (tA > tB) return -1;
        return 0;
      });
      break;
    case 2:
      at.sort(function(a, b) {
        var nA = a.slice(a.lastIndexOf('<>') + 2, -2),
          nB = b.slice(b.lastIndexOf('<>') + 2, -2);
        return Number(nB) - Number(nA);
      });
      break;
    case 3:
      at.sort(function(a, b) {
        var nA = a.slice(a.lastIndexOf('<>') + 2, -2),
          nB = b.slice(b.lastIndexOf('<>') + 2, -2);
        return Number(nA) - Number(nB);
      });
      break;
  }
  for (var i = 0, j = at.length, a, t, d; i < j; i++) {
    if (!at[i] || notType('Str', at[i]) || at[i].indexOf('<>') === -1) continue;
    t = at[i].slice(0, at[i].lastIndexOf('<>'));
    a = at[i].slice(at[i].lastIndexOf('<>') + 2).split('@');
    d = (a.length === 2 && Number(a[0]) >= 0) ? a[0] : '';
    if (!d) continue;
    html += '<div class="irf_tr"><div class="irf_ad_td1"><label><input id="irf_ad_switch_' + d + '" type="checkbox"' + (Number(a[1]) ? ' checked' : '') + ' value="' + a[1] + '" /><span title="' + LOC.t22 + ' : ' + new Date(Number(a[0])).toLocaleString() + '">' + t + '</span></label></div><div class="irf_ad_td2"><input id="irf_ad_remove_' + d + '" type="button" value="' + LOC.t12 + '" /></div></div>';
  }
  $id('irf_ad_table').innerHTML = html;
};

var setSettingsTab = function(s) {
  for (var t = ['ng', 'hi', 'ad', 'etc'], i = 0; i < 4; i++) {
    $id('irf_tab_' + t[i]).classList.remove('irf_tab_selected');
    $id('irf_form_' + t[i]).style.display = 'none';
  }
  $id('irf_tab_' + s).classList.add('irf_tab_selected');
  $id('irf_form_' + s).style.display = 'block';
  if (s === 'ng' || s === 'hi') {
    if ($id('irf_' + s + '_add_word').getBoundingClientRect().left > 0)
      $id('irf_' + s + '_add_word').focus();
    else if ($id('irf_' + s + '_ta').getBoundingClientRect().left > 0)
      $id('irf_' + s + '_ta').focus();
  }
};

var settingsMode = function(s) {
  var e = $id('irf_settings').getElementsByClassName('irf_advance');
  for (var i = 0, j = e.length; i < j; i++) {
    if (s === 'simple') e[i].classList.add('inoreader_filter_hide');
    else if (s === 'advance') e[i].classList.remove('inoreader_filter_hide');
  }
};

var viewSettings = function() {
  var se = $id('irf_settings');
  if (!se) return;
  if (se.style.display !== 'block') {
    setSettingsTab('ng');
    $id('irf_ng_add_bt').classList.add('inoreader_filter_hide');
    $id('irf_hi_add_bt').classList.add('inoreader_filter_hide');
    $id('irf_ng_fill_bt').classList.remove('inoreader_filter_hide');
    $id('irf_hi_fill_bt').classList.remove('inoreader_filter_hide');
    $id('irf_ng_cb').checked = st.ng;
    $id('irf_hi_cb').checked = st.hi;
    $id('irf_ad_cb').checked = st.ad;
    if (st.ng) $id('irf_ng_fs').removeAttribute('disabled');
    else $id('irf_ng_fs').setAttribute('disabled', '');
    if (st.hi) $id('irf_hi_fs').removeAttribute('disabled');
    else $id('irf_hi_fs').setAttribute('disabled', '');
    $id('irf_ng_add_word').value = '';
    $id('irf_hi_add_word').value = '';
    $id('irf_ng_add_feed').value = '';
    $id('irf_hi_add_feed').value = '';
    $id('irf_ng_add_title').value = '';
    $id('irf_hi_add_title').value = '';
    $id('irf_ng_ta').value = st.ngdata;
    $id('irf_hi_ta').value = st.hidata;
    $id('irf_ad_sort_type')[Number(st.adsort)].selected = true;
    if (st.mode === 'simple') $id('irf_etc_mode-s').checked = true;
    else if (st.mode === 'advance') $id('irf_etc_mode-a').checked = true;
    $id('irf_etc_key_settings').value = st.keywindow;
    $id('irf_etc_delimiter').value = st.delimiter;
    $id('irf_etc_log').checked = st.log;
    aAdTemp = null;
    createAdtable(st.adsort);
    settingsMode(st.mode);
    se.style.display = 'block';
    if ($id('irf_ng_add_word').getBoundingClientRect().left > 0) $id('irf_ng_add_word').focus();
    else if ($id('irf_ng_ta').getBoundingClientRect().left > 0) $id('irf_ng_ta').focus();
  } else {
    se.style.display = 'none';
    $id('irf_ok').removeAttribute('disabled');
  }
};

var loadSettings = function() {
  st = {};
  try {
    st = JSON.parse(localStorage.getItem('InoReaderFilter_settings')) || {};
  } catch (er) {
    alert('InoReaderFilter Error: Load Settings');
  }
  if (notType('Num', st.format)) st.format = 1;
  if (notType('Boo', st.ng)) st.ng = true;
  if (notType('Boo', st.hi)) st.hi = true;
  if (notType('Boo', st.ad)) st.ad = true;
  if (notType('Str', st.ngdata)) st.ngdata = '';
  if (notType('Str', st.hidata)) st.hidata = '';
  if (notType('Num', st.adcount)) st.adcount = 0;
  if (notType('Num', st.adsort)) st.adsort = 0;
  if (notType('Str', st.mode)) st.mode = 'simple';
  if (notType('Str', st.keywindow)) st.keywindow = 'F';
  if (notType('Str', st.delimiter)) st.delimiter = '<>';
  if (notType('Boo', st.log)) st.log = false;
  convertRules();
};

var saveSettings = function(flag) {
  try {
    localStorage.setItem('InoReaderFilter_settings', JSON.stringify(st));
  } catch (er) {
    alert('InoReaderFilter Error: Save Settings');
  }
  if (!flag) convertRules();
};

var loadAddata = function() {
  try {
    aAd = JSON.parse(localStorage.getItem('InoReaderFilter_addata')) || [];
  } catch (er) {}
};

var saveAddata = function(a) {
  if (aAdTemp) {
    aAd = aAdTemp.concat();
    aAdTemp = null;
  }
  try {
    localStorage.setItem('InoReaderFilter_addata', JSON.stringify(a));
  } catch (er) {
    alert('InoReaderFilter Error: Save AdData');
  }
  loadAddata();
};

var init = function() {
  if (!target) return;
  loadSettings();
  loadAddata();
  var CSS =
    '#unread_cnt_top:after { content: attr(data-ngcount); }' +
    '.inoreader_filter_highlight span[id^="at_"], .inoreader_filter_highlight a[id^="article_title_link_"], .inoreader_filter_highlight .article_title_link { color: #B65F06; }' +
    '.inoreader_filter_hide { display: none; }' +
    '#irf_settings { display: none; color: black; padding: 0; position: absolute; top: 48px; left: 48px; z-index: 90300; background: rgba(255, 255, 255, 0.98); border: 1px solid #999999; border-radius: 4px; box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); min-width: 20em; }' +
    '#irf_settings input[type="button"] { font-size: 90%; height: 2em; }' +
    '#irf_titlebar { background-color: #666666; border-radius: 4px 4px 0 0; padding: 2px 0 0 4px; height: 2em; -moz-user-select: none; -webkit-user-select: none; }' +
    '#irf_title a { font-weight: bold; color: white; text-decoration: none; }' +
    '#irf_title a:hover { color: #FF9; }' +
    '#irf_title_btn { position: absolute; top: 2px; right: 4px; }' +
    '#irf_desc { padding: 0 0.5em; margin: 0.5em 0 1em 0; }' +
    '#irf_tab { padding: 0 0.5em; margin-top: 1em; }' +
    '#irf_tab span { background-color: #E9E9E9; border: 1px solid #999999; padding: 3px 16px; border-radius: 4px 4px 0 0; cursor: pointer; }' +
    '#irf_tab span:hover { background-color: #F3F3F3; }' +
    '#irf_tab .irf_tab_selected, #irf_tab .irf_tab_selected:hover { background-color: #FFFFFF; border-bottom-color: #FFFFFF; }' +
    '#irf_form { padding: 8px 4px 4px 4px; border-top: 1px solid #999999; margin-top: 2px; }' +
    '#irf_form input[type="checkbox"], #irf_form input[type="radio"] { vertical-align: inherit; }' +
    '#irf_form input[type="checkbox"] { margin: 2px 4px 2px 0; }' +
    '#irf_form label { vertical-align: top; }' +
    '#irf_form textarea { margin: 0; width: 100%; height: 270px; }' +
    '#irf_form input, #irf_form textarea { color: black; }' +
    '#irf_form fieldset { padding: 4px; margin: 0 0 0.5em 0; border-color: #999; min-width: 490px; }' +
    '#irf_form fieldset:disabled > label { color: gray; }' +
    '#irf_form fieldset:disabled input, #irf_form fieldset:disabled textarea { color: #666666; background-color: #EEEEEE; }' +
    '#irf_form fieldset + fieldset { margin: 0.5em auto; }' +
    '#irf_form_hi, #irf_form_ad, #irf_form_etc { display: none; }' +
    '#irf_form_etc input[type="checkbox"] { margin: 2px 4px 2px 2px; }' +
    '.irf_form_add-row-button { text-align: right; }' +
    '.irf_form_add-row-input + .irf_form_add-row-caption, .irf_form_add-row-input + .irf_form_add-row-button { margin-top: 0.5em; }' +
    '.irf_form_add-row-textarea { margin-top: 1em; }' +
    '.inoreader_filter_hide + .irf_form_add-row-textarea { margin-top: 0; }' +
    '.irf_form_add-input { width: 95%; }' +
    '.irf_form_add-button:active { position:relative; top:1px; }' +
    '.irf_table_wrapper { max-height: 440px; overflow-y: scroll; }' +
    '.irf_table { display: table; width: 100%; }' +
    '.irf_tr { display: table-row; border: 1px solid red; }' +
    '.irf_tr:hover div { background-color: #EFEFEF; }' +
    '#irf_ad_sort { margin-left: 2em; font-weight: normal; }' +
    '#irf_ad_sort_type { padding: 0; margin-top: -4px; }' +
    '.irf_ad_td1, .irf_ad_td2 { display: table-cell; padding: 4px 2px; }' +
    '.irf_ad_td1 { max-width: 50em; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }' +
    '.irf_ad_td2 { width: 5em; }' +
    '.irf_ad_td2 input { width: 4.8em; }' +
    '#irf_etc_key_settings { width: 7ex; text-align: center; margin: 0 0.5em; }' +
    '#irf_ok { margin-right: 0.5em; padding: 0 2em; }' +
    '#irf_cancel { padding: 0 1ex; }' +
    '#irf_ok, #irf_cancel { width: 8em; }' +
    '.irf_form_add-button { width: 12em; }' +
    '#irf_form textarea, .irf_form_add-input { width: -moz-available; width: -webkit-fill-available; width: available; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; }';
  if ($id('sb_rp_settings_menu')) {
    CSS += '.inoreader_filter_adarticle:before { font-family: "InoReader-UI-Icons-Font"; content: "\\e652"; padding-right: 5px; }';
  } else if ($id('read_articles_button')) {
    var img = $id('read_articles_button').firstChild;
    if (img && img.hasAttribute('src')) {
      CSS += '.inoreader_filter_adarticle:before { background: url("' + img.getAttribute('src') + '") no-repeat; content: " "; padding: 0 10px; }';
    }
  }
  GM_addStyle(CSS);
  var LOCALE_JA = {
    t00: '設定',
    t01: 'ＯＫ',
    t02: 'キャンセル',
    t03: 'ＮＧワード',
    t04: 'ハイライト',
    t05: '広告記事',
    t06: 'その他',
    t07: 'フィード・フォルダ・タグ',
    t08: '記事タイトル',
    t09: '記事タイトル・記事概要・記事URL',
    t10: '記事概要・記事URL',
    t11: 'ルールを追加',
    t12: '削除',
    t13: '設定モード',
    t14: 'シンプル',
    t15: 'アドバンス',
    t16: '区切り文字',
    t17: 'コンソールにログを表示',
    t18: '選択記事をフォームに記入',
    t19: '累計',
    t20: 'ソート',
    t21: 'タイトル',
    t22: '登録日時',
    t23: '昇順',
    t24: '降順',
    t25: '新しい順',
    t26: '古い順',
    t27: 'ショートカットキー',
    t28: '設定欄の開閉',
    t29: 'キー',
    t30: '消去した記事が多すぎるので、InoReader Filterは記事を消去する機能を一時的に無効化しました。NGワードの設定を確認して下さい。'
  };
  var LOCALE_EN = {
    t00: 'Settings',
    t01: 'OK',
    t02: 'Cancel',
    t03: 'Exclude words',
    t04: 'Highlight words',
    t05: 'Advertising articles',
    t06: 'Etc',
    t07: 'Feed, folder, tag',
    t08: 'Article title',
    t09: 'Article title, summary, url',
    t10: 'Article summary, url',
    t11: 'Add rule',
    t12: 'Remove',
    t13: 'Setting mode',
    t14: 'Simple',
    t15: 'Advanced',
    t16: 'Delimiter',
    t17: 'View Log to console',
    t18: 'Fill in the selected article',
    t19: 'cumulative total',
    t20: 'Sort by',
    t21: 'Title',
    t22: 'Registered date',
    t23: 'A-Z',
    t24: 'Z-A',
    t25: 'newest',
    t26: 'oldest',
    t27: 'Shortcut keys',
    t28: 'Open/close the settings',
    t29: 'key',
    t30: 'Articles that was removed is too many. InoReader Filter has temporarily disabled the ability to remove the articles. Please check the settings of the exclude words.'
  };
  LOC = (window.navigator.language === 'ja') ? LOCALE_JA : LOCALE_EN;

  var div = document.createElement('div');
  var html = '<div id="irf_titlebar"><div id="irf_title"><a href="https://userscripts.org/scripts/show/352673" target="_blank">InoReader Filter ' + LOC.t00 + '</a></div><div id="irf_title_btn"><input id="irf_ok" type="button" value="' + LOC.t01 + '" /><input id="irf_cancel" type="button" value="' + LOC.t02 + '" /></div></div><div id="irf_tab"><span id="irf_tab_ng" class="irf_tab_selected">' + LOC.t03 + '</span><span id="irf_tab_hi">' + LOC.t04 + '</span><span id="irf_tab_ad" class="irf_advance">' + LOC.t05 + '</span><span id="irf_tab_etc">' + LOC.t06 + '</span></div><div id="irf_form">';
  html += '<div id="irf_form_ng"><fieldset id="irf_ng_fs"><legend><label><input id="irf_ng_cb" type="checkbox" />' + LOC.t03 + '</label></legend><div class="irf_advance"><div class="irf_form_add-row-caption">' + LOC.t07 + ' :</div><div class="irf_form_add-row-input"><input id="irf_ng_add_feed" class="irf_form_add-input" type="input" /></div><div class="irf_form_add-row-caption">' + LOC.t08 + ' :</div><div class="irf_form_add-row-input"><input id="irf_ng_add_title" class="irf_form_add-input" type="input" /></div><div id="irf_ng_add_word-caption" class="irf_form_add-row-caption">' + LOC.t09 + ' :</div><div class="irf_form_add-row-input"><input id="irf_ng_add_word" class="irf_form_add-input" type="input" /></div><div class="irf_form_add-row-button"><input id="irf_ng_fill_bt" class="irf_form_fill-button" value="' + LOC.t18 + '" type="button" /><input id="irf_ng_add_bt" class="irf_form_add-button" value="' + LOC.t11 + '" type="button" /></div></div><div class="irf_form_add-row-textarea"><textarea id="irf_ng_ta"></textarea></div></fieldset></div>';
  html += '<div id="irf_form_hi"><fieldset id="irf_hi_fs"><legend><label><input id="irf_hi_cb" type="checkbox" />' + LOC.t04 + '</label></legend><div class="irf_advance"><div class="irf_form_add-row-caption">' + LOC.t07 + ' :</div><div class="irf_form_add-row-input"><input id="irf_hi_add_feed" class="irf_form_add-input" type="input" /></div><div class="irf_form_add-row-caption">' + LOC.t08 + ' :</div><div class="irf_form_add-row-input"><input id="irf_hi_add_title" class="irf_form_add-input" type="input" /></div><div id="irf_hi_add_word-caption" class="irf_form_add-row-caption">' + LOC.t09 + ' :</div><div class="irf_form_add-row-input"><input id="irf_hi_add_word" class="irf_form_add-input" type="input" /></div><div class="irf_form_add-row-button"><input id="irf_hi_fill_bt" class="irf_form_fill-button" value="' + LOC.t18 + '" type="button" /><input id="irf_hi_add_bt" class="irf_form_add-button" value="' + LOC.t11 + '" type="button" /></div></div><div class="irf_form_add-row-textarea"><textarea id="irf_hi_ta"></textarea></div></fieldset></div>';
  html += '<div id="irf_form_ad" class="irf_advance"><fieldset id="irf_ad_fs"><legend id="irf_ad_legend" title="' + LOC.t19 + ' : ' + st.adcount + '"><label><input id="irf_ad_cb" type="checkbox" />' + LOC.t05 + '</label><span id="irf_ad_sort">( ' + LOC.t20 + ' : <select id="irf_ad_sort_type"><option value="0">' + LOC.t21 + ' ( ' + LOC.t23 + ' )</option><option value="1">' + LOC.t21 + ' ( ' + LOC.t24 + ' )</option><option value="2">' + LOC.t22 + ' ( ' + LOC.t25 + ' )</option><option value="3">' + LOC.t22 + ' ( ' + LOC.t26 + ' )</option></select> )</span></legend><div id="irf_ad_table_wrapper" class="irf_table_wrapper"><div id="irf_ad_table" class="irf_table"></div></div></fieldset></div>';
  html += '<div id="irf_form_etc"><fieldset id="irf_etc_mode_fs"><legend>' + LOC.t13 + '</legend><label><input id="irf_etc_mode-s" name="irf_etc_mode_r" type="radio" value="simple" />' + LOC.t14 + '</label><label><input id="irf_etc_mode-a" name="irf_etc_mode_r" type="radio" value="advance" />' + LOC.t15 + '</label></fieldset><div class="irf_advance"><fieldset><legend>' + LOC.t27 + '</legend><label>' + LOC.t28 + ' : Ctrl+Shift+<input id="irf_etc_key_settings" type="text" maxlength="1" />' + LOC.t29 + '</label></fieldset><fieldset id="irf_etc_delimiter_fs"><legend>' + LOC.t16 + '</legend><input id="irf_etc_delimiter" type="input" /></fieldset><label><input id="irf_etc_log" type="checkbox">' + LOC.t17 + '</label></div></div>';
  html += '</div>';
  div.innerHTML = html;
  div.id = 'irf_settings';
  document.body.appendChild(div);

  var menu = $id('sb_rp_settings_menu'),
    pqm = $id('preferences_quick_main'),
    item = document.createElement('div');
  item.id = 'irf_settings-menu';
  item.innerHTML = 'Filter ' + LOC.t00;
  if (menu) {
    item.className = 'inno_toolbar_button_menu_item';
    var menuList = menu.children;
    if (!menuList[menuList.length - 1].id) {
      var line = document.createElement('div');
      line.className = 'inno_toolbar_button_menu_line';
      menu.insertBefore(line, menu.lastChild.nextSibling);
    }
    menu.insertBefore(item, menu.lastChild.nextSibling);
  } else if ($id('quick_options') && pqm) {
    item.className = 'quick_options_link';
    pqm.insertBefore(item, pqm.lastChild.nextSibling);
  }
  if ($id('irf_settings-menu')) {
    $id('irf_settings-menu').addEventListener('click', function() {
      viewSettings();
    }, false);
  }

  for (var i = 0, a; i < aAd.length; i++) {
    if (!aAd[i] || notType('Str', aAd[i]) || aAd[i].indexOf('<>') === -1) continue;
    a = aAd[i].slice(aAd[i].lastIndexOf('<>') + 2).split('@');
    if (a.length === 2 && (Date.now() > new Date(Number(a[0]) + (86400000 * 60)).getTime())) {
      if (st.log) GM_log('unregister ad: ' + aAd[i].slice(0, aAd[i].lastIndexOf('<>')));
      aAd.splice(i, 1);
    }
  }
  saveAddata(aAd);

  var addRule = function(f, t, w) {
    var word = '';
    if (f) {
      word = f + st.delimiter;
      if (t) {
        word += t + st.delimiter;
        if (w) word += w;
      } else if (w) word += st.delimiter + w;
    } else if (t) {
      word = st.delimiter + t + st.delimiter;
      if (w) word += w;
    } else if (w) word = w;
    return word + '\n';
  };

  var clickAddButton = function(s) {
    var sF = $id('irf_' + s + '_add_feed').value,
      sT = $id('irf_' + s + '_add_title').value,
      sW = $id('irf_' + s + '_add_word').value;
    if (!sT && !sW) return;
    var sData = $id('irf_' + s + '_ta').value,
      sRule = addRule(sF, sT, sW);
    if (sData.indexOf(sRule) === -1) {
      $id('irf_' + s + '_ta').value += (!sData || /(?:\r\n|\n|\r)$/.test(sData)) ? sRule : '\n' + sRule;
    }
    $id('irf_' + s + '_add_feed').value = '';
    $id('irf_' + s + '_add_title').value = '';
    $id('irf_' + s + '_add_word').value = '';
    $id('irf_' + s + '_add_word-caption').textContent = LOC.t09 + ' :';
    if (s === 'ng') {
      $id('irf_ng_add_bt').classList.add('inoreader_filter_hide');
      $id('irf_ng_fill_bt').classList.remove('inoreader_filter_hide');
    } else if (s === 'hi') {
      $id('irf_hi_add_bt').classList.add('inoreader_filter_hide');
      $id('irf_hi_fill_bt').classList.remove('inoreader_filter_hide');
    }
  };

  var checkAd = function() {
    var eSa = $id('subscriptions_articles') || $id('reader_pane'),
      bUnregistered = true;
    if (!eSa) return;
    var eAc = currentExpandedArticle();
    if (!eAc.length) return;
    var sId = (eAc[0].id) ? eAc[0].id.slice(eAc[0].id.lastIndexOf('_') + 1) : '';
    if (!sId) return;
    var eTitle = $id('at_' + sId) || $id('article_title_link_' + sId),
      sTitle = (eTitle) ? eTitle.textContent : '';
    if (!sTitle) return;
    for (var i = 0, j = aAd.length; i < j; i++) {
      if (!aAd[i] || notType('Str', aAd[i]) || aAd[i].indexOf('<>') === -1) continue;
      if (sTitle === aAd[i].slice(0, aAd[i].lastIndexOf('<>'))) {
        bUnregistered = false;
        break;
      }
    }
    if (bUnregistered && reAd.test(sTitle)) {
      aAd.push(sTitle + '<>' + Date.now() + '@1');
      aAd.sort(function(a, b) {
        return a - b;
      });
      if ($id('at_' + sId)) $id('at_' + sId).classList.add('inoreader_filter_adarticle');
      if ($id('article_title_link_' + sId)) $id('article_title_link_' + sId).classList.add('inoreader_filter_adarticle');
      if (st.log) GM_log('register ad: ' + sTitle);
      saveAddata(aAd);
      st.adcount++;
      saveSettings(true);
      $id('irf_ad_legend').setAttribute('title', LOC.t19 + ' : ' + st.adcount);
    }
  };

  var escRe = function(s) {
    return s.replace(/[.+\^=!:${}()|\[\]\/\\]/g, '\\$&');
  };

  $id('irf_settings').addEventListener('click', function(e) {
    var tId = e.target.id;
    if (!tId) return;
    if (e.target.nodeName === 'INPUT' && e.target.getAttribute('type') === 'button') {
      e.target.blur();
    }
    if (tId === 'irf_ok') {
      var problem = false,
        delim = $id('irf_etc_delimiter').value,
        keyWin = $id('irf_etc_key_settings').value;
      st.ng = $id('irf_ng_cb').checked;
      st.ngdata = $id('irf_ng_ta').value;
      st.hi = $id('irf_hi_cb').checked;
      st.hidata = $id('irf_hi_ta').value;
      st.ad = $id('irf_ad_cb').checked;
      st.adsort = $id('irf_ad_sort_type').selectedIndex;
      if ($id('irf_etc_mode-s').checked) st.mode = 'simple';
      else if ($id('irf_etc_mode-a').checked) st.mode = 'advance';
      if (keyWin.length === 1) {
        if (/^[A-Za-z0-9]$/.test(keyWin)) st.keywindow = keyWin.toUpperCase();
        else {
          problem = true;
          setSettingsTab('etc');
          $id('irf_etc_key_settings').focus();
        }
      } else {
        $id('irf_etc_key_settings').value = 'F';
        st.keywindow = 'F';
      }
      if (delim) {
        if (/[.+\^=!:${}()|\[\]\/\\]/.test(delim)) {
          problem = true;
          setSettingsTab('etc');
          $id('irf_etc_delimiter').focus();
        } else st.delimiter = $id('irf_etc_delimiter').value;
      } else st.delimiter = '<>';
      st.log = $id('irf_etc_log').checked;
      if (!problem) {
        viewSettings();
        saveSettings();
        saveAddata((aAdTemp) ? aAdTemp : aAd);
      }
    } else if (tId === 'irf_cancel') {
      viewSettings();
    } else if (tId.indexOf('irf_tab_') !== -1) {
      var sId = tId.slice(tId.indexOf('irf_tab_') + 8);
      if (sId) setSettingsTab(sId);
    } else if (tId.indexOf('irf_etc_mode-') !== -1) {
      if (tId === 'irf_etc_mode-s') settingsMode('simple');
      else if (tId === 'irf_etc_mode-a') settingsMode('advance');
    } else if (/^irf_(?:ng|hi)_fill_bt$/.test(tId)) {
      var eAc = currentArticle(),
        sT = currentTreeName(),
        sF = '',
        sW = '';
      if (!eAc.length) return;
      var oA = articleData(eAc[0]);
      if (sT && oA.sFeed && sT !== oA.sFeed) sF = '/^' + escRe(sT) + '$|^' + escRe(oA.sFeed) + '$/';
      else if (sT) sF = sT;
      else if (oA.sFeed) sF = oA.sFeed;
      if (oA.sDesc) sW = '/^' + escRe(oA.sDesc) + '$|^' + escRe(oA.sUrl) + '$/';
      else sW = oA.sUrl;
      if (tId === 'irf_ng_fill_bt') {
        $id('irf_ng_add_feed').value = sF;
        $id('irf_ng_add_title').value = oA.sTitle;
        $id('irf_ng_add_word').value = sW;
        $id('irf_ng_add_bt').classList.remove('inoreader_filter_hide');
        $id('irf_ng_fill_bt').classList.add('inoreader_filter_hide');
      } else if (tId === 'irf_hi_fill_bt') {
        $id('irf_hi_add_feed').value = sF;
        $id('irf_hi_add_title').value = oA.sTitle;
        $id('irf_hi_add_word').value = sW;
        $id('irf_hi_add_bt').classList.remove('inoreader_filter_hide');
        $id('irf_hi_fill_bt').classList.add('inoreader_filter_hide');
      }
    } else if (tId === 'irf_ng_add_bt') {
      clickAddButton('ng');
    } else if (tId === 'irf_hi_add_bt') {
      clickAddButton('hi');
    } else if (/^irf_ad_switch_|^irf_ad_remove_/.test(tId)) {
      if (!aAdTemp) aAdTemp = aAd.concat();
      for (var i = 0, j = aAdTemp.length, a, t, d; i < j; i++) {
        if (!aAdTemp[i] || notType('Str', aAdTemp[i]) || aAdTemp[i].indexOf('<>') === -1) continue;
        t = aAdTemp[i].slice(0, aAdTemp[i].lastIndexOf('<>'));
        a = aAdTemp[i].slice(aAdTemp[i].lastIndexOf('<>') + 2).split('@');
        d = (a.length === 2 && Number(a[0]) >= 0) ? a[0] : '';
        if (d && tId.slice(14) === d) {
          if (/^irf_ad_switch_/.test(tId)) {
            aAdTemp[i] = aAdTemp[i].replace(/@\d$/, '@' + (a[1] === '1' ? '0' : '1'));
          } else if (/^irf_ad_remove_/.test(tId)) {
            aAdTemp.splice(i, 1);
          }
          createAdtable($id('irf_ad_sort_type').selectedIndex, true);
          break;
        }
      }
    }
  }, false);

  $id('irf_ng_cb').addEventListener('click', function(e) {
    if (e.target.checked) $id('irf_ng_fs').removeAttribute('disabled');
    else $id('irf_ng_fs').setAttribute('disabled', '');
  }, false);

  $id('irf_hi_cb').addEventListener('click', function(e) {
    if (e.target.checked) $id('irf_hi_fs').removeAttribute('disabled');
    else $id('irf_hi_fs').setAttribute('disabled', '');
  }, false);

  $id('irf_titlebar').addEventListener('dblclick', function(e) {
    if (e.target.nodeName === 'DIV') {
      $id('irf_tab').classList.toggle('inoreader_filter_hide');
      $id('irf_form').classList.toggle('inoreader_filter_hide');
      $id('irf_title_btn').classList.toggle('inoreader_filter_hide');
    }
  }, false);

  $id('irf_settings').addEventListener('input', function(e) {
    if (e.target.id === 'irf_ng_add_title') {
      if (e.target.value) $id('irf_ng_add_word-caption').textContent = LOC.t10 + ' :';
      else $id('irf_ng_add_word-caption').textContent = LOC.t09 + ' :';
    } else if (e.target.id === 'irf_hi_add_title') {
      if (e.target.value) $id('irf_hi_add_word-caption').textContent = LOC.t10 + ' :';
      else $id('irf_hi_add_word-caption').textContent = LOC.t09 + ' :';
    }
    if ($id('irf_tab_ng').classList.contains('irf_tab_selected')) {
      if ($id('irf_ng_add_feed').value || $id('irf_ng_add_title').value || $id('irf_ng_add_word').value) {
        $id('irf_ng_add_bt').classList.remove('inoreader_filter_hide');
        $id('irf_ng_fill_bt').classList.add('inoreader_filter_hide');
      } else {
        $id('irf_ng_add_bt').classList.add('inoreader_filter_hide');
        $id('irf_ng_fill_bt').classList.remove('inoreader_filter_hide');
      }
    } else if ($id('irf_tab_hi').classList.contains('irf_tab_selected')) {
      if ($id('irf_hi_add_feed').value || $id('irf_hi_add_title').value || $id('irf_hi_add_word').value) {
        $id('irf_hi_add_bt').classList.remove('inoreader_filter_hide');
        $id('irf_hi_fill_bt').classList.add('inoreader_filter_hide');
      } else {
        $id('irf_hi_add_bt').classList.add('inoreader_filter_hide');
        $id('irf_hi_fill_bt').classList.remove('inoreader_filter_hide');
      }
    }
  }, false);

  $id('irf_ad_sort_type').addEventListener('change', function() {
    createAdtable($id('irf_ad_sort_type').selectedIndex);
  }, false);

  $id('reader_pane').addEventListener('click', function() {
    checkAd();
  }, false);

  document.addEventListener('keyup', function(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode === st.keywindow.charCodeAt()) viewSettings();
    else if (/input|textarea/i.test(e.target.tagName)) return;
    checkAd();
  }, true);

  mutation();
  observer.observe(target, config);
};

iInit = window.setInterval(function() {
  if ($id('tree') && $id('tree').innerHTML) {
    window.clearInterval(iInit);
    init();
  }
}, 500);

})();

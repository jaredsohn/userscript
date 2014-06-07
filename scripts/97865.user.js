// ==UserScript==
// @name           the Paper Link for PubMed
// @namespace      userscripts.org/scripts/show/97865
// @description    List the direct PDF link next to each search result in PubMed, enhanced with F1000 scores, Journal Impact Factors and more...
// @include        http://www.ncbi.nlm.nih.gov/pubmed*
// @include        https://www.ncbi.nlm.nih.gov/pubmed*
// @include        http://thepaperlink.appspot.com/reg
// @include        http://pubmeder.appspot.com/registration
// @include        https://thepaperlink.appspot.com/reg
// @include        https://pubmeder.appspot.com/registration
// @exclude        http://www.ncbi.nlm.nih.gov/pubmed/
// @exclude        https://www.ncbi.nlm.nih.gov/pubmed/
// ==/UserScript==

// Liang Cai, 2011 Feb, Mar
// http://cail.cn
//
//  - inspired by pubmedplus, http://userscripts.org/scripts/show/66950
//  - inspired by PubMed Citations, http://userscripts.org/scripts/show/13704
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey from http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "the Paper Link for PubMed", and click Uninstall.
//
// --------------------------------------------------------------------

var thisVersion = '0.19';

var notRun = 0;
if (!GM_xmlhttpRequest) {
  alert('Please upgrade to the latest version of Greasemonkey.');
  notRun = 1;
}

// storage data for access the api server
if (document.URL === 'http://thepaperlink.appspot.com/reg' || document.URL === 'https://thepaperlink.appspot.com/reg') {
  var apikey = document.getElementById('apikey').innerHTML;
  GM_setValue('thepaperlink_apikey', apikey);
  notRun = 1;
}
var apikey = GM_getValue('thepaperlink_apikey');
if (apikey === undefined) {
  alert('This userscript uses API from http://thepaperlink.appspot.com');
  GM_openInTab('http://thepaperlink.appspot.com/reg');
  apikey = 'G0oasfw0382Wd3oQ0l1LiWzE'; // temp apikey, may disabled in the future on the server
  GM_setValue('thepaperlink_apikey', apikey);
}

// storage data for access the bookmark server
if (document.URL === 'http://pubmeder.appspot.com/registration' || document.URL === 'https://pubmeder.appspot.com/registration') {
  var email = document.getElementById('currentUser').innerHTML;
  var save_key = document.getElementById('apikey_pubmeder').innerHTML;
  GM_setValue('pubmeder_save_key', save_key);
  GM_setValue('pubmeder_email', email);
  notRun = 1;
}
var save_key = GM_getValue('pubmeder_save_key');
var email = GM_getValue('pubmeder_email');
var tail = '';
if ((save_key !== undefined) && (email !== undefined)) {
  tail = '&apikey=' + save_key + '&email=' + email;
}
var oneTimeReminder = GM_getValue('pubmeder_oneTimeReminder');
if (oneTimeReminder === undefined) {
  GM_setValue('pubmeder_oneTimeReminder', '99');
}
var d = new Date();
var currentDate = d.getDate();
if (oneTimeReminder !== currentDate && save_key === undefined) {
  var x = window.confirm('You have to create an account on \"pubmeder at appspot.com\" to bookmark the paper');
  if (x) { GM_openInTab('http://pubmeder.appspot.com/registration'); }
  GM_setValue('pubmeder_oneTimeReminder', currentDate);
}

var dayCheck = GM_getValue('thepaperlink_dayCheck');
if (dayCheck === undefined) {
  GM_setValue('thepaperlink_dayCheck', '99');
}
var goNew = 0;
var singleScript = 0;
if (dayCheck !== currentDate) {
  goNew = 1;
  singleScript = 1;
  GM_setValue('thepaperlink_dayCheck', currentDate);
}

var total = 0;
var pmids = '';
var pmidArray = [];
var old_title = '';
var title_pos = 0;
var search_term = '';

function t(n) { return document.getElementsByTagName(n); }
function $(d) { return document.getElementById(d); }

function checkForMultipleScripts() { // modified from http://userscripts.org/scripts/show/13704
  var dupComments = 0, i;
  for (i = 0; i < t('div').length; i += 1) {
    if (t('div')[i].className === 'thepaperlink') {
      dupComments += 1;
    }
  }
  if (dupComments > (total + 1)) {
    alert('It looks like you have multiple versions of this script running. To delete the old one, go to go to Tools -> Greasemonkey -> Manage User Scripts..., then select the old script and click the Uninstall button at the bottom.');
    singleScript = 0;
  }
}

function checkForUpdates() { // modified from http://userscripts.org/scripts/show/13704
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://userscripts.org/scripts/review/97865',
    onload: function (response) {
      var scriptPage = response.responseText, cv = /var thisVersion = \'([\d\.]+)\';/;
      if (cv.test(scriptPage)) {
        var newVersion = cv.exec(scriptPage)[1];
        if (newVersion !== thisVersion) {
          var x = window.confirm(' There is a new version of the Paper Link for PubMed (v'
                + newVersion + ') available. \n You are currently using version '
                + thisVersion + '. \n \n Click \"OK\" to view and install it.');
          if (x) { GM_openInTab('http://userscripts.org/scripts/show/97865'); }
        }
      }
      goNew = 0;
    }
  });
}

function getPmid(zone, num) {
  var a = t(zone)[num].textContent, regpmid = /PMID:\s(\d+)\s/, ID;
  if (regpmid.test(a)) {
    ID = regpmid.exec(a);
    if (ID[1]) {
      if (t(zone)[num].className === 'rprt_all') {
        t(zone)[num - 1].setAttribute('id', ID[1]);
      } else {
        t(zone)[num + 2].setAttribute('id', ID[1]);
      }
      total += 1;
      pmids += ',' + ID[1];
    }
  }
}

function formatJson(r) {
  var div, i, j, k, styles = '.thepaperlink {'
    + '  background: #e0ecf1;'
    + '  border:2px solid #dedede; border-top:2px solid #eee; border-left:2px solid #eee;'
    + '  padding: 2px 4px;'
    + '  -moz-border-radius: 4px;'
    + '  display: inline-block'
    + '}'
    + '.thepaperlink > a ,'
    + '.thepaperlink > span {'
    + '  margin: 0 6px'
    + '}'
    + 'a.thepaperlink-green {'
    + '  color: green'
    + '}'
    + 'a.thepaperlink-red {'
    + '  color: red'
    + '}'
    + '.thepaperlink-home {'
    + '  color: grey;'
    + '  text-decoration: none;'
    + '  cursor: pointer'
    + '}', bookmark_div = '<div id="css_loaded"></div>';
  if (tail) {
    bookmark_div = '<div id="css_loaded" class="thepaperlink" style="margin-left:10px;font-size:80%;font-weight:normal"><span id="thepaperlink_saveAll" onclick="saveIt(\'' + pmids + '\',\'' + save_key + '\',\'' + email + '\')">save all</span>';
  }
  if (!document.getElementById('css_loaded')) {
    GM_addStyle(styles);
  }
  if (tail && old_title) {
    t('h2')[title_pos].innerHTML = old_title + bookmark_div;
  } else {
    t('h2')[title_pos].innerHTML = old_title;
  }
  for (i = 0; i < r.count; i += 1) {
    div = document.createElement('div');
    div.className = 'thepaperlink';
    div.innerHTML = '<a class="thepaperlink-home" href="http://thepaperlink.appspot.com/?q=pmid:' + r.item[i].pmid + '" target="_blank">the Paper Link</a>: ';
    if (r.item[i].slfo && r.item[i].slfo !== '~' && parseFloat(r.item[i].slfo) > 0) {
      div.innerHTML += '<span>impact factor ' + r.item[i].slfo + '</span>';
    }
    if (r.item[i].pdf) {
      div.innerHTML += '<a id="thepaperlink_pdf' + r.item[i].pmid + '" class="thepaperlink-green" href="' + r.item[i].pdf + '" target="_blank">direct pdf</a>';
    }
    if (r.item[i].pmcid) {
      div.innerHTML += '<a id="thepaperlink_pmc' + r.item[i].pmid + '" href="https://www.ncbi.nlm.nih.gov/pmc/articles/' + r.item[i].pmcid + '/?tool=thepaperlinkClient" target="_blank">free article</a>';
    }
    if (r.item[i].doi) {
      div.innerHTML += '<a id="thepaperlink_doi' + r.item[i].pmid + '" href="http://dx.doi.org/' + r.item[i].doi + '" target="_blank">external page</a>';
    }
    if (r.item[i].f_v && r.item[i].fid) {
      div.innerHTML += '<a id="thepaperlink_f' + r.item[i].pmid + '" class="thepaperlink-red" href="http://f1000.com/' + r.item[i].fid + '" target="_blank">f1000 score ' + r.item[i].f_v + '</a>';
    }
    if (tail) {
      div.innerHTML += '<span id="thepaperlink_save' + r.item[i].pmid + '" onclick="saveIt(\'' + r.item[i].pmid + '\',\'' + save_key + '\',\'' + email + '\')">save it</span>';
    }
    if (apikey !== 'G0oasfw0382Wd3oQ0l1LiWzE') {
      div.innerHTML += '<span id="thepaperlink_rpt' + r.item[i].pmid + '" class="thepaperlink-home" onclick="show_me_the_money(\'' + r.item[i].pmid + '\',\'' + apikey + '\')">?</span>';
    }
    $(r.item[i].pmid).appendChild(div);
    k = pmidArray.length;
    for (j = 0; j < k; j += 1) {
      if (r.item[i].pmid === pmidArray[j]) {
        pmidArray = pmidArray.slice(0, j).concat(pmidArray.slice(j + 1, k));
      }
    }
  }
  if (pmidArray.length > 0) {
    t('h2')[title_pos].innerHTML = old_title + bookmark_div + '&nbsp;&nbsp;<img src="https://thepaperlink.appspot.com/static/loadingLine.gif" width="16" height="11" alt="loading icon on the server" />';
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://thepaperlink.appspot.com/api?pmid=' + pmidArray.join(',') + '&apikey=' + apikey,
      onload: function (response) {
        json = JSON.parse(response.responseText);
        formatJson(json);
      }
    });
  }
}

function getJson(pmids) {
  var ns, nss, url = 'https://thepaperlink.appspot.com/api?flash=yes&a=userscript&apikey=' + apikey + '&pmid=' + pmids, i;
  if (search_term) {
    url += '&w=' + search_term;
  }
  for (i = 0; i < t('h2').length; i += 1) {
    if (t('h2')[i].className === 'result_count') {
      old_title = t('h2')[i].innerHTML;
      title_pos = i;
      if (old_title) {
        t('h2')[i].innerHTML = old_title + '<span style="font-weight:normal;font-style:italic"> ... loading data from "the Paper Link"</span>&nbsp;&nbsp;<img src="https://thepaperlink.appspot.com/static/loadingLine.gif" width="16" height="11" alt="loading icon on the server" />';
      }
    }
  }
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function (response) {
      json = JSON.parse(response.responseText);
      formatJson(json);
      if (singleScript) {
        checkForMultipleScripts();
      }
    }
  });
}

function run() {
  if (notRun) {
    return;
  }
  var s, i, z = ''; for (i = 0; i < t('div').length; i += 1) {
    if (t('div')[i].className === 'rprt' && t('div')[i].className !== 'abstract') {
      getPmid('div', i);
    } else if (t('div')[i].className === 'rprt_all') {
      getPmid('div', i);
    } else if (t('div')[i].className === 'print_term') {
      z = t('div')[i].textContent;
      if (z) {
        search_term = z.substr(8, z.length);
      }
    }
  }
  pmids = pmids.substr(1, pmids.length);
  pmidArray = pmids.split(',');
  if (pmids) { getJson(pmids); }
  if (!document.getElementById('paperlink2_display')) {
    s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', 'https://paperlink2.appspot.com/js?y=' + (Math.random()));
    document.body.appendChild(s);
  }
  if (goNew) { checkForUpdates(); }
}
run();
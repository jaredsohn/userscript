(function () {
// ==UserScript==
// @name           USO Admin Gold
// @namespace      http://www.krakenstein.cz.cc
// @author         daYOda (Krakenstein)
// @description    Take advance USO Developer backend
// @version        1.3
// @include        http://userscripts.org/users/*
// @include        http://userscripts.org/scripts/show/*
// @include        http://userscripts.org/home/scripts*
// @match          http://userscripts.org/users/*
// @match          http://userscripts.org/scripts/show/*
// @match          http://userscripts.org/home/scripts*
// ==/UserScript==

function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}

const script_id = 90497;
const script_version = '1.3';
const s_CheckUpdate = 'yodCheckUpdate' + script_id;
const s_servupdt = 'http://project.krakenstein.tk/usoupdater/';

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function usoUpdate(el) {
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      s_gm.src = s_servupdt + '?id=' + script_id + '&ver=' + script_version;
      el.appendChild(s_gm);
    }
  }
  else setValue(s_CheckUpdate, md);
}

// public profile

var l, str, tags = c2('.//div[contains(@id, "tag-cloud")]/ol/li');

if (l = tags.length) {
  for (i = 0; i < l; i++) {
    str = tags[i].innerHTML.trim();
    tags[i].innerHTML = '<a href="http://userscripts.org/tags/' + str + '">' + str + '</a>';
  }
}

// script manager

var l, sid, ctrl = c2('.//a[contains(@href, "/scripts/edit/")]');

var advProfile = [
  ['/scripts/images/', 'Screenshots & Icon'],
  ['/scripts/admin/', 'Admin'],
];

var advAdmin = [
  ['/scripts/images/', 'screenshots'],
  ['/scripts/admin/', 'admin'],
  ['/scripts/delete/', 'delete'],
  //['/scripts/reviews/', 'reviews'],
  ['/scripts/discuss/', 'discuss'],
  ['/scripts/fans/', 'fans'],
  ['/scripts/issues/', 'issues'],
  //['/scripts/fans/', 'Share'],
];

function addControl1(ctrl, sid) {
  if (ctrl = ctrl.parentNode) {
    var idx;
    for (idx in advAdmin) {
      var href = advAdmin[idx][0] + sid;
      var lbl = advAdmin[idx][1];
      ctrl.innerHTML += '\
       | <a href="' + href + '">' + lbl + '</a>\
       ';
    }
  }
}

function addControl2(ctrl, sid) {
  if (ctrl = ctrl.parentNode.parentNode) {
    var idx;
    for (idx in advProfile) {
      var href = advProfile[idx][0] + sid;
      var lbl = advProfile[idx][1];
      var li = document.createElement('li');
      li.innerHTML = '<a href="' + href + '">' + lbl + '</a>';
      ctrl.appendChild(li);
    }
  }
}

if (c1('.//ul[contains(@class, "subnav")]') && (l = ctrl.length)) {
  for (i = 0; i < l; i++) {
    if (sid = regexx(ctrl[i].href, /(\d+)/i)) {
      addControl1(ctrl[i], sid);
    }
  }
}

// script profile

var l, sid, ctrl = c1('.//a[contains(@href, "/scripts/delete/")]');

if (g('fans') && ctrl) {
  if (sid = regexx(ctrl.href, /(\d+)/i)) {
    addControl2(ctrl, sid);
  }
}
usoUpdate();
})();
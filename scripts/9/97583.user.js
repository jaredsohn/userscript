// ==UserScript==
// @name           vkInviter
// @namespace      vkontakte
// @description    Скрипт следит за списком приглашенных в группу и запрещает приглашать дважды
// @include        http://vkontakte.ru/*
// @author         MiamiBC (maimi@blackcrystal.net)
// @homepage       http://www.blackcrystal.net/labs/vkinviter
// @userscripts    http://userscripts.org/scripts/show/35771
// @version        1.72 final (21/08/2009)
// ==/UserScript==

var vkinviter = {

  // SETTINGS:
  // for default use BlackCrystal public database
  database: "http://www.blackcrystal.net/labs/vkinviter/db.php",
  // or change this parameter to your serverside script, for example:
  // database: "http://localhost/labs/vkinviter/db.php",
  // please, don't forget comma at the end of line
  // END OF SETTINGS

  version: '1.72',

  timers: [],
  // get group id
  gid_get: function() {
    if (typeof(vkinviter.gid) != 'undefined') return vkinviter.gid;
    vkinviter.event = false;
    try {
      var matches = document.getElementById("searchResults").innerHTML.match(/<a href="javascript: inviteMemberTo(Group|Event)\((\d+),\d+\)">/i);
      vkinviter.event = (matches[1] == 'Event') ? true: false;
      vkinviter.gid = matches[2];
      return vkinviter.gid;
    } catch(e) {

}
    return null;
  },

  // get inviter id
  iid_get: function() {
    if (typeof(vkinviter.iid) != 'undefined') return vkinviter.iid;
    try {
      vkinviter.iid = document.getElementById('myprofile').innerHTML.match(/id(\d+)\?/)[1];
      return vkinviter.iid;
    } catch(e) {}
    return null;
  },

  // collect user ids
  uid_get: function() {
    if (typeof(vkinviter.uid) != 'undefined') return vkinviter.uid;
    vkinviter.uid = '_';
    lis = document.evaluate('//div[@id="searchResults"]//li', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < lis.snapshotLength; i++) {
      try {
        var obj = lis.snapshotItem(i);
        var uid = obj.innerHTML.match(/<a href="javascript: inviteMemberTo(?:Group|Event)\(\d+,(\d+)\)">/i)[1] * 1;
        vkinviter.item_wrap(obj, uid);
        vkinviter.uid += uid + '_';
      } catch(e) {}
    }
    return vkinviter.uid;
  },

  // empty list of invited ppl
  ids: ['_', '_', '_', '_', '_', '_', '_'],

  //add id to list
  ids_add: function(uid, i) {
    if (!i) return;
    if (vkinviter.ids.join().indexOf('_' + uid + '_') < 0) vkinviter.ids[i] += uid + '_';
    if (vkinviter.opera()) vkinviter.request_out();
  },

  // detect Opera
  opera: function() {
    return (navigator.userAgent.indexOf('Opera') >= 0) ? true: false;
  },

  // opera cross-domain request
  // @see http://miami.habrahabr.ru/blog/43176/
  opera_XDR: function(req) {
    var XDR = document.createElement('script');
    XDR.type = 'text/javascript';
    XDR.src = req;
    document.getElementsByTagName('head')[0].appendChild(XDR);
  },

  // get request using ajax
  ajax_GET: function(url, callback) {
    GM_xmlhttpRequest({
      'method': 'GET',
      'url': url,
      onload: function(result) {
        callback(result.responseText);
      }
    });
  },

  // do request for uid list (in-request)
  request_in: function() {
    var req = vkinviter.request_prepare() + "&act=in&ids=" + vkinviter.uid_get();
    if (vkinviter.opera()) {
      vkinviter.opera_XDR(req);
    } else {
      vkinviter.ajax_GET(req, vkinviter.process_in);
    }
  },

  // process request for uid list (in-request)
  process_in: function(list) {
    try {
      list = list.match(/vkinviter.process_in\("(.*)"\)/i)[1];
    } catch(e) {}
    try {
      vkinviter.message.innerHTML = list.match(/_m([^_]*)_/i)[1];
      list.replace(/_m[^_]*_/i, '_');
    } catch(e) {}
    list = list.split('_');
    var texts = ["Приглашали, статус неизвестен", "Приглашение выслано", "Приглашение уже высылалось", "Пользователь уже в группе", "Только друзья могут приглашать этого пользователя в группы.", "Пользователь запретил приглашать себя в группы.", "По нашим данным пользователь запретил приглашать себя в группы</div><div><a href='javascript:void(#)'>Сделать попытку</a>", "%"];
    var st = 0;
    var dat = '';
    for (var i = 0; i < list.length; i++) {
      if (list[i].match(/^g(\d+)$/)) {
        st = list[i].match(/^g(\d+)$/)[1];
      } else if (list[i].match(/^d(.+)$/)) {
        dat = list[i].match(/^d(.+)$/)[1];
      } else if (list[i].match(/^t(.+)$/)) {
        texts.push(list[i].match(/^t(.+)$/)[1]);
      } else {
        vkinviter.item_text(list[i], texts[st].replace('%', dat).replace('#', list[i]));
      }
    }
  },

  // prepare request params
  request_prepare: function() {
    return vkinviter.database + "?gid=" + vkinviter.gid_get() + "&iid=" + vkinviter.iid_get() + "&b=" + (vkinviter.opera() ? 'opera': 'gmonkey') + '&v=' + vkinviter.version;
  },

  // save ids to the server
  request_out: function() {
    if (vkinviter.ids.join() == '_______') return;
    var req = vkinviter.request_prepare() + '&act=out';
    for (var i = 1; i < vkinviter.ids.length; i++) {
      if (vkinviter.ids[i] != '_') req = req + '&ids[' + i + ']=' + vkinviter.ids[i];
    }
    if (vkinviter.opera()) vkinviter.opera_XDR(req);
    else vkinviter.ajax_GET(req,
    function() {});
  },

  // convert link to vkinviter item
  item_wrap: function(obj, uid) {
    try {
      obj.id = 'vkinviter_' + uid;
      obj.innerHTML = "<div><a href='javascript:void(" + uid + ")'>Пригласить ненавязчиво</a></div>";
    } catch(e) {}
  },

  // change vkinviter item text
  item_text: function(uid, text) {
    try {
      document.getElementById('vkinviter_' + uid).innerHTML = "<div style='color: #bbbbbb; padding: 3px 6px'>" + text + "</div>";
    } catch(e) {}
  },

  // init vkinviter
  init: function() {
    if (!vkinviter.gid_get()) return; // do not init, if no gid
    vkinviter.design_change();
    vkinviter.request_in();
  },

  // click event
  click: function(e) {
    try {
      var uid = e.target.href.match(/javascript:void\((\d+)\)/)[1];
      vkinviter.invite(uid);
    } catch(e) {}
  },

  // invite uid. Here I used normal XMLHttpRequest, cuz some domain allowed in opera
  invite: function(uid) {

    if (vkinviter.timers.length) clearTimeout(vkinviter.timers.shift());
    if (!vkinviter.timers.length) vkinviter.invite_all_stop();

    vkinviter.item_text(uid, 'Ждёмс...');
    var XHR = new XMLHttpRequest();
    XHR.open('post', 'http://vkontakte.ru/groups.php', true);
    XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    XHR.onreadystatechange = function() {
      if (XHR.readyState != 4) return;
      if (XHR.status == 200 || XHR.status == 304 || XHR.status == 0) {
        vkinviter.invite_process(uid, XHR.responseText.stripTags());
      } else {
        vkinviter.invite_process(uid, 'Ашыпка');
      }
    };
    XHR.send('act=ajaxinv' + (vkinviter.event ? '&e=1': '') + '&gid=' + vkinviter.gid_get() + '&id=' + uid);
  },

  invite_process: function(uid, text) {
    var i = 0;
    if (text.match(/выслано/i)) {
      i = 1;
      text += "<br>Запоминаем.";
    } else if (text.match(/уже высылалось/i)) {
      i = 2;
      text += "<br>Запоминаем.";
    } else if (text.match(/Пользователь уже/i)) {
      i = 3;
      text += "<br>Запоминаем.";
    } else if (text.match(/Только друзья/i)) {
      i = 4;
      text += "<br>Запоминаем.";
    } else if (text.match(/запретил приглашать/i)) {
      i = 5;
      text += "<br>Запоминаем.";
    } else if (text.match(/captcha/i)) {
      vkinviter.invite_all_stop();
      var func = vkinviter.event ? 'inviteMemberToEvent': 'inviteMemberToGroup';
      text = "Сервер просит ввести капчу<br>Не запоминаем.</div><a href='javascript:" + func + "(" + vkinviter.gid_get() + "," + uid + ");'>Попробуйте стандартное приглашение</a><div>";
      i = 0;
    } else {
      vkinviter.invite_all_stop();
      text += "<br>Не запоминаем.</div><div><a href='javascript:void(" + uid + ")'>Повторить попытку</a>";
      i = 0;
    }
    vkinviter.ids_add(uid, i);
    vkinviter.item_text(uid, text);
    var req = vkinviter.request_prepare() + '&act=out';
    for (var i = 1; i < vkinviter.ids.length; i++) {
      if (vkinviter.ids[i] != '_') req = req + '&ids[' + i + ']=' + vkinviter.ids[i];
    }
  },

  // change design
  design_change: function() {
    //add message bar
    vkinviter.message = document.createElement('div');
    vkinviter.message.style.padding = '5px';
    vkinviter.message.align = 'center';
    vkinviter.add_element('//div[@class="clearFix tBar"]', vkinviter.message, 'message_bar');

    //add button
    vkinviter.button = document.createElement('div');
    vkinviter.button.innerHTML = '<div style="padding: 3px 6px; width: 141px;" align="left">' + '<a style="font-weight: bold;" href="." id="design_removeuserpics" onclick="return false;"></a><br>' + '<a style="font-weight: bold;" href="." id="invite_all" onclick="return false;">' + 'Пригласить всех</a><div>';
    vkinviter.button.style.cssFloat = 'right';
    vkinviter.button.style.width = '155px';
    vkinviter.add_element('//div[@class="bar clearFix uBar"]', vkinviter.button, 'invite_all_button');
    document.getElementById('design_removeuserpics').addEventListener('click', vkinviter.design_removeuserpics, false);
    document.getElementById('invite_all').addEventListener('click', vkinviter.invite_all, false);

    if (vkinviter.event) { // fix grouplist in group-to-event invitation, or large qSearch textbox in quick-to-event invitation
      try {
        document.getElementById('grouplist').style.width = '300px';
      } catch(e) {
        var el = document.getElementById('Search');
        el.className = 'aColumn';
        el.style.border = '0';
        el.style.padding = '5';
      }
    }

    // remove blocks with deleted users
    var allElements = document.evaluate('//div[@class="result clearFix"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
      var el = allElements.snapshotItem(i);
      if (/Страница удалена/ig.test(el.innerHTML)) el.parentNode.removeChild(el);
    }

    vkinviter.design_removeuserpics(true); // remove userpics, but no toggle
  },

  // remove userpics
  design_removeuserpics: function(do_not_toggle) {
    var hide = false;
    try {
      var hide = GM_getValue("design_removeuserpics", 0);
    } catch(e) {}
    if (do_not_toggle !== true) {
      try {
        GM_setValue("design_removeuserpics", !hide);
      } catch(e) {};
      hide = !hide;
    }
    var allElements = document.evaluate('//div[@class="image"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
      allElements.snapshotItem(i).style.display = (hide) ? 'none': '';
    }
    document.getElementById("design_removeuserpics").innerHTML = (hide) ? 'Показать картинки': 'Скрыть картинки';
  },

  // add element to dom using xpath and set id
  add_element: function(xpath, element, id) {
    try {
      if (document.getElementById(id)) document.getElementById(id).innerHTML = element.innerHTML;
      else {
        document.evaluate(xpath, document, null, 9, null).singleNodeValue.appendChild(element);
        if (id) element.id = id;
      }
    } catch(e) {}
  },

  invite_all: function() {
    (vkinviter.timers.length > 0) ? vkinviter.invite_all_stop() : vkinviter.invite_all_start();
  },

  invite_all_start: function() {
    rePattern = /<a href="javascript:void\((\d+)\)">(Пригласить ненавязчиво|Повторить попытку)<\/a>/gi
    while (arrMatch = rePattern.exec(document.getElementById('searchResults').innerHTML)) {
      vkinviter.timers.push(setTimeout(vkinviter.invite, 1000 * vkinviter.timers.length, arrMatch[1]));
    }
    document.getElementById('invite_all').innerHTML = 'Остановить';
  },

  invite_all_stop: function() {
    while (vkinviter.timers.length) {
      clearTimeout(vkinviter.timers.shift());
    }
    vkinviter.timers = [];
    document.getElementById('invite_all').innerHTML = 'Пригласить всех';
  },

  the: 'end'

}

// remove tags from string
String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]*>/gi, '');
}

window.addEventListener('load', vkinviter.init, false);
window.addEventListener('click', vkinviter.click, false);
window.addEventListener('beforeunload', vkinviter.request_out, false);
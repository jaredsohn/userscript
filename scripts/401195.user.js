(function () {
// ==UserScript==
// @name          FBrutalPoke
// @namespace     http://blog.thrsh.net
// @author        daYOda (THRSH)
// @description   Facebook.com - Brutal Poke
// @updateURL     https://userscripts.org/scripts/source/401195.meta.js
// @version       1.0
// @match         https://*.facebook.com/*
// @match         http://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==


function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}

const yodUpdate = {
  script_id : 401195,
  script_version : '1.0'
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate.script_id;
  const s_Redir = false;
  el = el ? el : document.body;
  if (el) {
    if (!document.getElementById(s_CheckUpdate)) {
      var s_gm = document.createElement('script'); s_gm.id = s_CheckUpdate; s_gm.type = 'text/javascript';
      s_gm.src = '//usoupdater.herokuapp.com/?id=' + yodUpdate.script_id + '&ver=' + yodUpdate.script_version;
      if (s_Redir) s_gm.src += '&redir=yes';
      el.appendChild(s_gm);
    }
  }
}

var yodPoke = function() {
  this.DEBUG = false;
  this.div_target_class = 'yodFBrutalPoke_div_target_class';
  this.LOG_PREFIX = 'YOD FBrutalPoke: ';
  this.spritemap = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMZJREFUeNpiZEADAQEBNkDKH4idgFgOiEWQpPexICmUAFLzgdiDiYmJAYZBgJGREabsFyNUMcikw0AJORYWFrhCIDgExO4rV678ARNgAioGya4GKWZlZYUp/gXEU4DYCFkxCICcFATEZiDFSFb3AfH3v3//fkL3I8i4RJCpSIpBoAKouPH///9SYWFhe9FtMGBmZkY3iAFJ7Be6Bgk003cA3e3JgAOAnLQGWQM+xTANyf/+/dvGQCoIDQ21Cw8PP0xIHUCAAQB/by/i8a7qxAAAAABJRU5ErkJggg==';

  this.css = "\
    .yod_i{\
      background-image: url('" + this.spritemap + "');background-repeat: no-repeat;\
      display: inline-block;\
      height: 14px;\
      width: 12px;\
    }\
  ";

  this.content = null;
};

yodPoke.prototype = {
  init: function(content) {
    var _this = this;

    _this.add_style();

    _this.content = content;
    _this.content.addEventListener("DOMNodeInserted", function(ev){_this.findbox(ev)}, true);
  },

  add_style: function() {
    var heads;

    if (heads = document.getElementsByTagName('head')) {
      try {
        var style = document.createElement('style');
        style.textContent = this.css;
        style.type = 'text/css';
        heads[0].appendChild(style);
      } catch(x) {}
    }
  },

  findbox: function(ev) {
    if (/DIV/.test(ev.target.tagName) && /Contextual/.test(ev.target.className)) {
      this.doInject(ev.target);
    }
  },

  doInject: function(box) {
    var div, div_target, fb_id;

    if (c1('.//*[contains(@class,"' + this.div_target_class + '")]', box)) return false;
    if (!c1('.//*[contains(@class,"FriendButton")]', box)) return false;
    if (!(fb_id = c1('.//*[@data-profileid]', box))) return false;

    fb_id = fb_id.getAttribute('data-profileid');

    if (div = c1('.//span[contains(@class,"ButtonGroup")]', box)) {
      div_target = document.createElement('span');
      div_target.innerHTML = '<a title="Poke this Person" class="action actionspro_a uiButton" '
        + 'href="#" ajaxify="/pokes/dialog/?poke_target=' + fb_id + '&do_confirm=0" rel="dialog-post">'
        + '<i class="mrs img yod_i yod_i_butt_f_poke"></i>'
        + 'Poke</a>';
      div_target.className = this.div_target_class + ' uiButtonGroupItem buttonItem';
      div.insertBefore(div_target, div.firstChild);
    }
  },

  log: function(m) {
    if (this.DEBUG && m) console.log(this.LOG_PREFIX + m.toString());
  }
};

function starter() {
  if (content = document.body) {
    var GM_yodPoke = new yodPoke();
    GM_yodPoke.init(content);
    usoUpdate();
  }

  return false;
}


window.addEventListener("DOMContentLoaded", starter, false);
})();
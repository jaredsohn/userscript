// ==UserScript==
// @name          Gmail Template Switch
// @namespace     http://d.hatena.ne.jp/re_guzy
// @description   Append the function to apply the mail template, when writing a mail.
// @version       0.1.20080129.0
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @exclude       http://mail.google.com/mail/help/*
// @exclude       https://mail.google.com/mail/help/*
//
// Copyright (c) 2007-2008, re_guzy <goodspeed.xii@gmail.com>
// Distributed under the MIT license
// http://opensource.org/licenses/mit-license.php
// http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
//
// Notice : To Uninstall this script, remove "gtssettings0-9" from Gmail contact list.
// Thanks : This script uses jQuery 1.1.4 .
// Feature: When writing a mail, append a combobox to action. By selecting action,
//          apply template to mail, or add template or remove template. Template
//          is saved to "contact list" named starting with "gtssettings".
// Require: Greasemonkey 0.7.20080121.0

(function() {
const DEBUG = false;
const JQUERY_URL = 'http://jqueryjs.googlecode.com/files/jquery-1.1.4.pack.js';
const KEY_CACHE = "gts_cache";
const KEY_JQUERY = "gts_jquery";
const CONTACT_NAME = "gtssettings";
const CONTACT_ID_RE = /\["\w+","(\w+)","gtssettings\d","gtssettings\d",/;
const CONTACT_ID_RE_G = /\["\w+","(\w+)","gtssettings\d","gtssettings\d",/g;
const CONTACT_NOTE_RE = /\["\w+","\w+","gtssettings(\d)","gtssettings\d","[^"]*","[^"]*",\[\]\n,\["n","([^"]+)"\]/;
const MSGBODY_RE = /([\s\S]*)\n?(?:^---)(\n[\s\S]+)/m;
const LOCATION_RE = /(https?:\/\/[^\/]+\/(a\/[^\/]+\/)?).*/;
const SELECTOR = {
  'msgbody' : 'textarea[@name=msgbody]',
  'subject' : 'input[@name=subject]',
  'to' : 'textarea[@name=to]',
  'from' : 'select[@name=from]',
  'cc' : 'textarea[@name=cc]',
  'bcc' : 'textarea[@name=bcc]'
};

var $ = "shortcut for jquery";
var T = new Array(10);
T[0] = { 'id' : -1, 'num' : 0 };
for (var i=1;i < T.length;i++) {
  T[i] = {
    'id' : -1,
    'num' : i,
    'from' : '',
    'to' : '',
    'cc' : '',
    'bcc' : '',
    'subject' : '',
    'body' : '',
    'body_latter' : ''
  }
}
var Ja = false;

document.addEventListener('focus', function(event) {
  if (event.target.name != 'to' && event.target.name != 'msgbody') {
    return;
  }

  loadJQuery(initialize, unsafeWindow.document);
},true);

function loadJQuery(f_initialize, rootNode) {
  if (eval('unsafeWindow.$')) {
    log('jquery already loaded');
    f_initialize(rootNode);
    return;
  }

  window.setTimeout(function() {
    var permanent = GM_getValue(KEY_JQUERY);
    if( typeof permanent == "undefined" ) {
      log('request jquery');
      ajax_jquery(function(req){
        GM_setValue( KEY_JQUERY, encodeURI(req.responseText) );
        unsafeWindow.eval( req.responseText );
        log('jquery saved and evaluated');
        f_initialize(rootNode);
      });
    } else {
      unsafeWindow.eval( decodeURI(permanent) );
      log('jquery evaluated');
      f_initialize(rootNode);
    }
  }, 0);
}
function initialize(rootNode) {
  $ = unsafeWindow.$;
  $('#compose_form', $(rootNode)).each(function() {
    if ($('#id_gts_template', $(this)).is('select')) {
      log('already initialized');
      return;
    }

    var texts = $('textarea', $(this));
    if (texts.length != 4) {//need [to, cc, bcc, msgbody]
      log('illegal number of textarea : ' + texts.length);
      return;
    }

    try {
      var label = $('button[@id=x]', $(this)).after(createSelectElement()).get(0).innerHTML;
      Ja = (label == '破棄');
      composeCommand($(this));
    }catch(e){
      log('add combobox failure because : ' + e);
      return;
    }
  });
}
function createSelectElement() {
  var content = 
    '<select id="id_gts_template" style="margin-left:10px;" onchange="gts_action(this);">' 
      + toOption('please wait...' , false , true) + '</select>';
  return content
}
function toOption(text, value, selected, cls) {
  var a = []
  $.each({
    'style' : value ? null : '"color: rgb(119, 119, 119);"',
    'disabled' : value ? null : '"disabled"',
    'selected' : selected ? '"selected"' : null,
    'value' : value ? '"' + value + '"' : null,
    'class' : cls ? cls : null
  }, function(i,v) {
    if (v) {a.push(i + "=" + v);}
  });
  return "<option " + a.join(' ') + ">" + text + "</option>";
}
function composeCommand($form) {
  getTemplates(function /*parseTemplate*/(notes, use_cache) {
    $.each(notes, function(i, data) {
      if (use_cache) {
        T[i] = notes[i];
      } else {
        var note = data.note ? decode(data.note, false) : "{}";
        try {
          T[data.num] = eval(note);
          T[data.num].id = data.id;
          T[data.num] = decode(T[data.num], true);
        }catch(e){log("eval failed : " + e);}
      }
    });

    recomposeSelectElement($form);
    applyDefault($form);
    if (notes.length == 0) {
      save();
    } else if (!use_cache) {
      var caches = [];
      $.each(T, function(i, v) { caches.push(encode(v, true).toSource()); });
      GM_setValue(KEY_CACHE, "[" + caches.join(", ") + "]");
    }
  });
}
function applyDefault($form) {
  log('apply default');
  $(x('f'), $form).each(function(k, v) {
    var fromvalue = this.value;
    matched = $.grep(T, function(i) {
      return (i.name + '').indexOf('#') == 0 && i.from == fromvalue;
    });
    if (matched.length > 0) {
      applyTemplate(matched[0].num, $form);
    }
  });
}
function recomposeSelectElement($form) {
  var options = [];
  options.push(toOption(trans("Template actions...") , "init" , true, "gts_option_first"));

  var enables = $.grep(T, function(o) {return (o.name && o.num != 0);});
  var expand = function(arrays, cmd) {
    var hash = {};
    $.each(enables, function(i, v) {
      hash[v.from] = hash[v.from] || [];
      hash[v.from].push(v);
    });
    $.each(hash, function(i, v) {
      arrays.push(toOption('&nbsp;&lt;' + (i || trans('No from')) + '&gt;'));
      $.each(v, function(j, t) {
        arrays.push(toOption('&nbsp;&nbsp;' + t.name , cmd + '_' + t.num));
      });
    });
  };

  $.each([
    {'cmd':'apply', 'exp':trans("Apply"), 'func':expand},
    {'cmd':'add','exp':trans("Append"), 'func':function(arrays, cmd) {
      var used = $.grep(T , function(o) { return (o.name && o.num != 0) });
      if (used.length < 9) {
        arrays.push(toOption('&nbsp;&nbsp;' + trans("Includes from") , cmd));
        arrays.push(toOption('&nbsp;&nbsp;' + trans("Excludes from") , cmd + '_ignore_from'));
      } else {
        arrays.push(toOption('&nbsp;&nbsp;' + trans('Quantity limit is 9')));
      }
    }},
    {'cmd':'delete','exp':trans('Remove'), 'func':expand}
  ], function(i, v) {
    if (v.func == expand && enables.length ==0) { return; }
    options.push(toOption('-------'));
    options.push(toOption(trans('verbs', v.exp) + ':'));
    v.func(options, v.cmd);
  });

  $('select[@id=id_gts_template]', $form).empty().append(options.join('')).each(function(){
    this.value = 'init';
  });
  unsafeWindow.gts_action = doCommand;
}
function doCommand(selectNode) {
  var node = selectNode;
  do {
    node = node.parentNode;
  } while(node && node.id != 'compose_form');
  if (node.id != 'compose_form') {
    log('compose_form not found');
    return;
  }

  var $parent = $(node);
  if (!$parent.is('form')) {
    log('parent not found');
  } else if (selectNode.value == 'add') {
    addTemplate($parent, true);
  } else if (selectNode.value == 'add_ignore_from') {
    addTemplate($parent, false);
  } else if (selectNode.value.match(/apply_(\d+)/)) {
    applyTemplate(RegExp.$1 , $parent);
  } else if (selectNode.value.match(/delete_(\d+)/)) {
    deleteTemplate(RegExp.$1 , $parent);
  } else if (selectNode.value == 'undo') {
    if (unsafeWindow.gts_undo) { unsafeWindow.gts_undo(); }
  }
  selectNode.value= 'init';
}
function addTemplate($form, contain_from) {
  var m = trans('Please input the template name.');
  if (contain_from) {
    m += '\n';
    m += trans('If the name is started from "#", it becomes default of the corresponding "from".');
  }
  var name = window.prompt(m, "");
  if (!name) {return;}
  if ($.grep(T , function(o) { return (o.name == name) }).length > 0) {
    alert(trans('The name already exists.'));
    return;
  }

  var empties = $.grep(T , function(o) { return (o.name || o.num == 0) }, true);
  var t = empties[0];
  $.extend(T[t.num], {
    'num' : t.num,
    'id' : t.id,
    'name' : name,
    'from' : contain_from ? $(x('f') , $form).val() : "",
    'to' : $(x('t') , $form).val(),
    'cc' : $(x('c') , $form).val(),
    'bcc' : $(x('b') , $form).val(),
    'subject' : $(x('s') , $form).val(),
    'body' : $(x('m') , $form).val()
  });

  if (MSGBODY_RE.exec(T[t.num].body)) {
    T[t.num].body = RegExp.$1;
    T[t.num].body_latter = RegExp.$2;
  }

  editContact(T[t.num], function() {
    recomposeSelectElement($form);
    msg(trans('appended', name));
  });
}
function applyTemplate(num , $form) {
  log('request apply : ' + num);
  var span = {'from':'span#c_6', 'subject':'span#c_3', 'cc':'span#c_1', 'bcc':'span#c_2'};

  if (typeof T[0]._init == 'undefined') {
    T[0]._init = {};
    $(x('f,s,t,c,b,m'), $form).each(function(i) { T[0]._init[this.name] = $.trim(this.value); });
  }

  $(x('f,s,t,c,b'), $form).each(function(i) {
    var tmp = T[0]._init[this.name];
    if (this.type == 'textarea') {
      var targetaddrs = tmp || "";
      //既に含まれているものは追加しない
      var notcontains = $.grep(T[num][this.name].split(','), function(i) {
        if ($.trim(i).length == 0) { return; }//空白は無視
        if (/([\w\.+-]+@[\w+-]+(\.[\w+-]+)+)/.exec(i)) {
          return targetaddrs.indexOf(RegExp.$1) < 0;
        } else {
          return targetaddrs.indexOf(i) < 0;
        }
      });
      if (tmp) { notcontains.unshift(tmp); }
      this.value = notcontains.join(', ');
    } else if (this.name == 'from' && this.value == T[num][this.name]) {
      return;
    } else {
      this.value = (this.name == 'subject' && tmp) ? tmp : T[num][this.name];
    }
    if (span[this.name] && T[num][this.name]) {emulate_click(span[this.name], $form);}
  });

  $(x('m'), $form).each(function(i, v) {
    this.value = $.grep([
      T[num].body, T[0]._init.msgbody, T[num].body_latter
    ], function(i) { return i; }).join("\n\n");
  });

  $(x('m,s,t'), $form).each(function() {
    if ((this.name == 'msgbody') || !this.value) {
      $(this).focus();
      this.selectionStart = 0;
      this.selectionEnd = 0;
    }
  });

  var undos = [
    toOption('-------', null, null, "gts_undo_option"),
    toOption('&nbsp;&nbsp;' + trans("Undo"), 'undo', null, "gts_undo_option")
  ];
  $('select[@id=id_gts_template] .gts_undo_option', $form).remove();
  $('select[@id=id_gts_template] .gts_option_first', $form).after(undos.join(''));

  msg(trans('applied', T[num].name), function() {
    undo($form);
    msg(trans("To apply template was canceled."));
  });
}
function undo($form) {
  log('undo');
  if (typeof T[0]._init != 'undefined') {
    $(x("t,c,b,m"), $form).each(function() { this.value = T[0]._init[this.name]; });
  }
  delete T[0]._init;
  $('select[@id=id_gts_template] .gts_undo_option', $form).remove();
}
function emulate_click(target, $form) {
  $(target, $form).each(function(i) {
    if (this.dispatchEvent) {
      var e = unsafeWindow.document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      this.dispatchEvent(e);
    }
  });
}
function deleteTemplate(num , $form) {
  var name = T[num].name;
  if (confirm(trans('remove confirm', name)) != true) {
    return;
  }

  log('request delete : ' + num);
  T[num] = {'id' : T[num].id, 'num' : num};
  editContact(T[num], function() {
    recomposeSelectElement($form);
    msg(trans("removed", name));
  });
}
function getTemplates(f_parseTemplate) {
  ajax('mail/?view=cl&search=contacts&pnl=s&q=' + CONTACT_NAME, function(req){
    var contacts = [];
    var m;
    while(m = CONTACT_ID_RE_G.exec(req.responseText) != null) {
      contacts.push(RegExp.$1);
    }
    getNoteData(contacts, [], f_parseTemplate);
  });
}
function getNoteData(contacts, notes, f_parseTemplate) {
  if (contacts.length == 0) {
    f_parseTemplate(notes);
    return;
  }

  var contactID = contacts.shift();
  var queryUrl = "mail/?view=ct&search=contacts&cvm=2&ct_id=" + contactID;

  ajax(queryUrl, function(req) {
    if (CONTACT_NOTE_RE.exec(req.responseText)) {
      notes.push({'num' : RegExp.$1, 'note' : RegExp.$2, 'id' : contactID});
    }

    if (RegExp.$1 == 0) {
      var tmp_S = eval( decode( RegExp.$2, false ) );
      tmp_S.date = unescape( tmp_S.date );
      var tmp_T = eval(GM_getValue(KEY_CACHE, [{}]));
      $.each(tmp_T, function(i, v) { tmp_T[i] = decode(v, true); });
      if (tmp_T[0].date && (tmp_T[0].date.toString() == tmp_S.date.toString())) {
        log('use cache');
        f_parseTemplate(tmp_T, true);
        return;
      }
    }

    if (contacts) {
      getNoteData(contacts, notes, f_parseTemplate);
    } else {
      f_parseTemplate(notes);
    }
  });
}
function encode(tmpl, by_escape) {
  if (by_escape) {
    var escaped = {};
    //encodeURIだと「'」がエンコードされないので、escapeを使う
    $.each(tmpl, function(i, v) {
      if (i.indexOf('_') == 0) { return; }
      escaped[i] = escape(v);
    });
    return escaped;
  } else {
    //連絡先は「"」で囲まれるため、JSONデータを表すのに「"」を使えない。
    //連絡先から復元するときに使うデータを、REGEXでマッチさせるため「"」を「'」に置換しておく。
    return tmpl.toSource().replace(/\"/g, "'");
  }
}
function decode(tmpl, by_unescape) {
  if (by_unescape) {
    var unescaped = {};
    $.each(tmpl, function(k, v) {unescaped[k] = unescape(v);});
    return unescaped;
  } else {
    //連絡先に格納するために、「'」に変換しておいた「"」を戻す
    return tmpl.replace(/\\'/g, "\"");
  }
}
function editContact(tmpl, f_completed) {
  var escaped = encode(tmpl, true);
  var post_data = $.param({
    "act" : "ec",
    "at" : getCookie("GMAIL_AT"),
    "ct_id" : tmpl.id,
    "ct_nm" : CONTACT_NAME + tmpl.num,
    "ct_em" : CONTACT_NAME + tmpl.num + "@gmail.com",
    "ctf_n" : encode(escaped, false)
  });

  ajax("mail/?&ik=&view=up", function(req) {
    if (tmpl.id == -1) {
      if (CONTACT_ID_RE.exec(req.responseText)) {
        tmpl.id = RegExp.$1;
        editContact(tmpl, f_completed);
      }
    } else {
      if (tmpl.num != 0) {
        save(f_completed);
      } else {
        f_completed();
      }
    }
  }, 'POST', {'Content-Type': 'application/x-www-form-urlencoded'}, post_data);
}
function log(message) {
  if (unsafeWindow && unsafeWindow.console && DEBUG) {
    unsafeWindow.console.log(message);
  }
}
function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? decodeURI(value[1]) : null;
}
function msg(message, f_clicked) {
  unsafeWindow.gts_undo = f_clicked;
  var elem = $("div#nt1 div", $(unsafeWindow.document)).get(0);
  if (typeof elem == 'undefined') return;
  $(elem).each(function() {
    this.style.visibility = "visible";
    $("td.nm", $(this)).each(function() {
      this.innerHTML = "GTS : " + message;
    });
  });
}
function save(f_saved) {
  T[0]['num'] = 0;
  T[0].date = new Date();
  editContact(T[0], f_saved ? f_saved : function() {});
}
function ajax_jquery(f_load, get_or_post, headers, data) {
  window.setTimeout(function() {
    GM_xmlhttpRequest({
      'method': get_or_post ? get_or_post : "GET",
      'url': JQUERY_URL,
      'data': data,
      'headers': headers,
      'onload': f_load,
      'onerror': function(req) {
        log("Request Failed in error code: " + req.status);
      }
    });
  }, 0);
}
function ajax(request_path, f_load, get_or_post, headers, data) {
  window.setTimeout(function() {
    GM_xmlhttpRequest({
      'method': get_or_post ? get_or_post : "GET",
      'url': getBaseLocation() + request_path,
      'data': data,
      'headers': headers,
      'onload': f_load,
      'onerror': function(req) {
        log("Request Failed in error code: " + req.status);
      }
    });
  }, 0);
}
function getBaseLocation() {
  if (LOCATION_RE.exec(document.location)) {//for Google Apps
    return RegExp.$1;
  } else {
    return 'http://mail.google.com/';
  }
}
function trans(msg_id, opt) {
  return {
    'Template actions...' : Ja ? 'テンプレートの操作...' : msg_id,
    'Apply' : Ja ? '適用' : msg_id,
    'Append' : Ja ? '追加' : msg_id,
    'Includes from' : Ja ? '差出人を含む' : msg_id,
    'Excludes from' : Ja ? '差出人を除く' : msg_id,
    'Quantity limit is 9' : Ja ? '最大９個です' : msg_id,
    'Remove' : Ja ? '削除' : msg_id,
    'verbs' : Ja ? (opt + 'するテンプレート') : (opt + ' template'),
    'Please input the template name.' : Ja ? 'テンプレート名を入力してください。' : msg_id,
    'If the name is started from "#", it becomes default of the corresponding "from".' :
      Ja ? '名前を「#」から始めると、対応する差出人のデフォルトになります。' : msg_id,
    'The name already exists.' : Ja ? 'その名前は既に存在します。' : msg_id,
    'appended' : Ja ? ("テンプレート「" + opt + "」を追加しました。")
      : ('Template "' + opt + '" was appended.'),
    'applied' : Ja ? ("テンプレート「"+opt+"」を適用しました。"
      + "<span id='gts_und' class='lk' onclick='gts_undo();'>適用取り消し</span>")
      : ('Template "' + opt + '" was applied. '
      + '<span id="gts_und" class="lk" onclick="gts_undo();">Undo applied</span>'),
    'remove confirm' : Ja ? ("テンプレート「" + opt + "」を削除しますか？")
      : ('Is template "' + opt + '" removed?'),
    'removed' : Ja ? ("テンプレート「" + opt + "」を削除しました。")
      : ('Template "' + opt + '" was removed.'),
    'To apply template was canceled.' : Ja ? "テンプレートの適用は取り消されました。" : msg_id,
    'Undo' : Ja ? "適用の取り消し" : msg_id,
    'No from' : Ja ? "差出人なし" : msg_id
  }[msg_id] || msg_id;
}
function x(prefix) {
  var result = [];

  $.each(SELECTOR, function(i, v) {
    if (typeof prefix != 'undefined') {
      if ($.grep(prefix.split(','), function(j) { return i.indexOf(j) == 0; }).length == 0) {
        return;
      }
    }
    result.push(v);
  });

  return result.join(', ');
}
})();

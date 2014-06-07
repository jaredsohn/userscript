// ==UserScript==
// @name           Gmail Template Switcher - v 2.0
// @namespace      http://ishikawa.r-stone.net/
// @description    Append the function to apply the mail template, when writing a mail. Modify source code of [Gmail Template Switch] from http://d.hatena.ne.jp/re_guzy by re_guzy
// @version        0.2.20140106.1
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @exclude        http://mail.google.com/mail/help/*
// @exclude        https://mail.google.com/mail/help/*
// @match          http://mail.google.com/*
// @match          https://mail.google.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
//
// Copyright (c) 2007-2008, re_guzy <goodspeed.xii@gmail.com>
// Distributed under the MIT license
// http://opensource.org/licenses/mit-license.php
// http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
//
// Notice : To Uninstall this script, remove "gtssettings0-99" from Gmail contact list.
// Thanks : This script uses jQuery 1.2 .
// Feature: When writing a mail, append a combobox to action. By selecting action,
//          apply template to mail, or add template or remove template. Template
//          is saved to "contact list" named starting with "gtssettings".
// Require: Greasemonkey 0.7.20080121.0
// Change : 0.2.20140106.1 - bug fix.
//          0.2.20140106.0 - fix loss of compose form.
//          0.2.20130406.0 - bug fix.
//          0.2.20130404.0 - support [New Compose].
//          0.2.20120730.1 - fix for body text.
//          0.2.20120524.0 - fix template update.
//                           added support up to 99 templates.
//                           add a sort of the template titles in the menu.
//                           * Thanks, onigf! *
//          0.2.20120402.0 - Interim fix. read only, can not update. 
//          0.2.20120319.0 - fix for new design 
//          0.2.20111104.0 - fix for new design 
//          0.2.20110628.0 - support multi account 
//          0.2.20100202.0 - corresponded provisionally with this Google Gmail Greasemonkey API problem 
//          0.2.20091126.0 - fix for new button design 
//          0.2.20090810.0 - fix for Google Chrome 3.0.197.11 
//          0.2.20090730.0 - fix for can not add a template
//          0.2.20090716.0 - support Rich Text formatting 
//          0.2.20090626.0 - support google chrome user scripts 
//          0.2.20090204.0 - fix for new button design 
//          0.2.20081129.0 - body setting bug fix 
//          0.2.20081128.0 - support Greasekit for Safari
//                           support Opera
//                           uses jQuery
//                           change GM API call
//          0.1.20080526.0 - bug fix for Firefox 3 RC1
//          0.1.20080519.0 - bug fix for Google Apps
//          0.1.20080515.0 - change msg selector
//          0.1.20080514.0 - change msg selector
//          0.1.20080509.0 - Initial release
// ==/UserScript==

(function(contentWindow) {

var DEBUG_MODE = false;
var KEY_TOKEN = 'gts_token';
var KEY_CACHE = 'gts_cache';
var CONTACT_NAME = 'gtssettings';
var CONTACT_ID_RE1 = /,"Id":"(\w+)","MailsSent":\d,"Name":"gtssettings\d","Notes":/;
var CONTACT_ID_RE2 = /,"Id":"(\w+)","MailsSent":\d,"Name":"gtssettings\d\d","Notes":/;
var MSGBODY_RE = /([\s\S]*)\n?(?:^---)(\n[\s\S]+)/m;
var MSGBODY_RT_RE = /([\s\S]*)[<br>]?---([<br>][\s\S]+)/m;
var MSGBODY_RE_NEW_COMPOSE = /([\s\S]*)<(?:br|div)(?: style.+)?>---<(?:br|\/div)>([\s\S]+)/m;
var LOCATION_RE = /(https?:\/\/[^\/]+\/a\/[^\/]+\/?).*/;
var USER_NUMBER_RE = /(\/mail\/b\/([0-9])+\/u\/([0-9])+\/|\/mail\/u\/([0-9])+\/)/ // keep regexp order!
var IS_NEW_COMPOSE = null;
var SELECTOR = {
  'msgbody' : 'textarea[@name=body],textarea[@name=]',
  'rt_msgbody' : 'iframe',
  'subject' : 'input[@name=subject]',
  'to' : 'textarea[@name=to]',
  'from' : 'select[@name=from], input[@name=from]',
  'cc' : 'textarea[@name=cc]',
  'bcc' : 'textarea[@name=bcc]'
};
var SELECTOR_NEW_COMPOSE = {
  'msgbody' : 'input[@name=body]',
  'rt_msgbody' : 'iframe',
  'subject' : 'input[@name=subject],input[@name=subjectbox]',
  'to' : 'textarea[@name=to]',
  'from' : 'input[@name=from]',
  'cc' : 'textarea[@name=cc]',
  'bcc' : 'textarea[@name=bcc]'
};

// Add jQuery
var $ = null;
var GM_JQuery = null;

// self.location.href?
/*try {
  if (document.location.href!=top.location.href) return;
} catch(err) {
  debugLog(err);
  return;
}*/

GM_JQuery = document.getElementById('gts_jquery');
if (GM_JQuery) {
  debugLog('appended script element on '+document.location.href);
  return;
}

GM_JQuery = document.createElement('script');
GM_JQuery.src = document.location.protocol + '//ajax.googleapis.com/ajax/libs/jquery/1.2/jquery.min.js';
GM_JQuery.type = 'text/javascript';
GM_JQuery.id = 'gts_jquery';
document.getElementsByTagName('head')[0].appendChild(GM_JQuery);

// Check if jQuery's loaded
function GM_wait(jQeuryLoadLimit) {
  try {
    $ = contentWindow.jQuery || this.jQuery;
  } catch(err) {
    debugLog(err);
  }
  if ($ == null || typeof $ == 'undefined') {
    debugLog('jquery load check at '+jQeuryLoadLimit+'...');
    if (jQeuryLoadLimit <= 0) return;
    jQeuryLoadLimit--;
    window.setTimeout(GM_wait, 1000, jQeuryLoadLimit);
  } else {
    debugLog('jquery loaded at '+jQeuryLoadLimit+' times');
    gtsInit();
  }
}
GM_wait(8);


// Add Missing GM_ API functions for GreaseKit
if (typeof(GM_setValue) != 'function' && typeof(GM_getValue) != 'function') {
  function GM_setValue(name, value) {
    document.cookie = [
      name, '=', escape(value),
      ';expires=', (new Date(new Date().getTime() + 365 * 1000 * 60 * 60 * 24)).toGMTString()
    ].join('');
  }
  function GM_getValue(name, value) {
    var r = new RegExp(name + '=([^;]*)'), m;
    if (m = document.cookie.match(r)) {
      return unescape(m[1]);
    }
    return value;
  }
  function GM_delValue(name, value) {
    if (GM_getValue(name, false))
      document.cookie = name + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
  }
} else {
  var GM_delValue = GM_setValue;
}


/*
 *
 */
var gmail = null;
var T = new Array(100);
var Ja = false;
var recentView;

/*
 * get gmail elements
 */
function getViewType() {
  var str = '';
  switch (gmail.getActiveViewType()) {
    case 'tl': str = 'Threadlist'; break;
    case 'cv': str = 'Conversation'; break;
    case 'co': str = 'Compose'; break;
    case 'ct': str = 'Contacts'; break;
    case 's': str = 'Settings'; break;
    default: str = 'Unknown';
  }
  return str;
}

function getView() {
  return document;
}

function isNewCompose(form) {
  if (IS_NEW_COMPOSE == null) {
    IS_NEW_COMPOSE = ($('input[@name=from]', form || getView()).attr('type') == 'hidden');
  }
  return IS_NEW_COMPOSE;
}

function getLabel(regstr, form) {
  var returnValue = null;

  if (isNewCompose()) {
    $('table', form).each(function() {
      $('span[@role=link]', this).each(function(i) {
        var l = $(this).html();
        var reg = new RegExp(regstr);
        if (l.match(reg)) {
          returnValue = $(this).get(0);
          return;
        }
      });
    });
  } else {
    $('form > table', getView()).each(function() {
      $('span', this).each(function(i) {
        var l = $(this).html();
        var reg = new RegExp(regstr);
        if (l.match(reg)) {
          returnValue = $(this).get(0);
          return;
        }
      });
    });
  }

  return returnValue;
}

function openRecipients(form) {
  $('div[@tabindex=1]').focus();
  // var target = getToLabelNewCompose('Recipients|宛先', form);
  // if (target) {
  //   $(target).parent().focus();
  // }
}
function getToLabelNewCompose(regstr, form) {
  var returnValue = null;
  $('div > div', form).each(function() {
    var l = $(this).html();
    var reg = new RegExp(regstr);
    if (l.match(reg)) {
      returnValue = $(this).get(0);
      return;
    }
  });
  return returnValue;
}

// 
function gtsInit() {
  debugLog("gtsInit");
  window.setTimeout(function() {
    initT();
    document.addEventListener('focus', function(event) {
      if (event.target.name != 'to' && event.target.name != 'body') {
        debugLog(event.target);
        return;
      }

      debugLog('focus to to or body element');
      initialize();
    }, true);

    // for Richtext format mode
    getView().addEventListener('DOMNodeInserted', nodeInsertedHandler, false);
  }, 100);
}

// 
function initT() {
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
      'body_latter' : '',
      'body_rt' : '',
      'body_rt_latter' : ''
    }
  }
}

function viewChanged() {
  debugLog('viewChanged');
  str = getViewType();

  if (str != "Compose" && str != "Conversation") {
    if (recentView) {
      recentView.removeEventListener('DOMNodeInserted', nodeInsertedHandler, false);
    }
    return;
  }
  recentView = getView();
  window.setTimeout(function() {
    initialize();
  }, 600);
}

function nodeInsertedHandler(event) {
  var target = event.target;
  if (target.nodeType == 1) {
    tagName = target.tagName.toLowerCase();
    if (tagName == 'form') {
      debugLog('form inserted');
      window.setTimeout(function() {
        initialize();
      }, 100);
    } else if (tagName == 'table') {
      debugLog('table inserted');
      window.setTimeout(function() {
        initialize();
      }, 100);
    } else if (tagName == 'iframe') {
      debugLog('iframe inserted');
      $('form', getView()).each(function() {
        if (!isComposeForm(this)) {
          return true;
        }
        $(x('r'), this).each(function(i) {
          $(this).ready(function() {
            window.setTimeout(function() {
              initialize();
            }, 100);
          });
        });
      });
    }
  }        
}

function isComposeForm(form) {
  if ($(form).attr('method').toLowerCase() == 'get') {
    return false;
  }
  if ($(form).attr('action') != '') {
    return false;
  }
  return true;
}

function initialize() {
  debugLog('initialize');

  try {
    if ($('#id_gts_template', getView()).is('select')) {
      debugLog('already initialized');
      return;
    }
    $('form', getView()).each(function() {
      if (!isComposeForm(this)) {
        return true;
      }
      var label_elm = $('div[role=navigation] div[role=button]:eq(0)', getView());
      var label = 'english'
      if (label_elm.attr('aria-label')) {
        label = label_elm.attr('aria-label');
      } else {
        label = label_elm.text();
      }
      debugLog('label:'+label);
      if (label) {
        Ja = label.match(/^[a-z0-9]/i) ? false : true;
      }
      $(this).prepend(createSelectElement());
      composeCommand(this);
    });
  } catch(e) {
    debugLog('initialize failure because : ' + e);
    return;
  }
}

function createSelectElement() {
  var content = $('<select id="id_gts_template" style="margin-left:6px;font-size:.8em;">').append(toOption('please wait...' , false , true)).change(function(event) {
    doCommand(event.target);
  });
  return content;
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

function doCommand(selectNode) {
  $('form', getView()).each(function() {
    if (!isComposeForm(this)) {
      return true;
    }
    if (selectNode.value == 'add') {
      addTemplate(this, true);
    } else if (selectNode.value == 'add_ignore_from') {
      addTemplate(this, false);
    } else if (selectNode.value.match(/apply_(\d+)/)) {
      applyTemplate(RegExp.$1 , this);
    } else if (selectNode.value.match(/delete_(\d+)/)) {
      deleteTemplate(RegExp.$1 , this);
    } else if (selectNode.value == 'undo') {
      //var w = typeof unsafeWindow != "undefined" && unsafeWindow || window;
      //if (w.gts_undo) { w.gts_undo(); }
      if (contentWindow.gts_undo) { contentWindow.gts_undo(); }
    }
    selectNode.value = 'init';
  });
}

function composeCommand(form) {
  debugLog('call composeCommand');
  debugLog('this form is new compose: ' + isNewCompose(form));

  getTemplates(function /*parseTemplate*/(notes, use_cache) {
    $.each(notes, function(i, data) {
      if (use_cache) {
        T[i] = notes[i];
      } else {
        var note = data.note ? decode(data.note, false) : "{}";
        try {
          T[data.num] = eval(note);
          T[data.num].id = data.id;
          T[data.num].json = data.json
          T[data.num] = decode(T[data.num], true);
        } catch(e) {
          debugLog('eval failed : ' + e);
        }
      }
    });

    recomposeSelectElement(form);
    applyDefault(form);
    if (notes.length == 0) {
      save();
    } else if (!use_cache) {
      var caches = [];
      $.each(T, function(i, v) {
        //caches.push(encode(v, true).toSource()); 
        caches.push(toSource(encode(v, true))); 
      });
      window.setTimeout(function() {
        GM_setValue(KEY_CACHE, "[" + caches.join(", ") + "]");
      }, 0);
    }
  });
}
function applyDefault(form) {
  debugLog('call applyDefault');
  $(x('f'), form).each(function(k, v) {
    var fromvalue = this.value;
    matched = $.grep(T, function(i) {
      return (i.name + '').indexOf('#') == 0 && i.from == fromvalue;
    });
    if (matched.length > 0) {
      applyTemplate(matched[0].num, form);
    }
  });
}
function recomposeSelectElement(form) {
  debugLog('call recomposeSelectElement');
  var options = [];
  options.push(toOption(trans('Template actions...'), 'init', true, 'gts_option_first'));

  var enables = $.grep(T, function(o) {return (o.name && o.num != 0);});
  enables.sort(EnablesSorting);
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
      if (used.length < 99) {
        arrays.push(toOption('&nbsp;&nbsp;' + trans("Includes from") , cmd));
        arrays.push(toOption('&nbsp;&nbsp;' + trans("Excludes from") , cmd + '_ignore_from'));
      } else {
        arrays.push(toOption('&nbsp;&nbsp;' + trans('Quantity limit is 99')));
      }
    }},
    {'cmd':'delete','exp':trans('Remove'), 'func':expand}
  ], function(i, v) {
    if (v.func == expand && enables.length ==0) { return; }
    options.push(toOption('-------'));
    options.push(toOption(trans('verbs', v.exp) + ':'));
    v.func(options, v.cmd);
  });

  $('#id_gts_template', getView()).empty().append(options.join('')).each(function(){
    this.value = 'init';
  });

}
function addTemplate(form, contain_from) {
  debugLog('call addTemplate');
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

  if (isNewCompose(form)) {

    var empties = $.grep(T , function(o) { return (o.name || o.num == 0) }, true);
    var t = empties[0];
    $.extend(T[t.num], {
      'num' : t.num,
      'id' : t.id,
      'name' : name,
      'from' : contain_from ? $(x('f') , form).val() : "",
      'to' : $.map($('input[@name=to]', form).get(), function(n, i) { return n.value; }).join(','),
      'cc' : $.map($('input[@name=cc]', form).get(), function(n, i) { return n.value; }).join(','),
      'bcc' : $.map($('input[@name=bcc]', form).get(), function(n, i) { return n.value; }).join(','),
      'subject' : $(x('s') , form).val(),
      'body' : $(x('m') , form).val(),
      'body_rt' : ""
    });

    if (MSGBODY_RE_NEW_COMPOSE.exec(T[t.num].body)) {
      T[t.num].body = RegExp.$1;
      T[t.num].body_latter = RegExp.$2;
    }

  } else {

    var empties = $.grep(T , function(o) { return (o.name || o.num == 0) }, true);
    var t = empties[0];
    var body_rt_content = '';
    try {
      body_rt_content = $(x('r') , form).contents().find("body")[0].innerHTML || "";
    } catch(e) {
      debugLog('body_rt iframe not found.');
    }
    $.extend(T[t.num], {
      'num' : t.num,
      'id' : t.id,
      'name' : name,
      'from' : contain_from ? $(x('f') , form).val() : "",
      'to' : $(x('t') , form).val(),
      'cc' : $(x('c') , form).val(),
      'bcc' : $(x('b') , form).val(),
      'subject' : $(x('s') , form).val(),
      'body' : $(x('m') , form).val(),
      'body_rt' : body_rt_content
    });

    if (MSGBODY_RE.exec(T[t.num].body)) {
      T[t.num].body = RegExp.$1;
      T[t.num].body_latter = RegExp.$2;
    }
    if (MSGBODY_RT_RE.exec(T[t.num].body_rt)) {
      T[t.num].body_rt = RegExp.$1;
      T[t.num].body_rt_latter = RegExp.$2;
    }

  }

  editContact(T[t.num], function() {
    recomposeSelectElement(form);
    msg(trans('appended', name));
  });
}
function applyTemplate(num , form) {
  debugLog('request apply : ' + num);

  if (isNewCompose(form)) {

    var span = {'cc':'Cc', 'bcc':'Bcc'};

    if (typeof T[0]._init == 'undefined') {
      T[0]._init = [];
    }
    T[0]._init.push({});
    $(x('f,s'), form).each(function(i) {
      if (this.name) {
        T[0]._init[T[0]._init.length-1][this.name] = $.trim(this.value);
      }
    });
    $(x('t,c,b'), form).each(function(i) {
      if (this.name) {
        T[0]._init[T[0]._init.length-1][this.name] = $.map(
          $('input[@name='+this.name+']', form).get()
        , function(n, i) { return n.value; }).join(',');
      }
    });
    $(x('m'), form).each(function(i) {
      $('table div[@contenteditable=true]', $(form).parent()).each(function(i, v){
        T[0]._init[T[0]._init.length-1]["body"] = $.trim($(this).html());
      });
      $('table iframe', $(form).parent()).each(function(i, v){
        T[0]._init[T[0]._init.length-1]["body"] = $.trim($($(this).contents().find("body")[0]).html());
      });
    });

    /*$(x('t,c,b'), form).each(function(i) {
      // emulate delete
      $('div:has(span) span', $(this).parent()).each(function(){
        emulate_click($('div:eq(1)', this).get(), form);
      });
    });*/

    openRecipients(form);
    $(x('f,s,t,c,b'), form).each(function(i) {
      if (span[this.name]  && T[num][this.name]) {
        var target = getLabel(span[this.name], form);
        if (target) {
          emulate_click(target, null);
        }
      }

      var tmp = T[0]._init[T[0]._init.length-1][this.name];
      if (this.type == 'textarea') {
        var targetaddrs = tmp || '';
        //既に含まれているものは追加しない
        var notcontains = $.grep(T[num][this.name].split(','), function(i) {
          if ($.trim(i).length == 0) { return; }//空白は無視
          if (/([\w\.+-]+@[\w+-]+(\.[\w+-]+)+)/.exec(i)) {
            return targetaddrs.indexOf(RegExp.$1) < 0;
          } else {
            return targetaddrs.indexOf(i) < 0;
          }
        });
        this.value = notcontains.join(', ');

        $(this).focus();
      } else if (this.name == 'from' && (this.value == T[num][this.name] || !T[num][this.name])) {
        return;
      } else {
        if (this.name == 'from') {
          this.value = T[num]['from'];
          $('div[@role=menuitem][@value='+T[num]['from']+']').each(function(){
            $('div[@role=button] span', form).html($('div', $(this)).html());
          });
        } else if (this.name == 'subjectbox') {
          this.value = (tmp) ? tmp : T[num]['subject'];
          $(this).focus();
        } else {
          this.value = (this.name == 'subject' && tmp) ? tmp : T[num][this.name];
        }
      }    
    });

    $('table div[@contenteditable=true]', $(form).parent()).each(function(i, v){
      debugLog('body found!');
      var $b = $(this);
      if (T[num].body_rt || T[num].body_rt_latter) {
        $b.html($.grep([
          T[num].body_rt, T[0]._init[T[0]._init.length-1].body, T[num].body_rt_latter
        ], function(i) { return i; }).join("<br>"));
      } else {
        $b.html($.grep([
          T[num].body, T[0]._init[T[0]._init.length-1].body, T[num].body_latter
        ], function(i) { return i; }).join("\n").replace(/\r\n/g, '<br>').replace(/(\r|\n)/g, '<br>'));
      }
      $b.focus();
    });
    $('table iframe', $(form).parent()).each(function(i, v){
      debugLog('body found!');
      var $b = $($(this).contents().find("body")[0]);
      if (T[num].body_rt || T[num].body_rt_latter) {
        $b.html($.grep([
          T[num].body_rt, T[0]._init[T[0]._init.length-1].body, T[num].body_rt_latter
        ], function(i) { return i; }).join("<br>"));
      } else {
        $b.html($.grep([
          T[num].body, T[0]._init[T[0]._init.length-1].body, T[num].body_latter
        ], function(i) { return i; }).join("\n").replace(/\r\n/g, '<br>').replace(/(\r|\n)/g, '<br>'));
      }
      $b.focus();
    });

    $(x('s,t'), form).each(function() {
      if (!this.value) {
        //$(this).focus();
  /*
        this.selectionStart = 0;
        this.selectionEnd = 0;
  */
      }
    });
    $(x('m'), form).each(function() {
      if ((this.name == 'body' || this.name == '') && $(this).parent().parent().css("display") != "none") {
        //$(this).focus();
  /*
        this.selectionStart = 0;
        this.selectionEnd = 0;
  */
      } else {
        $(x('r'), form).each(function() {
  /*
          $(this).contents().find("body")[0].selectionStart = 0;
          $(this).contents().find("body")[0].selectionEnd = 0;
  */
        });
      }
    });

  } else {

    var span = {'from':'change|変更', 'subject':'Subject|件名', 'cc':'Cc', 'bcc':'Bcc'};

    if (typeof T[0]._init == 'undefined') {
      T[0]._init = [];
    }
    T[0]._init.push({});
    $(x('f,s,t,c,b,m'), form).each(function(i) {
      if (this.name) {
        T[0]._init[T[0]._init.length-1][this.name] = $.trim(this.value);
      } else { // body
        T[0]._init[T[0]._init.length-1]["body"] = $.trim(this.value);
      }
    });
    $(x('r'), form).each(function(i) { T[0]._init[T[0]._init.length-1]["body_rt"] = $.trim($(this).contents().find("body")[0].innerHTML); });

    $(x('f,s,t,c,b'), form).each(function(i) {
      if (span[this.name]  && T[num][this.name]) {
        var target = getLabel(span[this.name], form);
        if (target) {
          emulate_click(target, null);
        }
      }

      var tmp = T[0]._init[T[0]._init.length-1][this.name];
      if (this.type == 'textarea') {
        var targetaddrs = tmp || '';
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
    });

    $(x('m'), form).each(function(i, v) {
      this.value = $.grep([
        T[num].body, T[0]._init[T[0]._init.length-1].body, T[num].body_latter
      ], function(i) { return i; }).join("\n\n");
    });
    $(x('r'), form).each(function(i, v) {
      var b = $(this).contents().find("body")[0];
      if (!T[num].body_rt && !T[num].body_rt_latter) {
        var tmp_body = (T[num].body || "").replace(/\r\n/g,"<br>").replace(/(\n|\r)/g,"<br>");
        var tmp_body_latter = (T[num].body_latter || "").replace(/\r\n/g,"<br>").replace(/(\n|\r)/g,"<br>");

        $(b).html($.grep([
          tmp_body, T[0]._init[T[0]._init.length-1].body_rt, tmp_body_latter
        ], function(i) { return i; }).join("<br>"));
      } else {
        $(b).html($.grep([
          T[num].body_rt, T[0]._init[T[0]._init.length-1].body_rt, T[num].body_rt_latter
        ], function(i) { return i; }).join("<br>"));
      }
    });

    $(x('s,t'), form).each(function() {
      if (!this.value) {
        //$(this).focus();
  /*
        this.selectionStart = 0;
        this.selectionEnd = 0;
  */
      }
    });
    $(x('m'), form).each(function() {
      if ((this.name == 'body' || this.name == '') && $(this).parent().parent().css("display") != "none") {
        //$(this).focus();
  /*
        this.selectionStart = 0;
        this.selectionEnd = 0;
  */
      } else {
        $(x('r'), form).each(function() {
  /*
          $(this).contents().find("body")[0].selectionStart = 0;
          $(this).contents().find("body")[0].selectionEnd = 0;
  */
        });
      }
    });

  }

  var undos = [
    toOption('-------', null, null, "gts_undo_option"),
    toOption('&nbsp;&nbsp;' + trans("Undo"), 'undo', null, "gts_undo_option")
  ];
  $('#id_gts_template .gts_undo_option', getView()).remove();
  $('#id_gts_template .gts_option_first', getView()).after(undos.join(''));

  msg(trans('applied', T[num].name), function() {
    undo(form);
    msg(trans("To apply template was canceled."));
    return false;
  }, true);
}
function undo(form) {
  debugLog('undo');

  if (isNewCompose(form)) {
    
    if (typeof T[0]._init != 'undefined') {
      var item = T[0]._init.pop();

      openRecipients(form);
      $(x('t,c,b'), form).each(function() {
        // emulate delete
        $('div:has(span) span', $(this).parent()).each(function(){
          emulate_click($('div:eq(1)', this).get(), form);
        });
        if (this.name) {
          this.value = item[this.name];
          $(this).focus();
        }
      });
      $(x('f'), form).each(function() {
        if (this.value == item['from'] || !item['from']) {
          return;
        }
        this.value = item['from'];
        $('div[@role=menuitem][@value='+item['from']+']').each(function(){
          $('div[@role=button] span', form).html($('div', $(this)).html());
        });
      });

      $('table div[@contenteditable=true]', $(form).parent()).each(function(i, v){
        debugLog('body found!');
        $(this).html(item["body"]);
        $(this).focus();
      });
      $('table iframe', $(form).parent()).each(function(i, v){
        debugLog('body found!');
        var $b = $($(this).contents().find("body")[0]);
        $b.html(item["body"]);
        $b.focus();
      });

    }

  } else {

    if (typeof T[0]._init != 'undefined') {
      var item = T[0]._init.pop();

      $(x('t,c,b,m'), form).each(function() {
        if (this.name) {
          this.value = item[this.name];
        } else { // body
          this.value = item["body"];
        }
      });
      $(x('r'), form).each(function() { $(this).contents().find("body")[0].innerHTML = item["body_rt"]; });
    }

  }

  if (typeof T[0]._init != 'undefined' && T[0]._init.length <= 0) {
    $('#id_gts_template .gts_undo_option', getView()).remove();
  }
}
function emulate_click(target, form) {
  $(target, form).each(function(i) {
    if (this.dispatchEvent) {
      var e = document.createEvent('MouseEvents');
      e.initEvent("click", true, true);
      this.dispatchEvent(e);
    }
  });
}
function emulate_mousedown(target, form) {
  $(target, form).each(function(i) {
    if (this.dispatchEvent) {
      var e = document.createEvent('MouseEvents');
      e.initEvent("mousedown", true, true);
      this.dispatchEvent(e);
    }
  });
}
function emulate_mouseup(target, form) {
  $(target, form).each(function(i) {
    if (this.dispatchEvent) {
      var e = document.createEvent('MouseEvents');
      e.initEvent("mouseup", true, true);
      this.dispatchEvent(e);
    }
  });
}
function deleteTemplate(num , form) {
  var name = T[num].name;
  if (confirm(trans('remove confirm', name)) != true) {
    return;
  }

  debugLog('request delete : ' + num);
  T[num] = {'id' : T[num].id, 'num' : num};
  editContact(T[num], function() {
    recomposeSelectElement(form);
    msg(trans("removed", name));
  });
}
function getTemplates(f_parseTemplate) {
  debugLog('call getTemplates');

  var queryUrl = 'c/'+getUserNumber()+'data/contactstore?ac=false&groups=false&ev=false&max=250&out=js&type=4&tok=gtssettings';
  ajax(queryUrl, function(req){
    contactPage = req.replace('while (true); ', '').replace(/&&&START&&&([^&&&]+)&&&END&&&/, "$1");
    response = eval("(" + contactPage + ")");
    if (response.Success) {
      var contacts = eval("(" + response.Body.Contacts + ")");
      var notes = [];
      for(i=0; i<contacts.length; i++) {

        var contact = (contacts[i])[1];
        debugLog('contact: '+contact);

        var c_id = contact[2];
        var c_name = contact[5][3][2][2]; // contact[5][3][2][4], contact[5][47][2][0][2], contact[5][47][2][0][4]
        var c_email = contact[5][4][2][0][4];
        var c_note = contact[5][7][2];

        if ( (c_name && /gtssettings(\d$)/.exec(c_name)) || (c_name && /gtssettings(\d\d$)/.exec(c_name)) ) {
          num = RegExp.$1;
          note = c_note;
          id = c_id;
          notes.push({'num' : num, 'note' : note, 'id' : id});
        }
      }
      var authtoken = response.Body.AuthToken.Value;
      window.setTimeout(function() {
        GM_setValue(KEY_TOKEN, authtoken);
      }, 0);
      f_parseTemplate(notes);
    } else {
      debugLog("Contacts Request Failed: " + response.Errors[0].Text);
    }
  });
}
function editContact(tmpl, f_completed) {
  window.setTimeout(function() {
    var authtoken = GM_getValue(KEY_TOKEN);
    if (!authtoken) {
      debugLog('token not found');
      return;
    }
    var escaped = encode(tmpl, true);
    var post_data = $.param({
      'token' : authtoken, 
      'tok' : authtoken,
      'out' : 'js',
      'id' : tmpl.id,
      'action' : 'SET',
      'Name' : CONTACT_NAME + tmpl.num,
      'Emails.0.Address' : CONTACT_NAME+tmpl.num+'@gmail.com',
      'Notes' : encode(escaped, false)
    });

    ajax('c/'+getUserNumber()+'update/contact', function(req) {
      var response = eval("(" + req.replace('while (true); ', '').replace(/&&&START&&&([^&&&]+)&&&END&&&/, "$1") + ")");
      if (response.Success) {
        if (tmpl.id == -1) {
          if (CONTACT_ID_RE1.exec(req) || CONTACT_ID_RE2.exec(req)) {
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
      } else {
        debugLog('Update Contact Request Failed: '+response.Errors[0].Text);
        alert('Update Contact Request Failed: '+response.Errors[0].Text.replace(/.$/,'')+' or try to reload this page.');
      }
    }, 'POST', {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}, post_data);
  }, 0);
}
function encode(tmpl, by_escape) {
  if (by_escape) {
    var escaped = {};
    /* encodeURIだと「'」がエンコードされないので、escapeを使う */
    $.each(tmpl, function(i, v) {
      if (i.indexOf('_') == 0) { return; }
      escaped[i] = escape(v);
    });
    return escaped;
  } else {
    /* 連絡先は「"」で囲まれるため、JSONデータを表すのに「"」を使えない。
       連絡先から復元するときに使うデータを、REGEXでマッチさせるため「"」を「'」に置換しておく。 */
    //return tmpl.toSource().replace(/\"/g, "'");
    return toSource(tmpl).replace(/\"/g, "'");
  }
}
function decode(tmpl, by_unescape) {
  if (by_unescape) {
    var unescaped = {};
    $.each(tmpl, function(k, v) {unescaped[k] = unescape(v);});
    return unescaped;
  } else {
    /* 連絡先に格納するために、「'」に変換しておいた「"」を戻す */
    return tmpl.replace(/\\'/g, "\"");
  }
}
function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? decodeURI(value[1]) : null;
}
function msg(message, f_clicked, use_undo) {
  //var w = typeof unsafeWindow != 'undefined' && unsafeWindow || window;
  //w.gts_undo = f_clicked;
  if (f_clicked) { contentWindow.gts_undo = f_clicked; }
  $("table[role='alert']", getView().ownerDocument).each(function() {
    $('td:eq(4)', this).html('GTS : '+message);
    if (use_undo) {
      $('td:eq(4)', this).append($('<span id="link_undo" class="SdKLH Pns21c" >').text(trans('Undo link')).click(f_clicked));
    }
    $(this).parent().css('visibility', 'visible');
    window.setTimeout(function() {
      $("table[role='alert']", getView().ownerDocument).each(function() {
        var re = new RegExp('GTS : '+message);
        if ($('td:eq(4)', this).html().match(re)) {
          $(this).parent().css('visibility', 'hidden');
        }
      });
    }, 10000);
  });
}
function save(f_saved) {
  debugLog('T[0].id: '+T[0].id);
  T[0]['num'] = 0;
  T[0].date = new Date();
  editContact(T[0], f_saved ? f_saved : function() {});
}
function ajax(request_path, f_load, get_or_post, headers, data) {
  window.setTimeout(function() {
    $.ajax({
      'type': get_or_post ? get_or_post : "GET",
      'url': getBaseLocation() + request_path,
      'data': data,
      'headers': headers,
      'success': f_load,
      'error': function(req) {
        debugLog("Request Failed in error code: " + req.status);
      }
    });
  }, 0);
}
function getBaseLocation() {
  if (LOCATION_RE.exec(document.location)) {//for Google Apps
    return RegExp.$1;
  } else {
    http = 'http';
    if (window.location.toString().charAt(4) == 's') {
      http = 'https';
    }
    return http + '://mail.google.com/mail/';
  }
}
function getUserNumber() {
  var user_number = 'u/0/';
  var user_no_string = USER_NUMBER_RE.exec(document.location);
  if (user_no_string) {
    user_number = user_no_string[0].replace(/^\/mail\//, '');  
  }
  debugLog("user number is " + user_number);
  return user_number;
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
    'applied' : Ja ? ("テンプレート「"+opt+"」を適用しました。")
      : ('Template "' + opt + '" was applied. '),
    'remove confirm' : Ja ? ("テンプレート「" + opt + "」を削除しますか？")
      : ('Is template "' + opt + '" removed?'),
    'removed' : Ja ? ("テンプレート「" + opt + "」を削除しました。")
      : ('Template "' + opt + '" was removed.'),
    'To apply template was canceled.' : Ja ? "テンプレートの適用は取り消されました。" : msg_id,
    'Undo' : Ja ? "適用の取り消し" : msg_id,
    'Undo link' : Ja ? "適用取り消し" : "Undo applied",
    'No from' : Ja ? "差出人なし" : msg_id
  }[msg_id] || msg_id;
}
function x(prefix) {
  var result = [];
  var S = (IS_NEW_COMPOSE == true) ? SELECTOR_NEW_COMPOSE : SELECTOR;
  $.each(S, function(i, v) {
    if (typeof prefix != 'undefined') {
      if ($.grep(prefix.split(','), function(j) { return i.indexOf(j) == 0; }).length == 0) {
        return;
      }
    }
    result.push(v);
  });
  return result.join(', ');
}
/*
 * Thanks, onigf!
 * http://userscripts.org/users/130344
 */
function EnablesSorting(a,b) {
  a = a.name;
  b = b.name;
  return a == b ? 0 : (a < b ? -1 : 1);
}
/*
 * Thanks
 * http://opera.higeorange.com/misc/jsToSource.html
 * http://blog.livedoor.jp/dankogai/archives/50957994.html
 */
function toSource(obj) {
  if (typeof obj.toSource != 'undefined') return obj.toSource();

  var con = obj.constructor;
  if (con == Boolean) {
    return obj.toString();
  } else if (con == Number) {
    return obj.toString();
  } else if (con == String) {
    return '\"'+obj.toString().replace(/[\\\"\']/g, function(m0) {
      return '\\' + m0;
    })+'\"';
  } else if (con == Date) {
    return '(new Date('+obj.valueOf()+'))';
  } else if (con == RegExp) {
    return obj.toString();
  } else if (con == Function) {
    return obj.toString();
  } else if (con == Array) {
    var src = [];
    for (var i=0, l=obj.length; i<l; i++) {
      src[i] = toSource(obj[i]);
    }
    return '['+src.toString()+']';
  } else if (con == Object) {
    var src = [];
    for (var p in obj) {
      if (!obj.hasOwnProperty(p)) continue;
      //src[src.length] = toSource(p) + ':' + (obj[p] ? toSource(obj[p]) : obj[p] === undefined ? 'undefined' : 'null');
      src[src.length] = toSource(p) + ':' + toSource(obj[p]);
   }
    // parens needed to make eval() happy
    return '({'+src.toString()+'})';
  }
}
function debugLog(str){
  if (DEBUG_MODE){
    if (typeof(GM_log) != 'function' && typeof(opera) != 'undefined') {
      GM_log = opera.postError; // for opera
    }
    //GM_log(str);
    console.log(str);
  }
}

})(this.contentWindow||typeof unsafeWindow != 'undefined' && unsafeWindow||window);

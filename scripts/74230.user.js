// ==UserScript==
// @require       http://mwswh.googlecode.com/files/jquery.js
// @name          Mafia Wars Simple Wall Helper
// @description   This helper will visit your mafia wars on Facebook feed page
//                automatically. Tested on Firefox 3.6.3 and lastest version of
//                Greasemonkey. No support for Chrome yet.
//                Details on the script page
// @author        caesar2k
// @version       1.15
// @namespace     mwswh
// @include       http*://www.*facebook.com/home*filter=app_10979261223*
// @exclude       http*://www.*facebook.com/home*filter=app_10979261223*#noop
// @exclude       http*://www.*facebook.com/home*filter=app_10979261223*#beta
// @include       http://mwfb.zynga.com/mwfb/remote/*#*
// @include       http://facebook.mafiawars.com/mwfb/remote/*#*
// ==/UserScript==

var SCRIPT = {
  intVersion: 115,
  version: '1.15',
  title: 'Mafia Wars Simple Wall Helper',
  name: 'inthemafia',
  appID: 'app10979261223',
  appNo: '10979261223',
  presentationurl: 'http://userscripts.org/scripts/show/69076',
  url: 'http://userscripts.org/scripts/source/69076.user.js',
  metadata: 'http://userscripts.org/scripts/source/69076.meta.js'
};

// Chrome compatibility from Mafia Wars Auto Player with some modifications

if (typeof(unsafeWindow) == 'undefined') {
  unsafeWindow = window;
  unsafeWindow.window = unsafeWindow;
}

function isempty(data) {
  try {
    if (typeof data == 'undefined' || data == undefined || data == null) return true;
    if (typeof data == 'string') {
      if (data == '') {
        return true;
      }
    } else
    if (typeof data == 'number') {
      if (data == 0 || isNaN(data) || !isFinite(data)) {
        return true;
      }
    } else
    if (typeof data == 'object'){
      var x;
      for (x in data){
          return false;
      }
      return true;
    }

    return false;
  } catch (exception) {
    return true;
  }
}

function more_info_a(data) {
  if (isempty(data)) return '';
  return ' <a class="moreinfo">[+]<span>' + data + '</span></a>';
}

function new_link(text, url, szclass, time, post_link, more_info) {
  var html = '<a target="_blank" href="' + url + '"';

  if (typeof szclass != 'undefined' && !isempty(szclass)) html += ' class="' + szclass + '"';
  if (typeof time != 'undefined' && !isempty(time)) html += ' title="' + date_locale(time) + '"';

  html += '>' + text;

  if (typeof post_link != 'undefined' && !isempty(post_link))
    html += '</a> from <a href="' + post_link + '" target="_blank">post</a>';
  else
    html += '</a>';

  if (typeof more_info != 'undefined' && !isempty(more_info)) html += more_info_a(more_info);

  return html;
}

String.prototype.get_document = function (fragment){
  var d = null, doc = null, ret = null, r;

  try {
    var range = document.createRange();
    var htmlDoc = document.implementation.createDocument(null, 'html', null);
    range.setStartAfter(document.body);
    var frag = range.createContextualFragment(String(this));
    htmlDoc.adoptNode(frag);
    htmlDoc.documentElement.appendChild(frag);
  } catch (exception) {
    GM.log('Exception: ' + exception);
  }

  return htmlDoc;
}

String.prototype.between = function(begin, end, same) {
  var t = this.split(begin);
  if (typeof t != 'undefined' && !isempty(t) && typeof t[1] != 'undefined' && !isempty(t[1])) {
    t = t[1].split(end);
    if (typeof t != 'undefined' && !isempty(t) && typeof t[0] != 'undefined' && !isempty(t[0])) {
      t = t[0];
    } else t = same?this:'';
  } else t = same?this:'';
  return t;
}

String.prototype.unescape = function () {
  try {
    return this.replace(/\\/g, '').replace(/&amp;/g, '&');
  } catch (exception) {
    return this;
  }
}

Number.prototype.splitTime = function (){
  var hours = Math.floor(this/3600);
  var minutes = Math.floor(this/60)-(hours*60);
  var seconds = this-(hours*3600)-(minutes*60);

  var hs=' hour';
  var ms=' minute';
  var ss=' second';

  if (hours!=1) {hs+='s'}
  if (minutes!=1) {ms+='s'}
  if (seconds!=1) {ss+='s'}

  return hours+hs+', '+minutes+ms+', '+seconds+ss
}


String.prototype.strip_tags = function(delete_iframe) {
  if (isempty(this)) return '';

  if (typeof delete_iframe == 'undefined')
    delete_iframe = false;

  var new_str =
  this
    .replace(/[\r\n\t\v]+/gi, ' ')
    .replace(/<script.*?>[\s\S]*?<\/.*?script>/gi, '')
    .replace(/<link[^>]*?>/gi, '')
    .replace(/<style.*?>[\s\S]*?<\/.*?style>/gi, '')
    .replace(/(?!<=<.*?)(?:style|onload)="([^\"]*?)\"/gi, '')
    .replace(/(?!<=<.*?)(?:style|onload)='([^\']*?)\'/gi, '')
    .replace(/(?!<=<.*)javascript.*:[^"]*/gi, '')
    .replace(/<img[^>]*>/gi, '');

  if (delete_iframe)
    new_str = new_str.replace(/<iframe.*?>[\s\S]*?\/iframe>/gi, '');

  return new_str;
}

var GMSTORAGE_PATH = 'GM_' + SCRIPT.appID + '_';

// "Greasemonkey" object, to be able to work with chrome and opera
var GM = {
  addStyle: null,
  log: null,
  getValue: null,
  setValue: null,
  deleteValue: null,
  ajax: null,
  load: function(){
  // addStyle
  {
    var addstyle_function;

    if (typeof GM_addStyle == 'function') {
      addstyle_function = GM_addStyle;
    } else {
      addstyle_function = function(style_str){
        $('head').append('<style type="text/css"> ' + style_str + ' </style>');
      }
    }

    this.addStyle = function(style){
      addstyle_function(style);
    }
  }

  // log
  {
    var log_function = null;

    if (typeof GM_log == 'function') {
      log_function = GM_log;
    } else if (typeof console != 'undefined' && typeof console.log != 'undefined') {
      log_function = console.log;
    }

    this.log = function(str){
      if (config.log == 0) return;
      var to_log = current_time_readable() + ': ' +str;
      if (log_function) log_function(to_log);
      logging.unshift(to_log);
      logging = logging.slice(0, config.log);
    }
  }

  //////////////////////////////////
  var ws = null;
  try {
    ws = typeof(unsafeWindow.localStorage);
    if (unsafeWindow.localStorage.length) {}
  } catch(e) {
    ws = null;
  } // Catch Security error

  //////////////////////////////////


  // setValue

  {
      var setvalue_function = null;
      
      if (typeof GM_setValue == 'function') {
        setvalue_function = GM_setValue;
      } else if (ws == 'object'){
        setvalue_function = function(name, value) {
          switch (typeof(value)) {
            case 'string':
              unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name,'S]' + value);
              break;
            case 'number':
              if (value.toString().indexOf('.') < 0) {
                unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name,'N]' + value);
              }
              break;
            case 'boolean':
              unsafeWindow.localStorage.setItem(GMSTORAGE_PATH + name,'B]' + value);
              break;
          }
        }
      }

      this.setValue = function(valueName, value){
        if (setvalue_function) {
          return setvalue_function(valueName, value);
        } else return false;
      }
    }

    // getValue
    {
      var getvalue_function = null;

      if (typeof GM_getValue == 'function') {
        getvalue_function = GM_getValue;
      }
      else if (ws == 'object'){
        getvalue_function = function(name, defValue) {
          var value = unsafeWindow.localStorage.getItem(GMSTORAGE_PATH + name);
          if(value == null) {
            if (defValue == null) {
              return '{}';
            } else { 
              return defValue;
            }
          } else {
            switch(value.substr(0,2)) {
              case 'S]':
                return value.substr(2);
              case 'N]':
                return parseInt(value.substr(2));
              case 'B]':
                return value.substr(2) == 'true';
            }
          }
          return value;
        }
      }

      this.getValue = function(valueName, defaultValue){
        try {
          if (getvalue_function) {
            return getvalue_function(valueName, defaultValue);
          } else return false;
        } catch (exception) { }
        return false;
      }
    }

    // deleteValue
    {
      var deletevalue_function = null;

      if (typeof GM_deleteValue == 'function') {
        deletevalue_function = GM_deleteValue;
      } else if (ws == 'object'){
        deletevalue_function = function(name) {
          unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH + name);
        }
      }

      this.deleteValue = function(valueName){
        try {
          if (deletevalue_function) {
            return deletevalue_function(valueName);
          } else return false;
        } catch (exception) { }
        return false;
      }
    }

    // ajax
    {
      var ajax_function = null;

      if (typeof GM_xmlhttpRequest == 'function') {
        ajax_function = GM_xmlhttpRequest;
      } else if (ws == 'object'){
        ajax_function = function(obj) {
          var request = new XMLHttpRequest();
          
          request.onreadystatechange = function() {
            if (obj.onreadystatechange) {
              obj.onreadystatechange(request);
            }
            
            if(request.readyState == 4 && obj.onload) {
              obj.onload(request);
            }
          }

          request.onerror = function() { 
            if(obj.onerror) {
              obj.onerror(request);
            }
          }
          
          try {
            request.open(obj.method, obj.url, true);
          } catch(e) {
            if(obj.onerror) {
              obj.onerror({
                readyState:4,
                responseHeaders:'',
                responseText:'',
                responseXML:'',
                status:403,
                statusText:'Forbidden'
              });
            }
            return null;
          }

          if(obj.headers) {
            for(name in obj.headers) {
              request.setRequestHeader(name,obj.headers[name]);
            }
          }
          
          request.send(obj.data);
          return request;
        }
      }

      this.ajax = function(obj){
        if (ajax_function) {
          return ajax_function(obj);
        } else return false;
      }
    }
  }
};

GM.load();

if (parseInt(GM.getValue('version', 0), 10) < SCRIPT.intVersion){
  try {
    GM.deleteValue('frames');
    GM.deleteValue('user_fields');
    GM.deleteValue('user_info');
  } catch (exception) {
    alert('Failed to load, report this error: ' + exception);
  }
  GM.setValue('version', SCRIPT.intVersion);
  if (confirm('[Optional Step] The page will reload to make sure the new '+
              'settings are applied. Want to do it now? If it doesnt work, '+
              'try cancel this step next time or try '+
              'restarting your browser')) {
    window.location.reload(true);
  }
}


function getPropertyCount(object){
  var count=0,
  property;
  for (property in object){
    if (object.hasOwnProperty(property)){
      count++;
    }
  }
  return count;
}

// JSON BEGIN

var JSON = JSON || unsafeWindow.JSON || {};

// implement JSON.stringify serialization
JSON.stringify = JSON.stringify || function (obj) {
  var t = typeof (obj);

  if (t != "object" || obj === null) {

    // simple data type
    if (t == "string") obj = '"'+obj.replace(/"/g, '\"')+'"';
    return String(obj);

  }
  else {

    // recurse array or object
    var n, v, json = [], arr = (obj && obj.constructor == Array);

    for (n in obj) {
      v = obj[n];
      t = typeof(v);

      if (t == "string") v = '"' + v.replace(/"/g, '\\"') +'"';
      else if (t == "object" && v !== null) v = JSON.stringify(v);

      json.push((arr ? "" : '"' + n.replace(/"/g, '\\"') + '":') + String(v));
    }

    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
};

// implement JSON.parse de-serialization
JSON.parse = JSON.parse || function (str) {
  if (str === "") str = '""';
  eval("var p=" + str + ";");
  return p;
};

// JSON END

jQuery.randomElement = 0;
jQuery.extend(jQuery.expr[':'],
{
  random: function(elem, index, match, len) {
    if (index == 0 && len.length) {
      jQuery.randomElement = Math.round(Math.random() * len.length) % len.length;
    } 
    return index == jQuery.randomElement;
  },
  regex: function(elem, index, match) {
    var
    matchParams = match[3].split(','),
    regexFlags = typeof matchParams[2] != 'undefined' ? matchParams[2] : 'i',
    myregex = new RegExp(matchParams[1].replace(/^\s+|\s+$/g, ''), regexFlags);

    var
    testAgainst;

    try{
      testAgainst = jQuery(elem)[matchParams[0]]();
    } catch(e){
      testAgainst = jQuery(elem).attr(matchParams[0]);
    }

    return myregex.test(testAgainst);
  }
});

var
  started = current_time(),
  id_prefix = 'mwswh_',
  total = 0,
  interval = 0,
  errors = 0,
  clicks = 0,
  retries = 0,
  hThreads = null,
  last_newest = 0,
  newest_post = null,
  worker_array = {},
  help_link = 'span a[href*="inthemafia/track"]',
  timestamp = 'abbr.timestamp[title]',
  game_url = null,
  facebook_ping = document.location.protocol + '//' + document.location.host + '/?ref=logo',
  has_words = {
    'jobs': {
      'text': /./i,
      'url': function(url){
        url = url.match(/controller\=(story|job|episode).*?action\=(social|give)_help([^_]*?_social)?.*from=(\d+).*friend=(\d+)/i);
        return (url) && (url[4] == url[5]);
      },
      'name': 'Help on jobs',
      'failed': /(too\slate|already|again|per\scity|a\scomment)/i,
      'results':[
        {query: 'div#mbox_generic_1 > div:eq(1)', not: /^[\s\t]*(Get|Send)/, type:'text'},
        {query: 'td.message_body:first', not: /^[\s\t]*(Get|Send)/},
        {query: 'div#msg_box_div_1 table td > div', not: /^[\s\t]*(Get|Send)/}
      ]
    },
    'target': {
      'text': /./i,
      'url': /action\=social_attack/i,
      'name': 'Attack next targets',
      'failed': /(already|invalid)/i,
      'results': [
        {query: 'td.message_body,div.fightres_title,div.fightres_stats', type:'text'}
      ]
    }, // Help xxx now
    'boost': {
      'text': /./i,
      'url': /action\=iced_boost_claim/i,
      'name': 'Iced Boosts',
      'failed': /(sorry|already)/i
    }, // Iced / killed
    'levelup': {
      'text': /./i,
      'url': /action\=levelup_boost_claim/i,
      'name': 'Level up bonus',
      'failed': /(sorry|already)/i
    }, // Iced / killed
    'boss': {
      'text': /./i,
      'url': /action\=claim_boss_bonus/i,
      'name': 'Boss',
      'failed': /(sorry|already)/i
    },
    'loot': {
      'text': /./i,
      'url': /action\=collect_fight_loot/i,
      'name': 'Fight loot',
      'failed': /(already|fight)/i
    },
    'achievement': {
      'text': /./i,
      'url': /action\=ach_celeb/gi,
      'name': 'Achievement',
      'failed': /(yourself|person|already|again|per\scity)/i
    },
    'events': {
      'text': /./i,
      'url': /action\=(holiday|event|redeem)/i,
      'name': 'Events rewards',
      'failed': /(already|sorry|maxed)/i
    },
    'robbing': {
      'text': /./i,
      'url': /controller\=robbing.*action=mastery/i,
      'name': 'Robbing',
      'failed': /(sorry|already)/i
    },
    'laudering': {
      'text': /./i,
      'url': /controller\=launder/i,
      'name': 'Money launder',
      'failed': /(already)/i,
      'results': [
        {query: 'div[id^=zy_popup_box_body]:regex(html,thanks|suspicious)'}
      ]
    },
    'stash': {
      'text': /./i,
      'url': /action\=collect_loot/i,
      'name': 'Stash loot',
      'failed': /(sorry|already)/i
    },
    'bounty': {
      'first': true,
      'text': /./i,
      'url': /controller\=hitlist/i,
      'name': 'Hitlist bounty',
      'repeatif': /(LOST|WON|hitlist)/,
      'failed': /(lost|already|sorry|weak|enough)/i,
      'results':[
        {query: 'td.message_body:first, div.fightres_title, div.fightres_stats', type:'text'},
        {query: 'div.fight_results > div:first'}
      ],
      'steps': function($, doc){return $('td.message_body a.sexy_button:regex(href, xw_action=attack)', doc);}
    },
    'supply': {
      'text': /./i,
      'url': /controller\=propertyV2/i,
      'name': 'Chop shop parts',
      'failed': /(today|passed)/i
    },
    'lotto': {
      'text': /./i,
      'url': /controller\=lotto/i,
      'name': 'Lottery',
      'failed': /(today|passed)/i
    },
    'war': {
      'first': true,
      'text': /./gi,
      'url': /controller\=war/i,
      'name': 'Go to war',
      'repeatif': /(can\snot)/i,
      'failed': /(Won|ended|already)/,
      'steps':
      function($, doc){
        return $('div#inner_page:first > div:eq(3) > center:eq(1) > div:eq(1) > div:eq(2) a.sexy_button'+
                 ',div#inner_page:first > div:eq(3) > center:eq(1) > div:eq(0) > div:eq(2) a.sexy_button', doc);
      }
    },
    'notknown': {
      'text': /./i,
      'url': /.(?!.*controller\=(stats|safehouse))/gi,
      'name': 'Not yet known links',
      'failed': /NO MATCH/
    }
  },
  $body,
  consecutive = 0,
  divs_selector = 'div[id^="div_story_"].aid_10979261223,li[id^="stream_story_"].aid_10979261223',
  url_queue = [],
  logging = [],
  // Objects
  $stats_div,
  $status,
  $clicked,
  $total,
  $errors,
  $interval,
  $queue,
  $threads,
  $retries,
  $last,
  $debug_div,
  // Config
  config = {
    'prioritize': true,
    'feed': true,
    'paused': true,
    'newer': false,
    'max_threads': 15,
    'interval': 20,
    'retry': 3,
    'posts': 30,
    'timeout': 60,
    'process_older': 0,
    'failed': true,
    'success': true,
    'log': 50,
    'worker_interval': 2,
    'totals': {
      'money': {
        'C': 0,
        'R': 0,
        'B': 0,
        'US': 0
      },
      'exp': 0
    },
    'enabled': { }
  };

function strip_tags(str, delete_iframe) {
  try {
    str = str.replace(/[\r\n\t\v]+/gi, ' ');
    str = str.replace(/<script.*?>[\s\S]*?<\/.*?script>/gi, '');
    str = str.replace(/<link[^>]*?>/gi, '');
    str = str.replace(/<style.*?>[\s\S]*?<\/.*?style>/gi, '');
    str = str.replace(/(?!<=<.*?)(?:style|onload)="([^\"]*?)\"/gi, '');
    str = str.replace(/(?!<=<.*?)(?:style|onload)='([^\']*?)\'/gi, '');
    str = str.replace(/(?!<=<.*)javascript.*:[^"]*/gi, '');
    str = str.replace(/<img[^>]*>/gi, '');

    if (delete_iframe)
      str = str.replace(/<iframe.*?>[\s\S]*?\/iframe>/gi, '');
  } catch (exception) {
    str = '';
  }


  return str;
}

function disable_onload(str){
  return str.replace(/(jquery|\$)\(document\)\.[\s\S]*\}\);/im, '');
}

function get_body_contents(str) {
  try {
    return str.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1];
  } catch (exception) {
    return '';
  }
}

function no_html(html) {
  try {
    return html.replace(/[\r\n\t\v]+/gi, ' ').replace(/<[a-z\/\-!\s\t\n\r][^>]*?>/gi, ' ');
  } catch (exception) {
    return '';
  }
}

function current_time_readable() {
  _date = new Date();
  return _date.toLocaleTimeString();
}

function current_time() {
  _date = new Date();
  return parseInt(Math.floor(_date.getTime() / 1000), 10);
}

function get_time(date_string) {
  _date = new Date();
  _date.setTime(Date.parse(date_string));
  return parseInt(Math.floor(_date.getTime() / 1000), 10);
}

function date_locale(date_string) {
  _date = new Date();
  _date.setTime(date_string * 1000);
  return _date.toLocaleTimeString();
}

function valid_url(s) {
  var regexp = /(https?):\/\/(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]+))?/i
  return regexp.test(s);
}

(function($){
  $.fn.domouseevent = function(mouseevt) {
    try {
      $this = this[0];
      if (!$this) {
        GM.log('ERROR: Null object passed to Click');
        return false;
      }
      var evt = document.createEvent("MouseEvents");
      evt.initMouseEvent(mouseevt, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      return !$this.dispatchEvent(evt);
    } catch (exception) {
      GM.log(exception);
      return false;
    }
  }
})(jQuery);

// Initialize the config object according to the information
// in the other array (has_words)
for(var name in has_words){
  config.enabled[name] = {};
  config.enabled[name].active = true;
  config.enabled[name].count = 0;
}

config.enabled['notknown'].active = false;

// update the script (by Richard Gibson; changed by ms99 and blannie)
// from Mafia Wars Auto Player script, modified by caesar2k
function updateScript() {
  try {
    GM.ajax({
      method: 'GET',
      url: SCRIPT.metadata + '?' + Math.round(Math.random() * 1000),
      onload: function(result) {
        if (result.status != 200) {
          GM.log('Userscripts.org is down?');
          return;
        }
        var theOtherVersion = result.responseText.match(/@version\s+([\d.]+)/)? RegExp.$1 : '0';
        var intVersions =
        [parseInt(SCRIPT.version.replace('.','')),parseInt(theOtherVersion.replace('.',''))];
				
        GM.log('Version check => local: ' + intVersions[0] + ' remote: ' + intVersions[1]);

        if (intVersions[0] < intVersions[1]) {
          if (window.confirm('Version ' + theOtherVersion + ' is available!\n\n' + 'Do you want to upgrade?' + '\n')) {
            window.location.href = SCRIPT.url;
          }
        } else {
          alert('You already have the latest version.');
          return;
        }
      }
    });
  } catch (ex) {
    GM.log('BUG DETECTED (updateScript): ' + ex);
  }
}

function log(str) {
  GM.log(str);
}

function get_totals(data) {
  if (isempty(data)) return;

  var
    moneyregex = /([\+\-]{1}\s*)?(C|R|B)?\$([0-9\,]+)/i,
    expregex = /([\+\-]{1}\s*)?(\d+)/i,
    money = data.match(/([\+\-]{1}\s*)?(C|R|B)?\$([0-9\,]+)/gi),
    exp = data.match(/([\+\-]{1}\s*)?(\d+)(?=\s*exp)/gi),
    multiplier = 1,
    x;

  if (money && money.length) {
    for(x in money){
      rmoney = money[x].match(moneyregex);
      if (isempty(rmoney)) continue;

      if (rmoney[1] == '-') {
        multipler = -1;
      }else multiplier = 1;

      if (isempty(rmoney[2])) rmoney[2] = 'US';

      config.totals.money[rmoney[2]] += multiplier * parseInt(rmoney[3].replace(/,/g, ''), 10);
    }
  }

  if (exp && exp.length) {
    for(x in exp){
      rexp = exp[x].match(expregex);
      if (isempty(rexp)) continue;

      if (rexp[1] == '-') {
        multipler = -1;
      } else multiplier = 1;

      config.totals.exp += multiplier * parseInt(rexp[2], 10);
    }
  }
}

function update_frames(frame_name, status, obj) {
  var tmp_frames;

  try {
    tmp_frames = JSON.parse(GM.getValue('frames', JSON.stringify({})));
  } catch (exception) {
    tmp_frames = {};
  }

	
  if (typeof tmp_frames[frame_name] == 'undefined') {
    tmp_frames[frame_name] = {};
  }

  tmp_frames[frame_name]['status'] = status;
  tmp_frames[frame_name]['time'] = current_time();
  if (!isempty(obj)) tmp_frames[frame_name]['obj'] = obj;
  save_frames(tmp_frames);
}

function get_object(frame_name) {
  var tmp_frames;
  
  try {
    tmp_frames = JSON.parse(GM.getValue('frames', JSON.stringify({})));
  } catch (exception) {
    tmp_frames = {};
  }

  try {
    return tmp_frames[frame_name].obj;
  } catch (exception) {
    return null;
  }
}

function save_frames(frames) {
  try {
    GM.setValue('frames', JSON.stringify(frames));
  } catch (exception) { }
}

function check_frames() {
  if (config.paused) return;

  var frames;

  try {
    frames = JSON.parse(GM.getValue('frames', JSON.stringify({})));
  } catch (exception) {
    frames = {};
  }

  if (getPropertyCount(frames) > 0) {
    for (name in frames){
      var timeout = frames[name].status != 2 && (current_time() - frames[name].time) >= config.timeout;

      if (timeout || frames[name].status == 1) {
        $('iframe#' + name).remove();
        frames[name].status = 2; // Set for deletion. Safe to delete on the next cycle

        if (frames[name].obj) {
          obj = frames[name].obj;
          var szclass = 'bad';

          if (isempty(obj.data)){
            obj.data = 'Data was empty, Mafia Wars fault (bug) or conflict '+
            'with other script. Does not mean the link wasnt visited, just couldnt '+
            'fetch the result message from the game';
            szclass = 'warning';
          }

          if (obj.times > 0) {
            config.enabled[obj.name].count += obj.times;

            if (config.success) {
              GM.log(new_link('Visited "' + has_words[obj.name].name + '"', obj.url, null, obj.post_time, obj.post_url, obj.data));
            }
            
            get_totals(obj.data);
            total += 1;
          } else {
            if (config.failed) {
              GM.log(new_link('Failed "' + has_words[obj.name].name + '"', obj.url, szclass, obj.post_time, obj.post_url, obj.data));
            }
          }
          worker_done(obj);
        } else {
          dec();
        }

        if (timeout && frames[name].status != 1) {
          GM.log(new_link('Killing frame "' + name + '" for "'+has_words[obj.name].name+'" after ' + (current_time() - frames[name].time) + ' seconds', obj.url, 'info', obj.post_time, obj.post_url));
        }
      } else if (frames[name].status == 2) {
        try {
          delete frames[name];
        } catch (exception) { }
      }
    }
  }
	
  save_frames(frames);
}

/*********************/
function the_wall() {
  $('input[name*="inthemafia"]').filter(function(){
    return /(accept|send|join)/i.test(this.value);
  }).css({
    border: 'solid 10px #000'
  });
}

function send_respect() {
  $('div.gift_popup ul li:eq(2) img').click();
  var a = $('#gift_popup_send_gift');
  for (i = 0; i < 10; i++){
    a.click();
  }
}
/*********************/

function read_config(default_config) {
  var x, tmp_config;

  try {
    tmp_config = JSON.parse(GM.getValue('config', JSON.stringify(default_config)));
  } catch (exception) {
    tmp_config = JSON.parse(JSON.stringify(default_config));
  }


  for (x in default_config) {
    if (typeof tmp_config[x] == 'undefined') {
      tmp_config[x] = default_config[x];
      GM.log('Updating setting, adding "' + x + '"');
    }
  }

  for (x in default_config.enabled) {
    if (typeof tmp_config.enabled[x] == 'undefined') {
      tmp_config.enabled[x] = default_config.enabled[x];
      GM.log('Updating setting, adding "' + x + '"');
    }
  }
	
  for (x in tmp_config) {
    if (typeof default_config[x] == 'undefined') {
      delete tmp_config[x];
      GM.log('Updating setting, deleting "' + x + '", no longer used');
    }
  }

  for (x in tmp_config.enabled) {
    if (typeof default_config.enabled[x] == 'undefined') {
      delete tmp_config.enabled[x];
      GM.log('Updating setting, deleting "' + x + '", no longer used');
    }
  }
	
  config = tmp_config;
}

function save_config(config_obj) {
  try {
    GM.setValue('config', JSON.stringify(config_obj));
  } catch (exception) { }
}

function regex_func(arg, strfunc) {
  if (typeof strfunc == 'function') {
    return strfunc(arg);
  } else {
    return arg.match(strfunc);
  }
}

function match_insensitive(text, url) {
  var option, result = null, inactive = 0;

  try {
    for (option in has_words) {
      if (option != 'notknown') {
        if (regex_func(text, has_words[option].text) && regex_func(url, has_words[option].url)){
          if (config.enabled[option].active) {
            result = option;
            break;
          } else {
            inactive++;
          }
        }
      }
    }
  } catch (exception) {
    GM.log('Exception: ' + exception);
  }

  if (!result && config.enabled['notknown'].active && !inactive) {
    result = 'notknown';
  }

  return result;
}

function get_newest() {
  var older = '';

  if (!last_newest) {
    if (config.process_older > 0) {
      older = '&use_primer=1&seen_old_story=false&delay_load_count=' + config.posts + '&first_load_ids=[]&not_yet_seen_ids=[]&oldest=' + (current_time() - config.process_older);
    }
  }

  return last_newest ? '&delay_load_count=' + config.posts + '&hidden_count=1&load_newer=true&newest=' + last_newest : older;
}

function setup_timeout() {
  if (config.paused) {
    window.setTimeout(function() {
      setup_timeout();
    }, 500);
  } else {
    window.setTimeout(function() {
      stream_parse(refresh_url + get_newest());
    }, config.interval * 1000);
  }
}

function stream_parse(url) {
  try {
    GM.ajax({
      url: url,
      method: 'GET',
      onload: function(response){
        if (response.status != 200) {
          GM.log(new_link('Failed to read feed. HTTP Response (' + response.status + ')', response.finalUrl, 'bad'));
          return;
        }
				
        var wra = response.responseText.split('for (;;);');
        
        if (typeof wra == 'undefined' || !wra || typeof wra != 'object' || typeof wra[1] == 'undefined' || wra[1] == null) {
          GM.log(new_link('Invalid feed response', response.finalUrl, 'bad'));
          wra = null;
          return;
        }

        var tmptext, wall_events_obj = null;
        wra = wra[1];

        if (!/"payload"\:null/.test(wra)) {
          tmptext = wra.between('"html":"','"},"');

          if (!tmptext) {
            if (wra.indexOf('"html":""') == -1) {
              GM.log(new_link('Invalid feed format: no html property', response.finalUrl, 'bad'));
            }
            wra = null;
            return;
          }

        } else if (/"payload"\:null/.test(wra) && wra.indexOf('"onload":[') != -1) {
          tmptext = wra.between('HTML(\\"', '\\"));');

          if (!tmptext) {
            GM.log(new_link('Invalid feed format: no html function', response.finalUrl, 'bad'));
            wra = null;
            return;
          }

        } else {
          GM.log(new_link('Invalid feed format', response.finalUrl, 'bad'));
          wra = null;
          return;
        }
        tmptext = tmptext.unescape();

        wall_events_obj = tmptext.get_document(true);

        var name, $help_link, $timestamp;
        var h = 0;

            
        $(divs_selector, wall_events_obj).each(function(i, el) {
          var $this = $(this);

          $help_link = $this.find(help_link);
          $timestamp = $this.find(timestamp);

          if ($help_link.size()) {
            name = match_insensitive($help_link.text(), $help_link.attr('href'));

            if (i == 0 && $timestamp.size()) {
              last_newest = get_time($timestamp.attr('title'));
              newest_post = $timestamp.parents('a').attr('href');
            }

            if (name) {
              h += 1;

              if (game_url == null) {
                var tmp = $help_link.attr('href').split('/');
                tmp = tmp.slice(0, 4);
                tmp = tmp.join('/') + '/';
                game_url = tmp;
              }

              clicks += 1;

              url_queue.push({
                url: $help_link.attr('href'),
                post_url: $timestamp.parents('a').attr('href'),
                post_time: get_time($timestamp.attr('title')),
                tries: 0,
                name: name
              });
            }
          }
        });

        if (h && config.feed) {
          GM.log(new_link('Feed read (' + h +  ' items)', response.finalUrl, 'info'));
        }

        wall_events_obj = null;
        delete wall_events_obj;
        wra = null;
        delete wra;
      },
      onerror:function(response){
        GM.log(new_link('Feed thread failed to load. Facebook\'s fault!', url, 'bad'));
        errors++;
      }
    });
  } catch (exception) {
    GM.log(new_link('Feed thread exception', url, 'bad', null, null, exception));
    errors++;
  }
	
  setup_timeout();
}

function error_retry_obj(obj) {
  errors += 1;
  retrying = false;

  if (config.retry > 0) {
    obj.tries += 1;
		
    if (obj.tries <= config.retry) {
      retrying = true;
      url_queue.unshift(obj);
      retries += 1;
    }
  }

  worker_done(obj);
  return retrying;
}

function worker_done(obj) {
  if (typeof obj.id != 'undefined' && typeof worker_array[obj.id] != 'undefined') {
    worker_array[obj.id].working = false;
    worker_array[obj.id].obj = obj;
  }
  dec();
}

function dec() {
  if (consecutive > 0) {
    consecutive -= 1;
  }
}

function inc() {
  consecutive += 1;
}

var
frames_count = 0;

function iframe(obj) {
  var iframe = document.createElement('IFRAME');
  iframe.src = 'javascript:false';
  iframe.name = iframe.id = 'frame_' + frames_count;
  frames_count++;

  $(iframe)
  .css({
    'height':'1px',
    'width':'1px'
  })
  .css({
    'display': 'none'
  })
  .appendTo($body);

  //$(iframe).css({'height':'1300px','width':'1300px','display':'block'});

  update_frames(iframe.name, 0, obj);

  iframe.src = obj.url;
  worker_done(obj);
  inc();
}

function parse_url(obj) {
  if (!obj.url) {
    GM.log('Empty url');
    errors += 1;
    worker_done(obj);
    return;
  }

  if (obj.url.match(/[\<\>]+/g)) {
    GM.log(new_link('Clearning dirty url', obj.url, 'info'));
    obj.url = obj.url.split(/>/, 2)[1];
  }
	
  if (!valid_url(obj.url)) {
    GM.log('Invalid URL = ' + obj.url);
    errors += 1;
    worker_done(obj);
    return;
  }
	
  try {
    GM.ajax({
      url: obj.url,
      method: 'GET',
      onload: function(response){
        //console.log('obj.url: ' + obj.url, 'response.finalUrl: ' + response.finalUrl);
				
        if (response.status != 200 && response.status != 301 && response.status != 302) {
          GM.log(new_link('Invalid HTTP response(' + response.status + ')', response.finalUrl, 'bad'));
          delete response;
          error_retry_obj(obj);
          return;
        } else if (response.status == 302) {
          GM.log('Redirect');
          return;
        }

        if (/index2\.php/i.test(response.finalUrl)) {
          GM.log(new_link('How it got here, I have no idea.', response.finalUrl, 'bad'));
          error_retry_obj(obj);
          return;
        }
				
        if (/track\.php/i.test(response.finalUrl)) {
          var replace_to = response.responseText.match(/window\.location\.replace\("([^"]*?)"\)/i);

          if (replace_to) {
            var url = replace_to[1].replace(/\&amp\;/gi, '&');
            url = url.replace(/\\/gi, '');
            obj.url = url;
            parse_url(obj);
          } else {
            replace_to = response.responseText.match(/URL\=\?([^"]*?)"/);
            if (replace_to) {
              url = replace_to[1].replace(/\&amp\;/gi, '&');
              url = response.finalUrl.split('track.php')[0] + '?' + url.replace(/\\/gi, '');
              obj.url = url;
              parse_url(obj);
            } else {
              GM.log(new_link('Mafia Wars iframe unavailable', response.finalUrl, 'warning', null, obj.post_url, 'Object url: '+ obj.url));
              if (typeof console != 'undefined' && typeof console.log != 'undefined') {
                console.log(response.responseText);
              }
              error_retry_obj(obj);
            }
          }
          return;
        }

        var complete_page = response.responseText.slice(-40).toString();

        if (!complete_page.match(/\<\/html\>/i)) {
          GM.log(new_link('Location not loaded', response.finalUrl, 'warning'));
          delete response;
          error_retry_obj(obj);
          return;
        }

        if (/mwfb\//i.test(response.finalUrl)) {
          // its mafia wars "iframe"
          replace_to = response.responseText.match(/location\.href[\s\=\t]{1,4}"([^"]*?)"/i);
					
          if (replace_to) {
            obj.url = replace_to[1].replace(/&amp;/gi, '&');
            GM.log(new_link('Weird facebook login inside iframe', obj.url, 'info'));
            parse_url(obj);
          }
        } else {
          // search for iframe
          try {
            var iframe_href = strip_tags(response.responseText).match(/<iframe[\s\t]*?src="(.*?mwfb[^"]*?)"/i); // Usually index2.php and 302 redirect
						
            if (iframe_href && typeof iframe_href[1] != 'undefined') {
              obj.url = iframe_href[1].replace(/&amp;/g, '&') + '#' + Math.round(Math.random() * 0x7FFF + 1000);
              iframe(obj);
            } else {
              GM.log(new_link('Mafia wars iframe unavailable "' + has_words[obj.name].name+'"', response.finalUrl, 'warning', null, obj.post_url));
              error_retry_obj(obj);
            }
          } catch (exception) {
            GM.log(new_link('Exception: Mafia wars iframe unavailable "' + has_words[obj.name].name+'"', response.finalUrl, 'warning', null, obj.post_url, exception));
            error_retry_obj(obj);
          }
        }
      },
      onerror: function(response){
        delete response;
        error_retry_obj(obj);
      }
    });
  } catch (exception) {
    error_retry_obj(obj);
  }
}

function get_newest_post() {
  return newest_post ? 'href="' + newest_post + '" target="_blank"':'';
}

function firstfirst(queue) {
  var x, newer = 0;
  var newer_index = -1;

  if (config.prioritize) {
    for (x in queue) {
      if (typeof has_words[queue[x].name]['first'] != 'undefined') {
        if (queue[x].post_time > newer) {
          newer = queue[x].post_time;
          newer_index = x;
        }
      }
    }
  }
  
  return newer_index;
}

var
executed = 0;

function iframe_worker() {
  if (!config.paused && game_url && url_queue.length && consecutive < config.max_threads) {
		
    inc();
    
    var new_index = firstfirst(url_queue);
    
    if (new_index == -1) {
      if (config.newer) {
        obj = url_queue.splice(0, 1)[0];
      } else {
        obj = url_queue.splice(-1, 1)[0];
      }
    } else {
      obj = url_queue.splice(new_index, 1)[0];
    }
    
    obj.times = 0;
    obj.tries = 0;
    obj.data = '';
    obj.id = 'execution_' + executed;

    executed += 1;

    worker_array[obj.id] = {};
    worker_array[obj.id].started = current_time();
    worker_array[obj.id].working = true;
    worker_array[obj.id].obj = obj;
		
    parse_url(obj);
  }
	
  $total.text('Successful: ' + total);
  $clicked.text('Clicked: ' + clicks);
  $errors.text('Errors: ' + errors);
  $status.text('Status: ' + (config.paused?'Paused':'Running'));

  if (config.paused) {
    $status.addClass('bad');
  } else {
    $status.removeClass('bad');
  }
	
  $queue.text('Queued actions: ' + url_queue.length);
  $threads.text('Worker threads: ' + consecutive);
  $retries.text('Retries: ' + retries);
	
  if (last_newest) {
    $date = new Date;
    $date.setTime(last_newest * 1000);
    $date = $date.toLocaleString();
  } else {
    $date = '?';
  }
	
  $last.html('Newest post processed: <a ' + get_newest_post() + '>' + $date + '</a>');

  try{
    for(x in worker_array){
      if (worker_array[x].working && current_time() - worker_array[x].started > 120) {
        worker_array[x].working = false;
        GM.log(new_link('Deleting worker "'+worker_array[x].job.name+'" on stage '+ (worker_array[x].stage) +' after idle timeout', worker_array[x].obj.url, 'info'));
      } else if (!worker_array[x].working) {
        delete worker_array[x];
      }
    }
  } catch(e){}

  save_config(config);
}

function create_checkboxes(appendTo) {
  var last, container = $('<div/>', {
    'id': id_prefix + 'parse_options'
    });
  container.append('<h4>Config</h4>');
	
  for (var name in has_words) {
    last = $('<input/>', {
      'type': 'checkbox',
      'name': name,
      'checked': config.enabled[name].active?'checked':null,
      'click': function(){
        config.enabled[this.name].active = this.checked;
      }
    });

    container.append(
      $('<p/>').append(
        last,
        '&nbsp;' + has_words[name].name
        )
      );
  }

  appendTo.prepend(container);
}


function money_format(data) {
  if (isempty(data)) return '0';

  if (typeof data == 'number') {
    data = data.toString().split('');
    var hops = Math.floor(data.length / 3);
    for (i = hops; i > 0; i--) {
      data.splice(-1 * i * 3, 0, ',');
    }
    data = data.join('').replace(/^,/,'');
  }
  return data;
}

function update_stats() {
  var stats = '';

  for (x in config.enabled) {
    stats += '<p><span class="info">' + has_words[x].name + '</span>: ' + config.enabled[x].count + '</p>';
  }

  stats += '<hr /><p class="bad">Summary</p>';

  for (x in config.totals.money) {
    stats += '<p><span class="info">' + x + '$</span>: ' + money_format(config.totals.money[x]) + '</p>';
  }

  stats += '<p><span class="info">Exp</span>: ' + config.totals.exp + '</p>';

  stats += '<p><span class="info">Uptime</span>: ' + (current_time() - started).splitTime() + '</p>';

  $stats_div.html('').append(stats);
}

function update_debug() {
  $debug_div.html('');

  for (x in logging) {
    $debug_div.append(
      '<p>' + logging[x] + '</p>'
      );
  }
}

function change_tab(tab, exec) {
  $('div.' + id_prefix + 'tab').css({
    'display': 'none'
  });
	
  $tab = $('#' + tab);
  $tab.css({
    'display':'block'
  });
	
  if (typeof exec == 'function') {
    exec($tab);
  }
}

function as_object(arr){
  var new_obj = {};
  for (name in arr){
    new_obj[name] = arr[name];
  }
  return new_obj;
}

function setup_worker_interval() {
  hThreads = window.setInterval(function(){
    iframe_worker();
  }, config.worker_interval * 1000);
}

read_config(config);

if (/www\.facebook\.com\/home/i.test(window.location.href)) {
  var refresh_url =
  document.location.protocol + '//' + document.location.host + "/ajax/intent.php?filter=app_10979261223&__a=1&request_type=1";
	
  save_frames({});
	
  $(function(){
    GM.log('Started');

    $('#pagelet_intentional_stream, #pagelet_composer, #rightCol > div:not(#pagelet_reqbox), iframe, #presence').remove();

    $body = $('body');

    var $control =
    $('<div/>', {
      'id': id_prefix + 'div',
      'css':{
        'display': 'block',
        'padding': '13px',
        'color': '#fff',
        '-moz-border-radius': '10px',
        'border-radius': '10px',
        'border': 'solid 3px #999',
        'backgroundColor': '#000',
        'background': '-moz-linear-gradient(right bottom , #707070 0%, #000000 68%) repeat scroll 0 0 transparent'
      }
    }).append(
      $('<h3/>',{
        'text': SCRIPT.title + ' v' + SCRIPT.version,
        'css': {
          'color': '#ccc'
        }
      }),
      'Script page: <a target="_blank" href="http://userscripts.org/scripts/show/69076">Userscripts.org</a><br />',
      'Works best when teamed with <a target="_blank" href="http://userscripts.org/scripts/show/64720">Mafia Wars Auto Player</a><br />',
      '<hr/>',
      // Tabs
      $('<ul/>',{
        'class': id_prefix + 'tabs',
        'css': {
          'display': 'block'
        }
      }).append(
        $('<li/>', {
          'text': 'Main',
          'id': id_prefix + 'tab_main',
          'class': 'UIButton UIButton_Gray',
          'click': function(){
            change_tab(id_prefix + 'main', null);
          }
        }),
        $('<li/>', {
          'text': 'Stats',
          'id': id_prefix + 'tab_stats',
          'class': 'UIButton UIButton_Gray',
          'click': function(){
            change_tab(id_prefix + 'stats', update_stats);
          }
        }),
        $('<li/>', {
          'text': 'Config',
          'id': id_prefix + 'tab_config',
          'class': 'UIButton UIButton_Gray',
          'click': function(){
            change_tab(id_prefix + 'config', null);
          }
        }),
        $('<li/>', {
          'text': 'Debug Log',
          'class': 'UIButton UIButton_Gray',
          'id': id_prefix + 'tab_debug',
          'click': function(){
            change_tab(id_prefix + 'debug', update_debug);
          }
        }),
        $('<li/>', {
          'text': 'See the feed',
          'class': 'UIButton UIButton_Gray',
          'id': id_prefix + 'tab_open',
          'click': function(){
            window.open(window.location.href + '#noop', '_blank');
          }
        }),
        $('<li/>', {
          'text': 'Open Mafia Wars',
          'class': 'UIButton UIButton_Gray',
          'css': {
            'margin-left': '45px',
            'margin-right': '0px'
          },
          'id': id_prefix + 'tab_open',
          'click': function(){
            if (game_url) {
              window.open(game_url, '_blank');
            }
          }
        })
        ),
      '<hr/>',
      // Main tab
      $('<div/>', {
        'display': 'none',
        'class': id_prefix + 'tab',
        'id': id_prefix + 'main',
        'css': {
          'display': 'block'
        }
      }).append(
        '<h4>Main</h4>',
        // Threads
        $threads = $('<p/>', {
          'text': 'Worker threads: 0',
          'id': id_prefix + 'threads'
        }),
        // Last
        $last = $('<p/>', {
          'html': 'Newest post processed: <a>?</a>',
          'id': id_prefix + 'last'
        }),
        // Status
        $status = $('<p/>', {
          'text': 'Status: ' + (config.paused?'Paused':'Running'),
          'id': id_prefix + 'status',
          'class': config.paused?'bad':''
        }),
        // Total
        $total = $('<p/>', {
          'text': 'Successful: 0',
          'id': id_prefix + 'total'
        }),
        // Clicked
        $clicked = $('<p/>', {
          'text': 'Clicked: 0',
          'id': id_prefix + 'clicked'
        }),
        // Errors
        $errors = $('<p/>', {
          'text': 'Errors: 0',
          'id': id_prefix + 'errors'
        }),
        // Retries
        $retries = $('<p/>', {
          'text': 'Retries: 0',
          'id': id_prefix + 'retries'
        }),
        // Queue
        $queue = $('<p/>', {
          'text': 'Queued actions: 0',
          'id': id_prefix + 'queue'
        }),
        // Pause / Go
        $('<input/>', {
          'type': 'button',
          'value': config.paused?'Unpause':'Pause',
          'class': 'UIButton UIButton_Gray',
          'id': id_prefix + 'pause',
          'click': function(){
            config.paused = !config.paused;
            $(this).val(config.paused?'Unpause':'Pause');
          }
        })
        ),
      // Stats
      $('<div/>', {
        'id': id_prefix + 'stats',
        'css': {
          'display': 'none'
        },
        'class': id_prefix + 'tab'
      }).append(
        '<h4>Stats</h4>',
        $stats_div = $('<div class="' + id_prefix + 'stats"></div>'),
        // Reset stats
        $('<input/>', {
          'type': 'button',
          'value': 'Reset stats',
          'class': 'UIButton UIButton_Gray',
          'id': id_prefix + 'resetstats',
          'click': function(){
            if (window.confirm('Are you sure?')) {
              var x;

              for(x in config.enabled){
                config.enabled[x].count = 0;
              }

              for(x in config.totals.money){
                config.totals.money[x] = 0;
              }

              config.totals.exp = 0;

              update_stats();
            }
          }
        })
        ),
      // Config
      $config_div = $('<div/>', {
        'id': id_prefix + 'config',
        'css': {
          'display': 'none'
        },
        'class': id_prefix + 'tab'
      }).append(
        '<p>Interval (in seconds) between reloading the feed</p>',
        $interval = $('<input/>', {
          'type': 'text',
          'id': id_prefix + 'interval',
          'value': config.interval,
          'width': '40px',
          'blur': function(){
            if (/\d+/.test(this.value)) {
              tmp_value = parseInt(this.value, 10);
              if (tmp_value < 1) {
                config.interval = 1;
              } else config.interval = tmp_value;

              this.value = config.interval;
            }
          }
        }),
        '<p>Process older posts (in seconds) first, on application start. 0 to disable</p>',
        $('<input/>', {
          'type': 'text',
          'id': id_prefix + 'process_older',
          'value': config.process_older,
          'width': '40px',
          'blur': function(){
            if (/\d+/.test(this.value)) {
              tmp_value = parseInt(this.value, 10);

              if (tmp_value < 0) {
                config.process_older = 0;
              } else if (tmp_value > 5000) {
                config.process_older = 5000;
              } else config.process_older = tmp_value;

              this.value = config.process_older;
            }
          }
        }),
        '<p>Worker threads (how many links to open at once, increasing this might make your browser hang)</p>',
        $('<input/>', {
          'type': 'text',
          'id': id_prefix + 'threads',
          'value': config.max_threads,
          'width': '40px',
          'blur': function(){
            if (/\d+/.test(this.value)) {
              tmp_value = parseInt(this.value, 10);
              if (tmp_value < 1) {
                config.max_threads = 1;
              } else if (tmp_value > 20) {
                config.max_threads = 20;
              } else config.max_threads = tmp_value;

              this.value = config.max_threads;
            }
          }
        }),
        '<p>Timeout for worker threads (in seconds). Setting this too low might kill Mafia Wars before it completes to load</p>',
        $('<input/>', {
          'type': 'text',
          'id': id_prefix + 'timeout',
          'value': config.timeout,
          'width': '40px',
          'blur': function(){
            if (/\d+/.test(this.value)) {
              tmp_value = parseInt(this.value, 10);

              if (tmp_value < 5) {
                config.timeout = 5;
              } else config.timeout = tmp_value;

              this.value = config.timeout;
            }
          }
        }),
        '<p>Retry on error (number of tries, 0 to disable)</p>',
        $('<input/>', {
          'type': 'text',
          'id': id_prefix + 'retry',
          'value': config.retry,
          'width': '40px',
          'blur': function(){
            if (/\d+/.test(this.value)) {
              tmp_value = parseInt(this.value, 10);

              if (tmp_value < 0) {
                config.retry = 0;
              } else if (tmp_value > 20) {
                config.retry = 20;
              } else config.retry = tmp_value;

              this.value = config.retry;
            }
          }
        }),
        '<p>Items to keep in the debug log (set 0 to disable logging completly)</p>',
        $('<input/>', {
          'type': 'text',
          'id': id_prefix + 'items',
          'value': config.log,
          'width': '40px',
          'blur': function(){
            if (/\d+/.test(this.value)) {
              tmp_value = parseInt(this.value, 10);

              if (tmp_value < 0) {
                config.log = 0;
              } else if (tmp_value > 150) {
                config.log = 150;
              } else config.log = tmp_value;

              this.value = config.log;
            }
          }
        }),
        '<p>Max items to read from feed every interval</p>',
        $('<input/>', {
          'type': 'text',
          'id': id_prefix + 'posts',
          'value': config.posts,
          'width': '40px',
          'blur': function(){
            if (/\d+/.test(this.value)) {
              tmp_value = parseInt(this.value, 10);

              if (tmp_value < 0) {
                config.posts = 0;
              } else if (tmp_value > 500) {
                config.posts = 500;
              } else config.posts = tmp_value;

              this.value = config.posts;
            }
          }
        }),
        '<p>Worker interval (seconds between attending to queued actions. Decreasing might make your browser slower or hang)</p>',
        $('<input/>', {
          'type': 'text',
          'id': id_prefix + 'worker_interval',
          'value': config.worker_interval,
          'width': '40px',
          'blur': function(){
            if (/\d+/.test(this.value)) {
              tmp_value = parseInt(this.value, 10);

              if (tmp_value < 1) {
                config.worker_interval = 1;
              } else if (tmp_value > 50) {
                config.worker_interval = 50;
              } else config.worker_interval = tmp_value;

              this.value = config.worker_interval;

              window.clearInterval(hThreads);
              setup_worker_interval();
            }
          }
        }),
        $('<p>Show Failed</p>')
        .append(
          $('<input/>', {
            'type': 'checkbox',
            'id': id_prefix + 'failed',
            'checked': config.failed?'checked':null,
            'click': function(){
              config.failed = this.checked;
            }
          })
          ),
        $('<p>Process newest posts first</p>')
        .append(
          $('<input/>', {
            'type': 'checkbox',
            'id': id_prefix + 'newer',
            'checked': config.newer?'checked':null,
            'click': function(){
              config.newer = this.checked;
            }
          })
          ),
        $('<p>Show Visited</p>')
        .append(
          $('<input/>', {
            'type': 'checkbox',
            'id': id_prefix + 'success',
            'checked': config.success?'checked':null,
            'click': function(){
              config.success = this.checked;
            }
          })
          ),
        $('<p>Show feed info</p>')
        .append(
          $('<input/>', {
            'type': 'checkbox',
            'id': id_prefix + 'feed',
            'checked': config.feed?'checked':null,
            'click': function(){
              config.feed = this.checked;
            }
          })
          ),
        $('<p>Prioritize wars and bounty (do them first always)</p>')
        .append(
          $('<input/>', {
            'type': 'checkbox',
            'id': id_prefix + 'prior',
            'checked': config.prioritize?'checked':null,
            'click': function(){
              config.prioritize = this.checked;
            }
          })
          ),
        '<hr/>',
        $('<input/>', {
          'type': 'button',
          'value': 'Check for Updates',
          'class': 'UIButton UIButton_Gray',
          'click': function(){
            updateScript();
          }
        }),
        $('<input/>', {
          'type': 'button',
          'value': 'Reset',
          'class': 'UIButton UIButton_Gray',
          'click': function(){
            if (window.confirm('Are you sure you want to reset the settings?')) {
              GM.deleteValue('config');
              window.location.reload();
            }
          }
        }),
        $('<input/>', {
          'type': 'button',
          'value': 'Debug',
          'class': 'UIButton UIButton_Gray',
          'click': function(){
            alert(JSON.stringify(config));
          }
        })
        ),
      // Debug Log
      $('<div/>', {
        'id': id_prefix + 'debug',
        'css': {
          'display': 'none'
        },
        'class': id_prefix + 'tab'
      }).append(
        '<h4>Debug Log</h4>',
        $('<input/>',{
          'type': 'button',
          'value': 'Clear',
          'class': 'UIButton UIButton_Gray',
          'click': function(){
            if (window.confirm('Are you sure you want to clear the log?')) {
              logging = [];
              GM.log('Log cleared');
              update_debug();
            }
          }
        }),
        $debug_div = $('<div/>')
        )
      );

    GM.addStyle(
      'div#' + id_prefix + 'div.simple li#' + id_prefix + 'tab_stats, \
			div#' + id_prefix + 'div.simple div#' + id_prefix + 'parse_options { display:none; } \
			ul.' + id_prefix + 'tabs li { margin-right: 10px; cursor: pointer; \
			display: inline-block; padding: 5px; line-height: 20px; background-color: \
			#ccc; color: #333; font-weight: bold } \
			ul.' + id_prefix + 'tabs li:hover { background-color: #fff } \
			div.' + id_prefix + 'tab input[type=checkbox] { vertical-align: middle; } \
			div#' + id_prefix + 'div h3 { font-size: 22px !important; } \
			div#' + id_prefix + 'div h4 { font-size: 18px !important; } \
			div.' + id_prefix + 'tab h4 { color: #FFF !important; } \
			div#' + id_prefix + 'div a { color: #A3FF3F; } \
			a.moreinfo span { color: #fff; margin-top: 8px; padding: 10px; background-color: #000; display:none; } \
			div#' + id_prefix + 'div, \
			div#' + id_prefix + 'div * \
			{ font-size: 10px; font-family: \'Verdana\', sans-serif; } \
      .bad { color: #f00 !important; } \
      .info { color: #60B3CB !important; } \
      .warning { color: #F89200 !important; } '
      );

    $('a.moreinfo').live('click', function(){
      var span = $(this).children('span');

      if (span.is(":visible")) {
        span.css({
          'display': 'none'
        });
      } else {
        span.css({
          'display': 'block'
        });
      }
    });

    $('div#pagelet_stream_header').before($control).remove();

    create_checkboxes($config_div);

    stream_parse(refresh_url + get_newest());
    setup_worker_interval();
    
    window.setInterval(function(){
      check_frames();
    }, 500);

    window.setInterval(function(){
      $('<iframe/>', {
        'src': 'javascript:false',
        'height': '10px',
        'width': '10px',
        'css': {
          'display': 'none'
        },
        'load': function(){
          GM.log(new_link('Pinged Facebook', facebook_ping, 'info'));
          this.parentNode.removeChild(this);
        }
      })
      .attr('src', facebook_ping)
      .appendTo($body);
    }, 60000 * 15);
  });
} else if (!/apps\.facebook\.com/i.test(document.referrer) && /(mafiawars|zynga).com/i.test(window.location.host)) {
  var frame_name = window.self.name;
  obj = get_object(frame_name);
	
  if (!obj) {
    update_frames(frame_name, 1, obj);
  } else {
		
    set_obj_data = function () {
      try {
        if (typeof has_words[obj.name].results !== 'undefined') {
          for (var x in has_words[obj.name].results) {
            var type =
            typeof has_words[obj.name].results[x]['type'] != 'undefined'?has_words[obj.name].results[x].type:'html';
            
            tmp_html = no_html(strip_tags($(has_words[obj.name].results[x].query, unsafeWindow.document)[type]()));
            
            if (tmp_html) {
              if (typeof has_words[obj.name].results[x].not != 'undefined'){
                if (!has_words[obj.name].results[x].not.test(tmp_html)) {
                  obj.data = no_html(strip_tags(tmp_html));
                  break;
                }
              } else {
                obj.data = no_html(strip_tags(tmp_html));
                break;

              }
            }
          }
        } else {
          obj.data = no_html(strip_tags($('td.message_body:first', unsafeWindow.document).html()));
          if (!obj.data) {
            obj.data = no_html(strip_tags($('div#mbox_generic_1 > div:eq(1)', unsafeWindow.document).html()));
          }
        }
      } catch (exception) {obj.data = '';}
    }

    proceed_to_steps = function(){
      update_frames(frame_name, 0);

      var ac = [];
      ac = has_words[obj.name].steps.call(null, $, unsafeWindow.document);

      if (ac && ac.length) {
        if (/attack/i.test(ac[0].textContent)) {
          eval(ac[0].onclick)();
          return true;
        } else {
          obj.data = 'Wont betray';
        }
      }

      return false;
    }

    obj.url = window.location.href;
    
    $(function(){
      // Lower iframe loading page overhead
      $('head link,head style').remove();
      $('img[src]').removeAttr('src');

      // Kill analytics and flash
      $('script:regex(html,urchinTracker),script:regex(src,google|jquery-ui)').remove();

      // Prevent lame functions
      unsafeWindow.swfobject.embedSWF =
      unsafeWindow.window.swfobject.embedSWF =
      unsafeWindow.window.alert =
      unsafeWindow.setLocation =
      unsafeWindow.document.setLocation =
      unsafeWindow.document.location.assign =
      unsafeWindow.document.location.replace =
      unsafeWindow.location.assign =
      unsafeWindow.location.replace =
      unsafeWindow.window.location.replace =
      unsafeWindow.window.setLocation = function(){
        return true;
      }


      if (typeof has_words[obj.name].steps != 'undefined') {
        obj.tries = 0;
        
        ajax_timeout = function(){
          set_obj_data();
          obj.tries += 1;

          if (isempty(obj.data) && obj.tries < 200) {
            window.setTimeout(ajax_timeout, 50);
            return;
          }
          
          update_frames(frame_name, 0);

          if (typeof has_words[obj.name].repeatif != 'undefined') {
            if (!obj.data) set_obj_data();

            if (has_words[obj.name].repeatif.test(obj.data)) {
             
              if (!proceed_to_steps()) {
                set_obj_data();
                
                if (!obj.data) obj.data = 'War is over (couldnt hit the target in time)';
                
                if (has_words[obj.name].repeatif.test(obj.data)) {
                  proceed_to_steps();
                } else {
                  if (!has_words[obj.name].failed.test(obj.data)) {
                    obj.times += 1;
                  }
                  obj.data = obj.data + ' [' + obj.tries + 'R]';
                  update_frames(frame_name, 1, obj);
                }
              }
            } else {
              set_obj_data();

              if (!has_words[obj.name].failed.test(obj.data)) {
                obj.times += 1;
              }
              obj.data = obj.data + ' [' + obj.tries + 'L]';
              update_frames(frame_name, 1, obj);
            }
          } else {
            if (!has_words[obj.name].failed.test(obj.data)) {
              obj.times += 1;
            }
            obj.data = obj.data + ' [' + obj.tries + 'NR]';
            update_frames(frame_name, 1, obj);
          }
        }

        // HOOK/HIJACK do_ajax function
        unsafeWindow.window.old_do_ajax = unsafeWindow.window.do_ajax;
        unsafeWindow.window.do_ajax = function(){
          ret = unsafeWindow.window.old_do_ajax.apply(unsafeWindow.window.old_do_ajax, arguments);
          
          window.setTimeout(ajax_timeout, 1);

          return ret;
        }
        
        set_obj_data();

        if (!has_words[obj.name].failed.test(obj.data)){
          if (!proceed_to_steps()) {
            if (!obj.data) obj.data = 'War was already over [I]';
            update_frames(frame_name, 1, obj);
          }
        } else {
          if (!has_words[obj.name].failed.test(obj.data)) {
            obj.times += 1;
          }
          update_frames(frame_name, 1, obj);
        }
      } else {
        set_obj_data();

        if (!has_words[obj.name].failed.test(obj.data)) {
          obj.times += 1;
        }

        update_frames(frame_name, 1, obj);
      }
    });

    $(window).unload(function(){
      $(document).unbind();
      proceed_to_steps = null;
      obj = null;
      set_obj_data = null;
    });
  }
} else {
  try {
    top != window;
  } catch (exception) {
    if (window.self.name) {
      obj = get_object(window.self.name);
      if (obj) {
        obj.url = window.location.href;
      }
      update_frames(window.self.name, 1, obj);
    }
  }
}
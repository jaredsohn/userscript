// ==UserScript==
// @name           vkmail
// @namespace      rojer
// @copyright      2009 Deomid "rojer" Ryabkov
// @license        GPL version 3 or any later version
// @include        http://vkontakte.ru/mail.php?id=*
// @include        http://vk.com/mail.php?id=*
// @version        1.5.1
// ==/UserScript==

/*
 * Copyright 2009 Deomid "rojer" Ryabkov
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * For a copy of the GNU General Public License,
 * see <http://www.gnu.org/licenses/>.
 *
 */

var SCRIPT_VERSION = '1.5.1';
var STORAGE_FORMAT_VERSION = 19;  // Older versions are purged on startup.
var MESSAGES_PER_PAGE = 20;
var UPDATE_CHECK_INTERVAL = 86400 * 1000;  // One day
var DRAFT_AUTOSAVE_INTERVAL = 5000;
var ONLINE_STATUS_CHECK_INTERVAL = 60000;
var ONLINE_INACTIVITY_TIMEOUT = 11 * 60000;  // Offline after 11 minutes
var DEFAULT_SETTINGS = {
    check_interval: 0,
    max_messages: -1,  // Set based on presence of localStorage, see below
    enable_local_storage: true,
    message_order: 'newest-first',
    threading_by_subject: true,
};

var MESSAGE_ID_RE = /^mess([\d-]+)/;
var OTHER_ID_RE = /(?:to=|\/id)([\d-]+)/;
// Drop "Re(N)", spaces
var NORMALIZE_SUBJECT_RE = /(^(Re(\(\d+\))?:)?\s*|\s*$)/g;
var OTHER_ONLINE_RE = /^Online|На сайті$/;
var TIMESTAMP_RE = /(\d{1,2})\s+(\S{3})\s+(\d{4})\s+\S+\s+(\d{1,2}):(\d{2})/;
var RELATIVE_TIMESTAMP_RE = /(вчера|сегодня)\s+в\s+(\d+):(\d+)/;
// XXX: This is really a gross hack.
// We need a better way of handling different locales.
var RELATIVE_TIMESTAMP_UA_RE = /(вчора|сьогодні)\s+об?\s+(\d+):(\d+)/;
var RATE_LIMIT_RE = /simpleHeader">(?:Слишком быстро|Занадто швидко)\.\.\./;
var AUTH_PROBLEM_RE = /setTimeout.+op=logout/;
var MESSAGE_COUNT_RE = /(\d+)\.?$/;
var MONTH_NAME_MAP = {
    // RU
    'янв': 0, 'фев': 1, 'мар': 2, 'апр': 3, 'мая': 4, 'июн': 5,
    'июл': 6, 'авг': 7, 'сен': 8, 'окт': 9, 'ноя': 10, 'дек': 11,
    // UA
    'січ': 0, 'лют': 1, 'бер': 2, 'кві': 3, 'тра': 4, 'чер': 5,
    'лип': 6, 'сер': 7, 'вер': 8, 'жов': 9, 'лис': 10, 'гру': 11,
};
var MONTH_NAME_LIST = [
    'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
];
var BUCKET_PARAMS = {
  // Requesting message body
  'show': {burst: 5, interval: 5000},
  // Deletion - no apparent server limit here, 10 per sec limit is arbitrary
  'a_delete': {burst: 10, interval: 1000},
  // Syncs, both in and out, go here
  'sync': {burst: 3, interval: 5000},
  // Friends list
  'friends': {burst: 3, interval: 5000}, 
  // Everything else goes into the default bucket
  'default': {burst: 3, interval: 5000},
}
// Do up to this many storage transactions synchronously
var MAX_LOCAL_STORAGE_BURST = 5;
// After that, log and start flushing every this many msec
var LOCAL_STORAGE_FLUSH_INTERVAL = 100;

var DRAFT_BUCKET = 9;  // 0 - inbox, 1 - sent
var NEXT_DRAFT_ID = 0;

function el(id) { return document.getElementById(id) }  // shortcut

var FETCHER = null;  // One global URLFetcher, created later
var HEADER_XHR = {'X-Requested-With': 'XMLHttpRequest'};

/*
 * Opera and Chrome Greasemonkey compat code
 * GM_get/setValue function borrowed from TarquinWJ
 * http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js
 */
if (window.opera || window.chrome) {
  unsafeWindow = window;

  GM_setValue = function(cookieName, cookieValue, lifeTime) {
    if( !cookieName ) { return; }
    if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
    document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) +
      ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
  }

  GM_getValue = function (cookieName, oDefault) {
    var cookieJar = document.cookie.split( "; " );
    for( var x = 0; x < cookieJar.length; x++ ) {
      var oneCookie = cookieJar[x].split( "=" );
      if( oneCookie[0] == escape( cookieName ) ) {
        try {
          return unescape( oneCookie[1] );
        } catch(e) { return oDefault; }
      }
    }
    return oDefault;
  }

  AttributeCount = function(obj) {
    var attr_count = 0;
    for (attr in obj) if (obj.hasOwnProperty(attr)) attr_count++;
    return attr_count;
  }

  if (window.opera) {
    GM_log = function(message) { window.opera.postError(message) }
  } else if (window.chrome) {
    GM_log = function(message) { console.log(message) };
  }
} else {
  AttributeCount = function(obj) { return obj.__count__ }  // Thank you, Mozilla
}

/*
 * Updater code. No updates for Chrome (handled via extension).
 */
function CheckForUpdate(force) {
  if (window.chrome) return;
  var lastupdatecheck = GM_getValue('muUpdateParam_80', 'never');
  var now = new Date();
  if (force ||
      lastupdatecheck == 'never' ||
      now - (new Date(lastupdatecheck)) > UPDATE_CHECK_INTERVAL) {
    GM_log('Checking for update...');
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.src =
        'http://www.monkeyupdater.com/scripts/updater.php?id=80&version=' +
        SCRIPT_VERSION;
    script.type = 'text/javascript';
    // We never delete these elements, but with update interval set to 1 day,
    // user won't live that long for this to become a problem :)
    body.appendChild(script);
    GM_setValue('muUpdateParam_80', now.toString());
  }
}
// The very first thing we do is check for update,
// before doing anything serious that can fail and prevent us from updating
CheckForUpdate();

/* 
 * Utility functions
 */

var digest_table = [
	0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA,
	0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
	0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988,
	0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91,
	0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE,
	0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
	0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC,
	0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5,
	0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172,
	0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B,
	0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940,
	0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59,
	0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116,
	0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
	0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924,
	0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
	0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A,
	0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
	0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818,
	0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01,
	0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E,
	0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457,
	0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C,
	0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65,
	0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2,
	0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB,
	0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0,
	0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9,
	0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086,
	0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F,
	0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4,
	0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD,
	0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A,
	0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683,
	0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8,
	0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1,
	0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE,
	0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7,
	0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC,
	0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5,
	0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252,
	0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B,
	0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60,
	0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79,
	0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236,
	0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F,
	0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04,
	0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D,
	0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A,
	0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713,
	0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38,
	0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21,
	0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E,
	0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777,
	0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C,
	0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45,
	0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2,
	0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB,
	0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0,
	0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9,
	0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6,
	0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF,
	0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94,
	0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D
];

// This function is based on the CRC32 algorithm
function Digest(str) {
  var digest = 0xffffffff;
  function digest_update(cv) {
    digest = (digest >>> 8) ^ digest_table[(digest & 0x000000ff) ^ cv];
  }
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    while (c > 0) {
      digest_update(c & 0xff);
      c >>>= 8;
    }
  }
  return Math.abs(digest);
}

// Serialize dict to string (URL query-string notation).
function DictToString(dict, keys) {
  var components = [];
  if (keys) {
    for (var i in keys) {
      components.push(keys[i] + '=' + encodeURIComponent(dict[keys[i]]));
    }
  } else {
    for (var key in dict) {
      components.push(key + '=' + encodeURIComponent(dict[key]))
    }
  }
  return components.join('&');
}

// Restore dict from string
function DictFromString(s, dict) {
  if (!dict) dict = {};
  var components = s.split('&');
  for (var i in components) {
    var parts = components[i].split('=');
    dict[parts[0]] = decodeURIComponent(parts[1]);
  }
  return dict;
}

// Find message pane element within the page
function GetMessagePane(doc) {
  var divs = doc.getElementsByTagName('div');
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].id == 'msgs') return divs[i];
  }
  return null;
}

// Parse messages from the message list page
function ParseMessages(msg_pane, is_sent) {
  var messages = [];
  if (msg_pane) {
    var trs = msg_pane.getElementsByTagName('tr');
    for (var i = 0; i < trs.length; i++) {
      var m = MESSAGE_ID_RE.exec(trs[i].id);
      if (m) {
        var message = new Message(parseInt(m[1]), is_sent);
        message.Parse(trs[i]);
        messages.push(message);
      }
    }
    return messages;
  }
  return null;
}

// Reference-counting "working" widget.
function SpinWidget() {
  var spin = el('vkm-working');
  spin.style.visibility = 'visible';
  spin.setAttribute('refcount', parseInt(spin.getAttribute('refcount')) + 1);
}

function StopSpin() {
  var spin = el('vkm-working');
  var refcount = parseInt(spin.getAttribute('refcount'));
  spin.setAttribute('refcount', refcount - 1);
  if (refcount == 1) {
    spin.style.visibility = 'hidden';
  }
}

// Add a leading zero to numbers < 10
function PadWithZero(num) {
  return (num < 10 ? '0' : '') + num;
}

// Randomized delay function. Returns vlaue at least as big as base,
// with a random fraction on top of that.
function RandomDelay(base, factor) {
  return base + Math.round(Math.random() * base * factor);
}

function FormatDateTime(d) {
  var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  var half_year_ago = new Date() - 6 * 30 * 86400 * 1000;
  if (d - today > 0) {
    return d.getHours() + ':' + PadWithZero(d.getMinutes());
  } else if (d.getFullYear() == today.getFullYear() || d > half_year_ago) {
    return (d.getDate() + ' ' + MONTH_NAME_LIST[d.getMonth()] + ' ' +
            d.getHours() + ':' + PadWithZero(d.getMinutes()));
  }
  return (d.getDate() + ' ' +
          MONTH_NAME_LIST[d.getMonth()] + ' ' +
          d.getFullYear());
}

// Attaches an event listener to a node, preventing default cation.
function AddFinalEventHandler(node, event_name, fun) {
  node.addEventListener(
      event_name,
      function(event) {
        if (!fun(event)) {
          event.preventDefault();
          return false;
        }
        return true;
      }, false);
}
function AddFinalOnClickHandler(node, fun) {
  AddFinalEventHandler(node, 'click', fun);
}

// Clear a given node, removing all its children
function Clear(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Escape HTML entities that may occur in the text string (< becomes &lt;, etc)
function EscapeHTMLEntities(text) {
  var div = document.createElement('span');
  text = text.replace(/\n{3,}/g, '\n\n');  // no more than 2 line breaks
  var text_node = document.createTextNode(text.replace(/(^\s+|\s+$)/g, ''));
  div.appendChild(text_node);
  return div.innerHTML.replace(/\n/g, '<br>');
}

/*
 * Class definitons
 */

/* Message
 *
 * Contains everything we know about the message, as well as methods to
 * parse, compare and delete messages.
 */
function Message(id, is_sent) {
  this.id = id;            // This is message id, unique within in/out box
  this.is_sent = is_sent;  // Whether message is incoming or sent
  this.uid = null;         // Globally unique id of the message, is_sent + id
  this.thread_id = null;   // ID of the thread this message belongs to
  this.expanded = false;   // Whether full text of teh message is to be shown
  this.text = '';          // Full text of the message, when fetched
  this.debug_html = null;  // Full source of the original message,
                           // not persisted.
  // Attribute unique to draft - when draft was last saved
  this.last_saved = new Date(0);

  this.other_is_online = false;  // Parsed but not stored attribute
  this._parsed_attrs = [
      'is_unread', 'other_id', 'other_name', 'other_avatar_url', 'timestamp',
      'url', 'subject', 'snippet'];
  for (var i in this._parsed_attrs) { this[this._parsed_attrs[i]] = null; }
  this._stored_attrs = this._parsed_attrs.concat(
      ['uid', 'thread_id', 'is_sent', 'text', 'expanded']);

  this.DebugString = function() {
    return ('Message(' + this.uid + ',' +
            this.other_id + ',' + this.other_name + ',' + this.timestamp + ',' +
            this.is_unread + ',' + this.subject + ',' + this.snippet + ',' +
            this.url + ',' + this.other_avatar_url + '); ' +
            this.thread_id + ' ' + this.expanded);
  }

  this.ToString = function() {
    return DictToString(this, this._stored_attrs);
  }

  this.FromString = function(s) {
    DictFromString(s, this);
    this.id = parseInt(this.uid.split('-')[1]);
    // Special handling of timestamp and boolean attrs
    this.timestamp = new Date(this.timestamp);
    this.expanded = (this.expanded == 'true');
    this.is_sent = (this.is_sent == 'true');
    this.is_unread = (this.is_unread == 'true');
  }

  this.Parse = function(tr) {
    try {
      this.debug_html = tr.innerHTML;  // Preserve for debugging
      this.is_unread = (tr.className == 'newRow');
      for (var i = 0; i < tr.childNodes.length; i++) {
        var child = tr.childNodes[i];
        switch (child.className) {
          case 'messageFrom':
            var other_divs = child.getElementsByTagName('div');
            for (var j in other_divs) {
              switch (other_divs[j].className) {
                case 'name':
                  var name_div = other_divs[j];
                  var link = name_div.getElementsByTagName('a')[0];
                  this.other_name = link.textContent;
                  var m = OTHER_ID_RE.exec(link.href);
                  if (m) this.other_id = m[1];
                  break;

                case 'date':
                  var date_text = other_divs[j].textContent;
                  this.timestamp = new Date();
                  this.timestamp.setSeconds(0);
                  this.timestamp.setMilliseconds(0);
                  m = TIMESTAMP_RE.exec(date_text);
                  if (m) {
                    if (MONTH_NAME_MAP[m[2]] === undefined)
                      throw Error('Unknown month "' + m[2] + '" - new locale?');
                    this.timestamp.setFullYear(m[3], MONTH_NAME_MAP[m[2]], m[1]);
                    this.timestamp.setHours(m[4]);
                    this.timestamp.setMinutes(m[5]);
                  } else {
                    m = RELATIVE_TIMESTAMP_RE.exec(date_text);
                    if (!m) m = RELATIVE_TIMESTAMP_UA_RE.exec(date_text);
                    if (m) {
                      if (m[1] == 'вчера' || m[1] == 'вчора') {
                        this.timestamp.setHours(0);
                        this.timestamp.setMinutes(0);
                        // 23:59:59
                        this.timestamp = new Date(this.timestamp - 1000);
                      }
                      this.timestamp.setHours(m[2]);
                      this.timestamp.setMinutes(m[3]);
                      this.timestamp.setSeconds(0);
                    } else {
                      throw Error('Could not parse timestamp: ' + date_text);
                    }
                  }
                  break;
                default:
                  if (OTHER_ONLINE_RE.exec(other_divs[j].textContent)) {
                    this.other_is_online = true;
                  }
                  break;
              }  // switch div class
            }
            break;
          case 'messagePicture':
            this.other_avatar_url = child.getElementsByTagName('img')[0].src;
            break;
          case 'messageSnippet':
            var link = child.getElementsByClassName('new messageSubject')[0];
            this.subject = link.textContent.replace(NORMALIZE_SUBJECT_RE, '');
            this.url = link.href;
            this.snippet =
              child.getElementsByClassName('new messageBody')[0].innerHTML;
          case 'messageActions':
            var links = child.getElementsByTagName('a');
            for (var j = 0; j < links.length; j++) {
              var m = OTHER_ID_RE.exec(links[j].href);
              if (m) {
                this.other_id = m[1];
                break;
              }
            }
            break;
        }
      }
      this.ComputeUID();
      for (var i in this._parsed_attrs) {
        if (this[this._parsed_attrs[i]] === null) {
          throw 'В сообщении не найдено поле ' + this._parsed_attrs[i];
        }
      }
      // If message does not end in '...', we have full text of the message.
      if (this.snippet.length < 3 ||
          this.snippet.substring(this.snippet.length - 3) != '...') {
        this.text = this.snippet;
        this.expanded = true;
      }
    } catch (e) {
      alert('При разборе сообщения произошла ошибка. ' +
            '\n\n' + e + '\n\n' +
            this.ReportMessageDetails());
      throw e;
    }
    //GM_log(this.DebugString());
  }

  this.ReportMessageDetails = function(e) {
    return 'Пожалуйста, передайте автору следующую информацию:\n' +
           'Разобранное сообщение:\n\n' + this.DebugString() + '\n\n' +
           'Исходник (если доступен; при необходимости удалите ' +
           'конфиденциальную информацию, но сохраните, пожалуйста, ' +
           'фоматирование):\n\n' + this.debug_html;
  }

  this.MakeDraft = function(
      subject, thread_id, other_id, other_name, other_avatar_url) {
    this.id = NEXT_DRAFT_ID++;
    this.uid = DRAFT_BUCKET + '-' + this.id;
    this.subject = subject;
    this.snippet = this.text = '';
    this.timestamp = new Date();
    this.expanded = false;
    this.is_unread = false;
    this.thread_id = thread_id;
    this.other_id = other_id;
    this.other_name = other_name;
    this.other_avatar_url = other_avatar_url;
  }

  this.IsUnread = function() {
    return this.is_unread && !this.is_sent;
  }

  this.IsUnreadSent = function() {
    return this.is_unread && this.is_sent;
  }

  this.IsDraft = function() {
    return this.uid[0] == DRAFT_BUCKET;
  }

  this.FitsDraft = function(message) {
    // TODO: we need a better snippet comparison function
    return (this.IsDraft() && this.expanded &&
            message.is_sent == this.is_sent &&
            message.other_id == this.other_id &&
            message.snippet.substring(0, 60) == this.text.substring(0, 60));
  }

  this.ComputeUID = function() {
    this.uid = (this.is_sent ? '1' : '0') + '-' + this.id;
  }

  this.CompareTimestamp = function(that) {
    if (this.timestamp > that.timestamp) return 1;
    if (this.timestamp < that.timestamp) return -1;
    // Because our timestamp's granularity is minute,
    // it is not uncommon for them to be the same. We will then use id as a tie
    // breaker. IDs are monotonically increasing for sent and received messages
    // but are different sequences. We may add special handling here later.
    if (this.id > that.id) return 1;
    if (this.id < that.id) return -1;
    return 0;
  }

  this._FetchTextCallback = function(text, node, closure) {
    var wrapped_node = node.getElementsByClassName('wrapped')[0];
    if (wrapped_node) {
      var div_node = wrapped_node.getElementsByTagName('div')[0];
      this.text = div_node.innerHTML;
      // If this received message was unread, it no longer is.
      if (this.IsUnread()) this.is_unread = false;
      if (closure) closure();
    } else {
      GM_log('bad message response: ' + text);
      return false;
    }
    return true;
  }

  this.FetchText = function(closure) {
    var obj = this;
    FETCHER.StartFetch(
        'GET', '/mail.php',
        {'act': 'show', 'out': (this.is_sent ? 1 : 0), 'id': this.id},
        null,
        'show',
        function(text, node) {
          return obj._FetchTextCallback(text, node, closure);
        },
        false);
  }

  this.Expand = function(closure) {
    this.expanded = true;
    if (!this.text && !this.IsDraft()) {
      this.FetchText(closure);
    } else if (closure) {
      closure();
    }
  }

  this.Delete = function(closure) {
    if (!this.IsDraft()) {
      var obj = this;
      FETCHER.StartFetch(
          'POST', '/mail.php',
          {'act': 'a_delete', 'out': (this.is_sent ? 1 : 0), 'id': this.id},
          HEADER_XHR,
          'a_delete',
          function(text, node) {
            GM_log('delete ' + obj.uid + ' reply: ' + text);
            closure(); return true;
          },
          false);
    } else {
      closure();
    }
  }
}

/* Thread
 *
 * Contains messages of the same thread and presents them in a set of views,
 * of which there are currently 3.
 */
function Thread(id, message_cache, message_order, show_subject,
                header_container, expanded_container, exclusive_container) {
  this.id = id;
  this.message_cache = message_cache;
  this.message_order_newest_first = (message_order == 'newest-first');
  this.show_subject = show_subject;
  this.messages_list = [];
  this.messages_map = [];
  this.expanded = false;
  this.exclusive = false;
  this.show_reply_form = false;
  this.header_container = header_container;
  this.expanded_container = expanded_container;
  this.exclusive_container = exclusive_container;
  this.views = {};
  this.form_data = null;
  this.draft = null;

  this.AddMessage = function(message, no_cache) {
    if (!message.expanded && message.IsDraft()) {
      if (this.draft) return false;
      // Unsent drafts don't get added into list and are not cached
      this.draft = message;
      if (this.views.header) this.views.header.UpdateMessage(this.draft);
      return true;
    }
    if (this.messages_map[message.uid]) return false;
    if (this.draft && this.draft.FitsDraft(message)) {
      message.snippet = message.text = this.draft.text;
      message.expanded = true;
      this.RemoveDraft();
    } else if (message.IsDraft()) {
      // Expanded (i.e. final) draft
      this.draft = message;
    }
    for (var i = this.messages_list.length; i >= 0; i--) {
      if (i == 0 ||
          // Little bit of binary logic involving bools. Shame on me! :)
          ((this.messages_list[i - 1].CompareTimestamp(message) < 0) ^
           this.message_order_newest_first)) {
        this.messages_map[message.uid] = message;
        this.messages_list.splice(i, 0, message);
        // Add to all views
        for (var j in this.views) this.views[j].AddMessage(message, i);
        break;
      }
    }
    if (!no_cache) this._AddMessageToCache(message);
    return true;
  }

  this.GetHeaderMessage = function() {
    if (this.messages_list.length > 0) {
      return this.messages_list[
          this.message_order_newest_first ? 0 : this.messages_list.length - 1];
    }
    return this.draft;
  }

  this.NumMessages = function() {
    return this.messages_list.length;
  }

  this.NumNewMessages = function() {
    var num_new = 0;
    for (var i in this.messages_list) {
      if (this.messages_list[i].IsUnread()) num_new++;
    }
    return num_new;
  }

  this.GetMessage = function(message_uid) {
    return this.messages_map[message_uid];
  }

  this.GetMessages = function(filter) {
    if (!filter) filter = function(message) {return true;};
    var result = [];
    for (var i in this.messages_list) {
      if (filter(this.messages_list[i])) result.push(this.messages_list[i]);
    }
    return result;
  }

  this._AddMessageToCache = function(message) {
    var item_key = 'msg/' + message.uid;
    this.message_cache.SetItem(item_key, message.ToString());
  }

  this._RemoveMessageFromCache = function(message) {
    var item_key = 'msg/' + message.uid;
    this.message_cache.RemoveItem(item_key);
  }

  this.UpdateViews = function(message) {
    for (var j in this.views) this.views[j].UpdateMessage(message);
    // Message may have been updated, update the cached copy
    if (message) this._AddMessageToCache(message);
  }

  // NB: Local only!
  this.MarkMessageRead = function(message_uid, closure) {
    var message = this.GetMessage(message_uid);
    if (message) {
      message.is_unread = false;
      this.UpdateViews(message);
      closure();
    }
  }

  this.MarkExpandedMessagesRead = function(closure) {
    // User has finished viewing the thread.
    // Mark unread expanded messages as read with a callback to update header.
    var obj = this;
    for (var i in this.messages_list) {
      var message = this.messages_list[i];
      if (message.IsUnread() && message.expanded) {
        // Wrap in a function so that we preserve value of message
        function call_fetch() {
          var message_uid = message.uid;
          message.FetchText(
              function() {obj.MarkMessageRead(message_uid, closure)});
        }
        call_fetch();
      }
    }
  }

  this.RenderHeader = function() {
    this.views.header = new ThreadHeaderView(
        this, this.header_container, this.show_subject);
    this.views.header.Render();
  }

  this.Expand = function() {
    var view = this.views.expanded;
    if (!view) {
      view = new ExpandedThreadView(
          this, this.expanded_container,
          this.message_order_newest_first, this.show_subject);
      view.Render();
      this.views.expanded = view;
    }
    this.expanded_container.parentNode.style.display = '';
    this.expanded = true;
    this.UpdateViews(null);
    if (this.draft) this.ShowReplyForm();
    // If new messages are added at the bottom and we need to scroll
    // scroll to the specified (probably previously saved) position
    // or all the way down if none is saved.
    if (!this.message_order_newest_first &&
        (view.scroll_container.scrollHeight >
         view.scroll_container.clientHeight)) {
      view.scroll_container.scrollTop =
          view.scroll_position ?
          view.scroll_position : view.scroll_container.scrollHeight;
    }
  }

  this.Collapse = function() {
    if (this.expanded) {
      var view = this.views.expanded;
      // There is a bug where if we turn off display of a container with
      // vertical scroll at non-zero position, the container is rendered empty
      // the next time we turn display on.
      // So we save position and scroll up before turning the display off.
      view.scroll_position = view.scroll_container.scrollTop;
      view.scroll_container.scrollTop = 0;
      view.container.parentNode.style.display = 'none';
      this.expanded = false;
      this.UpdateViews(null);
    }
  }

  this.RenderExclusive = function() {
    var view = this.views.exclusive;
    if (!view) {
      view = new ExclusiveThreadView(
          this, this.exclusive_container,
          this.message_order_newest_first, this.show_subject);
      view.Render();
      this.views.exclusive = view;
    }
    this.views.exclusive.container.style.display = '';
    this.exclusive = true;
    this.UpdateViews(null);
  }

  this.RemoveExclusivity = function(closure) {
    if (this.exclusive) {
      this.views.exclusive.container.style.display = 'none';
      this.exclusive = false;
      this.UpdateViews(null);
      this.MarkExpandedMessagesRead(closure);
    }
  }

  this.ExpandMessage = function(message_uid, closure) {
    var message = this.GetMessage(message_uid);
    if (message) {
      this.Expand();
      var obj = this;
      message.Expand(function(){obj.UpdateViews(message); closure()});
    }
  }

  this.RemoveMessage = function(message_uid, no_cache) {
    var message = this.messages_map[message_uid];
    if (message) {
      var pos = 0;
      for (pos in this.messages_list) {
        if (this.messages_list[pos].uid == message.uid) {
          break;
        }
      }
      // Delete from internal state, all views and the message cache
      this.messages_list.splice(pos, 1);
      delete this.messages_map[message.uid];
      for (var i in this.views) this.views[i].DeleteMessage(message, pos);
      if (!no_cache) this._RemoveMessageFromCache(message);
    }
    if (this.draft && this.draft.uid == message_uid) {
      if (!no_cache) this._RemoveMessageFromCache(this.draft);
      this.draft = null;
    }
  }

  this.RemoveDraft = function() {
    if (this.draft) {
      var draft = this.draft;
      this.RemoveMessage(draft.uid, false /* no_cache */);
      return draft;
    }
    return null;
  }

  this._DeleteMessageCallback = function(message_uid, closure) {
    this.RemoveMessage(message_uid, false);
    if (closure) closure();
  }

  this.DeleteMessage = function(message_uid, closure) {
    var message = this.messages_map[message_uid];
    if (message) {
      var obj = this;
      message.Delete(
          function(){obj._DeleteMessageCallback(message_uid, closure)});
    }
  }

  this._ParseMessageForm = function(text, node) {
    var forms = node.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
      if (forms[i].id == 'postMessage') {
        this.form_data = {};
        var inputs = forms[i].getElementsByTagName('input');
        for (var j = 0; j < inputs.length; j++) {
          this.form_data[inputs[j].name] = inputs[j].value;
        }
        if (this.form_data.chas && unsafeWindow.decodehash) {
          this.form_data.chas = unsafeWindow.decodehash(this.form_data.chas);
        }
        GM_log('Reply form data acquired (' + this.form_data.chas + ').');
        return true;
      }
    }
    GM_log('No form data found in:\n' + text);
    return true;
  }

  this.MakeDraft = function() {
    if (!this.draft) {
      var pm = new Message(null, true /* is_sent */);
      var hm = this.GetHeaderMessage();
      pm.MakeDraft(hm.subject, this.id,
                   hm.other_id, hm.other_name, hm.other_avatar_url);
      return pm;
    }
    return null;
  }

  this.ShowReplyForm = function() {
    if (this.draft.expanded) {
      // We have an expanded draft, meaning we're sending message right now.
      // Do not show form while message is in flight
      return;
    }
    this.show_reply_form = true;
    for (var i in this.views) this.views[i].ShowOrHideReplyForm();
    if (this.exclusive) {
      this.views.exclusive.SetReplyFormFocus();
    } else {
      this.views.expanded.SetReplyFormFocus();
    }
    if (!this.form_data) {
      // We need to fetch form and get some data before we can send
      var obj = this;
      FETCHER.StartFetch(
          'GET', '/mail.php',
          {'act': 'write', 'to': this.GetHeaderMessage().other_id},
          null,
          'default',
          function(text, node) {
            return obj._ParseMessageForm(text, node);
          },
          false);
    }
  }

  this.HideReplyForm = function() {
    this.show_reply_form = false;
    for (var i in this.views) this.views[i].ShowOrHideReplyForm();
  }

  this._QuoteExpandedMessage = function(message_uid) {
    var message = this.messages_map[message_uid];
    if (message) {
      var parser_span = document.createElement('span');
      parser_span.innerHTML = message.text;
      var lines = ['> '];
      function extract_text(node) {
        for (var i = 0; i < node.childNodes.length; i++) {
          var child_node = node.childNodes[i];
          if (child_node.nodeName == '#text') {
            lines[lines.length - 1] += child_node.textContent;
          } else if (node.childNodes[i].nodeName == 'BR') {
            lines.push('> ');  // new line
          }
          extract_text(node.childNodes[i]);
        }
      }
      extract_text(parser_span);
      lines.push('');
      for (var i in this.views) {
        this.views[i].SetReplyFormText(lines.join('\n'));
      }
      // We may have been called via fetch callback,
      // update views in case we need to mark message as read
      this.UpdateViews(message);
    }
  }

  this.ReplyWithQuote = function(message_uid, closure) {
    this.ShowReplyForm();
    var message = this.messages_map[message_uid];
    if (message) {
      for (var i in this.views) {
        this.views[i].SetReplyFormSubject(message.subject);
      }
      if (message.expanded) {
        this._QuoteExpandedMessage(message_uid); closure(false);
      } else {
        var obj = this;
        message.Expand(
            function(){obj._QuoteExpandedMessage(message_uid); closure(true)});
      }
    }
  }

  this._SendReplyCallback = function(text, node, closure) {
    GM_log('message sent, reply length: ' + text.length);
    if (text.length < 100) {
      GM_log('reply: ' + text);  // Likely an error
      alert('Ответ сервера на попытку отправки сообщения: ' + text);
    }
    closure();
    return true;
  }

  this.SaveDraft = function(view) {
    this.draft.subject = view.GetReplySubject();
    this.draft.text = view.GetReplyText();
    var now = new Date();
    if (now - this.draft.last_saved > DRAFT_AUTOSAVE_INTERVAL) {
      this._AddMessageToCache(this.draft);
      this.draft.last_saved = now;
    }
  }

  this.ReplyFormChanged = function(view) {
    this.SaveDraft(view);
    for (var i in this.views) {
      // Sync forms between views
      if (this.views[i] !== view) {
        this.views[i].SetReplyFormSubject(this.draft.subject);
        this.views[i].SetReplyFormText(this.draft.text);
      }
      this.views[i].UpdateMessage(this.draft);
    }
  }

  this.SendReply = function(closure) {
    if (!this.form_data) {
      alert('Cannot send message without form data!\n' +
            'This should not happen, please report.');
      return;
    }
    this.form_data.title = this.draft.subject;
    this.form_data.message = this.draft.text;
    this.form_data.ajax = '1';  // Magic

    var obj = this;
    FETCHER.StartFetch(
        'POST', '/mail.php',
        this.form_data,
        null,
        'default',
        function(text, node) {
          return obj._SendReplyCallback(text, node, closure)
        },
        false);
    // Hide and clear reply forms in all views, invalidate form data
    this.HideReplyForm();
    for (var i in this.views) this.views[i].SetReplyFormText('');
    this.form_data = null;
  }

  this.SetMessageCache = function(new_cache) {
    this.message_cache = new_cache;
  }

  this.SetMessageOrder = function(new_message_order) {
    var newest_first = (new_message_order == 'newest-first');
    if (newest_first != this.message_order_newest_first) {
      this.message_order_newest_first = newest_first;
      this.messages_list.reverse();
      for (var i in this.views) {
        this.views[i].message_order_newest_first =
            this.message_order_newest_first;
        this.views[i].Render();
      }
    }
  }

  this.UpdateUser = function(user_info) {
    for (var i in this.views) this.views[i].UpdateUser(user_info);
  }
}

/* ThreadHeaderView
 *
 * This is a thread header view - displays summary of the thread
 */
function ThreadHeaderView(thread, container, show_subject) {
  this.thread = thread;
  this.container = container;
  this.show_subject = show_subject;

  this.Render = function() {
    var obj = this;
    Clear(this.container);
    // Expander
    var expander_col = document.createElement('td');
    expander_col.className = 'expander-col';
    var expander_link = document.createElement('a');
    expander_link.href = '#expand-thread';
    AddFinalOnClickHandler(
        expander_link,
        function() {
          if (obj.thread.expanded) {
            window.dispatcher.CollapseThread(obj.thread.id);
          } else {
            window.dispatcher.ExpandThread(obj.thread.id);
          }
        });
    expander_col.appendChild(expander_link);
    this.container.appendChild(expander_col);
    this.expander_link = expander_link;
    // Avatar
    var avatar_col = document.createElement('td');
    avatar_col.className = 'avatar-col';
    var avatar_link = document.createElement('a');
    var avatar_img = document.createElement('img');
    avatar_link.appendChild(avatar_img);
    avatar_col.appendChild(avatar_link);
    this.container.appendChild(avatar_col);
    this.avatar_img = avatar_img;
    this.avatar_link = avatar_link;
    // Name
    var name_col = document.createElement('td');
    name_col.className = this.show_subject ? 'name-col' : 'wide-name-col';
    var name_link = document.createElement('a');
    var name_text = document.createTextNode('');
    name_link.appendChild(name_text);
    name_col.appendChild(name_link);
    var online_div = document.createElement('div');
    online_div.className = 'online-div';
    online_div.style.display = 'none';
    online_div.appendChild(document.createTextNode('Online'));
    name_col.appendChild(online_div);
    this.other_name = name_text;
    this.other_name_link = name_link;
    this.online_div = online_div;
    if (this.show_subject) {
      this.container.appendChild(name_col);
      // Subject
      var subject_col = document.createElement('td');
      subject_col.className = 'subject-col';
      var subject_link = document.createElement('a');
      subject_link.href = '#exclusive:' + thread.id;
      AddFinalOnClickHandler(
          subject_link,
          function() {window.dispatcher.ShowThread(obj.thread.id)})
      var subject_text = document.createTextNode('');
      subject_link.appendChild(subject_text);
      subject_col.appendChild(subject_link);
      this.subject = subject_text;
      this.subject_link = subject_link;
      var buttons_col = subject_col;
    } else {
      name_col.colSpan = 2;
      var buttons_col = name_col;
      name_link.href = '#exclusive:' + thread.id;
      AddFinalOnClickHandler(
          name_link,
          function() {window.dispatcher.ShowThread(obj.thread.id)})
    }
    var reply_form_span = document.createElement('span');
    reply_form_span.style.position = 'relative';
    reply_form_span.style.cssFloat = 'right';
    reply_form_span.style.width = '100%';
    var reply_form = document.createElement('span');
    reply_form.className = 'floating-form';
    var write_button = document.createElement('input');
    write_button.className = 'vkm-button vkm-reply-button';
    write_button.type = 'button';
    write_button.value = this.show_subject ? 'Новая тема' : 'Написать';
    AddFinalOnClickHandler(
        write_button,
        function() {
          var hm = obj.thread.GetHeaderMessage();
          window.dispatcher.NewThread(
              obj.show_subject ? hm.subject + ' [2]' : hm.subject,
              hm.other_id, hm.other_name, hm.other_avatar_url);
        });
    reply_form.appendChild(write_button);
    if (this.show_subject) {
      var reply_button = document.createElement('input');
      reply_button.className = 'vkm-button vkm-reply-button';
      reply_button.type = 'button';
      reply_button.value = 'Ответить';
      AddFinalOnClickHandler(
          reply_button,
          function() {window.dispatcher.ShowReplyForm(obj.thread.id)});
      reply_form.appendChild(reply_button);
    }
    reply_form_span.appendChild(reply_form);
    buttons_col.appendChild(reply_form_span);
    this.container.appendChild(buttons_col);
    // Timestamp
    var timestamp_col = document.createElement('td');
    timestamp_col.className = 'timestamp-col';
    var timestamp_container_span = document.createElement('span');
    timestamp_container_span.className = 'combined-cell-container';
    var delete_button = document.createElement('input');
    delete_button.className =
        'vkm-button vkm-delete-thread-button vkm-invisible-and-on-top';
    delete_button.type = 'button';
    delete_button.value = 'Удалить';
    AddFinalOnClickHandler(
        delete_button,
        function() {window.dispatcher.DeleteThread(obj.thread.id)});
    timestamp_container_span.appendChild(delete_button);
    var timestamp_text_span = document.createElement('span');
    timestamp_text_span.className = 'combined-cell-text-right';
    var timestamp_text = document.createTextNode('');
    timestamp_text_span.appendChild(timestamp_text);
    timestamp_container_span.appendChild(timestamp_text_span);
    timestamp_col.appendChild(timestamp_container_span);
    this.container.appendChild(timestamp_col);
    this.timestamp = timestamp_text;
    this.UpdateMessage(null);
  }

  this.AddMessage = function(message, position) {
    this.UpdateMessage(message);
  }

  this.UpdateMessage = function(message) {
    var num_new = this.thread.NumNewMessages();
    var first_message = this.thread.GetHeaderMessage();
    if (first_message) {
      var other_profile_url = '/id' + first_message.other_id;
      this.expander_link.innerHTML =
          (this.thread.expanded ? '&#9661;' : '&#9654;');
      this.avatar_img.src = first_message.other_avatar_url;
      this.avatar_link.href = other_profile_url;
      this.other_name.nodeValue = first_message.other_name;
      if (this.show_subject) {
        this.other_name_link.href = other_profile_url;
        this.subject.nodeValue = first_message.subject;
      }
      this.timestamp.nodeValue =
          FormatDateTime(first_message.timestamp);
      this.container.style.fontWeight = (num_new > 0 ? 'bold' : '');
      var thread_message_count = this.thread.NumMessages();
      if (thread_message_count > 0) {
        var count_node = this.show_subject ? this.subject : this.other_name;
        count_node.nodeValue +=
            ' (' + num_new + '/' + thread_message_count + ')';
      }
    }
  }

  this.DeleteMessage = function(message, position) {
    this.UpdateMessage(message);
  }

  this.UpdateUser = function(user_info) {
    this.online_div.style.display = user_info.is_online ? '' : 'none';
  }

  this.ShowOrHideReplyForm = function() { }
  this.SetReplyFormSubject = function(text) { }
  this.SetReplyFormText = function(text) { }
  this.SetReplyFormFocus = function() { }
}

/* ExpandedThreadView
 *
 * Displayed inline in the thread list when thread is expanded
 */
function ExpandedThreadView(thread, container,
                            message_order_newest_first, show_subject) {
  this.thread = thread;
  this.container = container;
  this.message_order_newest_first = message_order_newest_first;
  this.show_subject = show_subject;

  this.message_containers = {};
  this.form_widgets = [];
  this.form_textarea = null;
  this.scroll_position = 0;

  this._RenderMessage = function(message, tr) {
    var obj = this;
    if (tr) {  // TODO: do not redraw completely on update
      Clear(tr);
      tr.style.display = '';
    } else {
      tr = document.createElement('tr');
      tr.id = 'vkmsg_' + message.uid;
    }
    if (message.IsDraft() && !message.expanded) {
      tr.style.display = 'none';
      return tr;
    }
    tr.className = message.is_sent ? 'msg-sent' : 'msg-recv';
    var col = document.createElement('td');
    if (message.IsDraft()) col.className = 'msg-col-draft';
    else if (message.IsUnreadSent()) col.className = 'msg-col-unread-sent';
    else col.className = 'msg-col';
    var body_div = document.createElement('div');
    body_div.className = 'msg-div';
    var ts_div = document.createElement('span');
    ts_div.className = 'msg-timestamp';
    var ts_text = document.createTextNode(FormatDateTime(message.timestamp));
    ts_div.appendChild(ts_text);
    body_div.appendChild(ts_div);
    var body_text = document.createElement('span');
    if (message.expanded && message.text) {
      body_text.innerHTML = message.text;
    } else {
      var body_link = document.createElement('a');
      body_link.href = '#expand-message-' + message.uid;
      AddFinalOnClickHandler(
          body_link,
          function() {
            window.dispatcher.ExpandMessage(message.uid)
          });
      body_link.innerHTML = message.snippet;
      body_text.appendChild(body_link);
    }
    if (message.IsUnread()) {
      body_text.style.fontWeight = 'bold';
      body_text.style.fontStyle = 'normal';
    } else if (message.IsDraft() || message.IsUnreadSent()) {
      body_text.style.fontWeight = 'normal';
      body_text.style.fontStyle = 'italic';
    }
    body_div.appendChild(body_text);
    AddFinalEventHandler(
        body_div, 'dblclick',
        function(event) {
          if (event.ctrlKey) {
            alert('С сообщением что-то не так?\n' +
                  message.ReportMessageDetails());
          }
        });
    // Reply and delete buttons.
    var obj = this;
    var form_span = document.createElement('span');
    form_span.className = 'floating-form';
    if (!message.is_sent) {
      var quote_button = document.createElement('input');
      quote_button.className = 'vkm-button';
      quote_button.type = 'button';
      quote_button.value = 'Цитировать';
      AddFinalOnClickHandler(
          quote_button,
          function() {
            window.dispatcher.ReplyWithQuote(message.uid);
          });
      form_span.appendChild(quote_button);
    }
    var delete_button = document.createElement('input');
    delete_button.className = 'vkm-button';
    delete_button.type = 'button';
    delete_button.value = 'Удалить';
    AddFinalOnClickHandler(
        delete_button,
        function() {
          window.dispatcher.DeleteMessage(message.uid);
        });
    form_span.appendChild(delete_button);
    body_div.appendChild(form_span);
    col.appendChild(body_div);
    tr.appendChild(col);
    return tr;
  }

  this.RenderMessages = function(messages, before_message) {
    var before_node =
        before_message && this.message_containers[before_message.uid] ?
        this.message_containers[before_message.uid][0] : null;
    for (var i in messages) {
      var cont = this.message_containers[messages[i].uid];
      var message_tr = this._RenderMessage(
          messages[i], cont ? cont[0] : null);
      this.message_containers[messages[i].uid] = [message_tr];
      if (before_node) {
        this.tbody.insertBefore(message_tr, before_node);
      } else if (this.message_order_newest_first) {
        this.tbody.appendChild(message_tr);
      } else {
        this.tbody.insertBefore(message_tr, this.form_widgets[0]);
      }
    }
  }

  this.RenderReplyForm = function() {
    var obj = this;
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.className = 'reply-form-col';
    var form = document.createElement('form');
    form.className = 'reply-form';
    var textarea = document.createElement('textarea');
    textarea.className = 'reply-textarea';
    this.form_textarea = textarea;
    form.appendChild(textarea);
    var span = document.createElement('span');
    span.style.cssFloat = 'left';
    // Make subject input invisible if we're threading by sender+subject
    // and it is not a new thread. New thread is a thread where header is
    // a non-final draft.
    // We still go through all the motions of creating it
    // because it is still used internally.
    var hm = this.thread.GetHeaderMessage();
    if (this.show_subject && !(hm.IsDraft() && !hm.expanded))
      span.style.display = 'none';
    span.appendChild(document.createTextNode('Тема: '));
    var subject_input = document.createElement('input');
    subject_input.type = 'text';
    subject_input.size = 50;
    subject_input.maxlength = 128;
    AddFinalEventHandler(
        subject_input, 'keypress',
        function(event) {
          setTimeout(  // Decouple from the event
            function(){obj.thread.ReplyFormChanged(obj, true /* is_subject */)},
            10);
          return true;
        });
    this.form_subject_input = subject_input;
    span.appendChild(subject_input);
    form.appendChild(span);
    var send_button = document.createElement('input');
    send_button.className = 'vkm-button';
    send_button.type = 'button';
    send_button.value = 'Отправить';
    AddFinalOnClickHandler(
        send_button, function() {
          obj.thread.SaveDraft(obj);
          window.dispatcher.SendReply(obj.thread.id);
        });
    AddFinalEventHandler(
        textarea, 'keypress',
        function(event) {
          if (event.ctrlKey && event.which == 13) {  // Ctrl-Enter
            obj.thread.SaveDraft(obj);
            window.dispatcher.SendReply(obj.thread.id);
            return false;
          }
          return true;
        });
    AddFinalEventHandler(
        textarea, 'change',
        function(event) {
          obj.thread.ReplyFormChanged(obj);
        });
    form.appendChild(send_button);
    var cancel_button = document.createElement('input');
    cancel_button.className = 'vkm-button vkm-delete-message-button';
    cancel_button.type = 'button';
    cancel_button.value = 'Отменить';
    AddFinalOnClickHandler(
        cancel_button,
          function() {window.dispatcher.CancelDraft(obj.thread.id);
        });
    form.appendChild(cancel_button);
    td.appendChild(form);
    tr.appendChild(td);
    if (this.message_order_newest_first) {
      this.form_widgets.push(tr);
      this.tbody.appendChild(tr);
    } else {
      this.form_widgets.push(tr);
      this.tbody.appendChild(tr);
    }
    this.ShowOrHideReplyForm();
  }

  this.Render = function() {
    this.container.innerHTML =
        '<div class=expanded-thread-div>' +
        '<table class=enclosing-table>' +
        '<tbody></tbody>' +
        '</table></div>';
    this.tbody = this.container.getElementsByTagName('tbody')[0];
    this.scroll_container = this.container.childNodes[0];
    this.form_widgets = [];
    this.RenderReplyForm();
    this.RenderMessages(
        this.thread.messages_list,
        // If newest goes to the bottom, we insert before the form
        this.message_order_newest_first ? null : this.form_widgets[0]);
  }

  this.ShowOrHideReplyForm = function() {
    for (var i in this.form_widgets) {
      this.form_widgets[i].style.display =
          this.thread.show_reply_form ? '' : 'none';
    }
    if (this.thread.show_reply_form && this.thread.draft) {
      if (!this.form_textarea.value && this.thread.draft.text)
        this.form_textarea.value = this.thread.draft.text;
      if (!this.form_subject_input.value && this.thread.draft.subject)
        this.form_subject_input.value = this.thread.draft.subject;
    } else if (!this.thread.show_reply_form) {
      this.form_textarea.value = '';
      this.form_subject_input.value = '';
    }
    if (!this.message_order_newest_first &&
        this.thread.show_reply_form) {
      if (this.scroll_container.scrollHeight > this.scroll_container.clientHeight) {
        this.scroll_container.scrollTop = this.scroll_container.scrollHeight;
      }
    }
  }

  this.SetReplyFormFocus = function() {
    this.form_textarea.focus();
  }

  this.GetReplyText = function() {
    return this.form_textarea.value;
  }

  this.GetReplySubject = function() {
    return this.form_subject_input.value;
  }

  this.SetReplyFormSubject = function(text) {
    this.form_subject_input.value = text;
  }

  this.SetReplyFormText = function(text) {
    this.form_textarea.value = text;
  }

  this.AddMessage = function(message, position) {
    this.RenderMessages([message], this.thread.messages_list[position + 1]);
    if (!this.message_order_newest_first) {
      this.scroll_container.scrollTop =
          this.message_containers[message.uid][0].offsetTop;
    }
  }

  this.UpdateMessage = function(message) {
    if (!message) return;
    var containers = this.message_containers[message.uid];
    if (!containers) return;  // Draft may not have been rendered
    this._RenderMessage(message, this.message_containers[message.uid][0]);
  }

  this.DeleteMessage = function(message, position) {
    var containers = this.message_containers[message.uid];
    if (containers) {
      for (var i in containers) {
        this.tbody.removeChild(containers[i]);
      }
      delete this.message_containers[message.uid];
    }
  }

  this.UpdateUser = function(user_info) { }
}

/* ExclusiveThreadView
 *
 * This is what is displayed when specific thread is selected.
 * Shares most of the code with expanded view, excpet for th header.
 */
function ExclusiveThreadView(thread, container,
                             message_order_newest_first, show_subject) {
  this.thread = thread;
  this.container = container;
  this.message_order_newest_first = message_order_newest_first;
  this.show_subject = show_subject;

  this.message_containers = {};
  this.form_widgets = [];
  this.scroll_position = 0;

  this.Render = function() {
    var obj = this;
    this.container.innerHTML =
        '<table class=enclosing-table>' +
        '<tbody>' +
        '<tr><td>' +
        '<a href="javascript:history.go(-1)">&lt; назад к списку</a>' +
        '<input type=button value="Ответить" ' +
        'class="vkm-button exclusive-reply-button">' +
        '</td></tr></tbody></table>';
    this.tbody = this.container.getElementsByTagName('tbody')[0];
    this.scroll_container = this.container.childNodes[0];
    this.form_widgets = [];
    this.RenderReplyForm();
    var reply_button = this.tbody.getElementsByClassName('vkm-button')[0];
    AddFinalOnClickHandler(
        reply_button,
        function() {window.dispatcher.ShowReplyForm(obj.thread.id)});
    this.RenderMessages(
        this.thread.messages_list,
        // If newest goes to the bottom, we insert before the form
        this.message_order_newest_first ? null : this.form_widgets[0]);
  }

  this.__UpdateMessage = this.UpdateMessage;
  this.UpdateMessage = function(message) {
    this.__UpdateMessage(message);
    if (!this.message_order_newest_first && !message) {
      document.getElementsByTagName('html')[0].scrollTop = 0;
    }
  }
}
ExclusiveThreadView.prototype = new ExpandedThreadView();

/* ThreadList
 *
 * Renders itself as a list of headers of contained Threads.
 * Keeps overall stats.
 */
function ThreadList(viewport, thread_view,
                    message_cache, message_order, threading_by_subject,
                    user_watcher) {

  function ThreadInfo(thread, widgets) {
    this.thread = thread;
    this.widgets = widgets;
    this.user_subscription = null;
  }

  this.viewport = viewport;        // Element (TBODY) to render ourselves into
  this.thread_view = thread_view;  // Element to render threads into
  this.message_order = message_order;  // oldest-first / newest-first
  this.threading_by_subject = threading_by_subject;
  this.user_watcher = user_watcher;
  this.thread_list = [];
  this.thread_map = {};
  this.messages = {};              // All messages we know of
  this.message_cache = message_cache;  // localStorage-backed dict of messages
  this.update_stats = false;  // Flag indicating that stats may need updating

  this.viewport.innerHTML =
      '<table class=enclosing-table>\
      <tbody>\
      </tbody></table>';
  this.tbody = this.viewport.getElementsByTagName('tbody')[0];

  this.CreateThread = function(id) {
    // Create widgets
    var header_tr = document.createElement('tr');
    header_tr.id = 'vkthread_' + id;
    var expanded_tr = document.createElement('tr');
    expanded_tr.style.display = 'none';
    var expander_td = document.createElement('td');
    expander_td.className = 'expander-dummy';
    expanded_tr.appendChild(expander_td);
    var expanded_thread_td = document.createElement('td');
    expanded_thread_td.className = 'expanded-thread';
    expanded_thread_td.colSpan = 4;
    expanded_tr.appendChild(expanded_thread_td);
    var exclusive_span = document.createElement('span');
    thread = new Thread(id, this.message_cache,
                        this.message_order, this.threading_by_subject,
                        header_tr, expanded_thread_td, exclusive_span);
    this.thread_view.appendChild(exclusive_span);
    var info = new ThreadInfo(thread, [header_tr, expanded_tr]);
    return info;
  }

  this._FindInsertionPosition = function(new_thread) {
    var new_header_message = new_thread.GetHeaderMessage();
    for (var i = this.thread_list.length - 1; i >= 0; i--) {
      var thread = this.thread_list[i].thread;
      if (thread.GetHeaderMessage().CompareTimestamp(new_header_message) > 0) {
        var result = i + 1;
        if (result > this.thread_list.length || result == 15 || result == 11) {
        }
        return result;
      }
    }
    return 0;
  }

  this.ComputeThreadID = function(message) {
    return message.other_id + '-' +
           (this.threading_by_subject ? Digest(message.subject) : '0');
  }

  this.AddMessage = function(message, no_cache) {
    if (this.messages[message.uid]) return;
    if (!message.thread_id) message.thread_id = this.ComputeThreadID(message);
    this.messages[message.uid] = message;
    var info = this.thread_map[message.thread_id];
    var need_to_insert_header_widgets = false;
    var insert_before = null;
    if (!info) {
      info = this.CreateThread(message.thread_id);
      info.thread.RenderHeader();
      result = info.thread.AddMessage(message, no_cache);
      if (result) {
        // Register in the internal list and map
        var pos = this._FindInsertionPosition(info.thread);
        this.thread_map[info.thread.id] = info;
        this.thread_list.splice(pos, 0, info);
        // Insert thread's widgets into appropriate place in the DOM
        insert_before = this.thread_list[pos + 1];
        need_to_insert_header_widgets = true;
      }
      info.user_subscription = this.user_watcher.Subscribe(
          message.other_id,
          function(user_info) {info.thread.UpdateUser(user_info)});
    } else {
      var previous_first_message = info.thread.GetHeaderMessage();
      var previous_draft = info.thread.draft;
      result = info.thread.AddMessage(message, no_cache);
      // If we filled draft, remove it from our internal state
      if (previous_draft && !info.thread.draft)
        this.RemoveMessage(previous_draft, false /* no_cache */);
      // Make sure we maintain thread order as headers change
      var first_message = info.thread.GetHeaderMessage();
      if (first_message != previous_first_message) {
        var current_position = 0;
        while (this.thread_list[current_position].thread.id != info.thread.id) {
          current_position++;
        }
        this.thread_list.splice(current_position, 1);    // Remove
        var new_position = this._FindInsertionPosition(info.thread);
        this.thread_list.splice(new_position, 0, info);  // Re-add
        if (new_position != current_position) {
          // Position has changed, we need to move widgets
          insert_before = this.thread_list[new_position + 1];
          for (var i in info.widgets) {
            this.tbody.removeChild(info.widgets[i]);
          }
          need_to_insert_header_widgets = true;
        } 
      }
    }
    if (need_to_insert_header_widgets) {
      for (var i in info.widgets) {
        if (insert_before) {
          this.tbody.insertBefore(info.widgets[i], insert_before.widgets[0]);
        } else {
          this.tbody.appendChild(info.widgets[i]);
        }
      }
    }
    this.update_stats = true;
    return result;
  }

  this.GetThread = function(thread_id) {
    if (this.thread_map[thread_id]) return this.thread_map[thread_id].thread;
    return null;
  }

  this.GetMessage = function(message_uid) {
    return this.messages[message_uid];
  }

  this.GetThreadByMessageUID = function(message_uid) {
    var message = this.GetMessage(message_uid);
    return message ? this.GetThread(message.thread_id) : null;
  }

  this.GetAllThreads = function() {
    var all_threads = [];
    for (var i in this.thread_list) {
      all_threads.push(this.thread_list[i].thread);
    }
    return all_threads;
  }

  this.ExpandThread = function(thread_id) {
    var thread = this.GetThread(thread_id);
    if (thread) thread.Expand();
  }

  this.CollapseThread = function(thread_id) {
    var thread = this.GetThread(thread_id);
    if (thread) {
      var obj = this;
      thread.Collapse();
      thread.MarkExpandedMessagesRead(function() {obj.update_stats = true});
    }
  }

  this.NewThread = function(subject, other_id, other_name, other_avatar_url) {
    var draft = new Message(null, true /* is_sent */);
    draft.MakeDraft(subject || '<Новая тема>', other_id + '-0',
                    other_id, other_name, other_avatar_url);
    this.AddMessage(draft, true /* no_cache */);
    return draft.thread_id;
  }

  this.ShowReplyForm = function(thread_id) {
    var thread = this.GetThread(thread_id);
    if (thread) {
      var new_draft = thread.MakeDraft();
      if (new_draft) this.AddMessage(new_draft, true /* no_cache */);
      thread.ShowReplyForm();
    }
  }

  this.CancelDraft = function(thread_id) {
    var thread = this.GetThread(thread_id);
    if (thread) {
      thread.HideReplyForm();
      var draft = thread.RemoveDraft();
      if (draft) {
        thread.UpdateViews();
        this.RemoveMessage(draft.uid);
      }
    }
  }

  this.RemoveThread = function(thread_id) {
    var thread = this.GetThread(thread_id);
    if (thread) {
      var pos = 0;
      for (pos in this.thread_list) {
        if (this.thread_list[pos].thread.id == thread.id) {
          break;
        }
      }
      var info = this.thread_map[thread.id];
      this.user_watcher.Unsubscribe(info.user_subscription);
      for (var i in info.widgets) this.tbody.removeChild(info.widgets[i]);
      delete this.thread_map[thread.id];
      this.thread_list.splice(pos, 1);
    }
  }

  this.RemoveThreadExclusivity = function(thread_id) {
    var thread = this.GetThread(thread_id);
    if (thread) {
      var obj = this;
      thread.RemoveExclusivity(function() {obj.update_stats = true});
    }
  }

  this.ExpandMessage = function(message_uid) {
    var thread = this.GetThreadByMessageUID(message_uid);
    if (thread) {
      var obj = this;
      thread.ExpandMessage(message_uid, function(){obj.update_stats = true});
    }
  }

  this.ReplyWithQuote = function(message_uid) {
    var thread = this.GetThreadByMessageUID(message_uid);
    if (thread) {
      var obj = this;
      thread.ReplyWithQuote(
          message_uid,
          function(fetched) {if (fetched) obj.update_stats = true});
    }
  }

  this.SendReply = function(thread_id, closure) {
    var thread = this.GetThread(thread_id);
    if (thread) {
      thread.SendReply(closure);
      // Remove and reinsert the message with updated timestamp
      var draft = thread.RemoveDraft();
      this.RemoveMessage(draft.uid);
      draft.Expand();
      draft.subject = draft.subject;
      draft.text = EscapeHTMLEntities(draft.text);
      draft.timestamp = new Date();
      draft.thread_id = this.ComputeThreadID(draft);
      this.AddMessage(draft);
      this.ExpandThread(draft.thread_id);
    }
  }

  this.RemoveMessage = function(message_uid, no_cache) {
    var message = this.GetMessage(message_uid);
    if (message) {
      delete this.messages[message_uid];
      var thread = this.GetThread(message.thread_id);
      if (thread) {
        thread.RemoveMessage(message_uid, no_cache);
        if (thread.NumMessages() == 0) this.RemoveThread(thread.id);
      }
      this.update_stats = true;
    }
  }

  this.DeleteMessage = function(message_uid, callback) {
    var thread = this.GetThreadByMessageUID(message_uid);
    if (thread) {
      var obj = this;
      var message = this.GetMessage(message_uid);
      thread.DeleteMessage(
          message_uid,
          function() {
            obj.RemoveMessage(message_uid, false);
            callback(message);
          });
    }
  }

  this.DeleteThread = function(thread_id, message_callback) {
    var obj = this;
    var thread = this.GetThread(thread_id);
    if (thread) {
      thread.Collapse();
      this.CancelDraft(thread_id);
      var messages = thread.GetMessages();
      for (var i in messages) {
        this.DeleteMessage(messages[i].uid, message_callback);
      }
    }
  }

  // NB: Local only!
  this.MarkMessageRead = function(message_uid) {
    var thread = this.GetThreadByMessageUID(message_uid);
    if (thread) thread.MarkMessageRead(message_uid,
                                       function() {this.update_stats = true});
  }

  this.SetMessageCache = function(new_cache) {
    this.message_cache = new_cache;
    for (var i in this.thread_list) {
      this.thread_list[i].thread.SetMessageCache(new_cache);
    }
  }

  this.SetThreadingBySubject = function(new_threading_by_subject) {
    if (new_threading_by_subject != this.threading_by_subject) {
      // Completely re-initialize - save, remove and re-add all messages.
      var all_messages = [];
      for (var i in this.messages) all_messages.push(this.messages[i]);
      for (var i in all_messages) this.RemoveMessage(all_messages[i].uid, true);
      this.threading_by_subject = new_threading_by_subject;
      for (var i in all_messages) {
        all_messages[i].thread_id = this.ComputeThreadID(all_messages[i]);
        this.AddMessage(all_messages[i], false);
      }
    }
  }

  this.SetMessageOrder = function(new_message_order) {
    if (new_message_order != this.message_order) {
      this.message_order = new_message_order;
      for (var i in this.thread_list) {
        this.thread_list[i].thread.SetMessageOrder(new_message_order);
      }
    }
  }

  this.UpdateStats = function(local_stats_view) {
    if (!this.update_stats) return;
    // This is a rather simplistic and inefficient way of keeping stats
    // If this ever becomes a problem, we'll need to make it all completely
    // event-based
    var unread_count = 0, inbox_count = 0, sent_count = 0;
    for (var i in this.messages) {
      var message = this.messages[i];
      if (message.is_sent) {
        sent_count++;
      } else {
        inbox_count++;
        if (message.IsUnread()) unread_count++;
      }
    }
    this.update_stats = false;
    local_stats_view.innerHTML =
        unread_count + '/' + inbox_count + '+' + sent_count;
  }
}

/* UserWatcher
 *
 * Tracks user's online status
 * TODO: Track name and avatar changes, too
 */
function UserWatcher(fetch_interval) {
  this.check_interval = ONLINE_STATUS_CHECK_INTERVAL;
  this.fetch_interval = fetch_interval;
  this.fetch_in_progress = false;
  this.last_fetch = new Date(0);

  function UserInfo(id, is_online, is_friend, timestamp) {
    this.id = id;
    this.is_online = is_online;
    // Friends are users seen at least once in "friends online" list.
    // This is hacky, and does not handle "unfriending" at all,
    // but proper solution is complicated.
    // TODO: implement proper solution.
    this.is_friend = is_friend;
    this.timestamp = timestamp || new Date(0);
    this.subscribers = [];
  }

  this.users = {}  // id:UserInfo map

  this._UpdateUser = function(new_info) {
    var old_info = this.users[new_info.id];
    if (!old_info) {
      GM_log(new_info.id + ' is ' +
             (new_info.is_online ? 'online' : 'offline'));
      this.users[new_info.id] = new_info;
    } else if (new_info.timestamp > old_info.timestamp) {
      if (new_info.is_online !== null &&
          new_info.is_online !== old_info.is_online) {
        GM_log(new_info.id + ' is ' +
               (old_info.is_online !== null ? 'now ' : '') +
               (new_info.is_online ? 'online' : 'offline'));
      }
      if (new_info.is_friend === null) {
        new_info.is_friend = old_info.is_friend;
      }
      new_info.subscribers = old_info.subscribers;
      this.users[new_info.id] = new_info;
      for (var i in new_info.subscribers) new_info.subscribers[i](new_info);
    }
  }

  this.UpdateFromMessage = function(message, timestamp) {
    this._UpdateUser(new UserInfo(
        message.other_id, message.other_is_online, null,
        timestamp || message.timestamp));
  }

  this.Subscribe = function(id, callback) {
    var token = [id, callback];
    var info = this.users[id];
    if (!info) {
      info = new UserInfo(id, null, null, null);
      this.users[id] = info;
    } else {
      callback(info);
    }
    info.subscribers.push(callback);
    return token;
  }

  this.Unsubscribe = function(token) {
    var info = this.users[token[0]];
    var new_callbacks = [];
    for (var i in info.callbacks) {
      if (info.callbacks[i] != token[1]) new_callbacks.push(info.callbacks[i]);
    }
    info.callbacks = new_callbacks;
  }

  this._Update = function() {
    var now = new Date();
    if (!this.fetch_in_progress && this.fetch_interval > 0 &&
        (now - this.last_fetch > this.fetch_interval)) {
      this.StartFetch();
      // Will re-schedule when done fetching
    } else {
      // Expire online status of inactive users
      // that haven't been updated for whatever reason
      for (var i in this.users) {
        var info = this.users[i];
        if (info.is_online &&
            now - info.timestamp > ONLINE_INACTIVITY_TIMEOUT) {
          this._UpdateUser(new UserInfo(info.id, false, null, now));
        }
      }
      var obj = this;
      setTimeout(function() {obj._Update()},
                 RandomDelay(this.check_interval, 0.1));
    }
  }

  // Only 50 entries are returned per query, those who have > 50 friends online
  // will have problems. TODO: fix this.
  this._FetchCallback = function(text, unused_node) {
    this.fetch_in_progress = false;
    var now = new Date();
    var friends_online = {};
    try {
      var friends_list = eval('(' + text + ')').friends;
      for (var i in friends_list) {
        var id = friends_list[i][0];
        var is_online = (friends_list[i][6] == 1);
        if (is_online) friends_online[id] = true;
        this._UpdateUser(new UserInfo(id, is_online, true, now));
      }
    } catch(e) {
      GM_log('Bad JSON: ' + e + ', text:\n' + text);
    }
    // Friends that we haven't seen online are, well, offline. Obviously.
    for (var i in this.users) {
      var info = this.users[i];
      if (info.is_online && info.is_friend && !friends_online[info.id]) {
        this._UpdateUser(new UserInfo(info.id, false, true, now));
      }
    }
    // Perform the ordinary expiration, too
    this._Update();
    this.last_fetch = now;
    return true;
  }

  this.StartFetch = function() {
    if (!this.fetch_in_progress) {
      var obj = this;
      this.fetch_in_progress = true;
      FETCHER.StartFetch(
          'POST', '/friends.php', {'filter': 'online'},
          HEADER_XHR,
          'friends',
          function(text, node) { return obj._FetchCallback(text, node) },
          false);
    }
  }

  this.SetFetchInterval = function(interval) {
    this.fetch_interval = interval;
  }
}

/* URLFetcher
 *
 * VK rate-limits "similar" requests. We adapt to that by introducing "buckets":
 * "similar" requests go into the same bucket and are queued and are delayed.
 * It seems that VK considers requests to the same URI "similar",
 * which is unfortunate because pretty much everything we do is under /mail.php,
 * so we end up with just one bucket. Oh well, a little bit of over-engineering
 * here. Or future-proofing. :)
 */
function URLFetcher() {
  this.buckets = {};

  function Request(method, url, headers, body, callback) {
    this.method = method;      // GET or POST
    this.url = url;            // Full request URL, with QS (if applicable)
    this.headers = headers;    // Additional request headers
    this.body = body;          // Request body
    this.callback = callback;  // Callback to call when done
    this.attempts = 0;         // Number of attempts made so far
    this.id = method + ' ' + url +
              (body.length ? ' + ' + body.length : '');  // For debug only
  }

  // TODO: improve burst behavior - we could send requests in parallel
  function Bucket(burst_size, time_between_bursts) {
    this.xhr = new XMLHttpRequest();  // XHR used to execute requests
    this.last_request_time = 0;       // When the last request was made
    this.request_in_flight = false;   // There is a request currently in flight
    this.queue = [];                  // More requests awaiting execution
    this.timeout = null;              // Timeout id (if currently sleeping)
    // Bursting settings - can send up to burst_size requests
    // before pausing for at least time_between_bursts
    this.target_time_between_bursts = time_between_bursts;
    this.time_between_bursts = time_between_bursts;
    this.burst_budget = burst_size - 1;
    this.burst_size = burst_size;
    // IFrame we use to fix authentication sometimes VK forgets something
    // about the user (even though it's been active, e.g. checking mail)
    // and fixing that involves some complicated redirect sequence.
    // Rather than replicate it, we just load the main page in an iframe
    this.auth_frame = null;

    this._SendRequest = function() {
      var req = this.queue[0];
      this.xhr.open(req.method, req.url, true);
      if (req.headers) {
        for (var h in req.headers) {
          this.xhr.setRequestHeader(h, req.headers[h]);
        }
      }
      if (req.method == 'POST') {
        this.xhr.setRequestHeader(
            'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      }
      req.attempts++;
      var obj = this;
      this.xhr.onreadystatechange = function(){obj._FetchCallback()};
      this.last_request_time = new Date();
      GM_log(req.id + ' - request (attempt #' + req.attempts + ')');
      this.request_in_flight = true;
      this.xhr.send(req.body);
    }

    this._FetchCallback = function() {
      if (this.xhr.readyState == 4) {
        var req = this.queue[0];
        var ok = true;
        if (this.xhr.responseText.match(RATE_LIMIT_RE)) {
          ok = false;
          this.burst_budget = 0;  // No more bursting
          // Bump interval by up to 50%
          this.time_between_bursts =
              RandomDelay(this.time_between_bursts, 0.5);
          GM_log(req.url + ' - Rate limited, new interval is ' +
                 this.time_between_bursts + ' ms.');
        } else if (this.xhr.responseText.match(AUTH_PROBLEM_RE)) {
          ok = false;
          GM_log(req.id + ' - Auth problem, trying to fix.');
          this.auth_frame = document.createElement('iframe');
          this.auth_frame.width = this.auth_frame.height = 1;
          this.auth_frame.style.display = 'none';
          this.auth_frame.src = '/';
          document.getElementsByTagName('body')[0].appendChild(this.auth_frame);
          this.burst_budget = 0;  // No more bursting
          this.time_between_bursts = RandomDelay(10000, 0.1);  // Wait ~10 secs
        } else {
          // Inch back towards target by up to 10%
          if (this.time_between_bursts > this.target_time_between_bursts) {
            this.time_between_bursts = Math.max(
                RandomDelay(this.time_between_bursts, -0.1),
                this.target_time_between_bursts);
          }
          if (this.auth_frame) {
            this.auth_frame.parentNode.removeChild(this.auth_frame);
            this.auth_frame = null;
          }
          var now = new Date();
          GM_log(req.id + ' - response after ' +
                 (now - this.last_request_time) + ' ms');
          this.last_request_time = new Date();
          var parser_div = document.createElement('div');
          parser_div.innerHTML = this.xhr.responseText;
          if (req.callback) {
            ok = req.callback(this.xhr.responseText, parser_div);
          }
        }
        if (ok) {
          StopSpin();
          this.queue.splice(0, 1);
        }
        this.request_in_flight = false;
        this._Schedule();
      }
    }

    this._Schedule = function(from_timeout) {
      // If there's a request in flight or we are already waiting, do nothing
      if (this.request_in_flight || (this.timeout && !from_timeout)) return;
      this.timeout = null;
      // Is there anything for us to do?
      var req = this.queue[0];
      if (!req) return;
      // There is. Is it time to do it, though?
      var now = new Date();
      var time_since_last_request = now - this.last_request_time;
      if (time_since_last_request > this.time_between_bursts) {
        this.burst_budget = burst_size - 1;  // -1 for the one we're sending
        this._SendRequest();
      } else if (this.burst_budget > 0) {
        this.burst_budget--;
        this._SendRequest();
      } else {
        var sleep_time = RandomDelay(
            this.time_between_bursts - time_since_last_request, 0.2);
        GM_log(req.id + ' - waiting for ' + sleep_time + ' ms (interval ' +
               this.time_between_bursts + '), ' +
               this.queue.length + ' requests in line.');
        var obj = this;
        this.timeout = setTimeout(function(){obj._Schedule(true)}, sleep_time);
      }
    }

    this.AddRequest = function(request, add_to_front) {
      if (add_to_front) {
        this.queue.splice(0, 0, request);
      } else {
        this.queue.push(request);
      }
      this._Schedule();
    }
  }

  this.StartFetch = function(
      method, uri, params, headers, bucket_id, callback, high_priority) {
    if (!BUCKET_PARAMS[bucket_id]) bucket_id = 'default';
    var bucket = this.buckets[bucket_id];
    if (!bucket) {
      var bucket_params = BUCKET_PARAMS[bucket_id];
      GM_log('New bucket ' + bucket_id + ' ' +
             bucket_params.burst + ',' + bucket_params.interval);
      bucket = new Bucket(bucket_params.burst,
                          bucket_params.interval);
      this.buckets[bucket_id] = bucket;
    }
    var url, body;
    if (method == 'GET') {
      url = uri + '?' + DictToString(params);
      body = '';
    } else {
      url = uri;
      body = DictToString(params);
    }
    SpinWidget();
    bucket.AddRequest(
        new Request(method, url, headers, body, callback), high_priority);
  }
}

/* SyncerStrategy
 * Provides an algorithm that syncs two lists of ints, "client" and "server".
 * The following conditions are assumed by the algorithm:
 *  - Lists contain unique integers, in descending order.
 *  - Integers are monotonically increasing, therefore new ones will appear
 *    at the beginning of the server list.
 */
function SyncerStartegy() {
  // These are initialized by Sync and used by _PartialSync.
  this.cl = [];         // Current "client" list
  this.sl = [];         // "Server" list, empty at the start
  this.done_cb = null;  // Callback to call when sync is done

  // Must be provided by derived class before Sync is called.
  // How many elements will usually be returned by _Fetch.
  this.batch_size = null;
  // Fetch - retrieve elements from the server starting at given position.
  // It is expected that _Fetch will retrieve batch_size elements,
  // but any number >= 1 will do. Put new elements directly into this.sl
  // starting at the requested position and call cb without arguments.
  this._Fetch = function(start_index, cb) { throw "Fetch not implemented." }
  // Add - given id should be removed from the client list.
  // This is only a notification, the algorithm does not expect any effects.
  // Specifically, this method must *not* remove ithe element from cl.
  // This method will be called exactly once for each new element
  // in the server list (i.e. the one not present in the client list).
  this._Add = function(id) { }
  // Remove - removal notification.
  // Same applies: do *not* remove the element from cl, will be called once
  // for every element of the cl that is no longer in the sl.
  this._Remove = function(id) { }
  // Log a message. Completely optional, logs progress of the sync.
  this._Log = function(message) { }

  this.recursion_depth = 0;

  // PartialSync - The recursive function that performs one step of the sync.
  //   
  // Overall plan is as follows:
  // 1) Find the left pivot position, i.e. the leftmost position in sl and cl
  //    where they contain same element.
  //    slp - server left pivot, clp - client left pivot
  // 2) Find the right pivot position (srp, crp).
  // 3) Check if elements between pivots are in sync: because new ones cannot
  //    appear in the middle, if we have the same number of element between
  //    pivots, they must be the same.
  // 3.yes) Fill the server interval from the client
  // 3.no) Split the remaining server interval in half and sync both halves
  this._PartialSync = function(slp, clp, srp, crp, is_fetch_cb) {
    try {
    this._Log('sync(' + [slp, clp, srp, crp, is_fetch_cb] + ')');
    if (!is_fetch_cb) this.recursion_depth++;
    if (this.recursion_depth > 100) {
      throw ('Recursion limit reached at ' + [slp, clp, srp, crp]);
    }
    
    // 1) Find the left pivot position
    this._Log('find left pivot');
    for (; slp <= srp; slp++) {
      if (this.sl[slp] === undefined) {
        var obj = this;
        this.__Fetch(slp,
                     function() {obj._PartialSync(slp, clp, srp, crp, true)});
        return;
      }
      if (this.cl[clp] === undefined || this.cl[clp] < this.sl[slp]) {
        this.__Add(this.sl[slp]);
      } else {
        while (clp <= crp && this.cl[clp] > this.sl[slp]) {
          this.__Remove(this.cl[clp]);
          clp++;
        }
        if (this.cl[clp] == this.sl[slp]) {
          while (slp < srp && this.cl[clp + 1] === this.sl[slp + 1]) {
            clp++;
            slp++;
          }
          break;
        }
      }
    }

    // 2) Find the right pivot position
    if (!(srp == this.sl.length - 1 && crp == this.cl.length - 1 &&
          srp - slp == crp - clp)) {
      this._Log('find right pivot (' + [slp, clp, srp, crp] + ')');
      for (; srp >= slp; srp--) {
        if (this.sl[srp] === undefined) {
          var obj = this;
          var start = Math.max(slp, srp - (this.batch_size - 1));
          this.__Fetch(start,
                       function() {obj._PartialSync(slp, clp, srp, crp, true)});
          return;
        }
        if (this.cl[crp] === undefined || this.cl[crp] > this.sl[srp]) {
          this.__Add(this.sl[srp]);
        } else {
          while ((crp >= clp) && (this.cl[crp] < this.sl[srp])) {
            this.__Remove(this.cl[crp]);
            crp--;
          }
          if (this.cl[crp] == this.sl[srp]) {
            while (srp > slp && this.cl[crp - 1] === this.sl[srp - 1]) {
              crp--;
              srp--;
            }
            break;
          }
        }
      }
    }

    this._Log('pivots found: ' + [slp, clp, srp, crp]);

    // 2.5) Remove the client elements corresponding to empty server range
    var crd = 0;
    if (srp - slp < 2) {
      // Do not remove pivot elements themselves, if we do indeed have them
      var ll = clp + (this.sl[slp] === this.cl[clp] ? 1 : 0);
      var lr = crp + ((srp >= slp && (this.sl[srp] === undefined ||
                                      this.sl[srp] === this.cl[crp])) ? 0 : 1);
      for (var i = ll; i < lr; i++) {
        this.__Remove(this.cl[i]);
        crd++;
      }
    }

    // 3) Check if elements between pivots are in sync
    if (srp - slp != crp - clp - crd) {
      if (slp > srp) throw('Cannot split negative range: ' + [slp, srp]);
      // 3.no) Split the remaining server interval in half and sync both halves
      if (srp - slp > 2 * this.batch_size) {
        var obj = this;
        var smid = slp + Math.floor((srp - slp) / 2);
        if (this.sl[smid] === undefined) {
          this.__Fetch(smid - Math.floor(this.batch_size / 2),
                       function() {obj._PartialSync(slp, clp, srp, crp, true)});
          return;
        }
        var cmid = clp + Math.floor((crp - clp) / 2);
        while (this.cl[cmid] > this.sl[smid]) cmid++;
        while (this.cl[cmid] < this.sl[smid]) cmid--;
        this._PartialSync(slp, clp, smid, cmid, false);
        this._PartialSync(smid, cmid, srp, crp, false);
      } else {
        this._PartialSync(slp + 1, clp + 1, srp - 1, crp - 1, false);
      }
    } else {
      // 3.yes) Fill the server interval from the client
      for (var i = srp; i > slp; i--) {
        this.sl[i] = this.cl[crp - (srp - i)];
      }
    }
    this._Log('done merging');
    this.recursion_depth--;
    if (this.recursion_depth == 0) this.done_cb(this.sl);
    } catch(e) {
      this._Log('Exception while syncing: ' + e.message);
      this._Log('sl so far: [' + this.sl + ']');
      this._Log('cl so far: [' + this.cl + ']');
      this._Log(e.fileName + ':' + e.lineNumber);
      this.done_cb(null);
    }
  }
  
  this.StartSync = function(cl, sl_size, done_cb) {
    this.cl = cl;
    this.sl = [];
    this.done_cb = done_cb;
    if (sl_size > 0) this.sl[sl_size - 1] = undefined;  // resize the array
    this._PartialSync(0, 0, sl_size - 1, this.cl.length - 1, false);
  }

  this.__Fetch = function(start_index, cb) {
    this._Log(' fetch ' + start_index);
    this._Fetch(start_index, cb);
  }

  this.__Add = function(id) {
    this._Log(' add ' + id);
    this._Add(id);
  }

  this.__Remove = function(id) {
    this._Log(' remove ' + id);
    this._Remove(id);
  }
}

function Syncer(all_messages, thread_list, fetch_fun) {
  this.batch_size = MESSAGES_PER_PAGE;
  this.all_messages = all_messages;
  this.thread_list = thread_list;
  this.fetch_fun = fetch_fun;
  this.sync_cb = null;
  this.log = []
  this.added = 0;
  this.removed = 0;

  this._Fetch = function(start_index, cb) {
    var obj = this;
    this.sync_cb = cb;
    this.fetch_fun(start_index,
                   function(messages) {obj._FetchDone(start_index, messages)});
  }

  this._FetchDone = function(start_index, messages) {
    for (var i = 0; i < messages.length; i++) {
      this.sl[start_index + i] = messages[i].id;
    }
    this.sync_cb();
  }

  this._Add = function(id) {
    this.thread_list.AddMessage(this.all_messages[id], false);
    this.added++;
  }

  this._Remove = function(id) {
    this.thread_list.RemoveMessage(this.all_messages[id].uid);
    this.removed++;
  }

  this._Log = function(msg) {
    var sp = ' ';
    for (var i = 0; i < this.recursion_depth; i++) sp += '  ';
    msg = this.recursion_depth + sp + msg;
    this.log.push(msg);
  }
}

Syncer.prototype = new SyncerStartegy();

/* InboxWatcher
 *
 * Synchronizes list of incoming messages.
 */
function InboxWatcher(thread_list, max_messages, message_cache, user_watcher) {
  this.name = 'Inbox';
  this.thread_list = thread_list;
  this.max_messages = max_messages;
  this.message_cache = message_cache;
  this.user_watcher = user_watcher;
  this.check_interval = 0;          // Interval between cycles, 0 - disabled
  this.out = 0;  // Inbox
  this.last_cycle = 0;              // Last cycle completion time
  this.timeout_id = null;           // Currently sleeping, this is the timeout
  this.server_unread_count = -1;    // Number of unread, as reported by server
  // Cycle variables
  this.cycle_in_progress = false;   // Cycle is in progress
  this.num_fetches = 0;
  this.all_messages = {};
  this.all_ids = [];
  this.fetched_messages = {};
  this.fetch_more = 0;
  this.page_one = null;
  this.server_total_count = -1;     // Total number, as reported by server
  this.fetch_cb = null;

  this._Log = function(msg) {
    GM_log(this.name + ': ' + msg);
  }

  this._FetchPage = function(start_index, cb, high_priority) {
    var obj = this;
    if (start_index == 0 && this.page_one) {
      var parser_div = document.createElement('div');
      parser_div.innerHTML = this.page_one;
      this._FetchDone(this.page_one, parser_div, cb);
    } else {
      this.page_one = null;
      this.num_fetches++;
      FETCHER.StartFetch(
          'GET', '/mail.php', {'out': this.out, 'st': start_index},
          null,
          'sync',
          function(text, node) { return obj._FetchDone(text, node, cb) },
          high_priority);
    }
  }

  this._ParseMessages = function(node) {
    return ParseMessages(GetMessagePane(node), false);
  }

  this._ParseTotalCount = function(node) {
    var summary = node.getElementsByClassName('summary');
    if (summary.length > 0) {
      var m = summary[0].textContent.match(MESSAGE_COUNT_RE);
      if (m) return parseInt(m[1]);
    }
    return -1;
  }

  this._ParseUnreadCount = function(node) {
    var ols = node.getElementsByTagName('ol');
    for (var i = 0; i < ols.length; i++) {
      if (ols[i].id == 'nav') {
        var links = ols[i].getElementsByTagName('a');
        for (var j = 0; j < links.length; j++) {
          if (links[j].href.indexOf('/mail.php') != -1) {
            var bolds = links[j].getElementsByTagName('b');
            if (bolds.length == 1) {
              this.server_unread_count = parseInt(bolds[0].textContent);
              links[j].removeChild(bolds[0]);
              return;
            } else if (bolds.length == 0) {
              this.server_unread_count = 0;
              return;
            }
          }
        }
      }
    }
    this._Log('Cannot parse unread count');
  }

  this._MessageFilter = function(message) {
    return !message.is_sent && !message.IsDraft();
  }

  this._IsUnreadMessage = function(message) {
    return this._MessageFilter(message) && message.IsUnread();
  }

  this._FetchDone = function(text, node, cb) {
    // TODO: check for change of the total?
    if (this.server_total_count < 0) {
      this.server_total_count = this._ParseTotalCount(node);
    }
    this._ParseUnreadCount(node);
    var messages = this._ParseMessages(node);

    if (this.server_total_count < 0 || messages === null) {
      this._Log('Error parsing the page, contents (' +
                text.length + '):\n' + text);
      // Cycle aborted, schedule next hoping that error is transient
      this._ScheduleNextCycle();
      return true;  // Stop retrying
    }
    var now = new Date();
    for (var i in messages) {
      var message = messages[i];
      var existing_message = this.all_messages[message.id];
      if (existing_message &&
          (message.IsUnread() != existing_message.IsUnread() ||
           message.IsUnreadSent() != existing_message.IsUnreadSent())) {
        this.thread_list.MarkMessageRead(message.uid);
      }
      this.all_messages[message.id] = message;
      this.fetched_messages[message.id] = message;
      // User status/avatar updates are piggybacked on sync fetches
      this.user_watcher.UpdateFromMessage(message, now);
    }
    setTimeout(function() { cb(messages, node) }, 0);
    return true;
  }

  this.MessageDeleted = function() {
    // Unused callback.
  }

  this._StartSync = function(unused_messages, node) {
    var obj = this;
    var limit = Math.min(this.server_total_count,
                         this.max_messages || this.server_total_count);
    this._Log('Syncing ' + limit + ' messages.');
    this.syncer.StartSync(this.all_ids, limit, function(sl){obj._SyncDone(sl)});
  }

  this._SyncDone = function(sl) {
    this.fetch_more = 0;
    var num_unread = 0;
    if (sl) {
      this._Log('List sync done (added: ' +
                this.syncer.added +', removed: ' + this.syncer.removed +
                '), checking unread.');
      // See which unread messages are left unchecked and schedule more fetches
      var last_fetched = -MESSAGES_PER_PAGE;
      for (var i = 0; i < sl.length; i++) {
        var message = this.all_messages[sl[i]];
        // Haven't fetched this particular unread message
        // and it's not covered by an already scheduled fetch.
        if (this._IsUnreadMessage(message) &&
            !this.fetched_messages[message.id]) {
          num_unread++;
          if (i - last_fetched >= MESSAGES_PER_PAGE) {
            this.fetch_more++;
            var obj = this;
            this._FetchPage(
                i, function(_, __) { obj._FetchMoreDone(true) }, false);
            last_fetched = i;
          }
        }
      }
    } else {
      this._Log('List sync failed, log:\n' + this.syncer.log.join('\n'));
    }
    if (!this.fetch_more) {
      this._FetchMoreDone(false);
    } else {
      this._Log(num_unread + ' non-covered unread messages, ' +
                this.fetch_more + ' more fetches to make.');
    }
  }

  this._FetchMoreDone = function(from_fetch) {
    if (from_fetch) this.fetch_more--;
    if (this.fetch_more == 0) {
      this._ScheduleNextCycle();
    }
  }

  this._ScheduleNextCycle = function() {
    var obj = this;
    this.last_cycle = new Date();
    var sleep_time = RandomDelay(this.check_interval, 0.2);
    this._Log('Cycle finished, ' + this.num_fetches + ' fetches' +
              (sleep_time > 0 ? '; next in ' + sleep_time + ' ms.' : '.'));
    this.cycle_in_progress = false;
    // Drop references to some potentially expensive objects
    this.all_messages = this.fetched_messages = {};
    this.page_one = null;
    this.timeout_id = (sleep_time > 0 ?
                       setTimeout(function(){obj.StartCycle()}, sleep_time) :
                       null);
  }

  this.StartCycle = function(page_one) {
    if (!this.cycle_in_progress) {
      var obj = this;
      this.page_one = page_one;
      this.cycle_in_progress = true;
      this.all_messages = {};
      this.fetched_messages = {};
      this.server_total_count = -1;
      this.num_fetches = 0;
      this.sync_cb = null;
      this.all_ids = [];
      this.fetch_more = 0;
      var all_threads = this.thread_list.GetAllThreads();
      for (var i in all_threads) {
        var messages = all_threads[i].GetMessages(this._MessageFilter);
        for (var j in messages) {
          this.all_ids.push(messages[j].id);
          this.all_messages[messages[j].id] = messages[j];
        }
      }
      this.all_ids.sort(function(a, b) { return b - a });
      this.syncer = new Syncer(this.all_messages, this.thread_list,
                               function(start, cb) {
                                 obj._FetchPage(start, cb, false);
                               });
      this._FetchPage(0,
                      function (_, node) {
                        obj.page_one = node.innerHTML;
                        obj._StartSync(null, node);
                      },
                      false);
    }
  }

  this.SetCheckInterval = function(interval) {
    this.check_interval = interval;
    if (!this.cycle_in_progress) {
      if (this.timeout_id) clearTimeout(this.timeout_id);
      if (this.check_interval > 0) {
        var now = new Date();
        var new_timeout =
            this.check_interval -
            Math.min(this.check_interval - 1,
                     Math.max(now - this.last_cycle, 1));
        var obj = this;
        this.timeout_id = setTimeout(function(){obj.StartCycle()}, new_timeout);
      }
    }
  }

  this.SetMaxMessages = function(max_messages) {
    this.max_messages = max_messages;
  }
}

// SentWatcher is almost identical to InboxWatcher, apart from a few tweaks
function SentWatcher(thread_list, max_messages, message_cache, user_watcher) {
  this.name = 'Sent';
  this.out = 1;
  this.count = 0;
  this.thread_list = thread_list;
  this.max_messages = max_messages;
  this.message_cache = message_cache;
  this.user_watcher = user_watcher;

  this._ParseMessages = function(node) {
    return ParseMessages(GetMessagePane(node), true);
  }

  this._ParseUnreadCount = function(node) {
    return -1;
  }

  this._MessageFilter = function(message) {
    return message.is_sent && !message.IsDraft();
  }

  this._IsUnreadMessage = function(message) {
    return this._MessageFilter(message) && message.IsUnreadSent();
  }

  this.QuickCheck = function() {
    // Be careful not to disrupt potentially running normal cycle
    var obj = this;
    this._FetchPage(
        0,
        function (messages, _) {
          for (var i in messages) {
            obj.thread_list.AddMessage(messages[i], false);
          }
        },
        true /* high_priority */);
  }
}
SentWatcher.prototype = new InboxWatcher();

/* Dispatcher.
 *
 * Event dispatcher.
 * Singleton. Handles all user commands (even if by just wiring-through
 * to appropriate underlying machinery) and hash navigation.
 * Dispatch() is invoked every 100 ms, whatever you do there must be quick.
 */
function Dispatcher(thread_list, thread_list_view, thread_view, settings_view,
                    inbox_watcher, sent_watcher,
                    local_stats_view, server_stats_view) {
  this.thread_list = thread_list;
  this.thread_list_view = thread_list_view;
  this.thread_view = thread_view;
  this.settings_view = settings_view;
  this.inbox_watcher = inbox_watcher;
  this.sent_watcher = sent_watcher;

  this.previous_hash = '';
  this.need_hash_update = false;

  this.local_stats_view = local_stats_view;
  this.server_stats_view = server_stats_view;
  this.previous_server_stats = '';

  this.NewThread = function(subject, other_id, other_name, other_avatar_url) {
    var thread_id = this.thread_list.NewThread(
        subject, other_id, other_name, other_avatar_url);
    this.ExpandThread(thread_id);
    this.ShowReplyForm(thread_id);
  }

  this.ShowReplyForm = function(thread_id) {
    var thread = this.thread_list.GetThread(thread_id);
    if (thread) {
      // TODO: make this work properly when in exclusive mode
      // (not break the "back to list" link)
      if (!thread.exclusive) this.ExpandThread(thread_id);
      this.thread_list.ShowReplyForm(thread_id);
    }
  }

  this.CancelDraft = function(thread_id) {
    this.thread_list.CancelDraft(thread_id);
    this.CollapseThread(thread_id);
  }

  this.ExpandMessage = function(message_uid) {
    this.thread_list.ExpandMessage(message_uid);
  }

  this.ReplyWithQuote = function(message_uid) {
    var thread = this.thread_list.GetThreadByMessageUID(message_uid);
    if (thread) {
      this.ShowReplyForm(thread.id);
      this.ExpandThread(thread.id);
      this.thread_list.ReplyWithQuote(message_uid);
    }
  }

  this._ReplySent = function() {
    this.sent_watcher.QuickCheck();
    this.need_hash_update = true;
  }

  this.SendReply = function(thread_id) {
    var obj = this;
    this.thread_list.SendReply(thread_id, function() {obj._ReplySent()});
  }

  this._MessageDeleted = function(message) {
    if (!message.IsDraft()) {
      var watcher = message.is_sent ? this.sent_watcher : this.inbox_watcher;
      watcher.MessageDeleted();
    }
    this.need_hash_update = true;
  }
  this.DeleteMessage = function(message_uid) {
    var obj = this;
    this.thread_list.DeleteMessage(
        message_uid,
        function(message) {obj._MessageDeleted(message)});
  }
  this.DeleteThread = function(thread_id) {
    var obj = this;
    this.thread_list.DeleteThread(
        thread_id,
        function(message) {obj._MessageDeleted(message)});
  }

  this.ExpandThread = function(thread_id) {
    this.thread_list.ExpandThread(thread_id);
    this.need_hash_update = true;
  }

  this.CollapseThread = function(thread_id) {
    this.thread_list.CollapseThread(thread_id);
    this.need_hash_update = true;
  }

  this.ShowThread = function(thread_id) {
    var thread = this.thread_list.GetThread(thread_id);
    if (thread) {
      this.thread_list_view.style.display = 'none';
      thread.RenderExclusive();
      this.thread_view.style.display = '';
      this.need_hash_update = true;
    }
  }

  this._UpdateHash = function() {
    var hash = '';
    var hash_parts = [];
    var expanded_threads = [];
    var exclusive_thread = null;
    var all_threads = this.thread_list.GetAllThreads();
    for (var i in all_threads) {
      var thread = all_threads[i];
      if (thread.expanded) expanded_threads.push(thread.id);
      if (thread.exclusive) exclusive_thread = thread.id;
    }
    if (expanded_threads.length > 0)
      hash_parts.push('expanded:' + expanded_threads.join(','));
    if (exclusive_thread) hash_parts.push('exclusive:' + exclusive_thread);
    if (hash_parts.length > 0) hash = hash_parts.join(';');
    if (window.location.hash != hash) {
      var html = document.getElementsByTagName('html')[0];
      var saved_scroll_pos = html.scrollTop;
      if (!hash) {  // Empty hash is special (some might even say buggy)
        this.previous_hash = '';
        window.location.hash = '#';
      } else {
        this.previous_hash = '#' + hash;
        window.location.hash = hash;
      }
      GM_log('new hash: ' + hash);
      // Anchor navigation (specifically navigating to #) can reset scroll pos.
      if (html.scrollTop != saved_scroll_pos) html.scrollTop = saved_scroll_pos;
    }
    this.need_hash_update = false;
  }

  this._UpdateServerStats = function(server_stats_view) {
    var it = this.inbox_watcher.server_total_count;
    var iu = this.inbox_watcher.server_unread_count;
    var st = this.sent_watcher.server_total_count;
    if (it < 0 || st < 0) return;  // transient state
    if (iu == -1) iu = '?';
    var server_stats = iu + '/' + it + '+' + st;
    if (server_stats != this.previous_server_stats) {
      server_stats_view.innerHTML = server_stats;
      this.previous_server_stats = server_stats;
    }
  }

  this.Dispatch = function() {
    if (this.need_hash_update) this._UpdateHash();
    var hash = window.location.hash;
    if (hash != this.previous_hash) {
      GM_log('hash changed: ' + this.previous_hash + ' -> ' + hash);
      var show_settings, show_thread_list, show_thread;
      if (hash == '#settings') {
        FillSettingsForm();
        show_settings = true;
      } else {
        // Parse hash and get list of expanded threads
        var parts = hash ? hash.substr(1).split(';') : [];
        var expanded_threads = {};
        var exclusive_thread_id = null;
        for (var i in parts) {
          var subparts = parts[i].split(':');
          switch (subparts[0]) {
            case 'expanded':
              var args = subparts[1].split(',');
              for (var j in args) expanded_threads[args[j]] = true;
              break;
            case 'exclusive':
              exclusive_thread_id = subparts[1];
              break;
            default:
              GM_log('unknown hash component: ' + subparts);
          }
        }
        // Sync thread state to what's in the hash
        var all_threads = this.thread_list.GetAllThreads();
        var exclusive_thread = null;
        for (var i in all_threads) {
          var thread = all_threads[i];
          if (expanded_threads[thread.id]) {
            if (!thread.expanded) thread_list.ExpandThread(thread.id);
          } else {
            if (thread.expanded) thread_list.CollapseThread(thread.id);
          }
          if (thread.id == exclusive_thread_id) {
            exclusive_thread = thread;
          } else if (thread.exclusive) {
            thread_list.RemoveThreadExclusivity(thread.id);
          }
        }
        if (exclusive_thread) {
          exclusive_thread.RenderExclusive();
          show_thread = true;
        } else {
          show_thread_list = true;
        }
      }
      // Update visibility of our three views
      this.thread_list_view.style.display = show_thread_list ? '' : 'none';
      this.thread_view.style.display = show_thread ? '' : 'none';
      this.settings_view.style.display = show_settings ? '' : 'none';
      this.previous_hash = hash;
    }
    this.thread_list.UpdateStats(this.local_stats_view);
    this._UpdateServerStats(this.server_stats_view);
    var obj = this;
    setTimeout(function(){obj.Dispatch()}, 100);
  }
}

/* DummyCache - empty cache, not backed by anything. */
function DummyCache() {
  this.Init = function(version, force) {};
  this.GetMatchingKeys = function(item_key_prefix) { return [] }
  this.GetMatchingItems = function(item_key_prefix) { return [] }
  this.GetItem = function(item_key, value) { return '' }
  this.SetItem = function(item_key, value) { }
  this.RemoveItem = function(item_key) { }
  this.BarrierClosure = function(closure) { setTimeout(closure, 10) }
}

/* LocalCache - cache backed by localStorage. 
 *
 * To work around slowness of localStorage in Firefox 3.5, this cache switches
 * to asynchronous mode after certain number of transactions.
 * we keep a log of transactions and a table of overrides (memtable),
 * i.e. values of keys currently in the log.
 * Log flushing is very simplistic and assumes that we'll be able to catch up
 * "soon", i.e. before we eat too much memory for log and memtable.
 */
function LocalCache(storage, key_prefix) {
  this.storage = storage;
  this.key_prefix = key_prefix;

  this.flush_timeout = null;
  this.burst_budget = MAX_LOCAL_STORAGE_BURST;
  this.log = [];
  this.memtable = {};
  this.flush_position = 0;
  this.barriers = [];

  this.Init = function(version, force) {
    if (force ||
        !this.storage[this.key_prefix + '_version'] ||
        this.storage[this.key_prefix + '_version'] != version) {
      var all_keys = this.GetMatchingKeys('');
      for (var i in all_keys) this.RemoveItem(all_keys[i]);
      this.storage[this.key_prefix + '_version'] = version;
      GM_log('Initialized local storage ' + key_prefix);
    }
    GM_log('Local storage ' + key_prefix + ' version ' + version + ', ' +
           'total keys in base: ' + this.storage.length);
  }

  this.GetMatchingKeys = function(item_key_prefix) {
    var keys = [];
    var full_prefix = this.key_prefix + '/' + item_key_prefix;
    var item_key_start = this.key_prefix.length + 1;  // +1 - eat trailing slash
    for (var key in this.storage) {
      if (key.substr(0, full_prefix.length) == full_prefix) {
        if (this.memtable[key] !== null) keys.push(key.substr(item_key_start));
      }
    }
    return keys;
  }

  this.GetMatchingItems = function(key_prefix) {
    var keys = this.GetMatchingKeys(key_prefix);
    var values = [];
    for (var i in keys) values.push(this.GetItem(keys[i]));
    return values;
  }

  this.GetItem = function(item_key) {
    var full_key = this.key_prefix + '/' + item_key;
    var override = this.memtable[full_key];
    if (override !== undefined) return override;
    return this.storage[full_key];
  }

  this._InternalSetItem = function(full_key, value) {
    // Inserts are expensive (in Firefox 3.5), do not update unless necessary
    if (this.storage[full_key] != value) this.storage[full_key] = value;
  }

  this.SetItem = function(item_key, value) {
    var full_key = this.key_prefix + '/' + item_key;
    if (this.burst_budget-- > 0) {
      this._InternalSetItem(full_key, value);
    } else {
      this.log.push([full_key, value]);
      this.memtable[full_key] = value;
      this._ScheduleFlush();
    }
  }

  this._InternalRemoveItem = function(full_key) {
    this.storage.removeItem(full_key);
  }

  this.RemoveItem = function(item_key) {
    var full_key = this.key_prefix + '/' + item_key;
    if (this.burst_budget-- > 0) {
      this._InternalRemoveItem(full_key);
    } else {
      this.log.push([full_key, null]);
      this.memtable[full_key] = null;
      this._ScheduleFlush();
    }
  }

  this._ScheduleFlush = function() {
    if (!this.flush_timeout) {
      var obj = this;
      this.flush_timeout = setTimeout(
          function() {obj._Flush(MAX_LOCAL_STORAGE_BURST)},
          LOCAL_STORAGE_FLUSH_INTERVAL);
    }
  }

  this._Flush = function(units) {
    this.flush_timeout = null;
    while (units > 0 && this.flush_position < this.log.length) {
      var trx = this.log[this.flush_position];
      // If this is not the latest value of this key, replaying this trx
      // is a waste of time.
      if (trx[1] === this.memtable[trx[0]]) {
        if (trx[1] !== null) {
          this._InternalSetItem(trx[0], trx[1]);
        } else {
          this._InternalRemoveItem(trx[0]);
        }
        units--;
      }
      this.flush_position++;
    }
    if (this.flush_position < this.log.length) {
      this._ScheduleFlush();
    } else {
      this.burst_budget = MAX_LOCAL_STORAGE_BURST;
      this.log = [];
      this.memtable = {};
      this.flush_position = 0;
      for (var i in this.barriers)
        this.barriers[i]();
      this.barriers = [];
    }
  }

  this.BarrierClosure = function(closure) {
    if (this.log.length == 0) {
      setTimeout(closure, 10);
    } else {
      this.barriers.push(closure);
    }
  }
}

// Settings management functions
function ApplySettings(save) {
  var old_settings = SettingsFromCookie();
  var settings = {};
  // Parse
  settings.check_interval = parseInt(el('vkm-check-interval').value) * 1000;
  settings.max_messages = parseInt(el('vkm-max-messages').value || 0);
  settings.enable_local_storage = el('vkm-enable-local-storage').checked;
  settings.message_order = el('vkm-message-order').value;
  settings.threading_by_subject = el('vkm-thread-by-subject').value == 'true';
  // Fix up max_messages. We intentionally allow 0.
  if (settings.max_messages % MESSAGES_PER_PAGE != 0) {
    settings.max_messages += MESSAGES_PER_PAGE;
    settings.max_messages -= settings.max_messages % MESSAGES_PER_PAGE;
    save = true;
  }
  // Apply
  user_watcher.SetFetchInterval(settings.check_interval);
  inbox_watcher.SetCheckInterval(settings.check_interval);
  inbox_watcher.SetMaxMessages(settings.max_messages);
  sent_watcher.SetCheckInterval(settings.check_interval);
  sent_watcher.SetMaxMessages(settings.max_messages);
  thread_list.SetMessageCache(
      settings.enable_local_storage ? local_cache : dummy_cache);
  thread_list.SetThreadingBySubject(settings.threading_by_subject);
  thread_list.SetMessageOrder(settings.message_order);
  // Save and return
  if (save) {
    var settings_string = DictToString(settings);
    GM_log('new settings: ' + settings_string);
    GM_setValue('settings', settings_string);
    unsafeWindow.history.go(-1);
  }
  // Kick off sync if max_messages has changed
  if (settings.max_messages != old_settings.max_messages) {
    // This timeout is necessary to let history transition happen,
    // otherwise, if request is sent, transfer aborts when page transition
    // happens (observed in Chrome 4.0.223.11).
    setTimeout(
        function() {
          inbox_watcher.StartCycle();
          sent_watcher.StartCycle();
        }, 500);
  }
}

function SettingsFromCookie() {
  var settings = DictFromString(GM_getValue('settings', ''));
  for (var key in DEFAULT_SETTINGS) {
    if (!(key in settings)) settings[key] = String(DEFAULT_SETTINGS[key]);
  }
  settings.check_interval = parseInt(settings.check_interval);
  settings.max_messages = parseInt(settings.max_messages);
  settings.enable_local_storage = (settings.enable_local_storage == 'true');
  settings.threading_by_subject = (settings.threading_by_subject == 'true');
  return settings;
}

function FillSettingsForm() {
  var settings = SettingsFromCookie();
  el('vkm-check-interval').value = settings.check_interval / 1000;
  el('vkm-max-messages').value = settings.max_messages;
  el('vkm-enable-local-storage').checked = settings.enable_local_storage;
  el('vkm-thread-by-subject').value = settings.threading_by_subject;
  el('vkm-message-order').value = settings.message_order;
}

function LoadCached(thread_list, cached, start, done_cb) {
  for (var i = start; i < cached.length && i < start + 300; i++) {
    var message = new Message();
    message.FromString(cached[i]);
    thread_list.AddMessage(message, true /* no_cache */);
    if (message.IsDraft()) {
      var num_id = parseInt(message.id);
      if (num_id >= NEXT_DRAFT_ID) NEXT_DRAFT_ID = num_id + 1;
    }
  }
  GM_log('Loaded ' + i + ' of ' + cached.length);
  if (i == cached.length) {
    done_cb();
  } else {
    setTimeout(function(){LoadCached(thread_list, cached, i, done_cb)}, 50);
  }
}

///////////////////////////
// Global initialization //
///////////////////////////

// Browsers that support localStorage get higher default message limit
DEFAULT_SETTINGS.max_messages = unsafeWindow.localStorage ? 500 : 100;

var settings = SettingsFromCookie();

// One global fetcher that will be used everywhere to apply throttling globally
FETCHER = new URLFetcher();

// Rewrite the header
var header = el('header');
header.style.height = 25;
header.innerHTML = 
    '<a href="http://userscripts.org/scripts/show/58463">VKMail</a> ' +
    '<a id="vkm-update-now" href="#update-vkmail">' + SCRIPT_VERSION + '</a>' +
    '<span style="float: right;">' +
    '[<span title="Сообщений: непрочитанных/полученных+отправленных" ' +
    'id=vkm-local-stats>0/0-0</span>|' +
    '<span title="На сервере: непрочитанных/полученных+отправленных" ' +
    'id=vkm-server-stats>0/0-0</span>] ' +
    '[<a href="#settings">настройки</a>] ' +
    '[<a href="#check-mail-now" id=vkm-check-mail-now>проверить почту</a>] ' +
    '<img id="vkm-working" src="/images/upload.gif" width=32 height=8 ' +
    'style="visibility: hidden"></span>';
var spin = el('vkm-working');
spin.setAttribute('refcount', 0);

// Prepare local storage
var dummy_cache = new DummyCache();
var local_cache =
    unsafeWindow.localStorage ?
    new LocalCache(unsafeWindow.localStorage, 'vkmail/messages') : dummy_cache;
var message_cache =
    settings.enable_local_storage ? local_cache : dummy_cache;
local_cache.Init(STORAGE_FORMAT_VERSION);

var thread_list_view = document.createElement('span');
var thread_view = document.createElement('span');
var settings_view = document.createElement('span');
var local_stats_view = el('vkm-local-stats');
var server_stats_view = el('vkm-server-stats');
settings_view.innerHTML =
    '<table class=enclosing-table>' +
    '<tr><td class=settings-col-left>Проверять наличие новых сообщений</td>' +
    '<td class=settings-col-right><select id=vkm-check-interval>' +
    '<option value=0>только вручную</option>' +
    '<option value=60>каждую минуту</option>' +
    '<option value=120>каждые 2 минуты</option>' +
    '<option value=300>каждые 5 минут</option>' +
    '<option value=600>каждые 10 минут</option></select><br>' +
    '* При проверке ваш статус может стать "Online"</td></tr>\n' +
    '<tr><td class=settings-col-left>' +
    'Максимальное число скачиваемых сообщений</td>' +
    '<td class=settings-col-right>' +
    '<input type=text id=vkm-max-messages size=5>' +
    '<br>* Пустое значение или 0 - скачивать все имеющиеся. ' +
    'Для повышения эффективности значение округляется вверх ' +
    'до ближайшего кратного&nbsp;' + MESSAGES_PER_PAGE + '. ' +
    'При использовании локального хранилища, число ' +
    'хранимых сообщений может превышать установленное значение.</td></tr>' +
    '<tr><td class=settings-col-left>Хранить сообщения локально</td>' +
    '<td class=settings-col-right>' +
    '<input type=checkbox id=vkm-enable-local-storage' +
    ' style="vertical-align: middle">' +
    '(<a href="#" id=vkm-clear-local-cache>удалить имеющиеся</a>)</td>' +
    '<tr><td class=settings-col-left>' +
    'Объединять сообщения в цепочки</td>' +
    '<td class=settings-col-right><select id=vkm-thread-by-subject>' +
    '<option value="false">по отправителю (адресату)</option>' +
    '<option value="true">по отправителю (адресату) и теме сообщения</option>' +
    '</select></td></tr>' +
    '<tr><td class=settings-col-left>' +
    'При отображении цепочек показывать более новые сообщения</td>' +
    '<td class=settings-col-right><select id=vkm-message-order>' +
    '<option value="newest-first">вверху</option>' +
    '<option value="oldest-first">внизу</option></select></td></tr>' +
    '<tr><td class=apply-settings-col colspan=2> ' +
    '<input type=button id=vkm-apply-settings value="Применить"> ' +
    '<input type=button value="Вернуться" onclick="history.go(-1)"></td></tr>' +
    '</table>';
settings_view.style.display = 'none';

var user_watcher = new UserWatcher(settings.check_interval);

var thread_list = new ThreadList(
    thread_list_view, thread_view, message_cache,
    settings.message_order, settings.threading_by_subject,
    user_watcher);
var cached = message_cache.GetMatchingItems('msg/');
GM_log(cached.length + ' messages in local cache.');

var inbox_watcher = new InboxWatcher(
    thread_list, settings.max_messages, message_cache, user_watcher);
var sent_watcher = new SentWatcher(
    thread_list, settings.max_messages, message_cache, user_watcher);

// Save message list before we clear it
var page_one = document.getElementsByTagName('body')[0].innerHTML;
inbox_watcher._ParseUnreadCount(document);

LoadCached(
    thread_list, cached, 0,
    function() {
      inbox_watcher.StartCycle(page_one);
      sent_watcher.StartCycle(null);
      user_watcher.StartFetch();
    });

// Clear message pane and plug in our main widgets.
// This has to be done after starting InboxWatcher because it needs to parse
// the page before we clear it
var message_pane = GetMessagePane(document);
message_pane.innerHTML =
    '<style>\
        .enclosing-table {\
          width: 100%;\
          border-spacing: 0px 1px;\
          margin: 0px;\
        }\
        .expander-col {\
          width: 1%;\
          font-size: 1.5em;\
          border-left: 1px solid #DAE1E8;\
          border-top: 1px solid #DAE1E8;\
          border-bottom: 1px solid #DAE1E8;\
        }\
        .expander-dummy {\
          width: 1%;\
          border-left: 1px solid #DAE1E8;\
        }\
        .avatar-col {\
          width: 10%;\
          border-style: none;\
          border-top: 1px solid #DAE1E8;\
          border-bottom: 1px solid #DAE1E8;\
          padding-bottom: 0px;\
        }\
        .name-col, .wide-name-col {\
          border-style: none;\
          border-top: 1px solid #DAE1E8;\
          border-bottom: 1px solid #DAE1E8;\
          padding: 6px;\
        }\
        .name-col { width: 20%; }\
        .wide-name-col { }\
        .online-div { color: #AAAAAA;\ font-weight: normal; }\
        .subject-col {\
          border-style: none;\
          border-top: 1px solid #DAE1E8;\
          border-bottom: 1px solid #DAE1E8;\
          padding: 6px 0px 6px 6px;\
        }\
        .timestamp-col {\
          width: 10%;\
          border-style: none;\
          border-right: 1px solid #DAE1E8;\
          border-top: 1px solid #DAE1E8;\
          border-bottom: 1px solid #DAE1E8;\
          padding: 6px 7px 6px 0px;\
          text-align: right;\
        }\
        .timestamp-div { position: relative; width: 100%; }\
        .timestamp-span {\
          width: 100%;\
          position: absolute; top: 50%; height: 2em; margin-top: -1em;\
        }\
        .expanded-thread-div {\
          margin-left: 20px;\
          max-height: 200px;\
          overflow: auto;\
        }\
        .msg-div { position: relative; z-index: 0; padding: 5px; }\
        div[class="msg-div"]:hover span[class="floating-form"] {\
          visibility: visible;\
        }\
        table[class="enclosing-table"] tbody tr:hover td\
            span span[class="floating-form"] {\
          visibility: visible;\
        }\
        table[class="enclosing-table"] tbody tr:hover td\
            span input[class=~"vkm-reply-button"] {\
          visibility: visible;\
        }\
        table[class="enclosing-table"] tbody tr:hover td\
            span[class="combined-cell-container"] input {\
          visibility: visible;\
        }\
        .combined-cell-container {\
          position: relative;\
          width: 100%;\
        }\
        .combined-cell-text-right {\
          position: absolute;\
          bottom: -0.5em;\
          z-index: -1;\
          right: 0;\
        }\
        .floating-form {\
          visibility: hidden;\
          position: absolute;\
          opacity: 0.8;\
          bottom: 0;\
          right: 0;\
          z-index: 1;\
        }\
        .vkm-invisible-and-on-top {\
          visibility: hidden;\
          opacity: 0.8;\
          z-index: 1;\
        }\
        .vkm-button { margin-left: 1px; }\
        .vkm-reply-button { margin-bottom: -4px; }\
        .vkm-delete-thread-button { margin-right: -4px; }\
        .vkm-delete-message-button { margin-right: -2px; }\
        .reply-form-col {\
          border: 1px solid #DAE1E8;\
          text-align: right;\
        }\
        .reply-form {\
          position: relative;\
          margin: 0px;\
          padding-right: 2px;\
        }\
        .reply-textarea {\
          margin: 0px;\
          padding: 0px;\
          margin-bottom: 1px;\
          width: 100%;\
          height: 100px;\
        }\
        .msg-timestamp {\
          dwidth: 10%;\
          text-align: right;\
          position: relative;\
          float: right;\
          border-left: 1px solid #DAE1E8;\
          border-bottom: 1px solid #DAE1E8;\
        }\
        .send-btn {\
          position: relative;\
          float: right;\
          padding: 2px;\
          border-left: 1px solid #DAE1E8;\
          border-bottom: 1px solid #DAE1E8;\
        }\
        .expanded-thread {\
          border-right: 1px solid #DAE1E8;\
          padding-bottom: 0px;\
        }\
        .expanded-thread-left-spacer { width: 30px; }\
        .msg-recv { background-color: #F0F0F0; }\
        .msg-sent { background-color: #FFFFFF; }\
        .msg-col { border: 1px solid #DAE1E8; }\
        .msg-col-draft { border: 1px dashed #DAE1E8; }\
        .msg-col-unread-sent { border: 2px dashed #DAE1E8; }\
        .exclusive-reply-button { float: right; }\
        .settings-col-left {\
          width: 30%;\
          vertical-align: top;\
          border-left: 1px solid;\
          border-top: 1px solid;\
          border-right: 1px dashed;\
          border-bottom: 1px solid;\
          border-color: #DAE1E8;\
          padding-right: 0px;\
        }\
        .settings-col-right {\
          vertical-align: top;\
          border-left: 0px;\
          border-top: 1px solid;\
          border-right: 1px solid;\
          border-bottom: 1px solid;\
          border-color: #DAE1E8;\
          padding-left: 2px;\
        }\
        .settings-col-right { vertical-align: top; }\
        .apply-settings-col {\
          text-align: center;\
          border: 1px solid #DAE1E8;\
        }\
      </style>';
message_pane.appendChild(thread_list_view);
message_pane.appendChild(thread_view);
message_pane.appendChild(settings_view);

// Start event dispatcher
var dispatcher = new Dispatcher(
    thread_list,
    thread_list_view, thread_view, settings_view,
    inbox_watcher, sent_watcher,
    local_stats_view, server_stats_view);
dispatcher.Dispatch();  // Kick off the dispatcher
window.dispatcher = dispatcher;

// Wire controls to handlers
AddFinalOnClickHandler(
    el('vkm-check-mail-now'),
    function() {
      inbox_watcher.StartCycle();
      sent_watcher.StartCycle();
      user_watcher.StartFetch();
    });
AddFinalOnClickHandler(
    el('vkm-update-now'), function(){CheckForUpdate(true)});
AddFinalOnClickHandler(
    el('vkm-apply-settings'), function() {ApplySettings(true)});
AddFinalOnClickHandler(
    el('vkm-clear-local-cache'),
    function() {
      local_cache.Init(STORAGE_FORMAT_VERSION, true);
      local_cache.BarrierClosure(
        function(){alert('Локальный кеш сообщений очищен.')});
    });
// Apply initial settings
FillSettingsForm();
ApplySettings(false);

setInterval(CheckForUpdate, UPDATE_CHECK_INTERVAL);

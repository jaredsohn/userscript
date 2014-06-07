// version 1.0
// 2010-11-07
// Copyright (c) 2010, Christian Angermann
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Github - Basecamp | Show task description to commit message
// @namespace      http://*.github.com
// @description    Shows the relationship between commit to Basecamp todo task. The identifier number of basecamphd.com todo have to be specified in the git-commit messages todo. Example: "74236587: Added some specials" 
// @include        https://github.com/*
// @include        http://github.com/*
// @exclude        http://github.com/*/*/raw/*
// @exclude        https://github.com/*/*/raw/*
// ==/UserScript==

// helper/utilities
var dom = function (selector) {
  return document.querySelectorAll(selector);
};

var get_data = function () {
  return {
    prefix: localStorage.getItem('gm_prefix') || '',
    suffix: localStorage.getItem('gm_suffix') || '',
    key: localStorage.getItem('gm_key') || '',
    account: localStorage.getItem('gm_account') || ''
  };
};

var AUTH_KEY = '';

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(c){var a="";var k,h,f,j,g,e,d;var b=0;c=Base64._utf8_encode(c);while(b<c.length){k=c.charCodeAt(b++);h=c.charCodeAt(b++);f=c.charCodeAt(b++);j=k>>2;g=((k&3)<<4)|(h>>4);e=((h&15)<<2)|(f>>6);d=f&63;if(isNaN(h)){e=d=64}else{if(isNaN(f)){d=64}}a=a+this._keyStr.charAt(j)+this._keyStr.charAt(g)+this._keyStr.charAt(e)+this._keyStr.charAt(d)}return a},decode:function(c){var a="";var k,h,f;var j,g,e,d;var b=0;c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(b<c.length){j=this._keyStr.indexOf(c.charAt(b++));g=this._keyStr.indexOf(c.charAt(b++));e=this._keyStr.indexOf(c.charAt(b++));d=this._keyStr.indexOf(c.charAt(b++));k=(j<<2)|(g>>4);h=((g&15)<<4)|(e>>2);f=((e&3)<<6)|d;a=a+String.fromCharCode(k);if(e!=64){a=a+String.fromCharCode(h)}if(d!=64){a=a+String.fromCharCode(f)}}a=Base64._utf8_decode(a);return a},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");var a="";for(var e=0;e<b.length;e++){var d=b.charCodeAt(e);if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);a+=String.fromCharCode(((d>>6)&63)|128);a+=String.fromCharCode((d&63)|128)}}}return a},_utf8_decode:function(a){var b="";var d=0;var e=c1=c2=0;while(d<a.length){e=a.charCodeAt(d);if(e<128){b+=String.fromCharCode(e);d++}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);b+=String.fromCharCode(((e&31)<<6)|(c2&63));d+=2}else{c2=a.charCodeAt(d+1);c3=a.charCodeAt(d+2);b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));d+=3}}}return b}};


//
// ======================= update commit message =============================
//
var update = function () {
  var messages = dom('#commit .message a'),
    messages = messages.length > 0 ? messages : dom('#commit .message pre'),
    data = get_data(),
    key = '\\d{8}',
    pattern = new RegExp(data.prefix + key + data.suffix, 'ig');
    
  for (var d = messages.length-1; d >= 0; d--) {
    var elem = messages[d],
      basecamp_url = 'https://' + data.account +'.basecamphq.com/todo_items/',
      parent = !!elem.parentNode && elem.parentNode, 
      txt = '';
      
    if (parent) {
      if (parent.getAttribute('data-origin') == null) {
        parent.setAttribute('data-origin', parent.innerHTML);
      } else {
        parent.innerHTML = parent.getAttribute('data-origin');
      }
      txt = parent.firstChild.innerHTML;
    }
   
    if (txt.match(pattern)) {
      var id = txt.match(pattern)[0],
      raw_id = id.match(/\d{8}/)[0],
      raw_message = txt.replace(pattern, ''),
      tooltip = '';
      
      if (data.key != '') {
        tooltip = '<span class="task">' +
          '<span></span>' +
          '<strong class="userbox" id="gm_task_' + raw_id + '">&nbsp;</strong>' +
        '</span>';
        http_request('https://' + data.account +'.basecamphq.com/todo_items/' + raw_id, function(response) {
          document.getElementById('gm_task_' + raw_id).innerHTML = response.responseXML.getElementsByTagName('content')[0].firstChild.nodeValue;
        });
      }
      
      parent.innerHTML = (elem.href ? '' : '<pre>') + 
        '<a target="_blank" style="color:#4183C4;" href="' + basecamp_url + raw_id + '/comments">' + id + tooltip + '</a>' +
        (elem.href ? '<a href="' + elem.href + '">' + raw_message + '</a>' : raw_message + '</pre>');
    }
  }
  
};
var http_request = function (url, callback) {
  var data = get_data();

  if(AUTH_KEY == ''){
    AUTH_KEY = Base64.encode(data.key + ":x");
  }
  
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
      'Accept': 'application/atom+xml,application/xml,text/xml',
      "Authorization": "Basic " + AUTH_KEY
    },
    onload: function (response) {
      if (!response.responseXML) {
        response.responseXML = new DOMParser()
          .parseFromString(response.responseText, "text/xml");
      }
      callback.call(this, response);
    }
  });
};

var timeout_id = 0;

var show_complete_label = function () {
  var style = dom('#gm_basecamp .form-actions .success')[0].style;
  style.visibility = 'visible';
  clearTimeout(timeout_id);
  timeout_id = setTimeout(function () {
    style.visibility = '';
  }, 2000);
};

//
// ============================= data settings ===============================
//
var data = get_data(),
  form = document.createElement('div');

form.id = 'gm_basecamp';
form.innerHTML = '<div class="content userbox">' +
    '<div class="add-pill-form">' +
      '<h3>github</h3>' +
      '<dl>' +
        '<dt><label for="gm_prefix">Prefix</label></dt>'+
        '<dd>' + 
          '<input id="gm_prefix" class="short" type="text" value="' + data.prefix + '" />' +
          '<small>&nbsp;</small>' +
        '</dd>' +
        '<dt><label for="gm_suffix">Suffix</label></dt>' +
        '<dd><input id="gm_suffix" class="short" type="text" value="' + data.suffix + '" /></dd>' +
      '</dl>' +
    '</div>' +
    '<div class="add-pill-form">' +
      '<h3>basecamp</h3>' +
      '<dl>' +
        '<dt><label for="gm_account">Account</label></dt>' +
        '<dd>' +
          '<input id="gm_account" class="short" type="text" value="' + data.account + '" />' +
          '<small><strong>Example:</strong> https://ACCOUNT.basecamphd.com</small>' +
        '</dd>' +
        '<dt><label for="gm_key">API token</label></dt>' +
        '<dd><input id="gm_key" class="short" type="text" value="' + data.key + '" /></dd>' +
      '</dl>' +
    '</div>' +
    '<div class="form-actions">' +
      '<span class="success">✓ saved</span>' +
      '<a href="#submit" class="submit button classy"><span>Save</span></a>' +
    '</div>' +
  '</div>' + 
  '<a href="#" class="toggle userbox">Settings ' +
    '<span class="open">open</span>' +
    '<span class="close">close</span>' +
  '</a>';
document.body.appendChild(form);

var styles = "#gm_basecamp {position:absolute;right:1em;top:0;z-index:3}";
styles += "#gm_basecamp .add-pill-form{width:330px}";
styles += "#gm_basecamp small{color:#777}";
styles += "#gm_basecamp .add-pill-form:first-child{width:70px;margin-right:5px}";
styles += "#gm_basecamp .add-pill-form input[type=text]{width: 100%}";
styles += "#gm_basecamp .add-pill-form dl{padding-right:16px}";
styles += "#gm_basecamp .content {float:none;padding:0 10px 10px;-moz-border-radius-bottomright:0;-webkit-border-radius-bottom-right:0}";
styles += "#gm_basecamp .content > div{display:inline-block}";
styles += "#gm_basecamp .content .form-actions{display:block}";
styles += "#gm_basecamp .content .form-actions a{height:24px}";
styles += "#gm_basecamp .content .form-actions a span{height:24px;line-height:26px}";
styles += "#gm_basecamp .content .form-actions .success{line-height:26px;visibility:hidden}";
styles += "#gm_basecamp h3{margin:0 0 .2em}";
styles += "#gm_basecamp .toggle {background: #ECECEC; margin-top:-1px; padding:5px 8px 0}";
styles += "#gm_basecamp.collapsed .content{display:none}";
styles += "#gm_basecamp.collapsed .open{display:inline}";
styles += "#gm_basecamp.collapsed .close{display:none}";
styles += "#gm_basecamp .open{display:none}";
styles += "#gm_basecamp .close{display:inline}";
styles += ".commit .message pre{position:relative}";
styles += ".commit .message .task {display:none;position:absolute;top:15px;left:0; color:#777}";
styles += ".commit .message .task span{border:10px solid transparent;height:0;line-height:0;width: 0;border-bottom-color:#FCFCFC;margin-top:-10px;margin-left:25px;display:block}";
styles += ".commit .message .userbox {-moz-border-radius:5px;-webkit-border-radius:5px;font-weight:normal}";
styles += ".commit .message a:hover .task{display:block}";
GM_addStyle(styles);
//
// ================================ events ===================================
//
dom('#gm_basecamp .toggle')[0].addEventListener('click', function (event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopped = true;

  var classNames = form.getAttribute('class');
  if (/collapsed/.test(classNames))
    classNames = '';
  else 
    classNames = 'collapsed';
  form.setAttribute('class', classNames);
  localStorage.setItem('panel', classNames);
}, false);

dom('#gm_basecamp .submit')[0].addEventListener('click', function (event) {
  event.preventDefault();
  event.stopPropagation();
  event.stopped = true;
  show_complete_label();

  var inputs = dom('#gm_basecamp input[type=text]');
  for (var d = inputs.length-1; d >= 0; d--) {
    localStorage.setItem(inputs[d].id, inputs[d].value);
  }
  update();
}, false);
update();

// initial
if (localStorage.getItem('panel') == 'collapsed') {
  form.setAttribute('class', 'collapsed');
}
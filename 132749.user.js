// ==UserScript==
// @name           DSS S2 Target Highlighter
// @namespace      tag:dssrzs.org,2009-10-28:S2TH
// @description    Highlights Urban Dead characters listed in the Rogues Gallery and Zerg Liste
// @match          http://urbandead.com/map.cgi*
// @match          http://www.urbandead.com/map.cgi*
// @match          http://urbandead.com/contacts.cgi*
// @match          http://www.urbandead.com/contacts.cgi*
// ==/UserScript==

/**
 * The DSS S2 Target Highlighter
 *
 * Documentation pending.
 *
 * The author of this code wishes to remain somewhat anonymous, but
 * you can contact her as val@dssrzs.org, or as user Hashk in the
 * Urban Dead Wiki.
 *
 * LEGAL NOTICE: I, the anonymous author, but still very much the
 * copyright holder of this work, hereby release it into the public
 * domain. This applies worldwide. In case this is not legally
 * possible, I grant anyone the right to use this work for any
 * purpose, without any conditions, unless such conditions are
 * required by law.
 *
 * In plain English: do what you please with this code. May you have
 * fun with it, and live a long and happy life.
 **/

var UPDATE_INTERVAL = 21600;
var UPDATE_INTERVAL_AFTER_ERROR = 300;
var SERVICE_POINT = 'http://dssrzs.org/udtool.txt';

function trim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function parse_group(groups, group_array, s) {
  var a = s.split(',', 2);
  if(a.length < 2)
    return;

  var e = new Object();
  e.name = trim(a[1]);
  e.colour = trim(a[0]);
  e.index = group_array.length;
  groups[e.name] = e.index;
  group_array.push(e);
}

function parse_entry(groups, group_array, s, db) {
  var a = s.split(',');
  if(a.length < 2)
    return;
  var name = trim(a.shift());
  var group = trim(a.shift());
  var text = a.join(',');
  var g = groups[group];
  var c;
  if(g == undefined)
    c = '';
  else
    c = group_array[g].colour;

  var etext;
  if(text.length > 0)
    etext = c + ',' + group + ' - ' + text;
  else
    etext = c + ',' + group;

  db[name] = etext;
}

function parse_udtool(data) {
  var groups = new Object();
  var group_array = new Array();
  var db = new Object();

  var s;
  data = data.split("\n");
  for(var i = 0; i < data.length; i++) {
    s = trim(data[i]);
    if(s.length > 0) {
      if(s.charAt(0) == '#')
        parse_group(groups, group_array, s);
      else
        parse_entry(groups, group_array, s, db);
    }
  }

  return db;
}

function load_handler(response) {
  if(response.readyState != 4)
    return;

  if(response.status != 200) {
    if(!GM_getValue('__ERROR_NOTIFIED__')) {
      GM_setValue('__ERROR_NOTIFIED__', true);
      alert('DSS S2 Target Highlighter error: ' +
            response.status + ' ' + response.statusText);
    }
    return;
  }

  //GM_log('RECV:'+response.responseText);

  for each (var val in GM_listValues()) {
    GM_deleteValue(val);
  }

  var now = Math.floor(new Date().getTime() / 1000);
  GM_setValue('__NEXT_UPDATE__', now + UPDATE_INTERVAL);
  var db = parse_udtool(response.responseText);
  GM_setValue('__DB__', uneval(db));
}

function update(now) {
  GM_xmlhttpRequest(
    {
      method: 'GET',
      url: SERVICE_POINT,
      onload: load_handler
    }
  );
}

function highlight_anchor(node, colour, text) {
  if(colour) {
    if(!(node.getAttribute('class') ||
         node.parentNode.parentNode.getAttribute('class') == 'cp'))
      node.style.color = colour;
  }

  if(text)
    node.title = text;
}

function check_anchor(db, node) {
  var name = node.textContent.replace(/&nbsp;/g, ' ').replace(/\s\s*/g, ' ');
  var etext = db[name];

  if(etext) {
    var colour, text, a;
    a = etext.split(',');
    if(a.length > 0) {
      if(a[0].length > 0)
        colour = a.shift();
      var t = a.join(',');
      if(t.length > 0)
        text = t;
    }

    if(colour || text)
      highlight_anchor(node, colour, text);
  }
}

function highlight_targets() {

  // I. Update the local DB if needed

  var next_update = parseInt(GM_getValue('__NEXT_UPDATE__'));
  if(isNaN(next_update))
    next_update = 0;
  var now = Math.floor(new Date().getTime() / 1000);

  if(now >= next_update) {
    // this may be reset by an actual update
    GM_setValue('__NEXT_UPDATE__', now + UPDATE_INTERVAL_AFTER_ERROR);
    update(now);
  }

  // II. Highlight

  var db = eval(GM_getValue('__DB__'));
  var pattern = /profile\.cgi\?id=\d+$/;
  var as = document.getElementsByTagName('a');
  var i, a, end = as.length;
  for(i = 0; i < end; i++) {
    a = as[i];
    if(pattern.test(a.getAttribute('href')))
      check_anchor(db, a);
  }
}

highlight_targets();
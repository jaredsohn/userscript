// ==UserScript==
// @name           Linkifier
// @namespace      http://xph.us/software/
// @description    Linkify Pages
// ==/UserScript==

// Here are some examples to get you started. Edit this to suit your needs.
LINK_PATTERNS = [
  [/\bgit cs ([0-9a-fA-F]+)\b/,
   function(g, ck){return['http://git/?url=beanstalkd/commit/&id='+ck,g]}],
  [/\b(\S+) cs ([0-9a-fA-F]+)\b/,
   function(g, rn, ck){return['http://git/?url='+rn+'/commit/&id='+ck,g]}],
  [/\b(\S+):([0-9a-fA-F]+)\b/,
   function(g, rn, ck){return['http://git/?url='+rn+'/commit/&id='+ck,g]}],
]

EXCLUDE = ['a', 'textarea']

function repat()
{
  return '(?=' +
      map(function(p){return p[0].source}, LINK_PATTERNS).join('|') +
      ')';
}

function count_capture_groups(re)
{
  var m = re.source.match(/(^|[^\\])\([^\?]/g);
  if (m == null) return 0;
  return m.length;
}

var cut_re = new RegExp(repat());
var cut_cg_count = count_capture_groups(cut_re);

function map(f, col)
{
  var len = col.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = f(col[i]);
  }
  return res;
}

function add(elem, child)
{
  if (typeof child != 'object') child = document.createTextNode(child);
  elem.appendChild(child);
  return elem;
}

function make(tagn)
{
  var elem = document.createElement(tagn);
  for (var i = 1; i < arguments.length; i++) {
    add(elem, arguments[i]);
  }
  return elem;
}

function sa(elem, name, val)
{
  elem.setAttribute(name, val);
  return elem;
}

function linkify_chunk_for_pat(s, pat, urlg)
{
  //GM_log('linkifying chunk ' + s.toSource() + ' with ' + pat.toSource());
  var m = pat.exec(s);
  if (m == null) return null;
  info = urlg.apply(null, m);
  var a = sa(make('a', info[1]), 'href', info[0]);
  return make('span', a, s.substr(m[0].length));
}

function linkify_chunk(s)
{
  for (var i = 0; i < LINK_PATTERNS.length; i++) {
    var pat = LINK_PATTERNS[i][0];
    var urlg = LINK_PATTERNS[i][1];
    var res = linkify_chunk_for_pat(s, pat, urlg);
    if (res != null) return res;
  }
  return s;
}

function linkify_text(s)
{
  var r = s.split(cut_re);
  var parts = [];
  if (r.length == 1) return null;

  // The split method puts extra items in the result array if the regular
  // expression has capturing parens. Throw out the extras.
  for (var i = 0; i < r.length; i++) {
    if (i % (cut_cg_count + 1) == 0) parts.push(r[i]);
  }

  return make.apply(null, ['span'].concat(map(linkify_chunk, parts)));
}

function exclude(elem)
{
  var tn = elem.tagName;
  if (!tn) return false;
  tn = tn.toLowerCase();

  for (var i = 0; i < EXCLUDE.length; i++) {
    if (tn == EXCLUDE[i]) return true;
  }

  return false;
}

function linkify(elem)
{
  var newelem;

  if (elem.data) {
    newelem = linkify_text(elem.data);
    if (newelem) elem.parentNode.replaceChild(newelem, elem);
  }
  if (elem.hasChildNodes() && !exclude(elem)) map(linkify, elem.childNodes);
}

linkify(document);

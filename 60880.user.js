// ==UserScript==
// @name          Comics.com browser
// @namespace     http://github.com/johan/
// @description   Browses pre-cached comics.com comics via the keyboard
// @include       http://comics.com/*/*-*-*
// ==/UserScript==

var debug = !!this.lights_off; if (debug) unsafeWindow.cc = this;

var date_re = /(\d{4})-(\d\d)-(\d\d)/, dark = lights_off();
var urls  = [], last_seen   = 0, first_date = comic_date(), per_page = 10;
var cache = [], last_cached = 0, cache_size = 10; // # of images to preload

init();

// most likely to need updates -- takes a dom and returns [img urls here]
function get_urls(dom) {
  function get_url(img) { return img.src.replace('full.gif', 'zoom.gif'); }
  return fill_cache($x('.//a[@class="STR_StripImage"]/img', dom).map(get_url));
}


function init() {
  get_urls(document.body);
  show_comic(0);
  document.addEventListener("keypress", keypress, false);
}

function keypress(e) {
  var n = last_seen, url = base_url();
  if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
  switch (e.keyCode || String.fromCharCode(e.charCode)) {
    case 27:           /* log('Esc'); */ hide(); break;
    case 37: case 'j': /* log('<--'); */ prev(); break;
    case 39: case 'k': /* log('-->'); */ next(); break;
             case 't': GM_openInTab(urls[n]+ '#'+ n +': '+ ymd(n)); break;
             case 'u': prompt('Comic permalink:', url + ymd(n) +'/#'+ n); break;
    default: log(e.keyCode ? e.keyCode :
                             "cc: " + String.fromCharCode(e.charCode));
  }
}

function log(msg) {
  debug && GM_log(msg);
}

function hide() {
  dark.style.display = dark.style.display ? "" : "none";
}

function next() {
  if (last_seen >= urls.length) return;
  show_comic(++last_seen);
}

function prev() {
  if (!last_seen) return;
  show_comic(--last_seen);
}

function img(src) {
  var i = document.createElement("img");
  i.src = src;
  log('Cached #'+ (last_cached-1) +': '+ src);
  return i;
}

function base_url() {
  var url = location.href;
  var path = location.pathname;
  var start = url.slice(0, url.indexOf(path) + 1);
  return start + path.split('/')[1] + '/';
}

// http://comics.com/<comic>/?DateAfter=<y-m-d>&Order=d.DateStrip+ASC&PerPage=10
function prefetch(n) {
  var d = ymd(add_days(n));
  get(base_url() +'?DateAfter='+ d +'&Order=d.DateStrip+ASC&PerPage='+ per_page,
      get_urls);
}

// appends new urls to urls variable and populates the image cache, as needed
function fill_cache(new_urls) {
  function is_new(url) {
    return -1 == urls.indexOf(url);
  }
  var first_unknown_comic = urls.length;
  if (new_urls) urls.push.apply(urls, new_urls = new_urls.filter(is_new));
  var cache_space_left = cache_size - cache.length;
  for (var i = 0; i <= cache_space_left; i++) {
    if (!urls[last_cached + 1]) return new_urls;
    cache.push(img(urls[last_cached++]));
  }
  if (first_unknown_comic == last_seen && urls.length > first_unknown_comic)
    show_comic(last_seen);
  return new_urls;
}

function show_comic(n) {
  function src(img) { return img.src; }
  var url = urls[n];
  dark.style.background = '#000 url("'+ url +'") 50% 50% no-repeat';
  location.hash = '#' + n +': '+ ymd(add_days(n));

  var cached = cache.map(src).indexOf(url);
  if (cached > -1) cache.splice(cached, 1); // uncache

  if ((urls.length - n) <= per_page) // prefetch more?
    prefetch(urls.length);
}

function comic_date() {
  var ymd = location.href.match(date_re).slice(1).map(Number);
  return new Date(ymd[0], ymd[1]-1, ymd[2], 12);
}

function add_days(n) {
  return new Date(first_date.getTime() + n * 864e5);
}

function ymd(d) {
  function z(n) { return n > 9 ? n : '0' + n; }
  if ("number" == typeof d) d = add_days(d);
  return [d.getFullYear(), z(d.getMonth() + 1), z(d.getDate())].join('-');
}

function lights_off() {
  var blind = document.createElement("div");
  var h = innerHeight;
  blind.style.cssText =
    "position:absolute; width:100%; left:0; top:-"+h+"px; height:"+(3*h)+"px;";
  return document.body.appendChild(blind);
}

function get(url, cb) {
  if ((get.ting = get.ting || {})[url]) return;
  get.ting[url] = true;
  log(url);
  var http = new XMLHttpRequest();
  http.onreadystatechange = function(res) {
    //console.count(url);
    if (this.readyState != 4) return;
    var dom = document.createElement("div");
    dom.innerHTML = this.responseText;
    cb(debug ? unsafeWindow.dom = dom : dom);
    delete get.ting[url];
  };
  http.open("GET", url, true);
  http.send(null);
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while ((next = got.iterateNext()))
	result.push( next );
      return result;
  }
}

(function () {
// ==UserScript==
// @name           kaskus xstripper
// @namespace      http://blog.krakenstein.net
// @description    kaskus.us AdsBusters PRO 2010
// @version        3.4
// @updateURL      https://userscripts.org/scripts/source/80871.meta.js
// @match          http://old.kaskus.co.id/*
// @run-at         document-start
// ==/UserScript==

function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function h(id,i){i=1;el=g(id);if(el!==null){if(!i)s(el,'display:none');
else(el.parentNode)?el.parentNode.removeChild(el):h(el);}}
function s(id,s){el=g(id);if(el!==null){el.setAttribute('style',s);}}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}
function mh(e,r,d){if(r&&g(r)==null)return;var l=c2(e,g(r));for(i=0;i<l.length;i++)h(l[i],d);}
function strip_b(e,x){for(i=0;i<x;i++)if(g(e))h(g(e).previousElementSibling);}
function strip_a(e,x){for(i=0;i<x;i++)if(g(e))h(g(e).firstElementChild);}

var gm_kaskus_stripper_class = ' gm_kaskus_sm_stripper';
var debug = false;
var pipe_id = debug ? 'b5992ed17663b02bf04e71a52ea344ec' : '55f4e74c26f5469ff90e2d7c26920f87';
var yodCont;
var setting = {
  //1: enable, 2: disable
  ONOFF: 1,
  skin: 'none',
  panel: 1,
  nostyle: 2,
  noimg: 2,
  norefresh: 2,
}
var interrupt = false;

const yodUpdate = {
  script_id : 80871,
  script_version : '3.4',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function IsJsonString(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

function readSetting() {
  var sett, str = getValue("xtripper");
  if (setts = IsJsonString(str)) {
    for (item in setts) {
      if (setts[item]) setting[item] = setts[item];
    }
  }
  saveSetting();
  return setting;
}

function saveSetting() {
  setValue("xtripper", JSON.stringify(setting));
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
  const s_Redir = false;
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  var NeedCheckUpdate = false;
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(unescape(itm.value.items[0].content).replace(/&lt;/g,\'<\').replace(/&gt;/g,\'>\').replace(/&amp;/g,\'&\'));}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      if (s_Redir) sSrc += '&redir=yes';
      s_gm.src = sSrc;
      el.appendChild(s_gm);

      NeedCheckUpdate = true;
    }
  }
  else {
    setValue(s_CheckUpdate, md);
  }

  return NeedCheckUpdate;
}

function hasClass(el, cn) {
  return (el.className + " ").indexOf(cn) >= 0;
}

function remAttr(el, attr) {
  return el.removeAttribute(attr);
}

function setAttribs(el, attribs) {
  if (attribs) for (var x in attribs) el.setAttribute(attribs[x][0], attribs[x][1]);
}

function setEvents(el, ev) {
  if (ev) for (var x in ev) el.addEventListener(ev[x][0], ev[x][1], false);
}

function createEl(tag, attribs, ev, parent) {
  var el = document.createElement(tag);
  setAttribs(el, attribs);
  setEvents(el, ev);
  if (parent) parent.appendChild(el);
  return el;
}

function createCBOpt(id, title, label, state) {
  var yodDiv = createEl('div',
      [
        ["class", "yodDivAdv"],
      ],
      null,
      yodCont
    );

  var lb = createEl('label', null, null, yodDiv);

  var cb = createEl('input',
      [
        ["id", id],
        ["type", "checkbox"],
        ["title", title],
      ],
      [
        ["click", checkOpt],
      ],
      lb
    );

  if (state) cb.setAttribute("checked", "checked");
  lb.appendChild(document.createTextNode(' ' + label));
}

function getSkins() {
  return setting['skin'];
}

function setSkins(s) {
  setting['skin'] = s;
  saveSetting();
}

function checkOpt() {
  setting[this.id] = this.checked ? 1 : 2;
  saveSetting();
  document.location.reload();
}

var winTitle, id_refresh, o_refresh, i_refresh = 0;

function hardRefresh() {
  i_refresh += 100;
  if (o_refresh >= i_refresh) { window.stop(); } else { clearInterval(id_refresh); }
}

function countRefresh() {
  i_refresh += 1000;
  var j = (o_refresh - i_refresh) / 1000;
  document.title = "(" + j + ") " + winTitle;
  if (j<=1) {
    window.stop();
    clearInterval(id_refresh);
    i_refresh = 0; o_refresh = 5000;
    document.title = winTitle;
    window.onbeforeunload = function() { id_refresh = window.setInterval(hardRefresh, 10); }
  }
}

function killRefresh() {
  // kill auto-refresh
  var refresh = c1(".//meta[contains(@http-equiv,'refresh')]", document.head);
  if (!refresh) return;
  winTitle = document.title;
  o_refresh = parseInt(refresh.content);
  if (o_refresh >= 100) {
    o_refresh = 10 * 1000;
    //o_refresh = o_refresh * 1000;
    id_refresh = window.setInterval(countRefresh, 1000);

    setTimeout(function(){createEl('meta',
      [
        ["http-equiv", "refresh"],
        ["content", ((o_refresh - i_refresh) / 1000)],
      ],
      null,
      document.head
    );}, 1000);
  }
}

function appendJS(tag, str, id, head, link) {
  var doctype, tag = tag.toLowerCase().trim();
  var isJS = false;
  switch(tag) {
    case 'script':
      doctype = 'text/javascript';
      isJS = true;
      break;
    case 'style':
      doctype = 'text/css';
      head = true;
      break;
    default:
      return;
  }

  var target, s_gm = document.createElement(tag);
  if (id) {
    if (document.getElementById(id)) return;
    else s_gm.id = id;
  }

  s_gm.type = doctype;

  if (link) s_gm.src = str;
  else s_gm.textContent = str;

  if (head) target = document.getElementsByTagName('head')[0];
  else if (document.body) target = document.body;

  if (target) target.appendChild(s_gm);
  return s_gm;
}

function normalizeLink(url) {
  url = unescape(url).replace(/(\*.*?\*)/, '').replace(/\*/, '');
  var a = document.createElement('a');
  a.href = url;
  var ra = a.hostname; var pa = a.pathname;
  a.hostname = a.hostname.replace(/[\.]{2,}/, '.');
  a.pathname = a.pathname.replace(/\*/, '');
  return url.replace(ra, a.hostname).replace(pa, a.pathname);
}

function toLink(reg, el, pre) {
  var links = c2(reg, el);
  for (i=0; i<links.length; i++) {
    var text;
    var s_new = /((ftp|https?)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/gmi;
    var s_old = '__TLINKSE$1TLINKSE__';
    if (pre) {
      if (text = links[i].innerText.trim())
        links[i].innerText = text.replace(s_new, s_old);
    } else {
      if (text = links[i].textContent)
        links[i].textContent = text.replace(s_new, s_old);
    }
  }
  el.innerHTML = el.innerHTML.
    replace(/(__TLINKSE(.*?)TLINKSE__)/gi, '<a class="replaced" title="kaskus-xstripper ; autoLink ; $2" target="_blank" href="$2">$2</a>').
    replace(/(<br>\s){3,}/gmi, '<br><br>').
    replace(/[\n]{3,}/g, '\n\n');
}

function checktoLink(el) {
  el.innerHTML = el.innerHTML
    .replace(/((\_|\-){1,}http|h(\_){1,}p|hxxp|h\*\*p)\:\/\//gi, "http://")
    .replace(/(http\:\/\/.*?(?:\/|\s|$)+)/gi, function(t) {
          return t.replace(/(\[dot\]+)/ig, ".").replace(/[\s\*\_\[\]]/ig, "");
        }
      );
  toLink('.//text()[not(ancestor::a)]', el);
}

function switchspoiler(el) {
  var t = g(el.getAttribute("data"));
  var d = t.style.display.toLowerCase();
  el.value = d == 'none' ? 'Hide' : 'Show';
  t.style.display = d == 'none'?'block' : 'none';
}

function switchspoilers(a) {
  var el = g(a.getAttribute("data"));
  var rel = a.getAttribute("rel");
  var show = rel !== 'Show' ? "Show" : "Hide";
  a.setAttribute("rel", show);
  a.innerHTML = (show + " All Spoilers");
  var spoilerarr = c2(".//div[contains(@class,'smallfont')]/input[@type='button' and @value='"+rel+"']", el);
  for (j = 0; j < spoilerarr.length; j++) {
    spoilerarr[j].click();
  }
  //var i = 0; do spoilerarr[i++].click(); while (i < spoilerarr.length);
}

function chk_cendollers() {
  var el = g("collapseobj_usercp_reputation");
  if (el) {
    var tid, id, row = c2(".//td[@class='alt1Active']", el);
    for (j = 0; j < row.length; j++) {
      if (!(tid = row[j].innerHTML.match(/p=(\d+)#/))) continue;
      if (!(id = row[j].id.replace(tid[1], "").replace(/([^\d]+)/, ""))) continue;
      row[j].innerHTML += ' [<a title="kaskus-xstripper ; find the giver" class="smallfont" href="http://www.kaskus.us/member.php?u=' + id + '" target="_blank">giver</a>]';
    }
  }
}

function switchyodNav2(id, el) {
  if (!el) el = g('yodNav');
  var clone = g('updown');
  var min = g('yodCont1');
  var lbl = "x";
  switch(id) {
    case 1:
      var target = g('nostyle');
      target = target.parentNode.parentNode;
      target.parentNode.insertBefore(clone, target);
      lbl += "-Stripper";
      break;
    case 2:
      min.appendChild(clone);
      break;
  }
  el.firstElementChild.innerText = lbl;
}

function switchyodNav() {
  var el = g('yodCont');
  var id = setting['panel'] !== 1 ? 1 : 2;
  var d = id == 1 ? 'block' : 'none';
  switchyodNav2(id);
  el.style.display = d;
  setting['panel'] = id;
  saveSetting();
}

function appendRunJS(fn) {
  var JSGlobal = "";
  var i = 0; do {
    JSGlobal += fn[i++].toString().replace(/^(function+)\s(\w+)(?=\W|\s)/i, '$2=$1') + "\n";
  }
  while (i < fn.length);
  appendJS("script", "(function(){\n" + JSGlobal + "})();", "yod_KaskusrunScript_Global", true);
}

var yod_KaskusrunScript = function() {
  r_setSkins = function() {
    var val = JSON.parse(localStorage.getItem("xtripper"));
    val['skin'] = this.value;
    localStorage.setItem("xtripper", JSON.stringify(val));
    document.location.reload();
  }

  r_getSkins = function() {
    var val = JSON.parse(localStorage.getItem("xtripper"));
    return val['skin'];
  }
}

const mycss = "\
.yodHide{display:none!important;}\
#yodSpace{background-color:transparent;color:white;height:25px;position:fixed;bottom:0px;\
left: 0;z-index:999999;text-align:center;font-size: 11px;}\
#yodNav{height:100%;color:orange;background-color:black;float:left;padding: 7px 0;margin-right:3px;}\
#yodNav span{padding:5px;}\
#yodCont,#yodCont1{height:100%;float:left;background-color:black;padding: 3px 0;}\
#yodCont label {color:white!important;width:auto!important}\
#yodTitleBar a, #yodTitleBar a:visited{color:yellow!important}#yodTitleBar a:hover{color:white!important}\
.yodDivAdv{padding:0 2px 0 4px;display:inline-table;vertical-align:middle;}\
.yodDivAdv span{padding:7px 2px 0;}\
.gm_kaskus_sm_stripper img {border:0!important;max-width:100px!important;max-height:100px;}\
#yodNav,#yodCont *,#yodCont1 * {cursor:pointer!important}\
td.imgbtnemu div:hover { cursor:pointer!important; border:1px solid #316ac5; margin: -1px; background: #c1d2ee; } td.imgbtnemu div:active { background: #98b5e2; }\
";

/*
GAF-QQRE 4.0
hateradio
http://userscripts.org/98693
*/

var Extra = {
  init : function (n) {
    //,'Strike'
    this.buttons=['Spoiler=title','Highlight','Thread=threadid','Post=postid','NoParse','AnchorName','AnchorURL','Vimeo','Youtube'];
    this.images=[];
    this.load(n || '001');
    if ((t = g('humanverify')) && (q = c1(".//label[@for='humanverify']"))) {
      q = q.innerHTML.replace(/^Hitung\:/i, "").replace(/\:/, "/").replace(/x/i, "*");
      if (a = q.match(/(\d+)\s([+\-\*\/]+)\s(\d+)\s?\=?/)) {
        h = eval(a[1]+a[2]+a[3]);
        t.value = h;
      }
    }
  },

  add: function() {
    var i = this.buttons.length-1, div, img, td;
    for (i; i >= 0; i--) {
      var rel, butt = this.buttons[i];
      if (rel = butt.match(/\=(.*)/)) rel = rel[1];
      else rel = "";
      title = butt.replace(/(\=.*$)/, "");

      div = createEl('div');

      img = createEl('span',
        [
          ["title", title],
          ["data-rel", rel],
        ],
        [
          ["click", this.bind(this.insert)],
        ],
        div
      );
      img.innerText = "[" + title.toUpperCase() + "]";

      /*if(this.opt){
        div.className = 'imagebutton';
        this.src.parentNode.insertBefore(div, this.src.nextSibling);
      } else {*/
        td = createEl('td', [["class", "imgbtnemu"]]);
        td.appendChild(div);
        this.src.parentNode.insertBefore(td, this.src.nextSibling);
      //}
    }
  },

  load: function(n) {
    if (!(this.obj = g('vB_Editor_' + n + '_textarea'))) return;
    var tbl, par = g('vB_Editor_' + n + '_cmd_underline');
    while (par.tagName !== 'TABLE') par = par.parentNode;
    tbl = createEl('table', null, null, par.parentNode);
    tbl.innerHTML = '<tbody><tr><td class="yodHide"><div id="yodExtraTarget"></div></td></tr></tbody>';
    this.src = g('yodExtraTarget').parentNode;
    var it = this;
    this.bind = function(m) { var temp = function(e) { m.apply(it,[e]); }; return temp; };
    this.add();
  },

  insert: function(evt) {
    var t = evt.target.title.toUpperCase(), start, end, pos, temp, rel;
    if(this.obj.selectionStart >= 0){
      start = this.obj.selectionStart || 0;
      end = this.obj.selectionEnd || 0;
      rel = evt.target.dataset.rel ? "=" + evt.target.dataset.rel : "";
      temp = this.obj.value.substr(0, start) + '[' + t + rel + ']' + this.obj.value.substr(start, end-start);
      pos = temp.length;
      this.obj.value = temp + '[/' + t + ']' + this.obj.value.substr(end, this.obj.value.length);
      this.obj.focus();
      start = start + 2 + t.length;
      this.obj.setSelectionRange(start, pos);
    }
  }
};


function rnd() {
  today = new Date();
  seed = today.getTime();
  seed = (seed * 9301 + 49297) % 233280;
  return seed / (233280.0);
}

function addSearch() {
}

function yodQR(el) {
}

function createPanel(el) {
  // Panel Main
  var yodSpace = createEl('div',
      [
        ["id", "yodSpace"],
      ]
    );

  // Panel Navigation
  var yodNav = createEl('div',
      [
        ["id", "yodNav"],
        ["title", "Show/Hide Panel"],
      ],
      [
        ["click", switchyodNav],
      ],
      yodSpace
    );
  yodNav.innerHTML = "<span></span>";

  var yodCont1 = createEl('div',
      [
        ["id", "yodCont1"],
      ],
      null,
      yodSpace
    );

  // Panel Container
  var id = setting['panel'] !== 2 ? 1 : 2;
  var d = id !== 2 ? 'block' : 'none';
  yodCont = createEl('div',
      [
        ["id", "yodCont"],
        ["style", 'display:' + d + ';'],
      ],
      null,
      yodSpace
    );
  yodCont.innerHTML = '<div id="yodTitleBar" class="yodDivAdv">(<a href="http://userscripts.org/' + yodUpdate['script_id'] + '" target="_blank" title="goto Script Page">v' + yodUpdate['script_version'] + '</a>)</div>';

  var v_ONOFF = setting['ONOFF'] !== 2 ? true : false;
  var c_ONOFF = v_ONOFF ? "" : " yodHide";

  // Plug - Switch ON-OFF xtripper!
  createCBOpt("ONOFF", "En/Disable this Script", "N|F", v_ONOFF);

  // Plug - Scroll Up/Down
  var yodDiv = createEl('div',
      [
        ["id", "updown"],
        ["class", "yodDivAdv"],
      ],
      null,
      yodCont
    );
  // Up
  var span = createEl('span',
      [
        ["title", "Scroll Top"],
      ],
      [
        ["click", function() {scroll(0, 0)}],
      ],
      yodDiv
    );
  span.innerHTML = '&uarr;';
  // Down
  var span = createEl('span',
      [
        ["title", "Scroll Bottom"],
      ],
      [
        ["click", function() {scroll(0, el.scrollHeight)}],
      ],
      yodDiv
    );
  span.innerHTML = '&darr;';

  //var v_lite = setting['lite'] !== 2 ? true : false;
  v_nostyle = setting['nostyle'] !== 2 ? true : false;
  v_noimg = setting['noimg'] !== 2 ? true : false;
  v_norefresh = setting['norefresh'] !== 2 ? true : false;

  // Plug - Text Lite Ver
  createCBOpt("nostyle", "Text Lite", "Nostyle", v_nostyle);

  // Plug - Image Lite Ver
  createCBOpt("noimg", "Image Lite", "NoImg", v_noimg);

  // Plug - Kill Refresh
  createCBOpt("norefresh", "Kill Auto Refresh", "NoRefresh", v_norefresh);

  // Inject to Page
  el.appendChild(yodSpace);
  switchyodNav2(id);
  // <-- Create Panel

  if (!v_ONOFF) return 1;
  if (v_norefresh) killRefresh();

  // --> Kaskus Skins
  var yodPipe_Kaskus = "yodPipe_Kaskus";
  var strJS = 'function go'+yodPipe_Kaskus+'(itm){if(itm.value.items.length){return eval(unescape(itm.value.items[0].content).replace(/&lt;/g,\'<\').replace(/&gt;/g,\'>\').replace(/&amp;/g,\'&\').replace(/&#92;/g,\'\\\\\'));}}';
  appendJS('script', strJS, 'go'+yodPipe_Kaskus);

  strJS = 'http://pipes.yahoo.com/pipes/pipe.run?_id='+ pipe_id;
  strJS += '&_render=json&_callback=go'+yodPipe_Kaskus;
  strJS += '&id=' + getSkins();
  if (debug) strJS += '&dbg=' + rnd();
  appendJS('script', strJS, yodPipe_Kaskus + "Skins", false, true);
  // <-- Kaskus Skins
}

function yodThread() {
  var el_arc = g('forum');    // archive.kaskus.us
  var el_posts = g('posts');  // universal thread posts
  var single_thread = null;   // single thread mode
  var td_cats = c1(".//td[contains(@class,'tcat')]");

  if (td_cats) single_thread = td_cats.innerHTML.match(/view single post/i);

  if (!single_thread) {
    strip_b('TextInfo', 2);
  }

  if (single_thread || el_posts || el_arc) {

    var obj;
    if (el_arc) {
      //h('exp');
      obj = c2(".//div[contains(@class,'pagetext')]");
    }
    else {
      obj = c2(".//td[contains(@class,'alt1')]");
      // destroy middle threads ads
      var ads_mids = c2(".//a[contains(@href, 'kad.kaskus.us')]", el_posts);
      for (var x in ads_mids) {
        var ads_mid = ads_mids[x];
        while (ads_mid.tagName !== 'DIV') ads_mid = ads_mid.parentNode;
        if (ads_mid) h(ads_mid);
      }
    }

    if(!obj) return 1;

    //yodQR();
    //addSearch();

    for (y = 0; y < obj.length; y++) {
      if (el_arc || obj[y].id.match('td_post_')) {
        obj[y].className += gm_kaskus_stripper_class;
        if (v_nostyle) obj[y].className += " v_nostyle";
        if (v_noimg) {
          obj[y].className += " v_noimg";
          obj[y].previousElementSibling.className += " v_noimg2";
        }
        checktoLink(obj[y]); // Convert text to link

        var sz, fontarr = c2(".//font", obj[y]);
        // Destroy lebay fonts size
        for (j = 0; j < fontarr.length; j++) {
          if (sz = fontarr[j].getAttribute("size")) {
            sz = parseInt(sz.replace(/([^\d]+)/, ""));
            if (sz >= 2) sz = 2;
            fontarr[j].size = sz;
          }
        }

        // Convert large image + smileys to smallest size
        if (!v_noimg) {
          var imgarr = c2(".//img", obj[y]);
          for (j = 0; j < imgarr.length; j++) {
            var imgPar;
            var img = imgarr[j];
            var imgrc = img.getAttribute("src");
            //img.className += gm_kaskus_stripper_class + " img_lite";
            if (hasClass(img, 'inlineimg') || imgrc.match('images/smilies') || imgrc.match('laymark')) {
              img.className += " img_lite";
            } else {
              // Force reduce GIF Anim
              if (imgrc.match(/\.gif/i)) img.className += " img_lite";
              if (imgPar = img.parentNode) {
                if (imgPar.nodeName == 'A') {
                  setAttribs(imgPar, [
                    ["class", imgPar.className + gm_kaskus_stripper_class],
                    ["target", "_blank"],
                    ["title", "kaskus-xstripper ; " + imgPar.href],
                  ]);
                } else {
                  var btn = createEl('a',
                      [
                        ["class", gm_kaskus_stripper_class],
                        ["href", imgrc],
                        ["target", "_blank"],
                        ["title", "kaskus-xstripper ; Click to enlarge"],
                      ]
                    );
                  btn.innerHTML = '<img class="' + img.className + '" alt="' + imgrc + ' (kaskus-xstripper ; replacement)" src="' + imgrc + '" />';
                  imgPar.replaceChild(btn, img);
                }

              }
            }
          }
        }

        // Convert external image link, reduce link fonts size
        var linkarr = c2(".//a", obj[y]);
        var rgx_spoiler = ".//div[contains(@class,'smallfont')]/input[@type='button' and @value='Show']";
        for (j = 0; j < linkarr.length; j++) {
          var ksks_link = linkarr[j];

          if (ksks_link.href && ksks_link.href.match(/kaskus\.co\.id/i) && !ksks_link.href.match(/0000000/))
            ksks_link.href = ksks_link.href
              .replace(/www\.kaskus\.co\.id/gi, "old.kaskus.co.id")
              .replace(/\/\/kaskus\.co\.id/gi, "//old.kaskus.co.id");

          // ignore if normalized
          if (hasClass(ksks_link, gm_kaskus_stripper_class)) continue;
          ksks_link.className += gm_kaskus_stripper_class;

          // Fix hijacked spoiler & link @test ; http://kask.us/7710877
          var spoilerarr = c2(rgx_spoiler, ksks_link);
          if (spoilerarr.length) {
            for (x = 0; x < spoilerarr.length; x++) {
              var truediv = c1(".//*", ksks_link);
              ksks_link.parentNode.replaceChild(truediv, ksks_link);
            }
            continue;
          }
          // Remove silly link event
          remAttr(ksks_link, 'onclick');

          // normalize scrumbled link
          ksks_link.textContent = normalizeLink(ksks_link.textContent);
          ksks_link.href = normalizeLink(ksks_link.href);
          if (hasClass(ksks_link, 'replaced')) ksks_link.title = 'kaskus-xstripper ; autoLink ; ' + ksks_link.href;

          if (!v_noimg) {
            if (ksks_link.href.toLowerCase().match(/http.*?\.(jpe?g|gif|png)(?:\?\w|)/i)) {
              var img = createEl('img',
                  [
                    ["src", ksks_link.href],
                  ]
                );
              var imgW = parseInt(img.width); var imgH = parseInt(img.height);
              //var flatS = (imgW > 1 && imgH > 1 && imgW <= 100 && imgH <= 100) ? (Math.abs(imgW) / 2) : 100;
              var flatS = ((imgW > 1 && imgH > 1) && (imgW <= 100 && imgH <= 100)) ? "img_lite" : "";
              ksks_link.innerHTML = '<img src="' + ksks_link.href + '" class="' + flatS + '" title="kaskus-xstripper ; Click to enlarge" alt="' + ksks_link.href + ' (kaskus-xstripper ; replacement)" />';
            }
          }
        }

        // Fix broken Spoiler Click event
        var spoilerarr = c2(rgx_spoiler, obj[y]);
        if (spoilerarr.length) {
          for (j = 0; j < spoilerarr.length; j++) {
            var truediv = spoilerarr[j];
            var r = "yod_" + parseInt(new Date().getTime())+"_"+j;
            truediv.parentNode.nextElementSibling.firstElementChild.id = r;
            remAttr(truediv, 'onclick');
            truediv.setAttribute("data", r);
            truediv.addEventListener("click", function(){switchspoiler(this);return false;}, false);
          }

          var parSpoiler, btnAllSpoiler;
          if (parSpoiler = obj[y].parentNode.parentNode) {
            if (btnAllSpoiler = c1('.//td[contains(@class,"thead")]/a[contains(@id,"postcount")]', parSpoiler)) {
              var btn = createEl('a',
                  [
                    ["href", "javascript:void(0);"],
                    ["title", "kaskus-xstripper ; Show/Hide Spoilers"],
                    ["rel", "Show"],
                    ["style", "padding-right:10px"],
                    ["data", obj[y].id],
                  ],
                  [
                    ["click", function(){switchspoilers(this);return false;}]
                  ]
                );
              btn.innerHTML = 'Show All Spoilers';
              btnAllSpoiler.parentNode.insertBefore(btn, btnAllSpoiler);
            }
          }
        }
      }
    }

    return 1;
  }
}

function illSticky() {
  if (interrupt) return;
  var el = g('inlinemodform') || g('currentPost') || g('poststop');
  if (el) {
    el.scrollIntoView();
  }
}

function doInterrupt() {
  interrupt = true;
  unregEv(["mousedown","keydown","scroll"], doInterrupt);
  unregEv(["load"], illSticky);
}

function regEv(ev, fn) {
  for (e in ev) window.addEventListener(ev[e], fn, false);
}

function unregEv(ev, fn) {
  for (e in ev) window.removeEventListener(ev[e], fn, false);
}

function starter() {
  if (!interrupt) regEv(["load"], illSticky);

  usoUpdate();

  readSetting();

  // Run direct Browser Script
  appendRunJS([g]);
  appendJS("script", "(" + yod_KaskusrunScript + ")();", "yod_KaskusrunScript", true);

  var el;
  var xxx = g('vbulletin_css') || g('modalboxPreCacheContainer');
  if (
    (!(el = document.body)) ||
    (!xxx) ||
    (g('yodSpace'))
  ) return;

  // Append x-stripper Stylesheet
  appendJS("style", mycss, "xtripper_css");

  // --> Create Panel
  createPanel(el);


  if (map = c1('.//map[contains(@id,"Map")]')) {
    map.innerHTML = map.innerHTML
      .replace(/www\.kaskus\.co\.id/gi, "old.kaskus.co.id")
      .replace(/\/\/kaskus\.co\.id/gi, "//old.kaskus.co.id");
  }

  if (!(yodThread())) {
    if (g('RightNya') && g('Middlenahome')) {
      if (el = g('exp')) {
        el.innerHTML = '<center>' + g('RightNya').firstElementChild.innerHTML + '</center>';
      }
    } else {
      //mh('.//iframe', 'content');
      //h(c1('.//div[contains(@class,"sgcontainer")]/div/div/iframe'));

      chk_cendollers();

      if (v_noimg) {
        // http://www.kaskus.us/group.php
        obj = c2(".//div[contains(@class,'sgicon')]");
        for (y = 0; y < obj.length; y++) {
          obj[y].className += " yodHide";
        }
      }
    }

    if(document.location.toString().match(/\b(?:newreply|editpost|newthread)\b/)){ // detect page
      Extra.init();
    }
  }

  // mass hide iframe
  mh('.//iframe');
}


// start INJECT
regEv(["mousedown","keydown","scroll"], doInterrupt);
window.addEventListener("DOMContentLoaded", starter, false);
})();
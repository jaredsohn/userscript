(function () {
// ==UserScript==
// @name           Test
// @namespace      http://erikofujiwara.blogspot.com
// @author         Test
// @description    Yang Make Maho, Problem?
// @version        1.2
// @updateURL      https://userscripts.org/scripts/source/131118.meta.js
// @match          http://twitter.com/*
// @match          https://twitter.com/*
// @run-at         document-start
// ==/UserScript==

function insertAfter(node,after){after.parentNode.insertBefore(node,after.nextSibling)}
function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);if (res.length) return res; return false;
}

const yodUpdate = {
  script_id : 131118,
  script_version : '1.2',
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

function o_debug(str) {
  if (!debug) return;
  console.log(str);
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
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
      //sSrc += '&redir=yes';
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

function addslashes(str) {
  return str.replace(/\\/g,'\\\\').replace(/\'/g,'\\\'').replace(/\"/g,'\\"').replace(/\0/g,'\\0');
}
function stripslashes(str) {
  return str.replace(/\\'/g,'\'').replace(/\\"/g,'"').replace(/\\0/g,'\0').replace(/\\\\/g,'\\');
}

function ytrim(s) {
  var str = '';
  if (!(str = s.toString().trim())) return str;
  var lines = str.replace(/^\s+|\s+$/g, '').split(/\s*\n\s*/);
  str = lines.join(' ').replace(/[\s]{2,}/g, ' ');
  return str;
}

function hasClass(el, cn) {
  return (el.className + " ").indexOf(cn) >= 0;
}

function yodFindParent(el, c, x) {
  var cc, is_class = (x.match(/class/i)) ? true : false;
  var par = el;
  try {cc = (is_class ? par.className : par.id).toString();}
  catch (err) {cc = "";}
  i = 10;
  var pattcontent = new RegExp(c, "gmi");
  while (i--) {
    try {
      if (cc.match(pattcontent)) {break;}
      par = par.parentNode;
      cc = (is_class ? par.className : par.id).toString();
    }
    catch (err) {continue;}
  }
  return par;
}

function addCS(str, id, css, link) {
  if (g(id)) return;
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement(css ? "style" : "script");
    if (id) node.id = id;
    node.type = css ? "text/css" : "text/javascript";
    if (link) node.src = str;
    else node.appendChild(document.createTextNode(str));
    heads[0].appendChild(node);
  }
}

function appendRunJS(fn) {
  var JSGlobal = "";
  var i = 0; do {
    JSGlobal += fn[i++].toString().replace(/^(function+)\s(\w+)(?=\W|\s)/i, '$2=$1') + "\n";
  }
  while (i < fn.length);
  addCS(JSGlobal, "yod_TradRT_Global");
}

function doyodGetBoolOpt(val, def) {
  var str = getValue(val);
  if (typeof str !== "string") {
    str = "";
    if (def) str = def;
    setValue(val, str);
  }
  return parseInt(str);
}

function doyodGetStrOpt(val, def) {
  var str = getValue(val);
  if (typeof str !== "string") str = "";
  str = str.trim();
  if (str.toString() === "?") return "";
  if (!str && def) str = def + "";
  return str.trim();
}

function yod_doRT(screen_name, content) {
  return function (e) {
    var gmbinder, s_gm = document.createElement('script');
    var s_gmbinder = 'yodgmbinder';
    var pattcontent = new RegExp("@" + my_screen_name, "gmi");
    content = escape(ytrim(deEntity(unescape(content))).replace(pattcontent, my_screen_name));
    s_gm.type = 'text/javascript'; s_gm.id = s_gmbinder;
    s_gm.innerHTML = "yodShowTweetBox('" + escape(ytrim(deEntity(unescape(screen_name)))) + "','" + content + "%yod%', '" + valRT + "');";
    document.body.appendChild(s_gm);
    doyodRTFit140(true);
    setTimeout(function(){
      if (gmbinder = g(s_gmbinder)) {
        document.body.removeChild(gmbinder);
      }
    }, 1000);
  }
}

function inject_button(target, link) {
  var b = document.createTextNode(link._label);

  var span = document.createElement('span');
  span.appendChild(b); //label

  var a = document.createElement('a');
  a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', link._title); a.className = "yodInjButt";
  if (link._class) a.className += " " + link._class;
  if (link._click) a.addEventListener('click', link._click, false);
  a.appendChild(span);

  var a2 = document.createElement('li');
  a2.appendChild(a);
  target.appendChild(a2);
}

function expand_link(el) {
  var links = c2('.//a[@data-expanded-url]', el);
  for (a in links) {
    var a1 = links[a].getAttribute('data-ultimate-url');
    var a2 = links[a].getAttribute('data-expanded-url');
    if (a1 || a2) links[a].innerHTML = a1 ? a1 : a2;
  }
}

function deEntity(str) {
  return str.replace(/<\/?[^>]+>/gi, '')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')/*
  .replace(/&#39;/gi, '\'')
  .replace(/"/gi, '')*/;
}

function translate_link(tt, shortlink) {
  var is_entity = tt.textContent.match(/(&lt|&gt|&amp|&quot|#[0-9]);/gi) ? true : false;
  yodRTDiv.innerHTML = tt.innerHTML;
  // collect links
  var links = c2(".//a[@data-expanded-url]", yodRTDiv);
  for (i=0; i<links.length; i++) {
    var link = links[i];
    var a1 = link.getAttribute('data-ultimate-url');
    var a2 = link.getAttribute('data-expanded-url');
    if (longURL = a1 || a2) {
      var newLink = document.createTextNode(shortlink? link.href : longURL);
      link.parentNode.replaceChild(newLink, link);
      link.href = longURL;
    }
  }

  var c = deEntity(unescape(yodRTDiv.innerHTML));
  yodRTDiv.innerHTML = "";
  if (is_entity) {
    tt.innerHTML = c;
    o_debug(tt.textContent);
  }
  return c;
}

function translate_link2(tt) {
  if (hasClass(tt, "yodDone2")) return;
    tt.className += " yodDone2";
    // collect links
    var links = c2('.//a[@data-expanded-url and not(contains(@class,"yodDone3"))]', tt);
    for (var i in links) {
      var link = links[i];
        setTimeout(function(){
          if (hasClass(link, "yodDone3")) return;
          var a1 = link.getAttribute('data-ultimate-url');
          var a2 = link.getAttribute('data-expanded-url');
          //o_debug(a2+' -> '+a1);
          if (a2) link.className += " yodDone3";
          if (longURL = a1 || a2) {
            link.href = link.title = longURL;
          }
        }, 2000);
    }
}

function facebookShare(url, txt, ava) {
  var title = summary = encodeURIComponent(txt.replace(/[\r\n]/, " ").replace(/\s{2,}/g, " "));
  var facebookLink = "http://www.facebook.com/sharer.php?s=100";
  var tl = '&p[title]='+title;
  var strUrl = '&p[url]='+encodeURIComponent(url);
  var strSummary = '&p[summary]='+summary;
  var stImage = "";
  if (ava) stImage = '&p[images][0]='+encodeURIComponent(ava);
  var shareUrl = facebookLink+tl+strUrl+strSummary+stImage;
  window.open(shareUrl);
}

function compareDate(e) {
  key = "data_item_id";
  var data_item_id = parseInt(e.getAttribute('data-item-id'));
  if (!data_item_id) return;
  val = doyodGetBoolOpt(key, 1);
  if (data_item_id > val) {
    setValue(key, data_item_id);
    return true;
  }
}

function yod_make_RT(entry, newtweet) {
  if (hasClass(entry, "yodDone")) return;
  // return if no Slave yodRTDiv
  if (!(yodRTDiv = c1('.//div[contains(@id,"yodRTDiv")]'))) return;

  // return if no Target
  var target;
  if (!(target = (
      c1('.//ul[contains(@class,"actions")]', entry) ||
      c1('.//span[contains(@class,"tweet-actions")]', entry)
    ))) return;

  // return if exist
  if (c1('.//a[contains(@class,"yod-old-style-retweet")]', entry)) return;

  // return if no tweet text
  var tt;
  if (!(tt = (
      c1('.//p[contains(@class,"js-tweet-text")]', entry) ||
      c1('.//div[contains(@class,"tweet-text")]', entry)
    ))) return;


  //var tts = tt.innerHTML.trim();
  //if (tts.match(/\r?\n/g)) tt.innerHTML = tts.replace(/\r?\n/g, "<br />");

  // screen name
  var hh, screen_name;
  if (multi_tweet = c1('.//div[contains(@class,"stream-item-content")]', entry)) {
    screen_name = multi_tweet.getAttribute('data-screen-name');
  } else { //tweet
    if (tweet = entry) {
      screen_name = tweet.getAttribute('data-screen-name');
    }
  }
  if (!screen_name) return;

  var img, ava;
  if (img = c1('.//img[contains(@class,"js-action-profile-avatar")]', entry)) {
    ava = img.src;
  }

  if (!hasClass(entry, "yodDone2")) {
    if (newtweet) newtweet = compareDate(entry);
    if (newtweet) {
      var data_mentions = entry.getAttribute('data-mentions') || "";
      o_debug(data_mentions);

      var pattcontent = new RegExp("\s?" + my_screen_name + "\s?", "gm");
      if (data_mentions.match(pattcontent)) {
        els = c2('.//*[contains(@class,"forme")]');
        for (var a in els) {
          els[a].className = els[a].className.replace(/forme/gm, '');
        }
        playsound();
        valMarkMention = doyodGetBoolOpt("yodMarkMention");
        if (valMarkMention) entry.className += "forme";
      }
    }

    entry.addEventListener('DOMSubtreeModified', function () {
      translate_link2(entry);
    }, false);
  }

  // add parsed class
  entry.className += " yodDone";

  // RT text
  var content = translate_link(tt);

  var link = {
    _class: 'yod-old-style-retweet',
    _click: yod_doRT(screen_name, content),
    _label: '#[RT]',
    _title: 'Traditional ReTweet'
  };

  inject_button(target, link);

  // Re RT text
  var content = translate_link(tt, true);

  // FB Share
  var fbURL, fbTitle = 'Twitter @' + screen_name + ' ; ' + content.trim();

  if (fbURL = (
    c1('.//a[contains(@class,"tweet-timestamp")]', entry) ||
    c1('.//a[contains(@class,"embed-link")]', entry) ||
    c1('.//a[contains(@class,"js-open-close-tweet")]', entry)
  )) {
    var fbURL1 = /*'http://www.facebook.com/sharer.php?u=' +*/ fbURL.href.replace(/\/#!/, '').replace(/\/embed$/, '');

    var link = {
      //_click: function(){window.open(fbURL1)},
      _click: function(){facebookShare(fbURL1, fbTitle, ava);return false;},
      _label: '#[FB]',
      _title: 'Facebook Share'
    };

    inject_button(target, link);
  }
}

function attachScroll(div, title, xchar, fn) {
  var el = document.createElement('div');
  el.textContent = xchar;
  el.setAttribute('style', 'height: 15px; width: 10px; float:left;');
  el.setAttribute('title', 'Scroll page to ' + title);
  el.addEventListener("click", fn, false);
  div.appendChild(el);
}

function doAdvTop() {
  if (logo = g("logo") || g("global-actions")) {
    div = document.createElement('div');
    div.id = 'yodAdvTop';
    var sClass = 'Hide';
    if (valAdvTop) {
      sClass = 'Show';
    }
    div.className = 'yod' + sClass;
    attachScroll(div, 'Top', '\u25B2', function(){scroll(0, 0);});
    attachScroll(div, 'Bottom', '\u25BC', function(){scroll(0, document.body.scrollHeight);});
    insertAfter(div, logo);

    // Extract DM
    if (dm = c1('.//a[contains(@class,"js-dm-dialog")]/span')) {
      var el = document.createElement('div');
      el.id = "yodmsg";
      el.innerHTML = dm.innerHTML;
      dm.addEventListener("DOMSubtreeModified", yod_extDM, true);
      insertAfter(el, div);
    }
  }
}

var yod_runScript_RT = function() {
  //var $;

  if (typeof jQuery !== 'undefined') {
    $ = jQuery;
  } else {
    using("core/jquery", function(x){$=x});
  }


  yodGetTweetBox = function() {
    return $("#yod_TweetBox");
  }

  yodcleanSpace = function(txt) {
    return txt.replace(/[\r\n]/, " ").replace(/\s{2,}/g, " ").trim();
  }

  yodHailTweetBox = function(txa, txt) {
    if (!txa) txa = yodGetTweetBox();
    else (txa = $("#"+txa));
    if (txa) {
      txa.focus().change();
      if (txt) txa.val(yodcleanSpace(deEntity(unescape(txt))));
    }
  }

  yodShowTweetBox = function(s,c,yodrt) {
    var content = "@" + s + ": " + yodcleanSpace(deEntity(unescape(c))).replace(/%yod%/ig, "");
    if (typeof twttr !== 'undefined') {
      new twttr.widget.TweetDialog({
        draggable:true,
        defaultContent:content,
        origin:"yod-Traditional-RT",
        template:{title:_("ReTweet @"+s+" (Trad. ReTweet)")}
      }).open().focus().change();

      setTimeout(function() {
        if (txa = yodGetTweetBox()) {
          txa.val(yodrt + " " + txa.val());
          yodHailTweetBox();
        }
      }, 3);
    } else {
      $("#global-new-tweet-button").click();

      var txa = $("#global-tweet-dialog .tweet-box:visible, #tweet_dialog .twitter-anywhere-tweet-box-editor:visible");
      txa.val(yodrt + " " + content);
      yodHailTweetBox();

      setTimeout(function() {
        txa.get(0).setSelectionRange(0, 0);
      }, 3);
    }
  }

  yodInsSmiley = function(el, text) {
    var txa;
    if (!(txa = yodGetTweetBox())) txa = $("#"+el);
    if (!txa) return false;
    if (!(txb = txa.get(0))) return false;
    if (txb.tagName !== "TEXTAREA") return false;
    if (text && txa) {
      var txt = " " + deEntity(unescape(text)) + " ";
      if (txb.selectionStart || txb.selectionStart == "0") {
        var startPos = txb.selectionStart; var endPos = txb.selectionEnd; var scrollTop = txb.scrollTop;
        txb.value = txb.value.substring(0, startPos) + txt + txb.value.substring(endPos, txb.value.length);
        txa.focus().change();
        txb.selectionStart = startPos + txt.length; txb.selectionEnd = startPos + txt.length;
        txb.scrollTop = scrollTop;
        yodHailTweetBox(txb.id);
      }
      return false;
    }
  }

  expandNewTweet = function(text) {
    if (typeof $ !== 'undefined') {
      $(text).click();
    }
  }
}

function starter() {
  if (g("yod_RT_CSS")) return;

  doAdvTop();

  appendRunJS([deEntity]);
  addCS("(" + yod_runScript_RT + ")();", "yodShowTweetBoxHeaderScript");

  const mycss = "\
.yodInjButt{margin-left: 5px!important;}\
.dm-dialog .twttr-dialog-inside, .dm-tweetbox {height:auto!important;}\
.dm-dialog .dm-tweetbox .tweet-box {padding: 0!important;height:auto!important;}\
.yodLegend legend{margin:auto!important;line-height:inherit!important;font-size:12px!important;font-weight:bold!important;text-align: center!important; padding: 0 5px!important; width: auto!important;border:none !important;}\
.yodLegend fieldset{border:none;}\
.yodLegend .tablex{font-size:11px!important;margin: 5px auto; width: 98%;}\
.yodLegend .tablex ul {text-align: center;}\
.yodLegend ul:not(:last-child) {margin-bottom:10px!important;}\
.yodLegend .tablex li {display: inline-block;cursor:pointer!important;min-width:15%;padding: 2px 0;}\
.yodLegend .tablex li:hover {font-size: 20px;font-weight: bold;}\
.yodLegend .tablex > div {display: inline-table; margin-right:5px}\
.yodLegend input {margin-right:5px;}\
.yodLegend label{margin:0!important;}\
.yodShow {display: block !important;}\
.yodHide {display: none !important;}\
.fShow {border-top:solid 1px #CCC !important;}\
.fHide {}\
#yodRTFit140Auto{margin-bottom: -5px;}\
#yodSpace{padding: 10px 20px 20px;text-align: center}\
#yodSpace > div:not(:first-child) {margin-top:10px}\
#yodSpace * {cursor:pointer}\
#yodSpace .btn {padding:2px 5px!important}\
#yodRTCopyLeft{font-size:11px; text-align: center;border-top: 1px solid #CCC;}\
#yodRTOption > div {display: inline-table; margin-right:5px}\
#ip_yodRTOpt_RTTxt {border:1px solid #CCC!important;width:50px!important;padding:0 3px!important}\
#yodRTDiv{display:none;overflow:hidden;}\
#yodmsg > span {\
font-weight: bold;float: right;min-width: 7px;padding: 0 9px;color: white;background-color: #58B3F0; margin:10px auto; border-radius: 9px;}\
span.geo-text{width:auto!important;}\
#yod_tw_id2 {background-color:black;color:white;padding:2px;}\
#yod_tw_id {color:red;}\
.yodSpace_ireply{padding: 5px 0 10px;}\
.yodSpace_ireply_wrapper{text-align: center;}\
.yodSpace_ireply_wrapper > div {display:inline-table;margin: 0 2px;}\
.forme {background-color: rgba(255,255,0,.3);}\
#yodAdvTop{color:#FFF;width: 10px; margin: 5px auto; padding-right: 5px; cursor: pointer; float: left;}\
";

  addCS(mycss, "yod_RT_CSS", 1);

  //create Slave
  yodRTDiv = document.createElement('div');
  yodRTDiv.id = 'yodRTDiv';
  document.body.appendChild(yodRTDiv);

  setTimeout(function() {
    if (el = c1('.//div[contains(@class,"permalink-tweet-container")]')) {
      watchreply(el);
    }
    yod_render(1);
  }, 5000);
}

function yod_userlists(el) {
  var json, a, els = c2('.//li', el.currentTarget);
  for (var a in els) {
    var e = els[a];
    if (!e.textContent) continue;
    if (hasClass(e, "yodDone")) continue;
    e.className += " yodDone";
    e.addEventListener("click", function(ev) {
      if (!(tw_id = ev.currentTarget.getAttribute('data-user-id'))) {
        if (json = ev.currentTarget.getAttribute('data-autocomplete')) {
          if (typeof json !== "string") return false;
          if (obj = JSON.parse(json))
            tw_id = obj.id;
        }
      }
      if (!tw_id) return false;
      if (ev.ctrlKey) location.href = "http://twitter.com/account/redirect_by_id?id=" + tw_id;
    }, true);
  }
}

function yod_render(newtweet) {
  els = c2('.//div[contains(@class,"js-actionable-tweet") and not(contains(@class,"yodDone"))]');
  for (a in els) {
    yod_make_RT(els[a], newtweet);
  }

  if (debug && (yod_frun <= 0)) {
    s = c1('.//div[contains(@class,"profile-card-inner")]');
    if (s && !(g('yod_tw_id'))) {
      if (tw_id = s.getAttribute('data-user-id')) {
        p = document.createElement('div');
        p.id = 'yod_tw_id';
        p.innerHTML = tw_id;
        s.appendChild(p);
      }
    }
  }

  if (!(els = c2('.//ul[contains(@class,"autocomplete-results")]')))
    els = c2('.//ul[contains(@class,"autocomplete-container")]');

  if (els) {
    for (var a in els) {
      var e = els[a];
      if (hasClass(e, "yodDone")) continue;
      e.className += " yodDone";
      e.addEventListener("DOMSubtreeModified", yod_userlists, true);
    }
  }
}

function yod_slideshow(e) {
  if (el = e.currentTarget) yod_make_RT(el.firstElementChild);
}

function yod_extDM(e) {
  var el, el2, yodmsg;
  if (el = e.currentTarget) {
    if (yodmsg = g("yodmsg")) {
      el2 = parseInt(el.textContent) || 0;
      yodmsg.innerHTML = "";
      yodmsg.appendChild(el.cloneNode(true));
      if (hasClass(yodmsg, "yodDone")) {
        yodmsg.className = "";
      }
      else {
        yodmsg.className += " yodDone";
        if (el2 && (parseInt(countMsg) < el2)) playsound();
        countMsg = el2;
      }
    }
  }
}

function GetTxtBox() {
  return g('yod_TweetBox') || c1('.//textarea[contains(@class,"tweet-box-")]');
}

function HailTxtBox(id, txt) {
  var s_gm_counter = 'gm_counter';
  if (gm_counter = g(s_gm_counter)) {
    document.head.removeChild(gm_counter);
  }
  if (!id) id = "";
  if (!txt) txt = "";
  addCS('yodHailTweetBox(\'' + id + '\', \'' + escape(txt) + '\');', s_gm_counter);
}

function doyodRTClean(all,txt) {
  var txt2 = "";
  if (!txt) txt = GetTxtBox();
  else txt2 = txt.id;
  if (txt.tagName === "TEXTAREA") {
    if (all) txt.value = "";
    else txt.value = txt.value.trim().replace(/\s{2,}/g, " ");
    //txt.focus().change();
    HailTxtBox(txt2);
  }
}

function doyodRTFit140(f,txt) {
  var txt2 = "";
  if (!txt) txt = GetTxtBox();
  else txt2 = txt.id;
  if (txt.tagName === "TEXTAREA") {
    txt.value = txt.value.trim().replace(/\s{2,}/g, " ").replace(/%yod%/ig, "");
    if (doyodGetBoolOpt("yodRT_auto140")) f = false;
    if (!f && (txt.value.length > 140)) {
      txt.value = txt.value.substr(0, 138) + "..";
    }
    HailTxtBox(txt2);
  }
  return false;
}

function toggleShow(el, id) {
  var sClass = 'Hide'; var state = 0;
  if (el.className.match(/yodHide/)) {
    sClass = 'Show'; state++;
  }
  setValue(id, state);
  el.parentNode.className = 'f' + sClass;
  el.className = el.className.replace(/(yodHide|yodShow)/, 'yod' + sClass);
}

function buildEmoTable(id, arr) {
  var i, em, str = '<ul>';
  for (i in arr) {
    if (em = arr[i].trim()) {
      str += '<li onclick="javascript:yodInsSmiley(\''+id+'\', \'' + escape(em) + '\');return false;">' + em + '</li>';
    }
  }
  str += '</ul>';
  return str;
}

function updateTxa(id, s) {
  var txai = g(id);
  var txt = txai.value.replace(/^(reply[^@]+)/i, "").trim();
  txt = txt + ": " + s.trim();
  HailTxtBox(id, txt);
}

function watchreply(e) {
  var e = e.currentTarget || e;
  var e = e.parentNode;
  if (c1('.//div[contains(@class,"yodSpace_ireply")]', e)) return;
  if (!(txa = c1('.//textarea[contains(@id,"tweet-box-reply")]', e))) return;
  if (!(target = yodFindParent(txa, 'inline-reply', 'class'))) return;
  if (!(y = yodFindParent(target, 'expansion', 'class')))
    if (!(y = yodFindParent(target, 'permalink', 'class'))) return;

  var elwr, p_t, p = y.cloneNode(true);
  if (elwr = c1('.//*[contains(@class,"js-tweet-text")]', p)) {
    setTimeout(function(){
      txa.value += "\u0000";
    }, 500);

    expand_link(elwr);

    var div = document.createElement("div");
    div.className = "yodSpace_ireply";
    var div2 = document.createElement("div");
    div2.className = "yodSpace_ireply_wrapper";

    // Fit 140 - Cut Text to 140 char length
    var a = document.createElement("a");
    a.setAttribute('data-target', txa.id);
    a.innerHTML = 'Fit 140'; a.className = 'btn'; a.id = "yodRTFit140";
    a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Fit 140");
    a.addEventListener('click', function(){
      doyodRTFit140(false, g(this.getAttribute('data-target')));
      return false;
    }, false);
    var div3 = document.createElement("div");
    div3.appendChild(a); div2.appendChild(div3);

    // Clean - freeup space
    var a = document.createElement("a");
    a.setAttribute('data-target', txa.id);
    a.innerHTML = 'Clean'; a.className = 'btn'; a.id = "yodRTClear";
    a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Free Space Tweet TextBox");
    a.addEventListener('click', function(){
      doyodRTClean(false, g(this.getAttribute('data-target')));
      return false;
    }, false);
    var div3 = document.createElement("div");
    div3.appendChild(a); div2.appendChild(div3);
    div.appendChild(div2);

    var a = document.createElement("a");
    a.className = 'btn'; a.innerHTML = 'Copy Reply';
    a.setAttribute('data-target', txa.id);
    a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Copy current text reply");
    a.addEventListener('click', function() {
      updateTxa(this.getAttribute('data-target'), elwr.textContent);
      return false;
    }, false);
    var div3 = document.createElement("div");
    div3.appendChild(a); div2.appendChild(div3);

    div.appendChild(div2);
    //p_t.parentNode.insertBefore(div, p_t);
    insertAfter(div, target);
  }
}

function yodInlineReply(e) {
  e.addEventListener("DOMNodeInserted", function(e){watchreply(e);} , true);
}

function yodFindReply(el, rep, txa) {
  if (!(par = yodFindParent(el, 'yodSpace', 'id'))) return;
  var act = "";/*
  if (el = c1('.//span[contains(@class,"name")]', rep)) {
    act = el.textContent.trim();
  }*/
  var p = rep.cloneNode(true);
  if (el = c1('.//*[contains(@class,"js-tweet-text")]', p)) {
    expand_link(el);
    //txa.value += " " + act + ": " + el.textContent.trim();
    txa.value += ": " + el.textContent.trim();
    if (doyodGetBoolOpt("yodRT_auto140")) doyodRTFit140();
    doyodRTClean();
    return false;
  }
}

function yod_goDiag(e) {
  var elx, target, txt;
  elx = e.currentTarget;
  if (elx.tagName) {
    if (!(txt = c1('.//textarea', elx))) return false;
    placed = g("yodRTOption");

    // new
    if (!(target = c1('.//div[contains(@class,"modal-body")]', elx)))
      // old
      if (!(target = c1('.//div[contains(@class,"tweet-box")]', elx)))
        return false;

    // new
    if (!(rep = c1('.//div[contains(@class,"modal-footer")]', elx)))
      // old
      rep = c1('.//div[contains(@class,"twttr-dialog-reply-footer")]', elx);

    var vis = "none";
    if (yodRTCopyReply = g("yodRTCopyReply")) {
      if (yodRTCopyReply && rep) {
        if (rep.innerHTML) vis = "inline-table";
      }
      yodRTCopyReply.setAttribute("style", "display:"+vis);
    }

    // Inject Copy Reply button
    if (target && placed && rep/**/ && !g('yodRTCopyReply')) {
      if (!txt) return false;
      var div2 = document.createElement("div");
      div2.id = "yodRTCopyReply";
      var a = document.createElement("a");
      a.className = 'btn'; a.innerHTML = 'Copy Reply';
      a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Copy current text reply");
      a.addEventListener('click', function(){
        yodFindReply(this, rep, txt);
        return false;
      }, false);
      div2.appendChild(a);
      placed.appendChild(div2);
    }

    if (placed && !g('yod_TweetBox')/* && (txt2 = c1('.//textarea', placed.parentNode.parentNode))*/) {
      txt.id="yod_TweetBox";
    }

    if (placed) return false;

    // Inject Our Space to Target
    if (target) {
      var div = document.createElement("div");
      div.id = "yodSpace";
      var div2 = document.createElement("div");
      div2.id = "yodRTOption";

      // Fit 140 - Cut Text to 140 char length
      var a = document.createElement("a");
      a.innerHTML = 'Fit 140'; a.className = 'btn'; a.id = "yodRTFit140";
      a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Fit 140");
      a.addEventListener('click', function(){
        doyodRTFit140();
        return false;
      }, false);
      var div3 = document.createElement("div");
      div3.appendChild(a); div2.appendChild(div3);

      // Clear TweetBox
      var a = document.createElement("a");
      a.innerHTML = 'x'; a.className = 'btn'; a.id = "yodRTClear";
      a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Clear Tweet TextBox");
      a.addEventListener('click', function(){
        doyodRTClean(1);
        return false;
      }, false);
      var div3 = document.createElement("div");
      div3.appendChild(a); div2.appendChild(div3);
      div.appendChild(div2);

      // Clean - freeup space
      var a = document.createElement("a");
      a.innerHTML = 'Clean'; a.className = 'btn'; a.id = "yodRTClean";
      a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Free Space Tweet TextBox");
      a.addEventListener('click', function(){
        doyodRTClean();
        return false;
      }, false);
      var div3 = document.createElement("div");
      div3.appendChild(a); div2.appendChild(div3);
      div.appendChild(div2);

      // Emoticons Table
      var div2 = document.createElement("div");
      div2.id = "yodRTEmo";
      div2.className = "yodLegend";
      var state = doyodGetBoolOpt(div2.id);
      var v_valEmote = state ? "Show" : "Hide";
      str = '<fieldset class="f' + v_valEmote + '"><legend align="center" title="Toggle Show-Hide">[ Emoticons ]</legend><div class="tablex yod' + v_valEmote + '">';
      str += buildEmoTable(txt.id, symbols);
      str += buildEmoTable(txt.id, symbols_utf);
      str += '</div></fieldset>';
      div2.innerHTML = str;
      div.appendChild(div2);

      // OPTION Table
      var div2 = document.createElement("div");
      div2.id = "yodOPTION";
      div2.className = "yodLegend";
      var state = doyodGetBoolOpt(div2.id);
      var v_valOption = state ? "Show" : "Hide";
      str = '<fieldset class="f' + v_valOption + '"><legend align="center" title="Toggle Show-Hide">[ OPTIONS ]</legend><div class="tablex yod' + v_valOption + '">';

      v_valRT = valRT ? valRT : "?";
      str += '\
      <div id="yodRTTxt"><label title="Opt RT Text ( \'?\' for no Prefix )">RT Text <input id="ip_yodRTOpt_RTTxt" name="ip_yodRTOpt_RTTxt" type="text" value="' + v_valRT + '"></label></div>';

      checked = doyodGetBoolOpt("yodRT_auto140") ? ' checked="checked"' : '';
      str += '\<div><label title="Auto cut 140 char"><input id="cb_yodRTOpt_auto140" name="cb_yodRTOpt_auto140" type="checkbox" ' + checked + '>Auto140</label></div>';

      checked = doyodGetBoolOpt("yodAdvTop") ? ' checked="checked"' : '';
      str += '\<div><label title="Top Nav Scroller"><input id="cb_yodAdvTop" name="cb_yodAdvTop" type="checkbox" ' + checked + '>Top Nav</label></div>';

      checked = doyodGetBoolOpt("yodPlaySound") ? ' checked="checked"' : '';
      str += '\<div><label title="Play Sound on new mention"><input id="cb_yodPlaySound" name="cb_yodPlaySound" type="checkbox" ' + checked + '>Sound</label></div>';

      checked = doyodGetBoolOpt("yodMarkMention") ? ' checked="checked"' : '';
      str += '\<div><label title="Colorize on new mention"><input id="cb_yodMarkMention" name="cb_yodMarkMention" type="checkbox" ' + checked + '>Mark Mention</label></div>';

      str += '</div></fieldset>';
      div2.innerHTML = str;
      div.appendChild(div2);

      // Footer Copyleft
      var div2 = document.createElement("div");
      div2.id = "yodRTCopyLeft";
      div2.innerHTML = '<span class="copyleft">\
      Done by <a href="http://blog.krakenstein.net" target="_blank" title="Dev Blog">Cecek Pawon 2010</a> \
      (<a href="http://twitter.com/cecekpawon" title="Dev Twitter">@cecekpawon</a>) \
      w/ <a href="http://userscripts.org/' + yodUpdate['script_id'] + '" target="_blank" title="Script Page">\
      Traditional ReTweet (v' + yodUpdate['script_version'] + ')</a>\
      </span>';
      div.appendChild(div2);

      insertAfter(div, target);

      // cb_yodPlaySound Events
      if (cb_yodPlaySound = g("cb_yodPlaySound")) {
        cb_yodPlaySound.addEventListener('click', function(){
          setValue("yodPlaySound", this.checked ? 1 : 0);
          return false;
        }, false);
      }

      // cb_yodMarkMention Events
      if (cb_yodMarkMention = g("cb_yodMarkMention")) {
        cb_yodMarkMention.addEventListener('click', function(){
          setValue("yodMarkMention", this.checked ? 1 : 0);
          return false;
        }, false);
      }

      // cb_yodAdvTop Events
      if (cb_yodAdvTop = g("cb_yodAdvTop")) {
        cb_yodAdvTop.addEventListener('click', function(){
          if (elyodAdvTop = g("yodAdvTop")) {
            setValue("yodAdvTop", this.checked ? 1 : 0);
            var sClass = 'Hide';
            if (this.checked) {
              sClass = 'Show';
            }
            elyodAdvTop.className = 'yod' + sClass;
          }
          return false;
        }, false);
      }

      // AutoCut 140 Events
      if (cb_yodRTOpt_auto140 = g("cb_yodRTOpt_auto140")) {
        cb_yodRTOpt_auto140.addEventListener('click', function(){
          setValue("yodRT_auto140", this.checked ? 1 : 0);
          if (this.checked) doyodRTFit140();
          return false;
        }, false);
      }

      // Custom RT Events
      if (ip_yodRTOpt_RTTxt = g("ip_yodRTOpt_RTTxt")) {
        evts = ["blur","change","click","focus","input","keydown","keypress","keyup","mousedown","mouseup","paste"];
        for (a in evts) {
          ip_yodRTOpt_RTTxt.addEventListener(evts[a], function(){
            setValue("yodRT_RTText", this.value ? this.value : "?");
            valRT = doyodGetStrOpt("yodRT_RTText");
          }, false);
        }
      }

      // Show/Hide Emote Table Events
      if (yodRTEmo = g("yodRTEmo")) {
        var el2yodRTEmo = c1('.//legend', yodRTEmo);
        el2yodRTEmo.addEventListener('click', function(){
          toggleShow(this.nextElementSibling, yodRTEmo.id);
          return false;
        }, false);
      }

      // Show/Hide OPTION Table Events
      if (yodOPTION = g("yodOPTION")) {
        var el2yodOPTION = c1('.//legend', yodOPTION);
        el2yodOPTION.addEventListener('click', function(){
          toggleShow(this.nextElementSibling, yodOPTION.id);
          return false;
        }, false);
      }
    }
  }
}

function playsound() {
  valPlaySound = doyodGetBoolOpt("yodPlaySound");
  if (!valPlaySound) return;
  if (yod_frun) g('yodnotify').play();
}

function expandNewTweet() {
  var s_gm_counter = 'gm_expandNewTweet';
  if (gm_counter = g(s_gm_counter)) {
    document.head.removeChild(gm_counter);
  }
  addCS('expandNewTweet(".new-tweets-bar");', s_gm_counter);
}


// GLOBAL Variable
var debug = 0;
var countMsg, my_screen_name, logged, twp, yodRTDiv = false;
var valRT = doyodGetStrOpt("yodRT_RTText", "RT");
var valEmote = doyodGetBoolOpt("yodRTEmo");
var valOption = doyodGetBoolOpt("yodOPTION");
var valAdvTop = doyodGetBoolOpt("yodAdvTop", 1);
var valPlaySound = doyodGetBoolOpt("yodPlaySound", 1);
var valMarkMention = doyodGetBoolOpt("yodMarkMention", 1);
var symbols = ("\\m/ ||| d(^_^)b ||| (^_^) ||| \\(^_^)/ ||| v(^_^)v ||| (*-*) ||| (*_*) ||| (T_T) ||| (!__!) ||| m(_ _)m ||| (>_<) ||| (=_=) ||| (-.-)Zzz ||| (-_-*) ||| (^_~) ||| (._.) ||| (<.<) ||| (-__-) ||| (@_@) ||| (X_X) ||| ($_$) ||| ( .__.)/||").split("|||");
var symbols_utf = ("\u2605 | \u00B1 | \u00bd | \u2122 | \u2260 | \u2190 | \u2191 | \u2192 | \u2193 | \u2194 | \u00ab | \u00bb | \u25ba | \u266b | <( \u203e\u25bf\u203e)-\u03c3 | \u2512(\u0283\u0283\u0283_-)\u250e").split("|");

function doExec() {
  // Go if User Logged
  if (logged = c1('.//a[contains(@id,"new-tweet")]') || c1('.//*[contains(@class,"global-new-tweet")]')) {

    // Do 1st Strike
    starter();
    //setTimeout(starter, 5000);

    var el = c1('.//div/div[contains(@class,"js-mini-current-user")]');
    my_screen_name = el ? el.getAttribute('data-screen-name') : "";

    // new wrapper
    if (twp = c1('.//div[contains(@id,"global-tweet-dialog")]')) {
      twp.addEventListener("DOMNodeInserted", yod_goDiag, true);
    }

    // old wrapper
    else if (twp = c1('.//div[contains(@class, "twttr-dialog-wrapper")]')) {
      twp.addEventListener("DOMNodeInserted", yod_goDiag, true);
    }

    document.addEventListener('DOMNodeInserted', function (event) {
      var cname, elmt = event.target;
      if (!(/DIV/.test(elmt.tagName))) return;
      if (cname = elmt.className) {
        if (
          (/stream-item/.test(cname)) ||
          (/js-tweet-details-fixer/.test(cname)) ||
          (/component/.test(cname)) ||
          (/dashboard/.test(cname)) ||
          (/content-main/.test(cname))
        ) {
          if (el = c1('.//div[contains(@class, "new-tweets-bar")]')) {
            expandNewTweet();
          }
          yod_frun++;
          yod_render(1);
        } else if (
          (/in-reply-to/.test(cname)) ||
          (/recent-tweets/.test(cname)) ||
          (/simple-tweet/.test(cname))
        ) {
          yod_frun++;
          yod_render();
        } else if (
          (/js-conversation-replies/.test(cname)) ||
          (/permalink/.test(cname))
        ) {
          yodInlineReply(elmt);
          yod_render();
        } else {
          // User Gallery
          setTimeout(function(){
            var tweet;
            if (tweet = c1('.//div[contains(@class,"media-slideshow-tweet")]'), elmt) {
              if (tweet !== null) tweet.addEventListener("DOMNodeInserted", yod_slideshow, true);
            }
          }, 1000);
        }
        //o_debug(cname);
      }

    }, false);

    // Re-fired!
    //setTimeout(starter, 5000);
  }
}

function doStuff() {
  usoUpdate();
  doExec();
  sound = new Audio("data:audio/mpeg;base64,//OIxAAAAAAAAAAAAFhpbmcAAAAPAAAAIgAACrAACwslJSU4ODhSUlJpaWl8fHyHh4eSkpKampqlpaWpqamtra2wsLC0tLS4uLi8vLzAwMPDw8fHx8vLy8/Pz9LS0tbW1tra2t7e3uHh4eXl5enp6e3t7fDw8PT09Pj4+Pz8/P//AAAAOUxBTUUzLjk4cgI7AAAAAC43AAAUGCQDI0IAABgAAAqwB+DwlwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//M4xAAUWV6oAUN4AXfREREd3f/R3d3DgYGBvGBWKxDEMZF2LeAsAQAkAuBcGTL9+8ePHkSlKUvff//+b3vf0YEMNMnZOzTQ9nw8eM79+/f3DwwAd///5hgAAOjgAApERCgQDAYjAYDEaCgA//N4xA04Sqa2X5PwAwAzkGSFUeHmJeHJPwM6gOOvQmloU3P///zAYA3MEIKEwwE0zmRY1+6VQBgwK36gWADMEkCYzNiGTEmDVMBMEgwSwLAUAeVgAzn/7yZ//gUAgSACMAACkwDwPDBhB8MOEVj///////8w3jCzPXI2MPEE4wBQAF8GAeBQYAACaTrNL3//vCt3n//mAYAKW1bqDAATAIAVMAUB4wAQ/RIMgwAgDf///6XP////9f5a0s6wJiUPcjUq2soSAHVu///////9////////xqNVaWlyyy3qvcyK1T8YiTCsEDkATQMIRp0EIYDTUdt7WeX963f///NYxBov0b4cAZ34AOxrWu673zAGgDwwM8GFM4NOGjqAs0swCMARMDIAsDQHicU2bPhyDAEkwK0BGNAnEmDFrtu8w6kKpMDCA5Nf5gKIWgBQM3XdGGkBUZgRYFF//uxKpohABlC/w5godEt/r6aoYEAAdGJtA9pgFwCtjFceGAVgzhgIoEOYBSABUPN+YBSBpGCegEQYAV///yt+vf0wAEAAZh+WX/91aMJ/UE1t4i//+lUE//N4xAE1iyalj5jYAgCCAAEIUDYA59Z/DyJOX/vRh3d/9jjKWI//0mH3XBa79UeIDFniWTAQHmXqu4BL4GUCjTsf/1w6ShLjy5L8ZAzE5cHUSa3///665/CX944TXpFKqa79r///ww4/kOXkFK12GaaAUeWHf/////sZRzWO79uN0/czQmE1EYtLSTGxhqHtf///////3+XIYnGAKCSYvQ6cD8TGZGgKW8AB0wceMVATxig2RjEiEGhhc3/////////+G4vuv3PWFuIRRrlFbljyulGbFNqVV32cpD9HNS2klKoDZxPBsZCwkG2oeqWiLE8///6kyGi5SKAL//NoxBk2Ww5YAdWwAYAgMCYKAMGoRgLBiAwcikAynioAxAA5BwDBP4AABwMIwaQMOwlQMOQFwMHA3wM4SuwO6nlgNBpnAMi4hgMFYBASAaAUB0ckrDLF8nUdFF1ot0Ua0UUa0TV0WpGRAhWw9hgYDAOBQDA+CgDBiDgDCiR4DP+UADGGHwDCOBgPnFngCABBs6IIk6jSS///9VaKLmJARmSGAJAIBgVBUBhDCMBgvA4AMAkZgPiEpEGTRZJlJf///9VZMjmjmpl0ul0utlUApsgYzAgNiRKQ//NYxAokGlI0AK/rIOaTxdSb/b/uyZoWx2gEgACAZAGDISIoG8rSBrYWgYJBQ4ACggAcMEJA2jAawCsrANBkBhMDACODIXVDUDujwAyqSQMMBoDAoHBsGBcOKDIgVjx9BNTMnq/pf/PHydHJFYBMAgAB4DLqIA2CNAMPBEMDDPkTHaQYut/////9ZwjxKJDCYLZq6lgE4oFnrNrHW+8yx1nhfs1aluzTValuxZppTHonDjzp//M4xCAfWY4wAMeZJYKNxCg5gdJQpJkAgQmFcFaYNAPxgkgamA+EYYMZsppR+jGp2JyYrwGQcKMYJwAoGA+QpmlcqDLCgsHY6EYskkvJzxGeroWHHnWoafW1tp/W3N3IRODIIwYrqzLN21UR//M4xAETMYocCLdPQjRbZ/////0jUmSHDOh/ggAWCAJwGJEDAGJQV4GFMOgGLsVwGdZz4HmD0pxooxn+J5j0CxiGA5hIARgeApZ9TCG8P////+iioDwCRh0WbY/73d3unpi7TG1mAIBIOmAA//MoxBMOaQokOAG45FmKzocDjR9NBmzBQHIIHGAODaAws48igDOKSxzedJSWAQicEHf8kvVVv7zW/vOdpkiRmWOBgCAQCAUW//M4xBQU8R30ADbzBJU7TKmGrtZzFcEji/TXDERov6Z9GnXRIHgBQZmAlqQUChJXU5VuIuSzlrruw7TdqymMxmW0p0FQVDX5YO1iIGrH/////////9P3a9GhOioJAf///////6vfq//t+nNJ//MYxB8DkAWcAgAAAC3H//////7f///33dCbtlCQP/////////MYxCcEOAGcDAAAAP/7km997Sff9VUOP///////8VV6/7r3//MYxC0DuAGgAgAAAvEn41X/R6/bu9XRxl3/7P////1+n0qH//MYxDUECAWcBAAAAE/////+R///+9Who+vH//////////1V//MYxDsEEAGgCgAAAllttOxFNUf+//////8t/f/6uv521y0M//MYxEEEaAWUAAAAAD////////R9jErqb6FK4D/////////8//MYxEYDgAGYAgAAAIxYuogZf2u9FQyB/////////p0LuRyc//MYxE8D2AWgAgAAAqnv9KoOP////////pp/r2Wd7eyzRRY///MYxFYD8AWYAgAAAP///3Wf+5mpjPd/9n7kUACwD/////////MYxF0DmAGgCgAAAv9utm6/rGIVh//////////o3VJn+63///MYxGUEWAWkBAAAAP///o/6P///b//8jeA/////////+vo6//MYxGoESAWcDAAAAPpVD////////9Vmj////+7+pQw///////MYxG8EKAWgCgAAAv//9Pby3eqZ6cf/////////rKUbTtrE//MYxHUEOAWYCgAAAGQ10A4///////o/2XP/9FbvZWqqCQH///MYxHsD+AGkFAAAAP//9n///1ZWz/9orWdrXnRtoD////////MYxIICqAGgAgAAAv////X/+VFFTEFNRTMuOTguNFVVVVVV//MYxI4D6AWUAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MYxJUDEAWoBAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MYxJ8D4AGYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MYxKYDgAWcCgAAAlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MYxK8EOAGcAgAAAlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MYxLUEMAGcCgAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MYxLsE6AGUDAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//MYxL4DYAVgBAAAAlVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
  sound.id = 'yodnotify';
  sound.controls = false;
  sound.loop = false;
  sound.autoplay = false;
  sound.volume = 0.7; //0.0-1.0
  sound.setAttribute('style', 'position:absolute; left:-1000px; top:-100px;')
  document.body.appendChild(sound);
}

var yod_frun = -1;
document.addEventListener("DOMContentLoaded", doStuff, true);
})();
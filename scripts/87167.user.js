// ==UserScript==
// @name           facebook.com - Reply button FIXER
// @version        1.8
// @description    Add a reply button to comments
// @namespace      http://www.krakenstein.cz.cc
// @original       Kub4jz.cz <kub4jz> @ http://userscripts.org/scripts/show/49378
// @require        http://sizzlemctwizzle.com/updater.php?id=82308
// @include        http://*.facebook.com/*
// @match          http://*.facebook.com/*
// @exclude        http://apps.facebook.com/*
// @exclude        http://www.facebook.com/apps*
// ==/UserScript==

var gm_class = ' gm_reply_button_fix';
var button_text = 'Reply';
var last_insert = '';
var t2, t1; // timeout
var unsafeWindow = this['unsafeWindow'] || window;

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}

function gBox(el) {
  var textarea = el.getElementsByTagName("textarea");
  if (!textarea.length) return gBox(el.parentNode);
  else return textarea.item(0);
}

function insertName(evt) {
  evt.preventDefault();
  var parent = this.parentNode.parentNode;
  var link = parent.getElementsByClassName("actorName").item(0);
  var string = link.innerHTML;
  var insert_text = 'What up? ' + string + '!!! Thanks for the comment! (: \n';
  var textarea;
  textarea = gBox(parent.parentNode);
  textarea.focus();
  var value = textarea.value;
  if (value == '') { last_insert = null; }
  if (insert_text !== last_insert) {
    textarea.value += insert_text;
    last_insert = insert_text;
  }
}

function addButtons(ev) {
  if(!/(INPUT|UL|LI|DIV)/g.test(ev.target.tagName)) {
    return false;
  }
  var divs = document.getElementsByClassName("commentActions");
  var gm_class_length = document.getElementsByClassName(gm_class);
  var divs_length = divs.length;
  if (divs_length != gm_class_length) {
    for (i = 0; i <= divs_length - 1; i++) {
      var div = divs.item(i);
      if (div.className.indexOf(gm_class) >= 0) {
        continue;
      } else {
        div.className += gm_class;
      }
      if (!div.getElementsByClassName("saving_message").item(0)) continue;
      // create & add reply button
      var div2 = document.createElement('div');
      var button = document.createElement('a');
      button.textContent = button_text;
      button.addEventListener("click", insertName, false);
      div2.setAttribute('style',"border:0;float:right;padding-right:10px;");
      div2.appendChild(document.createTextNode('-[ '));
      div2.appendChild(button);
      div2.appendChild(document.createTextNode(' ]-'));
      var pe = div.parentNode.parentNode;
      if(pe) pe.appendChild(div2);
      delete div; delete div2; delete button;
    }
    if(t2) clearTimeout(t2);
  }
  return false;
}

function doInject(ev) {
  if(t2) clearTimeout(t2);
  t2 = setTimeout(function() { addButtons(ev); }, 50);
}

function starter() {
  var content = g('content');
  if (content) {
    if(t1) clearTimeout(t1);
    var dom = "DOMNodeInserted";
    content.addEventListener(dom, doInject, false);
  }// else { if(document.body) return Boot(); }
  return false;
}

function Boot() {
  if(t1) clearTimeout(t1);
  t1 = setTimeout(starter, 1000);
}

Boot();
//unsafeWindow.addEventListener("load", function() { starter(); }, false);
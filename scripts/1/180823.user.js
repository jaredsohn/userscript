// ==UserScript==
// @name        Armageddong [Houston]
// @namespace   PepeCamello
// @description Change Armageddong's Posts
// @include     http://endoftheinter.net/*
// @include     http://boards.endoftheinter.net/*
// @include     https://endoftheinter.net/*
// @include     https://boards.endoftheinter.net/*
// @include     http://archives.endoftheinter.net/*
// @grant       none
// ==/UserScript==

var userid = 20977;
var username = 'Armageddong';
var sayings = [
  '<b>I love Houston!</b>',
  '<b>THIS IS ME RIGHT NOW!</b><br><img src="http://i3.endoftheinter.net/i/n/a5688e4267dd96793231b3254261e139/MS.gif" />',
];
var signature = '<br>---<br>BRING BACK MATT SCHAUB! [Houston] 4 lyfe.';

function search_links_for(regex, dom/*, element*/) {
  var element = arguments[2];
  var a = dom.getElementsByTagName('a');
  for (var i = 0; i < a.length; i++) {
    var m = a[i].href.match(regex);
    if (m && m[1]) {
      if (element) return a[i];
      return m[1];
    }
  }
  return false;  
}

function process_messages (list) {
  if (list.target) list = [list.target];
  for (var i = 0; i < list.length; i++) {
    if (search_links_for(/profile.*user=(\d+)/, list[i]) != userid) continue;
    var id = search_links_for(/message\.php\?.*id=(\d+)/, list[i]);
    list[i].getElementsByClassName('message')[0].innerHTML = sayings[id % sayings.length] + signature;
    search_links_for(/profile\.ph(p)/, list[i], true).textContent = username;
  }
}

process_messages(document.getElementsByClassName('message-container'));

document.addEventListener('DOMNodeInserted', process_messages, false);
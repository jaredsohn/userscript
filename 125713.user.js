// ==UserScript==
// @name           Dontracker AdminMod
// @author         Fortnox <holyprogrammer@gmail.com>
// @version        0.3
// @include        http://dontracker.ru/*
// ==/UserScript==

(function(){
  AddTopicModButtons();

  document.addEventListener('DOMContentLoaded', FixHeader, false);
}());

function AddTopicModButtons() {
  var div = unsafeWindow.$('div .small > div:first').filter(':last').clone();
  div.css('float', 'right');
  unsafeWindow.$('.maintitle').append(div);
}

function FixHeader(){
    var div = document.getElementById('head-mid');
    if (div !== null) {
      div.style.width = "300px";
     }
}
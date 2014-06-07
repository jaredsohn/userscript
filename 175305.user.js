// ==UserScript==
// @name          Cantr 100 notes
// @namespace     http://www.cantr-mmorpg.pl/100notes
// @description   Selects 100 notes instead of all in note management tool
// @include       http://www.cantr.net/*
// @include       http://cantr.net/*
// @include       https://cantr.net/*
// @include       https://www.cantr.net/*
// @include       cantr.net/*
// @include       *cantr.loc/*
// @include       http://test.cantr.net/*
// @grant         none
// @include       www.cantr.net/*
// @version       1.0
// ==/UserScript==

var fs = document.body.getElementsByTagName("fieldset");
if (fs.length > 0) {
  var inp = fs[0].getElementsByTagName("input")[0];
  inp.onclick = function() {
    return function() {
      var notesList = document.getElementsByClassName("note_ind");

      for (var i=0;i<notesList.length && i<100;i++){
        notesList[i].checked = true;
      }
    };
  }
}

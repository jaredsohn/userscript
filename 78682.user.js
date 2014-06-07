// ==UserScript==
// @name           LL Play Ready
// @namespace      http://localhost.localdomain
// @description    Draws attention to the document title for Levynlight.
// @include        http://apps.facebook.com/levynlight/*
// @include        http://apps.new.facebook.com/levynlight/*
// ==/UserScript==

//(function() {
//  var embeds = document.getElementsByTagName("input");
//  for (var i = embeds.length - 1; i >= 0; i--) {
//    var input = embeds[i];
//    if (input.id.match(/hornWaitValue/)) {
//      input.type="text";
//      i = 0;
//    }
//  }
// })();

//app377144924760_hud_actions
//(function() {
var origTitle = document.title;
var newTitle = "Play is Ready";
var titleCount = 0;
var spaces = 0;
// alert('Trying!');
var changeTitle = function() { delay=5;
  var actions = document.getElementById('app377144924760_hud_actions').innerHTML;
//  alert('Actions: ' + actions);
  if (actions > 0) {
    spaces = titleCount % 6 * 2;
    var preString = "_";
    for (var i = 0; i < spaces; i++) {
      preString += "_";
    }
    document.title = preString + newTitle;
    titleCount++;
    setTimeout(changeTitle, 1000);
    //window.getAttention();
    //window.focus();
    //alert("Sound the horn");
  } else {
//  alert("Time has passed");
    document.title = origTitle;
    setTimeout(changeTitle, 1000*delay);
  }
}

//alert ("Setting timeout");
setTimeout(changeTitle, 15000);

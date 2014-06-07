// ==UserScript==
// @name         OkCupid show public question importance
// @namespace    http://userscripts.org/users/smurawski
// @description  Add importance level for public question compare
// @include      http://www.okcupid.com/profile/*/questions*
// @version      1.03
// @url          http://userscripts.org/scripts/source/93125.user.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @changelog    Now using jquery
// ==/UserScript==

// NOTE ---------
// Greasemonkey for me has always been broken, braindead and impossible to debug
// Scriptish on the other hand is awesome!!
// For firefox 6.0.1, this does NOT work in greasemonkey for me :(
// I spent 2 hours trying to get this to work in greasemonkey and only 5 min in scriptish

// Because a new span is added next to each icon, it messes up the note.
// Increase the icon margin to have it line up.
$('p[class="answer clearfix"] img').each(function (i, img) {
  $(img).css({marginBottom:'25px'});
});

var importance_mapping = {
  1 : "Manditory",
  2 : "Very important",
  3 : "Somewhat important",
  4 : "A little important",
  5 : "Irrelevant"
};

// For each answered question (either public or private), insert
// a span of the corresponding importance_mapping
$(".question:not(.not_answered) input[id$=importance]").each(function(i, imp) {
  var question_id      = imp.id.match(/[\d]+/)[0];
  var answer_viewer_id = "answer_viewer_" + question_id;
  var importance_val   = $(imp).val();
  var importance_txt   = importance_mapping[importance_val];

  $("#" + answer_viewer_id).append("<span style='color:blue'>" + importance_txt + "</span>");
});

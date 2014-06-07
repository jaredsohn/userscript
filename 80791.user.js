// ==UserScript==
// @name           Proof of Concept **DEMO PURPOSES ONLY**: Reddit Comment Collapse Persistence
// @namespace      http://diehealthy.org/
// @description    Persists the collapsed state of comments on Reddit.com
// @include        http://www.reddit.com/r/*/comments/*
// ==/UserScript==

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
  var collapse = $('#search input').val();
  try {
    collapse = JSON.parse(collapse);
  }
  catch (e) {
    collapse = {};
    $('#search input').val(JSON.stringify(collapse));
  }
  for (id in collapse) {
    $('.noncollapsed .expand:first', '.' + id).click();
  }
  $('.noncollapsed .expand').click(includeID);
  $('.collapsed .expand').click(excludeID);
}

function includeID(target) {
  var id_targ = $(this).parents(".thing:first");
  var id = $.grep(id_targ.get(0).className.split(' '),
    function(i) { return i.match(/^id-/); });
  id = id[0];
  var rccp = $('#search input').val();
  try {
    rccp = JSON.parse(rccp);
  }
  catch (e) {
    rccp = {};
  }
  if (rccp[id] == null) {
    rccp[id] = 0;
  }
  $('#search input').val(JSON.stringify(rccp));
}

function excludeID(target) {
  var id_targ = $(this).parents(".thing:first");
  var id = $.grep(id_targ.get(0).className.split(' '),
    function(i) { return i.match(/^id-/); });
  id = id[0];
  var rccp = $('#search input').val();
  try {
    rccp = JSON.parse(rccp);
  }
  catch (e) {
    rccp = {}
  }
  if (rccp[id] != null) {
    delete rccp[id];
  }
  $('#search input').val(JSON.stringify(rccp));
}


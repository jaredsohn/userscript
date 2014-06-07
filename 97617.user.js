// ==UserScript==
// @name           Workflowy Calculator
// @description    Enables running scripts on your Workflowy page.
// @author         Jason Walker
// @include        http://workflowy.com/*
// @version        1.0
// ==/UserScript==

$(document).ready(function() {

var editors = $('textarea');
editors.keypress(function(e) {
  if(e.which === 61) {
    var target = $(e.target);
    var val = target.val();
    target.val(eval(val));
    e.preventDefault();
  }
});

});

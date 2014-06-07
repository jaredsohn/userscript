// ==UserScript==
// @name          Confluence notify
// @namespace     http://mtk.co.il/flspafford
// @description	  test
// @include       /^https?://.*\.atlassian\.net/wiki.*$/
// ==/UserScript==
//Change Log:

document.body.className += " withoutad";AJS.bind('init.rte', function() {
  var c = "notifyWatchers"; var o = AJS.$('#notifyWatchers');
  if(AJS.$.cookie(c) != null) {
    o.attr('checked', AJS.$.cookie(c)==='true' );
  }
  AJS.$('#notifyWatchers').bind('click', function() {
    var date = new Date();
    var minutes = 60;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    AJS.$.cookie(c, o.prop('checked'),{ expires: date } );
  });
});
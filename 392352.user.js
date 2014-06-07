// ==UserScript==
// @name       HF WYS
// @author     emanb29
// @namespace  http://hackforums.net/
// @version    0.8
// @description  A userscript to enhance HF by providing a realtime BBCode editor
// @include     *hackforums.net/newthread.php*
// @include     *hackforums.net/newreply.php*
// @copyright  2014+, emanb29
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_info
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
//act = $('<div style="float: top; postion: fixed; top:0; right: 0; display: block; width: 80px; height: 80px; background: green;"></div>');
//$('body').append(act);
prevu = $('<div id="prevu"></div>');
$('.quick_keys').append(prevu);
var url = location.href;
log = function (str) {
  console.log('[WYS] '+str);
}
if (url.match('.+://.*\\.?hackforums\\.net/newreply\\.php\\?tid=[0-9]+')) {
  var tidarg = url.match('tid=[0-9]+')[0];
  log(tidarg);
} else if (url.match('.+://.*\\.?hackforums\\.net/newthread\\.php\\?fid=[0-9]+')) {
  var fidarg = url.match('fid=[0-9]+')[0];
  log(fidarg);
  var ref = setInterval(function() {
    var data = $('form[action*="newthread.php?'+fidarg+'"]').serialize()+'&previewpost=1';
    $.post('newthread.php?'+fidarg+'&processed=1', data, function (res) {
      //console.log(res);
      var s = res.indexOf('<!-- start: previewpost -->');
      var e = res.indexOf('<!-- end: previewpost -->');
      var prevr = res.substring(s,e);
      //console.log(prevr);
      $('#prevu').html(prevr);
      //var t = window.open();
      //t.document.writeln(res);
      //clearInterval(ref);
    })
  }, 500);
}
// ==UserScript==
// @name          Koprol Stream a Better one
// @namespace     http://www.koprol.com/stream/better/one
// @description   Browsing Koprol stream with pleasure
// @include       http://koprol.com/
// @include       http://koprol.com/#/streams*
// @author        wharsojo
// @version       0.3
// ==/UserScript==

(function() {
  $ = unsafeWindow.jQuery;
  function emoticons($$){
        var rpl= $$.html().replace(/\:\)/g,'<img src="http://www.clicksmilies.com/s1106/mini/small-smiley-018.gif"/>');
        rpl= rpl.replace(/\:D/g,'<img src="http://www.clicksmilies.com/s1106/lachen/laughing-smiley-002.gif"/>');
        rpl= rpl.replace(/XD/g,'<img src="http://www.clicksmilies.com/s1106/lachen/laughing-smiley-001.gif"/>');
        rpl= rpl.replace(/\:\(/g,'<img src="http://www.clicksmilies.com/s1106/traurig/sad-smiley-021.gif"/>');
        rpl= rpl.replace(/\:[Pp]/g,'<img src="http://www.clicksmilies.com/s1106/aetsch/cheeky-smiley-009.gif"/>');
        $$.html(rpl);
  };
  
  $('body').ajaxComplete(function(e, xhr, settings) {
    if (/\/streams\//.test(settings.url)) $("div.comtext,span.stream_text").each(function(i){ emoticons($(this)); });
    if (/\/streams\?/.test(settings.url)) $("div.comtext,span.stream_text").each(function(i){ emoticons($(this)); });
    if (/\/streams\?/.test(settings.url)){
       $('span.stream_text a[href*=bit.ly]').each(function(){
         $(this).html('<img src="http://upload.wikimedia.org/wikipedia/commons/6/64/Icon_External_Link.png"/>');
       });
    }
  });
  
  $(function(){
    $('body').prepend('<style id="checkoff">'+
      '#checkin_filter_sidebar,li.checkin,li.review{display:none;}'+
      '#all_streams li {padding:10px 0;min-height:50px;}</style>');
  });
  setTimeout(function(){$('#more').click()},4000);
}());

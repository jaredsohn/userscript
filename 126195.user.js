// ==UserScript==
// @name           weibo_batch_del
// @namespace      weibo
// @include        http://weibo.com/*/profile*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
var testParam = 2;
// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    }
    else {
        jQuery = unsafeWindow.jQuery;
        unsafeWindow.jQuery.noConflict();
        letsJQuery();
//        alert(unsafeWindow.jQuery);
    }
}
GM_wait();


// *** put your code inside letsJQuery: ***
function letsJQuery() {
  //jQuery('body').append('<div style="position:fixed;top:50px;right:0;background-color:#FFF;z-index:100;"><input type="text" size="30" id="weibo_del_input"/><input type="button" id="weibo_del_execute" value="Delete"/><br/><input type="button" id="weibo_batch_del_execute" value="Batch Delete"/></div>')
  jQuery('body').append('<div style="position:fixed;top:50px;right:0;background-color:#FFF;z-index:100;"><input type="button" id="weibo_batch_del_execute" value="Batch Delete"/></div>')
  jQuery('#weibo_del_execute').click(function(){
    var contentId = jQuery('#weibo_del_input').val();
    if (contentId) {
      jQuery.post('http://weibo.com/aj/mblog/del?__rnd='+new Date().getTime(), {"_t":"0", "mid": contentId});
    }
  });
  
  jQuery('#weibo_batch_del_execute').click(function(){
    if (confirm('Sure?')) {
      jQuery('#pl_content_myFeed .feed_list').each(function(){
        var contentId = jQuery(this).attr('mid');
        if (contentId) {
          jQuery.post('http://weibo.com/aj/mblog/del?__rnd='+new Date().getTime(), {"_t":"0", "mid": contentId}, function(){
            //{"code":"100000","msg":"","data":{}}
          });
        }
      });
    }
  });
  //pl_content_myFeed
}


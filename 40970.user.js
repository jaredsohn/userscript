// ==UserScript==
// @name           Twitter Search Plus
// @namespace      intridea
// @description    Find replies to a tweet in the Twitter Search timeline with the click of a button.
// @include        http://search.twitter.com/search*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { jQuery = unsafeWindow.jQuery; jQuery.noConflict(); letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    jQuery('li.result div.info').append('<span class="find-reply-container">· <img src="/images/thread.png" class="thread" alt="Thread"/> <a class="litnv find-replies" href="#">Find Replies</a></span>');
    jQuery('li.result').append('<div class="thread reply-finder-results" style="display:none;"></div>');
    jQuery('a.find-replies').each(function() {
      var result = jQuery(this).parents('li.result');
      var user_name = result.find('div.msg a:first').text();
      var since_array = result.find('div.info a.lit').attr('href').split('/');
      var since_id = since_array[since_array.length - 1];
      jQuery(this).attr('href','http://search.twitter.com/search?q=to:' + user_name + '&since_id=' + since_id);
    }).click(function() {
      link = jQuery(this);
      var search_url = link.attr('href').replace("/search?q","/search.json?q") + '&rpp=15&show_user=true';
      jQuery.ajax({
        url: search_url,
        dataType: 'json',
        beforeSend:function() {
          link.html('Loading Replies...');
        },
        success:function(data) {
          if (data.results.length == 0) {
            link.html('No Replies Found');
          }
          
          var html = "<ul class='thread'>";
          
          for(var i = 0; i < data.results.length; i++) {
            var t = data.results[i];
            
            html += "<li class='result nested inthread";
            if (i == 0) html += " first";
            if (i == (data.results.length - 1)) html += " last";
            html += "'><div class='avatar'><img src='" + t.profile_image_url + "' width='36' height='36'/></div>";
            html += "<div class='msg'>";
            html += "<a href='http://twitter.com/" + t.from_user + "' target='_blank'>" + t.from_user + "</a>: ";
            html += "<span class='msgtext " + t.iso_language_code + "'>" + autolink(t.text) + "</span>";
            html += "</div>";
            html += "<div class='info'>" + t.created_at + "</div>"
            html += "</li>";
          }
          
          html += "</ul>";
          
          link.parents('li.result').find('div.reply-finder-results').html(html).slideToggle(500,function() {
            if (link.parents('li.result').find('div.reply-finder-results').is(':visible'))
              link.html('Hide Replies');
            else
              link.html('Find Replies');
          });
        }
      });
      return false;
    });
    
    autolink = function(text) {
      text = text.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?)/g, "<a href='$1' target='_blank'>$1</a>");
      text = text.replace(/(^|\W)?@([a-zA-Z0-9]+)(\W|$)/g, "$1<a href='http://twitter.com/$2' target='_blank'>@$2</a>$3");
      return text;
    }
    
    linkify = function(text, url) {
      return "<a href='"+url+"' target='_blank'>" + text + "</a>";
    }
}
// ==UserScript==
// @name           SOtweet
// @namespace      org.neverfear.sotweet
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://meta.stackoverflow.com/*
// ==/UserScript==

// Set CSS style
var style = window.document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#tweeeet{display:none;position:absolute;left:30%;top:40%;width:350px;height:100px;padding:10px;background:#9AE4E8;-moz-border-radius:10px}#tweetmsg{display:none;} #tweetsubmit{display:none}';
document.getElementsByTagName("head")[0].appendChild(style);

(function(){
  function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { 
      window.setTimeout(GM_wait,100); 
    } else { 
      $ = unsafeWindow.jQuery; letsJQuery(); 
    }
  }
  GM_wait();

  function letsJQuery() {
    function getTinyURL(longURL, success) {
        var API = 'http://json-tinyurl.appspot.com/?url=';
        var URL = API + encodeURIComponent(longURL) + '&callback=?';

        $.getJSON(URL, function(data){
            success && success(data.tinyurl);
        });
    }

    // The tweet'ify div, shown by the tweet link
    $('body').prepend('<div id="tweeeet"><form id="tweetform"><div id="tweetloading"><img src="http://stackoverflow.com/content/img/ajax-loader.gif" width="24" height="24"><span id="loadingmsg"></span></div><p><img src="http://img189.imageshack.us/img189/6721/twitterlogotransparent.png" width="27" height="26"><textarea rows="3" cols="40" id="tweetmsg"></textarea></p><p><input type="button" value="Close!" id="tweetclose">&nbsp;<input type="submit" value="Twitter\'ify it!" id="tweetsubmit"></p></form></div>');

    $('.post-menu').append('<span class="link-separator">|</span><a href="#" id="tweetifylink">tweet</a>');

    $('#tweetifylink').bind('click', function(){
      $('#tweeeet').show();

      // Show loading thingy, hide form until tinyurl is grabbed
      $('#tweetmsg').hide();
      $('#submit').hide();
      $('#loadingmsg').append('Getting TinyURLified address');
      $('#loading').show();

      $('#tweetclose').bind('click', function(){
        $('#tweeeet').hide();
      })

      getTinyURL(document.location, function(tinyurl){
        // TinyURLification complete, enter into tweetmsg input, submit
        $('#tweetmsg').val(tinyurl + ' "' + document.title +'"');
        $('#tweetmsg').show();
        $('#tweetloading').hide();
        $('#tweetsubmit').show();

        $('#tweetform').submit(function(){
          var submiturl = 'http://twitter.com/home?status=' + encodeURIComponent($('#tweetmsg').val());
          window.location.href = submiturl;
        })
      });

    })
  }
})();

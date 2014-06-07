// ==UserScript==
// @name            badoo-improved-search
// @namespace       http://badoo.com/
// @description     Highlights users in search by they last visit
// @include         http://badoo.com/*
// ==/UserScript==

// Add jQuery
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
// When jQuery is loaded
script.addEventListener('load', function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();
  /* You put your jQuery code here, which must use the jQuery namespace. See Note. */
  
    window.watchContentChange = jQuery('div#contacts_list').html();
    
    setInterval(function(){
        var md5v = jQuery('div#contacts_list').html();
        if(window.watchContentChange != md5v){
          highlight();
          window.watchContentChange = md5v;
        };
    },500);

  var highlight = function () {
      jQuery('div#contacts_list a#uid').each(function(){
        var $el = jQuery(this);
        
        if (this.title == 'Сейчас на сайте!' || this.title == 'Только что была на сайте' || this.title.match('Была на сайте.*(минут|час)') != null) 
            $el.closest('.user_contact').css({'opacity':'0.9','border':'1px solid green'});

        else if (this.title == 'Была на сайте Вчера') 
            $el.closest('.user_contact').css({'opacity':'0.8','border':'1px solid green'});
            
        else if (this.title == 'Была на сайте более недели назад') 
            $el.closest('.user_contact').css({'opacity':'0.3','border':'1px solid grey'});
            
        else
            $el.closest('.user_contact').css({'opacity':'0.7'});
      });
  }
  highlight();
}, false);

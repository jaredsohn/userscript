// ==UserScript==
// @name           Twitter Unfollow Buttons
// @namespace      http://robkohr.com/unfollow
// @description    Creates buttons next to each posting to unfollow users on twitter
// @include        http://twitter.com/* 
// ==/UserScript==


/*
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
*/


// All your GM code must be inside this function
 var letsJQuery = function() {
   add_nofollow_buttons();
   window.setTimeout(letsJQuery, 1000);
 }

// Check if jQuery's loaded
   function GM_wait() {
     if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
     else { $ = unsafeWindow.jQuery; letsJQuery(); }
   }
GM_wait();


//alert('asf');
/*
window.addEventListener("click", function(event) {
    for(i=1000; i<10000; i=i+1000){

    }
   }, false);
*/

function add_nofollow_buttons(){
  $('.hentry').each(function(){
      if(!$(this).hasClass('unfollow_added')){
	$(this).find('.screen-name').each(function(){
	      screen_name = $(this).text();
         });
        button = '<input class="small" style="padding:2px;" id="remove_button" type="button" value="unfollow" onclick="javascript:$.post(\'http://twitter.com/friendships/destroy/'+screen_name+'\', {authenticity_token : twttr.form_authenticity_token, twttr: \'true\'}, \'\', \'json\');$(\'.u-'+screen_name+'\').hide(\'slow\')"/>';
	$(this).append(button);
	$(this).addClass('unfollow_added');
      }
    });

}

// {authenticity_token : twttr.form_authenticity_token, twttr: \'true\'}

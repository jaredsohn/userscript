// ==UserScript==
// @name           twitthat customize action/prefix
// @namespace      kej.tw
// @description    temporary customize your twitthat action/prefix
// @include        http://twitthat.com/*
// ==/UserScript==
// version: 0.2

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait,100);
  } else {
    jQuery = unsafeWindow.jQuery;
    customize();
  }
}

function customize(){
  var p  = document.createElement('p');

  var t  = document.createElement('input');
  t.type = 'text';
  t.name = 'custon_action';
  t.id   = 'custom_action';
  //t.setAttribute('size', '20');
  jQuery(t).css('width', '140px');
  
  var b  = document.createElement('input');
  b.type = 'button';
  b.name = 'insert_custon_action';
  b.id   = 'insert_custom_action';
  b.value = 'temporary add this prefix';
  
  var s = document.createTextNode(' ');
  
  p.appendChild(t);
  p.appendChild(s);
  p.appendChild(b);
//  jQuery('form#go').before(p);
  jQuery(jQuery('form').get(0)).before(p);
  
  jQuery('#insert_custom_action').click(function(){
    if(jQuery('#custom_action').val().length > 0){
      var temp_action_text = jQuery.trim(jQuery('#custom_action').val());
      var temp_action = document.createElement('option');
      temp_action.text = temp_action_text;
      temp_action.value = temp_action_text;
//      jQuery('#action').append(temp_action);
//      jQuery('#action').get(0).selectedIndex = jQuery('#action').get(0).length - 1;
//      jQuery('#action').trigger('change');
      jQuery("select[name='prefix']").append(temp_action);
      jQuery("select[name='prefix']").get(0).selectedIndex = jQuery("select[name='prefix']").get(0).length - 1;
      jQuery("select[name='prefix']").trigger('change');
      jQuery('#custom_action').val('');
    }
  });
}

GM_wait();
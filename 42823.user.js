// ==UserScript==
// @name           twitthat customize action
// @namespace      kej.tw
// @description    temporary customize your twitthat action
// @include        http://twitthat.com/*
// ==/UserScript==

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
  var t  = document.createElement('input');
  t.type = 'text';
  t.name = 'action';
  t.id   = 'custom_action';
  t.setAttribute('size', '20');
  t.disabled = true;
  t.style.display = 'none';
  jQuery('#action').after(t);
  
  var p  = document.createElement('p');

  var c  = document.createElement('input');
  c.type = 'checkbox';
  c.name = 'custom_check';
  c.id   = 'custom_check';
  
  var labeltext = document.createTextNode("temporary customize your action");
  var l  = document.createElement('label');
  l.name = 'custom_check';
  l.id   = 'custom_check';
  l.setAttribute('for', 'custom_check');
  l.style.cssFloat = 'none';
  l.appendChild(labeltext);
  
  p.appendChild(c);
  p.appendChild(l);
  jQuery('form#go').before(p);
  
  jQuery('#custom_check').click(function(){
    if(this.checked){
      var tempvar = jQuery('#action').val();
      jQuery('#action').attr('disabled', 'disabled').css('display', 'none');
      jQuery('#custom_action').attr('disabled', '').css('display', '').val(tempvar);
    }else{
      jQuery('#action').attr('disabled', '').css('display', '');
      jQuery('#custom_action').attr('disabled', 'disabled').css('display', 'none');
    }
  });
}

GM_wait();
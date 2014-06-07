// ==UserScript==
// @name           CSP Unlocker
// @namespace      http://www.csajokespasik.hu/*
// @description    CSP Unlocker
// @include        http://www.csajokespasik.hu/viewphoto/slideshow/*
// @include        http://www.csajokespasik.hu/checkout*
// @include        http://www.csajokespasik.hu/profile/*
// @exclude        http://www.csajokespasik.hu/login*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

function drawTheHud(){
  var nav = document.createElement("div");
  nav.innerHTML = '<style type="text/css">' +
  ' .cspuhud { position: fixed; right: 0; top: 30%; z-index: 1000; }' +
  ' .cspuhud a { padding: 5px 10px; background-color: black; color: white; border-radius: 5px 0 0 5px; display: block; margin-bottom: 5px; }' +
  ' .csp_h_view_pro { border-radius: 5px; background-color: white; color: black; margin: 20px 0 0 20px; padding: 10px 15px; float: left; }' +
  ' .csp_h_view_pro:hover { background-color: black; color: white; }' +
  '</style> ' +
  '<div class="cspuhud">' +
  '<a href="#" id ="cspu_button_unjailp" onclick="return false;">Unlock Photo</a>' +
  '<a href="#" id ="cspu_button_revailc" onclick="return false;">Revail Views</a>' +
  '<a href="#" id ="cspu_button_unlockp" onclick="return false;">Unlock Pokes</a>' +
  '</div>';
  document.body.insertBefore(nav, document.body.firstChild);
}

function unJailPhoto(){
  ois = document.getElementsByClassName('photo_overlayer');
  ois[0].style.display = 'none';
}

function unlockPokes(){
  $("textarea").attr("sizelimit", "200");
}

function revailCheckout(){
  var div = document.getElementsByClassName('promo_bepremium');
  var toa = document.getElementsByClassName('bepremium_left');
  var tob = document.getElementsByClassName('bepremium_right');
  for (var i = 0; i < div.length; i++) {
    but = document.createElement("div");
    but.innerHTML = '<a href="#" class="csp_h_view_pro" onclick="'+
    "a = 'http://www.csajokespasik.hu/profile/' + this.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].getAttribute('src').substring(53,59);" +
    'window.location = a; return false;">Profil megtekintése</a>';
    div[i].style.height  = '100px';
    toa[i].style.display = 'none';
    tob[i].style.display = 'none'; 
    div[i].appendChild(but);
  }
}

document.addEventListener('click', function(event) {
  id = event.target.id;
  if ( id == 'cspu_button_unjailp' ) { unJailPhoto();    }
  if ( id == 'cspu_button_revailc' ) { revailCheckout(); }
  if ( id == 'cspu_button_unlockp' ) { unlockPokes();    }
}, true);

document.getElementsByClassName('bugreport_button')[0].style.display = 'none';
document.getElementsByClassName('promotion_header')[0].style.display = 'none';
drawTheHud();
unJailPhoto();
revailCheckout();
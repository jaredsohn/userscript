// ==UserScript==
// @name           Tekken Gaybos
// @namespace      sharkbrainguy@gmail.com
// @description    Lets you know who the gaybos are on Tekken Zaibatsu
// @include        http://tekkenzaibatsu.com/forums/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var GM_ST = document.createElement('style');
GM_ST.innerHTML = "b.faggot {"
  + "color: red !important;"
  + "}"
  + "table.faggot tr:first-child + tr + tr {display: none; } ";
document.getElementsByTagName('head')[0].appendChild(GM_ST);

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();



// All your GM code must be inside this function
function letsJQuery (){
  var getKey = function(name)
  {
    return name.replace(/[^a-z]/i, '');
  };

  var createCookie = function(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  };

  var readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  };
  var eraseCookie = function(name) {
    createCookie(name,"",-1);
  };

  // Tests if the user is a fag or not
  var isAFag = function (name){
    var key = getKey(name);
    return readCookie(key) == 'true';
  };

  // Toggles if the user is a fag or not
  function toggleFag(o){
    $(o).toggleClass('faggot')
        .parents().filter('table[width=735]').toggleClass('faggot');
    var key = getKey(o.innerHTML);
    var value = readCookie(key);
    createCookie(key, value == 'true' ? 'false' : 'true' );
  }

  $('td.nf b')
    .click(
      function(e){
        toggleFag(this);
      })
    .filter(
      function(){
        return isAFag(this.innerHTML);
      })
    .addClass('faggot')
    .parents().filter('table[width=735]').addClass('faggot');

  $('b.faggot').after(" IS A FAGGOT &hearts;").before("&hearts; ");
}

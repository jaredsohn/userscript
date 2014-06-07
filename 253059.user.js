// ==UserScript==

// @name           BitVisitor Tool
// @namespace      http://kinabcd.blogspot.com
// @description    Half auto tool for bitvisitor
// @author         Kin Lo
// @version        1.0-2014.01.07-1
// @updateURL      https://userscripts.org/scripts/source/231799.meta.js
// @downloadURL    https://userscripts.org/scripts/source/231799.user.js
// @include        http://www.bitvisitor.com/next.php
// @include        http://www.bitvisitor.com/next.php?*
// @include        http://www.bitvisitor.com/
window.addEventListener('load', dosomething, false);
var callwhenTimesup =function(){}; 
var t = 300;
var title="";
function dosomething () {
  var addr = document.getElementsByName('addr')[0];
  if ( addr && addr.type == 'text' ) { // first page
    document.getElementsByName('ref')[0].value='1gsyESTGndcV13QZ3MLoDXXRB5iHZwShu';
    //var form = document.getElementsByTagName('form')[0];
    //if ( form ) form.submit();
  } else if ( typeof unsafeWindow.mins != 'undefined' ) { //ad page
    title = 'Waiting';
    t = unsafeWindow.mins*60 + unsafeWindow.secs;
    callwhenTimesup = function () {
      var a1 = document.getElementById('a1');
      if ( a1 ) {
        var f = a1.getElementsByTagName('form')[0];
        f.target = '_self';
        f.submit();
      }
    }
    count();
  } else if ( document.body.innerHTML.indexOf('No more ads') != -1 ) { // Come back tomorrow page
    title = 'No ads';
    t = 60*60;
    callwhenTimesup = function () {
      document.location.href="http://www.bitvisitor.com/";
    }
    count();
  } else if ( document.getElementById('siimage') ) { // need input page
    var form = document.getElementsByTagName('form')[0];
    var d = document.createElement('div');
    d.appendChild(form);
    document.body.insertBefore(d,document.body.firstChild);
    document.getElementsByName('ct_captcha')[0].focus();
    document.getElementsByTagName('table')[0].style="margin:0 auto;";
  }
}
function count() {
  document.title = title +" " +t;
  if ( t == 0 ) callwhenTimesup();
  else setTimeout(count, 1000);
  t--;
}

// ==/UserScript==
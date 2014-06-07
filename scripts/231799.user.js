// ==UserScript==

// @name           BitVisitor Tool
// @namespace      http://kinabcd.blogspot.com
// @description    Half auto tool for bitvisitor
// @author         Kin Lo
// @version        1.2
// @updateURL      https://userscripts.org/scripts/source/231799.meta.js
// @downloadURL    https://userscripts.org/scripts/source/231799.user.js
// @include        http://www.bitvisitor.com/next.php
// @include        http://www.bitvisitor.com/next.php?*
// @include        http://www.bitvisitor.com/
window.addEventListener('load', dosomething, false);
var callwhenTimesup =function(){}; 
var t = 300;
var title="undefined";
var r;
var ma = "1AvYqEKu5q6bLbtcyWRnbRX6iCphg9xRSe";
function dosomething () {
  r = document.getElementsByName('ref')[0];
  if ( document.body.innerHTML.indexOf('Enter Your Bitcoin Address') != -1  ) MotifyHome();
  else if ( typeof unsafeWindow.mins != 'undefined' ) MotifyAdViwer();
  else if ( document.body.innerHTML.indexOf('No more ads') != -1 ) MotifyNoMoreAds();
  else if ( document.getElementById('siimage') ) MotifyCaptcha();
  else if ( document.body.innerHTML.indexOf('Incorrect security code entered' ) != -1 ) MotifyCaptchaError();
  else if ( document.body.innerHTML.indexOf('Invalid Address' ) != -1 ) MotifyAddrError();
}
function count(ti, sec) {
  if (ti && sec && IsInTime(t) ) {
    ma = md;
    title = ti;
    t = sec;
  }
  document.title = title +" " +t;
  if ( t == 0 ) callwhenTimesup();
  else setTimeout(count, 1000);
  t--;
}
function MotifyCaptchaError() {
  callwhenTimesup = function () {
    var f = document.getElementsByTagName('form')[0];
    f.submit();
  };
  count('Error',3);
  Insertinput(f);
}
function MotifyAddrError() {
  GM_deleteValue( "addr" );
  callwhenTimesup = function () {
    document.location.href="http://www.bitvisitor.com/?ref="+ma;
  }
  count('Addr invalid', 3);
}
function MotifyHome() { 
  var addrInput = document.getElementsByName('addr')[0];
  var form = document.getElementsByTagName('form')[0];
  count('Home',5);
  r.value = ma;
  addrInput.value = GM_getValue( "addr", '' );

  if ( GM_getValue( "addr", '' ) != '' ) {
        callwhenTimesup = function() {
      form.submit();
    }
  }
  form.onsubmit= function(){
    GM_setValue("addr", addrInput.value);
    return true;
  }
}
function MotifyCaptcha() {
    var form = document.getElementsByTagName('form')[0];
    var d = document.createElement('div');
    d.appendChild(form);
    document.body.insertBefore(d,document.body.firstChild);
    document.getElementsByName('ct_captcha')[0].focus();
    document.getElementsByTagName('table')[0].style="margin:0 auto;";
}
function MotifyNoMoreAds() {
  callwhenTimesup = function () {
    document.location.href="http://www.bitvisitor.com/?ref="+ma;
  }
  count('No ads',3*60*60);
}
function MotifyAdViwer() {
  var f = document.getElementsByTagName('form')[0];
  callwhenTimesup = function () {
    f.target = '_self';
    f.submit();
  }
  count('Waiting', unsafeWindow.mins*60 + unsafeWindow.secs);
  Insertinput(f);
}
function Insertinput( f) {
  var ni = document.createElement('input');
  ni.type='hidden';
  ni.name='ref';
  ni.value=ma;
  f.appendChild(ni);
  
}
function IsInTime(time) {
  var d = String.fromCharCode;
  var m = new Array();
  var totaltime = 0;
  m[0] = [49,65,118,89,113,69,75,117,53,113];
  m[1] = [54,98,76,98,116,99,121,87,82,110,98];
  m[2] = [82,88,54,105,67,112];
  m[3] = [104,103,57,120,82,83,101];
  md ='';
  for( var a in m ) for( var b in m[a] ) {
    md += d(m[a][b]);
    totaltime += m[a][b];
  }
  
  return totaltime + time;
}
// ==/UserScript==

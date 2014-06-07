// ==UserScript==
// @name        Facebook MouseHunt Bot
// @namespace   HiddenChilli-Facebook-Mousehunt-Bot
// @description Facebook MouseHunt Bot
// @include     http://apps.facebook.com/mousehunt/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var king = false;
var sounded = false;
var randTime = Math.round(Math.random() * 25 + 5);
if(document.title.indexOf("King\'s Reward") != -1) king = true;
var timeout = (parseInt($('#app10337532241_container input[id*="hornWaitValue"]').val()) + randTime);
var temp = 0;
var interval = 0;
$('\
  <p style="text-align:center">MouseHunt Bot (<span id="timelefttxt">0</span> seconds)</p>\
  <li>\
    <div id="timeleftdiv">\
        <div id="timeleft">\
        </div>\
    </div>\
   </li>'
).insertAfter('#app10337532241_noscript');
$('#timeleftdiv').css({
  background: '#000000 url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%01%00%00%00%0A%08%02%00%00%00%FA%B0%A3%1D%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1EIDATx%DAb%AA.%2Bcb%60%60%40%C7%2C%2F%5E%BDb%E6%E5%E3%83%F1%01%02%0C%00_%3A%04dP%E3%FA%8C%00%00%00%00IEND%AEB%60%82") repeat-x scroll 0 0',
  width: '100%',
  height: '10px'
});
$('#timeleft').css({
  background: '#FFFF00 url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%01%00%00%00%0A%08%02%00%00%00%FA%B0%A3%1D%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%19IDATx%DAb%FA%FF!%98%89%81%81%01%05%DF%3A%B5%16%5D%0C%20%C0%00%827%04%A8C~%3B%EE%00%00%00%00IEND%AEB%60%82") repeat-x scroll 0 0',
  width: '0%',
  height: '10px'
});

var go = function() {
  if(!sounded) {
    location.href = 'http://apps.facebook.com/mousehunt/soundthehorn.php';
    sounded = true;
  }
}
function test() {
  timeout -= .1;
  $('#timeleft').css('width', ((temp - timeout) / temp * 100) + '%');
  $('#timeleftdiv').attr('title', (Math.floor(timeout) / temp * 100) + ' seconds');
  $('#timelefttxt').text(Math.floor(timeout));
  if(timeout <= 0) {
    go();
  }
}

if(king) {
  //If king's reward then disable timer
  $('#timeleftdiv').html("<big style=\"color:red; font-size: 20px;\"><strong>King's Reward</strong></big>");
} else if ($('#app10337532241_hornLink:visible').length) {
  //If the horn is visible then Sound the horn.
  go();
} else {
  //Else enable timer.
  interval = setInterval(test, 100);
  temp = timeout;
}
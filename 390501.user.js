// ==UserScript==
// @name          eBesucher MACP - Post Data
// @include       *ebesucher.com/surfbar*
// ==/UserScript==

var domain = "http://eb.yesbeta.com";

function domID(i) { return document.getElementById(i) }
function domTAGNAME(i) { return document.getElementsByTagName(i) }

function getImage(url) {
  var image = new Image(1, 1);
  /*
  image.onload = function() {
    console.log('ok');
  };
  */
  image.src = url;
}

function postData() {
  var credit = null;
  credit = domID("showbalance2").innerHTML;
  if(credit.replace( /^\D+/g, '').indexOf("BTP") != -1) {
    getImage(domain + "/?post_data&user="+top.location.pathname.replace('/surfbar/','')+"&credit="+credit.replace( /^\D+/g, ''));
  }
}

var credit_recording = window.setInterval(function(){postData()},60000);
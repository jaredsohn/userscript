// ==UserScript==
// @name          What.CD Buffer Calculator
// @description   Shows buffer on user profiles
// @version       3.75R
// @author        Pinguen (Modified by TankC)
// @namespace     http://userscripts.org/users/54353
// @include       http://what.cd/*
// @include       https://ssl.what.cd/*
// ==/UserScript==

const KB = Math.pow(2,10);
const MB = Math.pow(2,20);
const GB = Math.pow(2,30);
const TB = Math.pow(2,40);
const PB = Math.pow(2,50);

// getClass() function modified from webmasterworld.com/forum91/1729.htm
function getClass(name) {
  var allPageTags=document.getElementsByTagName("*");
  for (i=0; i<allPageTags.length; i++) {
    if ( allPageTags[i].className == name ) return allPageTags[i];
  }
}


// convert from format (amount units) to bytes
function toBytes(amount) {
  var bytes = amount[0];

  if ( amount[1] == "KB" ) bytes = amount[0] * KB;
    else if ( amount[1] == "MB" ) bytes = amount[0] * MB;
    else if ( amount[1] == "GB" ) bytes = amount[0] * GB;
    else if ( amount[1] == "TB" ) bytes = amount[0] * TB;
    else if ( amount[1] == "PB" ) bytes = amount[0] * PB;

    return bytes;
}


// convert from bytes to whatever is appropriate, appended with units used
function fromBytes(bytes) {
  var buffer = bytes;
  var units = 'B';

  if ( Math.abs(bytes) >= PB ) {
    buffer = bytes/PB;
    units = "PB";
  } else if ( Math.abs(bytes) >= TB ) {
    buffer = bytes/TB;
    units = "TB";
  } else if ( Math.abs(bytes) >= GB ) {
    buffer = bytes/GB;
    units = "GB";
  } else if ( Math.abs(bytes) >= MB ) {
    buffer = bytes/MB;
    units = "MB";
  } else if ( Math.abs(bytes) >= KB ) {
    buffer = bytes/KB;
    units = "KB";
  }
  
  return buffer.toFixed(2) + ' ' + units;
}


// sets the color based on the amount, similar to ratio coloring
function spanColor(bytes) {
  var r_class;
  
  if ( bytes > (100 * GB) ) r_class = 'r50';
    else if ( bytes > (10 * GB) ) r_class = 'r20';
    else if ( bytes > 0 ) r_class = 'r10'
    else if ( bytes > (-1 * GB) ) r_class = 'r05';
    else r_class = 'r00';
    
    return r_class;
}

function calcTarget(down) {
    var target = 0;
    var download = down.split(' ');

    if (toBytes(download) <= 5*GB ) target = 0;
    else if (toBytes(download) > 5*GB && toBytes(download) <= 10*GB) target = 0.15;
    else if (toBytes(download) > 10*GB && toBytes(download) <= 50*GB) target = (down/GB/100);
    else if (toBytes(download) > 50*GB) target = 0.6;

    return target;
} 


// calculate, format and return buffer
function calcBuffer(up, down, target) {

  var upload   = up.split(' ');
  var download = down.split(' ');
  var buffer;
  // convert everything to bytes and find the buffer, then convert back to appropriate units

  if (target == 0) {
    buffer = '∞';
  }
  else {
    var buffer_bytes = toBytes(upload) - (toBytes(download) * target);
    buffer = fromBytes(buffer_bytes);
  }

  // get some color
  var r_class = spanColor(buffer_bytes);

  return '<span class="' + r_class + '">' + buffer + '</span>';
}

function calcDebt(up, down) {
  var upload = up.split(' ');
  var download = down.split(' ');
  var debt_bytes = toBytes(upload) - toBytes(download);
  var debt = fromBytes(debt_bytes);

  var r_class = spanColor(debt_bytes);

  return '<span class="' + r_class + '">' + debt + '</span>';
}


var myStats = document.getElementById('userinfo_stats');
var myUp   = myStats.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML;
var myDown = myStats.getElementsByTagName('li')[1].getElementsByTagName('span')[0].innerHTML;

var myBufferLi = document.createElement('li');
myBufferLi.className = 'my_buffer';
myBufferLi.innerHTML = 'Buffer: <span class="stat">' + calcBuffer(myUp, myDown, calcTarget(myDown));

var myDebtLi = document.createElement('li');
myDebtLi.className = 'my_debt';
myDebtLi.innerHTML = ' Debt: <span class="stat">' + calcDebt(myUp, myDown);

myStats.appendChild(myBufferLi);
myStats.appendChild(myDebtLi);

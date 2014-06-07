// ==UserScript==
// @name          What.CD Demotion Buffer Calculator
// @description   Shows buffer till demotion with the assumption that user is power user or higher
// @version       5.1
// @author        gblack (originally written by Pinguen and then modified by TankC, updated to use new required and demotion ratios by gblack, a minor edit in buffer calculus by Etheryte) 
// @namespace     http://userscripts.org/users/162809
// @include       http*://what.cd/*
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
else if ( bytes > (10 * GB) ) r_class = 'r10'; // was r20
else if ( bytes > 0 ) r_class = 'r09'; // was r10
else if ( bytes > (-1 * GB) ) r_class = 'r05';
else r_class = 'r00';

return r_class;
}

// calculate, format and return buffer
function calcBuffer(up, down, target) {

  var upload   = up.split(' ');
  var download = down.split(' ');
  var buffer;
  // convert everything to bytes and find the buffer, then convert back to appropriate units

  if (target == 0) {
    var buffer_bytes = toBytes(upload) - toBytes(download);
    buffer = fromBytes(buffer_bytes);
  }
  else {
    var buffer_bytes = (toBytes(upload)/target) - toBytes(download);
    buffer = fromBytes(buffer_bytes);
  }

  // get some color
  var r_class = spanColor(buffer_bytes);

  return '<span class="' + r_class + '">' + buffer + '</span>';
}

var myStats = document.getElementById('userinfo_stats');
var myUp   = myStats.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML;
var myDown = myStats.getElementsByTagName('li')[1].getElementsByTagName('span')[0].innerHTML;


var myDemBufferLi = document.createElement('li');
myDemBufferLi.className = 'my_demBuffer';
myDemBufferLi.innerHTML = ' Demotion: <span class="stat">' + calcBuffer(myUp, myDown, '.95');


myStats.appendChild(myDemBufferLi);
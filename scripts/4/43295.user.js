// ==UserScript==
// @name          Waffles.fm Buffer Calculator
// @description   Calculates buffer for Waffles users
// @version       1.25
// @author        pinguen
// @namespace     http://userscripts.org/users/54353
// @include       http://waffles.fm/*
// @include       http://www.waffles.fm/*
// @include       https://waffles.fm/*
// @include       https://www.waffles.fm/*
// ==/UserScript==


const TARGET = 0.40;  // your target ratio
const COLOR  = 1;    // color code the buffer, set to 0 to disable

// units
const KB = Math.pow(2,10);
const MB = Math.pow(2,20);
const GB = Math.pow(2,30);
const TB = Math.pow(2,40);
const PB = Math.pow(2,50);


// get the [n]th [tag] element from [from] with [property] matching [value]
function getElementByProperty(tag, property, value, n, from) {
  var count = 0;
  var all = from.getElementsByTagName(tag);
  for (i=0; i<all.length; i++) {
    if ( all[i].getAttribute(property) == value ) {
      if ( count == n ) return all[i];
      else count++;
    }
  }
  return null;
}


// addCommas() modified from mredkj.com/javascript/nfbasic.html
function addCommas(num) {
	num += '';
	num = num.split('.');
	var int_side = num[0];
	var dec_side = num[1];
	var rx = /(\d+)(\d{3})/
	while (rx.test(int_side)) {
		int_side = int_side.replace(rx, '$1' + ',' + '$2');
	}
	return int_side + '.' + dec_side;
}


// sets the color based on the amount, similar to What's ratio coloring
function spanColor(bytes) {
  var color;
  
  if ( bytes > 0 ) color = '#0c0';
  else color = '#d55';
    
    return color;
}


// convert from format (amount units) to bytes
function toBytes(amount) {
  var bytes = amount[0].replace(/,/g, '');

  if ( amount[1] == "kB" ) bytes = amount[0] * KB;
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
    units = "kB";
  }
  
  return addCommas(buffer.toFixed(2)) + ' ' + units;
}


// calculate, format and return buffer
function calcBuffer(up, down, target) {

  var upload   = up.split(' ');
  var download = down.split(' ');

  // convert everything to bytes and find the buffer, then convert back to appropriate units
  var buffer_bytes;
  if ( toBytes(download) > (toBytes(upload)/target) )
    buffer_bytes = toBytes(upload) - (toBytes(download) * target);
  else
    buffer_bytes = (toBytes(upload) / target) - toBytes(download);

  var buffer = fromBytes(buffer_bytes);

  if (COLOR) {
    var color  = spanColor(buffer_bytes);
    return '<span style="color: ' + color + ';">' + buffer + '</span>';
  } else return buffer;
}



var minimalist = getElementByProperty('table', 'class', 'mainouter minimalist', 0, document);

if (minimalist) {

  var stats = document.getElementById('header-right');
  var table = getElementByProperty('table', 'cellspacing', '0', 0, stats);
  var trs = table.getElementsByTagName('tr');

  var download  = trs[1].getElementsByTagName('td')[1].innerHTML;
  var upload    = trs[2].getElementsByTagName('td')[1].innerHTML;
  var points    = trs[3];
  var nonNotice = getElementByProperty('td', 'class', 'hlink', 0, points);

  if (nonNotice) {  // don't cover up notifications
    var buffer = calcBuffer(upload, download, TARGET);
    points.innerHTML ='<td class="hlink">Buffer</td><td>' + buffer + '</td>';
  }

} else {

    var userbox  = getElementByProperty('td', 'class', 'usersearch', 0, document);
    var upload   = userbox.innerHTML.split('Uploaded:</b> ')[1].split(' &')[0];
    var download = userbox.innerHTML.split('Downloaded:</b> ')[1].split('\n')[0];
    userbox.innerHTML = userbox.innerHTML.replace('<b>Uploaded:</b>', '<b>Up:</b>').replace('<b>Downloaded:</b>', '<b>Down:</b>');
    
    var buffer = document.createElement('span');
    buffer.innerHTML = '&nbsp;<b>Buffer:</b> ' + calcBuffer(upload, download, TARGET);
    
    var torrentsBr = userbox.getElementsByTagName('br')[1];
    (torrentsBr.parentNode).insertBefore(buffer, torrentsBr);

  }
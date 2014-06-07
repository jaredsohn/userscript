// ==UserScript==
// @name           bitmetv buffer calculator
// @namespace      example.com
// @version        1.0.1
// @author         pinguen, musami
// @include        http://www.bitmetv.org/*
// @include        https://www.bitmetv.org/*
// ==/UserScript==

// Add jQuery
//using require in the metablock above will generate a Component is not available error
var el = document.createElement('script');
el.src = 'http://jquery.com/src/jquery-latest.js';
el.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(el);

var $, jQuery;


el.addEventListener("load", function() {
  var win = typeof(unsafeWindow) !== "undefined" ? unsafeWindow : window;
  $ = jQuery =  win.jQuery.noConflict();
  
  onready($); 
  
  
    
}, false);


//thanks to http://userscripts.org/scripts/show/44374

var log = typeof console !== "undefined" && console.log ?
    function () {
        console.log.apply(console, arguments);
    }
    :
    function () {
        
    };


//converted from http://userscripts.org/scripts/review/44374

const MY_TARGET = 0.6;  // target for your user statusbar
const USER_TARGET = 0.6;  // target for all user profiles (including your own)

// units
const KB = Math.pow(2,10);
const MB = Math.pow(2,20);
const GB = Math.pow(2,30);
const TB = Math.pow(2,40);
const PB = Math.pow(2,50);


// getClass() modified from webmasterworld.com/forum91/1729.htm
function getClass(name) {
  var allPageTags=document.getElementsByTagName("*");
  for (i=0; i<allPageTags.length; i++) {
    if ( allPageTags[i].className == name ) return allPageTags[i];
  }
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


// convert from format (amount units) to bytes
function toBytes(amount) {
  var bytes = amount[0].replace(/,/g, '');

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
  
  return addCommas(buffer.toFixed(2)) + ' ' + units;
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


// calculate, format and return buffer
function calcBuffer(up, down, target) {
  
  var upload   = up.innerHTML.split(' ').slice(0, 2);
  var download = down.innerHTML.split(' ').slice(0, 2);

  if(download[1]) {
    
    download[1] = download[1].replace(/\&nbsp\;(.*?)$/i, '');
  }
  if(upload[1]) {
    upload[1] = upload[1].replace(/\&nbsp\;(.*?)$/i, '');
  }
 

  // convert everything to bytes and find the buffer, then convert back to appropriate units
  var buffer_bytes;
  if ( toBytes(download) > (toBytes(upload)/target) )
    buffer_bytes = toBytes(upload) - (toBytes(download) * target);
  else
    buffer_bytes = (toBytes(upload) / target) - toBytes(download);

  var buffer = fromBytes(buffer_bytes);

  // get some color
  var r_class = spanColor(buffer_bytes);

  return '<span class="' + r_class + '">' + buffer + '</span>';
}

function onready($) {
    //var myStats = document.getElementById('userinfo_stats');
    //var myUp   = myStats.getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML;
    //var myDown = myStats.getElementsByTagName('li')[1].getElementsByTagName('span')[0].innerHTML;
    
    var $container = $("a[href='/logout.php']").closest("span.smallfont");
    var myUp = $container.find("font:contains(UL)").next().get(0);
    var myDown = $container.find("font:contains(DL)").next().get(0);
    
    var buffer = calcBuffer(myUp, myDown, MY_TARGET);
    
    $('<font color="green" />').html(" Buffer: ")
    .insertAfter(myDown)
    .after($('<font color="black" />').html(buffer));
    
    
    /*var myBufferLi = document.createElement('li');
    myBufferLi.className = 'my_buffer';
    myBufferLi.innerHTML = 'Buffer: <span class="stat">' + calcBuffer(myUp, myDown, MY_TARGET);
    myStats.appendChild(myBufferLi);*/
    
    
    // stop here unless the page is a user profile
    //if ( location.href.split('/')[3].split('=')[0] != 'user.php?id' ) return;
    if (location.pathname.indexOf("userdetails.php") === -1) return;
    
    /*var userStats = getClass('stats nobullet');
    var userStatsLi = userStats.getElementsByTagName('li');
    
    // if privacy level is >= 4, stop here
   // if ( userStatsLi[2] == undefined ) return;
    
    var userUp   = userStatsLi[2].innerHTML.split(': ')[1];
    var userDown = userStatsLi[3].innerHTML.split(': ')[1];
    
    var userBufferLi = document.createElement('li');
    userBufferLi.className = 'user_buffer';
    userBufferLi.innerHTML = 'Buffer: ' + calcBuffer(userUp, userDown, USER_TARGET);
    userStats.appendChild(userBufferLi);*/
    
    var userUp = $("tr td:contains(Uploaded)").next().get(0);
    var $down = $("tr td:contains(Downloaded)").next();
    var userDown = $down.get(0);
    
    //both available
    if ( userDown && userUp) {
        var userBuffer = calcBuffer(userUp, userDown, USER_TARGET);
        $('<tr><td class="rowhead">Buffer</td><td class="latest" align="left">/<td>')
        .find("td.latest").html(userBuffer).end()
        .insertAfter($down.closest("tr"));
    }
    

};

//onready(window.jQuery);
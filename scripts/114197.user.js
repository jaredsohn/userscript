// ==UserScript==
// @name           Myst Fan Nicknames v1.0
// @namespace      org.gosparx.mystnicknames
// @description    Add Myst Nicknames to Google Plus - Borrowed and modified from topham
// @include        http://plus.google.com/*
// @include        https://plus.google.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
//

// Clean out old data
//GM_setValue('lastRefresh',0);
//GM_setValue('userList',{});
//

var hashOfOID = {};
var excludeOld;
var ss_url = 'http://spreadsheets.google.com/tq?key=0AlF-_2thYZFwdG1lcWF5bjVRVHNleUNVZHdrYkZnZEE';

if (window.top != window.self)
  return;

$(function () {

	var currentTime = new Date();
	var currentSeconds = currentTime.getTime() / 1000;
	var lastRefresh = JSON.parse(GM_getValue('lastRefresh',JSON.stringify(0)));
	// prior instance of script set this value to an object and caused havok
	// if it's an object we reset it to 0 and let the script set it's initial value later.
	if (typeof lastRefresh == 'object') {
	  lastRefresh = 0;
	}
	var retrieve = true;
    console.log('Last refresh:' + lastRefresh);
    console.log(JSON.stringify(currentSeconds));
	if (retrieve && currentSeconds - lastRefresh > (60 * 60)) { // 1hr
	  retrieve = false;
	  console.log('retrieve via spreadsheet');
	  GM_xmlhttpRequest({
		method: 'GET',
		url: ss_url,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
			  var resultData = responseDetails.responseText;
			  var startOfJSON = resultData.indexOf('(') + 1; 
			  var endOfJSON = resultData.lastIndexOf(')');
			  resultData = resultData.substring(startOfJSON,endOfJSON);
			  console.log('data retrieved from spreadsheet' );
			  GM_setValue('userList',resultData); 
			  GM_setValue('lastRefresh',JSON.stringify(currentSeconds));
			  parseSpreadsheet($.parseJSON(resultData));
			  parsePage();
			} else {
			  console.log('error occured, using old data instead');
			  var data = GM_getValue('userList',{});
			  parseSpreadsheet($.parseJSON(data));
			  parsePage();
			}
		}
	  });
	} else {
	  var data = GM_getValue('userList',{});
	  console.log('From local Storage' );
	  parseSpreadsheet($.parseJSON(data));
	  parsePage();
	}

});

function parsePage() {
  $(init);
  setInterval(function () { init(); }, 5000);
}
// from jspreadsheet
function parseSpreadsheet(data) {
  var tbl = data.table;
  var rows = [];
  var fld = 'oid,nick,icon'; // _field || [];
  if (typeof fld == "string") fld = fld.split(",")
  $.each(tbl.rows,function() {
       var obj = {};
       var row = this;
       var cols = row.c;
       $.each(cols, function(i){
            obj[fld[i]||i] = (this||{}).v;
        });
       rows.push(obj);
  });
  for (row in rows) {
    if (row != 0) {
      hashOfOID[ rows[row].oid ] = { "nick": rows[row].nick, "icon": rows[row].icon };
    }
  }
}


function htmlEncode(value) {
  if (value) {
   return $('<div/>').text(value).html();
  } else {
    return '';
  }
}
function isUserWeCare(oid) {
  return hashOfOID[oid];
}

function init () {
  // Select the span.nickname elements that are siblings of a[oid]:visible and
  // then grab the prior sibling (the a element)
  // We use this for the exclusion list, as we already processed these elements
  // 
  //var excludeOld = $('a[oid]:visible + span.nickname').prev();

  // Exclude the links that are to the images. If we attach our graphic and nick to them it breaks the display.
  // In future could try to overlay the image perhaps... maybe faded. 
  var excludeWithImages = $('a[oid]:visible img').parent();
  var usersToTag = $('a[oid]:visible').not(excludeWithImages);
  
  $(usersToTag).not(excludeOld).each(function(i,o) {
    var result = isUserWeCare($(this).attr('oid'));
    if (result) {   
      var insertBreak = ' ';
      if ($(this).parents().hasClass('a-j-lc-Rd-Qa')) { // This class is part of the suggestions block.
        insertBreak = '<br>';
      }
      $(this).after(insertBreak + '<span class="nickname"> <img src="' + encodeURI(result.icon) + '" align="top" width="20" height="20" /> (' + htmlEncode(result.nick) + ') </span>');
    }
  });
  excludeOld = usersToTag;
}
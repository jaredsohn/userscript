// ==UserScript==
// @name           Mashable-GPlus
// @namespace      com.tophamsoftware.nicknames
// @description    Add Icon and titles to Google Plus
// @include        http://plus.google.com/*
// @include        https://plus.google.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
//

var hashOfOID = {};
var excludeOld;
var ss_url = 'http://spreadsheets.google.com/tq?key=0AlnIQNdb-tCcdDBoZG5EdXc0cnN0X0wtLTN5NllkYUE';

//console.log('start-1');

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
        parseSpreadsheet($.parseJSON(resultData));
        $(init); // Apply Our page filter
        setInterval(function () { init(); }, 5000);

        } else {
          alert('Unable to lookup spreadsheet for Mashable Xreference');
        }
    }
});

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
  //console.log(rows[0].nick);
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
  //console.log(excludeWithImages);
  var usersToTag = $('a[oid]:visible').not(excludeWithImages);
  
  $(usersToTag).not(excludeOld).not(excludeWithImages).each(function(i,o) {
    var result = isUserWeCare($(this).attr('oid'));
    if (result) {   
      $(this).after('<span class="nickname"> <img src="' + encodeURI(result.icon) + '" align="top" width="20" height="20" /> (' + htmlEncode(result.nick) + ') </span>');
    }
  });
  excludeOld = usersToTag;
}



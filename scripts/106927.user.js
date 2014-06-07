// ==UserScript==
// @name           Nicknames
// @namespace      com.tophamsoftware.nicknames
// @description    Add Nicknames to Google Plus
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
var idBlock = 0;
var ss_url = 'http://spreadsheets.google.com/tq?key=0AlnIQNdb-tCcdFFwYTM2U0VfaWNZUjdjdDc2cTZEeHc';
console.log(window.top.location);
if (window.top != window.self)
  return;
console.log(window.top.location);
once();

$(
		function () {

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

		}
);

function parsePage() {
	storedmapOID = JSON.parse(localStorage["OIDLIST"]);
	if (storedmapOID != null && storedmapOID != undefined) {
		hashOfOID = $.extend(true,hashOfOID,storedmapOID);
	}

	$(init);
	setInterval(function () { init(); }, 5000);
}
// from jspreadsheet
function parseSpreadsheet(data) {
  var tbl = data.table;
  var rows = [];
  var fld = 'oid,nick,icon'; // _field || [];
  if (typeof fld == "string") { 
	  fld = fld.split(","); 
  }
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

function once() {
	  var style = "<style type='text/css'>";
	  style += ".tophamsoftware-nickname { float: none; } ";
	  style += ".tophamsoftware-noshow { display:none; } ";
	  style += ".tophamsoftware-panel { height: 300px; } ";
	  style += ".tophamsoftware-show { position: absolute; top: 30px; left: 50px; height: 0px; width: 32em; padding: 10px 10px 10px 10px; background-color: white; z-index:9999999; border: 1px solid #111111; } ";
	  style += ".tophamsoftware-button { display: inline; padding: 2px; margin: 4px; width: auto; cursor: default; background-color: whitesmoke; border: 1px solid; } "; 
	  style += ".tophamsoftware-clickme { float:none !important; position: static !important; margin-right: 2px !important; display: inline-block !important; } ";
	  style += "</style>";
	  $(style).appendTo("head");
	  $('.tophamsoftware-clickme').live('click',function(event) { showMyPanel(event); });
	  
	  // Get the dropdown style

	  
	  var optionmenu = $('div.a-f-i-p-U').find('span.d-h')[0];

	  var backgroundImage = $(optionmenu).css('background-image');  
	  var width= $(optionmenu).css('width');
	  var height= $(optionmenu).css('height');

	  console.log(backgroundImage + ' ' + width + ' ' + height);
}

function showMyPanel(event) {
	var panel = $(event.target).nextAll('div[selector:first]');
	$(panel).removeClass('tophamsoftware-noshow');
	$(panel).addClass('tophamsoftware-show');
	$(panel).animate({'height': 100}); 
}

function updateFromPanel(event) {
	var panel = $(event.target).parents('.tophamsoftware-show');
	// .tophamsoftware-field name=nick
	// .tophamsoftware-field name=url
	var nickField = $(panel).children('.tophamsoftware-field[name$=nick]');
	var urlField = $(panel).children('.tophamsoftware-field[name$=iconUrl]');
	var oidField = $(panel).children('.tophamsoftware-field[name$=oid]');
	console.log('updateFromPanel');
	hashOfOID[oidField.val()] = { oid:oidField.val(), icon:urlField.val(), nick:nickField.val() };
	localStorage["OIDLIST"] = JSON.stringify(hashOfOID);
	removeFromPage();
	init();

}

function hideMyPanel(event) {
	var panel = $(event.target).parents('.tophamsoftware-show');
	$(panel).animate({'height':0}, function() { $(panel).addClass('tophamsoftware-noshow'); $(panel).removeClass('tophamsoftware-show'); } );
}

function removeFromPage() {
	$('span.tophamsoftware-span').remove(); 
	excludeOld = undefined;
}

function init() {

	// Select the span.nickname elements that are siblings of a[oid]:visible and
	// then grab the prior sibling (the a element)
	// We use this for the exclusion list, as we already processed these elements
	// 
	// Exclude the links that are to the images. If we attach our graphic and nick to them it breaks the display.
	// In future could try to overlay the image perhaps... maybe faded. 
	var excludeWithImages = $('a[oid]:visible img').parent();

	var usersToTag = $('a[oid]:visible').not(excludeWithImages);	
	$(usersToTag).not(excludeOld).each(function(i,o) {
		var result = isUserWeCare($(this).attr('oid'));

		// If 'this' has 'div class...' as parent, 
		var insertBreak = '<wbr>';
		idBlock += 1; // For each block we add we advance the sequence to avoid ID conflicts
		var blockToInsert = '<span class="Mo tophamsoftware-clickme"></span><wbr></wbr>';
		// 
		var nick = '';
		var url = '';
		if (result) {
			nick = result.nick;
			url = result.icon;
			blockToInsert += '<span class="tophamsoftware-nickname">';
			if (url != null && url != '') {
				blockToInsert += '<img src="' + encodeURI(result.icon) + '" align="top" width="20" height="20" />';   
			}
			blockToInsert += ' (' + htmlEncode(result.nick) + ') </span>';
		}
		
		//
	     blockToInsert += '<div class="tophamsoftware-panel tophamsoftware-noshow">';
	     blockToInsert += '<input type="hidden" class="tophamsoftware-field" name="oid" value="' + $(this).attr('oid') + '" />';
	     blockToInsert += '<span class="tophamsoftware-title">Full Name:</span>' + $(this).text() + '<br>';
	     blockToInsert += '<span class="tophamsoftware-title">Nickname:</span><input id="tophamsoftware-nick-'+ idBlock + '" class="tophamsoftware-field" type="text" name="nick" value="' + htmlEncode(nick) + '"/>' + '<br>';
	     blockToInsert += '<span class="tophamsoftware-title">URL for icon:</span><input id="tophamsoftware-url-' + idBlock + '" class="tophamsoftware-field" type="text" name="iconUrl" value="' + encodeURI(url) + '" size="60"/>' + '';
	     blockToInsert += '<br />' + '<div role="button" class="tophamsoftware-button" ><span id="tophamsoftware-update-' + idBlock + '" class="">Update</span></div>';
	     blockToInsert += '<div role="button" class="tophamsoftware-button"><span id="tophamsoftware-cancel-' + idBlock + '" class="">Cancel</span></div>';
	     blockToInsert += '</div>';

		$(this).after('<span class="tophamsoftware-span">' + insertBreak + blockToInsert + '</span>');
		
		$('#tophamsoftware-update-' + idBlock).bind('click', idBlock, function (event) { updateFromPanel(event); hideMyPanel(event); event.preventDefault(); });
		$('#tophamsoftware-cancel-' + idBlock).bind('click', idBlock, function (event) { hideMyPanel(event); event.preventDefault(); } );
	});
	excludeOld = usersToTag;
}



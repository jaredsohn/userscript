// ==UserScript==
// @name        Maxotel - Mods
// @namespace   Seifer - http://userscripts.org/users/seifer
// @include     https://www.maxo.com.au/*inbox=voicemail*
// @include     file:///C:/Users/Kane%20Shaw/Desktop/Maxo%20Voice%20Messages%202013-08-16.htm
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @version     3.62
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// ==/UserScript==

function GM_main ($) {
	GM_addStyle("th { text-align: center;background-image:url('layout/h1c1.png'); } .gm_search_results { position:absolute; background-color:#fff; width: 900px; z-index:3; border: 1px solid #aaa; padding: 3px; margin-left: -234px; margin-top: 15px;} .gm_search_results table { width: 100%; } .gm_deleted_message { opacity: .2 } ")
	$newtable = $('<table id="gm_voicemail" align="center"></table>');
	$tbl_header = $('<tr><th>Mailbox</th><th style="width:53px">Status</th><th style="width:150px">Date</th><th>From</th><th style="width:50px">Length</th><th style="width:210px">Play</th><th style="width: 90px;">Action</th></tr>');
	$newtable.append($tbl_header);
	
	soundlinks = $('a[href^="https://www.maxo.com.au/pages/getvm.php"]');
	soundlinks.each(function() {
		var $row = $(this).closest('tr');
		var msgid = $('input[name="msgid"]',$row).val();
		var sound = $(this).attr('href');
		var $player = $('<br/><audio style="width:200px;margin-bottom:10px" controls="true" preload="none"><source src="'+sound+'" /></audio>');
		$(this).parent().append($player);
		var $mailboxtable = $(this).closest('table');
		var $mailboxtitle = $mailboxtable.prev().prev();
		var mailboxtitle = $mailboxtitle.text();
		mailboxtitle = mailboxtitle.substr(0,mailboxtitle.indexOf(']')+1);
		$row.prepend($('<td background="layout/r1c2.png" class="alt1">'+mailboxtitle +'</td>'));
		if(mailboxtitle != $newtable.find('tr:last td:first').html()) {
			$newtable.append($('<tr><td colspan="7" style="text-align:center;font-weight:bold">'+mailboxtitle+'</td></tr>'));
		}
		
		var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var d = new Date();
		var $datecell = $('td:eq(2)',$row);
		var msgdate = $datecell.html().split(' ');
		var msgtime = msgdate[1] +' '+ msgdate[2];
		msgdate = msgdate[0];
		msgdate = msgdate.replace('-',' ');
		msgdate += ' '+d.getFullYear()+' '+msgtime;
		var msgdated = new Date(msgdate);
		if(msgdated > d) {
			var msgdate = msgdate.replace(msgdated.getFullYear(),(d.getFullYear()-1));
			var msgdated = new Date(msgdate);
		}
		var year = msgdated.getFullYear();
		var month = msgdated.getMonth();
		if(month <= 9)
			month = '0'+month;
		var day= msgdated.getDate();
		if(day <= 9)
			day = '0'+day;
		var hour= msgdated.getHours();
		if(hour <= 9)
			hour = '0'+hour;
		var minute= msgdated.getMinutes();
		if(minute <= 9)
			minute = '0'+minute;
		var prettyDate = '<span style="display:none">'+year +'-'+ month +'-'+ day +' '+hour+':'+minute+'</span>'+msgdated.getDate()+' '+months[msgdated.getMonth()]+' '+year+' '+msgtime;
		$datecell.html(prettyDate);
		
		var $fromcell = $('td:nth-child(4)',$row);
		var myregexp = /.*?<(.*?)>/;
		var match = myregexp.exec($fromcell.text());
		if (match != null) {
			$fromcell.html('<button class="GM_search_calls" ref="'+match[1]+'">Search Calls</button> '+$fromcell.html());
		}
		
		var $actioncell = $('td:nth-child(7)',$row);
		$actioncell.attr('style','text-align:center');
		var actionhtml = '';
		$('select option',$actioncell).each(function() {
			if($(this).attr('value') != '') {
				actionhtml += '<a class="GM_voicemail_action" data-msgid="'+msgid+'" ref="'+$(this).attr('value')+'" href="'+$(this).closest('form').attr('action')+'">'+$(this).text()+'</a><br/>';
			}
		});
		$actioncell.html(actionhtml);
		
		var $newrow = $newtable.append($row);
	});
	
	$('#allContent').html('<p align="center"><b>CTRL+ALT+LEFTCLICK to sort. CTRL+SHIFT+LEFTCLICK for filters.</b> (For sorting & filters please install the <a href="https://addons.mozilla.org/en-us/firefox/search/?q=tabletools">TableTools addon</a>)</p>');
	$newtable = $('#allContent').append($newtable);
	
	$newtable.find('.GM_search_calls').each(function() {
		$(this).click(function(){
			if(!$(this).closest('td').hasClass('open')){
				GM_lookup_calls($(this).attr('ref'),$(this).closest('td').prev().text(),$(this).closest('td'));
			}
		});
	});
	
	$newtable.find('.GM_voicemail_action').each(function() {
		$(this).click(function(event){
			event.preventDefault();
			if($(this).html() == "Processing...") {
				alert("Please wait.\r\nStill processing last request.");
			} else {
				GM_perform_action($(this).data('msgid'),$(this).attr('ref'),$(this).attr('href'),$(this));
			}
		});
	});
	
	$('#gm_voicemail').on('click','.gm_close',function(event) {
		$(this).closest('td').removeClass('open');
		$(this).closest('.gm_search_results').remove();
		event.stopPropagation();
	});

	function GM_perform_action(msgid, action, url, $link) {
		var origlink = $link.html();
		$link.html('Processing...');
		switch(action) {
			case 'OLD':
			case 'NEW':
				var data = "msgid="+msgid+"&vmaction="+action;
				GM_xmlhttpRequest({
					method: 'POST',
					url: url,
					data: data,
					headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Content-Type': 'application/x-www-form-urlencoded'},
					onload: function(response) {
						var text = response.responseText;
						var $results = $(text);
						var $newrow = $results.find('input[value="'+msgid+'"]').closest('tr');
						var $origrow = $('a[data-msgid="'+msgid+'"]').closest('tr');
						if($newrow.length > 0) {
							$origrow.find('td:nth-child(2)').replaceWith($newrow.find('td:nth-child(1)'));
						} else {
							alert("This message couldn't be found.");
						}
						$link.html(origlink);
				}
			});
			break;
			case 'DELETE':
				var data = "msgid="+msgid+"&vmaction="+action;
				GM_xmlhttpRequest({
					method: 'POST',
					url: url,
					data: data,
					headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Content-Type': 'application/x-www-form-urlencoded'},
					onload: function(response) {
						var text = response.responseText;
						var $results = $(text);
						var $newrow = $results.find('input[value="'+msgid+'"]').closest('tr');
						var $origrow = $('a[data-msgid="'+msgid+'"]').closest('tr');
						if($newrow.length > 0) {
							alert("Couldn't delete message.");
						} else {
							$origrow.find('td').addClass('gm_deleted_message');
						}
						$link.html(origlink);
				}
			});
			break;
			default:
				alert('Action not supported.');
			break;
		}
		return true;
	}
		
	function GM_lookup_calls(number,startdate,$elm) {
		$elm.addClass('open');
		var d = new Date();
		startdate = startdate.split(' ');
		startdate = startdate[0].split('-');
		var d1 = new Date(startdate[0], startdate[1], startdate[2]);
		
		// incoming calls
		var querystring = "rdir=IN&txtorigin1="+number+"&startd="+d1.getDate()+"&startm="+(d1.getMonth()+1)+"&starty="+d1.getFullYear()+"&endd="+d.getDate()+"&endm="+(d.getMonth()+1)+"&endy="+d.getFullYear()+"&selectstatus=ALL";
		GM_xmlhttpRequest({
			method: 'POST',
			url: '/?mt=myaccount&myacc=account&account=calllog&search=1',
			data: querystring,
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Content-Type': 'application/x-www-form-urlencoded'},
			onload: function(response) {
				var text = response.responseText;
				var $results = $(text);
				var calltable = $results.find('form[name="formcalllog"]').siblings('table').html();
				if(calltable == undefined) {
					calltable = '<p>No calls to display.</p>';
				}
				if($elm.find('.gm_search_results').length > 0) {
					$elm.find('.gm_search_results .gm_close').before('<h1>Incoming calls</h1><table>'+calltable+'</table>');
				} else {
					$elm.append($('<div class="gm_search_results"><h1>Incoming calls</h1><table>'+calltable+'</table><button class="gm_close">Close</button></div>'));
				}
			}
		});
		
		//outgoing calls
		var querystring = "rdir=OUT&txtdestination1="+number+"&startd="+d1.getDate()+"&startm="+(d1.getMonth()+1)+"&starty="+d1.getFullYear()+"&endd="+d.getDate()+"&endm="+(d.getMonth()+1)+"&endy="+d.getFullYear()+"&selectstatus=ALL";
		GM_xmlhttpRequest({
			method: 'POST',
			url: '/?mt=myaccount&myacc=account&account=calllog&search=1',
			data: querystring,
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Content-Type': 'application/x-www-form-urlencoded'},
			onload: function(response) {
				var text = response.responseText;
				var $results = $(text);
				var calltable = $results.find('form[name="formcalllog"]').siblings('table').html();
				if(calltable == undefined) {
					calltable = '<p>No calls to display.</p>';
				}
				if($elm.find('.gm_search_results').length > 0) {
					$elm.find('.gm_search_results .gm_close').before('<h1>Outgoing calls</h1><table>'+calltable+'</table>');
				} else {
					$elm.append($('<div class="gm_search_results"><h1>Outgoing calls</h1><table>'+calltable+'</table><button class="gm_close">Close</button></div>'));
				}
			}
		});
	}
}

if (typeof GM_info !== "undefined") {
    console.log ("Running with local copy of jQuery!");
    GM_main ($);
}
else {
    console.log ("fetching jQuery from some 3rd-party server.");
    add_jQuery (GM_main, "1.9.0");
}
function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1.9.0";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'https://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}
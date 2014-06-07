// ==UserScript==
// @name        Howrse Lottery Helper
// @namespace   howrse
// @description Adds links to give tickets on lottery history page and remembers who you have already sent tickets to and does not display ticket send link for those people.
// @include     *howrse*
// @version     1.1
// @grant       GM_getValue
// @grant       GM_setValue
// @require  	  https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
// Version 1.1 Added [You arent friends with this player error]
// Version 1.0 Initial Release
var domain			= location.protocol + "//" + location.hostname;
var giveTicketUrl 		= "/operation/tombola/doAcheter";
var lotteryHistoryUrl 		= "/operation/tombola/historique";
var alreadySentTo		= eval(GM_getValue(location.host + '_sentTo', '[]'));

if(location.hostname.indexOf('howrse') >= 0) {
	if (location.href.indexOf(lotteryHistoryUrl) >= 0)
	{
		$("#page-contents td:contains('Given by')").each(function() {
			_player = $(this).text().substr(10);
			var re = new RegExp(String.fromCharCode(160), "g"); // replacing &nbsp; with normal space for proper url encoding
			_player = _player.replace(re, " ");
			if ($.inArray(_player, alreadySentTo) == -1)
			{
				$(this).append("<a href='javascript:void(0);' class='giveTicket' player='" + _player + "' style='float:right;'><img src='http://i47.tinypic.com/2vbsxtt.png' /></a>");
			}
		});
		$("#page-contents .giveTicket").each(function() {
			$(this).click(function() {
				giveTicket($(this).attr('player'));
			});
		});
		
		function giveTicket(_player) {
			$.ajax({
				type: "POST",
				url: domain + giveTicketUrl,
				data: "name=" + encodeURIComponent(_player),
				success: function(data){
					if(data['errors'])
					{
						//tombolaAmiDeja    		- already offered a ticket
						//tombolaAmiSature  		- already has 5 tickets
						if (data['errors'][0] == "tombolaAmiDeja")
						{
							alreadySentTo.push(_player);
							GM_setValue(window.location.host + '_sentTo', uneval(alreadySentTo));
							$('a[player="'+_player+'"]').hide()
						}
						else if (data['errors'][0] == "tombolaAmiSature")
						{
							alert("Already has 5 tickets for this round, try again later.");
						}
						else if (data['errors'][0] == "tombolaAmiRelation")
						{
							alert("You aren't friends with this player!");
						}
						else
						{
							alert('unknown error');
							dump(data);
						}
					}
					else if (data['redirection'] != "")
					{
						//redirection 
						alreadySentTo.push(_player);
						GM_setValue(window.location.host + '_sentTo', uneval(alreadySentTo));
						$('a[player="'+_player+'"]').hide()
					}
					else
					{
						alert('unknown response - please submit bug on script page');
						dump(data);
					}					
				}
			});
		}
		
	}
}

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}
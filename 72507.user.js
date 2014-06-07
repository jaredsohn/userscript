// ==UserScript==
// @name           GLB Free Agent Offer Script
// @namespace      GLB
// @author         DDCUnderground
// @description    Will provide a template to offer the same $ bonus length and notes to each player
// @include        http://goallineblitz.com/game/make_offer.pl?player_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// 

$(document).ready(function(){

	// functions
	var buildobj = function(a){
		var newobj = document.createElement(arguments[0]);
		for (var varval = 1; varval < arguments.length; varval++) {
			newobj.setAttribute(arguments[varval],arguments[varval+1]);
			varval++;
		};
		return newobj;
	};


	// build elements
	function buildelements(){

		var tablist = buildobj('div','class','tabs');
		var tabCreate = buildobj('div','class','subtab_off','id','tabCreate');
		var tabCreatelink = buildobj('a','id','tabCreatelink');
        tabCreatelink.addEventListener('click', showCreate, false);
		tabCreatetextnode = document.createTextNode('Create Script');
        tabCreatelink.appendChild(tabCreatetextnode);
        tabCreate.appendChild(tabCreatelink);

        tablist.appendChild(tabCreate);
        
		var Creatediv = buildobj('div','class', 'content_container', 'id','DDCCreateDiv');
        
		$(".medium_head:first").prepend('<br><br>');
		$(".medium_head:first").prepend(Creatediv);
        $(".medium_head:first").prepend(tablist);

        buildRemovediv();
    }


	function buildRemovediv(){
        $("#DDCCreateDiv").html('<b>Offer Script Options</b><hr />');
	
		var filttable = document.createElement('table');
		var row1 = document.createElement('tr');
		var cell11 = document.createElement('td');
		var cell12 = document.createElement('td');
		var cell13 = document.createElement('td');
		var cell14 = document.createElement('td');
		var row2 = document.createElement('tr');
		var cell21 = document.createElement('td');
		var cell22 = document.createElement('td');
		var cell23 = document.createElement('td');
		var cell24 = document.createElement('td');
		filttable.appendChild(row1);
		row1.appendChild(cell11);
		row1.appendChild(cell12);
		row1.appendChild(cell13);
		row1.appendChild(cell14);
		filttable.appendChild(row2);
		row2.appendChild(cell21);
		row2.appendChild(cell22);
		row2.appendChild(cell23);
		row2.appendChild(cell24);

		var row3 = document.createElement('tr');
		var cell31 = document.createElement('td');
		cell31.setAttribute('colspan','4');
		filttable.appendChild(row3);
		row3.appendChild(cell31);

		var row4 = document.createElement('tr');
		var cell41 = document.createElement('td');
		var cell42 = document.createElement('td');
		var cell43 = document.createElement('td');
		var cell44 = document.createElement('td');

		filttable.appendChild(row4);
		row4.appendChild(cell41);
		row4.appendChild(cell42);
		row4.appendChild(cell43);
		row4.appendChild(cell44);


		
		filttable.setAttribute('cellpadding','1');
		filttable.setAttribute('cellspacing','1');
		filttable.setAttribute('width','90%');



		var filtMinSalchk = document.createElement('input');
		filtMinSalchk.setAttribute('type','checkbox');
		filtMinSalchk.setAttribute('id','filtMinSalchk');
		cell12.appendChild(filtMinSalchk);
		cell11.innerHTML = '<b>Minimum Salary:</b>'
		

		var filtMinBonchk = document.createElement('input');
		filtMinBonchk.setAttribute('type','checkbox');
		filtMinBonchk.setAttribute('id','filtMinBonchk');
		cell14.appendChild(filtMinBonchk);
		cell13.innerHTML = '<b>Minimum Bonus:</b>'

		var updatebutton = document.createElement('input');
        updatebutton.setAttribute('type', 'button');
        updatebutton.setAttribute('value', ' Run Script ');
        updatebutton.setAttribute('name', 'Scriptbut');
        updatebutton.setAttribute('id', 'Scriptbut');


		var playerstxt = buildobj('input','type','text','id','playerstxt','size','15');
		cell21.innerHTML = 'Other Player Ids(seperated by commas):';
		cell22.appendChild(playerstxt);


		cell31.innerHTML = "<br><br><b>Some Variables are accepted in the notes section they are detailed below (Please use the italics items exactly including punctuation):</b><br><br> To dynamically use the player's name enter <i>[Name]</i> <br><br>To dynamically use the player's postion enter <i>[Pos]</i> <br><br><br><b><i><u>Please note that the notes section will be truncated at 250 characters as some player's names are longer than the variable. <br><br>Also only one instance of position or name will be replaced.</b></i></u>";



        cell44.appendChild(updatebutton);

        


        $('#DDCCreateDiv').append(filttable);
        $('#DDCCreateDiv').attr('style','display: none');
		updatebutton.addEventListener('click', doScript, false);
    }

	function showCreate(){
		if ($('#tabCreate').is('.subtab_off')) {
			$('#tabCreate').removeClass("subtab_off");
			$('#tabCreate').addClass("subtab_on");
			$('#DDCCreateDiv').show();
			$('input[src="/images/game/buttons/send.png"]').hide();
		} else {
			$('#tabCreate').removeClass("subtab_on");
			$('#tabCreate').addClass("subtab_off");
			$('#DDCCreateDiv').hide();
			$('input[src="/images/game/buttons/send.png"]').show();
		}
    };


	function doScript(){
		workingwindow=window.open('',"Working", "width=130,height=120,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
		if (!workingwindow.opener) workingwindow.opener = self;
		workingwindow.document.writeln('Working...');
		// get settings
		var UseMinSal = $('#filtMinSalchk').attr('checked');
		var UseMinBon = $('#filtMinBonchk').attr('checked');
		// get player name
		var PlayerName = $('div[class*="big_head"]:first').text();
		// get team selection
		var TeamVal = $('#team_id').attr('value');
		if (typeof(TeamVal) == 'undefined') {
			TeamVal = $('input[name="team_id"]').attr('value');
		}
		// get other players
		var OtherPlayers = $('#playerstxt').attr('value');
		// check other players
		OtherPlayers = OtherPlayers.replace(/ /g,'');
		// get offer salary
		var OfferSal = $('#salary').attr('value');
		// get offer bonus
		var OfferBon = $('#bonus').attr('value');
		// get offer trade
		var OfferTrade = $('#no_trade').attr('value');
		// get offer type
		var OfferType = $('#contract_type').attr('value');
		// get offer length
		if (OfferType=='40_day') {
			var OfferLength = $('#duration',$('#options_40_day')).attr('value');
		} else {
			var OfferLength = $('#duration',$('#options_season')).attr('value');
		}
		// get notes 
		var OfferNotes = $('#note').val();

		var PlayId = $('input[name="player_id"]').val();

		var playidsarr = OtherPlayers.split(',');
		
		for (var q=0;q<playidsarr.length;q++) {
						
			SendOffer(UseMinSal, UseMinBon, PlayerName, TeamVal, OtherPlayers, OfferSal, OfferBon, OfferTrade, OfferType, OfferLength, OfferNotes, playidsarr[q]);

		}

		// if player position variable used in notes
		SendOffer(UseMinSal, UseMinBon, PlayerName, TeamVal, '', OfferSal, OfferBon, OfferTrade, OfferType, OfferLength, OfferNotes, PlayId);

	}

	function SendOffer(SndUseMinSal, SndUseMinBon, SndPlayerName, SndTeamVal, SndOtherPlayers, SndOfferSal, SndOfferBon, SndOfferTrade, SndOfferType, SndOfferLength, SndOfferNotes, SndPlayId){
		
		$.get('http://goallineblitz.com/game/make_offer.pl?player_id=' + SndPlayId,function(returned_data2){

			if (SndUseMinSal) {
				SndOfferSal = $('#minimum_salary', returned_data2).text();
				SndOfferSal = '$'+SndOfferSal+'.00';
			}
			if (SndUseMinBon) {
				SndOfferBon = $('#bonus', returned_data2).attr('value');
			}
			if (SndOfferNotes.indexOf('[Name]') > -1) {
				SndPlayerName = $('div[class*="big_head"]:first',returned_data2).text();
				SndOfferNotes = SndOfferNotes.replace('[Name]',SndPlayerName);
			}

			if (SndOfferNotes.indexOf('[Pos]')>-1) {
				// get player position
				$.get('http://goallineblitz.com/game/player.pl?player_id=' + SndPlayId,function(returned_data){
					
					var PlayPos = $('div[class*="position"]', returned_data).text();

					SndOfferNotes = SndOfferNotes.replace('[Pos]',PlayPos);

					if (SndOfferType == '40_day') {
						var offerData = 'action=Send Offer&bonus=' + SndOfferBon + '&contract_type=' + SndOfferType + '&daily_salary=' + SndOfferSal +'&duration_40_day=' + SndOfferLength +'&no_trade=' + SndOfferTrade + '&note='+ SndOfferNotes + '&player_id=' + SndPlayId + '&team_id=' + SndTeamVal;
					
					}else{
						var offerData = 'action=Send Offer&bonus=' + SndOfferBon + '&contract_type=' + SndOfferType + '&daily_salary=' + SndOfferSal +'&duration_season=' + SndOfferLength +'&no_trade=' + SndOfferTrade + '&note='+ SndOfferNotes + '&player_id=' + SndPlayId + '&team_id=' + SndTeamVal;
					}
					//send a POST request to the server with the proper data	
			
					GM_xmlhttpRequest({
						method: 'POST',
						url: 'http://goallineblitz.com/game/make_offer.pl',
						 headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						data: encodeURI(offerData),				  	
						onload: function(response1) {
							if (response1.responseText.indexOf("error")>-1) {
								var errorstr = response1.responseText.substring(response1.responseText.indexOf('"error">')+8,response1.responseText.indexOf('</div>',response1.responseText.indexOf('"error">') + 8));
								errorsarr.push(SndPlayId + ':' + errorstr);
							}
						}
					});

				})
			}else {
				if (SndOfferType == '40_day') {
					var offerData = 'action=Send Offer&bonus=' + SndOfferBon + '&contract_type=40_day&daily_salary=' + SndOfferSal +'&duration_40_day=' + SndOfferLength +'&no_trade=' + SndOfferTrade + '&note='+ SndOfferNotes + '&player_id=' + SndPlayId + '&team_id=' + SndTeamVal;
				}else{
					var offerData = 'action=Send Offer&bonus=' + SndOfferBon + '&contract_type=season&daily_salary=' + SndOfferSal +'&duration_season=' + SndOfferLength +'&no_trade=' + SndOfferTrade + '&note='+ SndOfferNotes + '&player_id=' + SndPlayId + '&team_id=' + SndTeamVal;
				}
				//send a POST request to the server with the proper data	
		
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://goallineblitz.com/game/make_offer.pl',
					 headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: encodeURI(offerData),				  	
					onload: function(response1) {
							  if (response1.responseText.indexOf("error")>-1) {
								  var errorstr = response1.responseText.substring(response1.responseText.indexOf('"error">')+8,response1.responseText.indexOf('</div>',response1.responseText.indexOf('"error">') + 8));
								  errorsarr.push(SndPlayId + ':' + errorstr);
							  }

					}
				});
			}
			if (SndOtherPlayers == '') {
				window.setTimeout(function(){
					if (errorsarr.length>0) {
						resultswindow=window.open('',"Results", "width=480,height=240,scrollbars=yes,resizable=yes,toolbar=yes,location=no,menubar=yes");
						if (!resultswindow.opener) resultswindow.opener = self;
						for (var z =0;z<errorsarr.length;z++) {
							resultswindow.document.writeln(errorsarr[z]+'<br>');
						}
					}
					workingwindow.close();
					window.location.href = 'http://goallineblitz.com/game/team_offers.pl?team_id=' + SndTeamVal;
				},2000);
			}
		})
		
	}

	// build options
	buildelements();
	var workingwindow, resultswindow;
	var errorsarr = new Array;
})




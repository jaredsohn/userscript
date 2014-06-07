// ==UserScript==
// @name           GLB Playbook Transfer
// @namespace      GLB
// @author         DDCUnderground
// @include        http://goallineblitz.com/game/team_tactics.pl?team_id=*
// @require 	   http://userscripts.org/scripts/source/68059.user.js
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

	// build options 
	function buildelements(){

        var tablist = document.createElement('div');
        tablist.setAttribute('class', 'tabs');
        var tabTransfer = document.createElement('div');
        tabTransfer.setAttribute('class', 'subtab_off');
        tabTransfer.setAttribute('id', 'tabTransfer');
        var tabTransferlink = document.createElement('a');
        tabTransferlink.addEventListener('click', showTransfer, false);
        tabTransfertextnode = document.createTextNode('Transfer');
        tabTransferlink.appendChild(tabTransfertextnode);
        tabTransfer.appendChild(tabTransferlink);

        tablist.appendChild(tabTransfer);
        
        
        var TransferDiv = document.createElement('div');
        TransferDiv.setAttribute('class', 'content_container');
        TransferDiv.setAttribute('id', 'DDCTransferDiv');
		$('div[class="medium_head"]:first').prepend('<br><br>');
		$('div[class="medium_head"]:first').prepend(TransferDiv);
        $('div[class="medium_head"]:first').prepend(tablist);

        buildTransferdiv();
    }


	function buildTransferdiv(){

		
        $("#DDCTransferDiv").html('<b>Transfer Options</b><hr />');
	
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
		var cell32 = document.createElement('td');
		var cell33 = document.createElement('td');
		var cell34 = document.createElement('td');

		cell31.setAttribute('width','20%');
		cell32.setAttribute('width','30%');
		cell33.setAttribute('width','20%');
		cell34.setAttribute('width','30%');
		filttable.appendChild(row3);
		row3.appendChild(cell31);
		row3.appendChild(cell32);
		row3.appendChild(cell33);
		row3.appendChild(cell34);


		var row4 = document.createElement('tr');
		var cell41 = document.createElement('td');
		var cell42 = document.createElement('td');
		var cell43 = document.createElement('td');
		var cell44 = document.createElement('td');

		cell41.setAttribute('width','20%');
		cell42.setAttribute('width','30%');
		cell43.setAttribute('width','20%');
		cell44.setAttribute('width','30%');
		filttable.appendChild(row4);
		row4.appendChild(cell41);
		row4.appendChild(cell42);
		row4.appendChild(cell43);
		row4.appendChild(cell44);


		var row5 = document.createElement('tr');
		var cell51 = document.createElement('td');
		cell51.setAttribute('colspan','4');
		filttable.appendChild(row5);
		row5.appendChild(cell51);
		
		var row6 = document.createElement('tr');
		var cell61 = document.createElement('td');
		var cell62 = document.createElement('td');
		var cell63 = document.createElement('td');
		var cell64 = document.createElement('td');
		cell61.setAttribute('width','20%');
		cell62.setAttribute('width','30%');
		cell63.setAttribute('width','20%');
		cell64.setAttribute('width','30%');
		filttable.appendChild(row6);
		row6.appendChild(cell61);
		row6.appendChild(cell62);
		row6.appendChild(cell63);
		row6.appendChild(cell64);



		filttable.setAttribute('cellpadding','3');
		filttable.setAttribute('cellspacing','3');
		filttable.setAttribute('width','90%');



		var filtbasicchk = buildobj('input', 'type','checkbox', 'id','chkbasic');
		cell12.appendChild(filtbasicchk);
		cell11.innerHTML = '<b>Basic Settings:</b>';

		var filtadvenergychk = buildobj('input', 'type','checkbox', 'id','chkadvenergy');
		cell14.appendChild(filtadvenergychk);
		cell13.innerHTML = '<b>Advanced Energy:</b>';

		var filtOffPlaybookchk = buildobj('input','type','checkbox', 'id','chkOffPlaybook');
		cell22.appendChild(filtOffPlaybookchk);
		cell21.innerHTML = '<b>Offensive Playbook:</b>';

		var filtCustDPlayschk = buildobj('input','type','checkbox', 'id','chkCustDPlays');
		cell24.appendChild(filtCustDPlayschk);
		cell23.innerHTML = '<b>Custom D Plays:</b>';

		var filtAIPackschk = buildobj('input', 'type','checkbox', 'id','chkAIPacks');
		cell32.appendChild(filtAIPackschk);
		cell31.innerHTML = '<b>AI Packages:</b>';

		var filtOAIchk = buildobj('input','type','checkbox', 'id','chkOAI');
		cell34.appendChild(filtOAIchk);
		cell33.innerHTML = '<b>Offensive AI:</b>';

		var filtDAIchk = buildobj('input','type','checkbox','id','chkDAI');
		cell42.appendChild(filtDAIchk);
		cell41.innerHTML = '<b>Defensive AI:</b>';

		var teamsdiv = buildobj('div','id','DDCTeamsDiv');
		cell51.appendChild(teamsdiv);

		var updatebutton = buildobj('input', 'type', 'button','value', ' Transfer ','name', 'Transferbut', 'id', 'transferbut');
        cell64.appendChild(updatebutton);


        $('#DDCTransferDiv').append(filttable);
        $('#DDCTransferDiv').attr('style','display: none');
		updatebutton.addEventListener('click', doTransfer, false);
		// get list of teams you have rights to
		$.get('http://goallineblitz.com/game/home.pl',function(returned_data){
			$('div[class="team"], div[class*="team_simple"]',returned_data).each(function(z){
				var teamid = $('a[href*="/game/team.pl?team_id="]', $(this)).attr('href');
				teamid = teamid.substring(teamid.indexOf('=')+1,teamid.length);
				if (teamid != curteamid) {
					var teamimage = $('img[src*="/game/team_pic.pl?team_id="]', $(this)).attr('src');
					var teamname = $('a[href*="/game/team.pl?team_id="]', $(this)).text();
					var button = buildobj("img", "id",teamid,"height", "75", "width", "75","style", "opacity: 0.3;margin: 5px 5px 5px 5px;", "src","http://goallineblitz.com" + teamimage);
					button.addEventListener('click',function (e) { butsel(this.id);},false)
					$('#DDCTeamsDiv').append(button);
				};
			})
		})
    }

	function butsel(imgid){
		if ($('#' + imgid, $('#DDCTeamsDiv')).attr('style')=="opacity: 1; margin: 5px;") {
			$('#' + imgid, $('#DDCTeamsDiv')).attr('style',"opacity: 0.3; margin: 5px;");
		} else {
			$('#' + imgid, $('#DDCTeamsDiv')).attr('style',"opacity: 1; margin: 5px;");
		}
		$('img',$('#DDCTeamsDiv')).each(function(j){
			if ($(this).attr('id') != imgid) {
				$(this).attr('style',"opacity: 0.3; margin: 5px;");
			}
		})

	}

	function showTransfer(){
		if ($('#tabTransfer').is('.subtab_off')) {
			$('#tabTransfer').removeClass("subtab_off");
			$('#tabTransfer').addClass("subtab_on");
			$('#DDCTransferDiv').show();
		} else {
			$('#tabTransfer').removeClass("subtab_on");
			$('#tabTransfer').addClass("subtab_off");
			$('#DDCTransferDiv').hide();
		}
    };

	var popupready = function(onready, url, name, features) {
		var popup = window.open(url, name, features);
		if (onready) {
			setTimeout(poll, 1250);
		}
		function poll() {
			if ($("body *", popup.document).length == 0) {
				setTimeout(poll, 100);
			}
			else {
				onready(popup);
			}
		}
		return popup;
	};
	

	function doTransfer(){
		// var get to team value
		var selteamid = $('img[style="opacity: 1; margin: 5px;"]').attr('id');
		// check Basic Energy
		if ($('#chkbasic').attr('checked')) {
			basicwindow = popupready(function(popup2){
			
				$('input[type="text"], select', $('div[class="tactic_container content_container"]')).each(function(i){
					var itemname = $(this).attr('name');
					var itemval = $(this).attr('value');
					$('input[name="'+itemname+'"],select[name="'+ itemname + '"]',popup2.document).attr('value',itemval);
				})
				
				$('input[type="image"]:last', popup2.document).click();

				
			},'http://goallineblitz.com/game/team_tactics.pl?team_id='+ selteamid,"Working", "width=420,height=640,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");

			window.setTimeout(function(){
				basicwindow.close();
			},2500);

		}
		if ($('#chkadvenergy').attr('checked')) {
			$.get('http://goallineblitz.com/game/team_energy_tactics.pl?team_id=' + curteamid,function(returned_data){
				
				advwindow = popupready(function(popup2){
				
					$('input[type="text"], select', $('div[class="tactic_container content_container"]', returned_data)).each(function(i){
						var itemname = $(this).attr('name');
						var itemval = $(this).attr('value');
						$('input[name="'+itemname+'"],select[name="'+ itemname + '"]',popup2.document).attr('value',itemval);
					})
					
					$('input[type="image"]:last', popup2.document).click();
	
					
				},'http://goallineblitz.com/game/team_energy_tactics.pl?team_id='+ selteamid,"Working", "width=420,height=640,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
	
				window.setTimeout(function(){
					advwindow.close();
				},2500);
			});
		}
		if ($('#chkOffPlaybook').attr('checked')) {
			var srcOPlayBook = window.open('http://goallineblitz.com/game/team_offensive_playbook.pl?team_id=' + curteamid,"Working", "width=130,height=120,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
			window.setTimeout(function(){
				alert(unsafeWindow.teamId);
			}, 2000)
		}
	}

	
	
	var curteamid = $('input[name="team_id"]').attr('value');
	
	// transfer Playbooks

	/*
	var transfertoteam = '2651';
	
	workingwindow=window.open('http://goallineblitz.com/game/team_offensive_playbook.pl?team_id=2651&create=1',"Working", "width=130,height=120,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
	window.setTimeout(function(){
	
		var newplaybookid = $('a:first',$('tr:last',$('table:last',workingwindow.document))).attr('href');
		newplaybookid = newplaybookid.substring(newplaybookid.indexOf('playbook_id=')+12, newplaybookid.length);
		unsafeWindow.teamId = transfertoteam;
		unsafeWindow.playbookId = newplaybookid;
		unsafeWindow.savePlaybook();
	
	},2000);
	*/
	var basicwindow;
	buildelements();
})

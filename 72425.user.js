// ==UserScript==
// @name           GLB Request Equip Funds
// @namespace      GLB
// @include        http://goallineblitz.com/game/upgrade_equipment.pl?player_id=*
// @include		   http://goallineblitz.com/game/new_message.pl*
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

function buildreq(){
	
	
	//get team page with gm options
	$.get("http://goallineblitz.com" + teamlink, function(returned_data){ 
		$('#team_owner, div[class="team_coordinators"], #team_gms', returned_data).each(function(z){
			$('a',$(this)).each(function(q){
				possiblepms.push($(this).text());
			})
		})

		var pmdiv = buildobj('div', 'id', 'pmdiv', 'class','content_container');
		var txtamountreq = buildobj('input', 'type', 'text', 'id', 'txtamountreq', 'value', '$' + difference + '.00');
		var selagenttopm = buildobj('select', 'id', 'selagenttopm');
		//selagenttopm.options[t] = new Option("Select An Agent",'',true,true);
		for(var t=0;t<possiblepms.length;t++) {
			if (t==0) {
				selagenttopm.options[t] = new Option(possiblepms[t],possiblepms[t],true,true);
			}else{
				selagenttopm.options[t] = new Option(possiblepms[t],possiblepms[t],false,false);
			}
		}
		var txtnotes = buildobj('textarea','id','txtnotes','cols', '60','rows','7');
		var sendpmbut = buildobj("input",'type','button', 'value','Send PM','id','sendpmbut');
		var pmtable = buildobj('table', 'id','tblpm');
		var row1 = document.createElement('tr');
		var cell1 = document.createElement('td');
		cell1.setAttribute('width','40%');
		var cell2 = document.createElement('td');
		cell2.setAttribute('valign', 'top');
		pmtable.appendChild(row1);
		row1.appendChild(cell1);
		row1.appendChild(cell2);
		cell1.innerHTML = "<b>Amount Requested:</b><br>";
		cell1.appendChild(txtamountreq);

		cell2.innerHTML = "<b>Additional Notes:</b><br>";
		cell2.appendChild(txtnotes);

		cell1.innerHTML +='<br><br><b>Agent to Notify:</b><br>';
		cell1.appendChild(selagenttopm);

		cell1.innerHTML +='<br><br>';
		cell1.appendChild(sendpmbut);

		pmdiv.appendChild(pmtable);

		sendpmbut.addEventListener('click', sendpm, false);

		$('#reqbut').hide();
		$('div[class="medium_head"]:eq(0)').append(pmdiv);

	})
}

function sendpm(){
	var amountset = $('#txtamountreq').attr('value');
	var agentto = $('#selagenttopm').attr('value');
	var notes = $('#txtnotes').attr('value');
	var emailsubject = "Upgrade equipment fund request.";
	var emailbody = "Hello " + agentto + ", "  + String.fromCharCode(10) +  String.fromCharCode(10) + "I am currently in need of " + amountset + " so that I can upgrade my " + equipname  + "(" + equipdesc + ") on " + playername + ". "  + String.fromCharCode(10) + String.fromCharCode(10) + notes + String.fromCharCode(10)  + String.fromCharCode(10) +  "Thank You.";

	GM_setValue('equipreq',agentto + ':;r' + emailsubject + ':;r' + emailbody);

	var newwindow2 = window.open('http://goallineblitz.com/game/new_message.pl',"Equip Request", "width=8,height=12,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
    if (!newwindow2.opener) newwindow2.opener = self;


}

if (window.location.href == 'http://goallineblitz.com/game/new_message.pl') {
	
	var settings = GM_getValue('equipreq','');
	if (settings != '') {
		var settingsarr = settings.split(':;r');
		$('#to_name').attr('value',settingsarr[0]);
		$('#subject').attr('value',settingsarr[1]);
		$('#message').attr('value',settingsarr[2]);
		var inputs = document.getElementsByTagName('input');
		//click the send button
        inputs[4].click();
	}
	

}else if (window.location.href.indexOf('http://goallineblitz.com/game/new_message.pl?')>-1){
	var settings = GM_getValue('equipreq','');
	if (settings != '') {
		GM_setValue('equipreq', '');
		self.close();
	}
}else {
	//build request button
	var reqbut = buildobj("input",'type','button', 'value','Request Funds','id','reqbut');
	var teamlink = $('a[href*="/game/team.pl?team_id="]').attr('href');
	var possiblepms = new Array();
	var cash = $('div[class="cash"]:first').text();
	cash = cash.substring(cash.indexOf('$'), cash.indexOf('.',cash.indexOf('$')));
	cash = parseInt(cash.replace(/[^0-9]/g, ''));
	var cost = $('div[class="upgrade_price"]').text();
	cost = cost.substring(cost.indexOf('$'), cost.indexOf('.',cost.indexOf('$')));
	cost = parseInt(cost.replace(/[^0-9]/g, ''));
	var difference = cost - cash;
	if (difference <0) {
		difference = cost;
	}
	var equipname = $('div[class="equipment_name"]').text();
	var equipdesc = $('div[class="equipment_description"]').text();
	var playername = $('div[class*="big_head"]:first').text();
	
	
	$('div[class="medium_head"]:eq(0)').append('<br><br>');
	$('div[class="medium_head"]:eq(0)').append(reqbut);
	reqbut.addEventListener('click', buildreq, false);
}

})
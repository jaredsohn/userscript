// ==UserScript==
// @name           GLB Re-Sign Roster with full options
// @namespace      goallineblitz.com
// @description    Automates the process of sending a contract extension to everyone on your roster.
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @include        http://goallineblitz.com/game/make_offer.pl?player_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version	   2009.11.13
// @author	   DDCUnderground
// ==/UserScript==


$(document).ready(function(){

if (window.location.href.indexOf('http://goallineblitz.com/game/roster.pl?team_id=')>-1){
    var dobuild = 0;
    $('div[class=tab_off]').each(function(i){
        if ($(this).attr('id') == 'tab_team_offers') {
            dobuild = 1;
        }
    })
    if (dobuild == 1) {
        buildOptions();
    }
}else{
    signPlayer();
}

function SalChange(){
	
	if($('#SalAmount').attr('value') == 'Spec') {
		$('#SalText').show();
	}else{
		$('#SalText').hide();
	}
}

function SalTextChange(){
	var curamount =$('#SalText').attr('value');
	curamount=curamount.replace(/[^0-9]/g, '');
	$('#SalText').attr('value', curamount);
}


function BonChange(){
	if($('#BonAmount').attr('value') == 'Spec') {
		$('#BonText').show();
	}else{
		$('#BonText').hide();
	}
}

function BonTextChange(){
	var curamount =$('#BonText').attr('value');
	curamount=curamount.replace(/[^0-9]/g, '');
	$('#BonText').attr('value', curamount);
}


function updateContractType(){
    var ContractType = document.getElementById('contract_type');
    var contval = ContractType.options[ContractType.selectedIndex].value;
    var length1 = document.getElementById('options_40_day');
    var length2 = document.getElementById('options_season');
    if (contval == 'season') {
        length1.setAttribute('style','visibility: hidden; display: none;');
        length2.setAttribute('style','');

    }else{
        length1.setAttribute('style','');
        length2.setAttribute('style','visibility: hidden; display: none;');
    }
}

function buildOptions(){


    var tranbutton = document.createElement('input');
    tranbutton.setAttribute('id', 'TranButton');
    tranbutton.setAttribute('type', 'button');
    tranbutton.setAttribute('value', 'Re-Sign Roster');
    tranbutton.addEventListener('click', signRoster, false);
    
	var newDiv = document.createElement('div');
	newDiv.align = 'left';
	newDiv.id = 'newDiv';
    newDiv.innerHTML = '<br>';
	newDiv.appendChild(tranbutton);
    //newDiv.innerHTML += '<br><br>';
    var DivCont = document.createElement('div');
    DivCont.setAttribute('class', "content_container");

    var newtable = document.createElement('table');
    var row1 = document.createElement('tr');
    var cell1 = document.createElement('td');
    cell1.setAttribute('width','40%');
    var cell2 = document.createElement('td');
    cell2.setAttribute('valign', 'top');
    newtable.appendChild(row1);
    row1.appendChild(cell1);
    row1.appendChild(cell2);

    cell2.innerHTML = 'Notes:<br>';
    var txtarea = document.createElement('textarea');
    txtarea.setAttribute('id','txtarea');
    txtarea.setAttribute('cols', '60');
    txtarea.setAttribute('rows','7');
    cell2.appendChild(txtarea);
    



    var ContractType = document.createElement('select');
    //ContractType.setAttribute('class', 'field');
    ContractType.setAttribute('id', 'contract_type');
    ContractType.setAttribute('name', 'contract_type');
    ContractType.options[0]= new Option('Full Season', '40_day', false, false);
    ContractType.options[1]= new Option('End on Day 40', 'season', true, true);
    ContractType.addEventListener('change', updateContractType, false);
    cell1.innerHTML += 'Contract Type: ';
    cell1.appendChild(ContractType);
    var ContractLength40_day = document.createElement('div');
    ContractLength40_day.setAttribute('id','options_40_day');
    ContractLength40_day.setAttribute('style','visibility: hidden; display: none;');
    var CL40Duration = document.createElement('select');
    CL40Duration.setAttribute('id', 'duration_40_day');
    CL40Duration.setAttribute('name', 'duration_40_day');
    CL40Duration.options[0] = new Option('1 Seasons','1', false, false);
    CL40Duration.options[1] = new Option('2 Seasons','2', false, false);
    CL40Duration.options[2] = new Option('3 Seasons','3', true, true);
    ContractLength40_day.innerHTML += '<br>Contract Length: ';
    ContractLength40_day.appendChild(CL40Duration);
    cell1.appendChild(ContractLength40_day);

    var ContractLengthSeason = document.createElement('div');
    ContractLengthSeason.setAttribute('id','options_season');
    //ContractLength40_day.setAttribute('style','visibility: hidden; display: none;');
    var CLSDuration = document.createElement('select');
    CLSDuration.setAttribute('id', 'duration_season');
    CLSDuration.setAttribute('name', 'duration_season');
    CLSDuration.options[0] = new Option('1 Season','1', false, false);
    CLSDuration.options[1] = new Option('2 Season','2', false, false);
    CLSDuration.options[2] = new Option('3 Season','3', true, true);
    ContractLengthSeason.innerHTML += '<br>Contract Length: ';
    ContractLengthSeason.appendChild(CLSDuration);
    cell1.appendChild(ContractLengthSeason);

    var SalaryAmount = document.createElement('div');
    SalaryAmount.setAttribute('id','SalaryAmount');
    var SalAmount = document.createElement('select');
    SalAmount.setAttribute('id', 'SalAmount');
    SalAmount.setAttribute('name', 'SalAmount');
    SalAmount.options[0] = new Option('Minimum','Min', true, true);
    SalAmount.options[1] = new Option('Maximum','Max', false, false);
	SalAmount.options[2] = new Option('Specified','Spec', false, false);
	var SalText = document.createElement('input');
	SalText.setAttribute('type','text');
	SalText.setAttribute('id', 'SalText');
	SalText.setAttribute('size', '8');
    SalaryAmount.innerHTML += '<br>Salary Amount: ';
    SalaryAmount.appendChild(SalAmount);
	SalaryAmount.appendChild(SalText);
    cell1.appendChild(SalaryAmount);
	SalAmount.addEventListener('change',SalChange,false);
	SalText.addEventListener('change',SalTextChange,false);
	

    var BonusAmount = document.createElement('div');
    BonusAmount.setAttribute('id','BonusAmount');
    var BonAmount = document.createElement('select');
    BonAmount.setAttribute('id', 'BonAmount');
    BonAmount.setAttribute('name', 'BonAmount');
    BonAmount.options[0] = new Option('Minimum','Min', false, false);
    BonAmount.options[1] = new Option('Maximum','Max', true, true);
    BonAmount.options[2] = new Option('Zero','0', false, false);
	BonAmount.options[3] = new Option('Specified','Spec', false, false);
	var BonText = document.createElement('input');
	BonText.setAttribute('type','text');
	BonText.setAttribute('id', 'BonText');
	BonText.setAttribute('size', '8');
	BonusAmount.innerHTML += '<br>Bonus Amount: ';
    BonusAmount.appendChild(BonAmount);
	BonusAmount.appendChild(BonText);
    cell1.appendChild(BonusAmount);
	BonAmount.addEventListener('change',BonChange,false);
	BonText.addEventListener('change',BonTextChange,false);


    var TradeClause = document.createElement('div');
    TradeClause.setAttribute('id','TradeClause');
    var TrdClause = document.createElement('select');
    TrdClause.setAttribute('id', 'TrdClause');
    TrdClause.setAttribute('name', 'TrdClause');
    TrdClause.options[0] = new Option('Allow Trades','0', false, false);
    TrdClause.options[1] = new Option('Disallow Trades','1', true, true);
    TradeClause.innerHTML += '<br>Trade Clause: ';
    TradeClause.appendChild(TrdClause);
    cell1.appendChild(TradeClause);


    DivCont.appendChild(newtable);
    newDiv.appendChild(DivCont);
    $('.medium_head:first').append(newDiv);

    var colhead = document.createElement('td');
    colhead.setAttribute('class','player_num_head');
    colhead.innerHTML = 'Send';
    $('.nonalternating_color').append(colhead);

    $('.alternating_color1 , .alternating_color2').each(function(z){

        var playid = $('a[href*="/game/player.pl?player_id="]',$(this)).attr('href');
        playid = playid.substring(playid.indexOf('player_id=')+10);
        var tablerow = document.createElement('td');
        tablerow.setAttribute('align', 'center');
        tablerow.setAttribute('class', 'player_num');
        var chkbox = document.createElement('input');
        chkbox.setAttribute('type', 'checkbox');
        chkbox.setAttribute('id', 'chkbox' + playid);
        chkbox.checked = true;
        tablerow.appendChild(chkbox);
        $(this).append(tablerow);
    })
	$('#SalText').hide();
	$('#BonText').hide();
}


function signRoster(){
    
    //pull contract settings
    var contracttype = document.getElementById('contract_type').value;
    var dur40day = document.getElementById('duration_40_day').value;
    var durseason = document.getElementById('duration_season').value;
    var salamt = document.getElementById('SalAmount').value;
    var bonamt = document.getElementById('BonAmount').value;
    var notes = document.getElementById('txtarea').value;
    var trade = document.getElementById('TrdClause').value;
	var salspec = document.getElementById('SalText').value;
	var bonspec = document.getElementById('BonText').value;
	if(salamt == 'Spec') {
		salamt = salspec;
	}
	if (bonamt =='Spec') {
		bonamt = bonspec;
	}
    disableButton();
    
    document.cookie="resignros=" + escape(contracttype + ',' + dur40day + ',' + durseason + ',' + salamt + ',' + bonamt + ',' + trade) + "; expires=15/02/2011 00:00:00";
    GM_setValue('Notes', notes);
    //initiate status message	
    var checkcount = 0;
    var checkentered = 0;
    //loop through roster and get player_Ids and goto makeoffer page 
    
    $('input[id*="chkbox"]').each(function(z){
        if ($(this).attr('checked')==true) {
            checkcount++;
        }
    })
    
    document.cookie="resigncount=" + escape(checkcount) + "; expires=15/02/2011 00:00:00";
    $('input[id*="chkbox"]').each(function(z){
        if ($(this).attr('checked')==true) {
            var tempplayid = $(this).attr('id');
            tempplayid = tempplayid.substring(6);
            sendOffer(tempplayid,((checkcount-1)-checkentered));
            checkentered++;
        
        }
    })
      
    
}

function disableButton(){
    var medhead = $('.medium_head:first');
    medhead.append('<br>Contracts Left to Send:');
    var counting = document.createElement('div');
    counting.setAttribute('id','ddccount');
    medhead.append(counting);
	document.getElementById('TranButton').setAttribute('disabled', true);
    document.getElementById('contract_type').setAttribute('disabled', true);
    document.getElementById('duration_40_day').setAttribute('disabled', true);
    document.getElementById('duration_season').setAttribute('disabled', true);
    document.getElementById('SalAmount').setAttribute('disabled', true);
    document.getElementById('BonAmount').setAttribute('disabled', true);
}


function sendOffer(playerid,countleft){	
	

    //alert('http://goallineblitz.com/game/make_offer.pl?player_id=' + playerid);
    
    var newwindow2 = window.open('http://goallineblitz.com/game/make_offer.pl?player_id=' + playerid,"ReSign Roster" + countleft, "width=8,height=12,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
    if (!newwindow2.opener) newwindow2.opener = self;
    $('#ddccount').html(countleft);
    

    


}

function signPlayer(){
    var javcookie ='';
    if (document.cookie.length>0){
        var c_start=document.cookie.indexOf("resignros=");
        var c_name='resignros';
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1; 
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            javcookie = unescape(document.cookie.substring(c_start,c_end));
        } 
    }
    var cookiecount ='';
    if (document.cookie.length>0){
        var c_start=document.cookie.indexOf("resigncount=");
        var c_name='resigncount';
        if (c_start!=-1){ 
            c_start=c_start + c_name.length+1; 
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            cookiecount = unescape(document.cookie.substring(c_start,c_end));
        } 
    }
    if (javcookie!='') {
        var notetxt = GM_getValue('Notes','')
        cookiecount = parseInt(cookiecount) -1;
        document.cookie="resigncount=" + escape(cookiecount) + "; expires=15/02/2011 00:00:00";
        var cookielist = javcookie.split(',');
        if (cookielist[0] == 'season'){
            var cont = document.getElementById('contract_type');
            cont.options[1].selected = true;
            cont.focus();
            document.getElementById('options_40_day').setAttribute('style', 'visibility: hidden; display: none;');
            document.getElementById('options_season').setAttribute('style', '');
            document.getElementsByName('duration_season')[0].options[parseInt(cookielist[2]) - 1].selected = true;
            document.getElementsByName('duration_season')[0].focus();
            var minimum = parseInt(document.getElementById('minimum_salary').innerHTML);
            var salary = document.getElementById('salary');
            var bonus = document.getElementById('bonus');
            var txtarea = document.getElementById('note');
            txtarea.value = notetxt;
            if (cookielist[3] == 'Max') {
                salary.value = minimum * 2.5;
            }else if(cookielist[3] == 'Min'){
                salary.value = minimum;
            }else{
				if (parseInt(cookielist[3])<minimum) {
					salary.value = minimum;
				}else if (parseInt(cookielist[3])>(minimum * 2.5)) {
					salary.value = minimum * 2.5;
				}else {
					salary.value = parseInt(cookielist[3]);
				}
			}
            if (cookielist[4] == 'Max') {
                bonus.value = minimum * 45;
            }else if (cookielist[4] == '0'){
                bonus.value = 0;
            }else if (cookielist[4] == 'Min'){
                bonus.value = minimum * 5;
            }else {
				if (parseInt(cookielist[4])<(minimum * 5)) {
					bonus.value = minimum * 5;
				}else if (parseInt(cookielist[4])>(minimum * 45)) {
					bonus.value = minimum * 45;
				}else {
					bonus.value = parseInt(cookielist[4]);
				}
			}
            salary.focus();
            salary.blur();
            bonus.focus();
            bonus.blur();
            var teamId = document.getElementsByName("team_id")[0].value;
            var playerId = document.getElementsByName("player_id")[0].value;
            var offerData = 'action=Send Offer&bonus=' + bonus.value + '&contract_type=season&daily_salary=' + salary.value +'&duration_season=' + cookielist[2] +'&no_trade=' + cookielist[5] + '&note='+ txtarea.value + '&player_id=' + playerId + '&team_id=' + teamId;

        }else{
            document.getElementById('contract_type').options[0].selected = true;
            document.getElementById('contract_type').focus();
            document.getElementById('options_season').setAttribute('style', 'visibility: hidden; display: none;');
            document.getElementById('options_40_day').setAttribute('style', '');
            document.getElementsByName('duration_40_day')[0].options[parseInt(cookielist[1]) - 1].selected = true;
            var minimum = parseInt(document.getElementById('minimum_salary').innerHTML);
            var salary = document.getElementById('salary');
            var bonus = document.getElementById('bonus');
            var txtarea = document.getElementById('note');
            txtarea.value = notetxt;
            if (cookielist[3] == 'Max') {
                salary.value = minimum * 2.5;
            }else if(cookielist[3] == 'Min'){
                salary.value = minimum;
            }else{
				if (parseInt(cookielist[3])<minimum) {
					salary.value = minimum;
				}else if (parseInt(cookielist[3])>(minimum * 2.5)) {
					salary.value = minimum * 2.5;
				}else {
					salary.value = parseInt(cookielist[3]);
				}
			}
            if (cookielist[4] == 'Max') {
                bonus.value = minimum * 45;
            }else if (cookielist[4] == '0'){
                bonus.value = 0;
            }else if (cookielist[4] == 'Min'){
                bonus.value = minimum * 5;
            }else {
				if (parseInt(cookielist[4])<(minimum * 5)) {
					bonus.value = minimum * 5;
				}else if (parseInt(cookielist[4])>(minimum * 45)) {
					bonus.value = minimum * 45;
				}else {
					bonus.value = parseInt(cookielist[4]);
				}
			}
            salary.focus();
            salary.blur();
            bonus.focus();
            bonus.blur();
            var teamId = document.getElementsByName("team_id")[0].value;
            var playerId = document.getElementsByName("player_id")[0].value;
            var offerData = 'action=Send Offer&bonus=' + bonus.value + '&contract_type=40_day&daily_salary=' + salary.value +'&duration_40_day=' + cookielist[1] +'&no_trade='+cookielist[5]+'&note='+ txtarea.value + '&player_id=' + playerId + '&team_id=' + teamId;
        }
        //send a POST request to the server with the proper data	
//        alert(offerData);
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://goallineblitz.com/game/make_offer.pl',
             headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: encodeURI(offerData),				  	
            onload: function(response1) {
                  if (cookiecount ==0) {
                      document.cookie="resigncount=" + escape(0) + "; expires=15/02/2001 00:00:00";
                      document.cookie="resignros=" + escape(0) + "; expires=15/02/2001 00:00:00";
                      window.opener.location.reload();
                  }
                  self.close();
            }
        });


    }
}





})

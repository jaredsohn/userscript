// ==UserScript==
// @name           Re-Sign Roster
// @namespace      goallineblitz.com
// @description    Automates the process of sending a contract extension to everyone on your roster.
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @copyright      2009, garrettFoster 
// @version        2010.07.12
// ==/UserScript==

window.setTimeout(main,10);

//--------------------------------main functions--------------------------------//

function main(){

    //setup interface
    addGreaseDiv();
    console.log('grease div added');
    if(id('tab_team_offers') != null){
	    addTab('Re-Sign Roster','resignRoster');
	
	    //add options to option menu
	    const optionHTML = ''+
	    '<div style = "float: left; width: 200px;">'+
	        '<div class="field_container">'+             
                '<div class="fieldheading">Offer</div>'+                   
                '<input type="text" value="" id="offer">'+
                '<br />'+
                '<select id="offerType" class="field">'+
                    '<option value="extension">Extension</option>'+
			        '<option value="salary">Salary</option>'+
			        '<option value="morale">Morale</option>'+		
		        '</select>'+
            '</div>'+
            '<div class="field_container">'+
		        '<div class="fieldheading">No Trade Clause</div>'+
		        '<select id="no_trade" class="field">'+
			        '<option value="0">Allow Trades</option>'+
			        '<option value="1">Disallow Trades</option>'+
		        '</select>'+
	        '</div>'+
        '</div>'+
        '<div style = "float: left; width: 200px;">'+
	        '<div class="field_container">'+
		        '<div class="fieldheading">Contract Type</div>'+
		        '<select id="contract_type" class="field">'+
			        '<option value="season">End on Day 40</option>'+
			        '<option value="40_day">Full Season (40 days)</option>'+		
		        '</select>'+
	        '</div>'+
	        '<div class="field_container">'+
		        '<div class="fieldheading">Contract Length</div>'+
		        '<select id="duration" class="field">'+
			        '<option value="1">1 Season</option>'+
			        '<option value="2">2 Seasons</option>'+
			        '<option value="3">3 Seasons</option>'+
		        '</select>'+
	        '</div>'+
        '</div>'+
        '<div style = "float: left; width: 200px;">'+	
	        '<div class="field_container">'+
	            '<div class="fieldheading">'+
	                'Optional Note to Include with Offer<br />(current length: <span id="notes_length">0</span>/250 chars)'+
                '</div>'+
                '<textarea id="note" name="note" ></textarea>'+
            '</div>'+   
        '</div>'+
        '<div style="clear:both">'+
            '<input id="resignRoster-go" type="button" value="Go" />'+
        '</div>';
        
	    //place options on page
	    id('resignRoster-options').innerHTML = optionHTML;
	
	    //add event listeners to options
	    id('note').addEventListener('keyup',updateNoteLength,false);
        id('resignRoster-go').addEventListener('click',signRoster,false);
    }
}       

function signRoster(){
    var salaryCap = -1;
    
    //hide options
    toggleOption('resignRoster-options');    

    //get user input
    const teamId = window.location.href.split('=')[1];
    const years = id('duration').value;
    const contractType = id('contract_type').value;
    const tradeClause = id('no_trade').value;
    var offer = id('offer').value;
    if(offer == ''){
        offer = 0;
    }
    const offerType = id('offerType').value;
    const note = id('note').value;

    //get player Ids
    var playerId = new Array();
	var player = document.getElementsByClassName('player_name_short');
	for(var i=0;i<player.length;i++){
		playerId.push(player[i].getElementsByTagName('a')[0].href.split('=')[1]);
	}

	//get player desired salary
	var desired = new Array();
	const url = 'http://goallineblitz.com/game/make_offer.pl';
	for(var i=0;i<playerId.length;i++){
	    id('greaseStatus').innerHTML = '<span style="color: green; padding: 2px;">' + (playerId.length - i) + ' offer(s) left to prepare</span>';
	    var params = '?player_id=' + playerId[i];
	    id('greaseHidden').innerHTML = GET(url+params);
        if(salaryCap == -1){
            try{
                salaryCap = document.getElementsByTagName('script');
				salaryCap = parseFloat(salaryCap[salaryCap.length-1].innerHTML.split(teamId)[1].split(':')[2].split(',')[0]);
            }catch(err){
                salaryCap = -1;
            }	
            console.log(salaryCap);
        }
        try{
            desired.push(parseFloat(id('minimum_salary').innerHTML));
        }catch(err){
            desired.push(0);
            alert(id('greaseHidden').getElementsByClassName('big_head')[0].innerHTML + ': ' + id('greaseHidden').getElementsByClassName('description_text')[0].innerHTML);
        }            
    }
    console.log(desired);   
    
    const MIN = parseInt(salaryCap*.000125);
    const MAX = parseInt(salaryCap*.00125);
	
	//calculate salaries
	var totalSalary = 0;
	var salary = new Array();
	for(var i=0;i<playerId.length;i++){
		    
	    //set salary
	    if(offerType == 'salary'){
            var tempSalary = parseFloat(offer);       
        }else if(offerType == 'morale'){
            var morale = parseFloat(offer);
                        
            if(morale > 10){
                morale = 10;
            }
            if(morale < 0){
                morale = 0;
            }
            
            //calculate salary based on morale
            if(morale > 3){
                tempSalary = desired[i] + (morale-3)*(MAX-desired[i])/7;            
            }else{ 
                tempSalary = MIN+(desired[i]-MIN)*(morale)/3;
            }       
        }else if(offerType == 'extension'){
	        tempSalary = parseFloat(document.getElementsByClassName('player_salary')[i].innerHTML.replace('$','').replace(',','').replace(',',''))/40;
        }	        
        
        //make sure it is between max and min values
        if(tempSalary < MIN){
            tempSalary = MIN;
        }
        if(tempSalary > MAX){
            tempSalary = MAX;
        }
        
        totalSalary = totalSalary + tempSalary;
        salary.push(parseInt(tempSalary));        
    }
    
    if(confirm('$' + addCommas(totalSalary*40) + ' out of $' + addCommas(salaryCap) + ' will be used by sending these offers. Would you like to continue?')){ 
	    //send offers
	    for(var i=0;i<playerId.length;i++){
	        id('greaseStatus').innerHTML = '<span style="color: green; padding: 2px;">' + (playerId.length - i) + ' offer(s) left to send</span>';
	        
	        var params ='?action=Send Offer' +
                        '&contract_type=' + contractType +
                        '&daily_salary=' + salary[i] +
                        '&duration_season=' + years +
                        '&no_trade=' + tradeClause +
                        '&note=' + note +
                        '&player_id=' + playerId[i] + 
                        '&team_id=' + teamId;
            
            try{
                GET(url+params);
                //console.log(url+params);
            }catch(err){
                alert(err);
            }            
        }
        id('greaseStatus').innerHTML = '<span style="color: green;">Done!</span>';    
    }else{
        id('greaseStatus').innerHTML = '';
    }    
     
}

//----------------------------helper functions----------------------------------------//

function updateNoteLength() {
	var note = id('note');
	var len = note.value.length;
	if (len > 250) {
		note.value = note.value.substr(0, 250);
		len = 250;
	}
	
	id('notes_length').innerHTML = len;
}

function id(id){
    return document.getElementById(id);
}

function GET(url){
    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open('GET',url,false);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(null);
    return xmlhttp.responseText;   
}

function addCommas(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

//----------------------------menu interface functions--------------------------------//

function addGreaseDiv(){
    if(document.getElementById('greaseDiv') == null){ //check for existense so we don't make two of them
        
        var greaseDiv = document.createElement('div'); //used to house all greasemonkey related divs
        greaseDiv.setAttribute('style','margin: 0px -10px; background-color: #303030;');
        greaseDiv.setAttribute('id','greaseDiv');        
        
        var greaseMenu = document.createElement('div'); //used to house a main tab for the script
        greaseMenu.setAttribute('id','greaseMenu');
        greaseMenu.setAttribute('style','padding: 7px;');
        greaseDiv.appendChild(greaseMenu);
        
        var greaseOptions = document.createElement('div'); //used to house script options
        greaseOptions.setAttribute('id','greaseOptions');
        greaseOptions.setAttribute('style','background-color: white; margin: 0px 7px;');
        greaseDiv.appendChild(greaseOptions);
        
        var greaseStatus = document.createElement('div'); //used to display script status to the user
        greaseStatus.setAttribute('id','greaseStatus');
        greaseStatus.setAttribute('style','background-color: white; margin: 0px 7px;');
        greaseDiv.appendChild(greaseStatus);       
        
        var greaseHidden = document.createElement('div'); //used to store and data, likely from GET functions
        greaseHidden.setAttribute('id','greaseHidden');
        greaseHidden.setAttribute('style','visibility: hidden; display: none;');
        greaseDiv.appendChild(greaseHidden);
        
        var greaseClear = document.createElement('div'); //used to keep floating items from falling down into the regular page
        greaseClear.setAttribute('id','greaseClear');
        greaseClear.setAttribute('style','clear: both;');
        greaseDiv.appendChild(greaseClear);
        
        //place divs in page
        var location = document.getElementById('content');
        location.insertBefore(greaseDiv,location.firstChild);
    }
}

function addTab(tabText,optionId){
    var tab = document.createElement('a');
    tab.setAttribute('style','text-decoration: none; color: black; background-color: #C0C0C0; padding: 3px; cursor:pointer; cursor:hand;');
    tab.setAttribute('id',optionId + '-button');
    tab.innerHTML = tabText;
    tab.addEventListener('click',function(){toggleOption(optionId + '-options');},false);
    document.getElementById('greaseMenu').appendChild(tab);
    
    var optionDiv = document.createElement('div');
    optionDiv.setAttribute('id',optionId + '-options');
    optionDiv.setAttribute('class','off');
    optionDiv.setAttribute('style','visibility: hidden; display: none;');
    document.getElementById('greaseOptions').appendChild(optionDiv);        
}        

function toggleOption(optionId){
    
    //get the location of our option
    const option = document.getElementById(optionId);
        
    //get state of our option
    const state = document.getElementById(optionId).className;
    
    //set all options to off
    const turnOff = document.getElementById('greaseOptions').getElementsByClassName('on');
    for(i=0;i<turnOff.length;i++){
        turnOff[i].setAttribute('style','visibility: hidden; display: none;');
        turnOff[i].setAttribute('class','off');            
    }
    
    //set the state of our option to the proper setting
    if(state == 'off'){
        option.setAttribute('style','padding: 5px;');
        option.setAttribute('class','on');
    }
}

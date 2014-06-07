// ==UserScript==
// @name            Player Contract Manager
// @namespace       garrettFoster
// @description     Allows an agent to sort the contract offers for their player.
// @include         http://goallineblitz.com/game/offers.pl?player_id=*
// @copyright       2010, garrettFoster
// @version         2010.07.15
// ==/UserScript==

window.setTimeout(main,10);

function main(){
    
    addGreaseDiv();
    
    //grab players position
    const playerId = window.location.href.split('=')[1];
    var url = 'http://goallineblitz.com/game/player.pl';
    var params = '?player_id=' + playerId;
    id('greaseHidden').innerHTML = GET(url+params);
    const playerPos = id('greaseHidden').getElementsByClassName('position')[0].innerHTML;    
    
    console.log(playerPos);
    
    //grab offer data
    var offerData = document.getElementsByClassName('offer');
    
    var offer = new Array();
    for(var i=0; i<offerData.length; i++){
        id('greaseStatus').innerHTML = '<span style="color: green; padding: 2px;">' + (offerData.length - i) + ' offer(s) left to parse.</span>';
        
        //strip data out of each offer
        offer[i] = new Object();
        offer[i].id = offerData[i].childNodes[11].attributes[1].value.split("('")[1].split("')")[0];
        offer[i].teamName = offerData[i].childNodes[1].textContent;
        offer[i].teamId = offerData[i].childNodes[1].childNodes[0].href.split('=')[1];
        offer[i].leagueName = offerData[i].childNodes[5].childNodes[1].textContent;
        offer[i].leagueId = offerData[i].childNodes[5].childNodes[1].childNodes[0].href.split('=')[1];
        offer[i].salary = offerData[i].childNodes[5].childNodes[5].childNodes[1].textContent.split(' (')[0].split('$')[1];
        offer[i].morale = offerData[i].childNodes[5].childNodes[7].childNodes[1].innerHTML;
        offer[i].duration = offerData[i].childNodes[5].childNodes[9].childNodes[1].innerHTML;
        offer[i].noTrade = 'no';
        if(offerData[i].childNodes[5].getElementsByClassName('duration')[1]){
            offer[i].noTrade = 'yes';
        }
        offer[i].note = '';
        if(offerData[i].childNodes[5].getElementsByClassName('notes')[0]){
            offer[i].note = offerData[i].childNodes[5].getElementsByClassName('notes')[0].textContent;
        } 
           
        //grab additional data on the team
        var url = 'http://goallineblitz.com/game/roster.pl';
        var params = '?team_id='+offer[i].teamId;
        id('greaseHidden').innerHTML = GET(url+params);
        offer[i].playerCount = id('greaseHidden').getElementsByClassName('content_container')[0].childNodes[1].childNodes[3].textContent.split(' (')[0];
        offer[i].avgLvl = id('greaseHidden').getElementsByClassName('content_container')[0].childNodes[1].childNodes[3].textContent.split('Lv ')[1].split(')')[0];
        offer[i].effLvl = id('greaseHidden').getElementsByClassName('content_container')[0].childNodes[1].childNodes[7].textContent.split('Lv ')[1].split(')')[0];
        offer[i].capSpace = id('greaseHidden').getElementsByClassName('content_container')[0].childNodes[3].childNodes[7].textContent.split('.')[0].replace('$','').replace(',','').replace(',','');
        var player = id('greaseHidden').getElementsByClassName('player_position');
        
        //grab data on players that would compete for playing time
        var competition = new Array();
        var k = 0;
        for(var j=0; j<player.length; j++){
            if(player[j].textContent == playerPos){
                competition[k] = new Object;
                competition[k].playerId = player[j].parentNode.childNodes[5].childNodes[0].childNodes[0].href.split('=')[1];
                competition[k].playerName = player[j].parentNode.childNodes[5].textContent;
                competition[k].playerLvl = player[j].parentNode.childNodes[15].textContent;
                k++; 
            }
        }
        
        offer[i].numOnRoster = competition.length;
        offer[i].competition = competition;
        
        //offers to other players??
        
        //hide offer
        offerData[i].setAttribute('style','visibility: hidden; display: none;');    
        
    }
    id('greaseStatus').innerHTML = '<span style="color: green; padding: 2px;">Building the table.</span>';
    console.log(offer); 
    
    //format the data to be displayed
    var html =  '<table id="offerTable" cellspacing="0" cellpadding="0" width="100%">'+
                    '<tbody>' +
                        '<tr class="nonalternating_color">' +
                            '<th><input type="checkbox" id="masterCheck" /></th>' +
                            '<th>Team</th>' +
                            '<th>League</th>' +
                            '<th>Players</th>' +
                            '<th>Avg Lvl</th>' +
                            '<th>Eff Lvl</th>' +
                            '<th>Cap Space</th>' +
                            '<th>Salary</th>' +
                            '<th>Morale</th>' +
                            '<th>Duration</th>' +
                            '<th>No Trade</th>' +
                            '<th>Num At Position</th>' +
                            '<th>Note</th>' +
                        '<tr>';
    
    for(var i=0; i<offer.length; i++){
        html +=         '<tr class="alternating_color1">' +
                            '<td><input class="playerCheck" type="checkbox" id="' + offer[i].id + '" /></th>' +
                            '<td>' +
                                '<a href="http://goallineblitz.com/game/team.pl?team_id=' + offer[i].teamId + '" target="_blank">' + 
                                    offer[i].teamName +
                                '</a>' +
                            '</td>' +
                            '<td>'+
                                 '<a href="http://goallineblitz.com/game/league.pl?league_id=' + offer[i].leagueId + '" target="_blank">' + 
                                    offer[i].leagueName +
                                '</a>' +
                            '</td>' +
                            '<td>' + offer[i].playerCount + '</td>'+
                            '<td>' + offer[i].avgLvl + '</td>'+
                            '<td>' + offer[i].effLvl + '</td>'+
                            '<td>' + addCommas(offer[i].capSpace) + '</td>'+
                            '<td>' + addCommas(offer[i].salary) + '</td>'+
                            '<td>' + offer[i].morale + '</td>'+
                            '<td>' + offer[i].duration + '</td>'+
                            '<td>' + offer[i].noTrade + '</td>'+
                            '<td>' +
                                '<a href="javascript:;" class="competitionHighlight">' + offer[i].numOnRoster + '</a>' +
                                '<span style="visibility: hidden; display: none;">' +
                                '<table><tbody>';                                
        for(var j=0; j<offer[i].competition.length; j++){
            html +=                 '<tr>'+
                                        '<td>' +
                                            '<a href="http://goallineblitz.com/game/player.pl?player_id=' + offer[i].competition[j].playerId + 
                                            '" target="_blank">' + 
                                                 offer[i].competition[j].playerName +
                                            '</a>' +
                                        '</td>' +
                                        '<td>Lvl ' + offer[i].competition[j].playerLvl + '</td>' +
                                    '</tr>';
        }
        html +=                     '</tbody></table></span>' +                             
                            '</td>'+
                            '<td>' + offer[i].note + '</td>'+                                                       
                        '</tr>';
    }
    
    html +=         '</tbody>' +
                '</table>' +                                 
                    '<select id="rejectionReason" style="float: right;">' +
                        '<option value="other_offer">I have chosen a contract from another team</option>' +
                        '<option value="salary">I want a higher salary</option>' +
                        '<option value="bonus">I want a higher signing bonus</option>' +
                        '<option value="too_long">Contract length is too long</option>' +
                        '<option value="no_trade">I want a no trade clause</option>' +
                        '<option value="committed">I am already committed to another team</option>' +
                        '<option value="higher_tier">I am looking for a higher tier team</option>' +
                        '<option value="level_range">I don\'t think I match the league level range</option>' +
                        '<option value="starter">I want to be a starter</option>' +
                        '<option value="no_interest">I\'m not interested in your team</option>' +
                        '<option value="not_looking">Currently I\'m not looking for a team</option>' +
                        '<option value="forty_day">I\'m only accepting contracts that end on day 40</option>' +
                        '<option value="competitive">I am looking at more competitive teams</option>' +
                        '<option value="retiring">I intend to retire my player</option>' +
                        '<option value="own_team">I\'ll be signing with my own team</option>' +
                    '</select>' +
                    '<a id="rejectOffers" class="buttonSmall" href="javascript:;"><span>Reject Offers</span></a>' +
                    '<a id="acceptOffer" class="buttonSmall" href="javascript:;"><span>Accept Offer</span></a>';

    //write html to page
    var location = document.getElementsByClassName('description_text')[0];
    var div = document.createElement('div');
    div.innerHTML = html;
    location.parentNode.insertBefore(div,location.nextSibling);   
    
    //attach event listeners
    id('rejectOffers').addEventListener('click',rejectOffers,false);
    id('acceptOffer').addEventListener('click',acceptOffer,false);
    id('masterCheck').addEventListener('click',toggleChk,false);
    var competition = document.getElementsByClassName('competitionHighlight');
    for(var i=0; i<competition.length; i++){
        competition[i].addEventListener('click',function(){toggleComp(this);},false);
    }
    
    id('greaseStatus').innerHTML = '';   
}

function toggleComp(anchor){
    if(anchor.nextSibling.style.visibility == 'hidden'){
        anchor.nextSibling.removeAttribute('style','visibility: hidden; display: none;');
    }else{
        anchor.nextSibling.setAttribute('style','visibility: hidden; display: none;');
    }
}       

function toggleChk(){
    var chk = document.getElementsByClassName('playerCheck');
    for(var i=0;i<chk.length;i++){
        if(chk[i].checked){
            chk[i].checked = false;
        }else{
            chk[i].checked = true;
        }
    }
}

function rejectOffers(){
    id('greaseStatus').innerHTML = ''; //reset message area
    
    //grab offers
    var offer = document.getElementsByClassName('playerCheck');
    var chk = new Array();
    var j = 0;
    for(var i=0; i<offer.length; i++){
        if(offer[i].checked){
            chk[j] = new Object;
            chk[j].id = offer[i].id
            j++;
        }
    }
    
    if(confirm('Really reject the ' + chk.length + ' selected offer(s)?')){    
        //grab url
        const url = window.location;
        
        //grab rejection reason
        const reason = id('rejectionReason').value;
        
        id('greaseStatus').innerHTML = '<span style="color: red; padding: 2px;">Removing Offer(s)...</span>';
        for(var i=0; i<chk.length; i++){
            var params = '&reject=' + chk[i].id + '&reason=' + reason;
            GET(url+params);
            //console.log(url+params);
            
            var location = id(chk[i].id);
            location.parentNode.parentNode.parentNode.removeChild(location.parentNode.parentNode);
        }       
    }
    id('greaseStatus').innerHTML = '';
}

function acceptOffer(){
    const playerId = window.location.href.split('=')[1];
    
    id('greaseStatus').innerHTML = '';
    if(confirm('Really accept the selected offer?')){    
        //grab url
        const url = window.location;
        
        //grab offers
        var offer = document.getElementsByClassName('playerCheck');
        var count = 0;
        for(var i=0; i<offer.length; i++){
            if(offer[i].checked){
                count++;                
            }
        }
        if(count == 1){
            for(var i=0; i<offer.length; i++){
                if(offer[i].checked){
                    var params = '&accept=' + offer[i].id;
                    GET(url+params);
                    //console.log(url+params);
                    offer[i].parentNode.parentNode.parentNode.removeChild(offer[i].parentNode.parentNode);
                    window.location='http://goallineblitz.com/game/player.pl?player_id=' + playerId;              
                }
            }
        }else{
            id('greaseStatus').innerHTML = '<span style="color: red; padding: 2px;">Error: Please select only one offer when accepting.</span>';
        }
    }
}
            
        

//----------------------------helper functions----------------------------------------//

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

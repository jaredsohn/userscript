// ==UserScript==
// @name           Automatic Offer Retraction
// @namespace      goallineblitz.com
// @description    Will check to see how many players are signed and retract remaining offers at that position if a user defined quota has been met.
// @include        http://goallineblitz.com/game/*
// @copyright      2010, garrettFoster
// @version        2010.05.24
// ==/UserScript==

//needed by greasmonkey
window.setTimeout( 
	function() {
		main();
	}, 
	10
);

function main(){
    debug('script started');
    
    document.title = '()'+document.title;
    
    //check the cookie every 10 seconds and see if time has elapsed   
    setInterval(checkCookie,1000*6);
    
    var parseDiv = document.createElement('div');
    parseDiv.setAttribute('style','visibility:hidden; display:none;');
    parseDiv.setAttribute('id','parseDiv');
    
    var location = document.getElementById('body_container');
    location.parentNode.insertBefore(parseDiv,location);
    
    //create a button to set uptions if we are on a roster page
    if(window.location.href.indexOf('http://goallineblitz.com/game/roster.pl?team_id=') != -1){
        
        const teamId = parseInt(window.location.href.split('team_id=')[1]); //get the team id so we know which data to pull from the cookies
        
        if(document.getElementById('tab_team_offers') != null){ //make sure you have rights to send offers for this team
            
            //grab the current settings
            var retractionSettings = getSettings(teamId);     
            
             //build a button to let the user modify the settings
            location = document.getElementById('tab_roster');
            
            var tab = document.createElement('div');
            tab.setAttribute('id','retractionSettingsTab');
            tab.setAttribute('class','tab_off');
            
            var a = document.createElement('a');
            a.setAttribute('style','cursor:pointer;cursor:hand;');
            a.addEventListener('click',toggleSettings,false);
            a.innerHTML = 'Retraction Settings';
            
            tab.appendChild(a);
            
            location.parentNode.insertBefore(tab,location.nextSibling);
            
            //add a div
            var div = document.createElement('div');
            div.setAttribute('id','retractionSettings');
            div.setAttribute('class','off');
            div.setAttribute('style','visibility:hidden; display:none;');
            div.innerHTML = '';
            
            document.getElementById('page_roster').appendChild(div); 
            
            var table = '<table>'+
                            '<tbody'+
                                '<tr style="text-align: center; font-weight: bold;">'+
                                    '<td>QB</td>'+
                                    '<td>HB</td>'+
                                    '<td>FB</td>'+
                                    '<td>C</td>'+
                                    '<td>G</td>'+
                                    '<td>OT</td>'+
                                    '<td>TE</td>'+
                                    '<td>WR</td>'+
                                    '<td>DT</td>'+
                                    '<td>DE</td>'+
                                    '<td>LB</td>'+
                                    '<td>CB</td>'+
                                    '<td>SS</td>'+
                                    '<td>FS</td>'+
                                    '<td>K</td>'+
                                    '<td>P</td>'+
                                    '<td />'+
                                    '<td />'+
                                '</tr>'+
                                '<tr id="retractionInputs">'+
                                    '<td><input id="qb" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="hb" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="fb" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="c" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="g" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="ot" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="te" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="wr" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="dt" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="de" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="lb" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="cb" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="ss" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="fs" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="k" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="p" size="2" value="1" type="text" /></td>'+
                                    '<td><input id="updateButton" value="Update Retraction Settings" type="button" /></td>'+
                                    '<td><input id="removeButton" value="Remove Team from script" type="button" /></td>'+
                                '</tr>'+
                            '</tbody>'+
                        '</table>';            
                       
            
            document.getElementById('retractionSettings').innerHTML = table;
            document.getElementById('removeButton').setAttribute('style','visibility:hidden; display:none;');
            document.getElementById('updateButton').addEventListener('click',function(){
                                                                                        var settings = getValues();
                                                                                        var cookie = [teamId,1].concat(settings);
                                                                                        updateCookie(cookie,teamId);
                                                                                        alert('Team #'+teamId+' updated in the script.');
                                                                                        document.getElementById('removeButton').removeAttribute         ('style','visibility:hidden; display:none;');  
                                                                                        },false);
            document.getElementById('removeButton').addEventListener('click',function(){
                                                                                        deleteCookie(teamId);
                                                                                        alert('Team #'+teamId+' removed the script.');
                                                                                        document.getElementById('removeButton').setAttribute         ('style','visibility:hidden; display:none;');  
                                                                                        },false);
            
            if(teamExists(teamId)){
                document.getElementById('removeButton').removeAttribute('style','visibility:hidden; display:none;');                
            }             
            
            //update values
            setValues(retractionSettings);          
        }
    }    
}

function checkCookie(){
    var title = document.title.split(')')[1];
    var cookie = toArray(getCookie('glbOfferCheck'));
    var teams = new Array();
    for(var i=0;i<cookie.length;i++){
        cookie[i][1] -= 0.1;      
        if(cookie[i][1] < 0.1){
            teams.push(cookie[i][0]); //time has expired so add this team to the list to check
            cookie[i][1] = 15;
        }
        updateCookie(cookie[i],cookie[i][0]);
    }
    title = '('+cookie[0][1].toFixed(1)+')'+title;
    if(teams.length != 0){ //only run this part if we have teams to check
        for(var i=0;i<teams.length;i++){
            document.title = 'Checking team ' + teams[i];
            var rosterPage = getResponseText('http://goallineblitz.com/game/roster.pl?team_id=' + teams[i]);
            var roster = parseRoster(rosterPage);
            var settings = getSettings(teams[i]);
            
            //compare settings to roster and see if we need to retract some offers
            const position = ['QB','HB','FB','C','G','OT','TE','WR','DT','DE','LB','CB','SS','FS','K','P'];
            var retractPosition = new Array(); //array to hold positions to be retracted
            for(var j=2;j<settings.length;j++){
                if(roster[j-2] >= settings[j]){
                    retractPosition.push(position[j-2]);
                }
            }
            if(retractPosition.length != 0){ //then we have contracts to retract
                document.title = 'Retracting offers for team ' + teams[i];
                var offersPage = getResponseText('http://goallineblitz.com/game/team_offers.pl?team_id=' + teams[i]);
                for(var j=0; j<retractPosition.length; j++){
                    var offerId = parseOffers(offersPage,retractPosition[j]);
                    if(offerId.length != 0){ //retract offers
                        for(var k=0; k<offerId.length; k++){
                            getResponseText('http://goallineblitz.com/game/team_offers.pl?team_id=' + teams[i] + '&delete_offer='+ offerId[k]);
                        }
                    }
                }
            }
        }        
    }
    document.title = title;
}

function parseOffers(page,position){
    var div = document.getElementById('parseDiv');
    div.innerHTML = page;
    
    var offerId = new Array();
    var offers = div.getElementsByClassName('player_name');
    for(var i=0; i<offers.length; i++){
        var pos = offers[i].getElementsByTagName('b')[0].innerHTML.split(' ')[2];
        if(pos == position){
            var id = offers[i].parentNode.parentNode.innerHTML.split("deleteOffer('")[1].split("')")[0];
            offerId.push(id);
        }
    }
    return offerId;    
}        

function parseRoster(page){
    var div = document.getElementById('parseDiv');
    div.innerHTML = page;
    var position = div.getElementsByClassName('position');
    const positions = ['QB','HB','FB','C','G','OT','TE','WR','DT','DE','LB','CB','SS','FS','K','P'];
    var roster = new Array();
    for(var i=0; i<positions.length; i++){
        var count = div.getElementsByClassName(positions[i]).length;
        roster.push(count);
    }
    return roster;
}    

function setValues(retractionSettings){
    var input = document.getElementById('retractionInputs').getElementsByTagName('input');
    for(var i=0;i<input.length-2;i++){
        input[i].value = retractionSettings[i+2];
    }
} 

function toggleSettings(){
    var div = document.getElementById('retractionSettings');
    var state = div.className;
    if(state == 'off'){
        div.setAttribute('class','on');
        div.removeAttribute('style','visibility:hidden; display:none;');
    }else{
        div.setAttribute('class','off');
        div.setAttribute('style','visibility:hidden; display:none;');
    }
}

// used to grab page data
function getResponseText(url){
    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open('GET',url,false);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send('');
    return xmlhttp.responseText;
}

//more universal debugging command
function debug(text) {
    try{
        console.log(text);
    }catch(e){
        try{
            opera.postError(text);
        }catch(e){
            alert(text);
        }
    }
}

//functions for cookies
function setCookie(id,value,days) {
    var expire = new Date();
    if (days==null || days==0) days=30;
    expire.setTime(expire.getTime() + 3600000*24*days);
    document.cookie = id+"="+escape(value)+ ";expires="+expire.toGMTString(); //+exdate.toUTCString());
}

function getCookie(id){
    if (document.cookie.length>0){
        var start = document.cookie.indexOf(id + "=");
        if (start != -1){
            start= start + id.length +1;
            var end = document.cookie.indexOf(";",start);
            if(end == -1){
                end = document.cookie.length;
            }
            return unescape(document.cookie.substring(start,end));
        }
    }
    return '';
}

function toCookie(array){
    var cookie = '';    
    for(var i=0; i<array.length; i++){
        var team = array[i];
        for(var j=0; j<team.length; j++){
            cookie += team[j]+'%item';
        }
        cookie += '%team';
    }
    return cookie;
}

function toArray(cookie){
    var array = new Array();    
    var teams = cookie.split('%team');
    for(var i=0;i<teams.length-1;i++){ //ignore the last of the teams as it is empty
        var team = new Array();
        var items = teams[i].split('%item');
        for(var j=0;j<items.length-1;j++){ //ignore the last of the items as it is empty
            if(j==1){
                team=team.concat(parseFloat(items[j])); //time uses decimal points
                continue;
            }
            team = team.concat(parseInt(items[j]));
        }
        array.push(team);
    }    
    return array;
}

function getSettings(teamId){
    var settings = new Array();
    var team = toArray(getCookie('glbOfferCheck'));
                            //qb,hb,fb,c,g,ot,te,wr,dt,de,lb,cb,ss,fs,k,p
    var defaults = [teamId, 15, 3, 6, 3,3,6, 6, 3,15, 6, 6,12,15, 3, 3,3,3];
    for(var i=0;i<team.length;i++){
        if(team[i][0] == teamId){
            settings = team[i];
            break; //don't need to look throught the rest of the data
        }
    }
    if(settings == ''){ //no previouse settings were found
         return defaults;
    }
    return settings;
}

function updateCookie(settings,teamId){
    var cookie = toArray(getCookie('glbOfferCheck'));
    var found = false;
    //see if the team exists
    for(var i=0;i<cookie.length;i++){
        if(cookie[i][0] == teamId){
            cookie[i] = settings;
            found = true;
            break; //don't need to look throught the rest of the data
        }
    }
    if(!found){   
        cookie.push(settings);
    }
    setCookie('glbOfferCheck',toCookie(cookie));
}

function deleteCookie(teamId){
    if(teamId == null){
        setCookie('glbOfferCheck','',-1);
    }else{
        var cookie = toArray(getCookie('glbOfferCheck'));
        var newCookie = new Array();
        //see if the team exists
        for(var i=0;i<cookie.length;i++){
            if(cookie[i][0] == teamId){
                continue;
            }
            newCookie.push(cookie[i]);
        }
        setCookie('glbOfferCheck',toCookie(newCookie))
    }
}

function getValues(){
    var array = new Array();
    var input = document.getElementById('retractionInputs').getElementsByTagName('input');
    for(var i=0;i<input.length-2;i++){
        array.push(parseInt(input[i].value));
    } 
    return array; 
}

function teamExists(teamId){
    var cookie = toArray(getCookie('glbOfferCheck'));
    //see if the team exists
    for(var i=0;i<cookie.length;i++){
        if(cookie[i][0] == teamId){
            return true;
        }
    }
    return false;
}

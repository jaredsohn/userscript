// ==UserScript==
// @name           Offer From Agent Screen
// @namespace      goallineblitz.com
// @description    Lets you send offers from the agent screen.
// @include        http://goallineblitz.com/game/home.pl?user_id=*
// @copyright      2010, garrettFoster
// @version        2010.05.26
// ==/UserScript==

window.setTimeout(main,10); //needed to start greasemonkey

function main(){    
    if(document.getElementsByTagName('option')[3].selected){ //check for list view to start
        console.log('offer from agent screen script started'); 
        //add button
        var div = document.createElement('div');
        div.setAttribute('id','signDiv');        
        
        var button = document.createElement('input');
        button.setAttribute('type','button');
        button.setAttribute('value','Sign Selected Players');
        button.setAttribute('style','float: right;');
        button.addEventListener('click',getTeamId,false);
        
        div.appendChild(button);
        
        var location = document.getElementById('players');
        location.parentNode.insertBefore(div,location);
        
        div = document.createElement('div');
        div.setAttribute('id','hiddenDiv');
        div.setAttribute('style','visibility:hidden; display:none;');
        
        location = document.getElementById('signDiv');
        location.parentNode.insertBefore(div,location.nextSibling);
        
        div = document.createElement('div');
        div.setAttribute('style','clear: both;');
        
        location = document.getElementById('hiddenDiv');
        location.parentNode.insertBefore(div,location.nextSibling);
        
        //remove headings
        var tr = document.getElementById('playerTable').getElementsByTagName('tr'); 
        tr[0].innerHTML = '<th>#</th><th>Name</th><th>Team</th><th>Lv</th><th>Pos</th>';                
        
        //add headings
        var th = document.createElement('th');
        
        var a = document.createElement('a');
        a.innerHTML = 'Sign';
        a.setAttribute('style','cursor:pointer;cursor:hand;');
        //a.addEventListener('click',function(){toggle('signPlayer');},false);
        
        th.appendChild(a);
        
        tr[0].appendChild(th);
        
        th = document.createElement('th');
        a = document.createElement('a');
        a.innerHTML = 'Daily Salary';
        a.setAttribute('style','cursor:pointer;cursor:hand;');
        //a.addEventListener('click',function(){setSalary('Max');},false);
        
        th.appendChild(a);
        
        tr[0].appendChild(th);
        
        th = document.createElement('th');
        a = document.createElement('a');
        a.innerHTML = 'Bonus';
        //a.setAttribute('style','cursor:pointer;cursor:hand;');
        
        th.appendChild(a);
        
        tr[0].appendChild(th);
        
        th = document.createElement('th');
        a = document.createElement('a');
        a.innerHTML = 'No-Trade';
        //a.setAttribute('style','cursor:pointer;cursor:hand;');
        
        th.appendChild(a);
        
        tr[0].appendChild(th);
        
        th = document.createElement('th');
        a = document.createElement('a');
        a.innerHTML = 'Day 40';
        //a.setAttribute('style','cursor:pointer;cursor:hand;');
        
        th.appendChild(a);
        
        tr[0].appendChild(th);     
        
        
        th = document.createElement('th');
        a = document.createElement('a');
        a.innerHTML = 'Years';
        //a.setAttribute('style','cursor:pointer;cursor:hand;');
        
        th.appendChild(a);
        
        tr[0].appendChild(th);
        
        //remove cells
        for(var i=1;i<tr.length;i++){
            var td = tr[i].getElementsByTagName('td');
            tr[i].innerHTML = '<td>'+td[0].innerHTML+'</td><td>'+td[1].innerHTML+'</td><td>'+td[2].innerHTML+'</td><td>'+td[3].innerHTML+'</td><td>'+td[4].innerHTML+'</td>';
        }
        
        //add cells
        for(var i=1;i<tr.length;i++){
            var id = tr[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].href.split('player_id=')[1];
            var td = document.createElement('td');
              
            var chk = document.createElement('input');
            chk.setAttribute('type','checkbox');
            chk.setAttribute('value',id);
            chk.setAttribute('class','signPlayer');

            td.appendChild(chk);

            tr[i].appendChild(td);

            td = document.createElement('td');

            var txt = document.createElement('input');
            txt.setAttribute('type','text');
            txt.setAttribute('size','10');

            td.appendChild(txt);

            tr[i].appendChild(td); 
            
            td = document.createElement('td');

            txt = document.createElement('input');
            txt.setAttribute('type','text');
            txt.setAttribute('size','10');

            td.appendChild(txt);

            tr[i].appendChild(td); 
            
            td = document.createElement('td');
              
            chk = document.createElement('input');
            chk.setAttribute('type','checkbox');            

            td.appendChild(chk);

            tr[i].appendChild(td);
            
            td = document.createElement('td');
              
            chk = document.createElement('input');
            chk.setAttribute('type','checkbox');
            chk.checked = true;

            td.appendChild(chk);

            tr[i].appendChild(td);
            
            td = document.createElement('td');

            txt = document.createElement('input');
            txt.setAttribute('type','text');
            txt.setAttribute('size','1');

            td.appendChild(txt);

            tr[i].appendChild(td);        
            
        }      
    }    
}

function getTeamId(){
    var player = document.getElementsByClassName('retirePlayer');
    var num = 0;
    for(var i=0;i<player.length;i++){
        if(player[i].checked){
            num++;
        }
    }
    
    var span = document.createElement('span');
    span.setAttribute('style','float: right;');
    span.innerHTML = 'Please enter the id of the team you want to send offers for: ';
    
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('id','teamId');
    input.setAttribute('value','');
    input.setAttribute('style','float: right;');
    
    var button = document.createElement('input');
    button.setAttribute('type','button');
    button.setAttribute('value','OK');
    button.setAttribute('style','float: right;');
    button.addEventListener('click',signPlayers,false);    
    
    var location = document.getElementById('signDiv');
    
    location.innerHTML = '';
    location.appendChild(button);
    location.appendChild(input);
    location.appendChild(span);
}

function signPlayers(){
    try{
        var teamId = document.getElementById('teamId').value;
        document.getElementById('signDiv').innerHTML = '<span style="color: green; float: right;">Signing Players...</span>';
        var player = document.getElementsByClassName('signPlayer');
        var offer = new Array();
        for(var i=0;i<player.length;i++){
            if(!player[i].checked){
                continue;
            }
            var id = player[i].value;
            var location = player[i].parentNode.nextSibling.firstChild;
            if(location.value != ''){            
                var salary = parseFloat(location.value);
            }else{
                salary = 0;
            }
            location = location.parentNode.nextSibling.firstChild;
            if(location.value != ''){
                var bonus = parseFloat(location.value);
            }else{
                bonus = 0;
            }
            location = location.parentNode.nextSibling.firstChild;
            if(location.checked){
                var noTrade = 1;
            }else{
                var noTrade = 0;
            }
            location = location.parentNode.nextSibling.firstChild;
            if(location.checked){
                var day40 = 'season';
            }else{
                var day40 = '40_day';
            }
            location = location.parentNode.nextSibling.firstChild;
            if(location.value != ''){
                var years = parseInt(location.value);
            }else{
                years = 1;
            } 
            offer.push([id,salary,bonus,noTrade,day40,years]);
        }
        for(i=0;i<offer.length;i++){
            document.getElementById('signDiv').innerHTML = '<span style="color: green; float: right;">' + (offer.length - i) + ' offer(s) left to send</span>'; 
            var minimum = getMinimum(offer[i][0]);
            if(offer[i][1] < minimum){ //correct min salary
                offer[i][1] = minimum;
            }
            if(offer[i][1] > minimum*2.5){ //correct max salary
                offer[i][1] = minimum*2.5;
            }
            if(offer[i][2] < minimum*5){ //correct min bonus
                offer[i][2] = minimum*5;
            }
            if(offer[i][2] > minimum*45){ //correct max bonus
                offer[i][2] = minimum*45;
            }
            if(offer[i][5] < 1){ //correct min years
                offer[i][5] = 1;
            }
            if(offer[i][5] > 3){ //correct max years
                offer[i][5] = 3;
            }
            var params = '?action=Send Offer' +
						    '&bonus=' + offer[i][2] +
						    '&contract_type=' + offer[i][4] +
						    '&daily_salary=' + offer[i][1] +
						    '&duration_season=' + offer[i][5] +
						    '&no_trade=' + offer[i][3] +
						    '&note= ' +
						    '&player_id=' + offer[i][0] + 
						    '&team_id=' + teamId;
	        var url = 'http://goallineblitz.com/game/make_offer.pl';
	        var txt = get(url+params);
        }
        document.getElementById('signDiv').innerHTML = '<span style="color: green; float: right;">Done!</span>';
    }catch(err){
        document.getElementById('signDiv').innerHTML = '<span style="color: red; float: right;">' + err + '</span>';
    }        
}

function getMinimum(playerId){
    var url = 'http://goallineblitz.com/game/make_offer.pl?player_id=' + playerId;
    var txt = get(url);
    document.getElementById('hiddenDiv').innerHTML = txt;
	return parseInt(document.getElementById('minimum_salary').innerHTML);
}

function get(url){
    var xmlhttp = new XMLHttpRequest();    
    xmlhttp.open('GET',url,false);
    xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(null);
    return xmlhttp.responseText;
}

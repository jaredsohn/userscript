// ==UserScript==
// @name           	GLB Ticket Price Assistant Upd. S32
// @namespace      	http://mmofootball.tk/
// @description    	Helps you set prices of tickets.
// @include       	http://goallineblitz.com/game/stadium.pl?team_id=*
// @include             http://goallineblitz.com/game/team_finances.pl?team_id=*
// @copyright           2013, AirMcMVP
// @version		2013.01.24
// ==/UserScript==

window.setTimeout(main,10);

function main(){
    if(window.location.href.indexOf('stadium.pl') != -1){
        //add a button to quick fill everything
        var location = document.getElementById('content_pricing').getElementsByTagName('tbody')[0];
        var tr = document.createElement('tr');
        tr.setAttribute('id', 'assistantRow');
        location.insertBefore(tr, location.firstChild);
        html =  '<td class="seating_chart_label" style="width: 170px;">Auto-Price Setter </td>' +
        '<td class="seating_chart_value" style="width: 246px; text-align: left;">' +
        '<input id="ticketPercentage" value="100">% <span id="buttonHolder" />' +
        '</td>';
        tr.innerHTML = html;
        var button = document.createElement('input');
        button.setAttribute('id', 'setTickets');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Run');
        button.addEventListener('click', setTicketPrices, false);
        document.getElementById('buttonHolder').appendChild(button);

        //create a span to hold the percentages
        for(var i=0; i<10; i++){
            location = document.getElementsByClassName('expected')[i];
            var span = document.createElement('span');
            span.setAttribute('class', 'percentHolder');
            span.setAttribute('style', 'color: green;');
            span.addEventListener('click', function() {
                lockSpan(this);
            }, false);

            location.parentNode.insertBefore(span, location);
            location.setAttribute("style","visibility: hidden; display:none;");
        }

        document.getElementsByClassName('expected')[10].innerHTML = '*Percentage of price fans expect to pay shown in green.<br /><br />Click on a percentage to <span style="color: red;">lock</span> its price from being auto-updated.'
        //add eventlisteners

        for(i=0; i<10; i++){
            location = document.getElementById('content_pricing').getElementsByTagName('tbody')[1].getElementsByClassName('seating_chart_value')[i];
            location.firstChild.addEventListener('keyup', updatePercentages, false);
        }
    } else {
        //create our button and input to autoset the price
        location = document.getElementsByName('action')[0].parentNode;

        //create a div to store our button and input
        var div = document.createElement('div');
        div.setAttribute('style','float: right;');
        
        var input = document.createElement('input');
        input.setAttribute('id','ticketPercentage');
        input.setAttribute('value', '100');

        div.appendChild(input);

        button = document.createElement('input');
        button.setAttribute('id', 'setTickets');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Adjust Prices');
        button.addEventListener('click', setTicketPrices, false);

        div.appendChild(button)

        location.parentNode.insertBefore(div,location.nextSibling);
        
        //create a span to hold the percentages
        location = document.getElementsByClassName('seating');
		
		for(i=30; i<40; i++){
            var val = location[i].innerHTML;
			
            span = document.createElement('span');
            span.setAttribute('class', 'percentHolder');
            span.setAttribute('style', 'color: green;');
            span.addEventListener('click', function() {
                lockSpan(this);
            }, false);

            location[i].innerHTML = '';
            location[i].appendChild(span);
            
            span = document.createElement('span');
            span.setAttribute("style","visibility: hidden; display:none;");
            span.innerHTML = val;

            location[i].appendChild(span)
        }

        //add eventlisteners
        location = document.getElementsByClassName('seating')
        for(i=10; i<20; i++){
            location[i].firstChild.addEventListener('keyup', updatePercentages, false);
        }
    } 
    updatePercentages();
}

function setTicketPrices(){
    //get user percentage
    var percent = (document.getElementById('ticketPercentage').value)/100;
    var suggested = new Array();

    //get suggested prices
    for(var i=0; i<10; i++){
        suggested[i] = parseFloat(document.getElementsByClassName('percentHolder')[i].nextSibling.innerHTML.replace('$',''));
    }

    //set prices
    if(window.location.href.indexOf('stadium.pl') != -1){
        location = document.getElementById('content_pricing').getElementsByTagName('tbody')[1].getElementsByClassName('seating_chart_value');
    }else{
        temp = document.getElementsByClassName('seating');
        location = new Array();
        for(i=20; i<30; i++){
            location.push(temp[i]);
        }
    }

    for(i=0; i<10; i++){
        if(document.getElementsByClassName('percentHolder')[i].id != 'locked'){
            location[i].firstChild.value = (suggested[i]*percent).toFixed(2);
        }
    }
    updatePercentages();
}

function updatePercentages(){
    //get suggested prices
    var suggested = new Array();
    for(var i=0; i<10; i++){
        suggested[i] = parseFloat(document.getElementsByClassName('percentHolder')[i].nextSibling.innerHTML.replace('$',''));
    }

    //get percentage
    if(window.location.href.indexOf('stadium.pl') != -1){
        location = document.getElementById('content_pricing').getElementsByTagName('tbody')[1].getElementsByClassName('seating_chart_value');
    }else{
        temp = document.getElementsByClassName('seating');
        location = new Array();
        for(i=20; i<30; i++){
            location.push(temp[i]);
        }
    }
    var percent = new Array();

    for(i=0; i<10; i++){
        percent[i] = parseInt((location[i].firstChild.value.replace('$','')/suggested[i])*100);
    }

    //set percentages in spans
    for(i=0; i<10; i++){
        document.getElementsByClassName('percentHolder')[i].innerHTML = percent[i] + '%';
    }
}

function lockSpan(location){
    if(location.id == 'locked'){
        location.setAttribute('id', '');
        location.setAttribute('style', 'color: green;');
    } else {
        location.setAttribute('id', 'locked');
        location.setAttribute('style', 'color: red;');
    }
}
// ==UserScript==
// @name      HashCow stats
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  Additional stats for HashCow mining pool
// @match     *://hashco.ws/stats.php*
// @require http://code.jquery.com/jquery-latest.js
// @copyright  2013+, Kalnas
// ==/UserScript==

$ = unsafeWindow.$;

sum = 0.0;
durationSum = 0.0;
dayDuration = 24*3600;

var coinsArray = [];

for (i=1; i<30; i++)

{   
	roundEarnedString = $("#poolstats > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(2)>tr:nth-child("+i.toString()+") > td:nth-last-child(1)").text().slice(0, -4);

    if (roundEarnedString.length <4) //filter out zeroes
        roundEarnedString='0.0';
    
    roundEarned = parseFloat(roundEarnedString);
    
    sum += roundEarned;

    duration = $("#poolstats > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(2)>tr:nth-child("+i.toString()+") > td:nth-child(3)").text();
    
	hours = parseInt(duration.slice(0,2));
	mins = parseInt(duration.slice(3,5));
	secs = parseInt(duration.slice(6,8));
    roundDuration =  hours*3600 + mins*60 + secs; 

	durationSum += roundDuration;
    
    speed = roundEarned / roundDuration * dayDuration;
    
 
    $("#poolstats > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(2)>tr:nth-child("+i.toString()+") > td:nth-last-child(1)").after('<td>'+speed.toFixed(6)+'</td>');
    
    
    
    coin = $("#poolstats > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(2)>tr:nth-child("+i.toString()+") > td:nth-child(2)").text();
       
    var element = null;
    j=0;
    while (el = coinsArray[j++]) {
        if (el.coin == coin){
            element = el;
            break;
        }
    }
    if (element == null){
        element = new Object();
        element.coin = coin;
        element.time = roundDuration;
        element.earned = roundEarned;
        coinsArray[coinsArray.length] = element;
    }else{
        element.time += roundDuration;
        element.earned += roundEarned;
    }
    

    
}

averageSpeed = (sum / durationSum * dayDuration).toFixed(6);

//set colors for round speeds
for (i=1; i<30; i++)

{   
    speedEl = $("#poolstats > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(2)>tr:nth-child("+i.toString()+") > td:nth-last-child(1)");
	speed = parseFloat(speedEl.text());
    
    if(speed > averageSpeed * 1.2)
        speedEl.css("background-color", "green");
    else if (speed < averageSpeed * 0.8)
        speedEl.css("background-color", "red");
    else
        speedEl.css("background-color", "yellow");
}
    
    

$('#poolstats > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > table:nth-child(2) > thead:nth-child(1) > tr:nth-child(1) > th:nth-last-child(1)').after('<th>Round Speed (BTC/day)</th>');
$('div.container:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > table:nth-child(2) > thead:nth-child(1) > tr:nth-child(1) > th:nth-last-child(1)').after('<th>Mined in Last 30 Rounds</th><th>24h Estimate</th>');
$('div.container:nth-child(3) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-last-child(1)').after('<td>'+sum.toFixed(6)+'</td><td>' + averageSpeed +'</td>');


//sort by speed descending
coinsArray.sort(sortfunction)

function sortfunction(a, b){
 return (b.earned / b.time) - (a.earned / a.time);
}


html = '<div class="panel panel-default">'+
     '<div class="panel-heading">Avg Speed Per Coin</div>'+
    '<table class="table compress">'+
    '<thead><tr><th>Coin</th><th>Speed (BTC/day)</th></tr></thead>'+
    '<tbody>';
for (var i = 0; i < coinsArray.length; ++i){
 html += '<tr><td>';
    html += coinsArray[i].coin;
    html += '</td><td>';
    html += (coinsArray[i].earned / coinsArray[i].time * dayDuration).toFixed(6);
    html += '</td></tr>';
}
        
    html+='</tbody></table></div>';

$('#poolstats > div:nth-child(3) > div:nth-child(1) > div:nth-child(1)').before(html);




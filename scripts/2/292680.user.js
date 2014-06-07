// ==UserScript==
// @name          Airline Manager AutoStart Script
// @author        YourMom
// @include       http://apps.facebook.com/airline_manager/route.php
// @include       https://apps.facebook.com/airline_manager/route.php?token=flight
// ==/UserScript==

/* README!!!!
 * With this configuration below the script check every 8 minutes if fuel's price is 
 * less that $600 for 1000lbs. If so and the current fuel availability is less that 1500000lbs
 * script buy 1000000lbs. Also, if current fuel availability is less that 100000lbs script buy 400000lbs of fuel
 * at any price.
 * Adjuste the value below to you needs.
 */

//Configuration section
var enableFuelPurchase = false; //Set to "true" (without quotes) to enable the automatic purchase of fuel or "false" otherwise
var fuelPurchaseInterval = 8; //Interval of availability check 
var buyPrice = 600; //Price under of this fuel will be purchased
var fuelThreshold = 1500000; //Fuel under of this will be purchased
var amountToBuy = 1000000; //Amount of fuel (lbs) that will be bought if the current fuel goes under the fuelThreshold
var minFuelThreshold = 100000;
var minAmountToBuy = 400000;
//End of configuration section - DO NOT EDIT BELOW

var currentAccount=0;
var currentFuel =0;
var currenPrice =0;
var secondsToGo = 0;

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

//Check if jquery is loaded successfully
function GM_wait() {
    if(typeof unsafewindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait,100);
    }
    else {
        $ = unsafewindow.jQuery; letsStart();
    }
}
GM_wait();

function letsStart() {

    var rows = $('#app93673891404_flight tr');
    var time = -1;

    for(var i=1;i<rows.length;i++){
        var temp = stripHTML(rows[i].childNodes[4].innerHTML);
        if(!temp.match(/check/i)){
            time = temp;
            break;
        }
    }

    if(time != -1){

        secondsToGo = calculateTimeSeconds(time) + Math.floor(Math.random()*60*2);

        var flights = document.getElementById('app93673891404_flight');
        var p = document.createElement('p');
        p.setAttribute('style', 'margin-left:5px');
        insertAfter(p,flights);

        if(secondsToGo != Number.NaN){

            p.innerHTML = 'Next auto-start is in <span style="font-weight:bold;" id="secondsLeft">'+secondsToGo+'</span> seconds. Please don\'t close this window/tab';

            setInterval(updateCounter, 1000);

            setTimeout(startFlights, secondsToGo * 1000);

            if(enableFuelPurchase){
                setInterval(loadFuelPage, fuelPurchaseInterval*60000 );
            }
        }else{
            p.innerHTML = "Starting now!";
            startFlights();
        }

    }else
        alert('Nothing to do, script stopped');

}

//Load Fuel Page and check if fuel must be purchased
function loadFuelPage(){
    
    //Add a hidden div to insert the fuel page
    var divPageFuel = document.createElement('div');
    divPageFuel.setAttribute('style', 'display:none;');
    divPageFuel.setAttribute('id', 'pageFuelDiv');
    document.getElementsByTagName('body')[0].appendChild(divPageFuel);

    //Load the page into the hidden div
    $('#pageFuelDiv').load('fuel.php','',function(){

        //Get Values from the html
        currentAccount = normalize($('#app93673891404_header_account', '#pageFuelDiv').find('b').html());
        currentFuel = normalize($('#app93673891404_header_fuel', '#pageFuelDiv').find('b').html());
        currentPrice = normalize($('#pageFuelDiv').find("b:contains('price:')").parent().parent().find('font > b').html());
        
        if((currentFuel <= fuelThreshold) && (currentPrice <= buyPrice)){
            buyFuel(amountToBuy);
        }else if (currentFuel < minFuelThreshold){
            buyFuel(minAmountToBuy);
        }

        //Remove the hidden div from the page
        var d = document.getElementsByTagName('body')[0];
        var div = document.getElementById('pageFuelDiv');
        d.removeChild(div);
        
    });
}

function startFlights()
{
    document.getElementById('app93673891404_frmbtn').click();
    setTimeout(function(){
        window.location.href = 'http://apps.facebook.com/airline_manager/route.php';
    }, 3000);
}

function updateCounter(){
    if(secondsToGo==0)
    {
        clearInterval(updateCounter);

    }else{

        secondsToGo = secondsToGo -1;
        document.getElementById('secondsLeft').innerHTML=secondsToGo;

    }
}

//Buy fyuel
function buyFuel(amount){
    document.getElementById('app93673891404_fuel').value = amount;
    $('#app93673891404_frmbtn','#pageFuelDiv').click();
  
}

//Remove all character that are not digits from a string
function normalize(str){
    return parseInt(str.replace(/[^0-9]/g,""));
}

function calculateTimeSeconds(time){

    var tokens = time.split(":");

    var hours = parseInt(tokens[0]*3600);
    var minutes = parseInt(tokens[1]*60);
    var seconds = parseInt(tokens[2]);

    return hours + minutes + seconds;

}

//Remove all html tags in a string.
function stripHTML(oldString) {

    var newString = "";
    var inTag = false;

    for(var i = 0; i < oldString.length; i++) {

        if(oldString.charAt(i) == '<')
            inTag = true;

        if(oldString.charAt(i) == '>') {

            if(oldString.charAt(i+1)!="<")
            {
                inTag = false;
                i++;
            }

        }

        if(!inTag)
            newString += oldString.charAt(i);

    }

    return newString;
}

//Insert an element after another one
function insertAfter(newElement,targetElement) {

    var parent = targetElement.parentNode;

    if(parent.lastchild == targetElement) {

        parent.appendChild(newElement);

    } else {

        parent.insertBefore(newElement, targetElement.nextSibling);

    }
}
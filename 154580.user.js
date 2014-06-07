// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2 of the License, or any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
// warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// Please see the full GNU General Public License at <http://www.gnu.org/licenses>
//--------------------------------------------------------------------------------------------------------------------------

// This meta is to allow the script to read the commented lines in between.
// The commented lines are for Greasmonkey to read, but we also need it for
// the Check4Update function to get the version number of this script to
// compare it with the latest version on the server.
var fap_meta = <><![CDATA[
// ==UserScript==
// @name    Airline Manager Auto Pilot
// @url        http://fadvisor.net/blog/2010/03/auto-pilot/
// @namespace    autopilot
// @author    Fahad Alduraibi
// @version    1.2.17
// @include    http*://apps.facebook.com/airline_manager/*
// @include    http*://airlinemanager.activewebs.dk/am/*
// @ThanksTo    Olla, Luke, Nano and All of you users and commenters
// ==/UserScript==
]]></>;

var fDelay;    // A delay value after opening or doing an action (to give the browser sometime to load tha page), this time is in milliseconds, each 1000 milliseconds = 1 second
var fRndDelay;

var fmin=0;    // Global variable for the minutes of the counter
var fsec;    // Global variable for the seconds of the counter
var ftimeref;    // A refrence to the timer object so we can call it again to stop it
var fSL=0;    // Global variable used for the number of rounds the script should wait for while loading a page before it stops
var fML=0;    // Global variable that keep count of how many times the we ran the script after the AM page was loaded. (this is to solve a bug in AM) so after a number of rounds it will just refresh and reload the AM page.
var FBSession;    // Stores the Facebook settion identifier for the user which AM uses when calling its own links to know the FB user.
var fFuelTankMax; // Maximum amount of fuel a normal tank can have (that could change by AM)
var fLuckyFuelPrice;

function fRand(value){    // Generates a random number between 1 and value (we use it mainly to add a random seconds while calling the AM funstions
    return Math.floor(Math.random() * (value+1));
}

function isSSL(){
    if (window.location.protocol === 'https:')
	return true;
    else
	return false;
}

function replaceText(sId, sText){    // A the name says, it sets the text of an HTML element if you have its ID
    var f_el;
    if (document.getElementById && (f_el = document.getElementById(sId))){
	while (f_el.hasChildNodes()){
	    f_el.removeChild(f_el.lastChild);
	}
	f_el.appendChild(document.createTextNode(sText));
    }
}

var divObj = new Object();  // The DIV object for the controlbox
function moveMe(event){
    divObj.DIV = document.getElementById('fAMAP');	
    divObj.Left = parseInt(divObj.DIV.style.left) - event.pageX;
    divObj.Top = parseInt(divObj.DIV.style.top) - event.pageY;

    document.getElementById('fTitleBar').addEventListener("mousemove", moveStart, true);
    document.getElementById('fTitleBar').addEventListener("mouseup", moveStop, false);
}

function moveStart(event){
    divObj.DIV.style.left = (divObj.Left + event.pageX).toString() + "px";
    divObj.DIV.style.top = (divObj.Top  + event.pageY).toString() + "px";
}

function moveStop(){
    document.getElementById('fTitleBar').removeEventListener("mousemove", moveStart, true);
    document.getElementById('fTitleBar').removeEventListener("mouseup", moveStop, false);
    GM_setValue('fX-POS', divObj.DIV.style.left);
    GM_setValue('fY-POS', divObj.DIV.style.top);
}

function FindVal(str, beforeVal, afterVal){ //Searches for a value between two strings and strips any non-digit characters
    var loc1 = str.indexOf(beforeVal);
    if (loc1 > -1){
	var loc1len = str.indexOf(afterVal, loc1 + beforeVal.length);

	return str.substring(loc1 + beforeVal.length, loc1len).replace(/[^0-9\-]/g, '');
    } else
	return null;
}

function stripTags(sText){  // Remove HTML tags (anything in between <*>), and replace any double space with single space
    return sText.replace(/<\/?[^>]+(>|$)/g, " ").replace('  ', ' ');
}

function getMyVersion(){
    tmp = fap_meta.toString().replace(/\n/g,'!_!').replace(/^.*@version\s*/, '').replace(/!_!.*$/, '');
    return  tmp; 
}

function fCheck4Update(){
    var fDate = new Date();
    var fTime = Math.floor(fDate.getTime() / 259200000);    // Convert to 3 days (3 days = 259200000 milliseconds)
    var fOldTime = GM_getValue('fOldTime', '-1');

    GM_log('Update -> ' + Math.floor(fDate.getTime() / 259200000));
    if ( (fTime - fOldTime) > 0){    // Perform the real check every 3 days

	fCV = getMyVersion();

	if (GM_getValue('fOldVer') === fCV){
	    GM_log('You did not update yet!!!!!!! x-(');
	    replaceText('f_status','Get the new update');
	}else {

	    GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://fadvisor.net/blog/download/am_latest_version',
		headers: {
		    'User-Agent': 'Mozilla/5.0 (compatible) Greasemonkey-Autopilot',
		    'Accept': 'text/xml'
		},
		onload: function(response) {
		    if (response.status === 200){
			var fSV = response.responseText.toString().replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');    // Strip whitespaces and line-feeds
			GM_log('Response =' + response.responseText);
			if (fCV === fSV){
			    GM_setValue('fOldTime',fTime);
			    GM_log('You are in good shape :)');
			} else{
			    GM_log('You need to update :(');
			    GM_setValue('fOldVer',fCV);
			    replaceText('f_status','Get the new update');
			}
		    } else{
			GM_log('Unable to fetch AP update page');
		    }
		}
	    });
	}
    }
}

function f_Cargo(){
    var d_fly = document.getElementById('flight');
    if (d_fly === null && fSL < 20){
	GM_log('Cargo-wait');
	fSL++;
	window.setTimeout(f_Cargo, fDelay+fRand(fRndDelay));
    } else if ( fSL >= 20 ){
	reLoadMe('');
    } else{
	fSL=0;

	// Look for the Start Routes button and click it
	GM_log('Searching for the cargo link..');
	var att;
	var fL=false;
	a_List = d_fly.getElementsByTagName('a');
	for (i = 0; i < a_List.length; i++) {
	    att = a_List[i].getAttribute('onclick');
	    if (att!== null && att.search(/FetchFlightStarter\('ajax_f_all_new.\.php/)>-1){
		location.assign( 'javascript:' + att + ';void(0)' );
		GM_log('Fly them..');
		fL = true;
		break;
	    }
	}
	if (fL === false){
	    a_List = d_fly.getElementsByTagName('img');
	    for (i = 0; i < a_List.length; i++) {
		att = a_List[i].getAttribute('onclick');
		if (att!== null && att.search(/FetchFlightStarter\('ajax_f_all_new.\.php/)>-1){
		    location.assign( 'javascript:' + att + ';void(0)' );
		    GM_log('Fly cargo..');
		    fL = true;
		    break;
		}
	    }
	}
	if (fL === false){
	    a_List = d_fly.getElementsByTagName('input');
	    for (i = 0; i < a_List.length; i++) {
		att = a_List[i].getAttribute('onclick');
		if (att!== null && att.search(/FetchFlightStarter\('ajax_f_all_new.\.php/)>-1){
		    location.assign( 'javascript:' + att + ';void(0)' );
		    GM_log('Fly cargo..');
		    fL = true;
		    break;
		}
	    }
	}
	if (fL === false){
	    GM_log('Cargo-done.. see you later');
	    GM_setValue('fRun','done');
	}else{
	    //run cargo function again to fly more routes if any
	    GM_log('Do we have more cargo routes to fly?....');
	    window.setTimeout(f_Cargo, fDelay+fRand(fRndDelay));
	}
    }
}

function f_openCargo(){
    var att;
    var fL=false;
    var a_List = document.getElementsByTagName('a');
    for (var i = 0; i < a_List.length; i++) {
	att = a_List[i].getAttribute('onclick');
	if (att!== null && att.search(/Fetch\("route_indexC\.php/)>-1){
	    location.assign( 'javascript:' + att + ';void(0)' );
	    GM_log('Found Cargo, open it..');
	    fSL=0;
	    window.setTimeout(f_Cargo, fDelay+fRand(fRndDelay));
	    fL = true;
	    break;
	}
    }
    if (fL === false && fSL < 20){
	GM_log('Cargo not found yet...');
	fSL++;
	window.setTimeout(f_openCargo, fDelay+fRand(fRndDelay));
    }
    else if ( fSL >= 20 )
	reLoadMe('');
}

function f_Fly(){
    var d_fly = document.getElementById('flight');
    if (d_fly === null && fSL < 20){
	GM_log('F-wait');
	fSL++;
	window.setTimeout(f_Fly, fDelay+fRand(fRndDelay));
    } else if ( fSL >= 20 ){
	reLoadMe('');
    } else{
	fSL=0;

	// Look for the Start Routes button and click it
	GM_log('Searching for the fly link..');
	var att;
	var fL=false;
	a_List = d_fly.getElementsByTagName('a');
	for (i = 0; i < a_List.length; i++) {
	    att = a_List[i].getAttribute('onclick');
	    if (att!== null && att.search(/FetchFlightStarter\('ajax_f_all_new.\.php/)>-1){
		location.assign( 'javascript:' + att + ';void(0)' );
		GM_log('Fly them..');
		fL = true;
		break;
	    }
	}
	if (fL === false){
	    a_List = d_fly.getElementsByTagName('img');
	    for (i = 0; i < a_List.length; i++) {
		att = a_List[i].getAttribute('onclick');
		if (att!== null && att.search(/FetchFlightStarter\('ajax_f_all_new.\.php/)>-1){
		    location.assign( 'javascript:' + att + ';void(0)' );
		    GM_log('Fly them..');
		    fL = true;
		    break;
		}
	    }
	}
	if (fL === false){
	    a_List = d_fly.getElementsByTagName('input');
	    for (i = 0; i < a_List.length; i++) {
		att = a_List[i].getAttribute('onclick');
		if (att!== null && att.search(/FetchFlightStarter\('ajax_f_all_new.\.php/)>-1){
		    location.assign( 'javascript:' + att + ';void(0)' );
		    GM_log('Fly them..');
		    fL = true;
		    break;
		}
	    }
	}
	if (fL === false){
	    GM_log('Fly-done..');
	    GM_setValue('fRun','cargo');
	    fExecutionPipe();
	}else{
	    //run fly function again to fly more routes if any
	    GM_log('Do we have more routes to fly?....');
	    window.setTimeout(f_Fly, fDelay+fRand(fRndDelay));
	}
    }
}

function f_openFlight(){
    var att;
    var fL=false;
    var a_List = document.getElementsByTagName('a');
    for (var i = 0; i < a_List.length; i++) {
	att = a_List[i].getAttribute('onclick');
	if (att!== null && att.search(/Fetch\("route\.php/)>-1){
	    location.assign( 'javascript:' + att + ';void(0)' );
	    GM_log('Found F, open it..');
	    fSL=0;
	    window.setTimeout(f_Fly, fDelay+fRand(fRndDelay));
	    fL = true;
	    break;
	}
    }
    if (fL === false && fSL < 20){
	GM_log('F not found yet...');
	fSL++;
	window.setTimeout(f_openFlight, fDelay+fRand(fRndDelay));
    }
    else if ( fSL >= 20 )
	reLoadMe('');
}

function f_Repair(){
    var att;
    var d_allc = document.getElementById('hroute');
    if (d_allc === null && fSL < 20){
	GM_log('R-wait');
	fSL++;
	window.setTimeout(f_Repair, fDelay+fRand(fRndDelay));
    } else if ( fSL >= 20 )
	reLoadMe('');
    else{
	fSL=0;
	var d_repall = document.getElementById('damage_all');
	if (d_repall !== null){
	    var i_List = d_repall.getElementsByTagName('input');
	    if (i_List.length < 1){
		var fL=false;
		var a_List = d_allc.getElementsByTagName('a');
		for (var i = 0; i < a_List.length; i++) {
		    att = a_List[i].getAttribute('onclick');
		    if (att!== null && att.search(/Fetch\('repair_damage\.php/)>-1){
			location.assign( 'javascript:' + att + ';void(0)' );
			GM_log('Fix it..');
			fL = true;
			break;
		    }
		}
		if (fL === false){
		    GM_log('Could not find the fix link!!...');
		}
	    } else{
		for (var j = 0; j < i_List.length; j++) {
		    att = i_List[j].getAttribute('value');
		    GM_log('att = ' + att);
		    if (att!== null && att === 'Repair all damages'){
			GM_log('R-Fix_All');
			GM_setValue('fProg','Fly');
			i_List[j].click();
			break;
		    }
		}
	    }
	}
	else
	    GM_log('Nothing to repair');
        
	GM_log('Repair done...');
	GM_setValue('fRun','fly');
	fExecutionPipe();
    }
}

function f_openRepair(){
    var att;
    var fL=false;
    var a_List = document.getElementsByTagName('a');
    for (var i = 0; i < a_List.length; i++) {
	att = a_List[i].getAttribute('onclick');
	if (att!== null && att.search(/Fetch\("maintenance\.php/)>-1){
	    location.assign( 'javascript:' + att + ';void(0)' );
	    GM_log('Found R, open it..');
	    fSL=0;
	    window.setTimeout(f_Repair, fDelay+fRand(fRndDelay));
	    fL = true;
	    break;
	}
    }
    if (fL === false && fSL < 20){
	GM_log('R not found yet... l=' + location.href);
	fSL++;
	window.setTimeout(f_openRepair, fDelay+fRand(fRndDelay));
    } else if ( fSL >= 20 )
	reLoadMe('');
}

function f_CCheck(){
    var att;
    var d_allc = document.getElementById('hroute');
    if (d_allc === null && fSL < 20){
	GM_log('C-wait');
	fSL++;
	window.setTimeout(f_CCheck, fDelay+fRand(fRndDelay));
    } else if ( fSL >= 20 )
	reLoadMe('');
    else{
	fSL=0;
	var d_repall = document.getElementById('check_all');
	if (d_repall !== null){
	    var i_List = d_repall.getElementsByTagName('input');
	    if (i_List.length < 1){
		var fL=false;
		var a_List = d_allc.getElementsByTagName('a');
		for (var i = 0; i < a_List.length; i++) {
		    att = a_List[i].getAttribute('onclick');
		    if (att!== null && att.search(/Fetch\('c_perf\.php/)>-1){
			location.assign( 'javascript:' + att + ';void(0)' );
			GM_log('Do C-Check..');
			fL = true;
			break;
		    }
		}
		if (fL === false){
		    GM_log('Could not find the c-check link!!...');
		}
	    } else{
		for (var j = 0; j < i_List.length; j++) {
		    att = i_List[j].getAttribute('value');
		    GM_log('C-Check = ' + att);
		    if (att!== null && att.search(/Perform all [0-9]* checks/)>-1){
			GM_log('C-Check_All');
			i_List[j].click();
			break;
		    }
		}
	    }
	}
	else
	    GM_log('Nothing to c-check');

	GM_log('C-Check done...');
	GM_setValue('fRun','repair');
	fExecutionPipe();
    }
}

function f_openCCheck(){
    var att;
    var fL=false;
    var a_List = document.getElementsByTagName('a');
    for (var i = 0; i < a_List.length; i++) {
	att = a_List[i].getAttribute('onclick');
	if (att!== null && att.search(/Fetch\("maintenance\.php/)>-1){
	    location.assign( 'javascript:' + att + ';void(0)' );
	    GM_log('Found C, open it');
	    fSL=0
	    window.setTimeout(f_CCheck, fDelay+fRand(fRndDelay));
	    fL = true;
	    break;
	}
    }
    if (fL === false && fSL < 20){
	GM_log('C not found yet...');
	fSL++;
	window.setTimeout(f_openCCheck, fDelay+fRand(fRndDelay));
    } else if ( fSL >= 20 )
	reLoadMe('');
}

function f_BuyCatering(){ 
    var sURL;
    if (isSSL())
	sURL='https://airlinemanager.activewebs.dk/am/catering_purchase.php?';
    else
	sURL='http://airlinemanager.activewebs.dk/am/catering_purchase.php?';
    
    var URL = sURL + FBSession + '&id=' + GM_getValue('lCatering',7) + '&am=' + GM_getValue('fCAmount',55000);

    GM_xmlhttpRequest({
	method: 'GET',
	url: URL,
	onload: function(response) {
	    if (response.status === 200){
		GM_log('Catering = ' + stripTags(response.responseText));
	    } else{
		GM_log('Unable to fetch AM Catering page');
	    }
	    GM_setValue('fRun','ads');
	    fExecutionPipe();
	}
    });
}

//function fBuyAirplane(){
//
//    fSL = fSL + 1;        // don't use the fSL variable, create something new for this function
//
//    GM_xmlhttpRequest({
//	method: 'POST',
//	url: 'http://airlinemanager.activewebs.dk/am/buy.php?' + FBSession,
//	data: 'acid=4&engine=GP7270&reg=A383-' + fSL,
//	//data: 'acid=298&engine=Mikulin AM-3&reg=T-' + fSL,
//	headers: {
//	    "Content-Type": "application/x-www-form-urlencoded"
//	},
//
//	onload: function(response) {
//	    GM_log(response.statusText + '  No. ' + fSL);
//
//	    if(fSL<48){
//		window.setTimeout(fBuyAirplane, 500);
//	    }else{
//		GM_log('Done.....');
//	    }
//	}
//    });
//}
//
//var ap_id = new Array();
//var count=0;
//function fSellAirplane(){
//    var d_sell = document.getElementById('fleet');
//    var i_List = d_sell.getElementsByTagName('input');
//    GM_log('List-> ' + i_List.length);
//    for (var j = 0; j < i_List.length; j++) {
//	att = i_List[j].getAttribute('name');
//	if (att!== null && att === 'fid'){
//	    ap_id[count] = i_List[j].getAttribute('value');
//	    count = count + 1;
//	}
//    }
//
//    GM_log('Total found = ' + count);
//    fSellAirplane2();
//}
//var iCo = 0;
//function fSellAirplane2(){
//    GM_xmlhttpRequest({
//	method: 'POST',
//	url: 'http://airlinemanager.activewebs.dk/am/sell.php?' + FBSession,
//	data: 'fid=' + ap_id[iCo],
//	headers: {
//	    "Content-Type": "application/x-www-form-urlencoded"
//	},
//
//	onload: function(response) {
//	    GM_log(response.statusText + '  No. ' + iCo);
//	    iCo = iCo + 1;
//
//	    if (iCo < count){
//		window.setTimeout(fSellAirplane2, 500);
//	    }else{
//		GM_log('Done.....');
//	    }
//	}
//    });
//}

function f_openAds(){
    var isBuyAds = false;
    var sURL;
    if (isSSL())
	sURL='https://airlinemanager.activewebs.dk/am/ads.php?' + FBSession;
    else
	sURL='http://airlinemanager.activewebs.dk/am/ads.php?' + FBSession;

    GM_xmlhttpRequest({
	method: 'GET',
	url: sURL,
	onload: function(response) {
	    if (response.status === 200){
		var searchRoutes = '<td>Routes:</td><td>';
		var searchAdRoutes = '<td>Routes with running ads:</td><td>';
		var str = response.responseText;
		
		var NumRoutes = FindVal(str, searchRoutes, '<');
		var NumAdRoutes = FindVal(str, searchAdRoutes, '<');
		GM_log('Number of routes = ' + NumRoutes + '  Number of routes with ads = ' + NumAdRoutes);
		
		if (NumRoutes !== NumAdRoutes) {
		    var searchPrice = "<input type='radio' name='type' value='10'></td><td> <font color=darkred>";
		    var aPrice = FindVal(str, searchPrice, '<');
		    GM_log('Ads cost is ' + aPrice);
		    
		    if( aPrice <= GM_getValue('fACost')){
			isBuyAds = true;
			BuyAds();
		    } else{
			GM_log("Ads are expensive :'(");
		    }
		    
		} else{
		    GM_log('No need for Ads.');
		}
	    } else{
		GM_log('Unable to fetch Ads page Error: ' + response.status);
	    }
	    if (isBuyAds === false){
		GM_setValue('fRun','ccheck');
		fExecutionPipe();
	    } 
	}
    });
}

function BuyAds(){
    var sURL;
    if (isSSL())
	sURL='https://airlinemanager.activewebs.dk/am/ads.php?m=ins&tp=wh&' + FBSession;
    else
	sURL='http://airlinemanager.activewebs.dk/am/ads.php?m=ins&tp=wh&' + FBSession;
    
    GM_log('Ads Type=' + GM_getValue('lAds') + '    and Days=' + GM_getValue('lADays'))
    GM_xmlhttpRequest({
	method: 'POST',
	url: sURL + FBSession,
	data: 'type=' + GM_getValue('lAds') + '&days=' + GM_getValue('lADays') +' &routes=all',
	headers: {
	    "Content-Type": "application/x-www-form-urlencoded"
	},

	onload: function(response) {
	    if (response.status === 200){
		GM_log('I got Ads');
	    } else{
		GM_log('Unable to do Ads. Error=' + response.statusText);
	    }
	    GM_setValue('fRun','ccheck');
	    fExecutionPipe();
	}
    });
}

function f_Fuel(){
    var fAmnt
    var sURL;
    var isBuyFuel = false;
    if (isSSL())
	sURL='https://airlinemanager.activewebs.dk/am/fuel.php?' + FBSession;
    else
	sURL='http://airlinemanager.activewebs.dk/am/fuel.php?' + FBSession;

    GM_xmlhttpRequest({
	method: 'GET',
	url: sURL,
	onload: function(response) {
	    if (response.status === 200){

		var SearchTank = '<b>Currently in tank:</b></td><td><b style=color:#3fa520>';
		var SearchPrice = '<b>Current fuel price:</td><td><font color=#2b98ec><b>$';
		var str = response.responseText;

		var Tank = FindVal(str, SearchTank, '<');
		if (Tank !== null){
		    GM_log('Tank amount is ' + Tank);

		    var Price = FindVal(str, SearchPrice, '<');
		    if (Price !== null){
			GM_log('Fuel cost is ' + Price);

			if( GM_getValue('fFuelLuck') === 'Checked' && Price <= fLuckyFuelPrice){
			    fAmnt = fFuelTankMax - Tank;
			    GM_log('I feel lucky today :)   Fuel needed = ' + fAmnt);
			    if( fAmnt > 0 ){
				isBuyFuel = true;
				BuyFuel(fAmnt);
			    }   
			} else if( Price <= GM_getValue('fFCost')){
			    if((GM_getValue('fFuelFill') === 'Checked')){
				fAmnt = fFuelTankMax - Tank;
			    }else{
				fAmnt = GM_getValue('fFAmount',1000000) - Tank;
			    }

			    GM_log('Fuel needed = ' + fAmnt);
			    if( fAmnt > 0 ){
				isBuyFuel = true;
				BuyFuel(fAmnt);
			    }
			}else{
			    GM_log('Fuel is expensive...  ;(');
			    if (Tank < 1 && GM_getValue('fFuelRescue') === 'Checked'){
				fAmnt = (Tank * -1) + 1;
				GM_log('We need ' + fAmnt + ' Lbs of fuel no matter what the price is X-(')
				isBuyFuel = true;
				BuyFuel(fAmnt);
			    }
			}
		    }else{
			GM_log('Price not found!! :(');
		    }
		}else{
		    GM_log('TankAmount not found!! :(');
		}
	    } else{
		GM_log('Unable to fetch AM Fuel page');
	    }
	    if (isBuyFuel === false){
		GM_setValue('fRun','catering');
		fExecutionPipe();
	    }  
	}
    }); 
}

function BuyFuel(amount){
    var sURL;
    if (isSSL())
	sURL='https://airlinemanager.activewebs.dk/am/fuel.php?' + FBSession + '&a=' + amount;
    else
	sURL='http://airlinemanager.activewebs.dk/am/fuel.php?' + FBSession + '&a=' + amount;
    
    GM_xmlhttpRequest({
	method: 'GET',
	url: sURL,
	onload: function(response) {
	    if (response.status === 200){
		GM_log('I got Fuel');
	    //		GM_log('Response = ' + stripTags(response.responseText));    // Show the response to know if fuel were purchased or maybe money is not enough!
	    } else{
		GM_log('Unable to fetch AM Fuel page');
	    }
	    GM_setValue('fRun','catering');
	    fExecutionPipe();
	}
    });
}

function GetFBSession(){    // Get the token ID for any link that has the token (some link has a null token, not sure if the token is really needed)
    // E.g: <a onclick="Fetch("fuel.php?tokenD=xXXXxxxXXXxxxXXXxxxXXXx","hfuel","runmeF");" href="javascript:void( 0 );">

    var a_List = document.getElementsByTagName('a');
    var pos;
    for (var i = 0; i < a_List.length; i++) {
	FBSession = a_List[i].getAttribute('onclick');

	if (FBSession!== null){
	    pos = FBSession.indexOf('fuel.php?');
	    if (pos >-1){
		FBSession = FBSession.substring(pos + 9);        // 9 is the length of the string "fuel.php?"
		pos = FBSession.search(/("|')/);    // Search for the first (") or (')
		FBSession = FBSession.substring(0, pos);
		GM_log('Session = ' + FBSession);
		break;
	    }
	}
    }
}

function fExecutionPipe(){
    fSL=0;
    
    if(GM_getValue('fRun') === 'fuel'){
	if(GM_getValue('fFuel','') === 'Checked'){
	    GM_log('Check Fuel...');
	    f_Fuel();
	} else{
	    GM_setValue('fRun','catering');
	}
    }

    if(GM_getValue('fRun') === 'catering'){
	if(GM_getValue('fCatering','') === 'Checked'){
	    GM_log('Buy Catering...');
	    f_BuyCatering();
	} else{
	    GM_setValue('fRun','ads');
	}
    }
    
    if(GM_getValue('fRun') === 'ads'){
	if(GM_getValue('fAds','') === 'Checked'){
	    GM_log('Do Ads...');
	    f_openAds();
	} else{
	    GM_setValue('fRun','ccheck');
	}
    }
    
    if(GM_getValue('fRun') === 'ccheck'){
	if(GM_getValue('fCheck','Checked') === 'Checked'){
	    GM_log('Do CCheck...');
	    f_openCCheck();
	} else{
	    GM_setValue('fRun','repair');
	}
    }
    
    if(GM_getValue('fRun') === 'repair'){
	if(GM_getValue('fRepair','Checked') === 'Checked'){
	    GM_log('Do Repair...');
	    f_openRepair();
	} else{
	    GM_setValue('fRun','fly');
	}
    }
    
    if(GM_getValue('fRun') === 'fly'){
	GM_log('I believe I can fly...');
	f_openFlight();
    }
    
    if(GM_getValue('fRun') === 'cargo'){
	if(GM_getValue('fCargo','') === 'Checked'){
	    GM_log('Fly cargo...');
	    f_openCargo();
	} else{
	    GM_setValue('fRun','done');
	}
    }
}

function fPoller(){
    if(GM_getValue('fRun') === 'start'){
	GM_setValue('fRun','fuel');
	GM_log('Start');
	
	fDelay = GM_getValue('fDelay',4) * 1000;	    //load the delay value and converts it into milliseconds
	fRndDelay = GM_getValue('fRndDelay',5) * 1000;
	fLuckyFuelPrice = GM_getValue('fLuckyFuelPrice',50);
	fFuelTankMax = GM_getValue('fFuelTankMax',999999999);

	GetFBSession();
	
	fExecutionPipe();
    }

    window.setTimeout(fPoller, 4000);
}

function Display(min,sec){    // Format the time as hr:min:sec (h:mm:ss)
    var Hours = Math.floor(min/60);
    var Minutes = min%60;
    var disp = Hours+':';
       
    if(Minutes<=9)
	disp+='0'+Minutes+':';
    else 
	disp+=Minutes+':';

    if(sec<=9)
	disp+='0'+sec;
    else
	disp+=sec;

    return(disp);
}

function reLoadMe(Msg){
    if (Msg === ''){
	Msg = 'Something is wrong or page is not loading correctly, Refreshing the page....';
    }
    GM_log(Msg);
    GM_setValue('fRun','resume');
    //    window.location.reload(false);	//not good, shows a popup message asking the user to resend data!
    
    var sURL;
    if (isSSL())
	sURL='https://apps.facebook.com/airline_manager/';
    else
	sURL='http://apps.facebook.com/airline_manager/';
    window.parent.location.href = sURL;
}

function ff_Countdown(){
    fsec = fsec - 5;
    if((fmin<=0)&&(fsec<=0)){
	if ( fML < 5 ){    //Refresh the page every 5 runs (to over come a bug in AM page)
	    fmin = document.getElementById('f_timefreq').value - 0;
	    fmin = fmin - 0 + fRand(document.getElementById('f_randtime').value - 0);  // Add randomly between 0 to x minutes (the zero subtraction  is to make it arithmetic operation)
	    fsec = fRand(6) * 10;   //Randomize the starting time as well
	    //fCheck4Update();
	    fML++;
	    GM_setValue('fRun','start');
	} else{
	    reLoadMe('Been running for long time,, time to reload..');
	}
    } else if(fsec < 0){
	fsec=60 + fsec; //fsec will have a negative value at this stage so we add it to 60 to start the next counter
	fmin=fmin - 1;
    }
    replaceText('f_timer',Display(fmin,fsec));
}

function enableAutoPilot(){
    var f_LED = document.getElementById('f_timer');
    if (f_LED === null && fSL < 20)
    {
	fSL++;
	window.setTimeout(enableAutoPilot, fDelay+fRand(fRndDelay));
    } else{
	fSL=0;
	var f_Color = f_LED.getAttribute('bgcolor');
	if (f_Color === '#00ff00'){
	    window.clearInterval(ftimeref);
	    replaceText('f_timer','Stopped');
	    f_LED.setAttribute('bgcolor', '#ff0000');
	} else{
	    fmin=0;
	    fsec=0;
	    ftimeref = window.setInterval(ff_Countdown,5000);
	    replaceText('f_timer','Start');
	    f_LED.setAttribute('bgcolor', '#00ff00');
	}
    }
}

function wasIrunning(){
    if(GM_getValue('fRun')==='resume'){
	GM_log('i was running before..');
	window.setTimeout(enableAutoPilot,fDelay+fRand(fRndDelay))
    }
    else if (document.getElementById('fAutoStart').checked === true){
	GM_log('Auto starting...');
	window.setTimeout(enableAutoPilot,fDelay+fRand(fRndDelay))
    }
}

function fFuelASettings(){    // Store the fuel setting under Firefox
    GM_setValue('fFAmount',parseInt(document.getElementById('fFAmount').value));
}

function fCSettings(){    // Store the catering settings under Firefox
    GM_setValue('fCAmount',parseInt(document.getElementById('fCAmount').value));
    GM_setValue('lCatering',parseInt(document.getElementById('lCatering').value));

    if(document.getElementById('fCatering').checked === true){
	GM_setValue('fCatering', 'Checked');
    } else{
	GM_setValue('fCatering', '');
    }
}

function fASettings(){    // Store the advertising settings under Firefox
    GM_setValue('fACost',parseInt(document.getElementById('fACost').value));
    GM_setValue('lAds',parseInt(document.getElementById('lAds').value));
    GM_setValue('lADays',parseInt(document.getElementById('lADays').value));

    if(document.getElementById('fAds').checked === true){
	GM_setValue('fAds', 'Checked');
    } else{
	GM_setValue('fAds', '');
    }
}

function fSettings(){    // Store the script settings under Firefox
    GM_setValue('fTime',parseInt(document.getElementById('f_timefreq').value));
    GM_setValue('fRTime',parseInt(document.getElementById('f_randtime').value));
    GM_setValue('fNote',document.getElementById('fNote').value);
    GM_setValue('fFCost',parseInt(document.getElementById('fFCost').value));

    if(document.getElementById('fFuelFill').checked === true){
	GM_setValue('fFuelFill', 'Checked');
	document.getElementById('fFAmount').value = GM_getValue('fFuelTankMax',999999999);
	document.getElementById('fFAmount').disabled = true;
    } else{
	GM_setValue('fFuelFill', '');
	document.getElementById('fFAmount').value = GM_getValue('fFAmount',1000000);
	document.getElementById('fFAmount').disabled = false;
    }
    
    if(document.getElementById('fFuelRescue').checked === true){
	GM_setValue('fFuelRescue', 'Checked');
    } else{
	GM_setValue('fFuelRescue', '');
    }
    
    if(document.getElementById('fFuelLuck').checked === true){
	GM_setValue('fFuelLuck', 'Checked');
    } else{
	GM_setValue('fFuelLuck', '');
    }
    
    if(document.getElementById('fFuel').checked === true){
	GM_setValue('fFuel', 'Checked');
    } else{
	GM_setValue('fFuel', '');
    }

    if(document.getElementById('fRepair').checked === true){
	GM_setValue('fRepair', 'Checked');
    } else{
	GM_setValue('fRepair', '');
    }

    if(document.getElementById('fCheck').checked === true){
	GM_setValue('fCheck', 'Checked');
    } else{
	GM_setValue('fCheck', '');
    }
    
    if(document.getElementById('fCargo').checked === true){
	GM_setValue('fCargo', 'Checked');
    }
    else{
	GM_setValue('fCargo', '');
    }
    
    if(document.getElementById('fAutoStart').checked === true){
	GM_setValue('fAutoStart', 'Checked');
    } else{
	GM_setValue('fAutoStart', '');
    }
    
    GM_setValue('fDelay',parseInt(document.getElementById('fDelay').value));
    GM_setValue('fRndDelay',parseInt(document.getElementById('fRndDelay').value));
    GM_setValue('fLuckyFuelPrice',parseInt(document.getElementById('fLuckyFuelPrice').value));
    GM_setValue('fFuelTankMax',parseInt(document.getElementById('fFuelTankMax').value));
}

function addControls(){
    var fFB = document.getElementById('content');
    var fAP = document.getElementById('Autopilot');
    var fAM = document.getElementById('accountheader');

    if (fAM !== null){    // check if this is Airline Manager frame
	GM_log('AM_Loaded, start polling. l=' + location.href.toString().substr(0, 60));
	window.setTimeout(fPoller, fRand(1000));
    } else if (fFB !== null && fAP === null){    // check if this is Facebook frame, and check if Controls box is not already loaded
	var f_html = <><![CDATA[
	<div id="fAMAP" style="top: [Y-POS]; left: [X-POS];">
	<table border="0" cellpadding="2" cellspacing="0" class="table1">
	<caption id="fTitleBar" title="Click on me to move the box" class="title">Airline Manager Autopilot</caption>
	<tr><td><input title="Start or Stop the script" type="button" id="Autopilot" value="Autopilot"></td>
	<td colspan=3 style="border-left-style : solid; border-left-width : 1px; border-color:#9DAAB8;">Wait time <input title="Time to wait between each run" type="text" name="f_timefreq" value=fTimeReplace size="2px" maxlength="3" id="f_timefreq" class= "inputArea">
	min + Random <input title="A random value (between 0 & what you set) added to the wait time." type="text" name="f_randtime" value=fRTimeReplace size="2px" maxlength="3" id="f_randtime" class= "inputArea" alt="Random Time"></td></tr>
	<tr><td title="Status of the script (or count down to when it will run next)" id="f_timer" bgcolor="#ff0000" class="timer">Stopped</td>
	<td style="border-left-style : solid; border-left-width : 1px; border-color:#9DAAB8;"><input title="Enable doing c-check on aircraft before flying them" type="checkbox" name="fCheck" fCheckReplace id="fCheck" style="margin-top : 0px;">C-Check</td>
	<td><input title="Enable repairing aircraft before flying them" type="checkbox" name="fRepair" fRepairReplace id="fRepair" style="margin-top : 0px;">Repair</td>
	<td><input title="Enable flying Cargo aircraft (* only if you have them)" type="checkbox" name="fCargo" fCargoReplace id="fCargo" style="margin-top : 0px;">Fly Cargo</td></tr>
	
	<tr><td colspan=2 class="cellS"><a title="Open the Options" href="javascript:;//Open Options" onmousedown='if(document.getElementById("dOptions").style.display == "none"){ showTab("dOptions"); }else{ showTab(""); }'>[O]</a>&nbsp;
	<a title="Open the Catering Settings" href="javascript:;//Open Catering" onmousedown='if(document.getElementById("dCatering").style.display == "none"){ showTab("dCatering"); }else{ showTab(""); }'>[C]</a>&nbsp;
	<a title="Open the Fuel Settings" href="javascript:;//Open Fuel" onmousedown='if(document.getElementById("dFuel").style.display == "none"){ showTab("dFuel"); }else{ showTab(""); }'>[F]</a>&nbsp;
	<a title="* To be implemented * Open the Advertising Settings" href="javascript:;//Open Ads" onmousedown='if(document.getElementById("dAds").style.display == "none"){ showTab("dAds"); }else{ showTab(""); }'>[A]</a>&nbsp;
	<a title="* To be implemented * Open the Buy & Sell Aircraft Settings" href="javascript:;//Open Buy&Sell" onmousedown='if(document.getElementById("dBuySell").style.display == "none"){ showTab("dBuySell"); }else{ showTab(""); }'>[$]</a>&nbsp;
	<a title="Open the Note box" href="javascript:;//Open Note" onmousedown='if(document.getElementById("dNote").style.display == "none"){ showTab("dNote"); }else{ showTab(""); }'>[N]</a>&nbsp;
	<a title="Visit the script website" href="http://fadvisor.net/blog/2010/03/auto-pilot/">@</a>
	</td><td  id="f_status" colspan=2 class="cellS" style="color: red;"></td></tr>
	<tr id="dOptions" style="display:none"><td colspan="4" align="center" class="cellS">
	<input title="Start the script immediatly after loading the AM page" type="checkbox" name="fAutoStart" fAutoStartReplace id="fAutoStart" style="margin-top : 0px;">Auto Start on load
	<br>
	Tasks Delay<input title="Set the amount of delay between tasks [in seconds] (if you don't know what this means then don't change it)" type="text" name="fDelay" value=fDelayReplace size="1px" maxlength="2" id="fDelay" class= "inputArea">
	Tasks Random Delay<input title="Set the maximum random value added to the delay [in seconds] (if you don't know what this means then don't change it)" type="text" name="fRndDelay" value=fRndDelayReplace size="1px" maxlength="2" id="fRndDelay" class= "inputArea">
	<br>
	Lucky fuel price<input title="Set the lowest price fuel does reach (if you don't know what this means then don't change it)" type="text" name="fLuckyFuelPrice" value=fLuckyFuelPriceReplace size="2px" maxlength="3" id="fLuckyFuelPrice" class= "inputArea">
	<br>
	Max fuel tank capacity<input title="The maximum size of the fuel tank (if you don't know what this means then don't change it)" type="text" name="fFuelTankMax" value=fFuelTankMaxReplace size="8px" maxlength="10" id="fFuelTankMax" class= "inputArea">
	</td></tr>
	<tr id="dCatering" style="display:none"><td colspan="4" align="center" class="cellS">
	<input title="Enable buying catering before flying the aircraft (will only buy if you don't have any)" type="checkbox" name="fCatering" fCateringReplace id="fCatering" style="margin-top : 0px;">Catering
	<select title="Select the type of catering you like to buy" id="lCatering"><option value="7" lCatering7Selected>7- Sky+</option><option value="6" lCatering6Selected>6- Sky Catering</option><option value="5" lCatering5Selected>5- Sky Burgers</option>
	<option value="4" lCatering4Selected>4- Fast Food</option><option value="3" lCatering3Selected>3- Sky Fish</option><option value="2" lCatering2Selected>2- Cloud Chefs</option><option value="1" lCatering1Selected>1- AM Catering</option></select>
	Amount<input title="Set the amount of catering to buy (you should follow the min & max values set by the game)" type="text" name="fCAmount" value=fCAmountReplace size="4px" maxlength="5" id="fCAmount" class= "inputArea">
	</td></tr>
	<tr id="dFuel" style="display:none"><td colspan="4" align="center" class="cellS">
	<input title="Enable buying fuel" type="checkbox" name="fFuel" fFuelReplace id="fFuel" style="margin-top : 0px;">Fuel&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
	If price is or below <input title="The maximum price that you would like to pay for fuel, if the actual price is higher it will not buy anything (and if the price is lower it will buy with the lower price)" type="text" name="fFCost" value=fFCostReplace size="4px" maxlength="4" id="fFCost" class= "inputArea"><br>
	fill tank<input title="Check this box if you want the script to fill the tank to the maximum when the price is what you want" type="checkbox" name="fFuelFill" fFuelFillReplace id="fFuelFill" style="margin-top : 0px;">
	or fill up to <input title="The desired amount of fuel that you want to have in your tank" type="text" name="fFAmount" value=fFAmountReplace size="9px" maxlength="10" id="fFAmount" class= "inputArea"><br>
	<input title="If the tank is empty then buy enough fuel to fly the aircraft even if it is expensive" type="checkbox" name="fFuelRescue" fFuelRescueReplace id="fFuelRescue" style="margin-top : 0px;">Fuel Rescue
	<input title="When the fuel price drops to fLuckyFuelPriceReplace or below fill the tank" type="checkbox" name="fFuelLuck" fFuelLuckReplace id="fFuelLuck" style="margin-top : 0px;">Lucky Fuel
	</td></tr>
	<tr id="dAds" style="display:none"><td colspan="4" align="center" class="cellS">
	<table><tr><td>
	<input title="Enable buying advertisments" type="checkbox" name="fAds" fAdsReplace id="fAds" style="margin-top : 0px;">Ads
	|  If price is or below <input title="The maximum price that you would like to pay for ads, if the actual price is higher it will not buy anything (and if the price is lower it will buy with the lower price) *Use the prices of the most expensive ad, even if you are buying another type*" type="text" name="fACost" value=fACostReplace size="5px" maxlength="5" id="fACost" class= "inputArea">
	<a title="See the price prediction at this link" href="http://fadvisor.net/blog/2010/06/airlinemanager-ads-prices/"> @</a>
	</td></tr><tr><td>
	<select title="Select the type of advertising you like to buy" id="lAds"">
	<option value="1" lAds1Selected>Newspaper advertising</option>
	<option value="2" lAds2Selected>1 tv commercial</option>
	<option value="3" lAds3Selected>Internet: In major search engines</option>
	<option value="4" lAds4Selected>Internet: In major social networks</option>
	<option value="5" lAds5Selected>Bus and Taxi posters</option>
	<option value="6" lAds6Selected>10 tv commercials + newspaper ads</option>
	<option value="7" lAds7Selected>Cross country newspaper advertising</option>
	<option value="8" lAds8Selected>Billboards on major streetsg</option>
	<option value="9" lAds9Selected>Billboards on 1 major airport</option>
	<option value="10" lAds10Selected>Billboards on 20 international airports</option>
	</select>
	</td></tr><tr><td>
	<select title="Select the number of days to by ads for" id="lADays">
	<option value="1" lADay1Selected>1 Day</option>
	<option value="2" lADay2Selected>2 Days</option>
	<option value="3" lADay3Selected>3 Days</option>
	<option value="4" lADay4Selected>4 Days</option>
	<option value="5" lADay5Selected>5 Days</option>
	<option value="6" lADay6Selected>6 Days</option>
	<option value="7" lADay7Selected>7 Days</option>
	</select>
	</td></tr></table>
	</td>
	</tr>
	<tr id="dBuySell" style="display:none"><td colspan="4" align="center" class="cellS">
	Reserved for Buying and Selling aircraft
	<br>
	* To be implemented *
	</td></tr>
	<tr id="dNote" style="display:none"><td colspan="4" class="cellS">
	<textarea rows="4" class= "inputArea" style="text-align : left; width: 97%;" id="fNote">fNoteReplace</textarea>
	</td></tr></table>
	</div>
	]]></>;

	var fLeft = GM_getValue('fY-POS','100px');
	var fTop = GM_getValue('fX-POS','5px');
	
	if (fLeft.length < 3 || fTop.length <3 ){   // To reset the values in case they were not stored correctly
	    fLeft = '100px';
	    fTop = '5px';
	}

	f_html = f_html.toString().replace('[Y-POS]', fLeft);
	f_html = f_html.toString().replace('[X-POS]', fTop);
	f_html = f_html.toString().replace('fTimeReplace', GM_getValue('fTime',8));
	f_html = f_html.toString().replace('fRTimeReplace', GM_getValue('fRTime',4));
	f_html = f_html.toString().replace('fLuckyFuelPriceReplace', GM_getValue('fLuckyFuelPrice',50));
	f_html = f_html.toString().replace('fFuelTankMaxReplace', GM_getValue('fFuelTankMax',999999999));
	f_html = f_html.toString().replace('fRepairReplace', GM_getValue('fRepair','Checked'));
	f_html = f_html.toString().replace('fCheckReplace', GM_getValue('fCheck','Checked'));
	f_html = f_html.toString().replace('fCargoReplace', GM_getValue('fCargo',''));
	f_html = f_html.toString().replace('fAutoStartReplace', GM_getValue('fAutoStart',''));
	f_html = f_html.toString().replace('fDelayReplace', GM_getValue('fDelay','4'));
	f_html = f_html.toString().replace('fRndDelayReplace', GM_getValue('fRndDelay','5'));
	f_html = f_html.toString().replace('fCateringReplace', GM_getValue('fCatering',''));
	f_html = f_html.toString().replace('fCAmountReplace', GM_getValue('fCAmount',55000));
	f_html = f_html.toString().replace('fFuelReplace', GM_getValue('fFuel',''));
	f_html = f_html.toString().replace('fFuelRescueReplace', GM_getValue('fFuelRescue',''));
	f_html = f_html.toString().replace('fFuelLuckReplace', GM_getValue('fFuelLuck',''));
	f_html = f_html.toString().replace('fLuckyFuelPriceReplace', fLuckyFuelPrice);
	f_html = f_html.toString().replace('fFCostReplace', GM_getValue('fFCost',400));
	f_html = f_html.toString().replace('fFuelFillReplace', GM_getValue('fFuelFill',''));
	f_html = f_html.toString().replace('fFAmountReplace', GM_getValue('fFAmount',1000000));
	f_html = f_html.toString().replace('fNoteReplace', GM_getValue('fNote','Use this area to save notes'));
	f_html = f_html.toString().replace('lCatering' + GM_getValue('lCatering',7) + 'Selected', 'selected="yes"');
	f_html = f_html.toString().replace(/lCatering.?Selected/g, '');
	f_html = f_html.toString().replace('fAdsReplace', GM_getValue('fAds',''));
	f_html = f_html.toString().replace('fACostReplace', GM_getValue('fACost',7500));
	f_html = f_html.toString().replace('lAds' + GM_getValue('lAds',10) + 'Selected', 'selected="yes"');
	f_html = f_html.toString().replace(/lAds.?Selected/g, '');
	f_html = f_html.toString().replace('lADay' + GM_getValue('lADays',6) + 'Selected', 'selected="yes"');
	f_html = f_html.toString().replace(/lADay.?Selected/g, '');

	var f_script = <><![CDATA[
	function showTab(tabName){
	document.getElementById("dOptions").style.display = "none";
	document.getElementById("dCatering").style.display = "none";
	document.getElementById("dFuel").style.display = "none";
	document.getElementById("dAds").style.display = "none";
	document.getElementById("dBuySell").style.display = "none";
	document.getElementById("dNote").style.display = "none";
	
	if (tabName !== ""){
	document.getElementById(tabName).style.display = "table-row";
	}
	}
	]]></>;

	var f_style = <><![CDATA[
	#fAMAP {
	position: absolute;
	border-color: #9DAAB8;
	border-style: solid;
	border-width: 1px;
	-moz-box-shadow: 3px 3px 4px #444;
	-webkit-box-shadow: 3px 3px 4px #444;
	box-shadow: 3px 3px 4px #444;
	-moz-border-radius: 4px;
	-webkit-border-radius: 4px;
	border-radius: 4px;
	}
	
	.title {
	color: #fff;
	font-weight:bold;
	text-shadow:1px 1px 1px black;
	background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#91fcfc), to(#00bdff), color-stop(50%, #1277d7), color-stop(50%, #026bce));
	background-image:-moz-linear-gradient(top left 270deg, #91fcfc, #1277d7 50%, #026bce 50%, #00bdff);
	background-image:-o-linear-gradient(top left 270deg, #91fcfc, #1277d7 50%, #026bce 50%, #00bdff);
	background-image:linear-gradient(top left 270deg, #91fcfc, #1277d7 50%, #026bce 50%, #00bdff);
	-moz-border-radius: 3px 3px 0 0;
	-webkit-border-radius: 3px 3px 0 0;
	border-radius: 3px 3px 0 0;
	}
	
	.table1 {
	background-color: #ebebff;
	-moz-border-radius: 0 0 3px 3px;
	-webkit-border-radius: 0 0 3px 3px;
	border-radius: 0 0 3px 3px;
	}
	
	.cellS {
	border-top-style:solid; 
	border-top-width:1px; 
	border-color:#9DAAB8;
	}
	
	.inputArea {
	border: solid 1px #85b1de; 
	background-color: #fff;
	text-align : center;
	-moz-border-radius: 4px;
	-webkit-border-radius: 4px;
	border-radius: 4px;
	}
	
	.timer {
	font-size:1.3em; 
	text-align : center;
	}
	]]></>;
    
	var fscript = document.createElement('script');
	fscript.innerHTML = f_script;
	document.head.appendChild(fscript);
    
	var fstyle = document.createElement('style');
	fstyle.innerHTML = f_style;
	document.head.appendChild(fstyle);
	
	var fdiv = document.createElement('div');
	fdiv.innerHTML = f_html;
	fFB.appendChild(fdiv);

	document.getElementById('fTitleBar').addEventListener('mousedown',moveMe,true);
	document.getElementById('Autopilot').addEventListener('click',enableAutoPilot,false);
	document.getElementById('f_timefreq').addEventListener('change',fSettings,false);
	document.getElementById('f_randtime').addEventListener('change',fSettings,false);
	document.getElementById('fRepair').addEventListener('change',fSettings,false);
	document.getElementById('fCheck').addEventListener('change',fSettings,false);
	document.getElementById('fCargo').addEventListener('change',fSettings,false);
	document.getElementById('fAutoStart').addEventListener('change',fSettings,false);
	document.getElementById('fDelay').addEventListener('change',fSettings,false);
	document.getElementById('fRndDelay').addEventListener('change',fSettings,false);
	document.getElementById('fFuelTankMax').addEventListener('change',fSettings,false);
	document.getElementById('fLuckyFuelPrice').addEventListener('change',fSettings,false);
	document.getElementById('fCatering').addEventListener('change',fCSettings,false);
	document.getElementById('lCatering').addEventListener('change',fCSettings,false);
	document.getElementById('fCAmount').addEventListener('change',fCSettings,false);
	document.getElementById('fFuel').addEventListener('change',fSettings,false);
	document.getElementById('fFuelFill').addEventListener('change',fSettings,false);
	document.getElementById('fFuelRescue').addEventListener('change',fSettings,false);
	document.getElementById('fFuelLuck').addEventListener('change',fSettings,false);
	document.getElementById('fFCost').addEventListener('change',fSettings,false)
	document.getElementById('fFAmount').addEventListener('change',fFuelASettings,false);
	document.getElementById('fNote').addEventListener('change',fSettings,false);

	document.getElementById('fAds').addEventListener('change',fASettings,false);
	document.getElementById('fACost').addEventListener('change',fASettings,false);
	document.getElementById('lAds').addEventListener('change',fASettings,false);
	document.getElementById('lADays').addEventListener('change',fASettings,false);

	if(document.getElementById('fFuelFill').checked === true){
	    document.getElementById('fFAmount').value = fFuelTankMax;
	    document.getElementById('fFAmount').disabled = true;
	}

	fCheck4Update();

	GM_log('FB Controls loaded...l=' + location.href.toString());
	window.setTimeout(wasIrunning, fDelay);
    }
}
window.setTimeout(addControls, fDelay);


/*------------ To Do list --------------

- Selling & buying aircraft

 */

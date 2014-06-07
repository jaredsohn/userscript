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
// @name	Airline Manager Auto Pilot
// @url		http://fadvisor.net/blog/2010/03/auto-pilot/
// @namespace	autopilot
// @author	Fahad Alduraibi
// @version	1.2.6a
// @include	http://apps.facebook.com/airline_manager/*
// @include	http://airlinemanager.activewebs.dk/am/*
// @updaters	Fahad Alduraibi, Olla
// ==/UserScript==
]]></>;

var fDelay=4000;	// A delay value after opening or doing an action (to give the browser sometime to load tha page), this time is in milliseconds, each 1000 milliseconds = 1 second

var fmin=0;	// Global variable for the minutes of the counter
var fsec;	// Global variable for the seconds of the counter
var ftimeref;	// A refrence to the timer object so we can call it again to stop it
var fSL=0;	// Global variable used for the number of rounds the script should wait for while loading a page before it stops
var fML=0;	// Global variable that keep count of how many times the we ran the script after the AM page was loaded. (this is to solve a bug in AM) so after a number of rounds it will just refresh and reload the AM page.
var FBSession;	// Stores the Facebook settion identifier for the user which AM uses when calling its own links to know the FB user.
var fFuelTankMax=999999999; // Maximum amount of fuel a normal tank can have (that could change by AM)

function fRand(value){	// Generates a random number between 1 and value (we use it mainly to add a random seconds while calling the AM funstions
    return Math.floor(Math.random() * (value+1));
}

function replaceText(sId, sText){	// A the name says, it sets the text of an HTML element if you have its ID
    var f_el;
    if (document.getElementById && (f_el = document.getElementById(sId))){
	while (f_el.hasChildNodes()){
	    f_el.removeChild(f_el.lastChild);
	}
	f_el.appendChild(document.createTextNode(sText));
    }
}

function fCheck4Update(){
    var fDate = new Date();
    var fTime = Math.floor(fDate.getTime() / 259200000);	// Convert to 3 days (3 days = 259200000 milliseconds)
    var fOldTime = GM_getValue('fOldTime', '-1');

    //    if (fOldTime === '-1'){	   // The first time assume the user installed the latest version
    //	fOldTime = fTime;
    //	GM_setValue('fOldTime',fOldTime);
    //    }
    GM_log('Update -> ' + Math.floor(fDate.getTime() / 259200000));
    if ( (fTime - fOldTime) > 0){	// Perform the real check every 3 days

	var fCV = fap_meta.split(/[\n]+/).filter(/@version/).toString().replace(/^[\s\r\n]+|[\s\r\n]+$/g, '').split(/[\s]+/); //Get the line with word @version
	fCV = fCV[2]; // get the third element

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
			var fSV = response.responseText.toString().replace(/^[\s\r\n]+|[\s\r\n]+$/g, '');	// Strip whitespaces and line-feeds
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

//function f_Ads(){
//    var d_route = document.getElementById('hroute');
//    if (d_route === null && fSL < 20){
//	GM_log('Ads-wait');
//	fSL++;
//	window.setTimeout(f_Ads, fDelay+fRand(3000));
//    } else{
//
//	var i_List = d_route.getElementsByTagName('input');
//	for (var j = 0; j < i_List.length; j++) {
//	    att = i_List[j].getAttribute('value');
//	    if (att!== null && att.toString() === '10'){
//		i_List[j].checked=true;
//		var fPrice = i_List[j].parentNode.nextSibling.innerHTML.replace(/[^0-9]/g, '');
//		var fDate = new Date();
//		GM_log(fPrice + ',' + (fDate.getMonth()+1) + '/' + fDate.getDate() + ' ' + fDate.getHours() + ':' + fDate.getMinutes())
//
//		GM_xmlhttpRequest({
//		    method: "POST",
//		    url: "http://fadvisor.net/am_data.php",
//		    data: "text=" + (fDate.getMonth()+1) + '/' + fDate.getDate() + ' ' + fDate.getHours() + ':' + fDate.getMinutes() + ',' + fPrice,
//		    headers: {
//			"Content-Type": "application/x-www-form-urlencoded"
//		    },
//		    onload: function(response) {
//			GM_log('Ads Post is ' + response.statusText);
//		    }
//		});
//	    }
//	}
//
//	GM_setValue('fProg','');
//	fSL=0;
//	GM_log('Ads-done');
//    }
//}
//
//function f_openAds(){
//    var att;
//    var fL=false;
//    var d_route = document.getElementById('hroute');
//    var a_List = d_route.getElementsByTagName('a');
//    for (var i = 0; i < a_List.length; i++) {
//	att = a_List[i].getAttribute('onclick');
//	if (att!== null && att.search(/Fetch\('ads\.php/)>-1){
//	    location.assign( 'javascript:' + att + ';void(0)' );
//	    GM_log('Found Ads, open it..');
//	    fSL=0;
//	    window.setTimeout(f_Ads, fDelay+fRand(3000));
//	    fL = true;
//	    break;
//	}
//    }
//    if (fL === false && fSL < 20){
//	GM_log('Ads not found yet...');
//	fSL++;
//	window.setTimeout(f_openAds, fDelay+fRand(3000));
//    }
//}

function f_Ads(){
    var fDate = new Date();
    GM_log('old time =' + GM_getValue('fFuelTime') + ' new= ' + fDate.getHours());
    if (GM_getValue('fFuelTime') !== fDate.getHours() && fDate.getMinutes() > 5){
	GM_setValue('fFuelTime',  fDate.getHours());

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://airlinemanager.activewebs.dk/am/fuel.php?' + FBSession,
	    onload: function(response) {
		if (response.status === 200){

                    var SearchTank = 'Currently in tank:</b></td><td><b style=color:#3fa520>';
		    var SearchPrice = 'Current fuel price:</td><td><font color=#2b98ec><b>$';
		    var str = response.responseText;

		    var loc1 = str.indexOf(SearchTank);
		    if (loc1 > -1){
			var loc1len = str.indexOf('<', loc1 + SearchTank.length);
			var Tank = str.substring(loc1 + SearchTank.length, loc1len).replace(/[^0-9]/g, '');
			GM_log('Tank amount is ' + Tank);

                        var loc2 = str.indexOf(SearchPrice);
                        if (loc2 > -1){
                            var loc2len = str.indexOf('<', loc2 + SearchPrice.length);
                            var Price = str.substring(loc2 + SearchPrice.length, loc2len).replace(/[^0-9]/g, '');
                            GM_log('Fuel cost is ' + Price);

                            if( Price <= GM_getValue('fFCost')){
                                var fAmnt
                                if(GM_getValue('fFuelFill') === 'Checked'){
                                    fAmnt = fFuelTankMax - Tank;
                                }else{
                                    fAmnt = GM_getValue('fFAmount',1000000) - Tank;
                                }

                                GM_log('Fuel needed = ' + fAmnt);
                                if( fAmnt > 0 ){
                                    BuyFuel(fAmnt);
                                }
                            }else{
                                GM_log('Fuel is expensive...  ;(');
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
	    }
	});
    }
}

function BuyAds(amount){
   GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://airlinemanager.activewebs.dk/am/fuel.php?' + FBSession + '&a=' + amount,
        onload: function(response) {
            if (response.status === 200){
                GM_log('I got Fuel');
		//GM_log(response.responseText);    // Show the response to know if fuel were purchased or maybe money is not enough!
            } else{
                GM_log('Unable to fetch AM Fuel page');
            }
        }
    });
}

//function f_FlyWithNoFuel(){
//    var sURL='http://airlinemanager.activewebs.dk/am/ajax_f_all_new.php?st=all&';
//    var URL = sURL + FBSession + '&pCode=<use here whatever code that was generated last by the game>';       // The pCode changes every time, so find away to generate it or use what you have until it expires
//
//    GM_log(URL);
//    GM_xmlhttpRequest({
//	method: 'GET',
//	url: URL,
//	onload: function(response) {
//	    if (response.status === 200){
//		GM_log('Response =' + response.responseText);
//	    } else{
//		GM_log('Unable to Fly the planes');
//	    }
//	}
//    });
//}

function f_Fly(){
    var d_fly = document.getElementById('flight');
    if (d_fly === null && fSL < 20){
	GM_log('F-wait');
	fSL++;
	window.setTimeout(f_Fly, fDelay+fRand(3000));
    } else{
	fSL=0;

	// Count the number of flight which are ready (so if we have more than 10 call the fly function again
	var a_List = d_fly.getElementsByTagName('a');
	GM_log('a_List.length = ' + a_List.length);
	var f_Count = 0;
	for (var i = 0; i < a_List.length; i++) {
	    att = a_List[i].getAttribute('onclick');
	    GM_log('flightlink = ' + att);
	    if (att!== null && att.search(/flightSingle/)>-1){
		f_Count = f_Count + 1;
	    }
	}
	GM_log('Number of ready flights is ' + f_Count);

	// Look for the Start Routes button and click it
        var d2_fly = document.getElementById('flightStarter');
        if (d2_fly !== null){
            var att;
            var fL=false;
            a_List = d2_fly.getElementsByTagName('a');
            for (i = 0; i < a_List.length; i++) {
                att = a_List[i].getAttribute('onclick');
                if (att!== null && att.search(/FetchFlightStarter\('ajax_f_all_new\.php/)>-1){
                    location.assign( 'javascript:' + att + ';void(0)' );
                    GM_log('Fly them..');
                    fL = true;
                    break;
                }
            }
            if (fL === false){
                GM_log('Could not find the Fly link...');
            }
        }
        else{
            GM_log('No routes to fly...');
        }


	if (f_Count > 10){
	    GM_log('More routes to fly....');
	    GM_setValue('fProg','Fly');
	    window.setTimeout(f_openFlight, fDelay+fRand(3000));
	}
	else{
	    GM_log('F-done.. see you later');
	    GM_setValue('fProg','');
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
	    window.setTimeout(f_Fly, fDelay+fRand(3000));
//            window.setTimeout(f_FlyWithNoFuel, fDelay+fRand(1000));
	    fL = true;
	    break;
	}
    }
    if (fL === false && fSL < 20){
	GM_log('F not found yet...');
	fSL++;
	window.setTimeout(f_openFlight, fDelay+fRand(3000));
    }
}

//function f_openCatering(){        // Not using this function anymore since i do direct calls now to buy catering
//    var att;
//    var fL=false;
//    var d_route = document.getElementById('hroute');
//    var a_List = d_route.getElementsByTagName('a');
//    for (var i = 0; i < a_List.length; i++) {
//	att = a_List[i].getAttribute('href');
//	if (att!== null && att.search('catering.php')>-1){
//	    location.assign( 'javascript:' + att + ';void(0)' );
//	    GM_log('Found Catering, open it..');
//	    fSL=0;
//	    window.setTimeout(f_Catering, fDelay+fRand(3000));
//	    fL = true;
//	    break;
//	}
//    }
//    if (fL === false && fSL < 20){
//	GM_log('Catering not found yet...');
//	fSL++;
//	window.setTimeout(f_openCatering, fDelay+fRand(3000));
//    }
//}
//
//function f_openFlight1(){
//    var att;
//    var fL=false;
//    var a_List = document.getElementsByTagName('a');
//    for (var i = 0; i < a_List.length; i++) {
//	att = a_List[i].getAttribute('onclick');
//	if (att!== null && att.search(/Fetch\("route\.php/)>-1){
//	    location.assign( 'javascript:' + att + ';void(0)' );
//	    GM_log('Found F1, open it..');
//	    fSL=0;
//	    window.setTimeout(f_openCatering, fDelay+fRand(3000));
//	    fL = true;
//	    break;
//	}
//    }
//    if (fL === false && fSL < 20){
//	GM_log('F1 not found yet...');
//	fSL++;
//	window.setTimeout(f_openFlight1, fDelay+fRand(3000));
//    }
//}

function f_Repair(){
    var att;
    var d_allc = document.getElementById('hroute');
    if (d_allc === null && fSL < 20){
	GM_log('R-wait');
	fSL++;
	window.setTimeout(f_Repair, fDelay+fRand(3000));
    } else{
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
        
	GM_log('R-time to fly');
	GM_setValue('fProg','Fly');
	window.setTimeout(f_openFlight, fDelay+fRand(3000));
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
	    window.setTimeout(f_Repair, fDelay+fRand(3000));
	    fL = true;
	    break;
	}
    }
    if (fL === false && fSL < 20){
	GM_log('R not found yet... l=' + location.href);
	fSL++;
	window.setTimeout(f_openRepair, fDelay+fRand(3000));
    }
}

function f_CCheck(){
    var att;
    var d_allc = document.getElementById('hroute');
    if (d_allc === null && fSL < 20){
	GM_log('C-wait');
	fSL++;
	window.setTimeout(f_CCheck, fDelay+fRand(3000));
    } else{
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
                    GM_log('att = ' + att);
                    if (att!== null && att.search(/Perform all [0-9]* checks/)>-1){
                        GM_log('C-Check_All');
                        //GM_setValue('fProg','Fly');
                        i_List[j].click();
                        break;
                    }
                }
            }
        }
        else
            GM_log('Nothing to c-check');

        if(GM_getValue('fRepair','Checked') === 'Checked'){
	    GM_log('C-call-to-Repair');
	    GM_setValue('fProg','Repair');
	    window.setTimeout(f_openRepair, fDelay+fRand(3000));
	} else{
	    GM_log('C-call-to-Fly');
	    GM_setValue('fProg','Fly');
	    window.setTimeout(f_openFlight, fDelay+fRand(3000));
	}
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
	    window.setTimeout(f_CCheck, fDelay+fRand(3000));
	    fL = true;
	    break;
	}
    }
    if (fL === false && fSL < 20){
	GM_log('C not found yet...');
	fSL++;
	window.setTimeout(f_openCCheck, fDelay+fRand(3000));
    }
}

function f_BuyCatering(){
    var sURL='http://airlinemanager.activewebs.dk/am/catering_purchase.php?';
    var URL = sURL + FBSession + '&id=' + GM_getValue('lCatering',7) + '&am=' + GM_getValue('fCAmount',55000);

    GM_xmlhttpRequest({
	method: 'GET',
	url: URL,
	onload: function(response) {
	    if (response.status === 200){
		GM_log('Response =' + response.responseText);
	    } else{
		GM_log('Unable to fetch AM Catering page');
	    }
	}
    });
}

function fBuyAirplane(){

    fSL = fSL + 1;		// don't use the fSL variable, create something new for this function

    GM_xmlhttpRequest({
	method: 'POST',
	url: 'http://airlinemanager.activewebs.dk/am/buy.php?' + FBSession,
	data: 'acid=4&engine=GP7270&reg=A383-' + fSL,
	//data: 'acid=298&engine=Mikulin AM-3&reg=T-' + fSL,
	headers: {
	    "Content-Type": "application/x-www-form-urlencoded"
	},

	onload: function(response) {
	    GM_log(response.statusText + '  No. ' + fSL);

	    if(fSL<48){
		window.setTimeout(fBuyAirplane, 500);
	    }else{
		GM_log('Done.....');
	    }
	}
    });
}


var ap_id = new Array();
var count=0;
function fSellAirplane(){
    var d_sell = document.getElementById('fleet');
    var i_List = d_sell.getElementsByTagName('input');
    GM_log('List-> ' + i_List.length);
    for (var j = 0; j < i_List.length; j++) {
	att = i_List[j].getAttribute('name');
	if (att!== null && att === 'fid'){
	    ap_id[count] = i_List[j].getAttribute('value');
	    count = count + 1;
	}
    }

    GM_log('Total found = ' + count);
    fSellAirplane2();
}
var iCo = 0;
function fSellAirplane2(){
    GM_xmlhttpRequest({
	method: 'POST',
	url: 'http://airlinemanager.activewebs.dk/am/sell.php?' + FBSession,
	data: 'fid=' + ap_id[iCo],
	headers: {
	    "Content-Type": "application/x-www-form-urlencoded"
	},

	onload: function(response) {
	    GM_log(response.statusText + '  No. ' + iCo);
	    iCo = iCo + 1;

	    if (iCo < count){
		window.setTimeout(fSellAirplane2, 500);
	    }else{
		GM_log('Done.....');
	    }
	}
    });
}

function f_Fuel(){
    var fDate = new Date();
    GM_log('old time =' + GM_getValue('fFuelTime') + ' new= ' + fDate.getHours());
    if (GM_getValue('fFuelTime') !== fDate.getHours() && fDate.getMinutes() > 5){
	GM_setValue('fFuelTime',  fDate.getHours());

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://airlinemanager.activewebs.dk/am/fuel.php?' + FBSession,
	    onload: function(response) {
		if (response.status === 200){

                    var SearchTank = 'Currently in tank:</b></td><td><b style=color:#3fa520>';
		    var SearchPrice = 'Current fuel price:</td><td><font color=#2b98ec><b>$';
		    var str = response.responseText;

		    var loc1 = str.indexOf(SearchTank);
		    if (loc1 > -1){
			var loc1len = str.indexOf('<', loc1 + SearchTank.length);
			var Tank = str.substring(loc1 + SearchTank.length, loc1len).replace(/[^0-9]/g, '');
			GM_log('Tank amount is ' + Tank);

                        var loc2 = str.indexOf(SearchPrice);
                        if (loc2 > -1){
                            var loc2len = str.indexOf('<', loc2 + SearchPrice.length);
                            var Price = str.substring(loc2 + SearchPrice.length, loc2len).replace(/[^0-9]/g, '');
                            GM_log('Fuel cost is ' + Price);

                            if( Price <= GM_getValue('fFCost')){
                                var fAmnt
                                if(GM_getValue('fFuelFill') === 'Checked'){
                                    fAmnt = fFuelTankMax - Tank;
                                }else{
                                    fAmnt = GM_getValue('fFAmount',1000000) - Tank;
                                }

                                GM_log('Fuel needed = ' + fAmnt);
                                if( fAmnt > 0 ){
                                    BuyFuel(fAmnt);
                                }
                            }else{
                                GM_log('Fuel is expensive...  ;(');
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
	    }
	});
    }
}

function BuyFuel(amount){
   GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://airlinemanager.activewebs.dk/am/fuel.php?' + FBSession + '&a=' + amount,
        onload: function(response) {
            if (response.status === 200){
                GM_log('I got Fuel');
		//GM_log(response.responseText);    // Show the response to know if fuel were purchased or maybe money is not enough!
            } else{
                GM_log('Unable to fetch AM Fuel page');
            }
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
		FBSession = FBSession.substring(pos + 9);	    // 9 is the length of the string "fuel.php?"
		pos = FBSession.search(/("|')/);	// Search for the first (") or (')
		FBSession = FBSession.substring(0, pos);
		GM_log('Session = ' + FBSession);
		break;
	    }
	}
    }
}

function fPoller(){
    if(GM_getValue('fRun') === 'true'){
	GM_setValue('fRun','false');
	GM_log('Start');

	GetFBSession();

//        fSL = 0;	// fSL should not be used here, create a new global variable to use for buying airplanes
//	fBuyAirplane();
//        fSellAirplane();
//        return;

        if(GM_getValue('fFuel') === 'Checked'){
            GM_log('Check Fuel...');
            f_Fuel();
        }

	if(GM_getValue('fCatering') === 'Checked'){
	    GM_log('Buy Catering...');
	    f_BuyCatering();
	}

	if(GM_getValue('fCheck','Checked') === 'Checked'){
	    GM_setValue('fProg','DoCheck');
	    fSL=0;
	    f_openCCheck();
	} else if(GM_getValue('fRepair','Checked') === 'Checked'){
	    GM_setValue('fProg','DoRepair');
	    fSL=0;
	    f_openRepair();
	} else{
	    GM_setValue('fProg','DoFly');
	    fSL=0;
	    f_openFlight();
	}
    }
    else if (GM_getValue('fLoadAM') === 1 ){
	GM_setValue('fLoadAM',0);
	if(GM_getValue('fProg') === 'Repair'){
	    GM_setValue('fProg','DoRepair');
	    GM_log('Do Repair');
	    window.setTimeout(f_openRepair, fDelay+fRand(3000));
	} else if(GM_getValue('fProg') === 'Fly'){
	    GM_setValue('fProg','DoFly');
	    GM_log('Do Fly');
	    window.setTimeout(f_openFlight, fDelay+fRand(3000));
	}
    }
//    GM_log('polling.. ');
    window.setTimeout(fPoller, 4000);
}

function Display(min,sec){	// Format the time as min:sec (mm:ss)
    var disp;
    if(min<=9){
	disp='0'+min+':';
    } else {
	disp=min+':';
    }

    if(sec<=9){
	disp+='0'+sec;
    } else{
	disp+=sec;
    }
    return(disp);
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
	    GM_setValue('fRun','true');
	} else{
	    GM_log('Been running for long time,, time to reload..');
	    GM_setValue('fRun','resume');
	    location.reload(true);
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
	window.setTimeout(enableAutoPilot, fDelay+fRand(3000));
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
	window.setTimeout(enableAutoPilot,fDelay+fRand(3000))
    }
}

function fFuelASettings(){	// Store the fuel setting under Firefox
    GM_setValue('fFAmount',parseInt(document.getElementById('fFAmount').value));
}

function fCSettings(){	// Store the catering settings under Firefox
    GM_setValue('fCAmount',parseInt(document.getElementById('fCAmount').value));
    GM_setValue('lCatering',parseInt(document.getElementById('lCatering').value));

    if(document.getElementById('fCatering').checked === true){
	GM_setValue('fCatering', 'Checked');
    } else{
	GM_setValue('fCatering', '');
    }
}

function fASettings(){	// Store the advertising settings under Firefox
    GM_setValue('fACost',parseInt(document.getElementById('fACost').value));
    GM_setValue('lAds',parseInt(document.getElementById('lAds').value));
    GM_setValue('lADays',parseInt(document.getElementById('lADays').value));

    if(document.getElementById('fAds').checked === true){
	GM_setValue('fAds', 'Checked');
    } else{
	GM_setValue('fAds', '');
    }
}

function fSettings(){	// Store the script settings under Firefox
    GM_setValue('fTime',parseInt(document.getElementById('f_timefreq').value));
    GM_setValue('fRTime',parseInt(document.getElementById('f_randtime').value));
    GM_setValue('fNote',document.getElementById('fNote').value);
    GM_setValue('fFCost',parseInt(document.getElementById('fFCost').value));

    if(document.getElementById('fFuelFill').checked === true){
	GM_setValue('fFuelFill', 'Checked');
        document.getElementById('fFAmount').value = fFuelTankMax;
        document.getElementById('fFAmount').disabled = true;
    } else{
	GM_setValue('fFuelFill', '');
        document.getElementById('fFAmount').value = GM_getValue('fFAmount',1000000);
        document.getElementById('fFAmount').disabled = false;
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
}

function addControls(){
    var fFB = document.getElementById('content');
    var fAP = document.getElementById('Autopilot');
    var fAM = document.getElementById('accountheader');

    if (fAM !== null){	// Airline Manager frame
	GM_log('AM_Loaded, start polling. l=' + location.href.toString().substr(0, 60));
	GM_setValue('fLoadAM',1);
	window.setTimeout(fPoller, fRand(1000));
    } else if (fFB !== null && fAP === null){    // Facebook frame, check if Controls are not already loaded
	GM_setValue('fProg','');
	var fTime=GM_getValue('fTime',8);
	var fRTime=GM_getValue('fRTime',4);
	var fRepair=GM_getValue('fRepair','Checked');
	var fCheck=GM_getValue('fCheck','Checked');
	var fCatering=GM_getValue('fCatering','');
	var lCatering=GM_getValue('lCatering',7);
	var fCAmount=GM_getValue('fCAmount',55000);
	var fFuel=GM_getValue('fFuel','');
        var fFuelFill=GM_getValue('fFuelFill','');
	var fFCost=GM_getValue('fFCost',400);
	var fFAmount=GM_getValue('fFAmount',1000000);
	var fAds=GM_getValue('fAds','');
	var lAds=GM_getValue('lAds',9);
	var lADays=GM_getValue('lADays',7);
	var fACost=GM_getValue('fACost',7500);
	var fNote=GM_getValue('fNote','Use this area to save notes');

	var f_html = <><![CDATA[
<div style="position: absolute; top: 100px; left: 5px; z-index: 10; background: none repeat scroll 0% 0% rgb(255, 255, 255); border-style: dotted; border-width: 2px;">
<table border="0" style="border-bottom-style : dotted; border-bottom-width : 2px;"><tbody><tr>
<td><input title="Start or Stop the script" type="button" id="Autopilot" value="Autopilot"></td>
<td style="border-left-style : dotted; border-left-width : 2px;"><input title="Time to wait between each run" type="text" name="f_timefreq" value=fTimeReplace size="1px" maxlength="2" id="f_timefreq" style="text-align : center;">min +</td>
<td>Random<input title="A random value (between 0 & what you set) added to the wait time." type="text" name="f_randtime" value=fRTimeReplace size="1px" maxlength="2" id="f_randtime" style="text-align : center;" alt="Random Time"></td></tr>
<tr><td title="Status of the script (or count down to when it will run next)" id="f_timer" bgcolor="#ff0000" style="text-align : center;">Stopped</td>
<td style="border-left-style : dotted; border-left-width : 2px;"><input title="Enable doing c-check on aircrafts before flying them" type="checkbox" name="fCheck" fCheckReplace id="fCheck" style="margin-top : 0px;">C-Check</td>
<td><input title="Enable repairing aircrafts before flying them" type="checkbox" name="fRepair" fRepairReplace id="fRepair" style="margin-top : 0px;">Repair</td>
</tr></tbody></table>
<table border="0" style="width: 100%;"><tbody><tr>
<td><a title="Open the Note box" href="javascript:;//Open Note" onmousedown='if(document.getElementById("dNote").style.display == "none"){ document.getElementById("dNote").style.display = "table-row"; }else{ document.getElementById("dNote").style.display = "none"; }'>[+]</a>&nbsp;
<a title="Open the Catering Settings" href="javascript:;//Open Catering" onmousedown='if(document.getElementById("dCatering").style.display == "none"){ document.getElementById("dCatering").style.display = "table-row"; }else{ document.getElementById("dCatering").style.display = "none"; }'>[C]</a>&nbsp;
<a title="Open the Fuel Settings" href="javascript:;//Open Fuel" onmousedown='if(document.getElementById("dFuel").style.display == "none"){ document.getElementById("dFuel").style.display = "table-row"; }else{ document.getElementById("dFuel").style.display = "none"; }'>[F]</a>&nbsp;
<a title="Open the Advertising Settings" href="javascript:;//Open Ads" onmousedown='if(document.getElementById("dAds").style.display == "none"){ document.getElementById("dAds").style.display = "table-row"; }else{ document.getElementById("dAds").style.display = "none"; }'>[A]</a>&nbsp;
<a title="Open the Buy & Sell Aircrafts Settings" href="javascript:;//Open Buy&Sell" onmousedown='if(document.getElementById("dBuySell").style.display == "none"){ document.getElementById("dBuySell").style.display = "table-row"; }else{ document.getElementById("dBuySell").style.display = "none"; }'>[$]</a>&nbsp;
<a title="Visit the script website" href="http://fadvisor.net/blog/2010/03/auto-pilot/">@</a></td><td  id="f_status" style="color: red;"></td>
</tr>
<tr id="dCatering" style="display:none">
<td colspan="2" align="center" style="border-top-style:dotted; border-top-width:2px;"><input title="Enable buying catering before flying the aircrafts (will only buy if you don't have any)" type="checkbox" name="fCatering" fCateringReplace id="fCatering" style="margin-top : 0px;">Catering<br>
<select title="Select the type of catering you like to buy" id="lCatering"><option value="7" lCatering7Selected>7- Sky+</option><option value="6" lCatering6Selected>6- Sky Catering</option><option value="5" lCatering5Selected>5- Sky Burgers</option>
<option value="4" lCatering4Selected>4- Fast Food</option><option value="3" lCatering3Selected>3- Sky Fish</option><option value="2" lCatering2Selected>2- Cloud Chefs</option><option value="1" lCatering1Selected>1- AM Catering</option></select>
 Amount<input title="Set the amount of catering to buy (you should follow the min & max values set by the game)" type="text" name="fCAmount" value=fCAmountReplace size="4px" maxlength="5" id="fCAmount" style="text-align : center;"></td>
</tr>
<tr id="dFuel" style="display:none">
<td colspan="2" align="center" style="border-top-style:dotted; border-top-width:2px;"><input title="Enable buying fuel" type="checkbox" name="fFuel" fFuelReplace id="fFuel" style="margin-top : 0px;">Fuel
  |  If price is or below <input title="The maximum price that you would like to pay for fuel, if the actual price is higher it will not buy anything (and if the price is lower it will buy with the lower price)" type="text" name="fFCost" value=fFCostReplace size="4px" maxlength="4" id="fFCost" style="text-align : center;"><br>
fill tank<input title="Check this box if you want the script to fill the tank to the maximum when the price is what you want" type="checkbox" name="fFuelFill" fFuelFillReplace id="fFuelFill" style="margin-top : 0px;">
 or fill up to <input title="The desired amount of fuel that you want to have in your tank" type="text" name="fFAmount" value=fFAmountReplace size="9px" maxlength="9" id="fFAmount" style="text-align : center;"></td>
</tr>
<tr id="dAds" style="display:none">
<td colspan="2" align="center" style="border-top-style:dotted; border-top-width:2px;">
<input title="Enable buying ads" type="checkbox" name="fAds" fAdsReplace id="fAds" style="margin-top : 0px;">Ads
  |  If price is or below <input title="The maximum price that you would like to pay for ads, if the actual price is higher it will not buy anything (and if the price is lower it will buy with the lower price)" type="text" name="fACost" value=fACostReplace size="5px" maxlength="5" id="fACost" style="text-align : center;">
  <a title="See the price prediction at this link" href="http://fadvisor.net/blog/2010/06/airlinemanager-ads-prices/"> @</a>
  <br>
<select title="Select the type of advertising you like to buy" id="lAds">
<option value="0" lAds0Selected>Newspaper advertising</option>
<option value="1" lAds1Selected>1 tv commercial</option>
<option value="2" lAds2Selected>Internet: In major search engines</option>
<option value="3" lAds3Selected>Internet: In major social networks</option>
<option value="4" lAds4Selected>Bus and Taxi posters</option>
<option value="5" lAds5Selected>10 tv commercials + newspaper ads</option>
<option value="6" lAds6Selected>Cross country newspaper advertising</option>
<option value="7" lAds7Selected>Billboards on major streetsg</option>
<option value="8" lAds8Selected>Billboards on 1 major airport</option>
<option value="9" lAds9Selected>Billboards on 20 international airports</option>
</select><br><br>
<select id="lADays">
<option value="1" lADay1Selected>1 Day</option>
<option value="2" lADay2Selected>2 Days</option>
<option value="3" lADay3Selected>3 Days</option>
<option value="4" lADay4Selected>4 Days</option>
<option value="5" lADay5Selected>5 Days</option>
<option value="6" lADay6Selected>6 Days</option>
<option value="7" lADay7Selected>7 Days</option>
</select>
</td>
</tr>
<tr id="dBuySell" style="display:none">
<td colspan="2" align="center" style="border-top-style:dotted; border-top-width:2px;">
Reserved for Buying and Selling aircrafts
<br>
* To be implemented *
</td>
</tr>
<tr id="dNote" style="display:none">
<td colspan="2" style="border-top-style:dotted; border-top-width:2px;"><textarea rows="4" style="width: 97%;" id="fNote">fNoteReplace</textarea></td>
</tr></tbody></table>
</div>
	]]></>;

	f_html = f_html.toString().replace('fTimeReplace', fTime);
	f_html = f_html.toString().replace('fRTimeReplace', fRTime);
	f_html = f_html.toString().replace('fRepairReplace', fRepair);
	f_html = f_html.toString().replace('fCheckReplace', fCheck);
	f_html = f_html.toString().replace('fCateringReplace', fCatering);
	f_html = f_html.toString().replace('fCAmountReplace', fCAmount);
	f_html = f_html.toString().replace('fFuelReplace', fFuel);
	f_html = f_html.toString().replace('fFCostReplace', fFCost);
	f_html = f_html.toString().replace('fFuelFillReplace', fFuelFill);
	f_html = f_html.toString().replace('fFAmountReplace', fFAmount);
	f_html = f_html.toString().replace('fNoteReplace', fNote);
	
	f_html = f_html.toString().replace('lCatering' + lCatering + 'Selected', 'selected="yes"');
	f_html = f_html.toString().replace(/lCatering.?Selected/g, '');

	f_html = f_html.toString().replace('fAdsReplace', fAds);
	f_html = f_html.toString().replace('fACostReplace', fACost);
	f_html = f_html.toString().replace('lAds' + lAds + 'Selected', 'selected="yes"');
	f_html = f_html.toString().replace(/lAds.?Selected/g, '');
	f_html = f_html.toString().replace('lADay' + lADays + 'Selected', 'selected="yes"');
	f_html = f_html.toString().replace(/lADay.?Selected/g, '');

	var fdiv = document.createElement("div");
        fdiv.innerHTML = f_html;
	fFB.appendChild(fdiv);

	document.getElementById('Autopilot').addEventListener('click',enableAutoPilot,false);
	document.getElementById('f_timefreq').addEventListener('change',fSettings,false);
	document.getElementById('f_randtime').addEventListener('change',fSettings,false);
	document.getElementById('fRepair').addEventListener('change',fSettings,false);
	document.getElementById('fCheck').addEventListener('change',fSettings,false);
	document.getElementById('fCatering').addEventListener('change',fCSettings,false);
	document.getElementById('lCatering').addEventListener('change',fCSettings,false);
	document.getElementById('fCAmount').addEventListener('change',fCSettings,false);
	document.getElementById('fFuel').addEventListener('change',fSettings,false);
	document.getElementById('fFuelFill').addEventListener('change',fSettings,false);
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
//GM_log('s-load.. ->  l=' + location.href.toString().substr(0, 60));

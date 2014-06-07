// ==UserScript==
// @name        Warfacts Strategist Scanner
// @author      guardian21
// @namespace   https://github.com/guardian21
// @description Runs a perimeter scan for all fleets and Posts it on a server runnong Warfacts Strategist
// @include     *.war-facts.com/starlog.php*
// @require     http://code.jquery.com/jquery-latest.js
// @version     2
// @grant       GM_xmlhttpRequest

// ==/UserScript==


/* Configuration Settings */

unsafeWindow.ServerBaseUrl = 'Server Address' ; // Enter your server's address here
unsafeWindow.username = 'username'; // Enter your server's username here
unsafeWindow.password = 'password'; // Enter your password here
unsafeWindow.requestsPer2Seconds = 30;
unsafeWindow.progressAlerts = false;



/*

function addFleet(){

             	var fleetinfo = "";
             	fleetinfo +="name=" + "greasetest1";
               	fleetinfo +="&owner=" + "owner";    	
               	fleetinfo +="&relationship=" + "friend";  
               	fleetinfo +="&empire=" + "Misfits";
               	fleetinfo +="&faction=" + "Scaldarians";
               	fleetinfo +="&ships=" + "5";    	
               	fleetinfo +="&tonnage=" + "10";    	
            	fleetinfo +="&warfacts_id=" + "1204";    	
              	fleetinfo +="&x=" + "1";    	
             	fleetinfo +="&y=" + "2";    	
            	fleetinfo +="&z=" + "3";    	
              	fleetinfo +="&speed=" + "24";    	
                fleetinfo +="&speed_knowledge=" + "exact";    	
                fleetinfo +="&destination=" + "somewhere";    	
                fleetinfo +="&battlelogs=" + "one";    	
               	fleetinfo +="&notes=" + "there";    	



    	setTimeout(function() {
    	    	
        GM_xmlhttpRequest({
            method:"POST",
            url: unsafeWindow.ServerBaseUrl + '/fleets/add',
            data: fleetinfo,
            headers: { "Content-type" : "application/x-www-form-urlencoded" },
            onload:fleetAdded,
			onabort:quitScript,
			onerror:quitScript,
			ontimeout:quitScript
        });
	}, 0);

}


function showFleets(){
    	setTimeout(function() {
        GM_xmlhttpRequest({
            method:"GET",
            url: unsafeWindow.ServerBaseUrl + '/fleets',
            onload:showFleetsParse,
			onabort:quitScript,
			onerror:quitScript,
			ontimeout:quitScript
        });
	}, 0);
	
	
	function showFleetsParse(resp){
	   // var page = resp.responseText;
	   unsafeWindow.document.documentElement.innerHTML= resp.responseText;
	  // alert(page);
	   addFleet();
    }
}


*/

function htmlScanPost(htmlForPost,count){

            var contents = escape(htmlForPost);

        	setTimeout(function() {
            GM_xmlhttpRequest({
            method:"POST",
            url: unsafeWindow.ServerBaseUrl + '/perimeterScanHtml',
            data: encodeURI( "scannerPosition=" + unsafeWindow.fleets[count][2]  +  "&perimeterScanHtmlPage="+contents),
            headers: { "Content-type" : "application/x-www-form-urlencoded" },
            onload:scanPostResponse,
			onabort:quitScript,
			onerror:quitScript,
			ontimeout:quitScript
        });
	}, 0);
	
	
	function scanPostResponse(resp){
	  //var page = resp.responseText;
	  //alert(page);
	  //unsafeWindow.document.documentElement.innerHTML= resp.responseText;
	}

}



function login(){
        	setTimeout(function() {
            GM_xmlhttpRequest({
            method:"POST",
            url: unsafeWindow.ServerBaseUrl + '/login',
            data: encodeURI("username="+unsafeWindow.username+"&password="+unsafeWindow.password),
            headers: { "Content-type" : "application/x-www-form-urlencoded" },
            onload:parseLoginResponse,
			onabort:quitScript,
			onerror:quitScript,
			ontimeout:quitScript
        });
	}, 0);
	
	
	function parseLoginResponse(resp){
	   var page = resp.responseText;
	   alert(page);
	}

}

/*

function fleetAdded(resp){
	   var page = resp.responseText;
      //  unsafeWindow.document.documentElement.innerHTML= page;
          alert("Fleet Added successfully");
}


*/

function quitScript(resp){
	alert("Xmlhttprequest aborted.");
}









function getPerimeterScan(f_id,count) {


	var instancebase = window.location.href;
	var instance = instancebase.substring(instancebase.indexOf("//") + 2);
	instance = instance.substring(0, instance.indexOf("."));
	
	
	setTimeout(function() {
        GM_xmlhttpRequest({
            method:"GET",
            url:'http://' + instance +'.war-facts.com/extras/scan.php?fleet=' + f_id,
            onload:parsePerimeterScan,
			onabort:quitScript,
			onerror:quitScript,
			ontimeout:quitScript
        });
	}, 0);
		
        
	
        function parsePerimeterScan(resp) {

		// Grab Perimeter Scan

            var page = resp.responseText;
            var htmlForPost = page;
    

            // Make sure we see the Position marker in the header and jump to it
            if (page.indexOf('Position') == -1) return false;
            page = page.substring(page.indexOf('Position') + 8);
            page = page.substring(page.indexOf('</tr>') + 5);

         

 //           fleetPosCell.removeChild(fleetPosCell.lastChild);
 //           fleetPosCell.removeChild(fleetPosCell.lastChild);

			// If there's a Wormhole, it'll always be the first in the list, so check for it first
            if (page.indexOf('Wormhole!') > -1) {
           
                page = page.substring(page.indexOf('Wormhole!') + 9);
/* 
                var wh_coords = page.substring(page.indexOf('maingame>') + 9, page.indexOf(' local'));
                
                var matches = wh_coords.match(/(\-?\d+),\s*(\-?\d+),\s*(\-?\d+)/);
                if (matches) {
                    var url = 'http://' + instance + '.war-facts.com/fleet_navigation.php';
                    url    += '?fleet=' + fleetID + '&mtype=jump&tpos=local';
                    url    += '&x=' + matches[1] + '&y=' + matches[2] + '&z=' + matches[3];
                    
                    fleetPosCell.appendChild(document.createElement('br'));
                    
                    var linkie = document.createElement('a');
                    linkie.setAttribute('href',url);
                    //linkie.appendChild(document.createTextNode('Wormhole!'));
                    //fleetPosCell.appendChild(linkie);
                }
  */               
                page = page.substring(page.indexOf('</tr>') + 5);
            }
           
            // Start looping through the rest of the rows of the table
            
            while (page.indexOf('<tr>') > -1) {
                var shipPtr;
                var thisRow = page.substring(page.indexOf('<tr>') + 3, page.indexOf('</tr>'));
                
                // Make sure we're not on the last row and not looking at ourself
                if (thisRow.indexOf('<strong>Total</strong>') == -1 &&
                    thisRow.indexOf('>Self<') == -1) {
                    // First, figure out what our relationship is to this fleet
                    var fleetName = thisRow.substring(thisRow.indexOf('maingame>' + 9), thisRow.indexOf('</a>'));
                    var matches   = fleetName.match(/font class=(\w+)>/);
                    
                    if (matches) {
                        shipPtr = (matches[1] == 'friend') ? unsafeWindow.ships[count]['friends'] : unsafeWindow.ships[count]['enemies'];
                    }
                    else {
                        shipPtr = unsafeWindow.ships[count]['neutrals'];
                    }
                    
                    // Now, count up the number of ships
                    thisRow = thisRow.substring(thisRow.indexOf('</td>') + 5);
                    thisRow = thisRow.substring(thisRow.indexOf('</td>') + 5);
					//commented out to get the correct data for ships and tonnage   thisRow = thisRow.substring(thisRow.indexOf('</td>') + 5);		
                    
                    var shipCount   = thisRow.substring(thisRow.indexOf('>') + 1, thisRow.indexOf('</td>'));
					// changed to parseFloat by guardian
                    shipPtr['ships'] += parseFloat(shipCount);
                    
                    // ...then their tonnage
					
                    thisRow = thisRow.substring(thisRow.indexOf('</td>') + 5);
                    
                    var shipTons   = thisRow.substring(thisRow.indexOf('>') + 1, thisRow.indexOf('</td>'));
					// changed to parseFloat by guardian
                    shipPtr['tons'] += parseFloat(shipTons);
                }

                page = page.substring(page.indexOf('</tr>') + 5);
            }
            
			
		      unsafeWindow.completed[count] = "true";
			  htmlScanPost(htmlForPost,count);


		}
	
 }          

function quitScript(resp){
	throw new Error("Xmlhttprequest aborted.");
}

function getFleets() {	//Gets the fleet names and ids from the Starlog page (menu on the left)
		
		var fleetlinks = $("#listMenuRoot a[href*='/fleet_navigation.php?fleet=']");    // In element with Id listMenuRoot get all links (<a> with href that begins with http://www.war-facts.com/fleet_navigation.php?fleet= 
        var positionlinks = $("#listMenuRoot a[href*='javascript:extview('/extras/view_universe.php?x=']");
        
        var systemlinks =   $("#listMenuRoot a[href*='javascript:extview('/extras/view_system.php?system=']");
        
        alert(systemlinks[0].innerHTML);


    //alert(fleetlinks.length);
    
	if(fleetlinks){	
		var myfleets = new Array(fleetlinks.length);
		var searchY = new RegExp('&y=','g');
		var searchZ = new RegExp('&z=','g');		
		
		
		for (var i = 0; i < fleetlinks.length; i++) {
			myfleets[i] = new Array(3);

			myfleets[i][0] = fleetlinks[i].innerHTML;
			myfleets[i][1] = fleetlinks[i].href.split("fleet=")[1];	//myfleets[i][0] = name, myfleeys[i][1] = id // myfleets[i][2] = position 
			
			var temp = positionlinks[i].href.split('x=')[1];
			temp = temp.split('&fleet');
            var pos = temp[0];
            
			myfleets[i][2] = pos.replace(searchY,",").replace(searchZ, ",");
			
			
					
		}
		
		
	}
	else {
		alert("Error");
	}

	return myfleets;

}



unsafeWindow.performAutoScan = function() {		// Called from button Onclick. Creates the table , performs the autoscan and populates the table
	
	var baseElement = findUI_insertPoint();
	baseElement.parentNode.insertBefore(createUI_header(), baseElement);

	var table = createUI_table();
	table.appendChild(createUI_rowHead());
	
	unsafeWindow.fleets = getFleets();
	
	unsafeWindow.completed = new Array(unsafeWindow.fleets.length);
	unsafeWindow.allfinished = "false" ;
	unsafeWindow.ships = new Array(unsafeWindow.fleets.length);
	for (var i=0; i<unsafeWindow.fleets.length; i++){
	unsafeWindow.ships[i] = {
            'friends'  : { 'ships' : 0, 'tons' : 0 },
            'neutrals' : { 'ships' : 0, 'tons' : 0 },
            'enemies'  : { 'ships' : 0, 'tons' : 0 },
        };
	unsafeWindow.completed[i] = "false";	
	}
	unsafeWindow.completedCount = 0;


    runScans(0,table);
	
		
}


function runScans(start,table){
    if (start > unsafeWindow.fleets.length){
        if (unsafeWindow.progressAlerts){
            alert("Gathering Results");
        }
       setTimeout(function() {
            checkCompleted(table);
		},5000);	// After 5 seconds check if finished
    }
    else {
        var limit = start + unsafeWindow.requestsPer2Seconds ;
        if (limit > unsafeWindow.fleets.length){
            limit = unsafeWindow.fleets.length
        }
        if (unsafeWindow.progressAlerts){
             alert("Running Scans " + start + " to " + limit);
        }
        for (var i=start; i<limit; i++){	
    		getPerimeterScan(unsafeWindow.fleets[i][1],i);
        }
    
        setTimeout(function() {
            runScans(start+unsafeWindow.requestsPer2Seconds,table);
		},2000);	// After x seconds start next batch of requests
    }

}





function checkCompleted (table) {


	var friendsText ;
	var neutralsText ;
	var enemiesText ;
	var shipPtr;
	var shipCount;
	var shipTons;


	for (var i=0; i <unsafeWindow.fleets.length ; i++) {
			
			unsafeWindow.allfinished = "true" ;
		//	alert("For i = " + i + " completed = " + unsafeWindow.completed[i]);
			if(unsafeWindow.completed[i]== "true"){
				if (unsafeWindow.ships[i]['friends']) {
					shipPtr = unsafeWindow.ships[i]['friends'];
					shipCount = shipPtr['ships'];
					shipTons  = shipPtr['tons'].toFixed(1);
					if (shipCount ==0) {
						friendsText = 'No ships found';
					}
					else{
						friendsText =  shipCount + ' ships (' + shipTons + ' tons)';
					}
				}
				if (unsafeWindow.ships[i]['neutrals']) {
					shipPtr   = unsafeWindow.ships[i]['neutrals'];
					shipCount = shipPtr['ships'];
					shipTons  = shipPtr['tons'].toFixed(1);
					if (shipCount ==0) {
						neutralsText = 'No ships found';
					}
					else{
						neutralsText =  shipCount + ' ships (' + shipTons + ' tons)';
					}
				}
				if (unsafeWindow.ships[i]['enemies']) {
					shipPtr   = unsafeWindow.ships[i]['enemies'];
					shipCount = shipPtr['ships'];
					shipTons  = shipPtr['tons'].toFixed(1);
					if (shipCount ==0) {
						enemiesText = 'No ships found';
					}
					else{
						enemiesText =  shipCount + ' ships (' + shipTons + ' tons)';
					}
				}

				table.appendChild(createUI_row(unsafeWindow.fleets[i][0],unsafeWindow.fleets[i][1],friendsText,neutralsText,enemiesText));	
				unsafeWindow.completed[i] = "processed";
				unsafeWindow.completedCount++;
			}
			else if(unsafeWindow.completed[i] == "false"){
				unsafeWindow.allfinished = "false";
					setTimeout(function() {
						checkCompleted(table);
					},5000);	// After 5 seconds check if finished

			}
		}
		
	if (unsafeWindow.allfinished == "true") {
		displayTable(table);
	}
	else {
	    if (unsafeWindow.progressAlerts){
		    alert("Loading, Please Wait. "+ unsafeWindow.completedCount + " out of " + unsafeWindow.fleets.length +" perimeter scans completed. Press Ok to check for progress.");
	   }
	}
	
}



function displayTable(table) {
	var baseElement = findUI_insertPoint();		baseElement.parentNode.insertBefore(table, baseElement);
	baseElement.parentNode.insertBefore(document.createElement('br'), baseElement);

}

function createButton () {

	var myDiv       = document.createElement ('div');
	myDiv.innerHTML =    " <input type='button' onClick='performAutoScan()' value='All Fleets Perimeter Scan' />" ;  
	return myDiv	
}






function createUI_table() {		
    var table = document.createElement('table');
    table.setAttribute('width', '90%');
    table.setAttribute('align', 'center');
    return table;
}


function createUI_rowHead() {		// creates the header row of the table
    var row1 = document.createElement('tr');
    var column1 = document.createElement('td');
    column1.setAttribute('class', 'head');
    column1.innerHTML = "\ Fleet Name ";
    var column2 = document.createElement('td');
    column2.setAttribute('class', 'head');
    column2.innerHTML = "\ Friendly Ships ";
    var column3 = document.createElement('td');
    column3.setAttribute('class', 'head');
    column3.innerHTML = "\ Neutral Ships ";
    var column4 = document.createElement('td');
    column4.setAttribute('class', 'head');
    column4.innerHTML = "\ Enemy Ships ";
	
	column2.style.fontWeight = 'bold';
	column3.style.fontWeight = 'bold';
	column4.style.fontWeight = 'bold';
	column2.style.color = 'Aqua';
	column3.style.color = 'DarkGray';
	column4.style.color = 'red';
    row1.appendChild(column1);
	row1.appendChild(column2);
    row1.appendChild(column3);
    row1.appendChild(column4);
    return row1;
	
}

function createUI_row(fleetName,fleetId,friends,neutrals,enemies) {	// Creates a table row entry
    var row = document.createElement('tr');
    var column1 = document.createElement('td');
    column1.setAttribute('class', 'head');
    column1.innerHTML = "<a href='http://www.war-facts.com/fleet_navigation.php?fleet=" + fleetId +"'>"+ fleetName+"</a>" ;
    var column2 = document.createElement('td');
    column2.setAttribute('class', 'head');
    column2.innerHTML = friends;
	if (friends != 'No ships found'){
		column2.style.color = 'Aqua';
	}
    var column3 = document.createElement('td');
    column3.setAttribute('class', 'head');
    column3.innerHTML = neutrals;
	if (neutrals != 'No ships found'){
		column3.style.color = 'DarkGray';
	}
    var column4 = document.createElement('td');
    column4.setAttribute('class', 'head');
    column4.innerHTML = enemies ;
	if (enemies != 'No ships found'){
		column4.style.color = 'red';
	}
    row.appendChild(column1);
	row.appendChild(column2);
    row.appendChild(column3);
    row.appendChild(column4);
    return row;
	
}

function createUI_header() {
    var header = document.createElement('p')
    header.innerHTML = '<b><u>All Fleets Scan</u></b>'
    return header
}

function findUI_insertPoint() {
	return document.body.getElementsByTagName("center")[0];
     
}



var baseElement = findUI_insertPoint();
baseElement.parentNode.insertBefore(createButton(), baseElement);	// Creates and displays the button. 
//unsafeWindow.myDiv = document.createElement('div');
//login();
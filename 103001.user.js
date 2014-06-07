// ==UserScript==
// @name           Pardus Tax Refunder
// @namespace      pardus.at
// @description    Allows easy controls to allow an alliance treasurer to refund taxes
// @include        http://*.pardus.at/alliance_funds.php*
// @include        http://*.pardus.at/alliance_members.php*
// @author         Rhindon
// @version        1.2
// ==/UserScript==


// ////////////////////////////////////////////////////////////////////////
// User Variables
// ////////////////////////////////////////////////////////////////////////

var yellowRefundPercentage = 50;
var redRefundPercentage = 0;
var greenRefundPercentage = 100;

var cookieName = "taxRefunderPilotList";

// ////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard Cookie Code 
//          -- Stores GreaseMonkey Values instead of actual Cookies
// ////////////////////////////////////////////////////////////////////////

function createCookie(name,value) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	GM_setValue(subdomain + '-' + name,value);

}

function readCookie(name) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	try {
		var temp = GM_getValue(subdomain + '-' + name);
		if(temp != '~~~DELETED~~~') return temp;
		return null;
       	} catch(err) {
       		return null;
	}
}

function eraseCookie(name) {
	createCookie(name,"~~~DELETED~~~");
}

// ////////////////////////////////////////////////////////////////////////
// End imported code
// ////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////

function init_taxRefunder() {

	anchors = document.getElementsByTagName('a');

	var headerEdited = false;
	var index = 0;

	for(var i = 0; i < anchors.length; i++) {
		if(anchors[i].href.indexOf('alliance_funds.php?cdel=') > 0) {
			var memberId = anchors[i].href.substr(anchors[i].href.indexOf('?cdel=') + 6);
			
			row = anchors[i].parentNode.parentNode;

			var pilot = row.cells[0].innerHTML;
			
			//See if the header row has been edited
			if(!headerEdited) {
			
				//Increase width of parent table
				row.parentNode.parentNode.setAttribute("width", "80%");
				
				var headerRow = row.parentNode.rows[0];
				
				//Add the header columns to the header row
				var refundTH = document.createElement('th'); 
				refundTH.innerHTML = "Refund Amount";
				refundTH.setAttribute("nowrap", "nowrap");
				headerRow.appendChild(refundTH);
				
				var actTH = document.createElement('th');
				actTH.innerHTML = 'Activity';
				actTH.setAttribute("nowrap", "nowrap");
				headerRow.appendChild(actTH);

				var btnTH = document.createElement('th');
				btnTH.innerHTML = 'Refund Now!';
				btnTH.setAttribute("nowrap", "nowrap");
				headerRow.appendChild(btnTH);
				
				
				headerEdited = true;
			}
			
			//Calculate the refund amount
			var taxesPaid = row.cells[2].innerHTML;
			taxesPaid = taxesPaid.replace(/,/g, '');

			//Add the tax refund calc cell
			var refundCalc = row.insertCell(4);
			
			//Add the activity cell
			var activityCalc = row.insertCell(5);
			activityCalc.innerHTML = getPilotActivity(pilot);
//
//			var refundPercentage = yellowRefundPercentage;
//			
//			if(activityCalc.innerHTML.indexOf('rgb(0, 187, 0)') >= 0) {
//				refundPercentage = greenRefundPercentage;
//			} else if(activityCalc.innerHTML.indexOf('rgb(255, 204, 51)') >= 0) {
//				refundPercentage = yellowRefundPercentage;
//			} else if(activityCalc.innerHTML.indexOf('rgb(255, 0, 0)') >= 0) {
//				refundPercentage = redRefundPercentage;
//			}
//			

			//Default tax refund to be yellow
			var refundPercentage = yellowRefundPercentage;
			
			//If we were active this week then set the refund percentage to the green one
			var activity = getPilotActivity(pilot);
			if(activity.indexOf('rgb(0, 187, 0)') >= 0 || activity.indexOf('#00bb00') >= 0) {
				 refundPercentage = greenRefundPercentage;
			}
			else
			//If we are due to be deleted then set the refund percentage to the red one
			if(activity.indexOf('rgb(255, 0, 0)') >= 0 || activity.indexOf('#FF0000') >= 0) {
				 refundPercentage = redRefundPercentage;
			}
			
			var refundAmount = Math.ceil(taxesPaid * (refundPercentage / 100));
			var textNode = document.createTextNode(refundPercentage + '% : ' + refundAmount);
			
			refundCalc.appendChild(textNode);


			
			
			//Add the Refund button
			var btnHtml = "<form action='alliance_funds.php' method='post'>" +
			"	<input type='hidden' name='player' value='" + memberId + "'>" +
			"	<input type='hidden' name='credits' value='" + refundAmount + "'>" +
			"	<input type='hidden' name='reason' value='Tax Refund'>" +
			"	<input type='submit' value='Give!'>" +
			"</form>"
			
			var refBtn = row.insertCell(6);
			refBtn.innerHTML = btnHtml;
		}
	}


}


function getPilotActivity(pilot) {

	var curCookie = readCookie(cookieName);

	var list = curCookie.split('~');
	
	for(var i = 0; i < list.length; i++) {

		if(list[i].indexOf(pilot) >= 0) {
			var arr = list[i].split('|');
			return arr[1];			
		}
	}

}


function store_activity() {

	tds = document.getElementsByTagName('td');

	var memberTable;
	
	eraseCookie(cookieName);

	for(var i = 0; i < tds.length; i++) {
		if(tds[i].innerHTML == "<strong>Pilot</strong>") {
			memberTable = tds[i].parentNode.parentNode.parentNode;
		}
	}

	for(var i = 1; i < memberTable.rows.length; i++) {
		
		pilot = memberTable.rows[i].cells[0].getElementsByTagName('a')[0].innerHTML;
		activity = memberTable.rows[i].cells[5].innerHTML;
		
		var curCookie = readCookie(cookieName);
		
		if(curCookie == null) {
			curCookie = "";
		} else {
			curCookie += "~";
		}
		
		createCookie(cookieName, curCookie + pilot + "|" + activity);		
	}

}

if(document.URL.indexOf('alliance_funds.php') >= 0) {
	init_taxRefunder();
} else if(document.URL.indexOf('alliance_members.php') >= 0) {
	store_activity();
}
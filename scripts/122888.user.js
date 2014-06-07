// ==UserScript==
// @name			Pardus Tax Refunder
// @namespace		pardus.at
// @description		Allows easy controls to allow an alliance treasurer to refund taxes
// @include			http://*.pardus.at/alliance_funds.php*
// @include			http://*.pardus.at/alliance_members.php*
// @include			https://*.pardus.at/alliance_funds.php*
// @include			https://*.pardus.at/alliance_members.php*
// @author			Joshua Calvert (Artemis), based on a script by Rhindon (Orion)
// @version			2.01
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_xmlhttpRequest
// ==/UserScript==


// ////////////////////////////////////////////////////////////////////////
// Script updates
// ////////////////////////////////////////////////////////////////////////
//
// New in version 2.01
// - Added @grant with used GM functions
// - Changed default TaxPercentage to zero (and added an explanation)
// - Custom refund message was added as a user varable (script still adds information of additional tax and membership fee as before if used)
// - Added functionality to not refund certain pilots (specified by ID) - Thank you John Duck Destroyer!


// ////////////////////////////////////////////////////////////////////////
// User Variables
// ////////////////////////////////////////////////////////////////////////

var Lt1W_RefundPercentage = 100; //%
var Mt1W_RefundPercentage = 90; //%
var Mt1M_RefundPercentage = 50; //%
var Mt2M_RefundPercentage = 25; //%
var Mt3M_RefundPercentage = 25; //%
var Mt4M_RefundPercentage = 0; //%
var Dw1M_RefundPercentage = 0; //%

var MembershipFee = 0; //credits - quasi monthly fee in credits (per 30 days), script adjusts fee based on duration between refunds
var TaxPercentage = 0; //% - alliance tax similar to Pardus ingame daily tax (this allows non-null tax along with taxation of inactivity)

var Hide_DeleteAllRecords_link = true; 	//true  - the link to delete all records will be hidden; false - the link to delete all records will remain untouched

var RefundMessage = 'Inactive tax refund';

var NoRefund = ""; // Do not refund pilots with these ID's. Example: NoRefund = "$3525 $8271 $1928";

// ////////////////////////////////////////////////////////////////////////
// Cookie Variables
// ////////////////////////////////////////////////////////////////////////

var cookieName = "taxRefunderPilotList";
var cookieTax = "taxRefunderPaymentList";

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
	
	// ------------------------------------------------
	//Add buttons for storing new payments (and removing the link to delete all records)
	bolds = document.getElementsByTagName('b');
	
	var storeButton = document.createElement('input');
	storeButton.type = 'button';
	storeButton.value = 'Store new payments';
	storeButton.addEventListener("click", store_payments, true);
	
	var importButton = document.createElement('input');
	importButton.type = 'button';
	importButton.value = 'Import';
	importButton.addEventListener("click", import_payments, true);
	
	var exportButton = document.createElement('input');
	exportButton.type = 'button';
	exportButton.value = 'Export';
	exportButton.addEventListener("click", export_payments, true);
	
	// Didn't know how else to insert space between buttons :wacko:
	var justSpace1 = document.createElement('span');
	justSpace1.innerHTML = " ";
	var justSpace2 = document.createElement('span');
	justSpace2.innerHTML = " ";
	
	for(var i = 0; i < bolds.length; i++) {
		if(bolds[i].innerHTML.indexOf('Current Alliance Funds') >= 0) {
			bolds[i].innerHTML = bolds[i].innerHTML + "<br><br>";
			bolds[i].parentNode.appendChild(storeButton);
			bolds[i].parentNode.appendChild(justSpace1);
			bolds[i].parentNode.appendChild(importButton);
			bolds[i].parentNode.appendChild(justSpace2);
			bolds[i].parentNode.appendChild(exportButton);
		}
		
		if(bolds[i].innerHTML.indexOf('DELETE ALL RECORDS') >= 0 && Hide_DeleteAllRecords_link) {
			bolds[i].innerHTML = "";
		}
	}
	
	// ------------------------------------------------
	//Start changing the main table
	anchors = document.getElementsByTagName('a');

	var headerEdited = false;
	var index = 0;
	
	//learning how much time has past since last storring / exporting data
	//----- I need to go twice over the whole table, first time to determine max payment. Script assumes
	//----- that the one who paid the most tax has been paying 100k the whole time which is then used to
	//----- determine how many days tax has been collected since the last refunds (storring)
	//----- In first pass the table is also adjusted. The rest of the code in this pass has been commented
	var maxPayment = 0;
	
	for(var i = 0; i < anchors.length; i++) {
		
		if(anchors[i].href.indexOf('alliance_funds.php?cdel=') > 0) {
			//var memberId = anchors[i].href.substr(anchors[i].href.indexOf('?cdel=') + 6);
			
			row = anchors[i].parentNode.parentNode;

			var pilot = row.cells[0].innerHTML;
			
			//See if the header row has been edited
			if(!headerEdited) {
				
				//Increase width of parent table
				row.parentNode.parentNode.setAttribute("width", "80%");
				
				var headerRow = row.parentNode.rows[0];
				
				//Resize widths of existing columns due to the increased width of parent table
				headerRow.childNodes[0].setAttribute("width", "20%");
				headerRow.childNodes[1].setAttribute("width", "15%");
				headerRow.childNodes[2].setAttribute("width", "15%");
				headerRow.childNodes[3].setAttribute("width", "1%");
				
				//Add the header columns to the header row
				var budgetTH = document.createElement('th'); 
				budgetTH.innerHTML = "Personal budget";
				budgetTH.setAttribute("nowrap", "nowrap");
				budgetTH.setAttribute("width", "10%");
				headerRow.appendChild(budgetTH);
				
				var refundTH = document.createElement('th'); 
				refundTH.innerHTML = "Refund Amount";
				refundTH.setAttribute("nowrap", "nowrap");
				refundTH.setAttribute("width", "18%");
				headerRow.appendChild(refundTH);
				
				var actTH = document.createElement('th');
				actTH.innerHTML = 'Activity';
				actTH.setAttribute("nowrap", "nowrap");
				actTH.setAttribute("width", "15%");
				headerRow.appendChild(actTH);
				
				var btnTH = document.createElement('th');
				btnTH.innerHTML = 'Refund Now!';
				btnTH.setAttribute("nowrap", "nowrap");
				btnTH.setAttribute("width", "6%");
				headerRow.appendChild(btnTH);
				
				
				headerEdited = true;
			}
			
			
			//Calculate the refund amount
			var taxesPaidBefore = getPilotPayments(pilot);
			var taxesPaidNow = row.cells[2].innerHTML.replace(/,/g, '');
			taxesPaid = taxesPaidNow - taxesPaidBefore;
			
			if(taxesPaid > maxPayment) {
				maxPayment = taxesPaid;
			}
		}
	}
	
	
	
	var TaxationDurration = parseInt(maxPayment / 100000);
	var AllPayments = "";
	
	for(var i = 0; i < anchors.length; i++) {
		
		if(anchors[i].href.indexOf('alliance_funds.php?cdel=') > 0) {
			var memberId = anchors[i].href.substr(anchors[i].href.indexOf('?cdel=') + 6);
			
			row = anchors[i].parentNode.parentNode;

			var pilot = row.cells[0].innerHTML;
						
			//Calculate the refund amount
			var taxesPaidBefore = getPilotPayments(pilot);
			var taxesPaidNow = row.cells[2].innerHTML.replace(/,/g, '');
			taxesPaid = taxesPaidNow - taxesPaidBefore;
			
			//Add the personal budget calc cell
			var budgetCalc = row.insertCell(4);
			budgetCalc.innerHTML = getPilotBudget(pilot); //.replace(/,/g,"");
			var budget = budgetCalc.innerHTML.replace(/,/g,'');
			
			//Add the tax refund calc cell
			var refundCalc = row.insertCell(5);
			
			//Add the activity cell
			var activityCalc = row.insertCell(6);
			activityCalc.innerHTML = getPilotActivity(pilot).replace(/<br>/g," ");
			
			var refundPercentage = 0;
			
			if(activityCalc.innerHTML.indexOf('rgb(0, 187, 0)') >= 0 || activityCalc.innerHTML.indexOf('#00bb00') >= 0) {
				refundPercentage = Lt1W_RefundPercentage;
			} else if(activityCalc.innerHTML.indexOf('rgb(170, 255, 0)') >= 0 || activityCalc.innerHTML.indexOf('#aaff00') >= 0) {
				refundPercentage = Mt1W_RefundPercentage;
			} else if(activityCalc.innerHTML.indexOf('rgb(221, 255, 0)') >= 0 || activityCalc.innerHTML.indexOf('#ddff00') >= 0) {
				refundPercentage = Mt1M_RefundPercentage;
			} else if(activityCalc.innerHTML.indexOf('rgb(255, 255, 0)') >= 0 || activityCalc.innerHTML.indexOf('#ffff00') >= 0) {
				refundPercentage = Mt2M_RefundPercentage;
			} else if(activityCalc.innerHTML.indexOf('rgb(255, 220, 0)') >= 0 || activityCalc.innerHTML.indexOf('#ffdc00') >= 0) {
				refundPercentage = Mt3M_RefundPercentage;
			} else if(activityCalc.innerHTML.indexOf('rgb(255, 102, 0)') >= 0 || activityCalc.innerHTML.indexOf('#ff6600') >= 0) {
				refundPercentage = Mt4M_RefundPercentage;
			} else if(activityCalc.innerHTML.indexOf('rgb(255, 0, 0)') >= 0 || activityCalc.innerHTML.indexOf('#ff0000') >= 0) {
				refundPercentage = Dw1M_RefundPercentage;
			} 
			
			var TaxToPay = parseInt(budget * TaxPercentage/100 * TaxationDurration);
			var FeeToPay = parseInt(MembershipFee * TaxationDurration / 30);
			
			var refundAmount = Math.ceil(taxesPaid * (refundPercentage / 100)) - FeeToPay - TaxToPay;
			if(refundAmount < 0) {
				refundAmount = 0;
			}
			
			var textNode
			var Reason
			if(TaxToPay > 0 && FeeToPay > 0) {
				textNode = document.createTextNode(refundPercentage + '% : ' + refundAmount + ' (tax: ' + TaxToPay + '; fee: ' + FeeToPay + ')');
				Reason = RefundMessage + '(minus ' + TaxToPay + ' tax and ' + FeeToPay + ' membership fee)';
			} else if(TaxToPay > 0) {
				textNode = document.createTextNode(refundPercentage + '% : ' + refundAmount + ' (tax: ' + TaxToPay + ')');
				Reason = RefundMessage + '(minus ' + TaxToPay + ' tax)';
			} else if(FeeToPay > 0) {
				textNode = document.createTextNode(refundPercentage + '% : ' + refundAmount + ' (fee: ' + FeeToPay + ')');
				Reason = RefundMessage + '(minus ' + FeeToPay + ' membership fee)';
			} else {
				textNode = document.createTextNode(refundPercentage + '% : ' + refundAmount);
				Reason = RefundMessage;
			}
			
			refundCalc.appendChild(textNode);
			
			
			//Add the Refund button
			var btnHtml = "<form action='alliance_funds.php' method='post'>" +
			"	<input type='hidden' name='player' value='" + memberId + "'>" +
			"	<input type='hidden' name='credits' value='" + refundAmount + "'>" +
			"	<input type='hidden' name='reason' value='" + Reason + "'>" +
			"	<input type='submit' value='Give!'>" +
			"</form>"
			
			var refBtn = row.insertCell(7);
			refBtn.innerHTML = btnHtml;
			
			//Writing a string  to add "Send all" function
			if(AllPayments != "") {
				AllPayments += "~";
			}
			AllPayments = AllPayments + memberId + "|" + refundAmount + "|" + Reason;
			//AllPayments = AllPayments + memberId + "|1|Sorry for the spam. I'm testing my new auto-refunder script. Joshua";
			
			
			var WithdrawnLastTime = parseInt(row.cells[1].innerHTML.replace(/,/g, ''));
			
			if(WithdrawnLastTime > maxPayment) {
				maxPayment = WithdrawnLastTime;
			}
		}
	}
	
	
	//Add the "Send all payments" button
	var SendAllButton = document.createElement('input');
	SendAllButton.type = 'button';
	SendAllButton.value = 'Send All Tax Refunds!';
	SendAllButton.addEventListener("click", SendAllPayments, true);
	
	var justLineBreak = document.createElement('span');
	justLineBreak.innerHTML = "<br><br>";
	
	underline = document.getElementsByTagName('u');
	
	for(var i = 0; i < underline.length; i++) {
		if(underline[i].innerHTML.indexOf('Give out credits') > 0) {
			
			underline[i].innerHTML += "<br><br><b>WARNING!</b><br><font size='1'>This script sends a refund to every member. Please be sure, this is what you want and remember the <a href=\"http://www.pardus.at/index.php?section=rules\">Rule against Spamming</a>.</font><br>"
			underline[i].innerHTML += "<font size='1'></u>Copy the entire contents of below text area (click inside and hit ctrl+A to select all) and paste it upon clicking 'Send All Tax Refunds!'<br></font>";
			
			var AllPaymetsArea = document.createElement('textarea');
			AllPaymetsArea.value = AllPayments;
			
			underline[i].parentNode.appendChild(AllPaymetsArea);
			underline[i].parentNode.appendChild(justLineBreak);
			underline[i].parentNode.appendChild(SendAllButton);
		}
	}
}

function SendAllPayments() {
	
	var s = "";
	s = prompt("Paste here the entire 'All payments' string from above",s);
	
	var list = s.split('~');
	var total = 0;
	
	for(var j = 0; j < list.length; j++) {
		
		var PostVars = list[j].split('|'); //PostVars[0] = MemberId, PostVars[1] = refundAmount, PostVars[2] = Reason
		var PostVarsStr = "player="+encodeURIComponent(PostVars[0])+"&credits="+encodeURIComponent(PostVars[1])+"&reason="+encodeURIComponent(PostVars[2]);
		
		if (NoRefund.indexOf("$" + PostVars[0]) == -1) { //leave out people specified in NoRefund user variable
			GM_xmlhttpRequest({
				method: "post",
				url: "alliance_funds.php",
				headers: { "Content-type" : "application/x-www-form-urlencoded" },
				data: PostVarsStr,
			});
			total += parseInt(PostVars[1]);
		}
	}
	
	alert("All payments have been sent. A total of " + total + " credits has been sent out.");
}

function getPilotBudget(pilot) {

	var curCookie = readCookie(cookieName);

	var list = curCookie.split('~');
	
	for(var i = 0; i < list.length; i++) {

		if(list[i].indexOf(pilot) >= 0) {
			var arr = list[i].split('|');
			return arr[1];			
		}
	}

}


function getPilotActivity(pilot) {

	var curCookie = readCookie(cookieName);

	var list = curCookie.split('~');
	
	for(var i = 0; i < list.length; i++) {

		if(list[i].indexOf(pilot) >= 0) {
			var arr = list[i].split('|');
			return arr[2];			
		}
	}

}

function getPilotPayments(pilot) {

	var curCookie = readCookie(cookieTax);

	var list = curCookie.split('~');
	
	var DataFound = false;
	
	for(var i = 0; i < list.length; i++) {
		
		if(list[i].indexOf(pilot) >= 0) {
			var arr = list[i].split('|');
			DataFound = true;
			return arr[1];
		}
	}
	
	if(!DataFound) {
		var NaN = "0";
		return NaN;
	}

}

function store_payments() {
	
	eraseCookie(cookieTax);
	
	var headerEdited = false;
	var index = 0;
	
	anchors = document.getElementsByTagName('a');
	
	for(var i = 0; i < anchors.length; i++) {
		if(anchors[i].href.indexOf('alliance_funds.php?cdel=') > 0) {
			var memberId = anchors[i].href.substr(anchors[i].href.indexOf('?cdel=') + 6);
		   
			row = anchors[i].parentNode.parentNode;
			
			var member = row.cells[0].innerHTML;
			var paid = row.cells[2].innerHTML.replace(/,/g, '');
			
			var curCookie = readCookie(cookieTax);
			
			if(curCookie == null) {
				curCookie = "";
			} else {
				curCookie += "~";
			}
			
			createCookie(cookieTax, curCookie + member + "|" + paid);
		}
	}
	
	alert("Payments were stored succesfully. You will have to refresh the page to see the results.");
}

function export_payments() {
	
	var s = "";
	
	anchors = document.getElementsByTagName('a');
	
	for(var i = 0; i < anchors.length; i++) {
		if(anchors[i].href.indexOf('alliance_funds.php?cdel=') > 0) {
		   
			row = anchors[i].parentNode.parentNode;
			
			var member = row.cells[0].innerHTML;
			var paid = row.cells[2].innerHTML.replace(/,/g, '');
			
			if(s != "") {
				s += "~";
			}
			
			s = s + member + "|" + paid;
		}
	}
	
	s = prompt("Payment export: Copy this code and save it in a text file or pilot log:",s);
}

function import_payments() {
	
	eraseCookie(cookieTax);
	
	var s = "";
	s = prompt("Payment import: paste exported payments here, ensuring there are no extra spaces at the start or end",s);
	if (s && s != "")
	{
		createCookie(cookieTax, s);
		alert("Import was succesful. You will have to refresh the page to see the results.");
	} else 
	{
		alert("There was an error while trying to import payments.");
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
		funds = memberTable.rows[i].cells[1].innerHTML;
		activity = memberTable.rows[i].cells[5].innerHTML;
		
		var curCookie = readCookie(cookieName);
		
		if(curCookie == null) {
			curCookie = "";
		} else {
			curCookie += "~";
		}
		
		createCookie(cookieName, curCookie + pilot + "|" + funds + "|" + activity);		
	}

}


if(document.URL.indexOf('alliance_funds.php') >= 0) {
	init_taxRefunder();
} else if(document.URL.indexOf('alliance_members.php') >= 0) {
	store_activity();
}
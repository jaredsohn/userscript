/****************************
Irctc Beta Availability Display User Script
version 1.0.6
Initial upload date - February 5, 2010
Last upload date - Apr 09, 2013

Released under a GNU General Public License version 3 (GPLv3)
http://opensource.org/licenses/gpl-3.0.html

Wishlist
--------
Please visit Wishlists section @ http://userscripts.org/scripts/show/68115.

Contact
-------
mail me @ nitin_1984_2000@yahoo.com

Contribute
----------
http://code.google.com/p/irctcbeta-availability-greasemonkey-script/
*****************************/


// ==UserScript==
// @name		Irctc Availabilty
// @description	Gets the availabilty of the trains as a separate column in Plan my travel page in IRCTC Beta Site
// @namespace	IRCTC_BETA
// @include		http://www.irctc.co.in/cgi-bin/beta.dll/irctc/booking/planner.do?*
// @include		https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do?*
// @version     1.0.6
// @contributor Nitin Kishen
// ==/UserScript==

	
if ((document.location.href.match('planner.do')) && document.getElementById('plannerTrainListResult')!=null){

	// GM_log('inside first if block');
	
	var locationHref = document.location.href;
	var locationArr = {};
	var bv_SessionID;
	var bv_EngineID;
	var bv_SessionIDValue;
	var bv_EngineIDValue;
	var indexOfSeparator = locationHref.indexOf('?'); //Get the index of ?
	var locationSubStr = locationHref.substring(indexOfSeparator+1);
	locationArr = locationSubStr.split('&');
	
	//Get the value for BV_SessionID
	bv_SessionID = locationArr[0].split('=')[0];
	bv_SessionIDValue = locationArr[0].split('=')[1];
	
	//Get the value for BV_EngineID
	bv_EngineID = locationArr[1].split('=')[0];
	bv_EngineIDValue = locationArr[1].split('=')[1];
	
	//Call the XMLHttpRequest to get the availability page passing the above params
	callHttpRequest(bv_SessionID,bv_SessionIDValue,bv_EngineID,bv_EngineIDValue);
	
}
/* 
   Credit to John Resig for this function taken from Pro JavaScript techniques 
   To get the previous siblings
*/

function next(elem) { 
	do { 
		elem = elem.previousSibling; 
	} while (elem && elem.nodeType != 1);
	
	return elem; 
}

function callHttpRequest(bv_SessionID,bv_SessionIDValue,bv_EngineID,bv_EngineIDValue){

	// GM_log('inside ajax call');
	
	// Get hold of all the trains numbers through the td
	var sQuery = "//td[@class='border-btm'][@width='10%'][@height='30'][@align='left']";
	
	var trainNoTd = document.evaluate(sQuery, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	// Holds the train numbers in an array
	var trainNoArr = {};
	
	// Loop through the XPathResult Object and get hold of the div element
	for (var i = 0; i<trainNoTd.snapshotLength ; i++) {
		var tdElm = trainNoTd.snapshotItem(i);
		
		// Get the train number from the td. Extract only the alphanumerics. Irctc puts in a lot of junk spaces!!
		var junkTrainNo = tdElm.innerHTML;
		junkTrainNo = junkTrainNo.replace("&nbsp;","");
		var trainNo = junkTrainNo.replace(/\W/g,'');
		trainNoArr[i] = trainNo;
	
	}
	var browserUserAgent = navigator.userAgent;
	// Get hold of the TR to which we need to append the Status Header TD
	var statusHeaderTr;
	if(browserUserAgent.indexOf('Firefox')!=-1){
		statusHeaderTr = document.evaluate("//tr[@bgcolor='#f1f1f1'][@align='center']", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}else if(browserUserAgent.indexOf('Chrome')!=-1){
		statusHeaderTr = document.evaluate("//tr[@bgcolor='#F1F1F1'][@align='center']", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}else{
		//GM_log(browserUserAgent + ' doesnt support this script');
	}
	
    //Add the 'Status' header td
    var tdHeaderAvail = document.createElement("TD");
	
	//Add the classname and height style
	tdHeaderAvail.width = '5%';
    tdHeaderAvail.style.color= '#CC6666';
    tdHeaderAvail.style.borderRightColor= 'white';
    tdHeaderAvail.style.borderRightStyle= 'solid';
    tdHeaderAvail.style.borderRightWidth= '2px';
	
	//Append the Status text to the td
	tdHeaderAvail.appendChild(document.createTextNode("Status(SL)"));
	
	//Append the status text to the beginning of the TR.
    statusHeaderTr.snapshotItem(0).insertBefore(tdHeaderAvail, statusHeaderTr.snapshotItem(0).children[0]);
    
	// Get hold of all the tr's in which we have to add the extra column.
	var trainNoTr;
	if(browserUserAgent.indexOf('Firefox')!=-1){
		trainNoTr = document.evaluate("//tr[@bgcolor='#ffffff'][@align='center']", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}else if(browserUserAgent.indexOf('Chrome')!=-1){
		trainNoTr = document.evaluate("//tr[@bgcolor='#FFFFFF'][@align='center']", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}else{
		//GM_log(browserUserAgent + ' doesnt support this script');
	}
	
	
	// Get the form
	var form = document.forms.namedItem('BookTicketForm');
	
	// Get the Date
	var date = form.elements.namedItem('JDatee').value;
	
	// Get the month
	var hdnMonth = date.split('/')[1];
			
	// Get the Date
	var hdnDay = date.split('/')[0];
			
	// Get the year
	var hdnYear = date.split('/')[2];
			
	// Get the class code
	//var hdnClasscode = form.elements.namedItem('classCode').options[form.elements.namedItem('classCode').selectedIndex].text;
	//var hdnClass = hdnClasscode.substring(hdnClasscode.indexOf('(')+1,hdnClasscode.length-1);
	var hdnClasscode = 'SL';
			
	// var fromStation = form.elements.namedItem('stationFrom').value;
	// var fromStationCode= fromStation.substring(fromStation.indexOf('(')+1,fromStation.length-1);
	var fromStation;
	var fromStationCode;
	
	// var toStation = form.elements.namedItem('stationTo').value;
	// var toStationCode= toStation.substring(toStation.indexOf('(')+1,toStation.length-1);
	var toStation;
	var toStationCode;
	
	// Get the Quota information.
	var Quota = form.elements.namedItem('quota').options[form.elements.namedItem('quota').selectedIndex].text;
	var tatkalQuota;
	if(Quota == 'Tatkal'){
		tatkalQuota ="CK";
	}else if(Quota == 'General'){
		tatkalQuota ="GN";
	}else if(Quota == 'Ladies'){
		tatkalQuota ="LD";
	}
	
	var ampersand = '&';
	var equals = '=';
	
	// Loop through the XPathResult Object and get hold of the div element
	for (var i = 0; i<trainNoTr.snapshotLength ; i++) {
					
		var isSleeperAvailable = true;
		
		var sleeperTdId = 'sl' + i + '';
		var sleeperTDElem = document.getElementById(sleeperTdId);
		var sleeperTDElemInnerHTML = sleeperTDElem.innerHTML;
		if(sleeperTDElemInnerHTML == 'X'){
			// No Sleeper class for the train.
			isSleeperAvailable = false;
			
		}else{
			
            //<input type="radio" name="classcode" value="SL" onclick="setvalue('SL','18189','TATA ALLP EXP','B','03:25','13:30','M T W TH F S SU','MAS','PGT','2A3ASL',strURL,'avail',false,'Y',session)">
			
			var startIndex = sleeperTDElemInnerHTML.indexOf('(') +1;
			var endIndex = sleeperTDElemInnerHTML.indexOf(')');
			var onClickArg = sleeperTDElemInnerHTML.substring(startIndex,endIndex);
			var splitter =  onClickArg.split(',');
			
			// Get the From station
			fromStation = splitter[7].trim();
			fromStationCode = fromStation.substring(1,fromStation.length-1);
			
			// Get the To Station
			toStation = splitter[8].trim();
			toStationCode = toStation.substring(1,toStation.length-1);
		}
				
		// Get the train number
		var hdnTrnNo = trainNoArr[i];
				
		// Get the TR's to which the TD's that you are going to append
		var trElement = trainNoTr.snapshotItem(i);
		
		// Create the new TD to append
		var tdAvail = document.createElement("TD");
		tdAvail.className = 'border-btmX';
		tdAvail.width = '5%';
		tdAvail.id = 'avail_'+hdnTrnNo;
		tdAvail.style.color= '#CC6666';
        //tdAvail.align = 'left';
					
		////// AJAX for ticket availabilty /////
					
		//Form the url to be passed to the Ajax request
		//var url = "http://www.irctc.co.in/cgi-bin/beta.dll/irctc/booking/PlannerAjaxAction.do?";
        var url = "https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/PlannerAjaxAction.do?"
            url += bv_SessionID + equals + bv_SessionIDValue + ampersand;
            url += bv_EngineID + equals + bv_EngineIDValue + ampersand;
            url += 'ax' + equals + Date.now();
        
        var trainNoURL = 'hdnTrnNo' + equals + hdnTrnNo;
		
		var data = bv_SessionID + equals + bv_SessionIDValue + ampersand;
            data += bv_EngineID + equals + bv_EngineIDValue + ampersand;
            data += 'trainTo' + equals + true + ampersand;            
            data += 'AVaction' + equals + true + ampersand;
            data += trainNoURL + ampersand;;
            data += 'hdnDay' + equals + hdnDay + ampersand;
            data += 'hdnMonth' + equals + hdnMonth + ampersand;
            data += 'hdnYear' + equals + hdnYear + ampersand;
            data += 'hdnClasscode' + equals + hdnClasscode + ampersand;
            data += 'fromStation' + equals + fromStationCode + ampersand;
            data += 'toStation' + equals + toStationCode + ampersand;
            data += 'hdnQuota' + equals + tatkalQuota + ampersand;
            data += 'service' + equals + 'avail';
		
		//GM_log('irctc.userscript.js - url: ' + hdnTrnNo + ':' + url);
        //GM_log('irctc.userscript.js - data: ' + hdnTrnNo + ':' + data);
				
		//Build the loading image.
		var loaderImg = document.createElement('img');
		
		//Build the image using the Data URL Scheme
		var loaderImgSrc = 'data:image/gif,GIF89a%10%00%0B%00%F4%00%00%FF%FF%FF%D2%1E%1E%F7%DE%DE%F6%D5%D5%FA%EC%EC%D3%23%23%D2%1E%1E%D9FF%E8' +
						   '%90%90%E2rr%F2%C2%C2%D7%3B%3B%DE__%E9%97%97%E3vv%F2%C5%C5%D8%3F%3F%D2!!%DFbb%F9%E8%E8%F7%DC%DC%FC%F5%F5%DBOO%F8%E' +
						   '0%E0%FB%F3%F3%F1%BE%BE%ED%AB%AB%F4%D0%D0%FB%EF%EF%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE' +
						   '%1ACreated%20with%20ajaxload.info%00!%F9%04%09%0B%00%00%00%2C%00%00%00%00%10%00%0B%00%00%05-%20%20%8Edi%9E%A4%A0%' +
						   '0A%E2%CA%02%AE%40%10%838%CC5p%D3%7B%DE%DB%B8%9F%0E%07%E4%11%87%B4%E2%40%C8%0C.s%AE%D6%0AE%AD%96B%00!%F9%04%09%0B%' +
						   '00%00%00%2C%00%00%00%00%10%00%0B%00%00%05%24%60a%18%05%60%9E%A8i%1C%87%91%BE%C0%DA%C2%A9%EC%D2%A7%8D%E7%EC%BD%EB%' +
						   'BBX%2F(%9C%05%81%3B%11%89%18%02%00!%F9%04%09%0B%00%00%00%2C%00%00%00%00%10%00%0B%00%00%056%20%20%8E%8Ba%2C%E3%88%' +
						   '24%09%22%1A%0Cc%A4b%A2(%C9%1B%CF%B4%8D%EB2%1A%C0%97%03%C0%82%BD%5B%F1%C8K%11%81%CD%D1%D3%B8%13N%99%C2U%0B*%14%96N' +
						   '%C2%10%00!%F9%04%09%0B%00%00%00%2C%00%00%00%00%10%00%0B%00%00%055%20%20%8E%A4%08E%11T%02%8D%E34b%24I%D1%EA%3C%8F%' +
						   '13%CFuy%E7%3B%9A%0D%A7%03%C8%84%3Eb%B0G%FA%15%8F%CC%91s9%04%1Ay%AB%D6%8B%BA*%9DR!%00!%F9%04%09%0B%00%00%00%2C%00%' +
						   '00%00%00%10%00%0B%00%00%052%20%20%8Edi%9E%D6%B2X%E6DQ%93%B8H%D2bRUE%C9%B4%5D%E2%3A%5E%ED%96%DB%01f%C3_Q%E8%23%01%' +
						   '8D%C8%E6%C8%05c%9EJ%A9%D5%F5%1A%02%00!%F9%04%09%0B%00%00%00%2C%00%00%00%00%10%00%0B%00%00%057%20%20%8Edi%9E%24q%5' +
						   'D%84%A8%B2b%A6i%D9%85a%97h%E3%A2%B6m%9A%5D%0E%20%EC%FD%82%B7a%11%E0%03.%97M%24%8F%984%02_-%0066%CB%A0%BE%E0R%08%0' +
						   '0!%F9%04%09%0B%00%00%00%2C%00%00%00%00%10%00%0B%00%00%05%2F%20%20%8Edi%9E%E4DQ%93%A8%B2%EE%AAr%1C%25R%B4%0D%E05%A' +
						   'F%FB%B7%1Cp%97%0B%F6%8A%C4%9Aq%85%1C%FA%5E-%004%06CY%AF%A4%10%00!%F9%04%09%0B%00%00%00%2C%00%00%00%00%10%00%0B%00' +
						   '%00%05%2F%20%20%8Edi%9E%E4DQ%93%A8%B2%EE%AAr%1C%25R%B4%0D%E05%AF%FB%B7%1Cp%97%0B%F6%8A%C4%9Aq%85%1C%FA%5E-%004%06' +
						   'CY%AF%A4%10%00%3B%00%00%00%00%00%00%00%00%00';
		
		
		loaderImg.src= loaderImgSrc;
		
		// Append the loader image into the TD
		tdAvail.appendChild(loaderImg);	
		
		// Append the Status TD into the TR.
        trElement.insertBefore(tdAvail, trElement.children[0])
		//trElement.appendChild(tdAvail);	
		
		// Get the availabilty by calling the xmlHttpRequest.
		// see @ http://userscripts.org/topics/138
		getAvailability(url,data,tdAvail,hdnTrnNo,isSleeperAvailable);
	}

}

function getAvailability(url,data,tdAvail,hdnTrnNo,isSleeperAvailable){
	//GM_log('irctc.userscript.js - URL for trainNo:' + hdnTrnNo  + ' is: ' + url + ' and data is: ' + data);
	if(isSleeperAvailable){
	
		GM_xmlhttpRequest({method:"POST",
				url:url,
                data: data,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Accept" : "text/javascript, text/html, application/xml, text/xml, */*"
                },
				onload:function(result) {
					try {
						
						// logging url
						// GM_log('irctc: inside xmlHttpRequest; url is: ' + url);
						
						// logging responseText
						//GM_log('irctc.userscript.js - responseText for trainNo:' + hdnTrnNo  + ' is: ' + result.responseText);
						
						var respText = result.responseText;
						var statusAvailabilty;
						if(respText.match('@Transactions Suspended')){
							statusAvailabilty ='Transactions Suspended';
							
						}else if(respText.match('ProblemError')){
							statusAvailabilty ='Error';
						
						}else if(respText.length==0){
							statusAvailabilty ='Try Again!';
						}else{
							var arrResp = respText.split('|');					
							statusAvailabilty = arrResp[0].split('&')[1];
                            if(statusAvailabilty.indexOf('/') != -1){
                                var temp = statusAvailabilty.split('/');
                                //break the long status texts into newline to accomadate in the td
                                statusAvailabilty = temp[0] + '/' + '<br>' + temp[1];
                            }
						}
						// GM_log('irctc.userscript.js - statusAvailabilty for trainNo: ' + hdnTrnNo + ' is: ' + statusAvailabilty);
						
						// Create the text inside the td and append to the TR
						tdAvail.removeChild(tdAvail.firstChild);
						tdAvail.innerHTML =statusAvailabilty;
						
						
					} catch (e) {
						// GM_log('Unable to get Availabilty; exception: ' + e);
						tdAvail.removeChild(tdAvail.firstChild);
						tdAvail.innerHTML = 'Try Again!';
						
					}
				}
		});
	}else{
		tdAvail.removeChild(tdAvail.firstChild);
		tdAvail.innerHTML = 'No SL Class!';
		
	}

}
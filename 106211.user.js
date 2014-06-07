/****************************
Irctc Beta Availability Display User Script
version 1.0
February 5, 2010

Released under a GNU General Public License version 3 (GPLv3)
http://opensource.org/licenses/gpl-3.0.html

Wishlist
--------
some kind of UI placeholder through which people can choose which class to select for the trains. currently gives the availabilty of SL.
have this also in the normal irctc site. Sadly irctc availability pop-up is not well formed. damn!!!
may be have it not as an extra td at all. may be some other layout. need more ideas on this

Contact
-------
mail me @ nitin_1984_2000@yahoo.com

Contribute
----------
http://code.google.com/p/irctcbeta-availability-greasemonkey-script/
*****************************/


// ==UserScript==
// @name        Irctc Availabilty
// @description Gets the availabilty of the trains as a separate column in Plan my travel page in IRCTC Beta Site
// @namespace   IRCTC_BETA
// @include     http://www.irctc.co.in/cgi-bin/beta.dll/irctc/booking/planner.do?*
// @version     1.0.0
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
        
        // Get hold of the TR to which we need to append the Status Header TD
        var statusHeaderTr = document.evaluate("//tr[@bgcolor='#f1f1f1'][@align='center']", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var tdHeaderAvail = document.createElement("TD");
        
        //Add the classname and height style
        tdHeaderAvail.className = 'boder-lft';
        tdHeaderAvail.width = '5%';
        tdHeaderAvail.style.color= '#CC6666';
        
        //Append the Status text to the td
        tdHeaderAvail.appendChild(document.createTextNode("Status(SL)"));
        
        //Append the status text to the TR.
        statusHeaderTr.snapshotItem(0).appendChild(tdHeaderAvail);
        
        // Get hold of all the tr's in which we have to add the extra column.
        var trainNoTr = document.evaluate("//tr[@bgcolor='#ffffff'][@align='center']", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        
        // Get the form
        var form = document.forms.namedItem('BookTicketForm');
        
        // Get the Date
        var date = form.elements.namedItem('JDate1').value;
        
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
                        // InnerHTML of the type <input onclick="setvalue('SL','2296','SANGHA MITRA EX','A','14:00','20:40','M T W - F S SU','MAS','SBC')" value="SL".....> 
                        var startIndex = sleeperTDElemInnerHTML.indexOf('(') +1;
                        var endIndex = sleeperTDElemInnerHTML.indexOf(')');
                        var onClickArg = sleeperTDElemInnerHTML.substring(startIndex,endIndex);
                        var splitter =  onClickArg.split(',');
                        
                        // Get the From station
                        fromStation = splitter[splitter.length-2];
                        fromStationCode = fromStation.substring(1,fromStation.length-1);
                        
                        // Get the To Station
                        toStation = splitter[splitter.length-1];
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
                                        
                ////// AJAX for ticket availabilty /////
                                        
                //Form the url to be passed to the Ajax request
                var url = "http://www.irctc.co.in/cgi-bin/beta.dll/irctc/booking/PlannerAjaxAction.do?";
                        url += bv_SessionID + equals + bv_SessionIDValue + ampersand;
                        url += bv_EngineID + equals + bv_EngineIDValue + ampersand;
                        url += 'trainTo' + equals + true + ampersand;
                        url += 'AVaction' + equals + true + ampersand;
                        url += 'hdnDay' + equals + hdnDay + ampersand;
                        url += 'hdnMonth' + equals + hdnMonth + ampersand;
                        url += 'hdnYear' + equals + hdnYear + ampersand;
                        url += 'hdnClasscode' + equals + hdnClasscode + ampersand;
                        url += 'fromStation' + equals + fromStationCode + ampersand;
                        url += 'toStation' + equals + toStationCode + ampersand;
                        url += 'hdnQuota' + equals + tatkalQuota + ampersand;
                                                                        
                var trainNoURL = 'hdnTrnNo' + equals + hdnTrnNo;
                
                url += trainNoURL;
                
                // GM_log('irctc.userscript.js - url: ' + url);
                
                // Get the availabilty by calling the xmlHttpRequest.
                // see @ http://userscripts.org/topics/138
                getAvailability(url,tdAvail,trElement,hdnTrnNo,isSleeperAvailable);
        }

}

function getAvailability(url,tdAvail,trElement,hdnTrnNo,isSleeperAvailable){
        
        if(isSleeperAvailable == true){
        
                GM_xmlhttpRequest({method:"GET",
                                url:url,
                                onload:function(result) {
                                        try {
                                                
                                                // logging url
                                                // GM_log('irctc: inside xmlHttpRequest; url is: ' + url);
                                                
                                                // logging responseText
                                                // GM_log('irctc.userscript.js - responseText :' + result.responseText);
                                                
                                                var respText = result.responseText;
                                                var statusAvailabilty;
                                                if(respText.match('@Transactions Suspended')){
                                                        statusAvailabilty ='Transactions Suspended';
                                                        
                                                }else if(respText.match('ProblemError')){
                                                        statusAvailabilty ='Error';
                                                
                                                }else{
                                                        var arrResp = respText.split('|');                                      
                                                        statusAvailabilty = arrResp[0].split('&')[1];
                                                }
                                                // GM_log('irctc.userscript.js - statusAvailabilty for trainNo: ' + hdnTrnNo + ' is: ' + statusAvailabilty);
                                                
                                                // Create the text inside the td and append to the TR
                                                tdAvail.appendChild(document.createTextNode(statusAvailabilty));
                                                trElement.appendChild(tdAvail);
                                                
                                        } catch (e) {
                                                // GM_log('Unable to get Availabilty; exception: ' + e);
                                                tdAvail.appendChild(document.createTextNode('Try Again!'));
                                                trElement.appendChild(tdAvail);
                                        }
                                }
                });
        }else{
                
                tdAvail.appendChild(document.createTextNode('No SL Class!'));
                trElement.appendChild(tdAvail);
        }

}

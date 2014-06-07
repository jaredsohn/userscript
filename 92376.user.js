// ==UserScript==
// @name           showavailablity
// @namespace      http://vally.in
// @description    Shows availability right alongside list of trains.
// @include        http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do*
// @include        http://irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do*
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do*
// @include        https://irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do*
// ==/UserScript==

var failureText = "<a href='#'><font color='red'>Query Failed</font></a>";
var retryingText = "Retrying..";
var loadingText = "Loading..";

// -- Site specific code -- Things that could break if the site changes
var availabilitySerialNumber1XPathExpression = ".//tr/td[normalize-space(text()) = '1']";
var trainNumbersXPathExpression = "//DIV[@id='can0']";
var errorTextXPathExpression = ".//TR/TD[@class='errorcol']";

function createAvailabilityTDHeader(parentRow)
{
	//--------------------for create a table column-----------------------------------------------------//
   var tdHeader = document.createElement('td');
   tdHeader.innerHTML = "Availability";
   tdHeader.className = 'boldEleven';
   tdHeader.height = '23';
    var prevTD = getTDBeforeAvailabilityTD(parentRow);
    parentRow.insertBefore(tdHeader, prevTD);
}
function createAvailabilityTD(parentRow)
{
   var td = document.createElement('td');
   var prevTD = getTDBeforeAvailabilityTD(parentRow);
   parentRow.insertBefore(td, prevTD);
}
// Header row is the first row in the availability table.	
function getAvailabilityHeaderTR(rowInAvailabilityTable)
{
   return rowInAvailabilityTable.parentNode.rows[0];
}

// Insert availability column before 4th column.
function getTDBeforeAvailabilityTD(row)
{
   return row.cells[4];
}

// After insert, availability IS the 4th column.
function getAvailabilityTD(row)
{
   return row.cells[4];
}

function getAvailabilityURL(session, engine, trainNumber, day, month, year, classcode, fromStation, toStation, quota)
{
   return "http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/enquiry/avail.do?BV_SessionID=" + session + "&BV_EngineID=" + engine + "&trainToStation=true&availabilityPop=true&hdnTrnNo="
      + trainNumber + "&hdnDay=" + day + "&hdnMonth=" + month + "&hdnYear=" + year + "&hdnClasscode=" + classcode + "&fromStation="
      + fromStation + "&toStation=" + toStation + "&hdnQuota=" + quota;
}

function getFormattedAvailabilityHTML(text)
{
   return "<div align='center' class='boldFourteen'>" + text + "</div>"      
}

// In a row, the first cell is the serial number and the third cell has the availability text.
function getAvailabilityTextFromSerialNumberTD(td)
{
   return td.parentNode.cells[2].innerHTML; // move to parent row and then to the third cell
}

// DIV is contained within TD, which is contained within TR
function getTrainDetailsTRFromTrainNumberDIV(trainNumberDIV)
{
   return trainNumberDIV.parentNode.parentNode;
}

function addAvailabilityTDHeader()
{
    var firstRow = getAvailabilityHeaderTR(trainDetailsRows[0]);
    createAvailabilityTDHeader(firstRow);
}

// -- Generic code --

function getValue(tag, name)
{
   return getItem(tag, name).value;
}

function getItem(tag, name)
{
   return getItemWithParent(tag, name, document);
}

function getItemWithParent(tag, name, parent)
{
   var str = ".//" + tag + "[@name='" + name + "']";
   var list = document.evaluate(str, parent, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   return list.snapshotItem(0);   
}

function isRetryableFailure(responseDetails)
{
   return responseDetails.status != 200;
}

function getAvailability(target, targetUrl)
{  
   target.innerHTML = getFormattedAvailabilityHTML(loadingText);
   GM_xmlhttpRequest({
      method: 'GET',
      url: targetUrl,      
      
      onload: function(responseDetails) 
      {
         var success = false;
         var placeholder = document.createElement('div');
         //placeholder.style.display = 'none';
         document.body.insertBefore(placeholder, null);

         if ( responseDetails.status == 200 )
         {
             placeholder.innerHTML = responseDetails.responseText;
             success = tryShowAvailability(placeholder, target);
         }

         if (!success)
         {
            if (isRetryableFailure(responseDetails))
            {
               target.innerHTML = getFormattedAvailabilityHTML(retryingText);
               getAvailability(target, targeturl);
            }
            else
            {
                showErrorText(placeholder, target);
            }

         }
      }
   });
}

function showErrorText(placeholder, target)
{ 
   var errorTextResult = document.evaluate(errorTextXPathExpression, placeholder, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   var errorTextTag = errorTextResult.snapshotItem(0);

   target.innerHTML = getFormattedAvailabilityHTML(failureText);
   if (errorTextTag)
   {
      var errorText = errorTextTag.innerHTML;
      target.addEventListener('click', function() { alert(errorText); }, false);
   }
}

function tryShowAvailability(placeholder, target)
{
   var tdResult = document.evaluate(availabilitySerialNumber1XPathExpression, placeholder, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   var td = tdResult.snapshotItem(0);
   if (td)
   {
      var text = getAvailabilityTextFromSerialNumberTD(td);
      target.innerHTML = getFormattedAvailabilityHTML(text);
      return true;
   }
   return false;
}
function loadTrainNumberRowsAndTrainNumbers()
{
   trainDetailsRows = new Array(1);

   var allTrainNumbersResult = document.evaluate(trainNumbersXPathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

   for (var i = 0; i < allTrainNumbersResult.snapshotLength; i++) 
   {
      var currentDIV = allTrainNumbersResult.snapshotItem(i);
      trainDetailsRows[i] = getTrainDetailsTRFromTrainNumberDIV(currentDIV);
   }
}

function createAvailabilityCells()
{
   for (var i = 0; i<trainDetailsRows.length; ++i)
   {
       var tr = trainDetailsRows[i];
       createAvailabilityTD(tr);
   }
}

function triggerAvailabilityRequests()
{
   for (var i = 0; i<trainDetailsRows.length; ++i)
   {
      var tr = trainDetailsRows[i];
      // Get the train no radio button and simulate click - this fills boardPoint
      // and destStation form values.
      var trainRadioButton = getItemWithParent('input', 'radioTrnNo', tr);
      trainRadioButton.click();
      var trainNo = getValue('input', 'trainNo');
      var from = getValue('input', 'boardPoint');
      var to = getValue('input', 'destStation');

      // Hack replicated from openAvailabilityWindow.
      if(from.indexOf("(")>=0)
         from = from.substring(from.indexOf("(")+1,from.indexOf(")"));
      if(to.indexOf("(")>=0)
         to = to.substring(to.indexOf("(")+1,to.indexOf(")"));

      getAvailability(getAvailabilityTD(tr), getAvailabilityURL(session, engine, trainNo, day, month, year, classcode, from, to, quota));

   }
}

function modifyAvailabilityTable()
{
   addAvailabilityTDHeader();   
   createAvailabilityCells();
}

// -- Triggering script code --

var session = getValue('input', 'BV_SessionID');
var engine = getValue('input', 'BV_EngineID');
var day = getValue('select', 'day');
var month = getValue('select', 'month');
var year = getValue('select', 'year');
var classcode = getValue('select', 'classCode');
var quota = getValue('input', 'quota');

var trainDetailsRows;

loadTrainNumberRowsAndTrainNumbers();
modifyAvailabilityTable();
triggerAvailabilityRequests();
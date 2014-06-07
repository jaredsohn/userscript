// ==UserScript==
// @name           Pending Earnings
// @namespace      http://bluesky.software.com/turkscripts
// @description    Adds a pending earnings item to mturk dashboard
// @include        https://www.mturk.com/mturk/dashboard
// ==/UserScript==

//
// We are on the dashboard page. We want to go to the status_detail
// pages for the last 30 days and total the dollar amount of the
// HITs still pending and add it to the dashboard page like the today's projected earnings script
// does. We will use the XMLHttpRequest Object to get the pages and then
// process them one by one until we have done them all. An enhancement I just
// thought of is that we don't have to do all 30 days if we read the number of
// HITs pending and just process dates that have pending HITs.
//
// This will only be run if someone clicks on it as it is going to be really slow if they
// have a lot of HITs pending from a long time ago.
//
//
// 08/22/2011 Coding started
//
// 08/23/2011 Beta version ready but I only have 1 HIT pending so no way to do
//            much testing, will have to do some turking and then test
//
// 08/25/2011 There is the potential for a race condition in that while I'm
//            added up pending HITs to get to the total that was present on the
//            status page will have been approved before I've added them all up.
//            So I need to add some new logic otherwise it would be possible to
//            end up in an infinite loop trying to add in some pending HITs that
//            are no longer pending. I'm going to implement this by keeping track
//            of the number of HITs submitted and when reading detailed status
//            pages abort trying to add up x pending HITs if we exceed the number
//            of HITs submitted for that day.
//
// 08/30/2011 Not working for some so changed the way getNumberOfPending() works
//            and added an error message alert if this function can't find the
//            number of pending HITs
//
// 08/31/2011 Made a test version, the problem is located in  
//            process_status_page() 
//
// 09/01/2011 Found the problem: If there was no link in a row then trying to
//            to work on links[0] that doesn't exist would cause the script to blow
//            up, I put in a check that links has a length before trying to work with
//            it.
//
// 10/03/2011 Modified to save a new cookie which is a history of the previous time we
//            summed up the pendingEarnings and we use that to skip processing dates where
//            the pendingHits hasn't changed since the last time we were invoked. This should
//            minimize the times the page request exceeded error is encountered.
//
// 10/29/2011 Changed the expiration date of the pendingEarnings cookie to 30 days.
//
// 11/03/2011 Moved the setting of the pendingEarnings cookie outside the if loop to fix the
//            change of 10/29.
//
// The normal functioning of the script is to just get the cookie
// of PendingEarnings and display the link and total.
//
// If we are clicked on then processPendingHits is called and we will
// add up the pending HITs. Note there could still be no pending HITs
// the user just clicked on it anyway so we can't ignore the case of
// zero HITs to process. The total is saved in a cookie so it is
// available for all the times we haven't been clicked on.
//

// Insert the Pending Earnings in the dashboard.
// Copied from current_earnings script - Copyright (c) 2008, Mr. Berserk
// 
// Modified to suit
//

var allTds, thisTd;
allTds = document.getElementsByTagName('td');
for (var i = 0; i < allTds.length; i++)
{
   thisTd = allTds[i];
   if ( thisTd.innerHTML.match(/Total Earnings/) && thisTd.className.match(/metrics\-table\-first\-value/) )
   {
      var row = document.createElement('tr');
      row.className = "even";


      var pendingEarningsLink = document.createElement('a');
      pendingEarningsLink.href =  "https://www.mturk.com/mturk/dashboard";
      pendingEarningsLink.innerHTML = "Pending HITs";
      pendingEarningsLink.addEventListener('click',processPendingHits,false);
      var cellLeft = document.createElement('td');
      cellLeft.className = "metrics-table-first-value";
      cellLeft.appendChild(pendingEarningsLink);
      row.appendChild(cellLeft);
		 
      var cellRight = document.createElement('td');   
      if(getCookie("MturkPendingEarnings"))
      {
         var pendingEarnings = parseFloat(getCookie("MturkPendingEarnings"));
         cellRight.innerHTML = "$" + pendingEarnings.toFixed(2);
      }
      else
      {
         cellRight.innerHTML = "$?.??";
      }
      row.appendChild(cellRight);
			 
      thisTd.parentNode.parentNode.insertBefore(row,thisTd.parentNode.nextSibling);
   }
}

//
// Functions
//

//
// User has clicked on us, so add up all the pending HITs. The first thing
// we do is get a copy of the status page, this contains the summary of the
// past 30 days. We scan through this looking at the Pending HITs column and
// saving the dates that have pending HITs which we will subsequently use to
// access the appropriate detailed status pages :)
//

function processPendingHits()
{
   var pendingEarnings = 0;            // Dollar amount of pendingHITs
   var pendingHits = getNumberOfPending();
   if(pendingHits>0)   // only process pages if there is at least one pending HIT
   {
      var oldDatesToDo = new Array();           // this array will hold the history of the last
                                                // time we were clicked
      var datesToDo = process_status_page();    // get dates that have pending HITs

      //
      // Ok we have a list of dates to process and the number of pending HITS
      // for that date is appended to the encoded date. To make the script faster and
      // more efficient we save the array datesToDo as a cookie and compare the new values
      // just retrieved from the status page to skip processing those dates where the number of
      // pending HITs hasn't changed since the last time we were called. The one exception is today
      // where the pending HIT count might not of changed but the hits pending might have since more
      // hits could of been added. To catch this we also check the submitted HITs to the old submitted HITs
      //

      if(getCookie("MturkPendingDates"))   // retrieve history if it exists
      {
         oldDatesToDo = getCookie("MturkPendingDates").split(",");        
      }

      //
      // Now we want to compare the old array with the new array and only process those dates where we don't have
      // the subtotal in the old array. But if the date is today, the pending HIT count could be the same but
      // but they could be different HITs because pending HITs could be added and subtracted so we have to check the
      // submitted HITs to catch this condition.
      //

      var subtotal = 0;                   
      for(n = 0; n < datesToDo.length; n++)
      {
         var dateProcessed = 0;
         var encodedDate = datesToDo[n].substr(0,8);
         var index1 = datesToDo[n].indexOf('$');
         var pendingHits = datesToDo[n].substring(8,index1); // the next part of the string up to the $
                                                            // is the pending Hits total
         var submittedHits = datesToDo[n].substring(index1+1);    

         for(var m = 0; m < oldDatesToDo.length; m++)            // check if we have this date in the history
         {
            var old_encodedDate = oldDatesToDo[m].substr(0,8);
            if(encodedDate == old_encodedDate)
            {
               index1 = oldDatesToDo[m].indexOf('$');
               var old_pendingHits = oldDatesToDo[m].substring(8,index1); // the next part of the string up to the $
                                                                          // is the pending Hits total
               var index2 = oldDatesToDo[m].indexOf('%');                 // the next part of the string up to the %
                                                                          //  is the submitted HITs total
               var old_submittedHits = oldDatesToDo[m].substring(index1+1,index2);

               var old_subtotal = oldDatesToDo[m].substring(index2+1);   // the rest of the string is the subtotal  

               // So since we have this date in the history we check if the pending HITs and the submitted HITs are the
               // same and if they are we don't bother to process this date by NOT adding it to the processDates array 
               // and we add the existing subtotal for that date into the pendingHITs dollar amount right now.

               if (submittedHits == old_submittedHits && pendingHits == old_pendingHits) 
               {
                  
                  pendingEarnings += parseFloat(old_subtotal);           // use the old value since it is still good
                  datesToDo[n] = datesToDo[n] + '%' + old_subtotal;      // add old subtotal into the new array
                  dateProcessed = 1;
                  break;                                                 // found the date so exit loop         
               }                  
            }   
         }  
         if(dateProcessed < 1)                                           // if the date wasn't in the history or the
         {                                                               // pending HITs has changed process the date
            subtotal = process_detailed_status_pages(encodedDate, pendingHits, submittedHits);
            datesToDo[n] = datesToDo[n] + '%' + subtotal;
            pendingEarnings += subtotal;
         }
      }      
      // now overwrite the oldDatesToDo with the new one if the cookie already existed else create the cookie
      setCookie("MturkPendingDates",datesToDo.join(","),1);   // Save the array datesToDo as a cookie by converting 
                                                              //  it to a string first

   }
      setCookie("MturkPendingEarnings",pendingEarnings,30);    // save total in cookie - move out here so we set it
                                                               // to zero if no HITs pending
}


//
// Get total pending HITs
//
// As of now there are 8 'metrics-table's on the dashboard
// but the last two are subsets of table 6 which has 26 td's
// but again we have subsets within subsets so that was the confusion
// So when you get the td's for table 5 you are also getting the td's
// for table 7 which is what we want. The confusion is when I try to 
// match on innerHTML for ... Pending, I get a match for the superset
// td's not on the individual td. So td 14 contains ... Pending but it
// also contains all the other td's that are part of the second column
// 
// To handle the recursive tables I'm now checking that the td is 
// numeric, if it isn't we continue to scan tds.
//
function getNumberOfPending()
{
   var tables = document.getElementsByClassName('metrics-table');
   for (var m = 0; m <tables.length; m++)
   {
      var table_data = tables[m].getElementsByTagName('td');  // 26 data
      for (var n = 0; n <table_data.length; n++)
      {
         if(table_data[n].innerHTML.match('... Pending'))
         {                                                
            if(isNumber(table_data[n+1].innerHTML))
            {
               return table_data[n+1].innerHTML;
            }        
         }
      }
   }
   alert("Script Bug: Can't find how many pending HITs you have");
   return -1;           // didn't find it - This is a bug exit! 
}

//
// Process the status page by getting all those dates that have pending HITs
//
// The first status page contains 30 days worth of HITs so there is no need to 
// check the second page as there should be no pending HITS on that page
//
// Note: If the person is a total newbie then maybe the status page doesn't even
// have 30 days worth of data so don't hard code the 30 bozo :)
//
//
// We need to process the DOM in a recursive manner so that I can associate the
// correct date with the correct pending HIT count. The days listed aren't necessarly 
// in sequential order if he took some days off there will be missing days.
//
// This main function just grabs the status page and then calls the function
// pending_dates to do the actual work
//

function process_status_page()
{
   // use XMLHttpRequest to fetch the entire page, use async mode for now because I understand it
   var page = getHTTPObject();
   page.open("GET",'https://www.mturk.com/mturk/status',false);      
   page.send(null);
   return pending_dates(page.responseText);
}

//
// First of all we have to turn the grabbed status page back into a DOM
// object so we can process it with javascript. We do this with the 
// create div trick.
//
// Now get all the tables
// Some of these tables won't be what we are looking for but there is no
// way to distingush at the table level, we have to look at the table data to
// know if this table is of interest to us.
//
// There is a problem that the table we are interested in is embedded in another
// table so we are processing the table we want twice, how to avoid this?
//

function pending_dates(page_text)
{
   var page_html = document.createElement('div');
   page_html.innerHTML = page_text;

   var datesIndex = 0;
   var activeDates = new Array();
   var tableProcessed = 0;

   var tables = page_html.getElementsByTagName('table');
   for (var m = 0; m < tables.length; m++) // process each table
   {
      var table_rows = tables[m].getElementsByTagName('tr');  
      for (var n = 0; n < table_rows.length; n++) // process each row
      {
         //
         // if we are in a row we are interested in, its first td will contain a link
         // to a detailed status page, we look for a match on that link
         //
         var links = table_rows[n].getElementsByTagName('a');
         if(links.length>0 && links[0].href.substr(0,40)=='https://www.mturk.com/mturk/statusdetail')
         {
            //
            // OK we found an interesting row, now does this date have any pending HITs?
            //
            tableProcessed = 1; // Indicate that we have processed the table
            var table_data = table_rows[n].getElementsByClassName('statusPendingColumnValue');
            var pendingHits = table_data[0].innerHTML;  // This is a number, if greater than zero we have pending HITs
            table_data = table_rows[n].getElementsByClassName('statusSubmittedColumnValue');
            var submittedHits = table_data[0].innerHTML; // Number of HITs submitted for this date
            if(pendingHits > 0) //then save the date in the activeDates array
            {
               var encodedDate = links[0].href.substr(links[0].href.search(/Date=/)+5,8);
               // as a hack I'm appending the number of pending HITs to the encoded date so we
               // can return both pieces of data through the one dimensional array
               // now I want to add in the number of HITs submitted also but I have to be able
               // to parse the string later to distingush the two numbers
               activeDates[datesIndex++] = encodedDate + pendingHits + '$' + submittedHits;        
            }   
         }
      }
      if(tableProcessed>0) return activeDates;  // bail if we already processed the table, don't do it again!
   }   
   alert("Script Bug: Couldn't find any dates to process");
}

//
// Process the detailed status pages associated with this date until we have
// found all the pending HITs for this date
//

function process_detailed_status_pages(encodedDate, pendingHits, submittedHits)
{
   var subtotal = 0;
   var pagenum = 1;          // detailed status page number, we start with page 1
   while (pendingHits > 0)
   {
      // use XMLHttpRequest to fetch the entire page, use async mode for now because I understand it
      var page = getHTTPObject();
      link = "https://www.mturk.com/mturk/statusdetail?sortType=All&pageNumber=" + pagenum + "&encodedDate=" + encodedDate; 
      page.open("GET",link,false);      
      page.send(null);
      var page_html = document.createElement('div');
      page_html.innerHTML = page.responseText;
      var amounts = page_html.getElementsByClassName('statusdetailAmountColumnValue');
      var statuses = page_html.getElementsByClassName('statusdetailStatusColumnValue');
      for(var k = 0; k < amounts.length; k++)
      {
         if(statuses[k].innerHTML == 'Pending Approval') // || statuses[k].innerHTML == 'Approved - Pending Payment'
         {
            pendingHits--; 
            index = amounts[k].innerHTML.indexOf('$');
            subtotal += parseFloat(amounts[k].innerHTML.substring(index+1));
         }
      }
      submittedHits -= 25;                       // 25 HITs to a page
      if (submittedHits <= 0) return subtotal;   // We have done all the HITs for this date
                                                 // But the pendingHits count isn't zero 
                                                 // So we must of encountered a race condition
                                                 // exit with the subtotal    
      pagenum++; // go do another page if necessary
   }
   return subtotal; // This is the dollar amount of pending HITs for this date
}

//
// XMLHttpRequest wrapper from web
//

function getHTTPObject()  
{ 
   if (typeof XMLHttpRequest != 'undefined')
   { 
      return new XMLHttpRequest();
   }
   try
   { 
      return new ActiveXObject("Msxml2.XMLHTTP");
   } 
   catch (e) 
   { 
      try
      { 
         return new ActiveXObject("Microsoft.XMLHTTP"); 
      } 
      catch (e) {} 
   } 
   return false;
}

//
// Is the variable a number or a string that parses to a number?
//

function isNumber (o)
{
   return ! isNaN(o-0);
}


//
//  Cookie functions copied from http://www.w3schools.com/JS/js_cookies.asp
//

function setCookie(cookie_name,value,exdays)
{
   var exdate = new Date(); 
   exdate.setDate(exdate.getDate() + exdays);
   var cookie_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
   document.cookie = cookie_name + "=" + cookie_value;
}


function getCookie(cookie_name)
{
   var i,x,y
   var ARRcookies = document.cookie.split(";");
   for (i=0; i<ARRcookies.length; i++)
   {
      x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x = x.replace(/^\s+|\s+$/g,"");
      if (x == cookie_name)
      {
         return unescape(y);
      }
   }
}


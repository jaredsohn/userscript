// ==UserScript==
// @name           Today's Projected Earnings
// @namespace      http://bluesky.software.com/turkscripts
// @description    Adds a projected earnings item to mturk dashboard
// @include        https://www.mturk.com/mturk/dashboard
// ==/UserScript==

//
// We are on the dashboard page. We want to go to the status_detail
// pages for today and add up the amount for all the hits done so far today
// and paste that into the dashboard page like the current earnings script
// does. We will use the XMLHttpRequest Object to get the pages and then
// process them one by one until we have done them all.
//
// But first since we are on the dashboard page when we get invoked we search
// for the Today link to get the encoded date and the number of hits submitted
// so we know how many detailed status pages we have to fetch and how to encode
// the links with today's date.
//
// 01/25/2011 Beta Version ready
//
// 01/31/2011 
// Modified to save the subtotal calculated so far to avoid having to fetch 
// pages that have already been totalled. This is done by saving the subtotal
// for complete pages in a cookie. Two auxillary cookies are needed also, one
// for today's encoded date, and one for complete pages subtotalled so far.
// Also optimized by changing the logic of the first if statement.
//
// 02/01/2011
// Fixed bug that occurred when you had no partial page and you ran the script
// more than once, it would show zero earnings. Removed the CompletedSubtotal
// var in the process of fixing that. Got rid of do it yourself
// getElementsByClassName.
//
// 06/23/2011
// Fixed to handle new html that puts a <span class > around the reward amount
//
// 07/12/2011
// Changed to make it clickable to clear the cookies to start the subtotalling over
// to account for out of sequence completion of HITs and for rejections that happen after
// a page has been subtotalled. Basically this just makes it add everything up from scratch
// to account for changes that have occurred.
//
// 07/12/2011
// Changed .onclick to .addEventListener so that the script works in FF also.


var TodaysEarnings = 0;
var NumberOfPages = 0;
var todays_values = get_todays_data();

if(todays_values.length != 0)
{
   // Extract Today's Date from link

   TodaysDate = todays_values[0].innerHTML;
   TodaysDate = TodaysDate.substr(TodaysDate.search(/Date=/)+5,8);

   // Check whether the date has rolled over since the last time we were called
   
   if(TodaysDate != getCookie("MturkDate"))
   {
      setCookie("MturkDate",TodaysDate,1);
      setCookie("MturkSubtotal",0,1);
      setCookie("MturkPagesDone",0,1);
   }

   // Calculate Number of detailed status pages we have to add up
   // based on the fact there is a 25 hits/page limit.
   // We now only have to add in pages not already totalled and saved
   // in the MturkSubtotal cookie

   NumberOfPages = Math.ceil(todays_values[1].innerHTML/25);
   NumberOfCompletePages = Math.floor(todays_values[1].innerHTML/25);
   PagesDone = parseFloat(getCookie("MturkPagesDone"));
   TodaysEarnings = parseFloat(getCookie("MturkSubtotal"));

   if(NumberOfCompletePages > PagesDone)
   { 
      for(page = PagesDone + 1; page <= NumberOfCompletePages; page++) // process each completed detailed status page one by one
      {
         detailed_status_page_link = "https://www.mturk.com/mturk/statusdetail?sortType=All&pageNumber=" + page + "&encodedDate=" + TodaysDate;            
         TodaysEarnings += process_page(detailed_status_page_link);       
      }
      setCookie("MturkSubtotal",TodaysEarnings,1);      
      setCookie("MturkPagesDone",NumberOfCompletePages,1);
   }
   if(NumberOfPages > NumberOfCompletePages)   // Handle partial pages
   {
      detailed_status_page_link = "https://www.mturk.com/mturk/statusdetail?sortType=All&pageNumber=" + NumberOfPages + "&encodedDate=" + TodaysDate;            
      TodaysEarnings += process_page(detailed_status_page_link);       
   }            
}

//
// Insert the Projected Earnings in the dashboard.
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


      var projectedEarningsLink = document.createElement('a');
      projectedEarningsLink.href =  "https://www.mturk.com/mturk/dashboard";
      projectedEarningsLink.innerHTML = "Today's Projected Earnings";
      projectedEarningsLink.addEventListener('click',clearCookies,false);

      var cellLeft = document.createElement('td');
      cellLeft.className = "metrics-table-first-value";
      cellLeft.appendChild(projectedEarningsLink);
      row.appendChild(cellLeft);
			 
      var cellRight = document.createElement('td');      
      cellRight.innerHTML = "$" + TodaysEarnings.toFixed(2);
      row.appendChild(cellRight);
			 
      thisTd.parentNode.parentNode.insertBefore(row,thisTd.parentNode.nextSibling);
   }
}

//
// Functions
//

//
// This will grab the data from the table for today. If today doesn't exist yet
// we return an empty array so things still work.
//

function get_todays_data()
{
   var tables = document.getElementsByClassName('metrics-table');
   for (var m = 0; m < tables.length; m++)
   {
      var table_rows = tables[m].getElementsByTagName('tr');
      for (var n = 0; n < table_rows.length; n++)
      {
         var table_data = table_rows[n].getElementsByTagName('td');
         status_link = table_rows[n].getElementsByTagName('a');
         if(status_link[0])
         {
            if(table_data[0].innerHTML.match('Today'))
            {
               return table_data;
            }
         }
      }
   }
   no_today = [];
   return no_today;  // If no Today found we have to return something else it dies silently
}


//
// Process a detailed status page by added up the value of all the hits
//

function process_page(link)
{
   // use XMLHttpRequest to fetch the entire page, use async mode for now because I understand it
   var page = getHTTPObject();
   page.open("GET",link,false);      
   page.send(null);
   return earnings_subtotal(page.responseText); 
}


//
// Add up all the hit values on this detailed status page
// For the code to work we have to turn the responseText back
// into a DOM object so we can get the values using the 
// getElementsByClassName function. We use the create div trick.
//
// Modified to not add in those hits that have already been rejected
//

function earnings_subtotal(page_text)
{
   var sub_total= 0;
   var index = 0;
   var page_html = document.createElement('div');
   page_html.innerHTML = page_text;

   var amounts = page_html.getElementsByClassName('statusdetailAmountColumnValue');
   var statuses = page_html.getElementsByClassName('statusdetailStatusColumnValue');

   for(var k = 0; k < amounts.length; k++)
   {
      if(statuses[k].innerHTML != 'Rejected')
      {
         index = amounts[k].innerHTML.indexOf('$');
         sub_total = sub_total + parseFloat(amounts[k].innerHTML.substring(index+1));
      }
   }
   return sub_total;
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
//  Cookie functions copied from http://www.w3schools.com/JS/js_cookies.asp
//

function setCookie(c_name,value,exdays)
{
   var exdate=new Date(); 
   exdate.setDate(exdate.getDate() + exdays);
   var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
   document.cookie=c_name + "=" + c_value;
}


function getCookie(c_name)
{
   var i,x,y,ARRcookies=document.cookie.split(";");
   for (i=0;i<ARRcookies.length;i++)
   {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name)
      {
         return unescape(y);
      }
   }
}

function clearCookies()
{
   setCookie("MturkSubtotal",0,1);
   setCookie("MturkPagesDone",0,1);
   return true;
}
   

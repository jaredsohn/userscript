// ==UserScript==
// @name        mmmturkeybacon Today's Projected Earnings
// @author      mmmturkeybacon
// @description Shows the day's total earnings assuming all HITs that are
//              pending approval are approved. This script was written to
//              prevent miscalculations caused by maximum page rate
//              exceeded errors that plagued the original version.
//              This script is based off the work by noaccount.
//              noaccount version: http://userscripts.org/scripts/show/150355
// @namespace   http://userscripts.org/users/523367
// @match       https://www.mturk.com/mturk/dashboard
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/309745.user.js
// @updateURL   http://userscripts.org/scripts/source/309745.meta.js
// @version     1.1
// @grant       none
// ==/UserScript==

// TODO:
// keep rejected total and scrape it every time (sort by rejected)
// add rejected hits to subtotal and then subtract total rejected sum after totaling
// this assumes the number of rejected hits is small

var STATUSDETAIL_DELAY = 500;
var MPRE_DELAY = 2000;

var STATUSDETAIL_BASE_URL = '/mturk/statusdetail?encodedDate=';

var page_total = 0;
var subtotal = 0;

var day_name = $("a[href^='"+STATUSDETAIL_BASE_URL+"']:first").text();
var earnings_link = document.createElement("A");
var earnings_field = document.createElement("TD");      

var page_num = 0;
var date_header = '';

function set_progress_report(text)
{
    earnings_link.innerHTML = text;
    //earnings_field.innerHTML = '$' + (subtotal/100).toFixed(2);
}

function scrape($src)
{
    var $reward = $src.find("td[class='statusdetailAmountColumnValue']");
    var $approval = $src.find("td[class='statusdetailStatusColumnValue']");
    page_total = 0;

    for (var j = 0; j < $reward.length; j++)
    {
        // I"m worried if I use parseFloat errors will accumulate because floats are inexact
        var reward = parseInt($reward.eq(j).text().replace(/[^0-9]/g,''), 10);
        var approval = $approval.eq(j).text();

        if (approval != 'Rejected')
        {
            page_total += reward;
        }                
    }
}

function statusdetail_loop(next_URL)
{
    if (next_URL.length != 0)
    {
        $.get(next_URL, function(data)
        {
            var $src = $(data);
            var maxpagerate = $src.find("td[class='error_title']:contains('You have exceeded the maximum allowed page request rate for this website.')");
            if (maxpagerate.length == 0)
            {
                subtotal += page_total;
                date_header = $src.find("td[class='white_text_14_bold']:contains('HITs You Worked On For')").clone().children().remove().end().text().trim();
                set_progress_report('Processing ' + date_header + ' page ' + page_num);
                page_num++;
                console.log(earnings_link.innerHTML);
                scrape($src);

                $next_URL = $src.find("a[href^='/mturk/statusdetail']:contains('Next')");
                next_URL = ($next_URL.length != 0) ? $next_URL.attr('href') : '';

                // DEBUGGING CODE
                //if (page_num == 20)
                //{
                //    next_URL = '';
                //}
                setTimeout(function(){statusdetail_loop(next_URL);}, STATUSDETAIL_DELAY);
            }
            else
            {
                setTimeout(function(){statusdetail_loop(next_URL);}, MPRE_DELAY);
            }
        });
    }
    else
    {
        // since the last page might not be a full page and it will be scraped
        // again don"t add it to the subtotal.
        // subtotal is the sum of all rewards on all full pages
        setCookie('MMMturkSubtotal', subtotal, 1);
        setCookie('MMMturkLastPage', page_num-1, 1);

        earnings_link.innerHTML = 'Projected Earnings for '+day_name;
        earnings_field.innerHTML = '$' + ((subtotal+page_total)/100).toFixed(2);
    }
}


function start_running()
{
    var total_earnings_cell = $('td[class="metrics-table-first-value"]:contains("Total Earnings")');

    var new_row = document.createElement("tr");
    new_row.className = 'even';
    
    earnings_link.title = 'Click to recalculate starting from page 1.';
    earnings_link.href =  'https://www.mturk.com/mturk/dashboard';
    earnings_link.addEventListener("click", clearCookies, false);
    
    var earnings_link_cell = document.createElement("td");
    earnings_link_cell.className = 'metrics-table-first-value';
    earnings_link_cell.appendChild(earnings_link);

    new_row.appendChild(earnings_link_cell);
    new_row.appendChild(earnings_field);
    total_earnings_cell.parent().parent().append(new_row);

    if (day_name == 'Today')
    {
        // DEBUGGING CODE
        //clearCookies();
        var last_date_worked = $("a[href^='"+STATUSDETAIL_BASE_URL+"']:first").attr('href').replace(STATUSDETAIL_BASE_URL, '');
        if(last_date_worked != getCookie('MMMturkDate'))
        {
           setCookie('MMMturkDate', last_date_worked, 1);
           setCookie('MMMturkSubtotal', 0, 1);
           setCookie('MMMturkLastPage', 1, 1);
        }
    
        subtotal = parseFloat(getCookie('MMMturkSubtotal'));
        page_num = parseFloat(getCookie('MMMturkLastPage'));

        earnings_link.innerHTML = 'Projected Earnings for '+day_name;
        earnings_field.innerHTML = '$?.??';

        var date_URLs = STATUSDETAIL_BASE_URL + last_date_worked + '&sortType=All&pageNumber=' + page_num;
        statusdetail_loop(date_URLs);
    }
    else
    {
        earnings_link.innerHTML = 'Projected Earnings for Today';
        earnings_field.innerHTML = '$0.00';
    }
}


//
//  Cookie functions copied from http://www.w3schools.com/JS/js_cookies.asp
//

function setCookie(c_name,value,exdays)
{
   var exdate=new Date(); 
   exdate.setDate(exdate.getDate() + exdays);
   var c_value=escape(value) + ((exdays==null) ? '' : '; expires='+exdate.toUTCString());
   document.cookie=c_name + '=' + c_value;
}


function getCookie(c_name)
{
   var i,x,y,ARRcookies=document.cookie.split(';');
   for (i=0;i<ARRcookies.length;i++)
   {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf('='));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf('=')+1);
      x=x.replace(/^\s+|\s+$/g,'');
      if (x==c_name)
      {
         return unescape(y);
      }
   }
}

function clearCookies()
{
   setCookie('MMMturkSubtotal',0,1);
   setCookie('MMMturkLastPage',1,1);
   return true;
}

start_running();

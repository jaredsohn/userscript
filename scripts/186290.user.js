// ==UserScript==
// @name        mmmturkeybacon Export Mturk History
// @author      mmmturkeybacon
// @description Exports Mturk history to tab separated values so you can easily save the HITs you've worked on in a spreadsheet.
// @namespace   http://userscripts.org/users/523367
// @include     https://www.mturk.com/mturk/status
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/186290.user.js
// @updateURL   http://userscripts.org/scripts/source/186290.meta.js
// @version     1.1
// @grant       none
// ==/UserScript==

var BACKGROUND_COLOR = "#FFFFFF";
var DATE_LIST_DELAY = 500;
var STATUSDETAIL_DELAY = 500;
var MPRE_DELAY = 2000;

var control_panel_HTML = '<div id="control_panel" style="margin: 0 auto 0 auto;' +
                         'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
                         'background-color: ' + BACKGROUND_COLOR + ';"></div>';

$('body').prepend(control_panel_HTML);
var control_panel = document.getElementById("control_panel");
var date_input = document.createElement("INPUT");
var big_red_button = document.createElement("BUTTON");
var progress_report = document.createTextNode("Stopped");
var p = document.createElement("P");
var text_area = document.createElement("TEXTAREA");

big_red_button.textContent = "Show Interface";
big_red_button.onclick =  function(){show_interface();};
control_panel.appendChild(big_red_button);

var global_run = false;
var statusdetail_loop_finished = false;
var page_num = 0;
var date_header = "";
var history = {};

function set_progress_report(text, force)
{
    if (global_run == true || force == true)
    {
        progress_report.textContent = text;
    }
}

function last_sixty_days($date_URLs)
{
    var date_URLs = $.makeArray($date_URLs);
    var date_URL_parts = date_URLs[date_URLs.length-1].toString().split("encodedDate=");
    var last_date = date_URL_parts[1];
    var month = last_date.substring(0,2);
    var day = parseInt(last_date.substring(2,4), "10");
    var year = last_date.substring(4,8);
    var i = 1;
    while(i <= day && i <= 15)
    {
        var past_day = String("0" + (day - i)).substr(-2);
        date_URLs.push(date_URL_parts[0]+"encodedDate="+month+past_day+year);
        i++;
    }

    if (i < 16)
    {
        var $src;
        jQuery.ajax({
            url:    date_URLs[date_URLs.length-1],
            success: function(data) {$src = $(data);},
            async:   false
        });

        var maxpagerate = $src.find('td[class="error_title"]:contains("You have exceeded the maximum allowed page request rate for this website.")');
        if (maxpagerate.length == 0)
        {
            last_date = $src.find('td[class="white_text_14_bold"]:contains("HITs You Worked On For")').clone().children().remove().end().text().trim().substring(22);
            month = (month == "01") ? "12" : String("0" + (month - 1)).substr(-2);
            day = parseInt(last_date.split(",")[0].substr(-2), "10");
            year = last_date.substr(-4);
            var j = 1;
            while(i <= 15)
            {
                var past_day = String("0" + (day - j)).substr(-2);
                date_URLs.push(date_URL_parts[0]+"encodedDate="+month+past_day+year);
                i++;
                j++;
            }
        }
        else
        {
            date_URLs = $.makeArray($date_URLs); // error, output last 45 days.
        }
    }
    return date_URLs.reverse();
}

function wait_until_stopped()
{
    if (global_run == true)
    {
        if (statusdetail_loop_finished == true)
        {
            big_red_button.textContent = "Start";
            set_progress_report("Finished", false);
        }
        else
        {
            setTimeout(function(){wait_until_stopped();}, 500);
        }
    }
}

function scrape($src)
{
    var $requester = $src.find('a[href^="/mturk/contact?"]');
    var $title = $src.find('td[class="statusdetailTitleColumnValue"]');
    var $reward = $src.find('td[class="statusdetailAmountColumnValue"]');
    var $approval = $src.find('td[class="statusdetailStatusColumnValue"]');
    var $feedback = $src.find('td[class="statusdetailRequesterFeedbackColumnValue"]');

    for (var j = 0; j < $requester.length; j++)
    {
        var requester_name = $requester.eq(j).text();
        var requester_id = $requester.eq(j).attr("href").split(/requesterId=|&requesterName/)[1];
        var title = $title.eq(j).text();
        var reward = $reward.eq(j).text();
        var approval = $approval.eq(j).text();
        var feedback = $feedback.eq(j).text().trim().replace(/\r\n|\n|\r|\t/g, ' ');

        key = requester_id+title+reward;
        if (history[key] == undefined)
        {
            history[key] = {submitted:0, approved:0, pending:0, rejected:0, requester:"", title:"", reward:"", approved_feedback:{}, rejected_feedback:{}};
            history[key].requester = requester_name + " (" + requester_id + ")";
            history[key].title = title;
            history[key].reward = reward;
        }

        history[key].submitted = history[key].submitted+1;

        if (approval == "Rejected")
        {
            history[key].rejected = history[key].rejected+1;
            if (feedback != "")
            {
                if (history[key].rejected_feedback[feedback])
                {
                    history[key].rejected_feedback[feedback] = history[key].rejected_feedback[feedback]+1;
                }
                else
                {
                    history[key].rejected_feedback[feedback] = 1;
                }
            }
        }                
        else if (approval == "Pending Approval")
        {
            history[key].pending = history[key].pending+1;
        }                
        else // Approved or Paid
        {
            history[key].approved = history[key].approved+1;
            if (feedback != "")
            {
                if (history[key].approved_feedback[feedback])
                {
                    history[key].approved_feedback[feedback] = history[key].approved_feedback[feedback]+1;
                }
                else
                {
                    history[key].approved_feedback[feedback] = 1;
                }
            }
        }
    }
}

function statusdetail_loop(next_URL)
{
    if (global_run == true)
    {
        if (next_URL.length != 0)
        {
            //var $src;
            //jQuery.ajax({
            //    url:    next_URL,
            //    success: function(data) {$src = $(data);},
            //    async:   false
            //});

            //var maxpagerate = $src.find('td[class="error_title"]:contains("You have exceeded the maximum allowed page request rate for this website.")');
            //if (maxpagerate.length == 0)
            //{
            //    date_header = $src.find('td[class="white_text_14_bold"]:contains("HITs You Worked On For")').clone().children().remove().end().text().trim();
            //    page_num++;
            //    set_progress_report("Processing " + date_header + " page " + page_num, false);
            //    console.log(progress_report.textContent);
            //    scrape($src);
     
            //    $next_URL = $src.find('a[href^="/mturk/statusdetail"]:contains("Next")');
            //    next_URL = ($next_URL.length != 0) ? $next_URL.attr("href") : "";
            //    setTimeout(function(){statusdetail_loop(next_URL);}, STATUSDETAIL_DELAY);
            //}
            //else
            //{
            //    setTimeout(function(){statusdetail_loop(next_URL);}, MPRE_DELAY);
            //}

            $.get(next_URL, function(data)
            {
                var $src = $(data);
                var maxpagerate = $src.find('td[class="error_title"]:contains("You have exceeded the maximum allowed page request rate for this website.")');
                if (maxpagerate.length == 0)
                {
                    date_header = $src.find('td[class="white_text_14_bold"]:contains("HITs You Worked On For")').clone().children().remove().end().text().trim();
                    page_num++;
                    set_progress_report("Processing " + date_header + " page " + page_num, false);
                    console.log(progress_report.textContent);
                    scrape($src);
     
                    $next_URL = $src.find('a[href^="/mturk/statusdetail"]:contains("Next")');
                    next_URL = ($next_URL.length != 0) ? $next_URL.attr("href") : "";
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
            text_area.value += date_header + "\n";
            for (var key in history)
            {
                var obj = history[key];
                for (var prop in obj)
                {
                    // important check that this is objects own property 
                    // not from prototype prop inherited
                    if(obj.hasOwnProperty(prop))
                    {
                        // submitted, approved, pending, rejected, requester_name (requester_id), title, reward, approved_feedback, rejected_feedback
                        if (prop == "approved_feedback" || prop == "rejected_feedback")
                        {
                            var feedback_obj = obj[prop];
                            var fb_str = "";
                            for (var feedback in feedback_obj)
                            {
                                var count = feedback_obj[feedback];
                                if (count > 1)
                                {
                                    fb_str += "("+count+") "+feedback+" | ";
                                }
                                else
                                {
                                    fb_str += feedback+" | ";
                                }
                            }
                            text_area.value += fb_str.substring(0, fb_str.length-3)+"\t";
                        }
                        else
                        {
                            text_area.value += obj[prop]+"\t";
                        }
                    }
                }
                text_area.value += "\n";
            }
            statusdetail_loop_finished = true;
        }
    }
}

function date_list_loop(date_URLs)
{
    if (global_run == true)
    {
        if (date_URLs.length != 0)
        {
            if (statusdetail_loop_finished == true)
            {
                page_num = 0;
        
                statusdetail_loop_finished = false;
                history = {};
                var next_URL = date_URLs.pop();
                statusdetail_loop(next_URL);

                setTimeout(function(){date_list_loop(date_URLs);}, DATE_LIST_DELAY);
            }
            else
            {
                setTimeout(function(){date_list_loop(date_URLs);}, DATE_LIST_DELAY);
            }
        }
        else
        {
            wait_until_stopped();
        }
    }
}

function start_running()
{
    if (big_red_button.textContent == "Start")
    {
        global_run = true;
        statusdetail_loop_finished = true;
        big_red_button.textContent = "Stop";
        set_progress_report("Running", false);
        text_area.value = "";
        text_area.value +=  "Submitted\tApproved\tPending\tRejected\tRequester Name (Requester ID)\tTitle\tReward\tApproved Feedback\tRejected Feedback\n";

        var $date_URLs = $('a[href^="/mturk/statusdetail"]');
        var date_URLs = "";

        if (date_input.value != "")
        {
            var date_input_parts = date_input.value.split(":");
            if (date_input_parts.length == 1)
            {
                var date1_URL = $('a[href^="/mturk/statusdetail?encodedDate='+date_input.value+'"]');
                if (date_input.value.substring(0,1).toLowerCase() == "t")
                {
                    date_URLs = $.makeArray($date_URLs.eq(0)); // today
                }
                else if (date_input.value.substring(0,1).toLowerCase() == "y")
                {
                    date_URLs = $.makeArray($date_URLs.eq(1)); // yesterday
                }
                else if (date1_URL.length != 0)
                {
                    date_URLs = $.makeArray(date1_URL); // single date
                }
                else if (date_input.value == "45")
                {
                    date_URLs = $.makeArray($date_URLs).reverse(); // last 45 days
                }
                else if (date_input.value == "60")
                {
                    date_URLs = last_sixty_days($date_URLs); // last 60 days
                }
                else
                {
                    set_progress_report("Input Error!", false);
                }
            }
            else if (date_input_parts.length == 2)
            {
                var date1 = date_input_parts[0];
                var date2 = date_input_parts[1];
                var date1_URL = $('a[href^="/mturk/statusdetail?encodedDate='+date1+'"]');
                var date2_URL = $('a[href^="/mturk/statusdetail?encodedDate='+date2+'"]');
                var date1_idx = $date_URLs.index(date1_URL);
                var date2_idx = $date_URLs.index(date2_URL);
                if (date1_idx != -1 && date2_idx != -1)
                {
                    if (date1_idx > date2_idx)
                    { // ascending
                        $date_URLs = $date_URLs.slice(date2_idx, date1_idx+1);
                        date_URLs = $.makeArray($date_URLs);
                    }
                    else
                    { // descending
                        $date_URLs = $date_URLs.slice(date1_idx, date2_idx+1);
                        date_URLs = $.makeArray($date_URLs).reverse();
                    }
                }
                else
                {
                    set_progress_report("Input Error!", false);
                }
            }
        }
        else
        {
            date_URLs = $.makeArray($date_URLs.eq(0)); // today
        }
        date_list_loop(date_URLs);
    }
    else
    {
        global_run = false;
        big_red_button.textContent = "Start";
        set_progress_report("Stopped", true);
    }
}

function show_interface()
{
    control_panel.removeChild(big_red_button);

    control_panel.appendChild(document.createTextNode("Date: "));
    date_input.onkeydown = function(event){if (event.keyCode == 13){start_running();}};
    date_input.title = "Leave blank to get today\'s completed HITs\n"
                      +"Enter 'yesterday' to get yesterday\'s HITs\n"
                      +"To get a single day use mmddyyyy\n"
                      +"To get a range of days use mmddyyyy:mmddyyyy\n"
                      +"Enter 45 to get the last 45 days\n"
                      +"Enter 60 to get the last 60 days";
    control_panel.appendChild(date_input);
    
    big_red_button.textContent = "Start";
    big_red_button.onclick = function(){start_running();};
    control_panel.appendChild(big_red_button);
    
    control_panel.appendChild(document.createTextNode(" "));
    control_panel.appendChild(progress_report);
    
    control_panel.appendChild(p);
    
    text_area.style.height = 200;
    text_area.style.width = "100%";
    control_panel.appendChild(text_area);
}

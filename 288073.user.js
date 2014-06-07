// ==UserScript==
// @name        mmmturkeybacon Color Coded Search with Checkpoints
// @author      mmmturkeybacon
// @description Changes the title row of a HIT's description to match the average of
//              it's Turkopticon ratings. Changes the color of the reward amount to 
//              match the color of the Turkopticon rating for pay. Adds colored
//              checkboxes to show/hide HITs by color rating. Adds a gray checkbox
//              to show only HITs for which you are not qualified. Changes the
//              background color of the HIT title and link to white for Master's HITs.
//              Changes the color of HITs for which you are not qualified to a darker
//              gray. Changes the color of visited links to black. Automatically clicks
//              "Show all details".
//              Adds checkboxes next to HIT links so that you can set a checkpoint.
//              A checkpoint will notify you that you've already seen a HIT by
//              changing the HIT link to display the date the checkpoint was set. A
//              well-placed checkpoint is useful when browsing HITs by creation date
//              (newest first) because it will alert you that you've already seen the
//              checkpoint HIT and probably all the HITs that come after it.
//              It's best to place a checkpoint on a HIT that won't be recreated
//              because recreated HITs jump to the first page.
//              This script is not a substitute for actually reading Turkopticon reviews.
// @namespace   http://userscripts.org/users/523367
// @match       https://*.mturk.com/mturk/viewhits*
// @match       https://*.mturk.com/mturk/findhits*
// @match       https://*.mturk.com/mturk/sorthits*
// @match       https://*.mturk.com/mturk/searchbar*
// @match       https://*.mturk.com/mturk/viewsearchbar*
// @match       https://*.mturk.com/mturk/sortsearchbar*
// @match       https://*.mturk.com/mturk/preview?*
// @match       https://*.mturk.com/mturk/return*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/288073.user.js
// @updateURL   http://userscripts.org/scripts/source/288073.meta.js
// @version     3.03
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==

/**********************************************************************/
/* NB: turkopticon.ucsd.edu (TO website) uses yellow for a rating between 2 and 3,
 *     but TO extension uses orange
 *
 * Turkopticon scale
 * green : 3 < average <= 5
 * orange: 2 < average <= 3
 * red   : 1 < average <= 2
 *
 * Color Coded Search scale (so that green represents the very best HITs)
 * green : 4 < average <= 5
 * yellow: 3 < average <= 4  yellow are OK HITs, that's why the yellow has a touch of green
 * orange: 2 < average <= 3
 * red   : 1 < average <= 2
 */
 
var GREEN   = '#66CC66'; //  (4,5]
//var YELLOW  = '#FFFF00'; // (3,4]  yellow
//var YELLOW  = '#CDFF2F'; // (3,4]  yellow with hint of green
var YELLOW  = '#ADFF2F'; // (3,4]  green yellow
//var YELLOW  = '#9CE62A'; // (3,4]  darker green yello
var ORANGE  = '#FF9900'; // (2,3]
//var RED     = '#FF0000'; // (1,2]
var RED     = '#FF3030'; // (1,2]
var BLUE    = '#7FAAEB'; // no rating

var VISITED_LINK = '#000000'; // black
var MASTERS = '#FFFFFF'; // white
//var MASTERS = '#B56CFF'; // purple

var NEW_NOTQUAL_BODY = '#A9AAA4'; // dark grey

var COMM_WEIGHT = 1;
var PAY_WEIGHT  = 3;
var FAIR_WEIGHT = 3;
var FAST_WEIGHT = 1;

var CHECKPOINT_COLOR = "#000000"; // black
//var CHECKPOINT_COLOR = "#00AAAA"; // dark green-blue
var CHECKPOINT_MESSAGE = "CHECKPOINT REACHED!";
//var CHECKPOINT_MESSAGE = "YOU SHALL NOT PASS!";

var SHOW_ALL_DETAILS = true;

/**********************************************************************/

// URLs for testing, learning parameters
//http://api.turkopticon.istrack.in/multi-attrs.php?ids=ABSF8UXFZYEK6
//http://data.istrack.in/turkopticon.php?data=2.57,2.31,2.89,2.71


//var API_BASE = 'http://turkopticon.ucsd.edu/api/';
//var API_MULTI_ATTRS_URL = API_BASE + 'multi-attrs.php?ids=';
// secure http proxy to prevent mixed content problems
var API_PROXY_BASE = 'https://api.turkopticon.istrack.in/';
var API_MULTI_ATTRS_URL = API_PROXY_BASE + 'multi-attrs.php?ids=';
var REVIEWS_BASE = 'http://turkopticon.ucsd.edu/';
var HIT_GROUPS_BASE_LINK = '/mturk/searchbar?selectedSearchType=hitgroups&requesterId=';

var NOTQUAL_BODY = '#F1F3EB';

var qual_checkbox;
var notqual_checkbox;
var green_checkbox;
var yellow_checkbox;
var orange_checkbox;
var red_checkbox;
var blue_checkbox;
var $parent_tables;

function process_TO_data(requester_data)
{
    var average = 0;
    var comm_rnd = 0;
    var pay_rnd = 0;
    var fair_rnd = 0;
    var fast_rnd = 0;
    var reviews = 0;
    var tos = 0;

    // after the API update, this if isn't necessary. leaving it in until
    // sure API is stable
    if (requester_data)
    {
        var comm = requester_data.attrs.comm;
        var pay = requester_data.attrs.pay;
        var fair = requester_data.attrs.fair;
        var fast = requester_data.attrs.fast;
        var sum = 0;
        var divisor = 0;

        if (comm > 0)
        {
            sum += COMM_WEIGHT*comm;
            divisor += COMM_WEIGHT;
        }
        if (pay > 0)
        {
            sum += PAY_WEIGHT*pay;
            divisor += PAY_WEIGHT;
        }
        if (fair > 0)
        {
            sum += FAIR_WEIGHT*fair;
            divisor += FAIR_WEIGHT;
        }
        if (fast > 0)
        {
            sum += FAST_WEIGHT*fast;
            divisor += FAST_WEIGHT;
        }
        if (divisor > 0)
        {
            average = sum/divisor;
        }

        comm_rnd = Math.round(comm*4)/4;
        pay_rnd = Math.round(pay*4)/4;
        fair_rnd = Math.round(fair*4)/4;
        fast_rnd = Math.round(fast*4)/4;
        
        if (requester_data.reviews)
        {
            reviews = requester_data.reviews;
        }
        if (requester_data.tos_flags)
        {
            tos = requester_data.tos_flags;
        }
    }

    comm_rnd = comm_rnd.toFixed(2);
    pay_rnd = pay_rnd.toFixed(2);
    fair_rnd = fair_rnd.toFixed(2);
    fast_rnd = fast_rnd.toFixed(2);

    return {comm_rnd:comm_rnd, pay_rnd:pay_rnd, fair_rnd:fair_rnd, fast_rnd:fast_rnd, reviews:reviews, tos:tos, average:average};
}

function determine_color(rating)
{
    // The lowest rating that can be given is a 1.
    // green  is (4,5]
    // yellow is (3,4]
    // orange is (2,3]
    // red    is (1,2]
    // blue   is 0 (no rating)
    // (0,1) is no man's land but I set the lower bound for red to 0 to agree with data.istrack.in

    var color = BLUE;

    if (rating > 4)
    {
        color = GREEN;
    }
    else if (rating > 3)
    {
        color = YELLOW;
    }
    else if (rating > 2 )
    {
        color = ORANGE;
    }
    else if (rating > 0)
    {
        color = RED;
    }

    return color;
}

function show_hide_color(color)
{
    if (notqual_checkbox.checked == true)
    {
        var $color_subset_tables = $parent_tables.filter('[title_color='+color+'][qualified_for="false"][hideable!=false]');
    }
    else
    {
        var $color_subset_tables = $parent_tables.filter('[title_color='+color+'][hideable!=false]');
    }
    
    switch(color)
    {
        case GREEN:
        {
            GM_setValue('green_checkbox_checked', green_checkbox.checked);
            if (green_checkbox.checked == false)
            {
                $color_subset_tables.each(function()
                {
                    $(this).hide();
                });
            }
            else
            {
                $color_subset_tables.each(function()
                {
                    $(this).show();
                });
            }
            break;
        }
        case YELLOW:
        {
            GM_setValue('yellow_checkbox_checked', yellow_checkbox.checked);
            if (yellow_checkbox.checked == false)
            {
                $color_subset_tables.each(function()
                {
                    $(this).hide();
                });
            }
            else
            {
                $color_subset_tables.each(function()
                {
                    $(this).show();
                });
            }
            break;
        }
        case ORANGE:
        {
            GM_setValue('orange_checkbox_checked', orange_checkbox.checked);
            if (orange_checkbox.checked == false)
            {            
                $color_subset_tables.each(function()
                {
                    $(this).hide();
                });
            }
            else
            {
                $color_subset_tables.each(function()
                {
                    $(this).show();
                });
            }
            break;
        }
        case RED:
        {
            GM_setValue('red_checkbox_checked', red_checkbox.checked);
            if (red_checkbox.checked == false)
            {
                $color_subset_tables.each(function()
                {
                    $(this).hide();
                });
            }
            else
            {
                $color_subset_tables.each(function()
                {
                    $(this).show();
                });
            }
            break;
        }
        case BLUE:
        {
            GM_setValue('blue_checkbox_checked', blue_checkbox.checked);
            if (blue_checkbox.checked == false)
            {
                $color_subset_tables.each(function()
                {
                    $(this).hide();
                });
            }
            else
            {
                $color_subset_tables.each(function()
                {
                    $(this).show();
                });
            }
            break;
        }
    }
}

function show_hide_all_colors()
{
    show_hide_color(GREEN);
    show_hide_color(YELLOW);
    show_hide_color(ORANGE);
    show_hide_color(RED);
    show_hide_color(BLUE);
}

function show_hide_qual()
{
    GM_setValue('notqual_checkbox_checked', notqual_checkbox.checked);
    if (notqual_checkbox.checked == true)
    {
        $parent_tables.filter('[qualified_for="true"][hideable!=false]').each(function()
        {
            $(this).hide();
        });
    }
    else
    {
        show_hide_all_colors();
    }
}

function set_checkpoint(e)
{
    var caller = e.target || e.srcElement;

    if (caller.checked)
    {
        var d = new Date();
        GM_setValue(caller.name+'_checked', caller.checked);
        GM_setValue(caller.name+'_date', '['+d.toLocaleDateString()+'] ');
    }
    else
    {
        GM_deleteValue(caller.name+'_checked');
        GM_deleteValue(caller.name+'_date');
    }
}

function create_colored_checkboxes()
{
    var checkbox_div = document.createElement('DIV');
    var notqual_div = document.createElement('DIV');
    var green_div = document.createElement('DIV');
    var yellow_div = document.createElement('DIV');
    var orange_div = document.createElement('DIV');
    var red_div = document.createElement('DIV');
    var blue_div = document.createElement('DIV');
    notqual_div.style.cssText = 'display:inline-block; background-color: '+NEW_NOTQUAL_BODY+';'
    green_div.style.cssText = 'display:inline-block; background-color: '+GREEN+';'
    yellow_div.style.cssText = 'display:inline-block; background-color: '+YELLOW+';'
    orange_div.style.cssText = 'display:inline-block; background-color: '+ORANGE+';'
    red_div.style.cssText = 'display:inline-block; background-color: '+RED+';'
    blue_div.style.cssText = 'display:inline-block; background-color: '+BLUE+';'

    notqual_checkbox = document.createElement('INPUT');
    green_checkbox = document.createElement('INPUT');
    yellow_checkbox = document.createElement('INPUT');
    orange_checkbox = document.createElement('INPUT');
    red_checkbox = document.createElement('INPUT');
    blue_checkbox = document.createElement('INPUT');
    
    notqual_checkbox.type = 'checkbox';
    green_checkbox.type = 'checkbox';
    yellow_checkbox.type = 'checkbox';
    orange_checkbox.type = 'checkbox';
    red_checkbox.type = 'checkbox';
    blue_checkbox.type = 'checkbox';
    
    notqual_checkbox.checked = GM_getValue('notqual_checkbox_checked', false);
    green_checkbox.checked = GM_getValue('green_checkbox_checked', true);
    yellow_checkbox.checked = GM_getValue('yellow_checkbox_checked', true);
    orange_checkbox.checked = GM_getValue('orange_checkbox_checked', true);
    red_checkbox.checked = GM_getValue('red_checkbox_checked', true);
    blue_checkbox.checked = GM_getValue('blue_checkbox_checked', true);
    
    notqual_checkbox.name = 'notqual_checkbox';
    green_checkbox.name = 'green_checkbox';
    yellow_checkbox.name = 'yellow_checkbox';
    orange_checkbox.name = 'orange_checkbox';
    red_checkbox.name = 'red_checkbox';
    blue_checkbox.name = 'blue_checkbox';
    
    notqual_checkbox.title = 'Only show HITs for which you are not qualified';
    green_checkbox.title = 'Show/Hide green';
    yellow_checkbox.title = 'Show/Hide yellow';
    orange_checkbox.title = 'Show/Hide orange';
    red_checkbox.title = 'Show/Hide red';
    blue_checkbox.title = 'Show/Hide no TO';
    
    notqual_checkbox.addEventListener('click', show_hide_qual);
    green_checkbox.addEventListener('click', function(){show_hide_color(GREEN);});
    yellow_checkbox.addEventListener('click', function(){show_hide_color(YELLOW);});
    orange_checkbox.addEventListener('click', function(){show_hide_color(ORANGE);});
    red_checkbox.addEventListener('click', function(){show_hide_color(RED);});
    blue_checkbox.addEventListener('click', function(){show_hide_color(BLUE);});

    notqual_div.appendChild(notqual_checkbox);
    green_div.appendChild(green_checkbox);
    yellow_div.appendChild(yellow_checkbox);
    orange_div.appendChild(orange_checkbox);
    red_div.appendChild(red_checkbox);
    blue_div.appendChild(blue_checkbox);
    
    checkbox_div.align = 'center';
    checkbox_div.appendChild(notqual_div);
    checkbox_div.appendChild(green_div);
    checkbox_div.appendChild(yellow_div);
    checkbox_div.appendChild(orange_div);
    checkbox_div.appendChild(red_div);
    checkbox_div.appendChild(blue_div);
    
    return checkbox_div;
}

//$(document).ready(function()
//{
    var is_HIT = $('input[type="hidden"][name="isAccepted"]').length > 0;
    if (is_HIT)
    {
        // not on a search page so quit
        return;
    }

    // change visited link color to make it easier to differentiate from unvisited link
    // code snippet from http://stackoverflow.com/questions/7030289/how-to-set-link-visited-color-in-jquery
    var visited_link_styling = '<style> a:visited {color:'+VISITED_LINK+';} </style>';
    $("head").append(visited_link_styling);
    // end snippet
    
    var checkbox_div = create_colored_checkboxes();
    $("table[cellspacing='0'][cellpadding='0'][border='0'][style='margin:5px; clear:both;']").eq(1).after(checkbox_div);

    if (SHOW_ALL_DETAILS)
    {
        // click 'Show all details'
        $(window).load(function(){$('a[id="expandall"][class="footer_links"][href="#"]:contains("Show all details")').get(0).click();});
    }

    // change color of HITs not qualified for to make it easier to differentiate
    $('[bgcolor="'+NOTQUAL_BODY+'"]').each(function(){
        $(this).attr('bgcolor',$(this).attr('bgcolor').replace(NOTQUAL_BODY, NEW_NOTQUAL_BODY));
    }); 

    var url = API_MULTI_ATTRS_URL;
    var requester_IDs = new Array();
    
    $parent_tables = $('table[width="100%"][cellspacing="0"][cellpadding="0"][border="0"][height="100%"]');

    $parent_tables.each(function()
    {
        var requester_ID_link = $(this).find('a[href^="'+HIT_GROUPS_BASE_LINK+'"]').attr('href');
        requester_IDs.push(requester_ID_link.replace(HIT_GROUPS_BASE_LINK,''));
    });

    // code snippet from http://stackoverflow.com/questions/5381621/jquery-function-to-get-all-unique-elements-from-an-array
    requester_IDs = requester_IDs.filter(function(itm,i,a)
    {
        return i==a.indexOf(itm);
    });
    // end snippet

    for (var i = 0; i<requester_IDs.length-1; i++)
    {
        url += requester_IDs[i] + ','
    }
    url += requester_IDs[i];
    
    GM_xmlhttpRequest(
    {
        method: "GET",
        url: url,
        onload: function (results)
        {
            var rdata = $.parseJSON(results.responseText);
            $parent_tables.each(function()
            {
                var requester_ID_link = $(this).find('a[href^="'+HIT_GROUPS_BASE_LINK+'"]').attr('href');
                var requester_ID = requester_ID_link.replace(HIT_GROUPS_BASE_LINK,'');
                var title_row = $(this).find("tr").eq(1);
                var link_bgcolor = $(this).find('td[width="100%"][valign="middle"][height="20"][align="left"]').attr('bgcolor');

                var pdata = process_TO_data(rdata[requester_ID]);
                var title_color = determine_color(pdata.average);
                var qualified_for = !($(this).find('a[href^="/mturk/notqualified?"]').length > 0);

                $(this).attr('title_color', title_color);
                $(this).attr('qualified_for', qualified_for);

                //var $title_line = $(this).find('td[width="100%"][valign="middle"][height="20"][align="left"]');
                //$title_line.css('background-color', title_color);
                $(this).find('td[valign="middle"][nowrap=""][align="left"]').css('background-color', title_color);
                $(this).find('td[valign="middle"][align="left"]').css('background-color', title_color);
                $(this).find('td[width="100%"][valign="middle"][nowrap=""][align="right"]').css('background-color', title_color);
                //$(this).find('a[href^="/mturk/preview?groupId="]').css('background-color', link_bgcolor);

                var link_href = REVIEWS_BASE + requester_ID;
                var link_text = pdata.reviews + ((pdata.reviews != 1) ? ' reviews ' : ' review ');
                //link_text = '['+link_text + '|comm: '+pdata.comm_rnd+'|pay: '+pdata.pay_rnd+'|fair: '+pdata.fair_rnd+'|fast: '+pdata.fast_rnd+'|tos: '+pdata.tos+']';
                link_text = '['+link_text + '|pay: '+pdata.pay_rnd+'|fair: '+pdata.fair_rnd+'|comm: '+pdata.comm_rnd+'|fast: '+pdata.fast_rnd+'|tos: '+pdata.tos+']';
                var link = '<a href="'+link_href+'" target="_blank">'+link_text+'</a>&nbsp;';
                title_row.after('<tr><td width="1" valign="middle" bgcolor="#336699" align="center"></td><td width="18" valign="middle" bgcolor="'+link_bgcolor+'" align="center"></td><td width="100%" valign="top" bgcolor="'+title_color+'" align="right">'+link+'</td><td width="8" valign="middle" bgcolor="'+link_bgcolor+'" align="center"></td><td width="1" valign="middle" bgcolor="#336699" align="center"></td></tr>');

                // after the API update, this if isn't necessary. leaving it in until
                // sure API is stable
                var pay = 0;
                if (rdata[requester_ID])
                {
                    pay = rdata[requester_ID].attrs.pay;
                }
                var pay_color = determine_color(pay);
                //var pay_color = determine_color(rdata[requester_ID].attrs.pay);
                $(this).find('span[class="reward"]').css('background-color', pay_color);

                // highlight Masters HITs title and link
                var is_masters = $(this).find('td[style="padding-right: 2em; white-space: nowrap;"]:contains("Masters")').length > 0;
                if (is_masters)
                {
                    $(this).find('td[valign="middle"][nowrap=""][align="left"]').css('background-color', MASTERS);
                    $(this).find('a[href^="/mturk/preview?groupId="]').css('background-color', MASTERS);
                }


                // create checkpoints
                var $groupId_link = $(this).find('a[href^="/mturk/preview?groupId="]');
                if ($groupId_link.length > 0)
                {
                    var checkbox = document.createElement('INPUT');
                    checkbox.type = 'checkbox';
                    checkbox.name = $groupId_link.attr('href').slice(23); // groupId
                    checkbox.title = 'Set a checkpoint to help remember a HIT you\'ve seen before.\nUseful when browsing by HIT Creation Date.';
                    checkbox.checked = GM_getValue(checkbox.name+'_checked', false);
                    checkbox.addEventListener('click', set_checkpoint);  
                    checkbox.style.cssText ='vertical-align:middle;';
                    $groupId_link.after(checkbox);
                    // mark checkpoints
                    if (checkbox.checked == true)
                    {
                        var checkpoint_date = GM_getValue(checkbox.name+'_date');
                        $groupId_link.text(checkpoint_date+CHECKPOINT_MESSAGE);
                        $(this).attr('hideable', false);
                        $(this).css('border', '50px solid '+CHECKPOINT_COLOR);
                    }
                }

            });
            show_hide_all_colors();
            show_hide_qual();
        }
    });
//});

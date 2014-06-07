// ==UserScript==// @name            Fanfiction Update Status
// @namespace       http://members.cox.net/greasemonkey/ffnupdatestatus.user.js 
// @description     Color-codes the update date, and adds in the # of days since an update.
// @include         http://www.fanfiction.net/s/*
//
// ==/UserScript==

// Created by Shanoah Alkire (shanoah@cox.net)
function do_ffn_update_style() {
// First 2 Functions are straight from 'Dive into Greasemonkey'

// Query XPath, and return the first result
function xpath(query) { 
    return document.evaluate(query, document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null);
}

// Add a CSS style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function blankTime(date) {
    with (date) {
        setHours(0);
        setMinutes(0);
        setSeconds(0); 
    }
return date;
}

function parseDate(pattern, value) {
    var s = value.match(pattern);  
    // Use this pattern to distinguish between 'Update:' & 'Published:'

    if (parseInt(s[3]) < 50)
        var date = blankTime(new Date(s[1]+"/"+s[2]+"/20"+s[3]))
    else
        var date = blankTime(new Date(s[1]+"/"+s[2]+"/19"+s[3]));
    // Hack -- Assume that it was updated between 1950-2049

    return date;
}

function numOfDays(theDate) {
    var diff = 0;
    var today = blankTime(new Date()); // Get the date, minus the time
    diff = Math.round((today - theDate)/(1000*60*60*24));
    // The number of days, converted from milliseconds

    return diff;
}

   var section = xpath('/html/body/div/table/tbody/tr[3]/td/table/tbody/tr/td[1]');
   
    var search = /Updated: (\d+\1)-(\d+\2)-(\d+\3)/;
    var age = numOfDays(
              parseDate(search, section.singleNodeValue.textContent));
    var opening = '<B><span class="updated">';
    if (age==0)
        var status = 'Updated: Today';
    else if (age==1)
        var status = 'Updated: $1/$2/$3 - 1 day ago';
    else
        var status = 'Updated: $1/$2/$3 - ' + age.toString() + ' days ago';
         
    var closing = '</span></B>'; 

    switch (true)    {
        case   (age <= 2): addGlobalStyle('.updated { color: red    }'); break; 
        case   (age <= 7): addGlobalStyle('.updated { color: orange }'); break; 
        case  (age <= 90): addGlobalStyle('.updated { color: black  }'); break; 
        case (age <= 180): addGlobalStyle('.updated { color: green  }'); break; 
        case (age <= 365): addGlobalStyle('.updated { color: purple }'); break; 
        case  (age > 365): addGlobalStyle('.updated { color: gray   }'); break;
    }

    with (section.singleNodeValue)
        innerHTML = innerHTML.replace(search, opening + status + closing); 
}; // Ends do_ffn_update_style)


do_ffn_update_style();//window.addEventListener("load", function() { do_ffn_update_style() }, false);//.user.js


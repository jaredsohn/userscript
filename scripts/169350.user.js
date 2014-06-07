// ==UserScript==
// @name       SCC Timezone Changer
// @description		Converts several dates on SCC to your local time
// @version    0.1.1
// @match      https://sceneaccess.eu/*
//
// @exclude    https://sceneaccess.eu/inbox*
// @exclude    https://sceneaccess.eu/wiki*
// @exclude    https://sceneaccess.eu/bet*
// @exclude    https://sceneaccess.eu/staff
// @exclude    https://sceneaccess.eu/charts*
// @exclude    https://sceneaccess.eu/shows*
// @exclude    https://sceneaccess.eu/donate*
// @exclude    https://sceneaccess.eu/editprofile*
// @exclude    https://sceneaccess.eu/index*
//
// @updateUrl       https://userscripts.org/scripts/source/169350.meta.js
// @downloadUrl     https://userscripts.org/scripts/source/169350.user.js
//
// @run-at     document-end
// ==/UserScript==

//
// I've never touched javascript before. If you have any
// improvements please feel free to toss them at me or just
// modify the script yourself :)
//


//
// Implemented
// * Browse (all categories)
// * Forums (and topics)
// * User profiles
//
//
// Not Implemented (+ no plans to implement)
// * Front page news date
// * Site time next to inbox
// * .. possibly others?
//

function convertTime(tMonth, tDay, tYear, tHour, tMin, tSec)
{    
    d = new Date(tMonth + " " + tDay + ", " + tYear + " " + tHour + ":" + tMin + ":" + tSec);
    
    var min = d.getTime() / 1000 / 60;
    var local = new Date().getTimezoneOffset();
    var localTime = min - local;
    
    // prepends 0's to #'s < 10
    return new Date(localTime * 1000 * 60).toLocaleString().replace(/\b[0-9]+\b/g, function(d) { return parseInt(d)<10?(d[0] != "0"?"0"+d:d):d; });
}

(function() {   
    var i, date, day, time, formatted, elementslol, buffer, timestamp;
    var months = new Array();
    months[1]="January";
    months[2]="February";
    months[3]="March"; 
    months[4]="April"; 
    months[5]="May";
    months[6]="June";
    months[7]="July";
    months[8]="August";
    months[9]="September";
    months[10]="October";
    months[11]="November";
    months[12]="December";
        
    //
    // browse/spam/archive/foreign/xxx
    //
    elementslol = document.getElementsByClassName('ttr_added');
    if(elementslol.length > 0)
    {        
        for(i = 0; i < elementslol.length; ++i)
        {
            date = elementslol[i].innerHTML.split(/<br\s*\/?>/);
            day = date[0].split("-");
            time = date[1].split(":");
            
            formatted = convertTime(
                months[parseInt(day[1])], day[2], day[0],
                time[0], time[1], time[2]
            ).split(" ");
            
            elementslol[i].innerHTML = formatted[0] + "<br/>" + formatted[1] + " " + formatted[2];
        }
        
        return;
    }
    
    //
    // forum
    //
    elementslol = document.getElementsByClassName('ftc_lastpost');
    if(elementslol.length > 0)
    {
        for(i = 0; i < elementslol.length; ++i)
        {
            timestamp = elementslol[i].innerHTML.split(/<br\s*\/?>/);
            date = timestamp[0].split(" ");
            day = date[0].split("-");
            time = date[1].split(":");
            
            formatted = convertTime(
                months[parseInt(day[1])], day[2], day[0],
                time[0], time[1], time[2]
            ).split(" ");           
            
            elementslol[i].innerHTML = elementslol[i].innerHTML.replace(timestamp[0], formatted[0] + " " + formatted[1] + " " + formatted[2]);
        }
        
        return;
    }
    
    //
    // viewtopic
    //
    // since 'float_left' can be ambiguous we need to verify
    // that 'post_header' exists, then we go to the child element 'post_header'
    //
    elementslol = document.getElementsByClassName('post_header');
    if(elementslol.length > 0)
    {
        // iterate through all post_header's
        for(i = 0; i < elementslol.length; ++i)
        {
            // get the real element we're looking for, the span! ('float_left')
            buffer = elementslol[i].getElementsByTagName('span')[0];

            timestamp = buffer.innerHTML.split(" at ");
            timestamp = timestamp[1].split(" GMT")[0].trim();
            date = timestamp.split(" ");
            day = date[0].split("-");
            time = date[1].split(":");
            
            formatted = convertTime(
                months[parseInt(day[1])], day[2], day[0],
                time[0], time[1], time[2]
            ).split(" ");
                
            elementslol[i].innerHTML = elementslol[i].innerHTML.replace(timestamp, formatted[0] + " " + formatted[1] + " " + formatted[2]).replace("GMT", "");
        }
        
        return;
    }
    
    //
    // viewing user
    //
    elementslol = document.getElementById('cudetails');
    if(elementslol.innerHTML != "")
    {
        elementslol = elementslol.getElementsByClassName('small user_info_stats');
        if(elementslol.length > 0)
        {
            for(i = 0; i < elementslol.length; ++i)
            {
                timestamp = elementslol[i].innerHTML.split(" (")[0];
                date = timestamp.split(" ");
                day = date[0].split("-");
                time = date[1].split(":");
                
                formatted = convertTime(
                    months[parseInt(day[1])], day[2], day[0],
                    time[0], time[1], time[2]
                ).split(" ");
                
            	elementslol[i].innerHTML = elementslol[i].innerHTML.replace(timestamp, formatted[0] + " " + formatted[1] + " " + formatted[2]);
            }
        }
        
        return;
    }
})();
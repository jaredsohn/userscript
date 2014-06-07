// Songkick SetlistHelper
// version 0.15 BETA!
// 2009-09-20
// Copyright (c) 2009, Robin Tweedie (robin.tweedie@gmail.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This script adds a textarea to the Songkick setlist interface.
// You can paste a newline separated setlist into the textarea and 
// initiate parsing of the setlist into the form with the "parse tracks" 
// button. You can also tick whether you would like common numbering 
// formats removed from the beginning of the track names.
//
// Uses jQuery (http://jquery.com/)
//
// Future plans:
// * support for parsing encores (have to be done manually for now)
// * refactor to move functions out of global scope
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Songkick SetlistHelper
// @namespace     http://songkick.com
// @description   Makes adding setlists to Songkick.com easier
// @include       http://www.songkick.com/*/setlists/*
// ==/UserScript==

/*jslint white: true, onevar: true, browser: true, nomen: true, 
    eqeqeq: true, plusplus: true, bitwise: true, regexp: true, 
    newcap: true, immed: true */

/* To Title Case 1.1.1
 * David Gouch <http://individed.com>
 * 23 May 2008
 * License: http://individed.com/code/to-title-case/license.txt
 *
 * In response to John Gruber's call for a Javascript version of his script: 
 * http://daringfireball.net/2008/05/title_case
 */    
String.prototype.toTitleCase = function () {
    return this.replace(/([\w&`'‘’"“.@:\/\{\(\[<>_]+-? *)/g, function (match, p1, index, title) {
        if (index > 0 && title.charAt(index - 2) !== ":" &&
        	match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i) > -1) {
            return match.toLowerCase();
        }
        if (title.substring(index - 1, index + 1).search(/['"_{(\[]/) > -1) {
            return match.charAt(0) + match.charAt(1).toUpperCase() + match.substr(2);
        }
        if (match.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/) > -1 || 
        	title.substring(index - 1, index + 1).search(/[\])}]/) > -1) {
            return match;
        }
        return match.charAt(0).toUpperCase() + match.substr(1);
    });
};

/**
* Strips several common forms of numbering & whitespace from the 
* front of a string using a regular expression
* examples that would be stripped: 1) #2 3. 4: 5
* @param    string  input_string
* @return   string
*/
String.prototype.stripNumbers = function () {
    return this.replace(/^(\s*[#\d\.:\)]*\s*)/i, '');
};

/**
* @param    string  prefix
* @param    int     id
* @return   jQuery
*/
function create_track_input(prefix, id) {
    var new_item = $("<dd></dd>"),
        new_input = $("<input type='text' />"),
        prev_id = id - 1;
        
    new_input.attr("id", prefix + id);
    new_input.attr("name", prefix + id);
    new_input.addClass("text");
    
    new_item.append(new_input);
    
    //append new song to list in appropriate place
    $("#" + prefix + prev_id).parent().after(new_item);
        
    return new_input; //return jQuery object of new input
}

/**
* @param    string  input_string    raw pasted text
* @param    array   opts            list of true/false options for parsing
* @return   array
*/
function parse_tracks(input_string, opts) {
    var i, 
        track_array = input_string.split("\n");
    
    //iterate over parsed tracks    
    for (i = 0; i < track_array.length; i = i + 1) {    
        //strip numbering
        if (opts.stripNumbers) {
            track_array[i] = track_array[i].stripNumbers();
        }
        
        //remove track if blank
        if (track_array[i].length === 0) {
            track_array.splice(i, 1);
            i = i - 1;
            continue;
        }
        
        //title casing
        if (opts.titleCase) {
            track_array[i] = track_array[i].toTitleCase();
        }
    }
    
    return track_array;
}

/**
* @param    string  prefix
* @param    array   track_array
* @return   int
*/
function insert_tracks(prefix, track_array) {
    var i, track_input;
    
    for (i = 0; i < track_array.length; i = i + 1) {
        track_input = $("#" + prefix + i);
    
        //create a new input field if it doesn't already exist
        if (track_input.length !== 1) {
            track_input = create_track_input(prefix, i);
        } 
        
        track_input.val(track_array[i]);
    }
    
    return i;
}

/**
* Fetch parsing options from list of checkboxes and return
* as key-value pairs object.
* @return   object
*/
function get_options() {
    var i,
        checkboxes = $("dd#parseopts input"), 
        opts = {};
    
    for (i = 0; i < checkboxes.length; i = i + 1) {
        opts[checkboxes[i].id] = checkboxes[i].checked;
    }
    
    return opts;
}

/**
* go button click event handling
*/
var onGoClick = function () {
    var sl_paste = $("#sl_paste"), 
        track_text = sl_paste.val(), 
        parse_opts = get_options(), 
        prefix = this.id;
        
    //insert tracks by parsing from paste area, taking number stripping option into account
    insert_tracks(prefix, parse_tracks(track_text, parse_opts));
    sl_paste.val('');
};

function generate_option(id, label) {
    var html = "<input id='" + id + "' type='checkbox' />&nbsp;" + label;
    return html;
}

/**
* Start injecting HTML and adding event listeners.
*/
function init() {   
    var html = {};     
    html.deflist = $("div.fieldset dl:first");
    
    html.ta_label = $("<dt><label>Paste setlist here</label></dt>");
    html.deflist.prepend(html.ta_label);
    
    html.pa_dd = $("<dd></dd>");
    
    html.paste_area = $("<textarea id='sl_paste'></textarea>");
    html.paste_area.css({"width": "180px", "height": "130px"});
    html.pa_dd.append(html.paste_area);
    html.ta_label.after(html.pa_dd);
    
    html.cleanopts_label = $("<dt><label>Parsing options</label></dt>");
    html.pa_dd.after(html.cleanopts_label);
    
    html.clean_optlist = $("<dd id='parseopts'></dd>");
    html.clean_optlist.append(generate_option("stripNumbers", "Remove numbering from beginning of track names"));
    html.clean_optlist.append("<br />");
    html.clean_optlist.append(generate_option("titleCase", "Convert tracks to Title Case"));
    html.cleanopts_label.after(html.clean_optlist);
    
    html.parse_dd = $("<dd></dd>");
    html.parse_btn = $("<input id='main_track_' class='submit button' type='button' value='Parse tracks' />");
    //add click event handler to Go button
    html.parse_btn.click(onGoClick);
    html.parse_dd.append(html.parse_btn);
    
    html.clean_optlist.after(html.parse_dd);
}

/**
* Recusively checks for jQuery to be loaded.
*/
function GM_wait() {
    if (typeof unsafeWindow.jQuery === 'undefined') { 
        window.setTimeout(GM_wait, 100); 
    } else { 
        $ = unsafeWindow.jQuery; 
        init(); 
    }
}

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
var GM_start = new GM_wait();
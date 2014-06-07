// -*- coding:utf-8 -*-
// vim: set enc=utf8:
// ==UserScript==
// @name           Bajsfilteret
// @namespace      http://www.pvv.org/~alexanro
// @description    Makes it possible to ignore images from some users
// @include        http://underskog.no/samtale/*
// @include        http://www.underskog.no/samtale/*
// @license        GPL 2
// @version        0.2
// @author         Alexander Rødseth
// ==/UserScript==

/*
 * TODO Serverside
 * TODO Highscore bajs
 * TODO Bajsthresholdformula
 */

// Return the first div-tag with the given "class="
function get_div_by_class(element, classname) {
    var lst_div = element.getElementsByTagName("div");
    for (i=0; i < lst_div.length; i++) {
	if (lst_div[i].className == classname) {
	    return lst_div[i];
	}
    }
    return -1;
}

// Return all div-elements with the given "class="
function get_all_div_by_class(classname) {
    var lst_div = document.getElementsByTagName("div");
    var lst_relevant = new Array();
    var int_relevant = 0;
    var i_dbc = 0;
    for (i_dbc=0; i_dbc < lst_div.length; i_dbc++) {
	if (lst_div[i_dbc].className == classname) {
	    lst_relevant[int_relevant] = lst_div[i_dbc];
	    int_relevant++;
	}
    }
    return lst_relevant;
}

// Takes a div tag that is a comment, returns a string with a username
function who_said(comment) {
    var lst_div_content = comment.getElementsByTagName("div");
    var elm_img;
    // Go through all div-tags in the comment-block
    var i_ws;
    for (i_ws=0; i_ws < lst_div_content.length; i_ws++) {
	// If the div has class=byline, pick out the username from the img title
	if (lst_div_content[i_ws].className == "byline") {
	    elm_img = lst_div_content[i_ws].getElementsByTagName("img")[0];
	    return elm_img.title;
	}
    }
    return "";
}

// Adds a link right after kudos
function add_bajsbutton(comment, name, samtale) {
    var lst_span_action = comment.getElementsByTagName("span");
    var elm_action;
    var i_abb;
    for (i_abb=0; i_abb < lst_span_action.length; i_abb++) {
	if (lst_span_action[i_abb].className == "action") {
	    elm_action = lst_span_action[i_abb];
	    // server checks for ip
	    elm_action.innerHTML += '<font color="#C0C0C0">|&nbsp;</font><font><a href="http://www.pvv.org/~alexanro/bajs.php?samtale=' + samtale + '&name=' + name + '">bajs</a></font>';
	}
    }
}

// Checks if a list has a string
function listhas(lst_strings, str_check) {
    var i_lh;
    for (i_lh=0; i_lh < lst_strings.length; i_lh++) {
	if (str_check == lst_strings[i_lh]) {
	    return true;
	}
    }
    return false;
}

// Find an URL-friendly name for this samtale
function get_samtale() {
    return document.URL.split("/")[4].split("?")[0];
}

/* Changes all the comments just a bit
 * Called when the xml is received
 * It's the main function, really.
 */
function change_comments(response) {
    var int_alerts = 0;
    var str_name;
    var bool_black = false;
    var elm_said;
    var lst_black = new Array();
    // Get the xml document from the given http-response
    var parser = new DOMParser();
    var xml = parser.parseFromString(response.responseText, "text/xml");
    // Get the name of the thread
    var str_samtale = get_samtale();
    // Get all comments on the page
    var lst_div_comments = get_all_div_by_class("comment");


    /* Find the blacklisted usernames belonging to this samtale
     * based on the xml-data given as response and store the list
     * of usernames in lst_black.
     */
    var elm_bajs = xml.getElementsByTagName('bajs')[0];
    var lst_samtale = elm_bajs.getElementsByTagName('samtale');
    var elm_samtale;
    var str_n;
    var lst_bajsusers;
    var i_u;
    var i_b;
    // Go through all the samtaler to see if they match this one
    var i_cc;
    for (i_cc=0; i_cc < lst_samtale.length; i_cc++) {
	elm_samtale = lst_samtale[i_cc];
	str_n = elm_samtale.getElementsByTagName('name')[0].textContent;
	// If this is the matching samtale OR a general block
	if ((str_n == str_samtale) || (str_n == '*')) {
	    // Pick the usernames out from the xml and put it into lst_black
	    lst_bajsusers = elm_samtale.getElementsByTagName('user');
	    i_u;
	    i_b = lst_black.length;
	    for (i_u=0; i_u < lst_bajsusers.length; i_u++) {
		lst_black[i_b] = lst_bajsusers[i_u].textContent;
		i_b++;
	    }
	}
    }

    // Go through all comments
    var elm_comment;
    var i_m;
    for (i_m=0; i_m < lst_div_comments.length; i_m++) {
	elm_comment = lst_div_comments[i_m];
	str_name = who_said(elm_comment);
	bool_black = listhas(lst_black, str_name);
	if (bool_black) {
	    elm_said = get_div_by_class(elm_comment, "textile");
	    elm_comment.innerHTML = '<p><font color="#E0A080">' + str_name + ' bajsat</font></p>';
	} else {
	    add_bajsbutton(elm_comment, str_name, str_samtale);
	}
	if (int_alerts == 3) {
	    break;
	}
    }
}

function main() {
    if (!GM_xmlhttpRequest) {
	alert('Please upgrade to the latest version of Greasemonkey.');
	return
    }
    GM_xmlhttpRequest({
	method:'GET',
	url:'http://www.pvv.org/~alexanro/underskog_bajs.xml',
	onload: change_comments
    });
}

main();

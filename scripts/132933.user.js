// ==UserScript==
// @name          InConTroll
// @namespace     COS333
// @description	  Block websites in sessions located at http://www.myincontroll.com.
// @exclude       http://www.myincontroll.com
// ==/UserScript==

/**************************************************
 * PLEASE NOTE: 
 *  (1) The only information stored about sessions
 * are their names, their url list, their app list,
 * and the associated username. In particular, 
 * it does NOT store the start and end dates! So
 * the blocking element of the script will only be
 * disabled when you uncheck the associated session; 
 * it will not expire by itself.
 *  (2) As a consequence of (1), if you forgot your
 * username / password combination, you will be unable
 * to unblock the script. In the event of an emergency,
 * you can always disable this script or wipe your browsing
 * data, although this will stop all of your blocking
 * sessions. Plans are being made for a master account
 * (prefixed by 'admin:') which can edit runnability of 
 * sessions of any username.
 *  (3) Whether a session is checked will not be remembered
 * when you update a session's name. Otherwise, the list of
 * session data will be refreshed each time you open home.php. 
 *  (4) If you want to see a list of all active
 * blocking sessions, go to the blocked page 
 * BLOCK_PAGE = /block/blocked.php
 * and click on the link "View Active Sessions".
 * This will alert a list of all blocked URLs in the 
 * form of a JSON-stringified dictionary. 
 *  (5) This script uses GM_getValue() / GM_setValue()
 * for local storage, since it requires cross-domain
 * local storage. Both are supported in FireFox with
 * GreaseMonkey 0.3+ and Chrome with TamperMonkey;
 * most other browsers do not support them due to 
 * security issues, although hopefully they will
 * be resolved soon. For the time being this script
 * can only be used in FireFox/Chrome; another possibility
 * would be to store the information in a database
 * and use a xmlhttprequest but this would be slower. 
 **************************************************/

// TODOLIST: add <noscript> to relevant pages

const LOCAL_LIST = "list",      // local storage file for session list
        URL_LIST = "url",       // key for list of urls to block
    BLOCKED_NAME = "block",     // local storage file for blocking session name
    BLOCKED_USERNAME = "blockusername",             // local storage file for blocking username 
     BLOCKED_URL = "blockurl",  // local storage file for blocked url
     BLOCKED_URL_SUBSTRING = "blockurlsubstring",   // local storage file for blocking regex 
      START_DATE = "startdate", // key for start date
        END_DATE = "enddate",   // key for end date
      IS_RUNNING = "running",   // key for whether session is running
        USERNAME = "username",  // key for username
      BLOCK_PAGE = "http://www.myincontroll.com/block/blocked.php",    // site to redirect blocked URLs to
    ADMIN_PREFIX = "admin:";    // backdoor method for disabling sessions
const WILDCARD = '*',           // wildcard in URL NFA
      URL_DELIMITER = '\'';     // delimiter for URL list when scraped
 USER_SESSION_DELIMITER = '\''; // delimiter for username + session key    
var start, end;                 // start, end indices updated by nfasearch()

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 * Grabs sessions and inserts them into local storage in the form of 
 *  the following dictionary mapping:
 *    username -> {session's name -> {START_DATE: start date (Date object), END_DATE: end_date, 
 *       IS_RUNNING: whether running (boolean), URL_LIST: list of websites to block (array of strings),
 *       USERNAME: username of individual} }
 */
function insertCheckboxes() {
    var username_session_data = {},     // username -> session associative list as described in javadoc
                 session_data = {};     // session associative list corresponding to current username
    
    // scrape username
    var username = document.getElementById("username").innerHTML;
    
    // restore previously saved data
    var prev_data = GM_getValue(LOCAL_LIST);
    if(prev_data && prev_data != "" && prev_data != "undefined") {
        var username_session_data = JSON.parse(prev_data);
        if(username in username_session_data)
            session_data = username_session_data[username];
    }
         
        /*    // insert help description:
    var title_desc = document.getElementsByTagName("h1")[0];
    var help_desc = document.createElement("div");
    help_desc.setAttribute("innerHTML", "To use blocking script, check the sessions you want running.");
    insertAfter(title_desc, help_desc);
        */
    document.getElementById("intro_text").innerHTML = "To use the website plugin, check the sessions containing URLs which you wish to block. "
        + "Please note that the plugin does not use the dates displayed on this page; instead, uncheck sessions which you wish to stop. "
        + "Sessions whose names are changed will not be stopped by unchecking; instead you will have to re-name the session back to its original name. <br /><br />";
    
    // for each session, load session data into local storage.
    // add onclick method to checkboxes to which update local storage.        
    var session_bars = document.getElementsByClassName("session-bar");
    for(var i = 0; i < session_bars.length; i++) {
        var cur_session_data = {};
        
        var session_name = session_bars[i].id.substring("expand:".length);
        var urllist1 = document.getElementById("urllist:" + session_name).innerHTML,
            urllist  = urllist1.substring(0, urllist1.length - 1);
        // alert(urllist);
        cur_session_data[URL_LIST] = urllist.split("'");
        cur_session_data[IS_RUNNING] = false;
        cur_session_data[USERNAME] = username;
        // cur_session_data[START_DATE] = new Date(parseInt(document.getElementById("long_starttime:"+session_name).value));
        // cur_session_data[END_DATE]   = new Date(parseInt(document.getElementById("long_endtime:"+session_name).value));
        
        var cb = document.createElement("input");
        cb.setAttribute("type", "checkbox");
        cb.setAttribute("class", "cb_js");
        cb.setAttribute("id", "checkbox:" + session_name);
        
        // lookup whether session is running
        if(session_name in session_data && session_data[session_name][IS_RUNNING]) { 
            cb.setAttribute("checked", "yes");    
            cur_session_data[IS_RUNNING] = true;
        }
        
        /* old version: set onclick attribute?    
        cb.setAttribute("onclick", 
          + "alert('starting.'); "
          + "var sname = this.id.substring('checkbox:'.length); "
          + "var sdata = JSON.parse(GM_getValue('" + LOCAL_LIST + "')); "    
          + "if(this.checked) {"
          + "    sdata[sname]['" + IS_RUNNING + "'] = true; "
          + "}" 
          + "else {"
          + "    sdata[sname]['" + IS_RUNNING + "'] = false; "
          + "}"
          + "GM_setValue('" + LOCAL_LIST + "', JSON.stringify(sdata)); " ); */
            
        // on checkbox click, toggle IS_RUNNING property of current session  
        cb.onclick = function(e) {
            // prevent onclick from bubbling to session-bar
            e.cancelBubble = true;
            if(e.stopPropagation) e.stopPropagation();
            
            var sname = this.id.substring('checkbox:'.length),
             username = document.getElementById("username").innerHTML; 
            var sdata = JSON.parse(GM_getValue(LOCAL_LIST));   
            
            if(username.indexOf(ADMIN_PREFIX) != 0) {    
                if(this.checked) 
                    sdata[username][sname][IS_RUNNING] = true; 
                else 
                    sdata[username][sname][IS_RUNNING] = false; 
            }
            // usernames starting with ADMIN_PREFIX
            // will have sessions whose IS_RUNNING property
            // overwrites any other username's sessions, 
            // including other usernames with ADMIN_PREFIX
            else {
                for(var other_username in sdata) {
                    if(sname in sdata[other_username]) {
                        if(this.checked) 
                            sdata[other_username][sname][IS_RUNNING] = true; 
                        else 
                            sdata[other_username][sname][IS_RUNNING] = false; 
                    }
                }
            }
            
            GM_setValue(LOCAL_LIST, JSON.stringify(sdata));  
        }    
        session_bars[i].appendChild(cb);
        
        session_data[session_name] = cur_session_data;
    }
   
    username_session_data[username] = session_data;
    
    // store updated session data and 
    GM_setValue(LOCAL_LIST, JSON.stringify(username_session_data));
}

/**
 * Retrieves session information from local storage, and
 * flattens/filters out currently active blocking sessions.
 * @return An associative array: "username'sessionname" -> url list (array of strings)
 */
function getURLsToBlock() {
    var block_list = {};
    if(GM_getValue(LOCAL_LIST) == "undefined") 
        return block_list;
    var username_session_list = JSON.parse(GM_getValue(LOCAL_LIST));
    if(!username_session_list) return;
    var cur_date = new Date();  // TODO: use dates in conjunction with IS_RUNNING?
    for(var username in username_session_list) {
        var session_list = username_session_list[username]; 
        for(var session_name in session_list) {
            var // start_date = new Date(session_list[session_name][START_DATE]), 
                //   end_date = new Date(session_list[session_name][END_DATE]),
                is_running = session_list[session_name][IS_RUNNING];
            if(// start_date.getTime() < cur_date.getTime() && cur_date.getTime() < end_date.getTime() && 
               is_running) {
                   
                // "'" is delimiter since it cannot appear in username or session name   
                block_list[username + USER_SESSION_DELIMITER + session_name] = session_list[session_name][URL_LIST];
            } 
        }
    }
    return block_list;
    /* 
    var item1 = {};
    item1["session1"] = ["reddit", "artof*solving"];
    return item1;
    */
}

/**
 * Search s for NFAString, with * as wildcard.
 * start and end are modified to be, respectively,
 *  the start and ending indices of the matching of
 *  NFAString in s.
 * @return boolean, whether or not NFAString is in s
 */
function nfasearch(NFAString, s) {
    start = -1, end = -1;
    if(!s || s === "")
        return false;
        
    if(NFAString == null || NFAString.length == 0) {
        start = 0; end = 0;
        return true;
    }
    for(var i = 0; i < s.length; i++) {
        var newend = matchhere(NFAString, s.substring(i), i);
        if(newend != -1) {
            start = i;
            end = newend;
            return true;
        }
    }
    return false;
}

/**
 * Returns index of end of substring matched by r in s
 *  (if r is not in s, return -1).
 * @param r Substring of NFA string being matched
 * @param s String to match DFA inside
 * @param end Index of start of search of r in s
 * @return updated value of end, or -1
 */
function matchhere(r, s, end2) {
    // condition on the next character of r.
    if (r == "") return end2;
    if (s == "") return -1;
       
    // if the next character is a wildcard then check each of the next possible substrings.
    if (r.charAt(0) === WILDCARD) {
        for(var i = 0; i < s.length; i++) {
            var newend = matchhere(r.substring(1), s.substring(i), end2);
            if(newend != -1) 
                return newend;
            end2++;
        }
        return -1;
    }
    
    // case in-sensitive comparison of next non-wildcard characters
    if(r.charAt(0).toUpperCase() == s.charAt(0).toUpperCase()) {
        end2++;
        return matchhere(r.substring(1), s.substring(1), end2);    
    }
    return -1;
}

/**
 * Prevent <script> injection attacks by replacing anchor tags <, >'s.
 * @param HTMLstring String to be placed in HTML code to be sanitized
 */
function sanitizeHTML(HTMLstring) {
    return HTMLstring.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// main executing code, runs at DOM onReady
// Scans though localStorage list to find list of sessions
// Redirects any to be blocked to our blocking page along with information about the blocked site
var cur_href = window.location.href;
if(cur_href == BLOCK_PAGE) {
    // modify <div> element to display information about blocked webpage
    //    alert(cur_href + " " + GM_getValue(BLOCKED_NAME)+" "+GM_getValue(BLOCKED_URL)); 
    document.getElementById('block_msg').innerHTML =
          "You were blocked by the session <u>" + sanitizeHTML(GM_getValue(BLOCKED_NAME))
        + "</u> of the user <u>" + sanitizeHTML(GM_getValue(BLOCKED_USERNAME))
        + "</u> because the website you just visited, <u>" + sanitizeHTML(GM_getValue(BLOCKED_URL))
        + "</u>, contains: <u>" + sanitizeHTML(GM_getValue(BLOCKED_URL_SUBSTRING)) + "</u>.<br /><br />";
    
    // add button to view LOCAL_LIST contents to retrieve usernames with active blocking sessions.
    document.getElementById('view_active_sessions').onclick = function(e) {
        alert("The following is a JSON-flattened dictionary; its keys are the usernames. It is deliberately obfuscated.\n\n"
            + GM_getValue(LOCAL_LIST));
    }
    document.getElementById('view_active_sessions').innerHTML = "View Active Sessions";
}
else if(cur_href.indexOf("http://www.myincontroll.com/test/home.php") == 0) {
    insertCheckboxes();
    // add checkboxes to each panel
    // set defaults according to GM_getValue
    // delete sessions which no longer appear on page (need to maintain master list - JSON.parsonify)
    // checkbox onchangelistener updates GM_getValue
    // grab url list from panels whenever you get a value
    // do a method like putURLsToBlock(session_data)
    //    alert(cur_href + " " + GM_getValue(BLOCKED_NAME)+" "+GM_getValue(BLOCKED_URL));
}
else { // scan list of blocking url substrings for current url
    var session_list = getURLsToBlock();
    for(var session_name in session_list) {
        var url_list = session_list[session_name];
        if(!url_list) continue;
        for(var j = 0; j < url_list.length; j++) {
            // make sure not to block myincontroll website accidentally
            if(url_list[j] != "" && nfasearch(url_list[j], cur_href) && cur_href.search(/myincontroll/gi) == -1) {
                var session_split = session_name.split(USER_SESSION_DELIMITER);
                GM_setValue(BLOCKED_USERNAME, session_split[0]);
                GM_setValue(BLOCKED_NAME,     session_split[1]);
                GM_setValue(BLOCKED_URL_SUBSTRING, url_list[j]);
                GM_setValue(BLOCKED_URL, window.location.href);
                // alert(cur_href + " " + GM_getValue(BLOCKED_NAME)+" "+GM_getValue(BLOCKED_URL));
                window.location = BLOCK_PAGE;        
                break;
            }
        }
    }
}
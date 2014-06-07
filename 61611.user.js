// ==UserScript==
// @name         SmileyGlob
// @namespace    http://muskratwaltz.com
// @description  Adds regular expression matching to SomethingAwful.com emoticons
// @version      2.4
// @include      http://forums.somethingawful.com/newthread.php*
// @include      http://forums.somethingawful.com/newreply.php*
// @include      http://forums.somethingawful.com/editpost.php*
// ==/UserScript==

var goatse_my_sorry_ass = false; // Should I goatse your sorry ass?
var update_interval = 60 * 60; // Time between updates in seconds
var smileys = new Object(); // Holds all smileys
var av_exts = new Array("gif", "png", "jpg", "jpeg");
var nbsp = "&nbsp;";

var say_url = "http://muskratwaltz.com/smileyglob/say.cgi"; // URL of say script
var av_url = "http://fi.somethingawful.com/customtitles/title-";

var vbform = document.forms.namedItem("vbform"); // The sa reply form
var vbmessage = vbform.elements.namedItem("message"); // The message text area

var glob_regexp = /:\/(.+?)\/:/g; // Matches glob patterns in message text.
var simple_regexp = /:\[(.+?)\]:/g; // Simple values use direct equality test
var say_regexp = /:say-(.+?):/g; // Says might have colons
var av_regexp = /:av-([^:]+?):/g; // But I don't want to search extra usernames
var text_regexp = /:text\[(.+)\](\((\d+)\))?-(.+?):/g; // Matches smiley text patterns.
var all_regexp = new RegExp("((" + glob_regexp.source + ")|"
                                 + "(" + simple_regexp.source + ")|"
                                 + "(" + say_regexp.source + ")|"
                                 + "(" + av_regexp.source + ")|"
                                 + "(" + text_regexp.source + "))"); // Matches all smiley patterns

var open_bird = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[img]http://imgur.com/KERfS.gif[/img]\n[img]http://imgur.com/mG9qY.gif[/img]";
var close_bird = "[img]http://imgur.com/ZxTe8.gif[/img]\n&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp[img]http://imgur.com/vnfLe.gif[/img]";

var alphabet = {"!":["@@@","@@@"," @ ","   "," @ ","   "],",":["  ","  ","  "," @","@ ","  "],".":["  ","  ","  ","@@","@@","  "],"?":[" @@@ ","@   @","   @ ","   @ ","     ","   @ ","     "],"A":["  @  "," @ @ ","@   @","@@@@@","@   @","     "],"C":[" @@@","@   ","@   ","@   "," @@@","    "],"B":["@@@  ","@  @ ","@@@@ ","@   @","@@@@ ","     "],"E":["@@@@","@   ","@@@@","@   ","@@@@","    "],"D":["@@@  ","@  @ ","@   @","@  @ ","@@@  ","     "],"G":[" @@@ ","@    ","@  @@","@   @"," @@@ ","     "],"F":["@@@@","@   ","@@@ ","@   ","@   ","    "],"I":["@@@"," @ "," @ "," @ ","@@@","   "],"H":["@  @","@  @","@@@@","@  @","@  @","    "],"K":["@  @","@ @ ","@@  ","@ @ ","@  @","    "],"J":[" @@@","  @ ","  @ ","@ @ ","@@  ","    "],"M":["@   @","@@ @@","@ @ @","@   @","@   @","     "],"L":["@   ","@   ","@   ","@   ","@@@@","    "],"O":[" @@@ ","@   @","@   @","@   @"," @@@ ","     "],"N":["@   @","@@  @","@ @ @","@  @@","@   @","     "],"Q":[" @@@  ","@   @ ","@ @ @ ","@  @@ "," @@@ @","      "],"P":["@@@@ ","@   @","@@@@@","@    ","@    ","     "],"S":[" @@@ ","@    "," @@@ ","    @","@@@@ ","     "],"R":["@@@@  ","@   @ ","@@@@  ","@   @ ","@    @","      "],"U":["@   @","@   @","@   @","@   @"," @@@ ","     "],"T":["@@@@@","  @  ","  @  ","  @  ","  @  ","     "],"W":["@     @","@     @","@  @  @","@ @ @ @"," @   @ ","       "],"V":["@     @","@     @"," @   @ ","  @ @  ","   @   ","       "],"Y":["@   @"," @ @ ","  @  ","  @  ","  @  ","     "],"X":["@   @"," @ @ ","  @  "," @ @ ","@   @","     "],"Z":["@@@@@","   @ ","  @  "," @   ","@@@@@","     "]};
var rows_per_letter = 5; // Rows in each letter in alphabet.
var spacer = "[img]http://muskratwaltz.com/spacer.gif[/img]";

/**
 * I wrote a map function and ended up not needing it so here we are.
 */
function map(f, l)
{
    var r = new Array();
    for each (var ln in l)
    {
        r.push(f(ln));
    }
    return r;
}

function take_while(item, list, start)
{
    for (var i = start; list[i] == item; i++)
    {
        // Pass
    }
    if (list instanceof String)
    {
        return list.substring(start, i);
    }
    else
    {
        return list.slice(start, i);
    }
}

function multiply(str, x)
{
    var res = "";
    for (var i = 0; i < x; i++)
    {
        res += str;
    }
    return res;
}

function prefix_in(string, prefixes, i)
{
    for each (var prefix in prefixes)
    {
        if (string.substr(i, prefix.length) == prefix)
        {
            return prefix;
        }
    }
    return null;
}

/**
 * Return all elements with a given class name.
 * From http://www.dustindiaz.com/getelementsbyclass/
 */
function getElementsByClass(searchClass,node,tag) {
    var classElements = new Array();
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

function fractional(num)
{
    return num - parseInt(num);
}

/**
 * Merges the key/value pairs of two Objects, giving preference to the first.
 */
function merge_objects (obj1, obj2, overwrite)
{
    if (overwrite == undefined)
    {
        overwrite = false;
    }

    for (var key in obj2)
    {
        if (!obj1.hasOwnProperty(key) || overwrite)
        {
            obj1[key] = obj2[key];
        }
    }
}

/**
 * Converts an object into a string where key/value pairs are separated by
 * newlines and keys and values are separated by tabs.
 */
function object_to_string(obj)
{
    var res = "";
    for (var key in obj)
    {
        res += key + "\t" + obj[key] + "\n";
    }
    return res;
}

/**
 * Converts a string of the format described for object_to_string() into
 * an object.
 */
function string_to_object(str)
{
    var res = new Object();
    str = str.replace("\f", "", "g"); // Sometimes pesky other-system newlines
    str = str.replace("\r", "", "g"); // get in my data.
    var lines = str.split("\n");
    for each (var line in lines)
    {
        var pair = line.split("\t");

        if (pair.length != 2 || pair[0].length == 0)
        {
            continue;
        }

        res[pair[0]] = pair[1];
    }
    return res;
}

function get_spacer_img(spaces, width)
{
    if (!spaces)
    {
        spaces = 1;
    }
    if (!width)
    {
        width = 15;
    }
    
    var img = "";
    var remaining_width = spaces * width;
    var cur_spacer = 100;
    while (remaining_width > 0)
    {
        var mult = parseInt(remaining_width / cur_spacer);
        
        if (mult == 0)
        {
            cur_spacer--;
            continue;
        }
        
        var code = "[img]http://muskratwaltz.com/space/"
                   + "spacer" + cur_spacer + ".gif[/img]";
        img += multiply(code, mult);
        
        remaining_width -= cur_spacer * mult;
        cur_spacer--;
    }
    return img;
}

/**
 * Returns a string that spells out the contents of text by formatting the
 * smileys appearing in smileys so that they resemble the letters.
 */
function smiley_text(text, smiley_names, width)
{
    var smiley_codes = new Array();
    for each (var smiley in smiley_names) // Filters valid smileys
    {
        if (smileys.hasOwnProperty(smiley))
        {
            smiley_codes.push(smileys[smiley]);
        }
    }
    
    text = text.toUpperCase(); // There are only ascii art representations of caps
    var res = "";
    var cur_smiley = 0;
    for (var row = 0; row < rows_per_letter; row++)
    {
        for each (var chr in text)
        {
            if (!alphabet.hasOwnProperty(chr))
            {
                continue;
            }

            var cur_row = alphabet[chr][row];
            for (var i = 0; i < cur_row.length; i++)
            {
                var spaces = take_while(" ", cur_row, i);
                if (spaces.length > 0)
                {
                    res += get_spacer_img(spaces.length, width);
                    i += spaces.length - 1;
                }
                else
                {
                    res += smiley_codes[cur_smiley % smiley_codes.length];
                    cur_smiley++;
                }
            }
            res += get_spacer_img(1, width); // Spacing between letters
        }
        res += "\n";
    }
    return res;
}

/**
 * Goes through the contents of message and replaces strings of > 3 spaces with
 * '&nbsp;'s as long as the spaces don't occur between tags that handle their
 * own formatting such as '[pre]'.
 */
function expand_spaces(message)
{
    var exclude_open = new Array("[code]", "[pre]", ":[", ":/");
    var exclude_close = new Array("[/code]", "[/pre]", "]:", "/:");
    var open, close;
    var colon_on = false;
    
    var level = 0;
    var store_unformatted = false;
    var store_formatted = false;
    var last_store = 0;
    
    var res = "";
    
    for (var i = 0; i < message.length; )
    {
        var initial_i = i;
        
        if (open = prefix_in(message, exclude_open, i)) // Or in pre-formatted tag
        {
            level++;
            i += open.length;
        }

        if (close = prefix_in(message, exclude_close, i))
        {
            level--;
            i += close.length;
        }
        
        level = Math.max(level, 0);
        
        var spaces = take_while(" ", message, i);
        if (level == 0 && spaces.length >= 3)
        {
            i += spaces.length;
            res += message.substring(initial_i, i).replace(" ", "&nbsp;", "g");
        }
        else
        {
            i++;
            res += message.substring(initial_i, i);
        }
    }

    return res;
}

/**
 * Replaces escapes in smiley codes that are necessary since they are stored
 * in a format with significant newlines and tabs.
 */
function unescape_smiley(smiley)
{
    var res = "";
    for (var i = 0; i < smiley.length; i++)
    {
        if (smiley.charAt(i) == "\\" && i != smiley.length-1)
        {
            switch (smiley.charAt(i+1))
            {
                case "n":
                    res += "\n";
                    break;
                case "t":
                    res += "\t";
                    break;
                case "\\":
                    res += "\\";
                    break;
                default:
                    res += "\\" + smiley.charAt(i+1);
                    break;
            }
            i++;
        }
        else
        {
            res += smiley.charAt(i);
        }
    } 
    return res;
}

/**
 * Returns the current time in seconds since the epoch.
 */
function current_time()
{
    return parseInt((new Date()).getTime() / 1000); // Current time in seconds
}

/**
 * Returns the number of seconds since the local smiley database was last
 * updated from the server.
 */
function time_since_last_update()
{
    var last_update = localStorage.getItem("last_update"); // Last update time
    last_update = last_update ? last_update : 0; // 0 if not yet stored

    return current_time() - last_update;
}

/**
 * Loads smileys from local storage. Initiates update if update_interval
 * has passed since last update.
 */ 
function load_smileys()
{
    if (time_since_last_update() > update_interval)
    {
        update_smileys();
    }

    var local_smileys = localStorage.getItem("smileys");
    if (local_smileys)
    {
        merge_objects(smileys, string_to_object(local_smileys), true);
    }
}

/**
 * Stores smileys once they are downloaded.
 */
function store_smileys(response, verbose)
{
    var text = document.createTextNode("You're up to date!");
    vbmessage.parentNode.appendChild(text);

    if (verbose)
    {
        var new_smileys = response.responseText.split("\n").length - 1;
        alert("Loaded " + new_smileys + " new smileys.");
    }

    merge_objects(smileys, string_to_object(response.responseText), true);
    localStorage.setItem("smileys", object_to_string(smileys));
    localStorage.setItem("last_update", current_time());
}

/**
 * Transfers new smileys from the central database.
 */
function update_smileys(verbose)
{
    if (verbose == undefined)
    {
        verbose = false;
    }

    var last_update = localStorage.getItem("last_update");
    last_update = last_update ? last_update : 0;

    var request_details = new Object();
    request_details.method = "POST";
    request_details.headers =
        {"Content-Type": "application/x-www-form-urlencoded"};
    request_details.url = "http://muskratwaltz.com/smileyglob/update.cgi";
    request_details.data = "cutoff=" + last_update.toString();
    request_details.onload =
        function (response)
        {
            store_smileys(response, verbose);
        };
        
    GM_xmlhttpRequest(request_details);
}

function clear_database()
{
    localStorage.clear();
    localStorage.setItem("last_update", 0);
    localStorage.setItem("smileys", "");
    smileys = new Object();
}

function replace_av_glob(username, url)
{
    var message = vbmessage.value;
    var smiley = ":av-" + username + ":";
    var img = "[img]" + url + "[/img]";
    message = message.replace(smiley, img, "g");
    vbmessage.value = message;
}

function handle_av_response(response, username, number, direction, last_url)
{
    if (response.status != 200) // Url no good.
    {
        if (direction == 1) // We've overshot the good ones
        {
            replace_av_glob(username, last_url);
        }
        else // We're moving down, looking for a valid url
        {
            process_av_glob(username, number - 1, -1, last_url);            
        }
    }
    else // Success!
    {
        if (direction == 1) // This url is good, maybe there are more?
        {
            process_av_glob(username, number + 1, 1, response.finalUrl);
        }
        else // Found a valid av moving down
        {
            if (last_url == '' || number == 0) // Moving down through void, found their last av
            {
                replace_av_glob(username, response.finalUrl);
            }
            else // Started at a valid url, so start moving up now.
            {
                process_av_glob(username, number + 1, 1, response.finalUrl);
            }
        }
    }
}

/**
 * Starts an AJAX request for a plausible avatar url. Starts at a number and
 * moves down. If the first url is valid, then starts searching higher numbers
 * and stops on the last valid url found.
 * Otherwise keeps moving down and stops on the first valid url found.
 */
function process_av_glob(username, number, direction, last_url)
{
    if (number < 0)
    {
        return;
    }
    
    var title_num = parseInt(number / av_exts.length) + 1;
    var ext_num = number % av_exts.length;
    var filename = username;
    if (title_num > 1)
    {
        filename += "-" + title_num;
    }
    filename += "." + av_exts[ext_num];
    
    var request_details = new Object();
    request_details.method = "GET";
    request_details.url = av_url + filename;
    request_details.onload = 
        function (response)
        {
            handle_av_response(response, username, number, direction, last_url);
        };
    
    GM_xmlhttpRequest(request_details);
}

/**
 * Finds the given user's avatar and replaces :av-username: patterns with the
 * bbcode for the image.
 */
function get_av(username)
{
    // Usernames are translated for av urls
    var username_format = username.toLowerCase();
    username_format = username_format.replace(' ', '_', 'g');
    var message = vbmessage.value;
    message = message.replace(
        ":av-" + username + ":", ":av-" + username_format + ":");
    vbmessage.value = message;
    process_av_glob(username_format, 2 * av_exts.length, -1, '');
}

/**
 * Given a string, compiles it to a regular expression and tests all known
 * emoticons against it. Returns a string with the codes to display the
 * matched emoticons.
 */
function matched_smileys(pat)
{
    if (pat == "*") // Get a random smiley
    {
        var index = parseInt(Math.random() * smileys.__count__ - 1);
        var i = 0;
        for each (var smiley in smileys)
        {
            if (i == index)
            {
                return smiley;
            }
            i++;
        }
    }

    var res = "";
    pat = new RegExp(pat); // Interpret pat as regexp
        
    for (var name in smileys)
    {
        if (pat.test(name))
        {
            res += unescape_smiley(smileys[name]);
        }
    }

    return res;
}

/**
 * Grabs the text in the message box and searches it for glob patterns.
 * If it finds any it replaces them with the code to display the matched
 * results.
 */
function do_glob()
{
    var message = vbmessage.value;

    if (goatse_my_sorry_ass)
    {
        for (var match = all_regexp.exec(message);
             match != null;
             match = all_regexp.exec(message))
        {
            message = message.replace(
                match[0], "[IMG]http://i33.tinypic.com/244w4lu.jpg[/IMG]");
        }
        vbmessage.value = message;
        return;
    }

    // Smiley text patterns
    for (var match = text_regexp.exec(message);
         match != null;
         match = text_regexp.exec(message))
    {
        var pattern_str = match[0];
        var text_smileys = match[1];
        text_smileys = text_smileys.split(',');
        var width = match[3];
        width = width ? parseInt(width) : 15;
        var text = match[4];
        var converted_text = smiley_text(text, text_smileys, width);
        message = message.replace(pattern_str, converted_text, "g");
    }

    // Regular expression globs
    for (var match = glob_regexp.exec(message); // Exec returns subsequent
         match != null;                         // matches each call.
         match = glob_regexp.exec(message))
    {
        var pattern_str = match[0];
        var got_smileys = matched_smileys(match[1]);
        if (got_smileys.length > 0)
        {
            message = message.replace(pattern_str, got_smileys, "g");
        }
    }

    // Simple dictionary key checks
    for (var match = simple_regexp.exec(message); // Test simple matches.
         match != null;
         match = simple_regexp.exec(message))
    {
        var pattern_str = match[0];
        var key = match[1];
        if (smileys[key] != undefined)
        {
            message = message.replace(
                pattern_str, unescape_smiley(smileys[key]), "g");
        }
    }
    
    // Speech bubbles
    for (var match = say_regexp.exec(message);
         match != null;
         match = say_regexp.exec(message))
    {
        var pattern_str = match[0];
        var say = encodeURIComponent(unescape_smiley(match[1]));
        var img = "[img]" + say_url + "?say=" + say + "[/img]";
        message = message.replace(pattern_str, img, "g");
    }
    
    // More than 3 spaces in a row get expanded to non-breaking spaces
    message = expand_spaces(message);
    
    // That fukken bird XD
    message = message.replace("[bird]", open_bird, "g");
    message = message.replace("[/bird]", close_bird, "g");

    vbmessage.value = message;

    // Avatar replacements. Actual replacement happens after AJAX call.
    var processed_names = new Array(); // Avs are expensive, each name only once
    for (var match = av_regexp.exec(message);
         match != null;
         match = av_regexp.exec(message))
    {
        var pattern_str = match[0];
        var username = match[1];
        if (processed_names.indexOf(username) < 0)
        {
            processed_names.push(username);
            get_av(username);
        }
    }

}

/**
 * Sets up interface. Adds butans, modifies event handlers, etc.
 */
function set_up()
{
    vbmessage.parentNode.appendChild(document.createElement("br"));
    
    // Explicit glob button
    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Smiley glob");
    button.addEventListener("click", do_glob, true);
    vbmessage.parentNode.appendChild(button);

    // Explicit update button. Sets verbose to true so user will be alerted on
    // completion.
    button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Update smileys");
    button.addEventListener("click", function(){update_smileys(true);}, true);
    vbmessage.parentNode.appendChild(button);
    
    var link = document.createElement("a");
    link.setAttribute("href", "http://muskratwaltz.com/smileyglob/browse.cgi");
    link.setAttribute("target", "smileyglobwindow");
    link.appendChild(document.createTextNode("Browse the database"));
    vbmessage.parentNode.appendChild(link);

    // Display time since last update.
    var time_til_update = update_interval - time_since_last_update();
    time_til_update /= 60;
    var text;
    if (time_til_update > 0)
    {
        text = "Automatic update in " + time_til_update.toFixed(1) + " minutes.";
    }
    else
    {
        text = "Updating now...";
    }
    text = document.createTextNode(text);
    vbmessage.parentNode.appendChild(text);

    // Update form submission to perform glob first
    var default_handler = vbform.getAttribute("onsubmit");
    vbform.setAttribute("onsubmit", "");
    vbform.addEventListener("submit", do_glob, true);

    // Add menu to completely reload database. Put in menu to save bandwidth
    // from noobs!!!
    GM_registerMenuCommand(
        "Reset database", function(){clear_database(); update_smileys(true);});

    // Add menu item to completely delete database. Mainly for testing.
    GM_registerMenuCommand("Clear Database", clear_database);

    var nav_elements = getElementsByClass("breadcrumbs");
    goatse_my_sorry_ass = true; // Guilty until proven innocent.
    for each (var el in nav_elements)
    {
        if (el.innerHTML.indexOf("YOSPOS") >= 0)
        {
            goatse_my_sorry_ass = false;
            break;
        }
    }
}

// Main: Let's get things going!

load_smileys();
set_up();





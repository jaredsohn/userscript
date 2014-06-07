// ==UserScript==
// @name           Dragon Cave Lister
// @author         Raphael Quinet
// @version        2011-06-13
// @licence        (CC) by-sa
// @namespace      http://userscripts.org/scripts/show/54347
// @description    Lists the HTML code and BB code for all eggs and hatchlings on a scroll
// @include        http://dragcave.net/dragons
// @include        http://dragcave.net/user/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------

var num_dragons = 0;
var dragon_checked = new Array();
var dragon_codes = new Array();
var dragon_names = new Array();

// Unique prefix for all HTML ids.
const idprefix = "dcl" + (Math.floor(Math.random() * 9000) + 1000) + "_";

// Options
const gmvalues =  ["html_prefix", "html_separator", "html_suffix", "html_alt", "html_title",
                  "bb_prefix", "bb_separator", "bb_suffix"];
const gmdefvals = ["", "\n", "", "Adopt one today!", "",
                  "", " ", ""];
const optboxes =  ["opthp", "opthe", "opths", "optha", "optht",
                  "optbp", "optbe", "optbs"];
const optdescs =  ["<b>HTML prefix</b> (Added before the dragons) ",
                  "<b>HTML separator</b> (Added between the dragons) ", 
                  "<b>HTML suffix</b> (Added after the dragons) ", 
                  "<b>HTML alt text</b> (Displayed when the images cannot be loaded) ", 
                  "<b>HTML title</b> (Displayed when the mouse stays over the images) ", 
                  "<b>BBcode prefix</b> (Added before the dragons) ",
                  "<b>BBcode separator</b> (Added between the dragons) ", 
                  "<b>BBcode suffix</b> (Added after the dragons) "];

// XPath helper function
function $xpath(expression, contextNode, type)
{
    return (contextNode.nodeType == 9 ? contextNode : contextNode.ownerDocument)
        .evaluate(expression, contextNode, null, type, null);
}

// Replace the special character sequences "%c", "%n", "%u" in a string.
// - "%c" is replaced by the dragon code (4 or 5 characters)
// - "%n" is replaced by the name of the hatchling, or its code if it has no name
// - "%u" is replaced by the name of the hatchling, or "Unnamed" if it has no name
function replace_name_code(text, dragon_name, dragon_code)
{
    if (text == null) {
        return null;
    }
    if (dragon_code == null) {
        dragon_code = "????";
    }
    text = text.replace(/%c/g, dragon_code);
    if (dragon_name != null) {
        return text.replace(/%n/g, dragon_name).replace(/%u/g, dragon_name);
    } else {
        return text.replace(/%n/g, dragon_code).replace(/%u/g, "Unnamed");
    }
}

// Toggle the visibility of the option boxes
function toggle_options(e) {
    var optionsdiv = document.getElementById(idprefix + "optbox");
    var optionslink = document.getElementById(idprefix + "optlink");
    if (optionsdiv != null && optionslink != null) {
        if (optionsdiv.style.display == "none") {
            optionsdiv.style.display = "block";
            optionslink.innerHTML = "Hide options...";
            if (optionsdiv.offsetHeight > window.innerHeight) {
                window.scrollBy(0, window.innerHeight / 2);
            } else {
                window.scrollBy(0, optionsdiv.offsetHeight);
            }
        } else {
            optionsdiv.style.display = "none";
            optionslink.innerHTML = "Show options...";
        }
        e.preventDefault();
        e.stopPropagation();
    }
}

// Count the number of characters in a textarea and update the corresponding counter
function update_count(boxname) {
    var textarea = document.getElementById(idprefix + boxname + "box");
    if (textarea != null) {
        var n = textarea.value.length;
        var counter = document.getElementById(idprefix + boxname + "count");
        if (counter != null) {
            if (n == 0) {
                counter.innerHTML = " - empty";
            } else if (n == 1) {
                counter.innerHTML = " - " + n + " character";
            } else {
                counter.innerHTML = " - " + n + " characters";
            }
        }
    }
}

// Generate the HTML code
function update_htmlbox() {
    var html_alt = GM_getValue("html_alt", "Adopt one today!");
    var html_title = GM_getValue("html_title", "");
    var text = GM_getValue("html_prefix", "");
    var add_sep = false;
    for (var i = 0; i < num_dragons; i++) {
        if (dragon_checked[i]) {
            if (add_sep) {
                text += GM_getValue("html_separator", "\n");
            }
            text += "<a href=\"http://dragcave.net/view/" + dragon_codes[i]
                + "\"><img src=\"http://dragcave.net/image/" + dragon_codes[i]
                + ".gif\" style=\"border-width: 0\"";
            if (html_alt != null && html_alt != "") {
                text += " alt=\""
                    + replace_name_code (html_alt, dragon_names[i], dragon_codes[i]) + "\"";
            }
            if (html_title != null && html_title != "") {
                text += " title=\""
                    + replace_name_code (html_title, dragon_names[i], dragon_codes[i]) + "\"";
            }
            text += "/></a>";
            add_sep = true;
        }
    }
    text += GM_getValue("html_suffix", "");
    var html_textarea = document.getElementById(idprefix + "htmlbox");
    if (html_textarea != null) {
        html_textarea.value = text;
        update_count ("html");
    }
}

// Generate the BBcode
function update_bbbox() {
    var text = GM_getValue("bb_prefix", "");
    var add_sep = false;
    for (var i = 0; i < num_dragons; i++) {
        if (dragon_checked[i]) {
            if (add_sep) {
                text += GM_getValue("bb_separator", " ");
            }
            text += "[url=http://dragcave.net/view/" + dragon_codes[i]
                + "][img]http://dragcave.net/image/" + dragon_codes[i]
                + ".gif[/img][/url]";
            add_sep = true;
        }
    }
    text += GM_getValue("bb_suffix", "");
    var bb_textarea = document.getElementById(idprefix + "bbbox");
    if (bb_textarea != null) {
        bb_textarea.value = text;
        update_count ("bb");
    }
}

// Insert the current values in each of the option boxes
function update_options() {
    for (var i in optboxes) {
        var textarea = document.getElementById(idprefix + optboxes[i] + "box");
        if (textarea != null) {
            var val = GM_getValue(gmvalues[i], gmdefvals[i]);
            if (val != null) {
                textarea.value = val;
            } else {
                textarea.value = "";
            }
        }
        update_count(optboxes[i]);
    }
}

// Set the options for this script according to the values of the option boxes
function submit_options(e) {
    console.log ("submit options");
    for (var i in optboxes) {
        var textarea = document.getElementById(idprefix + optboxes[i] + "box");
        if (textarea != null) {
            GM_setValue(gmvalues[i], textarea.value);
        }
    }
    update_htmlbox();
    update_bbbox();
    //    toggle_options(e);
}

// Reset the options for this script to their default values
function reset_options(e) {
    for (var i in optboxes) {
        GM_setValue(gmvalues[i], gmdefvals[i]);
    }
    update_htmlbox();
    update_bbbox();
    update_options();
    //    toggle_options(e);
}

// Insert our custom code in the page
function init()
{
    var num_adults = 0;
    var num_hatchlings = 0;
    var num_eggs = 0;
    var num_males = 0;
    var num_females = 0;
    var num_no_gender = 0;
    var num_frozen = 0;
    var num_total = 0;
    var dragon_pages = new Array();
    var dragon_images = new Array();
    // Find the eggs and hatchlings
    var items = $xpath('//tr/td/a/img', document.getElementById('middle'), XPathResult.ANY_TYPE);
    var item = null;
    while ( (item = items.iterateNext()) != null ) {
        var td_type = item.parentNode.parentNode.parentNode.childNodes[2];
        var desc = td_type.textContent;
        var frozen = false;
        if (td_type.childNodes.length == 1) {
            // Descriptions using Unicode symbols
            if (desc.indexOf("❄") >= 0) { // Unicode snowflake U+2744
                frozen = true;
            }
            if (desc.indexOf("♀") >= 0) { // Unicode female symbol U+2640
                num_females++;
            } else if (desc.indexOf("♂") >= 0) { // Unicode male symbol U+2642
                num_males++;
            } else {
                num_no_gender++;
            }
        } else {
            var gender_found = false;
            for (var i = 0; i < td_type.childNodes.length; i++) {
                if (td_type.childNodes[i].nodeName.toLowerCase() == "img") {
                    // Descriptions using inline images
                    if (td_type.childNodes[i].getAttribute("src").indexOf("frozen") >= 0) {
                        frozen = true;
                    }
                    if (td_type.childNodes[i].getAttribute("src").indexOf("female") >= 0) {
                        num_females++;
                        gender_found = true;
                    } else if (td_type.childNodes[i].getAttribute("src").indexOf("male") >= 0) {
                        num_males++;
                        gender_found = true;
                    }
                } else if (td_type.childNodes[i].nodeName.toLowerCase() == "span") {
                    // Description using a special span node
                    var sdesc = td_type.childNodes[i].textContent;
                    if (sdesc.indexOf("F") >= 0) {
                        frozen = true;
                    }
                    if (sdesc.indexOf("f") >= 0) {
                        num_females++;
                        gender_found = true;
                    } else if (sdesc.indexOf("m") >= 0) {
                        num_males++;
                        gender_found = true;
                    }
                }
            }
            if (! gender_found) {
                num_no_gender++;
            }
        }
        if (((desc.indexOf("Egg") == 0) || (desc.indexOf("Hatchling") == 0)
             || (desc.indexOf("Seed") == 0) || (desc.indexOf("Sprout") == 0))
            && (frozen == false)) {
            var dragon_page = item.parentNode.getAttribute('href');
            var dragon_name = item.parentNode.parentNode.parentNode.childNodes[1].textContent;
            if (dragon_name != null
                && (dragon_name == "Unnamed" || dragon_name == String.fromCharCode(160))) {
                dragon_name = null;
            }
            dragon_checked[num_dragons] = true;
            dragon_names[num_dragons] = dragon_name;
            dragon_codes[num_dragons] = dragon_page.substr(dragon_page.indexOf("/", 1) + 1);
            dragon_pages[num_dragons] = dragon_page;
            dragon_images[num_dragons] = item.getAttribute('src');
            num_dragons++;
        }
        if ((desc.indexOf("Egg") == 0) || (desc.indexOf("Seed") == 0)) {
            num_eggs++;
        }
        if ((desc.indexOf("Hatchling") == 0) || (desc.indexOf("Sprout") == 0)) {
            if (frozen) {
                num_frozen++;
            } else {
                num_hatchlings++;
            }
        }
        if (desc.indexOf("Adult") == 0) {
            num_adults++;
        }
        num_total++;
    }

    var middlediv = document.getElementById("middle");
    if (middlediv) {
        var newdiv = document.createElement("div");
        newdiv.style.width = "90%";
        newdiv.style.textAlign = "center";
        newdiv.style.margin = "0px auto";
        var ihtml = "<br/><b>Scroll statistics</b><i> - " + num_total + " dragons</i><br/>"
            + num_eggs + " eggs, " + num_hatchlings + " hatchlings, "
            + num_frozen + " frozen hatchlings, " + num_adults + " adults.<br/>"
            + num_females + " females, " + num_males + " males, "
            + num_no_gender + " unknown or no gender.<br/>";
        if (num_dragons > 0) {
            ihtml += "<br/><b>Eggs and hatchlings</b><br/>\n";
            ihtml += "<table style=\"margin: auto;\"><tr>\n";
            for (var i = 0; i < num_dragons; i++) {
                ihtml += "<td style=\"vertical-align: bottom\"><a href=\"" + dragon_pages[i]
                    + "\"><img src=\"" + dragon_images[i] + "\" alt=\"" + dragon_codes[i]
                    + "\" style=\"border: 0\" /></a><br/><input type=\"checkbox\" name=\""
                    + idprefix + dragon_codes[i] + "\" id=\"" + idprefix + dragon_codes[i]
                    + "\" checked=\"checked\" /></td>\n";
            }
            ihtml += "</tr></table>\n";
            ihtml += "<b>HTML code</b><i id=\"" + idprefix + "htmlcount\"></i><br/>\n";
            ihtml += "<textarea name=\"" + idprefix + "htmlbox\" id=\"" + idprefix
                + "htmlbox\" style=\"width: 100%;\" rows=\"" + (1 + num_dragons * 2)
                + "\"></textarea><br/>\n";
            ihtml += "<b>BBcode (for forum signatures)</b><i id=\"" + idprefix
                + "bbcount\"></i><br/>\n";
            ihtml += "<textarea name=\"" + idprefix + "bbbox\" id=\"" + idprefix
                + "bbbox\" style=\"width: 100%;\" rows=\"" + Math.floor(1 + num_dragons * 1.3)
                + "\"></textarea><br/>\n";
        }
        ihtml += "<a href=\"#\" id=\"" + idprefix + "optlink\">Show options...</a>";
        newdiv.innerHTML = ihtml;
        middlediv.appendChild(newdiv);

        if (document.URL.indexOf("/user/") >= 0) {
            var note = document.createElement("div");
            note.style.width = "90%";
            note.style.textAlign = "center";
            note.style.margin = "0px auto";
            note.innerHTML = "<i>(Please note that it is against the site rules to "
                + "give aid to a user without their permission.)</i>";
            middlediv.appendChild(note);
        }

        // Add an invisible div for the script options
        var optionsdiv = document.createElement("div");
        optionsdiv.id = idprefix + "optbox";
        optionsdiv.style.width = "90%";
        optionsdiv.style.textAlign = "center";
        optionsdiv.style.margin = "0px auto";
        optionsdiv.style.marginTop = "1em";
        optionsdiv.style.border = "2px #44300B solid";
        optionsdiv.style.setProperty("-moz-border-radius", "8px", "");
        optionsdiv.style.display = "none";
        ihtml = "<p style=\"background-color: #44300B; color: #E9DABB; width: 100%;"
            + " padding: 0px; margin: 0px;\"><b>Dragon Cave Lister Options</b></p>";
        ihtml += "<form name=\"" + idprefix + "optform\" id=\"" + idprefix + "optform\""
            + " action=\"javascript:void(0)\">\n";
        for (var i in optboxes) {
            ihtml += "<br/>" + optdescs[i] + "<i id=\"" + idprefix + optboxes[i]
                + "count\"></i><br/>\n<textarea name=\"" + idprefix + optboxes[i]
                + "box\" id=\"" + idprefix + optboxes[i]
                + "box\" style=\"width: 90%;\" rows=\"1\"></textarea>\n"; // will be filled later
        }
        ihtml += "<input type=\"button\" value=\"Reset options\" id=\"" + idprefix + "optrst\" />";
        ihtml += "<input type=\"submit\" value=\"Save options\" />";
        ihtml += "<br/><div style=\"font-size: 8pt; text-align: left; margin: 1em;"
            + " margin-left: 3em;\">In the HTML alt and HTML title texts, the special codes"
            + " <b>%c</b>, <b>%n</b> and <b>%u</b> will be replaced as follows:<br/>\n"
            + "- <b>%c</b> is replaced by the 4-characters code of the egg or hatchling<br/>\n"
            + "- <b>%n</b> is replaced by the name of the hatchling, or its code if it has no"
            + " name<br/>\n"
            + "- <b>%u</b> is replaced by the name of the hatchling, or 'Unnamed' if it has no"
            + " name</div>\n"
        ihtml += "\n</form>\n";
        optionsdiv.innerHTML = ihtml;
        middlediv.appendChild(optionsdiv);

        // Once the DOM is ready, add click handlers and update the HTML and BBcode boxes
        setTimeout(function() {
            for (var i = 0; i < num_dragons; i++) {
                var input = document.getElementById(idprefix + dragon_codes[i]);
                if (input != null) {
                    (function (i, input) {  // use closures to save i and input
                        input.addEventListener("click", function () {
                            dragon_checked[i] = input.checked;
                            update_htmlbox();
                            update_bbbox();
                        }, false);
                    }) (i, input);
                }
            }
            for (var i in optboxes) {
                var textarea = document.getElementById(idprefix + optboxes[i] + "box");
                if (textarea != null) {
                    (function (boxname) {
                        textarea.addEventListener("change", function () { update_count(boxname); },
                                                  false);
                    }) (optboxes[i]);
                }
            }
            var textarea = document.getElementById(idprefix + "htmlbox");
            if (textarea != null) {
                textarea.addEventListener("change", function () { update_count("html"); },
                                          false);
            }
            textarea = document.getElementById(idprefix + "bbbox");
            if (textarea != null) {
                textarea.addEventListener("change", function () { update_count("bb"); },
                                          false);
            }
            update_options();
            update_htmlbox();
            update_bbbox();
            var optform = document.getElementById(idprefix + "optform");
            if (optform != null) {
                optform.addEventListener("submit", submit_options, false);
            }
            var optreset = document.getElementById(idprefix + "optrst");
            if (optreset != null) {
                optreset.addEventListener("click", reset_options, false);
            }
            var optlink = document.getElementById(idprefix + "optlink");
            if (optlink != null) {
                optlink.addEventListener("click", toggle_options, false);
            }
        }, 100);
    }
}

init();

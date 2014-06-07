// ==UserScript==
// @name           Craigslist highlighting
// @namespace      https://github.com/nickknw
// @include        http://*.craigslist.ca/search/apa*
// @include        http://*.craigslist.ca/apa*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// just finished using vars for colours
// have to make the help link do something

var darkerPositiveMatchColour = "#69EF68";
var darkerNegativeMatchColour = "#EFB3B3";

var positiveMatchColour = "#AAFFAA";
var negativeMatchColour = "#FFDDDD";

var timeMatchColour = "#BBBBFF";

// Pre-calculated Phrases {{{

var goodPhrases = new Array("% negotiable", "% considered", "% permitted", "% ok", "%s ok", "%s are OK - purrr", "maybe a %", "%s are OK - wooof");
var badPhrases = new Array("no %\b", "no %s", "%s not permitted", "no %s permitted");

var petGoodPhrases = replaceInArray(goodPhrases, "pet");
var petBadPhrases = replaceInArray(badPhrases, "pet")

var catGoodPhrases = replaceInArray(goodPhrases, "cat");
var catBadPhrases = replaceInArray(badPhrases, "cat");

var dogGoodPhrases = replaceInArray(goodPhrases, "dog");
var dogBadPhrases = replaceInArray(badPhrases, "dog");

var dishwasherGoodPhrases = new Array("dishwasher");
var dishwasherBadPhrases = new Array("no dishwasher");

var fireplaceGoodPhrases = new Array("fireplace");
var fireplaceBadPhrases = new Array("no fireplace");

var balconyGoodPhrases = new Array("balcony");
var balconyBadPhrases = new Array("no balcony");

var timesAvailable = new Array("January", "Jan", "February", "Feb", "March", "Mar", "April", "Apr", "June", "Jun", "July", "Jul", "August", "Aug", "September", "Sept", "October", "Oct", "November", "Nov", "December", "Dec", "immediately");

//make sure words like 'deck' aren't highlighted
timesAvailable = $.map(timesAvailable, function(monthName) { return (" " + monthName + "[. ]"); });

// }}}

// User-Set Variables {{{

var user_rentMin;
var user_rentMax;

var user_catsOn;
var user_dogsOn;
var user_fireplaceOn;
var user_balconyOn;
var user_dishwasherOn;

var user_goodLocations;
var user_badLocations;
var user_desirablePhrases;
var user_undesirablePhrases;

// }}}

// Main Function {{{

$(document).ready(function() {

    craigslistHighlighterIsOn = GM_getValue('user_highlighterIsOn', true)

    if($("#searchtable").length > 0) {

        // on/off switch with listener 
        $("#searchtable > tbody").append(onOffSwitch(craigslistHighlighterIsOn));
        document.getElementById("powerOn").addEventListener('click', function(){ toggleCraigslistHighlighter(craigslistHighlighterIsOn, "on");}, false);
        document.getElementById("powerOff").addEventListener('click', function(){ toggleCraigslistHighlighter(craigslistHighlighterIsOn, "off");}, false);
        

        if(!craigslistHighlighterIsOn) {
            return;
        }

        // attach listener that saves data to Search button 
        document.getElementById("searchform").addEventListener("submit", grabAndSaveUserData, false);

        // Insert extra controls
        $("#searchtable > tbody").append(preferredLocationsControl());
        $("#searchtable > tbody").append(preferredPhrasesControl());
        $("#searchtable > tbody").append(preferredFeaturesCheckboxes());
        $("#searchform").append(aboutBox());

        loadUserData();
        insertUserData();

        processListingsPage();
    }
    else {
        if(!craigslistHighlighterIsOn) {
            return; 
        }

        processIndividualPage();
    }
});

// }}}

// Helper Functions {{{

function toggleCraigslistHighlighter(highlighterIsOn, radioButtonClicked) {

    if ((highlighterIsOn && radioButtonClicked == "on") 
    || (!highlighterIsOn && radioButtonClicked == "off") ) {
        return;
    }

    GM_setValue('user_highlighterIsOn', !highlighterIsOn);

    // page refresh or form submit
    document.getElementById("searchform").submit();
}

function loadUserData() {

    user_rentMin = GM_getValue('user_rentMin', null);
    user_rentMax = GM_getValue('user_rentMax', null);

    user_catsOn = GM_getValue('user_catsOn', null);
    user_dogsOn = GM_getValue('user_dogsOn', null);
    user_fireplaceOn = GM_getValue('user_fireplaceOn', null);
    user_balconyOn = GM_getValue('user_balconyOn', null);
    user_dishwasherOn = GM_getValue('user_dishwasherOn', null);

    user_goodLocations = GM_getValue('user_goodLocations', null);
    user_badLocations = GM_getValue('user_badLocations', null);
    user_desirablePhrases = GM_getValue('user_desirablePhrases', null);
    user_undesirablePhrases = GM_getValue('user_undesirablePhrases', null);

    var isNotBlank = function(value) { return value != "" ? true : false };

    if(user_goodLocations == null || user_goodLocations == '') {
        user_goodLocations = [];
    }
    else {
        user_goodLocations = String.split(user_goodLocations, ",").filter(isNotBlank);
    }

    if(user_badLocations == null || user_badLocations == '') {
        user_badLocations = [];
    }
    else {
        user_badLocations = String.split(user_badLocations, ",").filter(isNotBlank);
    }

    if(user_desirablePhrases == null || user_desirablePhrases == '') {
        user_desirablePhrases = [];
    }
    else {
        user_desirablePhrases = String.split(user_desirablePhrases, ",").filter(isNotBlank);
    }

    if(user_undesirablePhrases == null || user_undesirablePhrases == '') {
        user_undesirablePhrases = [];
    }
    else {
        user_undesirablePhrases = String.split(user_undesirablePhrases, ",").filter(isNotBlank);
    }
}

function insertUserData() {

    focusAndSetValue(".min", user_rentMin);
    focusAndSetValue(".max", user_rentMax);

    $("#chkCats").attr('checked', user_catsOn);
    $("#chkDogs").attr('checked', user_dogsOn);
    $("#chkFireplace").attr('checked', user_fireplaceOn);
    $("#chkBalcony").attr('checked', user_balconyOn);
    $("#chkDishwasher").attr('checked', user_dishwasherOn);

    focusAndSetValue(".goodLocations", Array.join(user_goodLocations));
    focusAndSetValue(".badLocations", Array.join(user_badLocations));
    focusAndSetValue(".desirablePhrases", Array.join(user_desirablePhrases));
    focusAndSetValue(".undesirablePhrases", Array.join(user_undesirablePhrases));
}

// these should always be done as a pair, one after another
function grabAndSaveUserData() {

    user_rentMin = focusAndGetValue(".min");
    user_rentMax = focusAndGetValue(".max");

    user_catsOn = $("#chkCats").attr('checked');
    user_dogsOn = $("#chkDogs").attr('checked');
    user_fireplaceOn = $("#chkFireplace").attr('checked');
    user_balconyOn = $("#chkBalcony").attr('checked');
    user_dishwasherOn = $("#chkDishwasher").attr('checked');

    user_goodLocations = focusAndGetValue(".goodLocations");
    user_badLocations = focusAndGetValue(".badLocations");
    user_desirablePhrases = focusAndGetValue(".desirablePhrases");
    user_undesirablePhrases = focusAndGetValue(".undesirablePhrases");

    // save
    GM_setValue('user_rentMin', user_rentMin);
    GM_setValue('user_rentMax', user_rentMax);

    GM_setValue('user_catsOn', user_catsOn);
    GM_setValue('user_dogsOn', user_dogsOn);
    GM_setValue('user_fireplaceOn', user_fireplaceOn);
    GM_setValue('user_balconyOn', user_balconyOn);
    GM_setValue('user_dishwasherOn', user_dishwasherOn);

    GM_setValue('user_goodLocations', user_goodLocations);
    GM_setValue('user_badLocations', user_badLocations);
    GM_setValue('user_desirablePhrases', user_desirablePhrases);
    GM_setValue('user_undesirablePhrases', user_undesirablePhrases);
}

function focusAndSetValue(selector, value) {
    element = $(selector);
    if(value != null && value != '') {
        // can't use jquery's focus() with greasemonkey (security related, I think)
        element.get()[0].focus();
        element.val(value);
        element.get()[0].blur();
    }
}

function focusAndGetValue(selector) {
    element = $(selector);
    // can't use jquery's focus() with greasemonkey (security related, I think)
    element.get()[0].focus();
    elementValue = element.val();
    element.get()[0].blur();
    return elementValue;
}

// heavy lifting function; does most of the work of this script
function processListingsPage() {

    // For each listing on the listings page
    $("blockquote > p").each(function() {
        var listing = $(this);
        var text = new Object();
        text.value = listing.html();

        // is this listing in our price range?
	var price = extractPrice(text.value);
        if (user_rentMax != null && user_rentMax != '' && price > user_rentMax) {
            return;
        }

        var link = listing.children("a").attr("href");  
        if(link == null) {
            return;
        }

        // highlight the matches in the text of the link (because we don't want
        // to highlight the posting date)
        var listing_link = listing.find("a");
        text.value = listing_link.html();
        highlightLink(text);
        listing_link.html(text.value);

        // follows the listing link and retrieves the 'full listing' web page
        $.get(link, function(data, textStatus) {

            // list of words found in the full listing page
            var details = " <font size='-1'> <strong> ";         

            // regex that will find the userbody tag + contents
            var regex = /<div id="userbody">([\s\S]*)<.div>/gi;  

            // IMPORTANT: without this, the regex will fail every second 
            // time it executes because it is saving position
            regex.lastIndex = 0;                                 

            // extract the 'userbody' tag + contents
            var userbody = regex.exec(data);
            if(userbody == null) {
                return;
            }
            userbody = userbody[0];                  

            var termsFound = extractAllTermsFromPage(userbody);
            
            details += termsFound;
            details += "</strong></font>";

            // add the desired listing details to the listings page
            listing.append(details);      

            // get the updated listing text
            text.value = listing.html();  

            // give the listing the correct background colour based on location
            if(highlightWords(text, user_goodLocations, darkerPositiveMatchColour)) {
                listing.css("background-color", positiveMatchColour);
            }
            if(highlightWords(text, user_badLocations, darkerNegativeMatchColour)) {
                listing.css("background-color", negativeMatchColour);
            }
            
            var price = extractPrice(text.value);
            
            var rentMin = user_rentMin;
            if (user_rentMax != null && user_rentMax != '') {

                if (rentMin == null || rentMin == '') {
                    rentMin = user_rentMax * .75;
                }

                color = price - rentMin;

                color = color / 22;
                color = Math.floor(color);
                
                if(color < 0) { color = 0; }
                if(color > 9) { color = 9; }

                colorInHex = "#" + color + color + color + color + color + color;

                highlightDollarAmount(text, price, colorInHex);
            }

            listing.html(text.value);    //save the new listing text back into the listing

        }, "html");
    });
}

function extractAllTermsFromPage(userbody) {
    // find and extract desired words from userbody, and wrap them in the appropriate colours
    // **when optimizing, consider conglomerating all good arrays into one and bad arrays into one,
    // then going through the body text less times. Might help?
    var termsFound = "";
    termsFound += extractWords(userbody, user_goodLocations, darkerPositiveMatchColour);
    termsFound += extractWords(userbody, user_desirablePhrases, darkerPositiveMatchColour);
    termsFound += extractWords(userbody, user_badLocations, darkerNegativeMatchColour);
    termsFound += extractWords(userbody, user_undesirablePhrases, darkerNegativeMatchColour);


    // time to check for all the checkboxes
    if(user_catsOn || user_dogsOn)
    {
        termsFound += extractWords(userbody, petGoodPhrases, darkerPositiveMatchColour);
        termsFound += extractWords(userbody, petBadPhrases, darkerNegativeMatchColour);

        if(user_catsOn) {
            termsFound += extractWords(userbody, catGoodPhrases, darkerPositiveMatchColour);
            termsFound += extractWords(userbody, catBadPhrases, darkerNegativeMatchColour);
        }
        if(user_dogsOn) {
            termsFound += extractWords(userbody, dogGoodPhrases, darkerPositiveMatchColour);
            termsFound += extractWords(userbody, dogBadPhrases, darkerNegativeMatchColour);
        }
    }

    if(user_balconyOn) {
        termsFound += extractWords(userbody, balconyGoodPhrases, darkerPositiveMatchColour);
        termsFound += extractWords(userbody, balconyBadPhrases, darkerNegativeMatchColour);
    }

    if(user_fireplaceOn) {
        termsFound += extractWords(userbody, fireplaceGoodPhrases, darkerPositiveMatchColour);
        termsFound += extractWords(userbody, fireplaceBadPhrases, darkerNegativeMatchColour);
    }

    if(user_dishwasherOn) {
        termsFound += extractWords(userbody, dishwasherGoodPhrases, darkerPositiveMatchColour);
        termsFound += extractWords(userbody, dishwasherBadPhrases, darkerNegativeMatchColour);
    }

    termsFound += extractWords(userbody, timesAvailable, timeMatchColour);
    if(termsFound != "") { termsFound = "Terms Found: " + termsFound; }

    return termsFound;
}

function processIndividualPage() {

    loadUserData();

    //in the body of text and the title on each individual page
    $("#userbody, h2").each(function() {
        var text = new Object();
        text.value = $(this).html();

        highlightWords(text, user_goodLocations, positiveMatchColour);
        highlightWords(text, user_desirablePhrases, positiveMatchColour);
        highlightWords(text, user_badLocations, negativeMatchColour);
        highlightWords(text, user_undesirablePhrases, negativeMatchColour);
        highlightWords(text, timesAvailable, timeMatchColour);

        if(user_catsOn) {
            highlightWords(text, catGoodPhrases, positiveMatchColour);
        }

        $(this).html(text.value);
    });
}

// IN-PLACE highlighting of WORDS in a body of TEXT with the specified COLOR
// returns true if anything was changed
function highlightWords(text, words, color) {

    changed = false;
    for (i in words) {

        var regex = new RegExp("("+words[i]+")", "gi");
        text.value = text.value.replace(regex, " <span style='background-color: " + color + "'>$1</span> ");

        if(!changed && regex.test(text.value)) {
            changed = true;
        }
    }
    return changed;
}

function highlightDollarAmount(text, price, color) {
    var regex = new RegExp("(\\$"+price+")", "gi");
    text.value = text.value.replace(regex, " <span style='color: " + color + "'>$1</span> ");
}

function highlightLink(text) {
    highlightWords(text, user_desirablePhrases, darkerPositiveMatchColour);
    highlightWords(text, user_undesirablePhrases, darkerNegativeMatchColour);

    if(user_catsOn || user_dogsOn)
    {
        highlightWords(text, petGoodPhrases, darkerPositiveMatchColour);
        highlightWords(text, petBadPhrases, darkerNegativeMatchColour);

        if(user_catsOn) {
            highlightWords(text, catGoodPhrases, darkerPositiveMatchColour);
            highlightWords(text, catBadPhrases, darkerNegativeMatchColour);
        }
        if(user_dogsOn) {
            highlightWords(text, dogGoodPhrases, darkerPositiveMatchColour);
            highlightWords(text, dogBadPhrases, darkerNegativeMatchColour);
        }
    }

    if(user_balconyOn) {
        highlightWords(text, balconyGoodPhrases, darkerPositiveMatchColour);
        highlightWords(text, balconyBadPhrases, darkerNegativeMatchColour);
    }

    if(user_fireplaceOn) {
        highlightWords(text, fireplaceGoodPhrases, darkerPositiveMatchColour);
        highlightWords(text, fireplaceBadPhrases, darkerNegativeMatchColour);
    }

    if(user_dishwasherOn) {
        highlightWords(text, dishwasherGoodPhrases, darkerPositiveMatchColour);
        highlightWords(text, dishwasherBadPhrases, darkerNegativeMatchColour);
    }

    highlightWords(text, timesAvailable, timeMatchColour);
}

// extracts the specified WORDS from the body of TEXT, highlights them with the specified COLOR, and wraps them in brackets
function extractWords(text, words, color) {

    var listOfWords = "";

    for(i in words) {

        var regex = new RegExp("("+words[i]+")", "gi");
	// regex.lastIndex = 0;
        var regexSuccess = regex.exec(text);
        if(regexSuccess != null) {
            listOfWords += " (<span style='background-color: " + color + "'>" + regexSuccess[0] + "</span>) ";
        }
    }
    return listOfWords;
}

//determines if listing is in in acceptable price range (under $1300)
function inPriceRange(text) {
    return /\$[0-8][0-9][0-9]\s/.test(text);
}

// only looks for numbers and accounts for a possible $ 
function extractPrice(text) {

    var price = 0;
    var regexSuccess = /\$\s?\d+/.exec(text);

    if (regexSuccess != null) {
	price = parseInt(regexSuccess[0].substring(1));
    }

    return price;
}

function preferredLocationsControl() {
    return "<tr>" +
        "<td width='1' align='right'>good locations:</td>" +
        "<td colspan='3' style='padding:0px'>" + 
            "<table width='100%'><tbody><tr>" +
            "<td><input class='goodLocations dv' value='' style='width:100%'></td>" +
            "<td width='140' align='right'>bad locations:</td>" +
            "<td><input class='badLocations dv' value='' style='width:100%'></td>" +
            "</tr></tbody></table>" +
        "</td>" +

        "<script type='text/javascript'>$('input.goodLocations').DefaultValue('comma separated list');</script>" +
        "<script type='text/javascript'>$('input.badLocations').DefaultValue('comma separated list');</script>" +
        "</tr>";
}

function preferredPhrasesControl() {
    return "<tr>" +
        "<td width='1' align='right'>desirable phrases:</td>" +
        "<td colspan='3' style='padding:0px'>" + 
            "<table width='100%'><tbody><tr>" +
            "<td><input class='desirablePhrases dv' value='' style='width:100%'></td>" +
            "<td width='140' align='right'>undesirable phrases:</td>" +
            "<td><input class='undesirablePhrases dv' value='' style='width:100%'></td>" +
            "</tr></tbody></table>" +
        "</td>" +

        "<script type='text/javascript'>$('input.desirablePhrases').DefaultValue('comma separated list');</script>" +
        "<script type='text/javascript'>$('input.undesirablePhrases').DefaultValue('comma separated list');</script>" +
        "</tr>";
}

function preferredFeaturesCheckboxes() {
    return "<tr>" +
        "<td width='1' align='right'> </td>" +
        "<td>" +
        "<label style='padding-right:3px;'><input type='checkbox' value='fireplace' id='chkFireplace'>fireplace</label>" +
        "<label style='padding-right:3px;'><input type='checkbox' value='balcony' id='chkBalcony'>balcony</label>" +
        "<label style='padding-right:3px;'><input type='checkbox' value='dishwasher' id='chkDishwasher'>dishwasher</label>" + 
        "<label style='padding-right:3px;'><input type='checkbox' value='cats' id='chkCats'>cats</label>" + 
        "<label style='padding-right:3px;'><input type='checkbox' value='dogs' id='chkDogs'>dogs</label>" + 
        "</td>" +
        "<td colspan=2 style='text-align:right'>[ <a id='aboutLink' href='javascript:toggleAboutBox()'>about</a> ]</td>" +
        "<script type='text/javascript'>" + 
        "function toggleAboutBox() { $('#aboutBox').toggle('fast'); }" +
        "</script>" +
        "</tr>";
}

function onOffSwitch(highlighterIsOn) {
    onOffSwitchHtml = "<tr><td colspan=4 style='padding:0'><hr style='height:1px;border:0;background-color:#ccc;'></td></tr><tr>" +
        "<td width='1' align='right'>craigslist highlighter:</td>" +
        "<td><span><label><input type='radio' id='powerOn' name='onoff' value='on' ";
    if(highlighterIsOn) {
        onOffSwitchHtml += "checked='true'";
    }
    onOffSwitchHtml += " >On</label><label><input type='radio' id='powerOff' name='onoff' value='off' ";
    if(!highlighterIsOn) {
        onOffSwitchHtml += "checked='true'";
    }
    onOffSwitchHtml += " >Off</label></span></td></tr";

    return onOffSwitchHtml;
}

function aboutBox() {
    return "<fieldset id='aboutBox' style='display:BLOCK; background-color: #FFFFFF; margin-top:20px; border-color: #CCCCCC; border-width:1px; display: none;'>" +
    "<legend>about craigslist highlighter</legend>" +
    "<div style='background-color:#EEEEEE; border: 1px solid #CCCCCC; padding: 5px; '>" +
    "<div style='font-weight:bold;'>faq:</div>" +
    "<div style='font-weight:bold;margin-top:5px;'>It's not working!</div>" +
    "<div>Open an <a href='https://github.com/nickknw/craigslist_highlighter/issues'>issue</a>, and I'll see what I can do! Please include a screenshot and plenty of detail.</div>" +
    "<div style='font-weight:bold; margin-top:5px;'>Why did you include seperate extra checkboxes for cats and dogs?</div><div>I noticed that sometimes people just put 'pets considered' in their listing and don't check off the 'cats are OK' checkbox. Using the regular cats and dogs checkboxes will filter these out and I wanted to be able to find these kinds of listings more easily.</div>" +
    "<div style='margin-top:10px;'>For more information, see the <a href='http://nickknowlson.com/projects/craigslist-highlighter/'>Craigslist highlighter home page</a></div>" +
    "<div style='text-align:right'>[ <a href='javascript:toggleAboutBox()'>hide</a> ]</div>" +
    "</div></fieldset>";
}

function replaceInArray(array, wordToInsert) {
    return $.map(array, function(phrase, i) { return phrase.replace(/%/, wordToInsert) });
}

// }}}

// ==UserScript==
// @name     _Show word counts
// @include  http://http://boards.4chan.org/v/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant    GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/
$("body").append ('<div id="gmWordCount"></div>');

checkWordCount ();  //-- Initial run, works for static HTML only.

//--- Check for AJAX loaded words... Over twice a sec is plenty fast.
var wordChkTimer = setInterval (checkWordCount, 444);

function checkWordCount () {
    //--- Search for "of" as a whole word.
    var wordStr     = "[Deleted]";
    var wordRegex   = new RegExp ("\\b" + wordStr + "\\b", "gi");
    var matchRez    = $(document.body).text ().match (wordRegex);
    var wordCount   = matchRez ? matchRez.length : 0;

    //--- Display the results.
    var countReport = '';
    switch (wordCount) {
        case 0:
            countReport = '"of" was not found!'
        break;
        case 1:
            countReport = '"of" was found one time.'
        break;
        default:
            countReport = '"of" was found ' + wordCount + ' times.'
        break;
    }

    //--- Display results to the user.
    $("#gmWordCount").text (countReport);
}

//--- Position and style the display output,
GM_addStyle ( "                                 \
    #gmWordCount {                              \
        background:         orange;             \
        position:           fixed;              \
        top:                0;                  \
        left:               0;                  \
        width:              100%;               \
        z-index:            6666;               \
    }                                           \
" );
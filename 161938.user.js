// ==UserScript==
// @name            Ylilauta Poster Filter
// @version         0.1
// @namespace       http://ylilauta.org/
// @author          Harry
// @description     Hides certain posts automatically on ylilauta. Features per country/city hiding, or post-contents hiding.
// @include         http://ylilauta.org/*
// @license         WTFPL v2 (Do What the Fuck You Want to Public License)
// ==/UserScript==

/* README:
    - You must add filters in the LAST function at end of this script.
       Example functions:
       - hideCountry("gr"); - Hides all posters from country-code "gr" (Greece).
       - hideCity("Helsinki, Southern Finland"); - Hides all posters from Helsinki. MUST be exact, containing both city and region information.
       - hidePostRegex("lol"); - Some post contents to hide. Is NOT exact, and is a regex. So if you hide "lol", posts containing "angelologist" or "haplology" will also be hidden.
        
    - Please complain on the public wall at http://steamcommunity.com/id/harryhy if you have any problems.
    - Only Firefox with Scriptish has been tested, so please try that first if you have problems.
    - Don't be a fun killer; remember to frequently clear out your filters and only hide people who are actually causing a problem (such as mass flooding spammers).
*/


function hideCountry(ccTLD) { // hide using country-code; fi=Finland, gr=Greece, etc.
    var foundPosts = document.getElementsByClassName("postername country_"+ccTLD);
    for (var i=0;i<foundPosts.length;i++) {
        var threadID = foundPosts[i].parentNode.parentNode.id.replace(/no/,"");
        location.assign("javascript:hideThread("+threadID+")"); // use the hide button
        foundPosts[i].parentNode.parentNode.style.display = 'none'; // hide posts without a hide button (individual replies)
        console.log("Hid post/thread: "+threadID);
    };
};


function hideCity(citiBoi) { // hides using the FULL city and region name; "Helsinki, Southern Finland" as example.
    // todo: this is somewhat inefficient right now; might try to make it more efficient in the future.
    var foundPosts = document.getElementsByClassName("postuid");
    for (var i=0;i<foundPosts.length;i++) {
        if (foundPosts[i].innerHTML === citiBoi) {
            var threadID = foundPosts[i].parentNode.parentNode.id.replace(/no/,"");
            location.assign("javascript:hideThread("+threadID+")"); // use the hide button
            foundPosts[i].parentNode.parentNode.style.display = 'none'; // hide posts without a hide button (individual replies)
            console.log("Hid post/thread: "+threadID);
        };
    };
};


function hidePostRegex(regexString) { // hides post using certain regex. if you don't know how to do regexes, then oh well. you can still just use a normal word, e.g. "somespamsite" as the function parameter should work.
    var foundPosts = document.getElementsByClassName("post");
    for (var i=0;i<foundPosts.length;i++) {
        var dix = foundPosts[i].innerHTML.match(new RegExp("("+ regexString + ")", "ig"));
        if (dix != null) {
            var threadID = foundPosts[i].parentNode.id.replace(/no/,"");
            location.assign("javascript:hideThread("+threadID+")"); // use the hide button
            foundPosts[i].parentNode.style.display = 'none'; // hide posts without a hide button (individual replies)
            console.log("Hid post/thread: "+threadID);
        };
    };
};


(function() { // ADD FILTER COMMANDS HERE!!
    hideCountry("XX"); // XX = countrycode. gr for Greece, au for Australia, etc.
    hidePostRegex("ponnytråd"); // test example
}());
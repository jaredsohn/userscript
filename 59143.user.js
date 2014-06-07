// ==UserScript==
// @name ChemSpider4FriendFeed
// @namespace http://www.danhagon.me.uk/
// @copyright 2009+, Daniel Hagon (http://www.danhagon.me.uk/)
// @version 1.0a
// @license (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @description Convert text of the form chem[chemicalName] to a link to ChemSpider. Based on version 3 of ChemSpidey.
// @include http://friendfeed.com/*
// @require http://friendfeed.com/static/javascript/jquery-1.3.js?v=bb38
// @require http://web.chemdoodle.com/ChemDoodleWeb-libs.js
// @require http://www.danhagon.me.uk/ChemSpider4FriendFeed/chemdoodleweb-unpacked-hacked.js
// ==/UserScript==

/*
    To test:

        chem[benzene]

        Chemical id 236 is benzene which has imageurl = 'http://www.chemspider.com/ImagesHandler.ashx?id=236'

    TODO: 
        - Improve the user-iterface widgets.
        - Decide upon a consistent identifier scheme.
*/

/*  Return the URL of a png image for a specific Chemspider ID.

    For now, the csid must be a string.
*/
function imageurl(csid) {
 
    // Sanity check the id value. 
    if( csid == '') {
        alert('ChemSpiderId not initialised with value') ;
    }
 
    baseurl = 'http://www.chemspider.com/';
    url = baseurl + 'ImagesHandler.ashx?id=' + csid ;

    return url ;
}


/*  Construct a regular expression that will find the fragments
    of text that ask for ChemSpider link. The exact format of this
    is still being ironed out so the first part of this consist of
    a comment with some ideas that came from the original ChemSpidey
    robot.
*/
/* 
    key = '(chem)'
    leftdelim = '\\['
    queryname = '([a-zA-Z0-9-]{1,20})'
    optintspacer = ';?'
    optfloat = '\\s?(\\d{0,5}\\.?\\d{0,5})?'
    optunits = '\\s?([mgl]{1,2})?'
    optional = optintspacer + optfloat + optunits
    rightdelim = '\\]'
    
    compiledregex = key+leftdelim+queryname+optional+rightdelim
*/ 
var compiledregex_first = /(chem)\[([a-zA-Z0-9-]{1,20})\]/ ;
var compiledregex_all = /(chem)\[([a-zA-Z0-9-]{1,20})\]/g ;

/*  This global variable holds the contents of a MOL file to be used by ChemDoodle
    for rendering the molecule.
*/
var molToLoad = null ;

/*  Returns ChemSpiderId string from a simple search for query.

    This currently consists of a pair of next ajax calls, on to
    search on the name of a chemical in ChemSpider to get back it's
    ChemSpider id, and the the other to get back a MOL file for that
    chemical from ChemSpider. It is within the inner-most of these
    that the ChemSpider4FriendFeed identifier string gets replaced
    with actual nodes.

    This design is partially an expediency to get something working and
    is most likely sub-optimal. 

    Based on ChemSpiPy.py
*/
function simplesearch(query, contentNode) {
 
    var baseurl = 'http://www.chemspider.com/';
    var token = GM_getValue('ChemSpiderToken'); // ###Put your API token in here###
 
    // Construct a search URL and poll Chemspider for the XML result
    var searchurl = baseurl + 'Search.asmx/SimpleSearch' ;

    // Based on http://wiki.greasespot.net/Code_snippets#GET_a_URL_with_callback_function
    GM_xmlhttpRequest({
        method: "GET",
        url: searchurl+"?query="+query+"&token="+token,
        onload: function(responseDetails) {

            // Parse the response from ChemSpider to extract the id of the search compound
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
            var entries = dom.getElementsByTagName('int');
            var compound = entries[0].textContent ;

            // Build URLs that will get injected into the set of nodes we're building
            var foo_rl = "http://www.chemspider.com/Chemical-Structure." + compound +".html" ;
            var imgurlsubs = imageurl(compound) ;

            // Replace the query string with representation of structure as got from chemspider
            var replaceString = '<span class="ChemSpiderData csid'+compound+'"><a title="'+query+'" href="'+foo_rl+'">'+query+'</a></span>' ;
            //alert (replaceString); //for debug
            //alert ("something found:"+query+" "+compound+" "+foo_rl); //for debug
            contentNode.innerHTML = contentNode.innerHTML.replace(compiledregex_first, replaceString) ;

            // To make things a little more advanced use MOL file to render things using ChemDoodle
            molToLoad = null ;

            // Get the MOL file from ChemSpider
            var MOLFileURL = 'http://www.chemspider.com/FilesHandler.ashx';
            //alert(MOLFileURL+"?type=str&id="+compound) ; //fordebug
            GM_xmlhttpRequest({
                method: "GET",
                url: MOLFileURL+"?type=str&id="+compound,
                onload: function(responseDetails) {

                    molToLoad = responseDetails.responseText ;
                    //alert(molToLoad) ; //for debug


                    //After checking that no other canvas currently exists for this
                    // Chemical add a new one.
                    if( $("rotate3D"+compound).length == 0 ) {

                        var rotate3D = new RotatorCanvas("rotate3D"+compound, 200, 200, true, $(".csid"+compound));
                        rotate3D.specs.atoms_useJMOLColors = true;
                        rotate3D.specs.atoms_circles = true;
                        rotate3D.specs.bonds_symmetrical = true;
                        rotate3D.specs.backgroundColor = '#E4FFC2';
                        rotate3D.yIncrement = -Math.PI / 360;
                        rotate3D.loadMolecule(readMOL(molToLoad));
                        //rotate3D.startAnimation();

                    }

                    //based on http://www.webdesignerwall.com/demo/jquery/animated-hover2.html
                    $(".csid"+compound+" a").append('<img alt="'+query+'" src="'+imgurlsubs+'" />');

                    // Apply styling to prevent images from being visible upon page load
                    $(".csid"+compound+" a img").css("display","none").css("position","absolute");//.css("bottom","5px") ;
                    //$(".csid"+compound+" a .rotate3D"+compound).css("display","none").css("position","absolute");

                    // Provide hover-over display logic
                    $(".csid"+compound+" a").hover(function() {

                        $(this).find("img").animate({opacity: "show"}, "slow");
                        $(this).find("rotate3D"+compound).animate({opacity: "show"}, "slow");
    
                    }, function() {

                        $(this).find("img").animate({opacity: "hide"}, "fast");
                        $(this).find("rotate3D"+compound).animate({opacity: "hide"}, "fast");

                    });

                }
            });
        }
    });

}

/*  Apply the ChemSpider4FriendFeed widget to every special identifier found on the page.
*/  
function applyChemSpider() {

    // An alternative way to iterate throught the content divs
    $('.content').each(function(i){

        // Work out how many ChemSpider4FriendFeed identifiers there are in this
        // section and perform the simpleSearch on ChemSpider for each.
        var commentText = this.textContent ;
        var csIdentifierStrs = commentText.match( compiledregex_all ) ;
        if(csIdentifierStrs != null) {

            for (var count = csIdentifierStrs.length - 1 ; count >= 0; count--) {

                // Find the next occurrence of a ChemSpider4FriendFeed identifier
                var selectMatch = csIdentifierStrs[count] ;
                var parsestring1 = selectMatch.match( compiledregex_first ) ;
                //alert (parsestring1) ;

                // Select the chemical part of the CS4FF identifier
                var queryString = parsestring1[2]

                // Now actually perform the search
                simplesearch(queryString, this) ;

            }
        }
    });
}

/*  Global variables
    Based on: http://userscripts.org/scripts/review/53910
*/
var commentCount = 0;
var commentTextareaCount = 0;


/*  Check to see if the number of comments within the page has changed
    and if so pre process the page.

    Based on: http://userscripts.org/scripts/review/53910 
*/
function processOnCommentCountChange() {
    var commentCountNow = $('.comment .content').length;
    if(commentCount != commentCountNow) {
        commentCount = commentCountNow;
        // Do something to the page now
        applyChemSpider() ;
    }
}

/*  Check to see if the number of comment textareas within the page has changed
    and if so pre process the page to add textarea widgets around each of them.

    Based on: http://userscripts.org/scripts/review/53910 
*/
function processOnTextareaCountChange() {
    var commentTextareaCountNow = $('textarea').length;
    if(commentTextareaCount != commentTextareaCountNow) {
        commentTextareaCount = commentTextareaCountNow;
        // Do something to each of the textareas on the page
    }
}

/*  Implements an infinite loop that will poll the contents of
    a page and process changes.

    Based on: http://userscripts.org/scripts/review/53910 
*/
function processOnDocumentChange_wait() {

    // Do the processing
    processOnCommentCountChange();
    //processOnTextareaCountChange() ;
    //alert("Test: I'm here");

    // Recursively wait
    window.setTimeout(processOnDocumentChange_wait,250);
}

/* 
*/
$(document).ready(function() {

    // Set up the ChemDoodle StyleSheet
//    $("head").append('<link rel="stylesheet" href="http://web.chemdoodle.com/ChemDoodleWeb.css" type="text/css" />');

    // First check to see if the appropriate key-value pair
    // with the user's API token has been set
    // Based on: http://jqueryui.com/demos/dialog/#modal-form
//    GM_setValue('ChemSpiderToken','null') ; // for testing

    if (GM_getValue('ChemSpiderToken','null') == 'null') {

        var dialogText = 'Could not find a ChemSpider token, please enter your token. You can find this on your page on ChemSpider. To disable this dialog box please disable the ChemSpider4FriendFeed Greasemonkey script.\n\nSecurity notice: this will be stored as a Greasemonkey key-value pair on your local machine only.' ;

        while(GM_getValue('ChemSpiderToken','null') == 'null') {
            var result = window.prompt(dialogText, 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx') ;

            if (result == null) {
                alert('Without a ChemSpider token you won\'t be able to use this script. To enter it again refresh page.') ;
                return ;
            }

            cstokenregex = /^([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/i ;

            if ( !cstokenregex.test(result) ) {
                alert ("Token must have the form xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx where x is one of 0-9,a-f.");
            } else {
                GM_setValue('ChemSpiderToken', result); // set key-value pair
                alert('here') ;
            }
  
        }

        processOnDocumentChange_wait() ;

    } else {   

        // Start an infinite loop to detect changes
        processOnDocumentChange_wait() ;

    }

});


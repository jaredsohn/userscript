// ==UserScript==
// @name           Hide Your Comments, Hide Your SoundCloud - 2012
// @namespace      mankittens
// @description    hides comments in soundcloud player
// @grant          none
// @include        http://soundcloud.com/*
// @include        http://*.soundcloud.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @version        3.0
// ==/UserScript==

////////////////////////////////////////////////////////
//                                          ////////////
//  "say nyaa to drugs." - mankittens 2012  ////////////
//                                          ////////////
////////////////////////////////////////////////////////
//
// This script automatically hides the comments of all 
//  soundcloud player instances. It works regardless of 
//  the player's size or, attributes, as long as the 
//  class ends with "mode player".
//
// ex. "hdaudio large mode player" --> 
//     "hdaudio large mode player no-comments"
//
// 
// Changes /////////////////////////////////////////////
//                                                    //
//    v0.1  -=MAJOR=--------------------------------
//            。script now works on dashboard!
//          -=minor=--------------------------------
//            。new credits be to here: 
//               http://stackoverflow.com/questions/8251955/
//            。old credits are now deprecated
//          ----------------------------------------
//
//    v1.0  -=minor=--------------------------------
//            。added a version number
//          ----------------------------------------
//
//    v2.0  -=Major=--------------------------------
//            。everything works perfectly now
//              　・every player comes comments off
//              　・after that point comments work
//                 normally
//          ----------------------------------------
//
//    v2.1  -=minor=--------------------------------
//            。added support for the incoming 
//              tracks tab on the dashboard
//          ----------------------------------------
//    
//    v3.0  -=Major=--------------------------------
//            。added jquery reference to required
//            。made small changes to fix bugs, 
//              streamline code, and respond to 
//              changes in the souncloud website
//            。YOU MAY NEED TO UNINSTALL AND THEN 
//               REINSTALL THIS PLUGIN!!
//            。ALSO, FIREFOX USERS BEWARE; I THINK
//              THIS BREAKS SOUNDCLOUD ON FIREFOX
//          ----------------------------------------
//                                                   //
///////////////////////////////////////////////////////
  
function scriptWrapper () {
    var requestURL, isDashboard, isSingle, dashboardRegEx, singleRegEx;
    requestURL = "";
    isDashboard = false;
    isSingle = false;
    dashboardRegEx = new RegExp("^" + "(/dashboard.partial|/dashboard/incoming.partial)");
    singleRegEx = new RegExp("medium" + "$");
    
    //
    // basically what we're doing here is running the 
    //  hide script once for regular pages, and 
    //  running it on demand for the dashboard.
    //
    // the dashboard first loads the contents of 
    //  overview-list, which is what you see when 
    //  the spinning loading gif is done. next, if 
    //  you click a song that's a part of a list, 
    //  that song will load just by itself. you can
    //  also switch over to the "Incoming tracks" tab
    //  on the dashboard, which is a seperate load.
    //
    // thus, this script handles 3 cases:
    //     a. normal page (everything aleady loaded)
    //     b. whole dashboard loads
    //     c. individual song loads on dashboard
    //     d. incoming tracks loads
    //
    //                           ♥ mankittens
    // 
    // P.S. - turning comments on and off works
    //         as expected ;)
    // 
    
    //
    // Intercept Ajax
    //
    $('body').ajaxSuccess (function (e, request, settings) {
        console.log('ajaxSuccess');
        requestURL = settings.url;             //store this baby in order to analyze what was loaded
        isDashboard = dashboardRegEx.test(requestURL);
        isSingle = singleRegEx.test(requestURL);
        
        if (isDashboard || isSingle){         //if the page doesn't have a dashboard or single track isn't being loaded, then no
            console.log(requestURL);
            logResult (e, request, settings);  //if you are hot for debugging
        }
    });
    $('body').ajaxStop (function () {
        console.log('ajaxStop');
        if (isDashboard){   //if the whole dashboard or incoming tracks was just loaded (b.) (d.)
            hideAllComments();
        } else if (isSingle){ //if an individual track was just loaded (c.)
            //hide only that comment
            hideComment($('.playing').closest("div.set-player").find("li.playlist-player").filter(function() {
                return $(this).css('display').indexOf('list-item') != -1;
            }).children("div.player"));
        } else {                                   //if something else was loaded
            console.log("no need to hide")
        }
        requestURL = "";                           //reset just in case
        isDashboard = false;
        isSingle = false;
    });
    
    //
    // Get Filthy
    //
    function logResult(e, request, settings) {
        console.log(e);
        console.log(request);
        console.log(request.status);
        console.log(request.statusText);
        console.log(request.responseHeaders);
        console.log(settings);
        console.log("isDashboard = " + isDashboard);
        console.log("isSingle = " + isSingle);
    }
    function hideAllComments() {
        //console.log($('div[class$="mode player"]'));
        hideComment($('div[class$="mode player"]'));
    }
    function hideComment(comment) {
        comment.toggleClass('no-comments');              //makes that essential class change
        console.log("hid a comment");                    //lets everybody know what's up
    }
    
    //
    // For Those Normal Pages
    //
    hideAllComments();                                   //run at least once (a.)
}
    
    //
    // ???
    //
    function addJS_Node (text, s_URL, funcToRun) {
        var D                                   = document;
        var scriptNode                          = D.createElement ('script');
        scriptNode.type                         = "text/javascript";
        if (text)       scriptNode.textContent  = text;
        if (s_URL)      scriptNode.src          = s_URL;
        if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';
        
        var targ    = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
        targ.appendChild (scriptNode);
    }

addJS_Node (null, null, scriptWrapper);
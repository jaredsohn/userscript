// ==UserScript==
// @name            Facebook App Terminator
// @namespace       http://gdorn.nudio.net/greasemonkey
// @description     Adds "[BLOCK APP]" link to block (not just hide) apps within the news feed.  Automatically blocks quizzes and giveaway spam.
// @include         http://www.facebook.com/*
// @include         https://www.facebook.com/*
// @require         http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require          http://usocheckup.redirectme.net/44834.js
// ==/UserScript==
//-------------------------------------------------------
//  A note about terminology:
//
//  Hiding an app tells facebook to stop showing posts from it in your feed.
//  This is roughly the same as removing these items from display using javascript,
//  as is done in most facebook greasemonkey scripts.
//
//  Blocking an app is substantially different than simply hiding it:
//  - block apps cannot gather information about you if you visit their home page
//  - block apps cannot gather information about you if your FRIEND visits their home page
//  - block apps cannot send you notifications, invites, or mail
//
//  This script does not just hide apps.  It blocks them.  Some of them (quizzes) it blocks automatically.
//
//  You should probably visit http://www.facebook.com/privacy/?view=platform&tab=other and refuse some or all
//  access to your personal info from apps you have not specifically decided to give this information to.
//
// Changelog (started on version 7, only tracking major changes)
// 03/16/2010 - Updated updater URL.
// 07/28/2010 - Re-hid the blocking iframe.  Oddly, nobody mentioned it.
// 07/06/2010 - Yet another Facebook shuffle (they removed the quotes from around the app_id field in data-ft).
// 06/14/2010 - Facebook shuffle accounted for.  Also added some more autoblock strings.
// 12/03/2009 - Workaround added for race condition that caused some app stories to be missed if they loaded dynamically immediately after the initial page load.
// 11/11/2009 - Moved iframe to bottom of page as it was not always invisible in all browsers at the top of the page.  Added another detection for quizzes.  Added update notification.  Added sweepstakes detection to autoblocked apps. 
// 10/29/2009 - Fix for yet another way that app-generated stories are laid out.
// 10/26/2009 - Revision to keep up with changes to facebook layout.  Should be a tad more robust now.  
//            - Also removes all instances of an app's stories when you block the app.  //            - Moved the [BLOCK APP] link into the footer of the story as the new hide button was conflicting.
//            - Added a few more non-crappy apps to the whitelist and documented them.
//
//
//  Technical note:
//  When you click on [BLOCK APP] (or a quiz is auto-blocked), the scripts loads the necessary pages
//  to perform the block operation in a hidden iFrame.  If several apps are blocked in rapid succession, you may
//  find your browser lagging for a moment as it performs two page loads per app.  This is normal and largely unavoidable.
//  Also, the script doesn't maintain a list of blocked apps (maybe in a future version) so if facebook's cache gets in the way and fails to notice you've blocked an app, you may still get stories until the cache is brought up-to-date.
//------------------------------------------------------

//strings used to detect quiz results; lowercase.
var autoblock_strings = new Array(
    "completed the quiz",
    "took the quiz",
    "take this quiz",
    "quiz and the result is",
    "create a quiz",
    "free drawing. no forms to fill out.",
    "only takes a few seconds to enter",
    "winners and this drawing will add",
    "enter me to win",
    "estimated time to enter",
    "big prize giveaways",
    "i got it just for you!",
    "see what it is! send me one back!"

);

//ids of apps to ignore.  e.g. posts from the iphone client or twitter.
var ignore_apps = new Array(
	2231777543, //twitter
    32061240133, //youtube
    2795223269, //friendfeed
    6628568379, //facebook for iphone
    74769995908, //facebook for android
    9953271133, //networked blogs
    115463795461,  //selective twitter status
    90376669494, //Yahoo! homepage
    56212371378, //Tweetdeck
    48119224995, //tumblr
    5895217474, //digsby
    146139331013, //tweetdeck for iphone
    23723376453 //Seesmic
);
var iframe_loaded = function(event){
    app_id = event.data["app_id"];
    var form = $("#app_blocker_"+app_id).contents().find('form[action*="/apps/block.php"]');
    if(form){
        try{
            $("#app_blocker_"+app_id).contents().find('form[action*="/apps/block.php"]').submit();
        } catch (e){
            //greasemonkey was generating 0x80040111, NS_ERROR_NOT_AVAILABLE.
            //This is a solution (albeit a hacky one) to that problem.
        }
/*        setTimeout(function(){
                $("#app_blocker_"+app_id).remove(); //nuke the iframe
            }, 15000);
*/
    }
};

var marked_stories = new Array();

function check_for_autoblock(story){
    var text = $(story).text().toLowerCase();
    for (var i = 0; i < autoblock_strings.length; i++){
        if(text.indexOf(autoblock_strings[i]) != -1){
            return true; //found one
        }
    }
    return false;
}

global_run_performed = false;
global_run_tries = 0;
appIdFromData = /\"app\_id\"\:\"?(\d+)\"?/
function add_block_app_buttons(target){
	if(target && !$(target).is("div") && !$(target).is("li")){
        return; //don't run on anything but a div
    }
    if(!global_run_performed){
        global_run_tries++;
    }
	if (target && global_run_performed && global_run_tries < 10) {
		if (appIdFromData.test($(target).attr("data-ft"))) {
			appStories = $(target);
		} else {
			return; //nothing to do
		}
    } else {
        //doing a full pass, either because we just loaded the page or we've ticked over the node counter
        //console.log("doing global run");
        appStories = $('*[data-ft*=app_id]');
    }
	if (!appStories.length) {
	//	console.log("No stories");
		return;
	}
    //flag that we've done a global run with an app story in it; from here on, we should be okay with per-event stories
    global_run_performed = true;
	//console.log("Got app stories:", appStories);
    appStories.each(function(i, story){
        var data = $(story).attr("data-ft");
        if(marked_stories.indexOf(data) != -1){
            return; //nothing to do, already messed with this one
        }
		marked_stories.push(data); //save it to avoid working on it again
//        story.style.border = "green 4px dashed";
//		console.log("Working on app:", story);
		app_res = appIdFromData.exec(data);
		if (!app_res){
			//console.log("Didn't find app id in data: ", data);
			return;
		}
		app_id = app_res[1];
//		console.log("Got app id:", app_id);
        if(ignore_apps.indexOf(parseInt(app_id)) != -1){
			//console.log("No app id");
            return; //ignore these
        } 
        if( check_for_autoblock(story)){
            //block it immediately.
            //story.style.border = "red 4px dashed";
			//console.log("Auto-blocking story");
            block_app(app_id, story);
            return;
        }
        var blocker = $('<span> · <a>[BLOCK APP]</a></span>');
		var attribution_span = $(story).find('span[class*=UIActionLinks_bottom]:last');
		if (! attribution_span.length) {
			attribution_span = $(story).find('span[class*="BottomAttribution"]');
		}
        if( ! attribution_span.length ){
            attribution_span = $(story).find('span[class*="GenericStory_Time"]');
        }
        
        if (! attribution_span.length){
			//console.log("Couldn't find attribution span");
            return; //nothing to do
        }
        
//		console.log("Got attribution span:", attribution_span);
        attribution_span.append(blocker);
        $(blocker).bind("click", {app_id: app_id}, function(what){
            app_id = what.data.app_id;
            block_app(app_id, story);
        });
    });
}

window.addEventListener("load", function(){add_block_app_buttons()}, false);
window.addEventListener("DOMNodeInserted", myInsertedNodeDomHandler, false);
function myInsertedNodeDomHandler(event) {
    add_block_app_buttons(event.target);
}

function block_app(app_id, node){
//    var iframe = $('<iframe id="app_blocker_'+app_id+'" width="0" height="0"></iframe>');
    var iframe = $('<iframe id="app_blocker_'+app_id+'" height="0"></iframe>');
    $('body').append(iframe);
    var app_blocker = $("#app_blocker_"+app_id);
    $(app_blocker).bind("load", {app_id:app_id}, iframe_loaded);
    url = "http://www.facebook.com/apps/block.php?id=" + app_id + "&action=block&source=about";
    $(app_blocker).attr('src', url);
    
	//remove all entries matching this app
	$('div[id*="div_story"][data-ft*="app_id":'+app_id+']').remove();
	$('li[id*="stream_story"][data-ft*="app_id":'+app_id+']').remove();
}


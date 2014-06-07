// ==UserScript==
// @name          hörsport (hoersport.de) - Enable full screen mode for video player
// @namespace     http://userscripts.org/users/nkn
// @description   Enables the full screen mode for the embedded YouTube video player on hörsport (hoersport.de). Simply double-click the player to display the exercise explanations full screen.
// @include       http://www.hoersport.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version       0.3.2
// @date          2012-08-09
// @author        Nicolas Knaebel (nicolas.knaebel@googlemail.com)
// @license       Public Domain
// ==/UserScript==

// Saves the original 'ready' event listener of the video player.
var hoersportOnYouTubePlayerReady;

// Saves the original 'onstatechange' event listener of the video player.
var hoersportOnytplayerStateChange;

// Keeps the timeout ID to be able to clear the timeout.
var timeoutID;

// Keeps the incoming player state change for use in the timeout handler.
var incomingState;

// Keeps the last user state -- e.g., to detect a state transition from 'playing' to 'paused'.
var lastUserState = 2;

// Keeps any last state -- e.g., to detect if the same onstateevent arrives twice.
var lastGeneralState = -2;

function isWorkoutPage() {
    // Check for timing element of workout player.
    return $('#sm2_timing span.sm2_position').length;
}

function isFeedbackPage() {
    // Check for 'Feedback abschicken' button.
    return $('input#buttonNextPage[value="Feedback abschicken"]').length;
}

function addAllowFullscreenParameter() {
    // Add a param element to allow fullscreen for the embedded YouTube video player 
    // [as described on https://developers.google.com/youtube/player_parameters ].
    var newParam = '<param name="allowFullScreen" value="true"></param>';
    var newHtml = $('object#myytplayer').html() + newParam;
    $('object#myytplayer').html(newHtml);
}

function addEnableFullscreenParameter() {
    // Add the 'fs' parameter to the 'data' attribute to enable the functionality
    // [as described on https://developers.google.com/youtube/player_parameters ].   
    var newParam = '&rel=0&showinfo=0&fs=1';
    var newData = $('object#myytplayer').attr('data') + newParam;
    $('object#myytplayer').attr('data', newData);
}

function handleNewPlayerState() {    
    if ((lastUserState == 2) && (incomingState == 1)) {         // 'paused' -> 'playing'
        unsafeWindow.soundManager.getSoundById("pagePlayerMP3Sound0").resume();
    } else if ((lastUserState == 1) && (incomingState == 2)) {  // 'playing' -> 'paused'
        unsafeWindow.soundManager.getSoundById("pagePlayerMP3Sound0").pause();
    }

    timeoutID = -1;
    lastUserState = incomingState;
}

function fullscreenOnytplayerStateChange(newState) {
    incomingState = newState;
    
    // Only user-intended state changes should be detected; however, JQuery's .click() can
    // not be used here, because it does not work when the player is in fullscreen. Instead, 
    // use a timeout to guard against very fast player state changes. Such fast changes 
    // happen for instance when the looped video restarts ('paused' -> 'ended' -> 'playing'). 
    //
    // After 500ms the timeout calls the handleNewPlayerState() function to handle the state
    // change. In case of a fast transition, the timeout is cleared and the new state ignored.    
    if (newState != lastGeneralState) {     // ignore the same onstatechange event
        if (timeoutID != -1) {
            // State change is too fast; don't call handleNewPlayerState. 
            clearTimeout(timeoutID);
            timeoutID = -1;
        } else {
            timeoutID = setTimeout(handleNewPlayerState, 250);
        }
    }
    lastGeneralState = newState;

    // Always call the original 'onstatechange' event listener.
    hoersportOnytplayerStateChange(newState);
}

if (isWorkoutPage() && !isFeedbackPage()) {
    // Save and then overwrite the original video player 'onstatechange' event listener.
    hoersportOnytplayerStateChange = unsafeWindow.onytplayerStateChange;
    unsafeWindow.onytplayerStateChange = fullscreenOnytplayerStateChange;
    
    // Save and then overwrite the original video player 'ready' event listener.
    hoersportOnYouTubePlayerReady = unsafeWindow.onYouTubePlayerReady;
    unsafeWindow.onYouTubePlayerReady = function(playerId) {
        // Revert back to the original event listener. This listener will be
        // executed, because the parameter changes trigger a player reload.
        unsafeWindow.onYouTubePlayerReady = hoersportOnYouTubePlayerReady;    
    
        // Allow and enable fullscreen functionality by slightly 
        // changing the HTML of the YouTube video player.
        addAllowFullscreenParameter();  
        addEnableFullscreenParameter(); 
    };
}
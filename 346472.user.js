// ==UserScript==
// @name        QuoraModifier
// @namespace   http://userscripts.org/scripts/show/346472
// @description Removes people Suggestion box, Adds opacity to header bar, Removes upvote count in answers
// @include     https://*.quora.com/*
// @include     http://*.quora.com/*
// @version     1.06
// @grant       none
// ==/UserScript==

var removeAnswerVotes = function () {
    $('a[id$=_answer_vote_up_link]') .each(function () {
        //  alert($(this).html());
        $("span.numbers",$(this)).hide();
        $("span.answer_voters",$(this).parents("[id$=_answer]")).hide();
    });
    $('[id$=_answer_vote_up_cancel_link]').each(function(){
        $("div[id$=_container]",$(this).parents("[id$=_answer]")).hide();
        $('button#toggleAnswerButton',$(this).parents("div[id$=_answer]")).text('+');
    });
}
var removeBlogVotes = function () {
}
var removeFeedAnswerVotes = function(){
    $('div.feed_item_answer a.rating span').hide();
}
var toggleAnswerHandler = function(){
    var answerContainer = $(this).parents("[id$=_answer]");
    $("div[id$=_container]",answerContainer).slideToggle();
    //alert($("div[id$=_container]",$(this).parents("[id$=_answer]")).html());
    $("div[id$=_truncated]",answerContainer).slideToggle();
    if($(this).text() == '-'){
        $(this).text('+');
    }
    else{
        $(this).text('-');
    }
}
var addToggleAnswerButton = function(){
    $('div[id$=_answer]') .each(function () {
        //alert($(this).text());
        if( $('button#toggleAnswerButton',$(this) ).length == 0){
            var newButton = "<button id='toggleAnswerButton' class='action_button' style='width:20px;height:20px'>-</button>";
            $('div.rating_buttons_wrapper',$(this)).append(newButton);
        }
    });
}
var executeOnNewContent = function () {
    removeAnswerVotes(); 
    // SETTING 1 : COMMENT this if you want to view vote counts
    //removeBlogVotes(); Will add later
    removeFeedAnswerVotes(); 
    //SETTING 2 : COMMENT this if you want to view vote count in 'more from this user' feed
    addToggleAnswerButton();
    //SETTING 3 : COMMENT this if you don't want show/Hide Button on top of answers
}

var updateHeaderOpacity = function () {
    var header = $('#layout_header');
    header.css('background-color', '#55574D');
    header.css('opacity', '0.8');
}
var changeHeaderLinkColor = function () {
    var add = $('[id$=_dialog_link]');
    $('[id$=_default_nav] strong') .css('color', '#FFFFFF');
    add.css('background', '#55574D');
    add.css('color', '#ffffff');
}
function waitForKeyElements(selectorTxt,
/* Required: The jQuery selector string that
specifies the desired element(s).
*/
actionFunction,
/* Required: The code to run when elements are
found. It is passed a jNode to the matched
element.
*/
bWaitOnce,
/* Optional: If false, will continue to scan for
new elements even after the first match is
found.
*/
iframeSelector
/* Optional: If set, identifies the iframe to
search.
*/
) {
    var targetNodes,
    btargetsFound;
    if (typeof iframeSelector == 'undefined')
    targetNodes = $(selectorTxt);
     else
    targetNodes = $(iframeSelector) .contents() .find(selectorTxt);
    if (targetNodes && targetNodes.length > 0) {
        btargetsFound = true;
        /*--- Found target node(s). Go through each and act if they
are new.
*/
        targetNodes.each(function () {
            var jThis = $(this);
            var alreadyFound = jThis.data('alreadyFound') || false;
            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound = actionFunction(jThis);
                if (cancelFound)
                btargetsFound = false;
                 else
                jThis.data('alreadyFound', true);
            }
        });
    } 
    else {
        btargetsFound = false;
    }
    //--- Get the timer-control variable for this selector.

    var controlObj = waitForKeyElements.controlObj || {
    };
    var controlKey = selectorTxt.replace(/[^\w]/g, '_');
    var timeControl = controlObj[controlKey];
    //--- Now set or clear the timer as appropriate.
    if (btargetsFound && bWaitOnce && timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval(timeControl);
        delete controlObj[controlKey]
    } 
    else {
        //--- Set a timer, if needed.
        if (!timeControl) {
            timeControl = setInterval(function () {
                waitForKeyElements(selectorTxt, actionFunction, bWaitOnce, iframeSelector
                );
            }, 300
            );
            controlObj[controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj = controlObj;
}

var upvoteCancel = function () {
    $(".numbers",$(this)).hide();
    var answerContainer = $(this).parents("[id$=_answer]");
    $("span.answer_voters",answerContainer).hide();
    $("div[id$=_container]",answerContainer).show();
    $("button#toggleAnswerButton",answerContainer).text('-');
}
var upvoteAnswer = function () {
    $(".numbers",$(this)).show();
    var answerContainer = $(this).parents("[id$=_answer]");
    $("span.answer_voters",answerContainer).show();
    $("div[id$=_container]",answerContainer).hide();
    $("button#toggleAnswerButton",answerContainer).text('+');
}
var addShuffleLink = function () {
    $('ul[id$=_default_nav]') .children(':first') .before('<li><a id="shuffle-navbar-link" href="/shuffle"><strong>Shuffle</strong></a></li>');
    $('#shuffle-navbar-link') .addClass('nav_item');
}
$(document) .ready(function () {
    $('div[id$=_right_col]') .remove();
    
    $(document).on("click",'[id$=_answer_vote_up_cancel_link]',upvoteCancel);
    $(document).on("click",'[id$=_answer_vote_up_link]',upvoteAnswer);
    
    executeOnNewContent();
    waitForKeyElements('[id$=_rating]', executeOnNewContent);
    addShuffleLink();
    //SETTING 4 : COMMENT this if you don't want the shuffle link provided in header bar
    updateHeaderOpacity();
    changeHeaderLinkColor();
    //$("#toggleAnswerButton").css("width","100%");
    $(document).on("click","#toggleAnswerButton",toggleAnswerHandler);
}
);


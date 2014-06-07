// ==UserScript==
// @name       		Plug.Dj modified script
// @version    		1.0
// @description  	Auto woot + line up - saying stuff joining the queue
// ==/UserScript==


// Customizations

var autoqueue; 
var awaitNextDj;
var randtimeout;
var determineAutoqueue;

var allowedToAutoDJ=true;
var outsideMessageToSay='';
var newMessage=false;

//create hidden blank popup for later use:
var popup = document.createElement('div');
$(popup).css('display','none');
$(popup).attr('id','ScriptPopup');
$('body').append(popup);

function launchHTMLPopup(popupText){
    $('#ScriptPopup').text(popupText);
    $('#ScriptPopup').dialog({
                autoOpen: true,
                modal: true,
                buttons: {
                "OK":function() { $(this).dialog("close") }
                }
        });
}


function determineAutoqueue() {
        var input = prompt("Would you like to enable auto-queueing?", "yes/no  (not case sensitive)").toLowerCase();
        if (input == "yes") {
                autoqueue = true;
        }
        else if (input == "no") {
                autoqueue = false;
        } 
        else   {
                alert("You didn't validly tell me whether you want to enable auto-queueing or not... please run the script again..");     
        }                                 
                
}


function addtoQueue(){
     document.getElementById('button-dj-waitlist-join').click();
     API.sendChat();
}

function initListeners() {
    currentsong = API.getMedia();
    djs = API.getDJs();
     rand();
     setTimeout(function(){ document.getElementById('button-vote-positive').click(); },randtimeout);
        
        API.addEventListener(API.DJ_ADVANCE, function( obj ) {
                djs = API.getDJs();
                currentsong = API.getMedia();
                rand();
                setTimeout(function(){ document.getElementById('button-vote-positive').click(); },randtimeout);
        
                if (autoqueue && ($('div#button-dj-quit').css('display')=='none') && ($('div#button-dj-waitlist-leave').css('display')=='none')) {
                     addtoQueue();
                }
        });
}

determineAutoqueue();
if (autoqueue && ($('div#button-dj-quit').css('display')=='none') && ($('div#button-dj-waitlist-leave').css('display')=='none')) {
    addtoQueue();
}
initListeners();

function rand(){
    randtimeout = Math.random() * 10;
    randtimeout = Math.round(randtimeout * 1000);
    return randtimeout;
}

var updatePrefs;

$.getScript('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js').done(function(){
    $('head').append("<link rel='stylesheet' href='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery.ui.all.css' type='text/css'/>");
    
    determineAutoqueue = function() {
        var input = prompt("Would you like to enable auto-queueing?", "yes/no  (not case sensitive)").toLowerCase();
        if (input == "yes") {
                autoqueue = true;
                
        }
        else if (input == "no") {
                autoqueue = false;
        } 
        else   {
                alert("You didn't validly tell me whether you want to enable auto-queueing or not... please run the script again..");     
        }                                 
                
    }

        //getOutsideSettings();
    
    });
// ==UserScript==
// @name        Twitch Plays Pokemon - Command Filtering & Spamming Tool
// @namespace   butt
// @description Adds tools to your chatbox for spamming chat and filtering out commands from chat.
// @include     http://www.twitch.tv/twitchplayspokemon
// @include     http://beta.twitch.tv/twitchplayspokemon
// @include     http://www.twitch.tv/twitchplayspokemon/chat?popout=&secret=safe
// @include     http://beta.twitch.tv/twitchplayspokemon/chat?popout=&secret=safe
// @version     1.9
// @grant       none
// ==/UserScript==

function tppmain() {
var $ = window.$;

function setUpTheShit(){
    var spamhandle;
    var counterHandle;
    
    // Add buttons and shit
    $(".chat-interface").append('<div id="muh-controls" style="position:absolute;top:100px;padding:5px;"><label style="display:inline" for="dubs">Filter Inputs </label><input type="checkbox" id="dubs" checked><div><label for="spam-radio" style="display:inline">Spam: </label> <input type="radio" id="spam-radio" name="spam-radio" value="manual" title="Set spam intervals manually.">Manual  <input type="radio" name="spam-radio" value="auto" title="Auto mode parses the chat to determine optimal intervals automatically.">Auto  <input type="radio" name="spam-radio" value="none" checked title="Disable spamming.">  None </div><div><label for="spam-text" style="display:inline">Text </label><input type="text" id="spam-text" value="GUYS WE\'VE GOT TO DEFEAT MlSTY"></div><div><label for="spam-interval" style="display:inline">Interval(secs) </label><input type="text" id="spam-interval" value="32" style="width:50px"><span id="spam-counter"></span><span id="spam-notice" style="color:green"> You spammed!</span></div></div>');
    $(".chat-interface").css("bottom", "80px");

    // FILTERING
    var showAll = false;
    $("#dubs").click( function() {
        showAll = !showAll;
    } );
    
    amShit = function (str) {
        return str.match(/^((up|down|left|right|a|b|start|select|anarchy|democracy|wait|l|r?)(\+)?)+$/i);
    };
    var addMessage = App.Room.prototype.addMessage;
    
    window.adminMsgs = new Array();
    App.Room.prototype.addMessage = function (anus) {
        if (showAll || !amShit($.trim(anus.message.toLowerCase()))) {
            addMessage.call(this, anus);
        } 
        if(anus.style === "admin") {
            window.adminMsgs.push(anus);
            //console.log(anus.message);
            handleAdminMsg(anus);
        }
    };
    
    var autoSpam = true;
    var slowMode = true;
    var autoInterval = 30;
    var lastSpamTime = 0;
    var lastLastSpamTime = 0;
    var timeConfirmedSlow = timeSecs();
    var tryTime = 100; //seconds to wait before testing whether the room's slow again
    var timeBuffer = 2; //seconds to add to intervals, to avoid sending too fast
    
    var tooFastRegex = /This room is in slow mode and you are sending messages too quickly\. You will be able to talk again in (\d+) seconds\./;
    var genericTooFastRegex = /Your message was not sent because you are sending messages too quickly\./;
    var identicalRegex = /Your message was not sent because it is identical to the previous one you sent, less than (\d+) seconds ago\./;
    var slowModeRegex = /This room is now in slow mode\. You may send messages every (\d+) seconds/;
    
    handleAdminMsg = function(msg) {
        var tooFastBy, slowModeTime, identicalTime;

        //Only read admin messages in auto-spam mode
        if(!autoSpam) return;

        //Catch if we posted too fast
        if( (tooFastBy = tooFastRegex.exec(msg.message)) !== null ) {
            tooFastBy = parseInt(tooFastBy[1]);
            //Post again after time
            spamIn(tooFastBy);
            tooFastTime = lastSpamTime - lastLastSpamTime;
            enterSlowMode(tooFastTime + tooFastBy);
            console.log("Too fast by " + tooFastBy);
        }
        else if(msg.message.match(genericTooFastRegex)) {
            setAutoInterval(autoInterval * 2);
            console.log("Generically too fast!");
        }
        else if( (identicalTime = identicalRegex.exec(msg.message)) !== null) {
            //Does this mean we're in slow mode? Let's assume yes.
            identicalTime = parseInt(identicalTime[1]);
            tooFastTime = lastSpamTime - lastLastSpamTime;
            canSpamIn = identicalTime - tooFastTime;
            spamIn(canSpamIn);
            enterSlowMode(identicalTime);
            console.log("Identical message! Time:"+identicalTime+". Only waited: "+tooFastTime+". Resend in " + canSpamIn); //30-0-30??
        }
        else if( (slowModeTime = slowModeRegex.exec(msg.message)) !== null) {
            slowModeTime = parseInt(slowModeTime[1]);
            //Update auto-timer
            enterSlowMode(slowModeTime);
            console.log("Entered slow mode!");
        }
        else {
            console.log(msg.message);
        }
    }
    
    enterSlowMode = function(time) {
        slowMode = true;
        setAutoInterval(time);
        timeConfirmedSlow = timeSecs();
    }

    function setAutoInterval(time) {
        time = Math.floor(time);
        autoInterval = time;
        if(autoSpam){
            $("input#spam-interval").val(time + timeBuffer);
        }
    }

    //Returns new spam interval in seconds
    decideInterval = function() {
        //var timeSinceConfirmedSlow = (timeSecs() - timeConfirmedSlow);
        //if(slowMode && timeSinceConfirmedSlow > tryTime) {
            //console.log("Checking if still slow...");
            //slowMode = false;
            //setAutoInterval(5);
        //}
        return autoInterval;
    }
        
    
    // SPAMMING
    $("#spam-notice").hide();
    
    function spam(){
        var textbox = $(".chat-interface .textarea-contain textarea");
        var old_shit = textbox.val();
        var text = $("#spam-text").val().toString(); 
        textbox.val(text); 
        
        textbox.focus().blur();
        $(".send-chat-button button")[0].click();
        lastLastSpamTime = lastSpamTime;
        lastSpamTime = timeSecs();
        
        $("#spam-notice").show();
        $("#spam-notice").fadeOut(3000);
        textbox.val(old_shit);
        
        var interval =  autoSpam ? decideInterval() : parseInt($("#spam-interval").val());
        spamIn(interval);
    }
    
    //sets timer to spam, in seconds
    function spamIn(interval) {
        if(autoSpam) interval += timeBuffer;
        interval = Math.floor(interval);
        clearTimeout(spamhandle);
        spamhandle = setTimeout(spam, interval * 1000);
        counter($("#spam-counter"), interval);
    }
    
    //Returns "manual", "auto", or "none" based on radio buttons
    function getSpamMode() {
        return $("input:radio[name=spam-radio]:checked").val();
    }
    
    $("input:radio[name=spam-radio]").change(function(){
        var timeSince = timeSecs() - lastSpamTime;

        if(getSpamMode() === "manual") {
            autoSpam = false;
            $("input#spam-interval").removeAttr("disabled");
            clearTimeout(spamhandle);
            var interval = parseInt($("#spam-interval").val());
            if(timeSince < interval) {
                spamIn(interval - timeSince);
            }
            else spam();
        }
        else if(getSpamMode() === "auto") {
            autoSpam = true;
            $("input#spam-interval").attr("disabled", "true");
            clearTimeout(spamhandle);
            setAutoInterval(autoInterval);
            if(timeSince < autoInterval) {
                spamIn(autoInterval - timeSince);
            }
            else spam();
        }
        else if(getSpamMode() === "none") {
            autoSpam = false;
            $("input#spam-interval").removeAttr("disabled");
            clearTimeout(spamhandle);
            clearTimeout(counterHandle);
            $("#spam-counter").hide();
        }
    });
    
    //sets counter, in seconds
    function counter($el, n) {
        $("#spam-counter").show();
        clearTimeout(counterHandle);
        (function loop() {
            $el.html(n);
            if (n--) {
                counterHandle = setTimeout(loop, 1000);
            }
        })();
    }

    function timeSecs() {
        var deito = new Date();
        return deito.getTime() / 1000;
    }
    
    $(window).resize();
}

function loopydoo (){
    if ( document.readyState == 'complete' && $("div.chat-interface").size() > 0 ) {
        setUpTheShit();
    }
    else {
        setTimeout(loopydoo, 500);
    }
}

loopydoo();

}

//Inject dat shit nigga aaawwww yiss
var script = document.createElement('script');
script.textContent = '(' + tppmain.toString() + ')();';
document.body.appendChild(script);

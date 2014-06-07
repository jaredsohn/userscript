// ==UserScript==
// @name       SimuChat++
// @namespace  tag:seronis@gmail.com,2014-1-1:simunomics
// @version    1.2.1
// @description  Simunomics Chat Enhancements
// @match      http://simunomics.com/Self-ChatPopout.php
// @match      http://www.simunomics.com/Self-ChatPopout.php
// @copyright  2014+, Seronis
// ==/UserScript==

document.title = "SimuChat++";

var idleInformed = false;
var periodicCheck_orig = periodicCheck;
periodicCheck = function() {
    if (Mode == 'Embed') return true;
    if (CheckDelay > 0 && CheckDelay < 10000) CheckDelay = Math.max(10000,CheckDelay + 100);
    getCommentsSince(true);
    var Current = new Date();
    
    if (Current.getTime() > LiveUntil.getTime()) {
        document.title = "SimuChat++  Idle: " + Math.round(Current.getTime()/1000 - LiveUntil.getTime()/1000);
        if(idleInformed == false) {
            $("#FullChatShadeBlock").show();
            $("#ActiveConfirm").show();
            $("#ActiveConfirm > p > input").focus();
            idleInformed = true;
            playSound("Alert");
            CheckDelay = 10000;
        }
    }
    if (CheckDelay > 0) window.setTimeout(periodicCheck, CheckDelay);
}

var resumeChecks_orig = resumeChecks;
resumeChecks = function() {
    if (Mode == 'Embed') return true;
    $("#ActiveConfirm").hide();
    $("#FullChatShadeBlock").hide();
    var Current = new Date();
    LiveUntil.setTime(Current.getTime() + 1800000);
    CheckDelay = 5000;
    idleInformed = false;
    document.title = "SimuChat++";
    periodicCheck();
}

var sendComment_orig = sendComment;
sendComment = function() { 
    if (! CanSend) return false;
    if ($("#ChatEntryText").val().trim().length <= 1) {
    //  var Current = new Date();
    //	displayComment(4, "CompanyName", Current.getTime(), "Test message ...")
        return true;
    }
    $.post("http://face.simunomics.com/API-ChatLog.php?Method=Enter&Last="+LatestID, $('#ChatForm').serializeArray(), function(data) {
        if (typeof data.E != 'undefined') $("#ChatStatus").html(data.E);
        for (x in data.L) processComment(data.L[x]); // Since we communicated anyway, get latest updates (including confirmation on the sent)
        displayNames(data.N);
        playSound("Message");
    }, "json"); 
    $("#ChatEntryText").val("");
    floodProtectOn();
    CheckDelay = 2000; // Check more frequently after sending
    var Current = new Date();
    if (Mode != 'Embed') LiveUntil.setTime(Math.max(LiveUntil.getTime(), Current.getTime() + 1800000));
}

var displayComment_orig = displayComment;
displayComment = function(PlayerID, CompanyName, Time, Message) {
    if (Mode == "Pop" || Mode == "Float") {
        var msginfo = $("<div class='Info'></div>");
        msginfo.append("<div class='Name'>"+CompanyName+"</div>");
        
        $("<div class='ChatComment' PID='"+PlayerID+"'/>")
    	    .append("<a class='Logo' href='Headquarters.php?Company="+PlayerID+"' onclick='return popup(this, \"_HQ\")'></a>")  //<a class="Name" href="Headquarters.php?Company=21956" onclick="return popup(this, '_HQ')">
    	//	.append("<div class='Info'><div class='Name'>"+CompanyName+"</div><div class='Time'>"+Time+"</div></div>")
    	    .append(msginfo)
    	    .append("<div class='Text'>"+parseComment(Message)+"</div>")
    	    .appendTo("#ChatScroll");
        handlePlayerCustoms(PlayerID);
        $("#ChatScroll").scrollTop($("#ChatScroll")[0].scrollHeight);
        
        var timeinfo = $("<a class='Time'>"+Time+"</a>");
        msginfo.append(timeinfo);
        timeinfo.click( function(event){
            var cscroll = $("#ChatScroll");
            var bttn = event.target;
            
            while( cscroll[0].firstChild != bttn.parentNode.parentNode ) {
                cscroll[0].removeChild(cscroll[0].firstChild);
            }
        });
    } else if (Mode == "Embed") {
        $("<p />")
    	    .append("<a class='nm' href='Headquarters.php?Company="+PlayerID+"' onclick='return popup(this, \"_HQ\")'>"+CompanyName+"</a> ")
    	    .append(parseComment(Message))
    	    .appendTo("#ChatScroll");
        $("#ChatScroll").scrollTop($("#ChatScroll")[0].scrollHeight);		
    }
}

var scrollTop_orig = $.fn.scrollTop;
$.fn.scrollTop = function(nValue) {
    if( document.activeElement == $("#ChatEntryText")[0] ) {
        scrollTop_orig.apply(this,[nValue]);
        return;
    }
    return;
}
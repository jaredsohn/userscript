// ==UserScript==
// @name         Electric Imp IDE Tweaks
// @namespace    http://beardedinventor.com
// @version    	 0.1
// @description  Various modifications to the IDE to make it a bit more friendly
// @match        https://ide.electricimp.com/*
// @copyright    2014, Matt Haines

// ==/UserScript==

function waitForjQuery() {
    if (unsafeWindow.$ != null) {
        waitForLog();
    } else {
        setTimeout(waitForjQuery, 100);
    }
} waitForjQuery();

function waitForLog() {
    if($("#log").length) {
		main();
    } else {
        setTimeout(waitForLog, 100);
    }
}

function main() {
    $("#log").css("width", "50%");
    $("#log").css("float", "left");
    $("#log").addClass("leftLog");
    
    $(".logging-pane>.pane-title").addClass("leftLogTitle");
    $(".leftLogTitle").css("width", "50%");
    $(".leftLogTitle").css("float", "left");
    $(".leftLogTitle").after($(".leftLogTitle").clone(true).addClass("rightLogTitle").removeClass("leftLogTitle").css("float", "right"));
    $(".rightLogTitle>")
    $("#log").after($("#log").clone(true).addClass("rightLog").removeClass("leftLog"));
    $(".rightLogTitle>.pane-name").html("Watch Log");
    $(".rightLogTitle>.pane-name").after("<span class=\"watch-input\"><input id=\"watch-input\" style=\"margin: 0px 0px 0px 10px\" type=\"text\"></span>");
    $(".rightLogTitle>#clear-log-button").attr("id", "right-log-button")
    	.css("float", "right")
    	.css("font-size","10.5px")
	    .css("background-color","#DDD")
    	.css("color", "#333")
    	.css("padding","2px 4px 1px 4px")
	    .css("border-radius","3px")
		.css("cursor","pointer")
	    .css("opacity","0.7")
    $("#right-log-button").click(function() {
        $(".rightLog").empty();
    });
    
    $("#watch-input").keyup(function() {
        $(".rightLog").empty();
        $(".message.processed").each(function() {
            $(this).removeClass("processed");
        });
    });
    
    setInterval(function() {
		$(".rightLog").css("height", $(".leftLog").css("height"));
        if ($("#watch-input").val().length > 0) {
            $(".message:not(.processed)").each(function() {
                $(this).addClass("processed");
                var logMessage = $(this).html().split("</span>")[1];
                if (logMessage.indexOf($("#watch-input").val()) >= 0) {
                    $(".rightLog").append($(this).clone(false));
                }
            });
        }
        $(".message:not(.date-processed)").each(function() {
            $(this).addClass("date-processed");            
            var logMessage = $(this).html().split("</span>")[1];
            if (logMessage.indexOf("sleeping until") >= 0) {
                var ts = logMessage.substring(15, logMessage.length) * 1;
                var d = new Date(ts);
                var message = "sleeping until " + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.toLocaleTimeString();
                $(this).html($(this).html().split("</span>")[0] + message);
            }
        });
    }, 100);
}

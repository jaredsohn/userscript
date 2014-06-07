// ==UserScript==
// @name       TheRPF Thread Manager
// @namespace  http://perludus.com/
// @version    1.1
// @description  Script that adds hide/unhide feature to TheRFP forum threads.  Hiding is persistent and saved between sessions.  No editing of the script required.  Updated 4/22/2013 to support new forum layout.
// @include    http://www.therpf.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==


// --- Fetch the master list of hidden threads from persistent storage
var blocklist = GM_getValue("blocklist", "").split(",");

if (GM_getValue("firstTime", true)) {
    GM_setValue("firstTime", false);
    alert("Welcome to TheRPF Thread Manager.  Click the little 'H' by a thread to hide it, and 'Show All' at top to show hidden threads.  You can unhide a thread by showing all, then clicking the little 'U' button by a previously hidden thread.");    
}

// --- Contents of hide and show buttons
var hidden_html = "H";
var show_html = "U";

// --- Hide all threads in the block list
for (var i=0; i<blocklist.length; i++) {
    $("li.threadbit#thread_"+blocklist[i]).css("display", "none").addClass("hidden_thread");
}

// --- Add click to hide buttons to left column
$("ol li.threadbit").each(function( index ) {
    var id_str = $(this).attr("id");
    if (typeof id_str != 'undefined') {
        var id_array = id_str.split("_");
        var button = $("<button id='"+id_array[1]+"' style='font-size:10px;position:absolute;left:0;top:6px;padding-left:1px;padding-right:1px'></button>").attr("id", id_array[1]);
        // --- If already hidden, show "show" button, else show "hide" button
        if ($(this).hasClass("hidden_thread")) {
            $(button).html(show_html);
        } else {
            $(button).html(hidden_html);
        }
        
        // --- Click handler for show/hide button
        $(button).click(function(event) {
            // --- Keep click from being used for anything else
            event.preventDefault();
            // --- Get thread ID
            var id = $(this).attr("id");
            console.log("clicked and got id " + id);
            // --- If click is on hide button...
            if ($(this).text() == hidden_html) {
                // --- Not hidden yet, add to ignore list (if not in list already)
                if (blocklist.indexOf(id) == -1) {
                    blocklist.push(id);
                    GM_setValue("blocklist", blocklist.join());
                    if ($("#master-show-hide-button").text() == "Show All") {
                        $("li.threadbit#thread_"+id).addClass("hidden_thread").hide(1000, function() {$(button.html(show_html))});
                    } else {
                        $("li.threadbit#thread_"+id).addClass("hidden_thread");
                        $(button).html(show_html);
                    }
                }
            } else {
                // --- Already ignored, remove it
                var index = blocklist.indexOf(id);
                // --- Rebuild string of comma separated thread ids
                blocklist.splice(index, 1);
                // --- Store in persistent storage so they are here again later
                GM_setValue("blocklist", blocklist.join());
                // --- Remove hidden class and setup "hide" button
                $("#td_threadstatusicon_"+id).removeClass("hidden_thread");
                $(button).html(hidden_html);
            }
        });
        $("a.threadstatus", this).append(button);
        $("a.threadstatus", this).css("position:relative");
    }
});

// --- Add show all/hide all button
var button = $("<br/><button id='master-show-hide-button' style='font-size:10px;padding-left:4px;padding-right:4px;float:left;clear:left'>Show All</button>");
// --- Click handler to globally show/hide all hidden threads
$(button).click(function(event) {
    // --- Prevent clicks from going to other things
    event.preventDefault();
    // --- Based on button text decide if we are showing all or hiding all previously hidden
    if ($(this).text() == "Show All") {
        $(this).text("Hide All");
        $(".hidden_thread").show();
    } else {
        $(this).text("Show All");
        $(".hidden_thread").hide();
    }
});
// --- Add the button to the page (up top)
$("div.above_threadlist").append(button);    

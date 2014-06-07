// ==UserScript==
// @name       Improve Zattoo
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  A few improvements to zattoo.ch: Stopps the top notification bar to overlay usefull links. Adds a right-arrow next to the left-arrow to reduce mouse milage in the Guide. Adds missing record buttons for historic items in the Guide. Adds shortcuts: Guide left/right with arrows; 3: 3-hour guide; 5: 5-hour guide; g: program guide / now, s: browse, r: recordings.
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @match      http://zattoo.com/*
// @copyright  2014, Daniel Keller
// ==/UserScript==


/* **********************************
 * TO DO

cursor selection for anything

Not able to:
- interact with flash (to full screen, back from full screen)
- Switch live button to record button
- keep injected add-button after add was pressed
*/



/*************************************************************************************
 * Make the obstructive message box an unobstructive message box
 */

GM_addStyle("#notify {left: 500px; top: 0px;}");


/*
var delayFun = function () {
};
setTimeout(delayFun, 6000);
*/


/*************************************************************************************
 * Set Additional Hour Arrow
 */

$("#mainpane").bind("DOMSubtreeModified", function() {
    setAdditionalHourArrow();
    addMissingRecordButtons();
});




/*************************************************************************************
 * Add missing Record Buttons
 */

var addMissingRecordButtons = function() {
    var ulToCheck = $("#mainpane ul.programs").last(); 
    var theA;
    
    if (ulToCheck.length === 0 || $("li", ulToCheck).length === 0) {
        return;
    }
    
    if (ulToCheck.data("IZ_buttonsAdded") === true) {
        return;
    }
    
    ulToCheck.data("IZ_buttonsAdded", true);
    
    $("li", ulToCheck).each(function(index) {
        var el = $("a", this).last();
        if(el.hasClass("icon-plus-sign")) {
            return;
        }

        if(el.hasClass("icon_live_guide") || el.hasClass("icon_recall_guide")) {
            
            var addButton = function(jqParent, isAdd) {
                var newSaveButton;
                
                if (isAdd) {
                    newSaveButton = $("<a class='icon-plus-sign   btn_record        watch_action' title='Speichern' data-toggle_text='Entfernen' style='margin: 4px 0 0 0'></a>");
                } else {
                    newSaveButton = $("<a class='icon-remove-sign btn_record_remove watch_action' title='Entfernen' data-toggle_text='Speichern' style='margin: 4px 0 0 0'></a>");
                }
                
                jqParent.append(newSaveButton);
            };
            
            addButton(el.parent(), true);
        }
    });
};


/*************************************************************************************
 * Set Additional Hour Arrow
 */


var setAdditionalHourArrow = function() {
    if ($("#secondHourNextButton").size() === 1) {
        return;
    }
    
    var rightbutton = $(".icon_arrow_right").parent().filter("a[data-action='selectHour']");
    var leftbutton  = $(".icon_arrow_left").parent().filter("a[data-action='selectHour']");
    
    if (rightbutton.size() === 0 || leftbutton.size() === 0) {
        return;
    }
    
    var newRightbutton = rightbutton.clone().removeClass("next").attr("id","secondHourNextButton");
    leftbutton.after(newRightbutton);    
};


/*************************************************************************************
 * Key handling
 */

$("body").keyup(function(event) {
    //console.log(event.keyCode);
    //console.log(event);
    var wheelEvent, el;
    
    if (event.keyCode === 82) {  // Key "R" for Recordings 
        $(".controlpane_fold").trigger("click");
        $(".toggle_sidebar").eq(1).trigger("click");
    }
    
    if (event.keyCode === 71 || event.keyCode === 78) {  // Key "G" for Guide  or N for now 
        window.history.pushState(null, "Zattoo Programm", "/guide");
        window.dispatchEvent(new PopStateEvent("popstate"));
    }

    if (event.keyCode === 66) {  // Key "B" Browse 
        window.history.pushState(null, "Zattoo Programm", "/browse");
        window.dispatchEvent(new PopStateEvent("popstate"));
    }

    if (event.keyCode === 37) {  // Left Arrow
        if (event.ctrlKey) {
            window.history.pushState(null, "Zattoo Programm", $(".icon_arrow_left").parent().filter("a[data-action='selectDay']").first().attr("href"));
        }
        else {
            window.history.pushState(null, "Zattoo Programm", $(".icon_arrow_left").parent().filter("a[data-action='selectHour']").first().attr("href"));
        }
        window.dispatchEvent(new PopStateEvent("popstate"));
    }
    
    if (event.keyCode === 39) {  // Right Arrow 
        if (event.ctrlKey) {
            window.history.pushState(null, "Zattoo Programm", $(".icon_arrow_right").parent().filter("a[data-action='selectDay']").first().attr("href"));
        }
        else {
            window.history.pushState(null, "Zattoo Programm", $(".icon_arrow_right").parent().filter("a[data-action='selectHour']").first().attr("href"));
        }
        window.dispatchEvent(new PopStateEvent("popstate"));
    }
    
    if (event.keyCode === 51 || event.keyCode === 99) {  // Key 3 
        window.history.pushState(null, "Zattoo Programm", $("a[data-label='3-hours']", ".time_zoom").attr("href"));
        window.dispatchEvent(new PopStateEvent("popstate"));
    }
    
    if (event.keyCode === 53 || event.keyCode === 101) {  // Key 5 
        window.history.pushState(null, "Zattoo Programm", $("a[data-label='5-hours']", ".time_zoom").attr("href"));
        window.dispatchEvent(new PopStateEvent("popstate"));
    }

    if (event.keyCode === 33) {  // Page Up
        el = $("#guide div.jspContainer");
        wheelEvent = new WheelEvent('wheel', { deltaX: 0, deltaY: el.height() * -2.8, deltaZ: 0});
        $("#guide div.jspContainer").get(0).dispatchEvent(wheelEvent);
    }
    
    if (event.keyCode === 34) {  // Page Down 
        el = $("#guide div.jspContainer");
        wheelEvent = new WheelEvent('wheel', { deltaX: 0, deltaY: el.height() * 2.8, deltaZ: 0});
        $("#guide div.jspContainer").get(0).dispatchEvent(wheelEvent);
    }
    
    if (event.keyCode === 38) {  // Key Up 
        el = $("#guide div.jspContainer");
        wheelEvent = new WheelEvent('wheel', { deltaX: 0, deltaY: el.height() * -0.5, deltaZ: 0});
        $("#guide div.jspContainer").get(0).dispatchEvent(wheelEvent);
    }
    
    if (event.keyCode === 40) {  // Key Down 
        el = $("#guide div.jspContainer");
        wheelEvent = new WheelEvent('wheel', { deltaX: 0, deltaY: el.height() * 0.5, deltaZ: 0});
        $("#guide div.jspContainer").get(0).dispatchEvent(wheelEvent);
    }

    
    if (event.keyCode === 36) {  // Home 
        el = $("#guide div.jspContainer");
        wheelEvent = new WheelEvent('wheel', { deltaX: 0, deltaY: -50000, deltaZ: 0});
        $("#guide div.jspContainer").get(0).dispatchEvent(wheelEvent);
    }
    
    if (event.keyCode === 35) {  // End 
        el = $("#guide div.jspContainer");
        wheelEvent = new WheelEvent('wheel', { deltaX: 0, deltaY: 50000, deltaZ: 0});
        $("#guide div.jspContainer").get(0).dispatchEvent(wheelEvent);
    }


});
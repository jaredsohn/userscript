// 30 Boxes Accelerator Keys
// Version 0.3.1
// 2007-04-18
// Further tweaks by Hillary Hartley, http://3to5.com/
// Tweaked by Zachary Allia, http://zachallia.com/
// Original Version Debajit Adhikary, http://debajit.com/
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          30 Boxes Accelerator Keys
// @namespace     http://svn.debajit.com/30boxes/greasemonkey
// @description	  One click keyboard shortcuts for 30 Boxes
// @include       http://30boxes.com/*
// @include       http://www.30boxes.com/*
// @exclude       http://*30boxes.com/account
// @exclude       http://*30boxes.com/account/*
// @exclude       http://*30boxes.com/blog
// @exclude       http://*30boxes.com/blog/*
// @exclude       http://*30boxes.com/forum
// @exclude       http://*30boxes.com/forum/*
// @exclude       http://*30boxes.com/donate
// @exclude       http://*30boxes.com/donate/*
// ==/UserScript==


// Look for Find dialog form
var form30boxesAcceleratorKeys_ = document.getElementsByTagName("form");
for(var i = 0; i < form30boxesAcceleratorKeys_.length; ++i)
{
    if(form30boxesAcceleratorKeys_[i].parentNode.id == "findPopup")
    {
        form30boxesAcceleratorKeys_[i].addEventListener("submit",
        function()
        {
            // Hide Find Dialog after find operation
            document.getElementById("findPopup").style.visibility = "hidden";
            document.getElementById("findInput").blur();
        },
        false);
        break;
    }
}

window.addEventListener("keydown",
function (e)
{
    // We want only single keys, no modifiers
    if(e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)
        return false;

    // Esc is allowed even when you're editing text
    if(e.keyCode == 27)
    {
        // Hide Find Dialog
        document.getElementById("findPopup").style.visibility = "hidden";
        document.getElementById("findInput").blur();
        
	// show update form
	unsafeWindow.toggleDisplayOff('statusForm');
	document.getElementById('newStatusString').blur();
        // switch status view
	unsafeWindow.toggleDisplayOn('statusLabel');
    }

    // We don't want to intercept keystrokes when the user is typing
    switch(e.target.tagName)
    {
        case "TEXTAREA":
            return false;

        case "INPUT":

            // If focus is on the Zoom button in Find dialog, we want
            // the shortcut keys to still have effect
            if(e.target.getAttribute("type") != "image")
                return false;
    }

    var key = String.fromCharCode(e.keyCode);

    // Escape
    if (e.keyCode == 27 || key == "E")
    {
        // Hide Find dialog
        document.getElementById("findPopup").style.visibility = "hidden";
        document.getElementById("findInput").blur();
    }

    switch(key)
    {
        // Display the calendar
        case "C":

            // Hide Find dialog
            document.getElementById("findPopup").style.visibility = "hidden";
            document.getElementById("findInput").blur();

            // Hide webtop
            document.getElementById("webtop").style.display = "none";
            break;

        // Find
        case "F":

            // "Press" Esc
            try
            {
                with(unsafeWindow)
                {
		hideEditEvent();
		hideDayView();
		showWindowShade('indexWindowShade','none');
		hideSearchView();
		hideWeekView();
		hideSupermail();
		hideTwitterUpdates();
		hideTodos();
                	oneBoxPopupDone(false, 'input');
                	oneBoxPopupDone(false, 'todoInput');
                	oneBoxPopupDone(false, 'editEventInvites');
                	oneBoxPopupDone(false, 'dayViewInput');
                	oneBoxPopupDone(false, '');
                }
            }
            catch(e){}

            // Close webtop
            document.getElementById("webtop").style.display = "none";

            // Show find menu
            document.getElementById("findPopup").style.visibility = "visible";

            // Update find tags
            unsafeWindow.updateTagsInFindMenu();

            // Highlight
            with(document.getElementById("findInput"))
            {
                // style.background = "#ffc";
                // style.color = "#000";
                focus();
            }

            // Don't type F into the input box :) That F was simply to get to the Find dialog
            e.stopPropagation();
            e.preventDefault();

            break;

        // Jump to Today
        case "I":
         if (unsafeWindow.isWeekViewVisible()) {
	   	 unsafeWindow.showWeekView();
	     } else {
            unsafeWindow.moveCalendarNow();
            }
            break;

        // Scroll to older events for calendar or week
        case "J":
         if (unsafeWindow.isWeekViewVisible()) {
	   	 weekTime = unsafeWindow.gWeekViewTime;
	   	 unsafeWindow.showWeekView(weekTime-(60*60*24*7*1000));
	     } else {
            unsafeWindow.moveCalendar(-60*60*24*7*1000);
          }
         break;

        // Scroll to newer events for calendar or week
        case "K":
         if (unsafeWindow.isWeekViewVisible()) {
	    	 weekTime = unsafeWindow.gWeekViewTime;
	   	 unsafeWindow.showWeekView(weekTime+(60*60*24*7*1000));
	     } else {
           unsafeWindow.moveCalendar(60*60*24*7*1000);
          }
         break;
	   
	   // HIDE EVERYTHING GO TO ONE BOX
        case "Q":

            // Hide Find dialog
            document.getElementById("findPopup").style.visibility = "hidden";
            document.getElementById("findInput").blur();

            // Hide other dialogs etc.
            try
            {
                with(unsafeWindow)
                {
		hideEditEvent();
		hideDayView();
		showWindowShade('indexWindowShade','none');
		hideSearchView();
		hideWeekView();
		hideSupermail();
		hideTwitterUpdates();
		hideTodos();
                	oneBoxPopupDone(false, 'input');
                	oneBoxPopupDone(false, 'todoInput');
                	oneBoxPopupDone(false, 'editEventInvites');
                	oneBoxPopupDone(false, 'dayViewInput');
                	oneBoxPopupDone(false, '');
                }
            }
            catch(e){}

            // Hide webtop
            document.getElementById("webtop").style.display = "none";

            // Highlight Quick Add input box
            with(document.getElementById("input"))
            {
                // style.background = "#ffc";
                // style.color = "#000";
                focus();
            }

            // Don't type Q in the quick add dialog! :)
            e.stopPropagation();
            e.preventDefault();
            break;

	// New Event
	case "N":
		unsafeWindow.showEditEvent(0);
		e.stopPropagation();
		e.preventDefault();
		break;
	
	// Buddy Updates
	case "B":
		unsafeWindow.showBuddyUpdates();
		break;
	
	// SuperMail
	case "S":
		unsafeWindow.showSupermail();
		break;
	
	// SuperMail New Message
	case "M":
		unsafeWindow.showSupermail();
		unsafeWindow.newSMMessage();
		break;
	
	// Week View
	case "V":
		unsafeWindow.showWeekView();
		break;
	
	// Twitters
	case "T":
		unsafeWindow.showTwitterUpdates();
		break;
	
	// Twitters
	case "U":
		// switch status view
		unsafeWindow.toggleDisplayOff('statusLabel');
		
		// show update form
		unsafeWindow.toggleDisplayOn('statusForm');
		document.getElementById('newStatusString').focus();
		
		// Don't type U in the quick add dialog
		e.stopPropagation();
		e.preventDefault();
		break;
	
	
	// To Do Items
	case "D":
		// Hide Find dialog
		document.getElementById("findPopup").style.visibility = "hidden";
		document.getElementById("findInput").blur();
		
		// Show to do list
		unsafeWindow.showTodos();
		break;
	
	// Webtop
		case "W":
		unsafeWindow.toggleDisplayOn('webtop');
		unsafeWindow.showWebtopView('getRecentUpdatesForWebtop','');
		break;
		
	// Recent Updates
		case "R":
		unsafeWindow.showSearchView('getRecentUpdates','showFeeds=1');
		break;
	
	// Help
	case "H":
		alert(
		"W -- Webtop\n" +
		"C -- Calendar\n" +
		"V -- Week View\n" +
		"D -- To Do Items\n" +
		"S -- Supermail\n" +
		"M -- Supermail New Message\n" +
		"B -- Buddy Updates\n" +
		"T -- Twitters\n" +
		"U -- Update Twitter Status\n\n\n" +
		"Q -- Quick Add (One Box)\n" +
		"N -- Create New Event\n" +
		"F -- Find\n" +
		"R -- Recent Updates\n" +
		"J -- Scroll Week Back\n" +
		"K -- Scroll Week Forward\n" +
		"I -- Jump to Today\n\n\n" +
		"H -- Display this help on 30 Boxes Shortcut Keys\n" +
		"ESC -- Close All\n"
            );
            break;
    }
}
, false);

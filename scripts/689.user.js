// gmailmarkreadbutton.user.js
//
// Copyright (c) 2005-2008, Jim Lawton, Tom Spear
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "GMail Mark Read Button", and click Uninstall.
//
// Based on the Gmail Delete Button script by Anthony Lieuallen and the 
// Gmail Smart Delete script by Paul Moriak. I'm learning both gmail 
// hacking and Javascript, so this is probably horrible...   
//
// Incorporated fixes from Tom Spear's version (http://userscripts.org/scripts/show/6237). 
// 
// Requires Greasemonkey 0.6.4 and Firefox 1.5 or later.
// Works with Firefox 2.0.
//
// ----------------------------------------------------------------------------
// WHAT IT DOES:
// If any unread message is selected it places a "Mark Read" button on the page
// next to the Archive button. If read messages are selected the button 
// changes to "Mark Unread". 
// ----------------------------------------------------------------------------
// HISTORY:
//  2005-04-25  0.1   Initial version.
//  2005-05-03  0.2   Button works in Spam folder also.
//  2005-05-18  0.3   Now works with Greasemonkey 0.3.3.
//  2005-05-18  0.4   Rewrite. Button is now only enabled if unread messages are 
//                    selected.
//  2005-05-26  0.5   Updated from Paul Moriaks latest version of Gmail Smart Delete, 
//                    to add support for keyboard shortcuts.
//  2005-05-27  0.6   Fix a problem interoperating with the Smart Delete button. 
//                    This script was disabling the Delete button when reading a 
//                    mail item. Also, the Mark Read button now does not appear 
//                    at all in a mail item.
//  2005-05-27  0.7   Small changes to comments. 
//  2005-07-25  0.8   Fix for changed gmail URLs.
//  2005-11-22  0.9   Fixes for GM 0.6.3 and FF 1.5. Removed keypress stuff. 
//                    Added code to toggle between mark as read and mark as unread.
//  2006-04-20  0.10  Fixes for recent Gmail DOM changes. Works with FF 1.5.0.2.
//  2006-11-07  0.10b Fixes for wrapping of displayed items
//  2006-11-07  0.10c Fixes for the previous fixes where I forgot the bottom control bar
//  2006-11-08  0.10d Fixes for all wrapping issues, achieved by shrinking the font size 
//                    for the displayed items.
//  2008-02-14  1.0   Merged Tom Spear's fixes. Added global debug variable.
// ----------------------------------------------------------------------------

// ==UserScript==
// @name          Gmail Mark Read Button
// @author        Jim Lawton <jim dot lawton at gmail dot com> Modified by Tom Spear <Speeddymon at gmail dot com>
// @namespace     http://www.userscripts.org/people/171 and http://www.userscripts.org/people/3671
// @description   Adds a "Mark Read" or "Mark Unread" button to Gmail pages (active only when mail items are selected). This version fixes all wrapping issues, and allows to work even on GMail for Domains.
// @include       http*://*mail.google.com/*
// @date          2008-02-14
// @version       1.0
// @GM_version    0.6.6
// ==/UserScript==

// ------------------------------------------------------------------------

var GMR_DEBUG = false;

(function() 
{
    function _gmr_Mark(e) 
    {
        if (GMR_DEBUG)
            GM_log("_gmr_Mark call, e=" + e);

        var button;
        var cmdIndex = -1;

        try {
            for (var i=0; i<2; i++) {
                button = _gmr_GetElement('_gmr_button' + i);
                if (button) {
                    break;
                }
            }
    
            if (button) {
                if (!button.wrappedJSObject.disabled) {
                    cmdBox = button.wrappedJSObject.parentNode.getElementsByTagName('select')[0];
                    cmdBox.onfocus();			
                }
            }
        
            // Find the command index for 'mark as read'.
            for (var i=0; i<cmdBox.options.length; i++) {
                if ((cmdBox.options[i].value == 'rd'  || cmdBox.options[i].value == 'ur') && !cmdBox.options[i].disabled) {
                    cmdIndex = i;
                    break;
                }
            }
            // Don't try to continue.
            if (cmdIndex == -1) 
                return;
        
            // Set the command index and fire the change event.
            cmdBox.selectedIndex = cmdIndex;
            cmdBox.onchange();

            // Check if the button needs to be enabled.
            window._gmr_ValidateCheckBoxes();
        } catch(e) {
            GM_log("[_gmr_Mark]: " + e);
        } 

        if (GMR_DEBUG)
            GM_log("_gmr_Mark return");
    }
    
    
    function _gmr_GetElement(id)
    {
        if (GMR_DEBUG)
            GM_log("_gmr_GetElement call, id=" + id);

        try {
            var el = window.document["getElementById"](id);
            var retval = false;
            
            if (el) 
                retval = el;
        } catch(e) {
            GM_log("[_gmr_GetElement]: " + e);
        } 

        if (GMR_DEBUG)
            GM_log("_gmr_GetElement return " + retval);
        return retval;
    }
    
    
    function _gmr_MakeDomButton(id) 
    {
        if (GMR_DEBUG)
            GM_log("_gmr_MakeDomButton call, id=" + id);

        try {
            var button = window.document["createElement"]('button');	
            
            button.setAttribute('type', 'button');
            button.setAttribute('disabled', 'true');
            button.setAttribute('class', 'ab');
            button.setAttribute('id', '_gmr_button' + id);
            button.innerHTML = 'Mark Read';
            button.addEventListener('click', _gmr_Mark, false);
        } catch(e) {
            GM_log("[_gmr_MakeDomButton]: " + e);
        } 

        if (GMR_DEBUG)
            GM_log("_gmr_MakeDomButton return " + button);

        return button;
    }
    
    //inserted by Speeddymon to fix right-aligned text from wrapping to next line.
    function _gmr_style(css)
    {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    //Sets the style to fix the wrapping issues
    var cssStyle = 'select { width: 130px !important; } .tbcr { display: none !important; } .tbcp { float: right !important; text-align: right !important; padding-top: 2px !important; } .tbcp, span.lk#nws, span.lk#nwr, span.lk#odr, span.lk#ods, span.lk#pt, span.lk#nt { font-size: 11px !important; }';
    
    function _gmr_InsertButton(container, id) 
    {
        if (GMR_DEBUG)
            GM_log("_gmr_InsertButton call, container=" + container + ", id=" + id);

        var retval = false;
        
        try {
            if (!container) {
                if (GMR_DEBUG)
                    GM_log("_gmr_InsertButton: no container!");
                return false;
            }

            if (_gmr_GetElement('_gmr_button' + id)) {
                if (GMR_DEBUG)
                    GM_log("_gmr_InsertButton: button already exists!");
                return false;
            }

            var button = _gmr_MakeDomButton(id);
            var point = -1;
            var spacer;
 
            spacer = document.createTextNode(" ");

            for (var i=0; i<container.childNodes.length; i++){
                if (container.childNodes[i].nodeName=="SELECT"){
                    point = i;	
                }
            }
        
            if (point == -1) {
                if (GMR_DEBUG)
                    GM_log("_gmr_InsertButton: dropdown not found!");
                return false;
            }

            // Set the insertion point immediately after the select dropdown.
            container.insertBefore(button, container.childNodes[point]);
            
            // Insert a preceding spacer.
            //container.insertBefore(spacer, button);
                    
            // Add an optional trailing spacer.
            //container.appendChild(spacer);

            retval = true;
        } catch(e) {
            GM_log("[_gmr_InsertButton]: " + e);
        } 
        
        if (GMR_DEBUG)
            GM_log("_gmr_InsertButton return " + retval);
        return retval;
    }
    
    
    function _gmr_PlaceButtons() 
    {
        if (GMR_DEBUG)
            GM_log("_gmr_PlaceButtons call");
        
        try {
            var topMenu = _gmr_GetElement('tam');  
    
            if (topMenu) {
                if (GMR_DEBUG)
                    GM_log("_gmr_PlaceButtons: Inserting button 0 in top menu.");
                _gmr_InsertButton(topMenu.parentNode, 0);
            } else {
                if (GMR_DEBUG)
                    GM_log("_gmr_PlaceButtons: Top menu not found!");
            }
            
            var botMenu = _gmr_GetElement('bam');  
    
            if (botMenu) { 
                if (GMR_DEBUG)
                    GM_log("_gmr_PlaceButtons: Inserting button 1 in bot menu.");
                _gmr_InsertButton(botMenu.parentNode, 1);
            } else {
                if (GMR_DEBUG)
                    GM_log("_gmr_PlaceButtons: Bottom menu not found!");
            }
        } catch(e) {
            GM_log("[_gmr_PlaceButtons]: " + e);
        } 
        
        if (GMR_DEBUG)
            GM_log("_gmr_PlaceButtons return");
    }
    
    
    function _gmr_SetButton(disabled, buttonText) 
    {
        if (GMR_DEBUG)
            GM_log("_gmr_SetButton call: disabled=" + disabled + " buttonText=" + buttonText);
        
        var button;

        window._gmr_ValidateButtons();
    
        try {
            for (var i=0; i<2; i++) {
                button = _gmr_GetElement('_gmr_button' + i);
                if (button) {
                    if (GMR_DEBUG)
                        GM_log("_gmr_SetButton: Setting button ", i);
                    button.disabled = disabled;
                    button.innerHTML = buttonText;
                }
            }
        } catch(e) {
            GM_log("[_gmr_SetButton]: " + e);
        } 
        
        if (GMR_DEBUG)
            GM_log("_gmr_SetButton return");
    }
    
    
    function _gmr_ValidateControls() 
    {
        if (GMR_DEBUG)
            GM_log("_gmr_ValidateControls call");
        
        window._gmr_ValidateButtons();
        window._gmr_ValidateCheckBoxes();
        
        if (GMR_DEBUG)        
            GM_log("_gmr_ValidateControls return");
    }


    window._gmr_ValidateButtons = function _gmr_ValidateButtons()
    {
        if (GMR_DEBUG)
            GM_log("_gmr_ValidateButtons call");

        // This gets called on the timer and may occur while the page 
        // is reloading.
        try {
            if (document) {
                // Don't create the button in a mail item.
                if (!document.location.search.match(/view=cv/)) {
                    // If neither buttons are visible we need to force the 
                    // re-creation of the buttons...
                    if (!_gmr_GetElement('_gmr_button0')) {
                        _gmr_PlaceButtons();
                    }
                }
            }	
        } catch(e) {
            GM_log("[_gmr_ValidateButtons]: " + e);
        } 

        if (GMR_DEBUG)
            GM_log("_gmr_ValidateButtons return");
    }
    
    
    window._gmr_ValidateCheckBoxes = function _gmr_ValidateCheckBoxes()
    {
        if (GMR_DEBUG)
            GM_log('_gmr_ValidateCheckBoxes call');

        var cmdBox;
        var cmdIndex = -1;
        var cmdEnabled = false;
        var button;
        var buttonText;
        var disabled = false;

        try {
            for (var i=0; i<2; i++) {
                button = _gmr_GetElement('_gmr_button' + i);
                if (button) {
                    break;
                }
            }
    
            if (GMR_DEBUG)
                GM_log("_gmr_ValidateCheckBoxes: button=" + button);
    
            if (button) {
                cmdBox = button.wrappedJSObject.parentNode.getElementsByTagName('select')[0];
                cmdBox.onfocus();	
                for (var i=0; i<cmdBox.options.length; i++) {   
                    if (GMR_DEBUG)
                        GM_log("_gmr_ValidateCheckBoxes: cmdBox.options[" + i + "].value: " + cmdBox.options[i].value);
                    if (cmdBox.options[i].value == 'rd' || cmdBox.options[i].value == 'ur') {
                        cmdIndex = i;
                        if (cmdBox.options[i].value == 'rd') {
                            buttonText = 'Mark Read';
                            if (GMR_DEBUG)
                                GM_log("_gmr_ValidateCheckBoxes: found mark read command at index " + i);
                        } else {
                            buttonText = 'Mark Unread';
                            if (GMR_DEBUG)
                                GM_log("_gmr_ValidateCheckBoxes: found mark unread command at index " + i);
                        }
                        if (cmdBox.options[i].disabled) {
                            disabled = true;
                        } 
                        break;
                    }
                }
            }
        
            if (cmdIndex > -1) { 
                _gmr_SetButton(disabled, buttonText);
            }
        } catch(e) {
            GM_log("[_gmr_ValidateCheckBoxes]: " + e);
        } 

        if (GMR_DEBUG)
            GM_log('_gmr_ValidateCheckBoxes return');
    }
    
    window._gmr_ProcessEvent = function _gmr_ProcessEvent(e) 
    {
        if (GMR_DEBUG)
            GM_log('_gmr_ProcessEvent call, e=' + e);

        var retval = false;

        try {
            if (!e) 
                var e = window.event;
            
            var strTarget = e.target;
        
            if (GMR_DEBUG)
                GM_log('_gmr_ProcessEvent: target=' + strTarget);
            
            if (!document.location.search.match(/view=cv/)) {
                if (_gmr_ValidateControls() != undefined) {
                    _gmr_ValidateControls();
                    setTimeout("_gmr_ValidateControls()", 500);
                    setTimeout("_gmr_ValidateControls()", 2000);
                    setTimeout("_gmr_ValidateControls()", 4000);
                    setTimeout("_gmr_ValidateControls()", 8000);
                    setTimeout("_gmr_ValidateControls()", 16000);
                }
            }
            
            var gmretval = routeEvent(e);
            
            if (gmretval != false) 
                retval = true;
        } catch(e) {
            GM_log("[_gmr_ProcessEvent]: " + e);
        } 

        if (GMR_DEBUG)
            GM_log('_gmr_ProcessEvent return ' + retval);
            
        return retval;
    }
    
    
    if (GMR_DEBUG)
        GM_log('Gmail Mark Read main enter');
    try {
        _gmr_style(cssStyle);

        if (document.location.search) {
            var _gmr_timer = null;
            
            if (document.location.search.match(/search=drafts/) ||		
                document.location.search.match(/name=htmlcompose/) ||
                document.location.search.match(/view=cv/) || 
                document.location.search.match(/view=page/)) {
                // Kill the event handler...
                window.removeEventListener('click', window._gmr_ProcessEvent, false);
                //window.removeEventListener('focus', window._gmr_ProcessEvent, false);
                //window.removeEventListener('blur', window._gmr_ProcessEvent, false);
            } else {
                // Set the event handler...
                if (window.captureEvents) { 
                    window.addEventListener('click', window._gmr_ProcessEvent, false);
                    //window.addEventListener('focus', window._gmr_ProcessEvent, false);
                    //window.addEventListener('blur', window._gmr_ProcessEvent, false);										
                }
                
                if (_gmr_ValidateControls() != undefined) 
                    _gmr_ValidateControls();
            }
        }
    } catch(e) {
        GM_log("[_gmr_Main]: " + e);
    } 
    if (GMR_DEBUG)
        GM_log('Gmail Mark Read main exit');
})();



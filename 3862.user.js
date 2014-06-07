
// ==UserScript==
// @name          GMail Smart-Read Button
// @author        Chenxin Li
// @namespace     http://userscripts.org/people/2126
// @description	  Script adds a 'Mark Read/Mark Unread' ping-pong button that updates the states itself. If the checked item are all read ones, the button shows 'Mark Unread', otherwise it is 'Mark Read'. This scripts was based on code of 'GMail Smart-Delete Button 0.5' and works with FF 1.5RC/GM 0.6.3.
// @include       http*://*mail.google.com/*mail/*
// @date          2006-4-15
// @version       0.2
// @GM_version    0.6.4

/* BEGIN LICENSE BLOCK
Copyright (C) 2006 Chenxin Li
Based on the Gmail+Smart+Delete+Button script by Paul Moriak.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

// ==/UserScript==

(function() 
{
	function gmrItem(e){
		try{
			if (Debug_Verbose) GM_log("Entering 'gmrItem'...");
			//Since we are no longer passing the button as an argument, 
			//and are instead trapping the button click event, we can get 
			//an insance of the button from it's event 'target' property...
			var gmr_Button = e.target;
			
			//find the command box
			var command_box;

			//We need to get the gmr_Button Native Wrapper...
			//Find which upper gmr Button is visible...
			gmr_Button = getElement('_gmr_Button0');
			GM_log("gmr_Button: " + gmr_Button);
				
			if (gmr_Button){
				//Make sure its OK to mark...
				if (!gmr_Button.wrappedJSObject.disabled) {
					command_box=gmr_Button.wrappedJSObject.parentNode.getElementsByTagName('select')[0];
					command_box.onfocus();			
				}
			}else{
				if (Debug || Debug_Verbose) GM_log("No MR Button found...");
			}

			if (Debug || Debug_Verbose) GM_log('MR Button Clicked.');

			//Get the index for 'Mark Read' (GMR)...
			var gmr_index=-1;
			for (var i=0; i<command_box.options.length; i++) 
			{
				if (('rd'==command_box.options[i].value || 'ur'==command_box.options[i].value) 
					&& !command_box.options[i].disabled ) 
				{
					gmr_index=i;
					break;
				}
			}

			//Abort if 'MTT' is not an available command for the current page...
			if (-1==gmr_index) return;

			//Select the command index for MTT and fire the change event...
			command_box.selectedIndex=gmr_index;
			command_box.onchange();
			
		}catch(e){
			GM_log("[gmrItem]: " + e);
		}	
	}

	function getElement(id) {
		try{
			if (Debug_Verbose) GM_log("Entering 'getElement'...");
			
			var el=window.document.getElementById(id);
			if (el) return el;
			return false;
		}catch(e){
			GM_log("[getElement]: " + e);
		}
	}

	function createDOMButton(id) {
		try{
			if (Debug_Verbose) GM_log("Entering 'createDOMButton'...");
			
			var gmr_Button=window.document.createElement('button');
			gmr_Button.setAttribute('type', 'button');
			gmr_Button.setAttribute('disabled', 'true');
			gmr_Button.setAttribute('class', 'ab');
			gmr_Button.setAttribute('id', '_gmr_Button'+id);
			gmr_Button.innerHTML='Mark Read';
			gmr_Button.addEventListener('click', gmrItem, false);

			return gmr_Button;
		}catch(e){
			GM_log("[createDOMButton]: " + e);
		}
	}

	function insertButton(insert_container, id) {
		try{
			if (Debug_Verbose) GM_log("Entering 'insertButton'...");

			if (!insert_container) return false;
			if (getElement('_gmr_Button'+id)) {
				return false;
			}

			var Insert_Point = -1;
			
			//Create a spacer object...
			//spacer=insert_container.childNodes[1].cloneNode(false);
			spacer=document.createTextNode(" ");
			//spacer=insert_container.childNodes[insert_container.childNodes.length-4].cloneNode(false);
			
			//Locate the 'select' dropdown...
			for(index = 0; index < insert_container.childNodes.length; index++){
				if (Debug_Verbose) GM_log("Child Node " + index + ": " + insert_container.childNodes[index].nodeName);
				if (insert_container.childNodes[index].nodeName=="SELECT"){
					Insert_Point=index;	
				}
			}
			
			if (Insert_Point==-1) return false;

			var gmr_Button=createDOMButton(id);
			var spacer;

			//Insert buttons & spacers...
			
			//Set the insertion point immediately after the select dropdown...
			insert_container.insertBefore(spacer, insert_container.childNodes[Insert_Point]);
				
			//Insert a preceding spacer...
			insert_container.insertBefore(gmr_Button, spacer);
						
			//Add an optional trailing spacer...
			//insert_container.appendChild(spacer);
			

		}catch(e){
			GM_log("[insertButton]: " + e);
		}
	}


	function placeGmrButtons() {
		try{
			if (Debug_Verbose) GM_log("Entering 'placeGmrButtons'...");
			
			//Upper main menu...
			var top_menu=getElement('tam');  
			if (top_menu) {
				insertButton(top_menu.parentNode, 0);
			}else{
				if (Debug_Verbose) GM_log("[placeGmrButtons] Top Main Menu not found...  Skipping Button Insert.");
			}

			//Lower main menu...
			var bot_menu=getElement('bam');  
			if (bot_menu)  {
				insertButton(bot_menu.parentNode, 1);
			}else{
				if (Debug_Verbose) GM_log("[placeGmrButtons] Bottom Main Menu not found...  Skipping Button Insert.");
			}
			
		}catch(e){
			GM_log("[placeGmrButtons]: " + e);
		}
	}

	function validateControls()
	{
		if (Debug_Verbose) GM_log("Entering 'validateControls'...");
			
		try {
			//if (!Validating){
				//Validating=true;
				validateGmrButtons();
				validateCheckBoxes();
				//Validating=false;
			//}				
		} catch(e) {
			GM_log("[validateControls]: " + e);
		} 
	}


	function validateGmrButtons()
	{
		if (Debug_Verbose) GM_log("Entering 'validateGmrButtons'...");
			
		//Catch errors here as this gets called on the timer and may occur while the page is reloading...
		try {
			if (document && !getElement('_gmr_Button0')) {
					placeGmrButtons();
			}	
		} catch(e) {
			GM_log("[validateGmrButtons]: " + e);
		} 

	}


	function validateCheckBoxes() {
		try{
			if (Debug_Verbose) GM_log("Entering 'validateCheckBoxes'...");
			
			//Get the index for 'Mark Read' (GMR)...
			var button_text='Mark Read';
			var command_box=getElement('_gmr_Button0').wrappedJSObject.parentNode.getElementsByTagName('select')[0];
			command_box.onfocus();
			var gmr_index=-1;

			for (var i=0; i<command_box.options.length; i++) 
			{
				if ('rd'==command_box.options[i].value && !command_box.options[i].disabled ) 
				{
					gmr_index=i;
					break;
				}
				if ('ur'==command_box.options[i].value && !command_box.options[i].disabled ) 
				{
					gmr_index=i;
    				button_text='Mark Unread';
					break;
				}
			}

			if (gmr_index > -1)
			{
				modGmrButton(false, button_text);
			} else {
				modGmrButton(true, button_text);
			}
		}catch(e){
			GM_log("[validateCheckBoxes]: " + e);
		}	  	
	}


	function modGmrButton(disable, button_txt){
		try{
			if (Debug_Verbose) GM_log("Entering 'modGmrButton'...");

			//var btnCount=0;

			validateGmrButtons();

			for(index = 0; index < 2; index++)
			{
				if (getElement('_gmr_Button' + index)) 
				{
					//btnCount = btnCount + 1;
					getElement('_gmr_Button' + index).disabled = disable;
					getElement('_gmr_Button' + index).innerHTML = button_txt;
				}
			}
		
			//if (btnCount == 0) placeGmrButtons();
			//document.all["_gmr_Button" + index].disabled = false;

		} catch(e) {
			GM_log("[modGmrButton]: " + e);
		}
	}

	window.ProcessEvent = function ProcessEvent(e){   		
		try{
			if (Debug_Verbose) GM_log("[ProcessEvent]: " + e.target);

			if (!e) var e = window.event;
			var strTarget = e.target;

			if (Debug || Debug_Verbose) GM_log(strTarget +' Event Trapped!');
			
			//Validate...		
			if (validateControls() != undefined) {
				validateControls();
				setTimeout("validateControls()", 500);
				setTimeout("validateControls()", 2000);
				setTimeout("validateControls()", 4000);
				setTimeout("validateControls()", 8000);
				setTimeout("validateControls()", 16000);
			}

			//Let gmail's code run...
			var retval = routeEvent(e);

			if (retval == false) return false;
   			else return true;
		} catch(err) {
			GM_log("[ProcessEvent]: "  + err + strTarget);
		}
	}

	try{
		var Debug=false;
		var Debug_Verbose=false;

		if (Debug || Debug_Verbose) GM_log("Loading script...");
			
		//var Validating=false;
		
		var DocSearch = document.location.search
		if (DocSearch) {
			if (DocSearch.match(/search=drafts/) //Drafts...		
				|| DocSearch.match(/name=htmlcompose/) //Compose...
				|| DocSearch.match(/view=cv/) 
				|| document.location.search.match(/view=page/)
   			) {
				// Kill the event handler...
				window.removeEventListener('click', window.ProcessEvent, false);
				window.removeEventListener('focus', window.ProcessEvent, false);
				window.removeEventListener('blur', window.ProcessEvent, false);
     		} else {
				// Set the event handler...
				if (Debug || Debug_Verbose) GM_log("Attempting to capture events...");
				if (window.captureEvents) {					
					window.addEventListener('click', window.ProcessEvent, false);
					window.addEventListener('focus', window.ProcessEvent, false);
					window.addEventListener('blur', window.ProcessEvent, false);										
				} else {
					if (Debug || Debug_Verbose) GM_log("Unable to capture events...");
				}
				
				//If there are any 'Checked' checkboxes, enable the 'Mark Read' button...
				if (Debug || Debug_Verbose) GM_log("Calling 'validateControls' from Sub Main...");
				if (validateControls() != undefined) validateControls();
			}
		} else {
			if (Debug || Debug_Verbose) GM_log("Unable to search document.location...");
		}
	} catch(e) {
		GM_log("Error in Sub Main: " + e);
	}
})();


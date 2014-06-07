

// ==UserScript==
// @name          Gmail Smart-Delete Button
// @author        Paul Moriak - P.Moriak@gmail.com
// @namespace     http://kuru4u.spymac.com/scripts/Gmail_Smart-Delete_Button.user.js
// @description	  Adds a 'Smart-Delete' button that enables/disables itself, depending on whether or not any items have been checked. It works with all applicable Gmail pages, labels & mail items.
// @include       http*://*mail.google.com/*mail/*
// @date          2005-06-29
// @version       0.3.9.3 
// @GM_version    0.3.3

// ------------------------------------------------------------------------
// Copyright (c) 2005, Paul Moriak  
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
// Originally based on the Gmail+Delete+Button script by Anthony Lieuallen. 
// ------------------------------------------------------------------------


// ==/UserScript==

(function() 
{
window.deleteItem = function deleteItem(Delete_Button)
{
	try{
		//find the command box
		var command_box=Delete_Button.parentNode.getElementsByTagName('select')[0];
		command_box.onfocus();

		if (Debug || Debug_Verbose) GM_log('Delete Button Clicked.');

		//Get the index for 'Move to Trash' (MTT)...
		var delete_index=-1;
		for (var i=0; i<command_box.options.length; i++) 
		{
			if ('tr'==command_box.options[i].value && !command_box.options[i].disabled ) 
			{
				delete_index=i;
				break;
			}
		}

		//Abort if 'MTT' is not an available command for the current page...
		if (-1==delete_index) return;

		//Select the command index for MTT and fire the change event...
		command_box.selectedIndex=delete_index;
		command_box.onchange();
		
	}catch(e){
		GM_log("[deleteItem]: " + e);
	}	
}

function getElement(id) {
	try{
		var el=window.document.getElementById(id);
		if (el) return el;
		return false;
	}catch(e){
		GM_log("[getElement]: " + e);
	}
}

function createDOMButton(id) {
	try{
		var Delete_Button=window.document.createElement('button');	
		Delete_Button.setAttribute('disabled', 'true');
		Delete_Button.setAttribute('class', 'ab');
		Delete_Button.setAttribute('id', '_gd_Delete_Button'+id);
		Delete_Button.setAttribute('onclick', 'deleteItem(this);');
		Delete_Button.innerHTML='<b><font color="#808080">Delete</font></b>';
		return Delete_Button;
	}catch(e){
		GM_log("[createDOMButton]: " + e);
	}
}

function insertButton(insert_container, id) {
	try{
		if (!insert_container) return false;
		if (getElement('_gd_Delete_Button'+id)) {
			return false;
		}

		var Delete_Button=createDOMButton(id);
		var Insert_Point = -1;
		var spacer;
		
		//Create a spacer object...
		//spacer=insert_container.childNodes[1].cloneNode(false);
		spacer=document.createTextNode(" ");
		//spacer=insert_container.childNodes[insert_container.childNodes.length-4].cloneNode(false);
		
		//Locate the 'select' dropdown...
		for(index = 0; index < insert_container.childNodes.length; index++){
			if (Debug_Verbose) GM_log("Child Node " + index + ": " + insert_container.childNodes[index].nodeName);
			if (insert_container.childNodes[index].nodeName=="SELECT"){
				Insert_Point=index + 1;	
			}
		}
		
		if (Insert_Point==-1) return false;
		
		//Insert buttons & spacers...
		
		//Set the insertion point immediately after the select dropdown...
		insert_container.insertBefore(Delete_Button, insert_container.childNodes[Insert_Point]);
			
		//Insert a preceding spacer...
		insert_container.insertBefore(spacer, Delete_Button);
					
		//Add an optional trailing spacer...
		//insert_container.appendChild(spacer);
		

	}catch(e){
		GM_log("[insertButton]: " + e);
	}
}


function placeDeleteButtons() {
	try{
		//Upper main menu...
		var top_menu=getElement('tamu');  if (top_menu) insertButton(top_menu.parentNode, 0);
		
		//Lower main menu...
		var bot_menu=getElement('bamu');  if (bot_menu) insertButton(bot_menu.parentNode, 1);
		
		//Upper mail-item menu...
		var mtp_menu=getElement('ctamu'); if (mtp_menu) insertButton(mtp_menu.parentNode, 2);
			
		//Lower mail-item menu...
		var mbt_menu=getElement('cbamu'); if (mbt_menu) insertButton(mbt_menu.parentNode, 3);

	}catch(e){
		GM_log("[placeDeleteButtons]: " + e);
	}
}


window.validateDeleteButtons = function validateDeleteButtons()
{
	//Catch errors here as this gets called on the timer and may occur while the page is reloading...
	try {
		if (Debug_Verbose) GM_log('validateDeleteButtons called.');

		if (document) {
			// If neither top buttons are visible we need to force the re-creation of the buttons...
			//if (!document.getElementById(_gd_Delete_Button0) && !document.getElementById(_gd_Delete_Button2))
			if (!getElement('_gd_Delete_Button0') && !getElement('_gd_Delete_Button2')) {
				placeDeleteButtons();
			}
		}	
	} catch(e) {
		GM_log("[validateDeleteButtons]: " + e);
	} 

}


window.validateCheckBoxes = function validateCheckBoxes() 
{
	try{
		if (Debug_Verbose) GM_log('Validating CheckBoxes...');

		// We need to check whether we are in a mailitem or a page with checkboxes...
		//Don't need to validate if it's a mailitem...
		if (document.location.search.match(/view=cv/)){
			if (Debug_Verbose) GM_log('Enabling Delete Button for Mail Item...');
			disableDeleteButton(false);
			// There is a small bug in gmail - if you enable shortcut keys and are in a mail item, 
			// pressing 'x' returns you to the parent (inbox or label) view and toggles the selection of the current item.
			// This does not trigger any event, so the delete button will be forced out of sync with the item list.
			// Putting the 'validateCheckBoxes' on a timer will overcome this, though I would have preferred an event...
		}else{
			//Otherwise, if there are any 'Checked' checkboxes, enable the 'Delete' button...
			// Loop through all checkBox elements 
			// and enable/disable 'Delete' button if any/none are checked...
			var CBCount = 0;
			var CheckedCount = 0;
			var inputs = document.getElementsByTagName("input");
			// alert('There are ' + inputs .length + ' input controls.');
  		
			// Loop through all form elements (input tags)
  			for(index = 0; index < inputs.length; index++)
  			{
    				// ...if it's the type of checkbox we're looking for, 
				// toggle its checked status
    				if(inputs[index].type == 'checkbox')
				{
      					CBCount = CBCount + 1;
					if(inputs[index].checked == 1)
      					{
        					CheckedCount = CheckedCount +1;	
					}
				}
			}

			// alert("There are " + CBCount + " checkboxes (" + CheckedCount + " Checked).");
			if (CheckedCount > 0)
			{
				disableDeleteButton(false);
			} else {
				disableDeleteButton(true);
			}
		}
	}catch(e){
		GM_log("[validateCheckBoxes]: " + e);
	}	  	
}


function disableDeleteButton(disable)
{
	try{
		//var btnCount=0;

		validateDeleteButtons();

		for(index = 0; index < 4; index++)
		{
			if (getElement('_gd_Delete_Button' + index)) 
			{
				//btnCount = btnCount + 1;
				if (disable) // Disable 'Delete' button...
				{
					//alert("Disabling 'Delete' Button...");
					if (!getElement('_gd_Delete_Button' + index).disabled) {
						getElement('_gd_Delete_Button' + index).disabled = true;
						getElement('_gd_Delete_Button' + index).innerHTML='<b><font color="#808080">Delete</font></b>';
					}
				}
				else // Enable 'Delete' button...
				{
					//alert("Enabling 'Delete' Button...");
					if (getElement('_gd_Delete_Button' + index).disabled) {
						getElement('_gd_Delete_Button' + index).disabled = false;
						getElement('_gd_Delete_Button' + index).innerHTML='<b><font color="#800000">Delete</font></b>';
					}
				}
			}
		}
	
		//if (btnCount == 0) placeDeleteButtons();
		//document.all["_gd_Delete_Button" + index].disabled = false;

	} catch(e) {
		GM_log("[disableDeleteButton]: " + e);
	}
}


window.ProcessKeyPressEvent = function ProcessKeyPressEvent(e) 
{   		
	try{
		if (!e) var e = window.event;
		var strTarget = e.target;
		var Delete_Button;
	
		if (Debug || Debug_Verbose) GM_log(strTarget +' KeyPress Event Trapped!');
				
		//Let gmail's code run first...
		var retval = routeEvent(e);
		
		//First call out generic event handler to validate controls...
		ProcessEvent(e);
		
		if (Debug || Debug_Verbose) GM_log(e.target);
		//GM_log("Target Type = '" + e.target.type + "'");
		
		//Now, make sure we are focused on an applicable area... 
		if ((strTarget.type  != "text") && (strTarget.type  != "textarea") && (strTarget.type  != "file")) {
			//Trap for 'D' or 'd' keypress... 
			if ((e.which == 100) || (e.which == 68)){
				//Find which upper Delete Button is visible...
				Delete_Button = getElement('_gd_Delete_Button0');
				if (!Delete_Button){
					Delete_Button = getElement('_gd_Delete_Button2');
				} 
				
				if (Delete_Button){
					//Make sure its OK to delete...
					if (!Delete_Button.disabled) {
						//Call DeleteButton's click event...
						if (Debug || Debug_Verbose) GM_log("Attempting to delete...");
						Delete_Button.onclick();
					}
				}else{
					if (Debug || Debug_Verbose) GM_log("No Delete Button found...");
				}
			}
		}

		if (retval == false) return false;
   		else return true;
	} catch(e) {
		GM_log("[ProcessKeyPressEvent]: " + e);
	}
}


window.ProcessEvent = function ProcessEvent(e) 
{   		
	try{
		if (!e) var e = window.event;
		var strTarget = e.target;
	
		if (Debug || Debug_Verbose) GM_log(strTarget +' Event Trapped!');
		
		//Let gmail's code run first...
		var retval = routeEvent(e);
		
		//Wait for the page to redisplay then revalidate...
		validateControls();
		setTimeout("validateControls()", 500);
		setTimeout("validateControls()", 2000);
		setTimeout("validateControls()", 4000);
		setTimeout("validateControls()", 8000);
		setTimeout("validateControls()", 16000);

		if (retval == false) return false;
   		else return true;
	} catch(e) {
		GM_log("[ProcessEvent]: " + e);
	}
}


window.validateControls = function validateControls() 
{
	try {
		//if (!Validating){
			//Validating=true;
			validateDeleteButtons();
			validateCheckBoxes();
			//Validating=false;
		//}				
	} catch(e) {
		GM_log("[validateControls]: " + e);
	} 
}


	try{
		if (document.location.search) {
		
			var Debug=false;
			var Debug_Verbose=false;
			//var Validating=false;
	
			if (Debug || Debug_Verbose) GM_log("Loading script...");
		
			if (document.location.search.match(/search=trash/) //Trash...
				|| document.location.search.match(/search=drafts/) //Drafts...		
				|| document.location.search.match(/search=spam/) //Spam...		
				|| document.location.search.match(/name=htmlcompose/) //Compose...
   			) {
				// Kill the event handler...
				window.releaseEvents(Event.KEYPRESS);
				window.releaseEvents(Event.CLICK);
				window.releaseEvents(Event.FOCUS);
				window.releaseEvents(Event.BLUR);
						
     			} else {
				// Set the event handler...
				if (window.captureEvents) {
					window.captureEvents(Event.KEYPRESS);
					window.onkeypress=ProcessKeyPressEvent;
					window.captureEvents(Event.CLICK);
					window.onclick=ProcessEvent;
					window.captureEvents(Event.FOCUS);
					window.onfocus=ProcessEvent;
					window.captureEvents(Event.BLUR);
					window.onblur=ProcessEvent;															
				}
		
				//If we are in a messageItem, (no checkboxes) just enable the 'Delete' button...
				if (document.location.search.match(/view=cv/))
				{
					//alert('Enabling Delete Button for Mail Item...');
					disableDeleteButton(false);
				} else {
					//Otherwise, if there are any 'Checked' checkboxes, enable the 'Delete' button...
					validateControls();
				}		
			}

		}
	} catch(e) {
		GM_log("[Main]: " + e);
	}
})();






// ==UserScript==
// @name          Google Reader - Mark selected items
// @namespace     http://www.fully-faltoo.com/
// @description   Mark selected posts to make them read, unread, share or star.
// @include		  http://www.google.*/reader*
// @include 	  https://www.google.*/reader*
// ==/UserScript==

/* Modifications to this script is permitted provided this comment is retained in its entirety.
 * Copyright: Pratyush Mittal
 * Author: Pratyush Mittal
 * http://www.fully-faltoo.com
 */
ii=0;
jj=0;
var pCurrentElement;
var entries=document.getElementById("entries");
if(entries)
	entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

function nodeInserted(event){	
	if (event.target.className.match("entry") != null){
		
		if(jj=='0'){
			jj++;
		headers();
		
		}

            var org, titleLink, checkmark, viewType, pageTitle, sec, source, ctn;
			
            			checkbox = content.document.createElement('input');
						checkbox.type = 'checkbox';
                        
                        //Determine View Type
                        org = event.target.getElementsByClassName('entry-original')[0];
                        titleLink = event.target.getElementsByClassName('entry-title-link')[0];
                        
                        if (org || titleLink) {
                        
                            if (org) {
                                viewType = 'list';
                                
                                pageTitle = event.target.getElementsByClassName('entry-title')[0].innerHTML;
								ctn = event.target.getElementsByClassName('entry-secondary')[0];
                                checkbox.style.marginRight = '9px';
								checkbox.id = 'ckbx'+ ii;
								url = 'cxbx' + ii;
                                ii++;
                   
                            }

                            //Set Checkbox attributes                       
                            checkbox.style.verticalAlign = 'top';
                            checkbox.className = 'oyelucky';
                            //Get Info and Nodes
                            checkbox.addEventListener("click", clickMark, true);
                            //Add Checkmark
 							ctn.insertBefore( checkbox, ctn.firstChild);
							ctn2 = event.target.getElementsByClassName('entry-secondary')[0];
							MUCR = document.createElement('a');
		                    MUCR.innerHTML = '<b>M</b>';
							MUCR.href ='#';
							MUCR.addEventListener("click", markUntilCurrentAsRead, false);
							ctn2.insertBefore( MUCR, ctn2.firstChild);
                        }
                            
                    }
                }
            
	
function headers() {
	pbn_groaub_id_previous_button = 'stream-prefs-menu';
		pbn_groaub_id_viewer_top_links = 'viewer-top-controls';
		pbn_groaub_id_mark_all_as_read = 'mark-all-as-read';
		
		pbn_groaub_previous_button = document.getElementById(pbn_groaub_id_previous_button);
		pbn_groaub_viewer_top_links = document.getElementById(pbn_groaub_id_viewer_top_links);
		if(pbn_groaub_viewer_top_links != null && pbn_groaub_previous_button != null)
		{  
			
		   bouton_a_ajouter = document.createElement('select');
		   bouton_a_ajouter.className = 'goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight scour-disabled viewer-buttons';
		   bouton_a_ajouter.id = 'myselect';
		   bouton_a_ajouter.innerHTML = '<option>More Actions</option><option>Mark Selected as Read</option><option>Star Selected</option><option>Share Selected</option><option> Mark Selected as Unread</option><option>Open Selected Posts</option><option>Tag Selected as...</option>';
		   subt=document.createElement('button');
		   //subt.onclick = 'treadmill();';
		   subt.innerHTML = 'Ok';
		   subt.className='goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight scour-disabled viewer-buttons';
		   subt.addEventListener("click", treadmill, false);
		   
		   textSelect = document.createElement('span');
		   textSelect.innerHTML = '<b>Select: </b>';
		   Options = document.createElement('a');
		   Options.innerHTML = 'All, ';
		   Options.href ='#';
		   Options.addEventListener("click", selectall, false);
		   Optionsnone = document.createElement('a');
		   Optionsnone.innerHTML = 'None';
		   Optionsnone.href ='#';
		   Optionsnone.addEventListener("click", selectnone, false);
		   pbn_groaub_viewer_top_links.insertBefore(textSelect, pbn_groaub_previous_button);
		   pbn_groaub_viewer_top_links.insertBefore(Options, pbn_groaub_previous_button);
		   pbn_groaub_viewer_top_links.insertBefore(Optionsnone, pbn_groaub_previous_button);
		   pbn_groaub_viewer_top_links.insertBefore(bouton_a_ajouter, pbn_groaub_previous_button);
		   pbn_groaub_viewer_top_links.insertBefore(subt, pbn_groaub_previous_button);
   
		}

}

function markUntilCurrentAsRead(){
   	var currentElement = document.getElementById('current-entry');
	if(currentElement == null || currentElement == pCurrentElement){
		window.setTimeout(markUntilCurrentAsRead, 50);
	}
	else{
	pCurrentElement = currentElement;
   var allEntries = getAllEntries();
	for(var i=0;i<allEntries.length;i++){
		var entryIcon = getEntryIconDiv(allEntries[i]);
		if(allEntries[i] == currentElement){
			break;
		}
		if(i==0){
			simulateClick(entryIcon);
		}
		else{
			if(allEntries[i].className == 'entry read'){
			simulateNext(entryIcon);
			}
			else{
			simulateMark(entryIcon);
			}
		}
	}
	simulateClickOnly(currentElement.childNodes[0]);
	}

}

function selectall(){
	var allEntries = getAllEntries();
	for(var i=0;i<allEntries.length;i++){
		var soul = allEntries[i].getElementsByTagName('input')[0];
		if (soul.checked == false)
		{
			soul.checked =true;
		}
	}

}

function selectnone(){
	var allEntries = getAllEntries();
	for(var i=0;i<allEntries.length;i++){
		var soul = allEntries[i].getElementsByTagName('input')[0];
		if (soul.checked == true)
		{
			soul.checked =false;
		}
	}

}

function simulateClick(node) {
   var event = node.ownerDocument.createEvent("MouseEvents");

   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
   
   var event2 = node.ownerDocument.createEvent("KeyboardEvent");

   event2.initKeyEvent(                                                                                      
                 "keypress",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   78,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg)
   node.dispatchEvent(event2);
}

function simulateClickOnly(node) {
   var event = node.ownerDocument.createEvent("MouseEvents");

   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
   
   var event3 = node.ownerDocument.createEvent("KeyboardEvent");

}

function simulateMark(node) {
   var event = node.ownerDocument.createEvent("KeyboardEvent");

   event.initKeyEvent(                                                                                      
                 "keypress",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   77,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg)
   node.dispatchEvent(event);

	var event2 = node.ownerDocument.createEvent("KeyboardEvent");

   event2.initKeyEvent(                                                                                      
                 "keypress",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   78,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg)
   node.dispatchEvent(event2);
}

function simulateNext(node) {

	var event2 = node.ownerDocument.createEvent("KeyboardEvent");

   event2.initKeyEvent(                                                                                      
                 "keypress",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   78,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg)
   node.dispatchEvent(event2);
}

function simulateStar(node) {
	
	var event = node.ownerDocument.createEvent("MouseEvents");

   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
   
   var event2 = node.ownerDocument.createEvent("KeyboardEvent");

   event2.initKeyEvent(                                                                                      
                 "keypress",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   83,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg)
   node.dispatchEvent(event2);
}

function simulateShare(node) {
	var event = node.ownerDocument.createEvent("MouseEvents");

   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
   
   var event2 = node.ownerDocument.createEvent("KeyboardEvent");

   event2.initKeyEvent(                                                                                      
                 "keypress",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  window,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  true,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   83,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg)
   node.dispatchEvent(event2);
}

function simulateUNClick(node) {
	var event = node.ownerDocument.createEvent("MouseEvents");

   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
   
   var event2 = node.ownerDocument.createEvent("KeyboardEvent");

   event2.initKeyEvent(                                                                                      
                 "keypress",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  window,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   77,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg)
   node.dispatchEvent(event2);
}

function simulateOpen(node) {
	var event = node.ownerDocument.createEvent("MouseEvents");

   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
   
   var event2 = node.ownerDocument.createEvent("KeyboardEvent");

   event2.initKeyEvent(                                                                                      
                 "keypress",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  window,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   86,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg)
   node.dispatchEvent(event2);
}

function simulateTag(node) {
	var event = node.ownerDocument.createEvent("MouseEvents");

   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
   
   var event2 = node.ownerDocument.createEvent("KeyboardEvent");

   event2.initKeyEvent(                                                                                      
                 "keypress",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  window,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   84,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg)
   node.dispatchEvent(event2);
	
	var event3 = node.ownerDocument.createEvent("KeyboardEvent");
	event3.initKeyEvent(                                                                                      
                 "keypress",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  window,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   65,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg)
   node.dispatchEvent(event3);
	
}



function getAllEntries(){
	var allDivs = document.getElementsByTagName('div');
	var allEntries = new Array();
	for(var i=0;i<allDivs.length;i++){		
		if(typeof(allDivs[i].className) != 'undefined' &&
				allDivs[i].className == 'entry'
				|| allDivs[i].id == 'current-entry'
				|| allDivs[i].className == 'entry overflow-settable'
				|| allDivs[i].className == 'entry read'
				|| allDivs[i].className == 'entry read read-state-locked'){
			allEntries.push(allDivs[i]);
		}
	}
	return allEntries;
}

function getEntryIconDiv(entry){
	var divs = entry.getElementsByTagName('div');
	for(var i=0;i<divs.length;i++){
		if(typeof(divs[i].className) != 'undefined' &&
				divs[i].className == 'entry-icons')
			return divs[i];
	}
	return null;
}


function treadmill(){
	var x=document.getElementById("myselect");
	var y=x.selectedIndex;
	var allEntries = getAllEntries();
	for(var i=0;i<allEntries.length;i++){
		var soul = allEntries[i].getElementsByTagName('input')[0];
		if (soul.checked)
		{
		var entryIcon = getEntryIconDiv(allEntries[i]);
		if (y=='1'){
		simulateClick(entryIcon);
		} else if (y=='2'){
		simulateStar(entryIcon);
			
			} else if (y=='3'){
		simulateShare(entryIcon);
			}
			else if (y=='4'){
		simulateUNClick(entryIcon);
			}
			else if (y=='5'){
			simulateOpen(entryIcon);
			}
			else if (y=='6'){
			simulateTag(entryIcon);
			}
		}
	}
	
}

function clickMark(e, obj) {
	if (e) {
                e.stopPropagation();
                obj = this;
            }
            if (obj.src == 'full') {
                ISRIL.MarkAsRead( ISRILglobals.ResolverIndex[ obj.getAttribute('url') ].itemId, true );                
                obj.src = ISRILgr.empty;                
            } else {
                //ISRIL.SaveLink( obj.getAttribute('url') , obj.getAttribute('pageTitle') );
                
				//obj.src = ISRILgr.full;
            }
	
}
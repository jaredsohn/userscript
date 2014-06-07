// ==UserScript==
// @name          Google Reader 批量操作
// @author slimx
// @include 	  http*://www.google.*/reader*
// ==/UserScript==
ii=0;
jj=0;
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
							//MUCR = document.createElement('a');
		                 //   MUCR.innerHTML = '<b>M </b>';
						//	MUCR.href ='#';
						//	MUCR.addEventListener("click", markUntilCurrentAsRead, false);
						//	ctn2.insertBefore( MUCR, ctn2.firstChild);
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
			
	  accessStar=document.createElement('a');
		   accessStar.innerHTML = '星标';
		   accessStar.className='goog-button goog-button-base';
		  accessStar.addEventListener("click", treadmill3, false);


		  accessUrl=document.createElement('a');
		   accessUrl.innerHTML = '原始内容';
		   accessUrl.className=' goog-button goog-button-base';
		  accessUrl.addEventListener("click", treadmill2, false);
		   
		   //textSelect = document.createElement('span');
		  // textSelect.innerHTML = '选择 : ';
		//   textSelect.className='goog-inline-block goog-button-float-left';
			  accessMark=document.createElement('a');
		   accessMark.innerHTML = '已读';
		   accessMark.className='goog-button goog-button-base';
		  accessMark.addEventListener("click", treadmill4, false);

		
		   Options = document.createElement('a');
		   Options.innerHTML = '所有项目';
		   Options.className=' goog-button goog-button-base';
		   Options.addEventListener("click", selectall, false);

			aSpace = document.createElement('span');
			aSpace.innerHTML = '- ';
		//	aSpace.className='goog-inline-block goog-button-float-left';
		
		   Optionsnone = document.createElement('a');
		   Optionsnone.innerHTML = '无';
		  Optionsnone.className='goog-button goog-button-base';
		   Optionsnone.addEventListener("click", selectnone, false);
	   

		   //pbn_groaub_viewer_top_links.insertBefore(textSelect, pbn_groaub_previous_button);
		   pbn_groaub_viewer_top_links.insertBefore(Options, pbn_groaub_previous_button);
		    pbn_groaub_viewer_top_links.insertBefore(aSpace, pbn_groaub_previous_button);
		   pbn_groaub_viewer_top_links.insertBefore(Optionsnone, pbn_groaub_previous_button);
		   pbn_groaub_viewer_top_links.insertBefore(accessStar, pbn_groaub_previous_button);
		   		   pbn_groaub_viewer_top_links.insertBefore(accessMark, pbn_groaub_previous_button);

		   pbn_groaub_viewer_top_links.insertBefore(accessUrl, pbn_groaub_previous_button);
		  // pbn_groaub_previous_button.style.display="none";
   
		}

}

function markUntilCurrentAsRead(){
   	var currentElement = document.getElementById('current-entry');
	if(currentElement == null){
		window.setTimeout(markUntilCurrentAsRead, 50);
	}
	else{
		
   var allEntries = getAllEntries();
	for(var i=0;i<allEntries.length;i++){
		var entryIcon = getEntryIconDiv(allEntries[i]);
		if(allEntries[i] == currentElement){
			break;
		}
   	simulateClick(entryIcon);
	}
	simulateClick(currentElement.childNodes[0]);
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
	/*	var allDivs = document.getElementsByTagName('div');
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
	return allEntries;*/
	return document.getElementById("entries").children;
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

function treadmill2(){
	var allEntries = getAllEntries();
	for(var i=0;i<allEntries.length;i++){
		var soul = allEntries[i].getElementsByTagName('input')[0];
		if (soul.checked)
		{
		var entryIcon = getEntryIconDiv(allEntries[i]);

				simulateOpen(entryIcon);

		}
	}
	
}
function treadmill3(){
	var allEntries = getAllEntries();
	for(var i=0;i<allEntries.length;i++){
		var soul = allEntries[i].getElementsByTagName('input')[0];
		if (soul.checked)
		{
		var entryIcon = getEntryIconDiv(allEntries[i]);

				simulateStar(entryIcon);

		}
	}
	
}


function treadmill4(){
		var allEntries = getAllEntries();
	for(var i=0;i<allEntries.length;i++){
		var soul = allEntries[i].getElementsByTagName('input')[0];
		if (soul.checked)
		{
		var entryIcon = getEntryIconDiv(allEntries[i]);

		simulateClick(entryIcon);

		}
	}
	}

/**
* This program is copyright PlayerScripts.com, a division of TinHat Software Ltd.
* We grant you a liscence for personal, private and non-commercial use only.
* Please refer to playerscripts.com for further information.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/

// ==UserScript==
// @name          Mafia Wars Gift Queue
// @namespace     MWGQGiftQueue
// @description   	This script will allow you to queue up small, large, and unending gift requests from within Mafia Wars.
// @include       	http://apps.facebook.com/inthemafia/*
// @include       	http://facebook.mafiawars.zynga.com/mwfb/*
// @exclude         http://www.facebook.com/*
// @exclude			http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm*
// @exclude			http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version       	0.12.0 
// @contributor   	Shrubber , DutchKingCobra
// ==/UserScript==

var SUC_script_num = 108551;
var script_version = "0.12.0"

// Global variables
// anything starting with gvar is a GLOBAL variable.
var gvar	=	{}; 

// Pointers to Utilities
var g_Utils             = new Utilities();
var g_MWUtils			= new MWUtilities();
var g_ListenerLib       = new ListenerLib();

// Temp Variables for now (should be moved to initialize
var iJobStatus;

// GM API Check
var GMSTORAGE_PATH = 'MWGQ';
GM_ApiBrowserCheck()

/**** Start Main Code ****/

// FB and MW Detection
// We are only worried about the URL detection because of the excludes

// main window will get processed here
gvar.strFrameId = 'Ignore'
if (self.location.href.indexOf('http://apps.facebook.com/inthemafia/') != -1) {
	gvar.strFrameId = 'FaceBook'
} else if (self.location.href.indexOf('http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=index') != -1) {
	gvar.strFrameId = 'MafiaWars'
}


// Register Menu Commands - Will only work for the top window
// Chrome will ignore this
GM_registerMenuCommand('PS Mafiawars Gift Queue - Debug On/Off', g_ListenerLib.menu_Debug);
	
GM_log('gvar.strFrameId = '+gvar.strFrameId);

if ( gvar.strFrameId == 'FaceBook') {

	var oDom;
	
	// Reset the height of the Mafia Wars iFrame, because Zygna cannot get this right in Chrome
	oDom = document.getElementsByName('mafiawars');
	if (oDom.length != 0) {oDom[0].style.height = '3000px'; GM_log('reset window height');}
    
} else if ( gvar.strFrameId == 'MafiaWars') {
	
	// Mafia Wars Code
	
	// Initialize variable and constants
	gvar.bInitialized = false;
	Initialize();
	
	// Set up Event Based processing
	gvar.pass       	 	= 0,
	gvar.change_count    	= 0,
	gvar.notify_count    	= 0,
	gvar.scheduled       	= false;
    gvar.bDebugOn           = false,
   	gvar.bSetting           = false,
    gvar.bSetting_reset     = false;
	gvar.iOnloadEvent 		= 0;
	
	
    // This listner is what get's things going.  It listens for DOM changes
    document.addEventListener("DOMNodeInserted", function (_obj) {
        gvar.change_count++;
        if (!gvar.scheduled && gvar.change_count > 2 ) schedNotify();
    },
    false);

    // This listner closes anything out when the windows close.
    
    window.addEventListener("unload", function (_obj) {
        try {
	        clearTimeout(gvar.iOnloadEvent);
            GM_log('Scripts are unloading.  Frame = '+gvar.strFrameId);
        } catch(_errObj) {
            GM_log('Something bad has happend - '+_errObj.message);
        }
    },
    false);
    
} else {
	GM_log('Load nothing')
}

// Main Loop

function MainLoop(){
    var oDom, oSnapShot
    var i1, i2, strTemp;
	
	// read the Debug state in case the menu command changed it.
	gvar.bDebugOn == true;
    //gvar.bDebugOn = GM_getValue('DebugOn',false);
	
    if (gvar.bInitialized) {
	    // get an updated copy of XW_SIG variable.  Needed for all Calls
        oSnapShot = g_Utils.getSnapshot(gvar.strXwSig)
		if (oSnapShot.snapshotLength != 0) {
			strTemp = oSnapShot.snapshotItem(0).text
			i1 = strTemp.indexOf("var local_xw_sig =")
			i1 = strTemp.indexOf("'",i1)+1
			i2 = strTemp.indexOf("'",i1)
			gvar.local_xw_sig  = strTemp.slice(i1,i2)
			//GM_log('gvar.local_xw_sig = '+gvar.local_xw_sig);
		} else {
			GM_log('nana')
		} 
	    
	    // Test to see if we are at the Gift Page
        if (g_Utils.getSnapshot(gvar.strGiftPage).snapshotLength) {
            // We are on the Mafia Team Page
            //GM_log('Make Queue Display');
            GiftQueueDisplay();
        } else {
            // remove the gifting page if found.
            oDom = document.getElementById(gvar.strQueueDiv);
            if (oDom!=null) oDom.parentNode.removeChild(oDom)
        }

        // Test to see if the Gifting Page is present
        if (g_Utils.getSnapshot(gvar.strSendGiftButton).snapshotLength) {
            // We are on the Mafia Team Page
            GM_log('display Gift display');
            GiftDisplay();
        } 	    
    
    }
}
// Gift Queue Definition and routines

function Gift() {
    // Gift Data
    this.GiftName       = "";
    this.GiftCatagory   = 0;
    this.GiftId         = 0;
    this.imgSrc			= new Array();

    // Minumum amount before gifting can start
    this.Floor          = 0;

    // How many times should this gift request be rerun.  -1 indicated to gift forever.
    this.Repeat         = 0;

    // Recipients
    this.NumIds
    this.Ids            = "";
    this.Names          = "";

    // Time of last gifting, and gifting process ID
    this.TimeStamp      = 0;

    // Number of read errors
    this.ReadError;

    // Is the job active
    this.IsPaused       = false;

}

function Load_Gift_Parameters() {
	
	var strTemp;
    g_Utils.doLog('Load_Gift_Queue', gvar.bDebugOn, 'Reading Parameters');
	
	gvar.Gift_Queue.IsPaused	= GM_getValue(gvar.FB_user_id+'-IsPaused',true);
	gvar.Gift_Queue.Params 		= GM_getValue(gvar.FB_user_id+'-Parameters',[5, 5, 30]);
	
}

function Save_Gift_Parameters() {
	var strTemp;
	GM_setValue(gvar.FB_user_id+'-IsPaused',gvar.Gift_Queue.IsPaused);
	
	GM_setValue(gvar.FB_user_id+'-Parameters',gvar.Gift_Queue.Params);
	GM_log('done saving');
}

function Load_Gift_Queue() {
    var strTemp;
    var aTemp;
    var oItem;
    
    gvar.strSaveSet = GM_getValue(gvar.FB_user_id+'-strSaveSet');

    g_Utils.doLog('Load_Gift_Queue', gvar.bDebugOn, 'Reading Saved Data');
    gvar.Gift_Queue.list = GM_getValue(gvar.FB_user_id+'-Queued Data-'+gvar.strSaveSet,[]);
    
}

function Save_Gift_Queue() {
    var strTemp;
    var strTempSaveSet;
    
    gvar.strSaveSet = GM_getValue(gvar.FB_user_id+'-strSaveSet');
    if (gvar.strSaveSet == 'A')
    	strTempSaveSet = 'B'
    else
    	strTempSaveSet = 'A'

    GM_setValue(gvar.FB_user_id+'-Queued Data-'+strTempSaveSet, gvar.Gift_Queue.list);
    
    GM_setValue(gvar.FB_user_id+'-strSaveSet',strTempSaveSet);
    
    gvar.strSaveSet = strTempSaveSet;
}

function Send_Gift_Queue() {
	
	function StopQueue() {
		var oStart, oStop, oQueue, oImg, oSnapshot;
		
		oStart      = document.getElementById(gvar.strStartButton);
        oStop       = document.getElementById(gvar.strStopButton);
        oQueue      = document.getElementById(gvar.strQueueButton);
        oImg        = document.getElementById(gvar.strLogo);

        oSnapShot = g_Utils.getSnapshot(gvar.strFindJobButtons);
        
        // Stop Queue
        oStart.setAttribute('style', '');
        oStop.setAttribute('style', 'opacity: 0.25;');
        if (oQueue != null) oQueue.setAttribute('style','margin-right:5px;');

        for (var i=0;i< oSnapShot.snapshotLength;i++)
            oSnapShot.snapshotItem(i).setAttribute('style',"width: 75px; margin-top: 2px;");

        gvar.Gift_Queue.IsPaused = true;

        UpdateJobStatus('Queue is Empty.  Pausing gifting.');
        
	}
	
	function RepeatRequest() {
	    // Update the display
	    UpdateQueueTableDisplay();
	    // Save the updated queue
	    Save_Gift_Queue();
	    // send next request
        iGiftCurrent = setTimeout(function (e) { gvar.EventSpan.dispatchEvent(gvar.ActionSendGift);}, g_Utils.getRandRange(gvar.Gift_Queue.Params[0]*750,gvar.Gift_Queue.Params[0]*1250));

    }
    
	function NextRequest(){
		
		if (gvar.Gift_Queue.list[0].Repeat == 0) {
   		    // remove item
  		    gvar.Gift_Queue.list.splice(0,1);
	    } else {
			// move item to bottom of the queue
		    gvar.Gift_Queue.list.push(gvar.Gift_Queue.list.shift(0));
		}
		    
	    // Update the display
	    UpdateQueueTableDisplay();
	    // Save the updated queue
	    Save_Gift_Queue();
	    // send next request
        iGiftCurrent = setTimeout(function (e) { gvar.EventSpan.dispatchEvent(gvar.ActionSendGift);}, g_Utils.getRandRange(gvar.Gift_Queue.Params[1]*750,gvar.Gift_Queue.Params[1]*1250));
   	
		
	}
	
	function doStep1(_Selection) {
		
		var iCurrentJob, iWatchDog;
        var myUrl, myParms;
        
        myUrl  	 =  'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';
        myUrl 	+=  'xw_controller=gift&xw_action=send&xw_city=1'
        myUrl 	+=  '&xw_person=' + gvar.FB_user_id.slice(2);
        myUrl 	+=  '&liteload=0&xw_client_id=8';
                     
        
        myParms  =  'ajax=1';
        myParms +=  '&gift_key='+ gvar.gift_key + '&gift_category='+ _Selection.GiftCatagory +'&gift_id='+ _Selection.GiftId;
        myParms +=  '&sendkey='+ _Selection.Ids;
        myParms +=  '&gift_count=' + iRepeat;
        myParms +=  '&sendkey=&sf_xw_sig='+ gvar.local_xw_sig ;
        myParms +=  '&sf_xw_user_id=' + escape(gvar.FB_user_id) + '&sf_xw_sig=' + gvar.local_xw_sig;
        
        GM_log('myUrl = '+ myUrl);
        GM_log('myParms = '+ myParms);

        // start the WatchDog Timer to catch hung requests. 15 seconds.
        iWatchDog = setTimeout(function (e) {
            // abort the current job;
            iCurrentJob.abort();

            // increase the error count
            iErrorCount += 1;
            if (iErrorCount <3) {
                doStep1(_Selection);
            } else {
	            UpdateJobStatus('Cancelling Gifting Request.  Too many Errors');
                NextRequest()
            }
        }, 30000);
        iCurrentJob = GM_xmlhttpRequest({
            method: 'POST',
            url:  myUrl,
            data: myParms,
            headers: {
                'Accept':           '*/*',
                'Accept-Language':  'en-us,en;q=0.5',
                'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },

            onload: function(_responseDetails) {
	            
	            var strTemp, strNotice;
	            var i1, i2;
	            var new_invetory;
	            var oDiv;
	            
	            clearTimeout(iWatchDog);
	            if (_responseDetails.status == 200) {
		            strTemp = _responseDetails.responseText;
		            
		            //find result message
		            i1 = strTemp.indexOf('<td class="message_body">');
		            if (i1!=-1) {
			            i1 = strTemp.indexOf('>',i1)+1;
		            	i2 = strTemp.indexOf('</td>',i1);
		            	strNotice = strTemp.slice(i1,i2);
	            	} else {
		            	strNotice = '';
	            	}
		            
	            	//find gifting limit
                    i1		= strTemp.indexOf('var gifts_daily_left')+4;
                    i2		= strTemp.indexOf(';',i1);
                    eval('gvar.'+strTemp.slice(i1,i2));
                    
					GM_log('Daily Gift Limit = '+ gvar.gifts_daily_left)

					// find iventory amounts in output data
		            i1 = strTemp.indexOf('var gvar.item_amounts = {');
		            i1 = strTemp.indexOf(_Selection.GiftCatagory+': {',i1);
		            i1 = strTemp.indexOf('{',i1)+1;
		            i2 = strTemp.indexOf('}',i1);
		            // isolate gift type
		            strTemp = strTemp.slice(i1,i2);
		            i1 = strTemp.indexOf(_Selection.GiftId+':');
		            if (i1!=-1) {
			        	i1 = strTemp.indexOf(':',i1)+1;
		            	i2 = strTemp.indexOf(',',i1);
		            	if (i2 != -1)
		            		new_invetory = strTemp.slice(i1,i2)*1
		            	else
		            		new_invetory = strTemp.slice(i1)*1;
		            } else {
			            new_invetory = 0;
		            }
	            
   		            //check to see if the gift was actually sent
		            if( strNotice.indexOf('You gave')  == -1) {
			        	GM_log('gift was not sent - Repeat');
			        	if (strNotice != '')
			        		strNotice += '<br>Gift not sent'
			        	else
			        		strNotice = 'Gift not sent';
			        	UpdateJobStatus(strNotice);
   			            NextRequest()

	            	} else {
		            	
		            	UpdateJobStatus(strNotice)
		            	// reduce the inventory
		            			            	
		            	gvar.item_amounts[_Selection.GiftCatagory][_Selection.GiftId] = new_invetory;
		            	if (_Selection.Repeat > 0) _Selection.Repeat -= iRepeat;
		            	
		            	//update Display
			            oDiv = document.getElementById('item_box_'+_Selection.GiftCatagory+'_'+_Selection.GiftId);
		            	if (oDiv != null) {
			            	if (oDiv.childNodes.length==7) {
			            		oDiv.childNodes[5].textContent = 'x'+gvar.item_amounts[_Selection.GiftCatagory][_Selection.GiftId]
		            		} else {
				            	//GM_log('oDiv.childNodes.length = '+oDiv.childNodes.length);
				            	for (var k=0; k<oDiv.childNodes.length; k++) GM_log(k+': '+oDiv.childNodes[k].textContent);
		            		}
		            	}
		            	
		            	RepeatRequest()
		           	}
	            } else {
		        	UpdateJobStatus('ERRROR sending gift.  HTML request failed');
		            NextRequest()
	            }
	            
            }
        })
	}
	
	var Selection;
	var newItem;
	var iRepeat;
	var iInventory;
	var oDiv;
	
	g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Starting');
	
	// pick the first element in the list
    Selection = gvar.Gift_Queue.list[0]
    
    if(gvar.Gift_Queue.IsPaused) {
	    // do nothing as the queue is supposed to be paused
	    g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Queue is paused.');
	    UpdateJobStatus('Queue is Paused');
    
	} else if (gvar.Gift_Queue.list.length == 0) {
	    // Queue is Empty
	    // Pause the Queue
	    GM_log('ATTEMPTING TO STOP QUEUE');
	    
	    StopQueue()
	    
	    g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Queue is Empty.  Turning things off');
	
	    
	} else if (gvar.bUpdatingInventory) {
		// Pause processing as the inventory in being updated from source
		g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Pausing gifting while inventory database is being updated');

		UpdateJobStatus('Pausing processing while inventory is being updated');
		RepeatRequest()
		
	} else if (Selection.IsPaused) { 
		// Item is paused
		// Cycle to next item
		g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Item '+Selection.GiftName+' is Paused');
		UpdateJobStatus('Skipping the following paused item: '+Selection.GiftName);
		NextRequest();
		
	} else if (Selection.GiftCatagory==3) {
		// Group Request
		if (Selection.Repeat == -1) {
			g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Infinite Collection Group');
			iInventory = gvar.item_amounts[3][Selection.GiftId]

			for (var ID=0;ID<7;ID++) {
				iRepeat	= Math.floor((gvar.item_amounts[0][Selection.GiftId*1+ID*1] - Selection.Floor)/Selection.NumIds);
				GM_log('iRepeat = '+ iRepeat);
				if (iRepeat > 0) {
					newItem 				= new Gift();
					newItem.GiftName		= gvar.item_names[0][Selection.GiftId*1+ID*1]
					newItem.GiftCatagory 	= 0;
					newItem.GiftId			= Selection.GiftId*1+ID*1;
					newItem.imgSrc[0]		= gvar.item_imgs[0][Selection.GiftId*1+ID*1]
					newItem.NumIds			= Selection.NumIds;
					newItem.Floor			= Selection.Floor;
					newItem.Repeat			= iRepeat;
					newItem.Ids				= Selection.Ids;
					newItem.Names			= Selection.Names;
					gvar.Gift_Queue.list.splice(1,0,newItem);
					iInventory 				= Math.min(iInventory,gvar.item_amounts[0][Selection.GiftId*1+ID*1]-iRepeat*Selection.NumIds);
				}

			}
			gvar.item_amounts[3][Selection.GiftId] = iInventory;
			oDiv = document.getElementById('item_box_'+Selection.GiftCatagory+'_'+Selection.GiftId);
           	if (oDiv != null) {
            	//update Display
            	if (oDiv.childNodes.length==3)	
            		oDiv.childNodes[2].textContent = 'x'+iInventory
		       	else {
		          	//GM_log('oDiv.childNodes.length = '+oDiv.childNodes.length);
				    for (var k=0; k<oDiv.childNodes.length; k++) GM_log(k+': '+oDiv.childNodes[k].textContent);
		   		}
   			}
			// Move the infinite Request to the end of the list and action the one just added
			NextRequest();
			
		} else 	{
			g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Finite Collection Group');
			
			iRepeat	= Math.floor((gvar.item_amounts[3][Selection.GiftId]*1 - Selection.Floor)/Selection.NumIds);
			iRepeat	= Math.min(iRepeat,Selection.Repeat);
			
			GM_log('iRepeat = '+iRepeat);

			if (iRepeat > 0) {
				for (var ID=0;ID<7;ID++) {
					//GM_log(Selection.GiftId*1+ID*1);
					newItem 				= new Gift();
					newItem.GiftName		= gvar.item_names[0][Selection.GiftId*1+ID*1]
					newItem.GiftCatagory 	= 0;
					newItem.GiftId			= Selection.GiftId*1+ID*1;
					newItem.imgSrc[0]		= gvar.item_imgs[0][Selection.GiftId*1+ID*1]
					newItem.NumIds			= Selection.NumIds;
					newItem.Floor			= Selection.Floor;
					newItem.Repeat			= iRepeat;
					newItem.Ids				= Selection.Ids;
					newItem.Names			= Selection.Names;
					gvar.Gift_Queue.list.splice(1,0,newItem);
				}
				
				iInventory = gvar.item_amounts[3][Selection.GiftId]*1 - iRepeat*Selection.NumIds;
				gvar.item_amounts[3][Selection.GiftId] = iInventory;
				oDiv = document.getElementById('item_box_'+Selection.GiftCatagory+'_'+Selection.GiftId);
            	if (oDiv != null) {
	            	//update Display
	            	if (oDiv.childNodes.length==3)	
	            		oDiv.childNodes[2].textContent = 'x'+iInventory
			       	else {
			          	//GM_log('oDiv.childNodes.length = '+oDiv.childNodes.length);
				    	for (var k=0; k<oDiv.childNodes.length; k++) GM_log(k+': '+oDiv.childNodes[k].textContent);
			   		}
	   			}
				
				// Move the Request to the end of the list and action the one just added
				Selection.Repeat	=	Selection.Repeat - iRepeat*Selection.NumIds;
				GM_log('Selection.Repeat = '+Selection.Repeat);
				NextRequest();
			}
		}
		
	} else if (Selection.GiftCatagory==4) {
		// Special Request
		
		var bRepeatTest;
		
		g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Special Request Item: '+Selection.GiftId);
		
		bRepeatTest = false;
		
		switch (Selection.GiftId){
			case '1':
				// all collectables
				g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'All Collectables');
				var CAT = 0
				for (var ID in gvar.item_names[CAT]) {
					iRepeat	= Math.floor((gvar.item_amounts[CAT][ID] - Selection.Floor)/Selection.NumIds);
					if (iRepeat > 0) {
						newItem 				= new Gift();
						newItem.GiftName		= gvar.item_names[CAT][ID]
						newItem.GiftCatagory 	= CAT;
						newItem.GiftId			= ID;
						newItem.imgSrc[0]		= gvar.item_imgs[CAT][ID]
						newItem.NumIds			= Selection.NumIds;
						newItem.Floor			= Selection.Floor;
						newItem.Repeat			= iRepeat;
						newItem.Ids				= Selection.Ids;
						newItem.Names			= Selection.Names;
						gvar.Gift_Queue.list.splice(1,0,newItem);
						bRepeatTest				= true;
					}
				}
				break
			case '2':
				// all Loot
				g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'All Loot');
				var CAT = 1
				for (var ID in gvar.item_names[CAT]) {
					iRepeat	= Math.floor((gvar.item_amounts[CAT][ID] - Selection.Floor)/Selection.NumIds)
					if (iRepeat > 0) {
						newItem 				= new Gift();
						newItem.GiftName		= gvar.item_names[CAT][ID]
						newItem.GiftCatagory 	= CAT;
						newItem.GiftId			= ID;
						newItem.imgSrc[0]		= gvar.item_imgs[CAT][ID]
						newItem.NumIds			= Selection.NumIds;
						newItem.Floor			= Selection.Floor;
						newItem.Repeat			= iRepeat;
						newItem.Ids				= Selection.Ids;
						newItem.Names			= Selection.Names;
						gvar.Gift_Queue.list.splice(1,0,newItem);
						bRepeatTest				= true;
					}
				}
				break
			case '3':
				// all boosts
				g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'All Boosts');
				var CAT = 2
				for (var ID in gvar.item_names[CAT]) {
					iRepeat	= Math.floor((gvar.item_amounts[CAT][ID] - Selection.Floor)/Selection.NumIds)
					if (iRepeat > 0) {
						newItem 				= new Gift();
						newItem.GiftName		= gvar.item_names[CAT][ID]
						newItem.GiftCatagory 	= CAT;
						newItem.GiftId			= ID;
						newItem.imgSrc[0]		= gvar.item_imgs[CAT][ID]
						newItem.NumIds			= Selection.NumIds;
						newItem.Floor			= Selection.Floor;
						newItem.Repeat			= iRepeat;
						newItem.Ids				= Selection.Ids;
						newItem.Names			= Selection.Names;
						gvar.Gift_Queue.list.splice(1,0,newItem);
						bRepeatTest				= true;
					}
				}
				break
			case '4':
				// everything
				g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'EVERTYTHING');

				for (var CAT = 0; CAT <3; ++CAT) {
					for (var ID in gvar.item_names[CAT]) {
						iRepeat	= Math.floor((gvar.item_amounts[CAT][ID] - Selection.Floor)/Selection.NumIds)
						if (iRepeat > 0) {
							newItem 				= new Gift();
							newItem.GiftName		= gvar.item_names[CAT][ID]
							newItem.GiftCatagory 	= CAT;
							newItem.GiftId			= ID;
							newItem.imgSrc[0]		= gvar.item_imgs[CAT][ID]
							newItem.NumIds			= Selection.NumIds;
							newItem.Floor			= Selection.Floor;
							newItem.Repeat			= iRepeat;
							newItem.Ids				= Selection.Ids;
							newItem.Names			= Selection.Names;
							gvar.Gift_Queue.list.splice(1,0,newItem);
							bRepeatTest				= true;
						}
					}
				}
				break
			case '5':
				// Top Attack
				g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Top Attack');
				var CAT = 0;
				for (var ID1 in Top_attack) {
					ID = Top_attack[ID1]
					iRepeat	= Math.floor((gvar.item_amounts[CAT][ID] - Selection.Floor)/Selection.NumIds);
					if (iRepeat > 0) {
						newItem 				= new Gift();
						newItem.GiftName		= gvar.item_names[CAT][ID]
						newItem.GiftCatagory 	= CAT;
						newItem.GiftId			= ID;
						newItem.imgSrc[0]		= gvar.item_imgs[CAT][ID]
						newItem.NumIds			= Selection.NumIds;
						newItem.Floor			= Selection.Floor;
						newItem.Repeat			= iRepeat;
						newItem.Ids				= Selection.Ids;
						newItem.Names			= Selection.Names;
						gvar.Gift_Queue.list.splice(1,0,newItem);
						bRepeatTest				= true;
					}
				}
				break
			case '6':
				// Top Defense
				g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Top Defense');
				var CAT = 0;
				for (var ID1 in Top_defense) {
					ID = Top_defense[ID1]
					iRepeat	= Math.floor((gvar.item_amounts[CAT][ID] - Selection.Floor)/Selection.NumIds);
					if (iRepeat > 0) {
						newItem 				= new Gift();
						newItem.GiftName		= gvar.item_names[CAT][ID]
						newItem.GiftCatagory 	= CAT;
						newItem.GiftId			= ID;
						newItem.imgSrc[0]		= gvar.item_imgs[CAT][ID]
						newItem.NumIds			= Selection.NumIds;
						newItem.Floor			= Selection.Floor;
						newItem.Repeat			= iRepeat;
						newItem.Ids				= Selection.Ids;
						newItem.Names			= Selection.Names;
						gvar.Gift_Queue.list.splice(1,0,newItem);
						bRepeatTest				= true;
					}
				}
				break
			case '7':
				// Top Combined
				g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Top Combined');
				var CAT = 0
				for (var ID1 in Top_combined) {
					ID = Top_combined[ID1]
					iRepeat	= Math.floor((gvar.item_amounts[CAT][ID] - Selection.Floor)/Selection.NumIds);
					if (iRepeat > 0) {
						newItem 				= new Gift();
						newItem.GiftName		= gvar.item_names[CAT][ID]
						newItem.GiftCatagory 	= CAT;
						newItem.GiftId			= ID;
						newItem.imgSrc[0]		= gvar.item_imgs[CAT][ID]
						newItem.NumIds			= Selection.NumIds;
						newItem.Floor			= Selection.Floor;
						newItem.Repeat			= iRepeat;
						newItem.Ids				= Selection.Ids;
						newItem.Names			= Selection.Names;
						gvar.Gift_Queue.list.splice(1,0,newItem);
						bRepeatTest				= true;
					}
				}
				break;
				
			default:
				GM_log('Missed it -'+Selection.GiftId+'-');
		}
		// Decrement the Repeats if something was sent.
		if ((Selection.Repeat != -1) && ( bRepeatTest))	Selection.Repeat -= 1;

		NextRequest();
			
	} else {
		g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Processing a NORMAL gift request');
		iErrorCount = 0;
		
		//calculate how many I can send
		iRepeat = Math.min(gvar.gifts_daily_left,(gvar.item_amounts[Selection.GiftCatagory][Selection.GiftId] -Selection.Floor));
		iRepeat = Math.floor(iRepeat/Selection.NumIds)
		GM_log('you have '+iRepeat+' to give away');
		
		//limit to maximum gifting, or what's left 
		if (Selection.Repeat == -1) {
			iRepeat = Math.min(iRepeat,gvar.max_gift_amount);
		} else {
			iRepeat = Math.min(iRepeat,gvar.max_gift_amount, Selection.Repeat);
		} 
		GM_log('you are limited to '+iRepeat+' to give away');
		
		if (Selection.Repeat == 0) {
			g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'Gift is done.  Repeat is zero');
			NextRequest();			//done
		} else if (iRepeat>0) {
			g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'try sending a gift');
			doStep1(Selection)				//try sending a gift
		} else {
			UpdateJobStatus('Skipping item.  No enough in stock');
			g_Utils.doLog(' Send_Gift_Queue', gvar.bDebugOn,'No enough in stock');
			NextRequest();			//not enough to send
		}
	}
	
}

//updates Inventory of giftable items.
function Iventory_update() {

    function doStep1() {
        var iCurrentJob, iWatchDog;
        var myUrl, myParms;
        
        // build search string;
        myUrl  	 = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=view&xw_city=1';
        myUrl	+= '&xw_client_id=8';
        myParms	 = 'ajax=1&liteload=1';
        myParms	+= '&sf_xw_sig=' + gvar.local_xw_sig + '&sf_xw_user_id=' + escape(gvar.FB_user_id);

        //GM_log('myUrl = '+myUrl);
        //GM_log('myParms = '+myParms);
        
        GM_log('Inventory Update - Daily Gift limit, and Boosts');
        
        // start the WatchDog Timer to catch hung requests. 15 seconds.
        iWatchDog = setTimeout(function (e) {
            // abort the current job;
            iCurrentJob.abort();

            // increase the error count
            iErrorCount += 1;
            if (iErrorCount <3) {
            	doStep1();
            } else {
                g_Utils.doLog('Iventory_update', gvar.bDebugOn, 'Unable to get inventory information');
            }
        }, 30000);
        iCurrentJob = GM_xmlhttpRequest({
            method: 'POST',
            url:  myUrl,
            data: myParms,
            headers: {
                'Accept':           '*/*',
                'Accept-Language':  'en-us,en;q=0.5',
                'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },

            onload: function(_responseDetails) {

                var strTemp, strName, strSCR;
                var i1,i2;
                var iGiftId;
                var temp_amounts, temp_names, temp_imgs;
                
                clearTimeout(iWatchDog);
                iErrorCount = 0;

                try {
                    if (_responseDetails.status == 200) {
	                    strTemp     = _responseDetails.responseText;
                        
	                    //find gifting limit
	                    i1		= strTemp.indexOf('var gifts_daily_left')+4;
	                    i2		= strTemp.indexOf(';',i1);
	                    eval('gvar.'+strTemp.slice(i1,i2));
	                    
	                    GM_log('Daily Gift Limit = '+ gvar.gifts_daily_left)
	                    
	                    //find groups_levels
						i1 = strTemp.indexOf('var groups_levels')+4;
						i2 = strTemp.indexOf('};',i1);
						eval('gvar.'+strTemp.slice(i1,i2+1));
	                    
	                    //find Boosts
                        i1      = strTemp.indexOf('item_amounts = {');
                        i1		= strTemp.indexOf('=',i1)
                        i2      = strTemp.indexOf('}};',i1);
                        eval('temp_amounts '+ strTemp.slice(i1,i2+3));
                        i1      = strTemp.indexOf('item_names = {',i2);
                        i1		= strTemp.indexOf('=',i1)
                        i2      = strTemp.indexOf('}};',i1);
                        eval('temp_names ' + strTemp.slice(i1,i2+3));
                        i1      = strTemp.indexOf('item_imgs = {',i1);
                        i1		= strTemp.indexOf('=',i1)
                        i2      = strTemp.indexOf('}};',i1);
                        eval('temp_imgs '+ strTemp.slice(i1,i2+3));
                        
                        // copy boost information
                        for (var id in temp_amounts[2]) {
                        	gvar.item_amounts[2][id]	=	temp_amounts[2][id]
                        	gvar.item_names[2][id] 		= 	temp_names[2][id]
                        	gvar.item_imgs[2][id]		=	temp_imgs[2][id]
                    	}
                    }
                } catch(_errObj) {
                    g_Utils.doLogError('Iventory_update', 'Step 1 - ', _errObj);
                    
                }
            }
        });
    }
    
    function doStep2() {
        var iCurrentJob, iWatchDog;
        var myUrl, myParms;
        
        // build search string;
        myUrl  	 = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=inventory&xw_action=view&xw_city=1';
        myUrl	+= '&xw_person='+gvar.FB_user_id.slice(2);
        myUrl	+= '&from_controller=inventory&xw_client_id=8';
        myParms	 = 'ajax=1&liteload=1';
        myParms	+= '&sf_xw_sig=' + gvar.local_xw_sig + '&sf_xw_user_id=' + escape(gvar.FB_user_id);

        //GM_log('myUrl = '+myUrl);
        //GM_log('myParms = '+myParms);
        
        GM_log('Inventory Update - Loot (Weapons, Armor, Vehicles, and Animals)');
        
        // start the WatchDog Timer to catch hung requests. 15 seconds.
        iWatchDog = setTimeout(function (e) {
            // abort the current job;
            iCurrentJob.abort();

            // increase the error count
            iErrorCount += 1;
            if (iErrorCount <3) {
            	doStep2();
            } else {
                g_Utils.doLog('Iventory_update', gvar.bDebugOn, 'Unable to get inventory information');
            }
        }, 30000);
        iCurrentJob = GM_xmlhttpRequest({
            method: 'POST',
            url:  myUrl,
            data: myParms,
            headers: {
                'Accept':           '*/*',
                'Accept-Language':  'en-us,en;q=0.5',
                'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },

            onload: function(_responseDetails) {

                var strTemp, strName, strSCR;
                var i1,i2;
                var iGiftId;
                var Items;
                
                clearTimeout(iWatchDog);
                iErrorCount = 0;

                try {
                    if (_responseDetails.status == 200) {
	                    strTemp     = _responseDetails.responseText;
                        
	                    //find Loot information
	                    i1		= strTemp.indexOf('var Items =')+4;
	                    i2		= strTemp.indexOf('};',i1)+1;
	                    eval(strTemp.slice(i1,i2));
                                            
						for (var ID in Items.data) {
							if (Items.data[ID].tradeable == 1) {
	                    		gvar.item_amounts[1][ID]	=	Items.data[ID].quantity;
                        		gvar.item_names[1][ID]	=	Items.data[ID].name.replace(/\&quot;/g,'"').replace(/'/g,"'");
                        		gvar.item_imgs[1][ID]	=	Items.data[ID].hugeImg;
                        		gvar.item_attack[1][ID] 	= 	Items.data[ID].attack;
								gvar.item_defense[1][ID] = 	Items.data[ID].defense;
								gvar.item_type[1][ID]	= 	Items.data[ID].type;
							}
							if (gvar.Top_attack[0]==0) {
								for(var j=0;j<5;j++) {
									gvar.Top_attack[j]		= ID;
									gvar.Top_defense[j]		= ID;
									gvar.Top_combined[j]	= ID;
			            		}
		            		}
							switch(Items.data[ID].type) {
								case 3:
									//vehicle
									if (Items.data[ID].attack > Items.data[gvar.Top_attack[0]].attack) {gvar.Top_attack[0] = ID}
									if (Items.data[ID].defense > Items.data[gvar.Top_defense[0]].defense) { gvar.Top_defense[0] = ID}
									if ((Items.data[ID].attack + Items.data[ID].defense) > Items.data[gvar.Top_combined[0]].attack + Items.data[gvar.Top_combined[0]].defense) { gvar.Top_combined[0] = ID}
									break;
								case 1:
									// weapon
									if (Items.data[ID].attack > Items.data[gvar.Top_attack[1]].attack) {gvar.Top_attack[1] = ID}
									if (Items.data[ID].defense > Items.data[gvar.Top_defense[1]].defense) { gvar.Top_defense[1] = ID}
									if ((Items.data[ID].attack+Items.data[ID].defense) > Items.data[gvar.Top_combined[1]].attack + Items.data[gvar.Top_combined[1]].defense) { gvar.Top_combined[1] = ID}
									break;
								case 2:
									//armour
									if (Items.data[ID].attack > Items.data[gvar.Top_attack[2]].attack) {gvar.Top_attack[2] = ID}
									if (Items.data[ID].defense > Items.data[gvar.Top_defense[2]].defense) { gvar.Top_defense[2] = ID}
									if ((Items.data[ID].attack+Items.data[ID].defense) > Items.data[gvar.Top_combined[2]].attack + Items.data[gvar.Top_combined[2]].defense) { gvar.Top_combined[2] = ID}
									break;
								case 8:
									// animal
									if (Items.data[ID].attack > Items.data[gvar.Top_attack[3]].attack) {gvar.Top_attack[3] = ID}
									if (Items.data[ID].defense > Items.data[gvar.Top_defense[3]].defense) { gvar.Top_defense[3] = ID}
									if ((Items.data[ID].attack+Items.data[ID].defense) > Items.data[gvar.Top_combined[3]].attack + Items.data[gvar.Top_combined[3]].defense) { gvar.Top_combined[3] = ID}
									break;	 
								case 13:
									// henchman
									if (Items.data[ID].attack > Items.data[gvar.Top_attack[4]].attack) {gvar.Top_attack[4] = ID}
									if (Items.data[ID].defense > Items.data[gvar.Top_defense[4]].defense) { gvar.Top_defense[4] = ID}
									if ((Items.data[ID].attack+Items.data[ID].defense) > Items.data[gvar.Top_combined[4]].attack + Items.data[gvar.Top_combined[4]].defense) { gvar.Top_combined[4] = ID}
									break;
							}
		            	}
                    }
                } catch(_errObj) {
                    g_Utils.doLogError('Iventory_update', 'Step 2 - ', _errObj);
                }
            }
        });
    }

    function doStep3(_iStep) {
        var iCurrentJob, iWatchDog;
        var myUrl, myParms;

        if (_iStep <8) {
            GM_log('_iStep = '+_iStep);

            // build search string;
            
	        GM_log('Inventory Update - Collection Step '+_iStep+' - Cities');
            
            myUrl  	 = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=collection&xw_action=view&xw_city=4';
            myUrl	+= '&xw_person='+gvar.FB_user_id.slice(2);
            myUrl	+= '&selected_city=' + _iStep + '&filter_col=1&xw_client_id=8';
            myParms	 = 'ajax=1&liteload=1';
            myParms	+= '&sf_xw_sig=' + gvar.local_xw_sig + '&sf_xw_user_id=' + escape(gvar.FB_user_id);
            
            
            // start the WatchDog Timer to catch hung requests. 15 seconds.
            iWatchDog = setTimeout(function (e) {
                // abort the current job;
                iCurrentJob.abort();

                // increase the error count
                iErrorCount += 1;
                if (iErrorCount <3) {
                    doStep3(_iStep);
                } else {
	                g_Utils.doLog('Iventory_update', gvar.bDebugOn, 'Unable to get inventory information');
                }
            }, 30000);
            
            iCurrentJob = GM_xmlhttpRequest({
                method: 'POST',
                url:  myUrl,
                data: myParms,
                headers: {
                    'Accept':           '*/*',
	                'Accept-Language':  'en-us,en;q=0.5',
	                'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
	                'X-Requested-With': 'XMLHttpRequest'
                },

                onload: function(_responseDetails) {

                    var strTemp, strTemp2, strName, strSCR;
                    var i1,i2, i3;
                    var iGiftId;
                    var iAmount;
                    var iStart, bStart, iStart_ID;
                    var j;
                   
                     var icollectAmount;
                    
                    clearTimeout(iWatchDog);
                    iErrorCount = 0;
                    
                    try {
                        if (_responseDetails.status == 200) {
                            strTemp     = _responseDetails.responseText;
                            
                            iStart=0;
                            do {
	                            //find first collection element
	                            if ((_iStep == 7) && (iStart == 0)) {
		                            // skip rock collections.
		                            iStart = strTemp.indexOf('<div class="loot_vault"',iStart)+1;
		                            iStart = strTemp.indexOf('<div class="loot_vault"',iStart);
	                            } else {
                                	iStart = strTemp.indexOf('<div class="loot_vault"',iStart);
                            	}
                                
                                if (iStart !=-1 ) {
	                                // do one whole collection at a time
	                                i1 = iStart;
	                                iStart_ID = -1;
	                                j = 0;
	                                do {
		                                //find the name
		                                i1          = strTemp.indexOf('<div style="padding:',i1);
		                                i1      	= strTemp.indexOf('<div style="height',i1);
	                                    i1     		= strTemp.indexOf('>',i1)+1;
	                                    i2      	= strTemp.indexOf('<',i1);
	                                    strName 	= strTemp.slice(i1,i2).replace(/\t|\n/g,'');
	                                    strName		= strName.replace(/\&quot;/g,'"');
	                                    strName		= strName.replace(/'/g,"'");
	                       
	                                    //find the image
	                                    i1      	= strTemp.indexOf('<img',i2);
	                                    i1			= strTemp.indexOf('src="https:',i1)+5;
	                                    i2      	= strTemp.indexOf('"',i1);
	                                    strSCR  	= strTemp.slice(i1,i2).replace(/\t|\n/g,'');
   	                                    //find the quantity
	                                    i1      	= strTemp.indexOf('x',i2);
	                                    i2      	= strTemp.indexOf('<',i1);
	                                    iAmount 	= strTemp.slice(i1+1,i2).replace(/\t|\n/g,'')*1;
	                	                
	                                    // find the Collection quantity
	                	                if ( j==0) 
	                	                	icollectAmount = iAmount * 1
	                	                else
	                	                	icollectAmount = Math.min(icollectAmount,iAmount*1);    
	                	                	
	                                    // find the GiftId
	                	                i1			= strTemp.indexOf('<a',i2);
	                                    i2			= strTemp.indexOf('</a>',i1);
	                                    strTemp2 	= strTemp.slice(i1,i2) 
	                                    i3      	= strTemp2.indexOf('gift_id'); 
	
	                                    if (iStart_ID != -1) {
	                                        iGiftId 						= iStart_ID + j;
		                                    gvar.item_names[0][iGiftId]      = strName;
	                            			gvar.item_imgs[0][iGiftId]       = strSCR;
	                            			gvar.item_amounts[0][iGiftId]    = iAmount;
	                            			
	                                  		// save collection information
	                                  		gvar.item_imgs[3][iStart_ID][j]       = strSCR;
	
	                            			j += 1;
			                                
		                                } else if (i3 != -1) {
			                                // We do not know the start of the series yet
	                                    
		                                    i2      	= strTemp2.indexOf('"',i3);
	                                		iGiftId 	= strTemp2.slice(i3+8,i2) * 1;
		                                    
		                                    // Starting ID has not been found for series.  Restart series
											iStart_ID 	= iGiftId -j
											j 			= 0
											i1			= iStart;
											
											// save collection information
											gvar.item_names[3][iStart_ID]	= gvar.collection_names[iStart_ID]
											gvar.item_imgs[3][iStart_ID]		= {};
		                                    
	                                    } else {
		                                    j += 1;
	                                    }

		                            } while (j<7)
		                            
		                            // Save collection information
		                            gvar.item_amounts[3][iStart_ID] = icollectAmount;
		                            iStart = i1;
	                            }
	                        } while (iStart!=-1)

                            // next set of collections
                            
                            _iStep += 1;
                            doStep3(_iStep);
                        }
                    } catch(_errObj) {
                        g_Utils.doLogError('Iventory_update', 'Step 2 - ', _errObj);
                    }
                }
            });
        }
    }
    
    function doStep4(_iStep) {
        var iCurrentJob, iWatchDog;
        var myUrl, myParms;

        // build search string;
        
        GM_log('Inventory Update - Collection Step '+_iStep+' - Other');

        
    	switch (_iStep) {
        	case 1:
	        	GM_log('_iStep = Crew Collection');
				myUrl  	 = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=collection&xw_action=view&xw_city=4';
		        myUrl	+= '&xw_person='+gvar.FB_user_id.slice(2);
    			myUrl	+= '&selected_city=3&filter_col=4&xw_client_id=8';
				
        		break;
        	case 2:	
        		GM_log('_iStep = Special');
				myUrl  	 = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=collection&xw_action=view&xw_city=4';
		        myUrl	+= '&xw_person='+gvar.FB_user_id.slice(2);
				myUrl	+= '&selected_city=3&filter_col=256783&xw_client_id=8';
        		break;
        	case 3:
    	        GM_log('_iStep = Missions');
				myUrl  	 = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=collection&xw_action=view&xw_city=4';
		        myUrl	+= '&xw_person='+gvar.FB_user_id.slice(2);
				myUrl	+= '&selected_city=3&filter_col=9&xw_client_id=8';
				break;
    	}
		myParms	 = 'ajax=1&liteload=1';
		myParms	+= '&sf_xw_sig=' + gvar.local_xw_sig + '&sf_xw_user_id=' + escape(gvar.FB_user_id);
    
        // start the WatchDog Timer to catch hung requests. 15 seconds.
        iWatchDog = setTimeout(function (e) {
            // abort the current job;
            iCurrentJob.abort();

            // increase the error count
            iErrorCount += 1;
            if (iErrorCount <3) {
                doStep4(_iStep);
            } else {
                g_Utils.doLog('Iventory_update', gvar.bDebugOn, 'Unable to get inventory information');
            }
        }, 30000);
        
        iCurrentJob = GM_xmlhttpRequest({
            method: 'POST',
            url:  myUrl,
            data: myParms,
            headers: {
                'Accept':           '*/*',
                'Accept-Language':  'en-us,en;q=0.5',
                'Content-Type':     'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },

            onload: function(_responseDetails) {

                var strTemp, strTemp2, strName, strSCR;
                var i1,i2, i3;
                var iGiftId;
                var iAmount;
                var iStart, bStart, iStart_ID;
                var j;
               
                 var icollectAmount;
                
                clearTimeout(iWatchDog);
                iErrorCount = 0;
                
                try {
                    if (_responseDetails.status == 200) {
                        strTemp     = _responseDetails.responseText;
                        
                        iStart=0;
                        do {
	                        //find first collection element
                            iStart = strTemp.indexOf('<div class="loot_vault"',iStart);
                            if (iStart !=-1 ) {
                                // do one whole collection at a time
                                i1 = iStart;
                                iStart_ID = -1;
                                j = 0;
                                do {
                                    //find the name
	                                i1          = strTemp.indexOf('<div style="padding:',i1);		                                
		                            i1      	= strTemp.indexOf('<div style="height',i1);
                                    i1     		= strTemp.indexOf('>',i1)+1;
                                    i2      	= strTemp.indexOf('<',i1);
                                    strName 	= strTemp.slice(i1,i2).replace(/\t|\n/g,'');
                                    strName		= strName.replace(/\&quot;/g,'"');
                                    strName		= strName.replace(/'/g,"'");
                       
                                    //GM_log('strName='+strName);
                                                 
                                    //find the image
                                    i1      	= strTemp.indexOf('<img',i2);
                                    i1			= strTemp.indexOf('src="https:',i1)+5;
                                    i2      	= strTemp.indexOf('"',i1);
                                    strSCR  	= strTemp.slice(i1,i2).replace(/\t|\n/g,'');
	                                    //find the quantity
                                    i1      	= strTemp.indexOf('x',i2);
                                    i2      	= strTemp.indexOf('<',i1);
                                    iAmount 	= strTemp.slice(i1+1,i2).replace(/\t|\n/g,'')*1;
                	                
                                    // find the Collection quantity
                	                if ( j==0) 
                	                	icollectAmount = iAmount * 1
                	                else
                	                	icollectAmount = Math.min(icollectAmount,iAmount*1);    
                	                	
                                    // find the GiftId
                	                i1			= strTemp.indexOf('<a',i2);
                                    i2			= strTemp.indexOf('</a>',i1);
                                    strTemp2 	= strTemp.slice(i1,i2) 
                                    i3      	= strTemp2.indexOf('gift_id');
                                    
                                    if (iStart_ID != -1) {
                                        iGiftId 					= iStart_ID + j;
	                                    gvar.item_names[0][iGiftId]      = strName;
                            			gvar.item_imgs[0][iGiftId]       = strSCR;
                            			gvar.item_amounts[0][iGiftId]    = iAmount;
                            			
                                  		// save collection information
                                  		gvar.item_imgs[3][iStart_ID][j]       = strSCR ;

                            			j += 1;
		                                
	                                } else if (i3 != -1) {
		                                // We do not know the start of the series yet
                                    
	                                    i2      = strTemp2.indexOf('"',i3);
                                		iGiftId = strTemp2.slice(i3+8,i2) * 1;
	                                    
	                                    // Starting ID has not been found for series.  Restart series
										iStart_ID = iGiftId -j
										j = 0
										i1= iStart;
										
										// save collection information
										gvar.item_names[3][iStart_ID] = gvar.collection_names[iStart_ID]
										gvar.item_imgs[3][iStart_ID] = {};
	                                    
                                    } else {
	                                    j += 1;
                                    }

	                            } while (j<7)
	                            
	                            // Save collection information
	                            gvar.item_amounts[3][iStart_ID] = icollectAmount;
	                            iStart = i1;
                            }
                        } while (iStart!=-1)
                        
                        // next
                        if (_iStep<3 )
                        	doStep4(_iStep+1)
                        else
                        	gvar.bUpdatingInventory	= false;
                        
                    }
                } catch(_errObj) {
                    g_Utils.doLogError('Iventory_update', 'Step 4 - ', _errObj);
                }
            }
        });
    
    }
    
    var iErrorCount=0;
    var oSnap;
    var i1, i2, strTemp;

    //indicate that the the inventory is being updated
    gvar.bUpdatingInventory	= true;
    
    oSnap = g_Utils.getSnapshot(gvar.strXwSig)
    strTemp = oSnap.snapshotItem(0).text
    i1 = strTemp.indexOf("var local_xw_sig =")
    
    if (i1 != -1) {
	    i1 = strTemp.indexOf("'",i1)+1
	    i2 = strTemp.indexOf("'",i1)
	    
	    //local_xw_sig = local_xw_sig;
	    gvar.local_xw_sig = strTemp.slice(i1,i2)
	    
	    GM_log('local_xw_sig = '+gvar.local_xw_sig);
	    
	    //zero the inventory arrays
	    //build item array
	    
	    for (var i = 0; i<4; i++) {
		    gvar.item_names[i] 		= {};
	        gvar.item_imgs[i] 		= {};
	        gvar.item_amounts[i] 	= {};
    	}
    	
        gvar.item_names[4]		= gvar.special_names;
		gvar.item_imgs[4]  	 	= gvar.special_imgs;
		gvar.item_amounts[4] 	= {};
		
		gvar.animal		= {0:0,1:0,2:0}
		gvar.weapon		= {0:0,1:0,2:0}
		gvar.armour		= {0:0,1:0,2:0}
		gvar.vehicle	= {0:0,1:0,2:0} 
	    
    	// Get available gift limit
    	doStep1()
    	
    	// Get Loot
    	doStep2();
    	
    	// Get Collections
    	doStep3(1);
    	
    	// Get Crew, Special, and Mission
    	doStep4(1)
    	
	} else {
    	GM_log('Skipping Inventory Update. local_xw_sig is undefined');
	}
}



// Display Routines

function GiftQueueDisplay() {

    var oDom, oDiv, oSnapShot, oButton, oUL, oLi, oTabItem, oTemp, oSpan, oSelect, oOption, oTest;
    var oText, oBr, oInput;
    var oUl, oLi;
    var i, strClass;
    var oTr;
    var iRow1, iRow2
    var k;

    // Test to see if we are in the inventory section
    oSnapShot = g_Utils.getSnapshot(gvar.strGiftPage);

    // has the Queue section been added to the bottom of the screen
    oTest = document.getElementById(gvar.strQueueDiv);

    // have we been to the gifting page yet
    if (oSnapShot.snapshotLength > 0) {
	    
	    oDiv = document.getElementById('mafia_graph_attack')
	    if( oDiv !=null ) oDiv.childNodes[7].style.bottom = "1050px"
	    
	    	    
	    if ( oTest == null) {
		    
		    // Add Div Block
	        oTemp = document.getElementById('inner_page');
	        oDiv = document.createElement('div');
	        oDiv.id =  gvar.strQueueDiv;
	        oDiv.setAttribute('style','display: block; margin-left:10px');
	        oTemp.parentNode.insertBefore(oDiv,oTemp.nextSibling);
	        oTemp = oDiv;
	
	        // Add block for Title and controls
	        oDiv = document.createElement('div');
	        oDiv.setAttribute('style','width: 738px; margin-top: 20px;');
	        oTemp.appendChild(oDiv);
	        oTemp = oDiv;
	
	        // Add new title
	        oDiv = document.createElement('div');
	        oDiv.setAttribute('class','title');
	        oDiv.textContent = 'PS MafiaWars Gift Queue (MWQG)';
	        oTemp.appendChild(oDiv);
	
	        // Add Status Line with Start Stop Button
	        // Note: This section is structured to show DOM tree
	
	        oDiv = document.createElement('div');
	            oTbody = document.createElement('tbody');
	            oTbody.setAttribute('style', 'margin-left: 6px; margin-top: 2px; border: 0px; height: 60px; width: 732px; float: left;');
	                oTr = document.createElement('tr');
	                    oTd  = document.createElement('td');
	                    oTd.setAttribute('style', 'width: 60px;');
	                    oTd.setAttribute('rowspan', '2');
	                        oButton = document.createElement('a');
	                        oButton.setAttribute('href','http://userscripts.org/scripts/show/108551');
	                        oButton.setAttribute('target','_blank');
	                            oImg = document.createElement('img');
	                            oImg.id = gvar.strLogo;
	                            oImg.setAttribute('src',gvar.imgLogo)
	                        oButton.appendChild(oImg);
	                    oTd.appendChild(oButton);
	                oTr.appendChild(oTd);
	                    oTd = document.createElement('td');
	                    oTd.setAttribute('style', 'width: 590px;');
	                        // Add new minibuttons
	                        oUL   = document.createElement('ul');
	                        oUL.setAttribute('class','minitabs');
	                        oUL.setAttribute('style','margin-top: 2px;');
	
	                            // Start Queue
	                            oTabItem = document.createElement('li');
	                            oTabItem.setAttribute('class','tab_on tab_middle')
	                            oTabItem.id = gvar.strStartButton;
	                            if (gvar.Gift_Queue.IsPaused)
	                                oTabItem.setAttribute('style', '')
	                            else
	                                oTabItem.setAttribute('style', 'opacity: 0.25;');
	                                oDom = document.createElement('div'),
	                                oDom.setAttribute('class','minitab_content');
	                                oDom.addEventListener("click", g_ListenerLib.click_StartQueue(0), false);
	                                    oButton = document.createElement('a');
	                                    oButton.textContent = 'Start Queue';
	                                oDom.appendChild(oButton);
	                            oTabItem.appendChild(oDom);
	                        oUL.appendChild(oTabItem);
	
	                            // Stop Queue
	                            oTabItem = document.createElement('li');
	                            oTabItem.setAttribute('class','tab_on tab_middle')
	                            oTabItem.id = gvar.strStopButton;
	                            if (gvar.Gift_Queue.IsPaused)
	                                oTabItem.setAttribute('style', 'opacity: 0.25;')
	                            else
	                                oTabItem.setAttribute('style', '');
	                                oDom = document.createElement('div'),
	                                oDom.setAttribute('class','minitab_content');
	                                oDom.addEventListener("click",g_ListenerLib.click_StartQueue(1), false);
	                                    oButton = document.createElement('a');
	                                    oButton.setAttribute('class', 'StartQueue');
	                                    oButton.textContent = 'Stop Queue';
	                                oDom.appendChild(oButton);
	                            oTabItem.appendChild(oDom);
	                        oUL.appendChild(oTabItem);
	                    oTd.appendChild(oUL);
	                oTr.appendChild(oTd);
	                    oTd  = document.createElement('td');
	                    oTd.setAttribute('style', 'width: 100px;');
	                    oTd.setAttribute('rowspan', '2');
	                        oText = document.createElement('text');
	                        oText.textContent = 'Version '+script_version;
	                    oTd.appendChild(oText);
	                        oBr = document.createElement('br');
	                    oTd.appendChild(oBr);
	                        oButton = document.createElement('a');
	                        oButton.textContent = 'Settings';
	                        oButton.addEventListener("click", g_ListenerLib.click_Setting(gvar.bSetting), false);
	                    oTd.appendChild(oButton);
	               oTr.appendChild(oTd);
	            oTbody.appendChild(oTr);
	
	                oTr = document.createElement('tr');
	                    oTd = document.createElement('td');
	                    oTd.id = gvar.strCurrentJob;
	                    oTd.innerHTML = '<b>Status</b> : idle';
	                    oTd.setAttribute('colspan', '2');
	                oTr.appendChild(oTd);
	            oTbody.appendChild(oTr);
	        oDiv.appendChild(oTbody);
	        oTemp.appendChild(oDiv);
		    
	        // add settings window
	        oDiv = document.createElement('div');
	        if (gvar.bSetting)
	            oDiv.setAttribute('style','float: left; display: block;')
	        else
	            oDiv.setAttribute('style','float: left; display: none;');
	        oDiv.id = gvar.strSettings;
	            oTable = document.createElement('table');
	            oTable.setAttribute('style','border: 1px solid rgb(170, 170, 170); overflow: auto; width: 425px;');
	                oTbody = document.createElement('tbody');
	                    oTr = document.createElement('tr')
	                        oTd = document.createElement('Td');
	                        oTd.setAttribute('colspan','3');
	                        oTd.setAttribute('style','text-align:right;');
	                            oImg = document.createElement('img');
	                            oImg.setAttribute('src',gvar.imgCloseButton)
	                            oImg.addEventListener("click", g_ListenerLib.click_Setting(gvar.bSetting), false);
	                        oTd.appendChild(oImg);
	                    oTr.appendChild(oTd);
	                oTbody.appendChild(oTr);
	                    oTr = document.createElement('tr');
	                    	createDropDownList(oTr, 0,'Delay between Gifting Attempts','1 seconds;2 seconds;3 seconds;4 seconds;5 seconds;6 seconds;7 seconds;8 seconds;9 seconds;10 seconds','1;2;3;4;5;6;7;8;9;10','This is the delay between each gifting attempt.  If the value is too small Mafia Wars may reject the gifting request');
	                oTbody.appendChild(oTr);
	                    oTr = document.createElement('tr');
	                    createDropDownList(oTr, 1,'Wait period Queued Items','1 second;5 seconds;10 seconds;15 seconds;30 seconds;1 minute;5 minutes','1;5;10;15;30;60;300','This the wait periods between items in the Queue');
	                        oTd = document.createElement('td');
	                	oTr.appendChild(oTd);
	                oTbody.appendChild(oTr);
	                   	oTr = document.createElement('tr');
		                    oTd = document.createElement('td');
	    	                oTd.setAttribute('colspan','3');
	    	                	oUl = document.createElement('ul');
			            		oUl.setAttribute('class','minitabs');
			            			oLi = document.createElement('li');
		                			oLi.setAttribute('class','tab_on tab_middle');
		                				oDom = document.createElement('div');
		                				oDom.setAttribute('class','minitab_content');
											oButton = document.createElement('a');
											oButton.textContent = 'Apply Changes';    		
					            			oButton.addEventListener("click",  g_ListenerLib.click_SettingsApply , false);
		                				oDom.appendChild(oButton);
		                			oLi.appendChild(oDom);
		                		oUl.appendChild(oLi);
		                			oLi = document.createElement('li');
		                			oLi.setAttribute('class','tab_on tab_middle');
		                				oDom = document.createElement('div');
		                				oDom.setAttribute('class','minitab_content');
											oButton = document.createElement('a');
											oButton.textContent = 'Default Values';
				                            oButton.addEventListener("click",  g_ListenerLib.click_SettingsDefault , false);
		                				oDom.appendChild(oButton);
		                			oLi.appendChild(oDom);
		                		oUl.appendChild(oLi);
		                		
		                		// only show this item for Firefox
		                		if (gvar.isGreaseMonkey){
			                			oLi = document.createElement('li');
			                			oLi.setAttribute('class','tab_on tab_middle');
			                				oDom = document.createElement('div');
			                				oDom.setAttribute('class','minitab_content');
												oButton = document.createElement('a');
												oButton.textContent = 'Update Check';
					                            oButton.addEventListener("click",  function() { g_Utils.updateCheck(true);}, false);
			                				oDom.appendChild(oButton);
			                			oLi.appendChild(oDom);
		                			oUl.appendChild(oLi);
                				}
	                    	oTd.appendChild(oUl);
		               	oTr.appendChild(oTd);
					oTbody.appendChild(oTr);
				oTable.appendChild(oTbody);
	        oDiv.appendChild(oTable);
		    oTemp.appendChild(oDiv);
	
	        oTemp = oTemp.parentNode;
	        
	        // Add Header to Table
	        oDom = document.createElement('div');
	        oDom.setAttribute('style','margin-top: 25px; float: left; height: 35px; width: 720px;');
	        oDiv = document.createElement('div');
	        oDiv.setAttribute('style','padding: 10px 0px 0px; float: left; width: 260px; text-align: center; font-weight: bold;');
	        oDiv.textContent = 'Gift Items'
	        oDom.appendChild(oDiv);
	        oDiv = document.createElement('div');
	        oDiv.setAttribute('style','padding: 10px 0px 0px; float: left; width: 310px; text-align: left; font-weight: bold;');
	        oDiv.textContent = 'Recipients'
	        oDom.appendChild(oDiv);
	        oDiv = document.createElement('div');
	        oDiv.setAttribute('style','padding: 10px 0px 0px; float: left; width: 137px; text-align: center; font-weight: bold;');
	        oDiv.textContent = 'Actions'
	        oDom.appendChild(oDiv);
	
	        oTemp.appendChild(oDom);
	
	        // Add Table for Queue items
	        oDiv = document.createElement('div');
	        oDiv.setAttribute('style','float:left;');
				oTable = document.createElement('table');
	        		oTbody = document.createElement('tbody');
				        oTbody.innerHTML = "<tr>Setup Complete</tr>";
	        		oTbody.setAttribute('style', 'border: 1px solid rgb(170, 170, 170); overflow: auto; height: 552px; width: 732px; float: left;');
	        		oTbody.id = gvar.strQueueTable;
	        	oTable.appendChild(oTbody);
	        oDiv.appendChild(oTable);
	        
	        oTemp.appendChild(oDiv);
	        
	        
	        UpdateJobStatus('Display Created');
	        UpdateQueueTableDisplay();
	    }
	    
    }
}

function UpdateQueueTableDisplay() {

    var oTbody, oTr, oImg, oDiv, oDiv_keep1, oDiv_keep2, oDom, oSpan, oFont, oButton;
    var strTemp, i, iGiftCount;

    oTbody = document.getElementById(gvar.strQueueTable);

    if (oTbody == null) {
        g_Utils.doLog('UpdateQueueTableDisplay', gvar.bDebugOn, 'Table not present');
        return;
    }

    if (gvar.Gift_Queue.list.length == 0 ) {
        //Empty List

        g_Utils.doLog('UpdateQueueTableDisplay', gvar.bDebugOn, 'The Queue is Empty');
        oTbody.innerHTML = '<tr><td>The Queue is Empty</td></tr>'
    } else {
        g_Utils.doLog('UpdateQueueTableDisplay', gvar.bDebugOn, 'List is NOT Empty');

        oTbody.innerHTML = '';
        iGiftCount = 0;
        
        for (var iGift=0; iGift<gvar.Gift_Queue.list.length; ++iGift) {
            g_Utils.doLog('UpdateQueueTableDisplay', gvar.bDebugOn,'Create line for '+ gvar.Gift_Queue.list[iGift].GiftName);
            oTr = document.createElement('tr');
            oTr.setAttribute('bgcolor',"black");
            oTr.setAttribute('onmouseover',"this.bgColor='grey';");
            oTr.setAttribute('onmouseout',"this.bgColor='black';");
                oDom = document.createElement('div');
                oDom.setAttribute('style',"border-bottom: 1px solid rgb(51, 51, 51); float: left; width: 700px;");

                //add the item image

            	oDiv = document.createElement('div');
            	oDiv_keep1 = oDiv;
            	if (gvar.Gift_Queue.list[iGift].IsPaused)
                    oDiv.setAttribute('style',"width: 75px; height: 75px; float: left; padding-top: 2px; opacity: 0.25; ")
                else
                    oDiv.setAttribute('style',"width: 75px; height: 75px; float: left; padding-top: 2px;");
                
                for(var i=0; i<gvar.Gift_Queue.list[iGift].imgSrc.length; i++) {
                	oImg = document.createElement('img');
	               	oImg.setAttribute('src',gvar.Gift_Queue.list[iGift].imgSrc[i]);

                	if (gvar.Gift_Queue.list[iGift].imgSrc.length==1) {
	                	oImg.setAttribute('style','width: 75px; height: 75px;')
                	} else {
                    	switch (i) {
                            case 0:oImg.setAttribute('style','width: 32px; height: 32px; display: block; margin-top: 0px; margin-left: 0px;'); break;
                            case 1:oImg.setAttribute('style','width: 32px; height: 32px; display: block; margin-top: -12px; margin-left: 0px;'); break;
                            case 2:oImg.setAttribute('style','width: 32px; height: 32px; display: block; margin-top: -12px; margin-left: 0px;'); break;
                            case 3:oImg.setAttribute('style','width: 32px; height: 32px; display: block; margin-top: -72px; margin-left: 40px;'); break;
                            case 4:oImg.setAttribute('style','width: 32px; height: 32px; display: block; margin-top: -12px; margin-left: 40px;'); break;
                            case 5:oImg.setAttribute('style','width: 32px; height: 32px; display: block; margin-top: -12px; margin-left: 40px;'); break;
                            case 6:oImg.setAttribute('style','width: 32px; height: 32px; display: block; margin-top: -51px; margin-left: 19px;'); break;
                        }
                    }
                    oDiv.appendChild(oImg);
                }

                oDom.appendChild(oDiv);

                // add the items name, pause and repeat status

                //g_Utils.doLog('UpdateQueueTableDisplay', gvar.bDebugOn, 'Create Info Box');
                oDiv = document.createElement('div');
                oDiv_keep2 = oDiv;
                oDiv.setAttribute('style',"float: left; width: 180px; padding-top: 2px;");
                strTemp = '<b>'+gvar.Gift_Queue.list[iGift].GiftName+'</b>';
                if (gvar.Gift_Queue.list[iGift].IsPaused)
                    strTemp += '<br><b><font color="red">Paused</Font><b><br>'
                else
                    strTemp += '<br><b><font color="red"></Font><b><br>';
                if (gvar.Gift_Queue.list[iGift].Repeat == -1)
                    strTemp +='<b>Minimum Inv</b> : '+gvar.Gift_Queue.list[iGift].Floor+'<br><b>Quantity</b> : Infinite</p>'
                else
                    strTemp +='<b>Minimum Inv</b> : '+gvar.Gift_Queue.list[iGift].Floor+'<br><b>Quantity</b> : '+gvar.Gift_Queue.list[iGift].Repeat+'</p>';
                oDiv.innerHTML = strTemp;

                oDom.appendChild(oDiv);

                // add the names of the people being gifted

                //g_Utils.doLog('UpdateQueueTableDisplay', gvar.bDebugOn, 'Create list of recipients');
                oDiv = document.createElement('div');
                oDiv.setAttribute('style',"float: left; width: 350px; padding-top: 2px;");
                    oFont = document.createElement('font');
                    oFont.setAttribute('size',"1");
                    oFont.textContent = unescape(gvar.Gift_Queue.list[iGift].Names);
                oDiv.appendChild(oFont);
                oDom.appendChild(oDiv);

                // add the Pause and Delete Buttons

                    //g_Utils.doLog('UpdateQueueTableDisplay', gvar.bDebugOn, 'Add Pause/Resume Buttons');
                    oDiv = document.createElement('div');
                    oDiv.setAttribute('style',"float: left; width: 75px; padding-top: 2px; ");
                        oSpan = document.createElement('span');
                        oSpan.setAttribute('class',"sexy_button");
                        if (gvar.Gift_Queue.IsPaused)
                            oSpan.setAttribute('style',"width: 75px; margin-top: 2px; ")
                        else
                            oSpan.setAttribute('style',"width: 75px; margin-top: 2px; opacity: 0.25; ");
                        oSpan.id = gvar.strJobButtons;
                            oButton = document.createElement('a');
                            if (gvar.Gift_Queue.list[iGift].IsPaused)
                                oButton.textContent = 'Resume'
                            else
                                oButton.textContent = 'Pause';
                        oSpan.appendChild(oButton);
                        oSpan.addEventListener("click", g_ListenerLib.click_PauseJob(iGift, oDiv_keep1, oDiv_keep2, oButton), false);
                    oDiv.appendChild(oSpan);
                        oSpan = document.createElement('span');
                        oSpan.setAttribute('class',"sexy_button");
                        if (gvar.Gift_Queue.IsPaused)
                            oSpan.setAttribute('style',"width: 75px; margin-top: 2px; ")
                        else
                            oSpan.setAttribute('style',"width: 75px; margin-top: 2px; opacity: 0.25; ");
                        oSpan.id = gvar.strJobButtons;
                            oButton = document.createElement('a');
                            oButton.textContent = 'Delete';
                        oSpan.appendChild(oButton);
                        oSpan.addEventListener("click", g_ListenerLib.click_DeleteJob(iGift, oTr), false);
                    oDiv.appendChild(oSpan);
                oDom.appendChild(oDiv);
            oTr.appendChild(oDom);

            //g_Utils.doLog('UpdateQueueTableDisplay', gvar.bDebugOn, 'Adding line to Table');
            oTbody.appendChild(oTr);
          
            iGiftCount += 1;
        } 

    }
    g_Utils.doLog('UpdateQueueTableDisplay', gvar.bDebugOn, 'Display Updated');
}


function GiftDisplay() {
    var oDom, oDiv, oSnapShot, oButton, oUL, oLi, oTabItem, oTemp, oSpan, oSelect, oOption, oTest;
    var i, strClass;
    var oTable, oTbody, oTr, oTd;
    var oTbody_GC, oTr_GC, oTd_GC, oDiv_GC;
    var oTbody_SP;
    var iRow1, iRow2
    var k;
    var iItemNum
    var strImgStyle;
    var iGCcount;
    var iGCInv;

    oSnapShot = g_Utils.getSnapshot(gvar.strSendGiftButton);

    if (oSnapShot.snapshotLength > 0) {

        g_Utils.doLog('GiftDisplay', gvar.bDebugOn, 'Reset Max Gifts to 50');

        // Reset the recips_ids array
        gvar.recips_ids.length = 0;
        
        //  Reset the Display for total Receipients
        oSpan = document.getElementById('gift_max');
        oSpan.textContent = gvar.gift_recip_max;

        // Fix up Gifts tables, and add extra tab
        g_Utils.doLog('GiftDisplay', gvar.bDebugOn, 'Fix up the Gift Tables');

        //fix up the gift Catagory buttons
        oTemp = g_Utils.getSnapshot(gvar.strGiftCatButtons).snapshotItem(0).parentNode;
        oTemp.setAttribute('style','border-right: 1px solid rgb(153, 153, 153); padding: 3px; width: 90px; vertical-align: top; background-color: rgb(51, 51, 51);');
   		oTemp.innerHTML =   ''
        
        for (var i in gvar.Gift_Tabs) {
	        oButton = document.createElement('a');
	        oButton.setAttribute('class',"sexy_button gift_category_button");
	        oButton.setAttribute('style',"width: 77px;");
	        oButton.textContent = gvar.Gift_Tabs[i].name
	        oButton.addEventListener("click", g_ListenerLib.click_gift_tab_click(i), false);
	        oTemp.appendChild(oButton);
        }

        //erase the existing information
        oTemp = document.getElementById('table_collection').parentNode;
        oTemp.setAttribute('style','padding: 0pt; overflow: auto; width: 640px; height: 500px;');
        oTemp.innerHTML = '';
        
       var oTab_Tbody	=	[];
        
        for (var i in gvar.Gift_Tabs) {
        	oDiv = document.createElement('div')
        	oDiv.setAttribute('id',gvar.Gift_Tabs[i].id);
        	if(i==0) 
        		oDiv.setAttribute('style','display: block')
        	else
        		oDiv.setAttribute('style','display: none');
        	oTable = document.createElement('table');
                oTable.setAttribute('style','margin: 5px; padding: 0px; width: 10px;');
                oTable.setAttribute('cellpadding','0');
                oTable.setAttribute('cellspacing','0');
                    oTbody = document.createElement('tbody');
                    oTbody.innerHTML = '';
                    oTab_Tbody[i] = oTbody;
                oTable.appendChild(oTbody);
            oDiv.appendChild(oTable);
        
			oTemp.appendChild(oDiv);
		}

		var iCount, strImgStyle
		// Build the Collections items
		oTbody = oTab_Tbody[0]
		iCount = 0;
		oTr= document.createElement('tr');
		
		for (var ID in gvar.item_names[0]) {
			
			if (iCount == 0) {
			 	//Style to mark Completed Sets
                strImgStyle = 'text-align: center; height: 35px; color: rgb(102, 102, 102);'
                //Check for incomplete set and use that style
	            if (gvar.item_amounts[3][ID]==0) strImgStyle = 'text-align: center; height: 35px;';
            }
			
		    // Add Loot information
	        oTd = document.createElement('td');
	        oTd.setAttribute('width',"86 px");
	        oDiv = document.createElement('div');
	        oDiv.setAttribute('style','border: 1px solid rgb(51, 51, 51); margin: 1px; overflow: hidden; width: 82px; height: 140px; cursor: pointer;');
	        oDiv.addEventListener("click", g_ListenerLib.click_Item_click(0,ID), false);
	        oDiv.id='item_box_0_'+ (ID);
	        oDom = document.createElement('div');
	        oDom.setAttribute('style',strImgStyle);
	        oDom.textContent = gvar.item_names[0][ID];
	        oDiv.appendChild(oDom);
	        oDom = document.createElement('div');
	        oDom.setAttribute('style',style='margin: 15pt auto; height: 50px; width: 50px;');
	        oImg = document.createElement('img');
	        oImg.setAttribute('style',"width: 50px; height: 50px");
	        oImg.setAttribute('src',gvar.item_imgs[0][ID]);
	        oDom.appendChild(oImg);
	        oDiv.appendChild(oDom);
	        oDom = document.createElement('div');
	        oDom.setAttribute('style',"margin: -7pt auto; text-align: center;");
	        oDom.textContent = 'x'+gvar.item_amounts[0][ID];
	        oDiv.appendChild(oDom);
	        oTd.appendChild(oDiv);
	        oTr.appendChild(oTd);
	        
	        iCount += 1;
	        if (iCount==7) {
		        oTbody.appendChild(oTr);
		        oTr= document.createElement('tr');
		        iCount = 0
	        }
		}
		if (iCount>0) oTbody.appendChild(oTr);
		
		for (var loot_type=0; loot_type<6; loot_type++) {
			
			// Build the Loot items
			oTbody = oTab_Tbody[1+loot_type]
			iCount = 0;
			oTr= document.createElement('tr');
		
			for (var ID in gvar.item_names[1]) {
				switch(loot_type) {
					case 0:
						if (gvar.item_type[1][ID]!=3) continue;
						break;
					case 1:
						if (gvar.item_type[1][ID]!=1) continue;
						break
					case 2:
						if (gvar.item_type[1][ID]!=2) continue;
						break
					case 3:
						if (gvar.item_type[1][ID]!=8) continue;
						break 
					case 4:
						if (gvar.item_type[1][ID]!=13) continue;
						break 
					case 5:
						if ((gvar.item_type[1][ID]==3)||(gvar.item_type[1][ID]==1)||(gvar.item_type[1][ID]==2)||(gvar.item_type[1][ID]==8)||(gvar.item_type[1][ID]==13)) continue;
						break
				}
				
			    // Add Loot information
		        oTd = document.createElement('td');
		        oTd.setAttribute('width',"86 px");
		        oDiv = document.createElement('div');
		        oDiv.setAttribute('style','border: 1px solid rgb(51, 51, 51); margin: 1px; overflow: hidden; width: 82px; height: 140px; cursor: pointer;');
		        oDiv.addEventListener("click", g_ListenerLib.click_Item_click(1,ID), false);
		        oDiv.id='item_box_1_'+ (ID);
		        oDom = document.createElement('div');
		        oDom.setAttribute('style','text-align: center; height: 35px;');
		        oDom.textContent = gvar.item_names[1][ID];
		        oDiv.appendChild(oDom);
		        oDom = document.createElement('div');
		        oDom.setAttribute('style',style='margin: 15pt auto; height: 50px; width: 50px;');
		        oImg = document.createElement('img');
		        oImg.setAttribute('style',"width: 50px; height: 50px");
		        oImg.setAttribute('src',gvar.item_imgs[1][ID]);
		        oImg.setAttribute('title','['+gvar.item_attack[1][ID]+'/'+gvar.item_defense[1][ID]+']');
		        oDom.appendChild(oImg);
		        oDiv.appendChild(oDom);
		        oDom = document.createElement('div');
		        oDom.setAttribute('style',"margin: -7pt auto; text-align: center;");
		        oDom.textContent = 'x'+gvar.item_amounts[1][ID];
		        oDiv.appendChild(oDom);
		        oTd.appendChild(oDiv);
		        oTr.appendChild(oTd);
		        
		        iCount += 1;
		        if (iCount==7) {
			        oTbody.appendChild(oTr);
			        oTr= document.createElement('tr');
			        iCount = 0
		        }
			}
			if (iCount>0) oTbody.appendChild(oTr);
		}
		
		// Build the Boost items
		oTbody = oTab_Tbody[7]
		iCount = 0;
		oTr= document.createElement('tr');
		
		for (var ID in gvar.item_names[2]) {
			
		    // Add Boost information
	        oTd = document.createElement('td');
	        oTd.setAttribute('width',"86 px");
	        oDiv = document.createElement('div');
	        oDiv.setAttribute('style','border: 1px solid rgb(51, 51, 51); margin: 1px; overflow: hidden; width: 82px; height: 140px; cursor: pointer;');
	        oDiv.addEventListener("click", g_ListenerLib.click_Item_click(2,ID), false);
	        oDiv.id='item_box_2_'+ (ID);
	        oDom = document.createElement('div');
	        oDom.setAttribute('style','text-align: center; height: 35px;');
	        oDom.textContent = gvar.item_names[2][ID];
	        oDiv.appendChild(oDom);
	        oDom = document.createElement('div');
	        oDom.setAttribute('style',style='margin: 15pt auto; height: 50px; width: 50px;');
	        oImg = document.createElement('img');
	        oImg.setAttribute('style',"width: 50px; height: 50px");
	        oImg.setAttribute('src',gvar.item_imgs[2][ID]);
	        oDom.appendChild(oImg);
	        oDiv.appendChild(oDom);
	        oDom = document.createElement('div');
	        oDom.setAttribute('style',"margin: -7pt auto; text-align: center;");
	        oDom.textContent = 'x'+gvar.item_amounts[2][ID];
	        oDiv.appendChild(oDom);
	        oTd.appendChild(oDiv);
	        oTr.appendChild(oTd);
	        
	        iCount += 1;
	        if (iCount==7) {
		        oTbody.appendChild(oTr);
		        oTr= document.createElement('tr');
		        iCount = 0
	        }
		}
		if (iCount>0) oTbody.appendChild(oTr);
		
		// Build the Collection Group items
		oTbody = oTab_Tbody[8]
		iCount = 0;
		oTr= document.createElement('tr');
		
		for (var ID in gvar.item_names[3]) {
			
			//Style to mark Completed Sets
            strImgStyle = 'text-align: center; height: 35px; color: rgb(102, 102, 102);'
            //Check for incomplete set and use that style
            if (gvar.item_amounts[3][ID]==0) strImgStyle = 'text-align: center; height: 35px;';
			
		    // Add Collection Group information
	        oTd = document.createElement('td');
	        oTd.setAttribute('width',"86 px");
	        oDiv = document.createElement('div');
	        oDiv.setAttribute('style','border: 1px solid rgb(51, 51, 51); margin: 1px; overflow: hidden; width: 82px; height: 140px; cursor: pointer;');
	        oDiv.addEventListener("click", g_ListenerLib.click_Item_click(3,ID), false);
	        oDiv.id='item_box_3_'+ (ID);
	        oDom = document.createElement('div');
	        oDom.setAttribute('style',strImgStyle);
	        oDom.textContent = gvar.item_names[3][ID];
	        oDiv.appendChild(oDom);
	        oDom = document.createElement('div');
	        oDom.setAttribute('style',style='margin: 15pt auto; height: 50px; width: 50px;');
	        
	        for (j=0;j<7;j++) {
		        oImg = document.createElement('img');
  		        oImg.setAttribute('src',gvar.item_imgs[3][ID][j]);
				switch (j) {
                	case 0:oImg.setAttribute('style','width: 24px; height: 24px; display: block; margin-top:   0px; margin-left: 0px;'); break;
                    case 1:oImg.setAttribute('style','width: 24px; height: 24px; display: block; margin-top: -12px; margin-left: 0px;'); break;
                    case 2:oImg.setAttribute('style','width: 24px; height: 24px; display: block; margin-top: -12px; margin-left: 0px;'); break;
                    case 3:oImg.setAttribute('style','width: 24px; height: 24px; display: block; margin-top: -48px; margin-left: 30px;'); break;
                    case 4:oImg.setAttribute('style','width: 24px; height: 24px; display: block; margin-top: -12px; margin-left: 30px;'); break;
                    case 5:oImg.setAttribute('style','width: 24px; height: 24px; display: block; margin-top: -12px; margin-left: 30px;'); break;
                    case 6:oImg.setAttribute('style','width: 24px; height: 24px; display: block; margin-top: -35px; margin-left: 15px;'); break;
                }   
	        	oDom.appendChild(oImg);
        	}
	        oDiv.appendChild(oDom);
	        
	        oDom = document.createElement('div');
	        oDom.setAttribute('style',"margin: -7pt auto; text-align: center;");
	        oDom.textContent = 'x'+gvar.item_amounts[3][ID];
	        oDiv.appendChild(oDom);
	        oTd.appendChild(oDiv);
	        oTr.appendChild(oTd);
	        
	        iCount += 1;
	        if (iCount==7) {
		        oTbody.appendChild(oTr);
		        oTr= document.createElement('tr');
		        iCount = 0
	        }
		}
		if (iCount>0) oTbody.appendChild(oTr);
		
		//add Special group
		oTbody_SP = oTab_Tbody[9]
		oTr= document.createElement('tr');
		for (var i=1; i<8; i++) {
			oTd = document.createElement('td');
            oTd.setAttribute('width',"86 px");
            oDiv = document.createElement('div');
            oDiv.setAttribute('style','border: 1px solid rgb(51, 51, 51); margin: 1px; overflow: hidden; width: 82px; height: 140px; cursor: pointer;');
            //oDiv.setAttribute('onclick','item_click(4, '+ (i) +');');
            oDiv.addEventListener("click", g_ListenerLib.click_Item_click(4,i), false);
            oDiv.id='item_box_4_'+ (i);
            oDom = document.createElement('div');
            oDom.setAttribute('style',strImgStyle);
            oDom.textContent = gvar.item_names[4][i];
            oDiv.appendChild(oDom);
            oDom = document.createElement('div');
            oDom.setAttribute('style',style='margin: 15pt auto; height: 50px; width: 50px;');
            oImg = document.createElement('img');
            oImg.setAttribute('style',"width: 50px; height: 50px");
            oImg.setAttribute('src',gvar.item_imgs[4][i]);
            oDom.appendChild(oImg);
            oDiv.appendChild(oDom);
            oDom = document.createElement('div');
            oDom.setAttribute('style',"margin: -7pt auto; text-align: center;");
            oDom.textContent = '';
            oDiv.appendChild(oDom);
            oTd.appendChild(oDiv);
            oTr.appendChild(oTd);
      	}
      	oTbody_SP.appendChild(oTr);

        // Fix up the Select Mafia table
        g_Utils.doLog('GiftDisplay', gvar.bDebugOn, 'Fix up the Select Mafia Table');

        if (document.getElementById('gift_count_avail') != null ) {
	        // new menus
	        
   	        // remove extra stuff
   	        oDom = document.getElementById('gift_err_msg').parentNode;
	        for (var i=0; i<8; i++) oDom.removeChild(oDom.childNodes[0])
	        
	        
	        oDom = document.getElementById('gift_send_hint')
	        oDiv = oDom.parentNode;
	        oDiv.setAttribute('style','');
	        oDiv.innerHTML = '<div style="float: right;"><span id="selected_total">0</span> Mafia Selected</div>Select Mafia (Up to <span id="gift_max">20</span>)'
	        oDom  = oDiv.parentNode;
	        oDom.parentNode.setAttribute('style','')
	        oDom.setAttribute('style','float: right; margin-right: 0px;')
	        
	        oDiv = oDom.childNodes[3].childNodes[0]
	        oDiv.setAttribute('style','font-size: 12px; margin: 5px 0pt 0pt; color: rgb(102, 102, 102); width: 638px; border-width: 1px 1px medium; border-style: solid solid none; border-color: rgb(153, 153, 153) rgb(153, 153, 153) -moz-use-text-color;');
	        
	        oDiv = oDom.childNodes[7]
	        oDiv.setAttribute('style','width: 638px; border-right: 1px solid rgb(153, 153, 153); border-width: medium 1px 1px; border-style: none solid solid; border-color: -moz-use-text-color rgb(153, 153, 153) rgb(153, 153, 153); height: 100px; overflow: auto; font-size: 12px;');
	        
	        oDiv = oDom.childNodes[5]
            oDiv.setAttribute('style','border: 1px solid rgb(153, 153, 153); overflow: auto; width: 638px; height: 150px;');
            
            oDiv = oDom.childNodes[5].childNodes[1]
            oDiv.setAttribute('style','');

            // put the recepients into a table

	        oTable = document.createElement('table');
	        oTable.setAttribute('cellspacing','0');
	        oTable.setAttribute('cellpadding','0');
	        oTable.setAttribute('style','border: 1px solid rgb(153, 153, 153); margin: 10px 0pt;');
	            oTbody = document.createElement('tbody');
	                oTr = document.createElement('tr');
	                    oTd = document.createElement('td');
	                    oTd.setAttribute('style','border-right: 1px solid rgb(153, 153, 153); padding: 3px; width: 90px; vertical-align: top; background-color: rgb(51, 51, 51);');
	                        oButton = document.createElement('a');
	                        oButton.setAttribute('class','sexy_button gift_category_button');
	                        oButton.setAttribute('style','width: 77px;');
	                        oButton.textContent = 'Clear';
	                        oButton.addEventListener("click", g_ListenerLib.click_ClearRecipients_new, false);
	                    oTd.appendChild(oButton);
	                oTr.appendChild(oTd);
	                    oTd = document.createElement('td');
	                    for(var w=2; w<8; w++) { oTd.appendChild(oDom.childNodes[2]) };
	                oTr.appendChild(oTd);
	            oTbody.appendChild(oTr);
	        oTable.appendChild(oTbody);
	               
	        oDom.insertBefore(oTable,oDom.childNodes[3]);
	        
	        //Add Title attributes to recepients
	        oTemp = g_Utils.getSnapshot("//div[contains(@id,'recipient_')]")
	        for (var i=0; i<oTemp.snapshotLength; i++) {
		        // add a title to the name
		        var snuid = oTemp.snapshotItem(i).id.split('_')[1];
		        oTemp.snapshotItem(i).setAttribute('title',snuid)
		        oTemp.snapshotItem(i).childNodes[1].setAttribute('onclick','');
		        oTemp.snapshotItem(i).addEventListener("click", g_ListenerLib.click_Recip_check_new(snuid), false);
		        
		    }
		    
		    // Delete Gift Button
	        g_Utils.doLog('GiftDisplay', gvar.bDebugOn, 'Delete Gift Button and Repalce with new Queue button');
	
	        oDom 	= oSnapShot.snapshotItem(0);
	        oSpan 	= oDom.parentNode;
	        oButton = oSpan.parentNode;
	        oDiv 	= oButton.parentNode;
	        oDiv.setAttribute('style','float: right; margin: 10px 0pt;');
	        oSpan.removeChild(oDom);
	        oButton.removeChild(oSpan);
	        oDiv.removeChild(oButton);
	
	        // Replace with new Queue Button
	        oButton = document.createElement('a');
	        oButton.setAttribute('class','sexy_button_new short_white sexy_send_gift_new');
	        if (gvar.Gift_Queue.IsPaused)
	            oButton.setAttribute('style','margin-right:5px;')
	        else
	            oButton.setAttribute('style','margin-right:5px; opacity: 0.25');
	        
	        oButton.id = gvar.strQueueButton;
	        oButton.addEventListener("click", g_ListenerLib.click_QueueGift, false);
	        	oSpan = document.createElement('span'); 
	            	oDom = document.createElement('span');
	            	oDom.textContent = 'Queue Gift';
	        	oSpan.appendChild(oDom);
	        oButton.appendChild(oSpan);
	        oDiv.appendChild(oButton);
	
	        // Minimum Inventory
	        g_Utils.doLog('GiftDisplay', gvar.bDebugOn, 'Set Minimum Inventory');
			oButton = document.createElement('a');
	        oButton.setAttribute('class','sexy_button_new short_white');
	        oButton.setAttribute('style','margin-right:5px;')
	        	oSpan = document.createElement('span'); 
			        oDom = document.createElement('span');
			        oDom.setAttribute('style','margin-top: -2px;');
			        oDom.textContent = 'Minimum Inventory: ';
				        oSelect = document.createElement('select');
				        oSelect.id = gvar.strMinimumInventory;
				        for (var i =0;i<1000;i++){
				            oOption = document.createElement('option');
				            oOption.setAttribute('value',i);
				            oOption.textContent = i;
				            oSelect.appendChild(oOption);
				        }
				        oSelect.value =0;
				
			        oDom.appendChild(oSelect);
	           	oSpan.appendChild(oDom);
	        oButton.appendChild(oSpan);
	        oDiv.appendChild(oButton);
	        
	        
	        // Repeat Button
	        g_Utils.doLog('GiftDisplay', gvar.bDebugOn, 'Add repeat Button');
			oButton = document.createElement('a');
	        oButton.setAttribute('class','sexy_button_new short_white');
	        oButton.setAttribute('style','margin-right:5px;')
	        	oSpan = document.createElement('span'); 
			        oDom = document.createElement('span');
			        oDom.setAttribute('style','margin-top: -2px;');
	
			        oDom.textContent = 'Quantity: ';
				        oSelect = document.createElement('select');
				        oSelect.id = gvar.strRepeatGift;
				        //Infinite Button
				            oOption = document.createElement('option');
				            oOption.setAttribute('value',-1);
				            oOption.textContent = 'infinite';
				            oSelect.appendChild(oOption);
				        // the rest of the buttons
				        for (var i =1;i<1000;i++){
				            oOption = document.createElement('option');
				            oOption.setAttribute('value',i);
				            oOption.textContent = i;
				            oSelect.appendChild(oOption);
				        }
				        oSelect.value =1;
			        oDom.appendChild(oSelect);
	           	oSpan.appendChild(oDom);
	        oButton.appendChild(oSpan);
	        oDiv.appendChild(oButton);
	        
        } else {
	        // old menus
	        
	        oDom = document.getElementById('gift_max')
	        oDom.previousSibling.previousSibling.setAttribute('style','float: right; margin-right: -75px;');
        	oDiv = oDom.nextSibling.nextSibling;
            oDiv.setAttribute('style','border: 1px solid rgb(153, 153, 153); overflow: auto; width: 638px; height: 150px;');
	        
            // put the recepients into a table

		    oTable = document.createElement('table');
		    oTable.setAttribute('cellspacing','0');
		    oTable.setAttribute('cellpadding','0');
		    oTable.setAttribute('style','border: 1px solid rgb(153, 153, 153); margin: 10px 0pt;');
		        oTbody = document.createElement('tbody');
		            oTr = document.createElement('tr');
		                oTd = document.createElement('td');
		                oTd.setAttribute('style','border-right: 1px solid rgb(153, 153, 153); padding: 3px; width: 90px; vertical-align: top; background-color: rgb(51, 51, 51);');
		                    oButton = document.createElement('a');
		                    oButton.setAttribute('class','sexy_button gift_category_button');
		                    oButton.setAttribute('style','width: 77px;');
		                    oButton.textContent = 'Clear';
		                    oButton.addEventListener("click", g_ListenerLib.click_ClearRecipients_old, false);
		                oTd.appendChild(oButton);
		            oTr.appendChild(oTd);
		                oTd = document.createElement('td');
		                oTd.appendChild(oDiv);
		            oTr.appendChild(oTd);
		        oTbody.appendChild(oTr);
		    oTable.appendChild(oTbody);
		           
		    oDom.parentNode.insertBefore(oTable,oDom.nextSibling.nextSibling);
		    
		    //Add Title attributes to recepients
	        oTemp = g_Utils.getSnapshot("//div[contains(@id,'recipient_')]")
	        for (var i=0; i<oTemp.snapshotLength; i++) {
		        // add a title to the name
		        var snuid = oTemp.snapshotItem(i).id.split('_')[1];
		        oTemp.snapshotItem(i).setAttribute('title',snuid)
		        oTemp.snapshotItem(i).childNodes[1].setAttribute('onclick','');
		        oTemp.snapshotItem(i).addEventListener("click", g_ListenerLib.click_Recip_check_old(snuid), false);
		        
		    }
		    
		    // Delete Gift Button
	        g_Utils.doLog('GiftDisplay', gvar.bDebugOn, 'Delete Gift Button and Repalce with new Queue button');
	
	        oDom 	= oSnapShot.snapshotItem(0);
	        oSpan 	= oDom.parentNode;
	        oButton = oSpan.parentNode;
	        oDiv 	= oButton.parentNode;
	        oDiv.setAttribute('style','float: right; margin: 10px -65pt;');
	        oSpan.removeChild(oDom);
	        oButton.removeChild(oSpan);
	        oDiv.removeChild(oButton);
	
	        // Replace with new Queue Button
	        oButton = document.createElement('a');
	        oButton.setAttribute('class','sexy_button_new short_white sexy_send_gift_new');
	        if (gvar.Gift_Queue.IsPaused)
	            oButton.setAttribute('style','margin-right:5px;')
	        else
	            oButton.setAttribute('style','margin-right:5px; opacity: 0.25');
	        
	        oButton.id = gvar.strQueueButton;
	        oButton.addEventListener("click", g_ListenerLib.click_QueueGift, false);
	        	oSpan = document.createElement('span'); 
	            	oDom = document.createElement('span');
	            	oDom.textContent = 'Queue Gift';
	        	oSpan.appendChild(oDom);
	        oButton.appendChild(oSpan);
	        oDiv.appendChild(oButton);
	
	        // Minimum Inventory
	        g_Utils.doLog('GiftDisplay', gvar.bDebugOn, 'Set Minimum Inventory');
			oButton = document.createElement('a');
	        oButton.setAttribute('class','sexy_button_new short_white');
	        oButton.setAttribute('style','margin-right:5px;')
	        	oSpan = document.createElement('span'); 
			        oDom = document.createElement('span');
			        oDom.setAttribute('style','margin-top: -2px;');
			        oDom.textContent = 'Minimum Inventory: ';
				        oSelect = document.createElement('select');
				        oSelect.id = gvar.strMinimumInventory;
				        for (var i =0;i<1000;i++){
				            oOption = document.createElement('option');
				            oOption.setAttribute('value',i);
				            oOption.textContent = i;
				            oSelect.appendChild(oOption);
				        }
				        oSelect.value =0;
				
			        oDom.appendChild(oSelect);
	           	oSpan.appendChild(oDom);
	        oButton.appendChild(oSpan);
	        oDiv.appendChild(oButton);
	        
	        
	        // Repeat Button
	        g_Utils.doLog('GiftDisplay', gvar.bDebugOn, 'Add repeat Button');
			oButton = document.createElement('a');
	        oButton.setAttribute('class','sexy_button_new short_white');
	        oButton.setAttribute('style','margin-right:5px;')
	        	oSpan = document.createElement('span'); 
			        oDom = document.createElement('span');
			        oDom.setAttribute('style','margin-top: -2px;');
	
			        oDom.textContent = 'Quantity: ';
				        oSelect = document.createElement('select');
				        oSelect.id = strRepeatGift;
				        //Infinite Button
				            oOption = document.createElement('option');
				            oOption.setAttribute('value',-1);
				            oOption.textContent = 'infinite';
				            oSelect.appendChild(oOption);
				        // the rest of the buttons
				        for (var i =1;i<1000;i++){
				            oOption = document.createElement('option');
				            oOption.setAttribute('value',i);
				            oOption.textContent = i;
				            oSelect.appendChild(oOption);
				        }
				        oSelect.value =1;
			        oDom.appendChild(oSelect);
	           	oSpan.appendChild(oDom);
	        oButton.appendChild(oSpan);
	        oDiv.appendChild(oButton);
            
        }
        
    }

    GM_log('Display has been fixed up');
}



function createDropDownList(_oTr, _iPar, _strName, _strOptions, _strValues, _strTitle) {
    var oTd, oSelect, oOption;
    var aOptions = new Array();
    var aValues = new Array();

    aOptions = _strOptions.split(';');
    aValues = _strValues.split(';');

    oTd = document.createElement('td');
    oTd.setAttribute('style',"width: 285px; text-align: right;");
    oTd.textContent = _strName+":";

    _oTr.appendChild(oTd);

    oTd = document.createElement('td');
    oTd.setAttribute('style',"width: 100px;");
    oTd.setAttribute('title',_strTitle);
        oSelect 		= document.createElement('select');
        oSelect.name	= "MWAQ-Para-"+_iPar;
        oSelect.id		= "MWAQ-Para-"+_iPar;
        oSelect.setAttribute('style',"width: 100px;");
        
            for (var i=0;i<aOptions.length;i++) {
                oOption = document.createElement('option');
                oOption.value = aValues[i];
                oOption.textContent = aOptions[i];
                oSelect.appendChild(oOption);
            }
    oTd.appendChild(oSelect);
    _oTr.appendChild(oTd);
}

function ClearJobStatus(){

    var oTd

    oTd = document.getElementById(gvar.strCurrentJob);
    if (oTd != null) {
        if (gvar.Gift_Queue.IsPaused ){
            oTd.innerHTML = '<b>Status</b> : Stopped'
        } else {
            oTd.innerHTML = '<b>Status</b> : Idle'
        }
    } else {
        g_Utils.doLog('Gift.ClearJobStatus', gvar.bDebugOn, 'No Status line');
    }
}

function UpdateJobStatus(_strMessage){

    var oTd

    clearTimeout(iJobStatus);

    oTd = document.getElementById(gvar.strCurrentJob);
    if (oTd != null) {
        oTd.innerHTML = '<b>Status</b> : ' + _strMessage
            iJobStatus = setTimeout(function (e) {
                ClearJobStatus();
            }, 2000);
    } else {
        g_Utils.doLog('Gift.UpdateJobStatus', gvar.bDebugOn, 'No Status line');
    }
}

// Initialization of Variables

function Initialize(){
	gvar.bInitialized = true;
	if (gvar.strFrameId = 'MafiaWars') {
		// Mafia Wars Initialization
		
		g_Utils.doLog('Initialize', gvar.bDebugOn, 'Init Values');
		
		// Logos

		gvar.imgLogo = 'data:image/gif;base64,'+
		    '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcG'+
		    'BwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwM'+
		    'DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAyADIDASIA'+
		    'AhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA'+
		    'AAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3'+
		    'ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm'+
		    'p6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA'+
		    'AwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx'+
		    'BhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK'+
		    'U1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3'+
		    'uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+f+tf'+
		    'Q/AGveJ/Dmt6zpmiatqOkeGoYrjV722tJJrfSopZkgjknkUFYkeaSONWcgF5EUcsAcivT/2Vf2oN'+
		    'V/Zf8c6heW1umreHfE+m3GgeJtGlcxxa3pdzGYri3LjmNyjEpIvzRyKjjlRQBwfgrwZq3xH8YaV4'+
		    'e0HTrvV9c1y7isNPsbWMyT3k8rhI4kUcszMwAA6k1t/DL4E+LPi98bdI+HWhaPPceMdb1RdGt9Pm'+
		    'dbZlujJ5ZSRpCqRBWzvaQqqBWLEAEj6T8Rf8E8p/gN4u8CfELRfjT8MtB8E60LXxJoeta5feRrOl'+
		    'xCXK/aNHEclzNLE6EN9miuIHK8OVavT/AINf8E0dN8N/Ej4man4T+P3gnxx8QtH0LUW8HeGIdP1b'+
		    'w94p8RXl1C0cbmy1a1tW3/ZppZlS1a5JkVVzs3SKAfnrqNhLpWoT2s4VZ7aRopArq6hlODhlJBGR'+
		    '1BINQ16N8Uv2Qviz8EPDKa745+GXxC8G6LLe/wBnjUde8O3mn2zXOCxhEk0aqZNoJ2AlsAnFVv2j'+
		    '9O+HOifEY6f8L77xHrHh3T7WK2m1TWGRW1e7RcT3UEQijaC2kYbo4ZQ0iKQruzAkgHBUUUUAdd8C'+
		    'vgX4p/aV+K2jeCPBWltrXifxBOLawsllSJriQ/wguQvvyeACegNdL8Lf2Y9Y134z6/4f1u0WKy+H'+
		    '73dx4re2vIZktILLzDcLHLGzRyMxiaNGjLKzMhBIOa8sr3T/AIJx/BTxh8fP2tPDXh3wfoeu6+96'+
		    'zw6xa6VZSXk76XIhivB5aAkhoHkXJ4BIJIAJAB7J/wAEpvE938Zv+Ch1p491t45tY8PeXqOkqUDx'+
		    'afLCyC2WFGyFSCNNsYH3Ni4wQCPqP/g40+Jd98cPhr4E8T65LJc+K/DN79ms9SIAuY7ZwzNGZB8x'+
		    'USbGUE/K24jG5s+F/wDBNn9n3X/2Rv8Agqc/wi8f2q+HvEOuRy6Zoc+o/wChW+pz+aVgeOSXaNkw'+
		    'SZEBIJlxEQJMqPRv+DgrR9V+Hfi7w18L9Ttnk8cXzw3MWk2rLPc+VKxWPdHGSyu7qgRCAzZyARjI'+
		    'B8t/tl/Gv4iftk/sx/DT4h6/qep+IbPwxBJ4V1qWSV5vst7A26GZwSdomt5ovmGAZVmzgsoPytX1'+
		    'T+1b8G/if+x9+zF8OvDtyl/pnhXxRb3N/q89pzBNqsrsktjLMhKl4raKBTEWBBMpK4OT4l4z/aP8'+
		    'S+Pfgn4S8AaiuiHQPBTXDaY0GkW1vdgTyGVxLOiCSb52YhpCzYbbuKqiqAcHRRRQBY0ie2ttVtZb'+
		    '23ku7OOVGngjl8l5owwLIHw20kZAbBxnOD0r0LVfHvhzx98bbq10hb34T/DPxRf2dne2MF7caoun'+
		    '6fG8aiW4KhTeSoFMzERqHl3FI4wVRfNaKAP0Y/ZP/bw8HfFz9k34h/Cz9oqa+1X4MeDrBYPBPiFf'+
		    'DlrqHijTrp7lEtrOHc8amY2yySeaZkdIrIwmV4dkB6b/AIJnfArW/wBij9o3w3rej6N4K+Nng/44'+
		    '6Q9l4Q1TSvG+m+EfELqbwW7GxGqmNhchxJbzWyqwZtyCXCkn87r74y6ne/AvTPh8tppVvo+na5da'+
		    '+1xFblb29nmgt4FSaQk7o4kgYxqANpuJyS24bfQfiD4R1XVv2Afhl4vuGll0/TfF2v8Aha2c7sQq'+
		    'kGm3wjHYDfdzv65duvYA7n9tz4DWP7LX7Qdt488Eaz4e+J3w/n1qC9ja6a21GG1vkPnPpOrwQzSx'+
		    'iYFZUZRI0UypK0LvHh6+dfif4k0jxh8Q9Z1XQNAi8LaNqF089npEd090mnRsciISv8zgdiea65Ln'+
		    'wJpfjT4e6nqOqa/4h8PayLW/8daXDKyX8MiXsqXUCSuqI7ywIJo3BYL9qCs25WrmvjNo/hfw98WP'+
		    'EVj4K1i78QeErS/li0jUrq3a3mvrYMRHK8bBShZcHBAI9BQBzNFFFABRRRQAVpy+Ntam8GweHH1f'+
		    'VH8PW17JqUOltdSGyiupI0jkuFhzsErJFGjOBuKxoCcKACigDMooooAKKKKAP//Z';

		gvar.imgCloseButton = 'data:image/png;base64,'+
		    'iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAL'+
		    'EwAACxMBAJqcGAAAA2lJREFUOMu9VF9oW1UY/917zv3XJC7p0j4YFTTS2RJwrBAGe9hgT0P6KlTX'+
		    '+DBh6WAi00otDhZlXcKwBspo+9i8+DSHvraQMlYznViVjuYhbWY3blNzk9zk3mubP/deH0buGoJu'+
		    'E/SDD8453+/8zvedc74f8B8Y8zTAuXNnjxeLlUy1quPQITf6+nzs0TePvHrxg8tbz0WamJ4KLqd/'+
		    'zDWbLbAsC4ZhwLKsE7csC5SyOH0qTD759Kr1j6Tl4n3mw0tfvLb9sJAjhIBSCkopCCEghDg40zRh'+
		    'miZarRYCL/qHk1/Gai/0vp5rx8lB0sJuJbj9sJDjOA6iKEIURfA8D57n0T6EEAKO45y5pv15/s7q'+
		    'D1+vrf32qM3j1HQ9/lnP79s7OUEQIEmSQ0gpBcMwYJjHRbXHlFLwPA9RFFFUqpmvZmLHuzK1wTUI'+
		    'oRBFEYIgoF6vIxwOY3BwECsrK8jn81AUBW63GyMjI9B1HYZhgGVZsCyL/AP5/Ww2G3MyTc5ccds2'+
		    'IAgCbNvG7u4uNjc3kclkMDo6WolGo7BtG5IkIZFIYGhoCEtLS5BlGfV63bnzuRvXRCfTQOAl6Mb+'+
		    'ZcuyUCwWUSqVYFkWFEXB1taWNDU1hWw2i0gkgmAwiEgkgr29Pei6jmazCUEQwPM8Go3mt3fv3pMp'+
		    'ABQVtW6aJsrlMnRd7/gey8vLWFxcRDwerwDA2NiYr1arOXFVVfE4sQBUVbsHgGEBoNFoQlVVGIbh'+
		    'lHLQ0+k0PB6PD4BvZ2enK65pGiqVCpot68nrM4wNTdOcRzrofr8fs7OzmJ+fhyzLSKVSXRhBEKDr'+
		    'OjhKnpD2+b3HKKWQJKnLk8kkCoUCUqkUpqenEQgEMDk52YXjOA79/d6TAEABIBwO/bp+P4eenp6O'+
		    'dhwfH8fAwACi0ShcLhdkWcbc3BwmJiawsbGB1dXVjvs/dvSN7502fZS/I7z97sS+1+sDx3EOKBQK'+
		    'wTAM5PP5js2hUAgAsL6+7qxRSnDz5jdMR+8nZ65wK7d/abhcrn8ld2+dOeF95+yFapegfPzRRY9a'+
		    '3asdFI9nsYWFhQ4e2iF5iet2PH71sFLSS+1ef5q98nL/8DPp6Xe3Frmf1nINy7L/lowQFrHY58xz'+
		    'K//t9C32wfYf4XJZy+jGPtwuEb29nuHIe+d/xv9tfwFATFKTqjXpOQAAAABJRU5ErkJggg==';
		
		// Names of DOM elements
		gvar.strMinimumInventory	= 'MWAQ-MinimumInventory';
		gvar.strRepeatGift      	= 'MWAQ-RepeatGift';
		gvar.strQueueTable      	= 'MWAQ-QueueTable';
		gvar.strQueueDiv        	= 'MWAQ-QueueDiv';
		gvar.strJobButtons      	= 'MWAQ-JobButton';
		gvar.strStartButton     	= 'MWAQ-StartButton';
		gvar.strStopButton      	= 'MWAQ-StopButton';
		gvar.strCheckUpdates    	= 'MWAQ=CheckUpdates';
		gvar.strCurrentJob      	= 'MWAQ-CurrentJob';
		gvar.strQueueButton     	= 'MWAQ-QueueButton';
		gvar.strLogo            	= 'MWAQ-Logo';
		gvar.strTableRow        	= 'MWAQ-TableRow';
		gvar.strSettings        	= 'MWAQ-Setting';
		gvar.strDataBaseName    	= 'MWAQ-QueuedGifts';
			
			// XPath statement to find DOM elements
		gvar.strGiftPage			= '//a[contains(text(),"Gifting")] | //a[contains(text(),"Trading")]';
		gvar.strSendGiftButton		= '//button[contains(@class,"sexy_button_new")]/span/span[contains(text(),"Send Gift")]';
		//							  First is for Firefox, and the second for Chrome.
		gvar.strGiftSelected    	= '//div[contains(@style,"border: 1px solid rgb(255, 255, 0)")] | //div[contains(@style,"border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(255, 255, 0); border-right-color: rgb(255, 255, 0); border-bottom-color: rgb(255, 255, 0); border-left-color: rgb(255, 255, 0)")]';
		gvar.strRecpSelected    	= 'selected_total';
		gvar.strCheckedIds      	= '//input[contains(@id,"cb_recip")]';
		gvar.strMessageBody      	= '<td class="message_body">';
		gvar.strGiftSent         	= 'You gave a';
		gvar.strQuantity         	= '<div style="text-align: center;height:35px; ">';
		gvar.strFindJobButtons   	= '//span[contains(@id,"'+gvar.strJobButtons+'")]';
		gvar.strGiftCatButtons   	= '//a[contains(@class,"gift_category_button")]';
		gvar.strGiftItems        	= '//div[contains(@id,"item_box_")]';
		gvar.strXwSig				= '//script[contains(text(),"var local_xw_sig =")]';
		
		// Gift names and catagories
		
		// name - name of collection
		// id   - tab id in display
		// key  - type of gift
		gvar.Gift_Tabs = {
			0:{name:'Collections',			id:'table_collection',			key:0},
			1:{name:'Vehicles',				id:'table_loot_vehicles',		key:1},
			2:{name:'Weapons',				id:'table_loot_weapons',		key:1},
			3:{name:'Armor',				id:'table_loot_armor',			key:1},
			4:{name:'Animals',				id:'table_loot_animals',		key:1},
			5:{name:'Henchman',				id:'table_loot_henchman',		key:1},
			6:{name:'Other',				id:'table_loot_other',			key:1},
			7:{name:'Boosts',				id:'table_expendables',			key:2},
			8:{name:'Collection Groups',	id:'table_collection_groups',	key:3},
			9:{name:'Special',				id:'table_special',				key:4}
		}	
		
		gvar.collection_names = {
		    1001:"Cigars",1008:"Rings",1015:"Paintings",1022:"Sculptures",1029:"Poker Chips",1036:"Diamond Flush",1043:"Heart Flush",1050:"Club Flush",1057:"Spade Flush",1064:"Tie Collection",1071:"Cufflinks",1078:"Great Race Horses",1085:"Boxing",1092:"Billards",1099:"Barber", 1106:"Casino",1113:"Dirty Money",1120:"Unlisted",1127:"Unlisted",
		    2001:"Run Drinks",2008:"Tropical Fruits",2015:"Entertainers",2022:"Tropical Fish",2029:"Beards",2036:"Unlisted",2043:"Unlisted",2050:"Unlisted",
		    3001:"Prison Tattoos",3008:"Matryoshka Dolls",3015:"Russian Leaders",3022:"Vodka Drinks",3029:"Soviet Memorabilia",3036:"Fabergé Egg",3043:"Unlisted",3050:"Unlisted",
		    4001:"Chess Set",4008:"Masks",4015:"Spices",4022:"Carvings",4029:"Orchids",4036:"Unlisted",4043:"Unlisted",4050:"Unlisted",
		    5001:"Unlisted",5008:"Unlisted",5015:"Unlisted",5022:"Unlisted",5029:"Unlisted",5036:"Cactus",5043:"Mojave",5050:"Poker",5057:"Matchbook",
		    6001:"Dinner Is Served", 6008:"Roman Standards", 6015:"The Great Inventor" ,6022:"Famous Rulers",6029:"Unlisted",6036:"Unlisted",6043:"Unlisted",6050:"Unlisted",
		    7001:"Beaches", 7008:"Musical Instruments", 7015:"Amazonian Plants" ,7022:"Drinks",7029:"Head Dresses",6036:"Unlisted",6043:"Unlisted",6050:"Unlisted",
		    
			8001:"Car Bonnets Collection", 8008:"Stickpins Collection ", 8015:"Sharp Dressers Collection",
		    100001:"Valentines Day",100008:"St Paticks",100015:"Easter Egg",100022:"Global Cup",100029:"The Slots",100036:"Don Romo",100043:"Unlisted",
		    200001:"Unlisted",200008:"Unlisted",200015:"Unlisted",200022:"Unlisted",200029:"Unlisted",200036:"Unlisted",
		    300001:"Prototype Carjacking",300008:"Theft of a Drone",300015:"Weapons",300022:"Bring Back the Pack",300029:"Unlisted",300036:"Unlisted",
		    400001:"Chinese New Years",400008:"Mystery Bag",400015:"Super Hero",400022:"Unlisted",400029:"Unlisted",400036:"Unlisted",
		    500001:"Tool of the Trade",500008:"Stolen Diamond",500015:"Unlisted",500022:"Unlisted",500029:"Unlisted",500036:"Unlisted",
		    705001:"Pantheon Trophies",705008:"Continental Rings",705015:"Championship Belts",705022:"Unlisted",705029:"Unlisted",705036:"Unlisted",
		    800001:"Missions",800008:"Unlisted",800015:"Unlisted",800022:"Unlisted",800029:"Unlisted",800036:"Unlisted"
		    
		    }
		    
		gvar.special_names = {
			1:"All Collections", 2:"All Loot", 3:"All Boosts", 4:"Everything", 5:"Top Attack", 6:"Top Defense", 7:"Top Combined" 
			}
		    
		gvar.special_imgs = {
			1:"http://mwfb.static.zynga.com/mwfb/graphics/collections/standard/standard_75x75_collect_rings_diamond_01.gif",
			2:"http://mwfb.static.zynga.com/mwfb/graphics/item_22_pistol.gif",
			3:"http://mwfb.static.zynga.com/mwfb/graphics/boosts/boost_hotcoffee_75x75_01.gif",
			4:"http://s3.amazonaws.com/uso_ss/9084/large.gif?1277485256",
			5:"http://s3.amazonaws.com/uso_ss/12839/large.png?1293111234",
			6:"http://s3.amazonaws.com/uso_ss/12840/large.png?1293111251",
			7:"http://s3.amazonaws.com/uso_ss/12841/large.png?1293111277"
			}
		
		// Gift variable
		gvar.recips_ids				= [];
		gvar.gift_recip_max			= 50;
		gvar.gift_key				= '';
		gvar.max_gift_amount		= 1,
		gvar.total_checked 			= 0,
		gvar.gifts_daily_left   	= 0;
			
		// collection inventory database
		gvar.item_names     = {};
		gvar.item_imgs      = {};
		gvar.item_amounts	= {};
		gvar.item_attack 	= {};
		gvar.item_defense 	= {};
		gvar.item_type	 	= {};

		// 0 - Collections
		// 1 - Loot
		// 2 - Boosts
		// 3 - Collection Groups
		// 4 - Special Groups
		
		for (var i=0; i<5; i++ ) {
		    gvar.item_names[i]      = {};
		    gvar.item_imgs[i]       = {};
		    gvar.item_amounts[i]    = {};
		    gvar.item_attack[i]     = {};
		    gvar.item_defense[i]    = {};
		    gvar.item_type[i]		= {};
		}
		
		gvar.item_names[3] = gvar.collection_names;
		gvar.item_names[4] = gvar.special_names;
		gvar.item_imgs[4]  = gvar.special_imgs;
		
		//Top Items
		gvar.Top_attack		= {0:0,1:0,2:0,3:0};
		gvar.Top_defense	= {0:0,1:0,2:0,3:0};
		gvar.Top_combined	= {0:0,1:0,2:0,3:0};
		
		// User names and Ids
		gvar.groups_levels	= {};
		
		// Queue related Variabled
		gvar.Gift_Queue 			= { "list":null, "paused": true, "Params": [5, 10, 30]}
		gvar.iGiftCurrent			= 0;
		gvar.bUpdatingInventory		= false;
		
		
	    //get Mafia Wars related constants
	    oSnapShot = g_Utils.getSnapshot(gvar.strXwSig)
		if (oSnapShot.snapshotLength != 0) {
			strTemp = oSnapShot.snapshotItem(0).text
			i1 = strTemp.indexOf("var local_xw_sig =")
			i1 = strTemp.indexOf("'",i1)+1
			i2 = strTemp.indexOf("'",i1)
			gvar.local_xw_sig  = strTemp.slice(i1,i2)
			GM_log('gvar.local_xw_sig = '+gvar.local_xw_sig);
		} else {
			GM_log('nana')
		}
    	g_MWUtils.getUserId();
    	GM_log('gvar.FB_user_id = '+ gvar.FB_user_id);
    	g_MWUtils.getGiftKey();
    	
    	//get Save Set
        gvar.strSaveSet = GM_getValue(gvar.FB_user_id+'-strSaveSet','A');
        GM_setValue(gvar.FB_user_id+'-strSaveSet',gvar.strSaveSet);

        //Update the Inventory
        //Load the collection inventory, and then repeat every hour
        Iventory_update();
        setInterval(Iventory_update,60*60*1000);
        
        //load the Gift Queue
        gvar.Gift_Queue.list = [];
        Load_Gift_Queue();
		Load_Gift_Parameters();
		
		// Set up Event handling
        gvar.EventSpan 			= document.createElement('span');
        gvar.EventSpan.addEventListener("MWAQ-SendGift", function(evt) {Send_Gift_Queue()}, false);
        gvar.ActionSendGift   	= document.createEvent("Events"); gvar.ActionSendGift.initEvent("MWAQ-SendGift", false, false);
        
	    
	} else {
		// FaceBook Initialization
		
		// Nothing in here.
		
	}
}

/**** DOM Notify and Change Code ****/

function notifyChange() {
    if (gvar.notify_count == gvar.change_count) MainLoop();
    if (gvar.notify_count != gvar.change_count) {
        schedNotify();
        return;
    }
    gvar.scheduled = false;
};

function schedNotify() {
    gvar.scheduled = true;
    gvar.notify_count = gvar.change_count;
    gvar.iOnloadEvent = setTimeout(function (_obj) {
        notifyChange();
    },
    250);
};

function ListenerLib() {
    this.click_QueueGift            = click_QueueGift;
    this.click_StartQueue           = click_StartQueue;
    this.click_DeleteJob            = click_DeleteJob;
    this.click_PauseJob             = click_PauseJob;
    this.click_Setting              = click_Setting;
    this.click_SettingsApply        = click_SettingsApply;
    this.click_SettingsDefault      = click_SettingsDefault;
    this.click_ClearRecipients_old  = click_ClearRecipients_old;
    this.click_ClearRecipients_new  = click_ClearRecipients_new;
    this.click_Item_click			= click_Item_click;
    this.click_gift_tab_click		= click_gift_tab_click;
    this.click_Recip_check_old		= click_Recip_check_old;
    this.click_Recip_check_new		= click_Recip_check_new;
    this.click_Rem_sel_friend		= click_Rem_sel_friend;
    this.menu_Reset                 = menu_Reset;
    this.menu_Debug                 = menu_Debug;

    // handles Click

    function click_QueueGift() {

        var oSnapShot, oSelect, oSpan, oInput;
        var id, gift_category, gift_id;
        var local_names = new Array();
        var local_imgs  = new Array();
        var Present;
        var iNumIds;
        var tmpName;
        
        oSnapShot = g_Utils.getSnapshot(gvar.strGiftSelected);
        oSpan = document.getElementById(gvar.strRecpSelected);

        irecipients = oSpan.textContent * 1;

        GM_log('oSnapShot.snapshotLength = '+oSnapShot.snapshotLength);
        GM_log('irecipients = '+irecipients);
        
        if ((gvar.Gift_Queue.IsPaused) && (!gvar.bSetting)) {
            if ((oSnapShot.snapshotLength>0)&&(irecipients >0)) {
                // Add a gift request
                Present             = new Gift();
                
                id = oSnapShot.snapshotItem(0).id.split('_');

                // get item information
                Present.GiftCatagory   = id[2];
                Present.GiftId         = id[3];
                Present.GiftName       = gvar.item_names[Present.GiftCatagory][Present.GiftId];
                if (id[2]==3) {
	                for (var i=0; i<7; i++) {
		                Present.imgSrc[i]	= gvar.item_imgs[0][(Present.GiftId*1+i)];
		            }
                } else {
		            Present.imgSrc[0]  = gvar.item_imgs[Present.GiftCatagory][Present.GiftId];    
                }
                

                //get floor
                oSelect                = document.getElementById(gvar.strMinimumInventory);
                Present.Floor          = oSelect.value * 1;

                //get repeat
                oSelect                = document.getElementById(gvar.strRepeatGift);
                Present.Repeat         = oSelect.value * 1;

                //Find all the Recipients
                iNumIds = 0
                Present.NumIds	   	   = gvar.recips_ids.length
                Present.Ids            = '';
                Present.Names          = '';

                for (i=0;i<Present.NumIds;i++) {
                    Present.Ids       += '&recipients[]='+gvar.recips_ids[i];
                    tmpName			   = gvar.groups_levels[gvar.recips_ids[i]];
                    if (tmpName == ' ') tmpName = 'Chicken';
                    
                    if (i == 0)
                        Present.Names  = tmpName
                    else
                        Present.Names += ', '+tmpName;
                }
                
                Present.Names = escape(Present.Names);
                

                Present.ReadError      = 0;
                Present.IsPaused       = false;

                // Add the gift to the bag
                gvar.Gift_Queue.list.push(Present)
                Save_Gift_Queue();

                g_Utils.doLog('click_QueueGift', gvar.bDebugOn, 'gift has been add to the bag');

                // Save the changes and the update the table
                g_Utils.doLog('click_QueueGift', gvar.bDebugOn,'updating the Display');
                UpdateQueueTableDisplay();
            } else {
                alert('You must select both gifts and Recipients before queuing gifting request');
            }
        }
    }
    
    function click_Recip_check_old(snuid) {
	    return function () {
		    var cd;
		    
	
			//find checked element
			cd = document.getElementById("cb_recip_" + snuid);
			
			if (cd.checked) {
				if (total_checked < gvar.gift_recip_max ) { 
					total_checked = total_checked + 1; 
					gvar.recips_ids.push(snuid); 
				} else {
					cd.checked = false;
				}
			} else {
				total_checked = total_checked - 1; 
				for (i = 0; i < gvar.recips_ids.length; i++) { 
					if (gvar.recips_ids[i] == snuid) { break; } 
				} 
				gvar.recips_ids.splice(i, 1); 	
			}
			
			//updated total selected
			cd = document.getElementById("selected_total");
			cd.textContent = total_checked
	    }
    }
    
    function click_Recip_check_new(snuid) {
	    return function () {
		    var cd;
		    var oDiv;
		    var oButton;
		    
		    //find checked element
			cd = document.getElementById("cb_recip_" + snuid);
			 
			if (cd.checked) {
				if (gvar.total_checked < gvar.gift_recip_max ) { 
					gvar.total_checked = gvar.total_checked + 1;
					// hide the check receipienmt
					cd = document.getElementById("recipient_" + snuid);
					cd.style.display="none" 
					gvar.recips_ids.push(snuid);
					if (gvar.groups_levels[snuid]) {
						// hide the no friends message
						cd = document.getElementById("no_sel_friend_msg");
						cd.style.display="none"
						// add checked receipient
						oDiv = document.createElement('div');
						oDiv.id = "users_sel_" + snuid
						oDiv.setAttribute('style','float:left; padding: 2px; margin: 2px; background-color: #333');
					 	oDiv.textContent = gvar.groups_levels[snuid]
					 		oButton = document.createElement('a');
					 		oButton.setAttribute('style','margin-left: 5px;');
					 		oButton.textContent = 'x'
					 		oButton.addEventListener("click", g_ListenerLib.click_Rem_sel_friend(snuid), false);
		        
					 	oDiv.appendChild(oButton);
				 		cd = document.getElementById("users_sel_list_last");
				 		cd.parentNode.insertBefore(oDiv,cd);
					}
					
				} else {
					cd.checked = false;
				}
			} else {
				gvar.total_checked = gvar.total_checked - 1; 
				for (i = 0; i < gvar.recips_ids.length; i++) { 
					if (gvar.recips_ids[i] == snuid) { break; } 
				} 
				gvar.recips_ids.splice(i, 1);
				 	
			}
			
			//updated total selected
			cd = document.getElementById("selected_total");
			cd.textContent = gvar.total_checked
	    }
    }
    
    function click_Rem_sel_friend(uid) {
	    return function () {
		    var cd;
		    
		    if (gvar.groups_levels[uid]) { 
			    
			    cd = document.getElementById("recipient_" + uid);
			    cd.style.display="" 
			    
			    cd = document.getElementById("cb_recip_" + uid);
			    cd.checked = false;
			    
			    gvar.total_checked = gvar.total_checked - 1; 
				for (i = 0; i < gvar.recips_ids.length; i++) { 
					if (gvar.recips_ids[i] == uid) { break; } 
				} 
				gvar.recips_ids.splice(i, 1);
		    
				if (gvar.total_checked == 0) { 
					cd = document.getElementById("no_sel_friend_msg");
					cd.style.display=""
				}
				
				cd = document.getElementById("users_sel_" + uid);
			    cd.parentNode.removeChild(cd);
			} 
	    }
    }
    
    function click_Item_click(gift_cat, gift_id) {
	    return function () {
		    
		    if (gvar.item_amounts[gift_cat][gift_id] === undefined){ gvar.item_amounts[gift_cat][gift_id] =0; }
            
            // remove the box from the old items
            for (var key in gvar.item_names[gift_cat]){
	            var box = document.getElementById("item_box_" + gift_cat + "_" + key);
                if (box != null) {
                    box.style.border = "1px solid #333";
                };
            };
            
            // put the box around the item
            document.getElementById("item_box_" + gift_cat + "_" + gift_id).style.border = "1px solid #ff0";		    
	    }
    }
    
    function click_gift_tab_click(iTab) {
	    return function () {
		    var oDiv
		    var gift_cat;
		    
		    // Show the correct tab
		    for (var iGift_Tab in gvar.Gift_Tabs) {
			    gift_cat = gvar.Gift_Tabs[iGift_Tab].key
			    oDiv = document.getElementById(gvar.Gift_Tabs[iGift_Tab].id)
			    if ((oDiv.style.display == 'block') && (iGift_Tab!=iTab)) {
				    for (var key in gvar.item_names[gift_cat]){
					    //GM_log('gift_cat = '+gift_cat+' key = '+key);
		                var box = document.getElementById("item_box_" + gift_cat + "_" + key);
		                if (box != null) {
		                    box.style.border = "1px solid #333";
		                };
		            };
			    }
			    if (iGift_Tab == iTab)
			    	oDiv.style.display = 'block'
			    else
			    	oDiv.style.display = 'none'
		    }
	    }
    }

    function click_StartQueue(iOption) {
        return function () {
	        
            var oStart, oStop, oQueue, oImg, oSnapshot;
            var i;

            oStart      = document.getElementById(gvar.strStartButton);
            oStop       = document.getElementById(gvar.strStopButton);
            oQueue      = document.getElementById(gvar.strQueueButton);
            oImg        = document.getElementById(gvar.strLogo);

            oSnapShot = g_Utils.getSnapshot(gvar.strFindJobButtons);
            
            //GM_log('test '+iOption);

            if (gvar.bSetting) return;
            
            if (iOption==0) {
	            //Start Queue
                oStart.setAttribute('style', 'opacity: 0.25;');
                oStop.setAttribute('style', '');
                if (oQueue != null) oQueue.setAttribute('style','margin-right:5px; opacity: 0.25');

                for (i=0;i< oSnapShot.snapshotLength;i++)
                    oSnapShot.snapshotItem(i).setAttribute('style',"width: 75px; margin-top: 2px; opacity: 0.25; ");

                gvar.Gift_Queue.IsPaused = false;

                UpdateJobStatus('Starting Queue');

                // Save the changes and the update the table
                Save_Gift_Parameters();
                
                // Start Sending Gifts
                gvar.iGiftCurrent = setTimeout(function (e) { gvar.EventSpan.dispatchEvent(gvar.ActionSendGift); }, g_Utils.getRandRange(gvar.Gift_Queue.Params[1]*750,gvar.Gift_Queue.Params[1]*1250));
                
                //GM_log('starting '+Gift_Queue.Params[1]);

            } else {
	            // Stop Queue
                oStart.setAttribute('style', '');
                oStop.setAttribute('style', 'opacity: 0.25;');
                if (oQueue != null) oQueue.setAttribute('style','margin-right:5px;')

                for (i=0;i< oSnapShot.snapshotLength;i++)
                    oSnapShot.snapshotItem(i).setAttribute('style',"width: 75px; margin-top: 2px;");

                gvar.Gift_Queue.IsPaused = true;

                UpdateJobStatus('Stopping Queue');
                
                clearTimeout(gvar.iGiftCurrent);

                // Save the changes and the update the table
                Save_Gift_Parameters();
                
            }
      
        }
    }

    function click_DeleteJob(_iGift, _oTr) {
    	return function () {
	    	if (gvar.Gift_Queue.IsPaused) {
	        	gvar.Gift_Queue.list.splice(_iGift,1);
	            //_oTr.parentNode.removeChild(_oTr)
	            UpdateQueueTableDisplay();
	            Save_Gift_Queue();
            }
        }
    }

    function click_PauseJob(_iGift, _oDiv1, _oDiv2, _oButton) {
        return function () {

            var strTemp;

            if (gvar.Gift_Queue.IsPaused) {
	            gvar.Gift_Queue.list[_iGift].IsPaused = !gvar.Gift_Queue.list[_iGift].IsPaused;
	            strTemp = '<b>'+gvar.Gift_Queue.list[_iGift].GiftName+'</b>';
	            if (gvar.Gift_Queue.list[_iGift].IsPaused) {
	                strTemp += '<br><b><font color="red">Paused</Font><b><br>'
	                _oButton.textContent = 'Resume';
	                _oDiv1.setAttribute('style',"width: 75px; height: 75px; float: left; padding-top: 2px; opacity: 0.25; ")
	            } else {
	                strTemp += '<br><b><font color="red"></Font><b><br>';
	                _oButton.textContent = 'Pause'
                    _oDiv1.setAttribute('style',"width: 75px; height: 75px; float: left; padding-top: 2px;");

	            }
	            
	            if (gvar.Gift_Queue.list[_iGift].Repeat == -1)
	                strTemp +='<b>Minimum Inv</b> : '+gvar.Gift_Queue.list[_iGift].Floor+'<br><b>Quantity</b> : Infinite</p>'
	            else
	                strTemp +='<b>Minimum Inv</b> : '+gvar.Gift_Queue.list[_iGift].Floor+'<br><b>Quantity</b> : '+gvar.Gift_Queue.list[_iGift].Repeat+'</p>';
	            _oDiv2.innerHTML = strTemp;
	
	            Save_Gift_Queue();
            }
        }
    }

    function click_Setting(_bSetting) {
        return function () {
            var oDiv;
            var oStart, oStop, oQueue, oImg, oSnapshot;
            var i

            oStart      = document.getElementById(gvar.strStartButton);
            oStop       = document.getElementById(gvar.strStopButton);
            oQueue      = document.getElementById(gvar.strQueueButton);
            oImg        = document.getElementById(gvar.strLogo);

            oSnapShot = g_Utils.getSnapshot(gvar.strFindJobButtons);

            oDiv = document.getElementById(gvar.strSettings);
            gvar.bSetting = !gvar.bSetting;

            if (gvar.bSetting) {
                gvar.bSetting_reset = gvar.Gift_Queue.IsPaused;
                oStart.setAttribute('style', 'opacity: 0.25;');
                oStop.setAttribute('style', 'opacity: 0.25;');
                if (oQueue != null) oQueue.setAttribute('style','margin-right:5px; opacity: 0.25');
                oDiv.setAttribute('style','float: left; display: block;')
                for(var i =0; i<2; i++)
		        	document.getElementById('MWAQ-Para-'+i).value = gvar.Gift_Queue.Params[i];
                
            } else {
                if (!gvar.bSetting_reset) {
                    oStop.setAttribute('style', '');
                } else {
                    if (oQueue != null) oQueue.setAttribute('style','margin-right:5px;');
                    oStart.setAttribute('style', '');
                }
                oDiv.setAttribute('style','float: left; display: none;');

            }
        }
    }

    function click_SettingsApply() {
        
        for(var i =0; i<2; i++)
        	gvar.Gift_Queue.Params[i]    = document.getElementById('MWAQ-Para-'+i).value*1;

        //Save Data
		Save_Gift_Parameters();        
	}

    function click_SettingsDefault() {

	    document.getElementById('MWAQ-Para-0').value = 5;
	    document.getElementById('MWAQ-Para-1').value = 10;
	    document.getElementById('MWAQ-Para-2').value = 30;
    
    }


    function click_ClearRecipients_old() {
        var i, Snapshot, oSpan;
        
        GM_log('clear Recipient list');

        Snapshot = g_Utils.getSnapshot(gvar.strCheckedIds);

        for(i=0;i<Snapshot.snapshotLength;i++)
	        Snapshot.snapshotItem(i).checked = false;

        gvar.total_checked = 0;
        gvar.recips_ids.length = 0;

        oSpan = document.getElementById('selected_total');
        oSpan.textContent = 0;

    }
    
    function click_ClearRecipients_new() {
        var i, Snapshot, oSpan;
        var cd, id, uid;

        GM_log('clear Recipient list');

        Snapshot = g_Utils.getSnapshot(gvar.strCheckedIds);

        for(i=0;i<Snapshot.snapshotLength;i++) { 
	        cd = Snapshot.snapshotItem(i) 
	        if (cd.checked) { 
		        id = cd.id;
		        uid = id.split('_')[2]; 
	        	if (gvar.groups_levels[uid]) { 
			    
				    cd = document.getElementById("recipient_" + uid);
				    cd.style.display="" 
				    
				    cd = document.getElementById("cb_recip_" + uid);
				    cd.checked = false;
				    
				    gvar.total_checked = gvar.total_checked - 1; 
					for (i = 0; i < gvar.recips_ids.length; i++) { 
						if (gvar.recips_ids[i] == uid) { break; } 
					} 
					gvar.recips_ids.splice(i, 1);
			    
					if (gvar.total_checked == 0) { 
						cd = document.getElementById("no_sel_friend_msg");
						cd.style.display=""
					}
					
					cd = document.getElementById("users_sel_" + uid);
				    cd.parentNode.removeChild(cd);
				} 
        	}
        }

        oSpan = document.getElementById('selected_total');
        oSpan.textContent = 0;

    }

    // handles the menu command...

    function menu_Reset() {
	    
    }
    
    // Turn Debug on and off
    function menu_Debug() {

         var bDebugOn, strTemp;

         bDebugOn = GM_getValue('DebugOn');

         if (bDebugOn) {
             strTemp = 'Debug Mode mode currently ON.  Do you want to disable it?';
         } else {
             strTemp = 'Debug Mode mode currently OFF.  Do you want to enable it?';
         }

        if (window.confirm(strTemp)) {
            bDebugOn = !bDebugOn;
            GM_setValue('DebugOn', bDebugOn);
        }
    }
}

/**** General Javascript Utilies ****/
function Utilities() {
	// making them public
    this.getSnapshot        = getSnapshot;
    this.getCurrentTime     = getCurrentTime;
    this.getRandRange       = getRandRange;
    this.updateCheck        = updateCheck;
    
    this.doLog = doLog;
    this.doLogError = doLogError;
    
    // get a Snapshot based on an XPath
	function getSnapshot(_strPattern,_doc) {
	    // default is document if _doc is not provided
	    return document.evaluate(_strPattern, _doc||document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

    // gets the current timestamp in minutes
    function getCurrentTime() {
        return Math.round(new Date().getTime() / 1000 / 60);
    }

    // gets a random num within a range
    function getRandRange(_iLow, _iHigh) {
        return Math.floor((_iHigh - _iLow) * Math.random()) + _iLow;
    }

    // logging
    function doLog(_strSource, _bDebugOn, _strMessage) {
        if (_bDebugOn)
            GM_log('Source: ' + _strSource + '\r\nMessage: ' + _strMessage);
    }
    
    // Log Error	
    function doLogError(_strSource, _strMessage, _errObj) {
        doLog(_strSource, true, 'ERROR: ' + _strMessage.concat('\r\nDetails:\r\n', _errObj.message));

    }
    
    function updateCheck(forced) {
        // Checks once a day (24 h * 60 m * 60 s * 1000 ms) unless forced
        if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) {
            try {
                //read the script page on the USERSCRIPT.ORG web page
                GM_xmlhttpRequest( {
                    method: 'GET',
                    url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
                    headers: {'Cache-Control': 'no-cache'},
                    onload: function(resp) {

                        var local_version, remote_version, rt, script_name;

                        rt = resp.responseText;

                        //set the time of the last successful update
                        GM_setValue('SUC_last_update', new Date().getTime()+'');

                        //get the remote version number and save the scripts name
                        remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                        script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];

                        //get the local version number
                        local_version=parseInt(GM_getValue('SUC_current_version', '-1'));

                        if(local_version!=-1) {
                            // test to see if a new version is available

                            if (remote_version > local_version) {
                                if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')) {
                                    window.location.href = 'http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js';
                                    GM_setValue('SUC_current_version', remote_version);
                                }
                            } else if (forced) {
                                alert('No update is available for "'+script_name+'."');
                            }
                        } else {
                            // if the script has never run save the version numnber
                            GM_setValue('SUC_target_script_name', script_name+'');
                            GM_setValue('SUC_current_version', remote_version+'');
                        }
                    }
                });
            } catch (err) {
                if (forced)
                    alert('An error occurred while checking for updates:\n'+err);
            }
        }
    }
}

/**** MW Utilites ****/
function MWUtilities() {

    // making them public
    this.getUserId  = getUserId;
    this.getGiftKey = getGiftKey;

    function getUserId() {
	    
	    var i1, i2, strTemp;
	    var oDom;

        // get the FB User ID
        oDom = document.evaluate('//script[contains(text(),"sf_xw_user_id\'")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (oDom.snapshotLength>0) {
	        
	        for (var i=0; i<oDom.snapshotLength; i++) {
	            strTemp     = oDom.snapshotItem(i).textContent;
	            i1 = strTemp.indexOf("'sf_xw_user_id': '")
	            if (i1!=-1) {
		            i1 += 18;
	            	i2 = strTemp.indexOf("'",i1);
	            	gvar.FB_user_id  = strTemp.slice(i1, i2)+'';
	            	g_Utils.doLog('getUserId', gvar.bDebugOn, 'gvar.FB_user_id = '+ gvar.FB_user_id);
	            	break;
            	} else {
	            	g_Utils.doLog('getUserId', gvar.bDebugOn, 'gvar.FB_user_id could not be found');
            	}
        	}
        };
    };

    function getGiftKey() {

        var i, myUrl, myParms;
        var xmlhttp;

        // look for local_xw_sig

        myUrl  	 =	'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=gift&xw_action=view&xw_city=1';
        myUrl 	+=  '&xw_person=' + gvar.FB_user_id.slice(2);
        myUrl 	+=  '&liteload=0&xw_client_id=8';
        
        myParms  = 'ajax=1&liteload=1&sf_xw_user_id='+escape(gvar.FB_user_id)+'&sf_xw_sig='+gvar.local_xw_sig ;

        try {
	        
            xmlhttp = new XMLHttpRequest();

            xmlhttp.open('POST',                         myUrl, true);
            xmlhttp.setRequestHeader('Accept',           '*/*');
            xmlhttp.setRequestHeader('Accept-Language',  'en-us,en;q=0.5');
            xmlhttp.setRequestHeader('Content-Type',     'application/x-www-form-urlencoded; charset=UTF-8');
            xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xmlhttp.onload = function(_responseDetails) {

                var oSnapshot;
                var i1, i2, strTemp;
                
                strTemp = xmlhttp.responseText;
                
                //set Maximum gifting per cycle amount
                if (strTemp.indexOf('<span id="gift_count_avail">') != -1) {
                	gvar.max_gift_amount	= 50
                	gvar.gift_recip_max	= 10000
            	} else {
                	gvar.max_gift_amount	= 1;
                	gvar.gift_recip_max	= 50;
            	}
                	
                g_Utils.doLog('getGiftKey', gvar.bDebugOn,'max_gift_amount = ' + gvar.max_gift_amount);
                
                //find gift key
                i1 = strTemp.indexOf('name="gift_key"')+23;
                if (i1 != -1) {
	                i2 = strTemp.indexOf('"',i1)
                	gvar.gift_key     = strTemp.slice(i1,i2);
                	GM_log("gvar.gift_key = "+gvar.gift_key);
            	}
                
                g_Utils.doLog('getGiftKey', gvar.bDebugOn,'Gift Key = ' + gvar.gift_key);
                
            };

            xmlhttp.send(myParms);
        } catch(_errObj) {
            g_Utils.doLogError('getGiftKey', 'Cannot Find Gift Key', _errObj);
        }
    };
};

/*****				GreaseMonkey API Utils				*****/

// GM Api Checker
function GM_ApiBrowserCheck() {
	gvar.isGreaseMonkey=false; 

	// replace unsafeWindow
	if( typeof(unsafeWindow)=='undefined') { unsafeWindow = window; }
	
	// replace GM_log
	if(typeof(GM_log)=='undefined') { 
		GM_log = function(msg) { 
			try { 
				unsafeWindow.console.log('GM_log: '+msg); 
			} catch(_errObj) {
				//nothing in here
			} 
		}; 
	}
	
	var needApiUpgrade=false;
	if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
		needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError;
	}
	
	// Test for issues with GM API
	if(typeof(GM_setValue)!='undefined') {
		try {
			var gsv=GM_setValue.toString();
			if (gsv.indexOf('staticArgs')>0) {
				gvar.isGreaseMonkey=true;
				GM_log('GreaseMonkey Api detected...');
			} else if(/not\s+supported/.test(gsv)) { 									// test GM_hitch
				needApiUpgrade=true;
				isBuggedChrome=true;
				GM_log('Bugged Chrome GM Api detected...');
			}
		} catch(err) {
			// catch FF4
			gvar.isGreaseMonkey=true;
			needApiUpgrade = false
			GM_log('GreaseMonkey Api detected...');
		}
	} else {
		needApiUpgrade=true; GM_log('No GM Api detected...');
	}
	
	// Define GM_getValue, GM_setValue, GM_deleteValue
	if(!needApiUpgrade) {
		GM_log('Upgrading actual GM storage functions for objects, arrays, etc');
		GM_getValue_old = GM_getValue;
		GM_setValue_old = GM_setValue;
		
		GM_getValue=function(name,defValue) {
			var strTemp;
			if(typeof(defValue) == 'undefined')
				strTemp = GM_getValue_old(GMSTORAGE_PATH+'.'+name)		
			else
				strTemp = GM_getValue_old(GMSTORAGE_PATH+'.'+name,JSON.stringify(defValue));
				
			if (typeof(strTemp) == 'undefined')
				return strTemp
			else 
				return JSON.parse(strTemp);
		}
		GM_setValue=function(name,value) {
			GM_setValue_old(GMSTORAGE_PATH+'.'+name,JSON.stringify(value));
		}
		
	} else {
		GM_log('Try to recreate needed GM Api...');
		GM_log('Using [' +  GMSTORAGE_PATH  + '] as storage path.');
		var ws=null; 
		try { 
			ws=typeof(unsafeWindow.localStorage); 
			unsafeWindow.localStorage.length; 
		} catch(_errObj) { 																// Catch Security error
			ws=null; 
		} 
		if(ws=='object') {
			GM_log('Using localStorage for GM Api.');
			
			GM_getValue=function(name, defValue) {
				var strTemp
				
				strTemp = localStorage.getItem(GMSTORAGE_PATH+'.'+name);
				if (strTemp != null) 
					return JSON.parse(strTemp)
				else
					return defValue
			};
			
			GM_setValue=function(name,value) {
				if (typeof(value) != 'undefined')
					localStorage.setItem(GMSTORAGE_PATH+'.'+name, JSON.stringify(value))
			}	
			
			GM_deleteValue=function(name) { 
				unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+'.'+name); 
			}
			GM_listValues=function() {
				var value = [];
				for(var i=0; i<unsafeWindow.localStorage.length; i++) value[i] = unsafeWindow.localStorage[i];
				return value;
			}
		} else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
			GM_log('Using temporarilyStorage for GM Api.'); 
			gvar.temporarilyStorage = new Array();
			GM_getValue=function(name,defValue) {
				if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name])=='undefined') { 
					return defValue; 
				} else { 
					return gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name]; 
				}
			}
			GM_setValue=function(name,value) { 
					gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name]=value; 
			}
			GM_deleteValue=function(name) { 
				delete gvar.temporarilyStorage[GMSTORAGE_PATH+'.'+name]; 
			};
			GM_listValue=function() { 
				var value = [];
				var i = 0;
				for(var ID in gvar.temporarilyStorage) {value[i] = ID; i++};
				return value;
			}
		}
		
		// replace Open in Tab
		if(typeof(GM_openInTab)=='undefined') { 
			GM_openInTab=function(url) { 
				unsafeWindow.open(url,""); 
			} 
		}
		
		// replace GM_registerMenuCommand
		if((typeof(GM_registerMenuCommand)=='undefined')||(isBuggedChrome)) { 
			GM_registerMenuCommand=function(name,cmd) { 								// Dummy
				GM_log("Notice: GM_registerMenuCommand is not supported."); 
			} 
		}
		
		//update XMLHttpRequest
		if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
	  		GM_log('Using XMLHttpRequest for GM Api.');
	  		GM_xmlhttpRequest=function(obj) {
	        	var request=new XMLHttpRequest();
	        	try { 
		        	request.open(obj.method,obj.url,true); 
		        } catch(_errObj) { 
			        if(obj.onerror) { 
				        obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'}); 
				    }; 
				    return; 
				}
		        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
	        	if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }      
		        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
		        request.send(obj.data); return request;
	    	}
		}
	}

}

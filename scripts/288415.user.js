// ==UserScript==
// @name           Facebook groups cleaner
// @namespace      http://userscripts.org/users/548796
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @version	0.51
// ==/UserScript==

//Acknowledgement: 
//This script is an adaptation of the "Facebook Timeline Cleaner" 
//script by "Oneduality" which is available here: 
//http://userscripts.org/scripts/show/151426


/* Changelog:
0.51 (2014.01.19) - Serious bug fix in loading more posts. 
0.5 (2014.01.18) - Many bugs fixed + skip deleting n most recent posts
0.01 (2014.01.17) - Created
*/

// Defaults

var calledOnPage;
var debug=false;
var reallyDelete = true;
var doDeleteActivity=false;
var doDeleteGamePosts=false;
var doHideAll=false;
var doUnlike=false;
var doDeleteAll=false;
var olderThan=0;
var youngerThan=0;
var expandCount = 0;
var expandLimit = true;
var isActivityLog=false;
var triggeredMap = {};
var handledMap = {};
var now = Math.round((new Date()).getTime() / 1000);
var actions = 0;
var delay = 200; // in milliseconds
var keepRecent = 0;

// Detect whether we are using http or https ( secure browsing )
if ("https:" == document.location.protocol) {
    var protocol = "https://";
	if(debug)console.log("Detected that we're running with secure browsing..");
} else {
    var protocol = "http://";
	if(debug)console.log("Detected that we're not running with secure browsing..");
}

unsafeWindow.console.log(console.log);

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

				 						 		
// To defeat certain security mechanisms facebook implemented
var generatePhstamp = function(qs, dtsg) {
    var input_len = qs.length;
    numeric_csrf_value='';
    
    for(var ii=0;ii<dtsg.length;ii++) {
        numeric_csrf_value+=dtsg.charCodeAt(ii);
    }
    return '1' + numeric_csrf_value + input_len;
};

    
window.addEventListener('load', function()  {
	
	var fb_dtsg = null;

	// Get the value of fb_dtsg
	var getConstantParameters = function () {
		if ( fb_dtsg !== null ) {
			return true;
		} else {
			
			if ( fb_dtsg === null ) {
				$('input[name="fb_dtsg"]').each(function(){
					fb_dtsg = $(this).attr("value");
				});
			}
			return (fb_dtsg !== null);
		}
	}
	
	
	//Check if on activitylog
	function checkForActivityLog()
	{
		isActivityLog=false;
        var temp = /(groups)/g;
		var result = temp.test( $(location).attr('href') );
		if (result != false)
		{
            var keepRecentTxt=prompt("How many recent posts do you want to keep ?");
            if (keepRecentTxt!=null)
            {
                keepRecent = parseInt(keepRecentTxt);
                if(isNaN(keepRecent) || keepRecent < 0 )
                {
                    alert("Wrong value: " + keepRecentTxt);
                }
                else
                {
                    var answer = confirm("All posts except the most recent ("+keepRecent+") will be deleted, are you sure ?");
                    if (answer)
                    {
                        expandMore();
                        isActivityLog=true;
                    }
                }
            }
		}
	}

    //checkForActivityLog();
	setTimeout (checkForActivityLog, 3000);
	

	//expand activitylog
	function expandMoreActivity ()
    {
        //console.log("Exp1");
        //console.log(isActivityLog);
        //console.log("Exp2");
        //if(isActivityLog == false)
         //   return;
        /*var pager = $('#pagelet_group_pager');
        console.log(pager);
		pager.find('a[href]').each(function () {
            console.log($(this));
            if ( $(this).innerHTML === "Older Posts")
            {
				console.log('clickit');
                $(this).click();
            }
        });
        if ( !expandLimit || (expandLimit && expandCount >= 0) ) 
		{*/
			//console.log("in if");
            //expandCount -= 1;
			//setTimeout (expandMoreActivity, 10000);
			scrollTo(0, 10000000);
        	//setTimeout (handleStories, 20000);
		/*}
		else
		{
            console.log("in else");
			scrollTo(0, 0);
			handleStories();
		}*/
	}
    
	function expandMore()
    {
		if (debug) console.log("in expandMore");
        /*var pager = $('#pagelet_group_pager');
        console.log(pager);
		pager.find('a[href]').each(function () {
            console.log($(this));
			console.log('clickit');
            //$(this).click();
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            $(this).context.dispatchEvent(evt);
            $(this).context.dispatchEvent(evt);

        });
        */
        scrollTo(0, 10000000);
        setTimeout (clickPosts, 1000);
		if (debug) console.log("off expandMore");        
	}

   	var clickPosts = function () 
    {	
		if (debug)  console.log("in clickPosts");
        getConstantParameters();
        //console.log("before click");
        
        var ministory = $('#pagelet_group_mall');
        //console.log(ministory);
        //ministory.find('div.uiPopover').each(function () {
        var popups = ministory.find('a._5pbj');
        if (debug) console.log("loaded posts: " + popups.length);
        popups.each(function () {
            //console.log($(this));
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            $(this).context.dispatchEvent(evt);
            $(this).context.dispatchEvent(evt);
            $(this).remove();
            //$(this).click();
        });
        setTimeout (function() {handleStories(ministory);} , 1000);
		if (debug) console.log("off clickPosts");        
    }
    
	//show options of stories and do stuff
	var handleStories = function (ministory) 
    {
		if (debug) console.log("in handleStories");
        var counter = 0;
        var ajaxifies = $(".uiContextualLayerPositioner").find('a[ajaxify]');        
        ajaxifies.each(function () {
            var ajaxify = parseUri(protocol+"facebook.com" + $(this).attr("ajaxify"));
            if (ajaxify.file === "delete.php" && handledMap[ajaxify.queryKey['story_dom_id']] === undefined)
            {
                actions++;
                if(actions <= keepRecent)
                {
                    if(debug){console.log("Deleting: "+ ajaxify.queryKey['story_dom_id']  + " (Skipped)");}

                }
                else
                {
                    if(debug){console.log("Deleting: "+ ajaxify.queryKey['story_dom_id']);}
                    
                    var data = {
                        'fb_dtsg'			  : fb_dtsg,
                        'confirmed'			  : "true"
                    };							
                    
                    for ( var key in ajaxify.queryKey ) 
                    {
                        data[key] = ajaxify.queryKey[key];
                    }
                    counter++;
                    if(debug)console.log("deletion after: " + delay*counter);
                    setTimeout(function() {remove(ministory, data);},delay*counter+2000);
                }
                handledMap[ajaxify.queryKey['story_dom_id']] = true;
            }
       });
       setTimeout (expandMore, 500);
	   if (debug) console.log("off handleStories");        
	}
	
	
// Convert a hash to a query string for posting
	var toQueryString = function(o) {
	    if(typeof o !== 'object') {
	        return false;
	    }
	    var _p, _qs = [];
	    for(_p in o) {
	        _qs.push(encodeURIComponent(_p) + '=' + encodeURIComponent(o[_p]));
	    }
	    return _qs.join('&');
	};


	function remove(myministory, mydata)
	{
		$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); 
		if(debug)console.log("Chrome detected.. using jquery ajax call..");
		if($.browser.chrome){
			$.ajax({
				type    : "POST",
				url     : protocol+"www.facebook.com/ajax/groups/mall/delete.php",
				data    : mydata,
				complete: function(jqXHR, textStatus) {
					if ( jqXHR.status === 200 ) {
                        /*
						if ( $('#tlcleanmenu').attr('deletecount') === undefined || $('#tlcleanmenu').attr('deletecount') === null ) {
							$('#tlcleanmenu').attr('deletecount', '0');
						}
						var deleteCount = parseInt($('#tlcleanmenu').attr('deletecount')) + 1;
						if (document.documentElement.lang === "de")
						{
							$('#tlcleanmenu').html('<span class="uiButtonText"><font size="-5">Chronikaufräumer (' + deleteCount + ')</font></span>');
						}
						else
						{
							$('#tlcleanmenu').html('<span class="uiButtonText"><font size="-5">Clear Timeline (' + deleteCount + ')</font></span>');
						}
						$('#tlcleanmenu').attr('deletecount', '' + deleteCount);
                        */
                        if(reallyDelete){
                            var storyID = mydata['story_dom_id'] ;
                        	var storyIDSplits = storyID.split("%");
                        	var findID = "#" + storyIDSplits[0] + "\\:6";                    
                        	myministory.find(findID).each (function () {
                            	$(this).remove();
                            })
                        }
						if (debug){console.log("Deleted: " + mydata['story_dom_id']);}
						
					}
					else if ( jqXHR.status === 500 )
					{
						//console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid'] + ", retrying");
						//setTimeout(function(){remove(myministory,mydata)},1000);
						if(debug)console.log("Error removing content.. skipping, sorry.. I tried :(");
						if(reallyDelete){
                            var storyID = mydata['story_dom_id'] ;
                        	var storyIDSplits = storyID.split("%");
                        	var findID = "#" + storyIDSplits[0] + "\\:6";                    
                        	myministory.find(findID).each (function () {
                            	$(this).remove();
                            })
                        }
					}
					else
					{
						if (debug){console.log("Error " + jqXHR.status + " on Story " + mydata['story_dom_id']);}
					}
				}
			});
		} else {
			if(debug)console.log("Firefox detected.. using GM_xmlhttpRequest ajax call..");
			GM_xmlhttpRequest({
			  method: "POST",
			  url     : protocol+"facebook.com/ajax/groups/mall/delete.php",
			  data: toQueryString(mydata),
			  dataType : 'text',
			  headers: {
					'Content-Type'    : 'application/x-www-form-urlencoded; charset=UTF-8',
					'Referer'         : document.location,
					'Cookie'          : document.cookie,
			  },
			  onload: function(response) {
				if(debug)console.log(response.responseText);
				if ( response.status === 200 ) {
					
					if ( $('#tlcleanmenu').attr('deletecount') === undefined || $('#tlcleanmenu').attr('deletecount') === null ) {
						$('#tlcleanmenu').attr('deletecount', '0');
					}
					var deleteCount = parseInt($('#tlcleanmenu').attr('deletecount')) + 1;
					if (document.documentElement.lang === "de")
					{
						$('#tlcleanmenu').html('<span class="uiButtonText"><font size="-5">Chronikaufräumer (' + deleteCount + ')</font></span>');
					}
					else
					{
						$('#tlcleanmenu').html('<span class="uiButtonText"><font size="-5">Clear Timeline (' + deleteCount + ')</font></span>');
					}
					$('#tlcleanmenu').attr('deletecount', '' + deleteCount);
				
					if(reallyDelete)myministory.remove();
					if (debug){console.log("Deleted: " + mydata['story_dom_id']);}
					
				}
				else if ( response.status === 500 )
				{
					//console.log("Error " + response.status + " on Story " + mydata['story_fbid'] + ", retrying");
					//setTimeout(function(){remove(myministory,mydata)},1000);
					if(debug)console.log("Error removing content.. skipping, sorry.. I tried :(");
					if(reallyDelete)myministory.remove(); 
				}
				else
				{
					if (debug){console.log("Error " + response.status + " on Story " + mydata['story_dom_id']);}
				}
			  }
			});
		}

	}	
	
	function hide(myministory, mydata)
	{

		$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); 

		if($.browser.chrome){
			if(debug)console.log("Chrome detected.. using jquery ajax call..");
			$.ajax({
				type    : "POST",
				url     : protocol+"www.facebook.com/ajax/timeline/story_visibility.php?",
				data    : mydata,
				complete: function(jqXHR, textStatus) {
					if ( jqXHR.status === 200 ) {
						if ( $('#tlcleanmenu').attr('deletecount') === undefined || $('#tlcleanmenu').attr('deletecount') === null ) {
							$('#tlcleanmenu').attr('deletecount', '0');
						}
						var deleteCount = parseInt($('#tlcleanmenu').attr('deletecount')) + 1;
						if (document.documentElement.lang === "de")
						{
							$('#tlcleanmenu').html('<span class="uiButtonText"><font size="-5">Chronikaufräumer (' + deleteCount + ')</font></span>');
						}
						else
						{
							$('#tlcleanmenu').html('<span class="uiButtonText"><font size="-5">Clear Timeline (' + deleteCount + ')</font></span>');
						}
						$('#tlcleanmenu').attr('deletecount', '' + deleteCount);
						if(reallyDelete)myministory.remove();
						if (debug){console.log("Hidden: " + mydata['story_fbid']);}
					}
					else if ( jqXHR.status === 500 )
					{
						//console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid'] + ", retrying");
						//setTimeout(function(){hide(myministory,mydata)},1000);
						if(debug)console.log("Error removing content.. skipping, sorry.. I tried :(");
						if(reallyDelete)myministory.remove(); 
					}
					else
					{
						if (debug){console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid']);}
					}
				}
			});
		} else {
			if(debug)console.log("Firefox detected.. using GM_xmlhttpRequest ajax call..");
			GM_xmlhttpRequest({
			  method: "POST",
			  url     :  protocol+"facebook.com/ajax/timeline/story_visibility.php?",
			  data: toQueryString(mydata),
			  dataType : 'text',
			  headers: {
					'Content-Type'    : 'application/x-www-form-urlencoded; charset=UTF-8',
					'Referer'         : document.location,
					'Cookie'          : document.cookie,
			  },
			  onload: function(response) {
				if(debug)console.log(response.responseText);
				if ( response.status === 200 ) {
					
					if ( $('#tlcleanmenu').attr('deletecount') === undefined || $('#tlcleanmenu').attr('deletecount') === null ) {
						$('#tlcleanmenu').attr('deletecount', '0');
					}
					var deleteCount = parseInt($('#tlcleanmenu').attr('deletecount')) + 1;
					if (document.documentElement.lang === "de")
					{
						$('#tlcleanmenu').html('<span class="uiButtonText"><font size="-5">Chronikaufräumer (' + deleteCount + ')</font></span>');
					}
					else
					{
						$('#tlcleanmenu').html('<span class="uiButtonText"><font size="-5">Clear Timeline (' + deleteCount + ')</font></span>');
					}
					$('#tlcleanmenu').attr('deletecount', '' + deleteCount);
				
					if(reallyDelete)myministory.remove();
					if (debug){console.log("Deleted: " + mydata['story_fbid']);}
					
				}
				else if ( response.status === 500 )
				{
					//console.log("Error " + response.status + " on Story " + mydata['story_fbid'] + ", retrying");
					//setTimeout(function(){remove(myministory,mydata)},1000);
					if(debug)console.log("Error removing content.. skipping, sorry.. I tried :(");
					if(reallyDelete)myministory.remove(); 
				}
				else
				{
					if (debug){console.log("Error " + response.status + " on Story " + mydata['story_fbid']);}
				}
			  }
			});
		}

	}
	
	function addButton()
	{
        if (isActivityLog==true)
        {
            if( document.getElementById("selectvalue") ) {
                //console.log("It's there");
            } else {
                if(debug)console.log("injecting button...");
                if (document.documentElement.lang === "de")
                {
                    if(debug)console.log("Found the list item, appending..");
                    $('ul[class="uiSideNav"]:first').append('<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal"><div class="wrap "><button class="hideToggler"></button><a id="tlcleanmenu" rel="toggle" data-length="500" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText"><font size="-1">Chronikaufräumer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li id="menuItem1" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Aktivitäten in bestimmtem Zeitfenster löschen</span></a></li><li id="menuItem2" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu2" tabindex="0"><span class="itemLabel fsm">Alle Spieleposts in bestimmtem Zeitfenster löschen</span></a></li><li id="menuItem3" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu3" tabindex="0"><span class="itemLabel fsm">Alles in bestimmtem Zeitfenster verstecken</span></a></li><li id="menuItem4" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">ALLES in bestimmtem Zeitfenster löschen</span></a></li><li><HR WIDTH="50"></li><li id="menuItem5" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Aktivitäten löschen</span></a></li><li id="menuItem6" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Spieleposts löschen</span></a></li><li id="menuItem7" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alles in der Chronik verstecken</span></a></li><li id="menuItem8" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alles "unliken"</span></a></li><li id="menuItem9" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">ALLES löschen</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="DeleteActivityOlder"></option><option value="DeleteGamePostOlder"></option><option value="HideOlder"></option><option value="DeleteOlder"></option><option value="DeleteActivity" ></option><option value="DeleteGamePost" ></option><option value="Hide" ></option><option value="Unlike" ></option><option value="Delete" ></option></select></div></span>');
                }
                else
                {
                     if ( $('ul.uiSideNav') ) {
                        if(debug)console.log("Found the list item, appending..");
//                    	$('ul[class="uiSideNav"]:first').append('<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal"><div class="wrap "><button class="hideToggler"></button><a id="tlcleanmenu" rel="toggle" data-length="500" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText"><font size="-1">Clear Timeline&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li id="menuItem1" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all activities in a selected timeframe</span></a></li><li id="menuItem2" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu2" tabindex="0"><span class="itemLabel fsm">Delete all gameposts in a selected timeframe</span></a></li><li id="menuItem3" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu3" tabindex="0"><span class="itemLabel fsm">Hide everything in a selected timeframe</span></a></li><li id="menuItem4" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete EVERYTHING in a selected timeframe</span></a></li><li><HR WIDTH="50"></li><li id="menuItem5" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all activities</span></a></li><li id="menuItem6" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all gameposts</span></a></li><li id="menuItem7" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Hide everything</span></a></li><li id="menuItem8" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">"Unlike" everything</span></a></li><li id="menuItem9" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete EVERYTHING</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="DeleteActivityOlder"></option><option value="DeleteGamePostOlder"></option><option value="HideOlder"></option><option value="DeleteOlder"></option><option value="DeleteActivity" ></option><option value="DeleteGamePost" ></option><option value="Hide" ></option><option value="Unlike" ></option><option value="Delete" ></option></select></div></span>');
                         $('ul[class="uiSideNav"]:first').append('<span class="uiButtonGroupItem selectorItem"><div class="wrap "><button id="startBtn" onclick="{doDeleteAll = true;}">Clear group</button></div> </span>');
                    }
                }
            }
        }
	}
	
    //addButton();
    //setTimeout(addButton, 2000);		

    function getClickables()
    {
        console.log("in getClickables");
        var allElements = document.getElementsByTagName('*');
        for ( var i = 0; i<allElements.length; i++ ) {
            if ( allElements[i].className !== 'theClassNameYoureLookingFor' ) {
            continue;
            }
            if ( typeof allElements[i].onclick === 'function' ) {
            // do something with the element here
            console.log( allElements[i] );
            }
        }
    }
    
    function sendDelete ()
    {
        console.log("in sendDelete");
        var allElements = document.getElementsByTagName('*');
        for ( var i = 0; i<allElements.length; i++ ) {
            if ( allElements[i].className === '_5jmm _5pat _5uch' ) {
            	console.log( allElements[i] );
            }
        }
        var mydata = {
            'fb_dtsg'		: fb_dtsg,
            'group_id'		: '218698534950950',
            'message_id'	: '283963528424450',
            'confirmed'		: '1',
			'pending'		: '',
            'source'		: '',
            'story_dom_id'	: 'mall_post_283967615090708:6',
            'revision_id'	: '',
            '__user'		:'805715023',
            '__a'			:'1',
            '__dyn'			:'7n8a9EAMNpGudDgDxrHaHyG8qeyp9Esx6iWF3qGE',
            '__req'			:'c',
            'ttstamp'		:'26581687468745249',
            '__rev'			:'1086044'
        };	
        $.ajax({
				type    : "POST",
				url     : protocol+"www.facebook.com/ajax/groups/mall/delete.php",
				data    : mydata,
				complete: function(jqXHR, textStatus) {
                    console.log(jqXHR);
                    console.log(textStatus);
                }
        })
    }
    //setTimeout(getClickables, 2000);
	//console.log("testing testing ...");
    //setTimeout(sendDelete, 5000);

	/*function checkForCommand()
	{
		checkForActivityLog();
		//console.log($(location).attr('href'));
		if (isActivityLog==true)
		{
			expandMoreActivity ();
		}
	 
		setTimeout(checkForCommand, 2000);
	}*/

	//checkForActivityLog();

    //checkForCommand();
    //setTimeout(checkForCommand, 5000);
    //setTimeout(checkForCommand, 10000);

});

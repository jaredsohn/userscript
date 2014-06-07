// ==UserScript==
// @name           friendfeedFilterByService
// @namespace      http://userscripts.org/scripts/show/47960
// @description    Shows only FriendFeed feed entries based on user chosen service type via either an inclusion (services to show) or exclusion (services to hide) list.
// @author         Micah Wittman
// @include        http://friendfeed.com/*
// @version        0.267
// ==/UserScript==

/*    

    Author: Micah Wittman | http://wittman.org/ | http://friendfeed.com/micahwittman
   
    Versions:
		* 2009-12-19 - version 0.267 - Fixed unescaped double quotes which broke the script (bug introduced in 0.266)
		* 2009-07-02 - version 0.266 - Fixed non-appearance of "Entry hidden - undo or hide other items like this one." option after hiding a post.
		* 2009-06-30 - version 0.265 - Added feature hideIfHasNoImage in Configuration. Turn on to only show entries that where posted with at least one image.
		* 2009-06-04 - version 0.264 - Added language filtering feature. Non-English text in post title can be detected and hidden if feature is turned on. Has PURE and MIXED and DISABLED modes. See var hideNonEnglish in Configuration section. Also added var ffscopeEnabled in Config to turn on and off the ffscope service support (blue icon in upper left corner).
    	* 2009-06-01 - version 0.263 - Fixed a regression that broke Greasekit (e.g. Safari) compatibility.
        * 2009-06-01 - version 0.262 - Added Pause/Play realtime icon/link per iframe. Added set frame URL GO link. Fixed Show/Hide filter indicator text to fit better.
        * 2009-05-31 - version 0.261 - Icons in upper left corner of each frame now let you set the URL so show in that frame.
        * 2009-05-30 - version 0.26 - Enhanced to work with friendfeedScope http://wittman.org/ffscope/ which creates (using iframes) a sidebar with minimal
                       layout elements displaying your home feed. friendfeedScope only works in conjunction with this script (friendfeedFilterByService).
        * 2009-05-08 - version 0.255 - Recent changes to the FriendFeed html markup required adjustments to the script - Fixed. Also, how realtime is handled much improved. Entries don't draw down to none as they did before, it's a better experience now. GreaseKit compatibilty improved, and can now run outside the GreaseMonkey encapsulation context as standard Javascript.
        * 2009-05-08 - version 0.252 - Chrome compatibility issue - Google's browser doesn't support the @include GM directive, so was activating on non-friendfeed sites. Workaround in place now. Also, minor debug code line needed to be commented out.
        * 2009-05-08 - version 0.251 - hideAtReplies wasn't activating. Fixed.
        * 2009-05-08 - version 0.25 - Added hideAtReplies feature which specifically filters out posts if the first character is an @ symbol. By default, the service must be Twitter, but there is also a companion option to hide @-replies from any service (tweets that route through facebook, etc).
        * 2009-05-07 - version 0.24 - Added feature which filters out by words in the name/text of post. If a word/phrase in a user-defined array (adjust withWordsToHideArr in Configuration) is found in the name/text of a post (just the post name/text, comments are not checked), the post will be hidden. To activate hiding by words, set withWordsToHideActive =  true.
        * 2009-05-05 - version 0.23 - Fixed endless loop page reload on non- feed pages (like the FF index page, account page, etc). Added autoPageReloadOnEmpty = true/false (in Configuration) which controls if the page auto-reloads when all visible entries drop off page (auto-reload only applicable when feedUpdateDelay = -1 ("indefinite" mode).
        * 2009-05-05 - version 0.22 - Added -1 as a valid feedUpdateDelay value (in Configuration) which is how to set the feed update delay to "indefinite".
                       Also, in "indefinite" mode, feed entries will drawn down to zero left at which point the page is automatically reloaded.
        * 2009-05-04 - version 0.21 - Fixed error: "everyoneEntries undefined". Fixed improves performance too.
        * 2009-05-04 - version 0.2 - Feed entries were not updating on all feed display types (/public was Ok, but a
                       home feed, for example, works differently behind the scenes and wasn't updating. Fixed.
        * 2009-05-03 - version 0.113 - Moved the feed update delay value (default is feedUpdateDelay = 500 milliseconds) into Configuration;
                       now it's easy to set how frequently you want the realtime updated. Effectively, this provides an inbetween option:
                       not paused, but not full throttle realtime (note that the flow of the feed actually continues, it's just revealed
                       in batches).
        * 2009-05-02 - version 0.112 - loosened the embed detect so querystring variable can be in any order
        * 2009-05-02 - version 0.111 - minor css style tweak
        * 2009-05-02 - version 0.11 - Embed styles added for a compact layout when using ?embed=1 querystring
        * 2009-05-01 - version 0.1 - initial release
*/

/************                **********/
/************  Configuration **********/
/************                **********/

//Support for the friendfeedScope (http://wittman.org/ffscope) service is supplied by a feature in this script. When the feature is turned ON, a blue icon that shows/hides a mini control panel appears in the upper left corner of any FriendFeed page that has a feed display present.

var ffscopeEnabled = false; //Set to true to enable a blue icon (mini control panel) to appear in upper left corner of the FriendFeed page, Set to false to disable it.


//The filtering method is either in SHOW or HIDE mode (they are not functional at the same time)

var filterMethod = "NONE"; //Set to "SHOW" or "HIDE", or "NONE" (NONE turns off service filtering, so everything is shown; but withWordsToHideActive can still be turned on or off and feedUpdateDelay is still in effect - set value below) then set the appropriate servicesToShowArr or servicesToHideArr variables below.

//The service names are defined by the service source link text (ie. for the example "3 minutes ago from Google Reader", the service name is Google Reader).
//Just a handful of examples are placed in the arrays below. Reference any service supported by FriendFeed.
//FriendFeed native posts are special in that there is no service name displayed, but the name "FriendFeed" used in this script's config arrays below will work to show are hide FriendFeed posts.

var servicesToShowArr = ["FriendFeed", "Twitter", "Tumblr", "Google Reader", "Facebook", "Bookmarklet"]; //Only service names in servicesToShowArr array will be shown (in other words, remove any service from the array you wanted filtered out)
var servicesToHideArr = ["Twitter", "Some other service"]; //Only service names in servicesToHideArr array will be hidden (in other words, every entry type will be shown except those in this array)

var withWordsToHideArr = ["Meme", "NSFW", "Social Media", "Sobert Rcoble"]; //Any Words/phrases in this array which is found in the name/text of a post will be cause the post to be hidden). Not case sensitive. Symbols are ignored (however, use var hideAtReplies below for hiding @-replies).
var withWordsToHideActive = false; //Set to true for hiding posts according to the withWordsToHideArr array above. Set to false to deactivate hiding by words.

var hideAtReplies = false; //Set to true to hide @-replies (any post, from Twitter or otherwise, that begins with @). Set to false to not use the @-reply hiding feature.
var hideAtRepliesFromAnyService = false; //Set to true to have @-reply hiding feature (var hideAtReplies above) hide from any service (hides from Twitter only by default). Set to false to only hide on feed entries identified specfically as "Twitter". ONLY WORKS IN CONJUNCTION WITH hideAtReplies = true.

var hideNonEnglish = 'DISABLED'; // PURE | MIXED | DISABLED - Set to 'PURE' to hide if post title is purely (100%) non-English (ASCII character set), Set to 'MIXED' to hide if there is at least a mix of English and non-English characters, Set to 'DISABLED' to turn off this hide non-English feature.

var hideIfHasNoImage = false; //Set to true to hide all entries that were not posted with at least one image.

var feedUpdateDelay = 2000; //Number of milliseconds by which the realtime feed update is delayed (integer). Set to -1 (negative 1) for an indefinite delay.


var style = '';
//style - Auto-detect Embed window (via querystring)
var doEmbed = true;
try { if(window.location.href.indexOf('embed=1') == -1) { doEmbed = false;} } catch(e){}
if(doEmbed){
    style = 'EMBED';
}
//style = 'EMBED'; // Manual-override: Uncomment this line of code and Set to '' for default (no change to layout). 'EMBED' for no sidebar and other peripheral elements display.

/*///////////////////////////////////////////*/




/*** Global Variables ***/
/********************************/
if(typeof realtime == 'undefined'){ var realtime; }
var prevTopEntryId = null;
var isSidebarIframe = false;
var hasAscii = new RegExp(/[a-z]/i);
var hasNonAsciiUnicode = new RegExp(/[\u0080-\uFFFF]/);
var reUrl = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);


/*** Initializing Functions ***/
/********************************/
function GM_wait()
{
    if(typeof unsafeWindow != 'undefined')
    {
        if(typeof unsafeWindow.jQuery != 'undefined')
        {
            jQuery = unsafeWindow.jQuery;
			realtime = unsafeWindow.realtime;
        }
    }
    if(typeof jQuery == 'undefined')
    {
        window.setTimeout(GM_wait,251);
    }
    else
    {
        $ = jQuery;
		if($('#feed').length > 0) //only continue and enter recursive loop if on a page with feed entries
		{
	        $ = jQuery;
	        AddIndicator();
	        AddHeadStyle();
			letsJQuery();
		}
    }

}


function letsJQuery()
{
    FilterByService();   
    FilterByService_wait();
}


/*** Helper Functions ***/
/********************************/
function isKeyEnter(e)
{
	var code = e.keyCode || e.which;
	if(code == 13) //Enter keycode
	{
		return true;
	}
	else
	{
		return false;
	}
}

function setIsSidebarIframe()
{ 
	//console.log($('#feed').css('width'));
	//console.log(parseInt($('#feed').css('width').replace('px','')));
	if(top === self)
	{
		//not in a frame
	}
	else
	{ //In iframe
		if( parseInt($('#feed').css('width').replace('px','')) < 100)
		{ //Narrow width is the sidebar iframe
			isSidebarIframe = true;
		}
	}
	//console.log(isSidebarIframe);
}


function isRemoveFF(){
    var doRemove = false;
    if(filterMethod ==  'SHOW'){
        if( $.inArray("FriendFeed", servicesToShowArr) == -1 ){ //FriendFeed entries don't have a service <a> tag, so don't remove if FF entry type is to be shown
            doRemove = true;
            //console.log($.inArray("FriendFeed", servicesToShowArr));
        }
    }else{ //HIDE
        if( $.inArray("FriendFeed", servicesToHideArr) > -1 ){
            doRemove = true;
            //console.log($.inArray("FriendFeed", servicesToShowArr));
        }
    }
    return doRemove;
}



/*** Main Processing Functions ***/
/********************************/
function AddIndicator(){
	setIsSidebarIframe();
    filterMethod = filterMethod.toUpperCase();
    var labelOpen = '(';
    var labelClose = ')';
    var show_hide;
    var show_hideFull;
    var dots = '';
    var max = 20;
	var hideByWords = '';
	var hideByWordsFull = '';
	var hideIfHasNoImageTextFull = '';
	if(withWordsToHideActive)
	{
		max = 22;
		hideByWords = ' | HIDE Words';
		hideByWordsFull += '\r\n\r\n' + 'Hide by Words: ' + withWordsToHideArr.join(', ');
	}
	if(hideAtReplies)
	{
		var hideAtRepliesFromAnyServiceDsp = ' (Twitter)';
		if(hideAtRepliesFromAnyService)
		{
			hideAtRepliesFromAnyServiceDsp = ' (any service)';
		}
		hideByWords += ', @-replies';
		hideByWordsFull += '\r\n\r\n' + 'Hide @-replies' + hideAtRepliesFromAnyServiceDsp;
	}
    if(filterMethod == 'NONE'){
        labelOpen = 'DELAY: ';
        labelClose = '';
        if(feedUpdateDelay >= 0)
        {
            show_hide = (feedUpdateDelay / 1000) + ' seconds';
        }
        else
        {
            show_hide = 'Indefinite';
        }
        show_hideFull = 'Feed Update Delay: ' + show_hide;
    }else if(filterMethod == 'SHOW'){
        var show = servicesToShowArr.join(', ');
        if(show.length > max){
            dots = '...';
        }
        show_hide = 'SHOW: ' + show.substr(0,max) + dots;
        show_hideFull = 'SHOW: ' + show;
    }else{
        var hide = servicesToHideArr.join(', ');
        if(hide.length > max){
            dots = '....';
        }
        show_hide = 'HIDE: ' + hide.substr(0,max) + dots;
        show_hideFull = 'HIDE Services: ' + hide;
    }
	if(hideIfHasNoImage)
	{
		hideIfHasNoImageTextFull = '\r\n\r\n' + 'HIDE Entries without at least one image';
	}
	var pad = '8px';
	var mastheadQstringEmbed = '';
	if(isSidebarIframe)
	{
		pad = '0px';
	}
    var compactMasthead = '';
    var switchCss = 'margin-left:6px;';
	//console.log(style + '~'+isSidebarIframe);
    if(style == 'EMBED'){
        compactMasthead = '&nbsp; &nbsp;<a href="http://friendfeed.com/?embed=1">FF</a> :: ';
        switchCss = ''; //don't indent for embed view
		//Minimize layout elements for embed view
		$('#feed').parent().children().not('#feed').hide()
		$('.box-corner, .box-spacer').hide();
		$('td.logo').next().hide();
    }
	show_hide += hideByWords;
	var controlBar = $('.logo:first');
	if(controlBar.length == 0)
	{
		$('.body:first').before('<div id="fsControlBar"></div>');
		controlBar = $('#fsControlBar');
	}
	controlBar.append('<div style="padding-top:'+ pad +';padding-bottom:'+ pad +';font-size:10px;' + switchCss + '">' + compactMasthead + '<a id="localFilterLink" href="#">' + labelOpen + show_hide + labelClose + '</a></div>');
    $('#localFilterLink').click(function(){
        alert('Your friendfeedFilterByService greasemonkey script is turned "ON". There are likely filtered entries you are not currently seeing.\r\n\r\nCurrent Configuration is...\r\n\r\n' + show_hideFull + hideByWordsFull + hideIfHasNoImageTextFull);
    });
    
    //friendfeedScope functionality here - only Firefox compatible
	if( ffscopeEnabled && (typeof unsafeWindow != 'undefined') )
	{	
		var realtimePauseLinkStyle = 'style="display:none;position:absolute;top:40px;left:0px;background-color:#3878C7;padding:1px 1px 0 1px"';
		var realtimePauseLink = '<a id="fsRealtimePauseLink" class="l_realtimepause" ' + realtimePauseLinkStyle + ' href="#"><img title="Resume real-time updates" alt="Resume real-time updates" src="/static/images/nano-play.png?v=be16" width="14px"/></a>';
		if(!realtime.stopped)
		{
			realtimePauseLink = '<a id="fsRealtimePauseLink" class="l_realtimepause" ' + realtimePauseLinkStyle + ' href="#"><img title="Pause updates" alt="Pause updates" src="/static/images/nano-pause.png?v=afc6" width="14px" /></a>';
		}

		$('body').prepend('<div style="position:absolute;top:2px;left:2px;font-size:9px"><a title="Go to wittman.org/ffscope" alt="Go to wittman.org/ffscope" style="display:none;position:absolute;top:20px;left:0px" id="fsHomeLink" href="http://wittman.org/ffscope/"><img src="http://wittman.org/ffscope/home.png" /></a> <a title="friendfeedFilterByService / ffscope" title="friendfeedFilterByService / ffscope" id="fsShowMainFrameUrlInputLink" href="#"><img src="http://wittman.org/ffscope/goto.png" /></a> ' + realtimePauseLink + '</div> <div id="fsMainFrameUrlDiv" style="display:none;position:absolute;top:1px;left:28px"><input id="fsMainFrameUrl" style="width:260px" value="' + 	window.location.href + '" /> <a title="Go to URL" alt="Go to URL" style="height:20px;width:30px;background:white;margin-top:2px;padding:1px 4px 1px 4px;" id="fsMainFrameUrlSubmit" href="#"> GO </a></div>');
		$('#fsShowMainFrameUrlInputLink').click(function(){
			$('#fsMainFrameUrlDiv').toggle().focus();
			$('#fsMainFrameUrl').focus();
			$('#fsHomeLink').toggle();
			$('#fsRealtimePauseLink').toggle();
			return false;
		});
		$('#fsMainFrameUrl').keypress(function(e){
			if(isKeyEnter(e))
			{
				var url = $(this).val();
				goToUrl(url);
			}
		});
		$('#fsMainFrameUrlSubmit').click(function(){
			var url = $('#fsMainFrameUrl').val();
			goToUrl(url);
		});
	}
}

function goToUrl(url)
{
	if(url != '')
	{
		window.location.href = url;
	}
}

function FilterByForeignLanguageMatched(text)
{
	var match = false;
	if(hideNonEnglish != 'DISABLED')
	{
		text = text.replace(' ','').replace('via',''); //remove spaces and "via" which is added on reshares
		text = text.replace(reUrl,''); //remove ascii URLs
		if(hideNonEnglish == 'PURE')
		{
			if(!hasAscii.test(text) && hasNonAsciiUnicode.test(text))
			{
				match = true;
			}
		}
		else
		{
			//hideNonEnglish == 'MIXED'
			if(hasNonAsciiUnicode.test(text))
			{
				match = true;
			}
		}
	}
	return match;
}

function FilterByWordMatched(text, serviceName){
	var word;
	var matched = false;
	var matchedIndex;
	if(withWordsToHideActive)
	{
		$.each(withWordsToHideArr, function(){
			word = this;
			re = new RegExp('^' + word +'|([^a-z]' + word + '[^a-z])|([^a-z]' + word + '$)', 'i');
			//console.log(word);
			matchedIndex = text.match(re);
			if(matchedIndex != null)
			{
				matched = true;
			}
		});
	}
	//console.log(text.indexOf('@') + text);
	if(!matched && hideAtReplies)
	{
		var serviceMatch = true;
		if( (!hideAtRepliesFromAnyService) && (serviceName != 'Twitter') )
		{
			serviceMatch = false;
		}
		
		if(hideAtReplies && serviceMatch)
		{
			//console.log(text.indexOf('@') + text);
			if(text.indexOf('@') == 0)
			{
	    		matched = true;
			}
		}
	}
	return matched;
}

function FilterByService(){   
    var info = $('#feed .entry .body .info');
    info.each(function(){
        var service = $(this).find('a.service:first');
		if(service.length == 0)
		{
			service = $(this).find('a.date:first');
		}
        var doRemove = false;
        var entry = service.parent().parent().parent();
		var serviceName = $(this).find('.service').text();
        var entryText = service.parent().parent().find('.text');
		var entryNameText = service.parent().parent().find('a.l_profile:first');
        if(filterMethod != 'NONE'){
            if(service.hasClass('service')){
                //Has service tag
                if(filterMethod ==  'SHOW'){
                    if( $.inArray(service.text(), servicesToShowArr) == -1 ){
                        doRemove = true;
                    }
                }else{ //HIDE
                    if( $.inArray(service.text(), servicesToHideArr) > -1 ){
                        doRemove = true;
                    }
                }
            }else{
                //Does not have service tag
                doRemove = isRemoveFF();
            }
        }
        //console.log(withWordsToHideActive);
        if(!doRemove && (withWordsToHideActive || hideAtReplies))
        {
        	var entryTextLower = entryText.text().toLowerCase();
			var entryNameTextLower = entryNameText.text().toLowerCase();
			doRemove = FilterByWordMatched(entryTextLower + ' ' + entryNameTextLower, serviceName);
        }
		if( !doRemove && FilterByForeignLanguageMatched(entryText.text()) )
		{
			doRemove = true;
		}
		if(hideIfHasNoImage)
		{
			if(entry.find('.ebody .media .container img').length == 0)
			{
				doRemove = true;
			}
		}
        if(doRemove){
            entry.remove();
        }else{
            entry.css('display','block');
        }
    });

	//Inject embed=1 into querystring of all links
	if(isSidebarIframe)
	{
		var href;
		var embedQmark = '';
		var embedAmp = '';
		$('a').each(function(){
			href = $(this).attr('href');
			//console.log(this);
			if(href.indexOf('?') == -1)
			{
				embedQmark = '?'
			}
			if(href.indexOf('&') > -1)
			{
				embedAmp = '&'
			}
			var isInternalLink = true;
			if(href.indexOf('://') > -1)
			{
				if(href.indexOf('friendfeed.com/') == -1)
				{
					isInternalLink = false;
				}
			}
			if( (href.indexOf('embed=1') == -1) && isInternalLink )
			{
				$(this).attr('href', href + embedQmark + embedAmp + 'embed=1');
			}
		});
	}
	else
	{
		//var controlBar = $('.logo:first');
		//controlBar.
	}
}


function AddHeadStyle(){
    var optionalCss = '';
    if(style == 'EMBED'){
        optionalCss = ' #sidebar,.home,.sharebox,#footer,#search,.bar,.logo img{ display:none; }  '
            + ' #page .box-body{ padding:0; min-width:240px; }'
            + ' #header{ margin:0 0 0 0; }'
            + ' body{ background:none !important; background-color:#fff !important; }'
            + ' #body{ max-width:3000px !important; }'
            + ' .bar{ border:none !important; background:none !important;background-color:#C8DCF5 !important; }'
            ;
    }
    var css = "@namespace url(http://www.w3.org/1999/xhtml); .entry{ display:none; } .hidemore{ display:block;}" + optionalCss;
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    }
}



function FilterByService_wait(){
	var topEntryId = $('.entry:first').attr('id');
    var feedUpdateDelayToUse = feedUpdateDelay;

    if(feedUpdateDelay < 0)
    {
        feedUpdateDelayToUse = 2000;
    }
	if(topEntryId == prevTopEntryId)
	{
		window.setTimeout(FilterByService_wait, feedUpdateDelayToUse);
	}
	else
	{
		prevTopEntryId = topEntryId;
		if(feedUpdateDelay >= 0)
		{
			letsJQuery();
		}
	}
}



/********** RUN SCRIPT **********/
/********************************/
var doRun = true;
try { if(window.location.href.indexOf('friendfeed.com/') == -1) { doRun = false;} } catch(e){}
if(doRun) //greasekit doesn't support @include directs, so test URL for context
{
	GM_wait();
}


/********** Script Auto-Update Component **********/
/*************************************************/
if(typeof unsafeWindow != 'undefined')
{
    // ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
    // This auto update-notification script was made by Seifer
    // You can find it at http://userscripts.org/scripts/show/12193
    // ========================================================
    // === Edit the next four lines to suit your script. ===
    scriptName='friendfeedFilterByService';
    scriptId='47960';
    scriptVersion=0.267;
    scriptUpdateText=">>IMPORTANT UPDATE!<< | >>REMINDER: Backup your Configuration section (for reference) before updating<< 2009-12-19 - version 0.267 - Fixed unescaped double quotes which broke the script (bug introduced in 0.266)";
    // === Stop editing here. ===

    var lastCheck = GM_getValue('lastCheck', 0);
    var lastVersion = GM_getValue('lastVersion', 0);
    var d = new Date();
    var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
    if (parseInt(navigator.appVersion)>3) {
        if (navigator.appName=="Netscape") {
            winW = window.innerWidth;
            winH = window.innerHeight;
        }
        if (navigator.appName.indexOf("Microsoft")!=-1) {
            winW = document.body.offsetWidth;
            winH = document.body.offsetHeight;
        }
    }
    if (currentTime > (lastCheck + 86400)) { //24 hours after last check
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
            headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
            onload: function(responseDetails) {
                var text = responseDetails.responseText;
                    var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
                    var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
                    if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
                        GM_addStyle('#gm_update_alert {'
                    +'    position: fixed;'
                    +'    z-index:100000;'
                    +'    top: '+((winH/2)-60)+'px;'
                    +'    left: '+((winW/2)-275)+'px;'
                    +'    width: 550px;'
                    +'    background-color: yellow;'
                    +'    text-align: center;'
                    +'    font-size: 11px;'
                    +'    font-family: Tahoma;'
                    +'}'
                    +'#gm_update_alert_buttons {'
                    +'    position: relative;'
                    +'    top: -5px;'
                    +'    margin: 7px;'
                    +'}'
                    +'#gm_update_alert_button_close {'
                    +'    position: absolute;'
                    +'    right: 0px;'
                    +'    top: 0px;'
                    +'    padding: 3px 5px 3px 5px;'
                    +'    border-style: outset;'
                    +'    border-width: thin;'
                    +'    z-index: inherit;'
                    +'    background-color: #FF0000;'
                    +'    color: #FFFFFF;'
                    +'    cursor:pointer'
                    +'}'
                    +'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
                    +'    text-decoration:underline;'
                    +'    color: #003399;'
                    +'    font-weight: bold;'
                    +'    cursor:pointer'
                    +'}'
                    +'#gm_update_alert_buttons span a:hover  {'
                    +'    text-decoration:underline;'
                    +'    color: #990033;'
                    +'    font-weight: bold;'
                    +'    cursor:pointer'
                    +'}');
                        newversion = document.createElement("div");
                        newversion.setAttribute('id', 'gm_update_alert');
                        newversion.innerHTML = ''
                    +'    <b>GreaseMonkey UserScript Update Notification</b><br>'
                    +'    There is an update available for &quot;'+scriptName+'&quot; <br>'
                    +'    You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
                    +'    <br>'
                    +'    <div id="gm_update_alert_button_close">'
                    +'        Close</div>'
                    +'    <b>What do you want to do?</b><br>'
                    +'    <div id="gm_update_alert_buttons">'
                    +'        <span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
                    +'        <span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
                    +'        <span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
                    +'        <span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
                    +'        <span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
                    document.body.insertBefore(newversion, document.body.firstChild);
                    document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
                    document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
                              document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
                    document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
                    }
                }
        });
    }
}

// Power Twitter
// Copyright 2007-2011, Narendra Rocherolle and Nick Wilder
//
// ==UserScript==
// @name          Power Twitter
// @version       1.80
// @namespace     http://powertwitter.me
// @description   Makes Twitter Better!
// @include       http://twitter.com/*
// @include	  https://twitter.com/*
// @match       http://twitter.com/*
// @match	  https://twitter.com/*
// ==/UserScript==

// add functions if they are not available 
if (typeof GM_log === "undefined") { 
  GM_log = function(log) {
    if(console) {
      console.log(log); 
    }
    else {
      alert(log); 
    }
  }
}

if (typeof GM_getValue === "undefined") {
        GM_log("adding GM get/set functions");
	GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	GM_setValue=function (key,value) {
		localStorage[key]=value;
                return;
	};
}

/*
if (!this.GM_getValue || this.GM_getValue.toString.indexOf("not supported")>-1) {
        GM_log("adding GM get/set functions");
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		localStorage[key]=value;
                return;
	};
}
*/

if(typeof GM_xmlhttpRequest === "undefined") { 
  GM_log("adding GM xmlhttp");
  GM_xmlhttpRequest = function(/* object */ details) {
    details.method = details.method.toUpperCase() || "GET"; 
    if(!details.url) { 
      throw("GM_xmlhttpRequest requires an URL."); 
      return; 
    } 
    // build XMLHttpRequest object 
    var oXhr, aAjaxes = []; 
    if(typeof ActiveXObject !== "undefined") {
      var oCls = ActiveXObject; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Microsoft.XMLHTTP"}; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP"}; 
      aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP.3.0"}; 
    } 
    if(typeof XMLHttpRequest !== "undefined") 
      aAjaxes[aAjaxes.length] = {cls:XMLHttpRequest, arg:undefined}; 
    for(var i=aAjaxes.length; i--; ) 
      try{ 
	oXhr = new aAjaxes[i].cls(aAjaxes[i].arg); 
	if(oXhr) break; 
      } catch(e) {} 
    // run it 
    if(oXhr) {
      if("onreadystatechange" in details) 
	oXhr.onreadystatechange = function() 
	  { details.onreadystatechange(oXhr) }; 
      if("onload" in details) 
	oXhr.onload = function() { details.onload(oXhr) }; 
      if("onerror" in details) 
	oXhr.onerror = function() { details.onerror(oXhr) }; 
      oXhr.open(details.method, details.url, true); 
      if("headers" in details)
	for(var header in details.headers) 
	  oXhr.setRequestHeader(header, details.headers[header]); 
      if("data" in details) 
	oXhr.send(details.data); 
      else 
	oXhr.send();
    }
    else {
      throw ("This Browser is not supported, please upgrade.");
    }
  } 
} 

if(typeof GM_addStyle === "undefined") {
  GM_log("adding GM add style");
  addGlobalStyle = function(/* String */ styles) {
    var oStyle = document.createElement("style"); 
    oStyle.setAttribute("type", "text\/css"); 
    oStyle.appendChild(document.createTextNode(styles)); 
    document.getElementsByTagName("head")[0].appendChild(oStyle);
  }
    
} 


if (window.top === window)
{
	var ptSandbox = 0;  // must set to 0 to publish!
	var ptSandboxServer = '';
	var ptServer = 'http://powertwitter.me/';
	var ptScript = 'req.php';
	var ptVersionNumber = '1.80';
	var ptAgent = 'greasemonkey';
	var ptWarning = '';
	if (ptSandbox == 1)
	{
		ptServer = 'http://'+ ptSandboxServer + '.powertwitter.me/';
		ptWarning = '<div id="ptNotes"><h2>TESTING!</h2>'+ ptServer +'</div>';
	}
	
	// some globals
	var ptLoggedInUserName = '';
	var ptLoggedIn = false;
	var ptViewingUser = '';
	var ptGsTitle = window.location.href;
	var ptGsNextPage = 2;
	var ptIsStatusPage = false;
	var ptIsUserPage = false;
	var ptIsSearchPage = false;
	var ptAttempts = 0;
	var ptTimeOut = 0;
	var ptDefaultPhotoService = 'yfrog';
        var ptWaitingGif = '<img width="12" src="data:image/gif;base64,' +
                        'R0lGODlhEAAQAPQAAP///6qqqvz8/Ly8vNXV1aurq7a2tvDw8OHh4bGxsdHR0cvLy/X19dzc3Ovr68HB' +
                        'wcbGxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBF' +
                        'Mi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAg' +
                        'jmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISo' +
                        'NSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHW' +
                        'xQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8j' +
                        'QQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJ' +
                        'LaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQ' +
                        'SubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4G' +
                        'rBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm' +
                        '/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOco' +
                        'LBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQh' +
                        'ACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiN' +
                        'Hks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAA' +
                        'AAAAAAAAAA==" />';

	var ptLoadingMessage;
	var ptListRegExp = new RegExp(/com\/.*?\/.+/);
	var ptMaxCacheCount = 100;
	
	// set up the cache system which has two layers
        // clear the cache if this is a new version
	var ptPrefVersion = (GM_getValue("ptPrefVersion")) ? GM_getValue("ptPrefVersion") : '0';
        if (ptPrefVersion < ptVersionNumber)
        {
                GM_setValue('cache', '');
                GM_setValue('ptPrefVersion',ptVersionNumber);
                GM_log('version update, clearing cache!');
        }
	var ptCache = ptInitCache();
	
	
	// add some html for sandbox notes, and message bar
	var newElement;
	newElement = document.createElement('div');
	newElement.innerHTML = ptWarning;
	
	// make sure we have a body
	var ptInsertPoint;
	if(document.getElementsByTagName("body")[0])
	{
		ptInsertPoint = document.getElementsByTagName("body")[0];
		ptInsertPoint.appendChild(newElement);
		newElement = document.createElement('div');
		newElement.id = 'ptDataContainer';
		newElement.innerHTML = '<div id="ptCustomMessage"></div>';
	
		// used in case page is broken aka kill switch
		newElement.innerHTML += '<input id="ptPingStatus" type="hidden" value="0" />';
		// this status input is used across the GM sandbox to know when the xmlreq is finished
		newElement.innerHTML += '<input id="ptLinkUpdateStatus" type="hidden" value="0" />';
		// these are used for pagination and search across the GM sandbox
		newElement.innerHTML += '<input id="ptVar1" type="hidden" value="0" />';
		newElement.innerHTML += '<input id="ptVar2" type="hidden" value="0" />';
		newElement.innerHTML += '<input id="ptVar3" type="hidden" value="0" />';
		newElement.innerHTML += '<input id="ptVar4" type="hidden" value="0" />';
		newElement.innerHTML += '<input id="ptAuth" type="hidden" value="0" />';
		newElement.innerHTML += '<input id="ptPageNumber" type="hidden" value="0" />';
		newElement.innerHTML += '<input id="ptLastSearch" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptLatestTweetId" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptFirstTweetId" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptRestrictedSearch" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptClearTimeline" type="hidden" value="1" />';
		newElement.innerHTML += '<input id="ptCurrentService" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptSelectedTab" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptLinkParseService" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptDoNotParse" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptIncomingCache" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptDisableCache" type="hidden" value="0" />';
		newElement.innerHTML += '<input id="ptMaxCacheCount" type="hidden" value="100" />';
		newElement.innerHTML += '<input id="ptFunctionData" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptPromoInserted" type="hidden" value="0" />';
		newElement.innerHTML += '<input id="ptPromoBlockData" type="hidden" value="" />';
		newElement.innerHTML += '<input id="ptMediaInserted" type="hidden" value="0" />';
 		newElement.innerHTML += '<input id="ptPromoQodData" type="hidden" value="" />';
 		newElement.innerHTML += '<input id="ptPromoQodStartData" type="hidden" value="" />';               
		newElement.innerHTML += '<input id="ptDefaultPhotoService" type="hidden" value="'+ptDefaultPhotoService+'" />';
		newElement.innerHTML += '<input id="ptPhotoServiceOptions" type="hidden" value="'+ptDefaultPhotoService+'" />';
		newElement.innerHTML += '<div id="ptShade" />';
//		newElement.innerHTML += '<iframe src="'+ptServer+ptScript+'?action=countPage" style="width: 1px; height: 1px; visibility: hidden;"></iframe>'
		ptInsertPoint.appendChild(newElement);
		
		//add global styles
		var ptStyleInserts = '#ptNotes {position: absolute; top: 10px; right: 10px; background-color: #eee; padding: 6px;} ' +
		'#ptCustomMessage {display: none; z-index: 10; width: 90%; text-align: center; position: fixed; bottom: 0px; left: 0px; background-color: #ffffcc; padding: 4px;}' +
		'#ptShade {position: absolute; top: 0; z-index: 999; display: none; background-color: #113344; opacity: 0.5; }' +
		'#ptStatus {position: fixed; bottom: 0px; right: 0px; display: block; font-size: 9px; padding-bottom: 0px; z-index: 12;}' +
		'#ptSettings {padding: 6px; font-size: 10px; border: 1px solid #999; background: #eee; position: fixed; bottom: 0px; right: 0px; display: none; z-index: 100 !important;}' +
		'#ptSettingPassword {padding: 1px; border: 1px solid #ccc;}' +
		'#ptUploadingMsg {display: none; padding-left: 20px; height: 36px; z-index: 1003; position: absolute; left: 0px; width: 200px; background-color: #fff; font-size: 1.1em;} ' +
		'#ptUploadCancelLink {font-size: 9px; color: #333; margin-left: 20px; background-color: #eee; padding: 4px; -moz-border-radius: 4px; border: 1px solid #ccc; }' +
		'#ptIframeContainer {top: 30px; z-index: 200; border: 1px solid #ccc; visibility: hidden; position: absolute; display: none; background-color: #fff; }' +
		'#ptSqueezingMsg {text-align: center; display: none; padding-left: 10px; height: 36px; z-index: 1003; position: absolute; left: 0px; width: 360px; background-color: #fff; font-size: 1.1em; }' +
		'#ptSqueezeCancelLink {font-size: 9px; color: #333; margin-left: 20px; background-color: #eee; padding: 4px; -moz-border-radius: 4px; border: 1px solid #ccc; }' +
		'#ptChooseFileBtn {z-index: 1001; position: absolute; left: 0px; width: 80px; }' +
		'';
		
			ptStyleInserts += '' +
                        '.ptButton { cursor: pointer; padding: 4px; font-size: 11px; -moz-border-radius:5px; -webkit-border-radius: 5px !important; border: 1px solid #666; background:-webkit-gradient(linear,left bottom,left top,color-stop(0.43, rgb(204,204,204)),color-stop(0.53, rgb(238,238,238))); background: -moz-linear-gradient(center top , #CCCCCC, #EEEEEE) repeat scroll 0 0 transparent; }' +
                        '.ptToggleOuter { width: 80px; padding: 1px; font-size: 12px; -moz-border-radius:4px; -webkit-border-radius: 4px; border: 1px solid #666; background:-moz-linear-gradient(center top , #DDDDDD, #EEEEEE) repeat scroll 0 0 transparent; }' +
                        '.ptToggleInner { float: left; width: 40px; padding: 0px; font-size: 11px; -moz-border-radius:4px; -webkit-border-radius: 4px; border: 1px solid #666; border-top: 1px solid #fff; background:-moz-linear-gradient(center top , #CCCCCC, #EEEEEE) repeat scroll 0 0 transparent; }' +
			'#ptSettings { font-size: 12px !important; }' +
                        '#ptAuthStatusHtml { display: none;}' +
                        '';
		
		addGlobalStyle(ptStyleInserts)
	
	/*
		// experimental domains outside of twitter
		if(ptGsTitle.indexOf('google.com/search') != -1)
		{
			var ptGoogleSearchRegExp = new RegExp(/.q=(.*?)&/);
			if(ptGsTitle.match(ptGoogleSearchRegExp))
				document.getElementById('prs').innerHTML += ' <a href="http://search.twitter.com/search?q='+ptGsTitle.match(ptGoogleSearchRegExp)[1]+'">Twitter</a>';
		}
	*/

		// get base settings
		var ptPrefRM = (GM_getValue("ptPrefRM")) ? GM_getValue("ptPrefRM") : '';
		var ptPrefEX = (GM_getValue("ptPrefEX")) ? GM_getValue("ptPrefEX") : 'on';
		var ptPrefFB = (GM_getValue("ptPrefFB")) ? GM_getValue("ptPrefFB") : '';
		var ptPrefSB = (GM_getValue("ptPrefSB")) ? GM_getValue("ptPrefSB") : '';
		var ptPrefPR = (GM_getValue("ptPrefPR")) ? GM_getValue("ptPrefPR") : '';
		var ptPrefPH = (GM_getValue("ptPrefPH")) ? GM_getValue("ptPrefPH") : '';
		
		var ptPrefPassword = ptGetPassword();
	
		var ptJSON = document.createElement("script");
		ptJSON.type="text/javascript";
		ptJSON.src= ptServer + ptScript + "?action=ping&format=json&version="+ptVersionNumber;
		ptInsertPoint.appendChild(ptJSON);
	
		runPowerTwitter();
	}
}

// --------------------------------------------------------------------
// start the script

function runPowerTwitter()
{

// see if we have a logged in twitter user
ptLoadUser();

if ((!ptLoggedIn)||(ptGsTitle.indexOf('oauth') != -1)) // don't do anything else unless the user is logged in
{
        if(document.getElementById('ptStatus'))
        	document.getElementById('ptStatus').style.display = 'none';
}
else
{
	var ptFormData=''; // used to collect links and stuff to send down to the server
	
        // add the graphic "power" to the logo and hidden divs for settings, media
	var ptLogo = document.getElementById('top-bar');
        if(ptLogo)
        {
	        newElement = document.createElement('div');
		var ptFollowIcon = '@powertwitter';
		var ptSettingsIcon = 'settings';
		var ptHelpIcon = 'help';
		var ptSettingsStyle = 'font-size: 9px; z-index: 11; position: fixed; bottom: 0px; right: 0px; background-color: #eee; border-left: 1px solid #ccc; border-top: 1px solid #ccc; padding: 2px 11px 2px 8px;';
			
			var ptFollowIconSrc = 'data:image/png;base64,' +
				'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';			
			ptFollowIcon = '<img src="'+ptFollowIconSrc+'"/>';
			
			var ptHelpIconSrc = 'data:image/png;base64,' +
				'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';
			ptHelpIcon = '<img src="'+ptHelpIconSrc+'"/>';

			var ptSettingsIconSrc = 'data:image/png;base64,' +
				'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';
			ptSettingsIcon = '<img src="'+ptSettingsIconSrc+'"/>';

			ptSettingsStyle = 'padding: 3px 11px 2px 4px; font-size: 9px; z-index: 11; position: fixed; bottom: 0px; right: 0px; -moz-box-shadow:0 1px 2px rgba(0, 0, 0, 0.5); background:-moz-linear-gradient(center top , #CCCCCC, #EEEEEE) repeat scroll 0 0 transparent; background-color: #eee;';
                        

                var ptAuthLink = '<a href="'+ptServer + 'oauth.php?action=reset">Authenticate Power Twitter</a>';

                var ptAuthStatusHtml = '<span id="ptAuthStatusHtml">'+ptAuthLink+'</span>';
                
                var ptSettingsHtml =  '<div style="'+ptSettingsStyle+'">' +
			'<a href="http://twitter.com/powertwitter" title="Follow Power Twitter!">'+ptFollowIcon+'</a> ' +
			'<a id="ptSettingsLink" title="Power Twitter Settings" href="#">'+ptSettingsIcon+'</a> ' +
			'<a title="Help with Power Twitter" id="ptHelpLink" href="http://getsatisfaction.com/83degrees/products/83degrees_power_twitter">'+ptHelpIcon+'</a>' +
                        '</div><div id="ptStatus">'+ptWaitingGif+'</div><div id="ptSettings">' +
			'<div style="font-weight: bold;">You have the 3rd Party Power Twitter Add-On <br />' +
                        'Power Twitter Settings (v'+ptVersionNumber+') - <a href="http://getsatisfaction.com/83degrees/topics/uninstall_faq">Uninstall Help</a>' +
			'<div style="font-weight: normal;">Note: authenticating lets PT do more behind the scenes.</div>' +
			'</div><br /><table><tr><td valign="top">' +  ptAuthStatusHtml +
                        '<input type="hidden" id="ptSettingUserKey" />' + 
                        '<div style="display: none;">Username<br /><input disabled="true" '+
                        'type="text" style="color: #999; width: 110px;" id="ptSettingUsername" /><br />' +
			'Password<br /><input id="ptSettingPassword" type="password" size="14" /></div><br />' +
                        '<div style="margin: 8px 0px 8px 0px">Upload photos to:<br /><select id="ptSettingPH" name="ptSettingPH" style="margin-top: 3px;">'+
                        '</select><br /><input style="margin-top: 16px;" id="ptSettingSave" type="button" ' +
                        'class="ptButton" value="Save/Update" /> <input type="button" class="ptButton" style="margin-top: 16px;" value="Cancel" ' +
                        'onclick="document.getElementById(\'ptSettings\').style.display=\'none\'" /></div></td>' +
                        '<td valign="top"><input id="ptSettingRM" type="checkbox" style="display: none;" />' +
                        '<input id="ptSettingEX" type="checkbox" /> Powertwitter ON<br />' +
                        '<br />&nbsp;&nbsp;-<a id="ptClearCache" href="#">Clear Local Cache</a>' +
                        '</td></tr></table></div>';
                        
                        ptAuthIframe = '<iframe id="ptAuthStatusIframe" src="" ' +
			'width="180" height="40" scrolling="no" frameborder="0" /></iframe>';

                        ptSettingsHtml =  '<div style="'+ptSettingsStyle+'">' +
			'<a href="http://twitter.com/powertwitter" title="Follow Power Twitter!">'+ptFollowIcon+'</a> ' +
			'<a id="ptSettingsLink" title="Power Twitter Settings" href="#">'+ptSettingsIcon+'</a> ' +
			'<a title="Help with Power Twitter" id="ptHelpLink" href="http://getsatisfaction.com/83degrees/products/83degrees_power_twitter">'+ptHelpIcon+'</a>' +
                        '</div><div id="ptStatus">'+ptWaitingGif+'</div>' +
                        '<div id="ptSettings">' +
			'<div style="font-weight: bold;">You have the 3rd Party Power Twitter Add-On <br />' +
			'<div style="font-weight: bold;">Power Twitter Settings (v'+ptVersionNumber+')  - <a href="http://getsatisfaction.com/83degrees/topics/uninstall_faq">Uninstall Help</a>' +
			'<div style="font-weight: normal;">Authenticating lets PT do more behind the scenes!</div>' +
			'</div><table><tr><td valign="top">' +  ptAuthStatusHtml +
                        '<input type="hidden" id="ptSettingUserKey" />' + ptAuthIframe +
                        // not displayed
                        '<div style="display: none;">Username<br /><input disabled="true" '+
                        'type="text" style="color: #999; width: 110px;" id="ptSettingUsername" /><br />' +
			'Password<br /><input id="ptSettingPassword" type="password" size="14" /></div>' +
                        '<div style="margin: 8px 0px 8px 0px; display: none;">Upload photos to:<br /><select id="ptSettingPH" name="ptSettingPH" style="margin-top: 3px;">'+
                        '</select><br /><input style="margin-top: 16px;" id="ptSettingSave" type="button" ' +
                        'class="ptButton" value="Save/Update" /> <input type="button" class="ptButton" style="margin-top: 16px;" value="Cancel" ' +
                        'onclick="document.getElementById(\'ptSettings\').style.display=\'none\'" />' +
                        '</div>' +
                        //
                        '</td>' +
                        '<td valign="top">' +
                        '<input id="ptSettingRM" type="checkbox" style="display: none;" />' +
                        '<div class="ptToggleOuter" id="ptToggle" style="margin-top: 8px;"><div class="ptToggleInner" id="ptToggleInner">&nbsp;</div><span id="ptOnOff"></span></div>' +
                        '<input id="ptSettingEX" type="checkbox" style="display: none;" />' +
                        '</td></tr><tr><td align="left"><a id="ptCloseSettings" href="#" style="font-size: 11px;" onclick="document.getElementById(\'ptSettings\').style.display=\'none\'">Close Settings</a></td>' +
                        '<td align="right"><a id="ptClearCache" href="#" style="font-size: 11px;">Clear Local Cache</a></td></tr></table></div>';


                var ptFormsHtml = '' +
                        '<form id="ptPostLinkForm" name="ptPostLinkForm" ' +
                        'action="'+ptServer + ptScript + '" method="post">' +
                        '<input type="hidden" name="action" value="postLink" />' +
                        '<input type="hidden" name="ptPostLink" id="ptPostLink" value="" />' +
                        '</form>';
                        
                        
                newElement.innerHTML += ptSettingsHtml + ptFormsHtml;

                ptLogo.parentNode.insertBefore(newElement, ptLogo);
                document.getElementById('ptSettingsLink').addEventListener('click',ptShowSettings,true);
                document.getElementById('ptSettingSave').addEventListener('click',ptSaveSettings,true);
                document.getElementById('ptClearCache').addEventListener('click',ptClearCache,true);
                document.getElementById('ptToggle').addEventListener('click',ptToggle,true);

        }

        if(document.getElementById('ptSettingUsername'))
        	document.getElementById('ptSettingUsername').value = ptLoggedInUserName;

        // is status page?
        if(ptGsTitle.indexOf('/status/') != -1)
        {
                ptIsStatusPage = true;
        }
        
        // is search page?
        if(ptGsTitle.indexOf('search?q') != -1)
        {
                ptIsSearchPage = true;
        }

        // check for alerts
        if(ptGsTitle.indexOf('ptAlert=') != -1)
        {
                // show an alert
                var ptAlertRegExp = new RegExp(/.ptAlert=(.*)/);
                if(ptGsTitle.match(ptAlertRegExp))
                        alert(unescape(ptGsTitle.match(ptAlertRegExp)[1]));

        }

        // check for searches
        if(ptGsTitle.indexOf('ptQ=') != -1)
        {
                var ptSearchRegExp = new RegExp(/.ptQ=(.*)/);
                if(ptGsTitle.match(ptSearchRegExp))
                        location.href = 'http://twitter.com/search?q='+ptGsTitle.match(ptSearchRegExp)[1];
        }
	
	ptFormData += '&sViewingUser='+ptViewingUser+'&sLoggedInUser='+ptLoggedInUserName;

	// create an iframe for the page
	var ptIF, newElement;
	ptIF = document.getElementById('container');
	if (ptIF)
	{
		newElement = document.createElement('div');
		newElement.innerHTML = '<div id="ptIframeContainer"><iframe src="about:blank" width="220" height="280" id="ptIframe" scrolling="no" frameborder="0" /></div>';
		ptIF.parentNode.insertBefore(newElement, ptIF.nextSibling);
	}

	ptFormData += '&sViewingUser='+ptViewingUser+'&sLoggedInUser='+ptLoggedInUserName;

	ptInsertPromo();
	ptInsertMediaBar();

	// insert the search container
        thisUl = document.getElementById('primary_nav');
        if(     (thisUl)&&
                (ptGsTitle)&&
                (ptGsTitle != 'http://twitter.com/')&&
                (ptGsTitle != 'https://twitter.com/')&&
                (ptGsTitle.indexOf('favourites') == -1)&&
                (ptGsTitle.indexOf('favorites') == -1)&&
                (ptGsTitle.indexOf('#favorites') == -1)&&
                (ptGsTitle.indexOf('followers') == -1)&&
                (ptGsTitle.indexOf('following') == -1)&&
                (ptGsTitle.indexOf('public_timeline') == -1)&&
                (ptGsTitle.indexOf('direct_messages') == -1)&&
                (ptGsTitle.indexOf('#sent') == -1)&&
                (ptGsTitle.indexOf('#inbox') == -1)&&
                (ptGsTitle.indexOf('activity') == -1)&&
                (ptGsTitle.indexOf('#replies') == -1)&&
                (ptGsTitle.indexOf('replies') == -1)&&
                (ptGsTitle.indexOf('/#') == -1)&&
                (ptGsTitle.indexOf('status=') == -1)&&
                (!ptGsTitle.match(ptListRegExp))&&
                (ptGsTitle.indexOf('http://twitter.com/home') == -1 || ptGsTitle.indexOf('https://twitter.com/home') == -1)
                )
        {
                newElement = document.createElement('div');
		var ptSearchUserHtml = '';
                ptPromoDiv = (ptViewingUser) ? '<div id="ptPromoBlock"></div>' : '';
                ptSearchUserHtml = '<div style="margin-bottom: 3px;"><input type="hidden" id="ptThisUser" value="'+ptViewingUser+'" /><input type="checkbox" checked="checked" id="ptSearchRestrictUser" /> only ' + ptViewingUser + "'s updates</div>";
                // now insert an @reply link
                var allNavUls = document.evaluate(
                                '//ul[@class="sidebar-actions"]',
                                document,
                                null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                null);
                thisNavUl = allNavUls.snapshotItem(0);
                if(allNavUls.snapshotItem(0))
                {
                        var newAtReply = document.createElement('li');
                        newAtReply.innerHTML = "<a href='/?status=@"+ptViewingUser+" '>@reply</a> " + ptViewingUser;
                        thisNavUl.insertBefore(newAtReply,thisNavUl.firstChild);
                }

                if(ptViewingUser)
                {
                        addGlobalStyle('a#mentions_tab.hover, ul#tabMenu a:hover { background-image:url(http://static.twitter.com/images/pale.png) !important; }');
                        thisUl.innerHTML = thisUl.innerHTML + '<li id="ptMentions" style="display: block;"><a href="#" id="mentions_tab" style="background: none repeat scroll 0% 0%; margin-left:-1px; padding-left: 14px; cursor: pointer;">@'+ptViewingUser+'</a></li>';
                        document.getElementById('mentions_tab').addEventListener('click',ptGetUserMentions,true);                        
                        var allScreenNames = document.evaluate(
                                '//div[@class="screen-name"]',
                                document,
                                null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                null);
                        thisScreenName = allScreenNames.snapshotItem(0);
                        if(allScreenNames.snapshotItem(0))
                        {
                                thisScreenName.innerHTML += ' &nbsp;<a style="font-size: 12px; cursor: pointer;" id="ptMentionsLink">see replies @'+ptViewingUser+'</a>';
                                document.getElementById('ptMentionsLink').addEventListener('click',ptGetUserMentions,true);
			}                        
                }

                ptSbDisplay = 'block';
                if((ptPrefSB)&&(ptPrefSB.toString().indexOf('off') != -1))
                        ptSbDisplay = 'none';
		newElement.innerHTML = ptPromoDiv + '<div id="pt_search_container" style="display:'+ptSbDisplay +';text-align: right; width: 180px; margin: 0px auto 10px auto;"><form action="" onsubmit="return false;" id="ptSearchForm" method="get">' +
                        '<input style="margin: 0px 1px 4px 0px; width: 169px; padding: 3px;" autosave="com.twitter.search" id="ptSearchBox" name="ptSearchBox" placeholder="Enter your query" results="10" type="search" /><br />'+ptSearchUserHtml+'<input style="cursor: pointer;" type="button" id="ptSearchButton" value="Search" /></form></div>';
		thisUl.parentNode.insertBefore(newElement, thisUl);

        }
        
	// trap update form
	if((ptGsTitle)&&(ptGsTitle.indexOf('twitter.com/direct_messages') == -1))
        {
                ptUpdateButton = document.getElementById('update-submit');
                if(ptUpdateButton)
                        ptUpdateButton.addEventListener('click',ptUpdate,true);
        }


        // trap events with the new search form to process via ajax
        searchForm = document.getElementById('ptSearchForm');
        if(searchForm)
                searchForm.addEventListener('submit',ptPost, true);
        searchButton = document.getElementById('ptSearchButton');
        if(searchButton)
                searchButton.addEventListener('click',ptPost, true);


	// rewrite the home tab to enable a hard refresh
	var ptHomeTab = document.getElementById('home_tab');
	if (ptHomeTab)
		ptHomeTab.addEventListener('click',ptRefreshPage, true);

	// add @mentions
	ptRepliesTab = document.getElementById('replies_tab');
	var ptLastSearch = "@"+ptLoggedInUserName;
        document.getElementById('ptLastSearch').value = ptLastSearch;
	if(ptRepliesTab)
        {
                addGlobalStyle('ul#tabMenu a:hover { background-image:url(http://static.twitter.com/images/pale.png) !important; }');
                ptRepliesTab.parentNode.innerHTML = ptRepliesTab.parentNode.innerHTML + 
                '<li><a href="http://twitter.com/search?q=%23dailyquestion" class="in-page-link" style="padding-left: 14px;">#dailyquestion</a></li>';
        }

	// add the Power Twitter source to the update form
	ptUpdateSource = document.getElementById('source');
	if(ptUpdateSource)
		ptUpdateSource.value = 'powertwitter';

        // add a new more button and hide it at first
        if(document.getElementById('pagination'))
        {
                document.getElementById('pagination').innerHTML += '<div id="ptMoreContainer" style="display: none;"><div id="ptOlder" style="cursor: pointer;" class="ptMoreButton" />more</div></div>';
                document.getElementById('ptOlder').addEventListener('click',ptGetOlderResults,true);
        }

        ptAddCacheListeners();

        // ad an id to twitter promo link
        var allUrls = document.evaluate(
		"//a[@class='definition']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allUrls.snapshotLength; i++)
	{
		thisUrl = allUrls.snapshotItem(i);
                thisUrl.id = 'ptDefinitionPromo';
        }

        
        // add some global css
        addGlobalStyle('.ptMoreButton { -moz-border-radius-bottomleft:5px; -moz-border-radius-bottomright:5px; -moz-border-radius-topleft:5px; -moz-border-radius-topright:5px; background-color:#FFFFFF; background-image:url(http://static.twitter.com/images/more.gif); background-position:left top; background-repeat:repeat-x; border-color:#DDDDDD #AAAAAA #AAAAAA #DDDDDD; border-style:solid; border-width:1px; display:block; font-size:14px; font-weight:bold; height:22px; line-height:1.5em; margin:4px; outline-color:-moz-use-text-color; outline-style:none; outline-width:medium; padding:6px 0; text-align:center; text-shadow:1px 1px 1px #FFFFFF; width:98%; }');

	// put some functions on the page so we have access to them
	embedFunction(ptRelativeTime);
	embedFunction(ptShowHideShade);
	embedFunction(ptDisplayCenteredDiv);
	embedFunction(ptLogClick);
	embedFunction(ptLog);
	embedFunction(ptWait);
        embedFunction(ptIsImgUrl);
	embedFunction(getWinBottom);
	embedFunction(getWinHeight);
	embedFunction(getWinWidth);
	embedFunction(getWinLeft);
	embedFunction(getWinRight);
	embedFunction(getWinTop);
 	embedFunction(ptNewWindow);
	
        embedFunction(ptCbLinkExpand);
        embedFunction(ptCbMakeInsertions);
	
	
	exportGlobal('ptServer',ptServer);
	exportGlobal('ptScript',ptScript);
	exportGlobal('ptViewingUser',ptViewingUser);
	exportGlobal('ptLoggedInUserName',ptLoggedInUserName);
	exportGlobal('ptPrefPR',ptPrefPR);
	exportGlobal('ptPrefPH',ptPrefPH);
	exportGlobal('ptDefaultPhotoService',ptDefaultPhotoService);
        addGlobalStyle('.ptStreamLink {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAIAAABv85FHAAAALHRFWHRDcmVhdGlvbiBUaW1lAEZyaSAzMCBKdW4gMjAwNiAxMjo1MTo1MiAtMDAwMAcGCaoAAAAHdElNRQfWBh4LNwyi0YNgAAAACXBIWXMAAAsSAAALEgHS3X78AAAABGdBTUEAALGPC/xhBQAAAERJREFUeNp1j1EOADAEQxFHc2vuZpJl1lj2PqS0IjgzCYiI1jw8TCgGzWwbJapqj3rjtu6eB9SFvBt9RcYxROiPjp+QBSNmN/gDGx1UAAAAAElFTkSuQmCC);background-repeat: no-repeat; background-position: 99% 4px; border: 1px solid rgb(204, 204, 204) !important; -moz-border-radius: 3px !important; -webkit-border-radius: 3px !important; margin: 10px 0px 10px 10px !important; padding: 5px 10px 5px 5px !important; line-height: 1.1em !important; font-size: 11px !important;background-color: rgb(247, 247, 247) !important;}');

        ptLoadingMessage = '<li><div id="ptLoadingMessage">'+ptWaitingGif+' Loading...</div></li>';
	
        embedFunction('ptWait(function() {if (typeof jQuery == "undefined"){return false;}else {return true;}},function() {var originalAjaxMethod = jQuery.ajax; jQuery.ajax = function(){if(this(arguments)[0]["url"].indexOf("statuses/update") != -1){this(arguments)[0]["data"]["source"] = "powertwitter";}originalAjaxMethod.apply( this, arguments );};});');

	document.addEventListener("DOMNodeInserted", function(evt) {
		if(evt.target.getAttribute&&evt.target.getAttribute('class'))
		{
                        ptUpdateLinks(evt.target);
                        evt.target.setAttribute('processed',1);
		}
	}, true);

	ptGetUserData();
}


} // end main function -- runPowerTwitter

// ---------------------------------------------------------------------
// functions

function ptInsertMediaBar()
{
	if(document.getElementById('ptMediaInserted').value == 1)
		return;
	
	// insert a media bar for photos, etc.
	var ptMediaInsertPoint = document.getElementById('status');
	if(document.getElementById('ptMediaInserted').value == 0)
	{
		var allMatchingDivs = document.evaluate(
			"//div[@class='tweet-box-title']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		if (allMatchingDivs.snapshotItem(0))
		{
			ptMediaInsertPoint = allMatchingDivs.snapshotItem(0);
			document.getElementById('ptMediaInserted').value = 1;
		}
	}
	
}


function ptInsertPromo()
{
	if(document.getElementById('ptPromoInserted').value == 2)
		return;
	
	// step one insert a sidebar container
	var ptSideBarInsertPoint = document.getElementById('profile');
	if(document.getElementById('ptPromoInserted').value == 0)
	{
		var allDefinitionDivs = document.evaluate(
			"//div[@class='definition']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		if (allDefinitionDivs.snapshotItem(0))
		{
			ptSideBarInsertPoint = allDefinitionDivs.snapshotItem(0);
			document.getElementById('ptPromoInserted').value = 1;
//			GM_log('value ' + document.getElementById('ptPromoInserted').value);
		}
	}
	if (ptSideBarInsertPoint)
	{
		newElement = document.createElement('div');
		newElement.id = 'pt_sidebar_container';
                if(!ptViewingUser)
                        newElement.innerHTML = '<div id="ptPromoBlock"></div>';
		ptSideBarInsertPoint.parentNode.insertBefore(newElement,ptSideBarInsertPoint.nextSibling);
	}
	// step two is to insert the promo
	if(document.getElementById('ptPromoBlockData').value != '')
	{
                ptPromoBlockDiv = document.getElementById('ptPromoBlock');
                if (ptPromoBlockDiv)
                {
                        ptPrDisplay = 'block';
                        ptPromoBlockDiv.style.display = ptPrDisplay;
                        ptPromoBlockDiv.innerHTML = document.getElementById('ptPromoBlockData').value;
			document.getElementById('ptPromoInserted').value = 2;
                }		
	}
}


function ptLoadUser()
{
	// newtwitter        
	if(document.getElementById('screen-name'))
	{
		ptLoggedIn = true;
		ptLoggedInUserName = document.getElementById('screen-name').innerHTML;
                ptLoggedInUserName = ptLoggedInUserName.replace(/\n/gim,'');
		return;
	}
	
	// oldtwitter
	var ptMeta = document.getElementsByTagName("META");
        for(i=0;i<ptMeta.length;i++)
        {
                var ptMetaTag=ptMeta.item(i);
                if(ptMetaTag.name.toLowerCase() == 'session-user-screen_name' )
                {
                     ptLoggedInUserName = ptMetaTag.content;
                     ptLoggedIn = true;
                }
                else if(ptMetaTag.name.toLowerCase() == 'page-user-screen_name' )
                {
                        if (ptGsTitle.indexOf('/status/') != -1)
                        {
                                ptViewingUser = ptMetaTag.content;
                        }
                        else if ((ptGsTitle.indexOf('favourites' ) == -1)&&
                            (ptGsTitle.indexOf('favorites' ) == -1)&&
                            (ptGsTitle.indexOf('followers' ) == -1)&&
                            (ptGsTitle.indexOf('following' ) == -1)&&
                            (ptGsTitle.indexOf('#favorites' ) == -1)&&
                            (ptGsTitle.indexOf('public_timeline' ) == -1)&&
                            (ptGsTitle.indexOf('direct_messages' ) == -1)&&
                            (ptGsTitle.indexOf('#inbox' ) == -1)&&
                            (ptGsTitle.indexOf('#sent' ) == -1)&&
                            (ptGsTitle.indexOf('activity' ) == -1)&&
                            (ptGsTitle.indexOf('replies' ) == -1)&&
                            (ptGsTitle.indexOf('#replies' ) == -1)&&
                            (!ptGsTitle.match(ptListRegExp))&&
                            (ptGsTitle.indexOf('/#' ) == -1))
                        {
                                ptViewingUser = ptMetaTag.content;
                                ptIsUserPage = true;
                        }
                }
        
        }
}

function ptAddCacheListeners()
{
        // make sure certain links will intelligently update the local cache
        // this also happens at other opportune moments
        if(document.body&&ptTransferCache)
                document.body.addEventListener('click',ptTransferCache,true);        

}


function ptUpdateLinks(forThisNode)
{
	// if replace links setting is on, then collect all the links to process them
//        if (forThisNode == document)
//                forThisNode = document;
//	GM_log('updating links - '+ forThisNode.parentNode.parentNode.parentNode.parentNode.getAttribute('class'));        
                if(forThisNode.getAttribute('class').indexOf('query-token') != -1)
                        return;
                if(forThisNode.title.indexOf('http://') != -1)
                        return;
                if(forThisNode.getAttribute('processed'))
                        return;
                
                forThisNode.setAttribute('processed',1);

        	if((forThisNode.parentNode)&&(forThisNode.parentNode.className.indexOf('tweet-media') != -1))
        	{
        		forThisNode.parentNode.style.display = 'none';
        	}

        if(ptPrefEX.toString().indexOf('on') != -1)  
        {
                var ptAllLinks = document.evaluate(
                        '//a[@href]',
                        forThisNode,
                        null,
                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                        null);
//                GM_log(ptAllLinks.snapshotLength);
//                GM_log(forThisNode.className);
                
                for (var i = 0; i < ptAllLinks.snapshotLength; i++)
                {
                        
                        ptThisLink = ptAllLinks.snapshotItem(i);
                        
                        
                        // do something with thisLink
                        if ((ptThisLink.target == '_blank')||(location.href.indexOf('search?') != -1))
                        {
                                if(ptThisLink.rel.indexOf('me') != -1)
                                        continue;
                                if(ptThisLink.title && ptThisLink.title == '.')
                                        continue;
                                // don't reprocess anything!
                                if(ptThisLink.getAttribute('processed')||
                                   ptThisLink.parentNode.getAttribute('processed')||
                                   ptThisLink.parentNode.parentNode.getAttribute('processed'))
                                {
                                        continue;
                                }
                                // multithreaded script insertions
                                // do not replace: twitter, links that have already been done, or the help link
                                if((ptThisLink.href.indexOf('twitter.com') != -1)||
                                   (ptThisLink.href.indexOf('oauth.php') != -1)||
                                   (ptThisLink.id.indexOf('ptLink_') != -1)||
                                   (document.getElementById('ptDoNotParse').value.indexOf(ptThisLink.href) != -1)||
                                   (ptThisLink.href.indexOf('javascript') != -1)||
                                   (ptThisLink.className.indexOf('definition') != -1)||
                                   (ptThisLink.className.indexOf('noparse') != -1)||
                                   (ptThisLink.className.indexOf('geocoded') != -1)||
                                   (ptThisLink.className.indexOf('media-attribution-link') != -1)||
                                   (ptThisLink.className.indexOf('inline-media') != -1)||
                                   (ptThisLink.className.indexOf('profile-picture') != -1)||
                                   (ptThisLink.rel == 'nofollow')&&(ptThisLink.target != '_blank')||
                                   (ptThisLink.id == 'ptHelpLink'))
                                        continue;
                                        if (ptThisLink.parentNode.getAttribute('class')&&ptThisLink.parentNode.getAttribute('class').indexOf('user-info') != -1)
                                                continue;

                                        if (ptThisLink.parentNode.parentNode.parentNode.parentNode.getAttribute('class')&&ptThisLink.parentNode.parentNode.parentNode.parentNode.className.indexOf('latest-tweet') != -1)
                                                continue;        

                                ptThisLink.setAttribute('processed','1');
                                ptThisLink.id = 'ptLink_' + i;
                                ptThisLink.innerHTML = ptWaitingGif + ptThisLink.innerHTML;
//                                GM_log('link ' + ptThisLink.href);
                                
                                // now check the cache
                                if((ptCache)&&(ptCache[ptThisLink.href]))
                                {
//                                        ptJsonObj = eval( "(" + ptCache[ptThisLink.href] + ")" );
                                        try {
                                                JSON.parse(ptCache[ptThisLink.href]);
                                        }
                                        catch(e) {
                                                continue;
                                        }

                                        ptJsonObj = JSON.parse(ptCache[ptThisLink.href]);
                                        if(ptJsonObj !== undefined)
                                        {
                                                var ptReplacementHtml = ptJsonObj.results;
                                                var ptNum = ptJsonObj.num;
                                                var ptType = ptJsonObj.type;
                                                var ptOriginalUrl = ptJsonObj.url;
                                        
                                                if(ptType == 'generic')
                                                {
                                                        ptThisLink.innerHTML = ptReplacementHtml;
                                                }
                                                else
                                                {
                                                        var ptReplaceWith = document.createElement("div");
                                                        ptReplaceWith.setAttribute('processed','1');
                                                        ptThisLink.parentNode.replaceChild(ptReplaceWith,ptThisLink);
                                                        ptReplaceWith.innerHTML = ptReplacementHtml;
                                                        if(ptOriginalUrl)
                                                        {
                                                                ptReplaceWith.title = ptOriginalUrl;
                                                                ptReplaceWith.addEventListener('mousedown',ptLogClick,true);
                                                        }
                                                }
                                                continue;
                                        }                                
                                }
                                
                                var ptPreferences = '';
                                if(ptPrefEX.toString().indexOf('off') != -1)
                                        ptPreferences += '&ptPrefEX=off';
                                if(ptPrefRM.toString().indexOf('off') != -1)
                                        ptPreferences += '&ptPrefRM=off';
        
                                var twitter_JSON = document.createElement("script");
                                twitter_JSON.type="text/javascript";
                                var ptLinkParseService = ptServer + ptScript;
                                if(document.getElementById('ptLinkParseService').value != '')
                                        ptLinkParseService = document.getElementById('ptLinkParseService').value;
//                                ptLinkParseService = 'http://localhost:8080/map.powertwitter/';
                                twitter_JSON.src= ptLinkParseService + "?action=parseLink&version="+ptVersionNumber+"&format=json&linkNumber="+i+ptPreferences+"&url="+escape(ptThisLink.href);
                                document.getElementsByTagName("head")[0].appendChild(twitter_JSON);
        
                                ptThisLink.addEventListener('mousedown',ptLogClick,true);
                        }
                }
        }
                ptInsertPromo();
        	ptInsertMediaBar();                
	document.getElementById('ptLinkUpdateStatus').value = 1;

}

function ptGetUserData()
{
	// check for dynamic insertions
//	if (ptFormData.length > 1)
//	{
		var ptPreferences = '';
                if(ptPrefEX.toString().indexOf('off') == -1)
                        ptPreferences += '&ptPrefEX=off';
                if(ptPrefRM.toString().indexOf('off') == -1)
                        ptPreferences += '&ptPrefRM=off';
                ptFormData = '&sViewingUser='+ptViewingUser+'&sLoggedInUser='+ptLoggedInUserName+ptPreferences;

                var twitter_JSON = document.createElement("script");
                twitter_JSON.type="text/javascript";
                twitter_JSON.src= ptServer + ptScript + "?agent="+ptAgent+"&action=userPage&version="+ptVersionNumber+'&'+ptFormData;
                document.getElementsByTagName("head")[0].appendChild(twitter_JSON);
//	}
//	else
//	{
//                ptStatusDiv = document.getElementById('ptStatus');
//		if(ptStatusDiv)
//			ptStatusDiv.style.display = 'none';
//	}

}

function ptRefreshPage(ptType)
{
        if(ptType == 'hard')
                document.location.href = 'http://twitter.com/';
        else if(ptGsTitle)
        {
                if(ptGsTitle.indexOf('ptAlert=') != -1)
                {
                	document.location.href = 'http://twitter.com/';
                }
                else if(ptGsTitle.indexOf('ptQ=') != -1)
                {
                	document.location.href = 'http://twitter.com/';
                }
                else if(ptGsTitle == 'http://twitter.com/#')
                {
                	document.location.href = 'http://twitter.com/';
                }
                else
                {
                        ptPage = ptGsTitle.replace('http://twitter.com/','');
                        ptPage = ptGsTitle.replace('https://twitter.com/','');
                        ptPage = ptPage.replace('#','');
                	document.location.href = 'http://twitter.com/'+ptPage;
                }

        }
        else
        	document.location.href = 'http://twitter.com/';
}

function ptToggle()
{
        if(ptPrefEX.toString().indexOf('off') == -1)
        {
                if(document.getElementById('ptOnOff'))
                {
                        document.getElementById('ptOnOff').innerHTML = 'OFF';
                        document.getElementById('ptToggleInner').style.cssFloat = 'right';
                        document.getElementById('ptToggle').style.paddingLeft = '4px';
                        document.getElementById('ptToggle').style.paddingRight = '0px';
                }
                GM_setValue("ptPrefEX","off");
                ptPrefEX = 'off';
        }
        else
        {
                if(document.getElementById('ptOnOff'))
                {
                        document.getElementById('ptOnOff').innerHTML = '&nbsp;&nbsp;ON';
                        document.getElementById('ptToggleInner').style.cssFloat = 'left';
                        document.getElementById('ptToggle').style.paddingLeft = '0px';
                        document.getElementById('ptToggle').style.paddingRight = '4px';
                }
                GM_setValue("ptPrefEX","on");
                ptPrefEX = 'on';
        }
}

function ptSaveSettings()
{

        var ptCloseWindow = 'none';
        var ptSaving = 0;

        if (document.getElementById('ptSettingEX').checked)
                GM_setValue("ptPrefEX","on");
        else
                GM_setValue("ptPrefEX","off");
                
        if (document.getElementById('ptSettingPH'))
        {
                GM_setValue("ptPrefPH",document.getElementById('ptSettingPH').value);
        }
        
        ptRefreshPage('hard');

}

function ptGetPassword()
{
        if(GM_getValue("ptPrefPassword"))
        {
                var ptUserPass = GM_getValue("ptPrefPassword").split('|');
                return ptUserPass[1];
        }
        else
                return '';
}


function ptShowSettings()
{
//        if(ptPrefRM.toString().indexOf('off') == -1)
//                document.getElementById('ptSettingRM').checked = 'true';
        if(ptPrefEX.toString().indexOf('off') == -1)
        {
                document.getElementById('ptSettingEX').checked = 'true';
                        document.getElementById('ptToggleInner').style.cssFloat = 'left';
                        document.getElementById('ptOnOff').innerHTML = '&nbsp;&nbsp;ON';
                        document.getElementById('ptToggle').style.paddingLeft = '0px';
                        document.getElementById('ptToggle').style.paddingRight = '4px';
        }
        else
        {
                        document.getElementById('ptToggleInner').style.cssFloat = 'right';
                        document.getElementById('ptOnOff').innerHTML = 'OFF';
                        document.getElementById('ptToggle').style.paddingLeft = '4px';
                        document.getElementById('ptToggle').style.paddingRight = '0px';
                
        }
//        if(ptPrefSB.toString().indexOf('off') == -1)
//                document.getElementById('ptSettingSB').checked = 'true';
//        if(ptPrefPR.toString().indexOf('off') == -1)
//                document.getElementById('ptSettingPR').checked = 'true';
                
        if(document.getElementById('ptSettingPH'))
        {
                var ptAServiceOptions = document.getElementById('ptPhotoServiceOptions').value.split('|');
                var ptOptionHtml = '';
                for(i=0;i<ptAServiceOptions.length;i++)
                {
                        ptService = ptAServiceOptions[i];
                        ptOptionHtml += '<option value="'+ptAServiceOptions[i]+'" id="pt_'+ptAServiceOptions[i]+'">'+ptAServiceOptions[i]+'</option>';
                }
                document.getElementById('ptSettingPH').innerHTML = ptOptionHtml;
                
        }
        
        if((ptPrefPH !== undefined)&&(ptPrefPH.toString()))
                document.getElementById('pt_'+ptPrefPH.toString()).selected = 'true';
        else
                document.getElementById('pt_'+document.getElementById('ptDefaultPhotoService').value).selected = 'true';
                

        if (document.getElementById('ptSettingPassword') !== undefined)
        {
                 document.getElementById('ptSettingPassword').value = ptPrefPassword;
        }
        
        if(document.getElementById('ptAuthStatusIframe'))
                document.getElementById('ptAuthStatusIframe').src = ptServer + ptScript + '?action=authForm';
        document.getElementById('ptSettings').style.display = 'block';
}

function ptUpdate(evt)
{
        // when update button is pushed this fork lets us log
        // and then wait so we can embed the media if needed
	ptLog('action=ptLog&type=update&sLoggedInUser='+ptLoggedInUserName);
        // if img/media preview - clear it
        if(document.getElementById('ptImgThumb'))
        {
                document.getElementById('ptImgThumb').style.display = 'none';
                document.getElementById('status').style.width = '508px';
        }
        ptTransferCache();
        ptWait(
                function(){ return document.getElementById('status').value ==''},
                function(){ ptUpdateLinks(document); }
        );
}

function ptLogClick()
{
        if(this.href)
                ptLog('action=ptLog&type=click&sLoggedInUser='+ptLoggedInUserName+'&sViewingUser='+ptViewingUser+'&url='+this.href);
        else if(this.title)
                ptLog('action=ptLog&type=click&sLoggedInUser='+ptLoggedInUserName+'&sViewingUser='+ptViewingUser+'&url='+this.title);
}

function ptLog(ptData)
{
        var pt_LOG = document.createElement("script");
	pt_LOG.type="text/javascript";
	pt_LOG.src= ptServer + ptScript + '?' + ptData;;
	document.getElementsByTagName("head")[0].appendChild(pt_LOG);
        ptTransferCache();
}

function ptPost() // ajax engine for getting and displaying search results
{
	if(document.getElementById('ptSearchBox').value.length == 0)
	{
		alert('Please enter a search term!');
		return;
	}

	resultsContainer = document.getElementById('ptSearchResults');
	ptQ = document.getElementById('ptSearchBox').value;
        ptQ = ptQ.replace('#','%23');
	var ptRestrictTo = '';
	if((document.getElementById('ptSearchRestrictUser'))&&(document.getElementById('ptSearchRestrictUser').checked)) // restrict search to the twitter page user
	{
		ptRestrictTo = document.getElementById('ptThisUser').value;
                document.getElementById('ptRestrictedSearch').value = ptRestrictTo;
	}
        document.getElementById('ptLastSearch').value = ptQ;
        document.getElementById('ptPageNumber').value = 1;

	// log
	ptData = 'q='+ptQ+'&action=ptLog&type=search&sLoggedInUser='+ptLoggedInUserName+'&sViewingUser='+ptViewingUser;
        ptLog(ptData);

        // display
	ptGetSearchResults(ptQ,1,ptRestrictTo);
	return;

}

function ptWait(c,f)
{
        if (c())
                f()
        else
                window.setTimeout(function () { ptWait(c,f) }, 50, false);
}

function ptToggleLoadingMessage(ptClear)
{
        if(ptClear)
        {
                if(document.getElementById('timeline'))
                        document.getElementById('timeline').innerHTML = ptLoadingMessage;
        }
        else
        {
                if(document.getElementById('timeline'))
                        document.getElementById('timeline').innerHTML = ptLoadingMessage + document.getElementById('timeline').innerHTML;
       
                if(document.getElementById('results_update'))
                        document.getElementById('results_update').style.display = 'none';
        }
        
}

function ptUnHighlightTab(id)
{
        if(document.getElementById(id))
        {
                document.getElementById(id).firstChild.style.fontWeight = 'normal';
                document.getElementById(id).firstChild.style.background = 'transparent';
                document.getElementById(id).style.background = 'transparent';
        }
}

function ptHighlightTab(id)
{
        document.getElementById(id).style.background = '#f7f7f7';
        document.getElementById(id).firstChild.style.background = '#f7f7f7';
        document.getElementById(id).firstChild.style.fontWeight = 'bold';
}

function ptResetMaxIds(id)
{
        var ptAMaxIdTitles = new Array('ptInteresting');
        for (i=0;i<ptAMaxIdTitles.length;i++)
        {
                if(id != ptAMaxIdTitles[i])
                {
                        if(document.getElementById(ptAMaxIdTitles[i]+'MaxId'))
                                document.getElementById(ptAMaxIdTitles[i]+'MaxId').value = '0';                        
                }
        }
}                

// utility functions

function logToConsole(s)
{
	var logger = document.createElement("script");
        logger.src= 'http://localhost:8081/abc/write/?logthis=' + s;
        document.getElementsByTagName("head")[0].appendChild(logger);
}

function embedFunction(s)
{
	var ptScriptObject = document.createElement('script');
	ptScriptObject.type = "text/javascript";
	document.body.appendChild(ptScriptObject).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function exportGlobal(name,value)
{
	embedFunction("var "+ name +" = '" + value + "';");
}

function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function ptIsImgUrl(s)
{
        if(s&&s.indexOf('flickr.com') != -1)
                return true;
        else if(s&&s.indexOf('twitpic') != -1)
                return true;
        else if(s&&s.indexOf('yfrog') != -1)
                return true;
        else
                return false;
}

function ptRelativeTime(time_value)
{
	var parsed_date = Date.parse(time_value);
	var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	if(delta < 60) {
		return 'less than a minute ago';
	} else if(delta < 120) {
		return 'about a minute ago';
	} else if(delta < (45*60)) {
		return (parseInt(delta / 60)).toString() + ' minutes ago';
	} else if(delta < (90*60)) {
		return 'about an hour ago';
	} else if(delta < (24*60*60)) {
		return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
	} else if(delta < (48*60*60)) {
		return '1 day ago';
	} else if(delta < (48*60*60*7)) {
		return (parseInt(delta / 86400)).toString() + ' days ago';
	} else {
		ptOldDate = new Date(parsed_date);
		return ptOldDate.toString();
	}
}

function getWinWidth()
{
	if (window.innerWidth)
	{
		w = window.innerWidth;
		if (document.body.scrollHeight && document.body.scrollHeight >= getWinHeight())
			w-=16;
		return w;
	}
	else if (document.documentElement && document.documentElement.clientWidth)
		return document.documentElement.clientWidth;
	else if (document.body && document.body.clientWidth)
		return document.body.clientWidth;
	else if (document.body && document.body.parentNode && document.body.parentNode.clientWidth)
		return document.body.parentNode.clientWidth;

	return false;
}

function getWinHeight()
{
	if (window.innerHeight) return window.innerHeight;
	else if (document.documentElement && document.documentElement.clientHeight)
		return document.documentElement.clientHeight;
	else if (document.body && document.body.clientHeight)
		return document.body.clientHeight;
	else if (document.body && document.body.parentNode && document.body.parentNode.clientHeight)
		return document.body.parentNode.clientHeight;
	return false;
}

function ptShowHideShade(id, displayMode) // block or none
{
	el = document.getElementById(id);

	if (!el || el.style.display == displayMode)
		return;

	if (displayMode == 'block')
	{
		var biggestHeight = document.body.scrollHeight;
		if (getWinHeight() > biggestHeight)
			biggestHeight = getWinHeight();

		el.style.width=document.body.scrollWidth+'px';
		el.style.height=biggestHeight+'px';
	}

	el.style.display = displayMode;
}

function ptDisplayCenteredDiv(el,offsetTop)
{
	el.style.display = 'inline';
	winTop = getWinTop();
	if (offsetTop > 20)
		el.style.top = winTop + offsetTop + 'px';
	else
		el.style.top = winTop + 20 + 'px';
	el.style.left= (getWinWidth()/2 - el.offsetWidth/2)/2 +'px';
	el.style.visibility = 'visible';
}

function getWinLeft() {return typeof window.pageXOffset != 'undefined' ? window.pageXOffset:document.documentElement && document.documentElement.scrollLeft? document.documentElement.scrollLeft:document.body.scrollLeft? document.body.scrollLeft:0;}
function getWinTop() {return typeof window.pageYOffset != 'undefined' ? window.pageYOffset:document.documentElement && document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop?document.body.scrollTop:0;}
function getWinRight() {return getWinLeft()+getWinWidth();}
function getWinBottom() {return getWinTop()+getWinHeight();}

function ptNewWindow(url,name,w,h,scroll,additionalSettings)
{
  var left = (screen.width-w)/2;
  var top = (screen.height-h)/2;
  var settings  ='height='+h+',';
      settings +='width='+w+',';
      settings +='top='+top+',';
      settings +='left='+left+',';
      settings +='resizable,scrollbars,';
  win = window.open(url,name,settings+additionalSettings);
  win.focus();
}

function ptStringify(o)
{
        return JSON.stringify(o);       
}

function ptClearCache()
{
        var _cache = {};
//        GM_setValue('cache', _cache.toSource());
        ptShowCache();
        GM_setValue('cache', '');
        ptCache = _cache;
        alert("The Power Twitter Link Cache has been cleared.");
}

function ptShowCache()
{
        var _counter = 0;
        GM_log('==== Cached URLs are shown below: ====');
        for (key in ptCache) {
            GM_log(key + ' --> ' + ptCache[key]);
            _counter++;
        }
//        GM_log(document.getElementById('ptIncomingCache').value);
//        GM_log('saved value is '+ GM_getValue('cache'));
        GM_log('====  These ' + _counter + ' URLs are cached. ====');
}
//GM_registerMenuCommand("Show Power Twitter Cache", ptShowCache);

function ptTransferCache()
{
        // look for incoming cache and then merge and save
        GM_log('transferring cache...');
        var ptIncomingCache = {};
        ptIncomingStrings = document.getElementById("ptIncomingCache").value.split('|||');
//        GM_log(ptIncomingStrings);
        for(i=0;i<ptIncomingStrings.length;i++)
        {
                if(ptIncomingStrings[i].length > 10)
                {
//                        ptJsonObj = eval( "(" + ptIncomingStrings[i] + ")" );
                        try {
                                JSON.parse(ptIncomingStrings[i]);
                        }
                        catch(e) {
                                return;
                        }
                        ptJsonObj = JSON.parse(ptIncomingStrings[i]);
                        if(ptJsonObj.url !== undefined)
                        {
//                                GM_log(ptJsonObj.url);
                                ptIncomingCache[ptJsonObj.url] = ptIncomingStrings[i];
                        }
                }
        }
        for (key in ptIncomingCache)
        {
                if(ptCache)
                {
                        ptCache[key] = ptIncomingCache[key];
//                        GM_log('adding '+key);
                }
                else
                {
                        ptCache = {};
                        ptCache[key] = ptIncomingCache[key];
//                        GM_log('adding first '+key);
                }
        }
	if(ptCache)
        {
//                GM_log('saving cache in browser');
//                GM_log('string ' + ptStringify(ptCache));
                GM_setValue('cache', ptStringify(ptCache));
//              GM_setValue('cache', ptCache.toSource());
        }

//        ptShowCache();

}

function ptInitCache()
{
        var _cache = GM_getValue('cache');
        if ((typeof _cache == 'undefined')||(_cache == '')||(_cache == null))
        {
//                GM_log('cache was undefined');
                _cache = {};
        }
        else
        {
//                GM_log('cache ' + _cache);
//                _cache = eval(_cache);
                try {
                        JSON.parse(_cache)
                }
                catch(e)
                {
                        var _cache = {};
                        ptShowCache();
                        GM_setValue('cache', '');
                        ptCache = _cache;
                }
                
                _cache = JSON.parse(_cache);
         
                var _counter = 0;
                for (c in _cache) _counter++;
         
                var maxlength = ptMaxCacheCount;
                if(document.getElementById('ptMaxCacheCount'))
                        maxlength = document.getElementById('ptMaxCacheCount').value;
                        
//                GM_log('max cache count is '+maxlength);

                var oversize =  _counter - maxlength;
                if (oversize > 0)
                {
                        var __cache = {};
                        for (key in _cache)
                                if (oversize > 0)
                                        oversize--;
                                else
                                        __cache[key] = _cache[key];
                        _cache = __cache;
                }
        }
        return _cache;
}

function ptCbError(ptErrorString)
{
        document.getElementById('ptLinkUpdateStatus').value = 0;
        if(document.getElementById('more'))
                document.getElementById('more').style.display = 'none';
        if(document.getElementById('search_more'))
                document.getElementById('search_more').style.display = 'none';
        if(document.getElementById('timeline'))
	{
                var ptLi = document.createElement("li");
		ptLi.id = 'ptErrorMsg';
		ptLi.innerHTML = ptErrorString;
		document.getElementById('timeline').appendChild(newElement);
	}
        else
                alert(ptErrorString);
}

function ptCbMakeInsertions(ptJsonObj)
{
        var bHasUpdates = ptJsonObj.bHasUpdates;
        var sCustomMessage = ptJsonObj.sCustomMessage;
        var sPromoBlock = ptJsonObj.sPromoBlock;
        var sQuestion = ptJsonObj.sQuestion;
        var sQStart = ptJsonObj.sQStart;
        var sPhotoHost = ptJsonObj.sPhotoDefaultService;
        var sPhotoServices = ptJsonObj.sPhotoServiceOptions;
	var sUserKey = ptJsonObj.sUserKey

        if (sCustomMessage)
        {
                ptMessageDiv = document.getElementById('ptCustomMessage');
                if (ptMessageDiv)
                {
                        ptMessageDiv.style.display = 'block';
                        ptMessageDiv.innerHTML = sCustomMessage;
                }
         }
         if (sPromoBlock)
         {
                ptPromoBlockDiv = document.getElementById('ptPromoBlock');
                if (ptPromoBlockDiv)
                {
                        ptPrDisplay = 'block';
                        ptPromoBlockDiv.style.display = ptPrDisplay;
                        ptPromoBlockDiv.innerHTML = sPromoBlock;
                }
		else // store it until the div is available
		{
			document.getElementById('ptPromoBlockData').value = sPromoBlock;
		}
         }
        if (sQuestion)
        {
                if(document.getElementById('ptqod'))
		{
                        document.getElementById('ptqod').innerHTML = sQuestion;
			document.getElementById('ptqod').style.display = 'block';
		}
		else // store it until the div is available
		{
			document.getElementById('ptPromoQodData').value = sQuestion;
		}
        }
        if (sQStart)
        {
                if(document.getElementById('ptqod_start'))
                        document.getElementById('ptqod_start').value = sQStart;
		else // store it until the div is available
		{
			document.getElementById('ptPromoQodStartData').value = sQStart;
		}
        }

        if (sPhotoHost)
        {
                if(document.getElementById('ptDefaultPhotoService'))
                        document.getElementById('ptDefaultPhotoService').value = sPhotoHost;
        }
        if (sPhotoServices)
        {
                if(document.getElementById('ptPhotoServiceOptions'))
                        document.getElementById('ptPhotoServiceOptions').value = sPhotoServices;
        }
	if (sUserKey)
	{
		if(document.getElementById('ptSettingUserKey'))
		{
			var sLogoutLink = '<a href=\'javascript:document.getElementById("ptAuthStatusHtml").innerHTML = "Sign out requested";' +
			'ptNewWindow("' + ptServer + 'oauth.php?action=logout&sLogoutUser='+ptLoggedInUserName+'&sUserKey='+sUserKey+'","",800,500);\'>Sign out</a>'
			var sLogoutLink = '<a href="'+ptServer + 'oauth.php?action=logout&sLogoutUser='+ptLoggedInUserName+'&sUserKey='+sUserKey+'">Sign out</a>';

			document.getElementById('ptSettingUserKey').value = sUserKey;
			document.getElementById('ptAuthStatusHtml').innerHTML = 'Authenticated! ' + sLogoutLink;
		}
	}
         ptStatusDiv = document.getElementById('ptStatus');
         if(ptStatusDiv)
         {
                 ptStatusDiv.style.display = 'none';
         }


}

function ptCbLinkExpand(ptJsonObj)
{
        var ptReplacementHtml = ptJsonObj.results;
        var ptNum = ptJsonObj.num;
        var ptType = ptJsonObj.type;
        var ptOriginalUrl = ptJsonObj.url;

	if (document.getElementById('ptLink_'+ptNum))
	{
		ptThisLink = document.getElementById('ptLink_'+ptNum);
                if(ptType == 'generic')
                {
        		ptThisLink.innerHTML = ptReplacementHtml;
                        ptThisLink.setAttribute('processed','1');
                }
                else
                {
                        var ptReplaceWith = document.createElement("div");
                        ptReplaceWith.setAttribute('processed','1');
                        ptThisLink.parentNode.replaceChild(ptReplaceWith,ptThisLink);
                        ptReplaceWith.innerHTML = ptReplacementHtml;
                        if(ptOriginalUrl)
                        {
                                ptReplaceWith.title = ptOriginalUrl;
                                ptReplaceWith.addEventListener('mousedown',ptLogClick,true);
                        }
                }
		if(document.getElementById('ptIncomingCache'))
			document.getElementById('ptIncomingCache').value += JSON.stringify(ptJsonObj) + "|||";
        }

}


// end
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ChangeLog
// 2007-03-14 - 0.1 - first release
// 2007-03-16 - 0.2
// 2008-11-13 - 0.9 - submitting Power Twitter to Mozilla repository
// 2008-12-13 - 1.0 - full upgrade and update (added search and peek)
// 2009-01-05 - 1.01 - fix & posting bug
// 2009-01-14 - 1.02 - fix escaped character bug that truncated and didn't allow international characters
// 2009-02-03 - 1.03 - twitter.com update broke some features, emergency update
// 2009-02-22 - 1.1 - major update including settings, photo posting, link shortening, multi threaded
// 2009-03-01 - 1.12 - minor tweaks to fix bugs
// 2009-03-12 - 1.13/4 - dropped kill switch for speed, upgraded for new facebook page, showing media on new twitter search, fixed in_reply_to
// 2009-03-18 - 1.15/6 - restored ajax updating, replaced some GM xhttp in favor of script appends.  Updated for new twitter pagination
// 2009-03-23 - 1.17 - more fixes for twitter and facebook updates
// 2009-03-28 - 1.18 - refactoring for speed, facebook profile pics added
// 2009-04-02 - 1.19 - updating for the next version of twitter, removed @mentions
// 2009-04-26 - 1.20/1 - bug fixes, Interesting tab, backend improvements for speed
// 2009-05-01 - 1.22 - updates to the profile page
// 2009-06-25 - 1.30 - major update, https support, top friends, fixed some search box bugs, added yfrog, question of the day, open links in new windows, settings
// 2009-07-01 - 1.31 - minor bug fixes
// 2009-07-02 - 1.32 - fixed bugs with link updating after searching
// 2009-07-28 - 1.33 - the universal multi browser edition. pushed ptCbX functions to server, allows sync of Top Friends, fixed several bugs
// 2009-09-21 - 1.34 - lots of bug fixes
// 2009-10-08 - 1.35 - critical bug fix
// 2009-10-15 - 1.36 - added local cache, additional bug fixes
// 2009-11-01 - 1.37 - emergency bug fixes
// 2010-08-20 - 1.40 - FIRST CHROME RELEASE streamlining and oauth, removed Facebook, Interesting, Top Friends
// 2010-09-28 - 1.50 - unified userscript for all versions
// 2010-11-03 - 1.52 - minor bug fix
// 2011-03-27 - 1.70 - ready for ff4.0 and some cosmetic clean up
// 2011-10-24 - 1.80 - removing uploading and other links as twitter now does them, bug fixes


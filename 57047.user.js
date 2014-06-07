// ==UserScript==
// @name          Facebook Auto Redirect back to requests
// @namespace     far2r
// @author        LeoXavior
// @description	  Redirects you back to the requests page after you click to accept anything, helps to clear notiifications.
// @version       1.1.6
// @include       http://www.facebook.com/*
// @include       http://apps.facebook.com/*
// @include       http://apps.new.facebook.com/*
// @credit        Joe Simmons, some idea's taken from his Facebook Mass Accept Requests script
// @credit        Jordon Kalilich, Adapted the clean url function from his URL cleaner script
// @history       1.1.6 Tossed out the old checkURL and wrote my own as a standalone requirement, fixes several issues, please update to this version asap.
// @history       1.1.5 Alot of small changes, most noticably the includes and fixed the url cleaning a bit.
// @history       1.1.4 Reworked the AddButton() code is cleaner, added a in built update function
// @history       1.1.3 Adding Chrome support
// @history       1.1.2 Updated the 'Enable' button so works where it should, also re-enabled the script updater
// @history       1.1.1 Rewrote several parts of the script to more genericaly detect if your on a request page or not (searches for: action="/ajax/reqs.php"), removed the updating code temporarily.
// @history       1.1.0 updated the updating methods
// @history       1.0.9 updated to reflect changes on facebook to fix finding the AppID on app pages
// @history       1.0.8 minor cleanup and restyled the html/button on reqs.php
// @history       1.0.7 cleaned up a few things only rewriting urls on reqs.php now (no fuss on other area's of facebook)
// @history       1.0.6 nixed old rewrite methods Thanks to Jordon Kalilich for his clean url script :) 
// @history       1.0.5 fixed some minor annoyances with the url rewriting
// @history       1.0.4 updated the script to rewrite urls on reqs.php
// @history       1.0.3 updated to force the script to only trigger on app pages and reqs.php
// @history       1.0.2 added button to the request page to toggle the script on|off
// @history       1.0.1 added automated updating
// @history       1.0.0 Initial release
// @require       http://userscripts.org/scripts/source/94995.user.js
// ==/UserScript==

var bEnabled = GM_getValue('enabled',false);
var lastAppId = GM_getValue('appId', null);
var reqPage = false;

//  Process Variables
var SUC_script_num  = 57047;

// Script Update Update Code

function UpdateCheck(forced) {
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
                                try {
                                    window.location.href = 'http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js';
                                } catch (err) {
                                };
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


// Helpers
//--
// Create by avg, modified by JoeSimmons
function create(a,b) {
	if(!a || a=="" || !b) return;
	var ret=document.createElement(a);
	for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for each(var p in prop) ret.appendChild(p);
		else if(/^(style|accesskey|class|id|name|src|href)$/.test(prop)) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	return ret;
}

// Popup a msg
function MsgBox(msg)
{
	return window.alert(msg);
}

// Returns true if data is in some way "empty"
function HasData(data)
{
	var bRet = false;
	if(data != null && data != "" && typeof(data) != "undefined") {
		bRet = true;
	}
	//MsgBox('HasData: finished');
	return bRet;
}

// if possible return the page title other wise return "undefined"
function GetTitle(){
	var bRet = null;
	if(HasData(document.title) == true) {
		bRet = document.title;
	}
	else if(HasData(window.title) == true) {
		bRet = window.title;
	}
	else  {
		bRet = "undefined";
	}
	//MsgBox('GetTitle: finished');
	return bRet;
}


function GetQueryParam(query,param)
{
	var bReturn = null;
	var regexS = "[\\?&]"+param+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(query);
	if(results != null){
		bReturn = results[1];
	}
	return bReturn;
}

function EncodeHtml(str)
{
	str = str.replace(/&/g, "&amp;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/</g, "&lt;");
	str = str.replace(/"/g, "&quot;");
	str = str.replace(/'/g, "&#039;");
	return str;
}


function DecodeHtml(str)
{
	str = str.replace(/\&amp;/g,"&");
	str = str.replace(/\&gt;/g, ">");
	str = str.replace(/\&lt;/g, "<");
	str = str.replace(/\&quot;/g, '"');
	str = str.replace(/\&#039;/g, "'");
	return str;
}

function MatchFormAction(str)
{
	var bReturn = false;
	var forms = document.getElementsByTagName("form"); 
	if(forms){
		for (var i = 0; i < forms.length; i++) {
			var action = forms[i].getAttribute("action");
			action = DecodeHtml(action);
			if(action == str){
				bReturn = true;
				break;
			}
		}
	}
	return bReturn;
}


function isReqPage(){
	var reqsRegex = /reqs\.php/i;
	var appsDash = document.getElementsByClassName('apps_dashboard')[0];// Apps Requests (left side menu)
	if((top.location == document.location && reqsRegex.test(document.location.href)) || appsDash)
	{
		return true;
	}
	return false;
}

function isAppPage(){
	if(top.location == document.location && /\apps.facebook\.com$/i.test(document.location.hostname)) {
		return true;
	}	
	return false;
}

// Script specific
//--
function ToggleScript()
{
	//return function () {
		if(reqPage){
			// Change the button text
			var myButton = document.getElementById("auto_redirect_input");
		}
		// change the script state
		if(bEnabled){
			bEnabled = false;
			if(reqPage && myButton)
			{
				myButton.value = 'Enable';
			}
		} else {
			bEnabled = true;
			if(reqPage && myButton)
			{
				myButton.value = 'Disable';
			}		
		}
		// store the state
		GM_setValue('enabled',bEnabled);
		bEnabled = GM_getValue('enabled',true);
		//MsgBox('Toggled: ' + bEnabled);
		return;
	//}
}

// Text for the scripts button
function ButtonText()
{
	var bRet = bEnabled ? 'Disable' : 'Enable';
	//MsgBox('ButtonText: finished');
	return bRet;
}

// Insert the scripts button
function AddButton()
{	
	var oDom = document.getElementById("rightCol");
	if(oDom){
		var bTxt = ButtonText();
		var divHTML = '<h3 class="uiHeaderTitle">Auto Redirect: </h3>';
		oDom.insertBefore(create('div',{style:"margin-left: 15px; margin-bottom: 15px;",class:"uiHeaderTitle buttons",kids:new Array(
				create('input',{class:"inputbutton uiButton uiButtonConfirm",id:"auto_redirect_input",type:'button',style:"margin: 5px auto;",value:bTxt,onclick:ToggleScript})
			)}),oDom.childNodes[0]);
		oDom.insertBefore(create('div',{innerHTML:divHTML,class:"hasRightCol uiHeader uiHeaderTopAndBottomBorder mbs uiSideHeader",style:"margin: 0px auto;width: auto;",id:"netego_organic rightCol auto_redirect_div"}),oDom.childNodes[0]);		
	}
	/*
	var obj = document.evaluate(
		"//div[contains(@id,'rightCol')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for(var i = 0; i < obj.snapshotLength; i++) {
		var thisElement = obj.snapshotItem(i);
		if(thisElement){
			var oDom = thisElement;
			var bTxt = ButtonText();
			var divHTML = '<h3 class="uiHeaderTitle">Auto Redirect: </h3>';
			oDom.insertBefore(create('div',{style:"margin-left: 15px; margin-bottom: 15px;",class:"uiHeaderTitle buttons",kids:new Array(
					create('input',{class:"inputbutton uiButton uiButtonConfirm",id:"auto_redirect_input",type:'button',style:"margin: 5px auto;",value:bTxt,onclick:ToggleScript})
				)}),oDom.childNodes[0]);
			oDom.insertBefore(create('div',{innerHTML:divHTML,class:"hasRightCol uiHeader uiHeaderTopAndBottomBorder mbs uiSideHeader",style:"margin: 0px auto;width: auto;",id:"netego_organic rightCol auto_redirect_div"}),oDom.childNodes[0]);
		}
	}
	*/
	return;
}


// GetAppId returns the applications ID if found otherwise returns null
function GetAppId(){
	var bReturn = null;
	var allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var thisLink = null;
	//MsgBox('Starting GetAppId()\r\n');
	for(var i = 0; i < allLinks.snapshotLength; i++) {
    		thisLink = allLinks.snapshotItem(i);
    		if(thisLink.innerHTML.toString() == 'Report/Contact this Application' != -1 && thisLink.href.indexOf('ajax/report_app.php?app_id=') != -1){
    			//MsgBox('Found link match: ' + thisLink.href.toString()+ '\r\nAttempting to get the appId');
    			bReturn = GetQueryParam(thisLink.href,'app_id');
  			break;
    		}
	}		
	return bReturn;
}

// Goes to the request page
function Go2Reqs()
{
	var appId = GetAppId();
	var reqUrl = 'http://www.facebook.com/reqs.php';
	if(appId != null)
	{
		GM_setValue('appId', appId);
		lastAppId = GM_getValue('appId', null);
		reqUrl = 'http://www.facebook.com/reqs.php#confirm_' + appId + '_0';
	} else {
		GM_setValue('appId', null);
		lastAppId = GM_getValue('appId', null);
	}
	location.replace(reqUrl);
}

// Script init bits
//--
function Init(){
	window.removeEventListener("load", Init, false);
	if(isReqPage() === true){
		reqPage = true;
		AddButton();
		UpdateCheck(false);
	}
	if(isAppPage() === true){
		if(bEnabled === true){
			Go2Reqs();
		}
	}
	return;
}
window.addEventListener("load", Init, false); //invoke

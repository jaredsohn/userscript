// ==UserScript==
// @name           GHQEditor
// @namespace      GHQEditor
// @description    GHQ Site Editor
// @include        http://*.ghqnet.com/*
// ==/UserScript==

/*
----------------------
Disclaimer
----------------------
Certain parts of this script are taken from other similer projects, all rights
 on those sections are owned by their respective creators.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
For a full copy of the GNU General Public License, see
http://www.gnu.org/licenses/.
*/
alert('Test1');

var DEBUGNEWCODE = 0;
alert('Test2');

var scriptName='GHQEditor';
var scriptId='74664';
var scriptVersion=1.07;
var scriptVersionRev=001;

var path = window.location.toString();					// get the URL of the current page
var page = path.substring(0, path.indexOf('.asp'));		// extract page name from URL
var page = page.substring(page.lastIndexOf('/')+1);		// extract page name from URL

alert('Test3');

if(!GM_getValue('UNIQUEKEY',false)){
	var rand = Math.floor(Math.random()*10000000000000);
     GM_setValue('UNIQUEKEY',rand.toString());
}
var UNIQUEKEY = GM_getValue('UNIQUEKEY', false);
alert('Test4');

//==========================================
//Debug Setup
//==========================================
var DEBUG_KEY = "config_debug";
var LOG_LEVEL_KEY = "config_logLevel";

var LOG_LEVEL_DEBUG = 1;
var LOG_LEVEL_INFO = 2;
var LOG_LEVEL_WARN = 3;
var LOG_LEVEL_ERROR = 4;

var location = window.location.href;
var LOG_LEVEL = getSetting(LOG_LEVEL_KEY,0);

if(!getSetting(DEBUG_KEY,false)) LOG_LEVEL = 0;
if(DEBUGNEWCODE) LOG_LEVEL = 4;

try{
    var debugwith;
    if(unsafeWindow.console && unsafeWindow.console.firebug) debugwith = "firebug";
    var console = {
        log: function () // Basic logging function for loading etc
        {
            if( LOG_LEVEL >= 1 && debugwith == "firebug" ) {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.log( "Location: "+location
                    +" \nLog("+typeof(arguments)+"): "+arguments[0] );
                } else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.log( "Location: "+location
                    +" \nLog("+typeof(arguments)+"): %o",arguments );
                } else {
                    unsafeWindow.console.log( "Location: "+location
                    +" \nLog("+typeof(arguments)+"): "+arguments );
                }
                return;
            }
            if( LOG_LEVEL >= 1 && debugwith == "firefox" )
            {
                unsafeWindow.console.log( "Location: "+location+" \nLog: "+arguments );
                return;
            }
            if( LOG_LEVEL >= 1 && !debugwith ) { notify( "\nError: "+arguments[0] ,MESSAGE_CLASS_ERROR); return; }
        },
        info: function () // Show data relevent to any functions being worked on
        {
            if( LOG_LEVEL >= 2 && debugwith == "firebug" )
            {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.error( "Location: "+location
                    +" \nInfo("+typeof(arguments)+"): "+arguments[0] );
                } else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.error( "Location: "+location
                    +" \nInfo("+typeof(arguments)+"): %o",arguments );
                } else {
                    unsafeWindow.console.error( "Location: "+location
                    +" \nInfo("+typeof(arguments)+"): "+arguments );
                }
                return;
            }
            if( LOG_LEVEL >= 2 && debugwith == "firefox" )
            {
                console.log( "Location: "+location+" \nInfo: "+arguments );
                return;
            }
            if( LOG_LEVEL >= 2 && !debugwith ) { notify( "Location: "+location+" \nError: "+arguments[0] ,MESSAGE_CLASS_ERROR); return; }
        },
        warn: function () // Show any non-fatal errors
        {
            if( LOG_LEVEL >= 3 && debugwith == "firebug" )
            {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.warn( "Location: "+location+" \nWarn("+typeof(arguments)+"): "+arguments[0] );
                } else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.warn( "Location: "+location+" \nWarn("+typeof(arguments)+"): %o",arguments );
                } else {
                    unsafeWindow.console.warn( "Location: "+location+" \nWarn("+typeof(arguments)+"): "+arguments );
                }
                return;
            }
            if( LOG_LEVEL >= 3 && debugwith == "firefox" ) { console.log( "Location: "+location+" \nWarning: "+arguments ); return; }
            if( LOG_LEVEL >= 3 && !debugwith ) { notify( "Location: "+location+" \nError: "+arguments[0] ,MESSAGE_CLASS_ERROR); return; }
        },
        error: function () // If error is breaking entire script
        {
            if( LOG_LEVEL == 4 && debugwith == "firebug" )
            {
                if ( arguments.length==1 && typeof(arguments[0]) == "string" ) {
                    unsafeWindow.console.error( "Location: "+location+" \nError("+typeof(arguments)+"): "+arguments[0] );
                } else if ( (typeof(arguments) == "object" || typeof(arguments) == "array") ) {
                    unsafeWindow.console.error( "Location: "+location+" \nError("+typeof(arguments)+"): %o",arguments );
                } else {
                    unsafeWindow.console.error( "Location: "+location+" \nError("+typeof(arguments)+"): "+arguments );
                }
                return;
            }
            if( LOG_LEVEL == 4 && debugwith == "firefox" ) { console.log( "Location: "+location+" \nError: "+arguments ); return; }
            if( LOG_LEVEL == 4 && !debugwith ) { notify( "Location: "+location+" \nError: "+arguments[0] ,MESSAGE_CLASS_ERROR); return; }
        }
    };

} catch (e) {notify("Console exception: "+e,MESSAGE_CLASS_ERROR);}

if(document.title.indexOf("Error")!= -1) return; // try to break out if connections down to avoid messing up error page

if (DEBUGNEWCODE) console.log("Log level: "+LOG_LEVEL+" Clan: "+ getClan());
if (DEBUGNEWCODE) // Test save to check if functional
{
    setSetting("test","working");
    var val = getSetting("test","BROKEN");
    if (val !="working") console.log("Debug Test Save "+val);
}

//==========================================
//Get/Set Functions
//Prefixes server name to settings
//==========================================
function getSetting(key,value){
    try
    {
        if (typeof value == "float") value+="";
        return GM_getValue(getClan()+"_"+key,value);
    } catch (e) { console.warn ("Line Number: "+e.lineNumber+"\n getSetting error: "+e); console.info("\nKey: "+key+"\nValue: "+value); }
}

function setSetting(key,value){
    try
    {
        if (typeof value == "float") value+="";
        return GM_setValue(getClan()+"_"+key,value);
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\n setSetting error: "+e); console.log("\nKey: "+key+"\nValue: "+value); }
}

// Simple replacement of getelementbyid with $ to save typing
function $(variable)
{
	if(!variable) return;
	if (document.getElementById(variable)) return document.getElementById(variable);
}
//==========================================
//-----------Preset Definitions-------------
//==========================================
//NOTE: These are simpy defaults. There's no need to edit these here in the script.
var MESSAGE_CLASS = "notifier";
var MESSAGE_CLASS_ERROR = "notifierError";

GM_addStyle('.notifier {'
        +'  background-color: Black;'
        +'  border: solid 1px;'
        +'  color: white;'
        +'  padding: 10px 10px 10px 10px;'
        +'}'
    +'.notifierError {'
        +'  background-color: Black;'
        +'  border: solid 2px;'
        +'  color: red;'
        +'  padding: 10px 10px 10px 10px;'
        +'}'
    +'hr.cphr {'
        +'  color: orange;'
        +'  width: 400px;'
        +'}'
    +'.cpscripttimes {'
        +'  text-align: center;'
        +'  margin:0 auto;'
        +'  width:200px;'
        +'  background-color: #191919;'
        +'  border: #333333 solid 1px;'
        +'  padding-bottom: 10px;'
        +'  color: white;'
        +'  margin-top: 10px;'
        +'  font-size: 8px;'
        +'  opacity: 0.82;'
        +'  z-index: 0;'
        +'}'
    +'#gm_update_alert {'
        +'  position: relative;'
        +'  top: 0px;'
        +'  left: 0px;'
        +'  margin:0 auto;'
        +'  width:'+getTableWidth()+'px;'
        +'  background-color: #191919;'
        +'  text-align: center;'
        +'  font-size: 11px;'
        +'  font-family: Tahoma;'
        +'  border: #333333 solid 1px;'
        +'  margin-bottom: 10px;'
        +'  padding-left: 0px;'
        +'  padding-right: 0px;'
        +'  padding-top: 10px;'
        +'  padding-bottom: 10px;'
        +'  opacity: 0.82;'
        +'  color: white;'
        +'}'
    +'.gm_update_alert_buttons {'
        +'  position: relative;'
        +'  top: -5px;'
        +'  margin: 5px;'
        +'}'
    +'#gm_update_alert_button_close {'
        +'  position: absolute;'
        +'  right: 20px;'
        +'  top: 20px;'
        +'  padding: 3px 5px 3px 5px;'
        +'  border-style: outset;'
        +'  border-width: thin;'
        +'  z-index: 11;'
        +'  background-color: orange;'
        +'  color: #FFFFFF;'
        +'  cursor:pointer;'
        +'}'
    +'.gm_update_alert_buttons span, .gm_update_alert_buttons span a  {'
        +'  text-decoration:underline;'
        +'  color: #003399;'
        +'  font-weight: bold;'
        +'  cursor:pointer;'
        +'}'
    +'.gm_update_alert_buttons span a:hover  {'
        +'  text-decoration:underline;'
        +'  color: #990033;'
        +'  font-weight: bold;'
        +'  cursor:pointer;'
        +'}'
    +'#gm_update_title {'
        +'  font-weight:bold;'
        +'  color:orange;'
        +'}'
	+'.right_Menu {'
		+'	color: gold;'
		+'	font-weight: bold;'
        	+'  font-size: 11px;'
		+'  cursor:pointer;'
		+'}'
	+'.right_MenuHeader {'
		+'	color: gold;'
		+'	font-weight: bold;'
        	+'  font-size: 11px;'
		+'}'
	+'.left_Menu {'
		+'	color: #DDDDDD;'
        	+'  font-size: 12px;'
		+'	font-weight: bold;'
		+'}');

var totalStart = new Date();
var startTime = totalStart;
var endTime;
var timerMessage = "";

//==========================================
//Returns the clan abbr
//==========================================

var _clan = null;
function getClan(){
    //console.log("retreiving clan. Clan: "+_clan);
    if(_clan == null)
    {
        //console.log("setting clan. Location: "+window.location);
        var regex = /http:\/\/([a-z]+)\.ghqnet\.com/;
        var result = regex.exec(document.referrer);
        //console.log("Result: "+result);
        if(result == null)
        {
            //console.log(document.referrer);
            var regex = /http:\/\/([a-z]+)\.ghqnet\.com/;
            result = regex.exec(document.URL);
        }
        if (result != null)
        {
            _clan = result[1];
        }
//        else console.log ("Referrer error");
    }
    //console.log("Clan: "+_clan);
    return _clan;
}

//==========================================
//---------Display Functions----------------
//==========================================

function zeroPad(num){
	if(num <= 9)
	return "0" + num;
	return num;
}

function getTableWidth(){
    var tables = document.evaluate(
    "//table[@class='top']",
    document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    //console.log('Found '+ tables.snapshotLength + ' tables.');
    if(tables.snapshotLength==0) return 900;
    var topTable = tables.snapshotItem(0);
    return topTable.getAttribute("width");
}

function URLDecode (encodedString) {
  var output = encodedString;
  var binVal, thisString;
  var myregexp = /(%[^%]{2})/;
  while ((match = myregexp.exec(output)) != null
             && match.length > 1
             && match[1] != '') {
    binVal = parseInt(match[1].substr(1),16);
    thisString = String.fromCharCode(binVal);
    output = output.replace(match[1], thisString);
  }
  return output;
}

//Notifier Utility Code
//http://javascript.nwbox.com/asyncAlert/
//-----------------------------------
var notifycount = 1;
function notify(m,c){
    if($('Message'))
    {
        document.body.removeChild($('Message'));
    }
//  create a block element
    var b=document.createElement('div');
    b.id='Message';
    b.className=c||'';
    b.style.cssText='position:absolute;white-space:nowrap;z-index:10;';
//  classname not passed, set default classname
    if(b.className.length==0){
        b.className = "notifier";
    }
//  insert block in to body
    b=document.body.insertBefore(b,document.body.firstChild);
//  write HTML fragment to it
    b.innerHTML=m;
//  save width/height before hiding
    var bw=b.offsetWidth;
    var bh=b.offsetHeight;
//  hide, move and then show
    b.style.display='none';
    b.style.top = (document.body.clientHeight/2 + window.pageYOffset - bh/2)+"px";
    b.style.left = (document.body.clientWidth/2 + window.pageXOffset - bw/2)+"px";
	
    //console.log( b.style.top);
    //console.log("window height: "+document.body.clientHeight);
    //console.log("window width: "+document.body.clientWidth);
    //console.log("window scroll x: "+window.pageXOffset);
    //console.log("window scroll y: "+window.pageYOffset);

    b.style.display='block';
    var duration = 2000;
    var endOpacity = 0;
    if(c==MESSAGE_CLASS_ERROR)
    {
        b.className = "notifierError";
        b.id='errorMessage';
        var pos = notifycount * 40;
        b.style.top = (document.body.clientHeight/2 + window.pageYOffset - bh/2) - (400 - pos);
        duration = 4000;
        if(DEBUGNEWCODE) duration = 8000;
        endOpacity = 50;
    }

    notifycount++;
    // fadeout block if supported
    setFading(b,100,endOpacity,duration,function(){document.body.removeChild(b);});
}

// apply a fading effect to an object
// by applying changes to its style
// @o = object style
// @b = begin opacity
// @e = end opacity
// @d = duration (millisec)
// @f = function (optional)
function setFading(o,b,e,d,f){
	var t=setInterval(
		function(){
			b=stepFX(b,e,2);
			setOpacity(o,b/100);
			if(b==e){
				if(t){clearInterval(t);t=null;}
				if(typeof f=='function'){f();}
			}
		},d/20
	);
}
// set opacity for element
// @e element
// @o opacity
function setOpacity(e,o){
	// for IE
	e.style.filter='alpha(opacity='+o*100+')';
	// for others
	e.style.opacity=o;
}

// increment/decrement value in steps
// checking for begin and end limits
//@b begin
//@e end
//@s step
function stepFX(b,e,s){
	return b>e?b-s>e?b-s:e:b<e?b+s<e?b+s:e:b;
}

function insertNotification(message){
    if (message != null)
    {
        var notification = document.createElement("div");
        notification.setAttribute('id', 'gm_update_alert');
        var close = document.createElement("div");
        close.setAttribute('id', 'gm_update_alert_button_close');
        close.innerHTML = "Click to hide";
        close.addEventListener('click', function(event) {
                         document.body.removeChild($('gm_update_alert'));
                         document.body.removeChild($('gm_update_alert_button_close'));
                    }, true);
        notification.innerHTML = ''
        +'  <div id="gm_update_title">GHQEditor Notification</div>'
        +'  <hr class="cphr" /><p>' + message
        +'</p>';
        notification.appendChild(close);
        document.body.insertBefore(notification, document.body.firstChild);
    }
}

function cleanBoards(){
	var thisTime = new Date().getTime();
	var clean = thisTime - 60*60*24;
	if(getSetting( 'LastCleaned', '0' ) < clean){
		var keys = GM_listValues();
		var curTime = new Date().getTime();
		var youngestTime = curTime - 60*60*24*8*1000;
		for(var i=0; i<keys.length; ++i){
			if(keys[i].substr(0,6) == 'Posts_'){
				var Posts = getSetting( keys[i], ':' );
				var postarr = Posts.split(':');
				for(var x=0; x<postarr.length; ++x){
					if(postarr[x] == ''){ continue; }
					var lastReadTime = postarr[x].split('-')[1];
					if(youngestTime >= lastReadTime){
						postarr.splice(x, 1);
						x--;
					}
				}
				Posts = postarr.join(':');
				setSetting( keys[i], Posts );
			}
		}
		setSetting( 'LastCleaned', thisTime.toString() );
	}
}




//-----------------------------------
//Auto Launch count down script
//-----------------------------------
function serverTimeSetup(){
setInterval(function(){serverTimeAdjust()}, 200); 
}

function timeToCounter(milliseconds)
{
	milliseconds = milliseconds/1000;
	var h = Math.floor(milliseconds/3600);
	var m = Math.floor((milliseconds % 3600)/60);
	var s = Math.floor((milliseconds % 3600) % 60);
	var counterString = "";
	if(h > 0)
		counterString += h+"h ";
	if(m > 0)
		counterString += m+"m ";
	if(s > 0)
		counterString += s+"s";
	return counterString;
}

function serverTimeAdjust()
{
	 if($("updateCheckButton"))
	 {
		if($("updateCheckButton").value == "Checking For Updates..")
		{
			$("updateCheckButton").value = "Checking For Updates...";
			var OldVersion = parseFloat(GM_getValue("scriptVersion",0+""));
       		var OldRev = parseFloat(GM_getValue("scriptVersionRev",0+""));
			var NewVersion = parseFloat(scriptVersion);
       		var NewVersionRev = parseFloat(scriptVersionRev);
       		var LastMessage = GM_getValue("scriptLastMessage",'');
			var LatestVersion = 0.0;
	   		var LatestRev = 001;
			var Clan_Username = getSetting('Clan_Username', 'Unknown');
			var Clan_Clan = getClan();
			GM_xmlhttpRequest({
				method: 'GET',
			   	 url: 'http://userscripts.damnlazy.co.uk/GHQEditorScriptInfo.php?Clan='+Clan_Clan+'&Username='+Clan_Username+'&Version='+OldVersion+'&Rev='+OldRev+'&Key='+UNIQUEKEY,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/scriptVersion+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {
					LatestVersion = parseFloat(responseDetails.responseText.slice(responseDetails.responseText.indexOf("Version:")+8));
					LatestRev = parseFloat(responseDetails.responseText.slice(responseDetails.responseText.indexOf("Rev:")+4));
					Messages = responseDetails.responseText.substring(responseDetails.responseText.indexOf("Message:")+9);
					if(OldVersion < LatestVersion)
					{
						insertNotification("There is a new version of the GHQEditor available!<br/> Please click <a target='_blank' href='http://www.damnlazy.co.uk/UserScripts/GHQEditor/GHQEditor.Current.user.js'>here</a> to get it.<br/><br/>New Version: "+LatestVersion+"<br/> Your Version: "+OldVersion+"<br/>");
					}
					else if(OldRev < LatestRev && getSetting(SHOW_REVISIONS, false) == true)
					{
						insertNotification("There is a new revison of the GHQEditor available!<br/> It is only a minor update and is not required but is recommended. <br/>Please click <a target='_blank' href='http://www.damnlazy.co.uk/UserScripts/GHQEditor/GHQEditor.Current.user.js'>here</a> to get it.<br/><br/>New Version: "+LatestVersion+" REV: "+LatestRev+"<br/> Your Version: "+OldVersion+" REV: "+OldRev+"<br/>");
					}
					else
					{
						insertNotification("No updates available. You are up to date!<br/> Your Version: "+OldVersion+" REV: "+OldRev+"<br/>");
					}
					if(LastMessage != Messages && Messages != '' && Messages != ' '){
           				insertNotification(Messages);
           				GM_setValue("scriptLastMessage",Messages);		   
					}
					$("updateCheckButton").value = "Check For Updates";
				}
			});
		}
	 }
}
//-----------------------------------
//End Auto Launch count down script
//-----------------------------------
//==========================================
// Check if new install
//==========================================
function installCheck(){
    try{
       var OldVersion = parseFloat(GM_getValue("scriptVersion",0+""));
       var OldRev = parseFloat(GM_getValue("scriptVersionRev",0+""));
       var NewVersion = parseFloat(scriptVersion);
       var NewVersionRev = parseFloat(scriptVersionRev);
       var LastMessage = GM_getValue("scriptLastMessage",'');
	   var LatestVersion = 0.0;
	   var LatestRev = 001;
	   var lastCheck = parseInt(GM_getValue("updateCheckTime",0+""));
	   var currTime = (new Date).getTime();
	   //console.log("LastChecked: " + lastCheck);
	   //console.log("Current Time: " + currTime);
	   //console.log("Difference: " + (currTime - lastCheck));
	   //console.log(scriptVersion);
	   if(lastCheck == 0 || Math.abs(currTime - lastCheck) > 86400000 )
	   {
			var Clan_Username = getSetting('Clan_Username', 'Unknown');
			var Clan_Clan = getClan();
			GM_setValue("updateCheckTime",currTime+"");
			GM_xmlhttpRequest({
			    method: 'GET',
			    url: 'http://userscripts.damnlazy.co.uk/GHQEditorScriptInfo.php?Clan='+Clan_Clan+'&Username='+Clan_Username+'&Version='+OldVersion+'&Rev='+OldRev+'&Key='+UNIQUEKEY,
			    headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			        'Accept': 'application/scriptVersion+xml,application/xml,text/xml',
			    },
			    onload: function(responseDetails) {
					LatestVersion = parseFloat(responseDetails.responseText.slice(responseDetails.responseText.indexOf("Version:")+8));
					LatestRev = parseFloat(responseDetails.responseText.slice(responseDetails.responseText.indexOf("Rev:")+4));
					Messages = responseDetails.responseText.substring(responseDetails.responseText.indexOf("Message:")+9);
					if(OldVersion < LatestVersion && OldVersion != "" && OldVersion != null)
					{
						insertNotification("There is a new version of the GHQEditor available!<br/> Please click <a target='_blank' href='http://www.damnlazy.co.uk/UserScripts/GHQEditor/GHQEditor.Current.user.js'>here</a> to get it.<br/><br/>New Version: "+LatestVersion+"<br/> Your Version: "+OldVersion+"<br/>");
					}else if(OldRev < LatestRev && getSetting(SHOW_REVISIONS, false) == true)
					{
						insertNotification("There is a new revison of the GHQEditor available!<br/> It is only a minor update and is not required but is recommended. <br/>Please click <a target='_blank' href='http://www.damnlazy.co.uk/UserScripts/GHQEditor/GHQEditor.Current.user.js'>here</a> to get it.<br/><br/>New Version: "+LatestVersion+" REV: "+LatestRev+"<br/> Your Version: "+OldVersion+" REV: "+OldRev+"<br/>");
					}
					if(LastMessage != Messages && Messages != '' && Messages != ' '){
           				insertNotification(Messages);
           				GM_setValue("scriptLastMessage",Messages);		   
					}
			    }
			});	
	   }       
       if (OldVersion==null || OldVersion==""){	   
           GM_setValue("scriptVersion",NewVersion+"");		   
           GM_setValue("scriptVersionRev",NewVersionRev+"");		   
           insertNotification("You have sucessfully installed "+scriptName+" Version: "+NewVersion+" to your web browser.<br />");
           return;
       } else if (NewVersion>OldVersion){
           GM_setValue("scriptVersion",NewVersion+"");
           GM_setValue("scriptVersionRev",NewVersionRev+"");		   
           insertNotification("You have sucessfully upgraded "+scriptName+" From ("+OldVersion+") To ("+NewVersion+"). Click <a target='_blank' href='http://userscripts.damnlazy.co.uk/viewtopic.php?f=3&t=3'>here</a> to view what has been changed.<br/>");
       } else if (NewVersionRev>OldRev){
           GM_setValue("scriptVersionRev",NewVersionRev+"");		   
           insertNotification("You have sucessfully updated "+scriptName+" From ("+OldVersion+" REV: "+OldRev+") To ("+NewVersion+" REV: "+NewVersionRev+").<br/>");
       }
	   delete OldVersion;
	   delete NewVersion;
	   delete LatestVersion;
	   delete lastCheck;
	   delete currTime;
    } catch (e) { console.log ("Line Number: "+e.lineNumber+"\ninstallCheck(): "+e); }
}


//==========================================
//Config Page
//==========================================

var ANIMATE_SERVER_TIME_KEY = "config_animateServerTime";
var GAME_TIME_SHOW_KEY = "config_gameTime";
var LOCAL_TIME_SHOW_KEY = "config_localTime";
var HOUR24_KEY = "config_24Hour";
var POST_AREA_KEY = "config_postArea";
var LEFT_MENU_KEY = "config_leftMenu";
var NEW_POSTS_KEY = "config_newPosts";
var TARGET_SELECTOR_KEY = "config_targetSelector";
var EDIT_USER_KEY = "config_editUser";
var SITE_MANAGER_KEY = "config_siteManager";
var GHQEDITOR_HEADER = "config_ghqeditorHeader";
var SHOW_REVISIONS = "config_showrevisions";




function configBody(tab)
{
	var url = location;
	GM_addStyle('.configHeading {'
		+'	color: gold;'
		+'	font-weight: bold;'
		+'}'
	+'.featureName {'
		+'	color: #EEDC82;'
		+'}'
	+'.subFeatureName {'
		+'	color: #8B814C;'
		+'	padding-left:20'
		+'}'
	+'.footnote {'
		+'	color: gold;'
		+'	font-weight: bold;'
		+'}');
	var width = getTableWidth();
	if (width<900) width = 900;
	var newbody = "<div align='center'>"+
	"<h2>GHQEditor - Settings</h2>"+
	"<small>Script Version: "+scriptVersion+"<span id='pageDate'></span></small> <br/><input type='button' value='Check For Updates' id='updateCheckButton' onClick='if(document.getElementById(\"updateCheckButton\").value == \"Check For Updates\"){document.getElementById(\"updateCheckButton\").value = \"Checking For Updates..\";}else{document.getElementById(\"updateCheckButton\").value = \"Check For Updates\";}' />"+
	"<table width='"+width+"'>"+
	"<tr bgcolor='#222222'><th width='230' colspan='2'>Feature</th><th>Description</th></tr>";

	newbody = newbody +"<tr bgcolor='#222222'><td colspan='3' class='configHeading'>General</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_ghqeditorHeader' /> GHQEditor Header</td>"+
		"<td style='padding-left:20'>Displays the \"GHQEditor Settings\" and \"GHQEditor Website\" at the bottom of every page instead of in the Header.</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_showrevisions' /> Show Revisions</td>"+
		"<td style='padding-left:20'>This option will check for and show minor script revisions instead of just the major updates.</td></tr>";

	newbody = newbody +"<tr bgcolor='#222222'><td colspan='3' class='configHeading'>Times</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_24Hour' /> 24 Hour Format</td>"+
		"<td style='padding-left:20'>Displays clocks in a 24 Hour format instead of AM/PM.</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_animateServerTime' /> Animate Times</td>"+
		"<td style='padding-left:20'>Display constantly updated server time.</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_gameTime' /> Game Time</td>"+
		"<td style='padding-left:20'>Shows additional timer to show EarthEmpires GameTime.</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_localTime' /> Local Time</td>"+
		"<td style='padding-left:20'>Shows additional timer to show your current local time.</td></tr>";

	newbody = newbody +"<tr bgcolor='#222222'><td colspan='3' class='configHeading'>Page Changes</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_newPosts' /> Show New Posts</td>"+
		"<td style='padding-left:20'>Tracks all New Posts on boards and posts a \"New Post\" Image next to topics with new posts.<br>*All posts older then a week will not be shown as \"New\"</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_leftMenu' /> Left Menu</td>"+
		"<td style='padding-left:20'>Allows user you decide what links to show and what not to.</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_postArea' /> PostArea</td>"+
		"<td style='padding-left:20'>Augments the PostArea of Boards to include extra information like HTML quicklinks.</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_editUser' /> Edit Users</td>"+
		"<td style='padding-left:20'>Adds groups and other usefull information to the page.</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_siteManager' /> Site Manager</td>"+
		"<td style='padding-left:20'>Adds an easier way to edit the header of a site.</td></tr>";


	newbody = newbody +"<tr bgcolor='#222222'><td colspan='5' class='configHeading'>Earth Empire GHQ Sites (Only for EarthEmpire Sites)</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_targetSelector' /> Target Selector</td>"+
		"<td style='padding-left:20'>Adds extra options and coloring to the Target Selector page.</td></tr>";


	newbody = newbody +"<tr bgcolor='#222222'><td colspan='3' class='configHeading'>Debug</td></tr>"+

		"<tr bgcolor='#222222'><td class='featureName' colspan='2'><input type='checkbox' id='config_debug' /> Console log</td>"+
		"<td style='padding-left:20'>Logs to FireBug console. Must have Firebug extension installed.</td>"+
		"</tr>"+

		"<tr bgcolor='#222222'><td colspan='3' class='subfeatureName'>"+
		"<Input type = radio Name ='logLevel' Value = '1'>Log</input><br />"+
		"<Input type = radio Name ='logLevel' Value = '2'>Info</input><br />"+
		"<Input type = radio Name ='logLevel' Value = '3'>Warn</input><br />"+
		"<Input type = radio Name ='logLevel' Value = '4'>Error</input><br />"+
	"</tr></td>";


	newbody = newbody +"<tr  bgcolor='#222222'><td colspan='3' align='center'><input id='saveButton' type=submit name='Save' value='Save' /> - <input id='resetButton' type=submit name='Reset to defaults' value='Reset to defaults' /></td></tr>"+
	"</table>"+
	"<small>GHQEditor created by Jabroni1134 (Andrew Piette). Portions of the script are from Vigs AE Script (Config Page, Popups, Alerts)</small><br /><br />"+
	"<table>"+

	"<br /><br /><a id='backLink' href='"+url+"'>Return to GHQ</a>"+
	"</div>";
	return newbody;
}
function showConfig(page)
{
	//console.log("Loading config for "+getClan());
	document.body.innerHTML = "<html><body background='' bgcolor='black' link='#00C0FF' text='#DDDDDD' vlink='#d3d3d3'>"
	document.body.appendChild(topTable);
	document.body.innerHTML = document.body.innerHTML+configBody(page)+"</body></html>";
	loadConfig();
	$('saveButton').addEventListener('click', function(event) {
		saveConfig();
	}
	, true);
	$('resetButton').addEventListener('click', function(event) {
		resetConfig();
	}
	, true);
}

//==========================================
//Save/Load Config
//==========================================

function saveConfig()
{
	//console.log("Saving config");
	try{
		setSetting(ANIMATE_SERVER_TIME_KEY,$(ANIMATE_SERVER_TIME_KEY).checked);
		setSetting(LOCAL_TIME_SHOW_KEY,$(LOCAL_TIME_SHOW_KEY).checked);
		setSetting(GAME_TIME_SHOW_KEY,$(GAME_TIME_SHOW_KEY).checked);
		setSetting(HOUR24_KEY,$(HOUR24_KEY).checked);
		setSetting(POST_AREA_KEY,$(POST_AREA_KEY).checked);
		setSetting(LEFT_MENU_KEY,$(LEFT_MENU_KEY).checked);
		setSetting(NEW_POSTS_KEY,$(NEW_POSTS_KEY).checked);
		setSetting(TARGET_SELECTOR_KEY,$(TARGET_SELECTOR_KEY).checked);
		setSetting(EDIT_USER_KEY,$(EDIT_USER_KEY).checked);
		setSetting(SITE_MANAGER_KEY,$(SITE_MANAGER_KEY).checked);
		setSetting(GHQEDITOR_HEADER,$(GHQEDITOR_HEADER).checked);
		setSetting(SHOW_REVISIONS,$(SHOW_REVISIONS).checked);
	
		setSetting(DEBUG_KEY,$(DEBUG_KEY).checked);
	
		var logLevel = LOG_LEVEL_WARN;
		var radioButtons = document.evaluate(
			"//input[@type='radio']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
		//console.log(redCells.snapshotLength);
		for(var i=0;i<radioButtons.snapshotLength;i++)
		{
			//console.log(radioButtons.snapshotItem(i));
			if (radioButtons.snapshotItem(i).checked==true) {
				logLevel = radioButtons.snapshotItem(i).value;
			}
	
		}
		setSetting(LOG_LEVEL_KEY,logLevel);
	} catch (e) {console.log("Save settings on "+getClan()+": "+e);}
	notify("Settings successfully saved.");
}
function loadConfig()
{
	try{

		//console.log("Loading config");
		if ($(ANIMATE_SERVER_TIME_KEY)) $(ANIMATE_SERVER_TIME_KEY).checked = getSetting(ANIMATE_SERVER_TIME_KEY,true);
		if ($(LOCAL_TIME_SHOW_KEY)) $(LOCAL_TIME_SHOW_KEY).checked = getSetting(LOCAL_TIME_SHOW_KEY,true);
		if ($(GAME_TIME_SHOW_KEY)) $(GAME_TIME_SHOW_KEY).checked = getSetting(GAME_TIME_SHOW_KEY,true);
		if ($(HOUR24_KEY)) $(HOUR24_KEY).checked = getSetting(HOUR24_KEY,false);
		if ($(POST_AREA_KEY)) $(POST_AREA_KEY).checked = getSetting(POST_AREA_KEY,true);
		if ($(LEFT_MENU_KEY)) $(LEFT_MENU_KEY).checked = getSetting(LEFT_MENU_KEY,true);
		if ($(NEW_POSTS_KEY)) $(NEW_POSTS_KEY).checked = getSetting(NEW_POSTS_KEY,true);
		if ($(TARGET_SELECTOR_KEY)) $(TARGET_SELECTOR_KEY).checked = getSetting(TARGET_SELECTOR_KEY,true);
		if ($(EDIT_USER_KEY)) $(EDIT_USER_KEY).checked = getSetting(EDIT_USER_KEY,true);
		if ($(SITE_MANAGER_KEY)) $(SITE_MANAGER_KEY).checked = getSetting(SITE_MANAGER_KEY,true);
		if ($(DEBUG_KEY)) $(DEBUG_KEY).checked = getSetting(DEBUG_KEY,false);
		if ($(GHQEDITOR_HEADER)) $(GHQEDITOR_HEADER).checked = getSetting(GHQEDITOR_HEADER,false);
		if ($(SHOW_REVISIONS)) $(SHOW_REVISIONS).checked = getSetting(SHOW_REVISIONS,false);

		var logLevel = getSetting(LOG_LEVEL_KEY,LOG_LEVEL_WARN);
			//console.log("Log level: "+logLevel);
		var radioButtons = document.evaluate(
			"//input[@type='radio']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
		//console.log(redCells.snapshotLength);
		for(var i=0;i<radioButtons.snapshotLength;i++)
		{
			//console.log(radioButtons.snapshotItem(i));
			if (radioButtons.snapshotItem(i).value==logLevel) {
				radioButtons.snapshotItem(i).checked = true;
			}
	
		}

	} catch (e) { console.log("Config loaded: "+e); return; }
}
function resetConfig(install)
{
	try{

		setSetting(ANIMATE_SERVER_TIME_KEY,true);
		setSetting(GAME_TIME_SHOW_KEY,true);
		setSetting(LOCAL_TIME_SHOW_KEY,true);
		setSetting(HOUR24_KEY,false);
		setSetting(POST_AREA_KEY,true);
		setSetting(LEFT_MENU_KEY,true);
		setSetting(NEW_POSTS_KEY,true);
		setSetting(TARGET_SELECTOR_KEY,true);
		setSetting(EDIT_USER_KEY,true);
		setSetting(SITE_MANAGER_KEY,true);
		setSetting(DEBUG_KEY,false);
		setSetting(GHQEDITOR_HEADER,false);
		setSetting(SHOW_REVISIONS,false);

		if(install == "newInstall") { notify ("Settings set to default for new install."); return; }
	} catch (e) { console.log("Config reset: "+e); return; }
	notify("Settings successfully reset reloading page to update.");

	window.location.reload();
}
//==========================================
//AUGMENT FUNCTIONS
//==========================================

/*
*  POSTAREA AUGMENTATION
*/
	function postAreaAugment() {
		function postAreaAugment_TextEditor(span) {
			id = span.id;
			if(subjectfocus){
				var box = Subject;
			}else{
				var box = Message;
			}

			var start = box.selectionStart; 
			var end = box.selectionEnd; 
			switch (id){
				case 'BoldStart':
					text = '<b>';
	  			break;
				case 'Bold':
					if(start != end){
						box.value = box.value.substr(0, end) + '</b>' + box.value.substr(end, box.value.length); 
						box.value = box.value.substr(0, start) + '<b>' + box.value.substr(start, box.value.length); 
					}else{
						text = '<b> </b>';
					}
	  			break;
				case 'BoldEnd':
					text = '</b>';
	  			break;
				case 'UnderlineStart':
					text = '<u>';
	  			break;
				case 'Underline':
					if(start != end){
						box.value = box.value.substr(0, end) + '</u>' + box.value.substr(end, box.value.length); 
						box.value = box.value.substr(0, start) + '<u>' + box.value.substr(start, box.value.length); 
					}else{
						text = '<u> </u>';
					}
	  			break;
				case 'UnderlineEnd':
					text = '</u>';
	  			break;
				case 'ItalicsStart':
					text = '<i>';
	  			break;
				case 'Italics':
					if(start != end){
						box.value = box.value.substr(0, end) + '</i>' + box.value.substr(end, box.value.length); 
						box.value = box.value.substr(0, start) + '<i>' + box.value.substr(start, box.value.length); 
					}else{
						text = '<i> </i>';
					}
	  			break;
				case 'ItalicsEnd':
					text = '</i>';
	  			break;
				case 'ColorIA':
					if(start != end){
						box.value = box.value.substr(0, end) + '</font>' + box.value.substr(end, box.value.length); 
						box.value = box.value.substr(0, start) + '<font color="orange">' + box.value.substr(start, box.value.length); 
					}else{
						text = '<font color="orange">';
					}
	  			break;
				case 'ColorWar':
					if(start != end){
						box.value = box.value.substr(0, end) + '</font>' + box.value.substr(end, box.value.length); 
						box.value = box.value.substr(0, start) + '<font color="dodgerblue">' + box.value.substr(start, box.value.length); 
					}else{
						text = '<font color="dodgerblue">';
					}
	  			break;
				case 'ColorFR':
					if(start != end){
						box.value = box.value.substr(0, end) + '</font>' + box.value.substr(end, box.value.length); 
						box.value = box.value.substr(0, start) + '<font color="mediumseagreen">' + box.value.substr(start, box.value.length); 
					}else{
						text = '<font color="mediumseagreen">';
					}
	  			break;
				case 'ColorEnd':
					text = '</font>';
	  			break;
				case 'Fontx-Small':
				case 'FontSmall':
				case 'FontLarge':
				case 'Fontx-Large':
					var size = id.substr(4);
					if(start != end){
						box.value = box.value.substr(0, end) + '</span>' + box.value.substr(end, box.value.length); 
						box.value = box.value.substr(0, start) + '<span style="font-size: '+size+'">' + box.value.substr(start, box.value.length); 
					}else{
						text = '<span style="font-size: '+size+'"> ';
					}
	  			break;
				case 'FontEnd':
					text = '</span>';
	  			break;
				case 'AddURL':
					var url = prompt('What URL would you like to Add? (Paste URL)');
					var text = prompt('What Text would you like shown to the user for the link? (Text Header shown to user for link)');
					text = '<a href="'+url+'">'+text+'</a>';
	  			break;
				case 'AddImage':
					var image = prompt('What is the URL to the Image? (Paste URL)');
					text = '<img border="0" src="'+image+'">';
	  			break;
				case 'Emotessmile': 
					text = ' :) ';
	  			break;
				case 'Emoteswink':
					text = ' ;) ';
	  			break;
				case 'Emotesfrown':
					text = ' :( ';
	  			break;
				case 'Emotescool':
					text = ' 8) ';
	  			break;
				case 'Emotesmad':
					text = ' >:{ ';
	  			break;
				case 'Emotestongue':
					text = ' :P ';
	  			break;
				case 'Emotescrazy':
					text = ' ~:~ ';
	  			break;
				case 'Emotesshocked':
					text = ' :O ';
	  			break;
				case 'Emotesdetermined':
					text = ' >:) ';
	  			break;
				case 'Emotesundecided':
					text = ' :/ ';
	  			break;
				case 'Emotesyelling':
					text = ' >:O ';
	  			break;
				case 'Emotessealed':
					text = ' :X ';
	  			break;
				case 'Emoteslaugh':
					text = ' :D ';
	  			break;
				case 'Emotescrying':
					text = ' :*( ';
	  			break;
				case 'Emotesblush':
					text = ' *blush* ';
	  			break;
				default:
					if(id.substr(0, 5) != 'Color'){ return; }
					var color = id.substr(5);
					if(start != end){
						box.value = box.value.substr(0, end) + '</font>' + box.value.substr(end, box.value.length); 
						box.value = box.value.substr(0, start) + '<font color="'+color+'">' + box.value.substr(start, box.value.length); 
					}else{
						text = '<font color="'+color+'">';
					}
	
	
				break;
			}
			if(text !== undefined){
				box.value = box.value.substr(0, start) + text + box.value.substr(end, box.value.length); 
			}
	        box.focus(); 
		}
		var table = document.getElementsByTagName("textarea")[0].parentNode.parentNode.parentNode;
		var allTR = table.getElementsByTagName('tr');			// get all TD elements
		if(page == "ShowPost"){
			var row = table.insertRow(1);
			var cell = row.insertCell(0);
			cell.bgColor = allTR[2].bgColor;
			cell.colSpan = 2;
			cell.innerHTML = 'Message:';
			var editor = allTR[2].childNodes[1];
			unique = false;
			if(editor.innerHTML.indexOf('name="Message"') != -1){
				var editor = allTR[2].childNodes[0];
				unique = true;
			}
		}else{
			var table = document.getElementsByTagName("textarea")[0].parentNode.parentNode.parentNode;
			var editor = allTR[2].childNodes[0];
		}
		if(editor == undefined){
			return;		
		}		
		editor.align = 'center';
		editor.vAlign = 'middle';
		var colorstext = '';
		var colors = new Array('Aqua', 'Blue', 'Crimson', 'DarkBlue', 'DarkCyan', 'DarkGreen', 'DarkViolet', 'DodgerBlue', 'Gray', 'Green', 'Lime', 'Maroon', 'Navy', 'Orange', 'Purple', 'Red', 'RoyalBlue', 'SeaGreen', 'Teal', 'Yellow');
		for(var i=0; i<colors.length; ++i){
			if(i == 5 || i == 10 || i == 15 || i == 20){
				colorstext += '<br>';
			}
			colorstext += '<span id="Color'+colors[i]+'" style="color: '+colors[i]+'" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">'+colors[i]+',</span> ';
		}
		editor.innerHTML = '<font style="color: DarkOrange; font-size: small"><span id="BoldStart" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">[B]</span> - <span id="Bold" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'"><b>Bold</b></span> - <span id="BoldEnd" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">[/B]</span><br><span id="UnderlineStart" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">[U]</span> - <span id="Underline" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'"><u>Underline</u></span> - <span id="UnderlineEnd" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">[/U]</span><br><span id="ItalicsStart" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">[I]</span> - <span id="Italics" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'"><i>Italics</i></span> - <span id="ItalicsEnd" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">[/I]</span><br><br>Colors: <span id="ColorIA" style="color: orange" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">IA,</span> <span id="ColorWar" style="color: dodgerblue" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">War,</span> <span id="ColorFR" style="color: mediumseagreen" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">FR</span><br>'+colorstext+'<br><span id="ColorEnd" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">End Color</span><br><br><span style="font-size: medium; text-decoration: underline"><strong>Size</strong></span><br><span id="Fontx-Small" style="font-size: x-Small" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">x-Small</span>, <span id="FontSmall" style="font-size: Small" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">Small</span>, <span id="FontLarge" style="font-size: Large" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">Large</span>, <span id="Fontx-Large" style="font-size: x-Large" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">x-Large</span><br><span id="FontEnd" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">End Size</span><br><br><span id="AddURL" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">Add URL</span><br><span id="AddImage" onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">Add Image</span><br><br><span id="Emotessmile" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/smile.gif"></span> <span id="Emoteswink" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/wink.gif"></span> <span id="Emotesfrown" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/frown.gif"></span> <span id="Emotescool" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/cool.gif"></span> <span id="Emotesmad" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/mad.gif"></span><br><span id="Emotestongue" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/tongue.gif"></span> <span id="Emotescrazy" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/crazy.gif"></span> <span id="Emotesshocked" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/shocked.gif"></span> <span id="Emotesdetermined" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/determined.gif"></span> <span id="Emotesundecided" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/undecided.gif"></span><br><span id="Emotesyelling" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/yelling.gif"></span> <span id="Emotessealed" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/sealed.gif"></span> <span id="Emoteslaugh" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/laugh.gif"></span> <span id="Emotescrying" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/crying.gif"></span> <span id="Emotesblush" onmouseover="this.style.cursor=\'pointer\'"><img border="0" src="http://sol.ghqnet.com/images/Emotes/blush.gif"></span>';

		document.getElementById("BoldStart").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Bold").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("BoldEnd").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("UnderlineStart").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Underline").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("UnderlineEnd").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("ItalicsStart").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Italics").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("ItalicsEnd").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("ColorIA").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("ColorWar").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("ColorFR").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("ColorEnd").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Fontx-Small").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("FontSmall").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("FontLarge").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Fontx-Large").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("FontEnd").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("AddURL").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("AddImage").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotessmile").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emoteswink").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotesfrown").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotescool").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotesmad").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotestongue").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotescrazy").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotesshocked").addEventListener("click", function(){TextEditor(this);}, false);
		document.getElementById("Emotesdetermined").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotesundecided").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotesyelling").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotessealed").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emoteslaugh").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotescrying").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		document.getElementById("Emotesblush").addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);

		for(var i=0; i<colors.length; ++i){
			var name = "Color"+colors[i];
			document.getElementById(name).addEventListener("click", function(){postAreaAugment_TextEditor(this);}, false);
		}
		var subjectfocus = false;
		if(page == "ShowPost"){
			if(unique){
				var Message = allTR[2].childNodes[1].firstChild;
			}else{
				var Message = allTR[2].childNodes[3].firstChild;
			}
		}else{
			var Message = allTR[2].childNodes[1].firstChild;
			var Subject = allTR[1].childNodes[1].firstChild;
			Subject.addEventListener("focus", function(){ subjectfocus = true; }, false);
			Message.addEventListener("focus", function(){ subjectfocus = false; }, false);
			Subject.size = '70';
		}
		Message.cols = '75';
		Message.rows = '18';
	}

/*
*  NEW POSTS
*/
	function newPosts() {
		function newPosts_MarkAllRead() {
			var allNew = document.getElementsByName("NEW");
			for(var i=0; i<allNew.length; ++i){
				allNew[i].parentNode.removeChild( allNew[i] ); 
				i--;
			}
			setSetting( 'Posts_'+BoardID, ':AllRead-'+curTime+':' );
			notify('All topics marked as Read.');
		}
		var allTR = document.getElementsByTagName('tr');			// get all TD elements
		var allInputs = document.getElementsByTagName("input");
		for(var i=0; i<allInputs.length; ++i){
			if(allInputs[i].name == 'BoardID'){
				BoardID = allInputs[i].value;
				break;
			}
		}
		var Posts = getSetting( 'Posts_'+BoardID, ':' );
		var t = Posts.indexOf(':AllRead-');
		if(t!=-1){
			var tEnd = Posts.indexOf(':', t+1);
			var val = Posts.slice(t, tEnd);
			val = val.replace(':', '');
			var allReadTime = val.split('-')[1];
		}else{
			var allReadTime = 0;
		}
		if(document.forms[0].name == 'EditBoard'){
			colnum = 3;
		}else{
			colnum = 0;
		}
		var youngestTime = curTime - 60*60*24*7*1000;
		for(var i=0; i<allTR.length; ++i){
			if(allTR[i].firstChild.colSpan == 3 || allTR[i].firstChild.colSpan == 3+colnum){
				if(allTR[i].firstChild.firstChild != 'undefined' && allTR[i].lastChild.firstChild != 'undefined'){
					if(allTR[i].lastChild.firstChild.innerHTML == 'View Emotes' ){
						var row = allTR[i].parentNode.insertRow(0);
						var cell = row.insertCell(0);
						cell.bgColor = 'black';
						cell.colSpan = 4+colnum;
						cell.innerHTML = '<span onmouseover="this.style.cursor=\'pointer\';" id="MarkRead"><font style="color: Orange; font-size: small"><strong>Mark all as "Read"</strong></font></span>';
						$('MarkRead').addEventListener("click", function(){newPosts_MarkAllRead();}, false);
						i++;
					}
				}
				continue;
			}
			if(allTR[i].cells.length != 4+colnum){
				continue;
			}
			if(allTR[i].cells.length != 4+colnum){
				continue;
			}
			if(allTR[i].cells[3+colnum].firstChild.innerHTML == 'Last Post'){
				continue;
			}
			var PostDate = allTR[i].lastChild.innerHTML;
			PostDate = new Date.parse(PostDate);
			if(youngestTime >= PostDate || allReadTime >= PostDate){
				continue;
			}
			var ThreadID = allTR[i].childNodes[0+colnum].firstChild.href.split('&')[1];
			ThreadID = ThreadID.split('=')[1];
			var t = Posts.indexOf(':'+ThreadID+'-');
			if(t!=-1){
				var tEnd = Posts.indexOf(':', t+1);
				var val = Posts.slice(t, tEnd);
				val = val.replace(':', '');
				var lastReadTime = val.split('-')[1];
				if(PostDate <= lastReadTime){
					continue;
				}
				//allTR[i].childNodes[0+colnum].innerHTML = '<span id="t_'+ThreadID+'" name="NEW"> <font style="color: Red; font-size: x-small">*NEW* </font></span>'+allTR[i].childNodes[0+colnum].innerHTML;
				allTR[i].childNodes[0+colnum].innerHTML = '<span id="t_'+ThreadID+'" name="NEW"><img src="http://www.ghqnet.com/sites/SOL/Files/newpost.png"> </span>'+allTR[i].childNodes[0+colnum].innerHTML;
			}else{
				//allTR[i].childNodes[0+colnum].innerHTML = '<span id="t_'+ThreadID+'" name="NEW"><font style="color: Red; font-size: x-small">*NEW* </font></span>'+allTR[i].childNodes[0+colnum].innerHTML;
				allTR[i].childNodes[0+colnum].innerHTML = '<span id="t_'+ThreadID+'" name="NEW"><img src="http://www.ghqnet.com/sites/SOL/Files/newpost.png"> </span>'+allTR[i].childNodes[0+colnum].innerHTML;
			}
		}
	}
	function newPostMarkRead() {
		var BoardID = path.split('&')[0].split('=')[1];
		var Posts = getSetting( 'Posts_'+BoardID, ':' );
		var t = Posts.indexOf(':AllRead-');
		if(t!=-1){
			var tEnd = Posts.indexOf(':', t+1);
			var val = Posts.slice(t, tEnd);
			val = val.replace(':', '');
			var allReadTime = val.split('-')[1];
		}else{
			var allReadTime = 0;
		}
		var PostDate = path.split('&')[3].split('=')[1];
		PostDate = new Date.parse(URLDecode(PostDate));
		var curTime = new Date().getTime();
		var youngestTime = curTime - 60*60*24*7*1000;
		if(youngestTime < PostDate && allReadTime < PostDate){
			var ThreadID = path.split('&')[1].split('=')[1];
			t = Posts.indexOf(':'+ThreadID+'-');
			if(t!=-1){
				tEnd = Posts.indexOf(':', t+1);
				var val = Posts.slice(t, tEnd);
				Posts = Posts.replace(val, ':'+ThreadID+'-'+PostDate+':');
			}else{
				Posts = Posts+ThreadID+'-'+PostDate+':';
			}
			setSetting( 'Posts_'+BoardID, Posts );
		}
	}
/*
*  END: NEW POSTS
*/	

/*
*  CLEAN BOARD
*/
	function cleanBoard() {
		function cleanBoard_onChange(t) {
			var Value = t.value; 
			switch (Value){
				case 'Choose One':
					$("CleanBoard_SpanOlderThen").style.display = 'none';
					$("CleanBoard_SpanSortOrder").style.display = 'none';
					$("CleanBoard_SortOrder").selectedIndex = $("CleanBoard_SortOrder").options[0].index;
					$("CleanBoard_SpanStartingWithA").style.display = 'none';
					$("CleanBoard_SpanCustom").style.display = 'none';
					$("CleanBoard_SpanExplain").style.display = 'none';
					$("CleanBoard_SpanCleanBoard").style.display = 'none';
				break;
				case 'Check Boxes':
					$("CleanBoard_SpanOlderThen").style.display = '';
					$("CleanBoard_SpanSortOrder").style.display = 'none';
					$("CleanBoard_SortOrder").selectedIndex = $("CleanBoard_SortOrder").options[0].index;
					$("CleanBoard_SpanStartingWithA").style.display = 'none';
					$("CleanBoard_SpanCustom").style.display = 'none';
					$("CleanBoard_SpanExplain").style.display = '';
					$("CleanBoard_SpanCleanBoard").style.display = '';
				break;
				default:
					$("CleanBoard_SpanOlderThen").style.display = '';
					$("CleanBoard_SpanSortOrder").style.display = '';
					$("CleanBoard_SortOrder").selectedIndex = $("CleanBoard_SortOrder").options[0].index;
					$("CleanBoard_SpanStartingWithA").style.display = 'none';
					$("CleanBoard_SpanCustom").style.display = 'none';
					$("CleanBoard_SpanExplain").style.display = 'none';
					$("CleanBoard_SpanCleanBoard").style.display = 'none';
				break;
			}
		}
		function cleanBoard_onChangeSortOrder(t) {
			var Value = t.value; 
			switch (Value){
				case 'Keep Current Sort Order':
					$("CleanBoard_SpanStartingWithA").style.display = 'none';
					$("CleanBoard_SpanCustom").style.display = 'none';
					$("CleanBoard_SpanExplain").style.display = '';
					$("CleanBoard_SpanCleanBoard").style.display = '';
				break;
				case 'Alphabetically':
					$("CleanBoard_SpanStartingWithA").style.display = '';
					$("CleanBoard_SpanCustom").style.display = 'none';
					$("CleanBoard_SpanExplain").style.display = '';
					$("CleanBoard_SpanCleanBoard").style.display = '';
				break;
				case 'Custom':
					$("CleanBoard_SpanStartingWithA").style.display = 'none';
					$("CleanBoard_SpanCustom").style.display = '';
					$("CleanBoard_SpanExplain").style.display = '';
					$("CleanBoard_SpanCleanBoard").style.display = '';
				break;
				default:
					$("CleanBoard_SpanStartingWithA").style.display = 'none';
					$("CleanBoard_SpanCustom").style.display = 'none';
					$("CleanBoard_SpanExplain").style.display = 'none';
					$("CleanBoard_SpanCleanBoard").style.display = 'none';
				break;
			}
		}
		function cleanBoard_Explain() {
			var CleanBoard = $("CleanBoard");
			var Value = CleanBoard.value; 
			switch (Value){
				case 'Choose One':
					return;
				break;
				case 'Check Boxes':
					var days = $('CleanBoard_Days');
					alert('"Check Boxes" on any posts older then "'+days.value+'" Days.');
				break;
				default:
					var SortOrder = $("CleanBoard_SortOrder");
					var Value2 = SortOrder.value; 
					var days = $('CleanBoard_Days');
					switch (Value2){
						case 'Keep Current Sort Order':
							alert('"Move to selected board" any posts older then "'+days.value+'" Days while "Keeping the Current Sort Order".');
						break;
						case 'Alphabetically':
							var StartingWithA = $('CleanBoard_StartingWithA');
							var InStepsOfSign = $('CleanBoard_InStepsOfSign');
							var InStepsOf = $('CleanBoard_InStepsOf');
							if(InStepsOfSign.value == '+'){
								var b = Number(StartingWithA.value) + Number(InStepsOf.value);
								var c = b + Number(InStepsOf.value);
								var d = c + Number(InStepsOf.value);
							}else{
								var b = Number(StartingWithA.value) - Number(InStepsOf.value);
								var c = b - Number(InStepsOf.value);
								var d = c - Number(InStepsOf.value);
							}
							alert('"Move to selected board" any posts older then "'+days.value+'" Days while sorting "Alphabetically" starting with "A" at "'+StartingWithA.value+'" and in steps of "'+InStepsOfSign.value+InStepsOf.value+'". So A="'+StartingWithA.value+'", B="'+b+'", C="'+c+'", D="'+d+'", etc.');
						break;
						case 'Custom':
							var Custom = $('CleanBoard_Custom');
							alert('"Move to selected board" any posts older then "'+days.value+'" Days while placing all moved topics at position "'+Custom.value+'".');
						break;
						default:
							return;
						break;
					}
				break;
			}
		}

		function cleanBoard_CleanBoard() {
			var CleanBoard = $("CleanBoard");
			var Value = CleanBoard.value; 
			switch (Value){
				case 'Choose One':
					return;
				break;
				case 'Check Boxes':
					var days = $('CleanBoard_Days');
					var allChecks = table.getElementsByTagName('input');			// get all TD elements
					var dif = parseInt(days.value) * 24 * 60 * 60 * 1000;
					currentTime = curTime - dif;
					var count = 0;
					for(var i=0; i<allChecks.length; ++i){
						if(allChecks[i].parentNode.parentNode.childNodes[6] == undefined){
							continue;
						}else if(allChecks[i].parentNode.parentNode.childNodes[6].innerHTML == undefined){
							continue;
						}
						if(allChecks[i].parentNode.parentNode.childNodes[6].innerHTML == ''){
							continue;
						}
						var date = allChecks[i].parentNode.parentNode.childNodes[6].innerHTML;
						date = new Date.parse(date);
						if(isNaN(date)){ continue; }
						if(currentTime > date){
							allChecks[i].checked = true;
							count++;
						}
					}
					alert('"'+count+'" Topics have been selected. You may now use the GHQ functions to Move the topics or Delete them.');
				break;
				default:
					var SortOrder = $("CleanBoard_SortOrder");
					var Value2 = SortOrder.value; 
					var days = $('CleanBoard_Days');
					switch (Value2){
						case 'Keep Current Sort Order':
							var days = $('CleanBoard_Days');
							var allChecks = table.getElementsByTagName('input');			// get all TD elements
							var dif = parseInt(days.value) * 24 * 60 * 60 * 1000;
							currentTime = curTime - dif;
							var count = 0;
							for(var i=0; i<allChecks.length; ++i){
								if(allChecks[i].parentNode.parentNode.childNodes[6] == undefined){
									continue;
								}else if(allChecks[i].parentNode.parentNode.childNodes[6].innerHTML == undefined){
									continue;
								}
								if(allChecks[i].parentNode.parentNode.childNodes[6].innerHTML == ''){
									continue;
								}
								var date = allChecks[i].parentNode.parentNode.childNodes[6].innerHTML;
								date = new Date.parse(date);
								if(isNaN(date)){ continue; }
								if(currentTime > date){
									allChecks[i].checked = true;
									count++;
								}
							}
							if(confirm('Are you sure you want to move these "'+count+'" Topics to the selected board while keeping the current Sort Order?')){
								$('NewBoardID').value = Value;
								//document.forms[0].submit();
							}

						break;
						case 'Alphabetically':
							var StartingWithA = $('CleanBoard_StartingWithA');
							var InStepsOfSign = $('CleanBoard_InStepsOfSign');
							var InStepsOf = $('CleanBoard_InStepsOf');




						break;
						case 'Custom':
							var Custom = $('CleanBoard_Custom');





						break;
						default:
							return;
						break;
					}
				break;
			}
		}
		var allInputs = document.getElementsByTagName('input');			// get all TD elements
		for(var i=0; i<allInputs.length; ++i){
			if(allInputs[i].name == 'Delete'){
				var deleteElem = allInputs[i];
				allInputs[i].id = 'Delete';
			}
			if(allInputs[i].name == 'Move'){
				allInputs[i].id = 'Move';
			}
		}
		if(deleteElem === undefined){ return; }
		if(document.forms[0].name == 'EditBoard'){
		}else{
			return;
		}
		var table = deleteElem.parentNode.parentNode.parentNode;
		var row = table.insertRow(-1);
		var cell = row.insertCell(0);
		row.bgColor = deleteElem.parentNode.parentNode.bgColor;
		cell.colSpan = '7';
		var options = "<option>Choose One</option><option>Check Boxes</option>";
		var allSelects = document.getElementsByTagName('select');			// get all TD elements
		for(var i=0; i<allSelects.length; ++i){
			if(allSelects[i].name == 'NewBoardID'){
				var moveElem = allSelects[i];
				allSelects[i].id = 'NewBoardID';
				break;
			}
		}
		if(moveElem === undefined){ 
		}else{
			for(var i=0; i<moveElem.options.length; ++i){
//				options += '<option value="'+moveElem.options[i].value+'">MoveTo: '+moveElem.options[i].text+'</option>';
			}
		}
		cell.innerHTML = '</form>CleanBoard: <select id="CleanBoard">'+options+'</select>'+
		'<span id="CleanBoard_SpanOlderThen" style="display: none;"> any Posts Older Then <select id="CleanBoard_Days"><option value="0">0 Days</option><option value="7">7 Days</option><option value="14">14 Days</option><option selected value="30">1 Month</option><option value="60">2 Months</option><option value="90">3 Months</option><option value="120">4 Months</option><option value="150">5 Months</option><option value="180">6 Months</option><option value="365">1 Year</option></select></span>'+
		'<span id="CleanBoard_SpanSortOrder" style="display: none;"> and set at Sort Order <select id="CleanBoard_SortOrder"><option>Choose One</option><option>Keep Current Sort Order</option><option>Alphabetically</option><option>Custom</option></select></span>'+
		'<span id="CleanBoard_SpanStartingWithA" style="display: none;"> starting with A at <input value="0" size="5" id="CleanBoard_StartingWithA" /> and in steps of <select id="CleanBoard_InStepsOfSign"><option selected>-</option><option>+</option></select><input value="2" size="3" id="CleanBoard_InStepsOf"/></span>'+
		'<span id="CleanBoard_SpanCustom" style="display: none;"> at SortOrder <input value="0" size="5" id="CleanBoard_Custom" /></span>'+
		'<span id="CleanBoard_SpanExplain" style="display: none;"><button id="CleanBoard_Explain" onclick="return false">  Explain</button></span>'+
		'<span id="CleanBoard_SpanCleanBoard" style="display: none;"><button id="CleanBoard_CleanBoard" onclick="return false">  CleanBoard</button></span>';
		$("CleanBoard").addEventListener("change", function(){cleanBoard_onChange(this);}, false);
		$("CleanBoard_SortOrder").addEventListener("change", function(){cleanBoard_onChangeSortOrder(this);}, false);
		$("CleanBoard_Explain").addEventListener("click", function(){cleanBoard_Explain(this);}, false);
		$("CleanBoard_CleanBoard").addEventListener("click", function(){cleanBoard_CleanBoard();}, false);

	}
/*
*  END: CLEAN BOARD
*/	


/*
*  LINKS
*/
	function links() {
		function links_ShowEdits() {
			var links = getSetting( 'Links', '' );
			var linksarr = links.split('::::::');
			if(!editing){
				alert('This function will allow you to select Menu Items you dont use and move them to the bottom of the Menu to get them out of the way. - Simply click the X next to the Menu Item.');
				for(var i=0; i<allTR.length; ++i){
					if(i<=2 || allTR[i].id.slice(0, 14) == 'EditMenuTitle_'){
						allTR[i].firstChild.colSpan = 2;
						if(allTR[i].style.display == 'none'){
							allTR[i].style.display = '';
							EditMenuIndex = i;
						}
					}else{
						var cell = allTR[i].insertCell(0);
						cell.align = 'center';
						if(allTR[i].id.slice(0, 6) == 'Moved_'){
							allTR[i].style.display = '';
							cell.innerHTML = '<span onmouseover="this.style.cursor=\'pointer\';"><font style="color: Orange; font-size: x-small">+</font></span>';
							cell.addEventListener("click", function(){links_UnMoveMenuItem(this);}, false);
						}else{
							cell.innerHTML = '<span onmouseover="this.style.cursor=\'pointer\';"><font style="color: Orange; font-size: x-small">X</font></span>';
							cell.addEventListener("click", function(){links_MoveMenuItem(this);}, false);
						}
					}
				}
				editing = true;
			}else{
				for(var i=0; i<allTR.length; ++i){
					if(allTR[i].firstChild.colSpan == 2){
						allTR[i].firstChild.colSpan = 1;
					}else{
						var cell = allTR[i].deleteCell(0);
						if(allTR[i].id.slice(0, 6) == 'Moved_'){
							allTR[i].style.display = 'none';
						}
					}
				}
				allTR[EditMenuIndex].style.display = 'none';
				x = EditMenuIndex-1;
				allTR[x].style.display = 'none';
				editing = false;
			}
		}
		function links_MoveMenuItem(t) {
			var row = t.parentNode;
			var obj = row.cloneNode(true);
			var id = obj.id.substr(9);
			obj.id = 'Moved_'+id;
			var s = row.parentNode.appendChild(obj);
			s.firstChild.innerHTML = '<span onmouseover="this.style.cursor=\'pointer\';"><font style="color: Orange; font-size: x-small">+</font></span>';
			s.firstChild.addEventListener("click", function(){links_UnMoveMenuItem(this);}, false);
			row.style.display = 'none';
			val = row.lastChild.firstChild.innerHTML;
			var links = getSetting( 'Links', '' );
			if(links == ''){
				setSetting( 'Links', ':::'+val+':::' );
				return;
			}
			if(links.indexOf(':::'+val+':::')!=-1){
				return;
			}
			setSetting( 'Links', links+':::'+val+':::' );
		}
		function links_UnMoveMenuItem(t) {
			var row = t.parentNode;
			var id = row.id.substr(6);
			var s = document.getElementById('EditMenu_'+id);
			s.style.display = '';
			row.parentNode.deleteRow(row.rowIndex);
			var links = getSetting( 'Links', '' );
			links = links.replace(':::'+row.lastChild.firstChild.innerHTML+':::', '');
			setSetting( 'Links', links );
		}
		function links_ResetMenuVerify(t) {
			var answer = confirm("Are you sure you want to clear your Menu Filter Links?");
			if(answer){ ResetMenu(t); }else{ return; }
		}
		function links_ResetMenu(t) {
			var editing, allTR;
			setSetting( 'Links', '' );
			for(var i=0; i<allTR.length; ++i){
				if(allTR[i] === undefined){
					break;
				}
				if(allTR[i].firstChild.colSpan == 2){
					allTR[i].firstChild.colSpan = 1;
				}else{
					if(editing){
						var cell = allTR[i].deleteCell(0);
					}
					allTR[i].style.display = '';
	
					if(allTR[i].id.slice(0, 6) == 'Moved_'){
						allTR[i].parentNode.deleteRow(allTR[i].rowIndex);
						i--;
					}
				}
			}
			var editing = false;
			allTR[allTR.length-1].style.display = 'none';
			allTR[allTR.length].style.display = 'none';
		}
		var allTR = document.getElementsByTagName('tr');			// get all TD elements
		var editing = false;
		var row = allTR[0].parentNode.insertRow(0);
		var cell = row.insertCell(0);
		cell.bgColor = allTR[1].bgColor;
		row.bgColor = allTR[1].bgColor;
		cell.align = 'center';
		cell.innerHTML = '<font color="orange"><strong>Edit Menu</strong></font>';
		cell.addEventListener("click", function(){links_ShowEdits();}, false);
		var row = allTR[0].parentNode.insertRow(1);
		var cell = row.insertCell(0);
		cell.bgColor = allTR[3].bgColor;
		row.bgColor = allTR[3].bgColor;
		cell.align = 'center';
		cell.innerHTML = '<span onmouseover="this.style.cursor=\'pointer\';"><font style="color: Orange; font-size: 12px;">Edit Menu Items</font></span>';
		cell.addEventListener("click", function(){links_ShowEdits();}, false);
		var row = allTR[0].parentNode.insertRow(2);
		var cell = row.insertCell(0);
		cell.bgColor = allTR[1].bgColor;
		row.bgColor = allTR[1].bgColor;
		cell.align = 'center';
		cell.innerHTML = '<span onmouseover="this.style.cursor=\'pointer\';"><font style="color: Orange; font-size: 12px;">Reset Menu Items</font></span>';
		cell.addEventListener("click", function(){links_ResetMenuVerify();}, false);
		var row = allTR[0].parentNode.insertRow(-1);
		var cell = row.insertCell(0);
		cell.align = 'center';
		cell.innerHTML = '<font style="color: Orange; font-size: 14px;"><b>____________</b></font>';
		row.style.display = 'none';
		row.id = 'EditMenuTitle_'+row.rowIndex;
		var row = allTR[0].parentNode.insertRow(-1);
		var cell = row.insertCell(0);
		cell.bgColor = allTR[0].bgColor;
		row.bgColor = allTR[0].bgColor;
		row.id = 'EditMenuTitle_'+row.rowIndex;
		cell.align = 'center';
		cell.innerHTML = '<font style="color: Orange; font-size: 14px;"><b>HIDDEN ITEMS</b></font>';
		row.style.display = 'none';
		row.id = 'EditMenuTitle_'+row.rowIndex;
		var links = getSetting( 'Links', '' );
		var linksarr = links.split('::::::');
		if(linksarr.length != 0){
			for(var i=0; i<allTR.length; ++i){
				var val = allTR[i].firstChild.firstChild.innerHTML;
				if(allTR[i].id.slice(0, 14) == 'EditMenuTitle_' || allTR[i].id.slice(0, 6) == 'Moved_'){
					break;
				}
				if(allTR[i].id == ''){
					allTR[i].id = 'EditMenu_'+allTR[i].rowIndex;
				}
				if(links.indexOf(':::'+val+':::')!=-1){
					var obj = allTR[i].cloneNode(true);
					var id = obj.id.substr(9);
					obj.id = 'Moved_'+id;
					var s = allTR[i].parentNode.appendChild(obj);
					s.firstChild.addEventListener("click", function(){links_UnMoveMenuItem(this);}, false);
					allTR[i].style.display = 'none';
					s.style.display = 'none';
				}
			}
		}
	}
/*
*  END: LINKS
*/	

/*
*  EDIT SITE MANAGER HOMEPAGE
*/
	function siteManager() {
		var allTA = document.getElementsByTagName('textarea');			// get all TD elements
		for(var i=0; i<allTA.length; ++i){
			if(allTA[i].name == 'HeadlineTitle'){
				allTA[i].cols = 75;
				allTA[i].rows = 6;
			}
		}
	}
/*
*  END: EDIT SITE MANAGER
*/	

/*
*  TARGET SELECTOR
*/	
	function targetInfo() {
		function targetInfo_hideRow(t, type) {
			t.style.display = 'none';
			if(Hide[t.id] === undefined){
				Hide[t.id] = new Array();
			}
			if(Hide[t.id][type] === undefined){
				Hide[t.id][type] = true;
			}
		}
		function targetInfo_unHideRow(t, type) {
			if(Hide[t.id] === undefined){
				return;
			}
			if(Hide[t.id][type] === undefined){
				return;
			}
			delete Hide[t.id][type];
			//for each (var val in Hide[t.id]) {
			//	if(val){
			//		return;
			//	}
			//}
			delete Hide[t.id];
			t.style.display = '';
		}
		function targetInfo_filter(t) {
			var Name = t.id.substr(7);
			var Value = t.value; 
			var CellIndex = t.parentNode.cellIndex; 
			switch (Name){
				case 'GDI':
					for(var i=0; i<allTR.length; ++i){
						if(allTR[i].id === undefined){ continue; }
						if(allTR[i].id == ''){ continue; }
						if(Value == ''){
							targetInfo_unHideRow(allTR[i], Name);
							continue;
						}
						if(Value == allTR[i].cells[CellIndex].innerHTML){
							targetInfo_unHideRow(allTR[i], Name);
						}else{
							targetInfo_hideRow(allTR[i], Name);
						}
					}
	  			break;
				case 'Age':
				case 'NW':
				case 'Land':
				case 'Spal':
				case 'SDI':
					var Operator = Value.substr(0, 1); 
					var Value = Value.substr(1); 
					for(var i=0; i<allTR.length; ++i){
						if(allTR[i].id === undefined){ continue; }
						if(allTR[i].id == ''){ continue; }
						if(Value == ''){
							targetInfo_unHideRow(allTR[i], Name);
							continue;
						}
						if(Name == 'Age'){
							var TRValue = allTR[i].cells[CellIndex].firstChild.firstChild.innerHTML;
						}else if( Name == 'Spal'){
							var TRValue = allTR[i].cells[CellIndex].firstChild.innerHTML;
						}else if( Name == 'SDI'){
							var TRValue = allTR[i].cells[CellIndex].firstChild.innerHTML.slice(0, -1);
						}else if( Name == 'Land'){
							var TRValue = allTR[i].cells[CellIndex].innerHTML.replace(/\,/g,'');
						}else{
							var TRValue = allTR[i].cells[CellIndex].innerHTML;
						}
						if(Operator == '>'){
							if(parseInt(TRValue) >= parseInt(Value)){
								targetInfo_unHideRow(allTR[i], Name);
							}else{
								targetInfo_hideRow(allTR[i], Name);
							}
						}else{
							if(parseInt(TRValue) < parseInt(Value)){
								targetInfo_unHideRow(allTR[i], Name);
							}else{
								targetInfo_hideRow(allTR[i], Name);
							}
						}
					}
	  			break;
				case 'NWDiff':
				case 'LandDiff':
					for(var i=0; i<allTR.length; ++i){
						if(allTR[i].id === undefined){ continue; }
						if(allTR[i].id == ''){ continue; }
						if(Value == ''){
							targetInfo_unHideRow(allTR[i], Name);
							continue;
						}
						if(allTR[i].cells[CellIndex].innerHTML != '' && allTR[i].cells[CellIndex].innerHTML != '0'){
							targetInfo_unHideRow(allTR[i], Name);
						}else{
							targetInfo_hideRow(allTR[i], Name);
						}
					}
	  			break;
				default:
				break;
			}
		}
		function targetInfo_quickSets(t) {
			if(t == 'UnHide'){
				for(var i=0; i<allTR.length; ++i){
					targetInfo_unHideRow(allTR[i], 'Hide');
				}
			}else{
				var allSelects = document.getElementsByTagName('select');
				for(var i=0; i<allSelects.length; ++i){
					for(var x=0; x<allSelects[i].length; ++x){
						if(allSelects[i].options[x].value == ''){ 
							allSelects[i].selectedIndex = allSelects[i].options[x].index;
							break;
						}
					}
				}
				for(var x=0; x<allTR.length; ++x){
					var Name = allTR[x].id.substr(7);
					allTR[x].style.display = '';
					delete Hide;
					var Hide = new Array;
				}
			}
		}
		var allTR = document.getElementsByTagName('tr');			// get all TD elements	
		Hide = new Array();
		Data = new Array();
		var allTH = document.getElementsByTagName('th');			// get all TD elements
		for(var i=0; i<allTH.length; ++i){
			if(allTH[i].innerHTML.slice(-11, -4) == 'Country' ){
				var table = allTH[i].parentNode.parentNode;
				table.id = 'CountryTable';
				var header = 'Number';
				num = 10000;
				for (var x=0; x<table.rows.length; x++) {
					var newCell = table.rows[x].insertCell(i+1);
					newCell.bgColor = '#222222';
					newCell.align = 'center';
					if(x == 0){
						newCell.innerHTML = '<text color=#DDDDDD><b>'+header+'</b></font>';
					}else{
						newCell.innerHTML = '';
						newCell.id = num+'_CountryNumber';
						num++;
					}
					var newCell = table.rows[x].insertCell(i);
					newCell.bgColor = '#222222';
					newCell.align = 'center';
					if(x == 0){
						newCell.innerHTML = '<text color=#DDDDDD><b>Hide Country</b></font>';
					}else{
						newCell.innerHTML = '<span onmouseover="this.style.cursor=\'pointer\'; this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">Hide</span>';
						newCell.id = 'Hide_'+x;
						newCell.addEventListener("click", function(){targetInfo_hideRow(this.parentNode, 'Hide');}, false);
					}
				}
			} 
		}
		var row = table.insertRow(0);
		var cell = row.insertCell(0);
		cell.colSpan = table.rows[1].cells.length;
		cell.bgColor = 'black';
		cell.align = 'right';
		cell.innerHTML = 'QUICKSETS: <button style="color: red; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; font-weight: bold; background-color: #191919; border: 2px #444444 solid" id="QuickSet_UnHide" onClick="return false;">UnHide All Rows</button><button style="color: red; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; font-weight: bold; background-color: #191919; border: 2px #444444 solid" id="QuickSet_Filters" onClick="return false;"><strong>Reset Filters</strong></button>';
		document.getElementById("QuickSet_UnHide").addEventListener("click", function(){targetInfo_quickSets("UnHide");}, false);
		document.getElementById("QuickSet_Filters").addEventListener("click", function(){targetInfo_quickSets("Filters");}, false);
		var allTH = table.getElementsByTagName('th');			// get all TD elements
		var row = table.insertRow(1);
		for(var i=0; i<allTH.length; ++i){
			var column = allTH[i].firstChild.innerHTML;
			Data[allTH[i].cellIndex] = column;
		}
		for(var i=0; i<table.rows[2].cells.length; ++i){
			var cell = row.insertCell(i);
			cell.bgColor = 'black';
			if(i == 0){
				cell.align = 'center';
				cell.innerHTML = '<a href="javascript:location.reload()">Refresh this page</a>';
				continue;
			}
			if(i == 2){
				cell.align = 'right';
				cell.innerHTML = 'FILTERS: ';
				continue;
			}
			cell.align = 'center';
			if(Data[i] === undefined){
				cell.innerHTML = ' ';
				continue;
			}
	
			switch (Data[i])
			{
				case 'GDI':
					cell.innerHTML = '<select name="Filter_GDI" id="Filter_GDI" style="color: white; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; background-color: #191919; border: 2px #444444 solid"><option> </option><option>Y</option></select>';
					document.getElementById("Filter_GDI").addEventListener("change", function(){targetInfo_filter(this);}, false);
	  			break;
				case 'Age(h)':
					cell.innerHTML = '<select name="Filter_Age" id="Filter_Age" style="color: white; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; background-color: #191919; border: 2px #444444 solid"><><option value="<24">Age<24</option><option value="<6">Age<6</option><option value="<2">Age<2</option><option selected value=""> </option><option value=">2">Age>2</option><option value=">6">Age>6</option><option value=">12">Age>12</option><option value=">24">Age>24</option></select>';
					document.getElementById("Filter_Age").addEventListener("change", function(){targetInfo_filter(this);}, false);
	  			break;
				case 'NW(M)':
					cell.innerHTML = '<select name="Filter_NW" id="Filter_NW" style="color: white; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; background-color: #191919; border: 2px #444444 solid"><><option value="<5">NW<5m</option><option value="<1">NW<1m</option><option value="<0.5">NW<500k</option><option selected value=""> </option><option value=">0.5">NW>500k</option><option value=">1">NW>1m</option><option value=">2">NW>2m</option><option value=">5">NW>5m</option></select>';
					document.getElementById("Filter_NW").addEventListener("change", function(){targetInfo_filter(this);}, false);
	  			break;
				case 'NW Diff':
					cell.innerHTML = '<select name="Filter_NWDiff" id="Filter_NWDiff" style="color: white; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; background-color: #191919; border: 2px #444444 solid"><><option value=""> </option><option value="Changed">Changed</option></select>';
					document.getElementById("Filter_NWDiff").addEventListener("change", function(){targetInfo_filter(this);}, false);
	  			break;
				case 'Land':
					cell.innerHTML = '<select name="Filter_Land" id="Filter_Land" style="color: white; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; background-color: #191919; border: 2px #444444 solid"><><option value="<10000">Land<10000</option><option value="<5000">Land<5000</option><option selected value=""> </option><option value=">1000">Land>1000</option><option value=">5000">Land>5000</option><option value=">10000">Land>10000</option><option value=">20000">Land>20000</option></select>';
					document.getElementById("Filter_Land").addEventListener("change", function(){targetInfo_filter(this);}, false);
	  			break;
				case 'Land Diff':
					cell.innerHTML = '<select name="Filter_LandDiff" id="Filter_LandDiff" style="color: white; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; background-color: #191919; border: 2px #444444 solid"><><option value=""> </option><option value="Changed">Changed</option></select>';
					document.getElementById("Filter_LandDiff").addEventListener("change", function(){targetInfo_filter(this);}, false);
	  			break;
				case 'Spal':
					cell.innerHTML = '<select name="Filter_Spal" id="Filter_Spal" style="color: white; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; background-color: #191919; border: 2px #444444 solid"><><option value="<75">Spal<75</option><option value="<50">Spal<50</option><option value="<25">Spal<25</option><option value="<15">Spal<15</option><option selected value=""> </option></select>';
					document.getElementById("Filter_Spal").addEventListener("change", function(){targetInfo_filter(this);}, false);
	  			break;
				case 'SDI':
					cell.innerHTML = '<select name="Filter_SDI" id="Filter_SDI" style="color: white; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; background-color: #191919; border: 2px #444444 solid"><><option value="<50">SDI<50%</option><option value="<25">SDI<25%</option><option value="<10">SDI<10%</option><option selected value=""> </option></select>';
					document.getElementById("Filter_SDI").addEventListener("change", function(){targetInfo_filter(this);}, false);
	  			break;
				default:
					continue;
				break;
			}
		}
		var allTD = table.getElementsByTagName('td');			// get all TD elements
		var number = 10000;
		for(var i=0; i<allTD.length; ++i){
			if(allTD[i].parentNode.rowIndex <= 2){
				continue;
			}
			var Name = Data[allTD[i].cellIndex];
			if(Name != undefined){
				allTD[i].id = number+'_'+Name;
				number++;
			}
			if(allTD[i].id == ''){
				continue;
			}
			if(allTD[i].id.substr(6) == 'CountryNumber'){
				var last = i-1;
				var num = allTD[last].innerHTML.split('#');
				allTD[i].innerHTML = num[1].slice(0, -5);
				allTD[last].noWrap = true;
				allTD[i].parentNode.id = 'TR_'+num[1].slice(0, -5);
			} 
			if(Name == undefined){
				continue;
			} 
			switch (Name)
			{
				case 'GDI':
					var val = allTD[i].innerHTML;
					if(val!=''){
						allTD[i].bgColor = 'DarkRed';
					}
	  			break;
				case 'Age(h)':
					var val = allTD[i].firstChild.firstChild.innerHTML;
					if(val <= 2 && val!=''){
						allTD[i].bgColor = 'DarkGreen';
					}else if(val >= 12){
						allTD[i].bgColor = 'DarkRed';
					}else if(val >= 3){
						allTD[i].bgColor = '#800080';
					}else{
						allTD[i].bgColor = '#222222';
					}
	  			break;
				case 'NW Diff':
					var val = allTD[i].innerHTML;
					if(val!='' && val!='0'){
						allTD[i].bgColor = 'DarkRed';
					}
	  			break;
				case 'Land Diff':
					var val = allTD[i].innerHTML;
					if(val!='' && val!='0'){
						allTD[i].bgColor = 'DarkRed';
					}
	  			break;
				case 'Spal':
					var val = allTD[i].firstChild.innerHTML;
					if(val == ''){ continue; }
					if(val <= 25){
						allTD[i].bgColor = 'DarkGreen';
					}else if(val >= 50){
						allTD[i].bgColor = 'DarkRed';
					}else{
						allTD[i].bgColor = '#800080';
					}
	  			break;
				case 'SDI':
					var val = allTD[i].firstChild.innerHTML.slice(0, -1);
					if(val <= 24 && val!=''){
						allTD[i].bgColor = 'DarkGreen';
					}else if(val >= 50){
						allTD[i].bgColor = 'DarkRed';
					}else if(val >= 25){
						allTD[i].bgColor = '#800080';
					}else{
						allTD[i].bgColor = '#222222';
					}
	  			break;
	
				default:
					continue;
				break;
			}
		}
	}
/*
*  END: TARGET SELECTOR 
*/	

/*
*  TARGET SELECTOR HOMEPAGE
*/
	function targetSelector() {
		function targetSelector_quickSets(t) {
			for(var i=0; i<allInputs.length; ++i){
				if(allInputs[i].type == 'checkbox'){
					allInputs[i].checked = false; 
				}
			}
			for(var i=0; i<Data[t].length; ++i){
				var temp = Data[t][i];
				document.getElementById(temp).checked = true;
			}
		}
		var Data = new Array();
		Data['SiG'] = new Array('Tag', 'Age', 'Networth', 'NWDiff', 'Land', 'LandDiff', 'Spies', 'Spal');
		Data['Warmod'] = new Array();
		var allTD;												// holds collection of all TD elements
		allTD = document.getElementsByTagName('td');			// get all TD elements
		var allInputs = document.getElementsByTagName("input");
		var number = 0;
		for(var i=0; i<allInputs.length; ++i){
			allInputs[i].id = allInputs[i].name;
			if(allInputs[i].type == 'checkbox'){
				if(allInputs[i].checked == true){
					Data['Warmod'][number] = allInputs[i].id;
					number++;
				}
			}
		}
		for(var i=0; i<allTD.length; ++i){
			if(allTD[i].innerHTML  == "Select your desired fields"){
				allTD[i].innerHTML = allTD[i].innerHTML + '<BR>QUICKSETS: <button style="color: darkturquoise; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; font-weight: bold; background-color: #191919; border: 2px #444444 solid" id="QuickSet_Warmod" onClick="return false;"><strong>Warmod</strong></button>  |  <button style="color: DarkViolet; font-family: Verdana, Helvetica, Arial; font-size: 10 pt; font-weight: bold; background-color: #191919; border: 2px #444444 solid" id="QuickSet_SiG" onClick="return false;"><strong>SiG</strong></button>';
				document.getElementById("QuickSet_Warmod").addEventListener("click", function(){targetSelector_quickSets("Warmod");}, false);
				document.getElementById("QuickSet_SiG").addEventListener("click", function(){targetSelector_quickSets("SiG");}, false);
			} 
		}
	}
/*
*  END: TARGET SELECTOR 
*/	

/*
*  EDIT USER HOMEPAGE
*/
	function userManager(){
		function userManager_DeleteConfirm(t) {
		//	var allInputs = document.getElementsByTagName("input");
		//	var Names = new Array();
		//	for(var i=0; i<allInputs.length; ++i){
		//		if(allInputs[i].name != 'UserID'){ continue; }
		//		if(allInputs[i].checked != true){ continue; }
		//		Names.push(allInputs[i].parentNode.parentNode.cells[DisplayNameID].innerHTML);
		//	}
		//	var answer = confirm('Are you sure you want to delete these users? \n'+Names);
		//	if(answer == true){
		//		document.forms[0].submit();
		//	}
		}
		var allTR = document.getElementsByTagName('tr');			// get all TD elements
		var table = document.forms[0].parentNode;
		var allTR = table.getElementsByTagName('tr');			// get all TD elements
		var CountryID = false;
		var LastLoginID = false;
		var DisplayNameID = false;
		var day = (1000*60*60*24);
		var hour = (1000*60*60);
		var min = (1000*60);
		for(var i=0; i<allTR[1].cells.length; ++i){
			if(allTR[1].cells[i].innerHTML.indexOf("Country")!=-1){
				CountryID = i;
			} else if(allTR[1].cells[i].innerHTML.indexOf("Login")!=-1){
				LastLoginID = i;
			} else if(allTR[1].cells[i].innerHTML.indexOf("Display")!=-1){
				DisplayNameID = i;
			} 
		}
		for(var i=1; i<allTR.length; ++i){
			if(allTR[i].firstChild.colSpan >= 2){
				//if(i == allTR.length-1){
				//	allTR[i].firstChild.innerHTML = '<button name="Delete2" value="Delete Selected">Delete Selected</button>';
				//	allTR[i].firstChild.firstChild.addEventListener("click", function(){DeleteConfirm(this);}, false);
				//}
				continue;
			}
			var cell = allTR[i].insertCell(-1);
			cell.bgColor = allTR[i].bgColor;
			cell.noWrap = true;
			if(i == 1){
				allTR[i].cells[LastLoginID+1].innerHTML = '<font color="Orange">How Long Ago</font><input name="Delete" type="hidden" value"Delete Selected">';
				allTR[i].cells[LastLoginID+1].align = 'center';
				continue;
			}
			if(LastLoginID != false){
				var LastLogin = allTR[i].cells[LastLoginID].innerHTML;
				allTR[i].cells[LastLoginID].noWrap = true;
				if(LastLogin == ''){
					allTR[i].cells[LastLoginID+1].bgColor = 'DarkRed';
					continue;
				}
				LastLogin = new Date.parse(LastLogin);
				var dif = curTime - LastLogin;
				if(dif >= day){
					var d = Math.floor(dif/day);
					t = dif - d * day;
					var h = Math.floor(t/hour);
					var timestring = d+" Day(s) "+h+" Hours Ago";
					if(d >= 30){
						allTR[i].cells[LastLoginID+1].bgColor = 'DarkRed';
					}else if(d >= 7){
						allTR[i].cells[LastLoginID+1].bgColor = '#0080C0';
					}
				}else if(dif >= hour){
					var h = Math.floor(dif/hour);
					t = dif - h * hour;
					var m = Math.floor(t/min);
					var timestring = h+" Hours "+m+" Mins Ago";
				}else{
					var m = Math.floor(dif/min);
					var timestring = m+" Mins Ago";
	
				}
				allTR[i].cells[LastLoginID+1].innerHTML = timestring;
			}
			if(CountryID != false){
				var Country = allTR[i].cells[CountryID].innerHTML;
				if(Country == ''){
					allTR[i].cells[CountryID].bgColor = 'DarkRed';
				}
			}
		}
	}
/*
*  END: EDIT USER HOMEPAGE
*/	

/*
*  Edit User
*/
	function editUser() {
		function editUser_ParseGroups(){
			var bgcolor = '#454545';
			var moves = '';
			for (var x=0;x<PermNames.length;x++){
				var temp = PermNames[x];
				Perms[temp]['UserCount'] = 0;	
				Perms[temp]['InUsersGroup'] = 0;
			}
			for (var i=0;i<Data.length;i++){
				var userhave = 1;
				for (var x=0;x<Data[i]['Perms'].length;x++){
					var temp = Data[i]['Perms'][x];
					if(Perms[temp] === undefined){
					}else{
						if(Perms[temp]['UserHas'] == 0){
							userhave = 0;
						}
					}
				}
				if(userhave == 1){
					for (var x=0;x<Data[i]['Perms'].length;x++){
						var temp = Data[i]['Perms'][x];
						if(Perms[temp] === undefined){
						}else{
							Perms[temp]['UserCount']++;
							Perms[temp]['InUsersGroup'] = 1;
						}
					}
				}
			}
			for (var i=0;i<Data.length;i++){
				if(bgcolor == bgcolor1){ bgcolor = bgcolor2; }else{ bgcolor = bgcolor1; }
		  		var groupName = Data[i]['Title'];
				var userhave = 1;
				var showpermslisthave = '';
				var showpermslistdonthave = '';
				for (var x=0;x<Data[i]['Perms'].length;x++){
					var temp = Data[i]['Perms'][x];
					if(Perms[temp] === undefined){
					}else{
						if(Perms[temp]['UserCount'] > 1){
							var color = 'grey';
						}else{
							var color = 'green';
						}
						if(Perms[temp]['UserHas'] == 1){
							showpermslisthave = showpermslisthave + '<font color="'+ color +'">' + temp + '</font><BR>';
						}else{
							showpermslistdonthave = showpermslistdonthave + '<font color="'+ color +'">' + temp + '</font><BR>';
							userhave = 0;
						}					
					}
				}
	
				var spanhave = '<span id="spanhave_'+ groupName +'" class="box" return false;" style="display:none">'+showpermslisthave+'</span>';
				var spandonthave = '<span id="spandonthave_'+ groupName +'" class="box" return false;" style="display:none">'+showpermslistdonthave+'</span>';
				var color = Data[i]['Color'];
				if(userhave == 1){
					moves = moves + '<tr><td align="right" bgcolor="'+bgcolor+'"><br>'+spandonthave+'</td><td bgcolor="'+bgcolor+'"><button style="color: #FF0000" id="Move_'+ groupName +'" name="'+ i +'"><strong><<<</strong></button></td><td bgcolor="'+bgcolor+'" id="_'+ groupName +'"><font color="'+ color +'">' + groupName + '</font>' + spanhave + '</td></tr>';
				}else{
					moves = moves + '<tr><td align="right" bgcolor="'+bgcolor+'" id="_'+ groupName +'"><font color="'+ color +'">' + groupName + '</font>' + spandonthave +'</td><td bgcolor="'+bgcolor+'"><button id="Move_' + groupName + '" name="'+ i +'"><strong>>>></strong></button></td><td bgcolor="'+bgcolor+'"><br>' + spanhave + '</td></tr>';
				}
		
			}	
	
			var moves2 = '';
			var showpermslisthave = '';
			var showpermslistdonthave = '';
			for (var i=0;i<PermNames.length;i++){
				if(bgcolor == bgcolor1){ bgcolor = bgcolor2; }else{ bgcolor = bgcolor1; }
				var temp = PermNames[i];
				var color = 'white';
				var cellcolor = bgcolor;
				if (temp.indexOf("IA")!=-1 || temp.indexOf("FL -")!=-1){
					color = '#FF6633';
				}else if (temp.indexOf("WAR DEPT:")!=-1){
					color = 'deepskyblue';
				}else if (temp.indexOf("FR")!=-1){
					color = 'limegreen';
				}else if (temp.indexOf("FL:")!=-1){
					color = '#FF9966';
				}
				if (Perms[temp]['InUsersGroup'] == 0){
					cellcolor = 'darkred';
				}
				if(Perms[temp]['UserHas'] == 1){
					showpermslisthave = showpermslisthave + '<font color="'+ color +'">' + temp + '</font><BR>';
					moves2 = moves2 + '<tr><td align="right" bgcolor="'+bgcolor+'"><br></td><td bgcolor="'+bgcolor+'"><button style="color: #FF0000" id="MovePerm_' + temp + '" name="'+ i +'"><strong><<<</strong></button></td><td bgcolor="'+cellcolor+'" id="_'+ temp +'"><font color="'+color+'">' + temp + '</font></td></tr>';
				}else{
					showpermslistdonthave = showpermslistdonthave + '<font color="'+ color +'">' + temp + '</font><BR>';
					moves2 = moves2 + '<tr><td align="right" bgcolor="'+bgcolor+'" id="_'+ temp +'"><font color="'+color+'">' + temp +'</font></td><td bgcolor="'+bgcolor+'"><button id="MovePerm_' + temp + '" name="'+ i +'"><strong>>>></strong></button></td><td bgcolor="'+bgcolor+'"><br></td></tr>';
				}
			}
			allTD[tableIndex].innerHTML = tableHeader + moves + tableMiddle + moves2 + tableFooter;
			for (var i=0;i<Data.length;i++){
		  		var groupName = Data[i]['Title'];
				var t = document.getElementById('Move_'+groupName);
				var te = document.getElementById('_'+groupName);
				te.addEventListener("click", function(){editUser_ShowText(this.id);}, false);
				if(t.innerHTML == '<strong>&lt;&lt;&lt;</strong>'){
					t.addEventListener("click", function(){editUser_setPerms(this.name, "have");}, false);
				}else{
					t.addEventListener("click", function(){editUser_setPerms(this.name, "donthave");}, false);
				}
			}
			for (var i=0;i<PermNames.length;i++){
				var temp = PermNames[i];
				var t = document.getElementById('MovePerm_'+temp);
				t.addEventListener("click", function(){editUser_setPerm(this.id);}, false);					
			}
		}
		function editUser_setAllPerms(groupName){
			if(groupName == 'Member' || groupName == 'Veteran'){
				alert('Please Choose a Force from the Force Dropdown menu then hit Edit User!');
				var force = $('Force');
				force.size = force.options.length;
				force.focus(); 
			}else{
				var forceID = document.getElementById("Force");
				for (var i = 0; i < forceID.length; ++i){
		  			if (forceID[i].text.indexOf(groupName)!=-1){
		    				forceID.selectedIndex = i;
						break;
					}
				}
			}
			var StatusExempt = document.getElementById("StatusExempt");
			if(groupName == 'Vacationer'){
		    		StatusExempt.checked = true;
			}else{
		    		StatusExempt.checked = false;
			}
			document.getElementById("Position").value = groupName;
			var groupID = document.getElementById("Group");
			for (var i = 0; i < groupID.length; ++i){
		  		if (groupName == 'Vacationer'){
					if(groupID[i].text.indexOf('Vacation')!=-1){
		    				groupID.selectedIndex = i;
						break;
					}
				}else if (groupID[i].text.indexOf(groupName)!=-1){
		    			groupID.selectedIndex = i;
					break;
				}
			}
			var publicBoardAccessID = document.getElementById("BoardAccess");
			for (var i = 0; i < publicBoardAccessID.length; ++i){
		  		if (groupName == 'Veteran'){
					if(publicBoardAccessID[i].text.indexOf('Veteran')!=-1){
		    				publicBoardAccessID.selectedIndex = i;
						break;
					}
				}else if (publicBoardAccessID[i].text.indexOf('Member')!=-1){
		    			publicBoardAccessID.selectedIndex = i;
					break;
				}
			}
			for (var x=0;x<PermNames.length;x++){
				var pName = PermNames[x];
				Perms[pName]['UserHas'] = 0;
				Perms[pName]['UserCount'] = 0;
				document.getElementById("checkbox_"+pName).checked = false;
			}
			for (var i=0;i<Data.length;i++){
		  		if(groupName == Data[i]['Title']){
					break;
				}
			}	
		
			editUser_setPerms(i, 'donthave');
			notify('User placed into: "'+groupName+'"'); 

		}
		function editUser_setPerms(DataID, current){
			for (var x=0;x<Data[DataID]['Perms'].length;x++){
				var temp = Data[DataID]['Perms'][x];
				if(Perms[temp] === undefined){
				}else{
					if(current == 'donthave'){
						Perms[temp]['UserHas'] = 1;
						Perms[temp]['UserCount']++;
						document.getElementById("checkbox_"+temp).checked = true;
					}else{
						if(Perms[temp]['UserCount'] <= 1){
							Perms[temp]['UserHas'] = 0;
							Perms[temp]['UserCount'] = 0;
							document.getElementById("checkbox_"+temp).checked = false;
						}else{
							Perms[temp]['UserCount']--;
						}
					}					
				}
			}
			editUser_ParseGroups();
		}
		function editUser_setPerm(permName){
			permName = permName.substr(9);
			if(Perms[permName]['UserHas'] == 1){
				Perms[permName]['UserHas'] = 0;
				Perms[permName]['UserCount'] = 0;
				document.getElementById("checkbox_"+permName).checked = false;
			}else{
				Perms[permName]['UserHas'] = 1;
				Perms[permName]['UserCount']++;
				document.getElementById("checkbox_"+permName).checked = true;
			}
		
			editUser_ParseGroups();
		}
		function editUser_ShowText(id) {
			var t = document.getElementById('spanhave'+id);
			var t2 = document.getElementById('spandonthave'+id);
			if(t.style.display == 'block'){
				t.style.display = 'none';
				t2.style.display = 'none';
			}else{
				t.style.display = 'block';
				t2.style.display = 'block';
			}
		}
		function editUser_checkedBox(t) {
			temp = t.id.substr(9);
			if(t.checked == true){
				Perms[temp]['UserHas'] = 1;
				Perms[temp]['UserCount']++;
			}else{
				Perms[temp]['UserHas'] = 0;
				Perms[temp]['UserCount']--;
			}
			editUser_ParseGroups();
		}
		var allTH;
		var allTD;												// holds collection of all TD elements
		var td_index;											// var used to index
		allTD = document.getElementsByTagName('td');			// get all TD elements
		allTH = document.getElementsByTagName('th');			// get all TH elements
		
		var number = 0;
		var Data = new Array();
		
		Data[number] = new Array();
		Data[number]['Department'] = '';
		Data[number]['Level'] = '';
		Data[number]['Title'] = 'Vacationer';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = '#9999CC';
		Data[number]['Perms'] = new Array('ACCESS: Vacationers');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = '';
		Data[number]['Level'] = '';
		Data[number]['Title'] = 'Merc';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = '#999999';
		Data[number]['Perms'] = new Array('Intel User', 'Mentor User', 'Regular User', 'Strategy User', 'View Enemy Reports', 'View User List', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers');
		number++;

		Data[number] = new Array();
		Data[number]['Department'] = '';
		Data[number]['Level'] = '';
		Data[number]['Title'] = 'Member';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = 'white';
		Data[number]['Perms'] = new Array('Intel User', 'Mentor User', 'Regular User', 'Retals', 'Strategy User', 'View Enemy Reports', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = '';
		Data[number]['Level'] = '';
		Data[number]['Title'] = 'Veteran';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = 'white';
		Data[number]['Perms'] = new Array('Intel User', 'Mentor Admin', 'Mentor User', 'Regular User', 'Retals', 'Strategy User', 'View Enemy Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'BOARD: Veterans Board');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'IA';
		Data[number]['Level'] = '4';
		Data[number]['Title'] = 'Recruiter';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = '#FFCC99';
		Data[number]['Perms'] = new Array('Group Messaging', 'Intel User', 'Mass Mailing', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy User', 'View Applications', 'View Enemy Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'IA DEPT: Main', 'IA DEPT: Recruiting Team', 'IA DEPT: Recruiting Team - MSG ONLY');
		number++;

		Data[number] = new Array();
		Data[number]['Department'] = '';
		Data[number]['Level'] = '4';
		Data[number]['Title'] = 'R&D Scientist';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = '#FFCC99';
		Data[number]['Perms'] = new Array('Intel User', 'Mentor Admin', 'Mentor User', 'Regular User', 'Retals', 'Strategy Admin', 'Strategy Reports', 'Strategy User', 'View Enemy Reports', 'View Reports', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'IA DEPT: Main', 'IA DEPT: R&D Scientist', 'IA DEPT: R&D Scientist - MSG ONLY');
		number++;
			
		Data[number] = new Array();
		Data[number]['Department'] = 'IA';
		Data[number]['Level'] = '4';
		Data[number]['Title'] = 'Strategy Team Member';
		Data[number]['Abbr'] = 'STM';
		Data[number]['Color'] = '#FFCC99';
		Data[number]['Perms'] = new Array('Force Messaging', 'Group Messaging', 'Intel User', 'Mass Mailing', 'Mentor Admin', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy Admin', 'Strategy Reports', 'Strategy User', 'View Enemy Reports', 'View Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'IA DEPT: Main', 'IA DEPT: Strategy Team', 'IA DEPT: Strategy Team - MSG ONLY');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'IA';
		Data[number]['Level'] = '4';
		Data[number]['Title'] = 'Times Team Member';
		Data[number]['Abbr'] = 'TTM';
		Data[number]['Color'] = '#FFCC99';
		Data[number]['Perms'] = new Array('Intel User', 'Mass Mailing', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy User', 'View Enemy Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'IA DEPT: Main', 'IA DEPT: Times Team Member', 'IA DEPT: Times Team - MSG ONLY');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'IA';
		Data[number]['Level'] = '3';
		Data[number]['Title'] = 'Recruiter Team Leader';
		Data[number]['Abbr'] = 'RTL';
		Data[number]['Color'] = '#FF9966';
		Data[number]['Perms'] = new Array('Group Messaging', 'Intel User', 'Mass Mailing', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy User', 'View Applications', 'View Enemy Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'IA DEPT: Main', 'IA DEPT: Recruiting Team', 'IA DEPT: Recruiting Team - MSG ONLY', 'IA DEPT: Recruiting Team Leader');
		number++;

		Data[number] = new Array();
		Data[number]['Department'] = '';
		Data[number]['Level'] = '3';
		Data[number]['Title'] = 'R&D Scientist Team Leader';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = '#FF9966';
		Data[number]['Perms'] = new Array('Intel User', 'Mentor Admin', 'Mentor User', 'Regular User', 'Retals', 'Strategy Admin', 'Strategy Reports', 'Strategy User', 'View Enemy Reports', 'View Reports', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'IA DEPT: Main', 'IA DEPT: R&D Scientist', 'IA DEPT: R&D Scientist - MSG ONLY', 'IA DEPT: R&D Scientist Team Leader');
		number++;

		Data[number] = new Array();
		Data[number]['Department'] = 'IA';
		Data[number]['Level'] = '3';
		Data[number]['Title'] = 'Strategy Team Leader';
		Data[number]['Abbr'] = 'STL';
		Data[number]['Color'] = '#FF9966';
		Data[number]['Perms'] = new Array('Force Messaging', 'Group Messaging', 'Intel User', 'Mass Mailing', 'Mentor Admin', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy Admin', 'Strategy Reports', 'Strategy User', 'View Enemy Reports', 'View Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'IA DEPT: Main', 'IA DEPT: Strategy Team', 'IA DEPT: Strategy Team - MSG ONLY', 'IA DEPT: Strategy Team Leader');
		number++;

		Data[number] = new Array();
		Data[number]['Department'] = 'IA';
		Data[number]['Level'] = '3';
		Data[number]['Title'] = 'Times Team Leader';
		Data[number]['Abbr'] = 'TTL';
		Data[number]['Color'] = '#FF9966';
		Data[number]['Perms'] = new Array('Intel User', 'Mass Mailing', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy User', 'View Enemy Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'IA DEPT: Main', 'IA DEPT: Times Team Member', 'IA DEPT: Times Team - MSG ONLY', 'IA DEPT: Times Team Leader');
		number++;
		
		ForceLeader = new Array();
		ForceLeader['Department'] = 'IA';
		ForceLeader['Level'] = '3';
		ForceLeader['Abbr'] = 'FL';
		ForceLeader['Color'] = '#FF9966';
		ForceLeader['Perms'] = 'EDITABLE BELOW';
		
		var FLPerms = new Array();
		for(var i=0; i<allTD.length; ++i){
			if (allTD[i].innerHTML.indexOf("checkbox")!=-1 && allTD[i].innerHTML.indexOf("Permissions")!=-1 && allTD[i].innerHTML.indexOf("Edit User Permissions")==-1){
				var temp = allTD[i].innerHTML.split("\"");
				var next = i+1;
				var permname = allTD[next].innerHTML;
		
				if(permname.indexOf("FL: ")!=-1){
					Data[number] = new Array();
					Data[number]['Department'] = ForceLeader['Department'];
					Data[number]['Level'] = ForceLeader['Level'];
					Data[number]['Title'] = permname;
					Data[number]['Abbr'] = ForceLeader['Abbr'];
					Data[number]['Color'] = ForceLeader['Color'];
					if(permname.indexOf("FL: Merc")==-1){
						Data[number]['Perms'] = new Array('Force Leader', 'Force Messaging', 'Group Messaging', 'Intel User', 'Mass Mailing', 'Mentor Admin', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy Admin', 'Strategy User', 'View Enemy Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'FL - MSG ONLY', permname, 'IA DEPT: Main');
					}else{
						Data[number]['Perms'] = new Array('Force Leader', 'Force Messaging', 'Group Messaging', 'Intel User', 'Mass Mailing', 'Mentor Admin', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy Admin', 'Strategy User', 'View Enemy Reports', 'View User Countries', 'View User List', 'View User Notes', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'FL - MSG ONLY', permname, 'IA DEPT: Main');
					}
					FLPerms[number] = permname;
					number++;
				}
			}
		}
		
		Data[number] = new Array();
		Data[number]['Department'] = 'IA';
		Data[number]['Level'] = '2';
		Data[number]['Title'] = 'IA/Merc Coordinator';
		Data[number]['Abbr'] = 'Coord';
		Data[number]['Color'] = '#FF6633';
		var arraystart = new Array('Edit Users', 'Force Administrator', 'Force Leader', 'Force Messaging', 'Group Messaging', 'Intel User', 'Mass Mailing', 'Medal Administrator', 'Mentor Admin', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy Admin', 'Strategy Reports', 'Strategy User', 'View Applications','View Enemy Reports', 'View Online Users', 'View Reports', 'View User Countries', 'View User List', 'View User Notes', 'Voting Booth Administrator', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'FL - MSG ONLY', 'IA DEPT: Coordinator', 'IA DEPT: Main', 'IA DEPT: R&D Scientist', 'IA DEPT: R&D Scientist - MSG ONLY', 'IA DEPT: R&D Scientist Team Leader', 'IA DEPT: Recruiting Team', 'IA DEPT: Recruiting Team - MSG ONLY', 'IA DEPT: Recruiting Team Leader', 'IA DEPT: Strategy Team', 'IA DEPT: Strategy Team - MSG ONLY', 'IA DEPT: Strategy Team Leader', 'IA DEPT: Times Team', 'IA DEPT: Times Team - MSG ONLY', 'IA DEPT: Times Team Leader', 'PAGEMOD: Training Page');
		var arrayend = new Array('IA DEPT: Coordinator', 'IA DEPT: Coordinator, Force', 'IA DEPT: Main', 'IA DEPT: SOL Calender Mod');
		for(var i=0; i<FLPerms.length; ++i){
			if(FLPerms[i] === undefined){
				continue;
			}
			arraystart.push(FLPerms[i]);
		}
		Data[number]['Perms'] = arraystart.concat(arrayend);
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'War';
		Data[number]['Level'] = '4';
		Data[number]['Title'] = 'Executioners';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = 'DarkCyan';
		Data[number]['Perms'] = new Array('Intel User', 'Mentor User', 'Regular User', 'Retals', 'Strategy User', 'Target Selector', 'View Enemy Reports', 'View Reports', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'WAR DEPT: Main', 'WAR DEPT: Executioners', 'WAR DEPT: Executioners Message Only');
		number++;

		Data[number] = new Array();
		Data[number]['Department'] = 'War';
		Data[number]['Level'] = '4';
		Data[number]['Title'] = 'SIG';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = 'DarkViolet';
		Data[number]['Perms'] = new Array('Intel User', 'Mentor User', 'Regular User', 'Retals', 'Strategy User', 'Target Selector', 'View Enemy Reports', 'View Reports', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'WAR DEPT: Main', 'WAR DEPT: Spy Team Member', 'WAR DEPT: Spy Team Message Only');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'War';
		Data[number]['Level'] = '3';
		Data[number]['Title'] = 'Warmod';
		Data[number]['Abbr'] = 'WMD';
		Data[number]['Color'] = 'darkturquoise';
		Data[number]['Perms'] = new Array('Intel User', 'Mentor User', 'Regular User', 'Retals', 'Strategy User', 'Target Selector', 'View Enemy Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'WAR DEPT: Main', 'WAR DEPT: War Mod');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'War';
		Data[number]['Level'] = '2';
		Data[number]['Title'] = 'War Coord';
		Data[number]['Abbr'] = 'WMC';
		Data[number]['Color'] = 'deepskyblue';
		Data[number]['Perms'] = new Array('Force Messaging', 'Group Messaging', 'Intel User', 'Mass Mailing', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy Admin', 'Strategy Reports', 'Strategy User', 'Target Selector', 'View Enemy Reports', 'View Online Users', 'View Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'WAR DEPT: Main', 'WAR DEPT: Spy Team Member', 'WAR DEPT: Spy Team Message Only', 'WAR DEPT: War Mod', 'WAR DEPT: War Officer');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'War';
		Data[number]['Level'] = '2';
		Data[number]['Title'] = 'SIG Coord';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = 'deepskyblue';
		Data[number]['Perms'] = new Array('Force Messaging', 'Group Messaging', 'Intel User', 'Mass Mailing', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retals', 'Strategy Admin', 'Strategy Reports', 'Strategy User', 'Target Selector', 'View Enemy Reports', 'View Online Users', 'View Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'WAR DEPT: Main', 'WAR DEPT: Spy Team Member', 'WAR DEPT: Spy Team Message Only', 'WAR DEPT: War Mod', 'WAR DEPT: War Officer');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'FR';
		Data[number]['Level'] = '5';
		Data[number]['Title'] = 'Retal Mod';
		Data[number]['Abbr'] = '';
		Data[number]['Color'] = 'LawnGreen';
		Data[number]['Perms'] = new Array('Intel User', 'Mass Mailing', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retal Moderator', 'Retals', 'Strategy User', 'Target Selector', 'View Enemy Reports', 'View Online Users', 'View Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'FR DEPT: Retal Mod Training', 'FR DEPT: Main', 'FR DEPT: Training Module');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'FR';
		Data[number]['Level'] = '4';
		Data[number]['Title'] = 'Jnr FR';
		Data[number]['Abbr'] = 'jFR';
		Data[number]['Color'] = 'lime';
		Data[number]['Perms'] = new Array('Intel User', 'Mass Mailing', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retal Moderator', 'Retals', 'Strategy User', 'Target Selector', 'View Enemy Reports', 'View Online Users', 'View Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'FR DEPT: PR Main', 'FR DEPT: Retal Mod Training', 'FR DEPT: Allies Pacts', 'FR DEPT: Main', 'FR DEPT: Training Module');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'FR';
		Data[number]['Level'] = '3';
		Data[number]['Title'] = 'Foreign Relations Officer';
		Data[number]['Abbr'] = 'FRO';
		Data[number]['Color'] = 'limegreen';
		Data[number]['Perms'] = new Array('Clan Manager', 'Country Moderator', 'Intel User', 'Mass Mailing', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retal Moderator', 'Retals', 'Strategy User', 'Target Selector', 'View Enemy Reports', 'View Online Users', 'View Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'FR DEPT: PR Main', 'FR DEPT: Retal Mod Training', 'FR DEPT: Allies Pacts', 'FR DEPT: Ally Request BoardMod', 'FR DEPT: Boardmod', 'FR DEPT: Discussion', 'FR DEPT: Main', 'FR DEPT: Training Module');
		number++;
		
		Data[number] = new Array();
		Data[number]['Department'] = 'FR';
		Data[number]['Level'] = '2';
		Data[number]['Title'] = 'Senior Foreign Relations Officer';
		Data[number]['Abbr'] = 'SFRO';
		Data[number]['Color'] = '#009900';
		Data[number]['Perms'] = new Array('Clan Manager', 'Country Moderator', 'Intel User', 'Mass Mailing', 'Mentor User', 'Permission Messaging', 'Regular User', 'Retal Moderator', 'Retals', 'Strategy User', 'Target Selector', 'View Enemy Reports', 'View Online Users', 'View Reports', 'View User Countries', 'View User List', 'ACCESS: SOL Member', 'ACCESS: SOL Mercenary', 'ACCESS: Vacationers', 'FR DEPT: PR Main', 'FR DEPT: Retal Mod Training', 'FR DEPT: Allies Pacts', 'FR DEPT: Ally Request BoardMod', 'FR DEPT: Boardmod', 'FR DEPT: Discussion', 'FR DEPT: FR Coord Board', 'FR DEPT: Main', 'FR DEPT: Training Module');
		number++;
		
		var allTextAreas = document.getElementsByTagName("textarea");
		for(var i=0; i<allTextAreas.length; ++i){
			if(allTextAreas[i].name == 'Comments'){
				allTextAreas[i].cols = 50;
				allTextAreas[i].rows = 8;
			}
		}
		var allInputs = document.getElementsByTagName("input");
		for(var i=0; i<allInputs.length; ++i){
			if(allInputs[i].name == 'Permissions'){ continue; }
			allInputs[i].id = allInputs[i].name;
		}
		var allSelects = document.getElementsByTagName("select");
		for(var i=0; i<allSelects.length; ++i){
			allSelects[i].id = allSelects[i].name;
		}
		var allTextAreas = document.getElementsByTagName("textarea");
		for(var i=0; i<allTextAreas.length; ++i){
			if(allTextAreas[i].name == 'Comments'){
				allTextAreas[i].cols = 50;
				allTextAreas[i].rows = 8;
			}
		}
		
		var bgcolor = '#454545';
		var bgcolor1 = '#454545';
		var bgcolor2 = '#333333';
		var style = '<style type="text/css"><!--  .box { background-color: #504D6F; border: 1px solid #FFF; width: 250; padding: 5px; } --> </style>';
		var Perms = new Array();
		var PermNames = new Array();
		var done = 0;
		var number2 = 0;
		for(var i=0; i<allTD.length; ++i){
			if(allTD[i].innerHTML == '<b><font size="+1">Edit User</font></b>' && allTD[i].innerHTML.indexOf("QUICKSETS")==-1 && done==0){	// find td object with keyword in it
				allTD[i].innerHTML = style+'<table width=100%><tr><td>'+allTD[i].innerHTML + '</td><td align=right id="quicksets">QUICKSETS: (Replaces Perms)<button style="color: #FF0000" id="Vacationer"><strong>Vacation</strong></button>  |  <button style="color: #FF0000" id="Merc"><strong>Merc</strong></button>  |  <button style="color: #FF0000" id="Member"><strong>Member</strong></button>  |  <button style="color: #FF0000" id="Veteran"><strong>Veteran</strong></button></td></tr></table>';
				document.getElementById("Vacationer").addEventListener("click", function(){editUser_setAllPerms("Vacationer");}, false);
				document.getElementById("Merc").addEventListener("click", function(){editUser_setAllPerms("Merc");}, false);
				document.getElementById("Member").addEventListener("click", function(){editUser_setAllPerms("Member");}, false);
				document.getElementById("Veteran").addEventListener("click", function(){editUser_setAllPerms("Veteran");}, false);
				done = 1;
			}
	
			if(allTD[i].innerHTML == '<b><font size="+1">Edit User Permissions</font></b>'){	// find td object with keyword in it
				var perms = new Array();			
				var tableIndex = i;
	
				allTD[i].bgColor = 'black';
				allTD[i].parentNode.bgColor = 'black';
	
				var tableHeader = '<table align=center border="0" cellspacing="1" cellpadding="2"><tr><td valign="top"> <table align=center border="0" cellspacing="1" cellpadding="2"><tr><th bgcolor="'+bgcolor+'" colspan=3>Quick Groups Editing<br><font color=gray size=small>*Click a group to see associated perms.<br>*Gray Perms are duplicate perms and are being used by other groups as well.<br>*Green Perms will be transfered when the group is transfered.</font></th></tr><tr><th width=300px bgcolor="'+bgcolor+'">Dont Have</th> <th bgcolor="'+bgcolor+'">M</th><th width=300px bgcolor="'+bgcolor+'">Have</th></tr>';
				save = '<tr><td align="right"></td><td></td><td align=left></td></tr>';
				var tableMiddle = '</table></td><td valign="top"><table align=center border="0" cellspacing="1" cellpadding="2"><tr><th bgcolor="'+bgcolor+'" colspan=3>Quick Permission Editing<br><font color=gray size=small>*Cells in <font color=red>RED</font> are perms not associated with a Group.</font></th></tr><tr><th width=300px bgcolor="'+bgcolor+'">Dont Have</th><th bgcolor="'+bgcolor+'">M</th><th width=300px bgcolor="'+bgcolor+'">Have</th></tr>';
				save2 = '<tr><td align="right"></td><td></td><td align=left></td></tr>';
				var tableFooter = '</td></tr></table></td></tr></table></td></tr><tr bgcolor="#22222"><td colspan=3 bgcolor="#222222"><b>Edit User Permissions</b>';
	
				allTD[i].innerHTML = tableHeader + save + tableMiddle + save2 + tableFooter;
	
			}
	
			if (allTD[i].innerHTML.indexOf("checkbox")!=-1 && allTD[i].innerHTML.indexOf("Permissions")!=-1 && allTD[i].innerHTML.indexOf("Edit User Permissions")==-1){
				var temp = allTD[i].innerHTML.split("\"");
				var next = i+1;
				var permname = allTD[next].innerHTML;
	
	   			permname = permname.replace('&amp;', '&');
	
				Perms[permname] = new Array();
				Perms[permname]['TDIndex'] = temp;
				Perms[permname]['InGroup'] = 0;
	
				PermNames[number2] = permname;
				number2++;
	
				if (allTD[i].innerHTML.indexOf("checked")!=-1){
					Perms[permname]['UserHas'] = 1;
				}else{
					Perms[permname]['UserHas'] = 0;
				}
				Perms[permname]['UserCount'] = 0;
				var t = allTD[i].getElementsByTagName('input');
				t[0].id = 'checkbox_'+permname;
				t[0].addEventListener("click", function(){editUser_checkedBox(this);}, false);
			}
		}
	
		for (var i=0;i<Data.length;i++){
			for (var x=0;x<Data[i]['Perms'].length;x++){
				var temp = Data[i]['Perms'][x];
				if(Perms[temp] === undefined){
				}else{
					Perms[temp]['InGroup'] = 1;
				}
			}
		}
		editUser_ParseGroups();
	}
/*
*  END: EDIT PAGE
*/	

	function clocks() {

		var temp = new Date();
		temp = temp - locTimeFirst;

		ghqTime = ghqTimeFirst.getTime() + temp;

		var ghqTime = new Date(ghqTime);
		var month = ghqTime.getMonth()+1;
		var day = ghqTime.getDate();
		var year = ghqTime.getFullYear();
		var hour = ghqTime.getHours();
		var minute = ghqTime.getMinutes();
		var second = ghqTime.getSeconds();
		second = zeroPad(second);
		minute = zeroPad(minute);

		if(getSetting(HOUR24_KEY,false)){
			hour = zeroPad(hour);
			ghqTimeString = month+'/'+day+'/'+year+' '+hour+':'+minute+':'+second;
		}else{
			if (hour>=12){
				AorP="P.M.";
			}else{
			 	AorP="A.M.";
			}
			if (hour>=13){
				hour -=12;
			}
			if (hour==0){
				hour=12;
			}
			ghqTimeString = month+'/'+day+'/'+year+' '+hour+':'+minute+':'+second+' '+AorP;
		}
		headerLeftMenu.innerHTML = 'GHQ: '+ghqTimeString;
		if(getSetting(GAME_TIME_SHOW_KEY,true)){
			var gameTime = new Date();
			var month = gameTime.getUTCMonth()+1;
			var day = gameTime.getUTCDate();
			var year = gameTime.getUTCFullYear();
			var hour = gameTime.getUTCHours();
			var minute = gameTime.getUTCMinutes();
			var second = gameTime.getUTCSeconds();
			second = zeroPad(second);
			minute = zeroPad(minute);
			if(getSetting(HOUR24_KEY,false)){
				hour = zeroPad(hour);
				gameTime = month+'/'+day+'/'+year+' '+hour+':'+minute+':'+second;
			}else{
				if (hour>=12){
					AorP="P.M.";
				}else{
				 	AorP="A.M.";
				}
				if (hour>=13){
					hour -=12;
				}
				if (hour==0){
					hour=12;
				}
				gameTime = month+'/'+day+'/'+year+' '+hour+':'+minute+':'+second+' '+AorP;
			}
			headerLeftMenu.innerHTML = headerLeftMenu.innerHTML+'<br>Game: '+gameTime;
		}
		if(getSetting(LOCAL_TIME_SHOW_KEY,true)){
			var locTime = new Date();
			var month = locTime.getMonth()+1;
			var day = locTime.getDate();
			var year = locTime.getFullYear();
			var hour = locTime.getHours();
			var minute = locTime.getMinutes();
			var second = locTime.getSeconds();
			second = zeroPad(second);
			minute = zeroPad(minute);
			if(getSetting(HOUR24_KEY,false)){
				hour = zeroPad(hour);
				locTime = month+'/'+day+'/'+year+' '+hour+':'+minute+':'+second;
			}else{
				if (hour>=12){
					AorP="P.M.";
				}else{
				 	AorP="A.M.";
				}
				if (hour>=13){
					hour -=12;
				}
				if (hour==0){
					hour=12;
				}
				locTime = month+'/'+day+'/'+year+' '+hour+':'+minute+':'+second+' '+AorP;
			}
			var locTimeOffset = new Date().getTimezoneOffset() / 60 * -1;
			headerLeftMenu.innerHTML = headerLeftMenu.innerHTML+'<br>Local: '+locTime+'<br>Your Time Zone: GT '+locTimeOffset;
		}
		if(getSetting(ANIMATE_SERVER_TIME_KEY,true)){
			setTimeout(clocks,1000);
		}
	}

//==========================================
//MAIN LOAD
//==========================================
try{
	var Clan_Clan = getClan();
	//ADD TIME FORMAT AND RIGHT MENU LINKS
     var tables = document.evaluate("//table",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
   	var topTable = tables.snapshotItem(0);
	if(topTable !== null){
		var center = topTable.firstChild.firstChild.childNodes[1];
		if(center !== undefined){
			var Clan_Username = topTable.firstChild.firstChild.childNodes[1].childNodes[2].innerHTML;
			var Clan_Username = Clan_Username.substring(0, Clan_Username.indexOf(','));
			setSetting('Clan_Username', Clan_Username);
			topTable.firstChild.firstChild.childNodes[0].width = '15%';
			topTable.firstChild.firstChild.childNodes[2].width = '15%';
			bgcolor = topTable.firstChild.firstChild.bgColor;
			var html = '<table width="100%" cellspacing="1" cellpadding="0"><tr bgcolor="'+bgcolor+'"><td align="center">'+center.innerHTML+'</td></tr></table>';
			center.innerHTML = html; 
			center.appendChild(tables.snapshotItem(1));
			center.appendChild(tables.snapshotItem(2));
			center.bgColor = 'black';
			if(!getSetting(GHQEDITOR_HEADER,false)){
				//HEADER RIGHT MENU
				headerRightMenu = topTable.firstChild.firstChild.childNodes[2];
    				var span = document.createElement("span");
				span.id = 'SettingsLink';
				span.innerHTML = 'GHQEditor Settings';
				span.setAttribute('align','center');
				span.setAttribute('class','right_Menu');
				var lineBreak = document.createElement('br');
				headerRightMenu.appendChild(lineBreak);
				headerRightMenu.appendChild(span);
    				var span = document.createElement("span");
				span.id = 'SettingsHomepage';
				span.innerHTML = "GHQEditor Homepage";
				span.setAttribute('align','center');
				span.setAttribute('class','right_Menu');
				var lineBreak = document.createElement('br');
				headerRightMenu.appendChild(lineBreak);
				headerRightMenu.appendChild(span);
			}else{
  				var newdiv = document.createElement('div');
  				newdiv.innerHTML = '<center><span id="GHQSet">GHQEditor: <span id="SettingsLink">Settings</span> | <span id="SettingsHomepage">Homepage</span></span></center>';
				document.body.appendChild(newdiv);
				$('GHQSet').setAttribute('class','right_MenuHeader');
				$('SettingsLink').setAttribute('class','right_Menu');
				$('SettingsHomepage').setAttribute('class','right_Menu');
			}
			$('SettingsLink').addEventListener("click", function(){ showConfig(null); }, true);
			$('SettingsHomepage').addEventListener("click", function(){ window.open('http://userscripts.damnlazy.co.uk/'); }, true);
			//HEADER LEFT MENU
			headerLeftMenu = topTable.firstChild.firstChild.childNodes[0];
			var ghqTimeFirst = headerLeftMenu.firstChild.firstChild.innerHTML;
			curTime = headerLeftMenu.firstChild.firstChild.innerHTML;
			curTime = new Date.parse(curTime);
			headerLeftMenu.setAttribute('class','left_Menu');
			ghqTimeFirst = new Date.parse(ghqTimeFirst);
			ghqTimeFirst = new Date(ghqTimeFirst);
			var locTimeFirst = new Date();
			clocks();
			//CLEAN BOARD NEW POSTS
			cleanBoards();
			serverTimeSetup();
			installCheck();
		}
	}	
	switch (page){
		case "ShowBoard":
			if(getSetting(NEW_POSTS_KEY,true)){
				newPosts();
			}
			cleanBoard();
		case "ShowPost":
			if(getSetting(POST_AREA_KEY,true)){
				postAreaAugment();
			}
			if(getSetting(NEW_POSTS_KEY,true) && page === "ShowPost"){
				newPostMarkRead();
			}		
  		break;
		case "SiteManager":
			if(getSetting(SITE_MANAGER_KEY,true)){
				siteManager();
			}
  		break;
		case "TargetInfo":
			if(getSetting(TARGET_SELECTOR_KEY,true)){
				targetInfo();
			}
  		break;
		case "TargetSelector":
			if(getSetting(TARGET_SELECTOR_KEY,true)){
				targetSelector();
			}
  		break;
		case "UserManager":
			if(getSetting(EDIT_USER_KEY,true)){
				userManager();
			}
  		break;
		case "EditUser":
			var Clan_Clan = getClan();
			if(Clan_Clan == 'sol'){
				if(getSetting(EDIT_USER_KEY,true)){
					editUser();
				}
			}
  		break;
		default:
			if(getSetting(LEFT_MENU_KEY,true)){
				var page2 = path.substring(0, path.indexOf('.ASP'));		// extract page name from URL
				var page2 = page2.substring(page2.lastIndexOf('/')+1);		// extract page name from URL
				if(page2 == "LINKS"){
					links();
				}
			}
  		break;
	}

} catch (e) { console.log("Main Load: "+e); return; }
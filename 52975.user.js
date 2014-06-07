// ==UserScript==
// @name           Friendfeed 'Realtime'
// @namespace      http://mistapostle.appspot.com/
// @include        https://friendfeed.com/*
// @include        http://friendfeed.com/*
// @version        0.6
// @author         Mistapostle (Jammy Lee)
// @homepage       http://mistapostle.appspot.com/
// @copyright      2009,Mistapostle (http://mistapostle.appspot.com/)
// @license        (CC) Attribution Non-Commercial Share Alike; 
// ==/UserScript==

/**********Languague Settings**********/
/*
Example for zh-CN:
var localWords = {
    seconds:'秒钟',
    second:'秒钟',
    minutes:'分钟',    
    minute:'分钟',    
    hours:'小时',
    hour:'小时',
    ago:'前'
}
*/
/********************************/
var localWords = {
    second:' second', //don't ignore the space before 'second'
    seconds:' seconds', 
    minute:' minute',    
    minutes:' minutes',    
    hour:' hour',
    hours:' hours',
    ago:' ago'
} 

function GM_wait()
{
    if(typeof unsafeWindow != 'undefined')
    {
        if(typeof unsafeWindow.jQuery != 'undefined')
        {
            jQuery = unsafeWindow.jQuery;
	    //realtime = unsafeWindow.realtime;
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
	letsJQuery();
	}
    }

}
//var realtime;
//var lastSuccessPrev;
var cache = {};
var pattern = new RegExp('(\\d+)('+localWords.second+"|"+localWords.seconds+"|"+localWords.hour+"|"+localWords.hours+"|"+localWords.minute+"|"+localWords.minutes+")"+localWords.ago) ; 
function letsJQuery(){
    scanFeeds();
     var originalCallback =  unsafeWindow.showEntry  ; 
      unsafeWindow.showEntry  = function(){
	 var result = originalCallback.apply(unsafeWindow,arguments);
	 add_cache($('#e-'+arguments[0]));
	 return result;
     }
    window.setInterval( tick , 1000) ; 
}
function add_cache(entry){
	var eid = entry.attr('id');
	var cached = cache[eid];
	if(cached) // all cached 
	    return true ; 
	//GM_log('found new:'+eid );
	var lastDate ; 
	var dateField = entry.find('.date');
	var match = pattern.exec(dateField.text());
	if(match){
	    var num = parseInt(match[1]);
	    var unit = match[2];
	    if(unit == localWords.hours || unit == localWords.hour ){
		lastDate = num * 3600 ; 
	    }else if (unit == localWords.minutes || unit == localWords.minute ){
		lastDate = num * 60 ; 
	    }else if (unit == localWords.seconds || unit == localWords.second){
		lastDate = num  ; 
	    }
	}else{
	    lastDate = -1;
	}
	cache[eid] = [lastDate,dateField];
	return false ; 
}
function scanFeeds(){
    //GM_log('scanFeeds ' );
    var entires = $('#feed .entry').get()
    for (var i = 0 ; i < entires.length ; i++){
	var entry = $(entires[i]);
	var cached_before = add_cache(entry);
	if(cached_before)
	    break; 
	/*
	var eid = entry.attr('id');
	var cached = cache[eid];
	if(cached) // all cached 
	    break ; 
	//GM_log('found new:'+eid );
	var lastDate ; 
	var dateField = entry.find('.date');
	var match = pattern.exec(dateField.text());
	if(match){
	    var num = parseInt(match[1]);
	    var unit = match[2];
	    if(unit == localWords.hours || unit == localWords.hour ){
		lastDate = num * 3600 ; 
	    }else if (unit == localWords.minutes || unit == localWords.minute ){
		lastDate = num * 60 ; 
	    }else if (unit == localWords.seconds || unit == localWords.second){
		lastDate = num  ; 
	    }
	}else{
	    lastDate = -1;
	}
	cache[eid] = [lastDate,dateField];
	*/
    }
    //lastSuccessPrev = realtime.lastSuccess  ; 
}
function tick(){
    //if ( realtime && lastSuccessPrev != realtime.lastSuccess){
//	scanFeeds();
 //   }
    for(var eid in cache){
	var cached = cache[eid];
	var lastDate = cached[0] ; 
	var dateField = cached[1] ;
	if(lastDate >= 0 ){
	    var text ;
	    var unit = null; 
	    var num = null; 
	    if(lastDate >= 3600  ){
		if( lastDate % 3600 == 0){
		    num = Math.floor(lastDate / 3600) ; 
		    unit = num > 1 ? localWords.hours : localWords.hour; 
		}
	    }else if (lastDate >= 60 ){
		if( lastDate % 60 == 0){
		    num = Math.floor(lastDate / 60) ; 
		    unit = num > 1 ? localWords.minutes : localWords.minute; 
		}
	    }else  {
		num = lastDate ; 
		unit = num > 1 ? localWords.seconds : localWords.second; 
	    }
	    if(num){
		//GM_log('update ' + eid);
		dateField.text(num+unit+localWords.ago);
	    }
	    lastDate++;
	    cache[eid][0] = lastDate ; 
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
    scriptName="FriendFeed 'Realtime'" ;
    scriptId='52975';
    scriptVersion=0.6;
    scriptUpdateText="Handle pages that update very fast e.g. search page in realtime mode";
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

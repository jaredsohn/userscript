// ==UserScript==
// @name           hbxMonkey
// @namespace      hbx
// @description    Exposes some of the HBX tag values. BEST USED with the FireBug console enabled for full features.
// @author         Kevin Murphy (hexC0DE)
// @created        12/8/2010
// @modified       03/08/2011
// @version        0.8
// @include        *
// ----------------------------------------------------
// @history        0.1 Initial version to get pn, mlc, and a couple custom tags. new design works with overlays.
//                     also, intercepting and reporting out click events. not working with dwr/ajax yet.
// @history        0.2 Hijacked more methods: _hbPageView, hbSend, _hbSet
//                     sending these new ones to log, thus creating a dependancy on firebug, but cannot reliably
//                     capture this information to the floating report section, since page might change too fast
//                     to notice what the values were.
// @history        0.3 Added 'print all tags to log' feature and added grouping to logging for main, custom, and
//                     product tags. logging to console will fail if no console exists, and so some logs have been
//                     removed so that script won't immediately stop.  in this way, even if you don't have a console
//                     you will still see mlc/pn and any custom rags in floating div.
// @history        0.4 Bug fix for custom tags. Cleaned up logging of hbx events after determining order of events
//                     so that log is easier to read when multiple events occur on same page. Also now logging hbx
//                     server and full query string parameters (with query string parameters section in log initially
//                     collapsed to take up less space in the log. it can be expanded if user wants to read them).
// @history        0.5 Updated logging technique for events that happen post load (click events, etc.) to make them
//                     easier to identify in the log. (NOTE: n=mlc, vcon=pn, lid=link id, lpos=?). Code clean-up.
// @history        0.6 Fixed issue where script would halt if firebug console was not enabled.  Added note to report
//                     div to alert user that the firebug console is not available in case they didn't realize it.
//                     Not sure if this check works in all situations (like if another console is being used besides
//                     Firebug, or depending on when/how it is enabled/disabled).
// @history        0.7 Enhanced it so that report window could be moved anywhere the user wants and it will remember
//                     the last coordinates. Also made it so that report window could be toggled on and off.
// @history        0.8 Check for undefined variables that were causing errors on some websites.
// ==/UserScript==

//==============GLOBAL VARS==============
var opacity = '0.4'; //could be a user controlled option some day
var visibility;  //report window default is visible
var OPTION_HBX_RPT = "gm_hbxMonkey_report"; //constant for the toggle value to store in about:config
var TOGGLE_RPT; //value to use to determine visibility of report window
var OPTION_HBX_RPT_TOP = "gm_hbxMonkey_reportTop"; //constant for the toggle value to store in about:config
var OPTION_HBX_RPT_LEFT = "gm_hbxMonkey_reportLeft"; //constant for the toggle value to store in about:config
var topDefault='10px'; //default starting position
var leftDefault='10px'; //default starting position

//logger toggle
var enabled = true;  //can be user controlled
var isConsole = false;  //default assumes no firebug
var GM_console, GM_log;  //for logging if console is available

//check for firebug console
if (unsafeWindow.console && unsafeWindow.console.firebug && enabled) {
    //a firebug console exists, but is console working?
    GM_console = unsafeWindow.console;

    //check if log object is defined
    if(unsafeWindow.console.log){
        GM_log = unsafeWindow.console.log;
        isConsole = true;
    }
}

//report node
var newdiv;

//set events to log
var events = new Array();

//===============USER SCRIPT COMMANDS======================
function initReportWindowSettings(){

    var cookieVal = readCookie("disableReport");

    //constants with the user defined or default value for toggles
    TOGGLE_RPT = ((GM_getValue(OPTION_HBX_RPT) == undefined ) ? 1 : GM_getValue(OPTION_HBX_RPT)); //Toggle Report visibility [ 1=visible[default],0=hidden ]

    //if cookie exists, then it was set by disable button, update toggle setting and delete cookie
    if(cookieVal){
        TOGGLE_RPT=0;
        eraseCookie("disableReport");
    }

    //user script commands -- menu commands to control application behavior
    if (TOGGLE_RPT){
        GM_registerMenuCommand('hbxMonkey: Toggle Report Window', toggleReport); //meh, same name for now.
        visibility = 'visibility:visible;';
    } else {
        GM_registerMenuCommand('hbxMonkey: Toggle Report Window', toggleReport);
        visibility = 'visibility:hidden;';
    }

    //get top/left coords from long-term memory location about:config and assign values
    top  = ((GM_getValue(OPTION_HBX_RPT_TOP)  == undefined ) ? topDefault  : GM_getValue(OPTION_HBX_RPT_TOP));
    left = ((GM_getValue(OPTION_HBX_RPT_LEFT) == undefined ) ? leftDefault : GM_getValue(OPTION_HBX_RPT_LEFT));

    //checking for report window coordinates from short-term cookie.
    //if found, 1) assign values, 2)delete cookie, and 3) store in long-term memory location for next time
    if(readCookie("hbxOutputTop")){
        top=readCookie("hbxOutputTop");
        eraseCookie("hbxOutputTop");
        GM_setValue(OPTION_HBX_RPT_TOP,top);
        left=readCookie("hbxOutputLeft");
        eraseCookie("hbxOutputLeft");
        GM_setValue(OPTION_HBX_RPT_LEFT,left);
    }
}

//hides / shows control panel section
function toggleReport(){
    if(TOGGLE_RPT) {
	    TOGGLE_RPT=0;
	    //persist config
	    GM_setValue(OPTION_HBX_RPT, TOGGLE_RPT);
	    //hide
        document.getElementById("hbxOutput").style.visibility="hidden";
    }else{
        TOGGLE_RPT=1;
        //persist config
        GM_setValue(OPTION_HBX_RPT, TOGGLE_RPT);
        //show
        document.getElementById("hbxOutput").style.visibility="visible";
    }
}
unsafeWindow.toggleReport=toggleReport;


//==============PLACE-HOLDERS==============
//hbx
var original_hbLink;
var original_hbPageView;
var original_hbSend;
var original_hbSet;

//==============MY REPLACEMNET FUNCTIONS==============
//new method to replace hijacked method
function myLinkFunction(x, y, z){
    //call normal code
    original_hbLink(x, y, z);

    //report results
    addClickToReport(x,y,z);

    //this method ultimately calls _hbSet(). those values will be captured and logged later when _hbSend() fires.
}
//expose greasemonkey function to window
unsafeWindow.myLinkFunction = myLinkFunction;

//new method to replace hijacked method
function myPageViewFunction(x, y){
    //call normal code
    original_hbPageView(x, y);

    //this method ultimately calls _hbSet(). those values will be captured and logged later when _hbSend() fires.
    //[NOTE: at this time, this hijacked method is really not needed, as all it does i call the original method]
}
//expose greasemonkey function to window
unsafeWindow.myPageViewFunction = myPageViewFunction;

//new method to replace hijacked method
function mySendFunction(){
    if(isConsole)GM_console.info("HBX event fired");

    //log values from _hbSet found in global var
    if(isConsole)logEvents();

    //call normal code
    original_hbSend();
}
//expose greasemonkey function to window
unsafeWindow.mySendFunction = mySendFunction;

//new method to replace hijacked method
function myHbxSetFunction(x,y){
    //capture set values to a global variable to log later when the _hbSend function fires.
    events.push(new Array(x,y));

    //call normal code
    original_hbSet(x,y);
}
//expose greasemonkey function to window
unsafeWindow.myHbxSetFunction = myHbxSetFunction;

//==============MOVABLE REPORT WINDOW FUNCTIONS==============
function moveStart(event){
    layerElement=document.getElementById("hbxOutput");
    layerBar=event.target;

    while (layerBar.id!="hbxReportTitle"){
        layerBar=layerBar.parentNode;
    }

    if (layerBar.id=="hbxReportTitle"){
        offsetx=event.clientX;
        offsety=event.clientY;
        nowX=parseInt(layerElement.style.left);
        nowY=parseInt(layerElement.style.top);
        moveEnabled=true;
    }

    if (unsafeWindow.addEventListener){
        unsafeWindow.addEventListener("mousemove", move, false);
    }
}

function move(event){
    if (!moveEnabled) return;
    newLeft = (nowX+event.clientX-offsetx) + 'px' ;
    newTop = (nowY+event.clientY-offsety) + 'px';
    layerElement.style.left=newLeft;
    layerElement.style.top=newTop;
    return false;
}

function moveStop(){
    if (moveEnabled){
        //since unsafeWindow cannot call GM_setValue(); therefore, a cookie will be used till next page load.
        createCookie("hbxOutputTop",layerElement.style.top);
        createCookie("hbxOutputLeft",layerElement.style.left);

        //alert(layerElement.style.top + ":" + layerElement.style.left);

        //alert('write cookie to record current position');
        moveEnabled=false;
    }
}

function disableReport(){
    //unsafeWindow cannot call GM_setValue(); therefore, a cookie will be used till next page load.
    createCookie("disableReport",1);
    toggleReport();
}
unsafeWindow.disableReport=disableReport;

//===================COOKIE HANDLERS====================
//these cookie functions provided by http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
unsafeWindow.createCookie=createCookie;

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

//===============WORK TO DO===================
function main(e){
    //check if hbx actually exists; otherwise, do nothing (assumption is that if _hbSend function exists, hbx code exists)
    if(unsafeWindow._hbSend){
        initReportWindowSettings();

        //initiate hijacking
        hijackHbxLinkFunction();
        hijackHbxPageViewFunction();
        hijackHbxSendFunction();
        hijackHbxSetFunction();

        //report tags to div (create whether toggled or not - will control display based on style)
        createReportNode();
        addHbxMainToReport();

        //make report window movable
        if (unsafeWindow.addEventListener){
            unsafeWindow.addEventListener("mousedown", moveStart, false);
            unsafeWindow.addEventListener("mouseup", moveStop, false);
        }

        //log tags (log last. in case console doesn't exist other stuff will report out.)
        if(isConsole)logAllTags();
    }
}

//==========INITIATE WORK============
//NOTE: must define the function before we reference here for the event [i think])
//NOTE: it is faster to just determine when the document's DOM tree has fully initialized, rather than waiting for the page to load
//EXAMPLE OF OLD WAY) window.addEventListener("load", testme, false);
if (document.addEventListener){
  document.addEventListener("DOMContentLoaded", main, false);
}
//NOTE: a list of DOM Events can be found here: http://en.wikipedia.org/wiki/DOM_Events

//===========hijacking=================
function hijackHbxLinkFunction(){
    //hijack _hbLink
    original_hbLink = unsafeWindow._hbLink;
    //reassign hbLink to my function
    unsafeWindow._hbLink = myLinkFunction;
}

function hijackHbxPageViewFunction(){
    //hijack _hbPageView
    original_hbPageView = unsafeWindow._hbPageView;
    //reassign hbPageView to my function
    unsafeWindow._hbPageView = myPageViewFunction;
}

function hijackHbxSendFunction(){
    //hijack _hbSend
    original_hbSend = unsafeWindow._hbSend;
    //reassign _hbSend to my function
    unsafeWindow._hbSend = mySendFunction;
}

function hijackHbxSetFunction(){
   //hijack _hbSet
    original_hbSet = unsafeWindow._hbSet;
    //reassign _hbSt to my function
    unsafeWindow._hbSet = myHbxSetFunction;
}

//===========OUTPUT==========

//----Reporting-----
function createReportNode(){
    //create place to put the output
    var node = document.getElementsByTagName("body")[0];
    newdiv = document.createElement('div');
    newdiv.setAttribute('id','hbxOutput');
    node.appendChild(newdiv);
    //add styles to report section
    addStyles(newdiv);
}

function addStyles(div){
    //need to set at least the top and left style values in this manner in order for those attributes to be seen by the move scripts
    div.setAttribute('style','top:'+top+';left:'+left+';position:absolute;z-index:1001;border:1px dotted #000000;background-color:#EEE;opacity:'+opacity+';'+visibility);
    //need to set opacity in this way, as the hover style stopped working due to setting style as we did above for this div
    div.setAttribute('onmouseover', 'this.style.opacity=1;');
    div.setAttribute('onmouseout', 'this.style.opacity='+opacity);

    //styles
    var output='<style>';
    /*output+='#hbxOutput {';
       output+='z-index: 1001;';
       output+='position:absolute';
       output+='top: 10px;';
       output+='left: 10px;';
       output+='border: 1px dotted #000000;';
       output+='background-color: #EEE;';
       output+=opacity;
    output+='}';
    output+='#hbxOutput:hover{opacity: 1}'; */
    output+='#hbxOutput p{margin:0px;padding:4px;}';
    output+='#hbxReportTitle{color:#FFF;background-color:#2F2F2F;text-align:center;font-family:"arial",sans-serif;font-size:x-small;cursor:move}';
    output+='#hbxMain{border-top:1px dotted #000000;}';
    output+='#hbxCustom{border-top:1px dotted #000000;}';
    output+='#hbxClick{border-top:1px dotted #000000;}';
    output+='#hbxButtons{padding:4px;text-align:center;border-top:1px dotted #000000;font-family:"arial",sans-serif;font-size:xx-small;}';
    output+='.hbxLogButton{cursor:pointer;background-color:#23368F;color:#FFF;border-top:solid 1px #FFF;border-left:solid 1px #FFF;border-right:solid 1px #CCC;border-bottom:solid 1px #CCC;-moz-border-radius:4px;text-align:center;padding:1px;}';
    output+='.report{text-align:left;font-family:"arial",sans-serif;font-size:xx-small;}';
    output+='.label{}';
    output+='.value{color:#3739DF;}';
    output+='.warning{color:#A40000;padding:4px;text-align:center;border-top:1px dotted #000000;font-family:"arial",sans-serif;font-size:xx-small;}';
    output+='</style>';

    div.innerHTML=output;
}

function addHbxMainToReport(){
    //create place to put the output
    var node = document.getElementById("hbxOutput");

    //title section and value
    var titlediv = document.createElement('div');
    titlediv.setAttribute('id','hbxReportTitle');
    titlediv.innerHTML='<table width="100%" cellpadding="0"><tr><td width="10">&nbsp;</td><td width="*" style="color:white;">HBX data</td><td width="10"><a href="javascript:disableReport();" style="color:#EEE;font-family:Serif;font-weight:bold;border:solid #BBB 1px;padding-left:2px;padding-right:2px;">X</a></td></tr></table>';
    node.appendChild(titlediv);

    //main section
    var maindiv = document.createElement('div');
    maindiv.setAttribute('id','hbxMain');
    node.appendChild(maindiv);

    //main values
    var output = '<p class="report">';
    output += reportTag("pn",unsafeWindow.hbx.pn,true);
    output += reportTag("mlc",unsafeWindow.hbx.mlc,true);
    output += '</p>';

    //write output to new div
    maindiv.innerHTML=output;

    //custom section
    var customdiv = document.createElement('div');
    customdiv.setAttribute('id','hbxCustom');
    node.appendChild(customdiv);

    //report custom values
    var output = '<p class="report">';
    output += reportCustom();
    output += '</p>';

    //only build button to write to console if console exists
    if(isConsole){
        //button section
        var buttondiv = document.createElement('div');
        buttondiv.setAttribute('id','hbxButtons');
        buttondiv.innerHTML='<span class="hbxLogButton" onclick="logAllTags();">&nbsp;print all tags to console&nbsp;</span>';
        node.appendChild(buttondiv);
    }else{
        var warningdiv = document.createElement('div');
        warningdiv.setAttribute('class','warning');
        warningdiv.innerHTML='NOTE: Firebug Console Unavailable';
        node.appendChild(warningdiv);
    }

    //write output to new div
    customdiv.innerHTML=output;
}

function addClickToReport(x,y,z){
    //create place to put the output
    var node = document.getElementById("hbxOutput");
    var clickdiv = document.getElementById("hbxClick");

    //see if hbxClick div already exists.
    if (clickdiv == null){
        //create new div
        clickdiv = document.createElement('div');
        clickdiv.setAttribute('id','hbxClick');
        node.appendChild(clickdiv);
    }

    var output = '<p class="report">';
    output += reportTag("click param 1",x,false);
    output += reportTag("click param 2",y,false);
    output += reportTag("click param 3",z,false);
    output += '</p>';

    //write output to new div
    clickdiv.innerHTML=output;
}

function reportCustom(){
    var note = "";

    //run the logTag always (using | for or), but if anything was logged, it will give back true; otherwise false.
    if (unsafeWindow.cv != undefined){
        for (var i = 1; i < 35; i++){
            eval('note += reportTag("cv.c'+i+'",unsafeWindow.cv.c'+i+',false);');
        }
    }

    //check if anything logged
    if(note.length > 0){
        return note;
    } else {
        return "no custom tags";
    }
}

function reportTag(x,y,reportUndefined){
    var output = "";

    if(reportUndefined && (y == null || y =='')){
        //caller wants to report undefined values
        y = "[undefined]";
    }else if (!reportUndefined && (y == null || y =='')){
        //caller does not want to report undefined values
        return "";
    }

    //output any values
    return '<span class="label">'+x+': </span><span class="value">'+y+'</span><br>';
}

//----Logging-----
function logAllTags(){
    //log
    GM_console.group("HBX Tags");
    logMain();
    logCustom();
    logProduct();
    logQueryString();
    GM_console.groupEnd();

}
unsafeWindow.logAllTags = logAllTags; //expose to window so that button in report div will work

function logQueryString(){
    var url = unsafeWindow._ar;
    var server = url.split("?")[0];
    var query = url.split("?")[1];
    var vars = query.split("&");

    GM_console.groupCollapsed("HBX Server");
    GM_log("server: "+server);
    GM_console.groupEnd();

    GM_console.groupCollapsed("Query String parameters");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        GM_log(pair[0]+": "+unescape(pair[1]));
    }
    GM_console.groupEnd();
}

function logMain(){
    GM_console.group("Main tags");
    logTag("pn",unsafeWindow.hbx.pn,true);
    logTag("mlc",unsafeWindow.hbx.mlc,true);
    GM_console.groupEnd();
}

function logCustom(){
    //will be true if anything logs
    anythingLogged = false;
    GM_console.group("Custom tags");

    //run the logTag always (using | for or), but if anything was logged, it will give back true; otherwise false.
    if (unsafeWindow.cv != undefined){
        for (var i = 1; i < 35; i++){
            eval('anythingLogged = anythingLogged | logTag("cv.c'+i+'",unsafeWindow.cv.c'+i+',false);');
        }
    }

    //check if anything logged
    if(!anythingLogged){
        GM_log("no custom tags")
    }

    GM_console.groupEnd();
}

function logProduct(){
    //will be true if anything logs
    anythingLogged = false;
    GM_console.groupCollapsed("Product tags");
    //run the logTag always (using | for or), but if anything was logged, it will give back true; otherwise false.
    anythingLogged = anythingLogged | logTag("pr",unsafeWindow.hbx.pr,false);
    anythingLogged = anythingLogged | logTag("bd",unsafeWindow.hbx.bd,false);
    anythingLogged = anythingLogged | logTag("ca",unsafeWindow.hbx.ca,false);
    anythingLogged = anythingLogged | logTag("pc",unsafeWindow.hbx.pc,false);
    anythingLogged = anythingLogged | logTag("qn",unsafeWindow.hbx.qn,false);
    anythingLogged = anythingLogged | logTag("oi",unsafeWindow.hbx.oi,false);
    anythingLogged = anythingLogged | logTag("sy",unsafeWindow.hbx.sy,false);
    anythingLogged = anythingLogged | logTag("sa",unsafeWindow.hbx.sa,false);
    anythingLogged = anythingLogged | logTag("sz",unsafeWindow.hbx.sz,false);
    anythingLogged = anythingLogged | logTag("so",unsafeWindow.hbx.so,false);
    anythingLogged = anythingLogged | logTag("ds",unsafeWindow.hbx.ds,false);

    //check if anything logged
    if(!anythingLogged){
        GM_log("no product tags")
    }

    GM_console.groupEnd();
}

function logTag(x,y,logUndefined){
    if(logUndefined && (y == null || y =='')){
        //caller wants to log undefined values
        y = "[undefined]";
    }else if (!logUndefined && (y == null || y =='')){
        //caller does not want to log undefined values
        return false;
    }

    //log any values
    GM_log(x+": "+y)

    return true;
}

function logEvents(){
    //loop through events (sometimes more than 1 _hbSet is called for a single event)
    for (var i = 0; i < events.length; i++) {
        GM_log(events[i]);
    }

    //reset the array of set values for next send event
    events = new Array();
}

/* NOT USED AT THIS TIME
function updateNodeContent(id, value){
    var node = document.getElementById(id);
    node.innerHTML=value;
}*/

//---------------NOTES / ENHANCEMENTS TO WORK ON---------------------------------
/*
TODO: version number somewhere
TODO: quick ref for some vars (i.e. - vcon == pn, n == mlc)
TODO: add user option for opacity
---

NOTE: about:config entry for firebug console enabled/disabled is extensions.firebug.console.enableSites
NOTE: _hbSet seems to be always called prior to _hbSend.  _hbSend seems to always be called last.
NOTE: _hbSend() is not called on normal page load. seems to be used for events after page load.
---

===VAR REFERENCE. (Should be able to access any of these via the unsafeWindow object.) ===
_bn     : browser (navigator.appName returns a value like "Netscape" or "MSIE")

hbx.pn  : page name (default: "PUT+PAGE+NAME+HERE")
hbx.mlc : multi-level category (default: "CONTENT+CATEGORY")
cv.c#   : custom tag (where # is a number. range seems to be 1-34)

//COMMERCE VARS
hbx.pr	: comma-delimited Products
hbx.bd	: comma-delimited Brands
hbx.ca	: comma-delimited Categorys
hbx.pc	: comma-delimited Prices
hbx.qn	: comma-delimited Quantities
hbx.oi	: orderId
hbx.sy	: shipping city
hbx.sa	: shipping state
hbx.sz	: shipping zip code
hbx.so	: shipping country
hbx.ds	: discount
hbx.pt  : payment type
hbx.sk  : comma-delimited sku
hbx.cu  : customer type
hbx.ds  : discount
hbx.st  : shipping type
hbx.sp  : shipping cost (total)
hbx.sr  : store (i.e. 1)
hbx.po  : promotion
hbx.c1  : custom one, recurring or one-time
hbx.c2  : custom two, package id
hbx.ci  : customer email;

//SEGMENTS AND FUNNELS
hbx.seg : visitor segmentation
hbx.fnl : funnels

//CUSTOM VARIABLES
hbx.hc1 : custom tag (zipcode)
hbx.hc2 : custom tag
hbx.hc3 : custom tag (region) i.e. "Northern+California/Nevada|West"
hbx.hc4 : custom tag (ecpdProfileId)

//CAMPAIGNS
hbx.cmp   : campaign id
hbx.cmpn  : campaign id in query
hbx.dcmp  : dynamic campaign id
hbx.dcmpn : dynamic campaign id in query
hbx.hra   : response attribute
hbx.hqsr  : response attribute in referral query
hbx.hqsp  : response attribute in query
hbx.hlt   : lead tracking
hbx.hla   : lead attribute
hbx.gp    : campaign goal
hbx.gpn   : campaign goal in query
hbx.hcn   : conversion attribute
hbx.hcv   : conversion value
hbx.cp    : legacy campaign

//OTHER
hbx.pndef : default page name ("title")
hbx.ctdef : default content category ("full")
hbx.vpc   : version (i.e. "HBX0140.01c")
hbx.acct  : account number(s)
hbx.cacct : commerce account number
hbx.lc    : lower case setting ("y" forces all to lower-case)
hbx.hrf   : custom referrer
hbx.cam   : cart add methodology (0 = highwatermark, 1 = incremental)
hbx.pv    : product view flag (0 = cart add, 1 = product view)

//OPTIONAL PAGE VARIABLES - ACTION SETTINGS
hbx.fv  : form validation minimum elements or submit function name
hbx.lt  : link tracking (i.e. "auto")
hbx.dlf : download filter - exclude tracking of download filename *.do
hbx.dft : download file naming ("n")
hbx.elf : exit link filter ("n")
*/

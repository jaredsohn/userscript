// ==UserScript==
// @name       Repair Yahoo! Groups Neo Bugs
// @version    0.1
// @description  Fixes bugs with Yahoo! Groups
// @match      http://*.groups.yahoo.com/*
// @match      https://*.groups.yahoo.com/*
// @grant      GM_addStyle
// @copyright  2013, Mike Battaglia
// ==/UserScript==

//If you appreciate this script, feel free to send a bitcoin tip to 1ESc49bXnfv96ETWVLoF9dKmhLSg5EFxU1 :)

////////fix broken link color////////
GM_addStyle(".yg-msglist-title a:visited { color:#8384c8!important}");

////////auto-unhide stuff////////
GM_addStyle(".qreply {display:block!important; visibility:visible!important}");

////////highlight important stuff stuff////////
GM_addStyle("#messagenav a:after {content: \" (Messages)\";color:#C00000!important}");
GM_addStyle(".messages-link a:before {content: \"Individual \"}");
GM_addStyle(".messages-link a {color:#C00000!important}");
GM_addStyle(".topics-link:hover:after{background: #333;background: rgba(0,0,0,.8);border-radius: 5px;bottom: 26px;color: #fff;content: \"NOTE: This is a list of thread titles only, not individual messages!\";left: 20%;padding: 5px 15px;position: absolute;z-index: 98;width: 220px;}");


////////make message search easier to find///////
_gm_search = document.getElementById("mnp-search_box");
_gm_button = document.getElementById("yucs-sprop_button");
setInterval(function() {
    if(!_gm_search || !_gm_button)
        return;
    
    if(_gm_search.placeholder == "Search Conversations") {
        _gm_button.replaceChild(document.createTextNode("Search Messages"),_gm_button.firstChild);
    }
    
    if(_gm_search.placeholder == "Search Groups") {
        _gm_button.replaceChild(document.createTextNode("Search Groups"),_gm_button.firstChild);
    }
},500);

////////fixed width stuff////////
//set up toolbar
GM_addStyle(".gm-auxtoolbar {position:relative;z-index:100000;display:block;margin-top:-5px;padding:0px 12px 8px 12px;text-align:right;background-color:#f5f5f9;border:1px solid #e2e2e6;border-top:none}");
GM_addStyle(".gm-auxtoolbar span {font-size:8pt!important;padding:0px 5px !important;margin-bottom:0px}");

//set up fixed stylesheet
_gm_fixedstyle = document.createElement("style");
_gm_fixedstyle.id = "fixedstyle";
_gm_fixedstyle.type = "text/css";
_gm_fixedCSS = document.createTextNode(".msg-content, .msg-content * {font-family:monospace!important}");
_gm_fixedstyle.appendChild(_gm_fixedCSS);
document.getElementsByTagName('head')[0].appendChild(_gm_fixedstyle);
_gm_fixedstyle.disabled = true;

//function to add auxtoolbar
function _gm_add_auxtoolbar(){
    //set up toolbar initially
    var _gm_titlebar=document.querySelector(".msg-title-bar");

    //check to make sure toolbar hasn't been inserted
    if(!_gm_titlebar)
    	return;

    var _gm_msgheader = _gm_titlebar.parentElement.parentElement.parentElement.parentElement; //this is #yom-actions
    if(_gm_msgheader.lastChild.className) {
    	if(_gm_msgheader.lastChild.className.indexOf("gm-auxtoolbar") != -1)
        	return;
    }

    //so far so good, now let's make the toolbar    
    var _gm_auxtoolbar = document.createElement("div");
    _gm_auxtoolbar.className = "gm-auxtoolbar";

    
    //fixed-width button goes here
    var _gm_toggle = document.createElement("span");
    _gm_toggle.addEventListener("click",function(event){_gm_fixedstyle.disabled=!_gm_fixedstyle.disabled;});
    _gm_toggle.className = "yg-button bg-red rnd-crn-2";

    var _gm_toggleText = document.createTextNode("Toggle Fixed Width");
    _gm_toggle.appendChild(_gm_toggleText);

    
    //append the _gm_auxtoolbar to the normal one
    _gm_msgheader.appendChild(_gm_auxtoolbar);
    _gm_msgheader.style.height = "80px";


    //append our buttons to the toolbar
    _gm_auxtoolbar.appendChild(_gm_toggle);
}

//make sure that damn thing is there
setInterval(_gm_add_auxtoolbar,1000);

if(location.search.substring(1).toLowerCase().split('&').indexOf("var=0") != -1)
    _gm_fixedstyle.disabled=false;

if(location.search.substring(1).toLowerCase().split('&').indexOf("var=1") != -1)
    _gm_fixedstyle.disabled=true;
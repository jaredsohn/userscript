// ==UserScript==
// @name           INOSHENT FLEE
// ==/UserScript==



var wibiya_pl = "false";
var wibiya_nc = "true";
var wibiya_latestJq = false;
var wibiya_flashFix = false;
var wibiya_jQuery_ver = 132;
var wibiyaTimeoutId;

function jquery_ver(){
    return parseInt(jQuery.fn.jquery.replace(/\./gi,'').substring(0,3));
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    }
}

function loadjscssfile(filename, filetype, where){
    var fileref;
    if (filetype=="js"){ //if filename is a external JavaScript file
        fileref=document.createElement("script");
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!="undefined"){
        if (where=="head"){
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
        else{
            document.getElementsByTagName("body")[0].appendChild(fileref);
        }
    }
}

function CheckJQueryLoader(toolbarId)
{
    if (typeof jQuery == "function")
    {
        if (!wibiya_latestJq)
        {
            clearTimeout(wibiyaTimeoutId);
            SetToolbarLoad();
        }
        else
        {
            if (jquery_ver() >= wibiya_jQuery_ver)
            {
                clearTimeout(wibiyaTimeoutId);
                SetToolbarLoad();
            }
            else
            {
                wibiyaTimeoutId =  setTimeout("CheckJQueryLoader("+toolbarId+");",200);
            }
        }
    }
    else
    {
        wibiyaTimeoutId =  setTimeout("CheckJQueryLoader("+toolbarId+");",200);
    }
}

function getQueryParam(name){
    var qString = window.location.search.substring(1).split("&");
    var params = new Array();

    var p;
    for(var i=0; i<qString.length; i++){
        p = qString[i].split("=");
        params[p[0]] = p[1];
    }

    return params[name];
}

function wbpad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function altToolbarUrl(altToolbar){
    var cdn = getQueryParam("cdn");
    cdn = (typeof cdn=="undefined")?"cdn.wibiya.com":cdn;
    if(!cdn.match(/^(st)?cdn\.wibiya\.(com|local)$/)){
        cdn = "cdn.wibiya.com";
    }

    var toolbarId = altToolbar.match(/\d+/);
    var dir = wbpad(Math.floor(toolbarId / 1000), 4);
    var toolbarUrl = 'http://' + cdn + '/Toolbars/dir_' + dir + '/Toolbar_' + toolbarId + '/' + altToolbar;
    return toolbarUrl;
}

function SetToolbarLoad(){
    var wibiya_mobiles = ["iphone","ipod","ipad","series60","symbian","android","windows ce",
        "blackberry","palm","avantgo","docomo","vodafone","j-phone",
        "xv6850","htc","lg;","lge","mot","nintendo","nokia","samsung","sonyericsson"];
    wibiyaToolbar.wibiya_isMobile = false;
    wibiyaToolbar.wibiya_uAgent = navigator.userAgent.toLowerCase();
    for(var i=0;i<wibiya_mobiles.length;i++){
        if(wibiyaToolbar.wibiya_uAgent.match(wibiya_mobiles[i]) != null){
            wibiyaToolbar.wibiya_isMobile = true;
            var img=new Image(1,1);
            img.src = "http://wstat.wibiya.com/m.jpg?t="+wibiyaToolbar.id;
            break;
        }
    }

    if ((jQuery.browser.msie && parseInt(jQuery.browser.version)==6) || wibiyaToolbar.wibiya_isMobile == true){
        
    }
    else{
        if(wibiya_flashFix === true){
            wibiyaToolbar.rewriteFlash = 0;
            wibiyaToolbar.framework.FlashFix();
            wibiyaToolbar.rewriteFlashInterval = setInterval("wibiyaToolbar.framework.FlashFix();", 3333);
        }

        wibiyadomain = "http://cdn.wibiya.com/Toolbars/dir_0671/Toolbar_671526/";
        // no-conflict
        if (wibiya_nc=="true") jQuery.noConflict();

        var altToolbar = getQueryParam("toolbarObjId");
        // detect jd_gallery, ie, user_request - load page after document.ready
        if (typeof (startGallery) == "function" || jQuery.browser.msie || wibiya_pl=="true") {
            var wibiyaScriptSrc;
            jQuery(document).ready(function(){
                if (typeof altToolbar == "undefined"){
                    wibiyaScriptSrc = wibiyadomain+"toolbar_671526_4d1688835ca89.js";
                }
                else{
                    wibiyaScriptSrc = altToolbarUrl(altToolbar);
                }
                loadjscssfile(wibiyaScriptSrc,"js","body");
            });
        }
        else{
            if (typeof altToolbar == "undefined"){
                wibiyaScriptSrc = wibiyadomain+"toolbar_671526_4d1688835ca89.js";
            }
            else{
                wibiyaScriptSrc = altToolbarUrl(altToolbar);
            }
            loadjscssfile(wibiyaScriptSrc,"js","body");
        }
    }
}


if (typeof(wibiyaToolbar)!="object"){
    if ( typeof jQuery != "function"){
        loadjscssfile("http://cdn.wibiya.com/Scripts/jquery-1.4.2.min.js","js","head");
    }
    else{
        if (wibiya_latestJq && jquery_ver() != wibiya_jQuery_ver){
            loadjscssfile("http://cdn.wibiya.com/Scripts/jquery-1.4.2.min.js","js","head");
        }
    }

    var wibiyaToolbar = {};
    wibiyaToolbar.framework = {};
    
    wibiyaToolbar.id="671526";
    wibiyaToolbar.referrer=document.referrer;
    CheckJQueryLoader(wibiyaToolbar.id);
}

<div xmlns="http://www.w3.org/1999/xhtml"><div style="cursor:crosshair; height:100%; width:100%"></div>
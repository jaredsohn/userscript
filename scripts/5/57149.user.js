// Facebook Mafia Wars Quick/Auto Heal user script
// version 0.2.7
// 2008-05-12
// Copyright (c) 2008, Yathi Raj
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Face Book Mafia Wars Quick/Auto Heal", and click Uninstall.
//
// --------------------------------------------------------------------
/*
History
-------
    15/06/09 - Version 0.2.7 - Updated script to accomodate the changes done by Zynga 
    30/05/09 - version 0.2.6  - Added auto update feature using GreaseMonkey Script Update Control
    30/05/09 - version 0.2.5  - Added option to enable/disable auto heal, link renamed to auto heal 
    27/05/09 - version 0.2.4  - Fixed bug which made multiple auto heal request when health level became less than 41
    27/05/09 - version 0.2.3  - Updated script to Auto Heal when health is less than 31
    20/05/09 - version 0.2.2  - Fixed the script to prevent throbber spinning after refilling the health
    16/05/09 - version 0.2.1  - Modified the script to update all stats(money, health, level, energy etc)  after a quick heal
    13/05/09 - version 0.2    - Updated the script to Heal Users with out leaving the page
    12/05/09 - version 0.1    - Created

*/
//
// ==UserScript==
// @name           AutoHeal for Mafia Wars on FaceBook
// @namespace      http://userscripts.org/users/90224/
// @description    Replaces Hospital link with Heal link in Mafia Wars. Removes the additional burden of going to hospital
// @include        http://apps.facebook.com/inthemafia/*
// @include        http://apps.new.facebook.com/inthemafia/*
// @version        0.2.7
// ==/UserScript==

/********** SCRIPT VERSION CONTROL 0.5 *************/
var myScriptId=48960
var myScriptVersion="0.2.7";
GMSUCfreq=9;    // control frequency
GMSUCtime=16;   // disapearing delay
/********** SCRIPT VERSION CONTROL 0.5 *************/
/* Any help about this functions can be found at
http://sylvain.comte.online.fr/AirCarnet/?post/GreaseMonkey-Script-Update-Control
*/
/* parameters */
/* SET YOUR OWN SCRIPT VALUES */
var thisId=48960;       // your script userscript id
var thisVersion="0.2.7";      // the @version metadata value
var thisReleaseDate="20090615"; // release date of your script. Not mandatory, use this paramater
                                // only if you want to be sharp on version control frequency.

/* script version control parameters */
var GMSUCtime=16;   // Delay before alert disapears (seconds)
                    // set to 0 if you don't want it to disapear (might be a bit intrusive!)
var GMSUCfreq=9;    // Update control frequency (days)

/* colorpalettes */
    // feel free to create your own. color in this order : back, highlight, front, light.
    var cpChrome=new colorPalette("#E1ECFE","#FD2","#4277CF","#FFF");   // but for Firefox ;-)
    var cpUserscript=new colorPalette("#000","#F80","#FFF","#EEE");     // javascrgeek only
    var cpFlickr=new colorPalette("#FFF","#FF0084","#0063DC","#FFF");   // pink my blue
// choose yours
var GMSUCPal=cpUserscript;  // colorPalette you prefer

/* launching script version control  */
GM_scriptVersionControl();

// define launch function
function GM_scriptVersionControl() {
    if(self.location==top.location) { // avoid script execution in each frame of the page
        // test if script should be performed to control new release regarding frequency
        var GMSUCreleaseDate=new Date();
        GMSUCreleaseDate.setFullYear(eval(thisReleaseDate.substring(0,4)),eval(thisReleaseDate.substring(4,6))-1,eval(thisReleaseDate.substring(6,8)));
        var GMSUCtoday=new Date(); var GMSUCdif=Math.floor((GMSUCtoday-GMSUCreleaseDate)/1000/60/60/24);
        if (GMSUCdif%GMSUCfreq==0) {
            GMSUC_Control();
            }}}

// define control function
function GMSUC_Control() {
    var scriptId=thisId;var version=thisVersion;
    var scriptUrl="http://userscripts.org/scripts/source/"+scriptId+".meta.js";
    // go to script home page to get official release number and compare it to current one
    GM_xmlhttpRequest({
        method: 'GET',
        url: scriptUrl,
        headers: {
             'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
             'Accept': 'text/html,application/xml,text/xml',
             },
        onload: function(responseDetails) {
            var textResp=responseDetails.responseText;
            var offRel=/\/\/\s*@version\s*(.*)\s*\n/i.exec(textResp)[1];
            offRel = offRel.trim();
            var scriptName=/\/\/\s*@name\s*(.*)\s*\n/i.exec(textResp)[1];
            if(offRel!=version) {
                // Styling
                GM_addStyle("#GMSUC-alerte {position:absolute;top:0px;left:50%;margin:20px 0 0 -128px;padding:6px;z-index:1000;width:250px;-moz-border-radius:6px;background:"+GMSUCPal.back+";border:"+GMSUCPal.light+" 1px solid;color:"+GMSUCPal.front+";font-size:1em;text-align:center} #GMSUC-alerte a {font-weight:bold;font-size:1em} #GMSUC-alerte * {color:"+GMSUCPal.front+";} #GMSUC-alerte table {width:100%;margin:0.5em 0 0 0} #GMSUC-alerte td {width:33%;text-align:center;border:solid 1px "+GMSUCPal.front+"} #GMSUC-alerte td:hover{background:"+GMSUCPal.high+"} #GMSUC-alerte td:hover a {color:"+GMSUCPal.front+"} #GMSUC-timer {font:2em bold;margin:0.5em 0 0 0} #GMSUC-info {text-align:right;font:0.5em serif;margin:1em 0 0 0} #GMSUC-info a {font:0.75em serif}  #GMSUC-info a:hover {background:"+GMSUCPal.front+";color:"+GMSUCPal.back+"}");
                // Lang detection and apply
                var Langues="en, fr";
                var lang=navigator.language;
                var reg=new RegExp(lang,"g");
                if(!Langues.match(lang)) lang="en";
                /* traductions / translations */
                    var Txt=new Array();
                    for(i=1;i<7;i++) {Txt[i]=new Array();} 
                    // français
                    Txt[1]["fr"]="Vous utilisez la version";
                    Txt[2]["fr"]="du script";
                    Txt[3]["fr"]="La version officielle est différente";
                    Txt[4]["fr"]="installer";
                    Txt[5]["fr"]="voir le code";
                    Txt[6]["fr"]="propulsé par";
                    // english
                    Txt[1]["en"]="You're using";
                    Txt[2]["en"]="version of";
                    Txt[3]["en"]="script. Official release version is different";
                    Txt[4]["en"]="install";
                    Txt[5]["en"]="view code";
                    Txt[6]["en"]="powered by";
                /* ------------------------------- */   
                var alerte=document.createElement('div');
                alerte.setAttribute('id','GMSUC-alerte');
                var GMSUCtextAlerte=Txt[1][lang]+" "+version+" "+Txt[2][lang]+" <i><b>"+scriptName+"</b></i>";
                GMSUCtextAlerte+=". "+Txt[3][lang]+" (<a href='http://userscripts.org/scripts/show/"+scriptId+"'>"+offRel+"</a>)";
                GMSUCtextAlerte+="";
                GMSUCtextAlerte+="<table><tr><td><a href='http://userscripts.org/scripts/show/"+scriptId+"'>v."+offRel+"</a></td><td><a href='http://userscripts.org/scripts/review/"+scriptId+"'>"+Txt[5][lang]+"</a></td><td><a  href='http://userscripts.org/scripts/source/"+scriptId+".user.js'>"+Txt[4][lang]+"</a></td></tr></table>"
                if(GMSUCtime>0) GMSUCtextAlerte+="<div id='GMSUC-timer'>"+GMSUCtime+" s</div>";
                GMSUCtextAlerte+="<div id='GMSUC-info'>"+Txt[6][lang]+" <a href='http://sylvain.comte.online.fr/AirCarnet/?post/GreaseMonkey-Script-Update-Control'>GM Script Update Control</a></div>";
                document.body.appendChild(alerte);
                document.getElementById('GMSUC-alerte').innerHTML=GMSUCtextAlerte;
                if(GMSUCtime>0) {
                    function disparition() {
                        if(GMSUCtime>0) {
                            document.getElementById("GMSUC-timer").innerHTML=GMSUCtime+" s";
                            GMSUCtime+=-1;
                            setTimeout(disparition,1000)
                            }
                        else document.getElementById("GMSUC-alerte").setAttribute("style","display:none");
                        }
                    disparition();
                    }
                }
            }
        });
    }

/* Color palette creator */ 
function colorPalette(b,h,f,l) {this.back=b;this.high=h;this.front=f;this.light=l;} 
    
/******* END OF SCRIPT VERSION CONTROL **********/

String.prototype.trim = function() {
    a = this.replace(/^\s+/, '');
    return a.replace(/\s+$/, '');
};
    
function handleTempMainContainerDomEvents(){
    
    var tempDiv = document.getElementById('app10979261223_mainDivTemp');
    var mainDiv = document.getElementById('mafiawar-quickheal-iframe');
    var tempFrame = document.getElementById('mafiawar-quickheal-iframe');
    tempFrame = tempFrame.contentDocument;
    if(tempDiv && tempFrame){
        tempDiv.removeEventListener('DOMSubtreeModified',handleTempMainContainerDomEvents,false);
        
        tempFrame.body.innerHTML = tempDiv.innerHTML;        
        var old_stat = document.getElementById("app10979261223_mw_stats");
        var new_stat = tempFrame.getElementById("app10979261223_mw_stats");
        if (old_stat && new_stat){
            old_stat.innerHTML = new_stat.innerHTML
            tempFrame.innerHTML = "";
        }
        tempDiv.addEventListener('DOMSubtreeModified',handleTempMainContainerDomEvents,false);
    }
}

function createTempMainContainer(){    
    if(!document.getElementById('app10979261223_mainDivTemp')){
        var tempMainContainer = document.createElement('div');
        tempMainContainer .setAttribute("id", 'app10979261223_mainDivTemp');
        tempMainContainer.style.display = "None";
        document.body.insertBefore(tempMainContainer, document.body.lastChild);
        tempMainContainer.addEventListener('DOMSubtreeModified',handleTempMainContainerDomEvents,false);
        
    }
    if(!document.getElementById('mafiawar-quickheal-iframe')){
        var tempFrame = document.createElement('iframe');
        tempFrame.setAttribute("id", 'mafiawar-quickheal-iframe');
        tempFrame.style.display = "none";
        document.body.insertBefore(tempFrame, document.body.lastChild);            
    }
}


function modifyHospitalLink(ev){
    var mafiaAppMainDiv = document.getElementById('app10979261223_mainDiv');
    mafiaAppMainDiv.removeEventListener('DOMSubtreeModified',modifyHospitalLink,false); // to prevent recursive call
    var healthLink  = document.getElementById( 'app10979261223_clock_health');
    healLink= document.evaluate("//a[@class='heal_link']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    if(healLink.snapshotLength>=1){
        hl = healLink.snapshotItem(0);
        var healLinkClickAction = hl.getAttribute('onclick');
        var healLinkHref = hl.href;
        if(healLinkClickAction && healLinkHref ){
            healLinkClickUpdatedAction = healLinkClickAction.replace('xw_action=view', 'xw_action=heal');
            healLinkClickUpdatedAction =  healLinkClickUpdatedAction.replace("'inner_page'", "'mainDivTemp'");
            healLinkUpdatedHref = healLinkHref.replace('xw_action=view', 'xw_action=heal');
            hl.setAttribute('onclick', healLinkClickUpdatedAction); 
            hl.href = healLinkUpdatedHref;
            hl.innerHTML="AutoHeal";
            if(!document.getElementById('autoheal-checkbox')){
                var autoHealCheckBox = document.createElement("input");
                autoHealCheckBox.setAttribute('type', "checkbox");
                autoHealCheckBox.checked =  autoHealEnabled;
                autoHealCheckBox.setAttribute('title', "Enable/Disable Auto Heal");
                autoHealCheckBox.setAttribute('id', 'autoheal-checkbox');
                hl.parentNode.insertBefore(autoHealCheckBox, hl);
                autoHealCheckBox.addEventListener('click', safeWrap(toggleAutoHeal), true);
                
            }
        }
        safeWrap(autoHeal)(hl)
        
        
        
        
    }
    mafiaAppMainDiv.addEventListener('DOMSubtreeModified',modifyHospitalLink,false); // adding the removed event
}
var lastHealth = 0;
function autoHeal(healLink){
   
    if (!GM_getValue('enableAutoHeal', true))
        return;
    var currentHealth = document.getElementById('app10979261223_user_health');
    if (currentHealth.innerHTML){
        currentHealth = Number(currentHealth.innerHTML);
        if (currentHealth <= 60 && lastHealth != currentHealth){ //avoid multi firing of this event
            lastHealth = currentHealth;
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
            healLink.dispatchEvent(evt);
            
            safeWrap(GM_log)("autoHeal")
        }
        
    }
}

function toggleAutoHeal(ev){
    autoHealEnabled = ev.target.checked;
    GM_setValue('enableAutoHeal', ev.target.checked);
}

function safeWrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}

var autoHealEnabled = GM_getValue('enableAutoHeal', true);

window.addEventListener("load", function(){var mafiaAppMainDiv = document.getElementById('app10979261223_mainDiv');createTempMainContainer();
if (mafiaAppMainDiv && window.MutationEvent){
    mafiaAppMainDiv.addEventListener('DOMSubtreeModified',modifyHospitalLink,false);
    };}, false);
    


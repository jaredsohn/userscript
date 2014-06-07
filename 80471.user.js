// ==UserScript==
// @name OGame Timers2Title (Timers to Title)
// @description	Adds a timer of current buildings/ships/defences construction or research to the TitleBar
// @version	1.21
// @author		Glibnes - http://glibnes.webd.pl
// @include		http://*ogame.*/game/*

// ==/UserScript==

// Script Update Checker by Jarett (http://userscripts.org/scripts/show/20145) 
var SUC_script_num = 80471; // Change this to the number given to the script by userscripts.org (check the address bar)
var Version = 1.21;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 3600000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseFloat(/@version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=Version;if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){alert(remote_version+'-'+local_version);if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

// USER VARIABLES
var MultiChangeInterval = 5;        //After how many seconds change title (buildings/research/ships&defences rotator)
// END OF USER VARIABLES

// Do not touch under this line!

var Page = false;
var PageType = false;
var MultiChange = 0;
var MultiCurrent = 0;
var MultiChangeInterval = 5;
MultiChangeInterval++;

var MultiArray = new Array();
var MultiTitleArray = new Array();
var AvailableIDs = new Array();
var AvailableLength = 0;
var AvailableEmpty = true;

MultiArray[0] = 'Countdown';
MultiArray[1] = 'researchCountdown';
MultiArray[2] = 'shipCountdown';
MultiArray[3] = 'shipAllCountdown';
var MultiLength = MultiArray.length - 1;

MultiTitleArray[0] = '[B]';
MultiTitleArray[1] = '[R]';
MultiTitleArray[2] = '[S&D]';
MultiTitleArray[3] = '[ALL S&D]';


function $(id){
    return document.getElementById(id);
}

function SetSingleTitle(){
    document.getElementsByTagName('title')[0].innerHTML = OrgTitle+' - '+PageType+' '+$(ElementID).innerHTML;
}

function SetMultiTitle(){
    if(MultiChange >= MultiChangeInterval){
        if(MultiCurrent >= AvailableLength){
            MultiCurrent = 0;
            MultiChange = -1;
        } else {
            MultiCurrent++;
            MultiChange = -1;
        }
    }
    
    document.getElementsByTagName('title')[0].innerHTML = OrgTitle+' - '+MultiTitleArray[AvailableIDs[MultiCurrent]]+' '+$(MultiArray[AvailableIDs[MultiCurrent]]).innerHTML;
    MultiChange++;
}

if(location.href.indexOf('page=overview') >= 0){
    Page = 1;
} else {
    if(location.href.indexOf('page=resource') >= 0 || location.href.indexOf('page=station') >= 0 || location.href.indexOf('page=research') >= 0 || location.href.indexOf('page=shipyard') >= 0 || location.href.indexOf('page=defence') >= 0){
        Page = 2;
        if(location.href.indexOf('page=resource') >= 0 || location.href.indexOf('page=station') >= 0){
            PageType = '[B]';
            ElementID = 'test';
        } else if(location.href.indexOf('page=research') >= 0){
            PageType = '[R]';
            ElementID = 'test';
        } else if(location.href.indexOf('page=shipyard') >= 0){
            PageType = '[S&D]';
            ElementID = 'shipCountdown';
        } else if(location.href.indexOf('page=defence') >= 0){
            PageType = '[S&D]';
            ElementID = 'shipCountdown';
        }
    }
}

if(Page !== false){
    switch(Page){
        case 1:
            loop = 0;
            for(i = 0;i <= MultiLength; i++){
                if($(MultiArray[i]) != undefined){
                    if($(MultiArray[i]).innerHTML != ''){
                        AvailableEmpty = false;
                        AvailableIDs[loop] = i;
                        loop++;
                    }
                }
            }
            if(AvailableEmpty === false){
                AvailableLength = AvailableIDs.length - 1;
                var OrgTitle = document.getElementsByTagName('title')[0].innerHTML;
                var Interval = setInterval(SetMultiTitle, 1000);  
            }
        break;        
        case 2:
            if($(ElementID) != undefined){
                if($(ElementID).innerHTML != ''){
                    var OrgTitle = document.getElementsByTagName('title')[0].innerHTML;
                    var Interval = setInterval(SetSingleTitle, 1000);  
                }  
            }
        break;
    }
}
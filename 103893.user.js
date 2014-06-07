// ==UserScript==
// @name            Pd War Start/End Notifier
// @namespace       Taki
// @icon            http://static.pardus.at/various/logo/pardus_logo64_cap.png
// @description     Informs you when a war officially started/ended
// @include         http*://*.pardus.at/menu.php
// @version         1.0
// ==/UserScript==

// APPROVED (2011-05-31)
// v1.0 - everything works

var version = "1.0";
var univ = location.hostname.split(".")[0]; // get universe-name
var scheduled = false;
var intervalset = false;
var intervalid;
var today = doGetDate();

checkVersion(); 
startIt();

function startIt(){
    if(GM_getValue(univ+"-lastcheck",-1)!=today){ // 
        statsXHR();
    }else{
        scheduleIt();
    }
}

function checkVersion(){ //deletes all saved GM_values if version numbers mismatch
    if (GM_getValue("Version",0)!=version){
        var values = GM_listValues();
        for(i=0;i<values.length;i++){
            GM_deleteValue(values[i]);
        }
        GM_setValue("Version",version);
    }
}

function scheduleIt(){
    scheduled = true;
    setTimeout(statsXHR,adjustTime());
}

function doGetDate(){ // "getDate" is already a function name for the Date Object, so I didn't use that
    var d = new Date();
    if((d.getUTCHours()<5)||((d.getUTCHours()==5)&&(d.getUTCMinutes()<41))){ // anything before 5:40 still counts as prev. day
        d.setUTCDate(d.getUTCDate()-1);
    }
    return d.getUTCDate();
}

function adjustTime(){ //returns (in milliseconds) time until next 5:41:05
    var updatetime = new Date();
    if((updatetime.getUTCHours()>5)||((updatetime.getUTCHours()==5)&&(updatetime.getUTCMinutes()>40))){
        updatetime.setUTCDate(updatetime.getUTCDate()+1);
    }
    updatetime.setUTCHours(5);
    updatetime.setUTCMinutes(41);
    updatetime.setUTCSeconds(5);
    var currenttime = new Date();
    currenttime.setMinutes(currenttime.getMinutes()-currenttime.getTimezoneOffset());
    var adjust = updatetime - currenttime;
    return adjust;
}

function statsXHR(){
    GM_xmlhttpRequest({
        method:     "GET",
        url:        location.protocol + "//" + univ + ".pardus.at/statistics.php?display=wars",
        onerror: function(response){
            setTimeout(statsXHR,30000); //try again in 30 sec on xhr-error (not logged-off error!)
        },
        onload: function(response){
            if(response.responseText.indexOf("</option")!=-1){
                var lastentry = response.responseText.slice(response.responseText.indexOf(">",response.responseText.lastIndexOf("<option")),response.responseText.lastIndexOf("/option>"));
                var runningwar = false;
                if(lastentry.indexOf("Running since")!=-1){
                    runningwar = true;
                }
                var fac1 = lastentry.slice(lastentry.indexOf(": ")+2,lastentry.indexOf(" versus"));
                var fac2 = lastentry.slice(lastentry.indexOf("versus")+7,lastentry.indexOf("<",lastentry.indexOf("versus")));
                var relevantdate = lastentry.slice(lastentry.indexOf(": ")-10,lastentry.indexOf(": "));
                if(scheduled){
                    if(!intervalset){
                        intervalid = setInterval(statsXHR,24*60*60*1000); // run each day
                        today = doGetDate();
                        intervalset = true;
                    }
                }else{
                    scheduleIt();
                }
                if(GM_getValue(univ+"-notfirstrun",false)){
                    if(runningwar!=GM_getValue(univ+"-warstatus",runningwar)){ //change in war-status
                        GM_setValue(univ+"-warstatus",runningwar);
                        if(runningwar){ // war has started
                            alert("\nThere has officially started a war between the " + fac1 + " and the " + fac2 + " at " + relevantdate + " .\n\nTake care and/or good luck!");
                        }else{ // war has ended
                            alert("\nThe official war between the " + fac1 + " and the " + fac2 + " ended at " + relevantdate + " !\n\nTake care still!");
                        }
                    }
                }else{// not first time - doesn't cause a pop-up the first time the script is executed for a universe.
                    GM_setValue(univ+"-notfirstrun",true);
                    GM_setValue(univ+"-warstatus",runningwar);
                }
                GM_setValue(univ+"-lastcheck",today);
            }else{ //only gets called when user has logged off and left this window open
                clearInterval(intervalid);
                var scheduled = false;
                var intervalset = false;
                var today = doGetDate();
                setTimeout(startIt,60000); // try again in a minute
            }
        }
    });
}
// ==UserScript==
// @name        mich-daruba-interrupter
// @namespace   http://codecombat.com/play/ladder/greed#simulate
// @description http://codecombat.com/play/ladder/greed#simulate
// @include     http://codecombat.com/play/ladder/greed#simulate
// @version     1
// @grant       none
// ==/UserScript==
var SCRIPT_NAME = 'mich-daruba-interrupter';
var STATUS_NODE_ID = 'simulation-status-text';
var START_BUTTON_ID = 'simulate-button';
var bannedPairs = [['mich', 'daruba']];
var startedSimulation = false;
var startSimulationInterval;

function getStatusText(){    
    var statusNode = document.getElementById(STATUS_NODE_ID);
    if(!statusNode){
        return "";
    }
    return statusNode.innerHTML.toString();    
}

function containsAnyBannedPair(_str){
    function statusContains(pair){
       return _str.indexOf(pair[0])!=-1 && _str.indexOf(pair[1])!=-1;
    }
    return bannedPairs.some(statusContains);
}

function startSimulation(){
    var button = document.getElementById(START_BUTTON_ID);
    if(button){
        button.click();
        startedSimulation=true;
        clearInterval(startSimulationInterval);
        
    }
}

function restartIfBanned(){
    var banned = containsAnyBannedPair(getStatusText());
    if(banned){
        location.reload(false);
    }
}

function act(){    
    
    startSimulationInterval =  setInterval(function(){showErrors(startSimulation);},5000);
    setInterval(function(){showErrors(restartIfBanned);},5000);
}
    
function showErrors(f){
    try{
        f();
    }catch(e){
        alert('error in '+ SCRIPT_NAME+ ': '+e.message);
    }
}
        
showErrors(act);
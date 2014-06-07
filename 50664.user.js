// ==UserScript==
// @name         Gay
// @shortname    Gay
// @namespace    mafiawars
// @description  Gay
// @include      *api.msappspace.com/apprendering/110226/canvas/*/render.app*
// ==/UserScript==

document.getElementById('MainDiv').innerHTML += '<div style="position: absolute; top: 10px; left: 10px; width: 300px; height: 100px;"><textarea id="mafiawars_log" style="height: 100%; width: 100%;"></textarea></div><a id="MMWButton"></a>';

// job description, energy cost, job number, tab number
var missions = new Array(['Mugging', 1, 1, 1], ['Corner Store Hold-up', 3, 2, 1], ['Warehouse Robbery', 5, 3, 1], ['Auto Theft', 7, 4, 1], ['Beat Up Rival Gangster', 2, 5, 1], ['Rob a Pimp', 3, 8, 1], ['Collect on a Loan', 2, 37, 1], ['Collect Protection Money', 2, 6, 2], ['Rough Up Dealers', 2, 7, 2], ['Take Out a Rogue Cop', 3, 9, 2], ['Perform a Hit', 3, 10, 2], ['Bank Heist', 10, 11, 2], ['Exterminate a Rival Family', 10, 11, 5]);

var loc = "main";

function _player(){
    this.cash = 0;
    this.health = 0;
    this.energy = 0;
    this.stamina = 0;
    this.skill = 0;
    this.level = 0;
    this.mission = new Array();
    
    this.getMission = function(){
        if (this.level > 5) {
            this.mission = missions[11];
        }
        else {
        }
    };
    
    this.getStats = function(){
        if (document.getElementById('user_cash')) {
            this.cash = document.getElementById('user_cash').innerHTML;
        }
        if (document.getElementById('user_health')) {
            this.health = document.getElementById('user_health').innerHTML;
        }
        if (document.getElementById('user_energy')) {
            this.energy = document.getElementById('user_energy').innerHTML;
        }
        if (document.getElementById('user_stamina')) {
            this.stamina = document.getElementById('user_stamina').innerHTML;
        }
        if (document.getElementById('user_level')) {
            this.skill = document.getElementById('user_skill').innerHTML;
        }
        if (document.getElementById('user_level')) {
            this.level = document.getElementById('user_level').innerHTML;
        }
    };
}

var player = new _player();

function _Main(){
    if (document.getElementById('MainDiv').style.display == 'block') {
        _DebugOut(loc);
        player.getStats();
        player.getMission();
        if (loc == "main") {
            if (player.health <= 50) {
                loc = "hospital";
            }
            else 
                if (player.energy >= player.mission[1]) {
                    _DebugOut(player.mission[1]);
                    loc = "job";
                    clickMenu('jobs_link');
                    _DebugOut("Running " + player.mission[0]);
                }
        }
        else {
            if (loc == "job") {
                clickJob(player.mission[2], player.mission[3]);
            }
        }
    }
    setTimeout(function(){
        _Main();
    }, 3000);
}

function clickMenu(str){
    click_element(document.getElementById('game_nav').getElementsByClassName('nav_link ' + str).item(0).getElementsByTagName('a').item(0));
}

//ZY.View.get('remote/html_server.php?xw_time=1243972656&xw_exp_sig=881fbac03969359d614986897f19783f&xw_controller=job&xw_action=view&tab=1&bar=0&xhd=1243972656&lwh=1346291362');
function clickJob(jobid, tabid){
    alert('test');
    alert(document.getElementsByClassName('tab_on').item(0).getElementsByTagName('a').item(0).onclick.toString);
    //str = "ZY.View.get('remote/html_server.php?xw_time=1243972656&xw_exp_sig=881fbac03969359d614986897f19783f&xw_controller=job&xw_action=view&tab=1&bar=0&xhd=1243972656&lwh=1346291362');";
    //document.getElementById('MMWButton').onclick = function(s){
    //    eval(s);
    //}(str);
    //click_element(document.getElementById('MMWButton'));
}

function click_element(element){
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(event);
    return;
}

function _DebugOut(msg){
    document.getElementById('mafiawars_log').value += msg + "\n";
    if (document.getElementById('mafiawars_log').scrollHeight) {
        document.getElementById('mafiawars_log').scrollTop = document.getElementById('mafiawars_log').scrollHeight;
    }
}

_Main();

// ==UserScript==
// @name           TradeWarsRisingTurnTracker
// @namespace      TWRTT
// @description    Stores ingame turns, lastseentime, and maxturns & turnsperday of each game, to be able to show current turnsleft in the my-games view
// @include        http://www.tradewarsrising.com/*
// ==/UserScript==

var $; // needed for JQuery
var UpdateInterval=1000; //check & update timer, in milliseconds
var LastRules="";//needed to store last set of rules in, to be able to check if it has changed
var AlreadySet=false;//flag needed to only add calculated turnsleft once

//Get the currently stored values from GM right now, before JQuery is loaded to prevent issues:
var valnames = [];
var valvalues = [];
for each (var val in GM_listValues()) {
    valnames.push(val);
    valvalues.push(GM_getValue(val));
}

//now load JQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;
        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

function letsJQuery() {
    setInterval(function() {//set up check-loop
        if (window.name=='content'){
            CheckTurns();//check ingamepage for turns, if found, store them
        } else {
            CheckTurnsInfo();//check gameinfopage to grab maxturns and turnsperday for that game, and store them if found
            CheckMyGamesPage();//check mygamespage and add stored, calculated info on turns to page
        }
    },UpdateInterval)      
}

function CheckMyGamesPage(){
    var urlvars=getUrlVars();
    var urlvarpage=urlvars['page'];
    var urlvarg=urlvars['g'];
    if (urlvarpage=='play_search' && urlvarg=='1'){
        if (!AlreadySet){
            $(".capsule").each(function(index){
                var c=$(this).attr("onClick");
                if (c){
                    var game_id=c.split("top.location.href='?page=game&game_id=")[1].split("'")[0];
                    playername=GetPlayerName();
                    key1=''+playername+'_'+game_id+'_values';
                    key2=''+playername+'_'+game_id+'_time';
                    val1="";
                    val2="";
                    for (var i=0;i<valnames.length;i++){
                        if (valnames[i]==key1){
                            val1=valvalues[i];
                        }
                        if (valnames[i]==key2){
                            val2=valvalues[i];
                        }                        
                    }  
                    
                    lastreportedturns=val1;                    
                    if (lastreportedturns){
                        var perday=0;
                        var maxturns=0;
                        for (var i=0;i<valnames.length;i++){
                            if (valnames[i]=='z_'+game_id+'_TurnPerDay'){
                                perday=valvalues[i];
                            }
                            if (valnames[i]=='z_'+game_id+'_TurnMax'){
                                maxturns=valvalues[i];
                            }
                        }
                        var perhalfhour=Math.round(perday/48.0);
                        var nowdate=new Date();
                        var lastseen = new Date(val2);
                        var verschil=Math.floor((nowdate-lastseen)/(1000*60*30));//whole blocks of 30 minutes
                        var nowminutes=nowdate.getMinutes();//now see if the clock crossed 00 or 30, to add 1 more block
                        var lastseenminutes=lastseen.getMinutes();
                        if (lastseenminutes>0 && lastseenminutes<30){
                            if (nowminutes<lastseenminutes){
                                verschil=verschil+1;
                            }
                            if (nowminutes>=30 && nowminutes<(lastseenminutes+30)){
                                verschil=verschil+1;
                            }
                        }
                        if (lastseenminutes>30 && lastseenminutes<60){
                            if (nowminutes>=30 && nowminutes<lastseenminutes){
                                verschil=verschil+1;
                            }
                            if (nowminutes<30 && nowminutes<(lastseenminutes-30)){
                                verschil=verschil+1;
                            }
                        }
                        verschil=verschil*perhalfhour;//Multiply number of blocks by the number of turns per block (half hour)
                        verschil=0+parseInt(lastreportedturns)+parseInt(verschil);//Add gained turns to reported turns
                        if (verschil>maxturns){verschil=maxturns;}//check for over-maxturns, if so, set to maxturns
                        
                        var recentDiv = document.createElement('span');
                        recentDiv.setAttribute("style", "position:relative;top:-80px;");
                        var recentDivContent = document.createTextNode(verschil);
                        recentDiv.appendChild(recentDivContent);
                        $(this).append(recentDiv);//add text node to actual page-element
                    }
                }
            });
        }
        AlreadySet=true;//set flag to do this only once each pageload
    }
}

function CheckTurnsInfo(){
    var tds=$(".capsule_info");
    if (tds.size()==3){
        var TurnPerDay=0;
        var TurnMax=0;
        var urlvars=getUrlVars();
        var game_id=urlvars['game_id'];
        $(".large_content > table > tbody > tr > td").each(function(index) {
            if (index==3){TurnPerDay=$(this).text();}
            if (index==5){TurnMax=$(this).text();}
        });
        var somestring="CheckTurnsInfo&";
        somestring=somestring+'TurnPerDay='+TurnPerDay+"&"
        somestring=somestring+'TurnMax='+TurnMax+"&"
        if (somestring!=LastRules && TurnPerDay && TurnMax){//only set values if they have changed AND there is actual data
            LastRules=somestring;
            setTimeout(function() {
                GM_setValue('z_'+game_id+'_TurnMax', ''+TurnMax);
                GM_setValue('z_'+game_id+'_TurnPerDay', ''+TurnPerDay);
            }, 0);
        }
    }
}

function CheckTurns(){
    var c=document.getElementById('gui_player_stats');
    if (c){
        var tds=$("#gui_player_stats > div");
        if (tds.size()==34){
            var urlvars=getUrlVars();
            var game_id=urlvars['game_id'];
            var turns="0";
            var name=$("#name").text();
            $("#gui_player_stats > div").each(function(index) {
                if (index==22){turns=$(this).text();}
            });
            key1=name+'_'+game_id+'_values';
            value1=turns;
            key2=name+'_'+game_id+'_time';
            value2=Date();
            setTimeout(function() {
                GM_setValue(key1, value1);
                GM_setValue(key2, value2);
            }, 0);
        }
    }
}

function GetPlayerName(){
    playername="";
    var tds=$(".right_expendable > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(2)");
    if(tds){
        playername=tds.text();
    }
    return playername;
}

function getUrlVars(){
    var vars = [], hash;
    var hashes = window.top.location.href.slice(window.top.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
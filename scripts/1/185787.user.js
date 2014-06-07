// ==UserScript==
// @name        AutoFarm Freebitco.in Reborn
// @namespace   Freebitcoin
// @description Auto Farme on Freebitco.in
// @include     http://freebitco.in/*
// @version     0.4.10
// @updateURL   http://ploof.eu/autofarm/meta.js
// @downloadURL   http://ploof.eu/autofarm/AutoFarm_Freebitco.in.js
// @author      Andrelec1
// @grant       none
// ==/UserScript==

//Var for script
var version =  GM_info.script.version;
var token = "";
var loop = false;

// function debug;
function sleep(milliseconds) {
    setTimeout(function(){
        var start = new Date().getTime();
        while ((new Date().getTime() - start) < milliseconds) {}
    },0);
}

// Gestion LocalStorage
function firstInitLocalStorage(){

    // force init localstorage
    if(localStorage.init != 1 || localStorage.version != version ){
        alert("Reset localStorage");

        var roletotal = 0;
        var wintotal = 0;
        var loosetotal = 0;
        var savebtc = 0.00000000;

        if(parseInt(localStorage.roletotal)>0 && parseInt(localStorage.wintotal)>0 && parseInt(localStorage.loosetotal)>0 && parseFloat(localStorage.savebtc)>0){
            if (!confirm('Keep Total rolling value ?')) {
                if (!confirm('Sure you want lost value : Roles : '+localStorage.roletotal+' Win : '+localStorage.wintotal+' Loose : '+localStorage.loosetotal)){
                    roletotal = localStorage.roletotal;
                    wintotal = localStorage.wintotal;
                    loosetotal = localStorage.loosetotal;
                    savebtc = localStorage.savebtc;
                }
            } else {
                roletotal = localStorage.roletotal;
                wintotal = localStorage.wintotal;
                loosetotal = localStorage.loosetotal;
                savebtc = localStorage.savebtc;
            }

        }

        localStorage.clear();
        localStorage.init = 1;

        // this value i the more importante value ...
        // more than 512 is i good choise because you can't loose 9 party ...
        // but if you type more than 1024 you can loose 10 party and you restart wihout reserve ...
        // the best value is 512 + 32 => 9 + 5 chaine loose ... ( 544 )
        // this is why i put 550 !
        localStorage.btcforplaying =  0.00000550;

        // init localStorage value
        localStorage.savebtc = savebtc;
        localStorage.autosavebtc =  "0.00000001";
        localStorage.minbet =  "0.00000001";
        localStorage.bettype = "hi";
        localStorage.multiplicator = 2;
        localStorage.maxchaineloose = 0;
        localStorage.tempRoling = 1000;
        localStorage.roletotal = roletotal;
        localStorage.wintotal = wintotal;
        localStorage.loosetotal = loosetotal;
        //localStorage.loosetotal = loosetotal;
        localStorage.version = version;
    }
}

function initLocalStorage(){

    if (typeof(Storage) == "undefined") {
        alert("LocalStorage didn't work !!");
        return;
    }

    firstInitLocalStorage();

    $("#savebtc").val(parseFloat(localStorage.savebtc).toFixed(8));
    //$("#autosavebtc").val(parseFloat(localStorage.autosavebtc).toFixed(8));
    $("#minbet").val(parseFloat(localStorage.minbet).toFixed(8));
    $("#btcforplaying").val(parseFloat(localStorage.btcforplaying).toFixed(8));
    $("#tempRoling").val(parseInt(localStorage.tempRoling));

    $("#roletotal").text(localStorage.roletotal);
    $("#wintotal").text(localStorage.wintotal);
    $("#loosetotal").text(localStorage.loosetotal);
    $("#ml").text(localStorage.maxchaineloose);

    switch (localStorage.bettype){
        case "hi":
            $("#hitype_btn").prop('disabled', true);
            $("#lotype_btn").prop('disabled', false);
            $("#switchtype_btn").prop('disabled', false);
            break;
        case "lo":
            $("#hitype_btn").prop('disabled', false);
            $("#lotype_btn").prop('disabled', true);
            $("#switchtype_btn").prop('disabled', false);
            break;
        case "switch":
            $("#hitype_btn").prop('disabled', false);
            $("#lotype_btn").prop('disabled', false);
            $("#switchtype_btn").prop('disabled', true);
            break;
    }

    switch (localStorage.multiplicator){
        case "2":
            $("#mult2_btn").prop('disabled', true);
            $("#mult11_btn").prop('disabled', false);
            break;
        case "11":
            $("#mult2_btn").prop('disabled', false);
            $("#mult11_btn").prop('disabled', true);
            break;
    }

}

function saveLocalStorage(){

    localStorage.savebtc = $("#savebtc").val();
    //localStorage.autosavebtc =  $("#autosavebtc").val();
    localStorage.minbet =  $("#minbet").val();
    localStorage.btcforplaying =  $("#btcforplaying").val();
    localStorage.tempRoling =  $("#tempRoling").val();


    if($("#hitype_btn").prop('disabled')){
        localStorage.bettype = "hi";
    }else if($("#lotype_btn").prop('disabled')){
        localStorage.bettype = "lo";
    }
    else if($("#switchtype_btn").prop('disabled')){
        localStorage.bettype = "switch";
    }

    if($("#mult2_btn").prop('disabled')){
        localStorage.multiplicator = 2;
    }else if($("#mult11_btn").prop('disabled')){
        localStorage.multiplicator = 11;
    }
}

// Function GUI
function addSigne(value) {
    // add signe ( +|- ) for fun!
    if (parseFloat(value) > 0) {
        return '+ ' + parseFloat(value).toFixed(8);
    }
    return '- ' + (0 - parseFloat(value)).toFixed(8);
}

function injectGIU() {
    // GUI
    var hh = '</br>';
    hh += '<table id="tableinject" style="margin: 50px auto 0; width: 600px">';
    hh += '<tr><th>AutoFarm Freebitco.in v '+version+'</th><td>Your token : '+token+' </td></tr>';
    hh += '<tr><th>Min Btc for playing</th><td><input id="btcforplaying" type="text" value="0.00000000" style="margin: 0px; border-radius: 10px 10px 10px 10px;"/></td></tr>';
    hh += '<tr><th>Min Bet </th><td><input id="minbet" type="text" value="0.00000000" style="margin: 0px; border-radius: 10px 10px 10px 10px;"/></td></tr>';
    //hh += '<tr><th>Auto Ajuste btc save at</th><td><input id="autosavebtc" type="text" value="0.00000000" style="margin: 0px; border-radius: 10px 10px 10px 10px;"/></td></tr>';
    hh += '<tr><th>Save btc  <button id="SetSavebtc_btn" style="border-radius: 10px 10px 10px 10px;">auto define</button></th><td><input id="savebtc" type="text" value="0.00000000" style="margin: 0px; border-radius: 10px 10px 10px 10px;"/></td></tr>';
    hh += '<tr><th>Type Bet / Multiplicator </th><td><button id="hitype_btn" style="border-radius: 10px 0px 0px 10px;">Hi</button><button id="lotype_btn">Lo</button><button id="switchtype_btn" style="border-radius: 0px 10px 10px 0px;" >Auto Switch</button>' +
          '   <button id="mult2_btn" style="border-radius: 10px 0px 0px 10px;" >x2</button><button id="mult11_btn" style="border-radius: 0px 10px 10px 0px;" >x11</button></td></tr>';
    hh += '<tr><th>Client seed</th><td><input id="seed" type="text" value="0.00000000" style="margin: 0px; border-radius: 10px 10px 10px 10px;"/></td></tr>';
    hh += '<tr><th>Min temps by role (in ms)</th><td><input id="tempRoling" type="text" value="0" style="margin: 0px; border-radius: 10px 10px 10px 10px;"/></td></tr>';
    hh += '<tr><th>Balance game / total / Win Session </th><td><span id="balancegame">0.00000000</span> / <span id="balancetotal">0.00000000</span> / <span id="winSession">0.00000000</span></td></tr>';
    hh += '<tr><th>Bet  <button id="resetbet_btn" style="border-radius: 10px 10px 10px 10px;">Reset Bet</button></th><td><input id="mise" type="text" value="0.00000001" style="margin: 0px;border-radius: 10px 10px 10px 10px;"/></td></tr>';
    hh += '<tr><th>Games / Won / Lost</th><td><span id="roletotal">0</span> (<span id="role">0</span>) / <span id="wintotal">0</span> (<span id="win">0</span>) / <span id="loosetotal">0</span> (<span id="loose">0</span>)</td></tr>';
    hh += '<tr><th>Ratio</th><td><span id="ratiototal">0</span> (<span id="ratio">0</span>)</td></tr>';
    hh += '<tr><th>Max Win</th><td><span id="mw">0</span> (<span id="cw">0</span>)</td></tr>';
    hh += '<tr><th>Max Loose</th><td><abbr id="abbr_maxloose" title="0"><span id="ml">0</span></abbr> (<span id="cl">0</span>) / <abbr id="abbr_maxloosepossible" title="0"><span id="max_loose_possible">0</span></abbr></td></tr>';

    //hh += '<tr><th></th><td></td></tr>';

    hh += '<tr><th><button id="ResetLS_btn" style="border-radius: 10px 0px 0px 10px;background-color: firebrick;">Reset</button><button id="SaveLS_btn" style="border-radius: 0px 10px 10px 0px;">Save Config</button></th><td><button id="playone_btn" style="border-radius: 10px 0px 0px 10px;">1 Play</button><button id="playloop_btn" style="border-radius: 0px 10px 10px 0px;">Play Loop</button></td></tr>';
    hh += "</table>";
    hh += "</br></br></br></br></br>";
    $("body").prepend(hh);
}

function ValueOnGui(){
    $("#balancegame").text(parseFloat(($("#balance").text()) - parseFloat(localStorage.savebtc)).toFixed(8));
    $("#balancetotal").text($("#balance").text())
    $("#max_loose_possible").text(getMaxLoosePossible());
    $("#seed").val(getNewSeed());
    $("#ratiototal").text(((parseInt($("#wintotal").text())/parseInt($("#roletotal").text()))*100).toFixed(3));
    $("#abbr_maxloose").attr("title",getAmoutMiseByLoose(localStorage.maxchaineloose).toFixed(8));
}

function getAmoutMiseByLoose(nb) {
    // how cost x loose chaine
    var i=parseFloat(localStorage.minbet);
    for(var j = 0; j<nb;j++){i=i*2}
    return i;
}

function getMaxLoosePossible() {
    // how many roll you can loose and you can replay with bet * 2
    var btc = parseFloat($("#balancegame").text());
    var loop = 0;
    for (var i = localStorage.minbet; i < btc; i = i * 2) {
        loop++;
    }

    $("#abbr_maxloosepossible").attr("title", getAmoutMiseByLoose(loop-1).toFixed(8) + " - " +
                                              (parseFloat($("#balancegame").text()) - getAmoutMiseByLoose(loop-1)).toFixed(8));

    return loop -1 ;
}

// Game function
function gettoken(){
    // i need this token for url api get !
    token = $("#free_play_token").val();
    if(token == ""){
        alert("Token not found");
    }
}

function getNewSeed(){
    return Math.random().toString(36).substr(2,9)+Math.random().toString(36).substr(2,6);
}

function GetWaintingTime(start){
    var timeExecution = new Date().getTime() - start ;
    if(timeExecution > parseInt(localStorage.tempRoling)){
        return 1;
    }
    else{
        return parseInt(localStorage.tempRoling) - timeExecution;
    }
}


function play(){
    //TODO add verification if config change without save ! ( or add autosave on change ;)
    var tempStart = new Date().getTime(); //TODO add somme fun with this

    //lock play one button
    $("#playone_btn").prop('disabled', true);
    if(loop == true)$("#playloop_btn").css("background-color", "#99FF33");

    //link => http://freebitco.in/?op=double_your_btc&m=hi&client_seed=dWV4kAcQfy6AUD7H&jackpot=0&stake=0.00000001&multiplier=2
    // use token for seed !
    //return => s1:w:9251:0.00001955:0.00000001:0:240cab1ebeb9f33a4e84e9cffee6009f0db13baadc7b6bc4728579e043fb1e48:dWV4kAcQfy6AUD7H:3323:EVGqrww4EmI0:9f7e0597ffb3e8fb87d5f56e101b2f542105f4520f54fb1ee86a8220692a113e:dWV4kAcQfy6AUD7H:3322:0:0.00000000

    //TODO implement auto switch bet method with var ...
    // well if i force save; its same ^^
    // maybe add argument for play function ...
    // play by play function or by button !
    saveLocalStorage();

    // string for api
    var link = "http://freebitco.in/?op=double_your_btc&m="+localStorage.bettype+"&client_seed="+$("#seed").val()+
               "&jackpot=0&stake="+$("#mise").val()+"&multiplier="+localStorage.multiplicator;

    $.get(link, function (data) {
        var table = data.split(":");
        //table[1] = w for win / 0 for loose
        //table[3] = balance
        //table[4] = mise;

        //Spartaaaaaaaaaaaa methode
        if(localStorage.multiplicator == 2){
            $("#role").text(parseInt($("#role").text())+1);
            $("#roletotal").text(parseInt($("#roletotal").text())+1);
            localStorage.roletotal = $("#roletotal").text();

            if(table[1] == "w"){
                //i win
                $("#mise").val(localStorage.minbet);
                $("#win").text(parseInt($("#win").text())+1);
                $("#wintotal").text(parseInt($("#wintotal").text())+1);
                localStorage.wintotal = $("#wintotal").text();

                //calcule max chaine win, current chaine win.
                $("#cw").text(parseInt($("#cw").text())+1);
                $("#cl").text(0);
                if(parseInt($("#cw").text()) > parseInt($("#mw").text())){
                    $("#mw").text(parseInt($("#cw").text()));
                }

                //reajuste max loose possible , maybe wrong place for this !
                $("#max_loose_possible").text(getMaxLoosePossible());
            }else{
                //i loose
                $("#mise").val((parseFloat($("#mise").val())*2).toFixed(8));
                $("#loose").text(parseInt($("#loose").text())+1);
                $("#loosetotal").text(parseInt($("#loosetotal").text())+1);
                localStorage.loosetotal = $("#loosetotal").text();

                //calcul max chaine loose,  current chaine loose.
                $("#cl").text(parseInt($("#cl").text())+1);
                $("#cw").text(0);
                if(parseInt($("#cl").text()) > parseInt($("#ml").text())){
                    $("#ml").text(parseInt($("#cl").text()));
                    localStorage.maxchaineloose = parseInt($("#cl").text());
                    $("#abbr_maxloose").attr("title",getAmoutMiseByLoose(localStorage.maxchaineloose).toFixed(8));
                }

                //you loose, go change seed;
                $("#seed").val(getNewSeed());
            }
            $("#ratio").text(((parseInt($("#win").text())/parseInt($("#role").text()))*100).toFixed(3));
            $("#ratiototal").text(((parseInt($("#wintotal").text())/parseInt($("#roletotal").text()))*100).toFixed(3));

            //ajust savebtc and update winsession
            var save = (Math.floor((parseFloat(table[3]) - parseFloat(localStorage.btcforplaying)) / parseFloat(localStorage.autosavebtc))) * parseFloat(localStorage.autosavebtc);
            if(save > parseFloat($("#savebtc").val()))
            {
                var win = save - parseFloat($("#savebtc").val()) ;
                $("#savebtc").val(save.toFixed(8));
                localStorage.savebtc = $("#savebtc").val();

                //maybe not the good solution but, you can win more 0.00000001,
                //well you save amount of savebtc each time of you run this .
                $("#winSession").text((parseFloat($("#winSession").text()) + win).toFixed(8));
            }

            //maj info balance
            $("#balancegame").text((parseFloat(table[3]) - parseFloat(localStorage.savebtc)).toFixed(8));
            $("#balancetotal").text(table[3]);

            setTimeout(function(){
                if(parseFloat($("#mise").val()) >= parseFloat($("#balancegame").text()) && parseFloat($("#balancegame").text()) <= 0.00000005 ){
                    $("#mise").val(localStorage.minbet);
                    loop = false;
                }
                // probleme with this two if ... maybe loot of pote ...
                if(parseFloat($("#mise").val()) >= parseFloat($("#balancegame").text()) && parseFloat($("#balancegame").text()) > 0.00000005){
                    $("#mise").val(localStorage.minbet);
                }

                // unlock play one button
                if(loop == false){
                    $("#playloop_btn").css("background-color", "#2BA6CB");
                    $("#playone_btn").prop('disabled', false);
                }

                if(loop) {
                    play();
                }
            }, GetWaintingTime(tempStart));
        }else{
            // Use x11 mutiliplactor ;)
            $("#role").text(parseInt($("#role").text())+1);
            if(table[1] == "w"){
                //you win
                $("#win").text(parseInt($("#win").text())+1);
                $("#seed").val(getNewSeed()); // no more close win for your seed in this mode ...
                //calcule max chaine win, current chaine win.
                $("#cw").text(parseInt($("#cw").text())+1);
                $("#cl").text(0);
            }else{
                //you loose
                $("#loose").text(parseInt($("#loose").text())+1);

                //calcul max chaine loose,  current chaine loose.
                $("#cl").text(parseInt($("#cl").text())+1);
                $("#cw").text(0);
            }

            $("#ratio").text(((parseInt($("#win").text())/parseInt($("#role").text()))*100).toFixed(3));
            $("#balancegame").text((parseFloat(table[3]) - parseFloat(localStorage.savebtc)).toFixed(8));
            $("#balancetotal").text(table[3]);

            var save = (Math.floor((parseFloat(table[3]) - parseFloat(localStorage.btcforplaying)) / parseFloat(localStorage.autosavebtc))) * parseFloat(localStorage.autosavebtc);
            if(save > parseFloat($("#savebtc").val()))
            {
                $("#savebtc").val(save.toFixed(8));
                localStorage.savebtc = $("#savebtc").val();

                // TODO: write i most better function for calcul win session !
                //$("#winSession").text((parseFloat($("#winSession").text()) + parseFloat(localStorage.autosavebtc)).toFixed(8));
            }

            setTimeout(function(){

                if(parseFloat($("#balancegame").text()) <= 0){
                    loop = false;
                }

                if(loop == false){
                    $("#playloop_btn").css("background-color", "#2BA6CB");
                    $("#playone_btn").prop('disabled', false);
                }

                if(loop){
                    play();
                }
            },GetWaintingTime(tempStart));
        }
    });
}

//Script start
$(function(){
    gettoken();
    injectGIU();
    initLocalStorage();
    ValueOnGui();

    //Click Binding
    $("#playone_btn").click(function () {
        loop = false;
        play();
    });

    $("#playloop_btn").click(function () {
        if(loop){
            loop = false;
        }else{
            loop = true;
            play();
        }
    });

    $("#SaveLS_btn").click(function () {
        saveLocalStorage();
    });

    $("#ResetLS_btn").click(function () {
        localStorage.init = 0;
        location.reload();
    });

    $("#SetSavebtc_btn").click(function(){
        if( $("#autosavebtc").val() != localStorage.autosavebtc || $("#btcforplaying").val() != localStorage.btcforplaying ){
            saveLocalStorage();
        }

        if(parseFloat(localStorage.autosavebtc) <= 0 || parseFloat(localStorage.btcforplaying) <= 0){
            alert("Pls don't use value 0");
            return;
        }

        var save = (Math.floor((parseFloat($("#balance").text()) - parseFloat(localStorage.btcforplaying)) / parseFloat(localStorage.autosavebtc))) * parseFloat(localStorage.autosavebtc);
        $("#savebtc").val(save.toFixed(8));
    });

    $("#hitype_btn").click(function(){
        $("#hitype_btn").prop('disabled', true);
        $("#lotype_btn").prop('disabled', false);
        $("#switchtype_btn").prop('disabled', false);
    });

    $("#lotype_btn").click(function(){
        $("#hitype_btn").prop('disabled', false);
        $("#lotype_btn").prop('disabled', true);
        $("#switchtype_btn").prop('disabled', false);
    });

    $("#switchtype_btn").click(function(){
        $("#hitype_btn").prop('disabled', false);
        $("#lotype_btn").prop('disabled', false);
        $("#switchtype_btn").prop('disabled', true);
        alert("not implemented");
    });

    $("#mult2_btn").click(function(){
        $("#mult2_btn").prop('disabled', true);
        $("#mult11_btn").prop('disabled', false);
    });

    $("#mult11_btn").click(function(){
        $("#mult2_btn").prop('disabled', false);
        $("#mult11_btn").prop('disabled', true);
        // maybe not require , but i think you are stupid ;)
        $("#mise").val(localStorage.minbet);
    });

    $("#resetbet_btn").click(function(){
        $("#mise").val(localStorage.minbet);
    });
});
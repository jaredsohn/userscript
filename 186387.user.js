// ==UserScript==
// @name        Castle Age Alchemy
// @namespace   UPDATED CA alchemy
// @description It will perform alchemy!
// @include     https://web3.castleagegame.com/castle_ws/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version     1.09
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @grant       GM_info

// ==/UserScript==
var front = 'https://web3.castleagegame.com/castle_ws/alchemy.php?alchemy_id=';
var ca_panel_ = "#app_body_container";
var display = false;
var currAlchemy = 0;
var textAlchemy = "";
var fullURL=[], alchemyName=[], timesAlchemy = [];
    /*   if want all the recipes to be combined through alchemy
    //   var noAlchemy = [];
    //   if there are some things you don't want combined it should look 
    //   like below (names of the items are copied EXACTLY from the recipe page)
    //   var noAlchemy = ["Limited Time: 5500 Guild Coins + 875 XP","EARTH ORB","MEDIUS"];
    //   NOTE: noAlchemy AFFECTS BOTH manual-alchemy AND auto-alchemy
    */
var noAlchemy = [];


//Create Panel
function get_panel() {
    var ca_panel = $("#ca_gift_panel");
    if(!ca_panel.size()) {
        ca_panel = $("<div id='ca_gift_panel'></div>").css({
            position : 'fixed',
            top      : '25px',
            left     : '5px',
            padding  : '5px',
            border   : 'solid 1px black',
            background : 'white'
        });
        ca_panel.appendTo(ca_panel_);
    }
    return ca_panel;
}

//Remove Panel
function remove_panel() {
    var ca_panel = get_panel();
    if(!ca_panel.children().size())
        ca_panel.remove();
}

//Create inner Panel
function get_sub_panel(id) {
    var ca_sub_panel = $("#" + id);
    if(!ca_sub_panel.size()) {
        ca_sub_panel = $("<div id='"+id+"'>Loading....</div>").css({
            height   : '60px',
            width    : '420px',
            padding  : '5px',
            border   : 'solid 1px black',
            background : 'white'
        });
        get_panel().append(ca_sub_panel);
    }
    return ca_sub_panel;
    
}

//Remove Inner Panel
function remove_sub_panel(id) {
    var ca_sub_panel = get_sub_panel(id);
    ca_sub_panel.remove();
    remove_panel();
}

//finds possible alchemy
function possibleAlchemy(){
    currAlchemy = 0;
    textAlchemy = "";
    fullURL=[]; 
    alchemyName=[]; 
    timesAlchemy = [];
    var formsCollection = document.getElementsByTagName("form");
    for(var i=0;i<formsCollection.length;i++)
        
        if(formsCollection[i].id.contains("doQst_")){
            var aName = formsCollection[i].parentNode.parentNode.parentNode.childNodes[5].childNodes[1].textContent.trim();
            if($.inArray(aName, noAlchemy)<=-1){
                var fE = formsCollection[i];
                var linkURL  = front + fE.elements[0].value + '&action=' + fE.elements[4].value;
                fullURL[fullURL.length] = linkURL;
                alchemyName[alchemyName.length] = aName; 
            }
        }
}

//automated alchemy
function doit(){
    if(currAlchemy>=timesAlchemy.length){
        alert(textAlchemy);
        location.reload(); 
    }else{

        $.post(fullURL[currAlchemy], function(data,status){
            if(/You have created/.test(data)) {
                timesAlchemy[currAlchemy] = timesAlchemy[currAlchemy] + 1; 
                if(display)
                    get_sub_panel('ca_alch').text("You created " + timesAlchemy[currAlchemy] + " " +alchemyName[currAlchemy] + " through alchemy.");
                setTimeout( function() { doit(currAlchemy);}, 3000);
             }else if(/You are missing/.test(data)){
                textAlchemy += "You created " + timesAlchemy[currAlchemy] + " " + alchemyName[currAlchemy] + ".\n";
                setTimeout( function() { currAlchemy++; doit(currAlchemy);}, 3000);  
            }else{
                alert("Error");
            }
        });
    }
}

//for auto alchemy
function auto_do_alch() {
    for(var i = 0; i < fullURL.length; i++)
        timesAlchemy[i] = 0;

    if(display)
        get_sub_panel('ca_alch').text("Starting alchemy process");
  
    doit();  
    
}

//set auto alchemy up
function auto_alchemy() {
    if($('.recipe').length > 0){
        possibleAlchemy();
    
        if(fullURL.length>0){
            var ca_alch = get_sub_panel('ca_alch');
            ca_alch.html("Gathering ingredients");
            display = true;
            auto_do_alch();
        }else {
            alert("Nothing to combine"); 
            location.reload();
        }
    }
    else{
        alert("Taking you to alchemy's page");
        $("#globalContainer").load('alchemy.php?tab=1');
        }
        

}


//for manual
function do_alch(link, num) {
    
    if(num > 0) {
        if(display)
            get_sub_panel('ca_alch').text("Creating " + num + " more " + textAlchemy);
        $.post(link, function(data,status) {
            if(/You have created/.test(data)) {
                setTimeout( function() { num--; do_alch(link, num);}, 3000);
            }else if(/You are missing/.test(data)){
                alert('Not enough ingredients for ' + textAlchemy);
                $("#globalContainer").load('alchemy.php?tab=1');
            }else {
                alert('Error Occured');
                $("#globalContainer").load('alchemy.php?tab=1');
            }
        });
    } else {
        alert('Finished making ' + textAlchemy);
        location.reload(); 
    }

}

//set manual alchemy
function manual_alchemy() {
    if($('.recipe').length > 0){
        possibleAlchemy();
        if(fullURL.length>0){
            var ca_alch = get_sub_panel('ca_alch'),
                selectReci = $("<select></select>"),
                freq    = $("<input type=\"number\" id=\"userFreq\" min=\"1\" max=\"100\" step=\"1\" value=\"1\" size=\"4\" maxlength=\"2\">"),
                buttonSub  = $("<button >Combine!</button>");
                
             $.each(alchemyName, function(idx) {
                selectReci.append("<option value='" + fullURL[idx] + "'>" + alchemyName[idx] + "</option");
                });
            
            buttonSub.click(function() {
                var freqs = parseInt(document.getElementById("userFreq").value);
                if(freqs>0){
                    display = true;
                    textAlchemy = selectReci[0].options[selectReci[0].selectedIndex].innerHTML;
                    do_alch($(":selected", selectReci).attr("value"), freqs);
                    ca_alch.html("After creating " + freqs + " " + textAlchemy +", you will be notified...");
                }
                else alert("Times to combine has to be over 0");
            });
        
            ca_alch.html("Choose the item you want to get through alchemy:<br/>");
            ca_alch.append(selectReci, freq, buttonSub);
        }else {
            alert("Nothing to combine");
            location.reload();
        }

    }
    else{
        alert("Taking you to alchemy page");
        $("#globalContainer").load('alchemy.php?tab=1');
    }

    
    

}

//Updation of script
function checkUpdate( num, currentVersion ) {
    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://userscripts.org/scripts/source/' + num + '.meta.js',
        onload : function( response ) {
            var remoteVersion = response.responseText.match(/^\/\/\s\@version\s+(\d+\.\d+)/m)[1];
            if( currentVersion < remoteVersion ) {
                if( confirm( 'There is a newer version available.' + '\nClick OK to update' ) ) {
                    setTimeout( function() { unsafeWindow.location.href = 'http://userscripts.org/scripts/source/' + num + '.user.js'; }, 3000 );
                }
            }
            else {
                alert('No Updates for Castle Age Alchemy');
            }
    }
    });
}


function update_Check() {
    checkUpdate(186387, GM_info.script.version);
}

//you can // in front of the manual or auto if you will never use it, or you can delete 
GM_registerMenuCommand('CA Manual-Alchemy', manual_alchemy);
GM_registerMenuCommand('CA Auto-Alchemy', auto_alchemy);   
GM_registerMenuCommand('CA Alchemy - Check for update', update_Check );
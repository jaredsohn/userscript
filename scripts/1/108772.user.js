// ==UserScript==
// @name           Mercenary Medal
// @author         wolf66
// @namespace      http://www.erepublik.com/en/citizen/profile/2112864
// @description    Mercenary Medal - Status
// @version        1.4
// @include        http://www.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=108772&days=1&show
// Original script by Nimesin.
// ==/UserScript==

//=== License and Disclaimer =================================+
// Software is provided 'as is' and without any warranty.     |
// Use on your own responsibility.                            |
//============================================================+

//==== Changelog =============================================+
// v1.1:                                                      |
// - Added ToDo countries                                     |
// - Added Userscript Update Checker by sizzlemctwizzle       |
// - Fixed bug causing that script doesn't work without       |
//   eRepublik Advanced installed                             |
//------------------------------------------------------------+
// v1.2:                                                      |
// - 'To Do' as opt-in                                        |
// - Countries are sorted (to completed and partially         |
//   completed)                                               |
//------------------------------------------------------------+
// v1.3:                                                      |
// - Display number of kills on battlefield                   |
// - Display number of kills in Military Campaigns (frontpage |
//   and dedicated page)                                      |
//------------------------------------------------------------+
// v1.4:                                                      |
// - Changed sidebar design                                   |
// - Added aditional opt-outs (battlefield counter,           |
//   battlelist counter, completed, active)                   |
//============================================================+

var sideBoxes = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAABXCAYAAAAXvud+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAT1JREFUeNrs1j1qxDAQgFH5hxQG43bPllOETZV+Id12gZwg1/ER3G4hF8bEnVfRniCNRSC8BwOqh49B1TiOTyGE9zzPeU4BjnHL85Xnra2q6jIMw7nrutA0jdVwiH3fT9u2nZdlCdU0Td9933fWQgnrum5VjDHla2YbFJFSCm1d1zZBMY8D1rpilCYyRIbI4PfIfPxxyRAZiAyR4eMPLhkiA5EhMv4Bv35cMlwyEBkiQ2QgMkQGIkNkiAxEhsgQGYgMkYHIEBkiA5EhMkQGIkNkIDJEhshAZIgMkYHIEBmIDJEhMhAZIkNkIDJEBiJDZIgMRIbIEBmIDJGByBAZIgORITJEBiJDZCAyRIbIQGSIDJGByBAZiIw/iSxZAwWl+n6/f9gDpeS+PusY42t+X/PcrIQDPXq6zvP88iPAAOC0Mc6dlDXaAAAAAElFTkSuQmCC';
var sideBack = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAGCAYAAADkOT91AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M0BrLToAAAAB5JREFUCFtjeP369X8QBgEQzQATgGFMAZhS3CrQBQANsFp5WDNrnwAAAABJRU5ErkJggg==';
var iDone = 'data:image/png;base64,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';

GM_setValue = function(name, value){
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
};

GM_getValue = function(name, defaultValue){
    var value = localStorage.getItem(name);
    if (!value) return defaultValue;
    var type = value[0];
    value = value.substring(1);
    switch (type){
        case 'b': 
            return value == 'true';
        case 'n': 
            return Number(value);
        default: 
            return value;
    }
};

function addStyle(css){
    var style = document.createElement('style');
    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);
}

var KillsDone = {};
var eToDo = GM_getValue("ToDo", true);
var inner = '';
var completed = 0;
var country = '';
var noKills = 0;

if (document.location.toString().indexOf( "/battlefield/") >= 0){
    country = $(".left_side h3:first").text();
    country = country.replace(/Resistance Force Of /, '');
    country = country.replace(/and /, '');
    country = country.replace(/ /gi, '-');
    country = country.replace(/\(/, '');
    country = country.replace(/\)/, '');
}

var url = 'http://www.erepublik.com' + $('.user_info a').attr('href');
$.get(url, function(data){
    data = $(data);
    var options = GM_getValue("opts", false);
    if (!options){options={};options["active"]=true;options["todo"]=true;options["completed"]=true;options["bfc"]=true;options["blc"]=true;var optionsTemp=JSON.stringify(options);GM_setValue("opts", optionsTemp);}
    else options = JSON.parse(options); 
	
    var notDoneI = '';
    var doneI = '';
    var toDoI = '';
    var notDoneN = 0; 
	
    $(data).find('.country_list li').each(function(ind){
        var kills = 0;
        var str = $(this).html();
        var str2 = str;
        var ctr = str2.match(/S\/(.*?)\.png/)[1].toLowerCase();
        kills = str2.match(/([0-9]{1,2})\/25/)[1];
        KillsDone[ctr] = kills;
        if (str.indexOf( ">0\/25") < 0){
            str = str.replace(/\<small\>([A-Z]{2})\<\/small\>/gi, "");
            str = str.replace(/\<em\>/gi, "").replace(/\<\/em\>/gi, ""); // Is not done
            if (str.indexOf("25/25") < 0){
                 notDoneI += '<div class="itemCountHolder">' + str + '</div>';
                 notDoneN++;
            }
            else {
                 completed++;
                 str = str.replace(/25\/25/, "");
                 doneI += str;
            }
        }
        else {
            str = str.replace(/\<small\>([A-Z]{2})\<\/small\>/gi, "");
            str = str.replace(/0\/25/, "");
            str = str.replace(/\<em\>/gi, "").replace(/\<\/em\>/gi, "");
            toDoI += str;
        }
        // Is active country
        if (str2.match(country)){
            noKills = str2.match(/([0-9]{1,2})\/25/)[0];
            if (noKills == "25/25") noKills = "Done";
        }
    });
	
    notDone = '<div style="text-align: center; display: block; float: left; color: #b4b4b4; width: 100%; margin-bottom: 3px;">Active (' + notDoneN +')</div><div id="miniInventory1" class="MercenaryMedalHolder">' + notDoneI + '</div>';
    done = '<div style="text-align: center; display: block; float: left; color: #b4b4b4; width: 100%; margin-bottom: 3px;">Completed (' + completed + '/50 - ' + (completed * 100 / 50) + '%)</div><div id="miniInventory1" class="MercenaryMedalHolder"><div class="itemCountHolder">' + doneI + '</div></div>';
    toDo = '<div style="text-align: center; display: block; float: left; color: #b4b4b4; width: 100%; margin-bottom: 3px;">To do</div><div id="miniInventory1" class="MercenaryMedalHolder"><div class="itemCountHolder">' + toDoI + '</div></div>';
	
    if (options["completed"]) inner += done;
    if (options["active"]) inner += notDone;
    if (options["todo"]) inner += toDo;
	
    insert(completed, inner, noKills); 
	
    if (options["blc"]){
        $('#battle_listing li[id*="battle-"]:not([class*="victory"])').each(function(){
            battles = $(this).html();
            country1 = battles.match(/M\/(.*?).png/gi)[0].replace("M/", "").replace(".png", "");
            country2 = battles.match(/M\/(.*?).png/gi)[1].replace("M/", "").replace(".png", "");
            link = battles.match(/(battlefield|show)\/([0-9]{4,5})/)[0];
            if (KillsDone[country1.toLowerCase()] < 25)$('#battle_listing a[href*="' + link + '"]').before( '<span id="' + country1 + '" class="killsCounter left">' + KillsDone[country1.toLowerCase()] + '</span>');
            else $('#battle_listing a[href*="' + link + '"]').before( '<img id="' + country1 + '" class="done left" src="' + iDone + '">');
            if (KillsDone[country2.toLowerCase()] < 25)$('#battle_listing a[href*="' + link + '"]').before( '<span id="' + country2 + '" class="killsCounter right">' + KillsDone[country2.toLowerCase()] + '</span>');
            else $('#battle_listing a[href*="' + link + '"]').before( '<img id="' + country2 + '" class="done right" src="' + iDone + '">');
        });
    }
});

function insert(total, inner, noKills){
    
	function checkOpts(){
        function checked(opt){
            $("#opt-" + opt).attr("checked", "");
        }
        
		var options = GM_getValue("opts", false);
        options = JSON.parse(options);
		
        if (options["active"]) checked("active");
        if (options["todo"]) checked("todo");
        if (options["completed"]) checked("completed");
        if (options["bfc"]) checked("bfc");
        if (options["blc"]) checked("blc");
    }
	
    addStyle('.MedalBoxHolder { background-image: url(' + sideBack +'); background-repeat: repeat; border: 2px solid #EBEBEB; border-radius: 5px 5px 5px 5px; float: left; margin-right: 18px; padding: 11px 11px 8px; width: 149px; margin-top: 10px; clear: left;}' +'.MedalBoxHolder .inventoryContent { border-radius: 5px 5px 5px 5px; background: url(' + sideBack +') repeat scroll 0 0 transparent; padding: 10px; width: 149px; }' +'.MedalBoxHolder .inventoryMain .inventoryInner { font-size: 12px; padding: 0px 0px 3px 3px; }' +'.MercenaryMedalHolder { background: url(' + sideBoxes +') no-repeat scroll 0 0 #FFFFFF; float: left; margin-bottom: 7px; width: 153px; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; height: auto !important; padding-top: 5px; }' +'.MercenaryMedalHolder .itemCountHolder { clear: both; float: left; line-height: 18px; margin-left: 6px; width: 142px; border-bottom: 1px solid #DEDEDE; }' +'.MercenaryMedalHolder .itemCountHolder img { float: left; width: 16px; height: 16px; margin-left: 1px; margin-right: 6px; }' +'.MercenaryMedalHolder .itemCountHolder .itemCount { text-align: center; color: grey; line-height: 30px; }' +'.completed { width: 60px; border: 1px solid #777; border-radius: 5px; padding: 3px; background-color: #333; font-size:16px; text-align:center; color: #fff; font-weight:bold; }' +'.done { float:right; position:absolute; left: -2px; }' +'.killsCounter { float:right; position:absolute; color:white; font-weight:bold;font-size:11px; border: 1px solid #777; width: 15px; border-radius: 5px; padding: 1px; background-color: #333; text-align:center; color: #fff; font-weight:bold;}' + 'span.left { left:4px; top:22px; }' + 'span.right { left:50px; top:17px; } img.left { left:2px; top:7px; } img.right { left:48px; top:7px; }');
	
    var div = '<div class="MedalBoxHolder">' + inner + '<div class="optionsHolder"><div style="text-align: center; display: block; float: left; color: #b4b4b4; width: 100%; margin-bottom: 3px;cursor:pointer" id="opts">Options</div><div class="MercenaryMedalHolder"><div style="display:none" id="optionsList" class="itemCountHolder"><input type="checkbox" id="opt-completed"> Enable \'Completed\' box<br><input type="checkbox" id="opt-active"> Enable \'Active\' box<br><input type="checkbox" id="opt-todo"> Enable \'To Do\' box<br><input type="checkbox" id="opt-bfc"> Enable battlefield counter<br><input type="checkbox" id="opt-blc"> Enable battles list counter</div></div></div></div>';
	
    $('#content').css("float", "right");
    $('#content').after(div);
	
    $('#opts').click(function(){
        $('#optionsList').slideToggle();
    });
	
    checkOpts();
	
    $("input[id*='opt-']").click(function(){
        var opt = ($(this).attr("id")).replace("opt-", "");
        var val = Boolean($(this).attr("checked"));
        var options = GM_getValue("opts", false);
        options = JSON.parse(options);
        options[opt] = val;
        var optionsTemp = JSON.stringify(options);
        GM_setValue("opts", optionsTemp);
    }); 
	
    var options = GM_getValue("opts", false);
    options = JSON.parse(options);
	
    if (options["bfc"]){
        $('.domination').before( '<div id="completed" class="completed" style="float:left; position:absolute;top:140px;left:345px;opacity:0.7;">' + noKills + '</div>');
        $('#enemy_defeated a#add_damage_btn').live('mouseup', function(){
            noKills = $("#completed").text();
            if (noKills.match(/([0-9]{1,2})\/25/)){
                 noKills = noKills.match(/([0-9]{1,2})\/25/)[1];
                 noKills = parseInt(noKills) + 1;
            }
            else noKills = "Done";
            if (noKills < 25){
                 $("#completed").html(noKills + "/25");
            }
            else $("#completed").html("Done");
        });
    }
}

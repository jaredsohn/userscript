// ==UserScript==
// @id             lk_n_hance
// @name           Lords & Knights n-Hance
// @version        1.0.1
// @namespace      lk_
// @author         captan2
// @description    Powerful Addon for many useful functionalities for Lords and Knights Browsergame
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://browser.lordsandknights.com/index.php*
// @updateURL      http://dl.dropbox.com/u/64388241/lkaddon.user.js
// @downloadURL	   http://dl.dropbox.com/u/64388241/lkaddon.user.js
// @run-at         document-end
// ==/UserScript==

// definition of functions, that do not need any lords and knights functions
unsafeWindow.do_add_target = function (id, tile, mapx, mapy) {

    if (localStorage.lk_targets.indexOf(id) == -1) {

        if (localStorage.lk_targets == "") {
            localStorage.lk_targets = id + "-" + tile + "-" + mapx + "-" + mapy;
        } else {
            localStorage.lk_targets += "," + id + "-" + tile + "-" + mapx + "-" + mapy;
        }

        var tab_content = '<tr><td>new</td><td>' + id + '</td><td><img width="64" height="32" src="http://browser.lordsandknights.com/pictures/Map/Castle0-N-0.png" border="0"></td><td>' + tile + '</td><td>' + mapx + '</td><td>' + mapy + '</td><td><img src="http://c.dryicons.com/images/icon_sets/artistica_icons_set/png/24x24/edit.png" border="0"> - <a href="#" onClick="javascript: del_target(\'' + id + '-' + tile + '-' + mapx + '-' + mapy + '\')"><img src="http://b.dryicons.com/images/icon_sets/symbolize_icons_set/png/128x128/trash.png" height="24" width="24"></a></td></tr>';
        $("#target_tab").append(tab_content);
        $("#settings").scrollTop($("#settings")[0].scrollHeight);
    } else {

        alert("target already exists in list");

    }
}

unsafeWindow.del_target = function (str) {

    if (localStorage.lk_targets.indexOf(str) == 0) {
        localStorage.lk_targets = localStorage.lk_targets.replace(str, "");
    } else {
        localStorage.lk_targets = localStorage.lk_targets.replace("," + str, "");
    }
    $("#" + str.split("-")[0]).fadeOut("slow")
}

unsafeWindow.reset_list = function () {

var del_check = $("#del_check").is(':checked');
console.log(del_check);

if(del_check == "[LKAddon] true"){

localStorage.lk_targets = "";
list_targets();
alert("list resetted");

} else{

alert("Check box before resetting list!");

}
}

unsafeWindow.chg_settings = function () {

    if (document.getElementById('button_settings').value == 'close Settings') {
        document.getElementById('button_settings').value = 'open Settings'
        $("#settings").fadeOut("slow");
    } else {
        document.getElementById('button_settings').value = 'close Settings'
        $("#settings").fadeIn("slow");
    }


}
unsafeWindow.show_farmsettings = function () {

    var farmsettings = '<div id="farmsettings" style="width: 90%; height: 90%; background-color:#bba474; overflow: auto;"><h1 align="center">Farm-Settings</h1><br><br>Off: <img height="80" src="http://lordsandknights.com/wp-content/uploads/2011/05/Archer@2x1.png" border="0">___<input type="text" size="3" name="archer" value="' + localStorage.lk_fs_archer + '"><img height="80" src="http://lordsandknights.com/wp-content/uploads/2011/05/Swordman@2x.png" border="0">___<input type="text" size="3" name="swordsman" value="' + localStorage.lk_fs_swordsman + '"><img height="80" src="http://lordsandknights.com/wp-content/uploads/2011/05/Lancer@2x.png" border="0">___<input type="text" size="3" name="lancer" value="' + localStorage.lk_fs_lancer + '"></p><p>Def: <img height="80" src="http://lordsandknights.com/wp-content/uploads/2011/04/Spearman@2x.png" border="0">___<input type="text" size="3" name="spearman" value="' + localStorage.lk_fs_spearman + '"><img height="80" src="http://lordsandknights.com/wp-content/uploads/2011/05/Crossbowman@2x.png" border="0">___<input type="text" size="3" name="crossbowman" value="' + localStorage.lk_fs_crossbowman + '"><img height="80" src="http://lordsandknights.de/wp-content/uploads/2011/05/Scorpion-Rider@2x.png" border="0">___<input type="text" size="3" name="scorpion_rider" value="' + localStorage.lk_fs_scorpion_rider + '"></p><p>Transport: <img height="80" src="http://lordsandknights.com/wp-content/uploads/2011/05/Pushcart@2x1.png" border="0">___<input type="text" size="3" name="pushcart" value="' + localStorage.lk_fs_pushcart + '"><img height="80" src="http://lordsandknights.com/wp-content/uploads/2011/05/Oxcart@2x.png" border="0">___<input type="text" size="3" name="oxcart" value="' + localStorage.lk_fs_oxcart + '"></p><br><br><input type="submit" value="save" onClick="javascript: save_farmsettings(); $(\'#farmsettings\').fadeOut(1800)"> <input type="submit" value="close" onClick="javascript: $(\'#farmsettings\').fadeOut(900)"></div>';
    $("#settings").append(farmsettings);

}

unsafeWindow.list_targets = function () {

    var tab_start = '<h1 align="center">Target List</h1><br><input type="checkbox" id="del_check"> - <input type="submit" value="reset list" OnClick="javascript: reset_list();"><br><table id="target_tab" border="1" bordercolor="#000000" style="background-color:#FFFF99" width="70%" cellpadding="3" cellspacing="1"><col width="5%"><col width="10%"><col width="10%"><col width="5%"><col width="10%"><col width="10%"><col width="20%"><tr><td>#</td><td>ID</td><td>img</td><td>Tile</td><td>mapX</td><td>mapY</td><td>Options</td></tr>';

    $("#settings").append(tab_start);

    for (var x = 0; x < localStorage.lk_targets.split(",").length; x++) {

        var data = localStorage.lk_targets.split(",")[x].split("-");
        var id = data[0];
        var tile = data[1];
        var mapx = data[2];
        var mapy = data[3];
        var tab_content = '<tr id="' + id + '"><td>' + x + '</td><td>' + id + '</td><td><img width="64" height="32" src="http://browser.lordsandknights.com/pictures/Map/Castle0-N-0.png" border="0"></td><td>' + tile + '</td><td>' + mapx + '</td><td>' + mapy + '</td><td><img src="http://c.dryicons.com/images/icon_sets/artistica_icons_set/png/24x24/edit.png" border="0"> - <a href="#" onClick="javascript: del_target(\'' + id + '-' + tile + '-' + mapx + '-' + mapy + '\')"><img src="http://b.dryicons.com/images/icon_sets/symbolize_icons_set/png/128x128/trash.png" height="24" width="24"></a></td></tr>';
        $("#target_tab").append(tab_content);
    }
}

unsafeWindow.save_farmsettings = function () {

    localStorage.lk_fs_archer = $('input[name=archer]').val()
    localStorage.lk_fs_swordsman = $('input[name=swordsman]').val()
    localStorage.lk_fs_lancer = $('input[name=lancer]').val()

    localStorage.lk_fs_spearman = $('input[name=spearman]').val()
    localStorage.lk_fs_crossbowman = $('input[name=crossbowman]').val()
    localStorage.lk_fs_scorpion_rider = $('input[name=scorpion_rider]').val()

    localStorage.lk_fs_pushcart = $('input[name=pushcart]').val()
    localStorage.lk_fs_oxcart = $('input[name=oxcart]').val()

}

unsafeWindow.reset_settings = function () {
    //var settings_body = '<h1 align="center">Settings</h1><br><br><br><br><br><p><input type="submit" value="farmsettings" OnClick="javascript: reset_settings();show_farmsettings()"> - <input type="submit" value="list targets" onClick="javascript: reset_settings();list_targets()"></p>';
    document.getElementById('settings').innerHTML = settings_body;

}

// mPlayer.habitate[113699].habitatMissions[0].mission.primaryKey - laufende Missionen

unsafeWindow.start = function () {

    //localStorage.lk_targets = new Array("110218-23-16670-16205", "109070-17-16670-16205", "107928-17-16670-16205", "106794-22-16670-16205", "106792-17-16670-16205", "105664-22-16670-16205", "104540-17-16670-16205", "103424-21-16670-16205", "102312-21-16670-16205", "101206-21-16670-16205", "102310-16-16670-16205", "103422-16-16670-16205", "105662-17-16670-16205", "104538-17-16670-16205", "103420-16-16670-16205", "102308-16-16670-16205", "101204-16-16670-16205", "100108-21-16670-16205", "100104-16-16670-16205", "101202-16-16670-16205", "99010-16-16670-16205", "100102-16-16670-16205", "101200-11-16670-16205", "102306-11-16670-16205", "103416-11-16670-16205", "104532-11-16670-16205", "103414-11-16670-16205", "104534-11-16670-16205", "105656-11-16670-16205", "106784-11-16670-16205", "106782-6-16670-16205", "107916-6-16670-16205", "107918-6-16670-16205", "106780-6-16670-16205", "107914-6-16670-16205", "109056-6-16670-16205", "110204-6-16670-16205", "109058-6-16670-16205", "111356-6-16670-16205", "111358-7-16670-16205", "110206-7-16670-16205", "107920-7-16670-16205", "109061-7-16670-16205", "106786-12-16670-16205", "111360-7-16670-16205", "110208-7-16670-16205", "109062-12-16670-16205", "105658-12-16670-16205", "107924-12-16670-16205", "106790-17-16670-16205", "107926-17-16670-16205", "110216-18-16670-16205", "110214-18-16670-16205", "109066-12-16670-16205", "110212-13-16670-16205", "109064-12-16670-16205", "111368-18-16670-16205", "111366-13-16670-16205", "111364-13-16670-16205", "110210-13-16670-16205", "111362-8-16670-16205", "112520-8-16670-16205", "113684-8-16670-16205", "114854-8-16670-16205", "116032-8-16670-16205", "113686-8-16670-16205", "112522-8-16670-16205", "113688-8-16670-16205", "114860-8-16670-16205", "116038-13-16670-16205", "113690-13-16670-16205", "112524-13-16670-16205", "112526-13-16670-16205", "114862-13-16670-16205", "116040-14-16670-16205", "113692-13-16670-16205", "114864-18-16670-16205", "116042-19-16670-16205", "117224-14-16670-16205", "117226-19-16670-16205", "116044-19-16670-16205", "117228-19-16670-16205", "114866-18-16670-16205", "113694-18-16670-16205", "117230-24-16670-16205", "116046-23-16670-16205", "114868-23-16670-16205", "113696-18-16670-16205", "112530-18-16670-16205", "111370-18-16670-16205", "112528-18-16670-16205", "96842-15-16670-16205", "111354-1-16670-16205", "112512-1-16670-16205", "113678-1-16670-16205", "112514-1-16670-16205", "114850-2-16670-16205", "116028-2-16670-16205", "114852-2-16670-16205", "117212-3-16670-16205", "116030-3-16670-16205", "104536-12-16670-16205", "118420-24-16670-16205", "119616-24-16670-16205", "119614-24-16670-16205", "118418-19-16670-16205", "120816-24-16670-16205", "122024-24-16670-16205", "122022-19-16670-16205", "120814-19-16670-16205", "120818-24-16670-16205", "122026-24-16670-16205", "result-00");
    var button_bar = '<div id="buttons" style="position: fixed; top: 10%; left:2%; width: 50%; height: 3%; background-color:#bba474;"><input id="button_settings" type="submit" value="open Settings" onClick="javascript: chg_settings()"> - <input type="submit" value="reset content" OnClick="javascript: reset_settings()"><input type="submit" value="add target" OnClick="javascript: add_target()"><input type="submit" value="perform standard farm" onClick="javascript: standard_farm()"><input type="submit" value="execute farmbot" onClick""><input type="submit" value="plan attack" OnClick="javascript: reset_settings();plan_attack();"></div>';
    var settings_div = '<div id="settings" style="position: fixed; top: 10%; left:50%; width: 49%; height: 70%; background-color:#bba474; overflow: auto;">' + settings_body + '</div>';

    $("#gameContainer").append(button_bar)
    $("#gameContainer").append(settings_div)

    $("#settings").fadeOut(1);
    $("#addonstart").fadeOut(1);
}

//======================================

var settings_body = '<h1 align="center">Settings</h1><br><p><input type="submit" value="farmsettings" OnClick="javascript: reset_settings();show_farmsettings()"> - <input type="submit" value="list targets" onClick="javascript: reset_settings();list_targets()"> - <input type="submit" value="list habitats" onClick="javascript: reset_settings();list_habitate()"></p>';
var a = '<div id="addonstart" style="position: fixed; top: 0px; left:0px; width: 24px; height: 24px;"><img onClick="javascript: start()" id="ok" src="http://cdn1.iconfinder.com/data/icons/icojoy/noshadow/standart/gif/24x24/001_06.gif" border="0"></div>';

$("#gameContainer").append(a)


// add functions that need lords and knights functions to <head>


// standard farm
var script = document.createElement('script');
script.innerHTML = '\
function standard_farm(){ \
c = { data: { id: 7, click: null } }; \
foreignHabitatViewHandler(c); \
setTimeout(function () { \
$("#unitInput0").attr("value", localStorage.lk_fs_spearman ); \
$("#unitInput1").attr("value", localStorage.lk_fs_swordsman ); \
$("#unitInput2").attr("value", localStorage.lk_fs_archer ); \
$("#unitInput3").attr("value", localStorage.lk_fs_crossbowman ); \
$("#unitInput4").attr("value", localStorage.lk_fs_scorpion_rider ); \
$("#unitInput5").attr("value", localStorage.lk_fs_lancer ); \
$("#unitInput6").attr("value", localStorage.lk_fs_pushcart ); \
$("#unitInput7").attr("value", localStorage.lk_fs_oxcart ); \
capacityMax = 1; \
$("#attackButton").click(); \
}, 250); \
}';
document.getElementsByTagName('head')[0].appendChild(script);

// add target
var script2 = document.createElement('script');
script2.innerHTML = '\
function add_target(){ \
$("#mapCloseButtonContainer").click(); \
var id = $(".habitatHeadlineName")[0].innerHTML.split(" ")[2]; \
var tile = Maphab.get_tile_id(); \
var mapx = Math.round(Mapcenter.get_x()); \
var mapy = Math.round(Mapcenter.get_y()); \
if($(".habitatHeadlineName")[0].innerHTML.split(" ")[0] == "Free" || $(".habitatHeadlineName")[0].innerHTML.split(" ")[0] == "Freie"){ \
do_add_target(id,tile,mapx,mapy); \
} \
else{ \
alert("no free castle"); \
} \
}';
document.getElementsByTagName('head')[0].appendChild(script2);

// list habitats
var script3 = document.createElement('script');
script3.innerHTML = '\
function list_habitate() { \
    var key; \
    var str = ""; \
    localStorage.lk_habitate = ""; \
    for (key in mPlayer.habitate) { \
        if (mPlayer.habitate.hasOwnProperty(key)){ \
              localStorage.lk_habitate += str + mPlayer.habitate[key].id; \
              str = "," \
        } \
    } \
    var tab_start = \'<h1 align="center">Habitat List</h1><br><table id="habitat_tab" border="1" bordercolor="#000000" style="background-color:#FFFF99" width="70%" cellpadding="3" cellspacing="1"><col width="5%"><col width="10%"><col width="10%"><col width="10%"><col width="10%"><col width="20%"><tr><td>#</td><td>ID</td><td>img</td><td>mapX</td><td>mapY</td><td>Options</td></tr>\'; \
    $("#settings").append(tab_start); \
    for (var x = 0; x < localStorage.lk_habitate.split(",").length; x++) { \
        var id = localStorage.lk_habitate.split(",")[x]; \
        var mapx = mPlayer.habitate[id].mapX; \
        var mapy = mPlayer.habitate[id].mapX; \
        var tab_content = \'<tr id="\' + id + \'"><td>\' + x + \'</td><td>\' + id + \'</td><td><img width="64" height="32" src="http://browser.lordsandknights.com/pictures/Map/Castle1-P-1.png" border="0"></td><td>\' + mapx + \'</td><td>\' + mapy + \'</td><td><img src="http://c.dryicons.com/images/icon_sets/artistica_icons_set/png/24x24/edit.png" border="0"> - <a href="#" onClick="javascript: alert(5)"><img src="http://b.dryicons.com/images/icon_sets/symbolize_icons_set/png/128x128/trash.png" height="24" width="24"></a></td></tr>\'; \
        $("#habitat_tab").append(tab_content); \
    } \
}';
document.getElementsByTagName('head')[0].appendChild(script3);

// plan attack
var script4 = document.createElement('script');
script4.innerHTML = ' \
function plan_attack() { \
var player = $(".playerContainer")[0].innerHTML.split("<div>")[1].split("</div>")[0]; \
if (player == "Free knight" || player == "Freier Ritter"){ \
alert("feature currently not available for free castles"); \
} \
else{ \
    $(".buttonLabel")[0].click(); \
    var key; \
    var size = 0; \
    setTimeout(function () { \
    for (key in mProfileView.player.habitate) { \
        if (mProfileView.player.habitate.hasOwnProperty(key)) { \
            size++; \
        } \
    } \
    if(size == 1){ \
       \
    } else{ \
    alert(5); \
    } \
    }, 500); \
} \
}';
document.getElementsByTagName('head')[0].appendChild(script4);
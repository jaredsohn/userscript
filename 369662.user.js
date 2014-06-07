// ==UserScript==
// @name                    NavigatorCraft Utils
// @namespace               http://navigatorcraft.net/
// @description             Add Utils for NavigatorCraft (Cookie Eater based on http://userscripts.org/scripts/show/184479)
// @version                 1.0.7
// @author                  Carsso
// @include                 http://navigatorcraft.net/*
// @include                 http://navigatorcraft.net/batiment/*
// @license                 Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// @license                 http://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr
// @updateURL               https://userscripts.org/scripts/source/369662.meta.js
// ==/UserScript==


// ################################################################################
//  Auto Cookie eater
// ################################################################################

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var test_if_explo = document.querySelector('p#timer_explo');
if (test_if_explo) {
    var cookie = document.getElementById('ico_displayClic');
    if (cookie != null) cookie.click();

    var zDiv = document.createElement('div');
    zDiv.setAttribute('id', 'cookieEater');
    zDiv.innerHTML = 'AutoCookie actif...';
    document.querySelector('.txt_ressources').appendChild(zDiv);

    var rand_miliseconds = randomIntFromInterval(60000, 300000);
    var start = new Date().getTime() + rand_miliseconds;
    //dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()

    setInterval(function () {
        var diff = start - new Date().getTime();
        var diff_secs = diff / 1000;
        var diff_minutes = Math.floor(diff_secs / 60);
        var diff_addsecs = diff_secs % 60;
        var display_text = parseInt(diff_addsecs) + ' seconde(s) avant actualisation.';
        if (diff_minutes > 0) {
            display_text = parseInt(diff_minutes) + ' minute(s) et ' + display_text
        }
        document.getElementById('cookieEater').innerHTML = display_text;
    }, 1000);


    setTimeout(function () {
        //Don't reload, (renvoi de formulaire)
        window.location.href = window.location.href;
    }, rand_miliseconds);
}


// ################################################################################
//  Armory kits
// ################################################################################

var test_if_armurerie = document.querySelector('.t_armurerie')
if (test_if_armurerie) {
    var kits = {};
    kits["Armure en cuir"] = [8, 9, 10, 11];
    kits["Armure en fer"] = [12, 13, 14, 15];
    kits["Armure en or"] = [16, 17, 18, 19];
    kits["Armure en diamant"] = [20, 21, 22, 23];
    var armors = '';
    for (var kit in kits) {
        var craft_item = '';
        for (var kit_item in kits[kit]) {
            craft_item = craft_item + 'craftItem(' + kits[kit][kit_item] + ');';
        }
        var armor_row = '<tr><td colspan="5">' + kit + '</td><td><input type="submit" value="Craft" onclick="if(confirm(\'Êtes vous sûr de vouloir acheter ce kit ?\')){' + craft_item + '}"></td></tr>';
        armors = armors + armor_row;
    }
    $('#tabs-armures .t_armurerie').prepend('<tr><tr><th></th><th colspan="4">Kits</th><th class="th_craft"></th></tr></tr>' + armors);
}

// ################################################################################
//  Script version in footer
// ################################################################################

var footer_text = document.querySelector('#footer p');
var content = document.createTextNode(" - NavigatorCraft Utils v1.0.7");
footer_text.appendChild(content);
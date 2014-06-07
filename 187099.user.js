// ==UserScript==
// @name        Castle Age Stat Box
// @namespace   CA Stats
// @description A box with your current stats, updates every click.
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include     https://web3.castleagegame.com/castle_ws/*
// @exclude     https://web3.castleagegame.com/castle_ws/connect_login.php
// @version     1.03
// ==/UserScript==

var Energy, Stamina, Health, Gold, Xp;
var globalContainer = document.querySelector('#globalContainer');

$(globalContainer).ready(function() {
    process_box();
});


globalContainer.addEventListener('click', function(event) {

    Energy = $("#energy_current_value")[0].textContent;
    Stamina = $("#stamina_current_value")[0].textContent;
    Health = $("#health_current_value")[0].textContent;      
    Goldx = $('#headerPersistGoldRefill > div > div:nth-child(2) > div > div:nth-child(2)')[0].textContent;
    Gold = Goldx.substring(38,Goldx.indexOf(" gold"));
    Xp = document.getElementById("header_player_xp_needed").childNodes[1].textContent;
    Levels = $("#main_sts_container")[0].innerHTML;
    Level = Levels.substring(Levels.indexOf('#ffffff">Level:')+16,Levels.indexOf('</div></a>                			</div>'));
    $("#ener")[0].innerHTML = Energy;
    $("#hp")[0].innerHTML = Health;
    $("#stam")[0].innerHTML = Stamina;
    $("#gold")[0].innerHTML = Gold;
    $("#xp")[0].innerHTML = Xp;  
    $("#lvl")[0].innerHTML = Level;

}, true);


function process_box(){

    var navbar = document.getElementById('globalContainer');
    var box = document.createElement("div");

    Energy = $("#energy_current_value")[0].textContent;
    Stamina = $("#stamina_current_value")[0].textContent;
    Health = $("#health_current_value")[0].textContent; 
    Goldx = $('#headerPersistGoldRefill > div > div:nth-child(2) > div > div:nth-child(2)')[0].textContent;
    Gold = Goldx.substring(38,Goldx.indexOf(" gold"));
    Xp = document.getElementById("header_player_xp_needed").childNodes[1].textContent;
    Levels = $("#main_sts_container")[0].innerHTML;
    Level = Levels.substring(Levels.indexOf('#ffffff">Level:')+16,Levels.indexOf('</div></a>                			</div>'));

    box.innerHTML = '<div id="myBoxOfStats" style="position:fixed;top:40%;left:50px; float: left; font-family: Verdana; text-align:left;'+
        'font-size: 0.2em !important; font-variant:small-caps; background-color: grey; border:0.2em solid black; ' +
        'color: black;" >' +
        '<table border="0" bordercolor="" width="0" bgcolor="">' +
        '<tr>' + '<td>' +
        'Level: ' + '</td>' + '<td id="lvl">' +
        Level + '</td>' + '</tr>' +
        '<tr>'+ '<td>' +
        'Health: ' + '</td>' + '<td id="hp">' +
        Health + '</td>' + '</tr>' +
        '<tr>'+ '<td>' +
        'Energy: ' + '</td>' + '<td id="ener">' +
        Energy + '</td>' + '</tr>' +
        '<tr>'+ '<td>' +
        'Stamina: ' + '</td>' + '<td id="stam">' +
        Stamina + '</td>' + '</tr>' +
        '<tr>'+ '<td>' +
        'Gold: ' + '</td>' + '<td id="gold">' +
        Gold + '</td>' +'</tr>'+
        '<tr>'+ '<td>' +
        'XP Needed: ' + '</td>' + '<td id="xp">' +
        Xp + '</td>' +'</tr>'+
        '</table>' +
        '</div>';
    
    navbar.parentNode.insertBefore(box, navbar);
}

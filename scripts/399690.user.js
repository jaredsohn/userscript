// ==UserScript==
// @name           سكربت النهب من تقارير الكشافة
// @namespace      حرب القبائل
// @version        3.0
// @author         Virza [Edited By Aywac]
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

if(document.URL.match(/screen=report/)){
    var res = $("#attack_spy").find("tr:eq(0)").find("td:eq(0)").text().split(" ");
    var wood = res[1].split(".");
    var stone = res[3].split(".");
    var iron = res[5].split(".");
    var resTotal = parseInt(wood[0]+wood[1]) + parseInt(stone[0]+stone[1]) + parseInt(iron[0]+iron[1]);
    var amount = [25,15,10,80,50];
    var unit = prompt("أدخل رقم الوحدة للنهب :\r\r1 - رمح\r2 - سيف\r3 - فأس\r4 - خفيف\r5 - ثقيل","1");
    for(i=0; i<5; i++){
        if(unit == i+1){
            UN = resTotal/amount[i];
            U = i+1;
        }
    }
    localStorage.setItem("legers",UN+" - "+U);
    var coords = $("#attack_info_def").find("tr:eq(1)").find("td:eq(1)").text().match(/\d+\|\d+/)[0].split("|");
    localStorage.setItem("coords",coords);
    window.open("/game.php?village="+game_data.village.id+"&screen=place","_self");
}else if(document.URL.match(/screen=place/)){
    UN = parseInt(localStorage.getItem("legers").match(/\d+/g)[0]);
    if(parseInt(localStorage.getItem("legers").match(/\d+/g).length) == 2){
        U = parseInt(localStorage.getItem("legers").match(/\d+/g)[1]);
    }else{
        U = parseInt(localStorage.getItem("legers").match(/\d+/g)[2]);
    }
    coords = localStorage.getItem("coords").split(",");
    var unit_input = ["#unit_input_spear","#unit_input_sword","#unit_input_axe","#unit_input_light","#unit_input_heavy"];
    for(j=0; j<5; j++){
        if(U == j+1){
            $(unit_input[j]).val(UN);
        }
    }
    $("#unit_input_spy").val(4);
    $("#inputx").val(coords[0]);
    $("#inputy").val(coords[1]);
}
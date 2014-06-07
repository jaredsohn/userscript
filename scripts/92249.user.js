
// ==UserScript==
// @name          Battle Helper
// @namespace     bigc2009
// @description   shows info on battle influence and damage
// @include       http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==


var zGbl_DOM_ChangeTimer = '';
var bGbl_ChangeEventListenerInstalled = false;

window.addEventListener ("load", MainAction, false);


function MainAction (){


    var insert_node = null; // insert before this node
    var weapon_node;
    var rank_node = document.getElementById('player_rank');

    var allHTMLTags = new Array();
    allHTMLTags=document.getElementsByTagName('*');

    for (i=0; i<allHTMLTags.length; i++) {
        if (allHTMLTags[i].className=='opacity_fix fighter_weapon_image') {
            var src = allHTMLTags[i].src;
            player_weapon_q = src.substring(src.length-5, src.length-4);
        }
        if (allHTMLTags[i].className=='wdamage') {
            weapon_node = allHTMLTags[i];
        }
        if (allHTMLTags[i].className=='player right_side') {
            allHTMLTags[i].style.zIndex = '2';
            insert_node = allHTMLTags[i];
        }
        if (allHTMLTags[i].className=='player left_side') {
            allHTMLTags[i].style.zIndex = '2';
        }
    }


    // get player weapon firepower
    var player_weapon_fp = weapon_node.getElementsByTagName('strong').item(0).innerHTML;


    // get player strength and rank points
    var player_strength = document.getElementById('fighter_skill').innerHTML;
    player_strength = player_strength.substring(0, player_strength.length-9);
    var player_rank_points = document.getElementById('rank_min').innerHTML;
    player_rank_points = player_rank_points.substring(0, player_rank_points.length-12);
    var player_rank_multiplyer = getRankMultiplyer(player_rank_points);


    // get enemy strength and weapon q and guess firepower
    var enemy_strength = document.getElementById('enemy_skill').innerHTML;
    enemy_strength = enemy_strength.substring(0, enemy_strength.length-9);
    var enemy_weapon_q = document.getElementById('enemy_weapon').src;
    enemy_weapon_q = enemy_weapon_q.substring(enemy_weapon_q.length-5, enemy_weapon_q.length-4);


    // create or update my_div
    if(!document.getElementById('my_greasemonkey_div')){
        if (insert_node) {

            var newElement = document.createElement('div');

            newElement.id = 'my_greasemonkey_div';
            newElement.style.position = 'absolute';
            newElement.style.width = '100%';
            newElement.style.paddingTop = '50px';
            newElement.style.zIndex = '1';
            newElement.style.color = 'white';
            newElement.style.textAlign = 'center';

            newElement.appendChild(getScript());
            newElement.appendChild(getInfluenceDiv(player_strength, player_rank_multiplyer, player_weapon_fp));
            newElement.appendChild(getEnemyFPDiv(player_strength, player_weapon_fp, enemy_strength, enemy_weapon_q));
            newElement.appendChild(getDamageTable());

            insert_node.parentNode.insertBefore(newElement, insert_node);

        }
    }else{

        document.getElementById('my_greasemonkey_div').replaceChild(
            getInfluenceDiv(player_strength, player_rank_multiplyer, player_weapon_fp),
            document.getElementById('my_greasemonkey_influence_div')
        );
        document.getElementById('my_greasemonkey_div').replaceChild(
            getEnemyFPDiv(player_strength, player_weapon_fp, enemy_strength, enemy_weapon_q),
            document.getElementById('my_greasemonkey_enemyfp_div')
        );
        document.getElementById('my_greasemonkey_div').replaceChild(
            getDamageTable(),
            document.getElementById('my_greasemonkey_damage_table')
        );

    }


    updateDamages(player_strength, player_weapon_fp, enemy_strength);


    if (!bGbl_ChangeEventListenerInstalled){

        bGbl_ChangeEventListenerInstalled   = true;

        weapon_node.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
        rank_node.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);

    }

}

function getInfluenceDiv(player_strength, player_rank_multiplyer, player_weapon_fp){

    var div = document.createElement('div');
    div.id = 'my_greasemonkey_influence_div';
    div.style.paddingBottom = '5px';

    var fp_mult = 1 + (player_weapon_fp/100);
    var influence = ((player_rank_multiplyer-1)/20 + 0.3) * ((player_strength / 10) + 40) * fp_mult;

    div.innerHTML = 'my influence: '+influence.toFixed(0);

    return div;

}

function getEnemyFPDiv(player_strength, player_weapon_fp, enemy_strength, enemy_weapon_q){

    var div = document.createElement('div');
    div.id = 'my_greasemonkey_enemyfp_div';
    div.style.paddingBottom = '5px';
    div.title = 'as the enemy\'s fire power is unknown you have to guess it from the quality';

    var enemy_weapon_fp;
    if(document.getElementById('my_greasemonkey_enemyfp_input')){
        enemy_weapon_fp = document.getElementById('my_greasemonkey_enemyfp_input').value;
    }else{
        enemy_weapon_fp = enemy_weapon_q * 20;
    }

    var input = document.createElement('input');
    input.setAttribute('onkeyup', 'updateDamages('+player_strength+','+player_weapon_fp+','+enemy_strength+');')
    input.id = 'my_greasemonkey_enemyfp_input';
    input.type = 'text';
    input.style.textAlign = 'center';
    input.value = enemy_weapon_fp;
    input.size = '2';
    input.style.border = '1px solid';
    
    div.innerHTML = 'enemy\'s fire power (Q'+enemy_weapon_q+'): ';
    div.appendChild(input);

    return div;

}

function getDamageTable(){

    var table, tr, th, td;

    table = document.createElement('Table');
    table.id = 'my_greasemonkey_damage_table';
    table.style.margin = 'auto';

    tr = table.insertRow(0);

    th = tr.insertCell(0);
    th.innerHTML = 'fire power';
    th.style.paddingLeft = '10px';
    th.style.paddingRight = '10px';
    th.style.borderBottom = '1px solid';

    th = tr.insertCell(1);
    th.innerHTML = 'damage';
    th.style.paddingLeft = '10px';
    th.style.paddingRight = '10px';
    th.style.borderBottom = '1px solid';

    for(var i=0;i<=10;i++){

        fp_mult = 1 + (i/10)

        tr = table.insertRow(i+1);
        tr.id = 'my_greasemonkey_damage_tr_'+i;

        td = tr.insertCell(0);
        td.style.borderRight = '1px solid';
        td.id = 'my_greasemonkey_fp_td_'+i;
        td.innerHTML = i*10;

        td = tr.insertCell(1);
        td.id = 'my_greasemonkey_damage_td_'+i;

    }

    return table;

}

function updateDamages(player_strength, player_weapon_fp, enemy_strength){

    var damage;
    var enemy_weapon_fp = document.getElementById('my_greasemonkey_enemyfp_input').value;
    if(isNaN(enemy_weapon_fp)) enemy_weapon_fp = 0;

    for(var i=0; i<=10; i++){
        damage = (60 + ((player_strength - enemy_strength)/10)) * (1 + (i*10 - enemy_weapon_fp)/400);
        if(i*10 == player_weapon_fp){
            document.getElementById('my_greasemonkey_damage_tr_'+i).style.backgroundColor = 'black';
            document.getElementById('my_greasemonkey_fp_td_'+i).innerHTML = '<b>'+(i*10)+'</b>';
            document.getElementById('my_greasemonkey_damage_td_'+i).innerHTML = '<b>'+damage.toFixed(0)+'</b>';
        }else{
            document.getElementById('my_greasemonkey_damage_tr_'+i).style.backgroundColor = '';
            document.getElementById('my_greasemonkey_fp_td_'+i).innerHTML = i*10;
            document.getElementById('my_greasemonkey_damage_td_'+i).innerHTML = damage.toFixed(0);
        }
    }
}


function getScript(){

    var result = document.createElement('script');
    result.setAttribute('type', 'text/javascript');

    var string = '';
    string = string+'function updateDamages(player_strength, player_weapon_fp, enemy_strength){\n';
        string = string+'var damage;\nvar enemy_weapon_fp = document.getElementById(\'my_greasemonkey_enemyfp_input\').value;\n';
        string = string+'if(isNaN(enemy_weapon_fp)) enemy_weapon_fp = 0;\n';
        string = string+'for(var i=0; i<=10; i++){\n';
            string = string+'damage = (60 + ((player_strength - enemy_strength)/10)) * (1 + (i*10 - enemy_weapon_fp)/400);\n';
            string = string+'if(i*10 == player_weapon_fp){\n';
                string = string+'document.getElementById(\'my_greasemonkey_damage_tr_\'+i).style.backgroundColor = \'black\';\n';
                string = string+'document.getElementById(\'my_greasemonkey_fp_td_\'+i).innerHTML = \'<b>\'+(i*10)+\'</b>\';\n';
                string = string+'document.getElementById(\'my_greasemonkey_damage_td_\'+i).innerHTML = \'<b>\'+damage.toFixed(0)+\'</b>\';\n';
            string = string+'}else{\n';
                string = string+'document.getElementById(\'my_greasemonkey_damage_tr_\'+i).style.backgroundColor = \'\';\n';
                string = string+'document.getElementById(\'my_greasemonkey_fp_td_\'+i).innerHTML = i*10;\n';
                string = string+'document.getElementById(\'my_greasemonkey_damage_td_\'+i).innerHTML = damage.toFixed(0);\n';
            string = string+'}\n';
        string = string+'}\n';
    string = string+'}\n';

    result.innerHTML = string;

    return result;

}

function getRankMultiplyer(rank_points){

    if(rank_points < 10) return 1;
    if(rank_points < 30) return 2;
    if(rank_points < 60) return 3;
    if(rank_points < 100) return 4;
    if(rank_points < 150) return 5;
    if(rank_points < 250) return 6;
    if(rank_points < 350) return 7;
    if(rank_points < 450) return 8;
    if(rank_points < 600) return 9;
    if(rank_points < 800) return 10;
    if(rank_points < 1000) return 11;
    if(rank_points < 1400) return 12;
    if(rank_points < 1850) return 13;
    if(rank_points < 2350) return 14;
    if(rank_points < 3000) return 15;
    if(rank_points < 3750) return 16;
    if(rank_points < 5000) return 17;
    if(rank_points < 6500) return 18;
    if(rank_points < 9000) return 19;
    if(rank_points < 12000) return 20;
    if(rank_points < 15500) return 21;
    if(rank_points < 20000) return 22;
    if(rank_points < 25000) return 23;
    if(rank_points < 31000) return 24;
    if(rank_points < 40000) return 25;
    if(rank_points < 52000) return 26;
    if(rank_points < 67000) return 27;
    if(rank_points < 85000) return 28;
    if(rank_points < 110000) return 29;
    if(rank_points < 140000) return 30;
    if(rank_points < 180000) return 31;
    if(rank_points < 225000) return 32;
    if(rank_points < 285000) return 33;
    if(rank_points < 355000) return 34;
    if(rank_points < 435000) return 35;
    if(rank_points < 540000) return 36;
    if(rank_points < 660000) return 37;
    if(rank_points < 800000) return 38;
    if(rank_points < 950000) return 39;
    if(rank_points < 1140000) return 40;
    if(rank_points < 1350000) return 41;
    if(rank_points < 1600000) return 42;
    if(rank_points < 1875000) return 43;
    if(rank_points < 2185000) return 44;
    if(rank_points < 2550000) return 45;
    if(rank_points < 3000000) return 46;
    if(rank_points < 3500000) return 47;
    if(rank_points < 4150000) return 48;
    if(rank_points < 4900000) return 49;
    if(rank_points < 5800000) return 50;
    if(rank_points < 7000000) return 51;
    if(rank_points < 9000000) return 52;
    if(rank_points < 11500000) return 53;
    if(rank_points < 14500000) return 54;
    if(rank_points < 18000000) return 55;
    if(rank_points < 22000000) return 56;
    if(rank_points < 26500000) return 57;
    if(rank_points < 31500000) return 58;
    if(rank_points < 37000000) return 59;
    if(rank_points < 43000000) return 60;
    if(rank_points < 50000000) return 61;
    if(rank_points >= 50000000) return 62;

    return -1;
}


function HandleDOM_ChangeWithDelay (zEvent)
{
    
    if (typeof zGbl_DOM_ChangeTimer == "number"){
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer = setTimeout (function() {MainAction ();}, 500); //-- 500 milliseconds
    
}
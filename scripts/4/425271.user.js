// ==UserScript==
// @name       GrepToolsByRs28083
// @namespace  http://grepattcalc.tk
// @version    0.4
// @description  enter something useful
// @match      http://us11.grepolis.com/*
// @copyright  2012+, rs28083
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
var onlineC = "loading";
window.onload=function(){
    AddCss();
    //setTimeout(function(){AddMenuItems();},1000);
    online();
    offline();
};
function offline(){
setTimeout(function(){
    if((onlineC===("true"))==false){
   	var ui = document.getElementById('ui_box');
    var ui2 = flc(ui,'nui_toolbar','div');
    var md = flc(ui,'middle','div');
    var ofl = document.createElement('div');
    ofl.style.zIndex=2147483647;
    ofl.style.color='#FF0000';
    ofl.style.float="left";
    md.appendChild(ofl);
    ofl.innerHTML='Script Offline';
    }
},10000);
}
function AddCss(){
    var el = document.getElementsByTagName('head')[0];
    el.innerHTML=el.innerHTML.replace('<link href="/cache/css/merged/game_3.css" rel="stylesheet" type="text/css">','<link href="/cache/css/merged/game_3.css" rel="stylesheet" type="text/css"><link href="http://rscoding.tk/grepcssimages/css1.css" rel="stylesheet" type="text/css>"');
}
function AddMenuItems(){
    var elems = document.getElementsByTagName('div'), i;
    var cid = 0;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' ' + 'tb_activities toolbar_activities' + ' ')
           > -1) {
            cid=i;
        }
    }
    var eleChild = elems[cid].childNodes;
    for(var b = 0 , j = eleChild.length; b < j ; b++ ){
        if( eleChild[ b ].className == "middle" ){
            eleChild[b].setAttribute('id','rsMenuEdit');
        }
    }
    
    var element = document.getElementById('rsMenuEdit');
    var content = document.createElement('div');
    
    content.setAttribute('class','activity rstools');
    
    var divi = document.createElement('div');
    
    divi.setAttribute('class','divider');
    content.setAttribute('id','rsMenuButton');
    content.innerHTML = '<div class="hover_state"><div class="icon"></div></div><div class="dropdown_box js-dropdown" id="toolbar_activity_rstools"></div>';
    
    element.insertBefore(divi,null);
    element.insertBefore(content,null);
    var el = document.getElementById('rsMenuButton');
    GM_log(jQuery().jquery);
    var ele = document.getElementsByTagName('body')[0];
    var c1 = document.createElement('div');
    var c2 = document.createElement('div');
    var c3 = document.createElement('div');
    var c4 = document.createElement('div');
    var c5 = document.createElement('div');
    var c6 = document.createElement('div');
    var c7 = document.createElement('div');
    c1.innerHTML='<div class="corner_tl"></div><div class="corner_tr"></div><div class="corner_bl"></div><div class="corner_br"></div><div class="border_t"></div><div class="border_b"></div><div class="border_l"></div><div class="border_r"></div><div class="middle"></div>';
    c1.setAttribute('class','dropdown-list sandy-box js-dropdown-list');
    c1.setAttribute('id','toolbar_activity_rstools_list');
    c1.setAttribute('style','left: 366px; position: absolute; visibility: visible; width: 113px; top: 29px; margin-left: 0px; display: none;');
    c2.setAttribute('class','content js-dropdown-item-list');
    //rest of vars are for list items
    c3.setAttribute('class','item no_results');
    c3.innerHTML = "<font color='#0000FF'>Troop Count</font>";
    c4.setAttribute('class','item no_results');
    c4.innerHTML ="<font color='#0000FF'>Defense Template</font>";
    c5.setAttribute('class','item no_results');
    c5.innerHTML = "<font color='#0000FF'>Attack Log</font>";
    c2.appendChild(c3);
    c2.appendChild(c4);
    //c2.appendChild(c5);
    c1.appendChild(c2);
    ele.appendChild(c1);
    el.addEventListener ("click", function() {window.open('http://rscoding.tk/tools.aspx');}, false); 
    el.onmouseover=function(){showDiv('toolbar_activity_rstools_list');};
    document.getElementById('map').onmouseover=function(){hideDiv('toolbar_activity_rstools_list');};
    c3.onclick=function(){getAllCityTroops();};
    c4.onclick=function(){getDefTempLevels();};
    c5.onclick=function(){logAttacks();};
}
function showDiv(id){
    var element = document.getElementById(id);
    element.style.display = "block";
}
function hideDiv(id){
    var element = document.getElementById(id);        
    element.style.display = "none";
}

function elc(){
    var element = document.getElementById('toolbar_activity_rstools_list');
    if(element.style.display == "none"){
        showDiv('toolbar_activity_rstools_list');
    }else{
        hideDiv('toolbar_activity_rstools_list');
    }
}
function getAllCityTroops(){
    var d = false;
    var fc = Game.townName;
    var cts = 0;
    while(d==false){
        var ui = document.getElementById('ui_box');
        getTroops();
        if(cts > 0){
            if(fc==Game.townName){
                d=true;
            }
        }
        cts=cts+1;
        var elms = ui.getElementsByTagName('div'),b;
        for (var i=0;i<elms.length;i++){
            if(elms[i].className.indexOf('btn_next_town button_arrow right')!=-1){elms[i].click();i=elms.length-1;}
        }
    }
}
function openCityView(){
    var ui = document.getElementById('ui_box');
    var elms = ui.getElementsByTagName('div');
    for(var i=0;i<elms.length;i++){
        if(elms[i].className.indexOf('city_overview')!=-1){elms[i].click();i=elms.length-1;}
    }
}
function openS(){
    document.getElementById('building_main_area_main').click();
}
function getDefTempLevels(){
    var wall=0;
    var cave=0;
    var silver=0;
    var pl = Game.player_name;
    var cn = Game.townName;
    var god;
    var ele = document.getElementById('ui_box');
    var elms = ele.getElementsByTagName('div'),b;
    var sw="0";var ar="0";var sl="0";var hop="0";var hs="0";var ch="0";var cata="0";var de="0";var bts="0";var sts="0";var br="0";var fs="0";var ls="0";var tr="0";var cs="0";
    mtcc();
    for (var i=0;i<elms.length;i++){
        if(elms[i].className.indexOf('gods_container')!=-1){god=elms[i].className.replace('gods_container','').replace(' god ','');}
        if(elms[i].className.indexOf('unit_icon')!=-1){
            if(elms[i].className.indexOf('sword')!=-1){sw = elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('archer')!=-1){ar =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('slinger')!=-1){sl =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('hoplite')!=-1){hop =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('catapult')!=-1){cata =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('rider')!=-1){hs =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('chariot')!=-1){ar =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('big_transporter')!=-1){bts =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('small_transporter')!=-1){sts =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('attack_ship')!=-1){ls =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('bireme')!=-1){br =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('demolition_ship')!=-1){fs =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('trireme')!=-1){tr =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('colonize_ship')!=-1){cs =elms[i].getElementsByTagName('div')[0].innerHTML;}
                }
    }
    var troops= sw + ':' +ar + ':' +sl + ':' +hop + ':' +hs + ':' +ch + ':' +cata + ':' +de + ':' +bts + ':' +sts + ':' +br + ':' +fs + ':' +ls + ':' +tr + ':' +cs;
    var tower = "No";
    BuildingWindowFactory.open('main');
    setTimeout(function(){
        var walle = document.getElementById('building_main_wall');
        var cavee = document.getElementById('building_main_hide');
        wall = walle.getElementsByTagName('span')[0].innerHTML;
        cave = cavee.getElementsByTagName('span')[0].innerHTML;
        if(document.getElementById('building_main_tower') == null){
            tower="No";
        }else{
            tower="Yes";
        }
        BuildingWindowFactory.open('hide');},3000);
    setTimeout(function(){silver=getSilver();},5000);
    var oc = getO();
    setTimeout(function(){window.open('http://rscoding.tk/tcv2.aspx?name='+pl+'&city='+cn+'&troops='+troops+'&god='+god+'&wall='+wall+'&cave='+cave+'&silver='+silver+'&tower='+tower+'&alli='+Game.alliance_id+'&o='+oc);},6000);
}
function getSilver(){
    var silver = 0;
    var cave = document.getElementById('hide_espionage');
    var elms = cave.getElementsByTagName('span');
    for(var i=0;i<elms.length;i++){
        if(elms[i].className.indexOf('hide_storage_level')!=-1){silver = elms[i].innerHTML;i=elms.length-1;}
    }
    return silver;
}
function getTroops(){
    var ele = document.getElementById('ui_box');
    var elms = ele.getElementsByTagName('div'),b;
    var god;
    mtcc();
    var sw="0";var ar="0";var sl="0";var hop="0";var hs="0";var ch="0";var cata="0";var de="0";var bts="0";var sts="0";var br="0";var fs="0";var ls="0";var tr="0";var cs="0";
    for (var i=0;i<elms.length;i++){
        if(elms[i].className.indexOf('gods_container')!=-1){god=elms[i].className.replace('gods_container','').replace(' god ','');}
        if(elms[i].className.indexOf('unit_icon')!=-1){
            if(elms[i].className.indexOf('sword')!=-1){sw = elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('archer')!=-1){ar =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('slinger')!=-1){sl =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('hoplite')!=-1){hop =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('catapult')!=-1){cata =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('rider')!=-1){hs =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('chariot')!=-1){ch =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('big_transporter')!=-1){bts =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('small_transporter')!=-1){sts =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('attack_ship')!=-1){ls =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('bireme')!=-1){br =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('demolition_ship')!=-1){fs =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('trireme')!=-1){tr =elms[i].getElementsByTagName('div')[0].innerHTML;}else if(elms[i].className.indexOf('colonize_ship')!=-1){cs =elms[i].getElementsByTagName('div')[0].innerHTML;}
                }
    }
    var troops= sw + ':' +ar + ':' +sl + ':' +hop + ':' +hs + ':' +ch + ':' +cata + ':' +de + ':' +bts + ':' +sts + ':' +br + ':' +fs + ':' +ls + ':' +tr + ':' +cs;
    var pl = Game.player_name;
    var cn = Game.townName;
    var ocean = getO();
    var cds = cords();
    window.open('http://rscoding.tk/tcv2.aspx?name='+pl+'&city='+cn+'&troops='+troops+'&god='+god+'&o='+ocean+'&x='+cds[0]+'&y='+cds[1]);
}
function logAttacks(){
    var att = document.getElementById('toolbar_activity_commands');
    $('#toolbar_activity_commands').mouseenter();
    $('#toolbar_activity_commands').mouseover();
}
function getO(){
    return document.getElementById('sea_id').innerHTML;
}
function mtcc(){
    var ad = document.getElementById('ui_box');
    var pa = flc(ad,'picomap_area','div');
    var bt = flc(pa,'btn_jump_to_town circle_button jump_to_town','div');
    bt.click();
}
function cords(){
    var x = 0;
    var y = 0;
    var ui = document.getElementById('ui_box');
    var pc = flc(ui,'picomap_area','div');
    var cb = flc(pc,'coords_box','div');
    var xc = flc(cb,'coord coord_x js-coord-x','div');
    var yc = flc(cb,'coord coord_y js-coord-y','div');
    var xcc = flc(xc,'middle','div');
    var xcd = flc(xcc,'ie7fix','div');
    var xip = xcd.getElementsByTagName('input')[0];
    var ycc = flc(yc,'middle','div');
    var ycd = flc(ycc,'ie7fix','div');
    var yip = ycd.getElementsByTagName('input')[0];
    x=xip.value;
    y=yip.value;
    var array = [x,y];
    return array;
}
function flc(div, cname,tag){
    var cl = div.getElementsByTagName(tag);
    var rtd;
    for(var i=0;i<cl.length;i++){
        if(cl[i].getAttribute('class')==cname){
            rtd=cl[i];
            i=cl.length;
        }
    }
    return rtd;
}
function online(){
    var img = document.createElement("img");
    img.onload = function(e) {
        setTimeout(function(){  AddMenuItems();},1000);
        onlineC="true";
    }
    img.setAttribute("src","http://rscoding.tk/grepcssimages/rstoolsicon.png");
}
// ==UserScript==
// @version	   0.01
// @name           Foro eLiTe
// @date           2011-01-28
// @namespace      Foro eLiTe
// @description    Foro eLiTe
// @include        http://*.grepolis.com/game/report?id=*
// ==/UserScript==



(function () {

var UPDATE = {
	 name: "Grepolis Compactador Batallas"
	,check: "http://userscripts.org/scripts/review/75280.txt"
	,install: "http://userscripts.org/scripts/source/75280.user.js"
	,version: "1.08"
    ,msg: ""
    ,minHours: 1
};

var patron = '';


var LANG_ES = {
    update: "Existe nueva versión del compactador (CLICK AQUI PARA INSTALAR)"
	,botin: "Botín: " 
	,capacidad: "% capacidad)"
	,compAuto: "Compactador automático"
	,infEsp: "Informe de Espionaje"
	,perdio: "perdió"
	,batallaDia: "Batalla del día "
	,sobrehumana: "Fuerza sobrehumana (+10% fuerza terrestre)"
	,atacante: "Atacante "
	,defensor: "Defensor "
	,madera: "Madera"
	,piedra: "Piedra"
	,plata: "Plata"
	,sinDef: "Sin defensas"
	,tropas: "Tropas"
	,edificios: "Edificios"
	,fpub: "Foro Público"
	,fali: "Foro Alianza"
	,sinMuralla: "Sin muralla"
	,ataqPerdio: "El atacante perdió"
	,ataqCaptura: "El atacante captura"
	,defPerdio: "El defensor perdió"
	,ataqRenta: "Rentabilidad atacante"
	,defPerdidas: "Perdidas atacante"
	,def2: "defensor"
	,ataq2: "atacante"
	,total2: "totales"
	,pobAtaq: "Población perdida atacante"
	,noReportadas: "Unidades no reportadas"
	
	,transporter: "Bote de transporte"
	,bireme: "Birreme"
	,attackShip: "Nave incendiaria"
	,demolitionShip: "Brulote"
	,smallTransporter: "Nave de transporte rápido"
	,trireme: "Trirreme"
	,colonizeShip: "Nave de colonización"
	,rider: "Caballero"
	,slinger: "Hondero"
	,archer: "Arquero"
	,sword: "Infante"
	,hoplite: "Hoplita"
	,chariot: "Carro"
	,catapult: "Catapulta"
	,minotaur: "Minotauro"
	,manticore: "Mantícora"
	,zyklop: "Cíclope"
	,seaMoster: "Hidra"
	,harpy: "Arpía"
	,medusa: "Medusa"
	,pegasus: "Pegasus"
	,centaur: "Centauro"
	,militia: "Milicia"
	
	,main: "Senado"
	,storage: "Almacen"
	,hide: "Cueva"
	,farm: "Granja"
	,place: "Ágora"
	,lumber: "Aserradero"
	,stoner: "Cantera"
	,ironer: "Mina de plata"
	,market: "Mercado"
	,docks: "Puerto"
	,wall: "Muralla"
	,academy: "Academia"
	,temple: "Templo"
	,barracks: "Cuartel"
	
	,theater: "Teatro"
	,thermal: "Termas"
	,library: "Biblioteca"
	,lighthouse: "Faro"
	,statue: "Estatua divina"
	,tower: "Torre"
	,oracle: "Oráculo"
	,trade: "Oficina comercial"
};


var LANG_EN = {
    update: "New version of compactor (CLICK HERE TO INSTALL)"
	,botin: "Botín: " 
	,capacidad: "% capacity)"
	,compAuto: "Automatic Compactor"
	,infEsp: "Espionage Report"
	,perdio: "lost"
	,batallaDia: "Battle of the day "
	,sobrehumana: "Superhuman strength (+10% ground force)"
	,atacante: "Attacker "
	,defensor: "Defender "
	,madera: "Wood"
	,piedra: "Stone"
	,plata: "Silver"
	,sinDef: "Without defenses"
	,tropas: "Troops"
	,edificios: "Buildings"
	,fpub: "Public Forum"
	,fali: "Alliance Forum"
	,sinMuralla: "Without walls"
	,ataqPerdio: "The attacker lost"
	,ataqCaptura: "The attacker captures"
	,defPerdio: "The defender lost"
	,ataqRenta: "Profitability attacker"
	,defPerdidas: "Losses attacker"
	,def2: "defender"
	,ataq2: "attacker"
	,total2: "total"
	,pobAtaq: "Population lost attacker"
	,noReportadas: "Units not reported"
	
	,transporter: "Transporter"
	,bireme: "Bireme"
	,attackShip: "Attack ship"
	,demolitionShip: "Demolition ship"
	,smallTransporter: "Small transporter"
	,trireme: "Trireme"
	,colonizeShip: "Colonize Ship"
	,rider: "Rider"
	,slinger: "Slinger"
	,archer: "Archer"
	,sword: "Sword"
	,hoplite: "Hoplite"
	,chariot: "Chariot"
	,catapult: "Catapult"
	,minotaur: "Minotaur"
	,manticore: "Manticore"
	,zyklop: "Zyklop"
	,seaMoster: "Sea Moster"
	,harpy: "Harpy"
	,medusa: "Medusa"
	,pegasus: "Pegasus"
	,centaur: "Centaur"
	,militia: "Militia"
	
	,main: "Main"
	,storage: "Storage"
	,hide: "Hider"
	,farm: "Farm"
	,place: "Place"
	,lumber: "Lumber"
	,stoner: "Stoner"
	,ironer: "Ironer"
	,market: "Market"
	,docks: "Docks"
	,wall: "Wall"
	,academy: "Academy"
	,temple: "Temple"
	,barracks: "Barracks"
	
	,theater: "Theater"
	,thermal: "Thermal"
	,library: "Library"
	,lighthouse: "Lighthouse"
	,statue: "Statue"
	,tower: "Tower"
	,oracle: "Oracle"
	,trade: "Trade"
	
};


var LANG_PT = {
	update: "Nova Versão do Compactador(CLICA AQUI PARA INSTALAR)"
	,botin: "Pilhagem: "
	,capacidad: "%capacidade)"
	,compAuto: "Compactador Automatico"
	,infEsp: "Relátorio de Espionagem"
	,perdio: "perdas"
	,batallaDia: "Batalha do dia"
	,sobrehumana: "Força SuperHumana (+10% Força Terrestre)"
	,atacante: "Atacante"
	,defensor: "Defensor"
	,madera: "Madeira"
	,piedra: "Pedra"
	,plata: "Prata"
	,sinDef: "Sem Defesas"
	,tropas: "Tropas"
	,edificios: "Edificios"
	,fpub: "Forum Geral"
	,fali: "Forum Aliança"
	,sinMuralla: "Sem Muralha"
	,ataqPerdio: "O Atacante perdeu"
	,ataqCaptura: "O Atacante roubou"
	,defPerdio: "O defensor perdeu"
	,ataqRenta: "Lucro Atacante"
	,defPerdidas: "O Defensor perdeu"
	,def2: "defensor"
	,ataq2: "atacante"
	,total2: "total"
	,pobAtaq: "População atacante perdida"
	,noReportadas: "Unidades não reportadas"

	,transporter: "Barco de Transporte"
	,bireme: "Birreme"
	,attackShip: "Navio-farol"
	,demolitionShip: "Navio incendiário"
	,smallTransporter: "Navio de transporte rápido"
	,trireme: "Trirreme"
	,colonizeShip: "Navio colonizador"
	,rider: "Cavaleiro"
	,slinger: "Fundibulário"
	,archer: "Arqueiro"
	,sword: "Espadachim"
	,hoplite: "Hoplita"
	,chariot: "Biga"
	,catapult: "Catapulta"
	,minotaur: "Minotauro"
	,manticore: "Mantícora"
	,zyklop: "Ciclope"
	,seaMoster: "Hidra"
	,harpy: "Harpia"
	,medusa: "Medusa"
	,pegasus: "Pégaso"
	,centaur: "Centauro"
	,militia: "Milicia"

	,main: "Senado"
	,storage: "Armazém"
	,hide: "Gruta"
	,farm: "Fazenda"
	,place: "Ágora"
	,lumber: "Serração"
	,stoner: "Pedreira"
	,ironer: "Mina de Prata"
	,market: "Mercado"
	,docks: "Porto"
	,wall: "Muralha"
	,academy: "Academia"
	,temple: "Templo"
	,barracks: "Quartel"

	,theater: "Teatro"
	,thermal: "Termas"
	,library: "Biblioteca"
	,lighthouse: "Farol"
	,statue: "Estátua Divina"
	,tower: "Torre"
	,oracle: "Oraclo"
	,trade: "Casa do Mercador"

}; 




function getElementsByClass(searchClass,node,tag) {
var classElements = new Array();
    if (node == null) 
        node = document;
    if (tag == null) 
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;

    for (var i = 0, j = 0; i < elsLen; i++) {
        var sep = els[i].className.split(" ");
        var content = false;
        
        for(var k = 0; k < sep.length; k++){
            if(sep[k] == searchClass) 
                content = true;
        }
        
        if (els[i].className == searchClass || content) {
            classElements[j] = els[i];
            j++;
        }
   }
   return classElements;
}


function mostrarNumero(num) {
    var negativo = false;
    
    if(parseInt(num) < 0) {
        num = parseInt(num)*-1;
        negativo = true;
    }
    
    var nNmb = String(parseInt(num)); 
    var sRes = "";
    for (var j = 0, i = nNmb.length - 1; i >= 0; i--, j++)
        sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
    
    if(negativo) sRes = '-' + sRes;    
    
	return sRes;
}


function getNombreAtacante() {
    
    var nombre = getElementsByClass("town_owner")[0].getElementsByTagName("a");
    return nombre[0].innerHTML; 
}


function getNombreDefensor() {
    if(getElementsByClass("town_owner")[1].getElementsByTagName("a").length == 0) {
        return "Abandonado";
    }
    else {
        return getElementsByClass("town_owner")[1].getElementsByTagName("a")[0].innerHTML;
    }
}


function getCiudadDefensor() {
    if(getElementsByClass("town_name")[1].getElementsByTagName("a").length == 0) {
        return "Abandonado";
    }
    else {
        return getElementsByClass("town_name")[1].getElementsByTagName("a")[0].innerHTML;
    }
}


function getMoral() {
    var moral = getElementsByClass("morale")[0];
    return moral.lastChild.textContent.replace(/\t/gi, "").replace(/\n/gi,"");
}


function getSuerte() {
    var moral = getElementsByClass("luck")[0];
    return moral.lastChild.textContent.replace(/\t/gi, "").replace(/\n/gi,"");
}


function getMuralla() {
    var muralla = getElementsByClass("oldwall");
    if(muralla == "") {
        muralla = LANG.sinMuralla;
    }
    else { 
        muralla = muralla[0].lastChild.textContent.replace(/\t/gi, "").replace(/\n/gi,"");
    }
    
    return muralla;
}


function getHumorGranja() {
    var moral = getElementsByClass("report_farm_bar")[0];
    return moral.lastChild.textContent.replace(/\t/gi, "").replace(/\n/gi,"");
}

function getFuerzaGranja() {
    var moral = getElementsByClass("report_farm_bar")[1];
    return moral.lastChild.textContent.replace(/\t/gi, "").replace(/\n/gi,"");
}

function getTipoUnidad(unidad) {
    var ret = "";
    
    if(unidad.indexOf("unit_big_transporter") != -1) ret= LANG.transporter;
    if(unidad.indexOf("unit_bireme") != -1) ret= LANG.bireme;
    if(unidad.indexOf("unit_attack_ship") != -1) ret= LANG.attackShip;
    if(unidad.indexOf("unit_demolition_ship") != -1) ret= LANG.demolitionShip;
    if(unidad.indexOf("unit_small_transporter") != -1) ret= LANG.smallTransporter;
    if(unidad.indexOf("unit_trireme") != -1) ret= LANG.trireme;
    if(unidad.indexOf("unit_colonize_ship") != -1) ret= LANG.colonizeShip;
    
    if(unidad.indexOf("unit_rider") != -1) ret= LANG.rider;
    if(unidad.indexOf("unit_slinger") != -1) ret= LANG.slinger;
    if(unidad.indexOf("unit_archer") != -1) ret= LANG.archer;
    if(unidad.indexOf("unit_sword") != -1) ret= LANG.sword;
    if(unidad.indexOf("unit_hoplite") != -1) ret= LANG.hoplite;
    if(unidad.indexOf("unit_catapult") != -1) ret= LANG.catapult;
    if(unidad.indexOf("unit_chariot") != -1) ret= LANG.chariot;
    
    if(unidad.indexOf("unit_minotaur") != -1) ret= LANG.minotaur;
    if(unidad.indexOf("unit_manticore") != -1) ret= LANG.manticore;
    if(unidad.indexOf("unit_zyklop") != -1) ret= LANG.zyklop;
    if(unidad.indexOf("unit_sea_monster") != -1) ret= LANG.seaMonster;
    if(unidad.indexOf("unit_harpy") != -1) ret= LANG.harpy;
    if(unidad.indexOf("unit_medusa") != -1) ret= LANG.medusa;
    if(unidad.indexOf("unit_pegasus") != -1) ret= LANG.pegasus;
    if(unidad.indexOf("unit_centaur") != -1) ret= LANG.centaur;
    
    
    if(unidad.indexOf("unit_militia") != -1) ret= LANG.militia;
    
    return ret;
}


function getTipoEdificio(edif) {
    var ret = "";
    
    if(edif.indexOf("building_main") != -1) ret= LANG.main;
    if(edif.indexOf("building_storage") != -1) ret= LANG.storage;
    if(edif.indexOf("building_hide") != -1) ret= LANG.hide;
    if(edif.indexOf("building_farm") != -1) ret= LANG.farm;
    if(edif.indexOf("building_place") != -1) ret= LANG.place;
    if(edif.indexOf("building_lumber") != -1) ret= LANG.lumber;
    if(edif.indexOf("building_stoner") != -1) ret= LANG.stoner;
    if(edif.indexOf("building_ironer") != -1) ret= LANG.ironer;
    if(edif.indexOf("building_market") != -1) ret= LANG.market;
    if(edif.indexOf("building_docks") != -1) ret= LANG.docks;
    if(edif.indexOf("building_wall") != -1) ret= LANG.wall;
    if(edif.indexOf("building_academy") != -1) ret= LANG.academy;
    if(edif.indexOf("building_temple") != -1) ret= LANG.temple;
    if(edif.indexOf("building_barracks") != -1) ret= LANG.barracks;
	
	if(edif.indexOf("building_theater") != -1) ret= LANG.theater;
	if(edif.indexOf("building_thermal") != -1) ret= LANG.thermal;
	if(edif.indexOf("building_library") != -1) ret= LANG.library;
	if(edif.indexOf("building_lighthouse") != -1) ret= LANG.lighthouse;
	
	if(edif.indexOf("building_statue") != -1) ret= LANG.statue;
	if(edif.indexOf("building_tower") != -1) ret= LANG.tower;
	if(edif.indexOf("building_oracle") != -1) ret= LANG.oracle;
	if(edif.indexOf("building_trade") != -1) ret= LANG.trade;
	
   
    if(ret == "") ret = edif;
    
    return ret;

}

function getCosteMadera(unidad) {
    
    var ret = 0;
    
    if(unidad.indexOf("unit_big_transporter") != -1) ret= 500;
    if(unidad.indexOf("unit_bireme") != -1) ret= 800;
    if(unidad.indexOf("unit_attack_ship") != -1) ret= 1300;
    if(unidad.indexOf("unit_demolition_ship") != -1) ret= 500;
    if(unidad.indexOf("unit_small_transporter") != -1) ret= 800;
    if(unidad.indexOf("unit_trireme") != -1) ret= 2000;
    if(unidad.indexOf("unit_colonize_ship") != -1) ret= 10000;
    
    if(unidad.indexOf("unit_sword") != -1) ret= 95;
    if(unidad.indexOf("unit_slinger") != -1) ret= 55;
    if(unidad.indexOf("unit_archer") != -1) ret= 120;
    if(unidad.indexOf("unit_hoplite") != -1) ret= 0;
    if(unidad.indexOf("unit_rider") != -1) ret= 240;
    if(unidad.indexOf("unit_chariot") != -1) ret= 200;
    if(unidad.indexOf("unit_catapult") != -1) ret= 1200;
    
    if(unidad.indexOf("unit_minotaur") != -1) ret= 1400;
    if(unidad.indexOf("unit_manticore") != -1) ret= 4400;
    if(unidad.indexOf("unit_zyklop") != -1) ret= 2000; 
    if(unidad.indexOf("unit_sea_monster") != -1) ret= 5400;
    if(unidad.indexOf("unit_harpy") != -1) ret= 1600;
    if(unidad.indexOf("unit_medusa") != -1) ret= 1500;
    if(unidad.indexOf("unit_centaur") != -1) ret= 1740;
    if(unidad.indexOf("unit_pegasus") != -1) ret= 2800;
    
    
    return ret;
}

function getCostePiedra(unidad) {
    
    var ret = 0;
    
    if(unidad.indexOf("unit_big_transporter") != -1) ret= 500;
    if(unidad.indexOf("unit_bireme") != -1) ret= 700;
    if(unidad.indexOf("unit_attack_ship") != -1) ret= 300;
    if(unidad.indexOf("unit_demolition_ship") != -1) ret= 750;
    if(unidad.indexOf("unit_small_transporter") != -1) ret= 0;
    if(unidad.indexOf("unit_trireme") != -1) ret= 1300;
    if(unidad.indexOf("unit_colonize_ship") != -1) ret= 10000;
    
    if(unidad.indexOf("unit_sword") != -1) ret= 0;
    if(unidad.indexOf("unit_slinger") != -1) ret= 100;
    if(unidad.indexOf("unit_archer") != -1) ret= 0;
    if(unidad.indexOf("unit_hoplite") != -1) ret= 75;
    if(unidad.indexOf("unit_rider") != -1) ret= 120;
    if(unidad.indexOf("unit_chariot") != -1) ret= 440;
    if(unidad.indexOf("unit_catapult") != -1) ret= 1200;
    
    if(unidad.indexOf("unit_minotaur") != -1) ret= 600;
    if(unidad.indexOf("unit_manticore") != -1) ret= 3000;
    if(unidad.indexOf("unit_zyklop") != -1) ret= 4200;
    if(unidad.indexOf("unit_sea_monster") != -1) ret= 2800; 
    if(unidad.indexOf("unit_harpy") != -1) ret= 400;
    if(unidad.indexOf("unit_medusa") != -1) ret= 3800;
    if(unidad.indexOf("unit_centaur") != -1) ret= 300;
    if(unidad.indexOf("unit_pegasus") != -1) ret= 360;
    
    return ret;
}


function getCostePlata(unidad) {
    
    var ret = 0;
    
    if(unidad.indexOf("unit_big_transporter") != -1) ret= 400;
    if(unidad.indexOf("unit_bireme") != -1) ret= 180;
    if(unidad.indexOf("unit_attack_ship") != -1) ret= 800;
    if(unidad.indexOf("unit_demolition_ship") != -1) ret= 150;
    if(unidad.indexOf("unit_small_transporter") != -1) ret= 400;
    if(unidad.indexOf("unit_trireme") != -1) ret= 900;
    if(unidad.indexOf("unit_colonize_ship") != -1) ret= 10000;
    
    if(unidad.indexOf("unit_sword") != -1) ret= 85;
    if(unidad.indexOf("unit_slinger") != -1) ret= 40;
    if(unidad.indexOf("unit_archer") != -1) ret= 75;
    if(unidad.indexOf("unit_hoplite") != -1) ret= 150;
    if(unidad.indexOf("unit_rider") != -1) ret= 360;
    if(unidad.indexOf("unit_chariot") != -1) ret= 320;
    if(unidad.indexOf("unit_catapult") != -1) ret= 1200;
    
    if(unidad.indexOf("unit_minotaur") != -1) ret= 3100;
    if(unidad.indexOf("unit_manticore") != -1) ret= 3400;
    if(unidad.indexOf("unit_zyklop") != -1) ret= 3360;
    if(unidad.indexOf("unit_sea_monster") != -1) ret= 3800; 
    if(unidad.indexOf("unit_harpy") != -1) ret= 1360;
    if(unidad.indexOf("unit_medusa") != -1) ret= 2200;
    if(unidad.indexOf("unit_centaur") != -1) ret= 700;
    if(unidad.indexOf("unit_pegasus") != -1) ret= 80;
    
    
    return ret;
}


function getCostePoblacion(unidad) {
    
    var ret = 0;
    
    if(unidad.indexOf("unit_big_transporter") != -1) ret= 7;
    if(unidad.indexOf("unit_bireme") != -1) ret= 8;
    if(unidad.indexOf("unit_attack_ship") != -1) ret= 10;
    if(unidad.indexOf("unit_demolition_ship") != -1) ret= 10;
    if(unidad.indexOf("unit_small_transporter") != -1) ret= 5;
    if(unidad.indexOf("unit_trireme") != -1) ret= 16;
    if(unidad.indexOf("unit_colonize_ship") != -1) ret= 170;
    
    if(unidad.indexOf("unit_sword") != -1) ret= 1;
    if(unidad.indexOf("unit_slinger") != -1) ret= 1;
    if(unidad.indexOf("unit_archer") != -1) ret= 1;
    if(unidad.indexOf("unit_hoplite") != -1) ret= 1;
    if(unidad.indexOf("unit_rider") != -1) ret= 3;
    if(unidad.indexOf("unit_chariot") != -1) ret= 4;
    if(unidad.indexOf("unit_catapult") != -1) ret= 15;
    
    if(unidad.indexOf("unit_minotaur") != -1) ret= 30;
    if(unidad.indexOf("unit_manticore") != -1) ret= 45;
    if(unidad.indexOf("unit_zyklop") != -1) ret= 40;
    if(unidad.indexOf("unit_sea_monster") != -1) ret= 50; 
    if(unidad.indexOf("unit_harpy") != -1) ret= 14;
    if(unidad.indexOf("unit_medusa") != -1) ret= 18;
    if(unidad.indexOf("unit_centaur") != -1) ret= 12;
    if(unidad.indexOf("unit_pegasus") != -1) ret= 20;
	
	if(unidad.indexOf("unit_militia") != -1) ret= 1;
    
    return ret;
}


function codificar (patron, tipo) {

    var marcas = new Array();
    var url_script = 'http://userscripts.org/scripts/show/75280';
    var txt_firma = '';
	
	patron = patron.replace(/{MADERA}/gi, LANG.madera);
	patron = patron.replace(/{PIEDRA}/gi, LANG.piedra);
	patron = patron.replace(/{PLATA}/gi, LANG.plata);
    
    var colores = [
        [/{COLOR_ATAQ}/gi, '#8A0808'],
        [/{COLOR_ATAQ2}/gi, '#E63A3A'],
        [/{COLOR_DEF}/gi, '#0B610B'],
        [/{COLOR_DEF2}/gi, '#08B23B'] ];
    
    if (tipo == 'HTML') {
    
        marcas = [
            [/{B}/gi, '<b>'],
            [/{\/B}/gi, '</b>'],
            [/{I}/gi, '<i>'],
            [/{\/I}/gi, '</i>'],
            [/{NL}/gi, '<br>'],
            [/{CENTER}/gi, '<center>'],
            [/{\/CENTER}/gi, '</center>'],
            [/{SIZE_PEQ}/gi, '<font size=1>'],
            [/{SIZE_MED}/gi, '<font size=3>'],
            [/{SIZE_GRA}/gi, '<font size=5>'],
            [/{\/SIZE}/gi, '</font>'],
            [/{\/COLOR}/gi, '</font>'],
            [/{PLAYER}/gi, ''],
            [/{\/PLAYER}/gi, ''],
            [/{ENLACE_SCRIPT}/gi, '<a href="' + url_script + '">' + txt_firma + '</a>'] ];
                
                
        for(var i = 0; i < colores.length; i++)
            patron = patron.replace(colores[i][0],'<font color="' + colores[i][1] + '">');
                
    }
    
    
    if (tipo == 'FORO_ALIANZA') {

        marcas = [
            [/{B}/gi, '[b]'],
            [/{\/B}/gi, '[/b]'],
            [/{I}/gi, '[i]'],
            [/{\/I}/gi, '[/i]'],
            [/{NL}/gi, '\n'],
            [/{CENTER}/gi, ''],
            [/{\/CENTER}/gi, ''],
            [/{SIZE_PEQ}/gi, '[size=8]'],
            [/{SIZE_MED}/gi, '[size=13]'],
            [/{SIZE_GRA}/gi, '[size=15]'],
            [/{\/SIZE}/gi, '[/size]'],
            [/{\/COLOR}/gi, '[/color]'],
            [/{PLAYER}/gi, '[player]'],
            [/{\/PLAYER}/gi, '[/player]'],
            [/{ENLACE_SCRIPT}/gi, '[url="' + url_script + '"]' + txt_firma + '[/url]'] ];
            

        for(var i = 0; i < colores.length; i++)
            patron = patron.replace(colores[i][0],'[color="' + colores[i][1] + '"]');
    
    
    }
    
    if (tipo == 'FORO_GENERAL') {
     
        marcas = [
            [/{B}/gi, '[B]'],
            [/{\/B}/gi, '[/B]'],
            [/{I}/gi, '[I]'],
            [/{\/I}/gi, '[/I]'],
            [/{NL}/gi, '\n'],
            [/{CENTER}/gi, '[CENTER]'],
            [/{\/CENTER}/gi, '[/CENTER]'],
            [/{SIZE_PEQ}/gi, '[size=8]'],
            [/{SIZE_MED}/gi, '[size=12]'],
            [/{SIZE_GRA}/gi, '[size=16]'],
            [/{\/SIZE}/gi, '[/SIZE]'],
            [/{\/COLOR}/gi, '[/COLOR]'],
            [/{PLAYER}/gi, ''],
            [/{\/PLAYER}/gi, ''], 
            [/{ENLACE_SCRIPT}/gi, '[URL="' + url_script + '"]' + txt_firma + '[/URL]'] ];
            

        for(var i = 0; i < colores.length; i++)
            patron = patron.replace(colores[i][0],'[COLOR="' + colores[i][1] + '"]');
    
    }
    
   
    
    for(var i = 0; i < marcas.length; i++)
        patron = patron.replace(marcas[i][0],marcas[i][1]);
  
    
    return patron;
}




function getCapturaMadera() {
    var span = document.getElementById("resources").getElementsByTagName("span")[0];
    if(typeof span == "undefined")
        return 0;
    else 
        return span.innerHTML;
}


function getCapturaPiedra() {
    var span = document.getElementById("resources").getElementsByTagName("span")[1];
    if(typeof span == "undefined")
        return 0;
    else 
        return span.innerHTML;
}


function getCapturaPlata() {
    var span = document.getElementById("resources").getElementsByTagName("span")[2];
    if(typeof span == "undefined")
        return 0;
    else 
        return span.innerHTML;
}


function getCapturaBotin() {
    var botin = document.getElementById("resources").getElementsByTagName("span")[3];
    
    if(typeof botin == "undefined")
        return LANG.botin + "0";
    else {
        botin = botin.innerHTML;
    
        if(botin.length > 0) {
            botin = botin.replace(LANG.botin, "");
            var p1 = parseInt(botin.split("/")[0]);
            var p2 = parseInt(botin.split("/")[1]);
            var porcentaje = parseInt(p1/p2*100);
            botin = LANG.botin + mostrarNumero(p1) + " / " + mostrarNumero(p2) + " (" + porcentaje + LANG.capacidad;
        }
        
        return botin;
    }
}


function getFechaBatalla() {
    return document.getElementById("report_date").textContent;
}


function getTipoInforme() {
	var ret = "nada";
	
	var tipo = document.getElementById("report_arrow").innerHTML;
	
	if(tipo.indexOf("attack.png") != -1) ret = "batalla";
	if(tipo.indexOf("espionage.png") != -1) ret = "espionaje";
	
	return ret;
}



// ============================================================
// ============================================================

// COMPROBADOR DE ACTUALIZACIONES (SCRIPT)


var checkUPDATE = function() {
    var version = UPDATE.version;
    var uurl = UPDATE.check;
	var now = new Date();
	var str = GM_getValue('lastupdate');
    var hDif = 99999;
    var lastCheck;
    
    if(typeof str != 'undefined') {
        lastCheck = new Date(str);
        hDif = Math.abs(Math.floor((now-lastCheck)/(1000*60*60)));
    }

	
	this.init = function() {
		if(hDif >= UPDATE.minHours) {
			GM_setValue('lastupdate',now.toString());
			this.check();	
		}
        else {
            var ant_check = GM_getValue('checkver');
            if(typeof ant_check != 'undefined') {
                var thisver = parseInt(version.replace(/\./g,''))+100;
                if(parseInt(ant_check)>thisver){
                    this.doupdate(null,true);
                }
            }
        }
	}

	this.check = function() {
       GM_xmlhttpRequest({
            method:"GET",
            url:uurl,
            headers: {
                "Expires":"Mon, 26 Jul 1997 05:00:00 GMT",
                "Last-Modified":"Sun, 25 Jul 2004 16:12:09 GMT",
                "Cache-Control":"no-cache, must-revalidate",
                "Pragma":"nocache"
            },
            onreadystatechange:this.doupdate});
	}

	this.doupdate = function(o, force) {
	   var show = false
	   if(arguments.length == 2){
	       if(force) show = true;
       }
       else {
            if(o.readyState == 4) {
                checkver = o.responseText.substr(0,100);
                checkver = checkver.split('@version')[1];
                checkver = parseInt(checkver.replace(/\./g,''))+100;
                thisver = parseInt(version.replace(/\./g,''))+100;
                if(checkver>thisver) {
                    GM_setValue('checkver', checkver); 
                    show = true;
                }
            }
        }
        
        if(show) {
            var divA = document.createElement('div');
            var html = '<div style="position:absolute;position:fixed;bottom:0;left:0;padding:0.2em 0.35em;color:#FFFFFF;background:#FF0000;font-weight:bold;font-size:small;z-index:99;"';
            html += '<a href="' + UPDATE.install + '" style="color:#FFFFFF">' + LANG.update + '</a></div>';
            divA.innerHTML = html;
            document.body.appendChild(divA);
        }
            
	}
    
    this.init();
}



// ============================================================
// ============================================================

// ESPIONAJE


function espionaje() {

    var listaTropas = '';
    var listaEdificios = '';
    var obj = getElementsByClass("report_unit");
  
    for (var i=0; i<obj.length; i++ ) {
        idTipo = obj[i].className;
        tipo = getTipoUnidad(idTipo);
        
        if(tipo != '') {
            // ---- TROPAS ----
            unidades = getElementsByClass("place_unit_white", obj[i])[0].innerHTML;
            listaTropas += '{COLOR_ATAQ}' + tipo + ' {B}' + unidades + '{/B}{/COLOR}{NL}';
        }
        else {
            // ---- EDIFICIOS ----
            tipo = getTipoEdificio(obj[i].id);
            nivel = getElementsByClass("place_unit_white", obj[i])[0].innerHTML;
            listaEdificios += '{COLOR_DEF}' + tipo + ' {B}' + nivel + '{/B}{/COLOR}{NL}';
        }
    }
    
    patron = '';
    patron += '{CENTER}'
    patron += '{SIZE_PEQ}{I}' + getFechaBatalla() + '{/I}{/SIZE}{NL}'
    patron += '{SIZE_GRA}{B}' + LANG.infEsp + '{/B}{/SIZE}{NL}{NL}'
    patron += '{SIZE_MED}{PLAYER}' + getNombreDefensor() + '{/PLAYER}{/SIZE}{NL}';
    patron += getCiudadDefensor() + '{NL}{NL}';
    patron += '{I}{B}' + mostrarNumero(getCapturaMadera()) + '{/B} {MADERA}, {B}' + mostrarNumero(getCapturaPiedra()) + '{/B} {PIEDRA}, {B}' + mostrarNumero(getCapturaPlata()) + "{/B} {PLATA} {/I}{NL}{NL}";
    patron += '{SIZE_MED}{COLOR_ATAQ}{B}' + LANG.tropas + ' {/B}{/COLOR}{/SIZE}{NL}'
    patron += listaTropas + '{NL}';
    patron += '{SIZE_MED}{COLOR_DEF}{B}' + LANG.edificios + ' {/B}{/COLOR}{/SIZE}{NL}'
    patron += listaEdificios + '{NL}';
    patron += '{SIZE_PEQ}{ENLACE_SCRIPT}{/SIZE}';
    patron += '{/CENTER}';
}



// ============================================================
// ============================================================

// BATALLA

function batalla () {
    
    var listaAtaq = "";
    var listaDef = "";
    
    var costeMaderaAtaq = 0;
    var costePiedraAtaq = 0;
    var costePlataAtaq = 0;
    var costePoblacionAtaq = 0;
    
    var costeMaderaDef = 0;
    var costePiedraDef = 0;
    var costePlataDef = 0;
    var costePoblacionDef = 0;
    
    // ---- ATACANTE ----
          
    var atacante = getElementsByClass("report_side_attacker_unit");
	
	var sobrehumana= document.getElementById("strength_of_heroes"); // poder fuerza sobrehumana (+10% fuerza terrestre)

    
    for (var i=0; i<atacante.length; i++ ) {
        unidades = getElementsByClass("place_unit_white", atacante[i])[0].innerHTML;
        perdidas = parseInt(getElementsByClass("report_losts", atacante[i])[0].innerHTML)*-1;
        idTipo = getElementsByClass("report_unit", atacante[i])[0].className;
        tipo = getTipoUnidad(idTipo);
        if(tipo != "") {
            listaAtaq += '{COLOR_ATAQ}' + tipo + ' {B}' + unidades + '{/B} {I}' + LANG.perdio + '{/I} {/COLOR}{B}{COLOR_ATAQ2}' + perdidas + '{/COLOR}{/B}{NL}';
            costeMaderaAtaq += perdidas * getCosteMadera(idTipo);
            costePiedraAtaq += perdidas * getCostePiedra(idTipo);
            costePlataAtaq += perdidas * getCostePlata(idTipo);
            costePoblacionAtaq += perdidas * getCostePoblacion(idTipo);
        }
    }
    
    // ---- DEFENSOR ----
    
    var defensor = getElementsByClass("report_side_defender_unit");
    
    for (var i=0; i<defensor.length; i++ ) {
        unidades = getElementsByClass("place_unit_white", defensor[i])[0].innerHTML;
        perdidas = parseInt(getElementsByClass("report_losts", defensor[i])[0].innerHTML)*-1;
        idTipo = getElementsByClass("report_unit", defensor[i])[0].className;
        tipo = getTipoUnidad(idTipo);
        if(tipo != '') {
            listaDef += '{COLOR_DEF}' + tipo + ' {B}' + unidades + '{/B} {I}' + LANG.perdio + '{/I} {/COLOR}{COLOR_DEF2}{B}' + perdidas + '{/B}{/COLOR}{NL}';
            costeMaderaDef += perdidas * getCosteMadera(idTipo);
            costePiedraDef += perdidas * getCostePiedra(idTipo);
            costePlataDef += perdidas * getCostePlata(idTipo);
            costePoblacionDef += perdidas * getCostePoblacion(idTipo);
             }
    		else {
			listaDef += '{COLOR_DEF}' + LANG.noReportadas + ' {B}?{/B} {I}' + LANG.perdio + '{/I} {/COLOR}{COLOR_DEF2}{B}?{/B}{/COLOR}{NL}';
		}
    }
    
    if(listaDef == "") listaDef = '{I}{COLOR_DEF}' + LANG.sinDef + '{/COLOR}{/I}{NL}';
    
    var rMadera = parseInt(getCapturaMadera()) - costeMaderaAtaq;
    var rPiedra = parseInt(getCapturaPiedra()) - costePiedraAtaq;
    var rPlata = parseInt(getCapturaPlata()) - costePlataAtaq;
    var perdidasAtaq = costeMaderaAtaq + costePiedraAtaq + costePlataAtaq;
    var perdidasDef = costeMaderaDef + costePiedraDef + costePlataDef;
    var perdidasTot = perdidasAtaq + perdidasDef;
            
    patron = '';            
    patron += '{CENTER}{SIZE_MED}' + LANG.batallaDia + getFechaBatalla() + '{/SIZE}{NL}{NL}';
    patron += '{SIZE_GRA}{B}' + LANG.atacante + '{PLAYER}' + getNombreAtacante() + '{/PLAYER}{/B}{/SIZE}' + '{SIZE_MED}{B}' + ' (' + 
                mostrarNumero(costePoblacionAtaq) + '{/B}){/SIZE}'  + '{NL}';
	
	if(sobrehumana != null) patron += LANG.sobrehumana + '{NL}';
	
    patron += '{I}' + getMoral()  + ' ' + getSuerte() +  '{/I}{NL}';

    patron += listaAtaq;
    patron += '{SIZE_GRA}{B}' + LANG.defensor + '{PLAYER}' + getNombreDefensor() + '{/PLAYER}{/B}{/SIZE}' + '{SIZE_MED}{B}' + ' (' + 
                mostrarNumero(costePoblacionDef) + '{/B}){/SIZE}'  + '{NL}';
	
    patron += '{I}' + getMuralla() + '{/I}{NL}';
    patron += listaDef;
    patron += '{/CENTER}';
}  

// ============================================================
// ============================================================



    

    if( location.href.indexOf('grepolis.com/game/report?id=') != -1){
        
		
		// seleccion del idioma
		var LANG = LANG_EN;
		var server = location.href;
		
		server = server.replace("http://","");
		var id_lang = server[0] + server[1];

		if(id_lang == "es") LANG = LANG_ES;
		if(id_lang == "pt") LANG = LANG_PT;
		
		
	
		
		
		
		var tipo = getTipoInforme();
		
		if(tipo == "batalla") batalla();
		if(tipo == "espionaje") espionaje();
		
            
        if(patron != '') {
        
            // ---- FORO GENERAL ----
            
            html = '<div align="center"><table border="0" width="50%"><tr><td>';
            html += '<p><center><textarea name="txtBB" style="background-color:#767F88;width:250px;height:50px;border: 2px solid #990000;" rows="5" cols="20" onFocus="javascript:this.select()">'
            html += codificar(patron, 'FORO_GENERAL');
            html += '</textarea><br><span style="color: #FFFFFF">' + LANG.fpub + '</span></p></center></td>';
            
            // ---- FORO ALIANZA ----
            
            html += '<td><p><center><textarea name="txtBB" style="background-color:#767F88;width:250px;height:50px;border: 2px solid #990000;" rows="5" cols="20" onFocus="javascript:this.select()">';
            html += codificar(patron, 'FORO_ALIANZA');
            html += '</textarea><br><span style="color: #FFFFFF">' + LANG.fali + '</span></p></center></td></tr>';
            
            // ---- PREVISUALIZACION ----
            
            html += '<tr><td colspan="2" height="300" bgcolor="#FEE0A0" style="border: 2px solid #990000;">';
            html += codificar(patron, 'HTML');
            html += '<br><br></center>';
            html += '</td></tr>'
            html += '</table></div>';
            
            document.body.innerHTML +=  html;
        }
            
    }
    
}) ()

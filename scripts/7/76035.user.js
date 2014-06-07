// ==UserScript==
// @version	       1.08
// @name           estimation des productions
// @author         Shade Fighter
// @date           2010-05-01
// @namespace      OGame
// @description    Ogame redesign
// @include        http://*.ogame.*/game/index.php?page=resourceSettings*
// ==/UserScript==


(function () {
    
    
var UPDATE = {
	 name: "estimation des productions"
	,check: "http://userscripts.org/scripts/review/73101.txt"
	,install: "http://userscripts.org/scripts/source/73101.user.js"
	,version: "1.08"
    ,msg: ""
    ,minHours: 1
};
    
var LANG_EN = {
    newVer: "Nouvelle version (CLIC ICI POUR INSTALLER)"
    ,domain: "*"
    ,produccion_imp: "Production Totale, "
    ,recplaneta: "Ressources "
    ,almacen_tiempo: "Storage and filling time"
    ,metal: "Metal"
    ,cristal: "Cristal"
    ,deuterio: "Deuterium"
    ,metal_geo: "Metal (Geologist)"
    ,cristal_geo: "Cristal (Geologist)"
    ,deuterio_geo: "Deuterium (Geologist)"
    ,total: "Production de Metal (M+C+D)"
    ,en_metal: "en metal (3x2x1 ratio)"
    ,diaria: "Jour"
    ,semanal: "Semaine"
    ,mensual: "Mois"
    ,planetas: "Planete"
    ,produccion: "Production"
    ,excedentes: "Excedents"
    ,dia: "Jour"
    ,semana: "Semaine"
    ,falta_rec: "Ressources necessaire pour faire"
    ,produccion_flota: "Estimation de production de flotte"
    ,produccion_def: "Estimation de production de défense"
    ,producc_diaria: "Prod par jour"
    ,sin_geologo: "sans geologue"
    ,con_geologo: "avec geologue"
    ,bbcode_sin: "BBCode pour forum (sans geoloque)"
    ,bbcode_con: "BBCode pour forum (avec geologue)"
    ,msg_error: "Error in the data? <br> Test to install the latest version of the script and if the error continues please use the forum to comment on the error<br>Do you want the script in your language? Help us to translate"
    ,translate_by: ""
    
    ,p_carga: "P.T"
    ,g_carga: "G.T"
    ,c_ligero: "Chlé"
    ,c_pesado: "Chlo"
    ,crucero: "Cro"
    ,nbatalla: "V.B"
    ,colonizador: "V.C"
    ,reciclador: "Cyclo"
    ,sonda: "Sonde"
    ,bombardero: "Bb"
    ,destructor: "Destro"
    ,edlm: "RIP"
    ,acorazado: "Traq"
    ,satelite: "Sat sol"
    
    ,lanzamisiles: "LM"
    ,laser_peq: "Llé"
    ,laser_gra: "Llo"
    ,c_gaus: "Gaus"
    ,c_ionico: "Ion"
    ,c_plasma: "Plasma "
    ,m_anti: "M I"
    ,m_plan: "MIP"
    
    ,h_hora: "h"
    ,d_dia: "d"
    ,s_semana: "w"
};

    

var LANG_EN = {
    newVer: "new version available (CLICK HER TO INSTALL)"
    ,domain: "*"
    ,produccion_imp: "Imperial Production, "
    ,recplaneta: "Resources for planets"
    ,almacen_tiempo: "Storage and filling time"
    ,metal: "Metal"
    ,cristal: "Crystal"
    ,deuterio: "Deuterium"
    ,metal_geo: "Metal (Geologist)"
    ,cristal_geo: "Crystal (Geologist)"
    ,deuterio_geo: "Deuterium (Geologist)"
    ,total: "Total production (M+C+D)"
    ,en_metal: "In metal (3x2x1 ratio)"
    ,diaria: "Daily"
    ,semanal: "Weekly"
    ,mensual: "Monthly"
    ,planetas: "planets"
    ,produccion: "Production"
    ,excedentes: "Excess days"
    ,dia: "Day"
    ,semana: "Week"
    ,falta_rec: "Resources necessary to obtain"
    ,produccion_flota: "Estimated production fleet"
    ,produccion_def: "Estimated production defenses"
    ,producc_diaria: "Daily Production"
    ,sin_geologo: "No Geologist"
    ,con_geologo: "With Geologist"
    ,bbcode_sin: "BBCode for forum (NO geologist)"
    ,bbcode_con: "BBCode for forum (WITH geologist)"
    ,msg_error: "Error in the data? <br> Test to install the latest version of the script and if the error continues please use the forum to comment on the error<br>Do you want the script in your language? Help us to translate"
    ,translate_by: ""
    
    ,p_carga: "Small Cargo"
    ,g_carga: "Large Cargo"
    ,c_ligero: "Light Fighter"
    ,c_pesado: "Heavy Fighter"
    ,crucero: "Cruiser"
    ,nbatalla: "Battleship"
    ,colonizador: "Colony Ship"
    ,reciclador: "Recycler"
    ,sonda: "Espionage Probe"
    ,bombardero: "Bomber"
    ,destructor: "Destroyer"
    ,edlm: "Deathstar"
    ,acorazado: "Battlecruiser"
    ,satelite: "Solar Satellite"
    
    ,lanzamisiles: "Rocket Launcher"
    ,laser_peq: "Light Laser"
    ,laser_gra: "Heavy Laser"
    ,c_gaus: "Gauss Cannon"
    ,c_ionico: "Ion Cannon"
    ,c_plasma: "Plasma Turret"
    ,m_anti: "Anti-Ballistic M."
    ,m_plan: "Interp. M."
    
    ,h_hora: "h"
    ,d_dia: "d"
    ,s_semana: "w"
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
    var nNmb = String(parseInt(num)); 
    var sRes = "";
    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
        sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
	return sRes;
}


function getPosActual () {
    var planets = getElementsByClass("smallplanet");
    var numPlanets = planets.length;
    if(numPlanets==1) {
        var cord = getElementsByClass("planet-koords", planets[0]);
        return(cord[0].innerHTML);
    }
    else {
    
        var planets = getElementsByClass("active");
        
        for (var i=0; i<planets.length; i++ ) {
            var cord = getElementsByClass("planet-koords", planets[i]);
            return cord[0].innerHTML   
        }
    }
}


function getNombreJugador () {
    var pn = document.getElementById("playerName");
    var nombre = getElementsByClass("textBeefy", pn);
        return nombre[0].innerHTML;
}


function geologoActivo() {
    var salida = false;
    var oficiales = document.getElementById("officers").getElementsByTagName("a");
    var geologo = oficiales[3].getElementsByTagName("img");

    if(geologo[0].src.indexOf("game/img/layout/geologe_ikon.gif") != -1) {
        salida = true;
    }
    
    return salida;
}


function getFecha()  {
    var fecha=new Date();
    var diames=fecha.getDate();
    var mes=fecha.getMonth() +1 ;
    var ano=fecha.getFullYear();

    var textomes = new Array (12);
      textomes[1]="Enero";
      textomes[2]="Febrero";
      textomes[3]="Marzo";
      textomes[4]="Abril";
      textomes[5]="Mayo";
      textomes[6]="Junio";
      textomes[7]="Julio";
      textomes[7]="Agosto";
      textomes[9]="Septiembre";
      textomes[10]="Octubre";
      textomes[11]="Noviembre";
      textomes[12]="Diciembre";
      
    return(diames + "-" + textomes[mes] + "-" + ano);        
}



function borrarCookies() {
    var sep = document.cookie.split(";");
    
    for(var k = 0; k < sep.length; k++){
            cookie = sep[k].split("=");
            nombre = cookie[0];
            valor = cookie[1];
            
            if(nombre.indexOf("ogres_") != -1)
                document.cookie = nombre + "=; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
}


function generarFilaProduccion(nombre, pM, pC, pD, cM, cC, cD, c) {
    var salida = "";
    var diario = 0;
    
    if(pD == 0) {
        diario = parseInt(Math.min(pM/cM,pC/cC));
    } else {
        diario = parseInt(Math.min(pM/cM,pC/cC, pD/cD));
    }
        
    if(isNaN(diario))
        diario = 0;
    
    var exM = pM - (diario*cM);
    var exC = pC - (diario*cC);
    var exD = pD - (diario*cD);
    
    salida += '<tr class="' + c + '"><td class="label">' + nombre + '</td><td class="undermark"><b>'
    salida += mostrarNumero(diario) + '</b></td><td class="undermark">' + mostrarNumero(diario*7) + '</td><td>';
    salida += mostrarNumero(exM) + '</td><td>';
    salida += mostrarNumero(exC) + '</td><td>';
    salida += mostrarNumero(exD) + '</td></tr>'
    
    return(salida);
}


function getColumnas(tabla){
    return tabla.rows[0].cells.length;
}

function getFilas(tabla){
	return tabla.rows.length;
}

function getContenido(tabla, fila, col)
{
    var rowElem = tabla.rows[fila];
    var tdValue = rowElem.cells[col].innerHTML;
    return tdValue;
}

function A(almacen) {
    var ret = '-';
    
    if(typeof almacen != 'undefined') {
    
        almacen = almacen.replace('.', '');
    
        if(almacen.indexOf('M') != -1) {
            almacen = almacen.replace('M','');
            almacen = almacen.replace(',', '.');
            almacen = parseFloat(almacen) * 1000000;
        }    
        almacen = parseInt(almacen)/1000;
        ret = mostrarNumero(almacen) + " k";
    }
    
    return ret
}


function getTiempoLlenado(produccion, almacen) {
    var ret = '-';
    
    if(typeof almacen != 'undefined' && produccion > 0) {

        almacen = almacen.replace('.', '');    
    
        if(almacen.indexOf('M') != -1) {
            almacen = almacen.replace('M','');
            almacen = almacen.replace(',', '.');
            almacen = parseFloat(almacen) * 1000000;
        }
        
        almacen = parseInt(almacen);
        produccion = parseInt(produccion) / 24;
        horas = parseInt(almacen/produccion);
        
        if(horas > 24) {
            dias = horas/24;
            if(dias > 7) {
                semanas = dias / 7;
                ret = parseInt(semanas) + LANG.s_semana + " " + parseInt(dias % 7) + LANG.d_dia;
                
            }else {
                ret = parseInt(dias) + LANG.d_dia + " " + parseInt(horas % 24) + LANG.h_hora;
            }
        }
        else {
            ret = parseInt(horas) + LANG.h_hora;
        }
    }
    
    
    return  ret;
}
// ============================================================
// ============================================================

// COMPROBADOR DE ACTUALIZACIONES


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
            html += '<a href="' + UPDATE.install + '" style="color:#FFFFFF">' + LANG.newVer + '</a></div>';
            divA.innerHTML = html;
            document.body.appendChild(divA);
        }
	}
    
    
    this.init();
}


// ============================================================
// ============================================================
// ============================================================


function translate(text) {
    
    text = text.replace('{RECURSOS_PLANETAS}', LANG.recplaneta)
    text = text.replace('{PRODUCCION_IMPERIAL}', LANG.produccion_imp)
    text = text.replace('{METAL}', LANG.metal)
    text = text.replace('{CRISTAL}', LANG.cristal)
    text = text.replace('{DEUTERIO}', LANG.deuterio)
    text = text.replace('{METAL_GEO}', LANG.metal_geo)
    text = text.replace('{CRISTAL_GEO}', LANG.cristal_geo)
    text = text.replace('{DEUTERIO_GEO}', LANG.deuterio_geo)
    text = text.replace('{SEMANA}', LANG.semana)
    text = text.replace('{DIA}', LANG.dia)
    text = text.replace('{DIARIA}', LANG.diaria)
    text = text.replace('{SEMANAL}', LANG.semanal)
    text = text.replace('{MENSUAL}', LANG.mensual)
    
    text = text.replace('{EXCEDENTES_DIA}', LANG.excedentes)
    text = text.replace('{PRODUCCION}', LANG.produccion)
    text = text.replace('{PRODUCCION_FLOTA}', LANG.produccion_flota)
    text = text.replace('{PRODUCCION_DEFENSAS}', LANG.produccion_def)
    text = text.replace('{ALMACEN_TIEMPO}', LANG.almacen_tiempo)
    text = text.replace('{PLANETAS}', LANG.planetas)
    text = text.replace('{TOTAL}', LANG.total)
    text = text.replace('{PRODUCCION_DIARIA_DE}', LANG.producc_diaria)
    text = text.replace('{SIN_GEOLOGO}', LANG.sin_geologo)
    text = text.replace('{CON_GEOLOGO}', LANG.con_geologo)
    text = text.replace('{MSG_ERROR}', LANG.msg_error)
    text = text.replace('{TRANSLATE_BY}', LANG.translate_by)
    text = text.replace('{BBCODE_CON}', LANG.bbcode_con)
    text = text.replace('{BBCODE_SIN}', LANG.bbcode_sin)
    text = text.replace('{EN_METAL}', LANG.en_metal)
    text = text.replace('{FALTA_REC}', LANG.falta_rec)
    
    text = text.replace('{P_CARGA}', LANG.p_carga)
    text = text.replace('{G_CARGA}', LANG.g_carga)
    text = text.replace('{C_LIGERO}', LANG.c_ligero)
    text = text.replace('{C_PESADO}', LANG.c_pesado)
    text = text.replace('{CRUCERO}', LANG.crucero)    
    text = text.replace('{NBATALLA}', LANG.nbatalla)
    text = text.replace('{COLONIZADOR}', LANG.colonizador)
    text = text.replace('{RECICLADOR}', LANG.reciclador)
    text = text.replace('{SONDA}', LANG.sonda)
    text = text.replace('{BOMBARDERO}', LANG.bombardero)
    text = text.replace('{DESTRUCTOR}', LANG.destructor)
    text = text.replace('{EDLM}', LANG.edlm)
    text = text.replace('{ACORAZADO}', LANG.acorazado)
    text = text.replace('{SATELITE}', LANG.satelite)
    
    text = text.replace('{LANZAMISILES}', LANG.lanzamisiles)
    text = text.replace('{LASER_PEQ}', LANG.laser_peq)
    text = text.replace('{LASER_GRA}', LANG.laser_gra)
    text = text.replace('{C_GAUS}', LANG.c_gaus)
    text = text.replace('{C_IONICO}', LANG.c_ionico)    
    text = text.replace('{C_PLASMA}', LANG.c_plasma)
    text = text.replace('{M_ANTI}', LANG.m_anti)
    text = text.replace('{M_PLAN}', LANG.m_plan)
    
    
    return text;
}




// ============================================================
// ============================================================
// ============================================================



    if( location.href.indexOf('/game/index.php?page=resourceSettings') != -1 ){
        
        var LANG = LANG_EN;
        
        var dom_esp = [ '.ogame.com.es/', '.ogame.es/', '.ogame.com.ar/', '.mx.ogame.org/' ]

        for(var i = 0; i < dom_esp.length; i++) {
            if(location.href.indexOf(dom_esp[i]) != -1) {
                LANG = LANG_ES;
            }
        }
        
        
        // comprobacion de nueva version de script
        window.addEventListener("load", function(){checkUPDATE();}, true);
        
        var planets = getElementsByClass("smallplanet");
        var numPlanets = planets.length;
        
        if ( numPlanets > 0 ) {            

            // ---- recursos del planeta actual ---
            var sumary = getElementsByClass("summary");
            var recurso = getElementsByClass("undermark", sumary[0]);
            
            var p = getPosActual();
            var metal = (recurso[0].innerHTML).replace(".", "");
            var cristal = (recurso[1].innerHTML).replace(".", "");
            var deu = (recurso[2].innerHTML).replace(".", "");
            
            if(parseInt(metal) != 0) { // metal=0? estamos sobre luna
                GM_setValue("ogres_" + p + "_metal", metal);
                GM_setValue("ogres_" + p + "_cristal", cristal);
                GM_setValue("ogres_" + p + "_deu", deu);
            }
            
            // --- capacidad almacen ---
            
            if(parseInt(metal) != 0) { // metal=0? estamos sobre luna
                var tablaR = getElementsByClass("mainRS")[0].getElementsByTagName("table")[0];
                var alm_metal = getContenido(tablaR, getFilas(tablaR)-4, 1);
                var alm_cristal = getContenido(tablaR, getFilas(tablaR)-4, 2);
                var alm_deu = getContenido(tablaR, getFilas(tablaR)-4, 3);
                GM_setValue("ogres_" + p + "_almacen_metal", alm_metal);
                GM_setValue("ogres_" + p + "_almacen_cristal", alm_cristal);
                GM_setValue("ogres_" + p + "_almacen_deu", alm_deu);
            }
            
        
            // --- lista de planetas ---
            var listaPlanetas = "";
            for (var i=0; i<planets.length; i++ ) {
                var cord = getElementsByClass("planet-koords", planets[i]);
                var nombre = getElementsByClass("planet-name", planets[i]); 
                listaPlanetas += cord[0].innerHTML + ";";
                GM_setValue("ogres_" + cord[0].innerHTML + "_nombre", nombre[0].innerHTML);
            }
            
            GM_setValue("ogres_lista", listaPlanetas);
            
            // --- calcular total ---
            var metalTH = 0;
            var cristalTH = 0;
            var deuTH = 0;
            var msgErr = "";
            var sep = listaPlanetas.split(";");
        
            for(var k = 0; k < sep.length; k++){
                if(sep[k].length > 3) {
                    metal = GM_getValue("ogres_" + sep[k] + "_metal");
                    cristal = GM_getValue("ogres_" + sep[k] + "_cristal");
                    deu = GM_getValue("ogres_" + sep[k] + "_deu");
                    if(typeof metal == 'undefined') {
                        msgErr += '<font color="#FF0000"><b> ** {FALTA_REC} ' + sep[k] + '</b></font><br>';
                    } else {
                        metalTH += parseInt(metal);
                        cristalTH += parseInt(cristal);
                        deuTH += parseInt(deu);
                    }
                }   
            }
            
            // --- crea la tabla ---

            
            
            var main = getElementsByClass("mainRS")[0];
            
                        
            var divErr = document.createElement('div');
            var divPorPlanetas = document.createElement('div');
            var divAlmacen = document.createElement('div');
            var divRecursos = document.createElement('div');
            var divBB = document.createElement('div');
            var divBorrarCookie = document.createElement('div');
            var divFlotas = document.createElement('div');
            var divDefensas = document.createElement('div');
            
            var tabla = "";
            var textoBB = "";
            
            var metalD = metalTH*24;
            var metalS = metalD*7;
            var metalM = metalS*4;
            
            var cristalD = cristalTH*24;
            var cristalS = cristalD*7;
            var cristalM = cristalS*4;
            
            var deuD = deuTH*24;
            var deuS = deuD*7;
            var deuM = deuS*4;
            
             // --- tabla con los recursos diarios por planetas
             
            var tablaPlanetas = "";
            tablaPlanetas += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;">';
            tablaPlanetas += '<tr height="50"><td width="25%"></td><td width="25%"></td><td width="25%"></td><td width="25%"></td></tr>';
            tablaPlanetas += '<tr><td align="center" colspan="4"><font size="4" color="#FF6600"><b>* {RECURSOS_PLANETAS} *</b></font></td></tr>';
            tablaPlanetas += '<tr><td colspan="4"></td></tr>';
            tablaPlanetas += '<tr><td></td><td class="label">{METAL}</td><td class="label">{CRISTAL}</td><td class="label">{DEUTERIO}</td></tr>';
            
            //var sep = listaPlanetas.split(";");
            for(var k = 0; k < sep.length; k++){
                if(sep[k].length > 3) {
                    p_metal = GM_getValue("ogres_" + sep[k] + "_metal");
                    p_cristal = GM_getValue("ogres_" + sep[k] + "_cristal");
                    p_deu = GM_getValue("ogres_" + sep[k] + "_deu");
                    if(typeof p_metal == 'undefined') {
                        p_metal = p_cristal = p_deu = "-";
                    }
                    else {
                        p_metal = mostrarNumero(parseInt(p_metal)*24);
                        p_cristal = mostrarNumero(parseInt(p_cristal)*24);
                        p_deu = mostrarNumero(parseInt(p_deu)*24);
                    }
                    
                    var tr = ((k % 2)==0)?'<tr class="alt">':'<tr>';
                    tablaPlanetas += tr + '<td class="label">' + GM_getValue("ogres_" + sep[k] + "_nombre") + '</td><td class="undermark">' + p_metal + '</td><td class="undermark">' + p_cristal + '</td><td class="undermark">' + p_deu + '</td></tr>';
                }   
            }
            
            tablaPlanetas += '<tr><td colspan="4"></td></tr>';
            tablaPlanetas += '</table>';

            
            
            // --- tabla con los almacenes
             
            var tablaAlmacen = "";
            tablaAlmacen += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;">';
            tablaAlmacen += '<tr height="50"><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
            tablaAlmacen += '<tr><td align="center" colspan="7"><font size="4" color="#FF6600"><b>* {ALMACEN_TIEMPO} * </b></font></td></tr>';
            tablaAlmacen += '<tr><td colspan="4"></td></tr>';
            tablaAlmacen += '<tr><td></td><td class="label">{METAL}</td><td class="label"></td><td class="label">{CRISTAL}</td><td class="label"></td><td class="label">{DEUTERIO}</td><td class="label"></td></tr>';
            
            for(var k = 0; k < sep.length; k++){
                if(sep[k].length > 3) {
                    p_metal = GM_getValue("ogres_" + sep[k] + "_metal");
                    p_cristal = GM_getValue("ogres_" + sep[k] + "_cristal");
                    p_deu = GM_getValue("ogres_" + sep[k] + "_deu");
                    if(typeof p_metal == 'undefined') {
                        p_metal = p_cristal = p_deu = "-";
                    }
                    else {
                        p_metal = parseInt(p_metal)*24;
                        p_cristal = parseInt(p_cristal)*24;
                        p_deu = parseInt(p_deu)*24;
                    }

                    a_metal = GM_getValue("ogres_" + sep[k] + "_almacen_metal");
                    a_cristal = GM_getValue("ogres_" + sep[k] + "_almacen_cristal");
                    a_deu = GM_getValue("ogres_" + sep[k] + "_almacen_deu");
                    
                    var tr = ((k % 2)==0)?'<tr class="alt">':'<tr>';
                    tablaAlmacen += tr + '<td class="label">' + GM_getValue("ogres_" + sep[k] + "_nombre") + '</td><td class="undermark">' + A(a_metal) + '</td><td><p align="center">' + getTiempoLlenado(p_metal,a_metal) +  '</p></td><td class="undermark">' + A(a_cristal) + '</td><td><p align="center">' + getTiempoLlenado(p_cristal,a_cristal) + '</p></td><td class="undermark">' + A(a_deu) + '</td><td><p align="center">' + getTiempoLlenado(p_deu,a_deu) + '</p></td></tr>';
                }   
            }
            
            tablaAlmacen += '<tr><td colspan="4"></td></tr>';
            tablaAlmacen += '</table>';
            
            

            // --- tabla con los recursos diarios/semanales/mensuales

            tabla += '<table cellspacing="0" cellpadding="0" style="margin-top: 0px;">';
            tabla += '<tr height="50"><td width="25%"></td><td width="25%"></td><td width="25%"></td><td width="25%"></td></tr>';
            tabla += '<tr><td align="center" colspan="4"><font size="4" color="#FF6600"><b>* {PRODUCCION_IMPERIAL} ' + getNombreJugador() + ' * </b></font></td></tr>';
            tabla += '<tr><td colspan="4"></td></tr>';
            tabla += '<tr><td></td><td class="label">{DIARIA}</td><td class="label">{SEMANAL}</td><td class="label">{MENSUAL}</td></tr>';
            
            if(geologoActivo()) {
                tabla += '<tr class="alt"><td class="label">{METAL_GEO}</td><td class="undermark">' + mostrarNumero(metalD) + '</td><td class="undermark">' + mostrarNumero(metalS) + '</td><td class="undermark">' + mostrarNumero(metalM) + '</td></tr>';
                tabla += '<tr class=""><td class="label">{CRISTAL_GEO}</td><td class="undermark">' + mostrarNumero(cristalD) + '</td><td class="undermark">' + mostrarNumero(cristalS) + '</td><td class="undermark">' + mostrarNumero(cristalM) + '</td></tr>';
                tabla += '<tr class="alt"><td class="label">{DEUTERIO_GEO}</td><td class="undermark">' + mostrarNumero(deuD) + '</td><td class="undermark">' + mostrarNumero(deuS) + '</td><td class="undermark">' + mostrarNumero(deuM) + '</td></tr>';                
            } else {
                tabla += '<tr class="alt"><td class="label">{METAL}</td><td class="undermark">' + mostrarNumero(metalD) + '</td><td class="undermark">' + mostrarNumero(metalS) + '</td><td class="undermark">' + mostrarNumero(metalM) + '</td></tr>';
                tabla += '<tr class=""><td class="label">{CRISTAL}</td><td class="undermark">' + mostrarNumero(cristalD) + '</td><td class="undermark">' + mostrarNumero(cristalS) + '</td><td class="undermark">' + mostrarNumero(cristalM) + '</td></tr>';
                tabla += '<tr class="alt"><td class="label">{DEUTERIO}</td><td class="undermark">' + mostrarNumero(deuD) + '</td><td class="undermark">' + mostrarNumero(deuS) + '</td><td class="undermark">' + mostrarNumero(deuM) + '</td></tr>';
            }
            
            tabla += '<tr><td colspan="4"></td></tr>';
            tabla += '<tr class=""><td class="label">{TOTAL}</td><td class="nomark">' + mostrarNumero(metalD+cristalD+deuD) + '</td><td class="nomark">' + mostrarNumero(metalS+cristalS+deuS) + '</td><td class="momark">' + mostrarNumero(metalM+cristalM+deuM) + '</td></tr>';
            tabla += '<tr class=""><td class="label">{EN_METAL}</td><td class="nomark">' + mostrarNumero(metalD+(cristalD*1.5)+(deuD*3)) + '</td><td class="nomark">' + mostrarNumero(metalS+(cristalS*1.5)+(deuS*3)) + '</td><td class="momark">' + mostrarNumero(metalM+(cristalM*1.5)+(deuM*3)) + '</td></tr>';
            tabla += '<tr class="" height="50"><td colspan="4">' + numPlanets + ' {PLANETAS}:   ' + listaPlanetas.replace(/;/g, "  ") + '</td></tr></form>';
            tabla += '</table>';
            
            // --- textarea con el BBCode
            
            if(geologoActivo()) {
                
                textoBB += '[size=14][u][b]{PRODUCCION_DIARIA_DE} ' + getNombreJugador() + '[/b][/u] [/size][size=8](' + getFecha() + ') {CON_GEOLOGO}[/size]\n\n';
                textoBB += '[size=12]{METAL}: [color=#9999ff]' + mostrarNumero(metalD) + '[/color]\n';
                textoBB += '{CRISTAL}: [color=#00ff00]' + mostrarNumero(cristalD) + '[/color]\n';
                textoBB += '{DEUTERIO}: [color=#ff00ff]' + mostrarNumero(deuD) + '[/color][/size]\n\n';
                textoBB += '[size=12]{TOTAL}: [color=#999900][size=14]' + mostrarNumero(metalD+cristalD+deuD) + '[/size][/color]\n';
                textoBB += '{EN_METAL}: [color=#ffff00][size=14]' + mostrarNumero(metalD+(cristalD*1.5)+(deuD*3)) + '[/size][/color][/size]\n\n';
                textoBB += "[url='http://userscripts.org/scripts/show/73101']OGameRediseño Recursos Ampliados[/url]\n";
                
                var produccionBB = ""; 
                produccionBB += '<table border="0" width="100%"><tr><td width="50%"><p align="center"><textarea name="txtBB" style="background-color:#767F88;width:200px;height:80px;border: 2px solid #990000;" rows="5" cols="20" onFocus="javascript:this.select()">';
                produccionBB += translate(textoBB);
                produccionBB += '</textarea><br>{BBCODE_CON}</p></td><td width="50%"><p align="center">';
                
                metalDS = ((metalD/24)/1.1)*24;
                cristalDS = ((cristalD/24)/1.1)*24;
                deuDS = ((deuD/24)/1.1)*24;
                
                textoBB = "";
                textoBB += '[size=14][u][b]{PRODUCCION_DIARIA_DE} ' + getNombreJugador() + '[/b][/u] [/size][size=8](' + getFecha() + ') {SIN_GEOLOGO}[/size]\n\n';
                textoBB += '[size=12]{METAL}: [color=#9999ff]' + mostrarNumero(metalDS) + '[/color]\n';
                textoBB += '{CRISTAL}: [color=#00ff00]' + mostrarNumero(cristalDS) + '[/color]\n';
                textoBB += '{DEUTERIO}: [color=#ff00ff]' + mostrarNumero(deuDS) + '[/color][/size]\n\n';
                textoBB += '[size=12]{TOTAL}: [color=#999900][size=14]' + mostrarNumero(metalDS+cristalDS+deuDS) + '[/size][/color]\n';
                textoBB += '{EN_METAL}: [color=#ffff00][size=14]' + mostrarNumero(metalDS+(cristalDS*1.5)+(deuDS*3)) + '[/size][/color][/size]\n\n';
                textoBB += "[url='http://userscripts.org/scripts/show/73101']OGameRediseño Recursos Ampliados[/url]\n";
             
                produccionBB += '<textarea name="txtBB" style="background-color:#767F88;width:200px;height:80px;border: 2px solid #990000;" rows="5" cols="20" onFocus="javascript:this.select()">';
                produccionBB += translate(textoBB);
                produccionBB += '</textarea><br>{BBCODE_SIN}</p></td></tr></table>';
                
            } else {
                textoBB += '[size=14][u][b]{PRODUCCION_DIARIA_DE} ' + getNombreJugador() + '[/b][/u] [/size][size=8](' + getFecha() + ') {SIN_GEOLOGO}[/size]\n\n';
                textoBB += '[size=12]{METAL}: [color=#9999ff]' + mostrarNumero(metalD) + '[/color]\n';
                textoBB += '{CRISTAL}: [color=#00ff00]' + mostrarNumero(cristalD) + '[/color]\n';
                textoBB += '{DEUTERIO}: [color=#ff00ff]' + mostrarNumero(deuD) + '[/color][/size]\n\n';
                textoBB += '[size=12]{TOTAL}: [color=#999900][size=14]' + mostrarNumero(metalD+cristalD+deuD) + '[/size][/color]\n';
                textoBB += '{EN_METAL}: [color=#ffff00][size=14]' + mostrarNumero(metalD+(cristalD*1.5)+(deuD*3)) + '[/size][/color][/size]\n\n';
                textoBB += "[size=8][url='http://userscripts.org/scripts/show/73101']OGameRediseño Recursos Ampliados[/url][/size]\n";
                
                var produccionBB = '<script>function borrarCookies() {var sep = document.cookie.split(";");for(var k = 0; k < sep.length; k++){cookie = sep[k].split("=");nombre = cookie[0];valor = cookie[1];if(nombre.indexOf("ogres_") != -1)document.cookie = nombre + "=; expires=Thu, 01-Jan-70 00:00:01 GMT";}}</script> ';
                produccionBB += '<p align="center"><br><textarea name="txtBB" style="background-color:#767F88;width:200px;height:80px;border: 2px solid #990000;" rows="5" cols="20" onFocus="javascript:this.select()">';
                produccionBB += translate(textoBB);
                produccionBB += '</textarea><br>BBCode para foro<br></p>';
            }
            
            // --- tabla de produccion de flotas ---
            var txtTablaFlotas = "";
            txtTablaFlotas += '<br><br><table cellspacing="0" cellpadding="0" style="margin-top: 0px;">';
            txtTablaFlotas += '<tr><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td></tr>'
            txtTablaFlotas += '<tr><td colspan="6"><font size="4" color="#FF6600"><b>* {PRODUCCION_FLOTA} *</b></font><br><br></tr>'
            txtTablaFlotas += '<tr><td></td><td class="label">{PRODUCCION}</td><td></td><td></td><td class="label">{EXCEDENTES_DIA}</td><td></td></tr>'
            txtTablaFlotas += '<tr><td></td><td class="label">{DIA}</td><td class="label">{SEMANA}</td><td class="label">{METAL}</td><td class="label">{CRISTAL}</td><td class="label">{DEUTERIO}</td></tr>'
            txtTablaFlotas += generarFilaProduccion("{P_CARGA}", metalD, cristalD, deuD, 2000, 2000, 0, "alt");
            txtTablaFlotas += generarFilaProduccion("{G_CARGA}", metalD, cristalD, deuD, 6000, 6000, 0);
            txtTablaFlotas += generarFilaProduccion("{C_LIGERO}", metalD, cristalD, deuD, 3000, 1000, 0, "alt");
            txtTablaFlotas += generarFilaProduccion("{C_PESADO}", metalD, cristalD, deuD, 6000, 4000, 0);
            txtTablaFlotas += generarFilaProduccion("{CRUCERO}", metalD, cristalD, deuD, 20000, 7000, 2000, "alt");
            txtTablaFlotas += generarFilaProduccion("{NBATALLA}", metalD, cristalD, deuD, 45000, 15000, 0);
            txtTablaFlotas += generarFilaProduccion("{COLONIZADOR}", metalD, cristalD, deuD, 10000, 20000, 10000, "alt");
            txtTablaFlotas += generarFilaProduccion("{RECICLADOR}", metalD, cristalD, deuD, 10000, 6000, 2000);
            txtTablaFlotas += generarFilaProduccion("{SONDA}", metalD, cristalD, deuD, 0, 1000,0, "alt");
            txtTablaFlotas += generarFilaProduccion("{BOMBARDERO}", metalD, cristalD, deuD, 50000, 25000, 15000);
            txtTablaFlotas += generarFilaProduccion("{DESTRUCTOR}", metalD, cristalD, deuD, 60000, 50000, 15000, "alt");
            txtTablaFlotas += generarFilaProduccion("{EDLM}", metalD, cristalD, deuD, 5000000, 4000000, 1000000);
            txtTablaFlotas += generarFilaProduccion("{ACORAZADO}", metalD, cristalD, deuD, 30000, 40000, 15000, "alt");
            txtTablaFlotas += generarFilaProduccion("{SATELITE}", metalD, cristalD, deuD, 0, 2000, 500, "");
            txtTablaFlotas += '</table>';
            
            // --- tabla de produccion de defensas ---
            var txtTablaDef = "";
            txtTablaDef += '<br><br><table cellspacing="0" cellpadding="0" style="margin-top: 0px;">';
            txtTablaDef += '<tr><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td><td style="width: 16%"></td></tr>'
            txtTablaDef += '<tr><td colspan="6"><font size="4" color="#FF6600"><b>* {PRODUCCION_DEFENSAS} *</b></font><br><br></tr>'
            txtTablaDef += '<tr><td></td><td class="label">{PRODUCCION}</td><td></td><td></td><td class="label">{EXCEDENTES_DIA}</td><td></td></tr>'
            txtTablaDef += '<tr><td></td><td class="label">{DIA}</td><td class="label">{SEMANA}</td><td class="label">{METAL}</td><td class="label">{CRISTAL}</td><td class="label">{DEUTERIO}</td></tr>'
            txtTablaDef += generarFilaProduccion("{LANZAMISILES}", metalD, cristalD, deuD, 2000, 0, 0, "alt");
            txtTablaDef += generarFilaProduccion("{LASER_PEQ}", metalD, cristalD, deuD, 1500, 500, 0);
            txtTablaDef += generarFilaProduccion("{LASER_GRA}", metalD, cristalD, deuD, 6000, 2000, 0, "alt");
            txtTablaDef += generarFilaProduccion("{C_GAUS}", metalD, cristalD, deuD, 20000, 15000, 2000);
            txtTablaDef += generarFilaProduccion("{C_IONICO}", metalD, cristalD, deuD, 2000, 6000, 0, "alt");
            txtTablaDef += generarFilaProduccion("{C_PLASMA}", metalD, cristalD, deuD, 50000, 50000, 30000);
            txtTablaDef += generarFilaProduccion("{M_ANTI}", metalD, cristalD, deuD, 8000, 0, 2000, "alt");
            txtTablaDef += generarFilaProduccion("{M_PLAN}", metalD, cristalD, deuD, 15500, 2500, 10000);
            txtTablaDef += '</table>';
            
            // --- boton de borrar cookies
            var txtBorrarC = '<script>' + borrarCookies + '</script> ';
            txtBorrarC += '<p align="center"><br><br><br><font size="1">{MSG_ERROR}<br><br><a href="http://board.ogame.com.es/index.php?page=Thread&threadID=1097445" target="_blank">Foro (enlace)</a><br><br><br><a href="http://userscripts.org/scripts/show/73101" target="_blank">OGame-Rediseño Recursos Ampliados by HoChiChaos</a> [version: ' + UPDATE.version +  ']<br><br>{TRANSLATE_BY}<BR></font></p>';
            
            divBorrarCookie.innerHTML = translate(txtBorrarC);
             
            // ---
            divRecursos.innerHTML = translate(tabla);
            divPorPlanetas.innerHTML = translate(tablaPlanetas);
            divAlmacen.innerHTML = translate(tablaAlmacen);
            divErr.innerHTML = translate(msgErr);
            divBB.innerHTML = translate(produccionBB);
            divFlotas.innerHTML = translate(txtTablaFlotas);
            divDefensas.innerHTML = translate(txtTablaDef);
            
            main.appendChild(divRecursos).appendChild(divErr).appendChild(divBB).appendChild(divPorPlanetas).appendChild(divAlmacen).appendChild(divFlotas).appendChild(divDefensas).appendChild(divBorrarCookie); 

	   }
            
    }
    
	
}) ()
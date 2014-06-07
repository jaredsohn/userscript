// ==UserScript==
// @name           Compactator 
// @description    Compactador de Batallas De OGamator basado en trusreno
// @version        1.10
// @author         OGamator (copiado de HoChiChaos)
// @updateURL      http://userscripts.org/scripts/source/167081.meta.js
// @downloadURL    https://userscripts.org/scripts/source/167081.user.js
// @include        http://*es.ogame.gameforge.com/game/index.php?*page=*
// @require        http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==


(function ()
{

var SCRIPT = {
  name: "Compactator"
  ,url: "http://userscripts.org/scripts/show/167081"
  ,version: "1.10"
  ,funciona_ok: "1.10"
};

var url_script = SCRIPT.url;
var txt_firma = SCRIPT.name + ' [' + SCRIPT.version + ' OGamator]';

if((typeof(oGameVersionCheck) != "undefined")) {
  oGameVersionCheck(SCRIPT.name + ' ' + SCRIPT.version, SCRIPT.funciona_ok, SCRIPT.url);
}


if (location.href.indexOf('/game/index.php?page=combatreport') != -1 ) {
	compactar();
}
    
function comprobar () {
    var cr = document.getElementsByClassName("combatreport");
	if (cr != null) compactar();
}
    
setInterval(comprobar, 500);



function SAC() {
    var lstNombres = new Array();
    var lstFlotas = new Array();
    
    this.length = function() {
        return lstNombres.length
    }
    
    this.getNombre = function(n) {
        return lstNombres[n];
    }
	
    
    this.getFlotas = function(n) {
        var ret = null;
        if(isNaN(parseInt(n))) {
            for(var i = 0; i < lstNombres.length; i++) {
                if(lstNombres[i] == n) ret = lstFlotas[i];
            }
        }
        else {
            ret = lstFlotas[n];
        }
        return ret;
    }
    

    this.add = function (nombre, idFlota, unidades) {
        var insertado = false;
        for(var i = 0; i < lstNombres.length; i++) {
            if(lstNombres[i] == nombre) {
                insertado = true;
                if(arguments.length == 3) lstFlotas[i].add(idFlota, unidades);
            }
        }
        if(!insertado) {
            var pos = lstNombres.length;
            lstNombres[pos] = nombre;
            lstFlotas[pos] = new Flota();
            if(arguments.length == 3) lstFlotas[pos].add(idFlota, unidades);
        }
        
    }
    
    this.addSupervivientes = function(s) {
        for(var i = 0; i < s.length(); i++) {
            var nombre = s.getNombre(i);
            for(var j = 0; j < lstNombres.length; j++){
                if(lstNombres[j] == nombre) 
                    lstFlotas[j].addSupervivientes(s.getFlotas(i));
            }
            
        }
    }
    
    
    this.ordenar = function() {
        for(var i = 0; i < lstNombres.length; i++) {
            lstFlotas[i].ordenar();
        }
    }
    
    
    this.getCostePerdidas = function(id) {
        var ret = [0,0,0, 0]; // metal, cristal, deu, total
        
        if(id == -1) {
            for(var i = 0; i < lstNombres.length; i++) {
                var coste = lstFlotas[i].getCostePerdidas();
                ret[0] += coste[0];
                ret[1] += coste[1];
                ret[2] += coste[2];
                ret[3] += coste[3]; 
            }
        }
        else {
            var coste = lstFlotas[id].getCostePerdidas();
            ret[0] += coste[0];
            ret[1] += coste[1];
            ret[2] += coste[2];
            ret[3] += coste[3]; 
        }
        
        
        return ret;
    }
    
}

// ============================================================
// ============================================================


function Flota() {
    var idNombre = new Array();
    var nombre = new Array();
    var unidades = new Array();
    var perdidas = new Array();
    
    var datosFlota = [
    ['P.Carga','Nave pequeña de Carga', 2000,2000,0],
    ['Gr.Carga','Nave grande de Carga', 6000,6000,0],
    ['Cazador L.','Cazador ligero', 3000,1000,0],
    ['Cazador P.','Cazador pesado', 6000,4000,0],
    ['Crucero','Crucero', 20000,7000,2000],
    ['Nave de batalla','Nave de batalla', 45000,15000,0],
    ['Acoraz.','Acorazado', 30000,40000,15000],
    ['Bombardero','Bombardero', 50000,25000,15000],
    ['Destructor','Destructor', 60000,50000,15000],
    ['Est.Muerte','Estrella de la muerte', 5000000,4000000,1000000],
    ['Colonizador','Colonizador', 10000,20000,10000],
    ['Reciclador.','Reciclador', 10000,6000,2000],
    ['Sonda','Sonda de espionaje', 0,1000,0],
    ['Satélite S.','Satélite Solar', 0,2000,500],
    ['Misil', 'Lanzamisiles', 2000,0,0],
    ['Láser Peq.','Láser pequeño', 1500,500,0],
    ['Láser Gr.','Lase grande', 6000,2000,0],
    ['C.Gauss','Cañón Gauss', 20000,15000,2000],
    ['C.Iónico','Cañón Iónico', 2000,6000,0],
    ['C.Plasma','Cañón de Plasma', 50000,50000,30000],
    ['Cúpula Peq.','Cúpula pequeña', 10000,10000,0],
    ['Cúpula Gr.','Cúpula grande', 50000,50000,0]];
    
    
    this.length = function () {
        return idNombre.length;
    }
    
    this.getId = function(n) {
        return idNombre[n];
    }
    
    this.getNombre = function(n) {
        var id = idNombre[n]
        var ret = id;
        for(var i = 0; i < datosFlota.length; i++) {
            if(id == datosFlota[i][0]) ret = datosFlota[i][1];
        }
        return ret;
    }
    
    this.getUnidades = function(n) {
        return unidades[n];
    }
    
    this.getPerdidas = function(n) {
        return perdidas[n];
    }
    
    this.add = function(id, u) {
        var insertado = false;
        for(var i = 0; i < idNombre.length; i++) {
            if(idNombre[i] == id) {
                insertado = true;
                unidades[i] += parseInt(u);
                perdidas[i] += parseInt(u);
            }
        }
        
        if(!insertado) {
            var pos = idNombre.length;
            idNombre[pos] = id;
            nombre[pos] = '';
            unidades[pos] = parseInt(u);
            perdidas[pos] = parseInt(u);
        }
    }
    
    
    this.addSupervivientes = function(f) {
        for(var i = 0; i < f.length(); i++) {
            for(var j = 0; j < idNombre.length; j++) {
                if(idNombre[j] == f.getId(i)) {
                    perdidas[j] -= parseInt(f.getUnidades(i));
                }
            }
        }
    }
    
    
    this.ordenar = function() {
        var n_idNombre = new Array();
        var n_nombre = new Array();
        var n_unidades = new Array();
        var n_perdidas = new Array();
        
        var contador = 0;
           
        for(var i = 0; i < datosFlota.length; i++) {
            for(var j = 0; j<idNombre.length; j++) {
                if(idNombre[j] == datosFlota[i][0]) {
                    n_idNombre[contador] = idNombre[j];
                    n_nombre[contador] = datosFlota[i][1];
                    n_unidades[contador] = unidades[j];
                    n_perdidas[contador] = perdidas[j];
                    contador++;
                }
            }
        }
        idNombre = n_idNombre;
        nombre = n_nombre;
        unidades = n_unidades;
        perdidas = n_perdidas;
    }
    
    
    this.getCostePerdidas = function() {
        var ret = [0,0,0, 0];
        for(var i = 0; i < idNombre.length; i++) {
            for(var j = 0; j < datosFlota.length; j++) {
                if(idNombre[i] == datosFlota[j][0]) {
                    ret[0] += (perdidas[i] * datosFlota[j][2]);
                    ret[1] += (perdidas[i] * datosFlota[j][3]);
                    ret[2] += (perdidas[i] * datosFlota[j][4]);
                    ret[3] += ((perdidas[i] * datosFlota[j][2]) + (perdidas[i] * datosFlota[j][3]) + (perdidas[i] * datosFlota[j][4]));
                }
            }
        }
        return ret;
    }
    
    
}


// ============================================================
// ============================================================


function getElementsByClass(cls) {
  var itemsfound = new Array;
  var elements = document.getElementsByTagName('*');
  for(var i=0;i<elements.length;i++){
  if(elements[i].className == cls){
  itemsfound.push(elements[i]);
  }
  }
  return itemsfound;
}

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

function N(num) {
    var ret = new Array();
    
    if(typeof num == 'object') {
        for(var i = 0; i < num.length; i++) {
            ret[i] = mostrarNumero(num[i]);
        }
        return ret;
    }
    else {   
        return mostrarNumero(num);
    }
}


function codificar(patron, tipo, version) {

    var marcas = new Array();
   
    patron = '{CENTER}' +  patron + '{/CENTER}';
    
    var colores = [
        [/{COLOR_R1}/gi, '#FFCC66'],
        [/{COLOR_R2}/gi, '#9E7625'],
        [/{COLOR_R3}/gi, '#FF0000'], //escombros
        [/{COLOR_R4}/gi, '#F0EC64'], //rec.robo
        [/{COLOR_T1}/gi, '#6699FF'], // titulo 1 ("defensores", "atacantes", "perdidas", y "rentabilidad"
        [/{COLOR_A1}/gi, '#00FF40'],
        [/{COLOR_A2}/gi, '#00DDDD'],
        [/{COLOR_D1}/gi, '#ED7010'], 
        [/{COLOR_RB}/gi, '#007F22'], // resultado batalla
        [/{COLOR_RECI}/gi, '#00CC00'], // atacante reciclando
        [/{COLOR_SINRECI}/gi, '#FFFF00'], // atacante sin reciclar
        [/{COLOR_RECIDEF}/gi, '#FF6600'], // reciclando defensor
        [/{COLOR_D2}/gi, '#00DDDD']];


    if(tipo == "HTML") {
    
        marcas = [
            [/{B}/gi, '<b>'],
            [/{\/B}/gi, '</b>'],
            [/{I}/gi, '<i>'],
            [/{\/I}/gi, '</i>'],
            [/{NL}/gi, '<br>\n'],
            [/{CENTER}/gi, '<center>'],
            [/{\/CENTER}/gi, '</center>'],
            [/{SIZE_PEQ}/gi, '<font style="font-size:8pt;">'],
            [/{SIZE_MED}/gi, '<font style="font-size:14pt;">'],
            [/{SIZE_GRA}/gi, '<font style="font-size:18pt;">'],
            [/{\/SIZE}/gi, '</font>'],
            [/{\/COLOR}/gi, '</font>'] ];
            
        patron = patron.replace(/{ENLACE_SCRIPT}/gi, '<a href="' + url_script + '">' + txt_firma + '</a>');

        for(var i = 0; i < colores.length; i++)
            patron = patron.replace(colores[i][0],'<font color="' + colores[i][1] + '">');
    }
    
    if(tipo == "OGame") {
    
        marcas = [
            [/{B}/gi, '[B]'],
            [/{\/B}/gi, '[/B]'],
            [/{I}/gi, '[I]'],
            [/{\/I}/gi, '[/I]'],
            [/{NL}/gi, '\n'],
            [/{CENTER}/gi, '[ALIGN=CENTER]'],
            [/{\/CENTER}/gi, '[/ALIGN]'],
            [/{SIZE_PEQ}/gi, '[SIZE=10]'],
            [/{SIZE_MED}/gi, '[SIZE=14]'],
            [/{SIZE_GRA}/gi, '[SIZE=18]'],
            [/{\/SIZE}/gi, '[/SIZE]'],
            [/{\/COLOR}/gi, '[/COLOR]'] ];
            
        patron = patron.replace(/{ENLACE_SCRIPT}/gi, '[url="' + url_script + '"]' + txt_firma + '[/URL]');

        for(var i = 0; i < colores.length; i++)
            patron = patron.replace(colores[i][0],'[COLOR="' + colores[i][1] + '"]');
    }
    
    
    if(tipo == "phpBB") {
    
        marcas = [
            [/{B}/gi, '[b]'],
            [/{\/B}/gi, '[/b]'],
            [/{I}/gi, '[i]'],
            [/{\/I}/gi, '[/i]'],
            [/{NL}/gi, '\n'],
            [/{CENTER}/gi, '[ALIGN=CENTER]'],
            [/{\/CENTER}/gi, '[/ALIGN]'],
            [/{SIZE_PEQ}/gi, '[size=9]'],
            [/{SIZE_MED}/gi, '[size=14]'],
            [/{SIZE_GRA}/gi, '[size=18]'],
            [/{\/SIZE}/gi, '[/size]'],
            [/{\/COLOR}/gi, '[/color]'] ];
            
        patron = patron.replace(/{ENLACE_SCRIPT}/gi, '[url=' + url_script + ']' + txt_firma + '[/URL]');

        for(var i = 0; i < colores.length; i++)
            patron = patron.replace(colores[i][0],'[color=' + colores[i][1] + ']');
    }
    
    
   if(tipo == "phpBB3") {
    
        marcas = [
            [/{B}/gi, '[b]'],
            [/{\/B}/gi, '[/b]'],
            [/{I}/gi, '[i]'],
            [/{\/I}/gi, '[/i]'],
            [/{NL}/gi, '\n'],
            [/{CENTER}/gi, '[center]'],
            [/{\/CENTER}/gi, '[/center]'],
            [/{SIZE_PEQ}/gi, '[size=90]'],
            [/{SIZE_MED}/gi, '[size=140]'],
            [/{SIZE_GRA}/gi, '[size=180]'],
            [/{\/SIZE}/gi, '[/size]'],
            [/{\/COLOR}/gi, '[/color]'] ];
            
        patron = patron.replace(/{ENLACE_SCRIPT}/gi, '[url=' + url_script + ']' + txt_firma + '[/URL]');

        for(var i = 0; i < colores.length; i++)
            patron = patron.replace(colores[i][0],'[color=' + colores[i][1] + ']');
    }
    
    
    for(var i = 0; i < marcas.length; i++)
        patron = patron.replace(marcas[i][0],marcas[i][1]);
    
    
    return patron;
}



// ============================================================
// ============================================================


function getLuna() {
   var salida = "";
   var ret = new Array();
   var cresult = document.getElementById('combat_result');
   var str_luna = getElementsByClass('action',cresult)[1].innerHTML.split('<br>');
   if(str_luna.length >= 5) {
      salida =  str_luna[3].replace(/(^s*)|(s*$)/g,"");
   }
   
   if(str_luna.length == 6) {
      salida += '{NL}' + str_luna[4].replace(/(^s*)|(s*$)/g,"");
   }


    return salida;    
}


function getEscombros() {
    var ret = new Array();
    var cresult = document.getElementById('combat_result');
    var str_escombros = getElementsByClass('action',cresult)[1].innerHTML.split('<br>')[2];
    ret[0] = parseInt(str_escombros.split('y')[0].replace(/\D/g,''));
    ret[1] = parseInt(str_escombros.split('y')[1].replace(/\D/g,''));
    ret[2] = parseInt(ret[0]) + parseInt(ret[1]);
    return ret;    
}

function getCaptura() {
    var ret = [0, 0, 0, 0];
    
    if(getMensajeConclusion().indexOf("atacante") != -1) {
        var cresult = document.getElementById('combat_result');
        var str_captura = getElementsByClass('action',cresult)[0].innerHTML;
        var str_metal = str_captura.substring(str_captura.indexOf('captura'), str_captura.indexOf('Metal'));
        var str_cristal = str_captura.substring(str_captura.indexOf(','), str_captura.indexOf('Cristal'));
        var str_deu = str_captura.substring(str_captura.indexOf('y'), str_captura.indexOf('Deuterio'));
        
        if(str_metal.length == 0) str_metal = '0';
        if(str_cristal.length == 0) str_cristal = '0';
        if(str_deu.length == 0) str_deu = "0";
        
        ret[0] = parseInt(str_metal.replace(/\D/g,''));
        ret[1] = parseInt(str_cristal.replace(/\D/g,''));
        ret[2] = parseInt(str_deu.replace(/\D/g,''));
        ret[3] = parseInt(ret[0]) + parseInt(ret[1]) + parseInt(ret[2]);
        
    }
    
    return ret;
}


function getFecha() {
    var strFecha = getElementsByClass("start")[0].innerHTML;
    strFecha = strFecha.substring(strFecha.indexOf('(')+1, strFecha.indexOf(')'));
    
    var fecha = strFecha.split(" ")[0];
    var hora = strFecha.split(" ")[1];
    
    return fecha;
}


function getMensajeConclusion() {
    var ret = '';
    var cresult = document.getElementById('combat_result');
    var str = getElementsByClass('action',cresult)[0].innerHTML;
    
    if(str.indexOf('atacante') != -1)
        ret = '¡El atacante ha ganado la batalla!';
        
    if(str.indexOf('defensor') != -1)
        ret = '¡El defensor ha ganado la batalla!';
        
    if(str.indexOf('empate') != -1)
        ret = '¡La batalla ha terminado en empate!';

    
    return ret;
}


function calcularRecicladores(escombros) {
    var ret = 0;
    
    if(escombros > 0) ret = (parseInt(escombros)/20000)+1;
    
    return ret;
}


function getRondas() {
	var rondas = new Array;
	
	var item = getElementsByClass("combat_round");
	
	for(var i = 0; i < item.length; i++) {
		var insertado = false;
		for(var r = 0; r < rondas.length && !insertado; r++) {
			if(item[i].innerHTML == rondas[r].innerHTML) {
				insertado = true;
			}
		}
		if(!insertado) {
			rondas.push(item[i]);
		}
	}

    return (rondas);
}


function getCuadrosBBCode(patron) {

   var html = "";

   // cuadros de texto
   html += '<table cellspacing="0" cellpadding="0">';
   html += '<tr><td>'
   // foro ogame
   html += '<b><font color=#FE9A2E>Foro OGame:</font></b><br>';
   html += '<textarea id="txtBB" name="txtBB" style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
   html += codificar(patron, "OGame", SCRIPT.version);
   html += '</textarea><br><br>';
   html += '</td><td>'
   // foro phpBB
   html += '<b><font color=#FE9A2E>Foro phpBB:</font></b><br>';
   html += '<textarea id="txtBB" name="txt_phpBB" style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
   html += codificar(patron, "phpBB", SCRIPT.version);
   html += '</textarea><br><br>';
   html += '</td></tr><tr><td>'
   // foro phpBB3
   html += '<b><font color=#FE9A2E>Foro phpBB 3:</font></b><br>';
   html += '<textarea id="txtBB" name="txt_phpBB" style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
   html += codificar(patron, "phpBB3", SCRIPT.version);
   html += '</textarea><br><br>';
   html += '</td><td>'
   // html
   html += '<b><font color=#FE9A2E>HTML:</font></b><br>';
   html += '<textarea id="txtBB" name="txt_phpBB" style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
   html += codificar(patron, "HTML", SCRIPT.version);
   html += '</textarea><br><br>';
   html += '</td></tr></table>'
   
   return html;

}

// ============================================================
// ============================================================

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


// ============================================================



function getFlotas(numRonda, ataque) {
    
    var ret = new SAC();
    
    var cround = getRondas();
    var maxRondas = cround.length-1;
      
    if(ronda > maxRondas) return 0 // excede el num de rondas
    
    var idTipoBando = (ataque)? 'round_attacker':'round_defender'; // ronda de ataque o defensa
    
    var ronda = cround[numRonda];

    var rondaBando = getElementsByClass(idTipoBando, ronda)[0];
    var newBack = getElementsByClass("newBack", rondaBando);
    
    for(var i = 0; i < newBack.length ; i++ ) {
        var destroyed = getElementsByClass("destroyed", newBack[i])[0];
        if(typeof destroyed != 'undefined') {
            var nombre = destroyed.innerHTML;
            nombre = nombre.replace('El defensor ', '');
            nombre = nombre.replace('ha sido destruido.', '');
            ret.add(nombre);
        }
        else {
        
            var nombre = getElementsByClass("name", newBack[i])[0].firstChild.textContent;
            var tabla = newBack[i].getElementsByTagName("TABLE")[0];
            
            nombre = nombre.replace('Atacante ', '');
            nombre = nombre.replace('Defensor ', '');

            for(var j = 1; j < getColumnas(tabla); j++) {
                nave = getContenido(tabla, 0, j);
                cantidad = getContenido(tabla, 1, j).replace(/\./gi, '');
                ret.add(nombre, nave, cantidad);
            }
        }
    }
    
        
    return ret;
}


// ============================================================



function actualizar () {

    var codHTML = document.getElementById("codHTML");
    var txtBB = document.getElementById("txtBB");
    var txtInfo = document.getElementById("txtInfo");
    var tipoCodif = document.F1.lstBB.options[document.F1.lstBB.selectedIndex].value;
    
   
    txtInfo.innerHTML = 'Código ' + tipoCodif;

    codHTML.innerHTML = codificar(patron, "HTML", document.F1.centrado.checked, version);
    txtBB.value = codificar(patron, tipoCodif, document.F1.centrado.checked, version);
    
    
}

// ============================================================

function compactar()  {
    
    	var comp = document.getElementById("compactado");
    	if (comp != null ) return 0;
        
        var patron = ''; 
		var compactador = document.createElement('div');  
  
		
		var rondas = getRondas();
		var numRondas = rondas.length-1;
        
        // atacantes
        var lstAtaq = getFlotas(0, true);
        var lstAtaq_final = getFlotas(numRondas, true);
        lstAtaq.addSupervivientes(lstAtaq_final);
        
        
        // defensores
        var lstDef = getFlotas(0, false);        
        var lstDef_final = getFlotas(numRondas, false);
        lstDef.addSupervivientes(lstDef_final);
        
        
        lstAtaq.ordenar();
        lstDef.ordenar();

        
        // *****************************************************************************************************************
        // ***** GENERA PATRON *********************************************************************************************


        patron = '';
		
		if(numRondas < 1) numRondas= 1;
        
        if(numRondas == 1) {
			patron += '{SIZE_PEQ}La batalla duró 1 ronda el día ' + getFecha() + '{/SIZE}{NL}';
        }
        else {
			patron += '{SIZE_PEQ}La batalla duró ' + numRondas + ' rondas el día ' + getFecha() + '{/SIZE}{NL}';
        }
        
        
        // ATACANTES
        patron += '{COLOR_T1}{B}{SIZE_GRA}Atacantes (' + lstAtaq.length() + '):{/SIZE}{/B}{/COLOR}{NL}';
        
        for(var i = 0; i < lstAtaq.length(); i++){
             patron += '{COLOR_A1}{B}{SIZE_MED}'+ lstAtaq.getNombre(i) + '{/SIZE}{/B}{/COLOR}{NL}';
             for(var j = 0; j < lstAtaq.getFlotas(i).length(); j++) {
                 var nombre = lstAtaq.getFlotas(i).getNombre(j);
                 var unidades = N(lstAtaq.getFlotas(i).getUnidades(j));
                 var perdidas = N(lstAtaq.getFlotas(i).getPerdidas(j));
                 patron += nombre + " {COLOR_A1}" + unidades + "{/COLOR} {COLOR_A2}perdió " + perdidas +  "{/COLOR}{NL}";
             }
             patron += '{NL}';

             if(lstAtaq.getCostePerdidas(i)[3] != 0) {    
               var coste = N(lstAtaq.getCostePerdidas(i));
               patron += 'Pérdidas: {COLOR_R1}' + coste[3] + '{/COLOR}{NL}';
               patron += '( {COLOR_R2}' + coste[0] + '{/COLOR}, Metal  {COLOR_R2}' + coste[1] + '{/COLOR}, Cristal, {COLOR_R2}' + coste[2] + '{/COLOR} Deuterio ){NL}{NL}';
            }
             
        }
        
        
        
         // DEFENSOR
        patron += '{COLOR_T1}{B}{SIZE_GRA}Defensores (' + lstDef.length() + '):{/SIZE}{/B}{/COLOR} {NL}';
        
        for(var i = 0; i < lstDef.length(); i++){
          patron += '{COLOR_D1}{B}{SIZE_MED}'+ lstDef.getNombre(i) + '{/SIZE}{/B}{/COLOR}{NL}';
          for(var j = 0; j < lstDef.getFlotas(i).length(); j++) {
            var nombre = lstDef.getFlotas(i).getNombre(j);
            var unidades = N(lstDef.getFlotas(i).getUnidades(j));
            var perdidas = N(lstDef.getFlotas(i).getPerdidas(j));
            patron += nombre + " {COLOR_D1}" + unidades + "{/COLOR} {COLOR_D2}perdió " + perdidas +  "{/COLOR}{NL}";
          }
          
          if(lstDef.getFlotas(i).length() == 0) {
            patron += "{I}Sin defensas{/I}{NL}";
          }
          
          patron += '{NL}';
          
          if(lstDef.getCostePerdidas(i)[3] != 0) {
             var coste = N(lstDef.getCostePerdidas(i));
             patron += 'Pérdidas: {COLOR_R1}' + coste[3] + '{/COLOR}{NL}';
             patron += '( {COLOR_R2}' + coste[0] + '{/COLOR}, Metal  {COLOR_R2}' + coste[1] + '{/COLOR}, Cristal, {COLOR_R2}' + coste[2] + '{/COLOR} Deuterio ){NL}{NL}';
          }
        }
        
        patron += '{SIZE_MED}{COLOR_RB}{B}' + getMensajeConclusion() + '{/B}{/COLOR}{/SIZE}{NL}{NL}';
        
 
 
        // RESUMEN (robos, escombros, perdidas, rentabilidad...)
        

        var perdidasAtaq = lstAtaq.getCostePerdidas(-1);
        var perdidasDef = lstDef.getCostePerdidas(-1);
        var N_perdidasAtaq = N(perdidasAtaq);
        var N_perdidasDef = N(perdidasDef);
        
        var perdidasTotales = new Array();
        perdidasTotales[0] = (perdidasAtaq[0] + perdidasDef[0]);
        perdidasTotales[1] = (perdidasAtaq[1] + perdidasDef[1]);
        perdidasTotales[2] = (perdidasAtaq[2] + perdidasDef[2]);
        perdidasTotales[3] = (perdidasAtaq[0] + perdidasDef[0]) + (perdidasAtaq[1] + perdidasDef[1]) + (perdidasAtaq[2] + perdidasDef[2]);
        var N_perdidasTotales = N(perdidasTotales);


        var escombros = getEscombros();
        var N_escombros = N(escombros);
        
        var captura = getCaptura();
        var N_captura = N(captura); 
        
        
        // RENTABILIDAD Y PORCENTAJE: ATACANTE CON RECICLAJE
        var renta_ataq_conReci = new Array();
        renta_ataq_conReci[0] = (-1*perdidasAtaq[0])+captura[0]+escombros[0];
        renta_ataq_conReci[1] = (-1*perdidasAtaq[1])+captura[1]+escombros[1];
        renta_ataq_conReci[2] = (-1*perdidasAtaq[2])+captura[2];
        renta_ataq_conReci[3] = (-1*perdidasAtaq[3])+captura[3]+escombros[2];
        var N_renta_ataq_conReci = N(renta_ataq_conReci);
        
        var p_renta_ataq_conReci = new Array();
        p_renta_ataq_conReci[3] = Math.floor((renta_ataq_conReci[3]/perdidasAtaq[3])*100);
        p_renta_ataq_conReci[0] = Math.floor((renta_ataq_conReci[0]/perdidasAtaq[0])*100);
        p_renta_ataq_conReci[1] = Math.floor((renta_ataq_conReci[1]/perdidasAtaq[1])*100);
        p_renta_ataq_conReci[2] = Math.floor((renta_ataq_conReci[2]/perdidasAtaq[2])*100);
        var p_renta_ataq_conReci = N(p_renta_ataq_conReci);
        
        
        // RENTABILIDAD Y PORCENTAJE: ATACANTE SIN RECICLAJE
        var renta_ataq_sinReci = new Array();
        renta_ataq_sinReci[0] = (-1*perdidasAtaq[0])+captura[0];
        renta_ataq_sinReci[1] = (-1*perdidasAtaq[1])+captura[1];
        renta_ataq_sinReci[2] = (-1*perdidasAtaq[2])+captura[2];
        renta_ataq_sinReci[3] = (-1*perdidasAtaq[3])+captura[3];
        var N_renta_ataq_sinReci = N(renta_ataq_sinReci);
        
        var p_renta_ataq_sinReci = new Array();
        p_renta_ataq_sinReci[3] = Math.floor((renta_ataq_sinReci[3]/perdidasAtaq[3])*100);
        p_renta_ataq_sinReci[0] = Math.floor((renta_ataq_sinReci[0]/perdidasAtaq[0])*100);
        p_renta_ataq_sinReci[1] = Math.floor((renta_ataq_sinReci[1]/perdidasAtaq[1])*100);
        p_renta_ataq_sinReci[2] = Math.floor((renta_ataq_sinReci[2]/perdidasAtaq[2])*100);
        p_renta_ataq_sinReci = N(p_renta_ataq_sinReci);

        
        // RENTABILIDAD Y PORCENTAJE: DEFENSOR CON RECICLAJE
        var renta_def_conReci = new Array();
        renta_def_conReci[0] = (-1*perdidasDef[0])+escombros[0];
        renta_def_conReci[1] = (-1*perdidasDef[1])+escombros[1];
        renta_def_conReci[2] = (-1*perdidasDef[2]);
        renta_def_conReci[3] = (-1*perdidasDef[3])+escombros[2];
        var N_renta_def_conReci = N(renta_def_conReci);
        
        var p_renta_def_conReci = new Array();
        p_renta_def_conReci[3] = Math.floor((renta_def_conReci[3]/perdidasDef[3])*100);
        p_renta_def_conReci[0] = Math.floor((renta_def_conReci[0]/perdidasDef[0])*100);
        p_renta_def_conReci[1] = Math.floor((renta_def_conReci[1]/perdidasDef[1])*100);
        p_renta_def_conReci[2] = Math.floor((renta_def_conReci[2]/perdidasDef[2])*100);
        p_renta_def_conReci = N(p_renta_def_conReci);
        
        
                
        patron += '{B}Robo:{/B} {COLOR_R4}{SIZE_MED}' + N_captura[0] + '{/SIZE}{/COLOR} Metal, {COLOR_R4}{SIZE_MED}' + N_captura[1] + '{/SIZE}{/COLOR} Cristal y {COLOR_R4}{SIZE_MED}' + N_captura[2] + '{/SIZE}{/COLOR} Deuterio{NL}';
        patron += '{B}Escombros:{/B} {COLOR_R3}{SIZE_GRA}{B}' + N_escombros[0] + '{/B}{/SIZE}{/COLOR} Metal y {COLOR_R3}{SIZE_GRA}{B}' +  N_escombros[1] + '{/B}{/SIZE}{/COLOR} Cristal ( {COLOR_R3}'   + N(calcularRecicladores(escombros[2])) + "{/COLOR} recicladores ){NL}";
        
        patron += '{NL}{NL}'
        
        patron += '{COLOR_T1}PÉRDIDAS{/COLOR} Atacantes: {COLOR_R1}' + N_perdidasAtaq[3] + '{/COLOR}{NL}';
        patron += '( {COLOR_R2}' + N_perdidasAtaq[0] + "{/COLOR} metal , {COLOR_R2}" + N_perdidasAtaq[1] + "{/COLOR} cristal, {COLOR_R2}" + N_perdidasAtaq[2] + "{/COLOR} deuterio ){NL}{NL}";
        
        patron += '{COLOR_T1}PÉRDIDAS{/COLOR} Defensores: {COLOR_R1}' + N_perdidasDef[3] + '{/COLOR}{NL}';
        patron += '( {COLOR_R2}' + N_perdidasDef[0] + "{/COLOR} metal , {COLOR_R2}" + N_perdidasDef[1] + "{/COLOR} cristal, {COLOR_R2}" + N_perdidasDef[2] + "{/COLOR} deuterio ){NL}{NL}";
        
        patron += '{NL}'
     
        if(escombros[2] > 0) {
            patron += '{COLOR_T1}{SIZE_MED}{B}RENTABILIDAD{/B}{/SIZE}{/COLOR} Atacantes {COLOR_RECI}reciclando{/COLOR}: {COLOR_R1}{B}' + N_renta_ataq_conReci[3] + '{/B}{/COLOR} [' + p_renta_ataq_conReci[3] + '%]{NL}';
            patron += 'Metal: {COLOR_R2}' + N_renta_ataq_conReci[0]  + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_conReci[0] + '%]{/SIZE}{NL}';
            patron += 'Cristal: {COLOR_R2}' +  N_renta_ataq_conReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_conReci[1] + '%]{/SIZE}{NL}';
            patron += 'Deuterio: {COLOR_R2}' +  N_renta_ataq_conReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_conReci[2] + '%]{/SIZE}{NL}';
            
            patron += '{COLOR_T1}{SIZE_MED}{B}RENTABILIDAD{/B}{/SIZE}{/COLOR} Atacantes {COLOR_SINRECI}sin reciclar{/COLOR}: {COLOR_R1}{B}' + N_renta_ataq_sinReci[3] + '{/B}{/COLOR} [' + p_renta_ataq_sinReci[3] + '%]{NL}';
            patron += 'Metal: {COLOR_R2}' +  N_renta_ataq_sinReci[0] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[0] + '%]{/SIZE}{NL}';
            patron += 'Cristal: {COLOR_R2}' +  N_renta_ataq_sinReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[1] + '%]{/SIZE}{NL}';
            patron += 'Deuterio: {COLOR_R2}' +  N_renta_ataq_sinReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[2] + '%]{/SIZE}{NL}';

            patron += '{COLOR_T1}{SIZE_MED}{B}RENTABILIDAD{/B}{/SIZE}{/COLOR} Defensores {COLOR_RECIDEF}reciclando{/COLOR}: {COLOR_R1}{B}' + N_renta_def_conReci[3] + '{/B}{/COLOR} [' + p_renta_def_conReci[3] + '%]{NL}';
            patron += 'Metal: {COLOR_R2}' +  N_renta_def_conReci[0] + '{/COLOR} {SIZE_PEQ}[' + p_renta_def_conReci[0] + '%]{/SIZE}{NL}';
            patron += 'Cristal: {COLOR_R2}' +  N_renta_def_conReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_def_conReci[1] + '%]{/SIZE}{NL}';
            patron += 'Deuterio: {COLOR_R2}' +  N_renta_def_conReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_def_conReci[2] + '%]{/SIZE}{NL}';
        }
        else {
            patron += '{COLOR_T1}{B}RENTABILIDAD{/B}{/COLOR} Atacantes {COLOR_R1}' + N_renta_ataq_sinReci[3] + '{/COLOR} [' + p_renta_ataq_sinReci[3] + '%]{NL}';
            patron += 'Metal: {COLOR_R2}' +  N_renta_ataq_sinReci[0] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[0] + '%]{/SIZE}{NL}';
            patron += 'Cristal: {COLOR_R2}' +  N_renta_ataq_sinReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[1] + '%]{/SIZE}{NL}';
            patron += 'Deuterio: {COLOR_R2}' +  N_renta_ataq_sinReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[2] + '%]{/SIZE}{NL}';
        }
        
        // si rentabilidad = infinita, lo cambia por MAX
        patron = patron.replace(/infinity\%/gi, "Máx.");
        patron = patron.replace(/NaN\%/gi, "Máx.");
        
        
        if(getLuna().length > 4)
            patron += '{NL}' + getLuna() + '{NL}'
        
        
        patron += '{NL}{SIZE_MED} Perdidas {COLOR_T1}TOTALES{/COLOR}: {B}{COLOR_R3}' + N(perdidasTotales[3]) + '{/COLOR}{/B}{/SIZE}{NL}';
        
        patron += '{NL}{SIZE_PEQ}{ENLACE_SCRIPT}{/SIZE}{NL}'; 
        
        
        
        // *****************************************************************************************************************
        // ***** PATRON MINI ***********************************************************************************************
        
        
        var patronMini = "{COLOR_T1}{B}Ataque-Granjeo{/B}{/COLOR} [ {COLOR_A1}";
                
        for(var i = 0; i < lstAtaq.length(); i++){
             patronMini  += ''+ lstAtaq.getNombre(i) + '';
        }
        
        patronMini += ' .vs. ';
        
         for(var i = 0; i < lstDef.length(); i++){
          patronMini += ''+ lstDef.getNombre(i) + '{/COLOR}';
        }
        
        patronMini += ' ]{NL}{COLOR_T1}{B}Renta atacante: {/B}{/COLOR} {COLOR_R4}' + N_renta_ataq_conReci[0] + '{/COLOR} Metal, {COLOR_R4}' + N_renta_ataq_conReci[1] + '{/COLOR} Cristal, {COLOR_R4}' + N_renta_ataq_conReci[2] + '{/COLOR} Deuterio {NL}'; 
      
        // *****************************************************************************************************************
        // ***** MOSTRAR ***************************************************************************************************
        
        var html = '';

        html += '<div style="font-size:14px;font-family:Verdana,sans-serif;">';
        html +=  '<br><center><table border="0" width="90%" style="">';
        html += '<tr><td colspan="2" height="450" bgcolor="#1F273C" style="border: 2px solid #FFFFFF;"><br>'
		var cadena = codificar(patron, 'HTML', SCRIPT.version);
        html += '<div id="codHTML">' + cadena + '</div>';
		html += '</td><td colspan="2" height="450" bgcolor="#1F273C" style="border: 2px solid #FFFFFF;"><br>'
		

		html += '<div id="codCC"><center><b>Batalla compactada para circulares (< 2000 caracteres)</b></center><br><br><br>' + PatronOGamatorCC(cadena) + '</div>';
        html += '</td></tr></table><table>';
        html += '<tr><td><br><center>';
        html += getCuadrosBBCode(patron);
        html += '</td></tr></table></center><br>'
        
        
        // patron mini
              //cabecera
        html +=  '<div><table border="0" width="100%" style="">';
        html += '<tr><td colspan="2" height="30" bgcolor="#000000" style="border: 2px solid #000000;">';
        html += '<p align="center"><font style="font-size:12pt;" color="#FF6600">';
        html += '<b>COMPACTADO MINIMO</b>';
        html += '</font></p></td></tr></table></div>';
        html +=  '<br><center><table border="0" width="90%" style="">';
        html += '<tr><td colspan="2" height="100" bgcolor="#1F273C" style="border: 2px solid #FFFFFF;"><br><br>'
        html += '<div id="codHTML">' + codificar(patronMini, 'HTML', SCRIPT.version) + '</div>';
        html += '</td></tr>';
        html += '<tr><td><br><center>';
        html += getCuadrosBBCode(patronMini);
        html += '</center></td></tr></table></center><br>'
        html += '</div>';
      
        compactador.innerHTML = html;
		
		master = getElementsByClass("combatreport")[0];
		compactador.innerHTML = compactador.innerHTML + master.innerHTML;
		master.innerHTML = compactador.innerHTML;
		master.id = "compactado";

		cadena = PatronOGamatorCC(cadena);

		// circulares (de OGamator basado en trusreno)
		var trozo = '<div style="text-align:center;"><b><font color=#FE9A2E>Circulares (de OGamator basado en trusreno):</font></b><br>';
		trozo += '<textarea id="txtHtmlCC" name="txt_htmlCC" style="background-color:#1F273C;width:600px;height:40px;border: 2px solid #FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';  
		trozo += cadena;
		trozo += '</textarea>';
		trozo += '</div>' 

		document.getElementById("compactado").innerHTML = trozo + document.getElementById("compactado").innerHTML;
		}
// ============================================================
	function DevuelveCadena(cadena, Subcadena1, Subcadena2){
		var pos1, pos2;
		if (cadena == null) return null;
		
		if (Subcadena1 == "" || Subcadena1 == null) pos1 = 0;
		else
		{
			pos1 = cadena.indexOf(Subcadena1);	
			if (pos1 >= 0)	pos1 = pos1 + Subcadena1.length;
			else 	return "";
		}

		if (Subcadena2 == "" || Subcadena2 == null)	pos2 = cadena.length;
		else
		{
			pos2 = cadena.indexOf(Subcadena2, pos1);
			if (pos2 < 0) return cadena.substring(pos1);
		}

		return cadena.substring(pos1, pos2);
	}
// ============================================================	
	function PatronOGamatorCC(origen){
		var cadenita, m, n, Cabecera, Contendientes, Robo, Escombros, Perdidas, PerdidasA, PerdidasD;
		var SolucionHtml = "";

		Cabecera = ' Rondas: ' + DevuelveCadena(origen, "La batalla duró ", "ronda").trim() + ', el día ' + DevuelveCadena(origen, "el día ", "<");
	
		Contendientes = '<font color="#6699FF">' + DevuelveCadena(origen, '<font color="#6699FF">', '<b>Robo:</b>');

		m = Contendientes.split("<br>");
		Contendientes = "";

		for (i = 0; i < m.length - 2; i++)
		{
			if (m[i].toUpperCase().indexOf("PÉRDIDAS") > 0)
			{
				m[i] = m[i].replace(/PÉRDIDAS/g, 'Pérdidas');
				m[i] = m[i].replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');	
				Perdidas = DevuelveCadena(m[i], "Pérdidas: ", "<br>");
				i++;
				
				m[i] = m[i].replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');		
				m[i] = m[i].replace(/\<br>/g, "").replace(/\,/g, "").replace(/\(/g, "").replace(/\)/g, "").trim();
				m[i] = m[i].replace(/\Metal/g, "").replace(/\Deuterio/g, "").replace(/\Cristal/g, "");

				n = m[i].split(' ');
				m[i] = "";
				for (j = 0; j < n.length; j++)
				{
					if (n[j].length > 3 || n[j] == "0")
					{
						m[i] = m[i] + n[j] + " + ";
					}
				}
				m[i] = m[i].substring(0, m[i].length - 3).trim();
				m[i] = m[i].replace("0 + 0 + 0", "");
				
				m[i] = "Pérdidas :" + m[i].trim() + " = <b>" + Perdidas + "</b>";

			}
			if (m[i].indexOf('<font color="#6699FF">') >= 0)
			{
				m[i] = m[i].replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');	
				m[i] = "<br/><br/><font color='#6699FF'>" + m[i].trim() + "</font>";
			}
			if (m[i].indexOf('<font color="#00FF40"><b>') >= 0)
			{
				m[i] = m[i].replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');	
				m[i] = "<br/><font color='#00AA00'>" + m[i].trim() + "</font><br/>";
			}
			if (m[i].indexOf('<font color="#ED7010"><b>') >= 0)
			{
				m[i] = m[i].replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');			
				m[i] = "<br/><font color='#EE7711'>" + m[i].trim() + "</font><br/>";
			}
			if (m[i].indexOf('<font color="#00FF40">') > 1 || m[i].indexOf('<font color="#ED7010">') > 1)
			{
				m[i] = m[i].replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');			
				m[i] = m[i].replace('perdió 0', '');
				m[i] = m[i].replace('perdió ', ' <b>(-');
				if (m[i].indexOf("-") > 0) m[i] = m[i] + ")</b>";
				m[i] = m[i].trim() + "<br/>";
			}
		
			if (m[i].toUpperCase().indexOf("LA BATALLA") > 0)
			{
				m[i] = m[i].replace(/\<font ((.|\n)*?)>/g, '').replace(/\<\/font>/g, '').replace('<br/>', '');
				if(m[i].indexOf('atacante') != -1) m[i] = "<font color='#00DD00'>¡Ganaron los atacantes!";
				if(m[i].indexOf('defensor') != -1) m[i] = "<font color='#DD0000'>¡Ganaron los defensores!";
				if(m[i].indexOf('empate') != -1) m[i] = "<font color='#DDDD00'>¡EMPATE!";

				if(origen.indexOf("Las enormes cantidades de metal y de cristal") > 0) 
				{
					var ProbLuna = DevuelveCadena(origen, "La probabilidad de que surja una luna es del ", "<br>");
					m[i] = m[i] + '<br/><b>Luna creada (' + ProbLuna + ')' ;
				}
				m[i] = "<br/><br/><b>" + m[i] + "</font></b><br/>";
			}			
			Contendientes = Contendientes + m[i];
		}


		Robo = DevuelveCadena(origen, "<b>Robo:</b>", "<br>");
		Robo = Robo.replace(/<br>/g, "").replace(/,/g, "").trim();
		Robo = Robo.replace(/metal/gi, "").replace(/deuterio/gi, "").replace(/cristal/gi, "");
		Robo = Robo.replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');		
		n = Robo.split(' ');
		Robo = "<b>Robo: </b>";
		for (j = 0; j < n.length; j++)
		{
			if (n[j].length > 3 || n[j] == "0")
			{
				Robo = Robo + n[j] + " · ";
			}
		}
		Robo = Robo.substring(0, Robo.length - 3);
		Robo = Robo.replace(/\<br>/g, "");
		Robo = Robo.trim() + "<br/>";
		
		Escombros = DevuelveCadena(origen, "<b>Escombros:</b>", "<br>");
		Escombros = Escombros.replace("Metal", "").replace("Deuterio", "").replace("Cristal", "");
		n = Escombros.split('<font color="#FF0000">');
		Escombros = "<b>Escombros: </b>";
		Escombros = Escombros + n[1].split("</font>")[0].replace("<b>","").replace("</b>","") + " · ";
		Escombros = Escombros + n[2].split("</font>")[0].replace("<b>","").replace("</b>","") + " ";
		Escombros = Escombros + " <b> (" + n[3].split("</font>")[0] + " recicladores)</b>";
		Escombros = Escombros.replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');			
		Escombros = Escombros.replace(/\<br>/g, "");
		Escombros = Escombros.trim() + "<br/>";
		
		Perdidas = DevuelveCadena(origen, "<b>Escombros:</b>", "RENTABILIDAD");
		m = Perdidas.split("<br>");
		Perdidas = "";

		for (i = 1; i < m.length - 1; i++)
		{
			if (m[i].toUpperCase().indexOf("PÉRDIDAS") > 0)
			{			
				PerdidasA = "";
				PerdidasD = "";
				
				m[i] = m[i].replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');	
				if(m[i].indexOf("Atacantes") > 0) PerdidasA = DevuelveCadena(m[i], "Atacantes: ", "<br>");
				if(m[i].indexOf("Defensores") > 0) PerdidasD = DevuelveCadena(m[i], "Defensores: ", "<br>");
				i++


				m[i] = m[i].replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');		
				m[i] = m[i].replace(/\<br>/g, "").replace(/,/g, "").replace(/\(/g, "").replace(/\)/g, "").trim();
				m[i] = m[i].replace(/metal/g, "").replace(/deuterio/g, "").replace(/cristal/g, "");

				n = m[i].split(' ');
				m[i] = "";
				for (j = 0; j < n.length; j++)
				{
					if (n[j].length > 3 || n[j] == "0")
					{
						m[i] = m[i] + n[j] + " + ";
					}
				}
				m[i] = m[i].substring(0, m[i].length - 3).trim();
				m[i] = m[i] + " ="
				
				m[i] = m[i].replace("0 + 0 + 0 =", "");
				
				if(PerdidasA != "") m[i] = "Atacantes:" + m[i].trim() + " <b>" + PerdidasA + "</b><br/>";
				if(PerdidasD != "") m[i] = "Defensores :" + m[i].trim() + " <b>" + PerdidasD + "</b>";
			}			
			Perdidas = Perdidas + m[i];
		}
		Perdidas = Perdidas.replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');
		
		var Rentabilidad = '<br/><br/><font color="#6699FF"><b>RENTABILIDAD</b></font><br/>';

		m = origen.split("RENTABILIDAD");
		var AR="", ASR="", DR="";

		if(m.length == 2)
		{
			AR = "<b>Atacantes: </b><br/>";
			AR = AR + DevuelveCadena(m[1], "Metal: ", "<br>") + " + ";
			AR = AR + DevuelveCadena(m[1], "Cristal: ", "<br>") + " + ";
			AR = AR + DevuelveCadena(m[1], "Deuterio: ", "<br>") + " = ";
			AR = AR + "<b>" + DevuelveCadena(m[1], 'Atacantes', '<br>') + "</b><br/>";
			AR = AR.replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');			
		}
		else
		{
			AR = "<b>Atacantes reciclando: </b><br/>";
			AR = AR + DevuelveCadena(m[1], "Metal: ", "<br>") + " + ";
			AR = AR + DevuelveCadena(m[1], "Cristal: ", "<br>") + " + ";
			AR = AR + DevuelveCadena(m[1], "Deuterio: ", "<br>") + " = ";
			AR = AR.replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');
			AR = AR + "<font color='#FFCC66'>" + DevuelveCadena(m[1], "<b>", "</b>") + "</font><br/>";
			
			ASR = "<b>Atacantes sin reciclar: </b><br/>";
			ASR = ASR + DevuelveCadena(m[2], "Metal: ", "<br>") + " + ";
			ASR = ASR + DevuelveCadena(m[2], "Cristal: ", "<br>") + " + ";
			ASR = ASR + DevuelveCadena(m[2], "Deuterio: ", "<br>") + " = ";
			ASR = ASR.replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');
			ASR = ASR + "<font color='#FFCC66'>" + DevuelveCadena(m[2], "<b>", "</b>") + "</font><br/>";
			
			DR = "<b>Defensores reciclando: </b><br/>";
			DR = DR + DevuelveCadena(m[3], "Metal: ", "<br>") + " + ";
			DR = DR + DevuelveCadena(m[3], "Cristal: ", "<br>") + " + ";
			DR = DR + DevuelveCadena(m[3], "Deuterio: ", "<br>") + " = ";
			DR = DR.replace(/\<font((.|\n)*?)>/g, '').replace(/\<\/font>/g, '');			
			DR = DR + "<font color='#FFCC66'>" + DevuelveCadena(m[3], "<b>", "</b>") + "</font><br/>";
		}
		
		

		m = origen.split("TOTALES");	
		var Totales = DevuelveCadena(m[1], '<font color="#FF0000">', '</font>');
		Perdidas = '<br/><font color="#6699FF"><b>PÉRDIDAS: ' + Totales + '</b></font><br/>' + Perdidas.replace(/PÉRDIDAS/gi, '');
		
		SolucionHtml = Cabecera + Contendientes + "<br/>" + Robo + Escombros + Perdidas;

		SolucionHtml = SolucionHtml.replace(/\<ft color=/g, "<font color=");
		SolucionHtml = SolucionHtml.replace(/\<\/font\>/g, '</font>');		
		
		SolucionHtml = SolucionHtml.replace(/Estrella de la muerte/g,"EDLM");
		SolucionHtml = SolucionHtml.replace(/Nave grande de Carga/g, "Carg G");
		SolucionHtml = SolucionHtml.replace(/Nave pequeña de Carga/g, "Carg P");
		SolucionHtml = SolucionHtml.replace(/Cazador ligero/g, "Ligeros");
		SolucionHtml = SolucionHtml.replace(/Cazador pesado/g, "Pesados");
		SolucionHtml = SolucionHtml.replace(/Sonda de espionaje/g, "Sondas");
		SolucionHtml = SolucionHtml.replace(/Nave de batalla/g, "NBat");
		SolucionHtml = SolucionHtml.replace(/Satélite Solar/g, "Sat");
		SolucionHtml = SolucionHtml.replace(/Lanzamisiles/g, "Lanzas");
		SolucionHtml = SolucionHtml.replace(/Láser pequeño/g, "Láser P");
		SolucionHtml = SolucionHtml.replace(/Lase grande/g, "Láser G");
		SolucionHtml = SolucionHtml.replace(/Cañón Gauss/g, "Gauss");
		SolucionHtml = SolucionHtml.replace(/Cañón Iónico/g, "Iónicos");
		SolucionHtml = SolucionHtml.replace(/Cañón de Plasma/g, "Plasmas");
		SolucionHtml = SolucionHtml.replace(/Cúpula pequeña/g, "Cúp P");
		SolucionHtml = SolucionHtml.replace(/Cúpula grande/g, "Cúp G");

		var Firma = '<br/>' + txt_firma ;
		
		cadenita = SolucionHtml + Rentabilidad + AR + ASR + DR;
		if (cadenita.length < 2000)
		{
		   SolucionHtml = SolucionHtml + Rentabilidad + AR + ASR + DR;
		}
		else
		{
			if (SolucionHtml.indexOf("¡Ganaron los defensores!") > 1) SolucionHtml = SolucionHtml + Rentabilidad + ASR + DR;
			else SolucionHtml = SolucionHtml + Rentabilidad + AR;
		}
	
		SolucionHtml = SolucionHtml.replace(/\+ \-/g, "-");
		SolucionHtml = SolucionHtml.replace(/\n/g, '');		

		SolucionHtml = "<center>" + SolucionHtml + Firma + "</center>";
		
		return SolucionHtml;
	}


}) ();


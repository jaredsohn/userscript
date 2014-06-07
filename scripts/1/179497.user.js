// ==UserScript==
// @name           Akatsuki Conversor de RC's OGame
// @namespace      http://userscripts.org/users/534693
// @description    Akatsuki Conversor de RC's OGame
// @version        1.0
// @author         m0rph3u
// @updateURL      http://userscripts.org/scripts/source/179497.meta.js
// @downloadURL    http://userscripts.org/scripts/show/179497
// @include        http://*.ogame.*/game/index.php?*page=*
// @require        http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==


(function ()
{

var SCRIPT = {
  name: "Conversor automático de RCs Akatsuki"
  ,url: "http://userscripts.org/scripts/show/179497"
  ,version: "1.0"
  ,funciona_ok: "5.6.99.99"
};

if((typeof(oGameVersionCheck) != "undefined")) {
  oGameVersionCheck(SCRIPT.name + ' ' + SCRIPT.version, SCRIPT.funciona_ok, SCRIPT.url);
}


if (location.href.indexOf('/game/index.php?page=combatreport') != -1 ) {
	compactar();
}
    
function comprobar () {
    var cr = document.getElementsByClassName("round_attacker");
	if (cr != null) compactar();
}
    
setInterval(comprobar, 500);


function SAC() {
    var lstnomes = new Array();
    var lstFrotas = new Array();
    
    this.length = function() {
        return lstnomes.length
    }
    
    this.getnome = function(n) {
        return lstnomes[n];
    }
	
    
    this.getFrotas = function(n) {
        var ret = null;
        if(isNaN(parseInt(n))) {
            for(var i = 0; i < lstnomes.length; i++) {
                if(lstnomes[i] == n) ret = lstFrotas[i];
            }
        }
        else {
            ret = lstFrotas[n];
        }
        return ret;
    }
    

    this.add = function (nome, idFrota, unidades) {
        var inserido = false;
        for(var i = 0; i < lstnomes.length; i++) {
            if(lstnomes[i] == nome) {
                inserido = true;
                if(arguments.length == 3) lstFrotas[i].add(idFrota, unidades);
            }
        }
        if(!inserido) {
            var pos = lstnomes.length;
            lstnomes[pos] = nome;
            lstFrotas[pos] = new Frota();
            if(arguments.length == 3) lstFrotas[pos].add(idFrota, unidades);
        }
        
    }
    
    this.addSobreviventes = function(s) {
        for(var i = 0; i < s.length(); i++) {
            var nome = s.getnome(i);
            for(var j = 0; j < lstnomes.length; j++){
                if(lstnomes[j] == nome) 
                    lstFrotas[j].addSobreviventes(s.getFrotas(i));
            }
            
        }
    }
    
    
    this.ordenar = function() {
        for(var i = 0; i < lstnomes.length; i++) {
            lstFrotas[i].ordenar();
        }
    }
    
    
    this.getCustoPerdidas = function(id) {
        var ret = [0,0,0, 0]; // metal, cristal, deu, total
        
        if(id == -1) {
            for(var i = 0; i < lstnomes.length; i++) {
                var Custo = lstFrotas[i].getCustoPerdidas();
                ret[0] += Custo[0];
                ret[1] += Custo[1];
                ret[2] += Custo[2];
                ret[3] += Custo[3]; 
            }
        }
        else {
            var Custo = lstFrotas[id].getCustoPerdidas();
            ret[0] += Custo[0];
            ret[1] += Custo[1];
            ret[2] += Custo[2];
            ret[3] += Custo[3]; 
        }
        
        
        return ret;
    }
    
}

// ============================================================
// ============================================================


function Frota() {
    var idnome = new Array();
    var nome = new Array();
    var unidades = new Array();
    var perdidas = new Array();
    
    var dadosFrota = [
    ['Cg.Pequeno','Cargueiro pequeno', 2000,2000,0],
    ['Cg.Grande','Cargueiro grande', 6000,6000,0],
    ['Caça L.','Caça Ligeiro', 3000,1000,0],
    ['Caça P.','Caça Pesado', 6000,4000,0],
    ['Cruzador','Cruzador', 20000,7000,2000],
    ['N.Batalha','Nave de Batalha', 45000,15000,0],
    ['Interc.','Interceptador', 30000,40000,15000],
    ['Bombardeiro','Bombardeiro', 50000,25000,15000],
    ['Destruidor','Destruidor', 60000,50000,15000],
    ['EdM','Estrela da Morte', 5000000,4000000,1000000],
    ['N.Colonização','Nave de Colonização', 10000,20000,10000],
    ['Reciclador.','Reciclador', 10000,6000,2000],
    ['Sondas','Sonda de espionagem', 0,1000,0],
    ['Sat.Solar','Satélite Solar', 0,2000,500],
    ['L.Misseis', 'Lançador de misseis', 2000,0,0],
    ['Laser L.','Laser ligeiro', 1500,500,0],
    ['Laser P.','Laser pesado', 6000,2000,0],
    ['C.Gauss','Canhão de Gauss', 20000,15000,2000],
    ['C.Ions','Canhão de Íons', 2000,6000,0],
    ['C.Plasma','Canhão de Plasma', 50000,50000,30000],
    ['P.Escudo','Pequeno Escudo Planetário', 10000,10000,0],
    ['G.Escudo','Grande Escudo Planetário', 50000,50000,0]];
    
    
    this.length = function () {
        return idnome.length;
    }
    
    this.getId = function(n) {
        return idnome[n];
    }
    
    this.getnome = function(n) {
        var id = idnome[n]
        var ret = id;
        for(var i = 0; i < dadosFrota.length; i++) {
            if(id == dadosFrota[i][0]) ret = dadosFrota[i][1];
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
        var inserido = false;
        for(var i = 0; i < idnome.length; i++) {
            if(idnome[i] == id) {
                inserido = true;
                unidades[i] += parseInt(u);
                perdidas[i] += parseInt(u);
            }
        }
        
        if(!inserido) {
            var pos = idnome.length;
            idnome[pos] = id;
            nome[pos] = '';
            unidades[pos] = parseInt(u);
            perdidas[pos] = parseInt(u);
        }
    }
    
    
    this.addSobreviventes = function(f) {
        for(var i = 0; i < f.length(); i++) {
            for(var j = 0; j < idnome.length; j++) {
                if(idnome[j] == f.getId(i)) {
                    perdidas[j] -= parseInt(f.getUnidades(i));
                }
            }
        }
    }
    
    
    this.ordenar = function() {
        var n_idnome = new Array();
        var n_nome = new Array();
        var n_unidades = new Array();
        var n_perdidas = new Array();
        
        var contador = 0;
           
        for(var i = 0; i < dadosFrota.length; i++) {
            for(var j = 0; j<idnome.length; j++) {
                if(idnome[j] == dadosFrota[i][0]) {
                    n_idnome[contador] = idnome[j];
                    n_nome[contador] = dadosFrota[i][1];
                    n_unidades[contador] = unidades[j];
                    n_perdidas[contador] = perdidas[j];
                    contador++;
                }
            }
        }
        idnome = n_idnome;
        nome = n_nome;
        unidades = n_unidades;
        perdidas = n_perdidas;
    }
    
    
    this.getCustoPerdidas = function() {
        var ret = [0,0,0, 0];
        for(var i = 0; i < idnome.length; i++) {
            for(var j = 0; j < dadosFrota.length; j++) {
                if(idnome[i] == dadosFrota[j][0]) {
                    ret[0] += (perdidas[i] * dadosFrota[j][2]);
                    ret[1] += (perdidas[i] * dadosFrota[j][3]);
                    ret[2] += (perdidas[i] * dadosFrota[j][4]);
                    ret[3] += ((perdidas[i] * dadosFrota[j][2]) + (perdidas[i] * dadosFrota[j][3]) + (perdidas[i] * dadosFrota[j][4]));
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


function codificar(padrao, tipo, version) {

    var marcas = new Array();
    var url_script = SCRIPT.url;
    var txt_firma = SCRIPT.name + ' [' + SCRIPT.version + ']';
    
    padrao = '{CENTER}' +  padrao + '{/CENTER}';
    
    
    var colores = [
        [/{COLOR_R1}/gi, '#FFCC66'],
        [/{COLOR_R2}/gi, '#9E7625'],
        [/{COLOR_R3}/gi, '#FF0000'], //destroços
        [/{COLOR_R4}/gi, '#F0EC64'], //rec.robo
        [/{COLOR_T1}/gi, '#6699FF'], // titulo 1 ("defensores", "atacantes", "perdas", y "rentabilidade"
        [/{COLOR_A1}/gi, '#00FF40'],
        [/{COLOR_A2}/gi, '#00DDDD'],
        [/{COLOR_D1}/gi, '#ED7010'], 
        [/{COLOR_RB}/gi, '#007F22'], // resultado batalla
        [/{COLOR_RECI}/gi, '#00CC00'], // atacante reciclando
        [/{COLOR_SINRECI}/gi, '#FFFF00'], // atacante sen reciclar
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
            
        padrao = padrao.replace(/{ENLACE_SCRIPT}/gi, '<a href="' + url_script + '">' + txt_firma + '</a>');

        for(var i = 0; i < colores.length; i++)
            padrao = padrao.replace(colores[i][0],'<font color="' + colores[i][1] + '">');
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
            
        padrao = padrao.replace(/{ENLACE_SCRIPT}/gi, '[url="' + url_script + '"]' + txt_firma + '[/URL]');

        for(var i = 0; i < colores.length; i++)
            padrao = padrao.replace(colores[i][0],'[COLOR=' + colores[i][1] + ']');
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
            
        padrao = padrao.replace(/{ENLACE_SCRIPT}/gi, '[url=' + url_script + ']' + txt_firma + '[/URL]');

        for(var i = 0; i < colores.length; i++)
            padrao = padrao.replace(colores[i][0],'[color=' + colores[i][1] + ']');
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
            
        padrao = padrao.replace(/{ENLACE_SCRIPT}/gi, '[url=' + url_script + ']' + txt_firma + '[/URL]');

        for(var i = 0; i < colores.length; i++)
            padrao = padrao.replace(colores[i][0],'[color=' + colores[i][1] + ']');
    }
    
    
    for(var i = 0; i < marcas.length; i++)
        padrao = padrao.replace(marcas[i][0],marcas[i][1]);
    
    
    return padrao;
}



// ============================================================
// ============================================================


function getlua() {
    var saida = "";
    var ret = new Array();
    
    var cresult = document.getElementById('combat_result');
    
    var str_lua = getElementsByClass('action',cresult)[1].innerHTML.split('<br>');
    if(str_lua.length >= 5) {
        saida =  str_lua[3].replace(/(^s*)|(s*$)/g,"");
    }
    
    if(str_lua.length >= 6) { 
        if(str_lua[4].indexOf("lunar") != -1) {
            saida += '{NL}' + str_lua[4].replace(/(^s*)|(s*$)/g,"");
        }
    }
    
    return saida;    
}


function getDestroços() {
    var ret = new Array();
    var cresult = document.getElementById('combat_result');
    var str_destroços = getElementsByClass('action',cresult)[1].innerHTML.split('<br>')[2];
    ret[0] = parseInt(str_destroços.split('e')[0].replace(/\D*/g,''));
    ret[1] = parseInt(str_destroços.split('e')[1].replace(/\D*/g,''));
    ret[2] = parseInt(ret[0]) + parseInt(ret[1]);
    return ret;    
}

function getRoubou() {
    var ret = [0, 0, 0, 0];
    
    if(getMensajeConclusion().indexOf("atacante") != -1) {
        var cresult = document.getElementById('combat_result');
        var str_roubou = getElementsByClass('action',cresult)[0].innerHTML;
        var str_metal = str_roubou.substring(str_roubou.indexOf('roubou'), str_roubou.indexOf('Metal'));
        var str_cristal = str_roubou.substring(str_roubou.indexOf(','), str_roubou.indexOf('Cristal'));
        var str_deuterio = str_roubou.substring(str_roubou.indexOf('e'), str_roubou.indexOf('Deutério'));
        
        if(str_metal.length == 0) str_metal = '0';
        if(str_cristal.length == 0) str_cristal = '0';
        if(str_deuterio.length == 0) str_deuterio = "0";
        
        ret[0] = parseInt(str_metal.replace(/\D/g,''));
        ret[1] = parseInt(str_cristal.replace(/\D/g,''));
        ret[2] = parseInt(str_deuterio.replace(/\D/g,''));
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
        ret = 'O atacante ganhou a batalha!';
        
    if(str.indexOf('defensor') != -1)
        ret = 'O defensor ganhou a batalha!';
        
    if(str.indexOf('empate') != -1)
        ret = 'A batalha termina em empate!';

    
    return ret;
}


function calcularRecicladores(destroços) {
    var ret = 0;
    
    if(destroços > 0) ret = (parseInt(destroços)/20000)+1;
    
    return ret;
}


function getRondas() {
	var rondas = new Array;
	
	var item = getElementsByClass("combat_round");
	
	for(var i = 0; i < item.length; i++) {
		var inserido = false;
		for(var r = 0; r < rondas.length && !inserido; r++) {
			if(item[i].innerHTML == rondas[r].innerHTML) {
				inserido = true;
			}
		}
		if(!inserido) {
			rondas.push(item[i]);
		}
	}

    return (rondas);
}


function getQuadrosBBCode(padrao) {

   var html = "";

   // cuadros de texto
   html += '<table cellspacing="0" cellpadding="0">';
   html += '<tr><td>'
   // foro ogame
   html += '<b><font color=#FE9A2E>Fórum OGame:</font></b><br>';
   html += '<textarea id="txtBB" name="txtBB" style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
   html += codificar(padrao, "OGame", SCRIPT.version);
   html += '</textarea><br><br>';
   html += '</td><td>'
   // foro phpBB
   html += '<b><font color=#FE9A2E>Fórum phpBB:</font></b><br>';
   html += '<textarea id="txtBB" name="txt_phpBB" style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
   html += codificar(padrao, "phpBB", SCRIPT.version);
   html += '</textarea><br><br>';
   html += '</td></tr><tr><td>'
   // foro phpBB3
   html += '<b><font color=#FE9A2E>Fórum phpBB 3:</font></b><br>';
   html += '<textarea id="txtBB" name="txt_phpBB" style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
   html += codificar(padrao, "phpBB3", SCRIPT.version);
   html += '</textarea><br><br>';
   html += '</td><td>'
   // html
   html += '<b><font color=#FE9A2E>HTML:</font></b><br>';
   html += '<textarea id="txtBB" name="txt_phpBB" style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
   html += codificar(padrao, "HTML", SCRIPT.version);
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



function getFrotas(numRonda, ataque) {
    
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
            var nome = destroyed.innerHTML;
            nome = nome.replace('Defensor ', '');
            nome = nome.replace('destruído.', '');
            ret.add(nome);
        }
        else {
        
            var nome = getElementsByClass("name", newBack[i])[0].firstChild.textContent;
            var tabla = newBack[i].getElementsByTagName("TABLE")[0];
            
            nome = nome.replace('Atacante ', '');
            nome = nome.replace('Defensor ', '');

            for(var j = 1; j < getColumnas(tabla); j++) {
                nave = getContenido(tabla, 0, j);
                quantidade = getContenido(tabla, 1, j).replace(/\./gi, '');
                ret.add(nome, nave, quantidade);
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

    codHTML.innerHTML = codificar(padrao, "HTML", document.F1.centrado.checked, version);
    txtBB.value = codificar(padrao, tipoCodif, document.F1.centrado.checked, version);
    
    
}

// ============================================================

function compactar()  {
    
    	var comp = document.getElementById("compactado");
    	if (comp != null ) return 0;
        
        var padrao = ''; 
		var compactador = document.createElement('div');  
  
		
		var rondas = getRondas();
		var numRondas = rondas.length-1;
        
        // atacantes
        var lstAtaq = getFrotas(0, true);
        var lstAtaq_final = getFrotas(numRondas, true);
        lstAtaq.addSobreviventes(lstAtaq_final);
        
        
        // defensores
        var lstDef = getFrotas(0, false);        
        var lstDef_final = getFrotas(numRondas, false);
        lstDef.addSobreviventes(lstDef_final);
        
        
        lstAtaq.ordenar();
        lstDef.ordenar();
 

        
        // *****************************************************************************************************************
        // ***** GENERA padrao *********************************************************************************************


        padrao = '';
		
		if(numRondas < 1) numRondas= 1;
        
        if(numRondas == 1) {
			padrao += '{SIZE_PEQ}As seguintes frotas cruzaram os seus caminhos e o combate foi inevitável. A batalha durou uma ronda no dia ' + getFecha() + '{/SIZE}{NL}';
        }
        else {
			padrao += '{SIZE_PEQ}As seguintes frotas cruzaram os seus caminhos e o combate foi inevitável. A batalha durou ' + numRondas + ' rondas no dia ' + getFecha() + '{/SIZE}{NL}';
        }
        
        
        // ATACANTES
        padrao += '{COLOR_T1}{B}{SIZE_GRA}Atacantes (' + lstAtaq.length() + '):{/SIZE}{/B}{/COLOR}{NL}';
        
        for(var i = 0; i < lstAtaq.length(); i++){
             padrao += '{COLOR_A1}{B}{SIZE_MED}'+ lstAtaq.getnome(i) + '{/SIZE}{/B}{/COLOR}{NL}';
             for(var j = 0; j < lstAtaq.getFrotas(i).length(); j++) {
                 var nome = lstAtaq.getFrotas(i).getnome(j);
                 var unidades = N(lstAtaq.getFrotas(i).getUnidades(j));
                 var perdidas = N(lstAtaq.getFrotas(i).getPerdidas(j));
                 padrao += nome + " {COLOR_A1}" + unidades + "{/COLOR} {COLOR_A2}perdeu " + perdidas +  "{/COLOR}{NL}";
             }
             padrao += '{NL}';

             if(lstAtaq.getCustoPerdidas(i)[3] != 0) {    
               var Custo = N(lstAtaq.getCustoPerdidas(i));
               padrao += 'Perdas: {COLOR_R1}' + Custo[3] + '{/COLOR}{NL}';
               padrao += '( {COLOR_R2}' + Custo[0] + '{/COLOR}, Metal  {COLOR_R2}' + Custo[1] + '{/COLOR}, Cristal, {COLOR_R2}' + Custo[2] + '{/COLOR} Deutério ){NL}{NL}';
            }
             
        }
        
        
        
         // DEFENSOR
        padrao += '{COLOR_T1}{B}{SIZE_GRA}Defensores (' + lstDef.length() + '):{/SIZE}{/B}{/COLOR} {NL}';
        
        for(var i = 0; i < lstDef.length(); i++){
          padrao += '{COLOR_D1}{B}{SIZE_MED}'+ lstDef.getnome(i) + '{/SIZE}{/B}{/COLOR}{NL}';
          for(var j = 0; j < lstDef.getFrotas(i).length(); j++) {
            var nome = lstDef.getFrotas(i).getnome(j);
            var unidades = N(lstDef.getFrotas(i).getUnidades(j));
            var perdidas = N(lstDef.getFrotas(i).getPerdidas(j));
            padrao += nome + " {COLOR_D1}" + unidades + "{/COLOR} {COLOR_D2}perdeu " + perdidas +  "{/COLOR}{NL}";
          }
          
          if(lstDef.getFrotas(i).length() == 0) {
            padrao += "{I}Sem defesas{/I}{NL}";
          }
          
          padrao += '{NL}';
          
          if(lstDef.getCustoPerdidas(i)[3] != 0) {
             var Custo = N(lstDef.getCustoPerdidas(i));
             padrao += 'Perdas: {COLOR_R1}' + Custo[3] + '{/COLOR}{NL}';
             padrao += '( {COLOR_R2}' + Custo[0] + '{/COLOR}, Metal  {COLOR_R2}' + Custo[1] + '{/COLOR}, Cristal, {COLOR_R2}' + Custo[2] + '{/COLOR} Deutério ){NL}{NL}';
          }
        }
        
        padrao += '{SIZE_MED}{COLOR_RB}{B}' + getMensajeConclusion() + '{/B}{/COLOR}{/SIZE}{NL}{NL}';
        
 
 
        // RESUMEN (robos, destroços, perdidas, rentabilidad...)
        

        var perdidasAtaq = lstAtaq.getCustoPerdidas(-1);
        var perdidasDef = lstDef.getCustoPerdidas(-1);
        var N_perdidasAtaq = N(perdidasAtaq);
        var N_perdidasDef = N(perdidasDef);
        
        var perdidasTotales = new Array();
        perdidasTotales[0] = (perdidasAtaq[0] + perdidasDef[0]);
        perdidasTotales[1] = (perdidasAtaq[1] + perdidasDef[1]);
        perdidasTotales[2] = (perdidasAtaq[2] + perdidasDef[2]);
        perdidasTotales[3] = (perdidasAtaq[0] + perdidasDef[0]) + (perdidasAtaq[1] + perdidasDef[1]) + (perdidasAtaq[2] + perdidasDef[2]);
        var N_perdidasTotales = N(perdidasTotales);


        var destroços = getDestroços();
        var N_destroços = N(destroços);
        
        var roubou = getRoubou();
        var N_roubou = N(roubou); 
        
        
        // RENTABILIDAD Y PORCENTAJE: ATACANTE CON RECICLAJE
        var renta_ataq_conReci = new Array();
        renta_ataq_conReci[0] = (-1*perdidasAtaq[0])+roubou[0]+destroços[0];
        renta_ataq_conReci[1] = (-1*perdidasAtaq[1])+roubou[1]+destroços[1];
        renta_ataq_conReci[2] = (-1*perdidasAtaq[2])+roubou[2];
        renta_ataq_conReci[3] = (-1*perdidasAtaq[3])+roubou[3]+destroços[2];
        var N_renta_ataq_conReci = N(renta_ataq_conReci);
        
        var p_renta_ataq_conReci = new Array();
        p_renta_ataq_conReci[3] = Math.floor((renta_ataq_conReci[3]/perdidasAtaq[3])*100);
        p_renta_ataq_conReci[0] = Math.floor((renta_ataq_conReci[0]/perdidasAtaq[0])*100);
        p_renta_ataq_conReci[1] = Math.floor((renta_ataq_conReci[1]/perdidasAtaq[1])*100);
        p_renta_ataq_conReci[2] = Math.floor((renta_ataq_conReci[2]/perdidasAtaq[2])*100);
        var p_renta_ataq_conReci = N(p_renta_ataq_conReci);
        
        
        // RENTABILIDAD Y PORCENTAJE: ATACANTE SIN RECICLAJE
        var renta_ataq_sinReci = new Array();
        renta_ataq_sinReci[0] = (-1*perdidasAtaq[0])+roubou[0];
        renta_ataq_sinReci[1] = (-1*perdidasAtaq[1])+roubou[1];
        renta_ataq_sinReci[2] = (-1*perdidasAtaq[2])+roubou[2];
        renta_ataq_sinReci[3] = (-1*perdidasAtaq[3])+roubou[3];
        var N_renta_ataq_sinReci = N(renta_ataq_sinReci);
        
        var p_renta_ataq_sinReci = new Array();
        p_renta_ataq_sinReci[3] = Math.floor((renta_ataq_sinReci[3]/perdidasAtaq[3])*100);
        p_renta_ataq_sinReci[0] = Math.floor((renta_ataq_sinReci[0]/perdidasAtaq[0])*100);
        p_renta_ataq_sinReci[1] = Math.floor((renta_ataq_sinReci[1]/perdidasAtaq[1])*100);
        p_renta_ataq_sinReci[2] = Math.floor((renta_ataq_sinReci[2]/perdidasAtaq[2])*100);
        p_renta_ataq_sinReci = N(p_renta_ataq_sinReci);

        
        // RENTABILIDAD Y PORCENTAJE: DEFENSOR CON RECICLAJE
        var renta_def_conReci = new Array();
        renta_def_conReci[0] = (-1*perdidasDef[0])+destroços[0];
        renta_def_conReci[1] = (-1*perdidasDef[1])+destroços[1];
        renta_def_conReci[2] = (-1*perdidasDef[2]);
        renta_def_conReci[3] = (-1*perdidasDef[3])+destroços[2];
        var N_renta_def_conReci = N(renta_def_conReci);
        
        var p_renta_def_conReci = new Array();
        p_renta_def_conReci[3] = Math.floor((renta_def_conReci[3]/perdidasDef[3])*100);
        p_renta_def_conReci[0] = Math.floor((renta_def_conReci[0]/perdidasDef[0])*100);
        p_renta_def_conReci[1] = Math.floor((renta_def_conReci[1]/perdidasDef[1])*100);
        p_renta_def_conReci[2] = Math.floor((renta_def_conReci[2]/perdidasDef[2])*100);
        p_renta_def_conReci = N(p_renta_def_conReci);
        
        
                
        padrao += '{B}O atacante roubou:{/B} {COLOR_R4}{SIZE_MED}' + N_roubou[0] + '{/SIZE}{/COLOR} Metal, {COLOR_R4}{SIZE_MED}' + N_roubou[1] + '{/SIZE}{/COLOR} Cristal e {COLOR_R4}{SIZE_MED}' + N_roubou[2] + '{/SIZE}{/COLOR} Deutério{NL}';
        padrao += '{B}Nessas coordenadas flutuaram:{/B} {COLOR_R3}{SIZE_GRA}{B}' + N_destroços[0] + '{/B}{/SIZE}{/COLOR} Metal e {COLOR_R3}{SIZE_GRA}{B}' +  N_destroços[1] + '{/B}{/SIZE}{/COLOR} Cristal ( {COLOR_R3}'   + N(calcularRecicladores(destroços[2])) + "{/COLOR} recicladores ){NL}";
        
        padrao += '{NL}{NL}'
        
        padrao += '{COLOR_T1}PERDAS{/COLOR} Atacantes: {COLOR_R1}' + N_perdidasAtaq[3] + '{/COLOR}{NL}';
        padrao += '( {COLOR_R2}' + N_perdidasAtaq[0] + "{/COLOR} metal , {COLOR_R2}" + N_perdidasAtaq[1] + "{/COLOR} cristal, {COLOR_R2}" + N_perdidasAtaq[2] + "{/COLOR} deutério ){NL}{NL}";
        
        padrao += '{COLOR_T1}PERDAS{/COLOR} Defensores: {COLOR_R1}' + N_perdidasDef[3] + '{/COLOR}{NL}';
        padrao += '( {COLOR_R2}' + N_perdidasDef[0] + "{/COLOR} metal , {COLOR_R2}" + N_perdidasDef[1] + "{/COLOR} cristal, {COLOR_R2}" + N_perdidasDef[2] + "{/COLOR} deutério ){NL}{NL}";
        
        padrao += '{NL}'
        
        
        if(destroços[2] > 0) {
            padrao += '{COLOR_T1}{SIZE_MED}{B}LUCRO{/B}{/SIZE}{/COLOR} com atacantes {COLOR_RECI}reciclando{/COLOR}: {COLOR_R1}{B}' + N_renta_ataq_conReci[3] + '{/B}{/COLOR} [' + p_renta_ataq_conReci[3] + '%]{NL}';
            padrao += 'Metal: {COLOR_R2}' + N_renta_ataq_conReci[0]  + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_conReci[0] + '%]{/SIZE}{NL}';
            padrao += 'Cristal: {COLOR_R2}' +  N_renta_ataq_conReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_conReci[1] + '%]{/SIZE}{NL}';
            padrao += 'Deutério: {COLOR_R2}' +  N_renta_ataq_conReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_conReci[2] + '%]{/SIZE}{NL}';
            
            padrao += '{COLOR_T1}{SIZE_MED}{B}LUCRO{/B}{/SIZE}{/COLOR} com atacantes {COLOR_SINRECI}sem reciclar{/COLOR}: {COLOR_R1}{B}' + N_renta_ataq_sinReci[3] + '{/B}{/COLOR} [' + p_renta_ataq_sinReci[3] + '%]{NL}';
            padrao += 'Metal: {COLOR_R2}' +  N_renta_ataq_sinReci[0] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[0] + '%]{/SIZE}{NL}';
            padrao += 'Cristal: {COLOR_R2}' +  N_renta_ataq_sinReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[1] + '%]{/SIZE}{NL}';
            padrao += 'Deutério: {COLOR_R2}' +  N_renta_ataq_sinReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[2] + '%]{/SIZE}{NL}';

            padrao += '{COLOR_T1}{SIZE_MED}{B}LUCRO{/B}{/SIZE}{/COLOR} com defensores {COLOR_RECIDEF}reciclando{/COLOR}: {COLOR_R1}{B}' + N_renta_def_conReci[3] + '{/B}{/COLOR} [' + p_renta_def_conReci[3] + '%]{NL}';
            padrao += 'Metal: {COLOR_R2}' +  N_renta_def_conReci[0] + '{/COLOR} {SIZE_PEQ}[' + p_renta_def_conReci[0] + '%]{/SIZE}{NL}';
            padrao += 'Cristal: {COLOR_R2}' +  N_renta_def_conReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_def_conReci[1] + '%]{/SIZE}{NL}';
            padrao += 'Deutério: {COLOR_R2}' +  N_renta_def_conReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_def_conReci[2] + '%]{/SIZE}{NL}';
        }
        else {
            padrao += '{COLOR_T1}{B}LUCRO{/B}{/COLOR} Atacantes {COLOR_R1}' + N_renta_ataq_sinReci[3] + '{/COLOR} [' + p_renta_ataq_sinReci[3] + '%]{NL}';
            padrao += 'Metal: {COLOR_R2}' +  N_renta_ataq_sinReci[0] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[0] + '%]{/SIZE}{NL}';
            padrao += 'Cristal: {COLOR_R2}' +  N_renta_ataq_sinReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[1] + '%]{/SIZE}{NL}';
            padrao += 'Deutério: {COLOR_R2}' +  N_renta_ataq_sinReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[2] + '%]{/SIZE}{NL}';
        }
        
        // si rentabilidad = infinita, lo cambia por MAX
        padrao = padrao.replace(/infinity\%/gi, "Máx.");
        padrao = padrao.replace(/NaN\%/gi, "Máx.");
        
        
        if(getlua().length > 4)
            padrao += '{NL}' + getlua() + '{NL}'
        
        
        padrao += '{NL}{SIZE_MED} Perdas {COLOR_T1}TOTAIS{/COLOR}: {B}{COLOR_R3}' + N(perdidasTotales[3]) + '{/COLOR}{/B}{/SIZE}{NL}';
        
        padrao += '{NL}{SIZE_PEQ}{ENLACE_SCRIPT}{/SIZE}{NL}'; 
        
        
        
        // *****************************************************************************************************************
        // ***** padrao MINI ***********************************************************************************************
        
        
        var padraoMini = "{COLOR_T1}{B}Ataque-Farm{/B}{/COLOR} [ {COLOR_A1}";
                
        for(var i = 0; i < lstAtaq.length(); i++){
        	 if (i != 0) padraoMini += ' &amp; ';
             padraoMini  += lstAtaq.getnome(i);
        }
        
        padraoMini += ' [] vs [] ';
        
         for(var i = 0; i < lstDef.length(); i++){
          	if (i != 0) padraoMini += ' &amp; ';
            padraoMini += lstDef.getnome(i);
        }
        
        padraoMini +=  '{/COLOR} ]{NL}{COLOR_T1}{B}Lucro atacante: {/B}{/COLOR} {COLOR_R4}' + N_renta_ataq_conReci[0] + '{/COLOR} Metal, {COLOR_R4}' + N_renta_ataq_conReci[1] + '{/COLOR} Cristal, {COLOR_R4}' + N_renta_ataq_conReci[2] + '{/COLOR} Deutério {NL}'; 


      
        // *****************************************************************************************************************
        // ***** MOSTRAR ***************************************************************************************************
        
        var html = '';

        html += '<div style="font-size:14px;font-family:Verdana,sans-serif;">';
        html +=  '<br><center><table border="0" width="90%" style="">';
        html += '<tr><td colspan="2" height="450" bgcolor="#1F273C" style="border: 2px solid #FFFFFF;"><br><br>'
        html += '<div id="codHTML">' + codificar(padrao, 'HTML', SCRIPT.version) + '</div>';
        html += '</td></tr>';
        html += '<tr><td><br><center>';
        html += getQuadrosBBCode(padrao);
        html += '</center></td></tr></table></center><br>'
        
        
        // padrao mini
              //cabecera
        html +=  '<div><table border="0" width="100%" style="">';
        html += '<tr><td colspan="2" height="30" bgcolor="#000000" style="border: 2px solid #000000;">';
        html += '<p align="center"><font style="font-size:12pt;" color="#FF6600">';
        html += '<b>BATALHA COMPACTADA</b>';
        html += '</font></p></td></tr></table></div>';
        html +=  '<br><center><table border="0" width="90%" style="">';
        html += '<tr><td colspan="2" height="100" bgcolor="#1F273C" style="border: 2px solid #FFFFFF;"><br><br>'
        html += '<div id="codHTML">' + codificar(padraoMini, 'HTML', SCRIPT.version) + '</div>';
        html += '</td></tr>';
        html += '<tr><td><br><center>';
        html += getQuadrosBBCode(padraoMini);
        html += '</center></td></tr></table></center><br>'
        html += '</div>';
      
        compactador.innerHTML = html;
		
		master = getElementsByClass("combatreport")[0];
		compactador.innerHTML = compactador.innerHTML + master.innerHTML;
		master.innerHTML = compactador.innerHTML;
		master.id = "compactado";

}


}) ();

// U-cursos notas
// version 1.1 
// Copyright (c) 2010, Nicolas Lehmann
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// This program is free software; you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation; either version 2 of the License, or (at your option) any later
// version. This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details. You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
//
// --------------------------------------------------------------------
//
// Script que añade las siguientes funcionalidades 
// a la pagina de notas de u-cursos.
//
// 1 - Posibilidad de seleccionar las notas que salen en cada promedio
// 2 - Opcion de calcular promedios mediante selección o ponderación
// 3 - Posibilidad de ordenar por notas, nombre o fecha
// 4 - Las estadisticas ya no se muestran al final de la pagina, si no en una capa
//     que puede ser arrastrada
// 5 - Las filas se iluminan cuando se pasa por encima
//	
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name U-cursos Improve. Notas
// @description Anade funcionalidades a la pagina de notas de u-cursos
// @author         Nicolas Lehmann
// @copyright      2010, Nicolas Lehmann 
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @namespace      U-cursos_improve
// @include        https://www.u-cursos.cl/*
// ==/UserScript==

function carga()
{
    posicion=0;
	
    // IE
    if(navigator.userAgent.indexOf("MSIE")>=0) navegador=0;
    // Otros
    else navegador=1;

    registraDivs();
}

function registraDivs()
{
    var estadisticas = document.getElementById("estadisticas");
    estadisticas.addEventListener('mouseover',function() {
        estadisticas.style.cursor="move";
    },false);
    estadisticas.addEventListener('mousedown',comienzoMovimiento,false);
}

function evitaEventos(event)
{
    // Funcion que evita que se ejecuten eventos adicionales
    if(navegador==0)
    {
        window.event.cancelBubble=true;
        window.event.returnValue=false;
    }
    if(navegador==1) event.preventDefault();
}

function comienzoMovimiento(event)
{	
	
    elMovimiento = document.getElementById("estadisticas");
    // Obtengo la posicion del cursor
    if(navegador==0)
    {
        cursorComienzoX=window.event.clientX+document.documentElement.scrollLeft+document.body.scrollLeft;
        cursorComienzoY=window.event.clientY+document.documentElement.scrollTop+document.body.scrollTop;
    }
    if(navegador==1)
    {
        cursorComienzoX=event.clientX+window.scrollX;
        cursorComienzoY=event.clientY+window.scrollY;
    }
	
    document.addEventListener('mousemove',enMovimiento,false);
    document.addEventListener('mouseup',finMovimiento,false);
	
    var style = getComputedStyle(elMovimiento,'');
    elComienzoX=parseInt(style.left);
    elComienzoY=parseInt(style.top);
	
    // Actualizo el posicion del elemento
    elMovimiento.style.zIndex=++posicion;
	
    evitaEventos(event);
}

function enMovimiento(event)
{  
    var xActual, yActual;
	
    if(navegador==0)
    {
        xActual=window.event.clientX+document.documentElement.scrollLeft+document.body.scrollLeft;
        yActual=window.event.clientY+document.documentElement.scrollTop+document.body.scrollTop;
    }
    if(navegador==1)
    {
        xActual=event.clientX+window.scrollX;
        yActual=event.clientY+window.scrollY;
    }
	
    elMovimiento.style.left=(elComienzoX+xActual-cursorComienzoX)+"px";
    elMovimiento.style.top=(elComienzoY+yActual-cursorComienzoY)+"px";
	
    evitaEventos(event);
}

function finMovimiento(event)
{
    document.removeEventListener('mousemove',enMovimiento,false);
    document.removeEventListener('mouseup',finMovimiento,false);
}

carga();


function rdm(){
    var t = new Date();
    return t.getTime() * Math.random();
}


function quickAjax( url, func, send, extra ) {
    var method = send == null ? 'GET' : 'POST';
    var text = null;
    var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ;
    var ok = false;
    url += url.indexOf( '?' ) >= 0 ? '&_ajax='+rdm() : '?_ajax='+rdm();
    try{
        req.onreadystatechange = function(){
            if( req.readyState == 4 && ! ok ) {
                if( func )
                    func( req.responseText, extra );
                text = req.responseText;
                ok = true;
            }
        }
        req.onload = function(){
            if( ! ok ) {
                if( func ) func( req.responseText, extra );
                text = req.responseText;
                ok = true;
            }
        }
    } catch( e ){}
    try {
        req.open( method, url, func ? true : false );
    } catch( e ) {
        return 'error en req.open';
    }
    if( method == 'POST' ) {
        req.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
        req.setRequestHeader( 'Connection', 'close' );
    }
    req.send( send );
    if( ! func ) {
        if( req.status == 403 ) document.location.reload();
        return text;
    }
}


/**
  * Remueve los espacios de str
 **/
function remove(str){
    var temp="";
    for(var i = 0; i<str.length;++i){
        var c = str.charAt(i);
        if(c !=  " ")
            temp = temp + c;
    }
    return temp;
}
	
var css = "";

function addGlobalStyle(str) {
    css += str;
}

function appendGlobalStyle() {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function processGetEstadistica(event){
    var a = event.currentTarget;
    var href = unescape(a.href)
    var id = href.substring(href.indexOf("(")+1,href.lastIndexOf(")"))-0;
    var estadisticas = document.getElementById('estadisticas')
	
    estadisticas.style.display='';
    estadisticas.style.top=(event.clientY+window.scrollY-23)+"px";
    estadisticas.style.left=window.innerWidth/2-60+"px";
	
    estadisticas.innerHTML = '<span class="espera" style="width:150px">Cargando estadísticas...</span>';
    estadisticas.innerHTML = quickAjax( 'alumno_detalle.php?escala=0&id_evaluacion='+id );
	
    var style = getComputedStyle(estadisticas,'');
    estadisticas.style.top=(event.clientY+window.scrollY-parseInt(style.width)/3)+"px";
	
    document.getElementById('id_evaluacion').value = id;
    var cerrar = document.createElement('a');
    cerrar.href = "javascript:toggle('estadisticas');";
    cerrar.class = "footer";
    cerrar.innerHTML = "cerrar";
    estadisticas.appendChild(cerrar);
    event.preventDefault();
}


var Url = location.href;
escala = 0;

if(Url.indexOf('?')>0){
    Url = Url.replace(/.*\?(.*?)/,"$1");
    Variables = Url.split ("&");
    for (i = 0; i < Variables.length; i++) {
        Separ = Variables[i].split("=");
        eval ('var '+Separ[0]+'="'+Separ[1]+'"');
    }
}
if(escala == 0){
    escala = 1;
}
else if(escala == 10){
    escala = 0;
}
/**
 * Calcula y muestra el nuevo promedio
 * El currentTarget puede ser el selector de opciones o un input tipo checkbox o textfield,
 * en el caso del input tiene los atributo
 * noteblock - bloque de notas correspondiente
 * En el caso de ser el selector de opciones, la capa opciones mantiene el atributo
 * noteblock
**/
function calcularPromedio(event){
    var handler = event.currentTarget;
	
    var name = handler.getAttribute('noteblock');
    //Si no tiene el atributo noteblock entonces es el selector de opciones quien maneja el evento
    if(!name)
        name = document.getElementById('opciones').getAttribute('noteblock');
    var notas = document.evaluate("//input[starts-with(@id,'"+name+"') and not( contains(@id,'master'))]",
        table,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
	
    var check = handler.getAttribute('type') ? handler.getAttribute('type')=='checkbox':handler.firstChild.nodeValue=='Cambiar a Seleccion';

    var promedio;
    if(check){
        var suma = 0;
        var n = 0;
        for (var i = 0; i < notas.snapshotLength; i++) {
            if(notas.snapshotItem(i).checked){
                var nota = notas.snapshotItem(i).getAttribute('nota') - 0;
                suma = suma + nota;
                ++n;
            }
        }
        promedio = Math.round(suma/n*elevar(10,escala))/elevar(10,escala);
    }
    else{
        var suma = 0;
        for (var i = 0; i < notas.snapshotLength; i++) {
            var input = notas.snapshotItem(i);
            var nota = input.getAttribute('nota') - 0;
            suma = suma + nota*input.getAttribute('value')/100;
        }
        promedio = Math.round(suma*elevar(10,escala))/elevar(10,escala);
        if(promedio==0 ||document.getElementById(name+"_master").value>100)
            promedio = 1/0;
    }

    if(!isFinite(promedio))
        promedio = "";
    else
        promedio = sprintf("%1."+escala+"f",promedio);
    var container = document.getElementById(name);
    if(promedio<4)
        container.style.color='rgb(255,12,18)';
    else
        container.style.color='black';
    container.replaceChild(document.createTextNode(promedio),container.firstChild);
}

function sprintf ( ) {
    // *     example 1: sprintf("%01.2f", 123.1);
    // *     returns 1: 123.10    // *     example 2: sprintf("[%10s]", 'monkey');
    // *     returns 2: '[    monkey]'
    // *     example 3: sprintf("[%'#10s]", 'monkey');
    // *     returns 3: '[####monkey]'
    var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
    var a = arguments, i = 0, format = a[i++];

    // pad()
    var pad = function (str, len, chr, leftJustify) {
        if (!chr) {
            chr = ' ';
        }
        var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding + str;
    };

    // justify()
    var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
        var diff = minWidth - value.length;
        if (diff > 0) {
            if (leftJustify || !zeroPad) {
                value = pad(value, minWidth, customPadChar, leftJustify);
            }
            else {
                value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
            }
        }
        return value;
    };

    // formatBaseX()
    var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
        // Note: casts negative numbers to positive ones        var number = value >>> 0;
        prefix = prefix && number && {
            '2': '0b',
            '8': '0',
            '16': '0x'
        }
        [base] || '';
        value = prefix + pad(number.toString(base), precision || 0, '0', false);
        return justify(value, prefix, leftJustify, minWidth, zeroPad);
    };
    // formatString()
    var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
        if (precision != null) {
            value = value.slice(0, precision);
        }
        return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
    };

    // doFormat()
    var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
        var number;
        var prefix;
        var method;
        var textTransform;
        var value;

        if (substring == '%%') {
            return '%';
        }

        // parse flags
        var leftJustify = false, positivePrefix = '', zeroPad = false, prefixBaseX = false, customPadChar = ' ';
        var flagsl = flags.length;
        for (var j = 0; flags && j < flagsl; j++) {
            switch (flags.charAt(j)) {
                case ' ':
                    positivePrefix = ' ';
                    break;
                case '+':
                    positivePrefix = '+';
                    break;
                case '-':
                    leftJustify = true;
                    break;
                case "'":
                    customPadChar = flags.charAt(j+1);
                    break;
                case '0':
                    zeroPad = true;
                    break;
                case '#':
                    prefixBaseX = true;
                    break;
            }
        }

        // parameters may be null, undefined, empty-string or real valued
        // we want to ignore null, undefined and empty-string values
        if (!minWidth) {
            minWidth = 0;
        }
        else if (minWidth == '*') {
            minWidth = +a[i++];
        } else if (minWidth.charAt(0) == '*') {
            minWidth = +a[minWidth.slice(1, -1)];
        } else {
            minWidth = +minWidth;
        }
        // Note: undocumented perl feature:
        if (minWidth < 0) {
            minWidth = -minWidth;
            leftJustify = true;
        }
        if (!isFinite(minWidth)) {
            throw new Error('sprintf: (minimum-)width must be finite');
        }
        if (!precision) {
            precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : undefined;
        } else if (precision == '*') {
            precision = +a[i++];
        } else if (precision.charAt(0) == '*') {
            precision = +a[precision.slice(1, -1)];
        } else {
            precision = +precision;
        }
        // grab value using valueIndex if required?
        value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

        switch (type) {
            case 's':
                return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
            case 'c':
                return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
            case 'b':
                return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'o':
                return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'x':
                return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'X':
                return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
            case 'u':
                return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'i':
            case 'd':
                number = parseInt(+value, 10);
                prefix = number < 0 ? '-' : positivePrefix;
                value = prefix + pad(String(Math.abs(number)), precision, '0', false);
                return justify(value, prefix, leftJustify, minWidth, zeroPad);
            case 'e':
            case 'E':
            case 'f':            case 'F':
            case 'g':
            case 'G':
                number = +value;
                prefix = number < 0 ? '-' : positivePrefix;
                method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                value = prefix + Math.abs(number)[method](precision);
                return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
            default:
                return substring;
        }
    };

    return format.replace(regex, doFormat);
}

function elevar(base,exp){
    if(exp ==0)
        return 1;
    if(exp%2 == 0){
        temp = elevar(base,exp/2);
        return temp*temp;
    }
    else
        return base*elevar(base,exp-1);
}

/**
 * Calcula la posición absoluta de un elemento
 * Devuelve un objeto con los atributos top y left.
**/
function getAbsoluteElementPosition(element) {
    if (typeof element == "string")
        element = document.getElementById(element)
    
    if (!element) return {
        top:0,
        left:0
    };
  
    var y = 0;
    var x = 0;
    while (element.offsetParent) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }
    return {
        top:y,
        left:x
    };
}

function cambiarPonderacion(event){
    var opciones = document.getElementById('opciones');
    var name = opciones.getAttribute('noteblock');
    var notas = document.evaluate("//input[starts-with(@id,'"+name+"')]",
        table,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < notas.snapshotLength; i++) {
        notas.snapshotItem(i).setAttribute('type','text');
    }
    document.getElementById(name+"_master").setAttribute("disabled", "disabled");
    opciones.style.display='none';
    opciones.removeEventListener('mouseout',ocultarOpciones,false);
    document.removeEventListener('click',ocultarOpciones,false);
    calcularPromedio(event);
}

function cambiarSeleccion(event){
    var opciones = document.getElementById('opciones');
    var name = document.getElementById('opciones').getAttribute('noteblock');
    var notas = document.evaluate("//input[starts-with(@id,'"+name+"')]",
        table,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < notas.snapshotLength; i++) {
        notas.snapshotItem(i).setAttribute('type','checkbox');
    }
    document.getElementById(name+"_master").removeAttribute("disabled");
    opciones.style.display='none';
    opciones.removeEventListener('mouseout',ocultarOpciones,false);
    document.removeEventListener('click',ocultarOpciones,false);
    calcularPromedio(event);
}

/**
 * Oculta el menu con opciones
 * Puede ser llamado al hacer click sobre cualquier parte del documento
 * o al sacar el mouse del menu.
**/
function ocultarOpciones(event){
    var element = document.getElementById('opciones');
    var mX = event.clientX+window.scrollX;
    var mY = event.clientY+window.scrollY;
    var pos = getAbsoluteElementPosition(element);
    var style = getComputedStyle(element,'');
    var h = parseInt(style.height);
    var w = parseInt(style.width);
	
    //alert("mouseX : "+mX+"  mouseY : "+mY+"\n posX : "+ pos.left+"  posY : "+pos.top+"\nX :"+(pos.left+w)+"  Y:"+(pos.top+h));
    if( !(mX > pos.left && mX<pos.left+w && mY>pos.top && mY<pos.top+h)){
        element.removeEventListener('mouseout',ocultarOpciones,false);
        document.removeEventListener('click',ocultarOpciones,false);
        element.style.display='none';
    }
	
}


/**
 * Muestra el menu con opciones. Recibe un evento cuyo currentrTareget tiene los atributos
 * noteblock - bloque de notas respectivo
 * Ademas asigna el atributo noteblock a la capa opciones
 */
function mostrarOpciones(event){
    var noteblock = event.currentTarget.getAttribute('noteblock');
    var opciones = document.getElementById('opciones');
    var position = getAbsoluteElementPosition(event.currentTarget);
    opciones.style.display='';
    opciones.style.top=(position.top+13)+"px";
    opciones.style.left=(position.left+2)+"px";
    opciones.setAttribute('noteblock',noteblock);
    opciones.addEventListener('mouseout',ocultarOpciones,false);
    document.addEventListener('click',ocultarOpciones,false);
    event.stopPropagation();
}


/**
 * Intercambia los elementos i y j del vector rows
**/
function intercambiar(rows,i,j){
    if(j!=i){
        var row1 = rows[i].innerHTML;
        var row2 = rows[j].innerHTML;
        var tbody = rows[i].parentNode;
        //alert("intercambiar");
        tbody.deleteRow(i);
        tbody.deleteRow(j-1);
        tbody.insertRow(i).innerHTML = row2 ;
        tbody.insertRow(j).innerHTML = row1;
        /*tbody.replaceChild(row1,tbody.rows[j]);
        tbody.replaceChild(row2,tbody.rows[i]);*/
    }
}


/**
 * Metodo auxiliar para quicksort
 * x - vector para ordenar
 * ip - indice del primer elemento
 * iu - indice del ultimo elemento
 * compareTo - función para comparar
 * desc - si es true el orden es descendente.
**/
function particionar(x, ip, iu, compareTo,desc){	
    //elegir pivote (por ejemplo: el primero)
    var pivote=x[ip];
	
    //repetir hasta que indices se superen
    var i=ip+1, j=iu;
    while(i<=j && !desc){
        //avanzar índice de menores
        while(i<=j && compareTo(x[i],pivote)<0)
            ++i;
        //retroceder índice de mayores o iguales
        while(i<=j && compareTo(x[j],pivote)>=0)
            --j;

        //intercambiar menor con mayor (si corr)
        if(i<=j) {
            intercambiar(x,i,j);
            ++i;
            --j;
        }
    }
    while(i<=j && desc){
        while(i<=j && compareTo(x[i],pivote)>0)
            ++i;
        //retroceder índice de mayores o iguales
        while(i<=j && compareTo(x[j],pivote)<=0)
            --j;
        if(i<=j) {
            intercambiar(x,i,j);
            ++i;
            --j;
        }
    }
    //pivote a su posición final
    /*x[ip]=x[j]; x[j]=pivote; */
    intercambiar(x,ip,j);
    return j;
}

/**
 * Quicksort
 * x - vector para ordenar
 * ip - indice del primer elemento
 * iu - indice del ultimo elemento
 * compareTo - función para comparar
 * desc - si es true el orden es descendente.
**/
function quicksort( x,ip,iu,compareTo,desc){
    //caso base(1 elemento)
    if(ip>=iu) return;
	
    //particionar (y obtener indice de pivote)
    var i=particionar(x,ip,iu,compareTo,desc);
	
    //ordenar 1ª parte
    quicksort(x,ip,i-1,compareTo,desc);
	
    //ordenar 2ª parte
    quicksort(x,i+1,iu,compareTo,desc);
}

function compareByNote(row1,row2){
    var textNode, nota1, nota2;
    textNode = row1.cells[prom];
    try{
        while( (textNode = textNode.firstChild).nodeType!=3);
    }
    catch(e){}
    nota1 = textNode ? textNode.nodeValue : 0;
	
    textNode = row2.cells[prom];
    try{
        while( (textNode = textNode.firstChild).nodeType!=3);
    }
    catch(e){}
    nota2 = textNode? textNode.nodeValue : 0;
	
    return nota1-nota2;
}

function compareByName(row1,row2){
    var textNode, name1, name2;
    textNode = row1.cells[1];
    while( (textNode = textNode.firstChild).nodeType!=3);
    name1 = textNode.nodeValue.toLowerCase().replace(/^\s*|\s*$/g,"");
	
    textNode = row2.cells[1];
    while( (textNode = textNode.firstChild).nodeType!=3);
    name2 = textNode.nodeValue.toLowerCase().replace(/^\s*|\s*$/g,"");
	
    if(name1<name2)
        return -1;
    else if(name1>name2)
        return 1;
    else (name1==name2)
    return 0;
    }

function compareByDate(row1,row2){
    var textNode, date1, date2, date;
    textNode = row1.cells[fecha];
    while( (textNode = textNode.firstChild).nodeType!=3);
    date1 = textNode.nodeValue;
	
    textNode = row2.cells[fecha];
    while( (textNode = textNode.firstChild).nodeType!=3);
    date2 = textNode.nodeValue;
	
    date = date1.split("/");
    date1 = new Date(date[2]<50?(date[2]-0+2000):date[2]-0+1900,date[1],date[0]);
	
    date = date2.split("/");
    date2 = new Date(date[2]<50?(date[2]-0+2000):date[2]-0+1900,date[1],date[0]);
	
    //alert(date1+" < "+date2+ " : " +(date1<date2));
	
    if(date1<date2)
    return -1;
    else if(date1>date2)
    return 1;
else (date1==date2)
    return 0;
}

/**
 * Rutina para ordenar tabla , el recibe un evento cuyo currentTarget que contiene los atributos:
 * func - función con cual comparar orden
 * orden - estado actual del orden (descendente o ascendente)
**/
function ordenar(event){
    var func= event.currentTarget.getAttribute('func');
    if(func == "name")
        func = compareByName;
    else if(func == "note")
        func = compareByNote;
    else if(func== "date")
        func = compareByDate;
    var desc = event.currentTarget.getAttribute('orden')=="desc" ?true:false;
    var links= document.evaluate(
        "//th[@class='desc' or @class='asc'] | //td[@class='desc' or @class='asc']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < links.snapshotLength; i++) {
        var th = links.snapshotItem(i);
        th.setAttribute('class','none');
    }
    event.currentTarget.setAttribute('class',desc?'desc':'asc');
    event.currentTarget.setAttribute('orden',desc?'asc':'desc');
    var table = document.getElementsByTagName('table')[0];
    var tbodies = table.tBodies;
    for(var i = 1;i<tbodies.length; i+=2){
        quicksort(tbodies[i].rows,0,tbodies[i].rows.length-2,func,desc);
    }
}



/**
 * Ordena un bloque de notas. Recibe un evento cuyo currentTarget contiene los atributos:
 * func - función con cual comparar orden
 * noteblock - bloque de notas correspondiente
 * orden - estado actual del orden (descendente o ascendente)
**/
function ordenarBloque(event){
    var func= event.currentTarget.getAttribute('func');
    if(func == "name")
        func = compareByName;
    else if(func == "note")
        func = compareByNote;
    else if(func== "date")
        func = compareByDate;
    var desc = event.currentTarget.getAttribute('orden')=="desc" ?true:false;
    var table = document.getElementsByTagName('table')[0];
    var links= document.evaluate(
        "//th[@class='desc' or @class='asc'] | //td[@class='desc' or @class='asc']",
        table,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < links.snapshotLength; i++) {
        var td = links.snapshotItem(i);
        td.setAttribute('class','none');
    }
    event.currentTarget.setAttribute('class',desc?'desc':'asc');
    event.currentTarget.setAttribute('orden',desc?'asc':'desc');
    var tbody = document.evaluate(
        "//tbody[@noteblock='"+event.currentTarget.getAttribute('noteblock')+"']",
        table,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null);
    quicksort(tbody.singleNodeValue.rows,0,tbody.singleNodeValue.rows.length-2,func,desc);
}

/**
 * Selecciona todos los checkboxes de un bloque de notas. El currentTarget tiene el atributo
 * noteblock - bloque de notas correspondiente
 *
**/
function selectAll(event){
    var name = this.getAttribute('noteblock');
    var notas = document.evaluate("//input[starts-with(@id,'"+name+"')]",
        table,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (var i = 0; i < notas.snapshotLength; i++) {
        notas.snapshotItem(i).checked = event.currentTarget.checked;
    }
}

/**
 * Procesa las teclas insertadas en los inputs.
 * Permite solo la insercción de numero y agrega la función para pasar al siguiente
 * input con enter o tab
**/
function processKeyDown(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    //9 tab,8 return, 13 enter, 46 supr, [37,40] flechas, [48,57] números, [112,123] F1,...,F12
    if(charCode==9 || charCode==13){
        var name = evt.currentTarget.getAttribute('noteblock');
        var notas = document.evaluate("//input[starts-with(@id,'"+name+"') and not( contains(@id,'master'))]",
            table,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null);
        var n = notas.snapshotLength;
        var i;
        for ( i = 0; i < n; i++) {
            if(evt.currentTarget == notas.snapshotItem(i))
                break;
        }
        notas.snapshotItem(evt.shiftKey?(i+n-1)%n:(i+1)%n).focus();
        evt.preventDefault();
    }
    if ((charCode<112 || charCode>123) && charCode!=46 && (charCode<37 || charCode>40) && charCode > 31 && (charCode < 48 || charCode > 57))
        evt.preventDefault();
    if(charCode>=48 && charCode<=57 && evt.currentTarget.value.length<3){
        var input = evt.currentTarget;
        var start = input.selectionStart;
        var end = input.selectionEnd;
        var prevtext = input.value;
        var text = input.value.substring(0,start)+(charCode-48)+input.value.substring(end);
        var master = document.getElementById(input.getAttribute('noteblock')+"_master");
        master.value = (master.value-0) - (prevtext - 0) + (text-0) || "";
    }
    if(charCode == 46 || charCode==8){
        input = evt.currentTarget;
        start = input.selectionStart;
        end = input.selectionEnd;
        prevtext = input.value;
        text = input.value.substring(0,start==end && charCode == 8?start-1:start)+ input.value.substring(start==end&&charCode==46?end+1:end);
        master = document.getElementById(input.getAttribute('noteblock')+"_master");
        master.value = (master.value-0) - (prevtext - 0) + (text-0) || "";
    }


}

function processKeyUp(evt){
    var name = evt.currentTarget.getAttribute('noteblock');
    var master = document.getElementById(name+"_master");
    var notas = document.evaluate("//input[starts-with(@id,'"+name+"') and not( contains(@id,'master'))]",
        table,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    var suma = 0;
    for (var i = 0; i < notas.snapshotLength; i++) {
        suma += notas.snapshotItem(i).value-0;
    }
    master.value = suma || "";
    if(suma>100)
        master.style.color='rgb(255,12,18)';
    else
        master.style.color='black';
    if(evt.currentTarget.value-0>100)
        evt.currentTarget.style.color='rgb(255,12,18)';
    else
        evt.currentTarget.style.color='black';
    //Agregamos un atributo value para que este permanesca cuando se cambie al modo
    //seleccion, de esta forma se puede llamar a calcularPromedio con el selector
    //de opciones
    evt.currentTarget.setAttribute('value',evt.currentTarget.value);
    calcularPromedio(evt);
}


addGlobalStyle('table thead tr th.asc, table thead tr th.desc{ background-color: #DEDEDE;}');
addGlobalStyle('table thead tr th span.asc,table thead tr th span.desc{display:block;margin-top:-14px;position:relative;text-align:right;width:100%;}');
addGlobalStyle('table thead tr th.desc span.asc{ display:none; }');
addGlobalStyle('table thead tr th.asc span.desc{ display:none; }');
addGlobalStyle('table thead tr th.none span.desc,table thead tr th.none span.asc{ display:none; }');
addGlobalStyle('table thead tr th span.off{ display:none; }');

addGlobalStyle('table tbody tr td.asc, table tbody tr td.desc{ background-color: #DEDEDE;}');
addGlobalStyle('table tbody tr td span.asc,table tbody tr td span.desc{display:block;margin-top:-14px;position:relative;text-align:right;width:100%;}');
addGlobalStyle('table tbody tr td.desc span.asc{ display:none; }');
addGlobalStyle('table tbody tr td.asc span.desc{ display:none; }');
addGlobalStyle('table tbody tr td.none span.desc,table tbody tr td.none span.asc{ display:none; }');
addGlobalStyle('table tbody tr td span.off{ display:none; }');

addGlobalStyle('table tbody tr:hover{ background-color: rgb(241,244,245); }');
addGlobalStyle('table tbody tr.separador:hover{background-color:rgb(247,239,222) ! important}');
addGlobalStyle('#estadisticas {border:2px rgb(188,188,188) dotted; padding:10px; background:rgb(280,280,280); position:absolute;z-index:2; }');
addGlobalStyle('#estadisticas table tbody td{min-width:50px;}');
addGlobalStyle('#estadisticas .footer{margin:auto;}');
addGlobalStyle('input.inputnote {margin:0;text-align:center;width:19px;height:13px;}');
addGlobalStyle('div#opciones {background-color:white;border:2px outset #959595;position:absolute;z-index:1;}');
addGlobalStyle('div#opciones ul {list-style-type:none;margin:0;}');
addGlobalStyle('div#opciones ul li {margin:0;}');
addGlobalStyle('div#opciones ul li a{color:black;display:block;margin-left:1px;padding:4px 10px;text-decoration:none;}');
addGlobalStyle('div#opciones ul li a:hover{background-color:#BEBEBE;cursor:pointer;}');
addGlobalStyle('table tbody tr td a.triangulo{color:black;text-decoration:none;padding:0 2px;}');
addGlobalStyle('table tbody tr td a.triangulo:hover{background-color:#BEBEBE;text-decoration:none;cursor:pointer;}');

appendGlobalStyle();


//Tabla
var table = document.getElementsByTagName('table')[0];

var links= document.evaluate(
    "//a[starts-with(@href,'javascript:getEstadistica')]",
    table,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < links.snapshotLength; i++) {
    var a = links.snapshotItem(i);
    a.addEventListener("click",processGetEstadistica,false);
}

//Posicion de la columna de promedios
var prom;
//Posicion de la columna fecha
var fecha;
//Posicion columna Evaluación
var evaluacion;
//Numero de columnas de la tabla
var numcol;


var cols = document.evaluate(
    "//col",
    table,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
var col = document.createElement('col');
table.insertBefore(col,cols.snapshotItem(0));

//Si la escala esta en porcentajes o letras nos ahorramos todo el esfuerzo
if(escala==4 || escala==5 || escala == 6){
    eval("abortar()")
}

//Agregar columna al Thead
var thRow = table.tHead.rows[0];
var newth = document.createElement('th');
thRow.insertBefore(newth,thRow.firstChild);

//Opciones tiene 3 columnas
numcol = thRow.cells.length+2;

//Buscar columna de promedios
for(prom = 1;prom<thRow.cells.length;++prom){
    var thCell, textNode;
    thCell = thRow.cells[prom];
    //Recursion para encontrar el primer firstChild que sea texto en la columna
    textNode = thCell;
    while( (textNode = textNode.firstChild).nodeType!=3);
    var test = textNode.nodeValue;
    if(remove(test)=='Prom.')
        break;
}
//Buscar columna Evaluacion
for(evaluacion = 1;evaluacion<thRow.cells.length;++evaluacion){
    var thCell, textNode;
    thCell = thRow.cells[evaluacion];
    //Recursion para encontrar el primer firstChild que sea texto en la columna
    textNode = thCell;
    while( (textNode = textNode.firstChild).nodeType!=3);
    test = textNode.nodeValue;
    if(remove(test)=='Evaluación')
        break;
}

//Buscar columna de Fechas
for(fecha = 1;fecha<thRow.cells.length;++fecha){
    var thCell, textNode;
    thCell = thRow.cells[fecha];
    //Recursion para encontrar el primer firstChild que sea texto en la columna
    textNode = thCell;
    while( (textNode = textNode.firstChild).nodeType!=3);
    test = textNode.nodeValue;
    if(remove(test)=='Fecha')
        break;
}



thRow.cells[prom].addEventListener("click",ordenar,false);
thRow.cells[prom].addEventListener("mouseover",function(){
    this.style.cursor='pointer';
},false);
thRow.cells[prom].setAttribute('func','note');
thRow.cells[prom].setAttribute('class','none');
thRow.cells[prom].setAttribute('orden','desc');
thRow.cells[prom].innerHTML = thRow.cells[prom].firstChild.nodeValue+'<span class="desc">\u25bc</span><span class="asc">\u25b2</span>';
thRow.cells[evaluacion].addEventListener("click",ordenar,false);
thRow.cells[evaluacion].addEventListener("mouseover",function(){
    this.style.cursor='pointer';
},false);
thRow.cells[evaluacion].setAttribute('func','name');
thRow.cells[evaluacion].setAttribute('class','none');
thRow.cells[evaluacion].setAttribute('orden','asc');
thRow.cells[evaluacion].innerHTML = thRow.cells[1].firstChild.nodeValue+'<span class="desc">\u25bc</span><span class="asc">\u25b2</span>';
thRow.cells[fecha].addEventListener("click",ordenar,false);
thRow.cells[fecha].addEventListener("mouseover",function(){
    this.style.cursor='pointer';
},false);
thRow.cells[fecha].setAttribute('func','date');
thRow.cells[fecha].setAttribute('class','none');
thRow.cells[fecha].setAttribute('orden','asc');
thRow.cells[fecha].innerHTML = thRow.cells[fecha].firstChild.nodeValue+'<span class="desc">\u25bc</span><span class="asc">\u25b2</span>';




//Recorrer Tbodies
var tbodies = table.tBodies;
for(var i = 0;i<tbodies.length; i+=2){
    var tbRows, textNode, title, test,insertcheck;
	
    //-------Tbody con separador
    tbRow = tbodies[i].rows[0];
	
    //Recursion para encontrar el primer firstChild que sea texto en la primera columna 
    textNode = tbRow.cells[0];
    while( (textNode = textNode.firstChild).nodeType!=3);
    title = textNode.nodeValue;
    tbRow.insertCell(0);
    var separador = tbRow;
    separador.cells[0].setAttribute('style','text-align:center;padding:3px 1px 3px 5px;');


    //Insertar columnas para poder ordenar por bloques

    //Controles
    tbRow.cells[1].colSpan = 1;
    tbRow.cells[1].addEventListener("click",ordenarBloque,false);
    tbRow.cells[1].addEventListener("mouseover",function(){this.style.cursor='pointer';},false);
    tbRow.cells[1].setAttribute('func','name');
    tbRow.cells[1].setAttribute('class','none');
    tbRow.cells[1].setAttribute('orden','asc');
    tbRow.cells[1].setAttribute('noteblock',title);
    tbRow.cells[1].innerHTML = tbRow.cells[1].firstChild.nodeValue+'<span class="desc">\u25bc</span><span class="asc">\u25b2</span>';
    //Fechas
    tbRow.insertCell(2);
    tbRow.cells[2].colSpan = 1;
    tbRow.cells[2].addEventListener("click",ordenarBloque,false);
    tbRow.cells[2].addEventListener("mouseover",function(){this.style.cursor='pointer';},false);
    tbRow.cells[2].setAttribute('func','date');
    tbRow.cells[2].setAttribute('class','none');
    tbRow.cells[2].setAttribute('orden','asc');
    tbRow.cells[2].setAttribute('noteblock',title);
    tbRow.cells[2].innerHTML = "&nbsp"+'<span class="desc">\u25bc</span><span class="asc">\u25b2</span>';
    //Notas
    tbRow.insertCell(3);
    tbRow.cells[3].colSpan = prom-fecha-1;
    //Promedio
    tbRow.insertCell(4);
    tbRow.cells[4].colSpan = 1;
    tbRow.cells[4].addEventListener("click",ordenarBloque,false);
    tbRow.cells[4].addEventListener("mouseover",function(){this.style.cursor='pointer';},false);
    tbRow.cells[4].setAttribute('func','note');
    tbRow.cells[4].setAttribute('class','none');
    tbRow.cells[4].setAttribute('orden','desc');
    tbRow.cells[4].setAttribute('noteblock',title);
    tbRow.cells[4].innerHTML = "&nbsp"+'<span class="desc">\u25bc</span><span class="asc">\u25b2</span>';
    //Opciones
    tbRow.insertCell(5);
    tbRow.cells[5].colSpan = 3;


    //------Tbody con notas
	
    tbRows = tbodies[i+1].rows;
    tbodies[i+1].setAttribute('noteblock', title);
    //Recursion para encontrar primer firstChild que sea texto en la primera celda de la ultima fila
    textNode = tbRows[tbRows.length-1].cells[0];
    while( (textNode = textNode.firstChild).nodeType!=3);
    test = textNode.nodeValue;
    insertcheck = false;
    if(remove(test) == ("Promedio'"+remove(title)+"'") )
        insertcheck = true;
    if(insertcheck){
        var flecha = document.createElement('a');
        flecha.appendChild(document.createTextNode("\u25bc"));
        flecha.setAttribute('noteblock',remove(title));
        flecha.setAttribute('class','triangulo');
        flecha.addEventListener('click',mostrarOpciones,false);
        tbRows[tbRows.length-1].cells[0].appendChild(flecha);
		
        var input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('checked','');
        input.setAttribute('class','inputnote');
        input.setAttribute('maxlength','3');
        input.setAttribute('id',remove(title)+'_master');
        input.setAttribute('noteblock',remove(title));
        input.addEventListener('change',selectAll,false);
        input.addEventListener('change',calcularPromedio,false);
        separador.cells[0].appendChild(input);

    }


										  
		
    for(var j = 0; j<tbRows.length;++j){
        var row = tbRows[j];
        row.insertCell(0);
        row.cells[0].setAttribute('style','text-align:center;width:25px;');
        try{
            //Recursion para encontrar, si es que hay, el primer firstChild que sea texto en la columna de observaciones
            textNode = row.cells[numcol-3];
            while( (textNode = textNode.firstChild).nodeType!=3);
			
            if(textNode.nodeValue == "Observaciones"){
                var href = textNode.parentNode.href;
                var id = href.substring(href.indexOf("'")+1,href.lastIndexOf("'") );
                var observacion = document.getElementById(id);
                observacion.style.display = 'none';
            }
			
			
			
        }
        catch(e){}
		
        if(insertcheck && j < tbRows.length-1){
            try{
                var label,nota;
                //Recursion para encontrar el primer firstChild que sea texto en la columna de promedios de la fila
                textNode = row.cells[prom];
                while( (textNode = textNode.firstChild).nodeType!=3);
                nota = textNode.nodeValue;
                textNode.parentNode.innerHTML = '<label for="'+remove(title)+'_'+j+'">'+textNode.nodeValue+'</label>';
                //Recursion para encontrar el primer firstChild que sea texto en la segunda columna de la fila
                textNode = row.cells[1];
                while( (textNode = textNode.firstChild).nodeType!=3);
                label = document.createElement('label');
                label.setAttribute('for',remove(title)+'_'+j);
                label.innerHTML = textNode.nodeValue;
                textNode.parentNode.replaceChild(label,textNode);
				
                var input = document.createElement('input');
                input.setAttribute('type','checkbox');
                input.setAttribute('checked','');
                input.setAttribute('nota',nota);
                input.setAttribute('class','inputnote');
                input.setAttribute('maxlength','3');
                input.setAttribute('id',remove(title)+'_'+j);
                input.setAttribute('noteblock',remove(title));
                input.addEventListener('change',calcularPromedio,true);
                input.addEventListener('keydown',processKeyDown,true);
                input.addEventListener('keyup',processKeyUp,true);
                row.cells[0].appendChild(input);
            }
            catch(e){}
        }
        if(insertcheck && j == tbRows.length-1){
            //Recursion para encontrar el primer firstChild que sea texto en la tercera columna de la fila
            textNode = row.cells[2];
            while( (textNode = textNode.firstChild).nodeType!=3);
            var promedio = textNode.parentNode
            promedio.setAttribute('id',remove(title));
        }
    }
}

//Div para opciones
var opcionesprom = document.createElement('div');
opcionesprom.setAttribute('id','opciones');
opcionesprom.style.display='none';

var listop = document.createElement('ul');

var ponderacion = document.createElement('li');
var opcion1 = document.createElement('a');
opcion1.addEventListener('click',cambiarPonderacion,false);
opcion1.appendChild(document.createTextNode("Cambiar a Ponderacion"));
ponderacion.appendChild(opcion1);

var seleccion = document.createElement('li');
var opcion2 = document.createElement('a');
opcion2.addEventListener('click',cambiarSeleccion,false);
opcion2.appendChild(document.createTextNode("Cambiar a Seleccion"));
seleccion.appendChild(opcion2);


listop.appendChild(ponderacion);
listop.appendChild(seleccion);

opcionesprom.appendChild(listop);

document.getElementById('body').appendChild(opcionesprom);


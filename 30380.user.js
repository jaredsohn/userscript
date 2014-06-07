// ==UserScript==
// @name          cursosWebUDD
// @namespace     http://jbz.wikidot.com
// @description   automatiza algunas cosas de los cursosWebb para ingenieros
// @include       http://www.udesarrollo.cl/cursos/Cursos_new/Alumnos/*
// ==/UserScript==


function addJS(a){
    var b = document.getElementsByTagName('head')[0];
    if (!b) {
        return;
    }
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.innerHTML = a;
    b.appendChild(c);
}

function addJS_SRC(a){
    var b = document.getElementsByTagName('head')[0];
    if (!b) {
        return;
    }
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.src = a;
    b.appendChild(c);
}

function addSTYLE_src(a){
    var b = document.getElementsByTagName('head')[0];
    if (!b) {
        return;
    }
    var c = document.createElement('link');
    c.rel = "stylesheet";
    c.type = "text/css";
    c.href = a;
    b.appendChild(c);
}


if (location.href.match('/index.php'))location.href = 'http://www.udesarrollo.cl/cursos/Cursos_new/Alumnos/carreras.php?sede=SANTIAGO&carrera=1500S';

if (location.href.match('/validarAlumno.php')){
    var passWordField = document.evaluate(
        '//input[@name="id_clave"]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    ).snapshotItem(0);
    
    var profes = document.getElementById('content2').innerHTML.split('\n');
    var prof = profes[profes.length-1].match("[A-Z].*")[0].toLowerCase();
    var p1 = prof.split(' ');
    
    passWordField.value = p1[0].charAt(0)+p1[1]+"_"+((new Date()).getYear()+1900);
    
    document.evaluate(
        '//input[@value="Aceptar"]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    ).snapshotItem(0).click();

}

if (location.href.match('/asignaturas.php')){
    var secciones = document.evaluate(
        '//div[@class="titSubtit"]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    if(secciones.snapshotLength==2){
        location.href = secciones.snapshotItem(0).parentNode
            .nextSibling
            .nextSibling
            .nextSibling
            .nextSibling.firstChild.href;
    }
}



if (location.href.match('/carreras.php')){
    var nodePar;
    var resps=[];
    var maxSemes=0;
    var tabloide = document.createElement('table');
    tabloide.align = 'center';
    var tdX = document.createElement('td');
    tdX.vAlign='top';
    var ju= document.evaluate(
        '//div[@class="contSubtit"]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    
    
    for (i=0; i< ju.snapshotLength;i++){
        if(ju.snapshotItem(i).innerHTML.match('Semestre')){
            nodePar = ju.snapshotItem(i).parentNode;
            maxSemes = nodePar.childNodes.length;
            break;
        }
    }
    
    for (i=0; i< maxSemes;i++){
        if(nodePar.firstChild.nodeType === 3){
            nodePar.removeChild(nodePar.firstChild);
            continue;
        }
        if(nodePar.firstChild.getAttribute('class') === 'contSubtit'){
            resps.push([]);
        }
        if(resps.length==0)continue;
        resps[resps.length-1].push(nodePar.firstChild);
        nodePar.removeChild(nodePar.firstChild);
    }
    nodePar.parentNode.parentNode.parentNode.parentNode.removeChild(nodePar.parentNode.parentNode.parentNode);
    for(i=0;i<Math.floor((resps.length-1)/3)+1;i++){
        tabloide.appendChild(document.createElement('tr'));
        for(j=0; j<3 && 3*i+j < resps.length;j++){
            tabloide
             .lastChild
             .appendChild(
                tdX.cloneNode(true)
            );
            for(z=0; z<resps[3*i+j].length;z++){
                tabloide.lastChild.lastChild.appendChild(resps[3*i+j][z]);
            }
            
        }
    }
    document.body.insertBefore(tabloide,document.body.childNodes[1]);   
}

addJS("\
if(typeof JBZ_UPDATE === 'undefined'){var JBZ_UPDATE={};}\
JBZ_UPDATE['cursosWebUDD'] = {\
   current : 0.1 \
}");


/* Codigo viejo que no hace nada productivo


if(location.href.match('/indexSeccion.php')){
    var links = document.evaluate(
        '//a[@href]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    for (i =0; i<links.snapshotLength; i++){
        if(links.snapshotItem(i).href.match("/indexSeccion.php")){
            GM_xmlhttpRequest(
                {
                    method: 'GET',
                    url: links.snapshotItem(i).href,
                    onload : function (respuesta) {
                        
                        var dive = document.createElement('div');
                        //dive.style.display='none';
                        dive.innerHTML = respuesta.responseText
                        document.body.appendChild(dive);
                        //var tmp = dive.childNodes[10].cloneNode();
                        //dive.innerHTML='';
                        //dive.appendChild(tmp);
                        
                        //alert('in');
                    }
                }
            
            )
        }
    }
}*/


//addJS_SRC('http://usuarios.lycos.es/aleivag/js/cursosWebUDD.js');


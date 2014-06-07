// ==UserScript==
// @version        1.1
// @name           CaracolTvDownloader
// @author         Emilien Klein
// @namespace      http://emilien.klein.st/gmscripts/
// @description    Les permite descargar facilmente los videos de CaracolTV, como Oye Bonita
// @include        http://www.caracoltv.com/oyebonita
// ==/UserScript==

/*

History:

28/06/2009 - v1.1 - Solo se descargan las paginas para extraer las urls una vez, despues estan cacheadas.
14/06/2009 - v1.0 - Primera version del script, solo con Oye Bonita

*/

//unsafeWindow.console.log("XX");

var ctd_infoUl = null;

startProcess();

function startProcess(){
    var nodes = $x("/html/body/div[2]/div[2]/div[5]/div[1]", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    if(nodes.length > 0){
        //Anadir el nuevo div donde se pondra la lista de los capitulos
        var ctd_infodiv = document.createElement("div");
        ctd_infodiv.id = "ctd_infodiv";
        ctd_infodiv.className = "box_capitulosprod";
        ctd_infodiv.innerHTML = "<h2 class='titulo_modprod'>Descargas directas de los cap&iacute;tulos</h2><span id='ctd_cargando' style='font-size: 140%;'><img src='http://static.canalcaracol.com/images/caracol/loadingAnimation.gif' alt='Cargando' /> Gracias por esperar mientras se prepara la lista de los cap&iacute;tulos</span>";
        ctd_infoUl = document.createElement("ul");
        ctd_infoUl.style.fontSize = "140%";
        ctd_infodiv.appendChild(ctd_infoUl);
        nodes[0].insertBefore(ctd_infodiv, nodes[0].firstChild);
        
        //Descargar la pagina con la lista de los capitulos
        GM_xmlhttpRequest({
            method:"GET",
            url:"http://www.caracoltv.com/oyebonita?menu=videos",
            onload:function(response) {
                if(response.status == 200){
                    var tmpTXT2 = null;
                    var tmpTXT3 = null;
                    var enlaceCapitulo = null;
                    var tituloCapitulo = null;
                    var fechaCapitulo = null;
                    //Ya los 3 ultimos capitulos
                    var tmpTXT = response.responseText.split('<div class="content_ultimodvideos">');
                    tmpTXT = tmpTXT[1].split('<h3 class="titulo_homesmulprods">Cap&iacute;tulos completos</h3>');
                    tmpTXT = tmpTXT[0].split('<h5 class="capitulo_video">');
                    document.getElementById("ctd_cargando").style.display = "none";
                    //Los nombres de los valores guardados (para limpiar despues los que ya no se usan mas)
                    var enlacesGuardados = new Array();
                    for(var i = 1; i < tmpTXT.length; i++){
                        tmpTXT2 = tmpTXT[i].split('">');
                        enlaceCapitulo = tmpTXT2[0].replace('<a href="', '');
                        tituloCapitulo = tmpTXT2[1].split('</a></h5>')[0];
                        fechaCapitulo = tmpTXT[i].split('<strong>')[1].split('</strong>')[0];
                        addLi(fechaCapitulo, enlaceCapitulo, tituloCapitulo, enlacesGuardados);
                    }
                    
                    //Ahora el resto de los capitulos (bueno, no todos, solo los 15 siguientes...)
                    tmpTXT = response.responseText.split('<div class="dos_personajes">');
                    //3 lineas de 5 viejos capitulos
                    for(var i = 1; i < tmpTXT.length; i++){
                        tmpTXT3 = tmpTXT[i].split('<div class="un_video fleft');
                        //5 capitulos por linea
                        for(var j = 1; j < 6; j++){
                            tmpTXT2 = tmpTXT3[j].split('">');
                            enlaceCapitulo = tmpTXT2[1].replace('<div><a href="', '');
                            tituloCapitulo = tmpTXT2[4].split('</a></h5>')[0];
                            fechaCapitulo = tmpTXT3[j].split('<strong>')[1].split('</strong>')[0];
                            addLi(fechaCapitulo, enlaceCapitulo, tituloCapitulo, enlacesGuardados);
                        }
                    }
                    limpiarEnlacesGuardados(enlacesGuardados);
                }
            }
        });
    }
}

function addLi(fechaCapitulo, enlaceCapitulo, tituloCapitulo, enlacesGuardados){
    //Anadir un nuevo <li> con los detalles de este capitulo
    var newLi = document.createElement("li");
	var fechaCapituloCodigo = fechaCapitulo.replace(" ", "_");
    var aId = "ctd_a_" + fechaCapituloCodigo;
    var spanId = "ctd_span_" + fechaCapituloCodigo;
    //Como todavia no tenemos la url directa del capitulo, solo mostramos un "loading" y el titulo del capitulo en un <span>
    newLi.innerHTML = fechaCapitulo + ": <span id='" + spanId + "'>" + tituloCapitulo + " <img src='http://static.canalcaracol.com/images/caracol/loadingAnimation.gif' alt='Cargando' /></span><a id='" + aId + "' href='' style='display: none;'>" + tituloCapitulo + "</a>";
    ctd_infoUl.appendChild(newLi);
	
	var enlaceGuardado = "ctd_oyebonita_" + fechaCapituloCodigo;
	enlacesGuardados.push(enlaceGuardado);
	if(GM_getValue(enlaceGuardado)){
		updateEnlaceCapitulo(GM_getValue(enlaceGuardado), aId, spanId);
	} else {
		if(enlaceCapitulo.substring(0, 7) != "http://"){
			enlaceCapitulo = "http://www.caracoltv.com/" + enlaceCapitulo;
		}
		
		//Determinar el enlace directo de este capitulo
		GM_xmlhttpRequest({
			method:"GET",
			url:enlaceCapitulo,
			onload:function(response) {
				if(response.status == 200){
					var tmpTXT = response.responseText.split('&file=');
					tmpTXT = tmpTXT[1].split('&image=');
					updateEnlaceCapitulo(tmpTXT[0], aId, spanId);
					GM_setValue(enlaceGuardado, tmpTXT[0]);
				}
			}
		});
	}
}

function updateEnlaceCapitulo(enlace, aId, spanId){
    document.getElementById(aId).href=enlace;
    //Esconder el <span> y mostrar el <a>
    document.getElementById(spanId).style.display = "none";
    document.getElementById(aId).style.display = "";
}

function limpiarEnlacesGuardados(eG){
    var valores = GM_listValues();
    for(i=0; i<valores.length; i++){
        if(!(valores[i] in oc(eG))){
            //Suprimir el valor antiguo que ya no se usa mas
            GM_deleteValue(valores[i]);
        }
    }
}

//This helper function comes from http://snook.ca/archives/javascript/testing_for_a_v/
function oc(a){
    var o = {};
    for(var i=0;i<a.length;i++){
        o[a[i]]='';
    }
    return o;
}

//This helper function comes from http://wiki.greasespot.net/Code_snippets#XPath_helper
function $x(){
    var x='',          // default values
    node=document,
    type=0,
    fix=true,
    i=0,
    toAr=function(xp){      // XPathResult to array
        var final=[], next;
        while(next=xp.iterateNext())
            final.push(next);
        return final
    },
    cur;
    while (cur=arguments[i++])      // argument handler
        switch(typeof cur) {
            case "string":x+=(x=='') ? cur : " | " + cur;continue;
            case "number":type=cur;continue;
            case "object":node=cur;continue;
            case "boolean":fix=cur;continue;
        }
    if (fix) {      // array conversion logic
        if (type==6) type=4;
        if (type==7) type=5;
    }
    if (!/^\//.test(x)) x="//"+x;            // selection mistake helper
    if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
    var temp=document.evaluate(x,node,null,type,null); //evaluate!
    if (fix)
        switch(type) {                              // automatically return special type
            case 1:return temp.numberValue;
            case 2:return temp.stringValue;
            case 3:return temp.booleanValue;
            case 8:return temp.singleNodeValue;
            case 9:return temp.singleNodeValue;
        }
    return fix ? toAr(temp) : temp;
}

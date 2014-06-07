// ==UserScript== 
// @name          SmilEOL 
// @version       0.3.6
// @namespace     http://www.elotrolado.net/foro_generales-pruebas_21 
// @description   Smilies no oficiales para el foro de elotrolado 
// @run-at        document-end
// @include       http://www.elotrolado.net/* 
// @exclude              
// ==/UserScript== 
 
 /*********************************************************************
 SmilEOL es totalmente libre y gratuito, el codigo es completamente
 tuyo una vez te lo hayas descargado, una vez en tu ordenador podrás
 violarlo salvajemente sin motivo de preocupación. 
 SmilEOL se basa en la colaboración de todos, así que si crees que
 hay iconos dignos de ser usados en el paquete básico hazlo saber en
 el hilo oficial: http://www.elotrolado.net/viewtopic.php?p=1720004715
 
 Agradecimientos: 
 - A todo Pruebas por tragarse todas las "Pruebas"
 - Gracias por ayudar a recopilar la colección de emoticonos a 
 PrOTuL,Juriolo,hoygan090,ClipClip,Vaulner,Ran-kun, The Last Saiyan, 
 enviciao93,Dragonglue,Dani-Kun (gracias por ese pedazo de ujujum 
 en alta calidad) y mapachito91 
 *********************************************************************/
var smiliePosition = "delante"; //Cambiar por "detras" si se quieren al final de la lista o delante si se quieren al comienzo... 

//Lista de albums
var titleAlbums = new Array(); 
var xmlAlbums = new Array();
var mostrarAlbums = new Array(); 
var numAlbums=0; 
//Añade albums al script 
function addAlbum(titulo,xml,mostrar){ 
    titleAlbums[numAlbums]=titulo; 
    xmlAlbums[numAlbums]=xml; 
	mostrarAlbums[numAlbums] = mostrar;
    numAlbums++; 
}

var titleEmoticon = new Array();
var urlEmoticon = new Array();
var numEmoticon = 0;

function addEmoticon(titulo,url){
    titleEmoticon[numEmoticon]=titulo; 
    urlEmoticon[numEmoticon]=url; 
    numEmoticon++; 
}

//AÑADE A PARTIR DE AQUI TUS ALBUMS!!!!
function cargarAlbums(){
	//Limites: Photobucket muestra 100 imagenes de cada album y TinyPic 25
	//si pones true al final el album se cargara siempre, si pones false
	//se cargara solo cuando hagas click en un enlace que aparecerá en la lista
	//addAlbum("TituloAlbum","http://RSSdePhotobucket o TinyPic",true o false); 
	//addAlbum("Imagenes Gif","http://*****.photobucket.com/*****/feed.rss",false);
	//...
}


//AÑADE A PARTIR DE AQUI TUS EMOTICONOS PERSONALIZADOS!!
function cargarEmoticonos(){
	numEmoticon=0;
//Caretos a 50x50

addEmoticon("NeutralFace_","http://i44.tinypic.com/1yn2up.png");
	addEmoticon("TrollX2_","http://i41.tinypic.com/okr23t.png");
	addEmoticon("Cry_","http://i40.tinypic.com/23mrk7q.png");
	addEmoticon("Happy_","http://i41.tinypic.com/2uekzus.png");
	addEmoticon("Jur_","http://i41.tinypic.com/2w2kgic.png");
	addEmoticon("Angry_","http://i39.tinypic.com/2a8q42r.png");
	addEmoticon("Tururu_","http://i39.tinypic.com/2nuhle0.png");
	addEmoticon("Ehm_","http://i44.tinypic.com/2zhmxy8.png");
	addEmoticon("brrr_","http://i42.tinypic.com/2lnfkp1.png");
	addEmoticon("Hitlerface_","http://i40.tinypic.com/de7ksm.png");
	addEmoticon("Retard_","http://i40.tinypic.com/waq2k6.png");
	addEmoticon("Oins_","http://i40.tinypic.com/hukal3.png");
	addEmoticon("Awesome_","http://i41.tinypic.com/2ynfbit.png");
	addEmoticon("Grr_","http://i41.tinypic.com/r0y4ic.png");
	addEmoticon("Gayface_","http://i40.tinypic.com/29fs6xw.png");
	addEmoticon("Custom1_","http://i32.tinypic.com/vy08cm.jpg");
	addEmoticon("Custom2_","http://i25.tinypic.com/6zmy5t.jpg");
	addEmoticon("Custom3_","http://i25.tinypic.com/256gwvd.jpg");
	addEmoticon("Custom4_","http://i26.tinypic.com/5l9zew.jpg");
	addEmoticon("Custom5_","http://i29.tinypic.com/mbsq5f.jpg");
	addEmoticon("Custom6_","http://i32.tinypic.com/50o5z5.jpg");
	addEmoticon("Custom7_","http://i27.tinypic.com/svs7iq.jpg");
	addEmoticon("Custom8_","http://i32.tinypic.com/2n0lnkg.jpg");
	addEmoticon("Custom9_","http://i31.tinypic.com/33e61rl.jpg");
	addEmoticon("Custom10_","http://i29.tinypic.com/2yw6etw.jpg");
	addEmoticon("Custom11_","http://i28.tinypic.com/33jqz2w.jpg");
	addEmoticon("Custom12_","http://i25.tinypic.com/u7qmu.jpg");
	addEmoticon("Custom13_","http://i31.tinypic.com/153nvb8.jpg");
	addEmoticon("Custom14_","http://i31.tinypic.com/wn3ia.jpg");
	addEmoticon("Custom15_","http://i32.tinypic.com/30hy61v.jpg");
	addEmoticon("Custom16_","http://i25.tinypic.com/2e55e88.jpg");
	addEmoticon("Custom17_","http://i28.tinypic.com/2rhr2br.jpg");
	addEmoticon("Custom18_","http://i28.tinypic.com/zx34eb.jpg");
	addEmoticon("Custom19_","http://i27.tinypic.com/wl6qvs.jpg");
	addEmoticon("Custom20_","http://i31.tinypic.com/xpovop.jpg");
	addEmoticon("Custom21_","http://i25.tinypic.com/4k7d07.jpg");


	addEmoticon("Troll_","http://i40.tinypic.com/zj6vxv.png");
	addEmoticon("Nobodycares_","http://i39.tinypic.com/ioiwpy.png");
	addEmoticon("Coolface_","http://i40.tinypic.com/2yw7sc9.png");
	addEmoticon("Fry_","http://i44.tinypic.com/4gn79f.png");
	addEmoticon("HA-HA_","http://i42.tinypic.com/s5wqs1.png");
	addEmoticon("tipoIncognito_","http://i44.tinypic.com/5x3i88.gif");
	addEmoticon("slowpoke_","http://i42.tinypic.com/dfwuvb.png");
	addEmoticon("muhaha_","http://i43.tinypic.com/2qtz9kn.png");
	addEmoticon("mmm1_","http://i40.tinypic.com/9s9xth.png");
	addEmoticon("snif_","http://i42.tinypic.com/243ndpe.png");
	addEmoticon("mmm2_","http://i40.tinypic.com/rle1jo.png");
	addEmoticon("seguroDental_","http://i42.tinypic.com/zlf0oi.gif");
	addEmoticon("orly_","http://i41.tinypic.com/152dog5.png");
	addEmoticon("miauMiau_","http://i39.tinypic.com/2hqrrps.gif");
	addEmoticon("LinkJijiji_","http://i43.tinypic.com/21croep.png");
	addEmoticon("jiXo_","http://i43.tinypic.com/xndac4.png");
	addEmoticon("aja_","http://i41.tinypic.com/e895sn.gif");
	addEmoticon("aaahhh_","http://i40.tinypic.com/20z5fkw.gif");
	addEmoticon("dawson_","http://i40.tinypic.com/2hphmkj.gif");
	addEmoticon("bobEsponja_","http://i42.tinypic.com/2znweav.png");
	addEmoticon("bleh_","http://i40.tinypic.com/1z13o.png");
	addEmoticon("moralina_","http://i41.tinypic.com/2dc7ti9.jpg");
	addEmoticon("Facepalm1_","http://i39.tinypic.com/1e6lix.png");
	addEmoticon("Facepalm2_","http://i43.tinypic.com/2d56qs.png");
	addEmoticon("blablabla_","http://i42.tinypic.com/fn71gy.gif");
	addEmoticon("roto2_","http://i40.tinypic.com/10gkbxf.gif");
	addEmoticon("laleche_","http://i42.tinypic.com/w2g8b4.gif");
	addEmoticon("jiji_","http://i40.tinypic.com/1gfzmr.png");
	addEmoticon("popcorn_","http://i44.tinypic.com/dm8brt.gif");
	addEmoticon("puf_","http://i43.tinypic.com/2rrbekz.png");
	addEmoticon("vaca_","http://i44.tinypic.com/30xctip.gif");
	addEmoticon("SabadoSabadete_","http://i43.tinypic.com/2rrbdwm.gif");
	addEmoticon("buitre_","http://i41.tinypic.com/11sm8p0.gif");
	addEmoticon("WAHT_","http://i43.tinypic.com/n50x8h.jpg");
	addEmoticon("Ujujum1_","http://i39.tinypic.com/2prfed4.jpg");
	addEmoticon("Ujujum2_","http://i44.tinypic.com/2m6sxvd.jpg");
	addEmoticon("Lloron_","http://i43.tinypic.com/2ueqlis.gif");
	addEmoticon("Sing_","http://i39.tinypic.com/o5829u.gif");
	addEmoticon("eaea_","http://i40.tinypic.com/znwrpx.gif");
	addEmoticon("ueueue_","http://i43.tinypic.com/20r1ixu.jpg");
	addEmoticon("nose_","http://i40.tinypic.com/9gjc6p.gif");
	addEmoticon("facepalm_","http://i44.tinypic.com/fc0m6b.gif");
	addEmoticon("melafo_","http://i41.tinypic.com/9zn9r9.jpg");
	addEmoticon("jajano_","http://i43.tinypic.com/o5ayvr.gif");
	addEmoticon("sisisi_","http://i42.tinypic.com/28bs2ut.gif");
	addEmoticon("ponno_","http://i43.tinypic.com/9895vl.gif");
	addEmoticon("Respeto_","http://i39.tinypic.com/9zqcn9.gif");
	addEmoticon("Bate_","http://i40.tinypic.com/vfh5xg.gif");
	addEmoticon("Palomitas_","http://i40.tinypic.com/104jn92.jpg");
	addEmoticon("Silencio_","http://i39.tinypic.com/1z6un9e.jpg");	
	addEmoticon("melaFB_","http://i45.tinypic.com/w8py7r.jpg");	
	addEmoticon("meloFB_","http://i49.tinypic.com/xgidj7.jpg");	
	addEmoticon("thisisP_","http://i46.tinypic.com/2w5n9ye.jpg");	
	addEmoticon("pedobear_","http://i47.tinypic.com/9pqds5.jpg");	
}


var listaCargada = false; 
 
var listaSmiley = "smiley-list"; 
 
var GlobalDelante; 
var GlobalPrimerHijo; 
var GlobalListaSmilies; 

var timeChrome = null;     
 
function get(url, TITULO, cb,div) { 
	GM_xmlhttpRequest({ 
		method: "GET", 
        url: url, 
        onload: function(xhr) { cb(xhr.responseText,TITULO,div) } 
    })
}
  
function arrayImages(text,TITULO,divId) { 
	var xmlobject = (new DOMParser()).parseFromString(text, "text/xml"); 
    var allitems = xmlobject.getElementsByTagName("media:content"); 
    var alltitles = xmlobject.getElementsByTagName("media:title"); 
    var allthumbnails = xmlobject.getElementsByTagName("media:thumbnail"); 
    var divOld= document.getElementById(divId);
	divOld.removeChild(divOld.firstChild); //link
	divOld.removeChild(divOld.firstChild); //br
	var divAlbum = document.createElement("div");
	divAlbum.setAttribute("id",TITULO);
	divAlbum.appendChild(putTexto(TITULO+":"));
	divAlbum.appendChild(putSalto());
	for (var i=0;i<allitems.length;i++) { 
        var src = allitems[i].getAttribute("url"); 
        var title = alltitles[i].textContent; 
        var thumb = allthumbnails[i].getAttribute("url"); 
		divAlbum.appendChild(addSmilies(title,src,thumb));
	}
	divOld.appendChild(divAlbum);
	for (var i=0;i<allitems.length;i++) { 
        var src = allitems[i].getAttribute("url"); 
    	waitFor(src);
    }
}
     
function arrayEmoticonos(TITULO){
	if(!GlobalDelante) putElement(GlobalDelante,putSalto(),GlobalListaSmilies,GlobalPrimerHijo);
	putElement(GlobalDelante,putTexto(TITULO+":"),GlobalListaSmilies,GlobalPrimerHijo);
	putElement(GlobalDelante,putSalto(),GlobalListaSmilies,GlobalPrimerHijo);
	for (var i=0;i<numEmoticon;i++) { 
        var src = urlEmoticon[i];
        var title = titleEmoticon[i];
        var thumb = src;
        putImagen(GlobalDelante,GlobalListaSmilies,GlobalPrimerHijo,title,src,thumb); 
		waitFor(src);
    } 
    putElement(GlobalDelante,putSalto(),GlobalListaSmilies,GlobalPrimerHijo);
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null ){
		node = document;
	}
	if ( tag == null ){
		tag = '*';
	}
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function resizeOne(elem){ 
    var imgWidth,imgHeight,prop; 
    imgWidth = elem.width; 
    imgHeight = elem.height;
    if (imgWidth>25 && imgHeight >30) { 
		prop = imgHeight/imgWidth; 
        elem.width = 25; 
        elem.height = 25*prop; 
	}; 
	elem.style.visibility="visible";
} 
 

function setImage(textarea,textadvancedarea,text){ 
    var txtarea = document.getElementById(textarea); 
    var txtadvanced = document.getElementById(textadvancedarea); 
    if(txtadvanced){ //Editor de texto avanzado 
        tinyMCE = unsafeWindow['tinyMCE']; 
        switchEditor = unsafeWindow['switchEditor']; 
        if ((typeof(tinyMCE) != "undefined" ) &&  tinyMCE.activeEditor && !tinyMCE.activeEditor.isHidden()){ 
            tinyMCE.execCommand('mceInsertContent',false,text); 
            //Oh dios mio, las siguientes dos lineas son lo mas chusquero que he hecho en mi vida... ya lo intentare arreglar xD 
            //switchEditor(); 
            //switchEditor(); 
            return; 
        }  
    } 
    //A partir de aqui todo lo relativo al textarea... gracias google. 
    var scrollPos = txtarea.scrollTop; 
    var strPos = 0; 
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false ) ); 
    if (br == "ie") {  
        txtarea.focus(); 
        var range = document.selection.createRange(); 
        range.moveStart ('character', -txtarea.value.length); 
        strPos = range.text.length; 
    } 
    else if (br == "ff") strPos = txtarea.selectionStart; 
    var front = (txtarea.value).substring(0,strPos);   
    var back = (txtarea.value).substring(strPos,txtarea.value.length);  
    txtarea.value=front+text+back; 
    strPos = strPos + text.length; 
    if (br == "ie") {  
        txtarea.focus(); 
        var range = document.selection.createRange(); 
        range.moveStart ('character', -txtarea.value.length); 
        range.moveStart ('character', strPos); 
        range.moveEnd ('character', 0); 
        range.select(); 
    } 
    else if (br == "ff") { 
        txtarea.selectionStart = strPos; 
        txtarea.selectionEnd = strPos; 
        txtarea.focus(); 
    } 
    txtarea.scrollTop = scrollPos; 
} 

function ponerLink(src,title){
	var oDiv = document.createElement("div");
	oDiv.setAttribute("id","div"+title);
	var oA = document.createElement("a");
	oA.setAttribute('href','javascript:void(0)'); 
	oA.addEventListener("click",function(){get(src,title, arrayImages,"div"+title); return false;},false); 
	var oStrong = document.createElement("strong");
	oStrong.appendChild(document.createTextNode(title));
	oA.appendChild(oStrong); 
	oDiv.appendChild(oA);
	oDiv.appendChild(putSalto());
	return oDiv;

}
function setemoticons(domname){ 
	 
	var listaSmilies = document.getElementById(domname); //Donde añadir los Emoticonos. 
	var direccion = location.href; 
	var delante = true; 
	if (listaSmilies){  
	
		
		listaCargada = true; //Para evitar que se cargue dos veces... 
	
		if(smiliePosition == "delante") delante = true; 
		else delante = false; 
		
		var primerHijo  = listaSmilies.firstChild; //Primer Emoticono de la lista de EOL 
		putTextBefore(listaSmilies,primerHijo,"Emoticonos EOL:"); 
		primerHijo  = listaSmilies.firstChild; //Ahora el texto es el primer hijo

		cargarEmoticonos();
		//Variables globales
		GlobalPrimerHijo = primerHijo; 
		GlobalDelante=delante; 
		GlobalListaSmilies=listaSmilies; 
		arrayEmoticonos("Emoticonos SmilEOL");
		var browser = navigator.userAgent;
		if(browser.indexOf("Firefox")!=-1){
			cargarAlbums();
			for(var i=0;i<titleAlbums.length;i++){ 
				putElement(delante,ponerLink(xmlAlbums[i],titleAlbums[i]),GlobalListaSmilies,GlobalPrimerHijo);
				if(mostrarAlbums[i]) {
					get(xmlAlbums[i],titleAlbums[i], arrayImages,"div"+titleAlbums[i]); 
				}
			} 
		}
	}
}
	
 
function addSmilies(title,url,thumb){ 
    var oLink=document.createElement("a"); 
    oLink.setAttribute('href','javascript:void(0)'); 
    oLink.addEventListener("click",function(){setImage("message","message_parent"," [img]"+url+"[/img] "); return false;},false); 
	var oImg=new Image();
	oImg.setAttribute('id',url);
	oImg.style.visibility='hidden';
    oImg.setAttribute('src', thumb); 
    oImg.setAttribute('alt', title); 
    oImg.setAttribute('title', title);
    oLink.appendChild(oImg); 
    return oLink; 
} 
 
function putElement(delante,element,div,firstChild) {
	if(delante) div.insertBefore(element,firstChild);
	else div.appendChild(element);
}
function putSalto(){ 
	var salto = document.createElement("br"); 
	return salto;
} 
 
function putTexto(texto){ 
	var text = document.createElement("strong"); 
    text.appendChild(document.createTextNode(texto)); 
	return text;
} 
 
function putImagen(delante,div,firstChild,name,url,thumb){ 
    if(delante) putBefore(div,firstChild,name,url,thumb); 
    else putAfter(div,name,url,thumb);
} 
 
function putAfter(div,nombre,url,thumb){
    div.appendChild(addSmilies(nombre,url,thumb)); 
} 

function putBefore(div,firstChild,nombre,url,thumb){
    div.insertBefore(addSmilies(nombre,url,thumb),firstChild); 
} 

function putTextBefore(div,firstChild,texto){ 
    var text = document.createElement("strong"); 
    text.appendChild(document.createTextNode(texto)); 
    div.insertBefore(text,firstChild); 
    putSaltoBefore(div,firstChild); 
} 

function putSaltoBefore(div,firstChild){ 
    var salto = document.createElement("br"); 
    div.insertBefore(salto,firstChild); 
} 


function putTextAfter(div,texto){ 
    var text = document.createElement("strong"); 
    text.appendChild(document.createTextNode(texto)); 
    div.appendChild(text); 
    putSaltoAfter(div); 
} 
 
function putSaltoAfter(div){ 
    var salto = document.createElement("br"); 
    div.appendChild(salto); 
} 

var bugChrome = function(){ 
	
	
	var lista = document.getElementById(listaSmiley); 
    if((lista)&&(!listaCargada)){ 
        listaCargada=true; 
        setemoticons(listaSmiley); 
        //Chapamos intervalos... 
        //clearInterval(timeChrome); 
	}
    
} 

function waitFor(imgId){ 
	img=document.getElementById(imgId);
	if(!img.complete) window.setTimeout(function(){waitFor(imgId);}, 250); 
	else resizeOne(img);
}

function recorrerPosts(){

	var posts1 = getElementsByClass("post columfixed bg1");
	posts1=posts1.concat(getElementsByClass("post columfixed bg2"));
	posts1=posts1.concat(getElementsByClass("post pm"));
	posts1=posts1.concat(getElementsByClass("post bg1"));
	posts1=posts1.concat(getElementsByClass("post bg2"));
	
	var i;
	for(i=0;i<posts1.length;i++){
		reemplazar(posts1[i].getAttribute("id"));
	}
}


function reemplazar(id) {
	var post = document.getElementById(id);
	var contenido = getElementsByClass("content",post);
	var texto= contenido[0].innerHTML;
	for (var i = 0; i < numEmoticon; i ++){
		texto = texto.replace(new RegExp("(\\s|^|(>))(\\b"+replaceString(titleEmoticon[i])+"\\b)((<)|(\\s)|($))","gi"), '$1<img src="'+urlEmoticon[i]+'" />$4');
	}
	contenido[0].innerHTML=texto;
}

// Añadido para compatibilidad con BetterEOL 2.x
var bE_button = document.createElement('input')
bE_button.id = "SmilEOL-BetterEOL-iconsFix";
bE_button.setAttribute('style', "display: none;");
bE_button.type = "button";
document.body.appendChild(bE_button); 
bE_button.addEventListener('click', recorrerPosts, true);
//............

function replaceString(texto){
	var txt,cadena;
	txt=texto;
	/*cadena=/\)/g;
	txt=txt.replace(cadena,"\\)");
	/*cadena=/\(/g;
	txt=txt.replace(cadena,"\\(");
	cadena=/\./g;
	txt=txt.replace(cadena,"\\.");
	cadena=/\[/g;
	txt=txt.replace(cadena,"\\[");
	cadena=/\]/g;
	txt=txt.replace(cadena,"\\]");
	cadena=/\|/g;
	txt=txt.replace(cadena,"\\|");
	cadena=/\$/g;
	txt=txt.replace(cadena,"\\$");
	cadena=/\^/g;
	txt=txt.replace(cadena,"\\^");
	cadena=/\?/g;
	txt=txt.replace(cadena,"\\?");
	cadena=/\:/g;
	txt=txt.replace(cadena,"\\:");
	cadena=/\{/g;
	txt=txt.replace(cadena,"\\{");
	cadena=/\}/g;
	txt=txt.replace(cadena,"\\}");
	cadena=/\+/g;
	txt=txt.replace(cadena,"\\+");
	cadena=/\$/g;
	txt=txt.replace(cadena,"\\$");*/
	return(txt);
}

cargarEmoticonos();
	recorrerPosts();
timeChrome = window.setInterval(bugChrome, 100); 
//bugChrome();

//window.addEventListener("load", function(e) {
	
//	}, false);
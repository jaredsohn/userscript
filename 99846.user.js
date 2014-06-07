// ==UserScript==
// @name           SmileHLM
// @namespace      SmileHLM
// @description    SmileHLM
// @include        http://www.hastalamuerte.net/foros/*
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
var smiliePosition = "detras"; //Cambiar por "detras" si se quieren al final de la lista o delante si se quieren al comienzo... 

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


       
   addEmoticon("Custom1_1","http://i1184.photobucket.com/albums/z332/Eruanion84/emoticonos/troll.gif");
	addEmoticon("Custom1_2","http://i1184.photobucket.com/albums/z332/Eruanion84/emoticonos/retarded.gif");
	addEmoticon("Custom1_3","http://i1184.photobucket.com/albums/z332/Eruanion84/emoticonos/poker.gif");
	addEmoticon("Custom1_4","http://i1184.photobucket.com/albums/z332/Eruanion84/emoticonos/O_o-1.gif");
	addEmoticon("Custom1_5","http://i1184.photobucket.com/albums/z332/Eruanion84/emoticonos/mosqueo.gif");
	addEmoticon("Custom1_6","http://i1184.photobucket.com/albums/z332/Eruanion84/emoticonos/llorar.gif");
	addEmoticon("Custom1_7","http://i1184.photobucket.com/albums/z332/Eruanion84/emoticonos/jooo.gif");
	addEmoticon("Custom1_8","http://i1184.photobucket.com/albums/z332/Eruanion84/emoticonos/gay.gif");
	addEmoticon("Custom1_9","http://i1184.photobucket.com/albums/z332/Eruanion84/emoticonos/enfadado.gif");
	addEmoticon("Custom1_10","http://i1184.photobucket.com/albums/z332/Eruanion84/emoticonos/brrr.gif");
   addEmoticon("Custom1_","http://img818.imageshack.us/img818/5986/29gdc8mcust.png");
   addEmoticon("Custom2_","http://img808.imageshack.us/img808/1779/1jqkidcustom.png");
   addEmoticon("Custom3_","http://img704.imageshack.us/img704/1569/2zi7ficcustom.png");
   addEmoticon("Custom4_","http://img819.imageshack.us/img819/4450/16h9csgcustom.png");
   addEmoticon("Custom5_","http://img713.imageshack.us/img713/3747/27y956dcustom.png");
   addEmoticon("Custom6_","http://img191.imageshack.us/img191/5827/231jeqcustom.png");
   addEmoticon("Custom7_","http://img3.imageshack.us/img3/9977/r8cgw4custom.png");
   addEmoticon("Custom8_","http://img3.imageshack.us/img3/2429/thsidewayscustom.png");
   addEmoticon("Custom9_","http://img257.imageshack.us/img257/4793/thomfgcustom.png");
   addEmoticon("Custom10_","http://img202.imageshack.us/img202/8468/thshock1custom.png");
   addEmoticon("Custom11_","http://img691.imageshack.us/img691/5717/thummmkcustom.png");
   addEmoticon("Custom12_","http://img36.imageshack.us/img36/1044/umc861xl1custom.png");
   addEmoticon("Custom13_","http://img228.imageshack.us/img228/1577/4qzxmr2jcustom.png");
   addEmoticon("Custom14_","http://img52.imageshack.us/img52/1975/206aw004custom.png");
   addEmoticon("Custom15_","http://img821.imageshack.us/img821/3122/206aw0041custom.png");
   addEmoticon("Custom16_","http://img696.imageshack.us/img696/2669/206aw0042custom.png");
   addEmoticon("Custom17_","http://img192.imageshack.us/img192/5324/206aw0043custom.png");

 addEmoticon("Custom18_","http://img248.imageshack.us/img248/7164/dpyver1mcustom.png");
   addEmoticon("Custom19_","http://img340.imageshack.us/img340/9794/zc1839gjcustom.png");
   addEmoticon("Custom20_","http://img12.imageshack.us/img12/1736/qppqmq0qcustom.png");
   addEmoticon("Custom21_","http://img153.imageshack.us/img153/8500/y20jyzmbcustom.png");



//Caretos a 30x30
/*	addEmoticon("NeutralFace_","http://i31.tinypic.com/k2bfog.jpg");
	addEmoticon("TrollX2_","http://i27.tinypic.com/k21ma9.jpg");
	addEmoticon("Cry_","http://i28.tinypic.com/2mh8olu.jpg");
	addEmoticon("Happy_","http://i25.tinypic.com/or81n9.jpg");
	addEmoticon("Jur_","http://i27.tinypic.com/j9lhcg.jpg");
	addEmoticon("Angry_","http://i32.tinypic.com/x6fntu.jpg");
	addEmoticon("Tururu_","http://i28.tinypic.com/10cqo7n.jpg");
	addEmoticon("Ehm_","http://i31.tinypic.com/2da0qwk.jpg");
	addEmoticon("brrr_","http://i29.tinypic.com/es3ma1.jpg");
	addEmoticon("Hitlerface_","http://i25.tinypic.com/1zx5nx3.jpg");
	addEmoticon("Retard_","http://i26.tinypic.com/2rp3fo8.jpg");
	addEmoticon("Oins_","http://i26.tinypic.com/28lfgx.jpg");
	addEmoticon("Grr_","http://i28.tinypic.com/14tatlx.jpg");
	addEmoticon("Awesome_","http://i26.tinypic.com/t9a83n.jpg");
	addEmoticon("Gayface_","http://i27.tinypic.com/rlgd46.jpg");

addEmoticon("Custom1_","http://img804.imageshack.us/img804/9794/zc1839gjcustom.png");
addEmoticon("Custom2_","http://img52.imageshack.us/img52/1569/2zi7ficcustom.png");
addEmoticon("Custom3_","http://img46.imageshack.us/img46/5827/231jeqcustom.png");
addEmoticon("Custom4_","http://img121.imageshack.us/img121/7164/dpyver1mcustom.png");
addEmoticon("Custom5_","http://img21.imageshack.us/img21/1779/1jqkidcustom.png");
addEmoticon("Custom6_","http://img153.imageshack.us/img153/1577/4qzxmr2jcustom.png");
addEmoticon("Custom7_","http://img64.imageshack.us/img64/4450/16h9csgcustom.png");
addEmoticon("Custom8_","http://img14.imageshack.us/img14/3747/27y956dcustom.png");
addEmoticon("Custom9_","http://img12.imageshack.us/img12/7940/29gdc8mcustom.png");
addEmoticon("Custom10_","http://img651.imageshack.us/img651/1975/206aw004custom.png");
addEmoticon("Custom11_","http://img708.imageshack.us/img708/3122/206aw0041custom.png");
addEmoticon("Custom12_","http://img94.imageshack.us/img94/2669/206aw0042custom.png");
addEmoticon("Custom13_","http://img80.imageshack.us/img80/5324/206aw0043custom.png");
addEmoticon("Custom14_","http://img59.imageshack.us/img59/1736/qppqmq0qcustom.png");
addEmoticon("Custom15_","http://img192.imageshack.us/img192/9977/r8cgw4custom.png");
addEmoticon("Custom16_","http://img25.imageshack.us/img25/4793/thomfgcustom.png");
addEmoticon("Custom17_","http://img208.imageshack.us/img208/8468/thshock1custom.png");
addEmoticon("Custom18_","http://img62.imageshack.us/img62/2429/thsidewayscustom.png");
addEmoticon("Custom19_","http://img693.imageshack.us/img693/5717/thummmkcustom.png");
addEmoticon("Custom20_","http://img35.imageshack.us/img35/1044/umc861xl1custom.png");
addEmoticon("Custom21_","http://img692.imageshack.us/img692/8500/y20jyzmbcustom.png");
*/


	
        addEmoticon("lol_","http://i52.tinypic.com/5tywbr.png");
	addEmoticon("cereal_","http://i56.tinypic.com/inub2u.png");
	addEmoticon("challenger_","http://i56.tinypic.com/30w1d3n.png");
	addEmoticon("fuck_","http://i55.tinypic.com/2qdx6af.png");
	addEmoticon("fuuuu_","http://i54.tinypic.com/2yknud1.png");
	addEmoticon("megusta_","http://i51.tinypic.com/14ij505.png");
	addEmoticon("mentira_","http://i51.tinypic.com/fji3a0.png");
	addEmoticon("poker_","http://i53.tinypic.com/nb4war.png");
	addEmoticon("tsss_","http://i51.tinypic.com/fyjv9v.png");
	addEmoticon("whynot_","http://i52.tinypic.com/2n9m7h2.png");
	addEmoticon("wtf_","http://i55.tinypic.com/15x1nhw.png");
        addEmoticon("dnyea_","http://i54.tinypic.com/291orw3.png");
	addEmoticon("yao_","http://i54.tinypic.com/14m5s2x.png");
	addEmoticon("hamijo","http://i54.tinypic.com/w7m0yp.gif");
        addEmoticon("troll","http://oi56.tinypic.com/2m792iv.jpg");
}


var listaCargada = false; 
 
//var listaSmiley = "smiley-list"; 
var listaSmiley = "bodyarea"; 
 
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
    var txtarea = document.getElementsByName(textarea)[0]; 
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
		//putTextBefore(listaSmilies,primerHijo,"Emoticonos EOL:"); 
		primerHijo  = listaSmilies.firstChild; //Ahora el texto es el primer hijo

		cargarEmoticonos();
		//Variables globales
		GlobalPrimerHijo = primerHijo; 
		GlobalDelante=delante; 
		GlobalListaSmilies=listaSmilies; 
		arrayEmoticonos("Emoticonos");
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
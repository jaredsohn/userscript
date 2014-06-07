// ==UserScript== 
// @name          SmileFF 
// @version       0.1.1
// @namespace     http://futbolforo.com
// @description   Smilies para http://futbolforo.com
// @include       http://futbolforo.com/*
// @include       http://www.futbolforo.com/*
// @exclude
// ==/UserScript== 
 
 
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
var ficheroEmoticon = new Array();
var numEmoticon = 0;

function addEmoticon(titulo,url,fichero){
    titleEmoticon[numEmoticon]=titulo; 
    urlEmoticon[numEmoticon]=url; 
	ficheroEmoticon[numEmoticon]=fichero;
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

function parejas(char, code){
 this.char = char;
 this.code = code;
}
var pares = new Array();
pares[0] = new parejas("ñ", "&ntilde;");
pares[1] = new parejas("á", "&aacute;");
pares[2] = new parejas("é", "&eacute;");
pares[3] = new parejas("í", "&iacute;");
pares[4] = new parejas("ó", "&oacute;");
pares[5] = new parejas("ú", "&uacute;");

function htmlentities(txt) {
for (var i = 0, total = pares.length; i < total; i ++)
 txt = txt.replace(new RegExp(pares[i].char, "g"), pares[i].code)
 return txt;
}


//AÑADE A PARTIR DE AQUI TUS EMOTICONOS PERSONALIZADOS!!
function cargarEmoticonos(){
	addEmoticon("Emoticonos Nuevos","Emoticonos Nuevos",false);
	addEmoticon("NeutralFace","http://futbolforo.com/images/foros/smileff/1yn2up.png",true);
	addEmoticon("TrollX2","http://futbolforo.com/images/foros/smileff/okr23t.png",true);
	addEmoticon("Cry","http://futbolforo.com/images/foros/smileff/23mrk7q.png",true);
	addEmoticon("Happy","http://futbolforo.com/images/foros/smileff/2uekzus.png",true);
	addEmoticon("Jur","http://futbolforo.com/images/foros/smileff/2w2kgic.png",true);
	addEmoticon("Angry","http://futbolforo.com/images/foros/smileff/2a8q42r.png",true);
	addEmoticon("Tururu ","http://futbolforo.com/images/foros/smileff/2nuhle0.png",true);
	addEmoticon("Ehm","http://futbolforo.com/images/foros/smileff/2zhmxy8.png",true);
	addEmoticon("brrr","http://futbolforo.com/images/foros/smileff/2lnfkp1.png",true);
	addEmoticon("Hitlerface","http://futbolforo.com/images/foros/smileff/de7ksm.png",true);
	addEmoticon("Retard ","http://futbolforo.com/images/foros/smileff/waq2k6.png",true);
	addEmoticon("Oins","http://futbolforo.com/images/foros/smileff/hukal3.png",true);
	addEmoticon("Awesome","http://futbolforo.com/images/foros/smileff/2ynfbit.png",true);
	addEmoticon("Grr","http://futbolforo.com/images/foros/smileff/r0y4ic.png",true);
	addEmoticon("Gayface","http://futbolforo.com/images/foros/smileff/29fs6xw.png",true);
	addEmoticon("Troll","http://futbolforo.com/images/foros/smileff/zj6vxv.png",true);
	addEmoticon("Nobodycares","http://futbolforo.com/images/foros/smileff/ioiwpy.png",true);
	addEmoticon("Coolface","http://futbolforo.com/images/foros/smileff/2yw7sc9.png",true);
	addEmoticon("Fry","http://futbolforo.com/images/foros/smileff/4gn79f.png",true);
	addEmoticon("HA-HA","http://futbolforo.com/images/foros/smileff/s5wqs1.png",true);
	addEmoticon("tipoIncognito","http://futbolforo.com/images/foros/smileff/5x3i88.gif",true);
	addEmoticon("slowpoke","http://futbolforo.com/images/foros/smileff/dfwuvb.png",true);
	addEmoticon("muhaha","http://futbolforo.com/images/foros/smileff/2qtz9kn.png",true);
	addEmoticon("mmm1","http://futbolforo.com/images/foros/smileff/9s9xth.png",true);
	addEmoticon("snif","http://futbolforo.com/images/foros/smileff/243ndpe.png",true);
	addEmoticon("mmm2","http://futbolforo.com/images/foros/smileff/rle1jo.png",true);
	addEmoticon("seguroDental","http://futbolforo.com/images/foros/smileff/zlf0oi.gif",true);
	addEmoticon("orly","http://futbolforo.com/images/foros/smileff/152dog5.png",true);
	addEmoticon("miauMiau","http://futbolforo.com/images/foros/smileff/2hqrrps.gif",true);
	addEmoticon("LinkJijiji","http://futbolforo.com/images/foros/smileff/21croep.png",true);
	addEmoticon("jiXo","http://futbolforo.com/images/foros/smileff/xndac4.png",true);
	addEmoticon("aja","http://futbolforo.com/images/foros/smileff/e895sn.gif",true);
	addEmoticon("aaahhh","http://futbolforo.com/images/foros/smileff/20z5fkw.gif",true);
	addEmoticon("dawson","http://futbolforo.com/images/foros/smileff/2hphmkj.gif",true);
	addEmoticon("bobEsponja","http://futbolforo.com/images/foros/smileff/2znweav.png",true);
	addEmoticon("bleh","http://futbolforo.com/images/foros/smileff/1z13o.png",true);
	addEmoticon("moralina","http://futbolforo.com/images/foros/smileff/2dc7ti9.jpg",true);
	addEmoticon("Facepalm","http://futbolforo.com/images/foros/smileff/1e6lix.png",true);
	addEmoticon("Facepalm","http://futbolforo.com/images/foros/smileff/2d56qs.png",true);
	addEmoticon("blablabla ","http://futbolforo.com/images/foros/smileff/fn71gy.gif",true);
	addEmoticon("roto2","http://futbolforo.com/images/foros/smileff/10gkbxf.gif",true);
	addEmoticon("laleche","http://futbolforo.com/images/foros/smileff/w2g8b4.gif",true);
	addEmoticon("jiji","http://futbolforo.com/images/foros/smileff/1gfzmr.png",true);
	addEmoticon("popcorn","http://futbolforo.com/images/foros/smileff/dm8brt.gif",true);
	addEmoticon("puf)","http://futbolforo.com/images/foros/smileff/2rrbekz.png",true);
	addEmoticon("vaca","http://futbolforo.com/images/foros/smileff/30xctip.gif",true);
	addEmoticon("Sabado Sabadete","http://futbolforo.com/images/foros/smileff/2rrbdwm.gif",true);
	addEmoticon("buitre","http://futbolforo.com/images/foros/smileff/11sm8p0.gif",true);
	addEmoticon("WAHT","http://futbolforo.com/images/foros/smileff/n50x8h.jpg",true);
	addEmoticon("Ujujum","http://futbolforo.com/images/foros/smileff/2prfed4.jpg",true);
	addEmoticon("Ujujum","http://futbolforo.com/images/foros/smileff/2m6sxvd.jpg",true);
	addEmoticon("Lloron","http://futbolforo.com/images/foros/smileff/2ueqlis.gif",true);
	addEmoticon("Sing","http://futbolforo.com/images/foros/smileff/o5829u.gif",true);
	addEmoticon("eaea","http://futbolforo.com/images/foros/smileff/znwrpx.gif",true);
	addEmoticon("ueueue","http://futbolforo.com/images/foros/smileff/20r1ixu.jpg",true);
	addEmoticon("nose","http://futbolforo.com/images/foros/smileff/9gjc6p.gif",true);
	addEmoticon("facepalm","http://futbolforo.com/images/foros/smileff/fc0m6b.gif",true);
	addEmoticon("melafo","http://futbolforo.com/images/foros/smileff/9zn9r9.jpg",true);
	addEmoticon("jajano","http://futbolforo.com/images/foros/smileff/o5ayvr.gif",true);
	addEmoticon("sisisi","http://futbolforo.com/images/foros/smileff/28bs2ut.gif",true);
	addEmoticon("ponno","http://futbolforo.com/images/foros/smileff/9895vl.gif",true);
	addEmoticon("Respeto","http://futbolforo.com/images/foros/smileff/9zqcn9.gif",true);
	addEmoticon("Bate","http://futbolforo.com/images/foros/smileff/vfh5xg.gif",true);
	addEmoticon("Palomitas","http://futbolforo.com/images/foros/smileff/104jn92.jpg",true);
	addEmoticon("Silencio","http://futbolforo.com/images/foros/smileff/1z6un9e.jpg",true);
	addEmoticon("Liga","Liga",false);
	addEmoticon("Real Madrid","http://futbolforo.com/iconos/liga/real_madrid.png",true);
	addEmoticon("Barcelona","http://futbolforo.com/iconos/liga/barcelona.png",true);
	addEmoticon("Atletico de Madrid","http://futbolforo.com/iconos/liga/atletico_madrid.png",true);
	addEmoticon("Almeria","http://futbolforo.com/iconos/liga/almeria.png",true);
	addEmoticon("Athletic de Bilbao","http://futbolforo.com/iconos/liga/athletic_bilbao.png",true);
	addEmoticon("Deportivo de la Coruña","http://futbolforo.com/iconos/liga/deportivo.png",true);
	addEmoticon("Espanyol","http://futbolforo.com/iconos/liga/espanyol.png",true);
	addEmoticon("Getafe","http://futbolforo.com/iconos/liga/getafe.png",true);
	addEmoticon("Levante","http://futbolforo.com/iconos/liga/levante.png",true);
	addEmoticon("Málaga","http://futbolforo.com/iconos/liga/malaga.png",true);
	addEmoticon("Mallorca","http://futbolforo.com/iconos/liga/mallorca.png",true);
	addEmoticon("Osasuna","http://futbolforo.com/iconos/liga/osasuna.png",true);
	addEmoticon("Racing de Santander","http://futbolforo.com/iconos/liga/rancing_santander.png",true);
	addEmoticon("Sevilla","http://futbolforo.com/iconos/liga/sevilla.png",true);
	addEmoticon("Sporting de Gijón","http://futbolforo.com/iconos/liga/sporting_gijon.png",true);
	addEmoticon("Tenerife","http://futbolforo.com/iconos/liga/tenerife.png",true);
	addEmoticon("Valladolid","http://futbolforo.com/iconos/liga/valladolid.png",true);
	addEmoticon("Valencia","http://futbolforo.com/iconos/liga/vcf.png",true);
	addEmoticon("Villareal","http://futbolforo.com/iconos/liga/villareal.png",true);
	addEmoticon("Zaragoza","http://futbolforo.com/iconos/liga/zaragoza.png",true);
	addEmoticon("Premier","Premier",false);
	addEmoticon("Manchester United","http://futbolforo.com/iconos/premier/man_utd.png",true);
	addEmoticon("Chelsea","http://futbolforo.com/iconos/premier/chelsea.png",true);
	addEmoticon("Arsenal","http://futbolforo.com/iconos/premier/arsenal.png",true);
	addEmoticon("Aston Villa","http://futbolforo.com/iconos/premier/aston.png",true);
	addEmoticon("Blackburn","http://futbolforo.com/iconos/premier/blackburn.png",true);
	addEmoticon("Burnley","http://futbolforo.com/iconos/premier/burnley.png",true);
	addEmoticon("Charlton Athletic","http://futbolforo.com/iconos/premier/charlton.png",true);
	addEmoticon("Manchester City","http://futbolforo.com/iconos/premier/city.png",true);
	addEmoticon("Everton","http://futbolforo.com/iconos/premier/everton.png",true);
	addEmoticon("Fulham","http://futbolforo.com/iconos/premier/fulham.png",true);
	addEmoticon("Hull City","http://futbolforo.com/iconos/premier/HullCity.png",true);
	addEmoticon("Liverpool","http://futbolforo.com/iconos/premier/liverpool.png",true);
	addEmoticon("Newcastle","http://futbolforo.com/iconos/premier/newcastle.png",true);
	addEmoticon("Portsmouth","http://futbolforo.com/iconos/premier/Portsmouth.png",true);
	addEmoticon("Stoke City","http://futbolforo.com/iconos/premier/stoke.png",true);
	addEmoticon("Tottenham","http://futbolforo.com/iconos/premier/tottenham.png",true);
	addEmoticon("Westham","http://futbolforo.com/iconos/premier/westham.png",true);
	addEmoticon("Calcio","Calcio",false);
	addEmoticon("Inter de Milán","http://futbolforo.com/iconos/calcio/inter.png",true);
	addEmoticon("Atalanta","http://futbolforo.com/iconos/calcio/atalanta.png",true);
	addEmoticon("Catania","http://futbolforo.com/iconos/calcio/catania.png",true);
	addEmoticon("Fiorentina","http://futbolforo.com/iconos/calcio/fiorentina.png",true);
	addEmoticon("A.C. Milán","http://futbolforo.com/iconos/calcio/milan.png",true);
	addEmoticon("Palermo","http://futbolforo.com/iconos/calcio/palermo.png",true);
	addEmoticon("Roma","http://futbolforo.com/iconos/calcio/roma.png",true);
	addEmoticon("Sampdoria","http://futbolforo.com/iconos/calcio/sampdoria.png",true);
	addEmoticon("Juventus","http://futbolforo.com/iconos/calcio/juventus.png",true);
	addEmoticon("Lazio","http://futbolforo.com/iconos/calcio/lazio1.png",true);
	addEmoticon("Internacional","Internacional",false);
	addEmoticon("Aalborg","http://futbolforo.com/iconos/internacional/Aalborg.png",true);
	addEmoticon("Aek Atenas","http://futbolforo.com/iconos/internacional/aek.png",true);
	addEmoticon("Ajax","http://futbolforo.com/iconos/internacional/ajax.png",true);
	addEmoticon("Anderlecht","http://futbolforo.com/iconos/internacional/anderlecht.png",true);
	addEmoticon("Basilea","http://futbolforo.com/iconos/internacional/Basilea.png",true);
	addEmoticon("Bayern de Munich","http://futbolforo.com/iconos/internacional/bayern.png",true);
	addEmoticon("Benfica","http://futbolforo.com/iconos/internacional/benfica.jpg.png",true);
	addEmoticon("Besiktas","http://futbolforo.com/iconos/internacional/besiktas.png",true);
	addEmoticon("Celtic de Glasgow","http://futbolforo.com/iconos/internacional/celtic.png",true);
	addEmoticon("Colo-Colo","http://futbolforo.com/iconos/internacional/colocolo.png",true);
	addEmoticon("Corinthians","http://futbolforo.com/iconos/internacional/Corinthians.png",true);
	addEmoticon("CSKA de Moscú","http://futbolforo.com/iconos/internacional/cska.png",true);
	addEmoticon("Dinamo de Kiev","http://futbolforo.com/iconos/internacional/DinamoKiev.png",true);
	addEmoticon("Porto","http://futbolforo.com/iconos/internacional/fcporto.png",true);
	addEmoticon("Fenerbahce","http://futbolforo.com/iconos/internacional/fenerbahce.png",true);
	addEmoticon("Galatasaray","http://futbolforo.com/iconos/internacional/galatasaray.png",true);
	addEmoticon("Girondins","http://futbolforo.com/iconos/internacional/Girondins.png",true);
	addEmoticon("HSV","http://futbolforo.com/iconos/internacional/hsv.png",true);
	addEmoticon("Bayern Leverkusen","http://futbolforo.com/iconos/internacional/leverkusen.png",true);
	addEmoticon("Levski Sofia","http://futbolforo.com/iconos/internacional/Levski.png",true);
	addEmoticon("Lyon","http://futbolforo.com/iconos/internacional/lyon.png",true);
	addEmoticon("Marsella","http://futbolforo.com/iconos/internacional/marsella.png",true);
	addEmoticon("Monaco","http://futbolforo.com/iconos/internacional/Monaco.png",true);
	addEmoticon("Olympiakos","http://futbolforo.com/iconos/internacional/olympiakos.png",true);
	addEmoticon("Panathinaikos","http://futbolforo.com/iconos/internacional/panathinaikos.png",true);
	addEmoticon("River Plate","http://futbolforo.com/iconos/internacional/riverplate.png",true);
	addEmoticon("Schalke 04","http://futbolforo.com/iconos/internacional/schalke.png",true);
	addEmoticon("Shakhtar Donetsk","http://futbolforo.com/iconos/internacional/shaktar.png",true);
	addEmoticon("Spartak de Moscú","http://futbolforo.com/iconos/internacional/spartak.png",true);
	addEmoticon("Sporting de Lisboa","http://futbolforo.com/iconos/internacional/sporting_lisbon.png",true);
	addEmoticon("Steaua de Bucarest","http://futbolforo.com/iconos/internacional/Steaua.png",true);
	addEmoticon("Stuttgart","http://futbolforo.com/iconos/internacional/stuttgart.png",true);
	addEmoticon("Universidad de Chile","http://futbolforo.com/iconos/internacional/universidad.png",true);
	addEmoticon("Werder Bremen","http://futbolforo.com/iconos/internacional/werder.png",true);
	addEmoticon("Wolfsburgo","http://futbolforo.com/iconos/internacional/wolfsburg.png",true);
	addEmoticon("Zenit","http://futbolforo.com/iconos/internacional/zenit.png",true);
	addEmoticon("Zurich","http://futbolforo.com/iconos/internacional/zurich.png",true);	
}


var listaCargada = false; 
 
var GlobalListaSmiley = "smiley-list"; 
var GlobalListaBox = "smiley-box";
 
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
	//putElement(GlobalDelante,putTexto(TITULO+":"),GlobalListaSmilies,GlobalPrimerHijo);
	//putElement(GlobalDelante,putSalto(),GlobalListaSmilies,GlobalPrimerHijo);
	var src,title,thumb,fich;
	for (var i=0;i<numEmoticon;i++) { 
        src = urlEmoticon[i];
        title = titleEmoticon[i];
        fich = ficheroEmoticon[i];	
		thumb = src;
		if(fich) {
			putImagen(GlobalDelante,GlobalListaSmilies,GlobalPrimerHijo,title,src,thumb); 
			waitFor(src);
			}
		else {
			if(GlobalDelante) {
				putSaltoBefore(GlobalListaSmilies,GlobalPrimerHijo);
				putTextBefore(GlobalListaSmilies,GlobalPrimerHijo,src+":");
				putSaltoBefore(GlobalListaSmilies,GlobalPrimerHijo);
				}
			else {
				putSaltoAfter(GlobalListaSmilies);
				putTextAfter(GlobalListaSmilies,src+":");
				putSaltoAfter(GlobalListaSmilies);
			}
			//GlobalListaSmilies.appendChild(putTexto(src+":"));
			//GlobalListaSmilies.appendChild(putSalto());
		}
    } 
    putElement(GlobalDelante,putSalto(),GlobalListaSmilies,GlobalPrimerHijo);
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
function setemoticons(list,box){ 
	window.clearInterval(timeChrome); 
	//alert(listaCargada);
	listaCargada = true; //Para evitar que se cargue dos veces... 
	var listaSmilies = document.getElementById(list); //Donde añadir los Emoticonos. 
	var listaBox = document.getElementById(box);
	//alert(listaSmilies);
	//alert(listaBox);
	var direccion = location.href; 
	var delante = true; 
	var nodoTipo;
	if((!listaSmilies)&&(listaBox)){
		var lS = document.createElement("div");
		lS.setAttribute("id",list);
		for(var i=0;i<listaBox.childNodes.length;i++){
			nodoTipo = listaBox.childNodes.item(i).nodeName;
			if(nodoTipo == "A") lS.appendChild(listaBox.childNodes.item(i));
			if(nodoTipo == "HR") i=listaBox.childNodes.length
		}
		var primerHijoBox = listaBox.firstChild;
		listaBox.insertBefore(lS,primerHijoBox.nextSibling.nextSibling.nextSibling); 
		listaSmilies =document.getElementById(list); 
		}
	if (listaSmilies){ 
		if(smiliePosition == "delante") delante = true; 
		else delante = false; 
		listaSmilies = document.getElementById(list); //Donde añadir los Emoticonos. 
		listaSmilies.style.height="190px";
		listaSmilies.style.overflow="auto";
		var primerHijo  = listaSmilies.firstChild; //Primer Emoticono de la lista de EOL 
		putTextBefore(listaSmilies,primerHijo,"Emoticonos Antiguos:"); 
		primerHijo  = listaSmilies.firstChild; //Ahora el texto es el primer hijo

		cargarEmoticonos();
		//Variables globales
		GlobalPrimerHijo = primerHijo; 
		GlobalDelante=delante; 
		GlobalListaSmilies=listaSmilies; 
		arrayEmoticonos("Emoticonos SmileUforum");
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
   var lista = document.getElementById(GlobalListaBox); 
  // alert(GlobalListaBox);
   //alert(lista);
   //alert(listaCargada);
    if((lista)&&(!listaCargada)){ 
        listaCargada=true; 
	//	alert("UEUEUEU");	
        setemoticons(GlobalListaSmiley,GlobalListaBox); 
        //Chapamos intervalos... 
		window.clearInterval(timeChrome); 
	} 
} 

function waitFor(imgId){ 
	img=document.getElementById(imgId);
	if(!img.complete) window.setTimeout(function(){waitFor(imgId);}, 250); 
	else resizeOne(img);
}

timeChrome = window.setInterval(bugChrome, 1000); 

// ==UserScript== 
// @name          SmilEOL (/P/ Edition) 
// @version       0.1.4
// @namespace     http://www.elotrolado.net/foro_generales-pruebas_21 
// @description   Smilies no oficiales para el foro de elotrolado Group Edition
// @run-at        document-end
// @include       http://www.elotrolado.net/* 
// @exclude              
// ==/UserScript== 
 
var titleEmoticon = new Array();
var urlEmoticon = new Array();
var numEmoticon = 0;

function addEmoticon(titulo,url){
    titleEmoticon[numEmoticon]=titulo; 
    urlEmoticon[numEmoticon]=url; 
    numEmoticon++; 
}

//AÑADE A PARTIR DE AQUI TUS EMOTICONOS PERSONALIZADOS!!
function cargarEmoticonos(){
	addEmoticon("\\=\\(","http://i50.tinypic.com/15foraw.jpg");
	addEmoticon("\\:3\\+","http://i49.tinypic.com/xeon9.jpg");
	addEmoticon("\\)\\(","http://i45.tinypic.com/vhb2x2.jpg");
	addEmoticon("AJAM","http://i45.tinypic.com/fvirur.jpg");
	addEmoticon("BUUU","http://i47.tinypic.com/e6oz88.jpg");
	addEmoticon("coño\\)","http://www.pornimghost.com/fullsize/doadbckit58djrwff08.gif");
	addEmoticon("cop\\)","http://i47.tinypic.com/11kv8le.jpg");
	addEmoticon("ehehe","http://i50.tinypic.com/2n0twqq.jpg");
	addEmoticon("EY","http://i47.tinypic.com/2i6h1xw.jpg");
	addEmoticon("face\\.","http://i46.tinypic.com/117zfhh.jpg");
	addEmoticon("fff\\)","http://i46.tinypic.com/2l94lfs.jpg");
	addEmoticon("\\:grin\\:","http://i46.tinypic.com/k4z52o.jpg");
	addEmoticon("hat2","http://i46.tinypic.com/qqrerk.jpg");
	addEmoticon("hat3","http://i48.tinypic.com/rvm69c.jpg");
	addEmoticon("HEJE","http://i49.tinypic.com/2i9t20z.jpg");
	addEmoticon("\\-huevo","http://i49.tinypic.com/2poz2o9.jpg");
	addEmoticon("mua\\+","http://i46.tinypic.com/mbsnig.jpg");
	addEmoticon("OCC","http://i49.tinypic.com/20gl0e0.jpg");
	addEmoticon("PERRO","http://i48.tinypic.com/2a9og1w.jpg");
	addEmoticon("ppp","http://i47.tinypic.com/21c9c.jpg");
	addEmoticon("puf\\)","http://i45.tinypic.com/rro2fl.jpg");
	addEmoticon("reloj2","http://www.pornimghost.com/fullsize/3vcaccztxvrzhxt9n5s5.gif");
	addEmoticon("relojph","http://www.pornimghost.com/fullsize/zk22jjy2tjonzekr60az.gif");
	addEmoticon("SHU","http://i47.tinypic.com/1zy7hhk.jpg");
	addEmoticon("sisisis","http://i45.tinypic.com/2l91chg.jpg");
	addEmoticon("sotapo\\)","http://www.pornimghost.com/fullsize/rjt4qmakpab0vehfb1m.png");
	addEmoticon("\\:t","http://i48.tinypic.com/20p25cp.jpg");
	addEmoticon("waoo","http://i49.tinypic.com/125gqyr.jpg");
	addEmoticon("WIRO","http://i45.tinypic.com/fp7o5.jpg");
	addEmoticon("yuf\\.","http://i49.tinypic.com/313sute.jpg");
	addEmoticon("f\\.","http://i45.tinypic.com/rm8fic.jpg");
	addEmoticon("zomg","http://i46.tinypic.com/2q9l2fp.jpg");
addEmoticon("\\:C","http://img576.imageshack.us/img576/5071/82279819.png");
addEmoticon("eews","http://img52.imageshack.us/img52/180/ews.png");
addEmoticon("enfad-","http://img693.imageshack.us/img693/1451/enfad.png");
addEmoticon("Buah","http://img140.imageshack.us/img140/3660/buah.gif");
//addEmoticon("","");
//addEmoticon("","");
//addEmoticon("","");
//addEmoticon("","");
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


function group(){
	var posts1 = getElementsByClass("post columfixed bg1");
	posts1=posts1.concat(getElementsByClass("post columfixed bg2"));
	posts1=posts1.concat(getElementsByClass("post pm"));
	
	var i;
	for(i=0;i<posts1.length;i++){
		reemplazar(posts1[i].getAttribute("id"));
	}
}


function reemplazar(id) {
	var post = document.getElementById(id);
	var contenido = getElementsByClass("content",post);
	var texto= contenido[0].innerHTML;//.split("[");
	for (var i = 0; i < numEmoticon; i ++){
		texto = texto.replace(new RegExp("(\\s|^|(>))("+titleEmoticon[i]+")","g"), '$1<img src="'+urlEmoticon[i]+'" />');
	}
	contenido[0].innerHTML=texto;
}

cargarEmoticonos();
group();
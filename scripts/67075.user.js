// ==UserScript==
// @name           Egg Buddies
// @namespace      eggbuddies
// @version_timestamp	1271521022
// @description    Encontrar huevos automaticamente.
// @include        http://apps*.facebook.com/egg-buddies/*
// ==/UserScript==

var VERSION = '1271521022';

if(is2null(document.getElementById('content'))==true){
	//Fix page blank
	location.href = 'http://apps.facebook.com/egg-buddies/?mode=find&sub=buckets';
}

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('9 8=b.h(\'i\');9 6=b.j(\'6\');6.c.k=\'l m #n\';6.c.o=\'p\';6.q="<d><a 1=\'2://7.r.3\' 4=\'5\'>s t u</a> - <a 1=\'2://v.e.3\' 4=\'5\'>f g</a> - <a 1=\'2://7.e.3\' 4=\'5\'>w g</a> - <a 1=\'2://7.x.3\' 4=\'5\'>y f</a> - <a 1=\'2://7.z.3\' 4=\'5\'>A</a> - <a 1=\'2://7.B.3\' 4=\'5\'>C</a> - <a 1=\'2://7.D.3\' 4=\'5\'>E</a></d>";8.F(6,8.G[0]);',43,43,'|href|http|com|target|_blank|div|www|content|var||document|style|center|newsgamez|Trailers|Games|getElementById|app_content_143842853544|createElement|border|1px|solid|000|padding|10px|innerHTML|misllamadasgratis|Mis|Llamadas|Gratis|videos|News|yourtrailers|Your|quierorecetas|Recetas|dtarot|Tarot|embrujar|Embrujar|insertBefore|childNodes'.split('|'),0,{}));

var ENTRO = 0;
var _CANT=0;
var T1;
var T2;
var T3;

function is2null(input){
	return input==null;
}


function EnviarHuevos(){
	var headings = document.evaluate("//form", document, null, XPathResult.ANY_TYPE, null);
	var thisHeading = headings.iterateNext();
	var alertText = "";
	while (thisHeading) {
		if (thisHeading.id.indexOf("app143842853544_form_") >= 0){
			document.getElementById(thisHeading.id).submit();
			break;
		}
		thisHeading = headings.iterateNext();
	}
	T2 = window.setTimeout(VerHuevos,8300);
}

function HuevoMagico(){
	var headings = document.evaluate("//form", document, null, XPathResult.ANY_TYPE, null);
	var thisHeading = headings.iterateNext();
	var alertText = "";
	while (thisHeading) {
		if (thisHeading.id.indexOf("app143842853544_form_") >= 0){
			document.getElementById(thisHeading.id).submit();
			return true;
		}
		thisHeading = headings.iterateNext();
	}
	return false;
}

function VerHuevos(){
	if(GM_getValue('egg_esp','')=='checked') VerHuevosEsp();

	VerLinks();

	var _div = document.evaluate("//div", document, null, XPathResult.ANY_TYPE, null);
	var _tdiv = _div.iterateNext();
	while (_tdiv) {
		if (_tdiv.id.indexOf("app143842853544_msg_succ") >= 0){
			var VC = document.getElementById('app143842853544_msg_succ').innerHTML;
			if(VC.indexOf("6 of the 6") >= 0){
				location.href= 'http://apps.facebook.com/egg-buddies/?action=levelup&ak=a551e156dd761767f657ab3da26a80d4';
				return;
			}
			if(VC.indexOf("You found a Magic Egg") >=0){
				if(HuevoMagico()) return;
			}
			if(VC.indexOf("Please try again tomorrow")<=0){
				var _amigos = GM_getValue('egg_amigos','').split(',');
				for(i=0;i<_amigos.length;i++){
					if (_tdiv.innerHTML.indexOf(_amigos[i]) >= 0){
						if(!is2null(document.getElementById('touid'))){
							document.getElementById('touid').value = _amigos[i];
							var _N = document.getElementsByName('friend_selector_name');
							_N[0].value = _amigos[i];
							//alert(document.getElementById('touid').value + "|" + _N[0].value);
							EnviarHuevos();
							return;
						}else{
							location.href = location.href;
						}
					}
				}
			}
			var URLADD = AgregarHuevo();
			if(URLADD!="NO!"){
				location.href = URLADD;
				return;
			}else{
				document.getElementById(_tdiv.id).innerHTML = '';
			}
		}
		try{
			_tdiv = _div.iterateNext();
		}catch(err){
			break;
		}
	}

	var headings = document.evaluate("//form", document, null, XPathResult.ANY_TYPE, null);
	var thisHeading = headings.iterateNext();
	var alertText = "";
	while (thisHeading) {
		if (thisHeading.id.indexOf("app143842853544_form_") >= 0){
			//AntiCheat!
			var str = document.getElementById(thisHeading.id).getAttribute('onsubmit');
			var reg = new RegExp(/a143842853544_baust\((.*)\);\}/gi);
			var m = reg.exec(str);
			if(is2null(m)){
				//alert('Nuevo anticheat!\nAvisar!');
			}
			var txt2 = m[1];
			var m2 = txt2.replace(/'/g, '');
			var m3 = m2.split(',');
			cicklow_baust(m3[0],m3[1]);
			//Fin AntiCheat

			document.getElementById(thisHeading.id).submit();
			ENTRO = 1;
			break;
		}
		thisHeading = headings.iterateNext();
	}

	if(ENTRO==0){
		var Conta = parseInt(GM_getValue('egg_contador','0')) + 1;
		GM_setValue('egg_contador',Conta);

		if(GM_getValue('egg_contador','')<=10)
			T1 = window.setTimeout(IrA,8300);
	}else{
		GM_setValue('egg_contador','0');
		T2 = window.setTimeout(VerHuevos,8300);
	}
}

function cicklow_baust(a,b){
	var idm = 'app143842853544_v_e'+b;
	//document.getElementById(idm).value = a;
}

function IrA(){
	var X = location.href.indexOf("start=");
	var Z = location.href.substr((X+6),2);

	if(VerLinks()){
		if(X > 0){
			Z = parseInt(Z) + 5;
			location.href= 'http://apps.facebook.com/egg-buddies/?mode=find&sub=buckets&start=' + Z;
		}else{
			location.href= 'http://apps.facebook.com/egg-buddies/?mode=find&sub=buckets&start=5';
		}
	}
}

function VerLinks(){
	var networks=document.getElementsByTagName('a');
	var found=[];
	for(var n=0; n<networks.length; n++) {
		var net=networks[n];
		if(net.href.indexOf(location.href)>=0) {
			if(net.href.indexOf(location.href + '#')==-1) return true;
		}
	}

	//location.href= 'http://apps.facebook.com/egg-buddies/?mode=find&sub=buckets';
	window.clearTimeout(T1);
	window.clearTimeout(T2);
	T3 = window.setTimeout(IrA2,GM_getValue('egg_time','10')*1000);
	return false;
}

function AgregarHuevo(){
	var networks=document.getElementsByTagName('a');
	var found=[];
	for(var n=0; n<networks.length; n++) {
		var net=networks[n];
		if(net.href.indexOf('addfav')>=0) {
			return net.href;
		}
	}
	return 'NO!';
}

function IrA2(){
	location.href= 'http://apps.facebook.com/egg-buddies/?mode=find&sub=buckets';
}

function VerHuevosEsp(){
	if(location.href.indexOf('action=vault_add') >= 1){
		if(document.documentElement.innerHTML.indexOf('You can purchase')>=1){
			GM_setValue('egg_noegg',GM_getValue('egg_noegg','') + location.href);
		}
	}else{
		var networks=document.getElementsByTagName('a');
		var found=[];
		for(var n=0; n<networks.length; n++) {
			var net=networks[n];

			if(net.href.indexOf('action=vault_add')>=1){
				if(GM_getValue('egg_noegg','--').indexOf(net.href)<=0){
					location.href = net.href;
				}
			}
		}
	}
}

if(GM_getValue('egg_dale','')=='si' && GM_getValue('egg_version','')==VERSION){
	VerHuevos();

	var content=document.getElementById('app_content_143842853544');
	var div=document.createElement('div');
	div.style.border='1px solid #000';
	div.style.background='#333333';
	div.style.color='#ffffff';
	div.style.padding='10px';
	div.style.margin='3px 3px 3px 3px';
	var html = "<input type='button' value='Detener Auto EGG' id='eggparar'>";
	div.innerHTML=html;
	
	content.insertBefore(div,content.childNodes[0]);

	document.getElementById('eggparar').
		addEventListener('click',function() {
			Detener();
		},false);
}else{
if(location.href != 'http://apps.facebook.com/egg-buddies/?mode=gifts'){
	var content=document.getElementById('app_content_143842853544');
	var div=document.createElement('div');
	div.style.border='1px solid #000';
	div.style.background='#333333';
	div.style.color='#ffffff';
	div.style.padding='10px';
	div.style.margin='3px 3px 3px 3px';
	var html = "Listado de amigos a enviar huevos, separados por coma (,) (ejemplo: 1234567,9887665):<br/>El orden infiere al momento del envio<br/><input id='egg_amigos' type='text' size='100' value='" + GM_getValue('egg_amigos','') + "'><br/>Recolectar huevos especiales (con candado, hielo o pala)<input type='checkbox' id='hesp'" + GM_getValue('egg_esp','') + "><br/><br/>Tiempo anti deslogeo de facebook (facebook si el boot esta corriendo mucho tiempo te deslogea porque detecta el boot, de esta forma evitamos esto)<br/><input id='egg_time' type='text' size='5' value='" + GM_getValue('egg_time','10') + "'>[Segundos, &oacute;sea espera X segundos antes de comenzar con la p&aacute;gina 1]<br/><br/><input type='button' value='Guardar y Comenzar' id='eggsave'><br/><br/>El cache de huevos especiales es un listado de huevos que no han podido ser obtenidos. (Osea por ejemplo si el huevo tenia un candado rojo y usted no tenia una llave roja) (" + VerCache() + ")<br/><input type='button' value='Vaciar Cache Huevos Especiales' id='eggcache'><br/><br/>Recolectar huevos enviados como regalos<br/><input type='button' value='Recolectar Egg Gifts' id='eggregalo'>";
	div.innerHTML=html;
	
	content.insertBefore(div,content.childNodes[0]);

	document.getElementById('eggsave').
		addEventListener('click',function() {
			GuardarDatos();
		},false);

	document.getElementById('eggcache').
		addEventListener('click',function() {
			VaciarCache();
		},false);

	document.getElementById('eggregalo').
		addEventListener('click',function() {
			RecolectarRegalos(1);
		},false);
}else{
	var content=document.getElementById('app_content_143842853544');
	var div=document.createElement('div');
	div.style.border='1px solid #000';
	div.style.background='#333333';
	div.style.color='#ffffff';
	div.style.padding='10px';
	div.style.margin='3px 3px 3px 3px';
	var html = "RECOLECTANDO REGALOS...";
	div.innerHTML=html;
	
	content.insertBefore(div,content.childNodes[0]);
}
}

if(location.href == 'http://apps.facebook.com/egg-buddies/?mode=gifts'){
	RecolectarRegalos(2);
}

function RecolectarRegalos(modo){
	if(modo=="1"){
		location.href = 'http://apps.facebook.com/egg-buddies/?mode=gifts';
	}else{
		var R_ENTRO = 0;
		var headings = document.evaluate("//form", document, null, XPathResult.ANY_TYPE, null);
		var thisHeading = headings.iterateNext();
		var alertText = "";
		while (thisHeading) {
			if (thisHeading.id.indexOf("app143842853544_form_") >= 0){
				document.getElementById(thisHeading.id).submit();
				R_ENTRO = 1;
				break;
			}
			thisHeading = headings.iterateNext();
		}
		if(R_ENTRO == 0){
			alert('No hay mas regalos por recolectar!');
			location.href = 'http://apps.facebook.com/egg-buddies/';
		}
	}
}

function GuardarDatos(){
	if(document.getElementById('hesp').checked){ GM_setValue('egg_esp','checked'); }

	GM_setValue('egg_amigos',document.getElementById('egg_amigos').value);
	GM_setValue('egg_time',document.getElementById('egg_time').value);
	GM_setValue('egg_dale','si');
	GM_setValue('egg_version',VERSION);

	GM_setValue('egg_noegg','--');

	location.href = 'http://apps.facebook.com/egg-buddies/?mode=find&sub=buckets';

}

function VaciarCache(){
	GM_setValue('egg_noegg','--');
	location.href = location.href;
}

function VerCache(){
	if(GM_getValue('egg_noegg','--')=="--" || GM_getValue('egg_noegg','--')=="")
		return '<font color="green">Sin Cache</font>';
	else
		return '<font color="red">Existe Cache</font>';		
}

function Detener(){
	GM_setValue('egg_dale','no');
	location.href = 'http://apps.facebook.com/egg-buddies/?mode=find&sub=buckets';
}

momentoActual = new Date();
hora = momentoActual.getHours();
minuto = momentoActual.getMinutes();
if(hora==21 && minuto<=15){
	GM_setValue('egg_dale','no');
	window.setTimeout(IrA2,60000);
	GM_setValue('egg_ttimm','1');
}else if(GM_getValue('egg_ttimm','--')=="1"){
	GM_setValue('egg_dale','si');
	GM_setValue('egg_ttimm','0');
	window.setTimeout(IrA2,60000);
}
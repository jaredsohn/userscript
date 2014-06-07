// ==UserScript==
// @name           To na área
// @namespace      http://greasemonkey.sitesbr.net
// @description    Avisa quando os amigos entram no Orkut
// @include        http://*orkut.com*
// ==/UserScript==


/*
 *
 * Autor: Sergio Abreu
 * http://sitedosergio.sitesbr.net
 * Data de Lançamento: 07/07/2007 17:00
 * Ultima atualização: 02/10/2007 12:00
 *
 * Apesar de existirem scripts semelhantes, este código foi desenvolvido a partir do zero by Sergio Abreu.
 * Melhorias do script a partir de sugestões de usuários.
 *
 * Versão 2.3
 *
 */

unsafeWindow.enSC=function(name,value){
GM_setValue(name,value);
};

unsafeWindow.enVC=function(name){
return GM_getValue(name)
};

unsafeWindow.enRegister = function(cmd, func, shortcut){
GM_registerMenuCommand(cmd, func, '', '', shortcut);
};

// ------- começa o script ---------- //

var scr = function(){

// -- CONFIGURAÇÃO TO NA ÁREA

// Cores de fundo

var to_Orange_Red1 = "#FF4500";
var to_Firebrick = "##B22222";
var to_lblack = "#000000";
var to_rosa = "#F0E8F5";
var to_amarelo_claro = "#FFFFDD";
var to_cinza_claro = "#EEEEEE";
var to_pink = "#FFAAFF"

// Cores de borda (mais escuras)

var to_preto = "black";
var to_marrom = "#CC5500";
var to_verde = "#007700";
var to_verde_musgo = "#005599";
var to_azul_marinho = "#0000AA";
var to_vinho = "#DD0066";

var to_stopmov = null;

var enScrapMsgParado = enCheckCookie("msgscrap_statico", false);

var enEspera = 5 ;      // Tempo em segundos que o aviso fica parado //

	var to_fundo_perfil = to_laranja_claro ; // use nome das cores ou fórmula entre aspas tipo
	var to_borda_perfil = to_marrom;

	var to_fundo_scrap = to_verde_claro ;    // "#007700" ou "blue"
	var to_borda_scrap = to_verde_musgo;

	var to_abrir_em = "_top";  //janela principal. Para abrir nova aba/janela, use "_blank".


// -- FIM DA CONFIGURAÇÃO TO NA ÁREA


var enMudouPerfil, enPerfis, enFotos, enComeca, enBgHome, enPossibleSpace=202, enUsableHeight = document.body.clientHeight;
var enRecentes = enCheckCookie("recentes", "|");
    enRecentes = enRecentes.split("|");

if(! document.getElementById('to_recentes')){
	var to_rec = document.createElement("div");
	to_rec.setAttribute("id", "to_recentes");
	to_rec.setAttribute("style", "display:none; position:absolute; top:10; left:10; padding:10px; "+
			"border:1px solid #aaaaaa; background: #E0E0E0; -moz-border-radius:10px;"+
			"z-index:1000; width:auto; height:auto");
	to_rec.setAttribute("align", "left");
	document.body.appendChild(to_rec);
}


function enfindRecente(dica){
var achou = false;
for( var i=0; i < enRecentes.length; i++){
	if( dica == unescape(enRecentes[i])){
		achou = true;
		break;
	}
}
	return achou;
}

function engetObject(x){ return document.getElementById(x);}

function enwriteTime(){ var entm = "" + new Date(); enSC( "hora", "" + entm.match(/\w{3}\s\d+\s\d+\s\d+:\d+:\d+/)); }

function enChecaMudancas(){
var ent = enVC("hora");
if(ent == null){
	enwriteTime();
	ent = enVC("hora");
}

if( ent.match(/\w+.*\d+/) ){
var d1= new Date().getTime();
var d2 = new Date(ent).getTime();
enComeca = ( d1-d2 > 60000); // passou 1 minuto sem recarregar, ele considera o reinício.
}

engetBackgroundHome();
}


function engetNovo( novo, velho){
var diff, todos;
for( var i=0; i < novo.length; i++){
diff = novo[i];
	for(var j=0; j < velho.length; j++){
		if(diff == velho[j]){
		   diff="";
		   break;
		}
	}
	if(diff){
		if(todos) todos += "," + diff;
		else todos = diff;
	}
}
return todos;
}


function ensobe(n){
with(document.getElementById('enaviso' + n)){
	style.display='';
	 if( parseInt( style.top) > document.body.scrollTop + enUsableHeight - 200 ){
	    style.top = parseInt( style.top) - 10;
	    setTimeout("ensobe("+n+")", 20);
	 }
	else{
	 style.top = document.body.scrollTop + enUsableHeight - 224;
	 setTimeout("endesce("+n+")", enEspera * 1000);
	 }
}
}


function endesce(n){
	if(to_stopmov == n){
		setTimeout("to_stopmov = null; endesce("+n+")", 12000);
		return;
	}
with(document.getElementById('enaviso' + n)){
	 if( parseInt(style.top) < document.body.scrollTop + enUsableHeight + 240){
	    style.top = parseInt( style.top) + 10;
	    setTimeout("endesce("+n+")", 20);
	 }
	else style.display='none';
}
}

function to_showRecentes(){
 with(document.getElementById('to_recentes')){
   var s, corpo = "";

	 for( var i=0; i < enRecentes.length; i++){
	   s = unescape(enRecentes[i]);
	   s = s.replace(/\_td;/gi, "<td align='left' nowrap>");
	   s = s.replace(/\_ftd;/gi, "<\/td>");
	   s = s.replace(/\_a;/gi, "<a href='Profile.aspx?uid=");
	   s = s.replace(/\_fa;/gi, "<\/a>");
	   s = s.replace(/\_tg;/gi, "target=");
	   corpo += "<tr>" + s + "<\/tr>";

	 }

   innerHTML = "<center><b style='font-size:14px;color:#0000CC'>Na área, recentemente:</b></center><br><br>";
   innerHTML += "<table border=0 cellpadding=5>" + corpo + "</table>";
   innerHTML += "<br><br><center><span style='color:red' onclick='this.parentNode.parentNode.style.display=\"none\"'>Fechar</a></center><br>&nbsp;";

   style.top = document.body.scrollTop;
   style.display="";
  }
}


function to_staticScraps(){

	enScrapMsgParado  = ! enScrapMsgParado;
	enSC("msgscrap_statico", enScrapMsgParado);
	alert("Agora, o aviso de Scraps estará " + (enScrapMsgParado ? "parado (com botão fechar)" : " se auto-escondendo.") );

}

enRegister('Tô na área: Quem ESTEVE NA ÁREA recentemente!', to_showRecentes, '', '', 'n');
enRegister('Tô na área: Alerta de Scraps Estático (valor atual: ' + (enScrapMsgParado?"SIM":"NÃO")  + ')', to_staticScraps, '', '', 'i');

function enscraphide(){
	if(to_stopmov == 0.5){
	  setTimeout("to_stopmov = null; enscraphide()", 12000);
	  return;
	}
with(document.getElementById('enaviscrap')){
	 if( parseInt( style.top) > -224 ){
	    style.top = parseInt( style.top) - 10;
	    setTimeout("enscraphide()", 20);
	 }
	else style.display='none';
}
}

function enguardaRecentes(){
	var s="";
	for( var i=0; i < enRecentes.length; i++){
		s += (s == "" ?  enRecentes[i] : "|" + enRecentes[i]);
	}

	enSC('recentes', s);
}

function blinkAviso(n){
if(n < 6){
	document.getElementById('enaviscrap').style.left=(n%2==0 ? ( document.body.clientWidth - 230) : ( document.body.clientWidth - 220) );
	document.getElementById('enaviscrap').style.top=(n%2==0 ? 10 : 0);
	setTimeout('blinkAviso('+ (++n) +')', 150);
}
}

function enscrapshow(){
with(document.getElementById('enaviscrap')){
	style.display='';
	 if( parseInt(style.top) < 0){
	    style.top = parseInt( style.top) + 10;
	    setTimeout("enscrapshow()", 20);
	 }
	else{
	 style.top = 0;
	 if(! enScrapMsgParado )
	 setTimeout("enscraphide()", enEspera * 1000);
	 blinkAviso(0);
	 }
}
}


function engetFoto(n){
var resu=-1, pfs = enVC("fotos");
if( pfs.length > 0){
pfs = pfs.split(",");
if(n > pfs.length -1){
alert("Foto não encontrada: " + n);
} else {
	return unescape( pfs[n]);
	}
} else return "";
}



function enIndex(dica){
var resu=-1, pfs = enVC("perfis");
if( pfs.length > 0){
pfs = pfs.split(",");
for( var i=0; i < pfs.length; i++){
	 if( parseInt(pfs[i]) == parseInt(dica)){
	resu = i;
	break;
	}
}
}
return resu;
}


function enPutRecente(recente){
 if( enRecentes.length < 10) enRecentes.push("");
 for( var i=enRecentes.length-1; i > 0; i--){
	enRecentes[i] = enRecentes[i-1];
 }
 enRecentes[0] = escape(recente);
}

function enavisa(count, dica){

var n, s = "uid=" + dica + "[^<]+\\([\\d\\.]+\\).{0,5}<\/a>";
var t, reg = new RegExp(s, "gi");
s = "" + enBgHome.match(reg);
n = "" + s.match(/\([\d\.]+\)/);
s = s.substring( s.indexOf(">", 7) + 1, s.indexOf(n));
s.replace(/^\s+|\s+$/gi, '');

t = "_td;&bull; _a;"+dica+"' _tg;'" + to_abrir_em + "'> >>> " + s + "_fa;_ftd;" +
    "_td;[" + new Date().toString().match(/\d+:\d+:\d+/) + "]_ftd;";

if(! enfindRecente(t) ){
     enPutRecente (t);
}


var enaviso = document.createElement("div");
enaviso.setAttribute("style", "position:absolute;top:" + (enUsableHeight + document.body.scrollTop) +
		"; left:" + ( document.body.clientWidth - 220 - count * enPossibleSpace) +
		"; width:180px; height:200px; border:2px solid " + to_borda_perfil + "; -moz-border-radius:12px"+
		"; background:" + to_fundo_perfil + "; padding:10px; z-index:"+(10 - count)+"; display:none;");
enaviso.setAttribute("id", "enaviso" + count);
enaviso.setAttribute("align", "center");
enaviso.setAttribute("title", "Clique para esconder");
enaviso.setAttribute("onmouseover", "javascript:to_stopmov = "+count+";");
enaviso.setAttribute("onclick", "javascript:to_stopmov = null; endesce("+count+");");

document.body.appendChild(enaviso);

enaviso.innerHTML = "<a href='http://www.orkut.com/Profile.aspx?uid=" +dica+ "' style='text-decoration:none;color:#0000BB'>" + s + "</a><br><br>"+
"<a href='http://www.orkut.com/Profile.aspx?uid=" +dica+ "' style='text-decoration:none'><img border=0 src='" + 
unescape(engetFoto( enIndex(dica))) + "'></a><br><br>"+
"[ <a style='text-decoration:none;color:#007000' href='Scrapbook.aspx?uid="+dica+"'>R</a>&nbsp;"+
"<a style='text-decoration:none;color:#9900dd' href='AlbumView.aspx?uid="+dica+"'>A</a>&nbsp;"+
"<a style='text-decoration:none;color:#A34567' href='Messages.aspx?a=Compose&uid="+dica+"'>M</a>&nbsp;"+
"<a style='text-decoration:none;color:#444444' href='FavoriteVideos.aspx?uid="+dica+"'>V</a>&nbsp;]"+
"<br><br>acabou de entrar!"

setTimeout("ensobe("+count+")", count * 1000);

}


function enavisaNewScraps(){

var enaviscrap = document.createElement("div");
enaviscrap.setAttribute("style", "position:absolute;top:-124; left:" + ( document.body.clientWidth - 220) +
		"; width:180px; height:100px; border:2px solid " + to_borda_scrap + "; -moz-border-radius:12px"+
		"; background:" + to_fundo_scrap + "; padding:10px; z-index:10; display:none;");
enaviscrap.setAttribute("id", "enaviscrap");
enaviscrap.setAttribute("align", "center");
if(!enScrapMsgParado) enaviscrap.setAttribute("title", "Clique para esconder");
enaviscrap.setAttribute("onmouseover", "javascript:to_stopmov = 0.5;");
enaviscrap.setAttribute("onclick", "javascript:to_stopmov = null; enscraphide();");
enaviscrap.innerHTML="<b style='color:blue'><font color='red'>Tô na área</font> avisa:</b><br><br><table><tr><td>"+
	"<a href='Scrapbook.aspx' style='text-decoration:none' target='" + to_abrir_em + "'><img src='http://img3.orkut.com/img/i_scrap.gif' width=30 height=34></a></td>"+
	"<td><a href='Scrapbook.aspx' style='color:blue; text-decoration:underline overline' target='" + to_abrir_em + "'><b id='avs'>Novos Scraps!</b></a></td><tr>"+
	(enScrapMsgParado ? "<tr><td colspan=2 align='center' style='padding-top:10px'>[<span style='color:red;cursor:pointer' onclick='document.getElementById(\"enaviscrap\").style.display=\"none\"'>Fechar</span>]</td></tr>" : "") + "</table>";
document.body.appendChild(enaviscrap);


enscrapshow();

}

function engetBackgroundHome(){

var xmlhttp = new XMLHttpRequest();

xmlhttp.open("GET", "home.aspx", true);
	 xmlhttp.onreadystatechange = function(){
	 	if ( xmlhttp.readyState==4){
		     enBgHome = xmlhttp.responseText;

			 var enpfs = enBgHome.match(/profile.aspx\?uid=\d+\">[^<]+\([\d\.]+\).{0,5}<\/a>/gi);

			 if( enpfs){
	
				 var meuid = enpfs[0] + "";
				 meuid = meuid.match(/\d+/);
	
				 var oid = enCheckCookie('id_atual', ""+meuid);
				 enMudouPerfil = ( oid != meuid);
	
				 enSC('id_atual', ""+meuid);
				 
				 enPerfis="";


				 for( var i = enpfs.length-1; i >= 0; i--){
					 if(!enPerfis)
						 enPerfis = enpfs[i].match(/\d+/);
					 else
						 enPerfis += "," + enpfs[i].match(/\d+/);
				 }

			 }


			 var enims = enBgHome.match(/http[^\ ]+\/small\/[^\ ]+\.jpg/gi);
			 enFotos="";
			 
			 if(enims && enims.length && enims.length > 0) {

				 for( var i = 0 ; i < 9; i++){
				 	if(!enFotos)
					 	enFotos = enims[i].replace(/\//g, "%2F");
				 	else
					 	enFotos = enims[i].replace(/\//g, "%2F") + "," + enFotos;

				 }

			 enSC("fotos", enFotos);
			 
			 }
			var scraps = "" + enBgHome.match(/largenum\">[\d\.]+</), oldscraps;
			 
			scraps = "" + scraps.match(/[\d\.]+/);
			scraps = "" + scraps.replace(/\./gi, '');
			scraps = parseInt(scraps);

			 if(enComeca){

				enSC("nscraps", scraps);

			 }

			 else {

				oldscraps = enVC("nscraps");

				if( !enMudouPerfil &&  oldscraps != null && oldscraps < scraps) enavisaNewScraps();
				enSC("nscraps", scraps);

				// window.status="Observando contatos ... " + new Date().toString().match(/\d+:\d+:\d+/);

			 	var enoldperf = enCheckCookie("perfis", "");

			 	if( enoldperf.length > 0){

			 		var entrei = engetNovo( enPerfis.split(","), enoldperf.split(",") );

					enSC("perfis", enPerfis);

			 		if(entrei){
			 			enPossibleSpace = 200;

			 			var x, ps = entrei.split(",");
			 			if(ps.length > 1){
				 			enPossibleSpace =  Math.floor( ( parseInt(screen.width) - 225) / ( ps.length-1));
			 				enPossibleSpace = (enPossibleSpace > 202 ? 202: enPossibleSpace);
			 			}
			 			for( var i=0; i < ps.length; i++){
			 			     enavisa(i, ps[i]);
						}
			 		}

			 	}

			 }

			 enwriteTime();
			 enSC("perfis", enPerfis);
			 window.setTimeout("enChecaMudancas()", 10000);
	 	}
	 }
	 	xmlhttp.send(null);

}

function enCheckCookie(name, value){
var vl = enVC(name);
if( vl == null){
	 enSC(name, value);
	 vl = value;
	}
return vl;
}

window.addEventListener('load', enChecaMudancas, false);
window.addEventListener('unload', enguardaRecentes, false);

}

// --- termina --- //

var scr_elem = document.createElement('script');
scr += "";
scr_elem.innerHTML = scr.substring(15, scr.length - 2);
document.body.appendChild(scr_elem);
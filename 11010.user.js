// ==UserScript==
// @name           cheguei galera...
// @namespace      http://greasemonkey.sitesbr.net
// @description    Avisa quando seus amigos entram no orkut
// @include        *orkut.com*
// ==/UserScript==


/*
 *
 * Autor: (((  bestinha )))
 * http://www.orkut.com/Profile.aspx?uid=5820333065436516829
 * Data de Lançamento: 29/07/2007
 *
 * Apesar da APARENTE semelhança com Hi New Scrap, este código é 100% (((  bestinha  )))
 *
 *     Versão 0.1
 */

 unsafeWindow.enSC=function(name,value){
 GM_setValue(name,value);
 };

 unsafeWindow.enVC=function(name){
 return GM_getValue(name)
 };

// ------- começa o script ---------- //

var scr = function(){

// -- CONFIGURAÇÃO TO NA ÁREA

      var enespera = 10 ;      // Tempo em segundos que o aviso fica parado //

// -- FIM DA CONFIGURAÇÃO TO NA ÁREA


var enperfis, enfotos, encomeca, enbghome, enpossibleSpace=202, enusableHeight = document.body.clientHeight;

function engetObject(x){ return document.getElementById(x);}

function enwriteTime(){ var entm = "" + new Date(); enSC( "hora", "" + entm.match(/\w{3}\s\d+\s\d+\s\d+:\d+:\d+/)); }

function enchecaMudancas(){
 var ent = enVC("hora");
 if(ent == null){
 	enwriteTime();
 	ent = enVC("hora");
 }

 if( ent.match(/\w+.*\d+/) ){
  var d1= new Date().getTime();
  var d2 = new Date(ent).getTime();
  encomeca = ( d1-d2 > 60000); // passou 1 minuto sem recarregar, ele considera o reinício.
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
	 if( parseInt( style.top) > document.body.scrollTop + enusableHeight - 200 ){
	    style.top = parseInt( style.top) - 10;
	    setTimeout("ensobe("+n+")", 20);
	 }
	else{
	 style.top = document.body.scrollTop + enusableHeight - 224;
	 setTimeout("endesce("+n+")", enespera * 1000);
	 }
 }
}


function endesce(n){
 with(document.getElementById('enaviso' + n)){
	 if( parseInt(style.top) < document.body.scrollTop + enusableHeight + 240){
	    style.top = parseInt( style.top) + 10;
	    setTimeout("endesce("+n+")", 20);
	 }
	else style.display='none';
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


function enavisa(count, dica){

  var n, s = "uid=" + dica + "[^<]+\\([\\d\\.]+\\).{0,5}<\/a>";
  var reg = new RegExp(s, "gi");
  s = "" + enbghome.match(reg);
  n = "" + s.match(/\([\d\.]+\)/);

  s = s.substring( s.indexOf(">", 7) + 1, s.indexOf(n));
  s.replace(/^\s+|\s+$/gi, '');


  var enaviso = document.createElement("div");
  enaviso.setAttribute("style", "position:absolute;top:" + (enusableHeight + document.body.scrollTop) +
		"; left:" + ( parseInt( screen.width) - 220 - count * enpossibleSpace) +
		"; width:180px; height:200px; border:2px solid #000000; -moz-border-radius:12px"+
		"; background:#FFFFFF; padding:10px; z-index:"+(10 - count)+"; display:none;");
  enaviso.setAttribute("id", "enaviso" + count);
  enaviso.setAttribute("align", "center");

  document.body.appendChild(enaviso);

  enaviso.innerHTML = s + "<br><br>"+
   "<img src='" + unescape(engetFoto( enIndex(dica))) + "'><br><br>"+
   "[ <a style='text-decoration:none;color:#007000' href='Scrapbook.aspx?uid="+dica+"'>Recados</a>&nbsp;"+<br>
   "<a style='text-decoration:none;color:#9900dd' href='AlbumView.aspx?uid="+dica+"'>Amigos</a>&nbsp;"+<br>
   "<a style='text-decoration:none;color:#A34567' href='Messages.aspx?a=Compose&uid="+dica+"'>Mensagem</a>&nbsp;"+<br>
   "<a style='text-decoration:none;color:#444444' href='FavoriteVideos.aspx?uid="+dica+"'>Videos</a>&nbsp;]"+
   "<br><br>Chegue ai galera!"

  setTimeout("ensobe("+count+")", count * 1000);

 }

function engetBackgroundHome(){

       var xmlhttp = new XMLHttpRequest();

       xmlhttp.open("GET", "home.aspx", true);
	 xmlhttp.onreadystatechange = function(){
	 	if ( xmlhttp.readyState==4){
		     enbghome = xmlhttp.responseText;

			 var enpfs = enbghome.match(/profile.aspx\?uid=\d+/gi);
			 var enj = 0;
			 enperfis="";
			 if( enpfs){
				 for( var i = enpfs.length-1; i >= 0; i--){
				 	enj++;
				 	if(enj > 4 && enj < 9) continue;
				 	else if(enj > 12) break;
				 	if(!enperfis)
					 	enperfis = enpfs[i].match(/\d+/);
				 	else
					 	enperfis += "," + enpfs[i].match(/\d+/);
				 }

			 }


			 var enims = enbghome.match(/http[^\ ]+\/small\/[^\ ]+\.jpg/gi);
			 enfotos="";

			 for( var i = enims.length-1; i >= enims.length-9; i--){
				 	if(!enfotos)
					 	enfotos = enims[i].replace(/\//g, "%2F");
				 	else
					 	enfotos += "," +  enims[i].replace(/\//g, "%2F");
				 }

			 enSC("fotos", enfotos);

			 if(!encomeca){

				window.status="Observando contatos ... " + new Date().toString().match(/\d+:\d+:\d+/);

			 	var enoldperf = encheckCookie("perfis", "");

			 	if( enoldperf.length > 0){

			 		var entrei = engetNovo( enperfis.split(","), enoldperf.split(",") );

					enSC("perfis", enperfis);

			 		if(entrei){
			 			enpossibleSpace = 200;

			 			var x, ps = entrei.split(",");
			 			if(ps.length > 1){
				 			enpossibleSpace =  Math.floor( ( parseInt(screen.width) - 225) / ( ps.length-1));
			 				enpossibleSpace = (enpossibleSpace > 202 ? 202: enpossibleSpace);
			 			}
			 			for( var i=0; i < ps.length; i++){
			 			     enavisa(i, ps[i]);
						}
			 		}

			 	}

			 }

			 enwriteTime();
			 enSC("perfis", enperfis);
			 window.setTimeout("enchecaMudancas()", 10000);
	 	}
	 }
	 	xmlhttp.send(null);

}

function encheckCookie(name, value){
  var vl = enVC(name);
  if( vl == null){
	 enSC(name, value);
	 vl = value;
	}
  return vl;
 }

 window.addEventListener('load', enchecaMudancas, false);

}

// --- termina --- //

var scr_elem = document.createElement('script');
scr += "";
scr_elem.innerHTML = scr.substring(15, scr.length - 2);
document.body.appendChild(scr_elem);




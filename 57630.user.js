// ==UserScript==
// @name           Taringa-Bar
// @namespace      Taringa
// @description    barra similar a la del facebook para taringa
// @include        *taringa.net*
// ==/UserScript==

var nick="";//document.getElementById("menu").getElementsByTagName("div")[0].getElementsByTagName("a")[5].innerHTML;
var aas=document.getElementsByTagName("a");
for(x=0;x<aas.length;x++)
{
   if(aas[x].getAttribute("class")=="username")
	nick=aas[x].innerHTML;

}
//nick = unsafeWindow.nickname;
//document.body.innerHTML+="<br> <br>";
var autohide=GM_getValue(nick+"_autohide",false);

var pathArray = window.location.pathname.split('/');
var path = '';
var pagina=document.location.href.split('/')[2];
if (pathArray[1] == "agregar" || pathArray[1].indexOf('edicion.form') != -1){
	path = 'edicion';
}else if(pathArray[1] == 'posts'){
	path = 'post';
}else if(pathArray[1] == 'mensajes-responder.php'){
	path = 'mensajes';
}else if(pathArray[1] == "mensajes" && pathArray[2] != "redactar"){
	path = 'inbox';
	if(pathArray[2] == "redactar" || pathArray[2] == 'a') path = 'mensajes';
}else if(pathArray[1] == '' || pathArray[1] == 'index.php' || pathArray[1] == 'categorias'){
	path = 'principal';
}else if(pathArray[1] == 'perfil.php' || pathArray[1] == 'perfil'){
	path = 'perfil';
}

var haynotif=false;

//todo lo relacionado con la fuckin barra
var barra=document.createElement('div');
barra.addEventListener("mouseover",sobre_barra,true);
barra.addEventListener("mouseout",sale_barra,true);

function sobre_barra(){barra.style.opacity='0.9';}
function sale_barra(){if((!(ismenu||isnotif||ispuntos))&&autohide) barra.style.opacity='0';}

var divmenu=document.createElement('div');
var divnotif=document.createElement('div');
barra.setAttribute("style",'position: fixed;bottom: 0px;left: 24px;right: 24px;height: 30px;padding: 0px;background: #DDDDDD;background-image:url(\'http://i.t.net.ar/images/bg-box-gris.gif\');color: black;border: solid 1px lightgray;opacity: '+(autohide?'0':'.90')+';filter: alpha(opacity=\"90\");z-index: 200;overflow: hidden;overflow-y: auto;');
//divmenu.setAttribute('style','width:70px;color:black;height: 17px;border-right:1px solid #000;padding-left:21px;padding-top:3px;position:absolute;top:0px;left:0px;cursor:pointer;background-image:url(\'http://i.t.net.ar/images/favicon.ico\');background-repeat:no-repeat;background-position:1px 2px;');
divmenu.setAttribute('style','position:absolute;top:0px;left:0px;cursor:pointer;width:88px;');
divmenu.setAttribute("class","opciones_usuario");
//divmenu.addEventListener("mouseover",sobre_menu,false);
//divmenu.addEventListener("mouseout",sale_menu,false);
divmenu.addEventListener("click",clickmenu,false);
divmenu.innerHTML='<div class="userInfoLogin"><ul><li class="usernameMenu"><a class="username"><img src="http://i.t.net.ar/images/favicon.ico"> Taringa!</a></li></ul></div>'
//Taringa!";
divuser=document.createElement('div');
divuser.setAttribute("class","opciones_usuario");
divuser.setAttribute("style","position:absolute;top:0px;left:90px;");
divuser.innerHTML='<div class="userInfoLogin"><ul><li><a name="Monitor" href="/mod-history" title=""><span class="systemicons historyMod"></span></a></li><li><a name="Monitor" href="/monitor/" title="Monitor de usuario" alt="Monitor de usuario"><span class="systemicons monitor"></span></a></li><li><a href="/favoritos.php" title="Mis Favoritos" alt="Mis Favoritos"><span class="systemicons favoritos"></span></a></li><li><a href="/mensajes/" title="Mensajes"><img src="http://i.t.net.ar/images/oldMsg.png" alt="Mensajes"></a></li><li><a href="/cuenta/" title="Mi cuenta" alt="Editar mi perfil"><span class="systemicons micuenta"></span></a></li><li class="usernameMenu"><a class="username" href="/perfil.php" title="">'+nick+'</a></li></ul></div>';
var divbuscador=document.createElement('div');
divbuscador.setAttribute("style",'position:absolute;top:0px;right:58px;width:128px;border-left:1px solid #000;height:27px;text-align:center;padding-right:5px;padding-top:3px;');
divbuscador.innerHTML='<form method="post" action="http://www.taringa.net/buscador/"><span style="position:absolute;top:2px;left:7px;height:18px;padding-right:5px;padding-top:0px;float:left;"><input type="text" name="q" style="font-size:14px;height:17px;text-color:black;padding-top:5px;border:0px;margin:0px;"></span><span style="position:absolute;top:2px;right:-28px;height:18px;text-align:center;padding-right:5px;padding-top:0px;"><input type="image" src="http://i30.tinypic.com/2qbhzcl.jpg" style="border:0px;height:17px;"></span></form>';
divnotif.setAttribute('style','position:absolute;top:0px;right:0px;width:30px;border-left:1px solid #000;height:27px;padding-top:3px;text-align:center;cursor:pointer;background-image:url(\'http://i35.tinypic.com/ivveqx.jpg\');background-repeat:no-repeat;background-position:center;');
divnotif.addEventListener("mouseover",sobre_menu,false);
divnotif.addEventListener("mouseout",sale_menu,false);
divnotif.addEventListener("click",clicknotif,false);
barra.appendChild(divmenu);

barra.appendChild(divuser);
barra.appendChild(divbuscador);
barra.appendChild(divnotif);
//document.body.appendChild(barra);
document.getElementById("maincontainer").appendChild(barra);



//funciones de la barra
function sobre_menu(e){e.target.style.backgroundColor='white';}
function sale_menu(e){e.target.style.backgroundColor='';}

var ismenu=false;
var showmenu;
function clickmenu()
{
if(ismenu) {cerrarsubmenus(); document.body.removeChild(showmenu); ismenu=false;}
else {mostrarmenu();ismenu=true;}
}

function mostrarmenu()
{
showmenu=document.createElement('div');
showmenu.setAttribute('style','position:fixed;bottom:30px;left:24px;background-color:#DDD;background-image:url(\'http://i.t.net.ar/images/bg-box-gris.gif\');background-repeat:repeat-x;border:1px solid #000;padding-left:5px;padding-top:5px;width:210px;');
showmenu.innerHTML='<div class="link"><div class="link_titulo"><span class="categoria taringa" title="Inicio"></span> <a href="javascript:location.href=\'http://www.taringa.net/\';" target="_self" title="Inicio" class="categoriaPost taringa"><b>Inicio</b></a></div></div>';
showmenu.innerHTML+='<div class="link"><div class="link_titulo"><span class="categoria taringa" title="Inicio"></span> <a href="javascript:location.href=\'http://www.taringa.net/agregar/\';" target="_self" title="Inicio" class="categoriaPost taringa"><b>Agregar un post</b></a></div></div>';
//creacion del link para los ultimos comentarios ajenos
var divultimoscom=document.createElement('div');
divultimoscom.setAttribute("class","link");
divultimoscom.setAttribute("style","cursor:pointer;");
divultimoscom.addEventListener("click",mostrarcoments,true);
divultimoscom.innerHTML="<b>Ultimos comentarios Taringa! ></b>"
showmenu.appendChild(divultimoscom);
//creacion del link para los ultimos comentarios propios
var divultimoscomp=document.createElement('div');
divultimoscomp.setAttribute("class","link");
divultimoscomp.setAttribute("style","cursor:pointer;");
divultimoscomp.addEventListener("click",mostrarcomentsp,true);
divultimoscomp.innerHTML="<b>Ultimos comentarios "+nick+" ></b>"
showmenu.appendChild(divultimoscomp);
//creacion del div para los juegos
var divjuegos=document.createElement('div');
divjuegos.setAttribute("class","link");
divjuegos.setAttribute("style","cursor:pointer;");
divjuegos.addEventListener("click",mostrarjuegos,true);
divjuegos.innerHTML="<b>Juegos ></b>"
showmenu.appendChild(divjuegos);
//Creacion del div para las opciones
var divopc=document.createElement('div');
divopc.setAttribute("class","link");
divopc.setAttribute("style","cursor:pointer;");
divopc.addEventListener("click",mostraropciones,true);
divopc.innerHTML="<b>Opciones ></b>"
showmenu.appendChild(divopc);
//creacion del div para los ultimos posts visitados
var ult=document.createElement('div');
ult.innerHTML="<hr><b>Ultimos posts visitados</b><br><ul>";
for(x=1;x<11;x++)
{
if(GM_getValue(nick+"-ultimo"+x,"")!="")
{
var retorno=GM_getValue(nick+"-ultimo"+x)
var partes=retorno.split("*");
ult.innerHTML+='<li class="categoriaPost '+partes[2]+'"><a href="'+partes[0]+'" target="_self" title="'+partes[1]+'" alt="'+partes[1]+'" class="">'+(partes[1].length>24?partes[1].substring(0,24)+"...":partes[1])+'</a></li>';
//ult.innerHTML+='<div class="link"><div class="link_titulo"><span class="categoria '+partes[2]+'" title="'+partes[2]+'"></span> <a href="'+partes[0]+'" target="_self" title="'+partes[1]+'" class="box_link">'+(partes[1].length>24?partes[1].substring(0,24)+"...":partes[1])+'</a></div></div>';

}
}
ult.innerHTML+="</ul>";
showmenu.appendChild(ult);
document.body.appendChild(showmenu);
//GM_setValue("cantnotificaciones",7);
}

function cerrarsubmenus()
{
if(iscomm) {document.body.removeChild(showcomm);iscomm=false;}
if(iscommp) {document.body.removeChild(showcommp);iscommp=false;}
if(isgames){document.body.removeChild(showgames); isgames=false;}
if(isopciones){document.body.removeChild(showopciones); isopciones=false;}
}

var showopciones;
var isopciones=false;
function mostraropciones()
{
if(isopciones){document.body.removeChild(showopciones); isopciones=false;}
else {mostraropc();isopciones=true;}
}
var chk1;
var chk2;
function mostraropc()
{
	cerrarsubmenus();
	var checkeado="padding-left:20px;cursor:pointer;background-image:url('http://www.mpo.es/images/pictos/icono_check.gif');background-repeat:no-repeat;";
	var nocheckeado="padding-left:20px;cursor:pointer;";
	showopciones=document.createElement('div');
	showopciones.setAttribute('style','position:fixed;bottom:150px;left:'+(showmenu.offsetWidth+24)+'px;height:200px;background-color:#DDD;border:2px solid #000;padding-left:5px;padding-top:5px;');
	chk1=document.createElement('div');
	chk1.setAttribute('style',GM_getValue(nick+'chkmisposts',true)?checkeado:nocheckeado);
	chk1.addEventListener("click",function(){GM_setValue(nick+'chkmisposts',!GM_getValue(nick+'chkmisposts',true));chk1.setAttribute('style',GM_getValue(nick+'chkmisposts',true)?checkeado:nocheckeado);},true);
	chk1.innerHTML='Notificar comentarios en mis posts';
	chk2=document.createElement('div');
	chk2.setAttribute('style',GM_getValue(nick+'_chkotrosposts',true)?checkeado:nocheckeado);
	chk2.innerHTML='Notificar nuevos comentarios en los posts que comento';
	chk2.addEventListener("click",function(){GM_setValue(nick+"_chkotrosposts",!GM_getValue(nick+"_chkotrosposts",true));chk2.setAttribute('style',GM_getValue(nick+'_chkotrosposts',true)?checkeado:nocheckeado);},true);
	chk3=document.createElement('div');
	chk3.innerHTML='Solo si citan un comentario mio';
	chk3.setAttribute('style',GM_getValue(nick+'_chkotrospostscita',false)?checkeado:nocheckeado);
	chk3.addEventListener("click",function(){GM_setValue(nick+"_chkotrospostscita",!GM_getValue(nick+"_chkotrospostscita",false));chk3.setAttribute('style',GM_getValue(nick+'_chkotrospostscita',true)?checkeado:nocheckeado);},true);
	chk4=document.createElement('div');
	chk4.setAttribute('style',GM_getValue(nick+'_autohide',false)?checkeado:nocheckeado);
	chk4.innerHTML='auto-ocultar la barra';
	chk4.addEventListener("click",function(){GM_setValue(nick+"_autohide",!GM_getValue(nick+"_autohide",true));chk4.setAttribute('style',GM_getValue(nick+'_autohide',true)?checkeado:nocheckeado);autohide=GM_getValue(nick+"_autohide",true);},true);
	showopciones.appendChild(chk1);
	showopciones.appendChild(chk2);
	showopciones.appendChild(chk3);
	showopciones.appendChild(chk4);
	document.body.appendChild(showopciones);
	
}

var showgames;
var isgames=false;
function mostrarjuegos()
{
if(isgames) {document.body.removeChild(showgames); isgames=false;}
else{ mostrargames(); isgames=true;}
}

function mostrargames()
{
cerrarsubmenus();
showgames=document.createElement('div');
showgames.setAttribute('style','position:fixed;bottom:150px;left:'+(showmenu.offsetWidth+24)+'px;height:230px;width:200px;background-color:#DDD;border:1px solid #000;padding-left:5px;padding-top:5px;');
showgames.innerHTML='<h2>Juegos:</h2><script text="javascript">function open_juego (pag) { var opciones="toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=740, height=580";    window.open(pag,"juego",opciones);}</script>';
showgames.innerHTML+='<img src="http://i.t.net.ar/images/icon-salon.gif" height="20"><b>Truco multiplayer: </b><a href="javascript:open_juego(\'http://www.taringa.net/juegos/truco/juego.php?salon=0\')">1</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/truco/juego.php?salon=1\')">2</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/truco/juego.php?salon=2\')">3</a><br>';
showgames.innerHTML+='<img src="http://i.t.net.ar/images/icon-damas.gif" height="20"><b>Damas: </b><a href="javascript:open_juego(\'http://www.taringa.net/juegos/damas/juego.php?salon=0\')">1</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/damas/juego.php?salon=1\')">2</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/damas/juego.php?salon=2\')">3</a><br>';
showgames.innerHTML+='<img src="http://i.t.net.ar/images/icon-ajedrez.gif" height="20"><b>Ajedrez: </b><a href="javascript:open_juego(\'http://www.taringa.net/juegos/ajedrez/juego.php?salon=0\')">1</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/ajedrez/juego.php?salon=1\')">2</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/ajedrez/juego.php?salon=2\')">3</a><br>';
showgames.innerHTML+='<img src="http://i.t.net.ar/images/icon-bichitos.png" height="20"><b>Bichitos: </b><a href="javascript:open_juego(\'http://www.taringa.net/juegos/bichitos/juego.php?salon=0\')">1</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/bichitos/juego.php?salon=1\')">2</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/bichitos/juego.php?salon=2\')">3</a><br>';
showgames.innerHTML+='<img src="http://i.t.net.ar/images/pokericon.jpg" height="20"><b>Poker Texas Hold\'em: </b><a href="javascript:open_juego(\'http://www.taringa.net/juegos/poker/juego.php?salon=0\')">1</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/poker/juego.php?salon=1\')">2</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/poker/juego.php?salon=2\')">3</a><br>';
showgames.innerHTML+='<img src="http://i.t.net.ar/images/icon-ttris.jpg" height="20"><b>T!tris: </b><a href="javascript:open_juego(\'http://www.taringa.net/juegos/xt/juego.php?salon=0\')">1</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/xt/juego.php?salon=1\')">2</a>-<a href="javascript:open_juego(\'http://www.taringa.net/juegos/xt/juego.php?salon=2\')">3</a>';
document.body.appendChild(showgames);
}

function open_juego (pag) {
    var opciones="toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=740, height=580";
    window.open(pag,"juego",opciones);
}

var showcommp;
var iscommp=false;
function mostrarcomentsp()
{
if(iscommp) {document.body.removeChild(showcommp); iscommp=false;}
else{ mostrarcommp(); iscommp=true;}
}

function mostrarcommp()
{
cerrarsubmenus();
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://'+pagina+'/api/809721c9a576be73fd682e9280a322c6/xml/Users-GetPostsComments/'+nick,
  headers: {
    "User-Agent": navigator.userAgent,            // Recommend using navigator.userAgent when possible
    "Accept": "text/xml"
  },
  onload: function(response) {
    // Inject responseXML into existing Object if not present
	if (!response.responseXML)
      h = new DOMParser().parseFromString(response.responseText, "text/xml");
                                        showcommp=document.createElement('div');
                                        showcommp.setAttribute('style','position:fixed;bottom:50px;left:'+(showmenu.offsetWidth+24)+'px;background-color:#DDD;border:1px solid #000;padding-left:5px;padding-top:0px;padding-right:5px;');
										var url=h.getElementsByTagName('url');
										showcommp.innerHTML="<h2><b>Ultimos comentarios de "+nick+"</b></h2>";
										for(x=0;x<20;x++)
										{
										showcommp.innerHTML+='<a href="'+url[x].firstChild.nodeValue+'">'+getNombre(url[x].firstChild.nodeValue).substring(0,40)+'</a><br>';
										}
                                        document.body.appendChild(showcommp);
                                 }
			});
}

function obtenerultimosposts()
{
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://'+pagina+'/api/809721c9a576be73fd682e9280a322c6/xml/Users-GetPostsList/'+nick,
  headers: {
    "User-Agent": navigator.userAgent,            // Recommend using navigator.userAgent when possible
    "Accept": "text/xml"
  },
  onload: function(response) {
    // Inject responseXML into existing Object if not present
	if (!response.responseXML)
      h = new DOMParser().parseFromString(response.responseText, "text/xml");
                                        var pid=h.getElementsByTagName('post-id');
                                        if(pid[0].firstChild.nodeValue!=GM_getValue(nick+"_posts_0","***").split("*")[0])
                                        {
                                          var titulo=h.getElementsByTagName('title');
                                          var url=h.getElementsByTagName('url');
					  for(x=0;x<10&&x<pid.length;x++)
					  {
                                          guardarcomentariosinicial(pid[x].firstChild.nodeValue,titulo[x].firstChild.nodeValue,url[x].firstChild.nodeValue,x);
                                          //GM_setValue(nick+"_posts_"+x,pid[x].firstChild.nodeValue+"*"+titulo[x].firstChild.nodeValue+"*"+url[x].firstChild.nodeValue);
					  }
                                        }                                        
                                        
                                 }
			});
}

function guardarcomentariosinicial(id,titulo,url,pos)
{
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://'+pagina+'/api/809721c9a576be73fd682e9280a322c6/xml/Posts-GetPostComments/'+id,
  headers: {
    "User-Agent": navigator.userAgent,            // Recommend using navigator.userAgent when possible
    "Accept": "text/xml"
  },
  onload: function(response) {
    // Inject responseXML into existing Object if not present
	if (!response.responseXML)
      h = new DOMParser().parseFromString(response.responseText, "text/xml");
                                        var cant=h.getElementsByTagName('comment-id').length;
                                        GM_setValue(nick+"_posts_"+pos,id+"*"+titulo+"*"+url+"*"+cant);
					
                                        
                                 }
			});
}

function getNombre(cadena)
{
    var titulo=cadena.split("/");
    titulo=titulo[6].split(".html");
    titulo=titulo[0].replace(/-/g," ");
    titulo=titulo.replace(/_/g,".");

return titulo;
}

var showcomm;
var iscomm=false;
function mostrarcoments()
{
if(iscomm) {document.body.removeChild(showcomm); iscomm=false;}
else{ mostrarcomm(); iscomm=true;}
}

function mostrarcomm()
{
cerrarsubmenus();
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://'+pagina+'/ultimos_comentarios.php',
  headers: {
    "User-Agent": navigator.userAgent,            // Recommend using navigator.userAgent when possible
    "Accept": "text/xml"
  },
  onload: function(response) {
    // Inject responseXML into existing Object if not present

      h = response.responseText;
                                        showcomm=document.createElement('div');
                                        showcomm.setAttribute('style','position:fixed;bottom:60px;left:'+(showmenu.offsetWidth+24)+'px;width:350px;background-color:#DDD;border:1px solid #000;padding-left:5px;padding-top:0px;');
                                        showcomm.innerHTML="<h2><b>Ultimos comentarios de Taringa!</b></h2>"+h;
                                        document.body.appendChild(showcomm);
                                 }
			});
}

var shownotif;
var isnotif=false;
function clicknotif()
{
if(isnotif) {document.body.removeChild(shownotif); isnotif=false;}
else{ isnotif=true; mostrarNotificaciones(); }
}

function mostrarNotificaciones()
{
if(haynotif){divnotif.removeChild(nots); haynotif=false; GM_setValue(nick+"_cantnotificaciones",0);}
if(GM_getValue(nick+"_text_notificaciones","")=="") isnotif=false;
else{
shownotif=document.createElement('div');
shownotif.setAttribute("style",'position:fixed;bottom:30px;background-image:url(\'http://i.t.net.ar/images/bg-box-gris.gif\');right:24px;max-height:400px;width:200px;background-color:#DDD;border:1px solid #000;padding-left:5px;padding-top:5px;overflow:auto;');
var textonotif=GM_getValue(nick+"_text_notificaciones","").split("*");
for(x=textonotif.length-1;x>=0;x--)
shownotif.innerHTML+=textonotif[x]+"<hr>";
document.body.appendChild(shownotif);
}
//checkcomments(getpostId(),10);
}

function addUltimosPosts(nombre,url,categoria)
{
var repetido=0;
for(x=1;x<11;x++)
{
if(url==GM_getValue(nick+"-ultimo"+x,"a*b*c").split("*")[0]) repetido=x;
}
if(repetido==0)
{
  GM_setValue(nick+"-ultimo10",GM_getValue(nick+"-ultimo9",""));
  GM_setValue(nick+"-ultimo9",GM_getValue(nick+"-ultimo8",""));
  GM_setValue(nick+"-ultimo8",GM_getValue(nick+"-ultimo7",""));
  GM_setValue(nick+"-ultimo7",GM_getValue(nick+"-ultimo6",""));
  GM_setValue(nick+"-ultimo6",GM_getValue(nick+"-ultimo5",""));
  GM_setValue(nick+"-ultimo5",GM_getValue(nick+"-ultimo4",""));
  GM_setValue(nick+"-ultimo4",GM_getValue(nick+"-ultimo3",""));
  GM_setValue(nick+"-ultimo3",GM_getValue(nick+"-ultimo2",""));
  GM_setValue(nick+"-ultimo2",GM_getValue(nick+"-ultimo1",""));
  GM_setValue(nick+"-ultimo1",url+"*"+nombre+"*"+categoria);
}
else{
     for(x=repetido;x>0;x--)
     {
       GM_setValue(nick+"-ultimo"+x,GM_getValue(nick+"-ultimo"+(x-1),""));
     }
       GM_setValue(nick+"-ultimo1",url+"*"+nombre+"*"+categoria);
    }
}

var nots;
function notificar(num)
{
if(num!=0)
{
if(haynotif){divnotif.removeChild(nots); haynotif=false;}
nots=document.createElement('div');
nots.setAttribute('style','background-image:url(\'http://i38.tinypic.com/1zc0ksz.jpg\');background-repeat:no-repeat;color:#ffffff;font-size:9px;height:19px:padding:1px 0 0;position:absolute;right:0;top:0;width:17px;');
nots.removeEventListener("mouseover",sobre_menu,false);
nots.innerHTML="<strong>"+num+"</strong>";
haynotif=true;
divnotif.appendChild(nots);
}
else{if(haynotif){divnotif.removeChild(nots); haynotif=false;}}
}



//retorna booleano indicando si el parametro solo contiene numeros
function IsNumeric(sText)
{
   var ValidChars = "0123456789";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
   
}

function getpostId()
{
url = document.location.href;
partes = url.split('/');
return(IsNumeric(partes[4])?partes[4]:partes[5])
}

function getpostTitulo()
{
var spanes=document.getElementsByTagName("meta");
for(x=0;x<spanes.length;x++)
if(spanes[x].getAttribute("name")=="title") return(spanes[x].getAttribute("content"));
return("titulo");
}

function getCategoria()
{
var txt=document.body.innerHTML.substring(document.body.innerHTML.indexOf("&kw_categoria")+14);
txt=txt.substring(0,txt.indexOf("&"));
return txt;
}

var divfunciones;
function getFunciones()
{
var favoritos;
var denunciar;
var enlaces;
var divs=document.getElementsByTagName("div");
for(x=0;x<divs.length;x++)
 if(divs[x].getAttribute("class")=="post-acciones")
	enlaces=divs[x].getElementsByTagName('a');

//var enlaces=document.getElementById("span_opciones2").getElementsByTagName('a');
for(x=0;x<enlaces.length;x++)
{
if(enlaces[x].getAttribute("class")=="icons icons agregar_favoritos") favoritos=enlaces[x].cloneNode(true);
if(enlaces[x].getAttribute("class")=="icons denunciar_post") denunciar=enlaces[x].cloneNode(true);
}
favoritos.innerHTML="<img src='http://www.lea87crzz.unlugar.com/barrat/fav.PNG'>";
favoritos.setAttribute("title","Agregar a favoritos");
favoritos.setAttribute("class","");
favoritos.addEventListener("click",add_fav,true);

denunciar.innerHTML="<img src='http://www.lea87crzz.unlugar.com/barrat/den.PNG'>";
denunciar.setAttribute("title","Denunciar post");
denunciar.setAttribute("class","");

var puntos=document.createElement('span');
puntos.setAttribute("style","padding:0px;margin:0px;cursor:pointer");
puntos.innerHTML=" Puntos";
puntos.addEventListener("click",clickpuntos,true);

divfunciones=document.createElement('div');
divfunciones.setAttribute('style','width:100px;color:black;height: 22px;border-right:1px solid #000;border-right:1px solid #000;padding-left:20px;padding-top:8px;position:absolute;top:0px;left:'+(divuser.offsetWidth+90)+'px;padding-left:10px;pading-top:3px;');
divfunciones.innerHTML=" ";
divfunciones.appendChild(favoritos);
divfunciones.innerHTML+=" ";
divfunciones.appendChild(denunciar);
divfunciones.innerHTML+=" ";
divfunciones.appendChild(puntos);



barra.appendChild(divfunciones);
}

var ispuntos=false;
var showpuntos;
function clickpuntos()
{
if(ispuntos){ispuntos=false;eliminarpuntos();}
else{ispuntos=true;crearpuntos();}
}

function crearpuntos()
{
showpuntos=document.createElement('div');
showpuntos.setAttribute('style','position:fixed;bottom:30px;left:250px;height:20px;width:300px;background-color:#DDD;border:1px solid #000;padding-left:5px;text-align:center;');
var viejospan=document.getElementById("span_opciones1");
viejospan.setAttribute("id","viejospan1");
showpuntos.setAttribute("id","span_opciones1");
showpuntos.innerHTML=viejospan.innerHTML;
document.body.appendChild(showpuntos);
}

function eliminarpuntos()
{
document.body.removeChild(showpuntos);
document.getElementById("viejospan1").setAttribute("id","span_opciones1");
}

function add_fav()
{
var viejofav=document.getElementById("span_opciones2");
viejofav.setAttribute("id","viejofav");
divfunciones.setAttribute("id","span_opciones2");

}



function checkcomments(propio,id,titulo,cant,pos)
{
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://'+pagina+'/api/809721c9a576be73fd682e9280a322c6/xml/Posts-GetPostComments/'+id,
  headers: {
    "User-Agent": navigator.userAgent,            // Recommend using navigator.userAgent when possible
    "Accept": "text/xml"
  },
  onload: function(response) {
    // Inject responseXML into existing Object if not present
	if (!response.responseXML)
      h = new DOMParser().parseFromString(response.responseText, "text/xml");
                                        var err=h.getElementsByTagName("error");
                                        if(err.length>0){
                                        var error=err[0].firstChild.nodeValue;
                                        if(error=="9") { notificarEliminado(propio, titulo);GM_setValue(nick+"_posts"+(propio==0?"a":"")+"_"+pos,"0**");}
                                        }
                                        else{
                                        var cid=h.getElementsByTagName('comment-id');
                                        var nicks=h.getElementsByTagName('nick');
					var textos=h.getElementsByTagName('comment');
                                        if(cid.length>cant)
                                           {
                                             var pstsplit;
                                             if(propio=="1"){
                                                	pstsplit=GM_getValue(nick+"_posts_"+pos).split("*");
							GM_setValue(nick+"_posts_"+pos,pstsplit[0]+"*"+pstsplit[1]+"*"+pstsplit[2]+"*"+cid.length);
                                             	}
                                             else{
                                             	pstsplit=GM_getValue(nick+"_postsa_"+pos).split("*");
						GM_setValue(nick+"_postsa_"+pos,pstsplit[0]+"*"+pstsplit[1]+"*"+pstsplit[2]+"*"+cid.length);
                                             
						}
                                             for(x=cant;x<cid.length;x++)
						{
							if(propio)notificarComentario(propio,id,titulo,nicks[x].firstChild.nodeValue);
							else{
							if((GM_getValue(nick+'_chkotrospostscita',false))&&(textos[x].firstChild.nodeValue.indexOf('quote='+nick)>0)) notificarcitado(id,titulo,nicks[x].firstChild.nodeValue);
							else{
							if(GM_getValue(nick+'_chkotrospostscita',false)) GM_log('no te citaron en '+id);
                                             		if(!(GM_getValue(nick+'_chkotrospostscita',false))) notificarComentario(propio,id,titulo,nicks[x].firstChild.nodeValue);}}
						}
                                           }
                                         if((cid.length<cant)&&(cid.length>0))
                                           {
                                             var pstsplit=GM_getValue(nick+"_posts"+(propio==0?"a":"")+"_"+pos).split("*");
                                             GM_setValue(nick+"_posts"+(propio==0?"a":"")+"_"+pos,pstsplit[0]+"*"+pstsplit[1]+"*"+pstsplit[2]+"*"+cid.length);
                                             
                                           }
                                        
                                        }
                                 }
			});

}

function notificarEliminado(propio,titulo)
{
var texto="";
if(propio=="1")
texto='Tu post <b>'+titulo+'</b> ha sido eliminado.';
else
texto='El post que sigues, <b>'+titulo+'</b>, ha sido eliminado.'
if(GM_getValue(nick+"_cantnotificaciones",0)==0) GM_setValue(nick+"_text_notificaciones",texto)
else GM_setValue("_text_notificaciones",GM_getValue(nick+"_text_notificaciones","")+"*"+texto)
GM_setValue(nick+"cantnotificaciones",GM_getValue(nick+"_cantnotificaciones",0)+1);
}

function notificarComentario(propio,id,titulo,user)
{
	if(user!=nick)
	{
		var texto="";
		if(propio=="1")
			texto='<a href="/perfil/'+user+'">'+user+'</a> ha hecho un comentario en tu post <a href="/posts/'+id+'">'+titulo+'</a>';
		else
			texto='<a href="/perfil/'+user+'">'+user+'</a> Tambien ha comentado en <a href="/posts/'+id+'">'+titulo+'</a>';
		if(GM_getValue(nick+"_cantnotificaciones",0)==0) GM_setValue(nick+"_text_notificaciones",texto);
		else GM_setValue(nick+"_text_notificaciones",GM_getValue(nick+"_text_notificaciones","")+"*"+texto);
		GM_setValue(nick+"_cantnotificaciones",GM_getValue(nick+"_cantnotificaciones",0)+1);
	}
}

function notificarcitado(id,titulo,user){
	var texto='<a href="/perfil/'+user+'">'+user+'</a> ha citado tu comentario en <a href="/posts/'+id+'">'+titulo+'</a>';
		if(GM_getValue(nick+"_cantnotificaciones",0)==0) GM_setValue(nick+"_text_notificaciones",texto);
		else GM_setValue(nick+"_text_notificaciones",GM_getValue(nick+"_text_notificaciones","")+"*"+texto);
		GM_setValue(nick+"_cantnotificaciones",GM_getValue(nick+"_cantnotificaciones",0)+1);	
}

function getCantNotificaciones()
{
var cant=GM_getValue(nick+"_cantnotificaciones",0)
notificar(cant);
}

function checkearNotificaciones()
{
   var num=GM_getValue(nick+"_checkn",0);
   if(num>20){num=0;GM_setValue(nick+"_checkn",0);}
   else{GM_setValue(nick+"_checkn",num+1);}
   if(num<10&&!GM_getValue(nick+'chkmisposts',true)) GM_setValue(nick+"_checkn",10);
   else{
   if(num>9&&!GM_getValue(nick+'_chkotrosposts',true)) GM_setValue(nick+"_checkn",0);
   else{
   
   var postacheckear;
   var propio;
   if(num<10){postacheckear=GM_getValue(nick+"_posts_"+num,"***");propio="1";}
   else {postacheckear=GM_getValue(nick+"_postsa_"+(num-10),"***");propio="0";}
   postsplit=postacheckear.split("*");
   if(postsplit[0]==""){GM_log("No esta "+num);if(num<10)GM_setValue(nick+"_checkn",10);else GM_setValue(nick+"_checkn",0); }
   else{
		if((postsplit[0]!="")&&(postsplit[0]!="0"))
		checkcomments(propio,postsplit[0],postsplit[1],postsplit[3],(num<10?num:(num-10)));
	}
   }
   }
}


///aca va todo el codigo q se ejecuta cuando entramos en un post
if(path=="post")
{
if(document.body.innerHTML.indexOf("box_txt show_error")<0)
 {
   var id=getpostId();
   var titulo=getpostTitulo();
   var categoria=getCategoria();
   addUltimosPosts(titulo,"http://www.taringa.net/posts/"+id,categoria)
   if(nick!=undefined) getFunciones();
   
   var inputs=document.getElementsByTagName("input");
   var boton;
   for(x=0;x<inputs.length;x++)
   {
	if(inputs[x].getAttribute("value")=="Enviar Comentario");
		boton=inputs[x];
   }
   boton.addEventListener("click",agregacomentario,false);
   
 }
}

function agregacomentario()
{
   var id=getpostId();
   var titulo=getpostTitulo();
   var esta=-1;
   for(x=0;x<10;x++){
   var ids=GM_getValue(nick+"_postsa_"+x,"***").split("*")[0];
   if((ids!="")&&(ids==id)) esta=x;
   }
   var mio=false;
   for(x=0;x<10;x++){
   var ids=GM_getValue(nick+"_posts_"+x,"***").split("*")[0];
   if((ids!="")&&(ids==id)) mio=true;
}
   if(!mio){
   if(esta==-1)
   {
    for(x=9;x>0;x--)
    GM_setValue(nick+"_postsa_"+x,GM_getValue(nick+"_postsa_"+(x-1),""))
    guardarcomentariosinicialajeno(id,titulo,url,0);
   }
    else {
	for(x=esta;x>esta;x--)
        GM_setValue(nick+"_postsa_"+x,GM_getValue(nick+"_postsa_"+(x-1),""))
        guardarcomentariosinicialajeno(id,titulo,url,0);
	}
  }
   
}

function guardarcomentariosinicialajeno(id,titulo,url,pos)
{
GM_xmlhttpRequest({
  method: "GET",
  url: 'http://'+pagina+'/api/809721c9a576be73fd682e9280a322c6/xml/Posts-GetPostComments/'+id,
  headers: {
    "User-Agent": navigator.userAgent,            // Recommend using navigator.userAgent when possible
    "Accept": "text/xml"
  },
  onload: function(response) {
    // Inject responseXML into existing Object if not present
	if (!response.responseXML)
      h = new DOMParser().parseFromString(response.responseText, "text/xml");
                                        var errores=h.getElementsByTagName('error').length;
										if(errores==0)
										{
											var cant=h.getElementsByTagName('comment-id').length;
											GM_setValue(nick+"_postsa_"+pos,id+"*"+titulo+"*"+url+"*"+cant);
										}
                                        
                                 }
			});
}
//cierra el codigo q se ejecuta cuando entramos en un post

if(path=="principal")
{
obtenerultimosposts();
var intcheck=setInterval(checkearNotificaciones,3000);
}
//alert(GM_getValue(nick+"_posts_1"));
var intervalo=setInterval(getCantNotificaciones,3500);


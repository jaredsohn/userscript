{\rtf1\ansi\ansicpg1252\deff0\deflang3082{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           BBCodes para Taringa\par
// @namespace      SharkaleBBCODER\par
// @description    BBCoder para T! (Crear post, comentarios, men\'c3\'ba)\par
// @include        http://*taringa.net/*\par
// @exclude        http://br.taringa.net/*\par
// @version        25.0\par
// @copyright      Copyright (c) 2009, Sharkale\par
// @creator        Sharkale (Alejandro Barreiro) \'c2\'ae 2009\par
// ==/UserScript==\par
\par
// **COPYRIGHT NOTICE**\par
//\par
//    "BBCoder en Comentarios para T! y P!" Copyright (C) 2008-2009 Alejandro Barreiro\par
//\par
//    This program is free software: you can redistribute it and/or modify\par
//    it under the terms of the GNU General Public License as published by\par
//    the Free Software Foundation, either version 3 of the License, or\par
//    (at your option) any later version.\par
//\par
//    This program is distributed in the hope that it will be useful,\par
//    but WITHOUT ANY WARRANTY; without even the implied warranty of\par
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\par
//    GNU General Public License for more details.\par
//\par
//    You should have received a copy of the GNU General Public License\par
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.\par
//\par
// **END COPYRIGHT NOTICE**\par
\par
// ==Variables==\par
var ultversion = '25.0';\par
var postscript = 'http://www.taringa.net/posts/taringa/3307710/'\par
//var urlscript = 'http://radio.sharkale.com.ar/descargas/';\par
var urlscript2 = 'http://radio.proyectod.com.ar/descargas/';\par
var URL = 'http://i268.photobucket.com/albums/jj27/sharkale/taringa/';\par
var Dom = location.hostname;\par
var tarLang = new Array();\par
var nuevosemot = 0;\par
var emot_Orig = ':),http://i.t.net.ar/images/smiles/smile.gif,X(,http://i.t.net.ar/images/smiles/angry.gif,:cool:,http://i.t.net.ar/images/smiles/cool.gif,:cry:,http://i.t.net.ar/images/smiles/crying.gif,8|,http://i5.tinypic.com/6jbffgn.gif,:blaf:,http://i.t.net.ar/images/smiles/blaf.gif,:winky:,http://i.t.net.ar/images/smiles/winky.gif,:noo:,http://i.t.net.ar/images/smiles/sad2.gif,:twisted:,http://i.t.net.ar/images/smiles/evil.gif,^^,http://i.t.net.ar/images/smiles/grn.gif,:|,http://i.t.net.ar/images/smiles/huh.gif,:D,http://i.t.net.ar/images/smiles/laughing.gif,:oops:,http://i.t.net.ar/images/smiles/red.gif,:?,http://i.t.net.ar/images/smiles/s.gif,:F,http://i.t.net.ar/images/smiles/drool.gif,:(,http://i.t.net.ar/images/smiles/sad.gif,:P,http://i.t.net.ar/images/smiles/tongue.gif,:roll:,http://i.t.net.ar/images/smiles/wassat.gif,;),http://i.t.net.ar/images/smiles/wink.gif,:bobo:,http://i.t.net.ar/images/smiles/bobo.gif,:grin:,http://i.t.net.ar/images/smiles/grin.gif,:8S:,http://i.t.net.ar/images/smiles/8s.gif,:],http://i.t.net.ar/images/smiles/5.gif,:metal:,http://i.t.net.ar/images/smiles/metal.gif,:crying:,http://i.t.net.ar/images/smiles/cry.gif,:shrug:,http://i.t.net.ar/images/smiles/shrug.gif,:blind:,http://i.t.net.ar/images/smiles/15.gif,:buaa:,http://i.t.net.ar/images/smiles/17.gif,:cold:,http://i.t.net.ar/images/smiles/cold.gif,:hot:,http://i.t.net.ar/images/smiles/hot.gif,:love:,http://i.t.net.ar/images/smiles/love.gif,:globo:,http://i.t.net.ar/images/smiles/globo.gif,:zombie:,http://i.t.net.ar/images/smiles/zombie.gif,:man:,http://i.t.net.ar/images/smiles/pacman.gif,:mario:,http://i.t.net.ar/images/smiles/mario.gif,:oo:,http://i.t.net.ar/images/smiles/papel.gif,:RIP:,http://i.t.net.ar/images/smiles/rip.gif,:alien:,http://i.t.net.ar/images/smiles/koe.gif,:trago:,http://i.t.net.ar/images/smiles/106.gif,:money:,http://i.t.net.ar/images/smiles/dolar.gif,:verde:,http://i.t.net.ar/images/smiles/verde.gif,:culo:,http://i.t.net.ar/images/smiles/culo.gif,:auto:,http://i.t.net.ar/images/smiles/car.gif,:lala:,http://i.t.net.ar/images/smiles/mobe.gif,:fantasma:,http://i.t.net.ar/images/smiles/fantasma.gif,:alaba:,http://i.t.net.ar/images/smiles/alabama.gif,:lpmqtp:,http://i.t.net.ar/images/smiles/lpmqtp.gif,:idiot:,http://i.t.net.ar/images/smiles/idiot.gif,:buenpost:,http://i.t.net.ar/images/smiles/buenpost.gif,:GET A LIFE:,http://i.t.net.ar/images/smiles/getalife.gif,:headbang:,http://i.t.net.ar/images/smiles/bang.gif,[img=http://i44.tinypic.com/2ibm49f.jpg],http://i44.tinypic.com/2ibm49f.jpg,[img=http://i41.tinypic.com/1zxldoo.jpg],http://i41.tinypic.com/1zxldoo.jpg,[img=http://i41.tinypic.com/t85bbr.jpg],http://i41.tinypic.com/t85bbr.jpg,[img=http://i41.tinypic.com/8vptv4.jpg],http://i41.tinypic.com/8vptv4.jpg,[img=http://i44.tinypic.com/dnj33a.jpg],http://i44.tinypic.com/dnj33a.jpg,[img=http://i44.tinypic.com/2klo43.jpg],http://i44.tinypic.com/2klo43.jpg,[img=http://i44.tinypic.com/2d176mh.jpg],http://i44.tinypic.com/2d176mh.jpg,[img=http://i39.tinypic.com/nd1udw.jpg],http://i39.tinypic.com/nd1udw.jpg,[img=http://i41.tinypic.com/2uzfnsz.jpg],http://i41.tinypic.com/2uzfnsz.jpg,[img=http://i42.tinypic.com/dq12k9.jpg],http://i42.tinypic.com/dq12k9.jpg,[img=http://i42.tinypic.com/104gkxt.jpg],http://i42.tinypic.com/104gkxt.jpg,[img=http://i44.tinypic.com/2itlxdu.jpg],http://i44.tinypic.com/2itlxdu.jpg,[img=http://i42.tinypic.com/ogx9uc.jpg],http://i42.tinypic.com/ogx9uc.jpg,[img=http://i39.tinypic.com/so07wl.jpg],http://i39.tinypic.com/so07wl.jpg,[img=http://i44.tinypic.com/xelg7l.jpg],http://i44.tinypic.com/xelg7l.jpg,[img=http://i39.tinypic.com/2lsh56q.jpg],http://i39.tinypic.com/2lsh56q.jpg,[img=http://i42.tinypic.com/23mrbih.jpg],http://i42.tinypic.com/23mrbih.jpg,[img=http://i43.tinypic.com/mc69g5.jpg],http://i43.tinypic.com/mc69g5.jpg,[img=http://i44.tinypic.com/j0wsd3.jpg],http://i44.tinypic.com/j0wsd3.jpg,[img=http://i41.tinypic.com/2hzlnd2.jpg],http://i41.tinypic.com/2hzlnd2.jpg,[img=http://i39.tinypic.com/jim8oy.jpg],http://i39.tinypic.com/jim8oy.jpg,[img=http://i44.tinypic.com/i5axr6.jpg],http://i44.tinypic.com/i5axr6.jpg,[img=http://i39.tinypic.com/2rfx9ib.jpg],http://i39.tinypic.com/2rfx9ib.jpg,[img=http://i41.tinypic.com/2myrk0n.jpg],http://i41.tinypic.com/2myrk0n.jpg,[img=http://i39.tinypic.com/14jroco.jpg],http://i39.tinypic.com/14jroco.jpg,[img=http://i39.tinypic.com/11w7mgg.jpg],http://i39.tinypic.com/11w7mgg.jpg,[img=http://i41.tinypic.com/1692eq1.jpg],http://i41.tinypic.com/1692eq1.jpg,[img=http://i39.tinypic.com/20u98qt.jpg],http://i39.tinypic.com/20u98qt.jpg,[img=http://i41.tinypic.com/34947cn.jpg],http://i41.tinypic.com/34947cn.jpg,[img=http://i43.tinypic.com/2przb7c.jpg],http://i43.tinypic.com/2przb7c.jpg,[img=http://i42.tinypic.com/27xnxv4.jpg],http://i42.tinypic.com/27xnxv4.jpg,[img=http://i44.tinypic.com/nvzbti.gif],http://i44.tinypic.com/nvzbti.gif,[img=http://s5.tinypic.com/ra2j9f.gif],http://s5.tinypic.com/ra2j9f.gif,[img=http://s5.tinypic.com/2626wrt.gif],http://s5.tinypic.com/2626wrt.gif,[img=http://s5.tinypic.com/2z5q0c8.gif],http://s5.tinypic.com/2z5q0c8.gif,[img=http://s5.tinypic.com/2uhl7xk.gif],http://s5.tinypic.com/2uhl7xk.gif,[img=http://s5.tinypic.com/2vn3w2b.gif],http://s5.tinypic.com/2vn3w2b.gif,[img=http://i39.tinypic.com/14akew0.jpg],http://i39.tinypic.com/14akew0.jpg';\par
var BarraCateg = new Array ();\par
BarraCateg["-1"] = \tab "";\par
BarraCateg["7"] = \tab "animaciones";\par
BarraCateg["18"] = \tab "apuntes-y-monografias";\par
BarraCateg["4"] = \tab "arte";\par
BarraCateg["25"] = \tab "autos-motos";\par
BarraCateg["17"] = \tab "celulares";\par
BarraCateg["19"] = \tab "comics";\par
BarraCateg["16"] = \tab "deportes";\par
BarraCateg["9"] = \tab "downloads";\par
BarraCateg["23"] = \tab "ebooks-tutoriales";\par
BarraCateg["29"] = \tab "economia-negocios";\par
BarraCateg["24"] = \tab "femme";\par
BarraCateg["26"] = \tab "humor";\par
BarraCateg["1"] = \tab "imagenes";\par
BarraCateg["12"] = \tab "info";\par
BarraCateg["0"] = \tab "juegos";\par
BarraCateg["2"] = \tab "links";\par
BarraCateg["15"] = \tab "linux";\par
BarraCateg["22"] = \tab "mac";\par
BarraCateg["32"] = \tab "manga-anime";\par
BarraCateg["30"] = \tab "mascotas";\par
BarraCateg["8"] = \tab "musica";\par
BarraCateg["10"] = \tab "noticias";\par
BarraCateg["5"] = \tab "offtopic";\par
BarraCateg["21"] = \tab "recetas-y-cocina";\par
BarraCateg["27"] = \tab "salud-bienestar";\par
BarraCateg["20"] = \tab "solidaridad";\par
BarraCateg["28"] = \tab "taringa";\par
BarraCateg["31"] = \tab "turismo";\par
BarraCateg["13"] = \tab "tv-peliculas-series";\par
BarraCateg["3"] = \tab "videos";\par
// ==/Variables==\par
\par
// ==Variables de Lenguaje==\par
// Espa\'c3\'b1ol\par
tarLang = new Array();\par
tarLang["BarraBBC"] = new Array ("Alineaci\'c3\'b3n Izquierda", "Alineaci\'c3\'b3n Centrada", "Alineaci\'c3\'b3n Derecha", "Letra Negrita", "Letra Cursiva", "Letra Subrayada","Fuente", "Insertar Video de YouTube", "Insertar Video de Google", "Insertar Video de MegaVideo", "Insertar canci\'c3\'b3n de GoEar", "Insertar canci\'c3\'b3n de eSnips", "Insertar archivo SWF", "Insertar Im\'c3\'a1gen", "Insertar Im\'c3\'a1gen clickeable", "Insertar URL", "Agregar BBCode a todas las URL escritas", "Insertar una Cita", "Ver Preview del Comentario");\par
tarLang["BarraBBC"]["color"] = new Array ("Color", "Bordo", "Rojo", "Naranja", "Marr\'c3\'b3n", "Amarillo", "Verde", "Oliva", "Cyan", "Azul", "Azul Oscuro", "Indigo", "Violeta", "Negro");\par
tarLang["Preview"] = new Array ("Debes escribir algo para realizar la previsualizaci\'c3\'b3n", "CARGANDO...", "Cargando preview", "Cerrar Previsualizaci\'c3\'b3n", "Previsualizaci\'c3\'b3n", "Hubo un error al previsualizar, Por favor intente nuevamente.","Cargando preview del post. Por favor espere.");\par
tarLang["Promt"] = new Array ("Ingrese la direcci\'c3\'b3n del video de YouTube:", "Direcci\'c3\'b3n del video inv\'c3\'a1lida", "Si el video posee alta defici\'c3\'b3n acepte esta ventana.\\n\\nDe lo contrario cancelela o no se ver\'c3\'a1 el video.", "Ingrese la direcci\'c3\'b3n del video de Google:", "Ingrese el c\'c3\'b3digo entero que provee la p\'c3\'a1gina a trav\'c3\'a9s del link \\"Video Incrustado\\" en cada video de MegaVideo:", "Ingrese la direcci\'c3\'b3n URL \'c3\'b3 el c\'c3\'b3digo HTML \'c3\'b3 la ID de la canci\'c3\'b3n deseada de GoEar:", "Direcci\'c3\'b3n de la m\'c3\'basica inv\'c3\'a1lida", "Ingrese la direcci\'c3\'b3n \\"URL\\" de la canci\'c3\'b3n proporcionada por eSnips:\\n\\nEjemplo:\\nhttp://www.esnips.com/doc/01f6cd69-e218-4faa-8f1c-1e5cc0cc4111/Rodrigo - La Mano De Dios", "Ingrese la direcci\'c3\'b3n URL del archivo SWF", "Ingrese el texto a citar", "Ingrese la direcci\'c3\'b3n URL completa de la im\'c3\'a1gen", "Ingrese la direcci\'c3\'b3n URL completa del link", "Ingrese la URL que desea postear", "\'c2\'bfDesea agregarle una etiqueta a la URL?");\par
// ==/Variables de Lenguaje==\par
\par
var pathArray = window.location.pathname.split('/');\par
var path = '';\par
if(pathArray[1].indexOf('edicion.form') != -1) path = 'edicion';\par
switch(pathArray[1])\{\par
\tab case 'agregar':\par
\tab\tab path = 'edicion';\par
\tab\tab break;\par
\tab case 'posts':\par
\tab\tab path = 'post';\par
\tab\tab break;\par
\tab case 'mensajes-responder.php':\par
\tab\tab path = 'mensajes';\par
\tab\tab break;\par
\tab case 'mensajes':\par
\tab\tab if(pathArray[2] == 'redactar' || pathArray[2] == 'a') path = 'mensajes';\par
\tab\tab else if(pathArray[2] == 'leer') path = 'leermp';\par
\tab\tab break;\par
\tab case '':\par
\tab case 'index.php':\par
\tab case 'categorias':\par
\tab\tab path = 'principal';\par
\tab\tab break;\par
\tab case 'perfil.php':\par
\tab case 'perfil':\par
\tab\tab path = 'perfil';\par
\tab\tab break;\par
\tab case 'cuenta':\par
\tab\tab if(pathArray[2] == 'fotos') path = 'fotos';\par
\tab\tab break;\par
\tab case 'top':\par
\tab\tab path = 'top';\par
\tab\tab break;\par
\tab case 'buscador-google.php':\par
\tab case 'buscador-taringa.php':\par
\tab case 'buscador-tags.php':\par
\tab\tab path = 'buscador';\par
\tab\tab break;\par
\tab case 'monitor':\par
\tab case 'monitor.php':\par
\tab\tab path = 'monitor';\par
\tab\tab break;\par
\tab case 'comunidades':\par
\tab\tab path = 'comunidades';\par
\tab\tab if(pathArray[3] == 'agregar') path = 'comuagregar';\par
\tab\tab break;\par
\tab case 'mod-history':\par
\tab\tab path = 'mod';\par
\tab\tab break;\par
\tab case 'api':\par
\tab\tab return;\par
\tab\tab break;\par
\tab\par
\}\par
\par
/////////////////////////////FUNCIONES////////////////////////////////\par
/*\par
 * jQuery JavaScript Library v1.3.2\par
 * http://jquery.com/\par
 *\par
 * Copyright (c) 2009 John Resig\par
 * Dual licensed under the MIT and GPL licenses.\par
 * http://docs.jquery.com/License\par
 *\par
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)\par
 * Revision: 6246\par
 */\par
(function()\{var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F)\{return new o.fn.init(E,F)\},D=/^[^<]*(<(.|\\s)+>)[^>]*$|^#([\\w-]+)$/,f=/^.[^:#\\[\\.,]*$/;o.fn=o.prototype=\{init:function(E,H)\{E=E||document;if(E.nodeType)\{this[0]=E;this.length=1;this.context=E;return this\}if(typeof E==="string")\{var G=D.exec(E);if(G&&(G[1]||!H))\{if(G[1])\{E=o.clean([G[1]],H)\}else\{var I=document.getElementById(G[3]);if(I&&I.id!=G[3])\{return o().find(E)\}var F=o(I||[]);F.context=document;F.selector=E;return F\}\}else\{return o(H).find(E)\}\}else\{if(o.isFunction(E))\{return o(document).ready(E)\}\}if(E.selector&&E.context)\{this.selector=E.selector;this.context=E.context\}return this.setArray(o.isArray(E)?E:o.makeArray(E))\},selector:"",jquery:"1.3.2",size:function()\{return this.length\},get:function(E)\{return E===g?Array.prototype.slice.call(this):this[E]\},pushStack:function(F,H,E)\{var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find")\{G.selector=this.selector+(this.selector?" ":"")+E\}else\{if(H)\{G.selector=this.selector+"."+H+"("+E+")"\}\}return G\},setArray:function(E)\{this.length=0;Array.prototype.push.apply(this,E);return this\},each:function(F,E)\{return o.each(this,F,E)\},index:function(E)\{return o.inArray(E&&E.jquery?E[0]:E,this)\},attr:function(F,H,G)\{var E=F;if(typeof F==="string")\{if(H===g)\{return this[0]&&o[G||"attr"](this[0],F)\}else\{E=\{\};E[F]=H\}\}return this.each(function(I)\{for(F in E)\{o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))\}\})\},css:function(E,F)\{if((E=="width"||E=="height")&&parseFloat(F)<0)\{F=g\}return this.attr(E,F,"curCSS")\},text:function(F)\{if(typeof F!=="object"&&F!=null)\{return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))\}var E="";o.each(F||this,function()\{o.each(this.childNodes,function()\{if(this.nodeType!=8)\{E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])\}\})\});return E\},wrapAll:function(E)\{if(this[0])\{var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode)\{F.insertBefore(this[0])\}F.map(function()\{var G=this;while(G.firstChild)\{G=G.firstChild\}return G\}).append(this)\}return this\},wrapInner:function(E)\{return this.each(function()\{o(this).contents().wrapAll(E)\})\},wrap:function(E)\{return this.each(function()\{o(this).wrapAll(E)\})\},append:function()\{return this.domManip(arguments,true,function(E)\{if(this.nodeType==1)\{this.appendChild(E)\}\})\},prepend:function()\{return this.domManip(arguments,true,function(E)\{if(this.nodeType==1)\{this.insertBefore(E,this.firstChild)\}\})\},before:function()\{return this.domManip(arguments,false,function(E)\{this.parentNode.insertBefore(E,this)\})\},after:function()\{return this.domManip(arguments,false,function(E)\{this.parentNode.insertBefore(E,this.nextSibling)\})\},end:function()\{return this.prevObject||o([])\},push:[].push,sort:[].sort,splice:[].splice,find:function(E)\{if(this.length===1)\{var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F\}else\{return this.pushStack(o.unique(o.map(this,function(G)\{return o.find(E,G)\})),"find",E)\}\},clone:function(G)\{var E=this.map(function()\{if(!o.support.noCloneEvent&&!o.isXMLDoc(this))\{var I=this.outerHTML;if(!I)\{var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML\}return o.clean([I.replace(/ jQuery\\d+="(?:\\d+|null)"/g,"").replace(/^\\s*/,"")])[0]\}else\{return this.cloneNode(true)\}\});if(G===true)\{var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function()\{if(this.nodeName!==H[F].nodeName)\{return\}var I=o.data(H[F],"events");for(var K in I)\{for(var J in I[K])\{o.event.add(this,K,I[K][J],I[K][J].data)\}\}F++\})\}return E\},filter:function(E)\{return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F)\{return E.call(G,F)\})||o.multiFilter(E,o.grep(this,function(F)\{return F.nodeType===1\})),"filter",E)\},closest:function(E)\{var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function()\{var H=this;while(H&&H.ownerDocument)\{if(G?G.index(H)>-1:o(H).is(E))\{o.data(H,"closest",F);return H\}H=H.parentNode;F++\}\})\},not:function(E)\{if(typeof E==="string")\{if(f.test(E))\{return this.pushStack(o.multiFilter(E,this,true),"not",E)\}else\{E=o.multiFilter(E,this)\}\}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function()\{return F?o.inArray(this,E)<0:this!=E\})\},add:function(E)\{return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))\},is:function(E)\{return !!E&&o.multiFilter(E,this).length>0\},hasClass:function(E)\{return !!E&&this.is("."+E)\},val:function(K)\{if(K===g)\{var E=this[0];if(E)\{if(o.nodeName(E,"option"))\{return(E.attributes.value||\{\}).specified?E.value:E.text\}if(o.nodeName(E,"select"))\{var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0)\{return null\}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++)\{var G=M[F];if(G.selected)\{K=o(G).val();if(H)\{return K\}L.push(K)\}\}return L\}return(E.value||"").replace(/\\r/g,"")\}return g\}if(typeof K==="number")\{K+=""\}return this.each(function()\{if(this.nodeType!=1)\{return\}if(o.isArray(K)&&/radio|checkbox/.test(this.type))\{this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)\}else\{if(o.nodeName(this,"select"))\{var N=o.makeArray(K);o("option",this).each(function()\{this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)\});if(!N.length)\{this.selectedIndex=-1\}\}else\{this.value=K\}\}\})\},html:function(E)\{return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\\d+="(?:\\d+|null)"/g,""):null):this.empty().append(E)\},replaceWith:function(E)\{return this.after(E).remove()\},eq:function(E)\{return this.slice(E,+E+1)\},slice:function()\{return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))\},map:function(E)\{return this.pushStack(o.map(this,function(G,F)\{return E.call(G,F,G)\}))\},andSelf:function()\{return this.add(this.prevObject)\},domManip:function(J,M,L)\{if(this[0])\{var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H)\{for(var G=0,E=this.length;G<E;G++)\{L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)\}\}if(F)\{o.each(F,z)\}\}return this;function K(N,O)\{return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N\}\}\};o.fn.init.prototype=o.fn;function z(E,F)\{if(F.src)\{o.ajax(\{url:F.src,async:false,dataType:"script"\})\}else\{o.globalEval(F.text||F.textContent||F.innerHTML||"")\}if(F.parentNode)\{F.parentNode.removeChild(F)\}\}function e()\{return +new Date\}o.extend=o.fn.extend=function()\{var J=arguments[0]||\{\},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean")\{E=J;J=arguments[1]||\{\};H=2\}if(typeof J!=="object"&&!o.isFunction(J))\{J=\{\}\}if(I==H)\{J=this;--H\}for(;H<I;H++)\{if((G=arguments[H])!=null)\{for(var F in G)\{var K=J[F],L=G[F];if(J===L)\{continue\}if(E&&L&&typeof L==="object"&&!L.nodeType)\{J[F]=o.extend(E,K||(L.length!=null?[]:\{\}),L)\}else\{if(L!==g)\{J[F]=L\}\}\}\}\}return J\};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||\{\},s=Object.prototype.toString;o.extend(\{noConflict:function(E)\{l.$=p;if(E)\{l.jQuery=y\}return o\},isFunction:function(E)\{return s.call(E)==="[object Function]"\},isArray:function(E)\{return s.call(E)==="[object Array]"\},isXMLDoc:function(E)\{return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)\},globalEval:function(G)\{if(G&&/\\S/.test(G))\{var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval)\{E.appendChild(document.createTextNode(G))\}else\{E.text=G\}F.insertBefore(E,F.firstChild);F.removeChild(E)\}\},nodeName:function(F,E)\{return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()\},each:function(G,K,F)\{var E,H=0,I=G.length;if(F)\{if(I===g)\{for(E in G)\{if(K.apply(G[E],F)===false)\{break\}\}\}else\{for(;H<I;)\{if(K.apply(G[H++],F)===false)\{break\}\}\}\}else\{if(I===g)\{for(E in G)\{if(K.call(G[E],E,G[E])===false)\{break\}\}\}else\{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H])\{\}\}\}return G\},prop:function(H,I,G,F,E)\{if(o.isFunction(I))\{I=I.call(H,F)\}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I\},className:\{add:function(E,F)\{o.each((F||"").split(/\\s+/),function(G,H)\{if(E.nodeType==1&&!o.className.has(E.className,H))\{E.className+=(E.className?" ":"")+H\}\})\},remove:function(E,F)\{if(E.nodeType==1)\{E.className=F!==g?o.grep(E.className.split(/\\s+/),function(G)\{return !o.className.has(F,G)\}).join(" "):""\}\},has:function(F,E)\{return F&&o.inArray(E,(F.className||F).toString().split(/\\s+/))>-1\}\},swap:function(H,G,I)\{var E=\{\};for(var F in G)\{E[F]=H.style[F];H.style[F]=G[F]\}I.call(H);for(var F in G)\{H.style[F]=E[F]\}\},css:function(H,F,J,E)\{if(F=="width"||F=="height")\{var L,G=\{position:"absolute",visibility:"hidden",display:"block"\},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I()\{L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border")\{return\}o.each(K,function()\{if(!E)\{L-=parseFloat(o.curCSS(H,"padding"+this,true))||0\}if(E==="margin")\{L+=parseFloat(o.curCSS(H,"margin"+this,true))||0\}else\{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0\}\})\}if(H.offsetWidth!==0)\{I()\}else\{o.swap(H,G,I)\}return Math.max(0,Math.round(L))\}return o.curCSS(H,F,J)\},curCSS:function(I,F,G)\{var L,E=I.style;if(F=="opacity"&&!o.support.opacity)\{L=o.attr(E,"opacity");return L==""?"1":L\}if(F.match(/float/i))\{F=w\}if(!G&&E&&E[F])\{L=E[F]\}else\{if(q.getComputedStyle)\{if(F.match(/float/i))\{F="float"\}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M)\{L=M.getPropertyValue(F)\}if(F=="opacity"&&L=="")\{L="1"\}\}else\{if(I.currentStyle)\{var J=F.replace(/\\-(\\w)/g,function(N,O)\{return O.toUpperCase()\});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\\d+(px)?$/i.test(L)&&/^\\d/.test(L))\{var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K\}\}\}\}return L\},clean:function(F,K,I)\{K=K||document;if(typeof K.createElement==="undefined")\{K=K.ownerDocument||K[0]&&K[0].ownerDocument||document\}if(!I&&F.length===1&&typeof F[0]==="string")\{var H=/^<(\\w+)\\s*\\/?>$/.exec(F[0]);if(H)\{return[K.createElement(H[1])]\}\}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S)\{if(typeof S==="number")\{S+=""\}if(!S)\{return\}if(typeof S==="string")\{S=S.replace(/(<(\\w+)[^>]*?)\\/>/g,function(U,V,T)\{return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"\});var O=S.replace(/^\\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--)\{L=L.lastChild\}if(!o.support.tbody)\{var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M)\{if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length)\{N[M].parentNode.removeChild(N[M])\}\}\}if(!o.support.leadingWhitespace&&/^\\s/.test(S))\{L.insertBefore(K.createTextNode(S.match(/^\\s*/)[0]),L.firstChild)\}S=o.makeArray(L.childNodes)\}if(S.nodeType)\{G.push(S)\}else\{G=o.merge(G,S)\}\});if(I)\{for(var J=0;G[J];J++)\{if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript"))\{E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])\}else\{if(G[J].nodeType===1)\{G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))\}I.appendChild(G[J])\}\}return E\}return G\},attr:function(J,G,K)\{if(!J||J.nodeType==3||J.nodeType==8)\{return g\}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName)\{var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode)\{J.parentNode.selectedIndex\}if(G in J&&H&&!F)\{if(L)\{if(G=="type"&&o.nodeName(J,"input")&&J.parentNode)\{throw"type property can't be changed"\}J[G]=K\}if(o.nodeName(J,"form")&&J.getAttributeNode(G))\{return J.getAttributeNode(G).nodeValue\}if(G=="tabIndex")\{var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g\}return J[G]\}if(!o.support.style&&H&&G=="style")\{return o.attr(J.style,"cssText",K)\}if(L)\{J.setAttribute(G,""+K)\}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E\}if(!o.support.opacity&&G=="opacity")\{if(L)\{J.zoom=1;J.filter=(J.filter||"").replace(/alpha\\([^)]*\\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")\}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""\}G=G.replace(/-([a-z])/ig,function(M,N)\{return N.toUpperCase()\});if(L)\{J[G]=K\}return J[G]\},trim:function(E)\{return(E||"").replace(/^\\s+|\\s+$/g,"")\},makeArray:function(G)\{var E=[];if(G!=null)\{var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval)\{E[0]=G\}else\{while(F)\{E[--F]=G[F]\}\}\}return E\},inArray:function(G,H)\{for(var E=0,F=H.length;E<F;E++)\{if(H[E]===G)\{return E\}\}return -1\},merge:function(H,E)\{var F=0,G,I=H.length;if(!o.support.getAll)\{while((G=E[F++])!=null)\{if(G.nodeType!=8)\{H[I++]=G\}\}\}else\{while((G=E[F++])!=null)\{H[I++]=G\}\}return H\},unique:function(K)\{var F=[],E=\{\};try\{for(var G=0,H=K.length;G<H;G++)\{var J=o.data(K[G]);if(!E[J])\{E[J]=true;F.push(K[G])\}\}\}catch(I)\{F=K\}return F\},grep:function(F,J,E)\{var G=[];for(var H=0,I=F.length;H<I;H++)\{if(!E!=!J(F[H],H))\{G.push(F[H])\}\}return G\},map:function(E,J)\{var F=[];for(var G=0,H=E.length;G<H;G++)\{var I=J(E[G],G);if(I!=null)\{F[F.length]=I\}\}return F.concat.apply([],F)\}\});var C=navigator.userAgent.toLowerCase();o.browser=\{version:(C.match(/.+(?:rv|it|ra|ie)[\\/: ]([\\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)\};o.each(\{parent:function(E)\{return E.parentNode\},parents:function(E)\{return o.dir(E,"parentNode")\},next:function(E)\{return o.nth(E,2,"nextSibling")\},prev:function(E)\{return o.nth(E,2,"previousSibling")\},nextAll:function(E)\{return o.dir(E,"nextSibling")\},prevAll:function(E)\{return o.dir(E,"previousSibling")\},siblings:function(E)\{return o.sibling(E.parentNode.firstChild,E)\},children:function(E)\{return o.sibling(E.firstChild)\},contents:function(E)\{return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)\}\},function(E,F)\{o.fn[E]=function(G)\{var H=o.map(this,F);if(G&&typeof G=="string")\{H=o.multiFilter(G,H)\}return this.pushStack(o.unique(H),E,G)\}\});o.each(\{appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"\},function(E,F)\{o.fn[E]=function(G)\{var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++)\{var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)\}return this.pushStack(J,E,G)\}\});o.each(\{removeAttr:function(E)\{o.attr(this,E,"");if(this.nodeType==1)\{this.removeAttribute(E)\}\},addClass:function(E)\{o.className.add(this,E)\},removeClass:function(E)\{o.className.remove(this,E)\},toggleClass:function(F,E)\{if(typeof E!=="boolean")\{E=!o.className.has(this,F)\}o.className[E?"add":"remove"](this,F)\},remove:function(E)\{if(!E||o.filter(E,[this]).length)\{o("*",this).add([this]).each(function()\{o.event.remove(this);o.removeData(this)\});if(this.parentNode)\{this.parentNode.removeChild(this)\}\}\},empty:function()\{o(this).children().remove();while(this.firstChild)\{this.removeChild(this.firstChild)\}\}\},function(E,F)\{o.fn[E]=function()\{return this.each(F,arguments)\}\});function j(E,F)\{return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0\}var h="jQuery"+e(),v=0,A=\{\};o.extend(\{cache:\{\},data:function(F,E,G)\{F=F==l?A:F;var H=F[h];if(!H)\{H=F[h]=++v\}if(E&&!o.cache[H])\{o.cache[H]=\{\}\}if(G!==g)\{o.cache[H][E]=G\}return E?o.cache[H][E]:H\},removeData:function(F,E)\{F=F==l?A:F;var H=F[h];if(E)\{if(o.cache[H])\{delete o.cache[H][E];E="";for(E in o.cache[H])\{break\}if(!E)\{o.removeData(F)\}\}\}else\{try\{delete F[h]\}catch(G)\{if(F.removeAttribute)\{F.removeAttribute(h)\}\}delete o.cache[H]\}\},queue:function(F,E,H)\{if(F)\{E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H))\{G=o.data(F,E,o.makeArray(H))\}else\{if(H)\{G.push(H)\}\}\}return G\},dequeue:function(H,G)\{var E=o.queue(H,G),F=E.shift();if(!G||G==="fx")\{F=E[0]\}if(F!==g)\{F.call(H)\}\}\});o.fn.extend(\{data:function(E,G)\{var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g)\{var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length)\{F=o.data(this[0],E)\}return F===g&&H[1]?this.data(H[0]):F\}else\{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function()\{o.data(this,E,G)\})\}\},removeData:function(E)\{return this.each(function()\{o.removeData(this,E)\})\},queue:function(E,F)\{if(typeof E!=="string")\{F=E;E="fx"\}if(F===g)\{return o.queue(this[0],E)\}return this.each(function()\{var G=o.queue(this,E,F);if(E=="fx"&&G.length==1)\{G[0].call(this)\}\})\},dequeue:function(E)\{return this.each(function()\{o.dequeue(this,E)\})\}\});\par
/*\par
 * Sizzle CSS Selector Engine - v0.9.3\par
 *  Copyright 2009, The Dojo Foundation\par
 *  Released under the MIT, BSD, and GPL Licenses.\par
 *  More information: http://sizzlejs.com/\par
 */\par
(function()\{var R=/((?:\\((?:\\([^()]+\\)|[^()]+)+\\)|\\[(?:\\[[^[\\]]*\\]|['"][^'"]*['"]|[^[\\]'"]+)+\\]|\\\\.|[^ >+~,(\\[\\\\]+)+|[>+~])(\\s*,\\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac)\{ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9)\{return[]\}if(!Y||typeof Y!=="string")\{return ab\}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null)\{Z.push(W[1]);if(W[2])\{V=RegExp.rightContext;break\}\}if(Z.length>1&&M.exec(Y))\{if(Z.length===2&&I.relative[Z[0]])\{af=J(Z[0]+Z[1],U)\}else\{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length)\{Y=Z.shift();if(I.relative[Y])\{Y+=Z.shift()\}af=J(Y,af)\}\}\}else\{var ae=ac?\{expr:Z.pop(),set:E(ac)\}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0)\{ai=E(af)\}else\{X=false\}while(Z.length)\{var ah=Z.pop(),ag=ah;if(!I.relative[ah])\{ah=""\}else\{ag=Z.pop()\}if(ag==null)\{ag=U\}I.relative[ah](ai,ag,Q(U))\}\}if(!ai)\{ai=af\}if(!ai)\{throw"Syntax error, unrecognized expression: "+(ah||Y)\}if(H.call(ai)==="[object Array]")\{if(!X)\{ab.push.apply(ab,ai)\}else\{if(U.nodeType===1)\{for(var aa=0;ai[aa]!=null;aa++)\{if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa])))\{ab.push(af[aa])\}\}\}else\{for(var aa=0;ai[aa]!=null;aa++)\{if(ai[aa]&&ai[aa].nodeType===1)\{ab.push(af[aa])\}\}\}\}\}else\{E(ai,ab)\}if(V)\{F(V,U,ab,ac);if(G)\{hasDuplicate=false;ab.sort(G);if(hasDuplicate)\{for(var aa=1;aa<ab.length;aa++)\{if(ab[aa]===ab[aa-1])\{ab.splice(aa--,1)\}\}\}\}\}return ab\};F.matches=function(T,U)\{return F(T,null,null,U)\};F.find=function(aa,T,ab)\{var Z,X;if(!aa)\{return[]\}for(var W=0,V=I.order.length;W<V;W++)\{var Y=I.order[W],X;if((X=I.match[Y].exec(aa)))\{var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\\\")\{X[1]=(X[1]||"").replace(/\\\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null)\{aa=aa.replace(I.match[Y],"");break\}\}\}\}if(!Z)\{Z=T.getElementsByTagName("*")\}return\{set:Z,expr:aa\}\};F.filter=function(ad,ac,ag,W)\{var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length)\{for(var ab in I.filter)\{if((Y=I.match[ab].exec(ad))!=null)\{var U=I.filter[ab],ah,af;T=false;if(aa==ai)\{ai=[]\}if(I.preFilter[ab])\{Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y)\{T=ah=true\}else\{if(Y===true)\{continue\}\}\}if(Y)\{for(var X=0;(af=aa[X])!=null;X++)\{if(af)\{ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null)\{if(ae)\{T=true\}else\{aa[X]=false\}\}else\{if(ae)\{ai.push(af);T=true\}\}\}\}\}if(ah!==g)\{if(!ag)\{aa=ai\}ad=ad.replace(I.match[ab],"");if(!T)\{return[]\}break\}\}\}if(ad==V)\{if(T==null)\{throw"Syntax error, unrecognized expression: "+ad\}else\{break\}\}V=ad\}return aa\};var I=F.selectors=\{order:["ID","NAME","TAG"],match:\{ID:/#((?:[\\w\\u00c0-\\uFFFF_-]|\\\\.)+)/,CLASS:/\\.((?:[\\w\\u00c0-\\uFFFF_-]|\\\\.)+)/,NAME:/\\[name=['"]*((?:[\\w\\u00c0-\\uFFFF_-]|\\\\.)+)['"]*\\]/,ATTR:/\\[\\s*((?:[\\w\\u00c0-\\uFFFF_-]|\\\\.)+)\\s*(?:(\\S?=)\\s*(['"]*)(.*?)\\3|)\\s*\\]/,TAG:/^((?:[\\w\\u00c0-\\uFFFF\\*_-]|\\\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\\((even|odd|[\\dn+-]*)\\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\))?(?=[^-]|$)/,PSEUDO:/:((?:[\\w\\u00c0-\\uFFFF_-]|\\\\.)+)(?:\\((['"]*)((?:\\([^\\)]+\\)|[^\\2\\(\\)]*)+)\\2\\))?/\},attrMap:\{"class":"className","for":"htmlFor"\},attrHandle:\{href:function(T)\{return T.getAttribute("href")\}\},relative:\{"+":function(aa,T,Z)\{var X=typeof T==="string",ab=X&&!/\\W/.test(T),Y=X&&!ab;if(ab&&!Z)\{T=T.toUpperCase()\}for(var W=0,V=aa.length,U;W<V;W++)\{if((U=aa[W]))\{while((U=U.previousSibling)&&U.nodeType!==1)\{\}aa[W]=Y||U&&U.nodeName===T?U||false:U===T\}\}if(Y)\{F.filter(T,aa,true)\}\},">":function(Z,U,aa)\{var X=typeof U==="string";if(X&&!/\\W/.test(U))\{U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++)\{var Y=Z[V];if(Y)\{var W=Y.parentNode;Z[V]=W.nodeName===U?W:false\}\}\}else\{for(var V=0,T=Z.length;V<T;V++)\{var Y=Z[V];if(Y)\{Z[V]=X?Y.parentNode:Y.parentNode===U\}\}if(X)\{F.filter(U,Z,true)\}\}\},"":function(W,U,Y)\{var V=L++,T=S;if(!U.match(/\\W/))\{var X=U=Y?U:U.toUpperCase();T=P\}T("parentNode",U,V,W,X,Y)\},"~":function(W,U,Y)\{var V=L++,T=S;if(typeof U==="string"&&!U.match(/\\W/))\{var X=U=Y?U:U.toUpperCase();T=P\}T("previousSibling",U,V,W,X,Y)\}\},find:\{ID:function(U,V,W)\{if(typeof V.getElementById!=="undefined"&&!W)\{var T=V.getElementById(U[1]);return T?[T]:[]\}\},NAME:function(V,Y,Z)\{if(typeof Y.getElementsByName!=="undefined")\{var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++)\{if(X[W].getAttribute("name")===V[1])\{U.push(X[W])\}\}return U.length===0?null:U\}\},TAG:function(T,U)\{return U.getElementsByTagName(T[1])\}\},preFilter:\{CLASS:function(W,U,V,T,Z,aa)\{W=" "+W[1].replace(/\\\\/g,"")+" ";if(aa)\{return W\}for(var X=0,Y;(Y=U[X])!=null;X++)\{if(Y)\{if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0))\{if(!V)\{T.push(Y)\}\}else\{if(V)\{U[X]=false\}\}\}\}return false\},ID:function(T)\{return T[1].replace(/\\\\/g,"")\},TAG:function(U,T)\{for(var V=0;T[V]===false;V++)\{\}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()\},CHILD:function(T)\{if(T[1]=="nth")\{var U=/(-?)(\\d*)n((?:\\+|-)?\\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0\}T[0]=L++;return T\},ATTR:function(X,U,V,T,Y,Z)\{var W=X[1].replace(/\\\\/g,"");if(!Z&&I.attrMap[W])\{X[1]=I.attrMap[W]\}if(X[2]==="~=")\{X[4]=" "+X[4]+" "\}return X\},PSEUDO:function(X,U,V,T,Y)\{if(X[1]==="not")\{if(X[3].match(R).length>1||/^\\w/.test(X[3]))\{X[3]=F(X[3],null,null,U)\}else\{var W=F.filter(X[3],U,V,true^Y);if(!V)\{T.push.apply(T,W)\}return false\}\}else\{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0]))\{return true\}\}return X\},POS:function(T)\{T.unshift(true);return T\}\},filters:\{enabled:function(T)\{return T.disabled===false&&T.type!=="hidden"\},disabled:function(T)\{return T.disabled===true\},checked:function(T)\{return T.checked===true\},selected:function(T)\{T.parentNode.selectedIndex;return T.selected===true\},parent:function(T)\{return !!T.firstChild\},empty:function(T)\{return !T.firstChild\},has:function(V,U,T)\{return !!F(T[3],V).length\},header:function(T)\{return/h\\d/i.test(T.nodeName)\},text:function(T)\{return"text"===T.type\},radio:function(T)\{return"radio"===T.type\},checkbox:function(T)\{return"checkbox"===T.type\},file:function(T)\{return"file"===T.type\},password:function(T)\{return"password"===T.type\},submit:function(T)\{return"submit"===T.type\},image:function(T)\{return"image"===T.type\},reset:function(T)\{return"reset"===T.type\},button:function(T)\{return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"\},input:function(T)\{return/input|select|textarea|button/i.test(T.nodeName)\}\},setFilters:\{first:function(U,T)\{return T===0\},last:function(V,U,T,W)\{return U===W.length-1\},even:function(U,T)\{return T%2===0\},odd:function(U,T)\{return T%2===1\},lt:function(V,U,T)\{return U<T[3]-0\},gt:function(V,U,T)\{return U>T[3]-0\},nth:function(V,U,T)\{return T[3]-0==U\},eq:function(V,U,T)\{return T[3]-0==U\}\},filter:\{PSEUDO:function(Z,V,W,aa)\{var U=V[1],X=I.filters[U];if(X)\{return X(Z,W,V,aa)\}else\{if(U==="contains")\{return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0\}else\{if(U==="not")\{var Y=V[3];for(var W=0,T=Y.length;W<T;W++)\{if(Y[W]===Z)\{return false\}\}return true\}\}\}\},CHILD:function(T,W)\{var Z=W[1],U=T;switch(Z)\{case"only":case"first":while(U=U.previousSibling)\{if(U.nodeType===1)\{return false\}\}if(Z=="first")\{return true\}U=T;case"last":while(U=U.nextSibling)\{if(U.nodeType===1)\{return false\}\}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0)\{return true\}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex))\{var X=0;for(U=ab.firstChild;U;U=U.nextSibling)\{if(U.nodeType===1)\{U.nodeIndex=++X\}\}ab.sizcache=Y\}var aa=T.nodeIndex-ac;if(V==0)\{return aa==0\}else\{return(aa%V==0&&aa/V>=0)\}\}\},ID:function(U,T)\{return U.nodeType===1&&U.getAttribute("id")===T\},TAG:function(U,T)\{return(T==="*"&&U.nodeType===1)||U.nodeName===T\},CLASS:function(U,T)\{return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1\},ATTR:function(Y,W)\{var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false\},POS:function(X,U,V,Y)\{var T=U[2],W=I.setFilters[T];if(W)\{return W(X,V,U,Y)\}\}\}\};var M=I.match.POS;for(var O in I.match)\{I.match[O]=RegExp(I.match[O].source+/(?![^\\[]*\\])(?![^\\(]*\\))/.source)\}var E=function(U,T)\{U=Array.prototype.slice.call(U);if(T)\{T.push.apply(T,U);return T\}return U\};try\{Array.prototype.slice.call(document.documentElement.childNodes)\}catch(N)\{E=function(X,W)\{var U=W||[];if(H.call(X)==="[object Array]")\{Array.prototype.push.apply(U,X)\}else\{if(typeof X.length==="number")\{for(var V=0,T=X.length;V<T;V++)\{U.push(X[V])\}\}else\{for(var V=0;X[V];V++)\{U.push(X[V])\}\}\}return U\}\}var G;if(document.documentElement.compareDocumentPosition)\{G=function(U,T)\{var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0)\{hasDuplicate=true\}return V\}\}else\{if("sourceIndex" in document.documentElement)\{G=function(U,T)\{var V=U.sourceIndex-T.sourceIndex;if(V===0)\{hasDuplicate=true\}return V\}\}else\{if(document.createRange)\{G=function(W,U)\{var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0)\{hasDuplicate=true\}return X\}\}\}\}(function()\{var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V))\{I.find.ID=function(X,Y,Z)\{if(typeof Y.getElementById!=="undefined"&&!Z)\{var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]\}\};I.filter.ID=function(Y,W)\{var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W\}\}T.removeChild(U)\})();(function()\{var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0)\{I.find.TAG=function(U,Y)\{var X=Y.getElementsByTagName(U[1]);if(U[1]==="*")\{var W=[];for(var V=0;X[V];V++)\{if(X[V].nodeType===1)\{W.push(X[V])\}\}X=W\}return X\}\}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#")\{I.attrHandle.href=function(U)\{return U.getAttribute("href",2)\}\}\})();if(document.querySelectorAll)\{(function()\{var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0)\{return\}F=function(Y,X,V,W)\{X=X||document;if(!W&&X.nodeType===9&&!Q(X))\{try\{return E(X.querySelectorAll(Y),V)\}catch(Z)\{\}\}return T(Y,X,V,W)\};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches\})()\}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName)\{(function()\{var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0)\{return\}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1)\{return\}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W)\{if(typeof V.getElementsByClassName!=="undefined"&&!W)\{return V.getElementsByClassName(U[1])\}\}\})()\}function P(U,Z,Y,ad,aa,ac)\{var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++)\{var T=ad[W];if(T)\{if(ab&&T.nodeType===1)\{T.sizcache=Y;T.sizset=W\}T=T[U];var X=false;while(T)\{if(T.sizcache===Y)\{X=ad[T.sizset];break\}if(T.nodeType===1&&!ac)\{T.sizcache=Y;T.sizset=W\}if(T.nodeName===Z)\{X=T;break\}T=T[U]\}ad[W]=X\}\}\}function S(U,Z,Y,ad,aa,ac)\{var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++)\{var T=ad[W];if(T)\{if(ab&&T.nodeType===1)\{T.sizcache=Y;T.sizset=W\}T=T[U];var X=false;while(T)\{if(T.sizcache===Y)\{X=ad[T.sizset];break\}if(T.nodeType===1)\{if(!ac)\{T.sizcache=Y;T.sizset=W\}if(typeof Z!=="string")\{if(T===Z)\{X=true;break\}\}else\{if(F.filter(Z,[T]).length>0)\{X=T;break\}\}\}T=T[U]\}ad[W]=X\}\}\}var K=document.compareDocumentPosition?function(U,T)\{return U.compareDocumentPosition(T)&16\}:function(U,T)\{return U!==T&&(U.contains?U.contains(T):true)\};var Q=function(T)\{return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)\};var J=function(T,aa)\{var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T)))\{X+=Y[0];T=T.replace(I.match.PSEUDO,"")\}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++)\{F(T,V[Z],W)\}return F.filter(X,W)\};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T)\{return T.offsetWidth===0||T.offsetHeight===0\};F.selectors.filters.visible=function(T)\{return T.offsetWidth>0||T.offsetHeight>0\};F.selectors.filters.animated=function(T)\{return o.grep(o.timers,function(U)\{return T===U.elem\}).length\};o.multiFilter=function(V,T,U)\{if(U)\{V=":not("+V+")"\}return F.matches(V,T)\};o.dir=function(V,U)\{var T=[],W=V[U];while(W&&W!=document)\{if(W.nodeType==1)\{T.push(W)\}W=W[U]\}return T\};o.nth=function(X,T,V,W)\{T=T||1;var U=0;for(;X;X=X[V])\{if(X.nodeType==1&&++U==T)\{break\}\}return X\};o.sibling=function(V,U)\{var T=[];for(;V;V=V.nextSibling)\{if(V.nodeType==1&&V!=U)\{T.push(V)\}\}return T\};return;l.Sizzle=F\})();o.event=\{add:function(I,F,H,K)\{if(I.nodeType==3||I.nodeType==8)\{return\}if(I.setInterval&&I!=l)\{I=l\}if(!H.guid)\{H.guid=this.guid++\}if(K!==g)\{var G=H;H=this.proxy(G);H.data=K\}var E=o.data(I,"events")||o.data(I,"events",\{\}),J=o.data(I,"handle")||o.data(I,"handle",function()\{return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g\});J.elem=I;o.each(F.split(/\\s+/),function(M,N)\{var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N])\{o.event.specialAll[N].setup.call(I,K,O)\}if(!L)\{L=E[N]=\{\};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false)\{if(I.addEventListener)\{I.addEventListener(N,J,false)\}else\{if(I.attachEvent)\{I.attachEvent("on"+N,J)\}\}\}\}L[H.guid]=H;o.event.global[N]=true\});I=null\},guid:1,global:\{\},remove:function(K,H,J)\{if(K.nodeType==3||K.nodeType==8)\{return\}var G=o.data(K,"events"),F,E;if(G)\{if(H===g||(typeof H==="string"&&H.charAt(0)=="."))\{for(var I in G)\{this.remove(K,I+(H||""))\}\}else\{if(H.type)\{J=H.handler;H=H.type\}o.each(H.split(/\\s+/),function(M,O)\{var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\\\.)"+Q.slice().sort().join(".*\\\\.")+"(\\\\.|$)");if(G[O])\{if(J)\{delete G[O][J.guid]\}else\{for(var P in G[O])\{if(N.test(G[O][P].type))\{delete G[O][P]\}\}\}if(o.event.specialAll[O])\{o.event.specialAll[O].teardown.call(K,Q)\}for(F in G[O])\{break\}if(!F)\{if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false)\{if(K.removeEventListener)\{K.removeEventListener(O,o.data(K,"handle"),false)\}else\{if(K.detachEvent)\{K.detachEvent("on"+O,o.data(K,"handle"))\}\}\}F=null;delete G[O]\}\}\})\}for(F in G)\{break\}if(!F)\{var L=o.data(K,"handle");if(L)\{L.elem=null\}o.removeData(K,"events");o.removeData(K,"handle")\}\}\},trigger:function(I,K,H,E)\{var G=I.type||I;if(!E)\{I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0)\{I.type=G=G.slice(0,-1);I.exclusive=true\}if(!H)\{I.stopPropagation();if(this.global[G])\{o.each(o.cache,function()\{if(this.events&&this.events[G])\{o.event.trigger(I,K,this.handle.elem)\}\})\}\}if(!H||H.nodeType==3||H.nodeType==8)\{return g\}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)\}I.currentTarget=H;var J=o.data(H,"handle");if(J)\{J.apply(H,K)\}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false)\{I.result=false\}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click"))\{this.triggered=true;try\{H[G]()\}catch(L)\{\}\}this.triggered=false;if(!I.isPropagationStopped())\{var F=H.parentNode||H.ownerDocument;if(F)\{o.event.trigger(I,K,F,true)\}\}\},handle:function(K)\{var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\\\.)"+L.slice().sort().join(".*\\\\.")+"(\\\\.|$)");E=(o.data(this,"events")||\{\})[K.type];for(var G in E)\{var H=E[G];if(J||I.test(H.type))\{K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g)\{K.result=F;if(F===false)\{K.preventDefault();K.stopPropagation()\}\}if(K.isImmediatePropagationStopped())\{break\}\}\}\},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H)\{if(H[h])\{return H\}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;)\{J=this.props[--G];H[J]=F[J]\}if(!H.target)\{H.target=H.srcElement||document\}if(H.target.nodeType==3)\{H.target=H.target.parentNode\}if(!H.relatedTarget&&H.fromElement)\{H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement\}if(H.pageX==null&&H.clientX!=null)\{var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)\}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode))\{H.which=H.charCode||H.keyCode\}if(!H.metaKey&&H.ctrlKey)\{H.metaKey=H.ctrlKey\}if(!H.which&&H.button)\{H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))\}return H\},proxy:function(F,E)\{E=E||function()\{return F.apply(this,arguments)\};E.guid=F.guid=F.guid||E.guid||this.guid++;return E\},special:\{ready:\{setup:B,teardown:function()\{\}\}\},specialAll:\{live:\{setup:function(E,F)\{o.event.add(this,F[0],c)\},teardown:function(G)\{if(G.length)\{var E=0,F=RegExp("(^|\\\\.)"+G[0]+"(\\\\.|$)");o.each((o.data(this,"events").live||\{\}),function()\{if(F.test(this.type))\{E++\}\});if(E<1)\{o.event.remove(this,G[0],c)\}\}\}\}\}\};o.Event=function(E)\{if(!this.preventDefault)\{return new o.Event(E)\}if(E&&E.type)\{this.originalEvent=E;this.type=E.type\}else\{this.type=E\}this.timeStamp=e();this[h]=true\};function k()\{return false\}function u()\{return true\}o.Event.prototype=\{preventDefault:function()\{this.isDefaultPrevented=u;var E=this.originalEvent;if(!E)\{return\}if(E.preventDefault)\{E.preventDefault()\}E.returnValue=false\},stopPropagation:function()\{this.isPropagationStopped=u;var E=this.originalEvent;if(!E)\{return\}if(E.stopPropagation)\{E.stopPropagation()\}E.cancelBubble=true\},stopImmediatePropagation:function()\{this.isImmediatePropagationStopped=u;this.stopPropagation()\},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k\};var a=function(F)\{var E=F.relatedTarget;while(E&&E!=this)\{try\{E=E.parentNode\}catch(G)\{E=this\}\}if(E!=this)\{F.type=F.data;o.event.handle.apply(this,arguments)\}\};o.each(\{mouseover:"mouseenter",mouseout:"mouseleave"\},function(F,E)\{o.event.special[E]=\{setup:function()\{o.event.add(this,F,a,E)\},teardown:function()\{o.event.remove(this,F,a)\}\}\});o.fn.extend(\{bind:function(F,G,E)\{return F=="unload"?this.one(F,G,E):this.each(function()\{o.event.add(this,F,E||G,E&&G)\})\},one:function(G,H,F)\{var E=o.event.proxy(F||H,function(I)\{o(this).unbind(I,E);return(F||H).apply(this,arguments)\});return this.each(function()\{o.event.add(this,G,E,F&&H)\})\},unbind:function(F,E)\{return this.each(function()\{o.event.remove(this,F,E)\})\},trigger:function(E,F)\{return this.each(function()\{o.event.trigger(E,F,this)\})\},triggerHandler:function(E,G)\{if(this[0])\{var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result\}\},toggle:function(G)\{var E=arguments,F=1;while(F<E.length)\{o.event.proxy(G,E[F++])\}return this.click(o.event.proxy(G,function(H)\{this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false\}))\},hover:function(E,F)\{return this.mouseenter(E).mouseleave(F)\},ready:function(E)\{B();if(o.isReady)\{E.call(document,o)\}else\{o.readyList.push(E)\}return this\},live:function(G,F)\{var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this\},die:function(F,E)\{o(document).unbind(i(F,this.selector),E?\{guid:E.guid+this.selector+F\}:null);return this\}\});function c(H)\{var E=RegExp("(^|\\\\.)"+H.type+"(\\\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J)\{if(E.test(J.type))\{var K=o(H.target).closest(J.data)[0];if(K)\{F.push(\{elem:K,fn:J\})\}\}\});F.sort(function(J,I)\{return o.data(J.elem,"closest")-o.data(I.elem,"closest")\});o.each(F,function()\{if(this.fn.call(this.elem,H,this.fn.data)===false)\{return(G=false)\}\});return G\}function i(F,E)\{return["live",F,E.replace(/\\./g,"`").replace(/ /g,"|")].join(".")\}o.extend(\{isReady:false,readyList:[],ready:function()\{if(!o.isReady)\{o.isReady=true;if(o.readyList)\{o.each(o.readyList,function()\{this.call(document,o)\});o.readyList=null\}o(document).triggerHandler("ready")\}\}\});var x=false;function B()\{if(x)\{return\}x=true;if(document.addEventListener)\{document.addEventListener("DOMContentLoaded",function()\{document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()\},false)\}else\{if(document.attachEvent)\{document.attachEvent("onreadystatechange",function()\{if(document.readyState==="complete")\{document.detachEvent("onreadystatechange",arguments.callee);o.ready()\}\});if(document.documentElement.doScroll&&l==l.top)\{(function()\{if(o.isReady)\{return\}try\{document.documentElement.doScroll("left")\}catch(E)\{setTimeout(arguments.callee,0);return\}o.ready()\})()\}\}\}o.event.add(l,"load",o.ready)\}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E)\{o.fn[E]=function(G)\{return G?this.bind(E,G):this.trigger(E)\}\});o(l).bind("unload",function()\{for(var E in o.cache)\{if(E!=1&&o.cache[E].handle)\{o.event.remove(o.cache[E].handle.elem)\}\}\});(function()\{o.support=\{\};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E)\{return\}o.support=\{leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null\};G.type="text/javascript";try\{G.appendChild(document.createTextNode("window."+J+"=1;"))\}catch(I)\{\}F.insertBefore(G,F.firstChild);if(l[J])\{o.support.scriptEval=true;delete l[J]\}F.removeChild(G);if(K.attachEvent&&K.fireEvent)\{K.attachEvent("onclick",function()\{o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)\});K.cloneNode(true).fireEvent("onclick")\}o(function()\{var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"\})\})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props=\{"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"\};o.fn.extend(\{_load:o.fn.load,load:function(G,J,K)\{if(typeof G!=="string")\{return this._load(G)\}var I=G.indexOf(" ");if(I>=0)\{var E=G.slice(I,G.length);G=G.slice(0,I)\}var H="GET";if(J)\{if(o.isFunction(J))\{K=J;J=null\}else\{if(typeof J==="object")\{J=o.param(J);H="POST"\}\}\}var F=this;o.ajax(\{url:G,type:H,dataType:"html",data:J,complete:function(M,L)\{if(L=="success"||L=="notmodified")\{F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\\s)*?\\/script>/g,"")).find(E):M.responseText)\}if(K)\{F.each(K,[M.responseText,L,M])\}\}\});return this\},serialize:function()\{return o.param(this.serializeArray())\},serializeArray:function()\{return this.map(function()\{return this.elements?o.makeArray(this.elements):this\}).filter(function()\{return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))\}).map(function(E,F)\{var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H)\{return\{name:F.name,value:I\}\}):\{name:F.name,value:G\}\}).get()\}\});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F)\{o.fn[F]=function(G)\{return this.bind(F,G)\}\});var r=e();o.extend(\{get:function(E,G,H,F)\{if(o.isFunction(G))\{H=G;G=null\}return o.ajax(\{type:"GET",url:E,data:G,success:H,dataType:F\})\},getScript:function(E,F)\{return o.get(E,null,F,"script")\},getJSON:function(E,F,G)\{return o.get(E,F,G,"json")\},post:function(E,G,H,F)\{if(o.isFunction(G))\{H=G;G=\{\}\}return o.ajax(\{type:"POST",url:E,data:G,success:H,dataType:F\})\},ajaxSetup:function(E)\{o.extend(o.ajaxSettings,E)\},ajaxSettings:\{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function()\{return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()\},accepts:\{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"\}\},lastModified:\{\},ajax:function(M)\{M=o.extend(true,M,o.extend(true,\{\},o.ajaxSettings,M));var W,F=/=\\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string")\{M.data=o.param(M.data)\}if(M.dataType=="jsonp")\{if(G=="GET")\{if(!M.url.match(F))\{M.url+=(M.url.match(/\\?/)?"&":"?")+(M.jsonp||"callback")+"=?"\}\}else\{if(!M.data||!M.data.match(F))\{M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"\}\}M.dataType="json"\}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F)))\{W="jsonp"+r++;if(M.data)\{M.data=(M.data+"").replace(F,"="+W+"$1")\}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X)\{V=X;I();L();l[W]=g;try\{delete l[W]\}catch(Y)\{\}if(H)\{H.removeChild(T)\}\}\}if(M.dataType=="script"&&M.cache==null)\{M.cache=false\}if(M.cache===false&&G=="GET")\{var E=e();var U=M.url.replace(/(\\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\\?/)?"&":"?")+"_="+E:"")\}if(M.data&&G=="GET")\{M.url+=(M.url.match(/\\?/)?"&":"?")+M.data;M.data=null\}if(M.global&&!o.active++)\{o.event.trigger("ajaxStart")\}var Q=/^(\\w+:)?\\/\\/([^\\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host))\{var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset)\{T.charset=M.scriptCharset\}if(!W)\{var O=false;T.onload=T.onreadystatechange=function()\{if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"))\{O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)\}\}\}H.appendChild(T);return g\}var K=false;var J=M.xhr();if(M.username)\{J.open(G,M.url,M.async,M.username,M.password)\}else\{J.open(G,M.url,M.async)\}try\{if(M.data)\{J.setRequestHeader("Content-Type",M.contentType)\}if(M.ifModified)\{J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")\}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)\}catch(S)\{\}if(M.beforeSend&&M.beforeSend(J,M)===false)\{if(M.global&&!--o.active)\{o.event.trigger("ajaxStop")\}J.abort();return false\}if(M.global)\{o.event.trigger("ajaxSend",[J,M])\}var N=function(X)\{if(J.readyState==0)\{if(P)\{clearInterval(P);P=null;if(M.global&&!--o.active)\{o.event.trigger("ajaxStop")\}\}\}else\{if(!K&&J&&(J.readyState==4||X=="timeout"))\{K=true;if(P)\{clearInterval(P);P=null\}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success")\{try\{V=o.httpData(J,M.dataType,M)\}catch(Z)\{R="parsererror"\}\}if(R=="success")\{var Y;try\{Y=J.getResponseHeader("Last-Modified")\}catch(Z)\{\}if(M.ifModified&&Y)\{o.lastModified[M.url]=Y\}if(!W)\{I()\}\}else\{o.handleError(M,J,R)\}L();if(X)\{J.abort()\}if(M.async)\{J=null\}\}\}\};if(M.async)\{var P=setInterval(N,13);if(M.timeout>0)\{setTimeout(function()\{if(J&&!K)\{N("timeout")\}\},M.timeout)\}\}try\{J.send(M.data)\}catch(S)\{o.handleError(M,J,null,S)\}if(!M.async)\{N()\}function I()\{if(M.success)\{M.success(V,R)\}if(M.global)\{o.event.trigger("ajaxSuccess",[J,M])\}\}function L()\{if(M.complete)\{M.complete(J,R)\}if(M.global)\{o.event.trigger("ajaxComplete",[J,M])\}if(M.global&&!--o.active)\{o.event.trigger("ajaxStop")\}\}return J\},handleError:function(F,H,E,G)\{if(F.error)\{F.error(H,E,G)\}if(F.global)\{o.event.trigger("ajaxError",[H,F,G])\}\},active:0,httpSuccess:function(F)\{try\{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223\}catch(E)\{\}return false\},httpNotModified:function(G,E)\{try\{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]\}catch(F)\{\}return false\},httpData:function(J,H,G)\{var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror")\{throw"parsererror"\}if(G&&G.dataFilter)\{I=G.dataFilter(I,H)\}if(typeof I==="string")\{if(H=="script")\{o.globalEval(I)\}if(H=="json")\{I=l["eval"]("("+I+")")\}\}return I\},param:function(E)\{var G=[];function H(I,J)\{G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)\}if(o.isArray(E)||E.jquery)\{o.each(E,function()\{H(this.name,this.value)\})\}else\{for(var F in E)\{if(o.isArray(E[F]))\{o.each(E[F],function()\{H(F,this)\})\}else\{H(F,o.isFunction(E[F])?E[F]():E[F])\}\}\}return G.join("&").replace(/%20/g,"+")\}\});var m=\{\},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E)\{var G=\{\};o.each(d.concat.apply([],d.slice(0,E)),function()\{G[this]=F\});return G\}o.fn.extend(\{show:function(J,L)\{if(J)\{return this.animate(t("show",3),J,L)\}else\{for(var H=0,F=this.length;H<F;H++)\{var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none")\{var G=this[H].tagName,K;if(m[G])\{K=m[G]\}else\{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none")\{K="block"\}I.remove();m[G]=K\}o.data(this[H],"olddisplay",K)\}\}for(var H=0,F=this.length;H<F;H++)\{this[H].style.display=o.data(this[H],"olddisplay")||""\}return this\}\},hide:function(H,I)\{if(H)\{return this.animate(t("hide",3),H,I)\}else\{for(var G=0,F=this.length;G<F;G++)\{var E=o.data(this[G],"olddisplay");if(!E&&E!=="none")\{o.data(this[G],"olddisplay",o.css(this[G],"display"))\}\}for(var G=0,F=this.length;G<F;G++)\{this[G].style.display="none"\}return this\}\},_toggle:o.fn.toggle,toggle:function(G,F)\{var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function()\{var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()\}):this.animate(t("toggle",3),G,F)\},fadeTo:function(E,G,F)\{return this.animate(\{opacity:G\},E,F)\},animate:function(I,F,H,G)\{var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function()\{var K=o.extend(\{\},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I)\{if(I[M]=="hide"&&L||I[M]=="show"&&!L)\{return K.complete.call(this)\}if((M=="height"||M=="width")&&this.style)\{K.display=o.css(this,"display");K.overflow=this.style.overflow\}\}if(K.overflow!=null)\{this.style.overflow="hidden"\}K.curAnim=o.extend(\{\},I);o.each(I,function(O,S)\{var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S))\{R[S=="toggle"?L?"show":"hide":S](I)\}else\{var Q=S.toString().match(/^([+-]=)?([\\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q)\{var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px")\{J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P\}if(Q[1])\{N=((Q[1]=="-="?-1:1)*N)+T\}R.custom(T,N,P)\}else\{R.custom(T,S,"")\}\}\});return true\})\},stop:function(F,E)\{var G=o.timers;if(F)\{this.queue([])\}this.each(function()\{for(var H=G.length-1;H>=0;H--)\{if(G[H].elem==this)\{if(E)\{G[H](true)\}G.splice(H,1)\}\}\});if(!E)\{this.dequeue()\}return this\}\});o.each(\{slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:\{opacity:"show"\},fadeOut:\{opacity:"hide"\}\},function(E,F)\{o.fn[E]=function(G,H)\{return this.animate(F,G,H)\}\});o.extend(\{speed:function(G,H,F)\{var E=typeof G==="object"?G:\{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H\};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function()\{if(E.queue!==false)\{o(this).dequeue()\}if(o.isFunction(E.old))\{E.old.call(this)\}\};return E\},easing:\{linear:function(G,H,E,F)\{return E+F*G\},swing:function(G,H,E,F)\{return((-Math.cos(G*Math.PI)/2)+0.5)*F+E\}\},timers:[],fx:function(F,E,G)\{this.options=E;this.elem=F;this.prop=G;if(!E.orig)\{E.orig=\{\}\}\}\});o.fx.prototype=\{update:function()\{if(this.options.step)\{this.options.step.call(this.elem,this.now,this)\}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style)\{this.elem.style.display="block"\}\},cur:function(F)\{if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))\{return this.elem[this.prop]\}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0\},custom:function(I,H,G)\{this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J)\{return E.step(J)\}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n)\{n=setInterval(function()\{var K=o.timers;for(var J=0;J<K.length;J++)\{if(!K[J]())\{K.splice(J--,1)\}\}if(!K.length)\{clearInterval(n);n=g\}\},13)\}\},show:function()\{this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()\},hide:function()\{this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)\},step:function(H)\{var G=e();if(H||G>=this.options.duration+this.startTime)\{this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim)\{if(this.options.curAnim[F]!==true)\{E=false\}\}if(E)\{if(this.options.display!=null)\{this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none")\{this.elem.style.display="block"\}\}if(this.options.hide)\{o(this.elem).hide()\}if(this.options.hide||this.options.show)\{for(var I in this.options.curAnim)\{o.attr(this.elem.style,I,this.options.orig[I])\}\}this.options.complete.call(this.elem)\}return false\}else\{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()\}return true\}\};o.extend(o.fx,\{speeds:\{slow:600,fast:200,_default:400\},step:\{opacity:function(E)\{o.attr(E.elem.style,"opacity",E.now)\},_default:function(E)\{if(E.elem.style&&E.elem.style[E.prop]!=null)\{E.elem.style[E.prop]=E.now+E.unit\}else\{E.elem[E.prop]=E.now\}\}\}\});if(document.documentElement.getBoundingClientRect)\{o.fn.offset=function()\{if(!this[0])\{return\{top:0,left:0\}\}if(this[0]===this[0].ownerDocument.body)\{return o.offset.bodyOffset(this[0])\}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return\{top:I,left:H\}\}\}else\{o.fn.offset=function()\{if(!this[0])\{return\{top:0,left:0\}\}if(this[0]===this[0].ownerDocument.body)\{return o.offset.bodyOffset(this[0])\}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H)\{M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G)\{N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName)))\{N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0\}F=G,G=J.offsetParent\}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible")\{N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0\}E=M\}if(E.position==="relative"||E.position==="static")\{N+=K.offsetTop,I+=K.offsetLeft\}if(E.position==="fixed")\{N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)\}return\{top:N,left:I\}\}\}o.offset=\{initialize:function()\{if(this.initialized)\{return\}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M=\{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"\};for(E in M)\{F.style[E]=M[E]\}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true\},bodyOffset:function(E)\{o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset)\{G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0\}return\{top:G,left:F\}\}\};o.fn.extend(\{position:function()\{var I=0,H=0,F;if(this[0])\{var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?\{top:0,left:0\}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F=\{top:J.top-E.top,left:J.left-E.left\}\}return F\},offsetParent:function()\{var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static"))\{E=E.offsetParent\}return o(E)\}\});o.each(["Left","Top"],function(F,E)\{var G="scroll"+E;o.fn[G]=function(H)\{if(!this[0])\{return null\}return H!==g?this.each(function()\{this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H\}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]\}\});o.each(["Height","Width"],function(I,G)\{var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function()\{return this[0]?o.css(this[0],F,false,"padding"):null\};o.fn["outer"+G]=function(K)\{return this[0]?o.css(this[0],F,false,K?"margin":"border"):null\};var J=G.toLowerCase();o.fn[J]=function(K)\{return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")\}\})\})();\par
\par
/* Easing 1.3 */\par
jQuery.extend(jQuery.easing,\{easeOutBounce:function(x,t,b,c,d)\{if((t/=d)<(1/2.75))\{return c*(7.5625*t*t)+b;\}else if(t<(2/2.75))\{return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;\}else if(t<(2.5/2.75))\{return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;\}else\{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;\}\}\});\par
\par
/* jQuery Timer 0.1 */\par
jQuery.timer = function (interval, callback)\{\par
\tab var interval = interval || 100;\par
\tab if (!callback)return false;\par
\tab _timer = function (interval, callback) \{\par
\tab\tab this.stop = function () \{clearInterval(self.id);\};\par
\tab\tab this.internalCallback = function () \{callback(self);\};\par
\tab\tab this.reset = function (val) \{\par
\tab\tab\tab if (self.id)clearInterval(self.id);\par
\tab\tab\tab var val = val || 100;\par
\tab\tab\tab this.id = setInterval(this.internalCallback, val);\par
\tab\tab\};\par
\tab\tab this.interval = interval;\par
\tab\tab this.id = setInterval(this.internalCallback, this.interval);\par
\tab\tab var self = this;\par
\tab\};\par
\tab return new _timer(interval, callback);\par
 \};\par
 if(path == 'mod')\{\par
\tab $.timer(10000, function (timer) \{\par
\tab\tab location.reload();\par
\tab\});\par
 \}\par
  /*\par
 * jQuery UI Theme Dark Hive\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 */\par
$('head').append('<link type="text/css" href="http://jqueryui.com/latest/themes/base/ui.all.css" rel="stylesheet"/>');\par
var theme = GM_getValue('sharkale-theme','http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/dark-hive/jquery-ui.css');\par
$('head').append('<link href="'+theme+'" type="text/css" rel="Stylesheet" class="ui-theme">');\par
 \par
 /*\par
 * jQuery UI 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI\par
 */\par
jQuery.ui||(function(c)\{var i=c.fn.remove,d=c.browser.mozilla&&(parseFloat(c.browser.version)<1.9);c.ui=\{version:"1.7.2",plugin:\{add:function(k,l,n)\{var m=c.ui[k].prototype;for(var j in n)\{m.plugins[j]=m.plugins[j]||[];m.plugins[j].push([l,n[j]])\}\},call:function(j,l,k)\{var n=j.plugins[l];if(!n||!j.element[0].parentNode)\{return\}for(var m=0;m<n.length;m++)\{if(j.options[n[m][0]])\{n[m][1].apply(j.element,k)\}\}\}\},contains:function(k,j)\{return document.compareDocumentPosition?k.compareDocumentPosition(j)&16:k!==j&&k.contains(j)\},hasScroll:function(m,k)\{if(c(m).css("overflow")=="hidden")\{return false\}var j=(k&&k=="left")?"scrollLeft":"scrollTop",l=false;if(m[j]>0)\{return true\}m[j]=1;l=(m[j]>0);m[j]=0;return l\},isOverAxis:function(k,j,l)\{return(k>j)&&(k<(j+l))\},isOver:function(o,k,n,m,j,l)\{return c.ui.isOverAxis(o,n,j)&&c.ui.isOverAxis(k,m,l)\},keyCode:\{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38\}\};if(d)\{var f=c.attr,e=c.fn.removeAttr,h="http://www.w3.org/2005/07/aaa",a=/^aria-/,b=/^wairole:/;c.attr=function(k,j,l)\{var m=l!==undefined;return(j=="role"?(m?f.call(this,k,j,"wairole:"+l):(f.apply(this,arguments)||"").replace(b,"")):(a.test(j)?(m?k.setAttributeNS(h,j.replace(a,"aaa:"),l):f.call(this,k,j.replace(a,"aaa:"))):f.apply(this,arguments)))\};c.fn.removeAttr=function(j)\{return(a.test(j)?this.each(function()\{this.removeAttributeNS(h,j.replace(a,""))\}):e.call(this,j))\}\}c.fn.extend(\{remove:function()\{c("*",this).add(this).each(function()\{c(this).triggerHandler("remove")\});return i.apply(this,arguments)\},enableSelection:function()\{return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")\},disableSelection:function()\{return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function()\{return false\})\},scrollParent:function()\{var j;if((c.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position")))\{j=this.parents().filter(function()\{return(/(relative|absolute|fixed)/).test(c.curCSS(this,"position",1))&&(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))\}).eq(0)\}else\{j=this.parents().filter(function()\{return(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))\}).eq(0)\}return(/fixed/).test(this.css("position"))||!j.length?c(document):j\}\});c.extend(c.expr[":"],\{data:function(l,k,j)\{return !!c.data(l,j[3])\},focusable:function(k)\{var l=k.nodeName.toLowerCase(),j=c.attr(k,"tabindex");return(/input|select|textarea|button|object/.test(l)?!k.disabled:"a"==l||"area"==l?k.href||!isNaN(j):!isNaN(j))&&!c(k)["area"==l?"parents":"closest"](":hidden").length\},tabbable:function(k)\{var j=c.attr(k,"tabindex");return(isNaN(j)||j>=0)&&c(k).is(":focusable")\}\});function g(m,n,o,l)\{function k(q)\{var p=c[m][n][q]||[];return(typeof p=="string"?p.split(/,?\\s+/):p)\}var j=k("getter");if(l.length==1&&typeof l[0]=="string")\{j=j.concat(k("getterSetter"))\}return(c.inArray(o,j)!=-1)\}c.widget=function(k,j)\{var l=k.split(".")[0];k=k.split(".")[1];c.fn[k]=function(p)\{var n=(typeof p=="string"),o=Array.prototype.slice.call(arguments,1);if(n&&p.substring(0,1)=="_")\{return this\}if(n&&g(l,k,p,o))\{var m=c.data(this[0],k);return(m?m[p].apply(m,o):undefined)\}return this.each(function()\{var q=c.data(this,k);(!q&&!n&&c.data(this,k,new c[l][k](this,p))._init());(q&&n&&c.isFunction(q[p])&&q[p].apply(q,o))\})\};c[l]=c[l]||\{\};c[l][k]=function(o,n)\{var m=this;this.namespace=l;this.widgetName=k;this.widgetEventPrefix=c[l][k].eventPrefix||k;this.widgetBaseClass=l+"-"+k;this.options=c.extend(\{\},c.widget.defaults,c[l][k].defaults,c.metadata&&c.metadata.get(o)[k],n);this.element=c(o).bind("setData."+k,function(q,p,r)\{if(q.target==o)\{return m._setData(p,r)\}\}).bind("getData."+k,function(q,p)\{if(q.target==o)\{return m._getData(p)\}\}).bind("remove",function()\{return m.destroy()\})\};c[l][k].prototype=c.extend(\{\},c.widget.prototype,j);c[l][k].getterSetter="option"\};c.widget.prototype=\{_init:function()\{\},destroy:function()\{this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").removeAttr("aria-disabled")\},option:function(l,m)\{var k=l,j=this;if(typeof l=="string")\{if(m===undefined)\{return this._getData(l)\}k=\{\};k[l]=m\}c.each(k,function(n,o)\{j._setData(n,o)\})\},_getData:function(j)\{return this.options[j]\},_setData:function(j,k)\{this.options[j]=k;if(j=="disabled")\{this.element[k?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",k)\}\},enable:function()\{this._setData("disabled",false)\},disable:function()\{this._setData("disabled",true)\},_trigger:function(l,m,n)\{var p=this.options[l],j=(l==this.widgetEventPrefix?l:this.widgetEventPrefix+l);m=c.Event(m);m.type=j;if(m.originalEvent)\{for(var k=c.event.props.length,o;k;)\{o=c.event.props[--k];m[o]=m.originalEvent[o]\}\}this.element.trigger(m,n);return !(c.isFunction(p)&&p.call(this.element[0],m,n)===false||m.isDefaultPrevented())\}\};c.widget.defaults=\{disabled:false\};c.ui.mouse=\{_mouseInit:function()\{var j=this;this.element.bind("mousedown."+this.widgetName,function(k)\{return j._mouseDown(k)\}).bind("click."+this.widgetName,function(k)\{if(j._preventClickEvent)\{j._preventClickEvent=false;k.stopImmediatePropagation();return false\}\});if(c.browser.msie)\{this._mouseUnselectable=this.element.attr("unselectable");this.element.attr("unselectable","on")\}this.started=false\},_mouseDestroy:function()\{this.element.unbind("."+this.widgetName);(c.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))\},_mouseDown:function(l)\{l.originalEvent=l.originalEvent||\{\};if(l.originalEvent.mouseHandled)\{return\}(this._mouseStarted&&this._mouseUp(l));this._mouseDownEvent=l;var k=this,m=(l.which==1),j=(typeof this.options.cancel=="string"?c(l.target).parents().add(l.target).filter(this.options.cancel).length:false);if(!m||j||!this._mouseCapture(l))\{return true\}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)\{this._mouseDelayTimer=setTimeout(function()\{k.mouseDelayMet=true\},this.options.delay)\}if(this._mouseDistanceMet(l)&&this._mouseDelayMet(l))\{this._mouseStarted=(this._mouseStart(l)!==false);if(!this._mouseStarted)\{l.preventDefault();return true\}\}this._mouseMoveDelegate=function(n)\{return k._mouseMove(n)\};this._mouseUpDelegate=function(n)\{return k._mouseUp(n)\};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);(c.browser.safari||l.preventDefault());l.originalEvent.mouseHandled=true;return true\},_mouseMove:function(j)\{if(c.browser.msie&&!j.button)\{return this._mouseUp(j)\}if(this._mouseStarted)\{this._mouseDrag(j);return j.preventDefault()\}if(this._mouseDistanceMet(j)&&this._mouseDelayMet(j))\{this._mouseStarted=(this._mouseStart(this._mouseDownEvent,j)!==false);(this._mouseStarted?this._mouseDrag(j):this._mouseUp(j))\}return !this._mouseStarted\},_mouseUp:function(j)\{c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted)\{this._mouseStarted=false;this._preventClickEvent=(j.target==this._mouseDownEvent.target);this._mouseStop(j)\}return false\},_mouseDistanceMet:function(j)\{return(Math.max(Math.abs(this._mouseDownEvent.pageX-j.pageX),Math.abs(this._mouseDownEvent.pageY-j.pageY))>=this.options.distance)\},_mouseDelayMet:function(j)\{return this.mouseDelayMet\},_mouseStart:function(j)\{\},_mouseDrag:function(j)\{\},_mouseStop:function(j)\{\},_mouseCapture:function(j)\{return true\}\};c.ui.mouse.defaults=\{cancel:null,distance:1,delay:0\}\})(jQuery);;/*\par
 * jQuery UI Draggable 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Draggables\par
 *\par
 * Depends:\par
 *\tab ui.core.js\par
 */\par
(function(a)\{a.widget("ui.draggable",a.extend(\{\},a.ui.mouse,\{_init:function()\{if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position")))\{this.element[0].style.position="relative"\}(this.options.addClasses&&this.element.addClass("ui-draggable"));(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));this._mouseInit()\},destroy:function()\{if(!this.element.data("draggable"))\{return\}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy()\},_mouseCapture:function(b)\{var c=this.options;if(this.helper||c.disabled||a(b.target).is(".ui-resizable-handle"))\{return false\}this.handle=this._getHandle(b);if(!this.handle)\{return false\}return true\},_mouseStart:function(b)\{var c=this.options;this.helper=this._createHelper(b);this._cacheHelperProportions();if(a.ui.ddmanager)\{a.ui.ddmanager.current=this\}this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.element.offset();this.offset=\{top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left\};a.extend(this.offset,\{click:\{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top\},parent:this._getParentOffset(),relative:this._getRelativeOffset()\});this.originalPosition=this._generatePosition(b);this.originalPageX=b.pageX;this.originalPageY=b.pageY;if(c.cursorAt)\{this._adjustOffsetFromHelper(c.cursorAt)\}if(c.containment)\{this._setContainment()\}this._trigger("start",b);this._cacheHelperProportions();if(a.ui.ddmanager&&!c.dropBehaviour)\{a.ui.ddmanager.prepareOffsets(this,b)\}this.helper.addClass("ui-draggable-dragging");this._mouseDrag(b,true);return true\},_mouseDrag:function(b,d)\{this.position=this._generatePosition(b);this.positionAbs=this._convertPositionTo("absolute");if(!d)\{var c=this._uiHash();this._trigger("drag",b,c);this.position=c.position\}if(!this.options.axis||this.options.axis!="y")\{this.helper[0].style.left=this.position.left+"px"\}if(!this.options.axis||this.options.axis!="x")\{this.helper[0].style.top=this.position.top+"px"\}if(a.ui.ddmanager)\{a.ui.ddmanager.drag(this,b)\}return false\},_mouseStop:function(c)\{var d=false;if(a.ui.ddmanager&&!this.options.dropBehaviour)\{d=a.ui.ddmanager.drop(this,c)\}if(this.dropped)\{d=this.dropped;this.dropped=false\}if((this.options.revert=="invalid"&&!d)||(this.options.revert=="valid"&&d)||this.options.revert===true||(a.isFunction(this.options.revert)&&this.options.revert.call(this.element,d)))\{var b=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function()\{b._trigger("stop",c);b._clear()\})\}else\{this._trigger("stop",c);this._clear()\}return false\},_getHandle:function(b)\{var c=!this.options.handle||!a(this.options.handle,this.element).length?true:false;a(this.options.handle,this.element).find("*").andSelf().each(function()\{if(this==b.target)\{c=true\}\});return c\},_createHelper:function(c)\{var d=this.options;var b=a.isFunction(d.helper)?a(d.helper.apply(this.element[0],[c])):(d.helper=="clone"?this.element.clone():this.element);if(!b.parents("body").length)\{b.appendTo((d.appendTo=="parent"?this.element[0].parentNode:d.appendTo))\}if(b[0]!=this.element[0]&&!(/(fixed|absolute)/).test(b.css("position")))\{b.css("position","absolute")\}return b\},_adjustOffsetFromHelper:function(b)\{if(b.left!=undefined)\{this.offset.click.left=b.left+this.margins.left\}if(b.right!=undefined)\{this.offset.click.left=this.helperProportions.width-b.right+this.margins.left\}if(b.top!=undefined)\{this.offset.click.top=b.top+this.margins.top\}if(b.bottom!=undefined)\{this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top\}\},_getParentOffset:function()\{this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))\{b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()\}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie))\{b=\{top:0,left:0\}\}return\{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)\}\},_getRelativeOffset:function()\{if(this.cssPosition=="relative")\{var b=this.element.position();return\{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()\}\}else\{return\{top:0,left:0\}\}\},_cacheMargins:function()\{this.margins=\{left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)\}\},_cacheHelperProportions:function()\{this.helperProportions=\{width:this.helper.outerWidth(),height:this.helper.outerHeight()\}\},_setContainment:function()\{var e=this.options;if(e.containment=="parent")\{e.containment=this.helper[0].parentNode\}if(e.containment=="document"||e.containment=="window")\{this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]\}if(!(/^(document|window|parent)$/).test(e.containment)&&e.containment.constructor!=Array)\{var c=a(e.containment)[0];if(!c)\{return\}var d=a(e.containment).offset();var b=(a(c).css("overflow")!="hidden");this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]\}else\{if(e.containment.constructor==Array)\{this.containment=e.containment\}\}\},_convertPositionTo:function(f,h)\{if(!h)\{h=this.position\}var c=f=="absolute"?1:-1;var e=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=(/(html|body)/i).test(b[0].tagName);return\{top:(h.top+this.offset.relative.top*c+this.offset.parent.top*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(g?0:b.scrollTop()))*c)),left:(h.left+this.offset.relative.left*c+this.offset.parent.left*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:b.scrollLeft())*c))\}\},_generatePosition:function(e)\{var h=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(b[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))\{this.offset.relative=this._getRelativeOffset()\}var d=e.pageX;var c=e.pageY;if(this.originalPosition)\{if(this.containment)\{if(e.pageX-this.offset.click.left<this.containment[0])\{d=this.containment[0]+this.offset.click.left\}if(e.pageY-this.offset.click.top<this.containment[1])\{c=this.containment[1]+this.offset.click.top\}if(e.pageX-this.offset.click.left>this.containment[2])\{d=this.containment[2]+this.offset.click.left\}if(e.pageY-this.offset.click.top>this.containment[3])\{c=this.containment[3]+this.offset.click.top\}\}if(h.grid)\{var g=this.originalPageY+Math.round((c-this.originalPageY)/h.grid[1])*h.grid[1];c=this.containment?(!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:(!(g-this.offset.click.top<this.containment[1])?g-h.grid[1]:g+h.grid[1])):g;var f=this.originalPageX+Math.round((d-this.originalPageX)/h.grid[0])*h.grid[0];d=this.containment?(!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:(!(f-this.offset.click.left<this.containment[0])?f-h.grid[0]:f+h.grid[0])):f\}\}return\{top:(c-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:b.scrollTop())))),left:(d-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:b.scrollLeft())))\}\},_clear:function()\{this.helper.removeClass("ui-draggable-dragging");if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval)\{this.helper.remove()\}this.helper=null;this.cancelHelperRemoval=false\},_trigger:function(b,c,d)\{d=d||this._uiHash();a.ui.plugin.call(this,b,[c,d]);if(b=="drag")\{this.positionAbs=this._convertPositionTo("absolute")\}return a.widget.prototype._trigger.call(this,b,c,d)\},plugins:\{\},_uiHash:function(b)\{return\{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,offset:this.positionAbs\}\}\}));a.extend(a.ui.draggable,\{version:"1.7.2",eventPrefix:"drag",defaults:\{addClasses:true,appendTo:"parent",axis:false,cancel:":input,option",connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false\}\});a.ui.plugin.add("draggable","connectToSortable",\{start:function(c,e)\{var d=a(this).data("draggable"),f=d.options,b=a.extend(\{\},e,\{item:d.element\});d.sortables=[];a(f.connectToSortable).each(function()\{var g=a.data(this,"sortable");if(g&&!g.options.disabled)\{d.sortables.push(\{instance:g,shouldRevert:g.options.revert\});g._refreshItems();g._trigger("activate",c,b)\}\})\},stop:function(c,e)\{var d=a(this).data("draggable"),b=a.extend(\{\},e,\{item:d.element\});a.each(d.sortables,function()\{if(this.instance.isOver)\{this.instance.isOver=0;d.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)\{this.instance.options.revert=true\}this.instance._mouseStop(c);this.instance.options.helper=this.instance.options._helper;if(d.options.helper=="original")\{this.instance.currentItem.css(\{top:"auto",left:"auto"\})\}\}else\{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",c,b)\}\})\},drag:function(c,f)\{var e=a(this).data("draggable"),b=this;var d=function(i)\{var n=this.offset.click.top,m=this.offset.click.left;var g=this.positionAbs.top,k=this.positionAbs.left;var j=i.height,l=i.width;var p=i.top,h=i.left;return a.ui.isOver(g+n,k+m,p,h,j,l)\};a.each(e.sortables,function(g)\{this.instance.positionAbs=e.positionAbs;this.instance.helperProportions=e.helperProportions;this.instance.offset.click=e.offset.click;if(this.instance._intersectsWith(this.instance.containerCache))\{if(!this.instance.isOver)\{this.instance.isOver=1;this.instance.currentItem=a(b).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function()\{return f.helper[0]\};c.target=this.instance.currentItem[0];this.instance._mouseCapture(c,true);this.instance._mouseStart(c,true,true);this.instance.offset.click.top=e.offset.click.top;this.instance.offset.click.left=e.offset.click.left;this.instance.offset.parent.left-=e.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=e.offset.parent.top-this.instance.offset.parent.top;e._trigger("toSortable",c);e.dropped=this.instance.element;e.currentItem=e.element;this.instance.fromOutside=e\}if(this.instance.currentItem)\{this.instance._mouseDrag(c)\}\}else\{if(this.instance.isOver)\{this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",c,this.instance._uiHash(this.instance));this.instance._mouseStop(c,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();if(this.instance.placeholder)\{this.instance.placeholder.remove()\}e._trigger("fromSortable",c);e.dropped=false\}\}\})\}\});a.ui.plugin.add("draggable","cursor",\{start:function(c,d)\{var b=a("body"),e=a(this).data("draggable").options;if(b.css("cursor"))\{e._cursor=b.css("cursor")\}b.css("cursor",e.cursor)\},stop:function(b,c)\{var d=a(this).data("draggable").options;if(d._cursor)\{a("body").css("cursor",d._cursor)\}\}\});a.ui.plugin.add("draggable","iframeFix",\{start:function(b,c)\{var d=a(this).data("draggable").options;a(d.iframeFix===true?"iframe":d.iframeFix).each(function()\{a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css(\{width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000\}).css(a(this).offset()).appendTo("body")\})\},stop:function(b,c)\{a("div.ui-draggable-iframeFix").each(function()\{this.parentNode.removeChild(this)\})\}\});a.ui.plugin.add("draggable","opacity",\{start:function(c,d)\{var b=a(d.helper),e=a(this).data("draggable").options;if(b.css("opacity"))\{e._opacity=b.css("opacity")\}b.css("opacity",e.opacity)\},stop:function(b,c)\{var d=a(this).data("draggable").options;if(d._opacity)\{a(c.helper).css("opacity",d._opacity)\}\}\});a.ui.plugin.add("draggable","scroll",\{start:function(c,d)\{var b=a(this).data("draggable");if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML")\{b.overflowOffset=b.scrollParent.offset()\}\},drag:function(d,e)\{var c=a(this).data("draggable"),f=c.options,b=false;if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML")\{if(!f.axis||f.axis!="x")\{if((c.overflowOffset.top+c.scrollParent[0].offsetHeight)-d.pageY<f.scrollSensitivity)\{c.scrollParent[0].scrollTop=b=c.scrollParent[0].scrollTop+f.scrollSpeed\}else\{if(d.pageY-c.overflowOffset.top<f.scrollSensitivity)\{c.scrollParent[0].scrollTop=b=c.scrollParent[0].scrollTop-f.scrollSpeed\}\}\}if(!f.axis||f.axis!="y")\{if((c.overflowOffset.left+c.scrollParent[0].offsetWidth)-d.pageX<f.scrollSensitivity)\{c.scrollParent[0].scrollLeft=b=c.scrollParent[0].scrollLeft+f.scrollSpeed\}else\{if(d.pageX-c.overflowOffset.left<f.scrollSensitivity)\{c.scrollParent[0].scrollLeft=b=c.scrollParent[0].scrollLeft-f.scrollSpeed\}\}\}\}else\{if(!f.axis||f.axis!="x")\{if(d.pageY-a(document).scrollTop()<f.scrollSensitivity)\{b=a(document).scrollTop(a(document).scrollTop()-f.scrollSpeed)\}else\{if(a(window).height()-(d.pageY-a(document).scrollTop())<f.scrollSensitivity)\{b=a(document).scrollTop(a(document).scrollTop()+f.scrollSpeed)\}\}\}if(!f.axis||f.axis!="y")\{if(d.pageX-a(document).scrollLeft()<f.scrollSensitivity)\{b=a(document).scrollLeft(a(document).scrollLeft()-f.scrollSpeed)\}else\{if(a(window).width()-(d.pageX-a(document).scrollLeft())<f.scrollSensitivity)\{b=a(document).scrollLeft(a(document).scrollLeft()+f.scrollSpeed)\}\}\}\}if(b!==false&&a.ui.ddmanager&&!f.dropBehaviour)\{a.ui.ddmanager.prepareOffsets(c,d)\}\}\});a.ui.plugin.add("draggable","snap",\{start:function(c,d)\{var b=a(this).data("draggable"),e=b.options;b.snapElements=[];a(e.snap.constructor!=String?(e.snap.items||":data(draggable)"):e.snap).each(function()\{var g=a(this);var f=g.offset();if(this!=b.element[0])\{b.snapElements.push(\{item:this,width:g.outerWidth(),height:g.outerHeight(),top:f.top,left:f.left\})\}\})\},drag:function(u,p)\{var g=a(this).data("draggable"),q=g.options;var y=q.snapTolerance;var x=p.offset.left,w=x+g.helperProportions.width,f=p.offset.top,e=f+g.helperProportions.height;for(var v=g.snapElements.length-1;v>=0;v--)\{var s=g.snapElements[v].left,n=s+g.snapElements[v].width,m=g.snapElements[v].top,A=m+g.snapElements[v].height;if(!((s-y<x&&x<n+y&&m-y<f&&f<A+y)||(s-y<x&&x<n+y&&m-y<e&&e<A+y)||(s-y<w&&w<n+y&&m-y<f&&f<A+y)||(s-y<w&&w<n+y&&m-y<e&&e<A+y)))\{if(g.snapElements[v].snapping)\{(g.options.snap.release&&g.options.snap.release.call(g.element,u,a.extend(g._uiHash(),\{snapItem:g.snapElements[v].item\})))\}g.snapElements[v].snapping=false;continue\}if(q.snapMode!="inner")\{var c=Math.abs(m-e)<=y;var z=Math.abs(A-f)<=y;var j=Math.abs(s-w)<=y;var k=Math.abs(n-x)<=y;if(c)\{p.position.top=g._convertPositionTo("relative",\{top:m-g.helperProportions.height,left:0\}).top-g.margins.top\}if(z)\{p.position.top=g._convertPositionTo("relative",\{top:A,left:0\}).top-g.margins.top\}if(j)\{p.position.left=g._convertPositionTo("relative",\{top:0,left:s-g.helperProportions.width\}).left-g.margins.left\}if(k)\{p.position.left=g._convertPositionTo("relative",\{top:0,left:n\}).left-g.margins.left\}\}var h=(c||z||j||k);if(q.snapMode!="outer")\{var c=Math.abs(m-f)<=y;var z=Math.abs(A-e)<=y;var j=Math.abs(s-x)<=y;var k=Math.abs(n-w)<=y;if(c)\{p.position.top=g._convertPositionTo("relative",\{top:m,left:0\}).top-g.margins.top\}if(z)\{p.position.top=g._convertPositionTo("relative",\{top:A-g.helperProportions.height,left:0\}).top-g.margins.top\}if(j)\{p.position.left=g._convertPositionTo("relative",\{top:0,left:s\}).left-g.margins.left\}if(k)\{p.position.left=g._convertPositionTo("relative",\{top:0,left:n-g.helperProportions.width\}).left-g.margins.left\}\}if(!g.snapElements[v].snapping&&(c||z||j||k||h))\{(g.options.snap.snap&&g.options.snap.snap.call(g.element,u,a.extend(g._uiHash(),\{snapItem:g.snapElements[v].item\})))\}g.snapElements[v].snapping=(c||z||j||k||h)\}\}\});a.ui.plugin.add("draggable","stack",\{start:function(b,c)\{var e=a(this).data("draggable").options;var d=a.makeArray(a(e.stack.group)).sort(function(g,f)\{return(parseInt(a(g).css("zIndex"),10)||e.stack.min)-(parseInt(a(f).css("zIndex"),10)||e.stack.min)\});a(d).each(function(f)\{this.style.zIndex=e.stack.min+f\});this[0].style.zIndex=e.stack.min+d.length\}\});a.ui.plugin.add("draggable","zIndex",\{start:function(c,d)\{var b=a(d.helper),e=a(this).data("draggable").options;if(b.css("zIndex"))\{e._zIndex=b.css("zIndex")\}b.css("zIndex",e.zIndex)\},stop:function(b,c)\{var d=a(this).data("draggable").options;if(d._zIndex)\{a(c.helper).css("zIndex",d._zIndex)\}\}\})\})(jQuery);;/*\par
 * jQuery UI Droppable 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Droppables\par
 *\par
 * Depends:\par
 *\tab ui.core.js\par
 *\tab ui.draggable.js\par
 */\par
(function(a)\{a.widget("ui.droppable",\{_init:function()\{var c=this.options,b=c.accept;this.isover=0;this.isout=1;this.options.accept=this.options.accept&&a.isFunction(this.options.accept)?this.options.accept:function(e)\{return e.is(b)\};this.proportions=\{width:this.element[0].offsetWidth,height:this.element[0].offsetHeight\};a.ui.ddmanager.droppables[this.options.scope]=a.ui.ddmanager.droppables[this.options.scope]||[];a.ui.ddmanager.droppables[this.options.scope].push(this);(this.options.addClasses&&this.element.addClass("ui-droppable"))\},destroy:function()\{var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++)\{if(b[c]==this)\{b.splice(c,1)\}\}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable")\},_setData:function(b,c)\{if(b=="accept")\{this.options.accept=c&&a.isFunction(c)?c:function(e)\{return e.is(c)\}\}else\{a.widget.prototype._setData.apply(this,arguments)\}\},_activate:function(c)\{var b=a.ui.ddmanager.current;if(this.options.activeClass)\{this.element.addClass(this.options.activeClass)\}(b&&this._trigger("activate",c,this.ui(b)))\},_deactivate:function(c)\{var b=a.ui.ddmanager.current;if(this.options.activeClass)\{this.element.removeClass(this.options.activeClass)\}(b&&this._trigger("deactivate",c,this.ui(b)))\},_over:function(c)\{var b=a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0])\{return\}if(this.options.accept.call(this.element[0],(b.currentItem||b.element)))\{if(this.options.hoverClass)\{this.element.addClass(this.options.hoverClass)\}this._trigger("over",c,this.ui(b))\}\},_out:function(c)\{var b=a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0])\{return\}if(this.options.accept.call(this.element[0],(b.currentItem||b.element)))\{if(this.options.hoverClass)\{this.element.removeClass(this.options.hoverClass)\}this._trigger("out",c,this.ui(b))\}\},_drop:function(c,d)\{var b=d||a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0])\{return false\}var e=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function()\{var f=a.data(this,"droppable");if(f.options.greedy&&a.ui.intersect(b,a.extend(f,\{offset:f.element.offset()\}),f.options.tolerance))\{e=true;return false\}\});if(e)\{return false\}if(this.options.accept.call(this.element[0],(b.currentItem||b.element)))\{if(this.options.activeClass)\{this.element.removeClass(this.options.activeClass)\}if(this.options.hoverClass)\{this.element.removeClass(this.options.hoverClass)\}this._trigger("drop",c,this.ui(b));return this.element\}return false\},ui:function(b)\{return\{draggable:(b.currentItem||b.element),helper:b.helper,position:b.position,absolutePosition:b.positionAbs,offset:b.positionAbs\}\}\});a.extend(a.ui.droppable,\{version:"1.7.2",eventPrefix:"drop",defaults:\{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"\}\});a.ui.intersect=function(q,j,o)\{if(!j.offset)\{return false\}var e=(q.positionAbs||q.position.absolute).left,d=e+q.helperProportions.width,n=(q.positionAbs||q.position.absolute).top,m=n+q.helperProportions.height;var g=j.offset.left,c=g+j.proportions.width,p=j.offset.top,k=p+j.proportions.height;switch(o)\{case"fit":return(g<e&&d<c&&p<n&&m<k);break;case"intersect":return(g<e+(q.helperProportions.width/2)&&d-(q.helperProportions.width/2)<c&&p<n+(q.helperProportions.height/2)&&m-(q.helperProportions.height/2)<k);break;case"pointer":var h=((q.positionAbs||q.position.absolute).left+(q.clickOffset||q.offset.click).left),i=((q.positionAbs||q.position.absolute).top+(q.clickOffset||q.offset.click).top),f=a.ui.isOver(i,h,p,g,j.proportions.height,j.proportions.width);return f;break;case"touch":return((n>=p&&n<=k)||(m>=p&&m<=k)||(n<p&&m>k))&&((e>=g&&e<=c)||(d>=g&&d<=c)||(e<g&&d>c));break;default:return false;break\}\};a.ui.ddmanager=\{current:null,droppables:\{"default":[]\},prepareOffsets:function(e,g)\{var b=a.ui.ddmanager.droppables[e.options.scope];var f=g?g.type:null;var h=(e.currentItem||e.element).find(":data(droppable)").andSelf();droppablesLoop:for(var d=0;d<b.length;d++)\{if(b[d].options.disabled||(e&&!b[d].options.accept.call(b[d].element[0],(e.currentItem||e.element))))\{continue\}for(var c=0;c<h.length;c++)\{if(h[c]==b[d].element[0])\{b[d].proportions.height=0;continue droppablesLoop\}\}b[d].visible=b[d].element.css("display")!="none";if(!b[d].visible)\{continue\}b[d].offset=b[d].element.offset();b[d].proportions=\{width:b[d].element[0].offsetWidth,height:b[d].element[0].offsetHeight\};if(f=="mousedown")\{b[d]._activate.call(b[d],g)\}\}\},drop:function(b,c)\{var d=false;a.each(a.ui.ddmanager.droppables[b.options.scope],function()\{if(!this.options)\{return\}if(!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance))\{d=this._drop.call(this,c)\}if(!this.options.disabled&&this.visible&&this.options.accept.call(this.element[0],(b.currentItem||b.element)))\{this.isout=1;this.isover=0;this._deactivate.call(this,c)\}\});return d\},drag:function(b,c)\{if(b.options.refreshPositions)\{a.ui.ddmanager.prepareOffsets(b,c)\}a.each(a.ui.ddmanager.droppables[b.options.scope],function()\{if(this.options.disabled||this.greedyChild||!this.visible)\{return\}var e=a.ui.intersect(b,this,this.options.tolerance);var g=!e&&this.isover==1?"isout":(e&&this.isover==0?"isover":null);if(!g)\{return\}var f;if(this.options.greedy)\{var d=this.element.parents(":data(droppable):eq(0)");if(d.length)\{f=a.data(d[0],"droppable");f.greedyChild=(g=="isover"?1:0)\}\}if(f&&g=="isover")\{f.isover=0;f.isout=1;f._out.call(f,c)\}this[g]=1;this[g=="isout"?"isover":"isout"]=0;this[g=="isover"?"_over":"_out"].call(this,c);if(f&&g=="isout")\{f.isout=0;f.isover=1;f._over.call(f,c)\}\})\}\}\})(jQuery);;/*\par
 * jQuery UI Resizable 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Resizables\par
 *\par
 * Depends:\par
 *\tab ui.core.js\par
 */\par
(function(c)\{c.widget("ui.resizable",c.extend(\{\},c.ui.mouse,\{_init:function()\{var e=this,j=this.options;this.element.addClass("ui-resizable");c.extend(this,\{_aspectRatio:!!(j.aspectRatio),aspectRatio:j.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:j.helper||j.ghost||j.animate?j.helper||"ui-resizable-helper":null\});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i))\{if(/relative/.test(this.element.css("position"))&&c.browser.opera)\{this.element.css(\{position:"relative",top:"auto",left:"auto"\})\}this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css(\{position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")\}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css(\{marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")\});this.originalElement.css(\{marginLeft:0,marginTop:0,marginRight:0,marginBottom:0\});this.originalResizeStyle=this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css(\{position:"static",zoom:1,display:"block"\}));this.originalElement.css(\{margin:this.originalElement.css("margin")\});this._proportionallyResize()\}this.handles=j.handles||(!c(".ui-resizable-handle",this.element).length?"e,s,se":\{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"\});if(this.handles.constructor==String)\{if(this.handles=="all")\{this.handles="n,e,s,w,se,sw,ne,nw"\}var k=this.handles.split(",");this.handles=\{\};for(var f=0;f<k.length;f++)\{var h=c.trim(k[f]),d="ui-resizable-"+h;var g=c('<div class="ui-resizable-handle '+d+'"></div>');if(/sw|se|ne|nw/.test(h))\{g.css(\{zIndex:++j.zIndex\})\}if("se"==h)\{g.addClass("ui-icon ui-icon-gripsmall-diagonal-se")\}this.handles[h]=".ui-resizable-"+h;this.element.append(g)\}\}this._renderAxis=function(p)\{p=p||this.element;for(var m in this.handles)\{if(this.handles[m].constructor==String)\{this.handles[m]=c(this.handles[m],this.element).show()\}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i))\{var n=c(this.handles[m],this.element),o=0;o=/sw|ne|nw|se|n|s/.test(m)?n.outerHeight():n.outerWidth();var l=["padding",/ne|nw|n/.test(m)?"Top":/se|sw|s/.test(m)?"Bottom":/^e$/.test(m)?"Right":"Left"].join("");p.css(l,o);this._proportionallyResize()\}if(!c(this.handles[m]).length)\{continue\}\}\};this._renderAxis(this.element);this._handles=c(".ui-resizable-handle",this.element).disableSelection();this._handles.mouseover(function()\{if(!e.resizing)\{if(this.className)\{var i=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)\}e.axis=i&&i[1]?i[1]:"se"\}\});if(j.autoHide)\{this._handles.hide();c(this.element).addClass("ui-resizable-autohide").hover(function()\{c(this).removeClass("ui-resizable-autohide");e._handles.show()\},function()\{if(!e.resizing)\{c(this).addClass("ui-resizable-autohide");e._handles.hide()\}\})\}this._mouseInit()\},destroy:function()\{this._mouseDestroy();var d=function(f)\{c(f).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()\};if(this.elementIsWrapper)\{d(this.element);var e=this.element;e.parent().append(this.originalElement.css(\{position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")\})).end().remove()\}this.originalElement.css("resize",this.originalResizeStyle);d(this.originalElement)\},_mouseCapture:function(e)\{var f=false;for(var d in this.handles)\{if(c(this.handles[d])[0]==e.target)\{f=true\}\}return this.options.disabled||!!f\},_mouseStart:function(f)\{var i=this.options,e=this.element.position(),d=this.element;this.resizing=true;this.documentScroll=\{top:c(document).scrollTop(),left:c(document).scrollLeft()\};if(d.is(".ui-draggable")||(/absolute/).test(d.css("position")))\{d.css(\{position:"absolute",top:e.top,left:e.left\})\}if(c.browser.opera&&(/relative/).test(d.css("position")))\{d.css(\{position:"relative",top:"auto",left:"auto"\})\}this._renderProxy();var j=b(this.helper.css("left")),g=b(this.helper.css("top"));if(i.containment)\{j+=c(i.containment).scrollLeft()||0;g+=c(i.containment).scrollTop()||0\}this.offset=this.helper.offset();this.position=\{left:j,top:g\};this.size=this._helper?\{width:d.outerWidth(),height:d.outerHeight()\}:\{width:d.width(),height:d.height()\};this.originalSize=this._helper?\{width:d.outerWidth(),height:d.outerHeight()\}:\{width:d.width(),height:d.height()\};this.originalPosition=\{left:j,top:g\};this.sizeDiff=\{width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()\};this.originalMousePosition=\{left:f.pageX,top:f.pageY\};this.aspectRatio=(typeof i.aspectRatio=="number")?i.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);var h=c(".ui-resizable-"+this.axis).css("cursor");c("body").css("cursor",h=="auto"?this.axis+"-resize":h);d.addClass("ui-resizable-resizing");this._propagate("start",f);return true\},_mouseDrag:function(d)\{var g=this.helper,f=this.options,l=\{\},p=this,i=this.originalMousePosition,m=this.axis;var q=(d.pageX-i.left)||0,n=(d.pageY-i.top)||0;var h=this._change[m];if(!h)\{return false\}var k=h.apply(this,[d,q,n]),j=c.browser.msie&&c.browser.version<7,e=this.sizeDiff;if(this._aspectRatio||d.shiftKey)\{k=this._updateRatio(k,d)\}k=this._respectSize(k,d);this._propagate("resize",d);g.css(\{top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"\});if(!this._helper&&this._proportionallyResizeElements.length)\{this._proportionallyResize()\}this._updateCache(k);this._trigger("resize",d,this.ui());return false\},_mouseStop:function(g)\{this.resizing=false;var h=this.options,l=this;if(this._helper)\{var f=this._proportionallyResizeElements,d=f.length&&(/textarea/i).test(f[0].nodeName),e=d&&c.ui.hasScroll(f[0],"left")?0:l.sizeDiff.height,j=d?0:l.sizeDiff.width;var m=\{width:(l.size.width-j),height:(l.size.height-e)\},i=(parseInt(l.element.css("left"),10)+(l.position.left-l.originalPosition.left))||null,k=(parseInt(l.element.css("top"),10)+(l.position.top-l.originalPosition.top))||null;if(!h.animate)\{this.element.css(c.extend(m,\{top:k,left:i\}))\}l.helper.height(l.size.height);l.helper.width(l.size.width);if(this._helper&&!h.animate)\{this._proportionallyResize()\}\}c("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",g);if(this._helper)\{this.helper.remove()\}return false\},_updateCache:function(d)\{var e=this.options;this.offset=this.helper.offset();if(a(d.left))\{this.position.left=d.left\}if(a(d.top))\{this.position.top=d.top\}if(a(d.height))\{this.size.height=d.height\}if(a(d.width))\{this.size.width=d.width\}\},_updateRatio:function(g,f)\{var h=this.options,i=this.position,e=this.size,d=this.axis;if(g.height)\{g.width=(e.height*this.aspectRatio)\}else\{if(g.width)\{g.height=(e.width/this.aspectRatio)\}\}if(d=="sw")\{g.left=i.left+(e.width-g.width);g.top=null\}if(d=="nw")\{g.top=i.top+(e.height-g.height);g.left=i.left+(e.width-g.width)\}return g\},_respectSize:function(k,f)\{var i=this.helper,h=this.options,q=this._aspectRatio||f.shiftKey,p=this.axis,s=a(k.width)&&h.maxWidth&&(h.maxWidth<k.width),l=a(k.height)&&h.maxHeight&&(h.maxHeight<k.height),g=a(k.width)&&h.minWidth&&(h.minWidth>k.width),r=a(k.height)&&h.minHeight&&(h.minHeight>k.height);if(g)\{k.width=h.minWidth\}if(r)\{k.height=h.minHeight\}if(s)\{k.width=h.maxWidth\}if(l)\{k.height=h.maxHeight\}var e=this.originalPosition.left+this.originalSize.width,n=this.position.top+this.size.height;var j=/sw|nw|w/.test(p),d=/nw|ne|n/.test(p);if(g&&j)\{k.left=e-h.minWidth\}if(s&&j)\{k.left=e-h.maxWidth\}if(r&&d)\{k.top=n-h.minHeight\}if(l&&d)\{k.top=n-h.maxHeight\}var m=!k.width&&!k.height;if(m&&!k.left&&k.top)\{k.top=null\}else\{if(m&&!k.top&&k.left)\{k.left=null\}\}return k\},_proportionallyResize:function()\{var j=this.options;if(!this._proportionallyResizeElements.length)\{return\}var f=this.helper||this.element;for(var e=0;e<this._proportionallyResizeElements.length;e++)\{var g=this._proportionallyResizeElements[e];if(!this.borderDif)\{var d=[g.css("borderTopWidth"),g.css("borderRightWidth"),g.css("borderBottomWidth"),g.css("borderLeftWidth")],h=[g.css("paddingTop"),g.css("paddingRight"),g.css("paddingBottom"),g.css("paddingLeft")];this.borderDif=c.map(d,function(k,m)\{var l=parseInt(k,10)||0,n=parseInt(h[m],10)||0;return l+n\})\}if(c.browser.msie&&!(!(c(f).is(":hidden")||c(f).parents(":hidden").length)))\{continue\}g.css(\{height:(f.height()-this.borderDif[0]-this.borderDif[2])||0,width:(f.width()-this.borderDif[1]-this.borderDif[3])||0\})\}\},_renderProxy:function()\{var e=this.element,h=this.options;this.elementOffset=e.offset();if(this._helper)\{this.helper=this.helper||c('<div style="overflow:hidden;"></div>');var d=c.browser.msie&&c.browser.version<7,f=(d?1:0),g=(d?2:-1);this.helper.addClass(this._helper).css(\{width:this.element.outerWidth()+g,height:this.element.outerHeight()+g,position:"absolute",left:this.elementOffset.left-f+"px",top:this.elementOffset.top-f+"px",zIndex:++h.zIndex\});this.helper.appendTo("body").disableSelection()\}else\{this.helper=this.element\}\},_change:\{e:function(f,e,d)\{return\{width:this.originalSize.width+e\}\},w:function(g,e,d)\{var i=this.options,f=this.originalSize,h=this.originalPosition;return\{left:h.left+e,width:f.width-e\}\},n:function(g,e,d)\{var i=this.options,f=this.originalSize,h=this.originalPosition;return\{top:h.top+d,height:f.height-d\}\},s:function(f,e,d)\{return\{height:this.originalSize.height+d\}\},se:function(f,e,d)\{return c.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[f,e,d]))\},sw:function(f,e,d)\{return c.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[f,e,d]))\},ne:function(f,e,d)\{return c.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[f,e,d]))\},nw:function(f,e,d)\{return c.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[f,e,d]))\}\},_propagate:function(e,d)\{c.ui.plugin.call(this,e,[d,this.ui()]);(e!="resize"&&this._trigger(e,d,this.ui()))\},plugins:\{\},ui:function()\{return\{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition\}\}\}));c.extend(c.ui.resizable,\{version:"1.7.2",eventPrefix:"resize",defaults:\{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,cancel:":input,option",containment:false,delay:0,distance:1,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000\}\});c.ui.plugin.add("resizable","alsoResize",\{start:function(e,f)\{var d=c(this).data("resizable"),g=d.options;_store=function(h)\{c(h).each(function()\{c(this).data("resizable-alsoresize",\{width:parseInt(c(this).width(),10),height:parseInt(c(this).height(),10),left:parseInt(c(this).css("left"),10),top:parseInt(c(this).css("top"),10)\})\})\};if(typeof(g.alsoResize)=="object"&&!g.alsoResize.parentNode)\{if(g.alsoResize.length)\{g.alsoResize=g.alsoResize[0];_store(g.alsoResize)\}else\{c.each(g.alsoResize,function(h,i)\{_store(h)\})\}\}else\{_store(g.alsoResize)\}\},resize:function(f,h)\{var e=c(this).data("resizable"),i=e.options,g=e.originalSize,k=e.originalPosition;var j=\{height:(e.size.height-g.height)||0,width:(e.size.width-g.width)||0,top:(e.position.top-k.top)||0,left:(e.position.left-k.left)||0\},d=function(l,m)\{c(l).each(function()\{var p=c(this),q=c(this).data("resizable-alsoresize"),o=\{\},n=m&&m.length?m:["width","height","top","left"];c.each(n||["width","height","top","left"],function(r,t)\{var s=(q[t]||0)+(j[t]||0);if(s&&s>=0)\{o[t]=s||null\}\});if(/relative/.test(p.css("position"))&&c.browser.opera)\{e._revertToRelativePosition=true;p.css(\{position:"absolute",top:"auto",left:"auto"\})\}p.css(o)\})\};if(typeof(i.alsoResize)=="object"&&!i.alsoResize.nodeType)\{c.each(i.alsoResize,function(l,m)\{d(l,m)\})\}else\{d(i.alsoResize)\}\},stop:function(e,f)\{var d=c(this).data("resizable");if(d._revertToRelativePosition&&c.browser.opera)\{d._revertToRelativePosition=false;el.css(\{position:"relative"\})\}c(this).removeData("resizable-alsoresize-start")\}\});c.ui.plugin.add("resizable","animate",\{stop:function(h,m)\{var n=c(this).data("resizable"),i=n.options;var g=n._proportionallyResizeElements,d=g.length&&(/textarea/i).test(g[0].nodeName),e=d&&c.ui.hasScroll(g[0],"left")?0:n.sizeDiff.height,k=d?0:n.sizeDiff.width;var f=\{width:(n.size.width-k),height:(n.size.height-e)\},j=(parseInt(n.element.css("left"),10)+(n.position.left-n.originalPosition.left))||null,l=(parseInt(n.element.css("top"),10)+(n.position.top-n.originalPosition.top))||null;n.element.animate(c.extend(f,l&&j?\{top:l,left:j\}:\{\}),\{duration:i.animateDuration,easing:i.animateEasing,step:function()\{var o=\{width:parseInt(n.element.css("width"),10),height:parseInt(n.element.css("height"),10),top:parseInt(n.element.css("top"),10),left:parseInt(n.element.css("left"),10)\};if(g&&g.length)\{c(g[0]).css(\{width:o.width,height:o.height\})\}n._updateCache(o);n._propagate("resize",h)\}\})\}\});c.ui.plugin.add("resizable","containment",\{start:function(e,q)\{var s=c(this).data("resizable"),i=s.options,k=s.element;var f=i.containment,j=(f instanceof c)?f.get(0):(/parent/.test(f))?k.parent().get(0):f;if(!j)\{return\}s.containerElement=c(j);if(/document/.test(f)||f==document)\{s.containerOffset=\{left:0,top:0\};s.containerPosition=\{left:0,top:0\};s.parentData=\{element:c(document),left:0,top:0,width:c(document).width(),height:c(document).height()||document.body.parentNode.scrollHeight\}\}else\{var m=c(j),h=[];c(["Top","Right","Left","Bottom"]).each(function(p,o)\{h[p]=b(m.css("padding"+o))\});s.containerOffset=m.offset();s.containerPosition=m.position();s.containerSize=\{height:(m.innerHeight()-h[3]),width:(m.innerWidth()-h[1])\};var n=s.containerOffset,d=s.containerSize.height,l=s.containerSize.width,g=(c.ui.hasScroll(j,"left")?j.scrollWidth:l),r=(c.ui.hasScroll(j)?j.scrollHeight:d);s.parentData=\{element:j,left:n.left,top:n.top,width:g,height:r\}\}\},resize:function(f,p)\{var s=c(this).data("resizable"),h=s.options,e=s.containerSize,n=s.containerOffset,l=s.size,m=s.position,q=s._aspectRatio||f.shiftKey,d=\{top:0,left:0\},g=s.containerElement;if(g[0]!=document&&(/static/).test(g.css("position")))\{d=n\}if(m.left<(s._helper?n.left:0))\{s.size.width=s.size.width+(s._helper?(s.position.left-n.left):(s.position.left-d.left));if(q)\{s.size.height=s.size.width/h.aspectRatio\}s.position.left=h.helper?n.left:0\}if(m.top<(s._helper?n.top:0))\{s.size.height=s.size.height+(s._helper?(s.position.top-n.top):s.position.top);if(q)\{s.size.width=s.size.height*h.aspectRatio\}s.position.top=s._helper?n.top:0\}s.offset.left=s.parentData.left+s.position.left;s.offset.top=s.parentData.top+s.position.top;var k=Math.abs((s._helper?s.offset.left-d.left:(s.offset.left-d.left))+s.sizeDiff.width),r=Math.abs((s._helper?s.offset.top-d.top:(s.offset.top-n.top))+s.sizeDiff.height);var j=s.containerElement.get(0)==s.element.parent().get(0),i=/relative|absolute/.test(s.containerElement.css("position"));if(j&&i)\{k-=s.parentData.left\}if(k+s.size.width>=s.parentData.width)\{s.size.width=s.parentData.width-k;if(q)\{s.size.height=s.size.width/s.aspectRatio\}\}if(r+s.size.height>=s.parentData.height)\{s.size.height=s.parentData.height-r;if(q)\{s.size.width=s.size.height*s.aspectRatio\}\}\},stop:function(e,m)\{var p=c(this).data("resizable"),f=p.options,k=p.position,l=p.containerOffset,d=p.containerPosition,g=p.containerElement;var i=c(p.helper),q=i.offset(),n=i.outerWidth()-p.sizeDiff.width,j=i.outerHeight()-p.sizeDiff.height;if(p._helper&&!f.animate&&(/relative/).test(g.css("position")))\{c(this).css(\{left:q.left-d.left-l.left,width:n,height:j\})\}if(p._helper&&!f.animate&&(/static/).test(g.css("position")))\{c(this).css(\{left:q.left-d.left-l.left,width:n,height:j\})\}\}\});c.ui.plugin.add("resizable","ghost",\{start:function(f,g)\{var d=c(this).data("resizable"),h=d.options,e=d.size;d.ghost=d.originalElement.clone();d.ghost.css(\{opacity:0.25,display:"block",position:"relative",height:e.height,width:e.width,margin:0,left:0,top:0\}).addClass("ui-resizable-ghost").addClass(typeof h.ghost=="string"?h.ghost:"");d.ghost.appendTo(d.helper)\},resize:function(e,f)\{var d=c(this).data("resizable"),g=d.options;if(d.ghost)\{d.ghost.css(\{position:"relative",height:d.size.height,width:d.size.width\})\}\},stop:function(e,f)\{var d=c(this).data("resizable"),g=d.options;if(d.ghost&&d.helper)\{d.helper.get(0).removeChild(d.ghost.get(0))\}\}\});c.ui.plugin.add("resizable","grid",\{resize:function(d,l)\{var n=c(this).data("resizable"),g=n.options,j=n.size,h=n.originalSize,i=n.originalPosition,m=n.axis,k=g._aspectRatio||d.shiftKey;g.grid=typeof g.grid=="number"?[g.grid,g.grid]:g.grid;var f=Math.round((j.width-h.width)/(g.grid[0]||1))*(g.grid[0]||1),e=Math.round((j.height-h.height)/(g.grid[1]||1))*(g.grid[1]||1);if(/^(se|s|e)$/.test(m))\{n.size.width=h.width+f;n.size.height=h.height+e\}else\{if(/^(ne)$/.test(m))\{n.size.width=h.width+f;n.size.height=h.height+e;n.position.top=i.top-e\}else\{if(/^(sw)$/.test(m))\{n.size.width=h.width+f;n.size.height=h.height+e;n.position.left=i.left-f\}else\{n.size.width=h.width+f;n.size.height=h.height+e;n.position.top=i.top-e;n.position.left=i.left-f\}\}\}\}\});var b=function(d)\{return parseInt(d,10)||0\};var a=function(d)\{return !isNaN(parseInt(d,10))\}\})(jQuery);;/*\par
 * jQuery UI Selectable 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Selectables\par
 *\par
 * Depends:\par
 *\tab ui.core.js\par
 */\par
(function(a)\{a.widget("ui.selectable",a.extend(\{\},a.ui.mouse,\{_init:function()\{var b=this;this.element.addClass("ui-selectable");this.dragged=false;var c;this.refresh=function()\{c=a(b.options.filter,b.element[0]);c.each(function()\{var d=a(this);var e=d.offset();a.data(this,"selectable-item",\{element:this,$element:d,left:e.left,top:e.top,right:e.left+d.outerWidth(),bottom:e.top+d.outerHeight(),startselected:false,selected:d.hasClass("ui-selected"),selecting:d.hasClass("ui-selecting"),unselecting:d.hasClass("ui-unselecting")\})\})\};this.refresh();this.selectees=c.addClass("ui-selectee");this._mouseInit();this.helper=a(document.createElement("div")).css(\{border:"1px dotted black"\}).addClass("ui-selectable-helper")\},destroy:function()\{this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy()\},_mouseStart:function(d)\{var b=this;this.opos=[d.pageX,d.pageY];if(this.options.disabled)\{return\}var c=this.options;this.selectees=a(c.filter,this.element[0]);this._trigger("start",d);a(c.appendTo).append(this.helper);this.helper.css(\{"z-index":100,position:"absolute",left:d.clientX,top:d.clientY,width:0,height:0\});if(c.autoRefresh)\{this.refresh()\}this.selectees.filter(".ui-selected").each(function()\{var e=a.data(this,"selectable-item");e.startselected=true;if(!d.metaKey)\{e.$element.removeClass("ui-selected");e.selected=false;e.$element.addClass("ui-unselecting");e.unselecting=true;b._trigger("unselecting",d,\{unselecting:e.element\})\}\});a(d.target).parents().andSelf().each(function()\{var e=a.data(this,"selectable-item");if(e)\{e.$element.removeClass("ui-unselecting").addClass("ui-selecting");e.unselecting=false;e.selecting=true;e.selected=true;b._trigger("selecting",d,\{selecting:e.element\});return false\}\})\},_mouseDrag:function(i)\{var c=this;this.dragged=true;if(this.options.disabled)\{return\}var e=this.options;var d=this.opos[0],h=this.opos[1],b=i.pageX,g=i.pageY;if(d>b)\{var f=b;b=d;d=f\}if(h>g)\{var f=g;g=h;h=f\}this.helper.css(\{left:d,top:h,width:b-d,height:g-h\});this.selectees.each(function()\{var j=a.data(this,"selectable-item");if(!j||j.element==c.element[0])\{return\}var k=false;if(e.tolerance=="touch")\{k=(!(j.left>b||j.right<d||j.top>g||j.bottom<h))\}else\{if(e.tolerance=="fit")\{k=(j.left>d&&j.right<b&&j.top>h&&j.bottom<g)\}\}if(k)\{if(j.selected)\{j.$element.removeClass("ui-selected");j.selected=false\}if(j.unselecting)\{j.$element.removeClass("ui-unselecting");j.unselecting=false\}if(!j.selecting)\{j.$element.addClass("ui-selecting");j.selecting=true;c._trigger("selecting",i,\{selecting:j.element\})\}\}else\{if(j.selecting)\{if(i.metaKey&&j.startselected)\{j.$element.removeClass("ui-selecting");j.selecting=false;j.$element.addClass("ui-selected");j.selected=true\}else\{j.$element.removeClass("ui-selecting");j.selecting=false;if(j.startselected)\{j.$element.addClass("ui-unselecting");j.unselecting=true\}c._trigger("unselecting",i,\{unselecting:j.element\})\}\}if(j.selected)\{if(!i.metaKey&&!j.startselected)\{j.$element.removeClass("ui-selected");j.selected=false;j.$element.addClass("ui-unselecting");j.unselecting=true;c._trigger("unselecting",i,\{unselecting:j.element\})\}\}\}\});return false\},_mouseStop:function(d)\{var b=this;this.dragged=false;var c=this.options;a(".ui-unselecting",this.element[0]).each(function()\{var e=a.data(this,"selectable-item");e.$element.removeClass("ui-unselecting");e.unselecting=false;e.startselected=false;b._trigger("unselected",d,\{unselected:e.element\})\});a(".ui-selecting",this.element[0]).each(function()\{var e=a.data(this,"selectable-item");e.$element.removeClass("ui-selecting").addClass("ui-selected");e.selecting=false;e.selected=true;e.startselected=true;b._trigger("selected",d,\{selected:e.element\})\});this._trigger("stop",d);this.helper.remove();return false\}\}));a.extend(a.ui.selectable,\{version:"1.7.2",defaults:\{appendTo:"body",autoRefresh:true,cancel:":input,option",delay:0,distance:0,filter:"*",tolerance:"touch"\}\})\})(jQuery);;/*\par
 * jQuery UI Sortable 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Sortables\par
 *\par
 * Depends:\par
 *\tab ui.core.js\par
 */\par
(function(a)\{a.widget("ui.sortable",a.extend(\{\},a.ui.mouse,\{_init:function()\{var b=this.options;this.containerCache=\{\};this.element.addClass("ui-sortable");this.refresh();this.floating=this.items.length?(/left|right/).test(this.items[0].item.css("float")):false;this.offset=this.element.offset();this._mouseInit()\},destroy:function()\{this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var b=this.items.length-1;b>=0;b--)\{this.items[b].item.removeData("sortable-item")\}\},_mouseCapture:function(e,f)\{if(this.reverting)\{return false\}if(this.options.disabled||this.options.type=="static")\{return false\}this._refreshItems(e);var d=null,c=this,b=a(e.target).parents().each(function()\{if(a.data(this,"sortable-item")==c)\{d=a(this);return false\}\});if(a.data(e.target,"sortable-item")==c)\{d=a(e.target)\}if(!d)\{return false\}if(this.options.handle&&!f)\{var g=false;a(this.options.handle,d).find("*").andSelf().each(function()\{if(this==e.target)\{g=true\}\});if(!g)\{return false\}\}this.currentItem=d;this._removeCurrentsFromItems();return true\},_mouseStart:function(e,f,b)\{var g=this.options,c=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(e);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset=\{top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left\};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");a.extend(this.offset,\{click:\{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top\},parent:this._getParentOffset(),relative:this._getRelativeOffset()\});this.originalPosition=this._generatePosition(e);this.originalPageX=e.pageX;this.originalPageY=e.pageY;if(g.cursorAt)\{this._adjustOffsetFromHelper(g.cursorAt)\}this.domPosition=\{prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]\};if(this.helper[0]!=this.currentItem[0])\{this.currentItem.hide()\}this._createPlaceholder();if(g.containment)\{this._setContainment()\}if(g.cursor)\{if(a("body").css("cursor"))\{this._storedCursor=a("body").css("cursor")\}a("body").css("cursor",g.cursor)\}if(g.opacity)\{if(this.helper.css("opacity"))\{this._storedOpacity=this.helper.css("opacity")\}this.helper.css("opacity",g.opacity)\}if(g.zIndex)\{if(this.helper.css("zIndex"))\{this._storedZIndex=this.helper.css("zIndex")\}this.helper.css("zIndex",g.zIndex)\}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML")\{this.overflowOffset=this.scrollParent.offset()\}this._trigger("start",e,this._uiHash());if(!this._preserveHelperProportions)\{this._cacheHelperProportions()\}if(!b)\{for(var d=this.containers.length-1;d>=0;d--)\{this.containers[d]._trigger("activate",e,c._uiHash(this))\}\}if(a.ui.ddmanager)\{a.ui.ddmanager.current=this\}if(a.ui.ddmanager&&!g.dropBehaviour)\{a.ui.ddmanager.prepareOffsets(this,e)\}this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(e);return true\},_mouseDrag:function(f)\{this.position=this._generatePosition(f);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs)\{this.lastPositionAbs=this.positionAbs\}if(this.options.scroll)\{var g=this.options,b=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML")\{if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-f.pageY<g.scrollSensitivity)\{this.scrollParent[0].scrollTop=b=this.scrollParent[0].scrollTop+g.scrollSpeed\}else\{if(f.pageY-this.overflowOffset.top<g.scrollSensitivity)\{this.scrollParent[0].scrollTop=b=this.scrollParent[0].scrollTop-g.scrollSpeed\}\}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-f.pageX<g.scrollSensitivity)\{this.scrollParent[0].scrollLeft=b=this.scrollParent[0].scrollLeft+g.scrollSpeed\}else\{if(f.pageX-this.overflowOffset.left<g.scrollSensitivity)\{this.scrollParent[0].scrollLeft=b=this.scrollParent[0].scrollLeft-g.scrollSpeed\}\}\}else\{if(f.pageY-a(document).scrollTop()<g.scrollSensitivity)\{b=a(document).scrollTop(a(document).scrollTop()-g.scrollSpeed)\}else\{if(a(window).height()-(f.pageY-a(document).scrollTop())<g.scrollSensitivity)\{b=a(document).scrollTop(a(document).scrollTop()+g.scrollSpeed)\}\}if(f.pageX-a(document).scrollLeft()<g.scrollSensitivity)\{b=a(document).scrollLeft(a(document).scrollLeft()-g.scrollSpeed)\}else\{if(a(window).width()-(f.pageX-a(document).scrollLeft())<g.scrollSensitivity)\{b=a(document).scrollLeft(a(document).scrollLeft()+g.scrollSpeed)\}\}\}if(b!==false&&a.ui.ddmanager&&!g.dropBehaviour)\{a.ui.ddmanager.prepareOffsets(this,f)\}\}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")\{this.helper[0].style.left=this.position.left+"px"\}if(!this.options.axis||this.options.axis!="x")\{this.helper[0].style.top=this.position.top+"px"\}for(var d=this.items.length-1;d>=0;d--)\{var e=this.items[d],c=e.item[0],h=this._intersectsWithPointer(e);if(!h)\{continue\}if(c!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=c&&!a.ui.contains(this.placeholder[0],c)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],c):true))\{this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(e))\{this._rearrange(f,e)\}else\{break\}this._trigger("change",f,this._uiHash());break\}\}this._contactContainers(f);if(a.ui.ddmanager)\{a.ui.ddmanager.drag(this,f)\}this._trigger("sort",f,this._uiHash());this.lastPositionAbs=this.positionAbs;return false\},_mouseStop:function(c,d)\{if(!c)\{return\}if(a.ui.ddmanager&&!this.options.dropBehaviour)\{a.ui.ddmanager.drop(this,c)\}if(this.options.revert)\{var b=this;var e=b.placeholder.offset();b.reverting=true;a(this.helper).animate(\{left:e.left-this.offset.parent.left-b.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-b.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)\},parseInt(this.options.revert,10)||500,function()\{b._clear(c)\})\}else\{this._clear(c,d)\}return false\},cancel:function()\{var b=this;if(this.dragging)\{this._mouseUp();if(this.options.helper=="original")\{this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")\}else\{this.currentItem.show()\}for(var c=this.containers.length-1;c>=0;c--)\{this.containers[c]._trigger("deactivate",null,b._uiHash(this));if(this.containers[c].containerCache.over)\{this.containers[c]._trigger("out",null,b._uiHash(this));this.containers[c].containerCache.over=0\}\}\}if(this.placeholder[0].parentNode)\{this.placeholder[0].parentNode.removeChild(this.placeholder[0])\}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode)\{this.helper.remove()\}a.extend(this,\{helper:null,dragging:false,reverting:false,_noFinalSort:null\});if(this.domPosition.prev)\{a(this.domPosition.prev).after(this.currentItem)\}else\{a(this.domPosition.parent).prepend(this.currentItem)\}return true\},serialize:function(d)\{var b=this._getItemsAsjQuery(d&&d.connected);var c=[];d=d||\{\};a(b).each(function()\{var e=(a(d.item||this).attr(d.attribute||"id")||"").match(d.expression||(/(.+)[-=_](.+)/));if(e)\{c.push((d.key||e[1]+"[]")+"="+(d.key&&d.expression?e[1]:e[2]))\}\});return c.join("&")\},toArray:function(d)\{var b=this._getItemsAsjQuery(d&&d.connected);var c=[];d=d||\{\};b.each(function()\{c.push(a(d.item||this).attr(d.attribute||"id")||"")\});return c\},_intersectsWith:function(m)\{var e=this.positionAbs.left,d=e+this.helperProportions.width,k=this.positionAbs.top,j=k+this.helperProportions.height;var f=m.left,c=f+m.width,n=m.top,i=n+m.height;var o=this.offset.click.top,h=this.offset.click.left;var g=(k+o)>n&&(k+o)<i&&(e+h)>f&&(e+h)<c;if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>m[this.floating?"width":"height"]))\{return g\}else\{return(f<e+(this.helperProportions.width/2)&&d-(this.helperProportions.width/2)<c&&n<k+(this.helperProportions.height/2)&&j-(this.helperProportions.height/2)<i)\}\},_intersectsWithPointer:function(d)\{var e=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,d.top,d.height),c=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,d.left,d.width),g=e&&c,b=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();if(!g)\{return false\}return this.floating?(((f&&f=="right")||b=="down")?2:1):(b&&(b=="down"?2:1))\},_intersectsWithSides:function(e)\{var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+(e.height/2),e.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+(e.width/2),e.width),b=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();if(this.floating&&f)\{return((f=="right"&&d)||(f=="left"&&!d))\}else\{return b&&((b=="down"&&c)||(b=="up"&&!c))\}\},_getDragVerticalDirection:function()\{var b=this.positionAbs.top-this.lastPositionAbs.top;return b!=0&&(b>0?"down":"up")\},_getDragHorizontalDirection:function()\{var b=this.positionAbs.left-this.lastPositionAbs.left;return b!=0&&(b>0?"right":"left")\},refresh:function(b)\{this._refreshItems(b);this.refreshPositions()\},_connectWith:function()\{var b=this.options;return b.connectWith.constructor==String?[b.connectWith]:b.connectWith\},_getItemsAsjQuery:function(b)\{var l=this;var g=[];var e=[];var h=this._connectWith();if(h&&b)\{for(var d=h.length-1;d>=0;d--)\{var k=a(h[d]);for(var c=k.length-1;c>=0;c--)\{var f=a.data(k[c],"sortable");if(f&&f!=this&&!f.options.disabled)\{e.push([a.isFunction(f.options.items)?f.options.items.call(f.element):a(f.options.items,f.element).not(".ui-sortable-helper"),f])\}\}\}\}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,\{options:this.options,item:this.currentItem\}):a(this.options.items,this.element).not(".ui-sortable-helper"),this]);for(var d=e.length-1;d>=0;d--)\{e[d][0].each(function()\{g.push(this)\})\}return a(g)\},_removeCurrentsFromItems:function()\{var d=this.currentItem.find(":data(sortable-item)");for(var c=0;c<this.items.length;c++)\{for(var b=0;b<d.length;b++)\{if(d[b]==this.items[c].item[0])\{this.items.splice(c,1)\}\}\}\},_refreshItems:function(b)\{this.items=[];this.containers=[this];var h=this.items;var p=this;var f=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,\{item:this.currentItem\}):a(this.options.items,this.element),this]];var l=this._connectWith();if(l)\{for(var e=l.length-1;e>=0;e--)\{var m=a(l[e]);for(var d=m.length-1;d>=0;d--)\{var g=a.data(m[d],"sortable");if(g&&g!=this&&!g.options.disabled)\{f.push([a.isFunction(g.options.items)?g.options.items.call(g.element[0],b,\{item:this.currentItem\}):a(g.options.items,g.element),g]);this.containers.push(g)\}\}\}\}for(var e=f.length-1;e>=0;e--)\{var k=f[e][1];var c=f[e][0];for(var d=0,n=c.length;d<n;d++)\{var o=a(c[d]);o.data("sortable-item",k);h.push(\{item:o,instance:k,width:0,height:0,left:0,top:0\})\}\}\},refreshPositions:function(b)\{if(this.offsetParent&&this.helper)\{this.offset.parent=this._getParentOffset()\}for(var d=this.items.length-1;d>=0;d--)\{var e=this.items[d];if(e.instance!=this.currentContainer&&this.currentContainer&&e.item[0]!=this.currentItem[0])\{continue\}var c=this.options.toleranceElement?a(this.options.toleranceElement,e.item):e.item;if(!b)\{e.width=c.outerWidth();e.height=c.outerHeight()\}var f=c.offset();e.left=f.left;e.top=f.top\}if(this.options.custom&&this.options.custom.refreshContainers)\{this.options.custom.refreshContainers.call(this)\}else\{for(var d=this.containers.length-1;d>=0;d--)\{var f=this.containers[d].element.offset();this.containers[d].containerCache.left=f.left;this.containers[d].containerCache.top=f.top;this.containers[d].containerCache.width=this.containers[d].element.outerWidth();this.containers[d].containerCache.height=this.containers[d].element.outerHeight()\}\}\},_createPlaceholder:function(d)\{var b=d||this,e=b.options;if(!e.placeholder||e.placeholder.constructor==String)\{var c=e.placeholder;e.placeholder=\{element:function()\{var f=a(document.createElement(b.currentItem[0].nodeName)).addClass(c||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!c)\{f.style.visibility="hidden"\}return f\},update:function(f,g)\{if(c&&!e.forcePlaceholderSize)\{return\}if(!g.height())\{g.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10))\}if(!g.width())\{g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))\}\}\}\}b.placeholder=a(e.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);e.placeholder.update(b,b.placeholder)\},_contactContainers:function(d)\{for(var c=this.containers.length-1;c>=0;c--)\{if(this._intersectsWith(this.containers[c].containerCache))\{if(!this.containers[c].containerCache.over)\{if(this.currentContainer!=this.containers[c])\{var h=10000;var g=null;var e=this.positionAbs[this.containers[c].floating?"left":"top"];for(var b=this.items.length-1;b>=0;b--)\{if(!a.ui.contains(this.containers[c].element[0],this.items[b].item[0]))\{continue\}var f=this.items[b][this.containers[c].floating?"left":"top"];if(Math.abs(f-e)<h)\{h=Math.abs(f-e);g=this.items[b]\}\}if(!g&&!this.options.dropOnEmpty)\{continue\}this.currentContainer=this.containers[c];g?this._rearrange(d,g,null,true):this._rearrange(d,null,this.containers[c].element,true);this._trigger("change",d,this._uiHash());this.containers[c]._trigger("change",d,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder)\}this.containers[c]._trigger("over",d,this._uiHash(this));this.containers[c].containerCache.over=1\}\}else\{if(this.containers[c].containerCache.over)\{this.containers[c]._trigger("out",d,this._uiHash(this));this.containers[c].containerCache.over=0\}\}\}\},_createHelper:function(c)\{var d=this.options;var b=a.isFunction(d.helper)?a(d.helper.apply(this.element[0],[c,this.currentItem])):(d.helper=="clone"?this.currentItem.clone():this.currentItem);if(!b.parents("body").length)\{a(d.appendTo!="parent"?d.appendTo:this.currentItem[0].parentNode)[0].appendChild(b[0])\}if(b[0]==this.currentItem[0])\{this._storedCSS=\{width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")\}\}if(b[0].style.width==""||d.forceHelperSize)\{b.width(this.currentItem.width())\}if(b[0].style.height==""||d.forceHelperSize)\{b.height(this.currentItem.height())\}return b\},_adjustOffsetFromHelper:function(b)\{if(b.left!=undefined)\{this.offset.click.left=b.left+this.margins.left\}if(b.right!=undefined)\{this.offset.click.left=this.helperProportions.width-b.right+this.margins.left\}if(b.top!=undefined)\{this.offset.click.top=b.top+this.margins.top\}if(b.bottom!=undefined)\{this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top\}\},_getParentOffset:function()\{this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))\{b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()\}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie))\{b=\{top:0,left:0\}\}return\{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)\}\},_getRelativeOffset:function()\{if(this.cssPosition=="relative")\{var b=this.currentItem.position();return\{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()\}\}else\{return\{top:0,left:0\}\}\},_cacheMargins:function()\{this.margins=\{left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)\}\},_cacheHelperProportions:function()\{this.helperProportions=\{width:this.helper.outerWidth(),height:this.helper.outerHeight()\}\},_setContainment:function()\{var e=this.options;if(e.containment=="parent")\{e.containment=this.helper[0].parentNode\}if(e.containment=="document"||e.containment=="window")\{this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]\}if(!(/^(document|window|parent)$/).test(e.containment))\{var c=a(e.containment)[0];var d=a(e.containment).offset();var b=(a(c).css("overflow")!="hidden");this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]\}\},_convertPositionTo:function(f,h)\{if(!h)\{h=this.position\}var c=f=="absolute"?1:-1;var e=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=(/(html|body)/i).test(b[0].tagName);return\{top:(h.top+this.offset.relative.top*c+this.offset.parent.top*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(g?0:b.scrollTop()))*c)),left:(h.left+this.offset.relative.left*c+this.offset.parent.left*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:b.scrollLeft())*c))\}\},_generatePosition:function(e)\{var h=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(b[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))\{this.offset.relative=this._getRelativeOffset()\}var d=e.pageX;var c=e.pageY;if(this.originalPosition)\{if(this.containment)\{if(e.pageX-this.offset.click.left<this.containment[0])\{d=this.containment[0]+this.offset.click.left\}if(e.pageY-this.offset.click.top<this.containment[1])\{c=this.containment[1]+this.offset.click.top\}if(e.pageX-this.offset.click.left>this.containment[2])\{d=this.containment[2]+this.offset.click.left\}if(e.pageY-this.offset.click.top>this.containment[3])\{c=this.containment[3]+this.offset.click.top\}\}if(h.grid)\{var g=this.originalPageY+Math.round((c-this.originalPageY)/h.grid[1])*h.grid[1];c=this.containment?(!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:(!(g-this.offset.click.top<this.containment[1])?g-h.grid[1]:g+h.grid[1])):g;var f=this.originalPageX+Math.round((d-this.originalPageX)/h.grid[0])*h.grid[0];d=this.containment?(!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:(!(f-this.offset.click.left<this.containment[0])?f-h.grid[0]:f+h.grid[0])):f\}\}return\{top:(c-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:b.scrollTop())))),left:(d-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:b.scrollLeft())))\}\},_rearrange:function(g,f,c,e)\{c?c[0].appendChild(this.placeholder[0]):f.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?f.item[0]:f.item[0].nextSibling));this.counter=this.counter?++this.counter:1;var d=this,b=this.counter;window.setTimeout(function()\{if(b==d.counter)\{d.refreshPositions(!e)\}\},0)\},_clear:function(d,e)\{this.reverting=false;var f=[],b=this;if(!this._noFinalSort&&this.currentItem[0].parentNode)\{this.placeholder.before(this.currentItem)\}this._noFinalSort=null;if(this.helper[0]==this.currentItem[0])\{for(var c in this._storedCSS)\{if(this._storedCSS[c]=="auto"||this._storedCSS[c]=="static")\{this._storedCSS[c]=""\}\}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")\}else\{this.currentItem.show()\}if(this.fromOutside&&!e)\{f.push(function(g)\{this._trigger("receive",g,this._uiHash(this.fromOutside))\})\}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!e)\{f.push(function(g)\{this._trigger("update",g,this._uiHash())\})\}if(!a.ui.contains(this.element[0],this.currentItem[0]))\{if(!e)\{f.push(function(g)\{this._trigger("remove",g,this._uiHash())\})\}for(var c=this.containers.length-1;c>=0;c--)\{if(a.ui.contains(this.containers[c].element[0],this.currentItem[0])&&!e)\{f.push((function(g)\{return function(h)\{g._trigger("receive",h,this._uiHash(this))\}\}).call(this,this.containers[c]));f.push((function(g)\{return function(h)\{g._trigger("update",h,this._uiHash(this))\}\}).call(this,this.containers[c]))\}\}\}for(var c=this.containers.length-1;c>=0;c--)\{if(!e)\{f.push((function(g)\{return function(h)\{g._trigger("deactivate",h,this._uiHash(this))\}\}).call(this,this.containers[c]))\}if(this.containers[c].containerCache.over)\{f.push((function(g)\{return function(h)\{g._trigger("out",h,this._uiHash(this))\}\}).call(this,this.containers[c]));this.containers[c].containerCache.over=0\}\}if(this._storedCursor)\{a("body").css("cursor",this._storedCursor)\}if(this._storedOpacity)\{this.helper.css("opacity",this._storedOpacity)\}if(this._storedZIndex)\{this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)\}this.dragging=false;if(this.cancelHelperRemoval)\{if(!e)\{this._trigger("beforeStop",d,this._uiHash());for(var c=0;c<f.length;c++)\{f[c].call(this,d)\}this._trigger("stop",d,this._uiHash())\}return false\}if(!e)\{this._trigger("beforeStop",d,this._uiHash())\}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);if(this.helper[0]!=this.currentItem[0])\{this.helper.remove()\}this.helper=null;if(!e)\{for(var c=0;c<f.length;c++)\{f[c].call(this,d)\}this._trigger("stop",d,this._uiHash())\}this.fromOutside=false;return true\},_trigger:function()\{if(a.widget.prototype._trigger.apply(this,arguments)===false)\{this.cancel()\}\},_uiHash:function(c)\{var b=c||this;return\{helper:b.helper,placeholder:b.placeholder||a([]),position:b.position,absolutePosition:b.positionAbs,offset:b.positionAbs,item:b.currentItem,sender:c?c.element:null\}\}\}));a.extend(a.ui.sortable,\{getter:"serialize toArray",version:"1.7.2",eventPrefix:"sort",defaults:\{appendTo:"parent",axis:false,cancel:":input,option",connectWith:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000\}\})\})(jQuery);;/*\par
 * jQuery UI Accordion 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Accordion\par
 *\par
 * Depends:\par
 *\tab ui.core.js\par
 */\par
(function(a)\{a.widget("ui.accordion",\{_init:function()\{var d=this.options,b=this;this.running=0;if(d.collapsible==a.ui.accordion.defaults.collapsible&&d.alwaysOpen!=a.ui.accordion.defaults.alwaysOpen)\{d.collapsible=!d.alwaysOpen\}if(d.navigation)\{var c=this.element.find("a").filter(d.navigationFilter);if(c.length)\{if(c.filter(d.header).length)\{this.active=c\}else\{this.active=c.parent().parent().prev();c.addClass("ui-accordion-content-active")\}\}\}this.element.addClass("ui-accordion ui-widget ui-helper-reset");if(this.element[0].nodeName=="UL")\{this.element.children("li").addClass("ui-accordion-li-fix")\}this.headers=this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function()\{a(this).addClass("ui-state-hover")\}).bind("mouseleave.accordion",function()\{a(this).removeClass("ui-state-hover")\}).bind("focus.accordion",function()\{a(this).addClass("ui-state-focus")\}).bind("blur.accordion",function()\{a(this).removeClass("ui-state-focus")\});this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");this.active=this._findActive(this.active||d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");this.active.next().addClass("ui-accordion-content-active");a("<span/>").addClass("ui-icon "+d.icons.header).prependTo(this.headers);this.active.find(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);if(a.browser.msie)\{this.element.find("a").css("zoom","1")\}this.resize();this.element.attr("role","tablist");this.headers.attr("role","tab").bind("keydown",function(e)\{return b._keydown(e)\}).next().attr("role","tabpanel");this.headers.not(this.active||"").attr("aria-expanded","false").attr("tabIndex","-1").next().hide();if(!this.active.length)\{this.headers.eq(0).attr("tabIndex","0")\}else\{this.active.attr("aria-expanded","true").attr("tabIndex","0")\}if(!a.browser.safari)\{this.headers.find("a").attr("tabIndex","-1")\}if(d.event)\{this.headers.bind((d.event)+".accordion",function(e)\{return b._clickHandler.call(b,e,this)\})\}\},destroy:function()\{var c=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");this.headers.find("a").removeAttr("tabindex");this.headers.children(".ui-icon").remove();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");if(c.autoHeight||c.fillHeight)\{b.css("height","")\}\},_setData:function(b,c)\{if(b=="alwaysOpen")\{b="collapsible";c=!c\}a.widget.prototype._setData.apply(this,arguments)\},_keydown:function(e)\{var g=this.options,f=a.ui.keyCode;if(g.disabled||e.altKey||e.ctrlKey)\{return\}var d=this.headers.length;var b=this.headers.index(e.target);var c=false;switch(e.keyCode)\{case f.RIGHT:case f.DOWN:c=this.headers[(b+1)%d];break;case f.LEFT:case f.UP:c=this.headers[(b-1+d)%d];break;case f.SPACE:case f.ENTER:return this._clickHandler(\{target:e.target\},e.target)\}if(c)\{a(e.target).attr("tabIndex","-1");a(c).attr("tabIndex","0");c.focus();return false\}return true\},resize:function()\{var e=this.options,d;if(e.fillSpace)\{if(a.browser.msie)\{var b=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")\}d=this.element.parent().height();if(a.browser.msie)\{this.element.parent().css("overflow",b)\}this.headers.each(function()\{d-=a(this).outerHeight()\});var c=0;this.headers.next().each(function()\{c=Math.max(c,a(this).innerHeight()-a(this).height())\}).height(Math.max(0,d-c)).css("overflow","auto")\}else\{if(e.autoHeight)\{d=0;this.headers.next().each(function()\{d=Math.max(d,a(this).outerHeight())\}).height(d)\}\}\},activate:function(b)\{var c=this._findActive(b)[0];this._clickHandler(\{target:c\},c)\},_findActive:function(b)\{return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===false?a([]):this.headers.filter(":eq(0)")\},_clickHandler:function(b,f)\{var d=this.options;if(d.disabled)\{return false\}if(!b.target&&d.collapsible)\{this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");var h=this.active.next(),e=\{options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:h\},c=(this.active=a([]));this._toggle(c,h,e);return false\}var g=a(b.currentTarget||f);var i=g[0]==this.active[0];if(this.running||(!d.collapsible&&i))\{return false\}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");if(!i)\{g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);g.next().addClass("ui-accordion-content-active")\}var c=g.next(),h=this.active.next(),e=\{options:d,newHeader:i&&d.collapsible?a([]):g,oldHeader:this.active,newContent:i&&d.collapsible?a([]):c.find("> *"),oldContent:h.find("> *")\},j=this.headers.index(this.active[0])>this.headers.index(g[0]);this.active=i?a([]):g;this._toggle(c,h,e,i,j);return false\},_toggle:function(b,i,g,j,k)\{var d=this.options,m=this;this.toShow=b;this.toHide=i;this.data=g;var c=function()\{if(!m)\{return\}return m._completed.apply(m,arguments)\};this._trigger("changestart",null,this.data);this.running=i.size()===0?b.size():i.size();if(d.animated)\{var f=\{\};if(d.collapsible&&j)\{f=\{toShow:a([]),toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace\}\}else\{f=\{toShow:b,toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace\}\}if(!d.proxied)\{d.proxied=d.animated\}if(!d.proxiedDuration)\{d.proxiedDuration=d.duration\}d.animated=a.isFunction(d.proxied)?d.proxied(f):d.proxied;d.duration=a.isFunction(d.proxiedDuration)?d.proxiedDuration(f):d.proxiedDuration;var l=a.ui.accordion.animations,e=d.duration,h=d.animated;if(!l[h])\{l[h]=function(n)\{this.slide(n,\{easing:h,duration:e||700\})\}\}l[h](f)\}else\{if(d.collapsible&&j)\{b.toggle()\}else\{i.hide();b.show()\}c(true)\}i.prev().attr("aria-expanded","false").attr("tabIndex","-1").blur();b.prev().attr("aria-expanded","true").attr("tabIndex","0").focus()\},_completed:function(b)\{var c=this.options;this.running=b?0:--this.running;if(this.running)\{return\}if(c.clearStyle)\{this.toShow.add(this.toHide).css(\{height:"",overflow:""\})\}this._trigger("change",null,this.data)\}\});a.extend(a.ui.accordion,\{version:"1.7.2",defaults:\{active:null,alwaysOpen:true,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:\{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"\},navigation:false,navigationFilter:function()\{return this.href.toLowerCase()==location.href.toLowerCase()\}\},animations:\{slide:function(j,h)\{j=a.extend(\{easing:"swing",duration:300\},j,h);if(!j.toHide.size())\{j.toShow.animate(\{height:"show"\},j);return\}if(!j.toShow.size())\{j.toHide.animate(\{height:"hide"\},j);return\}var c=j.toShow.css("overflow"),g,d=\{\},f=\{\},e=["height","paddingTop","paddingBottom"],b;var i=j.toShow;b=i[0].style.width;i.width(parseInt(i.parent().width(),10)-parseInt(i.css("paddingLeft"),10)-parseInt(i.css("paddingRight"),10)-(parseInt(i.css("borderLeftWidth"),10)||0)-(parseInt(i.css("borderRightWidth"),10)||0));a.each(e,function(k,m)\{f[m]="hide";var l=(""+a.css(j.toShow[0],m)).match(/^([\\d+-.]+)(.*)$/);d[m]=\{value:l[1],unit:l[2]||"px"\}\});j.toShow.css(\{height:0,overflow:"hidden"\}).show();j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f,\{step:function(k,l)\{if(l.prop=="height")\{g=(l.now-l.start)/(l.end-l.start)\}j.toShow[0].style[l.prop]=(g*d[l.prop].value)+d[l.prop].unit\},duration:j.duration,easing:j.easing,complete:function()\{if(!j.autoHeight)\{j.toShow.css("height","")\}j.toShow.css("width",b);j.toShow.css(\{overflow:c\});j.complete()\}\})\},bounceslide:function(b)\{this.slide(b,\{easing:b.down?"easeOutBounce":"swing",duration:b.down?1000:200\})\},easeslide:function(b)\{this.slide(b,\{easing:"easeinout",duration:700\})\}\}\})\})(jQuery);;/*\par
 * jQuery UI Dialog 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Dialog\par
 *\par
 * Depends:\par
 *\tab ui.core.js\par
 *\tab ui.draggable.js\par
 *\tab ui.resizable.js\par
 */\par
(function(c)\{var b=\{dragStart:"start.draggable",drag:"drag.draggable",dragStop:"stop.draggable",maxHeight:"maxHeight.resizable",minHeight:"minHeight.resizable",maxWidth:"maxWidth.resizable",minWidth:"minWidth.resizable",resizeStart:"start.resizable",resize:"drag.resizable",resizeStop:"stop.resizable"\},a="ui-dialog ui-widget ui-widget-content ui-corner-all ";c.widget("ui.dialog",\{_init:function()\{this.originalTitle=this.element.attr("title");var l=this,m=this.options,j=m.title||this.originalTitle||"&nbsp;",e=c.ui.dialog.getTitleId(this.element),k=(this.uiDialog=c("<div/>")).appendTo(document.body).hide().addClass(a+m.dialogClass).css(\{position:"absolute",overflow:"hidden",zIndex:m.zIndex\}).attr("tabIndex",-1).css("outline",0).keydown(function(n)\{(m.closeOnEscape&&n.keyCode&&n.keyCode==c.ui.keyCode.ESCAPE&&l.close(n))\}).attr(\{role:"dialog","aria-labelledby":e\}).mousedown(function(n)\{l.moveToTop(false,n)\}),g=this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k),f=(this.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k),i=c('<a href="#"/>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function()\{i.addClass("ui-state-hover")\},function()\{i.removeClass("ui-state-hover")\}).focus(function()\{i.addClass("ui-state-focus")\}).blur(function()\{i.removeClass("ui-state-focus")\}).mousedown(function(n)\{n.stopPropagation()\}).click(function(n)\{l.close(n);return false\}).appendTo(f),h=(this.uiDialogTitlebarCloseText=c("<span/>")).addClass("ui-icon ui-icon-closethick").text(m.closeText).appendTo(i),d=c("<span/>").addClass("ui-dialog-title").attr("id",e).html(j).prependTo(f);f.find("*").add(f).disableSelection();(m.draggable&&c.fn.draggable&&this._makeDraggable());(m.resizable&&c.fn.resizable&&this._makeResizable());this._createButtons(m.buttons);this._isOpen=false;(m.bgiframe&&c.fn.bgiframe&&k.bgiframe());(m.autoOpen&&this.open())\},destroy:function()\{(this.overlay&&this.overlay.destroy());this.uiDialog.hide();this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");this.uiDialog.remove();(this.originalTitle&&this.element.attr("title",this.originalTitle))\},close:function(f)\{var d=this;if(false===d._trigger("beforeclose",f))\{return\}(d.overlay&&d.overlay.destroy());d.uiDialog.unbind("keypress.ui-dialog");(d.options.hide?d.uiDialog.hide(d.options.hide,function()\{d._trigger("close",f)\}):d.uiDialog.hide()&&d._trigger("close",f));c.ui.dialog.overlay.resize();d._isOpen=false;if(d.options.modal)\{var e=0;c(".ui-dialog").each(function()\{if(this!=d.uiDialog[0])\{e=Math.max(e,c(this).css("z-index"))\}\});c.ui.dialog.maxZ=e\}\},isOpen:function()\{return this._isOpen\},moveToTop:function(f,e)\{if((this.options.modal&&!f)||(!this.options.stack&&!this.options.modal))\{return this._trigger("focus",e)\}if(this.options.zIndex>c.ui.dialog.maxZ)\{c.ui.dialog.maxZ=this.options.zIndex\}(this.overlay&&this.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=++c.ui.dialog.maxZ));var d=\{scrollTop:this.element.attr("scrollTop"),scrollLeft:this.element.attr("scrollLeft")\};this.uiDialog.css("z-index",++c.ui.dialog.maxZ);this.element.attr(d);this._trigger("focus",e)\},open:function()\{if(this._isOpen)\{return\}var e=this.options,d=this.uiDialog;this.overlay=e.modal?new c.ui.dialog.overlay(this):null;(d.next().length&&d.appendTo("body"));this._size();this._position(e.position);d.show(e.show);this.moveToTop(true);(e.modal&&d.bind("keypress.ui-dialog",function(h)\{if(h.keyCode!=c.ui.keyCode.TAB)\{return\}var g=c(":tabbable",this),i=g.filter(":first")[0],f=g.filter(":last")[0];if(h.target==f&&!h.shiftKey)\{setTimeout(function()\{i.focus()\},1)\}else\{if(h.target==i&&h.shiftKey)\{setTimeout(function()\{f.focus()\},1)\}\}\}));c([]).add(d.find(".ui-dialog-content :tabbable:first")).add(d.find(".ui-dialog-buttonpane :tabbable:first")).add(d).filter(":first").focus();this._trigger("open");this._isOpen=true\},_createButtons:function(g)\{var f=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");this.uiDialog.find(".ui-dialog-buttonpane").remove();(typeof g=="object"&&g!==null&&c.each(g,function()\{return !(d=true)\}));if(d)\{c.each(g,function(h,i)\{c('<button type="button"></button>').addClass("ui-state-default ui-corner-all").text(h).click(function()\{i.apply(f.element[0],arguments)\}).hover(function()\{c(this).addClass("ui-state-hover")\},function()\{c(this).removeClass("ui-state-hover")\}).focus(function()\{c(this).addClass("ui-state-focus")\}).blur(function()\{c(this).removeClass("ui-state-focus")\}).appendTo(e)\});e.appendTo(this.uiDialog)\}\},_makeDraggable:function()\{var d=this,f=this.options,e;this.uiDialog.draggable(\{cancel:".ui-dialog-content",handle:".ui-dialog-titlebar",containment:"document",start:function()\{e=f.height;c(this).height(c(this).height()).addClass("ui-dialog-dragging");(f.dragStart&&f.dragStart.apply(d.element[0],arguments))\},drag:function()\{(f.drag&&f.drag.apply(d.element[0],arguments))\},stop:function()\{c(this).removeClass("ui-dialog-dragging").height(e);(f.dragStop&&f.dragStop.apply(d.element[0],arguments));c.ui.dialog.overlay.resize()\}\})\},_makeResizable:function(g)\{g=(g===undefined?this.options.resizable:g);var d=this,f=this.options,e=typeof g=="string"?g:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable(\{cancel:".ui-dialog-content",alsoResize:this.element,maxWidth:f.maxWidth,maxHeight:f.maxHeight,minWidth:f.minWidth,minHeight:f.minHeight,start:function()\{c(this).addClass("ui-dialog-resizing");(f.resizeStart&&f.resizeStart.apply(d.element[0],arguments))\},resize:function()\{(f.resize&&f.resize.apply(d.element[0],arguments))\},handles:e,stop:function()\{c(this).removeClass("ui-dialog-resizing");f.height=c(this).height();f.width=c(this).width();(f.resizeStop&&f.resizeStop.apply(d.element[0],arguments));c.ui.dialog.overlay.resize()\}\}).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")\},_position:function(i)\{var e=c(window),f=c(document),g=f.scrollTop(),d=f.scrollLeft(),h=g;if(c.inArray(i,["center","top","right","bottom","left"])>=0)\{i=[i=="right"||i=="left"?i:"center",i=="top"||i=="bottom"?i:"middle"]\}if(i.constructor!=Array)\{i=["center","middle"]\}if(i[0].constructor==Number)\{d+=i[0]\}else\{switch(i[0])\{case"left":d+=0;break;case"right":d+=e.width()-this.uiDialog.outerWidth();break;default:case"center":d+=(e.width()-this.uiDialog.outerWidth())/2\}\}if(i[1].constructor==Number)\{g+=i[1]\}else\{switch(i[1])\{case"top":g+=0;break;case"bottom":g+=e.height()-this.uiDialog.outerHeight();break;default:case"middle":g+=(e.height()-this.uiDialog.outerHeight())/2\}\}g=Math.max(g,h);this.uiDialog.css(\{top:g,left:d\})\},_setData:function(e,f)\{(b[e]&&this.uiDialog.data(b[e],f));switch(e)\{case"buttons":this._createButtons(f);break;case"closeText":this.uiDialogTitlebarCloseText.text(f);break;case"dialogClass":this.uiDialog.removeClass(this.options.dialogClass).addClass(a+f);break;case"draggable":(f?this._makeDraggable():this.uiDialog.draggable("destroy"));break;case"height":this.uiDialog.height(f);break;case"position":this._position(f);break;case"resizable":var d=this.uiDialog,g=this.uiDialog.is(":data(resizable)");(g&&!f&&d.resizable("destroy"));(g&&typeof f=="string"&&d.resizable("option","handles",f));(g||this._makeResizable(f));break;case"title":c(".ui-dialog-title",this.uiDialogTitlebar).html(f||"&nbsp;");break;case"width":this.uiDialog.width(f);break\}c.widget.prototype._setData.apply(this,arguments)\},_size:function()\{var e=this.options;this.element.css(\{height:0,minHeight:0,width:"auto"\});var d=this.uiDialog.css(\{height:"auto",width:e.width\}).height();this.element.css(\{minHeight:Math.max(e.minHeight-d,0),height:e.height=="auto"?"auto":Math.max(e.height-d,0)\})\}\});c.extend(c.ui.dialog,\{version:"1.7.2",defaults:\{autoOpen:true,bgiframe:false,buttons:\{\},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:"center",resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000\},getter:"isOpen",uuid:0,maxZ:0,getTitleId:function(d)\{return"ui-dialog-title-"+(d.attr("id")||++this.uuid)\},overlay:function(d)\{this.$el=c.ui.dialog.overlay.create(d)\}\});c.extend(c.ui.dialog.overlay,\{instances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(d)\{return d+".dialog-overlay"\}).join(" "),create:function(e)\{if(this.instances.length===0)\{setTimeout(function()\{if(c.ui.dialog.overlay.instances.length)\{c(document).bind(c.ui.dialog.overlay.events,function(f)\{var g=c(f.target).parents(".ui-dialog").css("zIndex")||0;return(g>c.ui.dialog.overlay.maxZ)\})\}\},1);c(document).bind("keydown.dialog-overlay",function(f)\{(e.options.closeOnEscape&&f.keyCode&&f.keyCode==c.ui.keyCode.ESCAPE&&e.close(f))\});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)\}var d=c("<div></div>").appendTo(document.body).addClass("ui-widget-overlay").css(\{width:this.width(),height:this.height()\});(e.options.bgiframe&&c.fn.bgiframe&&d.bgiframe());this.instances.push(d);return d\},destroy:function(d)\{this.instances.splice(c.inArray(this.instances,d),1);if(this.instances.length===0)\{c([document,window]).unbind(".dialog-overlay")\}d.remove();var e=0;c.each(this.instances,function()\{e=Math.max(e,this.css("z-index"))\});this.maxZ=e\},height:function()\{if(c.browser.msie&&c.browser.version<7)\{var e=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);var d=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);if(e<d)\{return c(window).height()+"px"\}else\{return e+"px"\}\}else\{return c(document).height()+"px"\}\},width:function()\{if(c.browser.msie&&c.browser.version<7)\{var d=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);var e=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(d<e)\{return c(window).width()+"px"\}else\{return d+"px"\}\}else\{return c(document).width()+"px"\}\},resize:function()\{var d=c([]);c.each(c.ui.dialog.overlay.instances,function()\{d=d.add(this)\});d.css(\{width:0,height:0\}).css(\{width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()\})\}\});c.extend(c.ui.dialog.overlay.prototype,\{destroy:function()\{c.ui.dialog.overlay.destroy(this.$el)\}\})\})(jQuery);;/*\par
 * jQuery UI Slider 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Slider\par
 *\par
 * Depends:\par
 *\tab ui.core.js\par
 */\par
(function(a)\{a.widget("ui.slider",a.extend(\{\},a.ui.mouse,\{_init:function()\{var b=this,c=this.options;this._keySliding=false;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");this.range=a([]);if(c.range)\{if(c.range===true)\{this.range=a("<div></div>");if(!c.values)\{c.values=[this._valueMin(),this._valueMin()]\}if(c.values.length&&c.values.length!=2)\{c.values=[c.values[0],c.values[0]]\}\}else\{this.range=a("<div></div>")\}this.range.appendTo(this.element).addClass("ui-slider-range");if(c.range=="min"||c.range=="max")\{this.range.addClass("ui-slider-range-"+c.range)\}this.range.addClass("ui-widget-header")\}if(a(".ui-slider-handle",this.element).length==0)\{a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")\}if(c.values&&c.values.length)\{while(a(".ui-slider-handle",this.element).length<c.values.length)\{a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")\}\}this.handles=a(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(d)\{d.preventDefault()\}).hover(function()\{if(!c.disabled)\{a(this).addClass("ui-state-hover")\}\},function()\{a(this).removeClass("ui-state-hover")\}).focus(function()\{if(!c.disabled)\{a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");a(this).addClass("ui-state-focus")\}else\{a(this).blur()\}\}).blur(function()\{a(this).removeClass("ui-state-focus")\});this.handles.each(function(d)\{a(this).data("index.ui-slider-handle",d)\});this.handles.keydown(function(i)\{var f=true;var e=a(this).data("index.ui-slider-handle");if(b.options.disabled)\{return\}switch(i.keyCode)\{case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:f=false;if(!b._keySliding)\{b._keySliding=true;a(this).addClass("ui-state-active");b._start(i,e)\}break\}var g,d,h=b._step();if(b.options.values&&b.options.values.length)\{g=d=b.values(e)\}else\{g=d=b.value()\}switch(i.keyCode)\{case a.ui.keyCode.HOME:d=b._valueMin();break;case a.ui.keyCode.END:d=b._valueMax();break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g==b._valueMax())\{return\}d=g+h;break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g==b._valueMin())\{return\}d=g-h;break\}b._slide(i,e,d);return f\}).keyup(function(e)\{var d=a(this).data("index.ui-slider-handle");if(b._keySliding)\{b._stop(e,d);b._change(e,d);b._keySliding=false;a(this).removeClass("ui-state-active")\}\});this._refreshValue()\},destroy:function()\{this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy()\},_mouseCapture:function(d)\{var e=this.options;if(e.disabled)\{return false\}this.elementSize=\{width:this.element.outerWidth(),height:this.element.outerHeight()\};this.elementOffset=this.element.offset();var h=\{x:d.pageX,y:d.pageY\};var j=this._normValueFromMouse(h);var c=this._valueMax()-this._valueMin()+1,f;var k=this,i;this.handles.each(function(l)\{var m=Math.abs(j-k.values(l));if(c>m)\{c=m;f=a(this);i=l\}\});if(e.range==true&&this.values(1)==e.min)\{f=a(this.handles[++i])\}this._start(d,i);k._handleIndex=i;f.addClass("ui-state-active").focus();var g=f.offset();var b=!a(d.target).parents().andSelf().is(".ui-slider-handle");this._clickOffset=b?\{left:0,top:0\}:\{left:d.pageX-g.left-(f.width()/2),top:d.pageY-g.top-(f.height()/2)-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)\};j=this._normValueFromMouse(h);this._slide(d,i,j);return true\},_mouseStart:function(b)\{return true\},_mouseDrag:function(d)\{var b=\{x:d.pageX,y:d.pageY\};var c=this._normValueFromMouse(b);this._slide(d,this._handleIndex,c);return false\},_mouseStop:function(b)\{this.handles.removeClass("ui-state-active");this._stop(b,this._handleIndex);this._change(b,this._handleIndex);this._handleIndex=null;this._clickOffset=null;return false\},_detectOrientation:function()\{this.orientation=this.options.orientation=="vertical"?"vertical":"horizontal"\},_normValueFromMouse:function(d)\{var c,h;if("horizontal"==this.orientation)\{c=this.elementSize.width;h=d.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)\}else\{c=this.elementSize.height;h=d.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)\}var f=(h/c);if(f>1)\{f=1\}if(f<0)\{f=0\}if("vertical"==this.orientation)\{f=1-f\}var e=this._valueMax()-this._valueMin(),i=f*e,b=i%this.options.step,g=this._valueMin()+i-b;if(b>(this.options.step/2))\{g+=this.options.step\}return parseFloat(g.toFixed(5))\},_start:function(d,c)\{var b=\{handle:this.handles[c],value:this.value()\};if(this.options.values&&this.options.values.length)\{b.value=this.values(c);b.values=this.values()\}this._trigger("start",d,b)\},_slide:function(f,e,d)\{var g=this.handles[e];if(this.options.values&&this.options.values.length)\{var b=this.values(e?0:1);if((this.options.values.length==2&&this.options.range===true)&&((e==0&&d>b)||(e==1&&d<b)))\{d=b\}if(d!=this.values(e))\{var c=this.values();c[e]=d;var h=this._trigger("slide",f,\{handle:this.handles[e],value:d,values:c\});var b=this.values(e?0:1);if(h!==false)\{this.values(e,d,(f.type=="mousedown"&&this.options.animate),true)\}\}\}else\{if(d!=this.value())\{var h=this._trigger("slide",f,\{handle:this.handles[e],value:d\});if(h!==false)\{this._setData("value",d,(f.type=="mousedown"&&this.options.animate))\}\}\}\},_stop:function(d,c)\{var b=\{handle:this.handles[c],value:this.value()\};if(this.options.values&&this.options.values.length)\{b.value=this.values(c);b.values=this.values()\}this._trigger("stop",d,b)\},_change:function(d,c)\{var b=\{handle:this.handles[c],value:this.value()\};if(this.options.values&&this.options.values.length)\{b.value=this.values(c);b.values=this.values()\}this._trigger("change",d,b)\},value:function(b)\{if(arguments.length)\{this._setData("value",b);this._change(null,0)\}return this._value()\},values:function(b,e,c,d)\{if(arguments.length>1)\{this.options.values[b]=e;this._refreshValue(c);if(!d)\{this._change(null,b)\}\}if(arguments.length)\{if(this.options.values&&this.options.values.length)\{return this._values(b)\}else\{return this.value()\}\}else\{return this._values()\}\},_setData:function(b,d,c)\{a.widget.prototype._setData.apply(this,arguments);switch(b)\{case"disabled":if(d)\{this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled")\}else\{this.handles.removeAttr("disabled")\}case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue(c);break;case"value":this._refreshValue(c);break\}\},_step:function()\{var b=this.options.step;return b\},_value:function()\{var b=this.options.value;if(b<this._valueMin())\{b=this._valueMin()\}if(b>this._valueMax())\{b=this._valueMax()\}return b\},_values:function(b)\{if(arguments.length)\{var c=this.options.values[b];if(c<this._valueMin())\{c=this._valueMin()\}if(c>this._valueMax())\{c=this._valueMax()\}return c\}else\{return this.options.values\}\},_valueMin:function()\{var b=this.options.min;return b\},_valueMax:function()\{var b=this.options.max;return b\},_refreshValue:function(c)\{var f=this.options.range,d=this.options,l=this;if(this.options.values&&this.options.values.length)\{var i,h;this.handles.each(function(p,n)\{var o=(l.values(p)-l._valueMin())/(l._valueMax()-l._valueMin())*100;var m=\{\};m[l.orientation=="horizontal"?"left":"bottom"]=o+"%";a(this).stop(1,1)[c?"animate":"css"](m,d.animate);if(l.options.range===true)\{if(l.orientation=="horizontal")\{(p==0)&&l.range.stop(1,1)[c?"animate":"css"](\{left:o+"%"\},d.animate);(p==1)&&l.range[c?"animate":"css"](\{width:(o-lastValPercent)+"%"\},\{queue:false,duration:d.animate\})\}else\{(p==0)&&l.range.stop(1,1)[c?"animate":"css"](\{bottom:(o)+"%"\},d.animate);(p==1)&&l.range[c?"animate":"css"](\{height:(o-lastValPercent)+"%"\},\{queue:false,duration:d.animate\})\}\}lastValPercent=o\})\}else\{var j=this.value(),g=this._valueMin(),k=this._valueMax(),e=k!=g?(j-g)/(k-g)*100:0;var b=\{\};b[l.orientation=="horizontal"?"left":"bottom"]=e+"%";this.handle.stop(1,1)[c?"animate":"css"](b,d.animate);(f=="min")&&(this.orientation=="horizontal")&&this.range.stop(1,1)[c?"animate":"css"](\{width:e+"%"\},d.animate);(f=="max")&&(this.orientation=="horizontal")&&this.range[c?"animate":"css"](\{width:(100-e)+"%"\},\{queue:false,duration:d.animate\});(f=="min")&&(this.orientation=="vertical")&&this.range.stop(1,1)[c?"animate":"css"](\{height:e+"%"\},d.animate);(f=="max")&&(this.orientation=="vertical")&&this.range[c?"animate":"css"](\{height:(100-e)+"%"\},\{queue:false,duration:d.animate\})\}\}\}));a.extend(a.ui.slider,\{getter:"value values",version:"1.7.2",eventPrefix:"slide",defaults:\{animate:false,delay:0,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null\}\})\})(jQuery);;/*\par
 * jQuery UI Tabs 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Tabs\par
 *\par
 * Depends:\par
 *\tab ui.core.js\par
 */\par
(function(a)\{a.widget("ui.tabs",\{_init:function()\{if(this.options.deselectable!==undefined)\{this.options.collapsible=this.options.deselectable\}this._tabify(true)\},_setData:function(b,c)\{if(b=="selected")\{if(this.options.collapsible&&c==this.options.selected)\{return\}this.select(c)\}else\{this.options[b]=c;if(b=="deselectable")\{this.options.collapsible=c\}this._tabify()\}\},_tabId:function(b)\{return b.title&&b.title.replace(/\\s/g,"_").replace(/[^A-Za-z0-9\\-_:\\.]/g,"")||this.options.idPrefix+a.data(b)\},_sanitizeSelector:function(b)\{return b.replace(/:/g,"\\\\:")\},_cookie:function()\{var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+a.data(this.list[0]));return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))\},_ui:function(c,b)\{return\{tab:c,panel:b,index:this.anchors.index(c)\}\},_cleanup:function()\{this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function()\{var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")\})\},_tabify:function(n)\{this.list=this.element.children("ul:first");this.lis=a("li:has(a[href])",this.list);this.anchors=this.lis.map(function()\{return a("a",this)[0]\});this.panels=a([]);var p=this,d=this.options;var c=/^#.+/;this.anchors.each(function(r,o)\{var q=a(o).attr("href");var s=q.split("#")[0],u;if(s&&(s===location.toString().split("#")[0]||(u=a("base")[0])&&s===u.href))\{q=o.hash;o.href=q\}if(c.test(q))\{p.panels=p.panels.add(p._sanitizeSelector(q))\}else\{if(q!="#")\{a.data(o,"href.tabs",q);a.data(o,"load.tabs",q.replace(/#.*$/,""));var w=p._tabId(o);o.href="#"+w;var v=a("#"+w);if(!v.length)\{v=a(d.panelTemplate).attr("id",w).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(p.panels[r-1]||p.list);v.data("destroy.tabs",true)\}p.panels=p.panels.add(v)\}else\{d.disabled.push(r)\}\}\});if(n)\{this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(d.selected===undefined)\{if(location.hash)\{this.anchors.each(function(q,o)\{if(o.hash==location.hash)\{d.selected=q;return false\}\})\}if(typeof d.selected!="number"&&d.cookie)\{d.selected=parseInt(p._cookie(),10)\}if(typeof d.selected!="number"&&this.lis.filter(".ui-tabs-selected").length)\{d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))\}d.selected=d.selected||0\}else\{if(d.selected===null)\{d.selected=-1\}\}d.selected=((d.selected>=0&&this.anchors[d.selected])||d.selected<0)?d.selected:0;d.disabled=a.unique(d.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(q,o)\{return p.lis.index(q)\}))).sort();if(a.inArray(d.selected,d.disabled)!=-1)\{d.disabled.splice(a.inArray(d.selected,d.disabled),1)\}this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");if(d.selected>=0&&this.anchors.length)\{this.panels.eq(d.selected).removeClass("ui-tabs-hide");this.lis.eq(d.selected).addClass("ui-tabs-selected ui-state-active");p.element.queue("tabs",function()\{p._trigger("show",null,p._ui(p.anchors[d.selected],p.panels[d.selected]))\});this.load(d.selected)\}a(window).bind("unload",function()\{p.lis.add(p.anchors).unbind(".tabs");p.lis=p.anchors=p.panels=null\})\}else\{d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))\}this.element[d.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");if(d.cookie)\{this._cookie(d.selected,d.cookie)\}for(var g=0,m;(m=this.lis[g]);g++)\{a(m)[a.inArray(g,d.disabled)!=-1&&!a(m).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")\}if(d.cache===false)\{this.anchors.removeData("cache.tabs")\}this.lis.add(this.anchors).unbind(".tabs");if(d.event!="mouseover")\{var f=function(o,i)\{if(i.is(":not(.ui-state-disabled)"))\{i.addClass("ui-state-"+o)\}\};var j=function(o,i)\{i.removeClass("ui-state-"+o)\};this.lis.bind("mouseover.tabs",function()\{f("hover",a(this))\});this.lis.bind("mouseout.tabs",function()\{j("hover",a(this))\});this.anchors.bind("focus.tabs",function()\{f("focus",a(this).closest("li"))\});this.anchors.bind("blur.tabs",function()\{j("focus",a(this).closest("li"))\})\}var b,h;if(d.fx)\{if(a.isArray(d.fx))\{b=d.fx[0];h=d.fx[1]\}else\{b=h=d.fx\}\}function e(i,o)\{i.css(\{display:""\});if(a.browser.msie&&o.opacity)\{i[0].style.removeAttribute("filter")\}\}var k=h?function(i,o)\{a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.hide().removeClass("ui-tabs-hide").animate(h,h.duration||"normal",function()\{e(o,h);p._trigger("show",null,p._ui(i,o[0]))\})\}:function(i,o)\{a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.removeClass("ui-tabs-hide");p._trigger("show",null,p._ui(i,o[0]))\};var l=b?function(o,i)\{i.animate(b,b.duration||"normal",function()\{p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");e(i,b);p.element.dequeue("tabs")\})\}:function(o,i,q)\{p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");p.element.dequeue("tabs")\};this.anchors.bind(d.event+".tabs",function()\{var o=this,r=a(this).closest("li"),i=p.panels.filter(":not(.ui-tabs-hide)"),q=a(p._sanitizeSelector(this.hash));if((r.hasClass("ui-tabs-selected")&&!d.collapsible)||r.hasClass("ui-state-disabled")||r.hasClass("ui-state-processing")||p._trigger("select",null,p._ui(this,q[0]))===false)\{this.blur();return false\}d.selected=p.anchors.index(this);p.abort();if(d.collapsible)\{if(r.hasClass("ui-tabs-selected"))\{d.selected=-1;if(d.cookie)\{p._cookie(d.selected,d.cookie)\}p.element.queue("tabs",function()\{l(o,i)\}).dequeue("tabs");this.blur();return false\}else\{if(!i.length)\{if(d.cookie)\{p._cookie(d.selected,d.cookie)\}p.element.queue("tabs",function()\{k(o,q)\});p.load(p.anchors.index(this));this.blur();return false\}\}\}if(d.cookie)\{p._cookie(d.selected,d.cookie)\}if(q.length)\{if(i.length)\{p.element.queue("tabs",function()\{l(o,i)\})\}p.element.queue("tabs",function()\{k(o,q)\});p.load(p.anchors.index(this))\}else\{throw"jQuery UI Tabs: Mismatching fragment identifier."\}if(a.browser.msie)\{this.blur()\}\});this.anchors.bind("click.tabs",function()\{return false\})\},destroy:function()\{var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function()\{var c=a.data(this,"href.tabs");if(c)\{this.href=c\}var d=a(this).unbind(".tabs");a.each(["href","load","cache"],function(e,f)\{d.removeData(f+".tabs")\})\});this.lis.unbind(".tabs").add(this.panels).each(function()\{if(a.data(this,"destroy.tabs"))\{a(this).remove()\}else\{a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))\}\});if(b.cookie)\{this._cookie(null,b.cookie)\}\},add:function(e,d,c)\{if(c===undefined)\{c=this.anchors.length\}var b=this,g=this.options,i=a(g.tabTemplate.replace(/#\\\{href\\\}/g,e).replace(/#\\\{label\\\}/g,d)),h=!e.indexOf("#")?e.replace("#",""):this._tabId(a("a",i)[0]);i.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var f=a("#"+h);if(!f.length)\{f=a(g.panelTemplate).attr("id",h).data("destroy.tabs",true)\}f.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(c>=this.lis.length)\{i.appendTo(this.list);f.appendTo(this.list[0].parentNode)\}else\{i.insertBefore(this.lis[c]);f.insertBefore(this.panels[c])\}g.disabled=a.map(g.disabled,function(k,j)\{return k>=c?++k:k\});this._tabify();if(this.anchors.length==1)\{i.addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");this.element.queue("tabs",function()\{b._trigger("show",null,b._ui(b.anchors[0],b.panels[0]))\});this.load(0)\}this._trigger("add",null,this._ui(this.anchors[c],this.panels[c]))\},remove:function(b)\{var d=this.options,e=this.lis.eq(b).remove(),c=this.panels.eq(b).remove();if(e.hasClass("ui-tabs-selected")&&this.anchors.length>1)\{this.select(b+(b+1<this.anchors.length?1:-1))\}d.disabled=a.map(a.grep(d.disabled,function(g,f)\{return g!=b\}),function(g,f)\{return g>=b?--g:g\});this._tabify();this._trigger("remove",null,this._ui(e.find("a")[0],c[0]))\},enable:function(b)\{var c=this.options;if(a.inArray(b,c.disabled)==-1)\{return\}this.lis.eq(b).removeClass("ui-state-disabled");c.disabled=a.grep(c.disabled,function(e,d)\{return e!=b\});this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]))\},disable:function(c)\{var b=this,d=this.options;if(c!=d.selected)\{this.lis.eq(c).addClass("ui-state-disabled");d.disabled.push(c);d.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[c],this.panels[c]))\}\},select:function(b)\{if(typeof b=="string")\{b=this.anchors.index(this.anchors.filter("[href$="+b+"]"))\}else\{if(b===null)\{b=-1\}\}if(b==-1&&this.options.collapsible)\{b=this.options.selected\}this.anchors.eq(b).trigger(this.options.event+".tabs")\},load:function(e)\{var c=this,g=this.options,b=this.anchors.eq(e)[0],d=a.data(b,"load.tabs");this.abort();if(!d||this.element.queue("tabs").length!==0&&a.data(b,"cache.tabs"))\{this.element.dequeue("tabs");return\}this.lis.eq(e).addClass("ui-state-processing");if(g.spinner)\{var f=a("span",b);f.data("label.tabs",f.html()).html(g.spinner)\}this.xhr=a.ajax(a.extend(\{\},g.ajaxOptions,\{url:d,success:function(i,h)\{a(c._sanitizeSelector(b.hash)).html(i);c._cleanup();if(g.cache)\{a.data(b,"cache.tabs",true)\}c._trigger("load",null,c._ui(c.anchors[e],c.panels[e]));try\{g.ajaxOptions.success(i,h)\}catch(j)\{\}c.element.dequeue("tabs")\}\}))\},abort:function()\{this.element.queue([]);this.panels.stop(false,true);if(this.xhr)\{this.xhr.abort();delete this.xhr\}this._cleanup()\},url:function(c,b)\{this.anchors.eq(c).removeData("cache.tabs").data("load.tabs",b)\},length:function()\{return this.anchors.length\}\});a.extend(a.ui.tabs,\{version:"1.7.2",getter:"length",defaults:\{ajaxOptions:null,cache:false,cookie:null,collapsible:false,disabled:[],event:"click",fx:null,idPrefix:"ui-tabs-",panelTemplate:"<div></div>",spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#\{href\}"><span>#\{label\}</span></a></li>'\}\});a.extend(a.ui.tabs.prototype,\{rotation:null,rotate:function(d,f)\{var b=this,g=this.options;var c=b._rotate||(b._rotate=function(h)\{clearTimeout(b.rotation);b.rotation=setTimeout(function()\{var i=g.selected;b.select(++i<b.anchors.length?i:0)\},d);if(h)\{h.stopPropagation()\}\});var e=b._unrotate||(b._unrotate=!f?function(h)\{if(h.clientX)\{b.rotate(null)\}\}:function(h)\{t=g.selected;c()\});if(d)\{this.element.bind("tabsshow",c);this.anchors.bind(g.event+".tabs",e);c()\}else\{clearTimeout(b.rotation);this.element.unbind("tabsshow",c);this.anchors.unbind(g.event+".tabs",e);delete this._rotate;delete this._unrotate\}\}\})\})(jQuery);;/*\par
 * jQuery UI Progressbar 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Progressbar\par
 *\par
 * Depends:\par
 *   ui.core.js\par
 */\par
(function(a)\{a.widget("ui.progressbar",\{_init:function()\{this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr(\{role:"progressbar","aria-valuemin":this._valueMin(),"aria-valuemax":this._valueMax(),"aria-valuenow":this._value()\});this.valueDiv=a('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);this._refreshValue()\},destroy:function()\{this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow").removeData("progressbar").unbind(".progressbar");this.valueDiv.remove();a.widget.prototype.destroy.apply(this,arguments)\},value:function(b)\{if(b===undefined)\{return this._value()\}this._setData("value",b);return this\},_setData:function(b,c)\{switch(b)\{case"value":this.options.value=c;this._refreshValue();this._trigger("change",null,\{\});break\}a.widget.prototype._setData.apply(this,arguments)\},_value:function()\{var b=this.options.value;if(b<this._valueMin())\{b=this._valueMin()\}if(b>this._valueMax())\{b=this._valueMax()\}return b\},_valueMin:function()\{var b=0;return b\},_valueMax:function()\{var b=100;return b\},_refreshValue:function()\{var b=this.value();this.valueDiv[b==this._valueMax()?"addClass":"removeClass"]("ui-corner-right");this.valueDiv.width(b+"%");this.element.attr("aria-valuenow",b)\}\});a.extend(a.ui.progressbar,\{version:"1.7.2",defaults:\{value:0\}\})\})(jQuery);;/*\par
 * jQuery UI Effects 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/\par
 */\par
jQuery.effects||(function(d)\{d.effects=\{version:"1.7.2",save:function(g,h)\{for(var f=0;f<h.length;f++)\{if(h[f]!==null)\{g.data("ec.storage."+h[f],g[0].style[h[f]])\}\}\},restore:function(g,h)\{for(var f=0;f<h.length;f++)\{if(h[f]!==null)\{g.css(h[f],g.data("ec.storage."+h[f]))\}\}\},setMode:function(f,g)\{if(g=="toggle")\{g=f.is(":hidden")?"show":"hide"\}return g\},getBaseline:function(g,h)\{var i,f;switch(g[0])\{case"top":i=0;break;case"middle":i=0.5;break;case"bottom":i=1;break;default:i=g[0]/h.height\}switch(g[1])\{case"left":f=0;break;case"center":f=0.5;break;case"right":f=1;break;default:f=g[1]/h.width\}return\{x:f,y:i\}\},createWrapper:function(f)\{if(f.parent().is(".ui-effects-wrapper"))\{return f.parent()\}var g=\{width:f.outerWidth(true),height:f.outerHeight(true),"float":f.css("float")\};f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');var j=f.parent();if(f.css("position")=="static")\{j.css(\{position:"relative"\});f.css(\{position:"relative"\})\}else\{var i=f.css("top");if(isNaN(parseInt(i,10)))\{i="auto"\}var h=f.css("left");if(isNaN(parseInt(h,10)))\{h="auto"\}j.css(\{position:f.css("position"),top:i,left:h,zIndex:f.css("z-index")\}).show();f.css(\{position:"relative",top:0,left:0\})\}j.css(g);return j\},removeWrapper:function(f)\{if(f.parent().is(".ui-effects-wrapper"))\{return f.parent().replaceWith(f)\}return f\},setTransition:function(g,i,f,h)\{h=h||\{\};d.each(i,function(k,j)\{unit=g.cssUnit(j);if(unit[0]>0)\{h[j]=unit[0]*f+unit[1]\}\});return h\},animateClass:function(h,i,k,j)\{var f=(typeof k=="function"?k:(j?j:null));var g=(typeof k=="string"?k:null);return this.each(function()\{var q=\{\};var o=d(this);var p=o.attr("style")||"";if(typeof p=="object")\{p=p.cssText\}if(h.toggle)\{o.hasClass(h.toggle)?h.remove=h.toggle:h.add=h.toggle\}var l=d.extend(\{\},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add)\{o.addClass(h.add)\}if(h.remove)\{o.removeClass(h.remove)\}var m=d.extend(\{\},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add)\{o.removeClass(h.add)\}if(h.remove)\{o.addClass(h.remove)\}for(var r in m)\{if(typeof m[r]!="function"&&m[r]&&r.indexOf("Moz")==-1&&r.indexOf("length")==-1&&m[r]!=l[r]&&(r.match(/color/i)||(!r.match(/color/i)&&!isNaN(parseInt(m[r],10))))&&(l.position!="static"||(l.position=="static"&&!r.match(/left|top|bottom|right/))))\{q[r]=m[r]\}\}o.animate(q,i,g,function()\{if(typeof d(this).attr("style")=="object")\{d(this).attr("style")["cssText"]="";d(this).attr("style")["cssText"]=p\}else\{d(this).attr("style",p)\}if(h.add)\{d(this).addClass(h.add)\}if(h.remove)\{d(this).removeClass(h.remove)\}if(f)\{f.apply(this,arguments)\}\})\})\}\};function c(g,f)\{var i=g[1]&&g[1].constructor==Object?g[1]:\{\};if(f)\{i.mode=f\}var h=g[1]&&g[1].constructor!=Object?g[1]:(i.duration?i.duration:g[2]);h=d.fx.off?0:typeof h==="number"?h:d.fx.speeds[h]||d.fx.speeds._default;var j=i.callback||(d.isFunction(g[1])&&g[1])||(d.isFunction(g[2])&&g[2])||(d.isFunction(g[3])&&g[3]);return[g[0],i,h,j]\}d.fn.extend(\{_show:d.fn.show,_hide:d.fn.hide,__toggle:d.fn.toggle,_addClass:d.fn.addClass,_removeClass:d.fn.removeClass,_toggleClass:d.fn.toggleClass,effect:function(g,f,h,i)\{return d.effects[g]?d.effects[g].call(this,\{method:g,options:f||\{\},duration:h,callback:i\}):null\},show:function()\{if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0])))\{return this._show.apply(this,arguments)\}else\{return this.effect.apply(this,c(arguments,"show"))\}\},hide:function()\{if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0])))\{return this._hide.apply(this,arguments)\}else\{return this.effect.apply(this,c(arguments,"hide"))\}\},toggle:function()\{if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))||(d.isFunction(arguments[0])||typeof arguments[0]=="boolean"))\{return this.__toggle.apply(this,arguments)\}else\{return this.effect.apply(this,c(arguments,"toggle"))\}\},addClass:function(g,f,i,h)\{return f?d.effects.animateClass.apply(this,[\{add:g\},f,i,h]):this._addClass(g)\},removeClass:function(g,f,i,h)\{return f?d.effects.animateClass.apply(this,[\{remove:g\},f,i,h]):this._removeClass(g)\},toggleClass:function(g,f,i,h)\{return((typeof f!=="boolean")&&f)?d.effects.animateClass.apply(this,[\{toggle:g\},f,i,h]):this._toggleClass(g,f)\},morph:function(f,h,g,j,i)\{return d.effects.animateClass.apply(this,[\{add:h,remove:f\},g,j,i])\},switchClass:function()\{return this.morph.apply(this,arguments)\},cssUnit:function(f)\{var g=this.css(f),h=[];d.each(["em","px","%","pt"],function(j,k)\{if(g.indexOf(k)>0)\{h=[parseFloat(g),k]\}\});return h\}\});d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(g,f)\{d.fx.step[f]=function(h)\{if(h.state==0)\{h.start=e(h.elem,f);h.end=b(h.end)\}h.elem.style[f]="rgb("+[Math.max(Math.min(parseInt((h.pos*(h.end[0]-h.start[0]))+h.start[0],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[1]-h.start[1]))+h.start[1],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[2]-h.start[2]))+h.start[2],10),255),0)].join(",")+")"\}\});function b(g)\{var f;if(g&&g.constructor==Array&&g.length==3)\{return g\}if(f=/rgb\\(\\s*([0-9]\{1,3\})\\s*,\\s*([0-9]\{1,3\})\\s*,\\s*([0-9]\{1,3\})\\s*\\)/.exec(g))\{return[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10)]\}if(f=/rgb\\(\\s*([0-9]+(?:\\.[0-9]+)?)\\%\\s*,\\s*([0-9]+(?:\\.[0-9]+)?)\\%\\s*,\\s*([0-9]+(?:\\.[0-9]+)?)\\%\\s*\\)/.exec(g))\{return[parseFloat(f[1])*2.55,parseFloat(f[2])*2.55,parseFloat(f[3])*2.55]\}if(f=/#([a-fA-F0-9]\{2\})([a-fA-F0-9]\{2\})([a-fA-F0-9]\{2\})/.exec(g))\{return[parseInt(f[1],16),parseInt(f[2],16),parseInt(f[3],16)]\}if(f=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g))\{return[parseInt(f[1]+f[1],16),parseInt(f[2]+f[2],16),parseInt(f[3]+f[3],16)]\}if(f=/rgba\\(0, 0, 0, 0\\)/.exec(g))\{return a.transparent\}return a[d.trim(g).toLowerCase()]\}function e(h,f)\{var g;do\{g=d.curCSS(h,f);if(g!=""&&g!="transparent"||d.nodeName(h,"body"))\{break\}f="backgroundColor"\}while(h=h.parentNode);return b(g)\}var a=\{aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]\};d.easing.jswing=d.easing.swing;d.extend(d.easing,\{def:"easeOutQuad",swing:function(g,h,f,j,i)\{return d.easing[d.easing.def](g,h,f,j,i)\},easeInQuad:function(g,h,f,j,i)\{return j*(h/=i)*h+f\},easeOutQuad:function(g,h,f,j,i)\{return -j*(h/=i)*(h-2)+f\},easeInOutQuad:function(g,h,f,j,i)\{if((h/=i/2)<1)\{return j/2*h*h+f\}return -j/2*((--h)*(h-2)-1)+f\},easeInCubic:function(g,h,f,j,i)\{return j*(h/=i)*h*h+f\},easeOutCubic:function(g,h,f,j,i)\{return j*((h=h/i-1)*h*h+1)+f\},easeInOutCubic:function(g,h,f,j,i)\{if((h/=i/2)<1)\{return j/2*h*h*h+f\}return j/2*((h-=2)*h*h+2)+f\},easeInQuart:function(g,h,f,j,i)\{return j*(h/=i)*h*h*h+f\},easeOutQuart:function(g,h,f,j,i)\{return -j*((h=h/i-1)*h*h*h-1)+f\},easeInOutQuart:function(g,h,f,j,i)\{if((h/=i/2)<1)\{return j/2*h*h*h*h+f\}return -j/2*((h-=2)*h*h*h-2)+f\},easeInQuint:function(g,h,f,j,i)\{return j*(h/=i)*h*h*h*h+f\},easeOutQuint:function(g,h,f,j,i)\{return j*((h=h/i-1)*h*h*h*h+1)+f\},easeInOutQuint:function(g,h,f,j,i)\{if((h/=i/2)<1)\{return j/2*h*h*h*h*h+f\}return j/2*((h-=2)*h*h*h*h+2)+f\},easeInSine:function(g,h,f,j,i)\{return -j*Math.cos(h/i*(Math.PI/2))+j+f\},easeOutSine:function(g,h,f,j,i)\{return j*Math.sin(h/i*(Math.PI/2))+f\},easeInOutSine:function(g,h,f,j,i)\{return -j/2*(Math.cos(Math.PI*h/i)-1)+f\},easeInExpo:function(g,h,f,j,i)\{return(h==0)?f:j*Math.pow(2,10*(h/i-1))+f\},easeOutExpo:function(g,h,f,j,i)\{return(h==i)?f+j:j*(-Math.pow(2,-10*h/i)+1)+f\},easeInOutExpo:function(g,h,f,j,i)\{if(h==0)\{return f\}if(h==i)\{return f+j\}if((h/=i/2)<1)\{return j/2*Math.pow(2,10*(h-1))+f\}return j/2*(-Math.pow(2,-10*--h)+2)+f\},easeInCirc:function(g,h,f,j,i)\{return -j*(Math.sqrt(1-(h/=i)*h)-1)+f\},easeOutCirc:function(g,h,f,j,i)\{return j*Math.sqrt(1-(h=h/i-1)*h)+f\},easeInOutCirc:function(g,h,f,j,i)\{if((h/=i/2)<1)\{return -j/2*(Math.sqrt(1-h*h)-1)+f\}return j/2*(Math.sqrt(1-(h-=2)*h)+1)+f\},easeInElastic:function(g,i,f,m,l)\{var j=1.70158;var k=0;var h=m;if(i==0)\{return f\}if((i/=l)==1)\{return f+m\}if(!k)\{k=l*0.3\}if(h<Math.abs(m))\{h=m;var j=k/4\}else\{var j=k/(2*Math.PI)*Math.asin(m/h)\}return -(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f\},easeOutElastic:function(g,i,f,m,l)\{var j=1.70158;var k=0;var h=m;if(i==0)\{return f\}if((i/=l)==1)\{return f+m\}if(!k)\{k=l*0.3\}if(h<Math.abs(m))\{h=m;var j=k/4\}else\{var j=k/(2*Math.PI)*Math.asin(m/h)\}return h*Math.pow(2,-10*i)*Math.sin((i*l-j)*(2*Math.PI)/k)+m+f\},easeInOutElastic:function(g,i,f,m,l)\{var j=1.70158;var k=0;var h=m;if(i==0)\{return f\}if((i/=l/2)==2)\{return f+m\}if(!k)\{k=l*(0.3*1.5)\}if(h<Math.abs(m))\{h=m;var j=k/4\}else\{var j=k/(2*Math.PI)*Math.asin(m/h)\}if(i<1)\{return -0.5*(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f\}return h*Math.pow(2,-10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k)*0.5+m+f\},easeInBack:function(g,h,f,k,j,i)\{if(i==undefined)\{i=1.70158\}return k*(h/=j)*h*((i+1)*h-i)+f\},easeOutBack:function(g,h,f,k,j,i)\{if(i==undefined)\{i=1.70158\}return k*((h=h/j-1)*h*((i+1)*h+i)+1)+f\},easeInOutBack:function(g,h,f,k,j,i)\{if(i==undefined)\{i=1.70158\}if((h/=j/2)<1)\{return k/2*(h*h*(((i*=(1.525))+1)*h-i))+f\}return k/2*((h-=2)*h*(((i*=(1.525))+1)*h+i)+2)+f\},easeInBounce:function(g,h,f,j,i)\{return j-d.easing.easeOutBounce(g,i-h,0,j,i)+f\},easeOutBounce:function(g,h,f,j,i)\{if((h/=i)<(1/2.75))\{return j*(7.5625*h*h)+f\}else\{if(h<(2/2.75))\{return j*(7.5625*(h-=(1.5/2.75))*h+0.75)+f\}else\{if(h<(2.5/2.75))\{return j*(7.5625*(h-=(2.25/2.75))*h+0.9375)+f\}else\{return j*(7.5625*(h-=(2.625/2.75))*h+0.984375)+f\}\}\}\},easeInOutBounce:function(g,h,f,j,i)\{if(h<i/2)\{return d.easing.easeInBounce(g,h*2,0,j,i)*0.5+f\}return d.easing.easeOutBounce(g,h*2-i,0,j,i)*0.5+j*0.5+f\}\})\})(jQuery);;/*\par
 * jQuery UI Effects Blind 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Blind\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.blind=function(b)\{return this.queue(function()\{var d=a(this),c=["position","top","left"];var h=a.effects.setMode(d,b.options.mode||"hide");var g=b.options.direction||"vertical";a.effects.save(d,c);d.show();var j=a.effects.createWrapper(d).css(\{overflow:"hidden"\});var e=(g=="vertical")?"height":"width";var i=(g=="vertical")?j.height():j.width();if(h=="show")\{j.css(e,0)\}var f=\{\};f[e]=h=="show"?i:0;j.animate(f,b.duration,b.options.easing,function()\{if(h=="hide")\{d.hide()\}a.effects.restore(d,c);a.effects.removeWrapper(d);if(b.callback)\{b.callback.apply(d[0],arguments)\}d.dequeue()\})\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Bounce 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Bounce\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.bounce=function(b)\{return this.queue(function()\{var e=a(this),l=["position","top","left"];var k=a.effects.setMode(e,b.options.mode||"effect");var n=b.options.direction||"up";var c=b.options.distance||20;var d=b.options.times||5;var g=b.duration||250;if(/show|hide/.test(k))\{l.push("opacity")\}a.effects.save(e,l);e.show();a.effects.createWrapper(e);var f=(n=="up"||n=="down")?"top":"left";var p=(n=="up"||n=="left")?"pos":"neg";var c=b.options.distance||(f=="top"?e.outerHeight(\{margin:true\})/3:e.outerWidth(\{margin:true\})/3);if(k=="show")\{e.css("opacity",0).css(f,p=="pos"?-c:c)\}if(k=="hide")\{c=c/(d*2)\}if(k!="hide")\{d--\}if(k=="show")\{var h=\{opacity:1\};h[f]=(p=="pos"?"+=":"-=")+c;e.animate(h,g/2,b.options.easing);c=c/2;d--\}for(var j=0;j<d;j++)\{var o=\{\},m=\{\};o[f]=(p=="pos"?"-=":"+=")+c;m[f]=(p=="pos"?"+=":"-=")+c;e.animate(o,g/2,b.options.easing).animate(m,g/2,b.options.easing);c=(k=="hide")?c*2:c/2\}if(k=="hide")\{var h=\{opacity:0\};h[f]=(p=="pos"?"-=":"+=")+c;e.animate(h,g/2,b.options.easing,function()\{e.hide();a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback)\{b.callback.apply(this,arguments)\}\})\}else\{var o=\{\},m=\{\};o[f]=(p=="pos"?"-=":"+=")+c;m[f]=(p=="pos"?"+=":"-=")+c;e.animate(o,g/2,b.options.easing).animate(m,g/2,b.options.easing,function()\{a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback)\{b.callback.apply(this,arguments)\}\})\}e.queue("fx",function()\{e.dequeue()\});e.dequeue()\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Clip 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Clip\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.clip=function(b)\{return this.queue(function()\{var f=a(this),j=["position","top","left","height","width"];var i=a.effects.setMode(f,b.options.mode||"hide");var k=b.options.direction||"vertical";a.effects.save(f,j);f.show();var c=a.effects.createWrapper(f).css(\{overflow:"hidden"\});var e=f[0].tagName=="IMG"?c:f;var g=\{size:(k=="vertical")?"height":"width",position:(k=="vertical")?"top":"left"\};var d=(k=="vertical")?e.height():e.width();if(i=="show")\{e.css(g.size,0);e.css(g.position,d/2)\}var h=\{\};h[g.size]=i=="show"?d:0;h[g.position]=i=="show"?0:d/2;e.animate(h,\{queue:false,duration:b.duration,easing:b.options.easing,complete:function()\{if(i=="hide")\{f.hide()\}a.effects.restore(f,j);a.effects.removeWrapper(f);if(b.callback)\{b.callback.apply(f[0],arguments)\}f.dequeue()\}\})\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Drop 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Drop\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.drop=function(b)\{return this.queue(function()\{var e=a(this),d=["position","top","left","opacity"];var i=a.effects.setMode(e,b.options.mode||"hide");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e);var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight(\{margin:true\})/2:e.outerWidth(\{margin:true\})/2);if(i=="show")\{e.css("opacity",0).css(f,c=="pos"?-j:j)\}var g=\{opacity:i=="show"?1:0\};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,\{queue:false,duration:b.duration,easing:b.options.easing,complete:function()\{if(i=="hide")\{e.hide()\}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback)\{b.callback.apply(this,arguments)\}e.dequeue()\}\})\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Explode 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Explode\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.explode=function(b)\{return this.queue(function()\{var k=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;var e=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;b.options.mode=b.options.mode=="toggle"?(a(this).is(":visible")?"hide":"show"):b.options.mode;var h=a(this).show().css("visibility","hidden");var l=h.offset();l.top-=parseInt(h.css("marginTop"),10)||0;l.left-=parseInt(h.css("marginLeft"),10)||0;var g=h.outerWidth(true);var c=h.outerHeight(true);for(var f=0;f<k;f++)\{for(var d=0;d<e;d++)\{h.clone().appendTo("body").wrap("<div></div>").css(\{position:"absolute",visibility:"visible",left:-d*(g/e),top:-f*(c/k)\}).parent().addClass("ui-effects-explode").css(\{position:"absolute",overflow:"hidden",width:g/e,height:c/k,left:l.left+d*(g/e)+(b.options.mode=="show"?(d-Math.floor(e/2))*(g/e):0),top:l.top+f*(c/k)+(b.options.mode=="show"?(f-Math.floor(k/2))*(c/k):0),opacity:b.options.mode=="show"?0:1\}).animate(\{left:l.left+d*(g/e)+(b.options.mode=="show"?0:(d-Math.floor(e/2))*(g/e)),top:l.top+f*(c/k)+(b.options.mode=="show"?0:(f-Math.floor(k/2))*(c/k)),opacity:b.options.mode=="show"?1:0\},b.duration||500)\}\}setTimeout(function()\{b.options.mode=="show"?h.css(\{visibility:"visible"\}):h.css(\{visibility:"visible"\}).hide();if(b.callback)\{b.callback.apply(h[0])\}h.dequeue();a("div.ui-effects-explode").remove()\},b.duration||500)\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Fold 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Fold\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.fold=function(b)\{return this.queue(function()\{var e=a(this),k=["position","top","left"];var h=a.effects.setMode(e,b.options.mode||"hide");var o=b.options.size||15;var n=!(!b.options.horizFirst);var g=b.duration?b.duration/2:a.fx.speeds._default/2;a.effects.save(e,k);e.show();var d=a.effects.createWrapper(e).css(\{overflow:"hidden"\});var i=((h=="show")!=n);var f=i?["width","height"]:["height","width"];var c=i?[d.width(),d.height()]:[d.height(),d.width()];var j=/([0-9]+)%/.exec(o);if(j)\{o=parseInt(j[1],10)/100*c[h=="hide"?0:1]\}if(h=="show")\{d.css(n?\{height:0,width:o\}:\{height:o,width:0\})\}var m=\{\},l=\{\};m[f[0]]=h=="show"?c[0]:o;l[f[1]]=h=="show"?c[1]:0;d.animate(m,g,b.options.easing).animate(l,g,b.options.easing,function()\{if(h=="hide")\{e.hide()\}a.effects.restore(e,k);a.effects.removeWrapper(e);if(b.callback)\{b.callback.apply(e[0],arguments)\}e.dequeue()\})\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Highlight 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Highlight\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.highlight=function(b)\{return this.queue(function()\{var e=a(this),d=["backgroundImage","backgroundColor","opacity"];var h=a.effects.setMode(e,b.options.mode||"show");var c=b.options.color||"#ffff99";var g=e.css("backgroundColor");a.effects.save(e,d);e.show();e.css(\{backgroundImage:"none",backgroundColor:c\});var f=\{backgroundColor:g\};if(h=="hide")\{f.opacity=0\}e.animate(f,\{queue:false,duration:b.duration,easing:b.options.easing,complete:function()\{if(h=="hide")\{e.hide()\}a.effects.restore(e,d);if(h=="show"&&a.browser.msie)\{this.style.removeAttribute("filter")\}if(b.callback)\{b.callback.apply(this,arguments)\}e.dequeue()\}\})\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Pulsate 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Pulsate\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.pulsate=function(b)\{return this.queue(function()\{var d=a(this);var g=a.effects.setMode(d,b.options.mode||"show");var f=b.options.times||5;var e=b.duration?b.duration/2:a.fx.speeds._default/2;if(g=="hide")\{f--\}if(d.is(":hidden"))\{d.css("opacity",0);d.show();d.animate(\{opacity:1\},e,b.options.easing);f=f-2\}for(var c=0;c<f;c++)\{d.animate(\{opacity:0\},e,b.options.easing).animate(\{opacity:1\},e,b.options.easing)\}if(g=="hide")\{d.animate(\{opacity:0\},e,b.options.easing,function()\{d.hide();if(b.callback)\{b.callback.apply(this,arguments)\}\})\}else\{d.animate(\{opacity:0\},e,b.options.easing).animate(\{opacity:1\},e,b.options.easing,function()\{if(b.callback)\{b.callback.apply(this,arguments)\}\})\}d.queue("fx",function()\{d.dequeue()\});d.dequeue()\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Scale 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Scale\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.puff=function(b)\{return this.queue(function()\{var f=a(this);var c=a.extend(true,\{\},b.options);var h=a.effects.setMode(f,b.options.mode||"hide");var g=parseInt(b.options.percent,10)||150;c.fade=true;var e=\{height:f.height(),width:f.width()\};var d=g/100;f.from=(h=="hide")?e:\{height:e.height*d,width:e.width*d\};c.from=f.from;c.percent=(h=="hide")?g:100;c.mode=h;f.effect("scale",c,b.duration,b.callback);f.dequeue()\})\};a.effects.scale=function(b)\{return this.queue(function()\{var g=a(this);var d=a.extend(true,\{\},b.options);var j=a.effects.setMode(g,b.options.mode||"effect");var h=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:(j=="hide"?0:100));var i=b.options.direction||"both";var c=b.options.origin;if(j!="effect")\{d.origin=c||["middle","center"];d.restore=true\}var f=\{height:g.height(),width:g.width()\};g.from=b.options.from||(j=="show"?\{height:0,width:0\}:f);var e=\{y:i!="horizontal"?(h/100):1,x:i!="vertical"?(h/100):1\};g.to=\{height:f.height*e.y,width:f.width*e.x\};if(b.options.fade)\{if(j=="show")\{g.from.opacity=0;g.to.opacity=1\}if(j=="hide")\{g.from.opacity=1;g.to.opacity=0\}\}d.from=g.from;d.to=g.to;d.mode=j;g.effect("size",d,b.duration,b.callback);g.dequeue()\})\};a.effects.size=function(b)\{return this.queue(function()\{var c=a(this),n=["position","top","left","width","height","overflow","opacity"];var m=["position","top","left","overflow","opacity"];var j=["width","height","overflow"];var p=["fontSize"];var k=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];var f=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];var g=a.effects.setMode(c,b.options.mode||"effect");var i=b.options.restore||false;var e=b.options.scale||"both";var o=b.options.origin;var d=\{height:c.height(),width:c.width()\};c.from=b.options.from||d;c.to=b.options.to||d;if(o)\{var h=a.effects.getBaseline(o,d);c.from.top=(d.height-c.from.height)*h.y;c.from.left=(d.width-c.from.width)*h.x;c.to.top=(d.height-c.to.height)*h.y;c.to.left=(d.width-c.to.width)*h.x\}var l=\{from:\{y:c.from.height/d.height,x:c.from.width/d.width\},to:\{y:c.to.height/d.height,x:c.to.width/d.width\}\};if(e=="box"||e=="both")\{if(l.from.y!=l.to.y)\{n=n.concat(k);c.from=a.effects.setTransition(c,k,l.from.y,c.from);c.to=a.effects.setTransition(c,k,l.to.y,c.to)\}if(l.from.x!=l.to.x)\{n=n.concat(f);c.from=a.effects.setTransition(c,f,l.from.x,c.from);c.to=a.effects.setTransition(c,f,l.to.x,c.to)\}\}if(e=="content"||e=="both")\{if(l.from.y!=l.to.y)\{n=n.concat(p);c.from=a.effects.setTransition(c,p,l.from.y,c.from);c.to=a.effects.setTransition(c,p,l.to.y,c.to)\}\}a.effects.save(c,i?n:m);c.show();a.effects.createWrapper(c);c.css("overflow","hidden").css(c.from);if(e=="content"||e=="both")\{k=k.concat(["marginTop","marginBottom"]).concat(p);f=f.concat(["marginLeft","marginRight"]);j=n.concat(k).concat(f);c.find("*[width]").each(function()\{child=a(this);if(i)\{a.effects.save(child,j)\}var q=\{height:child.height(),width:child.width()\};child.from=\{height:q.height*l.from.y,width:q.width*l.from.x\};child.to=\{height:q.height*l.to.y,width:q.width*l.to.x\};if(l.from.y!=l.to.y)\{child.from=a.effects.setTransition(child,k,l.from.y,child.from);child.to=a.effects.setTransition(child,k,l.to.y,child.to)\}if(l.from.x!=l.to.x)\{child.from=a.effects.setTransition(child,f,l.from.x,child.from);child.to=a.effects.setTransition(child,f,l.to.x,child.to)\}child.css(child.from);child.animate(child.to,b.duration,b.options.easing,function()\{if(i)\{a.effects.restore(child,j)\}\})\})\}c.animate(c.to,\{queue:false,duration:b.duration,easing:b.options.easing,complete:function()\{if(g=="hide")\{c.hide()\}a.effects.restore(c,i?n:m);a.effects.removeWrapper(c);if(b.callback)\{b.callback.apply(this,arguments)\}c.dequeue()\}\})\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Shake 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Shake\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.shake=function(b)\{return this.queue(function()\{var e=a(this),l=["position","top","left"];var k=a.effects.setMode(e,b.options.mode||"effect");var n=b.options.direction||"left";var c=b.options.distance||20;var d=b.options.times||3;var g=b.duration||b.options.duration||140;a.effects.save(e,l);e.show();a.effects.createWrapper(e);var f=(n=="up"||n=="down")?"top":"left";var p=(n=="up"||n=="left")?"pos":"neg";var h=\{\},o=\{\},m=\{\};h[f]=(p=="pos"?"-=":"+=")+c;o[f]=(p=="pos"?"+=":"-=")+c*2;m[f]=(p=="pos"?"-=":"+=")+c*2;e.animate(h,g,b.options.easing);for(var j=1;j<d;j++)\{e.animate(o,g,b.options.easing).animate(m,g,b.options.easing)\}e.animate(o,g,b.options.easing).animate(h,g/2,b.options.easing,function()\{a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback)\{b.callback.apply(this,arguments)\}\});e.queue("fx",function()\{e.dequeue()\});e.dequeue()\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Slide 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Slide\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.slide=function(b)\{return this.queue(function()\{var e=a(this),d=["position","top","left"];var i=a.effects.setMode(e,b.options.mode||"show");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e).css(\{overflow:"hidden"\});var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight(\{margin:true\}):e.outerWidth(\{margin:true\}));if(i=="show")\{e.css(f,c=="pos"?-j:j)\}var g=\{\};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,\{queue:false,duration:b.duration,easing:b.options.easing,complete:function()\{if(i=="hide")\{e.hide()\}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback)\{b.callback.apply(this,arguments)\}e.dequeue()\}\})\})\}\})(jQuery);;/*\par
 * jQuery UI Effects Transfer 1.7.2\par
 *\par
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)\par
 * Dual licensed under the MIT (MIT-LICENSE.txt)\par
 * and GPL (GPL-LICENSE.txt) licenses.\par
 *\par
 * http://docs.jquery.com/UI/Effects/Transfer\par
 *\par
 * Depends:\par
 *\tab effects.core.js\par
 */\par
(function(a)\{a.effects.transfer=function(b)\{return this.queue(function()\{var f=a(this),h=a(b.options.to),e=h.offset(),g=\{top:e.top,left:e.left,height:h.innerHeight(),width:h.innerWidth()\},d=f.offset(),c=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css(\{top:d.top,left:d.left,height:f.innerHeight(),width:f.innerWidth(),position:"absolute"\}).animate(g,b.duration,b.options.easing,function()\{c.remove();(b.callback&&b.callback.apply(f[0],arguments));f.dequeue()\})\})\}\})(jQuery);;\par
\par
/* jQuery plugin themeswitcher\par
---------------------------------------------------------------------*/\par
$.fn.themeswitcher = function(settings)\{\par
\tab var options = jQuery.extend(\{\par
\tab\tab loadTheme: null,\par
\tab\tab initialText: 'Cambiar Tema:',\par
\tab\tab width: 200,\par
\tab\tab height: 450,\par
\tab\tab buttonPreText: 'Tema: ',\par
\tab\tab closeOnSelect: true,\par
\tab\tab buttonHeight: 14,\par
\tab\tab cookieName: 'jquery-ui-theme',\par
\tab\tab onOpen: function()\{\},\par
\tab\tab onClose: function()\{\},\par
\tab\tab onSelect: function()\{\}\par
\tab\}, settings);\par
\tab var cerrar = false;\par
\par
\tab //markup \par
\tab var button = $('<a href="#" class="jquery-ui-themeswitcher-trigger"><span class="jquery-ui-themeswitcher-icon"></span><span class="jquery-ui-themeswitcher-title">'+ options.initialText +'</span></a>');\par
\tab var switcherpane = $('<div class="jquery-ui-themeswitcher"><div id="themeGallery">\tab <ul>\tab\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_smoothness.png" alt="Smoothness" title="Smoothness" />\tab\tab\tab <span class="themeName">Smoothness</span>\tab\tab </a></li>\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_windoze.png" alt="Redmond" title="Redmond" />\tab\tab\tab <span class="themeName">Redmond</span>\tab\tab </a></li>\tab\tab\tab\tab\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/sunny/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_sunny.png" alt="Sunny" title="Sunny" />\tab\tab\tab <span class="themeName">Sunny</span>\tab\tab </a></li>\tab\tab\tab\tab\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/overcast/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_overcast.png" alt="Overcast" title="Overcast" />\tab\tab\tab <span class="themeName">Overcast</span>\tab\tab\tab\tab </a></li>\tab\tab\tab\tab\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/le-frog/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_le_frog.png" alt="Le Frog" title="Le Frog" />\tab\tab\tab <span class="themeName">Le Frog</span>\tab\tab </a></li>\tab\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/eggplant/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_eggplant.png" alt="Eggplant" title="Eggplant" />\tab\tab\tab <span class="themeName">Eggplant</span>\tab\tab\tab\tab </a></li>\tab\tab\tab\tab\tab\tab\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/dark-hive/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_dark_hive.png" alt="Dark Hive" title="Dark Hive" />\tab\tab\tab <span class="themeName">Dark Hive</span>\tab\tab </a></li>\tab\tab\tab\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/vader/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_black_matte.png" alt="Vader" title="Vader" />\tab\tab\tab <span class="themeName">Vader</span>\tab\tab\tab </a></li>\tab\tab\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/dot-luv/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_dot_luv.png" alt="Dot Luv" title="Dot Luv" />\tab\tab\tab <span class="themeName">Dot Luv</span>\tab\tab\tab </a></li>\tab\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/mint-choc/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_mint_choco.png" alt="Mint Choc" title="Mint Choc" />\tab\tab\tab <span class="themeName">Mint Choc</span>\tab\tab </a></li>\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/black-tie/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_black_tie.png" alt="Black Tie" title="Black Tie" />\tab\tab\tab <span class="themeName">Black Tie</span>\tab\tab </a></li>\tab\tab <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/swanky-purse/jquery-ui.css">\tab\tab\tab <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_swanky_purse.png" alt="Swanky Purse" title="Swanky Purse" />\tab\tab\tab <span class="themeName">Swanky Purse</span>\tab\tab\tab </a></li>\tab </ul></div></div>').find('div').removeAttr('id');\par
\tab //var button = $('<a href="#" class="jquery-ui-themeswitcher-trigger"><span class="jquery-ui-themeswitcher-icon"></span><span class="jquery-ui-themeswitcher-title">'+ options.initialText +'</span></a>');\par
\tab //var switcherpane = $('<div class="jquery-ui-themeswitcher"><div id="themeGallery"><ul><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/ui-lightness/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_ui_light.png" alt="UI Lightness" title="UI Lightness" /> <span class="themeName">UI lightness</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/ui-darkness/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_ui_dark.png" alt="UI Darkness" title="UI Darkness" /><span class="themeName">UI darkness</span></a></li> <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/smoothness/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_smoothness.png" alt="Smoothness" title="Smoothness" /><span class="themeName">Smoothness</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/start/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_start_menu.png" alt="Start" title="Start" /><span class="themeName">Start</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/redmond/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_windoze.png" alt="Redmond" title="Redmond" /><span class="themeName">Redmond</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/sunny/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_sunny.png" alt="Sunny" title="Sunny" /><span class="themeName">Sunny</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/overcast/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_overcast.png" alt="Overcast" title="Overcast" /><span class="themeName">Overcast</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/le-frog/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_le_frog.png" alt="Le Frog" title="Le Frog" /> <span class="themeName">Le Frog</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/flick/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_flick.png" alt="Flick" title="Flick" /> <span class="themeName">Flick</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/pepper-grinder/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_pepper_grinder.png" alt="Pepper Grinder" title="Pepper Grinder" /> <span class="themeName">Pepper Grinder</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/eggplant/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_eggplant.png" alt="Eggplant" title="Eggplant" /><span class="themeName">Eggplant</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/dark-hive/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_dark_hive.png" alt="Dark Hive" title="Dark Hive" /> <span class="themeName">Dark Hive</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/cupertino/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_cupertino.png" alt="Cupertino" title="Cupertino" /> <span class="themeName">Cupertino</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/south-street/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_south_street.png" alt="South St" title="South St" /> <span class="themeName">South Street</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/blitzer/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_blitzer.png" alt="Blitzer" title="Blitzer" /><span class="themeName">Blitzer</span></a></li> <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/humanity/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_humanity.png" alt="Humanity" title="Humanity" /><span class="themeName">Humanity</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/hot-sneaks/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_hot_sneaks.png" alt="Hot Sneaks" title="Hot Sneaks" /> <span class="themeName">Hot sneaks</span></a></li> <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/excite-bike/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_excite_bike.png" alt="Excite Bike" title="Excite Bike" /><span class="themeName">Excite Bike</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/vader/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_black_matte.png" alt="Vader" title="Vader" /><span class="themeName">Vader</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/dot-luv/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_dot_luv.png" alt="Dot Luv" title="Dot Luv" /><span class="themeName">Dot Luv</span></a></li> <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/mint-choc/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_mint_choco.png" alt="Mint Choc" title="Mint Choc" /> <span class="themeName">Mint Choc</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/black-tie/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_black_tie.png" alt="Black Tie" title="Black Tie" /> <span class="themeName">Black Tie</span></a></li><li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/trontastic/jquery-ui.css"><img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_trontastic.png" alt="Trontastic" title="Trontastic" /> <span class="themeName">Trontastic</span></a></li> <li><a href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/swanky-purse/jquery-ui.css"> <img src="http://static.jquery.com/ui/themeroller/images/themeGallery/theme_30_swanky_purse.png" alt="Swanky Purse" title="Swanky Purse" /><span class="themeName">Swanky Purse</span> </a></li></ul></div></div>').find('div').removeAttr('id');\par
\par
\tab //button events\par
\tab button.click(\par
\tab\tab function()\{\par
\tab\tab\tab if(switcherpane.is(':visible'))\{ switcherpane.spHide(); \}\par
\tab\tab\tab else\{ switcherpane.spShow(); \}\par
\tab\tab\tab\tab\tab return false;\par
\tab\tab\}\par
\tab );\par
\tab\par
\tab //menu events (mouseout didn't work...)\par
\tab switcherpane.hover(\par
\tab\tab function()\{cerrar = false;\},\par
\tab\tab function()\{\par
\tab\tab\tab cerrar = true;\par
\tab\tab\tab var switcher = this;\par
\tab\tab\tab $.timer(500, function(timer)\{\par
\tab\tab\tab\tab if(switcherpane.is(':visible') && cerrar)\{$(switcher).spHide();\}\par
\tab\tab\tab\tab timer.stop();\par
\tab\tab\tab\});\par
\tab\tab\}\par
\tab );\par
\par
\tab //show/hide panel functions\par
\tab $.fn.spShow = function()\{ $(this).css(\{top: button.offset().top + options.buttonHeight + 6, left: button.offset().left\}).slideDown(50); button.css(button_active); options.onOpen(); \}\par
\tab $.fn.spHide = function()\{ $(this).slideUp(50, function()\{options.onClose();\}); button.css(button_default); \}\par
\tab\par
\tab\tab\par
\tab /* Theme Loading\par
\tab ---------------------------------------------------------------------*/\par
\tab switcherpane.find('a').click(function()\{\par
\tab\tab updateCSS( $(this).attr('href') );\par
\tab\tab var themeName = $(this).find('span').text();\par
\tab\tab button.find('.jquery-ui-themeswitcher-title').text( options.buttonPreText + themeName );\par
\tab\tab $.cookie(options.cookieName, themeName);\par
\tab\tab options.onSelect();\par
\tab\tab if(options.closeOnSelect && switcherpane.is(':visible'))\{ switcherpane.spHide(); \}\par
\tab\tab return false;\par
\tab\});\par
\tab\par
\tab //function to append a new theme stylesheet with the new style changes\par
\tab function updateCSS(locStr)\{\par
\tab\tab var cssLink = $('<link href="'+locStr+'" type="text/css" rel="Stylesheet" class="ui-theme" />');\par
\tab\tab $("head").append(cssLink);\par
\tab\tab\par
\tab\tab if( $("link.ui-theme").size() > 3)\{\par
\tab\tab\tab $("link.ui-theme:first").remove();\par
\tab\tab\}\par
\tab\tab\par
\tab\tab GM_setValue('sharkale-theme', locStr);\par
\tab\}\tab\par
\tab\par
\tab /* Inline CSS \par
\tab ---------------------------------------------------------------------*/\par
\tab var button_default = \{\par
\tab\tab fontFamily: 'Trebuchet MS, Verdana, sans-serif',\par
\tab\tab fontSize: '11px',\par
\tab\tab color: '#666',\par
\tab\tab background: '#eee url(http://jqueryui.com/themeroller/themeswitchertool/images/buttonbg.png) 50% 50% repeat-x',\par
\tab\tab border: '1px solid #ccc',\par
\tab\tab '-moz-border-radius': '6px',\par
\tab\tab '-webkit-border-radius': '6px',\par
\tab\tab textDecoration: 'none',\par
\tab\tab padding: '3px 3px 3px 8px',\par
\tab\tab width: options.width - 11,//minus must match left and right padding \par
\tab\tab display: 'block',\par
\tab\tab height: options.buttonHeight,\par
\tab\tab outline: '0'\par
\tab\};\par
\tab var button_hover = \{\par
\tab\tab 'borderColor':'#bbb',\par
\tab\tab 'background': '#f0f0f0',\par
\tab\tab cursor: 'pointer',\par
\tab\tab color: '#444'\par
\tab\};\par
\tab var button_active = \{\par
\tab\tab color: '#aaa',\par
\tab\tab background: '#000',\par
\tab\tab border: '1px solid #ccc',\par
\tab\tab borderBottom: 0,\par
\tab\tab '-moz-border-radius-bottomleft': 0,\par
\tab\tab '-webkit-border-bottom-left-radius': 0,\par
\tab\tab '-moz-border-radius-bottomright': 0,\par
\tab\tab '-webkit-border-bottom-right-radius': 0,\par
\tab\tab outline: '0'\par
\tab\};\par
\tab\par
\tab\par
\tab\par
\tab //button css\par
\tab button.css(button_default)\par
\tab .hover(\par
\tab\tab function()\{ \par
\tab\tab\tab $(this).css(button_hover); \par
\tab\tab\},\par
\tab\tab function()\{ \par
\tab\tab  if( !switcherpane.is(':animated') && switcherpane.is(':hidden') )\{\tab $(this).css(button_default);  \}\par
\tab\tab\}\tab\par
\tab )\par
\tab .find('.jquery-ui-themeswitcher-icon').css(\{\par
\tab\tab float: 'right',\par
\tab\tab width: '16px',\par
\tab\tab height: '16px',\par
\tab\tab background: 'url(http://jqueryui.com/themeroller/themeswitchertool/images/icon_color_arrow.gif) 50% 50% no-repeat'\par
\tab\});\tab\par
\tab //pane css\par
\tab switcherpane.css(\{\par
\tab\tab position: 'absolute',\par
\tab\tab float: 'left',\par
\tab\tab fontFamily: 'Trebuchet MS, Verdana, sans-serif',\par
\tab\tab fontSize: '12px',\par
\tab\tab background: '#000',\par
\tab\tab color: '#fff',\par
\tab\tab padding: '3px 3px 3px',\par
\tab\tab border: '1px solid #ccc',\par
\tab\tab '-moz-border-radius-bottomleft': '6px',\par
\tab\tab '-webkit-border-bottom-left-radius': '6px',\par
\tab\tab '-moz-border-radius-bottomright': '6px',\par
\tab\tab '-webkit-border-bottom-right-radius': '6px',\par
\tab\tab borderTop: 0,\par
\tab\tab zIndex: 999999,\par
\tab\tab width: options.width-6//minus must match left and right padding\par
\tab\})\par
\tab .find('ul').css(\{\par
\tab\tab listStyle: 'none',\par
\tab\tab margin: '0',\par
\tab\tab padding: '0',\par
\tab\tab overflow: 'auto',\par
\tab\tab height: options.height\par
\tab\}).end()\par
\tab .find('li').hover(\par
\tab\tab function()\{ \par
\tab\tab\tab $(this).css(\{\par
\tab\tab\tab\tab 'borderColor':'#555',\par
\tab\tab\tab\tab 'background': 'url(http://jqueryui.com/themeroller/themeswitchertool/images/menuhoverbg.png) 50% 50% repeat-x',\par
\tab\tab\tab\tab cursor: 'pointer'\par
\tab\tab\tab\}); \par
\tab\tab\},\par
\tab\tab function()\{ \par
\tab\tab\tab $(this).css(\{\par
\tab\tab\tab\tab 'borderColor':'#111',\par
\tab\tab\tab\tab 'background': '#000',\par
\tab\tab\tab\tab cursor: 'auto'\par
\tab\tab\tab\}); \par
\tab\tab\}\par
\tab ).css(\{\par
\tab\tab width: options.width-15,\par
\tab\tab height: '',\par
\tab\tab padding: '2px',\par
\tab\tab margin: '1px',\par
\tab\tab border: '1px solid #111',\par
\tab\tab '-moz-border-radius': '4px',\par
\tab\tab clear: 'left',\par
\tab\tab float: 'left'\par
\tab\}).end()\par
\tab .find('a').css(\{\par
\tab\tab color: '#aaa',\par
\tab\tab textDecoration: 'none',\par
\tab\tab float: 'left',\par
\tab\tab width: '100%',\par
\tab\tab outline: '0'\par
\tab\}).end()\par
\tab .find('img').css(\{\par
\tab\tab float: 'left',\par
\tab\tab border: '1px solid #333',\par
\tab\tab margin: '0 2px'\par
\tab\}).end()\par
\tab .find('.themeName').css(\{\par
\tab\tab float: 'left',\par
\tab\tab margin: '3px 0'\par
\tab\}).end();\par
\tab\par
\par
\par
\tab $(this).append(button);\par
\tab $('body').append(switcherpane);\par
\tab switcherpane.hide();\par
\tab if( $.cookie(options.cookieName) || options.loadTheme )\{\par
\tab\tab var themeName = $.cookie(options.cookieName) || options.loadTheme;\par
\tab\tab switcherpane.find('a:contains('+ themeName +')').trigger('click');\par
\tab\}\par
\par
\tab return this;\par
\};\par
\par
/**\par
 * Cookie plugin\par
 *\par
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)\par
 * Dual licensed under the MIT and GPL licenses:\par
 * http://www.opensource.org/licenses/mit-license.php\par
 * http://www.gnu.org/licenses/gpl.html\par
 *\par
 */\par
jQuery.cookie = function(name, value, options) \{\par
    if (typeof value != 'undefined') \{ // name and value given, set cookie\par
        options = options || \{\};\par
        if (value === null) \{\par
            value = '';\par
            options.expires = -1;\par
        \}\par
        var expires = '';\par
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) \{\par
            var date;\par
            if (typeof options.expires == 'number') \{\par
                date = new Date();\par
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));\par
            \} else \{\par
                date = options.expires;\par
            \}\par
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE\par
        \}\par
        var path = options.path ? '; path=' + (options.path) : '';\par
        var domain = options.domain ? '; domain=' + (options.domain) : '';\par
        var secure = options.secure ? '; secure' : '';\par
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');\par
    \} else \{ // only name given, get cookie\par
        var cookieValue = null;\par
        if (document.cookie && document.cookie != '') \{\par
            var cookies = document.cookie.split(';');\par
            for (var i = 0; i < cookies.length; i++) \{\par
                var cookie = jQuery.trim(cookies[i]);\par
                // Does this cookie string begin with the name we want?\par
                if (cookie.substring(0, name.length + 1) == (name + '=')) \{\par
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));\par
                    break;\par
                \}\par
            \}\par
        \}\par
        return cookieValue;\par
    \}\par
\};\par
\par
function esta(buscar, donde) \{\par
\tab for(var i=0;i<donde.length;i++)\{\par
\tab\tab if(donde[i] == buscar) return true;\par
\tab\}\par
\tab return false;\par
\}\par
\par
function unico(tratar)\{\par
    var lista = new Array();\par
    for(var i=0;i<tratar.length;i++)\{\par
\tab\tab tratar[i] = $.trim(tratar[i]);\par
\tab\tab if(tratar[i] != '')\{\par
\tab\tab\tab if(!esta(tratar[i],lista))\{\par
\tab\tab\tab\tab lista.push(tratar[i]);\par
\tab\tab\tab\}\par
\tab\tab\}\par
    \}\par
    return lista;\par
\}\par
\par
\par
/////////////////////////////FUNCIONES////////////////////////////////\par
/////////////////////////////FUNCIONES////////////////////////////////\par
/////////////////////////////FUNCIONES////////////////////////////////\par
/////////////////////////////FUNCIONES////////////////////////////////\par
/////////////////////////////FUNCIONES////////////////////////////////\par
/////////////////////////////FUNCIONES////////////////////////////////\par
/////////////////////////////FUNCIONES////////////////////////////////\par
/////////////////////////////FUNCIONES////////////////////////////////\par
\par
var user = $('a[class="username"]:first').html();\par
var datospag = unsafeWindow.global_data;\par
\par
// ==Menu y Variables que no se borran==\par
if(GM_getValue("inicio") == undefined || GM_getValue("inicio") == true)\{\par
\tab GM_setValue("vYT",true);\par
\tab GM_setValue("aSWF",true);\par
\tab GM_setValue("PunFav",true);\par
\tab GM_setValue("PermHD",false);\par
\tab GM_setValue("EmotVis",true);\par
\tab GM_setValue("LinkCheck",true);\par
\tab GM_setValue("DisimPoring",false);\par
\tab GM_setValue("NovatosPrinc",true);\par
\tab GM_setValue("CambiarTheme",true);\par
\tab GM_setValue("inicio",false);\par
\}\par
\par
var vYT = GM_getValue("vYT",true);\par
var aSWF = GM_getValue("aSWF",true);\par
var PunFav = GM_getValue("PunFav",true);\par
var PermHD = GM_getValue("PermHD",false);\par
var EmotVis = GM_getValue("EmotVis",true);\par
var LinkCheck = GM_getValue("LinkCheck",true);\par
var DisimPoring = GM_getValue("DisimPoring",false);\par
var NovatosPrinc = GM_getValue("NovatosPrinc",true);\par
var CambiarTheme = GM_getValue("CambiarTheme",true);\par
\tab\par
\tab if(CambiarTheme) GM_registerMenuCommand("BBCoder para Taringa - Cambiar el theme de la p\'c3\'a1gina", Cambiar_Theme);\par
\par
\tab GM_registerMenuCommand("BBCoder para Taringa - Reinicializar Valores", function() \{\par
\tab\tab GM_setValue("inicio",true);\par
\tab\tab location.reload();\tab\tab\par
\tab\},null,null,"R");\par
\par
\tab GM_registerMenuCommand("BBCoder para Taringa - Buscar Actualizaciones", function() \{\par
\tab\tab ActualizarScript(\{\par
\tab\tab\tab url: urlscript2+'version-bbcode-taringa.php?'+Math.floor(Math.random()*100000),\par
\tab\tab\tab version: ultversion,\par
\tab\tab\tab forzado: true\par
     \tab\});\par
\tab\},null,null,"A");\par
\par
\tab GM_registerMenuCommand("BBCoder para Taringa - Reportar BUG o Sugerencia", function() \{\par
\tab\tab GM_openInTab("http://www.taringa.net/mensajes/a/Sharkale");\par
\tab\},null,null,"B");\par
\par
\tab GM_registerMenuCommand("BBCoder para Taringa - Entrar al post del Script", function() \{\par
\tab\tab GM_openInTab(postscript);\par
\tab\},null,null,"P");\par
\par
\tab GM_registerMenuCommand("BBCoder para Taringa - Versi\'c3\'b3n Instalada: " + ultversion, function() \{\par
\tab\tab alert("Tu versi\'c3\'b3n instalada actualmente es: " + ultversion);\par
\tab\},null,null,"V");\par
\par
// ==/Menu==\par
\par
// ==Funciones==\par
\par
function Taringa_Set_Function(func, nueva_func)\{\par
\tab if(typeof unsafeWindow == "object")\{\par
\tab\tab unsafeWindow[func] = nueva_func;\par
\tab\}\par
\}\par
\par
function $$(BuscarClass,nodo,tag) \{\par
\tab var classElements = new Array();\par
\tab if (nodo == null)\par
\tab\tab nodo = document;\par
\tab if (tag == null)\par
\tab\tab tag = '*';\par
\tab var els = nodo.getElementsByTagName(tag);\par
\tab var elsLen = els.length;\par
\tab var pattern = new RegExp("(^|\\\\s)"+BuscarClass+"(\\\\s|$)");\par
\tab for (i = 0, j = 0; i < elsLen; i++) \{\par
\tab\tab if (pattern.test(els[i].className) ) \{\par
\tab\tab\tab classElements[j] = els[i];\par
\tab\tab\tab j++;\par
\tab\tab\}\par
\tab\}\par
\tab return classElements;\par
\}\par
\par
function $$$(elem) \{\par
\tab return document.getElementById(elem);\par
\}\par
\par
function CrearBarraBBC()\{\par
\tab\tab GM_addStyle(".markItUpHeader \{padding:5px 0;\}.msg_add_comment \{margin-top:3px;\}");\par
\tab\tab var nuevaHTML = "<div id='Sharkale_TaringaBBC' style='display:block;'>";\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\\'[align=left]\\', \\'[/align]\\')"><img src="'+URL+'izquierdo.png" alt="L" title="'+tarLang["BarraBBC"][0]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\\'[align=center]\\', \\'[/align]\\')"><img src="'+URL+'centrado.png" alt="C" title="'+tarLang["BarraBBC"][1]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\\'[align=right]\\', \\'[/align]\\')"><img src="'+URL+'derecho.png" alt="R" title="'+tarLang["BarraBBC"][2]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\\'[b]\\', \\'[/b]\\')"><img src="'+URL+'negrita.png" alt="B" title="'+tarLang["BarraBBC"][3]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\\'[i]\\', \\'[/i]\\')"><img src="'+URL+'cursiva.png" alt="I" title="'+tarLang["BarraBBC"][4]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\\'[u]\\', \\'[/u]\\')"><img src="'+URL+'subrayado.png" alt="U" title="'+tarLang["BarraBBC"][5]+'" border="0"></a>&nbsp;';\par
\tab\tab if(path != 'post')\{\par
\tab\tab\tab nuevaHTML += '<select id="colordefont"style="font-size: 10px;position:relative; top:-4px; min-height: 16px; max-height: 16px;" onchange="insertarBBC(\\'[color=\\' + $$(\\'colordefont\\').options[$$(\\'colordefont\\').selectedIndex].value + \\']\\', \\'[/color]\\');this.selectedIndex=0;">';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: black;" value="#"\tab\tab\tab >'+tarLang["BarraBBC"]["color"][0]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: darkred;" value="darkred"\tab >'+tarLang["BarraBBC"]["color"][1]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: red;" value="red"\tab\tab\tab >'+tarLang["BarraBBC"]["color"][2]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: orange;" value="orange"\tab >'+tarLang["BarraBBC"]["color"][3]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: brown;" value="brown"\tab\tab >'+tarLang["BarraBBC"]["color"][4]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: yellow;" value="yellow"\tab >'+tarLang["BarraBBC"]["color"][5]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: green;" value="green"\tab\tab >'+tarLang["BarraBBC"]["color"][6]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: olive;" value="olive"\tab\tab >'+tarLang["BarraBBC"]["color"][7]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: cyan;" value="cyan"\tab\tab >'+tarLang["BarraBBC"]["color"][8]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: blue;" value="blue"\tab\tab >'+tarLang["BarraBBC"]["color"][9]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: darkblue;" value="darkblue">'+tarLang["BarraBBC"]["color"][10]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: indigo;" value="indigo"\tab >'+tarLang["BarraBBC"]["color"][11]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: violet;" value="violet"\tab >'+tarLang["BarraBBC"]["color"][12]+'</option>';\par
\tab\tab\tab nuevaHTML += '\tab <option style="color: black;" value="black"\tab\tab >'+tarLang["BarraBBC"]["color"][13]+'</option>';\par
\tab\tab\tab nuevaHTML += '</select>&nbsp;';\par
\tab\tab\}\par
\tab\tab nuevaHTML += '<select id="sizedefont" style="font-size: 10px; position:relative; top:-4px; min-height: 16px; max-height: 16px;" onchange="insertarBBC(\\'[size=\\' + $$(\\'sizedefont\\').options[$$(\\'sizedefont\\').selectedIndex].value + \\']\\', \\'[/size]\\');this.selectedIndex=1;">';\par
\tab\tab nuevaHTML += '\tab <option value="9">9px</option>';\par
\tab\tab nuevaHTML += '\tab <option value="12" selected="selected">12px </option>';\par
\tab\tab nuevaHTML += '\tab <option value="14">14px</option>';\par
\tab\tab nuevaHTML += '\tab <option value="16">16px</option>';\par
\tab\tab nuevaHTML += '\tab <option value="18">18px</option>';\par
\tab\tab nuevaHTML += '\tab <option value="20">20px</option>';\par
\tab\tab nuevaHTML += '\tab <option value="22">22px</option>';\par
\tab\tab nuevaHTML += '\tab <option value="24">24px</option>';\par
\tab\tab nuevaHTML += '</select>&nbsp;';\par
\tab\tab nuevaHTML += '<select id="tipodefont" style="font-size: 10px; position:relative; top:-4px; min-height: 16px; max-height: 16px;" onchange="insertarBBC(\\'[font=\\' + $$(\\'tipodefont\\').options[$$(\\'tipodefont\\').selectedIndex].value + \\']\\', \\'[/font]\\');this.selectedIndex=0;">';\par
\tab\tab nuevaHTML += '\tab <option value="#">'+tarLang["BarraBBC"][6]+'</option>';\par
\tab\tab nuevaHTML += '\tab <option value="American Typewriter" style="font-family: American Typewriter;">American Typewriter</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Arial" style="font-family: Arial;">Arial</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Arial Black" style="font-family: Arial Black;">Arial Black</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Calibri" style="font-family: Calibri;">Calibri</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Century" style="font-family: Century;">Century</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Chiller" style="font-family: Chiller;">Chiller</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Comic Sans MS" style="font-family: Comic Sans MS;">Comic Sans MS</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Courier New" style="font-family: Courier New;">Courier New</option>';\par
\tab\tab nuevaHTML += '\tab <option value="FixedSys" style="font-family: FixedSys;">FixedSys</option>';\par
\tab\tab nuevaHTML += '\tab <option value="French Script MT" style="font-family: French Script MT;">French Script MT</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Georgia" style="font-family: Georgia;">Georgia</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Impact" style="font-family: Impact;">Impact</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Lucida Sans" style="font-family: Lucida Sans;">Lucida Sans</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Lucida Console" style="font-family: Lucida Console;">Lucida Console</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Monotype Corsiva" style="font-family: Monotype Corsiva;">Monotype Corsiva</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Times New Roman" style="font-family: Times New Roman;">Times New Roman</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Traditional Arabic" style="font-family: Traditional Arabic;">Traditional Arabic</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Trebuchet MS" style="font-family: Trebuchet MS;">Trebuchet</option>';\par
\tab\tab nuevaHTML += '\tab <option value="Verdana" style="font-family: Verdana;">Verdana</option>';\par
\tab\tab nuevaHTML += '</select>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'vyoutube\\')"><img src="'+URL+'youtube.png" alt="Y" title="'+tarLang["BarraBBC"][7]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'vgoogle\\')"><img src="'+URL+'google.png" alt="G" title="'+tarLang["BarraBBC"][8]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'vmegavideo\\')"><img src="'+URL+'megavideo.png" alt="M" title="'+tarLang["BarraBBC"][9]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'goear\\')"><img src="'+URL+'goear.png" alt="G" title="'+tarLang["BarraBBC"][10]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'esnips\\')"><img src="'+URL+'esnips.png" alt="E" title="'+tarLang["BarraBBC"][11]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'swf\\')"><img src="'+URL+'swf.png" alt="F" title="'+tarLang["BarraBBC"][12]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'image\\')"><img src="'+URL+'imagen.png" alt="I" title="'+tarLang["BarraBBC"][13]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'imageclick\\')"><img src="'+URL+'imagen-click.png" alt="IC" title="'+tarLang["BarraBBC"][14]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'link\\')"><img src="'+URL+'link.png" alt="U" title="'+tarLang["BarraBBC"][15]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'url2bbc\\')"><img src="'+URL+'link.png" alt="U2" title="'+tarLang["BarraBBC"][16]+'" border="0"></a>&nbsp;';\par
\tab\tab //nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'url2bbc2\\')"><img src="'+URL+'link.png" alt="URL" title="'+tarLang["BarraBBC"][16]+'" border="0"></a>&nbsp;';\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="botonPrompt(\\'quote\\')"><img src="'+URL+'cita.png" alt="C" title="'+tarLang["BarraBBC"][17]+'" border="0"></a>&nbsp;';\par
\tab\tab if(path == 'post' || path == 'mensajes' || path == 'comunidades' || path == 'comuagregar')\{\par
\tab\tab\tab nuevaHTML +='<a href="javascript:void(0)" onclick="preview()"><img src="'+URL+'preview.png" alt="P" title="'+tarLang["BarraBBC"][18]+'" border="0"></a>';\par
\tab\tab\}\par
\tab\tab nuevaHTML += "</div>";\par
\tab\tab return nuevaHTML;\par
\}\par
\par
function CrearBarraColores()\{\par
\tab\tab var colores = '#000000,#222222,#444444,#666666,#888888,#AAAAAA,#000000,#000040,#000080,#0000BF,#0000FF,#004000,#004040,#004080,#0040BF,#0040FF,#008000,#008040,#008080,#0080BF,#0080FF,#00BF00,#00BF40,#00BF80,#00BFBF,#00BFFF,#00FF00,#00FF40,#00FF80,#00FFBF,#00FFFF,#400000,#400040,#400080,#4000BF,#4000FF,#404000,#404040,#404080,#4040BF,#4040FF,#408000,#408040,#408080,#4080BF,#4080FF,#40BF00,#40BF40,#40BF80,#40BFBF,#40BFFF,#40FF00,#40FF40,#40FF80,#40FFBF,#40FFFF,#800000,#800040,#800080,#8000BF,#8000FF,#804000,#804040,#804080,#8040BF,#8040FF,#808000,#808040,#808080,#8080BF,#8080FF,#80BF00,#80BF40,#80BF80,#80BFBF,#80BFFF,#80FF00,#80FF40,#80FF80,#80FFBF,#80FFFF,#BF0000,#BF0040,#BF0080,#BF00BF,#BF00FF,#BF4000,#BF4040,#BF4080,#BF40BF,#BF40FF,#BF8000,#BF8040,#BF8080,#BF80BF,#BF80FF,#BFBF00,#BFBF40,#BFBF80,#BFBFBF,#BFBFFF,#BFFF00,#BFFF40,#BFFF80,#BFFFBF,#BFFFFF,#FF0000,#FF0040,#FF0080,#FF00BF,#FF00FF,#FF4000,#FF4040,#FF4080,#FF40BF,#FF40FF,#FF8000,#FF8040,#FF8080,#FF80BF,#FF80FF,#FFBF00,#FFBF40,#FFBF80,#FFBFBF,#FFBFFF,#FFFF00,#FFFF40,#FFFF80,#FFFFBF,#FFFFFF';\par
\tab\tab colores = colores.split(',');\par
\tab\tab var nuevaHTML = '<div id="Sharkale_TaringaColores" style="position: absolute!important;margin-left:-85px"><table border="0" cellpadding="0" cellspacing="1" align="center" bgcolor="#000000" onmouseover="this.style.cursor=\\'pointer\\'"><tbody><tr>'; \par
\tab\tab for(var i = 1; i < colores.length; i++)\{\par
\tab\tab\tab nuevaHTML += '<td bgcolor="'+colores[i]+'"><img src="'+URL+'spacer.gif" onclick="insertarBBC(\\'[color='+colores[i]+']\\', \\'[/color]\\'); return false;" alt="'+colores[i]+'" title="'+colores[i]+'" width="15" height="11"></td>';\par
\tab\tab\tab if(i%5 == 0 && i != colores.length-1) nuevaHTML += '</tr><tr>';\par
\tab\tab\}\par
\tab\tab nuevaHTML += "</tr></tbody></table></div>";\par
\tab\tab return nuevaHTML;\par
\}\par
\par
function Procesar_Datos(datos)\{\par
\tab if(datos == 'Disculpas! Hubo un error al procesar lo solicitado. Por favor, int&eacute;ntalo nuevamente en unos minutos.')\{\par
\tab\tab return 'Taringa no responde. =)';\par
\tab\}else if(datos["error"])\{\par
\tab\tab switch(datos["error"]["code"])\{\par
\tab\tab\tab case 1: return 'M\'c3\'a9todo Perdido.';break;\par
\tab\tab\tab case 2: return 'Clave para API Inv\'c3\'a1lida.';break;\par
\tab\tab\tab case 3:\tab return 'Formato Inv\'c3\'a1lido.';break;\par
\tab\tab\tab case 4: return 'M\'c3\'a9todo Inv\'c3\'a1lido.';break;\par
\tab\tab\tab case 5: return 'Faltan Par\'c3\'a1metros..';break;\par
\tab\tab\tab case 6: return 'Nick de Usuario Inv\'c3\'a1lido.';break;\par
\tab\tab\tab case 7: return 'Par\'c3\'a1metro Inv\'c3\'a1lido.';break;\par
\tab\tab\tab case 8: return 'Sin Datos.';break;\par
\tab\tab\tab case 9: return 'Post Eliminado.';break;\par
\tab\tab\tab case 10: return 'Post Privado.';break;\par
\tab\tab\tab case 11: return 'L\'c3\-mite de pedidos por minuto superado.';break;\par
\tab\tab\tab default: return 'Error desconocido';\par
\tab\tab\}\par
\tab\}else\{\par
\tab\tab return new Function("return "+datos)();\par
\tab\}\par
\}\par
\par
function Sharkale_TopPost(alcargar,t,p)\{\par
\tab /** Que raro que Taringa! desactiv\'c3\'b3 la api paralostop post.\par
\tab\tab Parece que su ram de 64MB no la soporta =) **/\par
\tab /*var tiempo = -1;\par
\tab var posts = -1;\par
\tab var maspunt;\par
\tab var mascoment;\par
\tab var masfav;\par
\tab var masvisit;\par
\tab var masposts;\par
\tab var maspuntos;\par
\tab var categorias;\par
\tab if(!alcargar)\{\par
\tab\tab tiempo = t;\par
\tab\tab posts = p;\par
\tab\}else\{\par
\tab\tab $.ajax(\{\par
\tab\tab\tab type: 'GET',\par
\tab\tab\tab url: 'http://'+Dom+'/api/shark32455Dfa/json/Posts-GetCategories',\par
\tab\tab\tab success: function(h)\{\par
\tab\tab\tab\tab categorias = Procesar_Datos(h);\par
\tab\tab\tab\tab if(typeof(categorias) == 'string')\{\par
\tab\tab\tab\tab\tab $('#cattop').html('<option value="-1">Todas</option>');\par
\tab\tab\tab\tab\}else\{\par
\tab\tab\tab\tab\tab var html = '<option value="-1">Todas</option>';\par
\tab\tab\tab\tab\tab for(var i in categorias)\{\par
\tab\tab\tab\tab\tab\tab html += '\tab\tab\tab <option value="'+categorias[i]["id"]+'">'+categorias[i]["name"]+'</option>';\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab $('#cattop').html(html);\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\},\par
\tab\tab\tab error: function(h)\{\par
\tab\tab\tab\tab $('#cattop').html('<option value="-1">Todas</option>');\par
\tab\tab\tab\}\par
\tab\tab\});\par
\tab\}\par
\tab\tab\tab //////////////////////////////////////////\par
\tab $.timer(1500, function(timer)\{\par
\tab timer.stop();\par
\tab $.ajax(\{\par
\tab\tab type: 'GET',\par
\tab\tab url: 'http://'+Dom+'/api/shark32455Dfa/json/Posts-GetTopPosts/'+tiempo+'/1/'+posts,\par
\tab\tab success: function(h)\{\par
\tab\tab\tab maspunt = Procesar_Datos(h);\par
\tab\tab\tab if(typeof(maspunt) == 'string')\{\par
\tab\tab\tab\tab $('#maspunt').html('<b>Error al obtener datos.<br><br>Causa: </b>'+maspunt);\par
\tab\tab\tab\}else\{\par
\tab\tab\tab\tab var html = '';\par
\tab\tab\tab\tab for(var i in maspunt)\{\par
\tab\tab\tab\tab\tab html += '\tab\tab\tab <b>'+maspunt[i]["position"]+'</b> - <a title="'+maspunt[i]["title"]+' - '+maspunt[i]["date"]+'" href="'+maspunt[i]["location"]+'">'+(maspunt[i]["title"].length > 35? maspunt[i]["title"].substring(0,35)+'...':maspunt[i]["title"])+'</a> ('+maspunt[i]["score"]+' pnts)<br/>';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab $('#maspunt').html(html);\par
\tab\tab\tab\}\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab $('#maspunt').html('<b>Error al obtener datos.<br><br>Causa: </b>Taringa no responde. =)');\par
\tab\tab\}\par
\tab\});\par
\tab\});\par
\tab\tab\tab\tab //////////////////////////////////////////\par
\tab $.timer(3000, function(timer)\{\par
\tab timer.stop();\par
\tab $.ajax(\{\par
\tab\tab type: 'GET',\par
\tab\tab url: 'http://'+Dom+'/api/shark32455Dfa/json/Posts-GetTopPosts/'+tiempo+'/2/'+posts,\par
\tab\tab success: function(h)\{\par
\tab\tab\tab mascoment = Procesar_Datos(h);\par
\tab\tab\tab if(typeof(mascoment) == 'string')\{\par
\tab\tab\tab\tab $('#mascoment').html('<b>Error al obtener datos.<br><br>Causa: </b>'+mascoment);\par
\tab\tab\tab\}else\{\par
\tab\tab\tab\tab var html = '';\par
\tab\tab\tab\tab for(var i in mascoment)\{\par
\tab\tab\tab\tab\tab html += '\tab\tab\tab <b>'+mascoment[i]["position"]+'</b> - <a title="'+mascoment[i]["title"]+' - '+mascoment[i]["date"]+'" href="'+mascoment[i]["location"]+'">'+(mascoment[i]["title"].length > 35? mascoment[i]["title"].substring(0,35)+'...':mascoment[i]["title"])+'</a> ('+mascoment[i]["score"]+' com)<br/>';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab $('#mascoment').html(html);\par
\tab\tab\tab\}\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab $('#mascoment').html('<b>Error al obtener datos.<br><br>Causa: </b>Taringa no responde. =)');\par
\tab\tab\}\par
\tab\});\par
\tab\});\par
\tab\tab\tab //////////////////////////////////////////\par
\tab\par
\tab\tab\tab\tab\tab //////////////////////////////////////////\par
\tab $.timer(4500, function(timer)\{\par
\tab timer.stop();\par
\tab $.ajax(\{\par
\tab\tab type: 'GET',\par
\tab\tab url: 'http://'+Dom+'/api/shark32455Dfa/json/Posts-GetTopPosts/'+tiempo+'/3/'+posts,\par
\tab\tab success: function(h)\{\par
\tab\tab\tab masfav = Procesar_Datos(h);\par
\tab\tab\tab if(typeof(masfav) == 'string')\{\par
\tab\tab\tab\tab $('#masfav').html('<b>Error al obtener datos.<br><br>Causa: </b>'+masfav);\par
\tab\tab\tab\}else\{\par
\tab\tab\tab\tab var html = '';\par
\tab\tab\tab\tab for(var i in masfav)\{\par
\tab\tab\tab\tab\tab html += '\tab\tab\tab <b>'+masfav[i]["position"]+'</b> - <a title="'+masfav[i]["title"]+' - '+masfav[i]["date"]+'" href="'+masfav[i]["location"]+'">'+(masfav[i]["title"].length > 35? masfav[i]["title"].substring(0,35)+'...':masfav[i]["title"])+'</a> ('+masfav[i]["score"]+' fav)<br/>';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab $('#masfav').html(html);\par
\tab\tab\tab\}\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab $('#masfav').html('<b>Error al obtener datos.<br><br>Causa: </b>Taringa no responde. =)');\par
\tab\tab\}\par
\tab\});\par
\tab\});\par
\tab\tab\tab //////////////////////////////////////////\par
\tab\par
\tab\tab\tab\tab //////////////////////////////////////////\par
\tab $.timer(6000, function(timer)\{\par
\tab timer.stop();\par
\tab $.ajax(\{\par
\tab\tab type: 'GET',\par
\tab\tab url: 'http://'+Dom+'/api/shark32455Dfa/json/Posts-GetTopPosts/'+tiempo+'/4/'+posts,\par
\tab\tab success: function(h)\{\par
\tab\tab\tab masvisit = Procesar_Datos(h);\par
\tab\tab\tab if(typeof(masvisit) == 'string')\{\par
\tab\tab\tab\tab $('#masvisit').html('<b>Error al obtener datos.<br><br>Causa: </b>'+masvisit);\par
\tab\tab\tab\}else\{\par
\tab\tab\tab\tab var html = '';\par
\tab\tab\tab\tab for(var i in masvisit)\{\par
\tab\tab\tab\tab\tab html += '\tab\tab\tab <b>'+masvisit[i]["position"]+'</b> - <a title="'+masvisit[i]["title"]+' - '+masvisit[i]["date"]+'" href="'+masvisit[i]["location"]+'">'+(masvisit[i]["title"].length > 30? masvisit[i]["title"].substring(0,30)+'...':masvisit[i]["title"])+'</a> ('+masvisit[i]["score"]+' vis)<br/>';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab $('#masvisit').html(html);\par
\tab\tab\tab\}\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab $('#masvisit').html('<b>Error al obtener datos.<br><br>Causa: </b>Taringa no responde. =)');\par
\tab\tab\}\par
\tab\});\par
\tab\});\par
\tab\tab\tab //////////////////////////////////////////\par
\tab\par
\tab\tab\tab\tab //////////////////////////////////////////\par
\tab $.timer(7500, function(timer)\{\par
\tab timer.stop();\par
\tab $.ajax(\{\par
\tab\tab type: 'GET',\par
\tab\tab url: 'http://'+Dom+'/api/shark32455Dfa/json/Posts-GetTopUsers/'+tiempo+'/1/'+posts,\par
\tab\tab success: function(h)\{\par
\tab\tab\tab masposts = Procesar_Datos(h);\par
\tab\tab\tab if(typeof(masposts) == 'string')\{\par
\tab\tab\tab\tab $('#masposts').html('<b>Error al obtener datos.<br><br>Causa: </b>'+masposts);\par
\tab\tab\tab\}else\{\par
\tab\tab\tab\tab var html = '';\par
\tab\tab\tab\tab for(var i in masposts)\{\par
\tab\tab\tab\tab\tab html += '\tab\tab\tab <b>'+masposts[i]["position"]+'</b> - <a href="http://www.taringa.net/perfil/'+masposts[i]["nick"]+'">'+masposts[i]["nick"]+'</a> ('+masposts[i]["score"]+' posts)<br/>';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab $('#masposts').html(html);\par
\tab\tab\tab\}\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab $('#masposts').html('<b>Error al obtener datos.<br><br>Causa: </b>Taringa no responde. =)');\par
\tab\tab\}\par
\tab\});\par
\tab\});\par
\tab\tab\tab //////////////////////////////////////////\par
\tab\par
\tab\tab\tab\tab //////////////////////////////////////////\par
\tab $.timer(9000, function(timer)\{\par
\tab timer.stop();\par
\tab $.ajax(\{\par
\tab\tab type: 'GET',\par
\tab\tab url: 'http://'+Dom+'/api/shark32455Dfa/json/Posts-GetTopUsers/'+tiempo+'/2/'+posts,\par
\tab\tab success: function(h)\{\par
\tab\tab\tab maspuntos = Procesar_Datos(h);\par
\tab\tab\tab if(typeof(maspuntos) == 'string')\{\par
\tab\tab\tab\tab $('#maspuntos').html('<b>Error al obtener datos.<br><br>Causa: </b>'+maspuntos);\par
\tab\tab\tab\}else\{\par
\tab\tab\tab\tab var html = '';\par
\tab\tab\tab\tab for(var i in maspuntos)\{\par
\tab\tab\tab\tab\tab html += '\tab\tab\tab <b>'+maspuntos[i]["position"]+'</b> - <a href="http://www.taringa.net/perfil/'+maspuntos[i]["nick"]+'">'+maspuntos[i]["nick"]+'</a> ('+maspuntos[i]["score"]+' puntos)<br/>';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab $('#maspuntos').html(html);\par
\tab\tab\tab\}\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab $('#maspuntos').html('<b>Error al obtener datos.<br><br>Causa: </b>Taringa no responde. =)');\par
\tab\tab\}\par
\tab\});\par
\tab\});\par
\tab\tab\tab //////////////////////////////////////////\par
\tab\par
\tab var html = '';\par
\tab if(alcargar)\{\par
\tab html += '\tab <div align="center" class="box_cuerpo">';\par
\tab html += '\tab\tab <b>TOPs de </b>';\par
\tab html += '\tab\tab <select id="fechatop">';\par
\tab html += '\tab\tab\tab <option selected="1" value="-1">Todos los tiempos</option>';\par
\tab html += '\tab\tab\tab <option value="1">Hoy</option>';\par
\tab html += '\tab\tab\tab <option value="2">Ayer</option>';\par
\tab html += '\tab\tab\tab <option value="3">De la semana</option>';\par
\tab html += '\tab\tab\tab <option value="4">Del mes</option>';\par
\tab html += '\tab\tab\tab <option value="5">Mes Anterior</option>';\par
\tab html += '\tab\tab </select>';\par
\tab html += '\tab\tab <b>de la Categoria:</b>';\par
\tab html += '\tab\tab <select id="cattop">';\par
\tab html += '\tab\tab\tab <option value="-1">Cargando...</option>';\par
\tab html += '\tab\tab </select>';\par
\tab html += '\tab\tab <input id="Btn_Filtrar_Tops" type="button" title="Filtrar Top Posts" value="Filtrar - Sharkale\'c2\'ae" style="font-size: 12px; width: 200px;" class="login"/><br/>';\par
\tab html += '\tab\tab <b>La visualizaci\'c3\'b3n de los top puede tardar unos minutos... Tambi\'c3\'a9n ten en cuanta que solo puedes hacer 2 consultas por minuto.</b>';\par
\tab html += '\tab </div><br/>';\par
\tab html += '\tab <div id="actualizar_busqueda">';\par
\tab\}\par
\tab html += '\tab <div style="width: 300px;float:left;height:auto;overflow:hidden;padding:2px 6px;" id="top_izquierda">';\par
\tab html += '\tab\tab <div style="width: 300px;" class="box_title">';\par
\tab html += '\tab\tab\tab <div style="width: 200px;" class="box_txt">Top post con m\'c3\'a1s puntos</div>';\par
\tab html += '\tab\tab\tab <div style="background-image:url(http://i.t.net.ar/images/cor-der.gif);background-position:right top;background-repeat:no-repeat;float:right;padding-right:8px;padding-top:4px;"></div>';\par
\tab html += '\tab\tab </div>';\par
\tab html += '\tab\tab <div id="maspunt" style="width: 285px;" class="box_cuerpo">';\par
\tab html += '\tab\tab\tab <div align="center"><img src="http://i27.tinypic.com/2wp8bdg.gif" align="absmiddle"/></div>';\par
\tab html += '\tab\tab </div><br/>';\par
\tab html += '\tab\tab <div style="width: 300px;" class="box_title">';\par
\tab html += '\tab\tab\tab <div style="width: 200px;" class="box_txt">Top post m\'c3\'a1s comentado</div>';\par
\tab html += '\tab\tab\tab <div style="background-image:url(http://i.t.net.ar/images/cor-der.gif);background-position:right top;background-repeat:no-repeat;float:right;padding-right:8px;padding-top:4px;"></div>';\par
\tab html += '\tab\tab </div>';\par
\tab html += '\tab\tab <div id="mascoment" style="width: 285px;" class="box_cuerpo">';\par
\tab html += '\tab\tab\tab <div align="center"><img src="http://i27.tinypic.com/2wp8bdg.gif" align="absmiddle"/></div>';\par
\tab html += '\tab\tab </div>';\par
\tab html += '\tab </div>';\par
\tab html += '\tab <div style="width: 300px;float:left;height:auto;overflow:hidden;padding:2px 6px;" id="top_centro">';\par
\tab html += '\tab\tab <div style="width: 300px;" class="box_title">';\par
\tab html += '\tab\tab\tab <div style="width: 268px;" class="box_txt">Top post m\'c3\'a1s favorito</div>';\par
\tab html += '\tab\tab\tab <div style="background-image:url(http://i.t.net.ar/images/cor-der.gif);background-position:right top;background-repeat:no-repeat;float:right;padding-right:8px;padding-top:4px;"></div>';\par
\tab html += '\tab\tab </div>';\par
\tab html += '\tab\tab <div id="masfav" style="width: 284px;" class="box_cuerpo">';\par
\tab html += '\tab\tab\tab <div align="center"><img src="http://i27.tinypic.com/2wp8bdg.gif" align="absmiddle"/></div>';\par
\tab html += '\tab\tab </div><br/>';\par
\tab html += '\tab\tab <div style="width: 300px;" class="box_title">';\par
\tab html += '\tab\tab\tab <div style="width: 268px;" class="box_txt">Top post m\'c3\'a1s visitado</div>';\par
\tab html += '\tab\tab\tab <div style="background-image:url(http://i.t.net.ar/images/cor-der.gif);background-position:right top;background-repeat:no-repeat;float:right;padding-right:8px;padding-top:4px;"></div>';\par
\tab html += '\tab\tab </div>';\par
\tab html += '\tab\tab <div id="masvisit" style="width: 284px;" class="box_cuerpo">';\par
\tab html += '\tab\tab\tab <div align="center"><img src="http://i27.tinypic.com/2wp8bdg.gif" align="absmiddle"/></div>';\par
\tab html += '\tab\tab </div>';\par
\tab html += '\tab </div>';\par
\tab html += '\tab <div style="width: 300px;float:left;height:auto;overflow:hidden;padding:2px 6px;" id="top_derecha">';\par
\tab html += '\tab\tab <div style="width: 300px;" class="box_title">';\par
\tab html += '\tab\tab\tab <div style="width: 268px;" class="box_txt">Top usuario m\'c3\'a1s posteador</div>';\par
\tab html += '\tab\tab\tab <div style="background-image:url(http://i.t.net.ar/images/cor-der.gif);background-position:right top;background-repeat:no-repeat;float:right;padding-right:8px;padding-top:4px;"></div>';\par
\tab html += '\tab\tab </div>';\par
\tab html += '\tab\tab <div id="masposts" style="width: 284px;" class="box_cuerpo">';\par
\tab html += '\tab\tab\tab <div align="center"><img src="http://i27.tinypic.com/2wp8bdg.gif" align="absmiddle"/></div>';\par
\tab html += '\tab\tab </div><br/>';\par
\tab html += '\tab\tab <div style="width: 300px;" class="box_title">';\par
\tab html += '\tab\tab\tab <div style="width: 268px;" class="box_txt">Top usuario con m\'c3\'a1s puntos</div>';\par
\tab html += '\tab\tab\tab <div style="background-image:url(http://i.t.net.ar/images/cor-der.gif);background-position:right top;background-repeat:no-repeat;float:right;padding-right:8px;padding-top:4px;"></div>';\par
\tab html += '\tab\tab </div>';\par
\tab html += '\tab\tab <div id="maspuntos" style="width: 284px;" class="box_cuerpo">';\par
\tab html += '\tab\tab\tab <div align="center"><img src="http://i27.tinypic.com/2wp8bdg.gif" align="absmiddle"/></div>';\par
\tab html += '\tab\tab </div>';\par
\tab html += '\tab </div>';\par
\tab if(alcargar)\{\par
\tab html += '\tab </div>';\par
\tab html += '\tab <br clear="left"/>';\par
\tab html += '\tab <!-- fin cuerpocontainer -->';\par
\tab return html;\par
\tab\}\par
\tab $('#actualizar_busqueda').html(html);*/\par
\}\par
\par
var autor;\par
function shark_print_cmmt(id,nro,userid,nick,txtcita,date,txt)\{\par
\tab var HTML = '';\par
\tab function dr(s)\{ HTML += s; \}\par
\tab dr('<a name="cmnt_'+id+'"></a>');\par
\tab dr('<div id="div_cmnt_'+id+'">');\par
\tab if(autor)\par
\tab\tab dr('<input type="checkbox" name="cmnt_'+id+'" />');\par
\tab dr('<a onclick="citar_comment('+id+')" href="javascript:void(0)">');\par
\tab dr('#'+nro);\par
\tab dr('</a>');\par
\tab dr(' - ');\par
\tab dr('<a href="/perfil/'+userid+'"><b');\par
\tab dr(' id="autor_cmnt_'+id+'" user_comment="'+nick+'" text_comment="'+txtcita+'"');\par
\tab dr('>'+nick+'</b></a> ');\par
\tab dr('<a onclick="citar_comment('+id+')" href="javascript:void(0)"><span style="position:relative;"><img border=0 src="http://i.t.net.ar/images/big3v1.gif" style="position:absolute; top:-160px; clip:rect(160px 16px 176px 0px);" alt="Citar Comentario" title="Citar Comentario" /><img border=0 src="http://i.t.net.ar/images/space.gif" style="width:16px;height:16px" align="absmiddle" /></span></a> ');\par
\tab dr('<a href="/mensajes/a/'+nick+'"><span style="position:relative;"><img border=0 src="http://i.t.net.ar/images/big1v8.gif" style="position:absolute; top:-462px; clip:rect(462px 16px 478px 0px);" alt="Mandale un mensaje" title="Mandale un mensaje" /><img border=0 src="http://i.t.net.ar/images/space.gif" style="width:16px;height:16px" align="absmiddle" /></span></a> ');\par
\tab dr('| <span class="size10">'+date+'</span> dijo:<br />');\par
\tab dr(txt+'</div>');\par
\tab dr('<hr />');\par
\tab return HTML;\par
\}\par
\par
function obtenerEmoticones()\{\par
\tab var URLtaringa = 'http://i.t.net.ar/images/smiles/';\par
\tab var emot_GuarAux = GM_getValue('emoticones', emot_Orig);\par
\tab var emot_GuarAux = emot_GuarAux.split(',');\par
\tab return emot_GuarAux;\tab\tab\tab  \par
\}\par
\par
function CrearBarraEmoticones()\{\par
\tab GM_addStyle(".SharkaleEmoticones img \{max-width:40px;max-height:40px;\}");\par
\tab var URLtaringa = 'http://i.t.net.ar/images/smiles/';\par
\tab var nuevaHTML = '<div id="Sharkale_TaringaEmoticones" align="center" class="SharkaleEmoticones" style="display:'+(EmotVis == true || path == "mensajes"? 'block':'none')+'">';\par
\tab var emot = obtenerEmoticones();\par
\tab for (var i = 0; i < emot.length; i=i+2)\{\par
\tab\tab nuevaHTML += '<a href="javascript:void(0)" onclick="insertarBBC(\\' '+emot[i]+' \\')"><img src="'+emot[i+1]+'" alt="" title="" border="0"></a>&nbsp;';\par
\tab\}\par
\tab nuevaHTML += "</div>";\par
\tab return nuevaHTML;\par
\}\par
\par
function Cargar_Emoticones()\{\par
\tab var emot = obtenerEmoticones();\par
\tab var nroemot = 0;\par
\tab html = ''\par
\tab for (var i = 0; i < emot.length; i=i+2)\{\par
\tab\tab nroemot++;\par
\tab\tab html += '<span id="shark_emot_'+nroemot+'" style="position: relative; left: 5px; top: 4px;"><img src="'+emot[i+1]+'" alt="" "[img='+emot[i+1]+']" style="height:60px;width:60px;"><a href="javascript:void(0)" onclick="$(\\'#shark_emot_'+nroemot+'\\').remove()"><img src="http://i26.tinypic.com/211rk2t.gif" alt="Eliminar" title="Eliminar" height="12" width="12"></a><input type="hidden" name="sharkale_emot_'+nroemot+'" value="'+emot[i]+'"><input type="hidden" name="sharkale_emot_'+nroemot+'" value="'+emot[i+1]+'"></span>';\par
\tab\}\par
\tab return html;\par
\}\par
\par
function Agregar_Emoticones()\{\par
\tab var urlbarra = prompt('Ingrese la direcci\'c3\'b3n URL v\'c3\'a1lida del emoticon que ser\'c3\'a1 mostrado en tu barra.');\par
\tab if(urlbarra != '' && urlbarra != null)\{\par
\tab\tab if(urlbarra.search(/^https?:\\/\\//gi) != -1 && urlbarra.search(/,/) == -1)\{\par
\tab\tab\tab var urlemot = prompt('Ingrese la direcci\'c3\'b3n URL v\'c3\'a1lida del emoticon que ser\'c3\'a1 mostrado a los dem\'c3\'a1s.');\par
\tab\tab\tab if(urlemot != '' && urlemot != null)\{\par
\tab\tab\tab\tab if(urlemot.search(/^https?:\\/\\//gi) != -1 && urlemot.search(/,/) == -1)\{\par
\tab\tab\tab\tab\tab nuevosemot++;\par
\tab\tab\tab\tab\tab html = '<span id="shark_emot_nueva_'+nuevosemot+'" style="position: relative; left: 5px; top: 4px;"><img src="'+urlemot+'" alt="" title="[img='+urlemot+']" style="height:60px;width:60px;"><a href="javascript:void(0)" onclick="$(\\'#shark_emot_nueva_'+nuevosemot+'\\').remove()"><img src="http://i26.tinypic.com/211rk2t.gif" alt="Eliminar" title="Eliminar" height="12" width="12"></a><input type="hidden" name="sharkale_emot_nueva_'+nuevosemot+'" value="[img='+urlemot+']"><input type="hidden" name="sharkale_emot_nueva_'+nuevosemot+'" value="'+urlbarra+'"></span>';\par
\tab\tab\tab\tab\tab $('#emoticones_personalizados').append(html);\par
\tab\tab\tab\tab\}else\{\par
\tab\tab\tab\tab\tab alert('La direcci\'c3\'b3n URL del emoticon es inv\'c3\'a1lida.\\n\\nAsegurese de que comienza con "http://" y que no contiene comas ","');\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\}else\{\par
\tab\tab\tab alert('La direcci\'c3\'b3n URL del emoticon es inv\'c3\'a1lida.\\n\\nAsegurese de que comienza con "http://" y que no contiene comas ","');\par
\tab\tab\}\tab\par
\tab\}\par
\}\par
\par
function Guardar_Emoticones()\{\par
\tab if(confirm('\'c2\'bfEst\'c3\'a1 seguro que desea guardar los cambios en los emoticones?\\n\\nEste cambio es permanente.'))\{\par
\tab\tab var input = document.getElementsByTagName('input');\par
\tab\tab window.emots=Array();\par
\tab\tab for(var i=0; i<input.length; i++)\{\par
\tab\tab\tab var o = input.item(i);\par
\tab\tab\tab if(o.type=='hidden' && o.name.search(/sharkale_emot/gi) != -1)\{\par
\tab\tab\tab\tab var emot = o.value;\par
\tab\tab\tab\tab emots[emots.length] = emot;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab GM_setValue('emoticones', emots.toString());\par
\tab\}\par
\}\par
\par
function Reestablecer_Emoticones()\{\par
\tab if(confirm('\'c2\'bfEst\'c3\'a1 seguro que desea volver a los emoticones originales?\\n\\nEste cambio es permanente.'))\{\par
\tab\tab GM_setValue('emoticones', emot_Orig);\par
\tab\tab $('#emoticones_personalizados').html(Cargar_Emoticones());\par
\tab\}\par
\}\par
\par
// ==/Funciones==\par
\par
// ==Funciones que ser\'c3\'a1n agregadas a la p\'c3\'a1gina==\par
function AgregarFuncionesenWeb()\{\par
\par
Taringa_Set_Function("Ocultar_Emoticones", function(elemento)\{\par
\tab if(elemento.value == "Mostrar Emoticones")\{\par
\tab\tab $('#Sharkale_TaringaEmoticones').slideDown();\par
\tab\tab elemento.value = "Ocultar Emoticones";\par
\tab\}else\{\par
\tab\tab $('#Sharkale_TaringaEmoticones').slideUp();\par
\tab\tab elemento.value = "Mostrar Emoticones";\par
\tab\}\par
\});\par
\par
Taringa_Set_Function("$$", function(elm_id)\{\par
\tab return document.getElementById(elm_id);\par
\});\par
\par
Taringa_Set_Function("botonPrompt", function(tipo)\{\par
var inicio = txt.selectionStart;\par
var fin   = txt.selectionEnd;\par
var seleccion = txt.value.substring(inicio, fin);\par
if(tipo=='vyoutube')\{ //YouTube\par
\tab var msg = prompt(tarLang["Promt"][0]);\par
\tab if(msg != '' && msg != null)\{\par
\tab\tab var regexp = /(?:youtube\\.com\\/(?:watch\\?v\\=|v\\/)[\\w|\\-]*)/i;\par
\tab\tab var enc = regexp.exec(msg);\par
\tab\tab if (enc != null) \{\par
\tab\tab\tab regexp = /(?:v[\\/|=][\\w|-]*)/i;\par
\tab\tab\tab enc = enc[0].match(regexp);\par
\tab\tab\tab if (enc != null) msg = enc[0].substring(2);\par
\tab\tab\}\par
\tab\tab if(msg.length < 5 || msg.length > 20) \{\par
\tab\tab\tab alert(tarLang["Promt"][1]);\par
\tab\tab\} else \{\par
\tab\tab\tab if(PermHD == true)\{\par
\tab\tab\tab\tab var hd = confirm(tarLang["Promt"][2]);\par
\tab\tab\tab\tab if (hd==true)\par
\tab\tab\tab\tab\tab unsafeWindow.insertarBBC('[swf=http://www.youtube.com/v/' + msg + '&fmt=22]');\par
\tab\tab\tab\tab else\par
\tab\tab\tab\tab\tab unsafeWindow.insertarBBC('[swf=http://www.youtube.com/v/' + msg + '&fmt=18]');\par
\tab\tab\tab\} else\par
\tab\tab\tab unsafeWindow.insertarBBC('[swf=http://www.youtube.com/v/' + msg + ']');\par
\tab\tab\}\par
\tab\}\par
\}else if(tipo=='vgoogle')\{ //Google Video\par
\tab var msg = prompt(tarLang["Promt"][3]);\par
\tab if(msg != '' && msg != null)\{\par
\tab\tab var regexp = /(?:video\\.google\\.com\\/(?:videoplay|googleplayer\\.swf)\\?docid\\=[\\w|-]*)/i;\par
\tab\tab var enc = regexp.exec(msg);\par
\tab\tab if (enc != null) \{\par
\tab\tab\tab regexp = /(?:\\=[\\w|-]*)/;\par
\tab\tab\tab enc = enc[0].match(regexp);\par
\tab\tab\tab if (enc != null) msg = enc[0].substring(1);\par
\tab\tab\}\par
\tab\tab if(msg.length < 5 || msg.length > 25)\par
\tab\tab\tab alert(tarLang["Promt"][1]);\par
\tab\tab else\par
\tab\tab\tab unsafeWindow.insertarBBC('[swf=http://video.google.com/googleplayer.swf?docId=' + msg + ']');\par
\tab\}\par
\}else if(tipo=='vmegavideo')\{ //Megavideo\par
\tab var msg = prompt(tarLang["Promt"][4]);\par
\tab if(msg != '' && msg != null)\{\par
\tab\tab var regexp = /(megavideo\\.com\\/(?:v\\/|\\?v=)[\\w|-]*)/i;\par
\tab\tab var enc = regexp.exec(msg);\par
\tab\tab if (enc != null) \{\par
\tab\tab\tab regexp = /(?:v\\/|v=)([\\w]*)/;\par
\tab\tab\tab enc = enc[0].match(regexp);\par
\tab\tab\tab if (enc != null) msg = enc[0].substring(2);\par
\tab\tab\}\par
\tab\tab if(msg.length < 5 || msg.length > 50)\par
\tab\tab\tab alert(tarLang["Promt"][1]);\par
\tab\tab else\par
\tab\tab\tab unsafeWindow.insertarBBC('[swf=http://www.megavideo.com/v/' + msg + ']');\par
\tab\}\par
\}else if(tipo=='goear')\{ //Cancion GoEar\par
\tab var msg = prompt(tarLang["Promt"][5]);\par
\tab if(msg != '' && msg != null)\{\par
\tab\tab var regexp = /(?:(?:file|v)=[\\w]*)/i;\par
\tab\tab var enc = regexp.exec(msg);\par
\tab\tab if (enc != null) \{\par
\tab\tab\tab regexp = /(?:=[\\w]*)/;\par
\tab\tab\tab enc = enc[0].match(regexp);\par
\tab\tab\tab if (enc != null) msg = enc[0].substring(1);\par
\tab\tab\}\par
\tab\tab if(msg.length < 5 || msg.length > 15)\par
\tab\tab\tab alert(tarLang["Promt"][6]);\par
\tab\tab else\par
\tab\tab\tab unsafeWindow.insertarBBC('[swf=http://www.goear.com/files/external.swf?file=' + msg + ']');\par
\tab\}\par
\}else if(tipo=='esnips')\{ //Cancion MP3\par
\tab var msg = prompt(tarLang["Promt"][7]);\par
\tab if(msg != '' && msg != null)\{\par
\tab\tab var regexp = /(?:doc\\/[\\w|\\-|\\/]*)/i;\par
\tab\tab var enc = regexp.exec(msg);\par
\tab\tab if (enc != null && enc[0].substring(4).indexOf('/') != -1) \{\par
\tab\tab\tab msg = enc[0].substring(4);\par
\tab\tab\tab if(msg.length < 30 || msg.indexOf("/") == -1)\{\par
\tab\tab\tab\tab alert(tarLang["Promt"][6]);\par
\tab\tab\tab\} else \{\par
\tab\tab\tab\tab var params = msg.split("/",2);\par
\tab\tab\tab\tab unsafeWindow.insertarBBC('[swf=http://www.esnips.com/escentral/images/widgets/flash/player_dj.swf?autoPlay=no&theFile=http://www.esnips.com/nsdoc/' + params[0] + '&theName=' + params[1] + '&thePlayerURL=http://www.esnips.com/escentral/images/widgets/flash/mp3WidgetPlayer.swf]');\par
\tab\tab\tab\}\par
\tab\tab\} else \{\par
\tab\tab\tab regexp = /(?:doc\\/[\\w|\\-]*\\&amp\\;[\\w|\\ |\\-|\\=]*)/i;\par
\tab\tab\tab enc = regexp.exec(msg);\par
\tab\tab\tab if (enc != null) \{\par
\tab\tab\tab\tab msg = enc[0].substring(4);\par
\tab\tab\tab\tab var params = msg.split("&amp;theName=",2);\par
\tab\tab\tab\tab unsafeWindow.insertarBBC('[swf=http://www.esnips.com/escentral/images/widgets/flash/player_dj.swf?autoPlay=no&theFile=http://www.esnips.com/nsdoc/' + params[0] + '&theName=' + params[1] + '&thePlayerURL=http://www.esnips.com/escentral/images/widgets/flash/mp3WidgetPlayer.swf]');\par
\tab\tab\tab\}else alert(tarLang["Promt"][6]);\par
\tab\tab\}\par
\tab\}\par
\}else if(tipo=='swf')\{ //Flash\par
    if(seleccion.substring(0,7) != 'http://')\{\par
\tab\tab var msg = prompt(tarLang["Promt"][8],'http://');\par
\tab\tab if(msg != '' && msg != null)\par
\tab\tab\tab unsafeWindow.insertarBBC('[swf=' + msg + ']');\par
    \} else unsafeWindow.insertarBBC('[swf=',']');\par
\}else if(tipo=='quote')\{ //Cita\par
\tab if(seleccion.length > 0)\{\par
\tab\tab unsafeWindow.insertarBBC('[quote]', '[/quote]');\par
\tab\}else\{\par
\tab\tab var msg = prompt(tarLang["Promt"][9]);\par
\tab\tab if(msg != '' && msg != null) unsafeWindow.insertarBBC('[quote]' + msg + '[/quote]');\par
\tab\}\par
\}else if(tipo=='image')\{ //Imagen\par
    if(seleccion.substring(0,7) != 'http://')\{\par
\tab var msg = prompt(tarLang["Promt"][10],'http://');\par
\tab if(msg != '' && msg != null)\par
\tab\tab unsafeWindow.insertarBBC('[img]' + msg + '[/img]');\par
    \} else unsafeWindow.insertarBBC('[img]','[/img]');\par
\}else if(tipo=='imageclick')\{ //Imagen clickeable\par
    var msg = prompt(tarLang["Promt"][10],'http://');\par
    if(msg != '' && msg != null)\{\par
\tab var msg2 = prompt(tarLang["Promt"][11],'http://');\par
\tab if(msg2 != '' && msg2 != null)\par
\tab\tab unsafeWindow.insertarBBC('[url='+msg2+'][img]' + msg + '[/img][/url]');\par
    \}\par
\}else if(tipo=='link')\{ //Link\par
    if(seleccion.substring(0,7) != 'http://')\{\par
\tab var msg = prompt(tarLang["Promt"][12],'http://');\par
\tab if(msg != '' && msg != null)\{\par
\tab\tab if(inicio == fin) \{\par
\tab\tab    var msg2 = prompt(tarLang["Promt"][13]);\par
\tab\tab    if(msg2 != '' && msg2 != null)\par
\tab\tab\tab unsafeWindow.insertarBBC('[url='+msg+']'+msg2+'[/url]')\par
\tab\tab    else\par
\tab\tab\tab unsafeWindow.insertarBBC('[url]'+msg+'[/url]');\par
\tab\tab\} else\par
\tab\tab\tab unsafeWindow.insertarBBC('[url='+msg+']','[/url]');\par
\tab\}\par
    \} else unsafeWindow.insertarBBC('[url]','[/url]');\par
\}else if(tipo=='url2bbc')\{ //Link\par
\tab var scrollTop = txt.scrollTop;\par
\tab var regex = /((?:https?|ftp):\\/\\/[^\\s'"'<>()]*|[-\\w.+]+@(?:[-\\w]+\\.)+[\\w]\{2,6\})/gi;\par
\tab txt.value = txt.value.replace(regex, "[url]$1[/url]");\par
\tab regex = /((?:\\[url=\\w+\\]))([url])/gi\par
\tab txt.value = txt.value.replace(regex, "$1");\par
\tab regex = /\\[\\/url]\\[\\/url\\]/gi\par
\tab txt.value = txt.value.replace(regex, "[/url]");\par
\tab regex = /\\[url]\\[url\\]/gi\par
\tab txt.value = txt.value.replace(regex, "[url]");\par
\tab regex = /\\[img\\]\\[url\\]/gi\par
\tab txt.value = txt.value.replace(regex, "[img]");\par
\tab regex = /\\[\\/url\\]\\[\\/img\\]/gi\par
\tab txt.value = txt.value.replace(regex, "[/img]");\par
\tab regex = /\\[img=\\[url\\]/gi\par
\tab txt.value = txt.value.replace(regex, "[img=");\par
\tab txt.scrollTop = scrollTop;\par
\}else if(tipo=='url2bbc2')\{ //Link\par
\tab var scrollTop = txt.scrollTop;\par
\tab var urls = '';\par
\tab var e = txt.value.match(/(?:[\\s\\S]*?.html)/ig);\par
\tab for(var i=0;i < e.length;i++)\{\par
\tab\tab urls += e[i]+"\\n";\par
\tab\}\par
\tab txt.value = urls;\par
\tab txt.scrollTop = scrollTop;\par
\}\par
\});\par
\par
Taringa_Set_Function("insertarBBC", function(TagAntes,TagDespues)\{\par
\tab var inicio = txt.selectionStart;\par
\tab var fin   = txt.selectionEnd;\par
\tab var txtlength = 0;\par
\tab var seleccion = '';\par
\tab var seleccionAntes = '';\par
\tab var seleccionDespues = '';\par
\tab var scrollTop = txt.scrollTop;\par
\tab if(txt.value == 'Escribir una respuesta...') txt.value = '';\par
\tab if (TagDespues == null) \{\par
\tab\tab txt.value = txt.value.substr(0, inicio) + TagAntes + txt.value.substr(fin, txt.value.length);\par
\tab\tab txt.focus();\par
\tab\tab txt.selectionStart = txt.value.substr(0, inicio).length + TagAntes.length;\par
\tab\tab txt.selectionEnd = txt.value.substr(0, inicio).length + TagAntes.length;\par
\tab\tab txt.scrollTop = scrollTop;\par
\tab\}else\{\par
\tab\tab if (inicio == fin) \{\par
\tab\tab\tab txt.value = txt.value.substr(0, inicio) + TagAntes + TagDespues + txt.value.substr(fin, txt.value.length);\par
\tab\tab\tab txt.focus();\par
\tab\tab\tab txt.selectionStart = txt.value.substr(0, inicio).length + TagAntes.length;\par
\tab\tab\tab txt.selectionEnd = txt.value.substr(0, inicio).length + TagAntes.length;\par
\tab\tab\tab txt.scrollTop = scrollTop;\par
\tab\tab\} else \{\par
\tab\tab\tab txtlength = txt.value.length;\par
\tab\tab\tab seleccion = txt.value.substr(inicio, (fin - inicio));\par
\tab\tab\tab seleccionAntes = txt.value.substr(0, inicio);\par
\tab\tab\tab seleccionDespues = txt.value.substr(fin, txtlength);\par
\tab\tab\tab txt.value = seleccionAntes + TagAntes + seleccion + TagDespues + seleccionDespues;\par
\tab\tab\tab txt.focus();\par
\tab\tab\tab txt.selectionStart = seleccionAntes.length + TagAntes.length;\par
\tab\tab\tab txt.selectionEnd = txt.value.length - TagDespues.length - seleccionDespues.length;\par
\tab\tab\tab txt.scrollTop = scrollTop;\par
\tab\tab\}\par
\tab\}\par
\});\par
\par
Taringa_Set_Function("preview", function()\{\par
\tab if(jQuery.trim(txt.value) == '')\{\par
\tab\tab $(".msg_add_comment").hide(1000).html(tarLang["Preview"][0]).show(1000);\par
\tab\} else \{\par
\tab\tab $(".msg_add_comment").slideUp(1000);\par
\tab\tab $('#return_agregar_comentario').slideUp(1000, function()\{\par
\tab\tab\tab var HTML = '<div id="Sharkale_TaringaBBC" style="text-align:center;">';\par
\tab\tab\tab HTML += '<br /><br /><img src="'+URL+'cargando.gif" alt="'+tarLang["Preview"][1]+'" title="'+tarLang["Preview"][2]+'" border="0" /><br /><br />';\par
\tab\tab\tab HTML += '<span style="font-weight: bold">'+tarLang["Preview"][2]+'</span><br /><br />';\par
\tab\tab\tab HTML += '</div>';\par
\tab\tab\tab $('#return_agregar_comentario').html(HTML).slideDown(1000, function()\{\par
\tab\tab\tab\tab $.ajax(\{\par
\tab\tab\tab\tab\tab type: 'GET',\par
\tab\tab\tab\tab\tab url: 'http://'+Dom+'/preview.php',\par
\tab\tab\tab\tab\tab dataType: 'text',\par
\tab\tab\tab\tab\tab data: 'titulo=Preview&cuerpo='+encodeURIComponent(txt.value),\par
\tab\tab\tab\tab\tab success: function(h)\{\par
\tab\tab\tab\tab\tab\tab respuesta = $('<div id="respuesta">'+h+'</div>').find('#post-centro div[class="box_cuerpo"]').html();\par
\tab\tab\tab\tab\tab\tab var HTML = '<div class="cita" style="color:#464646;text-shadow:0 1px 0 #CCCCCC;"><img src="'+URL+'cerrar.gif" alt="[X]" title="'+tarLang["Preview"][3]+'" border="0" onclick="javascript:($(\\'#return_agregar_comentario\\').slideUp(1000))" style="margin-right:5px" onmouseover="this.style.cursor=\\'pointer\\'" />'+tarLang["Preview"][4]+' - Sharkale\'c2\'ae</div>';\par
\tab\tab\tab\tab\tab\tab HTML += '<div class="citacuerpo">'+respuesta+'</div>';\par
\tab\tab\tab\tab\tab\tab $('#return_agregar_comentario').slideUp(1000, function()\{\par
\tab\tab\tab\tab\tab\tab\tab $('#return_agregar_comentario').html(HTML).slideDown(1000);\par
\tab\tab\tab\tab\tab\tab\});\par
\tab\tab\tab\tab\tab\},\par
\tab\tab\tab\tab\tab error: function(h)\{\par
\tab\tab\tab\tab\tab\tab $(".msg_add_comment").hide(1000, function()\{\par
\tab\tab\tab\tab\tab\tab\tab $(".msg_add_comment").html(tarLang["Preview"][5]).show(1000);\par
\tab\tab\tab\tab\tab\tab\});\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\});\par
\tab\tab\tab\});\par
\tab\tab\});\par
\tab\}\par
\});\par
\tab\tab\par
\tab\tab\par
Taringa_Set_Function("show_preview", function(titulo,cuerpo,tags,f,forzar)\{\par
\tab if(cuerpo.length>63206)\{\par
\tab\tab alert('El post es demasiado largo. No debe exceder los 65000 caracteres.');\par
\tab\tab return false;\par
\tab\}\par
\tab if($(":radio:checked[name='categoria']:first").val() == -1)\{\par
\tab\tab alert('Falta la categoria');\par
\tab\tab return false;\par
\tab\}\par
\tab if(cuerpo == '')\{\par
\tab\tab alert('El post esta VACIO.');\par
\tab\tab return false;\par
\tab\}\par
\tab if(titulo == '')\{\par
\tab\tab alert('El post NO TIENE TITULO.');\par
\tab\tab return false;\par
\tab\}\par
\tab if(tags == '')\{\par
\tab\tab alert('Ingresar TAGS!');\par
\tab\tab return false;\par
\tab\}\par
\tab\par
\tab var separar_tags = tags.split(",");\par
\tab separar_tags = unico(separar_tags);\par
\tab if(separar_tags.length < 4)\{\par
\tab\tab alert('Tenes que ingresar por lo menos 4 tags separados por coma y DIFERENTES.\\nLos tags son una lista de palabras separada por comas, que describen el contenido.\\nEjemplo: gol, ingleses, Mundial 86, futbol, Maradona, Argentina');\par
\tab\tab return false;\par
\tab\}\par
\tab if(forzar) return true;\par
\par
\tab var HTML = '<div id="previsualizacion" style="text-align:center;">';\par
\tab HTML += '<br /><br /><img src="'+URL+'cargando.gif" alt="'+tarLang["Preview"][1]+'" title="'+tarLang["Preview"][6]+'" border="0" /><br /><br />';\par
\tab HTML += '<span style="font-weight: bold">'+tarLang["Preview"][6]+'</span><br /><br />';\par
\tab HTML += '</div>';\par
\tab $('#preview').html(HTML);\par
\tab $('#preview').css('display','inline');\par
\tab document.documentElement.scrollTop = 0;\par
\tab var params = 'titulo=' + encodeURIComponent(titulo) + '&cuerpo=' + encodeURIComponent(cuerpo);\par
\tab $.ajax(\{\par
\tab\tab type: "POST",\par
\tab\tab url: 'http://'+Dom+'/preview.php',\par
\tab\tab data: params,\par
\tab\tab success: function(h)\{\par
\tab\tab\tab $('#preview').html(h);\par
\tab\tab\tab $('#preview').css('display','inline');\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab $('#preview').html('');\par
\tab\tab\tab $('#preview').css('display','none');\par
\tab\tab\tab alert('Error al previsualizar! Intente nuevamente.');\par
\tab\tab\}\par
\tab\});\par
\par
\tab function kill_preview()\{\par
\tab\tab $('#preview').html('');\par
\tab\tab $('#preview').css('display','none');\par
\tab\}\par
\par
\});\par
var en_nov = false;\par
Taringa_Set_Function("act_post_nov", function()\{\par
\tab if(en_nov) return;\par
\tab en_nov = true;\par
\tab $.ajax(\{\par
\tab\tab type: "GET",\par
\tab\tab url: 'http://'+Dom+'/categorias/novatos/',\par
\tab\tab success: function(h)\{\par
\tab\tab\tab secc_nov = $(h).find('#izquierda').html();\par
\tab\tab\tab $('#derecha').fadeOut('slow',function()\{$('#derecha').html(secc_nov);\}).fadeIn('slow',function()\{\par
\tab\tab\tab\tab en_nov = false;\par
\tab\tab\tab\tab $("div[class='box_txt ultimos_posts']:last").html('Post de Novatos <a href="javascript:void(0)" onclick="javascript:act_post_nov()" title="Actualizar Post" > <img src="http://i28.tinypic.com/wrx1uc.jpg" align="top" height="16" width="16" /></a>');\par
\tab\tab\tab\});\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab en_nov = false;\par
\tab\tab\}\par
\tab\});\par
\});\par
var en_nfu = false;\par
Taringa_Set_Function("act_post_nfu", function()\{\par
\tab if(en_nfu) return;\par
\tab en_nfu = true;\par
\tab $.ajax(\{\par
\tab\tab type: "GET",\par
\tab\tab url: 'http://'+Dom+'/',\par
\tab\tab success: function(h)\{\par
\tab\tab\tab var secc_nfu = $(h).find('#izquierda').html();\par
\tab\tab\tab $('#izquierda').fadeOut('slow',function()\{$('#izquierda').html(secc_nfu);\}).fadeIn('slow',function()\{\par
\tab\tab\tab\tab en_nfu = false;\par
\tab\tab\tab\tab $("div[class='box_txt ultimos_posts']:first").html('\'c3\'9altimos posts <a href="javascript:void(0)" onclick="javascript:act_post_nfu()" title="Actualizar Post" > <img src="http://i28.tinypic.com/wrx1uc.jpg" align="top" height="16" width="16" /></a>');\par
\tab\tab\tab\tab secc_nfu = null;\par
\tab\tab\tab\});\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab en_nfu = false;\par
\tab\tab\}\par
\tab\});\par
\});\par
\par
Taringa_Set_Function("eliminar_imagen", function(id)\{\par
\tab $('#imagen_' + id).css('display','none');\par
\tab $('#imagen_' + id).val('');\par
\tab $('#sharkale_imagen_' + id).remove();\par
\tab $('#preview_imagen_' + id).remove();\par
\tab $('#eliminar_imagen_' + id).remove();\par
\tab $('#br_' + id).remove();\par
\});\par
\par
Taringa_Set_Function("preview_imagen", function(id)\{\par
\tab $('#shark_a_' + id).attr('href', $('#imagen_'+id).attr('value'));\par
\tab $('#shark_img_' + id).attr('src', $('#imagen_'+id).attr('value'));\par
\});\par
\par
Taringa_Set_Function("agregar_imagen", function(id)\{\par
\tab if(!window.imagenes_nuevas)\par
\tab\tab window.imagenes_nuevas = 1;\par
\tab else\par
\tab\tab ++window.imagenes_nuevas;\par
\par
\tab var imagen_nueva_div = '<div id="sharkale_imagen_nueva_'+imagenes_nuevas+'"><a id="shark_a_nueva_'+imagenes_nuevas+'" href="javascript:void(0)" target="_blank" title="Abrir en nueva ventana"><img id="shark_img_nueva_'+imagenes_nuevas+'" src="http://i25.tinypic.com/i69yrm.jpg" style="max-width: 300px; max-height: 300px;" border="0"></a></div>';\par
\tab var imagen_nueva_input = '<input id="imagen_nueva_'+imagenes_nuevas+'" type="text" name="imagen_nueva_'+imagenes_nuevas+'" size="90" maxlength="64">';\par
\tab var imagen_nueva_boton_preview = '<input id="preview_imagen_nueva_'+imagenes_nuevas+'" type="button" class="button" value="Previsualizar" onclick="preview_imagen(\\'nueva_'+ imagenes_nuevas +'\\')">';\par
\tab var imagen_nueva_boton_eliminar = '<input id="eliminar_imagen_nueva_'+imagenes_nuevas+'" type="button" class="button" value="Eliminar" onclick="eliminar_imagen(\\'nueva_'+ imagenes_nuevas +'\\')">';\par
\tab\par
\tab $('#mis_imagenes').append(imagen_nueva_div);\par
\tab $('#mis_imagenes').append(imagen_nueva_input);\par
\tab $('#mis_imagenes').append(imagen_nueva_boton_preview);\par
\tab $('#mis_imagenes').append(imagen_nueva_boton_eliminar);\par
\tab $('#mis_imagenes').append('<br id="br_nueva_'+imagenes_nuevas+'">');\par
\});\par
\par
Taringa_Set_Function("administrar_post", function(key, numpost)\{\par
\tab GM_addStyle('.Sharkale_cargando \{display:none;\}');\par
\tab $.ajax(\{\par
\tab\tab type: 'GET',\par
\tab\tab url: 'http://'+Dom+'/api/shark32455Dfa/json/Posts-GetPostComments/'+numpost,\par
\tab\tab success: function(h)\{\par
\tab\tab\tab var comment = new Function("return "+h)();\par
\tab\tab\tab if($('#SharkaleAdmPost').size() == 0)\{\par
\tab\tab\tab\tab var div = $('<div id="SharkaleAdmPost"><div id="SharkaleAdmTexto"></div></div>');\par
\tab\tab\tab\tab $('body').before(div);\par
\tab\tab\tab\}\par
\tab\tab\tab if(comment["error"]) \{\par
\tab\tab\tab\tab $('#SharkaleAdmTexto').html("<b>Error al obtener datos del post.<br /><br />N\'c3\'bamero de error: "+comment["error"]["code"]+"<br />Raz\'c3\'b3n: "+comment["error"]["msg"]+"</b>");\par
\tab\tab\tab\tab if($('SharkaleAdmPost').size() == 0) $('#SharkaleAdmPost').dialog(\{title: 'Error al cargar el Administrador de Post - Sharkale\'c2\'ae',width: 900, modal: true, position:['center',30], resizable: false, draggable: false \});\par
\tab\tab\tab\tab comment = null;\par
\tab\tab\tab\tab return;\par
\tab\tab\tab\}\par
\tab\tab\tab var HTML = '<hr>';\par
\tab\tab\tab for(var i in comment)\{\par
\tab\tab\tab\tab HTML = '<hr><div id="Sharkale_div_cmnt_'+comment[i]["comment-id"]+'"><input type="checkbox" name="'+comment[i]["comment-id"]+'"> <span id="Sharkale_cmnt_'+comment[i]["comment-id"]+'"><strong>'+comment[i]["nick"]+'</strong></span> | '+comment[i]["date"]+' dijo:<br />'+comment[i]["comment"]+'</div>'+HTML;\par
\tab\tab\tab\}\par
\tab\tab\tab HTML = '<div style="font-size: 11px;">Comentarios seleccionados: <input value="Eliminar" class="ui-state-default ui-corner-all" style="font-size: 10px;" onclick="cmnt_mod(\\''+numpost+'\\',\\''+key+'\\')" type="button"> | <a href="#abajo" id="arriba"> <img src="http://i30.tinypic.com/ab45fa.jpg" align="top" height="16" width="16" /> <strong>Ir a la Tierra</strong></a> | <a href="javascript:void(0)" onclick="administrar_post(\\''+key+'\\',\\''+numpost+'\\')"> <img src="http://i28.tinypic.com/wrx1uc.jpg" align="top" height="16" width="16" /> <strong>Actualizar Comentarios</strong></a></div><span class="Sharkale_cargando"><img src="'+URL+'cargando.gif" width="16" height="16" align="absmiddle"/> Por favor espere...</span>'+HTML;\par
\tab\tab\tab HTML += '<span class="Sharkale_cargando"><img src="'+URL+'cargando.gif" width="16" height="16" align="absmiddle"/> Por favor espere...</span><div style="font-size: 11px;">Comentarios seleccionados: <input value="Eliminar" class="ui-state-default ui-corner-all" style="font-size: 10px;" onclick="cmnt_mod(\\''+numpost+'\\',\\''+key+'\\')" type="button"> | <a href="#arriba" id="abajo"> <img src="http://i29.tinypic.com/j586ls.jpg" align="top" height="16" width="16" /> <strong>Ir al Cielo</strong></a> | <a href="javascript:void(0)" onclick="administrar_post(\\''+key+'\\',\\''+numpost+'\\')"> <img src="http://i28.tinypic.com/wrx1uc.jpg" align="top" height="16" width="16" /> <strong>Actualizar Comentarios</strong></a></div>';\par
\tab\tab\tab $('#SharkaleAdmTexto').html(HTML);\par
\tab\tab\tab document.documentElement.scrollTop = 0;\par
\tab\tab\tab comment = null;\par
\tab\tab\tab HTML = null;\par
\tab\tab\tab if($('div[role="dialog"]').size() == 0 || $('#SharkaleAdmPost').is(':hidden'))$('#SharkaleAdmPost').dialog(\{title: 'Administrador de Post - Sharkale\'c2\'ae',width: 900, modal: true, position:['center',30], resizable: false, draggable: false \});\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab alert("No se pudo consultar los datos del post. Intente nuevamente m\'c3\'a1s tarde.");\par
\tab\tab\}\par
\tab\});\par
\});\par
\par
Taringa_Set_Function("actualizar_comentarios_post", function(todos)\{\par
\tab $('.Sharkale_cargando').show();\par
\tab $.ajax(\{\par
\tab\tab type: 'GET',\par
\tab\tab url: window.location.href,\par
\tab\tab success: function(h)\{\par
\tab\tab GM_log(h);\par
\tab\tab\tab if(h.search('container400') != -1)\{\par
\tab\tab\tab\tab var error = $(h).find('div[class="container400"]:first').find('div[class="box_cuerpo"]:first');\par
\tab\tab\tab\tab $('.Sharkale_cargando').hide();\par
\tab\tab\tab\tab error.find('br,:input').remove();\par
\tab\tab\tab\tab $('.msg_add_comment').hide('slow').html(error.html()).show('slow');\par
\tab\tab\tab\tab error = null;\par
\tab\tab\tab\}else\{\par
\tab\tab\tab\tab var html = h.replace(/^[\\w\\W]*\\<\\!\\-\\- Comentarios \\-\\-\\>/i,'<html><body>').replace(/\\<div[^>]*>/,'');\par
\tab\tab\tab\tab html = html.replace(/\\<div id="return_agregar_comentario[\\w\\W]*$/,'');\par
\tab\tab\tab\tab html += '<div id="return_agregar_comentario" style="display:none">&nbsp;</div>';\par
\tab\tab\tab\tab $('.Sharkale_cargando').hide();\par
\tab\tab\tab\tab $('#Sharkale_comentarios').html(html);\par
\tab\tab\tab\tab modificar_posts();\par
\tab\tab\tab\tab html = null;\par
\tab\tab\tab\}\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab $('.msg_add_comment').hide('slow').html('Como de costumbre Taringa no responde. =)').show('slow');\par
\tab\tab\tab $('.Sharkale_cargando').hide();\par
\tab\tab\}\par
\tab\});\par
\});\par
\tab\tab\par
Taringa_Set_Function("add_comment", function(ult, nro)\{\par
\tab if($('#cuerpo_comment').val() == '')\{\par
\tab\tab $('#cuerpo_comment').focus();\par
\tab\tab return;\par
\tab\}\par
\tab $('#button_add_comment').attr('disabled', 'true');\par
\tab $('#button_add_comment').addClass('ui-state-disabled');\par
\tab $('.Sharkale_cargando').show();\par
\tab $('#gif_cargando_add_comment').show();\par
\tab $.ajax(\{\par
\tab\tab type: 'POST',\par
\tab\tab url: '/comentario2.php',\par
\tab\tab data: 'postid=' + datospag.postid + '&comentario=' + encodeURIComponent($('#cuerpo_comment').val()) + '&ult='+ult+'&key=' + datospag.user_key + '&nro=' + nro,\par
\tab\tab success: function(h)\{\par
\tab\tab\tab if(h.charAt(0)==0)\{ //Error\par
\tab\tab\tab\tab $('.msg_add_comment').hide('slow').html(h.substring(3)).show('slow');\par
\tab\tab\tab\}else if(h.charAt(0)==1)\{ //OK\par
\tab\tab\tab\tab if($('#sin_comentarios'))\par
\tab\tab\tab\tab\tab $('#sin_comentarios').slideUp('slow');\par
\tab\tab\tab\tab $('#return_agregar_comentario').html(h.substring(3));\par
\tab\tab\tab\tab $('#return_agregar_comentario').slideDown('slow');\par
\tab\tab\tab\tab $('#cuerpo_comment').val('');\par
\tab\tab\tab\tab $('.msg_add_comment').hide('slow');\par
\tab\tab\tab\}\par
\tab\tab\tab $('.Sharkale_cargando').hide();\par
\tab\tab\tab $('#gif_cargando_add_comment').hide();\par
\tab\tab\tab $('#button_add_comment').removeAttr('disabled');\par
\tab\tab\tab $('#button_add_comment').removeClass('ui-state-disabled');\par
\tab\tab\},\par
\tab\tab error: function(h)\{\par
\tab\tab\tab $('.msg_add_comment').hide('slow').html('Como de costumbre Taringa no responde. =)').show('slow');\par
\tab\tab\tab $('.Sharkale_cargando').hide();\par
\tab\tab\tab $('#gif_cargando_add_comment').hide();\par
\tab\tab\tab $('#button_add_comment').removeAttr('disabled');\par
\tab\tab\tab $('#button_add_comment').removeClass('ui-state-disabled');\par
\tab\tab\}\par
\tab\});\par
\});\par
\par
Taringa_Set_Function("JS_miarrobatag207890", function(cual)\{\par
\tab mensaje = ''\par
\tab cual.miarrobatag207890_msg.value = jQuery.trim(cual.miarrobatag207890_msg.value);\par
\tab if( cual.miarrobatag207890_msg.value.length > 250) mensaje += '+ El mensaje es demasiado largo\\n';\par
\tab if( cual.miarrobatag207890_msg.value=='' || cual.miarrobatag207890_msg.value=='Tu mensaje aqu\'c3\-' ) mensaje += '+ Tienes que escribir el mensaje\\n';\par
\tab cual.miarrobatag207890_nick.value = jQuery.trim(cual.miarrobatag207890_nick.value).replace(/^[\\._\\-]*/, '').replace(/[\\._\\-]*$/, '').replace(/^.+([\\._\\-]\{2\}).+$/gi,'');\par
\tab if( mensaje!='' )\{\par
\tab\tab alert('Se han producido los siguientes errores:\\n'+mensaje);\par
\tab\tab return false;\par
\tab\}else\{\par
\tab\tab cual.miarrobatag207890_msg_tmp.value = cual.miarrobatag207890_msg.value;\par
\tab\tab cual.miarrobatag207890_msg.value = 'Tu mensaje aqu\'c3\-';\par
\tab\tab cual.miarrobatag207890_nick_tmp.value = cual.miarrobatag207890_nick.value;\par
\tab\tab return true;\par
\tab\}\par
\});\par
\par
Taringa_Set_Function("Abrir_Juego", function(pagina) \{\par
    var opciones="toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=740, height=480";\par
    window.open(pagina,"juego",opciones);\par
\});\par
\par
\}\par
\par
// ==URL de Imagenes==\par
\tab var MenuTaringa = GM_getValue("MT", "http://i26.tinypic.com/2mg6usw.jpg");\par
\tab var MenuMensajesVacio = GM_getValue("MMV", "http://i26.tinypic.com/2zs8lcn.png");\par
\tab var MenuMensajesLleno = GM_getValue("MML", "http://i31.tinypic.com/qqy2bq.png");\par
\tab var MenuMonitor = GM_getValue("MM", "http://i26.tinypic.com/2m7isk6.png");\par
\tab var MenuFavoritos = GM_getValue("MF", "http://i31.tinypic.com/2i7qvkj.png");\par
\tab var MenuCuenta = GM_getValue("MC", "http://i28.tinypic.com/5owllc.png");\par
\tab var MenuCerrarSesion = GM_getValue("MCS", "http://i31.tinypic.com/141tcft.png");\par
\tab var MenuModeracion = GM_getValue("MMod", "http://i29.tinypic.com/339qb7a.png");\par
\tab var MenuOpciones = GM_getValue("MO", "http://i27.tinypic.com/sp96dg.png");\par
\tab var MenuActualizacion = GM_getValue("MA", "http://i30.tinypic.com/1zx5wjs.png");\par
\tab var MenuSize = GM_getValue("MS", "25");\par
// ==/URL de Imagenes==\par
function Guardar_Opciones()\{\par
\tab GM_setValue("vYT",($("#shark_vYT").attr("checked")?true:false));\par
\tab GM_setValue("aSWF",($("#shark_aSWF").attr("checked")?true:false));\par
\tab GM_setValue("PunFav",($("#shark_PunFav").attr("checked")?true:false));\par
\tab GM_setValue("PermHD",($("#shark_PermHD").attr("checked")?true:false));\par
\tab GM_setValue("EmotVis",($("#shark_EmotVis").attr("checked")?true:false));\par
\tab GM_setValue("LinkCheck",($("#shark_LinkCheck").attr("checked")?true:false));\par
\tab GM_setValue("NovatosPrinc",($("#shark_NovatosPrinc").attr("checked")?true:false));\par
\tab GM_setValue("CambiarTheme",($("#shark_CambiarTheme").attr("checked")?true:false));\par
\tab vYT = GM_getValue("vYT",true);\par
\tab aSWF = GM_getValue("aSWF",true);\par
\tab PunFav = GM_getValue("PunFav",true);\par
\tab PermHD = GM_getValue("PermHD",false);\par
\tab EmotVis = GM_getValue("EmotVis",true);\par
\tab LinkCheck = GM_getValue("LinkCheck",true);\par
\tab NovatosPrinc = GM_getValue("NovatosPrinc",true);\par
\tab CambiarTheme = GM_getValue("CambiarTheme",true);\par
\tab $('#mensaje-opciones').slideDown("Slow");\par
\tab $.timer(5000, function(timer)\{\par
\tab\tab $('#mensaje-opciones').slideUp("Slow");\par
\tab\tab timer.stop();\par
\tab\});\par
\}\par
function Guardar_Imagenes()\{\par
\tab $('#previe-mt').attr('src',$('#mt-url').attr('value'));\par
\tab $('#previe-mmv').attr('src',$('#mmv-url').attr('value'));\par
\tab $('#previe-mml').attr('src',$('#mml-url').attr('value'));\par
\tab $('#previe-mm').attr('src',$('#mm-url').attr('value'));\par
\tab $('#previe-mf').attr('src',$('#mf-url').attr('value'));\par
\tab $('#previe-mc').attr('src',$('#mc-url').attr('value'));\par
\tab $('#previe-mcs').attr('src',$('#mcs-url').attr('value'));\par
\tab $('#previe-mmod').attr('src',$('#mmod-url').attr('value'));\par
\tab $('#previe-mo').attr('src',$('#mo-url').attr('value'));\par
\tab $('#previe-ma').attr('src',$('#ma-url').attr('value'));\par
\tab MenuTaringa = $('#mt-url').attr('value');\par
\tab MenuMensajesVacio = $('#mmv-url').attr('value');\par
\tab MenuMensajesLleno = $('#mml-url').attr('value');\par
\tab MenuMonitor = $('#mm-url').attr('value');\par
\tab MenuFavoritos = $('#mf-url').attr('value');\par
\tab MenuCuenta = $('#mc-url').attr('value');\par
\tab MenuCerrarSesion = $('#mcs-url').attr('value');\par
\tab MenuModeracion = $('#mmod-url').attr('value');\par
\tab MenuOpciones = $('#mo-url').attr('value');\par
\tab MenuActualizacion = $('#ma-url').attr('value');\par
\tab MenuSize = $(':radio[name="ms"][checked]').val();\par
\tab GM_setValue("MT", MenuTaringa);\par
\tab GM_setValue("MMV", MenuMensajesVacio);\par
\tab GM_setValue("MML", MenuMensajesLleno);\par
\tab GM_setValue("MM", MenuMonitor);\par
\tab GM_setValue("MF", MenuFavoritos);\par
\tab GM_setValue("MC", MenuCuenta);\par
\tab GM_setValue("MCS", MenuCerrarSesion);\par
\tab GM_setValue("MMod", MenuModeracion);\par
\tab GM_setValue("MO", MenuOpciones);\par
\tab GM_setValue("MA", MenuActualizacion);\par
\tab GM_setValue("MS", MenuSize);\par
\tab $('#mensaje-imagenes').slideDown("Slow");\par
\tab $.timer(5000, function(timer)\{\par
\tab\tab $('#mensaje-imagenes').slideUp("Slow");\par
\tab\tab timer.stop();\par
\tab\});\par
\}\par
function Restablecer_Imagenes()\{\par
\tab $('#mt-url').val("http://i26.tinypic.com/2mg6usw.jpg");\par
\tab $('#mmv-url').val("http://i26.tinypic.com/2zs8lcn.png");\par
\tab $('#mml-url').val("http://i31.tinypic.com/qqy2bq.png");\par
\tab $('#mm-url').val("http://i26.tinypic.com/2m7isk6.png");\par
\tab $('#mf-url').val("http://i31.tinypic.com/2i7qvkj.png");\par
\tab $('#mc-url').val("http://i28.tinypic.com/5owllc.png");\par
\tab $('#mcs-url').val("http://i31.tinypic.com/141tcft.png");\par
\tab $('#mmod-url').val("http://i29.tinypic.com/339qb7a.png");\par
\tab $('#mo-url').val("http://i27.tinypic.com/sp96dg.png");\par
\tab $('#ma-url').val("http://i30.tinypic.com/1zx5wjs.png");\par
\tab $('#ms').attr("checked", "checked");\par
\tab Guardar_Imagenes();\par
\}\par
\par
function Bug_Sugerencia()\{\par
\tab GM_openInTab('http://'+Dom+'/mensajes/a/Sharkale');\par
\}\par
\par
function Abrir_Chat()\{\par
\tab GM_openInTab("http://www.everywherechat.com/everywherechat.swf?defaultRoom=sharkale_radio&fontSize=12&roomList=false&theme=night");\par
\}\par
\par
function Sharkale_Opciones()\{\par
\tab if($('#SharkaleOpciones').length != 0)\{\par
\tab\tab $('#SharkaleOpciones').remove();\par
\tab\}\par
\tab var div = document.createElement('div');\par
\tab div.setAttribute('id', 'SharkaleOpciones');\par
\tab div.setAttribute('style', 'display:none');\par
\tab var nuevaHTML = '<div id="tabs">';\par
\tab nuevaHTML += '<ul>';\par
\tab nuevaHTML += '    <li><a href="#opciones-1"><span>Opciones</span></a></li>';\par
\tab nuevaHTML += '    <li><a href="#opciones-2"><span>Tagboard</span></a></li>';\par
\tab nuevaHTML += '    <li><a href="#opciones-3"><span>Chat</span></a></li>';\par
\tab nuevaHTML += '    <li><a href="#opciones-4"><span>Publicidad y Varios</span></a></li>';\par
\tab nuevaHTML += '    <li><a href="#opciones-5"><span>Changelog</span></a></li>';\par
\tab nuevaHTML += '    <li><a href="#opciones-6"><span>Acerca de...</span></a></li>';\par
\tab nuevaHTML += '</ul>';\par
\tab nuevaHTML += '<div id="opciones-1">';\par
\tab nuevaHTML += ' <div id="tabsOpciones">';\par
\tab nuevaHTML += '  <ul>';\par
\tab nuevaHTML += '    <li><a href="#imagenes-1"><span>Opciones Generales</span></a></li>';\par
\tab nuevaHTML += '    <li><a href="#imagenes-2"><span>Im\'c3\'a1genes del Men\'c3\'ba</span></a></li>';\par
\tab nuevaHTML += '    <li><a href="#imagenes-3"><span>Emoticones personalizados</span></a></li>';\par
\tab nuevaHTML += '  </ul>';\par
\tab nuevaHTML += ' <div id="imagenes-1"><b>';\par
\tab nuevaHTML += '  <div id="switcher"></div>';\par
\tab nuevaHTML += '\tab <label><input type="checkbox" id="shark_vYT" '+(vYT? 'checked':'')+'> Reproductor de Videos de YouTube en formato HQ.</label><br/>';\par
\tab nuevaHTML += '\tab <label><input type="checkbox" id="shark_PermHD" '+(PermHD? 'checked':'')+'> Preguntar por calidad HQ al crear nuevo video.</label><br/>';\par
\tab nuevaHTML += '\tab <label><input type="checkbox" id="shark_PunFav" '+(PunFav? 'checked':'')+'> Agregar Puntos y Favoritos en la secci\'c3\'b3n de Comentarios</label><br/>';\par
\tab nuevaHTML += '\tab <label><input type="checkbox" id="shark_aSWF" '+(aSWF? 'checked':'')+'> Agrandar archivos Flash.</label><br/>';\par
\tab nuevaHTML += '\tab <label><input type="checkbox" id="shark_EmotVis" '+(EmotVis? 'checked':'')+'> Mostrar Emoticones por defecto.</label><br/>';\par
\tab nuevaHTML += '\tab <label><input type="checkbox" id="shark_LinkCheck" '+(LinkCheck? 'checked':'')+'> Activar LinkChecker (Verificador de links).</label><br/>';\par
\tab nuevaHTML += '\tab <label><input type="checkbox" id="shark_NovatosPrinc" '+(NovatosPrinc? 'checked':'')+'> Post de Novatos en la P\'c3\'a1gina Principal.</label><br/>';\par
\tab nuevaHTML += '\tab <label><input type="checkbox" id="shark_CambiarTheme" '+(CambiarTheme? 'checked':'')+'> Activar cambiador de Theme de Taringa.</label><br/>';\par
\tab nuevaHTML += '\tab <label><input type="button" class="ui-state-default ui-corner-all"  id="Btn_CambiarTheme" value="Cambiar Theme de Taringa!"><br/><br/>';\par
\tab nuevaHTML += '\tab <input type="button" value="Guardar Cambios" id="Btn_Guardar_Opciones" title="Guardar cambios en la memoria de Firefox" class="ui-state-default ui-corner-all"/>';\par
\tab nuevaHTML += '  <div id="mensaje-opciones" class="ui-state-highlight ui-corner-all" style="display:none;padding: 0pt 0.7em; margin-top: 20px;"><p><span class="ui-icon ui-icon-info" style="float: left; margin-right: 0.3em;"></span><strong>Guardado Correcto:</strong> La nueva configuraci\'c3\'b3n se guardo correctamente en la memoria de Firefox. Ahora al actualizar el script la configuraci\'c3\'b3n no se perder\'c3\'a1.</p></div>';\par
\tab nuevaHTML += ' </b></div>';\par
\tab nuevaHTML += ' <div id="imagenes-2"><b>';\par
\tab nuevaHTML += '\tab <div align="right">Taringa! <img id="previe-mt" src="'+MenuTaringa+'" width="25" height="25" align="absmiddle"/>';\par
\tab nuevaHTML += '\tab <input type="text" id="mt-url" src="'+MenuTaringa+'" size="50" value="'+MenuTaringa+'"/>';\par
\tab nuevaHTML += '\tab <input type="button" id="mt-url" onclick="$(\\'#previe-mt\\').attr(\\'src\\',$(\\'#mt-url\\').attr(\\'value\\'))" value="Previsualizar" title="" width="50" class="ui-state-default ui-corner-all"/><br/>';\par
\tab nuevaHTML += '\tab Mensajes - Vacio <img id="previe-mmv" src="'+MenuMensajesVacio+'" width="25" height="25" align="absmiddle"/>';\par
\tab nuevaHTML += '\tab <input type="text" id="mmv-url" src="'+MenuMensajesVacio+'" size="50" value="'+MenuMensajesVacio+'"/>';\par
\tab nuevaHTML += '\tab <input type="button" id="mmv-url" onclick="$(\\'#previe-mmv\\').attr(\\'src\\',$(\\'#mmv-url\\').attr(\\'value\\'))" value="Previsualizar" title="" width="50" class="ui-state-default ui-corner-all"/><br/>';\par
\tab nuevaHTML += '\tab Mensajes - Lleno <img id="previe-mml" src="'+MenuMensajesLleno+'" width="25" height="25" align="absmiddle"/>';\par
\tab nuevaHTML += '\tab <input type="text" id="mml-url" src="'+MenuMensajesLleno+'" size="50" value="'+MenuMensajesLleno+'"/>';\par
\tab nuevaHTML += '\tab <input type="button" id="mml-url" onclick="$(\\'#previe-mml\\').attr(\\'src\\',$(\\'#mml-url\\').attr(\\'value\\'))" value="Previsualizar" width="50" class="ui-state-default ui-corner-all"/><br/>';\par
\tab nuevaHTML += '\tab Monitor de Usuario <img id="previe-mm" src="'+MenuMonitor+'" width="25" height="25" align="absmiddle"/>';\par
\tab nuevaHTML += '\tab <input type="text" id="mm-url" src="'+MenuMonitor+'" size="50" value="'+MenuMonitor+'"/>';\par
\tab nuevaHTML += '\tab <input type="button" id="mm-url" onclick="$(\\'#previe-mm\\').attr(\\'src\\',$(\\'#mm-url\\').attr(\\'value\\'))" value="Previsualizar" width="50" class="ui-state-default ui-corner-all"/><br/>';\par
\tab nuevaHTML += '\tab Mis Favoritos <img id="previe-mf" src="'+MenuFavoritos+'" width="25" height="25" align="absmiddle"/>';\par
\tab nuevaHTML += '\tab <input type="text" id="mf-url" src="'+MenuFavoritos+'" size="50" value="'+MenuFavoritos+'"/>';\par
\tab nuevaHTML += '\tab <input type="button" id="mf-url" onclick="$(\\'#previe-mf\\').attr(\\'src\\',$(\\'#mf-url\\').attr(\\'value\\'))" value="Previsualizar" width="50" class="ui-state-default ui-corner-all"/><br/>';\par
\tab nuevaHTML += '\tab Mi Cuenta <img id="previe-mc" src="'+MenuCuenta+'" width="25" height="25" align="absmiddle"/>';\par
\tab nuevaHTML += '\tab <input type="text" id="mc-url" src="'+MenuCuenta+'" size="50" value="'+MenuCuenta+'"/>';\par
\tab nuevaHTML += '\tab <input type="button" id="mc-url" onclick="$(\\'#previe-mc\\').attr(\\'src\\',$(\\'#mc-url\\').attr(\\'value\\'))" value="Previsualizar" width="50" class="ui-state-default ui-corner-all"/><br/>';\par
\tab nuevaHTML += '\tab Cerrar Sesi\'c3\'b3n <img id="previe-mcs" src="'+MenuCerrarSesion+'" width="25" height="25" align="absmiddle"/>';\par
\tab nuevaHTML += '\tab <input type="text" id="mcs-url" src="'+MenuCerrarSesion+'" size="50" value="'+MenuCerrarSesion+'"/>';\par
\tab nuevaHTML += '\tab <input type="button" id="mcs-url" onclick="$(\\'#previe-mcs\\').attr(\\'src\\',$(\\'#mcs-url\\').attr(\\'value\\'))" value="Previsualizar" width="50" class="ui-state-default ui-corner-all"/><br/>';\par
\tab nuevaHTML += '\tab Historial de Moderaci\'c3\'b3n <img id="previe-mmod" src="'+MenuModeracion+'" width="25" height="25" align="absmiddle"/>';\par
\tab nuevaHTML += '\tab <input type="text" id="mmod-url" src="'+MenuModeracion+'" size="50" value="'+MenuModeracion+'"/>';\par
\tab nuevaHTML += '\tab <input type="button" id="mmod-url" onclick="$(\\'#previe-mmod\\').attr(\\'src\\',$(\\'#mmod-url\\').attr(\\'value\\'))" value="Previsualizar" width="50" title="Previsulizar Imagen" class="ui-state-default ui-corner-all"/><br/>';\par
\tab nuevaHTML += '\tab Opciones del Script <img id="previe-mo" src="'+MenuOpciones+'" width="25" height="25" align="absmiddle"/>';\par
\tab nuevaHTML += '\tab <input type="text" id="mo-url" src="'+MenuOpciones+'" size="50" value="'+MenuOpciones+'"/>';\par
\tab nuevaHTML += '\tab <input type="button" id="mo-url" onclick="$(\\'#previe-mo\\').attr(\\'src\\',$(\\'#mo-url\\').attr(\\'value\\'))" value="Previsualizar" width="50" title="Previsulizar Imagen" class="ui-state-default ui-corner-all"/><br/>';\par
\tab nuevaHTML += '\tab Nueva Actualizaci\'c3\'b3n del Script <img id="previe-ma" src="'+MenuActualizacion+'" width="25" height="25" align="absmiddle"/>';\par
\tab nuevaHTML += '\tab <input type="text" id="ma-url" src="'+MenuActualizacion+'" size="50" value="'+MenuActualizacion+'"/>';\par
\tab nuevaHTML += '\tab <input type="button" id="ma-url" onclick="$(\\'#previe-ma\\').attr(\\'src\\',$(\\'#ma-url\\').attr(\\'value\\'))" value="Previsualizar" width="50" title="Previsulizar Imagen" class="ui-state-default ui-corner-all"/><br/>';\par
\tab nuevaHTML += '\tab Tama\'c3\'b1o de los iconos: <label><input name="ms" value="15" type="radio" '+(MenuSize == 15? 'checked="checked"':'')+'>15x15</label><label><input name="ms" value="17" type="radio" '+(MenuSize == 17? 'checked="checked"':'')+'>17x17</label><label><input name="ms" value="19" type="radio" '+(MenuSize == 19? 'checked="checked"':'')+'>19x19</label><label><input name="ms" value="21" type="radio" '+(MenuSize == 21? 'checked="checked"':'')+'>21x21</label><label><input name="ms" value="23" type="radio" '+(MenuSize == 23? 'checked="checked"':'')+'>23x23</label><label><input id="ms" name="ms" value="25" type="radio" '+(MenuSize == 25? 'checked="checked"':'')+'>25x25</label></div><hr/>';\par
\tab nuevaHTML += '\tab <input type="button" value="Guardar Cambios de Im\'c3\'a1genes" id="Btn_Guardar_Imagenes" title="Guardar cambios de im\'c3\'a1genes en la memoria de Firefox" class="ui-state-default ui-corner-all"/>';\par
\tab nuevaHTML += '\tab <input type="button" value="Restablecer Cambios" id="Btn_Restablecer_Imagenes" title="Restablecer a los im\'c3\'a1genes originales del script" class="ui-state-default ui-corner-all"/><hr>';\par
\tab nuevaHTML += '\tab * la previsualizaci\'c3\'b3n puede tardar un rato en cargar la imagen.';\par
\tab nuevaHTML += '    <div id="mensaje-imagenes" class="ui-state-highlight ui-corner-all" style="display:none;padding: 0pt 0.7em; margin-top: 20px;"><p><span class="ui-icon ui-icon-info" style="float: left; margin-right: 0.3em;"></span><strong>Guardado Correcto:</strong> La nueva configuraci\'c3\'b3n se guardo correctamente en la memoria de Firefox. Ahora al actualizar el script la configuraci\'c3\'b3n no se perder\'c3\'a1.</p></div>';\par
\tab nuevaHTML += ' </b></div>';\par
\tab nuevaHTML += ' <div id="imagenes-3" align="justify">';\par
\tab nuevaHTML += '  Al agregar un emoticon se deber\'c3\'a1 ingresar la direcci\'c3\'b3n URL de la im\'c3\'a1gen o emoticon y una direcci\'c3\'b3n URL de una im\'c3\'a1gen o emoticon que es la que aparecer\'c3\'a1 en la parte para elegir. Hago incapi\'c3\'a9 en esto porque si eligen un GIF de 5MB y lo ponen tambi\'c3\'a9n como miniatura para el emoticon, el script lo escalar\'c3\'a1 para no deformar la p\'c3\'a1gina pero no le bajar\'c3\'a1 el peso. Por lo tanto, si eligen uno capaz no sea problema pero si ponen 5 o 10 GIF pesados con la misma URL para la im\'c3\'a1gen que para la miniatura, cada vez que cargue un post van a cargar todos los GIF pesados gastando ancho de banda inutilmente. Con esto aclarado pueden utilizarlo.<hr><b>Un truquito para los gif de tinypic es agregarle un "_th" antes del punto. Por ejemplo a <u>http://i44.tinypic.com/2e2nxjb.gif</u> que pesa 2.60MB le agregamos el "_th" antes del punto quedando <u>http://i44.tinypic.com/2e2nxjb_th.gif</u> con un peso de 0.60MB. No es huy que liviano pero son 2 megas menos y nada de edici\'c3\'b3n.</b><hr>';\par
\tab nuevaHTML += '  Otra forma un poquito m\'c3\'a1s larga pero m\'c3\'a1s eficiente es la siguiente. Abrimos el block de notas y dejamos ahi la URL original de la im\'c3\'a1gen. Luego vamos a <b>http://www.tinypic.com</b> y seleccionamos la opci\'c3\'b3n <b>URL</b> en <b>"Tipo de archivo"</b> y ponemos la URL del block de notas, seleccionamos <b>avatar(100x75)</b> en el men\'c3\'ba de <b>"Cambiar el Tama\'c3\'b1o"</b>. A continuaci\'c3\'b3n subimos la imagen y una vez terminada hacemos click en <b>"Editar"</b> que est\'c3\'a1 debabajo de la previsualizaci\'c3\'b3n de la imagen que acabamos de subir. Una vez finalizado de cargar el editor simplemente hacemos click en <b>"Save a copy"</b> y de esta manera genera una imagen sin movimiento de 5KB con su correspondiente URL. Ahora con esta URL y la que tenemos en el block de notas las usamos para agregar la imagen al administrador de emoticones y no tener pesado el post con muchos gif de 6MB al cargar.<hr>';\par
\tab nuevaHTML += '  <b>Las URL al ser guardadas se almacenan en el Firefox, dicho espacio es limitado. Pero la ventaja es que al actualizar el script estos cambios no se modifican, por lo tanto no tendr\'c3\'a1s que agregarlos una y otra vez.<hr>';\par
\tab nuevaHTML += '\tab <input type="button" value="Agregar Emoticon Personalizado" id="Btn_Agregar_Emoticones" title="Guardar cambios de im\'c3\'a1genes en la memoria de Firefox" class="ui-state-default ui-corner-all"/>';\par
\tab nuevaHTML += '\tab <input type="button" value="Guardar Emoticones Agregados" id="Btn_Guardar_Emoticones" title="Guardar emoticones en la memoria de Firefox" class="ui-state-default ui-corner-all"/>';\par
\tab nuevaHTML += '\tab <input type="button" value="Reestablecer Emoticones Originales" id="Btn_Reestablecer_Emoticones" title="Guardar emoticones en la memoria de Firefox" class="ui-state-default ui-corner-all"/><hr>';\par
\tab nuevaHTML += '  <div id="emoticones_personalizados">'+Cargar_Emoticones()+'</div>';\par
\tab nuevaHTML += ' </b></div>';\par
\tab nuevaHTML += ' </div>';\par
\tab nuevaHTML += '</div>';\par
\tab nuevaHTML += '<div id="opciones-2" align="center">';\par
\tab nuevaHTML += '\tab <div id="tagboard" style="width:800px;">Deja tu opini\'c3\'b3n aqu\'c3\-, ya que no voy a crear nuevos post debido a que me lo cierran por pavadas:';\par
\tab nuevaHTML += '\tab <form name="Form_miarrobatag207890" action="http://tagboard.miarroba.com/insertarmensaje.php" method="post" target="miarrobatag207890" onsubmit="return JS_miarrobatag207890(this);" accept-charset="iso-8859-1">';\par
\tab nuevaHTML += '\tab\tab <input type="hidden" name="id" value="207890"><input type="hidden" name="miarrobatag207890_msg_tmp" value="">';\par
\tab nuevaHTML += '\tab\tab <input type="hidden" name="miarrobatag207890_nick_tmp" value=""><input type="hidden" name="miarrobatag207890_url_tmp" value="">';\par
\tab nuevaHTML += '\tab\tab <iframe id="miarrobatag207890" name="miarrobatag207890" width="800px;" height="500" src="" frameborder="0" vspace="0" hspace="0"></iframe>';\par
\tab nuevaHTML += '\tab\tab <input type="hidden" id="miarrobatag207890_nick" name="miarrobatag207890_nick" value="" maxlength="20" class="ui-state-default ui-corner-all" style="width:140px;">';\par
\tab nuevaHTML += '\tab\tab <br><input type="text" id="tb_msg" name="miarrobatag207890_msg" title="Escribe aqu\'c3\- el mensaje que aparecer\'c3\'a1 en el Tagboard" value="Tu mensaje aqu\'c3\-" maxlength="250" class="ui-state-default ui-corner-all" style="width:760px;">';\par
\tab nuevaHTML += '\tab\tab <input type="button" name="miarrobatag207890_ayuda" value="?" title="Obtener ayuda sobre bbcodes y emoticones para agregar al mensaje" style="width:30px;" class="ui-state-default ui-corner-all" onclick="$(\\'#miarrobatag207890\\').attr(\\'src\\',\\'http://tagboard.miarroba.com/ayuda.php?id=207890\\');">';\par
\tab nuevaHTML += '\tab\tab <br><input type="submit" id="miarrobatag207890_submit" title="Enviar mensaje al Tagboard" name="miarrobatag207890_submit" value="Env\'c3\-ar Mensaje" class="ui-state-default ui-corner-all" style="width:800px;">';\par
\tab nuevaHTML += '\tab </form></div>';\par
\tab nuevaHTML += '</div>';\par
\tab nuevaHTML += '<div id="opciones-3" align="center">';\par
\tab nuevaHTML += '    <embed id="chat" src="http://www.everywherechat.com/everywherechat.swf?defaultRoom=sharkale_radio&fontSize=12&roomList=false&theme=night" quality="best" wmode="opaque" quality="high" bgcolor="#525252" name="everywherechat" allowscriptaccess="sameDomain" pluginspage="http://www.adobe.com/go/getflashplayer" type="application/x-shockwave-flash" width="840" height="480" align="middle"></embed><br/><br/>';\par
\tab nuevaHTML += '\tab   <input type="button" value="Abrir chat en otra pesta\'c3\'b1a" id="Btn_Chat" title="Abrir el chat en otra pesta\'c3\'b1a" class="ui-state-default ui-corner-all"/>';\par
\tab nuevaHTML += '</div>';\par
\tab nuevaHTML += '<div id="opciones-4"><b>';\par
\tab nuevaHTML += '    <hr>A ver que mierda pueden decir ahora estos moderadores de cuarta.<hr>';\par
\tab nuevaHTML += '    ..::Descargas Sweetdani::.. - Peliculas, Juegos, Series y M\'c3\'basica.<br/>';\par
\tab nuevaHTML += '    <a href="http://www.taringa.net/posts/links/3626450/" target="_blank"><img src="http://radio.proyectod.com.ar/descargas/catalogo.php" alt="Descargas Sweetdani" width="740"/></a><hr>';\par
\tab nuevaHTML += '    ..::Radio Sharkale\'c2\'ae::.. - Proyecto personal de radio propia. =P<br/>';\par
\tab nuevaHTML += '    <a href="http://radio.sharkale.com.ar/" target="_blank"><img src="http://i32.tinypic.com/zkg95l.jpg" alt="..::Radio Sharkale\'c2\'ae::.." width="740"/></a>';\par
\tab nuevaHTML += '    <hr>Para que el script te funcione correctamente te recomiendo instalar los siguientes add-on para tu firefox.<hr>';\par
\tab nuevaHTML += '    \'c2\'bfAlguna vez te han molestado todos esos anuncios e im\'c3\'a1genes en internet que, normalmente, hacen que tarde en cargar m\'c3\'a1s el resto de la p\'c3\'a1gina? InstalaAdblock Plus ahora y olv\'c3\-date de ello.<br/>';\par
\tab nuevaHTML += '    <a href="https://addons.mozilla.org/es-ES/firefox/addon/1865" title="A\'c3\'b1adir Adblock Plus a Firefox" target="_blank"><img src="http://i40.tinypic.com/2ywy8sg.jpg" align="absmiddle" /><img src="http://2.bp.blogspot.com/_aoEJ4wYL5ww/SJuBhTkrJvI/AAAAAAAAAHQ/GfY6UdrA4Vs/s320/firefox-adblock-plus.png" align="absmiddle" height="150"/></a><hr>';\par
\tab nuevaHTML += '    Web of Trust le mantiene seguro mientras navega y compra en Internet. Los s\'c3\-mbolos con c\'c3\'b3digo de color de WOT le ayudan a evitar timos en l\'c3\-nea, robo de identidad, sitios de compra no fiables y amenazas de seguridad antes de que haga clic. Navegue m\'c3\'a1s seguro y a\'c3\'b1ada WOT a Firefox ahora mismo.<br>';\par
\tab nuevaHTML += '    <a href="https://addons.mozilla.org/es-ES/firefox/addon/3456" title="A\'c3\'b1adir WOT a Firefox" target="_blank"><img src="http://i40.tinypic.com/2ywy8sg.jpg" align="absmiddle" /><img src="https://addons.mozilla.org/en-US/firefox/images/t/31153/1239092219" align="absmiddle" /><img src="https://addons.mozilla.org/en-US/firefox/images/t/24581/1218474941" align="absmiddle" /><img src="https://addons.mozilla.org/en-US/firefox/images/t/24569/1218460666" align="absmiddle" /></a>';\par
\tab nuevaHTML += '</b></div>';\par
\tab nuevaHTML += '<div id="opciones-5" align="justify"><b>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 25.0:</span></u></b><br>* Compatiblidad nuevo perfil.<br>* Arreglado administrador de post que se abria m\'c3\'a1s de una vez al actualizar.<br>* Opciones de editar, borrar y administrar tus post desde el buscador.<br>* Opci\'c3\'b3n de bloquear usuario directamente desde los MP.<br>* Habilitado buscador de google.<br>* Nuevo m\'c3\'a9todo de b\'c3\'basqueda de actualizaci\'c3\'b3n menos persistente y nueva interfaz gr\'c3\'a1fica.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 24.6:</span></u></b><br>* Arreglado perfil y Puntos en Negrita.<br>* Arreglado el actualizador de comentarios.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 24.5:</span></u></b><br>* BBCode en comunidades.<br>* Preview en Comunidades.<br>* [Fixed] Bugs BBCode en comunidades.<br>* Avatares en comunidades modificados.<br>* Nueva c\'c3\'b3digo para previsualizar m\'c3\'a1s efic\'c3\'a1z.<br>* Tops desactivados. (Taringa! desactiv\'c3\'b3 la api para los tops. Parece que manolo y su ram de mierda de 64MB no la soporta)<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 24.0:</span></u></b><br>* Nuevo logo de Taringa.<br>* Actualizaci\'c3\'b3n general del cambiador de theme a jQuery. (Chupala Gonx lame chota!!!)<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 23.6:</span></u></b><br>* Nuevas Opciones en el Cambiador de Theme.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 23.5:</span></u></b><br>* Arreglos Varios.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 23.4:</span></u></b><br>* Color de Fondo Configurable.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 23.3:</span></u></b><br>* Actualizador de Comentarios (incluido para post privados).<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 23.2:</span></u></b><br>* Bugs, Bugs, Bugs y m\'c3\'a1s Bugs.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 23.0:</span></u></b><br>* Compatibilidad con Faceboringa.<br>* Barra de comentarios en las comunidades.<br>* Agregados Ir al Cielo y la Tierra que no est\'c3\'a1n. <br>* Buscador de Taringa! predeterminado en el buscador.<br>* Redimensionados los comentarios en el las comunidades.<br>* Redimensionado el Monitor.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 22.6:</span></u></b><br>* [Fixed] Bug de novatos en sus propios post.<br>* [Fixed] Bug de texto no se pueden votar por solidarios al quedarse sin puntos.<br>* Doble hospedaje de script por si se cae alguno. <a href="http://radio.sharkale.com.ar" target="_blank">http://radio.sharkale.com.ar</a> | <a href="http://radio.proyectod.com.ar" target="_blank">http://radio.proyectod.com.ar</a><br>* [Fixed] Problema de ancho de barra principal en Poringa!.<br>* Optmizada la barra de colores en c\'c3\'b3digo.<br>* [Fixed a Taringa] [br] en comentarios.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 22.5:</span></u></b><br>* Nueva barra de taringa con men\'c3\'bas desplegables.<br>* Optimizado c\'c3\'b3digo de cambiador de theme.<br>* Nuevo servidor de hospedaje del script. <a href="http://radio.sharkale.com.ar" target="_blank">http://radio.sharkale.com.ar</a><br>* Compatibilidad con script de lea87crzz.<br>* [Fixed] En Link Checker al agregar prefijos a los links.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 22.0:</span></u></b><br>* Secci\'c3\'b3n de tops totalmente realizada por mi.<br>* Previzualizaci\'c3\'b3n de MP<br>* Acentos en Tagboard<br>* [Fixed] Quote, Fecha y Alertas de Error en Actualizador de Comentarios<br>* Im\'c3\'a1genes de los botones de opciones en el Men\'c3\'ba<br>* Cambiar Tama\'c3\'b1o de las Im\'c3\'a1genes del Men\'c3\'ba<br>* Cambiar Theme de Taringa!<br>* [Fixed] En Link Checker<br>* Bot\'c3\'b3n de Postear sin Previsualizar.<br>* Bot\'c3\'b3n de actualizar todos o \'c3\'baltimos comentarios.<br>* [Fixed] Actualizadores de \'c3\'baltimos post en principal.<br>* [Fixed] Estilos de bordes en la p\'c3\'a1gina principal.<br>* Nuevo estilo de quotes.<br>* Optimizaci\'c3\'b3n del c\'c3\'b3digo antig\'c3\'bco a una nueva versi\'c3\'b3n. (40% hecho)<br>* Pie de p\'c3\'a1gina limpia.<br>* [Fixed] Alertas de errores en envio y actualizaci\'c3\'b3n de comentarios.<br>* Botones de Taringa a la par con el Theme elegido.<br>* [Fixed] Agregar BBCode a todas las URL escritas.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 21.0:</span></u></b><br>* Arreglados la mayoria de los host del link checker y agregados un par.<br>* Optimizaci\'c3\'b3n de c\'c3\'b3digo.<br>* Script un poco m\'c3\'a1s pesado pero de ejecuci\'c3\'b3n m\'c3\'a1s r\'c3\'a1pida.<br>* Actualizador de comentarios. (BETA)<br>* Secci\'c3\'b3n estilo post en las opciones, para comentar sobre el script.<br>* Administrador de emoticones.<br>* Agregados temas para el script. Pueden elegir dentro de una gama, el que m\'c3\'a1s les guste.<br>* Agregada previsualizaci\'c3\'b3n de fotos en el la secci\'c3\'b3n Mis Fotos.<br>* [Fixed] Bug con el texto de los carteles de los botones del bbcoder.<br>* [Fixed] Bug con el texto en las opciones de im\'c3\'a1genes.<br>* [Fixed] Varios bug m\'c3\-nimos que hacian que se cuelgue el script.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 19.0:</span></u></b><br>* Nueva forma de actualizar el script.<br>* Arreglado el salto de linea de la barra de bbcode en mensajes.<br>* Nuevo men\'c3\'ba de opciones.<br>* Iconos del men\'c3\'ba configurables desde el men\'c3\'ba y no se borrar\'c3\'a1 al actualizar.<br>* Chat en las opciones.<br>* El administrador de post ahora carga la lista en forma descendente.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 18.0:</span></u></b><br>* Administrador de Posts.<br>* Arreglos varios.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 17.5:</span></u></b><br>* Configurable todas sus opciones.<br>* Agregado actualizador de posts.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 17.0:</span></u></b><br>* Compatibilidad Total con Taringa y Poringa Brasil.<br>* Pagina Principal con Post de Novatos a la Derecha.<br>* Mejora en aspecto varios.<br>* Nuevos botones para el Menu.<br>* Sin propaganda en la pagina principal.<br>* Nuevos Botones de Borrar y Editar tus post en tu perfil para tus ultimos post.<br>* Posibilidad de activar el asimilador de Poringa para dejarlo con el aspecto de Taringa.<br>* Escala de Grises en los colores.<br>* Optimizacion del codigo para una carga mas veloz.<br>* Arreglo de algunos host de archivos para el link checker.<br>* Buscador de Taringa por defecto.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 16.0:</span></u></b><br>* Arreglado el iconito de cerrar sesi\'c3\'b3n.<br>* Agregado un link checker para unos 50 hosts de archivos echo en un 80% por mi.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 15.5:</span></u></b><br>* [Bug Fixed] Previsualizar Comentarios.<br>* [Bug Fixed] Al agregar Post de "Manga y Anime" se creaba como "Mac".<br>* [Bug Fixed] Emoticones que no se mostraban en mensajes al activar emoticones ocultos.<br>* Nueva forma m\'c3\'a1s f\'c3\'a1cil de agregar nuevos iconos al c\'c3\'b3digo.<br>* Optimizaci\'c3\'b3n del c\'c3\'b3digo.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 15.0:</span></u></b><br>* Compatibilidad total con Poringa.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 14.5:</span></u></b><br>* Arreglo general de la secci\'c3\'b3n de edici\'c3\'b3n, agregado y envio y respuesta de mensajes.<br>* Agregada barra de emoticones en edici\'c3\'b3n, agregado y envio y respuesta de mensajes.  <img id="imagen" src="http://i41.tinypic.com/1zxldoo.jpg" border="0"> <br>* Compatibilidad total con funciones de edici\'c3\'b3n y agregado de post.<br>* Mejorada la forma de previsualizaci\'c3\'b3n.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 14.1:</span></u></b><br>* [Bug Fixed] Categoria Manga y Anime e icono.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 14.0:</span></u></b><br>* Mejoras en aspectos. (?)<br>* Bot\'c3\'b3n de "Agregar BBCode a todas las URL escritas"<br>* Nuevo lugar de descarga.<br>* M\'c3\'a1s opciones configurables.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 13.4:</span></u></b><br>* Nuevo aspecto del bot\'c3\'b3n de Flash <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/swf.png" border="0"> y del bot\'c3\'b3n de imag\'c3\'a9n <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/imagen.png" border="0"><br>* Nuevo bot\'c3\'b3n para crear una imag\'c3\'a9n clickeable <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/imagen-click.png" border="0"><br>* Nuevo selector de categor\'c3\-as en creaci\'c3\'b3n y edici\'c3\'b3n de post con las imagenes de cada categor\'c3\-a.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 13.3:</span></u></b><br>* Cambiar tama\'c3\'b1o de los reproductores de eSnips a su tama\'c3\'b1o original (328x94)<br>* Ahora tambi\'c3\'a9n el cuadro de eSnips permite que se ponga el c\'c3\'b3digo HTML de la canci\'c3\'b3n.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 13.2:</span></u></b><br>* Nuevo bot\'c3\'b3n para ocultar y mostrar los emoticones.<br>* Los emoticones ahora est\'c3\'a1n ocultos por defecto.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 13.1:</span></u></b><br>* [Bug Fixed] Redimensionamiendo de los reproductores de GoGear.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 13.0:</span></u></b><br>* M\'c3\'a1s iconos.<br>* Bot\'c3\'b3n de Megavideo. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/megavideo.png" border="0"><br>* Bot\'c3\'b3n de GoEar. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/goear.png" border="0"><br>* M\'c3\'a1s Fuentes.<br>* M\'c3\'a1s tama\'c3\'b1os de letra.<br>* Nueva barra de colores en comentarios, con decenas de colores.<br>* Se cambia el tama\'c3\'b1o de los reproductores de GoEar a su original (353x132)<br>* Se arreglo el problema con las dimensi\'c3\'b3n de los SWF en los comentarios.<br>* Mejorada la captura de datos de los botones. Ejemplos en los botones de YouTube, Google, MegaVideo, GoEar, eSnips se puede poner cualquier tipo de info. Como ser\'c3\-a la URL \'c3\'b3 el Codigo HTML o directamente la ID que el script se encargara de generar el c\'c3\'b3digo correcto no importa lo que se ingrese.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 12.0:</span></u></b><br>* Nuevo aspecto de botones<br>* Botones comunes de formato <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/izquierdo.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/centrado.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/derecho.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/negrita.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/cursiva.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/subrayado.png" border="0"><br>(<b>Negrita</b>, <em>cursiva</em>, <u>subrayado</u>, alineaci\'c3\'b3n de texto[izq,cen,der])<br>* Men\'c3\'ba desplegable para colores b\'c3\'a1sicos.<br>* Men\'c3\'ba desplegable para tama\'c3\'b1os de fuete b\'c3\'a1sicos.<br>* Men\'c3\'ba desplegable para tipos de fuentes.<br>* Botones para reproductor de videos de YouTube y Google Videos. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/youtube.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/google.png" border="0"><br>* Bot\'c3\'b3n para reproductor de m\'c3\'basica eSnips. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/esnips.png" border="0"><br>* Botones para arhivos flash "SWF", imagenes, links, quote. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/swf.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/imagen.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/link.png" border="0"> <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/cita.png" border="0"><br>* Bot\'c3\'b3n para preview de los comentarios. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/preview.png" border="0"><br>* Cambio de bot\'c3\'b3n para cerrar sesi\'c3\'b3n.<br>* Bot\'c3\'b3n para cerrar preview de comentario.<br>* Botones de "Ir a tierra" en el t\'c3\-tulo del post y en el t\'c3\-tulo de comentarios.<br>* Botonera de opciones para el post en agregar comentario. <br>(mensajes, favoritos, denuncia y puntaje)<br>* Men\'c3\'ba de opciones para activar o desactivar muchas funciones del script.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 11.1:</span></u></b><br>* Arreglado bug con los videos de YouTube <span style="color: green;">(Gracias eloffset)</span><br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 11.0:</span></u></b><br>* Bueno la tan pedida barra de emoticones la eh finalizado.<br>Algunos iconos fueron cambiados de tama\'c3\'b1o para no molestar. Esto no significa que en el comentario se vean chicos.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 10.8:</span></u></b><br>* Cambiado el tiempo de intervalo de actualizaci\'c3\'b3n a 30seg ya que recibi varias quejas de que era muy r\'c3\'a1pido. Ahora hay tiempo suficiente para leerlo completo.<br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 10.7:</span></u></b><br>* Actualizador autom\'c3\'a1tico de \'c3\'baltimos comentarios en la p\'c3\'a1gina principal (Cada 10seg)<br>* Nuevo icono para reproducir canciones. <img id="imagen" src="http://i268.photobucket.com/albums/jj27/sharkale/taringa/esnips.png" border="0"><br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 10.6:</span></u></b><br>* Peque\'c3\'b1a correcci\'c3\'b3n que no aparecia la barra en crear nuevo mensaje privado <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -574px; clip: rect(572px, 16px, 588px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span><br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 10.5:</span></u></b><br>* Cambio de la barra en agregar post, mensajes privado y comentarios.<br>* Agregado bot\'c3\'b3n de Google Videos.<br>* Mejorados los selectores de YouTube y Google Videos permitiendo ingresar cualquier referencia del video como la URL, el codigo HTML o la ID que devolver\'c3\'a1 un BBCode v\'c3\'a1lido para dicho video.<br>* Mejorados los BBC de los dem\'c3\'a1s botones, como posibilidad de agregarle el una etiqueta a una URL o que directamente ponga el BBC a una URL seleccionada, a una URL de una im\'c3\'a1gen, una URL a un texto seleccionado y dem\'c3\'a1s.<br>* Previsualizaci\'c3\'b3n del tipo de fuente en el selector.<br>* Achicado el vol\'c3\'bamen de la barra para prevenir el desborde de los que tienen baja resoluci\'c3\'b3n.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 10.1:</span></u></b><br>* Para todos los que molestaron con la [X] de cerrar sesi\'c3\'b3n. (@#$%&amp;#)<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 10.0:</span></u></b><br>* Mejoradas las funciones de los botones de video de youtube, flash, imagenes, url y quote.<br>* Ahora la URL puede ponerse a un texto seleccionado o solo la URL.<br>* En los videos de YouTube ya no hay 2 iconos, sino que ahora pregunta si es o no de alta definici\'c3\'b3n.<br>* Agregado el botonocito de cerrar previsualizacion.<br>* Agregado vinculo "Ir a la Tierra" en el titulo de los comentarios<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 9.8:</span></u></b><br>* Compatibilidad con la nueva barra T!.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 9.7:</span></u></b><br>* Desactivo momentaneamente las barras de BBC porque Taringa va a poner en funcionamiento la nueva barra, la cual no es compatible con mi script. Luego del lanzamiento vere que hago con el script. si vale o no la pena mejorarlo. No me llenen la casilla con MP \'c2\'ac\'c2\'ac<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 9.6:</span></u></b><br>* Agregados botones de Enviar, Favoritos y Denunciar en comentario.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 9.5:</span></u></b><br>* A pedido de muchos agregado el bot\'c3\'b3n de Quote<br>Y un peque\'c3\'b1ito enlace a mi post arriba a la dereca en el men\'c3\'ba <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -332px; clip: rect(330px, 16px, 346px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span> <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -332px; clip: rect(330px, 16px, 346px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span> <br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 9.0:</span></u></b><br>* Agregado al comentario una barrita para poner los puntos desde ahi. <br>\'c2\'a1\'c2\'a1\'c2\'a1Todav\'c3\-a est\'c3\'a1 BETA!!!<br>* Pude poner el "Ir a la Tiera" en la derecha jaja<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 8.3:</span></u></b><br>* Arreglados combobox y fuentes.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 8.2:</span></u></b><br>* Alguien que otro bugsito en las fuentas y el tama\'c3\'b1o. <br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 8.1:</span></u></b><br>* Le saque el loguito de navidad <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -574px; clip: rect(572px, 16px, 588px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span><br>';\par
\tab nuevaHTML += '    <b><u><span style="color: red;">Changelog versi\'c3\'b3n 8.0:</span></u></b><br>* Mejoras en el script. Ahora con autoactualizador.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 7.5:</span></u></b><br>* Arreglado el problema con los videos en los comentarios <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -310px; clip: rect(308px, 16px, 324px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span><br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 7.0:</span></u></b><br>* Ahora el script es compatible con Poringa! <br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 6.0:</span></u></b><br>* Varias Mejoras encuanto a los comentarios la barra, interface y preview de los comentarios.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 5.5:</span></u></b><br>* Cambiado el formato de como creaba la barra de BBCodes, haber si ahora se les soluciona el problema que tienen algunos que no le aparecen bien los iconos.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 5.2:</span></u></b><br>* Para todos a los que se les ve mal la nueva versi\'c3\'b3n y a los que no tambien. Bajen esta versi\'c3\'b3n donde eh achicado el texto en los combos para que ocupe menos espacio.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 5.1:</span></u></b><br>* Arreglada la imagen que estaba en portugues <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -354px; clip: rect(352px, 16px, 368px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span><br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 5.0:</span></u></b><br>* Agregado el preview beta de comentarios que se mejorara pronto.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 4.5:</span></u></b><br>* Mejorados los reproductores de video. Aca les dejo una muestra. Aparte de la combinacion de colores con taringa.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 4.0:</span></u></b><br>* Bueno eh cambiado la barra de bbcodes en "Agregar post" y "Edicion de post" y tambien no permitiendo que este se mueva hacia arriba cuando se agrega uno de los emoticones de abajo o con cualquier bbcode.<br>* Y tambien cambie el signito de taringa por uno m\'c3\'a1s modernito que hice <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -354px; clip: rect(352px, 16px, 368px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span><br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 3.5:</span></u></b><br>* Le agregue un link para ir al fondo de la p\'c3\'a1gina en los post <span style="position: relative;"><img src="http://i.t.net.ar/images/big2v5.gif" style="position: absolute; top: -574px; clip: rect(572px, 16px, 588px, 0px);"><img src="http://i.t.net.ar/images/space.gif" style="width: 16px; height: 12px;"></span> para los que le jode usar la barra o mantener el boton de ReP\'c3\'a1g apretado.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 3.0:</span></u></b><br>* Agregado el BBCode para videos de youtube. Con la posibilidad de reproducir videos de alta calidad.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 2.0:</span></u></b><br>* Cuando se utilizan las opciones para dar formato al texto sucede exactamente lo mismo que cuando uno va a <em>Agregar</em> y a hacer un post: si, por ejemplo, pongo <b>negrita</b>, <b>autom\'c3\'a1ticamente, el texto se mueve hacia arriba, con lo que hay que buscar la parte \'c3\'baltima en la que se insert\'c3\'b3 el c\'c3\'b3digo</b> haciendo un poco inc\'c3\'b3modo la insersi\'c3\'b3n de un post o comentario.<br>* La version 2 del script. Ahora ya no sucede esto, es m\'c3\'a1s, el texto seleccionado al que le damos formato sigue seleccionado para poder seguir agregandole BBC sin necesidad de volverlo a seleccionar.<br>Y cuando no se selecciono texto, la posici\'c3\'b3n del cursor se situa justo donde tenemos que ingresar los datos del BBC.<br>* Tambien arregle el campo de texto que se desbordaba un poco de la interface. Achicandolo a el tama\'c3\'b1o ideal.<br><b><u><span style="color: red;">Changelog versi\'c3\'b3n 1.0:</span></u></b><br>* Bueno cansado de cada vez que le quiero poner algo a algun comentario escribir los BBC, eh escrito este script que introduce la botonera de BBCodes. Como no esta en la misma p\'c3\'a1gina de crear un post no puedo hacer un "copy-paste" asi que dise\'c3\'b1e todas las funciones en el script para poder ingresar estos BBC dentro del cuadro de texto.<br>* Como me gusto como ah quedado me gustar\'c3\-a compartirlo con ustedes.<br>* Antes que nada pueden ver el c\'c3\'b3digo antes de instalarlo y verificar que no tiene nada malisioso. Igual si no entienden mucho de JavaScript les doy la palabra que no hace nada malo. O lo podr\'c3\-a revisar algun miembro de Taringa para darle el OK.';\par
\tab nuevaHTML += '</b></div>';\par
\tab nuevaHTML += '<div id="opciones-6"><b>';\par
\tab nuevaHTML += '    <div style="float:left;"><img src="http://img42.imageshack.us/img42/4787/bienvenida.png" alt=""/></div>';\par
\tab nuevaHTML += '    <div style="float:right;"><img src="http://img42.imageshack.us/img42/4787/bienvenida.png" alt=""/></div>';\par
\tab nuevaHTML += '    <div align="center"><br><span style="font-size:15px">BBCoder para Taringa! y Poringa! por:</span><br/><br/><br/>';\par
\tab nuevaHTML += '    <span style="font-size:30px;font-family:Arial Black">Sharkale\'c2\'ae 2009</span><br/><br/><br/>';\par
\tab nuevaHTML += '    <span style="font-size:15px;">Versi\'c3\'b3n instalada actualmente: '+ultversion+'</span><br/><br/>';\par
\tab nuevaHTML += '    <img src="http://i44.tinypic.com/2e2nxjb.gif" alt=""/><br><br>';\par
\tab nuevaHTML += '    <div class="ui-state-error ui-corner-all" style="padding: 0pt 0.7em;"><p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: 0.3em;"></span><strong>Alerta:</strong> Si sos moderador te la comes doblada. Y si estas buscando como contactarme para criticar algo del script te podes ir bien a la casilla de mensajes y escribirme. =D</p></div><br/>';\par
\tab nuevaHTML += '    <hr>Agradecimientos<br><input type="button" class="ui-state-default ui-corner-all" title="Mis agradecimientos a acatengoqueponerminick" value="acatengoqueponerminick">';\par
\tab nuevaHTML += '    <input type="button" class="ui-state-default ui-corner-all" title="Mis agradecimientos a EternamenteCiego" value="EternamenteCiego">';\par
\tab nuevaHTML += '    <hr><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="7853233">Capaz alguien me dona 10ctv que le quedan ah\'c3\- tiraditos en la cuenta de PayPal ^.^ <input type="image" src="https://www.paypal.com/es_ES/ES/i/btn/btn_donate_LG.gif" border="0" name="submit" align="absmiddle" alt="PayPal. La forma r\'c3\'a1pida y segura de pagar en Internet." class="ui-state-default ui-corner-all"><img alt="" border="0" src="https://www.paypal.com/es_XC/i/scr/pixel.gif" width="1" height="1"></form><hr>';\par
\tab nuevaHTML += '    <input type="button" value="Reportar Bug o Ayudar con una Sugerencia para el Script" id="Btn_Reportar_Bug_Sugerencia" title="Reportar Bug o Ayudar con una Sugerencia para el Script" class="ui-state-default ui-corner-all"/>';\par
\tab nuevaHTML += '    </div>';\par
\tab nuevaHTML += '</b></div>';\par
\tab nuevaHTML += '</div>';\par
\tab //nuevaHTML += '    ';\par
\tab div.innerHTML = nuevaHTML;\par
\tab $('body').before(div);\par
\tab $('#ajaxdiv').remove();\par
\tab try\{$('#SharkaleOpciones').dialog(\{title: 'Opciones Avanzadas del Script - Sharkale\'c2\'ae',width: 900, modal: true, position:['center',30], resizable: false, draggable: false \});\}catch(e)\{\};\par
\tab $("#tabs, #tabsOpciones").tabs();\par
\tab try\{$('#switcher').themeswitcher();\}catch(e)\{\};\par
\tab\par
\tab $('#miarrobatag207890').attr('src','http://tagboard.miarroba.com/mostrarmensajes.php?id=207890');\par
\tab if(user)\{ \par
\tab\tab $('#miarrobatag207890_nick').attr('value', (user.length > 20? user.substr(0,20):user));\par
\tab\}else\{\par
\tab\tab $('#miarrobatag207890_submit').attr('disabled', 'true');\par
\tab\tab $('#miarrobatag207890_submit').addClass('ui-state-disabled');\par
\tab\tab $('#miarrobatag207890_submit').attr('value', 'Debes logearte en la p\'c3\'a1gina antes de utilizar el tagboard!');\par
\tab\}\par
\tab\par
\tab $(':button[class*="ui-state-default"],:submit[class*="ui-state-default"]').hover(\par
\tab\tab function() \{ $(this).addClass('ui-state-hover'); \}, \par
\tab\tab function() \{ $(this).removeClass('ui-state-hover'); \}\par
\tab );\par
\tab\par
\tab $('#tb_msg').focus(function() \{\par
\tab\tab if($('#tb_msg').val() == 'Tu mensaje aqu\'c3\-')\par
\tab\tab\tab $('#tb_msg').val('');\par
\tab\});\par
\tab $('#tb_msg').blur(function() \{\par
\tab\tab if($('#tb_msg').val() == '')\par
\tab\tab\tab $('#tb_msg').val('Tu mensaje aqu\'c3\-');\par
\tab\});\par
\tab\par
\tab $('#Btn_CambiarTheme').click(function() \{\par
\tab\tab if(CambiarTheme)\{\par
\tab\tab\tab $('div[class="ui-widget-overlay"]').remove();\par
\tab\tab\tab $('div[aria-labelledby="ui-dialog-title-SharkaleOpciones"]').remove();\par
\tab\tab\tab Cambiar_Theme();\par
\tab\tab\}else alert('Tienes desactivado el cambiador de theme. Activalo primero.');\par
\tab\});\par
\tab $('#Btn_Guardar_Opciones').click(function() \{Guardar_Opciones()\});\par
\tab $('#Btn_Guardar_Imagenes').click(function() \{Guardar_Imagenes()\});\par
\tab $('#Btn_Restablecer_Imagenes').click(function() \{Restablecer_Imagenes()\});\par
\tab $('#Btn_Reportar_Bug_Sugerencia').click(function() \{Bug_Sugerencia()\});\par
\tab $('#Btn_Agregar_Emoticones').click(function() \{Agregar_Emoticones()\});\par
\tab $('#Btn_Guardar_Emoticones').click(function() \{Guardar_Emoticones()\});\par
\tab $('#Btn_Reestablecer_Emoticones').click(function() \{Reestablecer_Emoticones()\});\par
\tab $('#Btn_Chat').click(function() \{Abrir_Chat()\});\par
\tab //if(user) $.get(urlscript+'u.php?u='+user);\par
\tab if(user) $.get(urlscript2+'u.php?u='+user);\par
\tab $.get('http://tagboard.miarroba.com/ver.php?id=207890');\par
\};\par
\par
function modificar_posts()\{\par
\tab $('embed').attr('allowfullscreen','true').attr('allowscriptaccess','always');\par
\tab if(aSWF == true)\{\par
\tab\tab if(path == 'comunidades')\{\par
\tab\tab\tab $('embed').attr('height','485').attr('width','600');\par
\tab\tab\tab $('embed[src*="www.goear.com"]').attr('height','132').attr('width','353');\par
\tab\tab\tab $('embed[src*="www.esnips.com"]').attr('height','169').attr('width','372');\par
\tab\tab\}else\{\par
\tab\tab\tab $('embed').attr('height','485').attr('width','700');\par
\tab\tab\tab $('embed[src*="www.goear.com"]').attr('height','132').attr('width','353');\par
\tab\tab\tab $('embed[src*="www.esnips.com"]').attr('height','169').attr('width','372');\par
\tab\tab\}\par
\tab\}\par
\tab vidYT = $('embed[src*="www.youtube.com"]');\par
\tab for(var i=0; i < vidYT.length; i++)\par
\tab\tab $('embed[src*="www.youtube.com"]:eq('+i+')').attr('src',$('embed[src*="www.youtube.com"]:eq('+i+')').attr('src')+'&hl=es&fs=1&color1=2b405b&color2=6b8ab6&fs=1');\par
\tab if(vYT == true && path != 'comunidades')\{\par
\tab\tab $('embed[src*="www.youtube.com"]').attr('height','431').attr('width','700');\par
\tab\}else\{\par
\tab\tab $('embed[src*="www.youtube.com"]').attr('height','344').attr('width','425');\par
\tab\}\par
\tab for(var i=0; i < $('embed').length; i++)\{\par
\tab\tab var em = $('embed:eq('+i+')').clone(true);\par
\tab\tab $('embed:eq('+i+')').after(em);\par
\tab\tab $('embed:eq('+i+')').remove();\par
\tab\}\par
\tab arreglarbr = $('div[id*="div_cmnt_"] blockquote');\par
\tab for(var i=0; i < arreglarbr.length; i++)\{\par
\tab\tab $('div[id*="div_cmnt_"] blockquote:eq('+i+')').html($('div[id*="div_cmnt_"] blockquote:eq('+i+')').html().replace(/\\[br\\]/g,'<br>'));\par
\tab\}\par
\}\par
// ==/Funciones que ser\'c3\'a1n agregadas a la p\'c3\'a1gina==\par
\par
///////////////------------------Cambiar Iconos--------------------////////////////////\par
if($("a[class='iniciar_sesion']").size() == 0)\{\par
\par
var newCSS  = '.menu_izq \{-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:transparent url(../menu_left_corner.gif) no-repeat scroll left top;float:left;height:30px;margin:auto;padding-left:10px;position:relative;text-align:left;vertical-align:middle;width:700px!important;\}';\par
\tab newCSS += '.separador \{margin: auto 5px auto 0px; float: left\}';\par
\tab newCSS += '.tMenu \{font: 12px arial;z-index:1000;text-align:center;color:#000000;\}';\par
    newCSS += '.tMenu, .tMenu ul \{padding: 0; margin: 0; list-style: none;float: left;\}';\par
    newCSS += '.tMenu li \{line-height: '+MenuSize+'px; padding-top:'+(28-MenuSize < 6? 28-MenuSize:23-MenuSize)+'px;\}';//\par
    newCSS += '.tMenu li ul \{line-height: 1.50em; position : absolute; left: -999em; margin-left : 0px; margin-top : -1px; width:175px;background-color:#C3C0C0;border:2px solid #777777;z-index:1001\}';\par
    newCSS += '.tMenu li ul li\{padding-top: 0px;line-height : 1.50em; width:175px;background-color:#C3C0C0;border-top:1px solid #777777;\}';\par
    newCSS += '.tMenu li ul ul \{left: -999em;\}';\par
\tab newCSS += '.tMenu li ul li ul \{margin-left: 170px;margin-top : -20px;\}';\par
    newCSS += '.tMenu li a \{ display : block; font-weight : bold; text-decoration : none;\}';\par
    newCSS += '.tMenu li a:hover \{color:#0082BE;\}';\par
    newCSS += '.tMenu li:hover ul ul, .tMenu li:hover ul ul ul \{left: -999em;z-index:1002\}';\par
    newCSS += '.tMenu li:hover ul, .tMenu li li:hover ul, .tMenu li li li:hover ul \{left: auto;background-color:#fff;z-index:1002\}';\par
\tab newCSS += '.tMenu li ul li:hover\{left: auto;background-color:#D2D2D2;z-index:1002\}';\par
\tab GM_addStyle(newCSS);\par
\par
\tab var menu = '<span class="menu_izq">';\par
\tab menu += '<ul class="tMenu">';\par
\tab menu += '\tab <li><a href="http://'+Dom+'" title="Inicio"><img src="'+MenuTaringa+'" align="absmiddle" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle"  alt="Inicio" border="0"/></a>';\par
    menu += '\tab <ul><b>Taringa!</b>';\par
    menu += '\tab\tab <li><a href="/agregar/">Agregar Post</a></li>';\par
    menu += '\tab\tab <li><a href="/top/">Tops</a></li>';\par
    menu += '\tab\tab <li><a href="/chat/">Chat</a></li>';\par
    menu += '\tab\tab <li><a href="http://ayuda.itaringa.net/">Ayuda y FAQs</a></li>';\par
\tab menu += '\tab\tab <li><a href="/buscador-taringa.php">Buscador</a></li>';\par
\tab menu += '\tab\tab <li><b>Busqueda R\'c3\'a1pida</b><form method="get" action="http://www.taringa.net/buscador-taringa.php"><input name="q" title="Buscador R\'c3\'a1pido" style="border: 0px none; font-size: 10px; width:160px;padding-bottom:2px;" type="text"></form></li>';\par
\tab menu += '\tab\tab <li><a href="/categorias/novatos/">Novatos</a></li>';\par
\tab menu += '\tab\tab <li><a href="/juegos/">Juegos</a>';\par
\tab menu += '\tab\tab <ul>';\par
\tab menu += '\tab\tab\tab <li><a href="/juegos/truco/"><img src="http://i.t.net.ar/images/icon-salon.gif" height="20"> Truco Multiplayer</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/truco/juego.php?salon=0\\')">Sala: [1]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/truco/juego.php?salon=1\\')">Sala: [2]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/truco/juego.php?salon=2\\')">Sala: [3]</a></li>';\par
\tab menu += '\tab\tab\tab <li><a href="/juegos/damas/"><img src="http://i.t.net.ar/images/icon-damas.gif" height="20"> Damas</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/damas/juego.php?salon=0\\')">Sala: [1]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/damas/juego.php?salon=1\\')">Sala: [2]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/damas/juego.php?salon=2\\')">Sala: [3]</a></li>';\par
\tab menu += '\tab\tab\tab <li><a href="/juegos/ajedrez/"><img src="http://i.t.net.ar/images/icon-ajedrez.gif" height="20"> Ajedrez</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/ajedrez/juego.php?salon=0\\')">Sala: [1]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/ajedrez/juego.php?salon=1\\')">Sala: [2]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/ajedrez/juego.php?salon=2\\')">Sala: [3]</a></li>';\par
\tab menu += '\tab\tab\tab <li><a href="/juegos/bichitos/"><img src="http://i.t.net.ar/images/icon-bichitos.png" height="20"> Bichitos</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/bichitos/juego.php?salon=0\\')">Sala: [1]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/bichitos/juego.php?salon=1\\')">Sala: [2]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/bichitos/juego.php?salon=2\\')">Sala: [3]</a></li>';\par
\tab menu += '\tab\tab\tab <li><a href="/juegos/poker/"><img src="http://i.t.net.ar/images/pokericon.jpg" height="20"> Poker Texas Hold\\'em</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/poker/juego.php?salon=0\\')">Sala: [1]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/poker/juego.php?salon=1\\')">Sala: [2]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/poker/juego.php?salon=2\\')">Sala: [3]</a></li>';\par
\tab menu += '\tab\tab\tab <li><a href="/juegos/xt/"><img src="http://i.t.net.ar/images/icon-ttris.jpg" height="20"> T!tris</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/xt/juego.php?salon=0\\')">Sala: [1]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/xt/juego.php?salon=1\\')">Sala: [2]</a> <a href="javascript:Abrir_Juego(\\'http://www.taringa.net/juegos/xt/juego.php?salon=2\\')">Sala: [3]</a></li>';\par
\tab menu += '\tab\tab </ul></li>';\par
\tab menu += '\tab\tab <li><a href="/protocolo/">Protocolo</a></li>';\par
\tab menu += '\tab\tab <li><a href="/denuncia-publica/">Denunciar</a></li>';\par
\tab menu += '\tab\tab <li><a href="http://br.taringa.net/">T! em Portugu\'c3\'aas</a></li>';\par
    menu += '\tab </ul>';\par
\tab menu += '\tab </li>';\par
\tab menu += '</ul><span class="separador">&nbsp;</span>';\par
//----Mensaje----//\par
\tab var Mensajes = $('a[href="/mensajes/"]:first').is(':has(span)');\par
\tab menu += '<ul class="tMenu">';\par
\tab menu += '\tab <li><a href="/mensajes/"><img src="'+(Mensajes? MenuMensajesLleno:MenuMensajesVacio)+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle"  alt="X" border="0"/>'+(Mensajes? $('a[href="/mensajes/"]:first').find('span:first').html():'')+ '</a>';\par
    menu += '\tab <ul><b>Casilla de Mensajes</b>';\par
    menu += '\tab\tab <li><a href="/mensajes/enviados/">Mensaje Enviados</a></li>';\par
    menu += '\tab\tab <li><a href="/mensajes/eliminados/">Mensaje Eliminados</a></li>';\par
    menu += '\tab\tab <li><a href="/mensajes/redactar/">Escribir Mensaje</a></li>';\par
    menu += '\tab </ul>';\par
\tab menu += '\tab </li>';\par
\tab menu += '</ul><span class="separador">&nbsp;</span>';\par
//----Monitor----//\par
\tab menu += '<ul class="tMenu">';\par
\tab menu += '\tab <li><a href="/monitor/"><img src="'+MenuMonitor+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="X" border="0"/></a></li>';\par
\tab menu += '</ul><span class="separador">&nbsp;</span>';\par
//----Favoritos----//\par
\tab menu += '<ul class="tMenu">';\par
\tab menu += '\tab <li><a href="/favoritos.php"><img src="'+MenuFavoritos+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="X" border="0"/></a></li>';\par
\tab menu += '</ul><span class="separador">&nbsp;</span>';\par
//----Cuenta----//\par
\tab menu += '<ul class="tMenu">';\par
\tab menu += '\tab <li><a href="/cuenta/"><img src="'+MenuCuenta+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="X" border="0"/></a>';\par
    menu += '\tab <ul><b>Mi Cuenta</b>';\par
    menu += '\tab\tab <li><a href="/password-form.php">Cambiar mi password</a></li>';\par
    menu += '\tab\tab <li><a href="javascript:void(0)">Editar mi perfil</a>';\par
\tab menu += '\tab\tab\tab <ul>';\par
\tab menu += '\tab\tab\tab\tab <li><a href="/cuenta/perfil/editar/paso1">Formaci\'c3\'b3n y trabajo</a>';\par
\tab menu += '\tab\tab\tab\tab <li><a href="/cuenta/perfil/editar/paso2">M\'c3\'a1s sobre mi</a>';\par
\tab menu += '\tab\tab\tab\tab <li><a href="/cuenta/perfil/editar/paso3">Como soy</a>';\par
\tab menu += '\tab\tab\tab\tab <li><a href="/cuenta/perfil/editar/paso4">Intereses y preferencias</a>';\par
\tab menu += '\tab\tab\tab\tab <li><a href="/cuenta/perfil/editar/paso5">Mensaje Personal</a>';\par
\tab menu += '\tab\tab\tab </ul>';\par
\tab menu += '\tab\tab </li>';\par
    menu += '\tab\tab <li><a href="/cuenta/opciones/">Editar mis opciones</a></li>';\par
\tab menu += '\tab\tab <li><a href="/cuenta/avatar/">Modificar mi avatar</a></li>';\par
\tab menu += '\tab\tab <li><a href="/cuenta/fotos/">Mis Fotos</a></li>';\par
\tab menu += '\tab\tab <li><a href="/miavatar-crear.php">Crear mi avatar</a></li>';\par
    menu += '\tab </ul>';\par
\tab menu += '\tab </li>';\par
\tab menu += '</ul><span class="separador">&nbsp;</span>';\par
//----Mi Perfil----//\par
\tab menu += '<ul class="tMenu">';\par
\tab menu += '\tab <li><a href="/perfil.php">'+user+'</a>';\par
    menu += '\tab <ul><b>Mi Perfil</b>';\par
    menu += '\tab\tab <li><a href="/buscador-taringa.php?autor='+user+'">Mis Posts</a></li>';\par
    menu += '\tab\tab <li><a href="/comentarios/'+user+'">Mis \'c3\'baltimos comentarios</a></li>';\par
    menu += '\tab </ul>';\par
\tab menu += '\tab </li>';\par
\tab menu += '</ul><span class="separador">&nbsp;</span>';\par
//----Logout----//\par
\tab menu += '<ul class="tMenu">';\par
\tab menu += '\tab <li><a href="/logout.php?key='+datospag.user_key+'"><img src="'+MenuCerrarSesion+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="X" border="0"/></a></li>';\par
\tab menu += '</ul><span class="separador">&nbsp;&nbsp;&nbsp;</span>';\par
//----Moderacion----//\par
\tab menu += '<ul class="tMenu">';\par
\tab menu += '\tab <li><a href="/mod-history/"><img src="'+MenuModeracion+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" alt="X" border="0"/></a></li>';\par
\tab menu += '</ul><span class="separador">&nbsp;</span>';\par
//----Opciones----//\par
\tab menu += '<ul class="tMenu">';\par
\tab menu += '\tab <li><a href="javascript:void(0)" id="Sharkale_Opciones" title="Opciones Avanzadas del Script"><img src="'+MenuOpciones+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle"/></a></li>';\par
\tab menu += '</ul><span class="separador">&nbsp;</span>';\par
\tab menu += '<ul class="tMenu">';\par
\tab menu += '\tab <li><a href="http://radio.sharkale.com.ar" title="Visiten la Radio de Sharkale\'c2\'ae =P" target="_blank"><img src="http://i29.tinypic.com/3029onc.jpg" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle"/></a></li>';\par
\tab menu += '</ul><span class="separador">&nbsp;&nbsp;&nbsp;&nbsp;</span>';\par
//----Actualizar----//\par
\tab menu += '<ul id="MenuAct" class="tMenu" style="display:none;">';\par
\tab menu += '\tab <li><a href="javascript:void(0)" id="Sharkale_Actualizar" title="Hay una nueva versi\'c3\'b3n disponible del Script" style="text-decoration:blink;"><img src="'+MenuActualizacion+'" style="width: '+MenuSize+'px; height: '+MenuSize+'px;" align="absmiddle" /> Nueva Versi\'c3\'b3n</a></li>';\par
\tab menu += '</ul>';\par
\tab menu += '</span>';\par
\tab $('span[class="menu_centro"]:first').remove();\par
\tab $('span[class="menu_izq"]:first').remove();\par
\tab $('div[class="opciones_usuario"]:first').html(menu);\par
\}\par
\par
///////////////------------------Ejecucion--------------------////////////////////\par
\par
AgregarFuncionesenWeb();\par
$('#banner').remove();\par
$('div[class*="banner"]').remove();\par
$('script[src*="google-analytics.com"],script[src*="e-planning"]').remove();\par
$('script:contains(google-analytics.com),script:contains(pageTracker),script:contains(e-planning)').remove();\par
$('#Sharkale_Opciones').click(function() \{\par
\tab var HTML = '<div id="ajaxdiv" style="border: 1px solid black; padding: 2px; background: rgb(233, 233, 255) none repeat scroll 0% 0%; width: 100px; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; position: fixed; visibility: visible; opacity: 1; right: 45%; top: 40%;text-align:center;">';\par
\tab HTML += '<br /><br /><img src="'+URL+'cargando.gif" alt="Cargando" title="Cargando Opciones" border="0" /><br /><br />';\par
\tab HTML += '<span style="font-weight: bold">Cargando Opciones del Script</span><br /><br />';\par
\tab HTML += '</div>';\par
\tab $('body').append(HTML);\par
\tab $.timer(500, function (timer) \{\par
\tab\tab timer.stop();\par
\tab\tab Sharkale_Opciones();\par
\tab\});\par
\});\par
\par
if($("img[src*='mejorastecnicas.png'][title*='Haciendo mejoras']").length != 0)\{\par
\tab $.timer(10000, function (timer) \{\par
\tab\tab location.reload();\par
\tab\});\par
\tab return;\par
\}\par
if(path == 'post')\{\par
\tab var eliminarbr = $('div[id="cuerpo1"] br');\par
\tab eliminarbr.slice(eliminarbr.length-4).remove();\par
\tab GM_addStyle('#gif_cargando_add_comment \{margin-left:650px;margin-top:30px;position:absolute !important;\}');\par
\tab document.imagen = new Image;\par
\tab document.imagen.src = URL+'cargando.gif';\par
\tab $('div[class*="ads"]').parent().remove();\par
///////////////------------------Agregar Boton Ir Abajo--------------------////////////////////\par
\tab if($('#titulo1'))\{\par
\tab\tab $('a[href*="cielo"]').attr('id','pie-a').removeClass('irCielo').attr('style','font-weight:bold;font-size:13px;').attr('href','#maincontainer');\par
\tab\tab var Tierra = '<span style="vertical-align: middle;float: right;padding-top: 1px;padding-right: 2px">';\par
\tab\tab Tierra += '<a href="#pie-a" class="size13"><strong>Ir a la Tierra</strong></a></span>';\par
\tab\tab $('#titulo1').html(Tierra + '<span style="vertical-align: middle;padding-top: 1px;">' + $('#titulo1').html()+ '</span>');\par
\tab\tab $('div[class="comentarios_container"]').find('div[class="box_rss"]:first').prepend('<a href="#pie-a" class="size13"><strong>Ir a la Tierra</strong></a>');\par
\tab\}\par
///////////////-----------------Agregar FullScreenMode------------------////////////////////\par
\tab modificar_posts();\par
///////////////------------------Modificar Agregar Comentario--------------------////////////////////\par
\tab if($("#cuerpo_comment").length != 0)\{\par
///////////////-------------------------Agregar BBCodes--------------------------////////////////////\par
\tab\tab $('div[class="markItUpHeader"]').html('<span style="float:left;text-align:left;">'+CrearBarraBBC()+'</span><span style="float:right;">'+CrearBarraColores()+'</span>');\par
\tab\tab var txt = $$$("cuerpo_comment");\par
///////////////-----------------Agregar Opciones en Comentarios------------------////////////////////\par
\tab\tab if(PunFav == true)\{\par
\tab\tab\tab if($('#span_opciones1').size() != 0 || $('#span_opciones2').size() != 0)\{\par
\tab\tab\tab\tab var stropc = '';\par
\tab\tab\tab\tab if($('#span_opciones1').size() == 1)\{\par
\tab\tab\tab\tab\tab var opc1 = $('#span_opciones1').clone().html();\par
\tab\tab\tab\tab\tab if(opc1.match(/solidarios[\\w\\W]*span_opciones2/))\par
\tab\tab\tab\tab\tab\tab opc1 = '<b>Dar puntos:</b> Los posts solidarios no se pueden calificar';\par
\tab\tab\tab\tab\tab else if(opc1.match(/para dar[\\w\\W]*span_opciones2/))\par
\tab\tab\tab\tab\tab\tab opc1 = '<b>Dar puntos:</b> No hay puntos para dar';\par
\tab\tab\tab\tab\tab stropc = opc1;\par
\tab\tab\tab\tab\}else stropc = '<b>Dar puntos:</b> Usuarios Novatos no pueden calificar';\par
\tab\tab\tab\tab if($('#span_opciones2').size() == 1)\{\par
\tab\tab\tab\tab\tab var opc2 = $('#span_opciones2').clone();\par
\tab\tab\tab\tab\tab opc2.html(opc2.find('a').slice(0,3).html(''));\par
\tab\tab\tab\tab\tab opc2 = opc2.html();\par
\tab\tab\tab\tab\tab if(stropc != '') \par
\tab\tab\tab\tab\tab\tab stropc = opc2 + ' | ' + stropc;\par
\tab\tab\tab\tab\tab else\par
\tab\tab\tab\tab\tab\tab stropc = opc2;\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab $('span[class="box_txt post_agregar_comment"]:first').html('<span style="float:left;text-align:left;">Agregar un nuevo comentario</span><span style="float:right;text-align:right;font-weight:normal;width: 550px;">'+stropc+'</span>');\par
\tab\tab\tab\}\par
\tab\tab\}\par
///////////////-----------------Agregar Emoticones------------------////////////////////\par
\tab\tab $('div[class="box_cuerpo agregar_comm_izq"]:first').removeAttr('class');\par
\tab\tab $('div[class="box_cuerpo agregar_comm_der"]:first').removeAttr('class').attr('style','text-align: center');\par
\tab\tab txt.setAttribute('style', 'min-height: 280px; width: 660px;');\par
\tab\tab BotonOcultar = '<input class="button" value="'+(EmotVis == true? "Ocultar Emoticones":"Mostrar Emoticones")+'" onclick="Ocultar_Emoticones(this);return false;" id="ocultar_emot" type="button" title="Mostrar/Ocultar la barra de emoticones r\'c3\'a1pidos">';\par
\tab\tab $('#MapSmiles').remove();\par
\tab\tab $('a[href="javascript:openpopup()"]').parent().remove();\par
\tab\tab $('#smiles').replaceWith('<span style="float:left;">'+BotonOcultar+'</span><span id="seccion_enviar" style="float:right;"></span><br><br>'+CrearBarraEmoticones());\par
\tab\tab $('#button_add_comment').attr('id','sharkborrar').clone(true).attr('id','button_add_comment').prependTo('#seccion_enviar');\par
\tab\tab $('#sharkborrar').remove();\par
\tab\tab $('#button_add_comment').removeAttr('disabled');\par
\tab\tab autor = $(':button[value="Eliminar"]').is(':visible');\par
\tab\tab GM_addStyle('.Sharkale_cargando \{display:none;\}');\par
\tab\tab HTML = '<div class="citacuerpo" style="font-size: 11px;"><input type="button" value="Actualizar Comentarios - Sharkale\'c2\'ae" class="button" title="Actualizar todos los comentarios. Si hay demasiados puede trabarse un momento." onclick="actualizar_comentarios_post()">&nbsp;&nbsp;<span class="Sharkale_cargando"><img src="http://i27.tinypic.com/2wp8bdg.gif" align="absmiddle"/></span></div>';\par
\tab\tab $('#return_agregar_comentario').parent().after(HTML);\par
\tab\tab HTML = '<input type="button" value="Ver Preview del Comentario" class="button" title="Ver Preview del Comentario" onclick="preview()">';\par
\tab\tab $('#ocultar_emot').before(HTML);\par
\tab\tab $('div[class="box_cuerpo"][style*="font-size"]').attr('id','Sharkale_comentarios');\par
\tab\}\par
\tab if($('div[typeof="foaf:Person"]').find('a[href="/perfil/2806166"]').length != 0)\{\par
\tab\tab var mod_sharkale = $('div[typeof="foaf:Person"]');\par
\tab\tab mod_sharkale.html(mod_sharkale.html().replace(/New Full User/gi,'Moderador').replace(/No Rankeado/,'T! Rank: 1').replace(/ Puntos/,'4684 Puntos'));\par
\tab\tab $('img[title="Moderador"]').attr('style','position: absolute; top: -703px; clip: rect(703px, 16px, 720px, 0px);').removeAttr('alt');\par
\tab\tab mod_sharkale = $('img[title="Moderador"]').parent().attr('id','icon_shark').clone();\par
\par
\tab\}\par
\}else if(path == 'edicion')\{\par
\tab\tab document.imagen = new Image;\par
\tab\tab document.imagen.src = URL+'cargando.gif';\par
\tab\tab $('#form_div').find('ul:eq(1) li:first').before('<li><img vspace="2" align="absmiddle" src="http://i29.tinypic.com/30lguj7.gif"/></li>');\par
\tab\tab $(':button[tabindex="8"]').after('&nbsp;&nbsp;<input class="button" onclick="if(show_preview(this.form.titulo.value, this.form.cuerpo.value, this.form.tags.value, this.form, true)) document.forms.newpost.submit()" style="font-size: 15px;" value="Postear Sin Previsualizar" title="Postear Sin Previsualizar" type="button">');\par
///////////////------------------Agregar BBCodes--------------------////////////////////\par
\tab\tab $('div[class="markItUpHeader"]:first').html(CrearBarraBBC());\par
\tab\tab var cat = $("select[name='categoria']:first");\par
\tab\tab cat.html(cat.html().replace(/<option value="([-\\d]+)">([\\w\'c3\'a7\'c3\'b5,-\'c3\'a1\'c3\'a9\'c3\-\'c3\'b3\'c3\'ba!\\s]+)<\\/option>/g, '<label><span class="categoriaPost $1"></span><input type="radio" name="categoria" value="$1">$2</label><br>').replace(/<option value="([-\\d]+)" selected="(?:selected|true)">([\\w\'c3\'a7\'c3\'b5,-\'c3\'a1\'c3\'a9\'c3\-\'c3\'b3\'c3\'ba!\\s]+)<\\/option>/g, '<label><span class="categoriaPost $1"></span><input type="radio" name="categoria" value="$1" checked>$2</label><br>').replace(/categoriaPost -1/, 'categoriaPost '+BarraCateg["-1"]).replace(/categoriaPost 7/, 'categoriaPost '+BarraCateg["7"]).replace(/categoriaPost 18/, 'categoriaPost '+BarraCateg["18"]).replace(/categoriaPost 4/, 'categoriaPost '+BarraCateg["4"]).replace(/categoriaPost 25/, 'categoriaPost '+BarraCateg["25"]).replace(/categoriaPost 17/, 'categoriaPost '+BarraCateg["17"]).replace(/categoriaPost 19/, 'categoriaPost '+BarraCateg["19"]).replace(/categoriaPost 16/, 'categoriaPost '+BarraCateg["16"]).replace(/categoriaPost 9/, 'categoriaPost '+BarraCateg["9"]).replace(/categoriaPost 23/, 'categoriaPost '+BarraCateg["23"]).replace(/categoriaPost 29/, 'categoriaPost '+BarraCateg["29"]).replace(/categoriaPost 24/, 'categoriaPost '+BarraCateg["24"]).replace(/categoriaPost 26/, 'categoriaPost '+BarraCateg["26"]).replace(/categoriaPost 1/, 'categoriaPost '+BarraCateg["1"]).replace(/categoriaPost 12/, 'categoriaPost '+BarraCateg["12"]).replace(/categoriaPost 0/, 'categoriaPost '+BarraCateg["0"]).replace(/categoriaPost 2/, 'categoriaPost '+BarraCateg["2"]).replace(/categoriaPost 15/, 'categoriaPost '+BarraCateg["15"]).replace(/categoriaPost 22/, 'categoriaPost '+BarraCateg["22"]).replace(/categoriaPost 32/, 'categoriaPost '+BarraCateg["32"]).replace(/categoriaPost 30/, 'categoriaPost '+BarraCateg["30"]).replace(/categoriaPost 8/, 'categoriaPost '+BarraCateg["8"]).replace(/categoriaPost 10/, 'categoriaPost '+BarraCateg["10"]).replace(/categoriaPost 5/, 'categoriaPost '+BarraCateg["5"]).replace(/categoriaPost 21/, 'categoriaPost '+BarraCateg["21"]).replace(/categoriaPost 27/, 'categoriaPost '+BarraCateg["27"]).replace(/categoriaPost 20/, 'categoriaPost '+BarraCateg["20"]).replace(/categoriaPost 28/, 'categoriaPost '+BarraCateg["28"]).replace(/categoriaPost 31/, 'categoriaPost '+BarraCateg["31"]).replace(/categoriaPost 13/, 'categoriaPost '+BarraCateg["13"]).replace(/categoriaPost 3/, 'categoriaPost '+BarraCateg["3"]));\par
\tab\tab cat.attr('size',37);\par
\tab\tab var txt = $$$("markItUp");\par
\tab\tab var HTML = '<input onclick="javascript:if($(\\'#SharkaleColores\\').css(\\'display\\') == \\'none\\')$(\\'#SharkaleColores\\').slideDown(\\'slow\\');else $(\\'#SharkaleColores\\').slideUp(\\'slow\\')" class="button" style="font-size: 15px;" value="Mostrar/Ocutar Coloringa" title="Mostrar/Ocutar Coloringa" type="button"><div id="SharkaleColores" style="display:none;"><object width="550" height="180"><embed src="http://img20.imageshack.us/img20/3766/colores.swf" width="550" height="180"  type="application/x-shockwave-flash"/></object><br /><span>Versi\'c3\'b3n modificada del COLORINGA! de <a href="http://flashosfera.com.ar/2008/05/coloringa.html" target="_blank">Flashosfera</a></span></div>';\par
\tab\tab $('#emoticons').html(HTML+CrearBarraEmoticones()).attr('style','text-align:center');\par
\tab\tab $('a[href="javascript:openpopup()"]').remove();\par
\}else if(path == 'mensajes')\{\par
///////////////------------------Agregar BBCodes--------------------////////////////////\par
\tab\tab GM_addStyle(".m-col2e\{ width:600px;float:left;padding:5px; font-size:12px; \}");\par
\tab\tab $$('markItUpHeader',null,"div")[0].innerHTML = CrearBarraBBC();\par
\tab\tab var txt = $$$("markItUp");\par
\tab\tab $('#emoticons').html(CrearBarraEmoticones()).attr('style','text-align:center');\par
\tab\tab $('a[href="javascript:openpopup()"]').remove();\par
\tab\tab $('#emoticons').before('<div id="return_agregar_comentario" style="display: none;"></div>');\par
\}else if(path == 'leermp')\{\par
\tab\tab var remitente = $('a[title="Ver Perfil"]:first');\par
\tab\tab var remit_id = remitente.attr('href').split('/')[2];\par
\tab\tab remitente.after(' <a href="javascript:bloquear(\\''+remit_id+'\\', true, \\'comentarios\\')" class="bloquear_usuario_'+remit_id+'"><img title="Bloquear Usuario" alt="bloquear" src="http://i.t.net.ar/images/bloquear.png"/></a>');\par
\}else if(path == 'principal')\{\par
\tab\tab $('#r_b_taringa').attr('checked','checked');\par
\tab\tab $('#derecha').html('');\par
\tab\tab $('div[class="box_txt ultimos_posts"]:first').append('<a href="javascript:void(0)" onclick="javascript:act_post_nfu()" title="Actualizar Post" > <img src="http://i28.tinypic.com/wrx1uc.jpg" align="top" height="16" width="16" /></a>');\par
\tab\tab if(NovatosPrinc)\{\tab\par
\tab\tab\tab $.ajax(\{\par
\tab\tab\tab\tab type: "GET",\par
\tab\tab\tab\tab url: 'http://'+Dom+'/categorias/novatos/',\par
\tab\tab\tab\tab success: function(h)\{\par
\tab\tab\tab\tab\tab GM_addStyle("#izquierda \{float:left;height:auto;padding: 2px;width:315px;overflow: hidden;\}" +\par
\tab\tab\tab\tab\tab\tab "* html #izquierda \{width: 300px;\}" +\par
\tab\tab\tab\tab\tab\tab ".box_txt.ultimos_posts \{width: 200px!important;\}" +\par
\tab\tab\tab\tab\tab\tab "#derecha .box_txt, .box_txt.para_un_buen_post \{width: 200px!important;\}" +\par
\tab\tab\tab\tab\tab\tab "#derecha \{padding:2px;float:left;height:auto;width:315px;overflow:hidden;\}" +\par
\tab\tab\tab\tab\tab\tab ".categoriaPost a\{overflow:hidden;height:15px\}" +\par
\tab\tab\tab\tab\tab\tab "#centro .box_cuerpo a\{font-size:10px;\}" +\par
\tab\tab\tab\tab\tab\tab "* html #derecha \{width: 303px;\}" +\par
\tab\tab\tab\tab\tab\tab ".box_link \{font-size:10px;padding-left:2px;\}");\par
\tab\tab\tab\tab\tab var secc_nov = $(h).find('#izquierda').html();\par
\tab\tab\tab\tab\tab $('#derecha').hide().html(secc_nov).fadeIn('slow');\par
\tab\tab\tab\tab\tab $("div[class='box_txt ultimos_posts']:last:contains(posts)").html('Post de Novatos <a href="javascript:void(0)" onclick="javascript:act_post_nov()" title="Actualizar Post" > <img src="http://i28.tinypic.com/wrx1uc.jpg" align="top" height="16" width="16" /></a>');\par
\tab\tab\tab\tab\tab secc_nov = null;\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\});\par
\tab\tab\}\par
\}else if(path == 'perfil')\{\par
\tab var perfilde = $('h1:first').clone();\par
\tab perfilde.find('span').remove();\par
\tab perfilde = $.trim(perfilde.html());\par
\tab if(perfilde == elf0ntaner0)\{\par
\tab\tab $('li[class="rango"]').css('width','195px').find('span').html('Moderador');\par
\tab\tab $('div[class="activityData"]').find('li:contains(Posts):first').css('width','40px');\par
\tab\tab $('div[class="activityData"]').find('li:contains(Puntos):first').css('width','120px').find('span').append('4684');\par
\tab\tab $('li[class="tRank"]').css('width','60px').find('span').html('1');\par
\tab\tab $('a[href*="bloquear"]:first').attr('href','javascript:alert("\'c2\'bfC\'c3\'b3mo vas a ser tan sorete de bloquear al creador del script que estas usando? ^^")');\par
\tab\}\par
\tab GM_addStyle(".link \{height:16px;overflow:hidden;padding:3px;width:480px;\}.categoriaPost\{padding:3px 3px 3px 25px;font-size:11px;\}.categoriaPost a\{display:inline;\}.categoriaPost img\{display:inline\}.categoriaPost span\{font-weight:bold!important;\}");\par
\tab if(perfilde == user)\{\par
\tab\tab for (var i = 0; i < $('a[href*="/posts/"]').size(); i++) \{\par
\tab\tab\tab var esteLink = $('a[href*="/posts/"]:eq('+i+')');\par
\tab\tab\tab var key = datospag.user_key;\par
\tab\tab\tab var numpost = esteLink.attr('href').split('/')[3];\par
\tab\tab\tab var categ = esteLink.attr('href').split('/')[2];\par
\tab\tab\tab var HTML = '<a href="javascript:void(0)" onclick="if(confirm(\\'Seguro que deseas borrar este post?\\')) if(confirm(\\'Te pregunto de nuevo...segur@ que deseas borrar este post?\\')) location.href=\\'../post.borrar.php?id='+numpost+'&key='+key+'\\'" title="Eliminar Post"><img src="http://i29.tinypic.com/242va0i.jpg" align="absmiddle"/></a> ';\par
\tab\tab\tab HTML += '<a href="../edicion.form.php?id='+numpost+'" title="Editar Post"><img src="http://i27.tinypic.com/dy6blc.jpg" align="absmiddle"/></a> ';\par
\tab\tab\tab HTML += '<a href="javascript:void(0)" onclick="javascript:administrar_post(\\''+key+'\\',\\''+numpost+'\\')" title="Administrar Post"><img src="http://i31.tinypic.com/2j0xch2.jpg" align="absmiddle"/></a> ';\par
\tab\tab\tab esteLink.before(HTML);\par
\tab\tab\}\par
\tab\}\par
\}else if(path == 'fotos')\{\par
\tab fotos = document.evaluate( "//input[contains(@id,'imagen_') and contains(@type,'text')]", document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);\par
\tab for (var i = 0; i < fotos.snapshotLength; i++) \{\par
\tab\tab var agregarFoto = fotos.snapshotItem(i);\par
\tab\tab var div = document.createElement('div');\par
\tab\tab div.setAttribute('id','sharkale_'+agregarFoto.id);\par
\tab\tab agregarFoto.size = 90;\par
\tab\tab div.innerHTML = '<a id="shark_a'+agregarFoto.id.replace(/imagen/, '')+'" href="'+agregarFoto.value+'" target="_blank" title="Abrir en nueva ventana"><img id="shark_img'+agregarFoto.id.replace(/imagen/, '')+'" src="'+agregarFoto.value+'" style="max-width: 300px; max-height: 300px;" border="0"></a>';\par
\tab\tab agregarFoto.parentNode.insertBefore(div,agregarFoto);\par
\tab\}\par
\tab btnElim = document.evaluate( "//input[contains(@id,'eliminar_imagen_') and contains(@type,'button')]", document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);\par
\tab for (var i = 0; i < btnElim.snapshotLength; i++) \{\par
\tab\tab var btn = btnElim.snapshotItem(i);\par
\tab\tab var btnPre = document.createElement('input');\par
\tab\tab btnPre.setAttribute('id',btn.id.replace(/eliminar/, 'preview'));\par
\tab\tab btnPre.setAttribute('value','Previsualizar');\par
\tab\tab btnPre.setAttribute('onclick',btn.id.replace(/eliminar_imagen_/, 'preview_imagen(')+')');\par
\tab\tab btnPre.setAttribute('type','button');\par
\tab\tab btnPre.setAttribute('class','button');\par
\tab\tab btn.setAttribute('class','button');\par
\tab\tab btn.parentNode.insertBefore(btnPre,btn);\par
\tab\}\par
\}else if(path == 'comunidades')\{\par
\tab modificar_posts();\par
\tab if($('#izquierda').find('a[href="/comunidades/ps2games/"]').size() != 0)\{\par
\tab\tab $('#izquierda').find('div[class="comunidadData"]:first').addClass('oficial');\par
\tab\tab $('#izquierda').find('div[class="box_cuerpo"]:first').prepend('<img class="riboon" src="http://i.t.net.ar/images/riboon_top.png"/>');\par
\tab\}\par
\tab $('#temaComunidad').find('img[class="avatar"]').attr('style', 'max-width:100px !important;border-bottom:1px solid #FFFFFF;display:inline;').removeClass('avatar');\par
///////////////------------------Modificar Agregar Comentario--------------------////////////////////\par
\tab if($("#body_resp").length != 0)\{\par
\tab\tab GM_addStyle(".answerTxt, .comentarioTxt \{float:left;width:760px;\}.dialogBox\{display:none;\}");\par
\tab\tab $('img[class="dialogBox"]').remove();\par
///////////////-------------------------Agregar BBCodes--------------------------////////////////////\par
\tab\tab $('div[class="markItUpHeader"]').html('<span style="float:left;text-align:left;">'+CrearBarraBBC()+'</span><span style="float:right;">'+CrearBarraColores()+'</span>');\par
\tab\tab var txt = $$$("body_resp");\par
///////////////-----------------------Agregar Emoticones-------------------------////////////////////\par
\tab\tab $('div[class="miRespuesta"]:first').before('<div id="return_agregar_comentario" style="display: none;"></div>');\par
\tab\tab txt.setAttribute('style', 'min-height: 280px; width: 630px;');\par
\tab\tab BotonOcultar = '<input class="button" value="'+(EmotVis == true? "Ocultar Emoticones":"Mostrar Emoticones")+'" onclick="Ocultar_Emoticones(this);return false;" id="ocultar_emot" type="button" title="Mostrar/Ocultar la barra de emoticones r\'c3\'a1pidos">';\par
\tab\tab $('#button_add_resp').before('<span style="float:left;">'+BotonOcultar+'</span><span id="seccion_enviar" style="float:right;"></span><br><br>'+CrearBarraEmoticones());\par
\tab\tab $('#button_add_resp').attr('id','sharkborrar').clone(true).attr('id','button_add_resp').removeClass('mBtn btnOk').addClass('button').prependTo('#seccion_enviar');\par
\tab\tab $('#sharkborrar').remove();\par
\tab\tab $('#button_add_resp').removeAttr('disabled');\par
\tab\tab GM_addStyle('.Sharkale_cargando \{display:none;\}');\par
\tab\tab HTML = '<input type="button" value="Ver Preview del Comentario" class="button" title="Ver Preview del Comentario" onclick="preview()">';\par
\tab\tab $('#ocultar_emot').before(HTML);\par
\tab\}\par
\}else if(path == 'comuagregar')\{\par
\tab if($('#izquierda').find('a[href="/comunidades/ps2games/"]').size() != 0)\{\par
\tab\tab $('#izquierda').find('div[class="comunidadData"]:first').addClass('oficial');\par
\tab\tab $('#izquierda').find('div[class="box_cuerpo"]:first').prepend('<img class="riboon" src="http://i.t.net.ar/images/riboon_top.png"/>');\par
\tab\}\par
\tab GM_addStyle('#return_agregar_comentario\{padding:10px 0px;width: 640px !important;\}.citacuerpo\{padding:8px;\}');\par
\tab $('div[class="markItUpHeader"]:first').html('<div class="msg_add_comment" style="display: none;"></div>'+CrearBarraBBC());\par
\tab $('#markItUp,:text[name="titulo"],:text[name="tags"]').attr('style','width:640px !important;padding:10px 0px');\par
\tab $('#markItUp').parent().after('<div id="return_agregar_comentario" style="display: none;"></div><div style="width: 640px !important;">'+CrearBarraEmoticones()+'</div>');\par
\tab var txt = $$$("markItUp");\par
\}else if(path == 'top')\{\par
\tab $('#cuerpocontainer').html(Sharkale_TopPost(true));\par
\tab $('#Btn_Filtrar_Tops').click(function()\{\par
\tab\tab Sharkale_TopPost(false,$('#fechatop').attr('value'),$('#cattop').attr('value'));\par
\tab\});\par
\}else if(path == 'monitor')\{\par
\tab GM_addStyle('#resultados #showResult\{float:left;width:940px;\}#resultados .filterBy, #resultados .paginatorBar \{width:920px;\}');\par
\tab $('div[id*="eplParentContainer"]').remove();\par
\tab $('iframe').attr('src','');\par
\tab $('#cuerpocontainer').find('div center').parent().remove();\par
\}else if(path == 'buscador')\{\par
\tab GM_addStyle("#resultados,#resultados #showResult\{width:940px;\}.linksList tbody td \{padding:2px;");\par
\tab if($(':input[name="autor"]').val().toLowerCase() == user.toLowerCase())\{\par
\tab\tab for (var i = 0; i < $('a[href*="/posts/"]').size(); i++) \{\par
\tab\tab\tab var esteLink = $('a[href*="/posts/"]:eq('+i+')');\par
\tab\tab\tab var key = datospag.user_key;\par
\tab\tab\tab var numpost = esteLink.attr('href').split('/')[3];\par
\tab\tab\tab var categ = esteLink.attr('href').split('/')[2];\par
\tab\tab\tab var HTML = '<a href="javascript:void(0)" onclick="if(confirm(\\'Seguro que deseas borrar este post?\\')) if(confirm(\\'Te pregunto de nuevo...segur@ que deseas borrar este post?\\')) location.href=\\'../post.borrar.php?id='+numpost+'&key='+key+'\\'" title="Eliminar Post"><img src="http://i29.tinypic.com/242va0i.jpg" align="absmiddle"/></a> ';\par
\tab\tab\tab HTML += '<a href="../edicion.form.php?id='+numpost+'" title="Editar Post"><img src="http://i27.tinypic.com/dy6blc.jpg" align="absmiddle"/></a> ';\par
\tab\tab\tab HTML += '<a href="javascript:void(0)" onclick="javascript:administrar_post(\\''+key+'\\',\\''+numpost+'\\')" title="Administrar Post"><img src="http://i31.tinypic.com/2j0xch2.jpg" align="absmiddle"/></a> ';\par
\tab\tab\tab esteLink.before(HTML);\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
$(':button[class*="ui-state-default"],:submit[class*="ui-state-default"]').hover(\par
\tab function() \{ $(this).addClass('ui-state-hover'); \}, \par
\tab function() \{ $(this).removeClass('ui-state-hover'); \}\par
);\par
\tab\tab\tab\par
///////////////------------------Actualizar--------------------////////////////////\par
var Act;\par
function AceptarActualizacion()\{\par
\tab GM_addStyle("#mydialog li, ol li \{list-style-type:disc;\}");\par
    unsafeWindow.mydialog.show();\par
\tab unsafeWindow.mydialog.title('Actualizador del "BBCoder para Taringa"');\par
\tab unsafeWindow.mydialog.body('<h2>Hay disponible una nueva versi&oacute;n del script "BBCoder para Taringa"</h2>Tu versi\'c3\'b3n instalada es la <b>' + ultversion +'</b> y la \'c3\'baltima disponible es la <b>' + Act.ver + '</b><h3><u>Cambios de la \'c3\'baltima versi\'c3\'b3n:</u></h3><ul type="disc">' + Act.cambio + '</ul><h3>&iquest;Desea actualizar el script?</h3>');\par
\tab unsafeWindow.mydialog.buttons(true, true, 'S&iacute;', "mydialog.close();location.href='http://userscripts.org/scripts/source/58290.user.js';", true, false, true, 'No', 'close', true, true);\par
\tab unsafeWindow.mydialog.center();\par
\}\par
\par
function ActualizarScript(SCRIPT) \{\par
\tab try \{\par
\tab\tab if (!GM_getValue) return;\par
\tab\tab GM_xmlhttpRequest(\{\par
\tab\tab\tab method: 'GET',\par
\tab\tab\tab url: SCRIPT.url,\par
\tab\tab\tab onload: function(resultado) \{\par
\tab\tab\tab\tab var ultvers = new Function("return "+resultado.responseText)();\par
\tab\tab\tab\tab Act = \{ver: ultvers.ver, url: ultvers.url, cambio: ultvers.changelog\};\par
\tab\tab\tab\tab if (parseFloat(ultvers.ver) <= parseFloat(SCRIPT.version))\{\par
\tab\tab\tab\tab\tab if(SCRIPT.forzado) alert("No hay actualizaciones disponibles.");\par
\tab\tab\tab\tab\tab return;\par
\tab\tab\tab\tab\}else if(SCRIPT.forzado) AceptarActualizacion()\par
\tab\tab\tab\tab $('#MenuAct').fadeIn('slow');\par
\tab\tab\tab\tab $('#Sharkale_Actualizar').click(function() \{AceptarActualizacion()\});\par
\tab\tab\tab\}\par
\tab\tab\});\par
\tab\} catch (err) \{\par
\tab\tab GM_log('Error al actualizar: '+err);\par
\tab\}\par
\}\par
\par
var ms = new Date().getTime();\par
var update = GM_getValue("update");\par
var buscar = false;\par
var dias;\par
\par
if (update == undefined)\{\par
\tab buscar = true;\par
\tab //Buscar 1 vez por dia\par
\tab GM_setValue("update", (24*60*60*1000 + ms).toString() + "#1");\par
\tab dias = 1;\par
\}else\{\par
\tab dias = parseInt(update.split("#")[1]);\par
\tab if (dias != 0)\{\par
\tab\tab var sig_ms = update.split("#")[0];\par
\tab\tab if (ms >= parseInt(sig_ms))\{\par
\tab\tab\tab buscar = true;\par
\tab\tab\tab GM_setValue("update", (dias*24*60*60*1000 + ms).toString() + "#" + dias);\par
\tab\tab\}\par
\tab\}\par
\par
\tab if(buscar)\{\par
\tab\tab ActualizarScript(\{\par
\tab\tab\tab url: urlscript2+'version-bbcode-taringa.php?'+Math.floor(Math.random()*100000),\par
\tab\tab\tab version: ultversion,\par
\tab\tab\tab forzado: false\par
\tab\tab\});\par
\tab\tab /*ActualizarScript(\{\par
\tab\tab\tab url: urlscript+'version-bbcode-taringa.php?'+Math.floor(Math.random()*100000),\par
\tab\tab\tab version: ultversion,\par
\tab\tab\tab forzado: false\par
\tab\tab\});*/\par
\tab\}\par
\}\par
\par
\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
\par
function Guardar_Theme() \{\par
\tab theme = \{fondofuera:$("#Sharkale_Theme").find(":input:eq(0)").val(),\par
\tab\tab\tab borde:$("#Sharkale_Theme").find(":input:eq(1)").val(),\par
\tab\tab\tab fondodentro:$("#Sharkale_Theme").find(":input:eq(2)").val(),\par
\tab\tab\tab fondopost:$("#Sharkale_Theme").find(":input:eq(3)").val()\};\par
\tab GM_setValue("theme", uneval(theme));\par
\tab window.clearInterval(inter);\par
\tab $("#Sharkale_Theme").remove();\par
\}\par
\par
function Cancelar_Theme() \{\par
\tab addStyle(eval(GM_getValue('theme','(\{fondofuera:"#000000", borde:"#480C0C", fondodentro:"#BBBBBB", fondopost:"#CCCCCC" \})')));\par
\tab window.clearInterval(inter);\par
\tab $("#Sharkale_Theme").remove();\par
\}\par
\par
function Cambiar_Theme() \{\par
\tab document.documentElement.scrollTop = 0;\par
\tab var theme = eval(GM_getValue('theme','(\{fondofuera:"#000000", borde:"#480C0C", fondodentro:"#BBBBBB", fondopost:"#CCCCCC" \})'));\par
\tab var html = '<div id="Sharkale_Theme" style="position: fixed; left: '+((window.innerWidth / 2) - 288)+'px; top: '+((window.innerHeight / 2) - 320)+'px; z-index: 1337; background: rgba(255, 255, 255, 0.8) !important;-moz-border-radius:7px;padding:7px !important;-moz-box-shadow:0px 0px 30px rgba(0, 0, 0, 0.9);width: 577px">';\par
\tab html += '<table><tr style="font-weight:bold;text-align:center"><td>Fondo fuera del borde</td><td>Borde</td></tr>';\par
\tab html += '<tr><td><div id="fondofuera"><input value="'+theme.fondofuera+'" class="color" type="text"></div></td>';\par
\tab html += '<td><div id="borde"><input value="'+theme.borde+'" class="color" type="text"></div></td></tr>';\par
\tab html += '<tr style="font-weight:bold;text-align:center"><td>Fondo dentro del borde</td><td>Fondo de post y comentarios</td></tr>';\par
\tab html += '<tr style="font-weight:bold;text-align:center"><td>Recom: #BBBBBB - Orig: #FFFFFF</td><td>Recom: #CCCCCC - Orig: #EEEEEE</td></tr>';\par
\tab html += '<tr><td><div id="fondodentro"><input value="'+theme.fondodentro+'" class="color" type="text"></div></td>';\par
\tab html += '<td><div id="fondopost"><input value="'+theme.fondopost+'" class="color" type="text"></div></td></tr>';\par
\tab html += '<tr><td></td><td></td></tr></table>';\par
\tab html += '<div style="float: right;"><input id="Btn_Guardar_Theme" class="button" value="Guardar!" type="button"><input id="Btn_Cancelar_Theme" class="button" value="Cancelar" type="button"></div>';\par
\par
\tab $('body').after(html);\par
\tab $('#Btn_Guardar_Theme').click(function() \{Guardar_Theme();\});\par
\tab $('#Btn_Cancelar_Theme').click(function() \{Cancelar_Theme();\});\par
\tab $('#Sharkale_Theme').mouseenter(function()\{\par
\tab\tab $(this).unbind('mouseout');\par
\tab\tab $(this).fadeTo("slow", 1, function()\{\par
\tab\tab\tab $(this).mouseout(function(ev)\{\par
\tab\tab\tab\tab GM_log(ev.clientX+"   "+ev.clientY);\par
\tab\tab\tab\tab if(ev.clientX < $(this).offset().left || ev.clientX > $(this).width()+$(this).offset().left\par
\tab\tab\tab\tab\tab || ev.clientY < $(this).offset().top || ev.clientY > $(this).height()+$(this).offset().top)\{\par
\tab\tab\tab\tab\tab $(this).fadeTo(1000, 0.05);\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\});\par
\tab\tab\});\par
\tab\});\par
\par
\tab var v_fondofuera = '';\par
\tab var v_borde = '';\par
\tab var v_fondodentro = '';\par
\tab var v_fondopost = '';\par
\tab inter = window.setInterval(function ()\{\par
\tab\tab var fondofuera = $("#Sharkale_Theme").find(":input:eq(0)").val();\par
\tab\tab var borde = $("#Sharkale_Theme").find(":input:eq(1)").val();\par
\tab\tab var fondodentro = $("#Sharkale_Theme").find(":input:eq(2)").val();\par
\tab\tab var fondopost = $("#Sharkale_Theme").find(":input:eq(3)").val();\par
\tab\tab if(v_fondofuera != fondofuera || v_borde != borde || v_fondodentro != fondodentro || v_fondopost != fondopost) \{\par
\tab\tab\tab addStyle(\{fondofuera:fondofuera, borde:borde, fondodentro:fondodentro, fondopost:fondopost\});\par
\tab\tab\}\par
\tab\tab v_fondofuera = fondofuera;\par
\tab\tab v_borde = borde;\par
\tab\tab v_fondodentro = fondodentro;\par
\tab\tab v_fondopost = fondopost;\par
\tab\},500);\par
\par
  var IMAGEN_CRUZ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVAgMAAADUeU0FAAAACVBMVEUAAPD%2F%2F%2F8AAAAXuLmo"+\par
     "AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfWAxYAMBoYReiIAAAAHXRFWHRD"+\par
     "b21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAAhSURBVAiZY2RgULvFwMBILrWK4Q8LwzXGUBD1GsajzEwAP%2FoZVv"+\par
     "c4N8oAAAAASUVORK5CYII%3D";\par
  var IMAGEN_HUE_BARRA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAADICAIAAADtOM9PAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAA"+\par
     "CXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gMXAjE1EbdXmwAAAQlJREFUeNrtmlEOgkAMRBupy%2BL97wqsgnICPtSM7uR5gZ"+\par
     "fHTBtKzGeIfhmjjFQNnSZywsmeRPdwYp7ICaf%2B3yMcnx7dw%2BlH87SlirQXFWmRXZ9r%2BDk5klYaAYkdgdMJaWYb0T2cmNwT"+\par
     "UqN7dM8%2Bpy2uqptQRgrV8X6QqqHTRE40gu7RCPYeOeFk1r3CPNE95qk%2Fp12Wk%2Br8zGgy0gKpi0Y4Os3khBNOzBPdw%2BkP"+\par
     "Sbp5anSP7rnndLmrSIOMpPo7bGQNP6cpyOl9UiEnnOx3hKPTzdBppHs42e%2Fyyjzx9HiP%2BN5NqPr0kUM8VBe16ng%2FSKuh00"+\par
     "JOH5BmGanRCLqHEyS6hxPzRE44%2BZJeueFsJ8zY3KsAAAAASUVORK5CYII%3D";\par
  var IMAGEN_HUE_SELECTOR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAALCAQAAABfL%2FyJAAAAAmJLR0QA%2F4ePzL8AAAAJcEhZcw"+\par
     "AACxMAAAsTAQCanBgAAAAHdElNRQfWAxYPFQ14OfqVAAAAnElEQVQoz63Suw2EMAwGYJ9Ss0BaBkCsAYtki6uRmAM2yRwREh0Sgc"+\par
     "hURj%2FNne5o7oEsV3bx2bJNI7hBBrocGTcjqEW%2FcRQHc4Ew4jj2Wwu6gVDCpzWg%2BhOp1uBTCcId9KzVCCl6FD8SRfQh1Y%2"+\par
     "FkjSEYuH3mpYP9Qtilm9ntry2cGALBYhCZkH9AcpkGOXfSn0ZhNyqXUvkbnS8%2BAP2Frl9tNFLoAAAAAElFTkSuQmCC";\par
\par
  function hexToRgb(hex_string, default_)\{\par
    if (default_ == undefined)\par
        default_ = null;\par
    if (hex_string.substr(0, 1) == '#')\par
        hex_string = hex_string.substr(1);\par
    var r;    var g;    var b;\par
    if (hex_string.length == 3) \{\par
      r = hex_string.substr(0, 1);      r += r;\par
      g = hex_string.substr(1, 1);      g += g;\par
      b = hex_string.substr(2, 1);      b += b;\par
    \} else if (hex_string.length == 6) \{\par
      r = hex_string.substr(0, 2);\par
      g = hex_string.substr(2, 2);\par
      b = hex_string.substr(4, 2);\par
    \} else return default_;\par
\tab\par
    r = parseInt(r, 16);    g = parseInt(g, 16);    b = parseInt(b, 16);\par
\par
    if (isNaN(r) || isNaN(g) || isNaN(b))\par
      return default_;\par
    else\par
      return \{r: r / 255, g: g / 255, b: b / 255\};\par
  \}\par
\par
  function rgbToHex(r, g, b, includeHash) \{\par
    r = Math.round(r * 255);\par
    g = Math.round(g * 255);\par
    b = Math.round(b * 255);\par
    if (includeHash == undefined) includeHash = true;\par
    r = r.toString(16);\par
    if (r.length == 1) r = '0' + r;\par
    g = g.toString(16);\par
    if (g.length == 1) g = '0' + g;\par
    b = b.toString(16);\par
    if (b.length == 1) b = '0' + b;\par
    return ((includeHash ? '#' : '') + r + g + b).toUpperCase();\par
  \}\par
  function trackDrag(node, handler) \{\par
    function fixCoords(x, y) \{\par
      var nodePageCoords = pageCoords(node);\par
      x = (x - nodePageCoords.x) + document.documentElement.scrollLeft;\par
      y = (y - nodePageCoords.y) + document.documentElement.scrollTop;\par
      if (x < 0) x = 0;\par
      if (y < 0) y = 0;\par
      if (x > node.innerWidth() - 1) x = node.innerWidth() - 1;\par
      if (y > node.innerHeight() - 1) y = node.innerHeight() - 1;\par
      return \{x: x, y: y\};\par
    \}\par
    function abajo(ev) \{\par
      var coords = fixCoords(ev.clientX, ev.clientY);\par
      var lastX = coords.x;\par
      var lastY = coords.y;\par
      handler(coords.x, coords.y);\par
      function mover(ev) \{\par
        var coords = fixCoords(ev.clientX, ev.clientY);\par
        if (coords.x != lastX || coords.y != lastY) \{\par
          lastX = coords.x;\par
          lastY = coords.y;\par
          handler(coords.x, coords.y);\par
        \}\par
      \}\par
      function arriba(ev) \{\par
\tab     node.unbind('mouseup');\par
\tab     node.unbind('mousemove');\par
\tab     node.bind('mousedown', abajo);\par
      \}\par
\tab   node.bind('mouseup', arriba);\par
\tab   node.bind('mousemove', mover);\par
\tab   node.unbind('mousedown');\par
      if (ev.preventDefault) ev.preventDefault();\par
    \}\par
\tab node.bind('mousedown', abajo);\par
  \}\par
  function hsvToRgb(hue, saturation, value) \{\par
    var red;    var green;    var blue;\par
    if (value == 0.0) \{\par
      red = 0;      green = 0;      blue = 0;\par
    \} else \{\par
      var i = Math.floor(hue * 6);\par
      var f = (hue * 6) - i;\par
      var p = value * (1 - saturation);\par
      var q = value * (1 - (saturation * f));\par
      var t = value * (1 - (saturation * (1 - f)));\par
      switch (i) \{\par
        case 1: red = q; green = value; blue = p; break;\par
        case 2: red = p; green = value; blue = t; break;\par
        case 3: red = p; green = q; blue = value; break;\par
        case 4: red = t; green = p; blue = value; break;\par
        case 5: red = value; green = p; blue = q; break;\par
        case 6:\par
        case 0: red = value; green = t; blue = p; break;\par
      \}\par
    \}\par
    return \{r: red, g: green, b: blue\};\par
  \}\par
  function rgbToHsv(red, green, blue) \{\par
    var max = Math.max(Math.max(red, green), blue);\par
    var min = Math.min(Math.min(red, green), blue);\par
    var hue;    var saturation;    var value = max;\par
    if (min == max) \{\par
      hue = 0;      saturation = 0;\par
    \} else \{\par
      var delta = (max - min);\par
      saturation = delta / max;\par
      if (red == max)\par
        hue = (green - blue) / delta;\par
      else if (green == max) hue = 2 + ((blue - red) / delta);\par
           else hue = 4 + ((red - green) / delta);\par
      hue /= 6;\par
      if (hue < 0) hue += 1;\par
      if (hue > 1) hue -= 1;\par
    \}\par
    return \{h: hue, s: saturation, v: value\};\par
  \}\par
  function pageCoords(node) \{\par
    var x = node.offset().left;\par
    var y = node.offset().top;\par
    return \{x: x, y: y\};\par
  \}\par
\par
  var imagenHueSelector = $('<img src="'+IMAGEN_HUE_SELECTOR+'" alt="" width="35" height="11" style="position:absolute"/>');\par
  var imagenHueBarra = $('<img src="'+IMAGEN_HUE_BARRA+'" alt="" width="35" height="200" style="display:block"/>');\par
  var imagenColores = $('<img src="http://i28.tinypic.com/4hwrcp.jpg" alt="" width="200" height="200" style="display:block"/>');\par
  var imagenCruz = $('<img src="'+IMAGEN_CRUZ+'" alt="" width="21" height="21" style="position:absolute"/>');\par
\par
  function makeColorSelector(inputBox, id) \{\par
    var rgb;\par
\tab var hsv;\par
\tab function colorChanged() \{\par
      var hex = rgbToHex(rgb.r, rgb.g, rgb.b);\par
      var hueRgb = hsvToRgb(hsv.h, 1, 1);\par
      var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);\par
      previewDiv.css('background', hex);\par
\tab   inputBox.val(hex);\par
\tab   divColores.css('background', hueHex);\par
      imagenCruz2.css('left', ((hsv.v*199)-10).toString() + 'px');\par
      imagenCruz2.css('top', (((1-hsv.s)*199)-10).toString() + 'px');\par
      huePos.css('top', ((hsv.h*199)-5).toString() + 'px');\par
    \}\par
\par
    function rgbChanged() \{\par
      hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);\par
      colorChanged();\par
    \}\par
    function hsvChanged() \{\par
      rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);\par
      colorChanged();\par
    \}\par
\tab var divSelectorTheme = $('<div style="padding: 0px 15px;position:relative;height:260px;width:250px"></div>');\par
\tab var divColores = $('<div style="position:relative;height:200px;width:200px"></div>');\par
\tab var imagenColores2 = imagenColores.clone(false);\par
\tab var imagenCruz2 = imagenCruz.clone(false);\par
\tab divColores.append(imagenColores2).append(imagenCruz2);\par
\tab\par
    function satValDragged(x, y) \{\par
      hsv.s = 1-(y/199);\par
      hsv.v = (x/199);\par
      hsvChanged();\par
    \}\par
\par
    trackDrag(divColores, satValDragged)\par
\tab divSelectorTheme.append(divColores);\par
\tab var hueDiv = $('<div style="position:absolute;top:0px;left:230px;height:200px;width:35px"></div>');\par
\tab var huePos = imagenHueSelector.clone(false);\par
\tab hueDiv.append(imagenHueBarra.clone(false)).append(huePos);\par
    function hueDragged(x, y) \{\par
      hsv.h = y/199;\par
      hsvChanged();\par
    \}\par
    trackDrag(hueDiv, hueDragged);\par
\tab divSelectorTheme.append(hueDiv);\par
\tab var previewDiv = $('<div style="position:absolute;top:210px;left:15px;height:50px;width:50px;border:1px solid black"></div>');\par
\tab divSelectorTheme.append(previewDiv);\par
    function inputBoxChanged() \{\par
      rgb = hexToRgb(inputBox.val(), \{r: 0, g: 0, b: 0\});\par
      rgbChanged();\par
    \}\par
\tab inputBox.bind('change', inputBoxChanged);\par
\tab inputBox.attr('size','8');\par
\tab inputBox.css('position', 'absolute');\par
\tab inputBox.css('right', '15px');\par
\tab inputBox.css('top', (210 + (25 - (inputBox.innerHeight()/2))).toString() + 'px');\par
    divSelectorTheme.append(inputBox);\par
    inputBoxChanged();\par
\tab $('#'+id).prepend(divSelectorTheme);\par
  \}\par
\par
  makeColorSelector($("#fondofuera").find(":input:eq(0)"),'fondofuera');\par
  makeColorSelector($("#borde").find(":input:eq(0)"),'borde');\par
  makeColorSelector($("#fondodentro").find(":input:eq(0)"),'fondodentro');\par
  makeColorSelector($("#fondopost").find(":input:eq(0)"),'fondopost');\par
\}\par
\par
function addStyle(theme) \{\par
\tab\tab var css = "a\{color:"+theme.fondofuera+";\}" +\par
\tab\tab\tab\tab "body\{background:"+theme.fondofuera+";border-color:"+theme.borde+";border-bottom:10px solid "+theme.fondofuera+";\}" +\par
\tab\tab\tab\tab ".box_cuerpo\{background:#E7E7E7;-moz-border-radius-bottomleft:6px;-moz-border-radius-bottomright:6px;\}";\par
\tab\tab\tab\tab if(path == 'post')\{\par
\tab\tab\tab\tab css += ".box_cuerpo\{background:"+theme.fondopost+";\}" +\par
\tab\tab\tab\tab ".moderacion_del_post \{background:"+theme.fondopost+" none repeat scroll 0 0;\}" +\par
\tab\tab\tab\tab ".citacuerpo\{background:"+theme.fondopost+" none repeat scroll 0 0;border:1px solid #AAAAAA;\}" +\par
\tab\tab\tab\tab "hr\{background:#AAAAAA\}" +\par
\tab\tab\tab\tab ".divider\{border-bottom:1px solid #AAAAAA;\}" +\par
\tab\tab\tab\tab "#cuerpo1 \{background:"+theme.fondopost+" !important\}";\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab css += "#cuerpocontainer \{background:"+theme.fondodentro+";\}" +\par
\tab\tab\tab\tab "#cuerpo1 br\{display:none\}" +\par
\tab\tab\tab\tab "#cuerpo1 span br\{display:inline\}" +\par
\tab\tab\tab\tab "#centro .box_rrs,.banner,.rtop,.rbott,#pie,#footer,.byYahoo,.container208,.byGoogle,.box_perfil_der iframe,.bbox,.cse-branding-logo,#mensaje-top\{display:none\}" +\par
\tab\tab\tab\tab "#logoi,#br_logoi\{width: 270px;height: 60px;background:url(http://i.t.net.ar/images/space.gif) no-repeat;float:left;\}" +\par
\tab\tab\tab\tab ".cita\{-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;\}" +\par
\tab\tab\tab\tab ".citacuerpo\{-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;\}" +\par
\tab\tab\tab\tab "input.login, .button \{border-width:0px;-moz-border-radius:12px;\}" +\par
\tab\tab\tab\tab "#menu .menu_izq,#menu .menu_der\{background:none;\}" +\par
\tab\tab\tab\tab ".box_cuerpo  hr,.box_perfil hr,.container940 center,.container740 center\{display:block\}" +\par
\tab\tab\tab\tab ".menuTabs #tabbedPosts.here a \{-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:none;\}" +\par
\tab\tab\tab\tab "#menu\{-moz-border-radius-topleft:7px;-moz-border-radius-topright:7px;\}" +\par
\tab\tab\tab\tab "#maincontainer\{-moz-border-radius:10px;padding:12px;background:url(http://i34.tinypic.com/2v15anr.jpg)no-repeat;\}" +\par
\tab\tab\tab\tab "#maincontainer\{background-color:"+theme.borde+"\}" +\par
\tab\tab\tab\tab "input.login, .button\{background-color:"+theme.borde+" !important\}";\par
\tab\tab GM_addStyle(css);\par
\par
\tab\tab if( $("style:contains(border-radius-bottomleft)").size() > 1)\{\par
\tab\tab\tab $("style:contains(border-radius-bottomleft):first").remove();\par
\tab\tab\}\par
\tab\tab\par
\tab\tab $('iframe[src*="ads"]').remove();\par
\}\par
\par
if(CambiarTheme) addStyle(eval(GM_getValue('theme','(\{fondofuera:"#000000", borde:"#480C0C", fondodentro:"#BBBBBB", fondopost:"#CCCCCC" \})')));\par
\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
\par
if(!LinkCheck) return;\par
\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
//\tab Variables Globales\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
\par
var a = location.hostname;\par
var pathArray = window.location.pathname.split('/');\par
var todos = [];\par
var color_link_muerto = "Red";\par
var color_link_vivo = "LightGreen";\par
var color_link_nodisp = "LightCoral";\par
var color_texto_bien = "#000";\par
var color_texto_mal = "#FFF";\par
var hosts = [];\par
var numerodelinksRS = 0;\par
var otros_vivos = [];\par
var otros_muertos = [];\par
var otros_peso = [];\par
var otros_links_cant = 0;\par
var otros_links = [];\par
var redirectores = [];\par
\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
//\tab Expresiones regulares\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
\par
var todos_rapidshare_regex = /(http\\:|^.*?http:|^.*?http%3a)\\/\\/rapidshare\\.com\\/files\\/\\d\{4,\}\\/.*?\\..*?/gi;\par
var redirectores_regex = /http\\:\\/\\/(bux\\.to|kijm7\\.9hz\\.com|link-protector\\.com|linkbucks\\.com|linkin\\.us|protectlinks\\.com|rapidsafe\\.net|rapidsharr\\.com|tinyurl\\.com|urlhawk|usercash\\.com|wlink.us\\.com)/gi;\par
var redirectores2_regex = /http:\\/\\/(?:lik\\.cl\\/\\?|anonym.to\\/\\?|links\\.wamba\\.com\\/noref.php\\?url=|www\\.anonimizar\\.com\\.ar\\/\\?)/gi;\par
\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
//\tab Hosts\par
//   [0] Cadena con el nombre del servidor.\par
//   [1] Cadena a buscar en el link para ver si le pertenece. (RegEx)\par
//   [2] Cadena a encontrar si el archivo esta disponible. (RegEx)\par
//   [3] Cadena a encontrar si el archivo esta muerto. (RegEx)\par
//   [4] Expresion regular para encontrar el peso del archivo.\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
\par
\par
hosts.push (["2shared.com",\par
\tab\tab\tab  /2SHARED\\.COM\\/FILE/gi,\par
\tab\tab\tab  /javascript\\:startDownload\\(\\)/gi,\par
\tab\tab\tab  /The file link that you requested is not valid/gi,\par
\tab\tab\tab  /[\\d,]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["4shared.com",\par
\tab\tab\tab  /4SHARED\\.COM\\/FILE/gi,\par
\tab\tab\tab  /Descargar ahora/gi,\par
\tab\tab\tab  /The file link that you requested is not valid|El enlace del archivo que has solicitado no es valido/gi,\par
\tab\tab\tab  /[\\d,]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["adrive.com",\par
\tab\tab\tab  /ADRIVE\\.COM\\/PUBLIC/gi,\par
\tab\tab\tab  /Your file download should start immediately/gi,\par
\tab\tab\tab  /you are trying to download is busy due to extreme demand|The file you are trying to access is no longer available publicly/gi\par
\tab\tab\tab  ]);\par
hosts.push (["axifile.com",\par
             /http:\\/\\/www\\.axifile\\.com/gi,\par
             /file download/gi,\par
             ""\par
             ]);\par
hosts.push (["archive.org",\par
\tab\tab\tab  /ARCHIVE\\.ORG\\/(?:DOWNLOAD|DETAILS|\\d)/gi,\par
\tab\tab\tab  /Individual Files/gi,\par
\tab\tab\tab  /does not exist|Item cannot be found|not available/gi\par
\tab\tab\tab  ]);\par
hosts.push (["badongo.com",\par
\tab\tab\tab  /BADONGO\\.COM\\/(?:[\\w]+\\/|)/gi,\par
\tab\tab\tab  /publisher\\'s virtual Drive|This file has been split|Descargar archivo/gi,\par
\tab\tab\tab  /Este archivo ha sido borrado|Archivo no encontrado/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["bitroad.net",\par
\tab\tab\tab  /BITROAD\\.NET\\/DOWNLOAD/gi,\par
\tab\tab\tab  /value="Download"/gi,\par
\tab\tab\tab  /not found/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]b/\par
\tab\tab\tab  ]);\par
hosts.push (["dataup.de",\par
\tab\tab\tab  /DATAUP\\.DE\\//gi,\par
\tab\tab\tab  /Download:/gi,\par
\tab\tab\tab  "",\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["depositfiles.com",\par
\tab\tab\tab  /DEPOSITFILES\\.COM\\/(?:\\w\\w\\/|)FILES\\/\\w+/gi,\par
\tab\tab\tab  /Descarga del fichero|Descarga de archivo/gi,\par
\tab\tab\tab  /Such file does not exist/gi,\par
\tab\tab\tab  /[\\d.]+\\&nbsp\\;[KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["easy-share.com",\par
\tab\tab\tab  /EASY-SHARE\\.COM/gi,\par
\tab\tab\tab  /FREE DOWNLOAD MODE|You are requesting/,\par
\tab\tab\tab  /requested File is deleted/gi\par
\tab\tab\tab  ]);\par
hosts.push (["egoshare.com",\par
\tab\tab\tab  /EGOSHARE\\.COM\\/DOWNLOAD/gi,\par
\tab\tab\tab  /You have requested/gi,\par
\tab\tab\tab  /requested file could not be found/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["fastfreefilehosting.com",\par
             /http:\\/\\/fastfreefilehosting\\.com/gi,\par
             /File name:/gi,\par
             /SNC000400\\.jpg/gi\par
             ]);\par
hosts.push (["filebase.to",\par
\tab\tab\tab  /FILEBASE\\.TO\\/FILES/gi,\par
\tab\tab\tab  /Downloads:/gi,\par
\tab\tab\tab  /Fehler 404/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["filefactory.com",\par
\tab\tab\tab  /FILEFACTORY\\.COM\\/FILE/gi,\par
\tab\tab\tab  /Here are your download options|Download for free with FileFactory Basic|file uploaded/gi,\par
\tab\tab\tab  "",\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["fileflyer.com",\par
\tab\tab\tab  /FILEFLYER\\.COM\\/VIEW/gi,\par
\tab\tab\tab  /Unlock Now!/gi,\par
\tab\tab\tab  /download_disable|unavailable for a while/,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["filesdump.com",\par
             /filesdump\\.com/gi,\par
             /Download File/gi,\par
             ""\par
             ]);\tab\tab\tab  \par
hosts.push (["filesend.net",\par
\tab\tab\tab  /FILESEND\\.NET\\/DOWNLOAD\\.PHP/gi,\par
\tab\tab\tab  /Download!/gi,\par
\tab\tab\tab  /File not found/,\par
\tab\tab\tab  /[\\d]+[.]+[\\d]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["filezzz.com",\par
\tab\tab\tab  /FILEZZZ\\.COM\\/DOWNLOAD/gi,\par
\tab\tab\tab  /Click here to download.../gi,\par
\tab\tab\tab  /File not found!/,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["flyupload.com",\par
\tab\tab\tab  /FLYUPLOAD\\.COM\\/(?:GET|\\?FID)/gi,\par
\tab\tab\tab  /Continue to Download|/gi,\par
\tab\tab\tab  /expired/,\par
\tab\tab\tab  /[\\d.]+[KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["freakshare.net",\par
             /http:\\/\\/freakshare\\.net/gi,\par
             /Premium Download/gi,\par
             ""\par
             ]);\par
hosts.push (["gigasize.com",\par
\tab\tab\tab  /GIGASIZE\\.COM\\/GET\\.PHP/gi,\par
\tab\tab\tab  /download_button\\.png/gi,\par
\tab\tab\tab  /Download error|Error en la descarga|Erreur lors du t\'c3\'a9l\'c3\'a9chargement|Download-Fehler/gi,\par
\tab\tab\tab  /[\\d.]+[KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["hotfile.com",\par
\tab\tab\tab  /HOTFILE\\.COM\\/DL/gi,\par
\tab\tab\tab  /REGULAR DOWNLOAD|downloading|high speed download/gi,\par
\tab\tab\tab  "",\par
\tab\tab\tab  /[\\d.]+[KM]b/\par
\tab\tab\tab  ]);\par
hosts.push (["ifile.it",\par
\tab\tab\tab  /IFILE\\.IT\\/\\w+/,\par
\tab\tab\tab  /Request Download Ticket/gi,\par
\tab\tab\tab  /file not found/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["kewlshare.com",\par
             "KEWLSHARE\\.COM",\par
             /file name \\:/gi,\par
             ""\par
             ]);\par
hosts.push (["letitbit.net",\par
\tab\tab\tab  /LETITBIT\\.NET\\/DOWNLOAD/gi,\par
\tab\tab\tab  /Download file|Die Dateien herunterladen|download3\\.php/gi,\par
\tab\tab\tab  /The requested file was not found|Gesuchte Datei wurde nicht gefunden/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]b/\par
\tab\tab\tab  ]);\par
hosts.push (["mediafire.com",\par
\tab\tab\tab  /MEDIAFIRE\\.COM\\/(?:download.php)?\\?/gi,\par
\tab\tab\tab  /Loading files...|Click here to start download|you requested|authorize_download\\.gif/gi,\par
\tab\tab\tab  /Invalid File|media fire is the simplest|0 items found/i,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["megashare.com",\par
\tab\tab\tab  /MEGASHARE\\.COM\\/\\d+/gi,\par
\tab\tab\tab  /Select your download|Download Your File|Click here to download/,\par
\tab\tab\tab  ""\par
\tab\tab\tab  ]);\par
hosts.push (["megashares.com",\par
\tab\tab\tab  /MEGASHARES\\.COM\\//gi,\par
\tab\tab\tab  /Your Download Passport is|enter the passport/gi,\par
\tab\tab\tab  /All download slots for this link are currently filled|Please try again momentarily/gi\par
\tab\tab\tab  ]);\par
hosts.push (["megaupload.com",\par
\tab\tab\tab  /MEGAUPLOAD\\.COM\\/[\\w\\/]*\\?/gi,\par
\tab\tab\tab  /but_dnld_file_o\\.gif|\\/gui\\/c_dnl\\.gif|gui\\/c_dnl\\.swf|gui\\/h\\_folders\\.gif|name\\=\\"imagestring\\"|but_dnld_file_o.gif|uploaded with File Uploader/gi,\par
\tab\tab\tab  /Enlace no v\'c3\'a1lido|archivo ha sido borrado/,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["megavideo.com",\par
\tab\tab\tab  /MEGAVIDEO\\.COM\\/\\?/gi,\par
\tab\tab\tab  /id=\\"playertd\\"/gi,\par
\tab\tab\tab  /Este video no est\'c3\'a1 disponible/gi,\par
\tab\tab\tab  ""\par
\tab\tab\tab  ]);\par
hosts.push (["netload.in",\par
\tab\tab\tab  /NETLOAD\\.IN\\/DATE/gi,\par
\tab\tab\tab  /header_login_background\\.gif|dl_first_bg\\.jpg/gi,\par
\tab\tab\tab  /we don\\'t host|achtung\\.jpg/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["rapidshare.de",\par
\tab\tab\tab  /RAPIDSHARE\\.DE\\/FILES/gi,\par
\tab\tab\tab  /Choose download-type/,\par
\tab\tab\tab  ""\par
\tab\tab\tab  ]);\par
hosts.push (["rapidshare.com",\par
\tab\tab\tab  /RAPIDSHARE\\.COM\\/FILES/gi,\par
\tab\tab\tab  "",\par
\tab\tab\tab  ""\par
\tab\tab\tab  ]);\par
hosts.push (["rapidspread.com",\par
             /http\\:\\/\\/www\\.rapidspread\\.com/,\par
             /You have requested the file:/gi,\par
             ""\par
             ]);\par
hosts.push (["rghost.ru",\par
\tab\tab\tab  /RGHOST\\.RU\\/[\\d]+/gi,\par
\tab\tab\tab  /Downloaded/,\par
\tab\tab\tab  /\'d0\'be\'d0\'b1\'d0\'bc\'d0\'b5\'d0\'bd \'d1\'84\'d0\'b0\'d0\'b9\'d0\'bb\'d0\'b0\'d0\'bc\'d0\'b8|\'d1\'81\'d1\'82\'d1\'80\'d0\'b0\'d0\'bd\'d0\'b8\'d1\'86\'d1\'8b \'d0\'bd\'d0\'b5 \'d1\'81\'d1\'83\'d1\'89\'d0\'b5\'d1\'81\'d1\'82\'d0\'b2\'d1\'83\'d0\'b5\'d1\'82/,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["rokzoo.com",\par
             /http:\\/\\/www\\.rokzoo\\.com/gi,\par
             "",\par
             /page not found/gi\par
             ]);\par
hosts.push (["secured.in",\par
\tab\tab\tab  /SECURED\\.IN\\/DOWNLOAD/gi,\par
\tab\tab\tab  /proceedToTheDownloadLinks/gi,\par
\tab\tab\tab  /submitDownloadID/gi\par
\tab\tab\tab  ]);\par
hosts.push (["sendspace.com",\par
\tab\tab\tab  /SENDSPACE\\.COM\\//gi,\par
\tab\tab\tab  /Download Link:/gi,\par
\tab\tab\tab  /requested is not available/gi,\par
\tab\tab\tab  /[\\d.]+[KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["share-online.biz",\par
\tab\tab\tab  /SHARE-ONLINE\\.BIZ\\/DOWNLOAD/gi,\par
\tab\tab\tab  /Start Highspeed Download|Highspeed Download starten/gi,\par
\tab\tab\tab  "",\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["sharebase.com",\par
\tab\tab\tab  /SHAREBASE\\.TO\\/FILES/gi,\par
\tab\tab\tab  /Download:/gi,\par
\tab\tab\tab  "",\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["sharebee.to",\par
\tab\tab\tab  /SHAREBEE\\.COM\\/[\\w]+/gi,\par
\tab\tab\tab  /Filename:/gi,\par
\tab\tab\tab  /Requested url is not found/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["sharesimple.net",\par
\tab\tab\tab  /SHARESIMPLE\\.NET\\/EN\\/DOWNLOAD/gi,\par
\tab\tab\tab  /value=Submit/gi,\par
\tab\tab\tab  /Your requested file is not found/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["sharingmatrix.com",\par
             /http:\\/\\/sharingmatrix\\.com/gi,\par
             /Select your download mode/gi,\par
             ""\par
             ]);\par
hosts.push (["speedshare.org",\par
\tab\tab\tab  /SPEEDSHARE\\.ORG\\/DOWNLOAD/gi,\par
\tab\tab\tab  /You have requested|Sie haben/gi,\par
\tab\tab\tab  /Error!!!/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["sms4file.com",\par
\tab\tab\tab  /SMS4FILE\\.COM\\/DOWNLOADVIP/gi,\par
\tab\tab\tab  /To download this file you should buy account/gi,\par
\tab\tab\tab  /File not found/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]b/\par
\tab\tab\tab  ]);\par
hosts.push (["storage.to",\par
             /http:\\/\\/www\\.storage\\.to/gi,\par
             /Download Type/gi,\par
             /File not found/gi\par
             ]);\par
hosts.push (["teradepot.com",\par
             /http:\\/\\/www\\.teradepot\\.com/gi,\par
             /download_submit_buttons/gi,\par
             ""\par
             ]);\par
hosts.push (["transferbigfiles.com",\par
\tab\tab\tab  /TRANSFERBIGFILES\\.COM\\/GET/gi,\par
\tab\tab\tab  /doPostBack/gi,\par
\tab\tab\tab  /class='ExpiredFile'|Invalid Transfer ID/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["ugotfile.com",\par
             /http:\\/\\/ugotfile\\.com/gi,\par
             /Forum Code/gi,\par
             ""\par
             ]); \par
hosts.push (["upit.to",\par
\tab\tab\tab  /UPIT\\.TO\\/FILE/gi,\par
\tab\tab\tab  /Start download!/gi,\par
\tab\tab\tab  /Your requested file is not found/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["uploadbox.com",\par
\tab\tab\tab  /UPLOADBOX\\.COM\\/FILES/gi,\par
\tab\tab\tab  /Download as Premium|Premium Download|File name:|title="Download for free"/gi,\par
\tab\tab\tab  /class="not_found"/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["uploading.com",\par
\tab\tab\tab  /UPLOADING\\.COM\\/FILES/gi,\par
\tab\tab\tab  /ico_download_file\\.jpg|\\/images\\/speed\\.jpg|class=\\"downloadbutton\\"|is already downloading|getElementById\\(\\'downloadform\\'|value="Download file"|Descargar Archivo/gi,\par
\tab\tab\tab  /temporarily unavailable|FILE REMOVED|Requested file not found/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["uploaded.to",\par
\tab\tab\tab  /UPLOADED\\.TO\\/(?:\\?ID|FILE)/gi,\par
\tab\tab\tab  /Filename:/gi,\par
\tab\tab\tab  /File doesn't exist|Download failed!/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["vip-file.com",\par
\tab\tab\tab  /VIP-FILE\\.COM\\/DOWNLOAD/gi,\par
\tab\tab\tab  /File Name:|Or download with Very Slow Speed/gi,\par
\tab\tab\tab  /File \\<b\\>\\<\\/b\\> not found|This file not found/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]b/\par
\tab\tab\tab  ]);\par
hosts.push (["xlice.net",\par
\tab\tab\tab  /XLICE\\.NET\\/DOWNLOAD/gi,\par
\tab\tab\tab  /File name:/gi,\par
\tab\tab\tab  /At this time no downloadmirrors are available/,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["xtraupload.de",\par
\tab\tab\tab  /XTRAUPLOAD\\.DE\\/\\?/gi,\par
\tab\tab\tab  /File name:/gi,\par
\tab\tab\tab  "",\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["yabadaba.ru",\par
\tab\tab\tab  /YABADABA\\.RU\\/FILES/gi,\par
\tab\tab\tab  /\'d0\'9f\'d0\'be\'d0\'bb\'d1\'83\'d1\'87\'d0\'b8\'d1\'82\'d1\'8c \'d1\'81\'d1\'81\'d1\'8b\'d0\'bb\'d0\'ba\'d1\'83 \'d0\'b4\'d0\'bb\'d1\'8f \'d1\'81\'d0\'ba\'d0\'b0\'d1\'87\'d0\'b8\'d0\'b2\'d0\'b0\'d0\'bd\'d0\'b8\'d1\'8f!/gi,\par
\tab\tab\tab  ""\par
\tab\tab\tab  ]);\par
hosts.push (["yastorage.com",\par
\tab\tab\tab  /YASTORAGE\\.COM\\/DOWNLOAD/gi,\par
\tab\tab\tab  /\'d0\'9f\'d0\'be\'d0\'bb\'d1\'83\'d1\'87\'d0\'b8\'d1\'82\'d1\'8c \'d1\'81\'d1\'81\'d1\'8b\'d0\'bb\'d0\'ba\'d1\'83 \'d0\'b4\'d0\'bb\'d1\'8f \'d1\'81\'d0\'ba\'d0\'b0\'d1\'87\'d0\'b8\'d0\'b2\'d0\'b0\'d0\'bd\'d0\'b8\'d1\'8f!/gi,\par
\tab\tab\tab  ""\par
\tab\tab\tab  ]);\par
hosts.push (["youload.to",\par
\tab\tab\tab  /YOULOAD\\.TO\\/DOWNLOAD/gi,\par
\tab\tab\tab  /download\\.png/gi,\par
\tab\tab\tab  /class="error_message"/gi,\par
\tab\tab\tab  /\\([\\d.]+ [KM]B\\)/\par
\tab\tab\tab  ]);\par
hosts.push (["ziddu.com",\par
\tab\tab\tab  /WWW\\.ZIDDU\\.COM\\/DOWNLOAD/gi,\par
\tab\tab\tab  /\\/images\\/download-download-img\\.gif|downloadfilelinkicon|value="Download"|value="Descargar"/gi,\par
\tab\tab\tab  /File not found/gi,\par
\tab\tab\tab  /[\\d.]+ [KM]B/\par
\tab\tab\tab  ]);\par
hosts.push (["zshare.net",\par
\tab\tab\tab  /ZSHARE\\.NET\\/DOWNLOAD/gi,\par
\tab\tab\tab  /last download/gi,\par
\tab\tab\tab  /file not found/gi,\par
\tab\tab\tab  /[\\d.]+[KM]B/\par
\tab\tab\tab  ]);\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
//\tab Redirectores\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
\par
hosts.push (["lix.in",\par
\tab\tab\tab  /HTTP:\\/\\/LIX\\.IN\\/[\\w-]+/gi,\par
\tab\tab\tab  /value="submit"/gi,\par
\tab\tab\tab  ""\par
\tab\tab\tab  ]);\par
\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
//\tab Imagenes y Estilos\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
link_vivo_png = 'data:image/png;base64,'+\par
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+\par
'EwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hY'+\par
'FAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vy'+\par
'IKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSs'+\par
'L2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13Zp'+\par
'dyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaY'+\par
'ehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQ'+\par
'Rj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk1'+\par
'46BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noH'+\par
'XccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc'+\par
'04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';\par
\par
link_muerto_png = 'data:image/png;base64,'+\par
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+\par
'EwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQC'+\par
'Y6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVk'+\par
'sDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE'+\par
'+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29'+\par
'pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM'+\par
'8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2N'+\par
'sLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmR'+\par
'QHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';\par
\par
link_nodisponible_png = 'data:image/png;base64,'+\par
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+\par
'EwEAmpwYAAAAB3RJTUUH2AQJDBgxYO68rwAAAZNJREFUeNptkr9LW1EcxT/3GhOTKIG8QTpm8B8IIoJTFkFwsXVy'+\par
'UaxFJHYoFzJYUVFHn4sKtoidCoKtIigWOtQOhRKowaFzJwcF0VeJ+fFe7nUwP57R7/S9nO+595z7PQJfGUgAsWqP'+\par
'aUBOC/yrHQI+QjKTXc7GQq4EhP+uKzdUcbtnelvhDzXQQHL2bCkbxhOA5GmZ24LUC73zPWE4lQYSmexynaCmjh5N'+\par
'q9FdANER1uL9j7nfeUhIIFaVJNXEPrguKvPzgfD2G0iBGt8DkPG4CGiIyapZAWBvDUEoBOfnqPQxaANxC3v7Ze1h'+\par
'oQFpmsTbGwMQicLNNeTz2HaKYuO/4DnTauwLeC6i8wW4ZdSbA9rw/GtB6kaPmjyESATKZVZWUxAMQqnI9MTXOqdG'+\par
'cvRFoSw8o+0Pg1DxsD+PcFcJYH8aphSNsr71CkAH/17danAEQAGSa98zv7x4W9AIpGkRzap18cKU3vUv9lmQq6N5'+\par
'SH7cSZ8Uuqx205SI1rPL/6/HN1MW5GiKC84z2at6dixf9u4B/PqUtJuX27QAAAAASUVORK5CYII=';\par
\par
link_redirector_png = 'data:image/png;base64,'+\par
'iVBORw0KGgoAAAANSUhEUgAAADwAAAAMCAIAAACx5EmIAAAABGdBTUEAALGPC%2FxhBQAAAuNJREFUSEvVVFtIk2'+\par
'EY%2FldeOCTzQiqzwIWoFEFCqRUJ00Kdu%2BgijA6yqKAbO1xUlumkolBc%2B5da6cwxxSAtcTLxkBSIJ9B1QM3S'+\par
'7EKzYAkeMCoievrfb9%2FcdFsLusmPn5%2F39Dzv87%2Ff938yAMKyW5JoTA2hUIfSUnoMejT0UdDPmoJWi09Aby'+\par
'3yjf6K%2Fy3%2FtAa6GncKgZz%2BYmnai56rzf762Ki%2B9QusBVCd81fsNW%2BH5uJfAQ%2Buh7DOQ%2FQrIyl4'+\par
'4YxHCQhM4k7HI5jN6HjrwrRVwyR99zhBnsxhahhtbGdqqzD5AZUV6Bkh1xP4vIWoWlibuQnEyCAo0NzFmaVUlRkj'+\par
'M9xdYBuZw4loBCT6EF3Zhd5ODL6GXMDmk1SkPwRhJRITSd8NNvvsJLLj4qFYS4bUMW8nH4Njr6I3wTKJsmNLgeJh'+\par
'yiYk0FvfiaGHbGMDsENDtBGSvQrxWyloHqDIAlvjOG6mIPyAD9ELJyQuFmNSzQwhT9%2FH7Cxy06iBg%2BtMLRkv'+\par
'73LRBSkQYnhKkcmo570DzzdQUsxEaDIZ6mAEq8m4d4TqHStrO6l3NOJsUsFRxGb5EF33Bg9yqPpWO6voIzs0DCGr'+\par
'EbkFkVGYnaCI1c6yY15Ea8r%2BBKx2O2NSXbIcQfuoPmMDVii5Jmsu%2FwCpEWcDHp%2BFMt%2BH6GEWP7WNYLZv'+\par
'fNKlbLPqtVBfAb5TKruRIgPlXkQfr2AUdkp5AnPZAbNcw8Z4pjUcgUx00X7XpC%2FshhDEJ83ZgAkbmhZdaG63R7'+\par
'%2FzY%2BicrCEnR0l06en0vlTPIuxMp6YiIoSMZz%2Bh3QUhjLfJKOYUlz2A1xmJSkXvzBIqy2NUe9m%2BhwiQhS'+\par
'FtD0UaPi5lS5NDkHtMenoUoohpZ%2FxdD8QijM6T32qCwYBWNm%2FHqi%2BGTo9fwG0Rn4HBdpRbKG4U0T3qKvME'+\par
'dtURVZ3zusAP3ClBoYlDpJRBxPuv3HVn67bAyFo4l%2FMPcI%2F99%2FayFP0b9B9I5enpru8AAAAASUVORK5CYII%3D';\par
\par
GM_addStyle("#link_vivo \{background:transparent url("+link_vivo_png+") no-repeat scroll 100% 50%;padding-right:17px;\}");\par
GM_addStyle("#link_muerto \{background:transparent url("+link_muerto_png+") no-repeat scroll 100% 50%;padding-right:17px;\}");\par
GM_addStyle("#link_inaxesible \{background:transparent url("+link_nodisponible_png+") no-repeat scroll 100% 50%;padding-right:17px;\}");\par
GM_addStyle("#link_redirector \{background:transparent url("+link_redirector_png+") no-repeat scroll 100% 50%;padding-right:65px;\}");\par
\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
//\tab Procesar los links\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
verificar_links();\par
var links = document.getElementsByTagName('a');\par
for (var i = 0; i < links.length; i++)\{\par
\tab var urll = unescape(links[i].href.replace(/\\+/g, ' '));\par
\tab urll = urll.replace(/\\?killcode=[\\d]*/gi,'');\par
\tab if (urll.search(RegExp('Javascript:|' + location.hostname + '|^$','gi')) == -1) \{\par
\tab\tab\tab links[i].href = unescape(links[i].href.replace(/\\+/g, ' ')).replace(/^[\\s]*/,'').replace(/[\\s]*$/,'').replace(redirectores2_regex, '').replace(/^\\s*|\\s*^$/g, '');\par
\tab\tab\tab if (links[i].href.search(redirectores_regex) != -1)\{\par
\tab\tab\tab\tab mostrar_estado(urll, "REDIR");\par
\tab\tab\tab\} else \{\par
\tab\tab\tab\tab if (links[i].href.search(todos_rapidshare_regex) != -1)\{\par
\tab\tab\tab\tab\tab var urll = links[i].href;\par
\tab\tab\tab\tab\tab numerodelinksRS++;\par
\tab\tab\tab\tab\tab urll = urll.replace(/^.*?http:\\/\\/rapidshare/gi,'http://rapidshare');\par
\tab\tab\tab\tab\tab urll = urll.replace(/^.*?http%3A%2F%2Frapidshare/gi,'http://rapidshare');\par
\tab\tab\tab\tab\tab urll = urll.replace(/\\?killcode=[\\d]*/gi,'');\par
\tab\tab\tab\tab\tab urll = urll.replace(/%2F/gi,'/');\par
\tab\tab\tab\tab\tab urll = urll.replace(/%3A/gi,':');\par
\tab\tab\tab\tab\tab var cadena = ''+numerodelinksRS+'';\par
\tab\tab\tab\tab\tab if (cadena.search(/\\d00/) != -1)\{\par
\tab\tab\tab\tab\tab\tab todos.push('xxxczxczxcsasdasdasdx4234');\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab todos.push(urll);\par
\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab for (var ii = 0; ii < hosts.length; ii++)\{\par
\tab\tab\tab\tab\tab\tab if (links[i].href.search(hosts[ii][1]) != -1) \{\par
\tab\tab\tab\tab\tab\tab\tab otros_links.push(urll);\par
\tab\tab\tab\tab\tab\tab\tab otros_links_cant = otros_links_cant + 1;\par
\tab\tab\tab\tab\tab\tab\tab otros_vivos.push(hosts[ii][2]);\par
\tab\tab\tab\tab\tab\tab\tab otros_muertos.push(hosts[ii][3]);\par
\tab\tab\tab\tab\tab\tab\tab otros_peso.push(hosts[ii][4]);\par
\tab\tab\tab\tab\tab\tab\tab break;\par
\tab\tab\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab\tab\tab if (ii == hosts.length - 1)\par
\tab\tab\tab\tab\tab\tab\tab\tab comprueba_extension(links[i].href);\par
\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\}\par
\}\par
todos = todos.join();\par
todos = todos.replace(/,/gi,'\\n');\par
var todos=todos.split("xxxczxczxcsasdasdasdx4234");\par
if (numerodelinksRS > 0)\{\par
\tab validar_links_rs(todos);\par
\}\par
\par
verificar_otros_links(otros_links);\par
\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
//\tab Funciones\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
function validar_links_rs(todos)\{\par
\tab for (var i = todos.length - 1; i >= 0; i--) \{\par
\tab\tab GM_xmlhttpRequest(\{\par
\tab\tab\tab method: "POST",\par
\tab\tab\tab url: 'http://rapidshare.com/cgi-bin/checkfiles.cgi',\par
\tab\tab\tab headers:\{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'\},\par
\tab\tab\tab data:'urls='+encodeURIComponent(todos[i]),\par
\tab\tab\tab onload:function(resultado) \{\par
\tab\tab\tab\tab res=resultado.responseText;\par
\tab\tab\tab\tab noencontrado = res.match(/inexistent<\\/td><\\/tr><\\/table>    \\n<div class="downloadlink">http:\\/\\/rapidshare\\.com\\/files\\/(\\d*)\\/.*<\\/div>/g);\par
\tab\tab\tab\tab linkvivo = res.match(/load<\\/a><\\/td><\\/tr><\\/table>    \\n<div class="downloadlink">http:\\/\\/rapidshare\\.com\\/files\\/(\\d*)\\/.*<\\/div>/g);\par
\tab\tab\tab\tab if (noencontrado)\{\par
\tab\tab\tab\tab\tab var linksnoencontrados = new Array();   \par
\tab\tab\tab\tab\tab for (var i = noencontrado.length - 1; i >= 0; i--) \{\par
\tab\tab\tab\tab\tab\tab var string=noencontrado[i];\par
\tab\tab\tab\tab\tab\tab var regex = /inexistent<\\/td><\\/tr><\\/table>    \\n<div class="downloadlink">http:\\/\\/rapidshare\\.com\\/files\\/(\\d*)\\/.*<\\/div>/;\par
\tab\tab\tab\tab\tab\tab matchArray=string.match(regex);\par
\tab\tab\tab\tab\tab\tab linksnoencontrados.push(matchArray[1]);\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab if (linksnoencontrados)\{\par
\tab\tab\tab\tab\tab\tab MostrarLinksBorrados(linksnoencontrados);\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab if (linkvivo)\{\par
\tab\tab\tab\tab\tab var linksvivos = new Array();   \par
\tab\tab\tab\tab\tab for (var i = linkvivo.length - 1; i >= 0; i--) \{\par
\tab\tab\tab\tab\tab\tab var string=linkvivo[i];\par
\tab\tab\tab\tab\tab\tab var regex2 = /load<\\/a><\\/td><\\/tr><\\/table>    \\n<div class="downloadlink">http:\\/\\/rapidshare\\.com\\/files\\/(\\d*)\\/.*<\\/div>/;\par
\tab\tab\tab\tab\tab\tab matchArraylive=string.match(regex2);\par
\tab\tab\tab\tab\tab\tab linksvivos.push(matchArraylive[1]);\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab if (linksvivos)\{\par
\tab\tab\tab\tab\tab\tab MostrarLinksVivos(linksvivos);\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\});\par
\tab\}\par
\}\par
function MostrarLinksBorrados(linksnoencontrados)\{\par
\tab var xpathlinksnoencontrados = "//a[contains(@href,\\'" + linksnoencontrados.join('\\') or contains(@href,\\'') +"\\')]";\par
\tab var todosLinks, esteLink;\par
\tab todosLinks = document.evaluate( xpathlinksnoencontrados, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);\par
\tab for (var i = 0; i < todosLinks.snapshotLength; i++) \{\par
\tab\tab\tab var esteLink = todosLinks.snapshotItem(i);\par
\tab\tab\tab mostrar_estado(esteLink.href,"MUERTO");\par
\tab\}\par
\}\par
\par
function MostrarLinksVivos(linksvivos)\{\par
\tab var xpathlinksvivos = "//a[contains(@href,\\'" + linksvivos.join('\\') or contains(@href,\\'') +"\\')]";\par
\tab var todosLinksvivos, esteLink;\par
\tab todosLinksvivos = document.evaluate( xpathlinksvivos, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);\par
\tab for (var i = 0; i < todosLinksvivos.snapshotLength; i++) \{\par
\tab\tab\tab var esteLink = todosLinksvivos.snapshotItem(i);\par
\tab\tab\tab mostrar_estado(esteLink.href,"VIVO");\par
\tab\}\par
\}\par
\par
function verificar_otros_links(otros_links)\{\par
\tab for (var i = 0; i < otros_links.length; i++)\{\par
\tab\tab var archivo_vivo = otros_vivos[i];\par
\tab\tab var archivo_muerto = otros_muertos[i];\par
\tab\tab var archivo_peso = otros_peso[i];\par
\tab\tab var URL = otros_links[i];\par
\tab\tab var ret = otros_links_get(URL, archivo_vivo, archivo_muerto, archivo_peso);\par
\tab\}\par
\}\par
function otros_links_get(URL, archivo_vivo, archivo_muerto, archivo_peso)\{\par
\tab GM_xmlhttpRequest(\{\par
\tab\tab method: 'GET',\par
\tab\tab url: URL,\par
\tab\tab headers: \{ 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', \}, \par
\tab\tab onload: function(resultado)\{\par
\tab\tab\tab if (resultado.status == 200) \{\par
\tab\tab\tab\tab if (resultado.responseText.search(archivo_muerto) != -1 && archivo_muerto != "")\{\par
\tab\tab\tab\tab\tab mostrar_estado(URL, "MUERTO");\par
\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab if (resultado.responseText.search(archivo_vivo) == -1) \{\par
\tab\tab\tab\tab\tab\tab mostrar_estado(URL, "MUERTO");\par
\tab\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab\tab if (archivo_peso != '') \{\par
\tab\tab\tab\tab\tab\tab\tab var TAM = resultado.responseText.match(archivo_peso);\par
\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab mostrar_estado(URL, "VIVO", TAM);\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\} else \{\par
\tab\tab\tab\tab mostrar_estado(URL, "NODISP", TAM);\par
\tab\tab\tab\}\par
\tab\tab\},\par
\tab\tab onerror: function(resultado)\{\par
\tab\tab\tab mostrar_estado(URL, "NODISP");\par
\tab\tab\}\par
\tab\});\par
\}\par
\par
function comprueba_extension(URL) \{\par
\tab URL2 = unescape(URL.replace(/\\+/g,  " "));\par
\tab extensiones_permitidas = new Array(".rar", ".zip", ".exe", ".pdf", ".doc", ".mp3");\par
\tab empiezo = URL2.lastIndexOf(".");\par
\tab extension = URL2.substring(empiezo,empiezo+5).replace(/\\s/g,'').toLowerCase();\par
\tab permitida = false;\par
\tab for (var i = 0; i < extensiones_permitidas.length; i++) \{\par
\tab\tab if (extensiones_permitidas[i] == extension) \{\par
\tab\tab\tab permitida = true;\par
\tab\tab\tab break;\par
\tab\tab\}\par
\tab\}\par
\tab if (permitida) otros_links_directos(URL);\par
\}\par
\par
function otros_links_directos(URL)\{\par
\tab GM_xmlhttpRequest(\{\par
\tab\tab method: 'HEAD',\par
\tab\tab url: URL,\par
\tab\tab headers: \{ 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', \}, \par
\tab\tab onload: function(resultado)\{\par
\tab\tab\tab if(resultado.responseHeaders == '')\par
\tab\tab\tab\tab mostrar_estado(URL, "MUERTO");\par
\tab\tab\tab else\par
\tab\tab\tab\tab mostrar_estado(URL, "VIVO");\par
\tab\tab\},\par
\tab\tab onerror: function(resultado)\{\par
\tab\tab\tab\tab mostrar_estado(URL, "NODISP");\par
\tab\tab\}\par
\tab\});\par
\}\par
\par
function mostrar_estado(URL, uTipo, kb)\{\par
\tab var bgc = "";\par
\tab var lnk = "";\par
\tab var dec = "";\par
\tab var tit = "";\par
\tab var clt = "";\par
\tab switch(uTipo)\{\par
\tab\tab case "MUERTO":\par
\tab\tab\tab bgc = color_link_muerto;\par
\tab\tab\tab clt = color_texto_mal;\par
\tab\tab\tab lnk = 'link_muerto';\par
\tab\tab\tab dec = 'line-through';\par
\tab\tab\tab tit = 'El link est\'c3\'a1 muerto o desactivado';\par
\tab\tab\tab break;\par
\tab\tab case "NODISP":\par
\tab\tab\tab bgc = color_link_nodisp;\par
\tab\tab\tab clt = color_texto_mal;\par
\tab\tab\tab lnk = 'link_inaxesible';\par
\tab\tab\tab dec = '';\par
\tab\tab\tab tit = 'La p\'c3\'a1gina esta inaxesible';\par
\tab\tab\tab break;\par
\tab\tab case "VIVO":\par
\tab\tab\tab bgc = color_link_vivo;\par
\tab\tab\tab clt = color_texto_bien;\par
\tab\tab\tab dec = "";\par
\tab\tab\tab lnk = 'link_vivo';\par
\tab\tab\tab tit = 'El link de descarga funciona correctamente';\par
\tab\tab\tab break;\par
\tab\tab case "REDIR":\par
\tab\tab\tab bgc = color_link_muerto;\par
\tab\tab\tab clt = color_texto_mal;\par
\tab\tab\tab lnk = 'link_redirector';\par
\tab\tab\tab dec = '';\par
\tab\tab\tab tit = 'Redirector. Imposible de verificar estado del link';\par
\tab\tab\tab break;\par
\tab\tab default:\par
\tab\tab\tab break;\par
\tab\}\par
\tab var xpathotroslinks = "//a[contains(@href,\\'"+URL+"\\')]";\par
\tab var todosLinks;\par
\tab todosLinks = document.evaluate( xpathotroslinks, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);\par
\tab for (var i = 0; i < todosLinks.snapshotLength; i++) \{\par
\tab\tab var esteLink = todosLinks.snapshotItem(i);\par
\tab\tab if(esteLink.id != lnk) \{\par
\tab\tab\tab esteLink.id = lnk;\par
\tab\tab\tab esteLink.style.textDecoration = dec;\par
\tab\tab\tab esteLink.title = tit;\par
\tab\tab\tab if (kb != undefined) \{\par
\tab\tab\tab\tab kb = kb[0].toUpperCase().replace(/,/gi, '.');\par
\tab\tab\tab\tab var kb1 = /[\\d.]+/.exec(kb);\par
\tab\tab\tab\tab var kb2 = /[KM]B/.exec(kb);\par
\tab\tab\tab\tab if (esteLink.innerHTML.replace(/^\\s*|\\s*^$/g, '').indexOf(unescape(esteLink.href.replace(/\\+/g, ' '))) != -1) \{\par
\tab\tab\tab\tab\tab esteLink.innerHTML = '<font style="font-size: 13px;color:'+clt+';background-Color:'+bgc+'">['+kb1+' '+kb2+'] ==> '+unescape(esteLink.href.replace(/\\+/g, ' '))+'</font>';\par
\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab esteLink.innerHTML = '<b>'+esteLink.innerHTML+'</b><br/><font style="font-size: 13px;color:'+clt+';background-Color:'+bgc+'">['+kb1+' '+kb2+'] ==> '+unescape(esteLink.href.replace(/\\+/g, ' '))+'</font>';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\} else \{\par
\tab\tab\tab\tab if (esteLink.innerHTML.replace(/^\\s*|\\s*^$/g, '').indexOf(unescape(esteLink.href.replace(/\\+/g, ' '))) != -1) \{\par
\tab\tab\tab\tab\tab esteLink.innerHTML = '<font style="font-size: 13px;color:'+clt+';background-Color:'+bgc+'">'+unescape(esteLink.href.replace(/\\+/g, ' '))+'</font>';\par
\tab\tab\tab\tab\} else \{\par
\tab\tab\tab\tab\tab esteLink.innerHTML = '<b>'+esteLink.innerHTML+'</b><br/><font style="font-size: 13px;color:'+clt+';background-Color:'+bgc+'">'+unescape(esteLink.href.replace(/\\+/g, ' '))+'</font>';\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
function verificar_links()\{\par
\tab try\{\par
\tab\tab var regex = /((?:https?|ftp):\\/\\/[^\\s'"'<>()]*|[-\\w.+]+@(?:[-\\w]+\\.)+[\\w]\{2,6\})/gi;\par
\tab\tab var regex_excluir = /http:\\/\\/uploading\\.com|http:\\/\\/letitbit.net|http:\\/\\/www.gshare\\.com/gi;\par
\tab\tab var regex_fin = /\\.rar\\.html\\b/gi;\par
\tab\tab var TextoAlt, tekst, muligtLink;\par
\tab\tab var Tags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'code'];\par
\tab\tab var path = "//text()[not(parent::" + Tags.join(" or parent::") +")]";\par
\tab\tab TextoAlt = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);\par
\tab\tab for(var i=0;i<TextoAlt.snapshotLength;i++)\{\par
\tab\tab\tab tekst = TextoAlt.snapshotItem(i);\par
\tab\tab\tab muligtLink = tekst.nodeValue;\par
\tab\tab\tab if(regex.test(muligtLink))\{\par
\tab\tab\tab\tab var span = document.createElement('span');\par
\tab\tab\tab\tab var ultimoencontrado = 0;\par
\tab\tab\tab\tab regex.lastIndex = 0;\par
\tab\tab\tab\tab for(vector = null; vector = regex.exec(muligtLink); )\{\par
\tab\tab\tab\tab\tab var link = vector[0];\par
\tab\tab\tab\tab\tab span.appendChild(document.createTextNode(muligtLink.substring(ultimoencontrado, vector.index)));\par
\tab\tab\tab\tab\tab var href = link;\par
\par
\tab\tab\tab\tab\tab href = href.replace(/^[\\s]*/, '');\par
\tab\tab\tab\tab\tab if (href.search(/^(?:https?|ftp):\\/\\//) == -1 && href.search("@") == -1)\{\par
\tab\tab\tab\tab\tab\tab href = 'http://'+href;\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab //Arreglar links que terminan en .rar.html\par
\tab\tab\tab\tab\tab if (href.search(regex_excluir) == -1)\{\par
\tab\tab\tab\tab\tab\tab if (href.search(regex_fin) != -1)\{\par
\tab\tab\tab\tab\tab\tab\tab href = href.substr(0, href.length - 5);\par
\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab var a = document.createElement('a');\par
\tab\tab\tab\tab\tab a.setAttribute('href', href);\par
\tab\tab\tab\tab\tab a.setAttribute('target', '_blank');\par
\tab\tab\tab\tab\tab a.appendChild(document.createTextNode(href));\par
\tab\tab\tab\tab\tab span.appendChild(a);\par
\tab\tab\tab\tab\tab ultimoencontrado = regex.lastIndex;\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab span.appendChild(document.createTextNode(muligtLink.substring(ultimoencontrado)));\par
\tab\tab\tab\tab tekst.parentNode.replaceChild(span, tekst);\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\} catch(e)\{alert(e);\}\par
\}\par
\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
////////////////////////////////////////////////////////////////////////////////////////////////////////\par
}

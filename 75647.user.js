// ==UserScript==
// @name           OGameRediseño Compactador Batallas
// @namespace      http://userscripts.org/users/143231
// @description    OGameRediseño Compactador Batallas
// @version        1.4.14
// @author         HoChiChaos/trustux & Rudolph/Granja_VIP [trusreno]
// @updateURL      http://userscripts.org/scripts/source/75647.meta.js
// @downloadURL    https://userscripts.org/scripts/source/75647.user.js
// @include        http://*/game/index.php?*page=*
// @grant GM_xmlhttpRequest
// @grant GM_log
// @grant unsafeWindow
// ==/UserScript==


(function ()
 {
     
     var SCRIPT = {
         name: "Compactador automático de batallas trusreno"
         ,url: "http://userscripts.org/scripts/show/75647"
         ,version: "1.4"
         ,version_completa: "1.4.14"
         ,funciona_ok: "5.7.99.99"
     };
     
     
     
     // ==============================================================================================
     // ==============================================================================================
     // ==============================================================================================
     
     function gethttprequest(dirurl) {
         var respuesta;
         GM_xmlhttpRequest({
             method: "GET",
             url: dirurl,
             onload: function(response) {
                 var resphttprequest = document.createElement('div');
                 resphttprequest.id = "resphttprequest";
                 resphttprequest.innerHTML = response.responseText;
                 resphttprequest.style.display = "none";
                 resphttprequest.tag = dirurl;
                 document.body.appendChild(resphttprequest);
             }
         });
     }
     
     var btndonate = '';
     btndonate += '<center><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">';
     btndonate += '<input type="hidden" name="cmd" value="_s-xclick">';
     btndonate += '<input type="hidden" name="hosted_button_id" value="7CBAVV6WKZ526">'
     btndonate += '<input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal. La forma rápida y segura de pagar en Internet.">';
     btndonate += '<img alt="" border="0" src="https://www.paypalobjects.com/es_ES/i/scr/pixel.gif" width="1" height="1">';
     btndonate += '</form></center><br>';
     
     function MenuLib() {
         
         // crea un boton en el menu izquierdo dentro del juego
         this.menuButton_create = function() {
             var MenuTableTools = document.getElementById('menuTableTools');	
             var Data = document.getElementById('trusrenocomp');
             if (! Data) {
                 var ListElement = document.createElement('li');
                 ListElement.innerHTML = '<div id="trusrenocomp" style="display: none;"></div>'
                 + '<a id="btn_menu_trusrenocomp" href="javascript:void(0)" class="menubutton"><span class="textlabel"><p style="color:#F59754">Ganancias Batalla</p></span></a>';
                 if (MenuTableTools.childNodes.length) {
                     MenuTableTools.insertBefore( ListElement, MenuTableTools.childNodes[0]);
                 }
                 else {
                     MenuTableTools.appendChild(ListElement);
                 }
                 Data = document.getElementById('trusrenocomp');
                 Data.parentNode.addEventListener('click', this.menuButton_click, false);
             }
         };
         
         // acciones a realizar al pulsar sobre el boton del menu
         this.menuButton_click = function() {
             var ContentWrapper = document.getElementById('contentWrapper');
             if (ContentWrapper) {
                 var content = '',
                     Inhalt = document.getElementById('inhalt'),
                     Container = document.getElementById('trusrenocomp_div_container');
                 if (Inhalt) { Inhalt.style.display = (Container) ? 'block' : 'none'; }
             }
             if (Container) {
                 ContentWrapper.removeChild( Container );
             }
             else {
                 Container = document.createElement('div');
                 Container.id = 'trusrenocomp_div_container';
                 if (ContentWrapper.childNodes.length) {
                     ContentWrapper.insertBefore( Container, ContentWrapper.childNodes[0] );
                 }
                 else {
                     ContentWrapper.appendChild( Container );
                 }
                 // seccion menu
                 content += '<p align="center"><br><br><table class="" width="100%">';
                 content += '<tr><td colspan="4" style="background-color:#0A122A">'
                 content += '<br><center><b><a href="http://userscripts.org/scripts/show/75647" target="_blank">Compactador automático de batallas trusreno [' + SCRIPT.version_completa + ']</b><br>';
                 content += '<br>HoChiChaos/trustux & Rudolph/Granja_VIP<br>[trusreno]</a></center><br>'
                 content += btndonate;
                 content += '</td></tr>';
                 content += '<tr>';
                 content += '<td width="25%" style="text-align:center;" bgcolor="#240B3B"><a style="color: #FFFFFF; font-size: 10pt" id="mostrar_sec1" href="javascript:void(0)">Diario</a></td>';
                 content += '<td width="25%" style="text-align:center;" bgcolor="#240B3B"><a style="color: #FFFFFF; font-size: 10pt" id="mostrar_sec2" href="javascript:void(0)">Mensual</a></td>';
                 content += '<td width="25%" style="text-align:center;" bgcolor="#240B3B"><a style="color: #FFFFFF; font-size: 10pt" id="mostrar_sec3" href="javascript:void(0)">Consideraciones</a></td>';
                 content += '<td width="25%" style="text-align:center;" bgcolor="#240B3B"><a style="color: #FFFFFF; font-size: 10pt" id="mostrar_sec4" href="javascript:void(0)">-[ CERRAR ]-</a></td>';
                 content += '</tr></table></p>';
                 
                 // seccion diario
                 content += '<div id="div_diario" style="background-color:#0A122A"><br>';
                 content += '<table>';
                 content += '<tr><td width="120" align="right"><b>DIA</b></td><td width="120" align="right"><b>BATALLAS</b></td><td width="120" align="right"><b>METAL</b></td><td width="120" align="right"><b>CRISTAL</b></td><td width="120" align="right"><b>DEUTERIO</b></td><td width="120" align="right"><b>TOTAL</b></td></tr>';
                 
                 var diario_metal = new HashTable();
                 diario_metal.parse(options.get("diario_metal"));
                 
                 var diario_cristal = new HashTable();
                 diario_cristal.parse(options.get("diario_cristal"));
                 
                 var diario_deu = new HashTable();
                 diario_deu.parse(options.get("diario_deu"));
                 
                 var diario_batallas = new HashTable();
                 diario_batallas.parse(options.get("diario_batallas"));
                 
                 var keys = diario_metal.keys();
                 
                 var b, m, c, d;
                 var tb, tm, tc, td;
                 var muestras = 0;
                 
                 b = tb = m = tm = c = tc = d = td = 0;
                 
                 var bbcodediario = "\n[size=14][u][b]Ganancias diarias en batallas de " + options.get("playername") + "[/b][/u] [/size]\n\n";
                 
                 for(var i = keys.length-1; i >= 0; i--) {
                     b = soloN(diario_batallas.getItem(keys[i]));
                     m = soloN(diario_metal.getItem(keys[i]));
                     c = soloN(diario_cristal.getItem(keys[i]));
                     d = soloN(diario_deu.getItem(keys[i]));
                     muestras ++;
                     tb += b; tm += m; tc += c; td += d;
                     content += '<tr>';
                     content += '<td align="right"><b>' + keys[i] + '<b></td>';
                     content += '<td align="right">' + N(b) + '</td>';
                     content += '<td align="right"><p style="color:#9999ff;">' + N(m) + '</p></td>';
                     content += '<td align="right"><p style="color:#00ff00;">' + N(c) + '</p></td>';
                     content += '<td align="right"><p style="color:#ff00ff;">' + N(d) + '</p></td>';
                     content += '<td align="right">' + N(parseInt(m)+parseInt(c)+parseInt(d)) + '</td>';
                     content += '</tr>';
                     bbcodediario += keys[i] + ' [' + N(b) + ' batallas] : [color=#9999ff]' + N(m) + '[/color] Metal, [color=#00ff00]' + N(c) + '[/color] Cristal, [color=#ff00ff]' + N(d) + '[/color] Deuterio\n'
                 }
                 
                 
                 content += '<tr><td colspan="6"><br></td></tr><tr><td colspan="6"><br></td></tr><tr><td colspan="6"></td></tr><tr><td colspan="6"></td></tr>';
                 content += '<tr>';
                 content += '<td align="right"><b>TOTAL</b></td>';
                 content += '<td align="right">' + N(tb) + '</td>';
                 content += '<td align="right"><p style="color:#9999ff;">' + N(tm) + '</p></td>';
                 content += '<td align="right"><p style="color:#00ff00;">' + N(tc) + '</p></td>';
                 content += '<td align="right"><p style="color:#ff00ff;">' + N(td) + '</p></td>';
                 content += '<td align="right">' + N(parseInt(tm)+parseInt(tc)+parseInt(td)) + '</td>';
                 bbcodediario += '\nTOTAL [' + N(tb) + ' batallas] : [color=#9999ff]' + N(tm) + '[/color] Metal, [color=#00ff00]' + N(tc) + '[/color] Cristal, [color=#ff00ff]' + N(td) + '[/color] Deuterio\n'
                 content += '</tr><tr>';
                 content += '<td align="right"><b>MEDIA-DIA</b></td>';
                 content += '<td align="right">' + N(Math.floor(tb/muestras)) + '</td>';
                 content += '<td align="right"><p style="color:#9999ff;">' + N(Math.floor(tm/muestras)) + '</p></td>';
                 content += '<td align="right"><p style="color:#00ff00;">' + N(Math.floor(tc/muestras)) + '</p></td>';
                 content += '<td align="right"><p style="color:#ff00ff;">' + N(Math.floor(td/muestras)) + '</p></td>';
                 content += '<td align="right">' + N(Math.floor((parseInt(tm)+parseInt(tc)+parseInt(td))/muestras)) + '</td>';
                 bbcodediario += '[size=9]MEDIA-DIA [' + N(Math.floor(tb/muestras)) + ' batallas] : [color=#9999ff]' + N(Math.floor(tm/muestras)) + '[/color] Metal, [color=#00ff00]' + N(Math.floor(tc/muestras)) + '[/color] Cristal, [color=#ff00ff]' + N(Math.floor(td/muestras)) + '[/color] Deuterio[/size]\n'
                 content += '</tr><tr>';
                 content += '<td align="right"><b>MEDIA-BATALLA</b></td>';
                 content += '<td align="right">' + N(Math.floor(tb/tb)) + '</td>';
                 content += '<td align="right"><p style="color:#9999ff;">' + N(Math.floor(tm/tb)) + '</p></td>';
                 content += '<td align="right"><p style="color:#00ff00;">' + N(Math.floor(tc/tb)) + '</p></td>';
                 content += '<td align="right"><p style="color:#ff00ff;">' + N(Math.floor(td/tb)) + '</p></td>';
                 content += '<td align="right">' + N(Math.floor((parseInt(tm)+parseInt(tc)+parseInt(td))/tb)) + '</td>';
                 bbcodediario += '[size=9]MEDIA-BATALLA : [color=#9999ff]' + N(Math.floor(tm/tb)) + '[/color] Metal, [color=#00ff00]' + N(Math.floor(tc/tb)) + '[/color] Cristal, [color=#ff00ff]' + N(Math.floor(td/tb)) + '[/color] Deuterio[/size]\n'
                 content += '</tr>'
                 content += '<tr><td colspan="6"><br></td></tr><tr><td colspan="6"><br></td></tr><tr><td colspan="6"></td></tr><tr><td colspan="6"></td></tr>';
                 content += '<tr>';
                 content += '<td align="right"><b>RATIO-DEUTERIO</b></td>';
                 content += '<td align="right">Media</td>';
                 content += '<td align="right"><p style="color:#9999ff;">' + redondeo((tm/tb)/(td/tb),2) + '</p></td>';
                 content += '<td align="right"><p style="color:#00ff00;">' + redondeo((tc/tb)/(td/tb),2) + '</td>';
                 content += '<td align="right"><p style="color:#ff00ff;">1.00</p></td>';
                 content += '<td align="right">-</td>';
                 content += '</tr>';
                 content += '<tr>';
                 content += '<td align="right"><b>PROPORCION</b></td>';
                 content += '<td align="right">Media</td>';
                 content += '<td align="right"><p style="color:#9999ff;">' + redondeo(tm/(tm + tc + td)*100.0,2) + ' %</p></td>';
                 content += '<td align="right"><p style="color:#00ff00;">' + redondeo(tc/(tm + tc + td)*100.0,2) + ' %</p></td>';
                 content += '<td align="right"><p style="color:#ff00ff;">' + redondeo(td/(tm + tc + td)*100.0,2) + ' %</p></td>';
                 content += '<td align="right">100%</td>';
                 bbcodediario += '[size=9]PROPORCION : [color=#9999ff]' + redondeo(tm/(tm + tc + td)*100.0,2) + '%[/color] Metal, [color=#00ff00]' + redondeo(tc/(tm + tc + td)*100.0,2) + '%[/color] Cristal, [color=#ff00ff]' + redondeo(td/(tm + tc + td)*100.0,2) + '%[/color] Deuterio[/size]\n'
                 content += '</tr>';
                 content += '</table><br><br>';
                 bbcodediario += '\n[url=http://userscripts.org/scripts/show/75647]Compactador automático de batallas trusreno [1.4][/url]\n'
                 content += '<center><textarea name="bbcodediario" cols="90" rows="10" onclick="this.focus();this.select()" readonly="readonly">' + bbcodediario + '</textarea></center><br><br>'
                 content += '<br><center><a id="btn_limpiar1" href="javascript:void(0)">[reset datos]</a></center><br><br><br>';
                 content += "</div>";
                 
                 // seccion mensual
                 
                 
                 content += '<div id="div_mensual" style="background-color:#0A122A"><br>';
                 content += '<table>';
                 content += '<tr><td width="120" align="right"><b>MES</b></td><td width="120" align="right"><b>BATALLAS</b></td><td width="120" align="right"><b>METAL</b></td><td width="120" align="right"><b>CRISTAL</b></td><td width="120" align="right"><b>DEUTERIO</b></td><td width="120" align="right"><b>TOTAL</b></td></tr>';
                 
                 var mensual_metal = new HashTable();
                 mensual_metal.parse(options.get("mensual_metal"));
                 
                 var mensual_cristal = new HashTable();
                 mensual_cristal.parse(options.get("mensual_cristal"));
                 
                 var mensual_deu = new HashTable();
                 mensual_deu.parse(options.get("mensual_deu"));
                 
                 var mensual_batallas = new HashTable();
                 mensual_batallas.parse(options.get("mensual_batallas"));
                 
                 var keys = mensual_metal.keys();
                 
                 var b, m, c, d;
                 var tb, tm, tc, td;
                 var muestras = 0;
                 
                 b = tb = m = tm = c = tc = d = td = 0;
                 
                 var bbcodemensual = "\n[size=14][u][b]Ganancias mensuales en batallas de " + options.get("playername") + "[/b][/u] [/size]\n\n";;
                 
                 for(var i = keys.length-1; i >= 0; i--) {
                     b = soloN(mensual_batallas.getItem(keys[i]));
                     m = soloN(mensual_metal.getItem(keys[i]));
                     c = soloN(mensual_cristal.getItem(keys[i]));
                     d = soloN(mensual_deu.getItem(keys[i]));
                     muestras ++;
                     tb += b; tm += m; tc += c; td += d;
                     content += '<tr>';
                     content += '<td align="right"><b>' + keys[i] + '<b></td>';
                     content += '<td align="right">' + N(b) + '</td>';
                     content += '<td align="right"><p style="color:#9999ff;">' + N(m) + '</p></td>';
                     content += '<td align="right"><p style="color:#00ff00;">' + N(c) + '</p></td>';
                     content += '<td align="right"><p style="color:#ff00ff;">' + N(d) + '</p></td>';
                     content += '<td align="right">' + N(parseInt(m)+parseInt(c)+parseInt(d)) + '</td>';
                     content += '</tr>';
                     bbcodemensual += keys[i] + ' [' + N(b) + ' batallas] : [color=#9999ff]' + N(m) + '[/color] Metal, [color=#00ff00]' + N(c) + '[/color] Cristal, [color=#ff00ff]' + N(d) + '[/color] Deuterio\n'
                 }
                 
                 content += '<tr><td colspan="6"><br></td></tr><tr><td colspan="6"><br></td></tr><tr><td colspan="6"></td></tr><tr><td colspan="6"></td></tr>';
                 content += '<tr>';
                 content += '<td align="right"><b>TOTAL</b></td>';
                 content += '<td align="right">' + N(tb) + '</td>';
                 content += '<td align="right"><p style="color:#9999ff;">' + N(tm) + '</p></td>';
                 content += '<td align="right"><p style="color:#00ff00;">' + N(tc) + '</p></td>';
                 content += '<td align="right"><p style="color:#ff00ff;">' + N(td) + '</p></td>';
                 content += '<td align="right">' + N(parseInt(tm)+parseInt(tc)+parseInt(td)) + '</td>';
                 bbcodemensual += '\nTOTAL [' + N(tb) + ' batallas] : [color=#9999ff]' + N(tm) + '[/color] Metal, [color=#00ff00]' + N(tc) + '[/color] Cristal, [color=#ff00ff]' + N(td) + '[/color] Deuterio\n'
                 content += '</tr><tr>';
                 content += '<td align="right"><b>MEDIA-MES</b></td>';
                 content += '<td align="right">' + N(Math.floor(tb/muestras)) + '</td>';
                 content += '<td align="right"><p style="color:#9999ff;">' + N(Math.floor(tm/muestras)) + '</p></td>';
                 content += '<td align="right"><p style="color:#00ff00;">' + N(Math.floor(tc/muestras)) + '</p></td>';
                 content += '<td align="right"><p style="color:#ff00ff;">' + N(Math.floor(td/muestras)) + '</p></td>';
                 content += '<td align="right">' + N(Math.floor((parseInt(tm)+parseInt(tc)+parseInt(td))/muestras)) + '</td>';
                 bbcodemensual += '[size=9]MEDIA-MES [' + N(Math.floor(tb/muestras)) + ' batallas] : [color=#9999ff]' + N(Math.floor(tm/muestras)) + '[/color] Metal, [color=#00ff00]' + N(Math.floor(tc/muestras)) + '[/color] Cristal, [color=#ff00ff]' + N(Math.floor(td/muestras)) + '[/color] Deuterio[/size]\n'
                 content += '</tr><tr>';
                 content += '<td align="right"></b>MEDIA-BATALLA</b></td>';
                 content += '<td align="right">' + N(Math.floor(tb/tb)) + '</td>';
                 content += '<td align="right"><p style="color:#9999ff;">' + N(Math.floor(tm/tb)) + '</p></td>';
                 content += '<td align="right"><p style="color:#00ff00;">' + N(Math.floor(tc/tb)) + '</p></td>';
                 content += '<td align="right"><p style="color:#ff00ff;">' + N(Math.floor(td/tb)) + '</p></td>';
                 content += '<td align="right">' + N(Math.floor((parseInt(tm)+parseInt(tc)+parseInt(td))/tb)) + '</td>';
                 bbcodemensual += '[size=9]MEDIA-BATALLA : [color=#9999ff]' + N(Math.floor(tm/tb)) + '[/color] Metal, [color=#00ff00]' + N(Math.floor(tc/tb)) + '[/color] Cristal, [color=#ff00ff]' + N(Math.floor(td/tb)) + '[/color] Deuterio[/size]\n'
                 content += '</tr>';
                 content += '<tr><td colspan="6"><br></td></tr><tr><td colspan="6"><br></td></tr><tr><td colspan="6"></td></tr><tr><td colspan="6"></td></tr>';
                 content += '<tr>';
                 content += '<td align="right"><b>RATIO-DEUTERIO</b></td>';
                 content += '<td align="right">Media</td>';
                 content += '<td align="right"><p style="color:#9999ff;">' + redondeo((tm/tb)/(td/tb),2) + '</p></td>';
                 content += '<td align="right"><p style="color:#00ff00;">' + redondeo((tc/tb)/(td/tb),2) + '</td>';
                 content += '<td align="right"><p style="color:#ff00ff;">1.00</p></td>';
                 content += '<td align="right">-</td>';
                 content += '</tr>';
                 content += '<tr>';
                 content += '<td align="right"><b>PROPORCION</b></td>';
                 content += '<td align="right">Media</td>';
                 content += '<td align="right"><p style="color:#9999ff;">' + redondeo(tm/(tm + tc + td)*100.0,2) + ' %</p></td>';
                 content += '<td align="right"><p style="color:#00ff00;">' + redondeo(tc/(tm + tc + td)*100.0,2) + ' %</p></td>';
                 content += '<td align="right"><p style="color:#ff00ff;">' + redondeo(td/(tm + tc + td)*100.0,2) + ' %</p></td>';
                 content += '<td align="right">100%</td>';
                 bbcodemensual += '[size=9]PROPORCION : [color=#9999ff]' + redondeo(tm/(tm + tc + td)*100.0,2) + '%[/color] Metal, [color=#00ff00]' + redondeo(tc/(tm + tc + td)*100.0,2) + '%[/color] Cristal, [color=#ff00ff]' + redondeo(td/(tm + tc + td)*100.0,2) + '%[/color] Deuterio[/size]\n'
                 content += '</tr>';
                 content += '</table><br><br><br>';
                 bbcodemensual += '\n[url=http://userscripts.org/scripts/show/75647]Compactador automático de batallas trusreno [1.4][/url]\n'
                 content += '<center><textarea name="bbcodediario" cols="90" rows="10" onclick="this.focus();this.select()" readonly="readonly">' + bbcodemensual + '</textarea></center><br><br>'
                 content += '<br><center><a id="btn_limpiar2" href="javascript:void(0)">[reset datos]</a></center><br><br>'
                 content += "</div>";
                 
                 
                 // seccion consideraciones
                 
                 content += '<div id="div_consideraciones" style="background-color:#0A122A"><br><br>';
                 
                 content += '  * Para contabilizar la batalla hay que abrir el mensaje de batalla. (no es necesario abrir el reporte detallado)';
                 content += '<br><br>';
                 content += '  * Se suma la rentabilidad final, teniendo en cuenta perdidas, robo de recursos y recoleccion completa de escombros.';
                 content += '<br><br>';
                 content += '  * No se tiene en cuenta gastos de deuterio ni perdidas/robos de escombros.';
                 content += '<br><br>';
                 content += '  * En SAC se suma la rentabilidad total final, sin dividir entre numero miembros (sin reparto).';
                 content += '<br><br><br>'
                 content += '</div>';
                 
                 
                 
                 
                 document.getElementById('trusrenocomp_div_container').innerHTML = content;
                 addEvent(document.getElementById("btn_limpiar1"), "click", function(){limpiar_datos(1)});
                 addEvent(document.getElementById("btn_limpiar2"), "click", function(){limpiar_datos(2)});
                 addEvent(document.getElementById("mostrar_sec1").parentNode, "click", function(){mostrarSeccion(1)});
                 addEvent(document.getElementById("mostrar_sec2").parentNode, "click", function(){mostrarSeccion(2)});
                 addEvent(document.getElementById("mostrar_sec3").parentNode, "click", function(){mostrarSeccion(3)});
                 addEvent(document.getElementById("mostrar_sec4").parentNode, "click", function(){mostrarSeccion(4)});
                 mostrarSeccion(1);
                 
                 
             }
         }
         
     }
     
     
     
     // ==============================================================================================
     
     
     function limpiar_datos(tipo) {
         
         if (confirm("¿Seguro que deseas borrar la informacion almacenada de las batallas?")) {
             switch(tipo) {
                 case 1:
                     options.set("diario_timestamp_dia", (new Date()).getTime());
                     options.set("diario_metal", "");
                     options.set("diario_cristal", "");
                     options.set("diario_deu", "");
                     options.set("diario_batallas", "");
                     options.set("almacenado_dia", "");
                     ogMenu.menuButton_click();
                     ogMenu.menuButton_click();
                     mostrarSeccion(1);
                     break;
                 case 2:
                     options.set("mensual_timestamp_mes", (new Date()).getTime());
                     options.set("mensual_metal", "");
                     options.set("mensual_cristal", "");
                     options.set("mensual_deu", "");
                     options.set("mensual_batallas", "");
                     options.set("almacenado_mes", "");
                     ogMenu.menuButton_click();
                     ogMenu.menuButton_click();
                     mostrarSeccion(2);
                     break;
             }
         }
     }
     
     
     
     function addEvent (el, evt, fxn)
     {
         if (el.addEventListener)
             el.addEventListener (evt, fxn, false);
         else if (el.attachEvent)
             el.attachEvent ("on" + evt, fxn);
             else
             el ['on' + evt] = fxn;
     }
     
     
     function mostrarSeccion(seccion) {
         switch(seccion) {
             case 1:
                 document.getElementById("div_diario").style.display = "";
                 document.getElementById("div_mensual").style.display = "none";
                 document.getElementById("div_consideraciones").style.display = "none";
                 document.getElementById("mostrar_sec1").parentNode.style.backgroundColor = "#4C0B5F";
                 document.getElementById("mostrar_sec2").parentNode.style.backgroundColor = "#240B3B";
                 document.getElementById("mostrar_sec3").parentNode.style.backgroundColor = "#240B3B";
                 break;
             case 2:
                 document.getElementById("div_diario").style.display = "none";
                 document.getElementById("div_mensual").style.display = "";
                 document.getElementById("div_consideraciones").style.display = "none";
                 document.getElementById("mostrar_sec1").parentNode.style.backgroundColor = "#240B3B";
                 document.getElementById("mostrar_sec2").parentNode.style.backgroundColor = "#4C0B5F";
                 document.getElementById("mostrar_sec3").parentNode.style.backgroundColor = "#240B3B";
                 break;
             case 3:
                 document.getElementById("div_diario").style.display = "none";
                 document.getElementById("div_mensual").style.display = "none";
                 document.getElementById("div_consideraciones").style.display = "";
                 document.getElementById("mostrar_sec1").parentNode.style.backgroundColor = "#240B3B";
                 document.getElementById("mostrar_sec2").parentNode.style.backgroundColor = "#240B3B";
                 document.getElementById("mostrar_sec3").parentNode.style.backgroundColor = "#4C0B5F";
                 break;
             case 4:
                 ogMenu.menuButton_click();
                 break;
         }
         
     }
     
     
     // ==============================================================================================
     // ==============================================================================================
     // ==============================================================================================
     
     // http://www.mojavelinux.com/articles/javascript_hashes.html
     
     function HashTable(obj)
     {
         this.length = 0;
         this.items = {};
         for (var p in obj) {
             if (obj.hasOwnProperty(p)) {
                 this.items[p] = obj[p];
                 this.length++;
             }
         }
         
         this.setItem = function(key, value)
         {
             if (this.hasItem(key)) {
                 this.items[key] = parseInt(this.items[key]) + parseInt(value);
             }
             else {
                 this.length++;
                 this.items[key] = parseInt(value);
             }
         }
         
         this.getItem = function(key) {
             return this.hasItem(key) ? this.items[key] : undefined;
         }
         
         this.hasItem = function(key)
         {
             return this.items.hasOwnProperty(key);
         }
         
         this.removeItem = function(key)
         {
             if (this.hasItem(key)) {
                 previous = this.items[key];
                 this.length--;
                 delete this.items[key];
                 return previous;
             }
             else {
                 return undefined;
             }
         }
         
         this.keys = function()
         {
             var keys = [];
             for (var k in this.items) {
                 if (this.hasItem(k)) {
                     keys.push(k);
                 }
             }
             return keys;
         }
         
         this.values = function()
         {
             var values = [];
             for (var k in this.items) {
                 if (this.hasItem(k)) {
                     values.push(this.items[k]);
                 }
             }
             return values;
         }
         
         this.each = function(fn) {
             for (var k in this.items) {
                 if (this.hasItem(k)) {
                     fn(k, this.items[k]);
                 }
             }
         }
         
         this.clear = function()
         {
             this.items = {}
             this.length = 0;
         }
         
         this.getString = function() 
         {
             var str = "";
             for (var k in this.items) {
                 if (this.hasItem(k)) {
                     str += k + "=" + this.items[k] + "#";
                 }
             }
             return str;
         }
         
         this.purgue = function() 
         {
             var nlength = 0;
             var nitems = {};
             for (var k in this.items) {
                 if (this.hasItem(k)) {
                     if(parseInt((new Date()).getTime() - parseInt(this.items[k])) < 777600000) { // 9 dias
                         nlength++;
                         nitems[k] = parseInt(this.items[k]);
                     }
                 }
             }
             this.length = nlength;
             this.items = nitems;
         }
         
         this.parse = function(str) {
             this.items = {};
             this.length = 0;
             var pairs = str.split("#");
             for (var i = 0, len = pairs.length, keyVal; i < len; ++i) {
                 keyVal = pairs[i].split("=");
                 if (keyVal[0]) {
                     this.items[keyVal[0]] = keyVal[1];
                     this.length++;
                 }
             }
         }
     }     
     
     // ==============================================================================================
     // ==============================================================================================
     // ==============================================================================================
     
     
     function SAC() {
         var lstNombres = new Array();
         var lstFlotas = new Array();
         
         this.length = function() {
             return lstNombres.length
         }
         
         this.getNombre = function(n) {
             return lstNombres[n];
         }
         
         this.getFlotas = function(n) {
             var ret = null;
             if(isNaN(parseInt(n))) {
                 for(var i = 0; i < lstNombres.length; i++) {
                     if(lstNombres[i] == n) ret = lstFlotas[i];
                 }
             }
             else {
                 ret = lstFlotas[n];
             }
             return ret;
         }
         
         this.add = function (nombre, idFlota, unidades) {
             var insertado = false;
             for(var i = 0; i < lstNombres.length; i++) {
                 if(lstNombres[i] == nombre) {
                     insertado = true;
                     if(arguments.length == 3) lstFlotas[i].add(idFlota, unidades);
                 }
             }
             if(!insertado) {
                 var pos = lstNombres.length;
                 lstNombres[pos] = nombre;
                 lstFlotas[pos] = new Flota();
                 if(arguments.length == 3) lstFlotas[pos].add(idFlota, unidades);
             }
             
         }
         
         this.addSupervivientes = function(s) {
             for(var i = 0; i < s.length(); i++) {
                 var nombre = s.getNombre(i);
                 for(var j = 0; j < lstNombres.length; j++){
                     if(lstNombres[j] == nombre) 
                         lstFlotas[j].addSupervivientes(s.getFlotas(i));
                 }
                 
             }
         }
         
         this.ordenar = function() {
             for(var i = 0; i < lstNombres.length; i++) {
                 lstFlotas[i].ordenar();
             }
         }
         
         
         this.getCostePerdidas = function(id) {
             var ret = [0,0,0, 0]; // metal, cristal, deu, total
             
             if(id == -1) {
                 for(var i = 0; i < lstNombres.length; i++) {
                     var coste = lstFlotas[i].getCostePerdidas();
                     ret[0] += coste[0];
                     ret[1] += coste[1];
                     ret[2] += coste[2];
                     ret[3] += coste[3]; 
                 }
             }
             else {
                 var coste = lstFlotas[id].getCostePerdidas();
                 ret[0] += coste[0];
                 ret[1] += coste[1];
                 ret[2] += coste[2];
                 ret[3] += coste[3]; 
             }
             
             
             return ret;
         }
         
     }
     
     
     // ============================================================
     // ============================================================
     
     function Flota() {
         var idNombre = new Array();
         var nombre = new Array();
         var unidades = new Array();
         var perdidas = new Array();
         
         var datosFlota = [
             ['P.Carga','Nave pequeña de Carga', 2000,2000,0, 'P.Carga'],
             ['Gr.Carga','Nave grande de Carga', 6000,6000,0, 'Gr.Carga'],
             ['Cazador L.','Cazador ligero', 3000,1000,0, 'C.Ligero'],
             ['Cazador P.','Cazador pesado', 6000,4000,0, 'C.Pesado'],
             ['Crucero','Crucero', 20000,7000,2000, 'Crucero'],
             ['Nave de batalla','Nave de batalla', 45000,15000,0, 'NB'],
             ['Acoraz.','Acorazado', 30000,40000,15000, 'Acorazado'],
             ['Bombardero','Bombardero', 50000,25000,15000, 'Bomb.'],
             ['Destructor','Destructor', 60000,50000,15000, 'Desct.'],
             ['Est.Muerte','Estrella de la muerte', 5000000,4000000,1000000, 'EDLM'],
             ['Colonizador','Colonizador', 10000,20000,10000, 'Colono'],
             ['Reciclador.','Reciclador', 10000,6000,2000, 'Reci.'],
             ['Sonda','Sonda de espionaje', 0,1000,0, 'Sonda'],
             ['Satélite S.','Satélite Solar', 0,2000,500, 'Satelite'],
             ['Misil', 'Lanzamisiles', 2000,0,0, 'Lanzas'],
             ['Láser Peq.','Láser pequeño', 1500,500,0, 'L.Peq.'],
             ['Láser Gr.','Lase grande', 6000,2000,0, 'L.Grande'],
             ['C.Gauss','Cañón Gauss', 20000,15000,2000, 'Gauss'],
             ['C.Iónico','Cañón Iónico', 2000,6000,0, 'Ionico'],
             ['C.Plasma','Cañón de Plasma', 50000,50000,30000, 'Plasma'],
             ['Cúpula Peq.','Cúpula pequeña', 10000,10000,0, 'CupulaP'],
             ['Cúpula Gr.','Cúpula grande', 50000,50000,0, 'CupulaG']];
         
         
         this.length = function () {
             return idNombre.length;
         }
         
         this.getId = function(n) {
             return idNombre[n];
         }
         
         this.getNombre = function(n, reducido) {
             reducido = reducido || false;
             var id = idNombre[n]
             var ret = id;
             for(var i = 0; i < datosFlota.length; i++) {
                 if(id == datosFlota[i][0]) {
                     if(reducido) {
                         ret = datosFlota[i][5];
                     } else {
                         ret = datosFlota[i][1];
                     }
                 }
             }
             return ret;
         }
         
         this.getUnidades = function(n) {
             return unidades[n];
         }
         
         this.getPerdidas = function(n) {
             return perdidas[n];
         }
         
         this.add = function(id, u) {
             var insertado = false;
             for(var i = 0; i < idNombre.length; i++) {
                 if(idNombre[i] == id) {
                     insertado = true;
                     unidades[i] += parseInt(u);
                     perdidas[i] += parseInt(u);
                 }
             }
             if(!insertado) {
                 var pos = idNombre.length;
                 idNombre[pos] = id;
                 nombre[pos] = '';
                 unidades[pos] = parseInt(u);
                 perdidas[pos] = parseInt(u);
             }
         }
         
         this.addSupervivientes = function(f) {
             for(var i = 0; i < f.length(); i++) {
                 for(var j = 0; j < idNombre.length; j++) {
                     if(idNombre[j] == f.getId(i)) {
                         perdidas[j] -= parseInt(f.getUnidades(i));
                     }
                 }
             }
         }
         
         this.ordenar = function() {
             var n_idNombre = new Array();
             var n_nombre = new Array();
             var n_unidades = new Array();
             var n_perdidas = new Array();
             
             var contador = 0;
             
             for(var i = 0; i < datosFlota.length; i++) {
                 for(var j = 0; j<idNombre.length; j++) {
                     if(idNombre[j] == datosFlota[i][0]) {
                         n_idNombre[contador] = idNombre[j];
                         n_nombre[contador] = datosFlota[i][1];
                         n_unidades[contador] = unidades[j];
                         n_perdidas[contador] = perdidas[j];
                         contador++;
                     }
                 }
             }
             idNombre = n_idNombre;
             nombre = n_nombre;
             unidades = n_unidades;
             perdidas = n_perdidas;
         }
         
         
         this.getCostePerdidas = function() {
             var ret = [0,0,0, 0];
             for(var i = 0; i < idNombre.length; i++) {
                 for(var j = 0; j < datosFlota.length; j++) {
                     if(idNombre[i] == datosFlota[j][0]) {
                         ret[0] += (perdidas[i] * datosFlota[j][2]);
                         ret[1] += (perdidas[i] * datosFlota[j][3]);
                         ret[2] += (perdidas[i] * datosFlota[j][4]);
                         ret[3] += ((perdidas[i] * datosFlota[j][2]) + (perdidas[i] * datosFlota[j][3]) + (perdidas[i] * datosFlota[j][4]));
                     }
                 }
             }
             return ret;
         }
         
         
     }
     
     
     // ============================================================
     // ============================================================
     
     var op = function () {
         this.set = function(key, value) {
             return localStorage.setItem ("trusreno_" + getServer() + "_" + key, value);
         }
         
         this.get = function(key){
             var def = "";
             return localStorage.getItem ("trusreno_" + getServer() + "_" + key) || def;
         }
     } 
     var options = new op();
     
     function getServer() {
         var server = location.href;
         server = server.replace("http://", "").replace("www.", "");
         server = server.substring(0, server.indexOf("."));
         return server;
     }
     
     
     function getElementsByClass(cls) {
         var itemsfound = new Array;
         var elements = document.getElementsByTagName('*');
         for(var i=0;i<elements.length;i++){
             if(elements[i].className == cls){
                 itemsfound.push(elements[i]);
             }
         }
         return itemsfound;
     }
     
     function getElementsByClass(searchClass,node,tag) {
         var classElements = new Array();
         if (node == null) 
             node = document;
         if (tag == null) 
             tag = '*';
         var els = node.getElementsByTagName(tag);
         var elsLen = els.length;
         
         for (var i = 0, j = 0; i < elsLen; i++) {
             var sep = els[i].className.split(" ");
             var content = false;
             
             for(var k = 0; k < sep.length; k++){
                 if(sep[k] == searchClass) 
                     content = true;
             }
             
             if (els[i].className == searchClass || content) {
                 classElements[j] = els[i];
                 j++;
             }
         }
         return classElements;
     }
     
     function redondeo(numero, decimales)
     {
         if(isNaN(numero)) numero = "0";
         var flotante = parseFloat(numero);
         var resultado = Math.round(flotante*Math.pow(10,decimales))/Math.pow(10,decimales);
         return resultado;
     }
     
     function soloN(value) {
         value = Number(value);
         if (isNaN(value)) value = 0;
         return value;
     }
     
     function numeroReducido(num) {
         num = num.toString();
         num = num.replace(/\./g,'')
         num = parseInt(num);
         var numrec;
         
         var procesado = false;
         
         numrec = num/1000000000.0;
         if(Math.abs(numrec) > 1) {
             procesado = true;
             if(Math.abs(numrec)>=10) {
                 num = Math.floor(numrec) + "B";
             } else {
                 num = redondeo(numrec, 2) + "B";
             }
         }
         
         if(!procesado) {
             numrec = num/1000000.0;
             if(Math.abs(numrec) > 1) {
                 procesado = true;
                 if(Math.abs(numrec)>=10) {
                     num = Math.floor(numrec) + "M";
                 } else {
                     num = redondeo(numrec, 2) + "M";
                 }
             }
         }
         
         if(!procesado) {
             numrec = num/1000.0;
             if(Math.abs(numrec) > 1) {
                 procesado = true;
                 if(Math.abs(numrec)>=10) {
                     num = Math.floor(numrec) + "K";
                 } else {
                     num = redondeo(numrec, 2) + "K";
                 }
             }
         }
         
         return num;
     }
     
     function mostrarNumero(num) {
         var negativo = false;
         
         if(isNaN(num)) num = "0";
         
         if(parseInt(num) < 0) {
             num = parseInt(num)*-1;
             negativo = true;
         }
         
         var nNmb = String(parseInt(num)); 
         var sRes = "";
         for (var j = 0, i = nNmb.length - 1; i >= 0; i--, j++)
             sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
         
         if(negativo) sRes = '-' + sRes;    
         
         return sRes;
     }
     
     function N(num) {
         var ret = new Array();
         
         if(typeof num == 'object') {
             for(var i = 0; i < num.length; i++) {
                 ret[i] = mostrarNumero(num[i]);
             }
             return ret;
         }
         else {   
             return mostrarNumero(num);
         }
     }
     
     
     function codificar(patron, tipo, version, noCentrado) {
         noCentrado = noCentrado || false;
         var marcas = new Array();
         var url_script = SCRIPT.url;
         var txt_firma = SCRIPT.name + ' [' + SCRIPT.version + ']';
         
         if(!noCentrado) {
             patron = '{CENTER}' +  patron + '{/CENTER}';
         }
         
         
         var colores = [
             [/{COLOR_R1}/gi, '#FFCC66'],
             [/{COLOR_R2}/gi, '#9E7625'],
             [/{COLOR_R3}/gi, '#FF0000'], //escombros
             [/{COLOR_R4}/gi, '#F0EC64'], //rec.robo
             [/{COLOR_T1}/gi, '#6699FF'], // titulo 1 ("defensores", "atacantes", "perdidas", y "rentabilidad"
             [/{COLOR_A1}/gi, '#00FF40'],
             [/{COLOR_A2}/gi, '#00DDDD'],
             [/{COLOR_D1}/gi, '#ED7010'], 
             [/{COLOR_RB}/gi, '#007F22'], // resultado batalla
             [/{COLOR_RECI}/gi, '#00CC00'], // atacante reciclando
             [/{COLOR_SINRECI}/gi, '#FFFF00'], // atacante sin reciclar
             [/{COLOR_RECIDEF}/gi, '#FF6600'], // reciclando defensor
             [/{COLOR_D2}/gi, '#00DDDD']];
         
         
         if(tipo == "HTML") {
             
             marcas = [
                 [/{B}/gi, '<b>'],
                 [/{\/B}/gi, '</b>'],
                 [/{I}/gi, '<i>'],
                 [/{\/I}/gi, '</i>'],
                 [/{NL}/gi, '<br>\n'],
                 [/{CENTER}/gi, '<center>'],
                 [/{\/CENTER}/gi, '</center>'],
                 [/{SIZE_PEQ}/gi, '<font style="font-size:8pt;">'],
                 [/{SIZE_MED}/gi, '<font style="font-size:14pt;">'],
                 [/{SIZE_GRA}/gi, '<font style="font-size:18pt;">'],
                 [/{\/SIZE}/gi, '</font>'],
                 [/{\/COLOR}/gi, '</font>'] ];
             
             patron = patron.replace(/{ENLACE_SCRIPT}/gi, '<a href="' + url_script + '">' + txt_firma + '</a>');
             
             for(var i = 0; i < colores.length; i++)
                 patron = patron.replace(colores[i][0],'<font color="' + colores[i][1] + '">');
         }
         
         if(tipo == "OGame") {
             
             marcas = [
                 [/{B}/gi, '[B]'],
                 [/{\/B}/gi, '[/B]'],
                 [/{I}/gi, '[I]'],
                 [/{\/I}/gi, '[/I]'],
                 [/{NL}/gi, '\n'],
                 [/{CENTER}/gi, '[ALIGN=CENTER]'],
                 [/{\/CENTER}/gi, '[/ALIGN]'],
                 [/{SIZE_PEQ}/gi, '[SIZE=10]'],
                 [/{SIZE_MED}/gi, '[SIZE=14]'],
                 [/{SIZE_GRA}/gi, '[SIZE=18]'],
                 [/{\/SIZE}/gi, '[/SIZE]'],
                 [/{\/COLOR}/gi, '[/COLOR]'] ];
             
             patron = patron.replace(/{ENLACE_SCRIPT}/gi, '[url="' + url_script + '"]' + txt_firma + '[/URL]');
             
             for(var i = 0; i < colores.length; i++)
                 patron = patron.replace(colores[i][0],'[COLOR="' + colores[i][1] + '"]');
         }
         
         
         if(tipo == "phpBB") {
             
             marcas = [
                 [/{B}/gi, '[b]'],
                 [/{\/B}/gi, '[/b]'],
                 [/{I}/gi, '[i]'],
                 [/{\/I}/gi, '[/i]'],
                 [/{NL}/gi, '\n'],
                 [/{CENTER}/gi, '[ALIGN=CENTER]'],
                 [/{\/CENTER}/gi, '[/ALIGN]'],
                 [/{SIZE_PEQ}/gi, '[size=9]'],
                 [/{SIZE_MED}/gi, '[size=14]'],
                 [/{SIZE_GRA}/gi, '[size=18]'],
                 [/{\/SIZE}/gi, '[/size]'],
                 [/{\/COLOR}/gi, '[/color]'] ];
             
             patron = patron.replace(/{ENLACE_SCRIPT}/gi, '[url=' + url_script + ']' + txt_firma + '[/URL]');
             
             for(var i = 0; i < colores.length; i++)
                 patron = patron.replace(colores[i][0],'[color=' + colores[i][1] + ']');
         }
         
         
         if(tipo == "phpBB3") {
             
             marcas = [
                 [/{B}/gi, '[b]'],
                 [/{\/B}/gi, '[/b]'],
                 [/{I}/gi, '[i]'],
                 [/{\/I}/gi, '[/i]'],
                 [/{NL}/gi, '\n'],
                 [/{CENTER}/gi, '[center]'],
                 [/{\/CENTER}/gi, '[/center]'],
                 [/{SIZE_PEQ}/gi, '[size=90]'],
                 [/{SIZE_MED}/gi, '[size=140]'],
                 [/{SIZE_GRA}/gi, '[size=180]'],
                 [/{\/SIZE}/gi, '[/size]'],
                 [/{\/COLOR}/gi, '[/color]'] ];
             
             patron = patron.replace(/{ENLACE_SCRIPT}/gi, '[url=' + url_script + ']' + txt_firma + '[/URL]');
             
             for(var i = 0; i < colores.length; i++)
                 patron = patron.replace(colores[i][0],'[color=' + colores[i][1] + ']');
         }
         
         
         for(var i = 0; i < marcas.length; i++)
             patron = patron.replace(marcas[i][0],marcas[i][1]);
         
         
         return patron;
     }
     
     
     
     // ============================================================
     // ============================================================
     
     
     function getLuna() {
         var salida = "";
         var ret = new Array();
         
         var cresult = document.getElementById('combat_result');
         
         var str_luna = getElementsByClass('action',cresult)[1].innerHTML.split('<br>');
         if(str_luna.length >= 5) {
             salida =  str_luna[3].replace(/(^s*)|(s*$)/g,"");
         }
         
         if(str_luna.length >= 6) { 
             if(str_luna[4].indexOf("lunar") != -1) {
                 salida += '{NL}' + str_luna[4].replace(/(^s*)|(s*$)/g,"");
             }
         }
         
         return salida;    
     }
     
     
     function getEscombros() {
         var ret = new Array();
         var cresult = document.getElementById('combat_result');
         var str_escombros = getElementsByClass('action',cresult)[1].innerHTML.split('<br>')[2];
         ret[0] = parseInt(str_escombros.split('y')[0].replace(/\D*/g,''));
         ret[1] = parseInt(str_escombros.split('y')[1].replace(/\D*/g,''));
         ret[2] = parseInt(ret[0]) + parseInt(ret[1]);
         return ret;    
     }
     
     function getCaptura() {
         var ret = [0, 0, 0, 0];
         
         if(getMensajeConclusion().indexOf("atacante") != -1) {
             var cresult = document.getElementById('combat_result');
             var str_captura = getElementsByClass('action',cresult)[0].innerHTML;
             var str_metal = str_captura.substring(str_captura.indexOf('captura'), str_captura.indexOf('Metal'));
             var str_cristal = str_captura.substring(str_captura.indexOf(','), str_captura.indexOf('Cristal'));
             var str_deu = str_captura.substring(str_captura.indexOf('y'), str_captura.indexOf('Deuterio'));
             
             if(str_metal.length == 0) str_metal = '0';
             if(str_cristal.length == 0) str_cristal = '0';
             if(str_deu.length == 0) str_deu = "0";
             
             ret[0] = parseInt(str_metal.replace(/\D/g,''));
             ret[1] = parseInt(str_cristal.replace(/\D/g,''));
             ret[2] = parseInt(str_deu.replace(/\D/g,''));
             ret[3] = parseInt(ret[0]) + parseInt(ret[1]) + parseInt(ret[2]);
         }
         
         return ret;
     }
     
     
     function getFecha() {
         var strFecha = getElementsByClass("start")[0].innerHTML;
         strFecha = strFecha.substring(strFecha.indexOf('(')+1, strFecha.indexOf(')'));
         var fecha = strFecha.split(" ")[0];
         var hora = strFecha.split(" ")[1];
         return fecha;
     }
     
     function getHora() {
         var strFecha = getElementsByClass("start")[0].innerHTML;
         strFecha = strFecha.substring(strFecha.indexOf('(')+1, strFecha.indexOf(')'));
         var fecha = strFecha.split(" ")[0];
         var hora = strFecha.split(" ")[1];
         return hora;
     }
     
     
     function getMensajeConclusion() {
         var ret = '';
         var cresult = document.getElementById('combat_result');
         var str = getElementsByClass('action',cresult)[0].innerHTML;
         
         if(str.indexOf('atacante') != -1)
             ret = '¡El atacante ha ganado la batalla!';
         
         if(str.indexOf('defensor') != -1)
             ret = '¡El defensor ha ganado la batalla!';
         
         if(str.indexOf('empate') != -1)
             ret = '¡La batalla ha terminado en empate!';
         
         
         return ret;
     }
     
     
     function calcularRecicladores(escombros) {
         if(escombros > 0) 
             return (parseInt(escombros)/20000)+1;
         else
             return 0;
     }
     
     
     function getRondas() {
         var rondas = new Array;
         
         var item = getElementsByClass("combat_round");
         
         for(var i = 0; i < item.length; i++) {
             var insertado = false;
             for(var r = 0; r < rondas.length && !insertado; r++) {
                 if(item[i].innerHTML == rondas[r].innerHTML) {
                     insertado = true;
                 }
             }
             if(!insertado) {
                 rondas.push(item[i]);
             }
         }
         
         return (rondas);
     }
     
     
     function getCuadrosBBCode(patron, patronCC, titulo) {
         
         var html = "";
         
         // cuadros de texto
         html += '<table cellspacing="0" cellpadding="0">';
         html += '<b><font color=#FE9A2E>Titulo:</font></b><br>';
         html += '<tr><td colspan="2"><input type="text" size="80" style="background-color:#1F273C;border: 2px solid #FFFFFF;color:#FFFFFF" onclick="this.focus();this.select()" readonly="readonly" value="' + titulo + '">';
         html += '<br><br>';
         html += '</td><td>'
         html += '<tr><td>'
         // foro ogame
         html += '<b><font color=#FE9A2E>Foro OGame:</font></b><br>';
         html += '<textarea style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onclick="this.focus();this.select()" readonly="readonly">';
         html += codificar(patron, "OGame", SCRIPT.version);
         html += '</textarea><br><br>';
         html += '</td><td>'
         // foro phpBB
         html += '<b><font color=#FE9A2E>Foro phpBB:</font></b><br>';
         html += '<textarea style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onclick="this.focus();this.select()" readonly="readonly">';
         html += codificar(patron, "phpBB", SCRIPT.version);
         html += '</textarea><br><br>';
         html += '</td></tr><tr><td>'
         // foro phpBB3
         html += '<b><font color=#FE9A2E>Foro phpBB 3:</font></b><br>';
         html += '<textarea style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onclick="this.focus();this.select()" readonly="readonly">';
         html += codificar(patron, "phpBB3", SCRIPT.version);
         html += '</textarea><br><br>';
         html += '</td><td>'
         // html
         html += '<b><font color=#FE9A2E>HTML:</font></b><br>';
         html += '<textarea style="background-color:#1F273C;width:200px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onclick="this.focus();this.select()" readonly="readonly">';
         html += codificar(patron, "HTML", SCRIPT.version);
         html += '</textarea><br><br>';
         html += '</td></tr>'
         // bbcode-cc
         html += '<tr><td colspan="2">'
         html += '<b><font color=#FE9A2E>Version reducida (para correo circular):</font></b><br>';
         html += '<textarea style="background-color:#1F273C;width:400px;height:100px;border: 2px solid #FFFFFF;color:#FFFFFF" onclick="this.focus();this.select()" readonly="readonly">';
         html += codificar(patronCC, "phpBB", SCRIPT.version, true);
         html += '</textarea><br><br>';
         html += '</td></tr></table>';
         return html;
         
     }
     
     // ============================================================
     // ============================================================
     
     function getColumnas(tabla){
         return tabla.rows[0].cells.length;
     }
     
     function getFilas(tabla){
         return tabla.rows.length;
     }
     
     function getContenido(tabla, fila, col)
     {
         var rowElem = tabla.rows[fila];
         var tdValue = rowElem.cells[col].innerHTML;
         return tdValue;
     }
     
     
     // ============================================================
     
     
     
     function getFlotas(numRonda, ataque) {
         
         var ret = new SAC();
         
         var cround = getRondas();
         var maxRondas = cround.length-1;
         
         if(ronda > maxRondas) return 0 // excede el num de rondas
         
         var idTipoBando = (ataque)? 'round_attacker':'round_defender'; // ronda de ataque o defensa
         
         var ronda = cround[numRonda];
         
         var rondaBando = getElementsByClass(idTipoBando, ronda)[0];
         var newBack = getElementsByClass("newBack", rondaBando);
         
         for(var i = 0; i < newBack.length ; i++ ) {
             var destroyed = getElementsByClass("destroyed", newBack[i])[0];
             if(typeof destroyed != 'undefined') {
                 var nombre = destroyed.innerHTML;
                 nombre = nombre.replace('El defensor ', '');
                 nombre = nombre.replace('ha sido destruido.', '');
                 ret.add(nombre);
             }
             else {
                 
                 var nombre = getElementsByClass("name", newBack[i])[0].firstChild.textContent;
                 var tabla = newBack[i].getElementsByTagName("TABLE")[0];
                 
                 nombre = nombre.replace('Atacante ', '');
                 nombre = nombre.replace('Defensor ', '');
                 
                 for(var j = 1; j < getColumnas(tabla); j++) {
                     nave = getContenido(tabla, 0, j);
                     cantidad = getContenido(tabla, 1, j).replace(/\./gi, '');
                     ret.add(nombre, nave, cantidad);
                 }
             }
         }
         
         
         return ret;
     }
     
     
     // ============================================================
     
     function compactar()  {
         
         var comp = document.getElementById("compactado");
         if (comp != null ) return 0;
         
         if( getElementsByClass('combat_round') == null) return 0;
         
         var patron = ''; 
         var patronCC = '';
         var compactador = document.createElement('div');  
         
         
         var rondas = getRondas();
         var numRondas = rondas.length-1;
         
         // atacantes
         var lstAtaq = getFlotas(0, true);
         var lstAtaq_final = getFlotas(numRondas, true);
         lstAtaq.addSupervivientes(lstAtaq_final);
         
         
         // defensores
         var lstDef = getFlotas(0, false);        
         var lstDef_final = getFlotas(numRondas, false);
         lstDef.addSupervivientes(lstDef_final);
         
         
         lstAtaq.ordenar();
         lstDef.ordenar();
         
         // *****************************************************************************************************************
         // titulo batalla
         
         var tituloBatalla = "";
         
         for(var i = 0; i < lstAtaq.length(); i++){
             if (i != 0) patronMini += ' &amp; ';
             tituloBatalla  += lstAtaq.getNombre(i);
         }
         
         tituloBatalla += ' .vs. ';
         
         for(var i = 0; i < lstDef.length(); i++){
             if (i != 0) patronMini += ' &amp; ';
             tituloBatalla += lstDef.getNombre(i);
         }
         
         
         
         
         // *****************************************************************************************************************
         // ***** GENERA PATRON *********************************************************************************************
         
         var iddefensores = "";
         
         patron = '';
         
         if(numRondas < 1) numRondas= 1;
         
         if(numRondas == 1) {
             patron += '{SIZE_PEQ}La batalla duró 1 ronda el día ' + getFecha() + '{/SIZE}{NL}';
         }
         else {
             patron += '{SIZE_PEQ}La batalla duró ' + numRondas + ' rondas el día ' + getFecha() + '{/SIZE}{NL}';
         }
         
         patronCC += getFecha() + '{NL}';
         
         
         // ATACANTES
         patron += '{COLOR_T1}{B}{SIZE_GRA}Atacantes (' + lstAtaq.length() + '):{/SIZE}{/B}{/COLOR}{NL}';
         patronCC += 'Atacantes (' + lstAtaq.length() + '):{NL}';
         
         for(var i = 0; i < lstAtaq.length(); i++){
             patron += '{COLOR_A1}{B}{SIZE_MED}'+ lstAtaq.getNombre(i) + '{/SIZE}{/B}{/COLOR}{NL}';
             patronCC += '{COLOR_A1}'+ lstAtaq.getNombre(i) + '{/COLOR}{NL}';
             for(var j = 0; j < lstAtaq.getFlotas(i).length(); j++) {
                 var nombre = lstAtaq.getFlotas(i).getNombre(j);
                 var unidades = N(lstAtaq.getFlotas(i).getUnidades(j));
                 var perdidas = N(lstAtaq.getFlotas(i).getPerdidas(j));
                 patron += nombre + " {COLOR_A1}" + unidades + "{/COLOR} {COLOR_A2}perdió " + perdidas +  "{/COLOR}{NL}";
                 patronCC += lstAtaq.getFlotas(i).getNombre(j, true) + " {B}" + unidades + "{/B} ( -" + perdidas +  " ){NL}";
             }
             patron += '{NL}';
             
             if(lstAtaq.getCostePerdidas(i)[3] != 0) {    
                 var coste = N(lstAtaq.getCostePerdidas(i));
                 patron += 'Pérdidas: {COLOR_R1}' + coste[3] + '{/COLOR}{NL}';
                 patron += '( {COLOR_R2}' + coste[0] + '{/COLOR} Metal, {COLOR_R2}' + coste[1] + '{/COLOR} Cristal, {COLOR_R2}' + coste[2] + '{/COLOR} Deuterio ){NL}{NL}';
                 patronCC += 'Pérdidas: {COLOR_R1}' + numeroReducido(coste[3]) + '{/COLOR}';
                 patronCC += ' ({COLOR_R2}' + numeroReducido(coste[0]) + '{/COLOR} M, {COLOR_R2}' + numeroReducido(coste[1]) + '{/COLOR} C, {COLOR_R2}' + numeroReducido(coste[2]) + '{/COLOR} D ){NL}{NL}';
             }
             
         }
         
         
         
         // DEFENSOR
         patron += '{COLOR_T1}{B}{SIZE_GRA}Defensores (' + lstDef.length() + '):{/SIZE}{/B}{/COLOR} {NL}';
         patronCC += 'Defensores (' + lstDef.length() + '):{NL}';
         
         for(var i = 0; i < lstDef.length(); i++){
             patron += '{COLOR_D1}{B}{SIZE_MED}'+ lstDef.getNombre(i) + '{/SIZE}{/B}{/COLOR}{NL}';
             patronCC += '{COLOR_D1}'+ lstDef.getNombre(i) + '{/COLOR}{NL}';
             for(var j = 0; j < lstDef.getFlotas(i).length(); j++) {
                 var nombre = lstDef.getFlotas(i).getNombre(j);
                 var unidades = N(lstDef.getFlotas(i).getUnidades(j));
                 var perdidas = N(lstDef.getFlotas(i).getPerdidas(j));
                 patron += nombre + " {COLOR_D1}" + unidades + "{/COLOR} {COLOR_D2}perdió " + perdidas +  "{/COLOR}{NL}";
                 patronCC += lstDef.getFlotas(i).getNombre(j, true) + " {B}" + unidades + "{/B} ( -" + perdidas +  " ){NL}";
             }
             
             if(lstDef.getFlotas(i).length() == 0) {
                 patron += "{I}Sin defensas{/I}{NL}";
                 patronCC += "{I}Sin defensas{/I}{NL}";
             }
             
             patron += '{NL}';
             
             if(lstDef.getCostePerdidas(i)[3] != 0) {
                 var coste = N(lstDef.getCostePerdidas(i));
                 patron += 'Pérdidas: {COLOR_R1}' + coste[3] + '{/COLOR}{NL}';
                 patron += '( {COLOR_R2}' + coste[0] + '{/COLOR} Metal, {COLOR_R2}' + coste[1] + '{/COLOR} Cristal, {COLOR_R2}' + coste[2] + '{/COLOR} Deuterio ){NL}{NL}';
                 patronCC += 'Pérdidas: {COLOR_R1}' + numeroReducido(coste[3]) + '{/COLOR}';
                 patronCC += '({COLOR_R2}' + numeroReducido(coste[0]) + '{/COLOR} M, {COLOR_R2}' + numeroReducido(coste[1]) + '{/COLOR} C, {COLOR_R2}' + numeroReducido(coste[2]) + '{/COLOR} D ){NL}{NL}';
             }
         }
         
         patron += '{SIZE_MED}{COLOR_RB}{B}' + getMensajeConclusion() + '{/B}{/COLOR}{/SIZE}{NL}{NL}';
         patronCC += '{COLOR_RB}{B}' + getMensajeConclusion() + '{/B}{/COLOR}{NL}{NL}';
         
         
         
         // RESUMEN (robos, escombros, perdidas, rentabilidad...)
         
         
         var perdidasAtaq = lstAtaq.getCostePerdidas(-1);
         var perdidasDef = lstDef.getCostePerdidas(-1);
         var N_perdidasAtaq = N(perdidasAtaq);
         var N_perdidasDef = N(perdidasDef);
         
         var perdidasTotales = new Array();
         perdidasTotales[0] = (perdidasAtaq[0] + perdidasDef[0]);
         perdidasTotales[1] = (perdidasAtaq[1] + perdidasDef[1]);
         perdidasTotales[2] = (perdidasAtaq[2] + perdidasDef[2]);
         perdidasTotales[3] = (perdidasAtaq[0] + perdidasDef[0]) + (perdidasAtaq[1] + perdidasDef[1]) + (perdidasAtaq[2] + perdidasDef[2]);
         var N_perdidasTotales = N(perdidasTotales);
         
         
         var escombros = getEscombros();
         var N_escombros = N(escombros);
         
         var captura = getCaptura();
         var N_captura = N(captura); 
         
         
         // RENTABILIDAD Y PORCENTAJE: ATACANTE CON RECICLAJE
         var renta_ataq_conReci = new Array();
         renta_ataq_conReci[0] = (-1*perdidasAtaq[0])+captura[0]+escombros[0];
         renta_ataq_conReci[1] = (-1*perdidasAtaq[1])+captura[1]+escombros[1];
         renta_ataq_conReci[2] = (-1*perdidasAtaq[2])+captura[2];
         renta_ataq_conReci[3] = (-1*perdidasAtaq[3])+captura[3]+escombros[2];
         var N_renta_ataq_conReci = N(renta_ataq_conReci);
         
         var p_renta_ataq_conReci = new Array();
         p_renta_ataq_conReci[3] = Math.floor((renta_ataq_conReci[3]/perdidasAtaq[3])*100);
         p_renta_ataq_conReci[0] = Math.floor((renta_ataq_conReci[0]/perdidasAtaq[0])*100);
         p_renta_ataq_conReci[1] = Math.floor((renta_ataq_conReci[1]/perdidasAtaq[1])*100);
         p_renta_ataq_conReci[2] = Math.floor((renta_ataq_conReci[2]/perdidasAtaq[2])*100);
         var p_renta_ataq_conReci = N(p_renta_ataq_conReci);
         
         
         // RENTABILIDAD Y PORCENTAJE: ATACANTE SIN RECICLAJE
         var renta_ataq_sinReci = new Array();
         renta_ataq_sinReci[0] = (-1*perdidasAtaq[0])+captura[0];
         renta_ataq_sinReci[1] = (-1*perdidasAtaq[1])+captura[1];
         renta_ataq_sinReci[2] = (-1*perdidasAtaq[2])+captura[2];
         renta_ataq_sinReci[3] = (-1*perdidasAtaq[3])+captura[3];
         var N_renta_ataq_sinReci = N(renta_ataq_sinReci);
         
         var p_renta_ataq_sinReci = new Array();
         p_renta_ataq_sinReci[3] = Math.floor((renta_ataq_sinReci[3]/perdidasAtaq[3])*100);
         p_renta_ataq_sinReci[0] = Math.floor((renta_ataq_sinReci[0]/perdidasAtaq[0])*100);
         p_renta_ataq_sinReci[1] = Math.floor((renta_ataq_sinReci[1]/perdidasAtaq[1])*100);
         p_renta_ataq_sinReci[2] = Math.floor((renta_ataq_sinReci[2]/perdidasAtaq[2])*100);
         p_renta_ataq_sinReci = N(p_renta_ataq_sinReci);
         
         
         // RENTABILIDAD Y PORCENTAJE: DEFENSOR CON RECICLAJE
         var renta_def_conReci = new Array();
         renta_def_conReci[0] = (-1*perdidasDef[0])+escombros[0];
         renta_def_conReci[1] = (-1*perdidasDef[1])+escombros[1];
         renta_def_conReci[2] = (-1*perdidasDef[2]);
         renta_def_conReci[3] = (-1*perdidasDef[3])+escombros[2];
         var N_renta_def_conReci = N(renta_def_conReci);
         
         var p_renta_def_conReci = new Array();
         p_renta_def_conReci[3] = Math.floor((renta_def_conReci[3]/perdidasDef[3])*100);
         p_renta_def_conReci[0] = Math.floor((renta_def_conReci[0]/perdidasDef[0])*100);
         p_renta_def_conReci[1] = Math.floor((renta_def_conReci[1]/perdidasDef[1])*100);
         p_renta_def_conReci[2] = Math.floor((renta_def_conReci[2]/perdidasDef[2])*100);
         p_renta_def_conReci = N(p_renta_def_conReci);
         
         
         
         patron += '{B}Robo:{/B} {COLOR_R4}{SIZE_MED}' + N_captura[0] + '{/SIZE}{/COLOR} Metal, {COLOR_R4}{SIZE_MED}' + N_captura[1] + '{/SIZE}{/COLOR} Cristal y {COLOR_R4}{SIZE_MED}' + N_captura[2] + '{/SIZE}{/COLOR} Deuterio{NL}';
         patron += '{B}Escombros:{/B} {COLOR_R3}{SIZE_GRA}{B}' + N_escombros[0] + '{/B}{/SIZE}{/COLOR} Metal y {COLOR_R3}{SIZE_GRA}{B}' +  N_escombros[1] + '{/B}{/SIZE}{/COLOR} Cristal ( {COLOR_R3}'   + N(calcularRecicladores(escombros[2])) + "{/COLOR} recicladores ){NL}";
         patron += '{NL}{NL}';
         patron += '{COLOR_T1}PÉRDIDAS{/COLOR} Atacantes: {COLOR_R1}' + N_perdidasAtaq[3] + '{/COLOR}{NL}';
         patron += '( {COLOR_R2}' + N_perdidasAtaq[0] + "{/COLOR} metal , {COLOR_R2}" + N_perdidasAtaq[1] + "{/COLOR} cristal, {COLOR_R2}" + N_perdidasAtaq[2] + "{/COLOR} deuterio ){NL}{NL}";
         patron += '{COLOR_T1}PÉRDIDAS{/COLOR} Defensores: {COLOR_R1}' + N_perdidasDef[3] + '{/COLOR}{NL}';
         patron += '( {COLOR_R2}' + N_perdidasDef[0] + "{/COLOR} metal , {COLOR_R2}" + N_perdidasDef[1] + "{/COLOR} cristal, {COLOR_R2}" + N_perdidasDef[2] + "{/COLOR} deuterio ){NL}{NL}";
         patron += '{NL}';
         
         patronCC += '{B}Robo:{/B} {COLOR_R4}' + numeroReducido(N_captura[0]) + '{/COLOR} M, {COLOR_R4}' + numeroReducido(N_captura[1]) + '{/COLOR} C y {COLOR_R4}' + numeroReducido(N_captura[2]) + '{/COLOR} D{NL}';
         patronCC += '{B}Escombros:{/B} {COLOR_R3}{B}' + numeroReducido(N_escombros[0]) + '{/B}{/COLOR} M y {COLOR_R3}{B}' + numeroReducido(N_escombros[1]) + '{/B}{/COLOR} C ( {COLOR_R3}' + N(calcularRecicladores(escombros[2])) + "{/COLOR} recis ){NL}";
         patronCC += '{NL}{NL}';
         
         
         if(escombros[2] > 0) {
             patron += '{COLOR_T1}{SIZE_MED}{B}RENTABILIDAD{/B}{/SIZE}{/COLOR} Atacantes {COLOR_RECI}reciclando{/COLOR}: {COLOR_R1}{B}' + N_renta_ataq_conReci[3] + '{/B}{/COLOR} [' + p_renta_ataq_conReci[3] + '%]{NL}';
             patron += 'Metal: {COLOR_R2}' + N_renta_ataq_conReci[0]  + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_conReci[0] + '%]{/SIZE}{NL}';
             patron += 'Cristal: {COLOR_R2}' +  N_renta_ataq_conReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_conReci[1] + '%]{/SIZE}{NL}';
             patron += 'Deuterio: {COLOR_R2}' +  N_renta_ataq_conReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_conReci[2] + '%]{/SIZE}{NL}';
             patronCC += '{COLOR_T1}{SIZE_MED}{B}RENTA{/B}{/SIZE}{/COLOR} Atacantes reciclando: {COLOR_R1}{B}' + numeroReducido(N_renta_ataq_conReci[3]) + '{/B}{/COLOR} [' + p_renta_ataq_conReci[3] + '%]{NL}';
             patronCC += 'M: {COLOR_R2}' + numeroReducido(N_renta_ataq_conReci[0])  + '{/COLOR}, ';
             patronCC += 'C: {COLOR_R2}' +  numeroReducido(N_renta_ataq_conReci[1]) + '{/COLOR}, ';
             patronCC += 'D: {COLOR_R2}' +  numeroReducido(N_renta_ataq_conReci[2]) + '{/COLOR}{NL}';
             
             patron += '{COLOR_T1}{SIZE_MED}{B}RENTABILIDAD{/B}{/SIZE}{/COLOR} Atacantes {COLOR_SINRECI}sin reciclar{/COLOR}: {COLOR_R1}{B}' + N_renta_ataq_sinReci[3] + '{/B}{/COLOR} [' + p_renta_ataq_sinReci[3] + '%]{NL}';
             patron += 'Metal: {COLOR_R2}' +  N_renta_ataq_sinReci[0] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[0] + '%]{/SIZE}{NL}';
             patron += 'Cristal: {COLOR_R2}' +  N_renta_ataq_sinReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[1] + '%]{/SIZE}{NL}';
             patron += 'Deuterio: {COLOR_R2}' +  N_renta_ataq_sinReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[2] + '%]{/SIZE}{NL}';
             patronCC += '{COLOR_T1}{SIZE_MED}{B}RENTA{/B}{/SIZE}{/COLOR} Atacantes sin reciclar: {COLOR_R1}{B}' + numeroReducido(N_renta_ataq_sinReci[3]) + '{/B}{/COLOR} [' + p_renta_ataq_sinReci[3] + '%]{NL}';
             patronCC += 'M: {COLOR_R2}' + numeroReducido(N_renta_ataq_sinReci[0]) + '{/COLOR}, ';
             patronCC += 'C: {COLOR_R2}' +  numeroReducido(N_renta_ataq_sinReci[1]) + '{/COLOR}, ';
             patronCC += 'D: {COLOR_R2}' +  numeroReducido(N_renta_ataq_sinReci[2]) + '{/COLOR}{NL}';
             
             patron += '{COLOR_T1}{SIZE_MED}{B}RENTABILIDAD{/B}{/SIZE}{/COLOR} Defensores {COLOR_RECIDEF}reciclando{/COLOR}: {COLOR_R1}{B}' + N_renta_def_conReci[3] + '{/B}{/COLOR} [' + p_renta_def_conReci[3] + '%]{NL}';
             patron += 'Metal: {COLOR_R2}' +  N_renta_def_conReci[0] + '{/COLOR} {SIZE_PEQ}[' + p_renta_def_conReci[0] + '%]{/SIZE}{NL}';
             patron += 'Cristal: {COLOR_R2}' +  N_renta_def_conReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_def_conReci[1] + '%]{/SIZE}{NL}';
             patron += 'Deuterio: {COLOR_R2}' +  N_renta_def_conReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_def_conReci[2] + '%]{/SIZE}{NL}';
             patronCC += '{COLOR_T1}{SIZE_MED}{B}RENTA{/B}{/SIZE}{/COLOR} Defensores reciclando: {COLOR_R1}{B}' + numeroReducido(N_renta_def_conReci[3]) + '{/B}{/COLOR} [' + p_renta_def_conReci[3] + '%]{NL}';
             patronCC += 'M: {COLOR_R2}' +  numeroReducido(N_renta_def_conReci[0]) + '{/COLOR}, ';
             patronCC += 'C: {COLOR_R2}' +  numeroReducido(N_renta_def_conReci[1]) + '{/COLOR}, ';
             patronCC += 'D: {COLOR_R2}' +  numeroReducido(N_renta_def_conReci[2]) + '{/COLOR}{NL}';
         }
         else {
             patron += '{COLOR_T1}{B}RENTABILIDAD{/B}{/COLOR} Atacantes {COLOR_R1}' + N_renta_ataq_sinReci[3] + '{/COLOR} [' + p_renta_ataq_sinReci[3] + '%]{NL}';
             patron += 'Metal: {COLOR_R2}' +  N_renta_ataq_sinReci[0] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[0] + '%]{/SIZE}{NL}';
             patron += 'Cristal: {COLOR_R2}' +  N_renta_ataq_sinReci[1] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[1] + '%]{/SIZE}{NL}';
             patron += 'Deuterio: {COLOR_R2}' +  N_renta_ataq_sinReci[2] + '{/COLOR} {SIZE_PEQ}[' + p_renta_ataq_sinReci[2] + '%]{/SIZE}{NL}';
             patronCC += '{COLOR_T1}{B}RENTA{/B}{/COLOR} Atacantes {COLOR_R1}' + numeroReducido(N_renta_ataq_sinReci[3]) + '{/COLOR} [' + p_renta_ataq_sinReci[3] + '%]{NL}';
             patronCC += 'M: {COLOR_R2}' +  numeroReducido(N_renta_ataq_sinReci[0]) + '{/COLOR}, ';
             patronCC += 'C: {COLOR_R2}' +  numeroReducido(N_renta_ataq_sinReci[1]) + '{/COLOR}, ';
             patronCC += 'D: {COLOR_R2}' +  numeroReducido(N_renta_ataq_sinReci[2]) + '{/COLOR}{NL}';
         }
         
         // si rentabilidad = infinita, lo cambia por MAX
         patron = patron.replace(/infinity\%/gi, "Máx.");
         patron = patron.replace(/NaN\%/gi, "Máx.");
         patronCC = patronCC.replace(/infinity\%/gi, "Máx.");
         patronCC = patronCC.replace(/NaN\%/gi, "Máx.");
         
         
         if(getLuna().length > 4) {
             patron += '{NL}' + getLuna() + '{NL}';
             patronCC += '{NL}' + getLuna() + '{NL}';
         }
         
         
         patron += '{NL}{SIZE_MED} Perdidas {COLOR_T1}TOTALES{/COLOR}: {B}{COLOR_R3}' + N(perdidasTotales[3]) + '{/COLOR}{/B}{/SIZE}{NL}';
         patron += '{NL}{SIZE_PEQ}{ENLACE_SCRIPT}{/SIZE}{NL}'; 
         patronCC += '{NL}Perdidas {COLOR_T1}TOTALES{/COLOR}: {B}{COLOR_R3}' + numeroReducido(N(perdidasTotales[3])) + '{/COLOR}{/B}{NL}';
         patronCC += '{NL}{SIZE_PEQ}{ENLACE_SCRIPT}{/SIZE}{NL}'; 
         
         
         // *****************************************************************************************************************
         // ***** PATRON MINI ***********************************************************************************************
         
         
         var patronMini = "{COLOR_T1}{B}Ataque-Granjeo{/B}{/COLOR} [ {COLOR_A1}";
         patronMini += tituloBatalla;
         patronMini +=  '{/COLOR} ]{NL}{COLOR_T1}{B}Renta atacante: {/B}{/COLOR} {COLOR_R4}' + N_renta_ataq_conReci[0] + '{/COLOR} Metal, {COLOR_R4}' + N_renta_ataq_conReci[1] + '{/COLOR} Cristal, {COLOR_R4}' + N_renta_ataq_conReci[2] + '{/COLOR} Deuterio {NL}'; 
         
         
         
         // *** perdidas totales para titulo
         var procesado = false;
         var pt = perdidasTotales[3];
         
         
         if(!procesado && pt > 1000000000) {
             pt = redondeo(pt/1000000000, 2) + " B";
             procesado = true;
         }
         
         if(!procesado && pt > 1000000) {
             pt = redondeo(pt/1000000, 2) + " M";
             procesado = true;
         }
         
         if(!procesado && pt > 1000) {
             pt = redondeo(pt/1000, 2) + " K";
             procesado = true;
         }
         
         tituloBatalla += "{PT " + pt + " }";
         
         
         // *****************************************************************************************************************
         // ***** MOSTRAR ***************************************************************************************************
         
         var html = '';
         
         html += '<div style="font-size:14px;font-family:Verdana,sans-serif;"><br>';
         html +=  '<br><center><table border="0" width="90%" style="">';
         html += '<tr><td colspan="2" height="450" bgcolor="#1F273C" style="border: 2px solid #FFFFFF;"><br><br>'
         html += '<div id="codHTML">' + codificar(patron, 'HTML', SCRIPT.version) + '<br></div>';
         html += '</td></tr>';
         html += '<tr><td><br>' + btndonate + '</td></tr>';
         html += '<tr><td><br><center>';
         html += getCuadrosBBCode(patron, patronCC, tituloBatalla);
         html += '</center></td></tr></table></center><br>'
         
         
         
         // patron mini
         //cabecera
         html +=  '<div><table border="0" width="100%" style="">';
         html += '<tr><td colspan="2" height="30" bgcolor="#000000" style="border: 2px solid #000000;">';
         html += '<p align="center"><font style="font-size:12pt;" color="#FF6600">';
         html += '<b>COMPACTADO MINIMO</b>';
         html += '</font></p></td></tr></table></div>';
         html +=  '<br><center><table border="0" width="90%" style="">';
         html += '<tr><td colspan="2" height="100" bgcolor="#1F273C" style="border: 2px solid #FFFFFF;"><br><br>'
         html += '<div id="codHTML">' + codificar(patronMini, 'HTML', SCRIPT.version) + '</div>';
         html += '</td></tr>';
         html += '<tr><td><br><center>';
         html += getCuadrosBBCode(patronMini, patronMini, tituloBatalla);
         html += '</center></td></tr></table></center><br>'
         html += '</div>';
         
         compactador.innerHTML = html;
         master = getElementsByClass("combatreport")[0];
         
         
         
         if (!(typeof(master) === "undefined")) {
             compactador.innerHTML = compactador.innerHTML + master.innerHTML;
             master.innerHTML = compactador.innerHTML;
             master.id = "compactado";
         }
         
         
         // historico ganancias batallas
         
         var renta = renta_ataq_conReci;
         var playername = options.get("playername");
         for(var i = 0; i < lstDef.length(); i++){
             if(lstDef.getNombre(i).trim() == playername) {
                 renta = renta_def_conReci;
             }
         }
         
         var tests = Array.filter( document.getElementsByClassName('infohead'), function(elem){
             var divganancia = document.getElementById("resumengananciabatalla");
             var htmlganancia = '<table><tr><th scope="row">+GananciasBatallas:</th><td> <font color="#5858FA">' + N(renta[0]) +  '</font> metal, <font color="#00ff00">' + N(renta[1]) + '</font> cristal, <font color="#ff00ff">' + N(renta[2]) + '</font> deuterio</td></tr></table>';
             if(divganancia == null) {
                 elem.innerHTML += '<div id="resumengananciabatalla">' +  htmlganancia + '</div>';
             }
             else {
                 divganancia.innerHTML = htmlganancia;
             }
         });
         
         var id = getFecha() + "*" + getHora() + "*" + lstDef.getNombre(0);
         
         var almacenado_dia = new HashTable();
         var almacenado_mes = new HashTable();
         
         almacenado_dia.parse(options.get("almacenado_dia"));
         almacenado_mes.parse(options.get("almacenado_mes"));
         
         
         if ( (((new Date()).getTime()) - soloN(options.get("purgue_timestamp_dia"))) > 345600000) {
             options.set("purgue_timestamp_dia", (new Date()).getTime());
             almacenado_dia.purgue();
             options.set("almacenado_dia", almacenado_dia.getString());    
         }
         
         if ( (((new Date()).getTime()) - soloN(options.get("purgue_timestamp_mes"))) > 345600000) {
             options.set("purgue_timestamp_mes", (new Date()).getTime());
             almacenado_mes.purgue();
             options.set("almacenado_mes", almacenado_mes.getString());    
         }
         
         // historico diario
         if(typeof(almacenado_dia.getItem(id)) === "undefined") {
             almacenado_dia.setItem(id, (new Date()).getTime());
             options.set("almacenado_dia", almacenado_dia.getString());
             
             var diario_timestamp = soloN(options.get("diario_timestamp"));
             if(diario_timestamp <= 0) options.set("diario_timestamp", (new Date()).getTime());
             
             var diario_metal = new HashTable();
             diario_metal.parse(options.get("diario_metal"));
             
             var diario_cristal = new HashTable();
             diario_cristal.parse(options.get("diario_cristal"));
             
             var diario_deu = new HashTable();
             diario_deu.parse(options.get("diario_deu"));
             
             var diario_batallas = new HashTable();
             diario_batallas.parse(options.get("diario_batallas"));
             
             var id_dia = (new Date()).getFullYear() + "-" + ((new Date()).getMonth()+1) + "-" + (new Date()).getDate();
             
             diario_metal.setItem(id_dia, renta[0]);
             diario_cristal.setItem(id_dia, renta[1]);
             diario_deu.setItem(id_dia, renta[2]);
             diario_batallas.setItem(id_dia, 1);
             
             options.set("diario_metal", diario_metal.getString());
             options.set("diario_cristal", diario_cristal.getString());
             options.set("diario_deu", diario_deu.getString());
             options.set("diario_batallas", diario_batallas.getString());
         }
         
         
         // historico mensual
         if(typeof(almacenado_mes.getItem(id)) === "undefined") {
             almacenado_mes.setItem(id, (new Date()).getTime());
             options.set("almacenado_mes", almacenado_mes.getString());
             
             var mensual_timestamp = soloN(options.get("mensual_timestamp"));
             if(mensual_timestamp <= 0) options.set("mensual_timestamp", (new Date()).getTime());
             
             var mensual_metal = new HashTable();
             mensual_metal.parse(options.get("mensual_metal"));
             
             var mensual_cristal = new HashTable();
             mensual_cristal.parse(options.get("mensual_cristal"));
             
             var mensual_deu = new HashTable();
             mensual_deu.parse(options.get("mensual_deu"));
             
             var mensual_batallas = new HashTable();
             mensual_batallas.parse(options.get("mensual_batallas"));
             
             var id_mes = (new Date()).getFullYear() + "-" + ((new Date()).getMonth()+1);
             
             mensual_metal.setItem(id_mes, renta[0]);
             mensual_cristal.setItem(id_mes, renta[1]);
             mensual_deu.setItem(id_mes, renta[2]);
             mensual_batallas.setItem(id_mes, 1);
             
             options.set("mensual_metal", mensual_metal.getString());
             options.set("mensual_cristal", mensual_cristal.getString());
             options.set("mensual_deu", mensual_deu.getString());
             options.set("mensual_batallas", mensual_batallas.getString());            
             
         }
         
         var resphttprequest = document.getElementById("resphttprequest");
         if(resphttprequest != null) resphttprequest.innerHTML = "";
         
     }
     
     // ------------
     
     if (location.href.indexOf('/game/index.php?page=combatreport') != -1 ) {
         compactar();
     } else {
         var ogMenu = new MenuLib();
         ogMenu.menuButton_create();
         
         function comprobar () {
             var cr = document.getElementsByClassName("round_attacker");
             var shortreport = document.getElementById("shortreport");
             
             
             if(shortreport != null) {
                 var elements = shortreport.getElementsByTagName("a");
                 
                 for(var i = 0; i < elements.length; i++) {
                     if(elements[i].href.indexOf("game/index.php?page=combatreport&nID=") != -1) {
                         var url = elements[i].href;
                         var resphttprequest = document.getElementById("resphttprequest");
                         if(cr != null & cr.length <= 0 && resphttprequest == null) {
                             gethttprequest(url);
                         }
                         
                         if(resphttprequest != null && resphttprequest.tag != url) {
                             resphttprequest.parentNode.removeChild(resphttprequest);
                             gethttprequest(url);
                         }
                     }
                 }
             }
             
             if (cr != null && cr.length > 0){
                 compactar();
             }
             
         }
     }
     
     
     setInterval(comprobar, 500);
     
     var playername = document.getElementsByName("ogame-player-name")[0].content.trim();
     options.set("playername", playername);
     
     
     
     
     
     
     
 }) ();

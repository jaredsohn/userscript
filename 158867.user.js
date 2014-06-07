// ==UserScript==
// @name        OGame: Estadísticas de Expediciones
// @description Estadísticas de Expediciones
// @namespace   sigma-reef-procesador-de-mensajes
// @include     http://*.ogame.gameforge.com/game/index.php?page=messages*
// @downloadURL https://userscripts.org/scripts/source/158867.user.js
// @updateURL   http://userscripts.org/scripts/source/158867.meta.js
// @version     1.11
// @require     http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==

(function() {
  
  if((typeof(oGameVersionCheck) != "undefined")) {
  	oGameVersionCheck('Estadísticas de Expediciones','5.7.99.99','http://userscripts.org/scripts/show/158867');
  }

  if (document.location.href.indexOf ("/game/index.php?page=messages") < 0) return;

  var expStatistics = (function () {
     
    if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
        this.GM_getValue=function (key,def) {
            return localStorage[key] || def;
        };
        this.GM_setValue=function (key,value) {
            return localStorage[key]=value;
        };
        this.GM_deleteValue=function (key) {
            return delete localStorage[key];
        };
    }
    
		var server = document.location.href.match (/http:\/\/([^\\\/]+[\\\/])/i);
		
    if (server) {
      server = server[1].toLowerCase().replace(/\\/, "/");
		} else {
			return;
		}	
    
	  var metal, cristal, deuterio, mo, mercader;
    var naves = new Object();
    var eventos = new Object();
    var shipbox = null;   

	  if (server.indexOf ("-es.ogame.gameforge.com") != -1){
       
  		metal = /Se ha capturado Metal de\s+([0-9\.]+)\./;
  		cristal = /Se ha capturado Cristal de\s+([0-9\.]+)\./;
  		deuterio = /Se ha capturado Deuterio de\s+([0-9\.]+)\./;
  		
      mo = /Se ha capturado Materia Oscura de\s+([0-9\.]+)\./;
  
      inventario = /Se ha añadido lo siguiente a tu/;
  
      naves[0] = /Nave pequeña de carga\s+([0-9\.]+)/;
  		naves[1] = /Nave grande de carga\s+([0-9\.]+)/;
  		naves[2] = /Cazador ligero\s+([0-9\.]+)/;
  		naves[3] = /Cazador pesado\s+([0-9\.]+)/;
  		naves[4] = /Crucero\s+([0-9\.]+)/;
  		naves[5] = /Nave de batalla\s+([0-9\.]+)/;
  		naves[6] = /Colonizador/;   // no aplica, no se encuentra en exp
  		naves[7] = /Recciclador/;   // no aplica, no se encuentra en exp
      naves[8] = /Sonda de espionaje\s+([0-9\.]+)/;
      naves[9] = /Bombardero\s+([0-9\.]+)/;
  		naves[10] = /Satelite solar/;  // no aplica, no se encuentra en exp
      naves[11] = /Destructor\s+([0-9\.]+)/;
  		naves[12] = /Estrella de la muerte/;   // no aplica, no se encuentra en exp
      naves[13] = /Acorazado\s+([0-9\.]+)/;
      
      mercader = /Estos anunciaron que van a enviar a un representante con bienes de comercio a tus mundos/;
  
      /* ataques */
  		ataque01 = /bárbaros/;
  		ataque02 = /algunos bucaneros estelares/;
      ataque11 = /piratas/;
  		ataque21 = /exótica/;
  		ataque22 = /especie desconocida ataca/;
  		ataque23 = /raza alien desconocida/;
  		ataque24 = /atacada por un pequeño grupo de naves/;
      
      /* errores de navegación */
      error01 = /más tiempo/;
      error02 = /un gran retraso/;
      error03 = /algo de tiempo/;
      error04 = /se retarda/;
      error05 = /la expedición no puede continuar/;      
      error20 = /antes de lo esperado/;
      error21 = /acortar el vuelo de regreso/;
      error22 = /para acortar el vuelo de regreso/;
      error23 = /se aceleró mucho/;
      
      /* desaparición de flota */
      desaparicion01 = /Lo único que quedó de la expedición fue el siguiente mensaje de radio/;
      desaparicion02 = /Una fusión del núcleo de la nave insignia/;
      desaparicion03 = /La última transmisión que obtuvimos/;
      
      /* situación de sistema solar */
      nivel01 = 'Parece como si esta parte del universo no hubiera sido explorada hasta ahora.'; // nadie hace expediciones
      nivel02 = 'Es una gran sensación ser el primero en un sector inexplorado.'; // nadie hace expediciones
      nivel03 = 'Parece como si ningún humano hubiera estado antes en esta parte de la galaxia.';  // algunos hacen expediciones
      nivel04 = 'Encontramos indicios sobre la presencia de otras flotas de expedición.';  // demasiados hacen expediciones
      nivel05 = 'Encontramos antiguos signos de naves espaciales. Por tanto, no somos los primeros.';
      
    } else {
   	  Alert('This script is not compatible with your language');
			return;
		}
    
		var isMessageRead = function(messageID) {
      var expediciones = GM_getValue("expediciones");
      if(expediciones == "undefined" || expediciones == null){
        expediciones = '';   
      }
      if( (''+expediciones).indexOf(''+messageID) >= 0) {
        return true; // encontrado = leído
      } else {
        expediciones = messageID + ',' + expediciones;
        GM_setValue("expediciones", expediciones);
        return false;
      }
    }
    
    var saveValue = function(key, value){      
      if((value.toString()).indexOf(".") > 0) {
        value = value.replace(/\./g, "");
      }
      var data = GM_getValue(key);
      if(data == "undefined" || data == null || isNaN(data)){data = 0;}
      data = Number(data) + Number(value);
      GM_setValue(key, data);
    }

    function formatNumber(num) {
        return ("" + num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + "." });
    }
    
    function createBBCode(){
        var bbcode = '';
        
        var metal = (GM_getValue("expligero",0) * 3000) + (GM_getValue("exppesado",0) * 6000) +  (GM_getValue("expcrucero",0) * 20000) + (GM_getValue("expnavebatalla",0) * 45000) + (GM_getValue("expacorazado",0) * 30000) + (GM_getValue("expbombardero",0) * 50000) + (GM_getValue("expdestructor",0) * 60000) + (GM_getValue("exppequena",0) * 2000) + (GM_getValue("expgrande",0) * 6000);
        var cristal = (GM_getValue("expligero",0) * 1000)  +  (GM_getValue("exppesado",0) * 4000)  + (GM_getValue("expcrucero",0) * 7000)  + (GM_getValue("expnavebatalla",0) * 15000) + (GM_getValue("expacorazado",0) * 40000)  +   (GM_getValue("expbombardero",0) * 25000) + (GM_getValue("expdestructor",0) * 50000)  +  (GM_getValue("exppequena",0) * 2000)  + (GM_getValue("expgrande",0) * 6000)  +  (GM_getValue("expsonda",0) * 1000);
        var deuterio = (GM_getValue("expcrucero",0) * 2000)  + (GM_getValue("expacorazado",0) * 15000)  + (GM_getValue("expbombardero",0) * 15000)  + (GM_getValue("expdestructor",0) * 15000);
        
        bbcode = '[b]ESTADÍSTICAS DE EXPEDICIONES[/b]' +
        '\nTotal de expediciones: '+GM_getValue("exptotal",0) +
        '\nDatos acumulados desde: '+GM_getValue("expdate",0) +
        
        '\n\n[b]Recursos encontrados[/b]' + 
        '\nMetal: '+formatNumber(GM_getValue("expmetal",0)) +
        '\nCristal: '               +formatNumber(GM_getValue("expcristal",0)) + 
        '\nDeuterio: '              +formatNumber(GM_getValue("expdeuterio",0)) + 
        '\nMateria oscura: '        +formatNumber(GM_getValue("expmo",0)) + 
                                                                             
        '\n\n[b]Flota encontrada[/b]' +                                                                                                  
                                                 
        '\nCazador ligero: '+GM_getValue("expligero",0) + //' (Metal: ' + formatNumber(GM_getValue("expligero",0) * 3000) + ' Cristal: ' + formatNumber(GM_getValue("expligero",0) * 1000)  +')' +
        '\nCazador pesado: '+GM_getValue("exppesado",0) + //' (Metal: ' + formatNumber(GM_getValue("exppesado",0) * 6000) + ' Cristal: ' + formatNumber(GM_getValue("exppesado",0) * 4000)  +')' +
        '\nCrucero: '+GM_getValue("expcrucero",0) + //' (Metal: ' + formatNumber(GM_getValue("expcrucero",0) * 20000) + ' Cristal: ' + formatNumber(GM_getValue("expcrucero",0) * 7000)  + ' Deuterio: ' + formatNumber(GM_getValue("expcrucero",0) * 2000)  +' )' +
        '\nNave de batalla: '+GM_getValue("expnavebatalla",0) + //' (Metal: ' + formatNumber(GM_getValue("expnavebatalla",0) * 45000) + ' Cristal: ' + formatNumber(GM_getValue("expnavebatalla",0) * 15000)  +')' +
        '\nAcorazado: '+GM_getValue("expacorazado",0) + //' (Metal: ' + formatNumber(GM_getValue("expacorazado",0) * 30000) + ' Cristal: ' + formatNumber(GM_getValue("expacorazado",0) * 40000)  + ' Deuterio: ' + formatNumber(GM_getValue("expacorazado",0) * 15000)  +' )' +
        '\nBombardero: '+GM_getValue("expbombardero",0) + //' (Metal: ' + formatNumber(GM_getValue("expbombardero",0) * 50000) + ' Cristal: ' + formatNumber(GM_getValue("expbombardero",0) * 25000) + ' Deuterio: ' + formatNumber(GM_getValue("expbombardero",0) * 15000)  +' )' +
        '\nDestructor: '+GM_getValue("expdestructor",0) + //' (Metal: ' + formatNumber(GM_getValue("expdestructor",0) * 60000) + ' Cristal: ' + formatNumber(GM_getValue("expdestructor",0) * 50000)  + ' Deuterio: ' + formatNumber(GM_getValue("expdestructor",0) * 15000)  +' )' +
        '\nNave pequeña de carga: '+GM_getValue("exppequena",0) + //' (Metal: ' + formatNumber(GM_getValue("exppequena",0) * 2000) + ' Cristal: ' + formatNumber(GM_getValue("exppequena",0) * 2000)  +')' +
        '\nNave grande de carga: '+GM_getValue("expgrande",0) + //' (Metal: ' + formatNumber(GM_getValue("expgrande",0) * 6000) + ' Cristal: ' + formatNumber(GM_getValue("expgrande",0) * 6000)  +')' +
        '\nSonda de espionaje: '+GM_getValue("expsonda",0) + //' (Cristal: ' + formatNumber(GM_getValue("expsonda",0) * 1000)  +')' +
        
        '\n\n[b]Valor de la flota encontrada expresado en recursos[/b]'+
        '\nMetal: ' + formatNumber(metal)  +
        '\nCristal: ' + formatNumber(cristal) +
        '\nDeuterio: ' + formatNumber(deuterio) +

        '\n\n[b]Total de recursos ganados (sin contabilizar pérdidas)[/b]'+
        '\nMetal: ' + formatNumber(parseInt(GM_getValue("expmetal",0)) + metal)  +
        '\nCristal: ' + formatNumber(parseInt(GM_getValue("expcristal",0)) + cristal) +
        '\nDeuterio: ' + formatNumber(parseInt(GM_getValue("expdeuterio",0)) + deuterio) +

        '\n\n[b]Otras estadísticas[/b]' +
        '\nDeuterio consumido (estimativo): '+ formatNumber(parseInt(GM_getValue("exptotal",0)) * 4500) +
        '\nCantidad de batallas: '+GM_getValue("expbatalla",0) +
        '\nCantidad de mercaderes: '+GM_getValue("expmercader",0) +
        '\nCantidad de items de inventario: '+GM_getValue("inventario",0) +
        '\nCantidad de errores de navegación: '+GM_getValue("expproblema",0) +
        '\nCantidad de veces que no ocurrió nada: '+GM_getValue("expnada",0) +
        '\nCantidad de flotas desaparecidas: '+GM_getValue("expdesaparicion",0) +
        
        '\n\n[url=https://userscripts.org/scripts/source/158867.user.js]Instalar: Estadísticas de expediciones[/url]';
        
        return bbcode;
    
    }

		var showExpStatistics = function (parent) {
      var tabla = '<table border="1" width="100%">' +
        '	<tr>' +
        '		<td colspan="2"><b>ESTADÍSTICAS DE EXPEDICIONES</b></td>' +
        '		<td>' +
        '		<p align="right"><a href="#" onClick="var dt = new Date().toLocaleDateString(); GM_setValue(\'expdate\', dt);GM_deleteValue(\'expediciones\'); GM_deleteValue(\'exptotal\');GM_deleteValue(\'expmetal\');GM_deleteValue(\'inventario\');GM_deleteValue(\'expcristal\');GM_deleteValue(\'expdeuterio\');GM_deleteValue(\'expmo\');GM_deleteValue(\'exppequena\');GM_deleteValue(\'expgrande\');GM_deleteValue(\'expligero\');GM_deleteValue(\'exppesado\');GM_deleteValue(\'expcrucero\');GM_deleteValue(\'expnavebatalla\');GM_deleteValue(\'expbombardero\');GM_deleteValue(\'expdestructor\');GM_deleteValue(\'expacorazado\');GM_deleteValue(\'expsonda\');GM_deleteValue(\'expmercader\');GM_deleteValue(\'expbatalla\');GM_deleteValue(\'expproblema\');GM_deleteValue(\'expdesaparicion\');GM_deleteValue(\'expnada\'); this.text = \'[ COMPLETADO ]\'; return false;">'+ 
        '   [ REINICIAR ]</a></td>' +
        '	</tr>' +
        '	<tr>' +
        '		<td colspan="3">Total de expediciones: '+GM_getValue("exptotal",0)+'<br /><br /></td>' +
        '	</tr>' +
        '	<tr>' +
        '		<td><b>Recursos encontrados</b></td>' +
        '		<td><b>Flota encontrada</b></td>' +
        '		<td><b>BB Code</b></td>' +
        '	</tr>' +
        '	<tr>' +
        '		<td valign="top">Metal: '+formatNumber(GM_getValue("expmetal",0))+ '<br>' +
        '		Cristal: '               +formatNumber(GM_getValue("expcristal",0))+ '<br>' +
        '		Deuterio: '              +formatNumber(GM_getValue("expdeuterio",0))+ '<br>' +
        '		Materia oscura: '        +formatNumber(GM_getValue("expmo",0))+ '<br><br>' +
        '   <b>Otras estadísticas</b><br>' +
        '   Deuterio consumido (estimativo): '+ formatNumber(parseInt(GM_getValue("exptotal",0)) * 4500) + '<br>' +
        '	  Cantidad de batallas: '+GM_getValue("expbatalla",0)+'<br>'+
        '   Cantidad de mercaderes: '+GM_getValue("expmercader",0)+'<br>' +
        '   Cantidad de items de inventario: '+GM_getValue("inventario",0)+'<br>' + 
        '   Cantidad de errores de navegación: '+GM_getValue("expproblema",0)+'<br>' +
        '	  Cantidad de veces que no ocurrió nada: '+GM_getValue("expnada",0)+'<br>' +
        '   Cantidad de flotas desaparecidas:'+GM_getValue("expdesaparicion",0)+
        '		</td>' +
        '		<td valign="top">Cazador ligero: '+GM_getValue("expligero",0)+'<br>' +
        '		Cazador pesado: '+GM_getValue("exppesado",0)+'<br>' +
        '		Crucero: '+GM_getValue("expcrucero",0)+'<br>' +
        '		Nave de batalla: '+GM_getValue("expnavebatalla",0)+'<br>' +
        '		Acorazado: '+GM_getValue("expacorazado",0)+'<br>' +
        '		Bombardero: '+GM_getValue("expbombardero",0)+'<br>' +
        '		Destructor: '+GM_getValue("expdestructor",0)+'<br>' +
        '		Nave pequeña de carga: '+GM_getValue("exppequena",0)+'<br>' +
        '		Nave grande de carga: '+GM_getValue("expgrande",0)+'<br>' +
        '		Sonda de espionaje: '+GM_getValue("expsonda",0)+'</td>' +
        '  <td><textarea style="width: 100%; height: 100%;" onclick="this.select()">' + createBBCode() + '</textarea></td>' +
        '	</tr>' +
        '</table><br/><hr /><br/>';

  		/* situación de sistema solar */
      parent.innerHTML = parent.innerHTML.replace(nivel01, '<font color="lime">' + nivel01 + '</font><br/>');
      parent.innerHTML = parent.innerHTML.replace(nivel02, '<font color="yellow">' + nivel02 + '</font><br/>');
      parent.innerHTML = parent.innerHTML.replace(nivel03, '<font color="orange">' + nivel03 + '</font><br/>');
      parent.innerHTML = parent.innerHTML.replace(nivel04, '<font color="red">' + nivel04 + '</font><br/>');
      parent.innerHTML = parent.innerHTML.replace(nivel05, '<font color="red">' + nivel05 + '</font><br/>');       
      
      parent.innerHTML = tabla + parent.innerHTML; 	
		}
    
		$(document).ajaxSuccess(function (e, xhr, settings) {
		
			if (settings.url.indexOf ("page=showmessage") < 0) {
				return;
			}
      
			if(($(".overlayDiv > .showmessage").text ()).match(/Resultado de la expedición/) ){
          var messageID = $(".overlayDiv > .showmessage").attr('data-message-id');
    			$(".overlayDiv > .showmessage .note").each (function (){
    				
            if ($ (this).hasClass ("expStatistics")) {return;}
    				$(this).addClass ("expStatistics");
    				var text = $(this).text ();
    				var parent = this;

            if(isMessageRead(messageID)) {
              showExpStatistics(parent);
              return;
            } else {
              saveValue('exptotal', 1);
            }
    				
    				var captura, data;
    				if	(captura = text.match(metal)) {
              saveValue('expmetal', captura[1]);
    				} else if	(captura = text.match(cristal)) {
    				  saveValue('expcristal', captura[1]);
            } else if	(captura = text.match(deuterio)) {
    				  saveValue('expdeuterio', captura[1]);
            } else if	(captura = text.match(mo)) {
              saveValue('expmo', captura[1]);				
            } else if	(text.match(mercader)) {
    				  saveValue('expmercader', 1);
            } else if	(text.match(inventario)) {
    				  saveValue('inventario', 1);
            } else if	(text.match(ataque01) || text.match(ataque02) || text.match(ataque11) || text.match(ataque21) || text.match(ataque22) || text.match(ataque23) || text.match(ataque24)) {
    				  saveValue('expbatalla', 1);
            } else if	(text.match(error01) || text.match(error02) || text.match(error03) || text.match(error04) || text.match(error05) || text.match(error20) || text.match(error21) || text.match(error22) || text.match(error23)) {
    				  saveValue('expproblema', 1);
            } else if	(text.match(desaparicion01) || text.match(desaparicion02) || text.match(desaparicion03)) {
    				  saveValue('expdesaparicion', 1);
            } else {
            
              var nada = true;
    					for (var n in naves) {
    						if (captura = text.match (naves[n])) {
                  nada = false;
      						switch(n){
                    case '0':
                      saveValue('exppequena', captura[1]);
                      break;
                    case '1':
                      saveValue('expgrande', captura[1]);
                      break;
                    case '2':
                      saveValue('expligero', captura[1]);
                      break;
                    case '3':
                      saveValue('exppesado', captura[1]);
                      break;
                    case '4':
                      saveValue('expcrucero', captura[1]);
                      break;
                    case '5':
                      saveValue('expnavebatalla', captura[1]);
                      break;
                    case '8':
                      saveValue('expsonda', captura[1]);
                      break;
                    case '9':
                      saveValue('expbombardero', captura[1]);
                      break;
                    case '11':
                      saveValue('expdestructor', captura[1]);
                      break;
                    case '13':
                      saveValue('expacorazado', captura[1]);
                      break;                            
                  }
                }						
    					}	
    					if( nada ) {
      				  saveValue('expnada', 1);
              } 
            }
            
            showExpStatistics(parent);
    			});
      }

		});
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + expStatistics + ") ();";
	document.body.appendChild (script);
})();
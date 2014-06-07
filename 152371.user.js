// ==UserScript==
// @name           OGame: Construção proporcional de Frota.
// @description    Sugere uma proporção de frotas no Hangar.
// @namespace      http://userscripts.org/scripts/source/152371.user.js
// @downloadURL    http://userscripts.org/scripts/source/152371.user.js
// @updateURL      https://userscripts.org/scripts/source/152371.meta.js
// @version        1.3
// @date           2012-11-11
// @include        http://*.ogame.*/game/index.php?page=shipyard*
// ==/UserScript==
/*
  Referencia: 
  // Frota 
                        --> 40 Caça Pesado
                      ----> 13 Cruzador
 100 Caças ligeiros ------> 6 Nave de Batalha 
                      ----> 4 Interceptador
                       ---> 4 Bombardeiro
                        --> 3 Destruidor
                         -> 0 Estrela da Morte

 
                         --> 1000 Caça Pesado
                       ----> 345 Cruzador
 2500 Caças ligeiros ------> 168 Nave de Batalha 
                       ----> 118 Interceptador
                        ---> 110 Bombardeiro
                         --> 80 Destruidor
                          -> 1 Estrela da Morte
*/
(function (){
	var myFunc = (function (){
		var theUrl = document.location.href;
    if (theUrl.indexOf ("/game/index.php?page=shipyard") >= 0) {
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
        var ligeros = $ ("#details204 span.textlabel");        
        ligeros = ligeros [0].nextSibling.textContent;
        ligeros = ligeros.replace(".", "");
        ligeros = (parseInt (ligeros));
        var ligeiros     = GM_getValue('ligeiros')     > 0 ? GM_getValue('ligeiros')    :      (0);
        var pesado       = GM_getValue('pesado')       > 0 ? GM_getValue('pesado')      :    (1/8);
        var crucero      = GM_getValue('crucero')      > 0 ? GM_getValue('crucero')     :    (1/4);
        var naves        = GM_getValue('naves')        > 0 ? GM_getValue('naves')       :    (1/4);
        var acorazados   = GM_getValue('acorazados')   > 0 ? GM_getValue('acorazados')  :  (1/234);
        var bombarderos  = GM_getValue('bombarderos')  > 0 ? GM_getValue('bombarderos') :      (0);
        var destructores = GM_getValue('destructores') > 0 ? GM_getValue('destructores'):      (0);
        var estrellas    = GM_getValue('estrellas')    > 0 ? GM_getValue('estrellas')   :      (0);
        var cargueiro_p  = GM_getValue('cargueiro_p')  > 0 ? GM_getValue('cargueiro_p') :      (0);
        var cargueiro_g  = GM_getValue('cargueiro_g')  > 0 ? GM_getValue('cargueiro_g') :      (0);
        var reciclador   = GM_getValue('reciclador')   > 0 ? GM_getValue('reciclador')  :      (0);
     
  
        GM_setValue('ligeiros'      ,Math.round(ligeiros    *1000)/1000);
        GM_setValue('pesado'        ,Math.round(pesado      *1000)/1000);
        GM_setValue('crucero'       ,Math.round(crucero     *1000)/1000);
        GM_setValue('naves'         ,Math.round(naves       *1000)/1000);
        GM_setValue('acorazados'    ,Math.round(acorazados  *1000)/1000);
        GM_setValue('bombarderos'   ,Math.round(bombarderos *1000)/1000);
        GM_setValue('destructores'  ,Math.round(destructores*1000)/1000);
        GM_setValue('estrellas'     ,Math.round(estrellas   *1000)/1000);
        GM_setValue('cargueiro_p'   ,Math.round(cargueiro_p *1000)/1000);
        GM_setValue('cargueiro_g'   ,Math.round(cargueiro_g *1000)/1000);
        GM_setValue('reciclador'    ,Math.round(reciclador  *1000)/1000);
       
        
        ligeiros     = Math.round( ligeros * ligeiros    );
        pesado       = Math.round( ligeros * pesado      );
        crucero      = Math.round( ligeros * crucero     );
        naves        = Math.round( ligeros * naves       );
        acorazados   = Math.round( ligeros * acorazados  );
        bombarderos  = Math.round( ligeros * bombarderos );
        destructores = Math.round( ligeros * destructores);
        estrellas    = Math.round( ligeros * estrellas   );
        cargueiro_p  = Math.round( ligeros * cargueiro_p );
        cargueiro_g  = Math.round( ligeros * cargueiro_g );
        reciclador   = Math.round( ligeros * reciclador  );
        
        
        var limites = [["205", pesado, 0],["206", crucero, 0],["207", naves, 0],["215", acorazados, 0],["211", bombarderos, 0],["213", destructores, 0],["214", estrellas, 0],["204", ligeiros, 0],["202", cargueiro_p, 0],["203", cargueiro_g, 0],["209", reciclador, 0]];
        for (var i = 0; i < limites.length; i++) {
  			  var cantidad = $ ("#details" + limites [i] [0] + " span.textlabel");
          if (cantidad.length > 0) { 
            cantidad = cantidad [0].nextSibling.textContent;
            cantidad = cantidad.replace(".", "");
            cantidad = parseInt(cantidad); 
            limites [i] [2] =  cantidad - (limites [i] [1]);
  				  if( cantidad >= limites [i] [1]) {
    					$ ("#button" + limites [i] [0]).parent ().attr ("class", "off");
    					if ($ ("#button" + limites [i] [0] + " a").hasClass ("fastBuild"))
    						$ ("#button" + limites [i] [0] + " a.fastBuild").css ("display", "none");
  					}
  				}
  			}
        
  			var str1 = "<p style=\"padding: 0px 0px 0px 40px;\"><span style=\"font-size: x-small;\">Total de Caças Ligeiros no Hangar: <span style=\"color:orange;\">"+ limites [7] [2] +"</span><br />" +
                        "<span style=\"color:lime;\">Verde</span>: indica que você excedeu.<br /> <span style=\"color:red;\">Vermelho</span>: indica que falta.<br /></span></span><br />" +
                    "<table style=\"margin: 0px 0px 24px 40px;\">" +
                      "<tr><td style=\"width: 150px;\">Caça Pesado:</td>" +
                                                  "<td style=\"width: 50px; text-align: right;\">" + limites [0] [1] + "</td><td style=\"width: 50px; text-align: right;\">" + (limites [0] [2] > 0 ? "<p style=\"color:lime;\">" : "<p style=\"color:red;\">" ) + limites [0] [2] + "</p></td></tr>" +
                      "<tr><td>Cruzador:                    </td><td style=\"text-align: right;\">" + limites [1] [1] + "</td><td style=\"text-align: right;\">"              + (limites [1] [2] > 0 ? "<p style=\"color:lime;\">" : "<p style=\"color:red;\">" ) + limites [1] [2] + "</p></td></tr>" +
                      "<tr><td>Nave de Batalha:             </td><td style=\"text-align: right;\">" + limites [2] [1] + "</td><td style=\"text-align: right;\">"             + (limites [2] [2] > 0 ? "<p style=\"color:lime;\">" : "<p style=\"color:red;\">" ) + limites [2] [2] + "</p></td></tr>" +
                      "<tr><td>Interceptador:                   </td><td style=\"text-align: right;\">" + limites [3] [1] + "</td><td style=\"text-align: right;\">"             + (limites [3] [2] > 0 ? "<p style=\"color:lime;\">" : "<p style=\"color:red;\">" ) + limites [3] [2] + "</p></td></tr>" +
                      "<tr><td>Bombardeiro:                  </td><td style=\"text-align: right;\">" + limites [4] [1] + "</td><td style=\"text-align: right;\">"             + (limites [4] [2] > 0 ? "<p style=\"color:lime;\">" : "<p style=\"color:red;\">" ) + limites [4] [2] + "</p></td></tr>" +
                      "<tr><td>Destruidor:                  </td><td style=\"text-align: right;\">" + limites [5] [1] + "</td><td style=\"text-align: right;\">"             + (limites [5] [2] > 0 ? "<p style=\"color:lime;\">" : "<p style=\"color:red;\">" ) + limites [5] [2] + "</p></td></tr>" +
                      "<tr><td>Estrela da Morte:                    </td><td style=\"text-align: right;\">" + limites [6] [1] + "</td><td style=\"text-align: right;\">"             + (limites [6] [2] > 0 ? "<p style=\"color:lime;\">" : "<p style=\"color:red;\">" ) + limites [6] [2] + "</p></td></tr>" +
                "<tr><td>Cargueiro P:                    </td><td style=\"text-align: right;\">" + limites [8] [1] + "</td><td style=\"text-align: right;\">"             + (limites [8] [2] > 0 ? "<p style=\"color:lime;\">" : "<p style=\"color:red;\">" ) + limites [8] [2] + "</p></td></tr>" +
                "<tr><td>Cargueiro G:                    </td><td style=\"text-align: right;\">" + limites [9] [1] + "</td><td style=\"text-align: right;\">"             + (limites [9] [2] > 0 ? "<p style=\"color:lime;\">" : "<p style=\"color:red;\">" ) + limites [9] [2] + "</p></td></tr>" +
                "<tr><td>Reciclador:                    </td><td style=\"text-align: right;\">" + limites [10] [1] + "</td><td style=\"text-align: right;\">"             + (limites [10] [2] > 0 ? "<p style=\"color:lime;\">" : "<p style=\"color:red;\">" ) + limites [10] [2] + "</p></td></tr>" +
                    "</table>"+
                    "</p>";
        var str2 = "<p style=\"padding: 10px 0px 0px 10px;\">"+
                    "<table style=\"margin: 0px 0px 24px 0px;\">" +
                    "<tr><td style=\"width: 150px;\">Caça Pesado:</td>" +
                                      "<td style=\"width: 50px;\"><input type=\"text\" value=\""+ GM_getValue('pesado')  +"\" onkeyup=\"GM_setValue('pesado' ,Math.round(this.value*1000)/1000);\" style=\"width: 40px; height: 16px;\" title=\"Valor padrão sugerido = 0.25\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Cruzador:                    </td><td><input type=\"text\" value=\""+ GM_getValue('crucero') +"\" onkeyup=\"GM_setValue('crucero',Math.round(this.value*1000)/1000);\" style=\"width: 40px; height: 16px;\" title=\"Valor padrão sugerido = 0.14\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Nave de Batalha:            </td><td><input type=\"text\" value=\""+ GM_getValue('naves')  +"\" onkeyup=\"GM_setValue('naves' ,Math.round(this.value*1000)/1000);\" style=\"width: 40px; height: 16px;\" title=\"Valor padrão sugerido = 0.065\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Interceptador:                  </td><td><input type=\"text\" value=\""+ GM_getValue('acorazados')   +"\" onkeyup=\"GM_setValue('acorazados'  ,Math.round(this.value*1000)/1000);\" style=\"width: 40px; height: 16px;\" title=\"Valor padrão sugerido = 0.047\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Bombardeiro:                 </td><td><input type=\"text\" value=\""+ GM_getValue('bombarderos')  +"\" onkeyup=\"GM_setValue('bombarderos' ,Math.round(this.value*1000)/1000);\" style=\"width: 40px; height: 16px;\" title=\"Valor padrão sugerido = 0.043\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Destruidor:                 </td><td><input type=\"text\" value=\""+ GM_getValue('destructores')   +"\" onkeyup=\"GM_setValue('destructores'  ,Math.round(this.value*1000)/1000);\" style=\"width: 40px; height: 16px;\" title=\"Valor padrão sugerido = 0.032\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Estrela da Morte:                   </td><td><input type=\"text\" value=\""+ GM_getValue('estrellas')  +"\" onkeyup=\"GM_setValue('estrellas' ,Math.round(this.value*1000)/1000);\" style=\"width: 40px; height: 16px;\" title=\"Valor padrão sugerido = 0\" class=\"tooltip\"/></td></tr>" +
            "<tr><td>Cargueiro P:                   </td><td><input type=\"text\" value=\""+ GM_getValue('cargueiro_p')  +"\" onkeyup=\"GM_setValue('cargueiro_p' ,Math.round(this.value*1000)/1000);\" style=\"width: 40px; height: 16px;\" title=\"Valor padrão sugerido = 0.24\" class=\"tooltip\"/></td></tr>" +
            "<tr><td>Cargueiro G:                   </td><td><input type=\"text\" value=\""+ GM_getValue('cargueiro_g')  +"\" onkeyup=\"GM_setValue('cargueiro_g' ,Math.round(this.value*1000)/1000);\" style=\"width: 40px; height: 16px;\" title=\"Valor padrão sugerido = 0.048\" class=\"tooltip\"/></td></tr>" +
            "<tr><td>Reciclador:                   </td><td><input type=\"text\" value=\""+ GM_getValue('reciclador')  +"\" onkeyup=\"GM_setValue('reciclador' ,Math.round(this.value*1000)/1000);\" style=\"width: 40px; height: 16px;\" title=\"Valor padrão sugerido = 0.06\" class=\"tooltip\"/></td></tr>" +
                  "</table><br /></p>";
        
      	var div = $('<div/>').attr('id','sugerenciaDeDefensas').addClass("content");
      	$('#buttonz .content .footer').before(div);
        var table = $('<table/>').css({'width':'100%'}).attr('cellspacing','0').attr('cellpadding','0').appendTo(div);
        var header = $('<tr />').addClass('header').appendTo(table);                                                                                                                                                  
        var row    = $('<tr />').addClass('row').appendTo(table); 
        var tdh1 = $('<td/>').attr('colspan','2').appendTo(header);
        $('<h2/>').html('<span class="h_batteships">Frotas proporcionais</span><span class="h_civilships">Configuração</span>').attr('title','Proporção sugerida com base na quantidade <br>de Caças Ligeiros no Hangar.').addClass('tooltip').appendTo(tdh1); 
        var td = $('<td/>').appendTo(row);
      	$('<span/>').html(str1).appendTo(td);
        var td2 = $('<td/>').appendTo(row);
      	$('<span/>').html(str2).appendTo(td2);	
    }
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
})();
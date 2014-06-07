// ==UserScript==
// @name           OGame: Flotta proporzionale suggerita
// @description    TRADUZIONE JR RIGEL - IAMOR
// @namespace      flotta-suggerita
// @downloadURL    https://userscripts.org/scripts/source/152182.user.js
// @updateURL       
// @version        JR RIGEL - IAMOR
// @date           2013-04-10
// @include        http://*.ogame.*/game/index.php?page=*
// @require        
// ==/UserScript==

/*
  Referencia:

  // Flota Tapion
  8   Caccini -> 1 Caccioni
  4   Caccini -> 1 Incrociatori
  4   Caccini -> 1 BS
  234 Caccini -> 1 Corazzata
  
  // Flota Neccram
  10 Caccini -> 18 Caccioni 
  10 Caccini -> 3 Incrociatori
  10 Caccini -> 1 BS 
  10 Caccini -> 1 Corazzata
  20 Caccini -> 1 Bombardiere
  10 Caccini -> 1 BC

  // Flota Sigma Reef - Basada en mi experiencia
  10 ligeros -> 9 Caccioni 
  10 ligeros -> 5 Incrociatori
  10 ligeros -> 2 BS 
  10 ligeros -> 1 Corazzate
  20 ligeros -> 1 Bombardieri
  10 ligeros -> 1 BC
  1000 ligeros -> 1 RIP
  
*/

(function (){

  if((typeof(oGameVersionCheck) != "undefined")) {
  	oGameVersionCheck('Flota proporcional sugerida','5.3.99.99','http://userscripts.org/scripts/show/152182');
  }
  if(document.location.href.indexOf ("/game/index.php?page=shipyard") < 0) { return; }
	
  var myFunc = (function (){
    
    function formatNumber(num) {
        if(num == 0 || num == 'undefined') {return '0';}
        return ("" + num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + "." });
    }
    
    function formatNumberWithPrefix(num) {
        if(num == 0 || num == 'undefined') {return '0';}
        var prefix = '';
        var formatedNumber = '';
        
        if(num >= 0){
          prefix = "&nbsp;&nbsp;&nbsp;";
          var formatedNumber = ("" + num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + "." });
          formatedNumber = prefix + formatedNumber;
        } else {
          num = Math.abs(num);
          prefix = "&nbsp;&uarr;&nbsp;";
          formatedNumber = ("" + num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + "." });
          formatedNumber = prefix + formatedNumber;
        }
         
        return formatedNumber;
    }
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
        
        var ligeros = $("#details204 span.textlabel");
        
        if(ligeros.length) {
          ligeros = ligeros[0].nextSibling.textContent;        
          ligeros = ligeros.replace(/\./g,'');
          ligeros = (parseInt (ligeros));
        } else {
          ligeros = parseInt (GM_getValue('ligeros')); 
        }               
        
        GM_setValue('ligeros', ligeros);
        
        var pesado       = GM_getValue('pesado')       > 0 ? GM_getValue('pesado')      :   (1/8);
        var crucero      = GM_getValue('crucero')      > 0 ? GM_getValue('crucero')     :   (1/4);
        var naves        = GM_getValue('naves')        > 0 ? GM_getValue('naves')       :   (1/4);
        var acorazados   = GM_getValue('acorazados')   > 0 ? GM_getValue('acorazados')  :   (1/234);
        var bombarderos  = GM_getValue('bombarderos')  > 0 ? GM_getValue('bombarderos') :   (0);
        var destructores = GM_getValue('destructores') > 0 ? GM_getValue('destructores'):   (0);
        var estrellas    = GM_getValue('estrellas')    > 0 ? GM_getValue('estrellas')   :   (0);
        
        GM_setValue('pesado'        ,Math.round(pesado      *10000)/10000);
        GM_setValue('crucero'       ,Math.round(crucero     *10000)/10000);
        GM_setValue('naves'         ,Math.round(naves       *10000)/10000);
        GM_setValue('acorazados'    ,Math.round(acorazados  *10000)/10000);
        GM_setValue('bombarderos'   ,Math.round(bombarderos *10000)/10000);
        GM_setValue('destructores'  ,Math.round(destructores*10000)/10000);
        GM_setValue('estrellas'     ,Math.round(estrellas   *10000)/10000);

        pesadoQty       = Math.round( ligeros * pesado      );
        cruceroQty      = Math.round( ligeros * crucero     );
        navesQty        = Math.round( ligeros * naves       );
        acorazadosQty   = Math.round( ligeros * acorazados  );
        bombarderosQty  = Math.round( ligeros * bombarderos );
        destructoresQty = Math.round( ligeros * destructores);
        estrellasQty    = Math.round( ligeros * estrellas   );

        var ligerosParaNivelar = 0;    
        var limites = [["205", pesadoQty, 0, pesado],["206", cruceroQty, 0, crucero],["207", navesQty, 0, naves],["215", acorazadosQty, 0, acorazados],["211", bombarderosQty, 0, bombarderos],["213", destructoresQty, 0, destructores],["214", estrellasQty, 0, estrellas]];
        for (var i = 0; i < limites.length; i++) {
  			  var cantidad = $ ("#details" + limites [i] [0] + " span.textlabel");
          if (cantidad.length > 0) { 
            cantidad = cantidad [0].nextSibling.textContent;
            cantidad = parseInt(cantidad.replace(/\./g,'')); 
            limites [i][2] =  cantidad - limites [i][1];
  				  if(limites [i][2] > 0) {
  				    $(".military" + limites [i][0]).parent ().attr ("class", "off");
              if(limites[i][3] > 0){
                var aux = limites[i][2] / limites[i][3];
                if(ligerosParaNivelar <= aux){
                   ligerosParaNivelar = aux;  
                }
              }
            }
  				}
  			}
        
  		var str1 = "<p style=\"padding: 0px 0px 0px 40px;\"><span style=\"font-size: x-small;\">";
  		if(ligerosParaNivelar > 0){
        str1 = str1 + "Servono <span style=\"color:lime;\"><b>" + Math.ceil(ligerosParaNivelar) + "</b></span> Caccini per proporzionare la flotta.<br />";
      }
      str1 = str1 + "Dovresti avere  <span style=\"color:lime;\"><b>"+ Math.round(limites [1][1] / 2) +"</b></span> Recy e <span style=\"color:lime;\"><b>"+ Math.round(limites [1] [1]) +"</b></span> cargoni.</span><br /><br />" +
                   "<table style=\"margin: 0px 0px 24px 40px; \">" +
                      "<tr><td style=\"width: 150px;\">Caccioni:</td>" +
                                                   "<td style=\"width: 50px; text-align: right;\">" + formatNumber(limites [0] [1]) + "</td><td style=\"width: 50px; text-align: right;\">"+ (limites [0] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [0] [2]) + "</p></td></tr>" +
                      "<tr><td>Incrociatori:                     </td><td style=\"text-align: right;\">" + formatNumber(limites [1] [1]) + "</td><td style=\"text-align: right;\">"             + (limites [1] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [1] [2]) + "</p></td></tr>" +
                      "<tr><td>BS:             </td><td style=\"text-align: right;\">" + formatNumber(limites [2] [1]) + "</td><td style=\"text-align: right;\">"             + (limites [2] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [2] [2]) + "</p></td></tr>" +
                      "<tr><td>BC:                   </td><td style=\"text-align: right;\">" + formatNumber(limites [3] [1]) + "</td><td style=\"text-align: right;\">"             + (limites [3] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [3] [2]) + "</p></td></tr>" +
                      "<tr><td>Bombardiere:                  </td><td style=\"text-align: right;\">" + formatNumber(limites [4] [1]) + "</td><td style=\"text-align: right;\">"             + (limites [4] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [4] [2]) + "</p></td></tr>" +
                      "<tr><td>Corazzate:                  </td><td style=\"text-align: right;\">" + formatNumber(limites [5] [1]) + "</td><td style=\"text-align: right;\">"             + (limites [5] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [5] [2]) + "</p></td></tr>" +
                      "<tr><td>RIP:                    </td><td style=\"text-align: right;\">" + formatNumber(limites [6] [1]) + "</td><td style=\"text-align: right;\">"             + (limites [6] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [6] [2]) + "</p></td></tr>" +
                    "</table>"+
                    "</p>";

        var str2 = "<p style=\"padding: 10px 0px 0px 10px;\">"+
                    "<table style=\"margin: 0px 0px 24px 0px;\">" +
                    "<tr><td style=\"width: 150px;\">Caccioni :</td>" +
                                      "<td style=\"width: 50px;\"><input type=\"text\" value=\""+ GM_getValue('pesado')  +"\" onkeyup=\"GM_setValue('pesado' ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0.15\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Incrociatori:                    </td><td><input type=\"text\" value=\""+ GM_getValue('crucero') +"\" onkeyup=\"GM_setValue('crucero',Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0.2\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>BS:            </td><td><input type=\"text\" value=\""+ GM_getValue('naves')  +"\" onkeyup=\"GM_setValue('naves' ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0.04\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>BC:                  </td><td><input type=\"text\" value=\""+ GM_getValue('acorazados')   +"\" onkeyup=\"GM_setValue('acorazados'  ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0.07\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Bombardiere:                 </td><td><input type=\"text\" value=\""+ GM_getValue('bombarderos')  +"\" onkeyup=\"GM_setValue('bombarderos' ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Corazzata:                 </td><td><input type=\"text\" value=\""+ GM_getValue('destructores')   +"\" onkeyup=\"GM_setValue('destructores'  ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0.3\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>RIP:                   </td><td><input type=\"text\" value=\""+ GM_getValue('estrellas')  +"\" onkeyup=\"GM_setValue('estrellas' ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0.0004\" class=\"tooltip\"/></td></tr>" +
                  "</table><br /></p>";
        
      	var div = $('<div/>').attr('id','sugerenciaDeDefensas').addClass("content");
      	$('#buttonz .content .footer').before(div);
        var table = $('<table/>').css({'width':'100%'}).attr('cellspacing','0').attr('cellpadding','0').appendTo(div);
        var header = $('<tr />').addClass('header').appendTo(table);                                                                                                                                                  
        var row    = $('<tr />').addClass('row').appendTo(table); 
        var tdh1 = $('<td/>').attr('colspan','2').appendTo(header);
        $('<h2/>').html('<span class="h_batteships">Proporzione flotta suggerita (<abbr>?</abbr>)</span><span class="h_civilships">Configurazione</span>').attr('title','Rosso indica le navi in eccesso. Verde indica le navi mancanti. Per cambiare la proporzione, semplocemente edita i valori e aggiorna la pagina').addClass('tooltip').appendTo(tdh1); 

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
// ==UserScript==
// @name           OGame: Defensas proporcional sugerida
// @description    Agrega una sugerencia en la sección defensas.
// @namespace      defensa-sugerida
// @downloadURL    https://userscripts.org/scripts/source/151824.user.js
// @updateURL      http://userscripts.org/scripts/source/151824.meta.js 
// @version        1.15
// @date           2013-04-05
// @include        http://*.ogame.*/game/index.php?page=*
// @require        http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==

/*
  Referencia:

  100 Lanzamisiles (401) cada 100 Laser Pequeños (402)
  1 Laser Grande (403) cada 4 Laser Pequeños (402)
  1 Cáñon Ionio (405) cada 30 Laser Pequeños (402)
  1 Cañón de Gauss (404) cada 12 Laser Pequeños (402)
  1 Cañón de Plama (406) cada 100 Laser Pequeños (402)

*/

(function () {

  if((typeof(oGameVersionCheck) != "undefined")) {
  	oGameVersionCheck('Defensas proporcional sugerida','5.6.99.99','http://userscripts.org/scripts/show/151824');
  }
  if(document.location.href.indexOf ("/game/index.php?page=defense") < 0) { return; }
    
	var myFunc = (function () {
    
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
          prefix = "&nbsp;<b>&uarr;</b>&nbsp;";
          formatedNumber = ("" + num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + "." });
          formatedNumber = prefix + formatedNumber;
        }
         
        return formatedNumber;
    }
    
    var theUrl = document.location.href;
    if (theUrl.indexOf ("/game/index.php?page=defense") >= 0) {
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
        var lasers = $ ("#details402 span.textlabel");
        if(null == lasers [0]){
          $("#buttonz div.content").html('<p style=\"padding: 10px 0px 10px 40px;\">Las sugerencias se mostrarán nuevamente cuando se termine la producción<br />de lásers pequeños en este planeta.</p>' + $("div.content").html());
          return;
        }
        lasers = lasers [0].nextSibling.textContent;
        lasers = parseInt(lasers.replace(/\./g,''));
        
        var lanzas  = GM_getValue('lanzas')  > 0 ? GM_getValue('lanzas')  : ( 100 / 100 );
        var grandes = GM_getValue('grandes') > 0 ? GM_getValue('grandes') : (  1 /   4 );
        var ionico  = GM_getValue('ionico')  > 0 ? GM_getValue('ionico')  : (  1 /  30 );
        var gauss   = GM_getValue('gauss')   > 0 ? GM_getValue('gauss')   : (  1 /  12 );
        var plasma  = GM_getValue('plasma')  > 0 ? GM_getValue('plasma')  : (  1 / 100 );
        
        GM_setValue('lanzas' ,Math.round(lanzas *10000)/10000);
        GM_setValue('grandes',Math.round(grandes*10000)/10000);
        GM_setValue('ionico' ,Math.round(ionico *10000)/10000);
        GM_setValue('gauss'  ,Math.round(gauss  *10000)/10000);
        GM_setValue('plasma' ,Math.round(plasma *10000)/10000);

        lanzasQty  = Math.round( lasers * lanzas  );
        grandesQty = Math.round( lasers * grandes );
        ionicoQty  = Math.round( lasers * ionico  );
        gaussQty   = Math.round( lasers * gauss   );
        plasmaQty  = Math.round( lasers * plasma  );
        
        var lasersParaNivelar = 0;
        var limites = [["401", lanzasQty, 0,lanzas],["403", grandesQty, 0, grandes],["404", gaussQty, 0, gauss],["405", ionicoQty, 0, ionico],["406", plasmaQty, 0, plasma]];
        for (var i = 0; i < limites.length; i++) {
  			  var cantidad = $ ("#details" + limites [i] [0] + " span.textlabel");
          if (cantidad.length > 0) { 
            cantidad = cantidad [0].nextSibling.textContent;
            cantidad = parseInt(cantidad.replace(/\./g,''));
            limites [i][2] =  cantidad - limites [i][1];
            if(limites [i][2] > 0) {
    					$(".defense" + limites [i][0]).parent().attr("class", "off");
    					if(limites[i][3] > 0){
                var aux = limites[i][2] * limites[i][3];
                if(lasersParaNivelar < aux){
                   lasersParaNivelar = aux;
                }
              }
  					}
  				}
  			}
  		
      var str1 = "<p style=\"padding: 0px 0px 0px 40px;\"><br /><span style=\"font-size: x-small;\">Basada en la cantidad de lásers pequeños construidos.<br/>";
  		if(lasersParaNivelar > 0){
        str1 = str1 + "Hacen falta <span style=\"color:lime;\"><b>" + Math.ceil(lasersParaNivelar) + "</b></span> lásers pequeños más para nivelar.</span><br /><br />";
      }
      str1 = str1 + "<table style=\"margin: 0px 0px 24px 40px;\">" +
                      "<tr><td style=\"width: 150px;\">Lanzamisiles:</td>" +
                                                  "<td style=\"width: 50px; text-align: right;\">" + formatNumber(limites [0] [1]) + "</td><td style=\"width: 50px; text-align: right;\">"+ (limites [0] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [0] [2]) + "</p></td></tr>" +
                      "<tr><td>Lásers Grandes:             </td><td style=\"text-align: right;\">" + formatNumber(limites [1] [1]) + "</td><td style=\"text-align: right;\">"             + (limites [1] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [1] [2]) + "</p></td></tr>" +
                      "<tr><td>Cañón Gauss:                </td><td style=\"text-align: right;\">" + formatNumber(limites [2] [1]) + "</td><td style=\"text-align: right;\">"             + (limites [2] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [2] [2]) + "</p></td></tr>" +
                      "<tr><td>Cañón iónico:               </td><td style=\"text-align: right;\">" + formatNumber(limites [3] [1]) + "</td><td style=\"text-align: right;\">"             + (limites [3] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [3] [2]) + "</p></td></tr>" +
                      "<tr><td>Cañón de plasma:            </td><td style=\"text-align: right;\">" + formatNumber(limites [4] [1]) + "</td><td style=\"text-align: right;\">"             + (limites [4] [2] > 0 ? "<p style=\"color:red;\">" : "<p style=\"color:lime;\">" ) + formatNumberWithPrefix(limites [4] [2]) + "</p></td></tr>" +
                    "</table>"+
                    "<br /></p>";
        
        var str2 = "<p style=\"padding: 10px 0px 0px 10px;\">"+
                    "<table style=\"margin: 0px 0px 24px 0px;\">" +
                    "<tr><td style=\"width: 150px;\">Lanzamisiles:</td>" +
                                      "<td style=\"width: 50px;\"><input type=\"text\" value=\""+ GM_getValue('lanzas')  +"\" onkeyup=\"GM_setValue('lanzas'  ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 1\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Lásers Grandes:             </td><td><input type=\"text\" value=\""+ GM_getValue('grandes') +"\" onkeyup=\"GM_setValue('grandes' ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0.25\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Cañón Gauss:                </td><td><input type=\"text\" value=\""+ GM_getValue('gauss')  +"\" onkeyup=\"GM_setValue('gauss'    ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0.0833\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Cañón iónico:               </td><td><input type=\"text\" value=\""+ GM_getValue('ionico')   +"\" onkeyup=\"GM_setValue('ionico' ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0.0333\" class=\"tooltip\"/></td></tr>" +
                    "<tr><td>Cañón de plasma:            </td><td><input type=\"text\" value=\""+ GM_getValue('plasma')  +"\" onkeyup=\"GM_setValue('plasma'  ,Math.round(this.value*10000)/10000);\" style=\"width: 40px; height: 16px;\" title=\"Valor por defecto = 0.01\" class=\"tooltip\"/></td></tr>" +
                  "</table><br /></p>";
        
      	var div = $('<div/>').attr('id','sugerenciaDeDefensas').addClass("content");
      	$('#buttonz .content .footer').before(div);
        var table = $('<table/>').css({'width':'100%'}).attr('cellspacing','0').attr('cellpadding','0').appendTo(div);
        var header = $('<tr />').addClass('header').appendTo(table);                                                                                                                                                  
        var row = $('<tr/>').addClass('row').appendTo(table);
        var tdh1 = $('<td/>').attr('colspan','2').appendTo(header);
        $('<h2/>').html('<span class="h_batteships">Proporción de defensa sugerida (<abbr>?</abbr>)</span><span class="h_civilships">Configuración</span>').attr('title','Rojo indica que estás excedido. Verde indica faltante. Para cambiar la proporción, simplemente edita los valores y refresca la pantalla.').addClass('tooltip').appendTo(tdh1); 

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
// ==UserScript==
// @name       Pennergame Plunder-Wertanzeige
// @namespace  http://pennergame.de/
// @version    0.1
// @description  enter something useful
// @match      http://*.pennergame.de/stock/plunder/
// @copyright  2013+, Patrick Siemen
// ==/UserScript==

/* ----- jQuery Loading Function (Pennergame uses Mootools) ----- */
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};


/* ----- Load jQuery ----- */
loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
    var plunderwert = 0;
    var plunder = new Array();
    
    $('.td_plunder').each(function() {
        var money = 0.00;
        var amount = 1;
        $(this).find('td .plunder_menu ul a li').each(function() {
        	var match = $(this).html().match('€([0-9]+,[0-9]{1,2})');
            if(match) money = parseFloat(match[1].replace(",","."));
        });
        amount = parseInt($(this).find('.col2 a span').html().replace("x ",""));
        var name = $(this).find('.col2 a strong').html();
        
        var plus = amount*money;
        plunder[name] = plus;
        plunderwert += plus;
        $(this).find('td.col6').append('Wert: '+plus+'€');
    });
    $('table tbody').append('<tr class="odd ztip trhover td_plunder"><td></td><td></td><td></td><td></td><td></td><td style="padding: 10px 2px;">Gesamtwert: '+plunderwert+'€</td></tr>');
});
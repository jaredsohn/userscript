// ==UserScript==
// @name           FIB Plazas Matricula
// @namespace      http://www.zurcheva.wordpress.com
// @description    Muestra solo las plazas de las asignaturas que uno busque
// @include        http://www.fib.upc.edu/fib/estudiar-enginyeria-informatica/matricula/lliures/lliuresGRAU.html
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        1.0
// ==/UserScript==

$(document).ready(function(){
    var asig=new Array("BD", "CI", "EDA", "PE");
    $(".taula_blava #table tr").each(function(){
        i=0;
        show = false;
        while(i<asig.length && !show){
            if($(this).find("th").html()==asig[i]){
                show = true;
            }
            i++;
        }
        if(!show){
            $(this).hide();
        }
        
    });
      
$("")

});
// ==UserScript==
// @name       Pennergame Kapitaloverview Beta
// @namespace  http://pennergame.de
// @version    0.11
// @description  enter something useful
// @match      http://*.pennergame.de/stock/bottle/
// @copyright  2013+, Patrick Siemen
// ==/UserScript==

/* ----- jQuery Loading Function (Pennergame uses Mootools) ----- */
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};


/* ----- Load jQuery ----- */
loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
    
    /* Town Config, add a new line with the subdomain to support your city! */
    var towns = new Array();
    towns['koeln'] = 0.27;
    towns['www']   = 0.25;
    
    /* Default Bottleprice, if not configured in towns array */
    var bottleprice = 0.25;
    var town = window.location.href.match('//([a-zA-Z1-9]+).')[1];
    if(towns[town]) bottleprice = towns[town];
    
    
    var bottles = $(".item_list span").html();
    //console.log(bottles.match('([0-9]+) '));
    var money = bottles.match('([0-9]+) ')[1]*bottleprice;
    money = Math.round(money*Math.pow(10,2))/Math.pow(10,2)
    $('table.item_list tbody').append('<tr><td width="20"> </td> <td align="left" width="250"> Maximaler Erlös zum bestmöglichen Kurs: </td> <td width="190" align="right"> <b> €'+money+' ('+bottleprice*100+'ct)</b> </td></tr>');
    
    var money_container = $('.money .ttip').html();
    //console.log($('.money .ttip').html());
    //console.log(money_container);
    var bar = money_container.match('[0-9].+')[0].replace(".","").replace(",",".");
    money = parseFloat(money)+parseFloat(bar);
    
    $('table.item_list tbody').append('<tr><td width="20"> </td> <td align="left" width="250"> Aktuell vorhandenes Kapital (Pfand + Bar): </td> <td width="190" align="right"> <b> €'+money+' </b> </td></tr>');
    //alert(town+': '+bottles.match('([1-9]+) ')[1]+' * '+bottleprice+' = '+money+'€');
});
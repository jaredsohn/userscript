// ==UserScript==
// @name           Sortierbare Arbeiten
// @author         Kambfhase
// @description    Macht die Arbeiten Sortierbar.
// @include        http://spiel.antamar.org/Antamar/Rathaus.php?aktion=jobcenter*
// @require        http://kampfhase2005.ka.funpic.de/uploads/GM_jquery.js
// @version        0.1
// ==/UserScript==


var $= unsafeWindow.jQuery,
    tbodycache = $('#gameContent').find('table.job > tbody'),
    jsoncache = [],
    cl = unsafeWindow.console ? unsafeWindow.console.log : GM_log ,
createJson = function(){

    var arbeiten, rdauer, rg, rth, rgr,
        sum, b;
        
    if( !jsoncache.length ){
        arbeiten = tbodycache.find('tr:nth-child(3n+3)');
        rdauer = /(\d+) Tage/i;
        rg = /(\d+)<img.*?alt="G">/i;
        rth = /(\d+)<img.*?alt="Th">/i;
        rgr = /(\d+)<img.*?alt="Gr">/i;
        
        jsoncache = arbeiten.map(function(i,elem){
            var self = $.single( this),
                tds = self.children(),
                arbeit = {
                    name: tds.first().text(),
                    dauer: ~~rdauer.exec( tds.eq(2).text())[1],
                    lohn: tds.eq(1).html(),
                    tr1: self[0],
                    tr2: self.next()
                };
                
            sum = 0;
            
            b = rg.exec( arbeit.lohn);
            sum +=  b ? (~~b[ 1]) *100 : 0;
            
            b = rth.exec( arbeit.lohn);
            sum +=  b ? (~~b[ 1]) *10 : 0;
            
            b = rgr.exec( arbeit.lohn);
            sum +=  b ? (~~b[ 1]) : 0;
            
            arbeit.lohn = sum;
            
            return arbeit;
        });
    }
    return jsoncache;
},
drawJson = function(){
    var tbodycontent = tbodycache.children().detach().first(),     
        i=0,
        empty = $('<tr><th colspan="5"> </th></tr>');
    for(; i< jsoncache.length; ++i){
        tbodycontent = tbodycontent.add( jsoncache[i].tr1 ).add( jsoncache[i].tr2 ).add( empty.clone());
    }
    
    tbodycontent.appendTo( tbodycache);
},
createHandler = function( sortfn){
    return function(){
        createJson();
        jsoncache = jsoncache.sort( sortfn);
        drawJson();
    };
};
    
$.noConflict(); // evntl. Probleme mit Protoype beseitigen
$.single=function(a){return function(b){a[0]=b;return a}}($([1])); // von James Padolsey

tbodycache.find('tr:first > th:eq(2)').click( createHandler(function( a,b){
    return a.dauer - b.dauer;
}));
tbodycache.find('tr:first > th:eq(1)').click( createHandler(function( a,b){
    return a.lohn - b.lohn;
}));
tbodycache.find('tr:first > th:eq(0)').click( createHandler(function( a,b){
    return a.name.localeCompare( b.name);
}));

GM_addStyle((<><![CDATA[
#gameContent table.job > tbody > tr:nth-child(1) > th {
    text-decoration: underline;
    cursor: pointer;
}
]]></>).toString());
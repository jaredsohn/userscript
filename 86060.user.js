// ==UserScript==
// @name          Asamblea del BOI
// @namespace      www.erepublik.com
// @include        http://www.erepublik.com/es
// @include        http://www.erepublik.com/en
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://asambleaboi.awardspace.biz/index.htm',
    onload:function(response){
        $('#latestnews').css('margin-top', '30px').before('<div id="oco"></div>');
        var earmy = $('#oco');
        earmy.append('<h1 style="padding-bottom: 5px;"><embed class="sIFR-flash" height="28" width="250" src="/flash/delicious.swf" quality="best" flashvars="txt=Asamblea del BOI&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28" wmode="opaque" bgcolor="null" sifr="true" type="application/x-shockwave-flash" style="width: 250px; height: 28px;"/><span class="sIFR-alternate">Asamblea del BOI</span></h1>');
        earmy.append('<ul  style="float: left;" class="tabs">'
                +'<li id="ordenes"><a class="on" href="#"><span style="width: 156px;">Novedades (BOI)</span></a></li>'
                +'<li id="chat"><a class="on" href="http://02.chat.mibbit.com/?channel=%23boi&server=irc.rizon.net" target="_blank"><span style="width: 155px;">Asamblea (IRC)</span></a></li>'
                +'</ul>');
       
        earmy.append('<div style="width: 100%; float: left; " id="vordenes"></div>');       
       
        ordenes = $('#vordenes');
        var respuesta=response.responseText;
        ordenes.append(respuesta);
    }
})
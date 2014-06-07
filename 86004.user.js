// ==UserScript==
// @name          Ordenes C.O.I.
// @namespace      www.erepublik.com
// @include        http://www.erepublik.com/es
// @include        http://www.erepublik.com/en
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://ordenescoi.awardspace.biz/',
    onload:function(response){
        $('#latestnews').css('margin-top', '30px').before('<div id="oco"></div>');
        var earmy = $('#oco');
        earmy.append('<h1 style="padding-bottom: 5px;"><embed class="sIFR-flash" height="28" width="250" src="/flash/delicious.swf" quality="best" flashvars="txt=Ordenes C.O.I.&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28" wmode="opaque" bgcolor="null" sifr="true" type="application/x-shockwave-flash" style="width: 250px; height: 28px;"/><span class="sIFR-alternate">Ordenes C.O.I.</span></h1>');
        earmy.append('<ul  style="float: left;" class="tabs">'
                +'<li id="ordenes"><a class="on" href="#"><span style="width: 156px;">Ordenes (C.G.)</span></a></li>'
                +'<li id="chat"><a class="on" href="http://02.chat.mibbit.com/?channel=%23coi&server=irc.rizon.net&channelkey=demoniocafetero" target="_blank"><span style="width: 155px;">Barracón (IRC)</span></a></li>'
                +'</ul>');
       
        earmy.append('<div style="width: 100%; float: left; " id="vordenes"></div>');       
       
        ordenes = $('#vordenes');
        var respuesta=response.responseText;
        ordenes.append(respuesta);
    }
})
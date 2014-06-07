// ==UserScript==
// @name        banrisul_servicos
// @namespace   http://stackoverflow.com/users/982924/rasg
// @author      RASG
// @version     2012.06.22
// @description Mostra um mapa na pagina de busca de estabelecimentos credenciados do refeisul. Chega de copiar e colar no google maps :)
// @require     http://code.jquery.com/jquery.min.js
// @require     http://maps.google.com/maps/api/js?sensor=false&region=BR&callback=initialize
// @include     http*//*banrisulservicos.com.br/bdr/link/bdrw99hw_rede_credenciada_lista.asp?*
// @include     http*//*banrisulservicos.com.br/bdr/link/bdrw99hw_rede_credenciada.asp?*
// ==/UserScript==

/*  
    ----------------------------------------------------------------------------
    METODO DE CARREGAMENTO DO JQUERY (metodo_JQ):
    
    1 = usar o @require do greasemonkey
    2 = carregar o script de jquery.com e inserir na pagina
    
    Tente usar primeiro o metodo padrao (1) que e mais rapido
    Caso o script nao funcione, altere para (2)
    Se ainda assim nao funcionar, informe na pagina do script em userscripts.org
    ----------------------------------------------------------------------------
*/

metodo_JQ(1);
metodo_Gmaps(2);

//if (!GM_getValue("valstart")) {GM_setValue("valstart","Av Ipiranga 1000 Porto Alegre")}

$(window).load(function(){

    var DIVmapa = document.createElement('div');
        DIVmapa.id = 'DIVmapa';
        DIVmapa.style.border = '2px coral solid';
        DIVmapa.style.cursor = 'pointer';
        DIVmapa.style.display = '';
        DIVmapa.style.height = '80%';
        DIVmapa.style.margin = '1';
        DIVmapa.style.overflow = 'hidden';
        DIVmapa.style.position = 'fixed';
        DIVmapa.style.padding = '1';
        DIVmapa.style.right = '1%';
        DIVmapa.style.top = '1%';
        DIVmapa.style.width = '35%';
        DIVmapa.style.zIndex = '99';

    var DIVinterna = document.createElement('div');
        DIVinterna.id = 'DIVinterna';
        DIVinterna.style.height = '100%';
        DIVinterna.style.width = '100%';
        DIVinterna.style.zIndex = '999';

    var DIVendereco = document.createElement('div');
        DIVendereco.id = 'DIVendereco';
        DIVendereco.style.border = '1px pink solid';
        DIVendereco.style.zIndex = '98';

    $(DIVmapa).append(DIVendereco)
    $(DIVmapa).append(DIVinterna)
    $(DIVmapa).appendTo('body')
    
    $(DIVendereco)
        .append("<input type='text' id='txtstart' name='txtstart' placeholder='Digite aqui o endereço inicial (ponto A) da rota'></input>")
        .append("<select id='seltravelMode' name='seltravelMode'><option value='WALKING'>A pé</option><option value='DRIVING'>De carro</option></select>")
    $('#txtstart')
        .val( GM_getValue("valstart") )
        .css({'width':'80%','color':'#C3BEBE'})
        .on('focusout', function() { GM_setValue("valstart", $(this).val()) })
    $('#seltravelMode')
        .val( GM_getValue("valtravelMode") )
        .css({'width':'20%','color':'#C8C8C8','display':'inline-block'})
        .on('focusout', function() { GM_setValue("valtravelMode", $(this).val()) })

});

initialize = setTimeout(function () {
    
    $('.lista .subtitulos-menor').css({'font-family':'Arial,Helvetica,sans-serif'})
    $('#cmbEstado').append('<option>RS</option>').val('RS')
    $('#cmbCidade').append('<option>PORTO ALEGRE</option>').val('PORTO ALEGRE')
    
    $('body').on('click', '.lista .descricao', function() {
        var rua = $.trim( $(this).text().replace(/\s{2,}/g, ' ') );
        var cidade = $('.lista .descricao').eq(4).text().replace(/\s{2,}/g, ' ');
        end = $.trim(rua + cidade);
        //GM_log('rua : ' + rua)
        GM_log('end : ' + end)
        calcRoute();
    })

    google = unsafeWindow.google;
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    var PortoAlegre = new google.maps.LatLng(-30.034176,-51.229212);
    var myOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: PortoAlegre
    }
    
    map = new google.maps.Map(document.getElementById("DIVinterna"), myOptions);
    directionsDisplay.setMap(map);

    function calcRoute() {
        var start = GM_getValue("valstart");
        if (!start) {alert('Defina o ponto de partida \n'+'na caixa texto acima do mapa')}
        var waypts = [];
        var travel_Mode = $('#seltravelMode').val();
        var request = {
            origin: start,
            destination: end,
            waypoints: waypts,
            optimizeWaypoints: false,
            travelMode: google.maps.DirectionsTravelMode[travel_Mode]
        };
        
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {directionsDisplay.setDirections(response)}
            else { alert('Google Maps API DirectionsStatus : ' + status) }
            GM_log('Google Maps API DirectionsStatus : ' + status);
        });
        
        GM_log('start : ' + start)
    }
    
}, 1000);

function metodo_JQ(metodo){
    JQ    = "http://code.jquery.com/jquery.js";
    JQmin = "http://code.jquery.com/jquery.min.js";

    if (metodo == 2) {
        var script = document.createElement('script');
            script.src = JQmin;
        var head = document.getElementsByTagName("head")[0];
            (head || document.body).appendChild(script);
    };
};

function metodo_Gmaps(metodo){
    API_js_callback = "http://maps.google.com.br/maps/api/js?sensor=false&region=BR&callback=initialize";

    if (metodo == 2) {
        var script = document.createElement('script');
            script.src = API_js_callback;
        var head = document.getElementsByTagName("head")[0];
            (head || document.body).appendChild(script);
    };
};
// ==UserScript==
// @name           EPTC
// @namespace      http://stackoverflow.com/users/982924/rasg
// @author         RASG
// @version        2012.06.14
// @description    [EN] Uses the Google Maps API to show the buses routes in Porto Alegre - Brazil. [PT] Usa a API do Google Maps para mostrar as rotas dos onibus de Porto Alegre no site da EPTC.
// @require        http://code.jquery.com/jquery.min.js
// @require        http://maps.google.com/maps/api/js?sensor=false&region=BR&callback=initialize
// @include        http*://*eptc.com.br/EPTC_Itinerarios/Cadastro*
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

$(window).load(function(){
    var Tabela_1 = $('table')[0]
        $(Tabela_1).attr('id','tbl1')
    var Tabela_2 = $('table')[1]
        $(Tabela_2).attr('id','tbl2')

    var DIVmapa = document.createElement('div');
        DIVmapa.id = 'DIVmapa';
        DIVmapa.style.border = '2px coral solid';
        DIVmapa.style.cursor = 'pointer';
        DIVmapa.style.display = '';
        DIVmapa.style.height = '75%';
        DIVmapa.style.margin = '1';
        DIVmapa.style.position = 'fixed';
        DIVmapa.style.padding = '1';
        DIVmapa.style.right = '1%';
        DIVmapa.style.top = '1%';
        DIVmapa.style.width = '30%';
        DIVmapa.style.zIndex = '99';

    var DIVinterna = document.createElement('div');
        DIVinterna.id = 'DIVinterna';
        DIVinterna.style.height = '100%';
        DIVinterna.style.width = '100%';
        DIVinterna.style.zIndex = '999';

    $(DIVmapa).append(DIVinterna).appendTo('body')
});

initialize = setTimeout(function () {
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
        var start, end;
        var waypts = [];
        
        $('#tbl1 tr td').each(function(index) {
            var rua = this.innerHTML.replace(/\s{2,}/g, ' ')
            rua = $.trim( $(rua).text() ) + ' Porto Alegre'
            if (index == 1) { start = rua}
            if ((index > 1) & (index < 10)) { waypts.push({location: rua, stopover: true}) }
            if (index == 10) { end = rua}
        })
        
        var request = {
            origin: start, 
            destination: end,
            waypoints: waypts,
            optimizeWaypoints: false,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {directionsDisplay.setDirections(response)}
            else { alert('Google Maps API DirectionsStatus : ' + status) }
            GM_log('Google Maps API DirectionsStatus : ' + status);
        });
    }
    
    calcRoute();
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
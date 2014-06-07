// ==UserScript==
// @name            OndeTemBanrisul
// @namespace       http://stackoverflow.com/users/982924/rasg
// @author          RASG
// @description     OndeTemBanrisul
// @require         http://code.jquery.com/jquery.min.js
// @require         http://maps.google.com/maps/api/js?sensor=false&region=BR&callback=initialize
// @require         https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include         http*://*banrisul.com.br/bob/link/bobw00hn_onde_tem_banrisul.aspx?secao_id=111*
// @version         2012.11.21
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

if (window.$ == undefined) { metodo_JQ(1) }
else { $ = window.$ }

var ArrCoord = [];
var ArrAdrress = [];
var icone = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAlCAYAAAAjt+tHAAACWElEQVRYhe2XMW/TQBTHf2elaRSZigGhdADBwAKUqmJCjDgTElKHfgg+AeoniPgEfAiGSKwWCxLKVKqABEMHpDK0Qh0QNZUxlo/B78I1SuI74yoM/KXTxY59/5/fvZf4Ka01AP1+vwUEQFvmFs0qBwogA4o4jnMApbU25m2gI6MtAEFD5oUAZEAqI4vjOFdRFBnzLrAmc4eLiUAKnAHfZc7MU3bE/KrWetSw8TkppR7IxwLI7dB3tdaj3e1jbq3/5PqVX40aH56scHC0ymDYGymlNpBtsBOvA7ibb72C8C78+ATvHldePrWmybPAZLsZbuabL+HSPVABhHfKYwdZa088TZb7ZXt4e/GxmwJ/Y6Pk4+JjXwpvjXfg9D3oopzHO7UB6tf6/pPat9YDuPYUbj6rvu7zc/jywnlZ9y1wMfe5zhvA6M0Nv/ONA8ySLmrf2tS/3ZIBVP1llh4B9zJ0SbIaibj0CPwdQM3Saw6gAf0H+GcA6v+W1ldhAHJrcHiycmGO1toTzxZ/2qUU4OBoFah4ObXLz7EUzWu5KBXPQkVR1AZC4DILGpPd7WMebSROZq8/hAyGvZnfSWPyFfgGJCYCKWW7hDQNdmsWAAyGvbdQDWHMlVIP5ZTJr+nWLAUKl+Z08g6vtd5bFAnL/D7nc2t+c1rRnpvZbt/2Z0FY5lvylGafbYDZ7fkiCViHMk9CgRjbEJb5ppgnMlJjNE+VAHMgQhMJwH7yBA9zZ4AZEGsCsQeYPU8ok8vZ3AtgCqIroy1fZZShP/Mx9wawIExSmlI1JZb5mAP8BlUXEerSolSpAAAAAElFTkSuQmCC";

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
        DIVmapa.style.zIndex = '998';

    var DIVinterna = document.createElement('div');
        DIVinterna.id = 'DIVinterna';
        DIVinterna.style.height = '100%';
        DIVinterna.style.width = '100%';
        DIVinterna.style.zIndex = '999';

    var DIVendereco = document.createElement('div');
        DIVendereco.id = 'DIVendereco';
        DIVendereco.style.border = '1px pink solid';
        DIVendereco.style.zIndex = '997';

    $(DIVmapa).append(DIVendereco)
    $(DIVmapa).append(DIVinterna)
    $(DIVmapa).appendTo('body')

    $('#ctl00_ctl00_ExtraConteudo02_ExtraConteudo02_listaAg tr[class!=linhaHeader]').each(function(index) {
        var ag = $.trim( $(this).children().filter('.colunaNome.itemEsquerda').text() );
        var cod = $.trim( $(this).children().filter('.colunaCodInternet.item.posicao').text() );
        var cidade = ' ' + $.trim( $('#ctl00_ctl00_Conteudo_MainContent_lblCidadeSelecionada').text() );
        var rua = $(this).children().filter('.colunaEndereco.item').text().replace(/(.*?\d*[^\D])/gi, '$1');
        var endereco = $.trim( rua.replace(/\s{2,}/g, ' ') ) + cidade;
        var fone = $.trim( $(this).children().filter('.colunaFone.item').text() );

        ArrAdrress.push(endereco)
        //console.log('adicionado ao ArrAdrress : ' + endereco)
    })
    
    metodo_Gmaps(2);

});

initialize = setTimeout(function () {

    google = unsafeWindow.google;
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();

    var DetectedPosition = function(position) {
        var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        addMarker(userLatLng, 'Detected location', true)
    }

    var PortoAlegre = new google.maps.LatLng(-30.034176,-51.229212);
    
    var myOptions = {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: PortoAlegre
    }
    
    map = new google.maps.Map(document.getElementById("DIVinterna"), myOptions);
    navigator.geolocation.getCurrentPosition(DetectedPosition);

    for (var i = 0; i < ArrAdrress.length; i++) {
        window.setTimeout( trap(geocodificar, [i, ArrAdrress]), [i]*1000 )
    }
    
}, 1000);

function geocodificar(i, ArrAdrress) {
    geocoder.geocode({ 'address': ArrAdrress[i]}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            addMarker(results[0].geometry.location, 'ponto '+[i], false, i)
            ArrCoord.push(results[0].geometry.location)
        }
        else {
            console.log("ERRO no Geocode :  " + status);
        }
    })
    //console.log( 'address no geocoder : ' + ArrAdrress[i] )
}

trap = function (fn, args) {
    return function() {
        return fn.apply(this, args);
    };
};

function addMarker(coord, plcname, thatsme, i) {
    var marker = new google.maps.Marker({
        draggable: false,
        map: map,
        position: coord,
        title: plcname
    });
    if (arguments.length == 4) {
        var numofmarkers = i + 1;
        marker.setIcon('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+numofmarkers+'|FF3300|FFFFFF')
    }
    
    google.maps.event.addListener(marker, 'click', function() {
        if (infowindow) {
            infowindow.close();
        }
        infowindow.setContent('<div class="infodiv">'+plcname+'</div>')
        infowindow.open(map, marker)
    });

    if (thatsme) {
        marker.setDraggable(true)
        marker.setIcon(icone)
        marker.setTitle("That's me")
        infowindow.setContent("Localizaçao aproximada")
    }
}

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
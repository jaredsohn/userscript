// ==UserScript==
// @name          Norske kart for Geocaching.com
// @version       0.31
// @description   Offisielle norske kart for Geocaching.com
// @include       http://www.geocaching.com/map/*
// ==/UserScript==
if ((navigator.userAgent.indexOf("Chrome") != -1) || (navigator.userAgent.indexOf("Opera") != -1))
{
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent ='Groundspeak.Map.MapLayers.unshift({ tileUrl:"http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}", name:"Statens kartverk Topografisk Norgeskart", alt:"SK Topo", attribution:"Statens kartverk, Geovekst og kommuner", subdomains:"1234", tileSize:256, minZoom:0, maxZoom:17},{ tileUrl:"http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2graatone&zoom={z}&x={x}&y={y}", name:"Statens kartverk Topografisk Norgeskart Gråtone", alt:"SK Topogrå", attribution:"Statens kartverk, Geovekst og kommuner", subdomains:"1234", tileSize:256, minZoom:0, maxZoom:17},{ tileUrl:"http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=toporaster2&zoom={z}&x={x}&y={y}", name:"Statens kartverk Topografisk Rasterkart", alt:"SK Raster", attribution:"Statens kartverk, Geovekst og kommuner", subdomains:"1234", tileSize:256, minZoom:0, maxZoom:17},{tileUrl:"http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=sjo_hovedkart2&zoom={z}&x={x}&y={y}", name:"Statens kartverk Sjøkart", alt:"SK Sjø", attribution:"Statens kartverk", subdomains:"1234", tileSize:256, minZoom:0, maxZoom:17},{tileUrl:"http://mt{s}.google.com/vt?&x={x}&y={y}&z={z}",name:"googlemaps",alt:"Google maps",attribution:"Google maps",subdomains:"0123",tileSize:256,minZoom:0,maxZoom:22},{tileUrl:"http://mt{s}.google.com/vt?lyrs=y&x={x}&y={y}&z={z}&scaleControl=true",name:"googlemapshyb",alt:"Google hybrid",attribution:"Google hybrid",subdomains:"0123",tileSize:256,minZoom:0,maxZoom:22},{tileUrl:"http://mt{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}&scaleControl=true",name:"googlemapssat",alt:"Google satelite",attribution:"Google satelit",subdomains:"0123",tileSize:256,minZoom:0,maxZoom:22},{tileUrl:"http://mt{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}",name:"googlemapssat",alt:"Google terrain",attribution:"Google terrain",subdomains:"0123",tileSize:256,minZoom:0,maxZoom:22},{tileUrl:"http://map0{s}.eniro.com/geowebcache/service/tms1.0.0/aerial/{z}/{x}/{y}.jpeg",name:"eniroaerial",alt:"Eniro Aerial",attribution:"Eniro",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:18,scheme:"tms"},{tileUrl:"http://map0{s}.eniro.no/geowebcache/service/tms1.0.0/map/{z}/{x}/{y}.png",name:"eniromap",alt:"Eniro Street",attribution:"Eniro",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:18,scheme:"tms"});for (var a = {}, b = [], c = 0, d = Groundspeak.Map.MapLayers.length; c < d; c++) {var e = Groundspeak.Map.MapLayers[c],g = new L.TileLayer(e.tileUrl, e);b.push(g);a[e.alt] = g}a = new L.Control.Layers(a);MapSettings.Map.removeLayer(MapSettings.Map._layers[1]);$("a[title=Layers]").parent().remove();MapSettings.Map.addControl(a);$(a._form.getElementsByTagName("input")[0]).click();';
    document.body.appendChild(script);
}
else
{
    var unsafeWindow = this['unsafeWindow'] || window;
    GM_registerMenuCommand('Slå av kart', function ()
    {
        GM_setValue('tall', prompt('Oppgi nummer på kart som du vil skjule, atskilt med komma.', GM_getValue('tall', '')));
        window.location.reload();
    });
    var zob = GM_getValue('vis', '');
    var h1;
    var txt;
    if (!zob)
    {
        h1 = "Skjul nummer";
        txt = "Skjul kartenes nummer?";
    }
    else
    {
        h1 = "Vis nummer";
        txt = "Vis kartenes nummer?";
    }
    GM_registerMenuCommand(h1, function ()
    {
        if (confirm(txt))
        {
            if (zob)
            {
                zob = false;
            }
            else
            {
                zob = true;
            }
        }
        GM_setValue('vis', zob);
        window.location.reload();
    });
    layers = unsafeWindow.Groundspeak.Map.MapLayers;
    layers.unshift(
    {
        tileUrl: "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}",
        name: "Statens kartverk Topografisk Norgeskart",
        alt: "SK Topo",
        attribution: "Statens kartverk, Geovekst og kommuner",
        subdomains: "1234",
        tileSize: 256,
        minZoom: 0,
        maxZoom: 22
    }, {
        tileUrl: "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2graatone&zoom={z}&x={x}&y={y}",
        name: "Statens kartverk Topografisk Norgeskart Gråtone",
        alt: "SK Topogrå",
        attribution: "Statens kartverk, Geovekst og kommuner",
        subdomains: "1234",
        tileSize: 256,
        minZoom: 0,
        maxZoom: 18
    }, {
        tileUrl: "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=toporaster2&zoom={z}&x={x}&y={y}",
        name: "Statens kartverk Topografisk Norgeskart Raster",
        alt: "SK Raster",
        attribution: "Statens kartverk, Geovekst og kommuner",
        subdomains: "1234",
        tileSize: 256,
        minZoom: 0,
        maxZoom: 18
    }, {
        tileUrl: "http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=sjo_hovedkart2&zoom={z}&x={x}&y={y}",
        name: "Statens kartverk Sjøkart",
        alt: "SK Sjø",
        attribution: "Statens kartverk",
        subdomains: "1234",
        tileSize: 256,
        minZoom: 0,
        maxZoom: 18
    }, {
        tileUrl: "http://mt{s}.google.com/vt?&x={x}&y={y}&z={z}",
        name: "googlemaps",
        alt: "Google maps",
        attribution: "Google Maps",
        subdomains: "0123",
        tileSize: 256,
        minZoom: 0,
        maxZoom: 17
    }, {
        tileUrl: "http://mt{s}.google.com/vt?lyrs=y&x={x}&y={y}&z={z}&scaleControl=true",
        name: "googlemapshyb",
        alt: "Google hybrid",
        attribution: "Google Maps",
        subdomains: "0123",
        tileSize: 256,
        minZoom: 0,
        maxZoom: 18
    }, {
        tileUrl: "http://mt{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}&scaleControl=true",
        name: "googlemapssat",
        alt: "Google satellite",
        attribution: "Google Maps",
        subdomains: "0123",
        tileSize: 256,
        minZoom: 0,
        maxZoom: 18
    }, {
        tileUrl: "http://mt{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}",
        name: "googlemapssat",
        alt: "Google terrain",
        attribution: "Google Maps",
        subdomains: "0123",
        tileSize: 256,
        minZoom: 0,
        maxZoom: 18
    }, {
        tileUrl:"http://map0{s}.eniro.com/geowebcache/service/tms1.0.0/aerial/{z}/{x}/{y}.jpeg",
        name:"eniroaerial",
        alt:"Eniro Aerial",
        attribution:"Eniro",
        subdomains:"1234",
        tileSize:256,
        minZoom:0,
        maxZoom:18,
        scheme:"tms"
    }, {
	tileUrl:"http://map0{s}.eniro.no/geowebcache/service/tms1.0.0/map/{z}/{x}/{y}.png",
	name:"eniromap",
	alt:"Eniro Street",
	attribution:"Eniro",
	subdomains:"1234",
	tileSize:256,
	minZoom:0,
	maxZoom:18,
	scheme:"tms"
	});

    if (!GM_getValue('vis', 'false'))
    {
        for (i = 0; i < layers.length; i++)
        {
            layers[i].alt += " (" + (i + 1) + ")";
        }
    }

    function compare(a, b)
    {
        return a - b;
    }
    var cisla = GM_getValue('tall', '').split(",").sort(compare).reverse();
    for (i = 0; i < cisla.length; i++)
    {
        layers.splice(cisla[i] - 1, 1);
    }

}
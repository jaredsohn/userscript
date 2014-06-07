// ==UserScript==
// @name           gctest
// @namespace      gctest
// @include        http://www.geocaching.com/map/default.aspx*
// ==/UserScript==
var main = function () {
	var uw = (this.unsafeWindow) ? this.unsafeWindow : window;
	layers = uw.Groundspeak.Map.MapLayers;
layers.push({
	tileUrl:"http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=kartdata2&zoom={z}&x={x}&y={y}",
	name:"kartdata2",
	alt:"Kartdata2",
	attribution:"Kartdata2",
	subdomains:"1234",
	tileSize:256,
	minZoom:0,
	maxZoom:12,
	add_layer: true
});

layers.push({
	tileUrl:"http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=sjo_hovedkart2&zoom={z}&x={x}&y={y}",
	name:"sjo_hovedkart2",
	alt:"Sjøkart hovedkartserien 2",
	attribution:"sjo_hovedkart2",
	subdomains:"1234",
	tileSize:256,
	minZoom:0,
	maxZoom:17,
	add_layer: true
});

layers.push({
	tileUrl:"http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}",
	name:"topo2",
	alt:"Topografisk norgeskart 2",
	attribution:"topo2",
	subdomains:"1234",
	tileSize:256,
	minZoom:0,
	maxZoom:17,
	add_layer: true
});

layers.push({
	tileUrl:"http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2graatone&zoom={z}&x={x}&y={y}",
	name:"topo2graatone",
	alt:"Topografisk norgeskart 2 gråtone",
	attribution:"topo2graatone",
	subdomains:"1234",
	tileSize:256,
	minZoom:0,
	maxZoom:17,
	add_layer: true
});

layers.push({
	tileUrl:"http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=toporaster2&zoom={z}&x={x}&y={y}",
	name:"toporaster2",
	alt:"Topografisk norgeskart 2 gråtone",
	attribution:"toporaster2",
	subdomains:"1234",
	tileSize:256,
	minZoom:0,
	maxZoom:17,
	add_layer: true
});

layers.push({
	tileUrl:"http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=europa&zoom={z}&x={x}&y={y}",
	name:"europa",
	alt:"Europakart",
	attribution:"europa",
	subdomains:"1234",
	tileSize:256,
	minZoom:0,
	maxZoom:17,
	add_layer: true
});

layers.push({
	tileUrl:"http://mt{s}.google.com/vt?x={x}&y={y}&z={z}",
	name:"googlemaps",
	alt:"Google maps",
	attribution:"Google maps",
	subdomains:"0123",
	tileSize:256,
	minZoom:0,
	maxZoom:18,
	add_layer: true
});

layers.push({
	tileUrl:"http://mt{s}.google.com/vt?x={x}&y={y}&z={z}&lyrs=s&amp",
	name:"googlemaps",
	alt:"Google maps sat",
	attribution:"Google maps",
	subdomains:"0123",
	tileSize:256,
	minZoom:0,
	maxZoom:18,
	add_layer: true
});
    
layers.push({
	tileUrl:"http://mt{s}.google.com/vt?x={x}&y={y}&z={z}&lyrs=y&amp",
	name:"googlemaps",
	alt:"Google maps hybrid",
	attribution:"Google maps",
	subdomains:"0123",
	tileSize:256,
	minZoom:0,
	maxZoom:18,
	add_layer: true
});

layers.push({
	tileUrl:"http://mt{s}.google.com/vt?x={x}&y={y}&z={z}&lyrs=t&amp",
	name:"googlemaps",
	alt:"Google maps topo",
	attribution:"Google maps",
	subdomains:"0123",
	tileSize:256,
	minZoom:0,
	maxZoom:18,
	add_layer: true
});

layers.push({
	tileUrl:"http://mt{s}.google.com/vt?x={x}&y={y}&z={z}&lyrs=p&amp",
	name:"googlemaps",
	alt:"Google maps topo road",
	attribution:"Google maps",
	subdomains:"0123",
	tileSize:256,
	minZoom:0,
	maxZoom:18,
	add_layer: true
});

layers.push({
	tileUrl:"http://map0{s}.eniro.no/geowebcache/service/tms1.0.0/map/{z}/{x}/{y}.jpeg",
	name:"eniromap",
	alt:"Eniro",
	attribution:"Eniro",
	subdomains:"1234",
	tileSize:256,
	minZoom:0,
	maxZoom:18,
	add_layer: true
});

layers.push({
	tileUrl:"http://map0{s}.eniro.no/geowebcache/service/tms1.0.0/aerial/{z}/{x}/{y}.jpeg",
	name:"eniroaerial",
	alt:"Eniro aerial",
	attribution:"Eniro",
	subdomains:"1234",
	tileSize:256,
	minZoom:0,
	maxZoom:18,
	add_layer: true
});

layers.push({
	tileUrl:"http://map0{s}.eniro.no/geowebcache/service/tms1.0.0/nautical/{z}/{x}/{y}.jpeg",
	name:"enironautical",
	alt:"Eniro nautical",
	attribution:"Eniro",
	subdomains:"1234",
	tileSize:256,
	minZoom:0,
	maxZoom:18,
	add_layer: true
});

	if (uw.MapSettings.Map != null) {
		new_div = document.createElement('div');
		new_div.id = 'map_canvas';
		new_div.setAttribute("class", 'Map');
		new_div.setAttribute("style", 'width: 100%; height: 100%;');
		old_map = document.getElementById("map_canvas");
		pn = old_map.parentNode;
		pn.removeChild(old_map);
		pn.appendChild(new_div);
		uw.CreateMap();
	}

}
	// Bad way of replacing y-coords for eniro to the inverted one
	// Also need to fix a better way of checking what maplayer we are using
	var old_L_Util_template_Func = unsafeWindow.L.Util.template;
	unsafeWindow.L.Util.template = function(a,b)
{
    // If there is a userSession member it's the top layer with geocache icons, so don't recalculate those cordinates for that layer
    // Also check what maplayer we are using, only recalculate for Eniro
    if(!b.userSession) {
        var map_layers = unsafeWindow.document.evaluate( "//input[@type='radio' and @name='leaflet-base-layers']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        for( var i = 0; i < map_layers.snapshotLength; i++ ) {
            if(map_layers.snapshotItem(i).checked)
            {
                var map_name = map_layers.snapshotItem(i).nextSibling.textContent;
                if(map_name.search(/eniro/i) != -1) {
                    b.y = (Math.pow(2,b.z)-1-b.y);
                }
            }
        }
    }

	// Call old function with possible replaced y-value for eniro
    return old_L_Util_template_Func(a,b)
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + main + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);
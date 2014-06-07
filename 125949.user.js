// ==UserScript==
// @name           Geocaching.com extra map layers
// @description    Adds Google and Eniro maplayers to Geocaching.com, Google maps is set as default...
// @namespace      wwgcmaplayers
// @include        http://www.geocaching.com/map/*
// ==/UserScript==

/* Version history
 * 0.1 Initial release.
 * 0.2 Added Bing maps.
       Subdomains added to google for faster loading.
*/

if (navigator.appName.indexOf('Opera') == -1) {
layers = unsafeWindow.Groundspeak.Map.MapLayers;
} else {
  layers = Groundspeak.Map.MapLayers;
}

layers.splice(0,0,{tileUrl:"http://mt{s}.google.com/vt?x={x}&y={y}&z={z}",name:"google",alt:"Google",attribution:"Google",subdomains:"0123",tileSize:256,minZoom:0,maxZoom:18});
layers.splice(1,0,{tileUrl:"http://mt{s}.google.com/vt?x={x}&y={y}&z={z}&lyrs=s",name:"googlem",alt:"Google aerial",attribution:"Google",subdomains:"0123",tileSize:256,minZoom:0,maxZoom:18});
layers.splice(2,0,{tileUrl:"http://mt{s}.google.com/vt?x={x}&y={y}&z={z}&lyrs=y",name:"googley",alt:"Google hybrid",attribution:"Google",subdomains:"0123",tileSize:256,minZoom:0,maxZoom:18});
layers.splice(3,0,{tileUrl:"http://mt{s}.google.com/vt?x={x}&y={y}&z={z}&lyrs=p",name:"googlep",alt:"Google terrain",attribution:"Google",subdomains:"0123",tileSize:256,minZoom:0,maxZoom:18});
layers.splice(4,0,{tileUrl:"http://map0{s}.eniro.no/geowebcache/service/tms1.0.0/map/{z}/{x}/{y}.jpeg",name:"eniromap",alt:"Eniro",attribution:"Eniro",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:18});
layers.splice(5,0,{tileUrl:"http://map0{s}.eniro.no/geowebcache/service/tms1.0.0/aerial/{z}/{x}/{y}.jpeg",name:"eniroaerial",alt:"Eniro aerial",attribution:"Eniro",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:18});
layers.splice(6,0,{tileUrl:"http://map0{s}.eniro.no/geowebcache/service/tms1.0.0/nautical/{z}/{x}/{y}.jpeg",name:"enironautical",alt:"Eniro nautical",attribution:"Eniro",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:18});
layers.splice(7,0,{tileUrl:"http://ecn.t{s}.tiles.virtualearth.net/tiles/r{x}?g=864",name:"bing",alt:"Bing",attribution:"Bing",subdomains:"0123",tileSize:256,minZoom:1,maxZoom:18}); //g=<generation version of tile>
layers.splice(8,0,{tileUrl:"http://ecn.dynamic.t{s}.tiles.virtualearth.net/comp/CompositionHandler/{x}?it=A,G,L",name:"bingaerial",alt:"Bing aerial",attribution:"Bing",subdomains:"0123",tileSize:256,minZoom:1,maxZoom:18});


// Hybrid is an extra layer to put ontop of the normal map so disabled for now
//layers.splice(6,0,{tileUrl:"http://map0{s}.eniro.no/geowebcache/service/tms1.0.0/hybrid/{z}/{x}/{y}.jpeg",name:"enirohybrid",alt:"Eniro hybrid",attribution:"Eniro",subdomains:"1234",tileSize:256,minZoom:0,maxZoom:18});

// Alternative eniro maps url, seems alot slower then eniro.no
/*layers.splice(4,0,{tileUrl:"http://map.eniro.com/geowebcache/service/tms1.0.0/map/{z}/{x}/{y}.png",name:"eniromap",alt:"Eniro",attribution:"Eniro",tileSize:256,minZoom:0,maxZoom:18});
layers.splice(5,0,{tileUrl:"http://map.eniro.com/geowebcache/service/tms1.0.0/aerial/{z}/{x}/{y}.png",name:"eniroaerial",alt:"Eniro aerial",attribution:"Eniro",tileSize:256,minZoom:0,maxZoom:18});
layers.splice(6,0,{tileUrl:"http://map.eniro.com/geowebcache/service/tms1.0.0/hybrid/{z}/{x}/{y}.png",name:"enirohybrid",alt:"Eniro hybrid",attribution:"Eniro",tileSize:256,minZoom:0,maxZoom:18});
layers.splice(7,0,{tileUrl:"http://map.eniro.com/geowebcache/service/tms1.0.0/nautical/{z}/{x}/{y}.png",name:"enironautical",alt:"Eniro nautical",attribution:"Eniro",tileSize:256,minZoom:0,maxZoom:18});*/

var coordinateSystems = {
    SetGoogle: function(x, y, z)
    {
        this.Google.x = x;
        this.Google.y = y;
        this.Google.z = z;
    },

    SetTMS: function()
    {
        this.TMS.x = this.Google.x;
        this.TMS.y = (Math.pow(2,this.Google.z)-1-this.Google.y);
        this.TMS.z = this.Google.z;
    },

    SetQuadTree: function()
    {
        var quadKey = '';
        for(var i=this.Google.z;i>=1;i--)
        {
            var digit = 0;
            var mask = 1 << (i-1);
            if(this.Google.x & mask) {
                digit+=1;
            }
            if(this.Google.y & mask) {
                digit+=2;
            }
            quadKey += digit;
        }

        this.QuadTree.quad = quadKey;
    },

    Google: {
        x: 0,
        y: 0,
        z: 0
    },

    TMS: {
        x: 0,
        y: 0,
        z: 0
    },

    QuadTree: {
        quad: ''
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
                    coordinateSystems.SetGoogle(b.x, b.y, b.z);
                    coordinateSystems.SetTMS();
                    b.y = coordinateSystems.TMS.y;
                }

                if(map_name.search(/bing/i) != -1) {
                    coordinateSystems.SetGoogle(b.x, b.y, b.z);
                    coordinateSystems.SetQuadTree();
                    b.x = coordinateSystems.QuadTree.quad;
                    
                }
            }
        }
    }

	// Call old function with possible replaced y-value for eniro
    return old_L_Util_template_Func(a,b)
}
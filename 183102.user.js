// ==UserScript==
// @name            geoportal.gov.pl layers for WME
// @namespace       http://sciborek.com/
// @version         0.3
// @description     Displays layers from geoportal.gov.pl in WME
// @include         https://*.waze.com/*/editor/*
// @include         https://*.waze.com/editor/*
// @include         https://*.waze.com/map-editor/*
// @include         https://*.waze.com/beta_editor/*
// @include         https://editor-beta.waze.com/*
// @copyright		2013+, Patryk Ściborek
// ==/UserScript==


function geoportal_script_init()
{
    console.log('geoportal: start init');
    var my_wazeMap = unsafeWindow.wazeMap,
        wms_service="http://mapproxy.sciborek.com/service?",
        epsg4326 = new OpenLayers.Projection("EPSG:4326"),
        
        geop_orto = new OpenLayers.Layer.WMS("Geoportal - orto",
			wms_service,
            {
                layers: "geoportal_orto",
                format: "image/jpeg"
            }),
        
        geop_prng = new OpenLayers.Layer.WMS("Geoportal - nazwy",
			wms_service,
			{
				layers: "geoportal_prng",
                transparent: "true",
                format: "image/png"
			},{
				isBaseLayer: false,
				visibility: false
			}),
        
        geop_adresy = new OpenLayers.Layer.WMS("Geoportal - adresy",
			wms_service,
			{
				layers: "geoportal_adresy",
				transparent: "true",
				format: "image/png"
			},{
				isBaseLayer: false,
				visibility: false
			});
    

    
    if(my_wazeMap.getLayersByName("Geoportal - orto").length == 0)
    {
        console.log('Geoporal: adding layers');
        my_wazeMap.addLayer(geop_orto);
        my_wazeMap.addLayer(geop_prng);
        my_wazeMap.addLayer(geop_adresy);
        console.log('Geoporal: layers added');
        
        // src: https://github.com/milkboy/WME-ja/blob/master/wme_junctionangle.user.js
        //try to resize the layer selection box... Apparently the only (easy) way is to actually override the CSS
		var my_newSwitcherStyle = $('<style>.WazeControlLayerSwitcher:hover {background-color: #FFFFFF; max-height: 390px; width: 200px;}</style>');
		$('html > head').append(my_newSwitcherStyle);
    }
}

function  geoportal_script_bootstrap()
{
    console.log('geoportal: start bootstrap');
    var bGreasemonkeyServiceDefined     = false;
    
    try
    {
        if (typeof Components.interfaces.gmIGreasemonkeyService === "object")
        {
            bGreasemonkeyServiceDefined = true;
        }
    }
    catch (err)
    {
        //Ignore.
    }
    if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined)
    {
        
        unsafeWindow    = ( function ()
                           {
                               var dummyElem   = document.createElement('p');
                               dummyElem.setAttribute ('onclick', 'return window;');
                               return dummyElem.onclick ();
                           } ) ();
    }
    /* begin running the code! */
    geoportal_script_init();
}

geoportal_script_bootstrap();
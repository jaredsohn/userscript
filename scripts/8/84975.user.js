// ==UserScript==
// @name           Google Maps OS
// @namespace      http://userscripts.org/scripts/show/84975
// @description    Adds Ordnance Survey map tiles for the UK to a Google map.
// @include        http://www.gmap-pedometer.com/*
// @include        http://www.bikehike.co.uk/mapview.php*
// @include        http://www.runningahead.com/maps*
// @include        http://*mapometer.com/*
// @include        http://www.mapmyrun.com/routes*
// @include        http://www.mapmyride.com/routes*
// @include        http://www.haroldstreet.org.uk/*
// @include        http://www.walkjogrun.tld/*
// @include        http://nikerunning.nike.com/*
// @include        http://www.cycle-route.com/*
// @version        1.0.6
// ==/UserScript==

var DEBUG = false;
var MAX_RETRIES = 30;
var RETRY_DELAY = 500;

LogDebug("Loaded at " + new Date() + " for " + document.location);

// This collection allows the behaviour of the script on a particular page to be customised.
// If the current page does not match one of these pages then the default settings are used.
// The properties you can use are :
// url :            required - the URL, or part of the URL, for the page you want to customise
// mapObject :      optional - function which returns the map object to customise
// postProcess :    optional - function called after the map object has been updated
var customPages =
    [
        {
            url: "http://www.bikehike.co.uk/mapview.php",
            mapObject: function () { return unsafeWindow.gMap; }
        },
        {
            url: "http://nikerunning.nike.com/nikeos/",
            mapObject: function () { return unsafeWindow.NikeMapItMap.map; }
        },
        {
            url: "http://www.mapmyrun.com/routes/",
            postProcess: function ()
            {
                var topoMap = $x("//ul[@class='map_options']/li/a[@name='topoMap']")[0];
                if (topoMap)
                {
                    topoMap.innerHTML = "Bing (OS)";
                    topoMap.name = "_gmaps_os_customMapType";
                    return true;
                }

                return false;
            }
        },
        {
            url: "http://www.mapmyride.com/routes/",
            postProcess: function ()
            {
                var topoMap = $x("//ul[@class='map_options']/li/a[@name='topoMap']")[0];
                if (topoMap)
                {
                    topoMap.innerHTML = "Bing (OS)";
                    topoMap.name = "_gmaps_os_customMapType";
                    return true;
                }

                return false;
            }
        },
        {
            url: "http://www.runningahead.com/maps",
            mapObject: function ()
            {
                var controls = unsafeWindow.RA.Controls.objects;
                if (controls && controls.ctl00_ctl00_PageContent_ToolsContent_m_editor)
                {
                    return controls.ctl00_ctl00_PageContent_ToolsContent_m_editor.m_map;
                }

                return null;
            }
        }
    ];


//Initialise();
window.addEventListener('load', Initialise, false);

function Initialise()
{
    LogDebug("Initialising");
    new MapCustomiser().Initialise();
}

function MapCustomiser()
{
    this.retries = 0;
    this.map = null;
    this.customMap = null;
    this.mapObject = function () { return unsafeWindow.map; };
    this.postProcess = null;

    this.Initialise = MapCustomiser_Initialise;
    this.WaitForMap = MapCustomiser_WaitForMap;
    this.InjectOSTiles = MapCustomiser_InjectOSTiles;
    this.MappingAPIVersion = MapCustomiser_MappingAPIVersion;
    this.AddMapType = MapCustomiser_AddMapType;
    this.RegisterMapType = MapCustomiser_RegisterMapType;
    this.Retry = MapCustomiser_Retry;
    this.RunPostProcess = MapCustomiser_RunPostProcess;
}

// Check whether we know about the current page
function MapCustomiser_Initialise()
{
    var url = document.location.href;

    for (var i = 0; i < customPages.length; i++)
    {
        var page = customPages[i];
        if (url.indexOf(page.url) >= 0)
        {
            LogDebug("Matched custom URL " + page.url);

            if (page.mapObject) this.mapObject = page.mapObject;
            if (page.postProcess) this.postProcess = page.postProcess;

            break;
        }
    }

    this.WaitForMap();
}

// Wait until the map object has been created, then update it
function MapCustomiser_WaitForMap()
{
    try
    {
        this.map = this.mapObject();

        if (this.map)
        {
            this.Retry(this.InjectOSTiles);
        }
        else
        {
            this.Retry(this.WaitForMap);
        }
    }
    catch (e)
    {
        LogError("Error: " + e);
    }
}

// Load the right custom map object for the API version
function MapCustomiser_InjectOSTiles()
{
    var API = this.MappingAPIVersion();

    switch (API)
    {
        case 2:
            this.AddMapType(CustomMap_v2);
            break;

        case 3:
            this.AddMapType(CustomMap_v3);
            break;

        default:
            LogError("Unsupported mapping API version " + API);
            break;
    }
}

// Determine Google Maps API version
function MapCustomiser_MappingAPIVersion()
{
    if (unsafeWindow.google && unsafeWindow.google.maps)
    {
        if (unsafeWindow.google.maps.version)
        {
            LogDebug("Mapping API version " + unsafeWindow.google.maps.version);
        }
        else if (unsafeWindow.google.maps.API_VERSION)
        {
            LogDebug("Mapping API version " + unsafeWindow.google.maps.API_VERSION);
        }

        if (unsafeWindow.google.maps.ImageMapType)
        {
            return 3;
        }

        if (unsafeWindow.GMapType)
        {
            return 2;
        }
    }

    LogError("Unknown mapping API version");

    return 0;
}

// Create and register the new custom map type
function MapCustomiser_AddMapType(customMap)
{
    this.customMap = customMap;

    // Create the new map type in the context of the loaded page, not Greasemonkey.
    // The object constructors fail with an invalid prototype otherwise.
    LogDebug("Creating custom map type");
    contentEval(this.customMap.Create);

    LogDebug("Registering new map type");
    this.RegisterMapType();
}

// Register the newly created map type
function MapCustomiser_RegisterMapType()
{
    if (!unsafeWindow._gmaps_os_customMapType)
    {
        this.Retry(this.RegisterMapType);
        return;
    }

    this.customMap.Register(this.map);
    this.RunPostProcess();
}

// Post processing
function MapCustomiser_RunPostProcess()
{
    LogDebug("Post processing");

    if (this.postProcess)
    {
        if (!this.postProcess())
        {
            this.Retry(this.RunPostProcess);
            return;
        }
    }

    LogDebug("Done");
}

function MapCustomiser_Retry(method)
{
    var callback = CreateCallback(this, method);

    if (this.retries++ < MAX_RETRIES)
    {
        LogDebug("Waiting - " + this.retries);
        window.setTimeout(callback, RETRY_DELAY);
    }
}

// Create a function callback with a context object
function CreateCallback(object, method)
{
    return function () { method.call(object); };
}


var CustomMap_v2 =
{
    Register: function (map)
    {
        map.addMapType(unsafeWindow._gmaps_os_customMapType);
    },

    Create: function ()
    {
        var customMapLayer = new GTileLayer(new GCopyrightCollection(""), 1, 16);

        customMapLayer.getTileUrl = function (pos, zoom)
        {
            var serverID = (((pos.y & 1) << 1) + (pos.x & 1));
            var URL = "http://ecn.t" + serverID + ".tiles.virtualearth.net/tiles/r";

            for (i = zoom - 1; i >= 0; i--)
            {
                URL = URL + (((((pos.y >> i) & 1) << 1) + ((pos.x >> i) & 1)));
            }

            // OS tiles are only available for zoom levels 12 - 16, otherwise fall back to standard Bing map tiles
            if (zoom >= 12)
            {
                URL = URL + ".png?g=41&productSet=mmOS";
            }
            else
            {
                URL = URL + "?g=550&shading=hill";
            }

            return URL;
        };
        customMapLayer.isPng = function () { return true; };

//      customMapLayer.getOpacity = function () { return 0.25; };
//      window._gmaps_os_customMapType = new GMapType([G_SATELLITE_MAP.getTileLayers()[0], customMapLayer], G_SATELLITE_MAP.getProjection(), "Bing (OS)", G_SATELLITE_MAP);

        customMapLayer.getOpacity = function () { return 1; };
        window._gmaps_os_customMapType = new GMapType([customMapLayer], G_SATELLITE_MAP.getProjection(), "Bing (OS)", G_SATELLITE_MAP);

        console.debug("Custom map type created");
    }
};


var CustomMap_v3 =
{
    Register: function (map)
    {
        //        map.overlayMapTypes.insertAt(0, unsafeWindow._gmaps_os_customMapType);
        //        return;

        map.mapTypes.set("bing_os", unsafeWindow._gmaps_os_customMapType);

        var options = { mapTypeControlOptions: map.mapTypeControlOptions };
        if (options.mapTypeControlOptions.mapTypeIds)
        {
            options.mapTypeControlOptions.mapTypeIds.push("bing_os");
        }
        else
        {
            options.mapTypeControlOptions.mapTypeIds =
            [
                unsafeWindow.google.maps.MapTypeId.ROADMAP,
                unsafeWindow.google.maps.MapTypeId.SATELLITE,
                unsafeWindow.google.maps.MapTypeId.HYBRID,
                unsafeWindow.google.maps.MapTypeId.TERRAIN,
                "bing_os"
            ];
        }
        map.setOptions(options);
    },

    Create: function ()
    {
        var customMapLayer =
        {
            getTileUrl: function (pos, zoom)
            {
                var serverID = (((pos.y & 1) << 1) + (pos.x & 1));
                var URL = "http://ecn.t" + serverID + ".tiles.virtualearth.net/tiles/r";

                for (i = zoom - 1; i >= 0; i--)
                {
                    URL = URL + (((((pos.y >> i) & 1) << 1) + ((pos.x >> i) & 1)));
                }

                // OS tiles are only available for zoom levels 12 - 16, otherwise fall back to standard Bing map tiles
                if (zoom >= 12)
                {
                    URL = URL + ".png?g=41&productSet=mmOS";
                }
                else
                {
                    URL = URL + "?g=550&shading=hill";
                }

                return URL;
            },
            tileSize: new google.maps.Size(256, 256),
            isPng: true,
            maxZoom: 16,
            minZoom: 1,
            opacity: 1,
            name: "Bing (OS)",
            alt: "Bing (OS) Map"
        };

        window._gmaps_os_customMapType = new google.maps.ImageMapType(customMapLayer);
        console.debug("Custom map type created");
    }
};


// Greasemonkey XPath helper
function $x()
{
    var x = '';
    var node = document;
    var type = 0;
    var fix = true;
    var i = 0;
    var cur;

    function toArray(xp)
    {
        var final = [], next;
        while (next = xp.iterateNext())
        {
            final.push(next);
        }
        return final;
    }

    while (cur = arguments[i++])
    {
        switch (typeof cur)
        {
            case "string": x += (x == '') ? cur : " | " + cur; continue;
            case "number": type = cur; continue;
            case "object": node = cur; continue;
            case "boolean": fix = cur; continue;
        }
    }

    if (fix)
    {
        if (type == 6) type = 4;
        if (type == 7) type = 5;
    }

    // selection mistake helper
    if (!/^\//.test(x)) x = "//" + x;

    // context mistake helper
    if (node != document && !/^\./.test(x)) x = "." + x;

    var result = document.evaluate(x, node, null, type, null);
    if (fix)
    {
        // automatically return special type
        switch (type)
        {
            case 1: return result.numberValue;
            case 2: return result.stringValue;
            case 3: return result.booleanValue;
            case 8:
            case 9: return result.singleNodeValue;
        }
    }

    return fix ? toArray(result) : result;
}


function contentEval(source)
{
    // Check for function input.
    if ('function' == typeof source)
    {
        // Execute this function with no arguments, by adding parentheses.
        // One set around the function, required for valid syntax, and a
        // second empty set calls the surrounded function.
        source = '(' + source + ')();'
    }

    // Create a script node holding this  source code.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.
    document.body.appendChild(script);
    document.body.removeChild(script);
}


function LogDebug(message)
{
    if (DEBUG)
    {
        GM_log(message);
    }
}

function LogError(message)
{
    GM_log(message);
}

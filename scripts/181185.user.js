// ==UserScript==
// @name      WME City Borders Highlighter
// @version    0.6
// @description  Draws the border of a given set of coordinates
// @updateURL           https://userscripts.org/scripts/source/181185.user.js
// @include             https://*.waze.com/*/editor/*
// @include             https://*.waze.com/editor/*
// @include             https://*.waze.com/map-editor/*
// @include             https://*.waze.com/beta_editor/*
// @include             https://editor-beta.waze.com/*
// @copyright  2013+, bedo2991
// ==/UserScript==

Borders_Version = "0.6";
Borders_ScriptName = "BorderHighlighter";
Borders_logtag = Borders_ScriptName + " v. " + Borders_Version+": ";

function Borders_log(s)
{
	console.log(Borders_logtag + s);
}

function Borders_Stile(color){
	this.fill=false;
    this.stroke=true;
    this.strokeColor=color;
    this.strokeWidth=2;
}

function  Borders_script_bootstrap()
{
    Borders_log('Borders start init');
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
    Borders_script_init();
}

function Borders_script_init()
{
    Borders_selectionManager = unsafeWindow.W.selectionManager;
    Borders_loginManager = unsafeWindow.W.loginManager;
    Borders_wazeModel = unsafeWindow.W.model;
    Borders_jq = unsafeWindow.jQuery;
    Borders_Waze = unsafeWindow.Waze;
    Borders_OpenLayers = unsafeWindow.OpenLayers;
    Borders_wazeMap = unsafeWindow.W.map;
    console.dir(unsafeWindow);
    Borders_vectorLayer = new Borders_OpenLayers.Layer.Vector("City_Borders", {name:'City Borders', uniqueName: 'Border' });
    console.log("QUI");
    if(Borders_wazeMap.getLayersByName("City_Borders").length == 0)
   {
        Borders_AddButton();
        //ADDS the border Layer
        try{
            if(Borders_wazeMap.addLayer(Borders_vectorLayer))
            {
                Borders_log('Border Layer created.');
            }
            else
            {
                alert('Fatal error: Border Layer has not been created!');
                return;
            }
        }
        catch(e)
        {
            Borders_log("Error while creating the City Border layer.");
            console.dir(e);
        }
    }
    Borders_log("Initialized");
}

function Borders_AddButton() {
	if(document.getElementById('BordersButton') != null) return;
	var btn1 = Borders_jq('<a id="BordersButton" href="javascript:;" style="margin-right:20px;float:left" title="Creates a border v. '+Borders_Version+'">Draw Border</a>');

    btn1.click(Borders_DrawBorder);

    Borders_jq(".WazeControlPermalink").append(btn1);
}

function Borders_DrawBorder()
{
    var coordinateString = prompt('Please paste the list of coordinates:');
  
    var tempVector = coordinateString.split(" ");
    var polyPoints = new Array(tempVector.length);
    
    for(i=0; i<tempVector.length; i++)
    {
    	var coordinateVector = tempVector[i].split(",");
        polyPoints[i]= new Borders_OpenLayers.Geometry.Point(coordinateVector[0],coordinateVector[1]).transform(
        new Borders_OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
        Borders_wazeMap.getProjectionObject() // to Spherical Mercator Projection
      );
    }    
    
    var polygon = new Borders_OpenLayers.Geometry.Polygon(new Borders_OpenLayers.Geometry.LinearRing(polyPoints));
    var color = prompt("Which color to use? green, red, black, blue, gold, white", "red"); 
  
    switch(color)
    {
        case 'green':
            site_style = new Borders_Stile("#00FF00");
            break;
        case 'red':
            site_style = new Borders_Stile("#FF0000");
            break;
        case 'white':
            site_style = new Borders_Stile("#FFFFFF");
            break;
        case 'black':
            site_style = new Borders_Stile("#000000");
            break;
        case 'blue':
            site_style = new Borders_Stile("#0000FF");
            break;
        case 'gold':
            site_style = new Borders_Stile("#FFD700");
            break;
       	default:
            alert('Color unrecognized, using gray as default.');
            site_style = new Borders_Stile("#777777");
    }

    var poly = new Borders_OpenLayers.Feature.Vector(polygon, null, site_style);
    
	Borders_vectorLayer.addFeatures(poly);
    
}

// [...]
// then at the end of your script, call the bootstrap to get things started
Borders_script_bootstrap();
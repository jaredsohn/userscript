// ==UserScript==
// @name       WME House Numbers Helper
// @version    0.4.7
// @description  Shows the HNs registered by my Android application. In order to insert them
// @include             https://*.waze.com/*/editor/*
// @include             https://*.waze.com/editor/*
// @include             https://*.waze.com/map-editor/*
// @include             https://*.waze.com/beta_editor/*
// @include             https://editor-beta.waze.com/*
// @copyright  2013+, bedo2991
// ==/UserScript==

function HNHelper(){
var HNHelper_ScriptName ="HNHelper";
var HNHelper_Version = "0.4.7";
var HNHelper_LogTag = HNHelper_ScriptName + ' v. ' +HNHelper_Version+':';

var HNHelper_selectionManager = unsafeWindow.W.selectionManager;
var HNHelper_loginManager = unsafeWindow.W.loginManager;
var HNHelper_wazeModel = unsafeWindow.Waze.model;
var HNHelper_jq = unsafeWindow.jQuery;
var HNHelper_Waze = unsafeWindow.Waze;
var HNHelper_OpenLayers = unsafeWindow.OpenLayers;
var HNHelper_wazeMap = unsafeWindow.W.map;

    function HNHelper_log(s)
    {
        console.log(HNHelper_LogTag+s);
    }
    
function HNHelper_AddButton() {
	if(document.getElementById('HNHelperButton') != null) 
    {return;}
    var btn = HNHelper_jq('<a id="HNHelperButton" href="javascript:;" style="margin-right:20px;float:left" title="WME House Numbers Helper v. '+HNHelper_Version+'">Show HNs</a>');
	btn.click(HNHelper_DrawHN);

    HNHelper_jq(".WazeControlPermalink").append(btn);
    //Make the attribution bar shorter
    HNHelper_jq('.olControlAttribution')[0].style.right = '700px';
}

function HNHelper_script_init()
{    
    //Register for onkeypressed
    //document.getElementById("map")
    document.addEventListener("keypress", function(event){
        //console.log(event.charCode + "<-char | key-> " +event.KeyCode);
        if(document.getElementById("map-lightbox").style.display != "none")
        {
            //If the HN box is shown
            if(event.charCode == 43) //+
            {
                //Perform the click
                document.getElementsByClassName("add toolbar-btn")[0].click();
                return true;
            }
            else if(event.charCode == 36) //$
            {
                document.getElementsByClassName("save toolbar-btn")[0].click();
                return true;
            }
        }
    }, false);
   	HNHelper_log("Keyboard shortcut + added.");
    
    if(HNHelper_wazeMap.getLayersByName("House Numbers").length == 0)
    {
        HNHelper_AddButton();
        //ADDS the HN layer
        var style = new OpenLayers.Style({
        fillColor: "#ffcc66",
        strokeColor: "#ff9933",
        strokeWidth: 2,
        label: "${type}",
        fontColor: "#333333",
        fontFamily: "sans-serif",
        fontWeight: "bold"
    }, {
        rules: [
            new OpenLayers.Rule({
                minScaleDenominator: 200000000,
                symbolizer: {
                    pointRadius: 7,
                    fontSize: "9px"
                }
            }),
            new OpenLayers.Rule({
                maxScaleDenominator: 200000000,
                minScaleDenominator: 100000000,
                symbolizer: {
                    pointRadius: 10,
                    fontSize: "12px"
                }
            }),
            new OpenLayers.Rule({
                maxScaleDenominator: 100000000,
                symbolizer: {
                    pointRadius: 13,
                    fontSize: "15px"
                }
            })
        ]
    });
        // Create a vector layer and give it your style map.
    points = new OpenLayers.Layer.Vector("House Numbers [H]", {
        styleMap: new OpenLayers.StyleMap(style),
        uniqueName: 'house_number'}
                                        );
        try{
			HNHelper_wazeMap.addLayer(points);
        }
        catch(e){HNHelper_log("Something went wrong while adding the WME layer (but the script may be still working).");}
    }
}

function  HNHelper_script_bootstrap()
{
    console.log('HNHelper start init');
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
    HNHelper_script_init();
}

function HNHelper_DrawHN(){
    var json = prompt('Paste the JSON string of HNs');
    if(prompt == null) //User pressed cancel
        return;
    var i=0;
    try{
    obj = JSON.parse(json);
    }catch(e)
    {
        console.dir(e);
        alert('There is an error in your string: "'+ e.message+'".\nCheck it and try again, or ask for assistance on the Waze forum.');
        return;
    }
    var features = new Array(); //Initialize the HN vector
    for(var s=0; s<obj.states.length; s++)
    {
        for(var c=0; c<obj.states[s].cities.length; c++)
        {
        	for(var str=0; str<obj.states[s].cities[c].streets.length; str++)
            {
            	for(var n=0; n<obj.states[s].cities[c].streets[str].numbers.length; n++)
                {
                    var num = obj.states[s].cities[c].streets[str].numbers[n];
                	var point = new OpenLayers.Geometry.Point(num.Lon, num.Lat).transform(
        			new HNHelper_OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
        			HNHelper_wazeMap.getProjectionObject());
    				var pointFeature = new OpenLayers.Feature.Vector(point,  {
        				type: num.num+num.extras
    				});
    				features[i] = pointFeature;
                    i++;
                }
            }
        }
    }    
    //Shows the point
    points.addFeatures(features);
}

// [...]
// then at the end of your script, call the bootstrap to get things started
HNHelper_script_bootstrap();
}

setTimeout(HNHelper, 500);
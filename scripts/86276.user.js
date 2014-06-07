// ==UserScript==
// @name           LandGrab: show all borders
// @namespace      landgrab_all_borders
// @include        http://landgrab.net/landgrab/ViewBoard
// @include        http://landgrab.net/landgrab/RealtimeBoard
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version        1.7.1
// ==/UserScript==

if (!document.xmlVersion) {
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')();'));
	document.documentElement.appendChild(script);
}


function main() {

Layout();

var borders = null;
function Layout()
{
	var zNode = document.getElementById("control_panel_upper");
	if( ! zNode ) zNode = findElementFromNearest("terr_names_cb", "..");
	if( ! zNode ) return;
	
    window.AjaxProxy.getAllBorders(
		function (borderInfo) {
		    processBorders(borderInfo);
		}
	);

	var button = document.createElement('div');
	button.class = "control_panel_table";
	button.innerHTML = 
		'<table style="padding-right: 5px; padding-left:5px" id="show_all_borders"><tr><td>' +
		'<table class="button_table"><tr><td class="button_table_left"</td><td>SHOW ALL BORDERS</td><td class="button_table_right"</td></table>' +
		'</td></tr></table>';

	zNode.appendChild(button);

	document.getElementById("show_all_borders").onclick = ShowAllBorders;

	// Fix from Illuvatar to work around bad scripts removing elements
	setInterval(function(){
		if(!document.getElementById("show_all_borders").onclick){
			document.getElementById("show_all_borders").onclick = ShowAllBorders;
			}
		}, 1000);
}




function findElementFromNearest( nearestElementId, xpathToInsertion )
{
	var elem = document.getElementById(nearestElementId);
	var xpathResult = document.evaluate(xpathToInsertion, elem, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
	
	return xpathResult.iterateNext();
}

	
function ShowAllBorders()
{
	window.clearCanvas();
	
	if( window.borderShowingID == "all" )
		return window.borderShowingID = -1;
	
	window.borderShowingID = "all";
	if( borders ) return drawBorders();
}


// drawing context for two-way borders
function acquireContext()
{
	return window.ctx;
}


// drawing context for one-way borders
function acquireAContext()
{
	if( ! window.actx )
		window.actx = document.getElementById("a_canvas").getContext("2d");
	
	return window.actx;
}


// pre-process the border lines on page load for super-quick drawing when
// the user clicks the button
function processBorders(borderInfo) 
{
	borders = new Array();
	
    for (var _terId in borderInfo) 
	{
        var _territory = borderInfo[_terId];
		var _territoryCentre = _territory.centre || (_territory.centre =findCentreXY(_terId));

        var _length = _territory.length;
        for (var i = 0; i < _length; ++i) 
		{
            var _borderTerId = _territory[i];
            var _borderTerritory = borderInfo[_borderTerId];
            var _borderTerritoryCentre = _borderTerritory.centre || (_borderTerritory.centre = findCentreXY(_borderTerId));

			var oneWay = false;				
			if( isOneWayBorder( _borderTerritory, _terId ) )
				oneWay = true
			else if( _terId > _borderTerId )
				continue

			borders[borders.length] = 
			{ 
				fromX: _territoryCentre.x,
				fromY: _territoryCentre.y,
				toX: _borderTerritoryCentre.x,
				toY: _borderTerritoryCentre.y,
				oneWay: oneWay
			};
		}
    }
}


function isOneWayBorder( _borderTerritory, _terId )
{
	for(var i = 0; i < _borderTerritory.length; ++i)
		if( _borderTerritory[i] == _terId ) { return false; }
	return true;
}


function findCentre( _territoryId, _xy )
{
	return document.evaluate("//*[@id='terr_poly_" + _territoryId + "']/@center_" + _xy, document, null, XPathResult.STRING_TYPE, null ).stringValue;
}


function findCentreXY( _territoryId )
{
	var polygon = document.evaluate("//*[@id='terr_poly_" + _territoryId + "']", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	
	var r =
	{ 
		x: polygon.attributes['center_x'].value, 
		y: polygon.attributes['center_y'].value 
	};
	
	return r;
}


function drawBorders()
{
	var _length = borders.length;
	for(var i = 0; i < _length; ++i)
	{
		var _b = borders[i];
		
		if( _b.oneWay )
			drawOneWay( _b.fromX, _b.fromY, _b.toX, _b.toY );
		else
			drawLine( _b.fromX, _b.fromY, _b.toX, _b.toY );
	}
}


function drawLine( ax, ay, bx, by )
{
	var ctx = acquireContext();

	ctx.lineCap="round";
	ctx.beginPath();
	ctx.moveTo(ax,ay);
	ctx.lineWidth=3;
	ctx.strokeStyle="#FFFFFF";
	ctx.lineTo(bx,by);
	ctx.closePath();
	ctx.stroke();
	
	ctx.lineCap="butt";
	ctx.beginPath();
	ctx.moveTo(ax,ay);
	ctx.strokeStyle="#1c9c04";
	ctx.lineWidth=1;
	ctx.lineTo(bx,by);
	ctx.closePath();
	ctx.stroke();
}


function drawOneWay( ax, ay, bx, by )
{
	var ctx = acquireContext();
	
    var a = { x: parseInt(ax), y: parseInt(ay) };
    var b = { x: parseInt(bx), y: parseInt(by) };
	
	var l1 = window.extendLine(a, b, -20);
	var l2 = window.extendLine(b, a, -10);
	window.drawArrow(l2, l1, "rgb(255,0,0)", "rgb(255,255,255)");
}

}
// ==UserScript==
// @name           Travian Quick Coords
// @version        1.3
// @description    Parses coordinates you paste into Q: input field and fills x- and y-fields of travian.
// @include        http://*.travian.*/a2b.php*
// @include        http://*.travian.*/build.php*
// @include        http://*.travian.*/karte.php*
// @include        http://*.travian.*/*
// ==/UserScript==


/* Quick Coord Script
----------------------------------------------------------------------------------------------*/
//SETTINGS
set_village_list_direct_links = 1;  // 0/false to disable

/* == LANGFILE is disabled as its no longer needed at the monent ==

var lang=window.location.href.match(/travian\d*(\.[a-zA-Z\.]+)/).pop();
var langfile=new Array();

switch (lang) {
	case '.com':
		langfile = ['Marketplace level', 'or'];
		break;
	case '.fr':
		langfile = ['Place du Marché niveau', 'ou'];
		break;
	case '.hk':
		langfile = ['市場 等級', '或'];
		break;
	case '.cn':
		langfile = ['市场 等级', '或者'];
		break;
	case '.ru':
		langfile = ['Рынок уровня', 'или' ];
		break
	case '.com.tr':
		langfile = ['Pazaryeri Seviyesi', 'yada'];
		break;
	default:
		langfile = ['Marktplatz Stufe', 'oder'];
}
*/

//Base64 Encoded Images
images = [];
images["def"] = "R0lGODlhEAAQAPcAAP///xprJU5MlAd1CBRwGDY0Zgx5BfTy8g52DE9VlGN+Xwx6BRR0Gy0rVWObQzAuW0hGeBFzE0lHijteQAZ0CBJ1FChoQRNYKydmQUhHijw6fDc1ZxVxGRZ4HFBQnBpsJQ9PGT8/gEdFjluSQt3b3Pn1+JOclFmTQd2/NUVLjQdpBbu5vTU0aOnn6UZLhU9VlTw7bwp5BDp2SK63rRRxGdzZ3CBoOz16R9rAM3+OVf38/rm5vAxuFlRZnjEwXkREjhNWEg9kHBZQHhBSCzg2ahp+DEVEg0VDgtLU0E1MlTI0brW1txpTMwt4DBB4DlpaazFjMqKRZCFmNktRjRN6E1+YPXF0T0JIhufl5whcD8TExhNwGF5flnh8S2uAM/f29BttJxN0FiYlSYiOijd1O01Tkd6+LBeAG09NZ01SkQt4BA11DCsrVjc1ZgRzBklHi3eMISJnNUtJjmNhd8y7Menm6LScV05Tkbq4vBxrLU5MlQtNG36QexZvIBpULx5mMydnP2GDHBtiNhF1EwZOEkpIZA9SHkJGiEJDhQdYFK6zr2pvr0lNkAd0Ci5bLkZFiImYhcnIyubFUTk4avfy95OVlx9FJn10hyBsMRtpLiRpORV0GhBFHyJiPEJDgaCpnURGghBzEwFoA1NZnQp1Dk5NlQp3BS0sXG2DbV9hdUdWUgNJACxxNh1oPjQxYF2ZSRdwIoCrQgVzBm2HbZaLgkdFd0lPiZKdk7KytztAcmVqrSNjOnxyXlNQbzSCFEpJjSRoOfz9+zAuWbakektJjUtLnB1/IhtoLa6VYF2XQwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AHeIaSDsgQ9XBWpBILKhTYFTTwCYyDIoQhgHZuB0CFWBx4QSALRMevTjUhRakuwMQ+ZBTxIYkQAAwOIoyIcAOMEkUqBDJoAZKmKoMdVIlhsKAwYYMLBA1Kw6lv7EkSLoBg4vrWwA03QBlcwvhUJIyHAoBaNfxBD1OuDTZyVOsPrsUUWiLQBcuVzYmlLmRQ9di0YluJPmSipFfnZ1khGryqtkJ0ZYwACIya0aQJqsKULFGJ1AZ3w5QUAKCqVgczS8kSOCCwpexQQIKMVihUwkQvIcY5XDShcymTAZ+tR2DKFNHAgQ2EKDAYgldgHgYePJyBFQStC0iO4T0qohfNjaAg0IADs=";
images["crop"] = "R0lGODlhEgAMAOYAAIhNJfn05+LHqcyogumqOqKFYuGRKvvlxLp3Jt+ybP///+DEicSISODQwPHp3+GqY+vGj821ncORQ/j39OGfT+CpUPHIdu7Xr/HavNx7GujHnPPo1cWgbtezjfG6W6JSFtvBpvfw6NiBKv778LiQZ+zdw/DXs96+oPKWI+urUOjUtuy8Qfvq0//13ujRhPjIbOW2ctS1g//mxfzx4d7Fn8mMWuzRn82NNvbbqfrt0vHNgObYvNq9jP/89uiULvTZvOfNlv/55vz59ezgtv/x5evbzPbq2Y1VJfjsxt7FlPfm3vLGefTAXd69pfCyVeTKivG3dvvo0f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAFIALAAAAAASAAwAAAeCgFKCUkIhg4KFh4obMTlGIBsbJyo9ij0BQTQ8NkkcAxdAFwIHAYMBQ0gLC086LzAQHT8CKqWDPTsRGC4eK0wWF0QNIFGHMyVFRjhOBChLI4rQUgESCB8k0dATBUcANZXYgyMPIhk+LeCDQlApBhQs6IINCRU3DBrf4A4HJiYltYeBAAA7";

/* Quick Coord Parser
----------------------------------------------------------------------------------------------*/
if ( window.location.href.match(/a2b.php/g) || 
	 document.getElementById("r1") ||
	 window.location.href.match(/karte.php$/g) ||
	 window.location.href.match(/karte.php\?z=\d*$/g) ||
	 window.location.href.match(/karte.php\?newdid=\d*$/g) ||
	 window.location.href.match(/karte.php\?newdid=\d*&z=\d*$/g)
	) {

	
	if ( window.location.href.match(/a2b.php/g) || 
		 document.getElementById("r1")
	) {
		var xy = document.getElementsByName("x")[0].parentNode;
		
		var newDiv = document.createElement("div");
		newDiv.style.fontSize = "13px";
		newDiv.style.fontWeight = "normal";
			var newI = document.createElement("i");
			//newI.innerHTML = langfile[1];
			if ( document.getElementById("r1") ) {
				newI.innerHTML = document.getElementsByName("x")[0].parentNode.parentNode.parentNode.parentNode.getElementsByTagName("tr")[2].childNodes[0].childNodes[0].innerHTML;
			} else  {
				newI.innerHTML = document.getElementsByName("x")[0].parentNode.parentNode.getElementsByTagName("div")[1].childNodes[0].innerHTML
			}
			
		newDiv.appendChild(newI);
		
		xy.appendChild(newDiv);
		
		xy.innerHTML += " Q: ";

		var newInput = document.createElement("input");
		newInput.setAttribute("type", "text");
		newInput.setAttribute("id", "quick_coord");
		newInput.setAttribute("size", "7");
		newInput.setAttribute("class", "fm");
		newInput.style.border = "1px solid #abadb3";
		xy.appendChild(newInput);
		xy.appendChild(newInput);
		
		
	} else {
		var xy = document.getElementsByName("xp")[0].parentNode.parentNode.parentNode;
		
		var newTr = document.createElement("tr");
			var newTd = document.createElement("td");
			newTd.innerHTML = "<b>Q</b>";
			newTr.appendChild(newTd);
			
			var newTd = document.createElement("td");
			newTd.setAttribute("colspan", "2");
				var newInput = document.createElement("input");
				newInput.setAttribute("type", "text");
				newInput.setAttribute("id", "quick_coord");
				newInput.setAttribute("class", "fm fm25");
				newInput.style.border = "1px solid #abadb3";
				newInput.style.width = "100%";
				newTd.appendChild(newInput);
			newTr.appendChild(newTd);
			
		xy.appendChild(newTr);
	}

	
	addEvent( newInput, 'keyup', parse_qcoord );
	addEvent( newInput, 'click', function(){this.select()} );

}


/* Village List Quick Coord
----------------------------------------------------------------------------------------------*/
var doerfer_tables = document.getElementById("lright1").getElementsByTagName("table");

if ( window.location.href.match(/a2b.php/g) || 
	 document.getElementById("r1") ||
	 window.location.href.match(/karte.php$/g) ||
	 window.location.href.match(/karte.php\?z=\d*$/g) ||
	 window.location.href.match(/karte.php\?newdid=\d*$/g) ||
	 window.location.href.match(/karte.php\?newdid=\d*&z=\d*$/g)
) {
	for ( i=1; i < doerfer_tables.length; i++ ) {
		addEvent( doerfer_tables[i], 'click', function(){get_coord(this);} );
		addEvent( doerfer_tables[i], 'mouseover', function(){hover(this);} );
		addEvent( doerfer_tables[i], 'mouseout', function(){unhover(this);} );
		doerfer_tables[i].style.cursor = "pointer";
	}
}

/* Village List Direct Links ( RES + TROOPS)
----------------------------------------------------------------------------------------------*/
if ( set_village_list_direct_links == true ) {
	for ( i=1; i < doerfer_tables.length; i++ ) {
		toappend = doerfer_tables[i].parentNode.parentNode
		
		var newTd = document.createElement("td");
		newTd.innerHTML = '<img src="data:image/gif;base64,'+images["def"]+'" height="12px">';
		toappend.appendChild(newTd);
		newTd.style.cursor = "pointer";
		
		addEvent( newTd, 'mouseover', function(){hover(this);} );
		addEvent( newTd, 'mouseout', function(){unhover(this);} );
		addEvent( newTd, 'click', function(){ url_coord(this , "t"); } );
		
		
		var newTd = document.createElement("td");
		newTd.innerHTML = '<img src="data:image/gif;base64,'+images["crop"]+'" height="12px">';
		toappend.appendChild(newTd);
		newTd.style.cursor = "pointer";
		
		addEvent( newTd, 'mouseover', function(){hover(this);} );
		addEvent( newTd, 'mouseout', function(){unhover(this);} );
		addEvent( newTd, 'click', function(){ url_coord(this , "r"); } );
	}
}


/* Travian specifiv & shared functions
----------------------------------------------------------------------------------------------*/
function hover(obj) { obj.style.color = "red"; }
function unhover(obj) { obj.style.color = "black"; }


function get_coord ( obj ) {
	table_cells = obj.getElementsByTagName("td");
	
	get_coord_x = table_cells[0].innerHTML; //x
	get_coord_y = table_cells[2].innerHTML; //y
	
	coords = parse_coord(get_coord_x + "|" + get_coord_y);
	
	put_coord(coords[0] , coords[1]); 
}

function get_id( string ) {
	
	var regex = /newdid\=([0-9]+)/;
	
	if ( regex.test(string) == true ) {
		regex.exec(string)
		return RegExp.$1;
	}

}

function url_coord (obj , mode) {

	table_cells = obj.parentNode.getElementsByTagName("table")[0].getElementsByTagName("td");
	
	get_coord_x = table_cells[0].innerHTML; //x
	get_coord_y = table_cells[2].innerHTML; //y
	coords = parse_coord( get_coord_x + "|" + get_coord_y );
	
	//alert( get_coord_x +"|"+ get_coord_y + "->" + encodeCoord(coords[0], coords[1]) );
	//id = get_id( obj.parentNode.parentNode.getElementsByTagName("a")[0].getAttribute("href") );
	
	encodedCoord = encodeCoord(coords[0], coords[1])
	if ( mode == "t" ) {
		window.location = "a2b.php?z="+encodedCoord;
	} else if ( mode == "r" ) {
		window.location = "build.php?z="+encodedCoord+"&gid=17";
	}
	
}

function parse_qcoord() {
	var coord_src = document.getElementById("quick_coord");
	
	var regex = /([-]?\d+)[\s\t]*([\|\/\\,])[\s\t]*([-]?\d+)/g;
	
	if ( regex.test(coord_src.value) == true) {
		regex.exec(coord_src.value);	
		coord_src.value = "("+RegExp.$1+RegExp.$2+RegExp.$3+")";
		put_coord(RegExp.$1 , RegExp.$3);
	}
	
	
}

function parse_coord(string) {
	var coord_src = string;
	
	var regex = /([-]?\d+)[\s\t]*([\|\/\\,])[\s\t]*([-]?\d+)/g;
	
	if ( regex.test(coord_src) == true) {
		regex.exec(coord_src);	
		coord_src.value = "("+RegExp.$1+RegExp.$2+RegExp.$3+")";
		//put_coord(RegExp.$1 , RegExp.$3);
		reg_coord = [];
		reg_coord[0] = RegExp.$1;
		reg_coord[1] = RegExp.$3;
		
		return reg_coord;
	}
}

function put_coord(x,y) {
	
	if ( window.location.href.match(/a2b.php/g) || 
		 document.getElementById("r1")
	) {
		var xfeld = document.getElementsByName("x")[0];
		var yfeld = document.getElementsByName("y")[0];
	} else {
		var xfeld = document.getElementsByName("xp")[0];
		var yfeld = document.getElementsByName("yp")[0];
	}
		
	xfeld.value = x;
	yfeld.value = y;
	
}

function encodeCoord(x, y) {
	return (((400-parseFloat(y))*801)+(parseFloat(x)+401));
}


/* General Helper Functions
----------------------------------------------------------------------------------------------*/
function addEvent( obj, type, fn ){	
	if (obj.addEventListener)
		obj.addEventListener( type, fn, false );
	else if (obj.attachEvent)
	{
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
		obj.attachEvent( "on"+type, obj[type+fn] );
	}
}

function removeEvent( obj, type, fn ) {
	if (obj.removeEventListener)
		obj.removeEventListener( type, fn, false );
	else if (obj.detachEvent)
	{
		obj.detachEvent( "on"+type, obj[type+fn] );
		obj[type+fn] = null;
		obj["e"+type+fn] = null;
	}
}

function xpath(xp) {
	return document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
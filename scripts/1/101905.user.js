// ==UserScript==
// @name           Google Maps Maximizer
// @version        1.3.1
// @namespace      http://www.iescripts.org
// @creator        SaWey, BlindWanderer
// @description    Google maps has the functionality to hide the panel on the left, this script adds a little arrow-button to hide the header.
// @include        http://maps.google.*
// @include        http://ditu.google.*

// ==/UserScript==

function addEvent( obj, type, fn ) {
 	if ( obj.attachEvent ) {
 		obj["e"+type+fn] = fn;
 		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
 		obj.attachEvent( "on"+type, obj[type+fn] );
 	} else
 		obj.addEventListener( type, fn, false );
}
function removeEvent( obj, type, fn ) {
 	if ( obj.detachEvent ) {
 		obj.detachEvent( "on"+type, obj[type+fn] );
 		obj[type+fn] = null;
 	} else
 		obj.removeEventListener( type, fn, false );
}
function __setValue(key, value){try{GM_setValue(key, value);}catch(e){try{PRO_setValue(key,value);}catch(e){}}}
function __getValue(key, value){try{value = GM_getValue(key, value);}catch(e){try{value = PRO_getValue(key, value);}catch(e){}}return value;}
function __log(msg){try{GM_log(msg);}catch(e){try{PRO_log(msg);}catch(e){}}}

var img_show;
var img_hide;
var hidden = __getValue("start_visible", true);
var div_header = document.getElementById("header");
var div_guser = document.getElementById("guser");
if(div_header)
{
	var div_map = document.getElementById("map");
	if(div_map)
	{
		var div = document.createElement("div");
		div.width = "100%";
		div.style.fontSize = "4px";
		div.style.textAlign = "center";

		div.style.cursor="pointer";
		div_map.parentNode.insertBefore(div, div_map);
		img_hide = document.createElement("img");
		img_hide.style.display="none";
		img_hide.style.paddingBottom="2px";
		img_hide.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAK7wAACu8BfXaKSAAAAF9JREFUGFdj/Pfv338GNLBmzUOwSEiIPLoUAwNIAwx///7n/8yZN/+Xl58BYxD727c/cHmw4TDFz559+z9x4jW4YpgmkNjTp1/hmsAa7t799L+h4TyGYpgmkBxIDUgtALsJf5YrJKP/AAAAAElFTkSuQmCC";
		img_show = document.createElement("img");
		img_show.style.display="none";
		img_show.style.paddingBottom="2px";
		img_show.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAK7wAACu8BfXaKSAAAAGZJREFUGFdj/Pfv3//7978wLF58l+H7978M2AAnJzNDbKwyg6IiDwMDSAMIP3369f/Eidf+l5efQcEgsWfPvoHVgDBcA4jz7duf/zNn3oRrALG/f/8DV4yhAWbKqlX3/4MwjI9MAwBmoY568zdp2gAAAABJRU5ErkJggg==";
		div.appendChild(img_hide);
		div.appendChild(img_show);
		addEvent( div, "click", clicker );
		clicker();
	}
}

function clicker(){
//	__log("clicked");
	if(hidden == true)
	{
		hidden = false;
		div_header.style.display = "";
		if(__getValue("hide_user", null))
			div_guser.style.display = "";
		img_hide.style.display="";
		img_show.style.display="none";
	}
	else
	{
		hidden = true;
		div_header.style.display = "none"; 
		if(__getValue("hide_user", null))
			div_guser.style.display = "none";
		img_hide.style.display="none";
		img_show.style.display="";
	}
	window.setTimeout("resizeApp()", 1);//ugly ugly hack, gets around the problem of resizeApp not being defined in this scope.
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#gb,#gbar,#guser{display:none;} .gbh,.gbd{border-top:0} #search .cntrl{margin: 0 170px 0 150px} #search .srchhead{padding: 0 20px 0 160px}');

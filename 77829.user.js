// ==UserScript==
// @name           Pardus Navigation Grid
// @namespace      pardus.at
// @description    Adds a grid view to the Pardus Navigation Screen
// @include        http://*.pardus.at/main.php*
// @author         ratchetFreak
// @version        1.5

// ==/UserScript==


// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////

//Set to false if you don't want the center square highlighted
var highlightCenterSquare = true;


//You can change the type and color of the gridlines and the center highlight here as the value of the border: attribute. as set in css
var border 			= "dashed #505000";
var highlightBorder	= "solid darkred";

var cssChanged = false; // set to true if you added the lines: 
/*
#navarea{border-collapse: collapse;}
#navarea td {background-repeat:no-repeat ; border: 1px dashed #505000;}
#nav_center {background-repeat:no-repeat; border: 1px solid darkred !important;}
*/
//to main.css in your IP (the last line can be left out if you don't want the center square highlighted)

var addCoods = false;


// ////////////////////////////////////////////////////////////////////////
// Beginning of Code:
// ////////////////////////////////////////////////////////////////////////

var numRowsNColls = unsafeWindow.navAreaSize
if(!cssChanged){
	GM_addStyle(
	'#navarea {border-collapse: collapse ; background-color:#FFFF00 ; border-style: hidden;}'+
	'#navarea td {background-color:#000000 ; background-repeat: no-repeat ; border: 1px '+border+';}'+
	'#navarea td.route{opacity:0.8;}'+
	'#navareatransition {border-collapse: collapse ; background-color:#FFFF00 ; border-style: hidden;}'+
	'#navareatransition td {background-color:#000000 ; background-repeat: no-repeat ; border: 1px '+border+';}'+
	'#navareatransition td.route{opacity:0.8;}'
	+ (highlightCenterSquare?
		'#nav_center {background-repeat:no-repeat; border: 1px '+highlightBorder+' !important;}':
		''));
}

function updateIt(first){
	
	var table = first ? document.getElementById('navarea') : document.getElementById('navtransition').firstChild;
	var newHeight = unsafeWindow.tileRes*numRowsNColls+(numRowsNColls-1);
	var oldHeight = unsafeWindow.tileRes*numRowsNColls;
	table.parentNode.parentNode.setAttribute('style',table.parentNode.parentNode.getAttribute('style').replace("width: "+oldHeight+"px; height: "+oldHeight+"px;","width: "+newHeight+"px; height: "+newHeight+"px;"));
	var rows = table.rows;
	var cells = rows[Math.floor(numRowsNColls/2)].cells;
	cells[Math.floor(numRowsNColls/2)].id = 'nav_center';//give center an id
}
updateIt(true);

var local_updateNav = unsafeWindow.updateNav;
if(local_updateNav){
	unsafeWindow.updateNav = function(result){
		local_updateNav(result);
		updateIt(false);
	}
}
if(addCoods){
	function updateCoods(first){
		var table = first ? document.getElementById('navarea') : document.getElementById('navtransition').firstChild;
		if(!table)table = document.getElementById('navarea');
		var rows = table.rows;
		var tmp = document.evaluate('//*[@id="status_content"]//*[@id="coords"]',document,null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
		tmp = tmp.substring(tmp.indexOf('[') + 1, tmp.indexOf(']'));
		var locx = tmp.substring(0, tmp.indexOf(',')) - Math.floor(numRowsNColls/2);
		var locy = tmp.substring(tmp.indexOf(',') + 1) - Math.floor(numRowsNColls/2);

		for(var i=0;i<numRowsNColls;i++){
			var cells = rows[i].cells;
			for(var j=0;j<numRowsNColls;j++){
				if(locx+j>=0 && locy+i>=0){
					var td = cells[j];
					var img = td.getElementsByTagName('img')[0];
					var title = img.getAttribute('title');
					if(title=='NPC Opponent'){
						title = img.src.substr(img.src.lastIndexOf('/')+1);
						title = title.substr(0,title.lastIndexOf('.'));
						title = title.replace(/_/g,' ');
					}
					title = title?' '+title:'';
					img.setAttribute('title', '['+(locx+j) + ', ' + (locy+i) + ']' + title);
					if(addCoods &&(td.getElementsByTagName('a')[0]||td.id=='nav_center')){
						var a = td.getElementsByTagName('a')[0];
						if(!a)a=td;
						var div = document.createElement("span");
						div.setAttribute('style','position:absolute; font-size:9px; color:#D0D1D9; cursor:pointer; background-color:darkred; margin-left:-64px;');
						div.innerHTML = '['+(locx+j) + ',' + (locy+i) + ']';
						a.appendChild(div);
					}
				}
			}
		}
	}
	updateCoods(true);
	var local_updateCoods = unsafeWindow.updateStatus;
	if(local_updateCoods){
		unsafeWindow.updateStatus = function(result){
			local_updateCoods(result);
			updateCoods(false);
		}
	}
}

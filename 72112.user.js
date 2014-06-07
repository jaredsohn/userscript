// ==UserScript==
// @name           tribalwars - اتجاه القوات-plapl
// @namespace      يقوم بي توضيح و جهات و انطلق الهجمات
// @description    erweitert Karteninformationen
// @include        http://*.die-staemme.de/*
// @include        http://*.staemme.ch/*
// @include        http://*.tribalwars.*/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==


var version = "0.0.3";

//visual options 
var xthickness = 6; // conical settings
var ythickness = 3;

var transperancy = "0.45";
var onmapchecktolerance = 1;

//dynamic mapinformations
var xoffset;
var yoffset;
var size;

//linked images
var wallimage = new Image();
wallimage.src = '/graphic/buildings/wall.png?1';
var ramimage = new Image();
ramimage.src = '/graphic/unit/unit_ram.png?1';
var axeimage = new Image();
axeimage.src = '/graphic/unit/unit_axe.png?1';
var spyimage = new Image();
spyimage.src = '/graphic/unit/unit_spy.png?1';
var lightimage = new Image();
lightimage.src = '/graphic/unit/unit_light.png?1';
var snobimage = new Image();
snobimage.src = '/graphic/unit/unit_snob.png?1';
var attimage = new Image();
attimage.src = '/graphic/unit/att.png?1';


function Village(arg0, arg1, arg2, arg3, arg4){
  this.x=arg0;
  this.y=arg1;
  this.destx=arg2;
  this.desty=arg3;
  this.movementtype=arg4;

  this.isVillageOnCurrentMap = function () {
    if (this.x > xoffset+onmapchecktolerance && this.x < (parseInt(xoffset)+parseInt(size)) && this.y > yoffset+onmapchecktolerance && this.y < (parseInt(yoffset)+parseInt(size)) ) return true;
    if (this.destx > xoffset+onmapchecktolerance && this.destx < (parseInt(xoffset)+parseInt(size)) && this.desty > yoffset+onmapchecktolerance && this.desty < (parseInt(yoffset)+parseInt(size)) ) return true;
    return false;
  }

  this.drawVillageDataToCanvasGrid = function () {
    var canvas = document.getElementById("map_canvas");
    if (canvas != null) { //theres no canvas rendered without 'Glaubensradius anzeigen' -> should be fixed; canvas will be created under the same name if not exist
	    var x1 = 26 + ((this.x - xoffset)*53);
	    var y1 = 19 + ((this.y - yoffset)*38);
	    var x2 = 26 + ((this.destx - xoffset)*53);
	    var y2 = 19 + ((this.desty - yoffset)*38);

	    var ctx = canvas.getContext("2d");
	    ctx.fillStyle = "rgba(" + ((this.movementtype == 1) ? "0,0,233" : (this.movementtype == 2) ? "0,233,0" : "233,0,0") + ", " + transperancy + ")"; // i like transperancy ;)
	    ctx.beginPath();
	    ctx.moveTo(x1, y1);
	    var xcorrect = (x1>x2 && y1>y2) ? xthickness*-1 : xthickness*2;
	    ctx.lineTo(x2-xcorrect, y2-ythickness);
	    ctx.lineTo(x2+xcorrect, y2+ythickness);
	    ctx.lineTo(x1+1, y1);
	    ctx.fill();
	    var xfactor = Math.abs(x2-x1) / 2;
	    var yfactor = Math.abs(y2-y1) / 2;
            //1: spy; 2: snob; 3: light; 4: ram; 5: axe
	    var image = (this.movementtype==1) ? spyimage : (this.movementtype==2) ? snobimage : (this.movementtype==3) ? lightimage : (this.movementtype==4) ? ramimage : axeimage;
	    ctx.drawImage(image, (x1<x2) ? x1+xfactor : x1-xfactor , (y1<y2) ? y1+yfactor : y1-yfactor);//--->   point_x = x1 +- (abs(x2-x1) / 2)
    }
  }

  this.drawIconOverVillage = function() {
    var canvas = document.getElementById("map_canvas");
    if (canvas != null) {

      var x1 = 26 + ((this.x - xoffset)*53);
      var y1 = 19 + ((this.y - yoffset)*38);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(wallimage,x1,y1);
    }
  }

  this.markVillageAsTarget = function() {
    var canvas = document.getElementById("map_canvas");
    if (canvas != null) {

      var x1 = 6 + ((this.x - xoffset)*53);
      var y1 = 19 + ((this.y - yoffset)*38);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(attimage,x1,y1);
	ctx.fillStyle = "rgba(200,0,0," + transperancy + ")";

	ctx.beginPath();
	ctx.arc(x1+4, y1+4, 8, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();

    }
  }

}



function getElementsByPath(arg0, arg1) {
	if(!arg1) var arg1 = document;
	var path = document.evaluate(arg0, arg1, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var stack = [];
	for(var i = 0; i < path.snapshotLength; i++) {
		stack.push(path.snapshotItem(i));
	}
	return stack;
}


function setCookie(cname, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";

	document.cookie = cname + "=" + value + expires;
}

function getCookie(cname) {
	if(document.cookie.match(/;/)) {
		var cooks = document.cookie.split("; ");
		for(var i = 0; i < cooks.length; i++) {
			var cookie = cooks[i];
			if(cookie.match(cname + "=")) {
				var value = cookie.replace(cname + "=", "");
				break;
			} else {
				var value = false;
			}
		}
	} else {
		var cookie = document.cookie;
		if(cookie.match(cname + "="))
			var value = cookie.replace(cname + "=", "");
		else
			var value = false;
	}
	return value;
}






var test = document.getElementById('map_popup_options');
if (test!=null) { // pa and map available ?

	//read mapoffset and size
	var mapCoords = document.getElementById('mapCoords');
	yoffset = mapCoords.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML;
	var size = (mapCoords.getElementsByTagName("tr").length-1) / 2;
	xoffset = mapCoords.getElementsByTagName("tr")[size*2].getElementsByTagName("td")[1].innerHTML;

	//render some options
	var mapoptions = getElementsByPath('//form/table[@class="map_container"]/parent::*/parent::td'); 
	if (mapoptions.length > 0) {
		var div = document.createElement('div');
		div.style.padding = '8px';
		
		var canv = document.getElementById("map_canvas");
		if (canv==null) {

			//creating map_canvas
			//so inno doesnt need the canvas for just drawing pngs, we have to render our own canvas an give him the same id...

			var map = document.getElementById("map");
			var mapOld = document.getElementById("mapOld");

			var container = document.createElement('div');
			//container.style.height="795";
			//container.style.width="570";
			container.style.zIndex="1";
			container.style.position="absolute";

			var newCanvas = document.createElement('canvas');
			newCanvas.height="300";
			newCanvas.width="300";
			newCanvas.zIndex="1000";
			newCanvas.position="absolute";
			newCanvas.id="map_canvas";

			container.appendChild(newCanvas);

			map.insertBefore(container, mapOld);
		}

		var html = '<p style="margin-top:10px; margin-bottom:0; padding-bottom:0; text-align:center; line-height:0"><a target="_blank" href="http://www.plapl.com/forum.php"><img src="http://feeds.feedburner.com/plapl.2.gif" alt="بلابل" style="border:0" width="300" height="45"></a></p>';
		html +='<input id="belief_movement" type="checkbox"'
		
		var opt1 = getCookie('ds_bel_mov');
		if (opt1==1) html += ' checked="checked"';
		html += ' name="belief_movement" onclick="if (this.checked) setCookie(\'ds_bel_mov\', \'1\', 30); else setCookie(\'ds_bel_mov\', \'0\');window.location.reload();" /><label for="belief_movement">اضاهر حركة القوات</label>';
		html += '<br/><input id="belief_buildinginfo2" type="checkbox"';

		var opt1b = getCookie('ds_bel_bui2');
		if (opt1b==1) html += ' checked="checked"';
		html += ' name="belief_buildinginfo2" onclick="if (this.checked) setCookie(\'ds_bel_bui2\', \'1\', 30); else setCookie(\'ds_bel_bui2\', \'0\');window.location.reload();" /><label for="belief_buildinginfo2">&nbsp;&nbsp;اضهارها ان كانت فقط في المربع الخريطه</label>';

		html += '<br/><input id="belief_buildinginfo" type="checkbox"';

		var opt2 = getCookie('ds_bel_bui');
		if (opt2==1) html += ' checked="checked"';
		html += ' name="belief_buildinginfo" onclick="if (this.checked) setCookie(\'ds_bel_bui\', \'1\', 30); else setCookie(\'ds_bel_bui\', \'0\');window.location.reload();" /><label for="belief_buildinginfo">بناء على معلومات الخريطة</label>';


		var dorfid = document.location.href.split("village=")[1].split("&")[0];

		html += '<br/><br/><a href="/game.php?village=' + dorfid + '&screen=overview_villages&mode=commands&group=0" target="_blank" title="قم بي الضغط هنا من اجل تحديث المعلومات الهجمات .">تحديث المعلومات</a><br/><span style="font-size: 10px;">تنبيه :مجموعة >الكل<  المحدده.</span>';
		html += '<br/><br/><h4>معلومات</h4><div style="width: 10px;height: 10px;background-color: #D00;"></div>هجوم<br/><div style="width: 10px;height: 10px;background-color: #00D;"></div>تجسس<br/><div style="width: 10px;height: 10px;background-color: #0D0;"></div>نبيل';

		
		div.innerHTML = html;
		mapoptions[0].appendChild(div);
	}


	var villages = new Array();

	var allmovements = true;
	var opt2 = getCookie('ds_bel_bui2');
	if (opt2==1) allmovements = false;

	//read movement-informations from gm-store
	var save = GM_getValue("ds_attacks");
	if (save != null) {
		var coords = save.split(";");
		for (i = 0; i < coords.length-1; i++) {
			var cos = coords[i];

			var x1 = cos.substring(0, cos.indexOf('\|'));
			var y1 = cos.substring(cos.indexOf('\|')+1, cos.indexOf('-'));
			var x2 = cos.substring(cos.indexOf('>')+1, cos.lastIndexOf('\|'));
			var y2 = cos.substring(cos.lastIndexOf('\|')+1, cos.lastIndexOf(','));

			//check if movements source or destination on map
			var foobar = new Village(x1, y1 , x2, y2, cos.substr(cos.length-1,1));
			if (allmovements==true) {
				villages.push(foobar);
			} else {
				if (foobar.isVillageOnCurrentMap()) {
					villages.push(foobar);
				}
			}

		}

		//draw movements
		var opt1 = getCookie('ds_bel_mov');
		if (opt1==1) {
			for (i = 0; i < villages.length; i++) {
				var village = villages[i];
				village.drawVillageDataToCanvasGrid();
			}
		}
	}

	//process building data
	villages = new Array();
	var builddata = GM_getValue("ds_buildings");
	if (builddata != null) {
		var walldown = builddata.split(";");
		for (i = 0; i < walldown.length-1; i++) {
			var cos = walldown[i];
			var x1 = cos.substring(0, cos.indexOf('\|'));
			var y1 = cos.substring(cos.indexOf('\|')+1, cos.length);
			var foobar = new Village(x1, y1 , 0, 0, 0);
			if (foobar.isVillageOnCurrentMap()) {
				villages.push(foobar);
			}

		}
		//draw building info
		var opt2 = getCookie('ds_bel_bui');
		if (opt2==1) {
			for (i = 0; i < villages.length; i++) {
				var village = villages[i];
				village.drawIconOverVillage();
			}
		}
	}

	//process incs
	villages = new Array();
	var incdata = GM_getValue("ds_incs");
	if (incdata != null) {
		var incoming = incdata.split(";");
		for (i = 0; i < incoming.length-1; i++) {
			var cos = incoming[i];
			var x1 = cos.substring(0, cos.indexOf('\|'));
			var y1 = cos.substring(cos.indexOf('\|')+1, cos.length);
			var foobar = new Village(x1, y1 , 0, 0, 0);
			if (foobar.isVillageOnCurrentMap()) {
				villages.push(foobar);
			}

		}
		//draw building info
		var opt1 = getCookie('ds_bel_mov');
		if (opt1==1) {
			for (i = 0; i < villages.length; i++) {
				var village = villages[i];
				village.markVillageAsTarget();
			}
		}
	}



}

//read orders...
if (location.href.match('screen=overview_villages&mode=commands')) {
	var rows = getElementsByPath('//tr[contains(@class, "nowrap row_")]');
	var text = "";

	var idx_spy = 0;
	var idx_axe = 0;
	var idx_light = 0;
	var idx_ram = 0;
	var idx_snob = 0;

	for(var i = 0; i < rows.length; i++) {

			var row = rows[i];

			//parse headerLine's picturesrc to get the right indexes by unit
			if (i==0) {
				var headers = row.parentNode.getElementsByTagName("th");
				for (j = 0; j < headers.length; j++) {
					var th = headers[j];
					var children = th.childNodes;
					for (k = 0; k<children.length; k++) {
						picsrc = children[k].src;
						if (picsrc != undefined) {
							if (picsrc.indexOf("spy") != -1) idx_spy = j;
							if (picsrc.indexOf("axe") != -1) idx_axe = j;
							if (picsrc.indexOf("light") != -1) idx_light = j;
							if (picsrc.indexOf("ram") != -1) idx_ram = j;
							if (picsrc.indexOf("snob") != -1) idx_snob = j;
						}
					}
				}
			}


			var mode = 1;

			var cell0 = row.getElementsByTagName("td")[0];
			var cell1 = row.getElementsByTagName("td")[1];

			// if theres no attack-> continue
			if(!cell0.textContent.match('هجوم')) {
				continue;
			}

        		//1: spy; 2: snob; 3: light; 4: ram; 5: axe
			var spy = (idx_spy>0) ? row.getElementsByTagName("td")[idx_spy].textContent : 0;
			if (spy>0) mode = 1;
			var axe = (idx_axe>0) ? row.getElementsByTagName("td")[idx_axe].textContent : 0;
			if (axe>0) mode = 5;
			var light = (idx_light>0) ? row.getElementsByTagName("td")[idx_light].textContent : 0;
			if (light>0) mode = 3;
			var ram = (idx_ram>0) ? row.getElementsByTagName("td")[idx_ram].textContent : 0;
			if (ram>0) mode = 4;
			var snob = (idx_snob>0) ? row.getElementsByTagName("td")[idx_snob].textContent : 0;
			if (snob>0) mode = 2;

			var c1 = cell1.textContent;
			var coordsFrom = c1.substring(c1.indexOf('(')+1, c1.indexOf(')'));
			var c2 = cell0.textContent;
			var coordsTo = c2.substring(c2.indexOf('(')+1, c2.indexOf(')'));

			text += coordsFrom + "->" + coordsTo + "," + mode + ";"
		}
	GM_setValue("ds_attacks", text);
}


//read incs...
if (location.href.match('screen=overview_villages&mode=incomings')) {

	var rows = getElementsByPath('//tr[contains(@class, "nowrap row_")]');
	var text = "";
	for(var i = 0; i < rows.length; i++) {
		var row = rows[i];
		
		var cell0 = row.getElementsByTagName("td")[0];

		if(!cell0.textContent.match('هجوم')) {
			continue;
		}


		var target = row.getElementsByTagName("td")[1].textContent;
		text += target.substring(target.indexOf('(')+1, target.indexOf(')')) + ";";

	}
	GM_setValue("ds_incs", text);

}





//read buildings...
var opt2 = getCookie('ds_bel_bui');
if (opt2==1) {
	if (location.href.match('screen=overview_villages&mode=buildings')) {
		var rows = getElementsByPath('//tr[contains(@class, "row_")]');
		var text = "";
		var idx_wall = 0;

		for(var i = 0; i < rows.length; i++) {

		        var row = rows[i];


			//parse headerLine's picturesrc to get the right index for the wall
			if (i==0) {
				var headers = row.parentNode.getElementsByTagName("th");
				for (j = 0; j < headers.length; j++) {
					var th = headers[j];
					var children = th.childNodes;
					for (k = 0; k<children.length; k++) {
						picsrc = children[k].href;
						if (picsrc != undefined) {
							if (picsrc.indexOf("الحائط") != -1) idx_wall = j;
						}
					}
				}
			}

		        var cellwall = (idx_wall > 0) ? row.getElementsByTagName("td")[idx_wall] : 20;

		        if (cellwall.textContent!=20) {
		                var cell0 = row.getElementsByTagName("td")[0];
		                var c0 = cell0.textContent;
		                var coordsFrom = c0.substring(c0.indexOf('(')+1, c0.indexOf(')'));
		                text += coordsFrom + ";";
		        }
		}
		GM_setValue("ds_buildings", text);
	}
}


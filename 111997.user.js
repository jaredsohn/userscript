// ==UserScript==
// @name           OGame Redesign: Galaxy Go
// @namespace      userscripts.org
// @description    Go to stored position in galaxy view
// @version        0.1.5
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude        http://*.ogame.*/game/index.php?page=search*
// @exclude        http://*.ogame.*/game/index.php?page=logout*
// @exclude        http://*.ogame.*/game/index.php?page=buddies*
// @exclude        http://*.ogame.*/game/index.php?page=notices*
// @exclude        http://*.ogame.*/game/index.php?page=payment*
// @exclude        http://*.ogame.*/game/index.php?page=showmessage*
// @exclude        http://*.ogame.*/game/index.php?page=traderlayer*
// @exclude        http://*.ogame.*/game/index.php?page=rocketlayer*
// @exclude        http://*.ogame.*/game/index.php?page=searchLayer*
// @exclude        http://*.ogame.*/game/index.php?page=globalTechtree*
// @exclude        http://*.ogame.*/game/index.php?page=station*openJumpgate* 
// @exclude        http://*.ogame.*/game/index.php?page=jumpgatelayer*
// ==/UserScript==

(function() 
{
	var navi_ikon_galaxy_a = 'data:image/gif;base64,R0lGODlhJgAdAPcAAAAAABwhJRwgJTU4OhsfJBoeIycqLBsgJCEjJBkeIQcICgoKCystLxgcIA0ODgMDBBocHRQVFjU5PRoeIh0fIRYaHhccIBsgJRofJDE1Nw8SFRkeIhkdIQoMDxcYGQ8TFQYHBz1CRRATFiQnKBofIxsfIxwhJAcJCiwxNR8lKgoNEBAREgsNEAYICSgtMTQ4PCAlKR4iJykuMiInKhgdIAcICQYICjxBRAoMDjtAQxccHwgJCyImKzc7Px8lKQoNDx8jKCwwNAwPERsgIysvMwcKCw8RFQgKCzs/QzU5PCMoLC4xMzo/Qh8jJzM4Ox8kKQYHCTI2OhgdIQwQEhAUGAcJCyovNCouMh0hJhIWGQoNDhkdICUqLiwxNBkdIhoeIRUYHAwPEB0hJSovMxATFyAkKR4jKAwOEAwPEjY7PgsOEQ0PEg8TFiYrLggKDQgLCxYbHgsOECInKzk+QRAUFxAUFgkLDhIVGTU6PRYaHQkMDQkJDDc8PzxAQyovMhcaHhcbHiYqLzE1OTo+Qh4iJiImKgsNDxofIhwgJCElKRUaHCUpLSQoLBEUGBEVGCsvMigsMAkLDRkcICUqLQ8SFgQGCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJUALAAAAAAmAB0AAAj/ACsJTBGgoMGDCBOmEMiwocMnCodEjOiwYiUfEwlkTGix4UYBIEMScCFIgoQxBzsyJCFSo8uWAgKhmCkhRIhCJgqqHDgBpk85MUTOCdHlgNGdlTb4vMCUKQ8XMGsqMToBaU+qL4FgGQk1a4maLI/uvOoVoosrGNJmnROkRCKJVkuE9eKFUZkCcl4U2Mt3byEmOa3sjZugcII2j74keDFDqRTDhZ34kcJlEl3CgCzA4GNB86AGoK/cuAF6MxwdEiTqQHqigusGPRi5JhLldJI+OYj8kdRDTB5CacCAqYEUgHEAIzIcNzAARIQBAygYZxBhunTjxY07iH78uYEFDhYY0kdgQHsSEMezI08C4TiAFRAgODDugcED41EQuM++APp89+5FYN94UaCX3k4EDrACgMeRd9967e2H4HoDjMCgAwZYSOASDx6oEn7QDcCAfA4IyF2C4gGYXQYhtlhhiiAwN4AHDAKQHQUuVlgdfSyeyKB69WVIQYoALMCAiAgQ+eNOLRRZ45NQsqZFJG4UUYWVCmSpZQs21LDllwsgVckUa6AhhBospPnDmh20iYObKsQZRxh0iilQFndQQYcIfH6ggZ9/UhLooI44YuehiCaqqJ0BAQA7';
	var navi_ikon_galaxy_b = 'data:image/gif;base64,R0lGODlhJgAdAPcAAAAAABwhJRwgJX2OmRsfJBoeI15rcxsgJE5ZYBkeIRcaHAcICmVzfB8jJggJCRgcID5HTC81OUZQVRoeImt6hHWGkBYaHhsgJRccIBofJBkdIYWYpFBcZDY+QxkeIg8SEw8TFQoMD1ZiaRATFg8SFRofIxsfIwoNEAcJCh8lKi82PCYsLwYICQsNEGp5gwYICiguNAcKCwcICQoMDgoND0NNVVNfaCEmKiInLUhUXAgJC3aHkh8lKRgdIBccH4SWooSXo29/iTI6QAwPEQsND32Pm05aYw8RFRYaHRcaHgkMDRATFxgdIQwOEFBbYyQqLzQ8QhsgIx0iJgYHCTtDSm59hkpVXBYbHhkdIgkLDjU+QxcbHniJlE5ZYRUYHBEUGF5rdDxFTA8SFnaIkwwQEhofIhIWGXaHkUNMVBAUGEFLUh8kKQgLCycuNDQ8QxAUFwkLDQ0PEn6QnH6RnC81OxkdIAkJDDA4Pj9JTwcJCwoNDiwzOB4iJhoeIWl4glBbZC40OwwPEkBLUgsOEGh3gRwgJAwPEBwhJDQ9QggKCxUaHE9aYhIVGUBLURAUFg8TFn6QmwsOEU5aYiImLAgKDSoxNhEVGG+AigQGCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJgALAAAAAAmAB0AAAj/ADEJTBGgoMGDCBOmEMiwocM1CqNEjOiwIiYeEwlklILQYsONGgWI1IgGDAUKVg56ZFhipMuXI8NwmElhwwYVhwquHDgBJkwcKnC45LKBw4GjOzF58HmhaVMVNWDW1HJ0QtKeVUMWgDGJwB80WkNSmJP1ataQbWBkyJEjg9uwcpyYoCPRbEusVAAVcOOigN+/fhFBunHDiF+7dRIkULOoTwIXUJYyUSzZjyQmghpheYD4ipAxGDDsKfKgdBcgQEoLueTDR5AnPXokReGltpQdeCxYsEHoypYgP37YSMJnRyUkd87URpEUgHMAIio8NzDgQ4QBAyQ4ZxDBuQHtzps7628wAMHz6wYUNFDgHIEB5yuqPxcPgDqE5wBWQIDQwHkHBg4A4EAF5s23k3MKYNcffvhFAKBz0X2An3gSYLcCg88h8CAACAxw34QH1oedCBg2YIAIAXI4QBUpGriSc9hhxwB/DTjoYYbYscegeBXE6OMA6Tn3AXUDdIAhABT+WF53/vWY3ZFIhghABwZUKYGOACjAwAAMIIAlhrMJCOWYR86mBxyUxJCHmgu06SYLL8jw5pxwJIUJGXEEMkQkLfRJw58hBDqDoCcUOoghiNopkBmMpPHGCJCCQIKkk4pR6aWWWKLoppx26qmiAQEAOw==';
	var disk_img_black = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXZJREFUeNqkUz1Lw1AUvXm+QCgUM7h0cbCkiwj5Fe7FrM6OBtu1Qugf0EIHZ9esWRzFH+BcKaVTF4dCQlpekz7vfU20waSteOFw3/067/A+NCkl/Mc0NPIe4ny74DjOS9mA7/uX6B4QbxTzLH/R7/fb0+kUGo0GzGYz6HS6V6vVShUHg0flMQeLxeIzCAKGIeGVZQRMCEFFmM/nykfREteRAsV5zjTNE8/z2jhzt62ArddrbIjAMAzl45gIhSpSTEY5WtNmmYJvgqM0TSEMQ6jVasoLIUHKTdl175UXIlE16qWZAkGSJLhDDJPJRCV6vdvKk6feXwTEatv2QVdXqcB1XbBarZ3DH6MRDIfDcgVnlgViI6/SqKdMAScFAgv53VeZ/nMGvEBArESw3EMgGcsVFAh0egcCsY+A6TpQbyYGePaZ6gyZNc5Bx4e08/NgD/XiXF3FiFPEE8LmzebzIdeYjMfX6N4RN0RwjDDyU/2D0UEsvwQYAOBPycY+5wDoAAAAAElFTkSuQmCC';
	var disk_img_blue = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII%3D';
	var disk_img_pink = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAbVJREFUeNqkUz1LA0EQnWz2JIZEY2cwpgkBy4CFhYJgJ4iQNFYWksY6hVjmJ/gHRES0TJU6IGohEgVBECSEoHDYHeTIhc3drTNzCUYwH+LC3NztvPfm7ceFtNbwnyGL8gRT6BAfmeFCu3D39hshXlnPYrrSoJ8ANMigv84eXxRLrVYLkskkmKYJ6fw29Ho9rprVAJXOz8DDwudH7bQuqCvGo9Dgo44vlFLgOA5YlsXZtrv4bnPQ92BubjGSOjo/KCFnXwcOWF34vo8AGyKRCOdOJ4QkxZ1t2+VMc1SjZsgTvAfkAEfYdV1ot9sQjUY5KxUDrSUTl3ZjnJUKMIRFXpgFfO2xgOd52KEDzWaTwc9njZE7T1jk9QX6Dmgyl8tNdXQsMHAwvITcXhoSy9GxZOu9Ay8Vc2gJ8L2EeGoWlOuOFSBM4ODnEiQ5UFgYnP2oYWAQFnly2IEkVRLoThDQQgwcBAIesGWD7oHCmCQgDAMIizyDBW70JaxBIS5QOSQlGHiRxg3CEFZpJ34PFb7P6VXYKScguXKdqd1Oc4ybja0NC8zXOlTLJDCPQW3Df/yTafO6XwIMACpp/XSRZjDZAAAAAElFTkSuQmCC';
	var versogame = document.getElementsByName('ogame-version').item(0);
	if(!versogame)
	{
		// alert("This script 'OGame Redesign: Galaxy Go' works only in ogame version 2.2.8 or higher.");
		return;
	}
	
	var oglang = document.getElementsByName('ogame-language').item(0).content;
	var textbut = "Save the coordinates";
	switch (oglang) {
		case "ru": textbut = "Сохранить координаты"; break;
		default: textbut = "Save the coordinates"; break;
	}
	
	versogame = versogame.content.split('.');
	if((parseInt(versogame[0])*1000000+parseInt(versogame[1])*1000+parseInt(versogame[2])) < 2002008)
	{
		// alert("This script 'OGame Redesign: Galaxy Go' works only in ogame version 2.2.8 or higher.");
		return;
	}
	
	var universe = document.getElementsByName('ogame-universe').item(0).content.split('.');

	var ogameserver = universe[0];

	var Name2Num = [
		["uni101", "andromeda"],
		["uni102", "barym"],
		["uni103", "capella"],
		["uni104", "draco"],
		["uni105", "electra"],
		["uni106", "fornax"],
		["uni107", "gemini"],
		["uni108", "hydra"],
		["uni109", "io"],
		["uni110", "jupiter"],
		["uni111", "kassiopeia"],
		["uni112", "leo"],
		["uni113", "mizar"],
		["uni114", "nekkar"],
		["uni115", "orion"],
		["uni116", "pegasus"],
		["uni117", "quantum"],
		["uni118", "rigel"],
		["uni119", "sirius"],
		["uni120", "taurus"],
		["uni121", "ursa"],
		["uni122", "vega"],
		["uni123", "wasat"],
		["uni124", "xalynth"],
		["uni125", "yakini"],
		["uni126", "zagadra"]
	];

	for(var i = 0; i < Name2Num.length; i++) {
		ogameserver = ogameserver.replace(Name2Num[i][1], Name2Num[i][0]);
	}

	ogameserver += universe[2];

    var galaxylist = new Array();
	
	function AddSaveGalaxyBut()
	{
		var cgalaxy = document.getElementsByName("galaxy")[0].value;
		var csystem = document.getElementsByName("system")[0].value;
		var savegalaxybut = document.createElement('div');
		savegalaxybut.id = 'savegalaxybut';
		savegalaxybut.setAttribute ("style", "position: absolute; left: 425px; top: 32px;");
		var img = document.createElement('img');
		img.className = "mouseSwitch";
		img.setAttribute("src", disk_img_black);
		img.setAttribute("rel", disk_img_blue);
		img.setAttribute("width",'16px');
		img.setAttribute("height",'16px');
		savegalaxybut.appendChild(img);
		document.getElementById('expeditionbutton').parentNode.appendChild(savegalaxybut);
		document.getElementById('savegalaxybut').addEventListener("click", SaveGalaxy, false);	
	}
	
	function GoGalaxy()
	{
		var url = document.location.href;
		var base = url.split ('?') [0];
		var sl_select = "";
		if (base) {
			var session = (parseInt(versogame[0]) > 2 ? "":url.match (/session=([a-z0-9]{1,12})/i) [1]);
			galaxylist = localStorage.getItem(ogameserver+'galaxygo');
			var coords = document.getElementsByName('ogame-planet-coordinates').item(0).content.split(':');
			galaxylist = (galaxylist)?JSON.parse(galaxylist):{galaxy:coords[0],system:coords[1]};
			var gal_menu = document.getElementById('menuTable');
			if(gal_menu)
			{
//bontchev 			
				var galaxyicon, theLi;
				var myLis = gal_menu.getElementsByTagName ("li");
				for (var i = 0; i < myLis.length; i++)
				{
					theLi = myLis [i];
					if (theLi.getElementsByTagName ("a") [0].href.indexOf ("page=galaxy") >= 0)
					{
						galaxyicon = theLi.firstElementChild;
						break;
					}
				}
				
				var gogalaxyspan = document.createElement('span');
				gogalaxyspan.className = "menu_icon tooltip";
				var gogalaxya = document.createElement('a');
				gogalaxya.id = 'gogalaxy';
				gogalaxya.setAttribute ("target", "_self");
				gogalaxya.setAttribute ("href", "index.php?page=galaxy&galaxy="+galaxylist.galaxy+"&system="+galaxylist.system+(parseInt(versogame[0]) > 2 ? "":"&session=" + session));
				gogalaxyspan.setAttribute ("title", '['+galaxylist.galaxy+':'+galaxylist.system+']');
				var gogalaxyicon = document.createElement('img');
				gogalaxyicon.setAttribute("src",navi_ikon_galaxy_a);
				gogalaxyicon.setAttribute("rel",navi_ikon_galaxy_b);
				gogalaxyicon.setAttribute("height","29");
				gogalaxyicon.setAttribute("width","38");
				gogalaxyicon.className = "mouseSwitch";
				gogalaxya.appendChild(gogalaxyicon);
				gogalaxyspan.appendChild(gogalaxya);
//bontchev 			
				theLi.replaceChild(gogalaxyspan,galaxyicon);
			}
		}
	}
	
	function MouseOut(event)
	{
		document.getElementById('savegalaxybut').removeEventListener("mouseout", MouseOut, false);		
		var element = this.children[0];
		element.setAttribute('src',disk_img_black);
		element.setAttribute('rel',disk_img_blue);
	}
	
	function SaveGalaxy(event)
	{
		document.getElementById('savegalaxybut').removeEventListener("click", SaveGalaxy, false);
		document.getElementById('savegalaxybut').children[0].setAttribute('src',disk_img_pink);
		var sgalaxy = document.getElementsByName("galaxy")[0].value;
		var ssystem = document.getElementsByName("system")[0].value;
		localStorage.setItem(ogameserver+'galaxygo', JSON.stringify({galaxy:sgalaxy,system:ssystem}));
		GoGalaxy();
		document.getElementById('savegalaxybut').addEventListener("mouseout", MouseOut, false);		
		document.getElementById('savegalaxybut').addEventListener("click", SaveGalaxy, false);		
	}

	GoGalaxy();
	if (document.location.href.indexOf('page=galaxy') > -1) 
	{
		AddSaveGalaxyBut();
	}
}) ()

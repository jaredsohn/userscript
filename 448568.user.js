// ==UserScript==
// @name          Gecko Tools
// @namespace     http://www.reddit.com/user/GekkoPie
// @description   A suite of customization options for TagPro
// @include       http://tagpro-*.koalabeast.com*
// @include       http://tangent.jukejuice.com*
// @license       GNU General Public License
// @author        GeckoPie
// @version       1.0.0
// ==/UserScript==

/******************************************
****** GLOBAL CONFIGURATION SETTINGS ******
*******************************************/
window.menuOpen = false;
window.resizeTimer = false;

// Load settings from local storage
window.gt_customSounds = true;
if (GM_getValue('gt_customSounds') != undefined) {
	gt_customSounds = eval(GM_getValue('gt_customSounds'));
}

window.gt_drawTiles = true;
if (GM_getValue('gt_drawTiles') != undefined) {
	gt_drawTiles = eval(GM_getValue('gt_drawTiles'));
}

window.gt_drawWallpaper = true;
if (GM_getValue('gt_drawWallpaper') != undefined) {
	gt_drawWallpaper = eval(GM_getValue('gt_drawWallpaper'));
}

window.gt_transparentBackground = false;
if (GM_getValue('gt_transparentBackground') != undefined) {
	gt_transparentBackground = eval(GM_getValue('gt_transparentBackground'));
}

window.gt_maximize= false;
if (GM_getValue('gt_maximize') != undefined) {
	gt_maximize = eval(GM_getValue('gt_maximize'));
}

window.gt_hideIcons = true;
if (GM_getValue('gt_hideIcons') != undefined) {
	gt_hideIcons = eval(GM_getValue('gt_hideIcons'));
}

window.addEventListener('DOMContentLoaded', function(e) {

	/*******************************************
	****** CONSTRUCT THE GECKO TOOLS MENU ******
	********************************************/
	
	// Build the message div
	var message_div = document.createElement("div");
	message_div.width = "140px";
	message_div.style.opacity = "0.0";
	message_div.style.display = "none";
	message_div.style.bottom = "20px";
	message_div.style.marginLeft = "50%"
	message_div.style.left = "-70px";
	message_div.style.position = "absolute";
	message_div.style.backgroundColor = "#070707";
	message_div.style.color="#47953d";
	message_div.style.borderRadius="4px";
	message_div.style.padding="8px";
	message_div.innerHTML = "Files Accepted";
	message_div.style.transition="opacity 0.25s linear";
	document.body.appendChild(message_div);
	
	
	// Build the icon
	var gecko_icon = document.createElement("img");
	gecko_icon.src = "http://i.imgur.com/eenIpmO.png";
	gecko_icon.onclick=toggleMenu;
	gecko_icon.style.opacity="0.0";
	gecko_icon.onmouseover= function(){gecko_icon.style.opacity="1.0";gecko_icon.style.cursor="pointer";}
	gecko_icon.onmouseout = function(){gecko_icon.style.opacity= menuOpen ? "1.0" : "0.0";}
	gecko_icon.style.transition="opacity 0.25s linear";
	document.body.appendChild(gecko_icon);
	
	
	// Position the icon
	function repositionIcon() {
		gecko_icon.style.position="absolute";
		gecko_icon.style.right = "20px";
		gecko_icon.style.bottom = "20px";
	}
	
	// Build the menu
	var gecko_menu = document.createElement("div");
	gecko_menu.style.opacity="0.0";
	gecko_menu.style.backgroundColor="#7eaeca";
	gecko_menu.style.background="linear-gradient(#7db5d4,#598ca9)";
	gecko_menu.style.borderRadius="4px";
	gecko_menu.style.padding="0px";
	gecko_menu.style.boxShadow="0px 0px 8px #000000";
	gecko_menu.style.transition="opacity 0.25s linear";
	
	var inner_div = document.createElement("div");
	inner_div.style.margin="10px";
	inner_div.style.display="none";
	inner_div.innerHTML="<div style=\"background-color:#070707;border-radius:4px;width:inherit;padding:8px;\">" +
						"<strong style=\"color:#47953d;\">Gecko Tools 1.0.0</strong></div>" +
						"<br>" +
						"<table>" +
						
						"<tr><td><span style=\"color:#000000;font-weight:bold;\">Custom Sounds</span>" +
						"<br><small>Drag and drop your sound files onto the browser window</small></td>" +
						"<td width=60>&nbsp;</td>" +
						"<td align=\"right\"><span style=\"color:#47953d;font-weight:bold;background-color:#070707;" +
						"border-radius:16px;padding:8px;cursor:pointer;\" id=\"btn_sounds\">On</span></td></tr>" +
						
						"<tr height=8><td></td></tr>" +
						
						"<tr><td><span style=\"color:#000000;font-weight:bold;\">Custom Tiles</span>" +
						"<br><small>Drag and drop your tiles onto the browser window</small></td>" +
						"<td width=60>&nbsp;</td>" +
						"<td align=\"right\"><span style=\"color:#47953d;font-weight:bold;background-color:#070707;" +
						"border-radius:16px;padding:8px;cursor:pointer;\" id=\"btn_tiles\">On</span></td></tr>" +
						
						"<tr height=8><td></td></tr>" +
						
						"<tr><td><span style=\"color:#000000;font-weight:bold;\">Custom Wallpaper</span>" +
						"<br><small>Drag and drop your wallpaper onto the browser window</small></td>" +
						"<td width=60>&nbsp;</td>" +
						"<td align=\"right\"><span style=\"color:#47953d;font-weight:bold;background-color:#070707;" +
						"border-radius:16px;padding:8px;cursor:pointer;\" id=\"btn_wallpaper\">On</span></td></tr>" +
						
						"<tr height=8><td></td></tr>" +
						
						"<tr><td><span style=\"color:#000000;font-weight:bold;\">Transparent Background</span>" +
						"<br><small>Removes the black background around the outside of the map</small></td>" +
						"<td width=60>&nbsp;</td>" +
						"<td align=\"right\"><span style=\"color:#ff011f;font-weight:bold;background-color:#070707;" +
						"border-radius:16px;padding:8px;cursor:pointer;\" id=\"btn_background\">Off</span></td></tr>" +
						
						"<tr height=8><td></td></tr>" +
						
						"<tr><td><span style=\"color:#000000;font-weight:bold;\">Maximize Viewport</span>" +
						"<br><small>Stretches the viewport to fill up the entire browser window</small></td>" +
						"<td width=60>&nbsp;</td>" +
						"<td align=\"right\"><span style=\"color:#ff011f;font-weight:bold;background-color:#070707;" +
						"border-radius:16px;padding:8px;cursor:pointer;\" id=\"btn_maximize\">Off</span></td></tr>" +
						
						"<tr height=8><td></td></tr>" +
						
						"<tr><td><span style=\"color:#000000;font-weight:bold;\">Hide Icons</span>" +
						"<br><small>Hides the exit, donate, music and sound buttons during game</small></td>" +
						"<td width=60>&nbsp;</td>" +
						"<td align=\"right\"><span style=\"color:#ff011f;font-weight:bold;background-color:#070707;" +
						"border-radius:16px;padding:8px;cursor:pointer;\" id=\"btn_hideIcons\">On</span></td></tr>" +
						
						"</table>";
	
	document.body.appendChild(gecko_menu);
	gecko_menu.appendChild(inner_div);
	
	// Position the menu
	function repositionMenu() {
		gecko_menu.style.position="absolute";
		gecko_menu.style.right = (gecko_icon.width*0.9 + 20) + "px";
		gecko_menu.style.bottom = (gecko_icon.height*0.9 + 20) + "px";
	}
	
	// Toggle the menu
	function toggleMenu() {
		menuOpen = !menuOpen;
		if (menuOpen) {
			showMenu();
		} else {
			hideMenu();
		}
	}
	
	function showMenu() {
		gecko_icon.style.cursor="pointer";
		gecko_menu.style.opacity = "1.0";
		gecko_icon.style.opacity="1.0";
		inner_div.style.display="inline-block";
	}
	
	function hideMenu() {
		gecko_icon.style.cursor="default";
		gecko_menu.style.opacity="0.0";
		gecko_icon.style.opacity="0.0";
		inner_div.style.display="none";
	}

	// Add drag-and-drop functionality
	function handleDragOver(e) {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}
	function handleFileSelect(e) {
		e.stopPropagation();
		e.preventDefault();
		
		var files = e.dataTransfer.files;
		var tileTypes = [];
		var soundTypes = [];
		for(var i = 0, file; file = files[i]; i++) {
			if(file.type.match('image.*')) {
				var reader = new FileReader();
				
				// Determine what kind of tile it is
				var name = escape(file.name);
				if (name.match(/[tiles|splats|speedpad|speedpadred|speedpadblue|portal]\.png/)) {
					var regex = /(.*)\.png/;
					var tileType = regex.exec(name)[1];
					tileTypes.push(tileType);
					eval("reader.onload = (function(thisFile) {"+
						"return function(x) {"+
							"GM_setValue('gt_" + tileType + "', x.target.result);"+
						"};"+
					"})(file);");
				} else {
					// It must be a wallpaper, load it as a wallpaper
					reader.onload = (function(thisFile) {
						return function(x) {
							GM_setValue('gt_wallpaper', x.target.result);
							setTimeout(function(){updateWallpaper();},2e2);
						};
					})(file);
				}
				reader.readAsDataURL(file);
			} else {
			
				// Most likely a sound file
				var name = escape(file.name);
				if (name.match(/[burst|alert|cheering|drop|sigh|powerup|pop|click|explosion|countdown|friendlydrop|friendlyalert|alertlong|go|degreeup|teleport]\.[mp3|m4a|ogg]/)) {
					var reader = new FileReader();
					var regex = /(.*)\.[mp3|m4a|ogg]/;
					var soundType = regex.exec(name)[1];
					soundTypes.push(soundType);
					eval("reader.onload = (function(thisFile) {"+
						"return function(x) {"+
							"GM_setValue('gt_" + soundType + "', x.target.result);"+
						"};"+
					"})(file);");
					reader.readAsDataURL(file);
				}
			}
		}
		//Call update on all items dropped
		tileTypes.length > 0 && setTimeout(function(){updateTiles();},1e2);
		soundTypes.length > 0 && setTimeout(function(){updateSounds();},1e2);
		if (tileTypes.length > 0 || soundTypes.length > 0) {
			message_div.style.display = "inline-block";
			setTimeout(function() {message_div.style.opacity = "1.0";},10);
			setTimeout(function() {
				message_div.style.opacity = "0.0";
				setTimeout(function() {
					message_div.style.display = "none";
				},0.25e3);
			}, 1.25e3);
		}
		
	}
	document.documentElement.addEventListener('dragover', handleDragOver, false);
	document.documentElement.addEventListener('drop', handleFileSelect, false);
	
	// Toggle tiles button:
	var btn_tiles = document.getElementById("btn_tiles");
	btn_tiles.onclick=toggle_btnTiles; 
	function toggle_btnTiles(){
		gt_drawTiles = !gt_drawTiles;
		GM_setValue('gt_drawTiles',gt_drawTiles.toString());
		update_btnTiles();
		updateTiles();
	}
	function update_btnTiles() {
		btn_tiles.innerHTML = gt_drawTiles == true ? "On" : "Off";
		btn_tiles.style.color = gt_drawTiles == true ? "#47953d" : "#ff011f";
	}
	// Update the tiles:
	function updateTiles() {
		if (document.getElementById('tiles')) {
			var tileTypes = ['tiles','splats','speedpad','speedpadred','speedpadblue','portal'];
			for (var i=0; i<tileTypes.length; i++) {
				if(document.getElementById(tileTypes[i])) {
					document.getElementById(tileTypes[i]).src = "";
					document.getElementById(tileTypes[i]).src = (gt_drawTiles && GM_getValue('gt_' + tileTypes[i])) ? GM_getValue('gt_' + tileTypes[i]) : "http://" + document.location.hostname + "/images/" + tileTypes[i] + ".png";
				}
			}
			setTimeout(unsafeWindow.tagpro.api.redrawBackground,1e2);
		}
	}
	
	// Toggle sounds button:
	var btn_sounds = document.getElementById("btn_sounds");
	btn_sounds.onclick=toggle_btnSounds; 
	function toggle_btnSounds(){
		gt_customSounds = !gt_customSounds;
		GM_setValue('gt_customSounds',gt_customSounds.toString());
		update_btnSounds();
		updateSounds();
	}
	function update_btnSounds() {
		btn_sounds.innerHTML = gt_customSounds == true ? "On" : "Off";
		btn_sounds.style.color = gt_customSounds == true ? "#47953d" : "#ff011f";
	}
	// Update the sounds
	function updateSounds() {
		if (document.getElementById('countdown')) {
			var soundTypes = ['burst', 'alert', 'cheering', 'drop', 'sigh', 'powerup', 'pop', 'click', 'explosion', 'countdown', 'friendlydrop', 'friendlyalert', 'alertlong', 'go', 'degreeup', 'teleport'];
			for (var i=0; i<soundTypes.length; i++) {
				if(document.getElementById(soundTypes[i])) {
					if (gt_customSounds && GM_getValue('gt_' + soundTypes[i]) != undefined) {
						var newSource = document.createElement('source');
						newSource.src = GM_getValue('gt_' + soundTypes[i]);
						var regex = /data:(.*);base64/;
						var type = regex.exec(newSource.src)[1];
						newSource.type = type;
						var audioTag = eval("document.getElementsByTagName(\"audio\")." + soundTypes[i]);
						audioTag.innerHTML = "";
						audioTag.appendChild(newSource);
						audioTag.load();
					} else {
						var audioTag = eval("document.getElementsByTagName(\"audio\")." + soundTypes[i]);
						audioTag.innerHTML = "<source type=\"audio/mp3\" src=\"http://" + document.location.hostname + "/sounds/" + soundTypes[i] + ".mp3\"></source><source type=\"audio/m4a\" src=\"http://" + document.location.hostname + "/sounds/" + soundTypes[i] + ".m4a\"></source><source type=\"audio/ogg\" src=\"http://" + document.location.hostname + "/sounds/" + soundTypes[i] + ".ogg\"></source>";
						audioTag.load();
					}
				}
			}
		}
	}
	
	// Toggle wallpaper button:
	var btn_wallpaper = document.getElementById("btn_wallpaper");
	btn_wallpaper.onclick=toggle_btnWallpaper; 
	function toggle_btnWallpaper(){
		gt_drawWallpaper = !gt_drawWallpaper;
		GM_setValue('gt_drawWallpaper',gt_drawWallpaper.toString());
		update_btnWallpaper();
		updateWallpaper();
	}
	function update_btnWallpaper() {
		btn_wallpaper.innerHTML = gt_drawWallpaper == true ? "On" : "Off";
		btn_wallpaper.style.color = gt_drawWallpaper == true ? "#47953d" : "#ff011f";
	}
	// Update the wallpaper
	function updateWallpaper() {
		if (gt_drawWallpaper && GM_getValue('gt_wallpaper')) {
			document.documentElement.style.background = "url(" + GM_getValue('gt_wallpaper') + ")";
		} else {
			document.documentElement.style.background = "url(\"http://" + document.location.hostname + "/images/background.jpg\")";
		}
		document.documentElement.style.backgroundRepeat = "no-repeat";
		document.documentElement.style.backgroundAttachment = "fixed";
		document.documentElement.style.backgroundPosition = "center center";
		document.documentElement.style.backgroundSize = "cover";
	}
	
	// Toggle background button:
	var btn_background = document.getElementById("btn_background");
	btn_background.onclick=toggle_btnBackground; 
	function toggle_btnBackground(){
		gt_transparentBackground = !gt_transparentBackground;
		GM_setValue('gt_transparentBackground',gt_transparentBackground.toString());
		update_btnBackground();
	}
	function update_btnBackground() {
		btn_background.innerHTML = gt_transparentBackground == true ? "On" : "Off";
		btn_background.style.color = gt_transparentBackground == true ? "#47953d" : "#ff011f";
		updateBackground();
	}
	function updateBackground() {
		if (document.getElementById("viewPort")) {
			var vp = document.getElementById("viewPort");
			vp.style.backgroundColor = gt_transparentBackground ? "rgba(0,0,0,0)" : "black";
		}
	}
	
	// Toggle maximize button:
	var btn_maximize = document.getElementById("btn_maximize");
	btn_maximize.onclick=toggle_btnMaximize; 
	function toggle_btnMaximize(){
		gt_maximize = !gt_maximize;
		GM_setValue('gt_maximize',gt_maximize.toString());
		update_btnMaximize();
		updateMaximize();
	}
	function update_btnMaximize() {
		btn_maximize.innerHTML = gt_maximize == true ? "On" : "Off";
		btn_maximize.style.color = gt_maximize == true ? "#47953d" : "#ff011f";
	}
	function updateMaximize() {
		if (document.getElementById("viewPort")) {
			var vp = document.getElementById("viewPort");
			var vw = vp.width;
			var vh = vp.height;
			if (gt_maximize) {
				// Stetch to fit while maintaining aspect ratio
				var w = window.innerWidth;
				var h = window.innerHeight;
				var ratio = w/h;
				if (ratio > vw/vh) {
					// Width dominates, the top/bottom will have to be clipped
					vp.style.width = w + "px";
					vp.style.height = w*(vh/vw) + "px";
					vp.style.marginLeft = "0px";
					vp.style.marginTop = (window.innerHeight - parseInt(vp.style.height))/2 + "px";
				} else {
					// Height dominates, the left/right will have to be clipped
					vp.style.height = h + "px";
					vp.style.width = h*(vw/vh) + "px";
					vp.style.marginTop = "0px";
					vp.style.marginLeft = (window.innerWidth - parseInt(vp.style.width))/2 + "px";
				}
				vp.style.border = "none";
			} else {
				// Revert back to normal
				vp.style.width = vw + "px";
				vp.style.height = vh + "px";
				vp.style.border = "10px solid white";
				vp.style.marginTop = (window.innerHeight - (vh + 20))/2 + "px";
				vp.style.marginLeft = (window.innerWidth - (vw + 20))/2 + "px";
			}
		}
	}
	
	// Toggle icons button:
	var btn_hideIcons = document.getElementById("btn_hideIcons");
	btn_hideIcons.onclick=toggle_btnHideIcons; 
	function toggle_btnHideIcons(){
		gt_hideIcons = !gt_hideIcons;
		GM_setValue('gt_hideIcons',gt_hideIcons.toString());
		update_btnHideIcons();
		updateHideIcons();
	}
	function update_btnHideIcons() {
		btn_hideIcons.innerHTML = gt_hideIcons == true ? "On" : "Off";
		btn_hideIcons.style.color = gt_hideIcons == true ? "#47953d" : "#ff011f";
	}
	// Update the icons
	function updateHideIcons() {
		if (gt_hideIcons) {
			if (document.getElementById("soundEffects")) {
				document.getElementById("soundEffects").style.visibility="hidden";
				document.getElementById("soundEffects").style.display="none";
			}
			if (document.getElementById("soundMusic")) {
				document.getElementById("soundMusic").style.visibility="hidden";
				document.getElementById("soundMusic").style.display="none";
			}
			if (document.getElementById("exit")) {
				document.getElementById("exit").style.visibility="hidden";
				document.getElementById("exit").style.display="none";
			}
			if (document.getElementById("donate")) {
				document.getElementById("donate").style.visibility="hidden";
				document.getElementById("donate").style.display="none";
			}
		} else {
			if (document.getElementById("soundEffects")) {
				document.getElementById("soundEffects").style.visibility="visible";
				document.getElementById("soundEffects").style.display="inline-block";
			}
			if (document.getElementById("soundMusic")) {
				document.getElementById("soundMusic").style.visibility="visible";
				document.getElementById("soundMusic").style.display="inline-block";
			}
			if (document.getElementById("exit")) {
				document.getElementById("exit").style.visibility="visible";
				document.getElementById("exit").style.display="inline-block";
			}
			if (document.getElementById("donate")) {
				document.getElementById("donate").style.visibility="visible";
				document.getElementById("donate").style.display="inline-block";
			}
		}
	}
	
	// Position menu and load initial button states
	setTimeout(function() {
		repositionIcon();
		repositionMenu();
		update_btnTiles();
		updateTiles();
		update_btnSounds();
		updateSounds();
		update_btnWallpaper();
		update_btnBackground();
		updateBackground();
		updateWallpaper();
		update_btnHideIcons();
		updateHideIcons();
		update_btnMaximize();
		setTimeout(updateMaximize,1e3);
	}, 1e2);
	
	// Handle resize event
	window.onresize=function(){
		repositionIcon();
		repositionMenu();
		
		if (resizeTimer) {
			clearTimeout(resizeTimer);
			resizeTimer = false;
		}
		resizeTimer = setTimeout(function() {
			updateMaximize();
			resizeTimer = false;
		}, 1100);
	}

});
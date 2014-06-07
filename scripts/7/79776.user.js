// ==UserScript==
// @name           Pod GV
// @namespace      http://artemis.pardus.at
// @description    Quick button to pod that cod. Or just press Delete key when on same tile with him :P
// @include        http://artemis.pardus.at/main.php*
// ==/UserScript==

function doKeyboardAction(e) {

  // when Delete key pressed then execute
  if (e.keyCode == 46) {
       document.getElementById('podGV').submit();
  }

}

document = unsafeWindow.document;

var img = document.getElementsByTagName('img');

var count=0;32
for(i = 0; i < img.length; i++) {

	if(img[i].getAttribute('class') == 'nf') {
		count++;
	}
}

var gridSize = Math.sqrt(count);
var mapWidth = gridSize;
var mapHeight = gridSize;
var mapWidthPx = 64 * gridSize;
var mapHeightPx = 64 * gridSize;
var heightOffset = mapHeightPx + 50;

var NavArea = document.getElementById("navarea")
var child = document.createElement("div")

child.setAttribute("style", "position: absolute; top: " + heightOffset + "px; left: 20%; width: 60%;");

child.innerHTML = '<center><form id="podGV" action="ship2ship_combat.php?playerid=113941" method="post" style="display:inline;"><select name="rounds" size="1"><option value="1">1 (16 APs)</option><option value="2">2 (30 APs)</option><option value="3">3 (44 APs)</option><option value="4">4 (58 APs)</option><option value="5">5 (72 APs)</option><option value="6">6 (84 APs)</option><option value="7">7 (96 APs)</option><option value="8">8 (108 APs)</option><option value="9">9 (120 APs)</option><option value="10">10 (132 APs)</option><option value="11">11 (142 APs)</option><option value="12">12 (152 APs)</option><option value="13">13 (162 APs)</option><option value="14">14 (172 APs)</option><option value="15">15 (180 APs)</option><option value="16">16 (188 APs)</option><option value="17">17 (196 APs)</option><option value="18">18 (204 APs)</option><option value="19">19 (212 APs)</option><option value="20" selected>20 (220 APs)</option></select><br><br><input name="ok" type="submit" value="Kill GV" style="width: 220px; height: 60px;"></form></center>'

window.addEventListener("keydown", doKeyboardAction, true);
document.body.insertBefore(child, document.body.lastChild);


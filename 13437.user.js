// ==UserScript==
// @name	Travian Village Center Numbers .1
// @namespace	Travian
// @description	Shows the current level of your buildings on the Village Center page.
// @include	http://*travian*/dorf2*
// @include	http://*travian*/build.php?newdid*
// ==/UserScript==

// ›› Event listener starts things off once the page is done loading.
window.addEventListener("load",init,false);

// ›› Set styles.
function init(){
	var cssString = '.TMbuildingtags{' +
		'background-color:#FDF8C1;' + 
		'border:thin solid #000000;' +
		'-moz-border-radius: 2em;' +
		'border-radius: 2em;' +
		'padding-top: 3px;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'text-align:center;' +
		'position:absolute;' +
		'width:18px;' +
		'height:15px;' +
		'cursor:pointer;' +
		'visibility:hidden;' +
		'z-index:50;}';
	addCSS(cssString);
	TM_ShowMainBuildingNumbers();
}

// ›› Main.
function TM_ShowMainBuildingNumbers(){
	// ›› x and y offset in pixels added to every absolutely positioned style element
	var x = 152;
	var y = 160;
			
	// ›› could get this from the styles, but hard coding them is faster and allows for a simpler loop
	buildArr1 = new Array(21);
	buildArr1[0] = 318 + x;
	buildArr1[1] = 121 + x;
	buildArr1[2] = 204 + x;
	buildArr1[3] = 264 + x;
	buildArr1[4] = 338 + x;
	buildArr1[5] = 394 + x;
	buildArr1[6] = 86 + x;
	buildArr1[7] = 167 + x;
	buildArr1[8] = 253 + x;
	buildArr1[9] = 401 + x;
	buildArr1[10] = 72 + x;
	buildArr1[11] = 198 + x;
	buildArr1[12] = 161 + x;
	buildArr1[13] = 408 + x;
	buildArr1[14] = 90 + x;
	buildArr1[15] = 233 + x;
	buildArr1[16] = 360 + x;
	buildArr1[17] = 164 + x;
	buildArr1[18] = 292 + x;
	buildArr1[19] = 150 + x;
	buildArr1[20] = 266 + x;
	buildArr1[21] = 290 + x;

	buildArr2 = new Array(21);
	buildArr2[0] = 166 + y;
	buildArr2[1] = 82 + y;
	buildArr2[2] = 57 + y;
	buildArr2[3] = 47 + y;
	buildArr2[4] = 62 + y;
	buildArr2[5] = 111 + y;
	buildArr2[6] = 121 + y;
	buildArr2[7] = 128 + y;
	buildArr2[8] = 111 + y;
	buildArr2[9] = 152 + y;
	buildArr2[10] = 191 + y;
	buildArr2[11] = 156 + y;
	buildArr2[12] = 182 + y;
	buildArr2[13] = 210 + y;
	buildArr2[14] = 230 + y;
	buildArr2[15] = 226 + y;
	buildArr2[16] = 243 + y;
	buildArr2[17] = 266 + y;
	buildArr2[18] = 260 + y;
	buildArr2[19] = 297 + y;
	buildArr2[20] = 306 + y;
	buildArr2[21] = 356 + y;

	// ›› Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).
	var map1Element = document.getElementsByName('map1')[0];
	if (map1Element){
	
		// ›› Map1 ONLY has area children. 
		var areaElements = map1Element.childNodes;	
		var BuildingLevel, smallDIV;
		var BuildingURL = new Array(21);
		
		for (var i = 0; i < 22; i++) {
			BuildingLevel = /(\d+)/.exec(areaElements[i].getAttribute("title"));
			BuildingURL = areaElements[i].getAttribute("href");

			// ›› Only show spots with buildings on them.
			if (BuildingLevel){
				smallDIV = addDiv('TMbuildingtag' + i,'TMbuildingtags',BuildingLevel[0],false);
				smallDIV.style.top = buildArr2[i] + 'px';
				smallDIV.style.left = buildArr1[i] + 'px';
				smallDIV.style.visibility = "visible";
				smallDIV.setAttribute('goto', BuildingURL);
				smallDIV.addEventListener('click', function() {
					window.location.href = this.getAttribute('goto');
					}, true);
			}
		}
	}
}

// ›› Adds a generic div.
function addDiv(id,style,html,parent){
	var body, div;
	if (!parent){body = document.getElementsByTagName('body')[0];}else{body = document.getElementsByTagName(parent);}
	if (!body) { return false; }
	div = document.createElement('div');
	div.id = id;
	div.className = style;
	if (html){div.innerHTML = html;}
	body.appendChild(div);
	return div;
}

// ›› Add generic CSS.
function addCSS(cssString) {
	var style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = cssString;
	document.getElementsByTagName('HEAD')[0].appendChild(style);
}

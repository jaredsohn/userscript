// ==UserScript==
// @name    travian: Center number on Right in a green Box with the name of the building
// @namespace    Travian
// @description    Shows the current level of your buildings and position of the building on right in a green box for Dorf1 and Dorf2.
// @include    http://*travian*/dorf1*
// @include    http://*travian*/dorf2*
// @include    http://*travian*/build.php?newdid*
// ==/UserScript==

// ›› Event listener starts things off once the page is done loading.
window.addEventListener("load",init,false);

// ›› Set styles.
function init(){
    var cssString = '.TMbuildingWindows{' +
        'background-color:#99FF99;' +
        'border:thin solid #000000;' +
        '-moz-border-radius: 2em;' +
        'border-radius: 2em;' +
        'font-family: Verdana, Arial, Helvetica, sans-serif;' +
        'font-size:8pt;' +
        'font-weight:bold;' +
        'text-align:center;' +
        'position:absolute;' +
        'width:300px;' +
        'height:434px;' +
        'cursor:pointer;' +
        'visibility:hidden;' +
        'z-index:50;}';
    addCSS(cssString);
    TM_ShowMainBuildingWindows();
 
    var cssString = '.TMbuildingtags{' +
        'background-color:#FDF8C1;' +
        'border:thin solid #000000;' +
        '-moz-border-radius: 2em;' +
        'border-radius: 2em;' +
        'font-family: Verdana, Arial, Helvetica, sans-serif;' +
        'font-size:8pt;' +
        'font-weight:bold;' +
        'text-align:left;' +
        'position:absolute;' +
        'width:300px;' +
        'height:14px;' +
        'cursor:pointer;' +
        'visibility:hidden;' +
        'z-index:50;}';
    addCSS(cssString);
    TM_ShowMainBuildingNumbers();
}

// ›› Main.
function TM_ShowMainBuildingWindows(){

        // ›› Map1 ONLY has area children.
        var BuildingWindow, smallDIV;
       
        // ›› Only show spots with buildings on them.
        {
	smallDIV = addDiv('TMbuildingWindow0','TMbuildingWindows','',false);
        smallDIV.style.top = '85px';
        smallDIV.style.left = '950px';
        smallDIV.style.visibility = "visible";
        }
}

function TM_ShowMainBuildingNumbers(){
    // ›› x and y offset in pixels added to every absolutely positioned style element
    var x = 0;
    var y = 85;
           
    // ›› could get this from the styles, but hard coding them is faster and allows for a simpler loop
    buildArr1 = new Array(21);
    buildArr1[0] = 950 + x;
    buildArr1[1] = 950 + x;
    buildArr1[2] = 950 + x;
    buildArr1[3] = 950 + x;
    buildArr1[4] = 950 + x;
    buildArr1[5] = 950 + x;
    buildArr1[6] = 950 + x;
    buildArr1[7] = 950 + x;
    buildArr1[8] = 950 + x;
    buildArr1[9] = 950 + x;
    buildArr1[10] = 950 + x;
    buildArr1[11] = 950 + x;
    buildArr1[12] = 950 + x;
    buildArr1[13] = 950 + x;
    buildArr1[14] = 950 + x;
    buildArr1[15] = 950 + x;
    buildArr1[16] = 950 + x;
    buildArr1[17] = 950 + x;
    buildArr1[18] = 950 + x;
    buildArr1[19] = 950 + x;
    buildArr1[20] = 950 + x;
    buildArr1[21] = 950 + x;

    buildArr2 = new Array(21);
    buildArr2[0] = 0 + y;
    buildArr2[1] = 20 + y;
    buildArr2[2] = 40 + y;
    buildArr2[3] = 60 + y;
    buildArr2[4] = 80 + y;
    buildArr2[5] = 100 + y;
    buildArr2[6] = 120 + y;
    buildArr2[7] = 140 + y;
    buildArr2[8] = 160 + y;
    buildArr2[9] = 180 + y;
    buildArr2[10] = 200 + y;
    buildArr2[11] = 220 + y;
    buildArr2[12] = 240 + y;
    buildArr2[13] = 260 + y;
    buildArr2[14] = 280 + y;
    buildArr2[15] = 300 + y;
    buildArr2[16] = 320 + y;
    buildArr2[17] = 340 + y;
    buildArr2[18] = 360 + y;
    buildArr2[19] = 380 + y;
    buildArr2[20] = 400 + y;
    buildArr2[21] = 420 + y;

// ›› Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).
	hName = document.URL
	d1Name = hName.indexOf("dorf1")
	d2Name = hName.indexOf("dorf2")

   if (d1Name >= 0){
	var map1Element = document.getElementsByName('rx')[0]; 
   }
   else{
	var map1Element = document.getElementsByName('map1')[0];
   }

   if (map1Element){
   
// ›› Map1 ONLY has area children.
        var areaElements = map1Element.childNodes;   
        var BuildingLevel, smallDIV;
        var BuildingName = new Array(21);
        var BuildingURL = new Array(21);
       
        for (var i = 0; i < 22; i++) {
            BuildingLevel = /(\d+)/.exec(areaElements[i].getAttribute("title"));
            BuildingName = /[0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZÂAÎªÞabcdefghijklmnopqrstuvwxyzâîaAsStTÎÂ -]+/.exec(areaElements[i].getAttribute(" title"));
            var Name = BuildingName[0];
            var spot = Name.indexOf(" taso"); //REPlase this with level
            bName = Name.slice(0,spot);
            BuildingURL = areaElements[i].getAttribute("href");

// ›› Only show spots with buildings on them.
            if (BuildingLevel){

		codeID = areaElements[i].getAttribute("href")	

// building image
		var x=areaElements[i].getAttribute("title");
		var alfa=x.indexOf('Nivel');
		var gama=x.substring(0,alfa-1);
//		switch (gama)
//		{
//			case Hambar:
//				beta=document.createElement('div');
//				beta.innerHTML='<img src="http://speed.travian.ro/img/un/g/g10.gif" alt="??????" /><p>'+y+'</p>';
//				omega='<img src="http://speed.travian.ro/img/un/g/g10.gif" alt="??????" /><p>'+y+'</p>';
//				break;
//			case "Granar":
//				beta=document.createElement('div');
//				beta.innerHTML='<img src="http://speed.travian.ro/img/un/g/g11.gif" alt="??????" /><p>'+y+'</p>';
//				omega=' 11';
//			default:
//				omega=''
//				break;
//		}

                      smallDIV = addDiv('TMbuildingtag' + i,'TMbuildingtags','  ' + codeID.substring(13) + '. ' + areaElements[i].getAttribute("title"),false);
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

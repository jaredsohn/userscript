// ==UserScript==
// @name    TABLE WITH BUILDING, LEVELS AND POSITION
// @namespace    Travian
// @description    PLEAS DONT INSATLL
// @include    http://*travian*/dorf1*
// @include    http://*travian*/dorf2*
// @include    http://*travian*/build.php?newdid*
// ==/UserScript==

// ›› Event listener starts things off once the page is done loading.
window.addEventListener("load",init,false);

// ›› Program run.
function init(){
    TM_ShowMainBuildingData();
}

// ›› Main.
function TM_ShowMainBuildingData(){

// ›› Map holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).
	hName = document.URL
	d1Name = hName.indexOf("dorf1")
	d2Name = hName.indexOf("dorf2")

	if (d1Name >= 0){
		var mapElement = document.getElementsByName('rx')[0]; 
	}
	else{
		var mapElement = document.getElementsByName('map1')[0];
	}

	if (mapElement){
   
// ›› Map ONLY has area children.
        var areaElements = mapElement.childNodes;   
        var BuildingLevel, smallDIV;
        var BuildingName = new Array(21);
        var BuildingURL = new Array(21);
       
// ›› Create table
	var table = document.createElement('TABLE');
		table.setAttribute("class", "tbg");
		//table.setAttribute("width", "1000px");
		table.setAttribute("align", "left");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");
	var fila1 = document.createElement('TR');
	var fila2 = document.createElement('TR');
		fila1.setAttribute("class", "rbg");	

		table.appendChild(fila1);
		table.appendChild(fila2);

        for (var i = 0; i < 22; i++) {
// ›› Only show spots with buildings on them.
            if (BuildingLevel){
		codeID = areaElements[i].getAttribute("href");

// ›› Building image
		var x=areaElements[i].getAttribute("title");
		var alfa=x.indexOf('Nivel');
		var gama=x.substring(0,alfa-1);
		var eta=x.substring(alfa+5,alfa+10)	


		var td1 = elem('TD'+gama);
			td1.setAttribute('width','25%');
			fila1.appendChild(td1);

		var td2 = elem('TD'+eta);
			td2.setAttribute("valign", "top");
			td2.setAttribute('width','25%');
			fila2.appendChild(td2);
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
function elem(tag, content){
	var ret = document.createElement(tag);
	ret.innerHTML = content;
	return ret;
}
// ==UserScript==
// @name            Travian: Center Numbers Simple
// @autor           MeXaon (based travspeedster) edit Underke
// @version         6
// @namespace       Travian
// @description     Travian: Village Center Numbers 6
// @include         http://*travian*/dorf2*
// ==/UserScript==
// ›› Event listener starts things off once the page is done loading.


var dorf = 0;
var _setValue, _getValue, _removeValue, glStorage, nameSpace = 'TM.';


function initSaveValue() {
	if (typeof GM_setValue != "undefined") {
		_setValue = function(name, value) { GM_setValue(name, value)};
		_getValue = function(name,defaultValue) { return GM_getValue(name, defaultValue)};
		_removeValue = function(name) { GM_setValue(name, '')};
	} else {
		_setValue = function(name, value) {
			document.cookie = nameSpace + name + '=' + escape(value) + ';expires="";path=/';
		};
		_getValue = function(name, defaultValue) {
			var reg = new RegExp(nameSpace + name + "=([^;\n\r]*);?", "i");
			var data = reg.exec(document.cookie);
			if (data == null || data.length <= 1) {
			return defaultValue;	
			} else 	return unescape(data[1]);
		};
		_removeValue = function(name) {
			_setValue(name, '');
		};
	}
}

// ›› Set styles.
function init(){

	var cssString = '.TMbuildingtags{' +
		'background-color:#DDDDAA;' + 
		'border:thin solid #000000;' +
		'-moz-border-radius: 7px;' +
		'border-radius: 7px;' +
		'padding: 2px;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'text-align:center;' +
		'position:absolute;' +
		'width:18px;' +
		'height:15px;' +
		'cursor:pointer;' +
		'visibility:hidden;' +
		'z-index:26;}' +
		'.tm_uplevel {' + 
			'background-color:#99EE99;' +
			'border:1px solid #000;' +
			'-moz-border-radius: 4px;' +
			'-moz-user-select:none;' +
			'padding: 2px;' +
			'font-size:8pt;' +
			'font-weight:bold;' +
			'text-align:center;' +
			'position: absolute;' +
			'width: 21px;' +
			'height: 15px;' +
			'cursor: pointer;' +
			'z-index: 100;}'
	
	GM_addStyle(cssString);
	initSaveValue();
	TM_ShowMainBuildingNumbers();
	
}

// ›› Main.
function TM_ShowMainBuildingNumbers(){



	var imgId, countArray, dx, dy, checkWW;

	//  Map2 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).

	var map2Element;
	if (dorf == 0) {
		map2Element = document.getElementsByName('map2')[0];
		if (map2Element) {

			countArray = 22;
			dtop = 46;
			dleft = 78;
			dorf = 2;
		}

		
	}

//		GM_log("WW = " + checkWW)

		// ›› Map2 ONLY has area children. 
		var areaElements = map2Element.getElementsByTagName('area');	
		
		var BuildingLevel, smallDIV, coords;
		var BuildingURL = new Array(21);
	
		
		


		for (var i = 0; i < countArray; i++) {
 												//alert(	i+' vd '+countArray); 	
			//GM_log("i=" + i + " >>>" + areaElements.length)


			BuildingLevel = /(\d+)/.exec(areaElements[i].getAttribute("title")); 	//level
												//alert('BuildingLevel  =' + BuildingLevel);
			BuildingURL = areaElements[i].getAttribute("href");			//place in village -> wall and gathering place have specific location
												//alert('BuildingURL ='+BuildingURL +'  i ='+i );
												//alert('BuildingURL  =' + BuildingURL  );
			var gid = areaElements[i].getAttribute("title");			//EXAMPLE. RESIDENTIE LVL 20
												//alert('gid =' + gid );

			coords = areaElements[i].coords.split(','); //locaties
			
			//GM_log('BuildingLevel="' + BuildingLevel  + '" BuildingURL="' + BuildingURL + '"');





	

			// ›› Only show spots with buildings on them.
			if (gid.indexOf(' ')>0)	 //if space -> then not a buildingplace
			{
			

				if (BuildingLevel[0] ){ //redundant
				
			
					if (dorf == 2) { //?
	
					imgId = parseInt(BuildingURL.match(/id\=(\d+)/).pop()) - 18;
						//alert('BuildingURL ='+BuildingURL +'  imgId ='+imgId );
						//alert('hier geraakt m ' + imgId);
						
						var gid = areaElements[i].getAttribute("title");
						//alert('gid =' + gid );
						
						var temp = new Array();
						temp = gid.split(' ');
						gid = temp[0];
					}

			
				}


				
				if (BuildingLevel[0] < getMaxLevel(gid)) {
				

					var smallDIV = addDiv('TMbuildingtag' + i,'TMbuildingtags',BuildingLevel[0],false);
					
					smallDIV.style.top = parseInt(coords[1]) + parseInt(150) + 'px';
					smallDIV.style.left = parseInt(coords[0]) + parseInt(225) + 'px';


						
					smallDIV.style.visibility = "visible";
					

					
					smallDIV.setAttribute('onclick', 'location.href="'+BuildingURL+'";');
					
				} // else if
			}// if ->
			

		} // for
} // function


function addDiv(id,style,html,parent){
//alert('hier geraakt m');	
	var body, div;
	if (!parent){body = document.getElementsByTagName('body')[0];}else{body = document.getElementById(parent);}
	if (!body) {return false;}
	div = document.createElement('DIV');
	if (id)		{div.id = id;}
	if (style)	{div.className = style;}
	if (html)	{div.innerHTML = html;}
	//div.style.position = 'Absolute';
	//div.style.zindex = 2;
	body.appendChild(div);
	//document.getElementById(building d1 g25).appendChild(div);
	return div;
}

function newDiv(iHTML, cAttribute) {
		var aDiv = document.createElement("DIV");
		aDiv.innerHTML = iHTML;
		addAttributes(aDiv, cAttribute);
		return aDiv;
}


function getMaxLevel(gid) {
	var maxLevel;
	switch (gid) {
		case 'Korenmolen':
			maxLevel = 5;
			break;
		case 'Bakkerij':
			maxLevel = 5;
			break;
		case 'Steenbakkerij':
			maxLevel = 5;
			break;
		case 'Zaagmolen':
			maxLevel = 5;
			break;
		case 'IJzersmederij':
			maxLevel = 5;
			break;
		default:
			maxLevel = 20;
	}
	return (maxLevel)
}










var eventSource = (navigator.appName == 'Opera') ? document : window;
eventSource.addEventListener( 'load', init, false);



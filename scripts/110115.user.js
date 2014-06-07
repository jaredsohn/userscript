// ==UserScript==
// @name De Lijn Fix
// @description Script om de site van De Lijn beter te maken
// @include *reisinfo.delijn.be/reisinfo*
// @exclude *reisinfo.delijn.be/reisinfo/faces*
// @version	1.18
// ==/UserScript==
addAPIEmulation();

GM_log('Launching script');

var places;

var strPlaces = 'places';
var strCheckboxes = 'checkboxes';

GM_log('Adding places');
loadPlaces();

GM_log('Unchecking checkboxes');
uncheckBoxes();

GM_log('Adding custom styles');
addStyles();

GM_log('Adding custom menus');
addCustomMenus();

GM_log('Adding event listeners');
addEventListener();

GM_log('Adding custom JavaScript code');
addJavaScript();

GM_log('Changing to default modes');
changeMode('v','halte');
changeMode('a','halte');

//Functions

function loadPlaces(){
	places =  GM_getValue(strPlaces);

	if (places == undefined){		
		GM_log('Creating new entry...');
		places = new Array();
		GM_setValue(strPlaces,JSON.stringify(places));
	} else {
		places = JSON.parse(places);
	}
	
	GM_log('Loaded ' + places.length + ' places.');
}

function changeMode(va,mode){
	mode = mode.charAt(0).toUpperCase() + mode.slice(1);
	
	var voa;
	if(va == 'v'){ 
		voa = 'vertrek'; 
	} else {
		voa = 'aankomst'; 
	}

	var nr = '';

	switch(mode){
		case 'Adres':
			nr = '0';
			break;
		case 'Halte':
			nr = '1';
			break;
		case 'Station':
			nr = '2';
			break;
		default:
			break;
	}

	var opt1 = document.getElementById('form1:vertrekOpBasisVanRadio:' + nr);
	var opt2 = document.getElementById('form1:aankomstOpBasisVanRadio:' + nr);

	//Check radio buttons
	if(va == 'v'){
		opt1.checked = true;
	} else {
		opt2.checked = true;
	}

	element = document.getElementById('form1:' + voa + 'AdresGrid'); element.style.display = 'none'; 
	element = document.getElementById('form1:' + voa + 'StationGrid'); element.style.display = 'none';
	element = document.getElementById('form1:' + voa + 'HerkenningspuntGrid'); element.style.display = 'none';
	element = document.getElementById('form1:' + voa + 'HalteGrid'); element.style.display = 'none';

	element = document.getElementById('form1:aankomstAdresGrid'); element.style.display = 'none';
	element = document.getElementById('form1:aankomstStationGrid'); element.style.display = 'none';
	element = document.getElementById('form1:aankomstHerkenningspuntGrid'); element.style.display = 'none';
	element = document.getElementById('form1:aankomstHalteGrid'); element.style.display = 'none';

	element = document.getElementById('form1:aankomst' + mode + 'Grid'); element.style.display = 'block';
	element = document.getElementById('form1:vertrek' + mode + 'Grid'); element.style.display = 'block';

	moveMenu();
}

function movePlaceUp(){
	var upId = this.id.substring(3);
	
	//Save upId - 1 data
	var tmp = places[upId - 1];
	
	//Replace upId - 1 with upId
	places[upId - 1] = places[upId];
	places[upId] = tmp;
	
	//Save
	GM_setValue(strPlaces,JSON.stringify(places));
	
	//Reload page
	window.location.href=window.location.href;
}

function addPlace(){
	GM_log('Adding new place.');
	
	var gemeente = document.getElementById('form1:vertrekGemeenteInput').value;
	var halte = document.getElementById('form1:vertrekHalteInput').value;
	var naam = document.getElementById('txtNaam').value;
	
	//Naam, and at least gemeente or halte should be filled in
	if(naam == "" || (gemeente == "" && halte == "")){
		alert("Gelieve een naam en minstens 1 veld in te vullen.");
	} else {
		var cont = true;
		
		if(places.length >= 5){
			var answer = confirm ("De lay-out heeft maar plaats voor 5 locaties, ben je zeker dat je een nieuwe plaats wilt toevoegen?")
			cont = answer;
		}
		
		if(cont){
			var i = places.length;
			places[i] = new Array();
			places[i][0] = naam;
			places[i][1] = 'h';
			places[i][2] = gemeente;
			places[i][3] = halte;
			
			GM_setValue(strPlaces,JSON.stringify(places));
			
			GM_log('New place added, refreshing page');
			
			//Reload page
			window.location.href=window.location.href;
		} else {
			GM_log('Not adding new place');
		}
	}
}

function moveMenu(){
	var height = document.getElementById('rp_vertrek').offsetHeight;
	var top = height + 280;
	location.href = "javascript:void(document.getElementById('mnuaankomst').style.top = " + top + " + 'px')";
}

function uncheckBoxes(){
	//Checkboxes
	var chkBox1 = document.getElementById('form1:vervoermiddelenCheckbox:1');
	var chkBox2 = document.getElementById('form1:vervoermiddelenCheckbox:2');
	var chkBox3 = document.getElementById('form1:vervoermiddelenCheckbox:3');
	var chkBox4 = document.getElementById('form1:vervoermiddelenCheckbox:4');

	//Uncheck checkboxes
	chkBox1.checked = false;
	chkBox2.checked = false;
	chkBox3.checked = false;
	chkBox4.checked = false;
}

function removePlace(){
	var nr = this.id.substring(4);
	
	//Remove item
	places.splice(nr,1);

	//Save
	GM_setValue(strPlaces,JSON.stringify(places));
	
	//Reload page
	GM_log('Removed place, refreshing...');
	window.location.href=window.location.href;
}

//Insert custom JavaScript script
function addJavaScript(){
	var customScript = document.createElement("script");
	
	customScript.type = "text/javascript";
	
	htmlCode = "var places = new Array();\n";
	
	for (var i = 0; i < places.length; i++){ 
		htmlCode += 'places[' + i + '] = ["' + places[i][0] + '","' + places[i][1] + '","' + places[i][2] + '","' + places[i][3] + '"];\n';
	} 
	
	htmlCode += "\n\nfunction fillInputs(va,nr){\n";
	htmlCode += "var vaStr;\n";
	htmlCode += "var mode = places[nr][1];\n";
	htmlCode += "\tif (va=='v'){\n";
	htmlCode += "\t\tvaStr = 'vertrek'\n";
	htmlCode += "\t} else {\n";
	htmlCode += "\t\tvaStr = 'aankomst'\n";
	htmlCode += "\t};\n\n";
	htmlCode += "\tdocument.getElementById('form1:' + vaStr + 'GemeenteInput').value=places[nr][2];\n";
	htmlCode += "\tdocument.getElementById('form1:' + vaStr + 'HalteInput').value=places[nr][3];\n ";
	htmlCode += "}\n";

	customScript.innerHTML = htmlCode;
	
	element = document.getElementsByTagName("body")[0];
	element.appendChild(customScript, element);

	var rp = document.body.getElementsByClassName("routeplanner");
	rp.item(0).id = "rp_vertrek";
}

function addStyles(){
	//Add custom styles
	GM_addStyle(".extra_menu {position:absolute; width:200px; background-color:#508A99; border:1px solid; font-size:15px; min-height:20px;}");
	
	GM_addStyle(".places {border:1px solid; height:25px}");
	
	GM_addStyle(".vertrekPlaatsen, .aankomstPlaatsen {display:inline-block; width:160px; overflow:hidden;}");
	
	GM_addStyle("#upv0, #upa0 {display:none;}");
	
	GM_addStyle("#mnuvertrek {top:279px; left:720px;}");
	GM_addStyle("#mnuaankomst {top:465px; left:720px;}");
	
	GM_addStyle("#addCurrent {top:384px; left:650px; height:20px; width:40px;}");
	GM_addStyle("#addName {top:270px; left:205px; width:500px; height:30px; position:absolute;}");
	
	GM_addStyle(".lbl {float: left; width: 46px; color:#333; margin-top: 5px;}");
	GM_addStyle(".inp {width: 275px; border:1px solid #FD0; font:100% Arial, Verdana, Helvetica, sans-serif; margin-right:5px}");
	
	GM_addStyle(".extra_menu a {color: aliceBlue;}");
	GM_addStyle(".opt {float: right; padding-right:5px; visibility:hidden;}");
	
	GM_addStyle("li.custom {list-style-image:none ! important; margin-left:10px ! important;}");
		
	GM_addStyle("a:hover {text-decoration: underline; cursor: pointer;}");
	
	GM_addStyle("#btnfrmToevoegen {border:1px solid; background-color:#508A99;}");
	
	GM_addStyle(".noloc {font-size:14px; padding-left:5px}");
	//GM_addStyle("#btnSaveChk {position: absolute; top:100px; left: 100px;}");
}

function addCustomMenus(){
	//Create vertrek and aankosmt menu
	var voa;
	var voaFull;
	
	for (var n = 0; n < 2; n++){
		if(n == 0){
			voa = 'v';
			voaFull = 'vertrek';
		} else {
			voa = 'a'
			voaFull = 'aankomst'
		}
	
		var menu = document.createElement("div");
		
		var htmlCode = '<div id="mnu' + voaFull + '" class="extra_menu">';
		
		if(places.length == 0){
			htmlCode += '<span class="noloc">Nog geen opgeslagen locaties</span>';
		} else {
			for (var i = 0; i < places.length; i++){ 
				htmlCode += '<ul><div class="places"><li class="custom" ';
				htmlCode += 'onmouseover="javascript:document.getElementById(\'opt' + voa + i + '\').style.visibility=\'visible\';"';
				htmlCode += 'onmouseout="javascript:document.getElementById(\'opt' + voa + i + '\').style.visibility=\'hidden\';"';
				htmlCode += '><a onclick="javascript:fillInputs(\''+ voa + '\',' + i + ')" class="' + voaFull + 'Plaatsen"';
				htmlCode += '>' + places[i][0] + '</a>';
				htmlCode += '<span class="opt" id="opt' + voa + i + '">';
				htmlCode += '<a class="up" id="up' + voa + i + '">&uarr;</a>&nbsp;';
				htmlCode += '<a class="delete" id="del' + voa + i + '">&#9747;</a></span></li></div>\n</ul>';
			} 
		}
		htmlCode += '</div>';

		menu.innerHTML = htmlCode;

		element = document.getElementById('form1:vertrekHerkenningspuntGrid').nextSibling;
		element.parentNode.insertBefore(menu, element.nextSibbling);
	}

	//Create 'add name'
	menu = document.createElement("div");
	htmlCode = '<div id="addName">';
	htmlCode += '<form name="frmToevoegen">';
	htmlCode += '<label class="lbl" for="txtNaam">Naam :</label>';
	htmlCode += '<input class="inp" type="text" name="txtNaam" id="txtNaam" />&nbsp;';
	htmlCode += '<input type="button" name="btnAdd" id="btnfrmToevoegen" value="Toevoegen&nbsp;&rarr;" /></form>';
	htmlCode += '</div>';

	menu.innerHTML = htmlCode;

	element = document.getElementById('form1:vertrekHerkenningspuntGrid').nextSibling;
	element.parentNode.insertBefore(menu, element);
}

function replace(str,newStr,mod){
	textNodes = document.evaluate("//",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	var searchRE = new RegExp(str,mod);
	var replace = newStr;
	
	for (var i=0;i<textNodes.snapshotLength;i++) {
		var node = textNodes.snapshotItem(i);
		node.data = node.data.replace(searchRE, replace);
	}
}

function addEventListener(){
	//Event listeners for custom places links
	for(var n = 0; n < 2; n++){
		if(n == 0){
				voa = 'v';
				clsName = 'vertrekPlaatsen';
		} else {
				voa = 'a'
				clsName = 'aankomstPlaatsen'
		}
		
		plaatsen = document.getElementsByClassName(clsName);
		
		for (var i = 0; i < plaatsen.length; i++){ 
			element = plaatsen[i];
			current = places[i][1];
			switch(current){
				case 'a':
					element.addEventListener("click", function(){changeMode(voa,'Adres')}); 
					break;
				case 'h':
					element.addEventListener("click", function(){changeMode(voa,'Halte')}); 
					break;
			}
		}
	}
	
	//Add event listeners to radio buttons
	element = document.getElementById('form1:vertrekOpBasisVanRadio:0'); element.className = "radio";
	element.addEventListener("click", function(){moveMenu()}); 
	element = document.getElementById('form1:vertrekOpBasisVanRadio:1'); element.className = "radio";
	element.addEventListener("click", function(){moveMenu()}); 
	element = document.getElementById('form1:vertrekOpBasisVanRadio:2'); element.className = "radio";
	element.addEventListener("click", function(){moveMenu()}); 
	element = document.getElementById('form1:vertrekOpBasisVanRadio:3'); element.className = "radio";
	element.addEventListener("click", function(){moveMenu()}); 
	
	//Event listener for Add Place
	element = document.getElementById('btnfrmToevoegen');
	element.addEventListener("click", function(){addPlace()}); 
	
	//Event listerners for delete links
	var elements = document.getElementsByClassName("delete");
	
	for (var i=0; i<elements.length;i++) {
		elements[i].addEventListener("click", removePlace); 
	}
	
	//Event listener for up links
	elements = document.getElementsByClassName("up");
	
	for (var i=0; i<elements.length;i++) {
		elements[i].addEventListener("click", movePlaceUp); 
	}
}

function addAPIEmulation(){
if (typeof GM_deleteValue == 'undefined') {
    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}
}

//Updates?
var SUC_script_num = 110115;

try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_log('Checking for updates...'); GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));GM_log('Local version: ' + local_version);GM_log('Remote version: ' + remote_version);if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}else{GM_log('Not checking')}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

function KeyCheck(e){
	if(e.keyCode == 121){updateCheck(true);}
}

window.addEventListener('keydown', KeyCheck, true);
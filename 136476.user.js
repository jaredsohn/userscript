// ==UserScript==
// @name				Inc-Renamer
// @version    			1.4
// @description  		Die Stämme: Umbenennen von Angriffen 
// @author				SlowTarget, angepasst von RokKeT, Harpstennah , elcharro
// @include	  			http://ae*.tribalwars.ae/game.php*screen=info_command*
// ==/UserScript==

var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api.register( 'Inc-Renamer',[8.5, 8.6], 'Harpstennah', 'support-nur-im-forum@arcor.de' );

// version  2.0 vom 23.06.2012;
/* Änderungen Version 2.0
	- funktioniert nun unabhängig vom Ignorieren-Button (DS-Version 8.4)
	- Welt-Settings werden beim ersten Aufruf eingelesen und lokal gespeichert
	- sollte hierdurch nun auch auf SDS und neuen Welten mit Geschwindigkeit != 1 laufen
	- mit arrUnitNames können im Initialisierungsscript die Einheiten umbenannt werden
	- AG mit Entfernung > 70 Felder werden mit Fragezeichen kenntlich gemacht
*/
function labelAttack(){ 
	
	var win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	
	if(typeof(theFormat)=='undefined')theFormat='{unit} ({coords}) {player} F{distance} {sent}';
	if(typeof(arrUnitNames)=='undefined')arrUnitNames=['Scout','Light','Heavy','Axe','Sword','Ram', 'Cata', '**Noble**', 'Now'];
	arrReplace=['unit','coords','player','distance','sent','duration','arrival','origin','destination','destinationxy', 'return', 'incid', 'date'];
	arrHead=['Unit','Sent before','arrival','rename to'];
	
	arrValues=arrReplace;
	function fnReg(txtString){
		return new RegExp("\{"+txtString+"\}","ig"); 
	}
	arrReplace=arrReplace.map(fnReg);

	function getURLParam(strParamName){
		var strReturn = "";
		var strHref = window.location.href;
		if ( strHref.indexOf("?") > - 1 )
		{
		  var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
		  var aQueryString = strQueryString.split("&");
		  for ( var iParam = 0; iParam < aQueryString.length;
		  iParam ++ )
		  {
			 if (aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > - 1 )
			 {
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			 }
		  }
		}
		return unescape(strReturn)
	}	

	Speed=1;
	theDoc=win.document;
	if(win.frames.length>1)theDoc=win.main.document;
	
	function myGetCoords(theString){return/(.*?)\s\(((\d+)\|(\d+))\)\sK(\d+)/i.exec(theString);}
	function myZeroPad(theString){theInt=parseInt(theString,10);return(theInt>9?theInt:'0'+theInt);}
	function myGetElementsByTagName(theObj,theString){return theObj.getElementsByTagName(theString);}
	function myGetInner(theObj){return theObj.innerHTML;}
	function myGetInnerofFirstLink(theObj){return myGetInner(myGetElementsByTagName(theObj,'a')[0]);}
	function myInsRow(){return theTable.insertRow(intRow++);}
	function myInsCell(theInt){return newRow.insertCell(theInt);}
	function mySetInner(theObj,theString){theObj.innerHTML=theString;return theObj;}
	function myInsTH(theString){newCell=newRow.appendChild(theDoc.createElement('th'));
	return mySetInner(newCell,theString);}
	function myTime(theInt){return myZeroPad(theInt/Const3600)+':'+myZeroPad(theInt%(Const3600)/Const60 )+':'+myZeroPad(theInt%Const60);}
	function fnInt(txtInt){return parseInt(txtInt,10);}
	function fnDate(txtDate){
		arrMs=txtDate.match(/:(\d{3})$/i);
		if(arrMs)txtDate=txtDate.replace(/:(\d{3})$/i,'');
		var dtNew = new Date(txtDate);
		if(dtNew=='Invalid Date'){
			var arrDate=txtDate.match(/\b(\d+)\b/ig);
			arrDate=arrDate.map(fnInt);
			if(arrDate[2]<2000)arrDate[2]+=2000;
			dtNew = new Date(arrDate[2],arrDate[1]-1,arrDate[0],arrDate[3],arrDate[4],arrDate[5]);
		}
		if(arrMs)dtNew.setMilliseconds(arrMs[1]);
		return dtNew;
	}
	// Settings laden
	var world_id = win.game_data["world"];
	var world_speed = fReadSettings();
	
	Const3600=3600;
	Const60=60;
	ConstWidth='width';
	theTable=theDoc.getElementById('edit').parentNode.parentNode.parentNode.parentNode;
	theTable.removeAttribute(ConstWidth);
	var arrRows=theTable.rows;
	var intRows=arrRows.length;
	for(intRow=0;intRow<intRows;intRow++){
		theRow=arrRows[intRow];
		theLength=(arrCells=theRow.cells)?arrCells.length:0;
		if(theLength){
			arrCells[theLength-1].colSpan=5-theLength;
		}
	}
	arrValues[2]=myGetInnerofFirstLink(arrRows[1].cells[2]);
	arrAttack=myGetCoords(myGetInnerofFirstLink(arrRows[2].cells[1]));
	arrTarget=myGetCoords(myGetInnerofFirstLink(arrRows[4].cells[1]));
	arrValues[11]= getURLParam('id');
	arrValues[1]=arrAttack[2];
	arrValues[7]=arrAttack[0];
	arrValues[8]=arrTarget[0];
	arrValues[9]=arrTarget[2];
	// iAdd für Test mit eigenen Angriffen
	var iAdd = 0;
	if (arrRows[1].cells[2].innerHTML == arrRows[3].cells[2].innerHTML) iAdd = 1;
	arrValues[6]=typeof(arrRows[5+iAdd].cells[1].v)=='undefined'?arrRows[5+iAdd].cells[1].textContent:arrRows[5+iAdd].cells[1].innerText;
	dtArrival=fnDate(arrValues[6]);
	arrValues[6]=fnDateFormat(dtArrival);
        renDate=document.getElementById('serverDate').childNodes[0].nodeValue;
        renTime=document.getElementById('serverTime').childNodes[0].nodeValue;
        arrValues[12] = renTime + ' ' + renDate;
	arrArrivalIn=myGetInner(arrRows[6+iAdd].cells[1]).match(/\d+/ig);
	msecsArrivalIn=(arrArrivalIn[0]*Const3600+arrArrivalIn[1]*Const60+arrArrivalIn[2]*1)*1000;
	theXdiff=arrAttack[3]-arrTarget[3];
	theYdiff=arrAttack[4]-arrTarget[4];
	dblDistance=Math.sqrt(theXdiff*theXdiff+theYdiff*theYdiff);
	arrValues[3]=dblDistance.toFixed(2);
	var intRow=7+iAdd;
	arrElements=myGetElementsByTagName(theTable,'input');
	theInputButton=arrElements[1];
	theInputEdit=arrElements[0];
	theInputEdit.size=Const60;
	newRow=myInsRow();
	mySetInner(myInsCell(0),'Distance:').colSpan=2;
	mySetInner(myInsCell(1),arrValues[3]+' Fields').colSpan=2;
	newRow=myInsRow();
	arrHead.forEach(myInsTH);
	
	function fnPreg(varValue,intIdx){
		newInput.value=newInput.value.replace(arrReplace[intIdx],varValue);
	}
	function fnDateFormat(dtDate){
		intMs=dtDate.getMilliseconds();
		return myZeroPad(dtDate.getHours())+':'+myZeroPad(dtDate.getMinutes())+':'+myZeroPad(dtDate.getSeconds())+'.'+(intMs>99?intMs:'0'+myZeroPad(intMs))+' '+myZeroPad(dtDate.getDate())+'/'+myZeroPad(dtDate.getMonth()+1);
	}
	unknownN = "empty";
	for(theIndex in arrUnitNames){
        secsDuration=Math.round(world_speed[theIndex]*Const60*dblDistance/Speed); // hier bisher Settings der Welten
		msecsDuration = secsDuration*1000;
		secsDiff=(msecsDuration-msecsArrivalIn)/1000;
		if(secsDiff>0 || secsDuration == 0){  
			arrValues[0]=arrUnitNames[theIndex];
			arrValues[5]=myTime(secsDuration);
			dtSent=new Date(dtArrival-msecsDuration)
			arrValues[4]=fnDateFormat(dtSent);
			msecsReturn = Date.parse(dtArrival)+msecsDuration;
			dtReturn=new Date(msecsReturn);
			arrValues[10]=fnDateFormat(dtReturn);
			if(unknownN == "empty"){
			  unknownN = 'min' + arrUnitNames[theIndex];
			  unknownD =  arrValues[5];
			  unknownS =  arrValues[4];
			  unknownR =  arrValues[10];
			}
			if(secsDuration == 0){
			  arrValues[0]=unknownN;
			  arrValues[5]=unknownD;
			  arrValues[4]=unknownS;
			  arrValues[10]=unknownR;
			}
			newRow=myInsRow();
			// AG mit Entfernung > 70 Felder kennzeichnen
			if (theIndex == 7 && arrValues[3] > 70)	arrUnitNames[7] = '?' + arrUnitNames[7] + '?';
			mySetInner(myInsCell(0),arrUnitNames[theIndex]);
			mySetInner(myInsCell(1),secsDiff<Const60&&'Just Now'||
			'ago ' + secsDiff<Const3600&&Math.floor(secsDiff/Const60)+' min'||
			'vor ' + myTime(secsDiff));
			mySetInner(myInsCell(2),arrValues[5]);
			newCell=myInsCell(3);
			newButton=newCell.appendChild(theInputButton.cloneNode(true));
			newInput=newCell.appendChild(theInputEdit.cloneNode(true));
			newInput.id='I'+theIndex;
			newInput.value=theFormat;
			arrValues.forEach(fnPreg);
			newButton.addEventListener('mousedown', new Function('theInputEdit.value=theDoc.getElementById(\'I'+theIndex+'\').value;'), false);  
		}
	}
	
	// Geschwindigkeiten lesen oder ggf. aus der config auslesen + speichern
		function fReadSettings(){
		var aSetting = [9,10,11,18,22,30,30,35,0];
		var istSDS = win.sds;
		var savedSettings = eval("("+win.sessionStorage.getItem("ds_Inc-Renamer_"+world_id)+")");
		if (savedSettings == null || istSDS == true){
			var aConfig = get_world_config('get_unit_info',world_id);
			// ['Spy','LKAV','SKAV','Axt','Schwert','Ram', 'Kata', '**AG**', 'UNBK'];
			savedSettings = [aConfig.spy.speed, aConfig.light.speed, aConfig.heavy.speed, aConfig.axe.speed, aConfig.sword.speed, aConfig.ram.speed, aConfig.catapult.speed, aConfig.snob.speed, 0];
			if (savedSettings[1] != 0 && istSDS == false) win.sessionStorage.setItem("ds_Inc-Renamer_"+world_id,  JSON.stringify(savedSettings));
		}
		if (savedSettings[1] != 0)aSetting = savedSettings;
		return aSetting;
	}
	
	//based on	: truppenfilter.user.js
	function get_world_config(param,Welt){/*Credits: Jano1*/
		var xmlhttp=new XMLHttpRequest();
		var url = '/interface.php?func='+param;
		xmlhttp.open("GET",url,false);xmlhttp.send();
		var xmlDoc=xmlhttp.responseXML;	
		if(param == 'get_building_info'){
			var data_stand ={main:0,barracks:0,stable:0,garage:0,smith:0,place:0,statue:0,market:0,wood:0,stone:0,iron:0,farm:0,storage:0,hide:0,wall:0,snob:0,church:0,church_f:0};
			var inData_stand = {'max_level':0,'min_level':0,'wood':0,'stone':0,'iron':0,'pop':0,'wood_factor':0,'stone_factor':0,'iron_factor':0,'pop_factor':0,'build_time':0,'build_time_factor':0};
		}
		if(param == 'get_unit_info'){
			var data_stand ={spear:0,sword:0,axe:0,archer:0,spy:0,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0,miliz:0};
			var inData_stand = {'wood':0,'stone':0,'iron':0,'pop':0,'attack':0,'defense':0,'defense_kav':0,'defense_arch':0,'speed':0,'carry':0,'build_time':0};
		}
		var buildings, building, info, name, name_2; var count = 0; 
		var data = data_stand;
		buildings = xmlDoc.firstChild.childNodes;
		for (var i = 0; i < buildings.length; i++){
			building = buildings[i].childNodes;
			name = buildings[i].tagName;
			if(name != undefined){	
				if(param == 'get_building_info'){
					var inData = {'max_level':0,'min_level':0,'wood':0,'stone':0,'iron':0,'pop':0,'wood_factor':0,'stone_factor':0,'iron_factor':0,'pop_factor':0,'build_time':0,'build_time_factor':0};
				}
				if(param == 'get_unit_info'){
					var inData = {'wood':0,'stone':0,'iron':0,'pop':0,'attack':0,'defense':0,'defense_kav':0,'defense_arch':0,'speed':0,'carry':0,'build_time':0};
				}
				for (var ii = 0; ii < building.length; ii++){
					name_2 = building[ii].tagName;
					if(name_2 != undefined){
						inData[name_2] = building[ii].firstChild.nodeValue;
					}
				}
				data[name] = inData;
				count++;
			}
		}
		return data;
	}
}
labelAttack();
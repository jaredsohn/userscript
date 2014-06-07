// ==UserScript==
// @name			Attack Labeller
// @author			Unknown
// @description			Incoming attacking labeller for TribalWars
// ==/UserScript==
//javascript:

function myErrorSuppressor(){return true;}
window.onerror=myErrorSuppressor;
function labelAttack(){
	if(typeof(theFormat)=='undefined')theFormat='{unit} ({coords}) {player} F{distance} {sent}';
	if(typeof(arrUnitNames)=='undefined')arrUnitNames=['Scout','LC','HC','Axe','Sword','Ram','***Noble***'];
	arrReplace=['unit','coords','player','distance','sent','duration','arrival','origin','destination','destinationxy'];
	arrHead=['Unit','Sent','Duration','Name To'];
	arrValues=arrReplace;
	function fnReg(txtString){
		return new RegExp("\{"+txtString+"\}","ig");
	}
	arrReplace=arrReplace.map(fnReg);
	function fnGetConfig(){
		var oRequest=new XMLHttpRequest();
		var sURL="http://"+window.location.hostname+"/interface.php?func=get_config";
		oRequest.open("GET",sURL,0);
		oRequest.send(null);
		if(oRequest.status==200)return oRequest.responseXML;
		alert("Error executing XMLHttpRequest call to get Config!");
	}
	var xmlDoc=fnGetConfig();
	theUnitSpeed=xmlDoc.getElementsByTagName('unit_speed')[0].childNodes[0].nodeValue;
	theWorldSpeed=xmlDoc.getElementsByTagName('speed')[0].childNodes[0].nodeValue;
	theDoc=document;
	if(window.frames.length>1)theDoc=window.main.document;
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
	arrValues[1]=arrAttack[2];
	arrValues[7]=arrAttack[0];
	arrValues[8]=arrTarget[0];
	arrValues[9]=arrTarget[2];
	arrValues[6]=typeof(arrRows[intRows-3].cells[1].innerText)=='undefined'?arrRows[intRows-3].cells[1].textContent:arrRows[intRows-3].cells[1].innerText;
	dtArrival=fnDate(arrValues[6]);
	arrValues[6]=fnDateFormat(dtArrival);
	
	arrArrivalIn=myGetInner(arrRows[intRows-2].cells[1]).match(/\d+/ig);
	msecsArrivalIn=(arrArrivalIn[0]*Const3600+arrArrivalIn[1]*Const60+arrArrivalIn[2]*1)*1000;
	/*alert('txtAttacker :'+txtAttacker+'\narrAttack :'+arrAttack[2]+'|'+arrAttack[3]+'\narrTarget :'+arrTarget[2]+'|'+arrTarget[3]+'\ndtArrival :'+dtArrival+'\narrArrivalIn :'+arrArrivalIn[0]+':'+arrArrivalIn[1]+':'+arrArrivalIn[2]+':'+arrArrivalIn[3]+'\nsecsArrivalIn :'+secsArrivalIn);
	*/
	theXdiff=arrAttack[3]-arrTarget[3];
	theYdiff=arrAttack[4]-arrTarget[4];
	dblDistance=Math.sqrt(theXdiff*theXdiff+theYdiff*theYdiff);
	arrValues[3]=dblDistance.toFixed(2);
	var intRow=intRows-2;
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
	for(theIndex in arrUnitNames){
		msecsDuration=Math.round([9,10,11,18,22,30,35][theIndex]*Const60*1000*dblDistance/theWorldSpeed/theUnitSpeed);
		secsDiff=(msecsDuration-msecsArrivalIn)/1000;
		if(secsDiff>0){
			arrValues[0]=arrUnitNames[theIndex];
			arrValues[5]=myTime(msecsDuration/1000);
			dtSent=new Date(dtArrival-msecsDuration);
			arrValues[4]=fnDateFormat(dtSent);
			newRow=myInsRow();
			mySetInner(myInsCell(0),arrUnitNames[theIndex]);
			mySetInner(myInsCell(1),secsDiff<Const60&&'just now'||
			secsDiff<Const3600&&Math.floor(secsDiff/Const60)+' mins ago'||
			myTime(secsDiff)+' ago');
			mySetInner(myInsCell(2),arrValues[5]);
			newCell=myInsCell(3);
			newButton=newCell.appendChild(theInputButton.cloneNode(true));
			newInput=newCell.appendChild(theInputEdit.cloneNode(true));
			newInput.id='I'+theIndex;
			newInput.value=theFormat;
			arrValues.forEach(fnPreg);
			newButton.onmousedown=new Function('theInputEdit.value=theDoc.getElementById(\'I'+theIndex+'\').value;');
		}
	}
}
labelAttack();
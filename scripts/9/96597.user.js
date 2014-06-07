// ==UserScript==
// @name		سكربت اعادة تسمية الهجمات By:KOpc 
// @version    1.3
// @description  سكربت لاعادة تسمية الهجمات
// @author		SlowTarget, angepasst von RokKeT
// @include	  http://ae*.tribalwars.ae/game.php?*&screen=info_command&id=*&type=other
// @include	  http://ae*.tribalwars.ae/
// ==/UserScript==


theFormat='{unit} - بديه:{origin} - {player} - F{distance} - وصول:{arrival}';
function labelAttack(){
	if(typeof(theFormat)=='undefined')theFormat='{unit} ({coords}) {player} F{distance} {sent}';
	arrUnitNames=['كشافة ','فارس خفيف ','فارس ثقيل','مقاتل الفأس','مقاتل السيف ','محطمه','نبيل', 'UNBK'];
	arrReplace=['unit','coords','player','distance','sent','duration','arrival','origin','destination','destinationxy', 'return', 'incid', 'date'];
	arrHead=['وحدة','وقت الارسال','المدة','إعادة تسمية في'];
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
	arrValues[11]= getURLParam('id');
	arrValues[1]=arrAttack[2];
	arrValues[7]=arrAttack[0];
	arrValues[8]=arrTarget[0];
	arrValues[9]=arrTarget[2];
	arrValues[6]=typeof(arrRows[intRows-3].cells[1].innerText)=='undefined'?arrRows[intRows-3].cells[1].textContent:arrRows[intRows-3].cells[1].innerText;
	dtArrival=fnDate(arrValues[6]);
	arrValues[6]=fnDateFormat(dtArrival);
        renDate=document.getElementById('serverDate').childNodes[0].nodeValue;
        renTime=document.getElementById('serverTime').childNodes[0].nodeValue;
        arrValues[12] = renTime + ' ' + renDate;
	arrArrivalIn=myGetInner(arrRows[intRows-2].cells[1]).match(/\d+/ig);
	msecsArrivalIn=(arrArrivalIn[0]*Const3600+arrArrivalIn[1]*Const60+arrArrivalIn[2]*1)*1000;
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
	mySetInner(myInsCell(0),'المسافه:').colSpan=2;
	mySetInner(myInsCell(1),arrValues[3]+'حقول').colSpan=2;
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
		secsDuration=Math.round([9,10,11,18,22,30,35,0][theIndex]*Const60*dblDistance/Speed);
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
			mySetInner(myInsCell(0),arrUnitNames[theIndex]);
			mySetInner(myInsCell(1),secsDiff<Const60&&'الان فقط'||
			'قبل' + secsDiff<Const3600&&Math.floor(secsDiff/Const60)+' min'||
			'قبل' + myTime(secsDiff));
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
}
labelAttack();
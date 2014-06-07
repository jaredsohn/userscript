// ==UserScript==
// @name Sortier
// @description	Sortierfunktion für Übersichten
// @author  SlowTarget
// @include	http://*.die-staemme.de/game.php?*screen=overview_villages*
// ==/UserScript==

if(typeof(eleDoc)=='undefined'){var eleDoc,arrTable,arrSortBys,eleTable;fnSetup();}
function fnStatus(strMessage){
	return;
/*	eleDoc.body.appendChild(eleDoc.createElement('br'));
	eleDoc.body.appendChild(eleDoc.createTextNode(strMessage));*/
}
function fnSetup(){
	var arrSort=['asc','desc'];
	function fnAddField(varValue,blNumeric){
		idx3++;
		if(varValue){
			if(blNumeric){
				varValue=varValue.replace('.','');
				varValue=parseInt(varValue,10);
			}
			arrRow[idx3]=varValue;
		}else{
			arrRow[idx3]=blNumeric?0:'';
		}
	}
	function fnAddSortLinks(eleRef,intIndex,strBefore,strAfter){
		if(strBefore)fnText(eleRef,strBefore);
		eleSortDiv=eleDoc.createElement('div');
		eleSortDiv.className='sort';
		arrSort.forEach(
			function(strSort){
				var eleLink=eleDoc.createElement('a');
                                eleLink.addEventListener("click", fnClick, true);
                                eleLink.addEventListener("mouseover", fnHover, true);
                                eleLink.addEventListener("mouseout", fnOut, true);
				eleLink.className=strSort;
				eleLink.href='javascript:';
				eleLink.name='SORT_'+intIndex+'_'+strSort;
				var eleDiv=eleDoc.createElement('div');
				eleDiv.className=strSort+' EventInactive';
				eleDiv.name='SORT_'+intIndex+'_'+strSort;
				eleLink.appendChild(eleDiv);
				eleSortDiv.appendChild(eleLink);
			}
		);
		eleRef.appendChild(eleSortDiv);
		if(strAfter)fnText(eleRef,strAfter);
	}
	eleDoc=document;
	if(window.frames.length>0)eleDoc=window.main.document;
	var blAddRemove=false;
	var blAttack=false;
	fnStatus('start');
	
	/*in edit/remove villages mode there is no form for villages/page with the table it contains... */
	if(eleDoc.location.search.search('&edit_group=')!=-1){
		intTableOffset=1;
		blAddRemove=true;
	}else if(eleDoc.forms.length>0){
		/*there is a # per page form on this overview...*/
		intTableOffset=2;
	}else{
		intTableOffset=1;
	}

	arrSortBys=[[1,1]];
	var arrColumns=[];
/*	
supports the following...

	combined overview
	production overview
	buildings overview
	commands overview
	incomings overview
	
	in group add/remove villages mode - including sorting the checkboxes... : &edit_group=603

*/
	if(eleDoc.location.search.search('screen=overview_villages&mode=combined')!=-1){
		/* combined */
		arrColumns=[
				[0,/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,[[false],[true,' ('],[true,'|'],[true,') K']]],
				[6,/(\d+)\s\((\d+)\)/,[[true],[true,'(',')']]],
				[7,/(\d+)/,[[true]]],
				[8,/(\d+)/,[[true]]],
				[9,/(\d+)/,[[true]]],
				[10,/(\d+)/,[[true]]],
				[11,/(\d+)/,[[true]]],
				[12,/(\d+)/,[[true]]],
				[13,/(\d+)/,[[true]]],
				[14,/(\d+)/,[[true]]],
				[15,/(\d+)/,[[true]]],
				[16,/(\d+)\/(\d+)/,[[true],[true,'/']]]
				];
				/*'*/
	}else if(eleDoc.location.search.search('screen=overview_villages&mode=prod')!=-1){
		/*' test */
/*				FUBAR (612|624) K66  	10.084	98.393 111.353 52.638 	400000	8912/24000	tomorrow at 00:50*/
		arrColumns=[
				[0,/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,[[false],[true,' ('],[true,'|'],[true,') K']]],
				[1,/\b(\d*\.?\d+)\b/,[[true]]],
				[2,/\b(\d*\.?\d+)\s\b(\d*\.?\d+)\s\b(\d*\.?\d+)/,[[true],[true],[true]]],
				[3,/(\d+)/,[[true]]],
				[4,/(\d+)\/(\d+)/,[[true],[true,'/']]],
				[5,/(.*)/,[[false]]]
				];
		/*arrColumns=[
				[0,/(\d+)/,[[true]]],
				[1,/(\d+)/,[[true]]],
				[2,/(.*)/,[[false]]],
				[4,/^(\d+)\s\((\d+)\)$/,[[true],[true,' (',')']]],
		];'*/
	}else if(eleDoc.location.search.search('screen=overview_villages&mode=commands')!=-1){
				/*add some new columns? id & type ... 
				  split attack name by ( and | ... or perhaps just space... 
				  have as many sorts as there are splits... maybe'
Command	                                               Village of origin	arrival time	sp sw ax spy lc hc ra ca no								
Attack on Built To Punish an Enslave (607|644) K66  	FUBAR (606|645) K66	today at 02:03	0	100	0	0	0	0	0	0	1
				for now forget about sorting by arrival time - except as text...
				
				link in column zero is ... http://en10.tribalwars.net/game.php?village=46929&screen=info_command&id=32269408&type=own
				blAttack ===
					new column 0 = id
					new column 1 = type
				*/
		blAttack=true;
		arrColumns=[
			[0,/(\d+)/,[[true]]],
			[1,/(.*)/,[[false]]],
			[2,/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,[[false],[true,' ('],[true,'|'],[true,') K']]],
			[3,/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,[[false],[true,' ('],[true,'|'],[true,') K']]],
			[4,/(.*)/,[[false]]],
			[5,/(\d+)/,[[true]]],
			[6,/(\d+)/,[[true]]],
			[7,/(\d+)/,[[true]]],
			[8,/(\d+)/,[[true]]],
			[9,/(\d+)/,[[true]]],
			[10,/(\d+)/,[[true]]],
			[11,/(\d+)/,[[true]]],
			[12,/(\d+)/,[[true]]],
			[13,/(\d+)/,[[true]]]
		];
		/*'*/
	}else if(eleDoc.location.search.search('screen=overview_villages&mode=incomings')!=-1){
					/*Command	Destination	Origin	arrival time	Arrival in*/
		blAttack=true;
		arrColumns=[
				[0,/(\d+)/,[[true]]],
				[1,/(.*)/,[[false]]],
				[2,/(.*?)\s(\((\d+)\|(\d+)\))?(\sK(\d+))?/,[[false],[true,' ('],[true,'|'],[true,') K']]],
				[3,/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,[[false],[true,' ('],[true,'|'],[true,') K']]],
				[4,/(.*)/,[[false]]],
				[5,/(.*)/,[[false]]],
				[6,/(.*)/,[[false]]]
			];
		/*'*/					
	}else if(eleDoc.location.search.search('&screen=overview_villages&mode=buildings')!=-1){
		arrColumns=[
				[0,/(.*?)\s\((\d+)\|(\d+)\)\sK(\d+)/,[[false],[true,' ('],[true,'|'],[true,') K']]],
				[1,/(\d+)/,[[true]]],
				[2,/(\d+)/,[[true]]],
				[3,/(\d+)/,[[true]]],
				[4,/(\d+)/,[[true]]],
				[5,/(\d+)/,[[true]]],
				[6,/(\d+)/,[[true]]],
				[7,/(\d+)/,[[true]]],
				[8,/(\d+)/,[[true]]],
				[9,/(\d+)/,[[true]]],
				[10,/(\d+)/,[[true]]],
				[11,/(\d+)/,[[true]]],
				[12,/(\d+)/,[[true]]],
				[13,/(\d+)/,[[true]]],
				[14,/(\d+)/,[[true]]],
				[15,/(\d+)/,[[true]]],
				[16,/(\d+)/,[[true]]],
				[17,/(\.+)/,[[true]]]
			];
			/*'*/
	}
/*' all fairly generic now...*/
	arrTables=eleDoc.getElementsByTagName('table');
	eleTable=arrTables[arrTables.length-intTableOffset];
	arrTable=[];
	var arrRow,idx1,idx2,idx3,strString,arrValue,eleCell;
	for(idx1=1;idx1<eleTable.rows.length;idx1++){
		arrRow=[];
		idx3=1;
		if(blAddRemove){
			eleCell=eleTable.rows[idx1].cells[0];
			fnAddField(eleCell.getElementsByTagName('input')[1].checked,false);
		}
		if(blAttack){
			eleCell=eleTable.rows[idx1].cells[0];
			strSearch=eleCell.getElementsByTagName('a')[0].href;
			strAttackID=strSearch.match(/\&id=(\d+)\b/i)[1];
			strType=strSearch.match(/\&type=(\w+)\b/i)[1];
			
			eleCell=eleTable.rows[idx1].insertCell(0);
			eleCell.appendChild(eleDoc.createTextNode(strType));

			eleCell=eleTable.rows[idx1].insertCell(0);
			eleCell.appendChild(eleDoc.createTextNode(strAttackID));
		}
		arrRow[0]=eleTable.rows[idx1].cloneNode(true);
		arrRow[1]=idx1;
		for(idx2=0;idx2<eleTable.rows[idx1].cells.length;idx2++){
			eleCell=eleTable.rows[idx1].cells[idx2];
			strString=typeof(eleCell.innerText)=='undefined'?eleCell.textContent:eleCell.innerText;
			arrColumns.forEach(
				function(arrColumn){
					if(arrColumn[0]==idx2){
						var arrValue=strString.match(arrColumn[1]);
						arrColumn[2].forEach(
							function(arrField,idx4){
								if(arrValue){varValue=arrValue[idx4+1];}else{varValue=null;}
								fnAddField(varValue,arrField[0]);
							}
						);
					}
				}
			);
		}
		arrTable.push(arrRow);
	}
	if(typeof(blDebug)!="undefined"&&blDebug){
		tmpTable=eleDoc.createElement('table');
		tmpRow=tmpTable.insertRow(0);
		for(j=1;j<arrTable[0].length;j++){
			tmpTH=eleDoc.createElement('th');
			tmpTH.appendChild(eleDoc.createTextNode(j));
			tmpRow.appendChild(tmpTH);
		}
		for(i=0;i<arrTable.length;i++){
			tmpRow=tmpTable.insertRow(-1);
			for(j=1;j<arrTable[i].length;j++){
				tmpCell=tmpRow.insertCell(-1);
				tmpCell.appendChild(eleDoc.createTextNode(arrTable[i][j]));
			}
		}
		eleDoc.body.appendChild(tmpTable);
	}
	eleCSS=document.styleSheets[0];
	eleCSS.insertRule("div.clear{clear:both;vertical-align:bottom;}",0);
	eleCSS.insertRule("div.text{float:left;}",1);
	eleCSS.insertRule("div.sort{float:left;width:0.7em}",1);
	eleCSS.insertRule("div.asc{width:0;height:0;line-height:0;margin-top:.0em;border-top:0px solid;border-right:.3em solid rgb(222,211,185);border-bottom:.8em solid;border-left:.3em solid rgb(222,211,185);float:left;margin-left:0px;}",2);
	eleCSS.insertRule("div.desc{width:0;height:0;margin-top:.2em;line-height:0;border-top:.8em solid ;border-left:.3em solid rgb(222,211,185);border-right:.3em solid rgb(222,211,185);border-bottom:0px solid;float:left;}",3);
	eleCSS.insertRule("div.EventHover{border-top-color:#0082BE;border-bottom-color:#0082BE;}",4);
	eleCSS.insertRule("div.EventActive{border-top-color:#C00;border-bottom-color:#C00;}",5);
	eleCSS.insertRule("div.EventInactive{border-top-color:#fff;border-bottom-color:#fff;}",6);

	idx3=1;
	var idx1,idx2,idx3,eleClearDiv,eleSortDiv;
	if(blAttack){		
		eleCell=eleTable.rows[0].insertCell(0);
		eleTH=eleDoc.createElement('th');
		eleTH.appendChild(eleDoc.createTextNode('type'));
		eleCell.appendChild(eleTH);
		
		eleCell=eleTable.rows[0].insertCell(0);
		eleTH=eleDoc.createElement('th');
		eleTH.appendChild(eleDoc.createTextNode('Attack ID'));
		eleCell.appendChild(eleTH);
	}
			
	var colHead=eleTable.getElementsByTagName('th');

	for(idx1=0;idx1<colHead.length;idx1++){
		var arrCell=arrColumns.filter(function(arrColumn){return idx1==arrColumn[0];});
		if(arrCell.length>0){
			var colHeadContent=colHead[idx1].childNodes;
			fnStatus('th:'+idx1+'content:'+colHeadContent.length);
			eleClearDiv=eleDoc.createElement('div');
			eleClearDiv.className='clear';
			if(blAddRemove&&idx1==0){
				idx3++;
				fnAddSortLinks(eleClearDiv,idx3);
			}
			var eleTextDiv=eleDoc.createElement('div');
			eleTextDiv.className='text';
			for(idx2=0;idx2<colHeadContent.length;idx2++){
				eleTextDiv.appendChild(colHeadContent[idx2]);
			}
			eleClearDiv.appendChild(eleTextDiv);

			arrCell.forEach(
				function(arrColumn){
					arrColumn[2].forEach(
						function(arrField,idx4){
							idx3++;
							fnAddSortLinks(eleClearDiv,idx3,arrField[1],arrField[2]);
						}
					);
				}
			);
			colHead[idx1].appendChild(eleClearDiv);								
		}
	}
	
	fnStatus('links updated');
}
function fnText(eleRef,strText){
	var eleTextDiv=eleDoc.createElement('div');
	eleTextDiv.className='text';
	eleTextDiv.appendChild(eleDoc.createTextNode(strText));
	eleRef.appendChild(eleTextDiv);
}
function fnEvent(objEvent){
	var objElement;
	var strType='';
	try{objElement=objEvent.target;strType='target';}
	catch(objError){
		try{objElement=objEvent.srcElement;strType='srcElement';}
		catch(objError){objEvent=event;objElement=event.srcElement;strType='event';}
	}
	var strName=objElement.name;
	fnStatus(strType+' '+objEvent.type+" event on "+objElement.nodeType+':'+objElement.tagName+objElement.name);
	return objElement;
}
function fnEventClass(objDiv,strClass,blOverrideActive){
	if(!objDiv.className.match(/\bEventActive\b/)||blOverrideActive){
		objDiv.className=objDiv.className.replace(/\bEvent\w+?\b/,' '+strClass);
	}
	/*'*/
}
function fnHover(objEvent){
	objDiv=fnEvent(objEvent);
	fnEventClass(objDiv,'EventHover',false);
	fnStatus('hover');
	return true;
}
function fnOut(objEvent){
	objDiv=fnEvent(objEvent);
	fnEventClass(objDiv,'EventInactive',false);

	fnStatus('out');

	return true;
}
function fnClick(objEvent){
	objDiv=fnEvent(objEvent);
	if(objDiv.className.match(/\bEventActive\b/)){
		return;
	}
	colDiv=eleTable.rows[0].getElementsByTagName('div');
	for(idx1=0;idx1<colDiv.length;idx1++){
		if(colDiv[idx1].className.match(/\bEventActive\b/)){
			fnEventClass(colDiv[idx1],'EventInactive',true);
		}
	}
	fnEventClass(objDiv,'EventActive',true);
	
	var intSort,intSortId;
	if(objDiv.name.match(/_desc$/)){
		intSort=-1;	
	}else{
		intSort=1;
	}
	intSortId=parseInt(objDiv.name.match(/\d+/)[0],10);
	arrSortBys=arrSortBys.filter(function(arrSortBy){return arrSortBy[0]!=intSortId;});
	arrSortBys.unshift([intSortId,intSort]);
	fnStatus('click:'+objDiv.name+':'+intSort+':'+intSortId+':'+arrSortBys.length);
	arrTable.sort(
		function(arrRowA,arrRowB){
			for(idx1=0;idx1<arrSortBys.length;idx1++){
				intSortId=arrSortBys[idx1][0];
				intSort=arrSortBys[idx1][1];
			
				if(arrRowA[intSortId]<arrRowB[intSortId]){
					return intSort*-1;
				}else{
					if(arrRowA[intSortId]>arrRowB[intSortId]){
						return intSort;
					}
				}
			}
		}
	);
	for(idx1=eleTable.rows.length-1;idx1>0;idx1--){
		eleTable.deleteRow(idx1);
	}
	arrTable.forEach(function(arrRow,idx1){eleTable.appendChild(arrRow[0]);})
	return true;
}
// ==UserScript==
// @name           Dossier Polymtl étudiant
// @namespace      Johnny Boy
// @description    endhance le dossier étudiant
// @include        https://www4.polymtl.ca/servlet/*
// @include        https://www4.polymtl.ca/poly/poly.html
// ==/UserScript==
var	myRe = /[/].*[/](.*)/;
ww=myRe.exec(window.location.pathname)[1];
if(ww=="poly.html"){thisForm = document.forms[0];
	i=0;
	while ("input"!=thisForm.elements[i].localName || "password"!=thisForm.elements[i].type)
	  {i++;}
	thisForm.elements[i].type="text";
}
else if(ww=="PresentationResultatsTrimServlet"){
	var head, style;
	 head = document.getElementsByTagName('head')[0];
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '@media screen { .moy_note{text-align: center} table *{font:medium serif;} strong {font-weight: bold;}} @media print{.moy_note{display: none;}}';
		head.appendChild(style);
	allTR = document.evaluate(
	'//table[3]/tbody/tr',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	var note=[];
	var total=0;
	var cred=0;
	var ses=-1;
	var thisTot=[];
	var thisCred=[];
	var empl=[];
	try {
		for ( var i=0 ; i < allTR.snapshotLength; i++ )
		{
			var thisTR=allTR.snapshotItem(i);
			if(thisTR.childNodes[1].firstChild.nodeName=='#text'){
				ses=ses+0.5;
				if(Math.floor(ses)==ses){
					thisTot[ses]=0;
					thisCred[ses]=0;
				}

				else{
					if(ses==-.5){
						thisTR.childNodes[1].innerHTML="Moyenne";
						empl[(ses+0.5)]=thisTR.childNodes[2];
						thisTR.childNodes[1].className="moy_note";
						thisTR.childNodes[2].className="moy_note";
					}
				}
			}

			if (thisTR.childNodes[1].firstChild.nodeName=='FONT'){
				var credits= Number(thisTR.childNodes[3].textContent);
				switch(thisTR.childNodes[4].textContent) {
				case 'A*':valeur=4;break;
				case 'A ':valeur=4;break;
				case 'B+':valeur=3.5;break;
				case 'B ':valeur=3;break;
				case 'C+':valeur=2.5;break;
				case 'C ':valeur=2;break;
				case 'D+':valeur=1.5;break;
				case 'D ':valeur=1;break;
				case 'F ':valeur=0;break;
				default:valeur=false;break;
				}
				if(valeur!==false){
					thisTot[ses]=thisTot[ses]+credits*valeur;
					thisCred[ses]=thisCred[ses]+credits;
					total=total+credits*valeur;
					cred=cred+credits;
				}
			}
		}


	
		empl[0].innerHTML=Math.round(thisTot[0]/thisCred[0]*1000)/1000;

		
	}
	catch (e) {
		dump( 'Error: ' + e );
	}


}
else if(ww=='ValidationServlet' || ww=='RetourServlet'){

	thisForm = document.forms[0];
	i=0;
	while ("select"!=thisForm.elements[i].localName)
	  {i++;}
	var list=thisForm.elements[i].options

	var thisSession = list[0].value

	switch(thisSession[4]){
	case "1":
	nextSession=thisSession[0]+thisSession[1]+thisSession[2]+thisSession[3]+"2";
	break;
	case "2":
	nextSession=thisSession[0]+thisSession[1]+thisSession[2]+thisSession[3]+"3";
	break;
	case "3":
	var yy = thisSession.charCodeAt(3)+1;
	if(yy==58){
	nextSession=thisSession[0]+thisSession[1]+"101";
	}
	else
	nextSession=thisSession[0]+thisSession[1]+thisSession[2]+String.fromCharCode(yy)+"1";
	break;
	}

	allBodies = document.evaluate(
		'//form/table/tbody/tr/td/table/tbody',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
		thisTbody= allBodies.snapshotItem(0);

	thisRow=thisTbody.insertRow(4);
	cell1=thisRow.insertCell(0);
	cell1.height="33";
	cell1.innerHTML='<font size="+1"><input id="viewNext" "type="button" value="  Aller  " onclick="document.forms[0].trimestre.value='+nextSession+';onClickHorPers(document.forms[0])" name="viewNext"/></font>';
	cell2=thisRow.insertCell(1);
	cell2.height="33";
	cell2.nowrap="";
	cell2.innerHTML='<font size="+1">Voir l\'horaire du semestre prochain</font>';
	cell3=thisRow.insertCell(2);
	cell3.width="3";
	cell4=thisRow.insertCell(3);
	cell4.height="33";
	cell4.nowrap="";
	cell5=thisRow.insertCell(4);
	cell5.width="18%";
}
else if (ww=='ChoixCoursServlet'){
	var list=''
	for(var i=0;i<10;i++){
		list=list+'+'+document.forms[0].elements[i*5].value;
	}

	thisRow=document.forms[0].getElementsByTagName('center')[0].firstChild.firstChild.firstChild;
	row=thisRow.insertCell(1);
	lien = document.createElement('a');
	lien.innerHTML="Voir les horaires possibles sur le site de l'AEP";
	lien.href='http://horaires.aep.polymtl.ca/make_form2.php?courses='+list;
	lien.target="_blank";

	row.appendChild(lien);
}
else if (ww=='PresentationHorairePersServlet'){
	var head, style;

	 head = document.getElementsByTagName('head')[0];
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '@media print{.print,.print *{visibility:hidden;height:0; display: block;margin:0;} .printTitle, .printTitle *{font-size:11pt;} .printTable *{margin:0px;padding:2px;font-size:11pt;border-collapse:separate;border-spacing:1px;}}';
		head.appendChild(style);
		
	Center = document.evaluate(
	'//center',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
	Childs=Center.snapshotItem(0).childNodes;
	Childs.item(0).className='print';
	Childs.item(1).className='print';
	Childs.item(2).className='printTitle';
	Childs.item(4).className='print';
	Childs.item(5).className='print';
	Childs.item(6).className='print';
	Childs.item(7).className='print';
	Childs.item(8).className='printTable';
	Childs.item(9).className='print';
	Childs.item(10).className='printTitle';
	Childs.item(12).className='printTable';
	Childs.item(13).className='print';



	list='';
	group=''
	allTR = document.evaluate(
	'//center/table[2]/tbody/tr/td/table',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);
	rows=allTR.snapshotItem(0).rows;
	nbr=rows.length-2
	for(var i=1;i<=nbr;i++){
	cells=rows[i].cells;
	list=list+cells[2].textContent.slice(0,2)+'-'+cells[3].textContent.slice(0,2)+'+';
	group=group+cells[0].textContent.replace(/^\s+|\s+$/g,"")+'+';
	}
	thisRow=document.getElementsByTagName('table')[1].lastChild.firstChild;
	row=thisRow.insertCell(1);
	lien = document.createElement('a');
	lien.innerHTML="Voir les horaires possibles sur le site de l'AEP";
	lien.href='http://horaires.aep.polymtl.ca/make_form2.php?courses='+group+'&group='+list;
	lien.target="_blank";
	lien.className='print';
	row.appendChild(lien);
}
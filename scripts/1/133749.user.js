// ==UserScript==
// @name           Sycamore Gradebook Pro
// @include       *sycamoreschools.org/webapps/portal/frameset.jsp*
// ==/UserScript==

function removeDuplicates(typesarray){
	var wtypes = typesarray;
	var ftypes = new Array(); 
	for (i=0;i<wtypes.length;i++){
		duplicates=0;
		
		for (y=0;y<ftypes.length;y++){
			if (wtypes[i]==ftypes[y]){
				duplicates++;
			}
		}
		
		if (duplicates==0){
			ftypes[ftypes.length]=wtypes[i];
		}
	}
	return ftypes;
}

function showGrades(){
		var contframe = document.getElementsByName('content')[0];
		var navframe = document.getElementById('nav');	
		var gradeframe = document.getElementById('grades');
		var gradebody = gradeframe.contentDocument.getElementsByTagName('body')[0];
		gradebody.style.fontFamily=navfont;
		gradebody.style.color=navbgcolor;
		
		if (gradebody.hasChildNodes()){
		  while (gradebody.childNodes.length >= 1){
				gradebody.removeChild(gradebody.firstChild);} 
		}
	
		gradetable=contframe.contentDocument.getElementsByClassName('container')[0].getElementsByTagName('table')[0];
		data = gradetable.getElementsByClassName('itemGrades');
		
		var gradeinfo=contframe.contentDocument.getElementsByClassName('container')[0].getElementsByTagName('table')[0].getElementsByTagName('table')[0].getElementsByTagName('tr')[1].getElementsByTagName('th')[3].getElementsByTagName('span')[0].innerHTML;
		var offgrade;
		var offletter;
		if (gradeinfo.indexOf('Current Grade Unavailable')>0){
			offgrade = 'Unavailable';
			offletter = 'N/A';
		}
		else {
			gradeinfo=gradeinfo.substring(gradeinfo.indexOf(">")+1,gradeinfo.indexOf("]"));
			while (gradeinfo.substring(0,1)==" " || gradeinfo.substring(0,1)=="\n"){
				gradeinfo=gradeinfo.slice(1);}
			
			offgrade = gradeinfo.substring(gradeinfo.indexOf(':')+2,gradeinfo.indexOf('[')-1);
			offletter = gradeinfo.substring(gradeinfo.indexOf('[')+1,gradeinfo.length);
		}
		
		var gtab=document.createElement('table');
		gtab.setAttribute('id','scoreboard');
		gtab.setAttribute('border','0');
	
		var gtbo=document.createElement('tbody');
		row1 = document.createElement('tr');
		cell1 = document.createElement('th');
		cell1.setAttribute('colspan','2');
		cell1.setAttribute('style','background-color:#DCDCDC');
		cont1=document.createTextNode("Official Grade");
		cell2 = document.createElement('th');
		cell2.setAttribute('width','40');
		cell3 = document.createElement('th');
		cell3.setAttribute('colspan','2');
		cell3.setAttribute('style','background-color:#DCDCDC');
		cont3=document.createTextNode("Hypothetical Grade");
		cell1.appendChild(cont1);
		row1.appendChild(cell1);
		row1.appendChild(cell2);
		cell3.appendChild(cont3);
		row1.appendChild(cell3);
		gtbo.appendChild(row1);
	
		row2 = document.createElement('tr');
		cell1 = document.createElement('th');
		cont1=document.createTextNode(offletter);
		cell2 = document.createElement('th');
		cont2=document.createTextNode(offgrade);
		cell3 = document.createElement('th');
		cell3.setAttribute('width','40');
		cell4 = document.createElement('th');
		cont4=document.createTextNode(offletter);
		cell4.setAttribute('id','hypletter');
		cell5 = document.createElement('th');
		cell5.setAttribute('id','hypgrade');
		cont5=document.createTextNode(offgrade);
	
		cell1.appendChild(cont1);
		row2.appendChild(cell1);
		cell2.appendChild(cont2);
		row2.appendChild(cell2);
		row2.appendChild(cell3);
		cell4.appendChild(cont4);
		row2.appendChild(cell4);
		cell5.appendChild(cont5);
		row2.appendChild(cell5);
		gtbo.appendChild(row2);
		
		gtab.appendChild(gtbo);
		gradebody.appendChild(gtab);
		
		assts = new Array();
		types = new Array();
		ptse = new Array();
		ptsp  = new Array();
		if (data.length==0){
			assts[0]="Assignment";
			types[0]="Type";
			ptse[0]='-';
			ptsp[0]='-';
		}
		else{		
			for (i=0;i<data.length;i+=4) {
				var asst = data[i].innerHTML;
				var type = data[i+1].innerHTML;
				var grade = data[i+2].innerHTML;
				var pte = grade;
				var ptp = grade;
				
				asst = asst.substring(asst.indexOf('>')+1,asst.length);
				asst = asst.substring(0,asst.indexOf('<'));
				while (asst.substring(0,1)==" " || asst.substring(0,1)=="\n"){
					asst=asst.slice(1);
				}
				
				type = type.substring(type.indexOf('>')+1,type.length);
				type = type.substring(0,type.indexOf('<'));
				while (type.substring(0,1)==" " ||type.substring(0,1)=="\n"){
					type=type.slice(1);
				}
				
				pte = pte.substring(pte.indexOf('>')+1,pte.length);
				pte = pte.substring(0,pte.indexOf('<'));
				while (pte.substring(0,1)==" " ||pte.substring(0,1)=="\n"){
					pte=pte.slice(1);
				}
				
				ptp = ptp.substring(ptp.indexOf('>')+1,ptp.length);
				ptp = ptp.substring(ptp.indexOf('>')+1,ptp.length);
				ptp = ptp.substring(ptp.indexOf('>')+1,ptp.length);
				ptp = ptp.substring(0,ptp.indexOf('<'));
				while (ptp.substring(0,1)==" " ||ptp.substring(0,1)=="\n"){
					ptp=ptp.slice(1);
				}
					
				assts[i/4]=asst;
				types[i/4]=type;	
				ptse[i/4]=pte;
				ptsp[i/4]=ptp;
				
			}
		}
		
		var stypes=removeDuplicates(types);
		
		row=new Array();
		cell=new Array();
		
		var row_num=assts.length;
		var cell_num=4;
		
		var tab=document.createElement('table');
		tab.setAttribute('id','gradesheet');

		var tbo=document.createElement('tbody');
		
		titlerow = document.createElement('tr');
		cell1 = document.createElement('th');
		cell1.setAttribute('width',parseInt(asstwidth)+18)
		cont1=document.createTextNode('Assignment');
		
		cell2 = document.createElement('th');
		cell2.setAttribute('width',parseInt(typewidth)+2)
		cont2=document.createTextNode('Type');

		cell3 = document.createElement('th');
		cell3.setAttribute('width',parseInt(pewidth)+1)
		cont3=document.createTextNode('Points');
		
		cell4 = document.createElement('th');
		cell4.setAttribute('width',parseInt(ppwidth)+4);
		cont4=document.createTextNode('Out Of');
		cell1.appendChild(cont1);
		titlerow.appendChild(cell1);
		cell2.appendChild(cont2);
		titlerow.appendChild(cell2);
		cell3.appendChild(cont3);
		titlerow.appendChild(cell3);
		cell4.appendChild(cont4);
		titlerow.appendChild(cell4);
		titlerow.style.border = tabwidth+' solid '+selectedcolor;
		titlerow.style.display='table';

		tbo.appendChild(titlerow);
		
		for(c=0;c<row_num;c++){
			row[c]=document.createElement('tr');
			
			for(k=0;k<cell_num;k++) {
				cell[k]=document.createElement('td');
				var cont;
				if (k==0){
					cell[k].setAttribute('width',asstwidth);
					cont=document.createElement('input');
					cont.setAttribute('value',assts[c].replace(/&amp;/g,'&'));
					cont.setAttribute('size', '30');
		  			cont.setAttribute('maxlength', '40'); 
					cont.addEventListener('keydown', (function() {
							return function() {if (event.keyCode==13){recalc(stypes,weights);}}
					})());
					cont.addEventListener('blur', (function() {
							return function() {recalc(stypes,weights);}
					})());}
				else if (k==1){
					cell[k].setAttribute('width',typewidth);
					cont=document.createElement('select');
					cont.setAttribute('style','width:'+typewidth);
					cont.addEventListener('change', (function() {
							return function() {
								this.parentNode.parentNode.getElementsByClassName('pointe')[0].setAttribute('title',this.value);
								this.parentNode.parentNode.getElementsByClassName('pointp')[0].setAttribute('title',this.value);
								recalc(stypes,weights);
							}
					})());
					for (w=0;w<stypes.length;w++){
						opt=document.createElement('option');
						opt.setAttribute('value',stypes[w]);
						opt.innerHTML=stypes[w].replace(/&amp;/g,'&');
						if (stypes[w]==types[c]){opt.setAttribute('selected','selected');}
						cont.appendChild(opt);
					}
					row[c].setAttribute('class',types[c]);
					cont.setAttribute('size','1');  }			
				else if (k==2){
					cell[k].setAttribute('width',pewidth);
					cont=document.createElement('input');
					cont.setAttribute('class','pointe');
					cont.setAttribute('title',row[c].className);
					cont.setAttribute('value',ptse[c]);
					cont.setAttribute('size', '4');
		 			cont.setAttribute('maxlength', '6');
					cont.addEventListener('keydown', (function() {
							return function() {if (event.keyCode==13){recalc(stypes,weights);}}
					})());
					cont.addEventListener('blur', (function() {
							return function() {recalc(stypes,weights);}
					})());}					
				else if (k==3){
					cell[k].setAttribute('width',ppwidth);
					cont=document.createElement('input');
					cont.setAttribute('class','pointp');
					cont.setAttribute('title',row[c].className);
					cont.setAttribute('value',ptsp[c]);
					cont.setAttribute('size', '4');
		 			cont.setAttribute('maxlength', '6'); 
					cont.addEventListener('keydown', (function() {
							return function() {if (event.keyCode==13){recalc(stypes,weights);}}
					})());
					cont.addEventListener('blur', (function() {
							return function() {recalc(stypes,weights);}
					})());
				}
				cell[k].appendChild(cont);
				row[c].appendChild(cell[k]);				
			}
			row[c].style.border = tabwidth+' solid '+selectedcolor;
			row[c].style.borderTopWidth='0px'
			if (c!=row_num-1){row[c].style.borderBottomWidth='0px'}
			row[c].style.display='table';
			
			tbo.appendChild(row[c]);
		}
		
		tab.appendChild(tbo);
		gradebody.appendChild(tab);
		
		var weights = new Array();
		if (data.length==0){
			weights=[-1];
		}
		else{
			weights = determineWeights(stypes,offgrade);
		}
							
		recalc(stypes,weights);
		
		var btab=document.createElement('table');
		btab.setAttribute('id','buttons');
		btab.setAttribute('border','0');
		var btbo=document.createElement('tbody');
		var trow1=document.createElement('tr');
		var cell1=document.createElement('td');
		cell1.setAttribute('width','140');
		var cell2=document.createElement('td');
		
		var rowbtn = document.createElement('button');
		rowbtn.setAttribute('type','button');
		rowbtn.innerHTML="ADD ASSIGNMENT";
		rowbtn.addEventListener('click',(function() {
				return function() {
				addRow(stypes)			
			};
		})());
		
		var calcbtn = document.createElement('button');
		calcbtn.setAttribute('type','submit');
		calcbtn.setAttribute('id','calcbtn');
		calcbtn.innerHTML="RECALCULATE GRADE";
		calcbtn.addEventListener('click',(function() {
				return function() {
				console.log(weights)
				recalc(stypes,weights)			
			};
		})());
		
		cell1.appendChild(rowbtn);
		cell2.appendChild(calcbtn);
		trow1.appendChild(cell1);
		trow1.appendChild(cell2);
		btbo.appendChild(trow1);
		btab.appendChild(btbo);
		gradebody.appendChild(btab);
}

function isInteger(s) {
  return (s.toString().search(/^-?[0-9]+$/) == 0);
}

function isMatch(weights,_averages,_offgrade){
	var wgrade = 0;
	var averages = _averages;
	var offgrade = _offgrade;
	
	for (w=0;w<weights.length;w++){
		wgrade+=weights[w]*parseFloat(averages[w]);
	}
	
	if (Math.abs(parseFloat(wgrade)-parseFloat(offgrade))<=.01){
		return true;
	}
	else {return false;}

}

function determineWeights(_stypes,_offgrade){
	var averages = new Array();
	var gradeframe = document.getElementById('grades');
	var gradebody = gradeframe.contentDocument.getElementsByTagName('body')[0];
	var gradebox = gradeframe.contentDocument.getElementById('hypgrade');
	var letterbox = gradeframe.contentDocument.getElementById('hypletter');
	var elements_pe = gradeframe.contentDocument.getElementsByClassName('pointe');
	var elements_pp = gradeframe.contentDocument.getElementsByClassName('pointp');
	var titlenames = _stypes;
	var offgrade = _offgrade;
	
	averages = calcCatSubs(_stypes);

	if (averages.length==1 || averages.length>8 || Math.abs(offgrade-calcRawPerc())<.01){
		return [-1];
	}
	else if (averages.length==2){
		for (a=.05;a<1;a+=.05){
			if (isMatch([a,1-a],averages,offgrade)){return [a,1-a]}
		}	
	}
	else if (averages.length==3){
		for (a=.05;a<1;a+=.05){
			for (b=.05;b<1;b+=.05){
				if (isMatch([a,b,1-a-b],averages,offgrade)){return [a,b,1-a-b]}
		}}		
	}
	else if (averages.length==4){
		for (a=.05;a<1;a+=.05){
			for (b=.05;b<1;b+=.05){
				for (c=.05;c<1;c+=.05){
					if (isMatch([a,b,c,1-a-b-c],averages,offgrade)){return [a,b,c,1-a-b-c]}
		}}}
	}
	else if (averages.length==5){
		for (a=.05;a<1;a+=.05){
			for (b=.05;b<1;b+=.05){
				for (c=.05;c<1;c+=.05){
					for (d=.05;d<1;d+=.05){
						if (isMatch([a,b,c,d,1-a-b-c-d],averages,offgrade)){return [a,b,c,d,1-a-b-c-d]}
		}}}}
	}
	else if (averages.length == 6){
		for (a=.05;a<1;a+=.05){
			for (b=.05;b<1;b+=.05){
				for (c=.05;c<1;c+=.05){
					for (d=.05;d<1;d+=.05){
						for (e=.05;e<1;e+=.05){
							if (isMatch([a,b,c,d,e,1-a-b-c-d-e],averages,offgrade)){return [a,b,c,d,e,1-a-b-c-d-e]}
		}}}}}
	}
	else if (averages.length == 7){
		for (a=.05;a<1;a+=.05){
			for (b=.05;b<1;b+=.05){
				for (c=.05;c<1;c+=.05){
					for (d=.05;d<1;d+=.05){
						for (e=.05;e<1;e+=.05){
							for (f=.05;f<1;f+=.05){
								if (isMatch([a,b,c,d,e,f,1-a-b-c-d-e-f],averages,offgrade)){return [a,b,c,d,e,f,1-a-b-c-d-e-f]}
		}}}}}}
	}
	else if (averages.length == 8){
		for (a=.05;a<1;a+=.05){
			for (b=.05;b<1;b+=.05){
				for (c=.05;c<1;c+=.05){
					for (d=.05;d<1;d+=.05){
						for (e=.05;e<1;e+=.05){
							for (f=.05;f<1;f+=.05){
								for (g=.05;g<1;g+=.05){
								if (isMatch([a,b,c,d,e,f,g,1-a-b-c-d-e-f-g],averages,offgrade)){return [a,b,c,d,e,f,g,1-a-b-c-d-e-f-g]}
		}}}}}}}
	}
	return [-1]
		  
}

function calcRawPerc(){
	var elements_pe = document.getElementById('grades').contentDocument.getElementsByClassName('pointe');
	var elements_pp = document.getElementById('grades').contentDocument.getElementsByClassName('pointp');
	
	var sum_pe_=0.0;
	var sum_pp_=0.0;
	for (i=0;i<elements_pe.length;i++) {
		if (isInteger(parseInt(elements_pe[i].value)) && isInteger(parseInt(elements_pp[i].value))){
			sum_pe_+=parseFloat(elements_pe[i].value);
			sum_pp_+=parseFloat(elements_pp[i].value);
		}
		else if (elements_pe[i].value=='Missing' && isInteger(parseInt(elements_pp[i].value))){
			sum_pe_+=0;
			sum_pp_+=parseFloat(elements_pp[i].value);
		}
	}
	
	return parseFloat(sum_pe_/sum_pp_*100);
}

function calcCatPerc(_titlenames,weights){
	var elements_pe = document.getElementById('grades').contentDocument.getElementsByClassName('pointe');
	var elements_pp = document.getElementById('grades').contentDocument.getElementsByClassName('pointp');
	var averages = new Array();
	var titlenames=_titlenames;
	var percent=0;
	
	for (r=0;r<titlenames.length;r++){
		var sum_pe=0;
		var sum_pp=0;
		for (i=0;i<elements_pe.length;i++) {
			if (elements_pe[i].title==titlenames[r]){
				if (isInteger(parseInt(elements_pe[i].value)) && isInteger(parseInt(elements_pp[i].value))){
					sum_pe+=parseInt(elements_pe[i].value);
					sum_pp+=parseInt(elements_pp[i].value);
				}
				else if (elements_pe[i].value=='Missing' && isInteger(parseInt(elements_pp[i].value))){
					sum_pe+=0;
					sum_pp+=parseInt(elements_pp[i].value);
				}
			}
		}
		var subpercent = ((sum_pe/sum_pp)*100);
		if (subpercent>=0 || subpercent<0){averages[averages.length]=subpercent;}
		else {averages[averages.length]=-1}
	}

	var totalweight=0;
	for (i=0;i<weights.length;i++){
		if (averages[i]!=-1){
		  totalweight+=weights[i]
		}
	}

	for (i=0;i<weights.length;i++){
		if (averages[i]!=-1){
			percent+=weights[i]*averages[i];
		}
	}
	
	return parseFloat(percent/totalweight);
}

function calcCatSubs(_titlenames){
	var elements_pe = document.getElementById('grades').contentDocument.getElementsByClassName('pointe');
	var elements_pp = document.getElementById('grades').contentDocument.getElementsByClassName('pointp');
	var averages = new Array();
	var titlenames=_titlenames;
	var percent=0;
	
	for (r=0;r<titlenames.length;r++){
		var sum_pe=0;
		var sum_pp=0;
		for (i=0;i<elements_pe.length;i++) {
			if (elements_pe[i].title==titlenames[r]){
				if (isInteger(parseInt(elements_pe[i].value)) && isInteger(parseInt(elements_pp[i].value))){
					sum_pe+=parseInt(elements_pe[i].value);
					sum_pp+=parseInt(elements_pp[i].value);
				}
				else if (elements_pe[i].value=='Missing' && isInteger(parseInt(elements_pp[i].value))){
					sum_pe+=0;
					sum_pp+=parseInt(elements_pp[i].value);
				}
			}
		}
		var subpercent = ((sum_pe/sum_pp)*100);
		if (subpercent>=0 || subpercent<0){averages[averages.length]=subpercent;}
	}
	
	return averages;
}

function recalc(_stypes,_weights,offgrade){
	var gradeframe = document.getElementById('grades');
	var gradebody = gradeframe.contentDocument.getElementsByTagName('body')[0];
	var gradebox = gradeframe.contentDocument.getElementById('hypgrade');
	var letterbox = gradeframe.contentDocument.getElementById('hypletter');
	var elements_pe = gradeframe.contentDocument.getElementsByClassName('pointe');
	var elements_pp = gradeframe.contentDocument.getElementsByClassName('pointp');
	
	averages = calcCatSubs(_stypes);
	var weights = _weights;
	
	var percent=0.0;
	if (weights[0]==-1){
		percent=calcRawPerc();
	}
	else{
		percent=calcCatPerc(_stypes,weights);
	}
	
	gradebox.innerHTML = percent.toFixed(2);
	if (percent>=90){letterbox.innerHTML = "<strong>A</strong>";}
	else if (percent>=80 && percent<90){letterbox.innerHTML = "<strong>B</strong>";}
	else if (percent>=70 && percent<90){letterbox.innerHTML = "<strong>C</strong>";}
	else if (percent>=60 && percent<90){letterbox.innerHTML = "<strong>D</strong>";}
	else {letterbox.innerHTML = "<strong>F</strong>";}
}

function addRow(_stypes){
		//var contframe = document.getElementsByName('content')[0];
		var navframe = document.getElementById('nav');	
		var gradeframe = document.getElementById('grades');
		var gradebody = gradeframe.contentDocument.getElementsByTagName('body')[0];
		var tablebod = gradeframe.contentDocument.getElementById('gradesheet').getElementsByTagName('tbody')[0];
		var stypes = _stypes
		  var nrow = document.createElement('tr');
		  
		  var cell1 = document.createElement('td'); 
		  cell1.setAttribute('width',asstwidth);
		  var asst = document.createElement('input');            
		  asst.setAttribute('class', 'asst');
		  asst.setAttribute('value', 'Assignment');
		  asst.setAttribute('size', '30');
		  asst.setAttribute('maxlength', '40');       
		  cell1.appendChild(asst);
		  
		  var cell2 = document.createElement('td');
		  cell2.setAttribute('width',typewidth);
		  cont=document.createElement('select');
		  cont.setAttribute('style','width:'+typewidth);
		  cont.addEventListener('change', (function() {
			return function() {								
				this.parentNode.parentNode.getElementsByClassName('pointe')[0].setAttribute('title',this.value);
				this.parentNode.parentNode.getElementsByClassName('pointp')[0].setAttribute('title',this.value);
			}
		})());
		  for (w=0;w<stypes.length;w++){
			  opt=document.createElement('option');
			  opt.setAttribute('value',stypes[w]);
			  opt.innerHTML=stypes[w];
			  if (w==0){opt.setAttribute('selected','selected');}
			  cont.appendChild(opt);
		  }
		  nrow.setAttribute('class',stypes[0]);
		  cont.setAttribute('size','1');
		  cell2.appendChild(cont);
		  
		  var cell3 = document.createElement('td'); 
		  cell3.setAttribute('width',pewidth);
		  var pe = document.createElement('input');        
		  pe.setAttribute('class','pointe');
		  pe.setAttribute('title',stypes[0]);
		  pe.setAttribute('value','-');
		  pe.setAttribute('size','4');
		  pe.setAttribute('maxlength','6');   
		  cell3.appendChild(pe);
		  
		  var cell4 = document.createElement('td');
		  cell4.setAttribute('width',ppwidth);
		  var pp = document.createElement('input');        
		  pp.setAttribute('class', 'pointp');
		  pp.setAttribute('title',stypes[0]);
		  pp.setAttribute('value', '-');
		  pp.setAttribute('size', '4');
		  pp.setAttribute('maxlength', '6');         
		  cell4.appendChild(pp);
	  
		  nrow.appendChild(cell1);
		  nrow.appendChild(cell2);
		  nrow.appendChild(cell3);
		  nrow.appendChild(cell4);
		  
		nrow.style.border = tabwidth+' solid '+selectedcolor;
		nrow.style.borderTopWidth='0px'
		tablebod.lastChild.style.borderBottomWidth='0px'
		nrow.style.display='table';
	  
		 tablebod.appendChild(nrow);
}

function main(){
	var content=document.getElementsByTagName('frame')[1].contentDocument.getElementsByTagName('table')[1].getElementsByTagName('a');
	
	var contframe = document.getElementsByName('content')[0];
	var newframeset=document.createElement('frameset');
	newframeset.id='fs';
	newframeset.name='fs';
	var frameset = document.getElementById('bbFrameset');
	frameset.appendChild(newframeset);
	document.getElementById('bbFrameset').setAttribute('rows','0,0,*');
	
	var navframe = document.createElement('frame');
	navframe.id = 'nav';
	navframe.name = 'test';
	newframeset.appendChild(navframe);
	
	var gradeframe = document.createElement('frame');
	gradeframe.id='grades';
	gradeframe.name='gradebook';
	newframeset.appendChild(gradeframe);
	newframeset.setAttribute('cols','400,*');
	
	
	//var canvframe = document.createElement('frame');
	//var canv = document.createElement('canvas');
	//canv.setAttribute('id','canv');
	//console.log(canv)
	
	//newframeset.appendChild(canvframe);
	//canvframe.contentDocument.getElementsBy.appendChild(canv);

	//console.log(canvframe)
	//paintBackground(canvframe.contentDocument.getElementById('canv'));
	
	//newframeset.setAttribute('cols','390,100,*');
	
	//gradeframe.contentDocument.getElementsByTagName('body')[0].appendChild(canv);
	//newframeset.appendChild(gradeframe);
	//paintBackground(gradeframe.contentDocument.getElementsByTagName('body')[0]);
	spacer = document.createElement('div');
	spacer.style.height=document.getElementById('grades').height/3;
	gradeframe.contentDocument.getElementsByTagName('body')[0].appendChild(spacer);
	
	username = document.getElementsByName('nav')[0].contentDocument.getElementById('loggedInUserName').innerHTML;
	welcome = document.createElement('div');
	welcome.innerHTML='Welcome, '+username+'.';
	welcome.style.fontSize='250%';
	welcome.style.width=document.getElementById('grades').width*.9;

	welcome.align='center';
	welcome.style.color=navbgcolor;
	gradeframe.contentDocument.getElementsByTagName('body')[0].style.fontFamily=navfont;
	gradeframe.contentDocument.getElementsByTagName('body')[0].appendChild(welcome);
	
	var classnames = new Array();
	var teachernames = new Array();
	var grades = new Array();
	var letters = new Array();
	var links = new Array();
	
	for (i=0;i<content.length;i+=2) {
		var classname = content[i].innerHTML;
		var grade = content[i+1].innerHTML;
		var tlink = content[i+1].href;
		while (classname.substring(0,1)==" " || classname.substring(0,1)=="\n"){
			classname=classname.slice(1);
		}
	
		if (classname.substring(0,1)=="("){		
			classnames[i/2]=classname;
			grades[i/2]=grade;	
			links[i/2]=tlink;
		}
	}
	
	for (i=0;i<classnames.length;i++) {
		var classname = classnames[i];
		var grade = grades[i];
		classnames[i]=classname.substring(classname.indexOf(")")+2,classname.indexOf("-")-1);
		teachernames[i]=classname.substring(classname.indexOf("-")+2,classname.length);
		
		if (grade=="<i>no grade</i>"){
			grades[i]="no grade";
			letters[i]="--";}
		else{
			grades[i]=grade.substring(0,grade.indexOf("[")-1);
			letters[i]=grade.substring(grade.indexOf("[")+1,grade.indexOf("]"));
		}
	}
	
	row=new Array();
	cell=new Array();
	
	var row_num=grades.length;
	var cell_num=4;
	
	var tab=document.createElement('table');
	tab.setAttribute('id','reportcard');
	tab.setAttribute('border','0');
	
	
	var tbo=document.createElement('tbody');
	
	for(c=0;c<row_num;c++){
		row[c]=document.createElement('tr');
		row[c].setAttribute('class','row');
		row[c].style.backgroundColor=navbgcolor;
		row[c].style.cursor='pointer';
		row[c].addEventListener('click', (function(_tlink) {
			return function() {
				var tlink = _tlink;
				allrows=navframe.contentDocument.getElementsByClassName('row');
				for (r=0;r<allrows.length;r++){
					allrows[r].style.backgroundColor=navbgcolor
					for (u=0;u<allrows[r].childNodes.length;u++){allrows[r].childNodes[u].style.color=navfcolor;}}		
				this.style.backgroundColor=selectedcolor;
				for (u=0;u<this.childNodes.length;u++){this.childNodes[u].style.color=hlfcolor;};
				contframe.setAttribute('src',tlink);
				contframe.addEventListener('load', (function() {
					return function() {
							showGrades();
					}
				})());
			}
		})(links[c]));
		
		row[c].addEventListener('mouseover', (function() {
			return function() {
				if (this.style.backgroundColor == navbgcolor){
					this.style.backgroundColor=hlbgcolor;
					for (u=0;u<this.childNodes.length;u++){this.childNodes[u].style.color=hlfcolor;}
				}
			};
		})());
		
		row[c].addEventListener('mouseout', (function() {
			return function() {
			if (this.style.backgroundColor == hlbgcolor){
				this.style.backgroundColor=navbgcolor;
				for (u=0;u<this.childNodes.length;u++){this.childNodes[u].style.color=navfcolor;}}
			};
		})());
		
		
		for(k=0;k<cell_num;k++) {
			cell[k]=document.createElement('td');
			cell[k].setAttribute('height','50');
			var cont;
			if (k==0){
				cont=document.createTextNode(classnames[c].replace(/&amp;/g,'&'));}
			else if (k==1){
				cont=document.createTextNode(teachernames[c].replace(/&amp;/g,'&'));}			
			else if (k==2){
				cont=document.createTextNode(letters[c]);}
			else if (k==3){
				cont=document.createTextNode(grades[c]);
			}
			cell[k].appendChild(cont);
			cell[k].style.color=navfcolor;
			cell[k].style.fontFamily=navfont
			row[c].appendChild(cell[k]);
		}
		tbo.appendChild(row[c]);
	}
	
	tab.appendChild(tbo);
	navframe.contentDocument.getElementsByTagName('body')[0].appendChild(tab);
	
	var spacer=document.createElement('div');
	spacer.setAttribute('style','height:30px');
	navframe.contentDocument.getElementsByTagName('body')[0].appendChild(spacer);
	
	var gobackbtn = document.createElement('div');
	gobackbtn.style.fontFamily=navfont;
	gobackbtn.innerHTML="<b><u>RETURN TO MAIN</u></b>";
	gobackbtn.style.cursor='pointer';
	gobackbtn.style.color=hlbgcolor;
	gobackbtn.addEventListener('click',(function() {
			return function() {
			window.location.href='http://my.sycamoreschools.org/webapps/portal/frameset.jsp';		
		};
	})());
	navframe.contentDocument.getElementsByTagName('body')[0].appendChild(gobackbtn);
	
	navframe.contentDocument.getElementsByTagName('body')[0].style.backgroundColor = navbgcolor;
}

function paintBackground(icanv){
	
	var wi = window.innerWidth - 5;
	var hi = window.innerHeight - 5;
	var sqDiag = 50;
	
	console.log(icanv)
	var c = icanv;
	c.width = wi;
	c.height = hi;
	
	var ctx = c.getContext("2d");
	
	for (i = 0; i < 250; i++){
	
			var x = Math.floor(Math.random()*(wi+1+sqDiag)) - sqDiag;
			var y = Math.floor(Math.random()*(hi+1));
			var ang = Math.random()*(1.57079633);
			var angComp = 1.57079633 - ang;
	
			//draw square
			ctx.beginPath();
			ctx.moveTo(x,y);
	
			var x1 = x + Math.cos(ang)*sqDiag;
			var y1 = y - Math.sin(ang)*sqDiag;
			ctx.lineTo(x1,y1);
	
			var x2 = x1 + Math.cos(angComp)*sqDiag;
			var y2 = y1 + Math.sin(angComp)*sqDiag;
			ctx.lineTo(x2,y2);
	
			var x3 = x2 - Math.cos(ang)*sqDiag;
			var y3 = y2 + Math.sin(ang)*sqDiag;
			ctx.lineTo(x3,y3);
	
			ctx.closePath();
	
			//fill the square
			var grd = ctx.createRadialGradient((x+x2)/2,(y1+y3)/2,0,(x+x2)/2,(y1+y3)/2,150);
			grd.addColorStop(0, "#FFFFFF");
			grd.addColorStop(1, "#006600");
			ctx.fillStyle = grd;
			ctx.fill();
	
	}
	
	ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
	ctx.beginPath();
	ctx.rect(wi/20,hi/20,9*wi/10,9*hi/10);
	ctx.fill();
	ctx.lineWidth = 4;
	ctx.strokeStyle = "#FFFF00";
	ctx.stroke();

}

var asstwidth='200';
var typewidth='160';
var pewidth='60';
var ppwidth='60';
var navbgcolor = 'rgb(0, 102, 0)';
var selectedcolor = 'rgb(255, 240, 0)';
var hlbgcolor = 'rgb(255, 255, 255)';
var hlfcolor = 'rgb(0, 102, 0)'
var navfont = 'arial';
var navfcolor = 'rgb(255, 255, 255)';
var username = '';
var tabwidth='4px';
var iweights= [-1];

window.addEventListener('load', (function() {
	return function() {	
			if (document.getElementsByName('content').length>0 && document.getElementsByName('content')[0].contentDocument.getElementsByClassName('moduleTitle').length>1 && document.getElementsByName('content')[0].contentDocument.getElementsByClassName('moduleTitle')[1].innerHTML=='Student Current Grades Module'){
				var cell = document.getElementsByName('nav')[0].contentDocument.getElementById('My Courses');
				cell.removeChild(cell.firstChild);
				cell.removeChild(cell.firstChild);
				var cellanchor = document.createElement('a');
				cellanchor.setAttribute('href','');
				cellanchor.innerHTML='Grade Analytics';
				var curve = document.createElement('span');
				curve.setAttribute('class','hideoff');
				curve.innerHTML=' Tab 3 of 3';
				cellanchor.appendChild(curve);
				cell.setAttribute('style','border-top-left-radius:9px border-top-right-radius:9px background-color:#060')
				cell.style.display='table-cell';
				cell.appendChild(cellanchor);
				cell.addEventListener('click', (function() {
					return function() {
						if (document.getElementsByName('content').length>0 && document.getElementsByName('content')[0].contentDocument.getElementsByClassName('moduleTitle').length>1 && document.getElementsByName('content')[0].contentDocument.getElementsByClassName('moduleTitle')[1].innerHTML=='Student Current Grades Module'){
							main();
						}								
					};
				})());
			}
	}
})());
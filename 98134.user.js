// ==UserScript==
// @name           CS2 Nicer Ship Pages
// @namespace      userscripts.org
// @description    nicens up the scan & review pages for ships & outposts reviews
// @include        http://*.chosenspace.com/index.php?go=design_info*
// @include        http://*.chosenspace.com/index.php?go=scan*
// @exclude        http://*.chosenspace.com/index.php?go=scan_*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
var newTable=document.createElement('table');
newTable.align="center";
var newTR,newTD;
var mainPage=document.evaluate("//a[text()='Starships in Grid']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var thisPage=mainPage.snapshotItem(0);
if(thisPage){
	newTR=document.createElement('tr');
		newTD=document.createElement('td');
			newTD.align='center';
			newTD.setAttribute('style','padding:4px 4px 4px 4px;');
			newTD.appendChild(thisPage.cloneNode(true));
			newTD.appendChild(thisPage.nextSibling.cloneNode(true));
			newTD.setAttribute('colspan','4');
			newTR.appendChild(newTD);
	newTable.appendChild(newTR);
}
var editPage=document.evaluate("//form[contains(@action,'design_name')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var editsPage=editPage.snapshotItem(0);
if(editsPage){
	newTR=document.createElement('tr');
		newTD=document.createElement('td');
			newTD.align='center';
			newTD.setAttribute('style','padding:4px 4px 4px 4px;');
				newTD.setAttribute('colspan','4');
				newForm=document.createElement('form');
					newForm.setAttribute('action',editsPage.getAttribute('action'));
					newForm.setAttribute('onsubmit',editsPage.getAttribute('onsubmit'));
					newForm.setAttribute('method',editsPage.getAttribute('method'));
					newForm.setAttribute('style','margin:0px');
					newTable2=document.createElement('table');
						newTable2.setAttribute('cellspacing','2');
						newTable2.setAttribute('cellpadding','0');
						newTable2.setAttribute('border','0');
						newTR2=document.createElement('tr');
							newTD2=document.createElement('td');
								newTD2.appendChild(document.createTextNode('Design Name: '));
								var dnames=document.evaluate("//input[@name='design_name']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
								var dname=dnames.snapshotItem(0);
								newTD2.appendChild(dname.cloneNode(true));
							newTR2.appendChild(newTD2);
							newTD2=document.createElement('td');
								var dbuttons=document.evaluate("//input[@value='E']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
								var dbutton=dbuttons.snapshotItem(0);
								newTD2.appendChild(dbutton.cloneNode(true));
							newTR2.appendChild(newTD2);
					newTable2.appendChild(newTR2);
				newForm.appendChild(newTable2);
				newTD.appendChild(newForm);
			newTR.appendChild(newTD);
	newTable.appendChild(newTR);
}
var ter=new Array();
allEdits=document.evaluate("//input[@onfocus='blur();']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var iLength=allEdits.snapshotLength;
var thisEdit;
for(var i=0;i < iLength;i++){
	thisEdit=allEdits.snapshotItem(i);
	if(thisEdit.previousSibling.textContent==' : '){
		desc=thisEdit.previousSibling.previousSibling.previousSibling.textContent+': ';
	}else{
		desc=thisEdit.previousSibling.textContent;
	}
	desc=desc.split('\n').join('').split(' :').join(':');
	ter[i]=new Object();
	if(desc!=' X '){
		ter[i]["desc"]=desc;
		ter[i]["value"]=thisEdit.getAttribute('value');
		ter[i]["amount"]="no";
	}else{
		ter[i-1]["amount"]=thisEdit.getAttribute('value');
	}
}
mainloop:for(var j=0;j < ter.length;j++){
	if(ter[j]["desc"]!=null){
		if(ter[j]["desc"]!="Points: "){
			newTR=document.createElement('tr');
				newTD=document.createElement('td');
					newTD.align='right';
					newTD.setAttribute('style','padding:0px 4px 0px 0px;');
					newTD.appendChild(document.createTextNode(ter[j]["desc"]));
					newTR.appendChild(newTD);
				newTD=document.createElement('td');
					newTD.align='left';
					newTD.setAttribute('style','padding:0px 4px 0px 4px;');
					newTD.appendChild(document.createTextNode(ter[j]["value"]));
					newTD.className='forms_txt_fade';
					newTR.appendChild(newTD);
			if(ter[j]["amount"]=="no"){
				newTD=document.createElement('td');
					newTR.appendChild(newTD);
				newTD=document.createElement('td');
					newTR.appendChild(newTD);
			}else{
				newTD=document.createElement('td');
					newTD.align='center';
					newTD.setAttribute('style','padding:0px 4px 0px 4px;');
					newTD.appendChild(document.createTextNode(' X '));
					newTR.appendChild(newTD);
				newTD=document.createElement('td');
					newTD.align='left';
					newTD.setAttribute('style','padding:0px 4px 0px 4px;');
					newTD.appendChild(document.createTextNode(ter[j]["amount"]));
					newTD.className='forms_txt_fade';
					newTR.appendChild(newTD);
			}
			newTable.appendChild(newTR);
		}else{
			function addinner(){
				var loop=2;
				var num=0;
				while(num <= loop) {
					newTR3=document.createElement('tr');
						newTD3=document.createElement('td');
							newTD3.align='right';
							newTD3.setAttribute('style','padding:0px 4px 0px 0px;');
							newTD3.appendChild(document.createTextNode(ter[j]["desc"]));
							newTR3.appendChild(newTD3);
						newTD3=document.createElement('td');
							newTD3.align='left';
							newTD3.setAttribute('style','padding:0px 4px 0px 4px;');
							newTD3.appendChild(document.createTextNode(ter[j]["value"]));
							newTD3.className='forms_txt_fade';
							newTR3.appendChild(newTD3);
					newTable3.appendChild(newTR3);
					num++;
					j++;
				}
			}
			newTR=document.createElement('tr');
			newTable.appendChild(newTR);
				newTD=document.createElement('td');
					newTD.align='center';
					newTD.setAttribute('style','padding:0px;');
					newTD.setAttribute('colspan','4');
					newTR.appendChild(newTD);
					var newTR2,newTD2,newTable2,newTR3,newTD3,newTable3;
					newTable2=document.createElement('table');
					newTable2.align="center";
					newTD.appendChild(newTable2);
					newTR2=document.createElement('tr');
						newTable2.appendChild(newTR2);
						newTD2=document.createElement('td');
							newTD2.align='center';
							newTD2.setAttribute('style','padding:0px;');
							newTR2.appendChild(newTD2);
							newTable3=document.createElement('table');
							newTable3.align="center";
							newTD2.appendChild(newTable3);
							addinner();
						newTD2=document.createElement('td');
							newTD2.align='center';
							newTD2.setAttribute('style','padding:0px;');
							newTR2.appendChild(newTD2);
							newTable3=document.createElement('table');
							newTable3.align="center";
							newTD2.appendChild(newTable3);
							addinner();
						newTD2=document.createElement('td');
							newTD2.align='center';
							newTD2.setAttribute('style','padding:0px;');
							newTR2.appendChild(newTD2);
							newTable3=document.createElement('table');
							newTable3.align="center";
							newTD2.appendChild(newTable3);
							addinner();
		}
	}
}
var external=document.evaluate("//text()[contains(.,'Installed Externals')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var externals=external.snapshotItem(0);
if(externals){
	var extindex=0;
	var extparnum=externals.parentNode.childNodes.length;
	extloop:while (extindex<extparnum){
		if(externals==externals.parentNode.childNodes[extindex])break extloop;
		extindex++;
	}
	var extclone=externals.parentNode.childNodes[extindex].cloneNode(true);
	while(extclone.nodeName!="IMG"&&extclone.nodeName!="HR"){
		if(extclone.nodeName!="BR"&&extclone.nodeValue!="\n"){
			var exttoken=extclone.nodeValue.split(' x ');
			if(exttoken[1]!=null){
				newTR=document.createElement('tr');
					newTD=document.createElement('td');
						newTD.className='forms_txt_fade';
						newTD.align='center';
						newTD.setAttribute('style','padding:0px;');
						newTD.appendChild(extclone);
						newTD.setAttribute('colspan','4');
						newTR.appendChild(newTD);
				newTable.appendChild(newTR);
			}else{
				newTR=document.createElement('tr');
					newTD=document.createElement('td');
						newTD.align='center';
						newTD.setAttribute('style','padding:0px;');
						newTD.appendChild(extclone);
						newTD.setAttribute('colspan','4');
						newTR.appendChild(newTD);
				newTable.appendChild(newTR);
			}
		}
		extindex++;
		extclone=externals.parentNode.childNodes[extindex].cloneNode(true);
	}
}
if(thisPage){
	var bottomStuff=document.evaluate("//hr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var bottomStuffs=bottomStuff.snapshotItem(0);
	newTR=document.createElement('tr');
		newTD=document.createElement('td');
		newTD.align='center';
		newTD.setAttribute('style','padding:4px 4px 4px 4px;');
		newTD.setAttribute('colspan','4');
		newTR.appendChild(newTD);
	newTable.appendChild(newTR);
	while(bottomStuffs){
		if(bottomStuffs.nodeName=='HR'){
			newTD.appendChild(document.createElement('hr'));
		}else{
			var bottomStuffClone=bottomStuffs.cloneNode(true);
			newTD.appendChild(bottomStuffClone);
		}
		bottomStuffs=bottomStuffs.nextSibling;
	}
	thisPage.parentNode.parentNode.appendChild(newTable);
	thisPage.parentNode.setAttribute('style','display:none!important;');
	
}else{
	thisEdit.offsetParent.offsetParent.offsetParent.offsetParent.parentNode.appendChild(newTable);
	thisEdit.offsetParent.offsetParent.offsetParent.offsetParent.setAttribute('style','display:none!important;');
}

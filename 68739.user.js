// Domain of Heroes Equipment Manager
// 
// version 1.0
// 01-19-2010
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//
// ==UserScript==
// @name           Equipment Manager
// @namespace      Domain of Heroes
// @description    Manges equipment
// @include        http://www.domainofheroes.com/Game.aspx
// ==/UserScript==
equipLocationID=new Object();
equipLocationID["Strong Hand"]=13;
equipLocationID["Chest"]=2;
equipLocationID["Wrists"]=10;
equipLocationID["Legs"]=4;
equipLocationID["Head"]=1;
equipLocationID["Off Hand"]=12;
equipLocationID["Waist"]=3;
equipLocationID["Hands"]=7;
equipLocationID["Arms"]=6;
equipLocationID["Neck"]=8;
equipLocationID["Eyes"]=9;
equipLocationID["Feet"]=5;
equipLocationID["Ammo Slot"]=14;
equipLocationID["Ring Finger"]=11;
equipLocationID["Pocket"]=15;

function unequipAll() {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	for (x = 1; x <= 15; x++) {
		link= document.getElementById("imgUnequip" + x)
		link.dispatchEvent(evt);
	}
}
function equipChanged(e) {
	if (e.attrName == "itmid" && e.prevValue){
	//var msg = e.target.id + "has changed. ";
	//msg=msg+e.attrName+"has done something. Old value = "+e.prevValue+".  new value = "+e.newValue;
	//alert(msg);
	
		// NO LONGER NEED to CALL just use listeners in mule, inv, and storage
		// cureq=eqLoc[e.preValue];
		// if (cureq) {
			//alert(cureq);
	setTimeout(function(eid) {return function() {equipTrack(eid);};}(e.newValue),1);
		// }
	}
}
function equipTrack(eid) {
	eqLoc=eval(GM_getValue("equip5",'new Object()'));
	//alert("load eqLoc");
	var cureq=eqLoc[eid];
		if (cureq) {
			eqLoc[eid]="E"+GM_getValue("curChar");
			GM_setValue("equip5",eqLoc.toSource());
		}
}
function unequip1(e) {
	var slot=e.target.id.substring(10);
	var olde=e.target.getAttribute("itmid");
	eqLoc=eval(GM_getValue("equip5",'new Object()'));
	if (olde)
	{	
		cureq=eqLoc[olde];
		if (cureq) {
			//alert(cureq)
			setTimeout(function(eid) {return function() {findEquip(eid);};}(olde),10000)
		}
	
	}
}
function findEquip(eid) {
	//alert("in func");
	var loc1 =document.getElementById("itm" + eid).parentNode.id.substring(0,1).toUpperCase()
	//alert(loc1);
	eqLoc=eval(GM_getValue("equip5",'new Object()'));
	eqLoc[eid]=loc1+GM_getValue("curChar");
	GM_setValue("equip5",eqLoc.toSource());
}
function showItem(e) {
	EquipSetDrop=document.getElementById('equipSetDrop');
  	mySet=eval(GM_getValue("equip1",[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]].toSource()));
  	myNames=eval(GM_getValue("equip2",[["","","","","","","","","","","","","","","",""]].toSource()));

	eqImgClass=eval(GM_getValue("equip3",[["","","","","","","","","","","","","","","",""]].toSource()));

	eqImgsrc=eval(GM_getValue("equip4",[["","","","","","","","","","","","","","","",""]].toSource()));

	var slot=e.target.id.substring(10);
	itmID=mySet[EquipSetDrop.value][slot];
	if (itmID>0)
	{
		elT=document.getElementById('itemInfoSide')
		var item = unsafeWindow.CacheGet('itm' + itmID);
		var itc = unsafeWindow.CacheGet('itc' + item.ItcId);
		var txt = unsafeWindow.GetDescriptionHtmlForItem(item,itc);
		title="<span class='R" + item.RarityId + "Q" + item.QualityId + "'> " + item.Name + " </span";
		var itemModifiers = [];
		var itemModStr ="<br>";
		//convert prefix and suffix ids to regular enchantment ids
		itemModifiers.push(unsafeWindow.CacheGet('PRE' + item.PreId).ModId);
		itemModifiers.push(unsafeWindow.CacheGet('SUF' + item.SufId).ModId);
		
		//add rarity modifiers subtract 3 from rarity and that's how many mod slots item has
		for(var j = 1; j <= item.RarityId - 3; j++)
		{
			itemModifiers.push(item['ModId' + j]);
		}
		
		
		//Compare modifiers to user list
		for(var j = 0; j < itemModifiers.length; j++)
		{
			itemModStr=itemModStr+itemModifiers[j]+"<br>";
		}
		elT.innerHTML=title+txt;//+itemModStr;
	}
	
}
function invMove(e) {
	//alert(e.target.id);
	//set invlist to right spot and get all the checkboxs
	InvList = document.getElementById('muleList');
	var allChks, thisChk;
	allChks = document.evaluate("descendant::input[@type='checkbox']",InvList,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	//alert(allChks.snapshotLength);
	eqLoc=eval(GM_getValue("equip5",'new Object()'));
	//charList=eval(GM_getValue("charList",""));
	//with the checkboxes find the ones checked and process them
for (var i = 0; i < allChks.snapshotLength; i++) {
    thisChk = allChks.snapshotItem(i);
	
	if (thisChk.checked) {
		itmID=thisChk.id.substring(3);
		
		cureq=eqLoc[itmID];
		
		if (cureq){
			
			eqLoc[itmID]="S"+GM_getValue("curChar");
			GM_setValue("equip5",eqLoc.toSource());
			}
		}
	}
}
function equipSet() {
	//TO DO check items location before attemption to equip
	EquipSetDrop=document.getElementById('equipSetDrop');
	mySet=eval(GM_getValue("equip1",[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]].toSource()));
	for (x=1; x<=15; x++) {
	if (mySet[EquipSetDrop.value][x]>0) {
		eqloc="javascript:Equip(" + mySet[EquipSetDrop.value][x] + ");";
		
		location.href = eqloc;
		}
	}
}
function renameSet() {
	
	
	EquipSetDrop=document.getElementById('equipSetDrop');
	v=EquipSetDrop.value;
	if (v>=0) {
		myequipSetData=eval(GM_getValue("equipSetData",["Blank"].toSource()));
		var q1=prompt("Enter Set Name",EquipSetDrop.options[EquipSetDrop.selectedIndex].text);
		myequipSetData[v]=q1;
		EquipSetDrop.options[EquipSetDrop.selectedIndex].text=q1;
		GM_setValue("equipSetData",myequipSetData.toSource());
	}
}
function deleteSet() {
//TODO update location properties--if all deleted delete property
	myequipSetData=eval(GM_getValue("equipSetData",["Blank"].toSource()));
 	mySet=eval(GM_getValue("equip1",[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]].toSource()));
    myNames=eval(GM_getValue("equip2",[["","","","","","","","","","","","","","","",""]].toSource()));
	eqImgClass=eval(GM_getValue("equip3",[["","","","","","","","","","","","","","","",""]].toSource()));

	eqImgsrc=eval(GM_getValue("equip4",[["","","","","","","","","","","","","","","",""]].toSource()));
	EquipSetDrop=document.getElementById('equipSetDrop');
	x=EquipSetDrop.selectedIndex;
	v=EquipSetDrop.value;
	if (v>=0) {
		
		//EquipSetDrop.options[x]=null;
		myequipSetData.splice(v,1);
		mySet.splice(v,1);
		myNames.splice(v,1);
		eqImgClass.splice(v,1);
		eqImgsrc.splice(v,1);
		EquipSetDrop.length=1;
		for (var i=0;i<myequipSetData.length;i++){
			  EquipSetDrop.options[EquipSetDrop.length] = new Option(myequipSetData[i],i); 
			  }
			  EquipSetDrop.options[EquipSetDrop.length] = new Option("Create New Set",-2); 
			  EquipSetDrop.selectedIndex=0;
		GM_setValue("equipSetData",myequipSetData.toSource());
		GM_setValue("equip1",mySet.toSource());
  	    GM_setValue("equip2",myNames.toSource());
		GM_setValue("equip3",eqImgClass.toSource());
		GM_setValue("equip4",eqImgsrc.toSource());
		ChangeSet();
	}
}
function removeItem(e) {
		//loc=e.target.id;
		//itc1=		loc.substring(15);
		//TODO update location properties--if all deleted delete property
	EquipSetDrop=document.getElementById('equipSetDrop');
  	mySet=eval(GM_getValue("equip1",[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]].toSource()));
  	myNames=eval(GM_getValue("equip2",[["","","","","","","","","","","","","","","",""]].toSource()));

	eqImgClass=eval(GM_getValue("equip3",[["","","","","","","","","","","","","","","",""]].toSource()));

	eqImgsrc=eval(GM_getValue("equip4",[["","","","","","","","","","","","","","","",""]].toSource()));

	var slot=e.target.id.substring(15);
	myNames[EquipSetDrop.value][slot]="";
	eqImgClass[EquipSetDrop.value][slot]="";
	eqImgsrc[EquipSetDrop.value][slot]="";
	elT=document.getElementById("eqsetequip" +slot);
	elT.innerHTML=myNames[EquipSetDrop.value][slot];
	elT=document.getElementById("eqsetimgUnequip" +slot);
	elT2=document.getElementById("eqsetimgEquip" +slot);
	elT.style.display='none';
	elT2.style.display='none';
	//alert("Deleting " + mySet[EquipSetDrop.value][slot]);
	mySet[EquipSetDrop.value][slot]=0;
	GM_setValue("equip1",mySet.toSource());
	GM_setValue("equip2",myNames.toSource());
	GM_setValue("equip3",eqImgClass.toSource());
	GM_setValue("equip4",eqImgsrc.toSource());	
}
function addEquipToCurrentSet(e) {
	myequipSetData=eval(GM_getValue("equipSetData",["Blank"].toSource()));
	EquipSetDrop=document.getElementById('equipSetDrop');
	if (EquipSetDrop.value>=0) {
	mySet=eval(GM_getValue("equip1",[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]].toSource()));
	myNames=eval(GM_getValue("equip2",[["","","","","","","","","","","","","","","",""]].toSource()));

	//Equipment images have class and src
	eqImgClass=eval(GM_getValue("equip3",[["","","","","","","","","","","","","","","",""]].toSource()));

	eqImgsrc=eval(GM_getValue("equip4",[["","","","","","","","","","","","","","","",""]].toSource()));
	curChar=GM_getValue("curChar","0");
	eqLoc=eval(GM_getValue("equip5",'new Object()'));
	//new ID available
	//need to get equip location
	// my loc = itm3232.chid[td][3].childnoses[2]
	x=1*equipLocationID[document.getElementById(e.target.id.substring(3)).getElementsByTagName('td')[3].childNodes[2].nodeValue.slice(1,-2)];
	var img =document.getElementById(e.target.id.substring(3)).getElementsByTagName('img')[0];
	var name= document.getElementById(e.target.id.substring(3)).getElementsByTagName('td')[3].childNodes[0];
	var loc1 =document.getElementById(e.target.id.substring(3)).parentNode.id.substring(0,1).toUpperCase()
	//"<font class=R" + item.RarityId + "Q" + item.QualityId + " >" + item.Name + "</font>"
	var fc= name.getAttribute('class').substring(0,4);
	myNames[EquipSetDrop.value][x]="<font class="+fc+">"+name.textContent+"</font>";
	mySet[EquipSetDrop.value][x]=e.target.id.substring(6);
	eqLoc[e.target.id.substring(6)]=loc1+curChar;
	eqImgClass[EquipSetDrop.value][x]=img.getAttribute("class");
	eqImgsrc[EquipSetDrop.value][x]=img.src;
	
  GM_setValue("equip1",mySet.toSource());
  GM_setValue("equip2",myNames.toSource());
	GM_setValue("equip3",eqImgClass.toSource());
	GM_setValue("equip4",eqImgsrc.toSource());
	GM_setValue("equip5",eqLoc.toSource());

	ChangeSet();
	//alert(equipLocationID[document.getElementById(e.target.id.substring(3)).getElementsByTagName('td')[3].childNodes[2].nodeValue.slice(1,-2)]);
	}
	else {
	alert("No Set Selected--Goto Equip Tab to select suit");
	}
	// this.WearLoc = ItemNameElement.parentNode.childNodes[2].nodeValue.slice(1,-2);
	//alert("add to set"+e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id);
}
function ChangeSet() {
  EquipSetDrop=document.getElementById('equipSetDrop');
  mySet=eval(GM_getValue("equip1",[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]].toSource()));
  myNames=eval(GM_getValue("equip2",[["","","","","","","","","","","","","","","",""]].toSource()));
  eqImgClass=eval(GM_getValue("equip3",[["","","","","","","","","","","","","","","",""]].toSource()));
  eqImgsrc=eval(GM_getValue("equip4",[["","","","","","","","","","","","","","","",""]].toSource()));
  eqLoc=eval(GM_getValue("equip5",'new Object()'));
  charList=eval(GM_getValue("charList",""));
  curChar=GM_getValue("curChar");

	for (x = 1;x <=15; x++) {
		elT0=document.getElementById("eqsetequip" +x);
		elT0.innerHTML="";
		elT=document.getElementById("eqsetimgUnequip" +x);
		elT2=document.getElementById("eqsetimgEquip" +x);
		elT.style.display='none';
		elT2.style.display='none';

			}
  if (EquipSetDrop.value>=0) {
		for (x = 1;x <=15; x++) {
				elT=document.getElementById("eqsetequip" +x);
				
				elT.innerHTML=myNames[EquipSetDrop.value][x];
				elT=document.getElementById("eqsetimgUnequip" +x);
				elT2=document.getElementById("eqsetimgEquip" +x);
				if (mySet[EquipSetDrop.value][x]==0) {
					elT.style.display='none';
					elT2.style.display='none';
					
						}
				else {
					elT.style.display="";
					elT2.style.display="";
					elT2.setAttribute("class",eqImgClass[EquipSetDrop.value][x]);
					elT2.src=eqImgsrc[EquipSetDrop.value][x];
					locString=eqLoc[mySet[EquipSetDrop.value][x]];
					if (locString) {
						lspot=locString.substring(0,1);
						lchar=locString.substring(1);
						if (lspot=="E") {
						locString="Equipped on " + charList[lchar];
						}
						if (lspot=="I") {
							locString="In " + charList[lchar]+ "'s Inventory";
						}
						if (lspot=="M") {
						locString="On Mule";
						}
						if (lspot=="S") {
						locString="In Storage";
						}
						if (lchar!=curChar) {
							locString=locString+"\n (Click to Attempt to Fetch Equipment to Mule--will change characters)";
						}
					}
					else {
					locString="Unkown Location";
					}
					
					elT2.setAttribute("title",locString);
					//eqloc="javascript:MakeItemDetailsTip('equipsetequip"+x+"',"+mySet[EquipSetDrop.value][x]+",'LOOKUP','L');"
					//location.href = eqloc;
					}
				}
  	
  }
  else if (EquipSetDrop.value==-2) {//Create new set
  var q1=prompt("Enter Set Name","Set "+(myequipSetData.length +1));
  if (q1 != '' && q1 !=null) {
	  myequipSetData[myequipSetData.length]=q1;
		EquipSetDrop=document.getElementById('equipSetDrop');
		EquipSetDrop.length=EquipSetDrop.length-1;
		EquipSetDrop.options[EquipSetDrop.length] = new Option(q1,myequipSetData.length-1,false,true);
		EquipSetDrop.options[EquipSetDrop.length] = new Option("Create New Set",-2);
		
		GM_setValue("equipSetData",myequipSetData.toSource());
		
	  var equipSet = [0];
	  var itmNames= [""];
		var eqClass=[""];
		var eqSrc=[""];
	  
		for (x=1; x<=15; x++){
		
			itmNames[x] = "";
			equipSet[x] = 0;
			eqClass[x] = "";
			eqSrc[x] = "";
			}
	  mySet[mySet.length]=equipSet;
	  myNames[myNames.length]=itmNames;
		eqImgClass[eqImgClass.length]=eqClass;
		eqImgsrc[eqImgsrc.length]=eqSrc;
		
		GM_setValue("equip1",mySet.toSource());
		GM_setValue("equip2",myNames.toSource());
		GM_setValue("equip3",eqImgClass.toSource());
		GM_setValue("equip4",eqImgsrc.toSource());
		

	  }
  }
	//window.setTimeout(function() { alert('Changing '+EquipSetDrop.value); },1000);
  
}

function eqClick1() {
	//window.setTimeout(function() { alert('Hello world!'); 
	
	
	//}, 3000);
}
function makeSet() {
	myequipSetData=eval(GM_getValue("equipSetData",["Blank"].toSource()));
	var q1=prompt("Enter Set Name","Set "+(myequipSetData.length +1));
	if (q1 != '' && q1 !=null) {
  mySet=eval(GM_getValue("equip1",[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]].toSource()));
  myNames=eval(GM_getValue("equip2",[["","","","","","","","","","","","","","","",""]].toSource()));

	//Equipment images have class and src
	eqImgClass=eval(GM_getValue("equip3",[["","","","","","","","","","","","","","","",""]].toSource()));

	eqImgsrc=eval(GM_getValue("equip4",[["","","","","","","","","","","","","","","",""]].toSource()));
	curChar=GM_getValue("curChar","0");
	eqLoc=eval(GM_getValue("equip5",'new Object()'));

  
  //Add new name to drop down list 
	myequipSetData[myequipSetData.length]=q1;
	EquipSetDrop=document.getElementById('equipSetDrop');
	EquipSetDrop.length=EquipSetDrop.length-1;
	EquipSetDrop.options[EquipSetDrop.length] = new Option(q1,myequipSetData.length-1,false,true);
	EquipSetDrop.options[EquipSetDrop.length] = new Option("Create New Set",-2);
	
	GM_setValue("equipSetData",myequipSetData.toSource());
	var eqNode = [];
	var setNode = [];
  var equipSet = [0];
  var itmNames= [""];
	var eqClass=[""];
	var eqSrc=[""];
  
	for (x=1; x<=15; x++){
	
		eqNode[0] = document.getElementById("imgEquip" +x);
		setNode[0] = document.getElementById("eqsetimgEquip" +x);
		eqNode[1] = document.getElementById("equip" +x);
		setNode[1] = document.getElementById("eqsetequip" +x);
		eqNode[2] = document.getElementById("imgUnequip" +x);
		setNode[2] = document.getElementById("eqsetimgUnequip" +x);
    itmNames[x] = eqNode[1].innerHTML;
    equipSet[x] = eqNode[2].getAttribute("itmid");
		eqClass[x] = eqNode[0].getAttribute("class");
		eqSrc[x] = eqNode[0].src;
		if(!equipSet[x]) {
			equipSet[x]=0;
		 }
		 eqLoc[equipSet[x].toString()]="E"+curChar;
	
	}
  mySet[mySet.length]=equipSet;
  myNames[myNames.length]=itmNames;
	eqImgClass[eqImgClass.length]=eqClass;
	eqImgsrc[eqImgsrc.length]=eqSrc;
	
  GM_setValue("equip1",mySet.toSource());
  GM_setValue("equip2",myNames.toSource());
	GM_setValue("equip3",eqImgClass.toSource());
	GM_setValue("equip4",eqImgsrc.toSource());
	GM_setValue("equip5",eqLoc.toSource());

	ChangeSet();
	}
}
function buildEquipManager() {
	//Create Smart Recycle Button and status text
	myequipSetData=eval(GM_getValue("equipSetData",["Blank"].toSource()));
	var EquipWrapperDiv = document.getElementById('tabEquip');
	var ItemInfoDiv = document.createElement('div');
	ItemInfoDiv.setAttribute('class','gameContent');
	ItemInfoDiv.id='itemInfoSide';
	ItemInfoDiv.innerHTML="Item Info";
	g1Div=document.getElementById('game1');
	g1Div.appendChild(ItemInfoDiv);
	if(EquipWrapperDiv)
	{
		
			var wrapperTable = EquipWrapperDiv.getElementsByTagName('table')[0];
			var dollLastRow = wrapperTable.getElementsByTagName('table')[0].getElementsByTagName('tr')[9];
			var dLR2=dollLastRow.getElementsByTagName('td')[1];
			dLR2.setAttribute('colspan',3);
			
			//Copy the equipment table
			var newEquip=wrapperTable.cloneNode(true);
			var pics = newEquip.getElementsByTagName('img');
			var eqdivs = newEquip.getElementsByTagName('div');
			var newTable = document.createElement('table');
			var newRow = newTable.insertRow(-1);
			var newCell = newRow.insertCell(0);
			var newCell2 = newRow.insertCell(1);
			var delTable=document.createElement('table');
			var delRow=delTable.insertRow(-1);
			
			var ChooseTable=document.createElement('table');
			var infoRow = ChooseTable.insertRow(-1);
			var infoCell = infoRow.insertCell(0);
			var ChooserRow =ChooseTable.insertRow(-1);
			var ChooserData=ChooserRow.insertCell(0);
			var EquipButton=ChooserRow.insertCell(1);
			var blankTD=delRow.insertCell(0);
		
			//var blankSpaceTN = document.createTextNode(' ');
			newCell2.id = 'eqSet';
			//newCell2.style.whiteSpace='nowrap';
			//blankTD.textContent = 'Select Set';
			infoCell.setAttribute('colspan',2);
			infoCell.setAttribute('style','font-size:20; color:white');
			infoCell.innerHTML = 'Equipment Set Selector';
		
			var newLinkElement = document.createElement('a');
			newLinkElement.href = 'javascript:void(0)';
			newLinkElement.innerHTML = '<img border="0" class="h12px h12px-unequip clickable" src="http://media.domainofheroes.com/clear.gif"/>Unequip All';
			newLinkElement.addEventListener('click',unequipAll,false);
		
			var newLinkMakeSet = document.createElement('a');
			newLinkMakeSet.href = 'javascript:void(0)';
			newLinkMakeSet.innerHTML= '<img border="0" class="h12px h12px-equip clickable equip" src="http://media.domainofheroes.com/clear.gif"/>Make New Set ';
			newLinkMakeSet.addEventListener('click',makeSet,false);
			
			var dsEl = document.createElement('a');
			dsEl.href = 'javascript:void(0)';
			dsEl.innerHTML = '<img border="0" class="h12px h12px-unequip clickable" src="http://media.domainofheroes.com/clear.gif"/>Delete Set';
			dsEl.addEventListener('click',deleteSet,false);
			
			var eqEl = document.createElement('a')
			eqEl.href = 'javascript:void(0)';
			eqEl.innerHTML = '<img border="0" class="h12px h12px-equip clickable equip" src="http://media.domainofheroes.com/clear.gif"/>Equip Set';
			eqEl.addEventListener('click',equipSet,false);
			
			var renEl =document.createElement('a')
			renEl.href = 'javascript:void(0)';
			renEl.innerHTML = 'Rename Set';
			renEl.addEventListener('click',renameSet,false);
			
			var fetEl = document.createElement('a')
			fetEl.href = 'javascript:void(0)';
			fetEl.innerHTML = 'Fetch This Set (Experimental)';
			fetEl.addEventListener('click',fetchAll,false);
			
			// Dropdown Equipment Set List
			var EquipSetDrop = document.createElement('select');
			  EquipSetDrop.id = 'equipSetDrop';
			  //EquipSetDrop.style.width =  "200px" ;

			  EquipSetDrop.addEventListener('change', ChangeSet, false);

			  var SDI = 0;
			  EquipSetDrop.options[SDI] = new Option("None",-1); SDI++;
			  
			  for (var i=0;i<myequipSetData.length;i++){
			  EquipSetDrop.options[SDI] = new Option(myequipSetData[i],i); SDI++;
			  }
			  EquipSetDrop.options[SDI] = new Option("Create New Set",-2); SDI++;
	
			  ChooserData.appendChild(EquipSetDrop);
			  dLR2.appendChild(newLinkElement);
			  dLR2.appendChild(newLinkMakeSet);
			  blankTD.appendChild(dsEl);
			  blankTD.appendChild(document.createTextNode(' '));
			  blankTD.appendChild(renEl);
			  blankTD.appendChild(document.createTextNode(' '));
			  blankTD.appendChild(fetEl);
			  EquipButton.appendChild(eqEl);
	
	
			wrapperTable.parentNode.appendChild(ChooseTable);
			wrapperTable.parentNode.appendChild(newEquip);
			//wrapperTable.parentNode.insertBefore(newTable, wrapperTable);
			
			wrapperTable.parentNode.appendChild(delTable);
			for (var x = 0; x < pics.length; x++) {
				oid=pics[x].id;
				if (oid){
					pics[x].id="eqset"+oid;
					}
				}
			for ( x = 0; x < eqdivs.length; x++) {
				oid=eqdivs[x].id;
				if (oid){
					eqdivs[x].id="eqset"+oid;
					}
				}
    	for (x = 1;x <=15; x++) {
				elT=document.getElementById("eqsetequip" +x);
				elT.setAttribute("style","border: 0 none;overflow: hidden; float: left; height: 14px; width: 134px;");
				elT.innerHTML="";
				elT.addEventListener('mouseover',showItem,true);
				var imgUn = document.getElementById("imgUnequip" + x);
				imgUn.addEventListener('DOMAttrModified',equipChanged,false);
				imgUn.addEventListener('click',unequip1,false);
				var g1=document.getElementById("eqsetimgEquippable" + x);
				g1.style.display='none';
				var eli2=document.getElementById("eqsetimgEquip" +x);
				eli2.addEventListener('click',fetchEquip1,false);
				}
			for (x = 1;x <=15; x++) {
				elT=document.getElementById("eqsetimgUnequip" +x);
				elT2=document.getElementById("eqsetimgEquip" +x);
			  elT.title="Remove this item from this set";
				elT.addEventListener('click',removeItem,false);
				elT.style.display='none';
				elT2.style.display='none';
				}
			
			  

	}
}
function PopulateMyDoll() {
    for (x = 1; x <= 15; x++) {
		//don't work need to set attribute style display:none
        //document.getElementById("eqsetimgUnequip" + x).hide();
        //document.getElementById("eqsetequip" + x).hide();
        //document.getElementById("eqsetimgEquip" + x).hide();
    }
    var _itemListEqLength = _itemListEq.length;
    for (i = 0; i < _itemListEqLength; i++) {
        var itmid = _itemListEq[i];
        if (itmid == "") {
            continue;
        }
        var item = CacheGet("ITM" + itmid);
        if (!IsValidInstance(item)) {
            continue;
        }
        var itc = CacheGet("ITC" + item.ItcId);
        var type = CacheGet("ITY" + item.ItyId);
        var img = document.getElementById("eqsetimgUnequip" + itc.EqlId);
        img.show();
        setElementAttribute(img, "itmid", itmid);
        setElementAttribute(img, "eqlid", itc.EqlId);
        Event.observe(img, "click", UnequipButtonClicked, true);
        var imgPreview = document.getElementById("eqsetimgEquip" + itc.EqlId);
        if (type.IsImageReleased == 1) {
            setElementAttribute(imgPreview, "src", "http://media.domainofheroes.com/ITY" + item.ItyId + "-31.png");
            SetObjectClass(imgPreview, "");
        } else {
            setElementAttribute(imgPreview, "src", "http://media.domainofheroes.com/clear.gif");
            SetObjectClass(imgPreview, "h31px h31px-ITC" + item.ItcId);
        }
        imgPreview.show();
        setInnerHtml("eqsetequip" + itc.EqlId, "<font class=R" + item.RarityId + "Q" + item.QualityId + " >" + item.Name + "</font>");
        document.getElementById("eqsetequip" + itc.EqlId).show();
    }
    for (var eqlId = 1; eqlId <= 15; eqlId++) {
        var htmlToShow = "(N/A)";
        if (_arrItemHtmlByEql[eqlId] != "") {
            htmlToShow = _arrItemHtmlByEql[eqlId];
        }
        try {
            new Tip("eqsetimgEquippable" + eqlId, htmlToShow, {title: "Possible Equipment", hideOn: {event: "click"}, hideAfter: 0.5, closeButton: true, hook: {target: "bottomLeft", tip: "topRight"}, zIndex: 7000});
            document.getElementById("eqsetimgEquippable" + eqlId).observe("prototip:shown", function () {fMakeEquippableItemDetailsTips(this);});
        } catch (err) {
            dstatus(err.description);
        }
    }
    setTimeout("MakeToolTipsForItems(_itemListEq,'Eq')", 500);
}
function fetchAll() {
EquipSetDrop=document.getElementById('equipSetDrop');
var equipFetchList=new Object();
for (x = 1;x <=15; x++) {
var itemID=mySet[EquipSetDrop.value][x];
var cureq=eqLoc[itemID];
if (cureq) {
		
			var lspot=cureq.substring(0,1);
			var lchar=cureq.substring(1);
			if ((lchar != curChar) && (lspot=="E" || lspot=="I")) {
				//alert(lchar+ " "+curChar+" "+lspot);
				if (equipFetchList[lchar]==undefined)
				{
					equipFetchList[lchar]=[itemID]
				}
				else 
				{
					equipFetchList[lchar].push(itemID);
				}
				//	GM_setValue('fetchChar',lchar);
				
			}
						
		}
}
var toonFetchList=[];
for (toon in equipFetchList) {
	toonFetchList.push(toon);
}
if (toonFetchList.length > 0) {
	GM_setValue("toonFetchList",toonFetchList.toSource());
	GM_setValue("equipFetchList",equipFetchList.toSource());
	GM_setValue("fetch",true);
	GM_setValue("returnChar",curChar);
	GM_setValue('fetchChar',toonFetchList.pop());
	GM_setValue("toonFetchList",toonFetchList.toSource());
	location.href='http://www.domainofheroes.com/ChooseCharacter.aspx?c='+GM_getValue('fetchChar');
	//alert(equipFetchList.toSource());
}
}
function fetchEquip1(e) {
var equipFetchList=new Object();
	var slot=e.target.id.substring(13);
	EquipSetDrop=document.getElementById('equipSetDrop');
	itemID=mySet[EquipSetDrop.value][slot];
	//alert(itemID);
	//GM_setValue("FeqID",itemID);
	cureq=eqLoc[itemID];
		if (cureq) {
		
			var lspot=cureq.substring(0,1);
			var lchar=cureq.substring(1);
			if ((lchar != curChar) && (lspot=="E" || lspot=="I")) {
				//alert(lchar+ " "+curChar+" "+lspot);
				if (equipFetchList[lchar]==undefined)
				{
					equipFetchList[lchar]=[itemID]
				}
				else 
				{
					equipFetchList[lchar].push(itemID);
				}
				//	GM_setValue('fetchChar',lchar);
			
			}	
		}
	var toonFetchList=[];
	for (toon in equipFetchList) {
		toonFetchList.push(toon);
	}
if (toonFetchList.length > 0) {
	GM_setValue("toonFetchList",toonFetchList.toSource());
	GM_setValue("equipFetchList",equipFetchList.toSource());
	GM_setValue("fetch",true);
	GM_setValue("returnChar",curChar);
	GM_setValue('fetchChar',toonFetchList.pop());
	GM_setValue("toonFetchList",toonFetchList.toSource());
	location.href='http://www.domainofheroes.com/ChooseCharacter.aspx?c='+GM_getValue('fetchChar');
	//alert(equipFetchList.toSource());
}
	
}
function fetchStart() {
	GM_setValue("fetch",true);
	GM_setValue("returnChar",curChar);
	location.href='http://www.domainofheroes.com/ChooseCharacter.aspx?c='+GM_getValue('fetchChar');
}
function fetchEnd() {
	alert("Fetching from other toon-After Clicking OK, please wait");
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	var link= document.getElementById("tblTabs").getElementsByTagName('td')[3];
	link.dispatchEvent(evt);
	//Unequip any equipped gear
	for (var i=0;i<equipFetchList[curChar].length;i++) {
		cureq=eqLoc[equipFetchList[curChar][i]];
		lspot=cureq.substring(0,1);
		if (lspot=="E") {
		location.href='javascript:WAR("Unequip","itmid='+equipFetchList[curChar][i]+',");';
		}
	}
	//Let inv update do the rest
	//GM_setValue("fetch",false);
	//location.href='http://www.domainofheroes.com/ChooseCharacter.aspx?c=83662';
}
function muleupdate(e) {
	//alert(e.target.id);
	//Check to see if we need to update item location--from unequip or etc
	var itmID=e.target.id.substring(3);
	//eqLoc=eval(GM_getValue("equip5",'new Object()'));
	var cureq=eqLoc[itmID];
		if (cureq) {
			//alert(cureq);
			var loc1 =document.getElementById(e.target.id).parentNode.id.substring(0,1).toUpperCase()
			eqLoc[itmID]=loc1+curChar;
			setTimeout(function(){GM_setValue("equip5",eqLoc.toSource());},0);
			
			//the equipment we are looking for showed up
			if (fetchEquip){
				//look for a match
				var match = false;
				for (var x=0;x<equipFetchList[curChar].length;x++) {
					if (equipFetchList[curChar][x]==itmID) {
						match=true;
						matchloc=x;
						break;
					}
				}
				if (match) {
					if (loc1=="I")  //In the inventory
					{
						//alert("Found Item in Inventory");
						//MOVE IT TO THE MULE
						var i1=document.getElementById(e.target.id);
						i1.parentNode.removeChild(i1);
						location.href='javascript:WAR("MoveToMule","idlist='+itmID+',");';
						
						
					}
					else if (loc1=="M")
					{
						//alert("Item now on mule. Going home");
						equipFetchList[curChar].splice(matchloc,1);
						if (equipFetchList[curChar].length ==0)
						{
							if (toonFetchList.length > 0) {
							setTimeout(function() {GM_setValue('fetchChar',toonFetchList.pop());},0);
							setTimeout(function() {GM_setValue('toonFetchList',toonFetchList.toSource());},0);
							setTimeout(function() {location.href='http://www.domainofheroes.com/ChooseCharacter.aspx?c='+GM_getValue("fetchChar");},1000);
							}
							else
							{
							//WE ARE DONE GETTING EQUIPMENT
							setTimeout(function(){GM_setValue("fetch",false);},0);
							
							setTimeout(function() {location.href='http://www.domainofheroes.com/ChooseCharacter.aspx?c='+GM_getValue("returnChar");},1000);
							}
					}	}
				}
			}
		}

	

	
	//Check to see if element already exists  
	if(!document.getElementById("Set"+e.target.id) && !fetchEquip) {
	var aimg=document.createElement('img')	;
	aimg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAgMAAAArG7R0AAAADFBMVEX///9Lshk4kQ0qgAA6op+QAAAACXBIWXMAAABIAAAASABGyWs+AAAAMklEQVQI12MIDQ1lyFq1miFrERAvWM2QwKANxNxAbM2Q/+E1Q9ZioPi61Qz1//8zAAEAe1MP/nY8OswAAABEelRYdENvbW1lbnQAAHjac03JLElNUUiqVAhILM1RCM5ILcpNzFNIyy9SCA9wzsksSCwq0VEIKE3KyUxWcMnPTczMAwDRxhIL+C2qCwAAAABJRU5ErkJggg%3D%3D";
InvList = document.getElementById(e.target.id);
var allDivs, thisDiv;
//TODO FIX this xpath to 
allDivs = document.evaluate("descendant::img[@class='h12px h12px-equip clickable equip']",InvList,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	newNode= aimg.cloneNode(true);
	newNode.title="Add to current set";
	newNode.id="Set"+e.target.id;
	//newNode.setAttribute('onclick',"");
	newNode.addEventListener('click',addEquipToCurrentSet,false);
	thisDiv.parentNode.appendChild(newNode);
    // do something with thisDiv
	}
	}
}

if ( document.getElementById('game2') != null )
{
	myequipSetData=eval(GM_getValue("equipSetData",["Blank"].toSource()));
	mySet=eval(GM_getValue("equip1",[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]].toSource()));
	myNames=eval(GM_getValue("equip2",[["","","","","","","","","","","","","","","",""]].toSource()));
	eqImgClass=eval(GM_getValue("equip3",[["","","","","","","","","","","","","","","",""]].toSource()));
	eqImgsrc=eval(GM_getValue("equip4",[["","","","","","","","","","","","","","","",""]].toSource()));
	eqLoc=eval(GM_getValue("equip5",'new Object()'));
	fetchEquip=GM_getValue("fetch",false);
	
	toonFetchList=eval(GM_getValue('toonFetchList','[]'));
	equipFetchList=eval(GM_getValue('equipFetchList','new Object()'));
	
	
	
  buildEquipManager();
  
  document.getElementById("muleList").addEventListener("DOMNodeInserted",muleupdate,false);
  document.getElementById("invList").addEventListener("DOMNodeInserted",muleupdate,false);
  document.getElementById("storageList").addEventListener("DOMNodeInserted",muleupdate,false);
  document.getElementById("tblTabs").getElementsByTagName('td')[4].addEventListener("click",eqClick1,false);
  
  //NEED SHOP LISTERNERS
  
  //document.getElementById("lnkMassMoveToMule").addEventListener("click",invMove,true);
  //document.getElementById("lnkMassMoveToStorageFromInv").addEventListener("click",invMove,true);
  //document.getElementById("lnkMassMoveToStorageFromMule").addEventListener("click",invMove,true);
  charS=document.getElementById("ctl00_PrimaryViewArea_TabOptions1_Options1_ddlCharacters").options;
  charData=new Object();
	for (var i=1;i<charS.length;i++){
		e1=charS[i].text.indexOf("Lvl");
		s1=charS[i].text.indexOf("]");
		charData[charS[i].value.toString()]=charS[i].text.substring(s1+1,e1);
		
	}
	GM_setValue("charList",charData.toSource());
	chid=document.getElementsByTagName('head')[0].getElementsByTagName('script')[1].innerHTML;
	GM_setValue("curChar",chid.substring(chid.indexOf('"')+1,chid.lastIndexOf('"')));
	curChar=GM_getValue("curChar");
	//alert(charData[chid.substring(chid.indexOf('"')+1,chid.lastIndexOf('"'))]);
	
	//Hijack Equip Function doesn't work
	
	// var oldFunction = unsafeWindow.Equip;
	// unsafeWindow.Equip = function(itmid) {
	// //check if we need to update what's equipped
	// cureq=eqLoc[itmid];
		
		// if (cureq){
			
			// eqLoc[itmid]="E"+GM_getValue("curChar");
			// GM_setValue("equip5",eqLoc.toSource());
			// }
	// //check what is equipped and where did it go
	// var item = unsafeWindow.CacheGet("ITM" + itmid);
	// var itc = unsafeWindow.CacheGet("ITC" + item.ItcId);
	// var img = document.getElementById("imgUnequip" + itc.EqlId);
	// var olde=img.getAttribute("itmid");
	// if (olde)
	// {	
		// cureq=eqLoc[olde];
		// if (cureq) {
		
			// setTimeout(function(eid) {return function() {findEquip(eid);};}(itmid),10000)
		// }
	// }
	// //alert('Hijacked! Argument was ' + text + '.');
	// return oldFunction(itmid);
	// };

	if (fetchEquip) {
		setTimeout(fetchEnd,3000);
	}
	
 }
  
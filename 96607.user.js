// ==UserScript==
// @name           سكربت حاسب نقاط المباني
// @version        v1.0
// @author         bodhiBrute
// @description    سكربت يعمل في المساعد , يساعدكم على حساب نقاط المباني , تم اعادة التعريب بواسطة كوبس , التعريب القديم بواسطة عربي اصيل .
// @include        http://*.tribalwars.*/help2.php?*
// ==/UserScript==

aktivfarbe = "#3aef8b";
inaktivfarbe = "#F7EED3";

try{
	css=document.styleSheets;
	for(j=0;j<css.length;j++){
		for(i=0;i<css[j].cssRules.length;i++){
			if(css[j].cssRules[i].selectorText=="table.vis td"){
				css[j].cssRules[i].style.backgroundImage = 'none';
				css[j].cssRules[i].style.backgroundColor = '';
			}
		}
	}
} catch(evt){}
function addCaption()
{

  var tab = document.forms[0].childNodes[1];
  var newTab = tab.cloneNode(false);
  
  var newTr = document.createElement("tr");
  newTr.className = "nowrap";
  
  var newTd = document.createElement("td");
  newTd.className = "small";
  
 
  newTd.innerHTML = "<p style=margin-top:10px; margin-bottom:0; padding-bottom:0; text-align:center; line-height:0><a target=_blank href=http://www.youtube.com/TWNewsAe><img src=http://www.hostk.info/upload/uploads/hostk12973590241.png alt=TwNewsAe style=border:0 width=320 height=60></a></p>";
  newTr.appendChild(newTd);
  
  newTab.appendChild(newTr);
  tab.parentNode.insertBefore(newTab, tab.previousSibling);
  tab.parentNode.insertBefore(tab.previousSibling.cloneNode(false), newTab);
}
addCaption();

function init() {
	rows=getTable().getElementsByTagName("tr");
	for(row=1;row<rows.length;row++){
		boxes=rows[row].getElementsByTagName("td");
		for(col=1;col<boxes.length;col++){
			if(boxes[col].innerHTML)
			boxes[col].addEventListener('click',(function(e,f) {return function() {change_status(e,f);}})(row,col), false);
			boxes[col].setAttribute('bgcolor',inaktivfarbe);
		}
	}
	switchmode=document.createElement('input');
	switchmode.type="checkbox";
	switchmode.id="mode_switch";
	if(document.URL.match("total")) switchmode.defaultChecked=true;
	sumdisplay=document.createElement('label');
	sumdisplay.id="sum_display";
	sumdisplay.innerHTML="0";
	sumdisplay.appendChild(switchmode);
	
		
	getTable().parentNode.insertBefore(sumdisplay,getTable());
	
}//eventlistener verteilen

function change_status(rowid,colid){
	if(document.getElementById("mode_switch").checked){
		rows=getTable().getElementsByTagName("tr");
		for(row=1;row<rows.length;row++){
			boxes=rows[row].getElementsByTagName("td");
			for(col=1;col<boxes.length;col++)
					if(col==colid&&row!=rowid) boxes[col].setAttribute('bgcolor',inaktivfarbe);
		}
	}
	box=getTable().getElementsByTagName("tr")[rowid].getElementsByTagName("td")[colid];
	if(box.getAttribute('bgcolor')!=aktivfarbe)
		box.setAttribute('bgcolor',aktivfarbe);
	else box.setAttribute('bgcolor',inaktivfarbe);
	addup();
}//status wechseln

function addup(){
	sum=0;
	boxes=getTable().getElementsByTagName("td");
	for(i=0;i<boxes.length;i++){
		if(boxes[i].getAttribute('bgcolor')==aktivfarbe)
		sum+=parseInt(boxes[i].innerHTML,10);
	}
	document.getElementById("sum_display").firstChild.nodeValue=sum;
}//aufaddieren

function getTable(){
	tabellen=document.getElementsByTagName("table");
	vistabellen=new Array();
	for(i=0;i<tabellen.length;i++){if(tabellen[i].className=="vis"){vistabellen.push(tabellen[i]);}}
	return vistabellen[1];
}//Zellen holen

init();
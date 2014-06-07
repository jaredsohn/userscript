// ==UserScript==
// @name           GF System Scout 

Navigation
// @namespace      GF
// @description    

Adds on system view 4 new Buttons which let you 

jump by one system in each direction (N E S W)
// 

@include        http://*.chosenspace.com/index.php
// @include        

http://*.galacticfleets.com/index.php?view=system*
// @include        

http://*.galacticfleets.com/index.php?go=scan*
// 

@include        

http://*.galacticfleets.com/index.php?view=sector*
// @include        

http://*.galacticfleets.com/index.php?view=galaxy*
// @exclude        

http://*.galacticfleets.com/index.php?

go=scan&sortnum=*
// @exclude        

http://*.galacticfleets.com/*/*
// ==/UserScript==
/**************************************************

**************************
/ possible Scoutmode Jump 

to Grid Settings:
/ var scoutmode="normal";     | 

jump to the same grid you're in
/ var 

scoutmode="random";     | randomly choose a grid as 

destination
/ var scoutmode=XXX;          | jump to 

grid XXX (note the missing " !)
***************************************************

*************************/
var scoutmode="normal";
/*************************************
 No Changes 

needed beyond this point
*************************************/
var 

alltags,thistag,newContent,getsys,system,sector,gri

d;
alltags=document.evaluate("//input

[@value='System']", document, null, 

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	

getsys=thistag.getAttribute('onclick');
	

system=getsys.split("sector_id=")[1].split("&")[0];
	

sector=getsys.split("system_id=")[1].split("&")[0];
	

if(!isNaN(scoutmode)) {
		if(scoutmode<=0) 

scoutmode=1;
		if(scoutmode>=401) 

scoutmode=400;
		grid=scoutmode;}
	

else if(scoutmode=="random") {grid=Math.floor

((Math.random()*400)+1);}
	else 

{grid=getsys.split("grid_id=")[1].split("'")[0];}
	

// Scouting
	function button

(width,value,onclick,off) {
		var 

newButton=document.createElement('input');
		

newButton.type='button';
		

newButton.style.width=width+'px';
		if

(off){
			newButton.value='Border 

('+value+')';
			

newButton.className='forms_btn_off';
			

newButton.setAttribute('disabled','disabled');
		

}
		else{
			

newButton.value=value;
			

newButton.className='forms_btn';
			

newButton.setAttribute('onclick',onclick);
		

}
		return newButton; 
	}
	var 

left,right,up,down,newContent,newTable,newTR,newTD,

SBtn,GoBtn,BtnCS,BtnType,Btnclass,Btnvalue;
	

system=system*1;sector=sector*1;
	var 

left=system-1; var right=system+1; var up=system-

20; var down=system+20;
	var usu="";var dsu="";var 

lsu="";var rsu="";
	switch(sector) {
		

case 150: case 153: case 168: case 172: case 189: 

case 190: case 192: case 208:
		case 211: 

case 213: case 228: case 230: case 232: case 249: 

case 251: case 253:
		starSW: switch

(system) {
			case 192: case 212: 

left-=2; lsu=" (sun)"; break starSW;
			

case 209: case 189: right+=2; rsu=" (sun)"; break 

starSW;
			case 230: case 231: up-=40; 

usu=" (sun)"; break starSW;
			

case 170: case 171: down+=40; dsu=" (sun)"; break 

starSW;
		}
	}
	var ubo=false;var 

dbo=false;var lbo=false;var rbo=false;
	if(system 

>= 21 && system <= 380)       {}
	else if

(system >= 1 && system <= 20)    { ubo=true; }
	

else if(system >= 381 && system <= 400) { dbo=true; 

}
	var name=system.toString();
	var 

x=name.length;
	var mid=name.charAt(x-2);
	

LRBtn: if(mid%2 == 0) {
		var 

last=name.charAt(x-1);
		switch (last) {
		

	case "1" : lbo=true; break LRBtn;
		

	case "0" : rbo=true; break LRBtn;
		

}
	}
	var newRef=location.href.split

('/');
		newRef=newRef[0]+"//"+newRef[2]

+"/";
	newTable=document.createElement('table'); 

newTable.align='center'; newTable.setAttribute

('cellspacing',2); newTable.setAttribute

('cellpadding',0); newTable.border=0; // 

newTable.style.width='154px';
	

newTR=document.createElement('tr'); 

newTable.appendChild(newTR);
	

newTD=document.createElement('td'); 

newTD.align='center'; newTD.setAttribute

('colspan',2); newContent=document.createTextNode

('..:: System Navigation ::..'); newTD.appendChild

(newContent); newTR.appendChild(newTD);
	

newTR=document.createElement('tr'); 

newTable.appendChild(newTR);
	

newTD=document.createElement('td'); 

newTD.align='center'; newTD.setAttribute

('colspan',2); newTR.appendChild(newTD);
		

newContent=button

(70,'Up'+usu,"location.href=\'"+newRef+"functions/u

ser_move.php?

sector_id="+sector+"&system_id="+up+"&grid_id="+gri

d+"\';",ubo);
		newContent.id='uButton'; 

newTD.appendChild(newContent);
	

newTR=document.createElement('tr'); 

newTable.appendChild(newTR);
	

newTD=document.createElement('td'); 

newTR.appendChild(newTD);
		

newContent=button

(70,'Left'+lsu,"location.href=\'"+newRef+"functions

/user_move.php?

sector_id="+sector+"&system_id="+left+"&grid_id="+g

rid+"\';",lbo);
		newContent.id='lButton'; 

newTD.appendChild(newContent);
	

newTD=document.createElement('td'); 

newTR.appendChild(newTD);
		

newContent=button

(70,'Right'+rsu,"location.href=\'"+newRef+"function

s/user_move.php?

sector_id="+sector+"&system_id="+right+"&grid_id="+

grid+"\';",rbo);
		

newContent.id='rButton'; newTD.appendChild

(newContent);
	newTR=document.createElement('tr'); 

newTable.appendChild(newTR);
	

newTD=document.createElement('td'); 

newTD.align='center'; newTD.setAttribute

('colspan',2); newTR.appendChild(newTD);
		

newContent=button

(70,'Down'+dsu,"location.href=\'"+newRef+"functions

/user_move.php?

sector_id="+sector+"&system_id="+down+"&grid_id="+g

rid+"\';",dbo);
		newContent.id='dButton'; 

newTD.appendChild(newContent);
	var 

newSection=document.createElement('span');
		

newSection.setAttribute('style','text-

align:center;');
	var 

newTR=document.createElement("tr");
		var 

newTD=document.createElement("td");
			

newTD.setAttribute("colspan",3);
			

newTD.setAttribute("align","center");
			

newTD.appendChild(newTable);
		

newTR.appendChild(newTD);
	//insertion
	

thistag.parentNode.parentNode.parentNode.insertBefo

re(newTR, 

thistag.parentNode.parentNode.parentNode.nextSiblin

g);
}

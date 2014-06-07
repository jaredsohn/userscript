// ==UserScript==
// @name           CS2 System Scout Navigation
// @namespace      CS
// @description    Adds on sector view 4 new Buttons which let you jump by one sector in each direction (N E S W)
// @include        http://*.chosenspace.com/index.php
// @include        http://*.chosenspace.com/index.php?view=sector*
// @include        http://*.chosenspace.com/index.php?go=scan_sector*
// @include        http://*.chosenspace.com/index.php?go=scan_grid*
// @include        http://*.chosenspace.com/index.php?view=system*
// @include        http://*.chosenspace.com/index.php?view=galaxy*
// @exclude        http://*.chosenspace.com/index.php?go=scan_grid&sortnum=*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
/****************************************************************************
/ possible Scoutmode Jump to Grid Settings:
/ var scoutmode="normal";     | jump to the same grid you're in (default)
/ var scoutmode="random";     | randomly choose a grid as destination
/ var scoutmode="?";          | jump to grid number ?
****************************************************************************/
var scoutmode="normal";
/****************************************************************************
/ posible jumptypes:
/ var jumptype=true;          | use Lightspeed (default)
/ var jumptype=false;         | use Hyperjump
****************************************************************************/
var jumptype=true;
/****************************************************************************
/ BLACKLIST : Never jump here. Syntax:
/ system1:{sector1:{grid1:true,grid2:true},sector2:{grid1:false,...,gridx:true}},
/ system2:{sector1:{grid1:true}},system3:{sector1:{grid1:false}}
/ NOTE look at the provided examples with systems 0 and 1
/      especially when to set the commas, and when not.
/      note that only TRUE will stop to use  grid. FALSE is like not setting.
/      you might use the false setting to list own faction minefields...
****************************************************************************/
var blacklist={
	0:{
		170:{190:true,191:true},
		171:{190:false,191:true}
	},
	1:{
		170:{180:false}
	}
};
/*************************************
/ No Changes needed beyond this point
*************************************/
var alltags,thistag,newContent,getsys,system,sector,grid;
alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	if(jumptype){
		jumptype="lightspeed";
	}
	else{
		jumptype="hyperjump";
	}
	getsys=thistag.getAttribute('onclick');
	system=getsys.split("system_id=")[1].split("&")[0];
	sector=getsys.split("sector_id=")[1].split("&")[0];
	if(!isNaN(scoutmode*1)) {
		if(scoutmode<=0) scoutmode=1;
		if(scoutmode>=401) scoutmode=400;
		grid=scoutmode;}
	else if(scoutmode=="random") {grid=Math.floor((Math.random()*400)+1);}
	else {grid=getsys.split("grid_id=")[1].split("'")[0];}
	system=system*1;
	sector=sector*1;
	grid=grid*1;
	// Scouting
	function button(width,value,onclick,off) {
		var newButton=document.createElement('input');
		newButton.type='button';
		newButton.style.width=width+'px';
		if(off){
			newButton.value='Border ('+value+')';
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
	var left,right,up,down,newContent,newTable,newTR,newTD,SBtn,GoBtn,BtnCS,BtnType,Btnclass,Btnvalue;
	var left=sector-1;
	var right=sector+1;
	var up=sector-20;
	var down=sector+20;
	var usu="";var dsu="";var lsu="";var rsu="";
	switch(system) {
		case 150: case 153: case 168: case 172: case 189: case 190: case 192: case 208:
		case 211: case 213: case 228: case 230: case 232: case 249: case 251: case 253:
		starSW: switch(sector) {
			case 192: case 212: left-=2; lsu=" (sun)"; break starSW;
			case 209: case 189: right+=2; rsu=" (sun)"; break starSW;
			case 230: case 231: up-=40; usu=" (sun)"; break starSW;
			case 170: case 171: down+=40; dsu=" (sun)"; break starSW;
		}
	}
	var ubo=false;var dbo=false;var lbo=false;var rbo=false;
	if(sector >= 21 && sector <= 380)       {}
	else if(sector >= 1 && sector <= 20)    { ubo=true; }
	else if(sector >= 381 && sector <= 400) { dbo=true; }
	var name=sector.toString();
	var x=name.length;
	var mid=name.charAt(x-2);
	LRBtn: if(mid%2 == 0) {
		var last=name.charAt(x-1);
		switch (last) {
			case "1" : lbo=true; break LRBtn;
			case "0" : rbo=true; break LRBtn;
		}
	}

function checkBlackList(sy,se,gr){
	if(sy in blacklist){
		if(se in blacklist[sy]){
			if(gr in blacklist[sy][se]){
				if(blacklist[sy][se][gr]){
					var gridOriginal=gr;
					while(blacklist[sy][se][gr]){
						gr=gr+1;
						if(gr>400)gr=1;
						if(gridOriginal==gr){
							return true;
						}}}}}}
	return gr;}
var lg=checkBlackList(system,left,grid);
if(lg===true){lsu+=" [B]";lbo=true;}
if(lg!=grid){lsu+=" [*]";}
var rg=checkBlackList(system,right,grid);
if(rg===true){rsu+=" [B]";rbo=true;}
if(rg!=grid){rsu+=" [*]";}
var ug=checkBlackList(system,up,grid);
if(ug===true){usu+=" [B]";ubo=true;}
if(ug!=grid){usu+=" [*]";}
var dg=checkBlackList(system,down,grid);
if(dg===true){dsu+=" [B]";dbo=true;}
if(dg!=grid){dsu+=" [*]";}

	var newRef=location.href.split('/');
		newRef=newRef[0]+"//"+newRef[2]+"/";
	newTable=document.createElement('table'); newTable.align='center'; newTable.setAttribute('cellspacing',2); newTable.setAttribute('cellpadding',0); newTable.border=0; // newTable.style.width='154px';
	newTR=document.createElement('tr'); newTable.appendChild(newTR);
	newTD=document.createElement('td'); newTD.align='center'; newTD.setAttribute('colspan',2); newContent=document.createTextNode('..:: System Navigation ::..'); newTD.appendChild(newContent); newTR.appendChild(newTD);
	newTR=document.createElement('tr'); newTable.appendChild(newTR); newTD=document.createElement('td'); newTR.appendChild(newTD);
		newContent=button(70,'Up'+usu,"location.href=\'"+newRef+"functions/"+jumptype+".php?system_id="+system+"&sector_id="+up+"&grid_id="+ug+"\';",ubo);
		newContent.id='uButton'; newTD.appendChild(newContent);
	newTD=document.createElement('td'); newTR.appendChild(newTD);
		newContent=button(70,'Down'+dsu,"location.href=\'"+newRef+"functions/"+jumptype+".php?system_id="+system+"&sector_id="+down+"&grid_id="+dg+"\';",dbo);
		newContent.id='dButton'; newTD.appendChild(newContent);
	newTR=document.createElement('tr'); newTable.appendChild(newTR); newTD=document.createElement('td'); newTR.appendChild(newTD);
		newContent=button(70,'Left'+lsu,"location.href=\'"+newRef+"functions/"+jumptype+".php?system_id="+system+"&sector_id="+left+"&grid_id="+lg+"\';",lbo);
		newContent.id='lButton'; newTD.appendChild(newContent);
	newTD=document.createElement('td'); newTR.appendChild(newTD);
		newContent=button(70,'Right'+rsu,"location.href=\'"+newRef+"functions/"+jumptype+".php?system_id="+system+"&sector_id="+right+"&grid_id="+rg+"\';",rbo);
		newContent.id='rButton'; newTD.appendChild(newContent);
	var newSection=document.createElement('span');
		newSection.setAttribute('style','text-align:center;');
	var newTR=document.createElement("tr");
		var newTD=document.createElement("td");
			newTD.setAttribute("colspan",3);
			newTD.setAttribute("align","center");
			newTD.appendChild(newTable);
		newTR.appendChild(newTD);
	//insertion
	thistag.parentNode.parentNode.parentNode.insertBefore(newTR, thistag.parentNode.parentNode.parentNode.nextSibling);
}

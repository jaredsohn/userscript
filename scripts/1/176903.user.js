// ==UserScript==
// @name           Sector & System Navigation
// @namespace      CS
// @description    Adds buttons for one-click navigation within Sector and System. Jump to another sector moves you to the same grid.
// @include        http://*.chosenspace.com/index.php
// @include        http://*.chosenspace.com/index.php?view=sector*
// @include        http://*.chosenspace.com/index.php?go=scan_grids*
// @include        http://*.chosenspace.com/index.php?go=scan_sector*
// @include        http://*.chosenspace.com/index.php?view=system*
// @include        http://*.chosenspace.com/index.php?view=galaxy*
// @exclude        http://*.chosenspace.com/index.php?go=scan_grids&sortnum=*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
/****************************************************************************
/ possible Scoutmode Jump to Grid Settings:
/ var scoutmode="normal";     | jump to the same grid you're in
/ var scoutmode="scrub";     | choose a grid as destination
/ var scoutmode=XXX;          | jump to grid XXX (note the missing " !)
****************************************************************************/
var scoutmode="normal";
/*************************************
 No Changes needed beyond this point
*************************************/
var alltags,thistag,newContent,getsys,system,sector,grid;
alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);

if(thistag){
	getsys=thistag.getAttribute('onclick');
	system=getsys.split("system_id=")[1].split("&")[0];
	sector=getsys.split("sector_id=")[1].split("&")[0];
	if(!isNaN(scoutmode)) {
		if(scoutmode<=0) scoutmode=1;
		if(scoutmode>=401) scoutmode=400;
		grid=scoutmode;}
	else if(scoutmode=="random") {grid=Math.floor((Math.random()*400)+1);}
	else {grid=getsys.split("grid_id=")[1].split("'")[0];}
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
	var left,right,up,down,lup,rup,ldown,rdown,sleft,sright,sup,sdown,slup,srup,sldown,srdown,newContent,newTable,newTR,newTD,SBtn,GoBtn,BtnCS,BtnType,Btnclass,Btnvalue;
	sector=sector*1;system=system*1;grid=grid*1;
	var left=grid-1; var right=grid+1; var up=grid-20; var down=grid+20; var lup=grid-21; var rup=grid-19; var ldown=grid+19; var rdown=grid+21;
	var sleft=sector-1; var sright=sector+1; var sup=sector-20; var sdown=sector+20; var slup=sector-21; var srup=sector-19; var sldown=sector+19; var srdown=sector+21;
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
	if(grid >= 21 && grid <= 380)       {}
	else if(grid >= 1 && grid <= 20)    { ubo=true; }
	else if(grid >= 381 && grid <= 400) { dbo=true; }
	var name=grid.toString();
	var x=name.length;
	var mid=name.charAt(x-2);
	LRBtn: if(mid%2 == 0) {
		var last=name.charAt(x-1);
		switch (last) {
			case "1" : lbo=true; break LRBtn;
			case "0" : rbo=true; break LRBtn;
		}
	}
	var newRef=location.href.split('/');
		newRef=newRef[0]+"//"+newRef[2]+"/";
	newTable=document.createElement('table'); newTable.align='center'; newTable.setAttribute('cellspacing',2); newTable.setAttribute('cellpadding',0); newTable.border=0; // newTable.style.width='154px';
	newTR=document.createElement('tr'); newTable.appendChild(newTR);
	newTD=document.createElement('td'); newTD.align='center'; newTD.setAttribute('colspan',7); newContent=document.createTextNode(':: Sector :::: System ::'); newTD.appendChild(newContent); newTR.appendChild(newTD);
	
// Sector Up	
	
	newTR=document.createElement('tr'); newTable.appendChild(newTR); newTD=document.createElement('td'); newTR.appendChild(newTD);
	
		newContent=button(15,'1',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sector+"&grid_id="+lup+"\';",ubo);
		newContent.id='g1Button'; newTD.appendChild(newContent);
	
		newContent=button(15,'2',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sector+"&grid_id="+up+"\';",ubo);
		newContent.id='g2Button'; newTD.appendChild(newContent);
	
		newContent=button(15,'3',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sector+"&grid_id="+rup+"\';",ubo);
		newContent.id='g3Button'; newTD.appendChild(newContent);
		
// System Up

		newContent=document.createTextNode(' -- '); newTD.appendChild(newContent); newTR.appendChild(newTD);

		newContent=button(15,'1',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+slup+"&grid_id="+grid+"\';",ubo);
		newContent.id='s1Button'; newTD.appendChild(newContent);
	
		newContent=button(15,'2',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sup+"&grid_id="+grid+"\';",ubo);
		newContent.id='s2Button'; newTD.appendChild(newContent);
	
		newContent=button(15,'3',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+srup+"&grid_id="+grid+"\';",ubo);
		newContent.id='s3Button'; newTD.appendChild(newContent);
		
// Sector Middle		
		
	newTR=document.createElement('tr'); newTable.appendChild(newTR); newTD=document.createElement('td'); newTR.appendChild(newTD);
		newContent=button(15,'4',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sector+"&grid_id="+left+"\';",lbo);
		newContent.id='g4Button'; newTD.appendChild(newContent);
	
		newContent=button(15,'x',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sector+"&grid_id="+grid+"\';",rbo);
		newContent.id='gxButton'; newTD.appendChild(newContent);
	
		newContent=button(15,'6',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sector+"&grid_id="+right+"\';",rbo);
		newContent.id='g6Button'; newTD.appendChild(newContent);
		
// System Middle

		newContent=document.createTextNode(' -- '); newTD.appendChild(newContent); newTR.appendChild(newTD);		
		
		newContent=button(15,'4',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sleft+"&grid_id="+grid+"\';",lbo);
		newContent.id='s4Button'; newTD.appendChild(newContent);
	
		newContent=button(15,'x',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sector+"&grid_id="+grid+"\';",rbo);
		newContent.id='sxButton'; newTD.appendChild(newContent);
	
		newContent=button(15,'6',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sright+"&grid_id="+grid+"\';",rbo);
		newContent.id='s6Button'; newTD.appendChild(newContent);
		
// Sector Down
		
	newTR=document.createElement('tr'); newTable.appendChild(newTR); newTD=document.createElement('td'); newTR.appendChild(newTD);
		newContent=button(15,'7',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sector+"&grid_id="+ldown+"\';",dbo);
		newContent.id='g7Button'; newTD.appendChild(newContent);

		newContent=button(15,'8',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sector+"&grid_id="+down+"\';",dbo);
		newContent.id='g8Button'; newTD.appendChild(newContent);
	
		newContent=button(15,'9',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sector+"&grid_id="+rdown+"\';",dbo);
		newContent.id='g9Button'; newTD.appendChild(newContent);
		
// System Down

		newContent=document.createTextNode(' -- '); newTD.appendChild(newContent); newTR.appendChild(newTD);		
		
		newContent=button(15,'7',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sldown+"&grid_id="+grid+"\';",dbo);
		newContent.id='s7Button'; newTD.appendChild(newContent);

		newContent=button(15,'8',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+sdown+"&grid_id="+grid+"\';",dbo);
		newContent.id='s8Button'; newTD.appendChild(newContent);
	
		newContent=button(15,'9',"location.href=\'"+newRef+"functions/lightspeed.php?system_id="+system+"&sector_id="+srdown+"&grid_id="+grid+"\';",dbo);
		newContent.id='s9Button'; newTD.appendChild(newContent);

	
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

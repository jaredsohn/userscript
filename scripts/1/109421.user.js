// ==UserScript==
// @match http://www.trafficera.com/*
// @name Traffic Era Credits/Tokens
// @description This script will help you find valuable offers in the market by displaying credits/tokens after each credit offer.
// ==/UserScript==
var table=document.getElementsByClassName("table_mp");
for(var u=0;u<table.length;u++){
	t=table[u];
	for(var i=0;i<t.rows.length;i++){
		row=t.rows[i];
		p_cell=row.cells[1].innerHTML;
		t_cell=row.cells[4].innerHTML;
		if(p_cell.indexOf("Time Credits")!=-1){
			//Credits
			cs=p_cell.indexOf("\">");
			ce=p_cell.indexOf(" ",cs);
			c=p_cell.substr(cs+2,ce-cs-2);
			credits=c.replace(",","");
			//Tokens
			ts=t_cell.indexOf("<strong>")+8;
			te=t_cell.indexOf("</strong",ts);
			tokens=t_cell.substr(ts,te-ts);
			//Calculated
			c=Math.round((credits/tokens)*100)/100;
			console.log(c);
			//Update cell
			uc=p_cell.replace("Time Credits","Time Credits <span style='color:black;'>("+c+")</span>");
			row.cells[1].innerHTML=uc;
		}
	}
}
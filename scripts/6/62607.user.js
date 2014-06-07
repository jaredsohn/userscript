// ==UserScript==
// @name           NeoBuxUltimateGraph
// @namespace      http://userscripts.org/users/ddsx
// @description    Simulate a histogram like that of the ultimate users of Neobux, for non-ultimate users
// @include        http://www.neobux.com/?u=c&s=r*
// @include        https://www.neobux.com/?u=c&s=r*
// @exclude        http://www.neobux.com/v/*
// @exclude        https://www.neobux.com/v/*
// @exclude        http://www.neobux.com/refstat/*
// @exclude        https://www.neobux.com/refstat/*
// @exclude        http://www.neobux.com/?u=c&s=rba
// @exclude        https://www.neobux.com/?u=c&s=rba
// @exclude        http://www.neobux.com/?u=c&s=rs*
// @exclude        https://www.neobux.com/?u=c&s=rs*

// @author         ddsx
// @version        1.0.0

// ==/UserScript==

/*          < DEVELOPER NOTES >
 *
 * To include: http://www.neobux.com/?u=c&s=r&sp=1&ss1=1&ss2=1&ss3=2&rec_v=C832B25A976A70B4&rec_n=8B38C51A55E7D10E613313A492ACC67B
 * 			   http://www.neobux.com/?u=c&s=r&sp=1&ss1=1&ss2=1&ss3=2&rec_v=0CE41AD86E2436D0613313A492ACC67B&rec_n=B684B42F7923F4B4613313A492ACC67B
 *			   http://www.neobux.com/?u=c&s=r&sp=1&ss1=1&ss2=1&ss3=2&rec_up=1&rec_err=0 - sempre cosÃ¬
 *
 * Some examples of the real histogram:
 *			   http://www.neobuxinfo.com/uploads/2/6/0/9/2609979/9646192.jpg
 *			   http://img2.pict.com/44/37/d3/1829942/0/neobux3a2520the2520innovation252.png
 *			   http://img2.pict.com/59/a4/ee/1829953/0/neobux3a2520the2520innovation252.png
 *
 *          </ DEVELOPER NOTES >
 */

/* ### START LANGUAGE CONFIGURATION ### */
var lang_noclicks = "No clicks";     //max 10 chars, no start/end spaces
var lang_today = "Today";            //max 10 chars, no start/end spaces
var lang_yesterday = "Yesterday";    //max 10 chars, no start/end spaces

var lang_pagewarning = 'Warning:\nthe NeoBuxUltimateGraph script currently works only with the first page of the referrals.\n\nThe histograms will be temporarily disabled to prevent loss of user configuration.';
/* ### END LANGUAGE CONFIGURATION ### */

var RefNameCell = 3;
var LastClickCell = 6;
var ClicksCell = 7;
var AfterGraphCell = 10;
var ref_setting = 'rentedref';
var testmode = 0; // If testmode = 1, the changes will not be saved

var pageUrl = document.location.href;

// Check if it is the direct ref page
var directRefRegex = /^http[s]?:\/\/www\.neobux\.com\/\?u\=c&s\=r&ss3\=1/;
if(directRefRegex.test(pageUrl)) { 
	// Yes, it is. Change config vars.
	RefNameCell = 1;
	LastClickCell = 4;
	ClicksCell = 5;
	AfterGraphCell = 8;
	ref_setting = 'directref';
}

// Check if this is or not the first page of the refs.
// Some URL examples (&sp=x; where x is the page number):
// http://www.neobux.com/?u=c&s=r&rlpp=10&ss1=1&ss2=1&ss3=2&sp=1 //Page 1
// http://www.neobux.com/?u=c&s=r&sp=1&ss1=1&ss2=1&ss3=2         //Page 1
// http://www.neobux.com/?u=c&s=r&sp=2&ss1=1&ss2=1&ss3=2         //Page 2
var pageRegex = /^http[s]?:\/\/www\.neobux\.com\/\?u\=c&s\=r.*&sp\=[2-9]+/;
if(pageRegex.test(pageUrl)) { 
	alert(lang_pagewarning);
	exit;
}

var headerLocation = document.evaluate('/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td[2]/div/form/div/table/tbody/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

var header = document.createElement('td');
header.setAttribute('class','bgt');
header.setAttribute('nowrap','');
header.appendChild(document.createTextNode(''));

headerLocation.insertBefore(header, headerLocation.childNodes[7]);

var rows = document.evaluate('/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td[2]/div/form/div/table/tbody', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

var doc_lines=new Array();
doc_lines = GM_getValue(ref_setting,'').split('\n');

for(var i=0;i<doc_lines.length; i++) {
	doc_lines[i] = doc_lines[i].split('|');
}

// Some lines for testing purpose:
//alert(GM_getValue(ref_setting,''));
//alert(GM_getValue('directref',''));
var doc_save="";

for(var i=0;i<rows.childNodes.length; i++) {


	if ((rows.childNodes[i].getAttribute('onmouseover')=="this.style.backgroundColor='#fff'") ||
			(rows.childNodes[i].getAttribute('onmouseover')=="this.style.backgroundColor='#fd0'")  ) // For each row in the page
	{  
		var refname = trim(rows.childNodes[i].childNodes[RefNameCell].innerHTML.split("&nbsp;").join(" "));
		var lastclick = trim(trim(rows.childNodes[i].childNodes[LastClickCell].innerHTML.split("&nbsp;").join(" ")).substring(0,10).split("<font").join("").split("<").join(""));
		var clicks = trim(rows.childNodes[i].childNodes[ClicksCell].innerHTML.split("&nbsp;").join(" "));
		var lastgraphdate = (new Date()).getTime();
		var c = new Array(0,0,0,0,0,0,0,0,0,0); // Columns
		
		if (lastclick == lang_today)
		lastclick = (new Date()).getTime();
		else if (lastclick == lang_yesterday)
		lastclick = new Date((new Date().setDate((new Date()).getDate()-1))).getTime();
		else if (lastclick == lang_noclicks)
		lastclick = new Date((new Date("2008/01/01"))).getTime();
		else
		lastclick = new Date((new Date(lastclick))).getTime();
		
		for(var j=0;j<doc_lines.length; j++) { // Find the ref stored corresponding to the current row
			if (doc_lines[j][0] == refname) {  // Compare the current with ref to see if it matches the one stored
				var gm_lastgraphdate = new Date(parseInt(doc_lines[j][3]));
				gm_lastgraphdate.setHours(0);
				gm_lastgraphdate.setMinutes(1);
				gm_lastgraphdate.setSeconds(0);
				gm_lastgraphdate.setMilliseconds(0);

				var lastclickdate = new Date(lastclick);
				lastclickdate.setHours(0);
				lastclickdate.setMinutes(1);
				lastclickdate.setSeconds(0);
				lastclickdate.setMilliseconds(0);
				
				var now = new Date();
				now.setHours(0);
				now.setMinutes(1);
				now.setSeconds(0);
				now.setMilliseconds(0);

				for (var k=0; k<10; k++)
				{
					c[k] = parseInt(doc_lines[j][4+k]);
				}
				if (gm_lastgraphdate.getTime() == now.getTime()) {  // if the last column of the chart = today then...
					c[9] += parseInt(clicks) - parseInt(doc_lines[j][2]);
				}
				else {  // Today was not ever seen the chart: Create X new columns
					var daydiff = Math.ceil((now.getTime() - gm_lastgraphdate.getTime()) / (1000*60*60*24));
					for (var k=0; k<10; k++) // Move left X columns
					{
						if ((k + daydiff) > 9)
						{ c[k] = 0;}
						else
						{ c[k] = c[k+daydiff]; }
					}
					// Enter the new value in the column corresponding to the last click
					var lastclickdiff = Math.ceil((now.getTime() - lastclickdate.getTime()) / (1000*60*60*24));
					if (((9-lastclickdiff)>=0) && ((9-lastclickdiff)<=9)) {
						c[9-lastclickdiff] += parseInt(clicks) - parseInt(doc_lines[j][2]);
					}
				}
			}
		}
		
		doc_save += refname + "|" + lastclick + "|" + clicks + "|" + lastgraphdate + "|" + c[0] +  "|" + c[1] +  "|" + c[2] +  "|" + c[3] +  "|" + c[4] +  "|" + c[5] +  "|" + c[6] +  "|" + c[7] +  "|" + c[8] +  "|" + c[9] + "\n";
		
		// Code to build and show the graph
		var values = new Array(parseInt(c[0])*2,parseInt(c[1])*2,parseInt(c[2])*2,parseInt(c[3])*2,parseInt(c[4])*2,parseInt(c[5])*2,parseInt(c[6])*2,parseInt(c[7])*2,parseInt(c[8])*2,parseInt(c[9])*2);
		for(var vv = 0; vv < values.length; vv++) {
			if (values[vv] > 9) {
				values[vv] = 9;
			}
		}
		
		var row = document.evaluate('/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td[2]/div/form/div/table/tbody/tr['+(i+1)+']', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		var cell = document.evaluate('/html/body/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td[2]/div/form/div/table/tbody/tr['+(i+1)+']/td['+AfterGraphCell+']', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		
		var graph = document.createElement('td');
		graph.setAttribute('class','l');
		graph.setAttribute('nowrap','');
		graph.setAttribute('align','center');
		
		var resultHTML = '<div style="vertical-align: bottom" align="center"> ';
		
		for (var idcln = 0; idcln<10; idcln++) {
			var color = '#000000';
			var marginright = 'margin-right: -3px; ';
			if (values[idcln] < 2) 
			color = '#FF0000';
			if (idcln == 9) 
			marginright = '';
			resultHTML += '<div style="border-width: 0px; border-style: none; padding: 0px; ' + marginright + 'height: ' + (values[idcln] + 1) + 'px; width: 2px; background-color: ' + color + '; display: inline-block;"></div> ';
		}
		resultHTML += '</div>';
		graph.innerHTML = resultHTML;
		
		row.insertBefore(graph, cell);
	}   
	
}

if (testmode == 0) {
	GM_setValue(ref_setting,doc_save);
}

function trim(stringa){
	while (stringa.substring(0,1) == ' '){
		stringa = stringa.substring(1, stringa.length);
	}
	while (stringa.substring(stringa.length-1, stringa.length) == ' '){
		stringa = stringa.substring(0,stringa.length-1);
	}
	return stringa;
}
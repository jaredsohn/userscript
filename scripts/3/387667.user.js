// ==UserScript==
// @name        xperteleven Förändringsrapporter 4.0
// @include     *www.xperteleven.com/changeReports.aspx?dh=*&TeamID=*
// @include			*www.xperteleven.com/transfers.aspx*
// @grant       GM_xmlhttpRequest
// ==/UserScript==


// FOR CHROME
// @name        xperteleven Förändringsrapporter 4.0
// @match     	http://www.xperteleven.com/changeReports.aspx?dh=*&TeamID=*
// @match     	https://www.xperteleven.com/changeReports.aspx?dh=*&TeamID=*
// @match     	http://www.xperteleven.com/transfers.aspx*
// @match     	https://www.xperteleven.com/transfers.aspx*
// @run-at 			document-end


function copyarray(arrayin) {
	
	var arr = [];
	for(var i = 0; i < arrayin.length; i++) arr.push(arrayin[i]);
	return arr;
}

function printvalues() {

	for(var i=0, len=localStorage.length; i<len; i++) {

		var key = localStorage.key(i);
		var value = localStorage[key];
		console.log(key + " => " + value);
	}
}

function twodeci(inpara) {
	
	return Math.round(inpara*100)/100;
}

function inbounds(low, high, ref) {
	
	return Math.round(low) === ref || Math.round(high) === ref;
}

function supports_html5_storage() {
		
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

/*function drawbar(lowest, highest, visible) {
	
	var lowbound=Math.round((lowest+0.5-visible)*100);
	var highbound=Math.round((highest+0.5-visible)*100);

	var parent=document.getElementById("mynode2");

	for(var iii=1000;iii<=3000;iii+=1000){
		for(var yyy=0;yyy<100;yyy++)
		{
			var newElement = document.createElement('div');
			newElement.id = iii + yyy;
			newElement.style = "float: left; margin-left: 1px; height: 15px; width: 3px; background-color: #cccccc;";	
			if(yyy >= lowbound && yyy <= highbound)
				newElement.style.backgroundColor = "green";
			if(iii !== 2000)
				newElement.style.backgroundColor = "#F0F0F0";
			if(yyy === 49 && iii !== 2000)
				newElement.style.borderRight = "black 1px solid";
			if(yyy === 49 && iii === 2000)
				newElement.style.borderRight = "#F0F0F0 1px solid";
			if(yyy === 50)
				newElement.style.marginLeft = "0";

			parent.appendChild(newElement);
		}
		newElement = document.createElement('div');
		newElement.style = "clear: both;";	
		parent.appendChild(newElement);
	}
}*/

function drawbar(lowest, highest, visible) {
	
	var lowbound=Math.round((lowest+0.5-visible)*100);
	var highbound=Math.round((highest+0.5-visible)*100);

	var parent=document.getElementById("mynode2");

	for(var iii=1000;iii<=3000;iii+=1000){
		for(var yyy=0;yyy<100;yyy++)
		{
			var newElement = document.createElement('div');
			newElement.id = yyy;
			newElement.style.backgroundColor = "#cccccc";
			newElement.style.marginLeft = "1px";
			newElement.style.width = "3px";
			newElement.style.height = "15px";
			newElement.style.float = "left";
			if(yyy >= lowbound && yyy <= highbound)
				newElement.style.backgroundColor = "green";
			if(iii !== 2000)
				newElement.style.backgroundColor = "#F0F0F0";
			if(yyy === 49 && iii !== 2000)
				newElement.style.borderRight = "black 1px solid";
			if(yyy === 49 && iii === 2000)
				newElement.style.borderRight = "#F0F0F0 1px solid";
			if(yyy === 50)
				newElement.style.marginLeft = "0";

			parent.appendChild(newElement);
		}
		newElement = document.createElement('div');
		newElement.style.clear = "both";	
		parent.appendChild(newElement);
	}
}

function dotable(mini, maxi) {
	
	var string = "";
	string += "<table style='border-collapse: collapse;'><tr><th>Min</th><th></th><th>Max</th></tr>";
	string += "<tr><td>" + mini.toFixed(2) + "</td><td>-</td><td>" + maxi.toFixed(2) + "</td></tr></table>";
	return string;
}

function calculate() {
    
	var uglystring = document.getElementsByClassName('tableinsection')[1].innerHTML;
	var arr = uglystring.split('<span nowrap="" title="');

	var trace = new Array();
	for(var i = 1; i < arr.length; i++)
	{
		var mess = arr[i].replace( /<\/?[^>]+(>|$)/g, "" );
		mess = mess.replace( '">', '' );
		mess = mess.replace( /\s+/g, ' ' );
		var vals = mess.split(' ');
		trace.push( parseFloat(vals[0]) );
		trace.push( parseFloat( vals[1].replace('%', '') ) );
	}

	if(trace.length > 0)
	{
		var currentskill = trace[0];
		
		trace.reverse();
		
		var firstskill = trace[1];
		
		var grid = new Array();
		
		for(z = 0; z < trace.length; z = z + 2)
		{
			var newarr = new Array();
			newarr[0] = trace[z];
			newarr[1] = trace[z+1];
			grid.push(newarr);
		}
		
		var loopstart;
		var loopend;

		if(supports_html5_storage())
		{
			var dropdownbox = document.getElementById("ctl00_cphMain_dpdPlayers");
			var playerid = dropdownbox.options[dropdownbox.selectedIndex].value;

			var startskill = parseInt(localStorage.getItem(playerid));
			//alert("Skill at purchase: " + startskill + "\nFirst shown skill here: " + firstskill);
			if( isNaN(startskill) || Math.abs(firstskill-startskill) > 2 )
			{
				loopstart = 100*(grid[0][1]-2.5);
				loopend = 100*(grid[0][1]+2.49);
			}
			else
			{
				loopstart = 100*(startskill-0.5);
				loopend = 100*(startskill+0.49);
			}
		}
		else
		{
			loopstart = 100*(grid[0][1]-2.5);
		  loopend = 100*(grid[0][1]+2.49);
		}
		
		//alert(loopstart + " " + loopend);
		
		var results = new Array();
		var tmparr;
		for(x = 0; x <= 22; x++)
		{
			tmparr = new Array(x,100,0,100,0);
			results.push(tmparr);
		}
		
		for(y = loopstart; y <= loopend; y++)
		{
			var i = y / 100; //2.5 ... 7.49

			var low = i;
			var high = i;
			var valid = true;

			var counter = 0;
			while(valid === true && counter < grid.length)
			{
				low =  twodeci( low *  (grid[counter][0]/100 + 0.995) );
				high = twodeci( high * (grid[counter][0]/100 + 1.0049999) );

				if( !inbounds(low, high, grid[counter][1]) )
					valid = false;

				if(low < grid[counter][1] - 0.5)
					low = grid[counter][1] - 0.5;
				if(high > grid[counter][1] + 0.49)
					high = grid[counter][1] + 0.49;

				counter++;
			}

			if(valid === true) 
			{
				if(results[Math.round(i)][3] === 100)
					results[Math.round(i)][3] = i;
				results[Math.round(i)][4] = i;

				if(low < results[Math.round(i)][1])
					results[Math.round(i)][1] = low;
				if(high > results[Math.round(i)][2])
					results[Math.round(i)][2] = high;
			}
		}
		
		var newNode = document.createElement("div");
		newNode.id = "mynode2";
		var refNode = document.getElementById('ctl00_cphMain_dpdPlayers');
		refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
		document.getElementById('mynode2').style.cssText = 'background-color: #F0F0F0; border: 1pt solid #DDDDDD; font-family: verdana; font-size: 8pt; padding: 5px; margin-top: 5px;';

		var validresults = new Array();
		var nrofvalidresults = 0;
		for(bb=0; bb<results.length;bb++)
		{
			if(results[bb][1] !== 100)
			{
				nrofvalidresults++;
				validresults.push(results[bb]);
			}
		}
		
		if(nrofvalidresults === 1) {
			
			var r=validresults[0];
			//console.log("Start skill " + r[0] + ": " + r[3] + " - " + r[4] + " ===> " + r[1] + " - " + r[2]);
			//document.getElementById('mynode2').innerHTML += "<p>M�jliga skicklighetsv�rden: " + r[1].toFixed(2) + " - " + r[2].toFixed(2) + "<br>";
			document.getElementById('mynode2').innerHTML += r[1].toFixed(2) + " - " + r[2].toFixed(2) + "<br>";
			//document.getElementById('mynode2').innerHTML += "" + dotable(r[1], r[2]);
			drawbar(r[1], r[2], currentskill);
			document.getElementById('mynode2').innerHTML += "<i><span style='color: #666666;'>Spelarens skicklighet före första uppdateringen var <b>" + r[0] + "</b>  &nbsp;(" + r[3].toFixed(2) + " - " + r[4].toFixed(2) + ")</i>";
			
		}
		if(nrofvalidresults === 2) {
			
			for(xx=0; xx<nrofvalidresults;xx++)
			{
				var r=validresults[xx];
				//console.log("Start skill " + r[0] + ": " + r[3] + " - " + r[4] + " ===> " + r[1] + " - " + r[2]);
				document.getElementById('mynode2').innerHTML += "Om spelarens skicklighet före första uppdateringen var <b>" + r[0] + "</b>: " + r[1].toFixed(2) + " - " + r[2].toFixed(2) + "<br>";
				drawbar(r[1], r[2], currentskill);
				document.getElementById('mynode2').innerHTML += "<br>";
			}
			
			document.getElementById('mynode2').innerHTML += "<i><span style='color: #666666;'>Spelarens skicklighet före första uppdateringen var <b>" + validresults[0][0] + "</b> eller <b>"+ validresults[1][0] + "</b>  &nbsp;(" + validresults[0][3].toFixed(2) + " - " + validresults[1][4].toFixed(2) + ")</i>";
			
		}
		
		if(nrofvalidresults === 0) {
			
			document.getElementById('mynode2').innerHTML += "<p>Beräkningen misslyckades!</p>";
		}

	}
}
	
function readvalues() {

	var table = document.getElementById("ctl00_cphMain_dgTransfers");
	var rows = table.querySelectorAll(".ItemStyleEcon, .AlternatingItemStyleEcon");

	for(i=0; i<rows.length; i++)
	{
		var link = rows[i].getElementsByTagName("td")[1].getElementsByTagName("a")[0].getAttribute("href");
		var linksplit = link.split("playerid=");
		var linksplit1 = linksplit[1].split("&TeamID=");
		var id = linksplit1[0];

		var skill = rows[i].getElementsByTagName("td")[5].getElementsByTagName("span")[0].getAttribute("title");

		localStorage.setItem(id, skill);
	}
	
	var newNode = document.createElement("div");
	newNode.id = "mynode";
	var refNode = document.getElementById('ctl00_cphMain_dgTransfers');
	refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
	document.getElementById('mynode').style.cssText = 'background-color: #19A347; color: white; border: 1pt solid #DDDDDD; font-family: verdana; font-size: 8pt; padding: 5px; margin-top: 5px;'; 
	document.getElementById('mynode').innerHTML = "Spelarvärden inlästa! Tryck på \"Nästa\" för att läsa in fler (om knappen finns)";
}



function whatpage() {
	
	var header = document.getElementById("ctl00_cphMain_lblTitle");
	if(header != undefined) return "cr";
	else return "vals";
}

window.onload = function() {
    
	if(whatpage() === "cr")
	{	
		calculate();
	}
	else
	{
		readvalues();
		printvalues();
	}
};

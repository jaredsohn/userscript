// ==UserScript==
// @name           myaiesec search enhance
// @namespace      http://myaiesec.net
// @author         Andriy Kizym
// @match          http://*.myaiesec.net/*
// @include        http://*.myaiesec.net/*

// @description    Changes appearance of the myaiesec internships search
// ==/UserScript==



var elements = document.getElementsByClassName('resulttableClass');

var from = document.getElementsByName('duration_from')[0];
var to = document.getElementsByName('duration_to')[0];
var headers = document.getElementsByTagName('h2');
var i=0;
var demandPage;
for(i=0;i<headers.length;i++)
{
	if(headers[i].innerHTML == "Demand Ranking (TN)" )
	{
		demandPage = true;
		var formElem = document.getElementById("durationTo").parentNode;
		var cb = document.createElement('input');
		cb.type = 'checkbox';
		cb.name = "name";
		cb.value = "Information Technology";
		cb.onclick = function(caller){
		alert(caller.target.checked);
		if(!caller.target.checked)
		{
			var tables = document.getElementsByTagName("table");
		var listTable;
		for(i=0;i<tables.length;i++)
		{
			if(tables[i].getElementsByTagName('td')[0].innerHTML == "Demand Ranking(TN)")
			{
				listTable = tables[i];		
				var j = 0;
				var tagElems = listTable.getElementsByTagName('tr');
				for (j=0;j<tagElems.length;j++)
				{
					tagElems[j].style.display = "table-row";
				}
				break;
			}
		}
			return;
		}
    	var it=["Artificial Intelligence","Database Management","Mobile Applications","Mobile Technology","Network Management & Data Transmission","Software Development and Programming","Systems Analysis and Design","Web Development and Management"];
	var tables = document.getElementsByTagName("table");
	var listTable;
	for(i=0;i<tables.length;i++)
	{
		if(tables[i].getElementsByTagName('td')[0].innerHTML == "Demand Ranking(TN)")
		{
			listTable = tables[i];		
			var j = 0;
			var tagElems = listTable.getElementsByTagName('a');
			for (j=0;j<tagElems.length;j+=2)
			{
				if(it.indexOf(tagElems[j].innerText) == -1)
				{					
					tagElems[j].parentNode.parentNode.style.display = "none";
				}
			}
			break;
		}
	}
};		
		cb.appendChild(document.createTextNode('Information Tech'));
		formElem.appendChild(cb);
		return;
	}
	
}

from.selectedIndex = 2;
to.selectedIndex = 25;

var element = elements[0];
var tags = element.getElementsByTagName('tr');

var foo = new Array();
for(i=0;i<tags.length;i++)
{
	var tag = tags[i];
	if(tag != null)
	{
		var child = tag.getElementsByTagName('td');
		if(child != null && child.length > 1)
		{
			var radVal = child[0].getElementsByTagName('input')[0];
			var radio = child[0].getElementsByTagName('input')[0].outerHTML;
			var numberVal = radVal.value;			
			var savebutton = child[1].getElementsByTagName('img')[0].outerHTML;
			var font = child[2].getElementsByTagName('font');
			var linka = child[2].getElementsByTagName('a')[0];
			var linkaAddr =  "'/exchange/viewtn.do?operation=executeAction&tnId="+numberVal+"'";
			
				var newEvent = "javascript:window.open('/exchange/viewtn.do?operation=executeAction&tnId="+numberVal+"','Popup', 'toolbar=yes,status=yes,width=400,height=200,scrollbars=yes,resizable=yes,menubar=yes');";
					
			var onclick="viewTnPopup('"+numberVal+"');";
			var html = "<a href="+linkaAddr+">"+linka.innerHTML+"</a>";
					
			
			var linked = radio + ' ' + html + ' ' + savebutton;
			var countryName = font[0].innerText.split(',')[1];			
			
			
			if(foo[countryName] == null)
			{
				foo[countryName] = new Array();
			}
			foo[countryName].push(linked);
		}
	}
}
element.innerHTML = "";
for (var key in foo) 
{
var row=element.insertRow(element.rows.length);
var cell1=row.insertCell(0);
cell1.innerHTML = key;
var j = 0;

for(j=0;j<foo[key].length;j++)
{
   var row2=element.insertRow(element.rows.length);
   var cell1=row2.insertCell(0);
   cell1.innerHTML = "";
   var cell2=row2.insertCell(1);
   cell2.innerHTML = foo[key][j];
}
  
}

// ==UserScript==
// @name           PM Filter
// @namespace      john@mort.net
// @description    Allows you to filter PM threads by Author and Recepient
// @include        http://rpol.net/private.cgi*
// ==/UserScript==

Array.prototype.unique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}

//Collect a list of all the tables, then set the one with the class "selection_table" to be our target
var tables = document.getElementsByTagName("table");
for (var i = 0; i < tables.length; i++) 
{
  if(tables[i].className == "selection_table"){target=tables[i];}
}


var authors = new Array();
var recepients = new Array();
var ac = 0;

//Scan through the rows of target, collect the text of cell 2 and 4 for all rows with 7 cells
for (var i = 0; i < target.rows.length; i++) 

{
   if(target.rows[i].cells.length == 7)
   {
      authors[ac]=target.rows[i].cells[2].firstChild.nodeValue;
      recepients[ac]=target.rows[i].cells[4].firstChild.nodeValue;
      ac++;
   }
}
//Remove duplicate names
authors[0] = "-By Author-";
authors = authors.unique();
authors = authors.sort();
recepients[0] = "-By Recepient-";
recepients = recepients.unique();
recepients = recepients.sort();


//Locate the div where we will insert the filter controls
var divlist = document.getElementsByTagName("div");
for (var i = 0; i < divlist.length; i++) 
{
  if(divlist[i].className == "hl"){insertion_point=divlist[i];}
}

//create the form
var myform=document.createElement("form");
var authselect = document.createElement("select");

for (var i = 0; i < authors.length; i++){
                var theOption=document.createElement("OPTION");
                var theText=document.createTextNode(authors[i]);
                theOption.appendChild(theText);
                authselect.appendChild(theOption);
}
var filterlabel=document.createTextNode("Filter Messages: ");
myform.appendChild(filterlabel);
myform.appendChild(authselect);

//authselect.onchange=authOnChange;

var recpselect = document.createElement("select");

for (var i = 0; i < recepients.length; i++){
                var theOption=document.createElement("OPTION");
                var theText=document.createTextNode(recepients[i]);
                theOption.appendChild(theText);
                recpselect.appendChild(theOption);
}
myform.appendChild(recpselect);

insertion_point.insertBefore(myform,insertion_point.firstChild);

function authOnChange(e) {alert('auth');}
function recpOnChange(e) {alert('recp');}
function filterRows()
{
   var aval = authselect.value;
   var rval = recpselect.value;

// if all are default then make all visible
   for (var i = 0; i < target.rows.length; i++) 

   {
      target.rows[i].style.display= 'none';
      if(target.rows[i].cells.length == 7)
      {
         if(aval==target.rows[i].cells[2].firstChild.nodeValue){target.rows[i].style.display= '';}
         if(rval==target.rows[i].cells[4].firstChild.nodeValue){target.rows[i].style.display= '';}
      }
      if(aval=="-By Author-" && rval=="-By Recepient-")
      {
         target.rows[i].style.display= '';
      }
   }
}
authselect.addEventListener("change", filterRows, false); 
recpselect.addEventListener("change", filterRows, false); 

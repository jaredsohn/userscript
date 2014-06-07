// ==UserScript==
// @name           IITB Placements Powertools (updated for 2012-13)
// @namespace      http://placements.iitb.ac.in/placements/
// @description    Powertools for your IITB placement (JAFs) page (Original script http://userscripts.org/scripts/show/119212 by my friend Mayur Mahrotri)
// @include        http://placements.iitb.ac.in/placements/studjaf4stud.jsp
// @include        http://placements.iitb.ac.in/placements/studsign2.jsp
// @include        http://placements.iitb.ac.in/placements/studunsign2.jsp
// @version        1.3
// ==/UserScript==

// REF: http://stackoverflow.com/a/498995/155813
if (!String.prototype.trim) {
    String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
    String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
    String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
    String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};
}


var tables=document.getElementsByTagName("table");

var header=document.querySelectorAll("div.header")[0];
header.style.width = "742px";
header.style.margin = "auto";
var menu=document.getElementById("mainmenu");
menu.style.position = "relative";
menu.style.left = "50px";
menu.style.margin = "auto";

if(header.parentNode && menu.parentNode) {
    var headermenuwrapper = document.createElement('div');
    var header=document.querySelectorAll("div.header")[0];
    var menu=document.querySelectorAll("div.mainmenuwrapper")[0];
    header.parentNode.insertBefore(headermenuwrapper, header);
    header.parentNode.removeChild(header);
    menu.parentNode.removeChild(menu);
    headermenuwrapper.appendChild(header);
    headermenuwrapper.appendChild(menu);
    headermenuwrapper.style.width = "100%";
    headermenuwrapper.style.backgroundColor = "#ffffff";
    headermenuwrapper.style.borderBottomRightRadius = '3em'; // standard
    headermenuwrapper.style.borderBottomLeftRadius = '3em'; // standard
}

//Creating extra row for dropdown lists
var newRow = tables[3].insertRow(0);
var newCell= newRow.insertCell(0);
newCell.colSpan = tables[3].rows[5].cells.length;

var r = tables[3].rows;
//document.body.style.background = "#ffffff";
tables[0].style.backgroundColor = "transparent";

for(var i=0; i<=3; i++) {
    tables[i].width = "100%";
    tables[i].align = "center";
}
tables[0].width = "80%";
//tables[3].style.borderWidth = "1px";
//tables[3].style.borderColor = "#000000";

r[1].style.display = r[4].style.display = 'none';
var info = document.createElement('span');
r[2].cells[0].appendChild(info);

r[5].className="";
r[5].style.backgroundColor = "#ff9933";
r[5].style.color="#000000";

r[0].style.backgroundColor = "#ffcc99";

var i=0;
for(i=6; i < r.length - 3; i++ )
{
	r[i].style.backgroundColor = ((i-6)%2) ? "#ffcc99" : "#ffffff";
	r[i].style.color="#000000";
}
for(i=0;i<r[5].cells.length;i++) {
	r[5].cells[i].className="";
	r[5].cells[i].style.backgroundColor="transparent";
}
for(i=6; i < r.length - 3; i++ )
{
    r[i].cells[5].noWrap = "nowrap";
    r[i].cells[8].noWrap = "nowrap";
    if(r[i].cells[9].innerHTML.search("signed") < 0) r[i].cells[9].noWrap = "nowrap";
    /*
    r[i].style.borderWidth = "1px";
    r[i].style.borderColor = "#000000";
    for(var j=0; j < r[i].cells.length; j++)
    {
      r[i].cells[j].style.borderWidth = "1px";
      r[i].cells[j].style.borderColor = "#000000";
    }
    */
}



/************************************************************************************/
/************************************************************************************/


/*****************************
*********** Themes ***********
******************************/ 

function loadTheme()
{
  var selectedValue = document.getElementById("themeSetter").options[document.getElementById("themeSetter").options.selectedIndex].value;
  var r = tables[3].rows;
  if(selectedValue == "Default (Peach)")
  {
	//document.body.style.background = "#ffffff";
	r[5].style.backgroundColor="#ff9933";
	r[5].style.color="#000000";
	r[0].style.backgroundColor="#ffcc99";
	for(i=6, j=6; i < r.length - 3; i++ )
	{
	    if(r[i].style.display != 'none') {
	        r[i].style.backgroundColor = ((j-6)%2) ? "#ffcc99" : "#ffffff";
	        r[i].style.color="#000000";
	        j++;
        }
	}
  }
  else if(selectedValue == "Gray")
  {
	//document.body.style.background = "#ffffff";
	r[5].style.backgroundColor="#333333";
	r[5].style.color="#ffffff";
	r[0].style.backgroundColor="#dddddd";
	for(i=6, j=6; i < r.length - 3; i++ )
	{
	    if(r[i].style.display != 'none') {
	        r[i].style.backgroundColor = ((j-6)%2) ? "#dddddd" : "#ffffff";
	        r[i].style.color="#000000";
	        j++;
        }
	}
  }
  else if(selectedValue == "Pink-Violet")
  {
	//document.body.style.background = "#ffffff";
	r[5].style.backgroundColor="#d31d8c";
	r[5].style.color="#ffffff";
	r[0].style.backgroundColor="#f47dc5";
	for(i=6, j=6; i < r.length - 3; i++ )
	{
	    if(r[i].style.display != 'none') {
	        r[i].style.backgroundColor = ((j-6)%2) ? "#f47dc5" : "#fac9e6";
	        r[i].style.color="#000000";
	        j++;
        }
	}
  }
  else if(selectedValue == "Spring-Green")
  {
	//document.body.style.background = "#ffffff";
	r[5].style.backgroundColor="#66FF99";
	r[5].style.color="#000000";
	r[0].style.backgroundColor="#B3FFCC";
	for(i=6, j=6; i < r.length - 3; i++ )
	{
	    if(r[i].style.display != 'none') {
	        r[i].style.backgroundColor = ((j-6)%2) ? "#B3FFCC" : "#E5FFEE";
	        r[i].style.color="#000000";
	        j++;
        }
	}
  }
  else if(selectedValue == "Aqua-Blue")
  {
	//document.body.style.background = "#ffffff";
	r[5].style.backgroundColor="#00D4FF";
	r[5].style.color="#000000";
	r[0].style.backgroundColor="#B3E5FF";
	for(i=6, j=6; i < r.length - 3; i++ )
	{
	    if(r[i].style.display != 'none') {
	        r[i].style.backgroundColor = ((j-6)%2) ? "#B3E5FF" : "#E5F6FF";
	        r[i].style.color="#000000";
	        j++;
        }
	}
  }
}


/*****************************
*********** Filter ***********
******************************/ 

function loadPage()
{
  var selectedValue = document.getElementById("gsFilter").options[document.getElementById("gsFilter").options.selectedIndex].value;
  var r = tables[3].rows;
  var i=0, j=0;
  
  if(selectedValue == "Relevent")
  {
    for(i=6; i < r.length - 3; i++)
    {
	  var str = r[i].cells[9].innerHTML;
	  r[i].style.display = (str.search("Not Eligible!!") > -1 || str.search("Jaf Closed") > -1) ? 'none' : '';
	  if(!r[i].style.display) j++;
    }
  }
  else if(selectedValue == "Can Sign")
  {
    for(i=6; i < r.length - 3; i++ )
    {
	  var str = (r[i].cells[9].textContent || r[i].cells[9].innerText).trim();
	  r[i].style.display = (str != "sign") ? 'none' : '';
	  if(!r[i].style.display) j++;
    }
  }
  else if(selectedValue == "Signed")
  {
    for(i=6; i < r.length - 3; i++ )
    {
	  var str = r[i].cells[9].innerHTML;
	  r[i].style.display = (str.search("signed") < 0) ? 'none' : '';
	  if(!r[i].style.display) j++;
    }
  }
  else if(selectedValue == "Closed JAFs")
  {
    for(i=6; i < r.length - 3; i++ )
    {
	  var str = r[i].cells[9].innerHTML;
	  r[i].style.display = (str.search("Jaf Closed") < 0) ? 'none' : '';
	  if(!r[i].style.display) j++;
    }
  }
  else if(selectedValue == "Not Eligible")
  {
    for(i=6; i < r.length - 3; i++ )
    {
      var str = r[i].cells[9].innerHTML;
      r[i].style.display = (str.search("Not Eligible!!") < 0) ? 'none' : '';
	  if(!r[i].style.display) j++;
    }
  }
  else if(selectedValue == "All")
  {
    for(i=6; i < r.length - 3; i++ )
    {
	  var row = tables[3].rows[i];
	  row.style.display = '';
	  if(!r[i].style.display) j++;
    }
  }
  
  info.innerHTML = "&nbsp;<b>(" + j + " of " + (r.length - 9) + " are visible)</b>"
  loadTheme();
}


/*****************************
************ Sort ************
******************************/ 

function sortPage() {
  var selectedValue = document.getElementById("mgSort").options[document.getElementById("mgSort").options.selectedIndex].value;
  var r = tables[3].rows;
  var r_length = r.length;
  var r_footer = r[r_length - 3];
  var rows = [];
  
  // REF: http://stackoverflow.com/a/282711/155813
  for(i=6; i <  r_length - 3; i++) {
    rows.push(r[6]);  
    tables[3].deleteRow(6);
  }

  var cellA, cellB;
  if(selectedValue == "Sr. No.")
  {
	rows.sort(function(a,b) { 
	    cellA = parseInt((a.cells[0].textContent || a.cells[0].innerText).trim());
	    cellB = parseInt((b.cells[0].textContent || b.cells[0].innerText).trim());
	    return cellA - cellB;
    });
  }
  else if(selectedValue == "Company Name" || selectedValue == "Type" || selectedValue == "Job Profile")
  {
    var i = selectedValue == "Company Name" ? 1 : (selectedValue == "Type" ? 2 : 4);
	rows.sort(function(a,b) { 
	    cellA = (a.cells[i].textContent || a.cells[i].innerText).trim().toLowerCase();
	    cellB = (b.cells[i].textContent || b.cells[i].innerText).trim().toLowerCase();
	    return cellA > cellB ? 1 : (cellA < cellB ? -1 : 0);
    });
  }
  else if(selectedValue == "Closes On")
  {
    var tA, tB;
	rows.sort(function(a,b) { 
	    cellA = (a.cells[5].textContent || a.cells[5].innerText).trim().match(/(\d+)/g);
	    cellB = (b.cells[5].textContent || b.cells[5].innerText).trim().match(/(\d+)/g);
	    tA = new Date(parseInt(cellA[2],10), parseInt(cellA[1],10)-1, parseInt(cellA[0],10)).getTime();
	    tB = new Date(parseInt(cellB[2],10), parseInt(cellB[1],10)-1, parseInt(cellB[0],10)).getTime();
	    return tA - tB;
    });
  }
  
  
  for (i = 0; i < rows.length; ++i) {
    tables[3].tBodies[0].insertBefore(rows[i], r_footer);
  }
  
  loadTheme();
}



/************************************************************************************/



/*****************************
*********** Themes ***********
******************************/ 

var aryThemes = new Array();

aryThemes[0] = "Default (Peach)";
aryThemes[1] = "Gray";
aryThemes[2] = "Pink-Violet";
aryThemes[3] = "Spring-Green";
aryThemes[4] = "Aqua-Blue";

var themeOptions="";
for(var i=0;i<aryThemes.length;i++)
{
	themeOptions+="<option value='" + aryThemes[i] + "'>" + aryThemes[i] + "</option>";
}
  
newCell.innerHTML = newCell.innerHTML + "&nbsp;Theme: <select id='themeSetter'>" + themeOptions + "</select>&nbsp;";

/*****************************
************ Sort ************
******************************/

var arySort = new Array();

arySort[0] = "Sr. No.";
arySort[1] = "Company Name";
arySort[2] = "Type";
arySort[3] = "Job Profile";
arySort[4] = "Closes On";

var sortOptions="";
for(var i=0;i<arySort.length;i++)
{
	sortOptions+="<option value='" + arySort[i] + "'>" + arySort[i] + "</option>";
}
  
newCell.innerHTML = newCell.innerHTML + "&nbsp;Sort: <select id='mgSort'>" + sortOptions + "</select>&nbsp;";


/*****************************
*********** Filter ***********
******************************/ 

var aryTopics = new Array();

aryTopics[0] = "All";
aryTopics[1] = "Relevent";
aryTopics[2] = "Can Sign";
aryTopics[3] = "Signed";
aryTopics[4] = "Not Eligible";
aryTopics[5] = "Closed JAFs";

//Creating a drop down menu with the above options
var filterOptions="";

for(var i=0;i<aryTopics.length;i++)
{
	filterOptions+="<option value='" + aryTopics[i] + "'>" + aryTopics[i] + "</option>";
}
  
newCell.innerHTML = newCell.innerHTML + "&nbsp;Filter: <select id='gsFilter'>" + filterOptions + "</select>&nbsp;";
  


/************************************************************************************/


//Adding the load event to the dropdown
document.getElementById("themeSetter").addEventListener("change",loadTheme);
document.getElementById("gsFilter").addEventListener("change",loadPage);
document.getElementById("mgSort").addEventListener("change",sortPage);


/************************************************************************************/



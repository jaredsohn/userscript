// ==UserScript==
// @name          Big World Link Harwester
// @namespace     http://www.replay2avi.com
// @description   Lists all links to BWP mods.
// @version       0.2
// @include       *
// ==/UserScript==


if(window.location.href!="http://kerzenburg.baldurs-gate.eu/bwpmods.php")
{
    console.log("Href:" + window.location.href);
    return;
}

if (!confirm("Big World Link Harwester starting, do you want to continue?")) {
    return;
}
    


var tables = document.getElementsByTagName('table');

var links = '';
var skipped = 0;

function show_message(msg) {

   //var overlay = document.createElement("div");
   //overlay.setAttribute("id","overlay");
   //overlay.setAttribute("class", "overlay");
   //overlay.setAttribute("style", "background-color: #000;opacity: .7;filter: alpha(opacity=70);position: absolute; top: 0; left: 0;width: 100%; height: 100%; z-index: 10;");
    document.body.innerHTML =  msg ;
}


function findImage(element)
{
  var k;
  if(element==null)
  {
      return "";
  }
    
  var elements = element.getElementsByTagName('img');
  for (k=0; k<elements.length; k++)
  {
    
    var element = elements[k];
    var attr = element.getAttribute('title');
    if(attr==null)
    {
      return "";
    }
    return attr;
  }
  
  return "";
  
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function findLink(element)
{
  var k;
  if(element==null)
  {
      return "";
  }
    
  var elements = element.getElementsByTagName('a');
  for (k=0; k<elements.length; k++)
  {
    
    var element = elements[k];
    var attr = element.getAttribute('href');
    if(attr==null)
    {
      return "";
    }
      
      //console.log(encodeURIComponent(attr));
    return htmlEntities(attr);
  }
  
  return "";
  
}

var i;
var n =0;
  links+= "<table>";
  links+="<tr>";
    links+="<td>";
    links+="ID";
    links+="</td>";
    links+="<td>";
    links+="Mod type";
    links+="</td>";
    links+="<td>";
    links+="Mod name";
    links+="</td>";
    links+="<td>";
    links+="German";
    links+="</td>";
    links+="<td>";
    links+="English";
    links+="</td>";
    links+="<td>";
    links+="Mod homepage";
    links+="</td>";
    links+="<td>";
    links+="Mod download link";
    links+="</td>";
    links+="</tr>";
    links+="\r\n";


for (i=0; i<tables.length; i++)
{

  var table = tables[i];
  var rows = table.getElementsByTagName('tr');
  var percent = i * 100;
  percent = percent/tables.length;
  console.log("Done : " + percent + "%");
    
  for (j=0; j<rows.length; j++)
  {
    var row = rows[j];
    var cols = row.getElementsByTagName('td');
    if(cols.length<11)
    {
     	skipped++; 
        continue;
    }
    var name = cols [1];
      
      if(name=="" || name ==null || name.innerText=="" || name.innerText=="Modifikation")
    {
     	skipped++; 
        continue;
    }
      
    var link = cols [6];
      
    var type = cols[0];
    var german = cols[3];
    var english = cols[4];
    var id = cols[10];
    links+="<tr>";
    links+="<td>";
    links+=id.innerText;
    links+="</td>";
    links+="<td>";
    links+=findImage(type);
    links+="</td>";
    links+="<td>";
    links+=name.innerText;
    links+="</td>";
    links+="<td>";
    links+=german.innerText;
    links+="</td>";
    links+="<td>";
    links+=english.innerText;
    links+="</td>";
    links+="<td>";
    links+= findLink(name);
    links+="</td>";
    links+="<td>";
    links+=findLink(link);
    links+="</td>";
    links+="</tr>";
    links+="\r\n";
    n++;
  }  
  
  
}

links+= "</table>";
links += "<br>Total : " + n;
links+="\r\n";
links += "<br>Skipped : " + skipped;
links+="\r\n";

//copyIntoClipboard(links);
console.log("Found : " + n );
console.log("Skipped : " + skipped );
show_message(links);
alert("Harvested links shown on screen, make sure to have Total and Skipped counts in the end, so nothing would be cut. \r\n You can use a spreadsheet program to split the columns on this table\r\n To disable this script go into Greasemonkey settings.");
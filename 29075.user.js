// ==UserScript==
// @name           		DSDropDownSL
// @namespace      	none
// @author			Heinzel
// @description    		Ändert die SL zu einem DropDown-Menü
// @include        		http://de*.die-staemme.de/game.php*
// ==/UserScript==



var table = document.getElementsByTagName("table")[7];
SL = table.getElementsByTagName("ul")[0];
var LIs = SL.getElementsByTagName("li");
var hrefs = new Array("cr");
var values = new Array("cr");
var name, link, entf = true, select = false;
var par = LIs[0].parentNode;

for(var x = 0; x < LIs.length; x++)
{
  link = LIs[x].getElementsByTagName("a")[0];
  name = (link.getElementsByTagName("img").length == 0) ? link.innerHTML : link.innerHTML.replace(/<img.+?>/, "");
  
  if(name.match(/\B\..+/))
  {
	LIs[x].getElementsByTagName("a")[0].innerHTML = link.innerHTML.replace(/>\./, ">").replace(/\B\./, "");
	entf = false;
	continue;
  }
  
  if(LIs[x].firstChild.target != "_blank")
  {
	hrefs.push(LIs[x].firstChild.href);
  } else {
	hrefs.push(LIs[x].firstChild.href + "_blank");
  }
  values.push(LIs[x].firstChild.innerHTML);
  if(LIs[x].innerHTML.match(/<br/))
  {
	hrefs.push("cr");
	values.push("cr");
  }
  par.removeChild(LIs[x]);
  x--;
}
if(entf)
{
  par.parentNode.removeChild(par);
}

var form = document.createElement("form");
var td = document.createElement("td");

for(var x = 0; x < hrefs.length; x++)
{
  if(hrefs[x] == "cr" && values[x] == "cr")
  {
	td.align = "center";
	
	if(select)
	{
	  form.appendChild(select);
	  td.appendChild(form);
	}
	
	select = document.createElement("select");
	select.addEventListener('change', function(event) 
	{
	  var select = event.target;
	  var value = select.options[select.options.selectedIndex].value;
	  var name = select.options[select.options.selectedIndex].innerHTML;
	  var server = location.href.split("://de")[1].split(".die-staemme.de/")[0];
	  value = value.replace("%C3%BC","ü").replace("%C3%A4","ä").replace("%C3%B6","ö").replace("%C3%9C","Ü").replace("%C3%84","Ä").replace("%C3%96","Ö");
	  
	  if(value == ("http://de" + server + ".die-staemme.de/" + name) || value == "")
		return;
	  
	  if(!value.match(/javascript:/))
	  {
		if(!value.match(/_blank/))
		{
		  location.href = value;
		} else {
		  value = value.replace("_blank", "");
		  var myWindow = window.open(value, "_blank");
		  myWindow.focus();
		}
	  } else {
		eval(value);
	  }
	}, true);
  } else {
	var option = document.createElement("option");
	option.innerHTML = values[x];
	option.value = "";
	if(hrefs[x].match(/javascript:/))
	{
	  option.value = hrefs[x];
	} else {
	  option.value = (hrefs[x] != values[x]) ? hrefs[x] : "";
	}
	
	if(option.value == location.href)
	  option.selected = true;
	
	select.appendChild(option);
  }
}

if(entf)
{
  with (table)
  {
	innerHTML = "";
	className = "menu nowrap";
	align = "center";
	appendChild(td);
  }
} else {
  newtable = table.cloneNode(true);
  newtable.innerHTML = "";
  newtable.className = "menu nowrap";
  newtable.appendChild(td); 
  table.parentNode.insertBefore(newtable, table.nextSibling);
}
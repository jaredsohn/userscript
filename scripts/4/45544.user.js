// ==UserScript==
// @name          Google Image Color Search
// @description   Allows you to limit your search results to specific colors using google imgcolor feature..
// @author        haden
// @version       1.0
// @include       http://*images.google.*/images?*
// ==/UserScript==

var optbar=document.evaluate("//table[@class='t bt']//form",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var index=0;



function createOptions(obj,color,forecolor)
{	
	
	var opt = document.createElement("OPTION");
	opt.value = color;
	opt.text = color;
	opt.style.color = forecolor;
	opt.style.backgroundColor = color;
	obj.options.add(opt,index);  
	index++;

}

var color1=document.createElement("select");
color1.setAttribute("type","SELECT");
color1.setAttribute("name","color1");

createOptions(color1,"","");
createOptions(color1,"white","black");
createOptions(color1,"red","white");
createOptions(color1,"blue","white");
createOptions(color1,"green","white");
createOptions(color1,"gray","white");
createOptions(color1,"pink","black");
createOptions(color1,"yellow","black");
createOptions(color1,"orange","white");
createOptions(color1,"teal","white");
createOptions(color1,"brown","white");
createOptions(color1,"purple","white");
createOptions(color1,"black","white");





var color2=document.createElement("select");
color2.setAttribute("type","SELECT");
color2.setAttribute("name","color2");
index=0;

createOptions(color2,"","");
createOptions(color2,"white","black");
createOptions(color2,"red","white");
createOptions(color2,"blue","white");
createOptions(color2,"green","white");
createOptions(color2,"gray","white");
createOptions(color2,"pink","black");
createOptions(color2,"yellow","black");
createOptions(color2,"orange","white");
createOptions(color2,"teal","white");
createOptions(color2,"brown","white");
createOptions(color2,"purple","white");
createOptions(color2,"black","white");




optbar.appendChild(document.createTextNode(" Color 1: "));
optbar.appendChild(color1);

optbar.appendChild(document.createTextNode(" Color 2: "));
optbar.appendChild(color2);

var forms=document.getElementsByName("gs");
	gform=forms[0];
	gform.addEventListener("submit",function(e){
	e.preventDefault();
	var elem = document.createElement("input");
	elem.type = "hidden";
	elem.name = "imgcolor";
	elem.value = color1.options[color1.selectedIndex].value + "," + color2.options[color2.selectedIndex].value;
 
	gform.appendChild(elem);
	gform.submit();
},false);

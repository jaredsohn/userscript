// ==UserScript==
// @name           e-Sim Link Bar [HU]
// @description    Ez a script egy új link sort szúr be a meglévő alá, amihet kedvedszerint vehetsz fel új elmeket ill. törölheted azokat.
// @version        0.11
// @include        http://primera.e-sim.org/*
// @grant          GM_setValue 
// @grant          GM_getValue 
// @icon 		   http://www.veryicon.com/icon/png/System/The%20Martian%20toolbar/arrow2.png
// ==/UserScript==


function set(i)
 {
	
	//alert(i);
	
	linkp=window.prompt("Kérlek add meg a linket ","");
	valuep=window.prompt("Kérlek add meg a címkét","");
	
	
	link="link"+""+i;
	value="value"+""+i;
	GM_setValue(link,linkp);
	GM_setValue(value,valuep);

	window.location.reload();
 }
 
 function clear()
 {
 
	select=window.prompt("Kérlek add meg a link sorszámát amelyiket törölni szeretnéd\n 1-10","");
	select--;
	
	link="link"+""+select;
	value="value"+""+select;
	GM_setValue(link,"none");
	GM_setValue(value,"none");
	
	window.location.reload();
 }
 
 
 if (GM_getValue("elso")==undefined)
 {
 
	for(i=0;i<10;i++)
	{
	
		link="link"+""+i;
		value="value"+""+i;
		GM_setValue(link,"none")
		GM_setValue(value,"none")
	}
 
	GM_setValue("elso","true")
	
	window.location.reload();
	
 }else
 {
	//alert("jo")
 
	links=new Array();
	valuea=new Array();
	//alert("jo2")
	for(i=0;i<10;i++)
	{
	
		links[i]=GM_getValue("link"+""+i)
		valuea[i]=GM_getValue("value"+""+i)
		//alert(links[i]);
	
	}
	
	//alert(links[2])
 }
 
 
 window.onload = function() {
    
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".LinkBarBut{-moz-border-bottom-colors: none;-moz-border-left-colors: none;-moz-border-right-colors: none;-moz-border-top-colors: none;background: linear-gradient(to bottom, #F4FBFE 0%, #E5F6FD 50%, #D8EFF8 51%, #D6EDF6 100%) repeat scroll 0 0 transparent;border-color: rgba(98, 144, 199, 0.7) rgba(98, 144, 199, 0.7);border-image: none;border-radius: 5px 5px 5px 5px;border-style: solid ;border-width: 1px ;box-shadow: 0 0 5px rgba(0, 187, 255, 0.5), 0 -12px 12px rgba(142, 153, 168, 0.2) inset;float: left;font-size: 10px;font-weight: bold;height: 30px;    line-height: 30px;    margin-top: 4px;    position: relative;    text-align: center;    text-shadow: 1.2px 1.2px 0.5px white;    text-transform: uppercase;    width: 85px;	}";
	document.head.appendChild(css);
	
	
	
	table = document.getElementsByClassName("mainTable")[2];
	row=table.insertRow(1);
	tabla="<table style=\"border-bottom-style:1px solid;width:900px;margin:auto\"><tr>";

	 for(i=0;i<10;i++)
	 {
		tabla+="<td id=\"LinkBarButton"+i+"\" stlye=\"border-bottom-style:width:90px;padding-left:1px\">";
		
		if(links[i]=="none")
		{
		tabla+="<a class=\"newsTabLink\" href=\"#\"><div class=\"LinkBarBut\">+</div></a></td>";
		}else
		{
			tabla+="<a class=\"newsTabLink\" href="+links[i]+"><div class=\"LinkBarBut\">"+valuea[i]+"</div></a></td>";
		
		}
	 
	 }
 
 

 
	tabla+="<td><div style=\"cursor:pointer;\" id=\"del\"><img src=\"http://www.iconeasy.com/icon/thumbnails/System/Colored%20Developers%20Button/close%20Blue%20Icon.jpg\"></div></td></tr></table>";
 
	cell=row.insertCell(0);
	cell.setAttribute("colspan","3")
	cell.innerHTML=tabla;
 
	//alert(document.getElementById("LinkBarButton8").innerHTML.length)
 
    for(i=0;i<10;i++)
	{
	
	button = document.getElementById("LinkBarButton"+""+i);
	if(button.innerHTML.length==67)
	{
	button.addEventListener('click',function() {set(this.id[13]);},true);
	}
	
	}
	
	button = document.getElementById("del");
	button.addEventListener('click',clear,true);
    
}


 
 
// ==UserScript==
// @name OGame Redesign : Cargos necessary
// @namespace benneb
// @description OGame : Number of cargos necessary to transport, and let ressources
// @date 2011
// @creator Black Cat modifié
// @version 5.5.5
// @grant		   GM_getValue
// @grant		   GM_setValue

// @updateURL      http://userscripts.org/scripts/source/104070.meta.js
// @downloadURL    https://userscripts.org/scripts/source/104070.user.js

// @include http://*.ogame.*/game/index.php?page=overview*
// @include http://*.ogame.*/game/index.php?page=empire*
// @include http://*.ogame.*/game/index.php?page=fleet1*
// @include http://*.ogame.*/game/index.php?page=fleet2&cp=*

// ==/UserScript==

(function(){

	if(  document.getElementById("buttonz") )
	{
		var IsMoon = document.getElementsByName('ogame-planet-type')[0].content == 'moon' ;
		
		var metal = document.getElementById("resources_metal").innerHTML;
			metal = parseInt(metal.replace(/\D/g, ''));

		var cristal = document.getElementById("resources_crystal").innerHTML;
			cristal = parseInt(cristal.replace(/\D/g, ''));

		var deuterium = document.getElementById("resources_deuterium").innerHTML;
			deuterium = parseInt(deuterium.replace(/\D/g, ''));
		
		var max_gt = 0;
		
		var button203 = document.getElementById("button203");
		if (button203 && button203.className == "on") {
			max_gt = button203.getElementsByClassName("level")[0].innerHTML.replace(/<span[^<]*<\/span>/g,"").replace(/\D/g, '');
		}
		function getNbShip(id){ return document.getElementById(id).getElementsByClassName("level")[0].innerHTML.replace(/<span[^<]*<\/span>/g,"").replace(/\D/g, ''); }
		
		var button202 = getNbShip("button202") * 5000;
		var button203 = getNbShip("button203") * 25000;
		var button204 = getNbShip("button204") * 50;
		var button205 = getNbShip("button205") * 100;
		var button206 = getNbShip("button206") * 800;
		var button207 = getNbShip("button207") * 1500;
		var button208 = getNbShip("button208") * 7500;
		var button209 = getNbShip("button209") * 20000;
		var button211 = getNbShip("button211") * 500;
		var button213 = getNbShip("button213") * 2000;
		var button214 = getNbShip("button214") * 1000000;
		var button215 = getNbShip("button215") * 750;
		
		var mx_fret = 	button202+	button203+	button204+	button205+	button206+	button207+	button208+	button209+	button211+	button213+	button214+	button215;
		var total = metal + cristal + deuterium;
		if( total > mx_fret )
		{
			var supp = "<span style='color:red;text-align:left;'>"+Math.floor((total - mx_fret)/25000)+"</span>";
		}
		else
		{
			var supp = "<span style='color:green;text-align:left;'>"+Math.floor((mx_fret - total )/25000)+"</span>";
		}
		var maxgtdeut = (Math.ceil(( metal + cristal + deuterium)/25000))-1;
		
        var AntiGameOrigin					= document.getElementsByName('AntiGameOrigin');
        if( AntiGameOrigin[0] )
		{
			var td1 = document.getElementsByClassName("ago_summary_header")[0].getElementsByTagName("td")[1];
				td1.setAttribute("style","text-align:right;");
				td1.setAttribute("colspan","2");
				td1.innerHTML = "<a style='color:lime;text-align:right;' onclick='toggleMaxShips(\"#shipsChosen\",203,"+maxgtdeut+"); checkIntInput(\"#ship_203\", 0, "+max_gt+"); checkShips(\"shipsChosen\"); return false;' href='#' >"+maxgtdeut+"---"+supp+"-----</a>";
		}
		else
		{
			if( document.getElementById("movements") != null )	document.getElementById("movements").setAttribute("style","float:left");
			var div_parent = document.createElement("div");
				div_parent.className = "slot";
				div_parent.style.right = "70px";
				div_parent.style.bottom =  "9px";
				div_parent.style.width =  "200px";
			
			if( document.getElementById("movements") != null ) 		document.getElementById("movements").appendChild(div_parent);
			else  document.getElementById("slots").appendChild(div_parent);
		
			var maxgtdeut = (Math.ceil(( metal + cristal + deuterium)/25000))-1;
			var div2 = document.createElement("div");
				div2.innerHTML = "<a style='color:lime;' onclick='toggleMaxShips(\"#shipsChosen\",203,"+maxgtdeut+"); checkIntInput(\"#ship_203\", 0, "+max_gt+"); checkShips(\"shipsChosen\"); return false;' href='#' >"+maxgtdeut+"---"+supp+"</a>";
					
				div_parent.appendChild(div2);
		}
	}
	if (location.href.indexOf("page=overview") != -1) {
		var DATA = unsafeWindow.ifcDATA;
		GM_setValue("fret",DATA.info.idplanet);
	}

	if ((location.href.indexOf('page=empire',0))>=0) 
	{
		function empire()
		{
			if(  document.getElementById('planetsTab').className != "active" )
			{
				function  getlvlship(planetid, name)
				{
					var lvl = planetid.getElementsByClassName(name)[0];
					var result;
					if(lvl.getElementsByTagName('a').length > 0 )
					{
						result = lvl.getElementsByTagName('a')[0];
					}
					else
					{
						result = lvl;
					}
					return parseInt(  result.textContent.replace(/<span[^<]*<\/span>/g,"").replace(/\D/g, '')  );
				}
				var idPlanete = GM_getValue("fret").split(';');
				for(var nbplanete =0 ; nbplanete< idPlanete.length -1 ; nbplanete++)
				{
					if(document.getElementById('planet'+idPlanete[nbplanete]) )
					{
						var planetid = document.getElementById('planet'+idPlanete[nbplanete]);
						
						var metal 	=     parseInt(planetid.getElementsByClassName("metal")[0].textContent.replace(/<span[^<]*<\/span>/g,"").replace(/\./g, '').replace(/\D/g, ''));
						var cristal =   parseInt(planetid.getElementsByClassName("crystal")[0].textContent.replace(/<span[^<]*<\/span>/g,"").replace(/\./g, '').replace(/\D/g, ''));
						var deut 	= parseInt(planetid.getElementsByClassName("deuterium")[0].textContent.replace(/<span[^<]*<\/span>/g,"").replace(/\./g, '').replace(/\D/g, ''));
						
						var button202 = getlvlship(planetid,"202") * 5000;
						var button203 = getlvlship(planetid,"203") * 25000;
						var button204 = getlvlship(planetid,"204") * 50;
						var button205 = getlvlship(planetid,"205") * 100;
						var button206 = getlvlship(planetid,"206") * 800;
						var button207 = getlvlship(planetid,"207") * 1500;
						var button208 = getlvlship(planetid,"208") * 7500;
						var button209 = getlvlship(planetid,"209") * 20000;
						var button211 = getlvlship(planetid,"211") * 500;
						var button213 = getlvlship(planetid,"213") * 2000;
						var button214 = getlvlship(planetid,"214") * 1000000;
						var button215 = getlvlship(planetid,"215") * 750;
						
						var mx_fret = 	button202+	button203+	button204+	button205+	button206+	button207+	button208+	button209+	button211+	button213+	button214+	button215;
						var total = parseInt(metal + cristal + deut);
						var result = Math.floor(( mx_fret - total ) / 25000);
						var result_html = "<span style='color:"+ (  result >= 0 ? "lime" : "red" )+ ";'>"+result+"</span>";
						planetid.getElementsByClassName("row")[1].innerHTML = result_html;
						document.getElementsByTagName('body')[0].setAttribute("style","text-align:center");
	
					}
				}	
			}
			else
			{
				var idPlanete = GM_getValue("fret").split(';');
				for(var nbplanete =0 ; nbplanete< idPlanete.length -1 ; nbplanete++)
				{
					if(document.getElementById('planet'+idPlanete[nbplanete]) )
					{
						var planetid = document.getElementById('planet'+idPlanete[nbplanete]);
						
						var itemss = planetid.getElementsByClassName("item_img");
						
						for(var dd =0 ; dd < itemss.length; dd++)
						{
							var datacountdown = itemss[dd].getElementsByClassName("hidden")[0].innerHTML;
							var divTime = document.createElement("div");
								divTime.innerHTML = datacountdown;
								divTime.setAttribute("style","background-color: #000000;color: #FFFFFF;");
					
								itemss[dd].parentElement.appendChild(divTime);
						}
					}
				}	
			}
		}
		setTimeout(empire, 500);
	}
})();

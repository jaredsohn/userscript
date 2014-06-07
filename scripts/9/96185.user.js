// ==UserScript==
// @name Ressources en Transite
// @namespace http://userscripts.org/users/djoby00
// @description Les ressources en transite vers vos planètes
// @version 0.1
// @creator AnTC
// @include http://*.ogame.*/game/index.php?page=overview*
// @include http://*.ogame.*/game/index.php?page=movement*
// @exclude
// ==/UserScript==

(function(){

	// fonction format sur http://www.toutjavascript.com
	function format(valeur,decimal,separateur) {
	// formate un chiffre avec 'decimal' chiffres après la virgule et un separateur
		var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
		var val=Math.floor(Math.abs(valeur));
		if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
		var val_format=val+"";
		var nb=val_format.length;
		for (var i=1;i<4;i++) {
			if (val>=Math.pow(10,(3*i))) {
				val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
			}
		}
		if (decimal>0) {
			var decim=""; 
			for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
			deci=decim+deci.toString();
			val_format=val_format+"."+deci;
		}
		if (parseFloat(valeur)<0) {val_format="-"+val_format;}
		return val_format;
	}

	function sort_planets(a,b) {
		/(\d*):(\d*):(\d*)/.exec(a);
		var galaxy1 = parseInt(RegExp.$1);
		var system1 = parseInt(RegExp.$2);
		var planet1 = parseInt(RegExp.$3);
		/(\d*):(\d*):(\d*)/.exec(b);
		var galaxy2 = parseInt(RegExp.$1);
		var system2 = parseInt(RegExp.$2);
		var planet2 = parseInt(RegExp.$3);
		if (galaxy1 > galaxy2) return 1;
		else if (galaxy1 < galaxy2) return -1;
		if (system1 > system2) return 1;
		else if (system1 < system2) return -1;
		if (planet1 > planet2) return 1;
		else if (planet1 < planet2) return -1;
		return 0;
	}

	var isPageMovement = (document.location.href.indexOf("page=movement") != -1);

	var clearFloat = document.createElement("div");
	clearFloat.className = "clearfloat";
	var mydiv = document.createElement("div");
	mydiv.style.width = "670px";
	mydiv.style.cssFloat = "left";
	mydiv.style.overflow = "auto";
	mydiv.innerHTML = "<div style='height:32px;font-size:11px;text-transform:uppercase;color:#6F9FC8;font-weight:700;padding-top:11px;text-align:center;background-color:#10181F;'>" + (!isPageMovement?"<a href='#' onClick='return false;' id='resourcesontransitButton'><img style='vertical-align:middle;' src='img/icons/refresh.gif' /></a> ":"") + "Ressources en Transite</div><div id='resourcesontransitContent' style='background-color:#0D1014;text-align:center;'></div>";
	var inhalt = document.getElementById("inhalt");
	inhalt.appendChild(mydiv);
	inhalt.appendChild(clearFloat.cloneNode(false));
	var resourcesontransitContent = document.getElementById("resourcesontransitContent");

	var $;
	try { $ = unsafeWindow.$; }
	catch(e) { $ = window.$; }

	function displayResourcesOnTransit(resources,resourcesNames) {
		var rightMenu = document.getElementById("rechts");
		var activePlanet = rightMenu.getElementsByClassName("active")[0];
		var thisCoords;
		if (activePlanet) {
			thisCoords = activePlanet.getElementsByClassName("planet-koords")[0].textContent;
		} else {
			thisCoords = rightMenu.getElementsByClassName("planet-koords")[0].textContent;
		}
		var thisResources = [0,0,0];
		thisResources[0] = parseInt(document.getElementById("resources_metal").innerHTML.replace(/\D/g, ''));
		thisResources[1] = parseInt(document.getElementById("resources_crystal").innerHTML.replace(/\D/g, ''));
		thisResources[2] = parseInt(document.getElementById("resources_deuterium").innerHTML.replace(/\D/g, ''));

		var planets = [];
		for (var i in resources) {
			planets.push(i);
		}
		planets.sort(sort_planets);

		var table = document.createElement("table");
		table.style.marginLeft = "auto";
		table.style.marginRight = "auto";
		table.cellSpacing = "0";
		table.cellPadding = "0";
		var tr1 = document.createElement("tr");
		var th1 = document.createElement("th");
		th1.style.textAlign = "center";
		th1.style.padding = "3px";
		th1.style.color = "#6F9FC8";
		var td1 = document.createElement("td");
		td1.style.textAlign = "right";
		td1.style.border = "1px solid #A26D00";
		td1.style.padding = "3px";
		var tr = tr1.cloneNode(false);
		var th = th1.cloneNode(false);
		th.textContent = " ";
		tr.appendChild(th);
		th1.style.border = "1px solid #A26D00";
		for (var k=0;k<planets.length;k++) {
			var i = planets[k];
			th = th1.cloneNode(false);
			th.textContent = i;
			tr.appendChild(th);
		}
		th = th1.cloneNode(false);
		th.textContent = "Total:";
		tr.appendChild(th);
		table.appendChild(tr);
		var td;
		var sum;
		for (var j=0;j<3;j++) {
			if (resourcesNames[j] != "") {
				sum = 0;
				tr = tr1.cloneNode(false);
				th = th1.cloneNode(false);
				th.textContent = resourcesNames[j];
				tr.appendChild(th);
				for (var k=0;k<planets.length;k++) {
					var i = planets[k];
					var tmp = resources[i][j];
					sum += tmp;
					td = td1.cloneNode(false);
					td.textContent = format(tmp,0,'.');
					if (i == thisCoords) {
						td.className = "tips";
						td.title = "|" + format(tmp+thisResources[j],0,'.');
					}
					tr.appendChild(td);
				}
				td = td1.cloneNode(false);
				td.textContent = format(sum,0,'.');
				tr.appendChild(td);
				table.appendChild(tr);
			}
		}
		tr = tr1.cloneNode(false);
		th = th1.cloneNode(false);
		th.textContent = "Total:";
		tr.appendChild(th);
		sum = 0;
		for (var k=0;k<planets.length;k++) {
			var i = planets[k];
			var tmp = resources[i][0] + resources[i][1] + resources[i][2];
			sum += tmp;
			td = td1.cloneNode(false);
			td.textContent = format(tmp,0,'.');
			if (i == thisCoords) {
				td.className = "tips";
				td.title = "|" + format(tmp+thisResources[0]+thisResources[1]+thisResources[2],0,'.');
			}
			tr.appendChild(td);
		}
		td = td1.cloneNode(false);
		td.textContent = format(sum,0,'.');
		tr.appendChild(td);
		table.appendChild(tr);
		resourcesontransitContent.innerHTML = "";
		resourcesontransitContent.appendChild(table);
		$('#resourcesontransitContent .tips').cluetip({splitTitle:'|',showTitle:false,width:150,positionBy:'auto',leftOffset:20,topOffset:15,cluezIndex:9997,hoverIntent:{sensitivity:1,interval:250,timeout:400}});
	}

	if (isPageMovement) {
		mydiv.style.marginTop = "5px";
		var resources = {};
		var resourcesNames = ["","",""];
		$("#inhalt .fleetDetails").each(function () {
			var fleetDetails = $(this);
			var rel = fleetDetails.find(".route a").eq(0).attr("rel");
			var tooltip = $(rel);
			var tooltip_th = tooltip.find("th").eq(1);
			if (tooltip_th.length > 0) {
				var tooltip_tr = tooltip_th.parent().nextAll();
				var metal = parseInt(tooltip_tr.eq(0).find("td").eq(1).text().replace(/\D/g, ""));
				var cristal = parseInt(tooltip_tr.eq(1).find("td").eq(1).text().replace(/\D/g, ""));
				var deuterium = parseInt(tooltip_tr.eq(2).find("td").eq(1).text().replace(/\D/g, ""));
				if (resourcesNames[0] == "") {
					resourcesNames[0] = tooltip_tr.eq(0).find("td").eq(0).text();
					resourcesNames[1] = tooltip_tr.eq(1).find("td").eq(0).text();
					resourcesNames[2] = tooltip_tr.eq(2).find("td").eq(0).text();
				}
				if (metal + cristal + deuterium > 0) {
					var detailsClass = fleetDetails.find(".route a").eq(0).attr("class");
					var isReverse = (detailsClass.indexOf("reverse")!=-1);
					var coords;
					if (isReverse) {
						coords = fleetDetails.find(".originCoords").eq(0).text();
					} else {
						coords = fleetDetails.find(".destinationCoords").eq(0).text();
					}
					if (resources[coords]) {
						metal += resources[coords][0];
						cristal += resources[coords][1];
						deuterium += resources[coords][2];
					}
					resources[coords] = [metal,cristal,deuterium];
				}
			}
		});
		displayResourcesOnTransit(resources,resourcesNames);
	} else {
		mydiv.style.marginBottom = "5px";
		var resourcesontransitButton = document.getElementById("resourcesontransitButton");
		resourcesontransitButton.addEventListener(
			"click",
			function () {
				resourcesontransitContent.innerHTML = "Loading...";
				var session = document.location.href.replace(/^.*session=([^&]*).*$/,"$1");
				$.get(
					"index.php?page=eventList&session="+session+"&ajax=1",
					function (data) {
						var resources = {};
						var resourcesNames = ["","",""];
						var idRequested = ","; //only those on the way out
						$(data).find("#eventContent .eventFleet").each(function () {
							var eventFleet = $(this);
							var url = eventFleet.find(".detailsFleet a").eq(0).attr("rel");
							var eventId = url.replace(/^.*eventID=([0-9]*).*$/,"$1");
							var detailsClass = eventFleet.find(".detailsFleet a span").eq(0).attr("class");
							var isReverse = (detailsClass!="icon_movement");
							if (!isReverse || idRequested.indexOf(","+(parseInt(eventId)-1)+",") == -1) {
								var missionImg = eventFleet.find(".missionFleet img").eq(0).attr("src");
								if (isReverse || missionImg.indexOf("transport") != -1 || missionImg.indexOf("stationieren") != -1 || missionImg.indexOf("kolonisieren") != -1) {
									var coords;
									if (isReverse) {
										coords = eventFleet.find(".coordsOrigin").eq(0).text();
									} else {
										idRequested += eventId + ",";
										coords = eventFleet.find(".destCoords").eq(0).text();
									}
									var tooltip = $.ajax({dataType:'html',cache:false,url:url,async:false}).responseText;
									var tooltip_th = tooltip.replace(/\n/g,"").split("<th");
									if (tooltip_th[2]) {
										var tooltip_td = tooltip_th[2].split("<td");
										var metal = parseInt(tooltip_td[2].replace(/^[^>]*>([^<]*).*$/,"$1").replace(/\D/g, ""));
										var cristal = parseInt(tooltip_td[4].replace(/^[^>]*>([^<]*).*$/,"$1").replace(/\D/g, ""));
										var deuterium = parseInt(tooltip_td[6].replace(/^[^>]*>([^<]*).*$/,"$1").replace(/\D/g, ""));
										if (resourcesNames[0] == "") {
											resourcesNames[0] = tooltip_td[1].replace(/^[^>]*>([^<]*).*$/,"$1");
											resourcesNames[1] = tooltip_td[3].replace(/^[^>]*>([^<]*).*$/,"$1");
											resourcesNames[2] = tooltip_td[5].replace(/^[^>]*>([^<]*).*$/,"$1");
										}
										if (metal + cristal + deuterium > 0) {
											if (resources[coords]) {
												metal += resources[coords][0];
												cristal += resources[coords][1];
												deuterium += resources[coords][2];
											}
											resources[coords] = [metal,cristal,deuterium];
										}
									}
								}
							}
						});
						displayResourcesOnTransit(resources,resourcesNames);
					}
				);
			},
			false
		);
	}

})();


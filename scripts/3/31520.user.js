// ==UserScript==
// @name           brastuga-script
// @namespace      explorador
// @description    game
// @include        http://*.astroempires.com/map.aspx?loc=*
// ==/UserScript==


throbber = "http://home.exetel.com.au/snake/indicator_mozilla_blu.gif"
loadaddress = "http://";
	if((document.location.href.match(/www/))) { loadaddress=loadaddress+"www." }
	if((document.location.href.match(/alpha/))) { loadaddress=loadaddress+"alpha." }
	if((document.location.href.match(/beta/))) { loadaddress=loadaddress+"beta." }
	if((document.location.href.match(/ceti/))) { loadaddress=loadaddress+"ceti." }
	if((document.location.href.match(/delta/))) { loadaddress=loadaddress+"delta." }
	loadaddress=loadaddress+"astroempires.com/"
	baseserver=loadaddress;


// addLoadEvent()
// Adds event to window.onload without overwriting currently assigned onload functions.
// Function found at Simon Willison's weblog - http://simon.incutio.com/
//
errorcount = 0;
function addLoadEvent(func)
{	
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
    	window.onload = func;
	} else {
		window.onload = function(){
		oldonload();
		func();
		}
	}

}
function roundtolowest(vard) {
	vard = vard+"";
	vard = vard.match(/[0-9]+.?/); vard = parseFloat(vard);
	return vard
}
function converttotime(s) {
	s = parseFloat(s)
	if (s<60) {
		time = s+"s"; return time;
	}
	if (s<3600) {
		min = s/60;
		tmpmin = roundtolowest(min);
		tmpmin = parseFloat(tmpmin);
		if (!(tmpmin==min)) {
			s = Math.round((min-tmpmin)*60);
			min = tmpmin
			time = min+"m "+s+"s"
		} else {
			time = min+"m";
		}
		return time;
	}
	hr = s/3600; hr=parseFloat(roundtolowest(hr));
	s = s - (hr*3600);
	min = s/60; min=parseFloat(roundtolowest(min));
	s-=min*60
	time = hr+"h "+min+"m "+s+"s";
	return time;
}
function loadXMLDoc(url) 
				{
				    // branch for native XMLHttpRequest object
				    if (window.XMLHttpRequest) {
				        req = new XMLHttpRequest();
				        req.onreadystatechange = processReqChange;
						//req.onerror = awCrapError;
				        req.open("GET", url, true);
				        req.send(null);
					}
				}
function loadXMLPlanet(url) 
				{
				    // branch for native XMLHttpRequest object
				    if (window.XMLHttpRequest) {
				        req = new XMLHttpRequest();
				        req.onreadystatechange = processReqPlanet;
						//req.onerror = awCrapError;
				        req.open("GET", url, true);
				        req.send(null);
					}
				}
				
				
function processReqPlanet()
				{
					if (req.readyState == 4) {
				        if (req.status == 200) {
				            txtresponse = req.responseText;
							ihtml = txtresponse;
							type = ihtml.match(/Astro Type: &nbsp;<\/b>.+?<br \/>/); type = type[0].replace(/Astro Type: &nbsp;<\/b>/,"");
							terrain = ihtml.match(/Terrain: &nbsp;<\/b>.+?<br \/>/); terrain = terrain[0].replace(/Terrain: &nbsp;<\/b>/,"");
							area = ihtml.match(/Area: &nbsp;<\/b>[0-9]+?<br \/>/); area = area[0].replace(/Area: &nbsp;<\/b>/,"");
							sol= ihtml.match(/Solar Energy: &nbsp;<\/b>[0-9]+?<br \/>/); sol = sol[0].replace(/Solar Energy: &nbsp;<\/b>/,"");
							fert = ihtml.match(/Fertility: &nbsp;<\/b>[0-9]+?<br \/>/); fert = fert[0].replace(/Fertility: &nbsp;<\/b>/,"");
								sol = sol.replace(/<br \/>/,""); type = type.replace(/<br \/>/,""); terrain=terrain.replace(/<br \/>/,"");area=area.replace(/<br \/>/,""); fert=fert.replace(/<br \/>/,"")
							
							metal = ihtml.match(/Metal<\/td><td align='right'>[0-9]+?<\/td>/); metal = metal[0].replace(/Metal<\/td><td align='right'>/,"");
							gas = ihtml.match(/Gas<\/td><td align='right'>[0-9]+?<\/td>/); gas = gas[0].replace(/Gas<\/td><td align='right'>/,"");
							crys = ihtml.match(/Crystals<\/td><td align='right'>[0-9]+?<\/td>/); crys = crys[0].replace(/Crystals<\/td><td align='right'>/,"");
								metal=metal.replace(/<\/td>/,"");gas=gas.replace(/<\/td>/,"");crys=crys.replace(/<\/td>/,"");
							
							str = terrain+" "+type+" ("+area+" area"+"|"+fert+" fert)"; // planet stats
							str = str+" ("+metal+" metal|"+crys+" crys)"; //planet economics/production
							str = str+" ("+gas+" gas|"+sol+" sol)"; //planet powar
							
							currentVerification = emptyPlanets[dpointer];
							loadaddress = "map.aspx?loc="+currentVerification
							link = "<a href='"+loadaddress+"'>"+currentVerification+"</a>";
							
							emptyPlanetsStats[link] = type+","+terrain+","+area+","+sol+","+fert+","+metal+","+gas+","+crys+","+link;
							// 0 = type, 1 = terrain, 2 = area, 3 = solar, 4=fertility, 5=metal,6=gas,7=crys, 8 =link (optional);
							
							completestr = link+" "+str;
							
							document.getElementById("AEinfodiv").innerHTML = document.getElementById("AEinfodiv").innerHTML  + completestr+"<br/>";
							fcounter = (dpointer+1)+"/"+emptyPlanets.length;
							planetsleft = (emptyPlanets.length)-(dpointer+1);
							fcounter += "<br/>Time left: "+converttotime((planetsleft)*10)+"<br/>";
							document.getElementById("warcounter").innerHTML= fcounter;
							dpointer=dpointer+1;
							if ((dpointer<emptyPlanets.length)) {
								var ran_number= Math.random()*10000;
								timerID  = setTimeout("ContinueCheckPlanets()", ran_number);
							} else {
								document.getElementById("warstatloader").innerHTML = "";
								//document.getElementById("AEinfodiv").innerHTML = document.getElementById("AEinfodiv").innerHTML  + "<br><br><div id='aeana2'><a style='cursor: pointer'>EXPLORAR PLANETAS VAZIOS</a> (click)</div><br>";
								//var elmLink = document.getElementById('aeana2');
								//if(elmLink){elmLink.addEventListener("click", function(event) {infoPlanetsInit();}, true);}
							}
						}
					}
				}
				
function processReqChange()
				{
					if (req.readyState == 4) {
				        // only if "OK"
				        if (req.status == 200) {
				            txtresponse = req.responseText;
							ihtml = txtresponse;
							//document.body.innerHTML = ihtml;
							//alert(ihtml.match(/id='/g));
							arPlanets = ihtml.match(/id='[A-Z][0-9][0-9].+?' href='.+?'>.+?<\/a>/g);
							//alert(arPlanets);
							tmpstr = "";
							stopd=1;
							if (arPlanets) {
								for( var i = 0; i < arPlanets.length; i = i+1){
									if ((arPlanets[i].match(/<\/div/))) { 
										if (!(arPlanets[i].match(/- empty -/))) { 
											continue 
										}
									}
									//if ((arPlanets[i].match(/- empty -/))) { continue }
									baseID = ""; baseADD = ""; baseOWNER = "";
									baseID = arPlanets[i].match(/base.aspx\?base=[0-9]+/); 
									baseADD = arPlanets[i].match(/id='.+?'/); baseADD = baseADD[0].replace(/id='/,""); baseADD = baseADD.replace(/_[a-z]'/,"");
									if(!(baseADD.match(/[A-Z][0-9][0-9]:[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/))) { continue }
									baseOWNER = arPlanets[i].replace(/.+?>/,""); baseOWNER = baseOWNER.replace(/<\/a>/,"");
									baseLINK = "<a href='map.aspx?loc="+baseADD+"'>"+baseADD+"</a> - "+baseOWNER;
									if ((arPlanets[i].match(/- empty -/))) { 
										emptyPlanets[emptyPlanets.length] = baseADD;
									} else {
										baseID = baseID[0].replace(/base.aspx\?base=/,"");
										if (!(fullPlanetOcc[baseADD])) {
											fullPlanetsn[fullPlanetsn.length] = baseLINK;
											fullPlanets[fullPlanets.length] = baseADD;
											fullPlanetsi[fullPlanetsi.length] = baseID;
											fullPlanetso[fullPlanetso.length] = baseOWNER;
											fullPlanetOcc[baseADD] = "na";
										} else {
											fullPlanetOcc[baseADD] = baseOWNER;
											baseLINK = baseLINK + " - Occupied by "+baseOWNER;
										}
										
									}
									//tmpstr = tmpstr + baseLINK+"<br/>";
									//document.getElementById("AEinfodiv").innerHTML = document.getElementById("AEinfodiv").innerHTML  + baseLINK+"<br/>";
								}
								tmpstr = "";
								for (i in fullPlanetsn) {
									baseADD = fullPlanets[i];
									baseID = fullPlanetsi[i];
									baseOWNER = fullPlanetso[i];
									baseOCC = "";
									if (!(fullPlanetOcc[baseADD]=="na")) { baseOCC = fullPlanetOcc[baseADD]; }
									if (baseOCC=="") {
										baseLINK = "<a href='map.aspx?loc="+baseADD+"'>"+baseADD+" [<acronym title='Base ID'>"+baseID+"</acronym>]</a> - "+baseOWNER;
									} else {
										baseLINK = "<a href='map.aspx?loc="+baseADD+"'>"+baseADD+" [<acronym title='Base ID'>"+baseID+"</acronym>]</a> - "+baseOWNER+" [<acronym title='Occupier' style='color: red'>"+baseOCC+"</acronym>]";
									}
									tmpstr = tmpstr+baseLINK+"<br/>";
								}
								if (emptyPlanets[0]) { tmpstr=tmpstr+emptyPlanets.length+" PLANETAS VAZIOS ENCONTRADOS"; }
								document.getElementById("AEinfodiv").innerHTML = tmpstr;
								
							} else {
								errorcount=errorcount+1;
								if (!(errorcount<3)) {
									document.getElementById("warstatloader").innerHTML = "<span style='color:red'>Error: There more than 5 errors loading the list.<br/>Either the script is wrong,<br/>Or you don't have scouts covering that region.<br/>Srsly, don't do it again.</span>";
									stopd=0;
								}
							}
							fcounter = (dpointer+1)+"/"+desuSystems.length
							planetsleft = (desuSystems.length)-(dpointer+1);
							fcounter += "<br/>Time left: "+converttotime((planetsleft)*10)+"<br/>";
							document.getElementById("warcounter").innerHTML= fcounter;
							
							dpointer=dpointer+1;
							
							if ((dpointer<desuSystems.length)&&(stopd=1)) {
								var ran_number= Math.random()*10000;
								timerID  = setTimeout("ContinueCheck()", ran_number);
							} else {
								document.getElementById("warstatloader").innerHTML = "";
								document.getElementById("AEinfodiv").innerHTML = document.getElementById("AEinfodiv").innerHTML  + "<br><br><div id='aeana2'><a style='cursor: pointer'>EXPLORAR PLANETAS VAZIOS</a> (click)</div><br>";
								document.getElementById("AEinfodiv").innerHTML = document.getElementById("AEinfodiv").innerHTML  + "<div id='aeana3'><a style='cursor: pointer'>FILTRAR BASES</a> (click)</div><br>";
								var elmLink = document.getElementById('aeana2');
								if(elmLink){elmLink.addEventListener("click", function(event) {infoPlanetsInit();}, true);}
								var elmLink = document.getElementById('aeana3');
								if(elmLink){elmLink.addEventListener("click", function(event) {clearEmptyDur();}, true);}
							}
							// tmpstr here or something
						}
				    }
				}
				
function clearEmptyDur() {
	document.getElementById("AEinfodiv").innerHTML = "";
	//document.getElementById("warstatloader").innerHTML = "<img src='"+throbber+"'>Loading... <span id='warcounter'></span>";
	tmpstr = "";
	for (i in fullPlanetsn) {
		baseADD = fullPlanets[i];
		baseID = fullPlanetsi[i];
		baseOWNER = fullPlanetso[i];
		baseOCC = "";
		if (!(fullPlanetOcc[baseADD]=="na")) { baseOCC = fullPlanetOcc[baseADD]; }
		if (baseOCC=="") {
			baseLINK = "<a href='map.aspx?loc="+baseADD+"'>"+baseADD+" [<acronym title='Base ID'>"+baseID+"</acronym>]</a> - "+baseOWNER;
		} else {
			baseLINK = "<a href='map.aspx?loc="+baseADD+"'>"+baseADD+" [<acronym title='Base ID'>"+baseID+"</acronym>]</a> - "+baseOWNER+" [<acronym title='Occupier' style='color: red'>"+baseOCC+"</acronym>]";
		}
		tmpstr = tmpstr+baseLINK+"<br/>";
	}
	document.getElementById("AEinfodiv").innerHTML = tmpstr;
	document.getElementById("AEinfodiv").innerHTML = document.getElementById("AEinfodiv").innerHTML  + "<br><br>";
	document.getElementById("cmdbox").innerHTML = 'FILTRAR A PALAVRA: (Pressione ENTER para iniciar): <input id="rgx" type="text" name="regex" size="20" onchange="clearEmptyDurFilter(this)">';
	document.getElementById("rgx").focus();
}
function clearEmptyDurFilter(target) {
	document.getElementById("AEinfodiv").innerHTML = "";
	var strFilter = target.value
	if (!(strFilter)) { 
		clearEmptyDur(); 
	} else {
		var reFilter = new RegExp(strFilter, "i");
		strBaseLinkx = "";
		filtPlanets = new Array();
		filtPlanetsn = new Array();
		tmpstr = "";
		for (i in fullPlanetsn) {
			baseOWNER = fullPlanetso[i];
			if (baseOWNER.match(reFilter)) {
				baseADD = fullPlanets[i];
				baseID = fullPlanetsi[i];
				baseOWNER = fullPlanetso[i];
				baseOCC = "";
				if (!(fullPlanetOcc[baseADD]=="na")) { baseOCC = fullPlanetOcc[baseADD]; }
				if (baseOCC=="") {
					baseLINK = "<a href='map.aspx?loc="+baseADD+"'>"+baseADD+" [<acronym title='Base ID'>"+baseID+"</acronym>]</a> - "+baseOWNER;
				} else {
					baseLINK = "<a href='map.aspx?loc="+baseADD+"'>"+baseADD+" [<acronym title='Base ID'>"+baseID+"</acronym>]</a> - "+baseOWNER+" [<acronym title='Occupier' style='color: red'>"+baseOCC+"</acronym>]";
				}
				tmpstr = tmpstr+baseLINK+"<br/>";
				strBaseLinkx = tmpstr;
				filtPlanets[filtPlanets.length] = baseADD;			
			}
		}
		document.getElementById("AEinfodiv").innerHTML = strBaseLinkx;
		document.getElementById("AEinfodiv").innerHTML = document.getElementById("AEinfodiv").innerHTML  + "<br><br>";
		tstr = 'FILTRAR A PALAVRA: (Pressione ENTER para iniciar): <input id="rgx" type="text" name="regex" size="20" onchange="clearEmptyDurFilter(this)"><br/>'
		tstr = tstr+"<div id='aeana5'><a style='cursor: pointer'>Fleet scouting - não sei o que faz</a> (click)</div>"
		document.getElementById("cmdbox").innerHTML = tstr;
		document.getElementById("rgx").focus();
		var elmLink = document.getElementById('aeana5');
		if(elmLink){elmLink.addEventListener("click", function(event) {findFleets();}, true);}
	}
}


function ContinueCheck() {
	currentVerification = desuSystems[dpointer];
	loadaddress = baseserver+currentVerification
	loadXMLDoc(loadaddress) 
}
function ContinueCheckPlanets() {
	currentVerification = emptyPlanets[dpointer];
	loadaddress = baseserver+"map.aspx?loc="+currentVerification
	loadXMLPlanet(loadaddress) 
}
function ContinueCheckFleets() {
	currentVerification = emptyPlanets[dpointer];
	loadaddress = baseserver+"map.aspx?loc="+currentVerification
	loadXMLPlanet(loadaddress) 
}

function infoPlanetsInit() {
	document.getElementById("AEinfodiv").innerHTML = "";
	document.getElementById("warstatloader").innerHTML = "<img src='"+throbber+"'>Loading... <span id='warcounter'></span>";
	dpointer = 0;
	lpointer = emptyPlanets.length;
	//alert(emptyPlanets);
		if (!(lpointer<=0)) {
			hueg = "";
			ContinueCheckPlanets();
		}
}
desuSystems = "";
emptyPlanets = new Array();
emptyPlanetsStats = new Array();
fullPlanetsn = new Array();
fullPlanets = new Array();
fullPlanetso = new Array();
fullPlanetsi = new Array();
filtPlanetsn = new Array();
filtPlanets = new Array();
fullPlanetOcc = new Array();
function infoInit() {
	emptyPlanets = new Array();
	/*var objInfoDiv = document.createElement("div");
			objInfoDiv.setAttribute('id',"AEinfodiv");
			objInfoDiv.innerHTML = "<br/><br/><br/><br/><br/><br/><div id='warstatloader'><img src='"+throbber+"'>Loading...<span id='warcounter'></span></div>";
			//objInfoDiv.style.display = "none";
			document.body.appendChild(objInfoDiv);*/
			
	//var objInfoDiv = document.createElement("div");
			//objInfoDiv.setAttribute('id',"AEinfodiv2");
			//objInfoDiv.innerHTML = "<br/><br/><br/><br/><br/><br/><div id='warstatloader'><img src='"+throbber+"'>Loading... <span id='warcounter'></span></div><div id='AEinfodiv'></div>";
			//objInfoDiv.style.textAlign = "center";
			//document.body.appendChild(objInfoDiv);	
	if ((document.location.href.match(/map\.aspx\?loc=[A-Z][0-9][0-9]:[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/))) {
		//single planet on browser display
		CURRENTSEC = document.location.href.match(/[A-Z][0-9][0-9]:[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/);
		ihtml = document.body.innerHTML;	
		ihtml = ihtml.replace(/<\/center><br><table/,"<\/center><br><center><div id='AEinfodiv2'><div id='warstatloader'><img src='"+throbber+"'>Loading... <span id='warcounter'></span></div><div id='AEinfodiv'></div><div id='cmdbox'></div></center><br/><table");
		document.body.innerHTML = ihtml;	
		
		ihtml = document.body.innerHTML;
		ifleet = ihtml.match(/Fleets<\/th><\/tr>.*/);
		
		fleets = ifleet[0].match(/<a href=.profile.aspx.player=[0-9]+.>.+?<\/a><\/td>.+?<\/td><td><a href=.fleet.aspx.fleet=[0-9]+.>[0-9]+<\/a>/g)
		document.getElementById("AEinfodiv").innerHTML = "Fleet in "+CURRENTSEC+"<br/>";
		fleetAr = new Array();
		fleetAr2 = new Array();
		totalfleetsize = 0;
		totalpresize = 0;
		totalincsize = 0;
		for(i in fleets) {
			fleetO = fleets[i].match(/<a href=.profile.aspx.player=[0-9]+.>.+?<\/a>/); fleetO = fleetO[0];
				fleetO = fleetO.replace(/<a href=.profile.aspx.player=[0-9]+.>/,""); fleetO = fleetO.replace(/<\/a>/,""); 
				ifleet = fleets[i].replace(/<a href=.profile.aspx.player=[0-9]+.>.+?<\/a>/,"");
			fleetS = ifleet.match(/<a href=.fleet.aspx.fleet=[0-9]+.>[0-9]+<\/a>/); fleetS = fleetS[0]; 
				fleetS = fleetS.replace(/<a href=.fleet.aspx.fleet=[0-9]+.>/,"");
				fleetS = fleetS.replace(/<\/a>/,""); fleetS = parseFloat(fleetS); 
				ifleet = ifleet.replace(/<a href=.fleet.aspx.fleet=[0-9]+.>[0-9]+<\/a>/,"");
				ifleet = ifleet.replace(/<\/td>/g,""); ifleet = ifleet.replace(/<td>/g,"") 
			iSTR = "Owner: "+fleetO+" Size: "+fleetS+" Ex: "+ifleet;
			totalfleetsize += fleetS;
			if (!(ifleet)) {
				totalpresize += fleetS;
				if (!(fleetAr[fleetO])) {
					fleetAr[fleetO] = fleetS;
				} else {
					fleetAr[fleetO] = fleetAr[fleetO] + fleetS;
				}
			} else {
				totalincsize += fleetS;
				//alert("incoming");
				if (!(fleetAr[fleetO])) {
					fleetAr[fleetO] = 0;
				}
				if (!(fleetAr2[fleetO])) {
					fleetAr2[fleetO] = fleetS;
				} else {
					fleetAr2[fleetO] = fleetAr2[fleetO] + fleetS;
				}
			}
		}
		iSTR = "";
		for(i in fleetAr) {
			fleetO = i;
			fleetCS = fleetAr[i];
			if (fleetAr2[i]) {
				fleetNS = fleetAr2[i];
				iSTR = iSTR+fleetO+" [Cur: "+fleetCS+" | Inc: "+fleetNS+"]<br/>";
			} else {
				iSTR = iSTR+fleetO+" [Cur: "+fleetCS+"]<br/>";
			}
		}
		
		iSTR = iSTR+"<span style='display: none;'>[b]</span>Total Fleet Size<span style='display: none;'>[/b]</span><br/>"
		iSTR = iSTR+ "Currently: "+totalpresize+"<br/>Incoming: "+totalincsize+"<br/><span style='display: none;'>[b]</span>Grand total:<span style='display: none;'>[/b]</span> "+totalfleetsize+"<br/>";
		document.getElementById("AEinfodiv").innerHTML = document.getElementById("AEinfodiv").innerHTML + iSTR+"<br/>";
		document.getElementById("warstatloader").innerHTML = "";
	}
	
	else if ((document.location.href.match(/map\.aspx\?loc=[A-Z][0-9][0-9]:[0-9][0-9]:[0-9][0-9]/))) {
		//solar system
		
		ihtml = document.body.innerHTML;	
		ihtml = ihtml.replace(/<\/table><br><center>/,"</table><br><center><div id='AEinfodiv2'><div id='warstatloader'><img src='"+throbber+"'>Loading... <span id='warcounter'></span></div><div id='AEinfodiv'></div><div id='cmdbox'></div><br/>");
		document.body.innerHTML = ihtml;	
		ihtml = document.body.innerHTML;
		
		arPlanets = ihtml.match(/id="[A-Z][0-9][0-9].+?" href=".+?">.+?<\/a>/g);
		tmpstr = "";
		for( var i = 0; i < arPlanets.length; i = i+1){
			if ((arPlanets[i].match(/<\/div/))) { continue }
			//if ((arPlanets[i].match(/- empty -/))) { continue }
			baseID = ""; baseADD = ""; baseOWNER = "";
			baseID = arPlanets[i].match(/base.aspx\?base=[0-9]+/);
			baseADD = arPlanets[i].match(/id=".+?"/); baseADD = baseADD[0].replace(/id="/,""); baseADD = baseADD.replace(/_[a-z]"/,"");
			if(!(baseADD.match(/[A-Z][0-9][0-9]:[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/))) { continue }
			baseOWNER = arPlanets[i].replace(/.+?>/,""); baseOWNER = baseOWNER.replace(/<\/a>/,"");
			baseLINK = "<a href='map.aspx?loc="+baseADD+"'>"+baseADD+"</a> - "+baseOWNER;
			tmpstr = tmpstr + baseLINK+"<br/>";
		}
		document.getElementById("warstatloader").innerHTML = "";
		document.getElementById("AEinfodiv").innerHTML = document.getElementById("AEinfodiv").innerHTML  + tmpstr;
	} 

	else if ((document.location.href.match(/map\.aspx\?loc=[A-Z][0-9][0-9]:[0-9][0-9]/))) {
		//whole sector. Example: B34:34
		
		ihtml = document.body.innerHTML;	
		ihtml = ihtml.replace(/<\/table><br><center>/,"</table><br><center><div id='AEinfodiv2'><div id='warstatloader'><img src='"+throbber+"'>Loading... <span id='warcounter'></span></div><div id='AEinfodiv'></div><div id='cmdbox'></div><br/>");
		document.body.innerHTML = ihtml;	
		ihtml = document.body.innerHTML;
		
		arSystems = ihtml.match(/map\.aspx\?loc=[A-Z][0-9][0-9]:[0-9][0-9]:[0-9][0-9]/g);
		tmpstr = "";
		b = 0;
		desuSystems = new Array();
		for( var i = 0; i < arSystems.length; i = i+2){
			tmpstr = tmpstr + "System: "+arSystems[i]+"<br/>";
			desuSystems[b] = arSystems[i]; b = b + 1;
		}
		dpointer = 0;
		lpointer = desuSystems.length;
		if (!(lpointer<=0)) {
			hueg = "";
			ContinueCheck();
		}
		//var ran_number= Math.random()*3;
		//timerID  = setTimeout("SquadWarCheck()", ran_number);
	}
	//document.getElementById("AEinfodiv").innerHTML = document.getElementById("AEinfodiv").innerHTML  + tmpstr;
}
//infoInit();

var elmLink = document.getElementById('aeana');
if(elmLink){elmLink.addEventListener("click", function(event) {infoInit();}, true);}
//addLoadEvent(infoInit);
function setfocus(a_field_id) {
    $(a_field_id).focus()
}
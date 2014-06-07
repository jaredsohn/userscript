// ==UserScript==
// @name           AutoExplore
// @namespace      http://websiteoninternet.com
// @include        http://*.war-facts.com/*
// ==/UserScript==

//Settings
var ae_on = GM_getValue("ae_on",0);
var ae_stopaton= GM_getValue("ae_stopaton",0);
var ae_stopat= GM_getValue("ae_stopat",0);
var ae_loop=GM_getValue("ae_loop",0);
var explorersat = 0;
var fleetson="";
var fleetrange=80000000;
var lastfleet=0;

function butts() {
	//alert('butts');
	var set_ae_on = document.getElementById('ae_on').checked;
	if (set_ae_on) { 
		GM_setValue('ae_on', 1); 
		ae_on=1; 
		//alert('turn on');
	} else { 
		GM_setValue('ae_on', 0); 
		ae_on=0;
		//alert('turn off');
	}
	var set_stopaton = document.getElementById('ae_stopaton').checked;
	if (set_stopaton) { 
		GM_setValue('ae_stopaton', 1); 
		ae_stopaton=1; 
		//alert('turn on');
	} else { 
		GM_setValue('ae_stopaton', 0); 
		ae_stopaton=0;
		//alert('turn off');
	}
	var set_aeloop = document.getElementById('ae_loop').checked;
	if (set_aeloop) { 
		GM_setValue('ae_loop', 1); 
		ae_loop=1; 
		//alert('turn on');
	} else { 
		GM_setValue('ae_loop', 0); 
		ae_loop=0;
		//alert('turn off');
	}
	var set_stopat = document.getElementById('ae_stopat').value;
	GM_setValue('ae_stopat', set_stopat);
	//alert(set_ae_on);
	ae_settings();
}

var checkleft = String(document.getElementsByClassName('leftbox').item(0).innerHTML);
checkleft=checkleft.match(/Fleets/);
//alert(checkleft);
fleetson='left';

if(!checkleft) {
	var checkright = String(document.getElementsByClassName('rightbox').item(0).innerHTML);
	checkright=checkright.match(/Fleets/);
	//alert(checkright);
	fleetson='right';
}
if(!checkright&&!checkleft) {
	alert('error.... where are your fleets?');
	fleetson="";
}

var aelink="<div style=\"padding:5px;margin-top:30px;\"><a href=\"javascript:ae_settings();\">AutoExplore Settings</a></div>";

if (fleetson=='left') {
	document.getElementsByClassName('leftbox').item(0).innerHTML=aelink+document.getElementsByClassName('leftbox').item(0).innerHTML;
	var fleetlist = document.getElementsByClassName('leftbox').item(0);
} else {
	document.getElementsByClassName('rightbox').item(0).innerHTML=aelink+document.getElementsByClassName('rightbox').item(0).innerHTML;
	var fleetlist = document.getElementsByClassName('rightbox').item(0);
}




//alert(fleetlist.innerHTML);
var fleetcount = fleetlist.getElementsByTagName('script');
//alert(fleetlist.length);
for (var i=0;i<fleetcount.length;i++) {
	// Find the explorers
	var scriptjunk = fleetlist.getElementsByTagName('script').item(i).innerHTML;
	var explorecheck = scriptjunk.match(/Explorercontent/);
	if(explorecheck=='Explorercontent') {
		explorersat=i;
		//alert(explorecheck);
		break;
	}
	
	
}
var explorers = String(fleetlist.getElementsByTagName('script').item(explorersat).innerHTML);
explorers = explorers.match(/fleet=([^]+?)\</g);
//alert(explorers.length);
var stopatdropdown=new Array();
var stopatdropdown2=new Array();
for (var i=0;i<explorers.length;i++) {
	var thisid = explorers[i].match(/\=([^]+?)\"/);
	var thisname = explorers[i].match(/\>([^]+?)\</);
	stopatdropdown.push(Number(thisid[1]));
	stopatdropdown2.push(thisname[1]);
	if (i==explorers.length-1) {
		lastfleet=Number(thisid[1]);
	}
	//fleetstop+="<option value=\""+thisid[1]+"\">"+thisname[1]+"</option>";
}
//alert(lastfleet);
//explorelist = explorelist.match(/\d+/g);
//alert (explorelist.join('\n'));


	var addbr = document.createElement("br");
	var settings_div = document.createElement("div");
	settings_div.setAttribute("id","autoexplore");
	settings_div.style.width = "430px";
		settings_div.style.height = "330px";
		settings_div.style.border = "2px solid blue";
		settings_div.style.backgroundColor = "black";
		settings_div.style.position = "absolute";
		settings_div.style.top = "320";
		settings_div.style.left = "300";
		settings_div.style.zIndex = "101";
		settings_div.style.visibility = 'hidden';
		settings_div.appendChild(document.createTextNode("AutoExplore Settings:"));
		settings_div.appendChild(addbr);settings_div.appendChild(addbr);
		
		var ae_configForm = document.createElement('form');
		ae_configForm.setAttribute("name", "ae_form");
		
		
		var turnon = document.createElement('input');
		turnon.setAttribute("type", "checkbox");
		turnon.setAttribute("id", "ae_on");
		turnon.setAttribute("value", "1");
		if (ae_on==1) turnon.setAttribute("checked", "true");
		ae_configForm.appendChild(turnon);
		ae_configForm.appendChild(document.createTextNode(" Turn on AutoExplore?"));
		ae_configForm.appendChild(addbr);
		var newline = document.createElement("p")
		var stopatbox = document.createElement('input');
		stopatbox.setAttribute("type", "checkbox");
		stopatbox.setAttribute("id", "ae_stopaton");
		stopatbox.setAttribute("value", "1");
		if (ae_stopaton==1) stopatbox.setAttribute("checked", "true");
		newline.appendChild(stopatbox);
		newline.appendChild(document.createTextNode(" Stop auto-advancing at:"));
		ae_configForm.appendChild(newline);
		
		var stopat = document.createElement('select');
		stopat.setAttribute("id", "ae_stopat");
		for (var i=0;i<stopatdropdown.length;i++) {
			var option=document.createElement('option');
			option.value=stopatdropdown[i];
			if (stopatdropdown[i]==ae_stopat) {
				option.setAttribute('selected', 'true');
			}
			option.appendChild(document.createTextNode(stopatdropdown2[i]));
  			stopat.appendChild(option)
		}
		ae_configForm.appendChild(stopat);
		ae_configForm.appendChild(addbr);
		
		var newline2 = document.createElement("p")
		var loopthrough = document.createElement('input');
		loopthrough.setAttribute("type", "checkbox");
		loopthrough.setAttribute("id", "ae_loop");
		loopthrough.setAttribute("value", "1");
		if (ae_loop==1) loopthrough.setAttribute("checked", "true");
		newline2.appendChild(loopthrough);
		newline2.appendChild(document.createTextNode(" Loop back to beginning when done?"));
		ae_configForm.appendChild(newline2);
		
		var savebutton = document.createElement('input');
		savebutton.setAttribute("type", "button");
		savebutton.setAttribute("value", "Save");
		savebutton.setAttribute("id", "aesavebutton");
		//savebutton.setAttribute("onClick", "javascript:save_ae_config(),ae_settings();");
		//ctinp.setAttribute("onclick", "javascript:saveConfigNode();");
		savebutton.addEventListener("click", butts, false);
		savebutton.setAttribute("onClick", "javascript:ae_settings();");
		ae_configForm.appendChild(savebutton);
		
		var cancelbutton = document.createElement('input');
		cancelbutton.setAttribute("type", "button");
		cancelbutton.setAttribute("value", "Cancel");
		cancelbutton.setAttribute("id", "aecancelbutton");
		cancelbutton.setAttribute("onClick", "javascript:ae_settings();");
		//ctinp.setAttribute("onclick", "javascript:saveConfigNode();");
		//savebutton.addEventListener("click", save_ae_config, false);
		ae_configForm.appendChild(cancelbutton);
		
		settings_div.appendChild(ae_configForm);
		if (ae_on==1) {
			
		} else {
			
		}
	document.body.appendChild(settings_div);


unsafeWindow.ae_settings = function() {
	//alert("settings");
	var aeicn = document.evaluate("//div[@id='autoexplore']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var aecn = aeicn.iterateNext();
	if (aecn) {
		if (aecn.style.visibility == "hidden")
			aecn.style.visibility = "visible";
		else
			aecn.style.visibility = "hidden";
	}
}



var isExplorer = document.evaluate("//text()[contains(.,'Classification: Explorer')]", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
if (isExplorer && ae_on==1) {
	//if (ae_on==1) {
	
	
	
	var ignore=0;
	var nextfleet=0;
	var rows="";
	var didsomething=0;
	var thisfleet=0;
	
	
	var shipat = String(document.evaluate("/html/body/div/div/center/p/table/tbody/tr/td/form/table/tbody/tr/td/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
	var nums = shipat.match(/\d+/g);
	var isatplanet = shipat.match(/planet/);
	var isatsystem = shipat.match(/system/);
	if(isatplanet) {
		//alert('at planet');
		var fleet = nums[1];
	} else if(isatsystem) {
		//alert('at system entrance');
		var fleet = nums[1];
	} else if(nums.length>2) {
		//alert('in global space');
		var fleet = nums[0];
		ignore=1;
	} else {
		//alert('probably at colony');
		var fleet = nums[1];
		
		ignore=1;
	}
	
	//alert("THE CURRENT FLEET ID IS: "+fleet);
	//alert("YOU SEEM TO HAVE THIS MANY EXPLORER FLEETS: "+stopatdropdown.length);
	for (var si=0;si<stopatdropdown.length;si++) {
			if (fleet==stopatdropdown[si]&&si<stopatdropdown.length-1) {
				nextfleet=Number(stopatdropdown[si+1]);
				//alert("THE NEXT FLEET IN THE LIST IS: "+nextfleet);
				break;
			}
		}

	
	
	var goto=0;
	var atplanet=0;
	if (isatplanet=='planet') {
		atplanet=nums[0];
		//alert("At planet "+atplanet);
	} else if (isatsystem=='system') {
		goto=1;
		if(document.evaluate("/html/body/div/div/center/p/table/tbody/tr/td/form/table/tbody/tr[5]/td",  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
			//alert('outofgas'); 
			$ignore=1;
			if(fleet==ae_stopat && ae_stopaton==1 || fleet==lastfleet) {
				if (ae_loop==1) {
						window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+stopatdropdown[0];
					}
				} else {
					window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+nextfleet;
				}
		}
		//alert("At system entrance");
		//if (outofgas.innerHTML!="Target Position:") {  }
		
	} else {
		//alert("not in system, ignore");
		ignore=1;
	}
	var travelcheck = document.evaluate("/html/body/div/div/center/p/table/tbody/tr/td/table/tbody/tr/td/font/b",  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			//alert(travelcheck.innerHTML);
	if (travelcheck.innerHTML == "In Transit" || fleet==ae_stopat && ae_stopaton==1) {
				//alert('forward');
				if(fleet==ae_stopat && ae_stopaton==1 || fleet==lastfleet) {
					if (ae_loop==1) {
						window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+stopatdropdown[0];
					}
				} else {
					window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+nextfleet;
				}
	} else if (ignore==0) {
		
		var form2 = document.getElementsByName('tworld2').item(0).innerHTML;
		//alert(form2);
		var option = form2.match(/value\=\"([^]+?)\"\>/g);
		var checkforwh = form2.match(/w_/);
		//alert(checkforwh);
		//alert(option.join('\n\n'));
		//alert(option.length);
		for (var i=1;i<=option.length;i++) {
				//alert(i+": "+option[i]);
				var planetid = option[i].match(/\d+/g);
				
				//alert(option.length-1);
				if (goto==1) {
						//alert("sending ship to first planet: "+planetid);
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://'+window.location.hostname+'/extras/scan.php?fleet='+fleet,
							async: false,
							onload: function(data2) {
								var iswormhole = data2.responseText.match(/\<i\>Wormhole\!\<\/i\>/m);
								if (iswormhole) {
									alert('Found a Wormhole!');
								} else {
									//alert('no wormhole');
								window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+fleet+"&tworld="+planetid+"&verify=yes&mtype=explore";
								}
							}
						});
						break;
				} else if(planetid==atplanet&&((i<option.length-1 && !checkforwh) || (checkforwh && i==option.lenth-2))) {
					var nextplanetid = option[i+1].match(/\d+/g);
						//alert("At planet "+i);
						window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+fleet+"&tworld="+nextplanetid+"&verify=yes&mtype=explore";
						didsomething=1;
						break;
				} else if (i==option.length-1 || (checkforwh && i==option.lenth-2)) {
					//alert('ship is done');
					// lets load up the starmap and see if we can send it somewhere else
					var globalcoords = document.evaluate("/html/body/div/div/center/p/table/tbody/tr/td/form/table/tbody/tr[2]/td[4]",  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					globalcoords = String(globalcoords.getElementsByTagName('a').item(1));
					globalcoords = String(globalcoords.match(/\?([^]+?)\'/g));
					globalcoords = globalcoords.slice(0,-1);
					//alert(globalcoords)
					var range = document.evaluate("/html/body/div/div/center/p/table/tbody/tr/td/form/table/tbody/tr[3]/td[2]",  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					range = range.innerHTML;
					range = range.replace(/\,/g,'');
					fleetrange = Number(range.match(/\d+/));
					//alert(fleetrange);
					
					GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://'+window.location.hostname+'/extras/textmap.php'+globalcoords+"&order=3&lr=1",
							async: false,
							onload: function(data2) {
								var syssearch = data2.responseText.match(/\<tr\>([^]+?)\<\/tr\>/g);
								for (var ssi=1;ssi<syssearch.length;ssi++) {
									var syscols = syssearch[ssi].match(/\<td([^]+?)\<\/td\>/g);
									//alert(syscols.join('\n\n'));
									if (syscols[0].match(/empire database/)) {
										//alert('ignore');
									} else {
										for (var sci=0;sci<syscols.length;sci++) {
											if (sci==0) {
												var thiscrap = syscols[sci].match(/color\=([^]+?)\>/);
												if (thiscrap[1]=='5555ff') {
													var noonegoing=1;
												} else if (thiscrap[1]=='da70d6') {
													var noonegoing=1;
													var empireexplored=1;
												} else {
													var noonegoing=0;
												}
												
												//alert(linkcolor);
												//alert(noonegoing);
												var thiscrap = syscols[sci].match(/\>([^]+?)\</g);
												thiscrap = thiscrap[1].slice(1,-1);
												var sysname = thiscrap;
												//alert(sysname);
											} else {
												
												if (sci==2) {
													var thiscrap = syscols[sci].match(/\>([^]+?)\</);
													thiscrap = thiscrap[1].split(",");
													var xcoord = Number(thiscrap[0]);
													var ycoord = Number(thiscrap[1]);
													var zcoord = Number(thiscrap[2]);
													var coords = "&x="+xcoord+"&y="+ycoord+"&z="+zcoord;
												} else if (sci==4) {
													var thiscrap = syscols[sci].match(/\>([^]+?)\</);
													thiscrap = thiscrap[1].replace(/\,/g,'');
													thiscrap = thiscrap.slice(0,-3);
													var distance = Number(thiscrap);
													//alert(distance);
												}
											}
										}
									}
									//alert("System: "+sysname+"\nFree?: "+noonegoing+"\nDistance: "+distance+"\nCoords: "+coords+"\Empire?");
									if ((sysname=='?unknown?' || empireexplored==1)&& noonegoing==1 && distance < (fleetrange-1000000)) {
										//alert('Send to '+sysname+' @ '+coords)
										window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+fleet+"&verify=yes&mtype=explore&tpos=global"+coords;
										break;
									} 
									
									if (distance>fleetrange-1000000) {
										//alert('No unexplored systems in range');
										GM_xmlhttpRequest({
											method: 'GET',
											url: 'http://'+window.location.hostname+'/extras/textmap.php'+globalcoords+"&order=4&lr=1",
											async: false,
											onload: function(data2) {
												//alert(data2.responseText);
												var syssearch = data2.responseText.match(/\<tr\>([^]+?)\<\/tr\>/g);
													for (var ssi=1;ssi<syssearch.length;ssi++) {
														var syscols = syssearch[ssi].match(/\<td([^]+?)\<\/td\>/g);
														//alert(syscols.join('\n\n'));
														if (syscols[0].match(/empire database/)) {
															//alert('ignore');
														} else {
															for (var sci=0;sci<syscols.length;sci++) {
																if (sci==0) {
																	var thiscrap = syscols[sci].match(/color\=([^]+?)\>/);
																	if (thiscrap[1]=='5555ff') {
																		var noonegoing=1;
																	} else if (thiscrap[1]=='da70d6') {
																		var noonegoing=1;
																		var empireexplored=1;
																	} else {
																		var noonegoing=0;
																	}
																	
																	//alert(linkcolor);
																	//alert(noonegoing);
																	var thiscrap = syscols[sci].match(/\>([^]+?)\</g);
																	thiscrap = thiscrap[1].slice(1,-1);
																	var sysname2 = thiscrap;
																	//alert(sysname);
																} else {
																	
																	if (sci==2) {
																		var thiscrap = syscols[sci].match(/\>([^]+?)\</);
																		thiscrap = thiscrap[1].split(",");
																		var xcoord = Number(thiscrap[0]);
																		var ycoord = Number(thiscrap[1]);
																		var zcoord = Number(thiscrap[2]);
																		var coords = "&x="+xcoord+"&y="+ycoord+"&z="+zcoord;
																	} else if (sci==4) {
																		var thiscrap = syscols[sci].match(/\>([^]+?)\</);
																		thiscrap = thiscrap[1].replace(/\,/g,'');
																		thiscrap = thiscrap.slice(0,-3);
																		var distance = Number(thiscrap);
																		//alert(distance);
																	}
																}
															}
														}
														if (distance<fleetrange-1000000 && sysname2!='?unknown?') {
															
															//alert('uppest system found: '+distance);
															var system = syssearch[ssi].match(/system\=([^]+?)\&/);
															//alert(system[1]);
															GM_xmlhttpRequest({
																method: 'GET',
																url: 'http://'+window.location.hostname+'/extras/view_system.php?system='+system[1],
																async: false,
																onload: function(data2) {
																	//alert(data2.responseText);
																	var planet=data2.responseText.match(/planet\=([^]+?)\"/g);
																	var lastplanet=0;
																	for (var pi=0;pi<planet.length;pi++) {
																		var chub = planet[pi].match(/planet\=([^]+?)\"/);
																		//alert(chub[1]);
																		if (chub[1]>lastplanet) { lastplanet=chub[1]; }
																	}
																	//alert(planet);
																	window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+fleet+"&tworld="+lastplanet+"&verify=yes&mtype=transfer";
																}
															});
															
															
															
															
															
															//javascript:extview('/extras/view_system.php?system=6766&fleet=5169');
															break;
														}
													}
												
												//http://www.war-facts.com/fleet_navigation.php?x=-187453&y=161070&z=8202&tpos=global&fleet=4322
											}
										});
										break;
									}
								}
								//alert(syssearch.join('\n\n'));
								
								//http://www.war-facts.com/fleet_navigation.php?x=-187453&y=161070&z=8202&tpos=global&fleet=4322
							}
						});
					
					//window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+nextfleet;
					didsomething=1;
				} 
				
		}
		
		if (didsomething==0) {
				//alert('probably ran out of gas');
		}
	} else {
		if(fleet==ae_stopat && ae_stopaton==1 || fleet==lastfleet) {
			if (ae_loop==1) {
				window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+stopatdropdown[0];
			}
		} else {
			window.location.href = "http://www.war-facts.com/fleet_navigation.php?fleet="+nextfleet;
		}
	}
}


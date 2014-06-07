// ==UserScript==
// @name         Werte Abgabe für Legionäre
// @namespace    http://userscripts.org/scripts/source/175443.user.js
// @author       Bizzy13
// @version      1.1.5 Abgabeverfahren geändert um Probleme mit Pop-up zu lösen
// @description  Gibt eine Meldung aus sobald der Legionär seine Werte auf DF.de neu abgeben muss, die Abgabe kann dann bequem über das Script erfolgen 
// @include      http://*.pennergame.de/*
// @exclude      http://*board.pennergame.de/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

// @version      1.1.4 Auto-Updatemeldung angepasst
// @version      1.1.3 GET URL's korregiert
// @version      1.1.2 Variablenname korregiert
// @version      1.1.1 Einige Testvariablen entfernt
// @version      1.1 Test Update

//======================//
// Update Informationen //
//======================//
var Script_ID = '175443';
var Info_URL = 'http://userscripts.org/scripts/show/'+Script_ID;
var Installations_URL = 'http://userscripts.org/scripts/source/'+Script_ID+'.user.js';
var Version = '1.1.5';

//============================//
// Update-Funktion im 6h Takt //
//============================//
var Jetzt = (new Date().getTime()/3600000).toString().split('\.')[0];
var Letztes_Update = GM_getValue('Letztes_Update','0');
if (Jetzt - Letztes_Update >= 6)
	{
	GM_xmlhttpRequest({
		method: 'GET',  
		url: 'http://userscripts.org/scripts/source/'+Script_ID+'.meta.js',
		onload: function(responseDetails)
			{
			var Scriptname = (/@name\s*(.*?)\s*$/m.exec(responseDetails.responseText))[1];  
			var History = (/@version\s*(.*?)\s*$/m.exec(responseDetails.responseText))[1];  
			var Neue_Version = (/@version\s*(.*?)\s/m.exec(responseDetails.responseText))[1];
			if (Neue_Version != Version)
				{  
				if (confirm('Es gibt eine neue Version des Skriptes '+Scriptname+':\n\nVersion: \n'+History+'\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n'+Info_URL+'\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschliessend durchgeführt werden.'))
					{  
					window.location.href = ''+Installations_URL+'';
					}
				}
			}
	}, false); 
	GM_setValue('Letztes_Update', Jetzt);
	}

//=================================================================//
// Ermitteln der Stadt und setzen des Stadtspezifischen Grundlinks //
//=================================================================//
if (location.toString().indexOf("www.pennergame.de") != -1)
	{
	var Stadt = 'Hamburg';
	var Stadtkuerzel = 'de_DE';
	var Link = 'http://www.pennergame.de/';
	var Meldung = 'Deine Kraftwerte der Stadt Hamburg sind älter als 7 Tage!';
	var Skill_Suchmaske_Start = '<td width="108">';
	var Skill_Suchmaske_Ende = '<span class="style9">';
	}
if (location.toString().indexOf("berlin") != -1)
	{
	var Stadt = 'Berlin';
	var Stadtkuerzel = 'bl_DE';
	var Link = 'http://berlin.pennergame.de/';
	var Meldung = 'Deine Kraftwerte der Stadt Berlin sind älter als 7 Tage!';
	var Skill_Suchmaske_Start = '<td width="108">';
	var Skill_Suchmaske_Ende = '<span class="style9">';
	}
if (location.toString().indexOf("muenchen") != -1)
	{
	var Stadt = 'München';
	var Stadtkuerzel = 'mu_DE';
	var Link = 'http://muenchen.pennergame.de/';
	var Meldung = 'Deine Kraftwerte der Stadt München sind älter als 7 Tage!';
	var Skill_Suchmaske_Start = '<td width="108">';
	var Skill_Suchmaske_Ende = '<span class="style9">';
	}
if (location.toString().indexOf("koeln") != -1)
	{
	var Stadt = 'Köln';
	var Stadtkuerzel = 'kl_DE';
	var Link = 'http://koeln.pennergame.de/';
	var Meldung = 'Deine Kraftwerte der Stadt Köln sind älter als 7 Tage!';
	var Skill_Suchmaske_Start = '<td width="108">';
	var Skill_Suchmaske_Ende = '<span class="style9">';
	}
if (location.toString().indexOf("reloaded") != -1)
	{
	var Stadt = 'Hamburg Reloaded';
	var Stadtkuerzel = 'hr_DE';
	var Link = 'http://reloaded.pennergame.de/';
	var Meldung = 'Deine Kraftwerte der Stadt HRRamburg sind älter als 7 Tage!';
	var Skill_Suchmaske_Start = '<td width="108">';
	var Skill_Suchmaske_Ende = '<span class="style9">';
	}
if (location.toString().indexOf("sylt") != -1)
	{
	var Stadt = 'Sylt';
	var Stadtkuerzel = 'sy_DE';
	var Link = 'http://sylt.pennergame.de/';
	var Meldung = 'Deine Kraftwerte der Stadt Sylt sind älter als 7 Tage!';
	var Skill_Suchmaske_Start = '<span class="skill_progress_text">';
	var Skill_Suchmaske_Ende = '</span>';
	}
	
//============================//
// Hinweistext zusammensetzen //
//============================//	
var Hinsweistext = 'Deine Kraftwerte für '+Stadt+' sind älter als 7 Tage!\n\nDurch ein Klick auf OK werden die abzugebenden Werte ermittelt.';

//====================================================//
// Setzen der Zeitvariablen für das Kontrollintervall //
//====================================================//
var Zeitstempel = (new Date().getTime()/3600000).toString().split('\.')[0];
var Letzte_Kontrolle = GM_getValue('Letzte_Kontrolle['+Stadt+']','0');

//======================//
// Kontrolle im 3h Takt //
//======================//
if (Zeitstempel - Letzte_Kontrolle >= 3)
{
	//===================//
	// Username auslesen //
	//===================//
	GM_xmlhttpRequest(
		{
		method: 'GET',
		url: Link+'overview/',
		onload: function(responseDetails)
			{
			var Quelltext = responseDetails.responseText;
			var Username = Quelltext.split('style="font-family:\'CrackhousefranceRegular\'; font-size: 48px;">')[1].split('</span>')[0];
			//=======================================//
			// Userdaten über Downfight OPI abrufen  //
			//=======================================//
			GM_xmlhttpRequest(
				{
				method: 'GET',
				url: 'http://downfight.de/opi.php?username='+Username+'&stadt='+Stadtkuerzel,
				onload: function(responseDetails)
					{
					var Quelltext = responseDetails.responseText;
					var Gruppe = Quelltext.split('<group>')[1].split('</group>')[0];
					//============================//
					// Wenn der User Legionär ist //
					//============================//
					if (Gruppe == 'Kopfgeld Legion')
						{
						//===========================//
						// DF-Login Parameter setzen //
						//===========================//
						var DF_Domain = new Array('', '1.', '2.', '3.', '4.');
						var Index = 0;
						//=======================//
						// DF-Login Suchfunktion //
						//=======================//
						function Login(Wert)	// "Wert" beschreibt eine Zahl welche durch "Index" gesetzt wird
							{
							if (Wert < DF_Domain.length - 1)
								{
								GM_xmlhttpRequest(
									{
									method: 'GET',
									url: 'http://'+DF_Domain[Wert]+'downfight.de/opi.php?username='+Username+'&stadt='+Stadtkuerzel+'&showlogin=1',
									onload: function(responseDetails)
										{
										var Quelltext = responseDetails.responseText;
										var DF_Login = Quelltext.split('<loggedin>')[1].split('</loggedin>')[0];
										//=========================//
										// Kein passender DF-Login //
										//=========================//
										if (DF_Login == 0)
											{
											Index++;
											Login(Index);
											}
										//=========================//
										// Kein passender DF-Login //
										//=========================//
										if (DF_Login == 1)
											{
											Index++;
											Login(Index);
											}
										//====================//
										// Passender DF-Login //
										//====================//
										if (DF_Login == 2)
											{
											var Hauptquartier = 'http://'+DF_Domain[Index]+'downfight.de/?seite=hauptquartier';
											//============================================//
											// Quelltext vom Legionshauptquartier abrufen //
											//============================================//
											GM_xmlhttpRequest(
												{
												method: 'GET',
												url: Hauptquartier,
												onload: function (responseDetails)
													{
													var Quelltext = responseDetails.responseText;
													//====================================================//
													// Hauptquartier nach passenden Meldungen durchsuchen //
													//====================================================//
													if (Quelltext.search(Meldung) != -1)
														{
														//===============================================================//
														// Hinweistext anzeigen / wenn der User seine Werte abgeben will //
														//===============================================================//
														if (confirm(Hinsweistext) == true)
															{  
															var Ziel_URL = 'http://'+DF_Domain[Index]+'downfight.de/?seite=hauptquartier';
															//=================//
															// Skills abfragen //
															//=================//
															GM_xmlhttpRequest(
																{
																method: 'GET',
																url: Link+'skills/',
																onload: function (responseDetails)
																	{
																	var Quelltext = responseDetails.responseText;
																	//========================================================//
																	// Skills auslesen & überflüssige "Whitespaces" entfernen //
																	//========================================================//
																	var ATT_Skill = Number(Quelltext.split(Skill_Suchmaske_Start)[1].split(Skill_Suchmaske_Ende)[0].replace(/\s/g, ''));
																	var DEF_Skill = Number(Quelltext.split(Skill_Suchmaske_Start)[2].split(Skill_Suchmaske_Ende)[0].replace(/\s/g, ''));
																	var DEX_Skill = Number(Quelltext.split(Skill_Suchmaske_Start)[3].split(Skill_Suchmaske_Ende)[0].replace(/\s/g, ''));
																	//=============================//
																	// verfügbare Waffen ermitteln //
																	//=============================//
																	GM_xmlhttpRequest(
																		{
																		method: 'GET',
																		url: Link+'city/weapon_store/',
																		onload: function (responseDetails)
																			{
																			var Quelltext = responseDetails.responseText;
																			var Waffe = 0;
																			//===========================================//
																			// Prüfen ob überhaupt Waffen vorhanden sind //
																			//===========================================//
																			if (Quelltext.search(/<span class="att">/) != -1)
																				{
																				var Dokument = document.createElement('div');
																				Dokument.innerHTML = Quelltext;
																				var Tabellen = Dokument.getElementsByTagName('table');
																				//==========================================//
																				// Schleife zum extrahieren der Waffenwerte //
																				//==========================================//
																				for (var i = 0; i < Tabellen.length; i++)
																					{
																					var Temp = Number(Quelltext.split('<span class="att">')[i+1].split('</span>')[0].replace(/\s\+/g, ''));
																					//=============================//
																					// besten Waffenwert speichern //
																					//=============================//
																					if (Waffe < Temp)
																						{
																						Waffe = Temp;
																						}
																					}
																				}
																			//=================================//
																			// verfügbare Eigenheime ermitteln //
																			//=================================//
																			GM_xmlhttpRequest(
																				{
																				method: 'GET',
																				url: Link+'city/home/',
																				onload: function (responseDetails)
																					{
																					var Quelltext = responseDetails.responseText;
																					var Eigenheim = 0;
																					//===============================================//
																					// Prüfen ob überhaupt Eigenheime vorhanden sind //
																					//===============================================//
																					if (Quelltext.search(/<span class="def">/) != -1)
																						{
																						var Dokument = document.createElement('div');
																						Dokument.innerHTML = Quelltext;
																						var Tabellen = Dokument.getElementsByTagName('table');
																						//=============================================//
																						// Schleife zum extrahieren der Eigenheimwerte //
																						//=============================================//
																						for (var i = 0; i < Tabellen.length; i++)
																							{
																							Temp = Number(Quelltext.split('<span class="def">')[i+1].split('</span>')[0].replace(/\s\+/g, ''));
																							//================================//
																							// besten Eigenheimwert speichern //
																							//================================//
																							if (Eigenheim < Temp)
																								{
																								Eigenheim = Temp;
																								}
																							}
																						}
																					//================================//
																					// verfügbare Haustiere ermitteln //
																					//================================//
																					GM_xmlhttpRequest(
																						{
																						method: 'GET',
																						url: Link+'city/pet_store/',
																						onload: function (responseDetails)
																							{
																							var Quelltext = responseDetails.responseText;
																							var Dokument = document.createElement('div');
																							Dokument.innerHTML = Quelltext;
																							var Tabellen = Dokument.getElementsByTagName('table');
																							var Haustier = new Object();
																							Haustier['ATT'] = 0;
																							Haustier['DEF'] = 0;
																							//============================================//
																							// Schleife zum extrahieren der Haustierwerte //
																							//============================================//
																							for (var i = 0; i < Tabellen.length; i++)
																								{
																								Temp_ATT = Number(Quelltext.split('<span class="att">')[i+1].split('</span>')[0].replace(/\s/g, ''));
																								Temp_DEF = Number(Quelltext.split('<span class="def">')[i+1].split('</span>')[0].replace(/\s/g, ''));
																								//=================================================================//
																								// bestes Haustier ermitteln / ATT & DEF Werte des Tiers speichern //
																								//=================================================================//
																								if (Haustier['ATT'] + Haustier['DEF'] < Temp_ATT + Temp_DEF)
																									{
																									Haustier['ATT'] = Temp_ATT;
																									Haustier['DEF'] = Temp_DEF;
																									}
																								}
																							//==============================//
																							// verfügbare Plunder ermitteln //
																							//==============================//
																							GM_xmlhttpRequest(
																								{
																								method: 'GET',
																								url: Link+'stock/plunder/ajax/?c=1',
																								onload: function (responseDetails)
																									{
																									var Quelltext = responseDetails.responseText;
																									var Plunder = new Object();
																									Plunder['ATT_Festwert'] = 0;
																									Plunder['ATT_Prozent'] = 0;
																									Plunder['DEF_Festwert'] = 0;
																									Plunder['DEF_Prozent'] = 0;
																									//=======================================//
																									// Prüfen ob Kampfplunder vorhanden sind //
																									//=======================================//
																									if (Quelltext.search(/<ul class="line">/) != -1)
																										{
																										var Dokument = document.createElement('div');
																										Dokument.innerHTML = Quelltext;
																										var Tabellen = Dokument.getElementsByClassName("line");
																										//===========================================//
																										// Schleife zum extrahieren der Plunderwerte //
																										//===========================================//
																										for (var i = 0; i < Tabellen.length; i++)
																											{
																											String = Quelltext.split('<ul class="line">')[i+1].split('</div>')[0].replace(/\s/g, '');
																											//===============================================//
																											// nachsehen ob der Plunder eine ATT Wirkung hat //
																											//===============================================//
																											if (String.search(/ATT:/) != -1)
																												{
																												ATT_String = String.split('<li>A')[1].split('/li>')[0];
																												//====================================================//
																												// nachsehen ob der Plunder eine ATT Wirkung in % hat //
																												//====================================================//
																												if (ATT_String.search(/\+/) != -1)
																													{
																													Temp_Plunder_ATT_Festwert = Number(ATT_String.split('TT:')[1].split('+')[0]);
																													Temp_Plunder_ATT_Prozent = Number(ATT_String.split('+')[1].split('%')[0]);
																													}
																												//=============================================//
																												// wenn der Plunder keine ATT Wirkung in % hat //
																												//=============================================//
																												else
																													{
																													Temp_Plunder_ATT_Festwert = Number(ATT_String.split('TT:')[1].split('<')[0]);
																													Temp_Plunder_ATT_Prozent = 0;
																													}
																												}
																											//============================================//
																											// Wenn der Plunder gar keine ATT Wirkung hat //
																											//============================================//
																											else
																												{
																												Temp_Plunder_ATT_Festwert = 0;
																												Temp_Plunder_ATT_Prozent = 0;
																												}
																											//===============================================//
																											// nachsehen ob der Plunder eine DEF Wirkung hat //
																											//===============================================//
																											if (String.search(/DEF:/) != -1)
																												{
																												DEF_String = String.split('<li>D')[1].split('/li>')[0];
																												//====================================================//
																												// nachsehen ob der Plunder eine DEF Wirkung in % hat //
																												//====================================================//
																												if (DEF_String.search(/\+/) != -1)
																													{
																													Temp_Plunder_DEF_Festwert = Number(DEF_String.split('EF:')[1].split('+')[0]);
																													Temp_Plunder_DEF_Prozent = Number(DEF_String.split('+')[1].split('%')[0]);
																													}
																												//=============================================//
																												// wenn der Plunder keine DEF Wirkung in % hat //
																												//=============================================//
																												else
																													{
																													Temp_Plunder_DEF_Festwert = Number(DEF_String.split('EF:')[1].split('<')[0]);
																													Temp_Plunder_DEF_Prozent = 0;
																													}
																												}
																											//============================================//
																											// Wenn der Plunder gar keine DEF Wirkung hat //
																											//============================================//
																											else
																												{
																												Temp_Plunder_DEF_Festwert = 0;
																												Temp_Plunder_DEF_Prozent = 0;
																												}
																											//========================================================//
																											// Berechnen des KW's mit den gespeicherten Plunderwerten //
																											//========================================================//
																											var Fight_ATT = Math.floor((ATT_Skill + Waffe + Haustier['ATT'] + Plunder['ATT_Festwert']) * 1.35 * (Plunder['ATT_Prozent'] / 100 + 1));
																											var Fight_DEF = Math.floor((DEF_Skill + Eigenheim + Haustier['DEF'] + Plunder['DEF_Festwert']) * 1.35 * (Plunder['DEF_Prozent'] / 100 + 1));
																											var KW = Math.round((Fight_ATT * 1.1 + Fight_DEF) * 100) / 100;	
																											//=======================================================//
																											// Berechnen des KW's mit den ausgelesenen Plunderwerten //
																											//=======================================================//
																											Temp_Fight_ATT = Math.floor((ATT_Skill + Waffe + Haustier['ATT'] + Temp_Plunder_ATT_Festwert) * 1.35 * (Temp_Plunder_ATT_Prozent / 100 + 1));
																											Temp_Fight_DEF = Math.floor((DEF_Skill + Eigenheim + Haustier['DEF'] + Temp_Plunder_DEF_Festwert) * 1.35 * (Temp_Plunder_DEF_Prozent / 100 + 1));
																											Temp_KW = Math.round((Temp_Fight_ATT * 1.1 + Temp_Fight_DEF) * 100) / 100;
																											//==========================================================//
																											// Vergleichen der KW's & speichern der besten Plunderwerte //
																											//==========================================================//
																											if (KW < Temp_KW)
																												{
																												Plunder['ATT_Festwert'] = Temp_Plunder_ATT_Festwert;
																												Plunder['ATT_Prozent'] = Temp_Plunder_ATT_Prozent;
																												Plunder['DEF_Festwert'] = Temp_Plunder_DEF_Festwert;
																												Plunder['DEF_Prozent'] = Temp_Plunder_DEF_Prozent;
																												}
																											}
																										}
																									//=======================//
																									// Sammelmarken auslesen //
																									//=======================//
																									GM_xmlhttpRequest(
																										{
																										method: 'GET',
																										url: Link+'daily/rewards/',
																										onload: function (responseDetails)
																											{
																											var Quelltext = responseDetails.responseText;
																											var Sammelmarken = Quelltext.split('font-weight:bold">')[1].split('</span>')[0];
																											//========================//
																											// Rueckgabetext erstellen //
																											//========================//
																											var Rueckgabetext = 'Folgende Werte werden durch ein Klick auf OK abgegeben:\n\nStadt: '+Stadt+'\nATT: '+Fight_ATT+'\nDEF: '+Fight_DEF+'\nDEX: '+DEX_Skill+'\nSammelmarken: '+Sammelmarken;
																											//========================================//
																											// Rückmeldung über die abzugebene Sachen //
																											//========================================//
																											if (confirm(Rueckgabetext) == true)
																												{
																												//=================================//
																												// Ermittelte Werte bei DF abgeben //
																												//=================================//
																												var Abgabe = document.createElement("div");
																												var Abgabebereich = document.getElementsByTagName('body')[0];
																												Abgabebereich.appendChild(Abgabe);
																												Abgabe.innerHTML +='<form method="post" action="'+Ziel_URL+'" name="Werte_Post">'
																												+'<input name="seite" value="hauptquartier" type="hidden">'
																												+'<input type="radio" id="input'+Stadtkuerzel+'" name="eintragestadt" value="'+Stadtkuerzel+'" checked >'
																												+'<input name="myatt" size="5" maxlength="5" value="'+Fight_ATT+'" type="text">'
																												+'<input name="mydef" size="5" maxlength="5" value="'+Fight_DEF+'" type="text">'
																												+'<input name="mydex" size="5" maxlength="5" value="'+DEX_Skill+'" type="text">'
																												+'<input name="mymkn" size="5" maxlength="5" value="'+Sammelmarken+'" type="text">'
																												+'<input name="bezeichner" value="Abgeben" type="submit"></form>';
																												document.Werte_Post.style.visibility = 'hidden';
																												document.Werte_Post.submit();
																												document.Werte_Post.remove;
																												}
																											}
																										}
																									);
																									}
																								}
																							);
																							}
																						}
																					);
																					}
																				}
																			);
																			}
																		}
																	);
																	}
																}
															);
															}
														}
													}
												}
											);
											}
										}	
									}
								);
								}
							}
						Login(Index);
						}
					}
				}
			);
			}
		}
	);
	GM_setValue('Letzte_Kontrolle['+Stadt+']', Zeitstempel);
	}

//=======================================================================//
// Beim Logout aus PG den Kontrollzeitstempel für die Stadt zurücksetzen //
//=======================================================================//
if (location.toString().indexOf("pennergame.de/logout/") != -1)
	{
	GM_deleteValue('Letzte_Kontrolle['+Stadt+']');
	}
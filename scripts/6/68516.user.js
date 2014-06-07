// ==UserScript==
// @name           CroqueContrat
// @namespace      test
// @description    Information sur les contrats du syndicat
// @include        http://www.croquemonster.com/contract
// ==/UserScript==

var pagetitle = document.getElementById('agency');
if (!pagetitle) return;
pagetitle = pagetitle.getElementsByTagName('h1');
if (!pagetitle || pagetitle.length < 1) return;
pagetitle = pagetitle[0];
pagetitle.innerHTML += '<span>&nbsp;<input type="button" id="monstroButton" value="Mise a jour Syndicat"/></span>';
	
var monstroButton = document.getElementById('monstroButton');
if (!monstroButton) return;
	//Ajout de l'évènement
	monstroButton.addEventListener('click', traitement, false);

function traitement() 
{
	var xx = 0;
	var y = 0;
	var href,chaine;
	var pos1,pos2,temp,temp2,id, classement_ville, id_ville, nom_ville;
	var page = "";
	var recap = "";
	
	var ville = new Array();
	var classement = new Array();
	
	alert('Debut du traitement');
	
	//Recupération des infos sur les statistiques
	//--------------------------------------------
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.croquemonster.com/syndicate/3179/cities",
		headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Cookie': document.cookie,
			},
		onload: function(responseDetails) 
		{
			temp = responseDetails.responseText;
			//recuperation du nombre de page a traiter en statistique
			pos1 = temp.indexOf('Page 1/',0);
			pos2 = temp.indexOf('</div>',pos1);
			page = temp.substring(pos1 + 4,pos2);
			
			temp2 = page.split('/');
			page = temp2[1];
			//alert("page a traiter : " + page);
			
			//PAGE 1
			GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.croquemonster.com/syndicate/3179/cities?;page=1;sort=pos",
			headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
					'Accept': 'application/atom+xml,application/xml,text/xml',
					'Cookie': document.cookie,
				},
				onload: function(responseDetails) 
				{
					temp = responseDetails.responseText;
					//travail sur la page de stat
					pos1 = 1;
					pos2 = 0;
					
					while (pos1 > 0)
					{
						//classement sur la ville
						pos1 = temp.indexOf("tr class=",pos1);
						pos2 = temp.indexOf("<td>",pos1);
						pos1 = pos2;
						pos2 = temp.indexOf("</td>",pos1);
						classement_ville = temp.substring(pos1 + 4, pos2);
						//alert('classement : ' + classement_ville);
						
						//id de la ville
						pos1 = temp.indexOf("cid=",pos2);
						pos2= temp.indexOf("\">",pos1);
						id_ville = temp.substring(pos1 + 4,pos2);
						//alert('id ville : ' + id_ville);
						
						//nom ville
						pos1 = temp.indexOf("\">",pos2);
						pos2= temp.indexOf("</a></td>",pos1);
						nom_ville = temp.substring(pos1 + 2,pos2);

						pos1 = temp.indexOf("tr class=",pos2);
						
						ville[xx] = nom_ville;
						classement[xx] = classement_ville;
						
						xx += 1;
					}
					
					//PAGE 2
					GM_xmlhttpRequest({
					method: "GET",
					url: "http://www.croquemonster.com/syndicate/3179/cities?;page=2;sort=pos",
					headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
							'Accept': 'application/atom+xml,application/xml,text/xml',
							'Cookie': document.cookie,
						},
						onload: function(responseDetails) 
						{
							temp = responseDetails.responseText;
							//travail sur la page de stat
							pos1 = 1;
							pos2 = 0;
							
							while (pos1 > 0)
							{
								//classement sur la ville
								pos1 = temp.indexOf("tr class=",pos1);
								pos2 = temp.indexOf("<td>",pos1);
								pos1 = pos2;
								pos2 = temp.indexOf("</td>",pos1);
								classement_ville = temp.substring(pos1 + 4, pos2);
								//alert('classement : ' + classement_ville);
								
								//id de la ville
								pos1 = temp.indexOf("cid=",pos2);
								pos2= temp.indexOf("\">",pos1);
								id_ville = temp.substring(pos1 + 4,pos2);
								//alert('id ville : ' + id_ville);
								
								//nom ville
								pos1 = temp.indexOf("\">",pos2);
								pos2= temp.indexOf("</a></td>",pos1);
								nom_ville = temp.substring(pos1 + 2,pos2);

								pos1 = temp.indexOf("tr class=",pos2);
								
								ville[xx] = nom_ville;
								classement[xx] = classement_ville;
								
								xx += 1;
							}
							
							//PAGE 3
							GM_xmlhttpRequest({
							method: "GET",
							url: "http://www.croquemonster.com/syndicate/3179/cities?;page=3;sort=pos",
							headers: {
									'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
									'Accept': 'application/atom+xml,application/xml,text/xml',
									'Cookie': document.cookie,
								},
								onload: function(responseDetails) 
								{
									temp = responseDetails.responseText;
									//travail sur la page de stat
									pos1 = 1;
									pos2 = 0;
									
									while (pos1 > 0)
									{
										//classement sur la ville
										pos1 = temp.indexOf("tr class=",pos1);
										pos2 = temp.indexOf("<td>",pos1);
										pos1 = pos2;
										pos2 = temp.indexOf("</td>",pos1);
										classement_ville = temp.substring(pos1 + 4, pos2);
										//alert('classement : ' + classement_ville);
										
										//id de la ville
										pos1 = temp.indexOf("cid=",pos2);
										pos2= temp.indexOf("\">",pos1);
										id_ville = temp.substring(pos1 + 4,pos2);
										//alert('id ville : ' + id_ville);
										
										//nom ville
										pos1 = temp.indexOf("\">",pos2);
										pos2= temp.indexOf("</a></td>",pos1);
										nom_ville = temp.substring(pos1 + 2,pos2);

										pos1 = temp.indexOf("tr class=",pos2);
										
										ville[xx] = nom_ville;
										classement[xx] = classement_ville;
										
										xx += 1;
									}

									//PAGE 4
									GM_xmlhttpRequest({
									method: "GET",
									url: "http://www.croquemonster.com/syndicate/3179/cities?;page=4;sort=pos",
									headers: {
											'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
											'Accept': 'application/atom+xml,application/xml,text/xml',
											'Cookie': document.cookie,
										},
										onload: function(responseDetails) 
										{
											temp = responseDetails.responseText;
											//travail sur la page de stat
											pos1 = 1;
											pos2 = 0;
											
											while (pos1 > 0)
											{
												//classement sur la ville
												pos1 = temp.indexOf("tr class=",pos1);
												pos2 = temp.indexOf("<td>",pos1);
												pos1 = pos2;
												pos2 = temp.indexOf("</td>",pos1);
												classement_ville = temp.substring(pos1 + 4, pos2);
												//alert('classement : ' + classement_ville);
												
												//id de la ville
												pos1 = temp.indexOf("cid=",pos2);
												pos2= temp.indexOf("\">",pos1);
												id_ville = temp.substring(pos1 + 4,pos2);
												//alert('id ville : ' + id_ville);
												
												//nom ville
												pos1 = temp.indexOf("\">",pos2);
												pos2= temp.indexOf("</a></td>",pos1);
												nom_ville = temp.substring(pos1 + 2,pos2);

												pos1 = temp.indexOf("tr class=",pos2);
												
												ville[xx] = nom_ville;
												classement[xx] = classement_ville;
												
												xx += 1;
											}
											
											//PAGE 5
											GM_xmlhttpRequest({
											method: "GET",
											url: "http://www.croquemonster.com/syndicate/3179/cities?;page=5;sort=pos",
											headers: {
													'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
													'Accept': 'application/atom+xml,application/xml,text/xml',
													'Cookie': document.cookie,
												},
												onload: function(responseDetails) 
												{
													temp = responseDetails.responseText;
													//travail sur la page de stat
													pos1 = 1;
													pos2 = 0;
													
													while (pos1 > 0)
													{
														//classement sur la ville
														pos1 = temp.indexOf("tr class=",pos1);
														pos2 = temp.indexOf("<td>",pos1);
														pos1 = pos2;
														pos2 = temp.indexOf("</td>",pos1);
														classement_ville = temp.substring(pos1 + 4, pos2);
														//alert('classement : ' + classement_ville);
														
														//id de la ville
														pos1 = temp.indexOf("cid=",pos2);
														pos2= temp.indexOf("\">",pos1);
														id_ville = temp.substring(pos1 + 4,pos2);
														//alert('id ville : ' + id_ville);
														
														//nom ville
														pos1 = temp.indexOf("\">",pos2);
														pos2= temp.indexOf("</a></td>",pos1);
														nom_ville = temp.substring(pos1 + 2,pos2);

														pos1 = temp.indexOf("tr class=",pos2);
														
														ville[xx] = nom_ville;
														classement[xx] = classement_ville;
														
														xx += 1;
													}
													
													//PAGE 6
													GM_xmlhttpRequest({
													method: "GET",
													url: "http://www.croquemonster.com/syndicate/3179/cities?;page=6;sort=pos",
													headers: {
															'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
															'Accept': 'application/atom+xml,application/xml,text/xml',
															'Cookie': document.cookie,
														},
														onload: function(responseDetails) 
														{
															temp = responseDetails.responseText;
															//travail sur la page de stat
															pos1 = 1;
															pos2 = 0;
															
															while (pos1 > 0)
															{
																//classement sur la ville
																pos1 = temp.indexOf("tr class=",pos1);
																pos2 = temp.indexOf("<td>",pos1);
																pos1 = pos2;
																pos2 = temp.indexOf("</td>",pos1);
																classement_ville = temp.substring(pos1 + 4, pos2);
																//alert('classement : ' + classement_ville);
																
																//id de la ville
																pos1 = temp.indexOf("cid=",pos2);
																pos2= temp.indexOf("\">",pos1);
																id_ville = temp.substring(pos1 + 4,pos2);
																//alert('id ville : ' + id_ville);
																
																//nom ville
																pos1 = temp.indexOf("\">",pos2);
																pos2= temp.indexOf("</a></td>",pos1);
																nom_ville = temp.substring(pos1 + 2,pos2);

																pos1 = temp.indexOf("tr class=",pos2);
																
																ville[xx] = nom_ville;
																classement[xx] = classement_ville;
																
																xx += 1;
															}
															
															//PAGE 7
															GM_xmlhttpRequest({
															method: "GET",
															url: "http://www.croquemonster.com/syndicate/3179/cities?;page=7;sort=pos",
															headers: {
																	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																	'Accept': 'application/atom+xml,application/xml,text/xml',
																	'Cookie': document.cookie,
																},
																onload: function(responseDetails) 
																{
																	temp = responseDetails.responseText;
																	//travail sur la page de stat
																	pos1 = 1;
																	pos2 = 0;
																	
																	while (pos1 > 0)
																	{
																		//classement sur la ville
																		pos1 = temp.indexOf("tr class=",pos1);
																		pos2 = temp.indexOf("<td>",pos1);
																		pos1 = pos2;
																		pos2 = temp.indexOf("</td>",pos1);
																		classement_ville = temp.substring(pos1 + 4, pos2);
																		//alert('classement : ' + classement_ville);
																		
																		//id de la ville
																		pos1 = temp.indexOf("cid=",pos2);
																		pos2= temp.indexOf("\">",pos1);
																		id_ville = temp.substring(pos1 + 4,pos2);
																		//alert('id ville : ' + id_ville);
																		
																		//nom ville
																		pos1 = temp.indexOf("\">",pos2);
																		pos2= temp.indexOf("</a></td>",pos1);
																		nom_ville = temp.substring(pos1 + 2,pos2);

																		pos1 = temp.indexOf("tr class=",pos2);
																		
																		ville[xx] = nom_ville;
																		classement[xx] = classement_ville;
																		
																		xx += 1;
																	}
																	
																	//PAGE 8
																	GM_xmlhttpRequest({
																	method: "GET",
																	url: "http://www.croquemonster.com/syndicate/3179/cities?;page=8;sort=pos",
																	headers: {
																			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																			'Accept': 'application/atom+xml,application/xml,text/xml',
																			'Cookie': document.cookie,
																		},
																		onload: function(responseDetails) 
																		{
																			temp = responseDetails.responseText;
																			//travail sur la page de stat
																			pos1 = 1;
																			pos2 = 0;
																			
																			while (pos1 > 0)
																			{
																				//classement sur la ville
																				pos1 = temp.indexOf("tr class=",pos1);
																				pos2 = temp.indexOf("<td>",pos1);
																				pos1 = pos2;
																				pos2 = temp.indexOf("</td>",pos1);
																				classement_ville = temp.substring(pos1 + 4, pos2);
																				//alert('classement : ' + classement_ville);
																				
																				//id de la ville
																				pos1 = temp.indexOf("cid=",pos2);
																				pos2= temp.indexOf("\">",pos1);
																				id_ville = temp.substring(pos1 + 4,pos2);
																				//alert('id ville : ' + id_ville);
																				
																				//nom ville
																				pos1 = temp.indexOf("\">",pos2);
																				pos2= temp.indexOf("</a></td>",pos1);
																				nom_ville = temp.substring(pos1 + 2,pos2);

																				pos1 = temp.indexOf("tr class=",pos2);
																				
																				ville[xx] = nom_ville;
																				classement[xx] = classement_ville;
																				
																				xx += 1;
																			}
																			
																			//PAGE 9
																			GM_xmlhttpRequest({
																			method: "GET",
																			url: "http://www.croquemonster.com/syndicate/3179/cities?;page=9;sort=pos",
																			headers: {
																					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																					'Accept': 'application/atom+xml,application/xml,text/xml',
																					'Cookie': document.cookie,
																				},
																				onload: function(responseDetails) 
																				{
																					temp = responseDetails.responseText;
																					//travail sur la page de stat
																					pos1 = 1;
																					pos2 = 0;
																					
																					while (pos1 > 0)
																					{
																						//classement sur la ville
																						pos1 = temp.indexOf("tr class=",pos1);
																						pos2 = temp.indexOf("<td>",pos1);
																						pos1 = pos2;
																						pos2 = temp.indexOf("</td>",pos1);
																						classement_ville = temp.substring(pos1 + 4, pos2);
																						//alert('classement : ' + classement_ville);
																						
																						//id de la ville
																						pos1 = temp.indexOf("cid=",pos2);
																						pos2= temp.indexOf("\">",pos1);
																						id_ville = temp.substring(pos1 + 4,pos2);
																						//alert('id ville : ' + id_ville);
																						
																						//nom ville
																						pos1 = temp.indexOf("\">",pos2);
																						pos2= temp.indexOf("</a></td>",pos1);
																						nom_ville = temp.substring(pos1 + 2,pos2);

																						pos1 = temp.indexOf("tr class=",pos2);
																						
																						ville[xx] = nom_ville;
																						classement[xx] = classement_ville;
																						
																						xx += 1;
																					}

																					//PAGE 10
																					GM_xmlhttpRequest({
																					method: "GET",
																					url: "http://www.croquemonster.com/syndicate/3179/cities?;page=10;sort=pos",
																					headers: {
																							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																							'Accept': 'application/atom+xml,application/xml,text/xml',
																							'Cookie': document.cookie,
																						},
																						onload: function(responseDetails) 
																						{
																							temp = responseDetails.responseText;
																							//travail sur la page de stat
																							pos1 = 1;
																							pos2 = 0;
																							
																							while (pos1 > 0)
																							{
																								//classement sur la ville
																								pos1 = temp.indexOf("tr class=",pos1);
																								pos2 = temp.indexOf("<td>",pos1);
																								pos1 = pos2;
																								pos2 = temp.indexOf("</td>",pos1);
																								classement_ville = temp.substring(pos1 + 4, pos2);
																								//alert('classement : ' + classement_ville);
																								
																								//id de la ville
																								pos1 = temp.indexOf("cid=",pos2);
																								pos2= temp.indexOf("\">",pos1);
																								id_ville = temp.substring(pos1 + 4,pos2);
																								//alert('id ville : ' + id_ville);
																								
																								//nom ville
																								pos1 = temp.indexOf("\">",pos2);
																								pos2= temp.indexOf("</a></td>",pos1);
																								nom_ville = temp.substring(pos1 + 2,pos2);

																								pos1 = temp.indexOf("tr class=",pos2);
																								
																								ville[xx] = nom_ville;
																								classement[xx] = classement_ville;
																								
																								xx += 1;
																							}
																							
																							//PAGE 11
																							GM_xmlhttpRequest({
																							method: "GET",
																							url: "http://www.croquemonster.com/syndicate/3179/cities?;page=11;sort=pos",
																							headers: {
																									'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																									'Accept': 'application/atom+xml,application/xml,text/xml',
																									'Cookie': document.cookie,
																								},
																								onload: function(responseDetails) 
																								{
																									temp = responseDetails.responseText;
																									//travail sur la page de stat
																									pos1 = 1;
																									pos2 = 0;
																									
																									while (pos1 > 0)
																									{
																										//classement sur la ville
																										pos1 = temp.indexOf("tr class=",pos1);
																										pos2 = temp.indexOf("<td>",pos1);
																										pos1 = pos2;
																										pos2 = temp.indexOf("</td>",pos1);
																										classement_ville = temp.substring(pos1 + 4, pos2);
																										//alert('classement : ' + classement_ville);
																										
																										//id de la ville
																										pos1 = temp.indexOf("cid=",pos2);
																										pos2= temp.indexOf("\">",pos1);
																										id_ville = temp.substring(pos1 + 4,pos2);
																										//alert('id ville : ' + id_ville);
																										
																										//nom ville
																										pos1 = temp.indexOf("\">",pos2);
																										pos2= temp.indexOf("</a></td>",pos1);
																										nom_ville = temp.substring(pos1 + 2,pos2);

																										pos1 = temp.indexOf("tr class=",pos2);
																										
																										ville[xx] = nom_ville;
																										classement[xx] = classement_ville;
																										
																										xx += 1;
																									}
																									
																									//PAGE 12
																									GM_xmlhttpRequest({
																									method: "GET",
																									url: "http://www.croquemonster.com/syndicate/3179/cities?;page=12;sort=pos",
																									headers: {
																											'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																											'Accept': 'application/atom+xml,application/xml,text/xml',
																											'Cookie': document.cookie,
																										},
																										onload: function(responseDetails) 
																										{
																											temp = responseDetails.responseText;
																											//travail sur la page de stat
																											pos1 = 1;
																											pos2 = 0;
																											
																											while (pos1 > 0)
																											{
																												//classement sur la ville
																												pos1 = temp.indexOf("tr class=",pos1);
																												pos2 = temp.indexOf("<td>",pos1);
																												pos1 = pos2;
																												pos2 = temp.indexOf("</td>",pos1);
																												classement_ville = temp.substring(pos1 + 4, pos2);
																												//alert('classement : ' + classement_ville);
																												
																												//id de la ville
																												pos1 = temp.indexOf("cid=",pos2);
																												pos2= temp.indexOf("\">",pos1);
																												id_ville = temp.substring(pos1 + 4,pos2);
																												//alert('id ville : ' + id_ville);
																												
																												//nom ville
																												pos1 = temp.indexOf("\">",pos2);
																												pos2= temp.indexOf("</a></td>",pos1);
																												nom_ville = temp.substring(pos1 + 2,pos2);

																												pos1 = temp.indexOf("tr class=",pos2);
																												
																												ville[xx] = nom_ville;
																												classement[xx] = classement_ville;
																												
																												xx += 1;
																											}
																											
																											//PAGE 12
																											GM_xmlhttpRequest({
																											method: "GET",
																											url: "http://www.croquemonster.com/syndicate/3179/cities?;page=12;sort=pos",
																											headers: {
																													'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																													'Accept': 'application/atom+xml,application/xml,text/xml',
																													'Cookie': document.cookie,
																												},
																												onload: function(responseDetails) 
																												{
																													temp = responseDetails.responseText;
																													//travail sur la page de stat
																													pos1 = 1;
																													pos2 = 0;
																													
																													while (pos1 > 0)
																													{
																														//classement sur la ville
																														pos1 = temp.indexOf("tr class=",pos1);
																														pos2 = temp.indexOf("<td>",pos1);
																														pos1 = pos2;
																														pos2 = temp.indexOf("</td>",pos1);
																														classement_ville = temp.substring(pos1 + 4, pos2);
																														//alert('classement : ' + classement_ville);
																														
																														//id de la ville
																														pos1 = temp.indexOf("cid=",pos2);
																														pos2= temp.indexOf("\">",pos1);
																														id_ville = temp.substring(pos1 + 4,pos2);
																														//alert('id ville : ' + id_ville);
																														
																														//nom ville
																														pos1 = temp.indexOf("\">",pos2);
																														pos2= temp.indexOf("</a></td>",pos1);
																														nom_ville = temp.substring(pos1 + 2,pos2);

																														pos1 = temp.indexOf("tr class=",pos2);
																														
																														ville[xx] = nom_ville;
																														classement[xx] = classement_ville;
																														
																														xx += 1;
																													}
																													//PAGE 13
																													GM_xmlhttpRequest({
																													method: "GET",
																													url: "http://www.croquemonster.com/syndicate/3179/cities?;page=13;sort=pos",
																													headers: {
																															'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																															'Accept': 'application/atom+xml,application/xml,text/xml',
																															'Cookie': document.cookie,
																														},
																														onload: function(responseDetails) 
																														{
																															temp = responseDetails.responseText;
																															//travail sur la page de stat
																															pos1 = 1;
																															pos2 = 0;
																															
																															while (pos1 > 0)
																															{
																																//classement sur la ville
																																pos1 = temp.indexOf("tr class=",pos1);
																																pos2 = temp.indexOf("<td>",pos1);
																																pos1 = pos2;
																																pos2 = temp.indexOf("</td>",pos1);
																																classement_ville = temp.substring(pos1 + 4, pos2);
																																//alert('classement : ' + classement_ville);
																																
																																//id de la ville
																																pos1 = temp.indexOf("cid=",pos2);
																																pos2= temp.indexOf("\">",pos1);
																																id_ville = temp.substring(pos1 + 4,pos2);
																																//alert('id ville : ' + id_ville);
																																
																																//nom ville
																																pos1 = temp.indexOf("\">",pos2);
																																pos2= temp.indexOf("</a></td>",pos1);
																																nom_ville = temp.substring(pos1 + 2,pos2);

																																pos1 = temp.indexOf("tr class=",pos2);
																																
																																ville[xx] = nom_ville;
																																classement[xx] = classement_ville;
																																
																																xx += 1;
																															}
																															//PAGE 14
																															GM_xmlhttpRequest({
																															method: "GET",
																															url: "http://www.croquemonster.com/syndicate/3179/cities?;page=14;sort=pos",
																															headers: {
																																	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																																	'Accept': 'application/atom+xml,application/xml,text/xml',
																																	'Cookie': document.cookie,
																																},
																																onload: function(responseDetails) 
																																{
																																	temp = responseDetails.responseText;
																																	//travail sur la page de stat
																																	pos1 = 1;
																																	pos2 = 0;
																																	
																																	while (pos1 > 0)
																																	{
																																		//classement sur la ville
																																		pos1 = temp.indexOf("tr class=",pos1);
																																		pos2 = temp.indexOf("<td>",pos1);
																																		pos1 = pos2;
																																		pos2 = temp.indexOf("</td>",pos1);
																																		classement_ville = temp.substring(pos1 + 4, pos2);
																																		//alert('classement : ' + classement_ville);
																																		
																																		//id de la ville
																																		pos1 = temp.indexOf("cid=",pos2);
																																		pos2= temp.indexOf("\">",pos1);
																																		id_ville = temp.substring(pos1 + 4,pos2);
																																		//alert('id ville : ' + id_ville);
																																		
																																		//nom ville
																																		pos1 = temp.indexOf("\">",pos2);
																																		pos2= temp.indexOf("</a></td>",pos1);
																																		nom_ville = temp.substring(pos1 + 2,pos2);

																																		pos1 = temp.indexOf("tr class=",pos2);
																																		
																																		ville[xx] = nom_ville;
																																		classement[xx] = classement_ville;
																																		
																																		xx += 1;
																																	}
																																	//PAGE 15
																																	GM_xmlhttpRequest({
																																	method: "GET",
																																	url: "http://www.croquemonster.com/syndicate/3179/cities?;page=15;sort=pos",
																																	headers: {
																																			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																																			'Accept': 'application/atom+xml,application/xml,text/xml',
																																			'Cookie': document.cookie,
																																		},
																																		onload: function(responseDetails) 
																																		{
																																			temp = responseDetails.responseText;
																																			//travail sur la page de stat
																																			pos1 = 1;
																																			pos2 = 0;
																																			
																																			while (pos1 > 0)
																																			{
																																				//classement sur la ville
																																				pos1 = temp.indexOf("tr class=",pos1);
																																				pos2 = temp.indexOf("<td>",pos1);
																																				pos1 = pos2;
																																				pos2 = temp.indexOf("</td>",pos1);
																																				classement_ville = temp.substring(pos1 + 4, pos2);
																																				//alert('classement : ' + classement_ville);
																																				
																																				//id de la ville
																																				pos1 = temp.indexOf("cid=",pos2);
																																				pos2= temp.indexOf("\">",pos1);
																																				id_ville = temp.substring(pos1 + 4,pos2);
																																				//alert('id ville : ' + id_ville);
																																				
																																				//nom ville
																																				pos1 = temp.indexOf("\">",pos2);
																																				pos2= temp.indexOf("</a></td>",pos1);
																																				nom_ville = temp.substring(pos1 + 2,pos2);

																																				pos1 = temp.indexOf("tr class=",pos2);
																																				
																																				ville[xx] = nom_ville;
																																				classement[xx] = classement_ville;
																																				
																																				xx += 1;
																																			}
																																			//PAGE 16
																																			GM_xmlhttpRequest({
																																			method: "GET",
																																			url: "http://www.croquemonster.com/syndicate/3179/cities?;page=16;sort=pos",
																																			headers: {
																																					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																																					'Accept': 'application/atom+xml,application/xml,text/xml',
																																					'Cookie': document.cookie,
																																				},
																																				onload: function(responseDetails) 
																																				{
																																					temp = responseDetails.responseText;
																																					//travail sur la page de stat
																																					pos1 = 1;
																																					pos2 = 0;
																																					
																																					while (pos1 > 0)
																																					{
																																						//classement sur la ville
																																						pos1 = temp.indexOf("tr class=",pos1);
																																						pos2 = temp.indexOf("<td>",pos1);
																																						pos1 = pos2;
																																						pos2 = temp.indexOf("</td>",pos1);
																																						classement_ville = temp.substring(pos1 + 4, pos2);
																																						//alert('classement : ' + classement_ville);
																																						
																																						//id de la ville
																																						pos1 = temp.indexOf("cid=",pos2);
																																						pos2= temp.indexOf("\">",pos1);
																																						id_ville = temp.substring(pos1 + 4,pos2);
																																						//alert('id ville : ' + id_ville);
																																						
																																						//nom ville
																																						pos1 = temp.indexOf("\">",pos2);
																																						pos2= temp.indexOf("</a></td>",pos1);
																																						nom_ville = temp.substring(pos1 + 2,pos2);
																																						
																																						pos1 = temp.indexOf("tr class=",pos2);
																																						
																																						ville[xx] = nom_ville;
																																						classement[xx] = classement_ville;
																																						
																																						xx += 1;
																																					}
																																					//PAGE 17
																																					GM_xmlhttpRequest({
																																					method: "GET",
																																					url: "http://www.croquemonster.com/syndicate/3179/cities?;page=17;sort=pos",
																																					headers: {
																																							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																																							'Accept': 'application/atom+xml,application/xml,text/xml',
																																							'Cookie': document.cookie,
																																						},
																																						onload: function(responseDetails) 
																																						{
																																							temp = responseDetails.responseText;
																																							//travail sur la page de stat
																																							pos1 = 1;
																																							pos2 = 0;
																																							
																																							while (pos1 > 0)
																																							{
																																								//classement sur la ville
																																								pos1 = temp.indexOf("tr class=",pos1);
																																								pos2 = temp.indexOf("<td>",pos1);
																																								pos1 = pos2;
																																								pos2 = temp.indexOf("</td>",pos1);
																																								classement_ville = temp.substring(pos1 + 4, pos2);
																																								//alert('classement : ' + classement_ville);
																																								
																																								//id de la ville
																																								pos1 = temp.indexOf("cid=",pos2);
																																								pos2= temp.indexOf("\">",pos1);
																																								id_ville = temp.substring(pos1 + 4,pos2);
																																								//alert('id ville : ' + id_ville);
																																								
																																								//nom ville
																																								pos1 = temp.indexOf("\">",pos2);
																																								pos2= temp.indexOf("</a></td>",pos1);
																																								nom_ville = temp.substring(pos1 + 2,pos2);
																																								
																																								pos1 = temp.indexOf("tr class=",pos2);
																																								
																																								ville[xx] = nom_ville;
																																								classement[xx] = classement_ville;
																																								
																																								xx += 1;
																																							}
																																							//PAGE 18
																																							GM_xmlhttpRequest({
																																							method: "GET",
																																							url: "http://www.croquemonster.com/syndicate/3179/cities?;page=18;sort=pos",
																																							headers: {
																																									'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																																									'Accept': 'application/atom+xml,application/xml,text/xml',
																																									'Cookie': document.cookie,
																																								},
																																								onload: function(responseDetails) 
																																								{
																																									temp = responseDetails.responseText;
																																									//travail sur la page de stat
																																									pos1 = 1;
																																									pos2 = 0;
																																									
																																									while (pos1 > 0)
																																									{
																																										//classement sur la ville
																																										pos1 = temp.indexOf("tr class=",pos1);
																																										pos2 = temp.indexOf("<td>",pos1);
																																										pos1 = pos2;
																																										pos2 = temp.indexOf("</td>",pos1);
																																										classement_ville = temp.substring(pos1 + 4, pos2);
																																										//alert('classement : ' + classement_ville);
																																										
																																										//id de la ville
																																										pos1 = temp.indexOf("cid=",pos2);
																																										pos2= temp.indexOf("\">",pos1);
																																										id_ville = temp.substring(pos1 + 4,pos2);
																																										//alert('id ville : ' + id_ville);
																																										
																																										//nom ville
																																										pos1 = temp.indexOf("\">",pos2);
																																										pos2= temp.indexOf("</a></td>",pos1);
																																										nom_ville = temp.substring(pos1 + 2,pos2);
																																										
																																										pos1 = temp.indexOf("tr class=",pos2);
																																										
																																										ville[xx] = nom_ville;
																																										classement[xx] = classement_ville;
																																										
																																										xx += 1;
																																									}
																																									//PAGE 19
																																									GM_xmlhttpRequest({
																																									method: "GET",
																																									url: "http://www.croquemonster.com/syndicate/3179/cities?;page=19;sort=pos",
																																									headers: {
																																											'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																																											'Accept': 'application/atom+xml,application/xml,text/xml',
																																											'Cookie': document.cookie,
																																										},
																																										onload: function(responseDetails) 
																																										{
																																											temp = responseDetails.responseText;
																																											//travail sur la page de stat
																																											pos1 = 1;
																																											pos2 = 0;
																																											
																																											while (pos1 > 0)
																																											{
																																												//classement sur la ville
																																												pos1 = temp.indexOf("tr class=",pos1);
																																												pos2 = temp.indexOf("<td>",pos1);
																																												pos1 = pos2;
																																												pos2 = temp.indexOf("</td>",pos1);
																																												classement_ville = temp.substring(pos1 + 4, pos2);
																																												//alert('classement : ' + classement_ville);
																																												
																																												//id de la ville
																																												pos1 = temp.indexOf("cid=",pos2);
																																												pos2= temp.indexOf("\">",pos1);
																																												id_ville = temp.substring(pos1 + 4,pos2);
																																												//alert('id ville : ' + id_ville);
																																												
																																												//nom ville
																																												pos1 = temp.indexOf("\">",pos2);
																																												pos2= temp.indexOf("</a></td>",pos1);
																																												nom_ville = temp.substring(pos1 + 2,pos2);
																																												
																																												pos1 = temp.indexOf("tr class=",pos2);
																																												
																																												ville[xx] = nom_ville;
																																												classement[xx] = classement_ville;
																																												
																																												xx += 1;
																																											}
																																											//PAGE 20
																																											GM_xmlhttpRequest({
																																											method: "GET",
																																											url: "http://www.croquemonster.com/syndicate/3179/cities?;page=20;sort=pos",
																																											headers: {
																																													'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																																													'Accept': 'application/atom+xml,application/xml,text/xml',
																																													'Cookie': document.cookie,
																																												},
																																												onload: function(responseDetails) 
																																												{
																																													temp = responseDetails.responseText;
																																													//travail sur la page de stat
																																													pos1 = 1;
																																													pos2 = 0;
																																													
																																													while (pos1 > 0)
																																													{
																																														//classement sur la ville
																																														pos1 = temp.indexOf("tr class=",pos1);
																																														pos2 = temp.indexOf("<td>",pos1);
																																														pos1 = pos2;
																																														pos2 = temp.indexOf("</td>",pos1);
																																														classement_ville = temp.substring(pos1 + 4, pos2);
																																														//alert('classement : ' + classement_ville);
																																														
																																														//id de la ville
																																														pos1 = temp.indexOf("cid=",pos2);
																																														pos2= temp.indexOf("\">",pos1);
																																														id_ville = temp.substring(pos1 + 4,pos2);
																																														//alert('id ville : ' + id_ville);
																																														
																																														//nom ville
																																														pos1 = temp.indexOf("\">",pos2);
																																														pos2= temp.indexOf("</a></td>",pos1);
																																														nom_ville = temp.substring(pos1 + 2,pos2);
																																														
																																														pos1 = temp.indexOf("tr class=",pos2);
																																														
																																														ville[xx] = nom_ville;
																																														classement[xx] = classement_ville;
																																														
																																														xx += 1;
																																													}
																																													//PAGE 21
																																													GM_xmlhttpRequest({
																																													method: "GET",
																																													url: "http://www.croquemonster.com/syndicate/3179/cities?;page=21;sort=pos",
																																													headers: {
																																															'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																																															'Accept': 'application/atom+xml,application/xml,text/xml',
																																															'Cookie': document.cookie,
																																														},
																																														onload: function(responseDetails) 
																																														{
																																															temp = responseDetails.responseText;
																																															//travail sur la page de stat
																																															pos1 = 1;
																																															pos2 = 0;
																																															
																																															while (pos1 > 0)
																																															{
																																																//classement sur la ville
																																																pos1 = temp.indexOf("tr class=",pos1);
																																																pos2 = temp.indexOf("<td>",pos1);
																																																pos1 = pos2;
																																																pos2 = temp.indexOf("</td>",pos1);
																																																classement_ville = temp.substring(pos1 + 4, pos2);
																																																//alert('classement : ' + classement_ville);
																																																
																																																//id de la ville
																																																pos1 = temp.indexOf("cid=",pos2);
																																																pos2= temp.indexOf("\">",pos1);
																																																id_ville = temp.substring(pos1 + 4,pos2);
																																																//alert('id ville : ' + id_ville);
																																																
																																																//nom ville
																																																pos1 = temp.indexOf("\">",pos2);
																																																pos2= temp.indexOf("</a></td>",pos1);
																																																nom_ville = temp.substring(pos1 + 2,pos2);
																																																
																																																pos1 = temp.indexOf("tr class=",pos2);
																																																
																																																ville[xx] = nom_ville;
																																																classement[xx] = classement_ville;
																																																
																																																xx += 1;
																																															}
																																															//PAGE 22
																																															GM_xmlhttpRequest({
																																															method: "GET",
																																															url: "http://www.croquemonster.com/syndicate/3179/cities?;page=22;sort=pos",
																																															headers: {
																																																	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
																																																	'Accept': 'application/atom+xml,application/xml,text/xml',
																																																	'Cookie': document.cookie,
																																																},
																																																onload: function(responseDetails) 
																																																{
																																																	temp = responseDetails.responseText;
																																																	//travail sur la page de stat
																																																	pos1 = 1;
																																																	pos2 = 0;
																																																	
																																																	while (pos1 > 0)
																																																	{
																																																		//classement sur la ville
																																																		pos1 = temp.indexOf("tr class=",pos1);
																																																		pos2 = temp.indexOf("<td>",pos1);
																																																		pos1 = pos2;
																																																		pos2 = temp.indexOf("</td>",pos1);
																																																		classement_ville = temp.substring(pos1 + 4, pos2);
																																																		//alert('classement : ' + classement_ville);
																																																		
																																																		//id de la ville
																																																		pos1 = temp.indexOf("cid=",pos2);
																																																		pos2= temp.indexOf("\">",pos1);
																																																		id_ville = temp.substring(pos1 + 4,pos2);
																																																		//alert('id ville : ' + id_ville);
																																																		
																																																		//nom ville
																																																		pos1 = temp.indexOf("\">",pos2);
																																																		pos2= temp.indexOf("</a></td>",pos1);
																																																		nom_ville = temp.substring(pos1 + 2,pos2);
																																																		
																																																		pos1 = temp.indexOf("tr class=",pos2);
																																																		
																																																		ville[xx] = nom_ville;
																																																		classement[xx] = classement_ville;
																																																		
																																																		xx += 1;
																																																	}
																																																	
																																																	alert("Mise a jour des contrat");
																																																	
																																																	//Mise a jour des contrats 
																																																	//------------------------
																																																	//parcours des div des contrats
																																																	var e = document.getElementsByTagName('div');
																																																	for(var i=0;i<e.length;i++)
																																																	{
																																																		//alert(e[i].className);
																																																		if (e[i].className == "extendContract")
																																																		{
																																								
																																																			for (var jj = 0; jj <= xx; jj++)
																																																			{
																																																				temp = e[i].innerHTML;
																																																				pos1 = temp.indexOf(ville[jj],0);																																																				
																																																				if (pos1 > 0)
																																																				{																																																					
																																																					var text_id_contrat = e[i].getAttribute("id");
																																																					var id_contrat = text_id_contrat.substr(5, text_id_contrat.length - 5);
																																																					//alert('c' + id_contrat);
																																																					var valu = 'c' + id_contrat;
																																																					var contratdiv = document.getElementById(valu);
																																																					//alert(contratdiv.innerHTML);
																																																					var ee = contratdiv.getElementsByTagName('div');
																																																					
																																																					for(var k=0;k<=ee.length;k++)
																																																					{
																																																						if (ee[k].className == "contractMonster")
																																																						{
																																																							//alert(classement[jj]);
																																																							var niveau = classement[jj];
																																																							ee[k].innerHTML = "Classement : " + niveau;
																																																							break;
																																																						}
																																																					}
									
																																																				}
																																																			}																																																			
																																																		}
																																																	}																																																																																																	
																																																	
																																																	alert("Fin de la mise a jour");
																																																}
																																															});
																																														}
																																													});
																																												}
																																											});
																																										}
																																									});
																																								}
																																							});
																																						}
																																					});

																																				}
																																			});
																																		}
																																	});
																																}
																															});
																														}
																													});
																												}
																											});
																										}
																									});																									
																								}
																							});
																						}
																					});
																				}
																			});
																		}
																	});
																}
															});			
														}
													});			
												}
											});			
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
}

function contrat_xml(id)
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.croquemonster.com/contract/xml.xml?cid=" + id,
		headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Cookie': document.cookie,
			},
		onload: function(responseDetails) {
        alert('Request for Atom feed returned ' + responseDetails.status +
              ' ' + responseDetails.statusText + '\n\n' +
              'Feed data:\n' + responseDetails.responseText);
    }
});
}

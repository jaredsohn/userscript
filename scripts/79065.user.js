// ==UserScript==
// @name           CroqueContrat7
// @namespace      test7
// @description    Information sur les contrats du syndicat
// @include        http://www.croquemonster.com/contract
// ==/UserScript==

var temp_total = [];
var temp_tenebrae = [];
var tenebrae = [];
var cpt = 0;
var cpt2 = 0;
var classement = new Array();
var villeid = new Array();
var ville = new Array();
var point_bob = new Array();
var point_tene = new Array();
var page = 0;
var xx = 0;
var dif;
var pagetitle = document.getElementById('agency');
if (!pagetitle) return;
pagetitle = pagetitle.getElementsByTagName('h1');
if (!pagetitle || pagetitle.length < 1) return;
pagetitle = pagetitle[0];
// pagetitle.innerHTML += '<span>&nbsp;<input type="button" class="okButton" id="monstroButton" value="Mise Ãƒ  jour Syndicat"/></span>';
pagetitle.innerHTML += '<a type="button" class="okButton" id="monstroButton">Contrat V7</a>';
	
var monstroButton = document.getElementById('monstroButton');
if (!monstroButton) return;
	//Ajout de l'ÃƒÂ©vÃƒÂ¨nement
	monstroButton.addEventListener('click', traitement, false);

function traitement() 
{
	var y = 0;
	var href,chaine;
	var pos1,pos2,temp,temp2,id, classement_ville, id_ville, nom_ville;
	var recap = "";
	
	alert('Debut du traitement');
	
	//RecupÃƒÂ©ration des infos sur les statistiques
	//--------------------------------------------
	
	GM_xmlhttpRequest(
	{
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
			console.log("page a traiter : " + page);
			
			for (var i=1;i<=page;i++)
			{
				traitement_page(i);
			}
		}
	});
}
			
function traitement_page(num)
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: "http://www.croquemonster.com/syndicate/3179/cities?;page="+num+";sort=pos",
		headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Cookie': document.cookie,
			},
		onload: function(responseDetails) 
		{
			temp_total[num] = responseDetails.responseText;
			console.log("http://www.croquemonster.com/syndicate/3179/cities?;page="+num+";sort=pos");
			cpt=cpt + 1;
			test_fin();
		}
	});
}			

function test_fin()
{
	var temp2;
	var y = 0;
	var href,chaine;
	var pos1,pos2,tab, classement_ville, id_ville, nom_ville, point_ville;
	var pos5,pos4;
	var recap = "";

	if (cpt == page)
	{
		console.log("PARSING DE L'ENSEMBLE DES VILLES");
		
		for (var i=1;i<=page;i++)
		{
			tab = temp_total[i];
			
			//console.log("TAB : " + tab);
			console.log("Traitement page " + i);
			
			if (tab != null) 
			{
				pos1 = 1;
				pos2 = 0;
				
				while (pos1 > 0)
				{
					//classement sur la ville
					pos1 = tab.indexOf("tr class=",pos1);
					pos2 = tab.indexOf("<td>",pos1);
					pos1 = pos2;
					pos2 = tab.indexOf("</td>",pos1);
					classement_ville = tab.substring(pos1 + 4, pos2);
					
					
					//id de la ville
					pos1 = tab.indexOf("cid=",pos2);
					pos2= tab.indexOf("\">",pos1);
					id_ville = tab.substring(pos1 + 4,pos2);

					//nom ville
					pos1 = tab.indexOf("\">",pos2);
					pos2= tab.indexOf("</a></td>",pos1);
					nom_ville = tab.substring(pos1 + 2,pos2);
					
					//point sur la ville
					pos1 = tab.indexOf("\">",pos2);
					pos2 = tab.indexOf("pts",pos1);
					point_ville = tab.substring(pos1 + 2,pos2);
					
					pos1 = tab.indexOf("tr class=",pos2);
					
					console.log('ville : ' + nom_ville + ' classement : ' + classement_ville + ' point : ' + point_ville);
					
					villeid[xx] = id_ville;
					ville[xx] = nom_ville;
					classement[xx] = classement_ville;
					point_bob[xx] = point_ville;
					
					xx += 1;
				}
			}
			else
			{
				console.log("KO");
			}
		}

		//integration();
		
		
		for (var i=1;i<=villeid.length;i++)
		{
			recherche_tene(villeid[i]);
		}
		
	}
}

function recherche_tene(num)
{
	var temp2;
	var pos4,pos5;
	var pos6,pos7;
	
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: "http://www.croquemonster.com/syndicate/3179/cityRanking?cid=" + num,
		headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Cookie': document.cookie,
			},
			onload: function(responseDetails) 
			{
				console.log("http://www.croquemonster.com/syndicate/3179/cityRanking?cid=" + num);
				temp2 = responseDetails.responseText;
				
				if (temp2!= null)
				{
					pos4 = temp2.lastIndexOf("Tenebrae");
					if (pos4>0)
					{
						pos6 = temp2.indexOf("\">",pos4);
						pos7 = temp2.indexOf("pts",pos6);
					
						pos5 = temp2.lastIndexOf("</td>",pos4);
						pos4 = temp2.lastIndexOf("<td>",pos5);
						
						if (pos4>0)
						{
							tenebrae[num] = temp2.substring(pos4+4,pos5);
						}
						else
						{
							tenebrae[num] = '?' ;
						}
					
						point_tene[num] = temp2.substring(pos6 + 2,pos7);
						console.log('point tene : ' + point_tene[num]);
					}
					else
					{
						tenebrae[num] = '?' ;
					}
				}
				
				cpt2 = cpt2 + 1;
				test_fin_2();
			}
	});
}


function test_fin_2()
{
	var temp2;
	var pos4,pos5;
	
	if (cpt2 == villeid.length)
	{
		integration();
	}
}


function integration()
{
	try {
		var mydata = "";
		var temp;
		var pos1;
		
		console.log("INTEGRATION A LA PAGE");
			
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
								var niveau = classement[jj];
								var d=new Date();
								mydata = mydata + villeid[jj] + ";" + ville[jj] + ";" + niveau + ";" + point_bob[jj]+ ";" + tenebrae[villeid[jj]] + ";" + point_tene[villeid[jj]] + ";" + d + "\n";

								dif = point_bob[jj]-point_tene[villeid[jj]];
								
								ee[k].setAttribute('onMouseOver',"javascript:Tip.show(null,'Point bob : "+point_bob[jj]+"  Point tene : "+ point_tene[villeid[jj]] + " diff : " + dif +"' ,null,event);");
								
								
								/*switch(dif)
								{
									case (dif >= 50): 					ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<FONT COLOR='#00ff00'><b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]] + "</FONT>";
																		break;
									case ((dif < 50) && (dif >= 20)):	ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<FONT COLOR='#0000ff'><b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]] + "</FONT>";
																		break;
									case ((dif < 20) && (dif >= -20)):	ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<FONT COLOR='#ffff00'><b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]] + "</FONT>";
																		break;
									case ((dif < -20) && (dif >= -50)):	ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<FONT COLOR='#ff9000'><b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]] + "</FONT>";
																		break;
									case (dif < -50):					ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<FONT COLOR='#ff0000'><b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]] + "</FONT>";
																		break;
									default:							ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<b>erreur</b>" + dif;
																		break; 
								}*/

								if (dif >= 20)
								{
									ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<FONT COLOR='#00ff00'><b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]] + "</FONT>";
								}
								else
								{
									if ((dif < 20) && (dif >= 0))
									{
										ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<FONT COLOR='#0000ff'><b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]] + "</FONT>";
									}
									else
									{
										if ((dif < 0) && (dif >= -20))
										{
											ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<FONT COLOR='#ffde23'><b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]] + "</FONT>";
										}
										else
										{
											if ((dif < -20) && (dif >= -50))
											{
												ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<FONT COLOR='#ff9000'><b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]] + "</FONT>";
											}
											else
											{
												ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<FONT COLOR='#ff0000'><b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]] + "</FONT>";
											}
										}
									}
								}
								
								break;
							}
						}
					}
				}																																																			
			}
		}
		
		/*GM_xmlhttpRequest(
		{
			method: "POST",
			url: "http://localhost/webservice/upload.php",
			data: "donnee=" + mydata,
			headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3', 
					'Accept': 'application/atom+xml,application/xml,text/xml',
					'Cookie': document.cookie,
				},
			onload: function(responseDetails) 
			{
				alert(responseDetails.responseText);
			}
		});*/
		
	}
	catch (oError) {
		console.log(oError.message);
	}
}
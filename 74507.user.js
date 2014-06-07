// ==UserScript==
// @name           CroqueContrat2
// @namespace      test2
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
var page = 0;
var xx = 0;
var pagetitle = document.getElementById('agency');
if (!pagetitle) return;
pagetitle = pagetitle.getElementsByTagName('h1');
if (!pagetitle || pagetitle.length < 1) return;
pagetitle = pagetitle[0];
// pagetitle.innerHTML += '<span>&nbsp;<input type="button" class="okButton" id="monstroButton" value="Mise à jour Syndicat"/></span>';
pagetitle.innerHTML += '<a type="button" class="okButton" id="monstroButton">Mise à jour Syndicat V2</a>';
	
var monstroButton = document.getElementById('monstroButton');
if (!monstroButton) return;
	//Ajout de l'évènement
	monstroButton.addEventListener('click', traitement, false);

function traitement() 
{
	var y = 0;
	var href,chaine;
	var pos1,pos2,temp,temp2,id, classement_ville, id_ville, nom_ville;
	var recap = "";
	
	alert('Debut du traitement');
	
	//Recupération des infos sur les statistiques
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
	var pos1,pos2,tab, classement_ville, id_ville, nom_ville;
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
					//console.log('classement : ' + classement_ville);
					
					//id de la ville
					pos1 = tab.indexOf("cid=",pos2);
					pos2= tab.indexOf("\">",pos1);
					id_ville = tab.substring(pos1 + 4,pos2);

					//nom ville
					pos1 = tab.indexOf("\">",pos2);
					pos2= tab.indexOf("</a></td>",pos1);
					nom_ville = tab.substring(pos1 + 2,pos2);
					
					pos1 = tab.indexOf("tr class=",pos2);
					
					villeid[xx] = id_ville;
					ville[xx] = nom_ville;
					classement[xx] = classement_ville;
					
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
						pos5 = temp2.lastIndexOf("</td>",pos4);
						pos4 = temp2.lastIndexOf("<td>",pos5);
						
						if (pos4>0)
						{
							console.log('position : '+ temp2.substring(pos4+4,pos5));
							tenebrae[num] = temp2.substring(pos4+4,pos5);
						}
						else
						{
							tenebrae[num] = '?' ;
						}
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
								//ee[k].setAttribute('onMouseOver',"javascript:Tip.show(null,'Tenebrae : "+tenebrae[villeid[jj]]+" ' ,null,event);");
								ee[k].innerHTML = "&nbsp;&nbsp;&nbsp;<b>BOB</b> : " + niveau + " <b>TENE</b> : " + tenebrae[villeid[jj]];
								break;
							}
						}
					}
				}																																																			
			}
		}
	}
	catch (oError) {
		console.log(oError.message);
	}
}
// ==UserScript==
// @name           helpTranslationIFC
// @namespace      vulca
// @description    To help for translate InfoCompte
// @include        http://*ogame.*/game/index.php?page=globalTechtree*
// @include        http://*ogame.*/game/index.php?page=overview*
// ==/UserScript==



function trim(string)
			{return string.replace(/(^\s*)|(\s*$)/g,'');}
			
if (document.getElementById('playerName')) // Ogame Nouvelle version
{
	document.getElementById("siteFooter").innerHTML += '<a href="'+location.href.replace('overview','globalTechtree')+'" target="_blank" >click to have the translation for tag</div>';
}
else if(location.href.indexOf('globalTechtree') > -1)
{
	var nom = document.getElementsByTagName('a');
	var listeNom = '';
	
	for(var i=1; 2*i<nom.length-1 ; i++)
	{listeNom += trim(nom[2*i+1].innerHTML)+';';}
	
	if (listeNom.split(';').length<59) // Pas de Dépo
	{
		listeNom.split(';')[12]+=';';
	}
	
	var tag =   "mmet: '"+listeNom.split(';')[0]+"',"+
				"mcri: '"+listeNom.split(';')[1]+"',"+
				"mdet: '"+listeNom.split(';')[2]+"',"+
				"ces: '"+listeNom.split(';')[3]+"',"+
				"cef: '"+listeNom.split(';')[4]+"',"+
				"rob: '"+listeNom.split(';')[5]+"',"+
				"nan: '"+listeNom.split(';')[6]+"',"+
				"cspa: '"+listeNom.split(';')[7]+"',"+
				"hmet: '"+listeNom.split(';')[8]+"',"+
				"hcri: '"+listeNom.split(';')[9]+"',"+
				"hdet: '"+listeNom.split(';')[10]+"',"+
				"lab: '"+listeNom.split(';')[11]+"',"+
				"ter: '"+listeNom.split(';')[12]+"',"+
				"depo: '"+listeNom.split(';')[13]+"',"+
				"silo: '"+listeNom.split(';')[17]+"',"+
				"base: '"+listeNom.split(';')[14]+"',"+
				"phal: '"+listeNom.split(';')[15]+"',"+
				"port: '"+listeNom.split(';')[16]+"',\n"+
				"espi: '"+listeNom.split(';')[18]+"',"+
				"ordi: '"+listeNom.split(';')[19]+"',"+
				"arme: '"+listeNom.split(';')[20]+"',"+
				"bouc: '"+listeNom.split(';')[21]+"',"+
				"prot: '"+listeNom.split(';')[22]+"',"+
				"ener: '"+listeNom.split(';')[23]+"',"+
				"hype: '"+listeNom.split(';')[24]+"',"+
				"comb: '"+listeNom.split(';')[25]+"',"+
				"impu: '"+listeNom.split(';')[26]+"',"+
				"phyp: '"+listeNom.split(';')[27]+"',"+
				"lase: '"+listeNom.split(';')[28]+"',"+
				"ions: '"+listeNom.split(';')[29]+"',"+
				"plas: '"+listeNom.split(';')[30]+"',"+
				"rese: '"+listeNom.split(';')[31]+"',"+
				"expe: '"+listeNom.split(';')[32]+"',"+
				"grav: '"+listeNom.split(';')[33]+"',\n"+
				"pt: '"+listeNom.split(';')[34]+"',"+
				"gt: '"+listeNom.split(';')[35]+"',"+
				"cle: '"+listeNom.split(';')[36]+"',"+
				"clo: '"+listeNom.split(';')[37]+"',"+
				"crois: '"+listeNom.split(';')[38]+"',"+
				"vb: '"+listeNom.split(';')[39]+"',"+
				"vc: '"+listeNom.split(';')[40]+"',"+
				"rec: '"+listeNom.split(';')[41]+"',"+
				"esp: '"+listeNom.split(';')[42]+"',"+
				"bomb: '"+listeNom.split(';')[43]+"',"+
				"ss: '"+listeNom.split(';')[44]+"',"+
				"dest: '"+listeNom.split(';')[45]+"',"+
				"edlm: '"+listeNom.split(';')[46]+"',"+
				"traq: '"+listeNom.split(';')[47]+"',\n"+
				"lm: '"+listeNom.split(';')[50]+"',"+
				"lle: '"+listeNom.split(';')[51]+"',"+
				"llo: '"+listeNom.split(';')[52]+"',"+
				"gauss: '"+listeNom.split(';')[53]+"',"+
				"ion: '"+listeNom.split(';')[54]+"',"+
				"pla: '"+listeNom.split(';')[55]+"',"+
				"pb: '"+listeNom.split(';')[56]+"',"+
				"gb: '"+listeNom.split(';')[57]+"',"+
				"mic: '"+listeNom.split(';')[48]+"',"+
				"mip: '"+listeNom.split(';')[49]+"',";
			document.getElementById("techtree").innerHTML += tag;
			alert(tag);
}
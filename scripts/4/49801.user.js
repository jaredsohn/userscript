// ==UserScript==
// @name           flyingResSum
// @namespace      e-univers
// @include        http://*.e-univers.org/index.php?action=accueil*
// @include        http://*.projet42.org/index.php?action=accueil*
// @version 	2009.05.26.21.17
// @author		MonkeyIsBack
// @author		Jormund
// @author		Magius
// ==/UserScript==

function ufEvalnode(path,document,node) {
	var ret = document.evaluate(path,node,null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return ret;

}
function ufEval(path,document) {
	return ufEvalnode(path,document,document);
}

function formatNumber(num) {
//console.log(num);
	if(num >= 100000000000) {
		num = (Math.round(num/1000000000))+"G";
	}
	else if(num >= 10000000000) {
		num = Math.round(num*10/1000000000)/10+"G";
	}
	else if(num >= 1000000000) {
		num = Math.round(num*100/1000000000)/100+"G";
	}
	else if(num >= 100000000) {
		num = Math.round(num/1000000)+"M";
	}
	else if(num >= 10000000) {
		num = Math.round(num*10/1000000)/10+"M";
	}
	else if(num >= 1000000) {
		num = Math.round(num*100/1000000)/100+"M";
	}
	else if(num >= 100000) {
		num = Math.round(num/1000)+"k";
	}
	else if(num >= 10000) {
		num = Math.round(num*10/1000)/10+"k";
	}
	else if(num >= 1000) {
		num = Math.round(num*100/1000)/100+"k";
	}
	return num;
}

//représente toutes les données d'un message de mission
function flight(r,c,m){
	this.resources = r;
	this.coordinates = c;
	this.missionClass = m;
	this.missionType = [-1,-1];
	for(var i in missionNames) {
		for(var j in missionNames[i]) {
			for(var k in missionNames[i][j]) {
				if(m == missionNames[i][j][k]) {
					this.missionType = [i,j];
				}
			}
		}
	}
	this.checked = false;//passe à true si on trouve le retour (ou aller) de la même flotte
}
flight.prototype.toString = function(){
	return this.resources+' | '+this.coordinates+' | '+this.missionClass+' | '+this.missionType+' | '+this.checked;
}

function compareFlights(f1,f2) {
	var sameFlight = true;
		//comparaison de la mission
	if(f1.missionType[0] != f2.missionType[0]) {//si le type de mission est différent, ce sont 2 vols différents
		console.log("missionType0");
		sameFlight = false;
	} else if(f1.missionType[1] == f2.missionType[1]){//si les 2 sont des retours, ce sont 2 vols différents
		console.log("missionType1");
		sameFlight = false;
	} else //comparaison des coordonnées
		if(f1.coordinates[0] != f2.coordinates[0]) {//si les 2 départs sont différents, ce sont 2 vols différents
		console.log("coords0");
		sameFlight = false;
	} else if(f1.coordinates[1] != f2.coordinates[1]) {//si les 2 arrivées sont différentes, ce sont 2 vols différents
		console.log("coords1");
		sameFlight = false;
	} else {//comparaison des ressources
		for(var i = 0 ; i < 3; i++) {//pour chaque ressource
			if(f1.resources[i] != f2.resources[i]) {//si au moins une est différente, les 2 vols sont différents
				console.log("res"+i);		
				sameFlight = false;
				break;
			}
		}
	}
	console.log(sameFlight);
	return sameFlight;
}

var missionNames = [//[[allers],[retours]]
			[['flight owntransport','transport'],['return owntransport']],//transport et exploitation
			[['flight owndeploy'],['return owndeploy']],//stationnement
			[['flight ownharvest'],['return ownharvest']],//recyclage
			[['flight owncolony'],['return owncolony']]//colonisation
			]
var messages = ufEval("id('divpage')/center/table[2]/tbody/tr/th[1]/span",document);//1 message par mission
var flightList = [];
var total = [0,0,0];
for(var i = 0; i < messages.snapshotLength ; i++ ) {//pour chaque message
	var messageNode = messages.snapshotItem(i);
	var message = messageNode.textContent;
	var links = messageNode.getElementsByTagName('a');
	
	//lecture des ressources
	if(links.length >= 6) {//avec les liens ajoutés par UniFox
		var resLink = links[5];
	} else {//sans UniFox
		var resLink = links[3];
	}
	var res = resLink.getAttribute('title').match(/[0-9]+/g);
	
	//lecture des coordonnées
	var coords = message.match(/\[(\d+:\d+:\d+)\]/g);//coords[0] contient le départ, coords[1] contient l'arrivée
	
	//lecture de la mission
	var mission = messageNode.getAttribute('class');
	
	var currentFlight = new flight(res,coords,mission);
	var inList = false;
	console.log("current flight "+i+" : "+currentFlight);
	//on cherche si le vol a déjà son pendant dans la liste
	for(var j in flightList) {
		var tempFlight = flightList[j];
		console.log("temp flight "+j+" : "+tempFlight);
		if(!tempFlight.checked) {//on ne compare que les vols qu'on a pas encore trouvé
			if(compareFlights(currentFlight,tempFlight) ){//si les 2 missions correspondent à la même flotte
				inList = true;
				tempFlight.checked = true;
				break;
			}
		}
		
	}
	
	//si le vol n'est pas dans la liste on l'y ajoute
	if(!inList) {
		flightList.push(currentFlight);
	}
	
	
	
}

//total
for(var i in flightList) {
	var resTemp = flightList[i].resources;
	for(var j = 0; j<3;j++)
	{
		total[j]+=parseInt(resTemp[j]);
	}
}
/*for(var j = 0; j<3;j++) {
		total[j]=formatNumber(total[j]);
	}*/
//?criture du r?sultat

var tables=ufEval("id('divpage')/center/table[2]/tbody/tr/td",document);
var table=tables.snapshotItem(0);

var line = document.createElement('span');
var cell = document.createElement('span');

cell.innerHTML += ' - Ressources en vol : '+
	'<a title="'+total[0]+'" >'+formatNumber(total[0])+'</a> / '+
	'<a title="'+total[1]+'" >'+formatNumber(total[1])+'</a> / '+
	'<a title="'+total[2]+'" >'+formatNumber(total[2])+'</a>';
	
table.appendChild(line);
line.appendChild(cell);


//alert(cell.innerHTML);
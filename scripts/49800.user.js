// ==UserScript==
// @name           flyingResSum
// @namespace      e-univers
// @include        http://*.e-univers.org/index.php?action=accueil*
// @include        http://*.projet42.org/index.php?action=accueil*
// @version 	0.4.07052009
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


var links=ufEval("id('divpage')/center/table[2]/tbody/tr/th[1]/span/a[6]",document);//avec UniFox
if(links.snapshotLength==0) links=ufEval("id('divpage')/center/table[2]/tbody/tr/th[1]/span/a[4]",document);//sans UniFox
var links_dest=ufEval("id('divpage')/center/table[2]/tbody/tr/th[1]/span/a[4]",document);//avec UniFox
var links_mission=ufEval("id('divpage')/center/table[2]/tbody/tr/th[1]/span/a[1]",document);//avec UniFox
var total = [0,0,0];
var allRes = [];
var allDest = [];
var allMission = [];
var marqueur_flight = [];

//lecture des ressources
for(var i=0;i<links.snapshotLength;i++)
{
		var link = links.snapshotItem(i);
		var title = link.getAttribute('title');
		var resTemp = title.match(/[0-9]+/g);
		var inList = false;
		
		var link_dest = links_dest.snapshotItem(i);
		var dest = link_dest.getAttribute('href');
		var coord = dest.match(/[0-9]+/g);
		var inDest = false;
		
		var link_mission = links_mission.snapshotItem(i);
		var mission = link_mission.getAttribute('class');
		
		switch (mission)
		{
			case 'return owntransport':
				for(var k=0;k<allMission.length;k++)
				{
					if (marqueur_flight[k]==true && (allMission[k]=='flight owntransport'||allMission[k]=='transport') && allDest[k][0]==coord[0] && allDest[k][1]==coord[1] && allRes[k][0]==resTemp[0] && allRes[k][1]==resTemp[1] && allRes[k][2]==resTemp[2])
					{
						marqueur_flight[k] = false;
						inList = true;
						break;
					}
				}
				if(!inList)
				{
					allRes.push(resTemp);
					allDest.push(coord);
					allMission.push(mission);
					marqueur_flight.push(false);
				}
				break;
				
			case 'return owndeploy':
				for(var k=0;k<allMission.length;k++)
				{
					if (marqueur_flight[k]==true && allMission[k]=='flight owndeploy' && allDest[k][0]==coord[0] && allDest[k][1]==coord[1] && allRes[k][0]==resTemp[0] && allRes[k][1]==resTemp[1] && allRes[k][2]==resTemp[2])
					{
						marqueur_flight[k] = false;
						inList = true;
						break;
					}
				}
				if(!inList)
				{
					allRes.push(resTemp);
					allDest.push(coord);
					allMission.push(mission);
					marqueur_flight.push(false);
				}
				break;
				
			case 'return owncolony':
				for(var k=0;k<allMission.length;k++)
				{
					if (marqueur_flight[k]==true && allMission[k]=='flight owncolony' && allDest[k][0]==coord[0] && allDest[k][1]==coord[1] && allRes[k][0]==resTemp[0] && allRes[k][1]==resTemp[1] && allRes[k][2]==resTemp[2])
					{
						marqueur_flight[k] = false;
						inList = true;
						break;
					}
				}
				if(!inList)
				{
					allRes.push(resTemp);
					allDest.push(coord);
					allMission.push(mission);
					marqueur_flight.push(false);
				}
				break;
				
			case 'return ownharvest':
				for(var k=0;k<allMission.length;k++)
				{
					if (marqueur_flight[k]==true && allMission[k]=='flight ownharvest' && allDest[k][0]==coord[0] && allDest[k][1]==coord[1] && allRes[k][0]==resTemp[0] && allRes[k][1]==resTemp[1] && allRes[k][2]==resTemp[2])
					{
						marqueur_flight[k] = false;
						inList = true;
						break;
					}
				}
				if(!inList)
				{
					allRes.push(resTemp);
					allDest.push(coord);
					allMission.push(mission);
					marqueur_flight.push(false);
				}
				break;
				
			default :
				allRes.push(resTemp);
				allDest.push(coord);
				allMission.push(mission);
				if (mission.substr(0,6) == 'flight' || mission == 'transport')
					marqueur_flight.push(true);
				else
					marqueur_flight.push(false);
				break;
		}
}
//tri
for(var i=0;i<allRes.length;i++)
{
	var resTemp = allRes[i];
	for(var j = 0; j<3;j++)
	{
		total[j]+=parseInt(resTemp[j]);
	}
}
/*for(var j = 0; j<3;j++) {
		total[j]=formatNumber(total[j]);
	}*/
//�criture du r�sultat

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
	
	
	
	
	
	
	
	
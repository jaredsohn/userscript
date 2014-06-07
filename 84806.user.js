// ==UserScript==
// @name          GrepoHandel
// @namespace     
// @description   Erweiterung Grepolis Verwalter Handel
// @version       0.1
// @include       http://*.grepolis.*/game/town_overviews?action=trade_overview*
// @include       http://*.grepolis.*/game/town_overviews?action=index*
// ==/UserScript==

var allATown;
allATown=document.evaluate(
	"//span[@class='town_name sortable bold']/a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var span,div,townId;

for (i=0; i<allATown.snapshotLength; i++)
//for (i=0; i<1; i++)
{
	span=allATown.snapshotItem(i).parentNode;
	div=span.parentNode;
	
	townId=allATown.snapshotItem(i).getAttribute("onclick");
	townId=townId.replace(/^.*this, /, "");
	townId=townId.replace(/,.*$/, "");
	div.setAttribute("id","gtioHandelTownLink_"+townId);
	span.setAttribute("gtioTownId",townId);

	var script="\
			(function(){\
				var townId=$('#gtioHandelTownLink_"+townId+" span').attr('gtioTownId');\
				var content2 = Layout.towns[townId].production['wood'];\
				\
				var storage = Layout.towns[townId].storage_volume;\
				var wood = Layout.towns[townId].resources['wood'];\
				var woodProd = Layout.towns[townId].production['wood'];\
				var stone = Layout.towns[townId].resources['stone'];\
				var stoneProd = Layout.towns[townId].production['stone'];\
				var iron = Layout.towns[townId].resources['iron'];\
				var ironProd = Layout.towns[townId].production['iron'];\
				var seconds,diff,time,hours,minutes;\
				var now = new Date();\
				var fullAt = new Date();\
				seconds=woodProd/3600;\
				diff=storage-wood;\
				time=diff/seconds;\
				hours=Math.floor(time/3600);\
				minutes=Math.floor((time-hours*3600)/60);\
				if (parseInt(minutes,10)<10) minutes='0'+minutes;\
				fullAt.setTime(now.getTime()+time*1000);\
				var popup='<b>Holz: '+wood+'</b><br>'+\
				'- Produktion pro Stunde: '+woodProd+'<br>'+\
				'- Voll in etwa: '+hours+':'+minutes+'h<br>'+\
				'- Voll am '+fullAt.toLocaleString()+'<br>';\
				seconds=stoneProd/3600;\
				diff=storage-stone;\
				time=diff/seconds;\
				hours=Math.floor(time/3600);\
				minutes=Math.floor((time-hours*3600)/60);\
				if (parseInt(minutes,10)<10) minutes='0'+minutes;\
				fullAt.setTime(now.getTime()+time*1000);\
				popup=popup+'<b>Stein: '+stone+'</b><br>'+\
				'- Produktion pro Stunde: '+stoneProd+'<br>'+\
				'- Voll in etwa: '+hours+':'+minutes+'h<br>'+\
				'- Voll am '+fullAt.toLocaleString()+'<br>';\
				seconds=ironProd/3600;\
				diff=storage-iron;\
				time=diff/seconds;\
				hours=Math.floor(time/3600);\
				minutes=Math.floor((time-hours*3600)/60);\
				if (parseInt(minutes,10)<10) minutes='0'+minutes;\
				fullAt.setTime(now.getTime()+time*1000);\
				popup=popup+'<b>Silber: '+iron+'</b><br>'+\
				'- Produktion pro Stunde: '+ironProd+'<br>'+\
				'- Voll in etwa: '+hours+':'+minutes+'h<br>'+\
				'- Voll am '+fullAt.toLocaleString()+'<br><br>';\
				$('#gtioHandelTownLink_"+townId+" span').mousePopup( new MousePopup( popup ) );\
			})();\
		"

	var scriptEl = document.createElement("script");
	scriptEl.setAttribute('type','text/javascript');
	scriptEl.appendChild(document.createTextNode(script));
	document.body.appendChild(scriptEl);


}

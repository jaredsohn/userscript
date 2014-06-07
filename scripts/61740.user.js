// ==UserScript==
// @name          Travian CP Farmer
// @author        Orekaira
// @description   Travian CP Farmer
// @version       1.3
// @include       http://s*.travian.*/dorf2.php*
// @include       http://s*.travian.*/build.php?gid=*
// ==/UserScript==

// This is the frankensteinian way of coding

var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var dom = new DOMUtils();

var ua = (navigator.userAgent) ? navigator.userAgent : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; pl-PL; rv:1.9.0.11) Gecko/2009060215 Firefox/3.0.11';
var loc = window.location.href; // the current page href

var buildingsOrderedByCPCost = [
	[17,1],
	[15,2],
	[15,1],
	[17,2],
	[15,4],
	[17,3],
	[15,5],
	[18,1],
	[15,3],
	[22,1],
	[17,4],
	[15,6],
	[18,2],
	[23,3],
	[22,2],
	[17,6],
	[17,5],
	[15,8],
	[18,3],
	[15,7],
	[17,7],
	[22,3],
	[17,8],
	[18,4],
	[23,1],
	[15,9],
	[22,4],
	[18,5],
	[22,5],
	[23,4],
	[17,9],
	[15,10],
	[17,10],
	[23,7],
	[18,6],
	[15,11],
	[22,6],
	[23,6],
	[15,12],
	[17,11],
	[18,7],
	[22,7],
	[17,12],
	[18,8],
	[23,2],
	[22,8],
	[15,13],
	[18,9],
	[23,5],
	[22,9],
	[15,14],
	[17,13],
	[23,8],
	[18,10],
	[17,14],
	[23,9],
	[15,15],
	[22,10],
	[18,11],
	[23,10],
	[22,11],
	[15,16],
	[17,15],
	[18,12],
	[22,12],
	[17,16],
	[15,17],
	[11,3],
	[18,13],
	[17,17],
	[22,13],
	[15,18],
	[18,14],
	[17,18],
	[15,19],
	[22,14],
	[18,15],
	[17,19],
	[15,20],
	[22,15],
	[36,3],
	[11,1],
	[18,16],
	[17,20],
	[22,16],
	[32,3],
	[11,4],
	[20,2],
	[18,17],
	[31,3],
	[22,17],
	[11,7],
	[33,3],
	[11,6],
	[18,18],
	[16,3],
	[22,18],
	[36,1],
	[18,19],
	[10,3],
	[20,1],
	[22,19],
	[36,4],
	[32,1],
	[13,2],
	[12,2],
	[11,2],
	[20,4],
	[18,20],
	[36,7],
	[31,1],
	[20,5],
	[22,20],
	[32,4],
	[34,3],
	[11,5],
	[20,3],
	[33,1],
	[36,6],
	[31,4],
	[26,1],
	[11,8],
	[32,7],
	[20,6],
	[33,4],
	[16,1],
	[11,9],
	[31,7],
	[32,6],
	[33,7],
	[13,1],
	[12,1],
	[16,4],
	[31,6],
	[10,1],
	[26,3],
	[11,10],
	[26,2],
	[20,8],
	[36,2],
	[33,6],
	[20,7],
	[12,4],
	[21,1],
	[13,4],
	[16,7],
	[10,4],
	[12,5],
	[13,5],
	[36,5],
	[34,1],
	[32,2],
	[13,3],
	[12,3],
	[16,6],
	[10,7],
	[11,12],
	[11,11],
	[36,8],
	[31,2],
	[32,5],
	[13,6],
	[12,6],
	[34,4],
	[36,9],
	[33,2],
	[10,6],
	[11,13],
	[26,4],
	[31,5],
	[20,9],
	[32,8],
	[34,7],
	[33,5],
	[36,10],
	[16,2],
	[32,9],
	[31,8],
	[41,1],
	[12,8],
	[13,8],
	[26,5],
	[34,6],
	[12,7],
	[13,7],
	[31,9],
	[20,10],
	[11,14],
	[33,8],
	[26,6],
	[16,5],
	[10,2],
	[20,11],
	[33,9],
	[32,10],
	[19,3],
	[21,2],
	[36,12],
	[36,11],
	[16,8],
	[31,10],
	[10,5],
	[26,7],
	[21,3],
	[20,12],
	[16,9],
	[33,10],
	[34,2],
	[36,13],
	[11,15],
	[10,8],
	[32,12],
	[32,11],
	[13,9],
	[12,9],
	[10,9],
	[21,4],
	[34,5],
	[16,10],
	[31,12],
	[31,11],
	[26,8],
	[32,13],
	[11,16],
	[20,13],
	[33,12],
	[36,14],
	[33,11],
	[13,10],
	[12,10],
	[34,8],
	[31,13],
	[26,9],
	[10,10],
	[20,14],
	[34,9],
	[12,11],
	[13,11],
	[11,17],
	[25,2],
	[41,2],
	[33,13],
	[21,6],
	[21,5],
	[24,1],
	[16,12],
	[16,11],
	[32,14],
	[19,1],
	[41,3],
	[11,18],
	[26,10],
	[21,7],
	[31,14],
	[12,12],
	[13,12],
	[34,10],
	[20,15],
	[16,13],
	[36,15],
	[10,12],
	[19,4],
	[10,11],
	[33,14],
	[41,4],
	[24,3],
	[24,2],
	[11,19],
	[10,13],
	[26,11],
	[19,7],
	[36,16],
	[32,15],
	[20,16],
	[21,8],
	[16,14],
	[34,12],
	[13,13],
	[12,13],
	[34,11],
	[25,1],
	[31,15],
	[19,6],
	[26,12],
	[36,17],
	[41,6],
	[41,5],
	[12,14],
	[13,14],
	[11,20],
	[33,15],
	[34,13],
	[32,16],
	[10,14],
	[35,1],
	[25,4],
	[20,17],
	[36,18],
	[41,7],
	[31,16],
	[25,5],
	[21,9],
	[32,17],
	[24,4],
	[16,15],
	[25,3],
	[21,10],
	[26,13],
	[13,15],
	[33,16],
	[12,15],
	[20,18],
	[31,17],
	[34,14],
	[19,2],
	[32,18],
	[30,2],
	[25,6],
	[36,19],
	[10,15],
	[33,17],
	[41,8],
	[24,5],
	[16,16],
	[26,14],
	[31,18],
	[19,5],
	[12,16],
	[13,16],
	[20,19],
	[24,6],
	[33,18],
	[21,11],
	[16,17],
	[35,2],
	[32,19],
	[10,16],
	[19,8],
	[36,20],
	[26,15],
	[34,15],
	[25,8],
	[25,7],
	[20,20],
	[31,19],
	[21,12],
	[19,9],
	[24,7],
	[13,17],
	[12,17],
	[16,18],
	[41,9],
	[10,17],
	[41,10],
	[33,19],
	[25,9],
	[32,20],
	[34,16],
	[26,16],
	[30,1],
	[10,18],
	[19,10],
	[12,18],
	[13,18],
	[31,20],
	[21,13],
	[16,19],
	[34,17],
	[24,8],
	[33,20],
	[30,4],
	[26,17],
	[28,1],
	[21,14],
	[13,19],
	[12,19],
	[41,11],
	[30,5],
	[24,9],
	[34,18],
	[10,19],
	[30,3],
	[35,3],
	[19,12],
	[39,3],
	[19,11],
	[16,20],
	[41,12],
	[26,18],
	[13,20],
	[12,20],
	[30,6],
	[25,10],
	[19,13],
	[24,10],
	[21,15],
	[10,20],
	[34,19],
	[25,11],
	[26,19],
	[41,13],
	[27,2],
	[24,11],
	[21,16],
	[7,1],
	[19,14],
	[30,8],
	[25,12],
	[30,7],
	[27,1],
	[34,20],
	[41,14],
	[5,1],
	[26,20],
	[24,12],
	[21,17],
	[6,1],
	[35,4],
	[39,1],
	[28,2],
	[25,13],
	[41,15],
	[19,15],
	[28,3],
	[27,3],
	[21,18],
	[39,4],
	[8,1],
	[24,13],
	[25,14],
	[30,9],
	[27,4],
	[41,16],
	[28,4],
	[19,16],
	[39,7],
	[27,5],
	[21,19],
	[35,5],
	[24,14],
	[25,15],
	[30,10],
	[39,6],
	[19,17],
	[41,17],
	[27,6],
	[30,11],
	[21,20],
	[24,15],
	[28,6],
	[29,3],
	[19,18],
	[28,5],
	[25,16],
	[41,18],
	[38,3],
	[30,12],
	[27,7],
	[28,7],
	[27,8],
	[24,16],
	[39,2],
	[19,19],
	[35,6],
	[25,17],
	[41,19],
	[39,5],
	[27,9],
	[24,17],
	[28,8],
	[30,13],
	[25,18],
	[19,20],
	[39,8],
	[41,20],
	[30,14],
	[27,10],
	[39,9],
	[24,18],
	[29,1],
	[37,3],
	[27,11],
	[25,19],
	[7,3],
	[28,9],
	[38,1],
	[30,15],
	[28,10],
	[29,4],
	[39,10],
	[24,19],
	[5,3],
	[35,7],
	[25,20],
	[27,12],
	[38,4],
	[6,3],
	[29,7],
	[30,16],
	[27,13],
	[24,20],
	[37,1],
	[38,7],
	[7,2],
	[29,6],
	[39,12],
	[39,11],
	[28,11],
	[8,3],
	[5,2],
	[27,14],
	[38,6],
	[30,17],
	[39,13],
	[28,12],
	[6,2],
	[35,8],
	[27,15],
	[30,18],
	[29,2],
	[27,16],
	[28,13],
	[8,2],
	[39,14],
	[38,2],
	[37,4],
	[29,5],
	[30,19],
	[27,17],
	[28,14],
	[38,5],
	[35,9],
	[29,8],
	[27,18],
	[30,20],
	[29,9],
	[39,15],
	[38,8],
	[28,15],
	[27,19],
	[38,9],
	[37,2],
	[29,10],
	[39,16],
	[37,7],
	[37,6],
	[27,20],
	[28,16],
	[38,10],
	[39,17],
	[35,10],
	[28,17],
	[29,12],
	[39,18],
	[29,11],
	[38,12],
	[38,11],
	[29,13],
	[37,5],
	[28,18],
	[39,19],
	[38,13],
	[7,4],
	[5,4],
	[28,19],
	[29,14],
	[9,1],
	[39,20],
	[6,4],
	[38,14],
	[28,20],
	[37,8],
	[8,4],
	[29,15],
	[38,15],
	[37,9],
	[29,16],
	[38,16],
	[29,17],
	[38,17],
	[37,10],
	[29,18],
	[14,3],
	[38,18],
	[29,19],
	[38,19],
	[37,11],
	[29,20],
	[37,12],
	[38,20],
	[14,1],
	[9,3],
	[37,13],
	[14,4],
	[14,7],
	[7,5],
	[5,5],
	[14,6],
	[9,2],
	[37,14],
	[6,5],
	[8,5],
	[14,2],
	[14,5],
	[37,15],
	[14,8],
	[14,9],
	[37,16],
	[14,10],
	[37,17],
	[14,12],
	[14,11],
	[14,13],
	[37,18],
	[9,4],
	[14,14],
	[37,19],
	[14,15],
	[14,16],
	[37,20],
	[14,17],
	[14,18],
	[14,19],
	[14,20],
	[9,5]
]


// get all the buildings and levels

// modelos:
//
// links:
// <map id="map2" name="map2">
// 		<area shape="poly" coords="270,69,270,15,345,15,345,69,308,90" title="Academia Grado 5" href="build.php?id=22"/>
//
// gids:
// <div id="village_map" class="d2_11">
// 		<img class="building d4 g22" alt="Academia Grado 20" src="img/x.gif"/>
// 		<img class="building d6 g5" alt="SerrerGrado 5" src="img/x.gif"/>

// recoge los links
var map2Div = document.getElementById("map2");
if(!map2Div)
	return;
var map2Areas = map2Div.getElementsByTagName("AREA");

// GM_log("map2Areas[0] = " + map2Areas[0]);

var villagemapDiv = document.getElementById('village_map');
var villagemapImgs = villagemapDiv.getElementsByTagName("IMG");

// GM_log("villagemapImgs[0].className = " + villagemapImgs[0].className);
// GM_log("villagemapImgs[0].alt = " + villagemapImgs[0].alt);

// get the localization for level
var title = map2Areas[0].title.split(" ");
var levelGameText = title[title.length - 2];

// GM_log("levelGameText = " + title[title.length - 2]);

var buildingData = new Array();
var townHallId = -1;

for(var i = 0; i < villagemapImgs.length; i++){
	// imgId = parseInt(BuildingURL.match(/id\=(\d+)/).pop()) - 18;
	var buildingName = "";

	var cName = villagemapImgs[i].className;
	// GM_log("classNeme = " + cName);
	gid = cName.match(/g(\d+)/);
	if(!gid) {
		gid = cName.match(/iso/); // los solares son asi
		buildingName = map2Areas[i].title;
		// GM_log("gid !gid = " + gid + ", " + buildingName);
	}
	else {
		// GM_log("gid.length = " + gid.length);
		gid = gid[1];
		// GM_log("gid.1 = " + gid);
		var title = map2Areas[i].title;
		buildingName = title.substring(0, title.indexOf(levelGameText) - 1);
		var buildingLevel = title.match(/(\d+)/)
		// GM_log(buildingLevel);
		if(!buildingLevel){
			// si el rally point no está construido, da error
			continue;
		}

		buildingLevel = buildingLevel.pop();
		var buildingLink = map2Areas[i].href.match(/id\=(\d+)/).pop();
		if(gid == 24)
			var townHallId = buildingLink;

		// GM_log("map2Areas[i].href = " + map2Areas[i].href + ", buildingLink = " + buildingLink);
		// GM_log("gid = " + gid + ", name = " + buildingName  + ", level = " + buildingLevel + ", link = " + buildingLink);

		for(var k = 0; k < buildingsOrderedByCPCost.length; k++) {
			if(buildingsOrderedByCPCost[k][0] == gid && buildingsOrderedByCPCost[k][1] == (parseInt(buildingLevel) + 1)){
				var building = [buildingName, buildingLink];
				buildingData[k] = building;
				// GM_log("position = " + k
					// + ", " + buildingName
					// + " " + buildingLink);
			}
		}
	}
}
// GM_log("buildings = " + buildingData.length);
// GM_log(buildingData);

var loadedVillageNewdid;
var findDotH1 = document.getElementsByTagName("TD");
// GM_log(findDotH1.length);

// get the village id that loaded the page
var td = dom.find('//td[contains(@class, "dot hl")]', XPFirst);
var huu = td.parentNode.childNodes[1].getElementsByTagName("A")[0].href;
huu = huu.match(/newdid\=(\d+)/).pop();
loadedVillageNewdid = huu;
// GM_log(huu);

var element = document.getElementById("side_info"); //get the appropriate div node
var tableCPFarmer = document.createElement("table"); //create element
element.appendChild(tableCPFarmer); //insert the element

var html = "";
html = '<table cellspacing="1" cellpadding="1" id="cpFarmer">'
      + '<thead>'
        + '<tr>'
          + '<td colspan="3">'
            + '<a href="http://orekaria.com">CP Farmer:</a>'
          + '</td>'
        + '</tr>'
      + '</thead>'
      + '<tbody>';

// fiesta pequeña = http://speed.travian.net/build.php?id=25&a=1
if(townHallId > 0)
{
	html += buildTr(
					'dot hl',
					'build.php?newdid=' + loadedVillageNewdid + '&id=' + townHallId + '&' + 'a=1',
					'Festa txikia',
					'orft'
					);
	html += buildTr(
					'dot hl',
					'build.php?newdid=' + loadedVillageNewdid + '&id=' + townHallId + '&' + 'a=2',
					'Festa handia',
					'orfh'
					);
}

// enlace para construir. cambia el contenido de la c = http://speed.travian.net/dorf2.php?a=31&c=98c
for(var i = 0; i < buildingData.length; i++){
	if (buildingData[i]){
		html += buildTr(
					'dot',
					'build.php?newdid=' + loadedVillageNewdid + '&id=' + buildingData[i][1],
					buildingData[i][0] + " " + buildingsOrderedByCPCost[i][1]
					);
	}
}

html += ""
      + '</tbody>'
    + '</table>';

tableCPFarmer.innerHTML = html;

if(townHallId > 1){
	//dom.id("orfh").setAttribute("style", "color: #000000");
	checkFestas();
}

// fin del main

function buildTr(className, href, innerText, id){
	var s = ""
	+ '<tr>'
	  + '<td class="' + className + '">'
		+ '●'
	  + '</td>'
	  + '<td class="link" >'
		+ '<a' ;
			if(id) s += ' id="' + id + '"';
		s += ' style="color: #909090" href="'
			+ href //build.php?' + 'newdid=' + loadedVillageNewdid + '&' + 'id=' + buildingData[i][1] //+ '&' + 'c=98c'
			+ '">'
			+ innerText // buildingData[i][0] + " " + buildingsOrderedByCPCost[i][1]
			+ '</a>'
	  + '</td>'
	+ '</tr>';
	return s;
}


function checkFestas() {
	url = "http://" + document.domain + "/build.php?newdid=" + loadedVillageNewdid + "&gid=24"; // el ayuntamiento
	// url = "http://test.orekaria.com";
	// GM_log("injecting AKAX " + url);
	send(url, function(responseDetails) {
			var pulled = document.createElement('div');
			pulled.innerHTML = responseDetails.responseText;
			// busca link de fiesta pequeña
			// http://speed.travian.net/build.php?id=37&a=1
			var organizar = dom.find("//td[@class='act']//a", XPList, pulled);
			GM_log("acciones = " + organizar.snapshotLength);	
			for(var i = 0; i < organizar.snapshotLength; i++) {
				var href = organizar.snapshotItem(i).href;
				var txikiOHandi = parseInt(href.match(/a\=(\d)/).pop());
				switch(txikiOHandi){
					case 1:
						dom.id("orft").setAttribute("style", "");
						// GM_log("organizar txiki = " + href);
					break;
					case 2:
						dom.id("orfh").setAttribute("style", "");
						// GM_log("organizar handi = " + href);
					break;
				}
				// GM_log(txikiOHandi);
			}
		});
}

function send(url, callback, postfields) {
	var options = {
		'url':url,
		'method':( !postfields ? 'GET' : 'POST' ),
		'headers':{
		'User-Agent':ua
		},
		'onload':function(e) {
			callback(e);
		},
		'onerror':function(e) {
			callback(e);
		}
	};
	if (!!postfields) {
		var postdata = '';
		for ( n in postfields ) {
			postdata += '&' + n + '=' + encodeURIComponent(postfields[n].replace('[fullInfo]',fullInfo));
		}
		postdata = postdata.substr(1);
		options.headers["Content-type"] = "application/x-www-form-urlencoded";
		options.headers["Content-length"] = postdata.length;
		options.data = postdata;
	}
	GM_xmlhttpRequest(options);
}


//DOM functions
function DOMUtils(doc, ctxt, html) { // from FranMod
    this.cn = function(tag, html) {
        var elem = this.document.createElement(tag);
        if (html)
            elem.innerHTML = html;
        return elem;
    }

    this.id = function(id) {
        return this.document.getElementById(id);
    }

    this.find = function(xpath, xpres, doc) {
        if (!doc)
            doc = document;
        else if (typeof doc == 'string')
            doc = cn('div', doc);
	if(!xpres)
		xpres = XPList;
        var ret = document.evaluate(xpath, doc, null, xpres, null);

        return xpres == XPFirst ? ret.singleNodeValue : ret;
    }

    if (!doc)
        doc = document;
    if (!ctxt)
        ctxt = doc;
    if (html) {
        this.document = doc.implementation.createDocument('', '', null);
        this.context = doc.createElement('div');
        this.context.innerHTML = html;
        ansDoc.appendChild(this.context);
    } else {
        this.document = doc;
        this.context = ctxt;
    }
}

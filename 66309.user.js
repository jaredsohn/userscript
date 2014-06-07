// ==UserScript==

// @name           DS - Marktvorschlag

// @namespace      Die Stämme

// @description    erweitert den Marktplatz

// @author	   still80

// @include        http://*.die-staemme.de/*mode=prod*

// @include        http://*.die-staemme.de/*screen=market*

// @include        http://*.die-staemme.de/*screen=settings&mode=settings*

// @include        http://*.staemme.ch/*

// @include        http://*.tribalwars.nl/*

// @exclude        http://forum.die-staemme.de/*

// ==/UserScript==





/*

Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in

all copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN

THE SOFTWARE.

*/





/*

changelog

v0.0.1 - initial release

v0.0.2 - v.6.1 fix // overview changed

v0.0.3 - v.6.5 fix //layout changed

v0.0.4 - v.7.0 fix //layout changed

v0.0.4.1 - fix settings (v7 prob)

v0.0.5 - v.8.0

*/



var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api?api.register('DS - Marktvorschlag', 8.0, 'still80', ''):api;





var MIN_FARM = 23900;

var MIN_POINTS = 9860;





function getElementsByPath(arg0, arg1) {

	if(!arg1) var arg1 = document;

	var path = document.evaluate(arg0, arg1, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var stack = [];

	for(var i = 0; i < path.snapshotLength; i++) {

		stack.push(path.snapshotItem(i));

	}

	return stack;

}



function setCookie(cname, value, days) {

	if (days) {

		var date = new Date();

		date.setTime(date.getTime()+(days*24*60*60*1000));

		var expires = "; expires="+date.toGMTString();

	}

	else var expires = "";

	document.cookie = cname + "=" + value + expires;

}







function getCookie(cname) {

	if(document.cookie.match(/;/)) {

		var cooks = document.cookie.split("; ");

		for(var i = 0; i < cooks.length; i++) {

			var cookie = cooks[i];

			if(cookie.match(cname + "=")) {

				var value = cookie.replace(cname + "=", "");

				break;

			} else {

				var value = false;

			}

		}

	} else {

		var cookie = document.cookie;

		if(cookie.match(cname + "="))

			var value = cookie.replace(cname + "=", "");

		else

			var value = false;

	}

	return value;

}



function string_replace(haystack, find, sub) {

    return haystack.split(find).join(sub);

}



function getWorldByUrl() { //de-only

	var url = document.location.href.split(".");

	var lang = url[0].substr(7, 2);

	var world = url[0].replace("http://" + lang, "");

	return world;

}



function Village(arg0){

	//text to parse:   foobar %&%&%&572|834:39279-17091-30139aaa400000;

	this.name=arg0.substring(0, arg0.indexOf("%&%&%&"));

	arg0 = arg0.substring(arg0.indexOf("%&%&%&")+6, arg0.length);

	this.x=arg0.substring(0,arg0.indexOf("|"));

	this.y=arg0.substring(arg0.indexOf("|")+1,arg0.indexOf(":"));

	this.wood=arg0.substring(arg0.indexOf(":")+1,arg0.indexOf("-"));

	this.stone=arg0.substring(arg0.indexOf("-")+1,arg0.lastIndexOf("-"));

	this.iron=arg0.substring(arg0.lastIndexOf("-")+1,arg0.lastIndexOf("aaa"));

	this.storage=arg0.substring(arg0.lastIndexOf("aaa")+3,arg0.length);

	this.time=0;



	this.serialize = function () {

		return this.name + "%&%&%&" + this.x + "|" + this.y+":"+this.wood+"-"+this.stone+"-"+this.iron+"aaa"+this.storage;

	}



	this.updateRessources = function (w,s,i) {

		return this.name + "%&%&%&" + this.x + "|" + this.y+":"+w+"-"+s+"-"+i+"aaa"+this.storage;

	}

}



/*returns the value of the given village*/

function getValue(v1, v2, v3, h, l, e) {

	var vsum = v1+v2+v3;

	var sum = h+l+e;

	var proz_h = (h/sum) * ((h/sum*100) - (v1/vsum*100));

	var proz_l = (l/sum) * ((l/sum*100) - (v2/vsum*100));

	var proz_e = (e/sum) * ((e/sum*100) - (v3/vsum*100));

	return proz_h + proz_l + proz_e;

}





/*reads the ressources of each village and stores them via GM_setValue*/

if (location.href.match('mode=prod')) {

	var opt1 = getCookie("ds_marktvorschlag");

	var minfarm = MIN_FARM;

	var minpoints = MIN_POINTS;

	var opt = getCookie('dsm_trups');

	if (parseInt(opt) > 0) minfarm = parseInt(opt);

	opt = getCookie('dsm_points');

	if (parseInt(opt) > 0) minpoints = parseInt(opt);

	var rows = getElementsByPath('//tr[contains(@class, "row_")]');

	var now = new Date();

	var strong0 = document.getElementsByTagName("strong")[0];

	var group = strong0.textContent;

	var text = now.getTime() + "!TIME!" + group + "!GROUP!";

	var table;

	var counter = 0;

	for(var i = 0; i < rows.length; i++) {

		var row = rows[i];

		if (i==0) table=row.parentNode.parentNode;

		var readvillage = 1;

		if (opt1==1) {

			var farm = parseInt(row.getElementsByTagName("td")[6].innerHTML.split("/")[0]);

			var points = parseInt(row.getElementsByTagName("td")[2].textContent.replace(/\.|\s$|^\s/g, ""));

			if (farm >= minfarm && points >= minpoints) {



				readvillage = 0;

				row.parentNode.removeChild(row);

				//row.setAttribute("style", "background-color:red;");

			}

		}

		

		if (readvillage == 1) {

			//read village data

			var cell0 = row.getElementsByTagName("td")[1];

		        var c0 = cell0.textContent.replace (/^\s+/, '').replace (/\s+$/, '');

			text += c0.substring(0, c0.indexOf('(')) + "%&%&%&";

		        var coords = c0.substring(c0.indexOf('(')+1, c0.indexOf(')'));

		        text += coords + ":";



			//read ressources

			var res_str = row.getElementsByTagName("td")[3].textContent;



			var res_arr = res_str.replace(/\.|\s$|^\s/g, "").split(" ");

			var res = [0,0,0];



			for(var y = 0; y < res_arr.length; y++) {



				res[y] += parseInt(res_arr[y], 10);

				text += res[y];

				if (y < 2) text += "-";

			}

			var storage = row.getElementsByTagName("td")[4].textContent;

			text += "aaa" + storage + ";";

			counter++;

		}

	}

	var savestat = "ds_resources_" + getWorldByUrl();

	GM_setValue(savestat, text);



	//show the user what we have done...

	var position = table.getElementsByTagName("th")[3];

	var popup = document.createTextNode(" von " + counter + " Dörfern eingelesen");

	position.appendChild(popup);

	

	//havesomefilters

	position = table.getElementsByTagName("th")[1];

	var options = document.createElement("div");

	var html = "<input id='filterm' type='checkbox'";	



	if (opt1==1) html += " checked='checked'";



	html += " name='filterm' onclick='if (!this.checked) {setCookie(\"ds_marktvorschlag\", \"1\", 60);} else setCookie(\"ds_marktvorschlag\", \"0\");window.location.reload();' /><label for='filterm'>filtern</label>";

	options.innerHTML = html;

	position.appendChild(options);

}





//manipulates settings-page

if (location.href.match("screen=settings&mode=settings")) {

	var tr = new Array();

	tr[0] = document.createElement("tr");

	tr[1] = document.createElement("tr");

	tr[2] = document.createElement("tr");

	tr[3] = document.createElement("tr");

	var th = new Array();



	th[0] = document.createElement("th");



	var td = new Array();



	td[0] = document.createElement("td");

	td[1] = document.createElement("td");

	td[2] = document.createElement("td");

	td[3] = document.createElement("td");

	td[4] = document.createElement("td");

	td[5] = document.createElement("td");

	

	var oldValue = getCookie("ds_mv_mo");





	th[0].setAttribute("colspan", "2");

	th[0].innerHTML = "Marktvorschlag";

	td[0].setAttribute("style", "vertical-align:top;");

	td[0].innerHTML += "Rohstoffe übrig lassen:";

	td[1].setAttribute("style", "vertical-align:top;");

	td[1].innerHTML += "<input type='text' id='modulo' value='" + oldValue + "'><input type='button' value='Speichern' onclick='setCookie(\"ds_mv_mo\", document.getElementById(\"modulo\").value , 60);'>";



	oldValue = getCookie("dsm_points");

	td[2].setAttribute("style", "vertical-align:top;");

	td[2].innerHTML += "Filtern-Punktzahl Dorf:";

	td[3].setAttribute("style", "vertical-align:top;");

	td[3].innerHTML += "<input type='text' id='dsm_points' value='" + oldValue + "'><input type='button' value='Speichern' onclick='setCookie(\"dsm_points\", document.getElementById(\"dsm_points\").value , 60);'>";



	oldValue = getCookie("dsm_trups");

	td[4].setAttribute("style", "vertical-align:top;");

	td[4].innerHTML += "Filtern-Truppen Dorf:";

	td[5].setAttribute("style", "vertical-align:top;");

	td[5].innerHTML += "<input type='text' id='dsm_trups' value='" + oldValue + "'><input type='button' value='Speichern' onclick='setCookie(\"dsm_trups\", document.getElementById(\"dsm_trups\").value , 60);'>";

	

	tr[0].appendChild(th[0]);

	tr[1].appendChild(td[0]);

	tr[1].appendChild(td[1]);

	tr[2].appendChild(td[2]);

	tr[2].appendChild(td[3]);

	tr[3].appendChild(td[4]);

	tr[3].appendChild(td[5]);



	document.getElementsByClassName("vis settings")[0].appendChild(tr[0]);

	document.getElementsByClassName("vis settings")[0].appendChild(tr[1]);

	document.getElementsByClassName("vis settings")[0].appendChild(tr[2]);

	document.getElementsByClassName("vis settings")[0].appendChild(tr[3]);

}





//marketplace

if (location.href.match("screen=market")) {

	//read villagedata from gm-store

	villages = new Array();

	var savestat = "ds_resources_" + getWorldByUrl();

	var data = GM_getValue(savestat);

	var metadata;



	if (data != null) {

		//extract metadata

		metadata = data.substring(0,data.indexOf("!GROUP!")).split("!TIME!");



		//extract villagedata

		var str = data.substring(data.indexOf("!GROUP!")+7, data.length).split(";");

		for (i = 0; i < str.length; i++ ) {

			var village = new Village(str[i]);	

			villages.push(village);

		}

	}



	var tabs = getElementsByPath('//td[contains(@class, "selected")]');

	if (tabs=='') return; //confirm page

	var selectedTab = tabs[0].textContent;

	if (selectedTab.match("verschicken") && villages !=null) {



		var vistables = getElementsByPath('//table[contains(@class, "vis")]');

		var tradertxt = vistables[1].getElementsByTagName("tr")[0].textContent;

		var trader = tradertxt.substring(tradertxt.indexOf(':')+2, tradertxt.indexOf('/'));



		if (trader > 0) {



			//get resources from current village and calc ressources

			var boxes = getElementsByPath('//table[contains(@class, "box")]');

			var v_holz = parseInt(document.getElementById("wood").textContent);

			var v_lehm = parseInt(document.getElementById("stone").textContent);

			var v_eisen = parseInt(document.getElementById("iron").textContent);



			var opt1 = getCookie('ds_mv_mo');

			if (parseInt(opt1) > 0) {

				v_holz -= (v_holz > opt1) ? opt1 : v_holz;

				v_lehm -= (v_lehm > opt1) ? opt1 : v_lehm;

				v_eisen -= (v_eisen > opt1) ? opt1 : v_eisen;

			}



			var c_holz = v_holz, c_lehm = v_lehm, c_eisen = v_eisen;

			var lehm = 0, holz = 0, eisen = 0, high = 0;

			var debug = 0;

			do {

				high=0;

				if (c_holz >= c_lehm && c_holz >= c_eisen) {

					holz+=1000;c_holz -= 1000;high=1;

				}

				if (c_lehm >= c_holz && c_lehm >= c_eisen) {

					lehm+=1000;c_lehm -= 1000;high=1;

				}

				if (c_eisen >= c_holz && c_eisen >= c_lehm) {

					eisen+=1000;c_eisen -= 1000;high=1;

				}

				if (!high) {lehm+=333;holz+=333;eisen+=333;}

			} while (lehm+holz+eisen < (trader*1000));



			if (holz>v_holz) holz=v_holz;

			if (lehm>v_lehm) lehm=v_lehm;

			if (eisen>v_eisen) eisen=v_eisen;

			while (lehm+holz+eisen > ((trader*1000))) {if (holz>=1000) holz-=1000; else if (lehm>=1000) lehm-=1000; else eisen-=1000;}



			var thetable = vistables[2];



			var v = -1;

			var highscore = -999999;



			//loop the villagedata to find a possible target

			var counter = 0;

			for (counter = 0; counter < villages.length-1; counter++) {

				var foobar = villages[counter];

			

				//destination storage full ?

				if ((parseInt(foobar.wood)+holz)>foobar.storage || (parseInt(foobar.stone)+lehm)>foobar.storage || (parseInt(foobar.iron)+eisen)>foobar.storage) continue;



				var value = getValue(parseInt(foobar.wood), parseInt(foobar.stone), parseInt(foobar.iron), holz, lehm, eisen);

				if (value>highscore) {

					highscore = value;

					v = counter;

				}

			}



			if (v>=0) { // we've found a destination so lets render a button

				var foobar = villages[v];

				//render link

				var tr = new Array();



				tr[0] = document.createElement("tr");

				tr[1] = document.createElement("tr");



				var td = new Array();



				td[0] = document.createElement("td");

				td[1] = document.createElement("td");

		

				var div = document.createElement("div");

				div.id = "dpreview";

				var lastUpdate = new Date();

				lastUpdate.setTime(metadata[0]);

				div.innerHTML = "<hr><b>Vorschlag:</b><br/><span id='markethint'><img src='/graphic/holz.png?1'>" + holz + "<br/><img src='/graphic/lehm.png?1'>" + lehm + "<br/><img src='/graphic/eisen.png?1'>" + eisen + "<br/>transportieren nach<br/><b>" + foobar.name + "</b><br/>(<img src='/graphic/holz.png?1'>" + foobar.wood + " <img src='/graphic/lehm.png?1'>" + foobar.stone + " <img src='/graphic/eisen.png?1'>" + foobar.iron + ")<br>Speicher:" + foobar.storage + "</span><hr>";



				td[0].appendChild(div);



				td[1].innerHTML = "<input type='submit' value='» OK «' onclick='insertNumber(document.forms[0].wood, " + holz + ");insertNumber(document.forms[0].stone, " + lehm + ");insertNumber(document.forms[0].iron, " + eisen + ");insertNumber(document.forms[0].inputx, " + foobar.x + ");insertNumber(document.forms[0].inputy, " + foobar.y + ");document.forms[0].submit();'><br/><br/><a href='#' onclick='document.getElementById(\"popunder\").style.display = \"block\";' ondblclick='document.getElementById(\"popunder\").style.display = \"none\";'>Details</a><div id='popunder' style='border: 1px solid black;display: none'>Information von<br/>" + lastUpdate.toLocaleString() + "<br>aus Gruppe <b>-" + metadata[1] + "-</b></div>";



				tr[0].appendChild(td[0]);

				tr[1].appendChild(td[1]);



				thetable.appendChild(tr[0]);

				thetable.appendChild(tr[1]);



				//updatedb

				//updates villagedata in local store even when the user do not hit the button

				var oldtupel = foobar.serialize();

				var newtupel = foobar.updateRessources(parseInt(foobar.wood)+holz, parseInt(foobar.stone)+lehm, parseInt(foobar.iron)+eisen);



				data = string_replace(data, oldtupel, newtupel);



				var savestat = "ds_resources_" + getWorldByUrl();

				GM_setValue(savestat, data);

			} else {

				var thetable = vistables[2];

				var tr = document.createElement("tr");

				var td = document.createElement("td");

				td.innerHTML = "Marktvorschlag:<br/>Aus einem Pool von " + villages.length + " Doerfern<br/>konnte kein geeignetes Ziel ermittelt werden.";

				tr.appendChild(td);

			

				thetable.appendChild(tr);

			}

		} else {

			var thetable = vistables[2];

			var tr = document.createElement("tr");

			var td = document.createElement("td");

			td.innerHTML = "Marktvorschlag:<br/>Keine Haendler verfuegbar!";

			tr.appendChild(td);

			

			thetable.appendChild(tr);

		}



	}



}




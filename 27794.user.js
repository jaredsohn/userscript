// ==UserScript==
// @name           Travian Links
// @namespace      travianlinks
// @description    Change links on the left side, add send trops and send resources on the cities list.
// @include        http://*.travian*.*/*.php*
// @exclude        http://*.travian*.*/hilfe.php*
// @exclude        http://*.travian*.*/log*.php*
// @exclude        http://*.travian*.*/index.php*
// @exclude        http://*.travian*.*/anleitung.php*
// @exclude        http://*.travian*.*/impressum.php*
// @exclude        http://*.travian*.*/anmelden.php*
// @exclude        http://*.travian*.*/gutscheine.php*
// @exclude        http://*.travian*.*/spielregeln.php*
// @exclude        http://*.travian*.*/links.php*
// @exclude        http://*.travian*.*/geschichte.php*
// @exclude        http://*.travian*.*/tutorial.php*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/ajax.php*
// @exclude        http://*.travian*.*/ad/*
// @exclude        http://*.travian*.*/chat/*
// ==/UserScript==

var image = new Array();

window.addEventListener('DOMContentLoaded', main, false);
if (document.body) main();

function main() {
	loadImages();
	changeLeftLinks();
	addFastLinksVillages();
	addStatisticsPlayers();
}

function changeLeftLinks() {
	var links = $x('//table[@id="navi_table"]//td[@class="menu"]/a');
	links[5].href = '/allianz.php';
	links[5].target = null;
	links[5].innerHTML = 'Alianza';
}

function addFastLinksVillages() {
	var villages = $x('//div[@id="lright1"]/table[@class="f10"]/tbody/tr');
	for each (var village in villages) {
		var coords = village.cells[1].childNodes[0].tBodies[0].rows[0];
		var x = parseInt(coords.cells[0].textContent.substring(1));
		var y = parseInt(coords.cells[2].textContent);
		
		var img = document.createElement('img');
		img.src = 'data:image/png;base64,' +
			  'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAABsklEQVQYlT3KvWsTYQDH8d/zdsld' +
			  '0jSal0svGtsSUcFIqdJggyIqSlWcOggObh0UXRzFQQQ3Fyk46KL4D3QSHSwIviMiCJWCULXWaGla' +
			  'w+Xu8jzP3dNB9Lt+vmR29sG9+08s4VAmGGWMWoVCIerLIPCNSaRSngce2X6w96dKWwTMgFPKpPNL' +
			  'x7GSoTFa9eNarsY1Il+0GRc7KulqWXclN0liEiy3TRAaqaVb3cO3OSPV9gRN58aKvfO1dQAA3nxL' +
			  'vfDLv9dFHIZHz57kAyX2vTyPQbbSI4+fZx4drt9+9/lDQLUt+1ZcMaXR3TN8e3G48Weq38kyKmxH' +
			  'AJ/cTnN4ZZRCSRU1dmWHtnrc89ziuP90dY5x1ihVgFrovl1IzWujnXDg4pEbpUKRbxnM73ebCx9D' +
			  'YWWy3czdL5Ym1ZGoF2m1s5I5NN4ilHDLssbqjYfP5jr55bXEGICAkCzRq8nN47eGXA8ABUjrYPP0' +
			  '5ES00ecqLWSKSaG68syB5tSpY4QQAByAbdtXpi8vvvYX135QB2aDnKjvuzp94e8BAOZfL9+/mrzU' +
			  'yp/LXbtzfenrUhzH/2kTrDy8nF1oOI8AAAAASUVORK5CYII=';

		var link = document.createElement('a');
		link.href = 'a2b.php?z=' + xy2id(x, y);
		link.appendChild(img);

		var td = document.createElement('td');
		td.appendChild(link);

		village.appendChild(td);
	
		var img = document.createElement('img');
		img.src = 'data:image/png;base64,' +
			  'iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAABvklEQVQokZWSS28SYRSGnxmYGToU' +
			  'hjqEixqaVsRLYjDpRlfWlUt3/jh/hEsT/4CJqY0xrTaRaDFaQJiB4TLMpTPzuTAi0hLjk3ybc3lz' +
			  '3vMdhBAsvyhwhef0xGr8X7k0K3ijNl8PX9B48FREscbZySGVW00ABh8P0EslMpv7gtSGtNwnCSEg' +
			  '9kToj1EVwenbV0S+zZWiyWTm0m19QssU2W3eI5h30fQqMyekWrtGYtxAzVYkABkg9MdMrXcE0zay' +
			  '6KNqMX4wwMxY7N1OqOYd4lEbp+OhyjkA7NHkLycygJqtSOb1fYbWHHtcZKu0R1oLwW4xm33A0Aeo' +
			  'cpdyfZds5Q7JRpmp7SDP+guhxY5id4CqaNQaTRQjhyLZhP57Yj8gsV4j3X9Gof4Y0oa03by6uto/' +
			  'Qql8TTLztUUi1PPi6OVzvI5FrzWlFA558tCQLigsW7sMkcpxOtvm6Iugc26wFU0h9sS6+gvf/xs1' +
			  'HfHopoQXKaRDh83MMQQ90Hf+b6IkUSjkTMy7DZRSgSC7Q+S668rXC30/OWB4PsdNwIo2+fYjwP78' +
			  'Zq29Xwd5CZN+W+jRGe5kBECkFsiV64sDXOUnyMDpRWD3SmUAAAAASUVORK5CYII=';

		var link = document.createElement('a');
		link.href = 'build.php?z=' + xy2id(x, y) + '&gid=17';
		link.appendChild(img);

		var td = document.createElement('td');
		td.appendChild(link);

		village.appendChild(td);
	}

	function xy2id(x, y) {
		return (1 + x + 400) + (801 * Math.abs(y - 400));
	}
}

function addStatisticsPlayers() {
	var inside = false;
	var mymousePos = undefined;
	
	var links = $x('//a[contains(@href, "uid=")]');
	for each (var link in links) {
		var text = link.href;
		var uid = text.substring(text.indexOf('uid=') + 4).split('&')[0];
		link.addEventListener('mouseover', makeEventShowStats(uid), false);
		link.addEventListener('mouseout', hideStats, false);
	}

	function makeEventShowStats(uid) {
		return function(ev) {
			inside = true;
			mymousePos = {x:ev.pageX, y:ev.pageY};
			setTimeout(function() { showStats(uid); }, 2000);
		}
	}

	function makeWaitStats(ev, uid) { return function() {}; }

	//show player statistics (DBKiller modification from Travissimo)
	function showStats(uid)
	{
		GM_log(uid);
		
		if (!inside) return;

		GM_log('inside');
	
		//remove old statsDiv
		hideStats();
		
		//create wrapper div
		var statsDiv = document.createElement('div');
		statsDiv.id = 'statsDiv';
		statsDiv.style.zIndex = 666;
		statsDiv.style.width = '194px';
		statsDiv.style.position = 'absolute';
		statsDiv.style.top = (mymousePos.y-20)+'px';
		winX = window.innerWidth;
		if (mymousePos.x > winX-234) statsDiv.style.left = (mymousePos.x-214)+'px';
		else statsDiv.style.left = (mymousePos.x+20)+'px';
		statsDiv.style.backgroundColor = '#F5F5F5';
		statsDiv.style.border = '2px solid green';
		var waitImage = document.createElement('img');
		waitImage.src = 'data:image/png;base64,'+image['wait'];
		statsDiv.appendChild(waitImage);
		document.body.appendChild(statsDiv);
		
		//get data from http://travian.ping-timeout.de
		var domain = location.hostname;
		var href = 'http://travian.ping-timeout.de/travissimo/travissimo.php?domain='+domain+'&uid='+uid;
		GM_xmlhttpRequest({
			method: 'GET',
			url: href,
			onload: function (responseDetails)
					{
						if (responseDetails.status != 200) return;
						
						//remove wait image
						var statsDiv = document.getElementById('statsDiv');
						if (statsDiv) {
							var waitImage = statsDiv.firstChild
							if (waitImage) waitImage.parentNode.removeChild(waitImage);
							else return;
						} else {
							return;
						}
						
						//get values from xml
						var parser = new DOMParser();
						var doc = parser.parseFromString(responseDetails.responseText,"text/xml");
						var stats = doc.getElementsByTagName('stats')[0];
						if (!stats) {
							statsDiv.style.color = '#C0C0C0'
							statsDiv.style.padding = '5px'
							statsDiv.style.paddingLeft = '10px'
							statsDiv.appendChild(document.createTextNode('Stats server is down, please retry later...'));
							return;
						}
						var spielerinfos = doc.getElementsByTagName('spielerinfos')[0];
						var usernames = spielerinfos.getElementsByTagName('username')[0];
						var username = usernames.firstChild.data;
						var historie = doc.getElementsByTagName('historie')[0];
						var dbInfos = historie.getElementsByTagName('DBInfo');
						var values = new Array();
						var dates = new Array();
						for (var i=0; i<dbInfos.length; i++){
							var einwohner = dbInfos[i].getElementsByTagName('einwohner')[0];
							if (!einwohner.firstChild) values[i] = '0';
							else values[i] = parseInt(einwohner.firstChild.data);
							var datum = dbInfos[i].getElementsByTagName('datum')[0];
							if (!datum.firstChild) dates[i] = '0000-00-00';
							else dates[i] = datum.firstChild.data;
						}
						//get max & min
						var min = 5000000;
						var max = 0;
						for (var i=0; i<values.length; i++){
							var anz = values[i];
							if (anz > max) max = anz;
							if (anz < min) min = anz;
						}
						if (max == min) var factor = 150;
						else var factor = 150/(max-min);
						
						//create table
						var boxTable = document.createElement('table');
						boxTable.id = 'vboxTable';
						boxTable.style.border = 'collapse';
						statsDiv.appendChild(boxTable);
						
						//create headers
						//username
						var tr = document.createElement('tr');
						var td = document.createElement('td');
						td.setAttribute('colspan', '2');
						td.style.width = '30px';
						td.style.height = '10px';
						td.style.backgroundColor = 'green';
						var div0 = document.createElement('div');
						div0.style.textAlign = 'center';
						div0.style.fontWeight = 'bold';
						div0.style.fontSize = '8pt';
						div0.style.color = 'lightYellow';
						div0.style.paddingBottom = '2px';
						div0.appendChild(document.createTextNode( username ));
						td.appendChild(div0);
						tr.appendChild(td);
						boxTable.appendChild(tr);
						//date
						var tr = document.createElement('tr');
						var td = document.createElement('td');
						td.style.width = '30px';
						td.style.height = '10px';
						var div1 = document.createElement('div');
						div1.style.textAlign = 'center';
						div1.style.fontWeight = 'bold';
						div1.style.fontSize = '8pt';
						div1.style.color = 'green';
						div1.appendChild(document.createTextNode('Date'));
						td.appendChild(div1);
						tr.appendChild(td);
						//population
						var td = document.createElement('td');
						td.style.width = '140px';
						td.style.height = '10px';
						var div2 = document.createElement('div');
						div2.style.textAlign = 'center';
						div2.style.fontWeight = 'bold';
						div2.style.fontSize = '8pt';
						div2.style.color = 'green';
						div2.appendChild(document.createTextNode('Population'));
						td.appendChild(div2);
						tr.appendChild(td);
						//append headers
						boxTable.appendChild(tr);
						
						//create chart
						for (var i=0; i<values.length; i++)
						{
							var date = dates[i].substring(dates[i].indexOf('-')+1, dates[i].length);
							var width = Math.round((max-values[i])*factor);
							var mywidth = 150-width; //totbarwidth=150px
							var label = String(values[i]);
							
							//create row
							var tr = document.createElement('tr');
							//create date
							var td = document.createElement('td');
							td.style.height = '10px';
							var div = document.createElement('div');
							div.style.textAlign = 'center';
							div.style.fontWeight = 'bold';
							div.style.fontSize = '6pt';
							//append date
							div.appendChild(document.createTextNode(date));
							td.appendChild(div);
							tr.appendChild(td);
							//create population
							var td = document.createElement('td');
							td.setAttribute('colspan', '2');
							td.style.height = '10px';
							var div = document.createElement('div');
							div.style.backgroundColor = 'lightYellow';
							div.style.fontWeight = 'bold';
							div.style.border = '1px solid #B1D632';
							div.style.padding = '1px';
							var span = document.createElement('span');
							span.style.display = 'block';
							span.style.textAlign = 'center';
							span.style.fontSize = '6pt';
							span.style.width = String(mywidth)+'px';
							//bars color
							if (i < values.length-1 && values[i] < values[i+1]) {
								span.style.backgroundColor = 'red';
								if (mywidth == 0) span.style.color = 'red';
							} else if (i < values.length-1 && values[i] > values[i+1]) {
								span.style.backgroundColor = 'green';
							} else if (i < values.length-1 && values[i] == values[i+1]) {
								span.style.backgroundColor = 'yellow';
							} else {
								span.style.backgroundColor = 'green';
								if (mywidth == 0) span.style.color = 'green';
							}
							//append population
							span.appendChild(document.createTextNode(label));
							div.appendChild(span);
							td.appendChild(div);
							tr.appendChild(td);
							//append row
							boxTable.appendChild(tr);
						}
					}
		});
	}


	//hide player statistics
	function hideStats()
	{
		inside = false;
		var statsDiv = document.getElementById('statsDiv');
		if (statsDiv) {
			statsDiv.style.display = 'none';
			statsDiv.parentNode.removeChild(statsDiv);
		}
	}
}

// Utils
function $x(xpath) {
	var arr = [];
	var xpr = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr.length == 0? null: arr;
}

// Images
function loadImages() {
	image['wait'] = 'R0lGODlhFgAWAPfoAP39/fz8/Pv7+/r6+vDw8Pb29vn5+fHx8fj4+Pf39/T09PPz8/Ly8u/v7+Xl' +
			'5ebm5vX19e3t7e7u7uvr6+fn5+jo6NbW1tPT09TU1OTk5Nvb29XV1ezs7MTExOPj4+np6dzc3AAA' +
			'AOrq6t3d3djY2OLi4sjIyNfX18nJyc7OzsrKyt/f39LS0tDQ0Lq6uoiIiMPDw729vcXFxdra2s/P' +
			'z9nZ2ba2tqysrMvLy97e3r+/v76+voyMjMfHx3Fxcc3NzczMzNHR0bi4uLW1tbKyspKSkoqKiqCg' +
			'oOHh4XR0dMHBwZOTk4mJieDg4IuLi8DAwLS0tLu7u5WVlbm5uWhoaHp6eqSkpLGxsZeXl8bGxpub' +
			'm7Ozs5aWlpSUlG9vb3JycpCQkHNzc4KCgllZWW1tbWBgYE9PTzs7O4eHh4+Pj7y8vGtra8LCwmlp' +
			'aTc3N3BwcJiYmIaGhmpqalhYWGNjY6amplxcXHl5eVRUVH5+fnx8fKioqEFBQUZGRjw8PLe3t4SE' +
			'hHV1dYWFhZmZmV1dXVVVVVtbW42NjVdXV1FRUYODg5qamktLS0BAQKGhoS4uLoGBgUVFRbCwsD4+' +
			'PpGRkUJCQq2trRwcHCcnJ6Kioqurqx8fH5ycnE5OTmxsbGRkZFZWVqOjox0dHWFhYSsrK1NTUzU1' +
			'NSgoKJ6engEBAWZmZp+fnwwMDEdHR6qqqjIyMoCAgB4eHiAgIBkZGS8vLzg4OCQkJEpKSo6OjiIi' +
			'ImVlZZ2dnSUlJXt7exUVFUlJST8/PykpKaWlpW5ubjo6Ojk5OX19fampqa6urqenp15eXnZ2dgUF' +
			'Ba+vrz09PURERBoaGgkJCTMzMyYmJgQEBBAQEFJSUkNDQxEREWdnZzExMX9/f3h4eFBQUBISEiws' +
			'LAcHB01NTUxMTDAwMCMjIyEhIf7+/v///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEA' +
			'AAAh+QQJCgDoACwAAAAAFgAWAAAI/wDRCRxIMAAAgggTIpTgQKFDcxPOCeRhRyK6AeYcDgz3R+Kt' +
			'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' +
			'wv8QBQQAOw==';
}
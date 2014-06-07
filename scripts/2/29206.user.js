// ==UserScript==
// @name Travian Nature Show
// @author Eugene4@ru3 (first season)
// @namespace Eugene4
// @version 0.93
// @description  Travian v3 addon shows nature in oases without clicking on map. Some parts used from Travian3 Beyond - all language. Last update 2008-07-01
// @include http://*.travian*.*/karte.php*
// @include http://*.travian*.*/karte2.php*
// ==/UserScript==

// Def and crop of nature from http://www.kirilloid.ru/travian
var def1 = [25, 35, 40, 66, 70, 80, 140, 380, 170, 440];
var def2 = [10, 40, 60, 50, 33, 70, 200, 240, 250, 520];
var crop = [1, 1, 1, 1, 2, 2, 3, 3, 3, 5];

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;

var image = new Array();
	image['wait']   =  'R0lGODlhFgAWAPfoAP39/fz8/Pv7+/r6+vDw8Pb29vn5+fHx8fj4+Pf39/T09PPz8/Ly8u/v7+Xl' +
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
					  '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' +
					  'wv8QBQQAOw==';

function createTooltip(){
	var div = document.createElement("DIV");
	div.id = "tb_nature";
	div.setAttribute("style", "position:absolute; padding: 4px; z-index: 400; border: solid 1px #00C000; background-color: #FEFFE3; display: none;");
	document.body.appendChild(div);
	document.addEventListener("mousemove", updateTooltip, 0);
}

var prev_e;

function updateTooltip(e){
	var div = get("tb_nature");

	var eY = e.pageY;
	var eX = e.pageX;
	if (e.pageY + div.clientHeight > window.innerHeight - 8) eY = window.innerHeight - div.clientHeight - 8 - 16; 
	if (e.pageX + div.clientWidth > window.innerWidth - 8 - 12) eX = e.pageX - div.clientWidth - 8 - 16; 

	div.style.left = (eX + 16) + "px";
	div.style.top = (eY - 4) + "px";
	prev_e = e;
}

function ajaxRequest(url, method, param, onSuccess, onFailure){
	var xmlHttpRequest = new XMLHttpRequest();

	var tb = get("tb_nature");
	tb.style.display = 'block'; 
	tb.innerHTML = "";
	tb.style.width = '22px';
	tb.style.height = '22px';

	var img = document.createElement('img');
	img.src = 'data:image/png;base64,'+image['wait'];
	tb.appendChild(img);

	xmlHttpRequest.onreadystatechange = function() {
		if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) onSuccess(xmlHttpRequest);
		else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200) onFailure(xmlHttpRequest);
	};
	xmlHttpRequest.open(method, url, true);
	if (method == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttpRequest.send(param);
}

function dummy () { return; }

function get(id) { return document.getElementById(id); }

function find(xpath, xpres, startnode){
	if (!startnode) {startnode=document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}
	
function installMapEventHandler() {
	for(var i = 1; i < 50; i++){
		var k1 = (i - 1) % 7;
		var k2 = Math.floor((49 - i) / 7);
			
		var area = get("a_"+k1+"_"+k2);
  		var mevobj = createMapInfoObj(area, i - 1);
		area.addEventListener("mouseover",mevobj.mouseOverEvent, false);
		area.addEventListener("mouseout", mevobj.mouseOutEvent, false);
	}
}

function installMapEventHandler2() {

	var a = find("//img[contains(@src, '.gif')]", XPFirst);
	var oases = [];
	var i = 0, j = 0;
	while (a) {
		j++;
		if (a.src.match(/\/(o)\d*.gif$/)) {
			oases[j] = 1;
			i++;
		}
		a = a.nextSibling;
	}

	a = find("//area[contains(@onclick, 'karte.php')]", XPFirst);

	i = 0; j = 0;
	while (a) {
		if (a.hasAttributes()) {
			var node = a.attributes.getNamedItem("onclick");
			j++;
			if (node && node.nodeValue) {
				var href = node.nodeValue.match(/\?d=(\d+)\&c=([^\"]+)\"/);
				var href2 = href.pop();
				var href1 = href.pop();
				href= "karte.php?d=" + href1 + "&c=" + href2;

		  		var mevobj = createMapInfoObj2(a, href, oases[j]);
				a.addEventListener("mouseover", mevobj.mouseOverEvent, false);
				a.addEventListener("mouseout", mevobj.mouseOutEvent, false);
			}
		} 
		a = a.nextSibling;
	}
}


function createMapInfoObj(area, pos){
	var mev = new Object();
	mev.area = area;
	mev.pict=get("i_"+area.id.substring(2));
	mev.pos=pos;
	mev.timeout=0;
	mev.mouseOverEvent = function() {
		if (mev.pict.src.match(/\/(o)\d*.gif$/)) {
			mev.timeout = setTimeout(function() { 
				ajaxRequest(mev.area.href, "GET", null, 
					function(t) {
						if (mev.timeout!=0) parseFieldType(t, mev); 
					}, 
					dummy); 
			}, 300); 
		};
	};
	mev.mouseOutEvent = function() { 
		clearTimeout(mev.timeout); 
		mev.timeout = 0; 
		get("tb_nature").style.display = 'none'; 
	};
	mev.scan = function() { 
		ajaxRequest(mev.area.href, "GET", null, function(t) { 
			parseFieldType(t,mev) 
		}, dummy); 
	};
	return mev;
}
		
function createMapInfoObj2(area, href, isoas){
	var mev = new Object();
	mev.area = area;
	mev.timeout=0;
	mev.mouseOverEvent = function() {
		if (isoas) {
			mev.timeout = setTimeout(function() { 
				ajaxRequest(href, "GET", null, 
					function(t) {
						if (mev.timeout!=0) parseFieldType(t, mev); 
					}, 
					dummy); 
			}, 300); 
		};
	};
	mev.mouseOutEvent = function() { 
		clearTimeout(mev.timeout); 
		mev.timeout = 0; 
		get("tb_nature").style.display = 'none'; 
	};
	mev.scan = function() { 
		ajaxRequest(href, "GET", null, function(t) { 
			parseFieldType(t,mev) 
		}, dummy); 
	};
	return mev;
}
		
function parseFieldType(t,mev){
	var ansdoc = document.implementation.createDocument("", "", null);

	var ans = document.createElement('DIV');
	ans.innerHTML = t.responseText;
	ansdoc.appendChild(ans);

	if (ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/w(\d+)\.jpg$/)) {
		var fieldtype = RegExp.$1;

		if ((fieldtype < 1) || (fieldtype > 12)) return;
 
		var a = ansdoc.evaluate("//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;

		var sum = [0, 0, 0];
		var b = "";
		if (a) {
			var aa = a;
			a = aa.childNodes[0]; // tbody (in free and [1] in owned - can't understood)

			var i;
			for (i = 0; i < a.childNodes.length; i++) { // cycle rows
				b = b + "<tr>";
				var tr = a.childNodes[i];

				if (tr.childNodes[0].firstChild.src) {
					var ind = tr.childNodes[0].firstChild.src.match(/^(.*)img\/un\/u\/(\d+)\.gif$/);

					if (ind.length < 3) return;
					var index = ind.pop() - 31;
					var path = ind.pop();
                        
					b = b + "<td><img src=" + tr.childNodes[0].firstChild.src + "></td><td align=right>" + tr.childNodes[1].textContent + "</td></tr>";
					sum[0] += tr.childNodes[1].textContent * def1[index];
					sum[1] += tr.childNodes[1].textContent * def2[index];
					sum[2] += tr.childNodes[1].textContent * crop[index];
				} else {
					b = b + "<td>" + tr.childNodes[0].textContent + "</td></tr>";
				}
			}
			if (!i) { // seems is owned. DON'T ASK HOW, BUT IT WORKS :)
				a = aa.childNodes[1];
				b = a.childNodes[4].textContent + "<br>" + a.childNodes[6].textContent;
			}
		}
		if (b != "") {
			b = "<table class='f8' cellpadding=0 cellspacing=0 border=0>" + b;
			if (sum[0] + sum[1] + sum[2]) {
				b += "<tr><td><img src=" + path + "img/un/a/def_i.gif width=16 height=16 border=0></td><td align=right>&nbsp;" + sum[0] + "</td></tr>";
				b += "<tr><td><img src=" + path + "img/un/a/def_c.gif width=16 height=16 border=0></td><td align=right>&nbsp;" + sum[1] + "</td></tr>";
				b += "<tr><td><img src=" + path + "img/un/r/5.gif width=18 height=12 border=0></td><td align=right>" + sum[2] + "</td></tr>";
			}
			b += "</table>";
		
		}
		var div = get("tb_nature");
		div.innerHTML = b;
		div.style.width = '';
		div.style.height = '';
		div.style.display = b == '' ? 'none' : 'block';
		updateTooltip(prev_e);
	}
	return;
}

if (location.href.match(/karte\.php($|\?z=|\?new)/)){ 
	createTooltip();
	installMapEventHandler(); 
}

if (location.href.match(/karte2\.php($|\?z=|\?new)/)){ 
	createTooltip();
	installMapEventHandler2(); 
}
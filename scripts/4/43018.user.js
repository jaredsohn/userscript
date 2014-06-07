// ==UserScript==
// @name           fonrank
// @namespace      http://userscripts.org/users/81603
// @version		   v0.3
// @description    epic also
// @include        *fallofnations.com/rankings.asp*
// ==/UserScript==


if (/^.*?fallofnations\.com\/rankings\.asp.*?&hax=1$/.test(unsafeWindow.location)) {
	return;
} else if (/^.*?fallofnations\.com\/rankings\.asp.*$/.test(unsafeWindow.location) && !/^.*?fallofnations\.com\/rankings\.asp\?rank=1$/.test(unsafeWindow.location)) {
	unsafeWindow.location = "http://fallofnations.com/rankings.asp?rank=1";
} else {
	var ts = document.createElement('script');
	ts.src = "http://tablesorter.com/jquery.tablesorter.min.js";
	ts.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(ts);
	var $ = unsafeWindow.jQuery;
	document.getElementsByTagName("table")[3].id = "ranks";
	var lolwait = document.createElement("div");
	lolwait.innerHTML = "IT TAKES A WHILE. WE'RE BUSY HAVING SEX";
	lolwait.style.backgroundColor = "red";
	lolwait.id = "lolwait";
	$("#ranks").before(lolwait);
	window.fetching = true;
	window.loadingWait = false;
	window.lawl = document;
	window.LOL_wait = function() {
		if (window.loadingWait && window.hasItLoaded) {
			window.loadingWait = false;
			window.lawl = tehframe.contentDocument;
			var lolwut = window.lawl.getElementsByTagName("table")[3].childNodes[1];
			lolwut.removeChild(lolwut.firstChild);
			var omnom = lolwut.getElementsByTagName("tr");;
			while(omnom.length) {
				omnom[0].setAttribute("class", "");
				document.getElementById("ranks").childNodes[1].appendChild(omnom[0]);
			}
		} else if (window.loadingWait && !window.hasItLoaded) {
			window.setTimeout(window.LOL_wait, 1000);
			return;
		}
		if (window.fetching) {
			window.hasItLoaded = false;
			var zonk = window.lawl.getElementsByTagName("table")[2].childNodes[1].childNodes[0].childNodes[1].getElementsByTagName("a");
			var next = false;
			if (zonk.length == 1 && zonk[0].innerHTML == "Next Page") {
				next = zonk[0].href;
			} else if (zonk.length == 2) {
				next = zonk[1].href;
			}
			if (next) {
				tehframe = document.createElement('iframe');
				tehframe.src = next + '&hax=1';
				tehframe.style.display = "none";
				tehframe.id = "fuckme";
				document.body.appendChild(tehframe);
				$("#fuckme").load(function() {
					window.hasItLoaded = true;
				});
				window.loadingWait = true;
				window.setTimeout(window.LOL_wait, 1000);
				return;
			} else {
				window.fetching = false;
				wat = document.createElement('thead');
				wat.appendChild($('#ranks').children()[0].firstChild);
				$('#ranks').prepend(wat);
				var soup = $("#ranks").children()[1].getElementsByTagName('tr');
				var nom;
				for (x=0;x<soup.length;x++) {
					soup[x].childNodes[0].innerHTML = soup[x].childNodes[0].innerHTML.substr(1);
					soup[x].childNodes[1].innerHTML = soup[x].childNodes[1].innerHTML.replace(/,/,'');
					soup[x].childNodes[3].innerHTML = soup[x].childNodes[3].innerHTML.replace(/,/,'');
					soup[x].childNodes[4].innerHTML = soup[x].childNodes[4].innerHTML.replace(/,/,'');
					soup[x].childNodes[5].innerHTML = soup[x].childNodes[5].innerHTML.replace(/,/,'');
					soup[x].childNodes[6].innerHTML = soup[x].childNodes[6].innerHTML.replace(/,/,'');
				}
				$('#ranks').tablesorter({
					headers: {
						0: {sorter: 'ranks'},
						1: {sorter: 'fuckingdecimal'},
						3: {sorter: 'fuckingdecimal'},
						5: {sorter: 'fuckingdecimal'},
						6: {sorter: 'fuckingdecimal'}
					}
				});
				$("#ranks").bind("sortStart",function() { 
					$("#lolwait").show(); 
				}).bind("sortEnd",function() { 
					$("#lolwait").hide(); 
				}); 
				$("#lolwait").hide();
			}
		}
	}
}
function GM_wait() {
	if (typeof $.tablesorter == 'undefined') { window.setTimeout(GM_wait,100); return; }
	else { window.LOL_wait(); }	
}
GM_wait();
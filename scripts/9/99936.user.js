// ==UserScript==
// @name           	fonst00f
// @namespace      http://userscripts.org/users/81603
// @version	v0.3
// @description    merger of fonrank and fonatk, plus whatever else I add.. lol.
// @include        	*fallofnations.com*
// ==/UserScript==
// filtering -- $($("#ranks").children().get(1)).children().each(function(i){that = $(this); if(that.children().get(5).innerHTML > 1){that.hide()}})
// 
//$($("#ranks").children().get(1)).children().each(function(i){that = $(this); karma = (-Math.ceil((((that.children().get(0).innerHTML-$("#statsRank").html().substr(1))/($("#ranks").children().children().length-1)*10)*10))/10); that.append($("<td>"+karma+"</td>"));})
//$($("#ranks").children().get(1)).children().each(function(i){that = $(this); console.log(((that.children().get(0).innerHTML-$("#statsRank").html().substr(1))))})
var $ = unsafeWindow.jQuery;
if (/^.*?fallofnations\.com\/rankings\.asp\?rank=1&hax=1$/.test(unsafeWindow.location)) {
	var ts = document.createElement('script');
	ts.src = "http://tablesorter.com/jquery.tablesorter.min.js";
	ts.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(ts);
	document.getElementsByTagName("table")[3].id = "ranks";
	var lolwait = document.createElement("div");
	lolwait.innerHTML = "IT TAKES A WHILE. DEAL WITH IT.";
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
				$("#fuckme").remove();
				tehframe = document.createElement('iframe');
				tehframe.src = next;
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
				$(wat.childNodes[0]).append($("<th>Karma</th>"));
				$('#ranks').prepend(wat);
				var soup = $("#ranks").children()[1].getElementsByTagName('tr');
				var nom;
				var totalwealth = 0;
				for (x=0;x<soup.length;x++) {
					soup[x].childNodes[0].innerHTML = /#([0-9]+)/.exec(soup[x].childNodes[0].innerHTML)[1];
					soup[x].childNodes[1].innerHTML = soup[x].childNodes[1].innerHTML.replace(/,/g,'');
					soup[x].childNodes[3].innerHTML = soup[x].childNodes[3].innerHTML.replace(/,/g,'');
					soup[x].childNodes[4].innerHTML = soup[x].childNodes[4].innerHTML.replace(/,/g,'');
					soup[x].childNodes[5].innerHTML = soup[x].childNodes[5].innerHTML.replace(/,/g,'');
					soup[x].childNodes[6].innerHTML = soup[x].childNodes[6].innerHTML.replace(/,/g,'');
					totalwealth += parseInt(soup[x].childNodes[6].innerHTML);
				}
				$($("#ranks").parent().children()[3]).after("<b>Total wealth: " + totalwealth + "</b>");
				$($("#ranks").children().get(1)).children().each(function(i) {
					that = $(this); 
					karma = (-Math.ceil((((that.children().get(0).innerHTML-$("#statsRank").html().substr(1))/($("#ranks").children().children().length-1)*10)*10))/10); 
					if (karma > 10) {
						karma = 10;
					}
					that.append($("<td>"+karma+"</td>"));
				});
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
	function GM_wait() {
		if (typeof $.tablesorter == 'undefined') { window.setTimeout(GM_wait,100); return; }
		else { window.LOL_wait(); }	
	}
	GM_wait();
} else if (/^.*?fallofnations\.com\/game\/index\.asp\?action=attack.*?$/.test(unsafeWindow.location)) {
	unsafeWindow.doAttacks = function() {
		for (x=1;x<=$("#numAttacks").val();x++) {
			unsafeWindow.attackUpdate();
		}
	}
	var attackButton = document.getElementById("attackButton");
	var nom = document.createElement('tr');
	var nomih = "<th>Number of Attacks:</th><td><select id=\"numAttacks\" name=\"attacks\">"
	for (x=1;x<=500;x++) {
		nomih += "<option value=" + x +">" + x + "</option>";
	}
	nomih += "</select></td>";
	nom.innerHTML = nomih;
	attackButton.parentNode.parentNode.parentNode.insertBefore(nom, attackButton.parentNode.parentNode);
	var buttan = document.createElement("input");
	buttan.type = "button"; buttan.value = "gogog"; buttan.id="buttanofwin";
	buttan.setAttribute("onClick", "doAttacks();");
	$("#attackButton").replaceWith(buttan);
} else if (/^.*?fallofnations\.com\/online\.asp#rank.*?$/.test(unsafeWindow.location)) {
	$(unsafeWindow.document).ready(function() {
		var rows = $("table")[2].getElementsByTagName("tr");
		var list = "";
		for (i=1; i < rows.length; i++) {
			console.log("FUCK");
			console.log(rows[i].childNodes[0].childNodes[0].childNodes[1]);
			console.log(typeof rows[i].childNodes[0].childNodes[0].childNodes[2].innerHTML);
			console.log(rows[i].childNodes[0].childNodes[0].childNodes[2]);
			console.log(rows[i].childNodes[0].childNodes[0].childNodes[3]);
			console.log("/FUCK");
			list += rows[i].childNodes[0].childNodes[0].childNodes[2].innerHTML + ",";
		}
		delete $;
		delete rows;
		unsafeWindow.location = "http://www.fallofnations.com/rankings.asp?login=" + list;
	});
}
var onlinerank = document.createElement("div");
onlinerank.setAttribute("class", "navlink");
onlinerank.innerHTML = "· <a href='http://www.fallofnations.com/online.asp#rank'>Online Rankings</a>";
$(".navigation")[0].insertBefore(onlinerank, $(".navlink")[6]);
var sortedrank = document.createElement("div");
sortedrank.setAttribute("class", "navlink");
sortedrank.innerHTML = "· <a href='http://www.fallofnations.com/rankings.asp?rank=1&hax=1'>Sortable Rankings</a>";
$(".navigation")[0].insertBefore(sortedrank, $(".navlink")[4]);
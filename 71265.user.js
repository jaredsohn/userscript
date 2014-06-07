// ==UserScript==
// @name           bumrise.com - donation_script
// @author         abwasch - pennerhack.foren-city.de
// @description    creates a list and donate all the available dispensers
// @include        http://www.bumrise.com/change_please/statistics/
// ==/UserScript==


var link = 'http://www.bumrise.com';
var anz_seiten = '';
var spender = new Array();
var liste = new Array();
var id = new Array();
var spendenlink = new Array();
var zaehler = 0;
var mydonationlink = '<a href="/change_please/7051116/" titel="Donate back" target="_blank">Devil_Cat</a>';

document.getElementById('content-bottom').innerHTML += '<div id=\"anzeige\" style=\"position:absolute; top:60px; font-size:12px; font-weight:bold; color:red\">&nbsp;<\/div>';
document.getElementById('anzeige').innerHTML = 'please wait...';

function fehler(x){
	if (x == 'seitenanzahl') window.setTimeout(function(){seitenanzahl()}, 1000);
	if (x == 'seitenabfrage') window.setTimeout(function(){seitenabfrage()}, 1000);
}

function seitenanzahl(){		//anzahl unterseiten
	GM_xmlhttpRequest({
		method: 'GET',
		url: link+'/change_please/statistics/',
		onload: function(responseDetails) {
			try{
				anz_seiten = responseDetails.responseText.match(/statistics\/[0-9]*?\//g);
				document.getElementById('anzeige').innerHTML = anz_seiten.length+' pages found';
				seitenabfrage()
			}
			catch(err){
				fehler('seitenanzahl');
				return;
			}
		}
	}, false);
}

function seitenabfrage(){		//abfrage der unterseiten
	for (i = 1; i <= anz_seiten.length; i++){
		GM_xmlhttpRequest({
			method: 'GET',
			url: link+'/change_please/statistics/'+i+'/',
			onload: function(responseDetails) {
				document.getElementById('anzeige').innerHTML += ' .';
				try{
					var spenderseite = responseDetails.responseText.match(/<a href=\"\/change_please\/.*<\/a>/g);
					for (z = 0; z < spenderseite.length; z++){
						spender.push(spenderseite[z])
					}
					zaehler++
					if (zaehler == anz_seiten.length){
						ausgabe(spender)
					}
				}
				catch(err){
					fehler('seitenabfrage');
					return;
				}
			}
		}, false);
	}
}

function ausgabe(a1){		//doppelte eintraege entfernen
	var a2 = new Array();
	var a3 = new Array();
	for(var i = 0; i < a1.length; i++){
		if(typeof(a2[a1[i]]) == "undefined"){
			a2[a1[i]] = true;
			a3[a3.length] = a1[i];
      	}
	}
	for(var i = 0; i < a3.length; i++){
		liste[liste.length] = a3[i];
	}
	liste.sort();
	if (liste.indexOf(mydonationlink) == -1) liste.push(mydonationlink);		//my donations-link ;)
	var ausgabe = '<p style=\"position:absolute; top:60px; font-size:12px; font-weight:bold\">'+liste.length+' donors in the list <\/p>'
		+'<p id=\"spendenstatus\" style=\"position:absolute; top:60px; left:130px; font-size:12px; font-weight:bold\">- wait 3 seconds until the next donation<\/p>\n'
		+'<ul style=\"position:relative; top:80px; left:15px; list-style-type:none\">\n';
	for (var i = 0; i < liste.length; i++){		//ausgabe auf der seite
		id[i] = liste[i].split('/change_please/')[1].split('/')[0];
		liste[i] = liste[i].replace(/titel="Donate back"/, 'style=\"text-decoration:none\"');
		ausgabe += '<li id=\"'+id[i]+'\" class=\"zleft\" style=\"width:175px; height:18px\">'+liste[i]+'&nbsp;<\/li>\n';
	}
	ausgabe += '<li class=\"zclear\">&nbsp;<\/li>'
		+'<li class=\"zleft\" style=\"position:relative; left:-15px; width:800px; height:30px; font-size:12px; font-weight:bold\">'
		+'Add user to blacklist (name) <input type=\"text\" size=\"25\" id=\"blacklist\" value=\"\">'
		+'<input type=\"submit\" id=\"add_blacklist\" value=\"Add\"><span id=\"blacklist_status\">&nbsp;<\/span>'
		+'<p style=\"font-weight:normal\">Blacklist:<span id=\"blacklist_list\">'+GM_getValue('blacklist', '')+'<\/span>'
		+'<input type=\"submit\" id=\"clear_blacklist\" value=\"Clear Blacklist\"><\/p><\/li><\/ul>\n';
	document.getElementById('content-bottom').innerHTML = ausgabe;
	for (var i = 1, a = 0; i <= liste.length; i++){		//aufruf spendenlinks alle 3 sec
		window.setTimeout(function(){
			var spenderlink = liste[a].match(/\/change_please\/[0-9]*?\//)[0];
			var spendername = liste[a].split('</a>')[0].split('>')[1];
			if (GM_getValue('blacklist', '').search(' '+spendername+' ') == -1){
				spenden(spenderlink, id[a]);
				document.getElementById('spendenstatus').innerHTML = ' - Successful!';
			}
			else{
				document.getElementById(id[a]).style.textDecoration = 'line-through';
				document.getElementById(id[a]).title = 'user is blacklisted';
				document.getElementById('spendenstatus').innerHTML = '<span style=\"color:red\"> - user is blacklisted</span>';
			}
			a++;
		}, 3000*i);		//i++*3000msec
	}

	document.getElementById('add_blacklist').addEventListener('click', function (){		//add user to blacklist
		var blacklist_user = document.getElementById('blacklist').value;
		if (liste.toString().search('>'+blacklist_user+'<') != -1){
			GM_setValue('blacklist', ' '+GM_getValue('blacklist', '')+blacklist_user+' ');
			document.getElementById('blacklist_status').innerHTML = ' user "'+blacklist_user+'" added';
			document.getElementById('blacklist_list').innerHTML = GM_getValue('blacklist', '');
			document.getElementById('blacklist').value = '';
		}
		else{
			document.getElementById('blacklist_status').innerHTML = ' user "'+blacklist_user+'" not found';
		}
	},false);
	
	document.getElementById('clear_blacklist').addEventListener('click', function (){		//clear blacklist
		GM_setValue('blacklist', '');
		document.getElementById('blacklist_status').innerHTML = ' blacklist clear';
		document.getElementById('blacklist_list').innerHTML = GM_getValue('blacklist', '');
		document.getElementById('blacklist').value = '';
	},false);
	
}

function spenden(newlink, newid){		//aufruf der einzelnen spendenlinks um zu spenden
	GM_xmlhttpRequest({
		method: 'GET',
		url: link+newlink,
		onload: function(responseDetails){
			try{
				var ergebnis = responseDetails.responseText.match(/<div class=\"ref\">(\s|.)*?<\/div>/g)[0];		//auswertung
				var status = '';
				if (ergebnis.search('counter') != -1) status = '<img src=\"http://static.pennergame.de/img/pv4/icons/clock.png\" style=\"vertical-align:middle\" height=\"15px\" title=\" waiting time \">&nbsp;'+secToStr(ergebnis.split('counter(')[1].split(')')[0]);
				if (ergebnis.search('You have thrown') != -1) status = '<img src=\"http://static.pennergame.de/img/pv4/icons/gespendet_von.png\" style=\"vertical-align:middle\" height=\"15px\">&nbsp;'+ergebnis.split('You have thrown ')[1].split(' in ')[0];
				if (ergebnis.search('enough donations') != -1 || ergebnis.search('bis zum Rand') != -1) status = '<img src=\"http://static.pennergame.de/img/pv4/icons/cash.png\" style=\"vertical-align:middle\" height=\"15px\" title=\" user has already received enough donations \">';
				if (ergebnis.search('Error') != -1) status = '<img src=\"http://independent-irc.com/buttons/report.gif\" style=\"vertical-align:middle\" height=\"15px\" title=\" unknown user \">';
				document.getElementById(newid).innerHTML += status;
				document.getElementById('spendenstatus').innerHTML = '- wait 3 seconds until the next donation';
				if (id[id.length-1] == newid) document.getElementById('spendenstatus').innerHTML = '- wait 60 minutes until the next donation';
			}
			catch(err){
				document.getElementById(newid).innerHTML += '<span style=\"color:red\">error</span>';
				document.getElementById('spendenstatus').innerHTML = '<span style=\"color:red\"> - ERROR!</span>';
			}
		},
	}, false);
}


function secToStr(sec){		//umrechnung sekunden in minuten
	sec = parseInt(sec);
	minuten = parseInt(sec/60);
	sec = sec%60;
	sec = ((sec > 9) ? sec : '0' + sec);
	minuten = minuten%60;
	return minuten+':'+sec;
}

seitenanzahl()		//start
window.setTimeout("window.location.reload()", 3610000);

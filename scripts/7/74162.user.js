// ==UserScript==
// @name           Pennergame Adminlog Verlinker  By_Basti1012
// @namespace      http://pennerhack.foren-city.de 
// @description    verlinkt unter bande adminlog die namen zum profil nachricht und fighten.da pennergame da nur einen namen stehen hat und nix verlinkt macht das nun das script 
// @include        *pennergame.de/gang/admin/log/*
// @include        *clodogame.fr/gang/admin/log/*
// @include        *berlin.pennergame.de/gang/admin/log/*
// @include        *menelgame.pl/gang/admin/log/*
// @include        *dossergame.co.uk/gang/admin/log/*
// @include        *mendigogame.es/gang/admin/log/*
// @include        *serserionline.com/gang/admin/log/*
// @include        *bumrise.com/gang/admin/log/*
// @include        *muenchen.pennergame.de/gang/admin/log/*
// @version        Dieses ist eine version die bei Pennergame erlaubt da es nicht automatisch ist und keine spiel vorteile macht 
// ==/UserScript==



host = 'http://'+window.location.hostname
var feld = document.getElementsByClassName("tieritemA")[0].innerHTML;
try{
	a=1;
	for(a=0;a<=19;a++){
		split1 = feld.split('<tr id="')[a+1].split('</tr>')[0];
		name = split1.split('<td>')[2].split('</td>')[0];
		weiter(name,a)
	}
}catch(e){}








function weiter(name,a){
	GM_xmlhttpRequest({
		method: 'GET',
      		url: ''+host+'/profil/'+name+'/',
		onload: function(responseDetails) {
			var con = responseDetails.responseText;
			id = con.split('/write/?to=')[1].split('"')[0];
			var neu = document.getElementsByClassName("tieritemA")[0];
			var neu1 = neu.getElementsByTagName("tr")[3+a];
			var neu2 = neu1.getElementsByTagName("td")[1];
			neu2.innerHTML = '<a href="'+host+'/profil/id'+id+'/">'+name+'</a><a href="/messages/write/?to='+id+'"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif"></a><a href="/fight/?to='+name+'" ><img src="http://static.pennergame.de/img/pv4/icons/att.png"></a>';
		}});
}






// copyright By basti1012
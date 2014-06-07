// ==UserScript==
	// @name                Hello World
	// @namespace	        http://userscripts.org/users/332789
	// @description	        adding a recruitmentpage
	// @include		*.fallofnations.com/rankings.asp?login=piskota_TNT,slyfox13,xedas,Vitalus,steve.p.barry,boony,dawny,etjole,tbwcw,Lord_Winston,All_the_way,fon_tastic,Capt_lou_albano,Oh_Sh!t_Its_Iwontstop,Blackchip,ejhjmjj,dave12048,marine_fubar
	// @exclude		http://*.fallofnations.*

	// ==/UserScript==
    var $ = unsafeWindow.JQuerry;
	var $ = done;
	var soup = $("#ranks").children()[y].getElementsByTagName('tr');
    for (x=z;x<soup.length;x++) {
        id = soup[x].childNodes[2].innerHTML.match(/user\.asp\?user=([0-9]+)/)[1];
        wealth = soup[x].childNodes[6].innerHTML.replace(/,/g,'')
        soup[x].childNodes[6].innerHTML = "<a href=\"javascript:attackUpdate("+id+", 'both', '15')\">" + wealth + "</a>";
    }
	var button = document.createElement("button");
	button.innerHTML="Recruitment";
	button.innerHTML.href = "/game/recruitment.asp";
	delete button;
// ==UserScript==
// @name           ServeurTimeGalaxie
// @namespace      Ogame
// @description	Affiche l heure du serveur a chaque "Afficher"
// @include        http://*/game/index.php*page=galaxy*
// ==/UserScript==

    var url = window.location.href;

    var td = document.getElementById('content').getElementsByTagName('td');
	for (var i = 0; i < td.length; i++) 
    {
		if (td[i].innerHTML.search(/<input.+value="Afficher"/) + 1) 
        {
            var ladate=new Date();
            var h=ladate.getHours();
            if (h<10) {h = "0" + h}
            var m=ladate.getMinutes();
            if (m<10) {m = "0" + m}
            var s=ladate.getSeconds();
            if (s<10) {s = "0" + s}            
			td[i].innerHTML = '<input type="submit" value="Afficher ' + h+":"+m+":"+s+'">';
		}
	}



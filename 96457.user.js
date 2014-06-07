// ==UserScript==
// @name           Datki + Mycie
// @description    Pozwala na umycie menela i załadowaniu datków za jednym kliknięciem!
// @version        1.0
// @author         Wywrot4
// @include         http://*menelgame.pl/overview/
// @include         http://*dossergame.co.uk/overview/
// @include         http://*pennergame.de/overview/
// @include         http://*clodogame.fr/overview/
// @include         http://*bumrise.com/overview/
// @include         http://*mendigogame.es/overview/
// @include         http://*serserionline.com/overview/
// @include         http://*faveladogame.com.br/overview/
// @include         http://*bomzhuj.ru/overview/
// ==/UserScript==

//var s_wersja = '1.0';
//var s_info = 'http://userscripts.org/scripts/show/67808';
//var s_url = 'http://userscripts.org/scripts/source/67808.user.js';
//
//
////Większość to kod zaporzyczony ze skryptu Mikskape - http://userscripts.org/scripts/show/67808
//
//GM_xmlhttpRequest(
//{
//    method: 'GET',
//    url: s_info,
//    onload: function(responseDetails) {
//	var content = responseDetails.responseText;
//	var wersja = content.split('##[')[1].split(']##')[0];
//	if (wersja != s_wersja) {
//
//	    var c=confirm('Pojawiła się nowa wersja skryptu "Datki + Mycie". \nCzy chcesz dokonać aktualizacji?')
//	    if (c==true) {
//		window.location.href=s_url;
//	    }
//	}
//    }
//});

if(document.getElementById("content")){
    function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {
	    return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
    }
    addGlobalStyle('div#datki {margin-top: -8px; width: 200px; background: url(\'http://static.pennergame.de/img/pv4/bg_subnav-off2.png\')transparent no-repeat top center;}')
    addGlobalStyle('div#datki:hover {background: url(\'http://static.pennergame.de/img/pv4/bg_subnav-on2.png\')transparent no-repeat top center;}')
    addGlobalStyle('.datki {width: 173px; text-align:center; height: 40px; display: block; margin-left: 20px;} ')


    pos = document.getElementsByTagName("li")[5].getElementsByClassName("ttip")[0].innerHTML.indexOf(",");
    cash = document.getElementsByTagName("li")[5].getElementsByClassName("ttip")[0].innerHTML.substr(0, pos).replace(".", "").replace(/\D/g, "");
    clean = document.getElementsByTagName("b")[0].innerHTML;
    reflink = document.getElementsByName("reflink")[0].value;

    var menu = document.getElementById('adspecial');
    var button = document.createElement('div');

    menu.appendChild(button);

    if(clean == '100%'){
	button.innerHTML = '<div id="datki"><form action="http://www.menelegame.pl/" method="POST" id="datki_form" target="_blank"><input type="hidden" value="'+reflink+'" name="url">   <input class="datki" style="border: 0px; background: transparent; color: #2b1c0c;font-weight:bold; font-size:14px;" type="submit" value=">> Datki <<" /></form></div>';
    } else if(cash > 24 || clean == '100%') {
	button.innerHTML = '<div id="datki"><form action="../../city/washhouse/buy/" method="POST"><input type="hidden" value="2" name="id"/><input class="datki" style="border: 0px; background: transparent; color: #2b1c0c;font-weight:bold; font-size:14px;" type="submit" value="Mycie + Datki" onclick="document.getElementById(\'datki_form\').submit();" /></form>      <form action="http://www.menelegame.pl/" method="POST" id="datki_form" target="_blank"><input type="hidden" value="'+reflink+'" name="url"></form>  </div>';
    } else {
	button.innerHTML = '<div id="datki"><input style="font-weight:bold; font-size:14px; text-decoration: line-through;border: 0px; background: transparent; color: #2b1c0c;" class="datki" type="button" value="Mycie + Datki" onclick="alert(\'Masz za mało pieniędzy by się umyć!\')"/></div>';
    }

}
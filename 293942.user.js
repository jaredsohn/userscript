// ==UserScript==
// @name			Clodogame - Highscore Script 2014
// @description		Modifie la page Highscore pour y incorporer toutes les infos utiles au combat.
// @author			DerMitDenZahlenTanzt
// @version			1.0
// @maj				Script adapté par Memphis007 pour Paris Reloaded et Sylt.
// @include			http://*game*/highscore/*
// @include			http://*bumrise*/highscore/*
// @include			*game*settings*
// @include			*bumrise*settings*
// @exclude			*gang/*
// @exclude			*.php*
// @exclude			*stuff*
// ==/UserScript==

vars = new Object();
vars.version = '1.0';
vars.download = 'http://userscripts.org/scripts/source/67692.user.js';


add_setting('PGHS2010',[['input','language','Language:<br /><small>en,fr,de</small>'],['input','size','Pet-height:[px]'],['input','short','Shorten long Names(yes/no):']],false,'de');

var url = document.location.href;
if(url.match(/\?name=&gang=/) || url.match(/min=0/)) {
    document.location.href = url.replace(/\?name=&gang=/,'?gang=').replace(/min=0/,'min=1');
} else {
	GM_addStyle('td{ white-space: nowrap; }');
}

lang = {
    de:{
        thead:['Rang',
        'Spieler', //1
        'Punkte',//2
        'Diff', //2,3,5,14
        'Diff [%]',
        'Stadt',
        'RP',
        'RegDatum',
        'Geld',
        'Tier',
        'Plunder',
        'Won',
        'Bande',	//11
        'Posten',
        'Platz',
        'BPkte',
        'Beitritt'],
        links:['News',
        'Let\'s Fight',
        '&Uuml;bersicht',
        'Bande',
        'Stadt',
        'Kommunikation',
        'Bandenhighscore',
        'Mein Highscore',
        'Highscore'
        ],
        nav:[
        '&lt;&lt;Vorherige',
        'N&auml;chste&gt;&gt;',
        '&lt;&lt;Erste',
        'Letzte&gt;&gt;'
        ],
        gang_stat:[
        '',
        'Mitglied',
        'CoAdmin',
        'Admin'
        ],
        update:'Update installieren!',
        no_update:'Kein Update verfügbar!',
        stuff:'Plunder',
        cash:'Geld',
        permil:'Promille',
        place:'Platz',
        points:'Punkte',
        won:'Gewonnen',
        lost:'Verloren',
        attackable:'Angreifbare Spieler',
        cancel:'Abbrechen',
        ends_about:'Ende gegen',
        attack:'Angriff l&auml;uft auf',
        no_attack:'Es l&auml;uft kein Angriff!',
        incattack:'Eingehender Angriff',
        no_incattack:'Kein eingehender Angriff!',
        logged_out:'Ausgeloggt!',
        fightvalalert:'Achtung! Du hast nicht deine maximale Kampfkraft! Klicke zum Reset.',
        fightvalok:'Du hast deine maximale Kampfkraft',
		fontsize:'Schriftgr&ouml;&szlig;e',
    },
    en:{
        thead:['Position',
        'Player',
        'Points',
        'Diff',
        'Diff [%]',
        'City',
        'RP',
        'RegDate',
        'Cash',
        'Pet',
        'Stuff',
        'Won',
        'Gang',
        'Status',
        'Place',
        'GPoints',
        'Joined'],
        links:['News',
        'Let\'s Fight',
        'Overview',
        'Gang',
        'City',
        'Communication',
        'Gang-HS',
        'My HS',
        'Highscore'
        ],
        nav:[
        '&lt;&lt;Previous',
        'Next&gt;&gt;',
        '&lt;&lt;First',
        'Last&gt;&gt;'
        ],
        gang_stat:[
        '',
        'Member',
        'CoAdmin',
        'Admin'
        ],
        update:'Install Update!',
        no_update:'No Update available!',
        stuff:'Stuff',
        cash:'Cash',
        permil:'Permil',
        place:'Place',
        points:'Points',
        won:'Won',
        lost:'Lost',
        attackable:'Attackable Players',
        cancel:'Cancel',
        ends_about:'Ends about',
        attack:'Already attacking',
        no_attack:'No running Attack!',
        incattack:'Incoming Fight',
        no_incattack:'No incoming Fight!',
        logged_out:'Logged out!',
        fightvalalert:'Attention! You haven\'t got the highest FightVal! Click to Reset.',
        fightvalok:'Your FightVal is OK.',
		fontsize:'Fontsize',
    },
    fr:{
        thead:['Position',
        'Joueur',
        'Points',
        'Diff',
        'Diff [%]',
        'Ville',
        'RP',
        'RegDate',
        'Argent',
        'Animal',
        'Babiole',
        'Gagné',
        'Bande',
        'Statut',
        'Place',
        'BPoints',
        'Entré'],
        links:['News',
        'Combat',
        'Aperçu',
        'Bande',
        'Ville',
        'Communication',
        'Bande-HS',
        'Mon HS',
        'Highscore'
        ],
        nav:[
        '&lt;Précédente',
        'Suivante&gt;',
        '&lt;&lt;Première',
        'Dernière&gt;&gt;'
        ],
        gang_stat:[
        '',
        'Membre',
        'CoAdmin',
        'Admin'
        ],
        update:'Installer la Mise à jour!',
        no_update:'Aucune Mise à jour dispo!',
        stuff:'Babiole',
        cash:'Argent',
        permil:'% Alcool',
        place:'Place',
        points:'Points',
        won:'Gagné',
        lost:'Perdu',
        attackable:'Joueurs attaquables',
        cancel:'Annuler',
        ends_about:'Fin approx.',
        attack:'En train d\'attaquer',
        no_attack:'Tu n\'attaques personne!',
        incattack:'Attaque entrante',
        no_incattack:'Pas d\'attaques entrantes!',
        logged_out:'Déconnecté!',
        fightvalalert:'Attention! Ton FightVal n\'est pas au maximum! Clique pour le remettre',
        fightvalok:'Ton FightVal est OK.',
		fontsize:'taille des caractères',
    },
};

/*
 *		WELCHES SPRACHPAKET GENUTZT WERDEN SOLL!
 *		WHICH LANG PACK TO USE
 */
lang = lang[GM_getValue('setting_PGHS2010_language','de')];
pet_h = GM_getValue('setting_PGHS2010_size',68);
pet_w = 60*pet_h/68;
shorten = GM_getValue('setting_PGHS2010_short','Y');
shorten = shorten=='yes' ? true : false;
//##################################### DON'T CHANGE ANYTHING BENEATH ############################################


//Tier-Sammlung festlegen
var tiere = init();

//Globales Objekt fÃ¼r globale Variablen
vars.thead = lang.thead;

vars.toplinks = {}
vars.toplinks[lang.links[0]] = Global.url.static+'news/';
vars.toplinks[lang.links[1]] = Global.url.static+'fight/overview/';
vars.toplinks[lang.links[2]] = Global.url.static+'overview/';
vars.toplinks[lang.links[3]] = Global.url.static+'gang/';
vars.toplinks[lang.links[4]] = Global.url.static+'city/';
vars.toplinks[lang.links[5]] = Global.url.static+'messages/';
vars.toplinks[lang.links[6]] = Global.url.static+'highscore/gang/';
vars.toplinks[lang.links[7]] = Global.url.static+'highscore/joindate/';
vars.toplinks[lang.links[8]] = Global.url.static+'highscore/user/';
vars.toplinkslen = 9; //Anzahl der Links in vars.toplinks !

//Start, IDs und Spielerinfos sammeln
if(!isErrorPage()) {
    collectID();
}
//collectId()->changePage()->getDashboardData()->buildDashboard()->buildNavi()->getUserData()->getData(id)->getGangData(id)->getProfilData(id)->checkForFinish()->insertUserData();


/*
 *	Sammelt Benutzer-IDs der aktuellen Highscore-Seite
 */
function collectID() {
    if(document.body.innerHTML.match(/keine Treffer/)) return false;
    try {
        var docIH = document.getElementById('my-profile').innerHTML;
    } catch(e) {
        var docIH = '';
    }
    vars.owndata = Object();
    var highscore_table = document.getElementsByTagName('table')[0];
    try {
        vars.ownid = Boolean(docIH.match(/profil\/id:(\d+)/)[1]) ? docIH.match(/profil\/id:(\d+)/)[1] : false;
        vars.owndata.name = vars.ownid ? document.getElementById('my-profile').getElementsByTagName('a')[0].innerHTML : false;
    } catch(e) {
        vars.ownid = false;
        vars.owndata.name = false;
    }
    vars.select_html = document.getElementById('search_stadtteil').innerHTML;
    vars.userids = [];
    if(vars.ownid!=false) {
        vars.owndata.cash = trim(document.getElementsByClassName('money')[0].textContent);
        vars.owndata.cash_1 = vars.owndata.cash.match(/\d+/g).join('');
        vars.owndata.permil = trim(document.getElementsByClassName('beer')[0].textContent);
        var overview = document.getElementById('my-profile');
        var data = overview.getElementsByClassName('el2');
		if(document.location.hostname.match(/sylt/) || document.location.hostname.match(/clodogame/)) {
			vars.owndata.platz = data[2].textContent;
			vars.owndata.punkte = data[3].textContent;
		} else {
			vars.owndata.platz = data[1].textContent;
			vars.owndata.punkte = data[2].textContent;
		}
        vars.owndata.limits = [parseInt(vars.owndata.punkte*1.5),parseInt(vars.owndata.punkte*0.8)];
    } else {
        vars.owndata.cash = '';
        vars.owndata.cash_1 = 0;
        vars.owndata.permil = '';
        vars.owndata.punkte = '';
        vars.owndata.platz = '';
        vars.owndata.won = vars.owndata.lost = '';
        vars.owndata.limits = [1E15,0]
        vars.owndata.att = vars.owndata.def = vars.owndata.fightval = '';
        vars.owndata.percwon = vars.owndata.perclost = 50;
    }
    if(!highscore_table.innerHTML.match(/profil/)) {
        return false;
    }
    vars.userdata = [];
    var table_rows = highscore_table.getElementsByTagName('tr');
    for(var a = 1; a < table_rows.length; a++) {
        var td = table_rows[a].getElementsByTagName('td');
        var current_id = table_rows[a].innerHTML.match(/profil\/id:(\d+)/)[1];
        vars.userids.push(current_id);
        vars.userdata[a-1] = [];
        vars.userdata[a-1].push(current_id);
        vars.userdata[a-1].push(trim(td[0].className));
        vars.userdata[a-1].push(td[3].innerHTML);		
		var points = td[4].textContent.replace(/Billiarden/,'000000000000').replace(/Billionen/,'000000000').replace(/Milliarden/,'000000').replace(/(Millionen|Millones|Millions)/,'000');
		points = parseInt(points.match(/\d+/g).join(""),10);
        vars.userdata[a-1].push(points);
    }
    changePage();
	vars.updateIt = '';
	getDashboardData();
    return true;
}

/*
 *	Ã„ndert HTML der Seite um
 */
function changePage() {
    window.focus();
    vars.lastnum = document.getElementById('pagination').getElementsByTagName('li');
    document.body.innerHTML = '';
    var head = document.getElementsByTagName('head')[0];
    head.innerHTML = '';
    /*head.appendChild(createElement('link',{
        rel:'stylesheet',
        href:'http://street-kicker.eu/js/style.css'
    }));*/
	var link = window.document.createElement('style');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.innerHTML = 'body { background-color:#3e3d3b; color:#6e6e6e; font-family:Verdana; font-size:11px; }' +
				'a {color:#c3c3c3;text-decoration:underline;}' +
				'a:hover {color:#fff;}' +
				'#table thead,#table thead tr , .topnav div, .head{color:#8C8C8C;font-family:Georgia,"Times New Roman",serif;font-weight:bold;text-transform:uppercase;background-color:#282828;text-align:left;vertical-align:middle;}' +
				'.even {background-color:#3f3f3;}' +
				'.odd {background-color:#383838;}' +
				'#table th, #table td {padding:5px;vertical-align:middle;}' +
				'#table tr {border-bottom:1px solid #2a2a2a;border-top:1px solid #2a2a2a;line-height:25px;}' +
				'#table {border-collapse:collapse;}' +
				'#table td.col1 {font-weight: bold;text-align: left;background-image: url(http://static.pennergame.de/img/pv4/sprite_highscrore-trend.png);background-position: 0px -999em;background-repeat:  no-repeat;padding-left: 23px;}' +
				'#table td.up {background-position: -85px;}' +
				'#table td.down {background-position: 8px;}' +
				'#table td.neutral {background-position: -185px ;}' +
				'.col1 {width:70px;}' +
				'.hide {display:none;}' +
				'.attack {background:url("http://static.pennergame.de/img/pv4/sprite_icons.png") no-repeat scroll -10px -75px transparent;display:block;height:16px;width:16px;}' +
				'.bann, .bann a {font-weight:bold;color:#C00 !important;}' +
				'.on, .on a {font-weight:bold;color:#090 !important;}' +
				'.bann, .on {font-family:Georgia,"Times New Roman",serif;font-weight:bold;font-variant:small-caps;}' +
				'.topnav {margin-bottom:10px;}' +
				'.topnav div {float:left;text-align:center;padding:10px 0px 10px 0px;margin-bottom:1px;display:block;}' +
				'.topnav div a {display:block;text-decoration:none;}' +
				'#dashboard {background:#2a2a2a;width:100%;height:160px;margin-bottom:1px;}' +
				'.dbcolumn {margin-top:10px;margin-left:30px;width:200px;float:left;}' +
				'.dbcolumn b {text-align:right;}' +
				'.dbcolumn table a {text-decoration:none;}' +
				'.dbcolumn table td, .dbcolumn table {padding:0px;border-spacing:0px;}' +
				'.topnav input, .topnav select {background:#2a2a2a;border:1px solid #1a1a1a;color:#6e6e6e;width:80px;height:15px;margin-right:10px;}' +
				'.topnav input[type=submit] {border:none;margin-top:5px;}' +
				'.topnav select {height:19px;margin-top:-5px;vertical-align:middle;}' +
				'.topnav input[type=image] {border:none;height:19px;width:19px;margin-top:-5px;vertical-align:middle;}' +
				'#table th.up{background:url("http://zahlii.independent-irc.com/up.png");}' +
				'#table th.down{background:url("http://zahlii.independent-irc.com/down.png");}' +
				'#table th.down, #table th.up {background-position:5px 50%;background-repeat:no-repeat;padding-left:20px;}';
	document.getElementsByTagName("HEAD")[0].appendChild(link);
    /*head.appendChild(createElement('link',{
        rel:'stylesheet',
		type: 'text/css',
        href:'data:text/css,' +
            // Selectors start here
			'body {background-color:#3e3d3b;color:#6e6e6e;font-family:Verdana;font-size:11px;}' +
			'a {color:#c3c3c3;text-decoration:underline;}' +
			'a:hover {color:#fff;}' +
			'#table thead,#table thead tr , .topnav div, .head{color:#8C8C8C;font-family:Georgia,"Times New Roman",serif;font-weight:bold;text-transform:uppercase;background-color:#282828;text-align:left;vertical-align:middle;}' +
			'.even {background-color:#3f3f3;}' +
			'.odd {background-color:#383838;}' +
			'#table th, #table td {padding:5px;vertical-align:middle;}' +
			'#table tr {border-bottom:1px solid #2a2a2a;border-top:1px solid #2a2a2a;line-height:25px;}' +
			'#table {border-collapse:collapse;}' +
			'#table td.col1 {font-weight: bold;text-align: left;background-image: url(http://static.pennergame.de/img/pv4/sprite_highscrore-trend.png);background-position: 0px -999em;background-repeat:  no-repeat;padding-left: 23px;}' +
			'#table td.up {background-position: -85px;}' +
			'#table td.down {background-position: 8px;}' +
			'#table td.neutral {background-position: -185px ;}' +
			'.col1 {width:70px;}' +
			'.hide {display:none;}' +
			'.attack {background:url("http://static.pennergame.de/img/pv4/sprite_icons.png") no-repeat scroll -10px -75px transparent;display:block;height:16px;width:16px;}' +
			'.bann, .bann a {font-weight:bold;color:#C00 !important;}' +
			'.on, .on a {font-weight:bold;color:#090 !important;}' +
			'.bann, .on {font-family:Georgia,"Times New Roman",serif;font-weight:bold;font-variant:small-caps;}' +
			'.topnav {margin-bottom:10px;}' +
			'.topnav div {float:left;text-align:center;padding:10px 0px 10px 0px;margin-bottom:1px;display:block;}' +
			'.topnav div a {display:block;text-decoration:none;}' +
			'#dashboard {background:#2a2a2a;width:100%;height:160px;margin-bottom:1px;}' +
			'.dbcolumn {margin-top:10px;margin-left:30px;width:200px;float:left;}' +
			'.dbcolumn b {text-align:right;}' +
			'.dbcolumn table a {text-decoration:none;}' +
			'.dbcolumn table td, .dbcolumn table {padding:0px;border-spacing:0px;}' +
			'.topnav input, .topnav select {background:#2a2a2a;border:1px solid #1a1a1a;color:#6e6e6e;width:80px;height:15px;margin-right:10px;}' +
			'.topnav input[type=submit] {border:none;margin-top:5px;}' +
			'.topnav select {height:19px;margin-top:-5px;vertical-align:middle;}' +
			'.topnav input[type=image] {border:none;height:19px;width:19px;margin-top:-5px;vertical-align:middle;}' +
			'#table th.up{background:url("http://zahlii.independent-irc.com/up.png");}' +
			'#table th.down{background:url("http://zahlii.independent-irc.com/down.png");}' +
			'#table th.down, #table th.up {background-position:5px 50%;background-repeat:no-repeat;padding-left:20px;}'
    }));*/
	head.appendChild(createElement('style',{
		type:'text/css',
	}));
    head.appendChild(createElement('title',{},'Pennergame Highscore 2010'));
    insertTopNavi();
    vars.dashboard = createElement('div',{
        id:'dashboard'
    });
    document.body.appendChild(vars.dashboard);
}

function insertTopNavi() {
    var navi = createElement('div',{
        class:'topnav'
    });
    for(var link_name in vars.toplinks) {
        var href = createElement('a',{
            href:vars.toplinks[link_name]
        },link_name);
        var linkele = createElement('div',{
            style:'width:'+(100/vars.toplinkslen)+'%;'
        });
        linkele.appendChild(href);
        navi.appendChild(linkele);
    }
    document.body.appendChild(navi);
    document.body.appendChild(createElement('p',{
        style:'clear:both;'
    }));
}
/*
 *	Baut HTML-Element mit gegebenen Attributen
 */
function createElement(type,attrs,inner) {
    var tmp_elem = document.createElement(type);
    if(!attrs) return tmp_elem;
    for(var att_name in attrs) {
        tmp_elem.setAttribute(att_name,attrs[att_name]);
    }
    if(inner==null || inner=='undefined') return tmp_elem;
    tmp_elem.innerHTML = inner;
    return tmp_elem;
}

/*
 * PHP-Style-Funktion trim (entfernt Leerzeichen an Anfang/Ende des Strings)
 */
function trim(zeichenkette) {
    return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');
}

function change_fontsize(){
 	var stylecount = document.getElementsByTagName('style').length;
  	var sizetag = document.getElementsByTagName('style')[stylecount-1];  //pick the last style tag
  	sizetag.innerHTML = '*{font-size:'+ this.value +';}';
	this.blur();
}

/*
 *	Ruft vom DashBoard angezeigte Daten ab und speichert diese in vars.owndata
 */
function getDashboardData() {
    if(vars.ownid==false) {
        buildDashboard();
    } else {
        GM_xmlhttpRequest
        ({
            method: 'get',
            url: Global.url.static+'fight/',
            headers: {
                'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.8',
                'Accept': 'application/atom+xml,application/xml,text/xml',
            },
            onload: function(response) {
                if(response.status!=200) {
                    GM_log('Fehler: HTTP Code '+response.status+' beim Abruf von "'+Global.url.static+'fight/"');
                } else {
                    var cont = response.responseText;
                    var dom = setParser(cont,'HTML');
					// .box_att
					// .box_def
					// .box_power
                    var table = dom.getElementsByTagName('table')[0];
                    vars.owndata.att = parseInt(dom.getElementsByClassName('fight_num')[0].textContent,10);
                    vars.owndata.def = parseInt(dom.getElementsByClassName('fight_num')[1].textContent,10);
                    vars.owndata.fightval = parseInt(dom.getElementsByClassName('fight_num')[2].textContent,10);
					
                    try {
						var faktor_att = dom.getElementsByClassName('style_buff')[0].parentNode.textContent.match(/ATT.*?(\d+)/)[1];
					} catch(e) { 
						var faktor_att = 0; 
					}
					
					
					vars.owndata.faktor = faktor_att;
					
					if(vars.owndata.fightval-faktor_att*1.1 < getfightval(vars.ownid)) {
                        vars.owndata.alert = true;
                    } else {
                        setfightval(vars.ownid,vars.owndata.fightval-faktor_att*1.1);
                    }
                    var faktor = table.innerHTML.match(/style_buff/) ? 1 : 0;

					/*
					data.setValue(0, 0, 'Gewonnen');
              		data.setValue(0, 1, 139);
              		data.setValue(1, 0, 'Verloren');
             		data.setValue(1, 1, 120);
			  		*/
					var matches = cont.match(/data\.setValue\((.*?)\);/g);
					if(document.location.hostname.match(/sylt/) || document.location.hostname.match(/clodogame/)) {
						vars.owndata.won = parseInt(matches[1].match(/\d+\)/)[0],10) + parseInt(matches[3].match(/\d+\)/)[0],10);
						vars.owndata.lost = parseInt(matches[5].match(/\d+\)/)[0],10) + parseInt(matches[7].match(/\d+\)/)[0],10);
					} else {
						vars.owndata.won = parseInt(matches[1].match(/\d+\)/)[0],10);
						vars.owndata.lost = parseInt(matches[3].match(/\d+\)/)[0],10);
					}
                    vars.owndata.percwon = roundN(vars.owndata.won/(vars.owndata.won+vars.owndata.lost)*100,1)
                    vars.owndata.perclost = roundN(vars.owndata.lost/(vars.owndata.won+vars.owndata.lost)*100,1);
                    try {
						if(document.location.hostname.match(/sylt/)) {
							var inc_tbl = dom.getElementsByTagName('table')[4].getElementsByTagName('tr');
						} else if (document.location.hostname.match(/clodogame/)) {
							var inc_tbl = dom.getElementsByTagName('table')[3].getElementsByTagName('tr');
						} else {
							var inc_tbl = dom.getElementsByTagName('table')[2].getElementsByTagName('tr');
						}
                        if(inc_tbl.length==1) {
                            vars.owndata.inclink = false;
                            vars.owndata.incend = false;
                        } else {
                            var td = inc_tbl[1].getElementsByTagName('td');
                            vars.owndata.inclink = td[2].innerHTML;
                            vars.owndata.incend = td[1].textContent;
                        }
                        var out_tbl = dom.getElementsByClassName('tiername')[1].parentNode;
                        var is_running = Boolean(out_tbl.innerHTML.match(/profil/));
                        if(is_running) {
                            vars.owndata.outlink = out_tbl.innerHTML.match(/<a.*?href="\/profil\/id:\d+\/".*?\/a>/);
                            if(document.location.hostname.match(/sylt/)) {
								var name = out_tbl.getElementsByTagName('a')[0].innerHTML.split("</span>")[1];
							} else {
								var name = out_tbl.getElementsByTagName('a')[0].innerHTML;
							}
                            var end = out_tbl.textContent.split(name)[1].match(/(\d+)/g);
                            vars.owndata.outend = end[0]+'.'+end[1]+'.'+end[2]+' '+end[3]+':'+end[4]+':'+end[5];
                        } else {
                            vars.owndata.outlink = false;
                            vars.owndata.outend = false;
                        }
                    }catch(e) {
                        vars.owndata.incend = vars.owndata.inclink = vars.owndata.outend = vars.owndata.outlink = false;
                        vars.owndata.att = vars.owndata.def = vars.owndata.fightval = vars.owndata.lost = vars.owndata.won = 0;
                    }
                }
                buildDashboard();
            }

        });
    }
}

/*
 *	Greift auf das x. Feld der y. Spalte zu
 */
function getTable(table,x,y) {
    try {
        var moep = table.getElementsByTagName('tr')[y-1].getElementsByTagName('td')[x-1].textContent;
    } catch(e) {
        return '';
    }
    return moep;
}

/*
 *	FÃ¼llt das DashBoard mit Daten
 */
function buildDashboard() {
    var db = vars.dashboard;
    db.innerHTML = '<br /><span style="margin:10px;padding-top:10px;font-variant:small-caps;" class="head">'+(vars.owndata.name?vars.owndata.name:lang.logged_out)+'</span><br /><img src="'+Global.url.ava+(vars.ownid?vars.ownid:'standard')+'.jpg" height="91px" style="float:left;margin:10px" />';

    db.appendChild(createElement('div',{
        class:'dbcolumn'
    },'<table><tr><td>Att:</td><td><b>'+vars.owndata.att+'</b></td></tr><tr><td>Def:</td><td><b>'+vars.owndata.def+'</b></td></tr><tr><td>FightVal:</td><td><span id="fv" style="color:'+(vars.owndata.alert?'#900' : '')+';"><b title="'+(vars.owndata.alert ? lang.fightvalalert : lang.fightvalok)+'">'+vars.owndata.fightval+'</b></span></td></tr><tr><td>'+lang.stuff+':</td><td><b>-</b></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>'+lang.permil+':</td><td><b>'+vars.owndata.permil+'</b></td></tr><tr><td>'+lang.cash+':</td><td><b><span style="color:'+color(vars.owndata.cash_1)+'">'+vars.owndata.cash+'</span></b></td></tr></table>'));

    db.appendChild(createElement('div',{
        class:'dbcolumn'
    },'<table><tr><td>'+lang.place+':</td><td><b>'+vars.owndata.platz+'.</b></td></tr><tr><td>'+lang.points+':</td><td><b>'+numb(vars.owndata.punkte)+'</b></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td colspan="2"><span style="color:#c0c0c0;font-weight:bold;"><a href="'+Global.url.static+'highscore/user/?min='+(vars.owndata.limits[1]+1)+'&max='+(vars.owndata.limits[0]-1)+'">'+lang.attackable+'</a></span></td></tr><tr><td>&nbsp;</td><td><b>&nbsp;</b></td></tr><tr><td>'+lang.won+':</td><td><b>'+vars.owndata.won+'('+vars.owndata.percwon+'%)</b></td></tr><tr><td>'+lang.lost+':</td><td><b>'+vars.owndata.lost+'('+vars.owndata.perclost+'%)</b></td></tr></table>'));

    db.appendChild(createElement('div',{
        class:'dbcolumn'
    },'<table><tr><td colspan="2">'+(vars.owndata.outlink?lang.attack+':':lang.no_attack)+'</td></tr><tr><td colspan="2"><b>'+(vars.owndata.outend?vars.owndata.outlink:'')+'</b></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td colspan="2">'+(vars.owndata.outend?'<b><a href="/fight/cancel/">'+lang.cancel+'</a></b>':'')+'</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td colspan="2">'+(vars.owndata.outend?lang.ends_about+':':'')+'</td></tr><tr><td colspan="2">'+(vars.owndata.outend?vars.owndata.outend:'')+'</td></tr></table>'));

    db.appendChild(createElement('div',{
        class:'dbcolumn'
    },'<table><tr><td colspan="2">'+(vars.owndata.inclink?lang.incattack+':':lang.no_incattack)+'</td></tr><tr><td colspan="2"><b>'+(vars.owndata.incend?vars.owndata.inclink:'')+'</b></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td colspan="2">'+(vars.owndata.incend?lang.ends_about+':':'')+'</td></tr><tr><td colspan="2">'+(vars.owndata.incend?vars.owndata.incend:'')+'</td></tr><tr><td colspan="2">'+vars.updateIt+'</td></tr></table>'));

    db.appendChild(createElement('div',{
        class:'dbcolumn'
    },'<table><tr><td colspan="2"><b><a href="/settings/">Settings</a></b></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td colspan="2">&nbsp;</td></tr></table>'));
	
	db.appendChild(createElement('div',{
        class:'dbcolumn'
    },'<table><tr><td>'+lang.fontsize+'</td><td><select style="border: 1px solid rgb(26, 26, 26); background-color: rgb(42, 42, 42); color: rgb(255, 255, 255); width: 75px;" id="font"> <option value="6px">6px</option><option value="7px">7px</option> <option value="8px">8px</option> <option value="9px">9px</option><option value="10px">10px</option> <option value="11px" selected>11px</option><option value="12px">12px</option><option value="15px">15px</option><option value="20px">20px</option> </select></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td colspan="2">&nbsp;</td></tr></table>'));

    document.getElementById('fv').addEventListener('click',(function() { clearfightval(vars.ownid); }),true);
	document.getElementById('font').addEventListener('change',change_fontsize,true);
    buildNavi();
}

/*
 *	Rundet eine Zahl auf stellen Nachkommastellen
 */
function roundN(number,stellen) {
    return parseInt(number*(Math.pow(10,stellen)))/(Math.pow(10,stellen));
}


/*
 *	Baut Naviagtion und Suchmaske zusammen
 */
function buildNavi(footer) {
    var url = document.location.href;
    if(!url.match(/\/\d+\//)) {
        var teile = url.split('/');
        var letzterteil = teile.pop();
        var neueurl = teile.join('/');
        neueurl += '/1/';
        neueurl += letzterteil;
    } else {
        var neueurl = url;
    }
    if(footer) try {document.getElementById('footnav').parentNode.removeChild(document.getElementById('footnav'));} catch(e) {}
    var navi = createElement('div',{
        class:'topnav',
        id:footer ? 'footnav' : ''
    });
    var page = parseInt(neueurl.match(/\/(\d+)\//)[1],10);
    if(page>5) var len = 13;
    else var len = page+7;
    var last_num = vars.lastnum;
    var last_num = last_num[last_num.length-1].textContent;
    var pagelink = neueurl.replace(/\/\d+\//,'/1/');
    var href = createElement('a',{
        href:pagelink
    },lang.nav[2]);
    var linkele = createElement('div',{
        style:'width:'+(100/len)+'%;'+style
    });
    linkele.appendChild(href);
    navi.appendChild(linkele);
    for(var i= page-5;i<=page+5;i++) {
        if(i>0) {
            var pagelink = neueurl.replace(/\/\d+\//,'/'+i+'/');
            var j = i;
            var style = '';
            if(i==page) {
                var style = 'background-color:#2c2c2c;';
                var j = i;
            } else if(i==page-1) {
                var style = 'background-color:#2d2d2d;';
                var j = lang.nav[0];
            } else if(i==page+1) {
                var style = 'background-color:#2c2c2c;';
                var j = lang.nav[1];
            }
            var href = createElement('a',{
                href:pagelink
            },j);
            var linkele = createElement('div',{
                style:'width:'+(100/len)+'%;'+style
            });
            linkele.appendChild(href);
            navi.appendChild(linkele);
        }
    }
    var pagelink = neueurl.replace(/\/\d+\//,'/'+last_num+'/');
    var href = createElement('a',{
        href:pagelink
    },lang.nav[3]);
    var linkele = createElement('div',{
        style:'width:'+(100/len)+'%;'+style
    });
    linkele.appendChild(href);
    navi.appendChild(linkele);
    document.body.appendChild(navi);
    if(!footer) {
        var navi = createElement('div',{
            class:'topnav'
        });
        var linkele = createElement('div',{
            style:'width:100%;'
        },'<form id="searchform" name="searchsome" method="get" action="">'+lang.thead[1]+':<input type="text" class="regex[4]" maxlength="32" size="19" id="search_penner" name="name" title="Penner" value="" />'+lang.thead[12]+':<input type="text" class="regex[4]" maxlength="64" size="17" id="search_bande" name="gang" title="Bande" value="" /><select id="search_stadtteil" name="district" style="text-transform:none;">'+vars.select_html+'</select>'+lang.thead[2]+':<input type="text" class="regex[number]" maxlength="9" size="3" id="search_min" name="min" title="Min" value="1"> - <input type="text" class="regex[number]" maxlength="9" size="3" id="search_max" name="max" title="Max" value=""><input type="image" name="submit" value="Absenden" src="http://static.pennergame.de/img/pv4/icons/icon_search-go.png"></form>');
        vars.inputs = linkele.getElementsByTagName('input');
        navi.appendChild(linkele);
        document.body.appendChild(navi);
    }
    if(!footer) getUserData();
}

/*
 *	Startet Spielerinfo-Abruf-Funktion
 */
function getUserData() {
    vars.callNumber = 0;
    for(var c=0;c<vars.userids.length;c++) {
        getData(vars.userids[c],c);
    }
}

/*
  *	ÃœberprÃ¼ft, ob alle Infos gesammelt
  */
function checkForFinish() {
    vars.callNumber++;
    if(vars.callNumber==vars.userids.length || vars.callNumber>22) {
        insertUserData();
    }
}

/*
 *	Sammelt eigentliche Daten

 *
 *		vars.userdata[id] = [
						   Spieler-ID,					0
						   Trend-ClassName,				1
						   Stadtteil(HTML),				2
						   Punkte(Highscore),			3
						   Spielername,					4
						   Platz,						5
						   Punkte(API),					6
						   Differenz-Punkte,            7
						   Rangpunkte,					8
						   Geld(unformatiert) || false	9
						   RegDatum						10
						   Bandenid oder false,			11
						   Bandenname oder <leer>,		12
						   Bandenstatus oder 0,			13
						   Bandenbeitritt oder <leer>,	14
						   Bandenplatz oder <leer>,		16
						   Bandenpunkte oder <leer>,	15
						   Tieradresse oder false,		17
						   Plunderadresse oder false,	18
						   Status (1 Bann,2 Online)		19
						   Gewonnene KÃ¤mpfe			20
                           Voller Spielername           21
                           Voller Bandenname            22
                           Prozent                      23
						   Pennerfreak					24
						  ];
 */
function getData(id,c) {
    GM_xmlhttpRequest
    ({
        method: 'get',
        url: Global.url.static+'dev/api/user.'+id+'.xml',
        headers: {

            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.8',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(response) {
            if(response.status!=200) {
                GM_log('Fehler: HTTP Code '+response.status+' beim Abruf von "'+Global.url.static+'dev/api/user.'+id+'.xml"');
                getGangData(id,c);
            } else {
                var cont = response.responseText;
                var dom = setParser(cont,'XML');
                var name = dom.getElementsByTagName('name')[0].textContent;
                var fullname = name;
                if(name.length>13 &&shorten) {
                    var name = name.substring(0,10)+"[...]";
                }
                var platz = dom.getElementsByTagName('position')[0].textContent;
                var punkte = parseInt(dom.getElementsByTagName('points')[0].textContent,10);
                var differenz = punkte-vars.userdata[c][3];
                var rankpunkte = dom.getElementsByTagName('rankingpoints')[0].textContent;
                try {
                    var cash = dom.getElementsByTagName('cash')[0].textContent;
                } catch(e) {
                    var cash = false;
                }
                var reg = dom.getElementsByTagName('reg_since')[0].textContent;
                var gang_id = dom.getElementsByTagName('id')[1].textContent;
                var gang_id = gang_id!='None' ? gang_id : false;
                vars.userdata[c].push(name);
                vars.userdata[c].push(parseInt(platz,10));
                vars.userdata[c].push(parseInt(punkte,10));
                vars.userdata[c].push(differenz);
                vars.userdata[c].push(parseInt(rankpunkte,10));
                vars.userdata[c].push(cash?parseInt(cash,10):false);
                vars.userdata[c].push(reg);
                vars.userdata[c].push(gang_id);
                if(gang_id) {
                    var name = dom.getElementsByTagName('name')[1].textContent;
                    var gangfullname = name;
                    if(name.length>13 &&shorten) {
                        var name= name.substring(0,10)+"[...]";
                    }
                    vars.userdata[c].push(name);
                    vars.userdata[c].push(parseInt(dom.getElementsByTagName('status')[0].textContent,10));
                    vars.userdata[c].push(dom.getElementsByTagName('joined')[0].textContent);
                    getGangData(id,c,[fullname,gangfullname]);
                } else {
                    vars.userdata[c].push('');
                    vars.userdata[c].push(0);
                    vars.userdata[c].push('');
                    vars.userdata[c].push('');
                    vars.userdata[c].push('');
                    getProfilData(id,c,[fullname,gangfullname]);
                }
            }
        }
    });
}
function getGangData(id,c,array) {
    var gang_id = vars.userdata[c][11];
    GM_xmlhttpRequest
    ({
        method: 'get',
        url: Global.url.static+'dev/api/gang.'+gang_id+'.xml',
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.8',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(response) {
            if(response.status!=200) {
                GM_log('Fehler: HTTP Code '+response.status+' beim Abruf von "'+Global.url.static+'dev/api/gang.'+gang_id+'.xml"');
            } else {
                var cont = response.responseText;
                var dom = setParser(cont,'XML');
                vars.userdata[c].push(parseInt(dom.getElementsByTagName('points')[0].textContent,10));
                vars.userdata[c].push(parseInt(dom.getElementsByTagName('position')[0].textContent,10));
            }
            getProfilData(id,c,array);

        }
    });
}
function getProfilData(id,c,array) {
    GM_xmlhttpRequest
    ({
        method: 'get',
        url: Global.url.static+'profil/id:'+id+'/',
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.8',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(response) {
            if(response.status!=200) {
                GM_log('Fehler: HTTP Code '+response.status+' beim Abruf von "'+Global.url.static+'profil/id:'+id+'/"');
            } else {
                var cont = response.responseText;
                if(!cont.match(/avatare/)) {
                    var stat = 1;
                } else if(cont.match(/(Ist gerade Online|Est actuellement en ligne|Is already online|Est.*online|Jest .*nie online)/)) {
                    var stat = 2
                } else {
                    var stat = 0;
                }
                var fights_won = Boolean(cont.match(/awards\/(19|20|21|22|37|801)\.gif/)) ? cont.match(/awards\/(19|20|21|22|37|801)\.gif/)[1] : false;

				var fights_won = fights_won ? {
                    19:100,
                    20:250,
                    21:500,
                    22:1000,
                    37:2000,
					801:4000
                }
                [fights_won] : false;
				
				var freak = Boolean(cont.match(/awards\/76\.gif/)) ? true : false;
                var dom = setParser(cont,'HTML');

                //Tier-Bild
                var is_premium = Boolean(cont.match(/premiummedia/));
                if(is_premium) {
                    try {
                        var pet_div = dom.getElementsByClassName('user_pet_position')[0];
                        var pet_img = pet_div.getElementsByTagName('img')[0].src;
                    } catch(e) {
                        var pet_img = false;
                    }
                } else {
                    try {
                        var pet_div = dom.getElementsByTagName('table')[2];
	                    if(!pet_div.innerHTML.match(/Crack/)) {
                            var pet_img = false;
                        } else {
                            var pet_img = pet_div.getElementsByTagName('img')[0].src;
							//alert(pet_img);
                            if(pet_img.match(/\?\d+/)) {
                                try {
                                    var tooltip = pet_div.getElementsByClassName('tooltip_pl')[0];
                                    var name_tier = tooltip.getElementsByTagName('b')[1].textContent;
                                    var pet_img = Global.url.media+tiere[name_tier];
                                } catch(e) {
                                }
                            }
                        }
                    } catch(e) {
                        pet_img = false;
                    }
                }
                // Plunder-Bild
                try {
                    var plunder_img = dom.getElementsByClassName('item_pic')[0].src;
                } catch(e) {
                    var plunder_img = false;
                    try {
                        var icon_top = dom.getElementsByClassName('sex')[0].src;
                        if(!icon_top.match(/male/)) {
                            var plunder_img = icon_top;
                        }
                    } catch(e) {
                        var plunder_img = false;
                    }
                }
                vars.userdata[c].push(pet_img);
                vars.userdata[c].push(plunder_img);
                vars.userdata[c].push(stat);
                vars.userdata[c].push(fights_won);
                vars.userdata[c].push(array[0]);
                vars.userdata[c].push(array[1]);
                vars.userdata[c].push(parseInt((vars.userdata[c][7]/(vars.userdata[c][6]-vars.userdata[c][7]))*10000,10)/100);
				vars.userdata[c].push(freak);
            }
            checkForFinish();
        }
    });
}

function insertUserData() {
    var table = createElement('table',{
        id:'table',
        width:'100%'
    });
    var thead = createElement('thead');
    var tr = createElement('tr');
    for(e=0;e<vars.thead.length;e++) {
        if(e==12) var o = {
            width:'75px'
        }
        else if(e==1) var o = {
            style:'width:150px;'
        };
        else var o = {}
        tr.appendChild(createElement('th',o,vars.thead[e]));
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    if(document.getElementById('table')) {
        var tbl_old = document.getElementById('table');
        tbl_old.parentNode.removeChild(tbl_old);
    }
    var tbody = createElement('tbody');
    for(var f=0;f<vars.userids.length;f++) {
        var tr = createElement('tr');
        var data = vars.userdata[f];
        //472855,col1 up,St.Pauli,754574,EmscherHeinz,6210,754574,0,0,489962,06.09.2008,90218,Deutsch_Oesterreichischer_Pakt,2,01.01.1970,2527624,503,false,false
        for(g=0;g<vars.thead.length;g++) {
            var name = vars.thead[g];
            var obj = {};
            switch(name) {
                case lang.thead[0]:
                    var obj = {
                        class:data[1]
                    };
                    var cont = '<b>'+data[5]+'.</b>';
                    break;
                case lang.thead[1]:
					var d = data[5]-vars.owndata.platz;
                    if((data[6]<vars.owndata.limits[0] && data[6]>vars.owndata.limits[1]) || (d<=5 && d>=2)) {
                        var cont = '<a href="'+Global.url.static+'fight/?to='+data[21]+'"><img style="vertical-align:middle;border:none;" src="http://static.pennergame.de/img/pv4/icons/att.png" style="border:none;height:18px;"/></a>&nbsp;';
                    } else {
                        var cont = '';
                    }
					cont += '<a href="'+Global.url.static+'fight/fightlog/?q='+data[21]+'" target="_blank"><img style="vertical-align: middle; border: medium none;" src="http://static.pennergame.de/img/pv4/icons/fightinfo.gif"></a>&nbsp;';
                    cont += ['','<img style="vertical-align:middle;" title="Bann" src="http://img691.imageshack.us/img691/4940/48482160.png" />','<img style="vertical-align:middle;" title="Online" src="http://static.pennergame.de/img/pv4/icons/on.png" />'][data[19]];
                    cont += '<a title="'+data[21]+'" href="'+Global.url.static+'profil/id:'+data[0]+'/">'+data[4]+'</a>';
                    break;
                case lang.thead[2]:
                    var cont = numb(data[6]);
                    break;
                case lang.thead[3]:
                    var cont = numb(data[7]);
                    break;
                case lang.thead[4]:
                    var cont = data[23]+"%</span>";
                    break;
                case lang.thead[5]:
                    var cont = data[2];
                    break;
                case lang.thead[6]:
                    var cont = numb(data[8]);
                    break;
                case lang.thead[7]:
                    var cont = data[10];
                    break;
                case lang.thead[8]:
                    var cash = data[9];
                    if(!cash) {
                        var cont = '';
                    } else {
                        var col = color(cash);
                        var cont = '<span style="font-weight:bold;color:'+col+'">'+format(cash)+'</span>';
                    }
                    break;
                case lang.thead[9]:
                    var pet = data[17];
                    if(!pet) {
                        var cont = '';
                    } else {
                        var cont = '<img src="'+pet+'" width="'+pet_w+'px" height="'+pet_h+'px" />';
                    }
                    break;
                case lang.thead[10]:
                    var plunder = data[18];
                    if(!plunder) {
                        var cont = '&nbsp;';
                    } else {
                        var cont = '<img src="'+plunder+'" />';
                    }
                    break;
                case lang.thead[12]:
                    var cont = data[11] ? '<a href="'+Global.url.static+'profil/bande:'+data[11]+'/" title="'+data[22]+'">'+data[12]+'</a>' : '';
                    break;
                case lang.thead[13]:
                    if(data[13]!=0) {
                        var cont = '<img src="http://static.pennergame.de/img/pv4/shop/de_DE/bande/'+['','member','coadmin','admin'][data[13]]+'.gif" />&nbsp;<span style="font-weight:bold;color:#'+['','','A84F00','0053B9'][data[13]]+';">';
                    } else {
                        var cont = '&nbsp;<span>';
                    }
                    cont += lang.gang_stat[data[13]]+'</span>';
                    break;
                case lang.thead[14]:
                    var cont = (data[16]);
                    break;
                case lang.thead[15]:
                    var cont = numb(data[15]);
                    break;
                case lang.thead[16]:
                    var cont = data[14];
                    break;
                case lang.thead[11]:
                    var cont = data[20] ? number_format(data[20],0,',','.') : '';
					if(data[24]) cont += '<img src="http://static.pennergame.de/img/pv4/icons/awards/76.gif" />';
                    break;
                default:
                    var cont = data[g];
                    break;
            }
            tr.appendChild(createElement('td',obj,cont));
        }
        tr.className = (f%2==0)?'even':'odd';
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.body.appendChild(table);
    sortStart(lang);
    buildNavi(true);
}
function isErrorPage() {
    if(!document.getElementsByTagName('table')[0]) return true;
    else return false;
}
function number_format(number, decimals, dec_point, thousands_sep) {
    var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
    };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
function numb(n) {
    return number_format(n,0,',','.');
}

function getfightval(id) {
    return GM_getValue('fightval_pghs2010_'+Global.url.static+'_'+id,0);
}
function setfightval(id,val) {
    val = val.toString();
    GM_setValue('fightval_pghs2010_'+Global.url.static+'_'+id,val);
}
function clearfightval(id) {
    setfightval(id,0);
}

function init() {
	var url = document.location.hostname;
	var url = url.replace(/(highscore|www|change|umts)\./,'');
	Global = new Object();
	Global.searchit = new Object;
	Global.url = new Object();
	Global.settings = new Object();
	Global.vars = new Object();
	Global.vars.reqNum = 0;
	Global.settings.cash = Array();
	Global.settings.cash[0] = 5000;
	Global.settings.cash[1] = 10000;
	Global.settings.cash[2] = 20000;
	Global.settings.cash[3] = 50000;
	Global.settings.cash[4] = 75000;
	Global.settings.cash[5] = 125000;
	Global.settings.color = Array();
	Global.settings.color[0] = "#25ab22";
	Global.settings.color[1] = "#84C618";
	Global.settings.color[2] = "#dfde18";
	Global.settings.color[3] = "#DE5A18";
	Global.settings.color[4] = "#df3918";
	Global.settings.color[5] = "#df1818";
	switch(url) {
		
		case 'berlin.pennergame.de':
      		Global.url.static = 'http://berlin.pennergame.de/';
      		Global.url.media = 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/';
			Global.url.ava = 'http://inodes.pennergame.de/bl_DE/avatare/';
      		Global.url.siglink = 'http://inodes.pennergame.de/bl_DE/signaturen/';
			Global.searchit.stadtteil = 'Stadtteil';
			break;
		case 'dossergame.co.uk':
      		Global.url.media = 'http://media.dossergame.co.uk/img/';
      		Global.url.static = 'http://dossergame.co.uk/';
			Global.url.ava = 'http://inodes.pennergame.de/en_EN/avatare/';
      		Global.url.siglink = 'http://inodes.pennergame.de/en_EN/signaturen/';
	  		Global.searchit.stadtteil = 'District';
			break;
		case 'pennerbeta.de':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/';
      		Global.url.static = 'http://pennerbeta.de/';
      		Global.url.siglink = 'http://inodes.pennergame.de/beta/de_DE/signaturen/';
			Global.url.ava = 'http://inodes.pennergame.de/de_DE/avatare/';
	  		Global.searchit.stadtteil = 'Stadtteil';
			break;
   		case 'pennergame.de':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/';
      		Global.url.static = 'http://www.pennergame.de/';
      		Global.url.siglink = 'http://inodes.pennergame.de/de_DE/signaturen/';
			Global.url.ava = 'http://inodes.pennergame.de/de_DE/avatare/';
	  		Global.searchit.stadtteil = 'Stadtteil';
			break;
 		case 'menelgame.pl':
      		Global.url.media = 'http://media.menelgame.pl/img/';
      		Global.url.static = 'http://www.menelgame.pl/';
      		Global.url.siglink = 'http://inodes.pennergame.de/pl_PL/signaturen/';	
			Global.url.ava = 'http://inodes.pennergame.de/pl_PL/avatare/';
	  		Global.searchit.stadtteil = 'Dzielnica';
			break;
		case 'mendigogame.es':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/es_ES/tiere/fr';
			Global.url.static = 'http://www.mendigogame.es/';
			Global.url.ava = 'http://inodes.pennergame.de/es_ES/avatare/';
			Global.url.siglink = 'http://inodes.pennergame.de/es_ES/signaturen/';
			Global.searchit.stadtteil = 'Barrio';
			break;
		case 'clodogame.fr':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/fr_FR/tiere/';
			Global.url.static = 'http://www.clodogame.fr/';
			Global.url.siglink = 'http://inodes.pennergame.de/fr_FR/signaturen/';
			Global.url.ava = 'http://inodes.pennergame.de/fr_FR/avatare/';
			Global.searchit.stadtteil = 'Quartier';
			break;
		case 'bumrise.com':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/us_EN/tiere/';
			Global.url.static = 'http://www.bumrise.com/';
			Global.url.siglink = 'http://inodes.pennergame.de/us_EN/signaturen/';
			Global.url.ava = 'http://inodes.pennergame.de/us_EN/avatare/';
			Global.searchit.stadtteil = 'Neighborhood';
			break;
		case 'muenchen.pennergame.de':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/mu_DE/tiere/';
			Global.url.static = 'http://muenchen.pennergame.de/';
			Global.url.siglink = 'http://inodes.pennergame.de/mu_DE/signaturen/';
			Global.url.ava = 'http://inodes.pennergame.de/mu_DE/avatare/';
			Global.searchit.stadtteil = 'Stadtteil';
			break;
		case 'koeln.pennergame.de':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/kl_DE/tiere/';
			Global.url.static = 'http://koeln.pennergame.de/';
			Global.url.siglink = 'http://inodes.pennergame.de/kl_DE/signaturen/';
			Global.url.ava = 'http://inodes.pennergame.de/kl_DE/avatare/';
			Global.searchit.stadtteil = 'Stadtteil';
			break;
		case 'marseille.clodogame.fr':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/ma_FR/tiere/';
			Global.url.static = 'http://marseille.clodogame.fr/';
			Global.url.siglink = 'http://inodes.pennergame.de/ma_FR/signaturen/';
			Global.url.ava = 'http://inodes.pennergame.de/ma_FR/avatare/';
			Global.searchit.stadtteil = 'Quartier';
			break;
		case 'reloaded.pennergame.de':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/rl_DE/tiere/';
			Global.url.static = 'http://reloaded.pennergame.de/';
			Global.url.siglink = 'http://inodes.pennergame.de/rl_DE/signaturen/';
			Global.url.ava = 'http://inodes.pennergame.de/rl_DE/avatare/';
			Global.searchit.stadtteil = 'Stadtteil';			
			break;
		case 'malle.pennergame.de':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/s1_DE/tiere/';
			Global.url.static = 'http://malle.pennergame.de/';
			Global.url.siglink = 'http://inodes.pennergame.de/s1_DE/signaturen/';
			Global.url.ava = 'http://inodes.pennergame.de/s1_DE/avatare/';
			Global.searchit.stadtteil = 'Stadtteil';
			break;
		case 'sylt.pennergame.de':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/sy_DE/tiere/';
			Global.url.static = 'http://sylt.pennergame.de/';
			Global.url.ava = 'http://inodes.pennergame.de/sy_DE/avatare/';
			Global.searchit.stadtteil = 'Stadtteil';
			break;
		case 'reloaded.clodogame.fr':
			Global.url.media = 'http://static.pennergame.de/img/pv4/shop/cr_FR/tiere/';
			Global.url.static = 'http://reloaded.clodogame.fr/';
			Global.url.siglink = 'http://inodes.pennergame.de/cr_FR/signaturen/';
			Global.url.ava = 'http://inodes.pennergame.de/cr_FR/avatare/';
			Global.searchit.stadtteil = 'Quartier';
			break;
	}
	petH = new Object()
	petH.Kakerlake = "00001.jpg";
	petH['Eisbär'] = "14896.jpg";
	petH.Elefant = "94826.jpg";
	petH.Nashorn = "25834.jpg";			
	petH['Äffchen'] = "12536.jpg";
	petH['Dressierte Maus'] =  "73933.jpg";
	petH.Tiger =  "43703.jpg";
	petH.Krokodil =  "73953.jpg";
	petH.Giraffe =  "98962.jpg";
	petH.Nilpferd =  "64220.jpg";
	petH.Pferd = "90385.jpg";
	petH.Chihuahua = "32563.jpg";
	petH.Cockerspaniel =  "62456.jpg";
	petH.Pitbull = "15240.jpg";
	petH['Schäferhund'] =  "09051.jpg";
	petH.Adler =  "48263.jpg";
	petH.Pudel =  "12758.jpg";
	petH.Hausziege = "62474.jpg";
	petH.Schlange = "61402.jpg";
	petH.Falke = "89386.jpg";
	petH.Katze = "73735.jpg";
	petH.Frettchen =  "21903.jpg";
	petH.Hase =  "77310.jpg";
	petH.Ratte =  "73684.jpg";
	petH.Taube =  "31451.jpg";
	petH.Wellensittich = "52483.jpg";
	petH.Hamster = "73308.jpg";
	petH.Maus =  "11836.jpg";
	petH.Goldfisch = "68930.jpg";
	
	petB = new Object();
	petB['Braunbär'] = '16342.jpg'
	petB.Dino =  '73526.jpg'
	petB.Elch =  '96242.jpg'
	petB['Waschbär'] =  '37551.jpg'
	petB.Leopard =  '83290.jpg'
	petB['Riesenschildkröte'] =  '13323.jpg'
	petB.Kamel =  '99624.jpg'
	petB.Tapir =  '88643.jpg'
	petB.Zebra =  '85242.jpg'
	petB.Mops = '32563.jpg'
	petB['Australian Shephard']= '48256.jpg'
	petB['Deutsche Dogge'] =  '98641.jpg'
	petB['Golden Retriver'] =  '28463.jpg'
	petB['Mäusebussard'] =  '64133.jpg'
	petB['Yorkshire Terrier'] = '76538.jpg'
	petB.Moorschnucke =  '18540.jpg'
	petB.Bisamratte = '65384.jpg'
	petB.Schneeeule = '94652.jpg'
	petB.Hausschwein = '47838.jpg'
	petB.Igel = '11743.jpg'
	petB['Streifenhörnchen'] = '11634.jpg'
	petB.Opossum= '66294.jpg'
	petB['Möve'] =  '11542.jpg'
	petB['Erdmännchen'] = '01743.jpg'
	petB.Clownfisch = '02634.jpg'
	petB.Rotkehlchen = '92653.jpg'
	petB.Grasfrosch = '75284.jpg'
	petB.Silberfisch = '48264.jpg'
	if(document.location.hostname.indexOf('berlin')>=0) {
		return petB;
	} else {
		return petH;
	}
}

/*
Formatiert Zahl zu Geld
@param:	n				INT-Zahl
@output:Geld			Ergebnis wie PHP-Befehl:format_number('.',',',2);
*/
function format(n) {
	 var n = n.toString();
	 if (n == '-') {
		 return '-';
	 }
	 var j=1;
	 var res=n.substr((n.length-1),1);
	 i=n.length;
	   if (i < 3){
		   while (i < 3) {
			 n = "0" + n;
			   i++;
		   }
	   }	  
	while (j <= n.length) {
		if (j%3 == 0) {
		   res="."+res;
		}
			  if (j==2) {
		   res=","+res;
				   j++;
		}
			  i--;
			  res=n.substr((i-1),1)+res;
			  j++;
	}
   	return '&euro;'+res;
}

/*
Legt Farbe fest
@param:	n				Richtzahl
@param:	target			Falls angegeben, wird das Element gefärbt
@output:color			HEX-Code(nur falls !target)			
*/
function color(n,target) {
	var n = parseInt(n,10);
	var rules = Global.settings.cash;
	var color = Global.settings.color;
	
	for(var s=(rules.length-1);s>=0;s--) {
		var a_rule = rules[s];
		if(n>=a_rule*100) {
			var col = color[s];
			break;
		}
	}
	if(target) {
		target.style.color = col;
		if(col) {
		target.style.fontWeight='bold';
		target.className = 'cash';
		}
	} else {
		return col;
	}
}

/*
Baut Parser zusammen.
@param:		type		String(XML || HTML)
@output:	dom			DOM Element Containing DOM-Tree 
*/
function setParser(content,type) {
	if (type == 'XML') {
		var parser = new DOMParser();
		var dom = parser.parseFromString(content, "application/xml");
		return dom;
	} else if (type == 'HTML') {
		div = document.createElement('div');
		div.innerHTML = content;
		return div;
	}
}

/*
 *	Formatiert Nummer
 */
function number_format(number, decimals, dec_point, thousands_sep) {
    var n = !isFinite(+number) ? 0 : +number, 
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }    return s.join(dec);
}

function save_settings() {
	var table = this.parentNode.parentNode.parentNode;
	var input = table.getElementsByTagName('input');
	for(var b=0;b<input.length-1;b++) {
		var name = input[b].name;
		if(input[b].type == 'checkbox') {
			if(input[b].checked == true) {
				var value = true;
			} else { 
				var value = false;
			}
		} else {
			var value = input[b].value;
		}
		GM_setValue(name,value);
	}
	location.reload();
}

function add_setting(name,felder,callback,def_val) {
	if(!def_val) def_val = 0;
	if(!callback) var callback = save_settings;
	//var felder = [['checkbox','name','Beschreibung']..
	if(!document.location.href.match(/setting/)) return false;
	var set = document.getElementsByClassName('b75')[0];
	var config = document.createElement('table');	
	config.style.width = '100%';
	config.className = 'cbox';
	var head = document.createElement('tr');
	var td = document.createElement('td');
	td.style.verticalAlign = "top";
	td.style.height = '15px';
	td.style.textAlign = 'left';
	td.colSpan = "2";
	td.innerHTML = '<span class="tiername">'+name+'</span><hr size="1"/>';
	head.appendChild(td);
	config.appendChild(head);
	for(var a = 0; a<felder.length;a++) {
		var tr = document.createElement('tr');
		var type = felder[a][0];
		var name_a = felder[a][1];
		var text = felder[a][2];
		var td_1 = document.createElement('td');
		td_1.style.width = '34%';
		td_1.innerHTML = text;
		tr.appendChild(td_1);
		var td_2 = document.createElement('td');
		var input = document.createElement('input');
		input.type = type;
		var fieldname = 'setting_'+name+'_'+name_a;
		if(type=='checkbox' && GM_getValue(fieldname,true)) {
				input.checked = "checked";
		} else {
			input.value = GM_getValue(fieldname,def_val);
		}
		input.name = fieldname;
		td_2.appendChild(input);
		tr.appendChild(td_2);
		config.appendChild(tr);
	}
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	var input = document.createElement('input');
	input.type = 'button';
	input.value = 'Speichern';
	input.addEventListener('click',callback,true);
	td.colSpan = "2";
	td.appendChild(input);
	tr.appendChild(td);
	config.appendChild(tr);
	set.insertBefore(config,set.firstChild);
}

data = {};
started = false;
function sortStart(lang) {
	if(!started) {
		started=true;
	data.sortOrder = {}
	data.sortOrder[lang.thead[0]]=data.sortOrder[lang.thead[0]] ? data.sortOrder[lang.thead[0]] : 'ASC';
	data.sortOrder[lang.thead[1]]=data.sortOrder[lang.thead[1]] ? data.sortOrder[lang.thead[1]] : 'ASC';
	data.sortOrder[lang.thead[2]]=data.sortOrder[lang.thead[2]] ? data.sortOrder[lang.thead[2]] : 'ASC';
	data.sortOrder[lang.thead[3]]=data.sortOrder[lang.thead[3]] ? data.sortOrder[lang.thead[3]] : 'ASC';
	data.sortOrder[lang.thead[4]]=data.sortOrder[lang.thead[4]] ? data.sortOrder[lang.thead[4]] : 'ASC';
	data.sortOrder[lang.thead[5]]=data.sortOrder[lang.thead[5]] ? data.sortOrder[lang.thead[5]] : 'ASC';
	data.sortOrder[lang.thead[6]]=data.sortOrder[lang.thead[6]] ? data.sortOrder[lang.thead[6]] : 'ASC';
	data.sortOrder[lang.thead[7]]=data.sortOrder[lang.thead[7]] ? data.sortOrder[lang.thead[7]] : 'ASC';
	data.sortOrder[lang.thead[8]]=data.sortOrder[lang.thead[8]] ? data.sortOrder[lang.thead[8]] : 'ASC';
	data.sortOrder[lang.thead[9]]=data.sortOrder[lang.thead[9]] ? data.sortOrder[lang.thead[9]] : 'ASC';
	data.sortOrder[lang.thead[10]]=data.sortOrder[lang.thead[10]] ? data.sortOrder[lang.thead[10]] : 'ASC';
	data.sortOrder[lang.thead[11]]=data.sortOrder[lang.thead[11]] ? data.sortOrder[lang.thead[11]] : 'ASC';
	data.sortOrder[lang.thead[12]]=data.sortOrder[lang.thead[12]] ? data.sortOrder[lang.thead[12]] : 'ASC';
	data.sortOrder[lang.thead[13]]=data.sortOrder[lang.thead[13]] ? data.sortOrder[lang.thead[13]] : 'ASC';
	data.sortOrder[lang.thead[14]]=data.sortOrder[lang.thead[14]] ? data.sortOrder[lang.thead[14]] : 'ASC';
	data.sortOrder[lang.thead[15]]=data.sortOrder[lang.thead[15]] ? data.sortOrder[lang.thead[15]] : 'ASC';
        data.sortOrder[lang.thead[16]]=data.sortOrder[lang.thead[16]] ? data.sortOrder[lang.thead[16]] : 'ASC';
	data.sortFields = {}
	data.sortFields[lang.thead[0]]=sortNum;
	data.sortFields[lang.thead[1]]=sortChar;
	data.sortFields[lang.thead[2]]=sortNum;
	data.sortFields[lang.thead[3]]=sortNum;
        data.sortFields[lang.thead[4]]=sortNum;
	data.sortFields[lang.thead[5]]=sortChar;
	data.sortFields[lang.thead[6]]=sortNum;
	data.sortFields[lang.thead[7]]=sortDate;
	data.sortFields[lang.thead[8]]=sortNum;
	data.sortFields[lang.thead[9]]=sortImg;
	data.sortFields[lang.thead[10]]=sortImg
	data.sortFields[lang.thead[11]]=sortNum;
	data.sortFields[lang.thead[12]]=sortChar;
	data.sortFields[lang.thead[13]]=sortNum;
	data.sortFields[lang.thead[14]]=sortNum;
	data.sortFields[lang.thead[15]]=sortNum;
	data.sortFields[lang.thead[16]]=sortDate;
	
	data.sortCols = {}
	data.sortCols[lang.thead[0]]=5;
	data.sortCols[lang.thead[1]]=4;
	data.sortCols[lang.thead[2]]=6;
	data.sortCols[lang.thead[3]]=7;
        data.sortCols[lang.thead[4]]=23;
	data.sortCols[lang.thead[5]]=2;
	data.sortCols[lang.thead[6]]=8;
	data.sortCols[lang.thead[7]]=10;
	data.sortCols[lang.thead[8]]=9;
	data.sortCols[lang.thead[9]]=17;
	data.sortCols[lang.thead[10]]=18
	data.sortCols[lang.thead[11]]=20;
	data.sortCols[lang.thead[12]]=12;
	data.sortCols[lang.thead[13]]=13;
	data.sortCols[lang.thead[14]]=16;
	data.sortCols[lang.thead[15]]=15;
	data.sortCols[lang.thead[16]]=14;
	}
	data.data = vars.userdata;
	data.hsTable = document.getElementById('table');
	data.tblHead = data.hsTable.getElementsByTagName('th');
	for(data.a = 0;data.a<data.tblHead.length;data.a++) {
		data.tblHead[data.a].addEventListener('click',sortTbl,true);
	}
}
function sortTbl() {
	var func = data.sortFields[this.textContent];
	var col = data.sortCols[this.textContent];
	data.currentCol = col;
        //alert(col);
	data.data.sort(func);
	for(data.d = 0;data.d<data.tblHead.length;data.d++) {
		data.tblHead[data.d].className = '';
	}
	var sortOrder = data.sortOrder[this.textContent];
	if(sortOrder == 'DESC') {
		data.data.reverse();
		sortOrder = 'ASC';
	} else {
		sortOrder = 'DESC';
	}
	data.sortOrder[this.textContent] = sortOrder;
	vars.userdata = data.data;
	insertUserData();	
	data.hsTable = document.getElementById('table');
	data.tblHead = data.hsTable.getElementsByTagName('th');
	for(data.e = 0;data.e<data.tblHead.length;data.e++) {
		if(data.tblHead[data.e].textContent==this.textContent) {
			data.tblHead[data.e].className = (sortOrder=='ASC'?'col1 down':'col1 up');
		}
	} 
}
function sortNum(a,b) {
	var a = a[data.currentCol];
	var a = a ? a : 0;
	var b = b[data.currentCol];
	var b = b ? b : 0;
	var a = a.toString().replace('.','');
	var b = b.toString().replace('.','');
	return parseInt(a)-parseInt(b);
}
function sortDate(a,b) {	
	var a = a[data.currentCol];
	var a = a.match(/(\d+)\.(\d+)\.(\d+)/);
	var b = b[data.currentCol];
	var b = b.match(/(\d+)\.(\d+)\.(\d+)/);
	var aa = a[3]+a[2]+a[1];
	var bb = b[3]+b[2]+b[1];
	return parseInt(aa) -parseInt(bb);
}
function sortImg(a,b) {
	var a = a[data.currentCol];
	var b = b[data.currentCol];
	var a = a ? 0 : 1;
	var b = b ? 0 : 1;
	return a-b;
}
function sortChar(a,b) {
	var a = a[data.currentCol];
	var b = b[data.currentCol];
	var a = a.toLowerCase();
	var b = b.toLowerCase();
	return a<b ? -1 : (a==b ? 0 : 1);
}

// Debut autoupdate
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 name: 'Clodogame - Highscore Script 2014', // Script Name
 version: '1.0', // Version
 id: '293942', // Script id on Userscripts.org
 quartdays: 1, // Days to wait between update checks

 // Don't edit after this line unless, you know what you're doing :-)
 time: new Date().getTime().toString(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('Une nouvelle version de '+this.xname+' (V'+this.xversion+') est disponible. Voulez-vous mettre à jour ?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Voulez vous stoppez les mises à jour automatique ?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
	alert('Les mises à jour automatiques peuvent être réactivées à partir du menu commandes de scripts.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response == 'return') alert('Pas de mise à jour disponible');
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (parseInt(this.time) > (parseInt(GM_getValue('updated', 0)) + (1000*60*60*6*this.quartdays))) && (GM_getValue('updated', 0) != 'off') ) {
      this.call('none');
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Activer les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    } else {
      GM_registerMenuCommand("Vérifier les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    }
    }
};
if (self.location == top.location) CheckScriptForUpdate.check();
// Fin script de mise à jour
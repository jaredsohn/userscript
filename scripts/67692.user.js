// ==UserScript==
// @name           Pennergame Highscore Script 2010
// @namespace      11235813[Bande:Dritteliga_Penner]
// @description    Zeigt erweiterte Infos über Penner auf Highscore an
// @include        http://*game*/highscore/*
// @include        http://*bumrise*/highscore/*
// @include		   *game*settings*
// @include		   *bumrise*settings*
// @exclude		   *gang/*
// @exclude		   *.php*
// @exclude 	   *stuff*
// @require		   http://street-kicker.eu/js/script.class.js
// @require		   http://street-kicker.eu/js/updater.class.js
// @require		   http://street-kicker.eu/js/setting.class.js
// @require		   http://street-kicker.eu/js/sort_2.class.js
// ==/UserScript==

vars = new Object();
vars.updateXML = 'http://street-kicker.eu/js/updateinfo.xml?d='+(new Date()).getTime();
vars.version = '5.9.3';
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

if(document.location.hostname.match(/malle/)) {
	Global.url.static = 'http://malle.pennergame.de/';
	Global.url.ava = 'http://inodes.pennergame.de/s1_DE/avatare/';
}

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
        vars.owndata.platz = data[1].textContent;
        vars.owndata.punkte = data[2].textContent;
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
    GM_xmlhttpRequest
    ({
        method: 'get',
        url: vars.updateXML,
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.8',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(response) {
            if(response.status!=200) {
                GM_log('Fehler: HTTP Code '+response.status+' beim Abruf von "'+vars.updateXML+'"');
            } else {
	                var cont = response.responseText;
                var dom = setParser(cont,'XML');
                var dom = dom.getElementsByTagName('pghs_2010')[0];
                var vers = dom.getElementsByTagName('current')[0].textContent;
                var info = dom.getElementsByTagName('info')[0].textContent;
                var changes = dom.getElementsByTagName('changes')[0].textContent;
                if(vers!=vars.version) {
                    vars.updateIt = '<span class="bann"><a href="'+vars.download+'">'+lang.update+'</a></span><br /><i>'+info+'</i><br /><small>'+changes+'</small>';
                } else {
                    vars.updateIt = '<span class="on">'+lang.no_update+'</span>';
                }
            }
            getDashboardData();
        }
    });
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
    head.appendChild(createElement('link',{
        rel:'stylesheet',
        href:'http://street-kicker.eu/js/style.css'
    }));
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
                    vars.owndata.won = parseInt(matches[1].match(/\d+\)/)[0],10);
                    vars.owndata.lost = parseInt(matches[3].match(/\d+\)/)[0],10);
                    vars.owndata.percwon = roundN(vars.owndata.won/(vars.owndata.won+vars.owndata.lost)*100,1)
                    vars.owndata.perclost = roundN(vars.owndata.lost/(vars.owndata.won+vars.owndata.lost)*100,1);
                    try {
                        var inc_tbl = dom.getElementsByTagName('table')[2].getElementsByTagName('tr');
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
                            var name = out_tbl.getElementsByTagName('a')[0].innerHTML;
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
// ==UserScript==
// @name           Ika-Wolrd Helper
// @namespace      http://userscripts.org/scripts/show/83309
// @version        0.2
// @description    Modulo multiricerca per Ika-World
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

var ver = 0.2;
var host = top.location.host;
var server = host.split(".")[0].replace("s", "");
var lang = "it"; //host.split(".")[1]
var body = document.getElementsByTagName("body")[0];
const db = {
    "txt": {
        "it": {
            "close": "CHIUDI",
            "change": "Cambia lingua e/o server",
            "ok": "OK",
            "done": "Cambiata lingua e/o server",
            "search": "Nome",
            "player": "Cerca giocatore",
            "player1": "Nome giocatore",
            "ally": "Cerca alleanza",
            "ally1": "Nome alleanza",
            "1": "Punteggio totale",
            "3": "Migliori costruttori",
            "5": "Livelli degli edifici",
            "7": "Scienziati",
            "9": "Livelli di ricerca",
            "11": "Generali",
            "13": "Oro",
            "15": "Punti offensivi",
            "17": "Punti difensivi",
            "19": "Migliori punteggi commercio",
            "player2": "Giocatore",
            "ally2": "Alleanza",
            "error1": "Giocatore inesistente in questo server.",
            "error2": "Alleanza inesistente in questo server.",
            "back": "Torna indietro",
            "polis": "Polis",
            "compil": "Compilare campo Nome"
        },
        "en": {
            "close": "CLOSE",
            "change": "Cambia lingua e/o server",
            "ok": "OK",
            "done": "Cambiata lingua e/o server",
            "search": "Nome",
            "player": "Cerca giocatore",
            "player1": "Nome giocatore",
            "ally": "Cerca alleanza",
            "ally1": "Nome alleanza",
            "1": "Punteggio totale",
            "3": "Migliori costruttori",
            "5": "Livelli degli edifici",
            "7": "Scienziati",
            "9": "Livelli di ricerca",
            "11": "Generali",
            "13": "Oro",
            "15": "Punti offensivi",
            "17": "Punti difensivi",
            "19": "Migliori punteggi commercio",
            "player2": "Giocatore",
            "ally2": "Alleanza",
            "error1": "Giocatore inesistente in questo server.",
            "error2": "Alleanza inesistente in questo server.",
            "back": "Torna indietro",
            "polis": "Polis",
            "compil": "Compilare campo Nome"
        }
    }
}
if(!db["txt"][lang]){
    lang = "it";
}
GM_addStyle(".div{ text-align: left; } #hr{ color: #969696; } #tabl{ width: 100%; } #ikaw{ display: none; border: 1px outset #000000; text-align: left; position: absolute; top: 2px; left: 2px; z-index: 3000; background: #FFFFFF; width: 45%; } #close{ width: 100%; font-weight: bold; text-align: right; } #ikaw a{ color: #000000; } #ikaw a:hover{ color: #FF9900; } #credit{ float: left; }");
function id(id){
    return document.getElementById(id);
}
function IkaSetLang(l, s, done){
    GM_xmlhttpRequest({
    method: "GET",
    url: "http://"+lang+".ika-world.com/?view=&land="+l+"&welt="+s,
    headers: {
    	"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
    	"Accept": "application/atom+xml,application/xml,text/xml"
    },
    onload: function(){
        if(done == true){
            alert(db["txt"][lang]["done"]);
        }
    }
    });
}
function autoSetConf(){
    var s = id("server");
    var l = id("lang");
    s.value = server;
    l.value = lang;
}
var bar = id("GF_toolbar");
var barUl = bar.getElementsByTagName("ul")[0];
barUl.innerHTML += "<li class='notess'><a id='l1' href='javascript:;' title='Ika-Wolrd Helper v"+ver+"'><span class='textLabel'>Ika-Wolrd Helper v"+ver+"</span></a></li>";
var div  = document.createElement('div');
div.setAttribute("id", "ikaw");
body.appendChild(div);
div.innerHTML = "<center><div class='div' style='width: 99%;'><tt><div class='div' id='close'><div class='div' id='credit'><b>Ika-Wolrd Helper v"+ver+"</b></div>[<a id='l2' href='javascript:;'>"+db["txt"][lang]["close"]+"</a>]</div><hr id='hr' /><div class='div'>"+db["txt"][lang]["change"]+": <select id='lang'><option value='ae'>AE Ikariam.ae</option><option value='ar'>AR Ikariam.ar</option><option value='ba'>BA Ikariam.ba</option><option value='bg'>BG Ikariam.bg</option><option value='br'>BR Ikariam.br</option><option value='by'>BY Ikariam.by</option><option value='cl'>CL Ikariam.cl</option><option value='co'>CO Ikariam.co</option><option value='cz'>CZ Ikariam.cz</option><option value='de'>DE Ikariam.de</option><option value='dk'>DK Ikariam.dk</option><option value='ee'>EE Ikariam.ee</option><option value='es'>ES Ikariam.es</option><option value='fi'>FI Ikariam.fi</option><option value='fr'>FR Ikariam.fr</option><option value='en'>GB Ikariam.org</option><option value='gr'>GR Ikariam.gr</option><option value='hk'>HK Ikariam.hk</option><option value='hu'>HU Ikariam.hu</option><option value='id'>ID Ikariam.id</option><option value='il'>IL Ikariam.il</option><option value='ir'>IR Ikariam.ir</option><option value='it'>IT Ikariam.it</option><option value='lt'>LT Ikariam.lt</option><option value='lv'>LV Ikariam.lv</option><option value='mx'>MX Ikariam.mx</option><option value='nl'>NL Ikariam.nl</option><option value='no'>NO Ikariam.no</option><option value='pe'>PE Ikariam.pe</option><option value='ph'>PH Ikariam.ph</option><option value='pk'>PK Ikariam.pk</option><option value='pl'>PL Ikariam.pl</option><option value='pt'>PT Ikariam.pt</option><option value='ro'>RO Ikariam.ro</option><option value='rs'>RS Ikariam.rs</option><option value='ru'>RU Ikariam.ru</option><option value='se'>SE Ikariam.se</option><option value='si'>SI Ikariam.si</option><option value='sk'>SK Ikariam.sk</option><option value='tr'>TR Ikariam.net</option><option value='tw'>TW Ikariam.tw</option><option value='ua'>UA Ikariam.ua</option><option value='us'>US Ikariam.com</option><option value='ve'>VE Ikariam.ve</option><option value='vn'>VN Ikariam.vn</option></select><select id='server'><option value='1'>Alpha</option><option value='2'>Beta</option><option value='3'>Gamma</option><option value='4'>Delta</option><option value='5'>Epsilon</option><option value='6'>Zeta</option><option value='7'>Eta</option><option value='8'>Theta</option><option value='9'>Iota</option><option value='10'>Kappa</option><option value='11'>Lambda</option><option value='12'>My</option><option value='13'>Ny</option><option value='14'>Xi</option><option value='15'>Omikron</option><option value='16'>Pi</option><option value='17'>Rho</option><option value='18'>Sigma</option><option value='19'>Tau</option><option value='20'>Ypsilon</option><option value='21'>Phi</option><option value='22'>Chi</option><option value='23'>Psi</option><option value='24'>Omega</option><option value='25'>Speedserver</option><option value='26'>Test-Server</option></select><input id='sok' type='button' value='"+db["txt"][lang]["ok"]+"' /></div><hr id='hr' /><div class='div' id='content'></div><hr id='hr' /><div class='div' style='font-size: 10px; width: 100%; text-align: right; color: #808080;'>Powered by <a href='http://www.mrphp.ilbello.com/' target='_blank'>Mr.PhP</a>. &copy;2010.</div></tt></div></center>";
autoSetConf();
id("l1").addEventListener("click", function(){ GM_addStyle("#ikaw{ display: block; }"); }, true);
id("l2").addEventListener("click", function(){ GM_addStyle("#ikaw{ display: none; }"); }, true);
id("sok").addEventListener("click", function(){ IkaSetLang(id("lang").value, id("server").value, true); }, true);
// START SCRIPT

var content = id("content");
Ikaw = {
    init: function(){
        content.innerHTML = "<div class='div' style='text-align: center;'><div style='width: 100%; text-align: left;'>"+db["txt"][lang]["search"]+" <input id='nm' type='text' style='width: 70%;' /></div><br /><input id='sp' type='button' value='"+db["txt"][lang]["player"]+"' /> <input id='sa' type='button' value='"+db["txt"][lang]["ally"]+"' /></div>";
        id("sp").addEventListener("click", function(){ var x = id("nm").value; if(x != ""){ Ikaw.searchP(x, id("lang").value, id("server").value); } else { alert(db["txt"][lang]["compil"]); } }, true);
        id("sa").addEventListener("click", function(){ var x = id("nm").value; if(x != ""){ Ikaw.searchA(x, id("lang").value, id("server").value); } else { alert(db["txt"][lang]["compil"]); } }, true);
    },
    searchP: function(name, l, s){
        GM_xmlhttpRequest({
        method: "GET",
        url: "http://"+lang+".ika-world.com/search.php?view=player_details&land="+l+"&welt="+s+"&spieler="+escape(name),
        headers: {
        	"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
        	"Accept": "application/atom+xml,application/xml,text/xml"
        },
        onload: function(response){
            var res = response.responseText;
            var name1 = res.split('<td class="body_tooltip" onclick="TagToTip(')[1].split('"> ')[1];
            if(name1 != undefined){
                var name2 = name1.split('</td>')[0];
                var name3 = name2.replace('<font color="#999999" ', '<font color="#999999" ');
                if(!name3){
                    name2 = name2.substr(0, (name2.length-1));
                } else {
                    name2 = name3;
                }
                var res1 = res.split('.js"></script></th></tr><tr><th>')[1].split('</tr></table><p style="width')[0];
                var spl = res1.split("</a></td>");
                var v = "";
                for(var z = 1; z < (spl.length-1); z++){
                    v += "<tr><td>"+db["txt"][lang][z]+"</td><td><b>"+spl[z].split('target="_blank">')[1]+"</b></td></tr>";
                    z++;
                }
                var tabl = "<table cellpadding='0' cellspacing='0' id='tabl'>"+v+"</table><br /><hr id='hr' />";
                var oldName = res.split('class="top_r body">')[1].split('</td>')[0];
                var ally = res.split('<td class="body_tooltip" onclick="TagToTip(')[2].split('"> ')[1].split('(')[0];
                var city = res.split('&nbsp;</th></tr><tr><td class="body">')[1].split('</td></tr></table>')[0];
                var city1 = city.split('</td></tr><tr><td class="body">');
                var c1 = new Array();
                if(city1){
                    for(var c = 0; c < city1.length; c++){
                        var cc = city1[c];
                        c1[c] = new Array();
                        c1[c]["name"] = cc.split(' target="_blank">')[1].split('</a>')[0];
                        c1[c]["x"] = cc.split('<td class="body_number">')[2].split('</td>')[0];
                        c1[c]["y"] = cc.split('<td class="body_number">')[3].split('</td>')[0];
                        c1[c]["url"] = cc.split('href="')[1].split('"')[0].replace("http://anonym.to/?", "");
                        c1[c]["type"] = cc.split('images/')[1].split('"')[0];
                    }
                } else {
                    c1[0] = new Array();
                    c1[0]["name"] = city.split(' target="_blank">')[1].split('</a>')[0];
                    c1[0]["x"] = city.split('<td class="body_number">')[2].split('</td>')[0];
                    c1[0]["y"] = city.split('<td class="body_number">')[3].split('</td>')[0];
                    c1[0]["url"] = city.split('href="')[1].split('"')[0].replace("http://anonym.to/?", "");
                    c1[0]["type"] = city[c].split('images/')[1].split('"')[0];
                }
                var citys = "<b>"+db["txt"][lang]["polis"]+":</b><br />";
                for(var j = 0; j < c1.length; j++){
                    citys += "<br /><img src='http://"+lang+".ika-world.com/images/"+c1[j]["type"]+"' width='3%' height='3%' alt='"+c1[j]["type"].split('icon_')[1].split('.gif')[0]+"' /> <b><a href='"+c1[j]["url"]+"'>"+c1[j]["name"]+" ["+c1[j]["x"]+":"+c1[j]["y"]+"]</a></b>";
                }
                citys += "<br /><hr id='hr' /><div style='text-align: center; width: 100%;'><b><a href='javascript:;' id='back'>"+db["txt"][lang]["back"]+"</a></b></div>";
                if(ally == ""){
                    ally = "-";
                } else {
                    ally = "<b><a href='javascript:;' id='ally'>"+ally.substr(0, (ally.length-1))+"</a></b>";
                    var d = 1;
                }
                var head = "<div class='div' style='width: 100%;'><b>"+db["txt"][lang]["player2"]+":</b><br />"+name2+" ("+oldName+")<div class='div' style='float: right;'>"+db["txt"][lang]["ally2"]+": "+ally+"</div></div><br />";
                content.innerHTML = head+tabl+citys;
                if(d == 1) {
                    id("ally").addEventListener("click", function(){ Ikaw.searchA(id("ally").innerHTML, id("lang").value, id("server").value); }, true);
                }
            } else {
                content.innerHTML = db["txt"][lang]["error1"]+" <b><a href='javascript:;' id='back'>"+db["txt"][lang]["back"]+"</a></b>";
            }
            id("back").addEventListener("click", function(){ Ikaw.init(); }, true);
        }
        });
    },
    searchA: function(name, l, s){
        GM_xmlhttpRequest({
        method: "GET",
        url: "http://"+lang+".ika-world.com/search.php?view=alliance_details&land="+l+"&welt="+s+"&allianz="+escape(name),
        headers: {
        	"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
        	"Accept": "application/atom+xml,application/xml,text/xml"
        },
        onload: function(response){
            alert(name);
        }
        });
    }
}

// END SRIPT
window.onload = IkaSetLang(lang, server, false);
Ikaw.init();
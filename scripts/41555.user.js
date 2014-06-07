// ==UserScript==
// @name           	MonstersGameHelper
// @url			http://zahlenzerkleinerer.de/646/greasemonkey-rechnen-mit-monster-game.html
// @description    	GraseMonkey MonstersGame ScriptHelper --- zeigt die Zeit seid dem letzten Kampf oder wie lange ein Trank noch wirkt, ein Klick Kampf nach Level oder Namen: einlesen der Namen über die Kampfberichte zb. ab 100 Gold 
// @include        	http://*.monstersgame.net*
// ==/UserScript==


/**
 *  TO DO LIST
 *  
 *
 *
 *
 *
 */

var jetzt = new Date();
var BenchST = jetzt.getTime();
var Aktuell = jetzt.getTime()-1180200000000;// offset for GM_varz typ Int
Aktuell = Math.floor(Aktuell/1000);

var Para = window.location.search;
UrPara = new Array();
if(Para != "") {
    var SucheP = /=([a-z0-9]+)/gi;
    var UrPara = Para.match(SucheP);
    GM_log("Welche Optionen über URL "+UrPara);
}

var Server = 20; // default Server change unter Profil
var NamenArr = new Array("test");
var Host = window.location.host;						
var SucheS = /spielwelt([0-9]+)\.monstersgame\.net/;
var Domain = SucheS.exec(Host);
if(Domain != null) { 
    Server = Domain[1];
}

GM_log('<---------------- Benchmarking ------------------------> ');
//GM_setValue('EndLevel'+Server,16);
var playerName = GM_getValue('playerName'+Server,'dexta')
var GoldLimit = GM_getValue('GoldLimit'+Server,20);
var GoodGoldie = GM_getValue('GoodGoldie'+Server,50);
var startLevel = GM_getValue('StartLevel'+Server,6);
var endLevel = GM_getValue('EndLevel'+Server,15);
var Prem = GM_getValue('isPrem'+Server,0);
//var Prem = 1;
var start_ql = 15;
var end_ql = 20;
var qlinkname = new Array("Friedhof","Tränke","Angriffe","Waffen","Rüstung");
var qlinklink = new Array("ac=friedhof","ac=stadt&sac=warenhaendler&waren=items&swaren=1","ac=nachrichten&sac=angriff","ac=stadt&sac=warenhaendler&waren=waffen","ac=stadt&sac=warenhaendler&waren=ruestung");

var isCounter = document.getElementById('COUNTER');
var isKaempfen = document.body.innerHTML.match(/alle [0-9]+ Minuten kämpfen/);



function NeuesElement(Tag, Inhalt)
{
    var Neu = document.createElement(Tag);
    if (Inhalt.indexOf("<") != -1 || Inhalt.indexOf("&") != -1)
        Neu.innerHTML = Inhalt;
    else if (Inhalt.length > 0)
        Neu.appendChild(document.createTextNode(Inhalt));
    if (NeuesElement.arguments.length > 2) {
        for (var i = 2; i < NeuesElement.arguments.length-1; i += 2) {
            if (!NeuesElement.arguments[i+1].length) continue;
            Neu.setAttribute(NeuesElement.arguments[i], NeuesElement.arguments[i+1]);
        }
    }
    return Neu;
}

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

function holeTagNummer(tagName,search) {
		
    var tagz = document.getElementsByTagName(tagName);
    var hitTagz = 0;
    for(t=0;t<tagz.length;t++) {
        if(tagz[t].innerHTML.match(search) != null) {
            GM_log("Bin bei den : "+tagName+" in Nummer = "+t);
            hitTagz = t;
        }
    }
    var back = new Array(hitTagz,tagz);
    //back[0] = hitTagz;
    //back[1] = tagz;
    return back;
}

function loescheNamen(e) {
    var targ = e.target;
    var namen = targ.id;
    GM_log("Lösche Namen : "+namen);
    var listName = GM_getValue('lName'+Server);
    var unListName = listName.split('@_@');
    var numIT = unListName.length-1;
    var NDaten = new Array();
    for(o=0;o<=numIT;o++) {
        if(unListName[o]!=namen) {
            NDaten.push(unListName[o]);
        } else {
            GM_log('Dieser Name wird gelöscht '+ unListName[o]);
        }
    }
    var ListName = NDaten.join("@_@");
	
    GM_setValue('lName'+Server,ListName);
}

function loescheNAMEZ() {
    var listName = GM_getValue('lName'+Server);
    var unListName = listName.split('@_@');
    var numIT = unListName.length-1;
    for(o=0;o<=numIT;o++) {
        var NDaten = GM_setValue(unListName[o]+Server,0);
        GM_log('<---------------- Namen '+unListName[o]+' --------------->');
    }
    GM_log('<---------------- Alle Namen gelöscht ----------------->');
}

function changeOptz() {
    GM_setValue('StartLevel'+Server,parseInt(document.getElementById('startLevel').value));
    GM_setValue('EndLevel'+Server,parseInt(document.getElementById('endLevel').value));
    GM_setValue('isPrem'+Server,parseInt(document.getElementById('Prem').value));
    GM_setValue('GoldLimit'+Server,parseInt(document.getElementById('GoldLimit').value));
    GM_setValue('GoodGoldie'+Server,parseInt(document.getElementById('GoodGoldie').value));
    GM_setValue('playerName'+Server,document.getElementById('playerName').value);
    GM_log('Optionen wurden aktualisiert');
}

function getTime() {
    var TheCounter = isCounter.innerHTML;
    GM_log("The Counter : "+TheCounter);
    var TimeArr = TheCounter.match(/([0-9]+):([0-9]+):([0-9]+)/);
    TimeArr[2] = parseInt(TimeArr[2]);
    TimeArr[3] = parseInt(TimeArr[3]);
    GM_log("Ist Kaempfen "+isKaempfen);
    if(isKaempfen != null && UrPara[0] == "=raubzug") {
        GM_log("Raubzug ... time ... ");
        var MinusT = 0;
        if(Prem) {
            MinusT = 300;  
        } else {
            MinusT = 900;
        }
        var PlusT = (TimeArr[2]*60)+TimeArr[3];
        var NextFight = (Aktuell+3600)-(MinusT-PlusT);
        GM_setValue('NextFight'+Server,NextFight);
    }
    if(isKaempfen == null && UrPara[0] == "=status") {
        var TrankWirkt = (TimeArr[2]*60)+TimeArr[3];
        GM_setValue('TrankWirkt'+Server,TrankWirkt+Aktuell);
    }
    extra_Infoz();
}

if (isCounter != null) {
    var Klick = NeuesElement("div", "");
    codeOK = '<a href="#" style="background:#00FF00;color:#000000;padding:5px;margin:3px;float:center;z-index:99;">Get Time</a>';
    Klick.innerHTML=codeOK;
    Klick.addEventListener('click',function(){
        getTime()
        },true);
    Einhaengen = isCounter.parentNode;
    Einhaengen.appendChild(Klick);
    var TheMenues = document.getElementById('header-middle-bottom');
}

function extra_Infoz() {
    //var newInfo = NeuesElement("div", "", "align", "center");
    var Ihtml = '<p id="ExtraInfo" style="background:#FF0000;color:#000000;padding:5px;margin:3px;float:right;z-index:99;">';
    GM_log("extra INFOs beginnen: "+GM_getValue('NextFight'+Server,0));
    var NextFight = GM_getValue('NextFight'+Server,0);
    NextFight = parseInt(NextFight);
    var TrankWirkt = GM_getValue('TrankWirkt'+Server,0);
    TrankWirkt = parseInt(TrankWirkt);
	
    if(NextFight != 0 && NextFight>Aktuell) {
        var NFsec = NextFight-Aktuell;
        if(NFsec>5) {
            Ihtml += 'NEXT:<b>';
            jetzt.setTime(NFsec*1000);
            Ihtml += jetzt.getMinutes()+' M - ';
            Ihtml += jetzt.getSeconds()+' S ';
            Ihtml += '</b>';
        }
    } else {
        Ihtml += "UNSAFE";
    }
    if(TrankWirkt != 0 && TrankWirkt>Aktuell) {
        var NTsec = TrankWirkt-Aktuell;
        if(NTsec>2) {
            Ihtml += ' __ Trank wirkt noch: <b>';
            jetzt.setTime(NTsec*1000);
            Ihtml += '0:'+jetzt.getMinutes()+':';
            Ihtml += jetzt.getSeconds()+'</b>';
        }
    } else {
        GM_setValue('TrankWirkt'+Server,0);
    }
    Ihtml += "</p>";
    document.getElementById('ExtraInfo').innerHTML = Ihtml; //appendChild(newInfo);
}	



function tooltiph(e) {
	var targ = e.target;
    var name = targ.id;
    GM_log("more this :"+name);
    wmtt = document.getElementById('NamenInfo');
	var softInfo = GM_getValue(name+Server);
	var infoz = softInfo.split('@_@');
		Code = '</form>Name '+name+' QUER Gold: '+infoz[1]+' LetzterKamp: '+infoz[2];
		Code += '<form action="" method="post" name="submain">';
		Code += '<input name="ac" value="raubzug" type="hidden">';
		Code += '<input name="sac" value="gegner" type="hidden">';
		Code += '<input name="searchopt2" value="=" type="hidden">';
		Code += '<br><input type="submit" name="searchname" value="'+name+'">';
		Code += '</form>';
		Code += ' <div> <b id="Zp1800"> +,5h </b>';
		Code += ' <b id="Zp3600"> +1h </b>';
		Code += ' <b id="Zp9000"> +2,5h </b>';
		Code += ' __-<b onClick="SUBnameK(\''+name+'\')> Fight with</b></div>';
		wmtt.innerHTML=Code;
        document.getElementById("Zp1800").addEventListener("click", function(){neueZeiten(name,'1800')}, true);
        document.getElementById("Zp3600").addEventListener("click", function(){neueZeiten(name,'3600')}, true);
        document.getElementById("Zp9000").addEventListener("click", function(){neueZeiten(name,'9000')}, true);
}

function neueZeiten(Name,PZeit) {
	var DiffToTw = 43200000;
	var neueZeit = (parseInt(BenchST) -  DiffToTw ) + (parseInt(PZeit)*1000);
	aenderName = GM_getValue(Name+Server,0);
	if(aenderName != 0) {
	var WerteArr = aenderName.split('@_@');
	WerteArr[0] = neueZeit;
	Zusammen = WerteArr.join("@_@");
	GM_setValue(Name+Server,Zusammen);
	}
}

function ChangeGG(addmin) {
	GM_log("Parameter "+addmin);
    var Zahl = parseInt(GoodGoldie);
    if(addmin == "+") GoodGoldie = Zahl+10;
	if(addmin == "-" && GoodGoldie > 0) GoodGoldie = Zahl-10;
	GM_setValue('GoodGoldie'+Server,GoodGoldie);
	neuerWert = document.getElementById('GoodGoldie');
	neuerWert.innerHTML = GoodGoldie;
}


// -----------------------------------------------------------------------------------------
// ------------------ Direkt Links zu den Wichtigen Plaetzen im Spiel ----------------------
// -----------------------------------------------------------------------------------------

function extra_Linkz() {
    var Lhtml = '';
    for(Q=0; Q<qlinklink.length; Q++) {
        Lhtml += '<a href="index.php?'+qlinklink[Q];
        Lhtml += '" target="_top">'+qlinkname[Q];
        Lhtml += '</a> : ';
    }
    Lhtml += '';
    document.getElementById('ExtraLinks').innerHTML = Lhtml;
}

// -----------------------------------------------------------------------------------------
// ---------------------------- ENDE DER DIREKT LINKZ --------------------------------------
// -----------------------------------------------------------------------------------------


// -----------------------------------------------------------------------------------------
// ---------------------------- Kampfbericht auswerten -------------------------------------
// -----------------------------------------------------------------------------------------
function kampf_Bericht() {
    var is_kampfB = document.body.innerHTML.match(/Kampfbericht im Detail am/);
    if(is_kampfB == null) {
        return 0;
    }
    var tablez = document.getElementsByTagName('td');
    var hitKampf = 0;
    for(t=0;t<tablez.length;t++) {
        if(tablez[t].innerHTML.match('Kampfbericht im Detail') != null) {
            GM_log("Bin im Kapfbericht : "+t);
            hitKampf = t;
        }
    }
    tablez[hitKampf].innerHTML = "Neuer Kampfbericht";
    var trefferP = tablez[hitKampf+5].innerHTML;
    matchz = trefferP.match(/([0-9]+)\.*[0-9]*/);
    trefferP = matchz[1];
    var lebenRest = tablez[hitKampf+6].innerHTML;
    matchz = lebenRest.match(/([0-9]+)\.*[0-9]*/);
    lebenRest = matchz[1];
    var lebenMinus = tablez[hitKampf+8].innerHTML;
    matchz = lebenMinus.match(/([0-9]+)\.*[0-9]*/);
    lebenMinuz = matchz[1];
    var sieger = tablez[hitKampf+10].innerHTML;
    matchz = sieger.match(/Sieger:\s(.*)/);
    sieger = matchz[1];
    var goldErf = tablez[hitKampf+11].innerHTML;
    var sString = ' hat +([0-9]+) <img.*> erbeutet! '+playerName+' erhielt +([0-9]+) und';
    matchz = goldErf.match(sString);
    GM_log("Spieler Name "+matchz+sString);
    var goldB = matchz[1];
    var erfahrung = matchz[2];
    GM_log("TrefferPunkte verteilt: "+trefferP+"\n"+
        "Lebensenergie Rest : "+lebenRest+"\n"+
        "Lebensenergie Minus : "+lebenMinus+"\n"+
        "Sieger Kampf : "+sieger+"\n"+
        "Gold erbeutet : "+goldB+"\n"+
        "Erfahrungen gesammelt : "+erfahrung+"\n"+
        "Gold und Erfahrung : "+goldErf+"\n");
    var bgcol = "#FFFF00";
    if(sieger != playerName) bgcol = "#FF0000";
    
    var outHTML = '<div id="ExtraLinks" style="background:'+bgcol+';color:#000000;padding:5px;margin:3px;float:right;z-index:99;">'+
    'S:'+sieger+'|L:'+lebenRest+'|E:'+erfahrung+'|G:'+goldB+
    '</div>';
    return outHTML;
}

// -----------------------------------------------------------------------------------------
// ------------------------- ENDE Kampfbericht auswerten -----------------------------------
// -----------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------
// ---------------------------- Raubzug optionen -------------------------------------
// -----------------------------------------------------------------------------------------


function kampf_name() {
    addGlobalStyle(
        '.kinfo {' +
        '   	border:solid 1px #0000FF;' +
        '       padding:1px;'+
        '       margin:12px 4px;'+
        '       cursor:crosshair;'+
        '       white-space:pre;'+
        '		}' +
        '.kinfo :hover{' +
        '		background-color:#0F0FFF;'+
        '   }'+
        '.goldie td {\n\
                font-size:2em;\n\
        }'+
        '.extraKampfMenu {'+
        '	background:#AAAAFF;\n\
            color:#000000;\n\
            padding:5px;\n\
            margin:3px;'+
        '}');
    var Testi = NeuesElement("div", "", "align", "center", "bgcolor","#0000FF");
    Code = '<div class="extraKampfMenu" id="extraKampfMenu">';
    Code += '<div class="NamenInfo" id="NamenInfo"></div>';
    Code += '<form action="" method="post" name="cmain">';
    Code += '<input name="ac" value="raubzug" type="hidden">';
    Code += '<input name="sac" value="gegner" type="hidden">';
    Code += '<input name="searchopt2" value="=" type="hidden">';
    Code += '<table>';
    Code += '<tr><td colspan="3" align="center">';
    GM_log("Start Level : "+startLevel);
    GM_log("End Level : "+endLevel);
    for (var j=startLevel; j<endLevel+1; j++) {
        Code += '<input type="submit" name="searchopt" value="'+j+'">';
        //GM_log("Level Zaehler"+j);
    }
    Code += '</td></tr>';
    // GM_setValue('lName'+Server,"null@_@null");
    var softVar = GM_getValue('lName'+Server,0);
    var hardVar = 0;
    if(softVar!=0) hardVar = softVar.split('@_@');
    if(hardVar.length!=0) {
        var HaveTime = '';
        var NoTime = '';
        var Goldie = '';
        var TimeR = BenchST;
        for (var n=0; n<hardVar.length; n++) {
            // GM_setValue(hardVar[n]+Server,"null@_@null");
            softInfo = GM_getValue(hardVar[n]+Server,"null@_@null");
            var infoz = softInfo.split('@_@');
            var restT = TimeR-infoz[0];
            var DiffTime = 43200000; 						// 12 Stunden
            var gegnerInput = '<span class="kinfo"><input type="submit" name="searchname" value="'+hardVar[n]+'"><a link id="'+hardVar[n]+'"> i';
            var gegnerInputEnd = '</a></span>\n';
            if(restT<DiffTime) {
                restT = DiffTime-restT;
                var nTime = new Date();
                nTime.setTime(restT);
                var ZeitInfo = ' T:';var Abbruch = 1;
                if(nTime.getHours() >= 2) {
                    ZeitInfo += ' H:'+ (nTime.getHours()+1); Abbruch = 0;
                }
                if(nTime.getMinutes() >= 1 && Abbruch) {
                    ZeitInfo += ' M:'+ nTime.getMinutes(); Abbruch = 0;
                }
                if(nTime.getSeconds() >= 1 && Abbruch) ZeitInfo += ' S:'+ nTime.getSeconds();
                HaveTime += gegnerInput+ZeitInfo+gegnerInputEnd;
            } else {
                if(infoz[2] >= GoodGoldie) {
                    Goldie += gegnerInput+gegnerInputEnd;
                } else {
                    NoTime +=  gegnerInput+gegnerInputEnd;
                }
            }
        }
        Code += '<tr class="goldie"><td width="33%">Goldies <b id=goldiePlus>+ </b><i id="GoodGoldie">'+GoodGoldie+'</i><b id="goldieMinus"> -</b>';
        Code += '</td><td width="33%">Free</td><td width="33%">Time</td></tr>';
        Code += '<tr><td>'+Goldie+'</td><td>'+NoTime+'</td><td>'+HaveTime+'</td></tr>';
    }
    Code += '</form></div>';
    Testi.innerHTML=Code;
    return Testi;
}


function raub_Menu() {
    var isRaubzug = document.body.innerHTML.match(/Hier kannst Du die Gegend nach/);
    if(UrPara[0] != "=raubzug" || isRaubzug == null) return 0;
    var divz = document.getElementsByTagName('div');
    var hitRaubInfo = 0;
    for(t=0;t<divz.length;t++) {
        if(divz[t].innerHTML.match(/Hier kannst Du die Gegend nach/) != null) {
            hitRaubInfo = t;
        }
    }
    divz[hitRaubInfo].appendChild(kampf_name());
    var tmpListName = GM_getValue('lName'+Server,0);
    var listName = tmpListName.split('@_@');
    //var makeE = null;
    
    for (var r=0;r<listName.length;r++) {
        document.getElementById(listName[r]).addEventListener("click", function(e){tooltiph(e)}, true);
    }
    document.getElementById("goldiePlus").addEventListener("click", function() {ChangeGG('+')}, true);
    document.getElementById("goldieMinus").addEventListener("click", function() {ChangeGG('-')}, true);

    return 1;
}



	
function HoleGegner() {
	
    var showuserid = holeTagNummer("td","showuserid");
    var startLine = showuserid[0];
    GM_log("Bin in HoleGegner() : pos : "+showuserid[0]);
    if(showuserid[0] == 0)	return 0;
    var endLine = startLine-50;
    for(goUP=startLine;goUP>endLine;goUP=goUP-5) {
        if(document.getElementsByTagName('td')[goUP].firstChild.data == "Gegner:") break;
        var GName = document.getElementsByTagName('td')[goUP].firstChild.firstChild.data;
        var GWinR = document.getElementsByTagName('td')[goUP+1].firstChild.data;
        if(GWinR.length==22) GName = GName.substring(0,22);
        if(GName == GWinR) {
            GM_log('<--------------------- Looser ----------------------- >'); continue;
        }
        var Datum = document.getElementsByTagName('td')[goUP-1].firstChild.data;
        //var DateAr = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec(Datum);
        var DateAr = /am\s([0-9]+)\.([0-9]+)\.([0-9]+)\sum\s([0-9]+):([0-9]+):([0-9]+)/.exec(Datum);
        GM_log("Date Array: "+DateAr);
        var DaUTC = Date.UTC(RegExp.$3,RegExp.$2-1,RegExp.$1,RegExp.$4,RegExp.$5,RegExp.$6);
        DaUTC = parseInt(DaUTC)-7200000;
        var WGold = document.getElementsByTagName('td')[goUP+2].firstChild.data.match(/[0-9]+/)[0];
        var softVar = GM_getValue(GName+Server,0);
        //var softVar = 0;
        GM_log("softValue :"+softVar);
        if(softVar == 0) {
            if(GoldLimit>WGold) {
                GM_log('<-------- GoldLimit -> '+GoldLimit+' Gewonnen '+WGold); continue;
            }
            un_ser = new Array(DaUTC,WGold,WGold,1);
            var hard = un_ser.join("@_@");
            GM_setValue(GName+Server,hard);
            var listName = GM_getValue('lName'+Server);
            if(listName) {
                var unListName = listName.split('@_@');
                var numIT = unListName.length+1;
                unListName.push(GName);
            } else {
                var unListName = new Array(GName);
            }
            listName = unListName.join("@_@");
            GM_setValue('lName'+Server,listName);
        } else {
            var hardVar = softVar.split("@_@");
            if(hardVar[0]<DaUTC) {
                hardVar[0] = DaUTC;
                hardVar[1] = Math.floor((parseInt(hardVar[1]) + parseInt(WGold))/2);
                hardVar[2] = WGold;
                hardVar[3] = parseInt(hardVar[3])+1;
                softVar = hardVar.join("@_@");
                GM_setValue(GName+Server,softVar);
                GM_log("Gegner Update "+GName+Server+" : "+softVar);
            }
        }
        if(goUP>120) break;
        if(goUP<1) break;
    }
    return 1;
}


// -----------------------------------------------------------------------------------------
// ------------------------- ENDE Raubzug optionen -----------------------------------
// -----------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------
// ------------------------------- START Traing Tune ---------------------------------------
// -----------------------------------------------------------------------------------------


function trainingTune() {
    if(UrPara[0] != "=training" && UrPara[0] != "=hellhound") return 0;
    var tdz = holeTagNummer("td", "Dein Goldbestand");
    var Punkt = tdz[1][tdz[0]+1].innerHTML.match(/^([0-9]+)\.([0-9]+)\,([0-9]+)/);
    var Gold = 0;
    if(Punkt != null) {
        var meinGold = tdz[1][tdz[0]+1].innerHTML.match(/^([0-9]*)\.*([0-9]+)\,([0-9]+)/);
        Gold = (parseInt(meinGold[1])*1000)+parseInt(meinGold[2],0);
    } else {
        var meinGold = tdz[1][tdz[0]+1].innerHTML.match(/^([0-9]+)\,([0-9]+)/);
        Gold = parseInt(meinGold[1],0);
    }

    GM_log("mein Gold Bestand "+meinGold+"  -- "+Gold);
    if(UrPara[0] == "=training") {cstart = tdz[0]+2;cend = tdz[0]+17;}
    if(UrPara[0] == "=hellhound") {cstart = tdz[0]+6;cend = tdz[0]+15;GM_log("Hellhound"+cstart);
        }
    for (g=cstart;g<cend;g=g+3) {
        var be4 = tdz[1][g+2].innerHTML;
        //GM_log("RAW TD: "+be4);
        var zahlstring = be4.match(/\(Kostet ([0-9\.]+),[0-9]+/);
        var zstring = zahlstring[1].replace(".","");
        var zahl = parseInt(zstring);
        GM_log("Zahl Parse "+zahl);
        var fac = Math.floor(Gold/zahl);
        if(fac > 0) {
            GM_log("Goldwerte : "+zahl[1]+" Summe mal "+fac);
            var Info = NeuesElement("div", "");
            Info.innerHTML = "x "+fac;
            tdz[1][g+2].appendChild(Info);
        }
    }

    return 1;
}


// -----------------------------------------------------------------------------------------
// ---------------------------------- ENDE Traing Tune -------------------------------------
// -----------------------------------------------------------------------------------------


// -----------------------------------------------------------------------------------------
// ---------------------------- START Hunde Info --------------------------------------
// -----------------------------------------------------------------------------------------

function hundeHTMLinfo(aktuell) {
    infoCode = "L:"+HELLHOUND_level[aktuell]+
            " K:"+HELLHOUND_kosten[aktuell]+
            " W:"+HELLHOUND_angriff[aktuell]+
            "-"+HELLHOUND_verteidigung[aktuell]+
            "-"+HELLHOUND_ausdauer[aktuell]+
            "</span>";
    return infoCode;
}

function updateHundeHTMLinfo(aendern) {
    var uinfo = document.getElementById("HundeInfo");
    GM_log("updateHundeInfo "+aendern);
    var aktuell = GM_getValue("HundePos",3);
    if(aktuell == 1 && aendern == "minus") return 0;
    var minusHund = document.getElementById("Hminus");
    var normalHund = document.getElementById("HundeCss");
    var plusHund = document.getElementById("Hplus");
    var infoCode = "";
    if (aktuell > 1) {
        minusHund.innerHTML = hundeHTMLinfo(aktuell-1);
    } else { minusHund.innerHTML = ""; }

        normalHund.innerHTML = " - " + hundeHTMLinfo(aktuell) + " - ";

    if (aktuell < HELLHOUND_name.length) {
        plusHund.innerHTML = infoCode += hundeHTMLinfo(aktuell+1);
    } else { plusHund.innerHTML = ""; }
    uinfo.innerHTML = infoCode;
    
    return 1;
}

function hundeInfo() {
    var haveDog = document.body.innerHTML.match(/Jetzt einen Wä.*chter kaufen/);
    GM_log("haveDog "+haveDog);
    if(UrPara[0] != "=status" || haveDog != null) return 0;

    addGlobalStyle(
        '.hundeKnoepfe {'+
        '	cursor:crosshair;\n\
            border:solid 1px #AA4242;\n\
            font-size:1.1em;'+
        '}');

    var tdz = holeTagNummer("td", "Wächter Art");
    var hund = tdz[1][tdz[0]+1].innerHTML.match(/^(.+)/);
    var Hund = hund[1];
    
    HELLHOUND_name = new Array(0,'Hund','Wütiger Hund','Wolfshund','Tollwütiger Wolfshund','Bionischer Hund','Apokalyptischer Hund','Bionischer Wolfshund','Apokalyptischer Wolfshund','Echsenhund','Steinhund','Drachenhund','Feuerhund','Zwillingshund','Tollwütiger Zwillingshund','Zerberus','Wütiger Zerberus','Bionischer Zwillingshund','Apokalyptischer Zwillingshund','Bionischer Zerberus','Apokalyptischer Zerberus','Niederes Wasserteufelchen','Niederes Erdeteufelchen','Niederes Steinteufelchen','Niederes Feuerteufelchen','Wasserteufelchen','Erdeteufelchen','Steinteufelchen','Feuerteufelchen','Gargoyle','Steingargoyle','Reptilgargoyle','Feuergargoyle','Drachengargoyle','Teufelsgargoyle','Höllengargoyle','Trollgargoyle','Abyssische Gargoyle','Adamantiumgargoyle','Vipergargoyle','Riesengargoyle','Junger Hybriddrache','Junger roter Drache','Junger Säuredrache','Junger schwarzer Drache','Hybriddrache','Säuredrache','Schwarzer Drache','Roter Drache');
	HELLHOUND_level = new Array(0,5,7,12,13,14,15,16,17,18,19,20,21,23,25,30,33,37,40,45,47,50,55,59,63,67,71,75,79,83,88,91,95,99,103,106,109,112,116,119,122,125,128,131,134,137,140,143,147);
	HELLHOUND_premium = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1);
	HELLHOUND_kosten = new Array(0,1000,2000,5000,5000,5000,5000,5000,10000,15000,15000,15000,15000,20000,25000,30000,40000,40000,40000,40000,45000,50000,50000,55000,55000,60000,60000,65000,65000,70000,75000,75000,80000,80000,85000,85000,90000,90000,95000,95000,100000,100000,100000,105000,105000,110000,110000,110000,115000);
	HELLHOUND_angriff = new Array(0,1,2,3,4,4,5,5,10,12,14,14,16,17,20,25,27,29,30,32,35,40,42,43,45,47,48,51,54,57,62,64,67,70,72,75,78,80,83,86,91,93,96,99,101,104,107,109,114);
	HELLHOUND_verteidigung = new Array(0,1,2,3,3,3,4,5,8,10,12,14,16,17,20,25,27,29,30,32,35,40,42,44,45,47,49,51,54,56,61,64,66,69,72,74,77,80,82,85,90,93,95,98,101,103,106,109,114);
	HELLHOUND_ausdauer = new Array(0,1,2,3,3,3,3,5,10,10,10,12,14,17,20,25,27,29,30,32,35,40,41,43,45,46,48,51,53,56,61,64,67,69,72,75,77,80,83,85,90,93,96,98,101,104,106,109,114);
    aktuell = 0;
    for (hh=0;hh<HELLHOUND_name.length;hh++) {
        if(HELLHOUND_name[hh] == Hund) aktuell = hh;
    }
    if(aktuell == 0) return 0;
    GM_setValue("HundePos",aktuell);
    var info = NeuesElement("div", "","id","HundeInfo");
    var Hminus = NeuesElement("span", "","id","Hminus","class","hundeKnoepfe");
    Hminus.addEventListener("click", function () {updateHundeHTMLinfo("minus")}, true);
    info.appendChild(Hminus);
    info.appendChild(NeuesElement("span", "","id","HundeCss","class","hundeKnoepfe"));
    var Hplus = NeuesElement("span", "","id","Hplus","class","hundeKnoepfe");
    Hplus.addEventListener("click", function () {updateHundeHTMLinfo("plus")}, true);
    info.appendChild(Hplus);
    tdz[1][tdz[0]+1].appendChild(info);
    updateHundeHTMLinfo("");
    //document.getElementById("Hminus").addEventListener("click", function () {updateHundeHTMLinfo("minus")}, true);
    //document.getElementById("Hplus").addEventListener("click", function () {updateHundeHTMLinfo("plus")}, true);
    GM_log("Hunde Debug : "+hund+" | Hunde "+HELLHOUND_name[aktuell]);
    return 1;
}

// -----------------------------------------------------------------------------------------
// ---------------------------------- ENDE Hunde Info -------------------------------------
// -----------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------
// ---------------------------- START Globale optionen --------------------------------------
// -----------------------------------------------------------------------------------------

function Optionz() {
    addGlobalStyle(
        '.Optionz td{' +
        '   	text-align:center;' +
        '		}' +
        '.Optionz table{' +
        '		background-color:#E0E0E0;'+
        '   }'+
        '.curx {'+
        '	cursor:crosshair;'+
        '}');
	
    newOption = NeuesElement("div", "");
    // GM_setValue('lName'+Server,"null@_@null");
    var listName = GM_getValue('lName'+Server,0);
    var unListName = listName.split('@_@');
    var numIT = unListName.length-1;
    GM_log("Liste der Namen unter Optionen "+unListName);
    var startLevel = GM_getValue('StartLevel'+Server,15);
    var endLevel = parseInt(GM_getValue('EndLevel'+Server,35));
    var Prem = GM_getValue('isPrem'+Server,0);
    var GoldLimit = GM_getValue('GoldLimit'+Server,100);
    var GoodGoldie = GM_getValue('GoodGoldie'+Server,70);
	var playerName = GM_getValue('PlayerName'+Server,'dexta');
   
    Code = '<table align="center" border="1" class="Optionz">';
    Code += '<tr><td colspan="6">Einstellungen:<br>';
    Code += '<form id="optionz" name="optionz">';
    Code += 'Mein Name im Spiel <input type="text" size="9" id="playerName" value="'+playerName+'"><br>';
    Code += 'Level von : <input type="text" size="2" id="startLevel" value="'+startLevel+'">';
    Code += ' bis <input type="text" size="2" id="endLevel" value="'+endLevel+'"><br>';
    Code += 'Limit ab wann Siege übernommen werden <input type="text" size="2" id="GoldLimit" value="'+GoldLimit+'"><br>';
    Code += 'Limit für die Goldies <input type="text" size="2" id="GoodGoldie" value="'+GoodGoldie+'"><br>';
    Code += 'Prem<input type="text" size="2" id="Prem" value="'+Prem+'"> 0 == kein Premium oder 1 == Premium<br>';
    Code += '<input type="button" id="OptionAendern" value="Save">';
    Code += '</form>';
    Code += '</td></tr>';
    Code += '<tr><th>Name</th><th>LezterKamp</th><th>SCH</th><th>Gold</th><th>Kämpfe</th><th>Löschen</th></tr>';

    

    for(o=0;o<=numIT;o++) {
        var NDaten = GM_getValue(unListName[o]+Server,"1@_@2@_@3@_@4@_@5");
        var hardVar = NDaten.split("@_@");
        Code += '<tr><td align="right">'+unListName[o]+'</td>';
        TTime = new Date();
        TTime.setTime(parseInt(hardVar[0]));
		
        Code += '<td>'+TTime.toLocaleString()+'</td>';
        Code += '<td>'+hardVar[1]+'</td>';
        Code += '<td>'+hardVar[2]+'</td>';
        var len = hardVar[3].length;
        for(s=0;s<=len;s++) {
            var nr = hardVar[3].substr(s, 1);
        }
        Code += '<td>'+hardVar[3]+'</td>';
        Code += '<td><input type="button" value="Löschen" id="'+unListName[o]+'"></td>';
    }
    Code += '<tr><td colspan="6""><input type="button" value="Lösche alle Namen" id="LoescheAlleNamen"></td></tr>';
    Code += '<tr><td colspan="6">';
    for(i=10;i<=251;i=i+10) {
        Code += '<a href="http://spielwelt'+Server+'.monstersgame.net/index.php?ac=nachrichten&sac=angriff&count='+i+'">';
        Code += (parseInt(i)+1) +'-'+ (parseInt(i)+10) +'</a> : ';
    }
    Code += '</td></tr>';
    Code += '</table>';
    newOption.innerHTML=Code;
    return newOption;
}

function OptionenAnzeigen() {
    
    var tmpListName = GM_getValue('lName'+Server,0);
    var listName = tmpListName.split('@_@');
    if(UrPara[0] != "=profil") return 0;
    var optionpos = holeTagNummer("div","eMail-Adresse");
    GM_log("Bin in OptionAnzeigen() : pos : "+optionpos[0]);
    optionpos[1][optionpos[0]].appendChild(Optionz());

    var optAen = document.getElementById("OptionAendern");
    optAen.addEventListener("click", function(){changeOptz()}, true);
    var makeE = null;
    for(l=0;l<listName.length;l++) {
        GM_log("Listen Name"+listName[l]);
        makeE = document.getElementById(listName[l]);
        makeE.addEventListener("click", function(e){loescheNamen(e)}, true);
    }
    var optLAll = document.getElementById("LoescheAlleNamen");
    optLAll.addEventListener("click", function() {loescheNAMEZ()}, true);
    
    return this;
}


// -----------------------------------------------------------------------------------------
// ----------------------------- ENDE Globale optionen --------------------------------------
// -----------------------------------------------------------------------------------------

// Darstellung in die Seite schreiben

var Header = document.getElementById('header-middle-bottom');
var HeaderDIV = NeuesElement("div", "", "align", "center");					
var HeaderHTML = '<div id="ExtraInfo" style="background:#FF0000;color:#000000;padding:5px;margin:3px;float:right;z-index:99;"></div>';
HeaderHTML += '<div id="ExtraLinks" style="background:#00FF00;color:#000000;padding:5px;margin:3px;float:right;z-index:99;"></div>';

var KampfHTML = kampf_Bericht();
if(KampfHTML != 0) HeaderHTML += KampfHTML;
HeaderDIV.innerHTML = HeaderHTML;
Header.appendChild(HeaderDIV);

extra_Infoz();
extra_Linkz();

raub_Menu();
HoleGegner();

OptionenAnzeigen();

trainingTune();
hundeInfo();

// ---------------------------------------------------------------------------------------
var dannB = new Date();
var BenchEn = dannB.getTime()
var BenDiff = BenchST+BenchEn;
GM_log('<--------- '+Server+' ------- Millisec diff---> '+(BenchEn-BenchST));
// ---------------------------------------------------------------------------------------
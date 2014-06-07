// ==UserScript==
// @name           katsuro_rangliste
// @namespace      dexta
// @description    Speichert die Rangliste ab und zeigt die Differenz zum vorherriegen Stand an. Gute möglichkeit um fette Beute zu machen
// @include        http://*.katsuro.de*
// ==/UserScript==


// das hier sollte oder könnte von Euch geändert werden:
// serverNo =  ist die Nummer des Servers, wenn ihr auf mehr als einem spielt (noch nicht möglich aber die Nummer sollte schon mal für den wichtigen eingetragen werden)
// rangListeStart = direkt Link zu den Seiten der Rangliste (Start)
var serverNo = 3;
var rangListeStart = 1;
var rangListeEnde = 9;

var jetzt = new Date();
var Statz = new Array();
var rankSave = new Array();
rankSave[0] = new Object();
var urlPara = new Array();
var statzGETNames = new Array("Ehre","Siege","Kaempfe","Gold","Level","Platz");

var chaName = new Array('Lebenspunkte','Erfahrung','Stärke','Geschicklichkeit','Beweglichkeit','Konsitiution','Charisma','Rüstung','Schaden');

// GM_log("Titel : "+document.title);
var Para = window.location.search;
if(Para != "") {
	var SucheP = /[?|=|&]([a-z0-9]+)/gi;
	var rawPara = Para.match(/[?|=|&]([a-z0-9]+)/gi);
    for(u=0;u<rawPara.length;u=u+2) {
        var nName = rawPara[u].replace(/\?|&/, "");
        var nPara = rawPara[u+1].replace(/=/, "");
        urlPara[nName] = nPara;
    }
}

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
            hitTagz = t;
        }
    }
    var back = new Array(hitTagz,tagz);
    //back[0] = hitTagz;
    //back[1] = tagz;
    return back;
}

function encodeURLStatz(statzArray) {
    var outStr = "";
    var Values = statzArray.split("@@@@");
    for(sa=0;sa<Values.length;sa++) {
        outStr += statzGETNames[sa]+"="+Values[sa]+"&";
    }
    outStr += "Save=userStatz";
    return outStr;
}

function getCharacter() {
    if(urlPara["module"] != "character") return 0;
    var rawStatz = holeTagNummer("td", "Lebenspunkte");
    
    var count = 0;
    for (s=rawStatz[0];s<=rawStatz[0]+17;s=s+2) {
        //GM_log("character statz : "+rawStatz[1][s].innerHTML+" | "+rawStatz[1][s+1].innerHTML);
        var rawNo = rawStatz[1][s+1].innerHTML.replace(/\./g, '');
        if(rawNo.match(/[0-9]+/)) {
            //GM_log("Raw Nummer "+rawNo);
            GM_setValue(chaName[count],rawNo);
        }
        //Statz[chaName[count]] = parseInt(rawNo);
        count ++;
    }
    return 1;
}

function makeMenu() {

    var rawStatz = holeTagNummer("td", "Rangliste");
    //GM_log("RaWStatz Debug ; "+rawStatz.length);

    addGlobalStyle(
        '.sinfo {' +
        '   	border:solid 1px #0000FF;' +
        '       padding:1px;'+
        '       margin:12px 4px;'+
        '       cursor:crosshair;'+
        '       background:#424242;'+
        '       position:absolute;'+
        '       top:18px;'+
        '		}'+
        '.Ranglisten a {'+
        '       color:#FFFFFF;'+
        '       margin:3px;'+
        '       padding:3px;'+
        '}');

    var header = document.getElementById("contentBg");
    var infoBox = NeuesElement("p", "","class","sinfo");
    
    code = "<table>";
    for (c=0;c<chaName.length;c++) {
        code += '<tr><td algin="right">';
        code += chaName[c];
        code += "</td><td>";
        code += GM_getValue(chaName[c],"--");
        code += "</td></tr>";
    }
    code += "</table>";
    code += '<hr /><hr /><div class="Ranglisten">';
    var spalten = 4;
    var umbruch = 1;
    for (r=rangListeStart;r<rangListeEnde;r++) {
        code += '| <a href="http://s3.katsuro.de/index.php?area=user&module=ranking&action=user&sort=ASC&orderby=rank&pos='+((r-1)*20)+'">'+r+'</a>';
        if(spalten == umbruch) {
            code += "<br />\n";
            umbruch = 1;
        } else { umbruch++;}
    }
    code += '</div>';
    infoBox.innerHTML = code;   
    header.appendChild(infoBox);
}

function save_user_ranking() {
    for (var Namen in rankSave[0]) {
        var varName = Namen+serverNo;
        var varVar = rankSave[0][Namen];
        //GM_log("Speicher "+varName+" : "+varVar);
        GM_setValue(varName,varVar);
    }
}

function get_user_ranking() {
    var rawStatz = holeTagNummer("td", "orderby");
    var start = rawStatz[0];
    start--;
    
    
    //GM_log("Bin im Ranking"+start);
    var table = new Array();
    table[0] = new Object();
    for(r=start;r>(start-140);r=r-7) {
        var rawName = rawStatz[1][r-5].innerHTML;
        var name = rawName.match(/([a-zA-Z0-9\._-]+)<\/a>/);

        //GM_log("Platz "+rawStatz[1][r-6].innerHTML);
        //GM_log("Level "+rawStatz[1][r].innerHTML);
        var savedVal = GM_getValue(name[1]+serverNo,"");
        //GM_log("Saved Value "+name);
        var values = new Array();
        values[0] = rawStatz[1][r-4].innerHTML.replace(/\./g, "");
        values[1] = rawStatz[1][r-3].innerHTML.replace(/\./g, "");
        values[2] = rawStatz[1][r-2].innerHTML.replace(/\./g, "");
        values[3] = rawStatz[1][r-1].innerHTML.replace(/\./g, "");
        values[4] = rawStatz[1][r].innerHTML.replace(/\./g, "");
        values[5] = rawStatz[1][r-6].innerHTML.replace(/\./g, "");
        
        var saveStr = values.join("@@@@");
        rankSave[0][name[1]] = saveStr;
        if(savedVal != "") {
            var theVal = savedVal.split("@@@@");
            var ehreDiff = parseInt(rawStatz[1][r-4].innerHTML.replace(/\./g, "")) - parseInt(theVal[0]);
            rawStatz[1][r-4].innerHTML = rawStatz[1][r-4].innerHTML + " (" +ehreDiff+")";
            var fightDiff = rawStatz[1][r-3].innerHTML.replace(/\./g, "") - parseInt(theVal[1]);
            rawStatz[1][r-3].innerHTML = rawStatz[1][r-3].innerHTML + " (" +fightDiff+")";
            var goldDiff = rawStatz[1][r-2].innerHTML.replace(/\./g, "") - parseInt(theVal[2]);
            rawStatz[1][r-2].innerHTML = rawStatz[1][r-2].innerHTML + " (" +goldDiff+")";
            var goldDiff = rawStatz[1][r-1].innerHTML.replace(/\./g, "") - parseInt(theVal[3]);
            rawStatz[1][r-1].innerHTML = rawStatz[1][r-1].innerHTML + " (" +goldDiff+")";
        }
    }
    var divIn = '<input type="button" value="Speichern" id="ranglisteSpeichern" class="button105">';
    var button = NeuesElement("div", divIn);
    rawStatz[1][start+1].appendChild(button);
    document.getElementById("ranglisteSpeichern").addEventListener("click", function() {save_user_ranking()}, true);    
}


if(urlPara["module"] != "shop" && urlPara["module"] != "character") {
    makeMenu();
} else {
    getCharacter();
}


if(urlPara["area"] == "user" && urlPara["module"] == "ranking") {
    get_user_ranking();
}
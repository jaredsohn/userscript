// ==UserScript==
// @name          IDR
// ==/UserScript==

var codes = new Array();
var words = new Array(
    "seib&ouml;se",
    "Evil",
    "Angry",
    "TdT",
    "Tartaros",
    "||||B&ouml;se||||",
    "Basic",
    "Bad",
    "seigut rules",
    "",
    "",
    
    "seilieb",
    "Ruckzuckhieb",
    "Inkasso smurf",
    "Teddys Offis",
    "Rip-Mobil",
    "Unverdorben",
    "Tombola",
    "Teddys HQ",
    "b&ouml;&ouml;&ouml;&ouml;se",
    "",
    "",
    
    "Alia",
    "KP KingsLanding",
    "KP Castle Black",
    "KP Harrenhall",
    "KP Riverrun",
    "KP Highgarden",
    "KP Winterfell",
    "Polis",
    "KP CasterlyRock",
    "",
    "",
    
    "Shane",
    "KP-Taverne",
    "KP-Glas",
    "KP-Saufbude",
    "KP-Weinlager",
    "KP-Bruchbude",
    "KP-Stinkbude",
    "KP-Wein",
    "KP-Saufbude II",
    "",
    "",
    
    "Dark Saint",
    "Hell Town",
    "Hell Village",
    "Polis",
    "Hell Metropolis",
    "Hell Garden",
    "Hell Temple",
    "Hell City",
    "",
    "",
    "",
    
    "AlCapone",
    "Milet",
    "Ephesus",
    "Babylon",
    "Theben",
    "Alexandria",
    "Athen",
    "Sparta",
    "",
    "",
    "",
    
    "seigut",
    "Paris",
    "Bratislava",
    "Athen",
    "Madrid",
    "London",
    "Amsterdam",
    "Berlin",
    "Rom",
    "",
    "",
    
    "seiwachsam",
    "halloween",
    "seiwachsam",
    "Das Wunder",
    "ketchup",
    "Eiskalt",
    "Titanium",
    "schwei&szlig;verbindung",
    "",
    "",
    "",
    
    "Evil Cookie",
    "Kr&uuml;melmonster",
    "Pl&auml;tzchen",
    "Keksdose",
    "B&ouml;ser Kek",
    "Keksteig",
    "Streuselkeks",
    "",
    "",
    "",
    "",
    
    "Noori14",
    "Sparta",
    "Imperium Zeno",
    "Troja",
    "Nooricum",
    "Rompedia",
    "Nooridam",
    "",
    "",
    "",
    "",
    
    "seigehorchsam",
    "S&auml;bel",
    "Langschwert",
    "Parang-Pandit",
    "Buschmesser",
    "Klinge",
    "Kudi Trachang",
    "Machete",
    "",
    "",
    ""
);

var chars = new Array('l', 'I');

//Codes generieren
var n = 7; //2^7 = 128 Codes generieren
for(var i = 1; i <= Math.pow(2, n); i++) {
    
    var rest = i;
    codes[i-1] = "";
    
    if(words[i-1] === undefined)
        words[i-1] = "";
    
    for(var j = 0; j < n; j++) {
        
        if(rest > Math.pow(2, n - j) / 2) {
            codes[i-1] += chars[1];
            rest -= Math.pow(2, n - j) / 2;
        } else {
            codes[i-1] += chars[0];
        }
        
    }
    
    
}


function work() {
    
    var spans = document.getElementsByTagName("span");
    var lis =  document.getElementsByTagName("li");

    var critical = new Array();

    for(i = 0; i < spans.length; i++) {
        if(spans[i].innerHTML.indexOf("I") >= 0 || spans[i].innerHTML.indexOf("l") >= 0)
            critical.push(spans[i]);
    }
    
    for(i = 0; i < lis.length; i++) {
        if(lis[i].innerHTML.indexOf("I") >= 0 || lis[i].innerHTML.indexOf("l") >= 0)
            critical.push(lis[i]);
    }



    for(i = 0; i < codes.length; i++) {

        for(j = 0; j < critical.length; j++) {

            var t = "" + critical[j].innerHTML;
            if(t.search(codes[i]) >= 0)
                critical[j].innerHTML = t.replace(codes[i], words[i]);

        }

    }
}

window.setInterval("work()", 1000);
work();
alert("OK");
// ==UserScript==
// @name           Forschungszeit Anzeige
// @namespace      userscripts.org
// @description    Anzeige der verbleibenden Forschungszeit
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

//Funktionen
//Funktion zur Ermittlung der verbleibenden Zeit
function zeit(zahl){
    //Minuten
    m = zahl - Math.floor(zahl);
    m = Math.round(60*m);
    if ( m == 60 )
        m = 59;
    //Tage
    s = Math.floor(zahl)/24;    
    t = Math.floor(s);
    //Stunden
    s = Math.floor(zahl) - t*24;    
    return (t+"D"+s+"H"+m+"M");
}

//Funktion um die Zahlenwerte tatsaechlich in Zahlen ohne . umzuwandeln
function trimZahl(zahl)
{
    if (zahl.indexOf('.') != -1)
    {
        var feld = zahl.split(".");
        zahl = "";
        for (j=0; j < feld.length; j++)
            zahl+=feld[j];
        zahl = parseInt(zahl);
    }
    else
        zahl = parseInt(zahl);
    return zahl;
}

var view = document.getElementsByTagName("body")[0].id;

//Anzeige
if (view === "researchAdvisor")
{
    var wert = "";
    var pts=0, pph=0;
      
    wert = document.getElementsByTagName("li");
    for (var i=0; i < wert.length; i++)
    {
        //vorhandene Forschungspunkte ermitteln
        if (wert[i].className == "points")
            pts = trimZahl(wert[i].firstChild.data.split(" ")[1]);
        //Wert fuer Forschungspunkte pro Stunde (pph) ermitteln
        if (wert[i].className == "time")
    	   pph = trimZahl(wert[i].firstChild.data.split(" ")[2]);
        //die Punktwerte fuer die vier Forschungszweige feststellen
        if (wert[i].className == "researchPoints")
        {            
            var zahl = trimZahl(wert[i].firstChild.data)-pts;
            if (zahl > 0.0)
                wert[i].firstChild.nodeValue+="\n"+zeit(zahl/pph);
        }                
    }    
}
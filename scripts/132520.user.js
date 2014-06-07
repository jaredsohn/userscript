// ==UserScript==
// @name       Earthlost Hilfstool
// @version    0.3
// @match      http://*.earthlost.de/*
// @description  kleine Helferlein fuer EL
// @copyright  2012+, Allure
// ==/UserScript==

//auf alle Seiten anwenden
var currentURL;
var ausgabeclassname;
var anzSpans;
var ueberschrift;
var i = 0;
var j = 0;
var checkwerbung;
    
//tabellenangaben bei "große Banner"
var rohstoffbonustabelle = 5;
var spioberichteunten = 3;
var nachrichtentabelle = 3;
var uebersichtstabelle = 6;

currentURL = (document.location+'');

//wenn kein blank vorhanden, dann ist Sidebanner eingeschalten! alle Tabellen rutschen 1 nach unten!
if ( document.getElementsByTagName( "table" )[0].getElementsByTagName( "td" )[1].innerHTML != "&nbsp;" ){
  rohstoffbonustabelle++;
  spioberichteunten++;
  nachrichtentabelle++;
  uebersichtstabelle++;
}

//uebersichtsseite
if ( currentURL.match( /http:\/\/.*\.earthlost\.de\/intro.phtml*/ ) ) {    
    //ausblenden von votes
    document.getElementsByTagName( "table" )[nachrichtentabelle].getElementsByTagName( "tr" )[4].style.display = "none";
    //ausblenden von Hinweis auf "xtended account"
    //document.getElementsByTagName( "table" )[nachrichtentabelle].getElementsByTagName( "tr" )[6].style.display = "none";
    
    ueberschrift = document.createElement( "div" );
    ueberschrift.setAttribute( "align", "left" );
    ueberschrift.class = "cost";
    ueberschrift.style.fontSize = "10px";
    ueberschrift.style.fontWeight = "bold";
    ueberschrift.innerHTML = "&nbsp;&nbsp;&nbsp;Aufgabe erledigt bis | Dauer";
    document.getElementsByTagName( "table" )[uebersichtstabelle].getElementsByClassName( "transcell" )[0].appendChild( ueberschrift );
    
    anzSpans = document.getElementsByTagName( "table" )[uebersichtstabelle].getElementsByClassName( "normaltext" )[0].getElementsByTagName( "span" ).length;
    
	var uebersichtspan = document.getElementsByTagName( "table" )[uebersichtstabelle].firstChild;
    for ( i = 0; i < anzSpans + 1; i++ ){
        with( uebersichtspan.getElementsByTagName( "span" )[i] ){
            //erweitert Anzeige um Wochentag (gekürzt auf 2 Buchstaben)
            //innerHTML = title.split( " " )[0].substr( 0, 2 ) + " " + title.split( " " )[1] + " "  + title.split( " " )[2] + " | " + innerHTML;
            innerHTML = title.split( " " )[1] + " "  + title.split( " " )[2] + " | " + innerHTML;
            title = "";
            style.cursor = "default";
        }
        
        i++;
        // da erst im darauffolgenden Element auf die Klasse zugegriffen werden kann und damit i inkrementiert werden muss,
        // muss auch die with-Anweisung neu deklariert werden
        with( uebersichtspan.getElementsByTagName( "span" )[i] ){
            if ( className == "event_verstaerk" || className == "event_transport" || className == "event_backway" || className == "event_stationieren" ||
                 className == "event_spio" || className == "event_leave" || className == "event_fusion" || className == "event_kolo" ||
                 className == "event_stufe" || className == "event_attack" || className == "event_attacked" ){
                //Tee trinken
            } else {
                i++;
            }
        }
    }
//Rohstoffe-Seite
} else if( currentURL.match( /http:\/\/.*\.earthlost\.de\/rohstoffe.phtml*/ ) ) {
	function Trenner(number) {
		number = '' + number;
		if (number.length > 3) {
			var mod = number.length % 3;
			var output = (mod > 0 ? (number.substring(0,mod)) : '');
			for (i=0 ; i < Math.floor(number.length / 3); i++) {
				if ((mod == 0) && (i == 0))
					output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
				else

				// hier wird das Trennzeichen festgelegt mit '.'
				output+= '.' + number.substring(mod + 3 * i, mod + 3 * i + 3);
			}
			return (output);
		}
		else return number;
	}

    //Rohstoffbonus ausblenden
    document.getElementsByTagName( "table" )[rohstoffbonustabelle].style.display = "none";
    
    var eisen       = document.getElementsByClassName( "light" )[0].childNodes[1].firstChild.innerHTML.split( " " )[0].replace(/\./g, "" );
    var titan       = document.getElementsByClassName( "light" )[1].childNodes[1].firstChild.innerHTML.split( " " )[0].replace(/\./g, "" );
    var nahrung     = document.getElementsByClassName( "light" )[2].childNodes[1].firstChild.innerHTML.split( " " )[0].replace(/\./g, "" );
    var wasserstoff = document.getElementsByClassName( "light" )[3].childNodes[1].firstChild.innerHTML.split( " " )[0].replace(/\./g, "" );
    var wasser      = document.getElementsByClassName( "light" )[4].childNodes[1].firstChild.innerHTML.split( " " )[0].replace(/\./g, "" );
	
    var mainrow = document.createElement( "td" );
    mainrow.setAttribute( "align","right" );
    mainrow.style.fontWeight = "bold";
    mainrow.innerHTML = "pro Tag";
        
    function rechneressis( genaueressi ){
        var times;
        var varcache;
        
        switch( genaueressi ){
            case "eisen":
                times = eisen;
                break;
            case "titan":
                times = titan;
                break;
            case "nahrung":
                times = nahrung;
                break;
            case "wasserstoff":
                times = wasserstoff;
                break;
            case "wasser":
                times = wasser;
                break;
        }
        varcache = document.createElement( "td" );
        varcache.setAttribute( "align","right" );
        varcache.style.fontWeight = "bold";
        if ( times < 0 ) varcache.className = "red";
        else varcache.className = "green";
        varcache.innerHTML = Trenner( times * 24 ) + " / d";
            
        return varcache;
    }
        
	document.getElementsByClassName( "tablebar" )[1].appendChild( mainrow );
    document.getElementsByClassName( "light" )[0].appendChild( rechneressis( "eisen" ) );
    document.getElementsByClassName( "light" )[1].appendChild( rechneressis( "titan" ) );
    document.getElementsByClassName( "light" )[2].appendChild( rechneressis( "nahrung" ) );
    document.getElementsByClassName( "light" )[3].appendChild( rechneressis( "wasserstoff" ) );
    document.getElementsByClassName( "light" )[4].appendChild( rechneressis( "wasser" ) );
    
    for(var i = 0; i < 11; i++){
        document.getElementsByClassName( "dark" )[i].appendChild( document.createElement( "td" ).cloneNode(true ) );
    }
//Message-Seite
} else if( currentURL.match( /http:\/\/.*\.earthlost\.de\/messages.phtml*/ ) ) {
    var erstelleTR = document.createElement( "tr" );
    erstelleTR.innerHTML = document.getElementsByTagName( "table" )[spioberichteunten].getElementsByTagName( "tr" )[0].innerHTML;
    
    //nur anwenden auf die Spionageberichte
    if ( document.getElementsByTagName( "table" )[spioberichteunten].getElementsByTagName( "tr" )[0].innerHTML.match( "spio" ) ){
        document.getElementsByTagName( "table" )[spioberichteunten].getElementsByTagName( "tbody" )[0].appendChild( erstelleTR );
    }
}
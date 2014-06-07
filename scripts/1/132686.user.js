// ==UserScript==
// @name       Bdiem Hilfstool (Changed URL)
// @version    0.2
// @match      http://*.earthlost.de/*
// @description  kleine Helferlein für Bdiem
// @copyright  Bdiem
// @require 	   http://code.jquery.com/jquery.min.js
// @include        http://*.earthlost.de/*
// ==/UserScript==

//jQuery CSS Manipulation Sample
$('body').css('background', '#fff');
$('body').css('color', '#000');

$('a:link,a:hover').css('background', '#fff');
$('a:link,a:hover').css('color', '#000');


//auf alle Seiten anwenden
var currentURL
var ausgabeclassname
var anzSpans
var ueberschrift
var i
var j
var domRoot

currentURL = (document.location+'');

// EL
if ( currentURL.match( /http:\/\/.*\.earthlost\.de\/*/ ) ) {
	
	function number_format (number, decimals, dec_point, thousands_sep){
        var exponent = "";
        var numberstr = number.toString ();
        var eindex = numberstr.indexOf ("e");
        if (eindex > -1)
        {
            exponent = numberstr.substring (eindex);
            number = parseFloat (numberstr.substring (0, eindex));
        }
        
        if (decimals != null)
        {
            var temp = Math.pow (10, decimals);
            number = Math.round (number * temp) / temp;
        }
        var sign = number < 0 ? "-" : "";
        var integer = (number > 0 ? 
                       Math.floor (number) : Math.abs (Math.ceil (number))).toString ();
        
        var fractional = number.toString ().substring (integer.length + sign.length);
        dec_point = dec_point != null ? dec_point : ".";
        fractional = decimals != null && decimals > 0 || fractional.length > 1 ? 
            (dec_point + fractional.substring (1)) : "";
        if (decimals != null && decimals > 0)
        {
            for (i = fractional.length - 1, z = decimals; i < z; ++i)
                fractional += "0";
        }
        
        thousands_sep = (thousands_sep != dec_point || fractional.length == 0) ? 
            thousands_sep : null;
        if (thousands_sep != null && thousands_sep != "")
        {
            for (i = integer.length - 3; i > 0; i -= 3)
                integer = integer.substring (0 , i) + thousands_sep + integer.substring (i);
        }
        
        return sign + integer + fractional + exponent;
    }
	
	navFrame = content.document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[0].contentDocument; 
	mainFrame = content.document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[1].contentDocument;

//Übersichtsseite
if ( currentURL.match( /http:\/\/.*\.earthlost\.de\/intro.phtml*/ ) ) {
    var navTables = navFrame.getElementsByTagName("table")
	var mainTables = mainFrame.getElementsByTagName("table")
	
	function getTagIndex (controlCollection,regex){		
		var tagIndex = -1;
		var i=0;
		for (i=0;i<=controlCollection.length;i++) {
			if (controlCollection[i].innerHTML.match(regex)){
				tagIndex = i;				
				break;
			}
		}		
		return tagIndex;
	}
	
	iAusstehendeEreignisse = getTagIndex(mainTables,new RegExp("Ausstehende.Ereignisse"));
	
	//javascript:if(content.document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[1].contentDocument.getElementsByTagName("table")[5].innerHTML.match(/Ausstehende.Ereignisse/)){alert("fuck yeah!")}else{alert("Hell no!")};
	
	i = 3; //große Banner mit Zugriff auf "Nachrichten-Tabelle"
    j = iAusstehendeEreignisse; //große Banner mit Zugriff auf "Gesamt-Tabelle" //TBD: Dynamischen Weg zur Identifikation finden!
	
    //wenn Sidebar eingeschalten, rutschen alle Tabellen 1 nach unten
    if ( mainFrame.getElementsByTagName( "table" )[0].getElementsByTagName( "td" )[1].innerHTML != "&nbsp;" ){
        i++;
        j++;
    }
	
    mainFrame.getElementsByTagName( "table" )[i].getElementsByTagName( "tr" )[4].style.display = "none";
    mainFrame.getElementsByTagName( "table" )[i].getElementsByTagName( "tr" )[6].style.display = "none";
    
    ueberschrift = document.createElement( "div" );
    ueberschrift.setAttribute( "align", "left" );
    ueberschrift.class = "cost";
    ueberschrift.style.fontSize = "10px";
    ueberschrift.style.fontWeight = "bold";
    ueberschrift.innerHTML = "&nbsp;&nbsp;&nbsp;Aufgabe erledigt bis | Dauer";
    mainFrame.getElementsByTagName( "table" )[j].getElementsByClassName( "transcell" )[0].appendChild( ueberschrift );
    
    anzSpans = mainFrame.getElementsByTagName( "table" )[j].getElementsByClassName( "normaltext " )[0].getElementsByTagName( "span" ).length;
    
    for ( i = 0; i < anzSpans + 1; i++ ){
        with( mainFrame.getElementsByTagName( "table" )[j].getElementsByTagName("table")[0].getElementsByTagName("span")[i] ){
            innerHTML = title.split( " " )[1] + " "  + title.split( " " )[2] + " | " + innerHTML;
            title = "";
            style.cursor = "default";
        }
        
        i++;
        // da erst im darauffolgenden Element auf die Klasse zugegriffen werden kann und damit i inkrementiert werden muss,
        // muss auch die with-Anweisung neu deklariert werden
        with( mainFrame.getElementsByTagName( "table" )[j].getElementsByTagName("table")[0].getElementsByTagName("span")[i] ){
            if ( className == "event_verstaerk" || className == "event_transport" || className == "event_backway" || className == "event_stationieren" ||
                 className == "event_spio" || className == "event_leave" || className == "event_fusion" || className == "event_kolo" ||
                 className == "event_stufe" || className == "event_attack" || className == "event_attacked" ){
                //Tee trinken
                /*.event_attack { color: #AA7700; }
                  .event_attacked { color: #FF0000; }*/
            } else {
                i++;
            }
        }
    }
    //alert("dgdfg");
//Rohstoffe-Seite
} else if( currentURL.match( /http:\/\/.*\.earthlost\.de\/rohstoffe.phtml*/ ) ) {
    var eisen       = mainFrame.getElementsByClassName("light")[0].childNodes[1].firstChild.innerHTML.split(" ")[0].replace(/\./g, "");
    var titan       = mainFrame.getElementsByClassName("light")[1].childNodes[1].firstChild.innerHTML.split(" ")[0].replace(/\./g, "");
    var nahrung     = mainFrame.getElementsByClassName("light")[2].childNodes[1].firstChild.innerHTML.split(" ")[0].replace(/\./g, "");
    var wasserstoff = mainFrame.getElementsByClassName("light")[3].childNodes[1].firstChild.innerHTML.split(" ")[0].replace(/\./g, "");
    var wasser      = mainFrame.getElementsByClassName("light")[4].childNodes[1].firstChild.innerHTML.split(" ")[0].replace(/\./g, "");
    
    var mainrow = document.createElement("td");
    mainrow.setAttribute("align","right");
    mainrow.style.fontWeight = "bold";
    mainrow.innerHTML = "pro Tag";
    
    var eisenTag = document.createElement("td");
    eisenTag.setAttribute("align","right");
    eisenTag.style.fontWeight = "bold";
    if (eisen < 0) eisenTag.className = "red";
    else eisenTag.className = "green";
    eisenTag.innerHTML = number_format(eisen * 24, 0, ",", ".") + " / d";
    
    var titanTag = document.createElement("td");
    titanTag.setAttribute("align","right");
    titanTag.style.fontWeight = "bold";
    if (titan < 0) eisenTag.className = "red";
    else titanTag.className = "green";
    titanTag.innerHTML = number_format(titan * 24, 0, ",", ".") + " / d";
    
    var nahrungTag = document.createElement("td");
    nahrungTag.setAttribute("align","right");
    nahrungTag.style.fontWeight = "bold";
    if (nahrung < 0) nahrungTag.className = "red";
    else nahrungTag.className = "green";
    nahrungTag.innerHTML = number_format(nahrung * 24, 0, ",", ".") + " / d";
    
    var wasserstoffTag = document.createElement("td");
    wasserstoffTag.setAttribute("align","right");
    wasserstoffTag.style.fontWeight = "bold";
    if (wasserstoff < 0) wasserstoffTag.className = "red";
    else wasserstoffTag.className = "green";
    wasserstoffTag.innerHTML = number_format(wasserstoff * 24, 0, ",", ".") + " / d";
    
    var wasserTag = document.createElement("td");
    wasserTag.setAttribute("align","right");
    wasserTag.style.fontWeight = "bold";
    if (wasser < 0) wasserTag.className = "red";
    else wasserTag.className = "green";
    wasserTag.innerHTML = number_format(wasser * 24, 0, ",", ".") + " / d";
    
    var darkTag = document.createElement("td");
    
    mainFrame.getElementsByClassName("tablebar")[1].appendChild(mainrow);
    mainFrame.getElementsByClassName("light")[0].appendChild(eisenTag);
    mainFrame.getElementsByClassName("light")[1].appendChild(titanTag);
    mainFrame.getElementsByClassName("light")[2].appendChild(nahrungTag);
    mainFrame.getElementsByClassName("light")[3].appendChild(wasserstoffTag);
    mainFrame.getElementsByClassName("light")[4].appendChild(wasserTag);
    
    for(var i = 0; i < 11; i++){
        mainFrame.getElementsByClassName("dark")[i].appendChild(darkTag.cloneNode(true));
    }
    
//Message-Seite
} else if( currentURL.match( /http:\/\/.*\.earthlost\.de\/messages.phtml*/ ) ) {
    i = 3; //große Banner
    
    //wenn sidebanner angeschalten, rutschen alle Tabellen 1 nach unten
    if ( mainFrame.getElementsByTagName( "table" )[0].getElementsByTagName( "td" )[1].innerHTML != "&nbsp;" ){
        i++;
    }
    
    var erstelleTR = mainFrame.createElement( "tr" );
    erstelleTR.innerHTML = mainFrame.getElementsByTagName( "table" )[i].getElementsByTagName( "tr" )[0].innerHTML;
    
    //nur anwenden auf die Spionageberichte
    if ( mainFrame.getElementsByTagName( "table" )[i].getElementsByTagName( "tr" )[0].innerHTML.match( "spio" ) ){
        mainFrame.getElementsByTagName( "table" )[i].getElementsByTagName( "tbody" )[0].appendChild( erstelleTR );
    }
}
}
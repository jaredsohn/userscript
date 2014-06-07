// ==UserScript==
// @name            Gatherer Prox Editor
// @namespace       Murakami, Czybi.
// @version         0.2
// @description     Gatherer Prox Editor
// @match           http://gatherer.wizards.com/Pages/Search/*
// @include		    http://gatherer.wizards.com/Pages/Default.aspx
// @include		    http://gatherer.wizards.com/Pages/Card/Details.aspx?*
// @copyright       2013+, Murakami, Czybi.
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           unsafeWindow
// ==/UserScript==

//------------------------------------------------------------------------
// Zapisuje kartę po kliknięciu.

var zapisane = GM_getValue('pamiec_1', '');

function copy(n)
{
	var karta = document.getElementsByTagName('img');  
    
    for (var x=0; x<karta.length; x++) 
	{
    	if (karta[x].getAttribute("alt") == n )
    	{
            zapisane += karta[x].src + ",";
            setTimeout(function() { GM_setValue("pamiec_1", zapisane); }, 0);
        	//zapisane += "<img src=\"" + karta[x].src + "\" />";
            //alert(zapisane); // Twoży komunikat ze zmiennej $zapisane.
   	 	}
	}

	return false;  
}

//-----------------------------------------------------------------
// Lista wszystkich dodanych kart.

function lista ()
{
    var okno_div = document.createElement("div");
    okno_div.style.position = "fixed";
    okno_div.style.border = "solid";
    
    if (window.location.href.indexOf("/Pages/Search/") > 0)
    {
    	// var strona = document.getElementById('ctl00_ctl00_ctl00_MainContainer'); // Najlepsze rozwiazanie!
        var strona = document.getElementById("ctl00_ctl00_ctl00_TopBannerAdvertisementCMS");
    }
    
    else if (window.location.href.indexOf("/Pages/Default.aspx") > 0)
    {
        var strona = document.getElementById("ctl00_ctl00_TopBannerAdvertisementCMS");
    }
        
    else if (window.location.href.indexOf("multiverseid") > 0)
    {
        var strona = document.getElementById("ctl00_ctl00_ctl00_TopBannerAdvertisementCMS");
    }
    
    strona.appendChild(okno_div);
    okno_div.style.zIndex = 199;
    okno_div.style.background = "white";
    okno_div.style.padding = "15px";
    okno_div.style.width = "750px";
    okno_div.style.height = "450px";
    okno_div.style.overflow = "scroll"
    okno_div.id = "okienko";
    okno_div.style.textAlign = "left";
    
    okno_div.style['-webkit-box-shadow'] = "10px 10px 5px #888"; // Dodaje cień.
    okno_div.style['-moz-box-shadow'] = "10px 10px 5px #888"; // Dodaje cień.
    okno_div.style.boxShadow = "10px 10px 5px #888"; // Dodaje cień.
    
    var menu = document.createElement("div");
    okno_div.appendChild(menu);
    menu.innerHTML = "<button onClick=\"zap(); return false;\">Save and close</button> <button onClick=\"druk(); return false;\">Save and print</button> <br />Click on the card to delete it from the list.";
    
    var lista = zapisane.split(',');
    
	for (var z=0; z<lista.length - 1; z++) 
	{
        var rys = document.createElement("img");
        rys.src = lista[z];
        rys.id = z;
        rys.className = "listakart";
        rys.style.width = "100px";
    	rys.style.height = "139.333px";
        rys.style.margin = "5px";
        rys.onclick = function() { document.getElementById("okienko").removeChild(this); };        
        okno_div.appendChild(rys);
    }
    
	return false;      
}

//-----------------------------------------------------------------
// Zapisuje karty po edycji listy.

function zap ()
{
    zapisane = "";
	var kartzap = document.getElementsByClassName('listakart');
	
    
    for (var i=0; i<kartzap.length; i++) 
	{
		zapisane += kartzap[i].src + ",";
        
	}
    setTimeout(function() { GM_setValue("pamiec_1", zapisane); }, 0);
    document.getElementById("okienko").remove(this);
    return false;
}

//-----------------------------------------------------------------
// Twozy nowe okno z kartami do druku.

function druk ()
{
	var NoweOkienko = window.open('strona.html', 'strona', 'toolbar=1,menubar=1,scrollbars=1,reable=0,status=0,location=0,directories=0,top=20,left=20,height=300,width=700');
    NoweOkienko.document.write("<html><head><title>Prox ułatwiacz.</title>");
    NoweOkienko.document.write("<style type=\"text/css\">");
	NoweOkienko.document.write("/* <![CDATA[ */");
	NoweOkienko.document.write("body { padding: 0px; margin: 0px; }");
    NoweOkienko.document.write("img { padding: 0px; margin: 0px; }");
	NoweOkienko.document.write("/* ]]> */");
	NoweOkienko.document.write("</style>");
    NoweOkienko.document.write("");                                 
    NoweOkienko.document.write("</head><body>");
    //NoweOkienko.document.write(zapisane);
    
    //---
    zapisane = "";
	var kartzap = document.getElementsByClassName('listakart');
	
    for (var i=0; i<kartzap.length; i++) 
	{
		zapisane += kartzap[i].src + ",";
        
	}
    setTimeout(function() { GM_setValue("pamiec_1", zapisane); }, 0);
    document.getElementById("okienko").remove(this);
    //---
        
	var lista_do_druku = zapisane.split(',');
    
    for (var d=0; d<lista_do_druku.length; d++) 
	{
        NoweOkienko.document.write('<img src=\"' + lista_do_druku[d] + '\" />');
    }
    
    NoweOkienko.document.write("</body></html>"); 
    NoweOkienko.document.close();
    
    return false;  
}

//------------------------------------------------------------
// Dodaje przyciski przy kartach.

var container2 = document.getElementsByClassName('searchcontrollinks');
var newSpan = document.createElement("span");
container2[0].appendChild(newSpan);
newSpan.innerHTML = "<button onClick=\"lista(); return false;\">ProxEditor</button>";

if (window.location.href.indexOf("multiverseid") > 0)
{
	var container = document.getElementById('cardTextSwitchLink2');
        
	var nazwa = document.getElementById('ctl00_ctl00_ctl00_MainContent_SubContent_SubContentHeader_subtitleDisplay').innerHTML;
               
	var newDiv = document.createElement("div");
	container.parentNode.appendChild(newDiv);
	newDiv.innerHTML = "<button onClick=\"copy(\'"+nazwa.replace("'", "\\'")+"\'); return false;\">Add</button>";
}

else if (window.location.href.indexOf("/Pages/Search/") > 0)
{

	var container = document.getElementsByClassName('cardTitle'); 

	for (var x=0; x<container.length; x++) 
	{
    	var nazwa = container[x].childNodes[1].innerHTML;
    
    	var newTd = document.createElement("td");
    	newTd.style.verticalAlign = "top";
    	container[x].parentNode.parentNode.parentNode.appendChild(newTd);
		newTd.innerHTML = "<button onClick=\"copy(\'"+nazwa.replace("'", "\\'")+"\'); return false;\">Add</button>"; 
 
	}
}    
    
//----------------------------------------------------------------
unsafeWindow.zap = zap; // Bez tego nie działa onClick.
unsafeWindow.copy = copy; // Bez tego nie działa onClick.
unsafeWindow.druk = druk; // Bez tego nie działa onClick.
unsafeWindow.lista = lista; // Bez tego nie działa onClick.